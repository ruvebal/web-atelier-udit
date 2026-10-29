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

**Code in this unit:** vocabulary fences are **Excerpts**. They show one idea and do not run alone. The capstone files are **CodeSandbox-ready**: paste each one at the path in its label. `docs/renderer-info.md` is a **Template** — copy it, then replace the blank row with the readout from your machine. **Student lab:** one scene, no route table. **Instructor demonstration** (`react-template` **1.0.0**): routed `/ex1-beacon` and `/ex2-shader` share `BeaconStage`; that routing is for teaching both units from one repo, not a hand-in requirement.

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

**Platform notes** (npm, re-checked 2026-10-21). `fiber@9.7.0` declares a peer of `react >=19 <19.3`. `react@19.3.1` is outside that range, so the August pair does not install. The capstone uses the set that resolved and ran: `three@0.185.1` · `@react-three/fiber@9.8.2` · `@react-three/drei@10.7.9` · `react@19.3.1`. Latest `three` that day was `0.186.1`; this unit stays on `0.185.1`. Vendor docs are HOW, not bibliography.

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

**Excerpt** — the package names. This line installs whatever is latest. The pinned command is in the capstone's [Sandbox setup](#sandbox-setup); use that one for the lab.

```bash
npm install three @react-three/fiber @react-three/drei
```

### Basic Scene

**Excerpt** — `App` is not exported and there is no `main.jsx`. The capstone below is the runnable scene.

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

**Excerpt** — the mesh already exists. The frame only adds to its rotation.

```jsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function RotatingBox() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
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

**Excerpt** — needs a `<Canvas>` parent. The color is React state, so a click re-renders the material prop.

```jsx
import { useState } from 'react';

function ClickableBox() {
  const [color, setColor] = useState('red');
  
  return (
    <mesh onClick={() => setColor((current) => (current === 'red' ? 'blue' : 'red'))}>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
```

---

## 🎯 Raycasting & Events

R3F provides React-style events for 3D interactions:

**Excerpt** — needs a `<Canvas>` parent. Click stores a boolean. It does not log and discard the hit.

```jsx
import { useState } from 'react';

function InteractiveBox() {
  const [hovered, setHovered] = useState(false);
  const [picked, setPicked] = useState(false);

  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setPicked((value) => !value)}
    >
      <boxGeometry />
      <meshStandardMaterial color={picked ? 'orange' : hovered ? 'yellow' : 'green'} />
    </mesh>
  );
}
```

R3F dispatches the nearest hit, then bubbles that hit to parent objects. `stopPropagation` stops the parent group from receiving the same hit. **Available events:** `onClick`, `onPointerOver`, `onPointerOut`, `onPointerMove`, `onWheel`.

---

## 🚀 Performance Optimization

### Instancing for Many Objects

**Excerpt** — positions are chosen when the module loads. `Math.random()` in the component body runs again on every render and shuffles the field. Instancing collapses draw calls. It does not make a thousand React nodes free. The capstone does not instance: six meshes are a scene you can name.

```jsx
import { Instances, Instance } from '@react-three/drei';

const POSITIONS = Array.from({ length: 1000 }, (_, i) => {
  const angle = i * 0.37;
  return [Math.cos(angle) * 4, ((i % 20) - 10) * 0.3, Math.sin(angle) * 4];
});

function InstancedCubes() {
  return (
    <Instances limit={POSITIONS.length}>
      <boxGeometry />
      <meshStandardMaterial />
      {POSITIONS.map((position, i) => (
        <Instance key={i} position={position} />
      ))}
    </Instances>
  );
}
```

### Automatic Culling

R3F frustum-culls meshes that leave the camera — useful, not a substitute for a draw-call budget.

### Graded budget — `renderer.info`

**Excerpt** — the four fields. This fragment reads every frame and stores nothing. `BudgetProbe` in the capstone accumulates `delta` and keeps one sample a second. Paste that sample into the Entrega, with the device class.

```jsx
useFrame(({ gl }) => {
  const { calls, triangles } = gl.info.render;
  const { geometries, textures } = gl.info.memory;
});
```

| Class | Draw-call cap | Fail if |
| --- | --- | --- |
| Desktop | ≤ 200 | Uninstanced grids, lights-as-meshes, forgotten helpers |
| Mobile | ≤ 80 | Default DPR 2 + post stack + uninstanced clutter |

Unit 7's lesson still holds: an unmeasured "it's fine" is not an optimization.

One read per frame is only the whole frame while a single `gl.render` draws it. Three resets `calls` and `triangles` at the start of every render. A post-processing composer renders many times per frame, so this probe would see only its last pass. [Unit 9]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}) measures that and gives the per-frame probe.

---

## Capstone reference — one beacon

One object, one state owner, one animation, one budget read. The files below are the scene the lab asks you to run. Change the tree before you defend it. A branch that only pastes this does not show that you can explain a scene.

### Sandbox setup

1. Template: CodeSandbox → **React (Vite)**, JavaScript. React 19. No TypeScript, no router, no CSS framework. (The live instructor repo may already include `react-router-dom` for Ex1/Ex2 pages — students still defend **one** scene.)
2. Dependencies — the Dependency panel, or a terminal in the sandbox:

```bash
npm install react@19.3.1 react-dom@19.3.1 three@0.185.1 @react-three/fiber@9.8.2 @react-three/drei@10.7.9
```

3. No Vite config change.
4. Replace `src/main.jsx`, `src/App.jsx`, and `src/index.css`. Create `src/parts.js`, `src/Beacon.jsx`, and `src/BudgetProbe.jsx`. Delete the template's `src/App.css` if anything still imports it.
5. Create `docs/renderer-info.md` from the template and replace the blank row with the numbers the panel shows on your machine.

`App.jsx` imports the other modules. The preview errors until those files exist. Save them first.

What you should see: a lamp on a plinth, turning slowly. Hover a part, click it, or press the matching button. The panel is the same React state either way. About once a second the budget line reads `within ceiling`. Reference ceiling (Unit 8 and Unit 9 bulb swap): **calls 6 · triangles 1368 · geometries 6 · textures 1**.

### Why this shape

- State lives in `App`, above `<Canvas>`. A raycast and a button both call `setSelected`.
- The beacon is one `<group>` of six meshes. Handlers sit on the part, so the shaft and its collar share an id, and the arm, bulb, and ring share another. The JSX is still the tree: nothing is hidden behind a map of geometries.
- `useFrame` adds to `yoke.rotation.y`. It does not call `new THREE.BufferGeometry`, and it does not `setState`. A hidden tab can report a multi-second `delta`; the clamp keeps that from spinning the yoke a full turn in one frame.
- If the visitor has asked for reduced motion, the frame returns before it touches `rotation`. The raycast and the buttons still work.
- `BudgetProbe` returns `null`. It has to be inside `<Canvas>`: `useFrame` is not available outside it. `useFrame` runs before `gl.render`, so `gl.info` still holds the previous, finished frame.
- The panel is a grid column, not a layer on top of the canvas. A layer painted over the WebGL view steals the pointer, and the raycast never runs. Part names are HTML, so they stay text and add no texture.
- `gl={{ alpha: false }}` (via a `GL` constant in the paste below) keeps an opaque clear — a transparent buffer can flash through on some composites and makes automation screenshots look “black empty” even when the probe proves draws are happening.
- Clear hover on `onPointerLeave` / `onPointerMissed`. Leaving the canvas mid-hover otherwise leaves cursor and `hovered` stuck.
- Two directional lights and one ambient light. A light is not a draw call. A shadow map is another pass through the same meshes. This scene leaves shadows off.
- `dpr` is capped at 1.5 because the unit's mobile failure mode is the default pixel ratio of 2. `WebGLInfo` counts triangles from the draw call, not from the framebuffer, so this snapshot will not catch fill-rate. The cap is still set.
- R3F disposes geometries created by JSX when the tree unmounts. The probe stays at 6 geometries while you hover and select, which is the check that interaction is not allocating a new mesh.

### Accepted ceiling

Measured 2026-10-21 on Apple M4 Max (ANGLE Metal, WebGL 2), the pins above, shadows off:

| Field | Reading | Why it is the ceiling |
| --- | --- | --- |
| `calls` | 6 | one draw per mesh |
| `triangles` | 1368 | the six geometries, summed by `gl.info` |
| `geometries` | 6 | one `BufferGeometry` per mesh, stable across hover and click |
| `textures` | 1 | no material map is set; Three still binds one empty sampler placeholder |

The same scene with a shadow map measured `calls` 12, `triangles` 2736, `textures` 3. That pass is rejected. `CEILING` in `BudgetProbe.jsx` is the accepted row. If you change the tree, change `CEILING` and the snapshot together.

### `src/main.jsx`

**CodeSandbox-ready** — replace `src/main.jsx`.

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing #root mount node');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### `src/index.css`

**CodeSandbox-ready** — replace `src/index.css`.

```css
html,
body,
#root {
  height: 100%;
  margin: 0;
}

body {
  background: #161411;
  color: #f4efe6;
  font: 15px/1.45 ui-sans-serif, system-ui, sans-serif;
}

.stage {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 18rem;
  height: 100dvh;
}

.stage-canvas {
  min-width: 0;
  min-height: 0;
  height: 100%;
}

.readout {
  padding: 16px;
  background: #161411;
  border-left: 1px solid rgb(244 239 230 / 0.16);
  overflow: auto;
}

.parts button:focus-visible {
  outline: 2px solid #f6e2bc;
  outline-offset: 2px;
}

@media (max-width: 720px) {
  .stage {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) auto;
  }

  .readout {
    border-left: 0;
    border-top: 1px solid rgb(244 239 230 / 0.16);
  }
}

.readout h1 {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 600;
}

.readout p {
  margin: 0 0 8px;
}

.parts {
  display: flex;
  gap: 6px;
  margin: 0 0 8px;
  padding: 0;
  list-style: none;
}

.parts button {
  font: inherit;
  color: inherit;
  background: transparent;
  border: 1px solid rgb(244 239 230 / 0.35);
  border-radius: 999px;
  padding: 4px 10px;
  cursor: pointer;
}

.parts button[aria-pressed='true'] {
  background: #e36a2c;
  border-color: #e36a2c;
  color: #1a120c;
}

.meta {
  color: rgb(244 239 230 / 0.72);
}

.budget {
  margin: 0;
  font-family: ui-monospace, monospace;
  font-size: 12px;
}

.budget.over {
  color: #ffb4a2;
}
```

### `src/parts.js`

**CodeSandbox-ready** — create `src/parts.js`. Ids live here so the buttons and the meshes cannot drift.

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
    note: 'Arm, bulb, and ring. Their parent yoke is the only node useFrame rotates.',
  },
];
```

### `src/BudgetProbe.jsx`

**CodeSandbox-ready** — create `src/BudgetProbe.jsx`.

```jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

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
  const wait = useRef(0);

  useFrame(({ gl }, delta) => {
    wait.current += delta;
    if (wait.current < 1) return;
    wait.current = 0;
    // useFrame runs before gl.render, so info still holds the previous frame.
    onSample({
      calls: gl.info.render.calls,
      triangles: gl.info.render.triangles,
      geometries: gl.info.memory.geometries,
      textures: gl.info.memory.textures,
    });
  });

  return null;
}
```

### `src/Beacon.jsx`

**CodeSandbox-ready** — create `src/Beacon.jsx`.

```jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PartId } from './parts.js';

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
    // A hidden tab can report a multi-second delta and spin the yoke a full turn.
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
          <meshStandardMaterial
            color={colorFor(PartId.lamp, hovered, selected, '#e0a84a')}
            metalness={0.15}
            roughness={0.28}
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

### `src/App.jsx`

**CodeSandbox-ready** — replace `src/App.jsx`.

{% raw %}

```jsx
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Beacon from './Beacon.jsx';
import BudgetProbe, { CEILING, withinCeiling } from './BudgetProbe.jsx';
import { PARTS } from './parts.js';

const CAMERA = { position: [2.15, 1.35, 2.55], fov: 40 };
const DPR = [1, 1.5];
const LOOK_AT = [0, 0.35, 0];
// Opaque clear — avoids a transparent buffer flashing through on some composites.
const GL = { alpha: false, antialias: true };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export default function App() {
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  const part = PARTS.find((item) => item.id === selected);
  const verdict = withinCeiling(budget);

  return (
    <div className="stage">
      <div className="stage-canvas" role="img" aria-label="Beacon WebGL scene">
        <Canvas
          camera={CAMERA}
          dpr={DPR}
          gl={GL}
          onPointerLeave={() => setHovered(null)}
          onPointerMissed={() => setHovered(null)}
        >
          <color attach="background" args={['#161411']} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 6, 2]} intensity={2.4} />
          <directionalLight position={[-3, 2.2, -2]} intensity={0.55} />
          <Beacon
            hovered={hovered}
            selected={selected}
            reduced={reduced}
            onHover={setHovered}
            onSelect={setSelected}
          />
          <BudgetProbe onSample={setBudget} />
          <OrbitControls enablePan={false} target={LOOK_AT} />
        </Canvas>
      </div>
      <aside className="readout">
        <h1>Beacon</h1>
        <ul className="parts">
          {PARTS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={selected === item.id}
                onClick={() => setSelected(item.id)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <p aria-live="polite">
          {part ? part.note : 'Click a mesh or a button. Both write the same state.'}
        </p>
        <p className="meta">Hover: {hovered ?? '—'}</p>
        <p className={verdict === false ? 'budget over' : 'budget'}>
          {budget
            ? `calls ${budget.calls}/${CEILING.calls} · triangles ${budget.triangles}/${CEILING.triangles} · geometries ${budget.geometries} · textures ${budget.textures}`
            : 'Sampling…'}
          {verdict === true ? ' · within ceiling' : ''}
          {verdict === false ? ' · over ceiling' : ''}
        </p>
      </aside>
    </div>
  );
}
```

{% endraw %}

### `docs/renderer-info.md`

**Template** — create `docs/renderer-info.md` in the sandbox (or in the repo you defend). Replace the blank row. Keep the reference rows so the rejected pass stays visible next to the one you accept.

```markdown
# renderer.info — beacon

Scene: one beacon, shadows off, DPR cap [1, 1.5].
Unit cap, any scene: desktop ≤ 200 calls, mobile ≤ 80.
Accepted ceiling for this tree: calls ≤ 6, triangles ≤ 1368, geometries ≤ 6, textures ≤ 1.

The reference rows were measured on Apple M4 Max, ANGLE Metal, WebGL 2, 2026-10-21, with three@0.185.1, @react-three/fiber@9.8.2, @react-three/drei@10.7.9, react@19.3.1. Your row replaces the blank. If you change the tree, change this table and CEILING in src/BudgetProbe.jsx together.

| Run | Machine | Shadows | calls | triangles | geometries | textures | Accepted |
| --- | --- | --- | --- | --- | --- | --- | --- |
| reference | Apple M4 Max, 2026-10-21 | off | 6 | 1368 | 6 | 1 | yes |
| same meshes, shadow map on | same machine and pins | on | 12 | 2736 | 6 | 3 | no |
| yours | | | | | | | |

`memory.textures` is 1 while every material map is null. That one is Three's empty sampler placeholder. A file you load is an extra texture. The shadow row renders the same meshes again: calls and triangles double, textures go to 3.
```

### Failure modes this scene refuses

- `Math.random()` or `new THREE.BoxGeometry()` inside the component body or inside `useFrame`. The instancing excerpt keeps its positions in a module array for the same reason.
- `setState` on every tick. The probe commits once a second. A budget that re-renders the React tree at frame rate is part of the cost it claims to measure.
- A shadow map, a grid helper, or a second copy of the beacon that you did not write into `docs/renderer-info.md`.

---

## Lab (team) — workplace-like · 3 h

Run the reference scene, then change the mesh tree on the repo you will defend. Do this **together**. The reference is an instructor demonstration.

1. Canvas + lights + one composed mesh tree (not a single tutorial cube).
2. Pointer events: hover + click that change **React state** (raycasting is the 3D `onClick`).
3. One `useFrame` animation that does **not** allocate geometry.
4. `renderer.info` snapshot in `docs/` — before/after or a threshold you accepted.
5. Merge log: the covenant's `docs/ai-3d-merge-log.md`, shared with Unit 9. The two-REJECT rule is the [assignment]({{ '/lessons/en/feii/units-8-9-assignment/' | relative_url }}). This lab does not keep a separate count.

**Deliverable:** the scene on the shared repo, plus `docs/renderer-info.md`. The graded 3D slice is the [Units 8–9 assignment]({{ '/lessons/en/feii/units-8-9-assignment/' | relative_url }}). Unit 10 is still the rest of Entrega 2.

---

## Independent self-check — autonomous study

This is an individual self-check, not part of the formal 14-hour
Resolución de Ejercicios allocation.

This check is separate from the lab scene. Isolate the strategy:

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
