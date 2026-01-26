---
layout: lesson
title: 'State Architecture: Scaling Beyond Components'
slug: react-state-architecture
category: react
tags: [react, state, context, zustand, redux, useReducer]
week: 6
phase: 2
sprint: 7
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/react-state-architecture/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> *"When state grows beyond a component, architecture becomes your ally or your enemy."*

---

## 🎯 Sprint Goal

**By the end of this sprint**: Implement a scalable state architecture that enables features across your app to communicate—whether that's a shopping cart, auth status, or theme settings.

---

## 📍 Position in Journey

| Sprint | Focus | Your App Grows |
|--------|-------|----------------|
| 5. Fundamentals | Components, JSX, Props | Component library skeleton |
| 6. Hooks | State & effects | Interactive components |
| **→ 7. Architecture** | Global state | Connected features |
| 8. Routing | Navigation | Multi-page structure |

---

## 🧭 Learning Objectives

By the end of this lesson, you will:

- [ ] Decide when local state isn't enough
- [ ] Implement `useReducer` for complex state logic
- [ ] Share state via React Context
- [ ] Integrate Zustand for lightweight global state
- [ ] Understand Redux patterns (conceptually)
- [ ] Structure your app's state by domain

---

## 🏗️ What We'll Build This Sprint

### State Domains for Your App

```typescript
// Organize state by domain:

src/
├── store/
│   ├── auth/           // User session, tokens
│   │   ├── AuthContext.tsx
│   │   └── useAuth.ts
│   ├── cart/           // Shopping cart (if applicable)
│   │   └── useCartStore.ts  // Zustand
│   ├── theme/          // Dark/light mode
│   │   └── ThemeContext.tsx
│   └── ui/             // Modals, sidebars, toasts
│       └── useUIStore.ts
```

---

## 🔧 Integration Points

| Data Source | State Layer |
|-------------|-------------|
| **Laravel API** | Auth tokens in Context, fetched data in React Query |
| **Hygraph CMS** | CMS content cached by React Query, UI state local |
| **Local Storage** | Persisted Zustand store (theme, preferences) |

### The State Decision Tree

```
Is this state...
│
├─→ Used by 1-2 nearby components?
│   └─→ useState + prop drilling ✓
│
├─→ Complex with many actions?
│   └─→ useReducer ✓
│
├─→ Needed by distant components?
│   ├─→ Small/simple? → Context ✓
│   └─→ Large/complex? → Zustand/Redux ✓
│
└─→ From a server?
    └─→ React Query (next sprint) ✓
```

---

## 🎓 Methodology: Atelier Practice

### The Sprint Rhythm

```
┌─────────────────────────────────────────────────────────┐
│ DAY 1: Context & Reducers                               │
│   • Build AuthContext together (login/logout/user)      │
│   • Practice: Refactor a complex useState to useReducer │
│   • Discussion: When does local state become global?    │
├─────────────────────────────────────────────────────────┤
│ DAY 2: Zustand Workshop                                 │
│   • Live coding: Create a cart store with Zustand       │
│   • Teams: Implement 1-2 stores for your app's domains  │
│   • AI Practice: Generate actions/selectors             │
├─────────────────────────────────────────────────────────┤
│ DAY 3: Architecture Review                              │
│   • Each team presents their state architecture         │
│   • Peer critique: Is this over-engineered? Under?      │
│   • Refactor based on feedback                          │
└─────────────────────────────────────────────────────────┘
```

### AI-Assisted Development Protocol

| Task | AI Role | Your Role |
|------|---------|-----------|
| Design state shape | Propose structure | Evaluate for your domain |
| Generate reducer actions | Scaffold switch cases | Ensure immutability |
| Debug context re-renders | Explain the problem | Apply memoization |
| Compare libraries | List pros/cons | Decide for your project |

---

## 📝 Sprint Deliverables

- [ ] **AuthContext** with login/logout/user state
- [ ] **1 Zustand store** for a feature (cart, preferences, etc.)
- [ ] **useReducer** for at least one complex component
- [ ] **State architecture diagram** in your README
- [ ] **Persistence** to localStorage for at least one store
- [ ] **Reflection**: What patterns emerged? What would you change?

---

## 🔗 Lesson Navigation

| Previous | Current | Next |
|----------|---------|------|
| [Hooks Mastery](../react-hooks/) | **State Architecture** | [Routing](../react-routing/) |

---

## 📚 Key Concepts Preview

### The State Locality Principle

Keep state as **close as possible** to where it’s used. Move it “up” only when:

- multiple siblings need it
- you must persist/share it
- URL needs to represent it

### Three tools, three jobs

- **`useReducer`**: complex local transitions (FSM-like)
- **Context**: dependency injection for shared state
- **Store (Zustand/Redux)**: shared state with selectors + devtools

### Example: model state transitions explicitly

```ts
type CartAction =
  | { type: 'ADD'; id: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' };
```

### Reflection (Atelier)

> 💭 _Which state did you move too early? What complexity did it add?_

> 💭 _What invariant should your global state always respect?_

### Koan

> _"If your state has no home, it will haunt every component."_

---

> *"The best architecture is the simplest one that solves your problem. No simpler, no more complex."*
