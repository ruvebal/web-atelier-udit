# PHASE-X1 · Build the reusable SVG extrusion compiler

**Status:** VERIFYING — implementation complete; external gate and cold review required

## Goal

Create a deterministic, favicon-agnostic compiler that converts supported SVG paths into indexed front/back/side geometry plus a reviewable manifest.

This compiler is the `svg-to-rive-3d` frontend. Its output must conform to the
source-agnostic scene/mesh contract owned by `rive-animascript-3d`; the general
backend may not depend on this SVG adapter.

## Deliverables

- reusable SVG-path-to-mesh tool under `web-foundations/scripts/svg-extrusion/`;
- documented CLI: input, output, tolerance, min/max depth, palette policy;
- transform normalization, adaptive cubic flattening, signed area/centroid, winding repair, triangulation, boundary side walls and normals;
- area-derived depth per D4;
- canonical favicon golden output and a second concave/cubic fixture;
- versioned supported-subset manifest, deterministic tests, feature/rejection fixtures, and diagnostics.

## Prompt

Implement the compiler without importing lesson or favicon modules. Preserve source order and assign stable ordinal IDs. Emit JSON metadata and GPU-ready arrays from the same intermediate representation. Reject unsupported masks, strokes, nested transforms, holes, or self-intersections with actionable messages until they are deliberately supported. Hand-editing generated mesh data is forbidden. Stop at VERIFYING.

## Acceptance

- [ ] **A1** One command regenerates the favicon manifest and mesh from the canonical SVG.
- [ ] **A2** The same command/API converts the second fixture without source changes.
- [ ] **A3** Re-running produces byte-identical output.
- [ ] **A4** Every generated facet area is positive after winding normalization, for both fixtures with different `N`.
- [ ] **A5** Every depth equals the exact D4 formula within numeric tolerance.
- [ ] **A6** Invalid bounds and zero/degenerate contours fail.
- [ ] **A7** Uniform scaling preserves normalized relative depths; equal areas produce equal depths.
- [ ] **A8** Front/back triangle area matches flattened contour area within declared tolerance.
- [ ] **A9** Unsupported SVG features fail clearly rather than degrading silently.
- [ ] **A10** Transform, winding, concavity, cubic, and every V1 rejection class have fixtures; multiple subpaths/holes are rejected.
- [ ] **A11** Generated buffers, IDs and manifest counts derive from source `N`; no compiler/runtime constant equals the favicon’s fixture count.
- [ ] **A12** Adaptive cubic flattening stays within the declared projected pixel tolerance against a dense reference at the maximum supported scale.
- [ ] **A13** The manifest records D26 coordinate conventions, flattening tolerance, fill rule, signed area, centroid method and winding normalization.

## Risks

Independent overlapping facets can expose seams. Keep overlap policy explicit and separate from intrinsic depth.

## Frozen X1 grammar and mapping

V1 accepts one closed filled contour per `path`, absolute or relative `M/L/C/Z`, implicit repeated coordinate groups, decimal signs/exponents, opaque `solid-hex-or-rgb/v1` fills, and path-local affine `matrix`, `translate`, `scale`, or `rotate` transforms composed in written order. It rejects DTD/entities, nested/group transforms, multiple subpaths/holes, strokes, classes, opacity/inherited/variable paint, paint servers/effects, unknown presentation attributes, unsupported commands, degenerate rings, and self-intersections.

Every start-tag attribute is uniquely named, explicitly assigned, quoted, and fully consumed before the root/path semantic allowlists run. Unquoted, duplicate, unterminated, boolean, residual, and path-namespace attribute syntax rejects.

Transforms are baked in SVG coordinates; points are then Y-inverted and normalized by the viewBox maximum dimension into a centered, right-handed model. Fronts are CCW at Z=0 and backs extend along negative Z. Generated `manifest.json` uses `svg-to-rive-3d/v1`; `geometry.json` uses `rive-animascript-3d/generated-provider/v1` with triangle-list positions, unit normals, indices, and per-facet spans. The external X1 verifier rebuilds both fixtures twice in fresh directories and inspects these contracts independently.
