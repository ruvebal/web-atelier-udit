---
layout: lesson
title: 'Front-End I — Desarrollo Web: Front-End I'
title_alt: 'Front-End I — Desarrollo Web: Front-End I'
slug: fei
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /tracks/fei/
description: 'Annual track for Full-Stack and Data-Science & AI degrees (UDIT). Semester 1: vanilla JS/CSS without frameworks. Semester 2: modern React with AI assistance. 6 ECTS, 150h total (30h lab).'
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

## 🎯 Pedagogical Vision

Front-end development is the human-facing interaction layer of the web — not website production, but the bridge between people and systems. This track cultivates developers who think critically about their craft, understand the durable core beneath volatile frameworks, and build interfaces that respect both human users and the machines that render them.

Our pedagogy rests on four pillars:

- **Durable Core, Volatile Layer** — HTML semantics, CSS fundamentals, and JavaScript principles form the stable foundation; frameworks and tools are the transient surface we learn to navigate intelligently.
- **Docs-First, Disclosed, Verified AI** — AI assistants are used transparently: plans precede implementation, prompts are documented, and all code is verified against human judgment.
- **Accessibility as Ethics, Not Checklist** — WCAG compliance is embedded from the start, not bolted on as an afterthought. We design for screen readers, keyboard navigation, and neurodiverse users because inclusive design is ethical design.
- **Performance as Respect** — Fast-loading, responsive interfaces are not optimization targets but baseline expectations. We consider the devices and networks our users actually experience.

A better living is not only the reader's. We also engineer for the systems that carry our code — browser engines, rendering pipelines, and the assistive technologies that speak it aloud. Performance engineering and accessibility are two sides of the same coin: respect for the computational resources and the human attention our work consumes.

---

## 📖 Track Overview

**Front-End I** is UDIT's annual 6-ECTS course (150h total, 30h lab) for the Full-Stack and Data-Science & AI degrees. The track spans two semesters with a clear progression:

- **Semester 1** — Vanilla JavaScript and CSS without frameworks. Students build a portfolio template through three grade levels (vanilla, Bootstrap+GSAP, Tailwind+Vite).
- **Semester 2** — Modern React with AI-assisted development. Students complete a 15-lesson sequence from philosophy through deployment, culminating in an individual geophysical aggregator project.

### Annual Arc

```
┌─────────────────────────────────────────────────────────┐
│                    SEMESTER 1: VANILLA                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Environment → Git → HTML/CSS → Advanced CSS → JS        │
│  → DOM → Modules → Tooling → GSAP → Design Trends        │
│  → Portfolio Template Project                             │
│                                                          │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    SEMESTER 2: REACT                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Philosophy → Frameworks → State → AI Foundations        │
│  → React Fundamentals → Hooks → State Architecture       │
│  → Routing → Backend Integration → Auth → SSR+AI18n       │
│  → Testing → Performance → Deployment → Project → Final   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📚 Session Sequence

This track follows the canonical sequence defined in `web-foundations/docs/_data/tracks.yml`. The table below renders the `fei:` entry — 25 sessions across both semesters, with explicit `labHours` allocation summing to the official 30h laboratory requirement.

### Semester 1 — Vanilla JS/CSS (13 sessions)

| #   | Session                                       | Duration | Lab Hours | Description                                                       |
| --- | --------------------------------------------- | -------- | --------- | ----------------------------------------------------------------- |
| S1  | Development Environment Setup                 | 2h       | 1h        | VS Code, Git/GitHub, extensions, basic workflows                  |
| S2  | First Steps: Git & GitHub Flow                | 2h       | 1h        | Commits, branches, pull requests, GitHub Pages                    |
| S3  | HTML Semantic + CSS Fundamentals              | 3h       | 1.5h      | HTML5 semantics, CSS selectors, box model, typography             |
| S4  | Typography & Color Systems                    | 2h       | 1h        | Fluid typography with clamp(), accessible color palettes          |
| S5  | Intrinsic Web Design: Container Queries       | 2h       | 1h        | Container queries, subgrid, context-based responsive design       |
| S6  | Pseudo-Elements & State-Based Styling         | 2h       | 1h        | :hover, :focus-visible, ::before/::after, accessible interactions |
| S7  | JavaScript Introduction                       | 3h       | 1.5h      | JS fundamentals, types, control flow, event model                 |
| S8  | DOM Manipulation: Strings, APIs, Templates    | 3h       | 1h        | innerHTML vs native APIs, XSS security, update patterns           |
| S9  | JavaScript Modules: ES6 Modularity            | 2h       | 1h        | Modularization history (IIFE → CommonJS → ES6), import/export     |
| S10 | Linting & Formatting: Professional Standards  | 1.5h     | 0.5h      | Prettier, ESLint, Stylelint, HTMLHint configuration               |
| S11 | GSAP: Typography & SVG Animation              | 3h       | 1.5h      | GSAP timelines, stagger, easing, ScrollTrigger                    |
| S12 | Modern Web Design Trends                      | 2h       | 1h        | Parallax, glassmorphism, neumorphism, dark mode demos             |
| S13 | Portfolio Template Brief (Semester 1 Project) | 4h       | 1.5h      | Semester integrator: portfolio template in three levels           |

### Semester 2 — React Modern (15 lessons, 4 phases)

| #   | Session                                                     | Duration             | Lab Hours | Description                                                                   |
| --- | ----------------------------------------------------------- | -------------------- | --------- | ----------------------------------------------------------------------------- |
| S14 | Philosophy & Pedagogical Vision                             | 3h                   | 1h        | Tao Developer mindset, Five Pillars, critical coding philosophy               |
| S15 | Framework Fundamentals & Comparison                         | 4h                   | 1.5h      | React vs Vue vs Vanilla comparison, tech decision matrix, Vite setup          |
| S16 | State & UI: Finite State Machines                           | 3h                   | 1.5h      | State modeling as FSM, state taxonomy, antipatterns                           |
| S17 | AI-Assisted Development Foundations                         | 2h                   | 0.5h      | LLMs as probabilistic reasoning, architectural contracts, observability       |
| S18 | React Fundamentals: Components & JSX                        | 3h                   | 1.5h      | Functional components, JSX syntax, props, events, rendering                   |
| S19 | Hooks Mastery: useState, useEffect, Custom Hooks            | 3h                   | 1.5h      | useState, useEffect, useRef, useMemo/useCallback, custom hooks                |
| S20 | State Architecture: useReducer, Context, External Libraries | 3h                   | 1.5h      | useReducer, Context API, Zustand/Redux Toolkit, decision tree                 |
| S21 | Routing & Navigation: React Router v7                       | 3h                   | 1.5h      | React Router v6/v7, dynamic routes, nested routes, protected routes           |
| S22 | Backend Integration: Fetch, React Query, GraphQL            | 3h                   | 1.5h      | Fetch API, async patterns, React Query caching/mutations, GraphQL             |
| S23 | Authentication: JWT, Sessions, Security                     | 3h                   | 1.5h      | Auth concepts (JWT, sessions, OAuth), secure implementation, XSS prevention   |
| S24 | Framework Mode + SSR Auth + i18n (Advanced)                 | 3h                   | 1h        | React Router v7 Framework Mode, SSR routes.js, server-side auth, :locale i18n |
| S25 | Testing: Vitest, RTL, Cypress                               | 2h                   | 1h        | Unit testing with Vitest, component testing with RTL, E2E with Cypress        |
| S26 | Performance: Memoization, Code Splitting, Bundle Analysis   | 2h                   | 1h        | React DevTools Profiler, React.memo, lazy() + Suspense, bundle analysis       |
| S27 | Deployment: Vercel, Netlify, CI/CD                          | 2h                   | 1h        | Vite production build, Vercel/Netlify deployment, env vars, GitHub Actions    |
| S28 | Individual Project: Geophysical Aggregator                  | 3 weeks (individual) | 0h        | SSR app with React Query, two public APIs, i18n, auth, public deployment      |
| S29 | Final Presentation & Monograph                              | 2h                   | 0h        | Live demo, technical presentation, reflective monograph                       |

---

## 🎯 Learning Objectives

By completing this track, students will be able to:

- **Master front-end fundamentals** — HTML5 semantics, modern CSS, and JavaScript ES6+ as the durable core
- **Build interactive interfaces** — Without frameworks (semester 1) and with modern React (semester 2)
- **Apply scalable architecture patterns** — From local state management to Context/Redux and server-side rendering
- **Integrate real-world systems** — Public APIs, secure authentication, internationalization, and CI/CD deployment
- **Practice AI-assisted development** — Docs-first methodology with architectural contracts and critical validation
- **Ship professional applications** — From portfolio templates to data-driven dashboards with performance optimization

---

## 📦 Deliverables

### Semester 1 Deliverables

- **Portfolio Template Project** — Three-level progressive implementation:
  - Grade 1 (Vanilla): HTML, CSS, JS fundamentals via CDN
  - Grade 2 (Bootstrap+GSAP): Bootstrap 5 + GSAP animations via CDN, intermediate JS
  - Grade 3 (Tailwind+Vite): Node/Vite setup, Tailwind, SPA with vanilla JS routing
- **GitHub Repository** — Clean commit history, meaningful messages, README with live link
- **Evidence per Session** — Commits, ATELIER reflections, and concept demonstrations

### Semester 2 Deliverables

- **Geophysical Aggregator Project** — Individual integrator:
  - React Router v7 Framework Mode app deployed to public URL
  - At least two public geophysical APIs (USGS, Open-Meteo, NOAA, etc.)
  - React Query for client-side data management with `staleTime` and SSR `initialData`
  - Bilingual UI (`/en/...`, `/es/...`) with server-resolved locale
  - httpOnly cookie authentication gating at least one route
  - GitHub repository with `docs/plans/`, `docs/reports/`, and README AI disclosure
- **Final Presentation** — Live demo (40%), technical presentation (15%), monograph (20%), reflection quality (10%)

---

## 📊 Evaluation

**Official FE I weights** (from `desarrollo-web-front-end-i-2025-2026.json`):

| Component                                    | Weight | Description                                                           |
| -------------------------------------------- | ------ | --------------------------------------------------------------------- |
| Pruebas (Tests)                              | 30%    | Written examinations covering theory and practical skills             |
| Trabajos, entregables y proyectos (Projects) | 60%    | Portfolio template (semester 1) + Geophysical Aggregator (semester 2) |
| Portafolio (Problem-solving portfolio)       | 10%    | Resolution of problems, exercises, and reflections                    |

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

- **[How to Pass This Track]({{ '/tracks/fei/how-to-pass-this-track/' | relative_url }})** — Evaluation criteria, deliverable specifications, and grading rubric
- **[AI Declaration & Oral Defence Rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})** — Shared rubric for AI use declarations and oral defences
- **[React Teaching Sequence]({{ '/lessons/en/react/' | relative_url }})** — Detailed semester 2 curriculum with dependency graph
- **[Portfolio Template Brief]({{ '/lessons/en/portfolio-template-brief/plan/' | relative_url }})** — Semester 1 project specifications
- **[Geophysical Aggregator Project]({{ '/lessons/en/react/geophysical-aggregator-project/' | relative_url }})** — Semester 2 individual project brief
- **[Front-End II track]({{ '/tracks/feii/' | relative_url }})** — where this course continues in year 3
- **[AI Practical Guide]({{ '/methodology/en/ai-practical-guide/' | relative_url }})** — Methodology for AI-assisted development
- **[Official Syllabus](https://udit.es)** — UDIT course documentation (Spanish)

---

## 📝 Notes

- **3D Foundation** — Semester 1 includes introductory 3D content (GSAP, modern design trends) as the seed for FE II's advanced 3D unit. FE II builds on this foundation rather than duplicating it.
- **UX/UI Boundary** — Módulo 3 (UX/UI + accessibility) scope is pending clarification with the dedicated UX/UI course. Current implementation focuses on accessibility-in-practice (WCAG, testing tools) while reserving deep UX theory for the sibling course. _(Scope note held in the course repository, not published.)_
- **Cross-Degree Context** — This track serves both Full-Stack and Data-Science & AI degrees. Back-End II and Data Science cross-listings are based on direct professor contact rather than independent syllabus verification (official JSONs are empty stubs).
- **React Territory** — Semester 2's 15-lesson React sequence is untouched FE I territory — FE II must not repeat React fundamentals/hooks/testing/deployment but extend past them into advanced topics.

---

> _"Every creation is a recreation of the original principle. Code, like alchemy, transforms."_
