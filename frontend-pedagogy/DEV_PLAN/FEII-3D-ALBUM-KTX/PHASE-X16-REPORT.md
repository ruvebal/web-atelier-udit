# PHASE-X16 report — live exhibition + closing audit

**Status:** DONE

## Cold-review triage (orchestrator)

| Finding | Severity | Blocks DONE | Disposition |
| --- | --- | --- | --- |
| Live deploy + D26 audit | — | — | PASS — workflow 42031920034 @ fd95b69 |
| Round-1 cold review | — | No P0/P1 | CLEAR |
| F1 browser UX not re-run by reviewer | P2 | No | Executor browser evidence + curl accepted |
| F2 X11–X13 not in X16 harness log | P2 | No | Prior phases DONE; X14–X15 re-run in gate |
| D23/D24 | P2 / DEFER | No | Professor: D23 prose; D24 react-template publish |

**Lane:** `FEII-3D-ALBUM-KTX` (worktree `…/web-atelier-udit-album-FEII-3D-ALBUM-KTX-16`).

## Deployment evidence (not local-only)

| Item | Value |
| --- | --- |
| Aggregator repo | `ruvebal/feii-album-covers` |
| Deployed commit | `fd95b698cd1c49ee4acdf882cd1a2b68178e3ced` |
| Pages workflow | https://github.com/ruvebal/feii-album-covers/actions/runs/42031920034 — **success** (build + deploy) |
| Live base URL | https://ruvebal.github.io/feii-album-covers/ |

No push to `web-atelier-udit` in this phase.

## Files changed (cascade pack only)

| File | Change |
| --- | --- |
| `CLOSING-AUDIT.md` | X16 D21–D26 re-audit rows, live URLs, publication dependency |
| `PHASE-X16-REPORT.md` | This report |
| `PHASE-X16-COLD-REVIEW.md` | Executor pre-flight for cold reviewer |

## Live origin verification

**Method:** `/usr/bin/curl` (HTTP + SPA shell grep) and **cursor-ide-browser** (direct open, F5 reload, project selector, route nav, 390×844 viewport, `prefers-reduced-motion: reduce` emulated via CDP).

| URL | HTTP (curl) | SPA shell | Browser direct + reload |
| --- | --- | --- | --- |
| https://ruvebal.github.io/feii-album-covers/ | 200 | yes (`id="root"`) | Gallery index; four exhibition cards |
| https://ruvebal.github.io/feii-album-covers/covers/_studio | 404 | yes | Studio reference; Sleeve/Vinyl/Stage; prev → WebGL fixture; **reload OK** |
| https://ruvebal.github.io/feii-album-covers/covers/_fixture-webgl | 404 | yes | R3F prism heading; prev/next/all; **F5 reload OK** |
| https://ruvebal.github.io/feii-album-covers/covers/_fixture-dom | 404 | yes | DOM poster; swatch prev/next; no WebGL |
| https://ruvebal.github.io/feii-album-covers/covers/_fixture-throw | 404 | yes | Alert: intentional render failure; project selector + route nav **survive** |

**Navigation / a11y (live):**

- **Project selector:** trigger expands; lists all slugs; keyboard focus on trigger (Tab).
- **Route nav:** `←` prev, `→` next, “All projects” on every checked route.
- **Mobile layout:** 390×844 emulation — overlay nav + selector usable.
- **Reduced motion:** `Emulation.setEmulatedMedia` → `prefers-reduced-motion: reduce` (hook present in app; no visual regression observed on DOM fixture).

## Lazy loading + isolation evidence

| Claim | Evidence |
| --- | --- |
| Per-route lazy chunks | Live main bundle `assets/index-DNumiJ8b.js` contains `import("./Route-….js")` for each cover slug + `CoverRoute-….js`; separate `react-three-fiber.esm-BnFcqnfE.js` (HTTP 200). Local `vite build`: 9 route/shell JS chunks + shared R3F chunk. |
| R3F not on DOM-only route | `_fixture-dom` live UI has no WebGL budget line; WebGL routes load R3F chunk URL above. |
| CSS / runtime isolation | `npm run smoke:x14` (2 tests): `_fixture-throw` keeps shell nav; mount/unmount removes `html.route-*` classes (F2). Per-route CSS files in build output (`Route-*.css`). |

## Exit gates re-run (executor)

| Gate | Exit | Notes |
| --- | ---: | --- |
| `npm run smoke:x14` | 0 | 2/2 tests |
| `PHASE-X14.exit-gate.sh` | 0 | `FEII_ALBUM_COVERS=…/feii-album-covers` |
| `PHASE-X15.exit-gate.sh` | 0 | includes assignment HTML check |
| `web-foundations/npm run build` | 0 | publication + citation gates |
| `PHASE-X16.exit-gate.sh` | **not run** | harness-only (executor rule) |

X11/X13 lesson gates not re-run as shell scripts; assignment build covered via X15 exit gate + `web-foundations` build.

## D24 / D25 live notes

- **D24:** https://ruvebal.github.io/react-template/ex3-cover (and ex4/ex5) → **404** — expected; professor publish scope.
- **D25:** terminology satellite present in cascade worktree; public `web-atelier-udit` lesson URL not claimed (no teaching `main` push).

## Uncertain / resume

- **Cold review** and harness `PHASE-X16.exit-gate.sh` still required before DONE.
- **D23** DECISIONS row still says “not public”; live repo is **public** — recorded in `CLOSING-AUDIT.md`; professor may amend DECISIONS.
- **prefers-reduced-motion:** emulated in browser only; no automated assertion on live origin.
- Pages CDN lag: if a check fails shortly after deploy, re-fetch against run **42031920034** / SHA `fd95b69`.

## Resume point

1. Cold reviewer: read this report + `CLOSING-AUDIT.md`; run `PHASE-X16.exit-gate.sh`; confirm no blocking Fn.
2. Product owner: promote cascade pack + lesson worktree per D14 when authorised.
3. Professor: D24 `react-template` publish when ready.
