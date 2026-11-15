# PHASE-X4 · Expose a resilient responsive web specimen

**Status:** BLOCKED — X3 must be DONE

## Goal

Integrate the real 3D asset into the comparison route without surrendering theme, semantics, reduced motion, fallback, or responsive quality.

## Deliverables

- live themed host in the demo’s Rive + AnimaScript section;
- demo/lesson asset references retargeted for the X2 shader rename (`prismatic-favicon.wgsl` → `canonical-favicon.wgsl`); surrounding host copy that still describes the old prism scene is refreshed here, with lesson prose owned by X5;
- pause/play, reset and `N` generated semantic facet controls;
- status announcements and selected-state synchronization;

> Uniform contract (fixed in X3 cold review F1): the frame uniform block is 192 bytes — camera/choreography through byte 143, `camDir` at byte 144, padding at 156, and the eight `u32` selection words at bytes 160–191, matching the WGSL `Frame` struct (`camDir` then `selection: array<vec4<u32>,2>`). `updateUniforms()` uploads on `advance`, `toggleFacet`, and `resetSelection`; the shader draws the highlight and camera-relative offset, so selected-state sync must read the same `x3pick`/selection events the scene consumes — do not assume a highlight exists without the bitset upload.

- static canonical fallback and runtime timeout/error handling;
- reduced-motion mode with no automatic orbit/build loop;
- viewport/lifecycle cleanup.

## Acceptance

- [ ] **A1** Mouse, touch, Wacom-like fine motion and keyboard paths are tested.
- [ ] **A2** All `N` source facets generate selectable semantic controls without relying on colour alone.
- [ ] **A3** Dark/light theme and 320px-to-wide responsive layouts pass capture review.
- [ ] **A4** Reduced motion loads an assembled still object and deliberate controls remain usable.
- [ ] **A5** Runtime failure shows the static source mark and truthful status.
- [ ] **A6** No canvas, observer, animation frame or listener leaks after teardown.

## Risks

The Rive GPU runtime does not turn canvas pixels into DOM semantics. Keep the semantic twin explicit and synchronized.
