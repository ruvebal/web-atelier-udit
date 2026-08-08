---
layout: lesson
title: 'Unit 9: Shader Literacy & Cutting-Edge Interface Aesthetics'
title_alt: 'Unidad 9: Alfabetización en Shaders y Estéticas de Interfaz de Vanguardia'
slug: feii-unit-9-shader-literacy
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-9-shader-literacy/
description: 'Shader literacy fundamentals: GLSL basics, custom shaders in R3F, post-processing effects, and cutting-edge interface aesthetics.'
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

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Shaders are not black magic. They're programs that run on the GPU, pixel by pixel."_

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Understand shader basics** — Vertex and fragment shaders, GLSL syntax, and the GPU pipeline
- **Write custom shaders** — GLSL in R3F, uniform inputs, and time-based animation
- **Implement post-processing** — Bloom, distortion, chromatic aberration, and other effects
- **Explore cutting-edge aesthetics** — Generative patterns, noise-based effects, and spatial UI
- **Balance aesthetics with performance** — When to use shaders vs. standard materials

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

Processes each vertex (position, normal, UV):

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

## 🌈 Post-Processing Effects

Post-processing applies effects after the scene is rendered:

### Bloom Effect

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

## 🎯 Cutting-Edge Aesthetics

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

## 🎯 Practice Exercise

**Time:** 3 hours

1. **Write a vertex shader** — Transform vertices with time-based distortion
2. **Write a fragment shader** — Create a generative pattern using noise
3. **Implement post-processing** — Add bloom and chromatic aberration to a scene
4. **Build a cutting-edge UI** — Combine 3D elements with spatial typography
5. **Optimize performance** — Measure GPU usage, reduce shader complexity if needed
6. **Document your aesthetic choices** — Why these effects? What mood do they create?

**Deliverable:** R3F project with custom shaders + post-processing + aesthetic documentation

---

## 📚 Recommended Reading

- **The Book of Shaders** — https://thebookofshaders.com/
- **Shader Toy** — https://www.shadertoy.com/ (inspiration gallery)
- **GLSL Documentation** — https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language
- **Post-Processing in R3F** — https://docs.pmnd.rs/react-postprocessing

---

## ✅ Session Outcome

By the end of this unit, you should:

- Understand the GPU pipeline and shader types (vertex/fragment)
- Be able to write custom GLSL shaders in R3F
- Implement post-processing effects for visual polish
- Explore cutting-edge aesthetics through generative patterns and spatial UI
- Balance visual impact with performance considerations

Units 8–9 complete the **3D / cutting-edge interface aesthetics** frontier unit. This is explicitly an interface-layer transfer exercise — the same component/state model as React, applied to spatial interfaces. The Entrega 2 seed project can now be built using R3F and shader literacy.

---

> _"Aesthetics is not decoration. It's how the interface communicates."_
