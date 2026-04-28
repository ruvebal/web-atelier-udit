---
layout: lesson
title: 'AI-Assisted Routing: From Architect to Auditor'
slug: ai-assisted-routing
category: react
tags: [react, ai, routing, react-router, architecture, security, prompting, verification]
week: 7
phase: 2
sprint: 8
date: 2025-03-16
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/ai-assisted-routing/
status: in progress
---

<!-- prettier-ignore-start -->

## Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> _"AI shifts the developer's role from writer to architect and auditor."_

---

## Sprint Goal

**By the end of this lesson**: you can use AI to generate route modules and `routes.js` config **without outsourcing architectural decisions** — and you can verify AI output against the routing rules, security constraints, and product requirements of your project.

**Prerequisite**: [Routing & Navigation](../react-routing/) (the seven patterns, Framework Mode, explicit config, i18n architecture).

**Builds on**: [AI Theory & Architecture for React](../ai-assisted-development-foundations/) (contracts, decomposition, verification loops).

---

## 1 — The thesis

Students will ask: **"If Claude Code can scaffold an app in 5 minutes, why learn routing?"**

The answer is not that AI is bad at routing. It is often _good enough_ at routing — and that is the danger. "Good enough" code that works on happy paths but leaks data, breaks on refresh, or ignores your architecture is harder to fix than code that fails obviously.

> AI optimizes for **working code**, not **correct architecture**.

The upgraded thesis for this course:

> **AI compresses typing, not judgment. It shifts the developer's role from implementer to system designer and verifier.**

---

## 2 — Where AI breaks routing (failure modes)

AI tools produce routing code that _runs_ but violates the mental model. Train students to recognize these patterns before they trust AI output:

| Failure | What the AI generates | Consequence |
|---|---|---|
| Missing loader boundary | `useEffect` + `fetch` inside the component | Broken SSR, double fetching, empty HTML shell, no SEO |
| Ignoring auth in loaders | No `requireUser(request)` call | Data leaks — the loader returns protected data to unauthenticated users |
| Wrong nesting | Layout placed as a sibling instead of a parent | UI duplication, `<Outlet />` renders nothing, broken breadcrumbs |
| Route mismatch | `/dashboard` vs `/dashboard/` trailing slash confusion | 404 on page refresh in production |
| Overusing client fetch | `fetch('/api/...')` inside React components | Bypasses Framework Mode entirely — no parallel loading, no revalidation, waterfalls |
| Flat structure for i18n | All routes at root level, no `:locale` parent | Cannot scale to multiple languages, URL structure breaks |
| Params without validation | `params.memberId` used directly in SQL query | Injection risk — params are user-controlled strings |

### Teaching sentence

> "If you cannot name the failure mode, you cannot verify AI output."

---

## 3 — AI tools: what they compress, what they cannot replace

| Tool / practice | What it compresses | What it cannot replace |
|---|---|---|
| **shadcn/ui CLI v4** (`init --template react-router`) | Scaffolding a project with the right config | Deciding **which** routes are public vs protected |
| **shadcn/skills** (`npx skills add shadcn/ui`) | Agent context for components + CLI | Your **security** and **product** constraints |
| **shadcn MCP** (`npx shadcn@latest mcp init`) | Live component registry lookups in Cursor | Route architecture decisions |
| **v0 (Vercel)** | Rapid layout prototypes from prompts | Connecting prototypes to **real loaders** |
| **Cursor/Windsurf rules** | Enforcing project conventions | Testing edge cases: refresh, back button, stale params |
| **Claude Code / Codex** | Generating route modules, loaders, actions | Validating that the generated code matches your architecture |

---

## 4 — Verification protocol (the route checklist)

Every AI-generated route must pass this checklist before commit. Make it a **mandatory PR checklist** in your repos:

```text
ROUTE CHECKLIST

[ ] Does this route have a loader if it needs data?
[ ] Is data loaded BEFORE render (loader), not in useEffect?
[ ] If protected → is requireUser(request) the FIRST call in the loader?
[ ] Does the layout correctly use <Outlet />?
[ ] Can I refresh the page at this URL without breaking?
[ ] Can I deep-link directly to this URL and get the right content?
[ ] Does navigation from another page preserve state correctly?
[ ] Are params validated before use (not passed raw to queries)?
[ ] Does this route sit inside :locale if it's locale-aware?
[ ] Is the route registered in routes.js (not just a file in routes/)?
```

### Teaching move

Print this. Tape it next to the monitor. Every PR review starts here.

---

## 5 — Architectural prompting (constraining AI output)

Prompting is not about asking for code — it is about **constraining architecture**.

### Weak prompt (what students write)

```text
Create a dashboard page with authentication
```

The AI will generate something that works — `useEffect` + `fetch` + a `useState` guard. It will look right. It will be wrong.

### Strong prompt (what you want them to learn)

```text
Create a React Router v7 route module using Framework Mode (explicit config):

- Route path: /:locale/dashboard (nested inside the :locale parent)
- Protected: requireUser(request) must be the first call in loader
- Data: load user dashboard config from SQLite via better-sqlite3 (raw SQL)
- Loader runs server-side; no useEffect, no client-side fetch
- Layout must include <Outlet /> for child widget routes
- Include an index route for default dashboard content
- Use action() for any mutations (widget CRUD)
- Follow HELIOS DECK routing conventions (explicit routes.js, no file-based routing)
```

### The rule

> "If your prompt doesn't encode architecture, the output won't either."

### Prompt anatomy (teach this structure)

```text
1. FRAMEWORK — which mode, which version
2. ROUTE CONTRACT — path, params, nesting
3. DATA — where it comes from, which layer
4. AUTH — who can access, where the check lives
5. MUTATIONS — how forms submit, what revalidates
6. CONVENTIONS — project-specific rules
```

---

## 6 — The AI development loop

Students need a **procedure**, not a list of tips. Teach this loop:

```text
1. DEFINE  → Write the route contract (URL, data needs, auth level)
2. PROMPT  → Generate with architectural constraints
3. INSPECT → Compare against the route checklist (section 4)
4. TEST    → Refresh, deep link, mutate, log out and try again
5. LOCK    → Commit + reinforce rules (.cursor/rules, CLAUDE.md)
```

Each step maps to a commit-worthy artifact:

| Step | Artifact |
|---|---|
| DEFINE | Route contract in a comment or doc |
| PROMPT | Generated route module |
| INSPECT | PR review with checklist |
| TEST | Manual verification (refresh, deep link, auth) |
| LOCK | Committed code + updated project rules |

This aligns with the **commit-per-session** pedagogy: each cycle through the loop produces a meaningful, verifiable commit.

---

## 7 — Routing as product surface

Routing decisions are not implementation details — they are product decisions:

| Routing decision | Product impact |
|---|---|
| URL structure (`:locale/who-we-are`) | SEO, shareability, user trust |
| Route protection (`requireUser`) | Security model — who sees what |
| Nested layouts (`<Outlet />`) | UX consistency — persistent nav, sidebar |
| Dynamic segments (`:memberId`) | Content scalability — one route serves N entities |
| Resource routes (`api/revalidate`) | API surface — what data is exposed, to whom |
| Catchall (`*`) | Error experience — what happens when something is wrong |

### Teaching sentence

> "Every route is a product decision disguised as code."

AI can generate the code for any of these. It cannot make the product decision. That is your job.

---

## 8 — Security: non-negotiable rules

These are not suggestions. They are invariants. Extend the `.cursor/rules/react-router-patterns.mdc` from the routing lesson:

```markdown
Security:

- NEVER trust params without validation (params are user-controlled strings)
- ALL protected routes must call requireUser(request) as the FIRST line in loader
- Role-based logic must live in loader(), not in the UI (hiding a button is not security)
- Redirect unauthorized users at loader level (throw redirect('/auth/login'))
- Resource routes that return sensitive data must also check auth
- NEVER expose raw database errors to the client
```

### Teaching sentence

> "A button hidden with CSS is not a security boundary. A loader that checks auth is."

---

## 9 — Controlled failure exercise (classroom)

Give students this AI-generated route and ask them to find the architectural errors:

**Excerpt** — intentionally broken route module.

```jsx
// routes/dashboard.jsx — generated by AI, NOT reviewed
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(setUser);
    fetch('/api/dashboard').then(r => r.json()).then(setData);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user.name}'s Dashboard</h1>
      <div>{data?.widgets?.map(w => <div key={w.id}>{w.title}</div>)}</div>
    </div>
  );
}
```

### Expected student findings

| Error | Rule violated | Fix |
|---|---|---|
| Data fetching in `useEffect` | Data must be in `loader()` | Move both fetches to `loader`, return as props |
| No `loader` export | Framework Mode requires `loader` for data | Add `export async function loader({ request })` |
| Auth check in UI (`if (!user)`) | Auth must be in `loader` | `requireUser(request)` as first loader call |
| No `<Outlet />` | Dashboard should be a layout for child routes | Add outlet for widget sub-routes |
| Client fetch to `/api/dashboard` | Bypasses Framework Mode | Read directly from SQLite in the loader |
| No error boundary | Component will white-screen on fetch failure | Add `export function ErrorBoundary()` |
| Route not in `routes.js` | Explicit config requires registration | Add to `routes.js` config |

### Corrected version

**Excerpt** — the same route, architecturally sound.

```jsx
// routes/$locale/dashboard/layout.jsx
import { Outlet, useLoaderData } from 'react-router';
import { requireUser } from '~/services/auth.server';
import { getUserDashboard } from '~/services/dashboard.server';

export async function loader({ request, params }) {
  const user = await requireUser(request);
  const dashboard = getUserDashboard(user.id);
  return { user, dashboard };
}

export default function DashboardLayout() {
  const { user, dashboard } = useLoaderData();
  return (
    <div>
      <h1>{user.name}'s Dashboard</h1>
      <DashboardNav widgets={dashboard.widgets} />
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  return <div>Something went wrong loading the dashboard.</div>;
}
```

---

## 10 — Deliverable: project rules for AI agents

Add `.cursor/rules/react-router-patterns.mdc` to your HELIOS repo:

```markdown
---
description: React Router v7 explicit config conventions for HELIOS DECK
globs: ['app/routes.js', 'app/routes/**/*.jsx']
---

Route definition:

- ALL routes are defined in app/routes.js (explicit config, not file-based)
- Route modules live in app/routes/ following the path structure
- All locale-aware routes sit inside route(':locale', ...)

Loaders:

- All data fetching happens in loader(), not useEffect
- requireUser(request) is the first call in any protected loader
- Return plain objects from loader
- Read from SQLite via better-sqlite3 (raw SQL, no ORM)

Actions:

- Form mutations use action() + <Form method="post"> + redirect on success
- No direct fetch('/api/...') inside React components

Security:

- NEVER trust params without validation
- ALL protected routes call requireUser(request) first
- Role checks live in loader(), not UI
- Redirect unauthorized at loader level

Naming:

- Dynamic segments: $paramName.jsx (e.g. $memberId.jsx)
- Layout files: layout.jsx
- Index files: index.jsx (root: _index.jsx)
- Catchall: catchall.jsx or not-found.jsx
```

---

## 11 — Atelier reflections

> _You gave your `routes.js` to Claude Code and asked it to add a new protected signal route. It returned a version that works—but it used `useEffect` instead of `loader`. What is wrong with that, and how do you explain it to the agent?_

> _A route guard that only runs in the browser is not a security boundary. Why not? Where must the real check live?_

> _Write the weakest possible prompt for a new dashboard route. Then write the strongest. What did you add, and why does each constraint matter?_

> _Your teammate's PR adds a new route. The route works when you click to it. It breaks on page refresh. What architectural error would cause this?_

---

## Reference cheatsheet

### AI Development Loop

```text
1. DEFINE  → Route contract (URL, data, auth)
2. PROMPT  → Generate with constraints
3. INSPECT → Checklist verification
4. TEST    → Refresh, deep link, mutate, auth edge cases
5. LOCK    → Commit + rules reinforcement
```

### Route Checklist (print this)

```text
[ ] loader if data needed
[ ] loader, not useEffect
[ ] requireUser first in protected loaders
[ ] <Outlet /> in layouts
[ ] survives refresh
[ ] survives deep link
[ ] state preserved on navigation
[ ] params validated
[ ] inside :locale if locale-aware
[ ] registered in routes.js
```

### Prompt Structure

```text
1. FRAMEWORK  (RR v7, Framework Mode, explicit config)
2. ROUTE      (path, params, nesting)
3. DATA       (source, layer, ORM/raw)
4. AUTH       (public/protected, role)
5. MUTATIONS  (action, form, revalidation)
6. CONVENTIONS (project rules)
```

---

## Official docs

- React Router v7 — **Route module API**: [reactrouter.com/start/framework/route-module](https://reactrouter.com/start/framework/route-module)
- React Router v7 — **Framework routing**: [reactrouter.com/start/framework/routing](https://reactrouter.com/start/framework/routing)
- shadcn/ui — **Skills / CLI v4**: [ui.shadcn.com/docs/skills](https://ui.shadcn.com/docs/skills)

---

## Lesson navigation

| Previous | Current | Next |
|---|---|---|
| [Routing & Navigation](../react-routing/) | **AI-Assisted Routing** | [Backend Integration](../react-backend-integration/) |

---

> _"AI accelerates output. Architecture protects outcomes. Verification is the bridge."_
