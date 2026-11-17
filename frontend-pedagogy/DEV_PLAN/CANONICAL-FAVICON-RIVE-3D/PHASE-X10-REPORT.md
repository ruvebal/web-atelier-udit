**Status:** VERIFYING
**Branch:** `cascade/CANONICAL-FAVICON-RIVE-3D-10`
**Worktree:** `/Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-10`
**Base:** `2a8dc68` (`plan: add X10 front-phase facet regression`)

## Implemented

The captured defect was a choreography overlap, not damaged SVG geometry,
triangulation, or a picker/depth mismatch. The staggered extrusion spans
phases 0.10–0.42, while the X9 camera turn began at 0.12. This projected
back/side caps over neighbours that were still extruding. The inspect turn
now starts at `EXTRUDE_START + EXTRUDE_SPAN`; the camera remains frontal
through the staggered build, then turns while the facets are fully extruded.

Changed or generated:

- `web-foundations/docs/assets/animations/fava/rive/animascript-3d/choreo.as`
- `web-foundations/docs/assets/animations/fava/rive/animascript-3d/tests/interaction-test.as`
- `web-foundations/docs/assets/js/favicon-motion/rive-3d-scene.mjs`
- `web-foundations/scripts/svg-extrusion/verify-picking.mjs`
- `web-foundations/scripts/svg-extrusion/capture-x10-front-phase.mjs`
- `web-foundations/scripts/svg-extrusion/verify-x10-front-phase.mjs`
- `web-foundations/scripts/svg-extrusion/verify-x10-acceptance.mjs`
- `web-foundations/scripts/svg-extrusion/capture-x10-evidence.mjs`
- `web-foundations/docs/assets/animations/fava/rive/animascript-3d/build/fava_prismatic_3d.riv`
- `web-foundations/docs/assets/animations/fava/rive/animascript-3d/build/x10-baseline/` — preserved baseline fixtures
- `frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/baseline/X10/` — root-cause note, deterministic before/after captures, manifests, sanitized local-publish receipt, and command transcripts
- `frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/build/x10-checks/A6.json`
- `frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/PHASE-X10-EVIDENCE.json`
- this report

The user-owned demo page was not edited. The published demo's host script still
selects `build/fava_prismatic_3d.riv`. The signed local export is 700,467 bytes,
SHA-256 `7694b97a44255d1e12de94db8f15dfe350e51a70cff01db25118c138c60080d4`;
the built `_site` asset is byte-identical.

## Verification run

- `rive . --publish=local` — exit 0; published the signed asset with 0 errors
  and 0 warnings. The CLI noted the current plan's Rive splash-screen
  watermark; this does not change the required signed local export.
- `rive . --verify` — exit 0, 0 errors, 0 warnings.
- `rive . --test` — exit 0, 23/23 passed, including the early-extrusion
  frontal-camera regression.
- Against the X9 choreography, the new regression exited 6 with 22/23 tests
  passing; it failed at phases 0.15, 0.20, and 0.30. The saved log records
  inspect weights 0.039744, 0.241664, and 0.808704.
- `node scripts/svg-extrusion/verify-x10-front-phase.mjs` — PASS A1, A2, A4.
  Corrected captures at 0.12, 0.15, 0.20, and 0.30 are each byte-identical
  to phase zero (`682cce47…f3be2f02f`). The 0.72 inspect capture remains
  distinct and byte-identical to the X9 inspect capture.
- The four corrected front-phase captures and the phase-zero/inspect pair
  received an implementer visual inspection, recorded with image digests in
  the evidence receipt. The independent cold reviewer must still record their
  separate decision for each of the four A2 captures.
- `node scripts/svg-extrusion/verify-picking.mjs --all-fixtures` — exit 0,
  A1–A12 passed.
- Pinned Web Foundations command
  `PATH="/Users/ruvebal/.rbenv/shims:$PATH" RBENV_VERSION=3.3.11 BUNDLE_PATH=vendor/bundle pnpm build`
  — exit 0. Jekyll, publication-safety, and citation checks passed. The build
  emitted non-blocking npm configuration and stale Browserslist/Baseline data
  notices.
- `node scripts/svg-extrusion/capture-x10-evidence.mjs` — exit 0; wrote all
  seven acceptance items and immutable command transcripts.
- `node scripts/svg-extrusion/verify-phase-evidence.mjs X10 ../frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D`
  — PASS, seven acceptance items match the runbook.
- `git diff --check` — exit 0.

The initial Web Foundations attempts found the pinned Ruby and JavaScript
dependencies absent in this worktree. The locked packages were installed
locally (`pnpm install --frozen-lockfile` and pinned `bundle install`); no
lockfile or tracked dependency declaration changed. The required pinned build
then passed.

## Remaining handoff

The evidence receipt is valid and reports `VERIFYING`. The harness runner must
now invoke `PHASE-X10.exit-gate.sh` and preserve its transcript as
`PHASE-X10-VERIFY-LOG.md`. The independent cold reviewer must inspect the four
corrected A2 captures and the full build, recording a separate visual
decision for each capture. I did not invoke the external gate.

**Resume point:** run the external X10 exit gate, then conduct the independent
cold review. No phase promotion or successor-state change has been made.
