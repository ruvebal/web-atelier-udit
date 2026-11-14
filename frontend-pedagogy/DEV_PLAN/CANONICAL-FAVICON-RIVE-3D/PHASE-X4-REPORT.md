# PHASE-X4 · Expose a resilient responsive web specimen

**Status:** VERIFYING
**Branch:** `cascade/CANONICAL-FAVICON-RIVE-3D-4`

## Outcome

The comparison route's Rive + AnimaScript card now hosts the real signed 3D scene behind a resilient web integration instead of the old inline player. `docs/assets/js/favicon-motion/rive-3d-scene.mjs` is a shared JavaScript mirror of the AnimaScript choreography and picker — it loads the generated manifest and packed blobs, reproduces the camera fit, staggered extrusion/retraction, separation pulse, quaternion inspect pose, exponential orbit damping, selection offsets, depth-tie rule, and `solveFacetPoint()` aiming helper, and runs identically in the browser and Node. `docs/assets/js/favicon-motion/rive-3d-host.js` owns the host: it lazy-loads the Rive WebGL2 runtime with a timeout, mounts the `.riv` on the existing canvas, wraps `console.log` to consume the scene's `x3pick` events, keeps an `N=13` semantic facet-button group synchronized with the scene selection (pressed state, status announcements via `aria-live`, generated fill chips that are not colour-only), and provides pause/play plus reset. Pointer, touch, fine-motion drag (3 px deadzone mirrored), and keyboard activation all reach the scene's own picker — the host never re-implements picking for input, only for still aiming.

Static resilience is layered: reduced motion never boots the GPU scene and instead shows verified stills from `stills/` (assembled pose plus one selected-facet still per generated facet ID, produced by `scripts/svg-extrusion/capture-x4-stills.mjs` through the Rive CLI at the recorded phases in `stills-manifest.json`); runtime load failure or the `?force-rive3d-failure` probe shows the assembled still with a truthful status message; the semantic controls remain enabled in static mode and swap the displayed still. Teardown removes the Rive player, resize observer, animation frame, pointer/keyboard listeners, and restores the wrapped console — verified with zero residual picks, frozen elapsed, and detached orbit targets.

## Scene change carried by this phase

`choreo.as` `computeCamera` widened the ortho near margin from a fixed `0.05` to `SELECT_OFFSET_Z + SEPARATION_DIST + 0.02` (0.20). Selected facets pop 0.08 toward the camera and the separation pulse adds 0.10; the old margin let those displacements clip against the near plane, which would have hidden the very selection highlight the host syncs. `verify-picking.mjs` and `verify-fidelity.mjs` mirrors were updated to the same margin and still pass A1–A11 / A1–A8. The `.riv` was rebuilt and re-verified. This is the only scene-source change in the phase; `main.as`, `pick.as`, and `canonical-favicon.wgsl` are untouched.

## Verification prepared for the external gate

- `pnpm build` — Jekyll build plus `verify:publication` and `verify:citations` pass; `_config.yml` now excludes `build/x3-checks`/`build/x4-checks` so verifier output (which embeds local absolute paths) never ships as lesson assets.
- `node scripts/verify-rive-3d-host.mjs` — drives the built `_site` in real Chromium (playwright-core, Chrome channel with headless-shell fallback). **A1–A6 all PASS.**
  - **A1** real `page.mouse.click`, `touchscreen.tap`, sub-deadzone micro-drag + real drag orbit, and keyboard Enter on a facet button all produce scene picks (`x3pick` console events) and synchronized selection state; zero page errors.
  - **A2** `N=13` buttons generated from the manifest — labels are facet IDs plus generated fill chips (not colour-only), all enabled, chip fills match manifest fills.
  - **A3** six captures at 320/768/1280 × dark/light; card overflow ≤2 px and canvas sized everywhere. Document-level overflow never exceeds the 8 px pre-existing baseline measured on `main` (method-grid card heads, unrelated to this card).
  - **A4** `prefers-reduced-motion: reduce` loads static mode: assembled still visible, canvas hidden, facet buttons usable (select swaps stills, reset restores), no GPU boot.
  - **A5** `?force-rive3d-failure` shows the assembled still, truthful status text, working controls, zero page errors.
  - **A6** teardown leaves `player/observer` null, rAF count unchanged, elapsed frozen, orbit detached, console restored, zero facet buttons and zero new picks.
- `node scripts/svg-extrusion/capture-x4-evidence.mjs` — replays A1–A6, stores immutable transcripts in `baseline/X4/`, writes `PHASE-X4-EVIDENCE.json` (reportStatus VERIFYING).
- `node scripts/svg-extrusion/verify-phase-evidence.mjs X4` — PASS.
- Regression: `verify-picking.mjs --all-fixtures` A1–A11 PASS, `verify-fidelity.mjs` A1–A8 PASS, `rive --verify`/`--test` unchanged and green after the near-margin change.

## Gate corrections (post-`0b47e07`, post-`032806c`)

Two gate failures, both verifier-side; no host or scene code changed:

1. **A2 ordering race (`0b47e07`):** A2 read `button.disabled` while A1's keyboard pick still had `pickBusy` set — the buttons re-enable in `aimAndClick`'s `finally` after the scene ack. A2 now waits (bounded, 6 s) for the busy state to clear and records the wait in the PASS line.
2. **Evidence digest (`032806c`):** the receipt was captured per-check but the gate runs `--all`, where A1/A2/A6 share one live page — different selection state, timings, and pick counts meant the hashed JSONs could never match. Two fixes: (a) `capture-x4-evidence.mjs` now runs the gate's own `--all` command once and records that transcript for all six items; (b) every `x4-checks/*.json` was normalized to deterministic content — volatile fields (facet IDs, selection arrays, pick lines, `enabledAfterMs`, clip rects, absolute elapsed/pick counts) moved to the PASS transcript line or dropped, leaving only stable booleans, counts, and manifest-derived values. Verified: two independent `--all` runs produce byte-identical JSON for all six checks (A1's touch pick differed between runs — `facet-12` vs `facet-01` — and correctly appears only in the transcript, not the hashed artifact).

## Amendments and honest limitations

- The X4 host consumes scene state only through the `x3pick` console contract and the shared mirror for aiming/stills; it does not read GPU pixels. Semantic truth lives in the DOM twin, synchronized on every logged pick — if the scene ever stops logging, controls stay consistent with the last known state rather than fabricating picks.
- `solveFacetPoint()` aiming is mirror-exact but the live choreography keeps moving; the verifier retries aim+dispatch until the scene confirms, which tests the input path rather than single-shot timing luck.
- Static stills are CLI captures at fixed phases recorded in `stills-manifest.json`; they are verified assets, not live renders — the status text says so.
- The pre-existing 8 px document overflow at 320 px exists on `main` and is out of scope; A3 guards against regression beyond that baseline.
- `.bundle/config` lost its `BUNDLE_PATH: vendor/bundle` line — required for `bundle exec jekyll` to resolve the rbenv gems in this environment; flagged for review.
- `rive publish` watermark note from X2/X3 carries forward.
- Lesson prose owned by X5 was only minimally refreshed (host copy around the card); deeper pedagogy rewrite remains X5 scope.

## Promotion

Pending external gate and cold review. The phase stops at VERIFYING.
