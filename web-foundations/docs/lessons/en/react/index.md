---
layout: lesson
title: 'Modern Frontend Development: React Teaching Sequence'
slug: react
category: react
tags: [react, curriculum, overview]
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->


> _"The journey of a thousand apps begins with a single commit."_

---

## 🎯 Curriculum Overview

This teaching sequence guides students from philosophical foundations through React mastery, preparing them for autonomous, critical development in the age of AI-assisted programming.

### The Learning Arc

```
┌─────────────────────────────────────────────────────────┐
│                    SEMESTER ARC                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  PHASE 1: FOUNDATIONS (Weeks 1-3)                        │
│  ══════════════════════════════                          │
│  1. Philosophy & Vision ──► Why we code critically       │
│  2. Frameworks Comparison ► Choose tools with intent     │
│  3. State & UI ──────────► The core of interactivity     │
│  4. AI-Assisted Dev ─────► Use AI as a collaborator      │
│                                                          │
│  PHASE 2: REACT DEEP DIVE (Weeks 4-7)                    │
│  ═════════════════════════════════                       │
│  5. React Fundamentals ──► Components, props, events     │
│  6. Hooks Mastery ───────► useState, useEffect, custom   │
│  7. State Architecture ──► Context, reducers, patterns   │
│  8. Routing & Navigation ► React Router, protected routes│
│                                                          │
│  PHASE 3: INTEGRATION (Weeks 8-10)                       │
│  ══════════════════════════════                          │
│  9. Backend Integration ─► Fetch, React Query, APIs      │
│  10. Authentication ─────► JWT, sessions, security       │
│  11. Testing ────────────► Vitest, RTL, Cypress          │
│                                                          │
│  PHASE 4: MASTERY (Weeks 11-12)                          │
│  ═══════════════════════════                             │
│  12. Performance ────────► Memoization, code splitting   │
│  13. Deployment ─────────► Vercel, CI/CD, environment    │
│  14. Presentation ───────► Demo day, monograph           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📖 Phase 1: Foundations

### Lesson 1: Philosophy & Pedagogical Vision

**File**: [`modern-fe-intro`](./modern-fe-intro/)

| Aspect           | Details                                            |
| ---------------- | -------------------------------------------------- |
| **Duration**     | 3 hours                                            |
| **Core Concept** | The Tao Developer mindset                          |
| **Key Outcomes** | Understand atelier model, 5 pillars, project ideas |

**What Students Learn**:

- Why "Critical Coding for a Better Living" matters
- The Five Pillars: Mastery, Autonomy, Ethics, Simplicity, Future
- How to evaluate project ideas
- Semester structure and expectations

**Connection to Next Lesson**: Having established _why_ we code critically, we now explore _what tools_ to use.

---

### Lesson 2: Framework Fundamentals

**File**: [`frameworks-comparative`](./frameworks-comparative/)

| Aspect           | Details                                                    |
| ---------------- | ---------------------------------------------------------- |
| **Duration**     | 4 hours (2 sessions)                                       |
| **Core Concept** | Informed technology selection                              |
| **Key Outcomes** | Build same app in Vanilla/React/Vue, articulate trade-offs |

**What Students Learn**:

- What frameworks are and why they exist
- React vs Vue vs Vanilla: hands-on comparison
- Decision matrix for technology selection
- Vite setup and modern tooling

**Connection to Next Lesson**: With framework landscape understood, we dive deep into _state_—the heart of interactivity.

---

### Lesson 3: State & UI

**File**: [`state-and-ui`](./state-and-ui/)

| Aspect           | Details                                              |
| ---------------- | ---------------------------------------------------- |
| **Duration**     | 3 hours                                              |
| **Core Concept** | State as memory of interaction                       |
| **Key Outcomes** | Model UI as FSM, identify antipatterns, choose tools |

**What Students Learn**:

- Formal (FSM) and practical (UI) definitions of state
- The state taxonomy (UI, form, server, URL, shared)
- Statecharts for complex flows
- Antipatterns: derived state, boolean explosion, stale closures

**Connection to Next Lesson**: Understanding state prepares us for AI-assisted development, where validation replaces certainty.

---

### Lesson 4: AI-Assisted Development Foundations

**File**: [`ai-assisted-development-foundations`](./ai-assisted-development-foundations/)

| Aspect           | Details                                                  |
| ---------------- | -------------------------------------------------------- |
| **Duration**     | 2 hours                                                  |
| **Core Concept** | AI as collaborator, not replacement                      |
| **Key Outcomes** | Map AI to architecture patterns, understand trust models |

**What Students Learn**:

- LLMs as probabilistic reasoning engines
- Classical architecture (contracts, decomposition, security)
- Connecting AI to MVC/MVVM patterns
- Observability and human-in-the-loop design

**Connection to Next Phase**: With foundations solid, we now build fluency in React itself.

---

## 📖 Phase 2: React Deep Dive

### Lesson 5: React Fundamentals (Coming Next)

**Suggested File**: `react-fundamentals.md`

| Topic               | Content                            |
| ------------------- | ---------------------------------- |
| **Component Model** | Function components, JSX syntax    |
| **Props**           | Passing data, prop types, children |
| **Events**          | Handling clicks, forms, keyboard   |
| **Rendering**       | Conditional, lists, keys           |
| **Project Setup**   | Vite + React          |

**Hands-On**: Build a component library with `Button`, `Card`, `Input`, `Modal`.

---

### Lesson 6: Hooks Mastery

**Suggested File**: `react-hooks.md`

| Topic                   | Content                                  |
| ----------------------- | ---------------------------------------- |
| **useState**            | Local state, updates, functional updates |
| **useEffect**           | Side effects, cleanup, dependencies      |
| **useRef**              | DOM refs, mutable values                 |
| **useMemo/useCallback** | Performance optimization                 |
| **Custom Hooks**        | Extracting reusable logic                |

**Hands-On**: Build custom hooks: `useFetch`, `useLocalStorage`, `useDebounce`.

---

### Lesson 7: State Architecture

**Suggested File**: `react-state-architecture.md`

| Topic                  | Content                            |
| ---------------------- | ---------------------------------- |
| **useReducer**         | Complex state logic, actions       |
| **Context API**        | Sharing state across tree          |
| **External Libraries** | Zustand, Redux Toolkit             |
| **When to Use What**   | Decision tree for state management |

**Hands-On**: Build a shopping cart with context + reducer.

---

### Lesson 8: Routing & Navigation

**Suggested File**: `react-routing.md`

| Topic                | Content                   |
| -------------------- | ------------------------- |
| **React Router v6**  | Routes, Link, useNavigate |
| **Dynamic Routes**   | URL parameters, useParams |
| **Nested Routes**    | Layouts, Outlet           |
| **Protected Routes** | Auth guards, redirects    |

**Hands-On**: Multi-page app with auth-protected dashboard.

---

## 📖 Phase 3: Integration

### Lesson 9: Backend Integration

**Suggested File**: `react-backend-integration.md`

| Topic              | Content                         |
| ------------------ | ------------------------------- |
| **Fetch API**      | GET, POST, error handling       |
| **Async Patterns** | Loading states, race conditions |
| **React Query**    | Caching, refetching, mutations  |
| **GraphQL**        | Optional: Apollo basics         |

---

### Lesson 10: Authentication

**Suggested File**: `react-authentication.md`

| Topic              | Content                          |
| ------------------ | -------------------------------- |
| **Auth Concepts**  | JWT, sessions, OAuth             |
| **Implementation** | Login forms, token storage       |
| **Security**       | httpOnly cookies, XSS prevention |
| **Third-Party**    | Firebase Auth, Auth0             |

---

### Lesson 11: Testing

**Suggested File**: `react-testing.md`

| Topic                 | Content                        |
| --------------------- | ------------------------------ |
| **Unit Testing**      | Vitest, testing pure functions |
| **Component Testing** | React Testing Library          |
| **Integration**       | Testing with mocked APIs       |
| **E2E**               | Cypress basics                 |

---

## 📖 Phase 4: Mastery

### Lesson 12: Performance

**Suggested File**: `react-performance.md`

| Topic               | Content                          |
| ------------------- | -------------------------------- |
| **React DevTools**  | Profiler, component highlighting |
| **Memoization**     | React.memo, useMemo, useCallback |
| **Code Splitting**  | lazy(), Suspense                 |
| **Bundle Analysis** | Understanding what ships         |

---

### Lesson 13: Deployment

**Suggested File**: `react-deployment.md`

| Topic                     | Content               |
| ------------------------- | --------------------- |
| **Build Process**         | Vite production build |
| **Vercel/Netlify**        | Deploy from GitHub    |
| **Environment Variables** | Secrets management    |
| **CI/CD**                 | GitHub Actions basics |

---

### Lesson 14: Final Presentation

| Component              | Weight |
| ---------------------- | ------ |
| Working application    | 40%    |
| Live demo              | 15%    |
| Technical presentation | 15%    |
| Monograph              | 20%    |
| Reflection quality     | 10%    |

---

## 🗺️ Lesson Dependency Graph

```
                    ┌─────────────────┐
                    │  1. Philosophy  │
                    │  modern-fe-intro│
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  2. Frameworks  │
                    │   comparative   │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                              ▼
    ┌─────────────────┐            ┌─────────────────┐
    │   3. State/UI   │            │ 4. AI-Assisted  │
    │    extended     │            │   foundations   │
    └────────┬────────┘            └────────┬────────┘
             │                              │
             └──────────────┬───────────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │  5. React       │
                   │  Fundamentals   │
                   └────────┬────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
    ┌───────────┐   ┌───────────┐   ┌───────────┐
    │ 6. Hooks  │   │ 7. State  │   │ 8.Routing │
    │  Mastery  │   │   Arch    │   │           │
    └─────┬─────┘   └─────┬─────┘   └─────┬─────┘
          │               │               │
          └───────────────┼───────────────┘
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
    ┌───────────┐ ┌───────────┐ ┌───────────┐
    │9. Backend │ │10. Auth   │ │11. Testing│
    └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
          │             │             │
          └─────────────┼─────────────┘
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
      ┌───────────┐       ┌───────────┐
      │12. Perf   │       │13. Deploy │
      └─────┬─────┘       └─────┬─────┘
            │                   │
            └─────────┬─────────┘
                      ▼
              ┌───────────────┐
              │ 14. Final     │
              │ Presentation  │
              └───────────────┘
```

---

## 📋 Lesson Template

Use this template when creating new lessons:

```markdown
# [Emoji] [Lesson Title]

> _"Inspirational quote"_

---

## 📜 Table of Contents

[Generated from headers]

---

## Learning Objectives

By the end of this lesson, you will be able to:

- [ ] Objective 1 (Bloom's level: Understand/Apply/Analyze/Evaluate/Create)
- [ ] Objective 2
- [ ] Objective 3

---

## Prerequisite Knowledge

| Concept    | Where It's Covered |
| ---------- | ------------------ |
| [Prereq 1] | [Lesson link]      |
| [Prereq 2] | [Lesson link]      |

---

## [Main Content Sections]

...

---

## Hands-On Activities

### 🔬 Activity 1: [Name]

**Task**: ...
**Deliverable**: ...

---

## Reflection Questions

> 💭 _[Question 1]_
> 💭 _[Question 2]_

---

## Key Takeaways

- Takeaway 1
- Takeaway 2
- Takeaway 3

---

## References

- [Documentation links]
- [Articles]
- [Books]

---

## 🔗 Lesson Navigation

| Previous                    | Current            | Next                                                |
| --------------------------- | ------------------ | --------------------------------------------------- |
| [All Lessons](/lessons/en/) | **React Overview** | [Frameworks Comparative](./frameworks-comparative/) |

---

## 🎓 Assessment Alignment

| Lesson             | Assessment Type            | Weight |
| ------------------ | -------------------------- | ------ |
| 1-4 (Foundations)  | Participation + Reflection | 10%    |
| 5-8 (React Core)   | Component Challenges       | 20%    |
| 9-11 (Integration) | Feature Implementation     | 25%    |
| 12-13 (Mastery)    | Code Review + Optimization | 15%    |
| 14 (Final)         | Demo + Monograph           | 30%    |

---

## ✅ Completion Checklist

### Phase 1: Foundations ✓

- [x] `modern-fe-intro` — Philosophy & Vision
- [x] `frameworks-comparative` — Framework Comparison
- [x] `state-and-ui` — State & UI
- [x] `ai-assisted-development-foundations` — AI Theory & Architecture

### 📘 Reference Guides

- [x] `ai-practical-guide.md` — **The Docs-First Methodology** (prompts, reports, MCP, workflows)

### Phase 2-4: React + Integration (Skeletons Ready for Iteration)

- [x] `react-fundamentals` — Components, JSX, props
- [x] `react-hooks` — useState, useEffect, custom
- [x] `react-state-architecture` — Context, reducers, Zustand
- [x] `react-routing` — React Router, protected routes
- [x] `react-backend-integration` — Laravel/Hygraph, React Query
- [x] `react-authentication` — Auth patterns, security
- [x] `react-testing` — Vitest, RTL, Cypress
- [x] `react-performance` — Optimization, Lighthouse
- [x] `react-deployment` — Shipping to production
- [x] `final-presentation` — Demo Day & Monograph
- [x] `react-deployment.md` — Vercel, CI/CD

### All 14 curriculum files created! 🎉

---

> _"The next generation of Tao developers will code critically and autonomously, for a better living at the edge of AI-assisted programming."_
```
