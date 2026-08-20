<!-- executable · FE II unit forge · Wave 4 (final FE II wave) · paste this file as the agent prompt -->

# EXECUTE — FE II Wave 4 (Units 1, 7)

**Contract (do not rewrite):** [`../fe-unit-forge.mdc`](../fe-unit-forge.mdc)
**Matrix (authoritative):** [`../grounding/README.mdc`](../grounding/README.mdc)
**Precedent, same shape:** [`FE-II-WAVE-3.execute.md`](./FE-II-WAVE-3.execute.md) / [`FE-II-WAVE-3.execution.receipt.md`](./FE-II-WAVE-3.execution.receipt.md)
**Readiness note (`../TEACHING-READINESS.mdc` §3, Wave 4):** kickoff last — it must promise what the other eleven deliver; Unit 7 already has its ethics section, needs lab + exercises.

**Session-start finding, correcting the readiness note's own vintage:** both units are further along than the 2026-08-11 audit suggests. Unit 1 (146 lines at that audit) already carries Learning Objectives, the systems-lens reframe, the 12-unit arc table, and an FE I boundary section — but zero labelled code, zero lab, zero exercises, and one epigraph with **no TTOD ID at all** (same defect class Wave 3 found and fixed on Unit 10). Unit 7 (329 lines) already carries a full "Scholarly honesty" UNESCO-grounded ethics section, live citations (Fisseler, Correa, Batista, ACM/IEEE, UNESCO), and unlabelled code excerpts — but a 6-step "Practice Exercise" is neither a labelled team lab nor an individual exercise set, and **both** of its epigraphs have no TTOD ID.

**Live re-verification at session start (not trusted from the matrix or the published pages without re-checking):**

- **Unit 1** — matrix names Liu `dc2bd27d` ("scaffolding vs offloading framing... cite Liu's central question. No technical claims to ground"). `ahmes status` on all three library duplicates of this coat (`s40594_025_00592_w_dc2bd27d`, `liu_fan_pan_..._dc2bd27d`, `tool_tutor_or_crutch_..._dc2bd27d`) shows **`Citation preview: [BIBLIO-GAP]`, reason "missing year"** on every one, despite prior online metadata cascades already run (log shows repeated `enrich_meta` online passes, including `force-meta`). A live `ahmes enrich --meta --online` attempt this session on the most complete duplicate (correct author parse: "Liu, Dandan") enriched **0 nodes** — genuine, not pipeline lag. `ahmes query --cite --require-evaluator-safe` on the Motivation node (`25fa0a93-6808-5ccd-acc7-54b67523897e`, page_index 0) confirms **evaluator_safe=no, exit 2**. Unit 1 must therefore quote this node **with the gap visible**, not as a confident `(Liu YEAR, p.)` citation — note this is **stricter** than how the already-receipted Wave 1 used the same coat in Units 11/12 (no evaluator-safe check is recorded in that receipt); that is Wave 1's standing gap, out of this wave's scope to fix, not repeated here.
- **Unit 7** — two genuine upgrades found this session, neither assumed from the matrix text:
  - **Mahoney et al. (2025), "The growing environmental impact of COP websites"** (`03bab1df`, PLOS Climate, DOI `10.1371/journal.pclm.0000767`) — the matrix's own row 7 flagged this as "`[BIBLIO-GAP]` until host-title fix." Live `ahmes status` now shows **`evaluator_safe: yes`, confidence 0.95, source=metadata, crossref, `host_registry_match: true`** — a genuine pipeline-lag closure, not forced this session (enrichment already completed in an earlier session's log; today's check only re-confirmed it). `ahmes query --cite --require-evaluator-safe` on both the abstract node (`0e9f7882…`, p.1) and the intro node (`313c5e50…`, p.2) resolve live: `(Mahoney 2025, 1)` / `(Mahoney 2025, 2)`, both evaluator_safe=yes. This is the **first real empirical (not merely normative) source in this course quantifying a web-page-weight-to-carbon relationship** — the abstract itself states a real-world dataset (all COP1–COP30 host websites via the Wayback Machine) with concrete, unflattering figures (average emissions "+13,000%", per-pageview CO₂e roughly 10× the global average, homepage views rising from 0.14 kg CO₂e at COP3/1997 to 116.85 kg CO₂e at COP29/2024, attributed to "richer media content and scripts"). This closes part of the matrix's own standing gap ("no vault source quantifying the carbon effect of front-end engineering choices") — **narrowly**: it quantifies page-weight-to-emissions for one dataset of institutional websites, not a general web-industry or FE-pedagogy causal claim. State that boundary explicitly when using it.
  - Both of Unit 7's existing epigraphs (opening: *"Performance is not an optimization target. It's a baseline expectation."*; closing: *"Fast is a feature. Slow is a bug."*) **do not exist in `ttod.yml`** (`grep` returned nothing for either string) — same defect class as Wave 3's Unit 10 finding. Replace, do not re-attribute.

Execute Unit 1 first, then Unit 7 (readiness note's own suggested order — Unit 7 needs less new material).

---

# FORGE FE UNIT — FE II Unit 1: Kickoff — From FE I React to Production Architecture

## INPUT

- COURSE: FE II
- UNIT: 1 of 12
- CONTENIDOS anchor: — (orientation session, no CONTENIDOS anchor; matrix row 1 confirms "No technical claims to ground")
- HOURS: magistral 1 · lab 0 · ejercicios 2 (already present in `tracks.yml`, verified not retuned — see STEP C)
- ARTEFACT ROLE: orientation only — no shared-repo artefact this unit
- COHORT: continuing · n ≈ (leave blank if unknown, per prior waves)

## STEP A — GROUND BEFORE WRITING

Matrix row 1: Liu `dc2bd27d` central-question framing, **confirmed `[BIBLIO-GAP]` live this session** (see header). Quote the Motivation node with the gap visible: the tension between AI-assisted "performance" (speed, accuracy, affect) and "learning" (durable, transferable understanding) is the frame for the whole course's AI-declaration discipline, not a proven finding about this specific course. No technical claims to ground — Unit 1 is pure orientation, per the matrix's own instruction ("frame the year… no technical claims").

TTOD: existing opening epigraph has no ID and does not exist in `ttod.yml` — replaced with **`wis-014`** (*"Before the first line of code, prepare the forge. Before the first query, load the memory. Documentation is not an afterthought — it is the first act of architecture."*) — **direct fit**: a kickoff/orientation unit is literally the "prepare the forge" moment before the 12-unit arc begins. Selected via `TTODCliAdapter.search_quotes(theme="build")`, confirmed unused elsewhere in this repo via `grep` before selection.

## STEP B — EMIT THREE ARTEFACTS

### B1 · Lección magistral (1 h) — already substantially present, keep, add the gap-visible Liu framing and the epigraph swap

No rewrite of the existing systems-lens / 12-unit-arc / FE I boundary sections — they are accurate and current. Add: (a) the Liu gap-visible paragraph as a new short section framing *why* the course opens with an AI-declaration discipline rather than assuming AI-assisted "speed" is "learning"; (b) the `wis-014` epigraph swap; (c) explicit statement that this orientation session has **no CONTENIDOS anchor and no technical claim to ground** — it is a promise about what Units 2–12 will each substantiate on their own evidence, not a technical unit itself.

### B2 · Prácticas de laboratorio (0 h) — orientation only, no team lab this unit

State explicitly why: 0 lab hours is the official allocation (already in `tracks.yml`), and a lab needs a real repo artefact to work from — none exists yet at kickoff. Do not invent a lab to fill the section; state the absence as content, same discipline as declaring a citation gap.

### B3 · Resolución de ejercicios (2 h) — individual, decontextualised

3 short problems, isolating the reframe from technical content (no CONTENIDOS anchor to drill yet):
1. **Diagnostic.** Given a short FE I-style project description (single React app, one deploy target), identify which specific claims in it would need to change to describe an FE II "system of interfaces," and which would not.
2. Given Liu's Motivation-node tension (performance vs. learning, quoted gap-visible in B1), write two sentences distinguishing what an AI tool speeding up *your* task proves and does not prove about what you understand — solvable **without AI**, declared as such.
3. Read the 12-unit table and, without looking ahead, predict in one sentence each what Units 2 and 8 will need from Unit 1's "systems lens" — a self-check the professor can compare against the actual units once submitted, not a graded content question.

Professor expected-answer sketch: kept in `exercises.md`, not the student-facing page.

## STEP C — WIRE IT

`tracks.yml` `feii` → `unit-1-kickoff`: `labHours: 0`, `magistralHours: 1`, `ejerciciosHours: 2` **already present** — verify, do not retune (out of this wave's scope; FE II's total already sits at 10 mag / 30 lab / 16 ejercicios against the official 10/30/14, a **pre-existing** 2 h ejercicios overshoot flagged in Wave 3's receipt lineage, not created or fixed here).
`lessons.yml`: `feii-unit-1-kickoff` **already registered**, `status: draft` — matches file frontmatter after this wave sets it to `draft` (was `complete`, same correction pattern as Wave 3).
New sibling files: `unit-1-kickoff/{deck-outline.md,exercises.md}`.

## STEP D — VERIFY

- `cd web-foundations && npm run build 2>&1 | grep -i "liquid warning"` → must be empty (run once after both units, see wave-level STEP D below).
- Liu node re-confirmed `[BIBLIO-GAP]` this session, quoted gap-visible, not cited as `(Author Year)`.
- `wis-014` confirmed real in `ttod.yml` and unused elsewhere before this wave.
- Hour totals: no change (already present).

---

# FORGE FE UNIT — FE II Unit 7: Performance Engineering — Core Web Vitals & Optimization

## INPUT

- COURSE: FE II
- UNIT: 7 of 12
- CONTENIDOS anchor: Optimización de rendimiento
- HOURS: magistral 1 · lab 2 · ejercicios 2 (already present in `tracks.yml`, verified not retuned)
- ARTEFACT ROLE: performance-budget CI gate on the shared repo (lab deliverable)
- COHORT: continuing · n ≈ (leave blank if unknown)

## STEP A — GROUND BEFORE WRITING

Matrix row 7 (partial, pedagogy still unsupported): Phung `ea8cf54c` (optimisation-never-demanded framing — **note found this session: this coat is not actually cited anywhere in the published Unit 5 or Unit 7 text despite the matrix describing Unit 5 as grounded in it; flagged, not fixed here — out of this wave's two-unit scope**), UNESCO `381137eng` (normative, already correctly used), Mahoney `03bab1df` (**newly evaluator_safe=yes this session**, see header — add as the lab brief's empirical grounding for "why a budget, not just a score"). Declare, explicitly, that performance *pedagogy* (which teaching sequence best develops budget discipline) remains `[UNVERIFIED-GAP]` — Phung/Mahoney/UNESCO ground the *stakes* and *vocabulary*, never a validated teaching method; this is unchanged from the existing B1 text's own honest framing, extended rather than contradicted.

TTOD: both existing epigraphs have no ID and do not exist in `ttod.yml` (grep confirmed empty). Replace: opening → **`img-051`** (*"The student said: 'My images look beautiful!' The master checked the Network tab and said: 'Your users have left before seeing them.'"*) — direct fit (performance-as-baseline-not-vanity-metric is exactly this unit's opening claim). Closing → **`img-045`** (*"The master writes `<img srcset='...' sizes='...' />`. The novice writes `<img src='huge-image.jpg' />`. The user pays the price."*) — analogical (extended from responsive-images specifically to performance budgets generally; disclosed), chosen to land directly on the unit's own "who pays" framing already in the text. Both confirmed unused elsewhere via `grep` before selection. The existing mid-document `cc-007` epigraph (Performance Budgets section) is already a real, correctly-cited TTOD quote — kept as-is, not re-selected.

## STEP B — EMIT THREE ARTEFACTS (extend, do not rewrite B1)

### B1 · Lección magistral (1 h) — keep existing Core Web Vitals / bundle / asset / Scholarly-honesty sections intact

Add: the Mahoney (2025) empirical grounding as a new short subsection under "Why a budget, and not just a score" — real, unflattering figures (13,000%+ emissions growth, ~10× the global per-pageview average, 0.14 kg → 116.85 kg CO₂e per homepage view across COP3→COP29), explicitly scoped as *this dataset*, not a general front-end-to-carbon law. Swap both epigraphs per Step A. Existing unlabelled code excerpts (Lighthouse CLI, web-vitals RUM snippet, code-splitting, tree-shaking, image/font optimisation, critical CSS, budget.json) get code-block labels per `lesson-code-block-conventions.mdc` — all are `Excerpt` (partial patterns relying on surrounding app/build config), none is a complete runnable file; state this convention note near the first code block, per `CLAUDE.md`'s lesson-authoring policy.

### B2 · Prácticas de laboratorio (2 h) — NEW, team, on the shared repo

- **Issue:** pick up (or open, if none exists) a performance-budget issue on the shared repo's backlog — set `budget.json` limits for the repo's actual bundle, wire a CI step that fails the build over budget (`rollup-plugin-visualizer` stats or equivalent), and produce a before/after Lighthouse pair.
- **Definition of done:** CI budget check green or a documented, justified budget exception; PR reviewed by a human after AI review (Unit 6 workflow); before/after LCP/INP/CLS numbers recorded, including any that got *worse* (per `lesson-publishing-integrity.mdc` Rule 6, unflattering numbers are the honest and required kind).
- **Roles rotate:** bundle-analysis owner, CI-config owner, before/after-measurement owner — nobody owns the same layer twice from a prior lab.
- **Evidence emitted:** branch, PR, AI-review log rows, `budget.json` diff, before/after Lighthouse report.
- Existing `budget.json` / `vite.config` excerpts reused here, same `Excerpt` label.

### B3 · Resolución de ejercicios (2 h) — INDIVIDUAL, decontextualised, replaces the old 6-step "Practice Exercise"

3 short problems isolating the strategy from the lab's team deliverable:
1. **Diagnostic.** Given a Lighthouse report showing LCP 4.1 s and a 2.8 MB main bundle with three unused large dependencies listed, name the two highest-leverage fixes and justify the order — not "fix everything."
2. Given the Mahoney figures (B1), state in one paragraph what they license the student to claim in a capstone defence about *this repo's* performance choices, and what they do not — solvable **without AI**, declared as such (a scope-boundary exercise, not a research-retrieval one).
3. Given a `budget.json` with a limit and a build that exceeds it by 4 KB, write the one-sentence PR description that either fixes it or honestly justifies the exception — professor checks for honesty of framing, not a specific number.

Professor expected-answer sketch kept in `exercises.md`.

## STEP C — WIRE IT

`tracks.yml` `feii` → `unit-7-performance`: `labHours: 2`, `magistralHours: 1`, `ejerciciosHours: 2` **already present** — verify, do not retune.
`lessons.yml`: `feii-unit-7-performance` **already registered**, `status: draft` — matches frontmatter after this wave sets it (was `complete`).
New sibling files: `unit-7-performance/{deck-outline.md,exercises.md}`.

## STEP D — VERIFY

- Mahoney nodes re-confirmed evaluator_safe=yes live this session (both citations).
- Liu-class discipline: no `[BIBLIO-GAP]` coat forced into an `(Author Year)` form anywhere in this unit.
- Both epigraphs confirmed real in `ttod.yml`, unused elsewhere before this wave; `cc-007` re-confirmed real, unchanged.
- Code blocks labelled; convention note present near first code section.

---

## WAVE-LEVEL STEP D — VERIFY BEFORE CLAIMING DONE

```bash
cd web-foundations && npm run build 2>&1 | grep -i "liquid warning"   # must be empty
```

Read built HTML for both units: gap-visible Liu quote, Mahoney figures, and all code blocks survive intact. Confirm hour totals unchanged (FE II's own pre-existing 10/30/16 state, not 10/30/14 — a standing note, not this wave's defect to fix).

## OUTPUT CONTRACT

Unit 1 + Unit 7 lesson pages extended (not rewritten) · deck outlines + exercise-set sibling files for both · `tracks.yml` hour keys verified (not retuned) · `lessons.yml` verified (already registered) · build gate green · one-line missing-evidence statement per unit · explicit note that after this wave, all 12 FE II units carry first-pass lesson content for the first time in this cascade — **not** a claim that FE II is pedagogically complete or that hours close at 10/30/14.
