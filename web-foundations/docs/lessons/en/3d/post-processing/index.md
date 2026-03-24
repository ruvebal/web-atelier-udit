# Post-Processing — The Cinematic Layer

> *"Post-processing is the color grading of the web — the last place where mood is decided, and the first place where frame time quietly dies."*

Post-processing is a **second rendering pass** (often many passes) that takes the rendered scene as a texture and runs fullscreen effects: bloom, depth of field, anti-aliasing, color grading. It turns clinical 3D into something *felt* — but each pass is a full-screen quad touching every pixel.

This lesson compares composer stacks in vanilla Three.js vs React, tours common passes, ranks performance impact, and names when to leave the pipeline off entirely.

---

## EffectComposer (three.js) vs `@react-three/postprocessing`

**Vanilla Three.js** (`examples/jsm/postprocessing`):

- Explicit `EffectComposer`, `RenderPass`, then stack passes in order.
- Full control, imperative lifecycle, you own resize and pixel ratio.

**`@react-three/postprocessing`** (pmndrs):

- Declarative wrappers in R3F; sane defaults; easier experimentation.
- Still runs real passes under the hood — not magically cheaper.

Choose vanilla when you need **custom pass order**, **ping-pong FBO tricks**, or minimal dependencies. Choose pmndrs when you are already in R3F and want speed of iteration.

---

## Minimal EffectComposer setup (vanilla JS)

> **CodeSandbox vs excerpts:** Blocks labeled **CodeSandbox-ready** are complete minimal runnable examples. Blocks labeled **Excerpt** are snippets only—not standalone projects.

**CodeSandbox-ready — Renderer, scene, and bloom composer**

```js
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050508);

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
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
document.body.appendChild(renderer.domElement);
document.body.style.margin = "0";

scene.add(new THREE.AmbientLight(0xffffff, 0.2));
const key = new THREE.DirectionalLight(0xffffff, 1.2);
key.position.set(3, 5, 2);
scene.add(key);

const core = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.55, 0.18, 160, 24),
  new THREE.MeshStandardMaterial({
    color: 0x222233,
    emissive: 0x4455ff,
    emissiveIntensity: 0.85,
    roughness: 0.35,
    metalness: 0.6,
  })
);
core.position.y = 0.9;
scene.add(core);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.85,
  0.4,
  0.85
);
composer.addPass(bloom);

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
}
window.addEventListener("resize", onResize);

function animate() {
  requestAnimationFrame(animate);
  core.rotation.x += 0.004;
  core.rotation.y += 0.007;
  composer.render();
}
animate();
```

**Excerpt — Wire composer to an existing renderer**

```js
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.85,  // strength
  0.4,   // radius
  0.85   // threshold
);
composer.addPass(bloom);

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  composer.setSize(w, h);
}

function animate() {
  requestAnimationFrame(animate);
  composer.render();
}
```

**Resize rule:** Composer **and** renderer must match size and device pixel ratio changes.

### Pixel ratio and internal resolution

High DPR phones multiply fragment cost. A common split:

**Excerpt — Cap pixel ratio on renderer and composer**

```js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

For heavy stacks, cap composer at `1` while keeping a sharper **first** render only if your design allows — many teams run bloom/DOF at half-res inside custom passes.

### Cleanup (SPAs, route changes)

**Excerpt — Dispose passes**

```js
composer.dispose();
bloom.dispose();
renderPass.dispose();
// dispose each pass that allocates render targets
```

Leaked render targets show up as rising GPU memory in DevTools.

---

## RenderPass

The foundation: renders `scene` with `camera` into an internal buffer. Every stack starts here (or an equivalent custom first pass).

---

## UnrealBloomPass (bloom)

Bright pixels bleed — **emissive** materials and HDR highlights kick hardest. Parameters:

- **Threshold** — luminance above this blooms.  
- **Strength** — intensity.  
- **Radius** — blur spread.

**Selective bloom** (production pattern): render bright objects to a separate layer or mask, bloom *that* buffer, composite — avoids bloomy UI and gray midtones washing out.

Conceptual approach:

1. `RenderPass` for full scene (no bloom).  
2. Second scene/camera or override material pass that outputs only emissive/highlights.  
3. Bloom that buffer, add to base — exact wiring varies by technique (MRT, layers, or composer addons).

---

## BokehPass (depth of field)

Uses **depth buffer** + circle of confusion to blur out-of-focus regions. **Physically plausible** is not the goal on the web — *believable* is.

**Cost:** Depth-dependent blur = multiple taps per pixel. Tune quality knobs down on mobile.

**Excerpt — BokehPass**

```js
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";

const bokeh = new BokehPass(scene, camera, {
  focus: 10.0,
  aperture: 0.00015,
  maxblur: 0.01,
});
composer.addPass(bokeh);
```

Ensure your materials write depth and your **near/far** planes are sane — depth precision matters for DOF stability.

---

## SSAOPass and screen-space “extras”

`SSAOPass` (screen-space ambient occlusion) darkens creases using **depth + normals** — cheap-ish contact shadow feel without ray tracing. It shares the usual SSA weaknesses: thin geometry flicker, halo at depth discontinuities, parameter tuning per scene.

Treat SSAO as **seasoning**: subtle radius and intensity. On mobile, skip entirely or use baked AO in textures instead.

**Excerpt — SSAOPass**

```js
import { SSAOPass } from "three/addons/postprocessing/SSAOPass.js";

const ssao = new SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
ssao.kernelRadius = 8;
ssao.minDistance = 0.005;
ssao.maxDistance = 0.1;
composer.addPass(ssao);
```

---

## SMAAPass / FXAAPass (anti-aliasing)

**FXAA** — cheap edge blur in post; can soften fine detail.  
**SMAA** — smarter pattern detection; slightly more cost, often nicer than FXAA.

If you already use **MSAA** on the main framebuffer, you may skip post AA — but many post stacks render to textures where MSAA does not apply the same way; **composer often needs its own AA pass**.

**CodeSandbox-ready — SMAA after bloom (same scene as bloom demo, swap passes)**

```js
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x08080c);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.1, 3.8);

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);
document.body.style.margin = "0";

scene.add(new THREE.AmbientLight(0xffffff, 0.25));
const dir = new THREE.DirectionalLight(0xffffff, 1);
dir.position.set(2, 4, 3);
scene.add(dir);

const mesh = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.75, 1),
  new THREE.MeshStandardMaterial({
    color: 0xeeeeff,
    roughness: 0.2,
    metalness: 0.15,
  })
);
mesh.position.y = 0.75;
scene.add(mesh);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(
  new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.35,
    0.35,
    0.9
  )
);
composer.addPass(new SMAAPass(window.innerWidth, window.innerHeight));

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
}
window.addEventListener("resize", onResize);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.01;
  composer.render();
}
animate();
```

**Excerpt — SMAAPass only**

```js
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";

const smaa = new SMAAPass(window.innerWidth, window.innerHeight);
composer.addPass(smaa);
```

---

## Custom shader passes

`ShaderPass` wraps a `ShaderMaterial` with fullscreen quad — your entry to **grain**, **vignette**, **chromatic aberration**, **custom color curves**.

**Excerpt — Vignette `ShaderPass`**

```js
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

const vignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    offset: { value: 0.95 },
    darkness: { value: 1.2 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float offset;
    uniform float darkness;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      vec2 uv = (vUv - vec2(0.5)) * vec2(offset);
      float vign = clamp(1.0 - dot(uv, uv), 0.0, 1.0);
      gl_FragColor = vec4(texel.rgb * mix(1.0, vign, darkness), texel.a);
    }
  `,
};

const vignettePass = new ShaderPass(vignetteShader);
composer.addPass(vignettePass);
```

`uniforms.tDiffuse` is wired automatically by `ShaderPass` to the previous pass’s output.

### `CopyShader` and blitting

Internally many pipelines end by copying the final buffer to the screen. If you build **custom** composers, you may use `ShaderPass` with `CopyShader` for ping-pong buffers. Prefer higher-level passes when available — fewer ways to forget a `texture.flipY`.

---

## Color grading with LUT textures

**3D LUT** — a small volume texture encodes color transform (film look, brand palette). Sample `rgb` as `uvw` into the LUT in a `ShaderPass`.

Pipeline:

1. Author grade in DaVinci/Photoshop, export `.cube` or PNG LUT strip.  
2. Convert to format your shader expects (2D strip or 3D texture).  
3. One pass at end of chain.

**Warning:** LUTs are **not** a substitute for correct **tone mapping** and **color space** — fix exposure first, grade second.

---

## Film grain, chromatic aberration, vignette

- **Grain** — high-frequency noise; hides banding, adds texture; can shimmer if not time-filtered.  
- **Chromatic aberration** — split RGB channels slightly — use sparingly; excess reads “cheap VR”.  
- **Vignette** — directs eye; cheap if implemented as single pass.

Often bundled in “cinematic” presets — **preset ≠ free**; still costs fill rate.

---

## Performance cost ranking (typical, fullscreen 1080p)

Order is **rough** — measure on your target devices:

1. **Lightweight color tweak** (single simple shader) — baseline.  
2. **FXAA** — cheap.  
3. **SMAA** — moderate.  
4. **Bloom** (multi-pass blur) — moderate to high depending on resolution and iterations.  
5. **SSAO / SSR-class** (if you add screen-space effects) — high.  
6. **Depth of field** (wide blur radius) — high.  
7. **Stacking many passes** — **multiplicative** feel: each pass reads/writes full-screen targets.

**Mitigations:** Lower internal resolution for heavy passes (`composer.setPixelRatio(1)` while renderer uses DPR), half-res bloom, cap mobile effects, use `HalfFloatType` only when needed.

---

## When NOT to use post-processing

- **Information-dense UI** / data viz — clarity beats mood.  
- **Low-end mobile** with already heavy PBR + shadows — composer is the straw.  
- **XR** — latency and stereo constraints favor minimal post.  
- **When material work suffices** — `MeshPhysicalMaterial` + good env + ACES tone mapping can replace half the stack.

Sometimes **one** tone-mapping + **good lighting** beats five Instagram filters.

---

## `@react-three/postprocessing` (React integration)

The pmndrs package wraps the same pass concepts: composer + ordered effects. In **JavaScript** React files you import effect components and nest them under `EffectComposer` (JSX syntax is the React DSL, not TypeScript). Keep the effect tree **stable** across frames — do not mount/unmount passes every tick.

**Excerpt — Typical import and composition notes**

```text
// Typical imports (names vary slightly by package version):
// import { EffectComposer, Bloom, Vignette, SMAA } from "@react-three/postprocessing";
// Usage pattern: wrap your Canvas contents so passes run after the scene renders.
```

Consult the package version you pinned in `package.json`; post APIs move faster than core three.

---

## Output transform and “why my bloom looks wrong”

Post chains operate in **linear HDR-ish** space until something maps to display. Mismatch between **renderer tone mapping** and **composer output** causes washed or crushed blacks.

Modern stacks often add an **output pass** or rely on renderer settings so the **last** stage matches `outputColorSpace`. If you see gamma banding after post, you are debugging **color space**, not “bloom strength.”

**Checklist:**

- Texture color spaces (`SRGBColorSpace` vs linear) set correctly  
- `toneMapping` and `toneMappingExposure` coherent with HDR env  
- Final pass writes **sRGB** (or your target) when the canvas is 8-bit

---

## OutlinePass and selection effects (brief)

`OutlinePass` (addons) draws an outline around selected objects — common for editor UIs and product configurators. It is another full-scene-style pass with its own depth considerations. Prefer **stencil** or **fresnel** tricks for game-style outlines if you need predictable cost.

---

## AI notes

- Post snippets often omit **`composer.setSize`** on resize — black bars or blur mismatch follow.
- Ask explicitly for **HalfFloat vs UnsignedByte** render targets if using HDR bloom — wrong type = clipped highlights.
- **Selective bloom** is rarely one pass — be skeptical of single-pass “mask” solutions without compositing explanation.
- Verify import paths for your **three** revision (`three/addons/postprocessing/...`).

---

## Tao moment

The scene is truth; the composer is poetry. Poetry is optional — and every line costs ink. End with the smallest stack that still makes the user **feel** what you need them to feel. If an effect does not change a decision or an emotion, delete it. The cinematic layer is not makeup; it is **intention**, applied once, with a steady hand.

---

## Further reading

- [EffectComposer examples](https://threejs.org/examples/?q=postprocessing)
- [three.js postprocessing module](https://github.com/mrdoob/three.js/tree/dev/examples/jsm/postprocessing)
- [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)
- [Tone mapping — Three.js](https://threejs.org/docs/#examples/en/renderers/WebGLRenderer.toneMapping)
