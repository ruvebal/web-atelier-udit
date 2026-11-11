# Canonical favicon · Rive + AnimaScript 3D cascade

**Status:** READY · planning branch `codex/canonical-favicon-rive-3d-cascade`  
**Author:** Rubén Vega Balbás, PhD · 2026-11-10  
**Product claim:** one canonical SVG becomes a crisp, responsive, depth-tested object whose N source facets remain individually understandable and selectable; the current favicon golden fixture has N=13.
**Engineering claim:** geometry, colour, area, intrinsic extrusion depth, hit identity, fallback, and teaching evidence are generated from one SVG source rather than copied by hand.

## Read this pack

| Reader | File | Question |
| --- | --- | --- |
| Product owner | [RATIONALE.md](RATIONALE.md) | Why is this specimen worth its runtime and authoring cost? |
| Technical director | [CANONICAL-FAVICON-RIVE-3D-CASCADE.md](CANONICAL-FAVICON-RIVE-3D-CASCADE.md) | In what order is it built, falsified, reviewed, and published? |
| Implementer/reviewer | [AGENT.md](AGENT.md) | What may each agent change, and who may certify it? |
| Evidence reader | [FINDINGS-2026-11-10.md](FINDINGS-2026-11-10.md) | Which claims were checked against this repository and installed tools? |
| Research reader | [ATHANOR-NEURAL-MATCH-2026-11-11.md](ATHANOR-NEURAL-MATCH-2026-11-11.md) | Which local monographs and graphics sources ground the cascade architecture? |
| Maintainer | [DECISIONS.md](DECISIONS.md) | Which geometry, interaction, accessibility, and provenance choices are frozen? |
| Reviewer | [PLAN-COLD-REVIEW.md](PLAN-COLD-REVIEW.md) | Which planning defects were found independently? |
| Orchestrator | [PLAN-REVIEW-RESOLUTION.md](PLAN-REVIEW-RESOLUTION.md) | How were those findings closed before X0? |

## Programme

Only the first word of each Gate cell is machine status.

| Step | Runbook | Deliverable | Gate |
| --- | --- | --- | --- |
| 0 | [PHASE-X0.md](PHASE-X0.md) | Baseline captures, canonical-source checksum, runtime/browser/tool probes | READY — live facts may amend X1–X8 |
| 1 | [PHASE-X1.md](PHASE-X1.md) | Deterministic SVG → indexed extrusion compiler and manifest | BLOCKED — opens after X0 DONE |
| 2 | [PHASE-X2.md](PHASE-X2.md) | Exact frontal Rive GPU scene and area-derived facet depths | BLOCKED — opens after X1 DONE |
| 3 | [PHASE-X3.md](PHASE-X3.md) | Build/unbuild choreography, facet picking, persistent selection | BLOCKED — opens after X2 DONE |
| 4 | [PHASE-X4.md](PHASE-X4.md) | Responsive demo integration, semantics, reduced-motion/static fallbacks | BLOCKED — opens after X3 DONE |
| 5 | [PHASE-X5.md](PHASE-X5.md) | Public step-by-step lesson and truthful agentic-making evidence | BLOCKED — opens after X4 DONE |
| 6 | [PHASE-X6.md](PHASE-X6.md) | Full implementation audit and performance/fidelity matrix | BLOCKED — opens after X5 DONE |
| 7 | [PHASE-X7.md](PHASE-X7.md) | Post-audit skill promotion and implementation PR A | BLOCKED — opens after X6 DONE |
| 8 | [PHASE-X8.md](PHASE-X8.md) | Post-merge provenance hook with real PR/review/merge evidence | BLOCKED — opens only after PR A is merged |

Every phase closes `VERIFYING → COLD_REVIEW → DONE`; the implementer never marks their own work DONE.

The runnable contracts are `PHASE-Xn.exit-gate.sh`. They intentionally fail
until their phase artifacts exist; changing an artifact contract requires
amending the runbook and its gate together.

## Live snapshot · 2026-11-10

| Fact | Observed value | Where checked |
| --- | --- | --- |
| Worktree before branch | clean `main...origin/main` | `git status --short --branch` |
| Working branch | `codex/canonical-favicon-rive-3d-cascade` | `git branch --show-current` |
| Canonical source | `fava-mark-static.svg`, `viewBox="0 0 1024 920"` | `web-foundations/docs/assets/icons/fava-mark-static.svg` |
| Canonical facets | 13 `<path>` elements | same source, lines 3–15 |
| Existing GPU specimen | 13 copies of one hand-authored triangular prism | `animascript-3d/main.as`, `prismatic-favicon.wgsl` |
| Existing renderer | AnimaScript GPU Canvas, WGSL, depth32float, back-face culling | current `main.as` and shader |
| Existing signed asset | `build/fava_prismatic_3d.riv` | animation asset tree |
| Rive CLI | 1.9.2 at `/opt/homebrew/bin/rive`; supports verification, pointer/touch input, screenshots, semantics, data dumps, GPU manifests and benchmarks | `rive --version`, `rive --help` |
| GitHub authority | `ruvebal` authenticated; `repo` and `workflow` scopes | `gh auth status` |

The 2026-11-11 X0 live baseline supersedes these planning-branch/tool-version observations; see [PHASE-X0-REPORT.md](PHASE-X0-REPORT.md) and its immutable artifacts.

## Non-negotiable outcome

At loop rest, the rendered front projection must compare to the canonical static SVG within the declared raster tolerance. During the spatial phase it must reveal actual side walls, depth testing, occlusion, lighting, and two-sided geometry. Clicking/tapping a visible facet must persistently select that exact source facet. The public lesson must distinguish generated evidence from design interpretation and must never invent an agent message, review, PR, or merge.
