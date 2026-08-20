<!-- executable · FE II unit forge · Wave 1 · paste this file as the agent prompt -->

# EXECUTE — FE II Wave 1 (Units 11 then 12)

**Repo:** `web-atelier-udit`  
**Contract (do not rewrite):** [`../fe-unit-forge.mdc`](../fe-unit-forge.mdc)  
**Matrix (authoritative):** [`../grounding/README.mdc`](../grounding/README.mdc)  
**Publish rules:** [`.cursor/rules/lesson-publishing-integrity.mdc`](../../.cursor/rules/lesson-publishing-integrity.mdc)  
**Reference standard:** Units 5 and 6 (`web-foundations/docs/lessons/en/feii/unit-5-testing-strategy/`, `unit-6-ai-code-review/`)

This file is the filled master prompt. The `.mdc` is the procedure. Temario `*.prompt.md` files are bibliography passes — not this job.

**Not this run:** FE I (already teachable). Full 10/30/14 rebalance of units 1–10. Reveal.js decks (forge wave 5). Spanish FE II. Research-consent administration.

Execute **Unit 11 completely** (A→D, commit-ready files), then **Unit 12** the same way. Do not skip Step A.

---

# FORGE FE UNIT — FE II Unit 11: Capstone Integration — Process Evidence & AI Use Declaration

## INPUT

- COURSE: FE II
- UNIT: 11 of 12
- CONTENIDOS anchor: Proyecto integrador
- HOURS: magistral **1** · lab **3** · ejercicios **1**  
  Keep existing `labHours: 3` (FE II lab total already closes at 30). **Add** `magistralHours: 1` and `ejerciciosHours: 1`. Do not retune other units.
- ARTEFACT ROLE: Entrega 3 / release on the shared cohort repo — process evidence, AI-use declaration, `verify`/`narrate` axes. Not a new product.
- COHORT: continuing · n < 15
- EXISTING PAGE (upgrade, do not fork): `web-foundations/docs/lessons/en/feii/unit-11-capstone-integration/index.md`  
  Status in data may say `complete`; readiness audit: essay, 0 labelled code, no lab brief, no exercise set. Bring it to Unit 5/6 depth.
- tracks.yml slug: `unit-11-capstone-integration`

## STEP A — GROUND BEFORE WRITING

1. Read **Unit 11** row in `frontend-pedagogy/grounding/README.mdc`. Well supported. Also use the 2026-08-11 coats named there for the team-repo / incremental-PBL design (Neumann, Vega) — they ground *why this lab shape*, not extra CONTENIDOS.
2. Re-open Ahmes nodes. Cite `⟨coat⟩ · nodo ⟨id⟩ · p. ⟨n⟩`. Do not paste DevIAC/Athanor `content_preview`. Coats the matrix names (verify, do not invent):
   - Garcia `8fef58f2` (artefact)
   - Nelson & Ponciano `f1031131` (repository infrastructure)
   - González-Videgaray `078b0a6a` (integrity formed)
   - Neumann eduScrum (team lab / one-cohort-one-repo)
   - Vega incremental PBL
3. Vendor/GitHub docs = platform notes, never `(Author Year)`.
4. One TTOD epigraph by **id** from `~/src/ttod/ttod.yml`. If you invent a line, add it to TTOD first — do not orphan it in the lesson.
5. Pin library/tool versions by search, dated.

## STEP B — EMIT THREE ARTEFACTS (same lesson file + clearly headed sections, or sibling files if Unit 5/6 already split that way)

### B1 · LECCIÓN MAGISTRAL (1 h)
- One-sentence claim; why it is not obvious.
- Journey: what Units 5–10 already shipped; what 11 adds; what 12 defends.
- Conceptual model (ASCII ok): process evidence ≠ polish theatre.
- Evidence from Step A (not a gap unit).
- One TTOD id.
- Speaker outline ≤ 12 claim-slides **in the lesson**. No reveal.js in this run.

### B2 · PRÁCTICAS DE LABORATORIO (3 h) — TEAM, shared repo
Workplace-like. Specify:
- Real issues from the artefact backlog (existing Entrega 1–2 work), not invented greenfield.
- Definition of done: tests/CI as the repo already requires; human review after AI review (Unit 6); release note; `decisions.md` / `iterations.md`; AI-use declaration.
- Rotating roles.
- Evidence: branch, PR, AI-review log rows, release tag.
- Code blocks labelled CodeSandbox-ready / Excerpt / Template. `{% raw %}` any fence with `{{` or `${{`.

### B3 · RESOLUCIÓN DE EJERCICIOS (1 h) — INDIVIDUAL, not the product
3–5 short problems isolating *how to read a diff / declare AI use / tell verify from narrate*.
- ≥1 diagnostic (broken declaration or missing process file → repair).
- ≥1 solvable without AI, declared.
- Professor expected-answer sketch (not on the student handout — HTML comment or `private/` note if the lesson is public).

## STEP C — WIRE IT

- `web-foundations/docs/_data/tracks.yml` session `unit-11-capstone-integration`: `duration` consistent with contact; `labHours: 3`; `magistralHours: 1`; `ejerciciosHours: 1`.
- Index link `/lessons/en/feii/` via `relative_url`.
- Frontmatter + TOC fence per publishing rules. Keep permalink `/lessons/en/feii/unit-11-capstone-integration/`.
- Set honest `status` (draft until Step D).

## STEP D — VERIFY

```bash
cd web-foundations && npm run build 2>&1 | grep -i "liquid warning"
```

Must be empty. Every cited node resolves. Hour keys on this session exist. One-line statement of what this unit still does **not** evidence.

---

# FORGE FE UNIT — FE II Unit 12: Capstone Oral Defence & Final Evaluation

## INPUT

- COURSE: FE II
- UNIT: 12 of 12
- CONTENIDOS anchor: Evaluación
- HOURS: magistral **1** · lab **3** · ejercicios **1**  
  Keep `labHours: 3` (do not break the 30 h lab close). Add `magistralHours: 1` and `ejerciciosHours: 1`.
- ARTEFACT ROLE: oral defence ritual that triangulates team lab evidence (11) with individual understanding. Diff-based questions. Not a second integration week.
- COHORT: continuing · n < 15
- EXISTING PAGE: `web-foundations/docs/lessons/en/feii/unit-12-capstone-defence/index.md`
- tracks.yml slug: `unit-12-capstone-defence`

## STEP A — GROUND BEFORE WRITING

1. **Unit 12** matrix row. Well supported.
2. Re-open nodes:
   - Liu `dc2bd27d` **p.12 verbatim** (assessment / offloading — quote only what the node says)
   - DEC LATAM `20489b0b` p.2 (65% shallow learning, 56% fairness) — student demand for fairness is documented; use it.
3. Do not treat the oral as research data collection. Instruments live in [`../fe-cohort-case-proposal.mdc`](../fe-cohort-case-proposal.mdc); this unit **teaches the defence**. Consent is not administered here.
4. One TTOD id. Version pins as in Unit 11.

## STEP B

### B1 (1 h)
Claim: the defence measures *corrective competence* on the student’s own diff, not slide theatre. Position after Unit 11. Liu + DEC LATAM. Speaker outline only.

### B2 (3 h) — TEAM
Workplace-like prep on the shared repo: freeze the tag from Unit 11, assign who answers which layer, rehearse one AI accept/reject from the log. DoD: tagged release still green; defence roster; no new features.

### B3 (1 h) — INDIVIDUAL
3–5 decontextualised drills: read a small unknown diff; answer a fairness/shallow-learning probe; repair a hollow oral claim. ≥1 no-AI. Professor sketch private.

## STEP C–D

Same as Unit 11, slug `unit-12-capstone-defence`. After both units: summing `magistralHours` / `labHours` / `ejerciciosHours` **across all 12 FE II sessions will not yet equal 10 / 30 / 14** — units 1–7 and 10 still lack magistral/ejercicios. That is expected. Do **not** invent the rest in this run. Do not change FE I’s 32 h lab defect here.

## OUTPUT CONTRACT

Upgraded Unit 11 lesson · upgraded Unit 12 lesson · tracks.yml patch for those two sessions only · one-line missing-evidence statement per unit.
