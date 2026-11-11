# PHASE-X1 parser-closure cold review 5

**Reviewed commit:** `6507b9a416fa4bc2e2fe1ec79772f22f354aebe6` (`fix: close X1 attribute-map and prolog escapes`), compiler `1.0.8`
**Reviewer role:** fresh cascade cold reviewer (fifth parser-closure pass, closure check); no implementation authorship
**Verdict:** **CHANGES ADVISED — zero P0/P1; review-4 F1/F2/F3 are genuinely closed.** One new P2 residual of the same prolog class remains: content (XML whitespace or comments) may precede the `<?xml` declaration because `stripComments`/`xmlTrim` run before declaration detection, so the declaration is matched at position 0 of a *normalized* string rather than position 0 of the source — producing a byte-copied `fallback.svg` that is not well-formed XML while the compiler accepts. X1 is eligible for DONE triage; this review does not mark X1 DONE, commit, merge, or push.

## Independent review basis

I read `/Users/ruvebal/src/AGENTS.md`, the worktree `AGENTS.md`/`CLAUDE.md`, `frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/AGENT.md`, the runbook `PHASE-X1.md` (A1–A13 + frozen grammar), the runner-owned `PHASE-X1-VERIFY-LOG.md` (names commit `6507b9a…`, exit 0 — left untouched), `PHASE-X1-PARSER-CLOSURE-REVIEW-4.md` + its `-RESOLUTION.md`, `DECISIONS.md` (D42 added), `PHASE-X1-REPORT.md`, the full `git diff 22e76fa..HEAD` amendment and `git diff b3f1d1c...HEAD` X1 surface as needed, and the touched sources `compiler.mjs`/`cli.mjs`/`test.mjs`/`verify-x1-acceptance.mjs`/`test-x1-evidence-validator.mjs`/`verify-phase-evidence.mjs`.

I did not accept the implementer report or the green gate as proof. At the reviewed commit I reran, from `web-foundations/` (Node v24.22.1):

- `node scripts/svg-extrusion/test.mjs` — **PASS** (exit 0);
- `node scripts/svg-extrusion/verify-x1-acceptance.mjs` — **PASS A1–A13** (exit 0);
- `node scripts/svg-extrusion/test-x1-evidence-validator.mjs` — **PASS, 7 forged receipts rejected** (exit 0);
- `node scripts/svg-extrusion/verify-phase-evidence.mjs X1 ../frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D` — **PASS, 13 acceptance items match** (exit 0);
- fresh CLI regeneration of both fixtures into `/tmp/x1rev5/` plus `diff -qr` against committed `docs/assets/animations/fava/rive/animascript-3d/generated/favicon/` and `scripts/svg-extrusion/golden/concave-cubic/` — **byte-identical, exit 0** (`facetCount=13` canonical N, `facetCount=2` fixture, `compilerVersion=1.0.8` in both manifests);
- ~90 direct adversarial `compileSvg` probes across three probe scripts covering every review-4 vector plus regression hunting (prototype-chain attribute names in every position, 40+ XML-declaration forms, BOM/whitespace/comment prolog interactions, and spot-replays of all highest-risk prior classes);
- pre-fix discrimination check: extracted `compiler.mjs` at `ce2d09a` (compiler `1.0.6`, pre-`22e76fa`) to `/tmp/x1rev5/compiler-old.mjs` and re-ran the corrected `viewBox` comma-run case plus `__proto__`/garbage-declaration vectors against it.

`git status` shows only the runner-owned `PHASE-X1-VERIFY-LOG.md` modification; this review added only this file. No implementation code was modified.

## Findings

### F1 — P2 non-blocking — XML whitespace or comments may precede the `<?xml` declaration: the strict `XMLDecl` match runs on a normalized string, not the source

`parseSvgStructure` (`compiler.mjs:98-110`) computes `clean = xmlTrim(stripComments(source))` and only then applies the anchored declaration regex `/^<\?xml[ \t\r\n]([^]*?)\?>…/`. Because comments are deleted and edge whitespace trimmed *before* the match, anything that preceded the declaration in the original bytes is invisible to the position-0 anchor.

Per XML 1.0, `prolog ::= XMLDecl? Misc*` — the `XMLDecl`, when present, must be the very first thing in the document; no `S`, `Comment`, or `PI` may precede it, and a later `<?xml …?>` is a PI with the reserved target `xml` (fatal). `cli.mjs` copies the source byte-for-byte to `fallback.svg`, so every accepted case below produces a fallback a strict XML parser rejects while the compiler reports success — the exact source/fallback divergence shape review-4's F2 fix was meant to eliminate, and it falsifies the resolution's claim that "the byte-copied `fallback.svg` can never be non-well-formed XML while the compiler accepts it."

Runnable evidence (all **ACCEPT, `facetCount=1`**, via `compileSvg` at `6507b9a`):

```text
' \n\t<?xml version="1.0"?><svg viewBox="0 0 10 10">…</svg>'     ACCEPT  (leading XML whitespace before decl)
'<!-- c --><?xml version="1.0"?><svg viewBox="0 0 10 10">…</svg>'  ACCEPT  (comment before decl)
'  <!-- c -->\n<?xml version="1.0"?>…'                            ACCEPT  (whitespace + comment before decl)
```

Correctly rejected boundaries (verified): BOM (`\uFEFF`) before or after the declaration → `text or malformed markup outside supported tags`; bare text before `<?xml` → same; a second `<?xml` prolog, `<?pi?>`, `<?xml-stylesheet?>`, and `<?xml` mid-document all reject; `<?xml` followed by non-`S` (NBSP) is not treated as a declaration and rejects structurally. A comment *between* a valid declaration and `<svg>` (`<?xml version="1.0"?><!-- c --><svg…`) correctly accepts — `Misc` after `XMLDecl` is legal.

This is **pre-existing**, not introduced by `6507b9a` — `xmlTrim`/`stripComments` ordering predates the amendment — but it is the same strict-grammar class at the same strip site the amendment just hardened, and the resolution/`PHASE-X1.md` wording ("must match the strict `XMLDecl` production") does not cover declaration *position*. Blast radius is identical to review-4 F2's residual assessment: prolog/metadata-only, zero geometry or manifest impact, only reachable on inputs carrying an XML declaration.

**Fix:** run the declaration match against the raw `source` (or otherwise require the declaration to begin at source offset 0) before `stripComments`/`xmlTrim` normalization — e.g. match `/^<\?xml[ \t\r\n]([^]*?)\?>[ \t\r\n]*/` on `source` itself; a valid declaration at offset 0 is unaffected by comment stripping since nothing precedes it, while `<!-- c --><?xml…` and `␣<?xml…` then leave `<?xml…?>` in `clean` and reject as a non-`<svg` first tag. Add the two accepted vectors above to `test.mjs` and `verify-x1-acceptance.mjs`.

## Review-4 closure check (F1/F2/F3)

| Prior finding | Result | Independent evidence |
| --- | --- | --- |
| F1 `__proto__` attribute silently dropped by plain-object attr map | **CLOSED** | `attrs()` now builds `Object.create(null)` (`compiler.mjs:20`). Probed 14 attribute-name vectors: `__proto__` single/duplicate/mixed on root and path all reject (`unsupported or unresolved root attribute __proto__`, `duplicate attribute __proto__`, `unsupported or unresolved attribute __proto__`); `constructor`, `hasOwnProperty`, `valueOf`, `__defineGetter__`, `toString`, `xml:__proto__` on path and `toString` on root all reject; `style="__proto__:x;…"` and `style="constructor:x;…"` reject as unsupported style properties (style map remains allowlist-gated before assignment, `compiler.mjs:491-495`). `Object.keys`/`Object.hasOwn` are the only consumers (`compiler.mjs:38,449,482`) and both work correctly on null-prototype objects — no iteration/`hasOwn` regression found. |
| F2 unvalidated `<?xml?>` prolog strip | **CLOSED for declaration content; residual position hole is new F1** | 40 declaration forms probed. Accepts (all correct per `XMLDecl`): canonical `<?xml version="1.0" encoding="utf-8" ?>`, version-only, single quotes, `standalone="yes"/"no"` with and without encoding, mixed quote styles, whitespace around `=`, tab/LF separators inside the body, `version="1.1"`, `1.10`-class versions, dotted/dashed encoding names. Rejects: `<?xml garbage?>`, `version="x"`, `version="2.0"`, missing/unquoted version, out-of-order pseudo-attrs (`standalone` before `version`, `encoding` after `standalone`), duplicate pseudo-attrs, `standalone="maybe"`, trailing junk, empty body, VT/FF/NUL (→ `non-XML character in XML declaration`), DEL/NBSP/space-in-value/bad-charset (→ `malformed XML declaration`), unterminated declaration, second prolog, `<?xmlfoo?>`, `<?xmlversion=…?>`, `<?xml-stylesheet?>`, other PIs, BOM either side, mid-document `<?xml`. The remaining hole is *position*, not content → F1. |
| F3 non-discriminating `viewbox-comma-run` test | **CLOSED** | Both layers now use `viewBox="0 0 , , 10 10"` (`test.mjs:311-314`, `verify-x1-acceptance.mjs:238`). Discrimination verified against extracted `compiler.mjs` at `ce2d09a` (1.0.6): `0 0 , , 10 10` → **ACCEPT** pre-fix (collapsed to 4 tokens), **REJECT** at `6507b9a` (`viewBox must contain four finite SVG numbers…`) — the test would have failed on pre-fix code for the right reason. `0 , , 10 10` (arity-only reject) and `0,,0 10 10` also probed: reject on both old and new for distinct reasons; legal `0,0,10,10`, `0 ,0`, `0, 0` forms still accept. |

## Amendment regression audit (`22e76fa..6507b9a`)

- **`Object.create(null)` consumers:** only `Object.hasOwn` (duplicate detection), `Object.keys` (allowlist iteration), and direct property reads (`ra.viewBox`, `a.d`, `a.id ?? null`, `a.transform ?? null`) touch the attr maps — all prototype-safe. The `style` accumulator (`compiler.mjs:485`) remains a plain object but every key is allowlist-checked before assignment, so no `__proto__` write path exists there (probed). No `for…in`, `in`-operator, spread, or `JSON.stringify` over attr maps anywhere in `compiler.mjs`/`cli.mjs`.
- **Strict `XMLDecl` regex vs. legitimate declarations:** no false rejections found across 12 valid forms including the full canonical `version="1.0" encoding="UTF-8" standalone="yes"`, single quotes, mixed quotes, `=`-padding, and tab/LF interior separators. Version production `1\.[0-9]+` correctly admits `1.1`/`1.10` and rejects `2.0`/`x`; `standalone` without `encoding` is accepted, matching the XML grammar (`SDDecl` does not require `EncodingDecl`). Encoding-name charset `[A-Za-z][A-Za-z0-9._-]*` matches `EncName`. No catastrophic-backtracking shape (lazy `[^]*?` to first `?>`, linear pseudo-attr groups).
- **Goldens/evidence churn:** manifest diffs are `compilerVersion` `1.0.7`→`1.0.8` only; `PHASE-X1-EVIDENCE.json` diffs are sha256 refreshes of the regenerated manifest artifact; `DECISIONS.md` adds D42 accurately describing both fixes; `PHASE-X1.md` grammar paragraph updated to match implemented behavior; `PHASE-X1-REPORT.md` appends the round-4 paragraph. `fallback.svg` outputs remain byte-copies (fresh `diff -qr` exit 0 includes `fallback.svg`).

## Former-defect replay (highest-risk prior classes, spot-check)

| Former defect class | Result | Independent evidence |
| --- | --- | --- |
| Post-close commands / implicit subpath | **CLOSED, no regression** | `ZM…` → `multiple subpaths`; `Z 1 1Z` → `coordinates after close`; `ZL…` → `commands after closepath`. |
| Malformed transforms | **CLOSED, no regression** | `translate(1,2,)`, `translate()`, `rotate(1 2 3 4)`, `translate(0x1 2)` all reject with the expected strict-tokenizer messages. |
| Non-XML whitespace | **CLOSED, no regression** | NBSP in `d` → `unsupported path syntax`; FF in `d` → `non-XML character in attribute d`. |
| Non-finite coords | **CLOSED, no regression** | `1e999` coordinate → `non-finite coordinate for L`. |
| `viewBox` coercion/comma grammar | **CLOSED, no regression** | `0x10`, `0,,0`, `0 0 , , 10 10` reject; `0,0,10,10` accepts. |
| Malformed comments | **CLOSED, no regression** | `<!-- a -- b -->` → `malformed XML comment`. |
| Unquoted/duplicate attrs | **CLOSED, no regression** | `viewBox=0 0 10 10` → `must use a quoted value`; duplicate `__proto__` now also detected (was invisible pre-`1.0.8`). |
| Nested/multiple svg, explicit path end tag | **CLOSED, no regression** | `<svg>` child → `malformed or unsupported direct child tag`; `</path>` → same; `</svg>` exact-closure enforced. |
| Self-intersection / degenerate / stroke / legal mixed input | **correct** | Bowtie → `self-intersecting contour`; collinear ring → `degenerate contour`; `stroke="#fff"` → `strokes are unsupported`; `stroke="none"` + relative commands + composed transforms + `width/height` accept. |

## Acceptance audit

| Item | Result | Cold-review evidence |
| --- | --- | --- |
| A1 | PASS | Fresh CLI compiled canonical favicon (`facetCount=13`, `compilerVersion=1.0.8`); `diff -qr` vs committed generated output exit 0. |
| A2 | PASS | Same CLI compiled `concave-cubic.svg` (`facetCount=2`); `diff -qr` vs `golden/concave-cubic/` exit 0. |
| A3 | PASS | Independent verifier rebuilds both fixtures twice and compares; my fresh regeneration byte-identical; goldens carry `compilerVersion=1.0.8`. |
| A4 | PASS | Golden facets positive areas; verifier's dynamic-N probes (`N=1/3/17`) pass at 1.0.8. |
| A5 | PASS | Recorded depths recompute from the exact D4 formula within tolerance in the independent verifier. |
| A6 | PASS | Invalid `viewBox` bounds and number syntax reject; degenerate contours reject; `__proto__`/prolog-attribute vectors reject per grammar. |
| A7 | PASS | Equal-area/uniform-scale depth invariants pass in the independent verifier. |
| A8 | PASS | Provider lengths, index bounds, facet spans, unit normals, front/back area, buffer finiteness validate. |
| A9 | **PASS with F1 caveat** | Unsupported features reject loudly across the full replay surface; the single residual is acceptance laxity on prolog *position* (F1) — an input-shape hole, not silent degradation of a supported feature. |
| A10 | **PASS with F1 caveat** | Rejection matrix now covers every prior vector plus `__proto__` (root/path/duplicate) and four declaration cases in both layers; the prolog-position class (whitespace/comment before `<?xml`) has no fixture and no rejection — F1. |
| A11 | PASS | IDs/counts/buffers/spans derive from source `N`; no favicon constant in `compiler.mjs`; `13` remains golden-fixture assertion only. |
| A12 | PASS | Independent verifier measures affine-baked transformed cubic against dense reference within declared tolerance. |
| A13 | PASS | Manifest conventions (D26 coordinate system, flattening method/tolerance, fill grammar/rules, signed area, centroid method, winding normalization, provider schema) reconcile; `source.viewBox`/`sha256` derive from the strict-grammar parse. |

## Agentic failure-mode audit

- **Verifier mirroring:** the four new `verify-x1-acceptance.mjs` cases genuinely exercise the fixed paths — `__proto__` root (allowlist sees the key now), duplicate `__proto__` (duplicate check fires), `<?xml garbage?>` and `<?xml version="x"?>` (strict `XMLDecl` rejects). All four **accepted** on 1.0.6 and would have **accepted** on 1.0.7 (review-4 verified the mechanism; the code paths were unchanged there) — discriminating. The corrected `viewbox-comma-run` is discriminating against 1.0.6 (verified by extraction: ACCEPT→REJECT).
- **Checklist laundering:** A9/A10 print PASS while the prolog-position hole (F1) remains untested in both layers — the strict-grammar claim in `PHASE-X1.md`/README is again one strip-site normalization broader than the tested surface. Narrower than any prior round's residual.
- **Manifest self-assertion:** unchanged — the manifest cannot detect a silently-dropped attribute or an unvalidated prolog position; `source.sha256` at least binds output to exact input bytes.
- **Evidence discipline:** runner log names `6507b9a…`, exit 0, full gate output including Jekyll build + publication/citation checks; `PHASE-X1-EVIDENCE.json` sha256s match the regenerated 1.0.8 manifest; no fabricated provenance; goldens byte-identical at `compilerVersion=1.0.8`.
- **New-test discrimination:** verified against extracted pre-fix `compiler.mjs` (`ce2d09a`, 1.0.6): `0 0 , , 10 10` ACCEPT→REJECT, `__proto__` ACCEPT→REJECT, `<?xml garbage?>`/`version="x"` ACCEPT→REJECT. All genuinely discriminating.

## Severity summary

- P0: 0
- P1: 0
- P2: 1 — F1 XML whitespace/comments may precede the `<?xml` declaration (declaration matched post-`stripComments`/`xmlTrim`, not at source offset 0 → accepted input yields non-well-formed byte-copied `fallback.svg`; prolog-only, zero geometry impact, pre-existing ordering).

## Eligibility verdict

Review-4's F1/F2/F3 are **genuinely closed**: the null-prototype attribute map routes every prototype-chain name to the allowlists and duplicate detection; the `XMLDecl` body is strictly validated with XML-character enforcement and no legitimate declaration form was falsely rejected across 40+ probes; the corrected comma-run fixture discriminates against pre-1.0.7 code (verified by extraction). No `Object.create(null)` regression exists — `Object.keys`/`Object.hasOwn`/property reads are the only consumers and all behave. All gates, goldens, determinism, evidence, and replay checks pass independently at `6507b9a`.

This pass found **no P0/P1** and one new P2 (F1): a residual of the same prolog class — declaration *content* is now strict, but declaration *position* is still normalized away before matching, so `␣<?xml …?>` and `<!-- c --><?xml …?>` compile while their byte-copied fallbacks are not well-formed XML. It does not undermine any acceptance item's geometric/contractual core. **X1 is eligible for DONE triage**; recommended disposition is a small follow-up (match the declaration against the raw source at offset 0, add the two vectors to both test layers) either before or after DONE promotion — the orchestrator's call. This review does not promote X1, merge, push, commit, or mark any phase DONE.
