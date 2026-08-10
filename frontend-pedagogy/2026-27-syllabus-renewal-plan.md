# FE I / FE II 2026–27 Syllabus Renewal — Planning Document

**Status:** planning only — nothing in this document has been executed. No lesson files, CV rewrites, or grading rubrics have been created or modified as part of this plan. It exists to align rationale before Phase 1 begins.

**Author of this pass:** drafted by Claude at Rubén Vega Balbás' request, synthesizing `profield-frontend-pedagogy.md` (pass-4, post GAP/NOISE triage) against UDIT's official course guides, the existing `web-foundations` repo state, and the BOE cross-institution comparison corpus.

**Companion document:** [`profield-frontend-pedagogy.md`](./profield-frontend-pedagogy.md) — the research-field spec this plan draws its evidence from. Every `[UNVERIFIED-GAP]` cited below is a live link into that document, not a paraphrase.

**Executable cascade (2026-08-08):** this file is the *rationale* — why each decision below was made. It is not itself meant to be pasted into a future session as a task prompt. For that, see [`syllabus-renewal/IGNITOR.mdc`](./syllabus-renewal/IGNITOR.mdc), which subdivides Phases 1–6 (§9 below) into one self-contained, prompt-engineered `.md` file per phase, each with an `Entry` / `Do` / `Gate` structure. Read this document first for the "why"; use the cascade for the "do."

---

## 0. Read this first — the four findings that change the plan

Before anything else, four things surfaced while gathering context that are more consequential than the syllabus design itself:

1. **The official FE II 2026/2027 Guía Docente PDF has a real clerical defect**, not a research gap. `GDFS-2026-2027-3-Desarrollo Web Front-End II.pdf` has correct, on-topic `CONTENIDOS`, `RESULTADOS DE APRENDIZAJE`, `ACTIVIDADES FORMATIVAS`, and `SISTEMAS DE EVALUACIÓN` sections — but its `TEMARIO` (1. Dibujo de observación… 2. Análisis de luz y sombras… 3. Dibujo de la figura humana… 4. Diseño de personajes… 5. Cuaderno de Bocetos) and its entire bibliography (Boerboom, Lauricella, Simblet, Arnheim, Gombrich — all figure-drawing/anatomy references) are copy-pasted from an unrelated subject, almost certainly an Illustration/Character Design course. **Decision (2026-08-08): this is not a "flag and wait" item — we author the correct `TEMARIO` and bibliography ourselves and submit them to the department.** Both the FE I and FE II 2026/2027 guides need a properly authored `TEMARIO` (the official template's numbered-topics field is distinct from the prose `CONTENIDOS` field, and FE I's current guide should be checked for the same gap, not assumed clean). This is now a real Phase 5 deliverable — see §9 — not an institutional-cleanup afterthought. Do not treat the current `TEMARIO`/bibliography sections of the FE II PDF as authoritative anywhere in this renewal until replaced.

2. **FE I is not a blank slate — most of it is already built.** `web-foundations/docs/lessons/en|es/` already contains ~25 canonical lessons for the vanilla-JS semester (`js-intro`, `js-dom-manipulation`, `js-modules`, `html-css-basics`, `responsive`, `web-animations`, `intrinsic-web-design`, `3d`, `bootstrap`, `tailwind`, `linting-and-formatting`, `atelier-prompts`, `portfolio-template-brief`, …) and a **mature, 15-lesson React track** (`lessons/en/react/`) that already includes `ai-assisted-development-foundations`, `ai-assisted-routing`, `frameworks-comparative`, `react-fundamentals`, `react-hooks`, `react-state-architecture`, `react-routing`, `react-testing`, `react-performance`, `react-deployment`, `react-authentication`, `react-backend-integration`, and a capstone (`geophysical-aggregator-project`). FE I's renewal is a **reframe-and-audit pass, not a rebuild**.

3. **FE II is genuinely empty** — `docs/tracks/en/udit/2627-feii/` exists as a scaffolded folder with zero files. This confirms the intent to build it there but means Phase 2 (below) starts from the official `CONTENIDOS` and the profield research, not from any existing draft content — **except see finding 4**.

4. **The FE II CV draft largely re-teaches FE I semester 2, rather than extending past it.** This is the single most important structural finding in this pass. Compare `udit-ruvebal-frontend-ii-cv.md`'s Módulo 4 (frameworks intro/comparativa React-Vue-Svelte), Módulo 5 (React fundamentals, hooks, routing, Context), Módulo 6 (Jest/RTL/Cypress testing), Módulo 7 (Vercel/Netlify deployment + performance) against the **already-built** FE I react lesson folder: `frameworks-comparative`, `react-fundamentals`, `react-hooks`, `react-state-architecture`, `react-routing`, `react-testing`, `react-performance`, `react-deployment`. The overlap is near 1:1. If FE II is built as currently envisioned in that CV, third-year students would substantially repeat second-year content under a new course code. **This is the core design problem Phase 2 solves** — not "what should FE II contain" in the abstract, but "what does FE II contain that FE I semester 2 doesn't already own."

---

## 1. Data inventory — what was consulted and what it's worth

| Source | Gives you | Confidence |
|---|---|---|
| `desarrollo-web-front-end-i-2025-2026.json` | Official FE I guide: 6 ECTS, year 2, **annual** (both semesters), competencies CN03/HB02/HB05/HB06/CM01, contents list, hours (10/30/14/94/2), evaluation (Pruebas 30% / Trabajos-entregables-proyectos 60% / Portafolio 10%) | Authoritative, current |
| `GDFS-2026-2027-3-Desarrollo Web Front-End II.pdf` | Official FE II guide: 6 ECTS, **3rd year, 1st semester only**, same competency set, `CONTENIDOS` = frameworks profesionales (componentes/directivas/enrutamiento/librerías), arquitecturas front-end, PWA/offline, testing (herramientas/diseño/automatización), optimización de rendimiento; evaluation as **ranges** (Pruebas 30–50% / Trabajos 40–60% / Portafolio 10–20%); same hour structure as FE I (10/30/14/94/2 = 150h) | Authoritative for `CONTENIDOS`/evaluation/hours **only** — see finding 1 for what to discard |
| `udit-ruvebal-frontend-i-cv.md` | Instructor's own semester-1 curricular narrative (CSS3 avanzado, JS avanzado + async/fetch, UX/accessibility, vanilla-SPA integrator project) | Author's own draft; **covers semester 1 only** — no React/semester-2 section exists in this document at all, even though semester 2 is fully built as lessons (see §8) |
| `udit-ruvebal-frontend-ii-cv.md` | Instructor's own FE II envisioning (Módulos 4–7: frameworks, React, testing, deployment) | Author's own draft; **see finding 4** — largely duplicates FE I semester 2 |
| `udit-web-subjects-boe.json` + `INDEX.json` | BOE-level comparison scope; confirms FE I/II are Full-Stack-degree-specific, with only loosely-related Multimedia-degree siblings (`Diseño web avanzado`, `Fundamentos del diseño web`) that have no guide content available | Authoritative for scope, not content (siblings have `guide_available: false`) |
| `INDEX.json` sibling probe | Full-Stack degree also runs `Fundamentos del Desarrollo Web`, `Introducción al Diseño de Interfaces y a la Experiencia de Usuario en Entornos Web: UX/UI`, and `Desarrollo Web: Back-End I` as public, separate courses. **No Back-End II or Front-End II guide is exposed publicly** — Back-End II's actual scope is therefore an assumption, not a verified fact, wherever FE II content depends on it (GraphQL, JWT coordination) | Names confirmed; **content of these three siblings was not available in this corpus** — treat overlap risk as `[UNVERIFIED-GAP]`, not confirmed duplication (see §5) |
| `uem-ux-interfaces.json`, `unir-usabilidad-interfaces.json` | Cross-institution FE-II comparables: both are **UX-theory/usability-evaluation** courses (Gestalt, heuristics, wireframing, information architecture), not implementation courses | Useful for positioning FE II as *implementation-heavy*, differentiated from theory-heavy UX courses elsewhere |
| `how-to-pass-this-track.md` (renamed 2026-08-08 from `cheetsheet.md`, §4) | The literal institutional deliverables/exam template: `Entrega 1/2/3` + `Examen Parcial` + `Examen Final` + `Asistencia y Participación` + `Evaluación Ordinaria/Extraordinaria`, with a blank header reading "Grado en Ciencia de Datos e IA" | Template structure is authoritative and **mandatory** for however FE I/FE II deliverables get packaged for submission; the "Ciencia de Datos e IA" header turned out to be real evidence, not a reused blank template — see §3 item 5, confirmed FE II Data-Science cross-listing |
| `web-foundations/docs/lessons/`, `docs/tracks/`, `docs/evaluation/`, `docs/templates/AI_POLICY.md` | The **existing** Web Atelier infrastructure: ATELIER methodology cycle (Exploration→Conceptualization→Production→Exhibition→Reflection), an already-written evaluation rationale (Technical 40% / Reflection&Documentation 35% / Conceptual 25%), an existing AI-disclosure policy statement, and a validated precedent track (`tracks/es/ilustracion-webapp/`) showing exactly what a docs-first, AI-assisted, 4-session track looks like in this repo's own house style | Ground truth for "how things are already built here" — Phase 2 should extend this, not invent a parallel system |
| `profield-frontend-pedagogy.md` (pass-4, GAP/NOISE-triaged) | The research layer: durable-core/volatile-layer axis (profield §1), AI-assisted-coding scaffolding mechanisms (profield §4), accessibility-as-durable-core (profield §5), and — most relevant here — profield §9 Cross-platform interface-layer transferability, whose 6 `[UNVERIFIED-GAP]` claims are exactly the frontier FE II should stake out | Research-grade, source-verified; GAP tags are candidate curriculum briefs, NOISE tags are excluded below |

---

## 2. The GAP → syllabus translation (what "upgrade the UNVERIFIED question" unlocks)

This was the prerequisite you asked for, done first: every `UNVERIFIED` tag in `profield-frontend-pedagogy.md` is now `[UNVERIFIED-GAP]` (a real frontier — absence + adjacent grounding + actionable now) or `[UNVERIFIED-NOISE]` (a reified metaphor, excluded from design reasoning). Of 21 substantive claims, 20 triaged GAP, 1 NOISE (the "skill half-life" formal-construct claim — a classroom metaphor, not a research target; do not build a module around formalizing it).

The GAP claims cluster almost entirely in profield §8 (3D/immersive) and profield §9 (cross-platform transferability) — which is exactly the material you asked to motivate FE II with. Direct translation:

| profield GAP claim | FE II syllabus move |
|---|---|
| profield §9: "IoT and robotics control-panel interfaces… no HE pedagogy source specific to teaching the *interface* layer" | A module treating IoT/robotics dashboards as a **transfer exercise for the same component/state/API concepts already taught in React** — not a robotics course, an interface-layer course that happens to render device state |
| profield §9: "Python-backed interfaces… no peer-reviewed HE pedagogy source located" | Direct hook to the now-**confirmed** full-stack & data-science cross-listing (§3 item 5) — a module where the front-end consumes a Python-backed (FastAPI/Streamlit-adjacent) service, positioning FE II as legible to Data Science cohorts without becoming a data-science course |
| profield §8: "No settled sequencing model for 3D web in HE" | Licenses FE II to **propose and pilot one** rather than search for a citation that doesn't exist yet — the sequencing in §8.2 below is a first attempt, explicitly labeled as a pilot |
| profield §8: "No strong evidence on assessing individual learning in AI-assisted 3D web projects" | Directly answered by the `verify`/`narrate` axes already in this repo's evaluation rationale — process evidence (commit narrative, oral defence of a shader or R3F scene) generalizes cleanly from React to Three.js/R3F work |
| profield §4: Oliveira et al. 2026 — in-workflow AI code review as scaffolded feedback | Concrete mechanism for FE II's testing module: AI-assisted PR review as a **taught technique**, not a banned shortcut |
| profield §1/§2: durable-core vs. volatile-layer axis | The organizing principle for *why* FE II is architecture/testing/performance/PWA (durable interface engineering) plus 3D/IoT/Python boundary cases (transferability), rather than "more framework syntax" |

The NOISE-side lesson is equally useful: it tells you **not** to spend design effort inventing a formal "skill half-life curve" exercise — that's decorative, not a lever.

---

## 3. Non-overlap constraints

1. **FE I Módulo 3 (UX/UI fundamentals + accessibility) vs. the sibling course "Introducción al Diseño de Interfaces y a la Experiencia de Usuario en Entornos Web: UX/UI."** ~~Open action~~ **Resolved (2026-08-08): Rubén has direct, real knowledge of this course's content.** Not yet transcribed into this plan — next step is to pull the actual boundary from him (or its guide) and scope FE I's Módulo 3 to *implementation-adjacent* UX (heuristics applied to your own code, WCAG-in-practice), leaving deep UX theory/research methods to the sibling course. Treat as ready-to-resolve in Phase 1, not a research blank anymore.
2. **FE II's REST/GraphQL/JWT integration content depends on Back-End II.** ~~Coordination dependency, unconfirmed~~ **Resolved (2026-08-08): Rubén is already in direct contact with the Back-End II professor, and this is now a collaboration opportunity, not just a risk to manage.** New Phase 5 deliverable: a **synergy workflow sheet** — what FE II needs from Back-End II (endpoint shapes, auth contract, GraphQL-vs-REST commitment, staging/seed-data conventions) and what FE II can offer Back-End II in return (a consuming front-end for their students' APIs, shared testing/CI conventions, joint capstone framing) — see §9.
3. **No overlap risk identified** between FE I/FE II and `Fundamentos del Desarrollo Web` or `Desarrollo Web: Back-End I` — these sit cleanly upstream/adjacent per the existing coordination language already in both CVs.
4. **Cross-campus comparables** (UEM `UX e Interfaces de Usuario`, UNIR `Usabilidad en Sistemas de Información e Interfaces`) are both UX-theory courses at other institutions/degrees. They confirm FE II is differentiated by being *implementation-heavy* — useful positioning language, not a content source.
5. **Data-Science cross-listing.** ~~Open question~~ **Resolved (2026-08-08): confirmed — Front-End is taught to both Full-Stack and Data-Science degree students.** This upgrades `cheetsheet.md`'s "Grado en Ciencia de Datos e IA" header from "probably a reused blank template" to real evidence of the actual audience. It also upgrades §8.2 unit 10 (Python-backed interfaces) from a nice-to-have hook to a **load-bearing requirement**, and means every FE II unit should be checked for whether it reads as legible/relevant to a Data-Science student, not only a Full-Stack one — not by diluting the front-end-engineering content, but by keeping the interface-layer framing (§7) explicit enough that "why does a data-science student need this" always has an answer on the slide.
6. **Full-degree syllabi as a source for backend connecting points — checked, dead end.** `/Users/ruvebal/src/unicrawler/output/udit-syllabi/1500203-…full-stack….json` and `…/1500206-…ciencia-de-datos-e-inteligencia-artif….json` (the complete Full-Stack and Data-Science degree plans) both exist but are **empty stubs** — `"subject_count": 0, "subjects": []`. The unicrawler scraper hasn't populated either degree's full subject list yet (unlike the sibling design-degree syllabi in the same folder, which are 7–14KB and populated). This isn't a research gap to interpret — it's a tooling gap, out of scope for this renewal. **Practical consequence: the Back-End II synergy sheet (item 2 above) and the Data-Science cross-listing (item 5 above) rest entirely on Rubén's direct professor contact and first-hand knowledge, not on any independently-checkable degree-plan document.** That's fine as a basis for building the synergy sheet, but worth knowing before citing either fact to a third party (e.g. in the TEMARIO submission, §9 Phase 5) as if it had documentary backing.

---

## 4. Site architecture (2026-08-08): two tracks, each with a published "how to pass this track" page

**Decided:** FE I and FE II are **tracks**, not loose lesson clusters — published under the site's existing `/tracks/` hub (already live at `https://ruvebal.github.io/web-atelier-udit/tracks/`, currently returns 200; `/tracks/fei/` currently 404 — confirmed not yet built). Exact permalinks:

| Page | Permalink | Jekyll source (folder is free; `permalink:` frontmatter controls the URL, same pattern already used by `tracks/es/ilustracion-webapp/index.md` and `evaluation/en/index.md`) |
|---|---|---|
| FE I track index | `/tracks/fei/` | `docs/tracks/en/udit/2627-fei/index.md` |
| FE I how-to-pass-this-track | `/tracks/fei/how-to-pass-this-track/` | `docs/tracks/en/udit/2627-fei/how-to-pass-this-track/index.html` (reveal.js, see below) |
| FE II track index | `/tracks/feii/` | `docs/tracks/en/udit/2627-feii/index.md` |
| FE II how-to-pass-this-track | `/tracks/feii/how-to-pass-this-track/` | `docs/tracks/en/udit/2627-feii/how-to-pass-this-track/index.html` |

**Renamed (2026-08-08, twice):** `frontend-pedagogy/cheetsheet.md` → `how-to-pass-this-subject.md` → [`frontend-pedagogy/how-to-pass-this-track.md`](./how-to-pass-this-track.md), settling on "track" to match the site's own vocabulary and the URL slug above. This file stays the **institutional source of truth** (UDIT's literal submission template, unchanged) and the shared **methodology reference** both track pages are built from — it is not itself published; the two track-specific pages above are.

The template's slots remain non-negotiable for every deliverable design in Phase 3, and get instantiated **once per track** (weights differ — FE I's are fixed, FE II's are chosen within an official range):

- `Entrega 1`, `Entrega 2`, `Entrega 3` — named deliverable, description, orientative date, % weight, observations
- `Examen Parcial` — requires Entregas 1–2 submitted first
- `Examen Final` — requires Entregas 1–3 submitted first
- `Asistencia y Participación` — % weight
- `Evaluación Ordinaria` (pass threshold: mean ≥ 5.0, any single deliverable < 4.5 fails the course) / `Evaluación Extraordinaria` (resit conditions)

**Reconciliation logic for Phase 3:** the three coexisting assessment framings in this repo/institution do not compete, they nest:

```
how-to-pass-this-track (per-track institutional packaging — what gets submitted to UDIT)
   └─ Entrega 1/2/3, Examen Parcial/Final, Asistencia  ← literal slots, mandatory
        └─ populated using official guide weight RANGES
             (FE I: Pruebas 30% / Trabajos 60% / Portafolio 10% — fixed
              FE II: Pruebas 30–50% / Trabajos 40–60% / Portafolio 10–20% — a range to set)
                  └─ each slot's *content and rubric* comes from the Atelier evaluation
                     rationale already in docs/evaluation/en/index.md
                     (Technical 40% / Reflection&Documentation 35% / Conceptual 25%,
                      evidenced via commits, deployments, AI-usage disclosures, oral defence)
```

Concretely: an `Entrega` is never just a graded artifact — it is packaged with its own commit history, an AI-use declaration, and (for at least one deliverable per course) an oral defence slot, so the institutional line-item and the Atelier process-evidence rubric are the same underlying evidence, just described twice for two audiences.

**Build target: [reveal.js](https://github.com/hakimel/reveal.js), with data, code, and design tokens kept in separate files** — modeled directly on the working precedent at `/Users/ruvebal/src/MSCA/SVCM/web/pitch/`, which already solves "reveal.js inside a Jekyll site without fighting Tailwind":

```
docs/tracks/en/udit/2627-fei/how-to-pass-this-track/
  index.html          ← structure + reveal.js bootstrap only — no inline content, no inline color values
  data/
    content.json       ← the actual slide text: Entregas, Examen Parcial/Final, Asistencia, rubric bullets
  design/
    tokens.json         ← palette only (light/dark) — reuse docs/assets/css/site.css's existing
                           CSS custom properties (--background, --foreground, etc.) rather than
                           inventing a second token system; tokens.json holds only what's specific
                           to this deck (accent, line) the way the pitch precedent does
  vendor/
    reveal.js, reveal.css  ← vendored locally, no npm/build step (matches the pitch precedent;
                              this repo has no reveal.js dependency yet — confirmed via package.json)
```

Same structure for FE II's `how-to-pass-this-track/`, and for the per-unit session decks referenced in §8.2. This is not a new pattern invented for this renewal — it is Rubén's own established practice for separating data from code from design tokens, copied faithfully rather than reinvented. Pitch's `index.html` already shows the integration trick worth reusing verbatim: load `/assets/css/site.css` (site tokens) *and* `vendor/reveal.css`, but explicitly skip the Tailwind bundle on this route (documented inline in that file as "conflicts with Reveal layout") — same constraint will apply here.

Both the markdown source (`how-to-pass-this-track.md`, institutional record, submittable as-is to UDIT) and the reveal.js-rendered page stay in sync: the markdown is authored first (content decisions), then transcribed into `data/content.json` — not duplicated by hand twice, but not auto-generated from one into the other either, since the institutional markdown has to match UDIT's exact template wording and the slide deck has to match spoken/presented pacing, which are different editorial jobs done from the same source facts.

---

## 5. AI-assisted coding — giving it "enough presence"

You flagged, correctly, that neither you nor your students code line-by-line by hand anymore, and that the syllabus needs to reflect that honestly rather than pretend otherwise or leave it as an afterthought. This repo already has the seed of the right answer — it should not be invented fresh:

- `docs/templates/AI_POLICY.md` already carries a standing AI-disclosure statement for the whole methodology.
- `docs/tracks/es/ilustracion-webapp/index.md` already demonstrates the target pattern in production: **docs-first** development — plan → prompt → implementation report, documented throughout, explicitly framed ("La IA no es el destino. La IA es la brújula...") rather than hidden or merely tolerated.
- `docs/evaluation/en/index.md` already grades on **process evidence** (commits, AI-usage disclosures, oral defence) over rote recall, and already lists "AI workflow reports" as a first-class evidence type.
- FE I's react track already has two dedicated lessons — `ai-assisted-development-foundations`, `ai-assisted-routing` — proving the pattern scales into a 2nd-year technical course, not just a 4-session illustration track.

What Phase 2/3 needs to add, grounded in profield §4/§12.7's `verify`/`narrate`/`defer`/`critique` axes and the five newly-verified 2026 sources:

1. **`verify`** — every FE II deliverable includes a short oral or written "explain and modify this on the spot" component (profield §4's "corrective competence" framing — Sankaranarayanan 2026), so AI-assisted output is never submitted without demonstrated understanding.
2. **`narrate`** — commit narrative and an AI-use declaration are graded artifacts, not honor-system footnotes (already partially true per `evaluation/en/index.md`; Phase 3 makes it explicit per-Entrega).
3. **`defer`/`critique`** — FE II's testing module explicitly teaches **AI-assisted code review as a technique** (Oliveira et al. 2026: in-workflow, GitHub-PR-integrated review scaffolding code quality and self-regulated learning) — students practice using AI as a reviewer of their own and peers' PRs, with the human-in-the-loop step graded.
4. Where relevant, an **access-timing framing for exam conditions** (Rotter et al. 2026) — e.g., independent-first, AI-assisted-revision-second structuring for at least one assessment, rather than a blanket allow/ban.

None of this is a new bureaucratic layer bolted onto the course — it is the existing Web Atelier evaluation rationale, made AI-explicit at the point where profield's research says the risk (and the opportunity) actually concentrates.

---

## 6. "Pedagogy in the CV?" — recommendation

Currently, neither `udit-ruvebal-frontend-i-cv.md` nor `udit-ruvebal-frontend-ii-cv.md` contains a pedagogy/philosophy statement — both are pure content outlines (modules, activities, integrator project). Recommendation: **yes, add one**, short (3–5 sentences), to both, doing double duty as (a) a teaching-statement artifact for your own record and (b) framing for students on day one. It should state, in plain language:

- Front-end as interface layer, not website production (the profield reframe)
- The durable-core / volatile-layer split, so students know why fundamentals precede frameworks and why frameworks are taught as replaceable
- The AI-assisted-development stance (docs-first, disclosed, verified) — matching `AI_POLICY.md`
- The assessment philosophy (process evidence over final-product polish) — matching `evaluation/en/index.md`

**FE I CV also needs a structural fix, separate from the pedagogy addition**: it currently documents semester 1 (vanilla) only. Semester 2 (React) is fully built as lessons but has no narrative CV section at all. Phase 4 should add a Módulo 4–7-style section to the FE I CV summarizing what's already taught in the react lesson folder — both so the CV is a complete annual record, and so FE II's CV (once rewritten per finding 4) has a clean, non-duplicated starting line to extend from.

---

## 7. The `interface` axis as the throughline

Keeping `profield_axes.interface` as the organizing rationale (not just one bullet among many) gives FE I and FE II a clean division of labor instead of "FE I = basics, FE II = more":

- **FE I** teaches the **interface fundamentals**: the DOM as an interface, a hand-built vanilla SPA as an interface, a React component tree as an interface. Durable core (§1 of profield) — semantic structure, state, forms, accessibility, API interaction — taught through the web substrate, twice (once framework-free, once with React), so students see the same interface-layer concepts survive a framework change.
- **FE II** teaches **interface-layer transferability**: the same concepts (state, component composition, feedback, accessibility) carried into contexts where "front-end = website" stops being true — a 3D/WebGL scene, an IoT control panel, a Python-backed data interface. This is where the profield §9 GAP claims become the actual differentiator from FE I, and where the "3D and cutting-edge aesthetics" / "robotics IoT and interface human paradigm" motivation you asked for lives structurally, not just decoratively — reinforced, not just motivated, by the confirmed Data-Science cross-listing (§3 item 5).

---

## 8. Master curriculum shape — canonical lessons, exams, deliverables

This section states the *shape* Phase 1/2 will fill in — not the lesson content itself, per your instruction not to execute yet. Reaffirming the repo's own rule (`docs/tracks/index.md`, already true, not a new decision): **a track sequences and links canonical lessons, it does not duplicate their content.** `/tracks/fei/` and `/tracks/feii/` (§4) are index-and-sequence pages over `docs/lessons/en|es/*` — FE II's new lessons still get authored under `docs/lessons/`, same as FE I's, with the track index linking to them in order, not inlining them.

**Two things found later (2026-08-08) and worth stating here rather than only in the cascade:** (1) `docs/lessons/en/react/index.md` already **is** a full 15-lesson taught sequence for FE I semester 2 — phases, durations, a dependency graph, an assessment-weight table — that §0/§8.1 below under-credited by only naming the individual lesson files. (2) `docs/_data/tracks.yml` is this repo's actual established schema for declaring a track's session list (`sessions_list` with title/slug/description/duration per session, plus objectives/deliverables/methodology/evaluation) — already used for two tracks (`ilustracion-webapp`, `geo-physical-aggregator`) but missing `fei`/`feii` entries entirely. Neither `react/index.md` nor `tracks.yml` currently separates **Prácticas de Laboratorio** hours from lecture — the official guide's 30h lab figure isn't allocated per session anywhere. Phase 1 and Phase 2 (`syllabus-renewal/phase-1-fe1-reframe.md`, `phase-2-fe2-build.md`) now both fix this: mirror `react/index.md` into `tracks.yml`'s `fei:` entry, build the still-missing semester-1 sequence, add a `feii:` entry, and allocate `labHours` per session summing to 30h for each course. Full detail lives in the cascade files, not restated here.

### 8.1 FE I — audit-and-reframe shape (not a rebuild)

FE I is **annual, 6 ECTS total**, already substantially built. The shape for Phase 1 is an audit table, not a new session plan:

| Existing lesson cluster | Official CONTENIDOS match | Phase 1 action |
|---|---|---|
| `html-css-basics`, `responsive`, `intrinsic-web-design`, `pseudo-elements-and-state-styling`, `typography-color`, `web-animations` | Hojas de estilo avanzadas, diseño responsivo, animación web | Relabel through durable-core lens (§1); no content gap |
| `js-intro`, `js-dom-manipulation`, `js-modules`, `linting-and-formatting` | JS avanzado, módulos, buenas prácticas | Confirm async/fetch/API-consumption coverage matches CV Módulo 2; no content gap expected |
| `3d`, `gsap`, `web-design-trends`, `modern-web-design-trends` | "Motores físicos para web… elementos multimedia y 3D… arte generativo" (explicitly in official CONTENIDOS) | Light touch — confirm this is the seed FE II's 3D module builds on, not a duplicate |
| *(no dedicated lesson found yet)* | Módulo 3 UX/UI + accessibility, per CV | Verify against sibling UX/UI course scope (§3 item 1) before writing/confirming as FE I-owned |
| `react/*` (15 lessons) | Framework comparativa, React, testing, deployment (matches FE II CV Módulo 4–7 almost exactly) | **Keep as FE I-owned territory** — this is the anchor that defines what FE II must NOT repeat (finding 4) |
| `portfolio-template-brief`, `geophysical-aggregator-project` | Proyecto integrador de Frontend I | Confirm still matches "SPA sencilla sin frameworks + backend coordination" brief from CV |

Deliverable/exam shape for FE I: unchanged in spirit from the current CV (vanilla SPA integrator project, evaluated on code quality + interface quality + backend integration), repackaged into the how-to-pass-this-track slots per §4, with AI-use declaration and process evidence added per §5.

### 8.2 FE II — ground-up shape (single semester, 6 ECTS, 150h: 10 magistral / 30 lab / 14 problem-solving / 94 autonomous / 2 eval)

You asked about "12" units — official ECTS is 6, not 12 (still an open item, §11). Read as **~12 teaching sessions across one semester**, mapped to the five official `CONTENIDOS` blocks plus the profield-motivated frontier layer, this is the pilot shape (not final content):

| # | Unit theme | Official CONTENIDOS anchor | profield-motivated addition | Deliverable type |
|---|---|---|---|---|
| 1 | Kickoff: from FE I React to production architecture | — | Interface axis reframe: "you already built interfaces; now you build systems of them" | none (orientation) |
| 2–3 | Arquitecturas de aplicaciones front-end | Arquitecturas | Meta-framework option (Next.js/Astro/SvelteKit) as a **second** paradigm — deepens framework literacy (profield §2) rather than repeating React basics | Entrega 1 seed |
| 4 | PWA / offline | Desarrollo de PWA, funcionalidades offline | — | — |
| 5–6 | Testing strategy & AI-assisted code review | Testeo (herramientas, diseño de pruebas, automatización) | Oliveira et al. 2026 in-workflow AI review as taught technique (§5 above) | Entrega 1 due |
| 7 | Performance engineering | Optimización de rendimiento | — | — |
| 8–9 | 3D / cutting-edge interface aesthetics | *(boundary case, profield §9 GAP)* | React Three Fiber / shader-literacy module, explicitly framed as an interface-layer transfer exercise, not a graphics course | Entrega 2 seed |
| 10 | IoT/robotics control-panel & Python-backed interface | *(boundary case, profield §9 GAP)* | Same component/state model consuming device or Python-service state instead of a REST/GraphQL API — **no longer just a hook: this unit is the direct payoff of the confirmed Full-Stack + Data-Science cross-listing (§3 item 5)**, and should be built in coordination with the Back-End II synergy sheet (§3 item 2, §9) if a real Python service is available to consume | Entrega 2 due |
| 11–12 | Capstone integration + oral defence | Proyecto integrador (per CV framing) | `verify`/`narrate` axes: process evidence, AI-use declaration, oral defence of the diff | Entrega 3 / Examen Final |

This shape deliberately does **not** re-teach React fundamentals, hooks, routing, or basic Jest/RTL — those stay owned by FE I. FE II opens where FE I closes: architecture, testing maturity, performance, PWA, and the interface-layer frontier.

**Session-level presentation format:** each unit's `Lección Magistral` component should ship as a proper slide deck, not a wall of prose — same reveal.js treatment as §4's how-to-pass-this-track page, so students get one consistent web-native presentation format across the course rather than markdown for some things and PDF/Keynote for others. When Phase 2 actually builds these, use the `dataviz` skill for any metrics/comparison slides (e.g. React vs. the chosen meta-framework, bundle-size/performance comparisons) and `artifact-design`/`artifact-diagramming` for any architecture or data-flow diagrams — both are already available in this environment and match "current stack" better than a generic slide tool would for a front-end engineering course.

---

## 9. Phased execution plan (not started)

**Cross-cutting rule for every phase below (2026-08-08): the definition of "done" is a published web endpoint, not a file sitting in the repo.** You noted your students respond to the web-published lessons and guides — the whole point of this renewal is lost if Phase 1/2 output stays as unpublished markdown. Concretely, when Phase 1/2 execution actually writes prompts to generate lesson/session content, those prompts must end in something with a live URL under the existing Jekyll pipeline (`_config.yml`, `_site/`) — a rendered lesson page, a track index, or (per §4/§8.2) a reveal.js slide deck — not just a committed `.md` file waiting for a future publish step. Treat "file written" and "session done" as two different checkboxes; only the second counts.

- **Phase 0 — done in this pass:** GAP/NOISE triage of `profield-frontend-pedagogy.md` + sibling `.yaml`; full context inventory; clerical-error flag; `cheetsheet.md` renamed to `how-to-pass-this-track.md`; this plan document, twice-updated with your 2026-08-08 decisions; subdivided into an executable cascade at `syllabus-renewal/` (`IGNITOR.mdc` + one prompt-engineered `.md` per phase).
- **Phase 1 — FE I reframe:** run the audit table in §8.1 against the real lesson files (open each, don't assume from folder names); resolve the UX/UI sibling-overlap question using your direct knowledge of that course (§3 item 1); relabel through the durable-core/interface-axis lens; no wholesale rewrite. Each relabeled/confirmed lesson stays published where it already lives — no new endpoints needed here, this phase is an audit.
- **Phase 2 — FE II ground-up build:** turn §8.2's shape into real session files under `docs/tracks/en/udit/2627-feii/`, following the `ilustracion-webapp` track's frontmatter/structure precedent; resolve the meta-framework-choice first; build unit 10 (IoT/robotics/Python-backed interface) in coordination with the Back-End II synergy sheet (below) so it consumes something real, not a mock. **Every unit ships as a published lesson page plus a reveal.js session deck** (§8.2), not markdown alone.
- **Phase 3 — Assessment reconciliation:** implement the nesting in §4 concretely for both courses — nail down exact FE II weight percentages within the official ranges, write the AI-use-declaration and oral-defence rubric once, reuse for both courses. Ship `how-to-pass-this-track` as both the institutional markdown record and its reveal.js-rendered, published counterpart (§4).
- **Phase 4 — CV reframe:** add the pedagogy section to both CVs (§6); add the missing semester-2 section to the FE I CV; rewrite the FE II CV to reflect §8.2's shape instead of duplicating FE I.
- **Phase 5 — Institutional cleanup, now with real deliverables (updated 2026-08-08):**
  - **Author the `TEMARIO` (and, where needed, bibliography) for the FE I and FE II 2026/2027 Guías Docentes ourselves**, for submission to the department — this replaces "flag the clerical error and wait" (finding 1). FE II's numbered-topics content should follow directly from §8.2's unit list once it's final; FE I's guide should be checked for the same `TEMARIO`-vs-`CONTENIDOS` gap before assuming it's clean.
  - **Back-End II synergy workflow sheet** (§3 item 2): since you're already in direct contact with the Back-End II professor, produce a short needs-and-offers sheet — what FE II needs (endpoint shapes, auth contract, REST-vs-GraphQL commitment, seed-data conventions) and what FE II offers in return (a consuming front-end for their APIs, shared testing/CI conventions, a joint capstone). This directly de-risks §8.2 unit 10.
  - **UX/UI sibling course boundary** (§3 item 1): transcribe what you already know of its real content into a short scope note, so FE I Módulo 3 can be bounded with confidence rather than left as a research blank.
  - ~~Resolve the Data-Science cross-listing question~~ — **done** (§3 item 5): confirmed, already propagated into §8.2 unit 10 and §7.
- **Phase 6 — Repo structure: decided (2026-08-08), no longer a checkpoint.** Staying in `web-atelier-udit` / the current Web Atelier stack. Everything this renewal depends on — the ATELIER methodology, the evaluation rationale, `AI_POLICY.md`, the `2627-fei`/`2627-feii` scaffolds, and the entire built React track — already lives here.

---

## 10. Outputs per track (once phases run)

| Output | FE I | FE II |
|---|---|---|
| Lesson files + published pages | `docs/lessons/en\|es/*` (audit + relabel existing; already published) | New files under `docs/tracks/en/udit/2627-feii/`, each published, not left as unbuilt markdown (§9 cross-cutting rule) |
| Session presentation decks | Optional — most sessions already live as lesson pages | reveal.js deck per unit in §8.2, Markdown-authored, static-deployed alongside the lesson page |
| Track index | New `docs/tracks/en/udit/2627-fei/index.md` summarizing the annual arc (currently doesn't exist as a track index — only loose lessons + a CV doc) | New `docs/tracks/en/udit/2627-feii/index.md`, `ilustracion-webapp`-style frontmatter |
| CV / guía curricular | `udit-ruvebal-frontend-i-cv.md` — add pedagogy section + missing semester-2 section | `udit-ruvebal-frontend-ii-cv.md` — rewrite per §8.2, remove FE I-duplicating content |
| Exam bank | Via `.cursor/skills/exam-forge/` (per `CLAUDE.md`) once module content is final | Same tooling, once §8.2 units are final |
| How to pass this track | `/tracks/fei/how-to-pass-this-track/` — reveal.js, own `data/content.json` (§4) | `/tracks/feii/how-to-pass-this-track/` — same structure, own content |
| Grading rubric | `how-to-pass-this-track`-compliant version of existing FE I official weights (30/60/10, fixed) | Same template, weight chosen within official ranges (§4) |
| TEMARIO for department submission | Authored this pass, checked against current guide for the same TEMARIO/CONTENIDOS gap (§9 Phase 5) | Authored this pass from §8.2's final unit list (§9 Phase 5) |
| Back-End II synergy sheet | — | Needs-and-offers sheet, co-produced with the Back-End II professor (§3 item 2, §9 Phase 5) |
| UX/UI boundary note | Short scope note bounding Módulo 3 against the sibling UX/UI course (§3 item 1, §9 Phase 5) | — |

---

## 11. Open questions to confirm before Phase 1 starts

**Resolved 2026-08-08** (kept here for the record, not because they're still open):

- ~~Is FE II cross-listed with Data Science & AI?~~ Confirmed yes — FE is taught in both Full-Stack and Data-Science degrees (§3 item 5).
- ~~Who to flag the FE II PDF clerical error to?~~ Superseded — we author the correct `TEMARIO`/bibliography ourselves for department submission, rather than flag-and-wait (finding 1, §9 Phase 5).
- ~~Confirm Back-End II's scope before finalizing integration units?~~ Superseded — direct contact already exists; producing a synergy sheet instead of a one-way scope check (§3 item 2).
- ~~Repo decision~~ — decided: staying in `web-atelier-udit` (§9 Phase 6).

~~Where should the reveal.js presentation build live?~~ **Resolved (2026-08-08):** co-located per page under each track's own folder (`.../how-to-pass-this-track/index.html` + `data/` + `design/` + `vendor/`, §4), served through the existing Jekyll pipeline via `permalink:` frontmatter — no separate build step, matching the `/Users/ruvebal/src/MSCA/SVCM/web/pitch/` precedent exactly.

**Resolved 2026-08-08 (cascade audit pass, before Phase 1 execution):**

- ~~Was "12 ETC each" meant as ~12 teaching sessions?~~ Confirmed by Rubén: yes, 12 teaching sessions. `phase-2-fe2-build.md`'s unit table proceeds as-is.
- **Pedagogy throughline.** Rubén's framing — "critical coding for a better living for all humans and machines" — is not literalized as a tagline anywhere; it's the *spirit* both track index pages (`/tracks/fei/`, `/tracks/feii/`) are written in, using original wording grounded in this document's own interface/durable-core/AI-stance/accessibility material (`syllabus-renewal/IGNITOR.mdc` rule 8). This moves pedagogy visibility beyond §6's CV-only blurb — both track pages now carry it too, not just the instructor CVs.
- **Phase 2 execution depth for this pass.** Scaffold-first: all 12 FE II units ship as real, committed lesson pages this pass (Tier A); reveal.js session decks are explicit follow-up (Tier B), not a blocker for calling Phase 2's core Gate passed. See `syllabus-renewal/phase-2-fe2-build.md`.
- **Push/publish cadence.** The agent commits locally per phase but does not run `git push` — Rubén reviews and pushes on his own schedule (`syllabus-renewal/IGNITOR.mdc` rules 1, 9). Every phase's "done" checkbox for this session is therefore "committed + locally build-verified," not "live," until he pushes.
- **Internal links.** All new content uses the existing `{{ '/path/' | relative_url }}` / relative-sibling-link convention already used throughout the repo — never a hardcoded `ruvebal.github.io` URL (`syllabus-renewal/IGNITOR.mdc` rule 10).

**Still open:**

1. Meta-framework choice for FE II unit 2–3 (§8.2) — Next.js, Astro, SvelteKit, or stay React-only but go deeper architecturally? This is a real design fork, not a detail — decide at the start of Phase 2, not deferred into it.
2. For the TEMARIO you're now authoring for department submission (§9 Phase 5) — do you want a first draft proposed in the next pass, or do you want to draft it yourself with this plan as reference?
