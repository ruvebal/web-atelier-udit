# Verify log — PHASE-X4.md

**Run by:** cascade-harness.sh (runner process, not the implementing session)
**Worktree:** /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-4
**Commit:** 01a53612db3d83e8c56406c31494d988aa018fc3
**Started:** 2026-11-14T13:50:36Z

```
PASS A1: mouse=true(facet-01) touch=true(facet-12) fineMotion micro=true drag=true keyboard=true(facet-01) errors=0
PASS A2: N=13 buttons=13 labels=true textNotColorOnly=true chipsMatchFills=true enabled=true (waited 911ms for pick-busy to clear)
PASS A3: 6 captures 320/768/1280 x dark/light; cardOverflow<=2px && docOverflow<=8px(baseline)=true canvasSized=true
PASS A4: mode=static assembled=true canvasHidden=true selectStill=true reset=true errors=0
PASS A5: mode=static truthful=true fallbackImg=true controls=true status="The GPU scene could not load (forced failure test); verified stills remain avail"
PASS A6: destroyed=true player/observer null=true raf=0->0 elapsedFrozen=true orbitDetached=true consoleRestored=true buttons=0 newPicks=0
ALL PASS: A1, A2, A3, A4, A5, A6

> web-foundations@1.0.0 prebuild /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-4/web-foundations
> bundle exec jekyll clean --source docs --destination _site --config _config.yml

Configuration file: _config.yml
           Cleaner: Removing _site...
           Cleaner: Nothing to do for docs/.jekyll-metadata.
           Cleaner: Nothing to do for .sass-cache.

> web-foundations@1.0.0 build /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-4/web-foundations
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
✅ Normalized accents in 200 HTML files
Running mark-broken-links... 
[mark-broken-links] No error files found
[mark-broken-links] No broken URLs to mark
Running strip-markdown-helper-attrs... 
Stripped markdown helper attributes from 200 HTML files
Post-processing complete! 
                    done in 4.257 seconds.
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
PASS X4: 6 acceptance items match /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-4/frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/PHASE-X4.md
```

**Exit code:** 0
**Verdict:** exit-gate PASSED. Eligible for VERIFYING -> COLD_REVIEW.
**Reminder:** the runner does not flip status to DONE. A separate verifier session must review before promotion.
