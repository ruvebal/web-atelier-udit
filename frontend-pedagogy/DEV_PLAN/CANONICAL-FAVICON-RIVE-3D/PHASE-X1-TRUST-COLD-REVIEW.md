# PHASE-X1 final trust cold review

**Reviewed commit:** `f1f68eb1017e41a96a8914ffde0ecc5826ccd74c`
**Reviewer role:** fresh independent trust reviewer; no implementation authorship
**Verdict:** **CHANGES REQUIRED — one P1 finding**
**Status ownership:** this review does not mark X1 DONE, commit, merge, or push.

## Independent review basis

I read the studio and repository contracts, the canonical `svg-to-rive-3d`
skill and its parameter, geometry, and portability references, the routed
`rive-animascript-3d` contract, the cascade/orchestrator plan, X1 runbook,
frozen decisions, mathematical contracts, both preceding X1 cold reviews and
their resolution documents, the current runner-owned verify log, the phase
evidence, implementation diff, compiler, generated artifacts, and both test
layers.

I did not accept the prior verdicts or successful external gate as proof. At
the reviewed commit I reran:

- `node web-foundations/scripts/svg-extrusion/test.mjs` — pass;
- `node web-foundations/scripts/svg-extrusion/verify-x1-acceptance.mjs` — A1–A13 reported pass;
- `node web-foundations/scripts/svg-extrusion/test-x1-evidence-validator.mjs` — seven forged receipts rejected;
- direct adversarial `compileSvg` calls for transformed cubics, inline stroke,
  invalid fill rule, collinear overlap, opacity, fill opacity, classes,
  mixed-case paint-server functions, invalid fills, admitted fill variants,
  and malformed/unquoted attribute variants.

The worktree already contained the runner-owned modification to
`PHASE-X1-VERIFY-LOG.md`. This review did not alter that log.

## Former-failure audit

| Former failure | Result | Independent evidence |
| --- | --- | --- |
| Magnified affine cubic | **CLOSED** | Both test layers exercise affine-baked control points; A12 densely samples the magnified cubic against the declared projected tolerance. |
| Inline stroke | **CLOSED for parsed attributes/styles** | `style="fill:#000;stroke:#fff"` rejects clearly. |
| Invalid fill rule | **CLOSED for parsed attributes/styles** | `fill-rule="banana"` rejects, while `evenodd` is admitted and reconciled with the manifest. |
| Collinear overlap | **CLOSED** | The exact retraced contour `M0 0 L10 0 L5 0 L10 10 L0 10 Z` rejects. |
| Opacity / fill opacity / class | **CLOSED only for quoted XML attributes** | Quoted `opacity`, `fill-opacity`, and `class` reject; malformed unquoted variants evade parsing (F1). |
| Mixed-case `URL(...)` | **CLOSED** | Attribute and inline-style case variants reject through case-insensitive paint-function checks. |
| Invalid and alpha-bearing fills | **CLOSED for parsed fill values** | Arbitrary text, seven-digit hex, alpha hex, `rgba()`, `currentColor`, and `var()` reject; 3/6-digit hex and bounded comma-form `rgb()` pass. |

The added quoted-paint assertions would fail against `8870678`: that version
accepted the exact opacity, fill-opacity, class, mixed-case URL, and invalid
fill cases newly present in both test layers. The regression tests are
therefore materially pre-fix-sensitive for the finding they were written to
close. They do not cover F1's parser-evasion variants.

## Finding

### F1 — P1 blocking — malformed/unquoted attributes evade the closed presentation boundary

The compiler's `attrs()` helper extracts only quoted `name="value"` or
`name='value'` pairs. `assertSafeXmlStructure()` checks element nesting but
does not validate the remaining tag text as XML attribute syntax. Consequently
unparsed tokens are silently discarded before the path/root allowlists run.

Direct results at `f1f68eb`:

```text
opacity=.5                         ACCEPT
class=x                            ACCEPT
vector-effect=non-scaling-stroke   ACCEPT
```

For example, this input compiles successfully and emits an opaque facet:

```xml
<svg viewBox="0 0 10 10">
  <path fill="#000" opacity=.5 d="M0 0L2 0L2 2Z"/>
</svg>
```

The input is not well-formed XML, but accepting it is worse than rejecting it:
the unsupported appearance token disappears silently, contradicting the V1
closed paint boundary and the skill's explicit-failure invariant. The same
mechanism bypasses arbitrary future presentation/geometry attributes. This
violates A9 and A10 and weakens D20/D34's claim that unsupported semantics fail
with diagnostics.

Required correction: use a strict XML parser or make the bounded parser prove
that every non-whitespace character in each start tag belongs to exactly one
valid quoted attribute (also rejecting duplicate attributes and malformed
residue). Add malformed/unquoted path and root cases to both the implementation
suite and independent verifier. The correct result is explicit rejection, not
support for HTML-style unquoted SVG attributes.

## Acceptance audit

| Item | Result | Trust-review evidence |
| --- | --- | --- |
| A1 | PASS | Public CLI regenerates the canonical fixture and observes dynamic `N=13`. |
| A2 | PASS | The same API/CLI converts the concave/cubic fixture at `N=2`. |
| A3 | PASS | Both test layers compare fresh deterministic generations; no nondeterministic field was found. |
| A4 | PASS | Positive normalized facet areas are asserted for both fixture counts. |
| A5 | PASS | Recorded depths recompute from D4 within tolerance. |
| A6 | PASS | Invalid viewBox/depth bounds and degenerate contours reject in the exercised cases. |
| A7 | PASS | Equal-area and uniform-scale relative-depth invariants pass. |
| A8 | PASS | Array lengths, index bounds, spans, normals, front/back area, and side-wall counts validate for both fixtures. |
| A9 | **FAIL** | Malformed/unquoted unsupported presentation attributes are ignored rather than rejected (F1). |
| A10 | **FAIL** | The V1 rejection matrix omits malformed attribute syntax and parser-residue evasions (F1). |
| A11 | PASS | IDs, counts, buffers, spans, and loops derive from source `N`; `13` is confined to golden-fixture assertions/evidence. |
| A12 | PASS | Affine-baked adaptive cubic flattening is independently compared with a dense transformed reference. |
| A13 | PASS for accepted well-formed fixtures | Coordinate, flattening, paint, fill-rule, area/centroid, winding, provider-schema, and span records reconcile with emitted data. |

## Determinism, dynamic-N, topology, and provider audit

- **Dynamic-N genericity:** the canonical `N=13` and second-fixture `N=2`
  travel through the same compiler. Facet IDs, depth calculation, provider
  arrays, spans, and manifest counts are data-derived; no runtime capacity of
  thirteen was found.
- **Topology:** fronts and reversed backs share valid triangulation; boundary
  edges generate paired side triangles; indices remain facet-local and in
  range; unit normals and area sums pass. Proper crossings, non-adjacent
  touches, retracing, collinear overlap, degeneration, and multiple subpaths
  reject in the tested well-formed inputs.
- **Provider schema:** `geometry.json` declares
  `rive-animascript-3d/generated-provider/v1`; manifest counts agree with
  provider array lengths and facet spans; the scene fragment references the
  generated provider without encoding either fixture count.
- **Evidence discipline:** the external verify log identifies `f1f68eb`, exit
  code zero, and all gate commands. Receipt mutation tests reject seven forged
  variants. No fabricated provenance, cloud-AI use, or hidden fixture-specific
  geometry was observed.

## Severity summary

- P0: 0
- P1: 1 (F1, blocking)
- P2: 0

PHASE-X1 is **not eligible for DONE**. Correct F1, rerun the external gate, and
assign a fresh closure review against the amended commit.
