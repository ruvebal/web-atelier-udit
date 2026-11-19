# PHASE-X1 final cold review

**Reviewed commit:** `88706789dbc2a62b116c7f5015fc1de7f82362ce`
**Reviewer role:** fresh closure cold reviewer; no implementation authorship
**Verdict:** **CHANGES REQUIRED — one P1 finding**
**Status ownership:** this review does not mark X1 DONE, commit, merge, or push.

## Independent review basis

I read the studio and repository contracts, the canonical `svg-to-rive-3d`
skill and all of its routed geometry/parameter/portability references, the
routed `rive-animascript-3d` skill and references, the cascade/orchestrator
contract, X1 runbook, frozen decisions, mathematical contracts, the original
X1 cold review, its resolution, the implementation diff, and the runner-owned
verify log for commit `8870678`.

I did not accept the prior verdict or the successful gate as proof. I reran:

- `node scripts/svg-extrusion/test.mjs` — pass;
- `node scripts/svg-extrusion/verify-x1-acceptance.mjs` — A1–A13 reported pass;
- `node scripts/svg-extrusion/test-x1-evidence-validator.mjs` — seven forged
  receipts rejected;
- direct adversarial calls to `compileSvg` for the four former defects and for
  additional unresolved-paint cases.

The worktree already contained the runner-owned modification to
`PHASE-X1-VERIFY-LOG.md`; this review did not alter it.

## Former-defect reproduction

| Former defect | Closure result | Independent evidence |
| --- | --- | --- |
| Magnified affine cubic error | **CLOSED** | The compiler transforms cubic control points before de Casteljau flatness evaluation. The independent A12 verifier densely samples the `scale(1000 600)` curve and enforces the declared 0.35 px projected bound. |
| Inline-style stroke | **CLOSED** | `style="fill:#000;stroke:#fff"` rejects with `path 1: strokes are unsupported`. |
| Invalid fill rule | **CLOSED** | `fill-rule="banana"` rejects; `evenodd` is accepted and facet values reconcile with `fillRules`/`supportedFillRules`. |
| Collinear overlap | **CLOSED** | `M0 0 L10 0 L5 0 L10 10 L0 10 Z` rejects with `self-intersecting collinear overlap is not supported`. Non-adjacent intersection logic also covers touches and overlap. |

The amended regression assertions are materially capable of failing the
pre-amendment implementation: they exercise transformed dense-reference error,
inline-style stroke resolution, invalid/valid fill-rule handling, and the exact
retraced collinear contour that the old code accepted. The new independent A12
measurement no longer delegates only to the implementation suite.

## Findings

### F1 — P1 blocking — unresolved path paint semantics are still silently accepted

The frozen grammar accepts **solid resolved fills** and requires unsupported
SVG semantics to fail clearly. The canonical skill likewise forbids unresolved
styles and silent visual degradation. However, `compileSvg` validates only
three inline-style keys and a few explicitly named presentation attributes; it
does not reject equivalent or appearance-changing path attributes that it does
not model.

Direct adversarial results at the reviewed commit:

```text
opacity       ACCEPT #000
fillOpacity   ACCEPT #000
cssClass      ACCEPT #000
upperUrl      ACCEPT URL(#paint)
badColor      ACCEPT not-a-color
```

For example:

```xml
<svg viewBox="0 0 10 10">
  <path fill="#000" opacity=".5" d="M0 0L2 0L2 2Z"/>
</svg>
```

is accepted. The copied SVG fallback renders a half-transparent facet, while
the generated provider records only opaque `#000`; downstream geometry/material
consumers therefore cannot reproduce the authoritative source appearance. The
same defect exists for `fill-opacity`. A `class` attribute can introduce
unresolved external/inherited styling, and the case-sensitive `/url\(/` check
accepts `fill="URL(#paint)"` even though paint servers are excluded. Arbitrary
invalid fill strings are also recorded as though they were resolved colours.

This is the same contract class as the former style-stroke defect, not an
optional expansion of V1. It violates the supported-subset rule, D20/D34, the
skill's explicit-failure invariant, and A9/A10. The independent verifier tests
representative exclusions but does not test this remaining presentation-source
surface, so it prints PASS for an implementation that still degrades silently.

Required correction: define and enforce an allowlist for path attributes that
may affect rendering/geometry, reject unresolved `class` and unsupported
presentation properties (`opacity`, `fill-opacity`, and related paint state),
validate solid fill syntax or normalize it through a bounded colour parser,
and make paint-server detection case-insensitive. Add these adversarial cases
to both the implementation suite and the independent verifier.

## Acceptance audit

| Item | Result | Cold-review evidence |
| --- | --- | --- |
| A1 | PASS | The public CLI independently regenerates the canonical fixture at `N=13`. |
| A2 | PASS | The same CLI/API regenerates the concave/cubic fixture at `N=2`. |
| A3 | PASS | Fresh-directory byte comparisons pass for manifest, geometry, fallback, and scene fragment. |
| A4 | PASS | Both fixtures have positive normalized facet areas. |
| A5 | PASS | Every recorded depth independently recomputes from D4 within tolerance. |
| A6 | PASS | Invalid viewBox/depth bounds and degenerate contours reject in the exercised cases. |
| A7 | PASS | Equal-area and uniform-scale depth invariants pass. |
| A8 | PASS | Provider lengths, index bounds, facet spans, unit normals, front/back area, and side counts validate for both fixtures. |
| A9 | **FAIL** | Unsupported/unresolved path paint semantics are silently accepted (F1). |
| A10 | **FAIL** | The V1 rejection matrix omits opacity/fill-opacity, unresolved class styling, case-varied paint servers, and invalid solid fills (F1). |
| A11 | PASS | Stable IDs, counts, spans, and buffers derive from source `N`; `13` remains a golden-fixture assertion rather than capacity. |
| A12 | PASS | Transformed cubic flattening is measured after affine baking against a dense reference. |
| A13 | PASS | Coordinate conventions, flattening method/tolerance, fill rules, area, centroid method, winding, provider schema, and spans are internally consistent for accepted fixtures. |

## Parser, topology, determinism, and schema audit

- **Parser:** M/L/C/Z absolute/relative forms, repetition, exponents, closure,
  XML structure, DTD/entity rejection, transform arity, former style/fill-rule
  regressions, and unsupported commands were inspected. F1 is the remaining
  blocking parser/presentation-boundary defect.
- **Topology:** canonical and concave/cubic meshes have in-range indices,
  facet-local spans, paired front/back triangles, declared side-wall counts,
  unit normals, and matching front area. Proper crossings, non-adjacent touches,
  retracing, collinear overlap, degeneration, and multiple subpaths reject in
  the exercised adversarial cases.
- **Determinism:** two fresh builds of each supported fixture are byte-identical
  across all four emitted artifacts.
- **Provider schema:** `geometry.json` uses
  `rive-animascript-3d/generated-provider/v1`; manifest counts agree with array
  lengths and per-facet spans, and the scene fragment references the generated
  package without encoding fixture `N`.
- **Evidence discipline:** receipt mutation tests reject seven forged variants,
  and the runner log names the reviewed commit and exit code. No fabricated
  evidence, cloud-AI use, or provenance violation was observed.

## Severity summary

- P0: 0
- P1: 1 (F1, blocking)
- P2: 0

PHASE-X1 is **not eligible for DONE**. Correct F1, rerun the external gate, and
assign another fresh closure review against the amended commit.
