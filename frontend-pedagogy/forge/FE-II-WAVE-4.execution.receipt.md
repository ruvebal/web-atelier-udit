# FE II Wave 4 execution receipt

**Executed:** 2026-08-20
**Contract:** `FE-II-WAVE-4.execute.md`
**Units:** 1 — Kickoff: From FE I React to Production Architecture; 7 — Performance Engineering: Core Web Vitals & Optimization

## What was found at session start (correcting priors before acting)

Both units were further along than `TEACHING-READINESS.mdc` §3's 2026-08-11 audit implies. Unit 1 (146 lines at that audit) already had Learning Objectives, the systems-lens reframe, the 12-unit arc table, and the FE I boundary section — but zero labelled code, zero lab, zero exercises, and an unattributed epigraph. Unit 7 (329 lines) already had a full UNESCO-grounded "Scholarly honesty" ethics section and live citations (Fisseler, Correa, Batista, ACM/IEEE, UNESCO) — but its "Practice Exercise" was a single undifferentiated 6-step list (neither a team lab nor an individual exercise set), its code blocks were unlabelled, and **both** of its epigraphs were unattributed. This receipt reports an **extension pass** for both units, not a rewrite — existing accurate prose was kept.

## Citations — live-checked this session via `ahmes query --cite --require-evaluator-safe` / `ahmes status`, none trusted from prior text

| Unit | Coat | Node | Result |
| --- | --- | --- | --- |
| 1 | Liu, Fan & Pan (2025) `dc2bd27d` | `25fa0a93-6808-5ccd-acc7-54b67523897e` (Motivation, p.0) | **Genuine `[BIBLIO-GAP]`, re-confirmed live.** `ahmes status` on all three library duplicates of this coat (`s40594_025_00592_w_dc2bd27d`, `liu_fan_pan_..._dc2bd27d`, `tool_tutor_or_crutch_..._dc2bd27d`) shows `Citation preview: [BIBLIO-GAP]`, reason "missing year" — despite prior online metadata cascades already logged (including `force-meta` passes). A fresh `ahmes enrich --meta --online` attempt run live this session on the best-parsed duplicate enriched **0 nodes**. `ahmes query --cite --require-evaluator-safe` confirmed `evaluator_safe=no`, exit 2. Quoted in Unit 1 **with the gap visible**, not as `(Author Year)`. |
| 7 | Mahoney, Terras, Lee & Zeller (2025) `03bab1df` | `0e9f7882-ac52-57c3-bbec-b745ab2987f0` (abstract, p.1) and `313c5e50-54de-5d68-b8c0-dd4be98b13ca` (intro, p.2) | **Genuine pipeline-lag closure, re-confirmed live — not forced this session.** The matrix's own row 7 flagged this coat "`[BIBLIO-GAP]` until host-title fix." Live `ahmes status` now shows `evaluator_safe: yes`, confidence 0.95, `source=metadata`, `registry_source=crossref`, `host_registry_match: true`. `ahmes query --cite --require-evaluator-safe` resolved both nodes live: `(Mahoney 2025, 1)` and `(Mahoney 2025, 2)`. This is the first **empirical** (not merely normative) source in this course quantifying a real page-weight-to-carbon relationship — added to Unit 7 with the real, unflattering figures reproduced verbatim (13,000%+ emissions growth, ~10× global per-pageview average, 0.14 kg → 116.85 kg CO₂e per homepage view, COP3→COP29), explicitly scoped as one institutional dataset, not a general front-end-to-carbon law. |

**No `[BIBLIO-GAP]` row was forced.** Liu stayed a declared gap after a real, live enrich attempt failed to resolve it (0 nodes enriched) — consistent with the same coat's unresolved status when checked in Wave 3. Mahoney resolved on its own between sessions and was re-verified live rather than assumed from the matrix's stale text, per this cascade's standing rule.

**Flagged, not fixed (out of this wave's two-unit scope):** the matrix describes Unit 5 as grounded in Phung `ea8cf54c` ("optimisation never demanded"). A `grep` across the published Unit 5 and Unit 7 text found **no citation of Phung anywhere** — the matrix's description of Unit 5 as "✅ Done — reference standard" appears to predate or diverge from what actually shipped. This is a real inconsistency worth a future session's attention; fixing Unit 5 (already receipted, out of scope) was not attempted here.

## TTOD epigraphs

Both units carried unattributed, improvised epigraphs — real defects (`lesson-publishing-integrity.mdc` Rule 7), same class Wave 3 found and fixed on Unit 10. Verified via `grep ttod.yml` that none of the four original strings existed in TTOD before replacing them. All replacements selected via `TTODCliAdapter.search_quotes()`, never by hand-parsing `ttod.yml`, and confirmed unused elsewhere in this repo's lessons via `grep` before selection:

- **Unit 1 opening:** `wis-014` — *"Before the first line of code, prepare the forge…"* — direct fit (a kickoff unit is literally the "prepare the forge" moment).
- **Unit 1 closing:** `arch-006` — *"A monorepo is not a monolith…"* — direct-ish fit (single-interface vs. system-of-interfaces, this unit's own central distinction).
- **Unit 7 opening:** `img-051` — *"The master checked the Network tab…"* — direct fit (performance-as-baseline, not vanity metric, is the unit's opening claim).
- **Unit 7 closing:** `img-045` — *"…The user pays the price."* — analogical (extended from responsive images specifically to performance budgets generally; disclosed inline), landing on the unit's own pre-existing "who pays" framing.

The mid-document `cc-007` epigraph already in Unit 7 (Performance Budgets section) was verified real in `ttod.yml` and left unchanged.

## Code block policy

Unit 7's ten code blocks (Lighthouse CLI, RUM, code splitting, tree shaking, dependency pruning, image optimisation, font loading, critical CSS, JS-execution reduction, budget-setting) are all labelled **Excerpt** — partial patterns relying on surrounding Vite/Astro build config, none a complete runnable file. `Budget.json` is labelled **Template** (placeholder `path`/`limit` values to replace). A convention note was added near the top of both units, per `CLAUDE.md`'s lesson-authoring policy. Unit 1 has no code this session; its convention note states that explicitly and points to the FE II index page's policy section.

## Wiring

- `tracks.yml`: `unit-1-kickoff` (`labHours: 0`, `magistralHours: 1`, `ejerciciosHours: 2`) and `unit-7-performance` (`labHours: 2`, `magistralHours: 1`, `ejerciciosHours: 2`) were **already present** — verified, not retuned, same discipline as Wave 3's treatment of Units 8–10. FE II's own session sum is **10 magistral / 30 lab / 16 ejercicios** against the official 10/30/14 — a **pre-existing 2 h ejercicios overshoot**, not created or fixed by this wave; stated here as a standing note, same as every prior wave's receipt.
- `lessons.yml`: `feii-unit-1-kickoff` and `feii-unit-7-performance` were **already registered**, `status: draft`. Frontmatter `status:` in both `index.md` files was `complete` (pre-existing mismatch against the registry) — set to `draft` in both to match `lessons.yml` and the forge contract's "status: draft until Step D passes," same correction Wave 3 made for Units 8–10.
- New sibling files added: `unit-1-kickoff/{deck-outline.md,exercises.md}`, `unit-7-performance/{deck-outline.md,exercises.md}`.

## Build

```bash
cd web-foundations && npm run build 2>&1 | grep -i "liquid warning"
```

Result: **PASS (empty)**. Full build succeeded (180 HTML files normalized, `mark-broken-links` reported no broken URLs). Spot-checked built output: `_site/lessons/en/feii/unit-1-kickoff/index.html` contains the Liu gap-visible passage and both new epigraphs intact; `_site/lessons/en/feii/unit-7-performance/index.html` contains the Mahoney figures, both new epigraphs, and all ten `Excerpt`/`Template`-labelled code blocks intact (`onCLS`, `budget.json`, `Lighthouse` all present, no Liquid deletion inside fences).

## One-line missing-evidence statement per unit

- **Unit 1:** no CONTENIDOS anchor, no technical claim to ground (matrix's own instruction); Liu (2025) frames the performance-vs-learning tension motivating the course's AI-declaration discipline but stays genuinely `[BIBLIO-GAP]`, quoted for framing only.
- **Unit 7:** performance-engineering *pedagogy* = `[UNVERIFIED-GAP]`, unchanged; UNESCO grounds obligation, not measurement; Mahoney et al. (2025) grounds one real, quantified page-weight-to-carbon dataset, scoped narrowly — none of the three is evidence that this specific teaching sequence produces better performance judgement than an alternative.

## Milestone — and its limit

**After this wave, all 12 FE II units carry first-pass lesson content for the first time in this cascade.** This closes the "ten of twelve are scaffold prose" gap `TEACHING-READINESS.mdc` opened with. It does **not** mean FE II is pedagogically complete, that all 12 units are at Unit 5/6 depth, that decks exist (0 of 12, Wave 5 is still unstarted), that hours close at the official 10/30/14 (they sit at 10/30/16, a pre-existing overshoot), or that six of twelve units' declared pedagogical gaps (Units 2–4, 7–10) are closed — they remain `[UNVERIFIED-GAP]` by design, per `fe-unit-forge.mdc`'s own non-negotiable that "a unit with no evidence says so."

## Remaining boundary

- Decks (Wave 5, 0 of 12) are still unstarted — out of this wave's scope.
- Spanish versions of FE II material: still none, decision still pending (unchanged standing note).
- The Phung/Unit 5 citation inconsistency flagged above is unresolved — a future session's task, not this wave's.
- Wave 1's Units 11/12 still cite the same Liu coat as if it were more settled than this session found it to be (no evaluator-safe check recorded in that receipt) — flagged, not touched, since Wave 1 is already receipted and out of this wave's two-unit scope.
