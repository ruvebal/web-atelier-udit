# PHASE-X1 parser-closure cold review 4

**Reviewed commit:** `22e76fa2a97ac7805bada0fc1af7c5dc3cf7b07b` (`fix: close X1 viewBox coercion and lexical escapes`), compiler `1.0.7`
**Reviewer role:** fresh cascade cold reviewer (fourth parser-closure pass); no implementation authorship
**Verdict:** **CHANGES ADVISED — zero P0/P1; two new P2 strict-grammar escapes plus one P2 test-discrimination gap.** Review-3 F1/F2/F3 are genuinely closed with no observed regression. X1 is eligible for DONE triage only after the orchestrator dispositions F1/F2 (both are cheap, in-class hardening fixes); this review does not mark X1 DONE, commit, merge, or push.

## Independent review basis

I read `/Users/ruvebal/src/AGENTS.md`, the worktree `AGENTS.md`/`CLAUDE.md`, `frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/AGENT.md`, the runbook `PHASE-X1.md` (A1–A13 + frozen grammar), `DECISIONS.md` context via prior reviews, all seven prior X1 review/resolution pairs (cold, trust, final-trust, parser-closure ×3 including every resolution), the runner-owned `PHASE-X1-VERIFY-LOG.md` (uncommitted runner output naming commit `22e76fa…`, exit 0 — left untouched), the full `git diff b3f1d1c...HEAD` for `web-foundations/scripts/svg-extrusion/` and pack docs, `compiler.mjs`/`cli.mjs`/`test.mjs`/`verify-x1-acceptance.mjs`/`test-x1-evidence-validator.mjs`/`verify-phase-evidence.mjs`, fixtures, golden outputs, and the `22e76fa` fix diff in isolation.

I did not accept the implementer report or the green gate as proof. At the reviewed commit I reran, from `web-foundations/`:

- `node scripts/svg-extrusion/test.mjs` — **PASS** (exit 0);
- `node scripts/svg-extrusion/verify-x1-acceptance.mjs` — **PASS A1–A13** (exit 0);
- `node scripts/svg-extrusion/test-x1-evidence-validator.mjs` — **PASS, 7 forged receipts rejected** (exit 0);
- `node scripts/svg-extrusion/verify-phase-evidence.mjs X1 ../frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D` — **PASS, 13 acceptance items match** (exit 0);
- fresh CLI regeneration of both fixtures into `/tmp/x1rev4/` plus `diff -qr` against committed `docs/assets/animations/fava/rive/animascript-3d/generated/favicon/` and `scripts/svg-extrusion/golden/concave-cubic/` — **byte-identical, exit 0** (`facetCount=13` canonical N, `facetCount=2` fixture, `compilerVersion=1.0.7` in both manifests);
- `cmp` confirmed both `fallback.svg` outputs are byte-copies of their sources;
- ~290 direct adversarial `compileSvg` probes across five probe scripts covering every review-3 F1/F2/F3 vector plus new escape hunting (viewBox number/separator grammar exhaustively, comment well-formedness, non-XML chars in every attribute position, path comma placement, transform/path/style/fill/root grammars, structure boundaries, `__proto__`-class attribute names, XML declaration forms, single quotes, duplicate style properties, case variants, empty/degenerate `d`, config finiteness, dynamic N, determinism, 2000-gon long input);
- pre-fix discrimination check: extracted `compiler.mjs` at `ce2d09a` (pre-`22e76fa`) to `/tmp` and re-ran the new rejection vectors against it.

`git status` shows only the runner-owned `PHASE-X1-VERIFY-LOG.md` modification; this review added only this file. No implementation code was modified.

## Findings

### F1 — P2 non-blocking — `__proto__` attribute is silently dropped by `attrs()` instead of rejected: an unsupported attribute never reaches the allowlists

`attrs()` (`compiler.mjs:19-46`) accumulates attributes into a plain object literal `const out = {}`. Assignment `out[key] = value` for `key === '__proto__'` invokes the `Object.prototype.__proto__` setter; since `value` is always a string (never an object/null), the assignment is a silent no-op — **no own property is created**. Consequences, all confirmed runnable:

- `Object.keys(out)` never contains `__proto__`, so the root allowlist (`compiler.mjs:439-440`) and path allowlist (`compiler.mjs:472-473`) never see it → no `unsupported or unresolved attribute` rejection;
- `Object.hasOwn(out, '__proto__')` stays false forever → duplicate `__proto__` attributes are not detected either;
- sibling names that look dangerous but are ordinary own properties (`constructor`, `hasOwnProperty`, `valueOf`, `__defineGetter__`, …) DO create own properties and are correctly rejected — `__proto__` is the single hole.

Runnable evidence (all **ACCEPT, `facetCount=1`**, via `compileSvg` at `22e76fa`):

```text
<svg __proto__="x" viewBox="0 0 10 10"><path fill="#000" d="M0 0L2 0L2 2Z"/></svg>          ACCEPT
<svg viewBox="0 0 10 10"><path __proto__="x" fill="#000" d="M0 0L2 0L2 2Z"/></svg>           ACCEPT
<svg viewBox="0 0 10 10"><path __proto__="x" __proto__="y" fill="#000" d="…"/></svg>          ACCEPT (duplicate slips too)
```

vs. correctly rejected siblings:

```text
<path constructor="x" …/>      REJECT: unsupported or unresolved attribute constructor
<path hasOwnProperty="x" …/>    REJECT
<path valueOf="x" …/>           REJECT
<path xml:space="preserve" …/>  REJECT
<path aria-label="x" …/>        REJECT
```

`__proto__` is a legal XML attribute name, so `fallback.svg` (byte copy) remains well-formed — there is no fallback divergence and zero geometry/manifest impact; the attribute is inert in every conforming consumer too. The defect is purely contractual: the frozen grammar requires every start-tag attribute to be "fully consumed before the … allowlists run" and unsupported attributes to "reject rather than degrading silently," and the hard constraint is "reject unsupported SVG semantics explicitly rather than silently omitting." This is a silent omission in the attribute lexer — the same strict-grammar class as the last four review rounds, at the lowest blast radius yet found. P2 because nothing downstream can observe it.

**Fix:** build the accumulator with a null prototype (`const out = Object.create(null)`) or `Object.defineProperty`/`Map`, or reject `__proto__` (and ideally any name colliding with `Object.prototype`) explicitly in `attrs()`. Add `__proto__` single/duplicate cases on both root and path to `test.mjs` and `verify-x1-acceptance.mjs`.

### F2 — P2 non-blocking — the tolerated `<?xml …?>` prolog is stripped with zero validation: malformed declarations and non-XML characters inside it compile while `fallback.svg` becomes non-well-formed

`parseSvgStructure` (`compiler.mjs:98-100`) strips a leading declaration with:

```js
const declaration = /^<\?xml[ \t\r\n][\s\S]*?\?>[ \t\r\n]*/.exec(clean);
if (declaration) clean = xmlTrim(clean.slice(declaration[0].length));
```

`[\s\S]*?` accepts **any** content up to the first `?>`, and nothing validates it — not the `XMLDecl` production (`<?xml VersionInfo EncodingDecl? SDDecl? S? '?>'`, i.e. a mandatory `version="1.x"`), and not the XML `Char` production that review-3's fix applied to comments and attribute values but not here.

Runnable evidence (all **ACCEPT, `facetCount=1`**):

```text
<?xml garbage?><svg viewBox="0 0 10 10">…</svg>                    ACCEPT  (no version at all)
<?xml foo="bar"?>…                                                  ACCEPT
<?xml version="x"?>…                                                ACCEPT  (not 1.x)
<?xml version="1.0" \f?>…                                            ACCEPT  (form feed — not an XML Char)
<?xml version="1.0"\u000B?>…                                         ACCEPT  (vertical tab)
<?xml version="1.0"\u0000?>…                                         ACCEPT  (NUL)
<?xml a="<b"?>…                                                      ACCEPT  ('<' inside PI data is Char-legal but the decl is still malformed)
```

Per XML 1.0, `<?xml` followed by whitespace **must** be a well-formed XML declaration; `<?xml garbage?>` is not, and `\f`/`\u000B`/`\u0000` are not `Char` at all. `cli.mjs` copies the source byte-for-byte to `fallback.svg`, so every one of these produces a fallback document a strict XML parser rejects outright while the compiler reports success and emits geometry — the exact source/fallback divergence shape of review-3 F2 (comment `--` / control chars in `id`), which was fixed at the comment and attribute strip sites but not at this third strip site. Review-3 rated that P2 (prolog/metadata-only, no geometry effect); this is the same blast radius, arguably wider because *any* garbage between `<?xml ` and `?>` is accepted, not just bad characters.

Sanity boundaries that DO behave: `<?xml-stylesheet …?>`, `<?xmlfoo ?>`, `<?xmlversion=…?>`, a second `<?xml?>` prolog, `<?pi?>` prologs/middles/tails, BOM before the declaration, and NBSP before the declaration all reject loudly (verified). Only the declaration body's content is unvalidated.

**Fix:** either (a) validate the stripped declaration against a strict `XMLDecl` grammar (`version="1\.[0-9]+"`, optional `encoding`/`standalone` with legal values, XML `S` separators) **and** run `nonXmlChar` over it, or (b) simplest and safest — reject any prolog that is not exactly `<?xml version="1.0"…?>`/`<?xml version="1.1"…?>`-shaped, or drop prolog tolerance entirely and reject all `<?…?>` (PIs are already rejected everywhere else). Add `<?xml garbage?>`, `<?xml version="x"?>`, and `<?xml version="1.0" \f?>` cases to both test layers.

### F3 — P2 non-blocking — the committed `viewbox-comma-run` regression test does not discriminate the collapse fix it claims to prove

`test.mjs` (`viewbox-comma-run`) and `verify-x1-acceptance.mjs` both use `viewBox="0 , , 10 10"` — only **three** numbers. On pre-fix code (`ce2d09a`, verified by extraction) this rejects on token *arity* (`[0,10,10]` → length 3), not on comma-run collapse; on post-fix code it rejects on the preserved empty token. The test passes for different reasons on both versions, so it would not have failed against the pre-fix code for the reason it exists.

The collapse fix **is** genuinely covered by `viewbox-double-comma` (`0,,0 10 10`: old code collapses `,,` → 4 tokens → ACCEPT; new code → 5 tokens → REJECT — verified discriminating), so this is a coverage-precision gap, not an untested fix. Still, the exact review-3 exploit shape — a collapsed comma run that preserves arity — is absent from both test layers.

Runnable discrimination evidence:

```text
OLD (ce2d09a):  "0 0 , , 10 10" -> ACCEPT   "0,,0 10 10" -> ACCEPT
NEW (22e76fa):  "0 0 , , 10 10" -> REJECT   "0,,0 10 10" -> REJECT
```

**Fix:** add `viewBox="0 0 , , 10 10"` (and ideally `0 0 10 , , 10`) to the rejection lists in `test.mjs` and `verify-x1-acceptance.mjs`; these fail on pre-fix code and pass-trivially-reject for the right reason on post-fix code.

## Review-3 closure check (F1/F2/F3)

| Prior finding | Result | Independent evidence |
| --- | --- | --- |
| F1 `viewBox` bare `Number()` + collapsed separators | **CLOSED** | Probed 33 viewBox forms: `0x10`/`0X10`/`0b101`/`0o17`/`Infinity`/`-Infinity`/`NaN`/`nan`/`1_0`/`1e999`/`;`-containing all reject (`finite SVG numbers`); `0,,0`, `0,,,0`, `0 , , 0`, leading/trailing/lone-edge commas, `0 0 , , 10 10` all reject; legal `5.`/`.5`/`5.e3`/`+5`/`1e1`/tab-CR-LF separators/`0,0,10,10`/`0 ,0`/`0, 0`/`0 , 0`/`0e5,0` all accept with correct `[minX,minY,w,h]`. Split regex `[ \t\r\n]*,[ \t\r\n]*\|[ \t\r\n]+` preserves empty tokens — no collapse path remains. `NUMBER` regex is identical to the path/transform number production; every token is regex-gated before `Number()` (`compiler.mjs:441-446`). Verified old-vs-new discrimination above. |
| F2 malformed comments + non-XML chars in attribute values | **CLOSED for comments/attributes; residual prolog site is new F2** | `<!-- a -- b -->`, `<!-- a --->`, `<!----->`, `<!-- a --!> b -->`, `<!-- <!-- -->`, unterminated `<!-- x` all reject; `<!---->`, `<!-- a-b-c -->`, `<!-- a < b -->`, quotes inside bodies accept correctly. `\f`/`\v`/`NUL`/DEL probed in **every** attribute-value position — root `viewBox`/`width`/`xmlns`, path `d`/`id`/`fill`/`style`/`transform`/`fill-rule`/`stroke` — all reject (`non-XML character in attribute …` or downstream grammar). DEL (`\u007F`) correctly *accepts* in `id` — it is a valid XML `Char`. Bare control chars between attributes/tag names reject via name/boundary checks. The `<?xml?>` prolog strip site was missed → F2 above. |
| F3 trailing/post-close comma-wsp in `d` | **CLOSED, and tightened correctly** | `Z,`/`Z ,`/`Z\n,`/`Z , ` all reject `misplaced comma`; `M0 0,L…` (comma before command), `L1,,1`, `L1, ,1`, leading `,M`, `1e,5`, stray `.` neighbors all reject; legal `L1,-1`, `L1,+1`, `L1 , 1`, `1\t,\n1`, exponent-adjacent `1e1,2`, implicit-group `M0 0 1,1`, cubic commas all accept. Comma-before-`Z` (`…,2 0,Z`) now rejects — correct per the frozen grammar ("commas only between two numbers") and consistent with the transform lexer's trailing-separator rule; note review-3's "comma before Z is legal" remark was the lenient-browser reading, the strict BNF agrees with the new code. |

## Former-defect replay (all seven prior reviews)

| Former defect class | Result | Independent evidence |
| --- | --- | --- |
| Parser-closure-1 F1 post-close implicit subpath merge | **CLOSED, no regression** | `ZZ`, `ZM…`, post-close coords, `M`-after-`Z` (multiple subpaths) all reject; single closed MLCZ contours, implicit groups, relative commands, exponents still compile. |
| Parser-closure-1 F2 transform argument normalization | **CLOSED, no regression** | ~30 transform probes: trailing/leading/double commas in args and between functions, empty/unterm/extra parens, bad arity (`rotate` 2/4, `matrix` 5, `scale` 3), case-variant/unknown functions, `0x1`/`NaN`/`Infinity`/`1_0` literals, `;`, missing separators, `translate ()` all reject; legal `translate (1 2)` (wsp-before-paren), `1-2` sign adjacency, `1e2 -1E-2`, `5. .5`, comma-wsp between functions accept in written order. |
| Parser-closure-1 F3 → closure-2 root namespace/viewport | **CLOSED** | `xmlns`/`xmlns:xlink` exact-match enforced (padded/xhtml/bad reject; correct pair accepts); `width`/`height` positive unitless-or-`px` (`10PX`/`10%`/`10em`/`-10`/`0`/`10 px`/`0x10` reject; `+10`/`.5`/`5.`/`1e999` accept — non-geometric); `viewBox` number grammar now strict (F1 above). |
| Closure-2 F1 non-XML whitespace | **CLOSED, no regression** | `\f`/`\v`/`NUL` now reject even earlier (nonXmlChar in `attrs`); NBSP/U+3000/ideographic still reject via residue/grammar; XML `S` accepted everywhere legal. |
| Closure-2 F2 non-finite coordinates → `null` | **CLOSED, no regression** | `1e999` coords/transforms/viewBox reject; `NaN` literal text in `d` rejects via residue; config `minimumTriangleArea` now finite-checked (new this commit); verifier `validateMesh` finiteness intact. |
| Cold/trust F1 affine-baked cubic tolerance; style-hidden strokes; fill-rule; collinear overlap; attribute lexer; paint semantics; document boundary | **CLOSED, no regression** | `style="fill:#fff;fill:#000"` last-wins (CSS-consistent), `style`+attr precedence correct, `FILL:`/`Fill-Rule:EvenOdd` case-insensitive keys, `stroke="NONE"`/`"None"` accept, `stroke=" none "`/`fill-rule=" nonzero"` reject (strict, safe direction); `rgb(1 2 3)`/`rgb(100%,…)`/`rgb(1,2,3,0.5)`/`#ffff`/`#ffffffff`/named/`transparent` reject, `rgb(1.5,2,3)`/`#fff`/`#rrggbb` accept per declared grammar; `<path … />`, `<path/ >`, `//>`, `/ >`, explicit `</path>`, nested/multiple `<svg>`, `<g>`/`<defs>`/`<use>`/`<image>`/`<text>` children, `</svg >`, uppercase tags, text/CDATA/PI children, DOCTYPE/ENTITY/script (any case), comments-in-tags all reject per grammar. |
| Dynamic facet N / determinism / evidence sensitivity | **CLOSED, no regression** | `compileSvg` twice → byte-identical JSON; 2000-gon contour compiles in 60 ms; CLI regeneration byte-identical to committed goldens; evidence validator rejects 7 forged receipts; phase-evidence verifier passes; `fallback.svg` `cmp`-identical. |

## Acceptance audit

| Item | Result | Cold-review evidence |
| --- | --- | --- |
| A1 | PASS | Fresh CLI compiled canonical favicon (`facetCount=13`, `compilerVersion=1.0.7`); `diff -qr` vs committed generated output exit 0. |
| A2 | PASS | Same CLI compiled `concave-cubic.svg` (`facetCount=2`); `diff -qr` vs `golden/concave-cubic/` exit 0. |
| A3 | PASS | Independent verifier rebuilds both fixtures twice and compares; my fresh regeneration byte-identical; `cmp` confirms `fallback.svg` copies. |
| A4 | PASS | Golden facets positive areas; dynamic-N probes (`N=1/3/17` in verifier; multi-path probe) positive finite. |
| A5 | PASS | Recorded depths recompute from exact D4 formula within tolerance in independent verifier. |
| A6 | PASS | Invalid `viewBox` bounds **and** number syntax now reject (33-form probe); degenerate/zero contours (`M0 0Z`, empty/whitespace/`M`-only `d`) reject. F1's `__proto__`/F2's prolog cases are attribute/prolog surface, not bounds — they don't undermine A6's contour/bounds intent but do violate the strict-grammar contract (F1/F2). |
| A7 | PASS | Equal-area/uniform-scale depth invariants pass in independent verifier. |
| A8 | PASS | Provider lengths, index bounds, facet spans, unit normals, front/back area, buffer finiteness validate. |
| A9 | **PARTIAL** | Unsupported features reject loudly almost everywhere; the two residual silent-acceptance holes are `__proto__` attributes (F1) and malformed `<?xml?>` prologs (F2) — both inert for geometry but contrary to "reject explicitly rather than silently omit." |
| A10 | **PARTIAL** | Rejection matrix now covers every review-3 vector plus more; missing: `__proto__` attribute names, malformed/garbage `<?xml` declarations, and the arity-preserving comma-run `viewBox` form (F3). All reachable. |
| A11 | PASS | IDs/counts/buffers/spans derive from source `N`; `N=1/3/17` verifier probes; `13` remains golden-fixture assertion only; no favicon constant in `compiler.mjs`. |
| A12 | PASS | Independent verifier measures affine-baked transformed cubic against dense reference within declared tolerance. |
| A13 | PASS for accepted inputs | Manifest conventions (D26 coordinate system, flattening method/tolerance, fill grammar/rules, signed area, centroid method, winding normalization, provider schema) reconcile; `source.viewBox` now derives only from strict SVG numbers. |

## Agentic failure-mode audit

- **Verifier mirroring:** the new rejection cases in `verify-x1-acceptance.mjs` genuinely exercise the fixed code paths (hex viewBox, collapsed commas, malformed comments, control-char attributes, misplaced path commas) — but see F3: the `0 , , 10 10` comma-run case rejects on arity in both versions, so one of the five new verifier cases is non-discriminating. The other four are discriminating (verified against `ce2d09a`).
- **Checklist laundering:** A6/A9/A10 print PASS on representative rejections while two lexer holes remain (`__proto__` drop, unvalidated prolog) — the "strict grammar" claim in `PHASE-X1.md`/README is again broader than the tested surface, this time at the attribute-accumulator and prolog-strip sites rather than numeric sites.
- **Manifest self-assertion:** unchanged — manifest records what the parser accepted; it cannot detect that an attribute was silently dropped or a prolog was never validated.
- **Evidence discipline:** runner log names commit `22e76fa…`, exit 0, full gate output; `PHASE-X1-EVIDENCE.json` + baselines verify; no fabricated provenance, cloud-AI use, or hand-edited generated data; goldens byte-identical at `compilerVersion=1.0.7`; `fallback.svg` byte-copies confirmed.
- **New-test discrimination:** verified against extracted pre-fix `compiler.mjs` — hex/binary/octal viewBox, `0,,0`, trailing/post-close/double path commas, `--`-in-comment, and control-char `id` all **accepted** pre-fix and **reject** post-fix: genuinely discriminating. Only the `0 , , 10 10` viewBox case is non-discriminating (F3).

## Severity summary

- P0: 0
- P1: 0
- P2: 3 — F1 `__proto__` attribute silently dropped (unsupported-attribute rejection bypass, inert); F2 unvalidated `<?xml?>` prolog (malformed declarations + non-XML chars accepted → non-well-formed `fallback.svg`); F3 non-discriminating `viewbox-comma-run` test case (the arity-preserving exploit form `0 0 , , 10 10` is untested in both layers).

## Eligibility verdict

Review-3's F1/F2/F3 are **genuinely closed**: the `viewBox` splitter preserves empty tokens and every token is regex-gated before `Number()`; comment well-formedness (`--`, trailing `-`, non-XML chars) and attribute-value `Char` validity are enforced at every attribute position; the path comma scanner correctly requires number-on-both-sides placement including post-`Z` residue, with no false rejections found across ~120 legal/illegal comma, whitespace, exponent, sign, and implicit-group forms. No regression observed across all seven prior defect classes; all gates, goldens, determinism, and evidence checks pass independently.

This pass found **no P0/P1**. The three P2 items are real but low-blast-radius: F1 and F2 are silent-acceptance holes in the same strict-grammar class (inert attribute drop; unvalidated prolog that can make the byte-copied fallback non-well-formed), and F3 is a test-precision gap. They do not undermine any acceptance item's geometric/contractual core, but they do leave the "reject unsupported semantics explicitly" guarantee incomplete. **X1 is eligible for DONE triage**; recommended disposition is a small hardening commit (`Object.create(null)` or explicit `__proto__` rejection in `attrs()`; strict `XMLDecl` validation or prolog rejection; add `0 0 , , 10 10` plus `__proto__`/garbage-declaration cases to both test layers) followed by gate rerun — whether that happens before or after DONE promotion is the orchestrator's call. This review does not promote X1, merge, push, commit, or mark any phase DONE.
