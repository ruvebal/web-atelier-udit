# Phase 3 — Assessment reconciliation

**Status: not started.**

## Context (self-contained)

Three assessment framings coexist in this repo/institution and must nest, not compete (full detail: `../2026-27-syllabus-renewal-plan.md` §4):

```
how-to-pass-this-track (per-track institutional packaging — what gets submitted to UDIT)
   └─ Entrega 1/2/3, Examen Parcial/Final, Asistencia  ← literal slots, mandatory
        └─ populated using official guide weight RANGES
             (FE I: Pruebas 30% / Trabajos 60% / Portafolio 10% — fixed
              FE II: Pruebas 30–50% / Trabajos 40–60% / Portafolio 10–20% — a range, chosen in Phase 2)
                  └─ each slot's content and rubric comes from the Atelier evaluation
                     rationale already in web-foundations/docs/evaluation/en/index.md
                     (Technical 40% / Reflection&Documentation 35% / Conceptual 25%,
                      evidenced via commits, deployments, AI-usage disclosures, oral defence)
```

By the time this phase runs, Phase 1 and Phase 2 will have produced two live-but-thin `how-to-pass-this-track` pages (deliverable slots named, weights chosen, but not yet fully specified — dates, rubric text, AI-use-declaration mechanics). This phase fills that in, once, and makes both tracks consistent with each other.

## Entry

Phase 1 and Phase 2 deliverable lists exist (i.e. both tracks' Entregas are at least named, even if under-specified).

## Do

1. **Write the AI-use-declaration and oral-defence rubric once**, as a shared component referenced by both tracks (not duplicated by hand into each `how-to-pass-this-track` page). Ground it in `../profield-frontend-pedagogy.md` §4/§12.7's `verify`/`narrate`/`defer`/`critique` axes: every deliverable requires a commit-history-linked AI-use declaration; at least one deliverable per track requires an oral or written "explain and modify this on the spot" component (Sankaranarayanan 2026's "corrective competence" framing).
2. **Set FE II's exact weights within the official range** (Pruebas 30–50% / Trabajos 40–60% / Portafolio 10–20%) — a specific decision, not left as a range in the published page.
3. **Fill both `how-to-pass-this-track` pages completely**: real dates (orientative, per the official template's own convention), real % weights, real "Observaciones," the `Evaluación Ordinaria`/`Evaluación Extraordinaria` conditions copied from the official template's pass rule (mean ≥ 5.0, any single deliverable < 4.5 fails). Update both the reveal.js `data/content.json` and, if the institutional markdown record (`../how-to-pass-this-track.md`) needs a track-specific instantiation for submission purposes, that too.
4. **Sanity-check against the existing Web Atelier evaluation rationale** (`web-foundations/docs/evaluation/en/index.md`) — the point allocation there (Technical 40 / Reflection 35 / Conceptual 25) should be legible as the rubric *behind* each Entrega's institutional weight, not a competing scheme. If a discrepancy shows up, resolve it in favor of keeping one rubric philosophy, expressed twice for two audiences (student-facing track page vs. institutional submission).

## Gate

- [ ] AI-use-declaration + oral-defence rubric exists as one shared artifact, linked from both track pages.
- [ ] FE II's weights are specific numbers within range, not a range, on the published page.
- [ ] Both `/tracks/fei/how-to-pass-this-track/` and `/tracks/feii/how-to-pass-this-track/` show complete Entrega/Examen/Asistencia content — no placeholder text remains.
- [ ] Cross-check: the Technical/Reflection/Conceptual rubric in `docs/evaluation/en/index.md` and the institutional weights on both track pages describe the same underlying evidence, not two different grading philosophies.

When this gate passes, proceed to `../phase-4-cv-reframe.md`.
