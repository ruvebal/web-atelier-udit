---
layout: lesson
title: 'Authentication: From Mock to Real, Without a New Sandbox'
slug: react-authentication
category: react
tags: [react, authentication, jwt, refresh-tokens, security, oauth, tailwind, react-router, helios-deck]
week: 9
phase: 3
sprint: 10
date: 2026-04-29
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

> _"The session binds the user to the request. Lose the binding — and only a stranger remains."_
> — Tao of the Webapp Master

---

## How this lesson is built

This lesson **does not create a new sandbox**. It lives on top of the [Routing & Navigation](../react-routing/) sandbox you already built last week. That sandbox has:

- A `BrowserRouter` + `App.jsx` with five pre-wired example routes
- A `ProtectedRoute` component that redirects unauthenticated users to `/ex5/login` and remembers where they were going via `location.state.from`
- A `MockAuthContext` exposing `{ isLoggedIn, login, logout }` — fake but **shaped exactly like a real auth provider**

**Your job this week is to replace the body of `MockAuthContext` with a real authentication flow** (login, session persistence, token refresh, server-verified identity) and add a few new examples on top. The route guard, the redirect-after-login pattern, the navigation chrome — all of that stays.

> _"Replace the body of the provider; keep its shape. Its consumers do not need to know the truth has become real."_
> — Tao of the Webapp Master

If you skipped Routing, fork the routing sandbox first and complete its scaffold (Section 2 of that lesson) before touching this one.

---

## Code conventions in this lesson

Same vocabulary as the routing and backend lessons:

- **CodeSandbox-ready** — complete, copy-paste file. Works once the routing scaffold is in place.
- **Excerpt** — partial pattern, illustrative only. Does not run as-is.
- **Template** — copy and replace `[BRACKETED]` values before use (Sanctum, Firebase, your real backend).

---

## Sandbox setup (5 minutes)

**Step 1 — Fork the routing sandbox.** Open [https://codesandbox.io/p/devbox/9ltymf](https://codesandbox.io/p/devbox/9ltymf), click **Fork**, name it `react-auth-sprint-10`. You inherit `react-router-dom`, Tailwind v4, and the full Act 1 scaffold (Ex1–Ex5).

> [https://codesandbox.io/p/devbox/react-auth-sprint-10-fj8sp3](https://codesandbox.io/p/devbox/react-auth-sprint-10-fj8sp3)

**Step 2 — Verify the starting state.** Run the preview. You should see the routing nav bar, `/ex5/login` with a "Mock log in" button, and `/ex5/deck` redirecting to login when you're logged out. If anything is broken, repair it before continuing — this lesson assumes the routing scaffold works.

**Step 3 — There is no Step 3.** Tailwind, the router, the data, the components — all reused. Every file you add or edit in this lesson is listed in Section 3 below.

> **Why this matters pedagogically.** Fresh sandboxes hide the most important property of good authentication code: the routing layer doesn't know auth got real. This lesson proves it by leaving the routing layer untouched.

---

## 🎯 Sprint Goal

Implement complete authentication — login, persistent session, server-verified identity, token refresh on 401, role-based authorization — **inside the routing sandbox**, by replacing only the parts that need to change.

---

## 📍 Position in the journey

| Sprint           | Focus                  | What survives into this lesson                    |
| ---------------- | ---------------------- | ------------------------------------------------- |
| 7 — Backend      | Data fetching, fetch   | `services/` layer pattern; error/loading shapes   |
| 8 — Routing      | URLs, guards, layouts  | The entire sandbox — nav bar, routes, guard, Ex5  |
| **→ 9 — Auth**   | **Sessions, tokens**   | **Replace `MockAuthContext`; add 3 new examples** |
| 10 — State arch. | Context, stores, scale | Auth state is the canonical Context use case      |

---

## 🧭 Learning Objectives

By the end of this lesson, you will:

- [ ] Explain JWT (JSON Web Token) vs session-based authentication and choose deliberately
- [ ] Build a login flow against a real auth API (returns access + refresh tokens)
- [ ] Implement `AuthContext` + `useAuth` as the single source of identity in your app
- [ ] Verify session on app load by calling the API's `/auth/me` endpoint (don't trust `localStorage`)
- [ ] Reuse the routing sandbox's `ProtectedRoute` — proving good abstractions survive backend swaps
- [ ] Implement token refresh on 401 with concurrent-request safety
- [ ] Extend the guard with role-based authorization
- [ ] Reason explicitly about where tokens live and what attacks each choice enables

---

## 1 — The mental model: auth as state

> _"Authentication asks who. Authorization asks whether. Confuse them and you guard the wrong door."_
> — Tao of the Webapp Master

### Authentication vs Authorization

- **Authentication**: who are you? (login)
- **Authorization**: what can you do? (route guards, role checks)
- A `ProtectedRoute` is **authorization**; the `Login` form is **authentication**.

The routing sandbox already taught you authorization — `ProtectedRoute` redirects anonymous users. This lesson adds the authentication half and then sharpens the authorization half with roles.

### JWT vs session-based — and what we're using here

> _"The session keeps state where the keys are kept. The token carries its own keys — and trusts the lock to recognise them."_
> — Tao of the Webapp Master

Two ways a server can remember who you are:

**🟢 Session-based (classic)**

- Server creates a session record (DB / Redis / memory) and returns a `session_id` in an **httpOnly cookie**.
- Every request → browser sends the cookie → server looks up the session.
- **State lives on the server.** Logout = delete the session row.

**🔵 JWT (JSON Web Token)**

- Server signs a token with the user's claims (id, role, expiry) and returns it.
- Client stores it and sends `Authorization: Bearer <token>` on every request.
- Server verifies the **signature** only — no DB lookup per request.
- **State lives on the client.** The token stays valid until it expires (revocation requires a denylist or short expiry + refresh — which is exactly why refresh tokens exist).

|                      | Session-based                          | JWT                                                       |
| -------------------- | -------------------------------------- | --------------------------------------------------------- |
| **State location**   | Server (DB / Redis)                    | Client (signed token payload)                             |
| **Client storage**   | httpOnly cookie (browser-managed)      | `Authorization` header (memory or cookie)                 |
| **Per-request cost** | One DB / cache lookup                  | Signature verify only                                     |
| **Logout**           | Instant — delete the session row       | Token valid until expiry (needs denylist for true revoke) |
| **Best fit**         | Same-origin web app, you own the stack | Stateless APIs, microservices, mobile + web share         |

**What this lesson uses:** **JWT with a refresh token.** dummyjson returns both, and the JWT + refresh pattern is what students will meet in most modern stacks (Auth0, Firebase, Supabase, Clerk, custom Node / Laravel APIs). The Sanctum template in Section 8 shows the cookie-based session variant for comparison — same `AuthContext` shape, different `services/authApi.js`.

### A note on React Router data APIs (loaders / actions)

React Router v7 added `loader` and `action` APIs that pair well with both auth strategies — loaders can read cookies (session-based) or attach a Bearer header (JWT) before the route renders. **This lesson uses the classic `<Routes>` / `<Route>` API** (Declarative Mode, the same one the routing lesson used in Act 1) because:

- The guard reads `AuthContext` state, not loader-provided data — the auth flow is purely client-side.
- Loaders are only needed when you also need to **fetch data per route**, which the backend lesson covered with React Query.
- Mixing both styles in one teaching sandbox would obscure the auth pattern itself.

> A loader runs before a route's component renders. Data is ready by the time the component mounts — no `useEffect` + `useState` needed. ([reactrouter.com/start/framework/data-loading](https://reactrouter.com/start/framework/data-loading))
>
> An action handles POST/PUT/PATCH/DELETE requests on a route. ([reactrouter.com/start/framework/actions](https://reactrouter.com/start/framework/actions))

**If you adopt loaders later:** pass the `accessToken` from `useAuth()` into a typed API client and call it from each route's loader. `AuthContext` still owns identity; loaders just become the place where authenticated data fetching happens.

### Central route file — good habit even in Declarative Mode

In **Framework Mode**, you keep a single `routes.js` (or `routes.ts`) that registers every URL using the `route()` helper from `@react-router/dev/routes`. This lesson stays in Declarative Mode (CodeSandbox), but **we still move all `<Route>` definitions into `src/routes.jsx`** so `App.jsx` is layout-only. Same habit:

- **One file = full picture.** Open `routes.jsx` to see every URL, every guard, every page import.
- **AI tools work better.** Give an agent `routes.jsx` and it has complete routing context.
- **Transfers directly.** When you move to Framework Mode, swap JSX `<Route>` for `route()` calls — the mental model (central registry) stays.

### Auth state is global

Auth is the textbook case of state that:

- Many components need to read (`Profile`, `NavBar`, `ProtectedRoute`, every API call)
- Few components need to write (only `Login` and `Logout`)
- Persists across navigation

That's `Context`, not prop drilling. It's not server state in the React Query sense (it's not refetched on focus, it's not paginated) — so this lesson uses Context, not React Query. **Server state vs auth state is a real architectural decision** — discuss it explicitly.

### Auth state as a discriminated union

> _"The user not yet seen is not the user who is gone. Render for both, lest you flash protected truths to a stranger."_
> — Tao of the Webapp Master

**Excerpt** — The shape we'll build toward. A clear state machine prevents whole classes of bugs ("flash of unauthenticated content", showing protected UI to anonymous users).

```javascript
// type AuthState =
//   | { status: 'initializing' }                  // app just loaded, checking token
//   | { status: 'anonymous' }                     // no valid session
//   | { status: 'authenticating' }                // login request in flight
//   | { status: 'authenticated', user: User }     // session active
//   | { status: 'error', message: string }
```

In our implementation we expose `{ user, isLoading, error, login, logout }` — the same machine, flattened for ergonomics. The `isLoading === true && user === null` branch is the `initializing` state; that's the one that prevents flashes of unauthenticated content.

### Where the token lives — and why we explain ourselves

> _"Every token has a home. The home you choose is also the door you open to attack."_
> — Tao of the Webapp Master

This sandbox stores the **refresh token** (only) in `localStorage`. The **access token** lives in React state (provider memory) and disappears on tab close. We do this deliberately, knowing localStorage is not the production-recommended store for any token, because:

- **httpOnly cookies** require a backend you control (it sets `Set-Cookie` with `HttpOnly; Secure; SameSite=Strict`). The sandbox has no such backend.
- **localStorage is readable by any JS that runs on the page.** An XSS bug = stolen tokens.
- Putting all token reads/writes behind `tokenStorage.js` means swapping to cookies later is a **one-file change**.

**Production rule of thumb:** if your API is on the same origin (or a subdomain), use httpOnly cookies for both tokens. If you're calling a third-party API from a SPA, the standard is _access token in memory + refresh token in httpOnly cookie_. We approximate the second pattern: access token in memory, refresh token in localStorage. The XSS blast radius is smaller than putting both in localStorage, but still bigger than cookies — call it out with students.

---

## 2 — The mock auth API: dummyjson.com/auth

For this lesson we use [dummyjson.com/auth](https://dummyjson.com/docs/auth) — a free, public auth API that returns realistic JWTs and supports refresh.

| Method | URL             | Body / Header                   | Returns                                          |
| ------ | --------------- | ------------------------------- | ------------------------------------------------ |
| POST   | `/auth/login`   | `{ username, password }`        | user object + `accessToken` + `refreshToken`     |
| GET    | `/auth/me`      | `Authorization: Bearer <token>` | current user (verifies the token is still valid) |
| POST   | `/auth/refresh` | `{ refreshToken }`              | new `accessToken` + `refreshToken`               |

**Test credentials** (always work):

```
username: emilys
password: emilyspass
```

`emilys` has `role: "admin"` in dummyjson — useful for the role-based Example 8 (§3.7–§3.8, taught in §6). Other usernames are listed at [dummyjson.com/users](https://dummyjson.com/users); each user uses `<username>pass` as password.

> **Why a mock?** A real auth backend (Laravel Sanctum, Firebase, Auth0) requires setup that drowns the React patterns we're here to learn. dummyjson lets us use real fetch calls, real JWTs, and real 401 responses without leaving the browser. Section 8 shows how to swap it for a production backend in a single file.

---

## 3 — The migration: from mock to real

This is the headline section of the lesson. **§3 adds or edits the files in the table below.** Example pages from the routing sprint stay as-is; you add auth-specific files and **move route definitions into `src/routes.jsx`** (central route file, same habit as Framework Mode's `routes.js`).

### What changes (and why)

| File                                | Action                | Why                                                                            |
| ----------------------------------- | --------------------- | ------------------------------------------------------------------------------ |
| `src/services/tokenStorage.js`      | **add**               | Single point of truth for token persistence — swappable to cookies             |
| `src/services/authApi.js`           | **add**               | All auth network calls in one place; never `fetch()` from a component          |
| `src/auth/AuthContext.jsx`          | **add**               | Real `AuthProvider` + `useAuth` — same shape as `MockAuthContext`              |
| `src/components/StatusMessage.jsx`  | **add**               | Loading / error UI primitives, reused across new pages                         |
| `src/components/LoginForm.jsx`      | **add**               | Reusable controlled form for credentials                                       |
| `src/components/AuthBadge.jsx`      | **add**               | Live "logged in as…" indicator in the nav bar                                  |
| `src/main.jsx`                      | **edit**              | Swap `MockAuthProvider` → `AuthProvider` (one import, one tag)                 |
| `src/components/ProtectedRoute.jsx` | **edit**              | Swap `useMockAuth` → `useAuth`; add `isLoading` branch                         |
| `src/auth/RoleGuard.jsx`            | **add**               | Authorisation guard (`user.role`) — add **before** `routes.jsx` imports it     |
| `src/pages/Ex8RoleGuard.jsx`        | **add**               | Public `/ex8` info page + admin-only deck for the role example                 |
| `src/routes.jsx`                    | **add**               | **Central route map** — every `<Route>` in one file (habit for Framework Mode) |
| `src/App.jsx`                       | **edit**              | Nav + `<AuthBadge />`; renders `<AppRoutes />` from `routes.jsx`               |
| `src/pages/Ex5ProtectedRoute.jsx`   | **edit**              | Replace mock button with real `LoginForm`; show real user on the deck          |
| `src/context/MockAuthContext.jsx`   | **delete (optional)** | Becomes dead code; deleting clarifies the migration is final                   |

What does **not** change: `src/data/signals.js`, `src/components/SignalCard.jsx`, `src/components/StatusBadge.jsx`, `src/pages/Home.jsx`, `src/pages/Ex1Navigation.jsx`, `Ex2DynamicRoutes.jsx`, `Ex3NestedLayouts.jsx`, `Ex4URLState.jsx`. **Authentication is orthogonal to the URLs and pages it sits on.** This is the lesson's central claim, made concrete by the diff.

> **“Orthogonal” is a broader software design word meaning: two aspects can vary independently.**

---

### 3.1 Add `src/services/tokenStorage.js`

**CodeSandbox-ready** — Create `src/services/tokenStorage.js`.

```js
// src/services/tokenStorage.js
// Single point of truth for token persistence.
// In production, the refreshToken belongs in an httpOnly cookie set by your backend.
// We use localStorage here because the sandbox has no backend we control.
// Centralising storage here means switching to cookies later is a one-file change.

const REFRESH_KEY = 'auth.refreshToken';

export const tokenStorage = {
	getRefreshToken() {
		return localStorage.getItem(REFRESH_KEY);
	},
	setRefreshToken(token) {
		localStorage.setItem(REFRESH_KEY, token);
	},
	clear() {
		localStorage.removeItem(REFRESH_KEY);
	},
};
```

---

### 3.2 Add `src/services/authApi.js`

**CodeSandbox-ready** — Create `src/services/authApi.js`.

```js
// src/services/authApi.js
// All auth-related network calls live here. Components and the AuthContext
// import these functions — never call fetch() directly from a component.
//
// Returns parsed JSON or throws an Error with the server's message when present.

const BASE = 'https://dummyjson.com/auth';

async function parseOrThrow(res) {
	const data = await res.json().catch(() => ({}));
	if (!res.ok) {
		// dummyjson returns { message: '...' } on errors
		throw new Error(data.message || `HTTP ${res.status}`);
	}
	return data;
}

export async function login({ username, password }) {
	const res = await fetch(`${BASE}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password, expiresInMins: 30 }),
	});
	return parseOrThrow(res);
	// → { id, username, email, firstName, lastName, image, role, accessToken, refreshToken }
}

export async function getMe(accessToken) {
	const res = await fetch(`${BASE}/me`, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});
	return parseOrThrow(res); // → user object (no tokens)
}

export async function refresh(refreshToken) {
	const res = await fetch(`${BASE}/refresh`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
	});
	return parseOrThrow(res); // → { accessToken, refreshToken }
}
```

---

### 3.3 Add `src/auth/AuthContext.jsx`

This is the file `MockAuthContext` was always pretending to be. Same hook name (`useAuth` instead of `useMockAuth`, but same idea), richer shape: `{ user, accessToken, isLoading, error, login, logout, updateTokens }`.

**CodeSandbox-ready** — Create `src/auth/AuthContext.jsx`.

```jsx
// src/auth/AuthContext.jsx
// AuthProvider owns the auth state machine for the whole app.
// Access pattern: const { user, isLoading, error, login, logout } = useAuth();
//
// Token strategy:
//   - accessToken lives ONLY in this provider's state (React memory, not localStorage)
//   - refreshToken is persisted to localStorage so the session survives reload
//   - On mount we attempt /auth/refresh + /auth/me — never trust localStorage as truth

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as authApi from '../services/authApi';
import { tokenStorage } from '../services/tokenStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [accessToken, setAccessToken] = useState(null);
	const [isLoading, setIsLoading] = useState(true); // initializing on mount
	const [error, setError] = useState(null);

	// Restore session on mount: refresh-token → access-token → /auth/me
	useEffect(() => {
		const stored = tokenStorage.getRefreshToken();
		if (!stored) {
			setIsLoading(false);
			return;
		}
		(async () => {
			try {
				const tokens = await authApi.refresh(stored);
				const me = await authApi.getMe(tokens.accessToken);
				setAccessToken(tokens.accessToken);
				tokenStorage.setRefreshToken(tokens.refreshToken);
				setUser(me);
			} catch {
				// refresh token expired or revoked → fully clear
				tokenStorage.clear();
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const login = useCallback(async (username, password) => {
		setError(null);
		setIsLoading(true);
		try {
			const result = await authApi.login({ username, password });
			setAccessToken(result.accessToken);
			tokenStorage.setRefreshToken(result.refreshToken);
			// Strip tokens from the user object — UI never needs them
			const { accessToken: _a, refreshToken: _r, ...userOnly } = result;
			setUser(userOnly);
			return userOnly;
		} catch (e) {
			setError(e.message);
			throw e;
		} finally {
			setIsLoading(false);
		}
	}, []);

	const logout = useCallback(() => {
		setUser(null);
		setAccessToken(null);
		setError(null);
		tokenStorage.clear();
	}, []);

	// Used by the refresh-on-401 helper (Example 7) to push fresh tokens back
	// into the source of truth after a successful refresh.
	const updateTokens = useCallback(({ accessToken: newAccess, refreshToken: newRefresh }) => {
		setAccessToken(newAccess);
		if (newRefresh) tokenStorage.setRefreshToken(newRefresh);
	}, []);

	const value = { user, accessToken, isLoading, error, login, logout, updateTokens };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
	return ctx;
}
```

---

### 3.4 Add the auth UI primitives

**CodeSandbox-ready** — Create `src/components/StatusMessage.jsx`.

```jsx
// src/components/StatusMessage.jsx
// Two named exports — same pattern as the backend lesson.

export function Loading({ text = 'Loading…' }) {
	return <p className="text-slate-400 py-4">⏳ {text}</p>;
}

export function ErrorMsg({ message }) {
	return <p className="text-rose-600 bg-rose-50 border border-rose-200 rounded-lg p-3 text-sm">❌ {message}</p>;
}
```

---

**CodeSandbox-ready** — Create `src/components/LoginForm.jsx`.

```jsx
// src/components/LoginForm.jsx
// Reusable controlled form. Receives onSubmit(username, password); parent owns the auth call.
// Purely presentational — no useAuth import here.

import { useState } from 'react';

export default function LoginForm({ onSubmit, isPending, error }) {
	const [username, setUsername] = useState('emilys');
	const [password, setPassword] = useState('emilyspass');

	const inputClass =
		'w-full mb-3 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50';

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(username, password);
			}}
			className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
			<h2 className="text-lg font-semibold mb-1 mt-0">Sign in</h2>
			<p className="text-xs text-slate-500 mb-4">
				Demo credentials pre-filled. Try a wrong password to see error handling.
			</p>
			<input
				className={inputClass}
				placeholder="Username"
				autoComplete="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				disabled={isPending}
			/>
			<input
				type="password"
				className={inputClass}
				placeholder="Password"
				autoComplete="current-password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				disabled={isPending}
			/>
			<button
				type="submit"
				disabled={isPending}
				className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold text-sm disabled:opacity-50 cursor-pointer transition-colors">
				{isPending ? '⏳ Signing in…' : '🔑 Sign in'}
			</button>
			{error && <p className="mt-3 text-sm text-rose-600">❌ {error}</p>}
		</form>
	);
}
```

---

**CodeSandbox-ready** — Create `src/components/AuthBadge.jsx`.

```jsx
// src/components/AuthBadge.jsx
// Live auth indicator for the nav bar. Reads from useAuth — no props.
// Demonstrates the payoff of context: this component knows nothing about login,
// yet updates instantly when login/logout happens anywhere in the tree.

import { useAuth } from '../auth/AuthContext';

export default function AuthBadge() {
	const { user, isLoading, logout } = useAuth();

	if (isLoading) return <span className="text-xs text-slate-400">checking…</span>;
	if (!user) return <span className="text-xs text-slate-400">anonymous</span>;

	return (
		<span className="flex items-center gap-2 text-xs text-slate-600">
			<img src={user.image} alt="" className="w-5 h-5 rounded-full" />
			<span>{user.firstName}</span>
			{user.role && <code className="bg-slate-100 px-1 rounded text-[10px]">{user.role}</code>}
			<button
				onClick={logout}
				className="text-slate-400 hover:text-rose-600 underline cursor-pointer bg-transparent border-none">
				logout
			</button>
		</span>
	);
}
```

---

### 3.5 Edit `src/main.jsx` — swap providers

**CodeSandbox-ready** — Replace the contents of `src/main.jsx`.

```jsx
// src/main.jsx
// One-line conceptual diff from the routing version:
//   - import { MockAuthProvider } from './context/MockAuthContext'
//   + import { AuthProvider }     from './auth/AuthContext'
// The routing sandbox already wired the provider at this exact spot;
// we just swap which provider is mounted.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>
);
```

> **Provider order note.** The routing version had `MockAuthProvider` outside `BrowserRouter`. Either order works for this lesson; we keep the same outer-to-inner shape for minimal diff. If a future feature inside `AuthProvider` ever needs `useNavigate`, swap the two — the routing hooks must be inside `BrowserRouter`.

---

### 3.6 Edit `src/components/ProtectedRoute.jsx` — point at the real auth

The routing sandbox's `ProtectedRoute` already does the **hard part** — `Navigate` with `state.from`. Two edits make it real-auth-aware: a different hook import, and a new `isLoading` branch so the guard doesn't flash protected UI during session restore.

**CodeSandbox-ready** — Replace the contents of `src/components/ProtectedRoute.jsx`.

```jsx
// src/components/ProtectedRoute.jsx
// Three branches, in order:
//   - isLoading   → show a spinner (NEVER render children — that flashes protected UI)
//   - no user     → redirect to login, remembering where we were going (state.from)
//   - authenticated → render children
//
// Compared to the routing sandbox version, only the source of `isLoggedIn` changed:
// useMockAuth() → useAuth(). The `Navigate` redirect-with-state pattern is unchanged.

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Loading } from './StatusMessage';

export default function ProtectedRoute({ children, redirectTo = '/ex5/login' }) {
	const { user, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) return <Loading text="Checking session…" />;

	if (!user) {
		return <Navigate to={redirectTo} replace state={{ from: location }} />;
	}

	return children;
}
```

> **Teaching moment.** Open the routing sandbox version side-by-side. The `Navigate` line is **byte-identical**. Only the destructuring and the `isLoading` branch are new. _Your routing knowledge transferred completely._

---

### 3.7 Add `src/auth/RoleGuard.jsx` (before `routes.jsx` imports it)

`routes.jsx` will import this file. **Create it now** so Vite never sees a missing module.

**CodeSandbox-ready** — Create `src/auth/RoleGuard.jsx`.

```jsx
// src/auth/RoleGuard.jsx
// Same skeleton as ProtectedRoute, with one extra check.
// Branches:
//   - isLoading       → spinner
//   - no user         → redirect to login
//   - wrong role      → redirect to /ex8 (a "permission denied" info page)
//   - matching role   → render children

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Loading } from '../components/StatusMessage';

export default function RoleGuard({ children, role, fallback = '/ex8' }) {
	const { user, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) return <Loading text="Checking permissions…" />;

	if (!user) {
		return <Navigate to="/ex5/login" replace state={{ from: location }} />;
	}

	if (user.role !== role) {
		return <Navigate to={fallback} replace />;
	}

	return children;
}
```

> **Why a separate component (not a `requiresRole` prop on `ProtectedRoute`)?** Composition over options. `ProtectedRoute` is the "are you signed in" guard; `RoleGuard` is the "are you _this kind of_ signed-in user" guard. They can compose (`<ProtectedRoute><RoleGuard role="admin">…`) but a single component with a flag would muddy the boundary between authentication and authorization. Two guards = two clear questions.

---

### 3.8 Add `src/pages/Ex8RoleGuard.jsx`

**CodeSandbox-ready** — Create `src/pages/Ex8RoleGuard.jsx`.

```jsx
// src/pages/Ex8RoleGuard.jsx
// Two named exports:
//   Ex8RoleInfo  — public info page at /ex8 (shown when role check fails)
//   Ex8AdminDeck — admin-only page at /ex8/admin (default export)

import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function Ex8RoleInfo() {
	const { user } = useAuth();
	const role = user?.role ?? null;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">8 · Role-based access</h1>
			<p className="text-sm text-slate-600 mb-4">
				The route <code className="bg-slate-100 px-1 rounded">/ex8/admin</code> is wrapped in{' '}
				<code className="bg-slate-100 px-1 rounded">&lt;RoleGuard role="admin"&gt;</code>. Anyone signed in as anything
				other than <strong>admin</strong> bounces back here.
			</p>
			<div className="bg-white border border-slate-200 rounded-xl p-4 mb-4">
				<p className="text-sm text-slate-500">Your current role</p>
				<p className="font-semibold text-lg">
					{role ? (
						<code className="bg-slate-100 px-2 py-0.5 rounded">{role}</code>
					) : (
						<em className="text-slate-400">anonymous</em>
					)}
				</p>
			</div>
			<Link
				to="/ex8/admin"
				className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold text-sm">
				Try /ex8/admin →
			</Link>
			<p className="text-xs text-slate-400 mt-4">
				Tip: <code className="bg-slate-100 px-1 rounded">emilys</code> is an admin in dummyjson. Sign in as a non-admin user
				(e.g. <code className="bg-slate-100 px-1 rounded">michaelw</code> /{' '}
				<code className="bg-slate-100 px-1 rounded">michaelwpass</code>) to see the redirect.
			</p>
		</div>
	);
}

export default function Ex8AdminDeck() {
	const { user } = useAuth();
	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">Admin-only deck</h1>
			<p className="text-sm text-slate-600 mb-4">
				You see this because <code className="bg-slate-100 px-1 rounded">user.role === "admin"</code>. Welcome,{' '}
				{user.firstName}.
			</p>
			<div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-sm text-rose-900">
				<p className="font-semibold mb-1">🛑 Defence in depth</p>
				<p>
					Client-side role checks are <em>UX</em>, not <em>security</em>. The same role check must run on the server for
					every mutation. A user who tampers with their JWT payload can bypass any client-only guard.
				</p>
			</div>
		</div>
	);
}
```

---

### 3.9 Add `src/routes.jsx` — central route map

**This is the key organisational move.** Every `<Route>` lives here; `App.jsx` becomes layout-only. Same habit as Framework Mode's `routes.js` — one file = full picture.

**CodeSandbox-ready** — Create `src/routes.jsx`.

```jsx
// src/routes.jsx
// Central route registration — every URL in one file.
// In Framework Mode you'd use route() from @react-router/dev/routes;
// here we use JSX <Route> but keep the same habit: one registry file.

import { Navigate, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import RoleGuard from './auth/RoleGuard';

import Home from './pages/Home';
import Ex1Layout, { Ex1About, Ex1Welcome } from './pages/Ex1Navigation';
import Ex2List, { Ex2Detail } from './pages/Ex2DynamicRoutes';
import Ex3Layout, { Ex3Detail, Ex3Index } from './pages/Ex3NestedLayouts';
import Ex4URLState from './pages/Ex4URLState';
import Ex5Deck, { Ex5Login } from './pages/Ex5ProtectedRoute';
import Ex6Profile from './pages/Ex6Profile';
import Ex7Refresh from './pages/Ex7Refresh';
import Ex8AdminDeck, { Ex8RoleInfo } from './pages/Ex8RoleGuard';

/** Every path in the lesson — composed inside <Routes> from App.jsx. */
export function AppRoutes() {
	return (
		<>
			<Route path="/" element={<Home />} />

			{/* Routing-lesson examples (unchanged) */}
			<Route path="/ex1" element={<Ex1Layout />}>
				<Route index element={<Ex1Welcome />} />
				<Route path="about" element={<Ex1About />} />
			</Route>
			<Route path="/ex2" element={<Ex2List />} />
			<Route path="/ex2/signals/:signalId" element={<Ex2Detail />} />
			<Route path="/ex3" element={<Ex3Layout />}>
				<Route index element={<Ex3Index />} />
				<Route path=":signalId" element={<Ex3Detail />} />
			</Route>
			<Route path="/ex4" element={<Ex4URLState />} />

			{/* Ex5 — protected deck (now with REAL auth) */}
			<Route path="/ex5/login" element={<Ex5Login />} />
			<Route
				path="/ex5/deck"
				element={
					<ProtectedRoute>
						<Ex5Deck />
					</ProtectedRoute>
				}
			/>
			<Route path="/ex5" element={<Navigate to="/ex5/login" replace />} />

			{/* New auth examples */}
			<Route
				path="/ex6"
				element={
					<ProtectedRoute>
						<Ex6Profile />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/ex7"
				element={
					<ProtectedRoute>
						<Ex7Refresh />
					</ProtectedRoute>
				}
			/>
			<Route path="/ex8" element={<Ex8RoleInfo />} />
			<Route
				path="/ex8/admin"
				element={
					<RoleGuard role="admin">
						<Ex8AdminDeck />
					</RoleGuard>
				}
			/>

			<Route path="*" element={<p className="text-slate-500">404 — no route matched.</p>} />
		</>
	);
}
```

---

### 3.10 Edit `src/App.jsx` — layout shell only

Now `App.jsx` is pure chrome: nav bar, `<AuthBadge />`, and `<Routes>` wrapping `<AppRoutes />`. No route definitions here.

**CodeSandbox-ready** — Replace the contents of `src/App.jsx`.

```jsx
// src/App.jsx
// Layout shell: nav + AuthBadge + <Routes>. All <Route> definitions live in ./routes.jsx.

import { NavLink, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';
import AuthBadge from './components/AuthBadge';

const NAV = [
	{ to: '/', label: '🏠 Home' },
	{ to: '/ex1', label: '1 · Navigation' },
	{ to: '/ex2', label: '2 · Dynamic' },
	{ to: '/ex3', label: '3 · Nested' },
	{ to: '/ex4', label: '4 · URL state' },
	{ to: '/ex5', label: '5 · Protected' },
	{ to: '/ex6', label: '6 · Profile' },
	{ to: '/ex7', label: '7 · Refresh' },
	{ to: '/ex8', label: '8 · Roles' },
];

export default function App() {
	return (
		<div className="min-h-screen bg-slate-50 font-sans">
			<nav className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-4">
				<ul className="flex flex-wrap gap-2">
					{NAV.map(({ to, label }) => (
						<li key={to}>
							<NavLink
								to={to}
								end={to === '/'}
								className={({ isActive }) =>
									`text-sm px-3 py-1.5 rounded-lg transition-colors ${
										isActive ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
									}`
								}>
								{label}
							</NavLink>
						</li>
					))}
				</ul>
				<AuthBadge />
			</nav>
			<main className="max-w-2xl mx-auto px-4 py-10">
				<Routes>
					<AppRoutes />
				</Routes>
			</main>
		</div>
	);
}
```

---

### 3.11 Edit `src/pages/Ex5ProtectedRoute.jsx` — the mock dies, the route survives

`Ex5Login` and `Ex5Deck` are the only routing pages this lesson edits. Everything around them — the `/ex5/login` URL, the redirect from `/ex5` to `/ex5/login`, the guard at `/ex5/deck`, the `state.from` round-trip — is untouched. Only the **bodies** of the two components change: real form, real user data.

**CodeSandbox-ready** — Replace the contents of `src/pages/Ex5ProtectedRoute.jsx`.

```jsx
// src/pages/Ex5ProtectedRoute.jsx
// Same routes, same guard, same redirect-after-login dance — but real credentials.
//   Ex5Login: real LoginForm against dummyjson via useAuth().login
//   Ex5Deck:  reads useAuth().user — server-issued identity, not a mock toggle

import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import LoginForm from '../components/LoginForm';
import { Loading } from '../components/StatusMessage';

export function Ex5Login() {
	const { user, isLoading, error, login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname ?? '/ex5/deck';

	useEffect(() => {
		if (user) navigate(from, { replace: true });
	}, [user, from, navigate]);

	async function handleLogin(username, password) {
		try {
			await login(username, password);
		} catch {
			/* error already in context */
		}
	}

	if (isLoading && !user) return <Loading text="Restoring session…" />;

	return (
		<div className="max-w-md">
			<h1 className="text-2xl font-bold mb-2">5 · Protected route (real auth)</h1>
			<p className="text-sm text-slate-500 mb-6">
				Same guard the routing lesson taught — now backed by a real auth provider. Try a wrong password to see error
				handling.
			</p>
			{from !== '/ex5/deck' && (
				<p className="text-sm text-slate-500 mb-3">
					Sign in to continue to <code className="bg-slate-100 px-1 rounded">{from}</code>
				</p>
			)}
			<LoginForm onSubmit={handleLogin} isPending={isLoading} error={error} />
		</div>
	);
}

export default function Ex5Deck() {
	const { user, logout } = useAuth();

	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">Mission deck (protected)</h1>
			<p className="text-sm text-slate-600 mb-4">
				You passed the guard. Hello, <strong>{user.firstName}</strong> — your role is{' '}
				<code className="bg-slate-100 px-1 rounded">{user.role ?? 'user'}</code>.
			</p>
			<div className="flex gap-3">
				<button
					type="button"
					onClick={logout}
					className="text-sm font-semibold text-rose-700 border border-rose-200 px-3 py-1.5 rounded-lg">
					Logout
				</button>
				<Link className="text-sm font-semibold text-indigo-600 px-3 py-1.5" to="/ex6">
					Verify session via /auth/me →
				</Link>
			</div>
		</div>
	);
}
```

---

### 3.12 Verify the migration

1. Open `/ex5/login`. The mock button is gone; a real form is in its place.
2. Sign in with `emilys` / `emilyspass`. You land on `/ex5/deck`. The nav bar's `AuthBadge` shows your name and role.
3. **Reload the page.** You stay logged in (refresh-token-on-mount restored the session via `/auth/refresh` + `/auth/me`).
4. Click **logout** in the badge. The badge flips to `anonymous` instantly. Try `/ex5/deck` — you're kicked to login.
5. **Open DevTools → Application → Local Storage.** Only `auth.refreshToken` is there — no access token. That's intentional.

> **What did NOT change.** `Ex1`–`Ex4` still work identically. The router still works identically. The `ProtectedRoute` redirect still uses `state.from`. _The body changed; the shape held._

---

## 4 — Example 6: Server-verified identity (`/auth/me`)

> _"Trust the server's view, not the cache's. The session truly lives only at the source."_
> — Tao of the Webapp Master

`AuthContext` already holds the user from the login response. That's a snapshot. To prove the session is **still live right now**, hit `/auth/me` with the access token. A 401 here means the access token expired between login and now.

**CodeSandbox-ready** — Create `src/pages/Ex6Profile.jsx`.

```jsx
// src/pages/Ex6Profile.jsx
// Wrapped in <ProtectedRoute> in routes.jsx, so we know `user` is non-null here.
// We hit /auth/me to demonstrate that we trust the SERVER's view of the session,
// not our local cache. If /auth/me returns 401, we surface it — Example 7
// will show how to recover via refresh.

import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getMe } from '../services/authApi';
import { ErrorMsg, Loading } from '../components/StatusMessage';

export default function Ex6Profile() {
	const { user, accessToken } = useAuth();
	const [serverUser, setServerUser] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		setError(null);
		getMe(accessToken)
			.then((data) => {
				if (!cancelled) setServerUser(data);
			})
			.catch((e) => {
				if (!cancelled) setError(e.message);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});
		return () => {
			cancelled = true;
		};
	}, [accessToken]);

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">6 · Profile</h1>
			<section className="bg-white border border-slate-200 rounded-xl p-6 mb-4">
				<h2 className="text-sm font-semibold text-slate-500 mb-3">From AuthContext (login response — cached)</h2>
				<p>
					{user.firstName} {user.lastName} — <span className="text-slate-400">@{user.username}</span>
				</p>
			</section>
			<section className="bg-white border border-slate-200 rounded-xl p-6">
				<h2 className="text-sm font-semibold text-slate-500 mb-3">From /auth/me (server-verified just now)</h2>
				{loading && <Loading text="Verifying session…" />}
				{error && <ErrorMsg message={error} />}
				{serverUser && (
					<div className="space-y-1 text-sm">
						<p>
							<span className="text-slate-400">id:</span> {serverUser.id}
						</p>
						<p>
							<span className="text-slate-400">email:</span> {serverUser.email}
						</p>
						<p>
							<span className="text-slate-400">role:</span> {serverUser.role ?? 'user'}
						</p>
					</div>
				)}
			</section>
			<div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
				<p className="font-semibold mb-1">⚠️ Failure mode</p>
				<p>
					If the access token expires (15–30 min in production), this page would currently surface the 401 as a hard error.
					Example 7 wraps fetch in a refresh-on-401 helper that recovers transparently.
				</p>
			</div>
		</div>
	);
}
```

---

## 5 — Example 7: Refresh-on-401 + concurrent safety

> _"A 401 is not a wall — it is a question. Refresh, then ask again."_
> — Tao of the Webapp Master

Production auth APIs answer 401 to expired tokens. The right pattern:

1. Detect 401.
2. Call `/auth/refresh` to get a new access token.
3. Retry the original request **once** with the new token.
4. If refresh itself fails → log the user out (the session really is dead).
5. **Concurrent requests during step 2 must share one refresh promise** — otherwise a page with five parallel requests fires five refreshes and races.

> _"One key opens the door for many. Do not forge the same key five times in parallel."_
> — Tao of the Webapp Master

**Excerpt** — Anatomy of `fetchWithAuth`. Wired into the live page below.

```jsx
// Module-level: shared across every caller. Resets to null when the refresh settles.
let refreshPromise = null;

export async function fetchWithAuth(url, init, { accessToken, onTokens, onLogout }) {
	const attempt = (tok) => fetch(url, { ...init, headers: { ...init?.headers, Authorization: `Bearer ${tok}` } });

	let res = await attempt(accessToken);
	if (res.status !== 401) return res;

	// One in-flight refresh shared across all callers (race-safe)
	if (!refreshPromise) {
		refreshPromise = refresh(getRefreshToken()).finally(() => {
			refreshPromise = null;
		});
	}

	try {
		const tokens = await refreshPromise;
		onTokens(tokens);
		return await attempt(tokens.accessToken); // retry once
	} catch {
		onLogout();
		throw new Error('Session expired');
	}
}
```

The page below wires this together with a "simulate expired token" button that swaps the in-memory access token for a known-bad one — clicking "Verify session" then triggers the refresh flow live.

**CodeSandbox-ready** — Create `src/pages/Ex7Refresh.jsx`.

```jsx
// src/pages/Ex7Refresh.jsx
// Demonstrates:
//   - fetchWithAuth: 401 → /auth/refresh → retry the original request once
//   - Concurrent-safety: a single in-flight refreshPromise is shared
//   - Hard logout: refresh failure clears all auth state via context
//
// To see it work: log in (Ex5), come here, "Break access token", "Verify session".
// Network panel will show: GET /auth/me 401 → POST /auth/refresh 200 → GET /auth/me 200.

import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { refresh as refreshApi } from '../services/authApi';
import { tokenStorage } from '../services/tokenStorage';
import { ErrorMsg, Loading } from '../components/StatusMessage';

// Module-level: shared across every caller. Resets to null when the refresh settles.
let refreshPromise = null;

export default function Ex7Refresh() {
	const { accessToken, logout, updateTokens } = useAuth();
	const [overrideToken, setOverrideToken] = useState(null);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	// Use the override token if set (for the "broken token" demo), else the real one.
	const currentToken = overrideToken ?? accessToken;

	async function fetchWithAuth(url) {
		const attempt = (tok) => fetch(url, { headers: { Authorization: `Bearer ${tok}` } });

		let res = await attempt(currentToken);
		if (res.status !== 401) return res;

		// Share one refresh across all simultaneous 401s
		if (!refreshPromise) {
			const stored = tokenStorage.getRefreshToken();
			refreshPromise = refreshApi(stored).finally(() => {
				refreshPromise = null;
			});
		}

		try {
			const tokens = await refreshPromise;
			updateTokens(tokens); // push fresh tokens back into the source of truth
			setOverrideToken(null); // demo: stop using the broken token
			res = await attempt(tokens.accessToken); // retry once
			return res;
		} catch {
			logout();
			throw new Error('Session expired — logged out');
		}
	}

	async function verifySession() {
		setError(null);
		setResult(null);
		setLoading(true);
		try {
			const res = await fetchWithAuth('https://dummyjson.com/auth/me');
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			setResult(data);
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">7 · Refresh on 401</h1>
			<div className="flex flex-wrap gap-2 mb-6">
				<button
					onClick={() => setOverrideToken('this.is.broken')}
					className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg cursor-pointer">
					🪓 Break access token
				</button>
				<button
					onClick={verifySession}
					disabled={loading}
					className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50">
					🔍 Verify session (/auth/me)
				</button>
			</div>

			<p className="text-xs text-slate-400 mb-3">
				token in use: <code className="font-mono">{currentToken?.slice(0, 24)}…</code>
				{overrideToken && ' (broken — next call will trigger refresh)'}
			</p>

			{loading && <Loading text="Verifying…" />}
			{error && <ErrorMsg message={error} />}
			{result && (
				<pre className="text-xs bg-white border border-slate-200 rounded-lg p-3 overflow-x-auto">
					{JSON.stringify({ id: result.id, email: result.email, username: result.username, role: result.role }, null, 2)}
				</pre>
			)}
		</div>
	);
}
```

**Walk through live with the Network tab open:**

1. Click **Break access token** → token in state is now garbage.
2. Click **Verify session** → watch:
   - `GET /auth/me` → **401**
   - `POST /auth/refresh` → **200**
   - `GET /auth/me` → **200** (retry succeeds)
3. The page recovered without the user noticing.

> **Production note.** Every API call should go through `fetchWithAuth`, not just this one route. The standard pattern is to build it into your API client (`apiGet`, `apiPost` from the backend lesson) so refresh-on-401 is automatic everywhere. We left it inline here to keep the example readable.

---

## 6 — Example 8: Role-based authorization

> _"To know the user is not to know what the user may do. Pass the badge — then check the colour."_
> — Tao of the Webapp Master

`ProtectedRoute` answers _"are you anyone?"_. Many real routes need to ask _"are you the right kind of someone?"_ — admin, owner, editor, paid tier. The shape is identical: a guard component that checks state and either renders children or redirects. Only the predicate changes.

**You already wired this in §3:** `src/auth/RoleGuard.jsx` (§3.7), `src/pages/Ex8RoleGuard.jsx` (§3.8), and the `/ex8` + `/ex8/admin` routes in `src/routes.jsx` (§3.9). Re-open those files when teaching — the route map stays in one place, the guard stays reusable.

**Classroom drill.**

1. Sign in as `emilys` (admin). Click **Try /ex8/admin** → success.
2. Logout. Sign in as `michaelw` / `michaelwpass`. Click **Try /ex8/admin** → bounced to `/ex8`. Role badge shows `user`.
3. **Defence in depth.** Open DevTools and edit `user.role` in the React DevTools tree to `'admin'`. The page now renders. _What does this prove about client-side authorization?_ → it's UX, not security. The server must enforce.

---

## 7 — Production integration templates

> _"The shape of the abstraction outlives its first implementation. That is the gift of the boundary."_
> — Tao of the Webapp Master

Once you're comfortable with the pattern, swap the dummyjson layer for a real backend. **`AuthContext`, `ProtectedRoute`, `RoleGuard`, every page — none of it changes.** Only `services/authApi.js` does. That's the payoff of the architecture.

### Option A — Laravel Sanctum (cookies, same-origin)

**Template** — Replace dummyjson calls with Sanctum's cookie-based flow. Tokens are managed by the browser; you never touch them in JS. Drop `accessToken` / `updateTokens` from the context — there's nothing to manage.

```js
// src/services/authApi.js — Laravel Sanctum template
const API = '[YOUR_LARAVEL_BASE_URL]'; // e.g. 'https://api.yoursite.test'

export async function login({ email, password }) {
	// 1. Get CSRF cookie (Sanctum requirement, sets XSRF-TOKEN)
	await fetch(`${API}/sanctum/csrf-cookie`, { credentials: 'include' });
	// 2. Authenticate — Laravel sets the session cookie
	const res = await fetch(`${API}/login`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({ email, password }),
	});
	if (!res.ok) throw new Error('Login failed');
	return res.json();
}

export async function getMe() {
	const res = await fetch(`${API}/api/user`, { credentials: 'include' });
	if (!res.ok) throw new Error('Not authenticated');
	return res.json();
}

export async function logout() {
	await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' });
}
```

### Option B — Firebase Auth (third-party identity)

**Template** — Firebase manages the token lifecycle for you (silent refresh, persistence in IndexedDB).

```js
// src/services/authApi.js — Firebase template
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const app = initializeApp({
	apiKey: '[YOUR_API_KEY]',
	authDomain: '[YOUR_PROJECT].firebaseapp.com',
	projectId: '[YOUR_PROJECT_ID]',
});
export const auth = getAuth(app);

export const login = ({ email, password }) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export const subscribeAuth = (cb) => onAuthStateChanged(auth, cb);
```

In `AuthProvider`, replace the mount-time `refresh + getMe` block with:

```jsx
useEffect(
	() =>
		subscribeAuth((firebaseUser) => {
			setUser(firebaseUser);
			setIsLoading(false);
		}),
	[]
);
```

### Option C — Registration

dummyjson does not expose a registration endpoint, so the sandbox skips it. In a real backend, the shape is identical to login:

**Template** — Wire registration into your existing `AuthContext`. Most APIs return tokens on successful registration so the user is auto-logged-in.

```js
// src/services/authApi.js — register helper
export async function register({ username, email, password }) {
	const res = await fetch(`[YOUR_AUTH_BASE]/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, email, password }),
	});
	if (!res.ok) throw new Error('Registration failed');
	return res.json(); // → user + tokens, same shape as login
}
```

In `AuthContext`, add a `register` function that mirrors `login`. Add a `Register.jsx` page with a `LoginForm`-style form (extra fields: email, password confirmation, accept-terms checkbox).

---

## 8 — Security critical points

| ❌ Don't                                      | ✅ Do                                                 |
| --------------------------------------------- | ----------------------------------------------------- |
| Store the **access token** in `localStorage`  | Keep access tokens in **memory** (provider state)     |
| Trust client-side auth alone                  | Validate every protected request **on the server**    |
| Render protected UI before checking session   | Show a loading state while `AuthProvider` initializes |
| Rely on a single login response forever       | Verify with `/auth/me` and handle 401 → refresh       |
| Fire 5 refresh requests for 5 concurrent 401s | Share **one** in-flight refresh promise               |
| Treat a client-side role check as security    | Re-check the role on the server for every mutation    |
| Log raw tokens or full responses              | Redact tokens in logs and error reports               |
| Hardcode endpoints/secrets                    | Use env vars (`VITE_AUTH_BASE_URL`)                   |
| Skip HTTPS                                    | Always HTTPS in production — no exceptions            |

---

## 9 — Sprint deliverables

|          | Deliverable                                   | Pattern                                                |
| -------- | --------------------------------------------- | ------------------------------------------------------ |
| ✅       | `AuthContext` + `useAuth`                     | Single global source of identity                       |
| ✅       | Persistent session on reload                  | refresh-token-on-mount → `/auth/me`                    |
| ✅       | Login flow with loading + error states        | `useAuth().login()` + `useAuth().error`                |
| ✅       | `<ProtectedRoute>` reused from routing lesson | `state.from` round-trip, unchanged contract            |
| ✅       | Logout clears all auth state                  | `tokenStorage.clear()` + provider reset                |
| ✅       | Server-verified identity (`/auth/me`)         | Trust the server, not the cache                        |
| ✅       | Refresh-on-401 with single in-flight promise  | `fetchWithAuth` wrapper                                |
| ✅       | Role-based authorisation                      | `RoleGuard` component composed beside `ProtectedRoute` |
| 🎁 Bonus | Replace dummyjson with Sanctum or Firebase    | One-file change in `services/authApi.js`               |
| 🎁 Bonus | Registration flow                             | Mirror `login` in context + new `Register` page        |

---

## 10 — Atelier practice

### The sprint rhythm

```
┌─────────────────────────────────────────────────────────┐
│ DAY 1: The migration                                    │
│   • Fork the routing sandbox                            │
│   • Add tokenStorage + authApi + AuthContext            │
│   • Swap MockAuthProvider → AuthProvider                │
│   • Real LoginForm in Ex5; verify session survives      │
├─────────────────────────────────────────────────────────┤
│ DAY 2: Verification + recovery                          │
│   • /auth/me — server-verified identity (Ex6)           │
│   • Refresh-on-401 + concurrent safety (Ex7)            │
│   • Role-based authorisation (Ex8)                      │
├─────────────────────────────────────────────────────────┤
│ DAY 3: Security review                                  │
│   • Peer audit: where could XSS exfiltrate a token?     │
│   • Plan migration: localStorage → httpOnly cookies     │
│   • Discuss: what attacks are you protecting against?   │
└─────────────────────────────────────────────────────────┘
```

### AI-Assisted Development Protocol

| Task                | AI Role                  | Your Role                    |
| ------------------- | ------------------------ | ---------------------------- |
| Generate auth forms | Scaffold with validation | Add your UI components       |
| Debug 401 errors    | Explain token lifecycle  | Fix refresh logic            |
| Review security     | Suggest improvements     | Implement with understanding |
| Handle edge cases   | Propose error states     | Design for user trust        |

> 💭 _AI will happily generate a "store the access token in localStorage" solution. Your job is to know when that answer is wrong — and what the right answer's trade-offs are._

---

## 11 — Atelier reflections

> 💭 _The routing lesson's `ProtectedRoute` worked unchanged after the auth migration. What does that prove about the boundary you drew between routing and auth?_

> 💭 _Which threat model did you assume? What is the most realistic attack on **your** project — XSS, CSRF, stolen device, social engineering?_

> 💭 _You edited `Ex5Login` from "mock button" to "real form" in one commit. List every other file that had to change to make that work. Was the count higher or lower than you expected?_

> 💭 _If you swapped dummyjson for Laravel Sanctum, which files change? Which don't? What does that tell you about good architecture?_

> 💭 _Where did AI help — and where would following AI blindly create a security bug?_

### Closing koan

> _"Convenience that defeats security is a demo, not a system."_
> — Tao of the Webapp Master

> _"The provider's promise to its consumers is unchanged. The consumers do not need to know the truth has become real. That is the discipline."_
> — Tao of the Webapp Master

---

## 🔗 Lesson Navigation

| Previous                                  | Current            | Next                                               |
| ----------------------------------------- | ------------------ | -------------------------------------------------- |
| [Routing & Navigation](../react-routing/) | **Authentication** | [State Architecture](../react-state-architecture/) |

---

## References

- [dummyjson — Auth docs](https://dummyjson.com/docs/auth)
- [React Router — Navigate](https://reactrouter.com/api/components/Navigate)
- [React Router — useLocation](https://reactrouter.com/api/hooks/useLocation)
- [React Router — Data APIs (loaders / actions)](https://reactrouter.com/start/framework/data-loading)
- [Laravel Sanctum — SPA authentication](https://laravel.com/docs/sanctum#spa-authentication)
- [Firebase Authentication — Web SDK](https://firebase.google.com/docs/auth/web/start)
- [OWASP — JWT cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [MDN — `Window.localStorage` security considerations](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

> _"Trust is earned in drops and lost in buckets. Auth code is no different."_
> — Tao of the Webapp Master
