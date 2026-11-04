# PHASE-X8 report — KTX2 satellite lesson (first principles)

**Status:** DONE (orchestrator, 2026-11-04, after round-2 cold review; implementer stopped at VERIFYING) (implementer stops here; cold review and DONE belong to others)

**Implementer:** cascade-phase-executor (Claude). Worktree: `web-atelier-udit-album-FEII-3D-ALBUM-KTX-8`. I checked that `.cascade-lane` = `FEII-3D-ALBUM-KTX` before editing anything, and `git status` was clean at the start.
- I did not commit or push.
- I did not run the exit-gate script. I ran gate-equivalent checks instead (below).
- I touched no other phase's files and no pack files other than this report.
- react-template was used read-only: its `node_modules` was symlinked into scratch folders and not modified.

**Resume point:** run the harness `verify PHASE-X8.md`, then the cold reviewer (`PHASE-X8-COLD-REVIEW.md`), then triage. The surprise **S1** below needs an orchestrator ruling, because it affects X10.

---

## Files changed (worktree)

- `web-foundations/docs/lessons/en/feii/ktx2-basis/index.md`: the X4 stub is replaced by the full lesson. "forged in X8" is gone (no hits in `docs/`, `_data/`, or `_site/lessons`).
  - **Frontmatter:** slug, permalink and tags kept. Adds `description` and `status: complete`. Has the semantic-graphic include and the exact TOC fence.
  - **Framing aside.** The master idea follows the spine. The studio test glosses pixel and texel inline and does **not** name a format; it says the names come further down.
  - **Callouts.** "Before you start" restates the two prerequisites in one sentence each (Unit 8 `renderer.info`, Unit 9 UV) and links cover-shaders. Then the AI disclosure (covenant + Unit 6 merge log), then the code-label convention note.
  - **Learning objectives**, written with no format names.
  - **Spine §§0–5**, one H2 each, in spine order. Each opens with its lesson-scribe paragraph and a gated `tuning_record` comment:
    - §0 `<img>` journey, with an Excerpt.
    - §1 the four-word table. Texel gloss as amended: "one stored colour", and a lookup usually blends neighbours, matching cover-shaders. Also the poster analogy and `sampler2D` given its referent.
    - §2 suitcase vs room: 1024² → 4,194,304 bytes, an Excerpt ASCII figure file → decode/upload → GPU memory, and `renderer.info.memory.textures` taught as a **count** (1 → 2; a 64² and a 4096² picture both add one). Also GPU bytes defined (PNG `TextureUtils.getByteLength`, KTX2 Σ levels) and like-with-like (mipmaps ×~4/3, all levels vs level 0, record `texture.format`).
    - §3 file packing vs GPU-resident packing, with a table.
    - §4 the first appearance of KTX2 / ETC1S / UASTC / Basis / transcoder, each glossed. MP4/H.264 analogy. GPU-native format names are recorded, not memorised.
    - §5 the written choice. A qualitative typical-use table with **no ratios**. A real-sleeve pair is "measured in the reference repo"; the "(X10)" label is kept only in the gated comment.
  - **Practical sections:**
    - "Measure the room": a **CodeSandbox-ready** `src/gpuBytes.js` (JSDoc, `{% raw %}`-wrapped because its JSDoc has `{{ }}`), and an **Excerpt** of the `Cover.jsx` lines that call it.
    - "Load the packed sleeve":
      - three steps (encode; copy the transcoder files the repo vendors from `node_modules/three/examples/jsm/libs/basis/` into `public/basis/`; swap `sleevePicture.js`);
      - an **Excerpt** hook (fiber `useLoader` + three's own `KTX2Loader`, `setTranscoderPath('/basis/')`, `detectSupport(gl)`), naming three `0.185.1`;
      - a note on three's built-in default path;
      - a warning about Drei `useKTX2` (three-stdlib copy + CDN default path);
      - a dated pin table.
    - "Two traps on the way back":
      - orientation: `flipY = false`, the loader ignores KTXorientation, encode with `--lower_left_maps_to_s0t0`, never `1.0 - vUv.y`;
      - `colorSpace`: set from the file's DFD, must read `'srgb'`, re-encode, never delete `colorspace_fragment`;
      - measured evidence for both.
    - "Encode — the two commands" **Template**, with an explanation of each flag.
    - "What was measured, and what was not": the placeholder table with provenance and three warnings, plus the end-to-end cover-fork render.
    - "Your note — `docs/ktx2-note.md`" **Template**: mode, why, licence, machine/date, levels counted, file bytes, GPU bytes (computed), `texture.format`, the `memory.textures` count (labelled as a count), the orientation check, and the `colorSpace` check.
  - **Closing sections:**
    - "Say it out loud": spine §9, verbatim.
    - Failure modes.
    - Lab mapping to assignment task3.
    - Independent self-check.
    - "What this lesson can and cannot claim": STEP A, platform-only row; (Angel and Shreiner 2024, 1–2) cited only as the broad graphics precedent, with the prose saying it does not validate KTX2. The full matrix trail sits behind the gate.
    - Dated platform notes, every URL HTTP 200.
    - Session outcome.
    - Gated professor answer sketch.
    - References (Chicago, Angel and Shreiner only).
  - **No** Tao epigraph and no `tao-development-quote`, `qa-`, `arch-` or `dop-` IDs (D22).
- `web-foundations/docs/lessons/en/feii/ktx2-basis/exercises.md` (new): five individual, decontextualised drills. Two are declared solvable without AI. One is a diagnostic (the washed-out sleeve), and one is a count-vs-bytes diagnosis. The answers are in the gated sketch.
- `web-foundations/docs/lessons/en/feii/ktx2-basis/deck-outline.md` (new): eleven speaker claims in spine order.
- `web-foundations/docs/lessons/en/feii/units-8-9-assignment/index.md`:
  - The ktx2-note **Template** is replaced by the lesson's template, so the two are byte-identical (checked by script). This adds `texture.format`, levels counted, machine/date, the **orientation check** row and the **colorSpace check** row (X7 round-2 G8).
  - The Template label now links the satellite and names the two traps.
  - The "What you hand in" bullet for `docs/ktx2-note.md` now mentions same-levels, `texture.format`, and the two checks.
- `web-foundations/docs/lessons/en/feii/unit-9-shader-literacy/index.md`: U9 did not link ktx2-basis (0 hits before). One link was added in the Session outcome sentence. U8 (2 links) and the assignment already linked it.
- `web-foundations/docs/_data/lessons.yml`: `feii-ktx2-basis` status changes from `en: draft` to `en: complete`, to agree with the frontmatter. The slug is unique (1 hit).
- This report.

**Not changed:** `tracks.yml` and hours (D1); cover-shaders; U8; the feii index (it already links the satellite); react-template; other pack files.

**Deliverable interpretation, for the cold reviewer to rule on:** "Template `docs/ktx2-note.md`" is delivered as a labelled Template fence in the lesson, mirrored in the assignment. It is not a separate published file, because a raw `.md` beside the page would be served unrendered. The student creates `docs/ktx2-note.md` in their route.

---

## Commands run and real output

### Build (final run, after the last edit)

```text
$ cd web-foundations && npm run build > x8-build-final.log 2>&1; echo build_exit=$?
build_exit=0
liquid_warnings=0
                    done in 3.388 seconds.
Publication safety passed: no internal corpus or local-architecture metadata is publishable.
Citation conformance passed for canonical lessons.
```

An earlier build had **2 Liquid Warnings**. They came from the JSDoc types `{{ levels?: … }}` and `{{ bytes: number, … }}` in the gpuBytes fence. I fixed them by wrapping that fence in `{% raw %}`, then rebuilt (0 warnings).

### Gate-equivalent checks (the gate script itself was not run)

```text
UASTC: 19   ETC1S: 18   texel(i): 16   pixel(i): 12   "GPU bytes"(i): 26
flipY|upside|orientation(i): 13   renderer.info.memory.textures: 6   colorSpace: 8
slug: feii-ktx2-basis$ in lessons.yml: 1
gate's python check (same code): texel pos 400; first brand KTX2 @12967 → "ok"
rg "tao-development-quote|`(arch|qa|dop)-[0-9]" page → no hits
test -f _site/lessons/en/feii/ktx2-basis/index.html → exists
rg -i "ahmes|deviac|evaluator_safe|BIBLIO-GAP" built page → no hits
rg -i "tuning_record|thessia|curriculum-internal|publish_internal|raw %|forged in X8" built page → no hits
rg "X10|X8|PHASE" built page → no hits
git diff --check → ok
```

### Built output

- **Links:** all 8 internal links in the built page resolve on disk under `_site`.
- **Code blocks:** all 7 `<pre><code>` blocks, after tag-strip and unescape, are identical to the 7 source fences. So nothing was lost to Liquid. Every fence carries a label (14 fence markers = 7 labelled fences).
- **Assignment:** the built page has the "Orientation check" and "colorSpace check" rows.
- **Link counts:** U9 built page has 1 ktx2-basis link, U8 has 2, the assignment has 3.

### Platform facts verified in three 0.185.1 source (`react-template/node_modules`)

- **Pins:** three 0.185.1, @react-three/fiber 9.8.2, @react-three/drei 10.7.9, react 19.3.1.
- **`KTX2Loader._createTextureFrom`:**
  - builds `new CompressedTexture(mipmaps, …)`;
  - sets `generateMipmaps = false` and `minFilter = mipmaps.length === 1 ? LinearFilter : LinearMipmapLinearFilter`;
  - sets `colorSpace = parseColorSpace(container)`, where BT709 + `KHR_DF_TRANSFER_SRGB` → `SRGBColorSpace`, otherwise `LinearSRGBColorSpace`.
- **`CompressedTexture`:** `this.flipY = false`.
- **`TextureUtils.getByteLength`** is exported (`Three.Core.js`). RGBA8 = w×h×4.
- **`WebGLTextures.getMipLevels`:** when `generateMipmaps`, uses `log2(max(w,h)) + 1` levels.
- **Transcoder:** the target table prefers ASTC → BC7 for UASTC and ETC2 → … for ETC1S, with an uncompressed RGBA32 fallback. That fallback is why the lesson says to record `texture.format`.
- **Default transcoder path (new):** `KTX2Loader.js` lines 106–107 compute `WASM_BIN_URL` / `WASM_JS_URL` with `new URL('../libs/basis/…', import.meta.url)` at module load. This default is used when `setTranscoderPath` is not called.
- **fiber `useLoader`:** memoises one loader per class (`memoizedLoaders`) and suspends per URL.
- **drei `useKTX2`:** imports `KTX2Loader` from `three-stdlib`, and its default `basisPath` is `https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/`.

### Real encodes (toktx v4.4.2 / ktx v4.4.2, scratch only, nothing committed)

**Source image.** It is an original placeholder: an SVG twin of the cover-shaders canvas (512×512, `#1f3a5f` ground, `#e36a2c` disc, `#f4efe6` text "Placeholder Album", `uv 0,1` / `uv 1,1` / `uv 0,0` / `uv 1,0` corner labels). Rendered by `rsvg-convert -w 512 -h 512 placeholder.svg -o placeholder-rsvg.png`, then `magick placeholder-rsvg.png -strip -define png:color-type=6 placeholder.png`. Result: `placeholder.png`, **20,245 bytes**, chunks IHDR/IDAT/IEND only (no colour tags).

| Command | Output bytes | `ktx info` |
| --- | ---: | --- |
| `toktx --t2 --encode etc1s default-etc1s.ktx2 placeholder.png` | 4,057 | levelCount 1, Transfer SRGB, **KTXorientation rd** |
| `toktx --t2 --encode etc1s --genmipmap --lower_left_maps_to_s0t0 --assign_oetf srgb sleeve-etc1s.ktx2 placeholder.png` | **8,616** | levelCount 10, Transfer SRGB, **KTXorientation ru** |
| `toktx --t2 --encode uastc --genmipmap --lower_left_maps_to_s0t0 --assign_oetf srgb sleeve-uastc.ktx2 placeholder.png` | **350,032** | (no zstd) |
| `toktx --t2 --encode uastc --zcmp 18 --genmipmap --lower_left_maps_to_s0t0 --assign_oetf srgb sleeve-uastc-zstd.ktx2 placeholder.png` | **24,968** | levelCount 10, KTX_SS_ZSTD, Transfer SRGB, ru |
| `ktx create --format R8G8B8A8_SRGB --encode basis-lz --generate-mipmap --convert-texcoord-origin bottom-left --assign-tf srgb placeholder.png kc-etc1s.ktx2` | 8,534 | levelCount 10, Transfer SRGB, ru (confirms the `ktx create` flags the lesson names) |

**Colour-space trap.** `placeholder-gamma1.png` is `placeholder.png` with a gAMA=100000 (gamma 1.0) chunk inserted by script.

| Command | Bytes | Transfer | Disc pixel after `ktx extract --transcode rgba8` |
| --- | ---: | --- | --- |
| `toktx --t2 --encode etc1s linear-tagged.ktx2 placeholder-gamma1.png` | 3,882 | **LINEAR** | — |
| `toktx --t2 --encode etc1s --assign_oetf srgb assigned.ktx2 placeholder-gamma1.png` | 4,057 (same as default) | SRGB | (229,105,47) |
| `toktx --t2 --encode etc1s --convert_oetf srgb converted.ktx2 placeholder-gamma1.png` | 3,978 | SRGB | **(240,174,116)** |
| source PNG | — | — | (227,106,44) |

### Browser probe (headless Chrome, ANGLE Vulkan **SwiftShader**, not a GPU)

**Setup.**
- A plain three 0.185.1 page: `KTX2Loader` with `setTranscoderPath('./basis/')` (the vendored files copied), plus `TextureLoader`.
- `gpuBytes.js` identical to the lesson fence.
- Bundled with esbuild 0.28.2.
- Driven over CDP (scratch `tools/cdp.mjs`).
- WebGL extensions exposed: astc, bptc, s3tc, etc, etc1.

```text
png                  bytes 1,398,100 (10 levels)  level0 1,048,576  RGBAFormat            srgb        flipY true
ktx2-default-etc1s   bytes   131,072 (1 level)    level0   131,072  RGB_ETC2_Format       srgb        flipY false
ktx2-flipped-etc1s   bytes   174,776 (10 levels)  level0   131,072  RGB_ETC2_Format       srgb        flipY false
ktx2-flipped-uastc-z bytes   349,552 (10 levels)  level0   262,144  RGBA_ASTC_4x4_Format  srgb        flipY false
ktx2-linear-tagged   bytes   131,072              level0   131,072  RGB_ETC2_Format       srgb-linear flipY false
ktx2-assigned-srgb   bytes   131,072              level0   131,072  RGB_ETC2_Format       srgb        flipY false
renderer.info.memory.textures: 0 → 1 → 2 → 3 as PNG, default, flipped were drawn
Rendered disc (MeshBasicMaterial): PNG (227,106,44); linear-tagged (242,171,118) washed out; assigned (229,105,47)
```

**Screenshot.** I inspected it myself (scratch `probe/shot-swiftshader.png`):
- The PNG is upright.
- The **default toktx encode renders upside down**, with `uv 0,1` at the bottom-left and the title mirrored vertically.
- The flipped encode is upright.

### Cover-fork end-to-end (esbuild + render)

**Assembly.**
- The Unit 8 cover fork was assembled by script from the published fences: `main.jsx`, `index.css`, `BudgetProbe.jsx`, `App.jsx` with the documented Beacon→Cover swap, and the Templates `parts.js` and `Cover.jsx`.
- Then the cover-shaders `sleevePicture.js`, `SleeveMaterial.jsx` and the three `Cover.jsx` changes.
- Then this lesson's `gpuBytes.js` and its `Cover.jsx` Excerpt lines.

```text
$ esbuild src/main.jsx --bundle --format=iife --jsx=automatic --loader:.js=jsx   (NODE_PATH = react-template/node_modules)
variant A (canvas/PNG path + gpuBytes)                     esbuild exit=0
variant B (KTX2 Excerpt sleevePicture.js + gpuBytes)       esbuild exit=0
```

**Render** (SwiftShader, CDP `tools/cdp2.mjs`):

```text
A: panel "calls 3/6 · triangles 280/1368 · geometries 3 · textures 2 · over ceiling"
   console.table {all: 1398100, level0: 1048576, format: RGBAFormat, colorSpace: srgb}
B: panel "... textures 2 ..."; console.table {all: 174776, level0: 131072, format: RGB_ETC2_Format, colorSpace: srgb} (×2, StrictMode)
   screenshot shot-fork-ktx.png: packed sleeve upright (uv 0,0 bottom-left), sheen band crossing; no console errors besides React DevTools info + THREE.Clock deprecation
```

**Note:** the IIFE build of variant B threw `TypeError: Failed to construct 'URL'` at module load. That is the `import.meta.url` default described above. It is an artefact of IIFE bundling. Rebuilt as `--format=esm` (which is what Vite/CodeSandbox serve), it rendered as shown.

### Platform-note URLs (all checked 2026-11-04)

- HTTP 200: threejs.org `KTX2Loader` (title "KTX2Loader - Three.js Docs"), `CompressedTexture`, `TextureUtils`, the color-management manual page, the Khronos KTX 2.0 spec (title "KTX File Format Specification"), the KhronosGroup/KTX-Software GitHub, `ktx_create.html` (title "KTX Tools Reference: ktx create"), and the BinomialLLC/basis_universal GitHub.
- 404: `ktxtools/toktx.html` (so it is not linked) and a bogus threejs path (so threejs is not an SPA catch-all).

---

## Lesson-scribe records (B1 = spine §§0–5, one BRIEF each)

All records are under `/Users/ruvebal/src/deviac/fine-tuning/thessia-tuning-memory/`.

| Spine | Record | Outcome |
| --- | --- | --- |
| §0 | `2026-11-04-b54056a3-c0ba-4018-a727-c7cb887c650f-feii-ktx2-basis-s0/` | attempt 1 passed gates; **substantially amended** (amendments.diff) |
| §1 | `2026-11-04-bb810c58-7e94-475b-9594-f13954ab87c7-feii-ktx2-basis-s1/` | attempts 1–2 **rejected**; executor-written |
| §2 | `2026-11-04-cbcbdebc-cab9-456f-9dd8-aecb837f76b0-feii-ktx2-basis-s2/` | attempt 1 passed gates; amended |
| §3 | `2026-11-04-5cdf1de1-e206-41b7-be18-0e7ae1ad214f-feii-ktx2-basis-s3/` | attempts 1–2 **rejected**; executor-written |
| §4 | `2026-11-04-89db33a8-d568-4677-9658-0f119ea1f86a-feii-ktx2-basis-s4/` | attempt 1 passed gates; amended |
| §5 | `2026-11-04-6fe81dda-6c50-44f0-b914-0a542908a810-feii-ktx2-basis-s5/` | attempts 1–2 **rejected**; executor-written |

**What each record holds:**
- Every record: BRIEF.md (a/b/c inputs, licensed studio facts, an empty citation registry, the one-idea gate), prompt.md, provenance.json, and evaluation.md (six axes / attempt notes).
- Accepted records add: thessia-raw.md, its `.logprobs.json` (perplexity s0 5.18, s2 4.78, s4 6.20), citation-fidelity.json, generation.log (with `/api/ps` before), integrated.md, and amendments.diff (a real `diff -u`).
- Rejected records add `attempt-1/` and `attempt-2/`, each with its prompt, the raw or `.rejected` raw, the logprobs sidecar, citation-fidelity.json, and generation.log. They also add operator-written.md.
- The s0 record holds the shim copy `scribe_http.py`. It is byte-identical to the X6 copy (`diff` clean).

**Harness.**
- The canonical `thessia_generate.py` is broken (venv). I reused the stdlib HTTP shim unchanged.
- Every call: `/api/generate`, model `thessia-scholar-v3`, `stream:false`, `logprobs:true`, `keep_alive:0`, temperature 0.3, seed 1104, num_predict 512, `--expected-sentences 4`.
- `/api/ps` returned `{"models":[]}` before every call.
- No `ollama run`, no model pull, no cloud SDK. DevIAC/Athanor was not used; input (c) is declared empty in each BRIEF.

**Known shim deviations (recorded in every evaluation.md):**
- Its quote gate is **stricter** than canonical. Canonical allows quotes under 4 words; the shim fails any quoted run of 3 or more characters. s3 attempt 1 failed on the 2-word "GPU resident", which canonical would have passed.
- Its CI3 is **weaker**: an author-year regex only, with no node/page check. It missed "Angel & Shreiner 2019" in X7. CI3 was moot here, because the registry was empty and citing was forbidden.

### Rejected / amended Thessia output and why

| Spine | Attempt | Gates | Editorial verdict |
| --- | --- | --- | --- |
| §0 | 1 | PASS | Amended. False claim that the shader colours "as light hits different angles" (that is the U9 bulb, not the sleeve). Wrong placeholder ("orange circles at each corner"). Off-idea "do all browsers paint the same shades?". 6 sentences under 4 markers. Semicolons. |
| §1 | 1 | PASS | **Rejected.** "0 means left/top" is false (uv 0,0 is bottom-left). Never defines texel. "the shirt's surface". An ~80-word run-on close. |
| §1 | 2 | PASS | **Rejected.** Invented "The sleeve texture is 50x76 pixels" and code `u = u * .5`, then degenerated into word salad until num_predict. |
| §2 | 1 | PASS | Amended. "over three megabytes" became 4,194,304 bytes; "pixel version" became picture; removed "barzakh" (not student-readable); two questions merged. |
| §3 | 1 | quote **FAIL** | **Rejected.** Also 6 sentences and a "look it up online" question. |
| §3 | 2 | PASS | **Rejected.** Says KTX2 keeps textures small "without losing any pixels" (false; ETC1S is lossy). Uses a brand name in §3. 6 sentences. |
| §4 | 1 | PASS | Amended. The brand names in S1 came before their gloss (spine §8), so I moved them into S2 with glosses. Removed ASTC/PVRTC. Rewrote the "load day zero" close. |
| §5 | 1 | PASS | **Rejected.** **Fabricated measurements**: "PNG was 308 KB", "96 bytes of GPU memory". |
| §5 | 2 | PASS | **Rejected.** Invented "glTF-Pipeline" as the measuring tool. Criterion drifted to runtime speed. 6 sentences. |

**Who wrote what:** the §1, §3 and §5 paragraphs were written by **the Claude executor** (cascade-phase-executor agent), not by Thessia and not by the professor. The §0, §2 and §4 paragraphs are Thessia raws amended by the Claude executor. Each case is stated in the gated `tuning_record` comment beside the paragraph. `independent_human_review: false` throughout, and professor release is a pre-publication step. This follows the X6/X7 precedent: a gate FAIL is regenerated, not hand-fixed. The cold reviewer may rule on whether two attempts before an operator replacement is enough (X7 used up to four).

---

## Surprises to report (not absorbed silently)

- **S1 — `--convert_oetf srgb` is the wrong re-encode for a mislabelled sleeve photo.** This affects X10 and the orchestrator's briefing note. The brief said "re-encode with `--convert_oetf srgb` if not [srgb]". I measured it on a screen-colour PNG carrying a wrong gAMA 1.0 tag: `--convert_oetf srgb` labels the file sRGB **and rewrites the pixels**. The disc went from (227,106,44) to (240,174,116), a permanent brightening. `--assign_oetf srgb` relabels without touching the pixels: same 4,057-byte output as the untagged encode, and the disc renders (229,105,47).
  - The lesson therefore teaches `--assign_oetf srgb` (and `--assign-tf srgb` for `ktx create`), with the measured reason, and warns against `--convert_oetf` for sleeve photos.
  - `toktx --help` agrees: convert "Convert[s] the input images to the specified transfer function, if the current transfer function is different".
  - X10's encode script should use assign, not convert. Orchestrator ruling requested.
- **S2 — UASTC without `--zcmp` is 350,032 bytes vs 20,245 for the PNG** (placeholder). X10's `encode-cover.mjs` should pass `--zcmp` (here 18), or UASTC files will be far larger on disk than students expect. The lesson's Template uses `--zcmp 18` and says why.
- **S3 — the transcoder default path at module load.** three 0.185.1's `KTX2Loader` evaluates `new URL('../libs/basis/…', import.meta.url)` at module load. Any non-ESM bundle crashes on import even when `setTranscoderPath` is called. Vite/CodeSandbox are ESM, so students are unaffected, but X10's tests or CI should bundle as ESM. The lesson keeps the brief's instruction (copy the vendored files, set the path) and says plainly that the built-in default path was not checked against students' bundlers.
- **S4 — the measured count is 1 → 2, and GPU bytes vary by device.** `texture.format` really does vary by device: SwiftShader transcoded ETC1S → ETC2 and UASTC → ASTC 4×4. A laptop GPU without ETC/ASTC will get BC1/BC7 or another target, and so different GPU bytes from the same file. X10's studio switch should display `texture.format` beside the number.

---

## Acceptance checklist (implementer's view; cold reviewer decides)

- **Pixel, UV, texel and texture are defined before KTX2 / ETC1S / UASTC.** The first brand is in the §4 paragraph, and the gate's own python check passes. The studio test names no format.
- **File packing is kept separate from GPU-resident packing** (§3 table and prose). "Compressed" never stands alone for both.
- **ETC1S and UASTC have separate terms.** "Just use KTX2" and "I used KTX2" are refused explicitly (§4, failure modes).
- **The studio test and oral paragraph are present** (framing aside + "Say it out loud", spine §9).
- **No `tao-development-quote` and no `arch-` / `qa-` / `dop-` IDs.**
- **The `docs/ktx2-note.md` Template asks for everything required:** mode, why, source licence, file bytes, GPU bytes (computed), the orientation check, and the `colorSpace` check. It is mirrored byte-identically in the assignment.
- **`renderer.info.memory.textures` is described only as a count**: in §2, §5, the Template, the failure modes and exercise 3.
- **The normal build HTML has no coat/node/Ahmes strings.**
- **The lessons.yml row exists and the index links resolve in `_site`.**
- **The build exits 0 with no Liquid Warning.**
- **Cold review filed, blocking findings closed: not mine to do.** Pending.

## Uncertainties

- **Software renderer only.** Every render was SwiftShader. GPU bytes on a real laptop or phone GPU will differ in `texture.format`. The lesson says so and publishes no real-sleeve pair.
- **Placeholder numbers on the student page.** I published the placeholder measurements, labelled with image, encode and renderer. A reviewer may judge that any number there reads as a ratio. The page itself avoids percentages and "×" claims for packed formats; the only multiplier is the documented mipmap × 4/3.
- **Vite and the default transcoder path.** It is unverified whether Vite's dev server would serve three's default `import.meta.url` path, and the lesson says so.
- **Operator prose.** Three of the six B1 paragraphs are operator prose after two rejected attempts each. Two attempts is fewer than X7's four.
- **The Drei `useKTX2` warning** rests on reading drei 10.7.9 source. I did not run it.
- **The "orientation note" claim.** "KTX2Loader ignores the orientation note" is grounded in loader source (`KTXorientation` is never read in `KTX2Loader.js`) and in the rendered default encode coming out upside down.

---

## Triage round 1 (2026-11-04)

**Status:** VERIFYING (unchanged; implementer stops here). Same phase, same worktree. I did not run the exit gate, commit or push. Line numbers below are after the edit, in `web-foundations/docs/lessons/en/feii/ktx2-basis/index.md` (shortened to `index.md`). The only pack file I edited is this report. Pre-edit backup: `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/index.pre-triage1.md`.

| Finding | Change (file:line) | Evidence |
| --- | --- | --- |
| **F1** (P1) colour words unglossed | `index.md:373`: new "Four colour words first" paragraph at the top of Trap 2. It glosses screen colours, **sRGB**, **linear**, **transfer function / transfer**, and **colour space** in plain words before any of them is used in Trap 2 or the Template, and says a sleeve photo always holds screen colours, so the tag must say sRGB. This is the reviewer's paragraph adapted to the page voice. `index.md:377`: "(OETF is the flag's name for the transfer.)" where the flag first appears. `index.md:53`: the learning objective that first says "colour space" now glosses it inline ("which kind of colour numbers"). | Built page contains "Four colour words first" (1 hit). The only earlier hit for `colorSpace` is inside the loader Excerpt's code comment (L327), which is an API name in code, not prose. |
| **F2** (P1) aggregator transcoder | `index.md:314` (step 2): in the cover fork, copy into `public/basis/`; on the aggregator the instructor vendors one shared copy at the site root, with the path built from `import.meta.env.BASE_URL`; do not copy it into your route. `index.md:343`: one added sentence. On the aggregator the path is `import.meta.env.BASE_URL + 'basis/'`, not `'/basis/'`, so it still resolves under a subfolder. `index.md:513` (lab step 3, formerly L508): transcoder copy dropped; "Reference your `.ktx2` from your route the way `_template` references its picture", plus that the aggregator already has one shared copy. Fork instructions and the Excerpt code are unchanged. | Built page: `BASE_URL` 2 hits. The fences are byte-identical to the source (below). **Note for X11 step 7:** it cites "L314 / L508". L314 is still step 2, but L508 is now **L513**. I did not edit PHASE-X11.md (pack file). |
| **F3** (P2) wrong reason against `1.0 - vUv.y` | `index.md:367`: "…flips the PNG path too, **leaves every other material that reads the same file upside down**, and leaves the file wrong for the next person." | Exact reviewer text. Built page: 1 hit. |
| **F4** (P2) `--convert_oetf` warning too broad | `index.md:377`: convert "trusts whatever tag the file carries, even a wrong one". On a correctly tagged or untagged PNG it changes nothing. On a file tagged linear it rewrites the pixels and brightens them for good. On a file with a colour profile, toktx refuses to run. "`--assign_oetf srgb` was right in every case this page tested." | Matches S1 table rows a/b (no-op), c (242,173,115 / 240,174,116 decoded), and f/g (convert exit 1). `exercises.md` item 4 ("the one tempting flag that would make the pixels themselves brighter for good") is set on a linear-tagged file, so it stays consistent. No change there. |
| **F5** (P2) placeholder provenance | `index.md:385`: "a 512 × 512 PNG drawn to match the cover-shaders placeholder … It was not exported from the canvas, so your file bytes will differ; the GPU bytes will not." `index.md:361`: how to save the canvas ("right-click the canvas in the browser and save the image, or use `canvas.toBlob`"). | Matches the report's source-image provenance (SVG twin, rsvg-convert + magick, 20,245 B). L426 "the same 512 × 512 PNG" now refers back to the corrected description. |
| **F6** (P2) no KTX-Software pin | `index.md:355`: new pin row: KTX-Software (`toktx`, `ktx`) · `4.4.2` · "Flags checked 2026-11-04; `toktx --help` is the authority. Not required on every laptop: the aggregator's encode script runs it." `index.md:347`: the table caption now separates the npm packages (react-template) from the date check, because KTX-Software is not an npm package. | The internal decision ID (D9) is deliberately not on the student page. |
| **F7** (P2) phone/editor photos with a colour profile | `index.md:379`: new "Phone and editor photos" paragraph. It glosses **colour profile**. If the PNG carries a profile other than sRGB (phone photos often carry Display P3), convert to sRGB in an image editor first, then encode with `--assign_oetf srgb`. The flag only relabels, so an unconverted P3 photo comes out muted and the `colorSpace` check still logs `srgb`. | S1 rows f/g, plus the reviewer's `magick … -profile` result (P3 227,106,44 = sRGB 244,96,4). This agrees with the spine §6 amendment. |
| **F8** (P2) §5 generalises a renderer-specific result | `index.md:182`: "…far less room on the GPU **of that test renderer**…". Provenance: this is the s5 paragraph (operator-written), so I appended to the record without rewriting history: `~/src/deviac/fine-tuning/thessia-tuning-memory/2026-11-04-6fe81dda-6c50-44f0-b914-0a542908a810-feii-ktx2-basis-s5/integrated-triage-1.md` (the published paragraph plus a triage note) and `amendments-triage-1.diff` (`diff -u operator-written.md integrated-triage-1.md`, one-line change). `operator-written.md` and `provenance.json` are untouched. The gated `tuning_record` comment at `index.md:186` now points to both files. | Published paragraph is a substring of `integrated-triage-1.md`. Built page: "test renderer" 1 hit, and `triage`/`tuning_record` 0 hits. The warning at L437 ("far less room on the GPU") is left as is: it sits in the SwiftShader-labelled table section, and L439 states that the format and room depend on the device. |
| **F9** (P0 for X10) X10 colour flag | **No lesson change. Orchestrator pack amendments, already in the uncommitted diff, not mine:** `PHASE-X10.md` step 3 (assign, never convert; `--zcmp 18` for UASTC only; one shared transcoder at root `public/basis/` via `import.meta.env.BASE_URL + 'basis/'`; ESM / Vitest); `PHASE-X10.exit-gate.sh` (assign required, convert refused, L16–17); `KTX2-FIRST-PRINCIPLES.md` §6 ("Two encode facts" paragraph); `PHASE-X11.md` step 7 (re-check L314/L508 against the built aggregator); pointers in `PHASE-X7-COLD-REVIEW.md` G6 and `PHASE-X7-REPORT.md` ("superseded by PHASE-X8-COLD-REVIEW.md S1"). | `git diff --stat` on the pack: 6 files, +20/−3. Verified the presence of assign (3 hits in X10.md), `zcmp 18`, `BASE_URL`, Vitest, gate L16–17, and both X7 pointers. |
| **S1 / S2 / S3** downstream | Same as F9: the orchestrator's pack amendments (X10 step 3 text, X10 gate lines, spine §6, X11 step 7, X7 pointers). The lesson already taught assign + `--zcmp 18` (S1/S2); the only S3/F2 lesson effect is the `BASE_URL` sentence at L343. | — |

### Verification (re-run after the last edit)

```text
$ cd web-foundations && npm run build > t1-build.log 2>&1; echo build_exit=$?
build_exit=0
$ grep -c "Liquid Warning" t1-build.log
0
(tail) Citation conformance passed for canonical lessons.   (verify:publication passed too)

texel before brand (gate semantics, my script): texel pos 400, first brand 14923 → ok
built <pre><code> vs source fences: 7 / 7 IDENTICAL   (no fence was edited this round)
ktx2-note Template, lesson vs assignment: identical = True   (Template unchanged → assignment not touched)
built ktx2-basis page: ahmes|deviac|evaluator_safe|BIBLIO-GAP|tuning_record|thessia|curriculum-internal|triage → 0
                       X10|X8|PHASE|/Users/|scratchpad|UNVERIFIED → 0
internal hrefs in built page: all resolve under _site
git diff --check → ok
```

No code changed, so no esbuild re-bundle was needed (the 7 fences are byte-identical to before this round).

### Not closed / for the cold reviewer

- PHASE-X11.md step 7 still cites "L508". The lab step is now L513 (pack file; the orchestrator should amend it if wanted).
- F1 glosses rest on my wording. "Linear … numbers that rise in step with the amount of light" is a plain-words simplification and has had no professor review.
- The F2 wording asserts X10's future layout ("instructor vendors one shared copy at the site root", path from `BASE_URL`). That is true of PHASE-X10.md as amended, but X10 has not run yet. X11 step 7 is the check.
- The s1/s3/s5 operator prose still needs professor release, and its exclusion from training batches is still pending (cold review check 8, conditions 1–2). Triage did not change that.

**Resume point:** harness `verify PHASE-X8.md` (exit gate), then a cold re-review of this triage round.


## Orchestrator triage (DONE decision)

| Finding | Sev | Outcome |
| --- | --- | --- |
| F1 colour words undefined | P1 | Closed: "Four colour words first" (L373); round 2 confirmed |
| F2 per-route transcoder cannot work | P1 | Closed in the lesson; X10 vendors one copy at root `public/basis/` with a `BASE_URL` path; X11 re-checks |
| F3–F8 | P2 | Closed |
| F9 X10 used `--convert_oetf` | P0 for X10 | PHASE-X10 step 3, gate, spine §6 amended with the reviewer's verbatim text; X7 G6 superseded (pointers added) |
| S2 `--zcmp` UASTC only | ruling | In PHASE-X10 |
| S3 ESM only, always `setTranscoderPath` | ruling | In PHASE-X10 |
| G1 gate refused array-style args | P1 for X10 | Gate lines replaced with the reviewer's tested regexes; re-tested on sample scripts |
| G2 weak transcoder checks | P2 | Pair required, per-route copies refused, `BASE_URL…basis` required, root-absolute path refused |
| G3 `ru` is not proof of a flip with `ktx create` | P2 | X10 step 3 sentence added |
| G4, G5 lesson wording | P2 | Deferred to X11 (step 8) |
| G6 spine missing P3 caveat | P2 | Added to spine §6 |
| G7 record slips | P2 | Double period fixed; X7 pointers corrected (convert is a no-op on clean files); the s5 diff-reproducibility slip is noted here, not rewritten |
| G8 training hygiene + professor release | P2 | Recorded in MERGE-CHECKLIST |
