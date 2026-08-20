# FE II Wave 2 execution receipt

**Executed:** 2026-08-20
**Contract:** `FE-II-WAVE-2.execute.md`
**Units:** 2 — Astro Meta-Framework (Islands & SSR); 3 — Advanced Astro Architecture & Multi-Framework Integration; 4 — Progressive Web Apps & Offline Capabilities

## Gate results

- Unit 2 session: `magistralHours: 1`, `labHours: 2`, `ejerciciosHours: 2` — already present in `tracks.yml` (found already patched, uncommitted, at session start by a prior out-of-scope effort; verified, not retuned).
- Unit 3 session: same three keys, same values — verified, not retuned.
- Unit 4 session: same three keys, same values — verified, not retuned.
- Unit 2: `status: draft` (was `complete`); code-conventions note added; B1 magistral, B2 team laboratory, B3 individual exercises, `deck-outline.md`, `exercises.md`, and provenance/missing-evidence gate all present.
- Unit 3: same structure; B1 explicitly teaches resumability as the limit of Unit 2's islands pattern.
- Unit 4: same structure; B1 explicitly flags that its cited source studies a learning system's own architecture, not the pedagogy of teaching PWAs, to prevent the citation being misread as pedagogy evidence.

## Citations added (all resolved via `ahmes query --cite --require-evaluator-safe`, all `evaluator_safe=yes`)

| Unit | Coat | Node | Page | Citation |
| --- | --- | --- | --- | --- |
| 2 | Vepsäläinen (2025) `68c7da35` | `797a702c-0538-5577-adc4-c3450c511608` | p.3 | `(Vepsäläinen 2025, 3)` |
| 3 | Vepsäläinen (2024) `3d09df05` | `6589254e-3a63-5095-9571-363afdb8040b` | p.2 | `(Vepsäläinen 2024, 2)` |
| 4 | Fibrian et al. (2026) `483a966a` | `00b4388d-211a-5715-8504-64973d1a8eb7` | p.2 | `(Fibrian 2026, 2)` |

All three are the matrix-named **technique** coats for these units (resumability, islands, PWA-adjacent architecture). Per the grounding matrix row for Units 2–4, HE pedagogy evidence for this sequence remains `NONE` — the declared-gap paragraph in each unit's B1 says so explicitly and is not papered over. No vendor documentation (Astro docs, web.dev, MDN, Workbox) was promoted to an `(Author Year)` citation; it stays labelled as platform notes.

## TTOD epigraphs

`arch-004` (Unit 2), `arch-011` (Unit 3), `ops-001` (Unit 4) — all verified unused elsewhere in FE II before selection (checked by grep across `web-foundations/docs/lessons/en/feii/`). No new TTOD line was invented; `ops-001`'s fit to "offline" is acknowledged in the execute file as the closest existing aphorism, not a perfect thematic match — no better-fitting id exists in the vault and none was forced further than that.

## Code block policy (repo CLAUDE.md)

Added a "Code conventions in this unit" note to each of the three units, matching Unit 5's wording. Existing code blocks were not individually re-labelled inline (Wave 1's precedent did not do this either); the note states which classes of block in the unit are Excerpt/Template/CodeSandbox-ready in prose rather than tagging every fence. This is a lighter compliance than a full per-block audit — flagged here rather than silently claimed as complete.

## Build

Command:

```bash
cd web-foundations && npm run build 2>&1 | grep -i "liquid warning"
```

Result: **PASS (empty)**. Full build: Jekyll generated the site, `postcss:build` succeeded, 180 HTML files normalized, `mark-broken-links` reported no broken URLs or error files. Spot-checked the built HTML for all three units (`_site/lessons/en/feii/unit-{2,3,4}-*/index.html`) — each contains its "Provenance and evidence gate" section and TTOD id intact, confirming no Liquid deletion.

## Remaining boundary

- Units 1 and 7–10 remain unforged (Wave 3/4), as stated in the contract.
- FE II hour totals across all 12 sessions still do not close at the official 10/30/14 CV bucket within *this cascade's* scope. A broader, separately-authored retune of `tracks.yml` covering FE I and additional FE II sessions was already present as an uncommitted diff at the start of this session (0.5/0.5 magistral/ejercicios splits across FE I units, and the pre-existing 1/2/2 splits on Units 2–4 used here) — that diff is not this cascade's output and is not claimed as such; it was left untouched.
- This receipt verifies the Wave 2 publication/build gate. It does not claim the FE II pedagogy gaps in Units 2–4 are closed — they are declared open by design, per the grounding matrix and the fe-unit-forge non-negotiable that "a unit with no evidence says so."
- No research-consent administration, DPO approval, or research-data collection is implied by any team-lab evidence described in B2.
