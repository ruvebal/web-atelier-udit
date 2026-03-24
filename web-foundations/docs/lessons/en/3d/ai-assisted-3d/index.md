# AI-Assisted 3D Development — The Copilot Era

> *"The AI writes the boilerplate. You write the taste. The Tao is not in the tokens — it is in the judgment that discards ninety percent of them."*

Generative assistants have crossed the threshold where they can scaffold React Three Fiber scenes, draft GLSL, generate UI overlays, and suggest optimizations — **fast**. They still cannot **feel** whether a camera move is elegant on a 13" laptop, or whether your texture stack will melt a mid-tier phone. This lesson is about division of labor: what to delegate, what to guard, and how to work so the machine amplifies your standards instead of diluting them.

**Code in this lesson:** **CodeSandbox-ready** JavaScript is runnable in isolation where noted. **Excerpt** snippets assume three.js / R3F wiring you add yourself. Fenced **text** and **markdown** blocks marked **Template** are prompts or docs you must customize (placeholders, team names, paths).

---

## Philosophy: AI as amplifier, not replacement

Treat the model as a **junior pair** with infinite patience and uneven truthfulness. You remain responsible for:

- **Performance contracts** on real hardware
- **Accessibility** and motion ethics
- **Art direction** and pacing
- **Design taste** — palette, typography, rhythm, spatial hierarchy
- **Security** of asset pipelines and dependencies

The goal is not speed for its own sake. The goal is **higher iteration bandwidth** on the parts that benefit from iteration — shaders, layout experiments, UI overlays, glue code — while you focus on integration and taste.

---

## What AI is good at for 3D

| Task | Why it works |
|------|----------------|
| Boilerplate | R3F trees, loaders, Drei wrappers, repetitive config |
| GLSL drafts | Known patterns — noise, fresnel, dissolve — with human review |
| UI overlays | shadcn/ui panels, HUD components, Drei Html bridges |
| Debugging | Explaining compiler errors, mismatched uniforms, precision issues |
| Optimization suggestions | Instancing ideas, merge strategies — verify with profiling |
| Asset pipeline scripts | `gltf-transform`, KTX2 tooling, batch converters |
| Design system generation | DESIGN.md, palette selection, type scale — when guided by skills |

**Excerpt** — Returns a plain `{ uniforms, vertexShader, fragmentShader }` object; pass it into `THREE.ShaderMaterial` (or your material factory) and dispose on unmount.

```js
export function createDissolveMaterial(uniforms) {
  return {
    uniforms: {
      uProgress: { value: uniforms.uProgress },
      uEdgeWidth: { value: uniforms.uEdgeWidth },
      uColor: { value: uniforms.uColor },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      varying vec2 vUv;
      uniform float uProgress;
      uniform float uEdgeWidth;
      uniform vec3 uColor;
      void main() {
        float m = vUv.x;
        float edge = smoothstep(uProgress - uEdgeWidth, uProgress, m);
        if (edge < 0.001) discard;
        gl_FragColor = vec4(uColor, edge);
      }
    `,
  };
}
```

Hand the AI **your** uniform names and conventions; it will converge faster and break less.

---

## What AI is bad at

- **Visual taste**: spacing, rhythm, silhouette — it will average the internet (mitigated by UI UX Pro Max skill)
- **Novel hardware performance**: it may suggest techniques that bench well in theory and fail on Mali or Intel UHD
- **Team-specific architecture**: it guesses unless you ground it in repo truth
- **Legal/licensing nuance** for assets — always verify sources
- **Spatial composition**: camera language, focal tension, motion choreography — use Stitch for the 2D layer, your eyes for the 3D

Never ship AI-generated textures or models into commercial work without **rights review**.

---

## The tooling stack for AI-assisted 3D

This is the concrete tooling stack for 2026. Generic advice is gone — these are the tools.

### MCPs (Model Context Protocol servers)

| MCP | Role | Priority |
|-----|------|----------|
| **Browser MCP** | Runtime verification: render checks, console, network, screenshots | Mandatory |
| **Stitch MCP** (Google) | UI generation, DESIGN.md, React components, shadcn-ui integration, vibe design | High |
| **21st.dev Magic MCP** | Pre-built React+Tailwind component library, 3D section, `/ui` command | Recommended |
| **Nano Banana 2 MCP** | Image generation via Gemini (placeholders, texture refs, concept art) | Optional |
| **DevIAC Gateway** | Infrastructure backbone: knowledge MCP, filesystem, vectors, LAN access | Recommended if available |

### Skills (installed in editors, not MCPs)

| Skill | Role | Priority |
|-------|------|----------|
| **UI UX Pro Max** | Design intelligence: 67 UI styles, 96 palettes, 56 font pairings, 98 UX rules | High |

### Editor configuration (versioned in repo)

| File | Role |
|------|------|
| **Cursor rules** (`.cursor/rules/*.mdc`) | Stack + performance budgets as always-on context |
| **CLAUDE.md** | Project brief for Claude Code / long sessions |
| **`.windsurfrules`** | Same intent; Windsurf-specific ergonomics |
| **DESIGN.md** | Design system tokens (palette, type, spacing, motion) |

The Tao here is **repeatability**: your standards should live in files that travel with the repository, not in chat history.

---

## The 2D-over-3D pattern

The defining architectural challenge for modern 3D web: how to layer a high-quality 2D interface on top of and inside a WebGL canvas.

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ DOM Layer (shadcn/ui + Tailwind)                                 │
│  ├─ Navigation, panels, dialogs, sheets, toasts                  │
│  ├─ z-indexed overlays above the Canvas                          │
│  ├─ Accessible, keyboard-navigable, screen-reader friendly       │
│  └─ src/components/ui/ — never imports three.js                  │
├─────────────────────────────────────────────────────────────────┤
│ R3F Canvas                                                       │
│  ├─ 3D scene graph (meshes, lights, shaders, post-processing)   │
│  ├─ Drei <Html> — renders React components inside 3D objects     │
│  │   └─ Can render shadcn/ui components at 3D positions          │
│  │   └─ Follows 3D transforms (position, rotation, scale)        │
│  │   └─ src/components/canvas/overlays/ — bridges DOM into 3D   │
│  └─ Pure three.js/R3F — no DOM imports in scene graph            │
└─────────────────────────────────────────────────────────────────┘
```

### Why shadcn/ui

- Built on Radix primitives: real accessibility (focus trapping, ARIA, keyboard navigation)
- Styled with Tailwind: consistent with the 3D project's styling layer
- Copy-paste ownership: components live in your repo, not in `node_modules`
- Works inside Drei `<Html>`: Radix + Tailwind render correctly in the portal
- Stitch MCP has explicit `shadcn-ui` integration skill

### The Drei Html bridge

**Excerpt** — Drei's `<Html>` renders a React portal at a 3D position. Combine with shadcn for labels, tooltips, or interactive panels attached to meshes.

```jsx
import { Html } from '@react-three/drei';
import { Card, CardContent } from '@/components/ui/card';

function MeshInfoPanel({ position, title, description }) {
  return (
    <Html position={position} distanceFactor={10} transform occlude>
      <Card className="w-48 bg-background/80 backdrop-blur-sm">
        <CardContent className="p-3">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Html>
  );
}
```

**Caveats for Html inside Canvas:**

- Each `<Html>` instance creates a CSS3D-transformed DOM node — avoid hundreds of them
- `occlude` uses raycasting; test performance with many occluding meshes
- `distanceFactor` scales text with camera distance — tune per scene
- Pointer events on Html may fight with Canvas pointer events — use `pointerEvents: 'auto'` explicitly

---

## Design intelligence with AI

### The taste problem

AI-generated UI is functionally correct but aesthetically average. Colors feel random, layouts lack hierarchy, interactions feel "cheap". This is structural: models are trained on the entire internet, and the internet averages to mediocrity.

### The solution: design skills + design systems

1. **UI UX Pro Max skill** — gives the AI a "design brain" with curated styles, palettes, font pairings, and UX reasoning rules. When active, the AI makes decisions like a designer rather than averaging Stack Overflow answers.

2. **DESIGN.md** — a design system file at the project root that encodes your specific aesthetic decisions: palette, type scale, spacing, motion language, z-index strategy. Generated by Stitch or authored manually.

3. **Stitch MCP** — generates polished screens from natural language or "vibes" ("warm and inviting, like a museum at night"). Converts to React components. Has explicit shadcn-ui integration.

### Workflow: design-first, code-second

1. Define the aesthetic direction (mood, references, constraints)
2. Use Stitch to generate key screens as HTML/CSS
3. Use UI UX Pro Max to refine palette and typography decisions
4. Convert screens to React + shadcn/ui components
5. Integrate into the R3F canvas architecture
6. Verify in browser: check that shadcn overlay + 3D scene coexist cleanly

This workflow prevents the common failure mode where AI generates a "working" 3D scene with an ugly, disconnected UI bolted on top.

---

## "Rules first, code second" methodology

Before you prompt for a feature:

1. **State the user story** in one sentence
2. **List constraints**: target FPS, max texture size, mobile support, framework
3. **Point to existing patterns** in your repo (file paths, naming)
4. **Ask for a plan**, then code — or code with explicit TODOs you will verify

This mirrors how senior engineers review PRs: **intent → constraints → implementation**.

---

## Working agreement: human vs model (R3F + shadcn example)

| Responsibility | Human | Model |
|----------------|-------|--------|
| Frame budget ownership | ✓ | suggests |
| Art direction / pacing | ✓ | drafts |
| Design system decisions | ✓ approves | proposes via UI UX Pro Max |
| shadcn component selection | ✓ approves | proposes via Stitch / 21st.dev |
| Ref disposal / memory | ✓ verifies | implements |
| GLSL correctness on target GPUs | ✓ verifies | drafts |
| Dependency choices | ✓ approves | proposes |
| Drei Html overlay performance | ✓ profiles | implements |

Write this table into `CLAUDE.md` if your team argues about who owns merges.

---

## Concrete: from chat to merge (workflow)

1. Paste **file paths** and **acceptance criteria** ("no new deps", "≤ 200 draw calls")
2. Ask for **two** implementations — one minimal, one with polish — then pick
3. If UI work, ask Stitch to generate the screen first, then implement
4. Require **test plan** in the answer: devices, metrics, manual steps
5. Merge only after **local** run of build + one interaction smoke test

**Excerpt** — Intended for R3F: obtain `renderer` from `useThree()`; strip or guard `process.env` if your bundler does not define it.

```js
export function useDevDrawCallLog(renderer, label) {
  if (process.env.NODE_ENV !== 'production' && renderer) {
    console.log(`[${label}] calls=`, renderer.info.render.calls);
  }
}
```

---

## MCP-powered workflows

### Stitch → shadcn → Canvas workflow

1. Describe the UI in natural language to Stitch: "a floating control panel for 3D scene settings — glass morphism, dark mode, compact"
2. Stitch generates HTML/CSS screen
3. Use `react-components` skill to convert to React
4. Use `shadcn-ui` skill to align with your shadcn config
5. Integrate as a DOM overlay or Drei Html panel
6. Verify in Browser MCP

### 21st.dev component discovery

Use the `/ui` command in Cursor:
- `/ui 3D card component with hover animation` — search the 21st.dev library
- Browse [21st.dev/s/3d](https://21st.dev/s/3d) for pre-built 3D-reactive components
- Pull into your project with the Magic MCP

### Nano Banana 2 for visual references

Use for:
- Generating placeholder hero images during scaffold phase
- Creating texture reference sheets before commissioning final assets
- Thumbnail generation for portfolio pieces
- Concept art exploration for art direction meetings

Not for: final production textures or commercial assets without rights review.

### DevIAC knowledge MCP

If your studio runs DevIAC:
- Query the knowledge MCP for up-to-date three.js / R3F / React Router APIs
- Use vectors MCP for semantic search over ingested documentation
- Run `make ingest` to load new docs before a major scaffold session

---

## Prompt engineering for 3D

### Describing a shader

Include: **inputs** (textures, uniforms), **coordinate space**, **output** (color only vs alpha cutout), **performance** notes (no dynamic loops unless justified), and **three.js version** if relevant.

### Describing a scene

Include: **units**, **camera type**, **lighting rig**, **asset formats**, and **interaction triggers** (scroll ranges, pointer events).

### Describing a UI overlay

Include: **component library** (shadcn), **position** (DOM overlay vs Drei Html), **interaction model** (pointer events, keyboard), **motion language** (from DESIGN.md), **z-index layer**.

### Describing a camera path

Specify **key times**, **easing**, **look-at target**, and whether **FOV** changes. Ask for **parametric** formulas rather than magic numbers without names.

---

## AI for shader debugging

When you paste errors, bundle:

1. **Full shader source** (vertex + fragment)
2. **Compiler error string**
3. **Intent** in plain language
4. **Renderer** (WebGL1 vs WebGL2) and precision qualifiers

Ask for a **diff**, not a rewrite, when the shader is large — smaller reviews preserve working parts.

---

## AI for performance review

Provide: **draw call count**, **tri count**, **texture dimensions**, **transparent overdraw notes**, **Html overlay count**, and a **Chrome Performance** profile summary if available. Ask for **prioritized** changes with expected impact — then **measure**.

---

## When to override AI suggestions

Override when:

- The suggestion breaks **your** abstraction boundaries (ui/ importing three, canvas/ importing shadcn directly)
- It introduces **new dependencies** without justification
- It trades **maintainability** for micro-optimizations
- It **violates accessibility** (e.g., motion without reduced alternative)
- It puts too many Drei Html instances in a scene without profiling
- It uses design choices that conflict with your DESIGN.md

---

## Building a "3D knowledge base" the AI can reference

Version these alongside code:

- `DESIGN.md` — palette, type scale, spacing, motion language, z-index
- `docs/3d/CONVENTIONS.md` — units, axis conventions, layer naming
- `docs/3d/PERF_BUDGETS.md` — hard caps and measurement commands
- `docs/3d/ASSET_PIPELINE.md` — glTF/KTX2 steps and CI hooks
- `examples/` — minimal reproducible scenes for patterns you reuse

Point models at paths with `@` references in Cursor or explicit file reads in Claude Code.

### `DESIGN.md` starter outline

**Template** — Save at repo root; generated via Stitch `design-md` or manually. Replace tokens with actual values.

```markdown
# Design System

## Palette
- Primary: #1a1a2e
- Accent: #e94560
- Neutral: #f5f5f5 / #2a2a3e
- Semantic: success #22c55e, warning #eab308, error #ef4444

## Typography
- Display: [font name] (Google Fonts)
- Body: [font name] (Google Fonts)
- Mono: [font name]
- Scale: 12 / 14 / 16 / 20 / 24 / 32 / 48

## Spacing
- Base: 4px
- Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64

## Motion
- Duration fast: 150ms
- Duration normal: 300ms
- Duration slow: 500ms
- Easing: cubic-bezier(0.16, 1, 0.3, 1)
- Reduced motion: crossfade only, no transforms

## Z-index
- Canvas: 0
- Canvas overlay (Drei Html): 10
- DOM overlay: 20
- Navigation: 30
- Modal/Sheet: 40
- Toast: 50
```

### `CONVENTIONS.md` starter outline

**Template** — Save under `docs/3d/CONVENTIONS.md`; replace naming examples and layer rules with team decisions.

```markdown
# 3D conventions

## Space
- Y-up, meters, origin at floor unless scene doc states otherwise

## Naming
- Meshes: `M_` prefix optional; groups: `GRP_`
- Materials: `MAT_` + role (`MAT_HeroChrome`)

## Layers (if using three layers)
- Default raycast mask documented per scene

## UI boundaries
- src/components/ui/ — DOM only (shadcn/ui, Tailwind, Radix)
- src/components/canvas/ — R3F only (may use Drei Html to render ui/)
- src/components/canvas/overlays/ — Drei Html bridges
```

### `PERF_BUDGETS.md` starter outline

**Template** — Fill in reference machines, measurement steps, and PR logging policy.

```markdown
# Performance budgets

## Targets
- Desktop hero: 60 FPS @ 1080p on [define reference machine]
- Mobile simplified: 30 FPS on mid Android

## Measurement
- Chrome Performance panel: how to capture a 10s trace
- `renderer.info` logging policy for PRs

## Drei Html budget
- Max simultaneous Html instances per scene: 20 (profile if more needed)
- Avoid occlude raycasting with > 50 meshes
```

---

## Prompt templates you can reuse

**Template** — Every block in this section: replace bracketed hints and constraints before sending to your assistant.

### New scene from spec

```text
Build a minimal R3F scene in JavaScript (no TypeScript) with:
- One mesh, one directional light, orbit controls (drei), ACES tone mapping off by default
- Units: meters; Y-up
- motionProfile prop: 'full' | 'reduced' — when reduced, disable auto-rotation
- Include one Drei Html label on the mesh with a shadcn Card component
- Follow DESIGN.md tokens for colors and typography
Output: single file component + notes on where to split when it grows.
```

### UI overlay via Stitch

```text
Use Stitch MCP to design a control panel for a 3D scene:
- Glass morphism, dark mode, compact layout
- Controls: light intensity slider, material roughness, background toggle
- Convert to shadcn/ui components (Slider, Switch, Card)
- Position as fixed DOM overlay (bottom-right) with z-index from DESIGN.md
```

### Shader iteration

```text
Here is my fragment shader and the compiler error. Do not rewrite unrelated lines.
Intent: [fresnel rim / dissolve / stylized specular]
Constraints: WebGL2, mediump acceptable on mobile, max 4 texture fetches.
Error: [paste]
```

### Performance triage

```text
Given these renderer.info numbers, Drei Html instance count, and a list of lights/post passes,
rank optimizations by expected frame-time impact for integrated GPU laptops.
Cite overdraw, fill-rate risks, and Html overlay cost.
```

---

## Red-team checklist (before you trust the model)

- Does the answer **pin** three.js / R3F versions to your `package.json`?
- Does it introduce **new** `useEffect` subscriptions without cleanup?
- Does it allocate **per frame** in animation paths?
- For textures, does it mention **color space** and **mipmaps**?
- For glTF, does it mention **normals tangents** and **double-sided** costs?
- For shadcn, does it respect the **ui/ vs canvas/ boundary**?
- For Drei Html, does it document **instance count** impact?

If three or more checks fail, re-prompt with file attachments and budgets.

---

## Security and licensing (brief but non-optional)

- Never paste **production API keys** into chats; use env vars and secret managers
- AI-suggested **CDN script tags** can be typosquats — verify domain character-by-character
- For **generated** image textures and models, confirm commercial license terms before ship
- Stitch is free (350 generations/month) but verify asset rights for commercial use
- 21st.dev components check their license terms per component
- Nano Banana 2 generates via Gemini — generated images are not automatically licensed for commercial use

---

## Batch prompting for exploration

When stuck on art direction or architecture, ask for **N orthogonal options** (N = 3) with explicit **downsides** each. Humans pick; the model does not vote. This reduces "average internet" mush.

**Template** — Swap the creative brief and option count.

```text
Propose 3 different post-processing stacks for a luxury product hero in R3F.
For each: visual goal, perf cost (qualitative), mobile viability, and why you would reject it.
Include a shadcn overlay concept for each (HUD style, minimal, editorial).
Use UI UX Pro Max style rules for palette consistency.
Do not write code until I pick option B with modifications.
```

---

## Rubric: is this AI output safe to merge?

| Gate | Pass condition |
|------|----------------|
| API truth | Matches installed versions in lockfile |
| Memory | No obvious missing `dispose()` for new textures/geometries |
| React | No unthrottled `setState` in hot paths |
| Motion | Mentions reduced-motion or is purely non-visual |
| Scope | Diff size proportional to task |
| Boundary | ui/ has no three imports; canvas/ has no direct shadcn imports (only via overlays/) |
| Design | Follows DESIGN.md tokens, not arbitrary colors/fonts |

If any gate fails, send back with **one** focused correction request instead of accepting a full rewrite.

---

## Appendix: glTF optimization prompts (paste-ready)

**Template** — Paste into chat; substitute inspect output, size targets, and material details where indicated.

```text
You are optimizing a glb for web. Constraints: Safari iOS + Chrome Android + desktop Chrome.
Inputs: pasted gltf-transform inspect summary + target max file size.

Deliver:
1. Ordered steps (meshopt vs Draco decision with decode cost note)
2. Material / texture consolidation suggestions
3. Commands using npx gltf-transform (no global installs)
4. A final validation checklist (normals, emissive, alpha mode, double-sided count)

Do not suggest replacing the entire asset pipeline unless I ask.
```

```text
Review this glTF material setup for three.js MeshStandardMaterial mapping.
Flag redundant textures, wrong alpha modes, and expensive double-sided usage.
Suggest changes that preserve silhouette from the hero camera angle only.
```

Keep prompts **narrow**; wide prompts yield wide wrong answers.

---

## AI notes

Models **confabulate** file paths and API names. Always verify against installed package versions. For GLSL, prefer **incremental** edits. For architecture, prefer **plans** you approve before sprawling refactors. For design, trust DESIGN.md over the model's aesthetic preferences.

---

## Tao moment

> *The copilot that saves you an hour but costs you a broken frame budget has stolen two hours. The wise developer trades keystrokes for clarity — and clarity for measurable silence on the GPU timeline.*

---

## Related lessons

- [Cursor Rules for 3D Projects](cursor-rules/)
- [Claude Workflows for 3D Web](claude-workflows/)
- [Windsurf Configuration for 3D Projects](windsurf-config/)
- [Corpus to Boilerplate — Master Prompt File](corpus-to-boilerplate/)
- [MCP Preflight for the 3D Stack](mcp-preflight/)
