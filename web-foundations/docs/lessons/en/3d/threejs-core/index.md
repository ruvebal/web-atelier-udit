# Three.js Core — Scene Graph, Cameras & the Object Lifecycle

**Phase 1 · Lesson 1.2** — Foundations for frontend specialists building 3D on the web.

> *"The scene graph is a family tree: every child walks in the footsteps of its parent. What the parent turns, scales, and moves, the world feels through the child — until the child finds its own local truth."*

This lesson maps the **non-negotiable mental model** behind three.js: how objects nest, how cameras slice space, how renderers commit pixels, and how GPU resources live and die. Master this before React Three Fiber, loaders, or shaders — everything else hangs from these branches.

### Code examples in this lesson

**CodeSandbox-ready** snippets include imports and run on their own in a vanilla JavaScript sandbox with the **`three`** dependency. **Excerpt** blocks focus on one API idea; paste them only after you have `scene`, `camera`, `renderer`, or other setup in place.

---

## 1. The scene graph mental model

three.js scenes are **trees of `Object3D` instances**. A node can have:

- **One parent** (or none, if it is the scene root)
- **Many children**
- **Local transform**: `position`, `quaternion` / `rotation`, `scale`

The engine composes **world matrices** by walking the tree: each child’s world transform is “parent world × child local”. That is why a moon mesh parented to a planet rotates with the planet *and* can spin on its own local axis.

**Local vs world**

- **Local space**: relative to the object’s parent (and its parent’s parent, …).
- **World space**: where the object actually ends up after the full chain.

#### Excerpt — local vs world transforms on a parented moon

```text
import * as THREE from "three";

const scene = new THREE.Scene();

const planet = new THREE.Group();
planet.position.set(10, 0, 0);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0xaaaaaa })
);
moon.position.set(2, 0, 0); // 2 units from planet center, in planet's local space

planet.add(moon);
scene.add(planet);

// After the graph updates matrices (renderer does this each frame):
planet.updateMatrixWorld(true);

const moonWorld = new THREE.Vector3();
moon.getWorldPosition(moonWorld);
// moonWorld is roughly (12, 0, 0) — planet translation + moon offset

const local = new THREE.Vector3(1, 0, 0);
const worldSameDir = local.clone().applyQuaternion(moon.getWorldQuaternion(new THREE.Quaternion()));
// Directions use rotation hierarchy only; use world quat for world-space vectors
```

**Teaching handles:** `Object3D.add()`, `remove()`, `attach()` (re-parent while preserving world transform), `getWorldPosition()`, `getWorldQuaternion()`, `localToWorld()`, `worldToLocal()`.

**Matrix updates:** By default, `Object3D.matrixAutoUpdate` is `true`, so the renderer recomputes local/world matrices when transforms change. For **thousands** of static objects, freezing with `matrixAutoUpdate = false` after the first `updateMatrixWorld()` can save CPU — at the cost of remembering to flip it back when something moves.

#### Excerpt — `Object3D.attach` preserves world transform when re-parenting

```text
// Re-parent without jumping: preserve world transform
const a = new THREE.Group();
const b = new THREE.Group();
const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial());
a.add(mesh);
a.position.set(5, 0, 0);
mesh.position.set(1, 0, 0);

b.position.set(-2, 0, 0);
b.attach(mesh); // mesh now child of b, same world position/rotation/scale
```

---

## 2. Coordinate systems: right-hand rule, Y-up convention, units

**Right-hand rule:** curl fingers from +X toward +Y; your thumb points +Z. This matches three.js’s default camera orientation and cross products.

**Y-up:** In three.js, +Y is typically “up”. +X right, +Z toward the viewer (out of the screen) in the default camera setup — a common source of confusion when importing Z-up DCC exports (Blender glTF is Y-up; some CAD tools are not).

**Units are arbitrary:** three.js has no built-in “meters”. One unit = one meter is a **team convention**. Physics, audio falloff, and XR scale only stay coherent if you pick a unit system and enforce it in assets and code.

#### Excerpt — axes + grid helpers (expects an existing `scene`)

```text
// Visual sanity check: axes helper in world space
const axes = new THREE.AxesHelper(2);
scene.add(axes);

// Grid lies on XZ plane (Y is up) by default
const grid = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
scene.add(grid);
```

---

## 3. Cameras: PerspectiveCamera vs OrthographicCamera, frustum, aspect ratio, near/far planes

A **camera** defines a **viewing frustum**: the truncated pyramid (perspective) or box (orthographic) of space that can be projected to the screen.

### PerspectiveCamera

Parameters: `fov` (vertical field of view, degrees), `aspect` (width ÷ height), `near`, `far`.

- **Aspect** must match the canvas CSS pixel aspect ratio (or you get stretching).
- **Near / far** clip everything outside; they also affect depth precision (push `near` too close and you get z-fighting).

#### Excerpt — perspective camera setup

```text
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 2, 8);
camera.lookAt(0, 0, 0);
```

### OrthographicCamera

Parallel projection; no perspective foreshortening. Useful for UI overlays, technical views, or 2.5D games.

#### Excerpt — orthographic camera

```text
const halfW = 5;
const halfH = 5;
const ortho = new THREE.OrthographicCamera(
  -halfW,
  halfW,
  halfH,
  -halfH,
  0.1,
  100
);
```

**Frustum culling:** Objects outside the frustum are skipped when `object.frustumCulled` is true (default). If you animate vertices on the CPU or misuse bounding volumes, objects can “pop” in or out incorrectly — then you tune `geometry.computeBoundingSphere()` or disable culling for that object (sparingly).

**Debug the frustum** during development: `CameraHelper` draws the pyramid/box so you can see exactly what the camera considers “inside”.

#### Excerpt — `CameraHelper` on a perspective camera

```text
const camHelper = new THREE.CameraHelper(camera);
scene.add(camHelper);
// Remember: helpers are Object3Ds too — remove when shipping or gate behind __DEV__
```

**Projection matrix:** Whenever you change `fov`, `aspect`, `near`, or `far`, call `camera.updateProjectionMatrix()` before relying on picking or shader logic that reads projection parameters.

---

## 4. Renderers: WebGLRenderer vs WebGPURenderer, renderer settings that matter

**WebGLRenderer** is the battle-tested default: WebGL 2 (with WebGL 1 fallback in older builds).

**WebGPURenderer** is three.js’s path toward WebGPU (and may use a WebGL fallback depending on build and environment). Feature parity and project constraints evolve — always **detect capability** and keep a fallback story for production.

### Settings that routinely matter

#### Excerpt — renderer color management, DPR cap, resize (expects `camera`)

```text
const renderer = new THREE.WebGLRenderer({
  antialias: true, // MSAA on the default framebuffer; not a substitute for post AA
  alpha: true, // transparent canvas if you need DOM underneath
  powerPreference: "high-performance",
});

// Color management (modern three.js): match assets and display
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

// Sharpness vs cost on high-DPI displays
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onResize);
```

- **`antialias`**: hardware MSAA; cheap for edges, does not fix shader aliasing or thin geometry alone.
- **`toneMapping` + `toneMappingExposure`**: HDR-style lighting becomes visible on an LDR screen without blowing highlights.
- **`outputColorSpace`**: must align with textures (`texture.colorSpace`) and your authoring pipeline.
- **`pixelRatio`**: values above ~2 often waste fill rate; cap intelligently.

**WebGPU sketch (API shape may vary by three.js version):**

#### Excerpt — WebGPU renderer bootstrap pattern (check your three.js version)

```text
// Pseudocode pattern: async init, check support, fallback to WebGL
// import { WebGPURenderer } from "three/webgpu";

async function createRenderer(preferredWebGPU) {
  // if (preferredWebGPU && await WebGPURenderer.isAvailable?.()) {
  //   const r = new WebGPURenderer({ antialias: true });
  //   await r.init();
  //   return r;
  // }
  return new THREE.WebGLRenderer({ antialias: true });
}
```

Treat WebGPU as **opt-in progressive enhancement** until your target matrix is fully green for your feature set.

### Putting it together: a minimal app shell

The following pattern appears in almost every three.js entry point: **scene, camera, renderer**, resize, animation loop, and teardown hooks for SPAs.

**CodeSandbox-ready** — vanilla template: add dependency **`three`**, create `index.html` that loads this module (for example `./main.js`). The default export is `init(parentElement)`; call `init(document.body)` and keep the returned `disposeApp` for route unmount or hot reload.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>three.js core — minimal shell</title>
    <style>
      html, body { margin: 0; height: 100%; overflow: hidden; }
    </style>
  </head>
  <body>
    <script type="module">
      import { init } from "./main.js";
      const dispose = init(document.body);
      window.addEventListener("beforeunload", dispose);
    </script>
  </body>
</html>
```

```javascript
// CodeSandbox-ready — npm: three
import * as THREE from "three";

export function init(canvasParent) {
  let animationId = null;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111118);

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  );
  camera.position.set(4, 3, 8);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  canvasParent.appendChild(renderer.domElement);

  const mesh = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.6, 0.2, 128, 16),
    new THREE.MeshStandardMaterial({
      color: 0x88ccff,
      roughness: 0.35,
      metalness: 0.1,
    })
  );
  scene.add(mesh);
  const dir = new THREE.DirectionalLight(0xffffff, 1.25);
  dir.position.set(3, 6, 4);
  scene.add(dir, new THREE.AmbientLight(0xffffff, 0.2));

  const clock = new THREE.Clock();
  function frame() {
    animationId = requestAnimationFrame(frame);
    const dt = clock.getDelta();
    mesh.rotation.x += dt * 0.2;
    mesh.rotation.y += dt * 0.35;
    camera.lookAt(mesh.position);
    renderer.render(scene, camera);
  }
  frame();

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", onResize);

  return function disposeApp() {
    if (animationId !== null) cancelAnimationFrame(animationId);
    window.removeEventListener("resize", onResize);
    mesh.geometry.dispose();
    mesh.material.dispose();
    renderer.dispose();
    if (renderer.domElement.parentElement) {
      renderer.domElement.parentElement.removeChild(renderer.domElement);
    }
  };
}
```

---

## 5. The object lifecycle: create → add to scene → update → dispose (with memory leak patterns)

GPUs do not garbage-collect your sins.

**Healthy lifecycle**

1. **Create** geometries, materials, textures, meshes.
2. **Add** to the scene graph (or keep references if off-screen).
3. **Update** transforms and uniforms each frame (or event-driven).
4. **Dispose** when done: `geometry.dispose()`, `material.dispose()`, and `texture.dispose()` where applicable; remove from scene.

**CodeSandbox-ready** — small utility module (depends on `three` and an existing `scene` reference).

```javascript
// CodeSandbox-ready — npm: three; expects: const scene = ... (your scene graph root)
import * as THREE from "three";

export function createDisposableMesh(scene) {
  const geom = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
  const mesh = new THREE.Mesh(geom, mat);
  scene.add(mesh);
  return mesh;
}

export function destroyMesh(scene, mesh) {
  scene.remove(mesh);
  mesh.geometry.dispose();
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach((m) => m.dispose());
  } else {
    mesh.material.dispose();
  }
  // If materials owned textures not shared elsewhere, dispose those too
}
```

**Common leak patterns**

- Cloning materials every frame without disposing old ones.
- Creating new `Vector3` / `Color` in hot loops without pooling (CPU GC pressure, not GPU — but still stutters).
- Removing a mesh from the scene but **not** disposing geometry/material when nothing else references them.
- **Shared resources:** dispose only when the **last** owner is gone; use ref-counting or central asset caches.

---

## 6. Geometry + Material + Mesh: the holy trinity

- **`BufferGeometry`**: vertex attributes live in GPU buffers (position, normal, uv, …).
- **`Material`**: shading model + GPU program (shader) + parameters.
- **`Mesh`**: binds one geometry + one material (or an array for multi-material groups).

#### Excerpt — mesh + per-frame spin hook

```text
const geometry = new THREE.IcosahedronGeometry(1, 2);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.2,
  roughness: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Per-frame spin
function updateMesh(time) {
  mesh.rotation.y = time * 0.4;
}
```

**Rule of thumb:** reuse **one** geometry for many instances (`InstancedMesh`) when transforms differ but shape does not — draw calls and memory both improve.

#### Excerpt — `InstancedMesh` matrices + `instanceMatrix.needsUpdate`

```text
const count = 2000;
const baseGeom = new THREE.SphereGeometry(0.08, 12, 12);
const baseMat = new THREE.MeshStandardMaterial({ color: 0xeeddcc, roughness: 0.6 });
const instanced = new THREE.InstancedMesh(baseGeom, baseMat, count);

const m = new THREE.Matrix4();
const pos = new THREE.Vector3();
const quat = new THREE.Quaternion();
const scl = new THREE.Vector3(1, 1, 1);

for (let i = 0; i < count; i++) {
  pos.set(
    (Math.random() - 0.5) * 20,
    Math.random() * 4,
    (Math.random() - 0.5) * 20
  );
  m.compose(pos, quat, scl);
  instanced.setMatrixAt(i, m);
}
instanced.instanceMatrix.needsUpdate = true;
scene.add(instanced);

// InstancedMesh.dispose() releases geometry/material once; instance buffer is internal
```

---

## 7. Raycasting: how 3D picking works

**Raycasting** shoots a ray from the camera through a screen pixel and tests intersections against scene objects. Used for clicks, hover, placement tools, and procedural snapping.

#### Excerpt — NDC from pointer + `intersectObjects` (expects `renderer`)

```text
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event, camera, scene) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(scene.children, true);
  if (hits.length > 0) {
    const { object, point, face } = hits[0];
    // object: Mesh or descendant; point: Vector3 in world space
    return { object, point, face };
  }
  return null;
}
```

**Gotchas**

- `recursive: true` (via `intersectObjects` second arg) is needed for nested groups.
- Line and point objects need appropriate raycast thresholds (`params.Line.threshold`, etc.).
- For UI-heavy apps, you may still prefer projecting to NDC and testing quads — raycasting meshes is overkill for HTML-like panels in 3D.

**Click picking** (pointer down): normalize to the same NDC math as `mousemove`; throttle only if you profiled real cost.

#### Excerpt — `pointerdown` picking

```text
renderer.domElement.addEventListener("pointerdown", (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  const ndc = new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(ndc, camera);
  const hit = raycaster.intersectObjects(scene.children, true)[0];
  if (hit) console.log(hit.object.name || hit.object.type, hit.instanceId, hit.point);
});
```

For **`InstancedMesh`**, `hit.instanceId` tells you **which** instance was struck — essential for selection in particle-like setups.

---

## 8. Clock, delta time, and frame-independent animation

Frame rates vary. **Never** assume `60 fps`. Use **delta time** (seconds since last frame) for motion integration.

#### Excerpt — `Clock` + render loop (expects `mesh`, `renderer`, `scene`, `camera`)

```text
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta(); // seconds

  mesh.rotation.y += delta * 1.2; // radians per second-ish feel — tune by eye
  mesh.position.y = Math.sin(clock.elapsedTime) * 0.5; // elapsedTime is robust for oscillation

  renderer.render(scene, camera);
}

animate();
```

`Clock.getDelta()` is convenient; for physics-heavy work, fixed timesteps with an accumulator pattern reduce instability. For scroll-linked or timeline-driven motion, you may drive transforms from **external time** instead of the clock — but the principle stands: **parameterize motion by time, not by frame count**.

#### Excerpt — fixed timestep accumulator skeleton

```text
const FIXED = 1 / 60;
let accumulator = 0;
const clock = new THREE.Clock();

function tick() {
  requestAnimationFrame(tick);
  accumulator += clock.getDelta();
  while (accumulator >= FIXED) {
    // stepSimulation(FIXED);
    accumulator -= FIXED;
  }
}
```

**Avoid** calling `getDelta()` twice in the same frame — the second read is ~0 and kills motion. One clock owner per loop, or use `getElapsedTime()` for oscillators.

---

## 9. Common pitfalls

| Pitfall | Symptom | Fix |
|--------|---------|-----|
| **No dispose** | GPU memory climbs; tab dies on mobile | Central asset ownership; dispose on route unmount |
| **Wrong coordinate space** | Models on their side; lights “from below” | Normalize exporter + `rotateX` import fix; verify Y-up |
| **Texture “not loading”** | Black / white material | Set `texture.colorSpace` correctly; call `needsUpdate`; check CORS and URLs |
| **Aspect not updated** | Stretched after resize | Update `camera.aspect` + `updateProjectionMatrix()` with `setSize` |
| **Near plane at 0** | Depth artifacts / clipping chaos | Keep `near` small but sane (e.g. `0.05`–`0.1` for scenes in “meters”) |
| **Z-fighting** | Flickering coplanar surfaces | Separate meshes slightly, use polygon offset, or merge geometry |
| **Raycast misses** | Clicks pass through | Ensure objects are `visible`, in scene, with valid geometry bounds |
| **`layers` mismatch** | Raycaster ignores objects | Set `raycaster.layers` and `camera.layers` to match object membership |

#### Excerpt — `TextureLoader` + sRGB color space (expects `material`)

```text
// Texture loading with explicit color space (common pitfall)
const loader = new THREE.TextureLoader();
loader.load("/diffuse.jpg", (tex) => {
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  material.map = tex;
  material.needsUpdate = true;
});
```

---

## 10. AI collaboration notes

Large language models are strong at **boilerplate** and **API recall**, weak at **your** scene scale, **your** asset conventions, and **your** performance budget.

**Prompting habits that work**

- Paste **three.js revision** or package version; APIs drift.
- State **Y-up**, **unit scale**, and **renderer** (WebGL vs WebGPU).
- Ask for **dispose** paired with every create pattern.
- Request **minimal examples** first, then compose — not 300-line scenes you cannot audit.

**Verify ruthlessly**

- Memory in DevTools + Performance panel.
- Visual checks with `AxesHelper` / `GridHelper`.
- Raycasting hits logged once, not every frame.

Treat AI output as **untrusted intermediate code** — same as Stack Overflow, but faster.

---

## 11. Tao moment

The scene graph does not “store the world”; it stores **relationships**. The renderer does not “think”; it **walks** — parent to child, mesh by mesh, draw by draw. When you dispose, you are not deleting an object in JavaScript alone; you are **releasing a claim** on memory behind the glass. The tree grows when you listen; it heals when you let go.

---

## Further reading

- [three.js Manual — Fundamentals](https://threejs.org/manual/#fundamentals)
- [three.js Docs — Object3D](https://threejs.org/docs/#api/en/core/Object3D)
- [three.js Docs — Raycaster](https://threejs.org/docs/#api/en/core/Raycaster)

---

## Minimal integration checklist

- [ ] Scene root + camera + renderer sized to canvas
- [ ] Resize handler updates projection matrix + `setSize`
- [ ] Color management: `outputColorSpace`, texture `colorSpace`, tone mapping agreed with art pipeline
- [ ] `requestAnimationFrame` loop with `Clock` or equivalent delta
- [ ] Disposal path for geometries, materials, and textures on teardown

When this checklist is boring, you are ready for **Lesson 1.3 — React Three Fiber**: the same graph, reconciled through React.
