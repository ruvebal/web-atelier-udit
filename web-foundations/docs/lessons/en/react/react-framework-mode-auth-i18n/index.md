---
layout: lesson
title: 'Framework Mode in practice: SSR auth & i18n with React Router v7'
slug: react-framework-mode-auth-i18n
category: react
tags:
 [
  react,
  react-router,
  framework-mode,
  ssr,
  authentication,
  jwt,
  cookies,
  i18n,
  localization,
  tailwind,
  helios-deck,
 ]
week: 11
phase: 3
sprint: 12
date: 2026-05-04
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/react-framework-mode-auth-i18n/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents

{: .no_toc }

- TOC
  {:toc}

<!-- prettier-ignore-end -->

> _"The session lives at the source. The server greets the user; the browser only sees the room already lit."_
> — Tao of the Webapp Master

---

## How this lesson is built

This is the **production rebuild** of the [Authentication](../react-authentication/) lesson. The CodeSandbox version proved a small thesis — _swap the provider body, keep its shape_. This lesson proves a bigger one:

> _When auth and routing both move to the server, classes of bugs disappear. There is no "flash of unauthenticated content". There is no `localStorage`-stolen-by-XSS. There is no "session restored, then `/auth/me` 401, then silent logout"._

Three lessons converge here:

1. **Routing — Act 2** ([react-routing](../react-routing/)) gave you the **Framework Mode** vocabulary: `routes.js` registry, route modules, loaders, actions, `react-router.config.js`, `vite.config.js`. We assume that setup is familiar.
2. **Authentication** ([react-authentication](../react-authentication/)) gave you the **auth domain**: dummyjson, JWT + refresh, `ProtectedRoute`, `RoleGuard`. We keep the same backend; we move the work to the server.
3. **ADADI.org** (your professor's production site) gives you the **i18n pattern**: `:locale` parameter, parallel EN/ES route trees, server-side `i18n.server.js` resolver. We port it deliberately.

> _"What changes in this lesson is not the user's experience — it is the trust boundary. Auth that lived in the browser now lives where it belongs: behind a cookie the browser cannot read."_

If you skipped Routing Act 2, do its scaffold first. If you skipped Authentication, do at least Sections 1–4 — you need the dummyjson mental model before this lesson rebuilds the plumbing.

**Non-negotiable teaching moment.** This lesson fixes the Declarative **`/auth/me` + refresh** story on the server — but it **deliberately accepts option (a)** for how refreshed tokens get back into the **browser cookie** (lazy refresh may lag one navigation until `Set-Cookie` runs). Read **§1.3** before class and **§5.7** at the board; say the caveat out loud. The closing table in **§9** names the same trade-off again so you cannot "forget" it while grading.

---

## Sandbox setup — leaving the sandbox

There is **no CodeSandbox** for this lesson. SSR needs a node process; CodeSandbox can run one but the friction adds up. We work in a **local Vite project**, the same way ADADI is developed. Ten minutes of setup buys you everything Framework Mode is for.

This lesson uses two new code-block conventions:

- **Project-ready** — paste at the labeled path; runs after `npm install` + `npm run dev`. Replaces "CodeSandbox-ready" because there is no sandbox.
- **Excerpt** — illustrative; relies on surrounding modules.
- **Template** — replace `[BRACKETED]` values for your environment.

---

## 🎯 Sprint Goal

Rebuild the dummyjson auth flow as a **server-side rendered React Router v7 application**, with **httpOnly cookie sessions**, **server-enforced route guards**, and **bilingual `:locale` URLs**. End the class with a working app at `http://localhost:3000/en/deck` and `http://localhost:3000/es/deck` — same component, locale resolved server-side, no flash, no `localStorage`.

---

## 📍 Position in the journey

| Sprint           | Focus                            | What survives into this lesson                                               |
| ---------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| 8 — Routing      | URLs, guards, layouts, `routes.js` | The route registry pattern; `route()`, `index()`, layouts                  |
| 9 — Auth         | Sessions, tokens, dummyjson      | The dummyjson endpoints; `ProtectedRoute` _shape_; the JWT + refresh dance   |
| 10 — State arch. | Context, stores, scale           | Why server data is not Context data                                          |
| **→ 11 — FW + i18n** | **SSR + cookies + bilingual URLs** | **Everything below the components: storage, fetch, guards, locale**     |
| 12+              | Performance, deployment          | The PM2 + nginx target you already partially configure here                  |

---

## 🧭 Learning Objectives

By the end of this 3-hour class, you will:

- [ ] Explain what changes when auth moves from the browser to the server, in concrete terms (storage, guards, fetch, redirects).
- [ ] Configure a local **React Router v7 Framework Mode** project with SSR enabled.
- [ ] Define a complete URL map in `app/routes.js` using the **`:locale` parameter** pattern.
- [ ] Write a **route module** that exports `default`, `loader`, `action`, and `meta`.
- [ ] Implement an **httpOnly cookie session** with `createCookieSessionStorage` (signed, secure).
- [ ] Build `requireUser(request)` and `requireRole(request, role)` as **loader-side guards**.
- [ ] Resolve the **`/auth/me` 401 silent-logout bug** from the Declarative lesson by atomic refresh-and-retry inside a loader.
- [ ] **Name the cookie-commit caveat out loud** (§1.3, §5.7): after a lazy refresh, new tokens may not be written to `Set-Cookie` until the next response — production fixes this with (b) or (c); this lesson deliberately accepts (a).
- [ ] Port the **ADADI `i18n.server.js`** pattern: `:locale` parameter validation, locale cookie, fallback.
- [ ] Compare **generic `:locale` routes** (one tree, two paths) with **slug-aliased EN/ES trees** (two trees, localized URLs) and choose deliberately.
- [ ] Identify what carries over from the Declarative auth lesson and what is replaced.

---

## 1 — Why move to Framework Mode for auth?

> _"Every layer that holds a token is a layer that can leak it. Push the secret deep enough and the surface forgets it ever existed."_
> — Tao of the Webapp Master

The Declarative auth lesson worked. It also left **four problems unsolved on purpose**, and the lesson said so plainly. This lesson solves all four.

### 1.1 The four problems Declarative auth never solved

| Problem | Declarative behaviour | Why it persists | Framework Mode answer |
| ------- | --------------------- | --------------- | --------------------- |
| **Token storage** | `accessToken` in React state, `refreshToken` in `localStorage` | No backend exists to set `Set-Cookie` | **httpOnly cookie**, signed by `SESSION_SECRET`, set by your loader/action — the browser cannot read it from JS |
| **Flash of unauthenticated content** | `isLoading=true` on mount → spinner → maybe protected UI | The browser renders before `/auth/refresh` completes | **Loader runs before render** — the response is already authenticated HTML, no flash |
| **XSS reads tokens** | Any third-party script can read `localStorage` | localStorage is JS-readable | The cookie is `httpOnly` — invisible to `document.cookie` and any injected script |
| **`/auth/me` 401 silent logout** | `refresh` ok → `getMe` 401 → `catch` clears storage → user is logged out without a reason | The catch is too broad and runs only on the client | The loader handles the refresh-and-retry **atomically** before responding; on hard failure, redirect to login with an explicit `?reason=session-expired` flag |

> _Notice no item says "JWT vs session" — we still use dummyjson's JWT + refresh._ The change is **where the tokens live** and **who reads them**, not the protocol.

### 1.2 What you also gain (and were not promised)

Framework Mode is not a security upgrade in disguise. It is a **rendering and data orchestration upgrade** that happens to fix auth-shaped bugs as a side effect. Other gains:

- **`meta` per route** — proper `<title>` and Open Graph without `react-helmet`.
- **Automatic code splitting** per route module.
- **`<Form method="post">`** — accessible by default, works without JavaScript loaded.
- **Loaders for data** — your protected pages no longer wait for `useEffect` to fire before they fetch.

We will not lean on every feature in three hours. We will lean on **loaders, actions, sessions, and `meta`** because they are what auth + i18n need.

### 1.3 Teaching caveat — lazy refresh and the `Set-Cookie` header

This lesson's `getOptionalUser` calls `verifyOrRefresh`. When the access token is stale, dummyjson's `/auth/refresh` returns **new** `accessToken` + `refreshToken`. In the patched code we `session.set(...)` those values in memory — but **`commitSession` only runs when a loader or action returns a `Response` that appends `Set-Cookie`**. If `getOptionalUser` runs inside a loader that never calls `commitSession`, the **browser cookie may still hold the old refresh token until the next navigation** that commits the session.

That is **not a security hole for the user** in this demo (the in-memory session object still has the fresh tokens for the rest of that request). It **is** a production footgun: multi-tab use, server restarts, or horizontal scaling without a shared session store will expose the gap.

**Three honest production options — say them aloud in class:**

| Option | What you do | When teams pick it |
| ------ | ------------- | ------------------ |
| **(a) Accept "next request persists the cookie"** | Mutate the session object; commit on the next `action` / explicit `commitSession` return | **This lesson** — three hours, minimal plumbing |
| **(b) Request-scoped session + commit on every Response** | Wrap `loader`/`action` in a helper that always merges `Set-Cookie` from `commitSession(session, data)` | Mid-size apps, single codebase |
| **(c) Proactive refresh** | Background job or middleware refreshes before expiry so `/auth/me` rarely 401s; cookie updates on login/logout only | **ADADI-style production** — fewer lazy refresh paths |

> **Instructor script (verbatim is fine):** _"We fixed the silent client logout. We did not fix every distributed-system edge case in one afternoon. If you ship (a), document it. If you ship production, budget for (b) or (c)."_

This caveat is repeated at the end of §5.7 next to the code that triggers it.

---

## 2 — Project setup

> _"Leaving the sandbox is the first lesson. The second is recognising the file the sandbox was hiding from you."_

The setup mirrors the routing lesson's Act 2 word-for-word; we summarise here. If anything below is unfamiliar, read [react-routing](../react-routing/) §Act 2 first.

### 2.1 Create the project

```bash
npx create-react-router@latest helios-deck-fw
cd helios-deck-fw
npm install
```

Pick **JavaScript** when asked (the templates default to TypeScript; for this course we use plain JavaScript files — `.js` and `.jsx`).

> If your version of `create-react-router` only ships TypeScript, accept TS, then rename `.ts → .js` and `.tsx → .jsx` and remove every type annotation. The official template keeps types thin precisely because removal is cheap. The class repository lists the exact diff.

### 2.2 Add Tailwind v4 + the lesson dependencies

```bash
npm install tailwindcss @tailwindcss/vite
```

That is the entire dependency list for today. `react-router`, `@react-router/node`, `@react-router/serve`, `@react-router/dev`, and `isbot` came with the template.

### 2.3 `react-router.config.js`

**Project-ready** — Replace the contents of `react-router.config.js` (or create it).

```js
// react-router.config.js
// SSR is the whole point of this lesson.
export default {
	ssr: true,
};
```

### 2.4 `vite.config.js`

**Project-ready** — Replace the contents of `vite.config.js`.

```js
// vite.config.js
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [reactRouter(), tailwindcss()],
});
```

### 2.5 `app/app.css`

**Project-ready** — Replace the contents of `app/app.css`.

```css
@import 'tailwindcss';
```

### 2.6 `app/root.jsx` — the HTML shell

**Project-ready** — Replace the contents of `app/root.jsx`.

```jsx
// app/root.jsx
// The root is the only place the full HTML document lives.
// Every <Meta /> from a route module is collected and rendered here.
// Every <Links /> too. <Outlet /> is where matched routes render.
//
// We export a root loader that returns the active locale and the current user
// (or null). Any descendant route can read it via useRouteLoaderData('root').

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import './app.css';
import { getOptionalUser } from './utils/session.server';
import { resolveLocale } from './utils/i18n.server';

export async function loader({ request, params }) {
	const locale = await resolveLocale({ request, params });
	const user = await getOptionalUser(request);
	return { locale, user };
}

export default function Root() {
	return (
		<html lang="en" className="bg-slate-50">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="font-sans text-slate-900">
				<Outlet />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
```

> The two helpers (`getOptionalUser`, `resolveLocale`) do not exist yet. Sections 5 and 6 build them. Until then, `npm run dev` will fail at import resolution — that is fine for now; we wire bottom-up in this lesson.

### 2.7 `package.json` scripts

If your template did not already add them, ensure these exist:

```jsonc
{
	"scripts": {
		"dev": "react-router dev",
		"build": "react-router build",
		"start": "react-router-serve ./build/server/index.js"
	}
}
```

`npm run dev` is your inner loop today. `npm run build && npm run start` is the deploy preview.

---

## 3 — `app/routes.js` — the central registry

> _"Open one file. See the whole map. The student who can summarise an app from `routes.js` alone is the student who has understood it."_

### 3.1 Two-page minimal scope

We deliberately ship a **small app** today: enough to teach SSR auth and i18n in three hours, not so much that we drown the patterns in repetition.

| Path | Purpose | Guard |
| ---- | ------- | ----- |
| `/:locale` | Locale landing — links to login + deck | none |
| `/:locale/login` | Login form | none (redirects to `/:locale/deck` if already signed in) |
| `/:locale/deck` | Protected page — shows current user from session | `requireUser` |
| `/:locale/admin` | Role-protected page | `requireRole(_, 'admin')` |
| `/logout` | Action-only route (POST clears the cookie) | none — destroys session |
| `/api/healthz` | Resource route (JSON ping) | none — to demonstrate non-page routes |

> **Why no Ex6 / Ex7?** They are the **homework** at the end of this lesson (§10). Today we focus on the architecture — porting one example each is the muscle-memory exercise.

### 3.2 The Declarative-to-Framework diff

Side-by-side reminder for clever students:

| Declarative (auth lesson) | Framework Mode (this lesson) |
| ------------------------- | ---------------------------- |
| `<Route path="/ex5/login" element={<Ex5Login />} />` | `route(':locale/login', './routes/$locale/login.jsx')` |
| `<ProtectedRoute>` JSX guard | `requireUser(request)` inside the loader |
| `RoleGuard role="admin"` JSX guard | `requireRole(request, 'admin')` inside the loader |
| `<Routes>` + `<Route>` JSX | `route()`, `index()`, `layout()` from `@react-router/dev/routes` |

### 3.3 `app/routes.js` — Project-ready

**Project-ready** — Create `app/routes.js`.

```js
// app/routes.js
// Central route registry. Every URL the app responds to lives here.
//
// Pattern: generic `:locale` parameter, validated server-side in resolveLocale().
// One tree, two paths (/en/... and /es/...). Section 6 contrasts this with the
// slug-aliased pattern (/en/profile vs /es/perfil) used by ADADI.

import { index, layout, prefix, route } from '@react-router/dev/routes';

export default [
	// /logout — action-only (no UI, just clears the session cookie)
	route('logout', './routes/logout.js'),

	// /api/healthz — resource route, returns JSON
	route('api/healthz', './routes/api/healthz.js'),

	// /:locale/* — every page lives under a locale prefix
	...prefix(':locale', [
		layout('./routes/$locale/layout.jsx', [
			index('./routes/$locale/_index.jsx'),
			route('login', './routes/$locale/login.jsx'),
			route('deck', './routes/$locale/deck.jsx'),
			route('admin', './routes/$locale/admin.jsx'),
		]),
	]),

	// Catch-all 404
	route('*', './routes/$.jsx'),
];
```

> `prefix(':locale', ...)` is sugar for putting every nested route under `:locale/`. We use it because the locale is **always** in the URL — never inferred from a header alone (good for sharability and SEO).

---

## 4 — Route modules: the four exports

> _"A route module answers four questions: what is on this page, what data does it need, what writes does it accept, and what should the browser show in its tab. The rest is decoration."_

A route module is just a JavaScript file. What makes it _routed_ is which **named exports** it provides:

| Export | Runs when | Purpose |
| ------ | --------- | ------- |
| `default` | Always | The React component (renders with loader data). |
| `loader` | On GET, on hydration if data is stale | Server-side data fetching + redirects + auth guards. |
| `action` | On POST/PUT/PATCH/DELETE | Server-side mutations (forms, logout, etc). |
| `meta` | On render | Returns an array of `<meta>` / `<title>` descriptors. |
| `ErrorBoundary` | On thrown errors | UI for `throw new Response(...)` and runtime errors. |
| `links` | On render | Adds `<link>` tags (preload, stylesheets per route). |

This lesson uses the **first four**. `ErrorBoundary` and `links` belong in a follow-up.

### Example skeleton (Excerpt)

```jsx
// Excerpt — generic route module shape
export const meta = ({ data }) => [
	{ title: data?.title ?? 'My route' },
	{ name: 'description', content: 'A route module example' },
];

export async function loader({ request, params }) {
	return { title: 'Hello, world' };
}

export async function action({ request, params }) {
	const formData = await request.formData();
	return { ok: true, name: formData.get('name') };
}

export default function MyRoute({ loaderData, actionData }) {
	return <h1>{loaderData.title}</h1>;
}
```

> **Argument shape changed in v7.** Component receives **props** (`{ loaderData, actionData, params }`) — no `useLoaderData()` hook required. Both APIs work; props are slightly clearer and we use them throughout this lesson.

---

## 5 — Server-side auth (the headline section)

> _"The browser is the visitor. The cookie is the bracelet. The server is the door. Authentication has always been three rooms — we were just running all three on the dance floor."_

This is the longest section because it carries the lesson's headline. We build, in order:

1. **`session.server.js`** — `createCookieSessionStorage` + `requireUser` + `requireRole` + `getOptionalUser`.
2. **`authApi.server.js`** — server-only `fetch` against dummyjson; never imported into a component.
3. **`login.jsx`** — UI + `action` that calls dummyjson and writes the session cookie.
4. **`logout.js`** — action-only route that destroys the cookie.
5. **`deck.jsx`** — protected page; loader uses `requireUser`.
6. **`admin.jsx`** — role-protected page; loader uses `requireRole`.
7. **The `/auth/me` 401 fix** — explicit refresh-and-retry inside the loader.

### 5.1 `app/utils/session.server.js`

The `.server.js` suffix is a **convention**: React Router (and your editor) treat any module ending in `.server.js` / `.server.jsx` as **server-only**. Importing one from a client-only module errors at build time. This protects us from accidentally bundling `SESSION_SECRET` into the browser.

**Project-ready** — Create `app/utils/session.server.js`.

```js
// app/utils/session.server.js
// One module owns every read/write of the session cookie.
// Components never import this directly — they go through loaders/actions.

import { createCookieSessionStorage, redirect } from 'react-router';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
	// Loud fail in development; missing secret is a deploy bug, not a UX bug.
	throw new Error('SESSION_SECRET is not set. See infra/.env.example.');
}

const storage = createCookieSessionStorage({
	cookie: {
		name: 'helios_session',
		secrets: [sessionSecret],
		httpOnly: true, // browser JS cannot read this cookie
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 7, // 7 days
	},
});

/** Read the session from the request — never returns null. */
export function getSession(request) {
	return storage.getSession(request.headers.get('Cookie'));
}

/**
 * Persist a fully populated session and return a Response that sets the cookie.
 * Use as: return commitSession(session, redirect('/en/deck'))
 */
export async function commitSession(session, response = new Response()) {
	const headers = new Headers(response.headers);
	headers.append('Set-Cookie', await storage.commitSession(session));
	return new Response(response.body, { status: response.status, headers });
}

/** Destroy the session and return a Response that clears the cookie. */
export async function destroySession(session, response = new Response()) {
	const headers = new Headers(response.headers);
	headers.append('Set-Cookie', await storage.destroySession(session));
	return new Response(response.body, { status: response.status, headers });
}

/**
 * Read the user out of the session — null if none.
 * Loaders that don't require auth (login, public pages) call this.
 */
export async function getOptionalUser(request) {
	const session = await getSession(request);
	const user = session.get('user');
	return user ?? null;
}

/**
 * Loader-side guard: redirect to login if no user.
 * Throws a Response, which React Router routes correctly.
 */
export async function requireUser(request, { loginPath = '/en/login' } = {}) {
	const user = await getOptionalUser(request);
	if (!user) {
		const url = new URL(request.url);
		const search = new URLSearchParams({ from: url.pathname });
		throw redirect(`${loginPath}?${search}`);
	}
	return user;
}

/** Loader-side role guard. Composes with requireUser. */
export async function requireRole(request, role, options = {}) {
	const user = await requireUser(request, options);
	if (user.role !== role) {
		throw new Response('Forbidden', { status: 403 });
	}
	return user;
}
```

> **Why `throw redirect(...)`?** In React Router v7, `redirect()` returns a `Response`. `throw`ing it bubbles up to the framework, which sends the redirect to the browser. The loader's caller never sees the throw — perfect for guards.

### 5.2 `app/utils/authApi.server.js`

Same shape as the Declarative lesson's `authApi.js` — same dummyjson endpoints, same `parseOrThrow` helper. **The only difference**: it lives in `.server.js`, so route modules import it freely from loaders and actions but never from components.

**Project-ready** — Create `app/utils/authApi.server.js`.

```js
// app/utils/authApi.server.js
// Server-only — never imported by a component.

const BASE = 'https://dummyjson.com/auth';

async function parseOrThrow(res) {
	const data = await res.json().catch(() => ({}));
	if (!res.ok) {
		const err = new Error(data.message || `HTTP ${res.status}`);
		err.status = res.status;
		throw err;
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
}

export async function getMe(accessToken) {
	const res = await fetch(`${BASE}/me`, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});
	return parseOrThrow(res);
}

export async function refresh(refreshToken) {
	const res = await fetch(`${BASE}/refresh`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
	});
	return parseOrThrow(res);
}
```

### 5.3 The login route module

The login page is a **route module with both a `loader` and an `action`**:

- The **loader** redirects to `/:locale/deck` if the user is already signed in (no need to show a login form to a logged-in user).
- The **action** receives the form POST, calls dummyjson, writes the session cookie, redirects.

**Project-ready** — Create `app/routes/$locale/login.jsx`.

```jsx
// app/routes/$locale/login.jsx
// SSR login. The form posts to this same URL; React Router routes it to action.

import { Form, redirect } from 'react-router';
import * as authApi from '../../utils/authApi.server';
import { commitSession, getOptionalUser, getSession } from '../../utils/session.server';
import { tFor } from '../../utils/i18n.server';

export const meta = ({ data }) => [{ title: data?.t.loginTitle ?? 'Sign in' }];

export async function loader({ request, params }) {
	const user = await getOptionalUser(request);
	if (user) throw redirect(`/${params.locale}/deck`);
	const t = await tFor(params.locale);
	return { t };
}

export async function action({ request, params }) {
	const form = await request.formData();
	const username = String(form.get('username') ?? '').trim();
	const password = String(form.get('password') ?? '');

	if (!username || !password) {
		return { error: 'Username and password are required.' };
	}

	try {
		const result = await authApi.login({ username, password });
		// Strip the tokens from what we put in the session — only userId + role + tokens.
		const session = await getSession(request);
		session.set('user', {
			id: result.id,
			username: result.username,
			email: result.email,
			firstName: result.firstName,
			lastName: result.lastName,
			role: result.role,
			image: result.image,
		});
		session.set('accessToken', result.accessToken);
		session.set('refreshToken', result.refreshToken);

		const from = new URL(request.url).searchParams.get('from');
		const target = from && from.startsWith(`/${params.locale}/`) ? from : `/${params.locale}/deck`;
		return commitSession(session, redirect(target));
	} catch (e) {
		return { error: e.message || 'Login failed' };
	}
}

export default function Login({ loaderData, actionData, params }) {
	const { t } = loaderData;
	return (
		<main className="max-w-md mx-auto p-8">
			<h1 className="text-2xl font-bold mb-2">{t.loginTitle}</h1>
			<p className="text-sm text-slate-500 mb-6">{t.loginSubtitle}</p>
			<Form method="post" className="space-y-3">
				<label className="block">
					<span className="text-sm font-medium">{t.username}</span>
					<input
						name="username"
						defaultValue="emilys"
						required
						autoComplete="username"
						className="mt-1 w-full rounded-lg border border-slate-300 p-2"
					/>
				</label>
				<label className="block">
					<span className="text-sm font-medium">{t.password}</span>
					<input
						name="password"
						type="password"
						defaultValue="emilyspass"
						required
						autoComplete="current-password"
						className="mt-1 w-full rounded-lg border border-slate-300 p-2"
					/>
				</label>
				<button
					type="submit"
					className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold">
					{t.signIn}
				</button>
				{actionData?.error && <p className="text-sm text-rose-600">{actionData.error}</p>}
			</Form>
			<p className="text-xs text-slate-400 mt-4">
				{t.tryHint} <code className="bg-slate-100 px-1 rounded">emilys</code> /{' '}
				<code className="bg-slate-100 px-1 rounded">emilyspass</code>
			</p>
		</main>
	);
}
```

> **No `LoginForm.jsx` component, no `AuthContext`, no `useState` for credentials.** The browser's native form posts to the action. The form **works without JavaScript** — it would even submit on a no-JS browser. That is the SSR dividend.

### 5.4 The logout route

**Project-ready** — Create `app/routes/logout.js`.

```js
// app/routes/logout.js
// Action-only — no UI. POST /logout clears the cookie.

import { redirect } from 'react-router';
import { destroySession, getSession } from '../utils/session.server';

export async function action({ request }) {
	const session = await getSession(request);
	return destroySession(session, redirect('/en/login'));
}

export function loader() {
	throw redirect('/en');
}
```

A `<Form method="post" action="/logout">` button anywhere in the app logs the user out.

### 5.5 The deck route — protected

**Project-ready** — Create `app/routes/$locale/deck.jsx`.

```jsx
// app/routes/$locale/deck.jsx
// Loader-side guard. If no user, requireUser throws a redirect to /:locale/login.
// The component renders only when guard passed; loaderData.user is non-null.

import { Form } from 'react-router';
import { requireUser } from '../../utils/session.server';
import { tFor } from '../../utils/i18n.server';

export const meta = ({ data }) => [{ title: `${data?.user.firstName} · ${data?.t.deckTitle}` }];

export async function loader({ request, params }) {
	const user = await requireUser(request, { loginPath: `/${params.locale}/login` });
	const t = await tFor(params.locale);
	return { user, t };
}

export default function Deck({ loaderData }) {
	const { user, t } = loaderData;
	return (
		<main className="max-w-2xl mx-auto p-8">
			<h1 className="text-2xl font-bold mb-2">{t.deckTitle}</h1>
			<p className="text-sm text-slate-500 mb-6">
				{t.signedInAs} <strong>{user.firstName} {user.lastName}</strong> ({user.role}).
			</p>
			<div className="bg-white border border-slate-200 rounded-xl p-4 mb-4">
				<p className="text-sm text-slate-500">{t.email}</p>
				<p className="font-mono text-sm">{user.email}</p>
			</div>
			<Form method="post" action="/logout">
				<button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-semibold">
					{t.signOut}
				</button>
			</Form>
		</main>
	);
}
```

### 5.6 The admin route — role-protected

**Project-ready** — Create `app/routes/$locale/admin.jsx`.

```jsx
// app/routes/$locale/admin.jsx
// Role guard at the loader. If user.role !== 'admin', throw a 403 Response.
// In production you would render a dedicated 403 ErrorBoundary; we keep it minimal.

import { requireRole } from '../../utils/session.server';
import { tFor } from '../../utils/i18n.server';

export const meta = () => [{ title: 'Admin' }];

export async function loader({ request, params }) {
	const user = await requireRole(request, 'admin', { loginPath: `/${params.locale}/login` });
	const t = await tFor(params.locale);
	return { user, t };
}

export default function Admin({ loaderData }) {
	const { user, t } = loaderData;
	return (
		<main className="max-w-2xl mx-auto p-8">
			<h1 className="text-2xl font-bold mb-2">{t.adminTitle}</h1>
			<p className="text-sm text-slate-600">{t.adminWelcome}, {user.firstName}.</p>
			<div className="mt-6 bg-rose-50 border border-rose-200 rounded-lg p-4 text-sm text-rose-900">
				<p className="font-semibold mb-1">🛡 {t.serverGated}</p>
				<p>{t.serverGatedBody}</p>
			</div>
		</main>
	);
}
```

> Try this in DevTools: open the React tree and edit `user.role` to `'admin'` while signed in as `michaelw`. **Nothing happens.** The page already rendered server-side; the role check has already executed. The Declarative lesson's "defence in depth" warning is now backed by code: the gate is on a different machine.

### 5.7 The `/auth/me` 401 problem, finally solved

> _"The Declarative lesson said: 'never trust localStorage as truth — verify with `/auth/me`.' That advice was correct. The implementation, on the client, was fragile. The server makes it boring."_

**Recap of the bug.** In the Declarative `AuthContext`, the mount effect does:

```jsx
// Excerpt — Declarative auth lesson, simplified
const tokens = await authApi.refresh(stored);
const me = await authApi.getMe(tokens.accessToken);
setUser(me);
// catch → tokenStorage.clear() — silent logout, no reason given
```

Three things go wrong here, in production:

1. **Network glitch on `/auth/me`** → `catch` clears storage → user re-authenticates for nothing.
2. **Clock skew** between dummyjson and the user's machine → fresh access token rejected by accident → silent logout.
3. **No diagnostic in the URL** — the user lands back on `/login` with no `?reason=`, so they think the form is broken.

**The Framework Mode fix** — wrap dummyjson calls in a server-side helper that **refreshes and retries atomically**, and on hard failure **redirects with an explicit reason**.

**Project-ready** — Replace `app/utils/authApi.server.js` with this version (extends 5.2).

```js
// app/utils/authApi.server.js (extended)
// fetchWithAuth — refresh-and-retry on 401, surface the reason on hard failure.

const BASE = 'https://dummyjson.com/auth';

async function parseOrThrow(res) {
	const data = await res.json().catch(() => ({}));
	if (!res.ok) {
		const err = new Error(data.message || `HTTP ${res.status}`);
		err.status = res.status;
		throw err;
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
}

async function getMeOnce(accessToken) {
	const res = await fetch(`${BASE}/me`, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});
	return parseOrThrow(res);
}

async function refreshOnce(refreshToken) {
	const res = await fetch(`${BASE}/refresh`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
	});
	return parseOrThrow(res);
}

/**
 * verifyOrRefresh — server-side equivalent of "is this session still alive?".
 * Returns { user, tokens } if alive (possibly with refreshed tokens),
 * or { error } if dead. Never throws on a 401 from /me alone.
 *
 * This is what the Declarative auth lesson tried to do on mount and got wrong.
 */
export async function verifyOrRefresh({ accessToken, refreshToken }) {
	try {
		const user = await getMeOnce(accessToken);
		return { user, tokens: { accessToken, refreshToken } };
	} catch (e) {
		if (e.status !== 401) {
			return { error: 'network', message: e.message };
		}
	}

	if (!refreshToken) return { error: 'no-refresh-token' };

	try {
		const tokens = await refreshOnce(refreshToken);
		const user = await getMeOnce(tokens.accessToken);
		return { user, tokens };
	} catch (e) {
		return { error: 'refresh-failed', message: e.message };
	}
}
```

Now upgrade `getOptionalUser` in `session.server.js` to use it. **The session is the truth, but the access token might have expired** — verify on every server-rendered page. (For a high-traffic app, cache for ~30s; for this lesson, verify on every load — clarity beats throughput today.)

**Project-ready** — Replace `getOptionalUser` in `app/utils/session.server.js`.

```js
// app/utils/session.server.js — patched getOptionalUser
import { verifyOrRefresh } from './authApi.server';

export async function getOptionalUser(request) {
	const session = await getSession(request);
	const userInSession = session.get('user');
	const accessToken = session.get('accessToken');
	const refreshToken = session.get('refreshToken');

	if (!userInSession || !accessToken) return null;

	const result = await verifyOrRefresh({ accessToken, refreshToken });

	if (result.error) {
		// Hard failure — destroy the session so the next request goes to /login
		// with a clean state. We do NOT redirect from here; the caller does.
		return null;
	}

	// Refresh wrote new tokens — update the session if so.
	if (result.tokens.accessToken !== accessToken) {
		session.set('accessToken', result.tokens.accessToken);
		session.set('refreshToken', result.tokens.refreshToken);
		// We can't commit here without a Response object; the loader chain
		// will commit on the way out. For this lesson, we accept that the
		// new tokens are visible from next request — good enough.
		// In production, you'd thread a Headers object through and commit.
	}

	session.set('user', result.user);
	return result.user;
}
```

#### Caveat (same as §1.3) — why the cookie might lag one navigation

The comment inside `getOptionalUser` — _"new tokens are visible from next request"_ — is deliberate. **`session.set` mutates the in-memory session** attached to this request. **`storage.commitSession(session)`** (which writes `Set-Cookie`) only runs when **your** `loader` or `action` returns through a path that calls `commitSession(session, ...)`.

So after a lazy refresh inside `getOptionalUser`:

- **This response** can still render the correct `user` (read from `result.user`).
- **The browser's cookie file** might still list the **old** refresh token until a later response commits the updated session.

**Three production-grade fixes** (pick one before you scale past one server):

1. **(a) Accept one navigation of lag** — what this lesson ships. Fine for teaching; document it in your README.
2. **(b) Thread `commitSession` through** — every loader that calls `getOptionalUser` and detects token rotation returns `commitSession(session, json(...))` instead of a bare `json(...)`. More boilerplate; correct cookie every time.
3. **(c) Proactive refresh** — refresh tokens on a timer or edge middleware **before** `/auth/me` 401s; ADADI-style apps lean here so lazy refresh is rare.

> **Do not skip this in class.** Students who have already built the Declarative auth lesson will ask: _"If the server refreshed my token, why doesn't my cookie change in Application → Cookies immediately?"_ This subsection is the answer.

### 5.8 Verify the migration

Run `npm run dev`. Then, in order:

1. Visit `http://localhost:3000/en/deck` — you should be redirected to `/en/login?from=/en/deck`.
2. Submit the form with `emilys / emilyspass` — you land on `/en/deck`. The page is **server-rendered with your name already in it** (View Source shows the HTML, not a spinner).
3. Open DevTools → Application → Cookies. You see `helios_session` with `HttpOnly` ticked. **Try to read it from JS**: `document.cookie` does not include it.
4. Open DevTools → Network. **Throw your access token away** (we will simulate this in §10's exercise) and reload. The loader hits `/auth/me`, gets 401, hits `/auth/refresh`, retries `/auth/me`, succeeds — **the user never sees a flash**. Then open **Application → Cookies** and confirm whether `helios_session` changed on **this** response or only after **another** click (see §1.3 / §5.7 caveat — (a) vs (b)).
5. Visit `/en/admin` as `emilys` → success. Logout, sign in as `michaelw` / `michaelwpass`, visit `/en/admin` → 403 page (text-only — production would render an `ErrorBoundary`).
6. Click logout. Cookie is cleared. `/en/deck` redirects to login again.

> _What did NOT exist in the Declarative lesson._ A "Restoring session…" spinner. A `localStorage` token. A flash of unauthenticated content. _What did NOT change._ The dummyjson endpoints, the password, the username, the JWT shape.

---

## 6 — i18n: the ADADI pattern, ported

> _"Localisation is not translation. It is the user's right to read your URLs in their own language."_
> — adadi.org

### 6.1 Two patterns side by side

There are two production-grade ways to ship a bilingual SPA in React Router v7. **Both are correct.** They suit different audiences.

#### Pattern A — Generic `:locale` parameter (this lesson builds with this)

| Path | Language |
| ---- | -------- |
| `/en/login` | English UI |
| `/es/login` | Spanish UI |
| `/en/deck` | English UI |
| `/es/deck` | Spanish UI |

**One** route module per page. The component reads `params.locale` and pulls the matching translations. Pros: half the code; trivially extends to a third locale. Con: the **URL slug is in English** even when the UI is Spanish.

#### Pattern B — Slug-aliased EN/ES trees (this lesson shows but does not build)

| Path | Language |
| ---- | -------- |
| `/en/login` | English UI |
| `/es/iniciar-sesion` | Spanish UI |
| `/en/deck` | English UI |
| `/es/cubierta` | Spanish UI |

**Two** route trees, sharing components by import. Pros: the URL is fully localized — search engines index the Spanish site under Spanish words; users feel at home. Con: every route doubles; you maintain a slug table per locale.

This is what **ADADI uses**. See `apps/web/app/routes.ts` — `who-we-are` ↔ `quienes-somos`, `activities` ↔ `actividades`, `events` ↔ `eventos`. Each EN route has an explicit ES sibling pointing at a Spanish-named module file.

**Excerpt — `routes.js` slug-aliased version (do NOT build today)**:

```js
// Excerpt — slug-aliased pattern, ADADI-style
import { index, prefix, route } from '@react-router/dev/routes';

export default [
	route('logout', './routes/logout.js'),

	...prefix('en', [
		index('./routes/en/_index.jsx'),
		route('login', './routes/en/login.jsx'),
		route('deck', './routes/en/deck.jsx'),
		route('admin', './routes/en/admin.jsx'),
	]),
	...prefix('es', [
		index('./routes/es/_index.jsx'),
		route('iniciar-sesion', './routes/es/iniciar-sesion.jsx'),
		route('cubierta', './routes/es/cubierta.jsx'),
		route('administracion', './routes/es/administracion.jsx'),
	]),
];
```

Each Spanish module re-exports the English module (same component, same loader, swapping translation strings only). This stays maintainable as long as you commit to **one helper** that resolves slug aliases — which is exactly what ADADI's `route-slugs` config does. We keep this as an Excerpt today because **slug-aliasing is a 2-hour exercise of its own**; we have 3 hours total.

### 6.2 Why we ship Pattern A today

Generic `:locale` lets us teach **everything else** in 3 hours: SSR, cookies, loaders, actions, role guards. Pattern B adds a coordination layer that distracts from the auth headline. Once you know A cold, B is "two-trees-instead-of-one" — not a new mental model.

### 6.3 `app/utils/i18n.server.js`

This is a **port** of ADADI's `i18n.server.ts`, simplified to JS and to two locales.

**Project-ready** — Create `app/utils/i18n.server.js`.

```js
// app/utils/i18n.server.js
// Server-side locale resolution — port of ADADI's pattern.
//
// Resolution order:
//   1. URL :locale param (only if it is in SUPPORTED)
//   2. helios_locale cookie (set when the user clicks LocaleSwitch)
//   3. Accept-Language request header (best-effort match)
//   4. DEFAULT
//
// Translations are bundled, not lazy — both locales fit in one chunk for this lesson.

import en from '../locales/en.json';
import es from '../locales/es.json';

const SUPPORTED = ['en', 'es'];
const DEFAULT = 'en';

const dictionaries = { en, es };

export async function resolveLocale({ request, params }) {
	if (params?.locale && SUPPORTED.includes(params.locale)) {
		return params.locale;
	}

	const cookieHeader = request.headers.get('Cookie') ?? '';
	const cookieLocale = parseCookie(cookieHeader, 'helios_locale');
	if (cookieLocale && SUPPORTED.includes(cookieLocale)) {
		return cookieLocale;
	}

	const accept = request.headers.get('Accept-Language') ?? '';
	const match = accept.split(',').map((p) => p.split(';')[0].trim().slice(0, 2));
	const found = match.find((m) => SUPPORTED.includes(m));
	return found ?? DEFAULT;
}

/** Returns the translation table for a given locale. Falls back to DEFAULT. */
export async function tFor(locale) {
	if (!SUPPORTED.includes(locale)) return dictionaries[DEFAULT];
	return dictionaries[locale];
}

/** Builds a Set-Cookie header for locale persistence (1 year). */
export function buildLocaleCookie(locale) {
	if (!SUPPORTED.includes(locale)) return null;
	const oneYear = 60 * 60 * 24 * 365;
	return `helios_locale=${locale}; Path=/; Max-Age=${oneYear}; SameSite=Lax`;
}

function parseCookie(header, name) {
	const parts = header.split(';').map((p) => p.trim());
	for (const p of parts) {
		const [k, v] = p.split('=');
		if (k === name) return decodeURIComponent(v);
	}
	return null;
}
```

### 6.4 Translation files

**Project-ready** — Create `app/locales/en.json`.

```json
{
	"loginTitle": "Sign in",
	"loginSubtitle": "Use your dummyjson credentials.",
	"username": "Username",
	"password": "Password",
	"signIn": "Sign in",
	"signOut": "Sign out",
	"tryHint": "Try",
	"deckTitle": "Your deck",
	"signedInAs": "Signed in as",
	"email": "Email",
	"adminTitle": "Admin-only deck",
	"adminWelcome": "Welcome",
	"serverGated": "Server-gated",
	"serverGatedBody": "This page rendered server-side after a role check. Editing role in DevTools cannot bypass the gate.",
	"localeSwitch": "Change language"
}
```

**Project-ready** — Create `app/locales/es.json`.

```json
{
	"loginTitle": "Iniciar sesión",
	"loginSubtitle": "Usa tus credenciales de dummyjson.",
	"username": "Usuario",
	"password": "Contraseña",
	"signIn": "Entrar",
	"signOut": "Salir",
	"tryHint": "Prueba con",
	"deckTitle": "Tu panel",
	"signedInAs": "Sesión iniciada como",
	"email": "Correo",
	"adminTitle": "Panel de administración",
	"adminWelcome": "Bienvenida",
	"serverGated": "Protegido en el servidor",
	"serverGatedBody": "Esta página se renderizó en el servidor tras una comprobación de rol. Editar el rol en DevTools no puede saltarse la barrera.",
	"localeSwitch": "Cambiar idioma"
}
```

### 6.5 The `:locale` layout — guarding the parameter

We declared `route(':locale', layout('./routes/$locale/layout.jsx', ...))` in §3.3. The layout is where we **validate** the parameter once, instead of in every child loader. Invalid locale → throw 404.

**Project-ready** — Create `app/routes/$locale/layout.jsx`.

```jsx
// app/routes/$locale/layout.jsx
// Validates :locale, otherwise we'd render English text under /:bogus/login.
// Adds the locale switch + nav, then <Outlet /> renders the matched child.

import { Link, NavLink, Outlet, redirect } from 'react-router';
import { resolveLocale, tFor } from '../../utils/i18n.server';

export async function loader({ request, params }) {
	const locale = await resolveLocale({ request, params });
	if (locale !== params.locale) {
		// User asked for /:foo/... — redirect to the resolved locale.
		// We compute the new path SERVER-SIDE so the redirect works without JS.
		const url = new URL(request.url);
		const newPath = url.pathname.replace(`/${params.locale}`, `/${locale}`);
		throw redirect(`${newPath}${url.search}`);
	}
	const t = await tFor(locale);
	// Pass the current pathname into the component so swapLocale is SSR-safe.
	return { locale, t, pathname: new URL(request.url).pathname };
}

export default function LocaleLayout({ loaderData }) {
	const { locale, t, pathname } = loaderData;
	const otherLocale = locale === 'en' ? 'es' : 'en';
	const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
	return (
		<div className="min-h-screen flex flex-col">
			<nav className="bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center">
				<ul className="flex gap-3 text-sm">
					<li><NavLink to={`/${locale}/deck`} className={navClasses}>{t.deckTitle}</NavLink></li>
					<li><NavLink to={`/${locale}/admin`} className={navClasses}>{t.adminTitle}</NavLink></li>
				</ul>
				<Link to={otherPath} className="text-sm text-indigo-600 hover:underline">
					{otherLocale.toUpperCase()} · {t.localeSwitch}
				</Link>
			</nav>
			<Outlet />
		</div>
	);
}

function navClasses({ isActive }) {
	return `px-3 py-1.5 rounded-lg ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`;
}
```

> Notice the loader passes `pathname` into the component — the locale-swap link is computed **server-side from the request URL**, not from `window`. That makes the link correct in the very first HTML response, before any JavaScript runs. (Try right-clicking and "Open in new tab" to verify it works without hydration.)

### 6.6 Minimal `_index` and 404 fallback

**Project-ready** — Create `app/routes/$locale/_index.jsx`.

```jsx
// app/routes/$locale/_index.jsx
import { Link } from 'react-router';
import { tFor } from '../../utils/i18n.server';

export async function loader({ params }) {
	return { t: await tFor(params.locale), locale: params.locale };
}

export default function Home({ loaderData }) {
	const { t, locale } = loaderData;
	return (
		<main className="max-w-2xl mx-auto p-8">
			<h1 className="text-3xl font-bold mb-4">HELIOS DECK · {locale.toUpperCase()}</h1>
			<ul className="space-y-2 text-indigo-700">
				<li><Link to={`/${locale}/login`} className="hover:underline">→ {t.loginTitle}</Link></li>
				<li><Link to={`/${locale}/deck`} className="hover:underline">→ {t.deckTitle}</Link></li>
				<li><Link to={`/${locale}/admin`} className="hover:underline">→ {t.adminTitle}</Link></li>
			</ul>
		</main>
	);
}
```

**Project-ready** — Create `app/routes/$.jsx`.

```jsx
// app/routes/$.jsx — catch-all 404
export const meta = () => [{ title: '404' }];

export default function NotFound() {
	return (
		<main className="max-w-2xl mx-auto p-8">
			<h1 className="text-2xl font-bold mb-2">404</h1>
			<p className="text-slate-600">No route matched.</p>
		</main>
	);
}
```

### 6.7 Healthz resource route (bonus — non-page route)

**Project-ready** — Create `app/routes/api/healthz.js`.

```js
// app/routes/api/healthz.js
// Resource route — no UI export, just JSON.
export async function loader() {
	return Response.json({ ok: true, time: new Date().toISOString() });
}
```

`curl http://localhost:3000/api/healthz` returns `{"ok":true,"time":"..."}`. **This is the same pattern ADADI uses for its BFF proxy** at `/api/cms/*` and `/api/media/*` — a route module without a `default` export, returning data instead of UI.

---

## 7 — Defence in depth: the server is the gate

> _"On the client, every guard is a costume. On the server, every guard is a wall."_

The Declarative auth lesson ended with this warning:

> _"Client-side role checks are UX, not security. The same role check must run on the server for every mutation."_

This lesson **collects on that warning**. Every protected route in this app refuses to render unless the loader runs `requireUser` or `requireRole` first. The loader runs **on a node process you control**. There is no DevTools edit that bypasses it.

The hierarchy of trust:

| Layer | Role | What happens if you skip it |
| ----- | ---- | --------------------------- |
| **Server `loader`** | The gate | Page does not render. Redirect. |
| **Backend API check** (your future Strapi / Laravel / FastAPI) | Defence in depth | Even a forged session is rejected at the next backend call. |
| **Client UI guard** (optional) | Flash prevention | Hide the "Edit" button before the loader response arrives. |

The Declarative lesson built the third layer. This lesson built the first. **The second layer — your real backend — is the next sprint** (or the React Backend Integration lesson if you've already covered it).

---

## 8 — Production deploy (template)

The whole class fits behind PM2 + nginx, the same stack ADADI uses.

**Template** — `.env.production` (replace bracketed values).

```bash
# .env.production — committed as .env.example, real file is gitignored
NODE_ENV=production
SESSION_SECRET=[GENERATE_WITH: openssl rand -base64 32]
DUMMYJSON_BASE_URL=https://dummyjson.com/auth
PORT=3000
```

**Template** — `ecosystem.config.cjs` (PM2).

```js
module.exports = {
	apps: [{
		name: 'helios-deck-fw',
		script: 'npm',
		args: 'run start',
		env: { NODE_ENV: 'production', PORT: 3000 },
		instances: 1,
		exec_mode: 'fork',
	}],
};
```

**Template** — `/etc/nginx/sites-available/helios.conf` (nginx).

```nginx
server {
	listen 80;
	server_name [HELIOS_DOMAIN];

	location / {
		proxy_pass http://127.0.0.1:3000;
		proxy_http_version 1.1;
		proxy_set_header Host $host;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}
}
```

Build, upload, run:

```bash
npm run build
rsync -av build/ user@host:/srv/helios-deck-fw/build/
ssh user@host 'cd /srv/helios-deck-fw && pm2 restart helios-deck-fw'
```

> This is a **pedagogical sketch** — production needs HTTPS (acme.sh + Let's Encrypt), log rotation, and a Postgres-backed session store for multi-instance setups. ADADI's `infra/deploy/` is the canonical reference.

---

## 9 — What survived, what swapped — the closing diff

| Concept (auth lesson) | Status | Where it lives now |
| --------------------- | ------ | ------------------ |
| dummyjson endpoints | survived | `app/utils/authApi.server.js` |
| `tokenStorage.js` | replaced | `app/utils/session.server.js` (httpOnly cookie) |
| `AuthContext` + `useAuth` | replaced | `useRouteLoaderData('root')` reads `{ user }` from the root loader |
| `LoginForm.jsx` controlled inputs | replaced | `<Form method="post">` + named fields; native HTML works without JS |
| `ProtectedRoute` JSX wrapper | replaced | `requireUser(request)` inside the loader |
| `RoleGuard` JSX wrapper | replaced | `requireRole(request, 'admin')` inside the loader |
| `StatusMessage.jsx` (Loading/Error) | unused today | Loaders run before render — no in-component "Loading" needed for the auth flow |
| `AuthBadge.jsx` | could be ported | `app/components/AuthBadge.jsx` reads from root loader; trivial port |
| Refresh-on-401 with `fetchWithAuth` | survived, server-side | `verifyOrRefresh` in `authApi.server.js` |
| **Lazy refresh → `Set-Cookie` lag** | **caveat, not hidden** | §1.3 + §5.7: lesson accepts **(a)**; production uses **(b)** thread-through or **(c)** proactive refresh (ADADI-style) |
| `RoleGuard` redirect to `/ex8` info page | replaced | `throw new Response('Forbidden', { status: 403 })` + `ErrorBoundary` (homework) |
| Refresh token in `localStorage` | replaced | Refresh token in the httpOnly session cookie |
| `useNavigate` after login | replaced | `redirect()` from the action |
| `location.state.from` | replaced | `?from=` query param survives the action POST |
| Bilingual URLs | new | `:locale` parameter + `i18n.server.js` |
| `meta` per page | new | route module `meta` export |

If the table makes sense to a student in the last 10 minutes of class, the lesson worked.

---

## 10 — Final exercise: port Ex6 / Ex7 yourself

You have a working two-page app (`/login`, `/deck`, `/admin`) under bilingual URLs with cookie sessions. The auth lesson had two more examples we did not port:

- **Ex6 — Profile** (server-verified identity from `/auth/me`)
- **Ex7 — Refresh on 401** (manually break the access token; verify it recovers)

Both fit the patterns you already wrote.

### 10.1 Hint table

| Declarative piece | Framework Mode equivalent |
| ----------------- | ------------------------- |
| `useEffect` on mount calling `getMe(accessToken)` | Page `loader` calls `getMe(accessToken)` and includes the result in `loaderData` |
| "Break access token" button overriding state | Action that overwrites the cookie's `accessToken` with `'this.is.broken'` and redirects back |
| `fetchWithAuth` retry-once | `verifyOrRefresh` already exists — call it from the page loader, not from a button |
| `AuthContext.updateTokens` | Set new tokens in the session and `commitSession` on the way out |

### 10.2 Acceptance criteria

- `GET /:locale/profile` renders the user's email + avatar — fetched **on the server** through `/auth/me`. View Source contains the email; the page does not call `/auth/me` from the browser at any point.
- `POST /:locale/profile/break-token` (a small `<Form>`) writes `accessToken = 'this.is.broken'` into the session and redirects back to `/:locale/profile`.
- Reloading `/:locale/profile` after a broken token still renders the email — because the loader's `verifyOrRefresh` healed the session before responding. Network tab shows `/auth/me` 401, then `/auth/refresh` 200, then `/auth/me` 200, all server-to-server (not visible in the browser network panel).
- `npm run build && npm run start` still works.

### 10.3 Stretch goals (clever students only)

- **Slug-aliased routes**: pick **one** page, replace `:locale` with explicit `/en/profile` and `/es/perfil` — both pointing at the same component module (re-export it).
- **`ErrorBoundary` for 403**: the admin route currently throws a bare `Response('Forbidden')`. Add an `ErrorBoundary` export to render a friendly localized 403 page.
- **Postgres-backed session store**: replace `createCookieSessionStorage` with a server-side store keyed by a session ID. The cookie holds only the ID; revocation becomes instant. (This is what real production does.)

---

## 11 — Resources

- **React Router v7 — Picking a Mode** [reactrouter.com/start/modes](https://reactrouter.com/start/modes)
- **React Router v7 — Routing** [reactrouter.com/start/framework/routing](https://reactrouter.com/start/framework/routing)
- **React Router v7 — Route modules** [reactrouter.com/start/framework/route-module](https://reactrouter.com/start/framework/route-module)
- **`createCookieSessionStorage`** [api.reactrouter.com/v7/functions/react_router.createCookieSessionStorage](https://api.reactrouter.com/v7/functions/react_router.createCookieSessionStorage)
- **OWASP — Session Management** [cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- **OWASP — XSS Prevention** [cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- **dummyjson auth** [dummyjson.com/docs/auth](https://dummyjson.com/docs/auth)
- **ADADI production reference** — `apps/web/app/routes.ts`, `apps/web/app/utils/i18n.server.ts` (read in class as the production parallel)

---

## 12 — Closing

> _"Authentication that lives in the browser is hospitable. Authentication that lives on the server is sovereign."_

You ported a working sandbox into a working SSR application. The user does not see the difference. The XSS attacker does. The clever student does. Ship it.
