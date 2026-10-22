---
layout: lesson
title: 'Unit 9: Shader Literacy & Cutting-Edge Interface Aesthetics'
title_alt: 'Unidad 9: Alfabetización en Shaders y Estéticas de Interfaz de Vanguardia'
slug: feii-unit-9-shader-literacy
date: 2026-08-14
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-9-shader-literacy/
description: 'Minimum-viable GLSL in R3F: one understood shader, one uniform, one named coordinate space, optional post-processing cost, merge log — not a graphics degree.'
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

> **AI Assistance Disclosure:** Models draft GLSL fluently and often wrongly. Literacy means you can explain *your* shader. Read the [AI-Assisted 3D covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}) before the first prompt. Shader diffs go in that covenant's `docs/ai-3d-merge-log.md`, the same ACCEPT / REJECT habit as [Unit 6]({{ '/lessons/en/feii/unit-6-ai-code-review/' | relative_url }}).

**Code in this unit:** vocabulary fences are **Excerpts**. They show one idea and do not run alone. The bulb is three **CodeSandbox-ready** files you paste into the Unit 8 sandbox: `src/parts.js`, `src/BulbMaterial.jsx`, `src/Beacon.jsx`. A fourth, a per-frame `src/BudgetProbe.jsx`, is only for a team that adds a post-processing pass. `docs/shader-note.md` is a **Template** — copy it, then fill the six checklist lines from your own shader. One scene, continued from Unit 8, so there is still no route table.

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

**Platform notes** (npm, re-checked 2026-10-22): `three@0.185.1` · `@react-three/fiber@9.8.2` · `@react-three/drei@10.7.9` · `react@19.3.1`. Same pins as Unit 8. `@react-three/postprocessing@3.0.5` is optional and is the version measured below; it is not part of the reference scene. It declares `postprocessing` as a peer, so the measured install was `postprocessing@6.39.5` beside it. `fiber@9.7.0` peers `react` below 19.3, and the React published that day was 19.3.1, so the August fiber pin does not install.

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
6. **Post-pass cost** — bloom / chromatic aberration are **optional**. If you add a composer pass, state the per-frame `renderer.info` delta from the probe in [Post-processing is a cost](#post-processing-is-a-cost-optional). Default: **zero** extra passes on mobile.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Understand shader basics** — Vertex and fragment shaders, GLSL syntax, and the GPU pipeline
- **Write one custom shader you can explain** — GLSL in R3F, one uniform, one coordinate space you can name
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

Processes each pixel (color, lighting) — **Excerpt**. Both `main` bodies compile only after Three has prefixed the shader. They are not files.

```glsl
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red
}
```

---

## 🎨 GLSL Basics

### Language Structure

GLSL is C-like, with vector and matrix types — **Excerpt**. `time` and `resolution` below are uniforms you declare, not built-ins. Uniforms live at the top; anything computed from them lives inside `main`, because a global may only be initialised with a constant. On three@0.185.1 this body compiles as a `ShaderMaterial` fragment shader once both uniforms are in its table.

```glsl
uniform float time;
uniform vec2 resolution;

void main() {
  vec3 tint = vec3(1.0, 0.5, 0.2);
  mat3 identity = mat3(1.0);

  vec2 uv = gl_FragCoord.xy / resolution;
  float wave = 0.5 + 0.5 * sin(uv.x * 10.0 + time);
  gl_FragColor = vec4(identity * tint * wave, 1.0);
}
```

`resolution` is not a GLSL built-in. The line compiles only when that uniform exists. The bulb below does not use `gl_FragCoord`. A screen-space coordinate is glued to the pixel, so the pattern slides across the mesh as the yoke turns. View space keeps a rim on the silhouette that faces the camera.

### Uniforms

Inputs from JavaScript — **Excerpt**. The shader reads the uniform. It cannot see the JavaScript variable you closed over.

```glsl
uniform float time;
uniform vec2 resolution;
uniform vec3 color;
```

---

## The bulb — one shader on the Unit 8 scene

Start from the Unit 8 sandbox. Same template, same pins, same `main.jsx`, `App.jsx`, `index.css`, and `BudgetProbe.jsx`. You replace three files. Nothing new is installed: `shaderMaterial` comes from drei, which Unit 8 already pins.

The bulb is the only custom material. Arm, ring, shaft, collar, and plinth stay `meshStandardMaterial`. Hover and click still write the same React state. `uHot` is that state, passed as a prop. `uTime` advances in `useFrame`, because the fragment shader cannot see `delta`.

**CodeSandbox-ready** — replace `src/parts.js`. Only the lamp sentence changes. The panel would be lying if it still said the bulb was a standard material.

```js
export const PartId = {
  plinth: 'plinth',
  shaft: 'shaft',
  lamp: 'lamp',
};

export const PARTS = [
  {
    id: PartId.plinth,
    name: 'Plinth',
    note: 'One mesh. It does not rotate. A click stores this id in React state.',
  },
  {
    id: PartId.shaft,
    name: 'Shaft',
    note: 'Shaft and collar are two meshes and one id. The handler sits on their group.',
  },
  {
    id: PartId.lamp,
    name: 'Lamp',
    note: 'Arm and ring stay standard materials. The bulb is a shader: uTime breathes the rim, and uHot comes from hover or selection.',
  },
];
```

**CodeSandbox-ready** — create `src/BulbMaterial.jsx`.

```jsx
import { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

const RimMaterial = shaderMaterial(
  { uTime: 0, uHot: 0 },
  `
    varying vec3 vViewNormal;
    varying vec3 vViewPosition;

    void main() {
      vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = viewPosition.xyz;
      vViewNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * viewPosition;
    }
  `,
  `
    uniform float uTime;
    uniform float uHot;
    varying vec3 vViewNormal;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vViewNormal);
      vec3 viewDirection = normalize(-vViewPosition);
      float facing = max(dot(normal, viewDirection), 0.0);
      float rim = pow(1.0 - facing, 2.0);
      float breath = 0.55 + 0.45 * sin(uTime);
      vec3 idle = vec3(0.878, 0.659, 0.290);
      vec3 accent = vec3(0.890, 0.416, 0.173);
      vec3 base = mix(idle, accent, clamp(uHot, 0.0, 1.0));
      vec3 color = mix(base * 0.55, vec3(1.0, 0.96, 0.88), clamp(rim * breath, 0.0, 1.0));
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  (material) => {
    material.precision = 'mediump';
  },
);

extend({ RimMaterial });

export default function BulbMaterial({ hot, reduced }) {
  const material = useRef(null);

  useFrame((_, delta) => {
    const node = material.current;
    if (!node || reduced) return;
    // sin() repeats every 2π. Wrapping keeps uTime small enough for a mediump float.
    node.uTime = (node.uTime + Math.min(delta, 0.05)) % (Math.PI * 2);
  });

  return <rimMaterial ref={material} uHot={hot ? 1 : 0} />;
}
```

**CodeSandbox-ready** — replace `src/Beacon.jsx`.

```jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PartId } from './parts.js';
import BulbMaterial from './BulbMaterial.jsx';

const ACCENT = '#e36a2c';
const HOVER = '#f6e2bc';

function colorFor(id, hovered, selected, idle) {
  if (selected === id) return ACCENT;
  if (hovered === id) return HOVER;
  return idle;
}

function bindPart(id, onHover, onSelect) {
  return {
    onPointerOver: (event) => {
      event.stopPropagation();
      onHover(id);
    },
    onPointerOut: (event) => {
      event.stopPropagation();
      onHover(null);
    },
    onClick: (event) => {
      event.stopPropagation();
      onSelect(id);
    },
  };
}

export default function Beacon({ hovered, selected, reduced, onHover, onSelect }) {
  const yoke = useRef(null);

  useFrame((_, delta) => {
    const node = yoke.current;
    if (!node || reduced) return;
    node.rotation.y += Math.min(delta, 0.05) * 0.45;
  });

  return (
    <group position={[0, -0.7, 0]}>
      <mesh position={[0, 0.14, 0]} {...bindPart(PartId.plinth, onHover, onSelect)}>
        <boxGeometry args={[1.05, 0.16, 0.66]} />
        <meshStandardMaterial
          color={colorFor(PartId.plinth, hovered, selected, '#cfc6ba')}
          roughness={0.85}
        />
      </mesh>

      <group {...bindPart(PartId.shaft, onHover, onSelect)}>
        <mesh position={[0, 0.86, 0]}>
          <cylinderGeometry args={[0.055, 0.075, 1.28, 20]} />
          <meshStandardMaterial
            color={colorFor(PartId.shaft, hovered, selected, '#6e675f')}
            metalness={0.45}
            roughness={0.38}
          />
        </mesh>
        <mesh position={[0, 1.52, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 24]} />
          <meshStandardMaterial
            color={colorFor(PartId.shaft, hovered, selected, '#3a3632')}
            metalness={0.55}
            roughness={0.35}
          />
        </mesh>
      </group>

      <group ref={yoke} position={[0, 1.56, 0]} {...bindPart(PartId.lamp, onHover, onSelect)}>
        <mesh position={[0.3, 0, 0]}>
          <boxGeometry args={[0.6, 0.04, 0.04]} />
          <meshStandardMaterial
            color={colorFor(PartId.lamp, hovered, selected, '#6e675f')}
            metalness={0.5}
            roughness={0.35}
          />
        </mesh>
        <mesh position={[0.64, 0, 0]}>
          <sphereGeometry args={[0.13, 24, 16]} />
          <BulbMaterial
            hot={hovered === PartId.lamp || selected === PartId.lamp}
            reduced={reduced}
          />
        </mesh>
        <mesh position={[0.64, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.2, 0.016, 8, 28]} />
          <meshStandardMaterial
            color={colorFor(PartId.lamp, hovered, selected, '#d7c4a3')}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}
```

`extend({ RimMaterial })` registers the class. The JSX tag is `<rimMaterial />` — R3F attaches a material subclass as the mesh material. `shaderMaterial` writes your uniforms through setters (`node.uTime`, the `uHot` prop). You do not assign `uniforms.uTime.value` yourself, and you do not construct the class with `new` inside `useState`.

Three prefixes a `ShaderMaterial` with `position`, `normal`, `uv`, `projectionMatrix`, `modelViewMatrix`, and `normalMatrix`. Do not declare them again. You write GLSL 1 syntax: `varying` and `gl_FragColor`. `glslVersion` stays null on this pin, and on WebGL 2 Three prepends `#version 300 es` plus defines that map the old words onto the new ones. The compiled vertex prefix starts `#define attribute in` / `#define varying out`. Set `glslVersion: THREE.GLSL3` only if you write `in` / `out` and your own output variable.

`normalMatrix` is the inverse transpose of the model-view matrix's upper 3×3. `mat3(modelViewMatrix) * normal` gives the same picture on this sphere, because nothing above it is scaled. Scale one axis of your own mesh and that shortcut tilts the normals, so the rim lands on the wrong edge.

`material.precision = 'mediump'` is set in the `shaderMaterial` callback. On three@0.185.1, `WebGLProgram` already prepends `precision` lines from `material.precision` (or from the GPU default when that field is null). A `precision highp float;` line in your own source still compiles. It comes after Three's prefix and overrides it, so `material.precision` now describes a shader you are not running. Pick one place.

`useFrame` writes `uTime`. That is a uniform write. It does not allocate geometry. The delta is clamped at 0.05, same as the yoke, so a hidden tab cannot jump the breath by a full cycle. The sum wraps at 2π, where `sin` repeats anyway. GLSL ES only promises mediump a relative precision of 2⁻¹⁰. A clock that grows forever reaches 128 s with steps of 0.125 between representable values, and the breath starts to stutter on a phone. The laptop that measured this lesson reports 23 bits for fragment `mediump`, the same as `highp`, so it would never show it. `prefers-reduced-motion` skips the write. The mesh still renders.

Idle is `vec3(0.878, 0.659, 0.290)`, which is `#e0a84a`. Accent is `vec3(0.890, 0.416, 0.173)`, which is `#e36a2c`, the same accent the standard materials use. The body is that color at 0.55, and the rim mixes toward white as the surface turns away from the camera. The fragment shader does not include Three's `colorspace_fragment` or `tonemapping_fragment` chunks, so the number it writes is the pixel you get. The standard materials around it are lit and tone-mapped. "Same accent" is a match in the numbers, not under the light.

Sampled 2026-10-22, three@0.185.1, Apple M4 Max: idle body rgb(123, 92, 41), which is gold × 0.55. With Lamp selected, rgb(125, 58, 24), which is accent × 0.55. The Unit 8 budget did not move: calls 6, triangles 1368, geometries 6, textures 1, still within the scene ceiling. A material swap is not a new draw.

**Template** — copy to `docs/shader-note.md`. Eight to twelve lines. Replace every ellipsis. Pasting `BulbMaterial.jsx` unchanged fails checklist item 5; your note has to describe the shader you actually ship.

```markdown
# Shader note

1. Vertex vs fragment: ...
2. Uniform: ... and why it is not a constant in the shader.
3. Coordinate space: view / uv / gl_FragCoord. Which one, and what would slide if you picked the other.
4. Precision: mediump, or why this shader needs highp.
5. Effect: the one thing a viewer should notice. Name the function (fresnel, band, dissolve).
6. Post-pass: zero. Or one pass, the pin, and the per-frame renderer.info row with and without it.
```

### What this file refuses

- `new CustomMaterial()` stored in `useState`, then attached with `<primitive>`. You skip `extend`, and disposal becomes your problem.
- `material.uniforms.uTime.value` in one place and `material.uTime` in another. Both reach the same uniform. This file uses the setter only, so there is one write to find.
- `new THREE.Color(...)` inside the uniform table when a `vec3` of numbers will do. The color is data. It does not need the Three class.
- A `precision` line in the GLSL and `material.precision` together. It compiles, and the two disagree.
- A clock uniform that grows without bound under `mediump`.
- A varying the fragment shader reads but the vertex shader never declares. On this pin that fails the link: `FRAGMENT varying vUv does not match any VERTEX varying`. A varying that is declared and never read compiles; it is only noise. `vUv` is absent here because the rim is view space, not UV.

---

## 🌈 Post-processing is a cost (optional)

A composer pass runs after the scene, and it renders more than once. The reference bulb ships with zero passes. Add one only when you can show its per-frame cost.

If you try a pass, install both packages. `postprocessing` is a peer. Name it, so the version you measure is the version you installed:

```bash
npm install @react-three/postprocessing@3.0.5 postprocessing@6.39.5
```

**Excerpt** — `Bloom` is a child of `EffectComposer`, and both sit inside `Canvas` beside the scene. This is not a file. `Beacon` here has no props.

```jsx
import { EffectComposer, Bloom } from '@react-three/postprocessing';

<Canvas>
  <Beacon />
  <EffectComposer>
    <Bloom luminanceThreshold={0.5} intensity={1.5} />
  </EffectComposer>
</Canvas>
```

Measured 2026-10-22 on the same beacon, same machine and pins as the Unit 8 table (Apple M4 Max, ANGLE Metal, WebGL 2), with `@react-three/postprocessing@3.0.5`, `postprocessing@6.39.5`, and one `Bloom`. Three resets `calls` and `triangles` at the start of every `gl.render` unless `gl.info.autoReset` is false. It never resets memory.

| Probe | Bloom | calls | triangles | geometries | textures |
| --- | --- | --- | --- | --- | --- |
| Unit 8 `BudgetProbe` | off | 6 | 1368 | 6 | 1 |
| Unit 8 `BudgetProbe` | on | 1 | 1 | 7 | 18 |
| Per-frame `BudgetProbe` (below) | off | 6 | 1368 | 6 | 1 |
| Per-frame `BudgetProbe` (below) | on | 23 | 1385 | 7 | 18 |

The Unit 8 probe is right for a scene that one `gl.render` draws. With a composer, `calls: 1` is only the last pass. `renderer.info.render.frame` advanced by 18 per frame: one scene render and 17 passes, each a single fullscreen triangle. That is 6 + 17 = 23 calls and 1368 + 17 = 1385 triangles. The reading held across 120 consecutive frames. Memory went from 6 to 7 geometries and from 1 to 18 textures. The passes allocate those, and they stay allocated while the composer is mounted. On this scene, Bloom costs four times the draw calls of the whole beacon. That is why the reference ships zero passes.

Summing over a time window gives a different wrong answer. Without a reset every frame, the total is 23 times however many frames landed in the window. An earlier pass on this lesson read 23 and then 46 that way. Reset every frame, and report once a second.

**CodeSandbox-ready** — replace `src/BudgetProbe.jsx` only if you add a pass. `CEILING` and `withinCeiling` are unchanged. Without a composer it reads the same 6 / 1368 / 6 / 1 as the Unit 8 file.

```jsx
import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export const CEILING = {
  calls: 6,
  triangles: 1368,
  geometries: 6,
  textures: 1,
};

export function withinCeiling(sample) {
  if (!sample || sample.calls === 0) return null;
  return (
    sample.calls <= CEILING.calls &&
    sample.triangles <= CEILING.triangles &&
    sample.geometries <= CEILING.geometries &&
    sample.textures <= CEILING.textures
  );
}

export default function BudgetProbe({ onSample }) {
  const gl = useThree((state) => state.gl);
  const wait = useRef(0);

  useEffect(() => {
    // A composer calls gl.render several times a frame; auto-reset would keep only the last call.
    gl.info.autoReset = false;
    return () => {
      gl.info.autoReset = true;
    };
  }, [gl]);

  useFrame((_, delta) => {
    wait.current += delta;
    if (wait.current >= 1) {
      wait.current = 0;
      // Everything since the last reset: the whole previous frame, every pass included.
      onSample({
        calls: gl.info.render.calls,
        triangles: gl.info.render.triangles,
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
      });
    }
    gl.info.reset();
  });

  return null;
}
```

The reset runs every frame. The report runs once a second. This probe's `useFrame` has the default priority, so it runs before the composer, which renders at priority 1. It reads the previous frame whole and then clears it. The cleanup puts `autoReset` back when the probe unmounts. Otherwise the counts would grow for as long as the tab stays open.

If you keep a pass, change `CEILING` to the row you accept, and put the same row in `docs/renderer-info.md`. Course caps are still the Unit 8 ones: desktop ≤ 200 draw calls, mobile ≤ 80. Twenty-three calls fits the mobile cap. It does not fit this scene's ceiling, and the shader note has to say which of the two you are defending.

`ChromaticAberration` is the same kind of child. It does nothing unless it is inside `EffectComposer`. A fullscreen pass is a different object from `BulbMaterial`, and this unit does not grade one.

---

## 🎯 Looks that are not the grade

These three fences are **Excerpts**. Undefined components, a missing font, and a hash named after a noise function. The grade is the checklist.

### A hash, not simplex noise

```glsl
uniform float time;
uniform vec2 resolution;

float hash(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  float n = hash(uv * 10.0 + time);
  gl_FragColor = vec4(vec3(n), 1.0);
}
```

`fract(sin(dot(...)))` is a hash. Simplex noise is a different function. Shipping this under the name simplex fails the literacy bar even when it compiles.

### Names with no components

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

`BackgroundShader`, `FloatingElements`, and `OverlayUI` are not in this lesson. The fence shows a wish.

### Type in space

```jsx
import { Text } from '@react-three/drei';

<Text font="/fonts/example.woff" fontSize={0.2}>
  Hello
</Text>
```

`Text` needs a font file you host. `Text3D` needs a typeface JSON, not a `.woff`. Neither is the grade. Interactive copy stays in the DOM, as in Unit 8.

---

## Lab (team) — workplace-like · 3 h

Same repo as Unit 8. The graded hand-in for both units is the [Units 8–9 assignment]({{ '/lessons/en/feii/units-8-9-assignment/' | relative_url }}). This lab is the shader half. Unit 10 is still the rest of Entrega 2.

1. Keep the Unit 8 scene, or your own mesh tree, and replace one material with a `shaderMaterial` you can explain. The bulb above is the demonstration. Pasting it unchanged fails checklist item 5.
2. Drive one uniform from React. `uTime` in `useFrame` counts. A number written into the shader source does not.
3. Write `docs/shader-note.md` from the template. Eight to twelve lines, all six checklist items.
4. Leave post-processing off, or add one pass, swap in the per-frame `BudgetProbe`, and record both rows. The Bloom table is why the reference stays at zero passes.
5. One merge log, the covenant's `docs/ai-3d-merge-log.md`, shared with Unit 8. Do not start a second log.

**Deliverable:** the shader on the shared repo, plus `docs/shader-note.md`. The merge log and the budget note are the assignment's, not a second pair of files.

---

## Independent self-check — autonomous study

This is an individual self-check, not part of the formal 14-hour
Resolución de Ejercicios allocation.

1. On paper or a gist: write a fragment shader that tints `vUv.x` without looking at this page.
2. Name three reasons a uniform is not a JavaScript closure inside the shader.
3. Given a mobile cap of 80 draw calls: would you add bloom? One sentence, and name the counter you would trust.

---

## 📚 Platform notes (HOW, not bibliography)

- The Book of Shaders — https://thebookofshaders.com/
- Shadertoy (inspiration, not a submission) — https://www.shadertoy.com/
- Khronos GLSL wiki — https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language
- r3f postprocessing — https://docs.pmnd.rs/react-postprocessing

---

## Session outcome

You can explain one authored shader and decide whether a post pass is worth its cost. Units 8 and 9 are one scene; the hand-in is the [assignment]({{ '/lessons/en/feii/units-8-9-assignment/' | relative_url }}). [Unit 10]({{ '/lessons/en/feii/unit-10-iot-python-backend/' | relative_url }}) adds live data. Tool shopping is still not a learning outcome.

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
