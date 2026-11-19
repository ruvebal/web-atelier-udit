# PHASE-X1 parser-closure cold review

**Reviewed commit:** `e4949b2d72ed692ad532a273fe0d71c16fc17736` (`fix: close X1 SVG document grammar escapes`)
**Reviewer role:** fresh cascade cold reviewer; no implementation authorship
**Verdict:** **CHANGES REQUIRED — two P1 findings and one P2 hardening finding**
**Status ownership:** this review does not mark X1 DONE, commit, merge, or push.

## Independent review basis

I read `/Users/ruvebal/src/AGENTS.md`, the worktree `AGENTS.md`/`CLAUDE.md`, the cascade INDEX/runbook/agent/decision/math-contract files, all prior X1 cold reviews and resolutions, the runner-owned `PHASE-X1-VERIFY-LOG.md`, the phase evidence, the compiler/CLI/tests/independent verifier, generated favicon and second-fixture artifacts, and the canonical `svg-to-rive-3d` / `rive-animascript-3d` skills plus routed references.

I did not accept the implementer report or prior green gates as proof. At the reviewed commit I reran:

- `node scripts/svg-extrusion/test.mjs` from `web-foundations/` — **PASS**;
- `node scripts/svg-extrusion/verify-x1-acceptance.mjs` from `web-foundations/` — **PASS A1–A13**;
- `node scripts/svg-extrusion/test-x1-evidence-validator.mjs` from `web-foundations/` — **PASS, 7 forged receipts rejected**;
- fresh CLI regeneration of both golden fixtures into temporary directories and `diff -qr` against the committed outputs — **byte-identical, diff exit 0**;
- direct adversarial `compileSvg` probes for every prior defect class plus post-close path commands, malformed transform argument lists, document-boundary variants, quoted markup, comments, namespaces, duplicate/unquoted attributes, stray slashes, foreign elements, and dynamic facet counts.

The worktree already contained the runner-owned modification to `PHASE-X1-VERIFY-LOG.md`; this review did not alter it. `git status` still shows only that runner-owned modification.

## Findings

### F1 — P1 blocking — `Z` followed by a non-moveto command creates an implicit second subpath that is silently merged into one contour

SVG 2 §9.3.4 says that when a `closepath` is followed immediately by any command other than `moveto`, the next subpath starts at the same initial point as the current subpath. Compiler V1 explicitly rejects multiple subpaths/holes, but `parsePath` only increments `subpaths` on `M`/`m` (`compiler.mjs:204-211`). After `Z` it sets `cmd = null` (`compiler.mjs:223-227`), after which the main loop accepts the next command letter as a new command (`compiler.mjs:199-201`). An `L` or `C` after `Z` is therefore treated as a continuation of the same contour instead of rejected or preserved as a second subpath.

Runnable evidence:

```text
compileSvg('<svg viewBox="0 0 100 100"><path fill="#000" d="M75,55L95,95L60,75ZL10,55L60,25L75,5Z"/></svg>')
→ ACCEPT facetCount=1 contourVertexCount=6 frontTriangleCount=4 area=0.25
```

The same result occurs for the equivalent relative form (`...Zl-65,0l50,-30l15,-20Z`). Per the SVG rule, the source has two subpaths sharing the initial point: triangle `A-B-C-A` and quadrilateral `A-D-E-F-A`. The compiler emits one six-vertex contour `A-B-C-D-E-F-A`, replacing the two close/reopen edges `C-A` and `A-D` with a single chord `C-D`. The copied `fallback.svg` preserves the source path data, while `geometry.json` encodes a different filled region. This is silent source/fallback divergence for an explicitly excluded V1 class.

This violates D20/D34, the frozen X1 grammar’s “one closed filled contour per `path`” / “multiple subpaths/holes are rejected” contract, A9, and A10. The current implementation and independent tests do not include any `Z` followed by `L`/`C` case, so the official verifier still prints PASS.

**Fix:** after a closepath, reject every subsequent drawing command before end-of-path (explicit `M` already rejects as a second subpath; `L`/`C`/relative forms must reject as implicit subpaths). Add absolute and relative post-close `L` and `C` fixtures to both `test.mjs` and `verify-x1-acceptance.mjs`.

### F2 — P1 blocking — the transform argument lexer drops empty components and accepts malformed transform lists

`transformMatrix` extracts function bodies with `[^)]*`, splits arguments on `[\s,]+`, and then `.filter(Boolean)` (`compiler.mjs:145-150`). The residue check removes only whitespace and commas (`compiler.mjs:143-144`). Empty arguments therefore disappear before arity validation, and a transform list containing only separators is accepted as identity.

Runnable evidence:

```text
transform="translate(,1)"              ACCEPT (compiled as translate(1,0))
transform="translate(1,)"              ACCEPT (compiled as translate(1,0))
transform="scale(,2)"                  ACCEPT (compiled as scale(2,2))
transform="matrix(,1,0,0,1,0,0)"        ACCEPT (compiled as matrix(1,0,0,1,0,0))
transform="rotate(,45)"                ACCEPT (compiled as rotate(45))
transform=",,,"                         ACCEPT (identity)
```

SVG transform grammar requires each function argument to be a number and does not permit empty components or trailing argument separators. Browsers are also not consistent about excess separators between transform functions, so silently choosing one interpretation makes the deterministic provider diverge from the copied fallback in a browser-dependent way. This is the same explicit-failure class as the prior malformed-attribute finding: malformed supported-feature syntax is normalized instead of rejected.

This violates the bounded/diagnostic subset contract, D20/D34, A9, and A10. Neither test layer exercises empty transform arguments or separator-only transform lists.

**Fix:** replace the regex/split/filter parser with a strict transform-list tokenizer that requires at least one valid function, legal function separators, exact numeric arity, and no empty components. Add malformed cases (`translate(,1)`, `translate(1,)`, `scale(,2)`, `matrix` with an empty component, `rotate(,45)`, `,,,`) to both test layers.

### F3 — P2 non-blocking — root namespace and viewport attribute values are allowlisted but unconstrained

The root allowlist accepts `xmlns`, `xmlns:xlink`, `width`, and `height` without validating their values (`compiler.mjs:359-362`). Direct probes accept `xmlns="http://www.w3.org/1999/xhtml"`, no `xmlns`, `xmlns:xlink="banana"`, and `width="banana" height="banana"`. Namespace-prefixed elements/attributes do reject, so this is not a prefix escape; it is an unconstrained-value hardening gap. The frozen grammar is local-name based and does not explicitly require SVG namespace validation, so I do not count this as blocking X1, but the fallback fidelity of non-SVG namespace declarations should be either constrained or documented before promotion.

**Fix/defer:** require `xmlns` to be absent or the SVG namespace (and decide whether `xmlns:xlink` is needed at all), validate `width`/`height` as SVG lengths or reject them, and add fixtures. This may be deferred in `DECISIONS.md` if the orchestrator accepts local-name-only parsing.

## Former-defect replay

| Former defect class | Result | Independent evidence |
| --- | --- | --- |
| Affine-transformed cubic flattening tolerance | **CLOSED** | `verify-x1-acceptance.mjs A12` independently dense-samples the `scale(1000 600)` transformed cubic against the declared projected tolerance; implementation test does the same after affine bake. |
| Inline `style` strokes / unsupported presentation semantics | **CLOSED for parsed attributes/styles** | `style="fill:#000;stroke:#fff"`, opacity, fill-opacity, class, root opacity, mixed-case `URL(...)`, `currentColor`, `var()`, alpha/invalid fills, and unknown style properties reject. |
| Invalid fill-rule values and manifest/facet consistency | **CLOSED** | `fill-rule="banana"` rejects; `evenodd` is accepted and `fillRules` reconciles with facet values and `supportedFillRules`. |
| Collinear overlap / endpoint touches / retracing / self-intersections | **CLOSED for emitted contours** | Proper crossing, the prior retraced collinear contour, non-adjacent touches, and degenerate contours reject. F1 is a different escape: a supported multi-subpath source is merged before simplicity checking. |
| Paint semantics: classes, opacity/alpha, variables, inheritance, paint servers/url(), invalid fills, case variants | **CLOSED for quoted well-formed attributes/styles** | All named quoted cases reject; admitted 3/6-digit hex and bounded comma-form `rgb()` pass. |
| Malformed/unquoted XML attributes and consuming attribute lexer | **CLOSED for ordinary attribute tokens** | Unquoted values, duplicates, namespaced path attrs, boolean/residual tokens, unterminated values, and quoted `<`/`>`/`&`/comment markup reject. |
| Nested SVG contexts, multiple roots, explicit path closing tags, malformed self-close forms, closing-tag residue | **CLOSED for tested document shapes** | Nested viewport/presentation SVG, multiple roots, `</path>`, `</path junk>`, `/ >`, `//>`, `/ />`, text/CDATA/PI children, foreign elements, and comments inside tags reject. F1/F2 are remaining path-value escapes outside that document-shape closure. |

Additional boundary probes: quoted `>`/`&`/`<` in attribute values reject; comments containing markup outside tags are ignored correctly; comments inside tags or attribute values reject; duplicate attributes reject; namespace-prefixed element/attribute names reject; whitespace around `=` is accepted as XML allows. Dynamic-N probes compiled `N=1`, `N=3`, and `N=17` with source-order `facet-01…facet-17` IDs and data-derived spans; no favicon-count capacity assumption was found.

## Acceptance audit

| Item | Result | Cold-review evidence |
| --- | --- | --- |
| A1 | PASS | Public CLI regenerates the canonical favicon output; fresh `diff -qr` against committed `docs/assets/animations/fava/rive/animascript-3d/generated/favicon/` exited 0 with `facetCount=13`. |
| A2 | PASS | The same CLI/API converts `fixtures/concave-cubic.svg` at `facetCount=2`; fresh diff against `scripts/svg-extrusion/golden/concave-cubic/` exited 0. |
| A3 | PASS | The independent verifier rebuilds both fixtures twice and compares hashes; my fresh CLI regeneration also matched committed outputs byte-for-byte. |
| A4 | PASS | Both golden fixtures report positive normalized facet areas; dynamic `N=1/3/17` probes also produced positive areas. |
| A5 | PASS | Recorded depths independently recompute from the exact D4 formula within tolerance. |
| A6 | PASS | Exercised invalid viewBox/depth bounds and degenerate contours reject; F1/F2 are grammar escapes rather than failures of the exercised A6 cases. |
| A7 | PASS | Equal-area and uniform-scale relative-depth invariants pass in the independent verifier. |
| A8 | PASS | Provider lengths, index bounds, facet-local spans, unit normals, front/back area, and side-wall counts validate for both fixtures. F1 produces a self-consistent mesh for the wrong contour, so this is an A9/A10 failure rather than an A8 topology failure. |
| A9 | **FAIL** | Supported post-close subpath semantics are silently merged (F1), and malformed transform argument lists are silently normalized (F2); F3 is a non-blocking namespace/value hardening gap. |
| A10 | **FAIL** | The rejection matrix omits implicit post-close subpaths (`Z` + `L`/`C`, absolute and relative) and malformed transform argument syntax (F1/F2). |
| A11 | PASS | IDs, counts, buffers, spans, and loops derive from source `N`; independent `N=1/3/17` probes passed and `13` remains a golden-fixture assertion. |
| A12 | PASS | The independent verifier measures the affine-baked transformed cubic against the dense reference and declared projected tolerance. |
| A13 | PASS for accepted flat fixtures | Coordinate conventions, flattening method/tolerance, paint grammar, fill rules, signed area, centroid method, winding normalization, provider schema, and spans reconcile. F2 does not add a required resolved-transform field, but the raw malformed transform is preserved while geometry uses a guessed parse. |

## Agentic failure-mode audit

- **Verifier mirroring:** the independent verifier is materially stronger than before—it rebuilds fresh outputs, checks mesh spans/areas/normals, and measures transformed cubic deviation—but it still shares the implementation’s blind spot for post-close path commands and malformed transform arguments.
- **Checklist laundering:** A9/A10 print PASS after representative exclusions while two grammar escapes remain reachable through `compileSvg`.
- **Manifest self-assertion:** A13 checks declared conventions but cannot detect that a malformed `transform` string was interpreted through undocumented empty-component dropping.
- **Evidence discipline:** the runner log names commit `e4949b2d72ed692ad532a273fe0d71c16fc17736`, exit code 0, and the full gate output; the evidence-validator mutation test rejects seven forged receipts. No fabricated provenance, cloud-AI use, or hand-edited generated mesh data was observed.

## Severity summary

- P0: 0
- P1: 2 (F1 implicit post-close subpath merge; F2 malformed transform argument normalization) — both block DONE
- P2: 1 (F3 unconstrained root namespace/viewport values) — fix or explicitly defer

PHASE-X1 is **not eligible for DONE**. Correct F1 and F2, decide F3, rerun the external gate, and assign another fresh closure review against the amended commit. This review does not promote X1, merge, push, or mark any phase DONE.
