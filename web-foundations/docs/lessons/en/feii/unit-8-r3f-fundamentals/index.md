---
layout: lesson
title: 'Unit 8: React Three Fiber — 3D Interfaces with React Patterns'
title_alt: 'Unidad 8: React Three Fiber — Interfaces 3D con Patrones React'
slug: feii-unit-8-r3f-fundamentals
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-8-r3f-fundamentals/
description: 'React Three Fiber fundamentals: declarative 3D components, state management, animation, and interface-layer transfer from React.'
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

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"3D on the web is not a different paradigm. It's the same component model, extended to the spatial dimension."_

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Understand React Three Fiber** — Declarative 3D components using React patterns
- **Bridge React to 3D** — Apply hooks, state, and composition to WebGL scenes
- **Build interactive 3D interfaces** — Events, raycasting, and responsive 3D components
- **Optimize 3D performance** — Instancing, culling, and efficient rendering
- **See the interface-layer transfer** — Same component model, different rendering target

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

### Declarative vs. Imperative

Three.js (imperative):
```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

R3F (declarative):
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

R3F automatically culls objects outside the camera view — no manual optimization needed.

---

## 🎯 Practice Exercise

**Time:** 3 hours

1. **Set up an R3F project** — Install Three.js and R3F dependencies
2. **Build a basic scene** — Canvas, lights, camera, and a simple mesh
3. **Add interactivity** — Click events, hover states, and raycasting
4. **Implement animation** — Use `useFrame` for continuous animation
5. **Optimize performance** — Use instancing for multiple objects
6. **Compare to 2D React** — Note how the same hooks and state patterns apply

**Deliverable:** R3F project with interactive 3D interface + performance analysis

---

## 📚 Recommended Reading

- **R3F Documentation** — https://docs.pmnd.rs/react-three-fiber
- **Three.js Documentation** — https://threejs.org/docs/
- **@react-three/drei** — https://github.com/pmndrs/drei (helper components)
- **R3F Examples** — https://docs.pmnd.rs/react-three-fiber/getting-started/examples

---

## ✅ Session Outcome

By the end of this unit, you should:

- Understand React Three Fiber as a React renderer for WebGL
- Be able to build declarative 3D components using React patterns
- Implement interactivity and animation using React hooks
- Optimize 3D performance with instancing and culling
- See the interface-layer transfer — same component model, different rendering target

This unit introduces 3D as an interface-layer frontier — not a graphics course, but an application of React patterns to spatial interfaces. The next unit will dive deeper into shader literacy and cutting-edge aesthetics.

---

> _"The interface layer is not bound to 2D. Spatial interfaces are the next frontier."_
