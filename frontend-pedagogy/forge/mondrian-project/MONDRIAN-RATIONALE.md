<!--
Mondrian Project — product / why face of the cascade pack.
Author: Rubén Vega Balbás, PhD · 25 October 2026
Reader: product owner, department, research group, the instructor six months from now.
Engineering decisions live in MONDRIAN-CASCADE.md; this file says why they are worth making.
-->

# The Mondrian Project — rationale

**Status:** adopted 25 October 2026 as the Front-End I semester-1 integrator for 2026–27, superseding the portfolio template. Decision record: [`PITCH.md`](PITCH.md) (22 Oct) → this pack. The exact application is defined in [`MVP-PRODUCT-SPEC.md`](MVP-PRODUCT-SPEC.md), which wins over earlier descriptions of the game. The student-facing brief is a **separate, later** document (EN + ES); nothing here is written for students.

---

## 1. The why, in one paragraph

A neoplastic composition is a set of ratios: column widths, row heights, the areas each colour occupies, the relative weights of its black bands, and the angular distances between its hues. Those ratios can travel from canvas to data, from data to CSS Grid, and from a responsive screen back to paper. The Mondrian Project makes that round trip visible. Students measure a painting into a matrix; a visitor chooses a physical or digital surface, begins from the original aspect ratio, reshapes an inner frame, transforms grid and colour, then saves and prints a new study. The data-science students own the measurement pipeline; the front-end students own the touch editor, composition system, export and exhibition; one schema joins them. Every visible relation comes from a number someone measured or from a visitor transformation the URL can reproduce.

---

## 2. Three claims the product must make good on

| Claim | What makes it true | What makes it false |
| --- | --- | --- |
| **Ratio claim.** The original state holds the painting's proportions; subsequent states expose exactly how the visitor departs from them. | Normalized boundary vectors become CSS `fr` tracks; the frame begins at the original aspect ratio; `CompositionState` is separate from immutable `work.yml`; compare/reset returns exactly to source. | Mutating source data; CSS borders standing in for measured bands; a state that cannot be reopened from its URL. |
| **Hue claim.** Rotating θ changes every chromatic cell's hue by θ and leaves the angular distance between any two swatches unchanged; non-colours do not rotate. | `hsl(from var(--swatch) calc(h + var(--theta)) s l)` on chromatic roles only; Δ computed and shown; a wrap-around case in the defence. | `hsl(θ 100% 50%)`; rotating black; claiming the picture "looks the same" (HSL lightness is not perceived lightness). |
| **Authorship claim.** Every number on the public site has a named source, and the student who shipped it can point at it. | `work.yml` carries `source`, `measured_by`, `method`; analyzer output carries its version and the reproduction's pixel size; defence asks for one bound. | A matrix that "looks Mondrian"; a JPEG from search with no recorded crop; an AI-drawn grid. |
| **Print claim.** A screen composition can return to paper at a declared size. | Surface, printable area and frame are distinct; SVG is the canonical export; print uses physical units, `@page`, 100% scaling guidance and a 100 mm calibration sheet. | Calling an uncalibrated browser/printer path millimetre-accurate; exporting a screenshot as the master. |

---

## 3. What the project is worth, to whom

| Audience | Value | Evidence this cascade produces |
| --- | --- | --- |
| **Front-End I students** | A semester integrator where HTML/CSS/vanilla JS are *necessary* rather than assigned; container queries, grid, relative colour, PWA, touch — on a real artefact with a public URL. | Live site, measured work per student, plans, declaration, defence. |
| **AI & Data Science students (2)** | A measurement pipeline (image → matrix) with an evaluation against hand-measured ground truth, a REST API that renders a front-end artefact, and an ML component judged against a classical baseline. | `packages/analyzer`, `services/api`, evaluation report. |
| **Pedagogic research (Strand B, FE I form)** | The second cohort for the "learning by doing in an agentic-assisted product" line — a different course, artefact and level, same process-trace instruments. | Pseudonymised traces; congress-first write-up. |
| **Art education** | Analysis by reconstruction: the "study after" tradition made measurable; an Albers-style colour-relationship exercise as an instrument (hue rotation as a way to *see* intervals). | The editor, gallery studies and captions. |
| **Digital humanities** | A small, provenance-rich, reproducible dataset of formal representations with the measuring method recorded per work — the same shape as Andrzejewski, Stork, Zhu & Spronk's 2010 representations, but open, with rights and sources attached. | `packages/works` under CC BY-NC-SA 4.0. |
| **Practice-based research** | The artefact *is* the argument: a kiosk that lets a visitor move from original ratio to transformed print is a thesis about proportion, reproduction and authorship tested with a finger. | Kiosk deployment, exported transformation recipes, visitor session counts only. |
| **The department** | Innovación docente with a public product, a dataset, and a research notice — same package as TTOD, no new approvals beyond communication. | Institutional letter (adapted from TTOD's), README credits. |

Andrzejewski et al. (2010) is now Ahmes-resolved through DOI
[`10.1117/12.840558`](https://doi.org/10.1117/12.840558); full node/page and
APA receipts live in `grounding/ANDRZEJEWSKI-2010.md`. Albers and all other
claims still pass `frontend-pedagogy/AI-EVIDENCE-HARNESS.md` or remain
`[BIBLIO-GAP]`. The 2010 paper is a prior-art check for the analyzer: reproduce
its representation shape or explain the difference.

---

## 4. The pedagogical core: CSS as the engine, JavaScript as the hands

The portfolio template taught frameworks. This project teaches the platform the frameworks sit on, at the moment the platform has become capable enough to do the work alone. The rule for the cohort: **if CSS can do it, CSS does it; JavaScript builds DOM from data, writes one custom property, and reads the URL.**

### 4.1 Capability table (checked 25 Oct 2026 against web.dev/baseline/2026 and MDN; re-verify in M0)

| Feature | Baseline status | Used for | Fallback |
| --- | --- | --- | --- |
| Container **size** queries, `cqi`/`cqb` units | Widely available (2023) | The frame reacts to *its own* size, not the viewport; the editor's inner frame is a container | None needed |
| Container **style** queries `@container style(--mode: liquid)` | Newly available 2026 | Switch faithful/liquid/line-weight modes on one custom property, no class juggling | Class toggles |
| `@scope` | Newly available 2026 | Scope the study's styles so chrome and composition never leak into each other | BEM-ish prefixes |
| Relative colour syntax `hsl(from … calc(h + var(--theta)) s l)` | Widely available (2024) | Hue rotation entirely in CSS, θ as one `--theta` | JS computes fills |
| `@property --theta { syntax: '<angle>' }` | Widely available (2024) | Typed, animatable θ; `transition` on hue for the attract loop | Untyped property, no interpolation |
| `aspect-ratio`, `dvh`, `minmax()`, `fr` | Widely available | The faithful frame; the liquid grid with constant-weight lines `minmax(var(--line), <n>fr)` | — |
| `resize: both` | Widely available (old) | A mouse-only CSS teaching probe for resizable containers | Pointer Events handles in the product (required for touch) |
| Media features `pointer`, `hover`, `display-mode` | Widely available | Kiosk/touch profile: `(pointer: coarse) and (hover: none)`, `(display-mode: fullscreen)` | — |
| `contrast-color()` | Newly available 2026 | Legible control labels over chromatic previews | Fixed label background |
| Anchor positioning | Newly available 2026 | Drag handles and the Δ readout anchored to frame edges | Absolute positioning |
| `shape()`, `corner-shape` | Newly / limited | Not used — the grid is orthogonal by doctrine | — |
| View transitions (cross-document) | Check in M0 (Firefox) | Study → study, as enhancement only | Hard navigation |
| Scroll-driven animations | Check in M0 (Firefox) | Attract loop in kiosk | `@keyframes` on `--theta` |
| `if()`, `@function` | Limited support | **Not used.** Named so students know they exist and why they are out | — |
| `field-sizing` | Newly available 2026 | Not needed (no text entry on the kiosk) | — |

### 4.2 The three renderers of one matrix

| Renderer | Where | Rule | Teaches |
| --- | --- | --- | --- |
| **SVG, faithful** | Study pages | `viewBox` = canvas; uniform scale; letterbox | Aspect ratio, `meet`, the invariance of proportion |
| **CSS Grid, liquid** | Gallery and editor | `grid-template-columns: <deltas>fr`; measured line tracks multiplied by `--line-weight-scale` | `fr` arithmetic, `minmax`, container queries, what breaks when a frame changes shape |
| **HTML/CSS preview, server-rendered** | FastAPI development service | A complete accessible figure with the same cells, roles, tracks and custom properties as Astro; semantically compared in tests | Server-side rendering is front-end work; one contract, two producers |

The visible editor is CSS Grid, not canvas. JavaScript validates data, creates
cells, owns pointer/state/undo/export, and writes custom properties. SVG remains
the canonical vector export and the faithful reference view. Canvas is transient
and used only to rasterize the generated SVG for PNG download.

---

## 5. Sitemap from the visitor's side

Written with *El Tao del Diseño Centrado en las Personas* in hand (`~/src/ttod/sources/tao-of-human-centered-design/es.md`, chapters I personas, IV accesibilidad, V prototipo, X exhibición): *"No diseñes para la persona que imaginas. Diseña para la persona que existe."*

### 5.1 The people who exist

| Person | Situation | Has | Wants | Must never be asked to |
| --- | --- | --- | --- | --- |
| **Passer-by at the kiosk** | Corridor, open day, 30 seconds, maybe a child, maybe two people at once | One finger, no instructions | Something to happen when touched; to understand without reading | Type, scroll to find things, use a back button, read a paragraph first |
| **Visitor on a phone** | Followed a QR or a link; on the move | Thumb, small screen, possibly reduced motion, possibly a screen reader | See the study, move θ, take the state home | Pinch-zoom to hit a control; lose state on reload |
| **Student-author** | Building, measuring, defending | Repo access, the brief, the rubric | Know what to do next, where to put a number, how it is graded | Guess where plans go; find out after the fact that something is public |
| **Teacher-researcher** | Grading, then (after grades) analysing | The rubric, the custody file | Trace a number to its source; trace a commit to a plan | Re-identify a pseudonym; use research data for grading |
| **Data-science student** | Owning the pipeline | Python, images, the schema | A clear contract and a ground truth to be measured against | Style buttons; guess what the front end needs |
| **External scholar** | Reads the dataset | A browser, maybe a notebook | Provenance, licence, method, how to cite | Trust a number without a source |

### 5.2 The tree

```text
/                          Start. Choose surface + composition; create.
/create/<slug>/            Editor. Physical/digital surface → bounded inner frame → hue, palette,
                           reflection, position and line weight → compare/reset → save/print.
/gallery/                  Measured source compositions; live CSS mini-renders; open in editor.
/kiosk/                    Kiosk entry. Attract loop → one touch → editor profile → idle reset.
                           Not linked from the public nav; reached by the device's start URL.
/about/                    Seven-scene scroll: painting → measurement → ratios → CSS Grid →
                           hue wheel → visitor transformation → print.
/about-us/                 Professor's proposition, cohort roles/credits, research framing and AI use.
/method/                   How the numbers were measured: hand method, analyzer, schema, error bars,
                           how to cite the dataset.
/contribute/               How to contribute. Indexed in the main nav and in README. Roles, lanes,
                           branch rules, PR template, measurement checklist, review culture.
/declaration/              AI-assisted authorship · research notice (four conditions) · what is public
                           in the repository · contact.
/calibrate-print/          100 mm rule + printable-margin test; hidden from normal navigation.
/es/…                      Mirror, when the brief exists in Spanish (deliverable of M9, not before).
/api/…                     Not on the public site. The LAN service (§7) has its own OpenAPI page.
```

Journey the sitemap is built around: **choose → transform → compare → save → print**.
Every page has one job on its first screen. `/kiosk/` and `/create/` share code;
`/kiosk/` changes only the interaction profile (§6). The complete state is in the
URL, so the kiosk's QR opens the same composition on the visitor's own device.

### 5.3 Accessibility is a design input, not a check

*"Accesibilidad añadida después del diseño no es accesibilidad — es compensación."*
Concretely: native ranges; a computed text alternative; WCAG 2.2 target size
24 px minimum and **44 px on the kiosk**; reduced motion; dark chrome that never
changes the composition; large surface/frame presets as the non-drag alternative;
undo and reset always visible; no transformation available only by gesture.

### 5.4 Motion for the story

No Framer Motion. It is a React library, while this is a vanilla-JS course. The
framework-independent `motion` package would still be an unneeded dependency.
The About story uses CSS scroll-driven animation as progressive enhancement and
a small `IntersectionObserver` fallback that changes `data-visible`. Without
JavaScript—or with reduced motion—all seven scenes are complete, visible and static.

---

## 6. Kiosk mode: what it is, and what it is not

**It is not fullscreen.** Fullscreen is one of three layers, and the least important.

| Layer | What it means | How |
| --- | --- | --- |
| **1. Device lockdown** | The visitor cannot leave the app, open a URL bar, or close the window. | Operating-system kiosk: ChromeOS kiosk app, Chrome `--kiosk` on a locked desktop, iPad Guided Access, Android lock-task. *Not a web concern.* Documented as a deployment runbook. |
| **2. App display** | No browser UI; screen stays on; survives a reload offline. | PWA manifest `display: fullscreen` (+ `display_override`), Screen Wake Lock (re-request on `visibilitychange`), service worker caching the whole site. `navigator.keyboard.lock()` only works in JS-initiated fullscreen and Chrome keeps a 2-second Esc; do not rely on it. |
| **3. Interaction contract** | The UI is usable with one finger and no instructions, by someone who did not choose to be a user. | Touch-first targets (≥ 44 px), no hover-only affordances, no text entry, no scroll-as-navigation, no back button needed (every state has a visible exit), idle reset to attract loop (e.g. 60 s), a visible "start again", two-touch safety (a second finger does not break the drag), `touch-action: none` on the drag surface only. |

Layer 3 is where front-end learning happens and where the Tao's chapter X (*la exhibición*) applies: the exhibit must work when nobody is there to explain it.

**Kiosk and the visitor's own device are both needed.** They are two different relationships with the same site:

| | Kiosk | Handheld |
| --- | --- | --- |
| Ownership | Shared, public, stateless between visitors | Personal, persistent |
| Attention | 30 seconds, standing, maybe watched by others | Minutes, seated, private |
| Input | Coarse pointer, no hover, no keyboard | Coarse pointer, sometimes a keyboard, assistive tech |
| What it is good at | Attracting, demonstrating, the big frame gesture | Reading the caption, revisiting, sharing, screen readers |
| Bridge | Shows a QR encoding `/create/<slug>/?…` | Opens that complete state and continues |

So: **one codebase, one sitemap, two interaction profiles.** The profile is chosen by `@media (display-mode: fullscreen)`, `(pointer: coarse) and (hover: none)`, and the `/kiosk/` entry route; never by sniffing a user agent. "Mocked with a mouse" is fine for development; the acceptance test emulates touch pointers (Playwright `hasTouch`), and the device run happens once on real hardware in M7.

**The editor is the kiosk's justification, and the kiosk is the editor's
exhibition form.** A frame dragged with the whole hand on a large screen is the
gesture the project is about; the same state on a phone is its take-home form.

---

## 7. The "back of the front end": why the Python work is front-end development

The two data-science students build the **analysis backend for a front-end
product**, and the plan makes that contribution structural rather than rhetorical:

1. **The analyzer produces the front end's data.** Image → rectified canvas → line positions (projection profiles / Hough) → cell roles (colour clustering in Lab) → swatch HSL → a schema-valid `work.yml` with its own provenance (`method: analyzer`, version, reproduction pixel size, crop). The ground truth is the hand-measured works; the analyzer is evaluated against them, in canvas units, per boundary.
2. **The API returns a web artefact, not only numbers.** `GET /works/{id}` returns
   the validated matrix as JSON; `GET /works/{id}/preview` returns a self-contained
   HTML/CSS `<figure>` using the same data attributes and custom properties as the
   editor. This makes serialization, HTTP, content types and CSS contracts part of
   the data-science students' deliverable without pretending that button styling is
   backend work.
3. **One contract, two producers, one test.** A semantic snapshot test compares
   the Astro and FastAPI figures (cells, roles, tracks, custom properties—not byte
   order). When it passes, two teams have implemented one presentation contract.

**Where it runs.** The public site and kiosk are static/offline-capable and never
depend on the API. The API is a self-hosted development and analysis service.
Matrices accepted into the corpus are built into the site. This boundary keeps an
exhibition alive when the network disappears.

**Honesty about TensorFlow.** Line and rectangle extraction is a classical
computer-vision problem; OpenCV/NumPy/scikit-image is the MVP. TensorFlow is a
research extension only if a learned role classifier is evaluated against the
classical baseline on enough labelled cells. A neural “quality”, authenticity or
likeness score is explicitly not MVP. All inference stays local. Python remains
pinned to 3.12 until M0 verifies the actual TensorFlow wheel.

---

## 8. Cohort and coordination

Seven students, two bachelors, one product, one semester.

| Lane | Who | Owns | Also does (everyone) |
| --- | --- | --- | --- |
| **Analyzer & API** | 2 × AI & Data Science | `packages/analyzer`, `services/api`, schema conformance (Python side), evaluation report | Measures one work by hand; writes plans; declares AI use; defends one bound |
| **Shell & Story** | 2–3 × Full-stack | Astro shell, gallery, About/About Us/method, scroll narrative, source captions, a11y | Same |
| **Editor, Print & Kiosk** | 2–3 × Full-stack | CSS Grid renderer, frame/state, transformations, export/print, Pointer Events, PWA, kiosk | Same |
| **Design lead(s)** | The visually mature students, cross-lane | Design tokens, typography, the chrome's visual system, visual QA on every PR, the credit/caption typography | Same |

Mechanics, all in `/contribute/` and `CONTRIBUTING.md` (indexed from README):
protected `main`; parseable `lane/<handle>-issue-<n>-<slug>` branches from
current main; student-owned conflicts; no renaming an open-PR branch;
same-branch amend + exact `Ready for re-review`; PR plan/declaration/source and
AI Review Log; one cross-lane human approval. Local Ollama may post
`MUST FIX|NIT` comments, never approve or merge. Individual authorship stays
legible through measured works, plans and commit/PR history.

---

## 9. Ethics and institution, in one place

Per the committee position reported 22 Oct 2026 (pitch §3), no new dictamen is
needed for this scope. The project is communicated in advance to the department
and ECSIT IP; teaching proceeds independently of research participation.

| Condition | Instrument | Phase |
| --- | --- | --- |
| Department accepts the activity as teaching | Private email adapted from TTOD's institutional letter; only status/date enter git | M0 |
| Research group (ECSIT, IP) informed — same innovación docente line as TTOD | Copy on the same private communication | M0 |
| Students accept research participation (this cohort, this course) | FE I information sheet + acceptance, adapted from `~/src/ttod/docs/research/ethics/PARTICIPANT-*` (EN/ES); refusal has no effect on grade | M0 draft; delivered before participation, outside the M1 repository build |
| Anonymisation | Pseudonyms `P01…Pn`; instruments limited to commits/PRs, declarations, structured defence notes, excerpts with dissemination consent | M9 |
| Co-authorship | Opt-in byline; never linked to a pseudonym | M9 |
| Analysis after grades close | Custody file; instructor is grader and researcher | M9 |

Visitor data on the kiosk: **counts only** (sessions started, rounds completed, median θ moved), no images, no identifiers, no storage of the handheld URL. Stated on `/declaration/`.

---

## 10. What this is not

- Not a portfolio. The student's voice lives in the measurement notes, the Δ sentence, the design system, and the defence.
- Not a Mondrian reproduction site. No photographs in the repository; every study carries the "geometric study after …" credit and the rotation disclaimer.
- Not a React project. React is semester 2. Astro is a build tool here and ships zero client framework code.
- Not a research project waiting for approval. It is a teaching activity with a research notice, on the four conditions.
- Not a Bootstrap/Tailwind/Vite ladder. Those are no longer evidenced by the semester-1 integrator; the cascade records that as a decision the department sees (D-06).
