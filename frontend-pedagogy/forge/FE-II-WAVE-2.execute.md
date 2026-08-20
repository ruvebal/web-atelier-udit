<!-- executable · FE II unit forge · Wave 2 · paste this file as the agent prompt -->

# EXECUTE — FE II Wave 2 (Units 2, 3, 4)

**Repo:** `web-atelier-udit`
**Contract (do not rewrite):** [`../fe-unit-forge.mdc`](../fe-unit-forge.mdc)
**Matrix (authoritative):** [`../grounding/README.mdc`](../grounding/README.mdc)
**Publish rules:** [`.cursor/rules/lesson-publishing-integrity.mdc`](../../.cursor/rules/lesson-publishing-integrity.mdc)
**Reference standard:** Units 5 and 6 (`web-foundations/docs/lessons/en/feii/unit-5-testing-strategy/`, `unit-6-ai-code-review/`)
**Precedent, same shape, already receipted:** [`FE-II-WAVE-1.execute.md`](./FE-II-WAVE-1.execute.md) / [`FE-II-WAVE-1.execution.receipt.md`](./FE-II-WAVE-1.execution.receipt.md) — Wave 1's actual execution kept the existing essay bodies and **appended** B1/B2/B3 + provenance-gate sections at the foot of `index.md`, plus thin sibling `deck-outline.md` and `exercises.md` files. Wave 2 follows the same append shape, not a rewrite from zero.

This file is the filled master prompt. The `.mdc` is the procedure.

**Not this run:** FE I. Units 1, 7–10 (still scaffold; Wave 3/4). Reveal.js decks proper (forge wave 5 — the `deck-outline.md` sibling file is a speaker-claim list, not a built deck). Spanish FE II. Research-consent administration.

Execute **Unit 2 completely (A→D)**, then **Unit 3**, then **Unit 4**, each commit-ready before moving to the next.

---

# FORGE FE UNIT — FE II Unit 2: Astro Meta-Framework — Islands Architecture & SSR

## INPUT

- COURSE: FE II
- UNIT: 2 of 12
- CONTENIDOS anchor: Arquitecturas front-end (shared with Unit 3)
- HOURS: magistral **1** · lab **2** · ejercicios **2** — already present in `tracks.yml` (uncommitted patch predating this run closed the 10/30/14 defect broadly; verify, do not re-add).
- ARTEFACT ROLE: first architectural primitive for the Entrega 1 seed project — islands + SSR/SSG choice.
- COHORT: continuing · n < 15
- EXISTING PAGE (upgrade, do not fork): `web-foundations/docs/lessons/en/feii/unit-2-astro-fundamentals/index.md`
  Status says `complete`; readiness audit: essay, code blocks unlabelled, no lab brief, no exercise set, no declared-gap paragraph, no cited evidence, no TTOD id.
- tracks.yml slug: `unit-2-astro-fundamentals`

## STEP A — GROUND BEFORE WRITING

1. Matrix row **2–3** (`grounding/README.mdc`): **technique coats exist, HE pedagogy is NONE.** Do not promote islands/resumability technique papers into a pedagogy claim ("islands architecture teaches well") — they ground *what the primitive is*, never *why this sequence teaches it well*.
2. Ahmes nodes (resolved this session, `evaluator_safe=yes`, `ahmes query --cite … --require-evaluator-safe`):
   - Vepsäläinen (2025), *The Potential of Serverless Edge-powered Islands for Web Development*, `10.13052/jwe1540-9589.2411` · coat `68c7da35` · node `797a702c-0538-5577-adc4-c3450c511608` · p.3 · `(Vepsäläinen 2025, 3)` — islands architecture defined as deferred/avoided loading of dynamic portions of an otherwise static page.
3. Astro's own docs (`docs.astro.build`) remain a **platform note**, never `(Author Year)` — they ground the API surface (`client:load` etc.), not the architectural claim.
4. TTOD epigraph: `arch-004` — *"Dependencies flow inward like water seeking the center. Let nothing in the center know the shape of the shore."* (unused elsewhere in FE II; fits the static-ocean/island boundary).
5. Version pin: Astro version by search, dated, in the lesson (do not trust training-data memory).

## STEP B — APPEND THREE ARTEFACTS AT THE FOOT OF THE EXISTING PAGE

Keep the existing essay (content-first philosophy, islands diagram, project setup, React island integration, rendering strategies, reading list) — it is technically sound. Add, above the essay, a short **"Code conventions in this unit"** note (verbatim pattern from Unit 5) and label the existing setup/config/component blocks `Excerpt` (they rely on a scaffolded Astro project; none is a complete pasteable file) except the CLI scaffolding block, which may stay unlabelled shell.

### B1 · Lección magistral (1 h)
- One-sentence claim: the islands boundary — not the framework choice — is what changes performance and SEO characteristics.
- Position: FE I shipped one SPA paradigm (React, hydrate everything); Unit 2 adds a second (static-by-default, hydrate only islands); Unit 3 goes deeper into composition; Unit 4 goes offline.
- Cite Vepsäläinen 2025 node above for the islands definition; **declared-gap paragraph** in Unit 5's scholarly-honesty register: no vault source establishes that teaching islands architecture *produces* better learning outcomes for this cohort — the sources ground the technique, not the pedagogy.
- TTOD `arch-004` at the conceptual turn (static ocean / dynamic islands boundary).
- Speaker outline ≤ 12 claim-slides in `deck-outline.md`.

### B2 · Prácticas de laboratorio (2 h) — TEAM, shared repo
- Pick a real Entrega-1-backlog issue that needs an interactive island (e.g., a filter, a counter, a form) added to an otherwise static Astro page — not an invented greenfield exercise.
- DoD: PR with island using an explicit `client:*` directive and a stated reason for that directive; CI green; human review after any AI review (Unit 6 workflow, taught prospectively); release note.
- Roles rotate (facilitator/implementer/verifier/narrator, as Unit 11).
- Evidence: branch, PR, before/after Lighthouse or bundle-size delta, AI-review log row if AI was used.
- Code blocks: label `CodeSandbox-ready` / `Excerpt` / `Template` per the studio convention; wrap any fence containing `{{`/`${{` in `{% raw %}` (JSX-in-Astro is at risk here — check).

### B3 · Resolución de ejercicios (2 h) — INDIVIDUAL, decontextualised
3–5 short problems isolating *when to hydrate*, not the product:
- ≥1 diagnostic: given a page with `client:load` on a component that never becomes interactive, explain the wasted cost and fix the directive.
- ≥1 solvable without AI, declared: classify five hypothetical components by the correct `client:*` directive from a one-paragraph description each.
- Professor answer sketch: HTML comment or private note, not the student handout.

## STEP C — WIRE IT

- `tracks.yml` session `unit-2-astro-fundamentals`: hour keys already present (verify `magistralHours: 1`, `labHours: 2`, `ejerciciosHours: 2`); do not retune.
- `status: draft` until Step D passes.
- Sibling files: `deck-outline.md` (speaker claims only), `exercises.md` (pointer to B3, one no-AI exercise flagged).
- `lessons.yml` entry already exists — do not duplicate.

## STEP D — VERIFY

```bash
cd web-foundations && npm run build 2>&1 | grep -i "liquid warning"
```
Must be empty. Cited node resolves. One-line missing-evidence statement.

---

# FORGE FE UNIT — FE II Unit 3: Advanced Astro Architecture & Multi-Framework Integration

## INPUT

- COURSE: FE II
- UNIT: 3 of 12
- CONTENIDOS anchor: Arquitecturas front-end (continues Unit 2)
- HOURS: magistral **1** · lab **2** · ejercicios **2** — already present in `tracks.yml`.
- ARTEFACT ROLE: content collections + multi-framework composition for the Entrega 1 seed project.
- COHORT: continuing · n < 15
- EXISTING PAGE (upgrade, do not fork): `web-foundations/docs/lessons/en/feii/unit-3-astro-advanced/index.md`
- tracks.yml slug: `unit-3-astro-advanced`

## STEP A — GROUND BEFORE WRITING

1. Same matrix row as Unit 2 — technique-only, pedagogy NONE.
2. Ahmes nodes:
   - Vepsäläinen (2024), *Resumability — A New Primitive for Developing Web Applications*, `10.1109/ACCESS.2024.3352891` · coat `3d09df05` · node `6589254e-3a63-5095-9571-363afdb8040b` · p.2 · `(Vepsäläinen 2024, 2)` — resumability contrasted with hydration; islands architecture named explicitly as a partial optimization of hydration that "does not solve the fundamental issue… that resumability avoids by changing the axioms." Use this to teach the **limit** of what Unit 2's islands pattern buys you, and why multi-framework composition still pays a hydration cost per island.
3. Astro/Zod/content-collections docs remain platform notes.
4. TTOD epigraph: `arch-011` — *"The inner layer is the most reusable. The outer layer is the most disposable. Build value inward."* (fits: server-rendered content core reusable across frameworks; each framework's island is the disposable outer layer).
5. Version pin dated, as Unit 2.

## STEP B — APPEND THREE ARTEFACTS

Keep existing essay content (content collections, data-fetching patterns, multi-framework mixing, micro-frontend diagram, build targets). Add the same code-conventions note (or point back to Unit 2's if consecutive reading is assumed) and label blocks `Excerpt`/`Template` (the Zod schema and content-collection blocks are `Template` — placeholders the student must adapt to their own schema).

### B1 (1 h)
- Claim: composing multiple frameworks is only cheap because each island still pays its own hydration cost — resumability is the frontier that removes it, and this course teaches you to see the cost, not to adopt an unstable primitive prematurely.
- Cite Vepsäläinen 2024 node above. Declared-gap paragraph: no pedagogy source on teaching multi-framework composition or content-collection design; technique only.
- TTOD `arch-011`.
- Speaker outline in `deck-outline.md`.

### B2 (2 h) — TEAM
- Real backlog issue: add a content collection (or extend an existing one) and wire at least one additional framework island (Vue/Svelte) alongside the Unit 2 island, OR implement one edge/API data-fetching route the team's project actually needs.
- DoD: schema validated at build time (no silent Zod failures); CI green; human review after AI review; release note documenting which rendering strategy (SSG/SSR/hybrid) was chosen and why (narrate axis, Unit 11 vocabulary introduced early).
- Roles rotate; do not repeat Unit 2's assignment.
- Evidence: branch, PR, schema validation output, AI-review log row if used.

### B3 (2 h) — INDIVIDUAL
- ≥1 diagnostic: a content-collection entry that fails Zod validation — read the error, name the field, fix the frontmatter.
- ≥1 solvable without AI, declared: given three data-freshness/latency scenarios, choose SSR vs. client-side fetch vs. edge function and justify in one sentence each.
- Professor sketch private.

## STEP C — WIRE IT

Same pattern as Unit 2. `tracks.yml` slug `unit-3-astro-advanced`; hour keys already present, verify only.

## STEP D — VERIFY

Same build command as Unit 2. Must be empty. Node resolves. One-line missing-evidence statement.

---

# FORGE FE UNIT — FE II Unit 4: Progressive Web Apps & Offline Capabilities

## INPUT

- COURSE: FE II
- UNIT: 4 of 12
- CONTENIDOS anchor: Desarrollo de PWA, funcionalidades offline
- HOURS: magistral **1** · lab **2** · ejercicios **2** — already present in `tracks.yml`.
- ARTEFACT ROLE: offline-first hardening of the Entrega 1 seed project.
- COHORT: continuing · n < 15
- EXISTING PAGE (upgrade, do not fork): `web-foundations/docs/lessons/en/feii/unit-4-pwa-offline/index.md`
- tracks.yml slug: `unit-4-pwa-offline`

## STEP A — GROUND BEFORE WRITING

1. Matrix row **4**: adjacent architecture coat `483a966a`; HE precedent (Case 2020) **not in vault** — do not cite it. Declare pedagogy gap.
2. Ahmes node (resolved this session, `evaluator_safe=yes`):
   - Fibrian, Utomo, Lukmana & Muttaqin (2026), *Architectural Consideration for Gamified Learning Systems: An Exploration of Offline-First Progressive Web Application*, `10.26594/register.v11i2.5087` · coat `483a966a` · node `00b4388d-211a-5715-8504-64973d1a8eb7` · p.2 · `(Fibrian 2026, 2)` — offline-first PWA requirement: "enhanced with service workers to function offline or on low-quality networks," from an educational-systems architecture study. **This is an architecture/systems paper about a gamified *learning system's* offline-first design, not a study of teaching front-end development.** Use it to ground the offline-first *design requirement* vocabulary (service workers, connectivity-independence, cache/online split of features), never as evidence that this unit's teaching sequence works pedagogically — that gap stays declared.
3. web.dev / MDN / Workbox docs remain platform notes.
4. TTOD epigraph: `ops-001` — *"Deploy in haste, repent in downtime."* (unused elsewhere; fits designing for failure modes before they happen, the closest existing aphorism to offline resilience — no better-fitting TTOD id exists in the vault; do not invent a new line, do not force a mismatched one further than this).
5. Version pin: Workbox / service-worker API surface, dated.

## STEP B — APPEND THREE ARTEFACTS

Keep existing essay (PWA characteristics, progressive-enhancement diagram, service-worker lifecycle, three caching strategies, manifest). Add code-conventions note; label the three caching-strategy blocks `Excerpt` (illustrative fetch handlers, not complete files) and the manifest block `Template` (values must be replaced per project).

### B1 (1 h)
- Claim: offline-first is an architectural decision made before the network fails, not a fallback bolted on after.
- Cite Fibrian et al. 2026 node above for the connectivity-independence requirement vocabulary (their Table row: "Connectivity independent — enhanced with service workers to function offline or on low-quality networks"). State plainly this source studies a learning-system's architecture, not the pedagogy of teaching PWAs — the two must not be blurred.
- Declared-gap paragraph: no vault source on PWA/offline teaching pedagogy for front-end courses; Case 2020 (named in the matrix) is not yet in the vault and is not cited.
- TTOD `ops-001`.
- Speaker outline in `deck-outline.md`.

### B3 (2 h) — INDIVIDUAL — placed before B2 in this note only to flag its dependency: none; order in the page stays B1→B2→B3
Not applicable — keep standard order in the published page.

### B2 (2 h) — TEAM
- Real backlog issue: add an offline fallback (cached shell or offline page) to the team's actual Astro project from Units 2–3, choosing cache-first for static assets and network-first (or stale-while-revalidate) for any dynamic route — justify the choice per route, not blanket.
- DoD: Lighthouse PWA audit score recorded before/after; manifest installable; CI green; human review after AI review; release note stating which caching strategy covers which route and why.
- Roles rotate.
- Evidence: branch, PR, Lighthouse score delta, AI-review log row if used.

### B3 (2 h) — INDIVIDUAL
- ≥1 diagnostic: given a service worker that caches an API response with cache-first and never invalidates it, explain the staleness bug a user will see and fix the strategy.
- ≥1 solvable without AI, declared: for four feature descriptions, decide "must work offline" vs. "may degrade gracefully" and justify in one sentence each.
- Professor sketch private.

## STEP C — WIRE IT

`tracks.yml` slug `unit-4-pwa-offline`; hour keys already present, verify only.

## STEP D — VERIFY

Same build command. Must be empty. Node resolves. One-line missing-evidence statement.

---

## OUTPUT CONTRACT

Upgraded Unit 2 lesson (+ deck-outline.md, exercises.md) · upgraded Unit 3 lesson (+ siblings) · upgraded Unit 4 lesson (+ siblings) · `tracks.yml` hour keys verified (not retuned — already present from a prior, out-of-scope patch) for these three sessions only · one-line missing-evidence statement per unit · explicit boundary note: Units 1 and 7–10 remain unforged (Wave 3/4); FE II hour totals across all 12 sessions still do not close at the official 10/30/14 CV bucket in this run's scope (a broader, separately-authored retune of `tracks.yml` is visible as an uncommitted diff at session start but is not this cascade's output and is not claimed as such).
