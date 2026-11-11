# PHASE-X2 · Render the exact frontal object in Rive GPU Canvas

**Status:** BLOCKED — X1 must be DONE

## Goal

Replace generic triangular instances with generated canonical geometry while preserving a pixel-comparable assembled front view and adding complete solids.

## Deliverables

- generated buffers wired through AnimaScript GPU resources;
- N-derived facet buffers and draw counts, with no fixed favicon facet capacity;
- WGSL consuming indexed facet geometry, normals, colour, area and depth;
- front, back and side materials with depth testing and two-sided inspection;
- exact frontal rest and responsive projection;
- rebuilt, verified, signed `.riv` and static capture.

## Acceptance

- [ ] **A1** GPU manifest shows vertex/index buffers and depth attachment.
- [ ] **A2** All N generated IDs render with exact source fills at rest; the current golden favicon fixture asserts N=13.
- [ ] **A3** Canonical SVG raster and Rive rest capture pass the recorded pixel/edge tolerance.
- [ ] **A4** A rear/oblique capture proves back faces and side walls exist.
- [ ] **A5** Largest-area facet has the greatest intrinsic depth; no depth is hand-authored.
- [ ] **A6** Narrow/wide captures contain the object without distortion.

## Risks

Pixel equality is unrealistic around antialiased boundaries. Gate geometry with edge-distance and colour-region tolerances, not a magical zero-difference claim.

## Coordinate and transform conventions

Map normalized source contours into model/world space, then camera/view space, then perspective projection; do not fold camera math into generated mesh coordinates. Convert SVG's downward-positive Y convention once and keep it in the manifest. Derive triangle and side-wall normals from normalized cross products of the final oriented vertices. These coordinate transforms are separate from elapsed-time animation and from the source SVG representation.
