# PHASE-X1 parser-closure cold review 3

**Reviewed commit:** `ce2d09a97a42a08bcba6a1e630115d9942a83579` (`fix: close X1 whitespace and finiteness escapes`)
**Reviewer role:** fresh cascade cold reviewer; no implementation authorship
**Verdict:** **CHANGES REQUIRED — one P1 finding and two P2 findings**
**Status ownership:** this review does not mark X1 DONE, commit, merge, or push.

## Independent review basis

I read `/Users/ruvebal/src/AGENTS.md`, the worktree `AGENTS.md`/`CLAUDE.md`, the cascade INDEX/runbook/agent contract, `DECISIONS.md`, all six prior X1 reviews and resolutions (cold, trust, final-trust, parser-closure ×2 including both resolutions), the runner-owned `PHASE-X1-VERIFY-LOG.md` (uncommitted runner output naming commit `ce2d09a…`, exit 0, as expected — left untouched), the compiler/CLI/tests/independent verifier, fixtures, golden outputs, and the generated favicon manifest/geometry/fallback/scene fragment.

I did not accept the implementer report or the green gate as proof. At the reviewed commit I reran, from `web-foundations/`:

- `node scripts/svg-extrusion/test.mjs` — **PASS**;
- `node scripts/svg-extrusion/verify-x1-acceptance.mjs` — **PASS A1–A13**;
- `node scripts/svg-extrusion/test-x1-evidence-validator.mjs` — **PASS, 7 forged receipts rejected**;
- `node scripts/svg-extrusion/verify-phase-evidence.mjs X1 ../frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D` — **PASS, 13 acceptance items match**;
- fresh CLI regeneration of both fixtures into temp dirs plus `diff -qr` against committed `docs/assets/animations/fava/rive/animascript-3d/generated/favicon/` and `scripts/svg-extrusion/golden/concave-cubic/` — **byte-identical, exit 0** (`facetCount=13` canonical, `facetCount=2` fixture, `compilerVersion=1.0.6`);
- `cmp` confirmed both `fallback.svg` outputs are byte-copies of their sources;
- ~230 direct adversarial `compileSvg` probes covering every JS `\s`/Unicode whitespace member in every tokenized position, non-finite/overflowing coordinates and transforms, the `viewBox`/`width`/`height` number grammars, the full transform/path/style/fill grammars, comment/PI/CDATA/DOCTYPE/decl boundaries, case sensitivity, duplicate attributes, dynamic `N`, and prior defect classes.

`git status` shows only the runner-owned `PHASE-X1-VERIFY-LOG.md` modification; this review added only this file.

## Findings

### F1 — P1 blocking — `viewBox` is parsed with bare `Number()` on separator-split tokens: hex/binary/octal literals and collapsed comma runs are silently reinterpreted as different geometry

`compileSvg` parses `viewBox` at `compiler.mjs:426-430` as:

```js
const vb = xmlTrim(ra.viewBox ?? '')
	.split(/[ \t\r\n,]+/)
	.map(Number);
if (vb.length !== 4 || vb.some((x) => !Number.isFinite(x)) || vb[2] <= 0 || vb[3] <= 0)
	throw new Error('viewBox must contain four finite values with positive bounds');
```

Two permissiveness escapes result, both unreachable by the strict number grammar used everywhere else in the compiler (`[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?`):

1. **`Number()` accepts JavaScript numeric literals that are not SVG numbers.** `Number('0x10')` → 16, `Number('0b101')` → 5, `Number('0o17')` → 15, `Number('0xa')` → 10.
2. **`[ \t\r\n,]+` collapses any run of separators into one**, so `,,`, `, ,`, `,,,` — none of which is a legal `comma-wsp` (at most one comma, optionally surrounded by whitespace) — tokenize identically to a single legal separator.

Runnable evidence (all **ACCEPT**, `facetCount=1`, via `compileSvg`):

```text
viewBox="0x10 0 10 10"        -> manifest.source.viewBox = [16,0,10,10]
viewBox="0x0 0x0 0xa 0xa"     -> [0,0,10,10]
viewBox="0b101 0 10 10"       -> [5,0,10,10]
viewBox="0o17 0 10 10"        -> [15,0,10,10]
viewBox="0,,0 10 10"          -> [0,0,10,10]   (double comma collapsed)
viewBox="0 0,,10 10"          -> [0,0,10,10]
viewBox="0 0 , , 10 10"       -> [0,0,10,10]   (comma-space-comma collapsed)
viewBox="0 0 10 , , 10"       -> [0,0,10,10]
```

`viewBox` is the sole coordinate authority for normalization (`compiler.mjs:479-482` divides by `max(vb[2],vb[3])` and recenters on `vb[0]`/`vb[1]`). `viewBox="0x10 0 10 10"` therefore emits geometry normalized against `x=16`, a value no conforming SVG consumer derives: a strict XML/SVG parser rejects `0x10` as a `number` production (hex is not in the SVG floating-point grammar), treats the `viewBox` attribute as in error, and renders the fallback with no viewBox transform — a completely different front view. The compiled `fallback.svg` is a byte copy of this same source (`cli.mjs:18`, `cmp`-verified), so the divergence is silent and total, exactly the class of the closed F1-whitespace and F2-finiteness escapes: the lexer is more permissive than the frozen grammar and silently reinterprets malformed input into different emitted data.

This violates D20/D34/D37, the frozen grammar's strict-tokenizer contract, A6 (invalid bounds must fail), A9, and A10. Neither `test.mjs` nor `verify-x1-acceptance.mjs` exercises a non-SVG-number or repeated-separator `viewBox`; the only viewBox rejection cases are non-finite values and non-positive bounds. Every other numeric site in the compiler (`parsePath` `num()`, `transformMatrix` `number()`, `positiveLength`, `rgb()` channels) is regex-guarded before `Number()` — `viewBox` is the single unguarded site.

**Fix:** parse `viewBox` with the same strict number production used for path/transform data — e.g. split on `[ \t\r\n,]+` for arity, then require each token to match `/^[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?$/` before `Number()`, and additionally reject empty tokens produced by edge separators and any separator run containing more than one comma (or simply tokenize with a `comma-wsp?`-aware scanner). Concretely `0x10`, `0b101`, `0o17`, `0,,0`, and `0 0 , , 10 10` must all reject loudly. Add hex/octal/binary and repeated-comma `viewBox` cases to both `test.mjs` and `verify-x1-acceptance.mjs` (the independent verifier's A6/A9 rejection lists currently contain no viewBox number-grammar case at all).

### F2 — P2 non-blocking — XML comment well-formedness and attribute-value character validity are not enforced

`stripComments` (`compiler.mjs:44-67`) ends a comment at the first `-->` via `indexOf` and never checks the comment body. XML 1.0 forbids `--` inside comments ("the string `--` MUST NOT occur within comments"); a conforming XML parser rejects the whole document, so `fallback.svg` breaks while the compiler emits geometry.

Runnable evidence (**ACCEPT**, `facetCount=1`):

```text
<!-- a -- b --><svg viewBox="0 0 10 10">…</svg>     (comment body contains `--`)
<svg viewBox="0 0 10 10"><!-- a -- b -->…</svg>
```

Related, same class: the free-text `id` attribute is the only path attribute whose value is stored without content validation (`attrs` rejects only `[<&>]`). Non-XML/control characters pass through into `manifest.facets[].sourceId`:

```text
<path id="a\fb" …/>    ACCEPT  (form feed — not even a valid XML 1.0 char)
<path id="a\u00A0b" …/> ACCEPT  (NBSP — valid XML char, not grammar whitespace)
```

`id` is metadata only — it cannot change geometry — which is why this is P2 rather than P1. But both cases produce a document a strict XML consumer rejects while the compiler reports success, the same fallback-divergence shape as F1 at lower blast radius. The grammar says "comments are ignored only outside tags" without defining comment-body validity, so this is arguably a documented-bounds gap rather than a contradiction; the orchestrator may instead choose to document the tolerance explicitly.

**Fix (recommended):** in `stripComments`, after locating `-->`, reject if the comment body contains `--` (scan incrementally: on `--` inside a comment, require the next char to be `>` else throw). Optionally restrict attribute values to XML-valid characters (`[^	\n\r -￿]`-style Char production minus the already-rejected markup chars) or at minimum `id`. Add `<!-- a -- b -->` and `id="a\fb"` cases to both test layers if the stricter behavior is adopted.

### F3 — P2 non-blocking — trailing comma-wsp after `Z`/`z` in path data is silently accepted

`parsePath`'s residue strip (`compiler.mjs:245`) removes `[ \t\r\n,]+` anywhere in `d`, and after `Z` the parser only inspects the next *token* (`compiler.mjs:287-289`). Commas are not tokens, so trailing separator runs after closepath vanish before the grammar ever sees them.

Runnable evidence (**ACCEPT**, `facetCount=1`):

```text
d="M0 0L2 0L2 2Z,"
d="M0 0L2 0L2 2Z,,"
d="M0 0L2 0L2 2Z, "
d="M0 0L2 0L2 2Z\n,"
d="M0 0L2 0,L2 2,Z"     (comma before Z is legal comma-wsp — accepted correctly)
```

The SVG path BNF ends `svg-path` with `wsp*` after the last command group; `comma-wsp` is only legal *between* arguments/commands. The transform lexer in the same file explicitly rejects the analogous case (`trailing transform separator in …`, `compiler.mjs:179,217`), so the two tokenizers are now inconsistent in strictness. Geometry is unaffected (the comma carries no semantics) and browsers' path parsers are lenient here, so the practical divergence risk is low — but it is a residual instance of the exact escape class this review series exists to close, and it is untested in both layers.

**Fix (recommended):** after `Z`/`z`, require the remainder of `d` to match `^[ \t\r\n]*$` (equivalently, reject any `,` after the final closepath), mirroring the transform lexer's trailing-separator rejection. Add `Z,` / `Z,,` cases to `test.mjs` and `verify-x1-acceptance.mjs`.

## Prior-finding closure check (review-2 F1/F2)

| Prior finding | Result | Independent evidence |
| --- | --- | --- |
| F1 non-XML whitespace accepted as separators | **CLOSED** | Probed all 15 JS `\s`/Unicode whitespace members (`\f`, `\v`, NBSP, U+1680, U+2000–U+200A incl. U+2007/U+2003, U+202F, U+205F, U+3000, U+2028, U+2029, U+FEFF, plus non-`\s` format chars U+200B/U+200C/U+200D/U+2060/U+00AD/U+180E/U+0085/U+3164) in ~130 positions: inside `d` (5 sites), between/inside attributes, between tags, document edges, `transform` args and tails, `viewBox`, `style` declarations, root `width`/`height`, `xmlns` values, root/path tag boundaries, and inside the XML declaration zone. **Every non-XML-whitespace case rejects** (`unsupported path syntax`, `malformed attribute syntax`, `text or malformed markup`, `viewBox`, `transform`, `unsupported style property`, `root xmlns`, `root width`). Legal XML `S` (space/tab/CR/LF) still accepted everywhere it should be, including `\t`/`\n` inside attribute values and `d`. `isXmlSpace`/`xmlTrim` replaced every `\s`/`trim` site — grep confirms no remaining `/\s/` or `.trim(` in `compiler.mjs` except the intentional `[\s\S]` in the declaration regex. |
| F2 non-finite/overflowing coordinates emit `null` | **CLOSED** | `1e999`, `-1e999` reject at `num()` (`non-finite coordinate`); `1e308`-scale coordinates reject as `degenerate contour`/`non-finite` (area overflow → `!Number.isFinite(area)`); `scale(1e308) scale(1e308)`, `matrix(1e308 …)`, `rotate(1e308)`, `translate(1e999 0)`, `matrix(1e999 …)` all reject (`non-finite path coordinates` / `invalid transform`); composed finite-but-overflowing transforms reach the ring finiteness check; `1e-999` underflow → 0 handled. `validateMesh` in `verify-x1-acceptance.mjs:51-58` now asserts `Number.isFinite` on positions, normals, facet areas, depths, centroids — the verifier blind spot is closed. CLI exit code is 1 with no partial output files on rejection (verified: `cli.mjs` writes only after `compileSvg` returns). |

## Former-defect replay (all six prior reviews)

| Former defect class | Result | Independent evidence |
| --- | --- | --- |
| Parser-closure-1 F1: post-close implicit subpath merge | **CLOSED, no regression** | `Z`+`L`/`l`/`C`/`c`/`Z`/`z`/bare coords/`M`/`m` all reject (`after closepath`/`coordinates after close`/`multiple subpaths`); single closed contours, implicit lineto groups, exponents, legal comma-wsp still compile. New F3 is a trailing-comma residue, not a subpath merge. |
| Parser-closure-1 F2: malformed transform argument normalization | **CLOSED, no regression** | ~45 transform probes: empty components, trailing/leading/double separators, unterminated/extra parens, bad arity, unknown/case-variant functions, `1e`/`1e+`, `NaN`/`Infinity` literals, `0x10`, `1_0`, `;`, nested parens all reject; legal forms (`translate(1)`, `scale(1 2)`, `rotate(45 10 20)`, `matrix(…)`, comma/space/sign/dot-adjacent numbers, `translate (1 2)` — legal SVG 1.1 wsp-before-paren) still compile in written order. |
| Parser-closure-1 F3 → parser-closure-2 root namespace/viewport | **CLOSED for xmlns/width/height; viewBox number grammar regressed into F1** | `xmlns`/`xmlns:xlink` exact-match enforced (padded/XHTML/empty reject); `width`/`height` positive unitless-or-`px` enforced and non-geometric (`0x10`, `10%`, `-10`, `0`, `10 px`, NBSP-padded all reject; `1e999` accepted but harmless — never a geometry input). `viewBox` *bounds* checks work, but its *number lexer* is the new F1 escape. |
| Parser-closure-2 F1: non-XML whitespace | **CLOSED** | See closure table above — exhaustive member-by-member probing, all reject. |
| Parser-closure-2 F2: non-finite coordinates → `null` buffers | **CLOSED** | See closure table above — all overflow/finiteness paths reject; verifier now checks buffer finiteness. |
| Cold-review F1: affine-baked cubic flattening tolerance | **CLOSED, no regression** | A12 independently dense-samples the `scale(1000 600)` transformed cubic; implementation test mirrors it; both pass. |
| Cold-review F2/F3 + trust reviews: style-hidden strokes, invalid fill-rule, collinear overlap, attribute lexer, paint semantics, document boundary | **CLOSED, no regression** | `style="fill:#000;stroke:#fff"`, opacity/fill-opacity/class/root-opacity, `URL(`/`uRl(`/`var(`/`currentColor`, `#abcd`/`rgba()`/named/`transparent`/`hsl()`, `fill-rule="banana"`, unquoted/duplicate/unterminated/boolean/residual/namespaced attributes, `<`/`>`/`&`/entity markup in values, nested/multiple `<svg>`, `</path>`, `/ >`, `//>`, `/ />`, `</svg >`, uppercase tags, text/CDATA/PI children, unterminated comments, `--`-free comments with markup inside — all behave per the frozen grammar. Bowtie/retrace/collinear-overlap/degenerate contours reject; concave and implicit-coordinate contours accept. |
| Dynamic facet N / deterministic regeneration / evidence sensitivity | **CLOSED, no regression** | Fresh `N=1/3/17` probes emit source-order `facet-01…facet-17`, positive finite areas/depths; CLI regeneration byte-identical to committed goldens (`compilerVersion=1.0.6`); evidence validator rejects 7 forged receipts; phase-evidence verifier passes; `fallback.svg` `cmp`-identical to sources. |

## Acceptance audit

| Item | Result | Cold-review evidence |
| --- | --- | --- |
| A1 | PASS | Fresh CLI compiled canonical favicon (`facetCount=13`); `diff -qr` vs committed generated output exit 0. |
| A2 | PASS | Same CLI compiled `concave-cubic.svg` (`facetCount=2`); `diff -qr` vs `golden/concave-cubic/` exit 0. |
| A3 | PASS | Independent verifier rebuilds both fixtures twice and compares hashes; my fresh regeneration byte-identical; `cmp` confirms `fallback.svg` copies. |
| A4 | PASS | Golden facets positive areas; `N=1/3/17` probes positive finite. |
| A5 | PASS | Recorded depths recompute from the exact D4 formula within tolerance in the independent verifier. |
| A6 | **FAIL** | Invalid `viewBox` *bounds* and degenerate contours reject, but invalid `viewBox` *number syntax* (`0x10`, `0b101`, `0,,0`, `, ,`) is silently accepted and reinterpreted — F1. |
| A7 | PASS | Equal-area and uniform-scale depth invariants pass in the independent verifier. |
| A8 | PASS | Provider lengths, index bounds, facet spans, unit normals, front/back area validate; `validateMesh` finiteness assertions now present. F1's mis-parsed `viewBox` would still produce internally consistent buffers, so A8's checks cannot see it — the escape is upstream at parse time. |
| A9 | **FAIL** | `viewBox="0x10 0 10 10"` compiles to geometry normalized against `x=16` while `fallback.svg` (byte copy) is a document no conforming SVG consumer reads that way — silent source/fallback divergence, the exact class A9 forbids. |
| A10 | **FAIL** | Rejection matrix omits viewBox number-grammar violations (F1), `--`-in-comment and control-char-in-`id` well-formedness (F2), and trailing comma-wsp after `Z` (F3); all reachable. |
| A11 | PASS | IDs, counts, buffers, spans derive from source `N`; `N=1/3/17` probes passed; `13` remains a golden-fixture assertion only (`test.mjs:17`); no favicon constant in `compiler.mjs`. |
| A12 | PASS | Independent verifier measures affine-baked transformed cubic against dense reference within declared projected tolerance. |
| A13 | PASS for accepted inputs | Coordinate conventions, flattening method/tolerance, paint grammar, fill rules, signed area, centroid method, winding normalization, provider schema all reconcile; F1 produces a `viewBox` the manifest records as `[16,0,10,10]` — self-consistent but not what the source declares under any conforming grammar. |

## Agentic failure-mode audit

- **Verifier mirroring:** `validateMesh` finiteness (review-2's suggested fix) is genuinely implemented at `verify-x1-acceptance.mjs:51-58` — not mirrored boilerplate. But the verifier's rejection corpus still has zero `viewBox` number-grammar cases (only `0 0\f10 10` whitespace and bound violations), so F1 is invisible to A1–A13 exactly as F2 was before ce2d09a.
- **Checklist laundering:** A6/A9/A10 print PASS after representative rejections while the `viewBox` lexer remains more permissive than every other numeric site in the same file — the "strict grammar" claim in `PHASE-X1.md`/README is broader than the tested surface by one function.
- **Manifest self-assertion:** A13 validates declared conventions; it cannot detect that `source.viewBox` was derived by `Number()` semantics rather than the SVG number grammar.
- **Evidence discipline:** runner log names commit `ce2d09a…`, exit 0, full gate output; `PHASE-X1-EVIDENCE.json` + baseline transcripts verify; no fabricated provenance, cloud-AI use, or hand-edited generated mesh data observed; golden outputs byte-identical to fresh CLI output at `compilerVersion=1.0.6`.
- **New-test discrimination:** the ce2d09a regression tests would have failed against pre-fix code — every added whitespace case ACCEPTED under `\s`-based tokenizing, and `1e999`/`1e308` compiled to `null`-bearing output with exit 0, so `assert.throws` fails on both. Genuinely discriminating.

## Severity summary

- P0: 0
- P1: 1 — F1 `viewBox` parsed via `Number()` on collapsed separators: hex/binary/octal literals and `,,`/`, ,` runs silently reinterpreted into different normalization geometry; fallback divergence. Blocks DONE.
- P2: 2 — F2 comment `--` and control/non-XML chars in `id` accepted (malformed-XML tolerance, metadata-only impact); F3 trailing comma-wsp after `Z` accepted (no semantic effect, inconsistent with transform lexer's trailing-separator rejection). Non-blocking; fix or explicitly document.

PHASE-X1 is **not eligible for DONE**. Review-2's F1/F2 are genuinely closed with exhaustive evidence and no observed regression across all six prior defect classes, but this pass found one new P1 escape in the same strict-grammar class — this time in the `viewBox` number lexer, the only numeric site not guarded by the strict number regex — plus two P2 residual-leniency items. Tokenize `viewBox` with the strict SVG number production, reject repeated/empty separators, extend both test layers, optionally tighten comment/`id` well-formedness and the post-`Z` comma residue, rerun the external gate, and assign another fresh closure review against the amended commit. This review does not promote X1, merge, push, or mark any phase DONE.
