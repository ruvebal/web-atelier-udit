# PHASE-X15 report

**Status:** DONE

## Cold-review triage (orchestrator)

| Finding | Severity | Blocks DONE | Disposition |
| --- | --- | --- | --- |
| Acceptance (template/registry/gallery/docs/assignment) | — | — | PASS round 1 |
| F1 cover-shaders Cover.jsx / five-props | P1 | was Yes | CLOSED round 2 — Route.jsx wording |
| F2 Unit 8 “gallery supplies Canvas” | P1 | was Yes | CLOSED round 2 — lab vs aggregator split |
| F3–F6 | P2 | No | Deferred / process notes |

**Lane:** `FEII-3D-ALBUM-KTX`. **Aggregator:** PR #3 squash-merged by orchestrator. **Lessons** land via cascade `land` (not web-atelier `main` push).

## Schema choice (registry)

- **Dropped** separate `album` field (X14-era).
- **Added** `concept` (artist/album + one-line exhibition pitch), `thumbnail` (filename under `covers/<slug>/public/`), `tags` (string array), `readiness` (`wip` | `ready` | `reference` | `demo`).
- **`title`** remains the short gallery heading (album title as DOM text).

## Files changed (aggregator)

| Area | Paths |
| --- | --- |
| Neutral template | `covers/_template/src/Route.jsx`, `route.css`, `starters/{dom,webgl,hybrid}/`, removed `Cover.jsx`, `parts.js` |
| Registry + CI | `covers/registry.json`, `scripts/check-registry.mjs`, `src/lib/types.js` |
| Gallery | `src/gallery/Home.jsx`, `src/index.css` |
| Thumbnails | `covers/*/public/thumbnail.svg` (fixtures, `_studio`, `_template`) |
| Student docs | `CONTRIBUTING.md`, `README.md`, `covers/_template/README.md`, `.github/pull_request_template.md`, `.cursor/rules/00-project.mdc`, `.cursor/rules/20-r3f-patterns.mdc` |

## Files changed (lesson pack)

- `web-foundations/docs/lessons/en/feii/units-8-9-assignment/index.md` — D26 format freedom, applicable evidence, public Pages URL, `_studio` as reference only, Unit 8 lab ≠ sole entrega.
- `web-foundations/docs/lessons/en/feii/cover-shaders/index.md` — cold-review **F1**: Lab mapping step 2 → `Route.jsx` endpoint, route-owned Canvas, no five-prop `Cover` contract.
- `web-foundations/docs/lessons/en/feii/unit-8-r3f-fundamentals/index.md` — cold-review **F2**: deliverable splits lab `Cover.jsx` / `App.jsx` Canvas from aggregator `Route.jsx` hand-in.

## Cold-review triage (P1)

| ID | Status | Note |
| --- | --- | --- |
| **F1** | **Fixed (lessons worktree)** | `cover-shaders/index.md` Lab mapping step 2 amended; await cold re-check vs `CONTRIBUTING.md`. |
| **F2** | **Fixed (lessons worktree)** | `unit-8-r3f-fundamentals/index.md` deliverable paragraph amended; cross-link to assignment §Format freedom. |
| F3–F6 | Open | Unchanged from `PHASE-X15-COLD-REVIEW.md`. |

## Commands run

```text
cd courses-repos/feii-album-covers && npm run lint && npm run build && npm run smoke:x14
# lint: registry ok (4 covers; 1 R3F extend key)
# smoke:x14: 2 passed

cd web-atelier-udit-album-FEII-3D-ALBUM-KTX-15/web-foundations && npm run build
# assignment: _site/lessons/en/feii/units-8-9-assignment/index.html present
# publication + citation gates passed
```

## Uncertain / resume

- Cold review filed; **F1/F2 lesson drift** patched in this worktree — cold reviewer should re-run doc-vs-code grep (`five props`, `gallery supplies the Canvas`) on FEII lessons before DONE.
- Exit gate `PHASE-X15.exit-gate.sh` **not** self-run (executor rule).
- Confirm PR merged to `main` and Pages rebuild after instructor review.
- X16 should browser-verify deep links under `BASE_PATH`.
- F1/F2 lesson build re-run: `web-foundations` `npm run build` — publication + citation gates passed (2026-11-05 executor turn).

## Resume point

1. Cold reviewer: verify F1/F2 fixes, run exit gate + lesson build (`wf_build x15`).
2. Merge PR; promote lesson worktree when authorised (D14); mark phase DONE only after cold review.
