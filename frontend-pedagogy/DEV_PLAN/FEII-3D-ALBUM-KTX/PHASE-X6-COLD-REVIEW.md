# PHASE-X6 cold review — Units 8–9 aim at the album cover

**Reviewer:** cascade-cold-reviewer, a fresh subagent that did not implement X6.
**Date:** 2026-11-04
**Worktree:** `web-atelier-udit-album-FEII-3D-ALBUM-KTX-6`, branch `cascade/FEII-3D-ALBUM-KTX-6`, base `24d2b1c`, uncommitted diff (6 lesson files).
**Inputs read:**
- PHASE-X6.md
- FEII-3D-ALBUM-KTX-CASCADE.md
- DECISIONS.md
- AUTOPILOT.md
- REPO-SHAPE.md
- gate-lib.sh and PHASE-X6.exit-gate.sh
- PHASE-X6-VERIFY-LOG.md
- PHASE-X6-REPORT.md
- the full `git diff`
- both tuning-memory records
- the canonical `thessia_generate.py`
- lesson-scribe SKILL.md §7
- CLAUDE.md and `.cursor/rules/lesson-code-block-conventions.mdc`

**Verdict:** NOT READY FOR DONE. **1 blocking finding (F1, P1).** F2–F4 are P2 and do not block.

---

## Acceptance, item by item (re-run, not copied from the report)

| Acceptance item | Result | Evidence |
| --- | --- | --- |
| Beacon budget table still present with 2026-10-22, or a newly measured dated row | PASS | `git show 24d2b1c:…/index.md \| grep -c` vs the worktree. **U8:** `1368` 4→6 (the 2 new hits are prose that attributes the number to the beacon); `2026-10-21` 4→5 (the new hit is inside the switch-gated comment); `2736` 2→2. **U9:** `1368` 6→6, `2026-10-22` 3→3, `1385` 2→2. `git diff -U0 \| grep '^-'` removes no table row, no `CEILING` line and no measurement line. No renderer.info number for a cover appears anywhere. U8 says: "This page publishes no budget for `Cover.jsx`". |
| Assignment permalink appears in both unit labs | PASS | Both labs contain `{{ '/lessons/en/feii/units-8-9-assignment/' \| relative_url }}`. Built `_site/lessons/en/feii/units-8-9-assignment/index.html` exists, and `baseurl: '/web-atelier-udit'` resolves. Note: both labs already carried this link before X6, so the gate also requires album/sleeve, which is present. |
| At least one lesson-scribe tuning-memory directory dated this phase | PASS | `…-feii-u8-lab-1/` and `…-feii-u9-lab-1/` exist. Sidecar `generated_at` runs from 20:12:51Z to 20:15:37Z. That is after the PHASE-X6.md mtime (2026-11-04T20:38+0100 = 19:38Z) and before the harness verify (20:21:43Z). Each sidecar holds `token_logprobs` within 1–3 of `eval_count` (131/133, 270/271, 218/221, 268/269, 211/214), which fits real model calls rather than hand-written files. `thessia-scholar-v3:latest` is present in `/api/tags`. |
| `npm run build` exit 0; no `Liquid Warning` | PASS | I re-ran `cd web-foundations && npm run build`: `exit=0`, `grep -c "Liquid Warning"` → `0`. It also printed "Publication safety passed…" and "Citation conformance passed…". I also ran `bash PHASE-X6.exit-gate.sh` myself: `build ok` / `OK PHASE-X6.exit-gate.sh`. |
| Cold review filed; blocking Fn closed | FAIL (open) | This file is filed. F1 blocks. |

## Other checks the orchestrator asked for

- **Built HTML keeps the code.** After stripping tags, `_site/…/unit-8-r3f-fundamentals/index.html` contains each of these once:
  - `node.position.x = 0.3 + 0.12 * Math.sin(phase.current * 0.8);`
  - all three `{...bindPart(PartId.<sleeve|vinyl|stage>, onHover, onSelect)}`
  - `export default function Cover({ hovered, selected, reduced, onHover, onSelect })`

  U9 HTML contains `7. Sampler (album cover only)`. Neither page contains `{% if` or `publish_internal_metadata`. The 14 added Liquid lines are all `relative_url` / `{% if site.publication.publish_internal_metadata %}` / `{% endif %}`, and none sits inside a fence.
- **Cover template compiles.** I extracted `main.jsx`, `index.css`, `BudgetProbe.jsx`, `App.jsx` (with the documented import and JSX swap applied), the cover `parts.js`, and `Cover.jsx` from the lesson. I bundled them with `react-template`'s esbuild against three 0.185.1 / fiber 9.8.2 / drei 10.7.9 / react 19.3.1: `BUNDLE_OK`. This proves syntax and imports only. It was not rendered. The lesson labels it Template and prints no budget for it, which is honest.
- **Labels.** Every new fence is labelled:
  - `parts.js`: Template. Says to rewrite every `note` and to keep or rename the ids.
  - `Cover.jsx`: Template. Says sizes, positions, colours and slide distance are placeholders.
  - `App.jsx` swap: Excerpt.
  - `shader-note.md` line 7: inside the existing Template.

  The code-convention notes in both units name the new Templates.
- **Internal metadata in the build.** On `_site/lessons/en/feii/unit-{8,9}*/index.html` plus the published `exercises.md` / `deck-outline.md` copies, `grep -i "ahmes|deviac|tuning_record|thessia|coat|curriculum-internal"` → 0 hits. A `scribe` hit is the word "describes". The `MCP` hit is the pre-existing "MCP shopping is not a learning outcome". There is no corpus-to-boilerplate, no cloud SDK and no MCP student path.
- **Links.** `cover-shaders/`, `ktx2-basis/`, `units-8-9-assignment/`, `unit-8…/` and `unit-9…/` all exist under `_site/lessons/en/feii/`. `id="lab-team--workplace-like--3-h"` exists once in U8, and both `href="#lab-team--workplace-like--3-h"` resolve. There are no relative hrefs. `git diff --check` → exit 0.
- **Facts against REPO-SHAPE and the assignment.**
  - "the route's `src/Cover.jsx` … a tree with no `<Canvas>`, because the gallery supplies the Canvas" matches REPO-SHAPE ("default export: R3F tree (no Canvas — gallery wraps)").
  - task1 = "mesh and scene" and task2 = "authored shader" match `units-8-9-assignment/index.md:96–97`.
  - "the assignment's second covenant bar" matches bar 2 ("It is not a paste of the Unit 9 bulb").
  - "The beacon is six meshes" matches `Beacon.jsx`.
- **B3/B2.** The two exercises.md files add one paragraph each. The drills themselves are byte-identical to base (`git diff` shows additions only). Cover work appears only in the labs.
- **Citations.** No new citation and no References change.

## Thessia provenance — rulings

1. **Shim vs `thessia_generate.py`: acceptable, honestly recorded.**
   - The canonical wrapper cannot load in this environment. `python3 -c "import ollama"` → `ModuleNotFoundError`, `import yaml` → `ModuleNotFoundError`, and `.venv/bin/python -> python3.14` → "no such file or directory".
   - The CASCADE master paste itself says "Ollama: HTTP http://localhost:11434/api/chat (python `ollama` pkg is not installed)". Calling localhost HTTP is therefore sanctioned. There is no cloud SDK and no `ollama run`.
   - The shim is copied into the U8 record, and `provenance.json` names it in `harness`.
   - These gates demonstrably ran: load gate (`/api/ps`), logprobs sidecar, `[S#]` marker gate, quote gate, and CI3 key check. The sidecars show `quote_verification` FAIL rows, `sentence_check`, and the options used.
   - The shim is **not** an exact reproduction of the canonical gates (see F4). The deviation runs stricter on quotes and weaker on CI3. Neither changes what shipped: the integrated U8 paragraph has no citation and no quotation.
2. **U8 integrated paragraph: honest provenance.**
   - `integrated.md` is verbatim the lesson paragraph (checked by script: `True`).
   - `amendments.diff` is a real `diff -u` from `thessia-raw.md`.
   - `evaluation.md` states plainly that the text was heavily amended and lists what was kept and what was removed.
   - The text is substantially operator-rewritten. The gated comment says "attempt 2, amended", which is accurate. The record is auditable.
3. **U9 ships no Thessia prose: satisfies the phase, not a gap.**
   - Deliverable 3 *requires* Unit 9 to state that the hand-in shader samples the cover and is not a paste of `BulbMaterial`. Shipping nothing would fail the deliverable.
   - The still-success clause forbids *ungrounded* prose.
   - The shipped subsection only restates facts that already exist on the page or in frozen decisions:
     - the rim is view space (U9 "`vUv` is absent here because the rim is view space")
     - sampler2D/UV belongs to the satellite (D2)
     - a paste fails item 5 and bar 2
   - It is labelled in the gated comment as operator lab brief, not B1.
   - The U9 record documents three real rejected calls. The acceptance item ("at least one directory") is met either way.

---

## Findings

### F1 — Unit 9's bulb paste instructions collide with the Unit 8 cover fork and silently break `Cover.jsx`

- **Severity:** P1
- **Blocks DONE:** yes
- **What changed:** X6 now tells students, in U8 lab step 3, to *replace* `src/parts.js` with the cover ids (`sleeve`/`vinyl`/`stage`) and to swap `App.jsx` onto `Cover`. U8 calls the second sandbox optional: "Save the running beacon first — commit it, **or** fork the sandbox". Unit 9 was not amended to match:
  - U9 L50 still says the bulb is three CodeSandbox-ready files "you paste into the Unit 8 sandbox: `src/parts.js`, `src/BulbMaterial.jsx`, `src/Beacon.jsx`".
  - U9 L184 says "Start from the Unit 8 sandbox. Same … `App.jsx` … You replace three files".
  - U9 L188 says "**CodeSandbox-ready** — replace `src/parts.js`".
  - The new U9 lab step 1 then sends students to "your forked sleeve".
- **Effect:** a team that follows the pages in order pastes the beacon `parts.js` over its cover `parts.js`. `PartId.sleeve/vinyl/stage` become `undefined`. Every `bindPart(undefined, …)` calls `onHover(undefined)`, so `colorFor` matches all three parts at once, and the panel lists Plinth/Shaft/Lamp. Nothing throws, so the break is silent. The pasted bulb `Beacon.jsx` never renders, because `App.jsx` now imports `Cover`.
- **Rule conflict:** this is also the defect that `lesson-code-block-conventions.mdc:28,51` exists to prevent ("grows by adding files", "Students never delete previous work to try the next example").
- **Evidence:**

  ```text
  $ grep -n "paste into the Unit 8 sandbox\|Start from the Unit 8 sandbox\|replace \`src/parts.js\`\|your forked sleeve" unit-9-shader-literacy/index.md
  50:  … The bulb is three **CodeSandbox-ready** files you paste into the Unit 8 sandbox: `src/parts.js`, …
  184: Start from the Unit 8 sandbox. Same template, same pins, same `main.jsx`, `App.jsx`, … You replace three files.
  188: **CodeSandbox-ready** — replace `src/parts.js`. …
  582: 1. Keep the Unit 8 scene — your forked sleeve from the [Unit 8 lab](…) …

  # U9 parts.js extracted from the lesson, imported where Cover.jsx expects the cover ids:
  $ node -e "import('./parts.mjs').then(({PartId})=>{…})"
  cover ids after U9 parts.js paste: [ undefined, undefined, undefined ]
  after hovering any part, colours: [ 'HOVER', 'HOVER', 'HOVER' ]
  ```

- **Fix (one change set, two files, no code change):**
  - (a) U8 step 3: make the second sandbox mandatory. For example: "Fork the sandbox. The beacon sandbox stays as it is for Unit 9's bulb; the cover lives in the fork."
  - (b) U9 L50 and L184: say the bulb files go into the **beacon** sandbox, never into the cover fork.
  - (c) U9 lab step 1: say that on the cover fork the shader material is a **new** file used on the sleeve mesh in `Cover.jsx`, and that the cover `parts.js` is not replaced.
- **Downstream:** PHASE-X7.md L19 ("CodeSandbox-ready files that paste into the Unit 8/cover sandbox") must target the cover fork's file names (`Cover.jsx`, cover `parts.js`) and must not replace `parts.js`. Add one line to PHASE-X7.md Scope in the same change set as the F1 fix.

### F2 — U8 "From beacon to sleeve" contradicts its own steps

- **Severity:** P2
- **Blocks DONE:** no
- **The contradictions:**
  - The paragraph says "replace only the tree inside `Beacon.jsx`". Step 3 says to replace `src/parts.js`, *create* `src/Cover.jsx`, and swap the import in `App.jsx`. Step 2 also changes `<h1>` in `App.jsx`.
  - "the plinth, shaft, and lamp become a sleeve, a vinyl disc, and a stage" pairs plinth→sleeve and lamp→stage in reading order. The template's semantics are stage = what the cover stands on, which is the plinth's role.
  - The App.jsx Excerpt says "the only lines that change in `src/App.jsx`", and the next paragraph adds a third change (`<h1>`).
- **Evidence:** `grep -n "replace only the tree inside\|the only lines that change\|The \`<h1>\` gets" unit-8-r3f-fundamentals/index.md` → L813 (paragraph), L943 (Excerpt label), L957 (trailing sentence). They are three separate statements that disagree.
- **Fix:**
  - Paragraph: "replace the beacon's tree with a cover tree of your own (`Cover.jsx`)".
  - Reorder to "become a stage, a sleeve, and a vinyl disc".
  - Excerpt label: "the lines that change, besides the `<h1>` title".
  - Record the change in the U8 record's `amendments.diff` / `integrated.md`.

### F3 — U9 per-frame `BudgetProbe` paste reverts a cover team's own `CEILING` to the beacon's

- **Severity:** P2
- **Blocks DONE:** no
- **Problem:** U8 step 7 (new) has teams write their own measured values into `CEILING`. U9 lab step 5 (amended) tells a team that adds a pass to "swap in the per-frame `BudgetProbe`". That file is CodeSandbox-ready and hard-codes `CEILING = { calls: 6, triangles: 1368, geometries: 6, textures: 1 }`, and its label says "`CEILING` and `withinCeiling` are unchanged". On a cover, the paste puts the beacon ceiling back in silently, which is exactly the "copied 6 / 1368" error U8 step 7 forbids.
- **Evidence:** U9 L453ff contains `export const CEILING = {\n  calls: 6,\n  triangles: 1368,` under "**CodeSandbox-ready** — replace `src/BudgetProbe.jsx` only if you add a pass". U9 step 5 says "swap in the per-frame `BudgetProbe` … Those rows are the beacon's; a pass on your cover needs its own two rows". Nothing mentions `CEILING`.
- **Fix:** one clause in U9 step 5: "keep your own `CEILING` values from Unit 8 when you paste it". Leave the beacon file untouched.

### F4 — Records overstate how closely the shim's gates match `thessia_generate.py`

- **Severity:** P2
- **Blocks DONE:** no
- **Quote gate:** the report and the shim docstring say the shim "reproduces" the v2.1 quote gate. It does not.
  - The canonical gate passes quotations under `SHORT_QUOTE_WORD_THRESHOLD = 4` words, plus a `TRIVIAL_QUOTE_ALLOWLIST`.
  - The shim fails any quoted run of 3 or more characters.
  - U9 attempt 3's only quote was "shaders do things" (3 words), which the canonical gate would PASS.
  - So "all three attempts rejected by the harness (quote gate each time)" holds only for the shim. Attempt 3's rejection actually rests on the editorial read, which `evaluation.md` does document: invented "Unit 8 Lab B", hover-to-beats, a GLSL fragment.
- **CI3:** the shim's CI3 checks author-year membership only. It does not do the canonical Ahmes node/page fidelity check: U9 attempt 2's page-less `(Angel and Shreiner 2024)` got `"status": "PASS"`. This is moot for what shipped, because there are no citations.
- **The rejection decision is correct either way.**
- **Evidence:**

  ```text
  thessia_generate.py:107  SHORT_QUOTE_WORD_THRESHOLD = 4
  u9 attempt-3/citation-fidelity.json  "quotes": [{"quoted": "shaders do things", "status": "FAIL"}]
  u9 attempt-2/citation-fidelity.json  {"match": "(Angel and Shreiner 2024)", … "status": "PASS"}
  ```

- **Fix:** in the U9 record's `evaluation.md` / `provenance.json`, and in the gated U9 comment, change "quote gate FAIL" for attempt 3 to "shim quote gate FAIL (stricter than canonical; canonical would pass a 3-word quote) + editorial REJECT". Note in the shim docstring that its quote gate has no short-quote threshold and its CI3 does no node/page check. When the venv is repaired, optionally re-run attempt 2 of the U8 record through the canonical wrapper. That is not required for DONE.

---

## Observations (no finding)

- The satellite pages linked from both labs are still X4 stubs whose visible body is "forged in X7" / "forged in X8". These links are new in U8/U9, but the assignment already linked the same pages before X6. X7 and X8 replace the stub bodies. Do not merge `main` before they land.
- The verify log's gate passes on the U9 `1368`/`2026-10-22` greps. Those strings sat in U9 before X6, so that check cannot detect deletion of the U8 2026-10-21 table. I verified the U8 table separately (see the Acceptance table).

## Not done by this reviewer

- No lesson file was modified.
- Nothing was committed, pushed, or marked DONE.
- The cover scene was not rendered in a browser. Only the esbuild bundle was checked.

---

## Round 2

**Reviewer:** cascade-cold-reviewer, a fresh subagent. It implemented neither X6 nor the round-1 triage.
**Date:** 2026-11-04
**Inputs:**
- PHASE-X6.md Acceptance
- round 1 above
- PHASE-X6-REPORT.md "Triage round 1" (treated as claims)
- `git diff` vs `24d2b1c`: 7 files, including PHASE-X7.md
- PHASE-X6-VERIFY-LOG.md
- both tuning records
- CLAUDE.md and the two `.cursor/rules` files

**Ordering check:**
- Lesson files have mtime 21:30:51 local, PHASE-X7.md 21:30:52, and the report 21:31.
- The verify log started at 20:32:18Z (21:32 local) and exited 0, so the harness ran on the triaged text.
- I also re-ran `bash PHASE-X6.exit-gate.sh` myself: `build ok` / `OK PHASE-X6.exit-gate.sh`, exit 0.

**Verdict:** READY FOR DONE (product-owner decision). F1–F4 are closed. **0 blocking findings.** G1 and G2 are P2 and do not block.

### Closure table

| Finding | Status | Evidence (this round, re-run) |
| --- | --- | --- |
| **F1** (P1) bulb paste collides with the cover fork | **CLOSED** | See "F1 re-trace" below. The fork is mandatory (U8:823). All four U9 bulb fences are now targeted "in the beacon sandbox" (U9:184/188/216/276, and U9:50 "never into your cover fork"). U9 lab step 1 (U9:582) says to write a new material file in the cover fork, import it in `Cover.jsx`, and keep the cover `parts.js`. Both sandboxes were assembled from the lesson fences and bundled: `BUNDLE_OK`, ids resolve, and hover lights one part. The round-1 reproduction still produces all-HOVER, but only on a path that the pages now forbid in three places. PHASE-X7.md Scope agrees. |
| **F2** (P2) "From beacon to sleeve" contradicts its steps | **CLOSED** | `grep -n "replace only the tree inside\|the only lines that change\|become a sleeve, a vinyl disc, and a stage"` U8 → 0 hits. U8:813 reads "In a fork of the sandbox … replace the beacon's tree with a cover tree of your own in `Cover.jsx`, so the plinth, shaft, and lamp become a stage, a sleeve, and a vinyl disc", so stage now pairs with plinth. U8:943 reads "the lines that change in the fork's `src/App.jsx`, besides the `<h1>` title". U8:822 and :823 move the `<h1>` edit into the fork. Record check by script: `integrated-triage-1.md` is verbatim in the lesson → `True`, and the old `integrated.md` is no longer in the lesson → `False`. `diff -u integrated.md integrated-triage-1.md` is byte-identical (body) to `amendments-triage-1.diff`. The appended NOTE in `evaluation.md` keeps the history above it. |
| **F3** (P2) per-frame `BudgetProbe` reverts cover `CEILING` | **CLOSED** | U9:586 adds "On your cover fork, keep your own measured `CEILING` values from Unit 8 when you paste that file, not the beacon's 6 / 1368 it is published with." The beacon file and its label at U9:453 are untouched: `git diff -U0` shows no `-` line in that region. The U9 `1368` count went from 6 to 7, and the one new hit is this clause, attributed to the beacon. |
| **F4** (P2) shim gate fidelity overstated | **CLOSED** (residue ruled below) | NOTEs were appended to both `evaluation.md` files under a "text above is unchanged history" header. Verified against the evidence: `thessia_generate.py:107 SHORT_QUOTE_WORD_THRESHOLD = 4`; the U9 `attempt-3/citation-fidelity.json` has `"quoted": "shaders do things"` (3 words); the attempt-2 page-less cite is named. The report carries the mirrored sentence. |

### F1 re-trace (runnable)

The script `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/r2/assemble.py` extracts labelled fences from the **current** U8/U9 `index.md` and assembles three sandboxes:

- **beacon**: U8 `main.jsx`, `index.css`, `BudgetProbe.jsx`, and `App.jsx` as published, plus the three U9 bulb files. This is U8 step 1 followed by the U9 bulb section "in the beacon sandbox".
- **cover**: the same four U8 scaffold files, then U8 step 3. The App.jsx Excerpt swap is applied by assertion (exactly one `import Beacon` line and one `<Beacon` element), and the `<h1>` is replaced. The cover `parts.js` Template and the `Cover.jsx` Template are added. Then U9 lab step 1: a new `SleeveMaterial.jsx` (a minimal drei `shaderMaterial` with `uTime` and `uHot`), imported in `Cover.jsx` and used on the sleeve mesh in place of its `meshStandardMaterial`. The cover `parts.js` is kept.
- **cover-neg**: the round-1 reproduction. The `cover` sandbox, but with U9's bulb `parts.js` pasted over the cover `parts.js`.

They were bundled with esbuild from `react-template`'s `node_modules` (three 0.185.1, fiber 9.8.2, drei 10.7.9, react 19.3.1) and then checked with `ids.mjs`. That script imports `parts.js` in node, resolves every `PartId.<k>` the tree file uses, and simulates `colorFor` after hovering the first part:

```text
beacon BUNDLE_OK
cover BUNDLE_OK
cover-neg BUNDLE_OK
beacon Beacon.jsx ids used: plinth,shaft,lamp -> ["plinth","shaft","lamp"] | panel: Plinth/Shaft/Lamp
  after hovering plinth colours: ["HOVER","idle","idle"]
cover Cover.jsx ids used: stage,sleeve,vinyl -> ["stage","sleeve","vinyl"] | panel: Sleeve/Vinyl/Stage
  after hovering stage colours: ["HOVER","idle","idle"]
cover-neg Cover.jsx ids used: stage,sleeve,vinyl -> [null,null,null] | panel: Plinth/Shaft/Lamp
  after hovering stage colours: ["HOVER","HOVER","HOVER"]
```

(`null` is how `JSON.stringify` prints `undefined` inside an array.)

**Why the published path can no longer reach `cover-neg`:**

1. U8:823 makes the fork mandatory and states that the beacon sandbox stays as published *because* the bulb goes into it.
2. Every U9 fence that writes a file is now scoped "in the beacon sandbox". U9:184 also warns that pasting into the cover fork removes the ids "without an error". The `cover-neg` run shows that this warning is accurate: the documentation claim was checked, not taken on trust.
3. U9 lab step 1 sends the cover work to a **new** file. It says explicitly "Keep the cover `parts.js` as it is, and do not paste `Beacon.jsx` or `BulbMaterial.jsx` into the fork."

The cover fork's `App.jsx` depends only on `PARTS` (L6, L40, L63), so the cover `parts.js` keeps the panel coherent. The `SleeveMaterial.jsx` used here is mine: it proves that the U9 step-1 *shape* (a new file, imported in `Cover.jsx`) compiles beside the Templates. It is not lesson code, and nothing was rendered in a browser.

**PHASE-X7.md:** the Scope line (L19) now targets the "Unit 8 **cover fork** (cover `parts.js` ids sleeve/vinyl/stage, `Cover.jsx`), never into the beacon sandbox: the cover shader is a new material file used from `Cover.jsx`, and the cover `parts.js` is not replaced". This matches U9:582 word for word in substance. X7's Acceptance ("at least one CodeSandbox-ready material file with `sampler2D` / `uMap`") fits a new-file model. No other phase file needs amending for F1.

### F4 residue — ruling: does not matter for DONE

The executor left three statements unchanged:

1. the gated U9 comment "all REJECTED (quote gate FAIL; invented commands, file paths, lab names)"
2. the `scribe_http.py:6` docstring "This shim reproduces the wrapper's gates over HTTP"
3. the U9 `provenance.json` reasons ("quote gate FAIL; …")

The ruling:

- **Statements 1 and 3 are literally true.** The shim's quote gate did FAIL. `provenance.json`'s own `harness` field names the shim. Each reason also lists the editorial ground that carries the rejection.
- **The gated comment is not published.** Built U8/U9 HTML, `exercises.md` and `deck-outline.md` show 0 hits for `tuning_record|curriculum-internal|thessia|deviac|ahmes|coat|scribe_http`.
- **Statement 2 overstates, and the overstatement is now contradicted in the same record directory** by the U8 NOTE ("The docstring line 'reproduces the wrapper's gates' overstates this").
- **Nothing shipped depends on these statements.** U8's integrated paragraph has no citation and no quote, and U9 shipped no Thessia prose.
- **The shim lives only inside this record.** `find ~/src/deviac -name scribe_http.py` returns that single path. No PHASE-X7…X12 file references it.

**Recommendation (non-blocking):** if X7 or X8 has to fall back to the shim, copy it with a corrected docstring and do not re-copy this one verbatim.

### Regression checks (triage did not break round-1 passes)

- **Beacon tables.** `git diff -U0 -- web-foundations | grep '^-'` removes only prose lines: the old lab list, the code notes, the U9 bulb labels, the deck items and the session outcomes. It removes no table row, no `CEILING` literal and no "Measured …" line. Current rows:
  - U8:792 `| reference | Apple M4 Max, 2026-10-21 | off | 6 | 1368 | 6 | 1 | yes |`
  - U8:383–386 ceiling table 6 / 1368 / 6 / 1 under "Measured 2026-10-21" (U8:379)
  - U9:444–447 Bloom table 6/1368 off → 23/1385 on, under "Measured 2026-10-22" (U9:440)
- **Counts, base → now:**

  | File | `1368` | `2026-10-21` | `2026-10-22` | `1385` | `2736` | `\| 6 \|` |
  | --- | --- | --- | --- | --- | --- | --- |
  | U8 | 4→6 | 4→5 | — | — | 2→2 | 4→4 |
  | U9 | 6→7 | — | 3→3 | 2→2 | — | 2→2 |

  Every added hit is attributive prose or the gated comment. No cover `renderer.info` number appears anywhere.
- **Labels.** All 20 U8 fences and 14 U9 fences carry a label or sit under an Excerpt/Template heading (extractor listing).
  - New U9 labels: `**CodeSandbox-ready** — in the beacon sandbox, …`. These are honest, because the `beacon` sandbox bundles with them.
  - U8 cover files: still Template, plus an Excerpt for the App.jsx lines.
  - G2 below is a wording asymmetry, not a dishonest label.
- **U8 ↔ U9 consistency.**
  - U8:823 "Unit 9's bulb goes into it" matches U9:184 "the one the Unit 8 lab keeps as published".
  - The `<h1>` edit is only in the fork (U8:822), so the beacon sandbox U9 starts from really is "as published".
  - U9 lab step 1 matches U8 step 3's file names (`Cover.jsx`, cover `parts.js`).
  - U9 step 5 (own `CEILING`) matches U8 step 7 (measure your tree, do not copy 6 / 1368).
- **Links under baseurl** (`baseurl: '/web-atelier-udit'`). Every non-external, non-fragment `href` in built U8/U9 resolves to an existing `_site` file after the baseurl prefix is stripped. The only exception is `mailto:` in the footer.
  - `id="lab-team--workplace-like--3-h"` appears once in U8 and once in U9.
  - U9 → `/web-atelier-udit/lessons/en/feii/unit-8-r3f-fundamentals/#lab-team--workplace-like--3-h` resolves.
  - No markdown `](./` or `](../` links were found in U8/U9.
  - `git diff --check` → exit 0.
- **Internal metadata.** Built U8/U9 `index.html`, `exercises.md` and `deck-outline.md` give 0 hits for the pattern above, and 0 for `{%` or `publish_internal_metadata`.
- **Code survives Liquid.** Stripped built HTML contains, once each:
  - U8: `node.position.x = 0.3 + 0.12 * Math.sin(phase.current * 0.8)`, `{...bindPart(PartId.sleeve, onHover, onSelect)}`, the `Cover` signature, "Fork the sandbox." and "This step is not optional."
  - U9: "7. Sampler (album cover only)", "keep your own measured CEILING values", "never into your cover fork", "Keep the cover parts.js as it is".
- **B3/B2.** Neither `exercises.md` changed in the triage: mtime 21:19:16, the same as the first pass. The diff is still additions only, one paragraph each, and the drills are byte-identical to base.
- **Build.** I ran `cd web-foundations && npm run build` myself: `exit=0`, `grep -c "Liquid Warning"` → `0`. It printed "Publication safety passed…", "Citation conformance passed…" and "[mark-broken-links] No error files found".

### New findings

#### G1 — Mandatory lab fork now reads against the assignment's "does not ask for a second sandbox"

- **Severity:** P2
- **Blocks DONE:** no
- **Tension:** the triage made the fork mandatory. U8:823 says "**Fork the sandbox.** This step is not optional." and then "swap the import and the `<h1>` in `App.jsx`". The assignment page (X5, outside this diff) says, at `units-8-9-assignment/index.md:109` under "What this file does not ask for": "A second sandbox or a rewrite of `App.jsx`". At :101 it says "Never replace `src/App.jsx`".
- **Why it is not a contradiction:** the assignment scopes its list to "this file", meaning the hand-in route in the aggregator. U8:959 already separates the two: "Where the state and the panel live on a route is set by that repository's `_template`, not by this sandbox's `App.jsx`".
- **Why it is still a finding:** a student who reads the assignment after U8 step 3 meets "no second sandbox" right after "fork is not optional". Round 1's optional fork softened this tension, so the triage sharpened it.
- **Evidence:**
  - `grep -n "This step is not optional" unit-8…/index.md` → `823:`
  - `grep -n "A second sandbox or a rewrite" units-8-9-assignment/index.md` → `109:`
- **Fix:** add one clause to U8 step 3: "The fork is a lab sandbox, not the hand-in; the assignment route needs no second sandbox and no `App.jsx` edit." Do not edit the assignment.

#### G2 — Cover `parts.js` Template label does not say "in the cover fork"

- **Severity:** P2
- **Blocks DONE:** no
- **Asymmetry:** U8:832 reads `**Template** — replace \`src/parts.js\`.`, but its sibling at U8:862 reads "create `src/Cover.jsx` in the cover fork", and all three U9 bulb labels say "in the beacon sandbox". F1 was this exact `parts.js` mis-targeting, and this is the one write-label in the chain that still does not name its sandbox.
- **Mitigations:** the heading (`#### src/parts.js — cover`) and step 3 ("In the fork, replace `src/parts.js`") both scope it.
- **Consequence if mis-pasted:** the beacon sandbox loses its ids silently. The U9 bulb `parts.js` paste later restores them.
- **Evidence:** `grep -n '^\*\*Template\*\* — replace \`src/parts.js\`' unit-8…/index.md` → `832:` (no "fork").
- **Fix:** change the label to "**Template** — in the cover fork, replace `src/parts.js`."

### Observation (no finding)

- U9 lab step 1 swaps the sleeve's `meshStandardMaterial` for the student's shader, which drops `colorFor`'s hover/selection tint on the sleeve. Hover and click still write React state (U8 step 5 still holds) and the DOM panel still updates. Step 2 ("Drive one uniform from React") is where a team restores the tint, as the bulb does with `uHot`. That is a teaching choice that is open to the team, not a defect. X7 may want to say it in one line.

### Not done by this reviewer (round 2)

- No lesson, plan, or record file was edited. This section was appended, and round 1 above is byte-for-byte intact.
- Nothing was committed, pushed, or marked DONE.
- No browser render: the evidence is bundle, id resolution, and hover simulation.
