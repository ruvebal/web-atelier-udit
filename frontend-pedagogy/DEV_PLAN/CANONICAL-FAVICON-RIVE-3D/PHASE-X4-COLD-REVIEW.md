# PHASE-X4 cold review

**Verdict:** not eligible for DONE. This review does not mark X4 DONE, does not edit the implementation, and does not change `INDEX.md`, `PHASE-X4.md`, `PHASE-X4-REPORT.md`, or `DECISIONS.md`.

**Findings:** 2 P1, 3 P2. F1 and F2 block DONE. P2 items are for the orchestrator to fix or defer.

**Reviewed commit:** `b12d93874925ca6bd414ca8601981e2969dd9265` on `cascade/CANONICAL-FAVICON-RIVE-3D-4`. `git rev-parse HEAD` matches the gate log.

**Phase base:** `03f3ec84dc70a3050a550a30c2a7aaefc3ed9863` (X3 promotion). `git merge-base HEAD 03f3ec84` is that commit. `git diff 03f3ec84...HEAD` is `0b47e07` (host + `choreo.as` + rebuilt `.riv`), `032806c` (A2 wait), `b12d938` (evidence digest).

**Harness transcript read:** `PHASE-X4-VERIFY-LOG.md` (left untracked and unmodified). Commit `b12d938`, exit code 0, A1–A6 PASS lines, then Jekyll, `verify:publication`, `verify:citations`, then `PASS X4: 6 acceptance items`. This review re-ran the CPU extrusion suite, `verify-picking.mjs` on both rivs, and `rive --test`. It did not re-run `verify-rive-3d-host.mjs --all` (that rewrites `x4-checks` PNG/JSON). `build/rive.log`, `build/problems.log`, and `x3-checks/` were restored with `git checkout --` after the runs that rewrote them. `x4-checks` was not rewritten. `PHASE-X5.md` has no sentence this review invalidates.

## Acceptance

| Item | Result | Evidence |
| --- | --- | --- |
| A1 | Holds on the gate run | Gate log: `mouse=true(facet-01) touch=true(facet-12) fineMotion micro=true drag=true keyboard=true(facet-01) errors=0`. Committed `A1.json` keeps path booleans only (`mouse.ok`, `touch.ok`, `fineMotion.microOk/dragOk`, `keyboard.kbOk`). Host dispatches mouse, touch, a sub-3px move, a 14px drag, and Enter on a facet button. |
| A2 | Holds | Gate: `N=13 buttons=13 labels=true textNotColorOnly=true chipsMatchFills=true enabled=true (waited 912ms)`. `A2.json` has 13 labels, 13 `disabled: false`, chips `aria-hidden=true`, and manifest fills. The wait is bounded and a stuck disabled control still fails (see claim 5). |
| A3 | Metrics hold. The PASS line names the wrong bound. Pixels are outside the digest | `A3.json` records `docOverflow: 8` at 320 dark and light, `0` at 768 and 1280, `cardOverflow: 0` everywhere, canvas sized. Main's existing `_site` (mtime `2026-11-11T23:54:05Z`, no `rive-3d-host`) measures the same `docOverflow: 8` and `cardOverflow: 0` at 320. See F3 and F4. |
| A4 | Holds | Gate and committed `A4.json`: `mode=static`, `assembled.png` visible, canvas `display` not shown, facet click swaps to `facet-01.png` with `aria-pressed=true`, reset returns `assembled.png`. This review's reduced-motion load left `raf` at 0 before `destroy()`. |
| A5 | Holds for the still and a truthful status | Gate status is the forced-failure string. This review loaded `?force-rive3d-failure` and a Rive constructor that throws: both end in `mode=static`, `assembled.png`, canvas `display: none`, `console.log` native, zero page errors on the constructor path. The image is the assembled still, not `fava-mark-static.svg`. |
| A6 | Holds for `destroy()` on the live path and on the early static returns | Gate: `destroyed=true player/observer null=true raf=0->0 elapsedFrozen=true orbitDetached=true consoleRestored=true buttons=0 newPicks=0`. Reduced-motion `destroy()` returned `destroyed=true`, `raf` 0, `buttons` 0, console native, and did not throw. `pagehide` is not hooked on the early returns (F5). |

## Claim checks

### 1. Near margin is required, and rest pose is unchanged

`choreo.as` constants are `SELECT_OFFSET_Z = 0.08` and `SEPARATION_DIST = 0.1`. The new margin is `0.08 + 0.1 + 0.02 = 0.20`. The old margin is `0.05`. Picker clip is `pz > -nearZ + 0.001`.

A node scan of all 2676 vertices (formulas copied from `rive-3d-scene.mjs`, which matches `choreo.as`) at phase 0, yaw 0, pitch 0, every facet selected:

- separation weight is `0`
- unselected max view z equals the AABB near face (`-2.890`), old clearance `+0.051`, `oldCross: false`
- selected max view z is `0.08` closer (`-2.810`), old clearance `-0.029`, `oldCross: true`, new clearance `+0.121`, `crossed: 0`
- `halfH`, eye, and forward are identical for margin `0.05` and margin `0.20`

So the frontal rest clip is the selection pop alone. `0.08 > 0.05`. Separation is not what clips that pose.

Separation does clip a different pose. At phase `0.6` (separation weight `1`) with user pitch `0.9` and yaw `-1.2` or `1.2`, old clearance is `-0.0348` and `-0.0216`. The extra `0.15` of margin clears those. Phase `0.44` (the A4 screenshot phase) still has old clearance `+0.063`, which is why `selDiff` stays `70255` on both rivs.

Rest pixels: the HEAD picking run's `x3-rest-ref.png`, `x3-rest-after.png`, `x3-micro-before.png`, and `x3-micro-after.png` are byte-identical to `build/canonical-rest.png` (`cmp`). `canonical-rest.png` is not in the phase diff. Unselected rest does not cross either near plane, and ortho x/y do not use the near plane, so the rest color frame does not move.

The rebuilt `.riv` is the behavior change, not only the `.as` text. Parent script (`03f3ec8:verify-picking.mjs`, near `0.05`) against the HEAD riv (`557911` bytes) exits 1. The same script's A1 record on that run, from `x3-checks/A1.json` before it was restored:

```
FAIL A1: small=facet-03(18v) large=facet-01(810v) overlap=facet-05 cover=[facet-01,facet-05] picks=[2,0,0]
PARENT_EXIT:1
```

Third click: `want` facet 4 (`facet-05`), JS expected `{facet:4, selected:1, count:3}`, riv got `{facet:0, selected:0, count:1}`. Facet 0 was already selected, popped toward the camera, and won the overlap point, toggling itself off. The old mirror still clips that pop. `main.as`, `pick.as`, and `canonical-favicon.wgsl` are absent from the diff, so this is the near-plane edit in the compiled riv.

### 2 and 3. The updated X3 verifier passes on the pre-fix riv

HEAD `verify-picking.mjs --all-fixtures` on the HEAD riv: exit 0, `PASS A1` … `PASS A11`, including `picks=[4,2,0]` and `GPU sel-vs-unsel diff=70255`.

HEAD `verify-picking.mjs --all-fixtures` on the parent riv (`531256` bytes, then restored): exit 0, the same `PASS A1` line `picks=[4,2,0]`, the same A4 `selDiff=70255`.

`verify-fidelity.mjs` exit 0, A1–A8 PASS. Its near edit is the literal `0.08 + 0.1 + 0.02`. Color checks sample NDC x/y, which do not use near. That edit does not delete an assertion. It also does not prove the clip.

`rive <project> --test` (the X3 gate invocation) on the HEAD project: exit 0, `22/22 passed`. `build/rive.log` was restored afterward.

The A1 edit clicks overlap first on an empty bitset, then searches for small/large points that still hit after that selection. Those points exist whether or not the popped facet is clipped, so both rivs pass. The click the parent script uses — overlap after facet 0 is selected — is the one that distinguishes the margins, and the new script no longer makes it. See F1.

### 4. Host teardown and the constructor failure

`onMotionChange` is initialized at the `const` above the boot `try`. The mirror-load failure, reduced-motion, and forced-failure returns all sit after that line. `destroy` is a function declaration and calls `motionQuery.removeEventListener('change', onMotionChange)`.

Reduced-motion load in Chromium: `mode=static`, status names reduced motion, `assembled.png`, canvas `display: none`, `rafBefore: 0`. `destroy()` did not throw and left `raf: 0`, `buttons: 0`, console native.

Synchronous constructor: the CDN module's `Rive` constructor set `__riveCtorRan` and threw. Result: `ctorRan: true`, `mode=static`, status `Rive WebGL2 is unavailable; verified stills remain available.`, `assembled.png`, `raf: 0`, `consoleNative: true`, `errors: []`. The catch in `rive-3d-host.js` calls `unwrapConsole()` and then `enableStaticMode`. The probe shows the catch ran after the constructor and left the console native. `?force-rive3d-failure` returns before `wrapConsole()` and shows the forced-failure status with the same still.

`requestAnimationFrame(tick)` is only reached on the live `onLoad` path. Reduced motion never starts it.

### 5. A2 wait

`verify-rive-3d-host.mjs` sets `enableDeadline = enableStart + 6000`, breaks early only when no facet button is disabled, then requires `info.disabled.every((d) => d === false)` before `record('A2', ok, …)`. `process.exit(1)` follows a failed record. A control that stays disabled through the deadline fails A2. The gate's 912ms wait is inside that bound.

### 6. Evidence digest

`capture-x4-evidence.mjs` runs `--all` once and writes that stdout into all six `baseline/X4/A<n>.command.json` files. Each file's stdout contains its own `PASS A<n>:` line (checked for A1–A6). The shared touch id in those transcripts is `facet-01`. The gate log, a later `--all`, says `touch=true(facet-12)`. `verify-phase-evidence.mjs` hashes the stored transcript file and the JSON artifact. It does not compare the transcript to the live gate stdout.

Committed `A1.json` is `{paths:{mouse,touch,fineMotion,keyboard}, pageErrors:[]}` with booleans and `events: 1`. No facet id, no elapsed, no pick text. A failed path flips `ok` and changes the hash. Dropping the id does not leave "paths are tested" unexercised. It does mean two successful selections hash the same, which is why facet-12 and facet-01 can both sit on a green digest.

`A2.json` still has the `disabled` array. `pressed` and `enabledAfterMs` are absent. A stuck disabled control changes `disabled` and fails the PASS line, so the usability clause is still in the hashed file.

`A6.json` keeps teardown booleans (`elapsedFrozen`, `noNewPicks`, `rafZero`) and drops the absolute elapsed and pick counts. Those booleans are what the predicate uses.

`A4.json` and `A5.json` still contain `imgSrc` (`facet-01.png`, `assembled.png`), `pressed`, and status text. Those values are stable because the check always clicks the first button. They are selection residue the report said was dropped. They do not hide a failure that would change them.

`A3.json` keeps `docOverflow` and drops `clip`. The six PNGs are not in `PHASE-X4-EVIDENCE.json`. See F4.

### 7. Document-overflow baseline

The cap is the literal `BASELINE_DOC_OVERFLOW = 8` in `checkA3`, not a measurement taken during the check. This review measured main's already-built demo, without switching that checkout's branch:

```
mtime 2026-11-11T23:54:05.187Z
hasRive3dHost false
docOverflow 8
cardOverflow 0
```

The literal matches that baseline. A document overflow of 9 fails the predicate. Card overflow is a separate `<= 2` check, and the committed JSON has `0`. The PASS string interpolates the combined boolean as `docOverflow<=2px=true` while the JSON shows `8`. See F3.

### 8. `.bundle/config`

The phase diff deletes `BUNDLE_PATH: "vendor/bundle"`. Parent `03f3ec8` and `main` at `/Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit` (`git rev-parse --abbrev-ref HEAD` = `main`) both contain that line. HEAD is a single `---`. See F2. This review did not restore it.

### 9. Jekyll exclude and publication

`_config.yml` in the diff adds:

```
- assets/animations/fava/rive/animascript-3d/build/x3-checks
- assets/animations/fava/rive/animascript-3d/build/x4-checks
```

The gate log runs `npm run verify:publication` → `node scripts/verify-publication-safety.mjs` and `npm run verify:citations` → the same script with `--citations`. Both print their pass lines. `package.json` maps those script names to those commands. `find web-foundations/_site -path '*x3-checks*' -o -path '*x4-checks*'` is empty.

### 10. Uniform layout

`main.as` and `canonical-favicon.wgsl` are not in `git diff 03f3ec8...HEAD`. `updateUniforms` still stores `towardX/Y/Z` at bytes 144–152, padding at 156, and eight `u32` selection words at `160 + i * 4`. The WGSL `Frame` struct is `camDir: vec4<f32>` then `selection: array<vec4<u32>, 2>`. The near margin changes `nearZ` inside `Mat4.ortho`, which is the `mvp` at byte 0. It does not move `camDir` or the selection words. Depth is still `depth32float` and `CompareFunction.lessEqual`.

### 11. Would the new tests fail on `03f3ec8`?

The new picking verifier does not. It exits 0 on the parent riv (claim 2). That run does not prove the near-plane fix.

The host file and `verify-rive-3d-host.mjs` do not exist on the parent. This review did not boot the parent tree under the host verifier. The parent demo has no `rive-3d-host` and no facet-button group, so A2's `buttons === 13` check cannot pass there. That shows the host integration is new. It does not show that the near-margin edit is what the host tests lock.

## Pre-existing suite

From `web-foundations/`, all exit 0:

```
PASS X1 compiler: canonical N=13 ...
TEST_EXIT:0
PASS A1 … PASS A13   (verify-x1-acceptance.mjs)
X1_EXIT:0
PASS X1 evidence mutations: 7 forged receipts rejected
X1EV_EXIT:0
PASS A1 … PASS A8    (verify-fidelity.mjs)
FID_EXIT:0
PASS X3: 11 acceptance items
X3EV_EXIT:0
PASS X4: 6 acceptance items
X4EV_EXIT:0
```

`node --check` passed on `rive-3d-scene.mjs`, `rive-3d-host.js`, `capture-x4-evidence.mjs`, `capture-x4-stills.mjs`, `verify-fidelity.mjs`, `verify-picking.mjs`, `verify-rive-3d-host.mjs`, `verify-phase-evidence.mjs`, `test.mjs`, `verify-x1-acceptance.mjs`, and `test-x1-evidence-validator.mjs`. `import` of `rive-3d-scene.mjs` returned `createRive3DMirror` and `SELECT_OFFSET_Z 0.08`. `import` of `rive-3d-host.js` returned `initRive3DHost`. `capture-x4-evidence.mjs` and `capture-x4-stills.mjs` were syntax-checked only; importing them runs the capture.

## Findings

### F1 — P1 — blocks DONE

The X3 picking verifier this phase edited exits 0 on the parent `.riv` and on the HEAD `.riv`. It does not prove the near-plane change, and a revert of `fava_prismatic_3d.riv` to `03f3ec8` stays green.

HEAD script, parent riv (`531256` bytes), then the riv was restored (`git hash-object` matches `HEAD:`):

```
NEW_ON_OLD_RIV_EXIT:0
PASS A1: small=facet-03(18v) large=facet-01(810v) overlap=facet-05 cover=[facet-01,facet-05] picks=[4,2,0]
PASS A2: … all matched
PASS A4: … GPU sel-vs-unsel diff=70255
… PASS A11
```

Parent script, HEAD riv:

```
FAIL A1: small=facet-03(18v) large=facet-01(810v) overlap=facet-05 cover=[facet-01,facet-05] picks=[2,0,0]
PARENT_EXIT:1
```

The failing click is the one the new `checkA1` removed: after facet 0 is selected, the overlap point at `(284, 80)` is expected by the `0.05` mirror to return facet 4 and is returned by the new riv as facet 0 deselected. The new search plans small/large points that hit under both clip regimes, and it tests the empty-bitset overlap first, which both rivs answer with facet 4. A4's `selDiff=70255` is the same on both rivs because phase `0.44` does not cross the old near plane (clearance `+0.063`).

**Fix:** keep a phase-0 assertion that fails on the parent riv. After selecting the facet that sits on the frontal near face, a point on that popped facet must return that facet, and the same point must miss it when the near margin is `0.05`. Do not replace that click with a search that succeeds in both regimes.

### F2 — P1 — blocks DONE

This phase empties `web-foundations/.bundle/config`. Parent and main both commit the path. HEAD does not.

```
git show 03f3ec84:web-foundations/.bundle/config
---
BUNDLE_PATH: "vendor/bundle"

git show HEAD:web-foundations/.bundle/config
---

git -C /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit show HEAD:web-foundations/.bundle/config
---
BUNDLE_PATH: "vendor/bundle"
```

That checkout is on `main`. The gate's `site_build` passed with `RBENV_VERSION=3.3.11` after the wipe, because Bundler then used the rbenv gem home. `.github/workflows/pages.yml` runs `ruby/setup-ruby` with `bundler-cache: true` and `working-directory: web-foundations`, which reads this file. Deleting the path is a local workaround committed as the project contract.

**Fix:** put `BUNDLE_PATH: "vendor/bundle"` back. Keep the rbenv workaround out of the committed file.

### F3 — P2 — does not block DONE

`checkA3` records a pass as `docOverflow<=2px=true` while the predicate is `docOverflow <= 8 && cardOverflow <= 2`. The gate log repeats that string. Committed `A3.json` has `docOverflow: 8` at both 320px themes.

The `8` matches main's pre-X4 build (claim 7), so a document overflow above that baseline fails. The label tells a reader the document cap is 2px. Card overflow is the check that is actually `<= 2`, and it is `0`.

**Fix:** print `docOverflow<=8` and `cardOverflow<=2` as separate booleans, or measure the baseline in the check instead of naming a bound the predicate does not use.

### F4 — P2 — does not block DONE

`PHASE-X4-EVIDENCE.json` hashes `A3.json` and the command transcript. It does not hash `A3-320-dark.png`, `A3-320-light.png`, `A3-768-dark.png`, `A3-768-light.png`, `A3-1280-dark.png`, or `A3-1280-light.png`. Every `--all` run rewrites those files. A pixel change that keeps the same overflow numbers stays green under `verify-phase-evidence.mjs X4`.

This review looked at the committed 320 dark, 320 light, and 1280 dark captures. They show the dark and light page, the card, text facet labels with swatches, and a selected ring on `facet-06`. The 768 pair was not opened. The digest does not prove those pixels.

**Fix:** hash the six PNGs in the evidence receipt, or state in the acceptance line that the digest covers metrics only.

### F5 — P2 — does not block DONE

`window.addEventListener('pagehide', destroy)` is registered after the reduced-motion and forced-failure `return`s. Those paths hand back `destroy` and do not hook unload. `destroy()` itself removes the motion listener: the reduced-motion and forced-failure probes called it without a throw. A second `initRive3DHost` on the same document, without an explicit `destroy()`, stacks the button listeners and the `matchMedia` listener.

**Fix:** register the `pagehide` listener before the early returns.

## Downstream

`PHASE-X5.md` does not state the near margin, the bundle path, or the picking click order. No sentence in it is invalidated. This review did not edit it.
