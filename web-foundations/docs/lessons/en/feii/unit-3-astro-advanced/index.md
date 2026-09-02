---
layout: lesson
title: 'Unit 3: Advanced Astro Architecture & Multi-Framework Integration'
title_alt: 'Unidad 3: Arquitectura Avanzada de Astro e Integración Multi-Framework'
slug: feii-unit-3-astro-advanced
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-3-astro-advanced/
description: 'Advanced Astro patterns: content collections, data fetching, multi-framework islands, and micro-frontend architecture.'
tags:
  [
    feii,
    astro,
    advanced-architecture,
    content-collections,
    multi-framework,
    micro-frontends,
    data-fetching,
  ]
status: complete
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> Architecture coordinates content, data, framework islands, and deployment boundaries.</p>
<p><strong>Field lens:</strong> **Practice anchor:** content schemas, data fetching, and explicit integration boundaries. **Frontier signal:** server/edge islands and multi-framework composition remain active engineering practice. **Pedagogy status:** direct HE comparison of multi-framework teaching sequences is absent; this lesson is a transfer-informed pilot.</p>
</aside>

> **Studio test:** Produce a boundary map and name one integration cost.

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
| Unit 2 Astro demo or team repo running | Yes |
| At least one React island from Unit 2 | Yes |
| Astro Docs MCP (from Unit 2) | Strongly recommended |
| Team backlog issue for Entrega 1 | For B2 lab |

**Official time:** 1 h magistral (B1) + 2 h lab (team, B2) + 2 h exercise resolution (individual, B3).

---

## Follow this path

| Phase | Who | Action | Section |
| --- | --- | --- | --- |
| 1 | Individual | Sketch a boundary map: content schema, data source, islands, deploy target | Master idea + Content Collections |
| 2 | Individual | Define one collection schema; validate at build time | Content Collections |
| 3 | Individual | Configure Astro i18n routing (`es` + `en`); verify both locale URLs in build output | Internationalization routing |
| 4 | Individual | Pick SSR, client island, or edge route for one API scenario — justify in one line | Data Fetching Patterns |
| 5 | Individual | Add a second framework island **or** document why one framework is enough | Multi-Framework Integration |
| 6 | Team | Ship one real backlog item: collection, locale route, island, or edge/API route (B2) | B2 · Lab |
| 7 | Individual | Complete B3 exercises; item 2 declared no-AI | B3 · Exercises |

---

## Verify before you leave

- [ ] `npm run build` passes with no silent Zod/schema warnings
- [ ] Astro [i18n routing](https://docs.astro.build/en/guides/internationalization/) enabled with at least `es` and `en`; both locale home routes resolve (mandatory for Entrega 1)
- [ ] Boundary map names content, data, framework island(s), and deployment target
- [ ] Release note states SSG / SSR / mixed (per-route prerender) choice and why (narrate-axis language)
- [ ] CI green on team PR; human reviewed any AI-generated schema or route
- [ ] B3 item 2 completed without AI assistance (declared)

---

## Common failures

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Build fails on frontmatter | Zod type mismatch (date vs string, missing field) | Match schema in `src/content.config.ts`; read the Zod error line |
| Importing `z` from `"zod"` | Standalone package version may not match Astro's validator | Use `import { z } from 'astro/zod'`, not `import * as z from "zod"` |
| “Works in dev, fails in build” | SSR/data fetch only in dev server | Run `npm run build` before opening PR |
| Page fetches like a SPA | Client island used where build-time data suffices | Prefer frontmatter `fetch` in `.astro` for public SEO content |
| Next.js patterns in `.astro` | Copied `getServerSideProps` from React docs | Use Astro frontmatter fetch (see Data Fetching excerpt) |
| Multi-framework bundle bloat | Every island uses `client:load` | Stagger with `client:visible` / `client:idle`; justify each island |
| Team lab blocked | No backlog issue | Use professor seed issue; do not invent fake features |
| `/en/…` or `/es/…` 404 after build | `i18n` missing or pages not under locale folders | Configure `i18n` in `astro.config.mjs`; mirror routes per [Astro i18n routing](https://docs.astro.build/en/guides/internationalization/) |
| Language switcher jumps to wrong path | Hard-coded URLs without locale prefix | Use `getRelativeLocaleUrl()` / `getAbsoluteLocaleUrl()` from `astro:i18n` |

---

## Submit (Unit 3 evidence)

- **Individual:** B3 answers (separate from team repo) + boundary map screenshot or markdown
- **Team:** issue link, PR link, schema-validation or build log, release note with rendering strategy

---

> _"Architecture is the art of arranging code so that changing one part doesn't break everything else."_

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

---

## Code conventions in this unit

Same vocabulary as Unit 2 and FE II Unit 5 — check the label before you paste:

- **CodeSandbox-ready** — complete file, copy-paste, runs once the sandbox scaffold is in place.
- **Excerpt** — partial pattern, illustrative. Does **not** run as-is.
- **Template** — copy and replace placeholder values before use, most visibly the Zod schema and content-collection blocks below, which encode this lesson's example fields, not yours.
- **Zod in collections** — always `import { z } from 'astro/zod'`; never `import * as z from "zod"` for content-collection schemas.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Design content collections** — Structured data for blogs, docs, or product catalogs
- **Configure Astro i18n routing** — Built-in locale prefixes (`/es/`, `/en/`) aligned with FE I bilingual patterns (mandatory for Entrega 1)
- **Implement data fetching patterns** — Server-side data loading, client-side hydration, and edge caching
- **Mix multiple frameworks** — React, Vue, and Svelte islands in the same Astro project
- **Plan micro-frontend architectures** — When to use Astro for composition vs. framework-specific apps
- **Optimize for production** — Build targets, asset optimization, and deployment strategies

---

## 📖 Content Collections

Astro's content collections provide a structured way to manage Markdown and [MDX](https://mdxjs.com/) content:

### Defining a Collection

**Template** — collections config lives in `src/content.config.ts` (Astro 5+; legacy Astro 4 projects may use `src/content/config.ts`). Replace field names and paths with your project's needs.

> **Zod import rule:** use `import { z } from 'astro/zod'`. Do **not** use `import * as z from "zod"` — Astro pins the validator version through `astro/zod` so build-time schema checks match generated types.

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
```

The `**/*.{md,mdx}` glob accepts plain Markdown (`.md`) and [MDX](https://mdxjs.com/) (`.mdx`) — Markdown with embedded JSX components.

### Using Collections in Templates

```astro
---
import { getCollection } from 'astro:content';
import BlogPost from '../components/BlogPost.astro';

const allPosts = await getCollection('blog');
const sortedPosts = allPosts
  .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
  .slice(0, 10);
---

{sortedPosts.map((post) => (
  <BlogPost post={post} />
))}
```

This gives you:
- **Type-safe data** — Zod schemas validate your Markdown frontmatter
- **Querying API** — Sort, filter, and paginate content programmatically
- **Zero-JS by default** — Content renders as static HTML unless you add interactivity

---

## 🔄 Data Fetching Patterns

Astro supports multiple data fetching strategies:

### Server-Side Data Loading (SSR)

**Excerpt** — Astro loads data in the frontmatter (server/build time), not via Next.js-style `getServerSideProps`:

```astro
---
const response = await fetch('https://api.example.com/data');
const data = await response.json();
---

<h1>{data.title}</h1>
```

### Client-Side Hydration (Islands)

**Excerpt** — assumes React hooks imported in the component file:

```astro
---
import DataComponent from '../components/DataComponent.jsx';
---

<DataComponent client:load />
```

```jsx
// DataComponent.jsx — Excerpt
import { useEffect, useState } from 'react';

export default function DataComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  if (!data) return <p>Loading...</p>;
  return <h1>{data.title}</h1>;
}
```

### Edge Functions

```js
// src/pages/api/data.json.ts
export async function GET({ request }) {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

**Choose based on:**
- **SSR** — Content needed for SEO, data changes frequently
- **Client-side** — User-specific data, real-time updates
- **Edge functions** — Personalized content with low latency

---

## 🌍 Internationalization routing (mandatory for Entrega 1)

Entrega 1 must ship a **bilingual Astro site** using Astro's built-in [i18n routing](https://docs.astro.build/en/guides/internationalization/) — not a client-side-only language toggle. This mirrors the `/es/…` and `/en/…` URL trees you practiced in FE I, but uses Astro's router instead of React Router.

**Minimum contract:**

- `astro.config.mjs` declares `defaultLocale`, `locales: ['es', 'en']`, and an explicit `routing` strategy
- At least one shared page exists in both locales (e.g. home + one inner route)
- Locale links use Astro helpers — no hard-coded `/en/foo` strings scattered in components

**Template** — replace locale codes and `prefixDefaultLocale` with your team's Entrega 1 choice; document the decision in `decisions.md`:

```js
// astro.config.mjs — Excerpt
import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false, // es at /, en at /en/ — or true for /es/ + /en/
    },
  },
});
```

**Excerpt** — locale-aware link in a layout (adjust import paths):

```astro
---
import { getRelativeLocaleUrl } from 'astro:i18n';

const esHome = getRelativeLocaleUrl('es', '/');
const enHome = getRelativeLocaleUrl('en', '/');
---

<nav aria-label="Language">
  <a href={esHome} hreflang="es">ES</a>
  <a href={enHome} hreflang="en">EN</a>
</nav>
```

Organise pages under `src/pages/` following the [folder structure in the Astro i18n guide](https://docs.astro.build/en/guides/internationalization/#create-localized-pages) for your chosen `prefixDefaultLocale` value. Run `npm run build` and open the generated `dist/` paths — both locale entry URLs must exist before Entrega 1.

> **Not Entrega 1:** a single-language Astro site with a client-side dictionary swap and no locale-prefixed routes.

---

## 🌐 Multi-Framework Integration

Astro's islands architecture makes it trivial to mix frameworks:

### Setting Up Multiple Frameworks

```bash
npx astro add react vue svelte
```

### Using Frameworks Together

```astro
---
import ReactCounter from '../components/ReactCounter.jsx';
import VueChart from '../components/VueChart.vue';
import SvelteMap from '../components/SvelteMap.svelte';
---

<h1>Multi-Framework Dashboard</h1>

<div class="dashboard-grid">
  <ReactCounter client:load />
  <VueChart client:visible />
  <SvelteMap client:idle />
</div>
```

**Benefits:**
- **Right tool for the job** — Use React for complex state, Vue for simple reactivity, Svelte for performance
- **No framework wars** — Teams can work in their preferred framework within the same project
- **Isolated bundles** — Each framework loads only its own code, no monolithic bundle

### When to Use Multi-Framework

- **Teams with mixed expertise** — Let React developers own React islands, Vue developers own Vue islands
- **Legacy migration** — Gradually migrate old Vue components into a new Astro project
- **Specialized use cases** — Svelte for performance-critical widgets, React for complex state management

---

## 🏗️ Micro-Frontend Architecture

Astro is particularly well-suited for micro-frontend composition:

### Composition vs. Implementation

```
┌─────────────────────────────────────────────────────────┐
│              MICRO-FRONTEND STRATEGY                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Approach A: Implementation-First                        │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│   │ React App │  │ Vue App   │  │ Svelte App│          │
│   └──────────┘  └──────────┘  └──────────┘          │
│   iframe or portal composition (heavy, slow)             │
│                                                          │
│   Approach B: Composition-First (Astro)                  │
│   ┌──────────────────────────────────────────────┐     │
│   │ Astro Router                                 │     │
│   │   ├─ React Island (interactive widget)      │     │
│   │   ├─ Vue Island (form component)             │     │
│   │   └─ Svelte Island (map visualization)       │     │
│   └──────────────────────────────────────────────┘     │
│   Shared routing, styling, data fetching (light)       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

Astro's composition-first approach gives you:
- **Shared routing** — One URL structure for the entire site
- **Shared styling** — CSS tokens and design system work across frameworks
- **Shared data fetching** — Server-side data loading feeds all islands
- **Independent deployments** — Islands can be updated without redeploying the whole site

### Build Targets

**Excerpt** — site output mode in `astro.config.mjs` (collection schemas stay in `src/content.config.ts`):

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static', // SSG
  // output: 'server', // SSR — per-route prerender flags (see Unit 2)
  adapter: vercel(), // when using SSR: Vercel, Netlify, Cloudflare, etc.
});
```

**Choose based on:**
- **Static** — Content sites, blogs, documentation (fastest, cheapest)
- **Server** — Dynamic content, user-specific pages (more complex; use `export const prerender = false` on dynamic routes)
- **Mixed** — `output: 'server'` with per-route `prerender` flags (replaces legacy `output: 'hybrid'`)

---

## 🎯 Practice Exercise

**Time:** 1 hour

1. **Create a content collection** for a blog or product catalog
2. **Enable Astro i18n routing** — At least `es` and `en` locales with working locale-prefixed routes (mandatory for Entrega 1)
3. **Implement server-side data loading** — Fetch data from an API and render it server-side
4. **Add multi-framework islands** — Integrate at least two frameworks (React + Vue or Svelte)
5. **Compare rendering strategies** — Build the same page with SSG and SSR, measure performance differences
6. **Design a micro-frontend architecture** — Document how you would compose multiple framework-based projects using Astro

**Deliverable:** Astro project with content collection, i18n routing, multi-framework islands, and architecture diagram

---

## 📚 Recommended Reading

- **Content Collections** — https://docs.astro.build/en/guides/content-collections/
- **Internationalization (i18n) routing** — https://docs.astro.build/en/guides/internationalization/
- **Data Fetching** — https://docs.astro.build/en/guides/server-side-rendering/
- **Multi-Framework Rendering** — https://docs.astro.build/en/guides/multi-framework-rendering/
- **Deployment Targets** — https://docs.astro.build/en/guides/deploy/

---

## ✅ Session Outcome

By the end of this unit, you should:

- Be able to design and implement content collections with type-safe schemas
- Configure Astro i18n routing with at least Spanish and English locale URLs (Entrega 1 requirement)
- Understand when to use server-side vs. client-side data fetching
- Successfully mix React, Vue, and Svelte components in the same Astro project
- Plan micro-frontend architectures using Astro as the composition layer
- Choose appropriate build targets (SSG vs. SSR vs. mixed per-route prerender) for different use cases

Units 2–3 complete the **Arquitecturas de aplicaciones front-end** official CONTENIDOS requirement with Astro as the meta-framework. The Entrega 1 seed project can now be built using these patterns.

---

> _"Good architecture is invisible. You only notice it when it's missing."_

> _"The inner layer is the most reusable. The outer layer is the most disposable. Build value inward."_
> — Tao of Development, `arch-011`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Session Outcome"
  visual-grammar: "typed-composition-boundaries — typed content collections and framework islands converging through explicit composition boundaries"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

## B1 · Lección magistral — 1 h

**Claim:** composing multiple frameworks is only cheap because each island still pays its own hydration cost individually — and there is already a frontier primitive designed to remove that cost entirely.

Resumability, as distinct from hydration, is defined by re-serializing the necessary application state into the HTML itself rather than re-executing code on the client to recover it. The same source names islands architecture directly as a *partial* optimization of hydration's cost that "does not solve the fundamental issue… that resumability avoids by changing the axioms" (Vepsäläinen 2024, 2).
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
Resumability, as distinct from hydration, is defined by re-serializing the necessary application state into the HTML itself rather than re-executing code on the client to recover it. The same source names islands architecture directly as a *partial* optimization of hydration's cost that "does not solve the fundamental issue… that resumability avoids by changing the axioms" (Vepsäläinen 2024, 2 — Ahmes coat `3d09df05`, node `6589254e-3a63-5095-9571-363afdb8040b`).
-->
{% endif %}

Teach this as a limit, not a contradiction: Unit 2's islands pattern is the industry-standard answer today; resumability is where the frontier is heading. Mixing three frameworks' islands on one page multiplies the per-island hydration cost the resumability paper is describing — a fact worth knowing before a team over-adopts multi-framework composition for its own sake.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
**Evidence update (2026-08-23):** the Ahmes sources ground the *technique* — what resumability and islands are, and their trade-offs. The teaching object is now the boundary decision: content schema, data location, framework island, server island, and deployment target must be mapped before implementation. **No Ahmes source supports a claim that teaching content collections, multi-framework composition, or micro-frontend design produces better learning outcomes for this cohort.** The lab remains a transfer-informed pilot; see the dated FE II gap-pass record in the research repository copy.
-->
{% endif %}

**Speaker outline:** see `deck-outline.md`.

## B2 · Prácticas de laboratorio — 2 h · team

Real backlog issue, not invented: either extend an existing content collection (or add a new one) with a schema the team's project actually needs, **or** add one additional framework island (Vue/Svelte, alongside the Unit 2 island) to the same project, **or** implement one edge/API data-fetching route the project needs. Pick the one the backlog actually contains.

Definition of done: any content-collection schema change is validated at build time — a silent Zod failure is not acceptable; CI is green; a human reviews any AI-generated suggestion; a release note documents which rendering strategy (SSG/SSR/mixed per-route prerender) was chosen for the change and why, in narrate-axis language (Unit 11 vocabulary, introduced early here on purpose).

Roles rotate; do not repeat a role or a layer already owned in Unit 2's lab.

Evidence: branch, PR, schema-validation output (or the equivalent for the island/route path chosen), AI accept/reject log row if AI assistance was used.

## B3 · Resolución de ejercicios — 1 h · individual

1. **Diagnostic:** a content-collection entry fails its Zod schema at build time. Given the error message and the frontmatter, name the offending field and correct it.
2. **No-AI (declared):** given three data scenarios — a product price that changes hourly, a blog post published once, a user's live cart contents — decide SSR, static generation, or client-side fetch for each, and justify each choice in one sentence, without AI assistance.
3. Explain, in your own words, why adding a fourth framework to an Astro project does not multiply build complexity the way adding a fourth framework to a single SPA would.

Professor answer sketches belong in the instructor copy. These exercises are intentionally decontextualised from the team's product.

## References

- Vepsäläinen, Juho. 2024. “Resumability—A New Primitive for Developing Web Applications.” *IEEE Access*. https://doi.org/10.1109/ACCESS.2024.3352891.
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- Vepsäläinen, J. (2024). *Resumability — A New Primitive for Developing Web Applications.* `10.1109/ACCESS.2024.3352891`. Ahmes coat `3d09df05`, node `6589254e-3a63-5095-9571-363afdb8040b`, p.2. Resolved via `ahmes query &#45;&#45;cite`, `evaluator_safe=yes`.
-->
{% endif %}
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
located by grep over extract/index.md for "Hydration can be optimized" inside coat 3d09df05 (matrix-named as the resumability coat), node/page resolved via sqlite3 join fission_node × anchor_spatial, cite confirmed via `ahmes query &#45;&#45;cite <db>:<node_id> &#45;&#45;require-evaluator-safe`
-->
{% endif %}
- **Remaining evidence boundary:** this unit does not establish that teaching content collections, multi-framework composition, or micro-frontend architecture produces measurably better learning outcomes than an alternative sequence. The frontier technique is documented; the boundary-reasoning lab is a pilot.
