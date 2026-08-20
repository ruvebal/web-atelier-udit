---
unit: fe-i-15-react-todo-deliverable
status: delivered
evidence_state: already taught — live assessment brief + companion exam, positive student reception (operator-reported)
live_url: https://online.udit.es/ultra/courses/_302_1/assessment/test/_12143_1
semester: 2
---

# React Todo Deliverable — Deployment & Visual Polish — delivered teaching pack

## What this is

**First React graded deliverable, not just a lesson.** "Tarea: Lista de
tareas en React — Despliegue y mejora visual," assigned via Blackboard
Ultra (`online.udit.es`). Already-delivered, not a forge target for new
content — this is the fullest-specified student-side web artifact in the
S2 track, worth preserving its real shape here rather than a bare link.

**Repo:** `https://github.com/ruvebal/react-template`

**Functionality already specified in the companion plan doc** (not
invented here): CRUD of tasks, priority levels with visual indicators,
`localStorage` persistence via a custom `useLocalStorage` hook, debounced
search (`useDebounce`), hide/show completed (`useToggle`), save
indicator + reset. All phases of the plan (`docs/plan-ejercicios-react.md`)
must be implemented and the deployment stable.

**Deployment requirement:** public Vercel URL, linked clearly in the
submission (e.g. repo README).

**Visual-improvement requirement (mandatory, not optional):** layout
(containers, spacing, hierarchy), color/typography consistency, optional
but recommended micro-interactions via Motion for React
(`AnimatePresence`, `whileHover`/`whileTap`), accessibility (contrast,
font size, click targets).

**Evaluation weighting (real, from the brief):**

| Criterion | Weight |
| --- | --- |
| Deployment on Vercel, link visible | High |
| Visual improvement (layout, consistency, optionally Motion) | High |
| Functional stability per the plan | Medium |
| A new detail demonstrating understood concepts | Medium |
| Clean code, clear component responsibilities | Medium |
| Comprehension test (in class) | Separate |

**Companion comprehension exam:** "JavaScript y React aplicados a la App
de tareas" — in-class test asking the student to explain, in their own
words, the JS/React concepts applied in their own repo. Draws directly on
the Fetch API unit (§`react-hooks#la-fetch-api-base-de-usefetch`).

## Grounding boundary

- Evidence state: **already taught**, real assessment brief above — its
  own delivery record is the authority; a literature citation is optional
  backfill, not a gate.
- This is a graded deliverable with a live public deployment component —
  no research-data collection or public student-work publication without
  the approved consent/DPO gates.

## Backfill opportunities (optional)

Deployment-as-assessment-criterion and "explain your own diff" oral/
written comprehension checks are both patterns FE II's Unit 11/12 already
partially grounds (Neumann eduScrum, González-Videgaray integrity framing)
— worth a STEP A cross-check if this unit is formally forged later. Not
required now.
