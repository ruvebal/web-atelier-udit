# 道 TTOD Visualizer: WebGPU Implementation Plan

> *"The module that knows its boundaries serves the whole. The module that knows no boundaries becomes the whole—and collapses under its own weight."*
> — The Tao of Development, Modularization Chapter

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Philosophy](#architecture-philosophy)
3. [Module Decomposition](#module-decomposition)
4. [Technology Stack](#technology-stack)
5. [Implementation Phases](#implementation-phases)
6. [AI-Assisted Development Schedule](#ai-assisted-development-schedule)
7. [Prompt Library](#prompt-library)
8. [Token Budget Estimation](#token-budget-estimation)
9. [Quality Gates](#quality-gates)
10. [Future Independence Path](#future-independence-path)

---

## Executive Summary

**Project:** TTOD Visualizer (codename: `ttodv`)
**Renderer:** WebGPU + Custom WGSL Shaders
**Data Source:** `ttod.yml` wisdom database
**Target:** Interactive 3D knowledge graph with 1000+ node scalability
**Philosophy:** Fractal modularity—each piece works alone, together they transcend

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Frame Rate | 60 FPS @ 1000 nodes | Chrome DevTools Performance |
| Initial Load | < 2s TTI | Lighthouse |
| Bundle Size | < 150KB gzipped | Rollup analyzer |
| Accessibility | Keyboard + screen reader | axe-core |
| Independence | Zero coupling to parent | Import graph analysis |

---

## Architecture Philosophy

### The Fractal Principle

```
┌─────────────────────────────────────────────────────────────────┐
│                        web-atelier-udit                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    web-foundations                         │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                      ttod                            │  │  │
│  │  │  ┌───────────────────────────────────────────────┐  │  │  │
│  │  │  │                  ttodv                         │  │  │  │
│  │  │  │  ┌─────────────────────────────────────────┐  │  │  │  │
│  │  │  │  │           @ttodv/core                   │  │  │  │  │
│  │  │  │  │  ┌───────────────────────────────────┐  │  │  │  │  │
│  │  │  │  │  │       @ttodv/webgpu-renderer      │  │  │  │  │  │
│  │  │  │  │  └───────────────────────────────────┘  │  │  │  │  │
│  │  │  │  └─────────────────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

Each layer can be extracted without breaking inner layers.
The innermost is the most reusable.
```

### Dependency Direction

```
ttodv/app ──────────► ttodv/core ──────────► ttodv/webgpu-renderer
     │                     │                          │
     │                     │                          │
     ▼                     ▼                          ▼
  ttod.yml            Pure Types               Zero Dependencies
  (data)              (interfaces)             (GPU primitives)
```

**Rule:** Dependencies flow inward. Inner modules know nothing of outer modules.

---

## Module Decomposition

### Layer 0: `@ttodv/gpu-primitives` (Standalone)

The innermost layer. Pure WebGPU abstractions with zero domain knowledge.

```typescript
// Can be published as independent npm package
// Knows nothing about quotes, wisdom, or TTOD

├── gpu-primitives/
│   ├── src/
│   │   ├── device.ts          // GPU device initialization
│   │   ├── buffer.ts          // Buffer management utilities
│   │   ├── pipeline.ts        // Render/compute pipeline factory
│   │   ├── texture.ts         // Texture loading & sampling
│   │   ├── shader-module.ts   // WGSL compilation wrapper
│   │   └── index.ts
│   ├── shaders/
│   │   ├── common/
│   │   │   ├── math.wgsl      // vec3 ops, quaternions
│   │   │   ├── noise.wgsl     // Simplex, Perlin
│   │   │   └── sdf.wgsl       // Signed distance functions
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
```

**Reusability:** Any WebGPU project (games, simulations, art).

---

### Layer 1: `@ttodv/graph-engine` (Standalone)

Force-directed graph simulation. No rendering, pure physics.

```typescript
├── graph-engine/
│   ├── src/
│   │   ├── types.ts           // Node, Edge, GraphData interfaces
│   │   ├── simulation.ts      // Force simulation (GPU compute)
│   │   ├── forces/
│   │   │   ├── attraction.ts  // Edge springs
│   │   │   ├── repulsion.ts   // Node-node Barnes-Hut
│   │   │   ├── centering.ts   // Pull toward origin
│   │   │   └── clustering.ts  // Section-based grouping
│   │   ├── spatial/
│   │   │   ├── octree.ts      // Spatial partitioning
│   │   │   └── bvh.ts         // Bounding volume hierarchy
│   │   └── index.ts
│   ├── compute-shaders/
│   │   ├── forces.wgsl        // GPU force calculations
│   │   ├── integration.wgsl   // Verlet integration
│   │   └── octree.wgsl        // GPU octree construction
│   ├── package.json
│   └── tsconfig.json
```

**Reusability:** Any graph visualization, social networks, dependency graphs.

---

### Layer 2: `@ttodv/renderer` (Standalone)

3D rendering pipeline. Consumes positions, outputs pixels.

```typescript
├── renderer/
│   ├── src/
│   │   ├── types.ts           // RenderNode, RenderEdge
│   │   ├── scene.ts           // Scene graph management
│   │   ├── camera.ts          // Orbital camera controller
│   │   ├── passes/
│   │   │   ├── geometry.ts    // G-buffer pass
│   │   │   ├── lighting.ts    // Deferred lighting
│   │   │   ├── bloom.ts       // Glow effect
│   │   │   ├── dof.ts         // Depth of field
│   │   │   ├── fxaa.ts        // Anti-aliasing
│   │   │   └── composite.ts   // Final composition
│   │   ├── primitives/
│   │   │   ├── sphere.ts      // Instanced spheres (nodes)
│   │   │   ├── cylinder.ts    // Instanced cylinders (edges)
│   │   │   └── text.ts        // SDF text rendering
│   │   └── index.ts
│   ├── shaders/
│   │   ├── node.wgsl          // Node vertex/fragment
│   │   ├── edge.wgsl          // Edge rendering
│   │   ├── text-sdf.wgsl      // Signed distance text
│   │   ├── bloom.wgsl         // Bloom post-process
│   │   └── composite.wgsl     // Final output
│   ├── package.json
│   └── tsconfig.json
```

**Reusability:** Any 3D data visualization, point clouds, networks.

---

### Layer 3: `@ttodv/core` (TTOD-specific)

Domain logic. Transforms TTOD data into graph structures.

```typescript
├── core/
│   ├── src/
│   │   ├── types.ts           // Quote, Section, Lesson types
│   │   ├── parser.ts          // YAML → TypeScript
│   │   ├── graph-builder.ts   // Quotes → Nodes/Edges
│   │   ├── colorizer.ts       // Section → Color mapping
│   │   ├── filters.ts         // Tag, level, section filters
│   │   ├── search.ts          // Fuzzy quote search
│   │   ├── selection.ts       // Multi-select, focus logic
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
```

**Reusability:** Any TTOD consumer (CLI, static site, API).

---

### Layer 4: `@ttodv/app` (Application Shell)

Combines all layers into the final application.

```typescript
├── app/
│   ├── src/
│   │   ├── main.ts            // Entry point
│   │   ├── state.ts           // Application state (Zustand/vanilla)
│   │   ├── ui/
│   │   │   ├── controls.ts    // Filter panel, search
│   │   │   ├── tooltip.ts     // Quote hover display
│   │   │   ├── sidebar.ts     // Quote detail view
│   │   │   └── legend.ts      // Section color legend
│   │   ├── interaction/
│   │   │   ├── picking.ts     // GPU picking
│   │   │   ├── gestures.ts    // Pan, zoom, rotate
│   │   │   └── keyboard.ts    // Accessibility nav
│   │   └── index.ts
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── vite.config.ts
```

---

## Technology Stack

### Core Technologies

| Layer | Technology | Rationale |
|-------|------------|-----------|
| GPU API | WebGPU | Future-proof, compute shaders, explicit control |
| Shader Language | WGSL | Native WebGPU, type-safe, modern |
| Build Tool | Vite | Fast HMR, native ESM, tree-shaking |
| Language | TypeScript 5.x | Strict mode, satisfies operator |
| State | Zustand | Minimal, no boilerplate, works anywhere |
| Testing | Vitest + Playwright | Unit + E2E, WebGPU mocking |

### Shader Pipeline

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Compute    │────▶│  Vertex     │────▶│  Fragment   │
│  (Forces)   │     │  (Instance) │     │  (Shading)  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                       │
       ▼                                       ▼
┌─────────────┐                         ┌─────────────┐
│  Positions  │                         │  G-Buffer   │
│  Buffer     │                         │  (Deferred) │
└─────────────┘                         └─────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
             ┌─────────────┐           ┌─────────────┐           ┌─────────────┐
             │   Bloom     │           │    DoF      │           │    FXAA     │
             └─────────────┘           └─────────────┘           └─────────────┘
                    │                         │                         │
                    └─────────────────────────┼─────────────────────────┘
                                              ▼
                                       ┌─────────────┐
                                       │  Composite  │
                                       └─────────────┘
```

---

## Implementation Phases

### Phase 0: Foundation (Week 1-2)

**Objective:** Working WebGPU context with a spinning cube.

| Task | Effort | Dependencies |
|------|--------|--------------|
| Project scaffolding | 2h | None |
| WebGPU device init | 4h | None |
| Basic render pipeline | 8h | Device |
| Camera controller | 6h | Pipeline |
| Instanced rendering POC | 8h | Pipeline |

**Deliverable:** Cube grid rendering at 60 FPS.

---

### Phase 1: Graph Engine (Week 3-4)

**Objective:** GPU-accelerated force simulation.

| Task | Effort | Dependencies |
|------|--------|--------------|
| Node/Edge types | 2h | None |
| CPU force simulation | 8h | Types |
| Compute shader setup | 6h | Phase 0 |
| GPU force kernels | 16h | Compute setup |
| Octree (CPU first) | 12h | Types |
| Octree GPU port | 16h | CPU octree |

**Deliverable:** 1000 nodes stabilizing in < 3s.

---

### Phase 2: Renderer (Week 5-6)

**Objective:** Beautiful nodes and edges.

| Task | Effort | Dependencies |
|------|--------|--------------|
| Deferred rendering setup | 12h | Phase 0 |
| Instanced sphere nodes | 8h | Deferred |
| Instanced cylinder edges | 8h | Deferred |
| Bloom post-process | 8h | Deferred |
| DoF post-process | 8h | Bloom |
| SDF text labels | 16h | Deferred |

**Deliverable:** Visually stunning graph render.

---

### Phase 3: TTOD Integration (Week 7)

**Objective:** Real data, real wisdom.

| Task | Effort | Dependencies |
|------|--------|--------------|
| YAML parser | 4h | None |
| Graph builder | 6h | Parser |
| Section colorization | 4h | Graph builder |
| Level → Z-depth | 2h | Graph builder |
| Related → edges | 4h | Graph builder |

**Deliverable:** TTOD quotes rendered as 3D graph.

---

### Phase 4: Interaction (Week 8-9)

**Objective:** User can explore and learn.

| Task | Effort | Dependencies |
|------|--------|--------------|
| GPU picking | 12h | Renderer |
| Hover tooltips | 6h | Picking |
| Click focus | 6h | Picking |
| Filter panel | 8h | Core |
| Search | 8h | Core |
| Keyboard navigation | 8h | A11y |

**Deliverable:** Full interactive experience.

---

### Phase 5: Polish (Week 10)

**Objective:** Production ready.

| Task | Effort | Dependencies |
|------|--------|--------------|
| Performance profiling | 8h | All |
| Bundle optimization | 4h | All |
| Fallback (WebGL2) | 16h | Renderer |
| Documentation | 8h | All |
| CI/CD pipeline | 4h | All |

**Deliverable:** Shippable product.

---

## AI-Assisted Development Schedule

### Token Budget Philosophy

> *"The prompt that asks for everything receives nothing useful. The prompt that asks for one thing receives mastery."*

### Phase Distribution

| Phase | Human Hours | AI Sessions | Tokens/Session | Total Tokens |
|-------|-------------|-------------|----------------|--------------|
| Phase 0 | 28h | 8 | ~8K | 64K |
| Phase 1 | 60h | 15 | ~12K | 180K |
| Phase 2 | 60h | 12 | ~10K | 120K |
| Phase 3 | 20h | 5 | ~6K | 30K |
| Phase 4 | 48h | 10 | ~8K | 80K |
| Phase 5 | 40h | 8 | ~8K | 64K |
| **Total** | **256h** | **58** | — | **538K** |

### Session Cadence

```
Week 1-2:   ████████░░░░░░░░░░░░  Phase 0 (Foundation)
Week 3-4:   ░░░░░░░░████████████  Phase 1 (Graph Engine)
Week 5-6:   ░░░░░░░░░░░░████████  Phase 2 (Renderer)
Week 7:     ░░░░░░░░░░░░░░░░████  Phase 3 (Integration)
Week 8-9:   ░░░░░░░░░░░░████████  Phase 4 (Interaction)
Week 10:    ░░░░░░░░░░░░░░░░████  Phase 5 (Polish)
```

---

## Prompt Library

### Phase 0 Prompts

#### P0.1: WebGPU Device Initialization

```markdown
**Context:** Building a WebGPU visualizer for a wisdom quote database.
**Task:** Create a TypeScript module for WebGPU device initialization.
**Requirements:**
- Async function that returns GPUDevice or throws descriptive error
- Feature detection with graceful fallback message
- Request high-performance adapter when available
- Type-safe wrapper around GPUDevice
- No external dependencies

**Output:** Complete TypeScript file with JSDoc comments.
```

**Estimated tokens:** 6K

---

#### P0.2: Render Pipeline Factory

```markdown
**Context:** WebGPU visualizer, device initialized.
**Task:** Create a render pipeline factory function.
**Requirements:**
- Accept vertex/fragment shader strings
- Accept vertex buffer layout configuration
- Support instanced rendering
- Return typed pipeline object with bind group layouts
- Include depth testing configuration

**Input:** Device wrapper from P0.1
**Output:** pipeline.ts with factory function and types.
```

**Estimated tokens:** 8K

---

#### P0.3: Orbital Camera Controller

```markdown
**Context:** WebGPU 3D visualizer.
**Task:** Implement orbital camera with smooth interpolation.
**Requirements:**
- Mouse drag for rotation (trackball style)
- Scroll wheel for zoom with limits
- Right-click drag for pan
- Touch gesture support (pinch zoom, two-finger pan)
- Smooth damping on all movements
- View/projection matrix output
- Focus on point with animated transition

**Output:** camera.ts with OrbitalCamera class.
```

**Estimated tokens:** 10K

---

### Phase 1 Prompts

#### P1.1: Force Simulation Types

```markdown
**Context:** Graph visualization engine.
**Task:** Define TypeScript interfaces for force-directed graph.
**Requirements:**
- Node: id, position (vec3), velocity (vec3), mass, pinned
- Edge: source, target, strength, natural length
- GraphData: nodes array, edges array, metadata
- SimulationConfig: forces enabled, alpha decay, etc.
- Pure types, no implementation

**Output:** types.ts with comprehensive interfaces.
```

**Estimated tokens:** 4K

---

#### P1.2: GPU Force Compute Shader

```markdown
**Context:** WebGPU force-directed graph simulation.
**Task:** Write WGSL compute shader for node forces.
**Requirements:**
- Repulsion: Barnes-Hut approximation using octree
- Attraction: Spring force along edges
- Centering: Gentle pull toward origin
- Clustering: Nodes with same group attract
- Verlet integration for stability
- Workgroup size optimization (256)

**Input:** Node buffer layout, edge buffer layout, octree buffer
**Output:** forces.wgsl with documented compute kernel.
```

**Estimated tokens:** 15K

---

#### P1.3: Octree Construction (GPU)

```markdown
**Context:** Barnes-Hut approximation needs spatial index.
**Task:** GPU octree construction in WGSL.
**Requirements:**
- Bottom-up construction from node positions
- Center of mass calculation per cell
- Max depth of 10 levels
- Handle up to 10,000 nodes
- Output: cell array with parent/child pointers

**Reference:** Research papers on GPU octrees
**Output:** octree.wgsl with construction kernel.
```

**Estimated tokens:** 18K

---

### Phase 2 Prompts

#### P2.1: Deferred Rendering G-Buffer

```markdown
**Context:** WebGPU 3D renderer with post-processing.
**Task:** Implement G-buffer pass for deferred rendering.
**Requirements:**
- Albedo (RGB) + Metallic (A) texture
- Normal (RGB) + Roughness (A) texture
- Position (RGB) + Depth (A) texture
- Emission (RGB) texture
- All textures same resolution as canvas
- Clear and render to multiple targets

**Output:** geometry-pass.ts and gbuffer.wgsl
```

**Estimated tokens:** 12K

---

#### P2.2: Bloom Post-Process

```markdown
**Context:** Deferred renderer with emission channel.
**Task:** Implement bloom post-processing effect.
**Requirements:**
- Threshold extraction from emission
- Gaussian blur (separable, 2-pass)
- Multiple mip levels for wider glow
- Additive blend with scene
- Intensity and threshold uniforms

**Output:** bloom.ts and bloom.wgsl (downsample, blur, composite)
```

**Estimated tokens:** 10K

---

#### P2.3: SDF Text Rendering

```markdown
**Context:** 3D graph with node labels.
**Task:** Implement signed distance field text rendering.
**Requirements:**
- Generate SDF atlas from font (offline tool reference)
- Vertex shader: billboard orientation toward camera
- Fragment shader: SDF sampling with anti-aliasing
- Support outline and shadow effects
- Dynamic text (quote IDs as labels)

**Output:** text-sdf.ts, text-sdf.wgsl, atlas generation guide
```

**Estimated tokens:** 14K

---

### Phase 3 Prompts

#### P3.1: TTOD YAML Parser

```markdown
**Context:** TTOD wisdom database in YAML format.
**Task:** Create TypeScript parser for ttod.yml.
**Requirements:**
- Use js-yaml for parsing
- Strict typing matching TTOD schema v2.0
- Validate required fields
- Transform to internal Quote/Section types
- Handle related quote resolution

**Input:** ttod.yml schema (provided)
**Output:** parser.ts with parse function and types.
```

**Estimated tokens:** 6K

---

#### P3.2: Graph Builder

```markdown
**Context:** TTOD quotes need to become graph nodes.
**Task:** Transform TTOD data into graph structure.
**Requirements:**
- Quote → Node (position TBD by simulation)
- Related → Edges with strength based on relationship type
- Section → cluster group ID
- Level → initial Z position (beginner=0, master=3)
- Color from section palette

**Input:** Parser output, TTOD schema
**Output:** graph-builder.ts
```

**Estimated tokens:** 5K

---

### Phase 4 Prompts

#### P4.1: GPU Picking

```markdown
**Context:** Interactive 3D graph, need to select nodes.
**Task:** Implement GPU-based object picking.
**Requirements:**
- Render node IDs to offscreen texture
- Read pixel at mouse position
- Async readback without stalling
- Handle no-hit (background)
- Return node ID or null

**Output:** picking.ts and picking.wgsl
```

**Estimated tokens:** 8K

---

#### P4.2: Filter Panel UI

```markdown
**Context:** TTOD visualizer needs filtering controls.
**Task:** Create filter panel (vanilla JS, no framework).
**Requirements:**
- Section checkboxes with color indicators
- Level range slider
- Tag cloud (clickable)
- Source filter dropdown
- Apply filters to graph (hide nodes, fade edges)
- URL state sync (shareable filters)

**Output:** filter-panel.ts with HTML generation
```

**Estimated tokens:** 10K

---

### Phase 5 Prompts

#### P5.1: WebGL2 Fallback

```markdown
**Context:** WebGPU not universally supported yet.
**Task:** Create WebGL2 fallback renderer.
**Requirements:**
- Same API surface as WebGPU renderer
- Transform feedback for compute simulation
- Instanced rendering for nodes/edges
- No post-processing (or simplified)
- Feature detection and automatic switch

**Output:** webgl2-renderer/ module mirroring webgpu-renderer/
```

**Estimated tokens:** 20K

---

## Token Budget Estimation

### Per-Prompt Breakdown

| Category | Avg Input | Avg Output | Rounds | Total |
|----------|-----------|------------|--------|-------|
| Architecture | 500 | 3000 | 2 | 7K |
| WGSL Shaders | 800 | 4000 | 3 | 14K |
| TypeScript | 600 | 2500 | 2 | 6K |
| Integration | 400 | 2000 | 2 | 5K |
| Debugging | 1500 | 2000 | 3 | 10K |

### Contingency

- Base estimate: 538K tokens
- Debugging buffer (30%): 161K tokens
- Refactoring cycles: 80K tokens
- **Total budget: ~780K tokens**

### Cost Estimation (Claude Opus)

| Model | Input/1M | Output/1M | Est. Cost |
|-------|----------|-----------|-----------|
| Opus | $15 | $75 | ~$50-80 |
| Sonnet | $3 | $15 | ~$10-15 |

---

## Quality Gates

### Gate 0: Foundation Complete

- [ ] WebGPU context initializes
- [ ] 1000 instanced cubes render at 60 FPS
- [ ] Camera orbits smoothly
- [ ] No console errors

### Gate 1: Simulation Stable

- [ ] Force simulation converges in < 5s
- [ ] GPU compute runs without artifacts
- [ ] Node positions update in real-time
- [ ] Memory usage stable over 60s

### Gate 2: Visually Impressive

- [ ] Bloom effect visible on highlighted nodes
- [ ] Text labels readable at all zoom levels
- [ ] Smooth transitions on focus
- [ ] Color palette matches TTOD schema

### Gate 3: Data Correct

- [ ] All 96 quotes render
- [ ] Related edges connect correct nodes
- [ ] Section clustering visible
- [ ] Level stratification on Z-axis

### Gate 4: Fully Interactive

- [ ] Node selection works
- [ ] Filters update graph immediately
- [ ] Search finds quotes
- [ ] Keyboard navigation complete
- [ ] Screen reader announces focused quote

### Gate 5: Production Ready

- [ ] Lighthouse Performance > 90
- [ ] Bundle < 150KB gzipped
- [ ] WebGL2 fallback functional
- [ ] Documentation complete
- [ ] CI/CD deploying

---

## Future Independence Path

### Extraction Strategy

```
Today:
  web-atelier-udit/
  └── web-foundations/
      └── docs/_data/ttod.yml
      └── docs/_docs/ttod-visualizer/

Tomorrow:
  ttod/                          ← npm: @ruvebal/ttod
  ├── data/ttod.yml
  ├── schema/ttod.schema.json
  └── package.json

  ttodv/                         ← npm: @ruvebal/ttodv
  ├── packages/
  │   ├── gpu-primitives/        ← npm: @ttodv/gpu-primitives
  │   ├── graph-engine/          ← npm: @ttodv/graph-engine
  │   ├── renderer/              ← npm: @ttodv/renderer
  │   ├── core/                  ← npm: @ttodv/core
  │   └── app/                   ← Deployed visualizer
  └── package.json (workspace)
```

### Independence Checklist

- [ ] Zero imports from parent repository
- [ ] Data fetched via URL or injected
- [ ] All assets self-contained
- [ ] README explains standalone usage
- [ ] GitHub Actions for independent CI
- [ ] npm publish workflow ready

---

## References

### WebGPU Resources

- [WebGPU Spec](https://www.w3.org/TR/webgpu/)
- [WebGPU Samples](https://webgpu.github.io/webgpu-samples/)
- [Tour of WGSL](https://google.github.io/tour-of-wgsl/)
- [WebGPU Fundamentals](https://webgpufundamentals.org/)

### Force-Directed Graphs

- [D3-Force Algorithm](https://github.com/d3/d3-force)
- [Barnes-Hut Simulation](https://jheer.github.io/barnes-hut/)
- [GPU Graph Drawing](https://arxiv.org/abs/2009.07527)

### Rendering Techniques

- [Deferred Shading](https://learnopengl.com/Advanced-Lighting/Deferred-Shading)
- [SDF Text Rendering](https://steamcdn-a.akamaihd.net/apps/valve/2007/SIGGRAPH2007_AlphaTestedMagnification.pdf)
- [Bloom Effect](https://learnopengl.com/Advanced-Lighting/Bloom)

---

*"The visualizer that shows wisdom must itself be built with wisdom."*

道

