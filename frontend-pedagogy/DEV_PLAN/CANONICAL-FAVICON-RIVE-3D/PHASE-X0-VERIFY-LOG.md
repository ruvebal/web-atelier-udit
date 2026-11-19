# Verify log — PHASE-X0.md

**Run by:** cascade-harness.sh (runner process, not the implementing session)
**Worktree:** /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-0
**Commit:** af8147c1ba91ecc9d8883c8fbcafaaac3aa80b30
**Started:** 2026-11-11T18:08:24Z

```
[19:08:24.216] rive  verified (0 bytes, 66ms, 0 errors, 0 warnings)
PASS X0: 7 acceptance items match /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-0/frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/PHASE-X0.md

> web-foundations@1.0.0 prebuild /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-0/web-foundations
> bundle exec jekyll clean --source docs --destination _site --config _config.yml

Configuration file: _config.yml
           Cleaner: Removing _site...
           Cleaner: Nothing to do for docs/.jekyll-metadata.
           Cleaner: Nothing to do for .sass-cache.

> web-foundations@1.0.0 build /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-0/web-foundations
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
                    done in 4.268 seconds.
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
```

**Exit code:** 0
**Verdict:** exit-gate PASSED. Eligible for VERIFYING -> COLD_REVIEW.
**Reminder:** the runner does not flip status to DONE. A separate verifier session must review before promotion.
