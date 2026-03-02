---
layout: lesson
title: 'Backend Integration: Connecting to the Real World'
slug: react-backend-integration
category: react
tags: [react, fetch, api, react-query, laravel, hygraph]
week: 8
phase: 3
sprint: 9
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/react-backend-integration/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> *"A frontend without a backend is a painting without a gallery—beautiful, but unseen."*

---

## 🎯 Sprint Goal

**By the end of this sprint**: Your app talks to real data sources—fetching, caching, and mutating data from Laravel APIs, Hygraph CMS, or other backends with professional-grade patterns.

---

## 📍 Position in Journey

| Sprint | Focus | Your App Grows |
|--------|-------|----------------|
| 7. Architecture | Global state | Connected features |
| 8. Routing | Navigation | Multi-page structure |
| **→ 9. Backend** | Data fetching | Real data, real app |
| 10. Auth | Security | User sessions |

---

## 🧭 Learning Objectives

By the end of this lesson, you will:

- [ ] Fetch data with the Fetch API and async/await
- [ ] Handle loading, error, and empty states elegantly
- [ ] Implement React Query for caching and sync
- [ ] Perform mutations (POST, PUT, DELETE) and optimistic updates
- [ ] Integrate with Laravel REST API endpoints
- [ ] (Optional) Query Hygraph GraphQL API

---

## 🏗️ What We'll Build This Sprint

### API Layer Architecture

```text
// Clean separation of concerns:

src/
├── api/
│   ├── client.js         // Axios or fetch wrapper
│   ├── endpoints.js      // URL constants
├── hooks/
│   ├── useProducts.js    // React Query for products
│   ├── useUser.js        // React Query for user
│   └── useMutations.js   // Create, update, delete
└── components/
    └── ProductList.jsx  // Uses useProducts hook
```

---

## 🔧 Integration Options

Choose one or more based on your project:

### Option A: Laravel REST API

```javascript
// Typical Laravel endpoints
const API = {
  products: '/api/products',
  product: (id) => `/api/products/${id}`,
  auth: '/api/auth/login',
  user: '/api/user',
};

// React Query usage
const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: () => fetch(API.products).then(r => r.json())
});
```

### Option B: Hygraph GraphQL

```javascript
// GraphQL query
const PRODUCTS_QUERY = `
  query Products {
    products {
      id
      name
      price
      image { url }
    }
  }
`;

// Fetch from Hygraph
const { data } = useQuery({
  queryKey: ['products'],
  queryFn: () => hygraphClient.request(PRODUCTS_QUERY)
});
```

### Option C: Local JSON / Mock API

```javascript
// For development without backend
const { data } = useQuery({
  queryKey: ['products'],
  queryFn: () => import('./data/products.json')
});
```

---

## 🎓 Methodology: Atelier Practice

### The Sprint Rhythm

```
┌─────────────────────────────────────────────────────────┐
│ DAY 1: Fetching Fundamentals                            │
│   • Set up API client (Axios or fetch wrapper)          │
│   • Basic useQuery pattern with React Query             │
│   • Loading/error states in UI                          │
├─────────────────────────────────────────────────────────┤
│ DAY 2: Mutations & Real Data                            │
│   • Connect to Laravel API (coordinate with backend)    │
│   • Implement useMutation for create/update/delete      │
│   • Optimistic updates for snappy UX                    │
├─────────────────────────────────────────────────────────┤
│ DAY 3: Caching & Edge Cases                             │
│   • Configure cache times and stale-while-revalidate    │
│   • Handle offline states (optional)                    │
│   • Error boundaries for failed requests                │
└─────────────────────────────────────────────────────────┘
```

### AI-Assisted Development Protocol

| Task | AI Role | Your Role |
|------|---------|-----------|
| Debug API errors | Explain CORS, 401, 500 | Fix config and retry |
| Generate API types | Infer from JSON response | Validate and refine |
| Write loading states | Suggest skeleton/spinner | Match your design system |
| Optimize queries | Suggest caching strategy | Test invalidation |

---

## 📝 Sprint Deliverables

- [ ] **API client** configured with base URL and auth headers
- [ ] **3+ data-fetching hooks** using React Query
- [ ] **Loading states** with skeletons or spinners
- [ ] **Error handling** with user-friendly messages
- [ ] **1 mutation** (create, update, or delete something)
- [ ] **Cache invalidation** after mutations
- [ ] **Reflection**: How does async data change your app's feel?

---

## 🔗 Lesson Navigation

| Previous | Current | Next |
|----------|---------|------|
| [Routing](../react-routing/) | **Backend Integration** | [Authentication](../react-authentication/) |

---

## 📚 Key Concepts Preview

### Separate “server state” from “UI state”

- **Server state**: remote, async, cached, can be stale.
- **UI state**: local, immediate, ephemeral (modals, filters, form input).

### Practical baseline (student projects)

- A single “API client” module (timeouts, error normalization)
- React Query for caching + refetching + mutations
- Clear loading/error/empty UI for every data view

### Example: normalize errors at the boundary

```javascript
export async function apiGet(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return await res.json();
}
```

### Reflection (Atelier)

> 💭 _Where did you mix UI state with server state? What bug did it create?_

> 💭 _What does “optimistic update” assume about reality? When is it unethical (misleading UI)?_

### Koan

> _"Cache is memory. Memory must be questioned."_

---

> *"Real data is messy. Your job is to make it feel clean."*
