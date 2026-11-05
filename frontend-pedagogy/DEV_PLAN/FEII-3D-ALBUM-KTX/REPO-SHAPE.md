# Aggregator repo shape — `feii-album-covers`

Frozen 2026-11-04 (D6, D15, D21); **amended 2026-11-05 (D26)** — student-owned `Route.jsx` endpoints; shell owns discovery/routing/isolation only. This is L3 for the Units 8–9 assignment. It is **not** `corpus-to-boilerplate` and it is **not** a replacement of `react-template`.

## Answer: do not follow `index.md` as a create-repo prompt

`web-foundations/private/ai-assisted-3d/index.md` is an **instructor / prospector** module (`AUDIT-GROUNDED.md`). Its tooling stack (Stitch, 21st.dev, Nano Banana, MCP table, shadcn-as-default) is a demo-once layer. `corpus-to-boilerplate/index.md` is the master prompt that would emit SSR, i18n, Hygraph, p5-texture, splatting — **Entrega 2 is not that product**.

**Recycle from `index.md` / cursor-rules into the aggregator:**

| Take | Leave |
| --- | --- |
| Amplifier philosophy, human/model table, merge rubric | MCP table as student install list |
| Rules-first workflow | Stitch → shadcn → Canvas as graded path |
| Cursor rules 00, 20-r3f, 30-shaders, 40-asset-pipeline, 50-performance | `70-shadcn-ui` unless a student opts in |
| KTX2 / gltf-transform script ideas | corpus-to-boilerplate master prompt |
| DESIGN.md as optional taste file in `_studio` | Cloud image-gen for final textures |
| JSDoc, JavaScript, Vite, R3F, Drei | TypeScript, React Router SSR streaming |

Runnable stack comes from **`react-template` pins**, not from the 3D lesson corpus prompt.

## Product

One GitHub repository the instructor owns. Students do **not** each get a separate assignment repo. Each student (or team) owns a **complete endpoint** at `/covers/<slug>` — they control format (WebGL, DOM/CSS, shaders, audio, multi-scene, hybrid), Canvas, camera, interaction and visual language (D26). The instructor-owned shell supplies the gallery index, routing, a collapsed project selector, prev/next/all navigation, lazy loading, error isolation and production checks. Students never replace `App.jsx`.

| Path | Owner |
| --- | --- |
| `~/projects/ruvebal/scholar/udit/courses-repos/feii-album-covers` | local |
| `git@github.com:ruvebal/feii-album-covers.git` | GitHub; **public Pages** exhibition at `https://ruvebal.github.io/feii-album-covers/` (D6 amended 2026-11-05) |

`react-template` stays the Unit 8–9 **lesson sandbox** (beacon measurements). Students may practice there; they **hand in** a route on this aggregator.

## Tree

```
feii-album-covers/
  README.md
  CONTRIBUTING.md                 # TTOD ritual mapped to cover routes (D21)
  CODEOWNERS                      # _studio + src/ + scripts + .github = instructor
  .github/
    pull_request_template.md      # Phase V §5 checklist + Unit 6 AI Review Log
    workflows/lint-and-build.yml  # required check (JS analogue of TTOD typecheck-and-build)
  package.json                    # Vite + R3F pins = react-template
  vite.config.js
  src/
    main.jsx
    App.jsx                       # gallery + /covers/:slug shell — students do not replace this
    gallery/Home.jsx              # exhibition index (registry)
    gallery/*Selector*            # collapsed fixed project switcher (X14)
    lib/                          # optional shared helpers (ktx2, gpuBytes) — routes opt in
  covers/
    registry.json                 # slug, title, authors, concept, thumbnail, tags, readiness (+ album if kept)
    _studio/                      # instructor REFERENCE only (not prescribed composition)
      src/Route.jsx               # complete endpoint (owns its Canvas if any)
      docs/…
      public/
    _template/                    # neutral starters (DOM / WebGL / hybrid) — X15
      src/Route.jsx
      docs/…
      public/.gitkeep
    _fixture-*/                   # instructor fixtures proving format freedom (X14)
  scripts/encode-cover.mjs        # PNG → UASTC + ETC1S; fail loud if toktx missing
  .cursor/rules/                  # 00, 20, 30, 40, 50 only
```

Gallery loads `covers/registry.json` and `import.meta.glob('../covers/*/src/Route.jsx')`. A slug that is not in the registry has no route. Students add **one `Route.jsx` endpoint + one registry row**. They never rewrite `App.jsx`. The shell does **not** wrap student work in a shared Canvas or sleeve/record UI.

## Collaboration (TTOD contribution ritual — D21)

Cite, do not invent: [`ttod/docs/public/guides/contributing.md`](https://github.com/ruvebal/ttod/blob/main/docs/public/guides/contributing.md), [`reviewing-cohort-prs.md`](https://github.com/ruvebal/ttod/blob/main/docs/public/guides/reviewing-cohort-prs.md), Phase V §§3–5, TTOD `.github/pull_request_template.md`. Student-facing epigraph: TTOD `qa-007`.

### Map (TTOD seam → cover route)

| TTOD | This repo |
| --- | --- |
| Seam (`content`, `graph`, `oracle`, `pwa`, `accounts`) | Cover **slug** — the owned route `/covers/<slug>` |
| `git checkout -b <seam>-task<N>-<short-topic-name>` | `git checkout -b cover-<slug>-task<N>-<short-topic-name>` |
| Change only your module files | Change only `covers/<slug>/**` plus **one** `registry.json` object |
| Shared contract `domain.ts` | Instructor-owned `src/App.jsx` + registry schema — students never replace the router |
| `npm run check && npm run build` | `npm run lint && npm run build` (JavaScript + JSDoc; no `tsc`) |
| Required `typecheck-and-build` + ≥1 approving review | Required `lint-and-build` + ≥1 approving review |
| AI Review Log (Unit 6) | Same two-column table; a PR missing it is incomplete |
| Bot comments never approve or merge | Same. Optional local-Ollama first pass; no cloud `pr-review.yml` |
| Cross-module PR + formal review | ≥1 PR into **another** slug (or a shared a11y/gallery fix) and ≥1 formal review of a PR outside your slug |
| Quote-proposal two-touchpoint | **Do not copy** — that is `ttod.yml` governance |
| In-app `ASSIGNMENT.md` | **Do not invent.** Criteria live on the FE II assignment page |

### Opening a PR (student)

1. Branch from the current teaching baseline (`main`):  
   `git checkout -b cover-<slug>-task<N>-<short-topic-name>`  
   Examples: `cover-ok-computer-task1-mesh`, `cover-ok-computer-task2-shader`, `cover-ok-computer-task3-ktx2`. The `cover-<slug>-task<N>` prefix is the analogue of TTOD’s seam-task parser — keep it so a later local review bot can match the assignment bar.
2. Copy `covers/_template/` → `covers/<slug>/` once (task1), pick a neutral starter variant, and own the whole `Route.jsx` endpoint. Later tasks edit that folder only. `_studio` is a reference, not a clone target for aesthetics.
3. Staged tasks (small PRs defend better than one dump — TTOD teaching model):  
   - **task1** — endpoint lights; named album is recognisable in the chosen format (WebGL, DOM, hybrid, …).  
   - **task2** — one authored technique the team can explain (shader, interaction, motion, multi-scene, …) — not a paste of the Unit 9 bulb when shaders are used.  
   - **task3** — evidence pack: IP declaration; when textures/GPU are used, KTX2 choice + measurements; when not, honest N/A; `docs/ai-3d-merge-log.md` always.  
   - **task4** — cross-cover: a real fix in another slug **or** a formal review of someone else’s cover PR against the assignment bars (Phase V §3 items 2).
4. Before push: `npm run lint && npm run build`.
5. Open the PR. The repository template fills in: contract (own route + one registry row, no `App.jsx` rewrite), acceptance bars, lint/build, a11y, AI Review Log.
6. `lint-and-build` must pass and one human must approve. AI never merges.

`_studio` stays instructor. Do not edit another team’s `covers/<slug>/` except as the graded cross-cover PR.

### PR template (X9 copies this)

Mirror TTOD’s template; remap the contract line:

- What this PR does (one or two sentences; name the assignment bar).
- Contract: only `covers/<slug>/**` + one registry object; no `App.jsx` rewrite; registry schema unchanged.
- Acceptance: the specific bar this PR satisfies (task1/2/3/4).
- Checks: `npm run lint && npm run build` locally.
- A11y: keyboard gallery, accessible name, no colour-only cue, `prefers-reduced-motion`.
- AI Review Log (Unit 6, required):

  | What was AI-assisted | What I verified myself |
  | --- | --- |
  | | |

  **AI never approves or merges this PR — only comments. A human approves.**

### CI and protection (X9)

- Workflow `.github/workflows/lint-and-build.yml`: `pull_request` → `npm ci` → `npm run lint` → `npm run build`. No deploy job. No secrets.
- After `gh repo create`, attempt branch protection on `main`: no direct commits, required check `lint-and-build`, required ≥1 approving review, no force-push. If `gh api` 403: leave the workflow, report BLOCKED-on-protection only if create succeeded — still-success is workflow present.
- CODEOWNERS: `src/`, `scripts/`, `covers/_studio/`, `.github/`, `.cursor/` → instructor. Student `covers/<slug>/` is not instructor-owned.

### Instructor review (not student CONTRIBUTING)

Reuse TTOD `reviewing-cohort-prs.md`: one sibling worktree `../feii-album-covers-review` off `main`; `gh pr checkout` there; local Ollama may comment; humans `gh pr review --approve|--request-changes`; merge with `gh pr merge --squash`. Do **not** check student PRs out of the teaching clone. Do **not** port TTOD’s Anthropic `pr-review.yml`. Optional later: a local `make review-pr` — out of X9.

### Create

- Instructor: `gh repo create ruvebal/feii-album-covers --private --source . --remote origin --push` (X9).
- Students: collaborators (GitHub Classroom later — out of cascade scope).

## IP (D8)

- `_studio` ships original or PD/CC art only.
- Student routes: student-created artwork, public-domain material, a suitably open-licensed source, or written permission. Record creator, source, licence/permission, and attribution in `docs/ktx2-note.md`. Owning a physical album is not permission to republish its cover on public Pages; any claimed legal exception requires instructor review before publication.
