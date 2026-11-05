# PHASE-X14 report — student-owned Route.jsx architecture (D26)

**Status:** DONE

## Cold-review triage (orchestrator)

| Finding | Severity | Blocks DONE | Disposition |
| --- | --- | --- | --- |
| F1 throw + shell nav | P1 | was Yes | CLOSED round 2 — `_fixture-throw` + `npm run smoke:x14` |
| F2 unmount cleanup smoke | P1 | was Yes | CLOSED round 2 — vitest class cleanup |
| F3 browser/`BASE_PATH` smoke | P2 | No | Deferred to X16 live Pages audit |
| F4 stale `.cursor`/BudgetProbe docs | P2 | No | Deferred to X15 student-facing pass |
| F5 verify-log SHA vs aggregator | P2 | No | Expected (harness logs cascade HEAD) |
| F6 exit-gate omits smoke:x14 | P2 | No | Noted; smoke proven in cold review |

**Implementer:** cascade-phase-executor. Aggregator PR #2 squash-merged to `main` by orchestrator after CI green (instructor architecture, D14).

**Aggregator branch:** was `instructor-x14-route-endpoints` → merged to `main`.

---

## Summary

Replaced the scene-only `Cover.jsx` + shared gallery `<Canvas>` contract with lazy **`Route.jsx` endpoints**. The exhibition shell lazy-loads each route inside `CanvasErrorBoundary` + `Suspense`, supplies collapsed fixed `ProjectSelector` and `RouteNav` (prev/next/all), and does not mount a shared Canvas. Migrated `_studio` to `Route.jsx`. Instructor fixtures include DOM, WebGL, and **`_fixture-throw`** for error-boundary proof.

**Cold-review triage (this pass):**

| Finding | Severity | Action |
| --- | --- | --- |
| **F1** throwing fixture + shell nav survives | P1 | **Addressed** — `_fixture-throw`, `data-exhibition-nav` markers, `tests/x14-smoke.test.jsx` F1 |
| **F2** unmount cleanup smoke-tested | P1 | **Addressed** — same test file F2 (DOM + WebGL fixture class cleanup) |
| F3 browser smoke (_studio, keyboard, BASE_PATH) | P2 | Open — not in scope this pass |
| F4 stale `.cursor/rules` / BudgetProbe JSDoc | P2 | Open — X15 |
| F5 verify log SHA vs PR SHA | P2 | Re-run harness after merge |

---

## Files changed (`feii-album-covers`, F1/F2 pass)

| Area | Files |
| --- | --- |
| Throw fixture | `covers/_fixture-throw/src/Route.jsx`, `covers/registry.json` |
| Nav markers | `src/gallery/ProjectSelector.jsx`, `src/gallery/RouteNav.jsx` |
| Smoke | `tests/x14-smoke.test.jsx`, `tests/setup.js`, `scripts/smoke-x14.mjs`, `vite.config.js` (`test` block) |
| Tooling | `package.json` (`smoke:x14`, vitest + RTL devDeps), `package-lock.json` |
| Docs | `CONTRIBUTING.md` (fixtures + `npm run smoke:x14`) |

Prior X14 shell/fixture work unchanged in substance; see git history on branch.

---

## Commands run (real output)

```text
$ npm run lint
registry ok (4 covers; 1 R3F extend key, none shared)

$ npm run build
✓ built in 1.65s
(dist includes Route-m090skCg.js ~0.10 kB for _fixture-throw lazy chunk)

$ npm run smoke:x14
 ✓ tests/x14-smoke.test.jsx (2 tests)
   ✓ F1: throwing route shows alert; project selector and route nav stay mounted
   ✓ F2: route unmount removes documentElement scope classes

$ bash PHASE-X14.exit-gate.sh
fixtures ok: _fixture-dom, _fixture-throw, _fixture-webgl
dist JS chunks: 8
OK PHASE-X14.exit-gate.sh
```

---

## Uncertain / not verified here

- Browser smoke: `/covers/_studio`, selector keyboard paths, BASE_PATH deep reload (F3 / X16).
- Cold reviewer re-run on post-fix commit (expect F1/F2 cleared; F3–F5 residual).
- `.cursor/rules` and PR template still mention legacy five-prop `Cover.jsx` (F4 / X15).

---

## Resume point

1. Cold reviewer: re-read aggregator at latest `instructor-x14-route-endpoints` SHA; confirm F1/F2 closed; file updated verdict if CLEAR.
2. Merge aggregator PR #2 when approved.
3. X15: neutral `_template` `Route.jsx`, cursor rules + PR template (F4).
