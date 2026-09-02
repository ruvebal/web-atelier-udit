---
layout: lesson
title: 'Front-End II — Desarrollo Web: Front-End II'
title_alt: 'Front-End II — Desarrollo Web: Front-End II'
slug: feii-track
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /tracks/en/feii/
description: 'Semester track for Full-Stack degree(UDIT). Production architecture, PWA, testing, performance, 3D, and IoT/robotics. 6 ECTS, 150h total (30h lab).'
tags: [frontend, astro, pwa, testing, performance, r3f, iot, python, udit, production-architecture, annual]
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

{% include track-lang-switch.html track='feii' %}

## Pass This Track

**Start here for grading, deliverables, calendar checks, and resubmission rules:** [How to Pass Front-End II]({{ '/tracks/en/feii/how-to-pass-this-track/' | relative_url }}).

---

## 🎯 Pedagogical Vision

<figure class="track-curriculum-figure">
<img src="{{ '/assets/images/track-curriculum/feii-pedagogical-vision-628a179fe8d0.svg' | relative_url }}" alt="Abstract diagram of Front-End II pedagogical vision: interface layer expanding from browser to 3D and IoT, with four pillars for durable core, volatile layer, performance, and docs-first AI." width="1200" height="640" loading="lazy" aria-describedby="feii-pedagogical-vision-caption">
<figcaption id="feii-pedagogical-vision-caption">
<p>System-first pedagogy — the component model stays stable while the deployment context expands to spatial interfaces, devices, and Python-backed services.</p>
<p class="image-credit">Formula-led figure · Julia recurrence backdrop · @ruvebal · visual-forger 1.1.0</p>
</figcaption>
</figure>

Front-End II is the transition from building interfaces to building systems of interfaces. Where FE I taught you to think component-first, FE II teaches you to think system-first — production architecture, offline resilience, automated testing, performance engineering, and the interface-layer frontier beyond the browser (3D, IoT/robotics, Python-backed services).

Our pedagogy rests on four pillars:

- **Durable Core, Volatile Layer** — The component model (props, state, hooks) is the stable foundation; frameworks and rendering targets (DOM, WebGL, device APIs) are the transient surface we learn to navigate intelligently.
- **Docs-First, Disclosed, Verified AI** — AI assistants are used transparently: plans precede implementation, prompts are documented, and all code is verified against human judgment.
- **Performance as Respect** — Core Web Vitals, performance budgets, and optimization are not optional features but baseline expectations for professional development.
- **Interface-Layer Thinking** — The interface layer extends beyond the browser to spatial interfaces (3D), physical devices (IoT/robotics), and backend services (Python). The component model stays the same; the deployment context changes.

**Whose better living?** Not only the reader's. Code that does less work draws less power, and power spent becomes heat — in a phone, in a GPU rendering a scene, in a data centre answering a WebSocket. That cost does not stop at the device: it lands on a shared climate, and so on everything alive in it. We are technological beings, and the line between what lives and what is built was never clean; if you are alive, you are already inside this.

Front-End II raises the stakes, because everything this course adds is expensive: a shader runs every frame, a real-time stream never sleeps, a third-party dependency ships to every visitor. So the performance budgets of Unit 7 are not a scoring exercise — they are the habit of asking, before you add something, **what it costs the world it runs in, and who pays.** Accessibility asks the same question about who is shut out. Neither is optimisation; both are ethics.

---

## 📖 Track Overview

**Front-End II** is UDIT's semester 6-ECTS course (150h total, 30h lab) for the Full-Stack and Data-Science & AI degrees. The formal workload is **10 h lección magistral + 30 h laboratory + 14 h individual exercises + 94 h autonomous study + 2 h assessment**. The track spans 12 units organized around production architecture and interface-layer expansion:

- **Units 1–3** — Production architecture with Astro meta-framework (SSR, islands architecture, micro-frontends)
- **Unit 4** — PWA/offline capabilities (service workers, caching strategies)
- **Units 5–6** — Testing strategy and AI-assisted code review (Testing Trophy, CI/CD, human-in-the-loop workflows)
- **Unit 7** — Performance engineering (Core Web Vitals, performance budgets, bundle optimization)
- **Units 8–9** — 3D/cutting-edge interface aesthetics (React Three Fiber, shader literacy, post-processing)
- **Unit 10** — IoT/robotics control-panel with Python-backed interface (WebSocket, device APIs)
- **Units 11–12** — Capstone integration and oral defence (process evidence, AI declaration, verify/narrate axes)

### Semester Arc

<figure class="track-curriculum-figure">
<img src="{{ '/assets/images/track-curriculum/feii-semester-arc-0d22fb4d25eb.svg' | relative_url }}" alt="Semester arc diagram for Front-End II: Kickoff through Astro, PWA, testing, performance, 3D, IoT, capstone, and oral defence across twelve units." width="1200" height="640" loading="lazy" aria-describedby="feii-semester-arc-caption">
<figcaption id="feii-semester-arc-caption">
<p>Twelve-unit arc — Kickoff → Astro → PWA → Testing → Performance → 3D/Shaders → IoT/Python → Capstone → Defence.</p>
<p class="image-credit">Formula-led figure · Julia recurrence backdrop · @ruvebal · visual-forger 1.1.0</p>
</figcaption>
</figure>

---

## 📚 Session Sequence

This track follows the canonical curriculum sequence: 12 sessions across the semester, with explicit laboratory allocation summing to the official 30 h requirement. The listed session windows guide sequencing; do not add them to the formal activity allocations above.

{% if site.publication.publish_internal_metadata %}

<!-- curriculum-internal:
Sequence source: `web-foundations/docs/_data/tracks.yml`, key `feii`.
-->

{% endif %}

### FE II Production Architecture & Interface-Layer Frontier (12 sessions)

| #   | Session                                                                                                            | Duration | Lab Hours | Description |
| --- | ------------------------------------------------------------------------------------------------------------------ | -------- | --------- | ----------- |
| U1  | [Kickoff: From FE I React to Production Architecture]({{ '/lessons/en/feii/unit-1-kickoff/'                        | relative_url }}) | 2h        | 0h          | Distributed interface system: edge, four-pillar vector, frontier signal |
| U2  | [Astro Meta-Framework — Islands Architecture & SSR]({{ '/lessons/en/feii/unit-2-astro-fundamentals/'               | relative_url }}) | 3h        | 2h          | Astro fundamentals, content-first, SSR vs SSG, multi-framework    |
| U3  | [Advanced Astro Architecture & Multi-Framework Integration]({{ '/lessons/en/feii/unit-3-astro-advanced/'           | relative_url }}) | 3h        | 2h          | Content collections, i18n routing (mandatory), data fetching, micro-frontends |
| U4  | [Progressive Web Apps & Offline Capabilities]({{ '/lessons/en/feii/unit-4-pwa-offline/'                            | relative_url }}) | 2h        | 2h          | Service workers, caching strategies, web app manifest             |
| U5  | [Testing Strategy — Designing a Suite That Earns Its Cost]({{ '/lessons/en/feii/unit-5-testing-strategy/'          | relative_url }}) | 3h        | 3h          | What _not_ to test, flakiness, CI budgets, contract testing       |
| U6  | [AI-Assisted Code Review — Human-in-the-Loop, Graded As Such]({{ '/lessons/en/feii/unit-6-ai-code-review/'         | relative_url }}) | 3h        | 3h          | GitHub PR integration, accept/reject/escalate log, human approval |
| U7  | [Performance Engineering — Core Web Vitals & Optimization]({{ '/lessons/en/feii/unit-7-performance/'               | relative_url }}) | 2h        | 2h          | Core Web Vitals, performance budgets, bundle optimization         |
| U8  | [React Three Fiber — 3D Interfaces with React Patterns]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/'             | relative_url }}) | 3h        | 3h          | Declarative 3D components, state in 3D, raycasting                |
| U9  | [Shader Literacy & Cutting-Edge Interface Aesthetics]({{ '/lessons/en/feii/unit-9-shader-literacy/'                | relative_url }}) | 3h        | 3h          | GLSL basics, custom shaders, post-processing effects              |
| U10 | [IoT/Robotics Control-Panel & Python-Backed Interface]({{ '/lessons/en/feii/unit-10-iot-python-backend/'           | relative_url }}) | 2h        | 4h          | Device APIs, WebSocket, Python FastAPI integration                |
| U11 | [Capstone Integration — Process Evidence & AI Use Declaration]({{ '/lessons/en/feii/unit-11-capstone-integration/' | relative_url }}) | 3h        | 3h          | Process documentation, AI declaration, verify/narrate axes        |
| U12 | [Capstone Oral Defence & Final Evaluation]({{ '/lessons/en/feii/unit-12-capstone-defence/'                         | relative_url }}) | 2h       | 3h        | Presentation structure, evaluation criteria, Q&A                  |
{: .track-session-table}

**Total Lab Hours:** 30h (matching official `ACTIVIDADES FORMATIVAS` allocation)

---

## 🎯 Learning Objectives

By completing this track, students will be able to:

- **Master production architecture** — Meta-frameworks (Astro), SSR/SSG, micro-frontends, and islands architecture
- **Build PWA applications** — Service workers, offline capabilities, and installable web apps
- **Apply professional testing strategies** — Testing Trophy decision-making, CI/CD integration, and AI-assisted code review
- **Engineer performance** — Core Web Vitals, performance budgets, and bundle optimization
- **Extend to 3D interfaces** — React Three Fiber, shader literacy, and post-processing effects
- **Consume IoT/robotics and Python services** — WebSocket real-time data, device APIs, and backend integration
- **Document process evidence** — Decision logs, iteration logs, and AI use declarations
- **Present technical work** — Oral defence structure, diff-based questions, and evaluation criteria

---

## 📦 Deliverables

### Entrega 1 (Units 2–6)

- **Astro Architectural Project** — Content collections, **Astro i18n routing (es + en, mandatory)**, islands architecture, multi-framework integration
- **Testing Strategy** — Unit tests (Vitest), component tests (RTL), E2E tests (Playwright), CI/CD pipeline
- **AI-Assisted Code Review** — GitHub Actions workflow with AI review tools, human-in-the-loop process

### Entrega 2 (Units 8–10)

- **3D Interface with R3F** — Declarative 3D components, interactive raycasting, animation
- **Shader Effects** — Custom GLSL shaders, post-processing (bloom, chromatic aberration)
- **IoT/Robotics Control Panel** — WebSocket real-time data, Python FastAPI backend, device control

### Entrega 3 / Examen Final (Units 11–12)

- **Capstone Project** — Integration of all units into a cohesive system
- **Process Evidence** — decisions.md, iterations.md, AI_USE_DECLARATION.md
- **Oral Defence** — 15-minute presentation with diff walkthrough, Q&A, live demo

---

## 📊 Evaluation

**FE II weights** (reconciled with `desarrollo-web-front-end-i-2025-2026.json` and Phase 3):

| Component                                    | %   |
| -------------------------------------------- | --- |
| Pruebas (Tests)                              | 30% |
| Trabajos, entregables y proyectos (Projects) | 60% |
| Portafolio (Problem-solving portfolio)       | 10% |
{: .track-evaluation-table}

**Track-level breakdown** (aligned with institutional weights and evaluation philosophy):

- **Technical Excellence (40%)** — Code quality, architecture, implementation, performance (mapped from tests + projects technical)
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
- **[Front-End I track]({{ '/tracks/en/fei/' | relative_url }})** — the prerequisite course; FE II opens where it closes
- **[AI Practical Guide]({{ '/methodology/en/ai-practical-guide/' | relative_url }})** — when to plan, how to disclose, what you must defend
- **[Architecture Foundations]({{ '/lessons/en/ai-assisted-development/foundations/' | relative_url }})** — RPC, RAG, MVC as discipline
- **[Official Syllabus](https://udit.es)** — UDIT course documentation (Spanish)

---

## 📝 Notes

- **Meta-framework Decision** — Astro selected as the meta-framework for units 2–3 based on content-first philosophy and islands architecture. This decision was made at the start of Phase 2.
- **3D as Interface-Layer Transfer** — Units 8–9 explicitly teach 3D as an interface-layer transfer exercise — the same component/state model as React, applied to spatial interfaces. This is not a graphics course but an application of React patterns to WebGL.
- **IoT/Robotics Load-Bearing** — Unit 10 is load-bearing — it is the direct payoff of teaching both Full-Stack and Data-Science students. Entrega 2 uses the published, versioned lab contract first; any later Back-End II integration must remain contract-compatible or arrive as a documented versioned change.
- **Zero FE I Overlap** — No React fundamentals, hooks, routing, or basic deployment content is repeated from FE I. All content is either new (Astro, PWA, testing, performance, 3D, IoT) or advanced extensions of FE I patterns.
- **Evidence Boundary** — The interface-transfer teaching sequence in Units 8–10 is a declared pilot. The course supplies a runnable lab contract; it does not claim that the still-unverified pedagogy has already been empirically validated for this cohort.

---

> _"The interface layer expands beyond the browser. Your code should too."_
