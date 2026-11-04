# PHASE-X6 report — Units 8–9 point at the album cover

**Status:** DONE (orchestrator, 2026-11-04, after round-2 cold review; implementer stopped at VERIFYING)

Implementer: cascade-phase-executor (Claude), worktree `web-atelier-udit-album-FEII-3D-ALBUM-KTX-6`, branch `cascade/FEII-3D-ALBUM-KTX-6`, `.cascade-lane` = `FEII-3D-ALBUM-KTX` (checked). Nothing committed or pushed. Exit gate not run by the executor.

## Files changed (worktree)

- `web-foundations/docs/lessons/en/feii/unit-8-r3f-fundamentals/index.md`
  - code-convention note names the two new lab **Templates**
  - new learning objective: fork the measured beacon into the first draft of the album cover
  - capstone intro: one sentence pointing at the lab fork
  - Lab rewritten: subsection "From beacon to sleeve" (one lesson-scribe paragraph, switch-gated `tuning_record` comment), 8 steps (run beacon → name album → fork → compose → pointer events → `useFrame` → measure your own `CEILING` + `cover` row → merge log), **Template** `src/parts.js` (sleeve / vinyl / stage), **Template** `src/Cover.jsx`, **Excerpt** of the `App.jsx` import swap; deliverable maps to assignment task1 and the route's `Cover.jsx` (tree, no Canvas, per REPO-SHAPE/D15)
  - links added: `units-8-9-assignment` (lab intro, session outcome), `ktx2-basis` (×2), `cover-shaders` (×1)
  - Session outcome: the beacon stays the demonstration; the sleeve is the tree you carry into the assignment
- `web-foundations/docs/lessons/en/feii/unit-9-shader-literacy/index.md`
  - code-convention note: a seventh shader-note line (sampler) belongs to the cover
  - Lab: new subsection "The bulb is the demonstration, the sleeve is the hand-in" (operator-written lab brief, not B1 — see Thessia section), switch-gated `tuning_record` comment, steps reworked (shader goes on the sleeve mesh; new step 4 "Your cover, not the beacon" about UV vs view space; post-pass rows are the beacon's), deliverable maps to assignment task2
  - `docs/shader-note.md` Template: line 7 "Sampler (album cover only)"
  - Session outcome: the scene is the album sleeve; its shader samples the cover picture (link `cover-shaders`)
- `web-foundations/docs/lessons/en/feii/unit-8-r3f-fundamentals/deck-outline.md`: item 9 forks the beacon into a sleeve and says the 6 / 1368 numbers stay the beacon's; new item 10 (flat sleeve; picture comes from Cover shaders + KTX2); handoff renumbered to 11
- `web-foundations/docs/lessons/en/feii/unit-9-shader-literacy/deck-outline.md`: item 10 says the cover shader samples the sleeve picture and is not a paste of `BulbMaterial`
- `web-foundations/docs/lessons/en/feii/unit-8-r3f-fundamentals/exercises.md`, `.../unit-9-shader-literacy/exercises.md`: one paragraph each saying the drills stay decontextualised (B3) and cover work stays in the team lab (B2). The drills themselves are unchanged.
- This report.

**Untouched on purpose:** Unit 8 accepted-ceiling table (2026-10-21; calls 6 / triangles 1368 / geometries 6 / textures 1) and its shadow row; `docs/renderer-info.md` Template; Unit 9 platform pin table; the 2026-10-22 bulb sample; the 2026-10-22 Bloom table (6/1368 → 23/1385, textures 1 → 18); every CodeSandbox-ready beacon/bulb file; satellites `cover-shaders/` and `ktx2-basis/` (still X4 stubs); `lessons.yml`; `tracks.yml`. No three.js pin changed. No cover renderer.info number is printed anywhere: the page says outright that it publishes none for `Cover.jsx`.

## Commands run and real output

Baseline before edits: `cd web-foundations && npm run build` → exit 0, 0 `Liquid Warning`.

After the final edit:

```text
$ cd web-foundations && npm run build > x6-build2.log 2>&1; echo exit=$?
exit=0
$ grep -c 'Liquid Warning' x6-build2.log
0
                    done in 3.384 seconds.
Publication safety passed: no internal corpus or local-architecture metadata is publishable.
Citation conformance passed for canonical lessons.
```

Greps equivalent to the gate's (the gate script itself was not run):

```text
rg -c units-8-9-assignment  unit-8/index.md → 4     unit-9/index.md → 2
rg -ci "album|sleeve"       unit-8/index.md → 19    unit-9/index.md → 9
rg -n 1368 unit-9/index.md  → lines 390, 444, 446, 449, 453, 461
rg -c 2026-10-22 unit-9/index.md → 3
find thessia-tuning-memory -newer PHASE-X6.md -mindepth 1 -maxdepth 1 →
  2026-11-04-fb4ae679-b012-46fb-a97e-ca555f6ebc27-feii-u9-lab-1
  2026-11-04-3013b8ca-6cd5-4cdd-9c2c-e5e4cec2f926-feii-u8-lab-1
git diff --check → exit 0
```

Checks against the built output:

- `_site/lessons/en/feii/unit-8-r3f-fundamentals/index.html` and `unit-9-shader-literacy/index.html` exist. Both carry `id="lab-team--workplace-like--3-h"`. The U8 in-page `#lab-…` link and the U9 → U8 cross-link (`/web-atelier-udit/lessons/en/feii/unit-8-r3f-fundamentals/#lab-team--workplace-like--3-h`) point at it.
- Link targets exist: `_site/lessons/en/feii/{cover-shaders,ktx2-basis,units-8-9-assignment}/index.html`.
- `grep -c "tuning_record|thessia|curriculum-internal"` on both built pages → 0 (the switch-gated comments do not publish).
- No new fence in either lesson contains `{{` or `{%` (scripted count 0). After stripping tags, the template code survives in the HTML (`node.position.x = 0.3 + 0.12 * Math.sin(phase.current * 0.8);`, `{...bindPart(PartId.vinyl, onHover, onSelect)}`).
- The `Cover.jsx` Template was bundled with esbuild against `react-template`'s pinned `node_modules` (three 0.185.1, fiber 9.8.2, react 19.3.1): `BUNDLE_OK`. That proves syntax and imports only. It was **not** rendered in a browser and **not** measured, which is why it is labelled Template and has no CEILING row.

## Lesson-scribe records

Both records are under `/Users/ruvebal/src/deviac/fine-tuning/thessia-tuning-memory/`:

1. `2026-11-04-3013b8ca-6cd5-4cdd-9c2c-e5e4cec2f926-feii-u8-lab-1/` contains BRIEF.md, prompt.md, thessia-raw.md (+ `.logprobs.json`, perplexity 6.13), citation-fidelity.json, generation.log, evaluation.md, amendments.diff, integrated.md, provenance.json, scribe_http.py, and `attempt-1/` (rejected by the quote gate).
   - **Integrated** into the U8 lab as "From beacon to sleeve", heavily amended.
2. `2026-11-04-fb4ae679-b012-46fb-a97e-ca555f6ebc27-feii-u9-lab-1/` contains BRIEF.md, prompt.md, evaluation.md, provenance.json, and `attempt-1/`, `attempt-2/`, `attempt-3/`, each with its rejected raw, logprobs, citation-fidelity and prompt.
   - **Nothing integrated.**

**Harness deviation, which the cold reviewer should weigh:** `thessia_generate.py` could not run. It imports the python `ollama` and `yaml` packages, neither is installed, and `~/src/deviac/fine-tuning/.venv/bin/python` is a broken symlink. I did not install packages or repair the venv because disk is tight and it is outside the phase. Instead I wrote a stdlib HTTP shim, `scribe_http.py` (a copy is in record 1). It calls `/api/generate` with `stream:false`, `logprobs:true` and `keep_alive:0`, and it reproduces these gates:
- the load gate (refuses if a `thessia-*` model is already loaded)
- the CI2 logprobs sidecar
- CI3 against a closed registry (Angel and Shreiner 2024 only)
- the v2.1 quote gate, run with an empty verbatim registry
- the v2.1 `[S1]…[S4]` marker gate

`/api/ps` was empty before every call. Model: `thessia-scholar-v3:latest`. No `ollama run` CLI, no cloud SDK. DevIAC/Athanor was down, so input (c) in both BRIEFs is declared empty, not invented.

## What I rejected from Thessia and why

- **U8, attempt 1 (rejected by the harness).** It contained two fabricated quotations and invented an exercise with "three spheres". It gave `textures:0` (the beacon reads 1) and made up a triangle count ("1025 triangles tonight").
- **U8, attempt 2 (passed the gates, then amended).** I kept the kernel:
  - six meshes; same code, new scene
  - fork; sleeve; measure your own ceiling; no texture yet
  - the question about how many geometries two stacked vinyls give, which is the best line it produced

  I removed:
  - an invented `beacon.html`
  - "swap out all but one mesh" and "without … lights", both of which contradict the lab
  - "next week"
  - a garbled fifth sentence

  The integrated text adds no citation. The 6 / 1368 numbers are attributed to the beacon. The diff is in `amendments.diff`.
- **U9, all three attempts rejected by the harness** (quote gate each time). The prompt was tightened for attempt 2, and attempt 3 used temperature 0.3 and seed 1104. They fabricated:
  - an npm command (`npm run lab:cover -- -d cover-bulb-only.glsl`)
  - a file path (`Lab9-Album-Cover/cover-shaders.html`)
  - "Unit 8 Lab B", a hover-to-beats behaviour and quoted GLSL fragments
  - a page-less `(Angel and Shreiner 2024)`
  - a stray "2023-9"

  I followed the phase's still-success clause: the paragraph was rejected and not shipped. Unit 9 gets operator-written **lab-brief** lines only. They restate lesson facts: the rim comes from the normal and the view direction, there is no picture, the cover shader samples at a UV through `sampler2D`, and a paste fails checklist item 5. They are not B1 Masterclass prose, and the gated comment in the lesson says so.

## Acceptance (executor's reading; the cold reviewer decides)

- [x] The beacon budget table is still present. The U8 accepted ceiling is dated 2026-10-21, and the U9 bulb sample and Bloom table are dated 2026-10-22. Neither was edited.
- [x] The assignment permalink appears in both unit labs (U8 in the lab intro, steps and deliverable; U9 in the lab intro).
- [x] Two lesson-scribe tuning-memory directories, dated 2026-11-04, are newer than PHASE-X6.md.
- [x] `npm run build` exits 0 with no `Liquid Warning`.
- [ ] The cold review is filed. That is the orchestrator's next step, not mine.

## Open uncertainties

1. **Shim vs canonical wrapper.** The CI3 parser in the shim is simpler than `thessia_generate.py`'s tabular registry parser. A reviewer may want the canonical wrapper re-run once the python environment is repaired. The U8 integrated paragraph carries no citation, so CI3 risk is nil there.
2. **The U9 cover pointer is operator prose, not Thessia.** If the professor reads "every new/replaced B1 paragraph" as covering the U9 lab-brief subsection, this is a deviation the reviewer should rule on. The record documents the three rejections that led to it.
3. **The `Cover.jsx` Template has never run in a browser.** Its composition (positions, the disc sitting behind the sleeve, the camera framing from the beacon's `CAMERA`) is reasoned, not observed. It is labelled Template for that reason, and no budget is printed for it.
4. **Statements about the aggregator.** The U8 deliverable says the route's `src/Cover.jsx` is "a tree with no `<Canvas>`, because the gallery supplies the Canvas". It defers state and panel placement to the aggregator's `_template`. Both come from frozen REPO-SHAPE.md / D15, but the aggregator does not exist until X9. If X9 changes that contract, U8's deliverable paragraph must change with it, and this is flagged for X9/X11.
5. **Picture ordering.** U8 now says the sleeve picture comes "through the cover shader and the KTX2 lesson". That matches the assignment's task2 (sampler) → task3 (KTX2) order. X7 and X8 should keep it.
6. **The U9 shader-note Template now has 7 lines,** and the lab still says "all six checklist items" plus line 7 as a placeholder. The assignment's shader-note already asks for the sampler, so this aligns the two. The graded checklist itself was not changed and still has six items.

## Triage round 1 (cold review F1–F4)

Corrective edits only, same worktree, amending the X6 diff. **No Thessia calls were made in this round:** the changes are operator corrections of existing lesson text, plan text and record notes, not new B1 prose. Not touched: beacon measurement tables, satellites, `lessons.yml`. Nothing committed. Exit gate not run by the executor.

| Finding | Change made (file:line) | Evidence |
| --- | --- | --- |
| **F1** (P1) bulb paste collides with cover fork | `unit-8-r3f-fundamentals/index.md:823`: step 3 is now "**Fork the sandbox.** This step is not optional. The beacon sandbox stays exactly as published, because Unit 9's bulb goes into it; the cover lives in the fork." The commit-or-fork option is gone. `:862`: the `Cover.jsx` Template says "create … in the cover fork". `:822`: step 2 moves the `<h1>` edit into the fork, so the beacon sandbox stays as published. `unit-9-shader-literacy/index.md:50`: the bulb files go into the "Unit 8 **beacon** sandbox, never into your cover fork". `:184`: "Start from the Unit 8 **beacon** sandbox … Do not paste these files into your cover fork" and why (the ids vanish without an error). `:188`, `:216`, `:276`: labels now say "in the beacon sandbox". `:582`: lab step 1 says to work in the cover fork and write a **new** material file, imported in `Cover.jsx` and used on the sleeve mesh. Keep the cover `parts.js`, do not paste `Beacon.jsx`/`BulbMaterial.jsx`, and the sampling is taught in Cover shaders. `PHASE-X7.md:19`: Scope now says the files go into the Unit 8 **cover fork**, never the beacon sandbox. The cover shader is a new material file used from `Cover.jsx`, and the cover `parts.js` is not replaced. | `grep -n "paste into the Unit 8 sandbox\|Start from the Unit 8 sandbox\|or the beacon if the fork is not ready\|commit it, or fork the sandbox\|Unit 8/cover sandbox"` over U8, U9 and PHASE-X7.md finds no hits. The new wording is at the lines listed. The built U9 HTML contains "in the beacon sandbox" 4×. |
| **F2** (P2) "From beacon to sleeve" contradicts steps | `unit-8-r3f-fundamentals/index.md:813`: "In a fork of the sandbox, keep … ; replace the beacon's tree with a cover tree of your own in `Cover.jsx`, so the plinth, shaft, and lamp become a stage, a sleeve, and a vinyl disc". Stage now pairs with plinth. `:943`: the Excerpt label reads "the lines that change in the fork's `src/App.jsx`, besides the `<h1>` title". Recorded in the U8 tuning record as `integrated-triage-1.md` + `amendments-triage-1.diff`, plus an appended NOTE in `evaluation.md`. `integrated.md` is unchanged. | `grep -n "replace only the tree inside\|the only lines that change\|become a sleeve, a vinyl disc, and a stage"` on U8 finds no hits. |
| **F3** (P2) per-frame `BudgetProbe` reverts cover `CEILING` | `unit-9-shader-literacy/index.md:586`: step 5 adds "On your cover fork, keep your own measured `CEILING` values from Unit 8 when you paste that file, not the beacon's 6 / 1368 it is published with." The beacon `BudgetProbe` file and its label (`:453`) are untouched. | `grep -n "keep your own measured \`CEILING\`"` matches U9:586. U9 now has `1368` 7× (was 6). The new hit is this clause and is attributed to the beacon. |
| **F4** (P2) shim gate fidelity overstated | NOTE appended (history kept) to `~/src/deviac/fine-tuning/thessia-tuning-memory/2026-11-04-3013b8ca-…-feii-u8-lab-1/evaluation.md` and `…/2026-11-04-fb4ae679-…-feii-u9-lab-1/evaluation.md`. | See the sentence below. |

**F4, mirrored:** `scribe_http.py`'s quote gate is stricter than canonical `thessia_generate.py`: it fails quotations under 4 words, which canonical passes. Its CI3 cite check is weaker: it passed U9 attempt 2's page-less `(Angel and Shreiner 2024)`. So the U9 rejection stands on editorial grounds (invented commands, paths, labs and GLSL), not on the shim's quote gate alone.

**Not changed in this round, flagged:**
- The gated (unpublished) `tuning_record` comment in U9 still says "quote gate FAIL". The reviewer's F4 fix also suggested qualifying it there.
- The `scribe_http.py` docstring still says "reproduces the wrapper's gates".
- U9 `provenance.json` reasons are not edited.

All three were left as they are because this round's F4 scope was the record NOTEs plus this sentence. The NOTEs qualify all three.

**Re-run after triage:**

```text
$ cd web-foundations && npm run build > x6-triage-build.log 2>&1; echo exit=$?
exit=0
$ grep -c "Liquid Warning" x6-triage-build.log
0
Citation conformance passed for canonical lessons.
grep -ci "album|sleeve"   U8 → 19   U9 → 10
grep -c 1368 U9 → 7 ; grep -c 2026-10-22 U9 → 3
grep -c 2026-10-21 U8 → 5 ; grep -c 1368 U8 → 6
git diff --check → exit 0
built U8/U9 HTML: grep -c "tuning_record|curriculum-internal" → 0 / 0
```

## Exact resume point

Run `autopilot.sh verify PHASE-X6.md` (harness), then a fresh `cascade-cold-reviewer` on this diff, this report, the verify log and the two tuning-memory records. Nothing has been committed. Do not open X7 until X6 is landed.


## Orchestrator triage (DONE decision)

| Finding | Severity | Outcome |
| --- | --- | --- |
| F1 Unit 9 bulb paste breaks the cover fork | P1 | Closed in triage round 1; round-2 reviewer re-ran the reproduction via esbuild bundles + hover simulation |
| F2 Unit 8 paragraph contradicts its steps | P2 | Closed |
| F3 BudgetProbe overwrites the team ceiling | P2 | Closed |
| F4 shim gates overstated in records | P2 | Closed as scoped (appended NOTEs); residue ruled immaterial by round 2 |
| G1 mandatory lab fork vs assignment "no second sandbox" | P2 | **Deferred to X11** (one clause in U8 step 3: lab sandbox, not the hand-in) — written into PHASE-X11.md |
| G2 U8 parts.js Template label omits "in the cover fork" | P2 | **Deferred to X11** — written into PHASE-X11.md |

Not done by anyone: rendering the cover scene in a browser (evidence is bundle + id resolution + hover simulation).
