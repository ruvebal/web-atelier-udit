# PHASE-X11 · Separate facets before the inspect turn

**Status:** READY — X10 is DONE; the residual turn artifact is reproduced

## Goal

Remove the colored hatching and fragments that appear while the camera turns
into the inspect pose. Increase the facets' transport so they are separated
before that turn begins, and make the numbered semantic facet controls report
the selection the scene actually received.

The user-provided capture and local 720×480 Rive CLI probes show the remaining
artifact during the camera turn, not during the earlier frontal extrusion.
At X10, the inspect turn starts at phase 0.42, while separation starts at 0.45
and takes until 0.60 to reach its peak. At phase 0.50, the camera is already
turning but separation is only a fraction of its current 0.1 model-unit
maximum. The blue and violet facets then show depth conflicts and fragments
until the turn settles.

## Scope and invariants

- Keep the camera exactly frontal through the separation ramp; begin the
  inspect turn only after separation reaches its peak at phase 0.60, and
  complete the turn by phase 0.72 before retraction.
- Increase `SEPARATION_DIST` from 0.1 to 0.3 model units (3×). Fit the animated
  extents without changing the exact assembled/rest framing or clipping
  separated facets.
- Keep camera, shader, picker, host mirror, verifier math, and generated Rive
  asset in parity. The renderer and picker must use the same fitted camera.
- Preserve the canonical SVG as the only geometry source, source-order IDs,
  D4 area-derived extrusion, palette, 9-second loop, exact phase-zero
  projection, stable selection, reduced-motion fallback, and keyboard access.
- Fix the host's pick-acknowledgement ordering so a synchronous scene event
  cannot be missed and then announced as a failed click.
- Do not edit the pre-existing user changes in the demo page, site CSS,
  workspace settings, or lesson prose unless the host fix proves an edit
  necessary. Do not edit the read-only user screenshot.

## Acceptance

- [ ] **A1** A deterministic 720×480 X10-parent baseline and corrected capture set covers phases `0.42`, `0.46`, `0.50`, `0.54`, `0.60`, `0.64`, `0.68`, and `0.72`; the manifest binds source/runtime hashes and every capture digest. The corrected turn-in captures show no colored hatching, slashes, or fragments; each is visually reviewed.
- [ ] **A2** A focused Rive regression proves the camera remains frontal through phase `0.60`, the turn reaches its inspect pose by `0.72`, and the peak separation is exactly 3× X10. The regression fails against the X10 parent.
- [ ] **A3** Camera fitting contains the translated geometry through the separation/inspect/retract interval at landscape, square, and portrait aspects. The phase-zero raster is unchanged, and render/picker depth and screen-space coverage remain coherent.
- [ ] **A4** The browser verifier exercises the generated facet buttons by keyboard and pointer: selection and deselection reach the intended stable facet, `aria-pressed` follows the scene, and a successful pick never ends with the false “scene did not register” announcement. Static fallback controls remain usable.
- [ ] **A5** The signed Rive asset is rebuilt from the corrected sources; `rive . --verify`, `rive . --test`, all picker fixtures, the focused host test, and the Web Foundations build/publication/citation checks pass.
- [ ] **A6** `PHASE-X11-EVIDENCE.json` validates against this checklist, binds command transcripts and visual-review captures, and the implementation report stops at VERIFYING for the external gate and cold review.

## Deliverables

- X10-parent and corrected turn-transition captures plus a hash-bound manifest
  under `baseline/X11/`.
- A root-cause note identifying the overlap between camera turn-in and the
  separation ramp.
- Timing, transport, camera-fit, host-acknowledgement, and regression changes
  with all mirrors and generated artifacts refreshed.
- `PHASE-X11-EVIDENCE.json` and `PHASE-X11-REPORT.md`.

## Stop condition

Stop at **VERIFYING**. Do not mark this phase DONE or promote artifacts. The
external gate and independent cold review must inspect the corrected
transition captures, control acknowledgement, and full build.
