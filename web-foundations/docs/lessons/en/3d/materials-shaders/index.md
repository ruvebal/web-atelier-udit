# Materials & Shaders — PBR, GLSL & the Language of Light

> *"A shader is a tiny poem the GPU reads sixty times a second."*

**Lesson 2.1** in the 3D Web curriculum. You already know how a scene graph hangs together; here we focus on *how surfaces answer light* — from stock PBR materials to custom GLSL, surgical patches, and the node-based future (TSL) on WebGPU.

---

## Learning outcomes

By the end of this lesson you should be able to:

- Read a metalness–roughness texture set and predict how a surface will behave under IBL and punctual lights.
- Tune `MeshStandardMaterial` and escalate to `MeshPhysicalMaterial` when the brief demands glass, car paint, or fabric sheen.
- Author a minimal `ShaderMaterial`, wire uniforms from JavaScript, and reason about vertex vs fragment work.
- Patch built-in materials with `onBeforeCompile` when a full custom shader would be overkill.
- Name the performance tradeoffs between shader cost and draw-call count, and collaborate with AI tools without letting them hallucinate GLSL version details.

---

## 1. PBR mental model: metalness–roughness workflow

Physically based rendering (PBR) in real-time engines is usually **metallic–roughness** (glTF’s default) or **specular–glossiness**. three.js’s standard materials follow **metalness–roughness**.

**Core idea:** you describe *what the surface is made of* (dielectric vs conductor, smooth vs rough) and let the lighting model integrate that with incoming radiance. Environment maps supply “infinite sky” reflections; punctual lights supply local highlights.

### What each map does

| Map | Role | Notes |
|-----|------|--------|
| **Base color (albedo)** | Diffuse color for non-metals; for metals, also tints *specular reflection* | No lighting baked in — no shadows, no AO “painted in” unless you mean to |
| **Normal** | Perturbs surface orientation per texel | Tangent-space normals are standard; needs valid tangents on the mesh |
| **Roughness** | Microfacet spread — high = blurry reflections, low = sharp | Often stored in linear space; artist intent is perceptual |
| **Metalness** | 0 = dielectric, 1 = metal | Metals have tinted specular; dielectrics have white Fresnel at grazing angles |
| **Ambient occlusion (AO)** | Darkens *indirect* contribution in crevices | Usually multiplied with ambient/IBL terms, not direct sun (depends on pipeline) |
| **Emissive** | Self-lit outgoing radiance | Adds on top of lit result; can bloom in post |

**Mental checklist:** *Is this pixel metal?* → metalness drives how much of base color enters the specular lobe. *How fuzzy is the mirror?* → roughness. *Does the silhouette lie?* → normal map. *Do cavities feel dead?* → AO. *Does it glow?* → emissive.

---

## 2. MeshStandardMaterial: properties that matter

`MeshStandardMaterial` is three.js’s workhorse **Cook–Torrance–style** PBR material for WebGL/WebGPU. These are the knobs you actually touch in production:

**Color & maps**

- `color` — tint multiplied with `map` (albedo).
- `map` — UV-albedo; `colorSpace` must match three’s expectations (typically sRGB for color maps).
- `normalMap` / `normalScale` — tangent-space detail.
- `roughness` / `roughnessMap` — scalar or texture (often packed with metalness in G/B channels of `metalnessMap` in glTF).
- `metalness` / `metalnessMap`.
- `aoMap` / `aoMapIntensity` — secondary UV set (`uv2`) is common for baked AO.
- `emissive` / `emissiveMap` / `emissiveIntensity`.

**Alpha & transparency**

- `transparent`, `opacity`, `alphaMap`, `alphaTest` — for cutouts use `alphaTest`; for true transparency expect **draw order pain** and **slower paths**.

**Physically plausible extras**

- `envMap` — cube or equirectangular converted to PMREM for image-based lighting (IBL).
- `envMapIntensity` — scales IBL without lying about energy if you stay in sane ranges (art direction often pushes this slightly > 1).
- `lightMap` / `lightMapIntensity` — baked diffuse (second UV).

**How it sees the world**

- `flatShading` — per-face normals; stylized/low-poly look.
- `side` — `FrontSide`, `BackSide`, `DoubleSide` (doubleside disables backface culling expectations — watch overdraw).

### Environment maps in practice

IBL makes metal–rough materials *believable*. Typical flow: load an HDR or equirectangular environment, let three build a **prefiltered mip pyramid (PMREM)**, assign to `material.envMap`, then tune `envMapIntensity`.

> **Code in this lesson:** **CodeSandbox-ready** blocks are complete mini-apps when marked. **Excerpt** blocks are partial—material setup, GLSL fragments, or patterns without a full render loop or scene shell.

*Excerpt — PMREM + materials; assumes `scene`, `metalMask`, `roughMask` exist in your app.*

```javascript
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const pmrem = new THREE.PMREMGenerator(renderer);

new RGBELoader().load('/env/studio.hdr', (hdrEquirect) => {
  const envRT = pmrem.fromEquirectangular(hdrEquirect);
  scene.environment = envRT.texture; // global IBL for materials
  scene.background = envRT.texture;    // optional: visible backdrop
  hdrEquirect.dispose();
});

const plastic = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#c9d6e0'),
  roughness: 0.45,
  metalness: 0.0,
  envMapIntensity: 1.0,
});

const brushed = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#b8b8b8'),
  roughness: 0.35,
  metalness: 1.0,
  metalnessMap: metalMask,
  roughnessMap: roughMask,
  envMapIntensity: 1.15,
});
```

---

## 3. MeshPhysicalMaterial: clearcoat, transmission, sheen, iridescence

`MeshPhysicalMaterial` extends `MeshStandardMaterial` with **thin-film**, **layered**, and **transmissive** phenomena. Use it when the art direction explicitly needs:

- **Clearcoat** — car paint, lacquered wood, wet eyes. `clearcoat`, `clearcoatRoughness`, optional `clearcoatNormalMap`.
- **Transmission** — glass, liquids, thin plastics. `transmission` (0–1), `thickness`, `ior` (index of refraction). Requires **transparent** rendering; performance cost is real.
- **Sheen** — fabrics (velvet). `sheen`, `sheenRoughness`, `sheenColor`.
- **Iridescence** — soap bubbles, oil slicks, certain coatings. `iridescence`, `iridescenceIOR`, `iridescenceThicknessRange`.

**When to use:** if `MeshStandardMaterial` cannot hit the look without faking in post, or the glTF uses `KHR_materials_*` extensions that map to these features. **When not to:** hero objects with heavy transmission on mobile — profile early.

*Excerpt — material definitions only.*

```javascript
const glass = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#ffffff'),
  metalness: 0,
  roughness: 0.05,
  transmission: 1.0,
  thickness: 0.5,
  ior: 1.5,
  transparent: true,
  envMapIntensity: 1.0,
});

const velvet = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#3a2a55'),
  roughness: 0.85,
  metalness: 0,
  sheen: 1.0,
  sheenRoughness: 0.5,
  sheenColor: new THREE.Color('#e8c7ff'),
});
```

---

## 4. ShaderMaterial & RawShaderMaterial

**ShaderMaterial** — you supply `vertexShader` and `fragmentShader` **strings**. three.js **prepends** its own defines, uniforms (`projectionMatrix`, `modelViewMatrix`, `normalMatrix`, …), and attribute declarations compatible with the built-in attribute names (`position`, `normal`, `uv`, … depending on geometry). You focus on your varyings and logic.

**RawShaderMaterial** — **no automatic chunks**. You declare **everything**: precision, attributes, uniforms, matrices. Maximum control, maximum footguns. Use when you need a minimal known shader, custom attribute layouts, or to port GLSL verbatim from another engine.

*Excerpt — `ShaderMaterial` setup; drive `uTime` from your animation loop.*

```javascript
import * as THREE from 'three';

const uniforms = {
  uTime: { value: 0.0 },
  uColorA: { value: new THREE.Color('#2d1b69') },
  uColorB: { value: new THREE.Color('#ff6b6b') },
};

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frag = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;

  void main() {
    float wave = 0.5 + 0.5 * sin((vUv.x + vUv.y) * 10.0 + uTime * 2.0);
    vec3 col = mix(uColorA, uColorB, wave);
    gl_FragColor = vec4(col, 1.0);
  }
`;

const mat = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: vert,
  fragmentShader: frag,
  transparent: false,
});

// In your animation loop:
// mat.uniforms.uTime.value = elapsed;
```

**Gotchas**

- `ShaderMaterial` with WebGL2 may use GLSL 3.00 ES if three configures it — always test in target browsers.
- For lighting, you either fake it in the fragment shader or rebuild the three.js chunk system yourself (usually you patch instead — see §7).

### RawShaderMaterial: minimal skeleton

Use when you want **zero** three.js shader prefixes. You must declare precision, attributes, and **all** matrix uniforms yourself (`projectionMatrix`, `modelViewMatrix`, `normalMatrix` are not injected).

*Excerpt — `RawShaderMaterial` skeleton; you must update matrix uniforms each frame unless you wire `onBeforeRender`.*

```javascript
const raw = new THREE.RawShaderMaterial({
  uniforms: {
    projectionMatrix: { value: new THREE.Matrix4() },
    modelViewMatrix: { value: new THREE.Matrix4() },
    uTime: { value: 0 },
  },
  vertexShader: /* glsl */ `
    precision highp float;
    attribute vec3 position;
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    precision highp float;
    void main() {
      gl_FragColor = vec4(1.0, 0.2, 0.6, 1.0);
    }
  `,
});
// You are responsible for copying camera/object matrices into those uniforms each frame
// unless you wire them via onBeforeRender — most teams prefer ShaderMaterial instead.
```

### React Three Fiber: ticking uniforms

*CodeSandbox-ready — `ShaderMaterial` with a time uniform inside `<Canvas>`.*

```jsx
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const frag = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(0.5 + 0.5 * sin(uTime + vUv.x * 6.2831), 0.2, 0.6, 1.0);
  }
`

function GradientField() {
  const ref = useRef()
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame((state) => {
    const m = ref.current?.material
    if (m?.uniforms?.uTime) m.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial attach="material" uniforms={uniforms} vertexShader={vert} fragmentShader={frag} />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <GradientField />
      </Canvas>
    </div>
  )
}
```

---

## 5. GLSL essentials crash course

GLSL programs run **in parallel** across vertices (vertex stage) and fragments (pixel stage). Data flows:

- **Attributes** — per-vertex inputs (position, UV, vertex color). Declared in vertex shader only.
- **Uniforms** — constant across a draw call; set from JS.
- **Varyings** — vertex shader outputs interpolated across the triangle; read in fragment shader.

### Vertex vs fragment responsibilities

- **Vertex shader** — place vertices in clip space (`gl_Position`), compute normals in view/world space if needed, pass UVs and helpers to varyings.
- **Fragment shader** — decide final color (`gl_FragColor` in GLSL 1.00, or `out vec4 fragColor` in 3.00 ES), possibly discard pixels (`discard`).

### Swiss-army functions

*Excerpt — GLSL snippets for reference, not a runnable program.*

```glsl
// Linear blend: x*(1-a) + y*a
vec3 c = mix(colorA, colorB, t);

// Hermite smooth remap 0..1 between edges
float mask = smoothstep(0.2, 0.8, x);

// Hard step at threshold
float binary = step(0.5, x);

// Fractional part — tiling patterns
float cell = fract(uv.x * 20.0);

// length, normalize, dot, clamp, pow, abs — vector math bread and butter
```

**Noise patterns:** GLSL has no built-in Perlin noise. In lessons/demos people use:

- **Value noise** from hash of `floor(uv)`.
- **Simplex/Perlin** snippets (short functions copied into the shader).
- **Texture-based noise** — bake a blue-noise or Perlin tile, sample with `texture2D`.

For production, prefer **data** (textures) over huge procedural noise in every fragment unless you have a budget.

---

## 6. Uniforms workflow: time, pointer, scroll, textures

Uniforms are the **JavaScript → GPU** bridge. Patterns:

*Excerpt — uniform objects and DOM listeners; wire `vertexShader` / `fragmentShader` and your render loop separately.*

```javascript
import * as THREE from 'three';

const uniforms = {
  uTime: { value: 0 },
  uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  uScroll: { value: 0 },
  uNoise: { value: null },
};

const mat = new THREE.ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
});

const loader = new THREE.TextureLoader();
loader.load('/tex/noise.png', (tex) => {
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.NoColorSpace;
  uniforms.uNoise.value = tex;
});

function onPointerMove(e) {
  const x = e.clientX / window.innerWidth;
  const y = 1.0 - e.clientY / window.innerHeight;
  uniforms.uMouse.value.set(x, y);
}

function onScroll() {
  uniforms.uScroll.value = window.scrollY * 0.001;
}

window.addEventListener('pointermove', onPointerMove);
window.addEventListener('scroll', onScroll, { passive: true });
```

**Rules of thumb**

- Reuse `Vector2`/`Vector3`/`Color` objects — mutate `.value` fields, don’t allocate new uniforms each frame.
- Textures: set `needsUpdate` only when changing image data, not every frame.
- Name uniforms clearly (`uTime`, `uResolution`) — your future self and your AI copilot will thank you.

---

## 7. `onBeforeCompile`: patching built-in materials

When you need **small** changes to three’s lighting (rim light, triplanar on `normalMap` only, vertex animation on a lit surface), **full custom shaders** throw away months of engine work. `Material.onBeforeCompile` lets you **surgically replace** shader chunks **before** compilation.

*Excerpt — rim patch on a standard material; chunk names vary by three.js version.*

```javascript
import * as THREE from 'three';

const mat = new THREE.MeshStandardMaterial({ color: '#ddd', metalness: 0.2, roughness: 0.5 });

mat.onBeforeCompile = (shader) => {
  shader.uniforms.uRimPower = { value: 3.0 };
  shader.uniforms.uRimColor = { value: new THREE.Color('#66ccff') };

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <output_fragment>',
    /* glsl */ `
    #include <output_fragment>
    vec3 V = normalize(cameraPosition - vWorldPosition);
    float rim = pow(1.0 - max(dot(normalize(normal), V), 0.0), uRimPower);
    outgoingLight += uRimColor * rim;
    `
  );
};

mat.customProgramCacheKey = () => 'rim';
```

Varying names (`vWorldPosition`, `normal`, etc.) can shift between three.js releases — grep the material’s shader chunks in the version you ship before relying on this snippet in production.

**Caveats**

- Chunk names change between three.js versions — pin a version and diff upgrades.
- Use `customProgramCacheKey` so materials with different patches don’t share a stale program.
- If the patch grows past ~30 lines, consider `ShaderMaterial` or nodes (TSL).

---

## 8. TSL (Three Shading Language): WebGPU-era nodes

**TSL** is three.js’s **node-based shading** layer, aligned with **WebGPU** and `WebGPURenderer`. Instead of string-concatenating GLSL, you compose small **nodes** (math, textures, lighting) that the engine translates to the backend (WGSL/GLSL).

**When to care**

- You are committing to **WebGPU** as primary or equal-tier.
- You want **reusable** shader logic shared between materials and post passes.
- You are following three.js examples that already migrated to `Fn()`, `uniform()`, texture nodes, etc.

**When to defer**

- Your production stack is still **WebGL2-only** and stable — GLSL + `onBeforeCompile` remains valid.
- Your team has no bandwidth to track rapid three.js node API evolution — wait until your target three release is frozen for the project.

Conceptual sketch (API evolves — verify against your three.js version docs):

*Excerpt — illustrative TSL; not guaranteed to match your three.js build.*

```javascript
// Illustrative — names and imports change across releases; read the official TSL examples for your version.
import { Fn, uniform, uv, vec3, mix, time } from 'three/tsl';

export const gradientNode = Fn(() => {
  const t = uv().x;
  const a = vec3(0.1, 0.2, 0.6);
  const b = vec3(1.0, 0.4, 0.2);
  return mix(a, b, t);
});
```

---

## 9. Common shader recipes

*Excerpt — the GLSL below is fragment-oriented or split vertex/fragment; paste into a full `ShaderMaterial` pair.*

### Gradient (UV-driven)

Already shown in §4 — `mix` along `vUv.x` or radial distance from center.

### Fresnel (view-dependent rim)

*Excerpt — combine with your own vertex shader that sets `vNormal` and `vViewDir`.*

```glsl
varying vec3 vNormal;
varying vec3 vViewDir;

// vertex
vNormal = normalize(normalMatrix * normal);
vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
vViewDir = normalize(-mvPos.xyz);

// fragment
float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 3.0);
vec3 col = mix(baseColor, rimColor, fresnel);
```

### Dissolve (noise threshold)

*Excerpt — fragment stage; requires bound `uNoise` and matching vertex `vUv`.*

```glsl
uniform float uDissolve;
uniform sampler2D uNoise;
varying vec2 vUv;

void main() {
  float n = texture2D(uNoise, vUv).r;
  if (n < uDissolve) discard;
  float edge = smoothstep(uDissolve, uDissolve + 0.04, n);
  vec3 edgeCol = vec3(1.0, 0.5, 0.2);
  vec3 albedo = vec3(0.2, 0.45, 0.9);
  vec3 col = mix(edgeCol, albedo, edge);
  gl_FragColor = vec4(col, 1.0);
}
```

### Hologram (additive scanlines + Fresnel)

*Excerpt — assumes `vUv`, `uTime`, view vector `v`, and normal `n` from your shader.*

```glsl
float scan = pow(0.5 + 0.5 * sin(vUv.y * 800.0 + uTime * 6.0), 4.0);
float f = pow(1.0 - max(dot(n, v), 0.0), 2.0);
vec3 holo = mix(vec3(0.1, 0.8, 1.0), vec3(1.0, 0.2, 0.8), f);
holo += scan * vec3(0.3, 0.9, 1.0);
gl_FragColor = vec4(holo * f, f * 0.85);
```

### Noise-based displacement (vertex)

*Excerpt — vertex shader body; pair with a fragment shader for output.*

```glsl
uniform sampler2D uDisp;
uniform float uStrength;
varying vec2 vUv;

void main() {
  vUv = uv;
  float h = texture2D(uDisp, uv).r;
  vec3 displaced = position + normal * (h - 0.5) * uStrength;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
```

---

## 10. Performance: shader complexity vs draw calls

**Two different budgets**

- **CPU-side:** draw calls, state changes, uniform updates, shadow map passes. Merging geometry, instancing, and atlasing attack **call count**.
- **GPU-side:** ALU (math), texture samples, register pressure, overdraw, transparency. Monster fragment shaders attack **per-pixel cost**.

**Rules of thumb**

- Moving noise, lighting, and multiple texture fetches to the **vertex shader** scales better when tessellation is moderate — but coarse meshes will reveal it.
- **Transparency** multiplies overdraw cost — keep shader simple or sort/bucket consciously.
- **Branching** (`if` on uniforms) is usually fine; **branching per pixel on noisy data** hurts coherence.
- Profile: Chrome Performance + **WebGL insight extensions**, three.js `renderer.info`, and for deep shader work consider **Spector.js** capture.

**Tradeoff story:** cutting draw calls via one giant merged mesh can force a single giant shader — sometimes **worse** than 20 instanced draws with a cheap standard material. Measure on **target hardware**, not your laptop.

---

## 11. AI collaboration notes: GLSL prompting & debugging

LLMs are strong at **boilerplate** and **explanation**, weak at **implicit version/context** unless you supply it.

**Prompt patterns that work**

- Paste **three.js version**, **WebGL1 vs WebGL2**, and whether you use `ShaderMaterial` or `RawShaderMaterial`.
- Include **minimal** vertex + fragment shaders that fail, plus the **exact** console error (line numbers lie after prepends — still useful).
- Ask for **chunk-safe** `onBeforeCompile` edits with the **exact** `#include <name>` anchor you’re replacing.

**Guardrails**

- Verify `gl_FragColor` vs `out vec4 fragColor` matches your GLSL version.
- Ask the model to **annotate uniform types** (`float`, `vec2`, `sampler2D`) — catches JS/GLSL mismatches.
- For performance-sensitive effects, ask for a **second version** that reduces texture samples or moves work to the vertex stage.

**Human skill that stays yours:** knowing which shortcut reads as *cheap* vs *expensive* on mobile GPUs — AI will happily give you 16-tap loops in the fragment shader.

---

## 12. Tao moment

A material is a **promise**: *this surface scatters light like metal, plastic, skin, or glass.* A shader is the **grammar** of that promise — sometimes declarative (`MeshStandardMaterial`), sometimes procedural (your own GLSL), sometimes a whispered patch inside a giant engine shader (`onBeforeCompile`).

The craft is not memorizing every GLSL built-in. The craft is **knowing which layer to edit**: texture, standard material, physical material, patch, full shader, or node graph — and **stopping** when the simpler layer already tells the truth.

---

## Further reading (official)

- [three.js — Materials](https://threejs.org/docs/#api/en/materials/Material)
- [three.js — MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)
- [three.js — MeshPhysicalMaterial](https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial)
- [three.js — ShaderMaterial](https://threejs.org/docs/#api/en/materials/ShaderMaterial)
- [Khronos glTF 2.0 specification — Materials](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#materials)

---

> *"The GPU does not admire your cleverness. It admires your coherence — one clear instruction, ten thousand times, all at once."*
