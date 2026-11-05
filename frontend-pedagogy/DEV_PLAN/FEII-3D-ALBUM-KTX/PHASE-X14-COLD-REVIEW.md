# PHASE-X14 cold review — student-owned Route.jsx (D26)

**Reviewer:** cascade-cold-reviewer (did not implement).  
**Round:** 2 (post F1/F2 triage on aggregator `instructor-x14-route-endpoints`).  
**Aggregator reviewed:** `feii-album-covers` @ `dcfb6df` (`test(gallery): close X14 F1/F2 with throw fixture and smoke tests`).  
**Prior round:** @ `5253bac` — F1/F2 were **P1** blockers.  
**Runbook:** `PHASE-X14.md` · **Decision:** D26 / `AMENDMENT-D26-ROUTE-FREEDOM.md`.  
**Verdict:** **CLEAR for P0/P1** — round-1 blocking findings F1 and F2 are closed with runnable evidence. **P2** residuals (F3–F6) remain; cold reviewer does **not** mark DONE.

---

## Evidence runs (cold reviewer, round 2)

| Command | CWD | Exit | Notes |
| --- | --- | ---: | --- |
| `git rev-parse HEAD` | `…/feii-album-covers` | 0 | `dcfb6dfc6bbb51d4c30fbf86eb63fb96544d6b01` |
| `npm run smoke:x14` | same @ `dcfb6df` | 0 | 2 tests, 338–352 ms; vitest v3.2.7 |
| `npm run lint && npm run build && npm run smoke:x14` | same @ `dcfb6df` | 0 | Full JS “suite” for this repo |
| `FEII_ALBUM_COVERS=…/feii-album-covers bash PHASE-X14.exit-gate.sh` | pedagogy worktree | 0 | `fixtures ok: _fixture-dom, _fixture-throw, _fixture-webgl`; lint + build; `dist JS chunks: 8` |
| Harness log | `PHASE-X14-VERIFY-LOG.md` | 0 | Exit-gate transcript includes `_fixture-throw`; **worktree commit in log header still `069949d`**, not aggregator `dcfb6df` (see F5) |

**Full test suite:** `lint`, `build`, and `smoke:x14` (only automated tests in `package.json`). All green on `dcfb6df`.

**Import/load:** ESLint on tree; Vite production build (636 modules); vitest loads `CoverRoute`, lazy registry path, and fixture routes without import failures.

---

## Round-1 findings — disposition

| ID | Round 1 | Round 2 | Evidence |
| --- | --- | --- | --- |
| **F1** | P1 — no throwing fixture / no proof shell nav survives | **Closed** | `covers/_fixture-throw/src/Route.jsx` throws on render; `covers/registry.json` registers slug; `tests/x14-smoke.test.jsx` F1: `role="alert"` contains `_fixture-throw`, `[data-exhibition-nav="project-selector"]`, `[data-exhibition-nav="route-nav"]`, and “All projects” link present after error |
| **F2** | P1 — cleanup documented, not smoke-tested | **Closed (narrow)** | `tests/x14-smoke.test.jsx` F2: mount/unmount `_fixture-webgl` and `_fixture-dom` removes `route-*` on `document.documentElement`; CONTRIBUTING references `npm run smoke:x14` |
| **F3** | P2 — no browser smoke (_studio, selector, BASE_PATH) | **Open** | No dev-server / preview transcript in this review |
| **F4** | P2 — stale `.cursor/rules`, PR template, BudgetProbe JSDoc | **Open** | e.g. `.cursor/rules/20-r3f-patterns.mdc` still “gallery owns” Canvas; `BudgetProbe.jsx` L6–7 still “gallery mounts one inside every” route |
| **F5** | P2 — verify log SHA ≠ PR SHA | **Open (process)** | Log header `069949d` vs reviewed aggregator `dcfb6df`; exit-gate **content** now matches throw fixture |
| **F6** | — | **New P2** | `PHASE-X14.exit-gate.sh` runs `lint` + `build` only; does **not** invoke `npm run smoke:x14` — smoke can drift without CI/harness catching it |

---

## Acceptance checklist (runbook §Acceptance)

| # | Criterion | Result | Evidence |
| --- | --- | --- | --- |
| 1 | `/covers/<slug>` lazy-loads `Route.jsx`; registry + file required | **PASS** | Unchanged from round 1; exit-gate + `check-registry.mjs` on `dcfb6df` |
| 2 | Shell has no mandatory shared Canvas / camera / lights / five-prop Cover / gallery budget panel | **PASS** | No `<Canvas` in `src/gallery/*.jsx`; fixtures/`_studio` own Canvas inside `Route.jsx` |
| 3 | Collapsed fixed project selector; keyboard accessible | **PASS (static)** | `ProjectSelector.jsx` + `data-exhibition-nav="project-selector"`; not browser-verified |
| 4 | Prev/next/all; direct URL + reload under `BASE_PATH` | **PARTIAL (P2)** | `RouteNav` + `main.jsx` basename; no browser smoke |
| 5 | Per-route error boundary; **throwing fixture** leaves shell navigation usable | **PASS** | Structure: `ProjectSelector` / `RouteNav` siblings outside `CanvasErrorBoundary` (`CoverRoute.jsx` L47–55); **F1 vitest** on `_fixture-throw` |
| 6 | Unmount cleanup **documented + smoke-tested** | **PASS (DOM class scope)** | CONTRIBUTING + F2 vitest for `documentElement` classes; **not** router-switch WebGL/context leak smoke |
| 7 | `_studio` behaviour preserved | **PASS (code)** / **not smoke-tested (P2)** | `covers/_studio/src/Route.jsx` unchanged contract |
| 8 | ≥2 fixtures WebGL + DOM; lazy chunks | **PASS** | Three fixture slugs + `_studio`; `Route-m090skCg.js` ~0.10 kB throw chunk |
| 9 | `lint` + `build` green; check-registry requires `Route.jsx` | **PASS** | Cold reviewer transcript |
| 10 | CONTRIBUTING/README D26; `_studio` reference | **PASS** | CONTRIBUTING lists `_fixture-throw` and `npm run smoke:x14` |
| 11 | Legacy Cover removed or ticketed (X15) | **PASS** | Unchanged from round 1 |
| 12 | Cold review filed; blocking Fn closed | **THIS FILE** | F1/F2 closed; F3–F6 do not block P1 |

---

## Agentic failure-mode audit (round 2)

1. **Import/load** — build + vitest exercised touched gallery and fixture modules.
2. **Full suite** — `lint`, `build`, `smoke:x14` all run; exit-gate omits smoke (F6).
3. **Tests vs pre-fix** — **F1 would fail** at `5253bac` (no `_fixture-throw` / no test). **F2 would likely pass** at `5253bac` if run then (class cleanup already in fixture `Route.jsx`); F2 closure is “smoke exists,” not “cleanup was broken before.”
4. **Unpack arity** — N/A.
5. **Discriminated modes** — N/A.
6. **Docs match code** — README/CONTRIBUTING match D26; **F4** drift in agent/PR docs remains for X15/sibling PR.

---

## Architecture notes (unchanged, non-blocking)

- Lazy `Route.jsx` per slug; `key={coverSlug}` on `.route-shell` remounts boundary on slug change.
- `data-exhibition-nav` attributes give stable smoke hooks without coupling to copy.
- Downstream **X15** should refresh `_template/Route.jsx` and align `.cursor/rules` / PR template with D26.

---

## Blocking summary

| Severity | IDs | Blocks DONE? |
| --- | --- | ---: |
| **P0** | — | — |
| **P1** | — (F1, F2 **closed**) | **No** |
| **P2** | F3, F4, F5, F6 | No |

**Return to orchestrator:** **CLEAR for P0/P1.** Product owner may promote after triaging P2 backlog; cold reviewer still does **not** set phase DONE. Recommend wiring `npm run smoke:x14` into `PHASE-X14.exit-gate.sh` (F6) and re-recording verify log against aggregator `dcfb6df` (F5) before merge sign-off.
