# PHASE-X15: Student brief, registry, gallery and neutral templates

> **Track:** L1 lesson + L3 student-facing pack. Product-owner amend 2026-11-05 (D26).  
> **Status:** BLOCKED until X14 DONE  
> **Depends on:** X14 Route.jsx architecture, D4/D8/D21/D26

## Goal

Make the student-facing surface match D26: a neutral `_template`, expanded registry metadata, a visual exhibition index, and an assignment/CONTRIBUTING brief that states format freedom while preserving the TTOD contribution ritual, IP, and (where applicable) KTX2 / performance evidence. `_studio` is explicitly **one reference**, not the expected answer.

## Deliverables

- `covers/_template/` rebuilt as neutral starters (minimal DOM, WebGL, hybrid variants — no sleeve/vinyl aesthetic prescription)
- `registry.json` schema: title, authors, concept, thumbnail, tags, readiness (plus slug; album may remain or fold into title/concept — document the choice)
- Gallery `/` as a visual exhibition index (thumbnails / readiness), still keyboardable
- Updated `CONTRIBUTING.md`, PR template, README, assignment lesson (`units-8-9-assignment`)
- Legacy `Cover.jsx` path removed if still present after X14
- `PHASE-X15-COLD-REVIEW.md`, `PHASE-X15-REPORT.md`

## Scope

**In:**
- Neutral templates: students normally edit only `covers/<slug>/**` + one registry row.
- Explicit statement: `_studio` is a reference implementation; any Canvas/camera/shader/audio/DOM/hybrid format that lights the route is valid for hand-in **if** the covenant bars that still apply are met (transfer of ownership of the endpoint, explainable technique where used, merge judgment, IP). Shader / KTX2 / GPU budget remain required **when the route uses those technologies**; a pure DOM route documents N/A honestly instead of faking a sleeve.
- Preserve: branch pattern, staged PRs, AI Review Log, CI, human approval, cross-cover PR + review (D21).
- Assignment lesson: replace “must be composed R3F scene + sleeve shader” as the only path; keep Units 8–9 lab pedagogy (Unit 8 sleeve fork) as lab practice, not the sole entrega format. Fix “private aggregator” / “not a deployed public page” if Pages is public.
- No new course hours or numbered units (D1, D5).

**Out:**
- Live production audit (X16)
- Changing Unit 8 beacon measurements or deleting satellites
- Weakening IP or AI Review Log

## Prompt (Implementation Agent)

```text
Implement PHASE-X15 per
frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X15.md.

## Deliver
1. Replace visually prescriptive _template with neutral Route.jsx
   starters (DOM / WebGL / hybrid). No sleeve-vinyl-stage as the
   default aesthetic. Point at _studio as optional reference only.
2. Expand registry metadata (title, authors, concept, thumbnail, tags,
   readiness). Update check-registry.mjs + Home gallery into a visual
   exhibition index.
3. Rewrite CONTRIBUTING route contract, PR template, README for D26.
   Students edit only their route folder + registry row.
4. Update web-foundations assignment lesson on the integration
   worktree: format freedom; applicable KTX2/budget/shader evidence;
   public Pages IP stakes; _studio is not the expected answer.
   Do not add hours or units.
5. Remove any leftover Cover.jsx primary contract / shim.
6. Push feii-album-covers when authorised. Do not push web-atelier-udit.
7. Hand off VERIFYING — do NOT mark DONE.

## Constraints
- D21 ritual intact. D8 IP intact. D1/D5 hours intact.
- Unit 8 lab may still teach a sleeve fork; the assignment must not
  require that composition as the only hand-in.
```

## Acceptance

- [ ] `_template` is neutral (DOM / WebGL / hybrid starters); no mandated sleeve/vinyl/stage composition
- [ ] Docs state `_studio` is a reference, not the expected answer
- [ ] Registry supports title, authors, concept, thumbnail, tags, readiness; CI validates
- [ ] `/` is a visual exhibition index; keyboard accessible
- [ ] CONTRIBUTING + PR template + README match D26; students only touch own route + registry row
- [ ] Assignment lesson updated: format freedom; applicable evidence rules; Pages/IP honesty; no new hours/units
- [ ] No primary `Cover.jsx` contract remains
- [ ] `npm run lint && npm run build` green; lesson build still green for touched pages
- [ ] D21 artefacts (branch naming, AI Review Log, cross-cover) still present
- [ ] Cold review filed; blocking Fn closed

## Risks

Students may read Unit 8 lab as the hand-in. Still-success: assignment and CONTRIBUTING say the lab is practice; the route format is free. Pure DOM teams must not be forced to fake KTX2 numbers — document N/A.
