# PHASE-X10 · Keep front-facing facets coherent during extrusion

**Status:** DONE — committed-tree exit gate passed, local cold review clear, O1 closed

## Goal

Remove the visible facet corruption during the front-facing part of the nine-second loop, especially as staggered extrusion begins (approximately phases 0.10–0.30), without weakening the true-3D inspection, source identity, or exact frontal rest.

The reported frame and local Rive CLI captures show colored fragments across otherwise solid facets near the beginning of extrusion. Diagnose the rendered scene rather than assuming a cause. The captured report must identify the phase and distinguish a genuine geometry/depth defect from intended facet motion.

## Scope and invariants

- Inspect the GPU scene around phases `0.10`, `0.12`, `0.15`, `0.20`, and `0.30` at the canonical 720×480 viewport.
- Change only the choreography/rendering behavior needed for the defect. Keep `fava-mark-static.svg` the sole geometry authority.
- Preserve dynamic facet count and source-order identities, D4 area-derived depth, exact phase-zero frontal fidelity, picking/render depth agreement, reduced-motion fallback, and the nine-second loop.
- Update every mirrored formula, generated `.riv`, relevant stills, regression tests, and directly affected claims together.
- Do not edit the user-owned demo-page changes that may coexist in the base checkout.

## Acceptance

- [ ] **A1** A deterministic baseline receipt reproduces the front-phase artifact at the named phases and records the source/runtime hashes, viewport, and command output.
- [ ] **A2** The corrected 720×480 captures at phases `0.12`, `0.15`, `0.20`, and `0.30` show coherent, solid source facets without transient colored slashes, hatching, or fragments; the cold reviewer records a visual decision for each capture.
- [ ] **A3** A focused regression test exercises the corrected early-extrusion contract and would fail against the X9 parent.
- [ ] **A4** Phase-zero raster fidelity remains within the existing declared tolerance, and the fully extruded inspect pose still visibly demonstrates side walls, backs, and depth testing.
- [ ] **A5** Existing picker/selection fixtures pass, the signed Rive asset is rebuilt from the corrected sources, and the published demo selects that asset.
- [ ] **A6** The Rive project verifies with zero errors/warnings, its test suite passes, the all-fixtures picking verifier passes, and the Web Foundations build/publication checks pass.
- [ ] **A7** `PHASE-X10-EVIDENCE.json` validates against this checklist; the report stops at VERIFYING for the external gate and cold review.

## Deliverables

- A root-cause note and before/after deterministic frame captures under `baseline/X10/`.
- A focused runtime or render-level regression test, with evidence that the assertion fails against the X9 parent.
- Corrected source and regenerated Rive artifacts, plus any directly dependent host/static still updates.
- `PHASE-X10-EVIDENCE.json`, `PHASE-X10-REPORT.md`, and the harness-written `PHASE-X10-VERIFY-LOG.md`.

## Stop condition

Stop at **VERIFYING**. Do not mark this phase DONE, promote artifacts, or change the next phase state. The independent cold reviewer must examine all four corrected front-phase captures and the full build.
