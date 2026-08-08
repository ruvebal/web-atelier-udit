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
status: complete
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"You already built interfaces. Now you build systems of them."_

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

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

## 📚 Recommended Reading

- **Astro Documentation** — Get familiar with islands architecture before unit 2
- **PWA Specification** — Preview unit 4 concepts (Progressive Web Apps fundamentals)
- **Testing Pyramid** — Martin Fowler's testing strategy (context for units 5–6)
- **Performance Budgets** — Performance budgets and Core Web Vitals (context for unit 7)

---

## ✅ Session Outcome

By the end of this orientation, you should:

- Understand why FE II focuses on **systems of interfaces** rather than single interfaces
- Have a mental model of the 12-unit arc and how it builds on your React foundation
- Be ready to dive into **Astro meta-framework architecture** in units 2–3
- See the durable-core philosophy in action: frameworks change, principles endure

---

> _"The interface layer expands beyond the browser. Your code should too."_
