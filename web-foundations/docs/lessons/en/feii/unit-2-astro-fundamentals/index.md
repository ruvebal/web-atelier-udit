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

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> Hydration is a cost model; islands are selective interactivity.</p>
<p><strong>Field lens:</strong> **Practice anchor:** SSR/SSG and selective client work make delivery choices explicit. **Frontier signal:** resumability and server/edge islands challenge mainstream defaults. **Pedagogy status:** direct HE comparison of Astro/islands teaching sequences is absent; this lesson is a transfer-informed pilot.</p>
</aside>

> **Studio test:** Compare a static region, an island, and their transferred cost.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Before you start

| Requirement | Required? |
| --- | --- |
| Unit 1 exercises submitted | Yes |
| Node.js LTS + npm | Yes |
| Astro Docs MCP configured (see § AI & MCP) | Strongly recommended |
| Team repo / Entrega 1 backlog issue | For B2 lab |

**Official time:** 3 h magistral + 2 h lab (team) + 2 h exercise resolution (individual, see B3).

---

## Follow this path

| Phase | Who | Action | Section |
| --- | --- | --- | --- |
| 1 | Individual | Wire Astro Docs MCP; ask one version-specific API question | AI & MCP |
| 2 | Individual | Scaffold `feii-astro-demo`; static landing page | Astro Project Setup |
| 3 | Individual | Add React island + choose `client:*` with one-line justification | Integrating React Islands |
| 4 | Team | Pick real Entrega 1 issue; PR with island + CI green | B2 · Lab |
| 5 | Individual | Complete B3 exercises without AI on item 3 | B3 · Exercises |

---

## Verify before you leave

- [ ] Static HTML renders with JS disabled (most of page)
- [ ] Island hydrates; DevTools shows separate bundle
- [ ] MCP answer verified against https://docs.astro.build
- [ ] PR documents `client:*` choice and before/after metric (Lighthouse or bundle size)
- [ ] AI accept/reject log row if AI assisted (prospective Unit 6 discipline)

---

## Common failures

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Entire page hydrates like SPA | Missing island boundary / wrong integration | Follow `.astro` + `client:load` pattern |
| `client:load` everywhere | Default without cost analysis | Use B3 exercise 2 decision table |
| MCP returns stale API | Wrong server or no verification | Cross-check running project |
| Team lab blocked | No backlog issue | Use professor-provided seed issue |

---

## Submit (Unit 2 evidence)

- **Individual:** exercise answers + Astro demo URL or repo path
- **Team:** issue link, PR link, release note with measured effect (B2 definition of done)

---

> _"Astro is not just another framework. It's a different paradigm for composing interfaces."_

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

---

## Code conventions in this unit

Same vocabulary as the Front-End I React lessons and FE II Unit 5 — check the label before you paste:

- **CodeSandbox-ready** — complete file, copy-paste, runs once the sandbox scaffold is in place.
- **Excerpt** — partial pattern, illustrative. Does **not** run as-is.
- **Template** — copy and replace placeholder values before use.

Most blocks below are **Excerpt**: they assume a scaffolded Astro project and are not complete pasteable files. The CLI scaffolding block is a runnable shell command, not app code.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Understand Astro's core philosophy** — content-first, zero-JS by default, and the islands architecture pattern
- **Set up an Astro project** — CLI scaffolding, project structure, and configuration
- **Implement islands architecture** — hydrate specific components with React/Vue/Svelte while keeping the rest static
- **Choose rendering strategies** — static generation (SSG) vs. server-side rendering (SSR) vs. mixed static/dynamic (per-route `prerender`)
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
  content/         # Markdown files for collections (optional until Unit 3)
  content.config.ts  # Content collections schema (Unit 3 — `astro:content` + `astro/zod`)
public/            # Static assets
astro.config.mjs   # Site config (not collection schemas)
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

**Excerpt** — site config only; collection schemas belong in `src/content.config.ts` (Unit 3):

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static', // Default
});
```

**Best for:** Marketing sites, blogs, documentation, landing pages

### Server-Side Rendering (SSR)

Server renders on each request. Requires an adapter.

**Excerpt** — install `@astrojs/node` (or Vercel/Netlify/Cloudflare adapter) first:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
```

**Best for:** Dynamic content, user-specific pages, e-commerce

### Mixed static + dynamic (formerly `output: 'hybrid'`)

Astro 5+ uses `output: 'server'` with per-route prerender flags instead of a separate `hybrid` mode:

```js
// astro.config.mjs — server adapter required (see SSR excerpt above)
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
```

```astro
---
// src/pages/mostly-static.astro — prerender at build (default when using static output)
export const prerender = true;
---
```

```astro
---
// src/pages/dynamic.astro — render on each request
export const prerender = false;
---
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

## 🤖 AI & MCP — Astro Docs in your agent

Before you scaffold, wire **Astro Docs MCP** so Cursor, Windsurf, or Claude Desktop reads live API docs — the same boundary pattern you met in FE I ([MCP overview]({{ '/lessons/en/react/ai-assisted-development-foundations/' | relative_url }}#model-context-protocol-mcp)).

| Resource | URL |
| --- | --- |
| Remote MCP endpoint | [https://mcp.docs.astro.build/mcp](https://mcp.docs.astro.build/mcp) |
| Building with AI tools | [docs.astro.build — AI guide](https://docs.astro.build/en/guides/build-with-ai/) |
| Full sequence index | [Astro teaching sequence]({{ '/lessons/en/astro/' | relative_url }}) |

{% raw %}

```json
{
  "mcpServers": {
    "Astro Docs": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.docs.astro.build/mcp"]
    }
  }
}
```

{% endraw %}

**Lab check:** ask your agent a version-specific question (e.g. content collections API) and confirm the answer cites current Astro docs — then verify in the running project.

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
- Choose appropriate rendering strategies (SSG vs. SSR vs. mixed per-route prerender)
- See the performance benefits of zero-JS-by-default pages

This unit prepares you for unit 3, where we'll dive deeper into Astro architecture patterns and multi-framework integration.

---

> _"The best interface is the one you don't notice because it just works. Astro gets you closer to that ideal."_

> _"Dependencies flow inward like water seeking the center. Let nothing in the center know the shape of the shore."_
> — Tao of Development, `arch-004`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Session Outcome"
  visual-grammar: "selective-hydration-islands — interactive islands activated selectively inside a mostly static content surface"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

## B1 · Lección magistral — 1 h

**Claim:** the islands boundary — not the framework choice — is what changes a page's performance and SEO characteristics.

FE I shipped one SPA paradigm: React, hydrate everything. This unit adds a second: static-by-default, hydrate only the islands that need interactivity. Unit 3 goes deeper into composing multiple frameworks on that boundary; Unit 4 pushes the same static-first instinct into offline resilience.

Islands architecture is defined, independent of any one framework's marketing, as a way for developers to "defer and potentially even avoid the cost of loading content" by wrapping dynamic portions of a page while leaving the rest static (Vepsäläinen 2025, 3).
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
Islands architecture is defined, independent of any one framework's marketing, as a way for developers to "defer and potentially even avoid the cost of loading content" by wrapping dynamic portions of a page while leaving the rest static (Vepsäläinen 2025, 3 — Ahmes coat `68c7da35`, node `797a702c-0538-5577-adc4-c3450c511608`).
-->
{% endif %}

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
**Evidence update (2026-08-23):** the Ahmes sources establish what the islands primitive *is* and what problem it solves technically. Transfer-informed teaching is now explicit: map React/SPA assumptions to static HTML, selective hydration, and server/client boundaries, then defend the cost of the boundary. **No Ahmes source establishes that teaching Astro islands produces better learning outcomes for this cohort.** Astro documentation remains a dated platform note, not a pedagogy citation. See the dated FE II gap-pass record in the research repository copy.
-->
{% endif %}

**Speaker outline:** see `deck-outline.md`.

## B2 · Prácticas de laboratorio — 2 h · team

Pick a real issue from the team's Entrega 1 backlog that needs one interactive element — a filter, a counter, a form — added to an otherwise static page. Do not invent a greenfield exercise.

Definition of done: the PR adds the island using an explicit `client:*` directive with a one-line justification for that directive (not just `client:load` by default); CI is green; a human reviews any AI-generated suggestion (Unit 6 workflow, taught prospectively here); a release note names the change and its measured effect.

Roles rotate: facilitator, implementer, verifier, narrator — nobody owns the same layer twice across units.

Evidence to submit: issue link, branch, PR, a before/after bundle-size or Lighthouse delta, and an AI accept/reject log row if AI assistance was used.

## B3 · Resolución de ejercicios — 2 h · individual

1. A component is mounted with `client:load` but its interactive handler never fires until the user scrolls it into view three screens down. Name the wasted cost and the correct directive.
2. Given five one-paragraph component descriptions (a footer, a live search box, a hero image, a checkout form, a cookie banner), assign each the correct `client:*` directive or "no hydration" and justify in one sentence.
3. **No-AI diagnostic (declared):** without AI assistance, explain in your own words why an island's JavaScript bundle is isolated from the rest of the page's bundle, and what would break that isolation.

Professor answer sketches belong in the instructor copy, not the public handout. These exercises are intentionally decontextualised from the team's product.

## References

- Vepsäläinen, Juho. 2025. “The Potential of Serverless Edge-Powered Islands for Web Development.” *Journal of Web Engineering*. https://doi.org/10.13052/jwe1540-9589.2411.
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- Vepsäläinen, J. (2025). *The Potential of Serverless Edge-powered Islands for Web Development.* `10.13052/jwe1540-9589.2411`. Ahmes coat `68c7da35`, node `797a702c-0538-5577-adc4-c3450c511608`, p.3. Resolved via `ahmes query &#45;&#45;cite`, `evaluator_safe=yes`.
-->
{% endif %}
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
located by grep over extract/index.md for "Islands architecture is a recent" inside coat 68c7da35 (matrix-named), node/page resolved via sqlite3 join fission_node × anchor_spatial, cite confirmed via `ahmes query &#45;&#45;cite <db>:<node_id> &#45;&#45;require-evaluator-safe`
-->
{% endif %}
- **Remaining evidence boundary:** this unit does not establish that teaching islands architecture as a first meta-framework primitive produces measurably better learning outcomes than an alternative sequence. The lab is a transfer-informed pilot, not a causal finding.
