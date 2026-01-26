---
layout: lesson
title: 'Routing & Navigation: The Multi-Page SPA'
slug: react-routing
category: react
tags: [react, routing, react-router, navigation, spa]
week: 7
phase: 2
sprint: 8
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/react-routing/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> *"Routing is the art of making many pages feel like one app."*

---

## 🎯 Sprint Goal

**By the end of this sprint**: Transform your app into a full multi-page experience with clean URLs, protected routes, and smooth navigation—while remaining a single-page application.

---

## 📍 Position in Journey

| Sprint | Focus | Your App Grows |
|--------|-------|----------------|
| 5. Fundamentals | Components, JSX, Props | Component library skeleton |
| 6. Hooks | State & effects | Interactive components |
| 7. Architecture | Global state | Connected features |
| **→ 8. Routing** | Navigation | Multi-page structure |

---

## 🧭 Learning Objectives

By the end of this lesson, you will:

- [ ] Set up React Router v6 in your project
- [ ] Create declarative routes with `<Routes>` and `<Route>`
- [ ] Navigate programmatically with `useNavigate`
- [ ] Read URL parameters with `useParams` and `useSearchParams`
- [ ] Implement nested routes and layouts with `<Outlet>`
- [ ] Protect routes based on authentication state

---

## 🏗️ What We'll Build This Sprint

### Route Structure for Your App

```typescript
// Example route structure:

<Routes>
  {/* Public routes */}
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="products" element={<ProductList />} />
    <Route path="products/:id" element={<ProductDetail />} />
  </Route>

  {/* Auth routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/settings" element={<Settings />} />
  </Route>

  {/* Catch-all */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 🔧 Integration Points

| Data Source | Routing Integration |
|-------------|---------------------|
| **Laravel API** | Dynamic routes from API (e.g., `/products/:slug`) |
| **Hygraph CMS** | Content-driven routes (blog posts, pages) |
| **Auth State** | Protected routes check AuthContext |

### URL as State

```typescript
// Filters in URL = shareable, bookmarkable UI state

// Instead of:
const [filter, setFilter] = useState('all');

// Use:
const [searchParams, setSearchParams] = useSearchParams();
const filter = searchParams.get('filter') || 'all';

// URL: /products?filter=electronics&sort=price
```

---

## 🎓 Methodology: Atelier Practice

### The Sprint Rhythm

```
┌─────────────────────────────────────────────────────────┐
│ DAY 1: Basic Routing                                    │
│   • Set up React Router in your project                 │
│   • Create public routes and layouts                    │
│   • Practice: Navigation between your existing pages    │
├─────────────────────────────────────────────────────────┤
│ DAY 2: Dynamic & Protected Routes                       │
│   • Build product/article detail pages with useParams   │
│   • Implement ProtectedRoute wrapper                    │
│   • Wire to your AuthContext from Sprint 7              │
├─────────────────────────────────────────────────────────┤
│ DAY 3: Polish & Edge Cases                              │
│   • Add loading states during navigation                │
│   • Handle 404 with a beautiful NotFound page           │
│   • Test: Can users deep-link? Bookmark? Refresh?       │
└─────────────────────────────────────────────────────────┘
```

### AI-Assisted Development Protocol

| Task | AI Role | Your Role |
|------|---------|-----------|
| Generate route structure | Propose based on your app | Verify navigation logic |
| Implement ProtectedRoute | Scaffold the wrapper | Test edge cases (no token, expired) |
| Handle nested layouts | Show Outlet pattern | Apply to your structure |
| Debug navigation issues | Explain common pitfalls | Fix and test |

---

## 📝 Sprint Deliverables

- [ ] **5+ routes** covering your app's main pages
- [ ] **Nested layout** with shared header/footer
- [ ] **Dynamic route** with URL parameter (e.g., `:id`)
- [ ] **Protected route** requiring authentication
- [ ] **404 page** with helpful navigation
- [ ] **URL-based filtering** on at least one list page
- [ ] **Reflection**: How does URL state change your UX thinking?

---

## 🔗 Lesson Navigation

| Previous | Current | Next |
|----------|---------|------|
| [State Architecture](../react-state-architecture/) | **Routing** | [Backend Integration](../react-backend-integration/) |

---

## 📚 Key Concepts Preview

### URL state is real state

- Filters, pagination, and selected entities often belong in the **URL**.
- Treat the URL as a **shareable snapshot** of app state.

### Practical patterns

- **Nested layouts**: keep nav + shell stable while pages change
- **Protected routes**: authorization gate, not just “redirect magic”
- **Search params**: the simplest persistence for filters

### Example: filters as URL state (conceptual)

```ts
// Example state you can encode in the URL:
// /products?query=shoes&sort=price&page=2
```

### Reflection (Atelier)

> 💭 _Which state should be shareable via link? Which state should not? Why?_

> 💭 _What breaks when you refresh the page? What does that reveal about your architecture?_

### Koan

> _"If the URL lies, the user will not return."_

---

> *"A URL is a promise to the user: this address will always show this content."*
