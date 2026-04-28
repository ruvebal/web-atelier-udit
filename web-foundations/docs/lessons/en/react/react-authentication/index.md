---
layout: lesson
title: 'Authentication: Securing Your Application'
slug: react-authentication
category: react
tags: [react, authentication, jwt, security, oauth, tailwind, react-router]
week: 9
phase: 3
sprint: 10
date: 2026-04-28
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

> _"Auth is where security, UX, and architecture collide. Handle with care."_

---

## Code conventions in this lesson

All examples live in **one permanent CodeSandbox**. The sandbox is set up once at the start of class. As each topic is introduced, you add one new file to `src/pages/` (or `src/auth/`) — nothing is ever replaced.

- **CodeSandbox-ready** — a complete, copy-paste file. Works once the scaffold below is in place.
- **Excerpt** — partial pattern, illustrative only. Does not run as-is.
- **Template** — copy and replace `[BRACKETED]` values before use (e.g. for Laravel / Firebase setups).

### Project structure

```
src/
  main.jsx                    ← BrowserRouter + AuthProvider
  App.jsx                     ← NavBar + Routes (all examples wired)
  services/
    authApi.js                ← login, getMe, refresh (real fetch calls)
    tokenStorage.js           ← Single source of truth for token persistence
  auth/
    AuthContext.jsx           ← AuthProvider + useAuth hook
    ProtectedRoute.jsx        ← Route guard with redirect-after-login
  components/
    LoginForm.jsx             ← Reusable login form
    StatusMessage.jsx         ← Loading / ErrorMsg
    AuthBadge.jsx             ← "Logged in as…" indicator in NavBar
  pages/
    Home.jsx                  ← Lesson index
    Ex1NaiveLogin.jsx         ← 1 · Login without context (the trap)
    Ex2AuthContext.jsx        ← 2 · AuthProvider + persistent session
    Ex3Protected.jsx          ← 3 · ProtectedRoute + redirect-after-login
    Ex4Profile.jsx            ← 4 · /auth/me — server-verified identity
    Ex5RefreshLogout.jsx      ← 5 · Token refresh on 401 + safe logout
```

### Sandbox setup (do this once at the start of class)

**Step 1 — Create sandbox**

On [codesandbox.io](https://codesandbox.io) choose the **React** template (Vite, JavaScript — files are `.jsx`, no TypeScript).

**Step 2 — Add dependencies** via the **Dependencies panel** (sidebar `+`):

```
tailwindcss
@tailwindcss/vite
react-router-dom
```

**Step 3 — Wire Tailwind into Vite**

Replace `vite.config.js` with:

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [react(), tailwindcss()],
});
```

**Step 4 — Enable Tailwind in CSS**

Replace the contents of `src/index.css` with:

```css
@import 'tailwindcss';
```

**Step 5 — Build the scaffold** (Section 3 below) and verify the preview shows the home page with nav links plus an `anonymous` badge in the top-right.

---

## 🎯 Sprint Goal

**By the end of this sprint**: Implement complete authentication — login, logout, protected routes, persistent sessions, and token refresh — with security best practices.

---

## 📍 Position in Journey

| Sprint          | Focus         | Your App Grows       |
| --------------- | ------------- | -------------------- |
| 8 — Routing     | Navigation    | Multi-page structure |
| 9 — Backend     | Data fetching | Real data, real app  |
| **→ 10 — Auth** | Security      | **User sessions**    |
| 11 — Testing    | Quality       | Reliable codebase    |

---

## 🧭 Learning Objectives

By the end of this lesson, you will:

- [ ] Understand JWT (JSON Web Token) vs session-based authentication
- [ ] Build a login flow against a real auth API (returns access + refresh tokens)
- [ ] Implement `AuthContext` + `useAuth` as the single source of identity in your app
- [ ] Verify session on app load via `/auth/me` (don't trust localStorage)
- [ ] Protect routes based on auth status, with redirect-after-login
- [ ] Implement token refresh on 401 with concurrent-request safety
- [ ] Reason explicitly about where tokens live and what attacks that enables

---

## 1 — The Mental Model: Auth as State

### Authentication vs Authorization

- **Authentication**: who are you? (login)
- **Authorization**: what can you do? (route guards, role checks)
- A `ProtectedRoute` is **authorization**; the `Login` form is **authentication**.

### JWT vs session-based — and what we're using here

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

**What this lesson uses:** **JWT with a refresh token.** dummyjson returns both, and the JWT + refresh pattern is what students will meet in most modern stacks (Auth0, Firebase, Supabase, Clerk, custom Node / Laravel APIs). The Sanctum template in Section 9 shows the cookie-based session variant for comparison — same `AuthContext` shape, different `services/authApi.js`.

### A note on React Router data APIs (loaders / actions)

React Router 6.4+ added `loader` and `action` APIs that pair well with both auth strategies — loaders can read cookies (session-based) or attach a Bearer header (JWT) before the route renders. **This lesson uses the classic `<Routes>` / `<Route>` API** (no loaders/actions) because:

- The guard reads `AuthContext` state, not loader-provided data — the auth flow is purely client-side.
- Loaders are only needed when you also need to **fetch data per route**, which the backend lesson covered with React Query.
- Mixing both styles in one teaching sandbox would obscure the auth pattern itself.

**Remember!**

A loader runs before a route's component renders. Data is ready by the time the component mounts — no useEffect + useState needed.
[https://reactrouter.com/start/framework/data-loading](https://reactrouter.com/start/framework/data-loading)

An action handles POST/PUT/PATCH/DELETE requests on a route.
[https://reactrouter.com/start/framework/actions](https://reactrouter.com/start/framework/actions)

**If you adopt loaders later:** pass the `accessToken` from `useAuth()` into a typed API client and call it from each route's loader. `AuthContext` still owns identity; loaders just become the place where authenticated data fetching happens.

### Auth state is global

Auth is the textbook case of state that:

- Many components need to read (`Profile`, `NavBar`, `ProtectedRoute`, every API call)
- Few components need to write (only `Login` and `Logout`)
- Persists across navigation

That's `Context`, not prop drilling. It's not server state in the React Query sense (it's not refetched on focus, it's not paginated) — so this lesson uses Context, not React Query. **Server state vs auth state is a real architectural decision** — discuss it explicitly with students.

### Auth state as a discriminated union

**Excerpt** — The shape we'll build toward. A clear state machine prevents whole classes of bugs ("flash of unauthenticated content", showing protected UI to anonymous users).

```javascript
// type AuthState =
//   | { status: 'initializing' }                  // app just loaded, checking token
//   | { status: 'anonymous' }                     // no valid session
//   | { status: 'authenticating' }                // login request in flight
//   | { status: 'authenticated', user: User }     // session active
//   | { status: 'error', message: string }
```

In our implementation we'll expose `{ user, isLoading, error, login, logout }` — the same machine, flattened for ergonomics. The `isLoading === true && user === null` branch is the `initializing` state; that's the one that prevents flashes of unauthenticated content.

---

## 2 — The Mock Auth API: dummyjson.com/auth

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

Other valid usernames are listed at `https://dummyjson.com/users` — every user uses `<username>pass` as password.

> **Why a mock?** A real auth backend (Laravel Sanctum, Firebase, Auth0) requires setup that drowns the React patterns we're here to learn. dummyjson lets us use real fetch calls, real JWTs, and real 401 responses without leaving the browser. Section 9 shows how to swap it for a production backend in a single file.

---

## 3 — Foundation Scaffold (build once, keep forever)

This is the permanent base of the sandbox. After adding the files below, you only ever **add** files to `src/pages/` — never edit `App.jsx` mid-lesson.

### Where the token lives — and why we explain ourselves

This sandbox stores the **refresh token** (only) in `localStorage`. The **access token** lives in React state (provider memory) and disappears on tab close. We do this deliberately, knowing localStorage is not the production-recommended store for any token, because:

- **httpOnly cookies** require a backend you control (it sets `Set-Cookie` with `HttpOnly; Secure; SameSite=Strict`). The sandbox has no such backend.
- **localStorage is readable by any JS that runs on the page.** An XSS bug = stolen tokens.
- Putting all token reads/writes behind `tokenStorage.js` means swapping to cookies later is a **one-file change**.

**Production rule of thumb:** if your API is on the same origin (or a subdomain), use httpOnly cookies for both tokens. If you're calling a third-party API from a SPA, the standard is _access token in memory + refresh token in httpOnly cookie_. We approximate the second pattern: access token in memory, refresh token in localStorage. The XSS blast radius is smaller than putting both in localStorage, but still bigger than cookies — call it out with students.

---

**CodeSandbox-ready** — `src/services/tokenStorage.js` (create new file)

```js
// src/services/tokenStorage.js
// Single point of truth for token persistence.
// In production, the refreshToken belongs in an httpOnly cookie set by your backend.
// We use localStorage here because the sandbox has no backend we control.
// Centralizing storage here means switching to cookies later is a one-file change.

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

**CodeSandbox-ready** — `src/services/authApi.js` (create new file)

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
	// → { id, username, email, firstName, lastName, image, accessToken, refreshToken }
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

**CodeSandbox-ready** — `src/auth/AuthContext.jsx` (create new file)

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

	// Used by the refresh-on-401 helper (Example 5) to push fresh tokens back
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

**CodeSandbox-ready** — `src/auth/ProtectedRoute.jsx` (create new file)

```jsx
// src/auth/ProtectedRoute.jsx
// Route guard. Three branches:
//   - isLoading → show a spinner (NEVER render children, that would flash protected UI)
//   - no user → redirect to /login, remembering where we were going (state.from)
//   - authenticated → render children

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Loading } from '../components/StatusMessage';

export default function ProtectedRoute({ children }) {
	const { user, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) return <Loading text="Checking session…" />;

	if (!user) {
		// state.from lets the login page redirect back after success
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}
```

---

**CodeSandbox-ready** — `src/components/StatusMessage.jsx` (create new file)

```jsx
// src/components/StatusMessage.jsx
// Two named exports — same pattern as the backend lesson.

export function Loading({ text = 'Loading…' }) {
	return <p className="text-gray-400 py-4">⏳ {text}</p>;
}

export function ErrorMsg({ message }) {
	return <p className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-3">❌ {message}</p>;
}
```

---

**CodeSandbox-ready** — `src/components/LoginForm.jsx` (create new file)

```jsx
// src/components/LoginForm.jsx
// Reusable login form. Receives onSubmit(username, password); parent owns the auth call.
// Purely presentational — works for naive (Ex1) and context-backed (Ex2) flows alike.

import { useState } from 'react';

export default function LoginForm({ onSubmit, isPending, error }) {
	const [username, setUsername] = useState('emilys');
	const [password, setPassword] = useState('emilyspass');

	const inputClass =
		'w-full mb-3 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50';

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(username, password);
			}}
			className="bg-blue-50 border border-blue-100 rounded-xl p-6">
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
				className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm disabled:opacity-50 cursor-pointer transition-colors">
				{isPending ? '⏳ Signing in…' : '🔑 Sign in'}
			</button>
			{error && <p className="mt-3 text-sm text-red-500">❌ {error}</p>}
		</form>
	);
}
```

---

**CodeSandbox-ready** — `src/components/AuthBadge.jsx` (create new file)

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
			<button
				onClick={logout}
				className="text-slate-400 hover:text-red-500 underline cursor-pointer bg-transparent border-none">
				logout
			</button>
		</span>
	);
}
```

---

**CodeSandbox-ready** — `src/main.jsx` (replace the template file)

```jsx
// src/main.jsx
// Provider order matters: BrowserRouter wraps AuthProvider so navigation hooks
// are available inside the provider if we ever need them.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
```

---

**CodeSandbox-ready** — `src/App.jsx` (replace the template file)

```jsx
// src/App.jsx
// NavBar + route map. All 5 examples + a /login route are pre-wired.
// Pages that don't exist yet will error until added — that is expected.

import { NavLink, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import AuthBadge from './components/AuthBadge';
import Ex1NaiveLogin from './pages/Ex1NaiveLogin';
import Ex2AuthContext from './pages/Ex2AuthContext';
import Ex3Protected from './pages/Ex3Protected';
import Ex4Profile from './pages/Ex4Profile';
import Ex5RefreshLogout from './pages/Ex5RefreshLogout';
import Home from './pages/Home';

const NAV = [
	{ to: '/', label: '🏠 Home' },
	{ to: '/ex1', label: '1 · Naive login' },
	{ to: '/ex2', label: '2 · AuthContext' },
	{ to: '/ex3', label: '3 · Protected' },
	{ to: '/ex4', label: '4 · Profile' },
	{ to: '/ex5', label: '5 · Refresh & Logout' },
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
								end
								className={({ isActive }) =>
									`text-sm px-3 py-1.5 rounded-lg transition-colors ${
										isActive ? 'bg-blue-500 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
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
					<Route path="/" element={<Home />} />
					<Route path="/ex1" element={<Ex1NaiveLogin />} />
					<Route path="/ex2" element={<Ex2AuthContext />} />
					<Route path="/ex3" element={<Ex3Protected />} />
					<Route
						path="/ex4"
						element={
							<ProtectedRoute>
								<Ex4Profile />
							</ProtectedRoute>
						}
					/>
					<Route path="/ex5" element={<Ex5RefreshLogout />} />
					{/* /login reuses Ex2 — it's the redirect target for ProtectedRoute */}
					<Route path="/login" element={<Ex2AuthContext />} />
				</Routes>
			</main>
		</div>
	);
}
```

---

**CodeSandbox-ready** — `src/pages/Home.jsx` (create new file)

```jsx
// src/pages/Home.jsx
// Lesson index — one card per example. Students see the full arc up front.

import { Link } from 'react-router-dom';

const EXAMPLES = [
	{ path: '/ex1', title: '1 · Naive login', desc: 'Login form without context. Works once. Then breaks.' },
	{ path: '/ex2', title: '2 · AuthContext', desc: 'Provider + useAuth. Session survives reload via /auth/refresh.' },
	{ path: '/ex3', title: '3 · Protected route', desc: 'Route guard with redirect-after-login.' },
	{ path: '/ex4', title: '4 · Profile (/auth/me)', desc: 'Server-verified identity. Never trust localStorage alone.' },
	{ path: '/ex5', title: '5 · Refresh & Logout', desc: 'Refresh-on-401, concurrent-request safety, full logout.' },
];

export default function Home() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">Authentication — Sprint 10</h1>
			<p className="text-slate-500 mb-8 text-sm">Login · Sessions · Protected routes · Token refresh</p>
			<ul className="space-y-3">
				{EXAMPLES.map(({ path, title, desc }) => (
					<li key={path}>
						<Link
							to={path}
							className="block p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-blue-300 transition-colors">
							<p className="font-semibold text-blue-600">{title}</p>
							<p className="text-sm text-slate-500 mt-1">{desc}</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
```

> **Verify the scaffold:** After adding these 9 files the preview should show a nav bar with 6 links + an `anonymous` badge in the top-right, and a home page with 5 cards. Pages 1–5 will error until you add their files — that is expected.

---

## 4 — Example 1: Naive login (the trap)

The version every student writes first. Local state, a token tucked into a variable, success message. **It looks like it works.** Then they reload the page and the session is gone. Then they add a second component that needs the user — and prop-drill it. Then they add a third — and reach for context anyway.

This example exists so the next four feel necessary, not arbitrary.

**CodeSandbox-ready** — Create `src/pages/Ex1NaiveLogin.jsx`.

```jsx
// src/pages/Ex1NaiveLogin.jsx
// What's wrong with this code?
//   1. Token lives in component state → lost on reload AND on navigation.
//   2. No other component can know the user is logged in (prop drilling required).
//   3. No verification step — we trust the response and stop.
//   4. Refresh? Logout? 401 handling? All missing.
//
// Examples 2–5 fix each of these in turn.

import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { login as loginApi } from '../services/authApi';

export default function Ex1NaiveLogin() {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);

	async function handleLogin(username, password) {
		setError(null);
		setIsPending(true);
		try {
			const result = await loginApi({ username, password });
			setToken(result.accessToken);
			setUser(result);
		} catch (e) {
			setError(e.message);
		} finally {
			setIsPending(false);
		}
	}

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">1 · Naive login</h1>
			{!user ? (
				<LoginForm onSubmit={handleLogin} isPending={isPending} error={error} />
			) : (
				<div className="bg-white border border-slate-200 rounded-xl p-6">
					<div className="flex items-center gap-3 mb-3">
						<img src={user.image} alt="" className="w-12 h-12 rounded-full" />
						<div>
							<p className="font-semibold">
								{user.firstName} {user.lastName}
							</p>
							<p className="text-xs text-slate-400">{user.email}</p>
						</div>
					</div>
					<p className="text-xs font-mono break-all bg-slate-50 p-2 rounded">token: {token.slice(0, 32)}…</p>
				</div>
			)}
			<div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
				<p className="font-semibold mb-1">⚠️ Try this:</p>
				<ul className="list-disc list-inside space-y-1">
					<li>Sign in. Refresh the page. The session is gone.</li>
					<li>
						Look at the NavBar — the "anonymous" badge never updated. The component above doesn't share state with anything
						else.
					</li>
				</ul>
			</div>
		</div>
	);
}
```

**Classroom moment:** Sign in, watch it work. Refresh — it's gone. _"How do we make it survive reload?"_ → persist a token. _"How does the NavBar find out we're logged in?"_ → lift state. **Both answers point to context with a persistence side-effect.**

---

## 5 — Example 2: AuthContext + persistent session

Two changes from Example 1:

1. The login call goes through `useAuth().login` — state lives in `AuthProvider`, every component sees it.
2. On mount, `AuthProvider` already attempted `refresh + getMe` (in the scaffold). So if the refresh token in localStorage was still valid, the user is **already logged in** when this page mounts.

**CodeSandbox-ready** — Create `src/pages/Ex2AuthContext.jsx`.

```jsx
// src/pages/Ex2AuthContext.jsx
// Same UI as Ex1 — but `user` and `login` come from useAuth(),
// so the NavBar (and every other component) sees the change.
// Also doubles as the /login route — see App.jsx for the redirect target.

import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import LoginForm from '../components/LoginForm';
import { Loading } from '../components/StatusMessage';

export default function Ex2AuthContext() {
	const { user, isLoading, error, login, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	// ProtectedRoute sets state.from when it kicks an anonymous user here
	const from = location.state?.from?.pathname || null;

	async function handleLogin(username, password) {
		try {
			await login(username, password);
			if (from) navigate(from, { replace: true });
		} catch {
			/* error already in context */
		}
	}

	if (isLoading) return <Loading text="Restoring session…" />;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">2 · AuthContext</h1>
			{!user ? (
				<>
					{from && (
						<p className="text-sm text-slate-500 mb-3">
							Sign in to continue to <code className="bg-slate-100 px-1 rounded">{from}</code>
						</p>
					)}
					<LoginForm onSubmit={handleLogin} isPending={isLoading} error={error} />
				</>
			) : (
				<div className="bg-white border border-slate-200 rounded-xl p-6">
					<div className="flex items-center gap-3 mb-4">
						<img src={user.image} alt="" className="w-12 h-12 rounded-full" />
						<div>
							<p className="font-semibold">
								{user.firstName} {user.lastName}
							</p>
							<p className="text-xs text-slate-400">@{user.username}</p>
						</div>
					</div>
					<button onClick={logout} className="text-sm bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg cursor-pointer">
						Logout
					</button>
				</div>
			)}
			<div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900">
				<p className="font-semibold mb-1">✅ Try this:</p>
				<ul className="list-disc list-inside space-y-1">
					<li>Sign in. Look at the NavBar — the badge updates instantly.</li>
					<li>Reload the page. You stay logged in (refresh token in localStorage).</li>
					<li>
						Open DevTools → Application → Local Storage. Only <code>auth.refreshToken</code> is there — no access token.
						That's intentional.
					</li>
				</ul>
			</div>
		</div>
	);
}
```

**Teaching moment:** Open DevTools → Application → Local Storage live. Show that `auth.refreshToken` is the only key. Then explain: _"The access token is in JS memory only. If an attacker exfiltrates localStorage via XSS, they get the refresh token — still bad, but the access token is fresh-only and dies with the tab."_

---

## 6 — Example 3: Protected route + redirect-after-login

`ProtectedRoute` is already wired around `/ex4` in `App.jsx`. This page demonstrates the round-trip: anonymous → kicked to login → back to where you were going.

**CodeSandbox-ready** — Create `src/pages/Ex3Protected.jsx`.

```jsx
// src/pages/Ex3Protected.jsx
// This page is NOT itself protected — it just links into the protected area.
// The ProtectedRoute logic lives in src/auth/ProtectedRoute.jsx and is
// applied in App.jsx around the /ex4 route.

import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Ex3Protected() {
	const { user } = useAuth();

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">3 · Protected route</h1>
			<p className="text-sm text-slate-600 mb-4">
				The route <code className="bg-slate-100 px-1 rounded">/ex4</code> is wrapped in{' '}
				<code className="bg-slate-100 px-1 rounded">&lt;ProtectedRoute&gt;</code>. Click below to try it.
			</p>
			<Link
				to="/ex4"
				className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors">
				Go to /ex4 (Profile) →
			</Link>
			<div className="mt-6 p-4 bg-slate-100 border border-slate-200 rounded-lg text-sm">
				<p className="font-semibold mb-1">Current state</p>
				<p>
					{user
						? `Authenticated as ${user.firstName} — clicking the link goes straight to /ex4.`
						: 'Anonymous — clicking the link will redirect you to /login, then back here after login.'}
				</p>
			</div>
		</div>
	);
}
```

**Classroom exercise — do this in three takes:**

1. Logged out → click → bounced to `/login`. Sign in. Land back on `/ex4`. _"Where did the page remember to come back?"_ → `useLocation().state.from`.
2. Already logged in → click → straight to `/ex4`. No redirect.
3. While on `/ex4`, log out via the badge → instantly redirected to `/login`. _"What triggered that redirect?"_ → `user` becoming `null` re-renders `ProtectedRoute`, which now returns `<Navigate>`.

---

## 7 — Example 4: /auth/me — server-verified identity

Until now, `user` comes from the login response. That's fine — but it's a snapshot. To prove the session is still live, hit `/auth/me` with the access token. A 401 here means the token expired between login and now.

**CodeSandbox-ready** — Create `src/pages/Ex4Profile.jsx`.

```jsx
// src/pages/Ex4Profile.jsx
// Wrapped in <ProtectedRoute> in App.jsx, so we know `user` is non-null here.
// We hit /auth/me to demonstrate that we trust the SERVER's view of the session,
// not our local cache. If /auth/me returns 401, we surface it — Example 5
// will show how to recover via refresh.

import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getMe } from '../services/authApi';
import { ErrorMsg, Loading } from '../components/StatusMessage';

export default function Ex4Profile() {
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
			<h1 className="text-2xl font-bold mb-6">4 · Profile</h1>
			<section className="bg-white border border-slate-200 rounded-xl p-6 mb-4">
				<h2 className="text-sm font-semibold text-slate-500 mb-3">From AuthContext (login response)</h2>
				<p>
					{user.firstName} {user.lastName} — <span className="text-slate-400">@{user.username}</span>
				</p>
			</section>
			<section className="bg-white border border-slate-200 rounded-xl p-6">
				<h2 className="text-sm font-semibold text-slate-500 mb-3">From /auth/me (server-verified)</h2>
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
							<span className="text-slate-400">gender:</span> {serverUser.gender}
						</p>
					</div>
				)}
			</section>
			<div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
				<p className="font-semibold mb-1">⚠️ Failure mode</p>
				<p>
					If the access token expires (15–30 min in production), this page would currently surface the 401 as a hard error.
					Example 5 wraps fetch in a refresh-on-401 helper that recovers transparently.
				</p>
			</div>
		</div>
	);
}
```

---

## 8 — Example 5: Token refresh on 401 + safe logout

Production auth APIs answer 401 to expired tokens. The right pattern:

1. Detect 401.
2. Call `/auth/refresh` to get a new access token.
3. Retry the original request **once** with the new token.
4. If refresh itself fails → log the user out (the session really is dead).
5. **Concurrent requests during step 2 must share one refresh promise** — otherwise a page with 5 parallel requests fires 5 refreshes and races.

**Excerpt** — Anatomy of `fetchWithAuth`. Wired into a live page below.

```jsx
// Module-level: shared across every caller. Resets to null when the refresh settles.
let refreshPromise = null;

export async function fetchWithAuth(url, init, { accessToken, onTokens, onLogout }) {
	const attempt = (tok) =>
		fetch(url, {
			...init,
			headers: { ...init?.headers, Authorization: `Bearer ${tok}` },
		});

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

The full page below wires this together with a "simulate expired token" button that swaps the in-memory access token for a known-bad one — clicking "Verify session" then triggers the refresh flow live.

**CodeSandbox-ready** — Create `src/pages/Ex5RefreshLogout.jsx`.

```jsx
// src/pages/Ex5RefreshLogout.jsx
// Demonstrates:
//   - fetchWithAuth: 401 → /auth/refresh → retry the original request once
//   - Concurrent-safety: a single in-flight refreshPromise is shared
//   - Hard logout: refresh failure clears all auth state via context
//
// To see it work: log in (Ex2), come here, "Break access token", "Verify session".
// Network panel will show: GET /auth/me 401 → POST /auth/refresh 200 → GET /auth/me 200.

import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { refresh as refreshApi } from '../services/authApi';
import { tokenStorage } from '../services/tokenStorage';
import { ErrorMsg, Loading } from '../components/StatusMessage';

// Module-level: shared across every caller. Resets to null when the refresh settles.
let refreshPromise = null;

export default function Ex5RefreshLogout() {
	const { user, accessToken, logout, updateTokens } = useAuth();
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

	if (!user) {
		return (
			<div>
				<h1 className="text-2xl font-bold mb-2">5 · Refresh & Logout</h1>
				<p className="text-sm text-slate-500">
					Sign in via <code className="bg-slate-100 px-1 rounded">/ex2</code> first to try this demo.
				</p>
			</div>
		);
	}

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">5 · Refresh & Logout</h1>

			<div className="flex flex-wrap gap-2 mb-6">
				<button
					onClick={() => setOverrideToken('this.is.broken')}
					className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg cursor-pointer">
					🪓 Break access token
				</button>
				<button
					onClick={verifySession}
					disabled={loading}
					className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50">
					🔍 Verify session (/auth/me)
				</button>
				<button
					onClick={logout}
					className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm px-4 py-2 rounded-lg cursor-pointer">
					🚪 Logout
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
					{JSON.stringify({ id: result.id, email: result.email, username: result.username }, null, 2)}
				</pre>
			)}
		</div>
	);
}
```

**Walk through live with the Network tab open:**

1. Click "Break access token" → token in state is now garbage.
2. Click "Verify session" → watch:
   - `GET /auth/me` → **401**
   - `POST /auth/refresh` → **200**
   - `GET /auth/me` → **200** (retry succeeds)
3. Click "Logout" → all state cleared, NavBar updates instantly, refresh token gone from localStorage.

**Production note — what's still missing for a real app:** every API call should go through `fetchWithAuth`, not just this one route. The standard pattern is to build it into your API client (`apiGet`, `apiPost` from the backend lesson) so refresh-on-401 is automatic everywhere. We left it inline here to keep the example readable.

---

## 9 — Production Integration Templates

Once you're comfortable with the pattern, swap the dummyjson layer for a real backend. The `AuthContext` and `ProtectedRoute` don't change — only `services/authApi.js` does. **That's the payoff of the architecture.**

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

## 10 — Security Critical Points

| ❌ Don't                                      | ✅ Do                                                 |
| --------------------------------------------- | ----------------------------------------------------- |
| Store the **access token** in `localStorage`  | Keep access tokens in **memory** (provider state)     |
| Trust client-side auth alone                  | Validate every protected request **on the server**    |
| Render protected UI before checking session   | Show a loading state while `AuthProvider` initializes |
| Rely on a single login response forever       | Verify with `/auth/me` and handle 401 → refresh       |
| Fire 5 refresh requests for 5 concurrent 401s | Share **one** in-flight refresh promise               |
| Log raw tokens or full responses              | Redact tokens in logs and error reports               |
| Hardcode endpoints/secrets                    | Use env vars (`VITE_AUTH_BASE_URL`)                   |
| Skip HTTPS                                    | Always HTTPS in production — no exceptions            |

---

## 11 — Sprint Deliverables

|          | Deliverable                                  | Pattern                                            |
| -------- | -------------------------------------------- | -------------------------------------------------- |
| ✅       | `AuthContext` + `useAuth`                    | Single global source of identity                   |
| ✅       | Persistent session on reload                 | refresh-token-on-mount → `/auth/me`                |
| ✅       | Login flow with loading + error states       | `useAuth().login()` + `useAuth().error`            |
| ✅       | `<ProtectedRoute>` with redirect-after-login | `state.from` round-trip                            |
| ✅       | Logout clears all auth state                 | `tokenStorage.clear()` + provider reset            |
| ✅       | Refresh-on-401 with single in-flight promise | `fetchWithAuth` wrapper                            |
| 🎁 Bonus | Role-based access (e.g. user/admin)          | Extend `ProtectedRoute` with a `requiresRole` prop |
| 🎁 Bonus | Replace dummyjson with Sanctum or Firebase   | One-file change in `services/authApi.js`           |
| 🎁 Bonus | Registration flow                            | Mirror `login` in context + new `Register` page    |

---

## 12 — Atelier Practice

### The Sprint Rhythm

```
┌─────────────────────────────────────────────────────────┐
│ DAY 1: Login + Context                                  │
│   • Build the scaffold (Section 3)                      │
│   • Wire AuthContext + useAuth (Ex1 → Ex2)              │
│   • Verify session survives reload                      │
├─────────────────────────────────────────────────────────┤
│ DAY 2: Routes + Verification + Refresh                  │
│   • ProtectedRoute with redirect-after-login (Ex3)      │
│   • Server verification via /auth/me (Ex4)              │
│   • Refresh-on-401 + safe logout (Ex5)                  │
├─────────────────────────────────────────────────────────┤
│ DAY 3: Security Review                                  │
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

## 13 — Atelier Reflections

> 💭 _Which threat model did you assume? What is the most realistic attack on **your** project — XSS, CSRF, stolen device, social engineering?_

> 💭 _Where did AI help — and where would following AI blindly create a security bug?_

> 💭 _The naive Example 1 felt like it worked. What does this teach you about "it works on my machine" as a quality bar for auth code?_

> 💭 _If you swapped dummyjson for Laravel Sanctum, which files change? Which don't? What does that tell you about good architecture?_

### Koan

> _"If convenience defeats security, you built a demo — not a system."_

---

## 🔗 Lesson Navigation

| Previous                                             | Current            | Next                         |
| ---------------------------------------------------- | ------------------ | ---------------------------- |
| [Backend Integration](../react-backend-integration/) | **Authentication** | [Testing](../react-testing/) |

---

## References

-[https://dev.to/edriso/react-router-loaders-actions-form-2bbe](https://dev.to/edriso/react-router-loaders-actions-form-2bbe)

> _"Trust is earned in drops and lost in buckets. Auth code is no different."_
