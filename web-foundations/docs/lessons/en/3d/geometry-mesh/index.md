# Geometry & Mesh — Vertices, Buffers & the Shape of Data

> *"Before color, before light, before motion — there is shape. Geometry is the skeleton; everything else is skin and breath."*

Meshes are how the GPU *knows* what to draw. A `Mesh` pairs a `Material` (how pixels are shaded) with a `BufferGeometry` (where vertices live in memory). For frontend engineers shipping WebGL/WebGPU experiences, geometry is the first place budgets break: too many vertices, too many draw calls, or the wrong data layout will tank frame time long before your bloom pass does.

This lesson is practical: how Three.js represents geometry on the GPU, when to index, when to instance, when to merge, and how to think about memory like a production engineer.

### Code examples in this lesson

**CodeSandbox-ready** snippets are full `index.html` / `main.js` pairs (or a single module) you can run after adding **`three`**. **Excerpt** blocks show one idea in isolation—attributes, indexing, instancing—without a scene or render loop.

---

## BufferGeometry: the contract with the GPU

A `BufferGeometry` is a bag of **attributes** (typed arrays uploaded to GPU buffers) plus optional **index** data. The vertex shader reads these per vertex.

| Attribute | Typical role | Shader variable (MeshStandardMaterial) |
|-----------|--------------|----------------------------------------|
| `position` | Vertex location (model space) | `position` |
| `normal` | Surface direction for lighting | `normal` |
| `uv` | Texture coordinates | `uv` |
| `uv2` | Second UV set (lightmaps, AO) | `uv2` |
| `color` | Per-vertex color | `color` |
| `tangent` | For normal mapping (TBN basis) | `tangent` |

**Rule:** If you omit `normal` on a lit material, Three.js may compute normals for you on the CPU when building geometry — fine for editor-time assets, expensive if you regenerate every frame.

### CodeSandbox-ready: custom `BufferGeometry` triangle with render loop

Vanilla sandbox: dependency **`three`**. `index.html` loads `main.js`; `MeshBasicMaterial` avoids lights so the demo stays one mental step.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>BufferGeometry triangle</title>
    <style>
      html, body { margin: 0; height: 100%; overflow: hidden; background: #0a0a12; }
    </style>
  </head>
  <body>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

```javascript
// CodeSandbox-ready — npm: three
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a12);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 2.8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const positions = new Float32Array([-1, -1, 0, 1, -1, 0, 0, 1, 0]);
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1]);
geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
const uvs = new Float32Array([0, 0, 1, 0, 0.5, 1]);
geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
geometry.computeBoundingSphere();
geometry.computeBoundingBox();

const mesh = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: 0x66ddaa, side: THREE.DoubleSide })
);
scene.add(mesh);

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener("resize", onResize);

function frame() {
  requestAnimationFrame(frame);
  mesh.rotation.z += 0.01;
  renderer.render(scene, camera);
}
frame();
```

### Minimal custom geometry (triangle)

#### Excerpt — attributes on a `BufferGeometry` (no scene)

```text
import * as THREE from "three";

const geometry = new THREE.BufferGeometry();

const positions = new Float32Array([
  -1, -1, 0,
   1, -1, 0,
   0,  1, 0,
]);

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

// Lit materials need normals; for a single triangle in XY plane:
const normals = new Float32Array([
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
]);
geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));

const uvs = new Float32Array([
  0, 0,
  1, 0,
  0.5, 1,
]);
geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

geometry.computeBoundingSphere(); // frustum culling & raycasting
geometry.computeBoundingBox();   // tighter AABB for picking / culling in tools
```

`itemSize` is the number of components per vertex (`3` for XYZ, `2` for UV). Use `Float32Array` unless you have a proven reason for another type; it matches what most materials expect.

### `BufferAttribute` updates and partial uploads

When you **mutate** array contents in place, set `attribute.needsUpdate = true` once before the next render. For huge dynamic meshes (particles, water), consider updating only a prefix with `geometry.setDrawRange(start, count)` so the GPU draws fewer vertices without reallocating.

#### Excerpt — mutating positions + draw range

```text
const posAttr = geometry.getAttribute("position");
posAttr.array[0] += 0.01;
posAttr.needsUpdate = true;
geometry.setDrawRange(0, activeVertexCount);
```

**Interleaved buffers** (`InterleavedBuffer` + `InterleavedBufferAttribute`) pack multiple attributes into one GPU buffer for better cache locality — advanced optimization; start flat, interleave when profiling shows bandwidth limits.

---

## Indexed vs non-indexed

**Non-indexed:** each triangle repeats its three corner vertices. Simple to generate; more memory and bandwidth.

**Indexed:** `position` stores unique vertices; `geometry.setIndex(indices)` references them by integer. Shared vertices (smooth shading, welded seams) cost less memory.

#### Excerpt — indexed quad (four vertices, six indices)

```text
// Indexed quad (two triangles), 4 vertices instead of 6
const positions = new Float32Array([
  0, 0, 0,
  1, 0, 0,
  1, 1, 0,
  0, 1, 0,
]);
const indices = [
  0, 1, 2,
  0, 2, 3,
];

const geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geo.setIndex(indices);
geo.computeVertexNormals(); // derives normals from triangle topology
```

**Production note:** glTF meshes are usually indexed. When you “explode” or duplicate vertices for flat shading or UV seams, index buffers lose their benefit — that is why some modifiers increase vertex count sharply.

---

## InstancedMesh: thousands of objects, one draw call

`InstancedMesh` draws the same geometry many times with per-instance transforms (and optional per-instance color). It is the standard fix for grass, debris, particles-as-meshes, and repeated props.

#### Excerpt — `InstancedMesh` instance matrices + optional instance colors (expects `scene`)

```text
const count = 5000;
const baseGeometry = new THREE.BoxGeometry(0.1, 0.2, 0.1);
const material = new THREE.MeshStandardMaterial({ color: 0x88aaee });
const mesh = new THREE.InstancedMesh(baseGeometry, material, count);

const dummy = new THREE.Object3D();
const color = new THREE.Color();

for (let i = 0; i < count; i++) {
  dummy.position.set(
    (Math.random() - 0.5) * 20,
    0,
    (Math.random() - 0.5) * 20
  );
  dummy.rotation.y = Math.random() * Math.PI * 2;
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);

  color.setHSL(Math.random(), 0.5, 0.55);
  mesh.setColorAt(i, color);
}

mesh.instanceMatrix.needsUpdate = true;
if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

scene.add(mesh);
```

**Limits:** Same material and same geometry for all instances. For varied materials, batch by material or use texture atlases / custom shaders with per-instance attributes.

**Frustum culling:** `InstancedMesh` culls as one bounding volume. For huge worlds, split into spatial chunks (multiple `InstancedMesh`es) so off-screen chunks skip the draw call.

---

## Merging geometry: `BufferGeometryUtils.mergeGeometries`

Static scenery (buildings, merged terrain chunks) often benefits from **one** big `BufferGeometry` instead of thousands of meshes — fewer draw calls, simpler culling tradeoffs.

#### Excerpt — `mergeGeometries` grid of boxes (add lights + scene yourself)

```text
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

const geometries = [];

for (let i = 0; i < 200; i++) {
  const g = new THREE.BoxGeometry(1, 1, 1);
  g.translate((i % 10) * 2, 0, Math.floor(i / 10) * 2);
  geometries.push(g);
}

const merged = mergeGeometries(geometries, false);
const mesh = new THREE.Mesh(merged, new THREE.MeshStandardMaterial());

geometries.forEach((g) => g.dispose());
```

**Options:** The second argument `useGroups` preserves material groups so a single mesh can still multi-material if each source had compatible group structure.

**Watchouts:** Merging dynamic objects every frame is almost always wrong — CPU cost dominates. Merge **static** level art at build time or once at load.

---

## LOD (Level of Detail)

`THREE.LOD` switches among several meshes by distance to camera. Production pipelines often author LODs in DCC tools; at runtime you add levels with distances.

#### Excerpt — `LOD` levels (placeholders: `highPolyGeometry`, …)

```text
const lod = new THREE.LOD();

const high = new THREE.Mesh(highPolyGeometry, material);
const med = new THREE.Mesh(medPolyGeometry, material);
const low = new THREE.Mesh(lowPolyGeometry, material);

lod.addLevel(high, 0);
lod.addLevel(med, 25);
lod.addLevel(low, 60);

scene.add(lod);
```

**Alternatives:** Simplify geometry offline (`gltf-transform simplify`), or swap entire glTF variants by distance. For hero assets on mobile, aggressive LOD is non-negotiable.

---

## Procedural geometry: parametric surfaces & extrusion

Three.js ships generators: `PlaneGeometry`, `SphereGeometry`, `LatheGeometry`, `ExtrudeGeometry`, etc. For parametric surfaces, sample a function into a grid or strip.

#### Excerpt — procedural heightfield from a subdivided plane

```text
// Heightfield: plane with displaced Y from a function
const w = 64;
const h = 64;
const geo = new THREE.PlaneGeometry(10, 10, w - 1, h - 1);
geo.rotateX(-Math.PI / 2);

const pos = geo.attributes.position;
for (let i = 0; i < pos.count; i++) {
  const x = pos.getX(i);
  const z = pos.getZ(i);
  const y = Math.sin(x * 2) * Math.cos(z * 2) * 0.35;
  pos.setY(i, y);
}
pos.needsUpdate = true;
geo.computeVertexNormals();
```

**Extrusion** from 2D shapes is ideal for UI-like ribbons, roads, and text outlines — author `Shape`/`Path`, pass to `ExtrudeGeometry` with `steps`, `bevelEnabled`, and depth.

#### Excerpt — `ExtrudeGeometry` from a `Shape`

```text
const heartShape = new THREE.Shape();
heartShape.moveTo(0, 0.25);
heartShape.bezierCurveTo(0, 0, -0.25, 0, -0.25, 0.25);
heartShape.bezierCurveTo(-0.25, 0.55, 0, 0.75, 0, 1);
heartShape.bezierCurveTo(0, 0.75, 0.25, 0.55, 0.25, 0.25);
heartShape.bezierCurveTo(0.25, 0, 0, 0, 0, 0.25);

const extrudeSettings = {
  depth: 0.15,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.02,
  bevelSegments: 2,
  curveSegments: 12,
};

const extruded = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
extruded.center();
```

**Capsules & primitives for games:** `CapsuleGeometry` (three r133+) is the collision friendlier stand-in for characters than cylinders with ad-hoc hemispheres — good for debug draw and procedural proxy meshes.

---

## Wireframe, edges, and debugging

- `material.wireframe = true` — draws edges of triangles; useful for overdraw and topology inspection. **Not** the same as clean “outline” art — it shows triangulation.
- `EdgesGeometry` / `LineSegments` — silhouette-friendly edges for CAD-style views.

#### Excerpt — edge overlay for an existing `geometry`

```text
const edges = new THREE.LineSegments(
  new THREE.EdgesGeometry(geometry, 15), // threshold angle in degrees
  new THREE.LineBasicMaterial({ color: 0x000000 })
);
```

---

## Memory cost of geometry (back-of-envelope)

Each `Float32` component is 4 bytes.

- Positions: `vertexCount × 3 × 4`
- Normals: same
- UV: `vertexCount × 2 × 4`
- Index: `indexCount × 4` (Uint32) or ×2 (Uint16 if &lt; 65536 vertices — use `BufferAttribute` with appropriate type)

**Example:** 100k vertices, pos+normal+uv + uint32 index ~300k triangles:

- Position: 100k × 3 × 4 ≈ 1.2 MB  
- Normal: ≈ 1.2 MB  
- UV: 100k × 2 × 4 ≈ 0.8 MB  
- Index: 300k × 3 × 4 ≈ 3.6 MB  

That is **only** geometry — textures and render targets often dwarf this, but geometry still matters on low-end GPUs with tight VRAM.

Always `dispose()` geometries and materials when unloading a level.

#### Excerpt — dispose GPU resources

```text
geometry.dispose();
material.dispose();
```

---

## Raycasting and picking

`Raycaster` tests against mesh triangles using **world** space rays. Geometry must have valid **bounds** (`computeBoundingSphere` / `computeBoundingBox`) for early rejection. For `InstancedMesh`, use `raycast` with awareness that default picking hits the whole AABB unless you implement per-instance logic (often: GPU picking or simplified colliders).

#### Excerpt — pointer to NDC + `intersectObjects`

```text
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(scene.children, true);
  if (hits.length) {
    console.log(hits[0].object.name, hits[0].point);
  }
}
```

---

## Build-time vs runtime geometry

| Strategy | When | Tradeoff |
|----------|------|----------|
| Author in Blender → glTF | Hero assets, characters | Best art control; pipeline complexity |
| Procedural in JS | Data viz, infinite terrain chunks | Flexible; watch CPU spikes |
| Merge at build (`gltf-transform`, custom script) | Static cities | Minimal draw calls; no per-object animation |
| Instancing | Repeated props | One material; limited variety |

Ship **compressed** glTF (meshopt/Draco) for network; GPU still decompresses to `BufferGeometry` in memory — compression is about **download**, not VRAM magic.

---

## AI notes (how to work with copilots here)

- Ask for **attribute layouts** explicitly: “Float32 position 3, normal 3, uv2 for lightmap” — models hallucinate wrong itemSizes if you are vague.
- When merging, specify **Three.js r15x+** import paths (`three/addons/...`) — stale snippets still use old `examples/jsm` patterns; verify against your installed version.
- For instancing, request **`setMatrixAt` + `instanceMatrix.needsUpdate`** — forgetting `needsUpdate` is the #1 bug AI-generated code produces.
- Have the model **compute bounds** (`computeBoundingSphere`) after procedural edits; missing bounds break culling and picking.

---

## Tao moment

The mesh does not “exist” on screen. Only fragments do. Geometry is a promise you make to the pipeline: *here is where light might strike.* Keep that promise small, coherent, and disposable when the scene changes. The skeleton should be light enough to carry.

---

## Further reading

- [Three.js BufferGeometry](https://threejs.org/docs/#api/en/core/BufferGeometry)
- [BufferGeometryUtils](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils)
- [InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh)
- [LOD](https://threejs.org/docs/#api/en/objects/LOD)
