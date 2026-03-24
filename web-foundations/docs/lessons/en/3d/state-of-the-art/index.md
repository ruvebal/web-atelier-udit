# Frame vs A‑Frame and the 2026 Web‑3D Stack

A research‑guided report + starter boilerplate for a React Router app (with 360 photos, textures, 3DGS, and AI‑assisted workflow)

## Terminology and what I’m comparing

Your message uses “Frame” and “Frame A”, plus “Frameware Motion”, “3GS”, and “GS libraries”. In current Web‑3D practice, the closest matches are:

- **“Frame A” → A‑Frame**: an HTML‑first framework for 3D/AR/VR on the web. It’s built on top of three.js and uses an Entity‑Component‑System (ECS) architecture. [1] [15] [16]
- **“Frame” → React Three Fiber (R3F) / three.js approach** inside a React Router app: R3F is a React renderer for three.js that lets you build a scene graph declaratively within React, which fits naturally with React Router UI. [2]
- **“Frameware Motion” → Motion (formerly Framer Motion)**: a production‑grade React animation library with layout/gesture/scroll animation. [3]
- **“3GS” → 3D Gaussian Splatting (3DGS)** (very likely, given your “blend assets into scene” context): splats are increasingly used alongside meshes, videos, and panoramas. [4] [13] [34] [35]
- **“GS libraries” → GSAP** (also relevant): GSAP is still the go‑to timeline engine for scroll‑driven and cinematic transitions, including within 3D scenes. [5]

If “Frame” meant a different tool in your internal vocabulary, tell me its exact name and I’ll redo the comparison precisely. For the rest of this report, I’ll use **R3F** as “Frame” and **A‑Frame** as “Frame A” because that’s the most actionable for a React Router + 3D pavilion workflow.

## State of the art in Web 3D today

Web‑3D in 2026 is defined by a stable set of **standards + asset formats + runtime choices**:

**Core platform standards**

- **WebGPU** is now the “next‑gen” GPU API for the web: it provides more modern GPU access, lower overhead, and compute capabilities beyond WebGL. [6]
- WebGPU is supported across major browsers (Chrome/Edge/Firefox/Safari), and modern production approaches assume **feature detection + fallback** when needed. [7]
- **three.js has a WebGPU renderer**: `WebGPURenderer` is positioned as the alternative to `WebGLRenderer` and can fall back to a WebGL2 backend when WebGPU isn’t available. [8]
- **A‑Frame also tracks WebGPU**: A‑Frame 1.7.0 explicitly includes “WebGPU and TSL support”. [9]
- **WebXR** remains the standard way to deliver VR/AR to headsets on the web, including device selection, frame scheduling, and pose tracking. [10]

**Asset formats that now dominate professional pipelines**

- **glTF 2.0** is the default “delivery format” for 3D models because it’s designed for efficient transmission and runtime processing. [11]
- **KTX 2.0 + Basis Universal** is the dominant strategy for GPU‑compressed textures on the web, because it can be transcoded at runtime to GPU formats efficiently. [12] [27]

**Emerging “new medium” assets (important for architecture)**

- **3D Gaussian Splatting (3DGS)** is now widely used for photoreal scene capture and web viewing, with robust engine support (notably in PlayCanvas) and multiple web viewers. [4] [13] [32] [34]

The practical takeaway: the “modern pro stack” mixes **WebGPU/WebGL**, **glTF**, **KTX2**, and often **3DGS** for captured spaces, with a UI framework (React) on top.

## Frame vs A‑Frame in a React Router application

This is the core comparison you asked for, with a focus on **textures**, **360 photos**, and **editorial UI integration**.

### Mental model difference

**A‑Frame**

- You author scenes as **HTML primitives** and components; it’s intentionally approachable. [14]
- It’s built on top of three.js; you can reach the underlying three.js scene graph if needed. [15]
- It uses an ECS architecture (entities + components), which is familiar to many game/XR workflows. [16]

**R3F (React Three Fiber)**

- You author the scene graph as **React components**; it integrates directly with React state, routing, and composition. [17]
- Great fit for “UI + 3D” hybrid apps (like your pavilion) because you can treat 3D as one subsystem inside a React Router UI.

### Textures and asset workflows: what differs in practice

**A‑Frame: asset management + primitives**

- A‑Frame provides an **Asset Management System** (`<a-assets>`) to preload/cache assets. [18]
- For a 360 photo background it has a first‑class primitive **`<a-sky>`**, which maps a 360° equirectangular image onto the inside of a sphere. [19]
- For 360 video it has **`<a-videosphere>`**. [20]

**R3F/three.js: loaders + explicit control**

- You directly manage loaders (textures, glTF, KTX2) through three.js loaders and R3F helpers.
- For **KTX2**, three.js provides `KTX2Loader`, which parses/transcodes KTX2 and uses the Basis transcoder (WASM). [21]
- For glTF, three.js provides `GLTFLoader`. [22]

### When to choose which (for your pavilion + teaching)

**Choose A‑Frame when**

- You want the fastest on‑ramp for students to build VR/360 tours with minimal code.
- The project is primarily “scene authoring” with less UI complexity.
- You want ECS concepts and HTML primitives as the teaching medium. [23]

**Choose R3F when**

- Your app is UI‑heavy (editorial navigation, menus, route‑driven experiences) and you want everything to be React‑native.
- You need fine control over memory, performance strategies, and custom pipelines (KTX2, meshopt, 3DGS mixed with meshes).
- You want clean integration with **React Router SSR/SPA modes**, and route‑driven 3D experiences. [24] [38]

### The “truth” about textures: both end up in the same GPU reality

Even though authoring styles differ, both paths converge on the same technical constraints:

- **PNG/JPEG** are typically decompressed into large uncompressed GPU textures at runtime.
- **KTX2 (Basis) textures** aim to reduce download size and also reduce GPU memory footprint by staying in GPU‑compressed formats. [12] [27]

So the real difference is not “what the GPU can do”, it’s **how you author, preload, and govern assets**.

## How to blend multiple asset types into one 3D scene

Below is an asset taxonomy and the “blending patterns” that work well in a pavilion.

### 360 photographs as an environment layer

**A‑Frame approach (fastest)**

- Use `<a-sky>` with an equirectangular image for instant pano background. [19]

**three.js/R3F approach (more control)**

- Use an equirectangular texture either as:
  - **Scene background** (simple immersive background), and/or
  - **Environment lighting** for PBR models (more “architectural realism”) using PMREM.

three.js provides `PMREMGenerator.fromEquirectangular()` specifically for generating a PMREM from an equirectangular texture, and notes an “ideal” input size of 1k (1024×512) for the conversion pipeline. [25]

**Key teaching point:** one panorama can serve two roles:

- “What you see behind everything” (background)
- “How your materials look” (environment lighting)

### Mesh assets (glTF) + compressed geometry + compressed textures

For architecture, the professional baseline is:

- **glTF for models** [26]
- **KTX2 textures via `KHR_texture_basisu`** to replace PNG/JPEG textures inside a glTF. [27] [42]
- **Meshopt compression** (`EXT_meshopt_compression`) for geometry/animation payload size reduction. [28]

Tooling that makes this teachable:

- **glTF‑Transform** exposes `KHR_texture_basisu` and meshopt utilities; it explicitly notes you must compress the image data first and then attach `.ktx2` payloads (i.e., it’s a pipeline step, not magic). [29]

### Video textures inside the pavilion

Video is the “secret weapon” for editorial pavilions (projection walls, moving collages).

- three.js provides `VideoTexture` and notes specific handling when using `WebGPURenderer` (e.g., colorSpace settings). [30]
- A‑Frame offers `a-videosphere` for 360 video environments. [20]

### HTML / UI overlay anchored to 3D (hybrid UI)

For pavilion experiences you often want **real HTML typography** (selection, accessibility, crispness) but spatial placement.

- `@react-three/drei` provides an `Html` helper that “ties HTML content to any object of your scene” and projects it automatically. [31]

This is a major advantage of the R3F ecosystem for editorial UX.

### 3D Gaussian Splatting (3DGS) as a “captured reality layer”

3DGS is great for:

- scanned spaces (rooms, exhibitions, sites)
- “photoreal context” behind curated editorial objects

Evidence of maturity:

- PlayCanvas provides Gaussian Splatting docs and calls it a technique to represent photoreal 3D scenes with many semi‑transparent splats. [32]
- PlayCanvas has published optimization work like compressing Gaussian splats, including discussion of PLY output from capture services. [33]
- There are credible open‑source web viewers:
  - a Three.js‑based 3DGS viewer (GaussianSplats3D) [34]
  - a WebGL splat renderer (antimatter15/splat) [35]
- Some renderers explicitly position themselves as “integrate splats with other meshes”, which is exactly your blending goal. [36]

**Teaching point:** 3DGS is not a “replacement” for glTF; it’s a complementary medium:

- Use **glTF** for authored objects (panels, pavilion architecture, UI props)
- Use **3DGS** for captured reality (site, atmosphere, material context)

## A practical boilerplate for React Router + UI + 3D

This is a “minimal pro” starting point that supports:

- React Router 7 framework mode
- Tailwind
- R3F + drei
- one route that shows a 360 pano
- room to add KTX2 + glTF + 3DGS later

### Project creation baseline

**React Router app scaffold**

- React Router recommends starting from its template via `npx create-react-router@latest …` [37]

**React Router framework modes**

- Framework Mode wraps Data Mode with a Vite plugin and supports SPA/SSR/static strategies. [38]

### Styling baseline (Tailwind)

Tailwind’s own docs mention that installing Tailwind as a Vite plugin is the most seamless integration path for frameworks including React Router. [39]
They also provide a React Router framework guide. [40]

### 3D baseline (R3F + drei)

R3F is explicitly “a React renderer for three.js” for declarative scene building. [2]
Use drei for high‑value helpers like `Html`. [31]

### Boilerplate file layout (recommended for teaching)

- `app/` (React Router routes + UI)
- `app/routes/` (route modules: `/`, `/pano`, `/pavilion`)
- `app/scene/` (3D system)
  - `CanvasRoot.tsx` (single Canvas)
  - `assets/` (loaders and manifest)
  - `components/` (3D panels, lights, camera rig)
- `app/lib/` (utilities: feature detection, performance budgets)
- `.cursor/rules/` (AI rules)

### One “teaching demo” route: 360 photo

**A‑Frame version (fast teaching demo)**

- Use `<a-sky>` with an equirectangular image. [19]

**R3F/three.js version (preferred for pavilion integration)**

- Use an equirectangular texture as **background** and optionally generate a PMREM environment for PBR. `PMREMGenerator` supports equirectangular inputs and describes `.fromEquirectangular`. [25]

### Code examples in this lesson

**CodeSandbox-ready** snippets are complete: you can paste them into a vanilla sandbox (for example `index.html` as the only file, or `index.html` + `main.js` as indicated) and run after adding the listed dependency. **Excerpt** blocks are illustrative only—they omit setup on purpose.

### CodeSandbox-ready: minimal three.js “pavilion slice” (rotating mesh + PMREM-style workflow hook)

Use this as a baseline when teaching “React Router + three.js” before wiring R3F. In CodeSandbox, add the **`three`** dependency and create `index.html` plus `main.js` as below.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Web 3D — minimal three.js loop</title>
    <style>
      html, body { margin: 0; height: 100%; overflow: hidden; background: #0a0a0f; }
    </style>
  </head>
  <body>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

```javascript
// CodeSandbox-ready — add npm package: three
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0f);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.2, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const mesh = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.45, 0.14, 120, 12),
  new THREE.MeshStandardMaterial({
    color: 0x88ccee,
    roughness: 0.4,
    metalness: 0.15,
  })
);
scene.add(mesh);

scene.add(new THREE.AmbientLight(0xffffff, 0.25));
const key = new THREE.DirectionalLight(0xffffff, 1.1);
key.position.set(3, 5, 4);
scene.add(key);

// Teaching hook: swap `scene.background` for an equirectangular `Texture` and/or
// feed the same texture through PMREMGenerator for image-based lighting on PBR materials.
// const pmrem = new THREE.PMREMGenerator(renderer);
// const envRT = pmrem.fromEquirectangular(equirectTexture);
// scene.environment = envRT.texture;

const clock = new THREE.Clock();

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
  const dt = clock.getDelta();
  mesh.rotation.x += dt * 0.25;
  mesh.rotation.y += dt * 0.4;
  renderer.render(scene, camera);
}
frame();
```

### Texture pipeline starter rule (KTX2)

If you plan to move from JPEG/PNG to GPU textures:

- Khronos describes KTX 2.0 adding Basis Universal supercompression and runtime transcoding to GPU formats. [41]
- `KHR_texture_basisu` explicitly allows KTX2/Basis textures in glTF as an alternative to PNG/JPEG to improve transmission and reduce GPU memory footprint. [42]
- three.js `KTX2Loader` is the concrete implementation: parses KTX2, transcodes to GPU formats, relies on WASM (so there are browser constraints). [21]

### Performance baseline you should teach from day one

For students, the fastest path to professional credibility is to learn “how not to melt the GPU.”

R3F provides:

- `frameloop="demand"` to render only when needed, and documentation on scaling performance with this approach. [43]
- pitfalls guidance: put animation updates in the frame loop (`useFrame`) and use proper patterns (lerp/damp/react‑spring), rather than expensive React re-renders. [44]

A‑Frame has also been actively improving memory/performance; for example, A‑Frame 1.6.0 highlights “memory management and performance improvements.” [45]

## AI‑assisted tooling to include before you write code

Your goal is right: _set the rules first, then write code_. Otherwise students learn chaos.

### Cursor Rules setup (the modern way)

Cursor’s docs describe Rules as system‑level instructions for the Agent, and support `.mdc` files with frontmatter to control when rules apply. [46]

A minimal structure:

- `.cursor/rules/00-project.mdc` (always apply)
- `.cursor/rules/10-react-router.mdc` (routes, loaders, SSR conventions)
- `.cursor/rules/20-web3d.mdc` (R3F patterns, asset budgets, disposal, texture pipeline)
- `.cursor/rules/30-style.mdc` (Tailwind, accessibility, naming)

### “House rules” that produce professional 3D code

Below are the _concepts_ to encode (not the literal file content):

- **No unbounded dependencies**: prefer stable primitives; avoid “random npm packages” unless justified.
- **Performance budgets are mandatory**: texture sizes, draw calls, and LOD rules.
- **Always specify the rendering target**: WebGPU available? fallback? (three.js supports fallback inside `WebGPURenderer`). [8]
- **Texture pipeline compliance**: favor KTX2/Basis where possible; ensure loaders are wired.
- **Hybrid UI discipline**: 3D canvas is a subsystem; UI remains accessible HTML (use drei `Html` when anchoring). [31]

### Tailwind “prompting standard” for students

Your students will get better output if their prompts include:

- **Design constraints**: “architecture‑magazine typography, 8pt grid, black/white, one accent color”
- **Accessibility constraints**: keyboard nav, focus states, prefers‑reduced‑motion
- **Code constraints**: type safety, no inline styles unless necessary, component naming conventions
- **Acceptance criteria**: “Lighthouse Performance > X”, “mobile GPU budget”, “no layout shift”

Tailwind’s official docs also align with React Router workflows, which makes it a nice “default styling base” for a class cohort. [47]

### “Cloud code” starting point (React Router on Cloudflare)

Because you asked specifically about cloud instructions: Cloudflare now has a framework guide for React Router v7 and its integration with the Cloudflare Vite plugin for development and deployment. [48]

If you want a class‑friendly deployment story:

- One repo
- `npm run deploy`
- asset hosting + edge SSR options
- room for KV/R2 later for textures/panoramas

(Cloudflare’s docs also describe Vite plugin onboarding and deployment workflows.) [49]

---

If you want, I can generate (in your preferred style) a **ready‑to‑paste set of `.cursor/rules/*.mdc` files** for this exact pavilion curriculum, including:

- R3F “demand frameloop” rule,
- KTX2 + glTF compression rule,
- 360 pano route rule,
- 3DGS integration rule (PlayCanvas vs Three.js viewer options),
- and a grading rubric (what “professional standard” means per assignment).

## Footnotes

[1]: https://aframe.io/docs/?utm_source=chatgpt.com
[2]: https://r3f.docs.pmnd.rs/getting-started/introduction?utm_source=chatgpt.com
[3]: https://motion.dev/docs/react
[4]: https://developer.playcanvas.com/user-manual/gaussian-splatting/
[5]: https://gsap.com/docs/v3/?utm_source=chatgpt.com
[6]: https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API
[7]: https://web.dev/blog/webgpu-supported-major-browsers
[8]: https://threejs.org/docs/pages/WebGPURenderer.html
[9]: https://aframe.io/blog/aframe-v1.7.0/
[10]: https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API
[11]: https://www.khronos.org/gltf/
[12]: https://www.khronos.org/ktx/?utm_source=chatgpt.com
[13]: https://blog.playcanvas.com/compressing-gaussian-splats/
[14]: https://aframe.io/docs/?utm_source=chatgpt.com
[15]: https://aframe.io/docs/1.7.0/introduction/developing-with-threejs.html?utm_source=chatgpt.com
[16]: https://aframe.io/docs/1.7.0/introduction/entity-component-system.html?utm_source=chatgpt.com
[17]: https://r3f.docs.pmnd.rs/getting-started/introduction?utm_source=chatgpt.com
[18]: https://aframe.io/docs/1.7.0/core/asset-management-system.html
[19]: https://aframe.io/docs/1.7.0/primitives/a-sky.html?utm_source=chatgpt.com
[20]: https://aframe.io/docs/1.7.0/primitives/a-videosphere.html
[21]: https://threejs.org/docs/pages/KTX2Loader.html?utm_source=chatgpt.com
[22]: https://threejs.org/docs/pages/GLTFLoader.html
[23]: https://aframe.io/docs/?utm_source=chatgpt.com
[24]: https://r3f.docs.pmnd.rs/getting-started/introduction?utm_source=chatgpt.com
[25]: https://threejs.org/docs/pages/PMREMGenerator.html
[26]: https://www.khronos.org/gltf/
[27]: https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_texture_basisu/README.md?utm_source=chatgpt.com
[28]: https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_meshopt_compression/README.md
[29]: https://gltf-transform.dev/modules/extensions/classes/KHRTextureBasisu
[30]: https://threejs.org/docs/pages/VideoTexture.html?utm_source=chatgpt.com
[31]: https://drei.docs.pmnd.rs/misc/html?utm_source=chatgpt.com
[32]: https://developer.playcanvas.com/user-manual/gaussian-splatting/
[33]: https://blog.playcanvas.com/compressing-gaussian-splats/
[34]: https://github.com/mkkellogg/GaussianSplats3D
[35]: https://github.com/antimatter15/splat/blob/main/README.md
[36]: https://sparkjs.dev/
[37]: https://reactrouter.com/start/framework/installation
[38]: https://reactrouter.com/start/modes
[39]: https://tailwindcss.com/docs
[40]: https://tailwindcss.com/docs/installation/framework-guides/react-router
[41]: https://www.khronos.org/ktx/?utm_source=chatgpt.com
[42]: https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_texture_basisu/README.md?utm_source=chatgpt.com
[43]: https://r3f.docs.pmnd.rs/advanced/scaling-performance
[44]: https://r3f.docs.pmnd.rs/advanced/pitfalls
[45]: https://aframe.io/blog/aframe-v1.6.0/
[46]: https://cursor.com/docs/rules?utm_source=chatgpt.com
[47]: https://tailwindcss.com/docs/installation/framework-guides/react-router
[48]: https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/
[49]: https://developers.cloudflare.com/workers/vite-plugin/get-started/
