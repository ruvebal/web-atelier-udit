---
layout: lesson
title: 'Front-End II: Production Architecture & the Interface-Layer Frontier'
title_alt: 'Front-End II: Arquitectura de Producción y la Frontera de la Capa de Interfaz'
slug: feii
category: feii
tags: [feii, curriculum, overview, astro, pwa, testing, performance, r3f, iot]
date: 2026-08-09
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Ship the module when it works alone. Ship the system when the modules work together. Ship the platform when the systems compose without speaking."_
> — Tao of Development, `arch-007`

> **AI Assistance Disclosure:** This sequence integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout, and Unit 6 makes AI review itself a graded technique.

---

## 🎯 What this sequence is

The **canonical lesson sequence** for UDIT's _Desarrollo Web: Front-End II_ — 12 units, one semester, 6 ECTS (150 h total, of which **30 h Prácticas de Laboratorio**). Taught to both the **Full-Stack** and **Data Science & AI** degrees.

This page is the lesson index. For the course framing — objectives, deliverables, evaluation weights, methodology — see the **[Front-End II track]({{ '/tracks/feii/' | relative_url }})**; for how you are graded, see **[How to Pass This Track]({{ '/tracks/feii/how-to-pass-this-track/' | relative_url }})**.

### The one-sentence premise

Front-End I taught you to build **interfaces**. Front-End II teaches you to build **systems of interfaces** — and then pushes the interface layer past the browser entirely.

---

## 🔗 What Front-End I already owns (and this course will not repeat)

This sequence deliberately does **not** re-teach the [React track]({{ '/lessons/en/react/' | relative_url }}) from FE I semester 2. If you need to revise, go back to the source rather than expecting it here:

| You should already have | From FE I |
| --- | --- |
| Components, JSX, props, hooks | [React Fundamentals]({{ '/lessons/en/react/react-fundamentals/' | relative_url }}) · [Hooks]({{ '/lessons/en/react/react-hooks/' | relative_url }}) |
| State architecture, Context, stores | [State Architecture]({{ '/lessons/en/react/react-state-architecture/' | relative_url }}) |
| Routing, guards, URL state | [Routing & Navigation]({{ '/lessons/en/react/react-routing/' | relative_url }}) |
| Sessions, JWT, refresh, role guards | [Authentication]({{ '/lessons/en/react/react-authentication/' | relative_url }}) |
| Writing tests: Vitest, RTL, MSW, Cypress | [Testing]({{ '/lessons/en/react/react-testing/' | relative_url }}) |
| Deploying: Vite build, Vercel/Netlify, CI | [Deployment]({{ '/lessons/en/react/react-deployment/' | relative_url }}) |

**The boundary in one line:** FE I is **tool literacy** — _can I build and ship this?_ FE II is **engineering judgement** — _should it be built this way, and can I prove it?_

---

## 📚 The 12 units

Lab hours sum to the official **30 h** `ACTIVIDADES FORMATIVAS` allocation.

### Block 1 — Production architecture (Units 1–3)

| # | Unit | Total | Lab | Focus |
| --- | --- | --- | --- | --- |
| 1 | [Kickoff: From FE I React to Production Architecture]({{ '/lessons/en/feii/unit-1-kickoff/' | relative_url }}) | 2 h | 0 h | The interface-layer reframe; what changes in year 3 |
| 2 | [Astro Meta-Framework — Islands Architecture & SSR]({{ '/lessons/en/feii/unit-2-astro-fundamentals/' | relative_url }}) | 3 h | 2 h | A **second** rendering paradigm beside React |
| 3 | [Advanced Astro & Multi-Framework Integration]({{ '/lessons/en/feii/unit-3-astro-advanced/' | relative_url }}) | 3 h | 2 h | Content collections, data patterns, micro-frontends |

### Block 2 — Resilience & quality (Units 4–7) · **Entrega 1**

| # | Unit | Total | Lab | Focus |
| --- | --- | --- | --- | --- |
| 4 | [Progressive Web Apps & Offline Capabilities]({{ '/lessons/en/feii/unit-4-pwa-offline/' | relative_url }}) | 2 h | 2 h | Service workers, caching strategies, installability |
| 5 | [Testing Strategy — Designing a Suite That Earns Its Cost]({{ '/lessons/en/feii/unit-5-testing-strategy/' | relative_url }}) | 3 h | 3 h | What **not** to test; flakiness; CI time budgets; contracts |
| 6 | [AI-Assisted Code Review — Human-in-the-Loop]({{ '/lessons/en/feii/unit-6-ai-code-review/' | relative_url }}) | 3 h | 3 h | AI review as taught technique · **Entrega 1 due** |
| 7 | [Performance Engineering — Core Web Vitals]({{ '/lessons/en/feii/unit-7-performance/' | relative_url }}) | 2 h | 2 h | Budgets as a design constraint, not an audit |

### Block 3 — The interface-layer frontier (Units 8–10) · **Entrega 2**

| # | Unit | Total | Lab | Focus |
| --- | --- | --- | --- | --- |
| 8 | [React Three Fiber — 3D Interfaces with React Patterns]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/' | relative_url }}) | 3 h | 3 h | The same component/state model, rendered spatially |
| 9 | [Shader Literacy & Cutting-Edge Aesthetics]({{ '/lessons/en/feii/unit-9-shader-literacy/' | relative_url }}) | 3 h | 3 h | GLSL, custom materials, post-processing |
| 10 | [IoT/Robotics Control-Panel & Python-Backed Interface]({{ '/lessons/en/feii/unit-10-iot-python-backend/' | relative_url }}) | 2 h | 4 h | WebSocket + device APIs · **Entrega 2 due** |

### Block 4 — Capstone (Units 11–12) · **Entrega 3 / Examen Final**

| # | Unit | Total | Lab | Focus |
| --- | --- | --- | --- | --- |
| 11 | [Capstone Integration — Process Evidence & AI Declaration]({{ '/lessons/en/feii/unit-11-capstone-integration/' | relative_url }}) | 3 h | 3 h | `verify` / `narrate`: decisions, iterations, disclosure |
| 12 | [Capstone Oral Defence & Final Evaluation]({{ '/lessons/en/feii/unit-12-capstone-defence/' | relative_url }}) | 2 h | 3 h | Defending the diff, not the demo |

**Lab total:** 0 + 2 + 2 + 2 + 3 + 3 + 2 + 3 + 3 + 4 + 3 + 3 = **30 h** ✅

---

## 🧭 The arc

```
BLOCK 1 — ARCHITECTURE          BLOCK 2 — RESILIENCE & QUALITY
  U1 reframe                      U4  offline
  U2 Astro islands       ──────▶  U5  test strategy      ──────▶ ENTREGA 1
  U3 micro-frontends              U6  AI review
                                  U7  performance budgets
                                          │
                                          ▼
BLOCK 4 — CAPSTONE              BLOCK 3 — THE FRONTIER
  U11 process evidence   ◀──────  U8  3D as interface
  U12 oral defence                U9  shaders            ──────▶ ENTREGA 2
        │                         U10 IoT / Python
        ▼
  ENTREGA 3 / EXAMEN FINAL
```

**The through-line:** the component model you learned in FE I never changes. What changes is the **rendering target** (DOM → islands → WebGL) and the **data source** (REST → WebSocket → device). Blocks 1–2 harden the model; Block 3 proves it transfers; Block 4 makes you defend it.

---

## 📐 Conventions used across these lessons

Every code block in this sequence carries one of three labels — **check it before you paste**:

- **CodeSandbox-ready** — complete file, runs once the scaffold is in place.
- **Excerpt** — partial pattern, illustrative. Does **not** run as-is.
- **Template** — copy and replace `[BRACKETED]` values before use.

Library versions are **pinned and dated** in each unit. The web moves faster than any syllabus: when a version note is stale, that discrepancy is itself the lesson — the durable concept survives, the install line does not.

> _"A dependency added is a dependency maintained. Choose wisely."_
> — Tao of Development, `qa-006`

---

## 📊 Assessment at a glance

| Component | Weight |
| --- | --- |
| Pruebas (tests) | 30 % |
| Trabajos, entregables y proyectos | 50 % |
| Portafolio (resolución de problemas) | 20 % |

Behind those institutional weights sits the Atelier rubric — **Technical 40 % / Reflection & Documentation 35 % / Conceptual 25 %** — evidenced through commits, AI-use declarations, and oral defence. Full detail: **[How to Pass This Track]({{ '/tracks/feii/how-to-pass-this-track/' | relative_url }})** and the shared **[AI Declaration & Oral Defence Rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})**.

---

## 🔗 Related

- **[Front-End II track]({{ '/tracks/feii/' | relative_url }})** — course framing, objectives, methodology
- **[Front-End I track]({{ '/tracks/fei/' | relative_url }})** — the prerequisite year
- **[React Teaching Sequence]({{ '/lessons/en/react/' | relative_url }})** — FE I semester 2, the foundation this builds on
- **[AI Practical Guide]({{ '/methodology/en/ai-practical-guide/' | relative_url }})** — when to plan, how to disclose, what you must defend
- **[Architecture Foundations]({{ '/lessons/en/ai-assisted-development/foundations/' | relative_url }})** — RPC, RAG, MVC as discipline
- **[All lessons]({{ '/lessons/en/' | relative_url }})** — the full canonical library

---

> _"To fractalize is human. To know when to stop fractalizing is wisdom."_
> — Tao of Development, `arch-002`
