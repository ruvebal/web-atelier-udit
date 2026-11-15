# PHASE-X3 closure cold review

**Verdict:** not marked DONE. No P0 and no P1 remain. Prior F4 stays open (P2, does not block DONE). This commit introduces no additional finding. This review does not edit the implementation, does not edit `INDEX.md`, `PHASE-X3-REPORT.md`, `PHASE-X3-COLD-REVIEW.md`, or `PHASE-X3-VERIFY-LOG.md`, and does not promote X3.

**Reviewed commit:** `85f6ff7e73f5bc2244987435611fb8ae5525d12f` on `cascade/CANONICAL-FAVICON-RIVE-3D-3`.

**Parent:** `ef6e9001589fc19a7b63d8f8d2ce7e43341c7cf6`.

**Phase base:** `git merge-base HEAD 030ed73` = `030ed73a951d23e1f298d19944108127123abfd0`.

**New findings:** none.

**Prior findings:** F1, F2, F3, F5, F6 closed. F4 not closed.

**Harness transcript read:** `PHASE-X3-VERIFY-LOG.md`. It names commit `85f6ff7`, exit code 0, `rive --test` 22/22, then PASS A1–A11, then `verify-phase-evidence.mjs X3`. This review did not re-run that gate, `rive --test`, or `verify-picking.mjs`. The gate does not run `verify-fidelity.mjs`. This review did. `build/rive.log` was already dirty; its sha256 is still `a85b7dc2b21718f51c7ef5503f9b78220c9ae4d489ccb9e69527e666d574f734` (unchanged by this review).

## Closure of the prior review

| Prior | Result | Why |
| --- | --- | --- |
| F1 P0 uniform at byte 144 | Closed | `main.as` stores `camDir` at 144 and eight `u32` words at 160, and calls `updateUniforms` from `toggleFacet` and `resetSelection`. A one-facet bitset laid out the parent way leaves the shader word at 160 equal to 0; the current stores leave it equal to 1. The selected capture is a recolor of the same pose (AE 70255). Both captures sit in the extruded plateau, so the extra click frames are not the color change. |
| F2 P1 stride 36 | Closed | Current `verify-fidelity.mjs` exits 0 (stride 40, four attributes, Z at byte 8, facet id at byte 36, `facetIdBad=0`). The parent script, run on this same blob, exits 1. |
| F3 P2 deadzone not advanced | Closed | `checkA8` advances 55 frames after a 1 px move and requires AE 0, then a drag longer than 3 px with AE > 0. Committed captures: micro AE 0, drag AE 58108. The new script would also pass on `ef6e900`, because that commit already had the 3 px deadzone. The old script did not advance, so deleting the deadzone still passed it. |
| F4 P2 z-offset and cull text | Not closed | The reset click and the cull string landed. The z-offset select and probe still both resolve to facet 0. See F4 below. |
| F5 P2 ±1e-5 tie band | Closed | `PICK_TIE_EPS` is gone. A tie is `d == bestDepth` on the `f32` depth scalar. The new rive test builds a 1e-6 view-z pair and expects the nearer facet. Under the parent band that pair is a tie, so the later facet wins and the flip where the earlier facet is nearer fails. |
| F6 P2 `dampStep(dt=5)` | Closed | `interaction-test.as` constructs `Main`, calls `advance(5)`, and expects `dampStep(0, 1, 0.5, λ)`. The harness names that test among the 22 passes. The same assertion would pass on `ef6e900`, because `advance` already clamped there. The parent test never called `Main.advance`. |

### F1 evidence

Current stores (`main.as`):

```
store<f32>(address + 144, <f32>frame.towardX);
store<f32>(address + 148, <f32>frame.towardY);
store<f32>(address + 152, <f32>frame.towardZ);
store<f32>(address + 156, 0);
store<u32>(address + 160 + i * 4, this.selWords[i]);  // i = 0..7
```

`toggleFacet` and `resetSelection` both call `updateUniforms()` after updating `selWords`.

Parent (`git show ef6e900:…/main.as`) writes `selWords[i]` at `address + 144 + i * 4` and does not call `updateUniforms` from toggle or reset. `advance` still uploads, so a following `advance 1` would publish the bad layout.

```
node --input-type=module   # Buffer stores matching the two layouts, selWords[0] = 1
{
  "current": { "camDirZ": 1, "shaderWord0": 1, "facet0Bit": 1 },
  "parent":  { "camDirXasF32": 1.401298464324817e-45, "shaderWord0at160": 0, "facet0BitShaderReads": 0 }
}
```

WGSL `Frame` is `mvp` (0), five `vec4<f32>` through byte 143, `camDir` at 144, `selection: array<vec4<u32>, 2>` at 160. `gpu-manifest.json` has `minBindingSize` 192 and `bufferSize` 192. Facets 0–12 live in word 0. The parent upload leaves that word 0, so `selBit` stays 0.

A4 captures, this commit, ImageMagick:

```
magick …/x3-a4-selected.png   → sel center=srgba(109,69,17,1) corner=srgba(6,10,23,1)
magick …/x3-a4-unselected.png → unsel center=srgba(13,35,97,1) corner=srgba(6,10,23,1)
magick compare -metric AE unselected selected null:
70255 (0.203284)
```

The corner background matches. The mark changes from blue to brown, which is the highlight path (`highlight` is `0.95, 0.6, 0.15`, and side faces are shaded). The two sessions are not the same frame: `advance 238` + `advance 1` is frame 239 (phase 0.4426); the selected session adds a 3-tick click, so it is frame 242 (phase 0.4481). Both are before `SEP_RISE_START` 0.45 (`sep` 0) and both saturate extrusion, including the last facet:

```
{"frames":239,"phase":0.4425925925925926,"lastFacetE":1,"facet0E":1}
{"frames":242,"phase":0.44814814814814813,"lastFacetE":1,"facet0E":1}
```

A parent upload would draw the unselected material at both of those frames. `selDiff > 0` would fail. This review did not re-render `ef6e900`.

### F2 evidence

From `web-foundations/`:

```
node scripts/svg-extrusion/verify-fidelity.mjs
PASS A1: pipeline vertex layout 40B/4attrs, depth32float write=on, blobs 107040B+10392B, counts 2676/5196 from provider
PASS A5: depth = 0.04+(0.22-0.04)*sqrt(area/max): manifest dev 2.5e-10, packed Z dev 3.6e-9/3.6e-9, largest facet facet-01 deepest in buffer
EXIT 0
```

A1's source requires `arrayStride === 40`, attributes `float32x3@0:0`, `float32x3@1:12`, `float32x3@2:24`, `float32@3:36`, and `depthCompare === 'less-equal'`. A5 reads Z at `v * 40 + 8` and the facet index at `v * 40 + 36`.

```
node  # read favicon-vertices.bin against manifest.facets
{"bytes":107040,"verts":2676,"checked":2676,"facetIdBad":0,"zByteOfV0":0}
```

Parent checker (`git show ef6e900:web-foundations/scripts/svg-extrusion/verify-fidelity.mjs`, run from `scripts/svg-extrusion/` so its paths resolve, then deleted):

```
FAIL A1: vertex buffer layout missing or wrong stride
FAIL A5: vertex blob 107040 != 96336
EXIT 1
```

`favicon-vertices.bin` is not in `git diff ef6e900..HEAD`. The new checker would also exit 0 on `ef6e900`'s blob. That does not reopen F2: the defect was the checker, and the parent checker still exits 1 on the blob this commit ships. The byte-36 loop is new; `facetIdBad=0` is the run of it.

### F3 evidence

`checkA8` in `verify-picking.mjs`:

- reference: `advance 60`, screenshot
- micro: pointer down `(10,10)`, moves to `(11,10)`, `(10,11)`, `(11,11)`, up, `advance 55`, screenshot
- drag: down `(400,240)`, move `(430,260)` (30 px by 20 px), move `(440,255)`, up, `advance 56`, screenshot

`ok` is `microDiff === 0 && dragDiff > 0`. This review's compare of the committed PNGs:

```
AE x3-a8-ref.png vs x3-micro-after.png → 0 (0)
AE x3-a8-ref.png vs x3-drag-after.png → 58108 (0.168137)
```

`A8.json` records the same pair and empty pick logs. A 1 px path never crosses `DRAG_DEADZONE` (3). The drag does. Deleting the deadzone would put a yaw target on the micro path; after 55 frames at λ=6 that target is essentially reached, and the pixels would move. This review did not delete it. The assertion would pass on `ef6e900`'s `main.as` for the same reason the deadzone was already there. The prior hole was the missing `advance`, which this script no longer has.

### F5 evidence

Parent `pick.as`: `eps = choreo.PICK_TIE_EPS` (`0.00001`) and `tie = pz > bestZ - eps && pz < bestZ + eps`, then the later facet wins inside the band.

Current `pick.as`: `let d = <f32>((-pz - frame.nearZ) / (frame.farZ - frame.nearZ)); let tie = d == bestDepth;` and `d < bestDepth` keeps the nearer facet. `PICK_TIE_EPS` is gone from `choreo.as` and from the JS mirror (`Math.fround` then `depth === bestDepth`).

The new test `1e-6 view-z separation keeps the nearer facet` sets the model-z gap so the f32 view-z delta is 1e-6 and expects the nearer facet on both flips. `1e-6 < 1e-5`, so the parent treats both flips as ties and returns the later facet. The flip whose nearer facet is the earlier one fails. The harness transcript includes `PASS 1e-6 view-z separation keeps the nearer facet`. This review did not re-run `rive --test`.

### F6 evidence

Current test (`interaction-test.as`):

```
let m = new Main();
m.userYawTarget = 1;
m.advance(5);
let want = choreo.dampStep(0, 1, 0.5, choreo.ORBIT_LAMBDA);
expect.that(Math.abs(m.userYaw - want) < 1e-9).is(true);
expect.that(m.userYaw < choreo.dampStep(0, 1, 5, choreo.ORBIT_LAMBDA)).is(true);
expect.that(m.elapsed == 5).is(true);
```

`advance` does `this.elapsed += seconds` and `dt = Math.min(seconds, 0.5)`. JS of the same formula:

```
{"dt0_5":0.950212931632136,"dt5":0.9999999999999064,"gap":0.04978706836777036}
```

Parent test: `choreo.dampStep(0, 1, 5, choreo.ORBIT_LAMBDA)` and no `Main`. Parent `advance` already used `Math.min(seconds, 0.5)`, so the new assertion would pass on `ef6e900`. The harness line `PASS advance clamps the damping step to 0.5s on long frames` is the first time that path is what the suite calls. This review did not re-run it.

## F4 — P2 — does not block DONE — still open

The required cull string and the clean bitset are in the tree. The z-offset pair is not a depth contest.

`checkA2A3` now clicks an empty point (`8,8`) after occlusion and before the z-offset pair. `A2-A3.json` records that click as `reset`, then:

| Event | Planned facet | Got |
| --- | --- | --- |
| zoffset-select `(285,327)` | fixture facet 1 (`facet-02`) | facet 0, selected 1 |
| zoffset-probe `(309,327)` | the point that wins only while facet 1 is selected | facet 0, selected 0 |

The PASS line still prints the planned id: `zoff=facet-02`. The clicks toggled facet 0.

The cause is the tick phase, which the previous review did not measure. `--commands` spends one 60 fps frame on each pointer down, move, and up, so `pointer click` is 3 frames (Rive CLI docs: "click is a move, a press and a release with a frame between each"). After `advance 238`, the select click's up-tick is frame 247, phase `247/60/9 = 0.4574`, and `separation(0.4574) = 0.007`. The coordinates were chosen at phase 0.44, where separation is 0.

Independent `pickJS` (library copy of `verify-picking.mjs` with the rive runner stripped, then deleted; no `rive` process):

```
{"name":"zoffset-select","frame":247,"phase":0.457407,"sep":0.007075,"atFrame":0,"atPlan":1,"frameMinus1":0,"framePlus1":0,"frameMinus3":1}
{"label":"plan-0.44","selfUnsel":1,"probeUnsel":0,"probeSelFacet1":1}
{"label":"tick-247","selfUnsel":0,"probeUnsel":0,"selfSelFacet1":1,"probeSelFacet1":1}
```

At phase 0.44 the self point hits facet 1, and the probe hits facet 1 only after facet 1 is selected. At frame 247 the self point hits facet 0, so the session never selects facet 1. The probe coordinate would still show the offset if facet 1 were selected (`probeUnsel` 0, `probeSelFacet1` 1). Frame 244, three frames earlier, still hits facet 1. The runtime log got facet 0, which matches frame 247 and does not match the planning phase. Using phase 0.44 as the expectation would fail this event. A ±1 frame slip would not: frames 246 and 248 also return facet 0.

Occlusion, touch, both separated clicks, and the rest cull return the same facet at the tick frame and at the planning phase. The cull click at frame 564 is phase 0.0444, not 0, and still returns facet 4. The PASS line `cull=facet-05(back=facet-01)` matches `A2-A3.json` (`want` 4, `backFacet` 0). That half of the old F4 is done. The harness transcript's `PASS selected offset toward camera can win a depth contest` is the synthetic mesh, not this session.

**Fix:** choose the z-offset self point and probe point at the frame index the up-tick actually reaches, with a clear bitset, and fail the item unless the select click's facet is the fixture facet and the probe click's facet changes to that fixture only after the selection. The self coordinate `(285,327)` cannot be reused at frame 247.

## Claim checks the previous review did not see

### f64 basis and f32 Mat4

They are not two names for one matrix. `computeCamera` fills `frame.eye/right/upv/fwd` in f64 and uses that basis for the ortho fit. `Mat4.lookAt` is called with `<f32>` eye, centre, and up, and `frame.mvp = projection * view` is what the shader multiplies. `pick.as` builds the ray from `frame.eye/right/upv/fwd` and never reads `frame.view`. The JS mirror (`computeCam` in `verify-picking.mjs`) repeats the f64 basis and does not build a Mat4.

The split is written at the fields and at the fit:

```
// f64 camera basis shared verbatim with the JS verifier mirror; the GPU
// path keeps using the f32 Mat4s below.
```

```
// Fit the ortho volume to the rotated bounding box on the shared f64
// basis — identical arithmetic to the verifier mirror, so picker depth
// comparisons are bit-exact. The f32 Mat4 above still feeds the GPU MVP.
```

"Bit-exact" in that comment is the JS mirror, not the GPU. A class comment above `CameraFrame` still says the frame is shared verbatim with the uniform block. The field comments are the ones that match the code.

f32-rounded lookAt versus the f64 basis at phase 0.5 (inspect weight saturated), same near/far:

```
{"maxAbsViewZ":2.3841857776929487e-7,"maxAbsDepth32":2.980232238769531e-7,"sameNumbers":false}
```

That gap is smaller than the 1e-6 pair the new test keeps ordered. It is large enough that a GPU `depth32float` from the Mat4 and the picker's `f32` of the f64 view-z are not the same bits. Exact coplanar hits stay ties inside each model, because both points share one world position. `PHASE-X4.md` does not depend on those bits being equal.

### `--commands` frame index

`expectSequenceForMixed` uses `frameAt = [241, 244, 247, 250, 253, 396, 399, 564]`. That is `advance 238`, then five 3-tick picks, `advance 140`, two 3-tick picks, `advance 162`, one 3-tick pick. `pickJS` at those elapsed times matches `A2-A3.json` `got` on every event, including the reset (`-1`) and the cull (facet 4).

A wrong phase fails the z-offset select: planning phase 0.44 and frame 244 both return facet 1, and the runtime log is facet 0. The other seven events return the same id at the planning phase, so they do not police the index. The z-offset select does, and it is also why F4 is still open.

### PHASE-X4 192-byte contract

`PHASE-X4.md` now says: 192 bytes; camera and choreography through byte 143; `camDir` at 144; padding at 156; eight `u32` words at 160–191; `updateUniforms()` on `advance`, `toggleFacet`, and `resetSelection`.

| Contract | Code |
| --- | --- |
| 192 bytes | `gpu-manifest.json` `minBindingSize` 192, uniform `bufferSize` 192. WGSL `Frame` ends at 192. |
| through byte 143 | `mvp` 0–63, `c0`–`c3` and `highlight` 64–143. Last highlight store is byte 140. |
| `camDir` at 144 | `store<f32>` at 144, 148, 152. WGSL `camDir: vec4<f32>` follows `highlight`. |
| padding at 156 | `store<f32>(address + 156, 0)`. |
| words at 160–191 | `store<u32>(address + 160 + i * 4)` for `i` in 0..7. WGSL `selection: array<vec4<u32>, 2>`. Shader index `selection[word >> 2][word & 3]` is word 0 at byte 160. |
| upload sites | `advance`, `toggleFacet`, `resetSelection`. `init` and `resize` also upload. |

The contract matches `main.as` and the WGSL struct. This review did not edit `PHASE-X4.md`. Nothing in this commit makes that file false.

## Acceptance

| Item | Result | Evidence |
| --- | --- | --- |
| A1 | Holds on the transcript | `PASS A1: small=facet-03(18v) large=facet-01(810v) overlap=facet-05 … picks=[2,0,4]`. Not re-run. |
| A2 | Holds except the z-offset contest | Transcript and `A2-A3.json`: occlusion, reset, touch, two separated picks, cull facet 4. Z-offset clicks are F4. |
| A3 | Holds for the CPU mirror | Transcript: nearest-positive picks matched the JS mirror. `pick.as` keeps `hit > 1e-9` and the smaller depth. Not re-run. |
| A4 | Holds, including the GPU recolor | Transcript toggle `sel 1->0` and `GPU sel-vs-unsel diff=70255`. This review's AE and pixel samples match that diff. Geometry hashes in `A4.json` are unchanged. |
| A5 | Holds on the transcript | `reset logged=true`, pixel diff 0. Not re-run. |
| A6 | Holds on the transcript | 400×480 and 1200×480 centre and off-point. Not re-run. |
| A7 | Holds on the transcript for the logged picks | `picks 0,0 vs expected 0,0 count=0`. Both fixtures are facet 0, as the previous review said. This commit did not change that session. |
| A8 | Holds on the committed captures | Micro AE 0 after 55 frames, drag AE 58108. |
| A9 | Holds on the transcript | pixel diffs `[0,0]`. Not re-run. |
| A10 | Holds on the transcript and on the `advance(5)` source | `960ms damping diffs=[0,0]`; long-frame test is F6. |
| A11 | Holds on the transcript | identity, 90°, 45° midpoint. Not re-run. |
| lessEqual, later source order | Holds in source | `gpu-manifest.json` `depthCompare` `less-equal`. On equal `f32` depth the later facet wins (`facet > bestFacet`). |

`fava-mark-static.svg` is not in `git diff ef6e900..HEAD`. `FACET_COUNT` still comes from the generated module. Fidelity A5 reports packed Z within 3.6e-9 of `-depth`. Pointer handlers still pass `event.position` into `pickFacet`; yaw damping stays in `advance`. No `openai`, `anthropic`, or `langchain` import in the animascript scene or the extrusion scripts.

## Agentic-change checks

| Check | Result |
| --- | --- |
| Load the modules that changed | `node --check` on `test.mjs`, `verify-x1-acceptance.mjs`, `test-x1-evidence-validator.mjs`, `verify-fidelity.mjs`, and `verify-picking.mjs` exited 0. Importing `verify-picking.mjs` would run a check and call `rive`, so it was not imported. The harness transcript is the load of `choreo.as`, `pick.as`, `main.as`, and `interaction-test.as`. |
| Pre-existing suite | `test.mjs` 0, `verify-x1-acceptance.mjs` 0 (A1–A13), `test-x1-evidence-validator.mjs` 0, `verify-fidelity.mjs` 0. |
| Would the new assertions fail on `ef6e900`? | Uniform layout: yes, shader word stays 0 (F1). Parent fidelity script: yes, exit 1 (F2). The new fidelity script: no, the blob was already stride 40. The 1e-6 test: yes, parent band (F5). `advance(5)` and the new A8 script: no, those behaviors were already in `ef6e900` (F3, F6). Z-offset frame index: the planning-phase expectation returns facet 1 where the log is facet 0, so that expectation fails on this commit; it is how F4 stays open. |
| Unpack arity | The closure does not change `expectSequence`'s `{expected, selSet}` or `runCommands`' `{picks, resets, errs, raw}`. Callers still read those fields. |
| Discriminated fields | `camDir` and the selection words are different byte ranges. The f64 basis and the f32 `Mat4` are different values (claim check above). |
| PHASE-X4 instructions | Grep-and-read against `main.as`, `canonical-favicon.wgsl`, and `gpu-manifest.json`. They match. |

## Downstream

`PHASE-X4.md` describes the uniform this commit uploads. It does not need an amendment. No later phase file states a fact this commit has made false. This review did not edit `PHASE-X4.md`.

## Eligibility

F1 and F2 were the blockers. Both are closed on the evidence above. F4's z-offset session is still the wrong facet, at P2, and does not by itself block DONE. F3, F5, and F6 are closed.

**Not marked DONE. Not promoted. No P0 or P1 remains. Prior F4 stays open for the product owner to fix or defer.**

## Commands this review ran

| Command | Exit |
| --- | --- |
| `node --check scripts/svg-extrusion/test.mjs` | 0 |
| `node --check scripts/svg-extrusion/verify-x1-acceptance.mjs` | 0 |
| `node --check scripts/svg-extrusion/test-x1-evidence-validator.mjs` | 0 |
| `node --check scripts/svg-extrusion/verify-fidelity.mjs` | 0 |
| `node --check scripts/svg-extrusion/verify-picking.mjs` | 0 |
| `node scripts/svg-extrusion/test.mjs` | 0 |
| `node scripts/svg-extrusion/verify-x1-acceptance.mjs` | 0 |
| `node scripts/svg-extrusion/test-x1-evidence-validator.mjs` | 0 |
| `node scripts/svg-extrusion/verify-fidelity.mjs` | 0 |
| parent `verify-fidelity.mjs` from `ef6e900`, same blob | 1 |
| `magick compare -metric AE` on the A4 pair | 0 (metric 70255) |
| `magick compare -metric AE` on A8 micro / drag | 0 (metrics 0 and 58108) |

Working directory for the node scripts: `web-foundations/`. The parent fidelity copy and the pickJS probe file were removed. `git status` afterwards shows the same pre-existing dirty `build/rive.log` and the untracked prior review and verify log.

## Not run

`rive --test`, `rive --commands`, `verify-picking.mjs`, `PHASE-X3.exit-gate.sh`, `pnpm build`, and a re-render of `ef6e900`. The 22/22 lines and the A1–A11 PASS lines are the harness transcript, not a second run. The deadzone was not deleted to watch A8 go red. The X2 oblique equal-depth pixel count was not re-measured.
