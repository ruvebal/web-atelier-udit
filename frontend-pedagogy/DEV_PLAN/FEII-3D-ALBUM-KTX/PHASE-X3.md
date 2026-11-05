# PHASE-X3: Grounding — matrix rows + audit addendum

> **Track:** L2 → L1 gate · cite Ahmes, update matrix, amend AUDIT-GROUNDED.
> **Status:** BLOCKED until X2 DONE

## Goal

Write cite-grade rows for the two satellites and the album-cover assignment **without** promoting KTX2 to HE evidence. Live defect this phase prevents: teaching UASTC vs ETC1S as if a classroom study existed.

## Deliverables

- New/updated rows in `frontend-pedagogy/grounding/README.mdc` for: cover-shaders satellite, KTX2 satellite, assignment pitch
- Addendum section in `web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md` (dated 2026-11-*) mapping album cover + KTX2 onto the **student** vs **instructor** split
- `grounding/PROFIELD-SYNC.json` touch for the 20261104 run (publication-head step 4)
- `PHASE-X3-COLD-REVIEW.md`, `PHASE-X3-REPORT.md`

## Scope

**In:** Ahmes `query --cite` / node+page for every claim that will later appear in a lesson. Chicago forms for evaluator_safe=yes. `[BIBLIO-GAP]` retained when unsafe.
**Out:** Lesson body. CV hour edits (X4). Vector-snippet quotes in student HTML.

## Prompt (Implementation Agent)

```text
Implement PHASE-X3 per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X3.md.

## Deliver
1. Read curriculum-publication-head + grounding/README.mdc rows 8–9.
2. For each intended lesson claim, resolve coat · node · page from Ahmes.
   If unresolved, keep [UNVERIFIED-GAP] / [BIBLIO-GAP]. Do not cite
   search_knowledge text.
3. Add matrix rows for the two satellites + assignment. Keep Angel 2024 as
   the HE graphics precedent. KTX2 = STANDARD/practitioner unless a new
   evaluator_safe HE paper actually vaulted in X2.
4. Amend AUDIT-GROUNDED.md with an addendum: student bar now includes
   KTX2 choice + cover scene; instructor still owns MCP/boilerplate.
   Do not delete the 2026-08-14 split.
5. Update PROFIELD-SYNC.json with run id + hashes.
6. Hand off for cold review — do NOT mark DONE.

## Constraints
- Unsafe AI Co-Artist remains excluded from student cites (AUDIT).
- Autopilot may commit grounding files locally. Do not push web-atelier-udit.
```

## Acceptance

- [ ] Matrix rows exist; each cell names a coat or an explicit gap
- [ ] `ahmes query --cite` (or equivalent) transcript attached for every non-gap claim
- [ ] AUDIT addendum states KTX2 is **student-path** and corpus-to-boilerplate is still **not**
- [ ] Student-facing Chicago forms listed for X5–X8 to copy; no fabricated DOIs
- [ ] Cold review filed; blocking Fn closed

## Risks

X2 ingested nothing on KTX2. Still-success: matrix row says platform note + gap; X8 teaches Khronos as HOW, never as HE outcome.
