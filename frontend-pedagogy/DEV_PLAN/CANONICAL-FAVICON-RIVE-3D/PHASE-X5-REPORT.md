# PHASE-X5 · Publish the build as a pedagogical agentic lesson

**Status:** DONE
**Branch:** `cascade/CANONICAL-FAVICON-RIVE-3D-5`

## Outcome

The public making-of lesson is live at `docs/lessons/en/web-animations/svg-master-session/agentic-rive-3d/`. It opens with **sound synchronicity as the first relevance utility** (D54): who owns the audible sample clock, the hearable `animascript-audio` / `hum.as` specimen, and the honesty limit that GitHub Pages does not ship a live AudioWorklet/COI host. The GPU 3D favicon and the audio specimen are taught as sibling ownership lanes, not as a fabricated A/V lock.

Downstream sections cover D21 ownership, SVG → mesh → signed `.riv` → host, area-derived depth with limitations named, authored motion versus input-driven state, and an append-only provenance table with real local SHAs and explicitly pending PR/merge rows. `docs/_data/rive_3d_provenance.yml` plus `scripts/verify-rive-3d-provenance.mjs` enforce the receipt. The master session links to the making-of. `lessons.yml` indexes `agentic-rive-3d` (EN complete; ES draft pending a D52 translation pass).

## Verification prepared for the external gate

- `node scripts/verify-x5-lesson.mjs --all` — A1–A11 PASS (labels, depth distinction, owners, area/depth honesty, provenance, site index + built route, evaluator-safe refs, clock/ownership axes, motion rubric, sound-first utility).
- `node scripts/verify-rive-3d-provenance.mjs --allow-pending` — PASS (8 events, 2 pending).
- `pnpm build` — lesson HTML under `_site/lessons/en/web-animations/svg-master-session/agentic-rive-3d/`.
- `node scripts/svg-extrusion/capture-x5-evidence.mjs` — writes `PHASE-X5-EVIDENCE.json` and `baseline/X5/*.command.json`.
- `node scripts/svg-extrusion/verify-phase-evidence.mjs X5` — expected PASS after capture.

## Stop

Implementer stops at VERIFYING. External gate + local Qwen cold review (D52) are next.
