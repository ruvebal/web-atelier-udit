# Windsurf Configuration for 3D Projects

> *"Every editor deserves to know your standards — not as chains, but as coordinates. Where coordinates exist, the craft converges."*

Windsurf pairs a VS Code–compatible workspace with **Cascade**, its agentic flow. For 3D repositories, the same truths apply as elsewhere: **persistent, file-backed rules** beat long prompts. This lesson maps Cursor-style discipline to Windsurf’s configuration surfaces and calls out what transfers cleanly versus what must be rephrased.

**Config vs template:** The example `.windsurfrules` body in this lesson is **copy-paste ready** for a new project file at the repo root—adjust headings, paths, and numeric budgets to match your stack. **Starter prompt** and similar fenced `text` blocks are **Templates** (replace names, tasks, and constraints).

---

## `.windsurfrules` format and placement

- **Location:** project root file named `.windsurfrules` (some teams also use workspace-level settings; prefer repo root for team alignment)
- **Format:** Markdown prose Windsurf injects as high-priority guidance for Cascade
- **Scope:** Treat it as a **global constitution** for the repo; keep it under ~400–600 lines or split concerns with clear headings

Unlike Cursor’s `.mdc` globs, Windsurf rules are typically **monolithic** unless you maintain separate docs and `@` reference them from the rules file.

---

## Recommended structure for 3D projects

Mirror the Cursor lesson mentally:

1. **Stack & invariants** — React, R3F, three.js, Vite, JS-only policy
2. **Canvas rules** — `useFrame`, disposal, no render storms
3. **Shaders** — naming, precision, review requirements
4. **Assets** — glTF, KTX2, CI inspection
5. **Performance** — draw calls, lights, post stack discipline
6. **Style & a11y** — Tailwind, focus, reduced motion
7. **shadcn/ui + Drei Html** — overlay architecture, component boundaries, z-index

### Optional companion files (same spirit as Cursor splits)

| File | Purpose |
|------|---------|
| `docs/3d/R3F.md` | Fiber-specific patterns and anti-patterns |
| `docs/3d/SHADERS.md` | GLSL review checklist + worked examples |
| `docs/3d/ASSETS.md` | glTF/KTX2 CI commands and folder layout |

Reference them from `.windsurfrules` in one line each so Cascade knows they exist.

---

## Cascade conventions

- Start sessions with **file anchors**: “Read `CLAUDE.md` and `.windsurfrules` before editing.”
- For large refactors, ask for a **plan + file list** before accepting edits
- Prefer **scoped edits** over whole-file rewrites for GLSL and scene graphs
- When generating shaders, require **diff-sized** output unless replacing entire files
- When designing UI overlays, ask Cascade to use Stitch MCP first if connected, then convert to shadcn/ui components

---

## Memory and context persistence tips

- Keep **canonical** standards in committed files: `.windsurfrules`, `CLAUDE.md`, `docs/3d/*`
- Use a short **bootstrap message** when opening Cascade: “Constraints: see `.windsurfrules` § Performance.”
- After major refactors, **update the rules** in the same PR — otherwise Cascade will “revert” you to old habits in future sessions

---

## Large 3D codebases in Windsurf

3D projects bloat context with assets and long shaders. Mitigations:

- **Exclude** `public/assets/**` from aggressive indexing if your tooling supports it — keep manifests in `src/` instead
- Maintain **`docs/3d/ARCHITECTURE.md`** with module boundaries so the agent does not traverse blindly
- For shaders, prefer **one material per file** with a stable export signature — easier to patch than 800-line monoliths

---

## Example `.windsurfrules` (full content)

**Copy-paste ready** — Save as `.windsurfrules` in the project root (one file). Replace “Acme” / example directories and budgets with your team’s canonical values; keep `CLAUDE.md` references accurate.

```markdown
# Windsurf rules — 3D Web (React + R3F + three.js)

## Identity
This repository ships a production 3D web experience. Code is JavaScript (no TypeScript).
Primary stacks: Vite, React 19, react-router, @react-three/fiber, @react-three/drei, three.js.
UI components: shadcn/ui (Radix primitives, Tailwind-styled).
Design system: DESIGN.md at project root.

## Non-negotiables
- Never add React state updates inside per-frame simulation hooks unless throttled.
- Always provide a `prefers-reduced-motion` alternative for cinematic motion.
- Prefer glTF `.glb` under `public/assets/3d/`. Run gltf-transform inspection before large merges.
- Prefer KTX2 for GPU textures in three.js when the project’s loader path is configured.
- Do not commit uncompressed authoring textures to `public/`.
- Follow DESIGN.md for palette, typography, spacing, and motion tokens.

## Directories
- `src/components/ui/` — DOM only; no `three` imports.
- `src/components/canvas/` — R3F Canvas, scenes, providers.
- `src/lib/three/` — non-React helpers: math, materials, loaders.

## shadcn/ui + Drei Html
- `src/components/ui/` — DOM-only shadcn/ui components. Never import three.js.
- `src/components/canvas/overlays/` — Drei Html bridges that render ui/ components inside 3D.
- Canvas components must not import from ui/ directly — use overlays/ as the bridge.
- Max ~20 Drei Html instances per scene without profiling justification.
- Follow DESIGN.md tokens for palette, typography, spacing, z-index.

## R3F / Canvas
- Default `dpr` clamp to [1, 2] unless a documented exception exists.
- Reuse math objects in `useFrame`; no per-frame allocations.
- Dispose manually loaded textures/materials on unmount.
- Use Suspense fallbacks that are cheap (DOM/CSS).

## Shaders (GLSL)
- WebGL2 default. Uniforms `u*`, varyings `v*`.
- Top comment block required: purpose, inputs, spaces, performance notes.
- Avoid `discard` in depth-writing passes unless documented.

## Performance budgets
- Desktop hero target: ≤ 200 draw calls; ≤ 2 shadow-casting lights without approval.
- Mobile simplified scene: ≤ 80 draw calls; prefer baked lighting.
- Textures default max 2K per map unless art-approved.

## Accessibility
- Canvas must coexist with semantic HTML and keyboard reachable controls.
- Announce dynamic changes with polite `aria-live` messages — describe outcomes, not rendering.

## Style
- Tailwind-first for UI; consistent z-index scale; visible focus states.

## When proposing dependencies
- Justify bundle size, maintenance, and interaction with three.js version pinned in package.json.

## Output expectations for Cascade
- Prefer minimal diffs; preserve unrelated formatting.
- When unsure, read `CLAUDE.md` and `docs/3d/*` before suggesting architecture changes.
```

---

## Comparison with Cursor rules

| Aspect | Cursor (`.mdc`) | Windsurf (`.windsurfrules`) |
|--------|------------------|-----------------------------|
| Scoping | Per-glob `globs` + `alwaysApply` | Usually single file; use headings |
| Granularity | Many small rules | One constitution + linked docs |
| Transfer | Copy content, **re-split** if desired | Merge multiple `.mdc` into sections |
| Risk | Over-long `alwaysApply` eats tokens | Same — keep lean, link out |

**What transfers:** performance bans, naming conventions, asset pipeline philosophy, R3F habits.

**What does not:** glob auto-attachment — you must **remind** Cascade which docs matter for the current task, or split work across focused markdown files and explicitly reference them.

---

## Workspace hygiene for Cascade

- Add a **`docs/3d/INDEX.md`** that lists canonical files — one sentence each — so humans and agents land in the right doc fast
- Pin **Node** version in `.nvmrc` / `package.json` engines; 3D tooling breaks silently on mismatched versions
- For monorepos, either **one** `.windsurfrules` at root with package headings, or per-package rules — never both without a map

---

## When Cascade drifts from your 3D standards

Symptoms: suggests TypeScript, adds `useState` per frame, proposes raw `RGBELoader` without PMREM strategy.

Fixes:

1. Paste the exact **§ Non-negotiables** from `.windsurfrules` into the prompt header
2. Attach the **smallest** file that shows the correct pattern (`SceneBaseline.jsx`)
3. Ask for a **plan only**, reject code, then re-ask constrained to JS

---

## Multi-root and large repos

If Windsurf opens multiple folders, prepend messages with **which package** owns the Canvas. Large binary directories should be **gitignored** from search indexing where supported so shader files surface first in queries.

---

## Day-in-the-life workflow (example)

1. Open feature branch — “hero lighting pass”
2. Message: “Read `.windsurfrules` and `src/components/canvas/scenes/Hero.jsx`. Propose lighting changes that keep draw calls ≤ 200.”
3. Apply diff hunks manually if post-processing is involved
4. Run staging build, verify on Safari + Android
5. Update `docs/3d/PERF_BUDGETS.md` if you approved new exceptions

---

## Starter prompt (paste at session open)

**Template** — Change the repo name and the final `Current task:` line every session.

```text
You are working in the Acme 3D web repo. Before coding:
1. Read `.windsurfrules` and `CLAUDE.md`.
2. Use JavaScript only.
3. Observe R3F rules: no per-frame React state; dispose manual textures.
4. If you touch shaders, state WebGL2 and precision choices explicitly.
5. End with a test plan (devices + metrics).
Current task: [describe]
```

Customize the name and task line — keep the numbered guardrails stable.

---

## FAQ-style sharp edges

**Q: Cascade suggests TypeScript despite our JS-only rule.**  
A: Put `JavaScript only — no TypeScript` in the first 10 lines of `.windsurfrules` and repeat once in the user message.

**Q: It keeps adding OrbitControls to every scene.**  
A: Add an explicit rule: “OrbitControls only in `DebugScene` or behind `import.meta.env.DEV`.”

**Q: Large glb files make search noisy.**  
A: Exclude `public/assets/3d/**` from workspace search where the editor allows; keep manifests in `src/`.

**Q: Two teammates use different rule sets.**  
A: Make repo files canonical; reject “works on my machine” editor-only rules for shared standards.

**Q: Cascade puts shadcn imports directly in Canvas components.**  
A: Enforce the boundary: `src/components/ui/` is DOM-only; `src/components/canvas/overlays/` bridges to 3D via Drei Html. Canvas scene files must not import from `ui/` directly.

---

## Pairing `.windsurfrules` with `CLAUDE.md`

| File | Primary reader | Update frequency |
|------|----------------|------------------|
| `.windsurfrules` | Cascade / Windsurf | When editor behavior drifts |
| `CLAUDE.md` | Claude Code + humans | Every sprint that touches 3D architecture |

Keep **one** source of truth for numbers (texture caps, draw calls). Either duplicate identically or reference: “Texture caps: see `CLAUDE.md` § Performance.” Stale duplicates are worse than a single paragraph.

---

## When to split rules out of `.windsurfrules`

Split when:

- The file exceeds ~600 lines of prose
- Multiple sub-teams (marketing site vs product configurator) share one repo
- You need **different** WebGL budgets per vertical

Use `docs/3d/rules-windsurf/` with numbered files and link them from the root rule file in order.

Treat the split like a book: **index** (`.windsurfrules`) + **chapters** (`docs/…`) so Cascade always has a table of contents.

---

## AI notes

Windsurf and Cursor will diverge over time — **diff `.windsurfrules` against `.cursor/rules`** quarterly when both are used. Treat `CLAUDE.md` as the **shared source of truth** and keep editor rules as thin enforcement layers.

---

## Tao moment

> *Two editors, one standard: the standard is not the tool. Write it in the repo, and every cascade returns to the same sea-level.*

---

## Related

- [AI-Assisted 3D Development — The Copilot Era](../index.md)
- [Cursor Rules for 3D Projects](../cursor-rules/)
- [Claude Workflows for 3D Web](../claude-workflows/)
- [Corpus to Boilerplate — Master Prompt File](../corpus-to-boilerplate/)
- [MCP Preflight for the 3D Stack](../mcp-preflight/)
