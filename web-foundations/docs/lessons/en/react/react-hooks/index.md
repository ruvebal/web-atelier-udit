---
layout: lesson
title: 'Hooks Mastery: The Engine of Interactivity'
slug: react-hooks
category: react
tags: [react, hooks, useState, useEffect, useMemo, useCallback, custom-hooks]
week: 5
phase: 2
sprint: 6
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/react-hooks/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->


> *"A hook is a portal between the declarative world of React and the imperative world of effects."*

---

## 🎯 Sprint Goal

**By the end of this sprint**: Transform your static components into living, breathing interactive elements with state, effects, and reusable logic patterns.

---

## 📍 Position in Journey

| Sprint | Focus | Your App Grows |
|--------|-------|----------------|
| 5. Fundamentals | Components, JSX, Props | Component library skeleton |
| **→ 6. Hooks** | State & effects | Interactive components |
| 7. Architecture | Global state | Connected features |
| 8. Routing | Navigation | Multi-page structure |

---

## 🧭 Learning Objectives

By the end of this lesson, you will:

- [ ] Use `useState` for local component state
- [ ] Master `useEffect` for side effects and cleanup
- [ ] Apply `useRef` for DOM access and mutable values
- [ ] Optimize with `useMemo` and `useCallback`
- [ ] Extract reusable logic into **custom hooks**
- [ ] Avoid common pitfalls (stale closures, infinite loops)

---

## 🏗️ What We'll Build This Sprint

### Custom Hooks for Your App

```javascript
// Hooks you'll create this sprint:

useFetch(url)                 // → { data, loading, error }
useLocalStorage(key)          // → [value, setValue]
useDebounce(value, delay)     // → debouncedValue
useToggle(initial)            // → [state, toggle, setTrue, setFalse]
useForm(initialValues)        // → { values, handleChange, reset }
```

These hooks will **power your entire application**.

---

## 🔧 Integration Points

| Data Source | Hook Usage |
|-------------|------------|
| **Laravel API** | `useFetch` for GET requests, custom `useMutation` for POST |
| **Hygraph CMS** | `useQuery` pattern for GraphQL (Apollo or custom) |
| **Local Storage** | `useLocalStorage` for persistence (theme, preferences) |

### Preview: API Integration Pattern

```javascript
// This sprint's hook...
const { data, loading, error } = useFetch('/api/products');

// ...prepares you for next sprint's React Query
const { data, isLoading, error } = useQuery(['products'], fetchProducts);
```

---

## 🎓 Methodology: Atelier Practice

### The Sprint Rhythm

```
┌─────────────────────────────────────────────────────────┐
│ DAY 1: Core Hooks Deep Dive                             │
│   • useState patterns: primitives, objects, arrays      │
│   • useEffect lifecycle: mount, update, unmount         │
│   • Live debugging: React DevTools, console patterns    │
├─────────────────────────────────────────────────────────┤
│ DAY 2: Custom Hooks Workshop                            │
│   • Build `useFetch` together step by step              │
│   • Teams create 2-3 hooks for their specific app       │
│   • AI Practice: Generate hook tests with Copilot       │
├─────────────────────────────────────────────────────────┤
│ DAY 3: Integration & Polish                             │
│   • Wire hooks to your components from Sprint 5         │
│   • Handle loading/error states in UI                   │
│   • Peer review: Are hooks single-responsibility?       │
└─────────────────────────────────────────────────────────┘
```

### AI-Assisted Development Protocol

#### Concrete AI Prompts for Hooks

```markdown
✅ GOOD PROMPT:
"Create a custom useFetch hook that:
1. Accepts a URL and optional fetch options
2. Returns { data, loading, error, refetch }
3. Handles race conditions (ignore stale requests)
4. Cleans up on unmount
5. Returns an object with data, loading, error and refetch"

❌ BAD PROMPT:
"Make a fetch hook"

✅ VALIDATION PROMPT:
"Review this useEffect for:
1. Missing dependencies that could cause bugs
2. Memory leaks (missing cleanup)
3. Infinite loop risks
4. Race conditions in async operations"

🔍 WHEN NOT TO USE AI:
- Debugging stale closure issues (requires deep understanding)
- Deciding when to use useCallback vs useMemo (performance profiling needed)
- Understanding why useEffect runs twice in dev mode (React fundamentals)
```

| Task | AI Role | Your Role |
|------|---------|-----------|
| Debug useEffect dependency array | Explain the warning | Understand *why* |
| Generate custom hook skeleton | Scaffold basic structure | Add error handling |
| Write hook tests | Draft test cases | Verify edge cases |
| Optimize re-renders | Suggest memoization | Profile before/after |

---

## 💡 Production-Ready Custom Hooks

### Example 1: useFetch Hook (Best Practices)

```javascript
// hooks/useFetch.js
import { useState, useEffect, useRef } from 'react';

export function useFetch(url, options) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  // Track latest request to handle race conditions
  const abortControllerRef = useRef(null);

  const fetchData = async () => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url, {
        ...options,
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Only update if this request wasn't aborted
      if (!abortController.signal.aborted) {
        setState({ data, loading: false, error: null });
      }
    } catch (error) {
      // Ignore abort errors
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  };

  useEffect(() => {
    fetchData();

    // Cleanup: abort request on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url]); // Re-fetch when URL changes

  return { ...state, refetch: fetchData };
}
```

**Usage:**

```jsx
function ProductList() {
  const { data, loading, error, refetch } = useFetch('/api/products');

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  if (!data) return null;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {data.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Example 2: useLocalStorage Hook

```javascript
// hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Get from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter that persists to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function (same API as useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
```

**Usage:**

```jsx
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  );
}
```

### Example 3: useDebounce Hook

```javascript
// hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up the timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel timeout if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

**Usage:**

```jsx
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // This effect only runs when debounced value changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      // Make API call
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

## 🎯 Critical Questions: Atelier Methodology

### On Hook Design

> 💭 **Question 1: The Dependency Array Dilemma**
> 
> Your `useEffect` has 5 dependencies. ESLint warns about missing ones.
> Adding them causes infinite loops. Removing them causes stale data.
> 
> **Reflect:**
> - Is this a sign your effect is doing too much?
> - When should you split one effect into multiple effects?
> - How do you decide between `useCallback` and accepting the re-run?
> - What does this reveal about React's mental model?

> 💭 **Question 2: Custom Hook Abstraction**
> 
> You've extracted `useFetch` but now every component needs slightly different behavior:
> - Component A needs caching
> - Component B needs retry logic
> - Component C needs request cancellation
> 
> **Reflect:**
> - Do you add all features to one hook (bloat)?
> - Do you create 3 separate hooks (duplication)?
> - Do you use composition (hooks calling hooks)?
> - When does a custom hook become a library?

> 💭 **Question 3: The useEffect Escape Hatch**
> 
> React docs say: "You might not need an effect."
> But your AI keeps suggesting useEffect for everything.
> 
> **Reflect:**
> - When is useEffect the wrong tool?
> - What can be done during render instead?
> - How do you recognize "derived state" vs "synchronized state"?
> - Why does React discourage effects?

### On AI-Assisted Development

> 💭 **Question 4: The Stale Closure Trap**
> 
> AI generated this code:
> 
> ```javascript
> useEffect(() => {
>   const interval = setInterval(() => {
>     setCount(count + 1); // BUG: count is stale!
>   }, 1000);
>   return () => clearInterval(interval);
> }, []);
> ```
> 
> It looks correct but doesn't work. AI didn't catch it.
> 
> **Reflect:**
> - Why didn't AI see this bug?
> - How do you develop "closure intuition"?
> - What's the fix? (Hint: functional update)
> - Can you trust AI for async/closure code?

> 💭 **Question 5: Performance Premature Optimization**
> 
> AI suggests wrapping everything in `useMemo` and `useCallback`.
> Your app has 50 memoized values but no measured performance problem.
> 
> **Reflect:**
> - Is this optimization or obfuscation?
> - How do you measure if memoization helped?
> - What's the cost of memoization itself?
> - When should you profile BEFORE optimizing?

### On Atelier Collaboration

> 💭 **Question 6: Hook Patterns Divergence**
> 
> Your team has 3 different fetch hooks:
> - `useFetch` (yours)
> - `useAPI` (teammate A)
> - `useData` (teammate B)
> 
> All do similar things differently.
> 
> **Reflect:**
> - How do you consolidate without hurting feelings?
> - What makes a hook pattern "better"?
> - Should the team standardize, or is diversity okay?
> - How do real teams handle this?

> 💭 **Question 7: The Learning Curve**
> 
> A teammate asks: "Why is my useEffect running twice?"
> You know it's React 18 Strict Mode, but they're frustrated.
> 
> **Reflect:**
> - How do you explain without sounding condescending?
> - What's the pedagogical value of this React behavior?
> - Should beginners learn hooks or start with class components?
> - How do you teach "why" not just "how"?

---

## 📌 Note: Memoization in React vs Other Environments

When you work with **useMemo**, **useCallback**, and **React.memo**, it’s natural to ask: *why does React make us care so much about references?* This note puts React’s design in context.

### Why React Relies on Reference Equality

In JavaScript, equality is **by reference** (`===`). On every re-render, a function or array created during render is a **new** value in memory—same behavior, different reference. To React (and to `React.memo`) that means “props changed,” so the child re-renders. That’s why we use `useCallback` and `useMemo`: not to stop the parent from re-rendering, but to **keep the same reference** when the logical value hasn’t changed, so memoized children don’t receive “new” props and skip unnecessary work.

### How Other Languages and Frameworks Handle It

| Approach | Example | Main idea |
|----------|---------|-----------|
| **Structural equality** | Clojure, Elm, Rust (with equality traits) | Two values that “look the same” are considered equal even if they’re different references. The framework can decide whether to recompute without you manually stabilizing references. |
| **Compiler or runtime tracks dependencies** | Svelte, Vue (`ref`/`computed`), SwiftUI | Svelte analyzes which variables each block uses and generates code that only re-runs when those change—no `useMemo` or `useCallback`. Vue and SwiftUI encapsulate “what this depends on” in a similar way. |
| **Immutable data by default** | Elm, ClojureScript | Data isn’t mutated; equality is usually structural. “Did it change?” is answered by value, not reference, so the “same function, new reference” issue doesn’t arise in the same way. |

### Takeaway

It’s not that “JavaScript is just like that”: React chose an **explicit** model where you control identity (references) and when to optimize. That makes the model very teachable and flexible, but it also forces you to think about references and to use `useCallback`/`useMemo`/`memo` when you want to avoid re-renders or redundant work. In other ecosystems, that concern is often hidden behind structural equality or a compiler/runtime that infers dependencies. Knowing both perspectives helps explain why memoization is part of React’s design, not a quirk of the language.

---

## 📝 Sprint Deliverables

- [ ] **3+ custom hooks** (`useFetch`, `useLocalStorage`, `useDebounce`)
- [ ] **Interactive feature** using useState (e.g., form, toggle)
- [ ] **Cleanup function** in at least one useEffect
- [ ] **Hook tests** for at least `useFetch`
- [ ] **Reflection entry** addressing at least 3 critical questions above
- [ ] **Dependency array audit** - document why each dependency is needed
- [ ] **Peer code review** focusing on hook patterns and potential bugs

---

## 🔗 Lesson Navigation

| Previous | Current | Next |
|----------|---------|------|
| [React Fundamentals](../react-fundamentals/) | **Hooks Mastery** | [State Architecture](../react-state-architecture/) |

---

## 📚 Key Concepts Preview

### Key concepts you should master after this lesson

- **Rules of Hooks**: why ordering matters, what “consistent call sites” means
- **`useState`**: functional updates, derived state avoidance
- **`useEffect`**: sync vs effect, dependency reasoning, cleanup discipline
- **`useRef`**: stable mutable cell (not “state”), escape hatch for integration
- **`useMemo` / `useCallback`**: when and why to memoize; see the [note on memoization vs other environments](#-note-memoization-in-react-vs-other-environments)
- **Custom hooks**: composition, configuration vs specialization trade-offs
- **Testing**: validate behavior, not implementation details

If any of these still feels “magical”, don’t add more hooks—reduce the problem until you can explain it without guessing.

---

> *"Every custom hook is a reusable piece of wisdom, extracted from the chaos of a component."*
