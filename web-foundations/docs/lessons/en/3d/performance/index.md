# Performance — Respect for the User's Device

> *"Performance is not optimization. Performance is respect."*

---

## The frame budget: 16.6 ms is a social contract

At 60fps, each frame has about **16.6 ms** of wall-clock budget. That is not “GPU time”; it is **everything**:

1. **JavaScript** (React reconciliation, GSAP, physics, your own logic)
2. **Style recalc + layout** (DOM still exists around your Canvas)
3. **Paint** (layers, large composited areas)
4. **Composite** (browser squashes layers to screen)
5. **GPU** (three.js submit, rasterization, post-processing)

Drop below budget and the user feels **lag**; sustain overload and mobile devices **thermally throttle**, making the experience **non-linearly** worse.

**High-refresh displays** (90/120 Hz) halve or quarter the budget—many sites **cap** `devicePixelRatio` and **skip** every other frame on effects, intentionally or accidentally. Document your **target Hz** in the README so QA does not file false bugs.

> **CodeSandbox vs excerpts:** Blocks labeled **CodeSandbox-ready** are complete minimal runnable examples. Blocks labeled **Excerpt** are snippets only—not standalone projects. **Utility module** blocks are helpers to import from your own entry file.

**Utility module — Frame budget helpers**

```js
export function msPerFrame(fps) {
  return 1000 / fps;
}

// Example targets
export const targets = {
  desktop: msPerFrame(60),
  highRefresh: msPerFrame(120),
  mobileConservative: msPerFrame(30), // plan degradation path explicitly
};
```

---

## Profiling tools: where to look first

### Chrome DevTools Performance + GPU

- Record a trace while interacting; mark **long tasks** on the main thread.
- **Rendering** tab: watch **paint flashing** and layer borders.

### `stats.js` + three.js `renderer.info`

**CodeSandbox-ready — Stats panel over a simple scene**

```js
import * as THREE from "three";
import Stats from "stats.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111118);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.2, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);
document.body.style.margin = "0";

const stats = new Stats();
document.body.appendChild(stats.dom);

scene.add(new THREE.AmbientLight(0xffffff, 0.35));
const dir = new THREE.DirectionalLight(0xffffff, 0.9);
dir.position.set(2, 5, 3);
scene.add(dir);

const mesh = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.55, 0.16, 120, 20),
  new THREE.MeshStandardMaterial({ color: 0x66aaff, roughness: 0.4 })
);
mesh.position.y = 0.85;
scene.add(mesh);

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener("resize", onResize);

function animate() {
  requestAnimationFrame(animate);
  stats.begin();
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.015;
  renderer.render(scene, camera);
  stats.end();
}
animate();
```

**Utility module — Reusable stats frame hook**

```js
import Stats from "stats.js";

export function attachStats(renderer, scene, camera) {
  const stats = new Stats();
  document.body.appendChild(stats.dom);
  return function frameHook() {
    stats.begin();
    renderer.render(scene, camera);
    stats.end();
    // console.log(renderer.info.render);
  };
}
```

`renderer.info.render` exposes **triangles**, **draw calls**, **geometries**, **textures**—cheap telemetry to log on QA builds.

### Spector.js

Capture a **WebGL frame**; inspect **draw calls**, **state**, **textures**. Essential when a single pass explodes cost.

### RenderDoc

Desktop-only capture of **GPU reality**; invaluable when you need **pixel history** and **pipeline** visualization. Pair with a **native** wrapper or local debug build when web capture is not enough.

---

## Post-processing: pay-per-pass

Each **full-screen quad** pass costs **fill rate** and **bandwidth**. Typical ordering matters: **bloom** after tonemapping vs before can change cost and look. Rough mental accounting:

| Effect | Primary cost | Notes |
|--------|----------------|-------|
| SSAO / GTAO | Samples × resolution | Often first to disable on mobile |
| Bloom | Threshold + blur taps | Mip pyramids help |
| DOF | Depth-dependent blur | Watch edge artifacts |
| Color grade (LUT) | One lookup pass | Usually cheap |

**Utility module — Composer pixel ratio**

```js
export function setComposerPixelRatio(composer, ratio) {
  composer.setPixelRatio(ratio);
  composer.setSize(window.innerWidth, window.innerHeight);
}
```

---

## VRAM budgets: how to estimate

VRAM holds **geometry buffers**, **textures**, **render targets**, **post-processing ping-pong**, and **browser overhead** (images, canvases, compositor).

**Rough texture VRAM** (uncompressed baseline mental model):

**Utility module — RGBA8 size estimate**

```js
export function rgba8VRAM(width, height) {
  return width * height * 4;
}

// ETC2/BC compressed on GPU is much smaller than RGBA8 on disk,
// but mips, cubemaps, and multiple targets add up fast.
```

**Production targets** (starting points):

- **Mobile**: aim **well under 512 MB–1 GB** total GPU pressure including **other tabs**; the OS will kill you without asking nicely.
- **Desktop**: more headroom, but **4K monitors** multiply **fill rate** cost.

Always measure on **real hardware**; simulators lie.

### WebGL caps that bite

Query **`MAX_TEXTURE_SIZE`**, **`MAX_VERTEX_UNIFORM_VECTORS`**, and **anisotropy** limits on **minimum-spec** devices. Safari and older Android GPUs **fail** in ways desktop Chrome never rehearses.

**Utility module — Log WebGL caps**

```js
export function logWebGLCaps(gl) {
  if (!gl) return;
  console.log('MAX_TEXTURE_SIZE', gl.getParameter(gl.MAX_TEXTURE_SIZE));
  console.log('MAX_RENDERBUFFER_SIZE', gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
}
```

---

## Draw call reduction: instancing, merging, atlases

Each **draw call** has CPU-side overhead in the driver path. Strategies:

- **`InstancedMesh`** for repeated props (trees, bolts, chairs).
- **Merge geometries** that share material (watch **UV** continuity).
- **Texture atlas** to keep **material count** low—trade **UV pain** for **fewer binds**.

**Utility module — Instanced mesh factory**

```js
import * as THREE from "three";

export function makeInstanced(meshGeometry, material, count) {
  const mesh = new THREE.InstancedMesh(meshGeometry, material, count);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  return mesh;
}
```

**When not to merge:** objects needing **per-object frustum culling** may be faster **unmerged** if merged bounding volumes are huge. Profile both.

---

## Frustum culling vs occlusion culling

- **Frustum culling**: three.js culls objects outside the camera frustum by default (`frustumCulled = true`). Keep **world matrices** updated.
- **Occlusion culling**: **not** automatic. Techniques include **manual zones**, **hierarchical portals**, **depth pre-pass** heuristics, or **GPU queries** (heavy, rare on web).

**Utility module — Frustum vs sphere test**

```js
export function sphereVisibleToCamera(camera, center, radius) {
  const frustum = new THREE.Frustum();
  const matrix = new THREE.Matrix4().multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  );
  frustum.setFromProjectionMatrix(matrix);
  const sphere = new THREE.Sphere(center, radius);
  return frustum.intersectsSphere(sphere);
}
```

For interior scenes, **room-based** toggling beats fancy algorithms.

---

## LOD: level of detail that ships

**LOD** in three.js often means:

- `THREE.LOD` object with **discrete** child meshes at distances, or
- **Separate asset files** swapped by your loader (common in production).

**Utility module — `THREE.LOD` builder**

```js
import * as THREE from "three";

export function buildLOD(highMesh, lowMesh, thresholds) {
  const lod = new THREE.LOD();
  lod.addLevel(highMesh, 0);
  lod.addLevel(lowMesh, thresholds[0]);
  return lod;
}
```

Authoring LODs in Blender (decimate + bake normals) beats **runtime** decimation for quality.

---

## Texture compression impact

**Smaller textures** mean:

- Less **bandwidth** (mobile GPUs are **memory-bound** often)
- Less **cache thrash**
- Faster **upload** time on first paint

KTX2/Basis is the default professional web path; see the **KTX2** and **asset pipeline** lessons for CLI integration.

---

## Demand frameloop + invalidate pattern (R3F)

R3F’s default **demand** render mode only repaints when the scene **invalidates**. For mostly static scenes:

**Excerpt — Incomplete invalidate sketch (do not copy as-is)**

```text
import { useThree } from "@react-three/fiber";

export function useInvalidateOn(change) {
  const invalidate = useThree((s) => s.invalidate);
  // In real code, depend on specific store updates / props.
  invalidate();
}
```

**Utility module — Invalidate when a value changes**

```js
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export function useInvalidateWhen(value) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  }, [value, invalidate]);
}
```

**Caution:** forgetting to invalidate when **uniforms** change off-thread leads to “nothing moves” bugs. When in doubt, `frameloop="always"` during prototyping, then **earn** demand mode back with profiling.

---

## Adaptive quality: device tiers

Detect **GPU tier** heuristically (UA + WebGL params + optional benchmarks), then scale:

- **Resolution scale** (`setPixelRatio` capped)
- **Shadow map sizes**
- **Post-processing** stack depth
- **Particle counts** / **splat** caps

**Utility module — Heuristic pixel ratio cap**

```js
export function pickPixelRatio() {
  const dpr = window.devicePixelRatio || 1;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const cap = isMobile ? 1.25 : 2;
  return Math.min(dpr, cap);
}
```

Pair with **`prefers-reduced-motion`** to disable **non-essential** motion passes.

### Thermal throttling: the hidden frame budget

Laptops and phones **lower clocks** when hot. A scene that **passes** profiling on a cold device can **fail** after five minutes. **QA protocols** should include a **soak test**: loop the experience, watch **fps** decay and **fan** curves.

---

## Main thread vs workers

Decoders (Draco, Basis, meshopt) and **heavy JSON** parsing belong in **workers** when bytes are large. Rules:

- Transfer **ArrayBuffers** with **transfer lists** to avoid copies.
- Never **touch DOM** from workers.
- Post **progress** messages sparingly (batch per 100 ms) to avoid chatter.

---

## Memory leaks: `dispose()` everything

GPU memory is **not** GC’d like JS objects. Dispose:

- `geometry.dispose()`
- `material.dispose()` (and **textures** on that material)
- `texture.dispose()`
- **RenderTargets** when recreated

**CodeSandbox-ready — Dispose a hierarchy (run before dropping a scene)**

```js
import * as THREE from "three";

export function disposeObject3D(root) {
  root.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((m) => {
        for (const key of Object.keys(m)) {
          const val = m[key];
          if (val && val.isTexture) val.dispose();
        }
        m.dispose();
      });
    }
  });
}

const scene = new THREE.Scene();
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({ color: 0x888899 })
);
scene.add(mesh);
disposeObject3D(scene);
```

In R3F, **strict mode** double-mounts in dev—ensure effects **clean up** loaders and GPU experiments.

### `renderer.dispose()`

When unmounting a **long-lived** Canvas (SPA route change), call **`renderer.dispose()`** and remove the canvas from the DOM. Leaked **WebGL contexts** are **finite** per tab in some browsers.

---

## React-specific: avoiding re-render storms in R3F

- Do not put **fast-changing** vectors (`useFrame` mouse follow) into React **state**.
- Prefer **`useRef`** for mutable values read in `useFrame`.
- **`memo`** presentational components that receive stable props.
- Split **UI React** from **Canvas** so DOM updates do not drag the fiber reconciler through hot paths.

**Excerpt — `useFrame` follow (parent passes `meshRef`)**

```js
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FollowPointerMesh({ meshRef }) {
  const target = useRef(new THREE.Vector3());
  useFrame(({ pointer, camera }) => {
    target.current.set(pointer.x, pointer.y, 0.5).unproject(camera);
    if (meshRef.current) meshRef.current.position.lerp(target.current, 0.1);
  });
  return null;
}
```

---

## Scheduling: `requestAnimationFrame` discipline

- One **authoritative** rAF driver per Canvas (R3F already coordinates this).
- Avoid **nested** rAF loops from plugins.
- If you **pause** the experience (modal, tab hidden), **stop** expensive simulation; use **Page Visibility API**.

**Utility module — Pause when tab hidden**

```js
export function onVisibilityPause(callback) {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) callback();
  });
}
```

---

## AI notes (working with copilots)

- Ask for **before/after** `renderer.info` expectations, not vague “make it faster.”
- Have AI propose **instancing** only after identifying **repeated draws** in Spector captures.
- Reject suggestions to **`setInterval` render** three.js; use **rAF** / R3F loop.
- Request **cleanup functions** for every `useEffect` that creates GPU resources.

---

## Tao moment

The user’s device owes you **nothing**. It runs your tabs, their music, their battery anxiety, and the OS **Compositor of Judgment**. Performance is how you **bow**: fewer draws, honest mips, textures that end when the scene ends. Speed is not vanity; it is **room**—for attention, for empathy, for the next page they choose to open.

---

## Further reading

- [three.js tips — performance](https://threejs.org/manual/#en/fundamentals/performance)
- [Chrome DevTools — Performance](https://developer.chrome.com/docs/devtools/performance)
- [Spector.js](https://spector.babylonjs.com/)
- [RenderDoc](https://renderdoc.org/)
