---
layout: lesson
title: 'Unit 2: Astro Meta-Framework — Islands Architecture & SSR'
title_alt: 'Unidad 2: Astro Meta-Framework — Arquitectura de Islas y SSR'
slug: feii-unit-2-astro-fundamentals
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-2-astro-fundamentals/
description: 'Astro meta-framework fundamentals: islands architecture, server-side rendering, static generation, and multi-framework integration.'
tags:
  [
    feii,
    astro,
    meta-framework,
    ssr,
    islands-architecture,
    multi-framework,
  ]
status: complete
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Astro is not just another framework. It's a different paradigm for composing interfaces."_

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Understand Astro's core philosophy** — content-first, zero-JS by default, and the islands architecture pattern
- **Set up an Astro project** — CLI scaffolding, project structure, and configuration
- **Implement islands architecture** — hydrate specific components with React/Vue/Svelte while keeping the rest static
- **Choose rendering strategies** — static generation (SSG) vs. server-side rendering (SSR) vs. hybrid
- **Integrate multiple frameworks** — Use React components within Astro, understanding the boundary between server and client

---

## 📖 Why Astro? The Second Paradigm

In FE I, you learned React as a single paradigm for building interfaces. Astro gives you a **second paradigm** — one that's particularly powerful for content-heavy sites and micro-frontends.

### The Content-First Philosophy

Astro starts from a different premise than most SPA frameworks:

- **Most frameworks:** Everything is a component, everything is client-side JavaScript
- **Astro:** Everything is HTML/CSS by default, JavaScript only where needed

This matters because:

- **Performance:** Zero-JS pages load instantly, no hydration penalty
- **SEO:** Perfect HTML for search engines, no client-side rendering needed
- **Progressive enhancement:** Content works without JS, interaction enhances with JS

### Islands Architecture

The key innovation is the **islands architecture**:

```
┌─────────────────────────────────────────────────────────┐
│                   ISLANDS ARCHITECTURE                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Static Ocean (Server-Rendered HTML)                   │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│   │ Island 1     │  │ Island 2     │  │ Island 3     │  │
│   │ (React)      │  │ (Vue)        │  │ (Svelte)     │  │
│   │ Interactive  │  │ Interactive  │  │ Interactive  │  │
│   └─────────────┘  └─────────────┘  └─────────────┘  │
│                                                          │
│   Islands hydrate independently → no monolithic bundle     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

You get the best of both worlds:
- **Static ocean** — fast, SEO-friendly, zero-JS for most of the page
- **Interactive islands** — React/Vue/Svelte components where you need interactivity

This is fundamentally different from React SPA architecture, where the entire app hydrates at once.

---

## 🏗️ Astro Project Setup

### CLI Scaffolding

```bash
npm create astro@latest feii-astro-demo
cd feii-astro-demo
npm run dev
```

Astro projects have a clean structure:

```
src/
  pages/           # File-based routing (SSG by default)
  components/      # Astro components (.astro files)
  layouts/         # Page layouts
  content/         # Markdown/content collections (optional)
public/           # Static assets
astro.config.mjs   # Configuration
```

### Astro Components (.astro)

Astro components are HTML-first with optional JavaScript:

```astro
---
// Component logic (server-side only)
const { title } = Astro.props;
---

<!-- Template (HTML + CSS) -->
<h1>{title}</h1>
<p>This is static HTML by default.</p>

<script>
  // Islands: <script> tags only hydrate if you use a framework
  // Leave empty for static components
</script>
```

The separation is explicit:
- **Frontmatter (---)** — Server-side logic, never runs in the browser
- **Template** — HTML/CSS, always rendered
- **Script** — Islands that hydrate with React/Vue/Svelte

---

## 🚀 Integrating React Islands

Astro makes it easy to use React components within an Astro project:

### Installation

```bash
npx astro add react
```

This installs:
- `@astrojs/react` renderer
- React and ReactDOM
- Vite React plugin

### Using React Components

```astro
---
import InteractiveCounter from '../components/InteractiveCounter.jsx';
---

<h1>Astro + React Integration</h1>

<!-- This React component hydrates as an island -->
<InteractiveCounter client:load />

<p>The rest of this page is static HTML.</p>
```

The `client:*` directive controls when islands hydrate:
- `client:load` — Hydrate immediately on page load
- `client:idle` — Hydrate when browser is idle
- `client:visible` — Hydrate when element enters viewport
- `client:media` — Hydrate when media query matches

This granular control is impossible in a pure React SPA.

---

## 🔄 Rendering Strategies

Astro supports multiple rendering modes:

### Static Generation (SSG)

Default for most pages. Build-time HTML, no server needed.

```js
// astro.config.mjs
export default defineConfig({
  output: 'static', // Default
});
```

**Best for:** Marketing sites, blogs, documentation, landing pages

### Server-Side Rendering (SSR)

Server renders on each request. Requires an adapter.

```js
export default defineConfig({
  output: 'server',
  adapter: node({
    // Node.js server (or Vercel, Netlify, Cloudflare, etc.)
  }),
});
```

**Best for:** Dynamic content, user-specific pages, e-commerce

### Hybrid

Static for most pages, SSR for specific routes.

```js
export default defineConfig({
  output: 'hybrid',
});
```

**Best for:** Mostly static sites with a few dynamic sections

---

## 🎯 Practice Exercise

**Time:** 2 hours

1. **Create an Astro project** using the CLI scaffolding
2. **Build a static landing page** with:
   - Hero section with title and CTA
   - Features grid (3 items)
   - Footer with links
3. **Add a React island**:
   - Create a simple React counter component
   - Integrate it using `client:load`
   - Verify it hydrates independently
4. **Compare SPA vs Astro**:
   - Measure initial load time (Astro should be faster)
   - Check that static content works without JS
   - Inspect the network tab to see separate island bundles

**Deliverable:** Astro project URL + screenshot showing island hydration in DevTools

---

## 📚 Recommended Reading

- **Astro Documentation** — https://docs.astro.build/en/core-concepts/
- **Islands Architecture** — https://docs.astro.build/en/core-concepts/islands/
- **React Integration** — https://docs.astro.build/en/guides/integrations/react/
- **Rendering Modes** — https://docs.astro.build/en/guides/server-side-rendering/

---

## ✅ Session Outcome

By the end of this unit, you should:

- Understand Astro's content-first philosophy and how it differs from SPA frameworks
- Be able to scaffold and configure an Astro project
- Implement islands architecture with React components
- Choose appropriate rendering strategies (SSG vs. SSR vs. hybrid)
- See the performance benefits of zero-JS-by-default pages

This unit prepares you for unit 3, where we'll dive deeper into Astro architecture patterns and multi-framework integration.

---

> _"The best interface is the one you don't notice because it just works. Astro gets you closer to that ideal."_
