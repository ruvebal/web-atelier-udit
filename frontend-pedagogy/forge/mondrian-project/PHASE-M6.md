# PHASE-M6: Liquid Mondrian editor — surface, frame, transforms, save and print

> **Track:** L2 state/export + L3 `/create/`. Owned by the editor/kiosk lane with design leads.
> **Status:** BLOCKED (M3 DONE)

## Goal

Implement `MVP-PRODUCT-SPEC.md` exactly: choose a physical/digital surface,
start from the measured work's original ratio, reshape a bounded inner frame,
transform colour and structure, compare/reset/undo, save URL/SVG/PNG, and print
through a calibrated physical-size path. The editor is inspectable HTML + CSS
Grid; JavaScript is state, pointer handling and export.

## Deliverables

- `/create/<slug>/`, `/calibrate-print/`; components
  `Editor/{Surface,Frame,Handles,Controls,Presets,Compare,Export,Print}.astro`;
  `src/scripts/editor.js`.
- Surface presets: A4 first, A3/A5/Letter, square, 4:5, 16:9, 9:16,
  custom. Physical dimensions/margins remain distinct from normalized frame.
- Transform controls: hue; explicit palette inversion; horizontal/vertical
  reflection; x/y grid offset; analyzer-baseline line-weight multiplier;
  undo, reset, press-and-hold compare.
- Pointer handles with capture; frame clamped to printable area; two-finger
  safety; ≥44 px targets. Presets are the complete non-drag alternative.
- Deterministic URL recipe (`SurfaceSpec` + `CompositionState`) and QR; SVG export with provenance/recipe metadata;
  PNG from transient canvas; print stylesheet with dynamic `@page`, optional
  crop marks and calibration warning.
- Playwright unit/journey tests plus one real A4 printer run.
- `PHASE-M6-COLD-REVIEW.md`, `PHASE-M6-REPORT.md`.

## Scope

**In:** all seven MVP steps. **Out:** kiosk/PWA profile (M7), API calls,
accounts/cloud saves/public visitor gallery, camera analysis, diagonal/free
rotation, generative compositions, neural scoring.

## Prompt (Implementation Agent)

```text
Implement PHASE-M6 per docs/DEV_PLAN/MONDRIAN/PHASE-M6.md.

## Deliver
1. Implement `Recipe`, `SurfaceSpec` and `CompositionState` from M2. On load,
   the frame is the maximal original-ratio rectangle inside printableArea.
2. Build the CSS Grid renderer and controls from M2's canonical render plan.
   Clamp `lineWeightScale` with M2's work-specific function, apply it only to
   explicit source-line thickness, rederive the plan, and leave black
   rectangles unchanged. `--line-weight-scale` exposes the applied state but
   does not scale CSS geometry a second time. Plane items sit below overlapping
   line items; every derived track remains positive and each axis sums to 1. No
   borders.
3. Implement Pointer Events. Frame corners/edges cannot leave printableArea or
   cross minimum size. Offsets move the grid under an overflow clip, not the frame.
4. Implement explicit transformations. Palette inversion uses the product
   spec's HSL/achromatic involution—not `filter: invert()`. Reflection is
   scaleX/scaleY. Every control writes state and has a preset/button alternative.
5. Implement undo (at least one step), reset, hold-to-compare, URL/QR.
6. Export canonical SVG with source credit, state recipe and app version in
   metadata. PNG rasterizes that generated SVG in a temporary canvas.
7. Print: inject the selected physical size into a same-origin print document;
   `@page`, mm units, hidden chrome, optional crop marks, “Actual size / 100%”.
   `/calibrate-print/` produces a 100 mm rule.
8. Tests + a real-printer run. Full suite. Hand off; do not mark DONE.

## Constraints
- No canvas/WebGL editor. Canvas is allowed only transiently for PNG export.
- No dependency except the vendored QR module (licence file beside it).
- Never mutate `work.yml`. No free rotation/shear. No browser `filter: invert()`.
```

## Acceptance

- State/property tests: no generated frame crosses printableArea over 1,000
  random resize/drag sequences; reset deep-equals default state; source work
  deep-equals its original object.
- Touch Playwright: drag updates URL; reload reproduces every recipe field
  (including physical/custom surface) and frame geometry within 1 px; second
  pointer is ignored.
- Every transform changes the export and is reversible. Inversion tests prove
  that explicit lines and black planes both use the current `--black` token and
  that applying the involution twice restores them. Undo restores prior state.
- Downloaded SVG parses, has expected planes/lines/viewBox/metadata and no
  external resources. PNG has selected pixel dimensions.
- Print test: generated stylesheet contains the selected physical size; real A4
  output's 100 mm calibration rule is measured and variance recorded.
- All interactive targets ≥ 44×44 CSS px (Playwright bounding-box sweep).
- axe 0 critical/serious on `/create/<slug>/`; keyboard-only and preset-only
  users can complete the journey without dragging.
- Cold review filed; blocking findings closed.

## Risks

- Browser/printer silently scales → never claim precision before calibration;
  record printer/browser/variance.
- Dynamic `@page` support differs → generate a dedicated print document and
  provide PDF/SVG download as the reliable fallback.
- Export drifts from CSS view → golden semantic comparison over state fixtures.
