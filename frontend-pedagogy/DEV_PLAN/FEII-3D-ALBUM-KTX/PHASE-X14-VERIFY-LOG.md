# Verify log — PHASE-X14.md

**Run by:** cascade-harness.sh (runner process, not the implementing session)
**Worktree:** /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-album-FEII-3D-ALBUM-KTX-14
**Commit:** 069949d6d7191302c3ee70d95f7eff672aae2600
**Started:** 2026-11-05T12:54:47Z

```
src/gallery/CoverRoute.jsx:13: * camera, layout, and CSS; this file never mounts a shared `<Canvas>`.
src/gallery/CoverRoute.jsx:48:      <CanvasErrorBoundary slug={coverSlug}>
src/gallery/CoverRoute.jsx:13: * camera, layout, and CSS; this file never mounts a shared `<Canvas>`.
src/gallery/CoverRoute.jsx:48:      <CanvasErrorBoundary slug={coverSlug}>
fixtures ok: _fixture-dom, _fixture-throw, _fixture-webgl

> feii-album-covers@0.1.0 lint
> eslint . && node scripts/check-registry.mjs

registry ok (4 covers; 1 R3F extend key, none shared)

> feii-album-covers@0.1.0 build
> vite build

vite v7.3.7 building client environment for production...
transforming...
✓ 636 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                  0.42 kB │ gzip:   0.29 kB
dist/assets/sleeve-etc1s-DNeRCMbb.ktx2          36.50 kB
dist/assets/basis_transcoder-o4Hde_L7.js        57.53 kB
dist/assets/sleeve-uastc-_II3Onrt.ktx2         262.40 kB
dist/assets/sleeve-DKpvynx-.png                359.65 kB
dist/assets/basis_transcoder-VXdx5NbI.wasm     527.33 kB │ gzip: 247.62 kB
dist/assets/Route-DofF3byC.css                   0.40 kB │ gzip:   0.25 kB
dist/assets/Route-TdqfV8GJ.css                   0.93 kB │ gzip:   0.50 kB
dist/assets/Route-OvwCG0-H.css                   1.18 kB │ gzip:   0.45 kB
dist/assets/index-CKtzKrQl.css                   4.55 kB │ gzip:   1.32 kB
dist/assets/Route-m090skCg.js                    0.10 kB │ gzip:   0.11 kB
dist/assets/Route-Dnove1dB.js                    1.02 kB │ gzip:   0.53 kB
dist/assets/Route-HSgzn0Rb.js                    1.06 kB │ gzip:   0.61 kB
dist/assets/CoverRoute-CYAT4sb3.js               4.01 kB │ gzip:   1.63 kB
dist/assets/Route-D5cMizFw.js                   96.83 kB │ gzip:  38.15 kB
dist/assets/index-hS2jHPiI.js                  266.21 kB │ gzip:  85.01 kB
dist/assets/react-three-fiber.esm-eTnHHJnI.js  914.38 kB │ gzip: 247.23 kB

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
✓ built in 1.67s
npm error A complete log of this run can be found in: /Users/ruvebal/.npm/_logs/2026-11-05T12_54_50_020Z-debug-0.log

> feii-album-covers@0.1.0 smoke:x14
> vitest run tests/x14-smoke.test.jsx


 RUN  v3.2.7 /Users/ruvebal/projects/ruvebal/scholar/udit/courses-repos/feii-album-covers

 ✓ tests/x14-smoke.test.jsx (2 tests) 345ms
   ✓ PHASE-X14 acceptance smoke > F1: throwing route shows alert; project selector and route nav stay mounted  338ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  13:54:50
   Duration  747ms (transform 39ms, setup 22ms, collect 92ms, tests 345ms, environment 124ms, prepare 32ms)

dist JS chunks: 8
OK PHASE-X14.exit-gate.sh
```

**Exit code:** 0
**Verdict:** exit-gate PASSED. Eligible for VERIFYING -> COLD_REVIEW.
**Reminder:** the runner does not flip status to DONE. A separate verifier session must review before promotion.
