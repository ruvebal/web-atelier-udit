# PHASE-X8 cold review — KTX2 satellite lesson (first principles)

**Reviewer:** cascade-cold-reviewer (fresh session; did not implement X8; implementer report treated as claims only)
**Date:** 2026-11-04
**Worktree:** `web-atelier-udit-album-FEII-3D-ALBUM-KTX-8`, base `26a24ba` (X7 merge), changes uncommitted
**Inputs read:** PHASE-X8.md (incl. amended step 5), KTX2-FIRST-PRINCIPLES.md, DECISIONS D3/D9/D22, FINDINGS F14/F16, cascade constraints, `git diff` + status, PHASE-X8-VERIFY-LOG.md, PHASE-X8-REPORT.md, six lesson-scribe records, CLAUDE.md, `lesson-publishing-integrity.mdc`, `fe-unit-forge.mdc` B3, `lesson-scribe/SKILL.md`, PHASE-X7-COLD-REVIEW G6, PHASE-X10.md + gate.
**Scratch:** `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/x8cr/` (`s1/` colour-tag matrix, `s2/` zstd sizes, `b6/` bundle + gpuBytes tests, `vite/` transcoder-path test). Nothing committed. No binaries left in the repo.

**Verdict: NOT READY for DONE — 2 blocking findings (F1, F2), both P1 with short text fixes.** On S1 the implementer is right and the X10 amendment is wrong: `--assign_oetf srgb` is correct for every case I tested, and `--convert_oetf srgb` either does nothing, bakes in wrong brightness, or makes toktx refuse to run. PHASE-X10.md must be amended before X10 opens (see the S1 ruling).

---

## Re-run evidence

```text
$ cd web-foundations && npm run build > build.log 2>&1; echo build_exit=$?
build_exit=0
$ grep -c "Liquid Warning" build.log
0
(tail) Citation conformance passed for canonical lessons.

$ bash frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X8.exit-gate.sh; echo gate_exit=$?
texel before brand names: ok
build ok (/var/folders/.../feii-album-ktx-gates/x8-build.log)
OK PHASE-X8.exit-gate.sh
gate_exit=0

$ git diff --check && echo diffcheck-ok
diffcheck-ok
```

The verify log (exit 0, commit 26a24ba) matches what I re-ran. Pre-existing suite: web-foundations has no test runner. `build` runs `verify:publication` + `verify:citations`, and both passed. `npm run validate:lessons` cannot run (`sh: yaml-lint: command not found`; pre-existing tool gap). Ruby `YAML.load_file` parses `lessons.yml`, and the `feii-ktx2-basis` row appears once with `status: {en: complete}`.

## Acceptance checklist (checked against evidence, not the report)

| Item | Evidence | Result |
| --- | --- | --- |
| pixel, UV, texel, texture defined before KTX2/ETC1S/UASTC | Gate python check passes. My own check on the **built** page text: first `texel` at char 784 (studio test, glossed inline); the only brand hits before it are the page title, the breadcrumb and the site header, which the gate exempts by design. ETC1S/UASTC/transcode before texel: 0. §1 table (L87–92) comes before §4 (L158), where the brands first appear. | PASS |
| file packing vs GPU-resident packing; no lone "compressed" | §3 L139–156: table + "you say file packing or GPU-resident packing, never just 'compressed'". | PASS |
| ETC1S and UASTC as separate terms; no "just use KTX2" | §4 table L168–174; failure mode L488; §5 list. | PASS |
| Studio test / oral paragraph (spine §9) | Framing aside L17; "Say it out loud" L478–482 (spine §9 verbatim). | PASS |
| No `tao-development-quote`, no `arch-`/`qa-`/`dop-` IDs | `rg` on the source: 0. The built HTML has one `tao-development-quote` hit at L1015: inert site-wide layout JS from `docs/_layouts/lesson.html`, present on 16 FE II pages, not page content. | PASS |
| ktx2-note Template asks for mode, why, licence, file bytes, GPU bytes (computed), orientation, colorSpace | L451–472 has all seven, plus machine/date, levels counted, `texture.format` and the count labelled as a count. Delivered as a labelled Template fence; the student creates the file. I accept that reading: a raw `.md` beside the page would be served unrendered. | PASS |
| `memory.textures` taught as a count, never memory | L130, L196, L468, L490, exercise 3; diagram L126–127. No sentence calls it memory. | PASS |
| No coat/node/Ahmes strings in normal build | `rg -i 'ahmes|deviac|evaluator_safe|BIBLIO-GAP|tuning_record|thessia|curriculum-internal'` and `rg -i 'coat|e2e9b45c|348bd016|92a534c1|UNVERIFIED|STEP A|scratchpad|/Users/'` on the built ktx2-basis, assignment and U9 pages, and on the published `exercises.md`/`deck-outline.md`: 0 hits each. | PASS |
| lessons.yml row; index links resolve in `_site` | Row present once. `href="/web-atelier-udit/lessons/en/feii/ktx2-basis/"` on the feii index, the en index and U8. Internal links in the page body: ktx2-basis 6, assignment 6, U9 7. All carry the baseurl and all resolve on disk. | PASS |
| Build exit 0; no Liquid Warning | See above. | PASS |
| Cold review filed; blocking Fn closed | This file; F1 and F2 are open. | OPEN |

## Code honesty (check 6)

```text
$ esbuild src/entry.js --bundle --format=esm   (gpuBytes.js + KTX2 sleevePicture.js, react-template node_modules)
esm_exit=0
$ node test.mjs   (three 0.185.1)
png 512² all 1398100 (10 levels), level0 1048576; 2048² all 22369620, l0 16777216
1024×512 all 2796204 (11 levels); generateMipmaps=false → 1048576
CompressedTexture RGB_ETC2 512², 10 levels → 174776, l0 131072
duplicate *Format values in THREE namespace: []
getByteLength(512,512,RGBA,UByte)=1048576; (RGB_ETC2)=131072
built <pre><code> vs source fences: 7/7 IDENTICAL
```

- `gpuBytes.js` is correct against three 0.185.1. In `WebGLTextures.js`, `textureNeedsGenerateMipmaps` returns `texture.generateMipmaps` alone (L108–110), and `getMipLevels` uses `log2(max(w,h)) + 1` (L296–300), which matches the floor-halving loop. It passes width, height, format and type to `getByteLength` in that order. The compressed branch sums `mipmaps[i].data.byteLength`, which is also right for the RGBA32 fallback (still a `CompressedTexture`). `formatName` cannot be ambiguous because no two `*Format` constants share a value. The exercise and self-check answers in the gated sketch (22,369,620 and 2,796,204) match my run.
- KTX2Loader Excerpt facts, checked against source:
  - `setTranscoderPath` → `init()` loads `basis_transcoder.js`/`.wasm` from that path (L294–308).
  - The default path is `new URL('../libs/basis/…', import.meta.url)` at module load (L106–107).
  - `_createTextureFrom` sets `generateMipmaps=false`, `colorSpace = parseColorSpace(container)` (SRGB transfer → `SRGBColorSpace`, else Linear; L1251–1257), and builds `new CompressedTexture` (`flipY = false`, `CompressedTexture.js:67`).
  - `KTXorientation` appears 0 times in `KTX2Loader.js`.
  - The transcoder files ship in `examples/jsm/libs/basis/` (57,529 + 527,333 bytes).
  - Drei 10.7.9 `core/Ktx2.js` imports `KTX2Loader` from `three-stdlib` and defaults `basisPath` to `https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/`.
  - Fiber 9.8.2 `loadingFn` memoises one loader per class in a WeakMap.

  All lesson claims hold.
- Labels: `<img>` (Excerpt), diagram (Excerpt), `gpuBytes.js` (CodeSandbox-ready: a complete module, the same standard as `services/` in CLAUDE.md), Cover.jsx lines (Excerpt), KTX2 hook (Excerpt; needs files only the student can supply, and says so), encode commands (Template; says what to replace), note (Template). All honest. The `{% raw %}` wrap is present on the one fence with `{{ }}`.
- I did **not** re-render in a browser. The orientation and colour claims rest on three source plus my own encode/extract pixel matrix (S1 below), which reproduces the implementer's colour numbers within ETC1S loss.

## Assignment / U9 / exercises (check 7)

- The ktx2-note Templates in the lesson and the assignment are **byte-identical** (`python: 1 1 True`). The assignment hand-in bullet names same-levels, `texture.format` and both checks.
- U9 Session outcome gains one `relative_url` link to the satellite; the built U9 page links it.
- `exercises.md` meets B3 (`fe-unit-forge.mdc` L146): 5 individual, decontextualised problems; 2 declared solvable without AI; 2 diagnostics (washed-out sleeve, count misreport); professor sketch gated in the lesson. Exercise 4's "one encode flag that fixes it" (assign) agrees with the S1 ruling. `exercises.md` and `deck-outline.md` are published raw beside the page, the same as the cover-shaders and unit-5/6 precedent.

## Thessia provenance (check 8)

Six records exist with the files the report lists. For every record, the published paragraph is a substring of `integrated.md` (s0, s2, s4) or `operator-written.md` (s1, s3, s5) (`in page: True` ×6). Each rejected record's `provenance.json` reads `"integrated_author": "Claude executor (cascade-phase-executor, PHASE-X8) — operator-written replacement; no Thessia text"` and `independent_human_review: false`.

**Ruling: acceptable.** `lesson-scribe/SKILL.md` sets no attempt count. Regeneration is mandatory only for CI3 and quote-gate FAILs (§5), and the editorial path is "amended, not deleted" (§4). These rejections were editorial: fabricated measurements, false UV orientation, word salad. All raws are retained.

Two conditions:
1. Professor release of the three executor-written paragraphs before any push. MERGE-CHECKLIST already carries this.
2. The s1/s3/s5 records must be excluded from (or flagged in) any thessia-v4 training batch as "not human-editorial". The skill's "operator retains authorship" assumes a human operator.

Two attempts rather than X7's four is not a defect, because the reasons for rejection were substantive.

## Measurements on the student page (check 5)

**Ruling: acceptable as published; F5 tightens one sentence of provenance.**

- The page labels the image (512², flat colours), the encoder (toktx v4.4.2), the loader (three 0.185.1), the renderer (headless Chrome, SwiftShader, "not a GPU") and the level basis, and it states "for the placeholder only … you must measure your own" (L421, L433, L443).
- GPU bytes depend on dimensions and the transcoded `texture.format` only, so SwiftShader produces the same number a real GPU would for the same format. The page says the format belongs to the device (L434).
- These are measured, not invented. No percentage or ratio is claimed for packed formats; the only multiplier is the documented mipmap × 4/3. The real-sleeve pair is explicitly deferred to the reference repo (L206), which is what PHASE-X8 step 4 asks for.
- F5 and F8 cover the two sentences that overreach.

---

## Findings

### F1 — Colour words used without a gloss: "sRGB", "linear", "transfer", "colour space" (P1, **blocks DONE**)

D22 binds the page to "Define every graphics word before use", and the X8 Goal is "a reader who has never heard texel". Trap 2 and the Template are graded rows of the ktx2-note (`colorSpace check`), yet the page never says what sRGB or linear means.

Evidence:

```text
$ rg -n "sRGB|srgb-linear|transfer" ktx2-basis/index.md   (prose lines only)
372  … `colorSpace = SRGBColorSpace` … must read 'srgb' … loader reports 'srgb-linear' …
374  Re-encode with an sRGB transfer. `--assign_oetf srgb` … relabels the pixels as the screen colours …
398  # ETC1S: smaller, lossier. Flipped for three.js, sRGB, with mipmaps.
```

The first appearance is L372. "Before you start" (L32) restates only renderer.info and UV. The colour idea lives in cover-shaders L134, but this page does not restate it, so a reader who skipped that satellite cannot follow L372–376.

**Fix (one short paragraph at the top of Trap 2):** "A picture file stores **screen colours**: numbers already bent to look right on a monitor. That encoding is called **sRGB**. A shader does its maths on **linear** numbers, proportional to light. The file carries a tag (its *transfer*) saying which kind of numbers it holds, and three.js copies that tag into `texture.colorSpace` so the GPU can convert on lookup. A sleeve photo always holds screen colours, so the tag must say sRGB." Also gloss "OETF" once when the flag first appears ("the flag's name for that tag").

### F2 — Aggregator instruction: copying the transcoder "into your route" cannot work with `setTranscoderPath('/basis/')` (P1, **blocks DONE**)

The lesson says, at L314, "Copy both into `public/basis/` (on the aggregator, your route's own `public/basis/`)". The lab mapping step 3 (L508) says "Copy the transcoder files into your route". The Excerpt hard-codes `TRANSCODER_PATH = '/basis/'`.

Vite serves only the root `public/`. A route-local file referenced through `import.meta.url`, which is how X9 tells routes to reference their assets (PHASE-X9 L45–46), gets a **hashed** name. `KTX2Loader` then asks for the fixed names `basis_transcoder.js`/`.wasm` under one directory, and they are not there.

Evidence (Vite from react-template, scratch `vite/`):

```text
covers/demo/public/basis/basis_transcoder.{js,wasm} referenced via new URL('../public/basis/…', import.meta.url)
$ vite build → vite_exit=0
dist/assets/basis_transcoder-VXdx5NbI.wasm
dist/assets/basis_transcoder-o4Hde_L7.js        ← hashed, different names; no dist/basis/ directory
```

A per-route copy also duplicates 585 KB per student.

**Fix (lesson, now):**
- L314: "(on the aggregator, one shared copy is vendored at the site root for every route — do not copy it into your route)".
- L508 step 3: drop the transcoder copy and say "reference your `.ktx2` from your route the way `_template` references its picture".
- Keep the fork instructions as they are; they are right for the fork.

**Fix (cascade):** PHASE-X10 must vendor the transcoder once at the aggregator's root `public/basis/` and build the path from `import.meta.env.BASE_URL + 'basis/'`. A bare `'/basis/'` breaks under a GitHub Pages repo subpath. X11 should re-check L314/L508 against the built aggregator.

### F3 — Trap 1 gives a wrong reason against the shader fix (P2, non-blocking)

L366: "Do not 'fix' it with `1.0 - vUv.y` in the shader. That flips the PNG path too, flips every other material that reads the picture, …". Editing SleeveMaterial's shader changes only that material. The real problem is the reverse: every *other* material reading the same file stays upside down. The professor sketch (L564) has it right.

**Fix:** "… That flips the PNG path too, leaves every other material that reads the same file upside down, and leaves the file wrong for the next person."

### F4 — The `--convert_oetf` warning is broader than what was measured (P2, non-blocking)

L374: "do not reach for `--convert_oetf srgb` on a sleeve photo. It does not relabel. It rewrites the pixels as if they had been linear". My matrix (S1) shows `convert` is a **no-op** on a correctly tagged or untagged PNG (227,106,44 → 227,106,44). It rewrites pixels only when the tag says something other than sRGB, and it **refuses** ICC-tagged files.

**Fix:** "… `--convert_oetf srgb` trusts the wrong tag: on a file tagged linear it rewrites the pixels as if they had been linear and brightens them for good, and on a file with a colour profile toktx refuses to run. `--assign_oetf srgb` is right in every case this page tested."

### F5 — Provenance of the placeholder PNG is misstated (P2, non-blocking)

L380 says "the placeholder picture … saved as a PNG", and L421 says "the same 512 × 512 PNG". Per the report, the PNG was an **SVG twin** rendered with `rsvg-convert` and stripped with `magick` (20,245 bytes). It was not exported from the cover-shaders canvas. A student who saves their canvas will get different file bytes and may think they did something wrong. L360 also says "Save the canvas as a PNG" with no instruction for how.

**Fix:**
- L380: "a 512 × 512 PNG drawn to match the cover-shaders placeholder (not exported from the canvas, so your file bytes will differ; GPU bytes will not)".
- L360: add one line, e.g. "right-click the canvas in the browser and save it, or `canvas.toBlob`".

### F6 — No toktx/KTX-Software row in the pin table (P2, non-blocking)

`lesson-publishing-integrity.mdc` §8 requires a version and check date for every named dependency, in a table. The Template depends on toktx v4.4.2 flag spellings (`--encode`, `--assign_oetf`, `--zcmp`; `ktx create --assign-tf`). The version appears only in prose (L380); the pin table (L349–354) lists three/fiber/drei/react.

**Fix:** add a row: `KTX-Software (toktx, ktx)` | `4.4.2` | "Flags checked 2026-11-04; `toktx --help` is the authority; not required on every laptop (D9)."

### F7 — Phone and editor photos with a colour profile are not covered (P2, non-blocking)

The assignment's source is "a photograph of a physical album you own". Such PNGs often carry an ICC profile. Measured:
- Without `--assign_oetf`, toktx **refuses** them.
- With it, toktx relabels the pixels without converting them. For a Display P3 picture this mutes the colours: P3 (227,106,44) is sRGB (244,96,4).
- The runtime `colorSpace` check still logs `srgb`, so it cannot catch this.

Evidence: S1 rows f/g, plus `magick g-iccp-p3.png -profile "sRGB Profile.icc"` → `(244,96,4)`.

**Fix:** one sentence in Trap 2: "If your PNG carries a colour profile other than sRGB (phone photos often do), convert it to sRGB in your image editor before encoding; the encode flag only relabels."

### F8 — §5 paragraph generalises a renderer-specific result (P2, non-blocking)

L182: "On the placeholder sleeve the UASTC file came out slightly larger on disk than the PNG while taking far less room on the GPU." This holds where UASTC transcodes to ASTC or BC7. On a GPU with neither, three's target table falls back to `RGBA32` (`KTX2Loader.js` L864–872), and the room equals the PNG's. L434 says this further down, but the §5 sentence is read first.

**Fix:** "… far less room on the GPU of that test renderer".

### F9 — Cascade amendment required: PHASE-X10.md prescribes the wrong colour flag (P0 for X10; does not block X8)

PHASE-X10.md L44–45: "set sRGB transfer explicitly (`--convert_oetf srgb`, the flag toktx help recommends; `--assign_oetf` is 'use with caution'; `ktx create` equivalent `--convert-tf srgb`)".

That is wrong on three counts:
- toktx help does not recommend convert.
- On an ICC-tagged student PNG, `--convert_oetf` makes `encode-cover.mjs` exit 1 (toktx refuses).
- On a mis-tagged PNG it bakes in a brightness shift that the runtime `colorSpace === SRGBColorSpace` check cannot see.

See the S1 ruling for evidence and exact replacement text. X7 cold review G6 is superseded. The **same commit as this review** must amend PHASE-X10.md, PHASE-X10.exit-gate.sh and the spine, per "amend on surprise".

---

## S1 ruling — `--assign_oetf srgb` vs `--convert_oetf srgb`

**Ruling: assign. The implementer is right; the orchestrator's X10 amendment (from X7 G6) is wrong.**

G6 read the help text and tested only an untagged PNG, where both flags do nothing, so it never ran the case that tells them apart. "USE WITH CAUTION … only when you know the file format information is wrong" describes our situation exactly. An 8-bit sleeve picture from a camera, an editor or a canvas holds screen (sRGB-encoded) colours by construction, so any other tag on it *is* wrong information.

Reproduction: original 64×64 PNGs written byte by byte (`tools/mkpng.py`): orange (227,106,44) and grey (128,128,128) quadrants, plus navy and cream. Encoded with no `--encode` (uncompressed, so pixel values are exact), extracted with `ktx extract`, and sampled with `magick … txt:`. toktx/ktx v4.4.2.

| Source PNG tag | toktx default | `--assign_oetf srgb` | `--convert_oetf srgb` |
| --- | --- | --- | --- |
| a. `sRGB` chunk (correct) | SRGB · 227,106,44 · 128 | SRGB · 227,106,44 · 128 | SRGB · 227,106,44 · 128 |
| b. untagged | SRGB · 227,106,44 · 128 | SRGB · 227,106,44 · 128 | SRGB · 227,106,44 · 128 |
| c. `gAMA` 1.0 (**wrong**, says linear) | **LINEAR** (UNORM) · 227,106,44 → loads `srgb-linear`, washed out | SRGB · **227,106,44** | SRGB · **242,173,115** (baked brightening, grey 128→188) |
| d. `gAMA` 0.45455 only | SRGB · 228,106,40 ("Converting gamma 2.2f to sRGB. Use --assign-oetf srgb to force…") | SRGB · 227,106,44 | SRGB · 228,106,40 (same warning) |
| e. `gAMA` 0.5 | **exit 1** ("not automatically supported … Specify handling with --convert_oetf or --assign_oetf") | SRGB · 227,106,44 | SRGB · 230,115,48 |
| f. `iCCP` sRGB profile | **exit 1** ("It has an ICC profile. These are not supported. Use --assign_oetf…") | SRGB · 227,106,44 | **exit 1** |
| g. `iCCP` Display P3 | **exit 1** | SRGB · 227,106,44 (relabel; muted vs intended sRGB 244,96,4) | **exit 1** |

`ktx create --format R8G8B8A8_SRGB` (the alternative tool the lesson names), on b/c/d/g:
- With **no flag** it already behaves like convert. On c it silently gives 242,173,115, with **no warning**.
- `--assign-tf srgb` gives 227,106,44 in every case.
- `--convert-tf srgb` gives 242,173,115 on c and fatal exit 3 on g.

Which flag, case by case:
- **Correctly tagged sRGB:** none is needed, and all three give identical output. Pass `--assign_oetf srgb` anyway, so the script is explicit and safe.
- **Untagged:** none is needed (toktx defaults to sRGB; `ktx create` warns "defaulting to KHR_DF_TRANSFER_SRGB. Use --assign-tf to override"). Pass assign anyway.
- **Wrongly tagged linear:** **assign** is the only correct flag. The default gives a washed-out sleeve, which the runtime check catches. Convert bakes the error into the file, and the runtime check *passes*.
- **Gamma 2.2 or other gAMA:** **assign**; toktx's own warning recommends it.
- **ICC profile:** **assign** is the only flag that runs at all. For a non-sRGB profile (P3), convert the picture to sRGB in an editor first, then encode with assign.

**Text PHASE-X10.md step 3 should carry** (replacing L44–45 from "and set sRGB transfer explicitly" through "`--convert-tf srgb`)"):

> and set the sRGB transfer with `--assign_oetf srgb` (`ktx create`: `--assign-tf srgb`). Do **not** use `--convert_oetf` / `--convert-tf`, and do not rely on `ktx create`'s default. Measured 2026-11-04 (X8 cold review S1, toktx 4.4.2): on a sleeve PNG mis-tagged gAMA 1.0, convert bakes in a brightening (227,106,44 → 242,173,115) that the runtime `colorSpace` check cannot see; on any PNG with an ICC profile, toktx without `--assign_oetf` exits 1. A sleeve picture always holds screen colours, so assign is the correct relabel (this supersedes X7 cold review G6). If the source carries a non-sRGB ICC profile (e.g. Display P3), `encode-cover.mjs` should say so loudly: convert it to sRGB in an editor first. After encoding, `ktx info` must show `KHR_DF_TRANSFER_SRGB` and `KTXorientation: ru`; the script fails otherwise. `_studio` additionally compares a sampled sleeve colour between the PNG and KTX2 variants, because `colorSpace === SRGBColorSpace` alone cannot detect a baked conversion.

**PHASE-X10.exit-gate.sh** should add:

```bash
rg -q -- "--assign_oetf srgb|--assign-tf srgb" "$ROOT/scripts/encode-cover.mjs" || { echo "REFUSED: encode-cover.mjs must assign sRGB (X8 cold review S1)" >&2; exit 1; }
if rg -q -- "--convert_oetf|--convert-tf" "$ROOT/scripts/encode-cover.mjs"; then echo "REFUSED: --convert_oetf rewrites sleeve pixels (X8 cold review S1)" >&2; exit 1; fi
```

**KTX2-FIRST-PRINCIPLES.md** should carry (new paragraph at the end of §6, before "That switch is the rehearsal"):

> Two encode facts the switch depends on (checked 2026-11-04, toktx 4.4.2, three 0.185.1). Encode flipped (`--lower_left_maps_to_s0t0`), because three does not flip a packed picture on upload. Label the picture as screen colours with `--assign_oetf srgb`, never `--convert_oetf`: a sleeve picture always holds screen colours, so a file tagged anything else is mislabelled, and convert would trust the wrong label and rewrite the pixels (227,106,44 → 242,173,115 measured), while toktx refuses ICC-tagged files without assign. After loading, `texture.colorSpace` must read `'srgb'`; that check catches a missing label, not a baked conversion, so also look at the sleeve beside the PNG.

---

## S2 ruling — UASTC without `--zcmp`

**Ruling: yes, X10 passes `--zcmp` for UASTC, and never for ETC1S.**

```text
toktx --help: "You are strongly encouraged to also specify --zcmp to losslessly compress the UASTC data."
              "--zcmp … Can be used with data in any format except ETC1S / BasisLZ."
$ toktx --t2 --encode etc1s --zcmp 18 … → rc=1 "Only one of '--encode etc1s | --bcmp' and --zcmp can be specified."
original 512² flat sleeve (scratch s2/flat.png, 13,112 B):
  etc1s 6,528 · uastc 350,032 · uastc --zcmp 17,838 (level 3) · uastc --zcmp 18 16,988 · +rdo 16,465
noisy 512² image (s2/photoish.png, 1,620,345 B):
  etc1s 54,714 · uastc 350,032 · uastc --zcmp 18 336,431
```

Without zstd, UASTC on disk is a fixed ≈ 1 byte/texel × 4/3 (350,032 B for 512² with mipmaps), whatever the content. The "≈17× the PNG" is an artefact of a flat placeholder. For a noisy picture the raw UASTC is *smaller* than the PNG, and zstd gains little.

**Text PHASE-X10.md step 3 should carry:**

> UASTC: `toktx --t2 --encode uastc --zcmp 18 --genmipmap --lower_left_maps_to_s0t0 --assign_oetf srgb` (toktx help strongly encourages `--zcmp` for UASTC; without it a 512² UASTC file is ≈350 KB whatever the picture). ETC1S: the same flags **without** `--zcmp` (toktx rejects it; ETC1S is already supercompressed). Record measured file bytes; do not quote a PNG-to-UASTC ratio from the placeholder.

The lesson already teaches exactly this (L402–415). No lesson change.

## S3 ruling — KTX2Loader's default transcoder URL at module load

**Ruling: no code requirement beyond what X10 already does; add one sentence.**

L106–107 evaluate `new URL('../libs/basis/…', import.meta.url)` when the module is imported. Under any ESM bundler this is valid and does not throw, even when the URL is never fetched. Only IIFE/CJS bundles crash: the report's `TypeError: Failed to construct 'URL'`, or Jest-with-CJS on `import.meta` syntax.

Evidence (scratch `vite/`): a Vite ESM build of `import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js'` plus `setTranscoderPath(import.meta.env.BASE_URL + 'basis/')` gave `vite_exit=0`. As a side effect, Vite emitted three's own transcoder pair as hashed assets (`dist/assets/basis_transcoder-*.{js,wasm}`, 57,529 + 527,333 B), which are unused when the path is set.

**Text PHASE-X10.md step 3 should carry:**

> Always call `setTranscoderPath(import.meta.env.BASE_URL + 'basis/')` on the shared loader, pointing at the one vendored copy in the aggregator's root `public/basis/` (X8 cold review F2). Keep every bundle ESM (Vite's default); importing `KTX2Loader` into an IIFE/CJS bundle or a CJS test runner throws at module load (X8 report S3). If tests import the loader, use an ESM runner (Vitest). Vite also emits an unused hashed copy of the transcoder from three's default path; that is expected, not a second vendoring.

---

## Downstream amendments (amend in the same commit as this review)

| File | Change | Source |
| --- | --- | --- |
| PHASE-X10.md step 3 | Replace the convert text with the S1 text; add the S2 and S3 sentences; the transcoder lives once at the root `public/basis/` with a `BASE_URL` path | S1, S2, S3, F2, F9 |
| PHASE-X10.exit-gate.sh | Two `rg` lines: assign required, convert refused | S1 |
| KTX2-FIRST-PRINCIPLES.md §6 | The encode-facts paragraph above | S1 |
| PHASE-X11.md | Re-check ktx2-basis L314/L508 against the built aggregator's `_template` and transcoder location | F2 |
| PHASE-X7-COLD-REVIEW.md G6 | Add a pointer: "superseded by X8 cold review S1" (do not rewrite the record) | S1 |

## Not done by this reviewer

- No lesson or pack edits, no commit, no DONE flip, no push.
- No browser render (SwiftShader or GPU). Orientation and colour are verified by three source plus `ktx extract` pixel values, not by a rendered frame.
- Vite **dev-server** behaviour of three's default transcoder path is not tested (only `vite build`).
- The Angel and Shreiner node pages were not re-opened. That citation was verified in X3 and reused in X7, and the paraphrase stays within "concepts outlast APIs".

---

## Round 2

**Reviewer:** cascade-cold-reviewer (fresh session; did not implement X8, its triage, or the orchestrator's pack amendments; the triage table in PHASE-X8-REPORT.md is treated as claims only)
**Date:** 2026-11-04
**Inputs:** PHASE-X8.md, round 1 above, PHASE-X8-REPORT.md "Triage round 1", `git diff` (10 tracked files, all uncommitted, plus 5 untracked), PHASE-X8-VERIFY-LOG.md, KTX2-FIRST-PRINCIPLES.md, DECISIONS D22, gate-lib.sh, MERGE-CHECKLIST.md, the s5 lesson-scribe record. Tools: toktx/ktx 4.4.2, ImageMagick.
**Scratch:** `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/r2/` (`gate/` sample encode scripts for the X10 regexes, `*.ktx2` encodes). No binaries in the repo. Nothing committed.

**Verdict: READY for DONE on the X8 deliverables. 0 findings block X8 DONE.** F1–F8 are closed. One finding, G1 (P1 for X10), is a defect in the orchestrator's new X10 gate lines: they refuse a correct `encode-cover.mjs` written in the normal Node argument-array style. Like round-1 F9, G1 does not block X8, but it must be fixed in the X8 commit, before X10 opens. Everything else is P2.

### Re-run evidence (round 2)

```text
$ cd web-foundations && npm run build > r2/build.log 2>&1; echo build_exit=$?
build_exit=0
$ grep -c "Liquid Warning" r2/build.log
0
(tail) Citation conformance passed for canonical lessons.

$ bash frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X8.exit-gate.sh; echo gate_exit=$?
texel before brand names: ok
build ok (.../feii-album-ktx-gates/x8-build.log)
OK PHASE-X8.exit-gate.sh
gate_exit=0

$ bash -n PHASE-X10.exit-gate.sh && echo syntax-ok
syntax-ok
$ git diff --check && echo diffcheck-ok
diffcheck-ok
```

The harness verify log (exit 0, 26a24ba) matches what I re-ran.

**Regression checks on the built site** (python over `_site`):

| Check | Result |
| --- | --- |
| Texel before brand names, built `<main>` text | `texel` at char 1507. The only earlier brand hits are `KTX2` at 23 and `Basis` at 28, both in the page H1 "KTX2/Basis — Texture Choice…", which the gate exempts by design. ETC1S 13829, UASTC 13873, transcod 14909. PASS |
| Built `<pre><code>` == source fences | `fences 7 codes 7 identical 7` PASS |
| ktx2-note Template, lesson vs assignment | `note lesson True assign True identical True` PASS |
| Internal metadata | `rg -ci "ahmes\|deviac\|evaluator_safe\|BIBLIO-GAP\|tuning_record\|thessia\|curriculum-internal\|triage\|UNVERIFIED\|STEP A\|scratchpad\|/Users/\|PHASE-X\|cold review\|e2e9b45c\|348bd016\|92a534c1\|integrated-triage\|operator-written"` on built ktx2-basis, its raw `exercises.md`/`deck-outline.md`, assignment, U8, U9 and the feii index: 0 each. Internal IDs `\b(X7–X11\|D9\|D21\|D22\|G6\|S1–S3\|F1–F9)\b`: 0. The single `tao-development-quote` hit (L1024) is the inert site-wide layout JS noted in round 1. PASS |
| Links under baseurl | Internal hrefs inside `<main>`: ktx2-basis 13, assignment 12, U9 14, with 0 that lack `/web-atelier-udit` or fail to resolve on disk. Inbound `href="/web-atelier-udit/lessons/en/feii/ktx2-basis/"` from the feii index (1), en index (1), U8 (2), U9 (1) and assignment (3). PASS |

### Closure table (round-1 findings)

| Finding | Evidence (current line in `ktx2-basis/index.md`) | Status |
| --- | --- | --- |
| **F1** P1 colour words | L53 glosses "colour space (which kind of colour numbers)" at its first use in prose. L373 "Four colour words first" defines screen colours, **sRGB**, **linear**, **transfer function / transfer** and **colour space** before Trap 2 uses them; the earlier `colorSpace` hits are code (L300, L327). L377 glosses OETF where the flag first appears. A non-specialist can read it: each word gets one plain sentence and no maths. Two residues, G4 and G5 (both P2). | **CLOSED** (residue P2) |
| **F2** P1 aggregator transcoder | L314: fork → `public/basis/`; aggregator → "one shared copy at the site root … path … built from `import.meta.env.BASE_URL`. Do not copy it into your route." L343: the aggregator path is `import.meta.env.BASE_URL + 'basis/'`, not `'/basis/'`. L513: the transcoder copy is gone; "Reference your `.ktx2` … the way `_template` references its picture". This agrees with amended PHASE-X10.md step 3 (one root `public/basis/`, `setTranscoderPath(import.meta.env.BASE_URL + 'basis/')`). The Excerpt's `'/basis/'` is labelled for the cover fork, a CodeSandbox fork served at root (U8 L357 "No Vite config change"), so it is right there. No other page tells students to copy the transcoder (`rg transcoder` on exercises, deck-outline, assignment, cover-shaders). X11 step 7 now cites L314 / L343 / L513, which match the current source. | **CLOSED** |
| **F3** P2 shader-flip reason | L367 carries the round-1 text verbatim. | CLOSED |
| **F4** P2 convert warning | L377: no-op on a correctly tagged or untagged PNG (S1 rows a/b), rewrites and brightens a linear-tagged file (row c), and "toktx refuses to run" on a file with a colour profile (rows f/g, convert). Re-measured: `toktx --t2 --{assign,convert}_oetf srgb` on `c-gamma1-wrong.png` → `assign: srgb(227,106,44)`, `convert: srgb(242,173,115)`; on f/g, `none rc=1, convert rc=1, assign rc=0`. "Right in every case this page tested" is true of the S1 matrix. The claim matches S1. | CLOSED |
| **F5** P2 placeholder provenance | L385 "drawn to match … not exported from the canvas, so your file bytes will differ; the GPU bytes will not"; L361 explains how to save the canvas. | CLOSED |
| **F6** P2 KTX-Software pin | L355 adds the row `KTX-Software (toktx, ktx) \| 4.4.2 \| Flags checked 2026-11-04…`. L347 caption separates the npm pins from the date check. | CLOSED |
| **F7** P2 ICC/P3 photos | L379 glosses **colour profile**, says to convert to sRGB in an editor first and then assign, and says `colorSpace` still logs `srgb`. Matches S1 row g. | CLOSED (see G4: "colour profile" is first used at L377, before this gloss) |
| **F8** P2 renderer-specific | L182 "…far less room on the GPU of that test renderer". | CLOSED |
| **F9** P0-for-X10 flag | PHASE-X10.md step 3 now prescribes assign and forbids convert (verbatim check below). The flag is right; the new gate lines have a defect (G1). | CLOSED (gate defect in G1) |

### Pack amendments vs the round-1 texts

```text
$ python3: each "> " quoted block of round 1 tested as a substring of its target file
993  "and set the sRGB transfer with `--assign_oetf srgb…"   -> PHASE-X10.md True
682  "Two encode facts the switch depends on…"               -> KTX2-FIRST-PRINCIPLES.md True
397  "UASTC: `toktx --t2 --encode uastc --zcmp 18…"          -> PHASE-X10.md True
513  "Always call `setTranscoderPath(import.meta.env.BAS…"   -> PHASE-X10.md True
gate rg line 1 / line 2                                     -> PHASE-X10.exit-gate.sh True / True
$ rg "the flag toktx help recommends" PHASE-X10.md     → 0 (old text gone)
```

- S1, S2, S3 and F2 are applied **verbatim**. The X10 acceptance list gains a matching row, and X11 step 7 carries F2. The X7 cold review and X7 report each get a pointer, and neither record is rewritten.
- The X10 commands, run as written, behave as claimed: `toktx --t2 --encode uastc --zcmp 18 --genmipmap --lower_left_maps_to_s0t0 --assign_oetf srgb` gives rc=0, 16,988 B, `KTX_SS_ZSTD`. The same flags for ETC1S **without** `--zcmp` give rc=0, 6,528 B, `KTX_SS_BASIS_LZ`. Both report `Transfer: KHR_DF_TRANSFER_SRGB` and `KTXorientation: ru`.
- `ktx create --format R8G8B8A8_SRGB --assign-tf srgb --convert-texcoord-origin bottom-left …` gives rc=0, `KHR_DF_TRANSFER_SRGB`, `ru`.
- One cosmetic slip: X10 L44 ends "…a baked conversion.**.** _studio checks at" (a double period from the splice; G7).
- The new gate lines (L16–L19) are valid bash. They sit inside `||` lists and `if` conditions, so gate-lib's ERR trap does not misfire on them. Their weaknesses are in G1 and G2.
- Spine §6: the paragraph agrees with §1 (texel, unchanged), §2 (GPU bytes counted, untouched), §9 (the oral paragraph, untouched) and with lesson L367/L377. It omits the Display P3 caveat that the lesson (L379) and X10 both carry (G6).

---

### G1 — X10 gate refuses a correct `encode-cover.mjs` written as an argument array (P1 for X10; does not block X8 DONE; fix in the X8 commit)

Gate L16 needs the literal text `--assign_oetf srgb` or `--assign-tf srgb`, flag and value joined by one space. A Node script that calls `spawnSync`/`execFileSync` with an argument array writes `'--assign_oetf', 'srgb'`. That is the idiomatic form, and it is the safe one for student file paths that contain spaces. The gate refuses it with "must assign sRGB", which is false, and it pushes the X10 executor toward a shell-interpolated command string just to satisfy grep. L17 has two more gaps. It refuses a script whose comment explains the trap. And it misses `ktx create`'s own deprecated alias `--convert-oetf` (`ktx create --help`: "--convert-oetf <tf> Same as --convert-tf. Deprecated."; toktx rejects the hyphen form, rc=1).

Evidence (sample scripts in `r2/gate/`, current regexes):

```text
a-string.mjs            `toktx … --assign_oetf srgb …`                      assign=pass   convert=pass
b-array.mjs             spawnSync('toktx', [..., '--assign_oetf', 'srgb', ...])  assign=REFUSE
g-array-ktx.mjs         execFileSync('ktx', ['create', …, '--assign-tf', 'srgb',
                          '--convert-texcoord-origin', 'bottom-left', …])    assign=REFUSE
c2-ktxcreate-str.mjs    `ktx create … --assign-tf srgb --convert-texcoord-origin bottom-left …`  pass / pass
d-comment.mjs           // never use --convert_oetf here (X8 S1)            convert=REFUSE
e-deprecated-convert    `ktx create --assign-tf srgb --convert-oetf srgb …`  convert=pass  ← slips through
```

`--convert-texcoord-origin` does **not** trip the convert refusal, which is correct.

**Fix (PHASE-X10.exit-gate.sh L16–L17).** Tested on the same samples. Result: a, b, c, c2, d, g pass; e refused; the `--assign_oetf=srgb` form refused (toktx rejects `=`, rc=1).

```bash
rg -q -- "--assign[_-](oetf|tf)['\"]?[ ,]+['\"]?srgb" "$ROOT/scripts/encode-cover.mjs" || { echo "REFUSED: encode-cover.mjs must assign sRGB (X8 cold review S1)" >&2; exit 1; }
if rg -- "--convert[_-](oetf|tf)\b" "$ROOT/scripts/encode-cover.mjs" | rg -qv '^\s*(//|\*|/\*)'; then echo "REFUSED: --convert_oetf/--convert-tf rewrites sleeve pixels (X8 cold review S1)" >&2; exit 1; fi
```

### G2 — X10 gate L18–L19 are weak proxies for "one copy, BASE_URL path" (P2; X10 gate)

- L18 checks only `public/basis/basis_transcoder.wasm`. The `.js` half can be missing, and per-route copies (the round-1 F2 failure) are not refused.
- L19 passes on **any** `BASE_URL` text anywhere in `src/`: a router `basename`, a registry fetch, or a comment. It does not prove the transcoder path. `feii-album-covers` does not exist yet, and react-template's `src/` has 0 `BASE_URL` hits today, so I cannot show that X9 will make it pass trivially. Nothing in the line stops that either.

**Fix:**

```bash
test -f "$ROOT/public/basis/basis_transcoder.js" && test -f "$ROOT/public/basis/basis_transcoder.wasm" || { echo "REFUSED: transcoder pair not vendored at root public/basis/ (X8 F2)" >&2; exit 1; }
if find "$ROOT/covers" -name 'basis_transcoder.*' | grep -q .; then echo "REFUSED: per-route transcoder copy (X8 F2)" >&2; exit 1; fi
rg -q "BASE_URL[^\n]*basis" "$ROOT/src" || { echo "REFUSED: transcoder path not built from import.meta.env.BASE_URL (X8 F2)" >&2; exit 1; }
if rg -q "setTranscoderPath\(\s*['\"]/" "$ROOT/src" "$ROOT/covers"; then echo "REFUSED: root-absolute transcoder path breaks under a Pages subpath (X8 F2)" >&2; exit 1; fi
```

### G3 — X10's "`KTXorientation: ru` or fail" check does not prove a flip with `ktx create` (P2; PHASE-X10.md step 3)

For toktx, `ru` is evidence: `--lower_left_maps_to_s0t0` flips the rows and writes `ru`. For `ktx create`, `--assign-texcoord-origin bottom-left` writes `ru` **without flipping the data**, and KTX2Loader ignores the note, so the sleeve still lands upside down. The pack's new "assign, never convert" mantra for colour is exactly backwards for orientation. That makes this mistake likely.

```text
64×64 PNG, orange top / navy bottom; ktx create --format R8G8B8A8_SRGB --assign-tf srgb …; ktx extract; sample
none:                               top-left=(227,106,44) bottom-left=(31,58,95)
--assign-texcoord-origin bottom-left: KTXorientation: ru  top-left=(227,106,44) bottom-left=(31,58,95)   ← not flipped
--convert-texcoord-origin bottom-left: KTXorientation: ru top-left=(31,58,95)  bottom-left=(227,106,44)  ← flipped
```

Gate L21 refuses an `--assign-texcoord-origin`-only script, because it needs `lower_left_maps_to_s0t0|convert-texcoord-origin`, so the gate is safe. The runbook text is not.

**Fix (one sentence in X10 step 3 after "Re-check the flip flag if `ktx create` replaces toktx"):** "With `ktx create` the flip is `--convert-texcoord-origin bottom-left`. `--assign-texcoord-origin` only writes the `ru` note without flipping the rows (X8 round-2 G3), so for colour it is assign and for orientation it is convert. With `ktx create`, `ru` alone does not prove the flip; the UV-labelled picture does." The lesson (L367) already names the right `ktx create` flag, so no lesson change is needed.

### G4 — "colour profile" is used one paragraph before its gloss (P2; lesson)

L377 (the F4 text): "On a file with a colour profile, toktx refuses to run." The definition comes two lines later, at L379: "A **colour profile** is a tag that a camera or image editor embeds…". This is the only colour word that still breaks D22's "define before use". **Fix:** in L377 write "On a file with an embedded colour profile (see the next paragraph), toktx refuses to run", or move the L379 paragraph above L377.

### G5 — The F1 paragraph says three.js copies the file's tag in general; the next paragraph says the PNG was tagged by hand (P2; lesson; executor prose)

L373: "The file carries a tag naming its transfer, and three.js copies that tag into `texture.colorSpace`". L375: "The cover-shaders satellite tagged the canvas picture `colorSpace = SRGBColorSpace` by hand. A packed sleeve is different. `KTX2Loader` sets `texture.colorSpace` itself". three.js ignores PNG colour chunks, so the L373 sentence is true only of the packed path, and a non-specialist reads the two paragraphs as a contradiction. **Fix:** "…and for a packed file three.js copies that tag into `texture.colorSpace`…". The round-1 suggested wording carried the same generality; this is a correction of the reviewer's text as much as the executor's.

### G6 — Spine §6 omits the Display P3 caveat (P2; KTX2-FIRST-PRINCIPLES.md)

The §6 paragraph reasons "a file tagged anything else is mislabelled". For a Display P3 photo that is not true: the file is correctly tagged, and assign mutes its colours (S1 row g). The lesson (L379) and X10 step 3 both say to convert P3 to sRGB in an editor first. The spine, which binds the lesson, does not. **Fix:** append to the §6 paragraph: "A photo with a non-sRGB colour profile (phone photos: Display P3) is converted to sRGB in an editor before encoding; assign only relabels." This was round-1 text, applied faithfully, so the gap is the reviewer's.

### G7 — Small record slips (P2)

- PHASE-X10.md L44: "…a baked conversion.. _studio checks at" has a double period.
- The pointer added to PHASE-X7-COLD-REVIEW.md says "`--convert_oetf` never is [correct]". S1 rows a/b show convert giving the right pixels, a no-op, on correctly tagged and untagged PNGs. Accurate wording: "never needed, and wrong on mis-tagged or ICC-tagged files".
- The s5 record's `amendments-triage-1.diff` is described in the report as `diff -u operator-written.md integrated-triage-1.md`, but it does not reproduce: `integrated-triage-1.md` also has an appended `<!-- triage-1 … -->` note (3 lines), and the stored diff omits it (`diff` of the regenerated vs stored hunk: `@@ -1 +1,3 @@` vs `@@ -1 +1 @@`). The published paragraph is still a substring of `integrated-triage-1.md` (True) and not of `operator-written.md` (False). `operator-written.md` and `provenance.json` are untouched (mtime 22:44, before triage at 23:09). Fix: regenerate the diff, or describe it as "paragraph-only diff".

### G8 — Round-1 provenance condition 2 has no durable home (P2; MERGE-CHECKLIST.md)

The rule "exclude s1/s3/s5 from any thessia-v4 training batch as not human-editorial" lives only in round 1 and in the report's "Not closed" list (`rg -i "thessia-v4|training batch|not human-editorial"` over the pack, excluding this file: only PHASE-X8-REPORT.md L326). MERGE-CHECKLIST L31 asks the professor to read ktx2-basis once. It does not name the executor-written paragraphs or the training exclusion. **Fix:** add one MERGE-CHECKLIST line naming the s1/s3/s5 records and the new executor prose (see below) for professor release, and the training-batch exclusion.

### Provenance (check 4)

- The s5 triage files exist and match the page: `integrated-triage-1.md` contains the published L182 paragraph; `amendments-triage-1.diff` shows the one-line change (with the G7 caveat). The gated `tuning_record` comment at L186 names both files, and it is absent from the built HTML.
- **For professor release, not a blocker:** the triage added executor-written prose outside any lesson-scribe record. That prose is L373 (Four colour words), L377 (convert warning), L379 (Phone and editor photos), L385 (provenance sentence), L361 (canvas save), L314/L343/L513 (aggregator wording) and the L355 pin row. I checked every factual claim in it against S1 and toktx/ktx 4.4.2 above. The only correction is G5. "Linear … numbers that rise in step with the amount of light" is a fair plain-words gloss. These passages need the same professor read as s1/s3/s5.

### Downstream amendments (same commit as X8 DONE)

| File | Change | Source |
| --- | --- | --- |
| PHASE-X10.exit-gate.sh L16–L17 | Replace with the G1 regexes | G1 (required before X10 opens) |
| PHASE-X10.exit-gate.sh L18–L19 | Replace with the G2 lines | G2 |
| PHASE-X10.md step 3 | Add the G3 sentence; fix the double period | G3, G7 |
| KTX2-FIRST-PRINCIPLES.md §6 | Append the P3 sentence | G6 |
| MERGE-CHECKLIST.md | Professor release of s1/s3/s5 + triage prose; training-batch exclusion | G8 |
| ktx2-basis/index.md L373, L377 | G5 and G4 wording | G4, G5 (optional before DONE) |

### Not done by this reviewer (round 2)

- No lesson or pack edits, no commit, no DONE flip, no push.
- The X10 gate was not run end to end, because `feii-album-covers` does not exist yet. Its new lines were exercised with `rg` against sample scripts only.
- No browser render, and no esbuild re-bundle: all 7 fences are byte-identical to round 1's bundled and tested code.
