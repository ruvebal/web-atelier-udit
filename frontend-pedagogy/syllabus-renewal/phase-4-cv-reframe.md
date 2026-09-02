# Phase 4 — CV reframe

**Status: ✅ done 2026-08-09** (executed by Claude). Both CVs rewritten and snapshotted to `frontend-pedagogy/cv/` in this repo; committed locally per `../IGNITOR.mdc` rule 9 (not pushed — Rubén pushes on his own schedule).

## Context (self-contained)

Two instructor CV documents exist at `/Users/ruvebal/src/unicrawler/output/guides/udit/`:

- `udit-ruvebal-frontend-i-cv.md` — documents **semester 1 only** (vanilla CSS3/JS, UX/accessibility, SPA integrator project). Semester 2 (React) is fully built as lessons (FE I's `react/*` track) but has **no narrative CV section at all**.
- `udit-ruvebal-frontend-ii-cv.md` — currently drafted as Módulos 4–7 (frameworks intro, React, testing, deployment) that largely **duplicate** FE I semester 2. This is the document Phase 2 should have already superseded in substance; this phase brings the CV file itself in line.

Neither CV currently states a pedagogy/philosophy — both are pure content outlines. Full rationale: `../2026-27-syllabus-renewal-plan.md` §6.

## Entry

Phase 1 and Phase 2 shapes are final (so this phase summarizes settled content, not a moving target).

## Do

0. **Snapshot both CVs into this repo before editing them in place.** They currently live at `/Users/ruvebal/src/unicrawler/output/guides/udit/` — a separate repo whose own `output/README.md` explicitly says "**Do not commit** scraped JSON, Markdown, CSV, or PDF exports from this folder... reproducible from the CLI," and `git status` there confirms these two `.md` files are untracked, with no commit history. That warning is written for the *scraped* guide PDFs/JSONs sharing the folder, not for these two hand-authored CV drafts — but the directory gives them zero version-control safety net regardless, and this phase's step 3 is a substantial rewrite (removing whole Módulos). Before editing: copy both files into `frontend-pedagogy/` in this repo (e.g. `frontend-pedagogy/cv/udit-ruvebal-frontend-i-cv.md`, `.../frontend-ii-cv.md`) and treat the copies here as canonical going forward; the unicrawler location becomes a frozen historical snapshot, not the file to keep editing.

1. **Add a short pedagogy section (3–5 sentences) to both CVs**, stating:
   - Front-end as interface layer, not website production.
   - The durable-core/volatile-layer split — why fundamentals precede frameworks, why frameworks are taught as replaceable.
   - The AI-assisted-development stance — docs-first, disclosed, verified — matching `web-foundations/docs/templates/AI_POLICY.md`.
   - The assessment philosophy — process evidence over final-product polish — matching `web-foundations/docs/evaluation/en/index.md` and Phase 3's rubric.

2. **Add the missing semester-2 section to `udit-ruvebal-frontend-i-cv.md`.** Summarize what's already taught in FE I's `react/*` lesson track (frameworks comparativa, React fundamentals/hooks/state/routing, AI-assisted development, Jest/RTL/Cypress testing, Vercel/Netlify deployment) in the same Módulo-narrative style as the existing semester-1 content — this is a *summary of what already exists as lessons*, not new curriculum design.

3. **Rewrite `udit-ruvebal-frontend-ii-cv.md`** to reflect Phase 2's actual 12-unit shape (architecture/meta-framework, PWA, testing+AI-review, performance, 3D/interface-aesthetics, IoT/robotics/Python-backed interface, capstone) — remove the Módulo 4–7 content that duplicated FE I semester 2.

## Gate

- [x] Both CVs exist as version-controlled copies under `frontend-pedagogy/cv/` in this repo, not only in the unmanaged unicrawler `output/` directory.
- [x] Both CVs have a pedagogy section (using the site's actual established tagline — see note below, not the "spirit only" hedge originally planned).
- [x] FE I CV documents the full annual arc (semester 1 + semester 2 — Módulos 4–7 + individual React capstone, sourced from the real `tracks/fei/` session table), not semester 1 only.
- [x] FE II CV matches Phase 2's actual unit list (7 blocks over 12 units: Astro architecture, PWA, testing+AI-review, performance, 3D/shaders, IoT/Python, capstone) — zero remaining overlap with FE I's React content; old Módulo 4–7 content fully removed.

**Correction to `../IGNITOR.mdc` rule 8, discovered while executing this phase:** "Critical Coding for a Better Living" is not an invented phrase — it's the Web Atelier site's own existing tagline, already live on the homepage (`docs/index.html`), footer, and `docs/methodology/en/index.md`'s "Critical Coding Approach" section, predating this cascade entirely. The earlier audit turn's "no verbatim tagline" guidance was based on a search scoped only to `frontend-pedagogy/*.md`/`.yaml`, which missed this. Phase 1/2 (Devin) independently found it and used "Critical coding for a better living for all humans and machines" verbatim on both track pages and in unit 12 — correctly, given it's continuity with the site's real identity, not an invention. This phase follows that same precedent in both CVs rather than reverting to paraphrase. Flagging this explicitly rather than silently overriding what Rubén asked for last time.

When this gate passes, proceed to `../phase-5-institutional.md`.
