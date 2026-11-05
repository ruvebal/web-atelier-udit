# PHASE-X5: Assignment pitch — album cover

> **Track:** L1 · rewrite `units-8-9-assignment`.
> **Status:** BLOCKED until X4 DONE

## Goal

Replace the generic “one scene, one shader” hand-in with **create a web 3D version of your favourite music album cover**, without dropping the covenant bars or inventing a second sandbox.

## Deliverables

- Updated `web-foundations/docs/lessons/en/feii/units-8-9-assignment/index.md`
- Covenant cross-links if bars grow (KTX2 choice, IP line)
- `PHASE-X5-COLD-REVIEW.md`, `PHASE-X5-REPORT.md`

## Scope

**In:** assignment page, covenant delta if needed, TTOD epigraphs by ID (`qa-007` for contribution).
**Out:** Unit 8/9 body rewrite (X6). Implementation repo (X9). Spanish. Inventing a new git culture.

## Prompt (Implementation Agent)

```text
Implement PHASE-X5 per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X5.md.

## Deliver
1. Retitle around the album-cover pitch. Hand-in = TTOD-shaped PRs that
   light `/covers/<slug>` on github.com/ruvebal/feii-album-covers (D4, D21).
   Cite CONTRIBUTING.md in the aggregator. Cite TTOD qa-007 by ID.
   Keep renderer-info, shader-note, ktx2-note, merge log, two-REJECT,
   no post required, Unit 10 out.
2. Cover recognisable as a named album; type stays DOM; KTX2 UASTC vs
   ETC1S documented; IP declaration (D8). Private GitHub is not a licence.
3. Point at the two satellite lessons (stubs OK) and CONTRIBUTING.md.
   State the ritual: branch `cover-<slug>-task<N>-<topic>` from main;
   task1 mesh / task2 shader / task3 KTX2+docs as small PRs; task4
   cross-cover PR or review; AI Review Log required; CI + human approve;
   never replace App.jsx; never edit another slug except task4.
4. Beacon (`react-template`) remains the Unit 8–9 lab demo, not the hand-in.
5. Code blocks: Template for docs files. Wrap Liquid-dangerous fences.
6. Cite only X3 Chicago forms. Pilot honesty stays. Do not copy TTOD
   Astro seam names or the quote-proposal pipeline onto this page.
7. Hand off for cold review — do NOT mark DONE.

## Constraints
- Do not tell students to rip commercial sleeves into `_studio` or a public Pages site.
- Autopilot may commit the lesson file locally; do not push web-atelier-udit.
```

## Acceptance

- [ ] Page states the pitch in the title or first screen of prose
- [ ] Four covenant bars still present; KTX2 + IP are explicit extra bars or sub-bullets
- [ ] Page names the aggregator repo and the student **route** `/covers/<slug>`
- [ ] Page names the TTOD branch pattern `cover-<slug>-task<N>`, staged PRs, AI Review Log, and human merge (D21)
- [ ] “What this file does not ask for” still excludes MCP, corpus-to-boilerplate, Unit 10, replacing App.jsx, TTOD seam names as student branches
- [ ] `rg "Text3D" ` assignment page does not make 3D type the grade
- [ ] Cold review filed; blocking Fn closed

## Risks

Students pick unlicensed covers. Still-success: IP paragraph is unambiguous and the reference repo (later) uses PD/original art only.
