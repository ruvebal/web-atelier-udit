---
layout: lesson
title: 'Unit 9: Shader Literacy & Cutting-Edge Interface Aesthetics'
title_alt: 'Unidad 9: Alfabetización en Shaders y Estéticas de Interfaz de Vanguardia'
slug: feii-unit-9-shader-literacy
date: 2026-08-14
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-9-shader-literacy/
description: 'Minimum-viable GLSL in R3F: one understood shader, uniforms and UV space, optional post-processing cost, merge log — not a graphics degree.'
tags:
  [
    feii,
    shaders,
    glsl,
    post-processing,
    aesthetics,
    cutting-edge,
    r3f,
    webgl,
  ]
status: complete
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> A shader is a small program that transforms data into appearance.</p>
<p><strong>Field lens:</strong> **Practice anchor:** GPU pipeline, coordinates, uniforms, and controlled experimentation. **Frontier signal:** TSL/WGSL, WebGPU, and generative shader tools expand the frontier. **Pedagogy status:** graphics education supports concept-first sequencing; this minimum-GLSL sequence remains a pilot.</p>
</aside>
>
> **Studio test:** Author or modify one shader and explain each input/output.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Code without quality checks is like a ship without a compass: it moves, but who knows where."_
> — Tao of Development, `qa-009`
{: .tao-development-quote }

> **AI Assistance Disclosure:** Models draft GLSL fluently and often wrongly. Literacy means you can explain *your* shader. Read the [AI-Assisted 3D covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}) and keep the Unit 6 ACCEPT / REJECT log on every shader diff.

**Code in this unit:** **Excerpt** unless labelled — GLSL fragments and R3F snippets assume the Unit 8 canvas. They are not CodeSandbox-ready files.

---

## Scholarly honesty — minimum viable GLSL is a graphics-grounded pilot

No peer-reviewed study validates this exact GLSL syllabus. Angel and Shreiner provide a graphics-education precedent for teaching pipeline and shader concepts across API change; the checklist below is what this cohort will defend, not a finding about R3F or GLSL outcomes (Angel and Shreiner 2024, 1–2).
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
There is no Ahmes node for “this exact GLSL syllabus works in higher education.” Angel &amp; Shreiner (2024) do provide an evaluator-safe graphics-education precedent for teaching the pipeline and shader concepts across API change (Angel 2024, 1–2). The checklist below is what this cohort will defend, not a finding about R3F or GLSL outcomes.
-->
{% endif %}

Adjacent, not a substitute:

- The course rule is therefore explicit: a generated look without an explanation fails the unit. This is an assessment decision, not a claim borrowed from an unresolved bibliography record.
- Render-then-judge pipelines exist in other graphics domains — they do not grade your Entrega. **You** judge; the browser is the verifier.

**Platform notes** (npm, checked 2026-08-20 — unchanged from the 2026-08-14 pin): `three@0.185.1` · `@react-three/fiber@9.7.0` · `@react-three/drei@10.7.8` · `@react-three/postprocessing@3.0.5` (optional; every extra pass is a mobile tax — Unit 7).

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
**Evidence update (2026-08-23):** keep WebGL as the reliable baseline; treat TSL/WGSL/WebGPU as a capability branch and require one concept translation across representations. See the dated FE II gap-pass record in the research repository copy.
-->
{% endif %}

## Research boundary
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- Angel, E. &amp; Shreiner, D. (2024). *The Future of Teaching Computer Graphics.* SIGGRAPH Educators Forum '24. DOI `10.1145/3641235.3664433`. Ahmes coat `e2e9b45c`, nodes `348bd016-3aee-5eb3-ae93-b3d422e137df` p.1 and `92a534c1-6aff-5d5e-b1e5-2a7d2e2c65a9` p.2. Resolved via `ahmes query &#45;&#45;cite`, `evaluator_safe=yes`.
-->
{% endif %}
- The source supports concept-first graphics teaching and API transfer, not a validated minimum-GLSL or R3F sequence.

### Minimum viable GLSL checklist (graded)

You can point at your shader and name:

1. **Vertex vs fragment** — who moves vertices, who colours pixels.
2. **One uniform** you set from React (`uTime` or equivalent) and why it is a uniform, not a constant.
3. **Coordinate space** — `uv` / `vUv` vs `gl_FragCoord` vs object space; which one you used.
4. **Precision** — you did not ignore `mediump` on mobile (or you justified `highp`).
5. **One effect** you intended (band, fresnel, dissolve, distortion) — not a paste of the lesson excerpt.
6. **Post-pass cost** — bloom / chromatic aberration are **optional**. If you add a composer pass, state the `renderer.info` delta. Default: **zero** extra passes on mobile.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Understand shader basics** — Vertex and fragment shaders, GLSL syntax, and the GPU pipeline
- **Write one custom shader you can explain** — GLSL in R3F, one uniform, UV space
- **Treat post-processing as a cost** — Bloom and CA are optional; measure or omit
- **Refuse creation-without-literacy** — a generated look you cannot narrate fails the unit

---

## 📖 What are Shaders?

Shaders are programs that run on the GPU:

```
┌─────────────────────────────────────────────────────────┐
│              GPU PIPELINE                                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Vertex Shader → Process each vertex → Transform       │
│        ↓                                                 │
│   Rasterization → Convert to fragments (pixels)          │
│        ↓                                                 │
│   Fragment Shader → Process each pixel → Color           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Vertex Shader

Processes each vertex (position, normal, UV) — **Excerpt**:

```glsl
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

### Fragment Shader

Processes each pixel (color, lighting):

```glsl
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red
}
```

---

## 🎨 GLSL Basics

### Language Structure

GLSL is C-like but with built-in vector types:

```glsl
// Types
vec3 position = vec3(1.0, 2.0, 3.0);
vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
mat4 matrix = mat4(1.0); // Identity

// Built-ins
float time = 0.5;
vec2 uv = gl_FragCoord.xy / resolution;
float noise = sin(uv.x * 10.0 + time);
```

### Uniforms

Inputs from JavaScript/React:

```glsl
uniform float time;
uniform vec2 resolution;
uniform vec3 color;
```

---

## 🔄 Custom Shaders in R3F

### ShaderMaterial

```jsx
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

const CustomMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0xff0000) },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      float pattern = sin(vUv.x * 10.0 + time) * 0.5 + 0.5;
      gl_FragColor = vec4(color * pattern, 1.0);
    }
  `
);

function AnimatedBox() {
  const [material, set] = useState(() => new CustomMaterial());
  
  useFrame((state) => {
    material.uniforms.time.value = state.clock.elapsedTime;
  });
  
  return (
    <mesh>
      <boxGeometry />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
```

---

## 🌈 Post-Processing Effects (optional)

Post-processing runs **after** the scene. Each pass is extra GPU work. Do not add bloom and chromatic aberration by default — that is a look, not literacy. If you use a composer, record the `renderer.info` change (Unit 8 caps still apply).

### Bloom Effect — **Excerpt** (optional)

```jsx
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function App() {
  return (
    <Canvas>
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} intensity={1.5} />
      </EffectComposer>
      {/* Scene content */}
    </Canvas>
  );
}
```

### Chromatic Aberration

```jsx
import { ChromaticAberration } from '@react-three/postprocessing';

<ChromaticAberration offset={[0.001, 0.001]} />
```

### Custom Post-Processing Shader

```jsx
import { ShaderPass } from '@react-three/postprocessing';

const CustomPass = shaderMaterial(
  { time: 0 },
  `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
  `
    uniform float time;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      uv.x += sin(uv.y * 10.0 + time) * 0.01;
      gl_FragColor = vec4(uv, 0.0, 1.0);
    }
  `
);
```

---

## 🎯 Cutting-Edge Aesthetics (stretch, not the grade)

These snippets are **Excerpt** — undefined components, missing fonts. They illustrate a look. The grade is the MV GLSL checklist, not a generative collage.

### Noise-Based Patterns

```glsl
// Simplex noise (simplified)
float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  float n = noise(uv * 10.0 + time);
  gl_FragColor = vec4(vec3(n), 1.0);
}
```

### Generative UI

```jsx
function GenerativeInterface() {
  return (
    <Canvas>
      <BackgroundShader />
      <FloatingElements />
      <OverlayUI />
    </Canvas>
  );
}
```

### Spatial Typography

```jsx
import { Text } from '@react-three/drei';

<Text3D font="/fonts/helvetica.woff">
  Hello Spatial Web
</Text3D>
```

---

## Lab (team) — workplace-like · 3 h

On the **same** Entrega 2 repo as Unit 8:

1. Author **one** `shaderMaterial` (or equivalent) that is not a copy of the excerpt above.
2. Drive **one uniform** from `useFrame` (`uTime` or a user control).
3. Write a 8–12 line explanation in `docs/` covering the MV GLSL checklist.
4. Log every AI shader diff ACCEPT / REJECT ([covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }})). At least one REJECT, or an explicit finding.
5. Post-processing: omit, **or** add one pass and show the budget delta.

**Deliverable:** understood shader + explanation + merge log. A generated aesthetic without the paragraph fails.

---

## Independent self-check — autonomous study

This is an individual self-check, not part of the formal 14-hour
Resolución de Ejercicios allocation.

1. On paper or a gist: write a fragment shader that tints `vUv.x` without looking at this page.
2. Name three reasons a uniform is not a JavaScript closure inside the shader.
3. Given a mobile cap of 80 draw calls: would you add bloom? One sentence.

---

## 📚 Platform notes (HOW, not bibliography)

- The Book of Shaders — https://thebookofshaders.com/
- Shadertoy (inspiration, not a submission) — https://www.shadertoy.com/
- Khronos GLSL wiki — https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language
- r3f postprocessing — https://docs.pmnd.rs/react-postprocessing

---

## Session outcome

You can explain one authored shader and decide whether a post pass is worth its cost. Units 8–9 seed Entrega 2. [Unit 10]({{ '/lessons/en/feii/unit-10-iot-python-backend/' | relative_url }}) adds live data. Tool shopping is still not a learning outcome.

---

> _"Before fixing, understand. Before understanding, observe. Before observing, breathe."_
> — Tao of Development, `wis-002`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "Session outcome"
  visual-grammar: "data-to-pixel-appearance — uniform and vertex data flowing through a shader into per-pixel appearance and a measured post-process decision"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

## References

- Angel, Edward, and Dave Shreiner. 2024. “The Future of Teaching Computer Graphics.” *SIGGRAPH Educators Forum ’24*. https://doi.org/10.1145/3641235.3664433.
