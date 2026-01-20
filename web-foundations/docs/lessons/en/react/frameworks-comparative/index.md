---
layout: lesson
title: 'Framework Fundamentals: A Critical Comparison'
slug: frameworks-comparative
category: react
tags: [react, vue, vanilla-js, frameworks, vite]
week: 2
phase: 1
sprint: 2
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/frameworks-comparative/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> *"All codebases beat at different tempos. Some in allegro, some in adagio, some in panic."*
> — The Tao of Development

---

## Course Overview

| Aspect | Details |
|--------|---------|
| **Duration** | 2 sessions × 2 hours = 4 hours total |
| **Methodology** | Atelier crítico: theory + practice + reflection |

### Learning Objectives

**Session 1**:
- Explain what frameworks are and why they exist
- Identify key characteristics (components, reactivity)
- Apply selection criteria for different project types
- Set up development environment with Vite

**Session 2**:
- Build the same app in Vanilla JS, React, and Vue
- Compare developer experience across stacks
- Make informed technology decisions based on evidence

---

## Session 1: Theory & Context

### 1.1 What Is a Framework? (15 min)

A **front-end framework** provides tools, patterns, and conventions for building user interfaces.

```
LIBRARY (React)           FRAMEWORK (Angular)
─────────────────         ────────────────────
You call the library.     The framework calls you.
You decide structure.     Structure is provided.
Assemble your own stack.  Batteries included.
```

#### The Landscape

| Category | Examples |
|----------|----------|
| **Full Frameworks** | Angular, Ember, Next.js |
| **UI Libraries** | React, Vue, Solid, Svelte |
| **No Framework** | Vanilla JS, Alpine.js, htmx |

#### Historical Evolution

```
2005    jQuery: DOM manipulation made easier
2013    React: Component model + Virtual DOM
2014    Vue: Progressive framework
2016    Angular 2+: TypeScript-first
2019    Svelte: Compile-time reactivity
2020+   Signals, Islands, Server Components...
```

---

### 1.2 Key Framework Characteristics (25 min)

#### 🧩 Component Architecture

```
              <App>
             /     \
        <Header>   <Main>
           │       /    \
        <Nav>   <List>  <Detail>
```

#### ⚡ Reactivity

When data changes, UI updates automatically—no manual DOM manipulation.

#### 🗺️ Routing

Navigate without full page reloads (SPA).

#### 🗃️ State Management

| Pattern | Library |
|---------|---------|
| Centralized store | Redux, Vuex |
| Atomic state | Recoil, Jotai |
| Context-based | React Context |

---

### 1.3 Framework Selection Criteria (20 min)

| Factor | Questions to Ask |
|--------|------------------|
| **Project Size** | Small landing page or large SPA? |
| **Team Experience** | What does the team already know? |
| **Ecosystem** | Libraries/plugins needed? |
| **Maintainability** | Will new developers join later? |

#### Quick Guide

| Use Case | Recommendation |
|----------|----------------|
| Small static sites | Vanilla JS |
| Large apps, complex state | React |
| Quick MVP, learning | Vue |
| Enterprise, full structure | Angular |

> 🧘 **Koan**: *"Write code for humans first, computers second."*

---

### 1.4 Demo: Same Counter, Three Ways (30 min)

#### Vanilla JavaScript

```html
<button id="btn">
  Contador: <span id="count">0</span>
</button>
<script>
  let count = 0;
  document.getElementById('btn').addEventListener('click', () => {
    count++;
    document.getElementById('count').textContent = count;
  });
</script>
```

#### React

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Contador: {count}
    </button>
  );
}
```

#### Vue 3

```vue
<template>
  <button @click="count++">Contador: {{ count }}</button>
</template>
<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>
```

#### Comparison

| Criterion | Vanilla | React | Vue |
|-----------|---------|-------|-----|
| Build required | No | Yes | Yes |
| Learning curve | Low | Medium | Low-Medium |
| Ecosystem | Native | Massive | Growing |

---

### 1.5 Introduction to Vite (15 min)

**Vite** = modern, fast build tool.

```bash
# Create project
npm create vite@latest my-project -- --template react
cd my-project
npm install
npm run dev
```

**Why Vite?**
- Near-instant dev server (<1s vs 30s+ for Webpack)
- Hot Module Replacement
- Minimal configuration

---

## Session 2: Comparative Practice

### 2.1 Team Rotation Structure (10 min)

```
Teams of 3 students, rotating roles:
• Implementer: writes code
• Integrator: reviews, tests
• Documentor: README, notes

Sprint 1 (20 min): Vanilla JS
Sprint 2 (20 min): React
Sprint 3 (20 min): Vue
```

---

### 2.2 The Challenge: Build a To-Do App (60 min)

#### Requirements

- Add a task (text input + button)
- Display list of tasks
- Mark task as complete (toggle)
- Delete a task

#### This Exercises

| Concept | How It Appears |
|---------|----------------|
| State management | The task list is state |
| User input | Form handling |
| List rendering | Iterate over array |
| CRUD operations | Create, Read, Update, Delete |

---

### 2.3 Presentation and Reflection (15 min)

Each team presents (3 min):
1. **Demo**: Show working app
2. **Challenge**: Hardest part?
3. **Comparison**: Which felt most natural?

> 🧘 **Koan**: *"Experience is simply the name we give to our bugs after we fix them."*

---

## Framework Decision Matrix

| Criterion | Vanilla | React | Vue |
|-----------|---------|-------|-----|
| Project size (1=small) | 5 | 2 | 3 |
| Learning curve (1=easy) | 5 | 2 | 4 |
| Ecosystem (5=vast) | 2 | 5 | 4 |
| Long-term maintenance | 2 | 5 | 4 |

---

## Key Takeaways

> **There is no best framework—only the best framework for your context.**

| If you value... | Consider... |
|-----------------|-------------|
| Maximum control | Vanilla JS |
| Massive ecosystem | React |
| Gentle learning curve | Vue |

---

## References

- [React Documentation](https://react.dev)
- [Vue.js Documentation](https://vuejs.org)
- [Vite Documentation](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)

---

## 🔗 Lesson Navigation

| Previous | Current | Next |
|----------|---------|------|
| [React Overview](../) | **Frameworks Comparative** | [State & UI](../state-and-ui/) |

---

> *"The master developer does not force the scroll—they channel its flow."*
