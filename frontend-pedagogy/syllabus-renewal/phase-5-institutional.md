# Phase 5 — Institutional cleanup (real deliverables, not a flag-and-wait)

**Status: not started.**

## Context (self-contained)

Three concrete institutional artifacts, decided 2026-08-08 to be authored by us rather than requested from someone else. Full rationale: `../2026-27-syllabus-renewal-plan.md` §0 finding 1, §3 items 1/2/6, §9.

## Entry

Phase 2/3 content is stable enough to summarize (a final unit list exists for FE II; FE I's audit is confirmed).

## Do

1. **Author the `TEMARIO` for the FE I and FE II 2026/2027 Guías Docentes, for department submission.**
   - **FE II:** `GDFS-2026-2027-3-Desarrollo Web Front-End II.pdf` currently has a copy-pasted `TEMARIO` (observational drawing/figure anatomy content) and bibliography (Boerboom, Lauricella, Simblet, Arnheim, Gombrich) that belong to an unrelated subject. Write a correct numbered-topics `TEMARIO` derived directly from Phase 2's final 12-unit list, plus a real front-end-development bibliography (can draw candidate sources from `../profield-frontend-pedagogy.md` §14's source ledger where appropriate — CS2023, MDN, WCAG 2.2, etc. — filtered to what's actually taught, not the full research bibliography).
   - **FE I:** check `desarrollo-web-front-end-i-2025-2026.json` / its source PDF for the same `TEMARIO`-vs-`CONTENIDOS` gap — do not assume it's clean just because no defect was found in the JSON's `contents` field (that field may have merged what the actual PDF keeps as two distinct sections). If a `TEMARIO` gap exists there too, author it from Phase 1's confirmed lesson clusters.
   - Deliver both as documents ready to hand to academic affairs/program coordination — Rubén makes the actual submission decision and timing call.

2. **Produce the Back-End II synergy workflow sheet**, co-drafted with input from the Back-End II professor (Rubén is already in direct contact). Two columns:
   - **FE II needs:** endpoint shapes for unit 10's consumed service, an auth contract, a REST-vs-GraphQL commitment (affects Phase 2 unit 2–3's architecture teaching too), staging/seed-data conventions.
   - **FE II offers:** a consuming front-end for Back-End II's students' APIs, shared testing/CI conventions, a joint capstone framing (both courses' students working against the same real contract).
   This directly de-risks Phase 2's unit 10 — if this sheet exists before Phase 2 runs, unit 10 can name a real service instead of a placeholder.

3. **Write the UX/UI sibling-course boundary note** — formalize whatever Phase 1 step 2 surfaced about "Introducción al Diseño de Interfaces y a la Experiencia de Usuario en Entornos Web: UX/UI," bounding FE I's Módulo 3 against it explicitly (implementation-adjacent UX stays in FE I; theory/research methods stay in the sibling course).

## Gate

- [ ] FE II `TEMARIO` + bibliography drafted, matching Phase 2's final unit list exactly.
- [ ] FE I `TEMARIO` checked for the same gap; drafted if needed.
- [ ] Back-End II synergy sheet exists and has been shared with that professor (not just drafted unilaterally).
- [ ] UX/UI boundary note exists as a standalone, citable artifact (not just a passing mention inside Phase 1's file).

This phase has no downstream phase — it closes the cascade's remaining open institutional threads. Cross-check `../IGNITOR.mdc`'s cascade table and mark all phases done once this gate passes.
