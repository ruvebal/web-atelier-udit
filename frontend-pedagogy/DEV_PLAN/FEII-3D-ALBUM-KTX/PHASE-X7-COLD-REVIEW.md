# PHASE-X7 cold review — cover-shaders satellite

**Reviewer:** cascade-cold-reviewer, a fresh subagent that did not implement X7.
**Date:** 2026-11-04
**Worktree:** `web-atelier-udit-album-FEII-3D-ALBUM-KTX-7`, branch `cascade/FEII-3D-ALBUM-KTX-7`, base `59ce589` (merge of X6). The diff is uncommitted: 2 modified files (`cover-shaders/index.md`, `_data/lessons.yml`) and 2 new files (`exercises.md`, `deck-outline.md`), plus the report and verify log.
**Inputs read:**
- PHASE-X7.md and PHASE-X7.exit-gate.sh, gate-lib.sh
- PHASE-X7-VERIFY-LOG.md (harness, exit 0) and PHASE-X7-REPORT.md
- FEII-3D-ALBUM-KTX-CASCADE.md, DECISIONS.md (D2, D3, D22), REPO-SHAPE.md, KTX2-FIRST-PRINCIPLES.md §§1–2
- PHASE-X8.md, PHASE-X9.md, PHASE-X10.md (downstream assumptions)
- the full diff, Unit 8, Unit 9, and assignment source
- both tuning-memory records, lesson-scribe SKILL.md
- CLAUDE.md, lesson-code-block-conventions.mdc, PLATFORM-NOTES-POLICY.mdc
- the X3 citation transcript and the grounding README row "Satellite — cover shaders"
- three 0.185.1, drei 10.7.9, and fiber 9.8.2 source in `react-template/node_modules`

**Verdict: NOT READY FOR DONE. 2 blocking findings (F1, F2, both P1).**
- F3 is P1 but does not block X7. It falsifies a downstream premise: **X8 must not open until KTX2-FIRST-PRINCIPLES.md, PHASE-X8.md, and PHASE-X10.md are amended.**
- F4–F10 are P2 and do not block.

Scratch evidence is in `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/x7cr/`. It holds the assembled fork, bundles, screenshots, and the CDP driver `cdp.mjs`. `react-template` was used read-only: `git -C react-template status --short | wc -l` → `0` after every bundle.

---

## Acceptance, item by item (re-run, not copied from the report)

| Item | Result | Evidence |
| --- | --- | --- |
| Lesson registered; slug unique; permalink trailing slash | PASS | `grep -c "slug: feii-cover-shaders$" _data/lessons.yml` → `1`. `rg -c "slug: feii-cover-shaders" docs/_data/` shows one file with 1 hit. Frontmatter has `permalink: /lessons/en/feii/cover-shaders/`. `_site/lessons/en/feii/cover-shaders/index.html` exists. It is linked from `lessons/en/index.html`, `feii/index.html`, U8, U9, and the assignment in `_site`. |
| Student HTML has no Ahmes/DevIAC/coat strings | PASS | `rg -io "ahmes\|deviac\|coat\|thessia\|operator\|UNVERIFIED" index.html` → no hits. The only `x2` hits are CSS classes. The gate's forbidden grep finds nothing, and "Publication safety passed" is in the build log. |
| ≥1 CodeSandbox-ready material file with `sampler2D`/`uMap` | PASS, with F1 | `src/SleeveMaterial.jsx` passed all three checks below. |
| "Explain this shader" checklist present | PASS | `## Explain this shader — checklist`: 7 items plus a line-7 Template. |
| sampler2D/UV glossed in plain language; texel defined | PASS (wording: F4) | First `sampler2D` in rendered text: "the picture ( sampler2D uMap ) and the place ( vUv )". The plain word comes first. `texel` appears 3 times in visible text: the definition sentence, `linearToOutputTexel`, and the self-check prompt. |
| `npm run build` exit 0, no Liquid Warning | PASS | I re-ran it through the gate (below). `grep -c "Liquid Warning" x7-build.log` → `0`. |
| Cold review filed; blocking Fn closed | OPEN | This file. F1 and F2 are open. |

**Bundle check.** `assemble.py` built the fork:
- From U8: `main.jsx`, `index.css`, `BudgetProbe.jsx`, `App.jsx` (Beacon→Cover swap and `<h1>` applied by script, with an assert that no `Beacon` remains), the cover `parts.js` Template, and the cover `Cover.jsx` Template.
- From this lesson: `sleevePicture.js`, `SleeveMaterial.jsx`, and the three Cover.jsx Excerpt changes, applied by asserted string replacement.

The esbuild run against react-template's `node_modules` (three 0.185.1, fiber 9.8.2, drei 10.7.9, react 19.3.1, esbuild 0.28.2) gave `esbuild_exit=0`. The own-photo Template swapped in gave `photo_exit=0`.

**Render check.** Headless Chrome with SwiftShader, driven over CDP:
- After the change: `BUDGET: calls 3/6 · triangles 280/1368 · geometries 3 · textures 2 · over ceiling`.
- The U8 cover Template alone gave `textures 1 · within ceiling`, which confirms the published 1 → 2.
- Hover gave `Hover: sleeve`.
- With `prefers-reduced-motion` emulated, no band appears and the picture renders.
- The console shows only React DevTools info and the `THREE.Clock` deprecation.
- In the screenshot, each UV label sits on its own corner and the band runs along constant u+v.

**Built code equals source.** `fences.py` checked 6 source fences against 6 built `<pre><code>` blocks: all 6 `MATCH` after unescaping. Liquid ate nothing.

## Exit gate and build (re-run)

```text
$ bash PHASE-X7.exit-gate.sh; echo gate_exit=$?
build ok (/var/folders/.../feii-album-ktx-gates/x7-build.log)
OK PHASE-X7.exit-gate.sh
gate_exit=0
$ grep -c "Liquid Warning" x7-build.log  → 0
Publication safety passed ... / Citation conformance passed for canonical lessons.
```

## Other checks

- **Unit 9 lab step 1.** It asks for a new material file in the cover fork, imported in `Cover.jsx` and used on the sleeve mesh in place of `meshStandardMaterial`, with the cover `parts.js` kept (U9 L582). The lesson does exactly that: two new files, three Cover.jsx edits, and an explicit "Leave `src/parts.js` … alone".
- **Unit 8 names and ids.** `PartId.sleeve/vinyl/stage`, `Cover.jsx`, `bindPart`, `colorFor`, and the `hovered/selected/reduced` props all match the U8 Templates. The assembly asserts prove the Excerpt applies to the published `Cover.jsx`.
- **Not a second Unit 9.** The callout at L36 says Unit 9 stays the intro. Vertex/fragment, precision, and uniforms are referenced, not re-taught. "Fails Unit 9's checklist item 5 and the assignment's second covenant bar" matches U9 L574 and assignment L45.
- **No KTX2 teaching.** KTX2 appears only as a pointer: L109, L416, L461, and L490.
- **No unexplained loops.** There is no `for`, and the header says "No loop, no discard".
- **Reduced motion.** `reduced` parks `uTime` at 0, so the band sits at -0.5. The band is at least 0.5 away from every point on the sleeve, so `sheen` is 0. Verified rendered.
- **three/drei/fiber claims checked against source.**
  - `colorspace_fragment.glsl.js` is `gl_FragColor = linearToOutputTexel( gl_FragColor );`.
  - `WebGLProgram.js:819` has `#define texture2D texture`.
  - fiber's `colorMaps = ['map','emissiveMap','sheenColorMap','specularColorMap','envMap']` (events-*.esm.js:439).
  - drei `shaderMaterial` defines a getter and setter per uniform and calls `onInit(this)`.
  - drei `useTexture` runs `onLoad` in `useLayoutEffect([onLoad])` before the `initTexture` effect.
- **Citations.** The only reference is Angel and Shreiner 2024, in the X3 transcript's exact Chicago form. In-text `(Angel and Shreiner 2024, 1–2)` matches U9 L56, and the citation audit passed. Platform notes:
  - They form a separate `## 📚 Platform notes (HOW, not bibliography)` block, "Checked 2026-11-04".
  - They are consistent with PLATFORM-NOTES-POLICY.mdc.
  - All 6 URLs returned `200`. The control URL `threejs.org/docs/pages/NoSuchThing.html` returned `404`, so these are not SPA catch-alls.
- **Epigraphs.** `img-001` and `cc-002` match `~/src/ttod/ttod.yml` L699–700 and L3148–3150 verbatim. D22's no-Tao rule applies to the KTX2 page only.
- **Scribe records.** idea-2 `integrated.md` equals lesson L115: `True`. idea-1 L77 is contained in `operator-written.md`: `True`. All four idea-1 attempt directories hold the `.rejected` raw, a logprobs sidecar, and `citation-fidelity.json`.

---

## Findings

### F1 — "Failure modes" states a link error that does not happen (P1, blocks DONE)

Lesson L448:

> **A varying that the fragment shader reads but the vertex shader never sets.** Here that is `vUv`. On this pin the link fails, exactly as Unit 9 describes.

Unit 9 L413 says something different: "never **declares**". A varying that is declared in the vertex shader but never written links without error. Its value is undefined; in practice it is zero. A student who deletes `vUv = uv;` is the most likely real case, and gets a flat-colour sleeve with no error. The lesson tells them to look for a link error that never appears.

Evidence: I removed only `vUv = uv;` from the published `SleeveMaterial.jsx` and kept `varying vec2 vUv;` in the vertex shader.

```text
$ grep -c "vUv = uv" noset/src/SleeveMaterial.jsx → 0
$ node cdp.mjs http://127.0.0.1:8765/noset.html …/shot_noset.png 0
BUDGET: calls 3/6 · triangles 280/1368 · geometries 3 · textures 2 · over ceiling
info: Download the React DevTools …
warning: THREE.Clock: This module has been deprecated …
```

There is no shader compile or link error. The screenshot `fork/shot_noset.png` shows the sleeve as one flat blue: the `(0,0)` corner colour of the placeholder.

**Fix.** Split the bullet into two cases:
- **Never declared in the vertex shader:** the link fails, as in Unit 9.
- **Declared but never assigned** (`vUv = uv;` missing): it compiles, and the whole sleeve shows one colour, the picture's corner at UV (0,0).

The second case is a good diagnostic. It could also become an exercises.md drill.

### F2 — "They move as they are" contradicts the frozen aggregator shape (P1, blocks DONE)

Lab mapping step 2 (L459):

> `SleeveMaterial.jsx` and your `sleevePicture.js` go into your route's `covers/<slug>/src/` … so they move as they are.

This holds for neither file without conditions:
1. **Own-photo path.** The own-photo `sleevePicture.js` loads `'/sleeve.jpg'` and tells students "Vite serves `public/` from the site root" (L389). REPO-SHAPE.md (D6/D15, frozen) gives each route its own `covers/<slug>/public/`, and the tree has no root `public/`. Vite's default `publicDir` is `<root>/public`, so `/sleeve.jpg` does not resolve on a route. If X9 adds a root `public/`, every slug then shares `/sleeve.jpg`.
2. **Cover props.** Both files depend on `Cover` receiving `hovered`, `selected`, and `reduced`. U8 L959 says where state lives on a route "is set by that repository's `_template`, not by this sandbox's `App.jsx`". The `_template` does not exist yet (`ls courses-repos/feii-album-covers` → "No such file or directory"). PHASE-X9/X10 do not pin a Cover prop contract (`rg -n "reduced|hovered|props" PHASE-X9.md PHASE-X10.md REPO-SHAPE.md` → only the PR-template a11y line).

**Fix, X7 side (one or two sentences).**
- The placeholder `sleevePicture.js` and `SleeveMaterial.jsx` move unchanged *if* the route's `Cover` receives `hovered`, `selected`, and `reduced`, as the `_template` provides.
- On a route, the photo lives in `covers/<slug>/public/`. Replace `'/sleeve.jpg'` with the path the `_template` shows.

**Fix, downstream: amend PHASE-X9.md in the same change set.**
- Pin the `_template` `Cover` prop contract (`hovered, selected, reduced, onHover, onSelect`) so the X7 files really do move unchanged.
- Pin one per-route asset idiom that X7 can name, for example `new URL('../public/sleeve.png', import.meta.url).href`. Vite resolves that per route.

### F3 — `renderer.info.memory.textures` is a count, not GPU memory; the X8 spine assumes bytes (P1, does not block X7; amend downstream before X8)

Three source, 0.185.1:

```text
src/renderers/webgl/WebGLInfo.js:5   const memory = { geometries: 0, textures: 0 };
src/renderers/webgl/WebGLTextures.js:752,2038,2096   info.memory.textures ++;
src/renderers/webgl/WebGLTextures.js:405,478         info.memory.textures --;
```

It counts texture objects. A PNG sleeve and a KTX2 sleeve both read `+1`. X7 itself is correct: it treats the reading as "goes up by one, because the picture is a texture", and I measured 1 → 2.

The downstream documents treat it as the GPU byte number:
- KTX2-FIRST-PRINCIPLES.md L57 ("The textures row is this **GPU** number"), L65 (the diagram), L69 ("the textures row stays huge"), L112, L132, L169
- D3 and D22 ("GPU textures memory")
- PHASE-X8.md L14, L45, L66
- PHASE-X10.md L36 ("GPU texture memory (renderer.info.memory.textures)")

As written, X8's hello-world "two labelled numbers" would show an unchanged second number for PNG, ETC1S, and UASTC.

**Fix: amend these before X8 opens.** D3 and D22 are falsified by a live store; DECISIONS.md allows re-opening on that ground.
- Keep `renderer.info.memory.textures` as the *count* (Unit 8's row).
- Make the second number **GPU bytes**, computed and labelled:
  - **PNG:** `width × height × 4`. Add about one third if mipmaps are generated. `TextureUtils.getByteLength(w, h, format, type)` is exported from three 0.185.1 (`Three.Core.js:162`).
  - **KTX2:** sum `texture.mipmaps[i].data.byteLength` of the transcoded `CompressedTexture` that `KTX2Loader` returns. Record `texture.format`, because the transcode target decides bytes per texel.
- X7 L416 ("measures it on the GPU") stays true once X8 does this.

### F4 — The texel sentence conflates a texel with a filtered sample (P2)

L109: "What comes back from the lookup is a **texel** … one coloured sample of the picture as the GPU holds it in memory, often blended with its neighbours."

A texel is one stored element. What `texture2D` returns under `LinearFilter` is a blend of texels, not a texel. The sentence copies KTX2-FIRST-PRINCIPLES §1 L35 nearly word for word, so it is consistent with the binding spine. That is why this is P2. But X8's block-compression story counts stored texels, so the imprecision will matter there.

**Fix, together with the spine in X8.** "The GPU stores the picture as a grid of **texels** (texture elements), one coloured cell each. The lookup returns the texel at that UV, or a blend of the nearest few." Mirror the change in deck-outline item 5.

### F5 — Overclaim about `useTexture` re-uploading (P2)

L447: "`useTexture` with a new callback inside the render body. Either one uploads a new texture on every render."

drei `core/Texture.js` shows otherwise:
- `useLoader` caches the texture.
- The `initTexture` effect depends on `[gl, textures]`.
- A new callback only re-runs `onLoad` (`useLayoutEffect(..., [onLoad])`).
- Re-assigning the same `colorSpace` does not bump `version`.

L414 already says the correct thing ("would make it run again on every render").

**Fix.** Keep "uploads a new texture on every render" for `new CanvasTexture(...)` only. For `useTexture`, say the callback re-runs on every render.

### F6 — exercises.md item 5 has a false premise (P2)

"…why a rim computed from the view direction cannot print a picture on a sleeve, even if you multiply it by a texture lookup." Multiplying the rim by `texture2D(uMap, vUv)` does print the picture. It prints it modulated by a camera-dependent rim, which is close to black face-on.

**Fix.** "…why multiplying a view-direction rim by the texture lookup still makes the sleeve's look depend on the camera rather than on the picture."

### F7 — "Do not tag it twice" points at the wrong risk (P2)

L416: "If its loader hands you a texture already tagged with a colour space, keep `#include <colorspace_fragment>` and do not tag it twice." Assigning `SRGBColorSpace` again is idempotent.

The real KTX2 risk is a file whose descriptor says linear or unspecified. `KTX2Loader.parseColorSpace` (examples/jsm/loaders/KTX2Loader.js L1250–1270) then sets `LinearSRGBColorSpace` or `NoColorSpace`, and with this shader the sleeve comes out washed out. See ruling (d).

**Fix.** "Check what the loader set (`texture.colorSpace` should read `'srgb'`). If it does not, fix the encode, not the shader."

### F8 — PHASE-X7.md Scope still names a route that does not exist (P2)

`rg -n "ex3" frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/ web-foundations/docs/lessons/en/feii/` finds one hit only: PHASE-X7.md L19. See ruling (a).

### F9 — idea-1 record: sentence count misreported, authorship label ambiguous (P2)

- **Sentence count.** The report says the operator paragraph has "7 sentences". A split on sentence boundaries counts **9** (L77). lesson-scribe's prompt shape is "Four sentences, maximum five".
- **Authorship label.** `provenance.json` says `"lesson_paragraph_origin": "operator-written"`. In lesson-scribe, "operator" is the human studio owner ("operator retains authorship; model outputs are training data"). In this cascade, "operator" means the agent. The author is the Claude executor, as `evaluation.md` L3 says. A later fine-tuning harvest could mistake this for operator-voice gold.

**Fix.**
- Add `"paragraph_author": "cascade-phase-executor (Claude agent), not the human operator"` to `provenance.json`, and the same wording to the gated `tuning_record` comment.
- Either move sentences 4–6 (the vocabulary restatement, already covered by the table at L103–107) out of the B1 paragraph, or record the 9-sentence deviation accurately.

### F10 — Two exit-gate checks do not discriminate (P2)

`rg -q "cover-shaders" unit-9…/index.md` and `…/units-8-9-assignment/index.md` already pass at base `59ce589`. The links landed in X4 and X6. The page checks (`sampler2D`, `uMap`, `CodeSandbox-ready`) fail against the stub, so the gate is not vacuous. But nothing in it would catch F1–F2, or a fence that Liquid half-ate without a warning.

**Fix (optional, for X8+ gates).** Add a fence-equality check like the `fences.py` used here.

---

## Rulings requested

**(a) `/ex3-cover-shader`: the omission is right. Amend PHASE-X7.md.**
- The amended Scope sentence (X6 triage F1) sends the files into the U8 cover fork. U8 and U9 both state "one scene, so there is no route table".
- D4, D6, and D15 freeze the hand-in route as `/covers/<slug>`.
- An `ex3` route would contradict three frozen decisions and the CLAUDE.md routed-sandbox rule's own trigger: one runnable example, not several.
- Amend PHASE-X7.md L19 in the same commit as this review. Delete "One routed example intended for the sibling repo (`/ex3-cover-shader`)." and replace it with: "One runnable example in the Unit 8 cover fork (no router); on the hand-in it lives at `/covers/<slug>` (task2)."

**(b) `lessons.yml` status `complete`: acceptable.**
- `rg -n "\.status" docs --glob '!_site' --glob '!*.yml' | grep -v page.status` finds no template that reads the `lessons.yml` status.
- The rendered badge comes from `page.status` (`_layouts/lesson.html` L128–148), and the page frontmatter says `complete`.
- The yml now agrees with its own page. Siblings U8, U9, and the assignment carry frontmatter `complete` and yml `draft`. That drift predates X7 and should be fixed in a sweep (X11), not here.
- If the professor wants unreleased satellites badged as drafts, the field to change is **frontmatter** `status: draft`, and the yml should follow.

**(c) Operator-written idea-1 paragraph after 4 rejected attempts: acceptable for DONE, with F9 fixed.**
- lesson-scribe §5 forbids hand-repairing a raw. It does not forbid shipping non-model prose when every attempt fails.
- All four rejections are preserved with their gate output and editorial reasons, and nothing from them was integrated.
- The paragraph restates only facts on the page, has no citation, and is honestly labelled behind the publication switch. That is the X6 precedent.
- Unlike X6, this is a B1 Masterclass paragraph, not a lab brief. Professor release of that paragraph is therefore a named pre-publication step. `independent_human_review: false` is already recorded.

**(d) KTX2 orientation and colour space: both risks are real. Confirmed against three 0.185.1 and toktx v4.4.2.**

*Orientation.*
- `src/textures/CompressedTexture.js:55–67`: `this.flipY = false;`, documented "@readonly … since it is not possible to flip compressed textures".
- `WebGLTextures.js:926` sets `UNPACK_FLIP_Y_WEBGL` from `texture.flipY`, so it is false for compressed textures. WebGL does not apply it to `compressedTexImage2D` in any case.
- `rg -i orientation examples/jsm/loaders/KTX2Loader.js` → no hits. The loader ignores `KTXorientation`.
- `toktx --help` (v4.4.2): by default it does not flip PNGs, writes `KTXorientation S=r,T=d`, and warns "If an OpenGL {,ES} loader ignores the orientation value, the image will appear upside down."
- The result: with this lesson's `boxGeometry` UVs (v = 0 at the bottom) and `CanvasTexture`/`TextureLoader` flipping by default, a default-encoded KTX2 sleeve renders **upside down**.
- `texture.repeat`, `offset`, and `rotation` cannot fix it here. The custom shader samples `vUv` directly and applies no `uvTransform`.

*Colour space.*
- `KTX2Loader.js:458` and `:1242` set `texture.colorSpace = parseColorSpace(container)`. BT.709 primaries with sRGB transfer give `SRGBColorSpace`. Linear transfer gives `LinearSRGBColorSpace`. Unspecified primaries give `NoColorSpace`.
- `WebGLUtils.js:111–145` picks the sRGB compressed internal format (`COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR`, `COMPRESSED_SRGB8_ETC2`, …) only when the transfer is sRGB.
- A sleeve encoded without sRGB transfer therefore comes out washed out through this lesson's `#include <colorspace_fragment>`. Fiber will not rescue it: `uMap` is not in `colorMaps`.

*What PHASE-X8 must say* (student-facing, as HOW platform notes):
1. "A KTX2 picture is not flipped when it is uploaded. Encode it already flipped, or your sleeve is upside down. The UV-labelled placeholder from Cover shaders is the test: the labels must land on their own corners."
2. "Read `texture.colorSpace` after loading. It must be `'srgb'` for a sleeve photo. If it is not, re-encode with sRGB transfer; do not remove `colorspace_fragment`."
3. The `ktx2-note.md` Template asks for both checks: orientation verified, colorSpace reported.

*What PHASE-X10 must implement and verify:*
- `scripts/encode-cover.mjs` passes `--lower_left_maps_to_s0t0` to `toktx`. The flag is present in v4.4.2 `--help`: "causes the input netpbm and PNG images to be flipped vertically to a lower-left origin".
- It makes the sRGB transfer explicit for the sleeve colour texture.
- The `_studio` route asserts at runtime that `texture.colorSpace === SRGBColorSpace` and visually checks the UV-label orientation for both UASTC and ETC1S.
- Do not fix orientation with `1.0 - vUv.y` in the shader. The PNG and KTX2 paths of the X8 switch would then need different shaders, which breaks the "same sleeve, two deliveries" comparison.
- If `ktx create` replaces `toktx`, X10 must re-verify its flip flag from `--help` rather than assume it.

---

## Downstream phases to amend (amend-on-surprise)

| File | Change | Driven by |
| --- | --- | --- |
| PHASE-X7.md L19 | Drop `/ex3-cover-shader`; name the cover fork and `/covers/<slug>` | (a), F8 |
| PHASE-X9.md | Pin the `_template` Cover prop contract and the per-route asset URL idiom | F2 |
| KTX2-FIRST-PRINCIPLES.md §1 L35, §2 L57/L65/L69, §5 L112, L132, L169 | Texel = stored cell. `renderer.info.memory.textures` = count. GPU bytes computed separately | F3, F4 |
| DECISIONS.md D3, D22 | "two labelled numbers" = file bytes vs computed GPU bytes, plus the texture count | F3 |
| PHASE-X8.md L14, L45, L66 | Same as above, plus the flipY and colorSpace statements from (d) | F3, (d) |
| PHASE-X10.md L36 + encode script spec | GPU-bytes label; `--lower_left_maps_to_s0t0`; explicit sRGB; runtime colorSpace and orientation check | F3, (d) |

## Not done by this reviewer

- No lesson edits, no commit, no DONE flip, no push.
- No GPU or phone check. SwiftShader only, as the lesson itself says.
- I did not sample pixel colours for the `#e36a2c` → `rgb(227,106,44)` claim. The render, hover, reduced-motion, and texture-count claims were re-observed.

---

## Round 2

**Reviewer:** cascade-cold-reviewer, a fresh subagent. It did not implement X7, triage round 1, or the orchestrator's pack amendments.
**Date:** 2026-11-04
**Scope:** everything uncommitted in the worktree. That covers the X7 lesson work, triage round 1, the orchestrator correction to PHASE-X9.md and cover-shaders L461, and the pack amendments: DECISIONS D3/D22, KTX2-FIRST-PRINCIPLES.md, PHASE-X7/X8/X9/X10.md, RATIONALE.md, FINDINGS F16, and the X7/X8/X10 gates.
**Inputs read:** PHASE-X7.md, round 1 above, PHASE-X7-REPORT.md ("Triage round 1" and "Orchestrator correction"), the full `git diff`, PHASE-X7-VERIFY-LOG.md, PHASE-X9/X10/X11/X12 runbooks and gates, gate-lib.sh, CLAUDE.md, and Unit 8 L860–959 and Unit 9 L413.
**Scratch evidence:** `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/x7r2/`. It holds the re-assembled fork, the variants `noset`, `nodecl1`, and `nodecl2`, screenshots, the toktx test encodes in `ktx/`, and the gate build log. `react-template` was used read-only: `git -C react-template status --short | wc -l` → `0`.

**Verdict: READY FOR DONE. 0 blocking findings against X7.**
- The lesson, exercises, deck outline, assignment edits, and lessons.yml are correct.
- Two P1 findings (G1, G2) are downstream pack gaps. They do not block X7. Under amend-on-surprise they must land in the same commit as the X7 DONE flip, and they gate the opening of X9 (G1) and X8 (G2).
- G3–G8 are P2.

### Re-run evidence (this round)

```text
$ TMPDIR=<scratch>/x7r2/ bash PHASE-X7.exit-gate.sh; echo gate_exit=$?
build ok (<scratch>/x7r2//feii-album-ktx-gates/x7-build.log)
OK PHASE-X7.exit-gate.sh
gate_exit=0
$ grep -c "Liquid Warning" x7-build.log → 0
Publication safety passed … / Citation conformance passed for canonical lessons.

$ python3 -I x7t1/fences.py <src> <_site>   (built code == source fences)
cover-shaders src 6 built 6 → 0..5 MATCH
units-8-9-assignment src 1 built 1 → 0 MATCH

$ rg -ci "ahmes|deviac|evaluator_safe|BIBLIO-GAP|thessia|tuning_record|cascade-phase|curriculum-internal|UNVERIFIED|coat|operator-written|X7 |cold review" \
    _site/…/cover-shaders/index.html _site/…/units-8-9-assignment/index.html ; echo $?  → 1 (no hits)

internal-link check (every non-http href starts with baseurl /web-atelier-udit/ and its target exists in _site):
cover-shaders internal ok 15 bad []
units-8-9-assignment internal ok 15 bad []
anchor #lab-team--workplace-like--3-h present in unit-8 built page: 1

$ git diff --check → rc 0
```

**Fork re-assembled from current sources.** I re-ran `assemble.py` on the current Unit 8 and cover-shaders sources. `diff -r x7cr/fork/src x7r2/fork/src` → identical: no code fence changed in triage. esbuild against react-template pins: `fork`, `noset`, `nodecl1`, and `nodecl2` all gave `esbuild_exit=0`. Rendering in headless Chrome with SwiftShader over CDP:

| Variant | Panel | Console (excluding the DevTools info) | Screenshot |
| --- | --- | --- | --- |
| `fork` (as published) | `calls 3/6 · triangles 280/1368 · geometries 3 · textures 2` | only the `THREE.Clock` deprecation | `shot_fork.png`: picture, the four UV labels on their own corners, band |
| `noset` (`vUv = uv;` deleted) | `… textures 2` | only the `THREE.Clock` deprecation, no shader error | `shot_noset.png`: whole sleeve one flat blue |
| `nodecl1` (only `varying vec2 vUv;` deleted from the vertex shader) | `… textures 1` | `Vertex shader is not compiled. … ERROR: 0:72: 'vUv' : undeclared identifier` | see G4 |
| `nodecl2` (both vertex lines deleted) | `… textures 1` | `FRAGMENT varying vUv does not match any VERTEX varying` (link) | — |

### Closure of round-1 findings

| Fn | Sev | Status | Evidence |
| --- | --- | --- | --- |
| F1 varying failure mode | P1 | **CLOSED** | L450 now gives the declared-but-unset case: "no error at all … one flat colour, the picture's colour at UV (0,0)". `noset` re-run: no compile or link error, flat blue sleeve. The adjacent "never declares" bullet (L449) is imprecise; see G4 (P2). |
| F2 "move as they are" | P1 | **CLOSED in the lesson.** Enforcement residual: G1 | L389 says the root `public/` holds "in the fork only", and points at step 2. L461 names both changes: the per-route `covers/<slug>/public/` path, and the five-prop route contract. PHASE-X9.md binds the contract and the asset idiom. Ruling on the forward claim: see check 3 and G1. |
| F3 `memory.textures` is a count | P1 (downstream) | **CLOSED in substance.** Residuals: G2, G3 | three 0.185.1 re-verified: `WebGLInfo.js:5-8` `memory = { geometries: 0, textures: 0 }`; `WebGLTextures.js` `++` at 752/2038/2096 and `--` at 405/478. D3, D22, spine §1/§2/§5/§9, X8, X10, RATIONALE, F16, and the assignment are amended. Spine §6 and §7 are not (G2). |
| F4 texel ≠ filtered sample | P2 | **CLOSED** | L109: "one texel is one stored colour … blends the nearest few, so the colour that comes back is often a mix". Mirrored in deck-outline item 5 and spine §1. |
| F5 useTexture overclaim | P2 | **CLOSED** | L447–448 split. The `useTexture` bullet ("cached and uploaded once, but the callback runs again on every render") matches drei `useLayoutEffect(…, [onLoad])`. |
| F6 exercises item 5 premise | P2 | **CLOSED** | exercises.md item 5 now uses the round-1 wording. |
| F7 "do not tag it twice" | P2 | **CLOSED** | L416: "`texture.colorSpace` should read `'srgb'` … Fix the encode, not the shader". `constants.js:1308` `SRGBColorSpace = 'srgb'`, so the string is right. |
| F8 `/ex3-cover-shader` in Scope | P2 | **CLOSED** | `PHASE-X7.md` L19 names the cover fork and `/covers/<slug>`. `rg -n "ex3" lessons/en/feii` → no hits. |
| F9 sentence count / author label | P2 | **CLOSED** | `provenance.json` has `paragraph_author` ("cascade-phase-executor (Claude agent), not Thessia and not the human operator/professor…") and `paragraph_sentence_count: 9`. The `evaluation.md` NOTE is appended, and the original values are kept. A sentence split of index.md L77 gives `9`. The gated `tuning_record` comment says "9 sentences … written by the Claude executor" and does not appear in the built HTML (leak grep above). |
| F10 non-discriminating gate | P2 | **CLOSED** | Both new X7 gate lines discriminate. Against base `59ce589`, the stub contains `forged in X7` and no "explain this shader", so both new checks REFUSE it. `bash -n` passes for X7, X8, X9, and X10. |

### Acceptance (PHASE-X7.md), re-checked

| Item | Result |
| --- | --- |
| Registered; slug unique; permalink trailing slash | PASS. Unchanged from round 1. lessons.yml `complete` matches the frontmatter `complete`, per ruling (b). |
| No Ahmes/DevIAC/coat strings in student HTML | PASS. Leak grep above, rc 1. The static `exercises.md` and `deck-outline.md` copies in `_site` hold no internal strings (`cmp` against source: identical; read in full). This matches the sibling convention in U8/U9 `_site`. |
| ≥1 CodeSandbox-ready material file with `sampler2D`/`uMap` | PASS. Bundled and rendered (table above). |
| "Explain this shader" checklist | PASS. Gate line enforces it. |
| sampler2D/UV plain gloss; texel defined | PASS. F4 closed. |
| Build exit 0; no Liquid Warning | PASS. Re-run above: 0 warnings. |
| Cold review filed; blocking Fn closed | PASS. F1 and F2 are closed; this round adds no X7-blocking finding. |

### Check 2: orchestrator pack amendments against three 0.185.1 and toktx 4.4.2

| Claim | Verdict | Evidence |
| --- | --- | --- |
| `memory.textures` is a count | TRUE | See F3 row above. |
| `TextureUtils.getByteLength` exists and is exported | TRUE | `src/extras/TextureUtils.js:100` `function getByteLength( width, height, format, type )`, exported at `:297`. `src/Three.Core.js:162` `export { TextureUtils }`. `build/three.module.js` re-exports `TextureUtils` from `three.core.js`. It needs `format` and `type`: `getByteLength(w, h, RGBAFormat, UnsignedByteType)` = w×h×4. The pack text omits the arguments; G3 covers this. |
| KTX2 not flipped on upload | TRUE | `CompressedTexture.js:55-67` `this.flipY = false` "@readonly … not possible to flip compressed textures". `KTX2Loader.js` has no orientation handling. |
| KTX2 `colorSpace` from the DFD transfer | TRUE | `KTX2Loader.js:458` and `:1242` call `parseColorSpace(container)`. In `:1251-1272`, BT709 with an sRGB transfer gives `SRGBColorSpace`, BT709 with any other transfer gives `LinearSRGBColorSpace`, and unspecified primaries give `NoColorSpace`. |
| GPU bytes for KTX2 = Σ transcoded `mipmaps[i].data.byteLength` | TRUE | `KTX2Loader.js:767` `mipmaps.push( { data: mipData, … } )`. `:449` `new CompressedTexture( mipmaps, … )`. |
| toktx `--lower_left_maps_to_s0t0` exists | TRUE | `toktx --help` (v4.4.2) L110–114: "flipped vertically to a lower-left origin … writes a KTXorientation value of S=r,T=u". Measured on a 64×64 test PNG: default `KTXorientation: rd`; with the flag `KTXorientation: ru`. |
| toktx `--assign_oetf srgb` exists | TRUE, but see G6 | `toktx --help` L118–123: "Force … USE WITH CAUTION preferably only when you know the file format information is wrong". `toktx --t2 --encode etc1s/uastc --lower_left_maps_to_s0t0 --assign_oetf srgb` → rc 0, `Transfer: KHR_DF_TRANSFER_SRGB`, `Primaries: KHR_DF_PRIMARIES_BT709`, file starts `ab4b 5458 2032 30bb` (KTX 20). The **default** encode already gives SRGB/BT709 for this PNG. |
| Spine §1/§2/§9 internally consistent | TRUE | The §1 texel row, the §2 L57 count-vs-bytes paragraph, the diagram, L69, §5 item 5, and §9 all use "GPU bytes, computed" and "count". |
| Rest of spine consistent | **FALSE** | §6 L133 and §7 L145: see G2. |
| D3/D22 intent preserved | TRUE | Still two labelled numbers, file bytes vs GPU bytes. Only the instrument changed, from reading `memory.textures` to computing bytes. The count survives as a sanity check. D22's no-Tao rule and spine binding are untouched. Status-cell hygiene: see G7. |
| New gate lines valid and not trivially satisfiable | Mostly | `bash -n` OK for all four gates. **X7:** both lines discriminate (F10 row). **X8:** "GPU bytes", "flipY\|upside\|orientation", and "colorSpace" each give 0 hits on the current ktx2-basis stub, so all three REFUSE it. They are weak, since any mention passes, but not trivial. **X10:** the colorSpace line is trivially satisfiable, and the flip line is too narrow. See G5. |

### Check 3: PHASE-X9 Cover-props contract vs the published Unit 8 cover fork, and the L461 sentence

- **The contract matches.** Unit 8 L895: `export default function Cover({ hovered, selected, reduced, onHover, onSelect })`. Unit 8 L946–953: `App.jsx` renders `<Cover hovered={hovered} … reduced={reduced} onHover={setHovered} onSelect={setSelected} />`. `reduced` comes from `usePrefersReducedMotion` (U8 L698–713). PHASE-X9.md step 2(a) names the same five props, with the same owner (the route component) and the same source for `reduced`. The corrected X9 text no longer says that state "lives inside Cover".
- **L461 matches the fork.** The orchestrator's sentence says the route passes "the same five props the fork's `App.jsx` does (`hovered`, `selected`, `reduced`, `onHover`, `onSelect`)". That is accurate for the fork. It is consistent with U8 L959, which defers the route's choice to `_template`; X9 now makes that choice.
- **Ruling on the forward claim.** "is built to pass … the aggregator's `CONTRIBUTING.md` documents that contract" describes a repository that does not exist yet. A student-facing lab step may name the contract the route will provide; the alternative is telling students nothing about task2. **It is acceptable only if the cascade enforces it.** Today it does not:
  - X9 binds the contract in its Prompt only. It is not in X9 Acceptance or the X9 gate.
  - The brief's premise that "X11 re-checks" is **false**: X11 has no such step or gate line.
  - See G1.

### Check 4: assignment edits (L51, L64, L74, L80)

- **Correct and consistent with the spine.**
  - L51 defines file bytes (suitcase) vs GPU bytes (room, computed) and states that `memory.textures` is a count used "only to confirm the sleeve added one texture". That holds for PNG and KTX2 alike.
  - L64 says "computed GPU bytes for each".
  - L74 has the table header `GPU bytes (computed)`.
  - L80 has the count line, labelled as a count.
- **Fence check:** 1 source fence, 1 built, MATCH. The `ktx2-basis` link resolves under baseurl. Its target is still the X4 stub (`forged in X8`). The X8 gate requires "GPU bytes" on that page, so the forward "as the KTX2/Basis satellite teaches" is enforced.
- **No regression to bar 3.** L46 still lists "draw calls, triangles, and `renderer.info.memory.textures`" under "Documented GPU budget", and it does not call the count memory. Unit 8's textures row is a count and is listed as one.
- **Residuals:** the formula's mip basis (G3), and the assignment Template lacks the orientation and colorSpace rows that the X8 Template will have (G8).

### Check 5: regressions

- Build exit 0 and 0 Liquid Warning. Fences equal. No metadata leaks. Links resolve under baseurl. All from the re-run above.
- **exercises.md B3:** the drills are individual and decontextualised ("stay away from your album cover on purpose"). Items 1–2 are declared solvable without AI. Items 3–5 need no student cover. Item 3 is technically right: sRGB tag without `colorspace_fragment` gives a dark sleeve, and the reverse gives a washed-out one. Item 4's default "clamp to edge" matches `Texture` `wrapS = ClampToEdgeWrapping` (`Texture.js:48`).
- **deck-outline** has no internal strings, and its cite matches the X3 form.

---

### G1: L461's route contract is a forward claim the cascade does not enforce (P1; does not block X7 DONE; must land in the X7 commit; blocks X9 opening)

cover-shaders L461 tells students that the gallery route "is built to pass `Cover` the same five props … the aggregator's `CONTRIBUTING.md` documents that contract". It also tells them to reference the photo "relative to your route, as the aggregator's `_template` shows". Both depend on X9.

```text
$ rg -n "hovered|onSelect|reduced|import.meta.url|prop" PHASE-X9.exit-gate.sh   → no hits
$ sed -n '/## Acceptance/,/## Risks/p' PHASE-X9.md | rg -i "prop|hovered|import.meta|public/"   → no hits
$ rg -n "cover-shaders|onSelect|five props|prop contract" PHASE-X10.md PHASE-X11.md PHASE-X12.md PHASE-X11.exit-gate.sh PHASE-X12.exit-gate.sh
PHASE-X11.md:52: (leak grep only)    PHASE-X12.md:31: (Unit 9 still intro only)
```

An X9 executor can satisfy every X9 Acceptance box and the gate while shipping a `_template` that keeps state inside `Cover` or uses a root `/sleeve.jpg`. The published lesson would then be wrong, and nothing downstream would notice.

L461 also says "two things change" and then lists, as the second, the thing that does **not** change: the props. That is an editorial P2, folded in here.

**Fix (pack only; no lesson edit):**
1. **PHASE-X9.md Acceptance:** add "`_template` Cover and the gallery route use the five-prop contract `hovered, selected, reduced, onHover, onSelect` (X7 L461); `_template` shows the per-route asset idiom".
2. **PHASE-X9.exit-gate.sh:** add these lines, for example:
   ```bash
   for p in hovered selected reduced onHover onSelect; do
     rg -q "\b$p\b" "$ROOT/covers/_template/src/Cover.jsx" || { echo "REFUSED: _template Cover lacks $p (X7 L461 contract)" >&2; exit 1; }
   done
   rg -q "reduced=\{" "$ROOT/src" || { echo "REFUSED: gallery route does not pass reduced" >&2; exit 1; }
   rg -q "import\.meta\.url|/public/" "$ROOT/covers/_template/src" || { echo "REFUSED: no per-route asset idiom in _template" >&2; exit 1; }
   ```
3. **PHASE-X10.md:** `_studio` uses the X7 `SleeveMaterial.jsx` and `sleevePicture.js` **unchanged**, as the first real proof that "moves over unchanged" is true.
4. **PHASE-X11.md:** add a step that re-reads cover-shaders Lab mapping step 2 and assignment L51 against the built aggregator, and amends the lesson if X9/X10 diverged.
5. **Optional:** reword "but two things change" to "One thing changes and one does not".

### G2: Spine §6 and §7 still state the falsified claim (P1; does not block X7 DONE; must land in the X7 commit; blocks X8 opening)

```text
KTX2-FIRST-PRINCIPLES.md:133:5. Two numbers visible: file bytes, GPU textures memory.
KTX2-FIRST-PRINCIPLES.md:145:| Unit 8: `<Canvas>`, mesh, `renderer.info` budgets | The **textures** row as GPU memory, not file size |
```

Round 1 listed L132, now L133, among the lines to amend. It was not amended. L145 states the exact claim F3 falsified: Unit 8's textures row is a count. D22 makes the spine **binding** for X8, so the binding document now contradicts itself: §2 says count, §7 says memory. X8's gate and Acceptance would probably catch a page that follows §7, but the X8 executor should not have to choose between two spine sections.

**Fix:**
- L133 → "Two numbers visible: file bytes, GPU bytes (computed); the texture count shown only as a count."
- L145 → "The **GPU bytes** of the sleeve (computed), beside the textures **count** Unit 8 already shows; neither is file size."

### G3: The GPU-bytes formula compares PNG and KTX2 on different mip bases (P2)

The spine §2 L57, X8 L47–49, X10 L36–38, F16, and assignment L51 all say "PNG: width × height × 4; KTX2: Σ transcoded `mipmaps[i].data.byteLength`".

- **PNG.** three generates a full mip chain for a PNG or canvas texture by default: `Texture.js:48` `minFilter = LinearMipmapLinearFilter`, `:257` `generateMipmaps = true`, and `WebGLTextures.js:108-110` `textureNeedsGenerateMipmaps` returns `texture.generateMipmaps`. So the real PNG footprint is about w×h×4×4/3.
- **KTX2.** The KTX2 sum includes every level that was encoded: all of them with `--genmipmap`, only level 0 without it (`KTX2Loader.js:453` then sets `LinearFilter`).

The prescribed numbers therefore understate PNG by about 25%, or compare a chain against a single level. That is the kind of unlabelled measurement this satellite exists to prevent.

The round-1 F3 fix said "add about one third if mipmaps are generated" and "record `texture.format`"; both were dropped. Also, `getByteLength` takes `(w, h, format, type)`, and the pack never gives the arguments.

**Fix (spine §2, X8 step 5, X10 step 3, assignment L51 at X8 time):**
- PNG = `TextureUtils.getByteLength(w, h, RGBAFormat, UnsignedByteType)`, × 4/3 when mipmaps are generated, which is three's default.
- KTX2 = Σ over all transcoded levels.
- State whether the KTX2 was encoded with mipmaps, and record `texture.format`, which is the transcode target.

### G4: "If the vertex shader has no `varying vec2 vUv;` line, the link fails" is true only if `vUv = uv;` is also gone (P2)

cover-shaders L449. With only the declaration deleted, `nodecl1` gives a **vertex compile** error, not a link error:

```text
Program Info Log: Vertex shader is not compiled.
ERROR: 0:72: 'vUv' : undeclared identifier
```

Only `nodecl2`, with both lines deleted, gives the Unit 9 link message `FRAGMENT varying vUv does not match any VERTEX varying`. A student still sees an error either way, so the diagnostic advice holds. The words "the link fails, exactly as Unit 9 describes" do not match the message they will read. Unit 9 L413 is right in its own context: the bulb has no `vUv` at all.

**Fix (one clause):** "…the shader fails: with `vUv = uv;` still there the vertex shader does not compile (`'vUv' : undeclared identifier`); with both lines gone the link fails, exactly as Unit 9 describes." Defer to the X11 sweep or the next lesson touch.

### G5: Two X10 gate lines do not test what they claim (P2)

1. **The colorSpace line is trivially satisfied.** `rg -q "SRGBColorSpace|colorSpace" covers/_studio/src src/lib` matches the PNG tagging line `texture.colorSpace = SRGBColorSpace;`. That line is in X7's `sleevePicture.js` (L229 of the lesson), which `_studio` will reuse. It is not a runtime check.
   - Fix: require an assertion shape, for example `rg -q "colorSpace\s*(!==|===)\s*(THREE\.)?SRGBColorSpace|colorSpace\s*!==\s*'srgb'"`.
2. **The flip line is too narrow.** `rg -q "lower_left_maps_to_s0t0" scripts/encode-cover.mjs` REFUSES a correct `ktx create` script. X10 L48 explicitly allows `ktx create`. `ktx create --help` (v4.4.2) L118–127: `--convert-texcoord-origin <corner>` … "Input images whose origin does not match corner will be flipped vertically".
   - Fix: `rg -q "lower_left_maps_to_s0t0|convert-texcoord-origin[ =]bottom-left"`.

### G6: `--assign_oetf srgb` is the cautioned flag; prefer `--convert_oetf srgb` or the default plus the runtime check (P2)

toktx help says `--assign_oetf` should be used "WITH CAUTION preferably only when you know the file format information is wrong". It relabels the transfer function without converting. On a 64×64 PNG with no colour chunks, a default `toktx --t2 --encode etc1s` already writes `KHR_DF_TRANSFER_SRGB` and `KHR_DF_PRIMARIES_BT709`.

`--convert_oetf srgb` ("Convert … if the current transfer function is different") is the safe way to make the transfer explicit. The `ktx create` equivalent is `--convert-tf srgb`. X10 L43–44 already says "confirm against `toktx --help`". This finding records what that confirmation shows.

**Fix:** in X10 step 3, name `--convert_oetf srgb` (toktx) or `--convert-tf srgb` (ktx create), and keep the runtime `colorSpace` assertion as the real guard.

### G7: DECISIONS status cells not updated for the F3 amendment (P2)

- **D22:** its text changed (computed GPU bytes, "amended 2026-11-04 after X7 F3"), but the status cell still reads `CONFIRMED 2026-11-04`. DECISIONS.md L3 defines `AMENDED` as "new text below".
- **D3:** its status cell still names only the earlier amendment, "(first-principles spine)".

**Fix:**
- D22 → `AMENDED 2026-11-04 (X7 F3: computed GPU bytes)`.
- D3 → append "; X7 F3 GPU bytes".

### G8: Two `ktx2-note.md` Templates will diverge (P2)

- PHASE-X8.md L14 and L79: the X8 Template asks for orientation and `colorSpace` checks.
- The assignment's own Template (L66–84) has neither, and it is the one students copy for the hand-in.
- X8's Prompt step 8 only says "link from U8/U9/assignment"; it does not say to align the assignment Template.

**Fix:** add to X8 step 5: "update the assignment's `ktx2-note.md` Template (units-8-9-assignment L66–84) to the same fields, or make it link to the X8 Template as the single source".

---

### Downstream phases to amend (amend-on-surprise, round 2)

| File | Change | Finding | When |
| --- | --- | --- | --- |
| PHASE-X9.md Acceptance + PHASE-X9.exit-gate.sh | Five-prop contract and per-route asset idiom, enforced | G1 | X7 DONE commit; before X9 opens |
| PHASE-X10.md | `_studio` reuses X7 files unchanged; `--convert_oetf`/`--convert-tf`; mip-basis GPU bytes | G1, G3, G6 | before X10 opens |
| PHASE-X10.exit-gate.sh | colorSpace assertion shape; flip regex accepts `ktx create` | G5 | before X10 opens |
| PHASE-X11.md | Re-check cover-shaders L461 and assignment L51 against the built aggregator; G4 wording | G1, G4 | before X11 opens |
| KTX2-FIRST-PRINCIPLES.md §6 L133, §7 L145; §2 L57 | Remove "GPU textures memory" / "textures row as GPU memory"; mip basis | G2, G3 | X7 DONE commit; before X8 opens |
| PHASE-X8.md step 5 | Mip basis + `texture.format`; align the assignment Template | G3, G8 | before X8 opens |
| DECISIONS.md D3, D22 status cells | AMENDED (X7 F3) | G7 | X7 DONE commit |

### Not done by this reviewer

- No lesson or pack edits, no commit, no DONE flip, no push.
- SwiftShader only; no GPU or phone check.
- I did not render a KTX2 in three. The orientation and colorSpace claims rest on three source, `toktx --help`, and `ktx info` of real encodes.
- I did not re-run the round-1 hover, reduced-motion, or own-photo renders, because no fence changed (`diff -r` identical).


> **Pointer (orchestrator, 2026-11-04):** G6 is superseded by PHASE-X8-COLD-REVIEW.md S1. `--assign_oetf srgb` is correct in every measured case and `--convert_oetf` never is. This record is otherwise unchanged.

> **Correction (orchestrator, X8 round-2 G7):** “convert never correct” means never needed. On correctly tagged or untagged PNGs `--convert_oetf` is a harmless no-op. It does harm on mis-tagged and ICC-tagged files, which is why X10 uses assign only.
