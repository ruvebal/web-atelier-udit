# PHASE-X10 cold review — `_studio` reference cover + KTX2 compare

**Reviewer:** fresh `cascade-cold-reviewer` session; did not implement X10  
**Verdict:** local acceptance evidence passes. No P0/P1/P2 implementation finding blocks orchestrator promotion.

## Inputs reviewed

- `PHASE-X10.md`, `PHASE-X10-REPORT.md`, and `PHASE-X10-VERIFY-LOG.md` (harness exit 0)
- complete `main..instructor-studio-x10` diff in `feii-album-covers`, commit `2491a0f`
- `AUTOPILOT.md`, cascade hard constraints, `DECISIONS.md`, `REPO-SHAPE.md`, and the student/instructor audit boundary
- local encode, browser-run receipts, and the branch's tracked `origin/instructor-studio-x10` ref

## Acceptance evidence

| Acceptance item | Independent evidence | Result |
| --- | --- | --- |
| Build and lint | Fresh `npm run lint` exited 0 (`registry ok (1 cover; 1 R3F extend key, none shared)`). Fresh normal and `BASE_PATH=/feii-album-covers/ npm run build` both exited 0. | PASS |
| Studio source, KTX2 modes, shader | `Cover.jsx`, `SleeveMaterial.jsx`, `sleeveKtx2.js`, and `docs/ktx2-note.md` exist. The material samples `uMap`; the only registration is `extend({ StudioSleeve: SleeveShader })`. | PASS |
| Real KTX2 artifacts | Both files begin `ab4b5458203230bb0d0a1a0a`. `ktx info` independently reported validation success, 512 x 512, 10 levels, sRGB transfer, `ru` orientation, ETC1S/UASTC models, and UASTC `--zcmp 18`. | PASS |
| File versus GPU bytes | `StudioPanel.jsx` labels `file bytes (suitcase)`, `GPU bytes (room), computed`, and `renderer.info.memory.textures (a count, not bytes)`. `gpuBytes.js` sums compressed mipmap byte lengths and uses `TextureUtils.getByteLength` per uncompressed mip. | PASS |
| Runtime colour/orientation evidence | `run3/report.json` records PNG, ETC1S, and UASTC all as sRGB and upright, with computed byte counts and texture count 2. The unflipped and converted controls report discriminatory failure states. The reduced-motion receipt reports `framesIdentical900ms: true`. | PASS |
| Encode discipline and transcoder placement | The source uses array arguments, `--assign_oetf srgb`, `--lower_left_maps_to_s0t0`, and UASTC-only `--zcmp 18`; no non-comment convert flag was found. There are exactly two transcoder files under root `public/basis/`, none under `covers/`, and `src/lib/ktx2.js` derives the path from `import.meta.env.BASE_URL + 'basis/'`. | PASS |
| Registry and caps | `covers/registry.json` contains sorted `_studio`; `src/lib/budget.js` retains desktop 200 and mobile 80 call caps. | PASS |
| Art and contribution boundary | `make-sleeve.mjs`, the original-art declaration, route-only asset placement, no commercial sleeve, instructor-only `_studio`, and the student-never-merges text are present. No cloud SDK or `web-atelier-udit` push/change appears in the X10 diff. | PASS |

## Surprises S1–S4

- **S1:** the per-frame probe uses `get()` rather than mutating a hook-selected renderer. This is a lint-compatible adaptation; its cleanup restores `autoReset`. No defect found.
- **S2:** the per-frame probe is deliberately unmounted because X10 ships no post-processing pass. It remains a shared, documented instructor swap for a route that adds one; mounting both probes would invalidate measurement. This matches X10's out-of-scope default post stack.
- **S3:** permitting imports (not edits) from `src/lib/` is necessary for the one shared root transcoder. The contribution rule, loader, and KTX2 lesson's aggregator exception agree.
- **S4:** Flat is an additional no-picture baseline; PNG, ETC1S, and UASTC remain present. It makes the before/after texture count observable and does not replace a required mode.

## Agentic-change failure modes

1. **Import/load:** the Vite production builds transformed 631 modules under normal and subpath bases; the KTX2 loader is ESM and its subpath transcoder requests are recorded in `run-subpath/report.json`.
2. **Full suite:** fresh lint, registry validation, normal build, subpath build, `git diff --check`, and the phase harness gate all passed.
3. **Counterfactual checks:** the supplied controls distinguish missing flip, absent sRGB assignment, baked conversion, and absent disposal; their panels fail rather than merely restating the green path.
4. **Return/data shapes:** `gpuBytes()` separates compressed mipmap arrays from uncompressed image dimensions and returns a documented structured reading used by the DOM panel.
5. **Distinct modes:** `flat`, `png`, `etc1s`, and `uastc` are discriminated mode values with separate loading/render paths and one visible radio state.
6. **Documentation claims:** exact `ktx info`, magic bytes, encode flags, file sizes, runtime panel output, shared-transcoder locations, registry parsing, contribution text, and build results were rechecked rather than accepted from prose.

## Remote evidence limitation

The local checkout is clean and `HEAD` equals `origin/instructor-studio-x10` at `2491a0f`, which independently confirms the branch was pushed. GitHub CLI/API access failed from this environment, so the report's live PR state and Actions conclusion could not be queried anew here. This is not a local implementation defect; retain the recorded PR/CI URLs for the professor's final merge check.

## Findings

None. This reviewer does not mark X10 `DONE`; promotion remains with the orchestrator.
