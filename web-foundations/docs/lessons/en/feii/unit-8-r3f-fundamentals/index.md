---
layout: lesson
title: 'Unit 8: React Three Fiber — 3D Interfaces with React Patterns'
title_alt: 'Unidad 8: React Three Fiber — Interfaces 3D con Patrones React'
slug: feii-unit-8-r3f-fundamentals
date: 2026-08-14
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-8-r3f-fundamentals/
description: 'React Three Fiber as interface-layer transfer: declarative 3D, raycasting, renderer.info budgets, and the AI merge log — not an MCP toolchain.'
tags:
  [
    feii,
    r3f,
    react-three-fiber,
    3d,
    webgl,
    three-js,
    interface-layer,
    shader-literacy,
  ]
status: complete
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> 3D interface literacy begins when the learner can explain the scene, not merely render it.</p>
<p><strong>Field lens:</strong> **Practice anchor:** scene graph, camera, materials, interaction, and renderer budgets. **Frontier signal:** R3F, WebGPU, spatial interaction, and immersive UI are moving targets. **Pedagogy status:** graphics education supplies a concept-first/API-churn precedent; R3F-specific teaching remains a pilot.</p>
</aside>
>
> **Studio test:** Keep one understood scene, renderer evidence, and a transfer explanation.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"The module that knows its boundaries serves the whole. The module that knows no boundaries becomes the whole—and collapses under its own weight."_
> — Tao of Development, `arch-001`
{: .tao-development-quote }

> **AI Assistance Disclosure:** Assistants may draft R3F JSX. You remain responsible for API truth, dispose, and the merge log. Read the [AI-Assisted 3D covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}) before the first prompt. Same ACCEPT / REJECT discipline as [Unit 6]({{ '/lessons/en/feii/unit-6-ai-code-review/' | relative_url }}).

**Code in this unit:** every fence is an **Excerpt** unless labelled otherwise — paste into a Vite + React sandbox you already have; these snippets are not a routed CodeSandbox lesson.

---

## Scholarly honesty — graphics-grounded R3F pilot

No peer-reviewed study validates this exact R3F sequence. Angel and Shreiner support concept-first graphics teaching and transfer across changing APIs; current R3F documentation explains how the renderer works, not whether this syllabus teaches it effectively (Angel and Shreiner 2024, 1–2).

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
Bloque 5 has no peer-reviewed study validating this exact R3F sequence. However, Angel & Shreiner's evaluator-safe graphics-education paper supports teaching the underlying pipeline and shader concepts so students can move across evolving APIs (Angel 2024, 1–2). Current R3F documentation grounds *how* the renderer works; it does not prove that this syllabus teaches well.
-->
{% endif %}

Adjacent computing-education findings inform the review gates, not the claim that this graphics sequence is effective.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- Copilot-class tools can raise speed while students **accept suggestions without reflecting** (Shihab et al. 2025; coat `2506_10051_copilot_brownfield_29f3d2f5` · nodo `1d671902-3c68-5ad4-9b08-198236f1d5e5` · p. 9) — `(Shihab 2025, 9)`. <!&#45;&#45; provenance: re-verified live 2026-08-20 via `ahmes query &#45;&#45;cite &#45;&#45;require-evaluator-safe`; labelled [BIBLIO-GAP] on 2026-08-14 per AUDIT-GROUNDED.md, the bibliographic-metadata cascade has since resolved it — confidence 0.95, evaluator_safe=yes. Epistemic boundary unchanged: still an adjacent CS-education finding, not R3F pedagogy evidence.
-->
{% endif %}
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- GenAI exposure is linked to **design fixation** (Wadinambiarachchi et al. 2024; coat `2403_11164_design_fixation_de51c7ac` · nodo `770815a4-c3b9-5d3e-ab71-5c009548393f` · p. 1) — `(Wadinambiarachchi 2024, 1)`. <!&#45;&#45; provenance: re-verified live 2026-08-20, same status change as the Shihab node above; was [BIBLIO-GAP] 2026-08-14, now evaluator_safe=yes.
-->
{% endif %}

You are inside the gap: Entrega 2 is evidence. Tool catalogues and generated boilerplates are **instructor demonstrations**, not homework.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
**Evidence update (2026-08-23):** the unit is now a **graphics-grounded R3F pilot**. Grade scene explanation, renderer evidence, and one transfer explanation across the React/3D boundary. Do not interpret a polished scene as learning evidence; see the dated FE II gap-pass record in the research repository copy.
-->
{% endif %}

## Research boundary
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- Angel, E. &amp; Shreiner, D. (2024). *The Future of Teaching Computer Graphics.* SIGGRAPH Educators Forum '24. DOI `10.1145/3641235.3664433`. Ahmes coat `e2e9b45c`, nodes `348bd016-3aee-5eb3-ae93-b3d422e137df` p.1 and `92a534c1-6aff-5d5e-b1e5-2a7d2e2c65a9` p.2. Resolved via `ahmes query &#45;&#45;cite`, `evaluator_safe=yes`.
-->
{% endif %}
- The source supports concept-first graphics teaching and API transfer, not a causal claim about R3F learning.

**Platform notes** (npm, checked 2026-08-20 — re-verify before a new cohort; unchanged from the 2026-08-14 pin): `three@0.185.1` · `@react-three/fiber@9.7.0` (React 19) · `@react-three/drei@10.7.8`. Vendor docs are HOW, not bibliography.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Understand React Three Fiber** — Declarative 3D components using React patterns
- **Bridge React to 3D** — Apply hooks, state, and composition to WebGL scenes
- **Build interactive 3D interfaces** — Events, raycasting, and responsive 3D components
- **Optimize 3D performance** — Instancing, culling, and a graded `renderer.info` snapshot (desktop ≤ 200 draw calls / mobile ≤ 80)
- **See the interface-layer transfer** — Same component model, different rendering target
- **Merge with judgment** — Log ACCEPT / REJECT on any AI-assisted scene diff (covenant)

---

## 📖 Why React Three Fiber?

React Three Fiber (R3F) is a React renderer for Three.js:

```
┌─────────────────────────────────────────────────────────┐
│            INTERFACE LAYER TRANSFER                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   2D React (DOM)              3D React (WebGL)            │
│   ┌─────────────┐            ┌─────────────┐           │
│   │ <div>       │            │ <Canvas>     │           │
│   │   <Button> │            │   <mesh>    │           │
│   │   <img>    │            │   <light>   │           │
│   └─────────────┘            └─────────────┘           │
│                                                          │
│   Same model: props, state, hooks, composition           │
│   Different target: DOM vs WebGL                        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Key insight:** You already know React. R3F just gives you a new rendering target.

Raw WebGL rewards this abstraction: the complexity of using WebGL efficiently and writing high-performance code is the standing problem declarative renderers like R3F exist to manage (Neelakantam and Pant 2017, 15).
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
Raw WebGL rewards this abstraction: "with the various WebVR frameworks that have been developed, the complexity of leveraging WebGL efficiently and writing h[igh-performance code]…" is the standing problem declarative renderers like R3F exist to manage (Neelakantam & Pant 2017; coat `srushtika_neelakantam…964c117c` · nodo `c84d51ae-c108-5d94-ade0-7ead0dc88c48` · p. 15 — `(Neelakantam 2017, 15)`). <!&#45;&#45; provenance: node resolved live 2026-08-20 via `ahmes query &#45;&#45;cite &#45;&#45;require-evaluator-safe`, evaluator_safe=yes. This is the matrix's named technique-only source for Units 8–9 (grounds HOW WebGL abstraction works, never that this teaching sequence works well — that gap stays declared above).
-->
{% endif %}

### Declarative vs. Imperative

Three.js (imperative) — **Excerpt**:

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

R3F (declarative) — **Excerpt**:

```jsx
<Canvas>
  <mesh>
    <boxGeometry />
    <meshBasicMaterial color="green" />
  </mesh>
</Canvas>
```

---

## 🏗️ R3F Project Setup

### Installation

**Excerpt** — install the pinned versions from the scholarly-honesty note (or the current npm majors if you re-verified):

```bash
npm install three @react-three/fiber @react-three/drei
```

### Basic Scene

```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box />
      <OrbitControls />
    </Canvas>
  );
}

function Box() {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
```

---

## 🔄 State & Hooks in 3D

R3F uses the same React hooks you know:

### useFrame for Animation

```jsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function RotatingBox() {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}
```

### useState for Interactivity

```jsx
import { useState } from 'react';

function ClickableBox() {
  const [color, setColor] = useState('red');
  
  return (
    <mesh onClick={() => setColor(color === 'red' ? 'blue' : 'red')}>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
```

---

## 🎯 Raycasting & Events

R3F provides React-style events for 3D interactions:

```jsx
function InteractiveBox() {
  const [hovered, setHovered] = useState(false);
  
  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => console.log('Clicked!')}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'yellow' : 'green'} />
    </mesh>
  );
}
```

**Available events:** `onClick`, `onPointerOver`, `onPointerOut`, `onPointerMove`, `onWheel`, etc.

---

## 🚀 Performance Optimization

### Instancing for Many Objects

```jsx
import { Instances, Instance } from '@react-three/drei';

function InstancedCubes({ count = 1000 }) {
  return (
    <Instances limit={count}>
      <boxGeometry />
      <meshStandardMaterial />
      {Array.from({ length: count }).map((_, i) => (
        <Instance
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
        />
      ))}
    </Instances>
  );
}
```

### Automatic Culling

R3F frustum-culls meshes that leave the camera — useful, not a substitute for a draw-call budget.

### Graded budget — `renderer.info`

**Excerpt** — call from a `useFrame` (throttle: once per second) or a debug overlay. Paste the numbers into the Entrega, with the device class.

```jsx
useFrame(({ gl }) => {
  const { render, memory } = gl.info;
  // render.calls, render.triangles, memory.geometries, memory.textures
});
```

| Class | Draw-call cap | Fail if |
| --- | --- | --- |
| Desktop | ≤ 200 | Uninstanced grids, lights-as-meshes, forgotten helpers |
| Mobile | ≤ 80 | Default DPR 2 + post stack + uninstanced clutter |

Unit 7's lesson still holds: an unmeasured "it's fine" is not an optimization.

---

## Lab (team) — workplace-like · 3 h

Shared capstone / vShowroom seed. Do this **together** on the repo you will defend.

1. Canvas + lights + one composed mesh tree (not a single tutorial cube).
2. Pointer events: hover + click that change **React state** (raycasting is the 3D `onClick`).
3. One `useFrame` animation that does **not** allocate geometry.
4. `renderer.info` snapshot in `docs/` — before/after or a threshold you accepted.
5. Merge log: at least one AI diff with ACCEPT or REJECT ([covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }})).

**Deliverable:** branch on the shared repo + `docs/ai-3d-merge-log.md` + `renderer.info` note.

---

## Independent self-check — autonomous study

This is an individual self-check, not part of the formal 14-hour
Resolución de Ejercicios allocation.

Not the showroom. Isolate the strategy:

1. Rewrite the imperative Three.js snippet above as R3F JSX without looking at the answer.
2. Add `onPointerOver` / `onPointerOut` to a mesh you did not use in the lab.
3. Write two sentences: what is the same as 2D React, and what is GPU-specific.

---

## 📚 Platform notes (HOW, not bibliography)

- R3F docs — https://docs.pmnd.rs/react-three-fiber
- three.js docs — https://threejs.org/docs/
- drei — https://github.com/pmndrs/drei

---

## Session outcome

You can transfer the React component model onto a WebGL canvas, interact with meshes, and **show a budget**. Shader literacy is [Unit 9]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}). MCP shopping is not a learning outcome.

---

> _"Before fixing, understand. Before understanding, observe. Before observing, breathe."_
> — Tao of Development, `wis-002`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "Session outcome"
  visual-grammar: "understood-scene-graph — a React component hierarchy becoming an inspectable three-dimensional scene with a visible cost budget"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

## References

- Angel, Edward, and Dave Shreiner. 2024. “The Future of Teaching Computer Graphics.” *SIGGRAPH Educators Forum ’24*. https://doi.org/10.1145/3641235.3664433.
- Neelakantam, Srushtika, and Tanay Pant. 2017. *Learning Web-Based Virtual Reality: Build and Deploy Web-Based Virtual Reality Technology*. Berkeley, CA: Apress. https://doi.org/10.1007/978-1-4842-2710-7.
