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
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Code without quality checks is like a ship without a compass: it moves, but who knows where."_
> — Tao of Development, `qa-009`

> **AI Assistance Disclosure:** Models draft GLSL fluently and often wrongly. Literacy means you can explain *your* shader. Read the [AI-Assisted 3D covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}) and keep the Unit 6 ACCEPT / REJECT log on every shader diff.

**Code in this unit:** **Excerpt** unless labelled — GLSL fragments and R3F snippets assume the Unit 8 canvas. They are not CodeSandbox-ready files.

---

## Scholarly honesty — minimum viable GLSL is a classroom contract

There is **no** Ahmes node for “this GLSL syllabus works in higher education.” Bloque 5 remains **`[UNVERIFIED-GAP]`**. The checklist below is what this cohort will defend, not a finding.

Adjacent, not a substitute:

- Mixed-initiative visual selection can *create* shaders without teaching programming (AI Co-Artist; coat `2512_08951_ai_co_artist_b431f6a4` · nodo `777b3e26-2775-5cc3-ade3-96fec7239cd9` · p. 2) — **[BIBLIO-GAP]**. That is the **failure mode** this unit refuses: output without literacy. <!-- provenance: re-checked live 2026-08-20, not assumed from the 2026-08-14 label — `ahmes status` still reports `Citation preview: [BIBLIO-GAP]` (reason: missing year, LLM-only metadata at confidence ≤0.85). `ahmes enrich --meta --online` was attempted this session: result "Host registry mismatch — identifiers only," 0 nodes enriched — the online registry's title disagrees with this PDF's own heading, so Ahmes correctly refused a silent override. This is a genuine content gap, not a pipeline-lag fix; the label stands unchanged. -->
- Render-then-judge pipelines exist in other graphics domains (SGP-GenBench) — they do not grade your Entrega. **You** judge; the browser is the verifier.

**Platform notes** (npm, checked 2026-08-20 — unchanged from the 2026-08-14 pin): `three@0.185.1` · `@react-three/fiber@9.7.0` · `@react-three/drei@10.7.8` · `@react-three/postprocessing@3.0.5` (optional; every extra pass is a mobile tax — Unit 7).

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

## Exercises (individual) — decontextualised · ~1 h

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
