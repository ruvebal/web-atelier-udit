# PHASE-X2 · Render the exact frontal object in Rive GPU Canvas

**Status:** BLOCKED — X1 must be DONE

## Goal

Replace generic triangular instances with generated canonical geometry while preserving a pixel-comparable assembled front view and adding complete solids.

## Deliverables

- generated buffers wired through AnimaScript GPU resources;
- WGSL consuming indexed facet geometry, normals, colour, area and depth;
- front, back and side materials with depth testing and two-sided inspection;
- exact frontal rest and responsive projection;
- rebuilt, verified, signed `.riv` and static capture.

## Acceptance

- [ ] **A1** GPU manifest shows vertex/index buffers and depth attachment.
- [ ] **A2** All `N` generated favicon fixture IDs render with exact source fills at rest (`N = 13` for the current golden source), while renderer draw counts come from the manifest.
- [ ] **A3** Canonical SVG raster and Rive rest capture pass the recorded pixel/edge tolerance.
- [ ] **A4** A rear/oblique capture proves back faces and side walls exist.
- [ ] **A5** Largest-area facet has the greatest intrinsic depth; no depth is hand-authored.
- [ ] **A6** Narrow/wide captures contain the object without distortion.
- [ ] **A7** Known-point fixtures prove world→camera→projection order and keep application Z, clip Z and depth-buffer encoding distinct.
- [ ] **A8** Front/back/side normals are unit length, perpendicular where expected and outward under the declared winding convention.

## Risks

Pixel equality is unrealistic around antialiased boundaries. Gate geometry with edge-distance and colour-region tolerances, not a magical zero-difference claim.
