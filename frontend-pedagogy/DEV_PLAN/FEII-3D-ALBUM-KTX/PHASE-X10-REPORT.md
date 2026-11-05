# PHASE-X10 report — `_studio` reference cover + KTX2 compare

**Status:** DONE

## Cold-review triage

| Finding | Severity | Blocks DONE | Disposition |
| --- | --- | --- | --- |
| None | — | No | Fresh cold review independently passed every local acceptance item and all S1–S4 dispositions. |
| Remote PR/CI re-query unavailable | Environment limitation | No | The local branch cleanly matches `origin/instructor-studio-x10` at `2491a0f`; retain the recorded PR and Actions URLs for the professor's final merge check. |

**Implementer:** cascade-phase-executor (Claude), 2026-11-05.
- **Worktree.** `web-atelier-udit-album-FEII-3D-ALBUM-KTX-10`. `.cascade-lane` = `FEII-3D-ALBUM-KTX` (checked first), and `git status` was clean at start.
- **What I did not do.**
  - I did not commit in the cascade worktree. This report is the only file I wrote there.
  - I did not run `PHASE-X10.exit-gate.sh`. I checked its conditions one by one (§7).
  - I did not touch lessons or pack files.
  - I did not push web-atelier-udit.
  - I did not merge, push `main`, use `--force` or `--no-verify`, or change GitHub settings.

**Aggregator:** `/Users/ruvebal/projects/ruvebal/scholar/udit/courses-repos/feii-album-covers`
- Branch `instructor-studio-x10` was cut from `main` at `bb5e324`. It holds one commit, `2491a0f`, pushed to origin.
- The local checkout is left **on the branch**, clean and in sync with `origin/instructor-studio-x10`.
- **PR:** <https://github.com/ruvebal/feii-album-covers/pull/1> (OPEN, MERGEABLE, base `main`). **Not merged**: the professor merges (D21/D23).
- **CI:** run **42005054575**, event `pull_request`, head `2491a0f`, job `lint-and-build`. **Conclusion: success** (lint "registry ok (1 cover; 1 R3F extend key, none shared)", build ok, 20 s). URL: <https://github.com/ruvebal/feii-album-covers/actions/runs/42005054575>

**Resume point:** harness `verify PHASE-X10.md` (exit gate against the local branch checkout), then the cold reviewer writes `PHASE-X10-COLD-REVIEW.md`, then triage. Surprises S1–S4 (§9) need an orchestrator or professor ruling.

---

## 1. Files (aggregator commit `2491a0f`, 34 files, +1475 / −72)

New:
```
public/basis/basis_transcoder.js        57,529 B  copied unchanged from three 0.185.1 examples/jsm/libs/basis/
public/basis/basis_transcoder.wasm     527,333 B  (SHA-256 8478b5b6… / 6cf17dc8…; cmp-identical to node_modules)
public/basis/README.md                  provenance, BASE_URL rule, "hashed copy in dist/assets is expected"
src/lib/ktx2.js                         TRANSCODER_PATH = import.meta.env.BASE_URL + 'basis/'; useKTX2Texture(url)
src/lib/gpuBytes.js                     KTX2 satellite's gpuBytes.js, unchanged below a header
src/lib/BudgetProbePerFrame.jsx         Unit 9 per-frame probe (autoReset false + per-frame reset); NOT mounted (S2)
covers/_studio/src/SleeveMaterial.jsx   lesson file, diff = extend key only (StudioSleeve / <studioSleeve>)
covers/_studio/src/sleevePicture.js     byte-identical to covers/_template/src/sleevePicture.js
covers/_studio/src/sleeveKtx2.js        MODES, SLEEVE_KTX2_URL (new URL relative), useSleeveKtx2
covers/_studio/src/sleeveChecks.js      measureSleeve: gpuBytes, colorSpace === SRGBColorSpace, GPU read-back colour + orientation
covers/_studio/src/StudioPanel.jsx      DOM panel: radio switch, two labelled numbers, count, format, checks (pass/FAIL in words)
covers/_studio/src/studio.css           reads var(--fe-*) tokens only; no transitions
covers/_studio/src/palette.js           single source of studio colours / probe points (no hardcoded colours elsewhere)
covers/_studio/src/budget.js            CEILING { calls 3, triangles 280, geometries 3, textures 2 }
covers/_studio/tools/make-sleeve.mjs    paints public/sleeve.png (magick ground + rsvg-convert sharp layer)
covers/_studio/public/sleeve.png        359,653 B, 512², 8-bit RGB, untagged (IHDR/IDAT/IEND only), ORIGINAL (D8)
covers/_studio/public/sleeve-etc1s.ktx2  36,496 B   (magic ab4b5458203230bb0d0a1a0a)
covers/_studio/public/sleeve-uastc.ktx2 262,400 B   (magic ab4b5458203230bb0d0a1a0a)
covers/_studio/docs/{ktx2-note,renderer-info,shader-note,ai-3d-merge-log}.md
```
Modified:
- `covers/_studio/src/Cover.jsx`: the reference scene. It has the five props, no Canvas and no probe, plus `<Html>` for the panel.
- `covers/_studio/src/parts.js` and `covers/_studio/docs/README.md`.
- `covers/registry.json`: lists `_studio` (one object; sorted trivially).
- `scripts/encode-cover.mjs`: the real implementation (§3).
- `covers/_template/src/sleevePicture.js`: only the transcoder comment changed. The future tense ("will vendor…") is now present tense and names `src/lib/ktx2.js`.
- `CONTRIBUTING.md`:
  - step 6 now reads: "Students never press Merge, not even on their own PR with a green check and an approval: the instructor merges."
  - Route contract 2: the transcoder text is now true (vendored, `src/lib/ktx2.js`, the encode output names);
  - Route contract 1: routes may *import* `src/lib/` helpers (S3);
  - `public/` is added to the never-edit list.
- `.cursor/rules/40-asset-pipeline.mdc`:
  - L19 names the encode outputs and flags;
  - L21 was re-checked. It no longer says "lands with the KTX2 loader". It now says "vendored at the repo-root `public/basis/` (three 0.185.1's pair), through the shared loader `src/lib/ktx2.js` (… `import.meta.env.BASE_URL + 'basis/'`); never a CDN copy, never Drei's `useKTX2` default, never a second copy in your route".
- `README.md`: layout tree, "Shared assets" is now true, and a `_studio` instructor note.
- `CODEOWNERS`: adds `/public/`.
- `eslint.config.js`: `globalIgnores(['dist', 'public/basis'])`, because the vendored transcoder is not our code.
- Deleted: `covers/_studio/public/.gitkeep`.

## 2. The scene and the compare UI

- **Tree.** Stage, sleeve and vinyl, identical in geometry to `_template` (3 calls, 280 triangles).
  - Hover and click call `onHover`/`onSelect`.
  - The disc's `useFrame` writes one position, allocates nothing, and returns early under `reduced`.
- **Material.** The sleeve uses `SleeveMaterial` (sheen = the one authored effect, sampling `uMap` at `vUv`).
- **Switch.** A visible **Flat / PNG / ETC1S / UASTC** radio group, rendered as DOM through drei `<Html>` and pinned to the Canvas's top-right corner.
  - "Flat" is an extra baseline mode, so the texture count can be read before and after a picture loads (S4).
- **Labelled readouts.**
  - "file bytes (suitcase)": `fetch(url)` → `byteLength`;
  - "GPU bytes (room), computed": `gpuBytes`, all levels plus level 0;
  - "texture.format";
  - "renderer.info.memory.textures (a count, not bytes)";
  - "colorSpace check": `texture.colorSpace === SRGBColorSpace`;
  - "colour vs the PNG file": a GPU read-back of the orange disc and the grey patch, compared with the PNG's own pixels, tolerance Δ ≤ 16;
  - "orientation (corner at uv 0,0)": a GPU read-back of the bottom-left corner square. Green means upright, magenta means upside down; the nearer colour within Δ80 wins.
- **Picture.** The sleeve shows the UV labels in all three modes.
- **Accessibility and motion.**
  - The panel stops pointer events, so a click on it does not select the mesh behind it or orbit.
  - It folds (`<details open>`) and has no transitions.
  - Under `prefers-reduced-motion` the sheen is parked and the disc stops.
- **Texture lifetime.** When the mode changes, the previous texture's GPU copy is disposed, so the count stays at one picture.

## 3. Encode commands and `ktx info`

`which toktx ktx` → `/usr/local/bin/toktx`, `/usr/local/bin/ktx`; `toktx v4.4.2`, `ktx version: v4.4.2`. Encoder present, so both modes were encoded for real.

The sleeve was generated with `node covers/_studio/tools/make-sleeve.mjs`. It is deterministic on this machine: the re-run SHA-256 was `9597e9ae…1c8a` both times. Then `npm run encode -- _studio`:

```
toktx v4.4.2 · ktx version: v4.4.2
source  covers/_studio/public/sleeve.png  359653 bytes (file bytes, the suitcase)

$ toktx --t2 --encode etc1s --genmipmap --lower_left_maps_to_s0t0 --assign_oetf srgb covers/_studio/public/sleeve-etc1s.ktx2 covers/_studio/public/sleeve.png
  ok   ktx info validates the file
  ok   Transfer: KHR_DF_TRANSFER_SRGB
  ok   KTXorientation: ru
  covers/_studio/public/sleeve-etc1s.ktx2  36496 bytes (file bytes, the suitcase)

$ toktx --t2 --encode uastc --zcmp 18 --genmipmap --lower_left_maps_to_s0t0 --assign_oetf srgb covers/_studio/public/sleeve-uastc.ktx2 covers/_studio/public/sleeve.png
  ok   ktx info validates the file
  ok   Transfer: KHR_DF_TRANSFER_SRGB
  ok   KTXorientation: ru
  covers/_studio/public/sleeve-uastc.ktx2  262400 bytes (file bytes, the suitcase)
```

`ktx info` excerpts:
```
== sleeve-etc1s.ktx2                         == sleeve-uastc.ktx2
Validation successful                        Validation successful
vkFormat: VK_FORMAT_UNDEFINED                vkFormat: VK_FORMAT_UNDEFINED
levelCount: 10                               levelCount: 10
supercompressionScheme: KTX_SS_BASIS_LZ      supercompressionScheme: KTX_SS_ZSTD
Transfer: KHR_DF_TRANSFER_SRGB               Transfer: KHR_DF_TRANSFER_SRGB
Primaries: KHR_DF_PRIMARIES_BT709            Primaries: KHR_DF_PRIMARIES_BT709
Model: KHR_DF_MODEL_ETC1S                    Model: KHR_DF_MODEL_UASTC
KTXorientation: ru                           KTXorientation: ru
KTXwriterScParams: --encode etc1s            KTXwriterScParams: --encode uastc --zcmp 18
```

Reference figures:
- UASTC without `--zcmp` came to 350,032 B (scratch only, not committed).
- `toktx --encode etc1s --zcmp 18` exits 1 with "Only one of '--encode etc1s | --bcmp' and --zcmp can be specified."

**`encode-cover.mjs` behaviour, run here.** Args are arrays. The gate's convert regex has no non-comment match, and the file contains no convert flag at all.

| Case | Result |
| --- | --- |
| `PATH=/usr/bin:/bin` (no toktx) | exit **127**, install hint (KTX-Software 4.4.2 URL, macOS `.pkg` → /usr/local/bin, "encoder skip — toktx missing", "Never commit a .ktx2 you did not encode") |
| no args | usage, exit 2 |
| a `.ktx2` renamed `.png` | "is not a PNG", exit 1 |
| PNG + iCCP Display P3 (Apple `Display P3.icc`) | `!!!` banner, "NON-sRGB colour profile … (Display P3) … would come out MUTED … Convert it to sRGB in your image editor", exit **4** |
| same, `--relabel-anyway` | encodes, prints the override |
| PNG + iCCP sRGB (Apple `sRGB Profile.icc`) | note, encodes, rc 0. Raw `toktx` without assign on the P3 file: "It has an ICC profile. These are not supported. Use --assign_oetf", rc 1 |
| PNG + gAMA 1.0 | note "relabels it as sRGB", rc 0 |
| `ktx` shim hiding `KTXorientation` | `FAIL KTXorientation: ru` → output deleted, exit **5** |

The test PNGs were made in `covers/zz-test/` and that folder was removed before commit.

## 4. Measurements (headless Chrome, SwiftShader; dated 2026-11-05)

**Where it ran.**
- Machine: Apple M4 Max (Mac16,9), macOS 27.0.1.
- Browser: Chrome 156.0.8078.80 `--headless=new --use-angle=swiftshader --enable-unsafe-swiftshader`.
- WebGL: `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (LLVM 10.0.0) (0x0000C0DE)), SwiftShader driver)`, WebGL 2.0. **This is a software renderer, not a GPU. No real-GPU numbers are claimed.**
- Build: `npm run build && vite preview`.
- Walk: one SPA session, driven over CDP (`walk.mjs`): gallery → click the `_studio` link → PNG → ETC1S → UASTC → Flat → PNG. It recorded 1 navigation entry.

| Mode | file bytes (suitcase) | GPU bytes all 10 levels | GPU bytes level 0 | texture.format | memory.textures (count) | gallery panel | colorSpace | colour (disc / grey) | orientation corner |
| --- | ---: | ---: | ---: | --- | ---: | --- | --- | --- | --- |
| Flat | — | — | — | — | 1 | calls 3/3 · tris 280/280 · geos 3 · textures 1 | — | — | — |
| PNG | 359,653 | 1,398,100 | 1,048,576 | RGBAFormat | 2 | 3 · 280 · 3 · 2 · within ceiling | srgb, pass | (227,106,44) Δ0 / (128,128,128) Δ0 | (47,191,113) upright |
| ETC1S | 36,496 | 174,776 | 131,072 | RGB_ETC2_Format | 2 | same | srgb, pass | (229,105,47) Δ3 / Δ0 | (49,190,115) upright |
| UASTC | 262,400 | 349,552 | 262,144 | RGBA_ASTC_4x4_Format | 2 | same | srgb, pass | Δ0 / Δ0 | (47,191,113) upright |

Off-line quality, measured with `ktx extract --transcode rgba8`, flip, then `magick compare -metric PSNR` against the PNG (whole picture / title strip):

| Mode | Whole picture | Title strip |
| --- | ---: | ---: |
| ETC1S | 32.18 dB | 30.03 dB |
| UASTC | 43.24 dB | 41.83 dB |

These numbers are the basis for the note's choice of UASTC for this type-heavy reference sleeve.

**The same checks came back identical in three other conditions:**
- `npm run dev` (StrictMode: 8 measure logs, effects doubled, no errors);
- a subpath build, `BASE_PATH=/feii-album-covers/`. The transcoder was fetched from `http://localhost:4175/feii-album-covers/basis/basis_transcoder.{js,wasm}`, and the hashed `dist/assets/basis_transcoder-*` copy was never requested;
- `prefers-reduced-motion: reduce` emulated. Here two screenshots 900 ms apart were **identical** (`framesIdentical900ms: true`), against `false` without emulation.

**Keyboard:** I focused the PNG radio and sent ArrowDown → `etc1s checked=true`, "ETC1S: every check passes". A second ArrowDown gave uastc.

**Console:** `THREE.Clock … deprecated` (pre-existing, from R3F/three), a `favicon.ico` 404, SwiftShader "GPU stall due to ReadPixels" performance notes (from the one-off read-back), and the `[_studio]` measurement lines. No errors and no exceptions.

**Controls.** These were scratch copies with the encodes replaced; none was committed. Each one fails exactly the check it should:

| Control encode | colorSpace | colour | orientation | Panel |
| --- | --- | --- | --- | --- |
| ETC1S without `--lower_left_maps_to_s0t0` (`KTXorientation: rd`) | srgb pass | FAIL (probes land elsewhere) | corner (212,64,163), **upside down: FAIL** | title upside down on screen |
| gAMA 1.0 PNG, ETC1S, no oetf flag (`Transfer: KHR_DF_TRANSFER_LINEAR`) | **srgb-linear: FAIL** | disc (242,171,118) FAIL | upright | — |
| gAMA 1.0 PNG, UASTC, `--convert_oetf srgb` (`Transfer: SRGB`) | srgb **pass** | disc (242,173,115) **Δ71 FAIL** | upright | reproduces X8 S1's baked number exactly; only the colour check catches it |
| Build without the mode-change `dispose()` | — | — | — | textures PNG 2 → ETC1S 3 → UASTC 4 → Flat 4 → PNG 4, "over ceiling" (why the dispose exists) |

**Screenshots.** Files are in the scratch folder `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/x10`:

| What | Folder | Files | Report |
| --- | --- | --- | --- |
| Normal walk | `run3/` | `00-gallery.png`, `01-png.png`, `02-etc1s.png`, `03-uastc.png`, `04-flat.png`, `05-png.png` | `report.json` |
| Reduced-motion walk | `run3/` | `*-reduced.png` | `report-reduced.json` |
| Subpath build | `run-subpath/` | | |
| Dev server | `run-dev/` | | |
| Unflipped control | `control-run3/` | `02-etc1s.png` (upside-down sleeve, FAIL panel) | |
| Linear-tag and convert-baked controls | `control-run2/` | | |
| No-dispose control | `control-nodispose/` | | |

The CDP drivers are `walk.mjs` and `kbd.mjs` in the same folder. The off-line decodes are `dec-etc1s-up.png` and `dec-uastc-up.png`.

## 5. Docs filled (`covers/_studio/docs/`)

- **`ktx2-note.md`.** It follows the lesson's Template rows and their order:
  - album / licence: original;
  - chosen mode plus reason (UASTC, with measured Δ and PSNR);
  - "Measured on" (machine, browser, SwiftShader, date) and "Levels counted" (all levels, with the level 0 numbers);
  - the 3-row table: Asset | File bytes | GPU bytes (computed) | texture.format | Observation;
  - the texture count, 1 → 2;
  - the orientation and colorSpace checks, with the controls.
  - Below the template: the exact encode commands, the `ktx info` excerpt, the runtime path and a "what this does not tell you" paragraph.
  - It contains "file bytes" and "GPU bytes", and the byte numbers.
- **`renderer-info.md`.** Unit 8 Template rows per mode (Flat / PNG / ETC1S / UASTC), the CEILING, and notes: count ≠ bytes, a shader swap is not a draw, the read-back target is disposed, zero passes, and where the per-frame probe lives.
- **`shader-note.md`.** Unit 9 items 1–6 plus Cover shaders line 7 (`uMap` at `vUv`, the "changes the answer" line), with reviewer notes on the extend key, the colour lines and the absence of `1.0 - vUv.y`.
- **`ai-3d-merge-log.md`.** It states plainly that an AI agent drafted the route and that the rows are the agent's own accept/reject record with evidence, **not** a human review.
  - 7 REJECT rows (extend key, Unit 9 probe lint, orientation threshold, panel placement, dispose, ImageMagick without FreeType, shell-string args).
  - 2 ACCEPT rows (BASE_URL loader, reduced motion).

## 6. Lint / build tails

Local (final tree):
```
> feii-album-covers@0.1.0 lint
> eslint . && node scripts/check-registry.mjs
registry ok (1 cover; 1 R3F extend key, none shared)

> feii-album-covers@0.1.0 build
> vite build
dist/assets/sleeve-etc1s-DNeRCMbb.ktx2        36.50 kB
dist/assets/basis_transcoder-o4Hde_L7.js      57.53 kB      ← three's default-path copy, unused (X8 S3)
dist/assets/sleeve-uastc-_II3Onrt.ktx2       262.40 kB
dist/assets/sleeve-DKpvynx-.png              359.65 kB
dist/assets/basis_transcoder-VXdx5NbI.wasm   527.33 kB      ← same, unused
…
(!) Some chunks are larger than 500 kB after minification.   ← events-*.esm (R3F), pre-existing
✓ built in 1.69s
dist/basis/{basis_transcoder.js, basis_transcoder.wasm, README.md}   ← the vendored pair, fixed names
```
CI run 42005054575: `npm ci` → `npm run lint` ("registry ok (1 cover; 1 R3F extend key, none shared)") → `npm run build`, success.

## 7. Exit-gate conditions, checked one by one (the gate script itself was NOT run)

| Gate condition | Evidence |
| --- | --- |
| build + lint | Exit 0 locally and in CI. |
| `covers/_studio/src/Cover.jsx`, `docs/ktx2-note.md` | Present. |
| uastc / etc1s under `_studio` or `src/lib` | Present in `sleeveKtx2.js`, `Cover.jsx` and the docs. |
| `uMap` in `_studio/src` | `SleeveMaterial.jsx`. |
| No `extend({ SleeveShader` | The only call is `extend({ StudioSleeve: SleeveShader })`. |
| `check-registry` | Exit 0. |
| CONTRIBUTING merge sentence | "never press Merge" (regex is case-insensitive). |
| note has "file bytes", "GPU bytes" and numbers | Yes. |
| assign regex | Matches `'--assign_oetf', 'srgb'`. |
| No non-comment `--convert_oetf` / `--convert-tf` | 0 matches anywhere in the file. |
| Flip flag | `--lower_left_maps_to_s0t0`. |
| Runtime `colorSpace === SRGBColorSpace` | `sleeveChecks.js:154`. |
| Transcoder pair at root `public/basis/` | Yes. |
| No `basis_transcoder.*` under `covers/` | `find` returns nothing. |
| `BASE_URL…basis` in `src` | `src/lib/ktx2.js:10`. |
| No root-absolute `setTranscoderPath('/…` | None. |
| `.ktx2` magic bytes | Both files `ab4b5458203230bb0d0a1a0a`. |
| registry lists `_studio` | Yes. |
| `200` / `80` in `src/lib` | `budget.js` `COURSE_CAP`, plus the per-frame probe's comment. |

**Uncertainty.** The gate runs `rg` and `python3` on the local checkout. That checkout is on `instructor-studio-x10` as required. If anyone switches it back to `main` before the harness runs, the gate fails, because `main` does not have this work.

## 8. Acceptance (PHASE-X10.md) — implementer's view, for the cold reviewer to verify

- [x] `npm run build` and `npm run lint` exit 0, locally and in CI.
- [x] `uastc` and `etc1s` are under `covers/_studio` and `src/lib`.
- [x] `ktx2-note.md` has measured bytes; the encoder was present, so this is not a skip.
- [x] The UI and docs label **file bytes (suitcase)** vs **GPU bytes (room), computed**; `memory.textures` appears only as a labelled count.
- [x] Orientation and `colorSpace` verified for PNG, ETC1S and UASTC by a logged GPU read-back plus screenshots. Controls prove the checks discriminate.
- [x] `encode-cover.mjs`: `--assign_oetf srgb`, no convert flag, `--zcmp` only for UASTC. Transcoder vendored once at root `public/basis/`, path from `import.meta.env.BASE_URL`, and subpath build verified.
- [x] `registry.json` lists `_studio`.
- [x] Budget caps ≤ 200 / ≤ 80 are still in `src/lib/budget.js`, unchanged. The per-frame probe documents them too.
- [ ] Cold review filed; blocking Fn closed. Not mine to tick.

## 9. Surprises and uncertainties (for the orchestrator, cold reviewer and professor)

- **S1. Unit 9's published per-frame `BudgetProbe` fails this repo's lint.**
  - Under eslint-plugin-react-hooks 7 (`react-hooks/immutability`, recommended config), `gl.info.autoReset = false` on the `useThree((state) => state.gl)` value fails with "Modifying a value returned from a hook is not allowed".
  - react-template uses the same flat config, so the lesson file probably fails `npm run lint` there too. I did not run that check in react-template.
  - The aggregator copy reaches the renderer via `get()` and the frame state instead, with the same reads and the same per-frame reset; this is documented in the file header.
  - Unit 9's text is not changed. That is an X11 or lesson decision.
- **S2. The per-frame probe ships but is not mounted.** The gallery (`CoverRoute.jsx`) still mounts the Unit 8 probe, `@react-three/postprocessing` is not a dependency, and there is no per-route switch.
  - The file says that the instructor swaps the one import to measure a route with a pass, and that the two probes must never be mounted together. This is because the per-frame reset would hand the other probe zeros.
  - X9 F5's remaining half needs a product decision: add the pin, or state "zero passes on the aggregator" on the assignment page (X11).
  - Note also that X9 G3 suggested a future gate line `rg -q "autoReset" src/lib/BudgetProbe.jsx`. My file is `BudgetProbePerFrame.jsx` ("alongside the existing probe", per the phase brief), so that exact line would fail if it is ever added.
- **S3. Route-contract wording extended.** CONTRIBUTING contract 1 used to say a route "imports only from its own folder … and npm". It now also allows *importing* (never editing) `src/lib/` helpers (`ktx2.js`, `gpuBytes.js`), and contract 2 tells task3 routes to load `.ktx2` with `useKTX2Texture`.
  - This is the simplest true way to make "the gallery builds its path from BASE_URL" usable from a route.
  - It is a contract change the professor should accept or revert. Students could instead write the lesson's loader in their own folder with the BASE_URL path.
  - X11 should re-check ktx2-basis L314/L508 against this wording.
- **S4. The switch has a fourth mode, "Flat".** It is a no-picture baseline, so "texture count before → after the sleeve loads" is a reading rather than a race. The phase asked for PNG / ETC1S / UASTC; those three are all present, and PNG is the default.
- **The studio sleeve is "photographic-ish" original art, not a real photograph.** The ktx2-basis lesson (§ The choice you write) says "a measured pair for a **real** sleeve photograph … is measured in the reference repo, the album aggregator's studio switch". X11 should word that as "an original grainy sleeve", not "a real photograph". The GPU bytes equal the lesson's placeholder table exactly (same 512², same transcoded formats on SwiftShader). That is expected, because GPU bytes depend on size and format, not content.
- **Judgement calls of mine.**
  - The tolerances (colour Δ ≤ 16, orientation nearest-of-two within Δ80) are mine.
  - The note's choice of UASTC for the reference sleeve is mine, argued from measured Δ and PSNR. The professor may prefer ETC1S.
- **The sleeve generator depends on this Mac.** It needs `magick` plus `rsvg-convert` and the macOS system fonts DIN Alternate and Courier New, used only to rasterise original artwork. This ImageMagick build lacks FreeType, so `-annotate` silently dropped the type; that is why the type is drawn through SVG. On another machine the fonts and bytes may differ. The committed PNG is the artefact, and the script is the record.
- **Not done (outside X10's named steps):**
  - X9 round-2 G1: check-registry blind spots for an aliased `extend`, `extend(mats)` and an apostrophe in JSX;
  - X9 G4 part 2: "a direct push … shows in the commit history" should become "Actions log and activity; a force-push can erase commits" in README and CONTRIBUTING.
  - Both are still open for the orchestrator to route.
- **Kept on purpose.**
  - `console.info('[_studio] …')` stays in production. It is the lesson's `console.table` habit, and it was the logged-check channel for this report.
  - `public/basis/README.md` is also copied into `dist/basis/`. It is harmless, but noted.
- **Process note.** Another session had a `vite preview` on port 4174 during this run (`scratchpad/rt-sat/…`). I did not touch it, and I moved my control server to port 4191. All the control results above come from my own builds; each report shows the "Signal & Grain" studio panel.
- **Branch base.** Cut from `bb5e324` (`main`, clean, in sync with origin).
