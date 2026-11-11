# PHASE-X1 · Build the reusable SVG extrusion compiler

**Status:** BLOCKED — X0 must be DONE

## Goal

Create a deterministic, favicon-agnostic compiler that converts supported SVG paths into indexed front/back/side geometry plus a reviewable manifest.

## Deliverables

- reusable SVG-path-to-mesh tool under `web-foundations/scripts/svg-extrusion/`;
- documented CLI: input, output, tolerance, min/max depth, palette policy;
- dynamic facet capacity: N is derived from the input, with no favicon-count constants in IDs, buffers, or compiler control flow;
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
- [ ] **A4** Every facet area in the current favicon golden fixture is positive after winding normalization; a second, distinct-count synthetic fixture proves N is data-driven without introducing a capacity constant.
- [ ] **A5** Every depth equals the exact D4 formula within numeric tolerance.
- [ ] **A6** Invalid bounds and zero/degenerate contours fail.
- [ ] **A7** Uniform scaling preserves normalized relative depths; equal areas produce equal depths.
- [ ] **A8** Front/back triangle area matches flattened contour area within declared tolerance.
- [ ] **A9** Unsupported SVG features fail clearly rather than degrading silently.
- [ ] **A10** Transform, winding, concavity, cubic, and every V1 rejection class have fixtures; multiple subpaths/holes are rejected.

## Risks

Independent overlapping facets can expose seams. Keep overlap policy explicit and separate from intrinsic depth.

## Geometry conventions

Evaluate source cubic Béziers before adaptive flattening at the recorded tolerance. Apply supported affine transforms, map viewBox coordinates into the declared scene frame (including the SVG-down-Y inversion), then normalize contour winding before triangulation. Compute signed area and centroid from the normalized flattened ring. Curve-flattening tolerance, adaptive subdivision, and polygon shoelace area/centroid are engineering derivations; local research supports the distinction between curve representation, tessellation, and mesh generation, not these implementation algorithms.
