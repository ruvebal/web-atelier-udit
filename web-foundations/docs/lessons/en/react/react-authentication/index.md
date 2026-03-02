---
layout: lesson
title: 'Authentication: Securing Your Application'
slug: react-authentication
category: react
tags: [react, authentication, jwt, security, oauth]
week: 9
phase: 3
sprint: 10
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/react-authentication/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> *"Auth is where security, UX, and architecture collide. Handle with care."*

---

## 🎯 Sprint Goal

**By the end of this sprint**: Implement complete authentication—login, logout, registration, protected routes, and persistent sessions—with security best practices.

---

## 📍 Position in Journey

| Sprint | Focus | Your App Grows |
|--------|-------|----------------|
| 8. Routing | Navigation | Multi-page structure |
| 9. Backend | Data fetching | Real data, real app |
| **→ 10. Auth** | Security | User sessions |
| 11. Testing | Quality | Reliable codebase |

---

## 🧭 Learning Objectives

By the end of this lesson, you will:

- [ ] Understand JWT vs session-based authentication
- [ ] Build login, logout, and registration flows
- [ ] Store tokens securely (and know what's NOT secure)
- [ ] Implement AuthContext with user state
- [ ] Protect routes based on auth status
- [ ] Handle token refresh and expiration

---

## 🏗️ What We'll Build This Sprint

### Auth Architecture

```text
src/
├── auth/
│   ├── AuthContext.jsx      // User state + login/logout
│   ├── AuthProvider.jsx     // Wraps app, checks token
│   ├── useAuth.js           // Consumer hook
│   └── ProtectedRoute.jsx   // Route guard
├── pages/
│   ├── Login.jsx            // Login form
│   ├── Register.jsx         // Registration form
│   └── Profile.jsx          // Protected page
└── api/
    └── auth.js              // Login/logout API calls
```

---

## 🔧 Integration Options

### Option A: Laravel Sanctum (Recommended for Full-Stack)

```javascript
// Laravel Sanctum with cookies (CSRF protected)
await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
const response = await fetch('/api/login', {
  method: 'POST',
  credentials: 'include',
  body: JSON.stringify({ email, password })
});
```

### Option B: JWT with Laravel API

```javascript
// JWT token flow
const { token } = await login(email, password);
localStorage.setItem('token', token); // ⚠️ Not ideal for production

// Attach to requests
headers: { 'Authorization': `Bearer ${token}` }
```

### Option C: Firebase Auth (Quick Setup)

```javascript
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);
const user = result.user;
```

### Option D: OAuth Providers (GitHub, Google)

```javascript
// Redirect flow
window.location.href = '/api/auth/github/redirect';
// Callback handles token exchange
```

---

## ⚠️ Security Critical Points

| ❌ Don't | ✅ Do |
|----------|-------|
| Store JWT in `localStorage` | Use `httpOnly` cookies |
| Trust client-side auth alone | Validate on server every request |
| Log sensitive data | Redact tokens in logs |
| Hardcode secrets | Use environment variables |
| Skip HTTPS | Always HTTPS in production |

---

## 🎓 Methodology: Atelier Practice

### The Sprint Rhythm

```
┌─────────────────────────────────────────────────────────┐
│ DAY 1: Auth Fundamentals                                │
│   • Build AuthProvider and useAuth hook                 │
│   • Create Login form with validation                   │
│   • Test login flow with Laravel or Firebase            │
├─────────────────────────────────────────────────────────┤
│ DAY 2: Complete Auth Flow                               │
│   • Registration with validation                        │
│   • Wire ProtectedRoute to AuthContext                  │
│   • Implement logout and session persistence            │
├─────────────────────────────────────────────────────────┤
│ DAY 3: Security Review                                  │
│   • Peer security audit: find vulnerabilities           │
│   • Handle edge cases: expired token, network error     │
│   • Discussion: What attacks are you protecting against?│
└─────────────────────────────────────────────────────────┘
```

### AI-Assisted Development Protocol

| Task | AI Role | Your Role |
|------|---------|-----------|
| Generate auth forms | Scaffold with validation | Add your UI components |
| Debug 401 errors | Explain token lifecycle | Fix refresh logic |
| Review security | Suggest improvements | Implement with understanding |
| Handle edge cases | Propose error states | Design for user trust |

---

## 📝 Sprint Deliverables

- [ ] **AuthContext** with user state, login, logout, register
- [ ] **Login page** with form validation and error handling
- [ ] **Register page** with password confirmation
- [ ] **Protected routes** redirecting unauthenticated users
- [ ] **Persistent session** (user stays logged in on refresh)
- [ ] **Logout** that clears all auth state
- [ ] **Security checklist** reviewed with peer team
- [ ] **Reflection**: What are the trade-offs of your auth approach?

---

## 🔗 Lesson Navigation

| Previous | Current | Next |
|----------|---------|------|
| [Backend Integration](../react-backend-integration/) | **Authentication** | [Testing](../react-testing/) |

---

## 📚 Key Concepts Preview

### Non-negotiables (security + UX)

- **Never store access tokens in `localStorage`** for serious apps (XSS risk). Prefer **httpOnly cookies** when possible.
- **Always implement loading + error states** for auth actions (login/register/refresh).
- **Treat auth as state**: `anonymous | authenticating | authenticated | error`.

### Authentication vs Authorization

- **Authentication**: who are you?
- **Authorization**: what can you do?
- In React: route guards are **authorization**; login is **authentication**.

### Example: auth state as a discriminated union

```javascript
// Auth state shape: status + optional user/error
// { status: 'anonymous' } | { status: 'authenticating' }
// | { status: 'authenticated'; user: { id, role? } }
// | { status: 'error'; message: string }
```

### Practical checklist (student baseline)

- **CSRF/XSS awareness**: sanitize/escape, never render untrusted HTML, protect cookies.
- **Session persistence**: refresh on load, handle “expired session” gracefully.
- **RBAC**: at least 2 roles (e.g., user/admin) or 2 permission levels.

### Reflection (Atelier)

> 💭 _Which threat model did you assume? What is the most realistic attack on your project?_

> 💭 _Where did AI help—and where would following AI blindly create a security bug?_

### Koan

> _"If convenience defeats security, you built a demo—not a system."_

---

> *"Trust is earned in drops and lost in buckets. Auth code is no different."*
