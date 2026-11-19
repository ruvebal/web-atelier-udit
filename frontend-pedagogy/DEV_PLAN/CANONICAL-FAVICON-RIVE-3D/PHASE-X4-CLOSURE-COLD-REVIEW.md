# PHASE-X4 closure cold review

**Verdict:** eligible for DONE. This review does not mark X4 DONE, does not edit the implementation, and does not change `INDEX.md` or `PHASE-X4-REPORT.md`.

**Findings:** none. The written verdict is from local Ollama `qwen2.5:72b-instruct-q4_K_M` at `http://localhost:11434` (`ollama.Client`, timeout 600s, `temperature` 0, `format` json). `ollama ps` showed that model on the GPU after the call.

**Reviewed code commit:** `01a53612db3d83e8c56406c31494d988aa018fc3`. The gate log names that commit and exits 0. `34d35cb` is a later docs commit (D52, D53, PHASE-X9) and is not part of the X4 code under test.

**Model limit:** the model cannot run the shell. The commands below were run in this worktree and given to it as the only evidence. It was told not to invent further commands. Its JSON is filed as returned:

```json
{"eligible_for_done": true, "summary": "All findings from the prior review have been addressed. The fixes for F1, F2, and F5 are confirmed. A3 and A12 are validated with the provided evidence, and the severity rules are met.", "findings": []}
```

## Evidence packet

Exit gate, commit `01a53612db3d83e8c56406c31494d988aa018fc3`, exit 0:

```
PASS A1: mouse=true(facet-01) touch=true(facet-12) fineMotion micro=true drag=true keyboard=true(facet-01) errors=0
PASS A2: N=13 buttons=13 labels=true textNotColorOnly=true chipsMatchFills=true enabled=true (waited 911ms for pick-busy to clear)
PASS A3: 6 captures 320/768/1280 x dark/light; cardOverflow<=2px && docOverflow<=8px(baseline)=true canvasSized=true
PASS A4: mode=static assembled=true canvasHidden=true selectStill=true reset=true errors=0
PASS A5: mode=static truthful=true fallbackImg=true controls=true status="The GPU scene could not load (forced failure test); verified stills remain avail"
PASS A6: destroyed=true player/observer null=true raf=0->0 elapsedFrozen=true orbitDetached=true consoleRestored=true buttons=0 newPicks=0
```

Jekyll, publication safety, and citation conformance passed, then `PASS X4: 6 acceptance items`. After that gate, the six A3 PNGs were not dirty.

```
node scripts/svg-extrusion/verify-picking.mjs A12
PASS A12: near-margin sel=(304,80) probe=(190,80) old0.05->facet-05 new0.20->facet-01 picks=[{"facet":0,"selected":1,"count":1},{"facet":0,"selected":0,"count":0}]
```

Exit 0. `web-foundations/.bundle/config` contains `BUNDLE_PATH: "vendor/bundle"`. `rive-3d-host.js` registers `pagehide` → `destroy` at line 367, before the mirror-load return (382), the reduced-motion return (394), and the forced-failure return (398).

A3 measures overflow on the displayed canvas, then sets `visibility: hidden` on that canvas and paints the assembled still in the same box. The digest hashes those stills. The model was also told that `verify-picking.mjs` copies the near-margin formula instead of parsing `choreo.as`, so a source-only margin edit that is not rebuilt does not fail A12, and that this is the same limit as the other `.riv` checks. It did not file a finding.
