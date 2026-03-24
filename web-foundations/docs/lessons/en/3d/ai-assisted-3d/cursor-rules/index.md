# Cursor Rules for 3D Projects

> *"Rules are the taste you encode so the machine can share your standards. Without them, the AI improvises — and improvisation at scale is indistinguishable from debt."*

Cursor rules (`.cursor/rules/*.mdc`) are **versioned instructions** injected into the model context based on scope. For 3D web work, rules prevent rediscovering the same performance footguns every sprint. This lesson defines a **production-grade, opinionated** ruleset you can drop into a React + React Three Fiber + Vite repository and refine.

---

## What Cursor rules are

- **Location:** `.cursor/rules/` with extension `.mdc`
- **Frontmatter:** YAML with `description`, optional `globs`, and `alwaysApply`
- **Behavior:** Rules match files by glob or apply globally when `alwaysApply: true`

Use **numeric prefixes** so teammates intuit load order when reading the folder: project → routing → R3F → shaders → assets → performance → style.

**`.mdc` examples below:** Each fenced `mdc` block is **copy-paste ready**—create the file at the path in the heading (for example `.cursor/rules/00-project.mdc`) and paste the **entire** fence, including YAML frontmatter. Tune `globs`, stack lines, folder names, and numeric budgets for your repo.

---

## Recommended layout

```
.cursor/rules/
  00-project.mdc        # always: stack, conventions, structure
  10-react-router.mdc   # routes, loaders, data patterns
  20-r3f-patterns.mdc   # Canvas, useFrame, disposal, memo discipline
  30-shaders.mdc        # GLSL style, uniforms, comments
  40-asset-pipeline.mdc # glTF, KTX2, compression
  50-performance.mdc    # budgets, profiling, frame loop law
  60-style.mdc          # Tailwind, a11y, naming
  70-shadcn-ui.mdc      # shadcn/ui + Drei Html overlay patterns
```

---

## `00-project.mdc` (always apply)

```mdc
---
description: Core stack, repo conventions, and 3D project invariants
alwaysApply: true
---

# Project — 3D Web (R3F)

## Stack
- Build: Vite
- UI: React 19
- UI components: shadcn/ui (Radix primitives, Tailwind-styled, src/components/ui/)
- Design system: DESIGN.md (palette, type, spacing, motion tokens)
- 3D: three.js + @react-three/fiber + @react-three/drei
- Routing: react-router (data APIs where applicable)
- Styling: Tailwind CSS
- Assets: glTF 2.0 (`.glb`), textures prefer KTX2 (Basis/UASTC) via `ktx2` loader when used

## Repo structure (enforce)
- `src/components/ui/` — DOM-only components (no three imports)
- `src/components/canvas/` — R3F scenes, providers, layers
- `src/components/canvas/scenes/` — route-level scenes
- `src/components/canvas/overlays/` — Drei `<Html>` bridges to DOM components
- `src/lib/three/` — non-React three helpers (math, loaders, materials)
- `public/assets/3d/` — shipped glbs, hdrs, luts (large binaries)
- `scripts/` — Node pipelines for gltf-transform / toktx / CI checks

## Engineering values
- Prefer explicit modules over barrel files except `src/components/ui/index.js`
- No `any`; this repo uses JavaScript — validate shapes with JSDoc typedefs where helpful
- Every Canvas route must have a DOM fallback or error boundary with user-facing copy
- Respect `prefers-reduced-motion` at the app root and pass `motionProfile` props

## Git hygiene
- Never commit uncompressed 4K PNGs intended for runtime; use KTX2 or sized JPEG/WebP for DOM
- Keep `*.hdr`, `*.glb` tracked with Git LFS when the remote supports it

## When unsure
- Read `docs/3d/PERF_BUDGETS.md` if present before adding effects or postprocessing
```

---

## `10-react-router.mdc`

```mdc
---
description: React Router patterns, loaders, and route/module boundaries
globs:
  - "**/routes/**/*.{js,jsx}"
  - "**/*route*.{js,jsx}"
  - "**/main.{js,jsx}"
  - "**/router.{js,jsx}"
---

# React Router — conventions

## File organization
- Colocate route modules under `src/routes/` with a default export component
- Name route components `*Route` (e.g., `HomeRoute`) for grep clarity
- Keep **data loading** in route modules or `src/server/` adapters — not inside `useFrame`

## Loaders and data
- Use route loaders for asset manifests (JSON), not for instantiating WebGL textures
- Return serializable data only from loaders; construct three objects inside R3F lifecycle
- Prefer deferred data for heavy JSON with `<Await>` + Suspense fallbacks

## Navigation UX
- Preserve scroll restoration defaults unless the design calls for manual control
- When transitioning between Canvas-heavy routes, unmount cleanly — dispose renderers on route exit

## Errors
- Provide `errorElement` with actionable copy for WebGL unsupported / context lost
- Log technical details to console / monitoring — not to the user banner verbatim

## Anti-patterns
- Importing `three` in non-canvas routes without code-splitting guards
- Fetching large binaries in loaders synchronously blocking first paint
```

---

## `20-r3f-patterns.mdc`

```mdc
---
description: React Three Fiber scene architecture, hooks, and lifecycle rules
globs:
  - "**/components/canvas/**/*.{js,jsx}"
  - "**/*.{js,jsx}"
---

# R3F — patterns & guardrails

## Canvas setup
- Use a single `<Canvas>` per route unless layering is intentional
- Set `dpr={[1, 2]}` unless there is a measurable reason to exceed 2 on desktop
- Prefer `gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}` — adjust per art direction
- Always set `resize={{ debounce: 0 }}` only if you understand layout thrash tradeoffs; default is usually fine

## useFrame discipline
- **No new object allocations** in `useFrame` (no `new Vector3()` per frame)
- Mutate reusable refs: `tmpV3.current.copy(...)`
- Put simulation in `useFrame`; put **React state** updates behind throttling unless necessary
- Order matters: use `priority` on `useFrame` when multiple subscribers must run in sequence

## Memoization
- Wrap expensive child trees in `React.memo` **after** measuring
- Prefer `useMemo` for geometries/materials that depend on props — not for everything

## Disposal
- When removing custom materials/geometries from the graph, call `dispose()` where three expects it
- For textures loaded manually, dispose on unmount; prefer `useTexture` from drei with awareness of shared caches

## Suspense & loading
- Use `<Suspense fallback={...}>` around assets; fallbacks must be lightweight (DOM/CSS)

## Anti-patterns / render storms
- Avoid `setState` every frame for values that can live in refs and be read by uniforms
- Avoid inline `onPointerMove` that updates React state continuously — throttle or use refs
- Do not recreate `new THREE.Color()` in render; hoist or memoize

## Drei
- Prefer helpers from `@react-three/drei` over reinventing OrbitControls, Environment, etc.
- Document when `PerformanceMonitor` is used and what downgrades it triggers
```

---

## `30-shaders.mdc`

```mdc
---
description: GLSL authoring conventions, uniform naming, and review requirements
globs:
  - "**/*.{glsl,vert,frag}"
  - "**/*Material*.{js,jsx}"
  - "**/shaders/**/*"
---

# Shaders — GLSL conventions

## Versions & precision
- Target WebGL2 (`#version 300 es`) for new work unless a hard WebGL1 constraint exists
- Use `precision highp float` in fragment shaders only when required; prefer `mediump` on mobile paths when validated

## Naming
- Prefix uniforms with `u` — `uTime`, `uResolution`, `uColor`
- Prefix varyings with `v` — `vUv`, `vNormal`, `vWorldPos`
- Prefix attributes are implicit in three — document custom attributes in material factory

## Files & strings
- Prefer template literals in `.js` with `/* glsl */` tag for syntax highlighting plugins
- For large shaders, split into imported glsl files — but keep uniform blocks documented at top

## Comments (required)
Every custom shader file must include at the top:
1. **Purpose** (one line)
2. **Inputs** (uniforms/textures)
3. **Coordinate spaces** (object/world/view/tangent)
4. **Performance notes** (loops, texture fetches, discard usage)

## Safety
- Avoid `discard` in depth-writing passes unless depth prepass strategy is documented
- Watch `normalize` on collapsed vectors — guard with epsilon when interpolating

## Reviews
- Any new `for` loop in GLSL requires reviewer sign-off + device test matrix entry
```

---

## `40-asset-pipeline.mdc`

```mdc
---
description: glTF, KTX2, compression, and CI expectations for 3D assets
globs:
  - "**/public/**/*.{glb,gltf,ktx2,webp,png,jpg}"
  - "**/assets/**/*"
  - "**/scripts/**/*.{js,mjs,cjs}"
  - "**/*.gltf"
---

# Asset pipeline — glTF & textures

## Models
- Ship **glTF 2.0** as `.glb` for single-file delivery unless tooling requires separate buffers
- Run `gltf-transform inspect` in CI for stats regression (tri count, materials, textures)
- Prefer **meshopt** compression for geometry where decoders are acceptable; document decoder inclusion
- Use **Draco** only when team understands decode cost vs bandwidth win

## Textures
- Runtime textures for three.js: prefer **KTX2** (Basis Universal) with appropriate transcodable formats
- Authoring sources stay out of runtime paths; bake to sized targets (e.g., 2K max for hero props unless approved)

## HDR / env
- Use `.hdr` or prefiltered PMREM workflows consistently — no accidental double PMREM per frame

## Naming & manifests
- Use lowercase-kebab for files; no spaces
- Maintain `src/data/asset-manifest.json` when using lazy route-based loading

## Forbidden
- Committing Photoshop PSDs to `public/`
- Unoptimized multi-megabyte PNG albedo maps as final runtime assets
```

---

## `50-performance.mdc`

```mdc
---
description: Frame budgets, draw call discipline, and profiling requirements
globs:
  - "**/components/canvas/**/*.{js,jsx}"
  - "**/lib/three/**/*.{js,jsx}"
---

# Performance — budgets & profiling

## Frame loop law
- **60 FPS target** on reference laptop (define M1/M2 or equivalent) for hero scenes
- **30 FPS minimum** on mid Android for simplified mobile scenes — document device class

## Budgets (default — tighten per project)
- **Draw calls (full scene):** ≤ 200 on desktop hero, ≤ 80 on mobile route
- **Triangles:** profile-based; flag scenes > 500k tris without LOD/instancing justification
- **Textures:** max 2K per unique map unless art-approved; anisotropy ≤ 8 unless measured benefit
- **Lights casting shadows:** default max 2; every additional light requires checklist sign-off

## Post-processing
- Post stack cost must be justified with before/after GPU timing
- Prefer half-resolution passes for bloom/DOF when visually acceptable

## Profiling workflow
- Use Chrome Performance + `three.js` `renderer.info` snapshots for regressions
- Capture a **baseline JSON** per major scene in `docs/perf/`

## Demand frameloop rules
- Pause simulation when offscreen (`useFrame` guard with IntersectionObserver at Canvas boundary)
- Reduce `dpr` dynamically when `PerformanceMonitor` or frame time thresholds trip

## Anti-patterns
- Full-screen transparent quads everywhere
- Per-object real-time shadows for crowds — use baked or fake contact shadows
```

---

## `60-style.mdc`

```mdc
---
description: Tailwind usage, accessibility, and JS naming conventions
globs:
  - "**/*.{js,jsx,css}"
  - "**/components/ui/**/*"
---

# Style — Tailwind, a11y, naming

## Tailwind
- Prefer utility-first; extract components when markup repeats **three+** times
- Keep z-index scales documented (`z-nav`, `z-modal`) — no arbitrary large z without comment
- Co-locate small UI styles with components; avoid global CSS except tokens/reset

## shadcn/ui
- Components live in `src/components/ui/` — never import three.js here
- Use `cn()` utility (clsx + tailwind-merge) for conditional classes
- Drei `<Html>` renders shadcn components inside 3D — keep overlay count reasonable (≤ 20 per scene)
- Respect Radix accessibility primitives: focus management, ARIA, keyboard navigation
- Follow DESIGN.md tokens for palette, typography, and spacing — no arbitrary values

## Accessibility
- All interactive DOM controls: visible focus, `aria-*` where needed, keyboard operability
- Canvas overlays must not trap focus unless implementing full WAI-ARIA widget patterns
- Respect `prefers-reduced-motion` for CSS **and** JS-driven animation

## Naming (JS)
- Components: `PascalCase`
- Hooks: `useThing`
- Utilities: `camelCase`
- Constants: `SCREAMING_SNAKE` only for true invariants

## Copy
- Errors are human-readable; include next step (“Reload”, “Try non-WebGL fallback”)

## Imports
- Order: external packages → aliased `@/` → relative — group with blank lines
```

---

## `70-shadcn-ui.mdc`

```mdc
---
description: shadcn/ui and Drei Html overlay conventions for 3D projects
globs:
  - "**/components/ui/**/*.{js,jsx}"
  - "**/components/canvas/overlays/**/*.{js,jsx}"
---

# shadcn/ui + Drei Html — overlay conventions

## Architecture boundary
- `src/components/ui/` is DOM-only: shadcn/ui, Tailwind, Radix. No three.js imports.
- `src/components/canvas/overlays/` bridges DOM into 3D via Drei `<Html>`.
- Canvas scene components in `src/components/canvas/` must NOT import from ui/ directly — use overlays/ as the bridge.

## Drei Html rules
- Each `<Html>` instance creates a CSS3D-transformed DOM node — budget ≤ 20 per scene
- Use `occlude` sparingly: raycasting scales with mesh count
- Set `distanceFactor` per scene to control text scaling with camera distance
- Pointer events: use `pointerEvents: 'auto'` explicitly on Html portals
- Do not nest heavy state in Html instances — keep them presentational, lift state to parent

## shadcn conventions
- Use `cn()` from `src/lib/utils/cn.js` for conditional class composition
- Follow DESIGN.md tokens for colors, typography, spacing — no arbitrary Tailwind values
- Preserve Radix accessibility: focus trapping, ARIA attributes, keyboard navigation
- Dark mode: use CSS variables from DESIGN.md, not Tailwind dark: prefix randomly

## z-index discipline
- Canvas: z-0
- Drei Html overlays: z-10
- DOM overlay panels: z-20
- Navigation: z-30
- Modal/Sheet: z-40
- Toast: z-50
- Document all z-index values in DESIGN.md
```

---

## Team vs personal projects

| Context | Recommendation |
|---------|----------------|
| Team | Rules live in repo; review changes like code; tag releases when rules shift |
| Personal | Same — optionally add `personal.mdc` gitignored **only** if it never affects collaborators (prefer not to) |
| Contractor | Fork upstream rules into client repo; do not rely on local-only `.cursor` for compliance |

For private snippets, use editor snippets or a `docs/` note — team rules should be **shared**.

---

## Testing that rules are effective

- **Synthetic tasks:** ask the AI to add a feature that historically caused mistakes (e.g., per-frame `setState`) and verify it refuses or mitigates
- **PR review:** compare AI output with rules on and off — delta should be obvious
- **Onboarding:** new hires should read `00-project.mdc` on day one

---

## Evolving rules as the project matures

Rules are **living**. When you violate a rule for good reason, update the rule with:

- **Why** the exception exists
- **Who** approved it
- **How** to audit it later

Debt enters when exceptions are oral lore.

---

## Anti-patterns in rule files themselves

- **Novel-length** `alwaysApply` rules — split into scoped `.mdc` files
- **Contradictions** between `50-performance.mdc` and `20-r3f-patterns.mdc` — grep for conflicting caps
- **Stale APIs** — bump rules when three.js majors ship (tone mapping, color management defaults)
- **Vague bans** (“be careful with shaders”) — replace with measurable guidance

Schedule a **quarterly** 15-minute rules review tied to a recurring calendar invite.

---

## Snippet: linking rules from `CONTRIBUTING.md`

Developers who never open Cursor still need the standards. Mirror the critical bullets:

**Template** — Insert into `CONTRIBUTING.md`; point to the rule files your team actually ships.

```markdown
## 3D performance (summary)
- See `.cursor/rules/50-performance.mdc` for draw-call and texture caps.
- Scene changes must include `renderer.info` before/after in the PR description when feasible.
```

---

## Quick reference: which rule when?

| You are editing… | Primary rule file |
|------------------|-------------------|
| New route / loader | `10-react-router.mdc` |
| Canvas component | `20-r3f-patterns.mdc` |
| Custom material / GLSL | `30-shaders.mdc` |
| `public/assets` or encode scripts | `40-asset-pipeline.mdc` |
| Post stack / instancing | `50-performance.mdc` |
| Tailwind / focus rings | `60-style.mdc` |
| shadcn / Drei Html overlay | `70-shadcn-ui.mdc` |

When two files conflict, **`00-project.mdc` wins** — update the specialist file to match.

---

## AI notes

Models may ignore rules under token pressure. Keep `alwaysApply` rules **short** and duplicate critical bans (no per-frame `setState`) in multiple scoped rules if needed.

---

## Tao moment

> *The cursor moves where attention aims. Encode your attention in rules, and the machine follows — not as your master, but as your echo, disciplined.*

---

## Related

- [AI-Assisted 3D Development — The Copilot Era](../index.md)
- [Claude Workflows for 3D Web](../claude-workflows/)
- [Windsurf Configuration for 3D Projects](../windsurf-config/)
