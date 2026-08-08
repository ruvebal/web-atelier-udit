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

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Architecture is the art of arranging code so that changing one part doesn't break everything else."_

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Design content collections** — Structured data for blogs, docs, or product catalogs
- **Implement data fetching patterns** — Server-side data loading, client-side hydration, and edge caching
- **Mix multiple frameworks** — React, Vue, and Svelte islands in the same Astro project
- **Plan micro-frontend architectures** — When to use Astro for composition vs. framework-specific apps
- **Optimize for production** — Build targets, asset optimization, and deployment strategies

---

## 📖 Content Collections

Astro's content collections provide a structured way to manage Markdown content:

### Defining a Collection

```js
// astro.config.mjs
export default defineConfig({
  collections: {
    blog: {
      schema: z.object({
        title: z.string(),
        publishDate: z.date(),
        tags: z.array(z.string()),
        image: z.string().optional(),
      }),
    },
  },
});
```

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

```astro
---
export async function getServerSideProps({ request }) {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return { props: { data } };
}

const { data } = Astro.props;
---

<h1>{data.title}</h1>
```

### Client-Side Hydration (Islands)

```astro
---
import DataComponent from '../components/DataComponent.jsx';
---

<DataComponent client:load />
```

```jsx
// DataComponent.jsx
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

Astro supports multiple build targets:

```js
// astro.config.mjs
export default defineConfig({
  output: 'static', // SSG
  // output: 'server', // SSR
  // output: 'hybrid', // Hybrid
  adapter: vercel(), // Vercel, Netlify, Cloudflare, etc.
});
```

**Choose based on:**
- **Static** — Content sites, blogs, documentation (fastest, cheapest)
- **Server** — Dynamic content, user-specific pages (more complex)
- **Hybrid** — Mixed content (most flexible)

---

## 🎯 Practice Exercise

**Time:** 2 hours

1. **Create a content collection** for a blog or product catalog
2. **Implement server-side data loading** — Fetch data from an API and render it server-side
3. **Add multi-framework islands** — Integrate at least two frameworks (React + Vue or Svelte)
4. **Compare rendering strategies** — Build the same page with SSG and SSR, measure performance differences
5. **Design a micro-frontend architecture** — Document how you would compose multiple framework-based projects using Astro

**Deliverable:** Astro project with content collection, multi-framework islands, and architecture diagram

---

## 📚 Recommended Reading

- **Content Collections** — https://docs.astro.build/en/guides/content-collections/
- **Data Fetching** — https://docs.astro.build/en/guides/server-side-rendering/
- **Multi-Framework Rendering** — https://docs.astro.build/en/guides/multi-framework-rendering/
- **Deployment Targets** — https://docs.astro.build/en/guides/deploy/

---

## ✅ Session Outcome

By the end of this unit, you should:

- Be able to design and implement content collections with type-safe schemas
- Understand when to use server-side vs. client-side data fetching
- Successfully mix React, Vue, and Svelte components in the same Astro project
- Plan micro-frontend architectures using Astro as the composition layer
- Choose appropriate build targets (SSG vs. SSR vs. hybrid) for different use cases

Units 2–3 complete the **Arquitecturas de aplicaciones front-end** official CONTENIDOS requirement with Astro as the meta-framework. The Entrega 1 seed project can now be built using these patterns.

---

> _"Good architecture is invisible. You only notice it when it's missing."_
