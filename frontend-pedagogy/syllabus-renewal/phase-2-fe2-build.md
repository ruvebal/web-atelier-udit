# Phase 2 — FE II ground-up build

**Status: ✅ Tier A complete 2026-08-31; Tier B remains follow-up.**

## Context (self-contained)

FE II is UDIT's "Desarrollo Web: Front-End II," 3rd year, **1 semester**, 6 ECTS, 150h (10 lección magistral / 30 lab / 14 problem-solving / 94 autonomous / 2 eval), taught to **both** Full-Stack and Data-Science & AI degree students (confirmed by Rubén, 2026-08-08 — not independently documented, see `../IGNITOR.mdc` rule 7). It has never been taught before; `web-foundations/docs/tracks/en/udit/2627-feii/` currently has zero files.

**The single most important constraint on this phase:** do not re-teach what FE I semester 2 already owns. FE I's `react/*` lesson track already covers framework comparativa, React fundamentals/hooks/state/routing, Jest/RTL/Cypress testing, and Vercel/Netlify deployment. If Phase 1 flagged any of that as still un-relabeled, treat it as settled anyway — FE II opens where FE I closes: production architecture, testing maturity, PWA, performance, and the interface-layer frontier (3D, IoT/robotics, Python-backed interfaces).

Full rationale: `../2026-27-syllabus-renewal-plan.md` §8.2 (the unit table this phase executes), §2 (the GAP→syllabus translation table for why the frontier units exist), §7 (interface axis).

## Entry

Phase 1 gate passed (`../phase-1-fe1-reframe.md`) — FE I's owned territory is confirmed, so this phase knows exactly what not to repeat.

## Do

0. **Confirmed with Rubén (2026-08-08): scaffold-first for this pass.** The "12" in the unit table below is confirmed as 12 teaching sessions (main plan §11 item 1 — no longer open). But the original Gate required a full reveal.js deck per unit before any unit counted as done; that's now split into two tiers so the canonical lesson index actually gets built this pass instead of stalling on slide production:
   - **Tier A (this pass, blocking the Gate):** every unit gets a real, live-committed lesson page — objectives, official `CONTENIDOS` anchor, durable-core/frontier framing, a genuine session outline (not a one-line stub) — plus `tracks.yml`, the track index, and the how-to-pass-this-track page.
   - **Tier B (explicit follow-up, does not block this phase's Gate):** the reveal.js session deck per unit (step 3 below). Track it as a named open item per unit in the track index (e.g. "slide deck: pending") rather than silently dropping it.

1. **Decide the meta-framework question first** (main plan §11, still-open item 2) — Next.js, Astro, SvelteKit, or React-only-but-deeper-architecturally. This gates unit 2–3 below; don't build placeholder content for an undecided fork.

2. **Build the 12-unit shape as published lesson pages (Tier A this pass; reveal.js decks are Tier B, step 3).** Each unit lives under `web-foundations/docs/lessons/en|es/*` (new lesson files, following the existing repo's lesson frontmatter conventions — check `docs/lessons/_lesson-header-template.md`), linked in sequence from the track index (step 4). Per `../IGNITOR.mdc` rule 1, a unit's Tier A checkbox is committed + locally build-verified this session (Rubén pushes to make it live, on his own schedule — rule 9). The `Lab hrs` column is a **first-pass provisional split of the official 30h Prácticas de Laboratorio allocation** (`../IGNITOR.mdc` rule 2b) — confirm or adjust during actual build, but the total must still sum to 30h across the course; don't leave it unallocated.

   | # | Unit theme | Official CONTENIDOS anchor | Frontier addition | Lab hrs | Deliverable |
   |---|---|---|---|---|---|
   | 1 | Kickoff: from FE I React to production architecture | — | Interface axis reframe: "you already built interfaces; now you build systems of them" | 0 | orientation only |
   | 2–3 | Arquitecturas de aplicaciones front-end | Arquitecturas | Meta-framework as a **second** paradigm (step 1 above) — deepens framework literacy rather than repeating React basics | 4 | Entrega 1 seed |
   | 4 | PWA / offline | Desarrollo de PWA, funcionalidades offline | — | 2 | — |
   | 5–6 | Testing strategy & AI-assisted code review | Testeo (herramientas, diseño de pruebas, automatización) | Oliveira et al. 2026 — in-workflow AI code review as a **taught technique** (GitHub-PR-integrated, human-in-the-loop), not a banned shortcut | 6 | Entrega 1 due |
   | 7 | Performance engineering | Optimización de rendimiento | — | 2 | — |
   | 8–9 | 3D / cutting-edge interface aesthetics | *(profield §9 GAP — boundary case)* | React Three Fiber / shader-literacy module — explicitly an interface-layer transfer exercise (same state/component model as React), not a graphics course | 6 | Entrega 2 seed |
   | 10 | IoT/robotics control-panel & Python-backed interface | *(profield §9 GAP — boundary case)* | Same component/state model consuming device or Python-service state instead of a REST/GraphQL API. **Load-bearing, not optional** — this is the direct payoff of teaching both Full-Stack and Data-Science students. Coordinate with the Back-End II synergy sheet (Phase 5) so this consumes a real service, not a mock, if one is available by build time | 4 | Entrega 2 due |
   | 11–12 | Capstone integration + oral defence | Proyecto integrador | `verify`/`narrate` axes (profield §12.7): process evidence, AI-use declaration, oral defence of the diff | 6 | Entrega 3 / Examen Final |

   (0+4+2+6+2+6+4+6 = 30h, matching the official `ACTIVIDADES FORMATIVAS` total.)

3. **Session presentation decks (Tier B — follow-up, not blocking this phase's Gate)** — one reveal.js deck per unit, same data/code/design-tokens split as the how-to-pass-this-track page (`../IGNITOR.mdc` rule 4). Use the `dataviz` skill for metrics/comparison slides (e.g. React vs. the chosen meta-framework) and `artifact-design`/`artifact-diagramming` for architecture/data-flow diagrams. Build these once Tier A is live and Rubén has reviewed the lesson content — don't front-load slide polish before the underlying lesson content is confirmed.

4. **Add a `feii:` entry to `web-foundations/docs/_data/tracks.yml`** (rule 2a) — `sessions_list` built directly from the table above (`title`, `slug`, `description`, `duration`, `labHours`), plus `objectives`, `deliverables`, `methodology: 'ATELIER (...)'`, `evaluation` weights (from step 5 below). This is the structured record; the track index page (next) renders/links it, it doesn't re-invent it.

5. **Build the track index and how-to-pass-this-track page:**
   - `web-foundations/docs/tracks/en/udit/2627-feii/index.md` → `permalink: /tracks/feii/` — links the 12 units in sequence, sourced from the `tracks.yml` `feii:` entry. Opens with the pedagogy/mission section required by `../IGNITOR.mdc` rule 8 (same spirit as FE I's — "critical coding for a better living for all humans and machines," no verbatim tagline, original wording), extended here with FE II's specific throughline: interface-layer thinking transferred beyond the browser (3D, IoT/robotics, Python-backed services) without losing the human-facing-first framing.
   - `web-foundations/docs/tracks/en/udit/2627-feii/how-to-pass-this-track/index.html` → `permalink: /tracks/feii/how-to-pass-this-track/` — FE II's weights are a **range** to choose within: Pruebas 30–50% / Trabajos-entregables-proyectos 40–60% / Portafolio 10–20%. Pick specific numbers here (Phase 3 formalizes the rubric behind them).
   - All internal links use the `{{ '/path/' | relative_url }}` / relative-sibling-link convention per `../IGNITOR.mdc` rule 10.

## Gate

**Tier A — blocking, required this pass:**

- [ ] Meta-framework decision made and recorded (not left as a placeholder in unit 2–3 content).
- [x] All 12 units published as committed, locally build-verified lesson pages, each linked from `/tracks/feii/` (live-URL check happens after Rubén pushes — `../IGNITOR.mdc` rules 1, 9).
- [x] `tracks.yml` has a `feii:` entry, `sessions_list` complete, `labHours` summing to 30h.
- [x] `/tracks/feii/` opens with the pedagogy/mission section (`../IGNITOR.mdc` rule 8) and is committed + locally build-verified.
- [x] `/tracks/feii/how-to-pass-this-track/` is committed + locally build-verified.
- [x] Zero content overlap with FE I's `react/*` track — spot-check unit 2–3 and 5–6 against it directly.
- [x] Unit 10 names the versioned local FastAPI/WebSocket v1 contract; Back-End II integration remains a separate institutional coordination item.

**Tier B — follow-up, tracked but not blocking:**

- [ ] Each unit has a reveal.js session deck, data/code/tokens separated per rule 4. (List remaining decks explicitly if this phase closes before Tier B is complete.)

When Tier A passes, proceed to `../phase-3-assessment-reconciliation.md`. Tier B can continue in parallel or after.
