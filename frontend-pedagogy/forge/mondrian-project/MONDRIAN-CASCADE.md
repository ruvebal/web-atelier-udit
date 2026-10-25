<!--
Mondrian Project — technical-director face. Orchestrator for PHASE-M0…M9.
Author: Rubén Vega Balbás, PhD · 25 October 2026
Pattern: ~/src/.cursor/skills/cascade-forge/SKILL.md (INDEX + orchestrator + phase files + cold review + report).
This pack is authored in web-atelier-udit/frontend-pedagogy/forge/mondrian-project/ and MOVES into the product
repository at M1 (docs/DEV_PLAN/MONDRIAN/). After M1 the copy in the product repo is canonical; this folder keeps
PITCH.md, the rationale, and a pointer.
-->

# Mondrian Project — cascade (M0–M9)

**Status:** ACTIVE. Run phases **in order**, except the two parallel lanes named in §2. Each `PHASE-Mn.md` is a self-contained paste prompt. Decisions are not taken in chat: they are taken in **M0 (preflight)** against the proposals in §1, and amended later only through the closing protocol (§5).

**Product definition:** [`MVP-PRODUCT-SPEC.md`](MVP-PRODUCT-SPEC.md).
**Product/why:** [`MONDRIAN-RATIONALE.md`](MONDRIAN-RATIONALE.md).
**Origin:** [`PITCH.md`](PITCH.md) (22 Oct 2026), amended by §7 below.

---

## 1. Preflight decisions (proposed here, ratified in M0)

Each row is an ADR in one line. M0 flips `proposed` to `ratified` or `rejected` with one sentence of evidence, and amends every downstream phase that assumed otherwise.

| ID | Decision | Proposal | Why this and not the alternative | Reverses if |
| --- | --- | --- | --- | --- |
| **D-01 Repository** | One cohort monorepo, public, `ruvebal/mondrian-project`, local clone at `~/projects/ruvebal/scholar/udit/courses-repos/mondrian-project/`; students as collaborators; protected `main`. | Supersedes pitch §9 "one repo per student". The product is the cohort's (Strand B shape); individual authorship is kept legible by `packages/works/<slug>/` (one measured work per student), `docs/plans/<handle>/`, `CODEOWNERS`, commit history. | The department requires individually submitted repositories → fall back to forks + upstream PRs, same layout. |
| **D-02 Generator** | **Astro 6**, static output, deployed to GitHub Pages by `withastro/action@v6` (Node 24, pnpm). No client UI framework. | Supersedes pitch §9 Jekyll. The monorepo already requires Node, so "no Node" is gone; content collections give `validate(work)` at build time from the same JSON Schema the Python side uses; Ruby/Jekyll-3 setup risk (pitch risk 33) disappears; the cohort meets Astro again in FE II (TTOD Oracle). Astro `.astro` templates are HTML with expressions — closer to the "layout + includes + front matter" the pitch wanted than Liquid, and they ship zero JS. | The department reads "Astro" as a framework forbidden in semester 1 → Jekyll per pitch §9 with the `github-pages` gem; the schema/validator work (M2) is unaffected. |
| **D-03 Routing** | MPA. No SPA router, no `#` router. State lives in the URL query (`?theta=`, `?frame=`). Cross-document view transitions as enhancement only. | A hash router is a solution to a problem Astro's file routing does not have; it would also break the "every state is a URL" rule the kiosk QR depends on. | Never for this product. |
| **D-04 Packages** | `pnpm` workspace (≥ 10; 12 acceptable) for JS; **`uv` workspace** for Python, Python pinned **3.12**. pnpm 12's experimental Python support is *not* relied on. | Two mature tools, one each; TensorFlow has no 3.14 wheels (instructor machine is 3.14 today). | pnpm's Python support leaves experimental and the team wants one installer → revisit, do not block. |
| **D-05 Schema** | One `work.schema.json` (JSON Schema 2020-12) in `packages/works/schema/`; JS validator hand-written in vanilla ESM (teaching), Astro content collection schema mirrors it (zod), Python mirrors it (pydantic). Conformance fixtures (valid + broken) run against all three in CI. | One contract, three validators, one fixture set: the test that catches drift is the test the lanes share. | Never; this is the spine. |
| **D-06 Framework ladder** | Bootstrap, Tailwind, Vite are **not** evidenced by the semester-1 integrator. GSAP stays as S11. Communicated to the department in the M0 letter. | Pitch §2 found no semester-1 session teaches them; pretending the integrator covers them would be the dishonest option. | The department wants them → add as session exercises, not into this product. |
| **D-07 Hue** | Hue rotation in **CSS relative colour syntax** on chromatic roles; JS writes `--theta` and computes Δ for captions. HSL, not OKLCH, for the integrator; OKLCH as a named comparison. | Pitch §7 formula, moved to where it belongs; one custom property makes the editor and attract loop trivially animatable (`@property`). | Relative colour syntax unavailable on a target device → JS fallback, same formula (M3 keeps it). |
| **D-08 Renderers** | **CSS Grid is the visible editor**, SVG is the canonical vector export/reference, and canvas is used only transiently for PNG. FastAPI emits an HTML/CSS preview with the same semantic contract. | The grid is the pedagogical reason the project exists; canvas would hide CSS from the students. | — |
| **D-09 API** | **FastAPI**, REST: validated JSON plus a self-contained HTML/CSS preview. It is a development/analysis service, never an MVP runtime dependency of the public site or kiosk. | A static/offline exhibition must survive the LAN service being absent; the preview endpoint still makes the Python lane participate in the web artefact. | A later camera-analysis iteration may call `/analyze`; that is not MVP. |
| **D-10 Kiosk** | One codebase, two interaction profiles (rationale §6); profile by `display-mode`/`pointer`/`hover` media features and the `/kiosk/` entry; PWA with offline cache and wake lock; device lockdown is a runbook, not code. | Kiosk ≠ fullscreen; the handheld is a second, equal surface bridged by QR. | — |
| **D-11 Licences** | Code **MIT** (`LICENSE-CODE`); content — works data, measurements, texts — **CC BY-NC-SA 4.0** (`LICENSE-CONTENT`). Same pattern as TTOD and hc-app-design. | Dataset reuse in DH wants a clear content licence separate from code. | — |
| **D-12 Corpus** | Three instructor-measured reference works first (square-ish, vertical, horizontal), then one per student. Lozenge, coloured-line, *Boogie Woogie*, multi-grey works excluded (pitch §5). Rights checked per work, EU **and** US. | Pitch §13 unchanged; the US check is new because Pages is US-hosted. | — |
| **D-13 Plans** | Plans at `docs/plans/<handle>/planN.md`; AI declaration at `docs/declarations/<handle>.md`. Astro publishes only `src/pages/`, so the Jekyll "stray Markdown" problem is gone, and the pitch's `plans/`-vs-`docs/` argument is moot. | Monorepo needs per-person namespacing; `docs/` is where the cascade also lives. | — |
| **D-14 Ethics/institution** | No new dictamen for the stated scope (committee position, 22 Oct). Communicate in advance to department/degree coordination and ECSIT IP using the private draft adapted from TTOD; provide separate FE I information/acceptance before research use. | Same innovación docente line as TTOD; teaching and research participation remain separable. | The committee asks for a dictamen or the design expands → research use pauses, teaching continues (pitch §3). |
| **D-15 Nomenclature** | The corpus is Mondrian / Neoplasticism. “Texture” is acceptable interaction language; public attribution says “composition” or “texture after Mondrian”. “Kandinsky” is not used for these orthogonal works. | Kandinsky and Mondrian are different artists and programmes; conflating them would make the premise false. | Kandinsky becomes a later, separately modelled corpus. |
| **D-16 Surface and state** | Separate immutable `Work` from `SurfaceSpec` and normalized `CompositionState`; serialize `Recipe { surface, compositionState }` (`MVP-PRODUCT-SPEC.md` §3). A4 is first; A3/A5/Letter and common digital ratios follow. | Print size, inner frame and source canvas are different coordinate systems. Omitting any one makes save/print/QR irreproducible. | Never; this is the interaction spine. |
| **D-17 Export and print** | Save URL + SVG + PNG; SVG is canonical. Browser print uses physical units, `@page`, 100% guidance and a 100 mm calibration page. No account or server save. | Vector output preserves the grid; browser/printer scaling cannot be called accurate without calibration. | A later print service may replace browser print, outside MVP. |
| **D-18 Story motion** | No Framer Motion and no `motion` dependency. CSS scroll-driven animation is enhancement; `IntersectionObserver` is fallback; reduced-motion/no-JS is complete and static. | Framer Motion is React-specific and the platform already covers the story. | Only if a tested accessibility requirement cannot be met with platform APIs. |
| **D-19 Contribution governance** | Short-lived parseable branches, student-owned conflict resolution, same-branch amend loop, exact `Ready for re-review`, no renaming an open-PR branch, one cross-lane human approval. Local Ollama may comment; it never approves or merges. | Integrates the TTOD cohort's concrete Git feedback before M1 freezes the contribution contract. | Department policy requires a different merge model. |
| **D-20 AI-critical operation** | The shared rubric remains summative; assisted PRs accumulate ACCEPT/REJECT and human-vs-assistant verification evidence through [`AI-CRITICAL-OPERATING-ADDENDUM.md`](AI-CRITICAL-OPERATING-ADDENDUM.md). | Avoids making M9 the first time Critique and Verify become visible; separates product quality from control of assistance. | The shared institutional rubric changes. |

**Decision status (25 Oct 2026):** D-01 … D-20 all `proposed`. M0 replaces this line with one `ratified` / `rejected` / `BLOCKED` entry per ID, each with its evidence pointer into `PHASE-M0-REPORT.md`.

---

## 2. Programme (do not invert)

| Step | File | Deliverable | Gate (first word is the status token) |
| --- | --- | --- | --- |
| 0 | [PHASE-M0.md](PHASE-M0.md) | D-01…D-20 decided; Ahmes→Athanor grounding receipt; toolchain probes; private institutional communications; reference works + rights | READY — every D-row decided, grounding anchors recorded, probes have exit codes, downstream assumptions amended |
| 1 | [PHASE-M1.md](PHASE-M1.md) | Repository from `git init`: monorepo, Astro/CI/Pages, full Git/PR contribution contract, local review tooling, licences, cascade move | BLOCKED — Pages 200; JS/Python checks green; protected main; branch/amend/conflict/AI-log contracts tested; local review is comments-only |
| 2 | [PHASE-M2.md](PHASE-M2.md) | `Work`, `SurfaceSpec`, `CompositionState`, `Recipe`; matrix/state core; measured reference; conformance | BLOCKED — validators agree; complete recipe round-trips; original frame is maximal and bounded; area shares sum to 1 ± 1e-9 |
| 3 | [PHASE-M3.md](PHASE-M3.md) | Product shell: start, gallery, About scroll story, About Us, method; CSS Grid reference renderer | BLOCKED — no-JS/reduced-motion About is complete; gallery/reference frame pass fit, a11y and base-path tests |
| 4 | [PHASE-M4.md](PHASE-M4.md) | Classical analyzer: image → `work.yml`, including relative line weights; evaluation; TensorFlow only as extension | BLOCKED — output validates; boundary/line-weight/role errors reported; no neural score in MVP |
| 5 | [PHASE-M5.md](PHASE-M5.md) | FastAPI analysis service: JSON, HTML/CSS preview, `/analyze`; semantic snapshot against Astro | BLOCKED — cells/roles/tracks/custom properties equal Astro; public build has no API dependency |
| 6 | [PHASE-M6.md](PHASE-M6.md) | MVP editor: print/digital surfaces, bounded frame, transformations, undo/reset/compare, URL, SVG/PNG, print/calibration | BLOCKED — seven-step MVP journey (§ product spec 9) passes; SVG validates; calibrated A4 printer run recorded |
| 7 | [PHASE-M7.md](PHASE-M7.md) | Kiosk + PWA: offline, wake, attract/idle, QR state handoff, real touch-device run | BLOCKED — offline reload; idle reset; QR recovers identical state on phone; device/date recorded |
| 8 | [PHASE-M8.md](PHASE-M8.md) | **Parallel lane from M2:** two remaining references + one measured work per student, `MEASUREMENT.md` each, rights rows, peer-reviewed PRs | BLOCKED — total = cohort size + 3 references (10 for the current cohort), valid in all validators; provenance/rights complete; every student PR has one cross-lane approval |
| 9 | [PHASE-M9.md](PHASE-M9.md) | Declaration, custody, defence, brief EN+ES, dataset, grounded synthesis and congress abstract | BLOCKED (M7 + M8) — shipped-product transcript exists; brief bilingual; pseudonymisation passes; synthesis cites evaluator-safe Ahmes nodes only |

**Parallel lanes.** M8 (corpus) runs from the moment M2 closes, alongside M3–M7, because measuring does not depend on rendering. M4–M5 (Python lane) may run alongside M3 and M6 once M2 is DONE, because the schema is frozen there. Everything else is strictly ordered. Only one phase per lane is IN_PROGRESS at a time.

**Calendar hooks (FE I 2026–27 session order, not dates):** M0–M1 before S9
(modules). M2 at S9. M3 across S10–S12 (linting and trends). GSAP remains an
S11 exercise but is not absorbed into this vanilla product. M6 recalls S5's
container queries. M7 follows S12. M8 is continuous. Defence is S13.

---

## 3. Master paste (start / resume)

```text
Implement the Mondrian Project cascade per docs/DEV_PLAN/MONDRIAN/MONDRIAN-CASCADE.md
(before M1 completes: frontend-pedagogy/forge/mondrian-project/MONDRIAN-CASCADE.md in web-atelier-udit).

## Context
- Product/why: MONDRIAN-RATIONALE.md. Origin: PITCH.md (amended by cascade §7).
- Product contract: MVP-PRODUCT-SPEC.md. It wins if an older game description differs.
- Evidence: INDEX.md "Live snapshot" + PHASE-M0-REPORT.md once it exists.
- Skills to read, read-only: ~/src/.cursor/skills/cascade-forge/SKILL.md;
  frontend-pedagogy/AI-EVIDENCE-HARNESS.md for any citation that reaches a public page.
- Out of scope: the student-facing brief (M9 schedules it; nobody writes it earlier); React or any
  client UI framework; a database; user accounts; museum photographs in the repository; live camera
  analysis; a neural quality/authenticity score; public visitor galleries; changing web-atelier-udit
  lesson pages; naming private LAN hosts in institutional text.

## Programme
Execute the next incomplete phase only, in order M0 → M9, honouring the two parallel lanes in §2.
After each phase: VERIFYING (full suite of every touched package) → cold subprocess review →
PHASE-Mn-COLD-REVIEW.md → triage/amend → PHASE-Mn-REPORT.md. Do not start M(n+1) until Mn is DONE.
The implementer must not self-certify DONE.

## Hard constraints
- No cloud AI SDKs anywhere (openai, anthropic, langchain_openai are forbidden imports); local inference only.
- Numbers come from a named measurement or from the analyzer with provenance. No invented proportions,
  not even in fixtures: the "broken" fixture is the valid fixture with one bound corrupted.
- work.schema.json is the single contract; zod and pydantic mirror it; a change to any of the three is a
  change to all three plus the fixtures, in one PR.
- CSS does the colour; JS writes --theta. Non-colours never rotate.
- `work.yml` is immutable. Visitor edits live in `CompositionState`; portable
  URLs/exports contain the complete `Recipe`, including `SurfaceSpec`.
- The editor is semantic HTML + CSS Grid. SVG is export/reference, canvas PNG-only.
- Palette inversion is explicit and reversible; never browser `filter: invert()`.
- A frame cannot leave its printable area; print accuracy is claimed only after calibration.
- Every href/src goes through Astro's base-aware helpers; the Pages URL, not localhost, is the acceptance surface.
- No photographs or scans of paintings committed or hotlinked.
- Public site never depends on the LAN API.
- AI Review Logs distinguish human checks from assistant-run checks; assistants
  may comment but never approve or merge.
- Students resolve their own branch conflicts; do not hide Git learning by
  silently repairing their branches.
- Do not commit unless the human asks; never force-push main.
```

---

## 4. Layer map

| Layer | Store / artefact | Written by | Read by |
| --- | --- | --- | --- |
| **L0 Contract** | `packages/works/schema/work.schema.json`, `packages/matrix/schema/{surface,state}.schema.json`, fixtures | M2 only (later changes via amend) | Everything |
| **L1 Corpus** | `packages/works/works/<slug>/work.yml`, `MEASUREMENT.md`, `rights` block | M2 (reference 1), M8 (references 2–3 + student works), M4 (analyzer proposals, `method: analyzer`) | Astro collection (M3, M6), API (M5), analyzer evaluation (M4) |
| **L2 Matrix/state core** | `packages/matrix/src/{validate,derive,render-grid,state,hue,export-svg,export-png,print}.js` | M2/M6 | M3, M6, M7; M5 semantic snapshot |
| **L3 Site** | `services/web` (Astro) → `dist/` → GitHub Pages | M1 skeleton, M3, M6, M7, M9 | Visitors, kiosk |
| **L4 Analyzer** | `packages/analyzer` (Python), `evaluation/REPORT.md` | M4 | M5, M8 (as a measuring aid), research |
| **L5 API** | `services/api` (FastAPI) on LAN host | M5 | Developers, analyzer clients, semantic conformance tests; never the public/kiosk runtime |
| **L6 Process** | `docs/plans/<handle>/`, `docs/declarations/`, `docs/DEV_PLAN/MONDRIAN/`, custody file (outside git) | Every phase; M9 | Defence, research (after pseudonymisation) |

A phase that writes to a layer it is not listed for is out of order. L0 changes after M2 go through amend-on-surprise and touch L1 fixtures and L2/L5 validators in the same PR.

---

## 5. Closing protocol

`BLOCKED → READY → IN_PROGRESS → VERIFYING → COLD_REVIEW → DONE` (with `PARTIAL` allowed in reports for long lanes M4 and M8).

- **VERIFYING** means: the phase's own tests *and* `pnpm -r test`, `pnpm -r build`, `uv run pytest` across the repo are green; every touched module imports; Astro builds with zero warnings.
- **Cold review**: a fresh session (Cursor Task `generalPurpose`, or the studio `cascade-cold-reviewer` subagent) that did not implement the phase, receiving only the runbook Acceptance, the diff, the suite transcript and §3's hard constraints. Output `PHASE-Mn-COLD-REVIEW.md` with `Fn` findings (severity, blocks DONE?, evidence, fix). Zero findings is still a filed document.
- **Amend on surprise**: if a finding invalidates a downstream assumption (e.g. relative colour syntax missing on the kiosk device, Astro base-path behaviour, TensorFlow wheel availability), amend this orchestrator and every downstream `PHASE-M*.md` in the **same commit** as the report, and write "cascade amended: <paths>" in the report.
- **Report**: `PHASE-Mn-REPORT.md`, status first, commands with exit codes, no hedge words.

## 6. Resume rule (one branch per status)

- **DONE** → skip to the next pending phase in the same lane.
- **PARTIAL** (M4 evaluation incomplete, M8 fewer works than students) → finish the listed remainder before advancing that lane; other lanes may continue.
- **IN_PROGRESS** → do not restart. If a long job is running (analyzer evaluation sweep, Lighthouse CI), wait or check its checkpoint; do not advance past it in the same lane. Independent lanes (M8 vs M3–M7) may proceed.
- **VERIFYING** → run the full suites named in §5, then hand off to cold review. Do not open the next phase.
- **COLD_REVIEW** → wait for `PHASE-Mn-COLD-REVIEW.md`; triage; fix blocking findings (back to IN_PROGRESS) or defer with a decision record; file the report; flip to DONE.
- **BLOCKED** → resolve the named blocker (a D-row not ratified, a letter unanswered, a device unavailable). Teaching work that does not depend on the blocker continues; research use never does.
- **READY** → open the phase: paste `PHASE-Mn.md` into a fresh session.

---

## 7. Amendments to PITCH.md (recorded, not edited into the pitch)

The pitch stays as the 22 Oct record. The cascade changes these points; the pitch's header now points here.

| Pitch § | Was | Now | Reason |
| --- | --- | --- | --- |
| §4 item 6, §9 Process notes, §12 | `plans/` excluded from Jekyll | `docs/plans/<handle>/` in the monorepo | D-13 |
| §9 Generator, §10 Scaffold | Jekyll via `github-pages` gem, Liquid, `_data`, `_includes` | Astro 6 static, content collections, `.astro` layouts/components | D-02 |
| §9 Painting logic | Vanilla ES modules, no bundler | Vanilla ES modules in `packages/matrix`, bundled by Astro's Vite at build; students still write plain modules | D-02 |
| §7 Hue | JS computes `hsl()` fills | CSS relative colour syntax; JS writes `--theta` | D-07 |
| §8 Responsive | SVG-only study | CSS Grid editor inside a physical/digital surface; SVG is reference/export | D-08, D-16 |
| §9 Tests | Browser-console assertion page | Vitest in `packages/matrix`, pytest in Python, Playwright in `services/web`, three-way conformance | D-05 |
| §14 risk 44 | "One repository per student" | Cohort monorepo with authorship kept legible | D-01 |
| §15 item 2 (Jekyll slot) | Open | Closed: Astro components are taught inside M1/M3 by the starter; no Liquid | D-02 |
| §2 last row | Jekyll gap | Astro gap — smaller (HTML-with-expressions), still not in any S1–S13 session; starter carries it | D-02 |
| §4 / §11 game | Hue slider and “find the frame” | Full editor in `MVP-PRODUCT-SPEC.md`: surfaces, bounded frame, palette/reflection/offset/line weight, save and calibrated print | D-16, D-17 |
| — | No motion decision | No Framer Motion; CSS scroll timelines + `IntersectionObserver` fallback | D-18 |

Everything else in the pitch — the matrix (§6), the hue formula (§7), the frame-fit CSS (§8), the art-historical contract (§5), the exclusions, the rights checklist (§13), the risk register (§14) — stands and is referenced, not repeated.

---

## 8. Target repository layout (what M1 creates)

```text
mondrian-project/
├── AGENTS.md                       # agent contract (studio format); CLAUDE.md redirects here
├── README.md                       # index: what, live URL, How to contribute, lanes, licences, declaration
├── CONTRIBUTING.md                 # lanes, branches, PR template rules, measurement checklist
├── CODEOWNERS
├── LICENSE-CODE  LICENSE-CONTENT
├── pnpm-workspace.yaml  package.json  .npmrc
├── pyproject.toml                  # uv workspace root; requires-python = "==3.12.*"
├── .python-version                 # 3.12
├── .github/
│   ├── workflows/{ci.yml, deploy-pages.yml}
│   ├── CODEOWNERS → ../CODEOWNERS
│   ├── PULL_REQUEST_TEMPLATE.md    # plan link · declaration delta · measurement source
│   └── ISSUE_TEMPLATE/{task.yml, measurement.yml, bug.yml}
├── packages/
│   ├── works/                      # L0 + L1: data/schema plus python/ installable shared validator
│   ├── matrix/                     # L2: vanilla ESM + vitest
│   └── analyzer/                   # L4: Python (uv member), CLI `mondrian-analyzer`, evaluation/
├── services/
│   ├── web/                        # L3: Astro 6 — src/{pages,layouts,components,styles}, content.config.ts
│   └── api/                        # L5: FastAPI (uv member), templates/, tests/
├── docs/
│   ├── DEV_PLAN/MONDRIAN/          # this cascade, moved here at M1
│   ├── plans/<handle>/             # D-13
│   ├── declarations/<handle>.md
│   ├── research/                   # notices, abstract drafts, pseudonymisation protocol (no data)
│   └── runbooks/{kiosk-device.md, lan-api.md}
└── scripts/                        # conformance.sh, pseudonymise.py, qr.py
```
