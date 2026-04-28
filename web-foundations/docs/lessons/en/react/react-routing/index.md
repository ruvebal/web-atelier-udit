---
layout: lesson
title: 'Routing & Navigation: The Multi-Page SPA'
slug: react-routing
category: react
tags:
 [
  react,
  routing,
  react-router-dom,
  react-router,
  navigation,
  spa,
  tailwind,
  codesandbox,
  helios-deck,
  explicit-config,
  framework-mode,
 ]
week: 8
phase: 2
sprint: 8
date: 2026-04-06
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/react-routing/
status: published
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents

{: .no_toc }

- TOC
  {:toc}

<!-- prettier-ignore-end -->

> _"Routing is the art of making many pages feel like one app."_

---

## Brief history of React Router

**React Router** began as a client-side routing library for React. **Ryan Florence** and **Michael Jackson** (React Training) published early versions in the **mid-2010s** so SPAs could map URLs to components without full page reloads. The project became the de facto standard for React navigation.

- **v3** — Older API patterns (still referenced in legacy tutorials).
- **v4 (2017)** — Major redesign: composable `<Route>` components, `<Switch>`, and a clearer mental model for nested UI.
- **v5** — Refinements and stability on top of v4.
- **v6 (2021)** — Nested routes as a first-class tree, relative links, `<Outlet>`, and the foundation for **data APIs** (`loader`-style concepts arrived in the ecosystem around this time). The package split clarified **declarative** vs **data** usage.
- **Remix (2020–)** — A full-stack React framework (loaders, actions, forms, SSR) that influenced how “routing + data” should work together.
- **v7 (2024)** — **Remix and React Router merged into one project.** React Router v7 is the unified line: the same npm packages can power a minimal SPA, a data router, or a **Framework Mode** app (Vite plugin, route modules, SSR) — the spiritual successor to Remix, documented on the official React Router site. The maintainers’ own narrative of the release is on the Remix blog: [React Router v7](https://remix.run/blog/react-router-v7).

> **Takeaway:** “React Router” today is not only the `<Routes>` you paste in a sandbox; it is also a **framework** when you opt into Framework Mode. This lesson uses both layers deliberately.

---

## React Router v7 as a framework: main characteristics

In **Framework Mode**, React Router is not just a matcher — it orchestrates **build**, **data loading**, and **rendering**:

| Characteristic               | What it means for you                                                                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Vite integration**         | A plugin wires file-based builds, HMR (Hot Module Replacement), and route-based code splitting.                                                                                |
| **Route modules**            | Each route file can export `loader`, `action`, `default` (UI), `ErrorBoundary`, `meta`, `links`, and more — colocated with the page.                                           |
| **Server-first data**        | `loader` runs on the server (or during pre-render); the UI receives data without a client-side fetch waterfall on first paint.                                                 |
| **Mutations + revalidation** | `action` handles forms and writes; matching loaders can re-run so the UI stays consistent.                                                                                     |
| **Rendering strategies**     | Same app can target SPA, SSR, or static output depending on config — see the official guides.                                                                                  |
| **Three modes**              | **Declarative** (browser-only), **Data** (`createBrowserRouter`), **Framework** (full stack). This lesson’s Act 1 = Declarative; Act 2+ = Framework with explicit `routes.js`. |

Official overview of modes: [Picking a Mode](https://reactrouter.com/start/modes).

---

### Authoritative docs and well-known learning resources

**Official (treat these as source of truth)**

| Resource                                        | URL                                                                                                            | Use it for                                       |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| React Router home & docs                        | [https://reactrouter.com](https://reactrouter.com)                                                             | Installation, guides, API reference              |
| Picking a mode (Declarative / Data / Framework) | [https://reactrouter.com/start/modes](https://reactrouter.com/start/modes)                                     | Deciding which API layer you need                |
| Framework — routing                             | [https://reactrouter.com/start/framework/routing](https://reactrouter.com/start/framework/routing)             | `routes.ts`, `index`, `route`, `layout`, nesting |
| Framework — route modules                       | [https://reactrouter.com/start/framework/route-module](https://reactrouter.com/start/framework/route-module)   | `loader`, `action`, `ErrorBoundary`, etc.        |
| File route conventions (optional path B)        | [https://reactrouter.com/how-to/file-route-conventions](https://reactrouter.com/how-to/file-route-conventions) | `flatRoutes`, dots, `$` params                   |
| GitHub repository                               | [https://github.com/remix-run/react-router](https://github.com/remix-run/react-router)                         | Source, issues, changelog                        |
| API reference (generated)                       | [https://api.reactrouter.com/v7/](https://api.reactrouter.com/v7/)                                             | Exact function signatures                        |

**Community & secondary (use after the official docs)**

| Resource                                              | URL                                                                                                                          | Note                                                                    |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Remix blog — React Router v7 announcement             | [https://remix.run/blog/react-router-v7](https://remix.run/blog/react-router-v7)                                             | Official story of the merger, upgrade paths, and “framework vs library” |
| Remix blog (index)                                    | [https://remix.run/blog](https://remix.run/blog)                                                                             | Historical articles on loaders, actions, and nested routing             |
| MDN — History API (browser primitives under the hood) | [https://developer.mozilla.org/en-US/docs/Web/API/History_API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) | How `pushState` / `popstate` relate to SPA routing                      |

> **Pedagogy:** Start every investigation on [reactrouter.com](https://reactrouter.com). Third-party posts go out of date quickly; the official docs track the current v7 line.

---

## The two ways to define routes in React Router v7

Before writing a single line of code, understand the fork at the heart of React Router v7's **Framework Mode**. Both lead to the same result—a working app with SSR, loaders, and actions —but they make different trade-offs.

### A — Explicit config (`routes.ts` / `routes.js`)

You write a JavaScript config that maps URL patterns to route module files. The framework reads this one file and builds the entire route tree.

```js
// app/routes.js
import { index, route } from '@react-router/dev/routes';

export default [
	index('./routes/_index.jsx'),
	route('dashboard', './routes/dashboard/layout.jsx', [
		index('./routes/dashboard/index.jsx'),
		route('widgets', './routes/dashboard/widgets.jsx'),
	]),
	route('auth/login', './routes/auth/login.jsx'),
	route('*', './routes/catchall.jsx'),
];
```

The `app/routes/` directory holds the **route modules** (the actual components, loaders, actions). It is a file organization choice, not the routing definition. The routing definition lives entirely in `routes.js`.

### B — File-based conventions (`@react-router/fs-routes`)

An optional package (`@react-router/fs-routes`) replaces the explicit config with **filename inference**. Dots become `/`, `$` means a dynamic segment, `_` prefixes a pathless layout.

```js
// app/routes.js — file conventions delegate everything to the filesystem
import { flatRoutes } from '@react-router/fs-routes';
export default flatRoutes();
```

```text
app/routes/
  _index.tsx                       → /
  dashboard.tsx                    → /dashboard  (layout)
  dashboard._index.tsx             → /dashboard  (index child)
  dashboard.widgets.tsx            → /dashboard/widgets
  auth.login.tsx                   → /auth/login
  $.tsx                            → /* (catchall)
```

### Comparison — when to use each

| Dimension              | Explicit config (A)                                             | File conventions (B)                                          |
| ---------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- |
| **Route definition**   | One `routes.js` file — full picture at a glance                 | Filesystem — add a file, get a route                          |
| **Complex structures** | Bilingual, parallel trees, cross-cutting groups: no friction    | Dot names become unwieldy beyond 3–4 levels of nesting        |
| **AI / tooling**       | AI reads one file to understand all routes                      | AI must scan the filesystem; harder to reason about           |
| **Familiarity**        | Similar to declaring routes anywhere in code                    | Familiar to Next.js / Remix users who like "convention magic" |
| **Best for**           | Real apps with non-trivial URL structures (i18n, RBAC, portals) | Quick prototypes, standard CRUD apps with predictable URLs    |
| **Overhead**           | Slightly more typing upfront                                    | Extra package install; filename encoding is its own language  |

> **File conventions are documented at** [reactrouter.com/how-to/file-route-conventions](https://reactrouter.com/how-to/file-route-conventions). You can even mix both approaches in one `routes.js`—but this lesson commits to **explicit config only**.

### Why this lesson teaches explicit config

This course uses explicit config because:

1. **It is what production looks like.** Your professor's production site ([adadi.org](https://adadi.org)) and your final project (HELIOS DECK) both use it. You will read and write real code, not an analogy.
2. **One file = full picture.** A junior developer joining a project can read `routes.js` and understand the entire URL structure in minutes. With file conventions, they must traverse a directory tree.
3. **AI tools work better.** When you give an agent `routes.js`, it has complete routing context in a single artifact. File trees require recursive scanning.
4. **You will eventually hit its limits.** When your project grows to bilingual URLs, admin vs member portals, or tenant-scoped routes, explicit config is the only sane path. Learning it first means you never have to unlearn conventions.

---

## Code conventions in this lesson

This lesson has three acts, each with its own environment:

| Act   | Environment      | Mode                                 | What you learn                                         |
| ----- | ---------------- | ------------------------------------ | ------------------------------------------------------ |
| **1** | CodeSandbox      | **Declarative** (`react-router-dom`) | Core concepts: Link, params, Outlet, URL state, guards |
| **2** | Local project    | **Framework** (explicit `routes.js`) | Loaders, route modules, ADADI reference, HELIOS seed   |
| **3** | Your HELIOS repo | **Framework** (in progress)          | AI tooling, Cursor rules, shadcn skills                |

- **CodeSandbox-ready** — complete, copy-paste file. Works once the Act 1 scaffold is in place.
- **Excerpt** — partial pattern, illustrative only. Does not run as-is.
- **Template** — copy and replace `[BRACKETED]` values before use.

> Act 1 uses `react-router-dom` (Declarative Mode) so there is zero local setup friction. Every concept in Act 1 has an exact equivalent in Framework Mode — the vocabulary transfers completely.

### Act 1 project structure (CodeSandbox)

```text
src/
  main.jsx                         ← BrowserRouter + MockAuthProvider + CSS
  App.jsx                          ← NavBar + Routes (all examples pre-wired)
  data/
    signals.js                     ← Mock HELIOS-style signals (no network)
  context/
    MockAuthContext.jsx            ← Fake login for Example 5 only
  components/
    SignalCard.jsx                 ← List row / card for a signal
    StatusBadge.jsx                ← Severity / source badge
    ProtectedRoute.jsx             ← Children guard for Example 5 (redirect if logged out)
  pages/
    Home.jsx                       ← lesson index with links
    Ex1Navigation.jsx              ← 1 · Link + NavLink + nested index/about
    Ex2DynamicRoutes.jsx           ← 2 · useParams (list + detail exports)
    Ex3NestedLayouts.jsx           ← 3 · layout route + Outlet + nested detail
    Ex4URLState.jsx                ← 4 · useSearchParams (filters in URL)
    Ex5ProtectedRoute.jsx          ← 5 · mock auth + Navigate + useNavigate
```

---

### Sandbox setup (do this once at the start of class)

**Step 1 — Create sandbox**

<iframe src="https://codesandbox.io/p/devbox/9ltymf?embed=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Routing &amp; Navigation: The Multi-Page SPA"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

[https://codesandbox.io/p/devbox/9ltymf?embed=1](https://codesandbox.io/p/devbox/9ltymf?embed=1) **React** template (Vite, JavaScript — files are `.jsx`, no TypeScript).

**Step 2 — Add dependencies** via the **Dependencies panel** (sidebar `+`):

```text
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

**Step 5 — Build the scaffold** (Section 2 below) and verify the preview shows the home page with nav links.

> This is the **Tailwind v4** setup (single plugin, no `tailwind.config.js` needed). It matches the [Backend Integration](../react-backend-integration/) lesson so students reuse the same mental model.

---

## 🎯 Learning Objectives

By the end of this lesson, you will:

- [ ] Explain the difference between **explicit config** (`routes.js`) and **file conventions** (`flatRoutes`) in React Router v7 Framework Mode, and choose one deliberately
- [ ] Use **declarative routing** with `<Routes>`, `<Route>`, `<Link>`, and `<NavLink>` (Declarative Mode)
- [ ] Navigate programmatically with **`useNavigate`** and declarative redirects with **`<Navigate>`**
- [ ] Read **dynamic segments** with **`useParams`**
- [ ] Treat the URL as UI state with **`useSearchParams`**
- [ ] Build **nested layouts** with a parent route and **`<Outlet>`**
- [ ] Implement a **route guard** for protected pages (mock auth in the sandbox; real sessions in the next lesson)
- [ ] Read a production **`routes.js`** file (ADADI) and map its patterns to the concepts above
- [ ] Scaffold a HELIOS DECK seed with **explicit config** in Framework Mode

---

## 🧭 Position in the Journey

| Order in cohort | Lesson                                               | Focus                                    |
| --------------- | ---------------------------------------------------- | ---------------------------------------- |
| Taught          | [Backend Integration](../react-backend-integration/) | Data fetching, React Query, APIs         |
| **→ Current**   | **Routing**                                          | **URLs, layouts, guards, URL-as-state**  |
| Next            | [Authentication](../react-authentication/)           | Sessions, cookies, real protected routes |
| Then            | [State Architecture](../react-state-architecture/)   | Context, stores, scaling client state    |

> **Teaching note:** You already practiced **React Query** and **fetch** in [Backend Integration](../react-backend-integration/). This sprint isolates **routing mechanics** with mock data so the URL—not the network—is what you debug.

---

## — ACT 1: Declarative Mode (CodeSandbox) —

---

## Act 1 — API cheatsheet

All imports in this act come from `react-router-dom`. Use this table as a quick reference while you work through the examples.

| API                 | Type      | What it does                                                                                                                                                          | Official docs                                                         |
| ------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `<BrowserRouter>`   | Provider  | Wraps your app once at the root; wires the browser's History API so React Router can intercept link clicks and manage the URL without full page reloads               | [BrowserRouter](https://reactrouter.com/api/components/BrowserRouter) |
| `<Routes>`          | Component | Scans its `<Route>` children and renders the **best match** for the current URL. Only one branch renders at a time                                                    | [Routes](https://reactrouter.com/api/components/Routes)               |
| `<Route>`           | Component | Declares one rule: _"when the URL matches `path`, render `element`"_. Can be nested to build layout trees                                                             | [Route](https://reactrouter.com/api/components/Route)                 |
| `<Link>`            | Component | Client-side anchor. Updates the URL and swaps the view without a full page reload                                                                                     | [Link](https://reactrouter.com/api/components/Link)                   |
| `<NavLink>`         | Component | Like `<Link>` but adds `active` / `pending` class or style automatically when its `to` matches the current URL. Use for navigation bars                               | [NavLink](https://reactrouter.com/api/components/NavLink)             |
| `<Outlet>`          | Component | Placeholder in a **layout route**. React Router replaces it with the matched child route's element at runtime                                                         | [Outlet](https://reactrouter.com/api/components/Outlet)               |
| `<Navigate>`        | Component | Declarative redirect. Drop it anywhere in JSX and it immediately sends the user to `to`. Use in guard conditions                                                      | [Navigate](https://reactrouter.com/api/components/Navigate)           |
| `useParams()`       | Hook      | Returns an object of the `:dynamic` segments from the current URL (e.g. `{ signalId: 'flare-m21' }`)                                                                  | [useParams](https://reactrouter.com/api/hooks/useParams)              |
| `useSearchParams()` | Hook      | Reads and writes the `?key=value` query string as a `URLSearchParams` object. The URL is the source of truth for filter/sort state                                    | [useSearchParams](https://reactrouter.com/api/hooks/useSearchParams)  |
| `useNavigate()`     | Hook      | Returns a `navigate(to, options)` function for **programmatic** navigation — after a form submission, timer, or async event                                           | [useNavigate](https://reactrouter.com/api/hooks/useNavigate)          |
| `useLocation()`     | Hook      | Returns the current `location` object (`{ pathname, search, hash, state, key }`). Use it to read `state` passed via `<Link state={…}>` or to track the previous route | [useLocation](https://reactrouter.com/api/hooks/useLocation)          |

> **Learning keys**
>
> - Components (`<Routes>`, `<Route>`, `<Outlet>`, `<Navigate>`) live in JSX and react to renders.
> - Hooks (`useParams`, `useSearchParams`, `useNavigate`, `useLocation`) must be called inside a component that is rendered inside a `<BrowserRouter>`.
> - `<Link>` vs `<NavLink>`: use `<NavLink>` whenever you need the "you are here" active style; use `<Link>` everywhere else.
> - `useNavigate` vs `<Navigate>`: prefer `<Navigate>` in render-time conditions (guards); prefer `useNavigate` in event handlers.

---

## 1 — Mental model: the URL is part of your UI

Before adding files, agree on three invariants:

1. **Every meaningful view should have an address.** If a user cannot link to it, it is harder to share, bookmark, and reason about.
2. **Layouts are routes too.** Shared **chrome** (the persistent UI shell — nav bar, header, sidebar) belongs in a parent route; leaf routes render inside `<Outlet />`. _"Chrome"_ is a UI term for the frame around the content area — the parts that stay constant while only the content changes.
3. **Guards are not magic.** A "protected route" is a component that checks auth state and either renders children or redirects—same as any other conditional UI.

SPA vs MPA (contrast only).

```text
Multi-Page App (MPA): Each time you click a link, the browser sends a new request to the server, which returns a completely new HTML document. The page fully reloads, losing any client-side UI state. Navigation is handled by the server, and each URL points to a separate HTML file.

Single-Page App (SPA): The browser loads a single HTML shell at the start. Navigation between views doesn't reload the page—instead, the JavaScript framework (e.g., React Router) updates the visible content by swapping components and adjusting the browser's URL with the History API. The UI feels faster and persistent, and client-side state is preserved across navigations.
```

---

## 2 — Foundation scaffold (build once, keep forever)

Create every file below **before** Example 1. After this, you only ever _add_ or _extend_ files under `src/pages/`.

> **Verify:** After pasting the scaffold, the preview may show errors until each `ExN…` file exists—**that is expected**. Add pages in order 1 → 5.

---

**CodeSandbox-ready** — `src/data/signals.js` (create new file)

```js
// src/data/signals.js
// Mock HELIOS DECK–style signals — no fetch, so routing stays the focus.
// Shape mirrors the normalized "signal" object from the HELIOS track (conceptual).

export const SIGNALS = [
	{
		id: 'flare-m21',
		label: 'Solar flare (M2.1)',
		signal: 'solar_flare_events',
		source: 'NASA_DONKI',
		severity: 'high',
		summary: 'M-class flare with clear peak in soft X-ray.',
	},
	{
		id: 'cme-001',
		label: 'Coronal mass ejection',
		signal: 'coronal_mass_ejections',
		source: 'NASA_DONKI',
		severity: 'medium',
		summary: 'CME launched from AR 12345; Earth-directed component uncertain.',
	},
	{
		id: 'sw-speed',
		label: 'Solar wind speed spike',
		signal: 'solar_wind_speed',
		source: 'NOAA_SWPC',
		severity: 'medium',
		summary: 'Speed exceeded 600 km/s for three consecutive samples.',
	},
	{
		id: 'sw-density',
		label: 'Solar wind density',
		signal: 'solar_wind_density',
		source: 'NOAA_SWPC',
		severity: 'low',
		summary: 'Nominal density; no storm conditions.',
	},
	{
		id: 'kp-7',
		label: 'Kp index (planetary)',
		signal: 'kp_index',
		source: 'GFZ',
		severity: 'high',
		summary: 'Kp reached 7−; auroral oval expands equatorward.',
	},
	{
		id: 'aurora-oval',
		label: 'Auroral oval probability',
		signal: 'auroral_oval_probability',
		source: 'SpaceWeatherLive',
		severity: 'medium',
		summary: 'Elevated probability for mid-latitude visibility.',
	},
	{
		id: 'iss-pos',
		label: 'ISS ground track',
		signal: 'iss_coordinates',
		source: 'Open_Notify',
		severity: 'low',
		summary: 'Latest ISS position sample (mock).',
	},
	{
		id: 'solar-rad',
		label: 'Solar radiation (clear-sky)',
		signal: 'solar_radiation',
		source: 'NASA_POWER',
		severity: 'low',
		summary: 'Irradiance within expected range for season.',
	},
];

// Array.prototype.find — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
export function getSignalById(id) {
	// Searches the SIGNALS array for a signal with a matching id.
	return SIGNALS.find((s) => s.id === id) ?? null;
}
```

---

**CodeSandbox-ready** — `src/context/MockAuthContext.jsx` (create new file)

React Context provides a way to share values like data or functions between components without explicitly passing props through every level of the component tree. It is useful for situations where many components need access to the same data, such as user authentication status or theme settings.
About `Context` in React: [https://react.dev/learn/passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context)

```jsx
// src/context/MockAuthContext.jsx
// Fake auth for Example 5 — toggles only. Real cookies / sessions come in Authentication lesson.

import { createContext, useContext, useMemo, useState } from 'react';

const MockAuthContext = createContext(null);

// In React, the `children` prop is commonly used to let you pass content between the opening and closing tags of a component.
// For example, when you use <MockAuthProvider>...</MockAuthProvider>, anything between the tags will be passed as `children`.
// This allows custom components like providers or layout wrappers to wrap any nested (child) components,
// making it easy to share data (like Context) with everything inside.
//
// For most use cases, such as Context providers or layout components, using the `children` prop is the idiomatic approach.
// However, if you need to pass *functions* instead of elements (for example, if you want child components to receive some values or functions as arguments when rendering),
// you can use the *render props* pattern or function props instead.
//
// See the React docs on alternatives to `children`:
// https://react.dev/reference/react/Children#alternatives
//
// To summarize:
// - Use `children` for most nested content and context use cases.
// - If you need more dynamic rendering (passing functions instead of elements), consider render props or function as child.

export function MockAuthProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const value = useMemo(
		() => ({
			isLoggedIn,
			login: () => setIsLoggedIn(true),
			logout: () => setIsLoggedIn(false),
		}),
		[isLoggedIn]
	);

	return <MockAuthContext.Provider value={value}>{children}</MockAuthContext.Provider>;
}

export function useMockAuth() {
	const ctx = useContext(MockAuthContext);
	if (!ctx) throw new Error('useMockAuth must be used within MockAuthProvider');
	return ctx;
}
```

---

**CodeSandbox-ready** — `src/components/StatusBadge.jsx` (create new file)

```jsx
// src/components/StatusBadge.jsx

const STYLES = {
	low: 'bg-slate-100 text-slate-700 border-slate-200',
	medium: 'bg-amber-50 text-amber-800 border-amber-200',
	high: 'bg-rose-50 text-rose-800 border-rose-200',
};

export default function StatusBadge({ severity }) {
	const cls = STYLES[severity] ?? STYLES.low;
	return <span className={`text-xs px-2 py-0.5 rounded-full border ${cls}`}>{severity}</span>;
}
```

---

**CodeSandbox-ready** — `src/components/SignalCard.jsx` (create new file)

```jsx
// src/components/SignalCard.jsx
import StatusBadge from './StatusBadge';

export default function SignalCard({ signal, to, subtitle }) {
	const Wrapper = to ? 'a' : 'div';
	const props = to ? { href: to } : {};
	return (
		<Wrapper
			{...props}
			className={`block p-4 bg-white rounded-xl border border-slate-100 shadow-sm ${
				to ? 'hover:border-indigo-200 transition-colors' : ''
			}`}>
			<div className="flex items-start justify-between gap-3">
				<div>
					<p className="font-semibold text-slate-900">{signal.label}</p>
					<p className="text-xs text-slate-500 mt-1">
						<code className="bg-slate-100 px-1 rounded">{signal.signal}</code>
						{subtitle ? ` · ${subtitle}` : null}
					</p>
				</div>
				<StatusBadge severity={signal.severity} />
			</div>
			<p className="text-sm text-slate-600 mt-2">{signal.summary}</p>
		</Wrapper>
	);
}
```

---

**CodeSandbox-ready** — `src/components/ProtectedRoute.jsx` (create new file)

```jsx
// src/components/ProtectedRoute.jsx
// Guard pattern: if not logged in, redirect. Otherwise render children.
//
// Navigate: declarative redirect component — renders nothing visible, just sends the user elsewhere.
//   Docs: https://reactrouter.com/api/components/Navigate
// useLocation: returns the current location object so we can store "where the user wanted to go"
//   in state and redirect back after login.
//   Docs: https://reactrouter.com/api/hooks/useLocation

import { Navigate, useLocation } from 'react-router-dom';
import { useMockAuth } from '../context/MockAuthContext';

export default function ProtectedRoute({ children, redirectTo = '/ex5/login' }) {
	const { isLoggedIn } = useMockAuth();
	const location = useLocation();

	if (!isLoggedIn) {
		return <Navigate to={redirectTo} replace state={{ from: location }} />;
	}

	return children;
}
```

---

**CodeSandbox-ready** — `src/main.jsx` (replace the template file)

```jsx
// src/main.jsx
// This is the React entry point. Notice how components are *nested* inside each other:
// - <React.StrictMode> is the outermost wrapper for highlighting potential problems
// - <MockAuthProvider> provides authentication context to the app
// - <BrowserRouter> enables routing
// - <App> is your main component where you define your routes
// Nesting allows each inner component to access context and features from its parents.

import React from 'react';
import ReactDOM from 'react-dom/client';
// BrowserRouter: root provider that enables client-side routing via the browser's History API.
// Wrap your entire app in it exactly once — everything inside can use React Router hooks and components.
// Docs: https://reactrouter.com/api/components/BrowserRouter
import { BrowserRouter } from 'react-router-dom';
import { MockAuthProvider } from './context/MockAuthContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<MockAuthProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MockAuthProvider>
	</React.StrictMode>
);
```

---

**CodeSandbox-ready** — `src/App.jsx` (replace the template file)

```jsx
// src/App.jsx
// Navigation shell + route map. All 5 examples are pre-wired — add each page file and refresh.

// Core components used in this lesson:
// - Navigate: redirect users programmatically in route trees.
//   Docs: https://reactrouter.com/api/components/Navigate
// - Route: declares a single path-to-element mapping.
//   Docs: https://reactrouter.com/api/components/Route
// - Routes: renders the best matching <Route> branch.
//   Docs: https://reactrouter.com/api/components/Routes
// - NavLink: link with active/pending state styling support.
//   Docs: https://reactrouter.com/api/components/NavLink
//
// Import them from react-router-dom:
import { Navigate, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Ex1Layout, { Ex1About, Ex1Welcome } from './pages/Ex1Navigation';
import Ex2List, { Ex2Detail } from './pages/Ex2DynamicRoutes';
import Ex3Layout, { Ex3Detail, Ex3Index } from './pages/Ex3NestedLayouts';
import Ex4URLState from './pages/Ex4URLState';
import Ex5Deck, { Ex5Login } from './pages/Ex5ProtectedRoute';
import ProtectedRoute from './components/ProtectedRoute';

const NAV = [
	{ to: '/', label: '🏠 Home' },
	{ to: '/ex1', label: '1 · Navigation' },
	{ to: '/ex2', label: '2 · Dynamic' },
	{ to: '/ex3', label: '3 · Nested' },
	{ to: '/ex4', label: '4 · URL state' },
	{ to: '/ex5', label: '5 · Protected' },
];

export default function App() {
	return (
		<div className="min-h-screen bg-slate-50 font-sans">
			<nav className="bg-white border-b border-slate-200 px-4 py-3">
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
			</nav>
			<main className="max-w-2xl mx-auto px-4 py-10">
				<Routes>
					<Route path="/" element={<Home />} />

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

					<Route path="*" element={<p className="text-slate-500">404 — no route matched.</p>} />
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
// Link: client-side navigation without full page reload.
// Docs: https://reactrouter.com/api/components/Link
import { Link } from 'react-router-dom';

const EXAMPLES = [
	{ path: '/ex1', title: '1 · Navigation', desc: 'Link, NavLink, nested index + about routes.' },
	{ path: '/ex2', title: '2 · Dynamic routes', desc: 'useParams — detail page from :signalId.' },
	{ path: '/ex3', title: '3 · Nested layouts', desc: 'Parent layout + Outlet + child segment.' },
	{ path: '/ex4', title: '4 · URL state', desc: 'useSearchParams — filters live in the query string.' },
	{ path: '/ex5/login', title: '5 · Protected routes', desc: 'Mock login + guard + redirect to deck.' },
];

export default function Home() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">Routing &amp; Navigation — Act 1</h1>
			<p className="text-slate-500 mb-2 text-sm">
				Signal Browser (mock data) — foreshadows the HELIOS DECK final project without network noise.
			</p>
			<p className="text-xs text-slate-400 mb-8">Act 2 (Framework Mode + explicit config) follows in the lesson below.</p>
			<ul className="space-y-3">
				{EXAMPLES.map(({ path, title, desc }) => (
					<li key={path}>
						<Link
							to={path}
							className="block p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors">
							<p className="font-semibold text-indigo-600">{title}</p>
							<p className="text-sm text-slate-500 mt-1">{desc}</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
```

> **Why pre-wire all routes?** Same rationale as Backend Integration: the full lesson arc is visible on day one; you only add page files.

---

## 3 — Example 1: `Link`, `NavLink`, nested routes

**Teaching moment:** Compare `<a href>` (full document load) with `<Link to>` (client navigation, state preserved).

**CodeSandbox-ready** — Create `src/pages/Ex1Navigation.jsx`.

```jsx
// src/pages/Ex1Navigation.jsx
// Demonstrates:
//   - Nested routes under /ex1 with a layout + <Outlet />
//   - NavLink "end" prop so /ex1/about does not mark /ex1 as active
//   - isActive callback for styling the active link
//
// NavLink: like <Link> but adds active/pending state. Use for nav bars and menus.
//   Docs: https://reactrouter.com/api/components/NavLink
// Outlet: renders the matched child route inside this layout. Without it, child routes
//   would have nowhere to appear.
//   Docs: https://reactrouter.com/api/components/Outlet

import { NavLink, Outlet } from 'react-router-dom';

export default function Ex1Layout() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">1 · Navigation</h1>
			<p className="text-sm text-slate-500 mb-6">Nested routes: index + about.</p>

			<div className="flex gap-2 mb-6">
				<NavLink
					to="/ex1"
					end
					className={({ isActive }) =>
						`px-3 py-1.5 rounded-lg text-sm border ${
							isActive ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-slate-200 text-slate-700'
						}`
					}>
					Welcome
				</NavLink>
				<NavLink
					to="/ex1/about"
					className={({ isActive }) =>
						`px-3 py-1.5 rounded-lg text-sm border ${
							isActive ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-slate-200 text-slate-700'
						}`
					}>
					About this example
				</NavLink>
			</div>

			<div className="rounded-xl border border-slate-200 bg-white p-4">
				<Outlet />
			</div>
		</div>
	);
}

export function Ex1Welcome() {
	return (
		<div>
			<p className="font-semibold text-slate-900">Welcome route</p>
			<p className="text-sm text-slate-600 mt-2">
				This is the <code className="bg-slate-100 px-1 rounded">index</code> child of{' '}
				<code className="bg-slate-100 px-1 rounded">/ex1</code>.
			</p>
		</div>
	);
}

export function Ex1About() {
	return (
		<div>
			<p className="font-semibold text-slate-900">About route</p>
			<p className="text-sm text-slate-600 mt-2">Notice how the URL changes while the outer layout stays mounted.</p>
		</div>
	);
}
```

**Classroom check:** Open DevTools → Network. Navigate between Welcome and About: you should **not** see a full document reload for each click.

---

## 4 — Example 2: Dynamic segments and `useParams`

**Excerpt** — What `useParams` returns (shape depends on your route path).

```jsx
// path="/ex2/signals/:signalId"
const { signalId } = useParams(); // string | undefined
```

**CodeSandbox-ready** — Create `src/pages/Ex2DynamicRoutes.jsx`.

```jsx
// src/pages/Ex2DynamicRoutes.jsx
// Demonstrates:
//   - List view at /ex2
//   - Detail view at /ex2/signals/:signalId
//   - useParams + lookup in mock data
//
// Link: client-side navigation without full page reload.
//   Docs: https://reactrouter.com/api/components/Link
// useParams: returns an object of the :dynamic URL segments, e.g. { signalId: 'flare-m21' }.
//   Docs: https://reactrouter.com/api/hooks/useParams

import { Link, useParams } from 'react-router-dom';
import SignalCard from '../components/SignalCard';
import { SIGNALS, getSignalById } from '../data/signals';

export default function Ex2List() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">2 · Dynamic routes</h1>
			<p className="text-sm text-slate-500 mb-6">Pick a signal — URL carries the id.</p>
			<ul className="space-y-3">
				{SIGNALS.map((s) => (
					<li key={s.id}>
						<Link to={`/ex2/signals/${s.id}`} className="block">
							<SignalCard signal={s} subtitle={s.source} />
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export function Ex2Detail() {
	const { signalId } = useParams();
	const signal = signalId ? getSignalById(signalId) : null;

	if (!signal) {
		return <p className="text-rose-600">Unknown signal id.</p>;
	}

	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">Signal detail</h1>
			<p className="text-xs text-slate-400 mb-4">
				<code className="bg-slate-100 px-1 rounded">/ex2/signals/{signalId}</code>
			</p>
			<SignalCard signal={signal} subtitle={signal.source} />
			<Link className="inline-block mt-6 text-indigo-600 text-sm font-semibold" to="/ex2">
				← Back to list
			</Link>
		</div>
	);
}
```

**Atelier prompt:** _Why is `signalId` always a string, even if the id looks like a number? What breaks if you rename the param in the route but forget to update `useParams`?_

---

## 5 — Example 3: Nested layouts (`Outlet`)

This example uses **relative** child segments under `/ex3` so the layout owns both the list and the detail.

**CodeSandbox-ready** — Create `src/pages/Ex3NestedLayouts.jsx`.

```jsx
// src/pages/Ex3NestedLayouts.jsx
// Demonstrates:
//   - Layout route at /ex3 renders persistent chrome (UI shell) + <Outlet />
//   - Child routes: index list + :signalId detail (relative segment)
//
// NavLink: link with active/pending styling — used here for the inner sub-nav.
//   Docs: https://reactrouter.com/api/components/NavLink
// Outlet: where React Router injects the matched child route's element.
//   Docs: https://reactrouter.com/api/components/Outlet
// useParams: reads the :signalId segment from the URL in the detail child route.
//   Docs: https://reactrouter.com/api/hooks/useParams

import { NavLink, Outlet, useParams } from 'react-router-dom';
import SignalCard from '../components/SignalCard';
import { SIGNALS, getSignalById } from '../data/signals';

export default function Ex3Layout() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">3 · Nested layouts</h1>
			<p className="text-sm text-slate-500 mb-4">The shell below stays mounted; only the outlet swaps.</p>

			<div className="rounded-xl border border-slate-200 overflow-hidden">
				<div className="bg-slate-900 text-slate-100 px-4 py-2 text-xs font-mono">HELIOS / signals</div>
				<div className="p-4 bg-white space-y-4">
					<div className="flex flex-wrap gap-2">
						{SIGNALS.map((s) => (
							<NavLink
								key={s.id}
								to={`/ex3/${s.id}`}
								className={({ isActive }) =>
									`text-xs px-2 py-1 rounded border ${
										isActive ? 'border-indigo-500 text-indigo-700' : 'border-slate-200 text-slate-600'
									}`
								}>
								{s.id}
							</NavLink>
						))}
					</div>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export function Ex3Index() {
	return <p className="text-sm text-slate-600">Select a signal id above — child route renders here.</p>;
}

export function Ex3Detail() {
	const { signalId } = useParams();
	const signal = signalId ? getSignalById(signalId) : null;
	if (!signal) return <p className="text-rose-600 text-sm">Unknown id.</p>;

	return <SignalCard signal={signal} subtitle={`Nested under /ex3/${signalId}`} />;
}
```

**Teaching moment:** Contrast Example 2 (sibling routes at the same level) with Example 3 (parent layout owns the shell). Both are valid—choose based on **who owns the persistent chrome**.

---

## 6 — Example 4: `useSearchParams` — URL as state

**Excerpt** — Mental model: query string = serialized filter state.

```text
/ex4?source=NASA_DONKI&severity=high
```

**CodeSandbox-ready** — Create `src/pages/Ex4URLState.jsx`.

```jsx
// src/pages/Ex4URLState.jsx
// Demonstrates:
//   - useSearchParams for filters
//   - Updating the URL without losing shareability
//   - Deriving the visible list from params (URL = single source of truth)
//
// useSearchParams: reads and writes the ?key=value query string as a URLSearchParams pair.
//   setSearchParams(next) updates the URL in-place — no full reload, no lost history entry.
//   The URL becomes the single source of truth for filter/sort state: shareable, bookmarkable.
//   Docs: https://reactrouter.com/api/hooks/useSearchParams

import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SignalCard from '../components/SignalCard';
import { SIGNALS } from '../data/signals';

const SOURCES = Array.from(new Set(SIGNALS.map((s) => s.source))).sort();
const SEVERITIES = ['low', 'medium', 'high'];

export default function Ex4URLState() {
	const [searchParams, setSearchParams] = useSearchParams();

	const source = searchParams.get('source') ?? '';
	const severity = searchParams.get('severity') ?? '';

	const filtered = useMemo(() => {
		return SIGNALS.filter((s) => {
			if (source && s.source !== source) return false;
			if (severity && s.severity !== severity) return false;
			return true;
		});
	}, [source, severity]);

	function update(partial) {
		const next = new URLSearchParams(searchParams);
		Object.entries(partial).forEach(([k, v]) => {
			if (v) next.set(k, v);
			else next.delete(k);
		});
		setSearchParams(next, { replace: true });
	}

	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">4 · URL state</h1>
			<p className="text-sm text-slate-500 mb-4">
				Share this view — filters live in <code className="bg-slate-100 px-1 rounded">?query</code>.
			</p>

			<div className="flex flex-wrap gap-3 mb-6">
				<label className="text-sm text-slate-600 flex flex-col gap-1">
					Source
					<select
						className="border border-slate-200 rounded-lg px-2 py-1 text-sm bg-white"
						value={source}
						onChange={(e) => update({ source: e.target.value, severity })}>
						<option value="">All</option>
						{SOURCES.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</label>
				<label className="text-sm text-slate-600 flex flex-col gap-1">
					Severity
					<select
						className="border border-slate-200 rounded-lg px-2 py-1 text-sm bg-white"
						value={severity}
						onChange={(e) => update({ source, severity: e.target.value })}>
						<option value="">All</option>
						{SEVERITIES.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</label>
				<button
					type="button"
					className="self-end text-sm text-indigo-600 font-semibold"
					onClick={() => setSearchParams({}, { replace: true })}>
					Clear
				</button>
			</div>

			<ul className="space-y-3">
				{filtered.map((s) => (
					<li key={s.id}>
						<SignalCard signal={s} subtitle={`${s.source} · ${s.severity}`} />
					</li>
				))}
			</ul>
		</div>
	);
}
```

**Reflection:** _Which filters belong in the URL vs local component state? When would encoding a filter in the URL hurt UX?_

---

## 7 — Example 5: Mock protected routes

This uses **`ProtectedRoute`** + **`<Navigate>`** + **`useNavigate`** after "login". There is **no** real server—only the mock context from the scaffold.

**CodeSandbox-ready** — Create `src/pages/Ex5ProtectedRoute.jsx`.

```jsx
// src/pages/Ex5ProtectedRoute.jsx
// Demonstrates:
//   - Guard component that redirects unauthenticated users
//   - useNavigate for programmatic navigation after mock login
//   - location.state for "return to previous page" pattern
//
// Link: client-side navigation without full page reload.
//   Docs: https://reactrouter.com/api/components/Link
// useLocation: returns the current location object ({ pathname, search, hash, state, key }).
//   Here we read location.state.from to know where to send the user after login.
//   Docs: https://reactrouter.com/api/hooks/useLocation
// useNavigate: returns a navigate(to, options) function for programmatic navigation
//   (e.g. navigate back after a form submit or async event, not a link click).
//   Docs: https://reactrouter.com/api/hooks/useNavigate

import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMockAuth } from '../context/MockAuthContext';

export function Ex5Login() {
	const { isLoggedIn, login } = useMockAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname ?? '/ex5/deck';

	useEffect(() => {
		if (isLoggedIn) navigate(from, { replace: true });
	}, [isLoggedIn, from, navigate]);

	return (
		<div className="max-w-md">
			<h1 className="text-2xl font-bold mb-2">5 · Protected routes (mock)</h1>
			<p className="text-sm text-slate-500 mb-6">
				This button flips auth in memory only — the Authentication lesson replaces this with real sessions.
			</p>
			<button
				type="button"
				onClick={() => login()}
				className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg">
				Mock log in
			</button>
			<p className="text-xs text-slate-400 mt-4">
				Try opening <code className="bg-slate-100 px-1 rounded">/ex5/deck</code> while logged out — the guard redirects here
				and stores the destination in <code className="bg-slate-100 px-1 rounded">location.state</code>.
			</p>
		</div>
	);
}

export default function Ex5Deck() {
	const { logout } = useMockAuth();

	return (
		<div>
			<h1 className="text-2xl font-bold mb-2">Mission deck (protected)</h1>
			<p className="text-sm text-slate-600 mb-4">
				You passed the guard. In HELIOS DECK this route will load widgets from SQLite via a server{' '}
				<code className="bg-slate-100 px-1 rounded">loader</code>.
			</p>
			<div className="flex gap-3">
				<button
					type="button"
					onClick={() => logout()}
					className="text-sm font-semibold text-rose-700 border border-rose-200 px-3 py-1.5 rounded-lg">
					Mock log out
				</button>
				<Link className="text-sm font-semibold text-indigo-600 px-3 py-1.5" to="/ex5/login">
					Go to login screen
				</Link>
			</div>
		</div>
	);
}
```

**Security note:** Never ship production auth like this. The next lesson covers **cookies**, **CSRF protection**, and **server-side session verification**.

---

## — ACT 2: Framework Mode — Explicit Config —

> **Before you begin:** Act 2 assumes students completed Act 1 and can explain `<Route>`, `<Outlet />`, `useParams`, and `useSearchParams`. A quick 5-minute warm-up: "Tell me the difference between `<Link>` and `useNavigate`" shakes off the rust.

---

## 8 — From Declarative Mode to Framework Mode

> _routes defined once,_
> _the server loads your data —_
> _no more useEffect_

You now speak declarative routing fluently. Every concept from Act 1 exists in Framework Mode — the vocabulary is the same.

**Declarative Mode** is React Router as a **routing library inside your React app**.
**Framework Mode** is React Router as a **full application framework** that also handles routing, data loading, actions, code splitting, and rendering strategy.

What Framework Mode **adds**:

| Capability         | Declarative (Act 1)           | Framework Mode (Act 2)                           |
| ------------------ | ----------------------------- | ------------------------------------------------ |
| Route definition   | `<Routes>` inside a component | `routes.js` — explicit JS config, one file       |
| Data before render | `useEffect` / React Query     | `loader` runs on server before the route renders |
| Forms / mutations  | `fetch` in event handlers     | `action` + `<Form>` + automatic revalidation     |
| Code splitting     | Manual `lazy()` / Suspense    | Automatic per route                              |
| SSR / SSG / SPA    | SPA only                      | Any strategy, same config                        |

> **Pedagogical note:** The biggest mental shift from Act 1 is that the server does the work _before_ React renders. Draw the lifecycle diagram on the board before opening any code. Let it sink in.

**Excerpt** — Framework Mode request lifecycle.

```text
HTTP request
    ↓
match routes.js
    ↓
run all loaders in parallel (server)
    ↓
render HTML + stream to browser
    ↓
hydrate (React takes over)
    ↓
client navigations → clientLoader (or re-run server loader via fetch)
```

### The 4 rules of React Router (Framework Mode)

1. Routes form a tree
2. URL walks the tree
3. Layouts render via `<Outlet />`
4. Loaders run at each matched level

> **In class:** write these four rules on the board. Leave them visible for the entire session. Every pattern and every student question comes back to one of these four.

---

## 9 — The `routes.js` config — seven patterns

### The core mental model (read this before the patterns)

Before syntax, give students one invariant to hold onto:

> A React Router app (Framework Mode) is a **tree of routes**.
> Every URL **walks that tree** and renders nested layouts via `<Outlet />`.

The four rules from section 8 apply at every level of that tree. Patterns 1–7 are just the ways to build nodes in it.

---

### Visual map of the tree

> **In class:** draw this tree on the board first, before showing any code. Students need the spatial model before the syntax.

**Excerpt** — how a typical i18n app's routes form a tree.

```text
/                              ← root (root.jsx with <Outlet />)
├── index                      ← detect locale → redirect
├── confirm-account            ← flat, locale-agnostic (auth)
├── api/revalidate             ← resource route (data only, no UI)
├── :locale                    ← dynamic parent (en, es, fr…)
│   ├── index                  ← /:locale (home)
│   ├── who-we-are             ← layout (shared section nav)
│   │   ├── index              ← /:locale/who-we-are
│   │   ├── mission            ← /:locale/who-we-are/mission
│   │   └── board              ← /:locale/who-we-are/board
│   ├── members                ← layout (list shell)
│   │   ├── index              ← /:locale/members
│   │   └── :memberId          ← /:locale/members/abc-123
│   └── *                      ← locale-aware 404
└── *                          ← global fallback 404
```

Each node may have a **layout** (shared chrome), an **index** (default content), and **children** (sub-pages). Content routes live inside `:locale`; auth and API routes live outside it. That's the whole system.

---

### Builder functions — quick reference

**Excerpt** — the four functions from `@react-router/dev/routes`.

```js
import { index, route, layout, prefix } from '@react-router/dev/routes';

// index(file)                    → default child; matches parent URL exactly (no extra segment)
// route(path, file, [children])  → adds a URL segment; maps to a route module file
// layout(file, children)         → adds shared chrome WITHOUT a URL segment
// prefix(path, children)         → groups children under a path WITHOUT a layout file
```

> The official docs show `routes.ts` with TypeScript (`satisfies RouteConfig`). This lesson uses JavaScript — drop the type annotation and the code is identical.

---

### Pattern 1 — Root index: "default child of a route"

**Concept:** `index()` renders when you are at the parent path with no extra segments. Think of it like `index.html` in a folder.

**Teaching sentence:** _"Index = default content of a folder."_

**Excerpt**

```js
index('./routes/_index.jsx'),
```

| URL | Renders                                   |
| --- | ----------------------------------------- |
| `/` | `_index.jsx` inside `root.jsx <Outlet />` |

> **`_index.jsx` vs `index.jsx`** — with explicit `routes.js` config the filename is a plain string; the framework doesn't care what you call it. The underscore prefix is a convention borrowed from **file-based routing**, where `_index.jsx` is *required* to prevent the auto-discovery system from treating it as a layout. With explicit config, `index.jsx` works identically. Common practice: keep `_index.jsx` for the **root route** (visual convention, widely seen in docs and starters); use `index.jsx` inside named folders (e.g. `routes/blog/index.jsx`) — that's what the rest of this lesson does.

Reference: [https://reactrouter.com/api/components/Outlet](https://reactrouter.com/api/components/Outlet)

### Pattern 2 — Flat route: "leaf node"

**Concept:** A route with no children is a final, standalone page. No `<Outlet />` needed.

**Teaching sentence:** _"Flat route = standalone page."_

Some pages are locale-aware (they live inside `:locale`); others are locale-agnostic — auth flows, error pages, legal documents. Both are flat routes; only their position in the tree differs.

**Excerpt**

```js
// locale-agnostic flat route (auth — same page for all locales)
route('confirm-account', './routes/confirm-account.jsx'),

// locale-aware flat route (terms — different copy per locale)
route(':locale', './routes/$locale/layout.jsx', [
  route('terms', './routes/$locale/terms.jsx'),
]),
```

| URL                   | `params.locale` | Renders              |
| --------------------- | --------------- | -------------------- |
| `/confirm-account`    | —               | `confirm-account.jsx`|
| `/en/terms`           | `"en"`          | `$locale/terms.jsx`  |
| `/es/terms`           | `"es"`          | same file, `"es"`    |

---

### Pattern 3 — Resource route: "backend inside the router"

> **In class:** this is often the "aha" moment — the router is not just frontend. Pause here and ask: "What happens if you omit the `default` export?" Let them guess before showing the answer.

**Concept:** A route module with no default component export becomes a server endpoint — returns JSON or a redirect, never HTML. This is where students first encounter full-stack routing.

**Teaching sentence:** _"Same routing system, but returning data instead of HTML."_

API routes live outside the locale tree — they serve data to any client regardless of language.

**Excerpt**

```js
// outside :locale — language-agnostic API
route('api/revalidate', './routes/api.revalidate.js'),
```

```js
// routes/api.revalidate.js — NO default export
export async function loader({ request }) {
  const locale = new URL(request.url).searchParams.get('locale') ?? 'en';
  return Response.json({ ok: true, locale });
}
```

| URL               | Returns               |
| ----------------- | --------------------- |
| `/api/revalidate` | JSON — no UI rendered |

> This is **full-stack routing**, not just frontend routing. The router owns both HTML routes and API endpoints. Locale context for API routes comes from query params or `Accept-Language`, not the URL tree.

---

### Pattern 4 — Dynamic segment parent: "scoped context"

**Concept:** A `:param` segment creates a variable URL slot and propagates that value as `params.param` to every loader and component in the sub-tree.

**Teaching sentence:** _"Dynamic parent = context provider for URLs."_

**Excerpt**

```js
route(':locale', './routes/$locale/layout.jsx', [
  index('./routes/$locale/index.jsx'),
  route('dashboard', './routes/$locale/dashboard/layout.jsx', [...]),
]),
```

| URL             | `params.locale` |
| --------------- | --------------- |
| `/en`           | `"en"`          |
| `/es/dashboard` | `"es"`          |

Every child inherits the param. One tree branch handles all locales.

---

### Pattern 5 — Layout + index + children: "the canonical pattern"

> _the frame stays still —_
> _only the content inside_
> _changes with the path_

> **In class:** this is the pattern students will use 80% of the time. Spend the most time here. Show the layout component with `<Outlet />` first, then the URL table. Ask: "what stays, what changes?"

**Concept:** A layout file owns the persistent shell (nav, sidebar, header). Children fill the content via `<Outlet />`. This is the pattern students will write most.

**Teaching sentence:** _"Layout owns the frame, children fill the content."_

This example nests under the `:locale` parent from Pattern 4, showing how patterns compose in a real i18n app:

**Excerpt**

```js
route(':locale', './routes/$locale/layout.jsx', [
  index('./routes/$locale/index.jsx'),

  route('who-we-are', './routes/$locale/who-we-are/layout.jsx', [
    index('./routes/$locale/who-we-are/index.jsx'),
    route('mission', './routes/$locale/who-we-are/mission.jsx'),
    route('board',   './routes/$locale/who-we-are/board.jsx'),
  ]),
]),
```

| URL                      | What renders                                           |
| ------------------------ | ------------------------------------------------------ |
| `/en/who-we-are`         | `$locale/layout` → `who-we-are/layout` + `index.jsx`  |
| `/en/who-we-are/mission` | `$locale/layout` → `who-we-are/layout` + `mission.jsx`|
| `/es/who-we-are/board`   | same tree, `params.locale` is `"es"`                  |

```jsx
// routes/$locale/who-we-are/layout.jsx
import { Outlet, useParams } from 'react-router';

export default function WhoWeAreLayout() {
  const { locale } = useParams();
  return (
    <div>
      <SectionNav locale={locale} />
      <Outlet />
    </div>
  );
}
```

`params.locale` is available anywhere in the sub-tree — both in loaders and components — without passing it as a prop.

---

### Pattern 6 — Dynamic segment child: "one page per entity"

**Concept:** A `:id` child renders a specific resource instance (post, member, product). The param is available in the loader alongside the inherited `locale` param.

**Teaching sentence:** _"Dynamic child = one page per entity."_

Nested inside `:locale`, both params are available in the loader simultaneously:

**Excerpt**

```js
route(':locale', './routes/$locale/layout.jsx', [
  route('members', './routes/$locale/members/layout.jsx', [
    index('./routes/$locale/members/index.jsx'),
    route(':memberId', './routes/$locale/members/$memberId.jsx'),
  ]),
]),
```

```js
// routes/$locale/members/$memberId.jsx
import { getMember } from '~/db/queries/members';

export async function loader({ params }) {
  const member = getMember(params.memberId, { locale: params.locale });
  if (!member) throw new Response('Not Found', { status: 404 });
  return { member };
}
```

| URL                    | `params.locale` | `params.memberId` |
| ---------------------- | --------------- | ----------------- |
| `/en/members`          | `"en"`          | — (index renders) |
| `/en/members/abc-123`  | `"en"`          | `"abc-123"`       |
| `/es/members/abc-123`  | `"es"`          | `"abc-123"`       |

---

### Pattern 7 — Splat / catchall: "last fallback"

**Concept:** Matches any URL not caught by the routes above. Must be **last** in the config.

**Teaching sentence:** _"Final safety net."_

A 404 that is locale-aware can read the URL prefix to render a translated message:

**Excerpt**

```js
// locale-aware 404 — inside the :locale tree
route(':locale', './routes/$locale/layout.jsx', [
  // ...all other locale routes...
  route('*', './routes/$locale/not-found.jsx'),
]),
// global fallback for anything outside the locale tree (e.g. /confirm-account/typo)
route('*', './routes/catchall.jsx'),
```

| URL                      | Renders                             |
| ------------------------ | ----------------------------------- |
| `/en/unknown-page`       | `$locale/not-found.jsx` (`"en"`)    |
| `/es/unknown-page`       | `$locale/not-found.jsx` (`"es"`)    |
| `/totally-unknown`       | `catchall.jsx` (global fallback)    |

---

### Synthesis

> _seven small patterns —_
> _one tree holds them all at once._
> _the URL knows._

> **In class:** show this synthesis block last. The students should recognise every line from the patterns they just learned. If they can read this cold and name the pattern on each line, they have it.

The seven patterns are not seven independent tools — they compose. A fully i18n-compliant app collapses all of them into one coherent tree:

```js
export default [
  // Pattern 1 — root index (redirect to detected locale)
  index('./routes/_index.jsx'),

  // Pattern 3 — API routes (locale-agnostic, outside the locale tree)
  route('api/revalidate', './routes/api/revalidate.js'),

  // Pattern 2 — locale-agnostic flat route (auth)
  route('confirm-account', './routes/confirm-account.jsx'),

  // Pattern 4 — dynamic parent (locale context for the entire app)
  route(':locale', './routes/$locale/layout.jsx', [
    index('./routes/$locale/index.jsx'),

    // Pattern 2 (locale-aware) — flat page with translated content
    route('terms', './routes/$locale/terms.jsx'),

    // Pattern 5 — layout + index + children
    route('blog', './routes/$locale/blog/layout.jsx', [
      index('./routes/$locale/blog/index.jsx'),
      route(':slug', './routes/$locale/blog/$slug.jsx'), // Pattern 6
    ]),

    // Pattern 6 — entity pages with two params
    route('members', './routes/$locale/members/layout.jsx', [
      index('./routes/$locale/members/index.jsx'),
      route(':memberId', './routes/$locale/members/$memberId.jsx'),
    ]),

    // Pattern 7 — locale-aware 404 (inside the locale tree, must be last)
    route('*', './routes/$locale/not-found.jsx'),
  ]),

  // Pattern 7 — global fallback (outside the locale tree, last of all)
  route('*', './routes/catchall.jsx'),
];
```

The 4 rules from section 8 govern how this tree resolves at runtime:

1. Routes form a tree
2. URL walks the tree
3. Layouts render via `<Outlet />`
4. Loaders run at each matched level

---

### Common mistakes to watch for

| Mistake | Symptom | Fix |
|---|---|---|
| Forgetting `<Outlet />` in a layout | Children never appear | Layout must render `<Outlet />` |
| Putting the catchall before other routes | Everything 404s | `route('*', ...)` must be **last** |
| Using `index()` with a path argument | Build error | `index()` takes only a file — it inherits the parent path |
| Nesting API routes inside `:locale` | URLs become `/en/api/...` | API routes belong outside the locale tree |
| Calling `db` directly in a loader | Works, but couples route to DB | Import from a service module (`~/db/queries/...`) |

---

### Classroom exercise

> **In class:** give students 10–15 minutes. Let them write on paper or in a blank file — no running code yet. The goal is internalizing the tree, not passing a compiler.

**Task** — model an i18n blog in `routes.js`. Write only the config calls, no component code.

```text
/                   redirect to detected locale
/confirm-account    auth page (same for all locales)
/:locale            locale shell (en, es, fr…)
/:locale/           locale home (index)
/:locale/blog       blog list
/:locale/blog/:slug single post
/api/posts          JSON endpoint (no UI)
/:locale/*          locale 404
/*                  global 404
```

**Expected solution:**

**Template** — fill in the file paths for your project.

```js
export default [
  index('./routes/_index.jsx'),                           // P1 — root redirect
  route('confirm-account', './routes/confirm-account.jsx'), // P2 — flat, locale-agnostic
  route('api/posts', './routes/api/posts.js'),            // P3 — resource route

  route(':locale', './routes/$locale/layout.jsx', [       // P4 — dynamic parent
    index('./routes/$locale/index.jsx'),                  // P1 — locale home

    route('blog', './routes/$locale/blog/layout.jsx', [   // P5 — layout
      index('./routes/$locale/blog/index.jsx'),
      route(':slug', './routes/$locale/blog/$slug.jsx'),  // P6 — dynamic child
    ]),

    route('*', './routes/$locale/not-found.jsx'),         // P7 — locale 404
  ]),

  route('*', './routes/catchall.jsx'),                    // P7 — global fallback
];
```

Ask students: what does the root `index()` need to do? (Detect the browser's preferred locale and redirect to `/{locale}`.) That's Pattern 1 + a loader that reads `Accept-Language` or a cookie.

---

## 10 — Production reference: reading ADADI's route config

> _theory meets the real —_
> _fifty routes, two languages,_
> _one file holds the map_

> **Context:** [adadi.org](https://adadi.org) is a bilingual professional association website (EN + ES) built with React Router v7 Framework Mode and explicit config. Its route table (TypeScript in production, shown here as JS) is the canonical production reference for this lesson.

> **In class:** open the ADADI routes excerpt on the projector. Ask students to identify each pattern silently for 2 minutes before discussing. Cold reading a production config is one of the most valuable exercises in this lesson.

### The i18n problem ADADI had to solve

ADADI is a professional association with a bilingual audience: English and Spanish. The routing challenge was not just translating content — it was translating **URLs**.

Most i18n tutorials stop at translated content: one URL, two languages, a language toggle. ADADI went further: the URL itself changes per language.

```text
English:  /en/who-we-are/mission-vision
Spanish:  /es/quienes-somos/mision-vision
```

These are two different URLs pointing to structurally equivalent pages. The URL slug (`who-we-are` vs `quienes-somos`) is part of the user experience — it should read naturally in the user's language, appear correctly in search results, and be shareable within that language community.

This rules out the simple approach (one URL, `?lang=es` query param, or a header toggle). The routes themselves must be bilingual.

---

### Why explicit `routes.js` was essential

File-based routing (auto-discovery) would require two separate file trees for the same content structure — confusing to maintain and impossible to keep in sync. Explicit config lets you express the bilingual structure declaratively in one place:

```js
// Both sections map to the same layout pattern — different URL slugs
route('who-we-are',   './routes/$locale/who-we-are/layout.jsx',   [...]), // EN
route('quienes-somos','./routes/$locale/quienes-somos/layout.jsx', [...]), // ES
```

The layout files are different (so each can load the right CMS slug), but they follow the same structural pattern. The config makes that symmetry visible at a glance.

---

### The architecture in three decisions

**Decision 1 — `:locale` as a dynamic segment, not a hardcoded pair of trees.**

The naive approach would be two parallel static trees: `route('en', ...)` and `route('es', ...)`. ADADI uses `route(':locale', ...)` instead. A single tree handles all language codes. Adding a third language (e.g. French) means adding translated slug routes inside the existing tree, not duplicating the whole structure.

**Decision 2 — locale-agnostic routes live outside `:locale`.**

Auth flows (`confirm-account`) and API endpoints (`api/cms/*`, `api/revalidate`) are the same regardless of language. They sit at the root level, outside the `:locale` subtree, so they are not affected by locale context and do not carry a language prefix in their URL.

**Decision 3 — the root `index()` redirects to the detected locale.**

`/` itself renders nothing — it reads the `Accept-Language` header (or a stored preference cookie) and issues a redirect to `/{locale}`. The user always lands on a locale-scoped URL. This is a **resource-route-style loader** on a Pattern 1 index: no UI, just a redirect response.

```js
// routes/_index.jsx — no default component export
export async function loader({ request }) {
  const locale = detectLocale(request); // reads Accept-Language or cookie
  throw redirect(`/${locale}`);
}
```

---

### The bilingual parallel tree (the key insight)

Inside `:locale`, ADADI maintains **parallel bilingual subtrees**: `who-we-are` (EN) and `quienes-somos` (ES) are siblings in the config. Both follow Pattern 5 (layout + index + children). The loader in each leaf reads the CMS using the locale-specific slug.

```text
/:locale
  ├── who-we-are/          ← EN subtree
  │     ├── index
  │     ├── mission-vision
  │     └── objectives
  └── quienes-somos/       ← ES subtree (parallel structure, different slugs)
        ├── index
        ├── mision-vision
        └── objetivos
```

This pattern means a Spanish-speaking user who navigates to `/es/quienes-somos/mision-vision` gets a properly structured, SEO-friendly, shareable URL — not a translated overlay on an English URL.

The trade-off: more routes to maintain. The benefit: clean, crawlable, language-native URLs with no URL hacks.

---

The file maps 50+ routes in ~200 lines. Read it as an exercise: for each `route()` call, identify which of the seven patterns above it uses.

**Excerpt** — ADADI's route config (TypeScript stripped, patterns annotated)

```js
// app/routes.js — ADADI production reference
// TypeScript: `satisfies RouteConfig` removed for clarity; patterns are identical in JS

import { index, route } from '@react-router/dev/routes';

export default [
	// ── PATTERN 1: Root index ──────────────────────────────────────────────────
	index('./routes/_index.jsx'), // matches /

	// ── PATTERN 2: Flat routes (no children) ──────────────────────────────────
	route('confirm-account', './routes/confirm-account.jsx'), // /confirm-account

	// ── PATTERN 3: Resource routes (API endpoints, no component) ─────────────
	route('api/cms/*', './routes/api.cms.$.js'), // BFF: CMS JSON proxy
	route('api/media/*', './routes/api.media.js'), // BFF: media proxy
	route('api/revalidate', './routes/api.revalidate.js'), // Strapi webhook
	route('api/contact/send-email', './routes/api.contact.send-email.js'),

	// ── PATTERN 4: Dynamic segment parent (locale-scoped tree) ────────────────
	route(':locale', './routes/$locale.layout.jsx', [
		// /:locale (all pages)

		index('./routes/$locale.index.jsx'), // /:locale

		// ── PATTERN 5: Layout + index + named children ──────────────────────
		route('who-we-are', './routes/$locale/who-we-are/layout.jsx', [
			index('./routes/$locale/who-we-are/index.jsx'), // /:locale/who-we-are
			route('mission-vision', './routes/$locale/who-we-are/mission-vision.jsx'),
			route('objectives', './routes/$locale/who-we-are/objectives.jsx'),
			route('bylaws', './routes/$locale/who-we-are/bylaws.jsx'),
		]),

		// ── SAME SECTION in Spanish (parallel bilingual tree) ───────────────
		// This is WHY explicit config is used: file conventions cannot express
		// two different URL slugs pointing to the same layout pattern.
		route('quienes-somos', './routes/$locale/quienes-somos/layout.jsx', [
			index('./routes/$locale/quienes-somos/index.jsx'), // /:locale/quienes-somos
			route('mision-vision', './routes/$locale/quienes-somos/mision-vision.jsx'),
			route('objetivos', './routes/$locale/quienes-somos/objetivos.jsx'),
		]),

		// ── PATTERN 6: Dynamic segment child ─────────────────────────────────
		route('membership', './routes/$locale/membership/layout.jsx', [
			index('./routes/$locale/membership/index.jsx'),
			route('members', './routes/$locale/membership/members/layout.jsx', [
				index('./routes/$locale/membership/members/index.jsx'),
				route(':memberId', './routes/$locale/membership/members/$memberId.jsx'),
				//        ↑ params.memberId available in this route's loader
			]),
		]),

		// ── PATTERN 7: Splat / catchall ───────────────────────────────────────
		route('*', './routes/[...404].jsx'), // /:locale/* → 404
	]),
];
```

**Teaching questions:**

1. _Why are `who-we-are` and `quienes-somos` both present as siblings?_ They are bilingual aliases for the same content section. The user sees `/en/who-we-are` or `/es/quienes-somos` depending on language — different URLs, structurally equivalent routes.
2. _What does `route('api/cms/*', ...)` do differently from a regular route?_ Its module exports only a `loader`—no React component. The router uses it as a pure HTTP handler.
3. _Why does `':locale'` appear at the top level instead of being hardcoded?_ It lets the same route tree work for any language code (`/en/...`, `/es/...`, `/fr/...`) without duplicating routes.

---

### Conclusion: one way to use React Router Framework Mode

The seven patterns exist to explain the system. In practice, **you do not choose between them** — you combine them into one architecture, and that architecture has a clear shape.

Here it is:

```text
/                        ← root index (detect locale → redirect)
/confirm-account         ← flat, locale-agnostic (auth, legal)
/api/*                   ← resource routes (data endpoints, no UI)

/:locale                 ← dynamic parent (the locale shell, owns the top layout)
  /                      ← locale home
  /section               ← layout + index + named children (Pattern 5)
  /section/:id           ← dynamic child (entity pages, Pattern 6)
  /*                     ← locale-aware 404

/*                       ← global fallback
```

This is the structure ADADI uses in production. It is not the only valid structure — React Router imposes none. But it is the one that scales cleanly from a two-page site to a 50-route bilingual app without needing to restructure. Start with it, and the patterns you learned are already in place.

**The recommendation for this course:**

Use React Router Framework Mode with explicit `routes.js` config, `:locale` as the dynamic parent of the entire app, and one layout per section. Locale-agnostic routes (auth, API) sit outside the locale tree. Every content page sits inside it.

This is not a constraint — it is a decision made once, up front, so you never have to make it again mid-project. The ADADI codebase is the proof that it works at production scale.

| If you need | Use |
|---|---|
| A page that is the same for all languages | Flat route outside `:locale` |
| A page with translated content and URL | Route inside `:locale` with a locale-specific slug |
| Data for the server before render | `loader` in the route module |
| A form that mutates data | `action` in the route module |
| An API endpoint (no UI) | Resource route (no `default` export) |
| A translated 404 | `route('*', ...)` inside `:locale` |

If every route decision you make fits one of these rows, your architecture is sound.

---

## 11 — Route modules: what each file exports

> **In class:** after the pattern exercise, pivot to: "OK, you know _where_ files go in the tree — now let's see _what goes inside each file_." This section is the bridge between config and implementation.

A **route module** is the file referenced in `routes.js`. It can export any combination of:

| Export          | Runs where                             | Purpose                                                             |
| --------------- | -------------------------------------- | ------------------------------------------------------------------- |
| `loader`        | Server (or client with `clientLoader`) | Fetch data before rendering; result available via `useLoaderData()` |
| `action`        | Server (or client with `clientAction`) | Handle form submissions / mutations; triggers revalidation          |
| `default`       | Browser                                | The React component that renders when this route matches            |
| `ErrorBoundary` | Browser                                | Renders when `loader`, `action`, or the component throws            |
| `meta`          | Server                                 | HTML `<meta>` tags for this route                                   |
| `links`         | Server                                 | `<link>` tags (stylesheets, preloads) for this route                |
| `handle`        | Both                                   | Custom metadata for `useMatches` (breadcrumbs, i18n keys)           |

**Excerpt** — Minimal route module with `loader` + `default` (JS, no TypeScript).

```jsx
// app/routes/signals/solar-activity.jsx
// Pattern: loader calls a service function → useLoaderData in component

import { useLoaderData } from 'react-router';
import { getRecentSignals } from '~/db/queries/signals';

export async function loader() {
  const flares = getRecentSignals('solar_flare_events', { limit: 20 });
  return { flares };
}

export default function SolarActivity() {
  const { flares } = useLoaderData();

  return (
    <ul>
      {flares.map((f) => (
        <li key={f.id}>{f.value}</li>
      ))}
    </ul>
  );
}
```

The SQL lives in a service module, not in the route:

```js
// app/db/queries/signals.js
import db from '~/db';

export function getRecentSignals(signal, { limit = 20 } = {}) {
  return db
    .prepare(
      `SELECT * FROM signals
       WHERE signal = ?
       ORDER BY timestamp DESC
       LIMIT ?`
    )
    .all(signal, limit);
}
```

> `useLoaderData()` replaces `useQuery` for data that can be fetched server-side. The router runs all loaders for the matched route **in parallel**, streams HTML to the browser, and hydrates. No waterfall, no empty shell, no useEffect on mount.

---

## 12 — HELIOS DECK seed — explicit config scaffold

> _type three commands —_
> _a server is born from seed._
> _now make it yours._

**Template** — Run locally; replace `helios-deck` with your folder name.

```bash
# Node 20+ required
npx create-react-router@latest helios-deck --template remix-run/react-router-templates/javascript
cd helios-deck
npm install
npm run dev
```

> **`remix-run` org — not Remix.** The CLI is `create-react-router` and the package it scaffolds is React Router v7. The templates live in the `remix-run` GitHub organisation because React Router v7 Framework Mode is the direct successor to Remix (the same team, same codebase, new name). `create-remix` and Remix v2 are the old tool. Use `create-react-router` and the `react-router-templates` repo for everything in this course.

The `javascript` template scaffolds the app with explicit config (`app/routes.js`) and no TypeScript — exactly the stack this lesson and the HELIOS DECK track use.

### Scaffold: `app/routes.js` (Sprint 1 seed, JS)

**Template** — This is the starting route table for HELIOS DECK. Signal routes will grow as you implement each fetcher in the subsequent sprints.

```js
// app/routes.js
// HELIOS DECK — Sprint 1 route table
// Explicit config. All routes listed here; route modules live in app/routes/.

import { index, route } from '@react-router/dev/routes';

export default [
	// Landing — "/"
	index('./routes/_index.jsx'),

	// Auth (flat — no shared layout between login/logout/register)
	route('auth/login', './routes/auth/login.jsx'),
	route('auth/register', './routes/auth/register.jsx'),
	route('auth/logout', './routes/auth/logout.jsx'), // action-only, no component

	// Protected dashboard — "/dashboard/..."
	// loader: requireUser(request) → redirect to /auth/login if no session
	route('dashboard', './routes/dashboard/layout.jsx', [
		index('./routes/dashboard/index.jsx'),
		route('widgets', './routes/dashboard/widgets.jsx'), // CRUD modal target
	]),

	// Signals (public read) — "/signals/..."
	route('signals', './routes/signals/layout.jsx', [
		index('./routes/signals/index.jsx'),
		route('solar-activity', './routes/signals/solar-activity.jsx'),
		route('solar-wind', './routes/signals/solar-wind.jsx'),
		route('kp-index', './routes/signals/kp-index.jsx'),
		route('aurora', './routes/signals/aurora.jsx'),
		route('iss-tracker', './routes/signals/iss-tracker.jsx'),
		route('solar-radiation', './routes/signals/solar-radiation.jsx'),
		route(':signalId', './routes/signals/$signalId.jsx'), // generic fallback detail
	]),

	// API resource routes (no component — server handlers only)
	route('api/aggregate', './routes/api/aggregate.js'), // cron trigger endpoint

	// Catchall 404
	route('*', './routes/catchall.jsx'),
];
```

### Sprint 1 milestone: your first loader

Once the scaffold runs, the first concrete task is wiring one real signal. Create the route module below — it uses mock data initially; in Sprint 2 you swap the mock for a service that reads from SQLite.

**Template** — `app/routes/signals/solar-activity.jsx`

```jsx
// app/routes/signals/solar-activity.jsx
// Sprint 1: returns mock data.
// Sprint 2: replace MOCK_FLARES with getRecentSignals() from ~/db/queries/signals.

import { useLoaderData, Link } from 'react-router';

const MOCK_FLARES = [
  { id: 1, signal: 'solar_flare_events', source: 'NASA_DONKI', value: '{"classType":"M2.1"}' },
  { id: 2, signal: 'solar_flare_events', source: 'NASA_DONKI', value: '{"classType":"C5.3"}' },
];

export async function loader() {
  // Sprint 2: import { getRecentSignals } from '~/db/queries/signals';
  // Sprint 2: const flares = getRecentSignals('solar_flare_events', { limit: 20 });
  return { flares: MOCK_FLARES };
}

export default function SolarActivity() {
  const { flares } = useLoaderData();

  return (
    <div>
      <h1>Solar Flare Events</h1>
      <Link to="/signals">&larr; All signals</Link>
      <ul>
        {flares.map((f) => (
          <li key={f.id}>
            #{f.id} &middot; {f.source} &middot; {JSON.parse(f.value).classType}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

> **Cross-links:** Track hub → [HELIOS DECK (ES)]({{ '/tracks/es/geo-physical-aggregator/' | relative_url }}) · Architecture → [SSR + SQLite + loaders]({{ '/tracks/es/geo-physical-aggregator/arch/' | relative_url }})

---

## — ACT 3: AI-Empowered Development —

> ACT 3 has been expanded into its own dedicated lesson. Proceed there after completing ACTs 1 and 2.
>
> **[AI-Assisted Routing: From Architect to Auditor](../ai-assisted-routing/)** — failure modes, verification protocol, architectural prompting, security rules, controlled failure exercise, and the AI development loop applied to React Router.

---

## 13 — Sprint deliverables

|     | Deliverable                                           | Act |
| --- | ----------------------------------------------------- | --- |
| ✅  | CodeSandbox with 5 working examples (Act 1)           | 1   |
| ✅  | Dynamic segment + detail view (`useParams`)           | 1   |
| ✅  | Nested layout + `<Outlet>`                            | 1   |
| ✅  | Query-string filters (`useSearchParams`)              | 1   |
| ✅  | Protected route with mock guard                       | 1   |
| ✅  | HELIOS seed running locally (`npm run dev`)           | 2   |
| ✅  | `app/routes.js` with explicit config (Sprint 1 shape) | 2   |
| ✅  | One loader returning mock data, visible in browser    | 2   |
| ✅  | `.cursor/rules/react-router-patterns.mdc`             | AI  |

---

## 14 — Atelier reflections

> _Read ADADI's route config cold. Before the explanation, count how many of the seven patterns you can identify. What did you miss?_

> _Which part of your HELIOS DECK URL structure cannot be expressed with file naming conventions? Prove it._

> _Explain to a classmate, without code, what happens between the browser typing `/en/members/abc-123` and the page appearing. Use the 4 rules._

> _If you add French to HELIOS DECK tomorrow, which files change and which don't?_

---

## 📚 Reference cheatsheet

### Declarative Mode (Act 1 — CodeSandbox)

**Excerpt** — APIs used in Act 1.

```jsx
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Link,
	NavLink,
	Outlet,
	useParams,
	useSearchParams,
	useNavigate,
	useLocation,
} from 'react-router-dom';

// NavLink: className={({ isActive }) => isActive ? 'active' : ''}
// Dynamic:  const { id } = useParams();
// URL state: const [p, setP] = useSearchParams();  p.get('key')
// Programmatic: const nav = useNavigate();  nav('/path', { replace: true })
// Guard:    <Navigate to="/login" replace state={{ from: location }} />
```

### Framework Mode (Act 2 — local project)

**Excerpt** — Explicit config builders + route module exports.

```js
// app/routes.js
import { index, route, layout, prefix } from '@react-router/dev/routes';

export default [
	index('./routes/_index.jsx'),
	route('path', './routes/file.jsx', [
		/* children */
	]),
	layout('./routes/layout-file.jsx', [
		/* children (no URL segment) */
	]),
	...prefix('group', [
		/* children prefixed with /group */
	]),
];
```

```jsx
// any route module file
import { useLoaderData, useActionData, redirect, Form } from 'react-router';

export async function loader({ request, params }) {
	// params.signalId, etc.
	return { data };
}

export async function action({ request }) {
	const fd = await request.formData();
	// mutate → redirect
	return redirect('/dashboard');
}

export default function MyRoute({ loaderData }) {
	// or: const { data } = useLoaderData();
}

export function ErrorBoundary() {
	/* ... */
}
```

---

## Official docs (keep versions pinned)

- RR v7 — **Picking a mode**: [reactrouter.com/start/modes](https://reactrouter.com/start/modes)
- RR v7 — **Framework routing** (explicit config): [reactrouter.com/start/framework/routing](https://reactrouter.com/start/framework/routing)
- RR v7 — **Route module API** (loader, action, ErrorBoundary…): [reactrouter.com/start/framework/route-module](https://reactrouter.com/start/framework/route-module)
- RR v7 — **File conventions** (B path): [reactrouter.com/how-to/file-route-conventions](https://reactrouter.com/how-to/file-route-conventions)
- shadcn/ui — **React Router template**: [ui.shadcn.com/docs/installation/react-router](https://ui.shadcn.com/docs/installation/react-router)
- shadcn/ui — **Skills / CLI v4**: [ui.shadcn.com/docs/skills](https://ui.shadcn.com/docs/skills)

---

## 🔗 Lesson navigation

| Previous                                             | Current     | Next                                                    |
| ---------------------------------------------------- | ----------- | ------------------------------------------------------- |
| [Backend Integration](../react-backend-integration/) | **Routing** | [AI-Assisted Routing](../ai-assisted-routing/) |

---

> _a URL is a promise:_
> _this address names a place —_
> _don't break that contract._
