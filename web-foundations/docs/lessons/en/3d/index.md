# 3D Web — Corpus & Syllabus

> *"The screen is a window. The GPU is a furnace. Your job is to make the light believable before the furnace melts."*

A structured corpus for the frontend specialist who treats the browser as a rendering engine, not a document viewer. From GPU fundamentals to Awwwards-grade craft, with AI copilots as first-class collaborators.

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

| # | Lesson | What you learn | Directory |
|---|--------|----------------|-----------|
| 0.1 | **State of the Art** | 2026 Web-3D landscape: WebGPU, glTF, KTX2, 3DGS, framework choices | [state-of-the-art/](state-of-the-art/) |

### Phase 1 — Foundations (the GPU contract)

> *"You don't program a GPU. You negotiate with it."*

| # | Lesson | What you learn | Directory |
|---|--------|----------------|-----------|
| 1.1 | **GPU Pipeline & Render Loop** | WebGL → WebGPU mental model, draw calls, state machines, the frame budget | [foundations/](foundations/) |
| 1.2 | **Three.js Core** | Scene graph, cameras, renderers, the object lifecycle, coordinate systems | [threejs-core/](threejs-core/) |
| 1.3 | **React Three Fiber** | Declarative 3D in React, reconciler internals, Drei, Suspense for assets | [react-three-fiber/](react-three-fiber/) |

### Phase 2 — The Visual Stack

> *"A shader is a tiny poem the GPU reads sixty times a second."*

| # | Lesson | What you learn | Directory |
|---|--------|----------------|-----------|
| 2.1 | **Materials & Shaders** | PBR theory, MeshStandardMaterial internals, ShaderMaterial, GLSL, TSL for WebGPU | [materials-shaders/](materials-shaders/) |
| 2.2 | **Geometry & Mesh** | BufferGeometry, indexed vs non-indexed, instancing, merge, LOD, procedural geometry | [geometry-mesh/](geometry-mesh/) |
| 2.3 | **Textures** | Texture types, UV mapping, atlas strategies, procedural generation, video textures | [textures/](textures/) |
| 2.3.1 | **↳ KTX2 Deep Dive** | GPU-compressed textures: ETC1S vs UASTC, Basis Universal, build-time pipelines | [textures/ktx2/](textures/ktx2/) |
| 2.3.2 | **↳ p5.js as Live Texture** | p5 sketches as `THREE.Texture`, SSR-safe dynamic import, forced perspective, depth-layer composition | [p5-textures/](p5-textures/) |
| 2.4 | **Lighting & Shadows** | Light types, shadow maps, cascaded shadows, environment lighting, PMREM, baked lightmaps | [lighting-shadows/](lighting-shadows/) |

### Phase 3 — Motion & Time

> *"Animation is not movement. Animation is the illusion of intention."*

| # | Lesson | What you learn | Directory |
|---|--------|----------------|-----------|
| 3.1 | **Animation** | Skeletal (mixamo → web), morph targets, procedural animation, spring physics, useFrame patterns | [animation/](animation/) |
| 3.2 | **Post-Processing** | EffectComposer, bloom, DOF, color grading, custom passes, performance cost of each | [post-processing/](post-processing/) |
| 3.3 | **Scroll-Driven 3D** | GSAP + R3F, Lenis smooth scroll, scroll-linked cameras, cinematic transitions, parallax depth | [scroll-driven-3d/](scroll-driven-3d/) |

### Phase 4 — Advanced Media

> *"A splat is a photograph that remembers depth."*

| # | Lesson | What you learn | Directory |
|---|--------|----------------|-----------|
| 4.1 | **3D Gaussian Splatting** | Capture → web pipeline, PLY/splat formats, viewers, blending splats with meshes, compression | [gaussian-splatting/](gaussian-splatting/) |
| 4.2 | **Asset Pipeline** | glTF ecosystem, gltf-transform, Draco vs meshopt, KTX2 integration, CI automation, CDN strategies | [asset-pipeline/](asset-pipeline/) |

### Phase 5 — Production

> *"Performance is not optimization. Performance is respect for the user's device."*

| # | Lesson | What you learn | Directory |
|---|--------|----------------|-----------|
| 5.1 | **Performance** | GPU profiling (Spector.js, Chrome GPU), VRAM budgets, draw call reduction, culling, LOD, demand frameloop | [performance/](performance/) |
| 5.2 | **Accessibility in 3D** | Reduced motion, semantic alternatives, keyboard navigation, screen reader strategies, WCAG in 3D contexts | [accessibility-3d/](accessibility-3d/) |

### Phase 6 — Craft & Career

> *"The Awwwards site you admire took 6 months. The craft took 6 years."*

| # | Lesson | What you learn | Directory |
|---|--------|----------------|-----------|
| 6.1 | **Portfolio Craft** | From collage to Awwwards: case study anatomy, visual grammar, interaction choreography, studio-level polish | [portfolio-craft/](portfolio-craft/) |

### Phase 7 — AI-Assisted 3D Development

> *"The AI writes the boilerplate. You write the taste."*

| # | Lesson | What you learn | Directory |
|---|--------|----------------|-----------|
| 7.0 | **AI + 3D Web Overview** | Philosophy, what AI can/cannot do for 3D, prompt engineering for shaders and scenes | [ai-assisted-3d/](ai-assisted-3d/) |
| 7.1 | **Cursor Rules for 3D** | `.cursor/rules/*.mdc` for R3F projects, texture pipeline rules, performance guard rules | [ai-assisted-3d/cursor-rules/](ai-assisted-3d/cursor-rules/) |
| 7.2 | **Claude Workflows** | `CLAUDE.md`, subagents for asset processing, skills for shader generation, MCP integrations | [ai-assisted-3d/claude-workflows/](ai-assisted-3d/claude-workflows/) |
| 7.3 | **Windsurf Configuration** | `.windsurfrules` for 3D projects, cascade conventions, memory persistence | [ai-assisted-3d/windsurf-config/](ai-assisted-3d/windsurf-config/) |
| 7.4 | **Corpus to Boilerplate Prompt** | Master prompt-in-a-file: transforms the 3D corpus into a runnable scaffold with SSR streaming, i18n, theme system, modular CSS, shadcn/ui overlay, DESIGN.md, and MCP-aware execution. Includes preflight.sh for automated system verification. | [ai-assisted-3d/corpus-to-boilerplate/](ai-assisted-3d/corpus-to-boilerplate/) |
| 7.5 | **MCP Preflight for the 3D Stack** | Concrete MCP stack: Stitch, 21st.dev, Nano Banana 2, DevIAC Gateway, UI UX Pro Max skill — setup, matrix, and preflight checklist | [ai-assisted-3d/mcp-preflight/](ai-assisted-3d/mcp-preflight/) |

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
| AI MCPs | Stitch, 21st.dev Magic, Nano Banana 2, DevIAC Gateway | UI generation, component library, visual refs, knowledge RAG |
| AI Skills | UI UX Pro Max | Design intelligence: palettes, font pairings, UX reasoning |

---

## Prerequisite knowledge

- Solid JavaScript/TypeScript
- React 18+ (hooks, Suspense, transitions)
- Basic linear algebra (vectors, matrices, dot/cross product)
- CSS layout and responsive design
- Git workflow
- Command-line comfort

## Recommended reading order

**If you have 1 week:** 0.1 → 1.1 → 1.3 → 2.1 → 5.1 → 7.0

**If you have 1 month:** All of Phase 1 → Phase 2 → 3.3 → 4.2 → 5.1 → 7.0–7.1

**Full curriculum:** Follow the phase numbers in order. Phase 7 can be studied in parallel with any phase.

---

> *"The best 3D web experience is one where the user forgets they're in a browser."*
