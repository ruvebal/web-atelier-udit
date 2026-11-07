---
layout: lesson
title: '3D Web — Corpus & Syllabus'
lang: en
permalink: /lessons/en/3d/
description: 'Structured 3D-web corpus. FE II students: Phase 7 graded path is the AI-Assisted 3D covenant plus Units 8–9, not MCP shopping.'
---

# 3D Web — Corpus & Syllabus

> *"The screen is a window. The GPU is a furnace. Your job is to make the light believable before the furnace melts."*

A structured corpus for the frontend specialist who treats the browser as a rendering engine, not a document viewer. From GPU fundamentals to Awwwards-grade craft, with AI copilots as first-class collaborators.

The lessons browser lists this page under **3D**, together with the Front-End II units that share that window.

---

## FE II — graded 3D index

Units 8 and 9 are one graded scene inside the existing lab window. Satellites deepen that scene. They do not add a session or lab hours. The hand-in is the album-cover assignment. Oral review uses the covenant.

| # | Lesson | Role |
| --- | --- | --- |
| U8 | [React Three Fiber — 3D Interfaces with React Patterns]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}) | Declarative 3D, state in the scene, raycasting, `renderer.info` |
| U9 | [Shader Literacy & Cutting-Edge Interface Aesthetics]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}) | One understood GLSL shader, uniforms, UV space, written texture choice |
| — | [Units 8–9 Assignment — 3D Album Cover]({{ '/lessons/en/feii/units-8-9-assignment/' | relative_url }}) | Graded hand-in for the sleeve scene |
| — | [AI-Assisted 3D Covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}) | Bar for oral review: what the model may draft, what you must defend |
| — | [3D Terminology — Say It Out Loud]({{ '/lessons/en/feii/3d-terminology/' | relative_url }}) | Optional glossary for the defence |
| S1 | [Cover Shaders — One Authored Sleeve Effect]({{ '/lessons/en/feii/cover-shaders/' | relative_url }}) | `shaderMaterial` that samples a picture; one uniform from React; one explained effect |
| S2 | [KTX2/Basis — Texture Choice from First Principles]({{ '/lessons/en/feii/ktx2-basis/' | relative_url }}) | Pixel, texel, GPU memory; PNG vs ETC1S / UASTC, written with two labelled numbers |
| S3 | [Canvas 2.5D Hex Field — Projection Without Three]({{ '/lessons/en/feii/canvas-25d-hex-field/' | relative_url }}) | Pitch/yaw plus painter’s algorithm, without the Three.js tax ([live demo]({{ '/lessons/en/feii/canvas-25d-hex-field/demo/' | relative_url }})) |
{: .track-satellite-table }

Course framing stays on the [Front-End II lesson sequence]({{ '/lessons/en/feii/' | relative_url }}). The phases below are the optional corpus, not extra assessed hours.

---

## Who this is for

A senior frontend developer (or an ambitious intermediate) who wants to:

- Build production 3D experiences in the browser — not toys, not demos
- Understand the GPU pipeline deeply enough to debug a shader at 2am
- Ship scenes that load fast, render smooth, and degrade gracefully
- Use AI coding assistants (Cursor, Claude, Windsurf) as genuine force multipliers for 3D work
- Develop a portfolio that speaks the visual language of studios like Active Theory, Resn, or Immersive Garden

## What this is NOT

- Not XR/VR/AR (that's a separate track)
- Not a three.js tutorial (we assume you can read docs)
- Not framework-agnostic (we bet on React + R3F + the drei/pmndrs ecosystem, with three.js as the engine)
- Not theoretical computer graphics (we reference the math; we don't derive it)

---

## Curriculum map

### Phase 0 — Orientation

| # | Lesson | What you learn |
| --- | --- | --- |
| 0.1 | [State of the Art]({{ '/lessons/en/3d/state-of-the-art/' | relative_url }}) | 2026 Web-3D landscape: WebGPU, glTF, KTX2, 3DGS, framework choices |
{: .track-satellite-table }

### Phase 1 — Foundations (the GPU contract)

> *"You don't program a GPU. You negotiate with it."*

| # | Lesson | What you learn |
| --- | --- | --- |
| 1.1 | [GPU Pipeline & Render Loop]({{ '/lessons/en/3d/foundations/' | relative_url }}) | WebGL → WebGPU mental model, draw calls, state machines, the frame budget |
| 1.2 | [Three.js Core]({{ '/lessons/en/3d/threejs-core/' | relative_url }}) | Scene graph, cameras, renderers, the object lifecycle, coordinate systems |
| 1.3 | [React Three Fiber]({{ '/lessons/en/3d/react-three-fiber/' | relative_url }}) | Declarative 3D in React, reconciler internals, Drei, Suspense for assets |
{: .track-satellite-table }

### Phase 2 — The Visual Stack

> *"A shader is a tiny poem the GPU reads sixty times a second."*

| # | Lesson | What you learn |
| --- | --- | --- |
| 2.1 | [Materials & Shaders]({{ '/lessons/en/3d/materials-shaders/' | relative_url }}) | PBR theory, MeshStandardMaterial internals, ShaderMaterial, GLSL, TSL for WebGPU |
| 2.2 | [Geometry & Mesh]({{ '/lessons/en/3d/geometry-mesh/' | relative_url }}) | BufferGeometry, indexed vs non-indexed, instancing, merge, LOD, procedural geometry |
| 2.3 | Textures | Texture types, UV mapping, atlas strategies, procedural generation, video textures. The published deep dive is the KTX2 row below |
| 2.3.1 | [KTX2 Deep Dive]({{ '/lessons/en/3d/textures/ktx2/' | relative_url }}) | GPU-compressed textures: ETC1S vs UASTC, Basis Universal, build-time pipelines |
| 2.3.2 | [p5.js as Live Texture]({{ '/lessons/en/3d/p5-textures/' | relative_url }}) | p5 sketches as `THREE.Texture`, SSR-safe dynamic import, forced perspective, depth-layer composition |
| 2.4 | [Lighting & Shadows]({{ '/lessons/en/3d/lighting-shadows/' | relative_url }}) | Light types, shadow maps, cascaded shadows, environment lighting, PMREM, baked lightmaps |
{: .track-satellite-table }

### Phase 3 — Motion & Time

> *"Animation is not movement. Animation is the illusion of intention."*

| # | Lesson | What you learn |
| --- | --- | --- |
| 3.1 | [Animation]({{ '/lessons/en/3d/animation/' | relative_url }}) | Skeletal (mixamo → web), morph targets, procedural animation, spring physics, useFrame patterns |
| 3.2 | [Post-Processing]({{ '/lessons/en/3d/post-processing/' | relative_url }}) | EffectComposer, bloom, DOF, color grading, custom passes, performance cost of each |
| 3.3 | [Scroll-Driven 3D]({{ '/lessons/en/3d/scroll-driven-3d/' | relative_url }}) | GSAP + R3F, Lenis smooth scroll, scroll-linked cameras, cinematic transitions, parallax depth |
{: .track-satellite-table }

### Phase 4 — Advanced Media

> *"A splat is a photograph that remembers depth."*

| # | Lesson | What you learn |
| --- | --- | --- |
| 4.1 | [3D Gaussian Splatting]({{ '/lessons/en/3d/gaussian-splatting/' | relative_url }}) | Capture → web pipeline, PLY/splat formats, viewers, blending splats with meshes, compression |
| 4.2 | [Asset Pipeline]({{ '/lessons/en/3d/asset-pipeline/' | relative_url }}) | glTF ecosystem, gltf-transform, Draco vs meshopt, KTX2 integration, CI automation, CDN strategies |
{: .track-satellite-table }

### Phase 5 — Production

> *"Performance is not optimization. Performance is respect for the user's device."*

| # | Lesson | What you learn |
| --- | --- | --- |
| 5.1 | [Performance]({{ '/lessons/en/3d/performance/' | relative_url }}) | GPU profiling (Spector.js, Chrome GPU), VRAM budgets, draw call reduction, culling, LOD, demand frameloop |
| 5.2 | [Accessibility in 3D]({{ '/lessons/en/3d/accessibility-3d/' | relative_url }}) | Reduced motion, semantic alternatives, keyboard navigation, screen reader strategies, WCAG in 3D contexts |
{: .track-satellite-table }

### Phase 6 — Craft & Career

> *"The Awwwards site you admire took 6 months. The craft took 6 years."*

| # | Lesson | What you learn |
| --- | --- | --- |
| 6.1 | [Portfolio Craft]({{ '/lessons/en/3d/portfolio-craft/' | relative_url }}) | From collage to Awwwards: case study anatomy, visual grammar, interaction choreography, studio-level polish |
{: .track-satellite-table }

### Phase 7 — AI-Assisted 3D Development

> *"The AI writes the boilerplate. You write the taste."*

**FE II students:** do not treat this corpus Phase 7 as homework. Graded path is the [AI-Assisted 3D covenant]({{ '/lessons/en/feii/ai-assisted-3d-covenant/' | relative_url }}), [Unit 8]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}), and [Unit 9]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}). No MCP shopping.

| # | Lesson | Role |
| --- | --- | --- |
| 7.0 | Philosophy, merge rubric, perf prompts | Student path, distilled in the covenant. Full instructor text stays in the private studio module |
| 7.1 | Cursor rules for R3F / shaders / perf budgets | Student path: copy the numeric caps. Desktop ≤ 200 draw calls, mobile ≤ 80 |
| 7.2–7.3 | Claude / Windsurf workflow mirrors | Optional. Same Unit 6 AI rules. Not a second toolchain to install |
| 7.4 | Corpus-to-boilerplate master prompt | Instructor / prospector only. Not assessed, and not a public URL |
| 7.5 | MCP preflight (Stitch, 21st.dev, …) | Instructor demo once per term. Browser MCP is verification, not a grade |
{: .track-satellite-table }

---

## Learning philosophy

### The three laws of 3D web craft

1. **The GPU is the audience.** Every decision — texture format, draw call count, shader complexity — is a negotiation with a parallel processor that has no patience and perfect memory.

2. **The browser is the stage.** You inherit its constraints (security sandbox, single main thread, GC pauses) and its gifts (URLs, accessibility APIs, progressive enhancement, the entire web platform).

3. **The frame is the contract.** You have 16.6ms (at 60fps) or 8.3ms (at 120fps). Everything you do must fit inside that budget, every frame, on the worst device you support.

### Pedagogical approach

Each lesson follows a consistent structure:

- **Mental model** — the conceptual framework before any code
- **Core patterns** — the 3-5 patterns that cover 90% of real work
- **Code examples** — annotated, production-grade, copy-paste-ready
- **Performance implications** — every feature has a cost; we always name it
- **AI collaboration notes** — how to prompt AI assistants effectively for this specific topic
- **Tao moment** — a reflective insight that connects technique to craft

---

## Technology stack (canonical)

| Layer | Choice | Why |
|-------|--------|-----|
| Renderer | Three.js (r170+) with `WebGPURenderer` | Industry standard, WebGPU-ready, massive ecosystem |
| React binding | React Three Fiber (R3F) | Declarative scene graph, React lifecycle integration |
| Helpers | Drei, three-stdlib | Battle-tested abstractions (Html, Environment, useGLTF, etc.) |
| Animation | GSAP, Motion (motion/react), react-spring | Scroll timelines, gesture, physics-based motion |
| Textures | KTX2 + Basis Universal via KTX2Loader | GPU-compressed, universal transcoding |
| Models | glTF 2.0 + meshopt + KTX2 | Compressed geometry + compressed textures |
| Capture | 3D Gaussian Splatting | Photorealistic scene capture for web |
| Styling | Tailwind CSS v4 | Utility-first for DOM overlay UI |
| UI components | shadcn/ui (Radix + Tailwind) | Accessible primitives, copy-paste ownership, Drei Html compatible |
| Design system | DESIGN.md | Palette, type scale, spacing, motion tokens |
| Routing | React Router v7 | SSR streaming with entry points, loader patterns |
| i18n | i18next + react-i18next | Server/client split, locale detection, RTL support |
| Theming | ThemeProvider + data-theme | Multi-theme CSS variables, flash-prevention, localStorage |
| Build | Vite | Fast HMR, plugin ecosystem |
| Deploy | Cloudflare Workers / Vercel / Fly.io | Edge delivery for assets + SSR |
| AI | Cursor + Claude + Windsurf | Rules-driven, context-aware AI coding |
| AI MCPs | Stitch, 21st.dev Magic, Nano Banana 2, course knowledge gateway | UI generation, component library, visual refs, knowledge RAG |
| AI Skills | UI UX Pro Max | Design intelligence: palettes, font pairings, UX reasoning |
{: .track-satellite-table }

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
The course knowledge gateway in the AI MCPs row is implemented by DevIAC Gateway.
-->
{% endif %}

---

## Prerequisite knowledge

- Solid JavaScript/TypeScript
- React 18+ (hooks, Suspense, transitions)
- Basic linear algebra (vectors, matrices, dot/cross product)
- CSS layout and responsive design
- Git workflow
- Command-line comfort

## Recommended reading order

**If you have 1 week:** 0.1 → 1.1 → 1.3 → 2.1 → 5.1 → FE II covenant + Units 8–9

**If you have 1 month:** All of Phase 1 → Phase 2 → 3.3 → 4.2 → 5.1 → FE II Units 8–9

**Full curriculum:** Follow the phase numbers in order. Phase 7 instructor demos can run in parallel; **student assessment is Units 8–9**, not 7.4–7.5.

---

> *"The best 3D web experience is one where the user forgets they're in a browser."*
