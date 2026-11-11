# PHASE-X0 · Freeze the measurable baseline

**Status:** VERIFYING  
**Worktree:** `/Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-0`  
**Branch:** `cascade/CANONICAL-FAVICON-RIVE-3D-0`  
**Captured:** 2026-11-11 (UTC)

## Baseline source

The sole geometry source remains [`fava-mark-static.svg`](../../../web-foundations/docs/assets/icons/fava-mark-static.svg). Its SHA-256 is `90cfa8a5dfb290e92515647141369111c821427c71fec3f402873c1221db51ad`. The machine-generated [source inventory](baseline/X0/source-inventory.json) records `viewBox="0 0 1024 920"`, 13 source paths, and the shared non-uniform transform `scale(0.610979 0.61089)`. The 13 count is the current golden fixture’s observed/expected count; all planned implementation capacity is N-derived.

Source-order command inventory: 13 `M`, 37 `L`, 97 `C`, 13 `Z` (160 commands total). Each path is closed; all source paths use only `M/L/C/Z`. Generated IDs are `facet-01` through `facet-13` for this fixture, assigned by source order. The command-by-facet inventory and original path command sequences are in the JSON artifact.

## Rive and browser probes

The tracked current asset [`fava_prismatic_3d.riv`](../../../web-foundations/docs/assets/animations/fava/rive/animascript-3d/build/fava_prismatic_3d.riv) is 117,084 bytes with SHA-256 `862beb6f58be8a6d8c08ebc4658deb6748794cb003c920776afb53374ae1eed1`. It remains byte-identical to the tracked baseline. `rive ... --verify --format=json` exits 0 with zero errors/warnings, but reports `riv:null` and `bytes:0`, so that command verifies the editable source project rather than the tracked binary. The existing signed binary was loaded by the built comparison route in Chrome: its runtime status changed to “Signed Rive GPU Canvas scene: real geometry, lighting, and depth testing,” and the browser rendered the current generic prism specimen. The static fallback WebP also reported `complete=true`. The captured [route DOM](baseline/X0/route-runtime-dom.html) and [browser metrics](baseline/X0/route-runtime-metrics.json) preserve this evidence.

Rive CLI 1.9.2 successfully emitted data, semantics, and a GPU manifest. The manifest contains one triangle-list pipeline, back-face culling, a writable `depth32float` attachment, and no skipped GPU objects. The current data dump has no view model; the Rive semantics tree has zero roots. The CLI’s 720×480 screenshot contains only the artboard background even though the browser route renders the same tracked asset. Preserve both outputs: the headless capture is not a substitute for browser rendering.

Desktop route capture is 1440×980; the actual Chrome viewport used for the 3D card capture is 1440×893. The narrow capture is 390×844. Browser metrics report document width equal to viewport width at both sizes (1433/1440 desktop; 390/390 narrow). The horizontal comparison nav scrolls inside its own region. Captures show the current fallback and runtime card; this is baseline evidence, not an X4 responsive certification.

## Local research anchor recheck

The [anchor verification artifact](baseline/X0/research-anchor-verification.json) resolves the 15 retained node IDs against their local extraction databases and stores each node’s full extracted text plus the live `ahmes query --cite` result. The Haverbeke, Vince, and Angel/Shreiner anchors (9 nodes total) remain metadata-backed and evaluator-safe at confidence 0.95. Their verified content covers SVG’s per-element DOM interaction, world-to-camera then camera-to-projection transforms, time-parameterized interpolation, quaternion interpolation, cubic Bézier representation, and the setup cost of modern GPU APIs.

All six ACM CS2023 anchors resolve to full page text, but current citation output is slug-derived (`source=slug`, `confidence=0.60`, `evaluator_safe=no`). This differs from the earlier neural-match note’s 0.70 observation; that note now includes this live correction. Keep the curriculum source as a source-only bibliography gap and omit any polished author-date citation until metadata is repaired from the title page. The local claims support architecture and teaching boundaries; they do not source the implementation algorithms listed below.

## Downstream amendments

- `DECISIONS.md` D3 and D25–D28 make facet count N data-driven across buffers, draw counts, source IDs, picking, and semantic controls; 13 is fixture-only.
- X1 now owns the SVG-down-Y conversion, transform normalization, winding repair, cubic flattening, and signed area/centroid conventions. Adaptive subdivision and shoelace area/centroid are identified as engineering derivations.
- X2 now fixes model/world → camera/view → perspective ordering and cross-product normal derivation; geometry buffers and draw counts must use N.
- X3 now separates elapsed-time position interpolation from quaternion orientation interpolation and labels signed-area inclusion, Möller–Trumbore picking, and exponential damping as engineering derivations.
- X4 generates N semantic controls and strengthens narrow-layout capture review to require no page-level horizontal overflow. X0 measured 390/390 at the current route; X4 still owns implementation verification.
- X5 labels cubic evaluation/flattening, shoelace area/centroid, triangle signed-area inclusion, Möller–Trumbore picking, exponential damping, and D4 area-to-depth/GPU depth mapping as engineering derivations unless a verified source directly supports them. It preserves the ACM metadata gap as source-only.
- X6 adds multi-count fixture evidence; X7’s skill acceptance now requires the data-driven N contract and coordinate conventions.
- The X0 risk about differences between GPU and browser capture is retained and made concrete by the blank CLI image and successful browser render.

The current Rive WGSL still contains the existing specimen’s 13-instance arrays and draw count. Do not mistake that baseline implementation for the new system contract: X2 replaces it with generated N-sized buffers.

## Tools and developer checks

The dated local tool inventory is in [`tool-versions.json`](baseline/X0/tool-versions.json). Rive CLI 1.9.2, Node 24.22.1, npm 11.19.1, pnpm 10.30.0, Chrome 157.0.8103.51, Ruby 3.3.11, Bundler 2.5.22, and Jekyll 3.10.0 were recorded on 2026-11-11. The system Ruby is 2.6.10; the build used the already installed rbenv Ruby 3.3.11 to match `Gemfile.lock`’s Bundler 2.5.22.

`pnpm install --frozen-lockfile` completed. The final-tree `pnpm build` completed PostCSS and Jekyll processing (200 HTML files), then exited 1 at the existing publication-safety gate: `_site/assets/js/neoplastic/SOURCE.txt: local studio path`. Full output is in [pnpm-build-final.log](baseline/X0/pnpm-build-final.log); no lesson/source file was changed to bypass the finding. `pnpm-build-result.json` records the command and exit code. JavaScript syntax, Python syntax, the phase receipt validator, and its negative cases are recorded with X0 evidence.

## Acceptance evidence and handoff

The machine-readable [X0 evidence receipt](PHASE-X0-EVIDENCE.json) contains exactly A1–A7 from this runbook. `verify-phase-evidence.mjs X0` checks those IDs against this runbook’s Acceptance section, exit codes, artifact existence and SHA-256 digests, unresolved `pending` values, and visual capture digests. It is intended for the later phase gates; the external X0 gate has not been run.

The phase remains **VERIFYING** for an independent cold review. This report does not promote the phase to DONE and does not open X1.
