# 3D Gaussian Splatting — Captured Reality on the Web

> *"A splat is a photograph that remembers depth."*

**Code in this lesson:** Fenced blocks tagged **CodeSandbox-ready** are complete snippets you can paste into a sandbox or module as-is. Blocks tagged **Excerpt** or **Template** show a pattern only—adapt imports, parent components, URLs, and loader APIs to your stack.

---

## What 3D Gaussian Splatting (3DGS) is

**3D Gaussian Splatting** represents a scene as a large collection of **3D oriented Gaussians** (position, covariance, opacity, spherical harmonics for view-dependent color). At render time, these Gaussians are **splatted** (rasterized as soft blobs) in sorted depth order, producing images that can match or exceed mesh-based photogrammetry for **organic, captured** environments.

Unlike a triangle mesh with UVs, a splat field is **dense, unstructured**, and optimized for **novel view synthesis** from many input photos—not for crisp CAD edges or hand-modeled topology.

---

## 3DGS vs NeRF vs photogrammetry mesh

| Approach | Representation | Web runtime (typical) | Strengths | Weaknesses |
|----------|----------------|------------------------|-----------|------------|
| **Photogrammetry mesh** | Triangle mesh + textures | glTF in three.js | Editable topology, familiar pipeline | Holes, stretched UVs, messy reflections |
| **NeRF** | MLP / grid encoding | Heavy; often pre-rendered or simplified | Very smooth interpolation | Slow inference; harder to ship interactively |
| **3DGS** | Millions of Gaussians | Specialized splat renderers | Fast-ish view synthesis; vivid detail | Huge data; sorting cost; bleeding at depth discontinuities |

**Frontend takeaway:** you rarely “just use GLTFLoader” for splats. You integrate a **splat renderer** or engine feature (PlayCanvas, custom three.js fork, WASM/WebGPU paths) and treat splats as a **media type** alongside meshes and video.

---

## Capture workflow (production sketch)

1. **Capture**: phone, mirrorless rig, or drone; **high overlap** between views; controlled exposure where possible.
2. **Structure-from-motion**: **COLMAP** (or commercial equivalents) recovers camera poses and sparse points.
3. **Training**: optimize Gaussian parameters per scene (original 3DGS paper pipeline or tooling from your chosen stack).
4. **Export**: PLY with custom attributes, `.splat`, or engine-specific compressed containers.
5. **Web delivery**: compress, chunk, stream; show **progressive** quality while decoding.

**Tooling (examples, not exhaustive):** COLMAP for SfM; various **trainers** wrap the reference optimization with GUIs and export presets. Commercial capture apps may skip COLMAP entirely but still output PLY/splat-compatible blobs. Your pipeline owner (TD or technical artist) should own **color matching** and **lens distortion**—the web team receives **frozen** exports plus a **manifest**.

**Excerpt** — Replace `url`, `chunkPattern`, `bounds`, and counts with your CDN layout.

```js
// Conceptual: scene manifest the frontend loads before fetching heavy binary chunks.
export const splatManifest = {
  version: 1,
  url: 'https://cdn.example.com/scenes/lobby/chunks/',
  chunkPattern: 'chunk_{index}.bin',
  chunkCount: 12,
  bounds: { min: [-10, 0, -10], max: [10, 5, 10] },
};
```

---

## File formats: PLY, `.splat`, compressed

- **PLY**: common interchange; can carry **per-Gaussian** properties (position, scale, rotation as quaternion, opacity, SH coefficients). File size is often **large**.
- **`.splat`**: community “packed” formats (conventions vary); attractive for smaller footprints but **watch for endianness and field layout** when piping between tools.
- **Engine-specific**: PlayCanvas and others may use **proprietary or documented** compression schemes optimized for streaming and GPU upload.

**Production rule:** treat every splat file as **untrusted binary**; validate headers, size caps, and decompress in workers where possible.

### Spherical harmonics (why splats “shimmer”)

Many splat pipelines store **view-dependent color** via low-order **spherical harmonics (SH)**. As the camera moves, the radiance field updates—beautiful, but fragile next to **analytic** three.js lighting on meshes. In hybrid scenes, prefer **consistent exposure** (roughly matching the training captures) and avoid slapping a strong **directional light** across the splat expecting PBR-style response.

---

## Web viewers and engines (landscape)

Names shift quickly; verify licenses and bundle sizes before committing.

- **GaussianSplats3D** (and related three.js integrations): popular starting point for **three.js** scenes.
- **antimatter15/splat** ecosystem: reference implementations and viewers worth studying for **sorting** and **data layout** tricks.
- **PlayCanvas**: first-class **splat** support and compression narratives aimed at production web games/experiences.
- **Luma** (and similar platforms): capture + hosting; often a **trade** between convenience and **lock-in / pricing**.

**Reading reference viewers:** Projects like **antimatter15/splat** helped establish **de facto** conventions for web playback. Study them for **sort keys**, **alpha handling**, and how they **pack** orientation. Even if you ship a different library, those decisions explain **why** certain artifacts appear.

When evaluating a viewer, score it on:

- **Sort strategy** (per frame vs hierarchical; GPU radix sort availability)
- **Memory** peak on mobile Safari
- **Integration** with your **post-processing** and **depth buffer** expectations

### PlayCanvas and “engine-native” splats

PlayCanvas documents **splat** workflows aimed at **game-scale** delivery: streaming, compression, and editor tooling. If your product is already on PlayCanvas, splats may be a **first-class** layer with less glue than raw three.js. If you are on **R3F**, you are usually integrating a **community renderer**—budget engineering time for **upgrades** when sorting or packing formats change.

---

## Loading splats in three.js / R3F

Exact APIs differ by library version. The **pattern** is stable:

1. Fetch or parse binary/PLY in a **worker** when files are large.
2. Upload to **GPU buffers** (positions, covariances, colors, SH bands).
3. Render with a **custom shader** or provided `SplatMesh` that performs splat rasterization.

**Template** — Parent must pass `onLoaded` / `onError`; swap `fetch` for your splat loader’s API. Unused imports removed below for a copy-paste-safe excerpt.

```js
import { useEffect } from 'react';

// Pseudocode: replace with your splat loader's real API.
function SplatSource({ src, onLoaded, onError }) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = await res.arrayBuffer();
        if (cancelled) return;
        onLoaded(buf);
      } catch (e) {
        if (!cancelled) onError(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [src, onLoaded, onError]);
  return null;
}
```

**R3F discipline:** keep splat **GPU objects** outside React reconciliation when possible; store handles in refs and dispose on unmount.

**Excerpt** — Attach `splatRef` to your splat object; `focus` must be a `THREE.Vector3` (or compatible) in world space.

```js
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Illustrative: toggle splat visibility by camera distance to a focus point.
export function useSplatDistanceCull({ focus, farThreshold }) {
  const splatRef = useRef(null);

  useFrame(({ camera }) => {
    const obj = splatRef.current;
    if (!obj) return;
    const d = camera.position.distanceTo(focus);
    obj.visible = d < farThreshold;
  });

  return splatRef;
}
```

---

## The hybrid scene: splats + meshes

The **hybrid scene** is the practical sweet spot: splats for **captured context** (rooms, terrain, trees), meshes for **interactive props**, UI anchors, and characters.

Challenges:

- **Depth compositing**: splats may not populate the depth buffer the way opaque meshes do; transparent overlays and SSR-style effects break easily.
- **Lighting mismatch**: meshes use analytic lights + shadows; splats bake **view-dependent** appearance into training—**match exposure** in compositing, not in three.js lights alone.
- **Scale alignment**: export a **shared coordinate frame** (meters, Y-up) and verify with a debug grid.

**Excerpt** — Centers the splat group from `meshAnchor`’s bounds; extend if your scene uses a different alignment rule.

```js
import * as THREE from 'three';

export function alignSplatGroupToMesh({ splatGroup, meshAnchor }) {
  const box = new THREE.Box3().setFromObject(meshAnchor);
  const center = box.getCenter(new THREE.Vector3());
  splatGroup.position.copy(center).multiplyScalar(-1);
}
```

---

## Compression strategies

Follow vendor/engine guidance (e.g. **PlayCanvas** blog posts on splat compression) for the **current** winning approach. Those write-ups usually emphasize **bit packing**, **attribute quantization**, and **ordering** that improves GPU cache behavior—details too volatile to duplicate here, but **essential** reading before you ship a large scene.

General strategies:

- **Quantize** attributes (positions, scales) to 16-bit where error is invisible.
- **Cluster** Gaussians hierarchically and stream **LOD** chunks by camera proximity.
- **Separate** static environment splats from **dynamic** mesh layers so you can cache aggressively on CDN.

**CodeSandbox-ready** — Pure helper; pass counts from your profiler or manifest.

```js
export function estimateVRAMBytes(gaussianCount, bytesPerGaussian) {
  return gaussianCount * bytesPerGaussian;
}
```

Always measure on **real devices**: iPhone Safari and mid-tier Android GPUs punish naive uploads.

---

## Level of detail (LOD) for splats

LOD for splats is not the same as swapping glTF meshes:

- **Decimation**: drop lowest-opacity Gaussians or merge nearby ones (offline).
- **Distance-based chunks**: load high-detail tiles near the camera, coarse tiles far away.
- **Temporal**: render **half resolution** splat pass on thermal throttle, full res for hero moments.

Expose a **quality slider** tied to **Gaussian count cap** and **render scale**, not just pixel ratio.

### Progressive loading UX

**CodeSandbox-ready** — Wire `tickChunk` from your loader’s progress callbacks.

```js
export function makeProgressReporter(onProgress) {
  let loaded = 0;
  return function tickChunk(bytes) {
    loaded += bytes;
    onProgress(loaded);
  };
}
```

Pair byte counts with a **time-based** fallback spinner: networks lie, progress bars lie slightly less.

---

## CDN and caching for splat chunks

Splat scenes often exceed **single-file** comfort. Treat chunks like **HLS segments**:

- **Immutable URLs** with content hashes (`chunk-7f3a… .bin`) for **long `Cache-Control`**.
- **HTTP Range** support if your viewer issues partial fetches (confirm with your hosting layer).
- **Compression**: `br`/`gzip` at the edge for **JSON manifests**; binary chunks may already be packed—test before double-compressing on the fly.

**CodeSandbox-ready** — Browser `fetch`; ensure CORS allows `HEAD` if cross-origin.

```js
export async function headContentLength(url) {
  const res = await fetch(url, { method: 'HEAD' });
  const len = res.headers.get('content-length');
  return len ? Number(len) : null;
}
```

---

## Accessibility and ethics

Splats are **not** inherently accessible: screen readers do not “read” a radiance field. Pair them with:

- **Textual** descriptions of the space and navigation affordances.
- **Keyboard** paths if you embed hotspots or portals inside the experience.
- **Consent** when capturing **people** or private property; splats can preserve **faces** and signage.

---

## Current limitations and browser support

- **Sorting cost** scales with splat count; worst cases stutter before GPU fill is the bottleneck.
- **Safari / WebGL** quirks: watch for buffer limits, shader precision, and **memory pressure** kills.
- **WebGPU** paths may outrun WebGL for sort-heavy pipelines—keep **feature detection** and a **mesh fallback** image or video for unsupported environments.
- **Legal / privacy**: captured splats can leak **identifiable** detail; treat like photography in consent workflows.

---

## Troubleshooting quick reference

| Symptom | Likely cause | Mitigation |
|---------|--------------|------------|
| Shimmering / sparkle | Sorting errors or SH + exposure mismatch | Update sort each frame; tame lights; match training exposure |
| “Halo” around silhouettes | Alpha blending + depth | Adjust blend modes; consult renderer docs; separate passes |
| Mobile tab reloads | GPU memory spike | Lower splat count; smaller render target; split scenes |
| Desynced mesh + splat | Scale / axis mismatch | Explicit units; debug axes; re-export with shared origin |
| First frame garbage | Async upload race | Hide until GPU ready event from your loader |

---

## AI notes (working with copilots)

- Ask for **library-specific** integration (exact import paths change fast); always verify against npm README.
- Request **worker-based** loaders and **progress events**; reject synchronous parse of multi-hundred-MB files on the main thread.
- Have AI generate **debug visualizations** (bounding boxes, chunk borders) before polishing art.
- When the model “invents” a `.splat` byte layout, **cross-check** with a known open implementation.
- Ask for **comparison tables** between two specific libraries with **bundle size** and **last commit date**—force grounding.
- Request **fallback assets**: a poster image sequence or low-res mesh for `prefers-reduced-motion` and low-tier devices.

---

## Tao moment

A splat scene is **memory made navigable**—not geometry you sculpted, but light you **bottled**. On the web, respect becomes **compression without cruelty**: enough detail to feel true, enough restraint to let the user’s device breathe. Splats and meshes are not rivals; they are **two dialects** of the same wish: that the world could be **entered** without leaving the tab.

---

## Production checklist (before you promise a date)

1. **Freeze** export format and viewer version in the ticket; note **upgrade path**.
2. **Profile** on **oldest supported iPhone** with low power mode on.
3. **Define** fallback: poster, video, or simplified mesh.
4. **Measure** LCP impact: splat decode must not block **critical** UI.
5. **Log** parse time, GPU upload time, first valid frame—**three numbers** in your analytics.
6. **Legal** review for recognizable people and trademarks in the capture.
7. **Document** coordinate system and **scale** for every mesh that must align.

---

## When splats win (and when they lose)

**Choose splats when**

- The hero is a **captured** place (venue, landscape, installation) and mesh reconstruction looks **waxy** or **holey**.
- You need **parallax** beyond a static 360° photo but cannot afford a film crew for mesh cleanup.

**Avoid splats when**

- You need crisp **CAD** edges, boolean operations, or reliable **collision** meshes.
- You must hit **strict** bundle budgets on **feature phones** without a fallback.
- Your art direction is **stylized**—meshes and hand-painted textures may be cheaper and more controllable.

---

## Further reading

- [3D Gaussian Splatting for Real-Time Radiance Field Rendering (paper)](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)
- [COLMAP](https://colmap.github.io/)
- [PlayCanvas engine](https://github.com/playcanvas/engine)
- [three.js manual — loading data](https://threejs.org/manual/#en/fundamentals/load-gltf-files)
