---
layout: lesson
title: 'AI Theory & Architecture for React: Contracts, Decomposition, Verification'
slug: ai-assisted-development-foundations
category: react
tags: [react, ai, architecture, contracts, verification, prompting, security, mcp, claude-code, cursor]
week: 4
phase: 1
sprint: 4
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/ai-assisted-development-foundations/
status: in progress
---

<!-- prettier-ignore-start -->

## Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> _"AI accelerates output. Architecture protects outcomes."_

---

## Sprint Goal

**By the end of this sprint**: you can use AI as a collaborator **without outsourcing understanding**, by working with **contracts**, **decomposition**, and **verification loops** that reduce risk (bugs, security issues, accessibility regressions).

You will also understand the **tool landscape** (Claude Code, Cursor, MCP, shadcn) well enough to know what each compresses and what each cannot replace.

---

## Canonical Reading (Required)

This lesson is React-focused, but it builds on the canonical methodology:

- [`/methodology/en/ai-assisted-development-foundations/`](/methodology/en/ai-assisted-development-foundations/)

---

## 1 — The state of AI-assisted development (2025–2026)

The landscape has shifted from autocomplete to **autonomous agents**. Understanding what changed — and what didn't — is the prerequisite for everything else in this lesson.

### What changed

| Era | Tool model | Developer role |
|---|---|---|
| **2023** | Autocomplete (Copilot inline suggestions) | Writer with suggestions |
| **2024** | Chat-in-editor (Cursor, Copilot Chat) | Writer who asks questions |
| **2025** | Agentic coding (Claude Code, Codex CLI) | Architect who delegates and verifies |
| **2026** | Multi-agent teams (Claude Code subagents, `/batch`, Agent SDK) | System designer who orchestrates agents |

### What did NOT change

- Code still runs on servers and browsers. Physics doesn't care who wrote it.
- Security vulnerabilities are still exploitable regardless of authorship.
- Users still experience broken UX regardless of how fast it was generated.
- Technical debt compounds identically whether a human or agent introduced it.

### The thesis (upgraded)

> **AI shifts the developer's role from writer to architect and auditor.**

You are no longer evaluated on how fast you write code. You are evaluated on how well you **define constraints**, **detect errors**, and **shape systems**.

---

## 2 — The tool landscape

### Claude Code (Anthropic)

The most capable autonomous coding agent as of early 2026. Operates in your terminal, reads your entire codebase, edits files across modules, runs tests, and iterates until tasks are complete.

Key capabilities relevant to this course:

| Feature | What it means for you |
|---|---|
| **Multi-file editing** | Claude Code can refactor across 20 files in one pass |
| **Subagents** | Spawns parallel workers (Explore, Bash, Plan, custom) with isolated context |
| **`/batch`** | Sends multiple tasks to agents in parallel git worktrees |
| **Agent teams** | A lead agent coordinates work across multiple sub-agents |
| **Auto mode** | Hands-off operation with guardrails — approves safe actions, asks for risky ones |
| **CLAUDE.md** | Project memory file at repo root — architecture, conventions, commands |
| **Agent SDK** | `@anthropic-ai/claude-code` — run agents programmatically in CI/CD |
| **Context compaction** | Summarizes earlier context for effectively infinite conversations |
| **1M token context** | Can hold entire codebases in a single pass |

### Cursor / Windsurf (IDE agents)

Cursor and Windsurf embed agents inside the editor. They read your project, apply rules (`.cursor/rules/`), and use MCP servers for external tool access.

Key difference from Claude Code: they operate **inside the IDE** (visual diff, inline suggestions) vs. Claude Code in the **terminal** (autonomous, scriptable).

Both support:
- Project-level rules (`.cursor/rules/*.mdc`, `.windsurfrules`)
- Skills (`.cursor/skills/*/SKILL.md`) — guided workflows
- MCP servers for external tool integration

### Model Context Protocol (MCP)

MCP is the open standard (Anthropic, 2024; Linux Foundation-hosted) that standardizes how AI agents connect to external tools and data. Think of it as **USB for AI tools**: one protocol, any server, any client.

```text
AI Agent (Claude Code, Cursor, etc.)
    │
    ├── MCP Server: filesystem (read/write files)
    ├── MCP Server: github (PRs, issues, commits)
    ├── MCP Server: postgres (query database)
    ├── MCP Server: sqlite (local DB access)
    ├── MCP Server: fetch (HTTP requests)
    └── MCP Server: your-custom-server
```

As of early 2026: 50+ official servers, 500+ community servers, supported by Claude Desktop, Claude Code, Cursor, Zed, VS Code, Replit.

**Why it matters for this course:** MCP servers let your AI agent interact with your database, your deployment platform, and your APIs — without giving it raw credentials. The protocol enforces boundaries.

### shadcn/ui ecosystem

| Tool | What it does |
|---|---|
| **shadcn CLI v4** (`npx shadcn@latest init`) | Scaffolds project with components copied into your repo |
| **shadcn/skills** (`npx skills add shadcn/ui`) | Adds agent context (for Cursor/Claude) about available components |
| **shadcn MCP** (`npx shadcn@latest mcp init`) | MCP server for live component registry lookups |
| **v0 (Vercel)** | Generates React layouts from natural language prompts |

---

## 3 — Architecture mapping: from classical patterns to React

The classical patterns that make code verifiable are the same patterns that make AI output auditable:

| Classical idea | React translation | Why it matters with AI |
|---|---|---|
| **Contracts** | Prop shapes, API schemas, JSDoc annotations | AI is "creative"; contracts limit ambiguity |
| **Decomposition** | Components + hooks + modules | Smaller units are easier to verify |
| **Invariants** | "Always true" rules (auth in loader, data before render) | Prevents silent regressions |
| **Observability** | Error boundaries, structured logging, DevTools | AI code fails in surprising ways — you need to see it |

### Minimal "Contract Stack" for student projects

- **Shape contracts**: clear prop shapes and API response shapes (JSDoc, or type checkers if using TS)
- **Runtime contracts**: defensive checks at boundaries (validate inputs, handle API errors, check params)
- **Behavior contracts**: tests for reducers/hooks + a few critical user flows

---

## 4 — The verification loop (the non-negotiable habit)

This is the core procedure. Every interaction with an AI agent follows this loop:

```text
1. DEFINE   → Write the contract (what you need, constraints, auth level)
2. PROMPT   → Generate with architectural constraints (see section 5)
3. INSPECT  → Compare output against contracts and invariants
4. TEST     → Run it: lint, tests, manual edge cases (refresh, deep link, auth)
5. DOCUMENT → Record what AI suggested vs. what you changed and why
6. LOCK     → Commit + reinforce rules (CLAUDE.md, .cursor/rules)
```

### Why "DOCUMENT" matters

AI agents have no memory across sessions (unless you give them one via CLAUDE.md or project rules). If you don't document why you rejected an AI suggestion, the next session will suggest the same thing.

The `LOCK` step is where you teach the agent: update CLAUDE.md, add a rule, or add a comment that explains the invariant. The agent learns from the codebase, not from your memory.

---

## 5 — Practical prompts (copy-paste ready)

### Architecture prompt (ask for a plan, not code)

```text
ARCHITECTURE PROMPT

Given this feature: [describe the feature],
and these constraints: [React Router v7 Framework Mode, explicit routes.js, better-sqlite3, no ORM, JavaScript only],

Propose:
1) Component decomposition (list components and their responsibilities)
2) State model (which state is server, URL, local, shared)
3) Data flow (loader → component → action, text diagram)
4) Failure modes and mitigations (what can go wrong)

Return only the plan, no code yet.
```

### Contract prompt (define shapes before generating code)

```text
CONTRACT PROMPT

Write clear contracts for:
- API response shape for [endpoint] (include error variants)
- UI state discriminated union (loading / success / error / empty)
- 5 invariants that must remain true for this feature

Use JSDoc annotations. No TypeScript.
```

### Generation prompt (constrained code generation)

```text
GENERATION PROMPT

Generate a React Router v7 route module:
- Framework: React Router v7 Framework Mode, explicit routes.js config
- Path: /:locale/[section] (nested inside :locale parent)
- Data: loader reads from SQLite via better-sqlite3 (raw SQL, no ORM)
- Auth: [public | protected — requireUser(request) first in loader]
- Mutations: action() + <Form method="post"> + redirect on success
- Conventions: HELIOS DECK project (see CLAUDE.md for full context)

Include: loader, default component, ErrorBoundary.
Do NOT use useEffect for data fetching.
```

### Verification prompt (review AI output)

```text
VERIFICATION PROMPT

Review this diff for:
- Security issues (XSS, unvalidated params, missing auth, token exposure)
- Accessibility regressions (focus management, ARIA, keyboard navigation)
- Error handling gaps (loading/error/empty states missing)
- Framework violations (useEffect for data, client fetch bypassing loader)
- Stale closures or effect dependency issues

Return a checklist with the exact lines to inspect.
```

---

## 6 — What AI gets wrong (failure awareness)

Students trust AI too early. This section trains skepticism.

| Failure pattern | What the AI does | Why it's wrong | How to catch it |
|---|---|---|---|
| **Hallucinated API** | Calls `fetch('/api/data')` that doesn't exist | No such endpoint in your routes.js | Check routes.js for resource routes |
| **useEffect for data** | Loads data client-side | Breaks SSR, causes waterfalls | Search for `useEffect` + `fetch` in generated code |
| **Missing auth** | Returns data without checking session | Data leak | First line of loader must be `requireUser` if protected |
| **Stale params** | Uses `params.id` without validation | Injection risk, crash on malformed input | Validate before use |
| **Wrong nesting** | Places layout as sibling instead of parent | Outlet renders nothing, UI breaks | Check routes.js tree structure |
| **Invented dependencies** | `npm install` packages that don't exist or are wrong version | Build failure | Verify every `import` against `package.json` |
| **Over-abstraction** | Creates 5 files for a 20-line feature | Maintenance burden, harder to verify | Count files vs. feature complexity |

### Teaching sentence

> "AI optimizes for working code, not correct architecture. Working and correct are not the same thing."

---

## 7 — Project configuration for AI agents

### CLAUDE.md (Claude Code)

A `CLAUDE.md` file at the repo root gives Claude Code persistent context about your project. It is read at the start of every session.

**Excerpt** — minimal CLAUDE.md for HELIOS DECK:

```markdown
# HELIOS DECK

Space weather dashboard. React Router v7 Framework Mode (SSR).

## Stack
- React Router v7 (explicit routes.js, no file-based routing)
- better-sqlite3 (raw SQL, no ORM)
- Tailwind v4 + Shadcn
- JavaScript only (no TypeScript)
- Vite

## Architecture
- Monolith: the router IS the server (loaders, actions, SSR)
- SQLite: file DB, .db in .gitignore, schema in app/db/
- All data fetching in loader(), never useEffect
- Protected routes: requireUser(request) first in loader
- i18n: :locale dynamic parent for all content routes

## Commands
- npm run dev — start dev server
- npm run build — production build
- npm start — run production server
```

### .cursor/rules/ (Cursor)

Rules files (`.mdc`) constrain Cursor's agent to your project conventions:

```markdown
---
description: Data fetching conventions for HELIOS DECK
globs: ['app/routes/**/*.jsx']
---

- Data fetching ALWAYS in loader(), never useEffect
- requireUser(request) is the FIRST call in protected loaders
- Read from SQLite via db.prepare().all() / .get() / .run()
- No ORM, no query builder — raw SQL only
- Return plain objects from loader
```

### .cursor/skills/ (Cursor)

Skills are guided workflows for recurring tasks:

```markdown
# Create a new fetcher

1. Create app/services/fetchers/{name}.js
2. Implement fetch() method that calls the external API
3. Implement normalize() that transforms to the signals schema
4. Add healthCheck() that returns boolean
5. Register in app/services/fetcher-registry.js
6. Add SQL INSERT in app/db/queries/{name}.js
7. Test: run fetcher → check SQLite → verify data shape
```

---

## 8 — The cost of not knowing (why this lesson exists)

AI makes the cost of architectural ignorance **higher, not lower**.

Without AI, a developer who doesn't understand routing writes bad routes slowly. With AI, the same developer generates bad routes at scale — more code, more files, more surface area for bugs, all produced in minutes instead of hours.

| Scenario | Without AI | With AI (no architecture knowledge) |
|---|---|---|
| Wrong data loading pattern | 1 component with useEffect | 20 components with useEffect (generated in 5 minutes) |
| Missing auth check | 1 unprotected route | 15 unprotected routes (batch generated) |
| Wrong nesting | 1 broken layout | Entire section with broken outlets |
| Stale dependency | Noticed during manual coding | Buried in 200 lines of generated code |

The agent amplifies whatever you give it — including your mistakes.

### Teaching sentence

> "AI tools do not remove the need for architecture knowledge — they increase the cost of not having it."

---

## 9 — Hands-on: apply the method to one feature

Pick one feature from HELIOS DECK (or your own project) and produce:

### Decomposition (5–10 components/hooks/modules, named)

Example for "Solar Flare Event Feed":
- `app/routes/$locale/signals/solar-activity.jsx` — route module (loader + component)
- `app/services/fetchers/nasa-donki.js` — data fetcher
- `app/db/queries/signals.js` — SQL read/write functions
- `app/components/EventFeed.jsx` — presentation component
- `app/components/SignalCard.jsx` — card wrapper

### Contracts (shapes + invariants)

```js
/**
 * @typedef {Object} Signal
 * @property {number} id
 * @property {string} signal - e.g. 'solar_flare_events'
 * @property {string} value - JSON string of the normalized data
 * @property {string} timestamp - ISO 8601
 * @property {string} source - e.g. 'nasa_donki'
 */

// Invariants:
// 1. Every signal has a non-empty timestamp in ISO 8601 format
// 2. signal field matches one of the 8 registered signal types
// 3. source field matches one of the registered API sources
// 4. Data is inserted with UNIQUE constraint on (signal, timestamp, source)
// 5. Loader reads from SQLite, never from the external API directly
```

### Verification evidence

- At least 2 tests (fetcher returns normalized shape, SQL query returns expected rows)
- Screenshot or log of the verification loop: what AI suggested, what you changed, why

---

## 10 — Exercise: debug an AI-generated component

The following component was generated by an AI agent. Find the architectural errors.

**Excerpt** — intentionally broken code.

```jsx
// app/routes/signals.jsx — generated by AI
import { useState, useEffect } from 'react';

export default function Signals() {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/signals')
      .then(r => r.json())
      .then(data => {
        setSignals(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {signals.map(s => (
        <li key={s.id}>{s.signal}: {s.value}</li>
      ))}
    </ul>
  );
}
```

**Expected findings:**

| Error | Rule violated | Fix |
|---|---|---|
| `useEffect` + `fetch` for data | Data must be in `loader()` | Move to `export async function loader()` |
| No `loader` export | Framework Mode requires loader for data | Add loader that reads from SQLite |
| Client `fetch('/api/signals')` | Bypasses Framework Mode — no parallel loading | Read directly from DB in loader |
| No error handling | Component will break silently on API failure | Add `ErrorBoundary` export |
| No empty state | What if `signals` is `[]`? | Handle empty state in the component |
| File location | Should be inside `$locale/` for i18n | Move to `routes/$locale/signals/` |
| Not in `routes.js` | Explicit config requires registration | Add to `routes.js` |

---

## 11 — Reflection questions (Atelier)

> _Which part of your system is "most fragile" when AI generates code? Why?_

> _What did you verify manually that AI claimed was correct?_

> _What contract would have prevented your last bug?_

> _You asked Claude Code to add a new feature. It produced 8 files. How do you decide which to keep, which to modify, and which to discard?_

> _An AI agent generates code faster than you can review it. What process ensures you don't merge unreviewed code?_

---

## Further reading

- **Claude Code docs**: [docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview)
- **MCP specification**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **Cursor rules docs**: [docs.cursor.com/context/rules](https://docs.cursor.com/context/rules)
- **shadcn/ui CLI v4**: [ui.shadcn.com/docs](https://ui.shadcn.com/docs)

---

## Lesson navigation

| Previous | Current | Next |
|---|---|---|
| [State & UI](../state-and-ui/) | **AI Theory & Architecture** | [React Fundamentals](../react-fundamentals/) |

---

> _"The prompt is not the program. The program is what survives contact with reality."_
