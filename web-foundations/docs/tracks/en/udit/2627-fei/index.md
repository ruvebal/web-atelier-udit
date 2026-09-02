---
layout: lesson
title: 'Desarrollo Web: Front-End I'
title_alt: 'Desarrollo Web: Front-End I'
slug: fei
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /tracks/en/fei/
description: 'Annual track for Full-Stack degree(UDIT). Semester 1: vanilla JS/CSS without frameworks. Semester 2: modern React with AI assistance. 6 ECTS, 150h total (30h lab).'
tags: [frontend, html, css, javascript, react, accessibility, responsive, animation, 3d, udit, annual]
status: complete
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Critical coding for a better living."_

> **AI Assistance Disclosure:** This track integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process. Pedagogy is grounded in classroom experience and critical reflection on AI's role in education.

---

{% include track-lang-switch.html track='fei' %}

## Pass This Track

**Start here for grading, deliverables, calendar checks, and resubmission rules:** [How to Pass Front-End I]({{ '/tracks/en/fei/how-to-pass-this-track/' | relative_url }}).

---

## 🎯 Pedagogical Vision

<figure class="track-curriculum-figure">
<img src="{{ '/assets/images/track-curriculum/fei-pedagogical-vision-93720dab0138.svg' | relative_url }}" alt="Abstract diagram of Front-End I pedagogical vision: four pillars orbiting a human-facing bridge between people and systems." width="1200" height="640" loading="lazy" aria-describedby="fei-pedagogical-vision-caption">
<figcaption id="fei-pedagogical-vision-caption">
<p>Four pillars — durable core, disclosed AI, accessibility as ethics, performance as respect — orbit the human-facing interaction layer.</p>
<p class="image-credit">Formula-led figure · Julia recurrence backdrop · @ruvebal · visual-forger 1.1.0</p>
</figcaption>
</figure>

Front-end development is **the human-facing interaction layer of the web** — not website production, but **the bridge between people and systems**. This track cultivates developers who think critically about their craft, understand the durable core beneath volatile frameworks, and build interfaces that respect both human users and the machines that render them.

Our pedagogy rests on four pillars:

- **Durable Core, Volatile Layer** — HTML semantics, CSS fundamentals, and JavaScript principles form the stable foundation; frameworks and tools are the transient surface we learn to navigate intelligently.
- **Docs-First, Disclosed, Verified AI** — AI assistants are used transparently: plans precede implementation, prompts are documented, and all code is verified against human judgment.
- **Accessibility as Ethics, Not Checklist** — WCAG compliance is embedded from the start, not bolted on as an afterthought. We design for screen readers, keyboard navigation, and neurodiverse users because inclusive design is ethical design.
- **Performance as Respect** — Fast-loading, responsive interfaces are not optimization targets but baseline expectations. We consider the devices and networks our users actually experience.

**Whose better living?** Not only the reader's. Code that does less work draws less power, and power spent becomes heat — in a phone, in a laptop, in a data centre. That cost does not stop at the device: it lands on a shared climate, and so on everything alive in it. We are technological beings, and the line between what lives and what is built was never clean; if you are alive, you are already inside this.

This is why performance and accessibility are taught here as **ethics rather than optimisation**. A lighter page and a page a screen reader can navigate are the same question asked twice: what does this cost the world it runs in, and who pays?

---

## 📖 Track Overview

**Front-End I** is UDIT's annual 6-ECTS course (150h total, 30h lab) for the Full-Stack and Data-Science & AI degrees. The track spans two semesters with a clear progression:

- **Semester 1** — Vanilla JavaScript and CSS without frameworks. Students build a portfolio template through three grade levels (vanilla, Bootstrap+GSAP, Tailwind+Vite).
- **Semester 2** — Modern React with AI-assisted development. Students complete 14 taught sessions from philosophy through deployment, then an individual React capstone project and final presentation.

### Annual Arc

<figure class="track-curriculum-figure">
<img src="{{ '/assets/images/track-curriculum/fei-annual-arc-c4108e9214d6.svg' | relative_url }}" alt="Annual arc diagram for Front-End I: Semester 1 vanilla progression into Semester 2 React capstone and final defence." width="1200" height="640" loading="lazy" aria-describedby="fei-annual-arc-caption">
<figcaption id="fei-annual-arc-caption">
<p>Annual arc — Semester 1 builds vanilla HTML, CSS, and JavaScript foundations; Semester 2 advances through React systems to capstone and final defence.</p>
<p class="image-credit">Formula-led figure · Julia recurrence backdrop · @ruvebal · visual-forger 1.1.0</p>
</figcaption>
</figure>

---

## 📚 Session Sequence

This track follows the canonical curriculum sequence: **29 published touchpoints** across both semesters, with explicit laboratory allocation summing to the official 30 h requirement.

{% if site.publication.publish_internal_metadata %}

<!-- curriculum-internal:
Sequence source: `web-foundations/docs/_data/tracks.yml`, key `fei`.
-->

{% endif %}

The official 150-hour workload is **10 h lección magistral + 30 h laboratory + 14 h individual exercises + 94 h autonomous study + 2 h assessment**. The `Duration` and `Lab Hours` columns are a sequence map, not two quantities to add: laboratory is one formally allocated mode inside the course workload.

### Semester 1 — Vanilla JS/CSS (13 sessions)

| #   | Session                                                                                              | Duration | Lab Hours | Description |
| --- | ---------------------------------------------------------------------------------------------------- | -------- | --------- | ----------- |
| S1  | [Development Environment Setup]({{ '/lessons/en/development-environment/'                            | relative_url }}) | 2h        | 1h          | VS Code, Git/GitHub, extensions, basic workflows                  |
| S2  | [First Steps: Git & GitHub Flow]({{ '/lessons/en/first-steps/'                                       | relative_url }}) | 2h        | 1h          | Commits, branches, pull requests, GitHub Pages                    |
| S3  | [HTML Semantic + CSS Fundamentals]({{ '/lessons/en/html-css-basics/'                                 | relative_url }}) | 3h        | 1.5h        | HTML5 semantics, CSS selectors, box model, typography             |
| S4  | [Typography & Color Systems]({{ '/lessons/en/typography-color/'                                      | relative_url }}) | 2h        | 1h          | Fluid typography with clamp(), accessible color palettes          |
| S5  | [Intrinsic Web Design: Container Queries]({{ '/lessons/en/intrinsic-web-design/'                     | relative_url }}) | 2h        | 1h          | Container queries, subgrid, context-based responsive design       |
| S6  | [Pseudo-Elements & State-Based Styling]({{ '/lessons/en/pseudo-elements-and-state-styling/'          | relative_url }}) | 2h        | 1h          | :hover, :focus-visible, ::before/::after, accessible interactions |
| S7  | [JavaScript Introduction]({{ '/lessons/en/js-intro/'                                                 | relative_url }}) | 3h        | 1.5h        | JS fundamentals, types, control flow, event model                 |
| S8  | [DOM Manipulation: Strings, APIs, Templates]({{ '/lessons/en/js-dom-manipulation/'                   | relative_url }}) | 3h        | 1h          | innerHTML vs native APIs, XSS security, update patterns           |
| S9  | [JavaScript Modules: ES6 Modularity]({{ '/lessons/en/js-modules/'                                    | relative_url }}) | 2h        | 1h          | Modularization history (IIFE → CommonJS → ES6), import/export     |
| S10 | [Linting & Formatting: Professional Standards]({{ '/lessons/en/linting-and-formatting/'              | relative_url }}) | 1.5h      | 0.5h        | Prettier, ESLint, Stylelint, HTMLHint configuration               |
| S11 | [GSAP: Typography & SVG Animation]({{ '/lessons/en/gsap/overview/'                                   | relative_url }}) | 3h        | 1.5h        | GSAP timelines, stagger, easing, ScrollTrigger                    |
| S12 | [Modern Web Design Trends]({{ '/lessons/en/modern-web-design-trends/'                                | relative_url }}) | 2h        | 1h          | Parallax, glassmorphism, neumorphism, dark mode demos             |
| S13 | [Portfolio Template Brief (Semester 1 Project)]({{ '/lessons/en/portfolio-template-brief/challenge/' | relative_url }}) | 4h        | 1.5h        | Semester integrator: portfolio template in three levels           |
{: .track-session-table}

### Semester 2 — React Modern (14 taught sessions + project + final)

| #   | Session                                                                                                        | Duration | Lab Hours | Description |
| --- | -------------------------------------------------------------------------------------------------------------- | -------- | --------- | ----------- |
| S14 | [Philosophy & Pedagogical Vision]({{ '/lessons/en/react/modern-fe-intro/'                                      | relative_url }}) | 3h                   | 1h          | Tao Developer mindset, Five Pillars, critical coding philosophy               |
| S15 | [Framework Fundamentals & Comparison]({{ '/lessons/en/react/frameworks-comparative/'                           | relative_url }}) | 4h                   | 1.5h        | React vs Vue vs Vanilla comparison, tech decision matrix, Vite setup          |
| S16 | [State & UI: Finite State Machines]({{ '/lessons/en/react/state-and-ui/'                                       | relative_url }}) | 3h                   | 1.5h        | State modeling as FSM, state taxonomy, antipatterns                           |
| S17 | [AI-Assisted Development Foundations]({{ '/lessons/en/react/ai-assisted-development-foundations/'              | relative_url }}) | 2h                   | 0.5h        | LLMs as probabilistic reasoning, architectural contracts, observability       |
| S18 | [React Fundamentals: Components & JSX]({{ '/lessons/en/react/react-fundamentals/'                              | relative_url }}) | 3h                   | 1.5h        | Functional components, JSX syntax, props, events, rendering                   |
| S19 | [Hooks Mastery: useState, useEffect, Custom Hooks]({{ '/lessons/en/react/react-hooks/'                         | relative_url }}) | 3h                   | 1.5h        | useState, useEffect, useRef, useMemo/useCallback, custom hooks                |
| S20 | [State Architecture: useReducer, Context, External Libraries]({{ '/lessons/en/react/react-state-architecture/' | relative_url }}) | 3h                   | 1.5h        | useReducer, Context API, Zustand/Redux Toolkit, decision tree                 |
| S21 | [Routing & Navigation: React Router v7]({{ '/lessons/en/react/react-routing/'                                  | relative_url }}) | 3h                   | 1.5h        | React Router v6/v7, dynamic routes, nested routes, protected routes           |
| S22 | [Backend Integration: Fetch, React Query, GraphQL]({{ '/lessons/en/react/react-backend-integration/'           | relative_url }}) | 3h                   | 1.5h        | Fetch API, async patterns, React Query caching/mutations, GraphQL             |
| S23 | [Authentication: JWT, Sessions, Security]({{ '/lessons/en/react/react-authentication/'                         | relative_url }}) | 3h                   | 1.5h        | Auth concepts (JWT, sessions, OAuth), secure implementation, XSS prevention   |
| S24 | [Framework Mode + SSR Auth + i18n (Advanced)]({{ '/lessons/en/react/react-framework-mode-auth-i18n/'           | relative_url }}) | 3h                   | 1h          | React Router v7 Framework Mode, SSR routes.js, server-side auth, :locale i18n |
| S25 | [Testing: Vitest, RTL, Cypress]({{ '/lessons/en/react/react-testing/'                                          | relative_url }}) | 2h                   | 1h          | Unit testing with Vitest, component testing with RTL, E2E with Cypress        |
| S26 | [Performance: Memoization, Code Splitting, Bundle Analysis]({{ '/lessons/en/react/react-performance/'          | relative_url }}) | 2h                   | 1h          | React DevTools Profiler, React.memo, lazy() + Suspense, bundle analysis       |
| S27 | [Deployment: Vercel, Netlify, CI/CD]({{ '/lessons/en/react/react-deployment/'                                  | relative_url }}) | 2h                   | 1h          | Vite production build, Vercel/Netlify deployment, env vars, GitHub Actions    |
| S28 | [Individual React Capstone Project]({{ '/lessons/en/react/geophysical-aggregator-project/'            | relative_url }}) | 3 weeks (individual) | 0h          | SSR app with React Query, two public APIs, i18n, auth, public deployment      |
| S29 | [Final Presentation & Monograph]({{ '/lessons/en/react/final-presentation/'                                    | relative_url }}) | 2h       | 0h        | Live demo, technical presentation, reflective monograph                       |
{: .track-session-table}

---

## 🎯 Learning Objectives

By completing this track, students will be able to:

- **Master front-end fundamentals** — HTML5 semantics, modern CSS, and JavaScript ES6+ as the durable core
- **Build interactive interfaces** — Without frameworks (semester 1) and with modern React (semester 2)
- **Apply scalable architecture patterns** — From local state management to Context/Redux and server-side rendering
- **Integrate real-world systems** — Public APIs, secure authentication, internationalization, and CI/CD deployment
- **Practice agentic, AI-assisted development** — Docs-first methodology with architectural contracts, MCP tool boundaries (e.g. Astro Docs MCP in FE II, shadcn MCP in React), agent rules/skills, and critical validation — not prompt magic
- **Ship professional applications** — From portfolio templates to data-driven dashboards with performance optimization

---

## 📦 Deliverables

### Semester 1 Deliverables

- **Portfolio Template Project** — Three-level progressive implementation:
  - Grade 1 (Vanilla): HTML, CSS, JS fundamentals via CDN
  - Grade 2 (Bootstrap+GSAP): Bootstrap 5 + GSAP animations via CDN, intermediate JS
  - Grade 3 (Tailwind+Vite): Node/Vite setup, Tailwind, SPA with vanilla JS routing
- **[Outstanding Websites Analysis (SOW)]({{ '/lessons/en/web-analysis/practice/' | relative_url }})** — Critical analysis of at least four award-winning sites (`/sow/` page, ATELIER methodology, ~10-minute pitch)
- **[404 Hackathon: "404s to Mars"]({{ '/lessons/en/404/hackathon/' | relative_url }})** — Team sprint: custom Mars-themed 404 page, deployed via GitHub Pages (2h in class + refinement window)
- **GitHub Repository** — Clean commit history, meaningful messages, README with live link
- **Evidence per Session** — Commits, ATELIER reflections, and concept demonstrations

### Semester 2 Deliverables

- **Individual React Capstone Project** — Individual integrator:
  - React Router v7 Framework Mode app deployed to public URL
  - At least two public APIs aligned with the current capstone brief
  - React Query for client-side data management with `staleTime` and SSR `initialData`
  - Bilingual UI (`/en/...`, `/es/...`) with server-resolved locale
  - httpOnly cookie authentication gating at least one route
  - GitHub repository with `docs/plans/`, `docs/reports/`, and README AI disclosure
- **Final Presentation** — Live demo (40%), technical presentation (15%), monograph (20%), reflection quality (10%)

---

## 📊 Evaluation

**Official FE I weights** (from `desarrollo-web-front-end-i-2025-2026.json`):

| Component                                    | %   | Description                                                           |
| -------------------------------------------- | --- | --------------------------------------------------------------------- |
| Pruebas (Tests)                              | 30% | Written examinations covering theory and practical skills             |
| Trabajos, entregables y proyectos (Projects) | 60% | Portfolio template (semester 1) + Individual React Capstone (semester 2) |
| Portafolio (Problem-solving portfolio)       | 10% | Resolution of problems, exercises, and reflections                    |
{: .track-evaluation-table}

**Track-level breakdown** (aligned with institutional weights and evaluation philosophy):

- **Technical Excellence (40%)** — Code quality, architecture, deployment, responsive design, animations, HTML semantics, accessibility (mapped from tests + projects technical)
- **Reflection & Documentation (35%)** — Process evidence, AI declaration, decision logs, iteration logs (mapped from portfolio + projects documentation)
- **Conceptual Understanding (25%)** — Understanding of patterns, trade-offs, and architecture rationale (mapped from tests + projects conceptual)

---

## 🛠️ Methodology

**ATELIER** (Exploración, Conceptualización, Producción, Exhibición, Reflexión) + **AI-Assisted Development with Critical Validation**

Each session follows the ATELIER cycle:

1. **Exploration** — Observe existing patterns, research best practices, experiment with tools
2. **Conceptualization** — Plan the approach, define success criteria, document architectural decisions
3. **Production** — Implement following the plan, use AI assistants transparently with docs-first methodology
4. **Exhibition** — Present work, demonstrate functionality, receive feedback
5. **Reflection** — Evaluate outcomes, document lessons learned, iterate based on critique

AI assistance is integrated following the **[AI Practical Guide]({{ '/methodology/en/ai-practical-guide/' | relative_url }})**:

- **Docs-First** — Plans precede implementation, prompts are documented
- **Two-Phase Approach** — Planning phase (no code) → Implementation phase (following the plan)
- **Context Files** — Use `project-brief.md` and similar as single sources of truth
- **Critical Validation** — All AI-generated code is reviewed against human judgment and accessibility standards

---

## 🔗 Related Resources

- **[AI Declaration & Oral Defence Rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})** — Shared rubric for AI use declarations and oral defences
- **[React Teaching Sequence]({{ '/lessons/en/react/' | relative_url }})** — Detailed semester 2 curriculum with dependency graph
- **[Astro Teaching Sequence]({{ '/lessons/en/astro/' | relative_url }})** — FE II continuation: islands, SSR, Astro Docs MCP (preview for annual-track students)
- **[Portfolio Template Brief]({{ '/lessons/en/portfolio-template-brief/plan/' | relative_url }})** — Semester 1 project specifications
- **[Individual React Capstone Project]({{ '/lessons/en/react/geophysical-aggregator-project/' | relative_url }})** — Semester 2 individual project brief
- **[Front-End II track]({{ '/tracks/en/feii/' | relative_url }})** — where this course continues in year 3
- **[AI Practical Guide]({{ '/methodology/en/ai-practical-guide/' | relative_url }})** — when to plan, how to disclose, what you must defend
- **[Architecture Foundations]({{ '/lessons/en/ai-assisted-development/foundations/' | relative_url }})** — RPC, RAG, MVC as discipline
- **[Official Syllabus](https://udit.es)** — UDIT course documentation (Spanish)

---

## 📝 Notes

- **3D Foundation** — Semester 1 includes introductory 3D content (GSAP, modern design trends) as the seed for FE II's advanced 3D unit. FE II builds on this foundation rather than duplicating it.
- **Agentic stack (FE II preview)** — FE I semester 2 introduces MCP as a boundary in [AI-Assisted Development Foundations]({{ '/lessons/en/react/ai-assisted-development-foundations/' | relative_url }}). FE II extends this with **Astro Docs MCP** ([`mcp.docs.astro.build`](https://mcp.docs.astro.build/mcp)) in [Unit 2]({{ '/lessons/en/feii/unit-2-astro-fundamentals/' | relative_url }}) — live framework docs in Cursor/Windsurf/Claude Desktop, not stale training data. See the [Astro teaching sequence]({{ '/lessons/en/astro/' | relative_url }}) index (parallel to the [React sequence]({{ '/lessons/en/react/' | relative_url }})).
- **UX/UI Boundary** — This track owns implementation practice: semantic structure, keyboard interaction, contrast, and accessibility testing. The dedicated UX/UI course owns research, information architecture, and the deeper user-testing sequence. The boundary is explicit so the two courses complement rather than duplicate assessment.
- **Cross-Degree Context** — This track serves both Full-Stack and Data-Science & AI degrees. Back-End II and Data Science cross-listings are based on direct professor contact rather than independent syllabus verification (official JSONs are empty stubs).
- **React Territory** — Semester 2's 14 taught React sessions, individual project, and final presentation are untouched FE I territory — FE II must not repeat React fundamentals/hooks/testing/deployment but extend past them into advanced topics.

---

> _"Every creation is a recreation of the original principle. Code, like alchemy, transforms."_
