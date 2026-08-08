# Phase 0 — Research triage & cascade scaffolding

**Status: ✅ done 2026-08-08.** This file is a record, not a task brief — kept so the cascade's provenance is auditable from inside `syllabus-renewal/` without needing the full conversation history.

## Entry

None — this is where the renewal started.

## Do (what was actually done)

1. Read `profield-frontend-pedagogy.md` (the research-field spec) end to end; verified every new 2025–2026 AI-assisted-programming citation directly via web search (5 sources: Ma et al., Sapoglu & Mohamed, Rotter/Benazet i Montobbio/Hernández-Leo, Sankaranarayanan, Oliveira et al.); caught and corrected a recurring DOI misattribution (`10.1145/2016911.2016937` is Park & Wiedenbeck, not Dorn & Guzdial).
2. Split every `UNVERIFIED` tag in that document (and its sibling `.yaml`) into `[UNVERIFIED-GAP]` (legitimate frontier — 20 of 21 instances) or `[UNVERIFIED-NOISE]` (reified metaphor, excluded from design reasoning — 1 instance: the "skill half-life" formal-construct claim). Heuristic lives inline in that document's "Evidence tags" section.
3. Inventoried official institutional data: `desarrollo-web-front-end-i-2025-2026.json`, `GDFS-2026-2027-3-Desarrollo Web Front-End II.pdf`, both instructor CVs, the BOE cross-institution comparison corpus, and the live `web-foundations` repo state (existing lessons, tracks, evaluation rationale, `AI_POLICY.md`).
4. Found and flagged a real clerical defect in the official FE II 2026/2027 PDF: its `TEMARIO` and bibliography are copy-pasted from an unrelated figure-drawing/character-design subject, while `CONTENIDOS`/evaluation/hours are correct.
5. Found that the FE II CV draft substantially re-teaches FE I semester 2 (React fundamentals/hooks/testing/deployment) rather than extending past it — the core design problem the renewal solves.
6. Confirmed with Rubén (2026-08-08): FE is taught in both the Full-Stack and Data-Science & AI degrees; he is in direct contact with the Back-End II professor; the repo stays `web-atelier-udit`; the "how to pass this subject" template becomes a per-track, reveal.js-published page.
7. Checked the two full-degree syllabi JSONs (`1500203` Full-Stack, `1500206` Data-Science & AI) as a possible independent verification source for the above — both are empty stubs (`subject_count: 0`), a tooling gap, not something to build on.
8. Studied `/Users/ruvebal/src/MSCA/SVCM/web/pitch/` as the working precedent for reveal.js + data/code/design-tokens separation, and `/Users/ruvebal/src/MSCA/SVCM/coordination/` + `.cursor/skills/msca-proposal-forge/GRAPH-FIRST-FORGE-CASCADE.md` as the source of the Entry/Do/Gate cascade pattern this directory now follows.
9. Wrote `../2026-27-syllabus-renewal-plan.md` (the rationale) and subdivided its execution layer into this `syllabus-renewal/` cascade.

## Gate

- [x] Every `UNVERIFIED` claim in `profield-frontend-pedagogy.md` carries `-GAP` or `-NOISE`.
- [x] Main plan document exists and reflects all 2026-08-08 decisions.
- [x] `IGNITOR.mdc` + one `phase-N-*.md` per phase exist in this directory.

Passed. Phase 1 is unblocked.
