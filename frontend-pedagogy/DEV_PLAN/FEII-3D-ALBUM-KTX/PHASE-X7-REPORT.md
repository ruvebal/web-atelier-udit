# PHASE-X7 report — Cover-shaders satellite lesson

**Status:** DONE (orchestrator, 2026-11-04, after round-2 cold review; implementer stopped at VERIFYING)

Implementer: cascade-phase-executor (Claude), worktree `web-atelier-udit-album-FEII-3D-ALBUM-KTX-7`, `.cascade-lane` = `FEII-3D-ALBUM-KTX` (checked before any edit). Nothing committed or pushed. The exit-gate script was not run by the executor. The KTX2 stub (`ktx2-basis/`) and every other phase's files are untouched.

## Files changed (worktree)

- `web-foundations/docs/lessons/en/feii/cover-shaders/index.md` — the X4 stub is replaced by the full lesson. The string "forged in X7" is gone from source, data, and built site (`rg -c "forged in X7"` → no hits).
  - Frontmatter keeps slug, permalink and tags. It adds `description` and sets `status: complete`. It has the semantic-graphic include and the exact TOC fence.
  - Epigraphs, read by ID through ttod-bridge (`TTODCliAdapter.read_quote`): `img-001` at the opening and `cc-002` at the close.
  - The "This is not Unit 9" callout says Unit 9 stays the intro and that pasting the bulb fails U9 item 5 and assignment bar 2. It is followed by the AI disclosure (covenant + Unit 6 merge log) and the code-label convention note.
  - Scholarly honesty / declared pilot: (Angel and Shreiner 2024, 1–2), with the coat, node, matrix-row and gap trail inside a `publish_internal_metadata` gate.
  - Learning objectives.
  - B1 "A picture, and a place on it" is operator prose. It says what a sampling shader does in plain words before any jargon. It is followed by an Excerpt diagram, a three-row vocabulary table (picture → `sampler2D uMap`, place → `vUv`, look up → `texture2D`), and the **texel** definition in one sentence that points at the KTX2 satellite for GPU memory. KTX2 itself is not taught.
  - B1 "Change the place, or change the answer" is Thessia attempt 1, amended. "Why the material has two colour lines" is operator text.
  - Sandbox setup — cover fork: open the U8 cover fork (never the beacon), nothing to install, create two files, three changes in your own `Cover.jsx`, leave `parts.js` / `App.jsx` / `BudgetProbe` alone. It warns that `textures` +1 makes the verdict `over ceiling` until `CEILING` is updated (ties to U8 step 7). A dated pin table follows.
  - **CodeSandbox-ready** `src/sleevePicture.js`: a canvas placeholder with a UV label at each corner, the `useSleevePicture` hook, and JSDoc on both exports.
  - **CodeSandbox-ready** `src/SleeveMaterial.jsx`: drei `shaderMaterial` with `uMap` / `uTime` / `uHot`, a `sampler2D`, `vUv`, `mediump`, wrapped `uTime`, reduced motion, the 30-shaders header, no loop or discard, and JSDoc. The fence is wrapped in `{% raw %}`.
  - **Excerpt**: the three `Cover.jsx` changes, wrapped in `{% raw %}`.
  - Line-by-line reading of the material, then "What was checked, and what was not". That section gives honest render provenance: SwiftShader, not a GPU, and no cover budget published.
  - "Your own photo" **Template** (`useTexture` variant) with what to customise, the D8 IP rule, the square crop, and the KTX2 hand-off.
  - "Explain this shader" checklist (7 items) plus a **Template** for shader-note line 7.
  - Failure modes, lab mapping to assignment task2, independent self-check, dated platform notes (autolinks), session outcome, and References (Chicago, Angel and Shreiner only).
  - A professor answer sketch for the self-check and exercises sits inside the internal gate.
- `web-foundations/docs/lessons/en/feii/cover-shaders/exercises.md` (new). Five individual, decontextualised drills, including one diagnostic (the dark sleeve) and two declared solvable without AI. Same no-frontmatter shape as U9's exercises.md.
- `web-foundations/docs/lessons/en/feii/cover-shaders/deck-outline.md` (new). Eleven speaker claims.
- `web-foundations/docs/_data/lessons.yml`: `feii-cover-shaders` status changes from `en: draft` to `en: complete`, to agree with the page frontmatter. The slug is unique (1 hit).
- This report.

**Not changed, on purpose:**
- U8, U9, and the assignment. They already link `cover-shaders`: U9 ×3 (L574, L582, L615), assignment ×1 (L36).
- The `ktx2-basis` stub.
- `tracks.yml` (D1: no new session rows; hours unchanged).
- react-template. Read-only use of its `node_modules`.

## Commands run and real output

Baseline lane check: `cat .cascade-lane` → `FEII-3D-ALBUM-KTX`. `git status` was clean at start.

**Build (final run, after the last edit):**

```text
$ cd web-foundations && npm run build > x7-build3.log 2>&1; echo build_exit=$?
build_exit=0
$ grep -c "Liquid Warning" x7-build3.log
0
                    done in 3.318 seconds.
Publication safety passed: no internal corpus or local-architecture metadata is publishable.
Citation conformance passed for canonical lessons.
```

The page includes `lesson-semantic-graphic.html`, so the citation-conformance audit now covers it, and it passes. References is the final level-two section.

**Gate-equivalent greps.** The gate script itself was not run.

```text
rg -c sampler2D  cover-shaders/index.md         → 7
rg -c uMap       cover-shaders/index.md         → 17
rg -c CodeSandbox-ready cover-shaders/index.md  → 4
rg -c "slug: feii-cover-shaders$" _data/lessons.yml → 1
rg -c cover-shaders unit-9-shader-literacy/index.md → 3
rg -c cover-shaders units-8-9-assignment/index.md   → 1
test -f _site/lessons/en/feii/cover-shaders/index.html → exists
rg -ci "ahmes|deviac|evaluator_safe|BIBLIO-GAP" <built page> → no hits
rg -ci "tuning_record|thessia|curriculum-internal|publish_internal|raw %" <built page> → no hits
rg -c "forged in X7" docs/lessons/en/feii docs/_data _site/lessons/en/feii → no hits
git diff --check → exit 0
```

**Built links.** All are `relative_url` → `/web-atelier-udit/lessons/en/feii/{ai-assisted-3d-covenant, cover-shaders, ktx2-basis, unit-6-ai-code-review, unit-8-r3f-fundamentals/#lab-team--workplace-like--3-h, unit-9-shader-literacy, units-8-9-assignment}/`. The targets exist in `_site`, and the U8 anchor exists (verified by X6).

**Code survived Liquid/Kramdown.** I parsed every `<pre><code>` in the built HTML, stripped the tags, and HTML-unescaped the text. Each of these is byte-identical (after trim) to the file that was bundled and rendered:
- `fork/src/sleevePicture.js`
- `fork/src/SleeveMaterial.jsx`
- `photo/src/sleevePicture.js`

Re-extracting the three fences from the source `.md` and running `diff` against the same files also shows no difference.

**esbuild bundle check.** The full cover fork was assembled under the scratchpad:
- `main.jsx`, `index.css`, `BudgetProbe.jsx`, `App.jsx`: extracted by script from the U8 lesson.
- `App.jsx`: the documented Beacon→Cover swap and `<h1>` change applied.
- Cover `parts.js` and `Cover.jsx`: from the U8 Templates.
- The three Excerpt changes, applied by script.
- The two new files.

```text
$ NODE_PATH=<react-template>/node_modules esbuild fork/src/main.jsx --bundle --format=iife --jsx=automatic --loader:.js=jsx ...
esbuild exit=0          (three 0.185.1, fiber 9.8.2, drei 10.7.9, react/react-dom 19.3.1, esbuild 0.28.2)
```

The own-photo Template variant also bundled with exit 0.

**Browser render (beyond syntax).** Headless Google Chrome, `--use-angle=swiftshader`, real-time render driven over CDP (Node 24 WebSocket; script in scratchpad `tools/cdp.mjs`), 6 s settle:

```text
before (U8 cover Template, no shader): calls 3/6 · triangles 280/1368 · geometries 3 · textures 1 · within ceiling
after  (this lesson's files):          calls 3/6 · triangles 280/1368 · geometries 3 · textures 2 · over ceiling
hover on sleeve → panel "Hover: sleeve"
console: only React DevTools info + "THREE.Clock … deprecated" warning; no shader compile/link error
pixel samples (screenshot PNG decoded): orange disc rgb(227,106,44) = #e36a2c exactly; hovered rgb(241,113,47)
prefers-reduced-motion emulated (Emulation.setEmulatedMedia): no band visible; picture renders
own-photo Template served over http.server with a wide PNG as public/sleeve.jpg: renders, stretched to the square sleeve (as the lesson says)
```

The screenshots were inspected. All four UV labels landed on their own corners, and the sheen band crossed on the u+v diagonal. `over ceiling` is expected: `CEILING.textures` is still the beacon's 1, and the lesson tells students to update it.

**Honesty limits:**
- SwiftShader is a software renderer. The renderer.info counters are counted by three and do not depend on the GPU, but nothing here says anything about speed or phone memory.
- The lesson states this, and publishes no cover budget, consistent with U8.

**Other verification:**
- **Fiber colour tagging.** In fiber's `applyProps`, auto-sRGB applies only to `colorMaps = ['map','emissiveMap','sheenColorMap','specularColorMap','envMap']`, never to `uMap`. That is why the file tags `colorSpace` itself.
- **three's handling of `texture2D` and the colour chunk.** three adds `#define texture2D texture` on WebGL 2. It also prepends `linearToOutputTexel` to non-raw `ShaderMaterial` fragments, which is what makes `#include <colorspace_fragment>` valid.
- **drei `useTexture`.** It runs `onLoad` in `useLayoutEffect` before `initTexture` in `useEffect`, which is the basis for "once, before the upload".
- **Texture defaults.** `Texture` defaults to `ClampToEdgeWrapping`, which grounds the vUv×2 professor sketch.
- **Platform-note URLs.** Each returned HTTP 200, and bogus sibling paths return 404, so these are not SPA catch-alls. Drei page titles were checked: "shaderMaterial - Drei", "Texture / useTexture - Drei".
- **npm latest on 2026-11-04.** three 0.187.0, drei 10.7.9, fiber 9.8.2. The lesson keeps the course pin 0.185.1 and says it was not run on 0.187.

## Lesson-scribe records

Both records are under `/Users/ruvebal/src/deviac/fine-tuning/thessia-tuning-memory/`.

1. **`2026-11-04-ef657831-81ba-4d11-aaf1-4218b056ed40-feii-cover-shaders-idea1/`**
   - Contents: BRIEF.md, prompt.md (attempt-4 version), `scribe_http.py` (the copy used), evaluation.md, provenance.json, operator-written.md, and `attempt-1/` … `attempt-4/`. Each attempt directory holds its prompt, the `.rejected` raw, the logprobs sidecar, citation-fidelity.json, and generation.log.
   - **Nothing integrated.**
2. **`2026-11-04-ed47a69b-a4ca-4d2c-8796-47d8684664b6-feii-cover-shaders-idea2/`**
   - Contents: BRIEF.md, prompt.md, thessia-raw.md, its `.logprobs.json` (perplexity 6.175), citation-fidelity.json, generation.log, evaluation.md, `amendments.diff` (a real `diff -u` raw→integrated), integrated.md (verbatim the lesson paragraph), and provenance.json.

**Harness deviation, recorded as X6 did.** Canonical `thessia_generate.py` cannot run: there is no python `ollama` or `yaml` package, and the venv symlink is broken. I reused the X6 stdlib HTTP shim `scribe_http.py` unchanged. Every call used `/api/generate`, `stream:false`, `logprobs:true`, `keep_alive:0`, and model `thessia-scholar-v3`. `/api/ps` returned `{"models":[]}` before every call. No `ollama run`, no cloud SDK, no model pull.

**Per the X6 F4 ruling, the shim is not an exact reproduction of the canonical gates:**
- **Quote gate: stricter.** It fails any quoted run of 3 or more characters. Canonical passes quotations under 4 words.
- **CI3: weaker.** It checks author-year membership only, with no node/page check. New evidence: its regex **missed an ampersand-form fabricated citation, "Angel & Shreiner 2019"**, in idea-1 attempt 1. That attempt was rejected anyway, on its quote and on editorial grounds.

DevIAC/Athanor was down, so input (c) is declared empty in both BRIEFs, not invented.

## Rejected Thessia output and why

**Idea 1 ("A picture, and a place on it"): all 4 attempts rejected. None of the text shipped.**

| Attempt | Gate result | Editorial reasons |
| --- | --- | --- |
| 1 | quote FAIL. The quote was a 5-word question, which canonical would also fail. | Fabricated citation year (2019; only 2024 is licensed). Invented `uTextureCoordinates` and `uniform vec4 color`. "Last week", "today". About 5 sentences under 4 markers. |
| 2 | quote FAIL. The quote was 7 words, which canonical would also fail. | False claim that "Unit 9's cover reads a picture". Told students to move a number "between zero and five hundred twelve", confusing UV with canvas size. |
| 3 | quote FAIL and marker FAIL (3 of 4). | Invented `<Texture id="cover" …/>` JSX and `uMap(…)` call syntax. Then degenerated into a runaway noun list until `num_predict` ran out. |
| 4 | quote FAIL. The quote was "is this album art?", 4 words, which canonical would also fail. | Inverted the lookup ("uMap asks vUv"). False claim that sampling was new for Unit 9. |

Following the X6 precedent and lesson-scribe §5 (a gate FAIL is regenerated, not hand-fixed), the lesson paragraph is **operator-written B1 prose** that restates only lesson facts. The gated `tuning_record` comment in the lesson says so. A cold reviewer may rule on whether operator B1 prose is acceptable here, as was asked of X6's Unit 9 lab brief.

**Idea 2 ("Change the place, or change the answer"): attempt 1 passed the gates and was amended.**
- **Kept:** the sheen changes the colour after the lookup, not the picture; the open question about offsetting the UV before the lookup; the bulb's rim comes from the surface and camera, so it is not an authored sleeve effect.
- **Removed:** invented "At studio we made", `sleeveTexture`, "last week", "sleeves folder", "around seam", and the tidy close "every student who copies that code fails".
- **Added (operator):** the cardboard counter-critic and the refused close.
- **Shape:** the integrated paragraph is 5 sentences, inside the skill's maximum of five.

## Acceptance (executor's reading; the cold reviewer decides)

- [x] **Lesson registered, slug unique, permalink with trailing slash:** `/lessons/en/feii/cover-shaders/`, and `slug: feii-cover-shaders` appears once.
- [x] **Student HTML has no Ahmes, DevIAC or coat strings.** The forbidden grep finds nothing, and the publication-safety audit passed.
- [x] **At least one CodeSandbox-ready material file with `sampler2D` / `uMap`:** `src/SleeveMaterial.jsx`. It was bundled and also rendered (SwiftShader).
- [x] **"Explain this shader" checklist present:** 7 items plus the shader-note line 7 Template.
- [x] **`sampler2D` and UV glossed in plain language before the jargon.** Every visible "texel" is defined in its own sentence. The only other mentions are the self-check prompt that asks for that definition, the deck outline (glossed), the function name `linearToOutputTexel`, and the gated professor sketch.
- [x] **`npm run build` exits 0 with no Liquid Warning.**
- [ ] **Cold review filed, blocking findings closed.** That is the orchestrator's next step, not mine.

## Uncertainties and flags for the cold reviewer and orchestrator

1. **The `/ex3-cover-shader` route was not created.** PHASE-X7 Scope still says "One routed example intended for the sibling repo (`/ex3-cover-shader`)". The amended Scope sentence and the X6 hand-off put the files into the Unit 8 **cover fork**, which is a single scene with no router ("One scene, so there is no route table" in U8 and U9). The aggregator's route is `/covers/<slug>` (REPO-SHAPE, X9/X10). I followed the cover-fork instruction and mapped the files to `covers/<slug>/src/` for task2. If an `ex3` route was really wanted, it needs a product decision; I did not infer one.
2. **lessons.yml status `complete`.** It matches the page frontmatter and the covenant. The siblings are inconsistent: the assignment and U9 are `draft` in lessons.yml, while the assignment page says `complete`. Revert it to `draft` if the professor wants unreviewed satellites badged that way.
3. **Downstream surprise for X8 (reported, not patched).**
   - This shader expects the picture tagged sRGB, and it re-encodes the result with `colorspace_fragment`. A KTX2 texture whose loader already sets `colorSpace` works unchanged. A texture left at `NoColorSpace` would come out washed out. The lesson's own-photo section warns "do not tag it twice".
   - Compressed (KTX2) textures cannot be flipped on upload the way `CanvasTexture` / `TextureLoader` images are (`flipY`). Unless the encode step handles orientation, the sleeve may appear upside down in X8. X8 should check this with the UV-label placeholder idea.
4. **The idea-1 paragraph is operator prose.** It is longer than the four-sentence shape (**9 sentences**; this report first said 7, corrected in triage round 1, F9), and it is not a Thessia derivative. "Operator" here means the Claude executor, not the professor (see triage round 1, F9).
5. **The professor answer sketch** lives in the gated comment of `index.md`. `exercises.md` has no frontmatter, so it is not Liquid-processed and cannot hold a gated block. It is copied to `_site` as plain text, like U9's.
6. **Hover feedback.** The sleeve no longer uses `colorFor`. `uHot` (+15% in linear space) is the sleeve's hover and selection cue, and it is subtler than the standard material's colour swap. The panel's text and `aria-pressed` still carry the state for non-visual users.
7. **The render check is not a GPU check.** Real-device behaviour, `mediump` precision on phones, and fill-rate were not observed.
8. **TTOD quotes `img-001` and `cc-002`** carry `origin: legacy-unknown` in TTOD. They are cited by ID, as the existing units do.

## Exact resume point

1. Run `autopilot.sh verify PHASE-X7.md` (harness).
2. Then run a fresh `cascade-cold-reviewer` on this diff (two modified files, two new files), this report, the verify log, and the two tuning-memory records.

Scratch evidence (bundle inputs, screenshots, CDP and PNG-sampling scripts, build logs) is in `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/x7/`. It is session scratch and may not persist. Nothing is committed. Do not open X8 until X7 has landed.

---

## Triage round 1 (2026-11-04, after PHASE-X7-COLD-REVIEW.md)

Same phase, same worktree (`.cascade-lane` = `FEII-3D-ALBUM-KTX`, re-checked). Lesson amendments only, plus the idea-1 tuning record for F9. The pack files changed by the orchestrator were not re-edited or reverted. Line numbers are post-edit.

| Finding | Change (file:line) | Evidence |
| --- | --- | --- |
| **F1** (P1) varying failure mode | `cover-shaders/index.md:449–450`. The bullet is split in two. **Never declared** in the vertex shader: the link fails, as Unit 9 L413 says. **Declared but never set** (`vUv = uv;` deleted): no error, and the sleeve shows one flat colour, the picture's colour at UV (0,0). The text says "Look for the flat colour, not for an error." | Reviewer's `noset` render (no compile or link error, flat blue sleeve). The rendered page has the new text (`rg -c "flat colour"` on the built page, among 4 hits for the new strings). |
| **F2** (P1) "move as they are" | `cover-shaders/index.md:461` (lab mapping step 2). Two changes are named. (1) The own-photo `'/sleeve.jpg'` assumes the fork's root `public/`. On the aggregator each route has `covers/<slug>/public/`, so the photo goes there and is referenced relative to the route, "as the aggregator's `_template` shows". (2) The lesson no longer assumes the gallery passes `hovered`/`selected`/`reduced`. Unless the aggregator's `CONTRIBUTING.md` says otherwise, that state stays inside `Cover`. Also `:389`: the "Vite serves `public/` from the site root" sentence now says it holds in the fork only and points at step 2. No aggregator API is invented. | REPO-SHAPE D6/D15. PHASE-X9.md amendment (orchestrator, in the diff) pins the prop contract and the per-route asset idiom. |
| **F3** (P1, downstream) memory.textures is a count | **Pack:** orchestrator amendments already in the diff: KTX2-FIRST-PRINCIPLES.md §1/§2/§5/§9, DECISIONS D3/D22, PHASE-X8.md, PHASE-X10.md, FINDINGS F16, and the X8/X10 gates (`GPU bytes` required). **Lesson (amend-on-surprise, this round):** `units-8-9-assignment/index.md:51`. The KTX2 choice bullet now asks for file bytes (suitcase) vs **GPU bytes** (computed: PNG width × height × 4; KTX2 the sum of the transcoded mip data `byteLength`, linked to the KTX2 satellite). It states that `renderer.info.memory.textures` is a texture count, used only to confirm +1. `:64`: "runtime texture-memory observation" becomes "computed GPU bytes for each" (same defect, one line from L51). `:74`: the table header is now `GPU bytes (computed)`. `:80`: an added Template line records the texture count as a count. Bar 3 (`:46`) is left as is: it lists memory.textures beside calls and triangles and does not call it memory. Unit 8 L796 not touched. | three 0.185.1 `WebGLInfo.js:5`, `WebGLTextures.js` ++/-- (review F3). Assignment fence: 1 source, 1 built, MATCH. Built link `/web-atelier-udit/lessons/en/feii/ktx2-basis/`. |
| **F4** (P2) texel ≠ filtered sample | `cover-shaders/index.md:109`. A texel is now one stored colour in the GPU's grid. A lookup at a UV usually blends the nearest few, so the returned colour is often a mix of texels, not one texel. This matches the amended KTX2-FIRST-PRINCIPLES.md §1. Mirrored in `deck-outline.md:7`. | Text diff. The self-check prompt (`index.md:472`) is unchanged and still answerable. |
| **F5** (P2) useTexture re-upload overclaim | `cover-shaders/index.md:447–448`. Split in two. `new CanvasTexture(...)` in the render body uploads a new texture every render. `useTexture` with a new callback: the texture is cached and uploaded once, but the callback re-runs every render. | drei `core/Texture.js` (review F5). Consistent with `:414`. |
| **F6** (P2) exercises item 5 false premise | `cover-shaders/exercises.md:9`. Replaced with the reviewer's wording: "why multiplying a view-direction rim by the texture lookup still makes the sleeve's look depend on the camera rather than on the picture." | Text diff. |
| **F7** (P2) "do not tag it twice" | `cover-shaders/index.md:416`. Now: check what the loader set, `texture.colorSpace` should read `'srgb'` for a sleeve photo. Otherwise the file was encoded without screen colours and comes out washed out. Fix the encode, not the shader, and keep `#include <colorspace_fragment>`. | `KTX2Loader.parseColorSpace` (review ruling d). |
| **F8** (P2) `/ex3-cover-shader` in Scope | **Pack:** orchestrator amendment already in the diff. `PHASE-X7.md` Scope now names the cover fork and `/covers/<slug>`. No lesson change needed: the lesson never had an ex3 route. | `git diff PHASE-X7.md`. |
| **F9** (P2) idea-1 sentence count and author label | Report: uncertainty item 4 corrected to **9 sentences** (it first said 7). `cover-shaders/index.md:81` (gated `tuning_record` comment, not published) now says the paragraph (9 sentences) "was written by the Claude executor (cascade-phase-executor agent), not by Thessia and not by the professor, after the 4 rejected thessia-scholar-v3 attempts", with professor release a pre-publication step. Tuning record `~/src/deviac/fine-tuning/thessia-tuning-memory/2026-11-04-ef657831-81ba-4d11-aaf1-4218b056ed40-feii-cover-shaders-idea1/`: a dated NOTE appended to `evaluation.md` (same wording, plus "not operator-voice gold"). `provenance.json` gains `paragraph_author` and `paragraph_sentence_count: 9`, added keys only. Existing values, including `lesson_paragraph_origin`, are kept as recorded. `operator-written.md` and the attempt dirs are untouched. History is not rewritten. | `python3 json.loads` on provenance.json OK. Built page leak grep for `thessia|tuning_record|cascade-phase` → no hits. |
| **F10** (P2) non-discriminating gate checks | **Pack:** orchestrator amendment already in the diff. `PHASE-X7.exit-gate.sh` adds an "Explain this shader" check and a "forged in X7" refusal. No lesson change. The fence-equality check was run by hand (below). | `git diff PHASE-X7.exit-gate.sh`. Current page: "explain this shader" 1 hit, "forged in X7" 0 hits. |

### Commands run this round (real output)

```text
$ cd web-foundations && npm run build > x7t1/build.log 2>&1; echo build_exit=$?
build_exit=0
$ grep -c "Liquid Warning" x7t1/build.log
0
Publication safety passed … / Citation conformance passed for canonical lessons.

$ python3 fences.py cover-shaders/index.md _site/…/cover-shaders/index.html
cover-shaders src 6 built 6 → 0..5 MATCH
$ python3 fences.py units-8-9-assignment/index.md _site/…/units-8-9-assignment/index.html
units-8-9-assignment src 1 built 1 → 0 MATCH

$ rg -ci "ahmes|deviac|evaluator_safe|BIBLIO-GAP|thessia|tuning_record|cascade-phase" <both built pages>  → no hits (rc=1)
$ rg -c sampler2D / uMap / CodeSandbox-ready cover-shaders/index.md → 7 / 17 / 4
$ git diff --check → exit 0
```

No code fence was changed this round. All edits are prose outside fences. So no esbuild re-bundle was needed: the six cover-shaders fences are byte-identical to the round-0 bundled files, as the MATCH run above confirms. The exit gate was not run. Nothing committed or pushed. Scratch: `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/x7t1/` (build log, `fences.py`).

### Not closed, or for the orchestrator

1. **The state-ownership premise in the X9 amendment is inaccurate.** PHASE-X9.md says "the cover-shaders lesson and Unit 8 cover fork assume hovered/selected/reduced state lives inside Cover". In the published Unit 8 cover fork (L895, L949), `App.jsx` owns that state and passes it to `Cover` as props. Unit 8 L959 leaves the route's choice to `_template`. The F2 text therefore states the facts. The fork's `App.jsx` passes the props. On the aggregator, students are told not to assume this, and to keep the state inside `Cover` unless `CONTRIBUTING.md` says otherwise. Either X9 choice is compatible with the lesson. X9 should drop "lives inside Cover" as a description of the lessons.
2. **F1's optional drill** (a "flat sleeve" diagnostic in exercises.md) was not added. It was not requested.
3. **Assignment L64 was changed** beyond the two named lines (L51, L74), because it carried the same "texture-memory" claim. Revert it if the orchestrator wants the scope kept to the named lines.
4. The **professor release** of the idea-1 paragraph is still a pre-publication step (`independent_human_review: false`).

### Resume point

Harness verify (`autopilot.sh verify PHASE-X7.md`), then a cold re-review of triage round 1 (F1, F2 blocking). Do not open X8 until X7 lands.

**Status:** VERIFYING


## Orchestrator correction after triage round 1

The orchestrator's first PHASE-X9.md amendment wrongly said Unit 8 keeps hover/selected/reduced state inside `Cover`. The published fork's `App.jsx` owns that state and passes `{ hovered, selected, reduced, onHover, onSelect }` (unit-8 L895, L949). PHASE-X9.md is corrected: the gallery route passes the same five props. The orchestrator rewrote the second half of cover-shaders lab step 2 (L461) to match, a one-sentence prose edit with no code change. The executor also changed assignment L64 to "computed GPU bytes for each", the same F3 error; the orchestrator accepts it.


## Orchestrator triage (DONE decision)

| Finding | Sev | Outcome |
| --- | --- | --- |
| F1 varying never-set ≠ link error | P1 | Closed (round 2 reproduced: flat colour, no error) |
| F2 files do not move "as is" to the aggregator | P1 | Closed in lesson; enforcement = G1 below |
| F3 `memory.textures` is a count | P1 | Pack amended (D3/D22, spine, X8, X10, RATIONALE, FINDINGS F16); assignment L51/L64/L74/L80 fixed |
| F4–F7, F9 | P2 | Closed |
| F8 `/ex3-cover-shader` | P2 | PHASE-X7 Scope amended |
| F10 gate pre-satisfied | P2 | X7 gate now also checks the checklist and the absence of stub text |
| G1 forward claim unenforced | P1 | X9 Acceptance and gate (five props, route-relative picture), X10 reuses the X7 files, X11 re-check step |
| G2 two stale spine lines | P1 | Spine §5 list and prerequisites table amended |
| G3 PNG mipmaps vs KTX2 levels | P2 | Spine §2 and X8: like-with-like levels, record `texture.format` |
| G4 L449 compile vs link | P2 | Deferred to X11 (written into PHASE-X11.md) |
| G5 weak X10 gate lines | P2 | Flip accepts `ktx create`; colorSpace requires a comparison (regex tested) |
| G6 `--assign_oetf` caution | P2 | X10 uses `--convert_oetf srgb` / `--convert-tf srgb` |
| G7 D3/D22 status labels | P2 | Both marked AMENDED with an F3/F16 reference |
| G8 assignment ktx2-note rows | P2 | Deferred to X8 (written into PHASE-X8.md) |

For the professor: the amendment to the D3/D22 measurement method and release of the agent-written idea-1 paragraph.
