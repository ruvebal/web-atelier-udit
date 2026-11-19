# PHASE-X1 parser-closure cold review 2

**Reviewed commit:** `0e6eb8bc08eaab4bb2e8e929476a71686cd05a71` (`fix: close X1 path and transform grammar escapes`)
**Reviewer role:** fresh cascade cold reviewer; no implementation authorship
**Verdict:** **CHANGES REQUIRED — two P1 findings**
**Status ownership:** this review does not mark X1 DONE, commit, merge, or push.

## Independent review basis

I read `/Users/ruvebal/src/AGENTS.md`, the worktree `AGENTS.md`/`CLAUDE.md`, the cascade INDEX/runbook/agent contract, `DECISIONS.md`, `MATH-CONTRACTS-2026-11-11.md`, all prior X1 cold reviews and resolutions (including `PHASE-X1-PARSER-CLOSURE-REVIEW.md` and `PHASE-X1-PARSER-CLOSURE-REVIEW-RESOLUTION.md`), the runner-owned `PHASE-X1-VERIFY-LOG.md` (uncommitted runner output for this commit, as expected), the compiler/CLI/tests/independent verifier, fixtures, golden outputs, and the generated favicon manifest/geometry/fallback/scene fragment.

I did not accept the implementer report or the green gate as proof. At the reviewed commit I reran, from `web-foundations/`:

- `node scripts/svg-extrusion/test.mjs` — **PASS**;
- `node scripts/svg-extrusion/verify-x1-acceptance.mjs` — **PASS A1–A13**;
- `node scripts/svg-extrusion/test-x1-evidence-validator.mjs` — **PASS, 7 forged receipts rejected**;
- `node scripts/svg-extrusion/verify-phase-evidence.mjs X1 ../frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D` — **PASS, 13 acceptance items match**;
- fresh CLI regeneration of both fixtures into a temp dir plus `diff -qr` against committed `docs/assets/animations/fava/rive/animascript-3d/generated/favicon/` and `scripts/svg-extrusion/golden/concave-cubic/` — **byte-identical, exit 0** (`facetCount=13` canonical, `facetCount=2` fixture, `compilerVersion=1.0.5`);
- ~140 direct adversarial `compileSvg`/CLI probes covering post-close path commands, the full transform grammar, root namespace/length constraints, document/attribute/comment/PI/CDATA boundaries, paint/fill-rule semantics, topology rejection classes, dynamic `N`, and non-finite/huge coordinates.

`git status` shows only the runner-owned `PHASE-X1-VERIFY-LOG.md` modification; this review added only this file.

## Findings

### F1 — P1 blocking — non-XML whitespace is accepted as a separator everywhere the grammar tokenizes

Every whitespace skip in the compiler uses JavaScript `/\s/` or `String.prototype.trim`, which match the full Unicode `WhiteSpace`/`Space_Separator` set — including `U+000B`, `U+000C`, `U+00A0`, `U+1680`, `U+2000–U+200A`, `U+2028`, `U+2029`, `U+202F`, `U+205F`, `U+3000`, and `U+FEFF`. XML `S` is only `#x20 #x9 #xD #xA`, and the SVG path/transform grammars inherit that. `U+000B`/`U+000C` are not even valid XML characters; `U+00A0`/`U+FEFF`/ideographic space are valid XML characters but not grammar whitespace.

The over-broad class is used in `readTags` (inter-tag and inter-tag-name whitespace, `compiler.mjs:70`), `attrs` (around names, `=`, and quotes, `compiler.mjs:19,25,28`), `transformMatrix` (`trim`/`ws`, `compiler.mjs:143,153-155,204`), `parsePath` residue stripping (`[\s,]+`, `compiler.mjs:243`), style declaration trimming (`compiler.mjs:458-459`), `viewBox` splitting (`compiler.mjs:423`), and `positiveLength` (`compiler.mjs:432`).

Runnable evidence (all **ACCEPT**, `facetCount=1`, via `compileSvg`):

```text
d="M0\f0L2 0L2 2Z"                     form feed inside path data
d="M0\u00A00L2 0L2 2Z"                 NBSP inside path data
d="M0 0L2 0L2 2Z"                U+2028 inside path data
d="M0　0L2 0L2 2Z"                U+3000 inside path data
d="M0﻿0L2 0L2 2Z"                U+FEFF inside path data
<path fill="#000"\fd="..."/>            FF between attributes
<svg ...>\f<path .../></svg>            FF between tags
</svg>\f                                 FF trailing the document
transform="translate(1\f2)"              FF inside transform args
viewBox="0 0\f10 10"                     FF inside viewBox
width="\f10"                            FF inside root length
transform="translate(1 2)"        NBSP between transform args
```

`fallback.svg` is a byte copy of the source. A conforming XML/SVG consumer rejects a document containing raw `\f`/`\v` outright, and an SVG path/transform/viewBox parser rejects `U+00A0`/`U+FEFF`/`U+3000` inside `d`, `transform`, or `viewBox` because they are not `wsp`. The compiler instead normalizes them into valid separators and emits geometry the fallback cannot reproduce — the same silent source/fallback divergence class as the closed F2 transform-lexer escape, reachable through the public `compileSvg` API and CLI. NBSP inside pasted SVG markup is a realistic real-world trigger, not only a synthetic one.

This violates D20/D34/D37, the frozen grammar's strict-tokenizer contract, A9, and A10. Neither test layer exercises non-XML whitespace.

**Fix:** define one whitespace class — e.g. `const S = '[ \\t\\r\\n]'` (or `[ \t\r\n]` inline) — and use it instead of `/\s/` and `trim`-with-Unicode in `readTags`, `attrs`, `stripComments`/`readTags` boundaries, `transformMatrix`, the `parsePath` residue regex, style-declaration trimming, `viewBox` splitting, and `positiveLength`. (Plain `trim` also strips `U+FEFF`; use an explicit `^[ \t\r\n]+|[ \t\r\n]+$` trim where edge whitespace is allowed.) Add `\f`, `\v`, NBSP, and U+FEFF cases — between attributes, inside `d`, inside `transform`, and inside `viewBox` — to both `test.mjs` and `verify-x1-acceptance.mjs`.

### F2 — P1 blocking — non-finite or overflowing path coordinates compile to `null` in the emitted provider data

`parsePath`'s `num()` (`compiler.mjs:251-254`) never checks `Number.isFinite`, and nothing downstream validates the parsed ring, normalized coordinates, signed area, centroid, depth, or emitted buffers for finiteness. `transformMatrix` does check `Number.isFinite` on its arguments (`compiler.mjs:187`), so the gap is asymmetric.

Runnable evidence via the public CLI (exit 0, four output files written):

```text
input: <svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L1e999 0L2 2Z"/></svg>
manifest.json:  facets[0].depth = null, facets[0].area = null
geometry.json:  positions contains 21 null entries (Infinity/NaN → JSON null)
```

`d="M0 0L-1e999 0L2 2Z"` produces the same corruption, and `d="M0 0L1e308 0L1e308 1e308Z"` overflows the area/centroid/depth math to `NaN`/`Infinity` → `null` as well. The reason it escapes every guard: comparisons against `NaN` are false, so `Math.abs(cross(...)) <= EPS` overlap tests, `Math.abs(area) < minimumTriangleArea`, `area < 0` winding repair, and `Number.isFinite`-free `round()`/`JSON.stringify` all pass vacuously or serialize `null`. `assertSimple`, `triangulate`, `extrude`, and the manifest all emit on the corrupt ring.

This violates the "GPU-ready arrays" deliverable, D35 (`generated-provider/v1` positions/normals/indices contract), the mesh/provider invariants, A6 (degenerate/invalid contours must fail), and A8/A9 in spirit: the emitted provider data is not valid geometry, and it is produced silently with a success exit code. The independent verifier does not check `Number.isFinite` on positions/areas/depths, so this class is invisible to A1–A13 today.

**Fix:** reject non-finite path numbers at `num()` (or immediately after tokenization), and add a finiteness assertion on normalized ring points, `signedArea`, centroid, depth, and the final `positions`/`normals` arrays before serialization — fail loudly rather than emit `null`. Add `1e999`, `-1e999`, and an area-overflow (`1e308`) fixture to both test layers, and consider a finiteness check in `verify-x1-acceptance.mjs`'s `validateMesh` so the verifier itself cannot bless corrupt buffers.

## Prior-finding closure check (F1/F2/F3 of `PHASE-X1-PARSER-CLOSURE-REVIEW.md`)

| Prior finding | Result | Independent evidence |
| --- | --- | --- |
| F1 post-close implicit subpath merge | **CLOSED** | `Z`+`L`/`l`/`C`/`c`/`z`/`Z`/bare coordinates all reject (`commands after closepath` / `coordinates after close`); post-close explicit `M`/`m` still rejects as `multiple subpaths`; `M…Z` alone degenerates and rejects; valid single contours, implicit lineto groups, exponents, and trailing commas still compile. ~20 path probes, all correct. |
| F2 malformed transform argument normalization | **CLOSED** | `translate(,1)`, `translate(1,)`, `scale(,2)`, `scale(2,)`, `matrix(,,,,,)`, `rotate(,45)`, `,,,`, empty/whitespace-only, missing/double/trailing/leading separators, unterminated/extra parens, empty args, bad arity (t3/s3/r2/r4/m5/m7), unknown/uppercase/mixed-case functions, missing parens, `1e`, `1e+`, `1e999`, `+`, `.`, `;`, nested parens all reject; composed transforms, comma and whitespace separators, `rotate(45 10 10)`, sign/dot-adjacent numbers (`scale(1-2)`, `scale(1.2.3)` — legal SVG 1.1 optional `comma-wsp`), and `5.`/`.5` forms still compile in written order. |
| F3 unconstrained root namespace/viewport values | **CLOSED** | `xmlns` absent-or-exact-SVG-namespace enforced (`""`, XHTML, padded values reject); `xmlns:xlink` must be the XLink namespace; `width`/`height` must be positive unitless-or-`px` lengths and remain non-geometric (`viewBox` sole coordinate authority). Over-rejections (`10PX`, `10%`, `10 px`) are loud and consistent with the documented bounded grammar, not silent divergence. |

## Former-defect replay

| Former defect class | Result | Independent evidence |
| --- | --- | --- |
| Affine-transformed cubic flattening tolerance | **CLOSED** | `verify-x1-acceptance.mjs A12` independently dense-samples the `scale(1000 600)` transformed cubic against the declared projected tolerance; implementation test mirrors it. |
| Inline `style` strokes / unsupported presentation semantics | **CLOSED** | `style="fill:#000;stroke:#fff"`, opacity, fill-opacity, class, root opacity, mixed-case `URL(...)`, `currentColor`, `var()`, alpha/invalid fills, unknown style properties, duplicate style declarations (last-wins, CSS-consistent), case-varied property names all behave correctly. |
| Invalid fill-rule values and manifest/facet consistency | **CLOSED** | `fill-rule="banana"` and style `fill-rule:banana` reject; `evenodd`/`EvenOdd` accepted and `fillRules` reconciles with `supportedFillRules`. |
| Collinear overlap / endpoint touches / retracing / self-intersections | **CLOSED for emitted contours** | Proper crossing (bowtie), retrace, collinear overlap, degenerate contours reject; simple concave/step contours accept correctly. New F2 is a non-finite-input escape, not a topology regression. |
| Paint semantics: classes, opacity/alpha, variables, inheritance, paint servers/url(), invalid fills, case variants | **CLOSED** | `rgb()` comma form with 0–255 bounds enforced (percents, 4 parts, negatives, 256 reject); named colors, `transparent`, `hsl()`, `#abcd`, `rgba()` reject; `stroke="none"`/`"NONE"` accept. |
| Malformed/unquoted XML attributes and consuming attribute lexer | **CLOSED** | Unquoted/duplicate/unterminated/boolean/residual/namespaced attributes reject; `<`/`>`/`&`/entity/comment markup inside values reject; whitespace around `=` accepts (XML-legal). New F1 is a whitespace-*class* escape the lexer does not see. |
| Nested SVG contexts, multiple roots, explicit path closing tags, malformed self-close forms, closing-tag residue | **CLOSED** | Nested viewport/presentation SVG, multiple roots, `</path>`, `/ >`, `//>`, `/ />`, `</svg >`, uppercase tags, ns-prefixed roots, text/CDATA/PI children, comments inside tags or unterminated comments all reject; comments outside tags with markup inside are correctly ignored. |
| Dynamic facet N / deterministic regeneration / evidence sensitivity | **CLOSED** | Fresh `N=1/3/17` probes emit source-order `facet-01…facet-17` IDs, positive finite areas/depths, data-derived spans; CLI regeneration is byte-identical to committed goldens; evidence validator rejects 7 forged receipts; phase-evidence verifier passes. Overlapping independent facets compile as separate facets per D-risk note (explicit overlap policy). |

## Acceptance audit

| Item | Result | Cold-review evidence |
| --- | --- | --- |
| A1 | PASS | Fresh CLI run compiled the canonical favicon (`facetCount=13`); `diff -qr` vs committed generated output exited 0. |
| A2 | PASS | Same CLI compiled `concave-cubic.svg` (`facetCount=2`); `diff -qr` vs `golden/concave-cubic/` exited 0. |
| A3 | PASS | Independent verifier rebuilds both fixtures twice and compares hashes; my fresh regeneration was byte-identical. |
| A4 | PASS | Golden facets report positive areas; dynamic `N=1/3/17` probes also positive. |
| A5 | PASS | Recorded depths recompute from the exact D4 formula within tolerance in the independent verifier. |
| A6 | PASS for exercised cases | Invalid viewBox/depth bounds and degenerate contours reject; F2 shows non-finite contours are *not* covered — see finding. |
| A7 | PASS | Equal-area and uniform-scale relative-depth invariants pass in the independent verifier. |
| A8 | PASS for golden fixtures | Provider lengths, index bounds, facet spans, unit normals, front/back area, side-wall counts validate; F2's `null` buffers would fail area checks if ever fixture-tested, but no fixture exercises them. |
| A9 | **FAIL** | Non-XML whitespace is silently normalized into valid separators (F1), producing geometry a conforming consumer cannot reproduce from `fallback.svg`; non-finite coordinates are silently emitted as `null` provider data (F2). |
| A10 | **FAIL** | The rejection matrix omits non-XML whitespace forms and non-finite/overflowing coordinates; both are reachable grammar escapes. |
| A11 | PASS | IDs, counts, buffers, spans derive from source `N`; `N=1/3/17` probes passed; `13` remains a golden-fixture assertion only. |
| A12 | PASS | Independent verifier measures the affine-baked transformed cubic against the dense reference within declared projected tolerance. |
| A13 | PASS for accepted flat fixtures | Coordinate conventions, flattening method/tolerance, paint grammar, fill rules, signed area, centroid method, winding normalization, provider schema reconcile; F1/F2 do not add required manifest fields but produce inputs the manifest cannot truthfully describe. |

## Agentic failure-mode audit

- **Verifier mirroring:** the independent verifier is strong on topology/mesh invariants but shares two blind spots: it never feeds non-XML whitespace or non-finite coordinates, and `validateMesh` does not assert `Number.isFinite` on positions/normals/areas/depths — exactly the checks that would catch F2.
- **Checklist laundering:** A9/A10 print PASS after representative rejections while two reachable escape classes remain; the runner log's all-PASS lines are accurate for what was run but the runbook's "strict grammar" claim is broader than the tested surface.
- **Manifest self-assertion:** A13 validates declared conventions but cannot detect that a `null`-containing geometry or a whitespace-normalized path diverges from `fallback.svg`.
- **Evidence discipline:** the runner log names commit `0e6eb8b…`, exit code 0, and full gate output; `PHASE-X1-EVIDENCE.json` + baseline transcripts verify; no fabricated provenance, cloud-AI use, or hand-edited generated mesh data observed. Golden outputs are byte-identical to fresh CLI output.

## Severity summary

- P0: 0
- P1: 2 — F1 non-XML whitespace accepted as grammar separators; F2 non-finite/overflowing coordinates emit `null` provider data. Both block DONE.
- P2: 0

PHASE-X1 is **not eligible for DONE**. The immediately preceding review's F1/F2/F3 are genuinely closed with no observed regression, but this pass found two new escapes in the same strict-grammar class. Correct F1 and F2, extend both test layers, consider the `validateMesh` finiteness check, rerun the external gate, and assign another fresh closure review against the amended commit. This review does not promote X1, merge, push, or mark any phase DONE.
