---
layout: lesson
title: 'Performance: Speed as a Feature'
slug: react-performance
category: react
tags: [react, performance, optimization, memoization, code-splitting]
week: 11
phase: 4
sprint: 12
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/react-performance/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> *"Performance is not an optimization. It is a feature that users feel."*

---

## 🎯 Sprint Goal

**By the end of this sprint**: Your app is fast—both in perceived performance (what users feel) and actual performance (what Lighthouse measures). You'll profile, optimize, and prove the difference.

---

## 📍 Position in Journey

| Sprint | Focus | Your App Grows |
|--------|-------|----------------|
| 10. Auth | Security | User sessions |
| 11. Testing | Quality | Reliable codebase |
| **→ 12. Performance** | Speed | Optimized experience |
| 13. Deployment | Launch | Live on the web |

---

## 🧭 Learning Objectives

By the end of this lesson, you will:

- [ ] Use React DevTools Profiler to find slow renders
- [ ] Apply `React.memo`, `useMemo`, and `useCallback` correctly
- [ ] Implement code splitting with `lazy()` and `Suspense`
- [ ] Optimize images and assets
- [ ] Measure Core Web Vitals and Lighthouse score
- [ ] Understand when NOT to optimize

---

## 🏗️ Performance Checklist

```
┌─────────────────────────────────────────────────────────┐
│              PERFORMANCE PRIORITY                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. PERCEIVED PERFORMANCE (What users feel)              │
│     • Skeleton loading states                            │
│     • Optimistic updates                                 │
│     • Immediate visual feedback                          │
│                                                          │
│  2. BUNDLE SIZE (What ships to browser)                  │
│     • Code splitting by route                            │
│     • Tree shaking (only import what you use)            │
│     • Analyze with bundle analyzer                       │
│                                                          │
│  3. RUNTIME PERFORMANCE (How fast it runs)               │
│     • Minimize unnecessary re-renders                    │
│     • Virtualize long lists                              │
│     • Debounce expensive operations                      │
│                                                          │
│  4. ASSETS (Images, fonts, etc.)                         │
│     • Lazy load images                                   │
│     • Use modern formats (WebP, AVIF)                    │
│     • Optimize font loading                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Optimization Techniques

### Code Splitting

```jsx
// Before: Everything in one bundle
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';

// After: Load on demand
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

// Wrap with Suspense
<Suspense fallback={<PageSkeleton />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
</Suspense>
```

### Memoization (Use Sparingly)

```javascript
// Only memoize when you've PROVEN a performance problem

// For expensive calculations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.price - b.price),
  [items]
);

// For callback stability (when passed to memoized children)
const handleClick = useCallback(
  () => setCount(c => c + 1),
  []
);

// For component re-renders
const MemoizedChild = React.memo(({ data }) => (
  <ExpensiveComponent data={data} />
));
```

---

## 🎓 Methodology: Atelier Practice

### The Sprint Rhythm

```
┌─────────────────────────────────────────────────────────┐
│ DAY 1: Measure First                                    │
│   • Run Lighthouse, record baseline scores              │
│   • Profile with React DevTools                         │
│   • Identify top 3 performance issues                   │
├─────────────────────────────────────────────────────────┤
│ DAY 2: Optimize                                         │
│   • Implement code splitting for routes                 │
│   • Add lazy loading for images                         │
│   • Apply memoization to proven bottlenecks             │
├─────────────────────────────────────────────────────────┤
│ DAY 3: Verify & Document                                │
│   • Re-run Lighthouse, compare before/after             │
│   • Document optimizations in README                    │
│   • Present: What worked? What was premature?           │
└─────────────────────────────────────────────────────────┘
```

### The Golden Rule

> **"Measure, then optimize. Never optimize based on intuition alone."**

---

### AI-Assisted Development Protocol

| Task | AI Role | Your Role |
|------|---------|-----------|
| Analyze Lighthouse report | Explain each metric | Prioritize fixes |
| Suggest optimizations | Propose techniques | Measure before/after |
| Debug performance issues | Explain React render cycle | Apply correct solution |
| Generate lazy imports | Scaffold code splitting | Test loading states |

---

## 📝 Sprint Deliverables

- [ ] **Baseline Lighthouse score** documented
- [ ] **Code splitting** for at least 3 routes
- [ ] **Image optimization** (lazy loading, proper sizing)
- [ ] **Memoization** applied to 1-2 proven bottlenecks
- [ ] **Final Lighthouse score** (aim for 90+ performance)
- [ ] **Before/after comparison** in README
- [ ] **Reflection**: What was the biggest win? What was premature?

---

## 📊 Core Web Vitals

| Metric | What It Measures | Target |
|--------|------------------|--------|
| **LCP** (Largest Contentful Paint) | Loading speed | < 2.5s |
| **FID** (First Input Delay) | Interactivity | < 100ms |
| **CLS** (Cumulative Layout Shift) | Visual stability | < 0.1 |

---

## 🔗 Lesson Navigation

| Previous | Current | Next |
|----------|---------|------|
| [Testing](../react-testing/) | **Performance** | [Deployment](../react-deployment/) |

---

## 📚 Key Concepts Preview

### Performance is a UX contract

- Users feel latency as “brokenness”.
- Performance work must be **measured** (profile first, optimize second).
- Prefer **reducing work** (less rendering, less JS, fewer requests) over micro-optimizations.

### Three practical levers

1) **Rendering**: avoid unnecessary re-renders (stable props, component boundaries).
2) **Loading**: split bundles, defer non-critical code, optimize images.
3) **Data**: cache server state, avoid refetch storms, handle race conditions.

### Example: “don’t memoize blindly”

```javascript
// ✅ Memoize ONLY when you measured re-render cost.
const expensive = useMemo(() => compute(data), [data]);

// ❌ This often makes code harder without measurable benefit:
const onClick = useCallback(() => setOpen(true), []);
```

### Reflection (Atelier)

> 💭 _Which metric did you improve? What evidence do you have (before/after)?_

> 💭 _What “optimization” made your code worse? Why?_

### Koan

> _"The profiler is the mirror. Without it, you polish shadows."_

---

> *"The fastest code is the code that doesn't run. The fastest component is the one that doesn't re-render."*
