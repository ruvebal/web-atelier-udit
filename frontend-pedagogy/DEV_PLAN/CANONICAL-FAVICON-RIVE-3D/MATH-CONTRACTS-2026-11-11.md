# Mathematical contracts for reusable SVG extrusion

**Status:** research-backed implementation specification · 2026-11-11  
**Primary local source:** John Vince, *Mathematics for Computer Graphics*, 5th ed. (2017), DOI `10.1007/978-1-4471-7336-6`.

This document separates three categories deliberately:

1. equations verified in the retained monograph;
2. direct mathematical generalizations used by the compiler;
3. engineering choices that must earn trust through executable tests.

## 1. Cubic source curves

For control points `P0…P3`, evaluate the SVG cubic as:

```text
B(t) = (1-t)³P0 + 3(1-t)²tP1 + 3(1-t)t²P2 + t³P3,  0 ≤ t ≤ 1
```

Vince gives the equivalent cubic Bézier matrix form on printed p. 244. The compiler’s adaptive flattening is an engineering extension: recursively split with de Casteljau at `t = 1/2` until both control points lie within the model-space tolerance corresponding to the configured maximum screen error.

Required tests:

- `B(0)=P0`, `B(1)=P3`;
- flattened endpoints and source joins are preserved exactly;
- dense-reference projected deviation never exceeds the declared pixel tolerance at maximum scale;
- scaling the viewBox cannot silently loosen the screen-space promise.

## 2. Signed area, winding and centroid

For an oriented triangle, the signed doubled area is the 2D cross-product sum:

```text
2A = (x0y1-x1y0) + (x1y2-x2y1) + (x2y0-x0y2)
```

Reversing vertex order reverses the sign. Vince establishes the triangle case on printed p. 114. The reusable compiler may generalize the same cyclic sum to a closed polygon:

```text
A = 1/2 Σᵢ (xᵢyᵢ₊₁ - xᵢ₊₁yᵢ)
```

That polygon formula is recorded as a derivation, not a directly retained quotation. SVG’s downward Y axis reverses the apparent Cartesian winding, so transforms and axis normalization happen before the compiler declares front winding.

For pivots, prefer the area-weighted centroid of the generated non-overlapping triangles. Vince supports mass-weighted centroids on printed pp. 311–315; the mesh implementation applies triangle area as mass. This avoids maintaining a second contour-centroid formula.

Required tests:

- a `4×3` right triangle has area magnitude `6`;
- reversing order flips sign, not magnitude;
- summed triangle area matches flattened contour area within a scale-relative tolerance;
- degenerate and self-intersecting contours fail rather than producing unstable centroids.

## 3. Extrusion and normals

For triangle vertices `a,b,c`:

```text
n = normalize((b-a) × (c-a))
```

The cross product, right-hand orientation and unit normal are supported by Vince, printed pp. 112–113. Front/back winding is opposite; each boundary edge produces two side triangles whose outward orientation follows the normalized contour winding.

Required tests: unit length, expected front/back sign, side-normal perpendicularity to both boundary edge and extrusion direction, and no missing rear geometry during 360° inspection.

## 4. Camera and perspective

Vince separates world-to-camera conversion from camera-to-projection-plane conversion (printed pp. 200, 204–205). Under the book’s convention:

```text
xp = -d xc / zc
yp =  d yc / zc
```

The implementation may use a different handedness or clip convention, but it must declare it and test an equivalent known point. Never reuse this perspective division as if it also defined WebGPU/WebGL depth encoding.

Required tests:

- model → world → view → projection order;
- face-on canonical source frame;
- near-plane rejection/clipping behavior;
- separate manifest/debug values for application Z, camera Z, clip Z and final depth.

## 5. Time and orientation

Linear interpolation is:

```text
v(t) = (1-t)v0 + tv1
```

Vince relates `t` to animation frames and distinguishes uniform spacing from nonlinear timing (printed pp. 216–219). Free 3D orientation uses normalized quaternion interpolation rather than componentwise Euler interpolation. For unit quaternions:

```text
q(t) = sin((1-t)θ)/sinθ · q0 + sin(tθ)/sinθ · q1
cosθ = q0 · q1
```

See Vince, printed pp. 229–231. Near-identical quaternions require a stable normalized-linear fallback.

Pointer/camera damping uses the exact constant-target ODE step:

```text
α = 1 - exp(-λΔt)
x ← x + (target-x)α
```

No adequate local source was found for this damping equation; it is an engineering derivation and must be described that way. Equivalent total elapsed time must converge equivalently at 30, 60 and 144 Hz, with long frame gaps bounded deliberately.

## 6. Depth-aware picking

Vince’s printed pp. 277–278 support signed-area point inclusion for oriented 2D triangles. The scene’s 3D ray/triangle method is an engineering choice because the local search did not surface an evaluator-safe source for it.

Contract:

1. convert raw canvas coordinates to normalized device coordinates;
2. unproject through the inverse current projection/view matrices;
3. transform the ray or current animated triangles consistently;
4. apply barycentric bounds `u≥0`, `v≥0`, `u+v≤1`;
5. reject negative distance and GPU-culled faces;
6. choose the nearest positive visible hit, independent of draw order.

Fixtures cover interior, edge, vertex, miss, backface, overlap, separated animation, selected Z offset, touch, and multiple source facet counts `N`.

## Evidence boundary

Evaluator-safe Vince nodes used in discovery include cubic Bézier `0cd5672a-361a-58e7-921c-3efde2fcb9fc`, signed area `a7785f44-378f-5cdb-b032-ec2bbd9e0513`, perspective `7f4c59d2-075a-5bac-b909-e4af6b7afdf2`, quaternion interpolation `350fa092-ad9f-5232-8b94-f19cd1b4ea80`, and centroid `31afc83b-a7b2-50ab-9ea0-b0249becdd4e`. Printed folios were checked from the full PDF because Ahmes formula nodes can be blank and resolver pages use PDF sequence.

No adequate local source was found for adaptive flattening error bounds, general polygon centroid, Möller–Trumbore picking, exponential damping, or GPU depth mapping. These remain explicitly labelled engineering contracts until separately grounded.
