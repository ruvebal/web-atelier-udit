# Verify log — PHASE-X10.md

**Run by:** cascade-harness.sh (runner process, not the implementing session)
**Worktree:** /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-10
**Commit:** 8d1bd70f7d6c802c6a50bd98011ef2ca009b6318
**Started:** 2026-11-17T12:59:15Z

```
[13:59:15.545] rive  verified (0 bytes, 117ms, 0 errors, 0 warnings)
[13:59:15.653] rive  built (754307 bytes, 69ms, 0 errors, 0 warnings)
[13:59:15.657] rive  loop phase
[13:59:15.658] rive    PASS phase wraps at the loop period
[13:59:15.658] rive    PASS extrusion is 0 at rest and 1 through inspect
[13:59:15.658] rive    PASS extrude staggers facet 0 ahead of the last facet
[13:59:15.658] rive    PASS early staggered extrusion keeps the camera exactly frontal
[13:59:15.658] rive    PASS retract runs in reverse facet order
[13:59:15.658] rive    PASS separation peaks mid-inspect and is 0 at rest
[13:59:15.658] rive  quaternion camera
[13:59:15.658] rive    PASS identity orientation looks down -z
[13:59:15.658] rive    PASS 90 degree yaw rotates forward to -x
[13:59:15.658] rive    PASS slerp midpoint of identity and 90deg is 45deg
[13:59:15.658] rive    PASS near-identical quaternions slerp stably
[13:59:15.658] rive  frame-rate independent damping
[13:59:15.658] rive    PASS equal elapsed time converges identically at 30/60/144Hz
[13:59:15.658] rive    PASS advance clamps the damping step to 0.5s on long frames
[13:59:15.658] rive  hashDir
[13:59:15.658] rive    PASS deterministic and unit length
[13:59:15.658] rive    PASS distinct facets get distinct directions
[13:59:15.658] rive  picker on synthetic meshes
[13:59:15.658] rive    PASS single front facet picks at centre, misses at corner
[13:59:15.658] rive    PASS 1e-6 view-z separation keeps the nearer facet
[13:59:15.658] rive    PASS equal depth resolves to later source-order facet
[13:59:15.658] rive    PASS nearest positive hit wins over source order
[13:59:15.658] rive    PASS selected offset toward camera can win a depth contest
[13:59:15.658] rive    PASS collapsed backs are invisible at rest, visible when extruded
[13:59:15.658] rive    PASS narrow and wide aspects still map the centre ray
[13:59:15.658] rive  picker on the real blobs
[13:59:15.658] rive    PASS rest centre pick lands on a generated facet
[13:59:15.658] rive    PASS empty corner pick returns -1
[13:59:15.658] rive  23/23 passed
PASS A1: X9 baseline reproduces clean phase 0.10/0.12 and artifacts at 0.15/0.20/0.30; runtime rive 1.9.2, viewport 720x480
PASS A2: corrected phases 0.12/0.15/0.20/0.30 are byte-identical to phase-zero rest; captures p12=682cce47d744a48f0189ce9fe0bbdb9c219445d866f0eae2c429631f3be2f02f p15=682cce47d744a48f0189ce9fe0bbdb9c219445d866f0eae2c429631f3be2f02f p20=682cce47d744a48f0189ce9fe0bbdb9c219445d866f0eae2c429631f3be2f02f p30=682cce47d744a48f0189ce9fe0bbdb9c219445d866f0eae2c429631f3be2f02f
PASS A4: phase-zero capture is unchanged and phase 0.72 inspect capture is distinct; inspect=079f51c6dc64314d114b8feeab20dd8a6687fe0eee08320a37431e086e1eb006
PASS A1: small=facet-03(18v) large=facet-01(810v) overlap=facet-05 cover=[facet-01,facet-05] picks=[4,2,0]
PASS A2: fixtures occl=facet-01 zoff=facet-11 touch=facet-01 sep=[facet-01,facet-03] cull=facet-05(back=facet-01); all matched
PASS A3: nearest-positive picks matched JS mirror across extruded/separated/rest poses
PASS A4: toggle facet-01 sel 1->0 count->0; provider hashes unchanged; GPU sel-vs-unsel diff=103835
PASS A5: reset logged=true rest-pose pixel diff vs fresh rest=0
PASS A6: viewports 400x480,1200x480: [{"vp":"400x480","center":"facet-06->5","off":"facet-02->1"},{"vp":"1200x480","center":"facet-06->5","off":"facet-02->1"}]
PASS A7: irregular advance -> picks 0,0 vs expected 0,0 count=0
PASS A8: deadzone micro-diff=0 (want 0), drag-diff=57859 (want >0)
PASS A9: 3s elapsed at 3 granularities, pixel diffs vs first: [0,0]
PASS A10: 960ms damping diffs=[0,0]; 5s advance pick=9 vs expected 9 (stable)
PASS A11: identity->[0,0,-1] 90->[-1,0,0] mid45->[-0.707,0,-0.707]
PASS A12: near-margin sel=(304,80) probe=(190,80) old0.05->facet-05 new0.20->facet-01 picks=[{"facet":0,"selected":1,"count":1},{"facet":0,"selected":0,"count":0}]

> web-foundations@1.0.0 prebuild /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-10/web-foundations
> bundle exec jekyll clean --source docs --destination _site --config _config.yml

Configuration file: _config.yml
           Cleaner: Removing _site...
           Cleaner: Nothing to do for docs/.jekyll-metadata.
           Cleaner: Nothing to do for .sass-cache.

> web-foundations@1.0.0 build /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-10/web-foundations
> npm run postcss:build && bundle exec jekyll build --source docs --destination _site --config _config.yml && npm run verify:publication && npm run verify:citations

npm warn Unknown env config "npm-globalconfig". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.
npm warn Unknown env config "verify-deps-before-run". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.
npm warn Unknown env config "_jsr-registry". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.
npm warn Unknown global config "only-built-dependencies-file". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.

> web-foundations@1.0.0 postcss:build
> postcss docs/assets/css/tailwind.css -o docs/assets/css/tailwind-processed.css

[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
Browserslist: browsers data (caniuse-lite) is 13 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
Configuration file: _config.yml
Loading post_process plugin... 
            Source: docs
       Destination: _site
 Incremental build: disabled. Enable with --incremental
      Generating... 
Running post-processing scripts... 
Running normalize-ids... 
✅ Normalized accents in 202 HTML files
Running mark-broken-links... 
[mark-broken-links] No error files found
[mark-broken-links] No broken URLs to mark
Running strip-markdown-helper-attrs... 
Stripped markdown helper attributes from 200 HTML files
Post-processing complete! 
                    done in 5.365 seconds.
 Auto-regeneration: disabled. Use --watch to enable.
npm warn Unknown env config "npm-globalconfig". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.
npm warn Unknown env config "verify-deps-before-run". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.
npm warn Unknown env config "_jsr-registry". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.
npm warn Unknown global config "only-built-dependencies-file". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.

> web-foundations@1.0.0 verify:publication
> node scripts/verify-publication-safety.mjs

Publication safety passed: no internal corpus or local-architecture metadata is publishable.
npm warn Unknown env config "npm-globalconfig". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.
npm warn Unknown env config "verify-deps-before-run". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.
npm warn Unknown env config "_jsr-registry". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.
npm warn Unknown global config "only-built-dependencies-file". This will stop working in the next major version of npm. See `npm help npmrc` for supported config options.

> web-foundations@1.0.0 verify:citations
> node scripts/verify-publication-safety.mjs --citations

Citation conformance passed for canonical lessons.
PASS X10: 7 acceptance items match /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-10/frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/PHASE-X10.md
```

**Exit code:** 0
**Verdict:** exit-gate PASSED. Eligible for VERIFYING -> COLD_REVIEW.
**Reminder:** the runner does not flip status to DONE. A separate verifier session must review before promotion.
