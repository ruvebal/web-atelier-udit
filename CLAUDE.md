# Lesson Authoring Guidance

This project contains teaching material under `web-foundations/docs/**/*.md`.

When creating or editing lessons:

## Code block policy

- Every code block must be clearly treated as one of:
  - `CodeSandbox-ready`
  - `Excerpt`
  - `Template`
- Add a short note near the first code section explaining the convention used in the lesson.

## What counts as CodeSandbox-ready

A block is `CodeSandbox-ready` only if a learner can reasonably paste it into CodeSandbox and run it with minimal friction.

That means:

- include imports
- include a root component or complete file structure when needed
- avoid hidden variables or omitted setup
- avoid placeholders unless they are explicitly explained
- keep examples in plain JavaScript / JSX unless the lesson explicitly targets another stack

## When to use Excerpt

Use `Excerpt` for:

- partial patterns
- shader fragments
- pseudocode
- utility snippets that rely on surrounding app state
- CLI fragments that are illustrative rather than complete

Do not present excerpts as if they are runnable.

## When to use Template

Use `Template` for:

- config files that need project-specific values
- prompt skeletons
- starter docs
- examples with clear placeholders to replace

Always state what must be customized.

## Sandbox architecture: multi-file with routes

Lessons with more than one runnable example MUST use a **routed multi-file sandbox** instead of replacing `App.jsx` for each example.

### Structure

```
src/
  main.jsx                  ← providers (QueryClient, BrowserRouter, etc.) + CSS import
  App.jsx                   ← NavBar + <Routes> with all example pages pre-wired
  services/                 ← API functions shared across all examples
  components/               ← reusable UI (cards, status messages, forms)
  pages/
    Home.jsx                ← lesson index with links to each example
    Ex1Topic.jsx            ← example 1 — imports from services/ and components/
    Ex2Topic.jsx            ← example 2
    ...
```

### Rules

- The lesson starts with a **Sandbox setup** section: template choice, dependencies, config changes, scaffold files.
- `App.jsx` pre-wires ALL routes at the start — pages that don't exist yet will error until added (state this).
- Each page is self-contained: imports from `services/` and `components/`, never redefines API logic inline.
- Label page files: `**CodeSandbox-ready** — Create src/pages/ExNName.jsx.`
- Students never delete previous examples; they only add files.
- Separation of concerns (services, components, pages) is demonstrated structurally, not described.

### Scaffold files are CodeSandbox-ready

`main.jsx`, `App.jsx`, every service, every shared component, and `Home.jsx` are each provided as complete, labeled `CodeSandbox-ready` code blocks with their target file path.

## Editorial preference

- Prefer a few strong complete runnable examples over many incomplete ones.
- Preserve teaching value, but be honest about execution status.
- If a snippet looks runnable but is not, either complete it or relabel it.
- For multi-example lessons, never overwrite `App.jsx` per example — use routed pages.
