# PHASE-X7: Cover-shaders satellite lesson

> **Track:** L1 · new lesson `feii-cover-shaders`.
> **Status:** BLOCKED until X6 DONE

## Goal

A student-facing lesson that treats GLSL as **sampling an album sleeve**, not a second copy of Unit 9’s rim bulb. Minimum bar: `sampler2D`, `vUv`, one uniform driven from React, one authored effect the student can explain. Assume **no** WebGL degree: say that the shader looks up a colour in a picture at a UV. If the word **texel** appears, gloss it in the same sentence and point at the KTX2 satellite for GPU memory. Do not teach KTX2 here.

## Deliverables

- `web-foundations/docs/lessons/en/feii/cover-shaders/index.md` (+ exercises.md, deck-outline.md)
- `lessons.yml` entry, unique slug `feii-cover-shaders`
- lesson-scribe records for B1 paragraphs
- `PHASE-X7-COLD-REVIEW.md`, `PHASE-X7-REPORT.md`

## Scope

**In:** One routed example intended for the sibling repo (`/ex3-cover-shader`). CodeSandbox-ready files that paste into the Unit 8/cover sandbox.
**Out:** KTX2 encoding (X8). WebGPU/TSL as required path. TypeScript.

## Prompt (Implementation Agent)

```text
Implement PHASE-X7 per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X7.md.

## Deliver
1. Follow fe-unit-forge STEP A against the X3 matrix row. Declare the pilot.
2. lesson-scribe for B1 paragraphs (thessia-scholar-v3; ollama ps first).
3. Recycle private/ai-assisted-3d/cursor-rules 30-shaders.mdc ideas
   (uniforms, precision, no unexplained loops) — student voice, no MCP.
4. Code: shaderMaterial with uMap + uTime (or equivalent). Label fences.
   Wrap {{ }} in raw tags. JSDoc on exported helpers.
5. Explicit: this is not Unit 9; Unit 9 remains the intro. Pasting the
   bulb fails the assignment. Explain sampler2D as “the sleeve picture”
   and UV as “where on that picture” before any jargon. KTX2 / texel
   memory story waits for X8.
6. Register lessons.yml. Link from U9 + assignment.
7. Build web-foundations; Liquid Warning empty; permalink exists in _site.
8. Hand off for cold review — do NOT mark DONE.

## Constraints
- Chicago cites from X3 only. Khronos/three.js = platform notes, dated.
- Autopilot may commit the satellite locally. Do not push web-atelier-udit.
```

## Acceptance

- [ ] Lesson registered; slug unique; permalink trailing slash
- [ ] Student HTML of a normal build contains no Ahmes/DevIAC/coat strings
- [ ] At least one CodeSandbox-ready material file with `sampler2D` / `uMap`
- [ ] “Explain this shader” checklist present (AUDIT rec 5 parity)
- [ ] `sampler2D` / UV glossed in plain language; unexplained “texel” without a definition fails
- [ ] `npm run build` in web-foundations exit 0; no Liquid Warning
- [ ] Cold review filed; blocking Fn closed

## Risks

GLSL in fences gets Liquid-eaten if `{{` appears in comments. Wrap raw. Still-success: fewer examples, all actually pasteable.
