---
layout: lesson
title: 'Unit 1: Kickoff — From FE I React to Production Architecture'
title_alt: 'Unidad 1: Lanzamiento — De React FE I a Arquitectura de Producción'
slug: feii-unit-1-kickoff
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-1-kickoff/
description: 'Orientation session bridging FE I React foundations to FE II production architecture, interface-layer thinking, and systems of interfaces.'
tags: [feii, orientation, architecture, interface-layer, production, systems-thinking]
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Before the first line of code, prepare the forge. Before the first query, load the memory. Documentation is not an afterthought — it is the first act of architecture."_
> — Tao of Development, `wis-014`

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

> 📐 **Code block convention for this sequence:** every code block in FE II carries one of three labels — **CodeSandbox-ready** (paste and run), **Excerpt** (partial pattern, illustrative, does not run as-is), or **Template** (copy and replace bracketed values). Unit 1 has no code this session — see [§ Conventions used across these lessons]({{ '/lessons/en/feii/' | relative_url }}#-conventions-used-across-these-lessons) on the index page for the full policy.

---

## 🎯 Learning Objectives

By the end of this orientation session, you will be able to:

- **Bridge the gap** between FE I's React foundations and FE II's production architecture focus
- **Understand the interface-layer shift** — from building single interfaces to designing systems of interfaces
- **Situate the FE II arc** — why we cover Astro, PWA, testing, performance, 3D, and IoT/robotics
- **Align with the durable-core philosophy** — frameworks as volatile layers, principles as the stable foundation

---

## 📖 The Interface Layer Reframe

In FE I, you learned to build interfaces — components, state management, routing, authentication, and deployment. You built solid React applications with modern tooling.

FE II asks a different question: **What happens when interfaces scale?**

- Not one React app, but dozens of micro-frontends
- Not just browser rendering, but edge caching, service workers, and offline-first experiences
- Not just REST APIs, but IoT devices, Python services, and real-time data streams
- Not just component testing, but CI/CD pipelines, performance budgets, and monitoring

The interface layer is no longer a single screen — it's a distributed system with human-facing components.

### The Systems Lens

FE I taught you to think component-first. FE II teaches you to think system-first:

```
┌─────────────────────────────────────────────────────────┐
│                    INTERFACE LAYER                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Single Interface (FE I)      System of Interfaces (FE II) │
│   ┌─────────────────┐         ┌──────────────────────┐  │
│   │ React Component │         │ Meta-Framework      │  │
│   │ State & Props   │         │ Micro-Frontends      │  │
│   │ Routing         │         │ Edge Caching         │  │
│   └─────────────────┘         │ Service Workers      │  │
│                                │ Device APIs          │  │
│                                └──────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

The component model stays the same — you still use props, state, and lifecycle — but the deployment context changes dramatically.

---

## 🔬 Scholarly honesty — why this course opens with a declaration discipline, not a promise of speed

This orientation session has **no CONTENIDOS anchor and no technical claim to ground** — the matrix entry for Unit 1 is explicit about that, and this page will not pretend otherwise. What it does need to frame, before Unit 2 starts, is *why* FE II asks you to declare AI assistance rather than simply use it.

A 2025 grounded-theory study of AI-assisted programming education (Liu, Fan & Pan — Ahmes node `25fa0a93-6808-5ccd-acc7-54b67523897e`) opens with exactly this tension, quoted here **with an evidence gap left visible rather than papered over**:

> _"The integration of generative AI into programming education has produced a widely reported tension between performance and learning. We distinguish immediate task performance from genuine learning: durable, transferable conceptual understanding and evaluative skill, and examine how AI support shapes learning processes, not merely outcomes. While many studies document improved speed, accuracy, and affect with AI support, questions remain about the quality of underlying learning."_

<!-- provenance: Ahmes coat dc2bd27d (Liu, Fan & Pan, "Tool, tutor, or crutch?"), node 25fa0a93-6808-5ccd-acc7-54b67523897e, page_index 0 ("Motivation"); resolved live this session via `ahmes query --cite --require-evaluator-safe` -> evaluator_safe=no, exit 2, reason "missing year"; a live `ahmes enrich --meta --online` attempt this session enriched 0 nodes across all three library duplicates of this coat -->

**`[BIBLIO-GAP]` — declared, not forced.** This node is **not** evaluator-safe: `ahmes status` reports the citation preview as `[BIBLIO-GAP]` (missing year) even after a fresh `ahmes enrich --meta --online` attempt run live this session enriched zero nodes — a genuine, re-confirmed gap, not a pipeline lag waiting to resolve. The passage is quoted here for its *framing*, not asserted as `(Author Year)` peer-reviewed proof, and it does not enter this course's citable bibliography. What it grounds honestly: the distinction between "AI made this faster" and "I understand this better" is a real, actively-studied tension in the field — which is exactly why every unit from here forward asks you to disclose AI assistance rather than simply demonstrate speed.

---

## 🏗️ The FE II Arc

This course builds on your React foundation with 12 units organized around production architecture and interface-layer expansion:

| Unit  | Theme                                                | Lab Hours | Deliverable              |
| ----- | ---------------------------------------------------- | --------- | ------------------------ |
| 1     | Kickoff: Interface layer reframe                     | 0h        | Orientation only         |
| 2–3   | Astro meta-framework architecture                    | 4h        | Entrega 1 seed           |
| 4     | PWA / offline capabilities                           | 2h        | —                        |
| 5–6   | Testing strategy & AI-assisted code review           | 6h        | Entrega 1 due            |
| 7     | Performance engineering                              | 2h        | —                        |
| 8–9   | 3D / cutting-edge interface aesthetics               | 6h        | Entrega 2 seed           |
| 10    | IoT/robotics control-panel & Python-backed interface | 4h        | Entrega 2 due            |
| 11–12 | Capstone integration + oral defence                  | 6h        | Entrega 3 / Examen Final |

**Total Lab Hours:** 30h (matching official `ACTIVIDADES FORMATIVAS` allocation)

---

## 🔗 Connection to FE I

FE I's React track is **untouched territory** — we will not re-teach React fundamentals, hooks, routing, or basic deployment. Those are yours from semester 2.

FE II starts where FE I ends:

- **FE I:** "Build a React app with routing and auth"
- **FE II:** "Build a system of React apps with Astro, PWA, and edge caching"

The component patterns you learned in FE I — hooks, context, custom hooks — remain the same. The difference is how they're composed and deployed.

---

## 🤖 AI-Assisted Development in FE II

AI assistance in FE II follows the same docs-first methodology as FE I, but with increased focus on:

- **Architecture diagrams** — Use AI to generate system diagrams, data flow visualizations, and deployment architecture docs
- **Performance audits** — Use AI to analyze bundle reports, identify bottlenecks, and suggest optimizations
- **Testing strategies** — Use AI to design test suites, generate edge cases, and review PRs for coverage gaps
- **Code review as taught technique** — Oliveira et al. 2026 research: AI-assisted PR review as a human-in-the-loop workflow (taught in units 5–6)

The AI is a collaborator in system design, not a shortcut around learning architecture.

---

## Lab (team) — 0 h this unit, and that is the honest allocation

Unit 1 carries **0 lab hours** in `tracks.yml`, and this is stated as content, not omitted as an oversight: a team lab needs a real shared-repo artefact to work from, and at kickoff none exists yet. The first team lab arrives in Unit 2, once Astro scaffolding gives the cohort something to hold in common. Filling this section with a placeholder task would misrepresent what "lab" means for the rest of the course — workplace-like work on the shared repo, per `fe-unit-forge.mdc` §1 — so it stays empty by design.

## Exercises (individual) — decontextualised · 2 h

Not the studio piece — three short problems isolating the reframe itself, before any CONTENIDOS anchor exists to drill:

1. **Diagnostic.** Given a short FE I-style project description (a single React app, one deploy target), identify which specific claims in it would need to change to describe an FE II "system of interfaces," and which would stay exactly as they are.
2. Given the Liu Motivation-node tension quoted above, write two sentences distinguishing what an AI tool speeding up *your* task proves, and does not prove, about what you understand. **Solvable without AI — declared as such.**
3. Read the 12-unit table above and, without looking ahead, predict in one sentence each what Units 2 and 8 will need from this unit's "systems lens." This is a self-check the professor compares against the actual units once submitted — not a graded content question, since Unit 1 has no technical content to grade against.

Professor expected-answer sketch: kept in `exercises.md`, not this page.

---

## 📚 Recommended Reading

- **Astro Documentation** — Get familiar with islands architecture before unit 2
- **PWA Specification** — Preview unit 4 concepts (Progressive Web Apps fundamentals)
- **Testing Pyramid** — Martin Fowler's testing strategy (context for units 5–6)
- **Performance Budgets** — Performance budgets and Core Web Vitals (context for unit 7)

**Missing evidence — stated plainly:** this unit has no CONTENIDOS anchor and no technical claim to ground. Liu, Fan & Pan (2025) frames the performance-vs-learning tension that motivates the course's AI-declaration discipline but remains `[BIBLIO-GAP]` (missing year, re-confirmed live this session) — quoted for its framing, not cited as settled evidence.

---

## ✅ Session Outcome

By the end of this orientation, you should:

- Understand why FE II focuses on **systems of interfaces** rather than single interfaces
- Have a mental model of the 12-unit arc and how it builds on your React foundation
- Be ready to dive into **Astro meta-framework architecture** in units 2–3
- See the durable-core philosophy in action: frameworks change, principles endure

---

> _"A monorepo is not a monolith. A monolith is not modular. A modular system need not be distributed."_
> — Tao of Development, `arch-006`
