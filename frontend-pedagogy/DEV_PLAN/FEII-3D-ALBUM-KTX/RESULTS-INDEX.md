# Results index — FEII-3D-ALBUM-KTX

For the professor's audit before merging `cascade/FEII-3D-ALBUM-KTX` into `main`. State as of 2026-11-05 10:50: **X0–X9 DONE · X10 running · react-template satellite routes running (D24) · X11–X13 not started.** `main` is untouched. Nothing from web-atelier-udit or react-template is pushed. The aggregator repo is pushed; X10 arrives there as an unmerged PR for you.

Start with **[MERGE-CHECKLIST.md](MERGE-CHECKLIST.md)**. It lists every decision that is yours.

## 1. Read the lessons (what students will see)

Rendered locally:

```bash
cd ~/projects/ruvebal/scholar/udit/web-atelier-udit-album/web-foundations
npm run develop        # then open http://localhost:4000/web-atelier-udit/lessons/en/feii/
```

| Page | Source | What changed | Phase |
| --- | --- | --- | --- |
| Units 8–9 assignment | [index.md](../../../web-foundations/docs/lessons/en/feii/units-8-9-assignment/index.md) | Rewritten as the 3D album-cover hand-in. Four covenant bars, KTX2 choice (file bytes vs computed GPU bytes), IP rule, TTOD PR ritual on `/covers/<slug>` | X5, X7, X8 |
| Unit 8 R3F | [index.md](../../../web-foundations/docs/lessons/en/feii/unit-8-r3f-fundamentals/index.md) | Lab: a mandatory cover fork (stage/sleeve/vinyl). Beacon measurements kept | X6 |
| Unit 9 shaders | [index.md](../../../web-foundations/docs/lessons/en/feii/unit-9-shader-literacy/index.md) | Bulb stays the demo, in the beacon sandbox only. Hand-in shader samples the sleeve | X6 |
| **Cover shaders** (new satellite) | [index.md](../../../web-foundations/docs/lessons/en/feii/cover-shaders/index.md) · [exercises](../../../web-foundations/docs/lessons/en/feii/cover-shaders/exercises.md) · [deck](../../../web-foundations/docs/lessons/en/feii/cover-shaders/deck-outline.md) | `sampler2D` = the sleeve picture, UV = where on it. `SleeveMaterial.jsx`. “Explain this shader” checklist | X7 |
| **KTX2/Basis** (new satellite) | [index.md](../../../web-foundations/docs/lessons/en/feii/ktx2-basis/index.md) · [exercises](../../../web-foundations/docs/lessons/en/feii/ktx2-basis/exercises.md) · [deck](../../../web-foundations/docs/lessons/en/feii/ktx2-basis/deck-outline.md) | Texel before brand names. Suitcase vs GPU room. Computed GPU bytes. Flip and sRGB traps. `--assign_oetf srgb` | X8 |
| FE II index / tracks / lessons.yml | [feii/index.md](../../../web-foundations/docs/lessons/en/feii/index.md) · [tracks.yml](../../../web-foundations/docs/_data/tracks.yml) · [lessons.yml](../../../web-foundations/docs/_data/lessons.yml) | Satellites linked. Still 12 units; hours still 10/30/14 | X4 |
| CV Bloque 5 | [cv](../../cv/udit-ruvebal-frontend-ii-cv.md) | One paragraph | X4 |

Full diff: `git -C ~/projects/ruvebal/scholar/udit/web-atelier-udit-album diff main...HEAD -- web-foundations/docs`

### Paragraphs that need your release (agent-written, not Thessia)

Each one carries a hidden provenance comment that names the Claude executor.

- Unit 9: the cover lab lines
- Cover shaders: idea-1 paragraph
- KTX2: §1, §3, §5, plus “Four colour words first” and “Phone and editor photos”

## 2. Grounding and research (instructor-only)

| Item | Where | Phase |
| --- | --- | --- |
| Profield run 20261104: `pass1.raw.md`, `pass2.raw.md` (Ollama audit), `CONSOLIDATED.md`, `PENDING-procurement.md` | `~/src/profield/runs/ai-assisted-3d-web/20261104/` | X1, X2 |
| Evidence-matrix rows | [grounding/README.mdc](../../grounding/README.mdc) · [PROFIELD-SYNC.json](../../grounding/PROFIELD-SYNC.json) · citation transcript in `frontend-pedagogy/grounding/` | X3 |
| AUDIT-GROUNDED addendum | `web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md` (**committed via a `.gitignore` exception; see MERGE-CHECKLIST §1**) | X3 |
| Lesson-scribe records (10) | `~/src/deviac/fine-tuning/thessia-tuning-memory/2026-11-04-*feii*` (u8-lab-1, u9-lab-1, cover-shaders-idea1/2, ktx2-basis-s0…s5) | X6–X8 |

## 3. The aggregator repo (product)

- GitHub: **https://github.com/ruvebal/feii-album-covers**, private, CI `lint-and-build`
- Local: `~/projects/ruvebal/scholar/udit/courses-repos/feii-album-covers`. Run it with `npm run dev`.
- Read: `README.md`, `CONTRIBUTING.md` (TTOD ritual, route contract items 1–3), `.github/pull_request_template.md`, `CODEOWNERS`, `covers/_template/`, `src/gallery/CoverRoute.jsx` (five-prop contract), `scripts/check-registry.mjs` (sorted registry, unique `extend` keys)
- Commits: `4deb186` scaffold · `0e87d73` README · `bb5e324` X9 triage

## 3b. react-template: the lesson sandbox (D24, in progress)

- Local: `~/projects/ruvebal/scholar/udit/courses-repos/react-template`, branch **`satellites-ex3-ex5`** (unpushed; repo is **public**). Run it with `npm run dev`, then open `/ex3-cover`, `/ex4-cover-shader`, `/ex5-ktx2`.
- New routed pages: `/ex3-cover` (Unit 8 cover fork), `/ex4-cover-shader` (cover-shaders), `/ex5-ktx2` (PNG/ETC1S/UASTC switch, file bytes vs GPU bytes). Code lives in `src/cover/`; the beacon files are untouched.
- **Focus** panel on every route, beacon included (*Look at / Change / Measure*, linked to the lesson section). `// FOCUS:` comments on key lines. A README section “How to study each route”.
- **Live site is broken today:** https://ruvebal.github.io/react-template/ serves the unbuilt `index.html` (blank page; `/ex1-beacon` returns 404). The branch adds a GitHub Actions Pages build. Publishing is yours: merge + push, then switch Pages Source to GitHub Actions. See MERGE-CHECKLIST §3c.
- Lessons will link each CodeSandbox-ready block to its *live route · source file* in react-template (X11 step 11). Publish react-template **before** the lessons.
- Implementer report (when it finishes): `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/rt-sat/REPORT.md`, followed by a cold review.

## 4. How each phase was checked (audit trail)

Every phase has, in this folder: `PHASE-Xn-REPORT.md` (executor claims, then the orchestrator's triage table and DONE decision), `PHASE-Xn-VERIFY-LOG.md` (the harness exit-gate run) and `PHASE-Xn-COLD-REVIEW.md` (a fresh reviewer's findings, often in two rounds).

| Phase | Outcome | Notable findings (all closed or deferred in writing) |
| --- | --- | --- |
| X0 probes | DONE, 0 findings | — |
| X1 research | DONE | P2: disk too full for an independent build |
| X2 corpus | DONE | P2: same |
| X3 grounding | DONE, round 2 | Private-file boundary (a `.gitignore` exception; see checklist) |
| X4 structure | DONE, 0 findings | — |
| X5 assignment | DONE, 0 findings | — |
| X6 Units 8–9 | DONE, round 2 | Unit 9 bulb paste broke the cover fork, fixed |
| X7 cover shaders | DONE, round 2 | **`renderer.info.memory.textures` is a count, not memory** (F16 → D3/D22 amended); KTX2 flip and sRGB traps |
| X8 KTX2 | DONE, round 2 | **`--assign_oetf`, never `--convert_oetf`** (measured); one shared transcoder at root |
| X9 aggregator | DONE, round 2 | Shared R3F `extend` names swapped shaders between routes, fixed + CI guard; D23 |

Decisions and evidence: [DECISIONS.md](DECISIONS.md) (D1–D25) · [FINDINGS-2026-11-04.md](FINDINGS-2026-11-04.md) (F1–F16) · runner [autopilot.sh](autopilot.sh) · gates `PHASE-Xn.exit-gate.sh`.

## 5. Still to come

- **X10:** `_studio` reference cover with real ETC1S/UASTC encodes (toktx 4.4.2 installed). Vendored transcoder, Unit 9 per-frame probe.
- **X11:** publish gates, plus deferred lesson nits (X6 G1/G2, X7 G4, X8 G4/G5, X9 F1/F2/F3/F5 sentences), plus the react-template *running reference* link under every code block (D24).
- **X12:** closing audit against AUDIT-GROUNDED and D1–D25 → `CLOSING-AUDIT.md`.
- **X13 (new, D25):** a 3D terminology satellite `feii-3d-terminology` ([PHASE-X13.md](PHASE-X13.md)). It opens with your oral paragraph verbatim (“The sleeve is a picture on the GPU, not an `<img>`…”), then gives a glossary in which every term links to the lesson section that defines it. It is a satellite, not a unit, and adds no hours. Its gate re-runs the X11 and X12 gates.
