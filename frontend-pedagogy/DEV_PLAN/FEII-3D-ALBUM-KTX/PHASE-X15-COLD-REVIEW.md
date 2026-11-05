# PHASE-X15 cold review — student brief, registry, gallery (D26)

**Reviewer:** cascade-cold-reviewer (did not implement).  
**Runbook:** `PHASE-X15.md` (owner amend 2026-11-05, D26).

---

## Round 2 (2026-11-05) — after F1/F2 lesson drift fixes

**Cascade worktree:** `/Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-album-FEII-3D-ALBUM-KTX-15` @ `6c29405950f28bfbfa10ce43be466dd5556126ec` (`cascade/FEII-3D-ALBUM-KTX-15`).  
**Aggregator:** `feii-album-covers` @ `534fc288949ddd7864625aaf7ee668485656b608`, branch **`instructor-x15-student-brief`**, [PR #3](https://github.com/ruvebal/feii-album-covers/pull/3) OPEN, CI `lint-and-build` SUCCESS.  
**Harness log (round 2 cold run):** `bash PHASE-X15.exit-gate.sh` → **exit 0** (registry metadata ok; lint + build; `wf_build x15`; assignment HTML present).  
**Verdict (round 2):** **CLEAR** — runbook acceptance holds; **F1 and F2 closed** in worktree lessons with `rg` evidence below. Cold reviewer does **not** mark DONE (PR #3 still open; three lesson files modified in worktree, not promoted per D14).

### Round 2 evidence runs

| Command | CWD | Exit | Notes |
| --- | --- | ---: | --- |
| `bash PHASE-X15.exit-gate.sh` | `…/FEII-3D-ALBUM-KTX/` | 0 | Same gates as round 1; `OK PHASE-X15.exit-gate.sh` |
| `npm run lint && npm run build` | `…/courses-repos/feii-album-covers` | 0 | (included in exit-gate) |
| `npm run smoke:x14` | same | 0 | 2 tests passed |
| `git rev-parse HEAD` + `git branch --show-current` | aggregator | 0 | `534fc28…`, `instructor-x15-student-brief` |
| `gh pr view 3 --repo ruvebal/feii-album-covers` | — | 0 | `headRefName: instructor-x15-student-brief`, `state: OPEN`, `lint-and-build: SUCCESS` |
| `glob **/Cover.jsx` | aggregator | — | 0 files |

### F1 / F2 closure (`rg` — round 2)

| ID | Round 1 issue | Round 2 check | Result |
| --- | --- | --- | --- |
| **F1** | `cover-shaders` Lab mapping claimed gallery passes `Cover` five props / unchanged `Cover.jsx` | `rg 'five props\|gallery supplies the Canvas' web-foundations/docs/lessons/en/feii` → **no matches**. Lab mapping step 2 (`cover-shaders/index.md` L469): **`Route.jsx`** complete endpoint; gallery **does not supply** shared Canvas; wire from **`Route.jsx`**. | **CLOSED** |
| **F2** | `unit-8` deliverable said gallery supplies Canvas for hand-in | `rg 'gallery supplies the Canvas' …/unit-8-r3f-fundamentals/index.md` → **no matches**. Deliverable (`index.md` L963): lab sandbox = `Cover.jsx` + `App.jsx` Canvas; assignment **task1** = `covers/<slug>/src/Route.jsx`; gallery **only routes and lazy-loads**. | **CLOSED** |

**Import/load:** Vite production build (647 modules); vitest smoke loads routes without import failures. **Full suite:** `lint`, `build`, `smoke:x14` — only automated targets in `package.json`; all run cold in round 2.

### Round 2 findings (residual)

| ID | Sev | Blocks DONE? | Evidence | Fix recommendation |
| --- | --- | --- | --- | --- |
| ~~F1~~ | ~~P1~~ | — | Closed round 2 (see table above). | — |
| ~~F2~~ | ~~P1~~ | — | Closed round 2 (see table above). | — |
| **F3** | P2 | No | Exit-gate still runs `lint` + `build` only; smoke run separately (exit 0). | Add `npm run smoke:x14` to `PHASE-X15.exit-gate.sh` for CI parity. |
| **F4** | P2 | **Yes (process)** | PR #3 OPEN; worktree `git status`: `M` on `cover-shaders`, `unit-8-r3f-fundamentals`, `units-8-9-assignment` (not on `web-atelier-udit` main). | Merge aggregator PR; promote lesson worktree when authorised (D14). |
| **F5** | P2 | No | `_template` still ships optional `sleeve.png` / `sleevePicture.js`; default `Route.jsx` does not import. | Optional X16 cleanup or README callout. |
| **F6** | P2 | No | `Home.jsx` thumbnail 120×120 vs CSS 72×72. | Align dimensions. |

**Return to orchestrator (round 2):** **CLEAR** for PHASE-X15 acceptance, aggregator PR #3 code/docs, and **F1/F2 lesson drift**. Do **not** mark DONE until product owner merges PR #3 and promotes the three modified lesson files from the cascade worktree.

---

## Round 1 (2026-11-05) — initial cold review

**Aggregator reviewed:** `feii-album-covers` @ `534fc288949ddd7864625aaf7ee668485656b608` (`instructor-x15-student-brief`, [PR #3](https://github.com/ruvebal/feii-album-covers/pull/3) OPEN, CI `lint-and-build` SUCCESS).  
**Lesson reviewed:** `web-foundations/docs/lessons/en/feii/units-8-9-assignment/index.md` in cascade worktree @ `6c29405950f28bfbfa10ce43be466dd5556126ec` (modified, not pushed per D14).  
**Harness log:** `PHASE-X15-VERIFY-LOG.md` (exit 0).  
**Verdict:** **CLEAR for P0/P1 on PHASE-X15 acceptance** — every runbook acceptance row checked with independent commands. **P1 pedagogy residuals** on sibling lesson pages (F1–F2) were out of X15 deliverables but amended in round 2. Cold reviewer does **not** mark DONE.

---

## Evidence runs (round 1)

| Command | CWD | Exit | Notes |
| --- | --- | ---: | --- |
| `bash PHASE-X15.exit-gate.sh` | `…/FEII-3D-ALBUM-KTX/` | 0 | `registry metadata ok: 4 entries`; lint + build; `wf_build x15`; assignment HTML present |
| `npm run lint && npm run build` | `…/feii-album-covers` | 0 | `registry ok (4 covers; 1 R3F extend key, none shared)`; vite build ~1.6s |
| `npm run smoke:x14` | same | 0 | 2 tests passed (full automated suite for this repo) |
| `git rev-parse HEAD` | aggregator | 0 | `534fc28…` |
| `gh pr view 3 --repo ruvebal/feii-album-covers` | — | 0 | `state: OPEN`, head `instructor-x15-student-brief`, check SUCCESS |

**Import/load:** ESLint over tree; Vite production build (647 modules); vitest loads `CoverRoute`, fixtures, and lazy `Route.jsx` modules without import failures.

**Full test suite:** `package.json` exposes only `lint`, `build`, and `smoke:x14` — all three were run cold; no other test target exists.

---

## Acceptance checklist (`PHASE-X15.md` §Acceptance)

| # | Criterion | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Neutral `_template` (DOM / WebGL / hybrid); no mandated sleeve/vinyl stage | **PASS** | Default `covers/_template/src/Route.jsx` is DOM-only (no Canvas, no stage/sleeve mesh). Variants: `starters/dom/Route.jsx`, `starters/webgl/Route.jsx` (spinning box), `starters/hybrid/Route.jsx`. No `Cover.jsx` under `_template`. |
| 2 | Docs: `_studio` is reference, not expected answer | **PASS** | `rg -qi "reference, not\|not the expected\|one reference" CONTRIBUTING.md README.md` (exit-gate). `Home.jsx` lede; `_template/README.md` L29; assignment L42. |
| 3 | Registry: title, authors, concept, thumbnail, tags, readiness; CI validates | **PASS** | `covers/registry.json` — 4 entries, all fields present; `scripts/check-registry.mjs` validates fields, thumbnail files on disk, readiness enum, sorted slugs. Cold `npm run lint` → `registry ok`. |
| 4 | `/` visual exhibition index; keyboard accessible | **PASS (static)** | `Home.jsx`: grid of `<Link className="exhibition__card">` with thumbnails, title, concept, readiness, tags. `src/index.css`: `a:focus-visible` outline on links (cards are links). Thumbnails use `alt=""` with visible title/concept in link text — acceptable name-from-content pattern. No browser smoke in this review. |
| 5 | CONTRIBUTING + PR template + README match D26; own route + registry row only | **PASS** | CONTRIBUTING boundary (L19), neutral template (L93), D21 ritual (branch `cover-<slug>-task`, AI Review Log, task4 cross-cover). PR template contract checkboxes. README D26 Route endpoint + `_studio` reference. `.cursor/rules/20-r3f-patterns.mdc` updated: route owns Canvas (L11). |
| 6 | Assignment: format freedom; applicable evidence; Pages/IP; no new hours/units | **PASS** | Worktree `units-8-9-assignment/index.md`: §Format freedom (D26), N/A rows for DOM, public Pages URL, `_studio` reference-only, Unit 8 lab ≠ sole entrega. `rg -i 'hour\|Unit 11\|new unit' index.md` → no matches. No “private class aggregator” string. Exit-gate `wf_build x15` + `_site/…/units-8-9-assignment/index.html`. |
| 7 | No primary `Cover.jsx` contract | **PASS** | `glob **/Cover.jsx` in aggregator → 0 files. `src/gallery/registry.js` globs `Route.jsx` only (no `Cover.jsx` glob). `CoverRoute.jsx` is shell name only (X14), not student starter. |
| 8 | `npm run lint && npm run build` green; lesson build for touched page | **PASS** | Cold reviewer transcript + harness log (round 1 and round 2). |
| 9 | D21 artefacts present | **PASS** | PR template “AI Review Log”; CONTRIBUTING `cover-<slug>-task`, cross-cover task4, TTOD ritual paragraph; README staged PR sequence. |
| 10 | Cold review filed; blocking Fn closed | **PASS (round 2)** | F1–F2 closed in worktree; no P0/P1 acceptance blockers. |

---

## Agentic failure-mode audit

1. **Import/load** — production build + vitest exercised gallery and fixture routes.
2. **Full suite** — `lint`, `build`, `smoke:x14` all run (entire JS test surface).
3. **Tests vs pre-fix** — smoke F1 (`_fixture-throw`) would fail without X14 throw fixture; unchanged by X15. No new tests added in X15 PR for exhibition metadata (not required by runbook).
4. **Unpack arity** — N/A.
5. **Discriminated modes** — `readiness` enum enforced in `check-registry.mjs` (`wip|ready|reference|demo`).
6. **Docs match code** — aggregator student docs match D26; **F1–F2 lesson drift fixed in round 2** (Lab mapping + Unit 8 deliverable).

---

## Scope notes

- **Registry schema:** `album` dropped; `concept` holds artist/album pitch (`PHASE-X15-REPORT.md`, `check-registry.mjs` L6 comment) — documented in CONTRIBUTING.
- **Downstream X16:** runbook assigns live production / browser deep links under `BASE_PATH`; exhibition index not browser-smoked here.
- **Phase header status:** runbook still says “BLOCKED until X14 DONE”; orchestrator should align INDEX/status when promoting (process, not implementation defect in this branch).

---

## Blocking summary (round 2)

| Severity | Count (X15 acceptance + F1/F2) | Action |
| --- | ---: | --- |
| P0 | 0 | — |
| P1 (acceptance or F1/F2) | 0 | F1/F2 **closed** in worktree |
| P2 (F3–F6) | 4 | Triage; **F4** blocks DONE until merge + lesson promotion |
