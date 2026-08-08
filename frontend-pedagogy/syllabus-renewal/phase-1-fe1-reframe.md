# Phase 1 — FE I reframe (audit, not rebuild)

**Status: not started.**

## Context (self-contained — read this even if you have no prior conversation history)

FE I is UDIT's "Desarrollo Web: Front-End I," Grado en Desarrollo Full-Stack, 2nd year, **annual** (both semesters), 6 ECTS. It is **already substantially built**: semester 1 (vanilla JS/CSS, no frameworks) has ~25 lessons under `web-foundations/docs/lessons/en|es/*`; semester 2 (React) has a mature 15-lesson track under `web-foundations/docs/lessons/en|es/react/*`, including two AI-assisted-development lessons and a capstone. This phase is an **audit-and-relabel pass**, not new content — read the operating rules in `../IGNITOR.mdc` first, especially rule 1 (definition of done = published endpoint) and rule 3 (exact permalinks).

Full rationale: `../2026-27-syllabus-renewal-plan.md` §8.1 (the audit table this phase executes) and §7 (the `interface` axis framing to relabel through).

## Entry

Phase 0 done (`../phase-0-research-triage.md`).

## Do

1. **Open every lesson file listed in the audit table below — don't infer content from folder names.** For each cluster, confirm the official `CONTENIDOS` match still holds (source: `/Users/ruvebal/src/unicrawler/output/guides/udit/desarrollo-web-front-end-i-2025-2026.json`) and add the durable-core/interface-axis framing (main plan §1, §7) to the lesson's opening framing where it's missing — this is light-touch relabeling, not a rewrite of the technical content.

   | Cluster | Official CONTENIDOS anchor | Action |
   |---|---|---|
   | `html-css-basics`, `responsive`, `intrinsic-web-design`, `pseudo-elements-and-state-styling`, `typography-color`, `web-animations` | Hojas de estilo avanzadas, diseño responsivo, animación web | Relabel through durable-core lens; confirm no gap |
   | `js-intro`, `js-dom-manipulation`, `js-modules`, `linting-and-formatting` | JS avanzado, módulos, buenas prácticas | Confirm async/fetch/API-consumption coverage matches the CV's Módulo 2; confirm no gap |
   | `3d`, `gsap`, `web-design-trends`, `modern-web-design-trends` | "Motores físicos para web… elementos multimedia y 3D… arte generativo" (explicit official CONTENIDOS) | Confirm this is the seed FE II's 3D unit (Phase 2) builds *on*, not a duplicate of |
   | *(no dedicated lesson found as of Phase 0)* | Módulo 3 UX/UI + accessibility, per CV | See step 2 below — resolve before deciding whether this needs a new lesson or already exists under a name not yet found |
   | `react/*` (15 lessons) | Framework comparativa, React, testing, deployment | **Do not touch beyond relabeling.** This is FE I-owned territory — it defines what Phase 2 (FE II) must *not* repeat |
   | `portfolio-template-brief`, `geophysical-aggregator-project` | Proyecto integrador de Frontend I | Confirm still matches "SPA sencilla sin frameworks + backend coordination" brief from `udit-ruvebal-frontend-i-cv.md` |

2. **Resolve the UX/UI sibling-course boundary.** Rubén has direct, real knowledge of "Introducción al Diseño de Interfaces y a la Experiencia de Usuario en Entornos Web: UX/UI" (a separate UDIT course for the same degree). Ask him for the actual boundary if it isn't already recorded somewhere in this repo by the time you run this phase; scope FE I's Módulo 3 to *implementation-adjacent* UX (heuristics applied to the student's own code, WCAG-in-practice) and leave deep UX theory/research methods to the sibling course. Write the outcome as a short scope note — this doubles as input to Phase 5's UX/UI boundary deliverable.

3. **Reconcile the semester-2 sequence and build the missing semester-1 sequence, both into `web-foundations/docs/_data/tracks.yml`** (per `../IGNITOR.mdc` rule 2a — this is the established schema, don't invent a parallel one):
   - Semester 2 already has a rich hand-authored sequence at `docs/lessons/en/react/index.md` (15 lessons across 4 phases, with `duration` and a "Hands-On:" callout per lesson — but not yet a `labHours` figure). Transcribe it into a `fei:` entry's `sessions_list`, splitting each lesson's blended duration into `duration` (total) and `labHours` (the guided hands-on portion — read the "Hands-On:" callout to judge how much of the total is lab vs. lecture; when genuinely ambiguous, default to roughly half of non-autonomous time, and say so explicitly rather than guessing silently).
   - Semester 1 has **no** equivalent sequence anywhere — build one now, ordering the audit-table clusters above into an actual taught sequence (open each lesson file to judge real prerequisite order; don't assume alphabetical/folder order is pedagogical order, the way `react/index.md`'s explicit dependency graph makes clear it usually isn't).
   - Across both semesters, `labHours` must sum to the official 30h (source: `desarrollo-web-front-end-i-2025-2026.json`'s `formative_activities`).
4. **Build the track index and how-to-pass-this-track page** (committed + locally build-verified this session — Rubén pushes on his own schedule, see `../IGNITOR.mdc` rules 1 and 9; exact permalinks per rule 3):
   - `web-foundations/docs/tracks/en/udit/2627-fei/index.md` → `permalink: /tracks/fei/` — summarizes the **annual** arc (semester 1 vanilla → semester 2 React), rendering/linking the `tracks.yml` `fei:` sequence from step 3 rather than re-listing lessons by hand. Opens with the pedagogy/mission section required by `../IGNITOR.mdc` rule 8 (spirit of "critical coding for a better living for all humans and machines," no verbatim tagline — original wording grounded in profield's interface/durable-core/AI-stance/accessibility framing), structured like `tracks/es/ilustracion-webapp/index.md`'s mission-quote + AI-disclosure blockquote right after the TOC.
   - `web-foundations/docs/tracks/en/udit/2627-fei/how-to-pass-this-track/index.html` → `permalink: /tracks/fei/how-to-pass-this-track/` — reveal.js, following the data/code/design-tokens split in `../IGNITOR.mdc` rule 4. FE I's weights are fixed by the official guide: Pruebas 30% / Trabajos-entregables-proyectos 60% / Portafolio 10%. Content instantiated from `../how-to-pass-this-track.md` (the shared institutional template), not copied verbatim — FE I-specific Entregas, dates, and the vanilla-SPA integrator project deliverable described in the CV.
   - All internal links (track index → lessons, track index → how-to-pass page) use the `{{ '/path/' | relative_url }}` / relative-sibling-link convention per `../IGNITOR.mdc` rule 10 — never a hardcoded `ruvebal.github.io` URL.

## Gate

- [ ] Audit table above fully filled with confirmed status per cluster (no `TBD`/unconfirmed rows left).
- [ ] UX/UI boundary note exists (even in draft form) and Módulo 3's scope is decided.
- [ ] `tracks.yml` has a `fei:` entry covering **both** semesters, `sessions_list` complete, `labHours` summing to 30h.
- [ ] `/tracks/fei/` and `/tracks/fei/how-to-pass-this-track/` are committed and confirmed via a local Jekyll build to resolve at the correct path (live-URL check happens after Rubén pushes, not blocking this Gate — `../IGNITOR.mdc` rule 1).
- [ ] `/tracks/fei/` opens with the pedagogy/mission section (`../IGNITOR.mdc` rule 8).
- [ ] No React/framework/testing/deployment content was added or rewritten — that territory stays exactly as-is, confirmed untouched. (`tracks.yml` transcribes it; it does not edit `react/index.md` or any `react/*` lesson file.)

When this gate passes, proceed to `../phase-2-fe2-build.md`.
