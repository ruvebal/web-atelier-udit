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
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"The module that knows its boundaries serves the whole. The module that knows no boundaries becomes the whole—and collapses under its own weight."_
> — Tao of Development, `arch-001`

> **AI Assistance Disclosure:** Assistants may draft R3F JSX. You remain responsible for API truth, dispose, and the merge log. Read the [AI-Assisted 3D covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}) before the first prompt. Same ACCEPT / REJECT discipline as [Unit 6]({{ '/lessons/en/feii/unit-6-ai-code-review/' | relative_url }}).

**Code in this unit:** every fence is an **Excerpt** unless labelled otherwise — paste into a Vite + React sandbox you already have; these snippets are not a routed CodeSandbox lesson.

---

## Scholarly honesty — this block is a declared pilot

Bloque 5 (R3F *as a taught sequence*) has **no** peer-reviewed pedagogy coat in the course vault. That is an explicit **`[UNVERIFIED-GAP]`**, not a footnote. Neelakantam & Pant (2017) and current R3F docs ground *how* the renderer works. They do not prove that this syllabus teaches well.

Adjacent CS-education findings still bind the *gates*, not the graphics claim:

- Copilot-class tools can raise speed while students **accept suggestions without reflecting** (Shihab et al. 2025; coat `2506_10051_copilot_brownfield_29f3d2f5` · nodo `1d671902-3c68-5ad4-9b08-198236f1d5e5` · p. 9) — `(Shihab 2025, 9)`. <!-- provenance: re-verified live 2026-08-20 via `ahmes query --cite --require-evaluator-safe`; labelled [BIBLIO-GAP] on 2026-08-14 per AUDIT-GROUNDED.md, the bibliographic-metadata cascade has since resolved it — confidence 0.95, evaluator_safe=yes. Epistemic boundary unchanged: still an adjacent CS-education finding, not R3F pedagogy evidence. -->
- GenAI exposure is linked to **design fixation** (Wadinambiarachchi et al. 2024; coat `2403_11164_design_fixation_de51c7ac` · nodo `770815a4-c3b9-5d3e-ab71-5c009548393f` · p. 1) — `(Wadinambiarachchi 2024, 1)`. <!-- provenance: re-verified live 2026-08-20, same status change as the Shihab node above; was [BIBLIO-GAP] 2026-08-14, now evaluator_safe=yes. -->

You are inside the gap: Entrega 2 is evidence. MCP catalogues, Stitch, and corpus-to-boilerplate are **instructor demos**, not homework.

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

Raw WebGL rewards this abstraction: "with the various WebVR frameworks that have been developed, the complexity of leveraging WebGL efficiently and writing h[igh-performance code]…" is the standing problem declarative renderers like R3F exist to manage (Neelakantam & Pant 2017; coat `srushtika_neelakantam…964c117c` · nodo `c84d51ae-c108-5d94-ade0-7ead0dc88c48` · p. 15 — `(Neelakantam 2017, 15)`). <!-- provenance: node resolved live 2026-08-20 via `ahmes query --cite --require-evaluator-safe`, evaluator_safe=yes. This is the matrix's named technique-only source for Units 8–9 (grounds HOW WebGL abstraction works, never that this teaching sequence works well — that gap stays declared above). -->

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

## Exercises (individual) — decontextualised · ~1 h

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
