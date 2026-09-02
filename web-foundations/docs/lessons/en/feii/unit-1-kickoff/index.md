---
layout: lesson
title: 'Unit 1: Kickoff — From FE I React to Production Architecture'
title_alt: 'Unidad 1: Lanzamiento — De React FE I a Arquitectura de Producción'
slug: feii-unit-1-kickoff
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-1-kickoff/
description: 'Orientation session bridging FE I React foundations to FE II production architecture, interface-layer thinking, and systems of interfaces.'
tags: [feii, orientation, architecture, interface-layer, production, systems-thinking]
status: complete
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> Production front-end is not an <code>index.html</code> serving one executable bundle on a desktop browser. It is an <strong>orchestration layer</strong> — a distributed network of touchpoints across browser/device, edge/service, backend, and the user.</p>
<p><strong>Field lens:</strong></p>
<ul>
<li><strong>Practice anchor:</strong> stop programming only “pages” and design <strong>multi-layer orchestration flows</strong> (what lives on the client, at the edge, in the API, and what responds to user context).</li>
<li><strong>Frontier signal:</strong> edge computing, device/<abbr title="Progressive Web App">PWA</abbr> capabilities, real-time (<abbr title="Conflict-free Replicated Data Type">CRDT</abbr>, WebSocket), and multi-surface systems widen where “the front-end” ends.</li>
<li><strong>Pedagogy status:</strong> this unit is orientation with no technical <abbr title="Official curriculum CONTENIDOS block">CONTENIDOS</abbr> anchor; the frame prepares the Units 2–12 pilot.</li>
</ul>
</aside>

> **Studio test:** Draw a product’s surfaces, contracts, and failure boundaries — not only UI components, but CDN/edge, cache, auth, and offline degradation.

### Acronyms in this unit

| Acronym | Meaning | First appears |
| --- | --- | --- |
| **SPA** | *Single Page Application* | § Interface reframe |
| **PWA** | *Progressive Web App* | § Four-pillar vector |
| **BFF** | *Backend for Frontend* | § Four-pillar vector |
| **CDN** | *Content Delivery Network* | § Four-pillar vector |
| **CI/CD** | *Continuous Integration / Continuous Delivery* | § Four-pillar vector |
| **a11y** | *Accessibility* (11 letters between “a” and “y”) | § Four-pillar vector |
| **CRDT** | *Conflict-free Replicated Data Type* | § Frontier signal |
| **API** | *Application Programming Interface* | § Interface reframe |
| **SSR** | *Server-Side Rendering* | § Meta-frameworks |
| **SSG** | *Static Site Generation* | § Meta-frameworks |
| **RSC** | *React Server Components* — server-only components in the React ecosystem | § Meta-frameworks |
| **DX** | *Developer Experience* | § Meta-frameworks |

---
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

{% include lesson-semantic-graphic.html %}

---

## Before you start

| Requirement | Required? |
| --- | --- |
| FE I semester 2 complete (React app deployed) | Yes |
| Access to course track index + this unit’s `exercises.md` | Yes |
| Team repository for Entrega 1 | Not yet — starts Unit 2 |

---

## Follow this path (orientation — no lab)

| Step | Action | Section |
| --- | --- | --- |
| 1 | Read the distributed interface system frame | Front-end as a distributed interface system |
| 2 | Complete the four-pillar vector table (exercise 1) | Four-pillar connection vector |
| 3 | Distinguish meta-framework from micro-frontend | Meta-frameworks vs micro-frontends |
| 4 | Review the semester calendar on the track index (not duplicated here) | [FE II track index]({{ '/tracks/feii/' | relative_url }}) |
| 5 | Note the FE I → FE II bridge | Connection to FE I |
| 6 | Read AI disclosure rules for FE II | AI-Assisted Development in FE II |
| 7 | Complete **3 individual exercises** (1 h) | Exercises (individual) |
| 8 | Skim canonical reading for Unit 2 | Recommended Reading |

---

## Verify before you leave

- [ ] You can explain “single interface” vs “system of interfaces” in one paragraph
- [ ] You can name **one architecture decision** per pillar of the four-pillar vector (browser, service, deploy, user)
- [ ] You can name Units 2, 5, and 11 themes without looking
- [ ] Exercise submissions distinguish **speed** from **understanding** (exercise 2)
- [ ] You know where Astro Docs MCP will be wired (Unit 2 preview)

---

## Common failures

| Mistake | Why it matters | Avoid by |
| --- | --- | --- |
| Treating kickoff as “free week” | Unit 2 lab assumes this frame | Submit exercises |
| Expecting a team lab task | 0 h lab is official | Wait for Unit 2 |
| Using AI on exercise 2 | Marked “solvable without AI” | Write two sentences yourself |

---

## Submit (Unit 1 evidence)

Submit the three exercises per professor channel (Moodle / repo issue — as announced in class). No team PR this unit.

---

> _"Before the first line of code, prepare the forge. Before the first query, load the memory. Documentation is not an afterthought — it is the first act of architecture."_
> — Tao of Development, `wis-014`
{: .tao-development-quote }

> **AI Assistance Disclosure:** This unit integrates AI-assisted development following the docs-first methodology. Plans, prompts, and implementation reports are documented throughout the process.

> 📐 **Code block convention:** this unit includes one illustrative **Excerpt** (Astro middleware); it does not run in U1. Full policy: [§ Conventions]({{ '/lessons/en/feii/' | relative_url }}#-conventions-used-across-these-lessons).

---

## 🎯 Learning Objectives

By the end of this orientation session, you will be able to:

- **Bridge the gap** between FE I's React foundations and FE II's production architecture focus
- **Understand the interface-layer shift** — from one SPA to a distributed system of interfaces (edge, device, real-time, multi-surface)
- **Apply the four-pillar vector** — browser, service/API, deploy/infra, and user as architecture decisions, not only code layers
- **Distinguish meta-framework and micro-frontend** — different dimensions (single project vs organizational scale); how they combine in production
- **Align with the durable-core philosophy** — frameworks as volatile layers, principles as the stable foundation

---

## 📖 The Interface Layer Reframe

In FE I, you learned to build interfaces — components, state management, routing, authentication, and deployment. You built solid React applications: one **SPA** with a main bundle and a clear deploy target.

FE II asks a different question: **What happens when interfaces scale beyond that SPA?**

- Not one React app, but dozens of micro-frontends and composition meta-frameworks (Units 2–3)
- Not just browser rendering, but **edge** cache, **PWA**, service workers, and offline-first experiences (Unit 4)
- Not just REST APIs, but **BFF**, WebSocket, IoT devices, and Python services (Units 10–11)
- Not just component testing, but **CI/CD** pipelines, performance budgets, and monitoring (Units 5–7)

The interface layer is no longer a single screen — it's a **distributed system** with human-facing components.

---

## 🌐 Front-end as a distributed interface system

In modern software, the interface is not only the *view* of a monolith. It is a layer that operates simultaneously at the **edge**, on heterogeneous devices, through real-time events, and across multiple surfaces (mobile, web, embeds, AI agents).

```
                    [ INTERFACE LAYER ]
                            │
     ┌──────────────────────┼──────────────────────┐
     ▼                      ▼                      ▼
[ BROWSER / DEVICE ]    [ EDGE / SERVICE ]    [ USER ]
• Micro-frontends         • Edge Functions      • Multi-surface
• Rendering engines       • Middleware / auth   • Accessibility (a11y)
• Local state & storage   • Cache & streaming   • Network/device context
```

**Heterogeneous ecosystems:** one design system can feed web, native webviews, extensions, embeddable widgets, or voice interfaces — not a single `index.html`.

**Separation of responsibilities:** interface logic shifts dynamically between client, distribution network (edge), and backend according to latency, security, and compute constraints.

### Four-pillar connection vector (Practice anchor)

Stop drawing UI components only. For each dimension, write **one architecture decision** — the question you would ask in production:

| Dimension | Production integration points | Architecture decision |
| --- | --- | --- |
| **Browser / client** | PWA, Service Workers, Storage APIs, Web capabilities | What state lives offline and what needs sync? |
| **Service / API** | GraphQL, **BFF**, REST, Server Actions | How do you decouple the data model from the view? |
| **Deploy / infra** | Edge (Cloudflare Workers, Fastly), **CI/CD**, **CDN** | What render or routing logic runs close to the user? |
| **User** | Device type, network context, **a11y** preferences | How does the system degrade gracefully? |

This vector returns in Entrega 1 (Astro + edge middleware), Entrega 2 (WebSocket + IoT panel), and the capstone (Units 11–12).

### Orchestration example: edge middleware (Unit 2 preview)

**Excerpt** — illustrative; does not run in this unit. Shows how the edge acts as the **first orchestration layer** before HTML reaches the browser. Canonical docs: [Astro middleware](https://docs.astro.build/en/guides/middleware/)

```ts
// src/middleware.ts — Excerpt (Astro; Unit 2+)
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, locals, redirect } = context;
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') ?? '';

  // 1. Device/context injection without touching the client
  locals.isMobile = /mobile/i.test(userAgent);

  // 2. Auth and routing at the edge boundary
  if (url.pathname.startsWith('/dashboard') && !request.headers.get('cookie')?.includes('session=')) {
    return redirect('/login', 302);
  }

  const response = await next();

  // 3. System cache policy
  response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=3600');
  return response;
});
```

Pattern: **inject context** → **decide at the boundary** → **render interface** → **set cache policy** — without assuming everything happens in client-side React.

### The systems lens (FE I → FE II)

FE I taught you to think component-first. FE II teaches you to think system-first:

```
┌─────────────────────────────────────────────────────────┐
│                    INTERFACE LAYER                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Single Interface (FE I)      System of Interfaces (FE II) │
│   ┌─────────────────┐         ┌──────────────────────┐  │
│   │ React Component │         │ Meta-Framework      │  │
│   │ State & Props   │         │ Micro-Frontends      │  │
│   │ SPA Routing     │         │ Edge + middleware    │  │
│   └─────────────────┘         │ PWA / offline        │  │
│                                │ Real-time / IoT      │  │
│                                └──────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

The component model stays the same — props, state, lifecycle — but the **deployment context** changes dramatically.

---

## 🔭 Frontier signal: widening the front-end boundary

Four vectors where the front-end boundary expands today (deepened in later units):

```
              [ FRONT-END FRONTIER ]
                         │
    ┌────────────┬───────┴───────┬────────────┐
    ▼            ▼               ▼            ▼
[ EDGE ]    [ DEVICE ]       [ REAL-TIME ] [ MULTI-SURFACE ]
Middleware  PWA, WASM,      CRDTs,        Design tokens,
near SSR    WebGPU, APIs    WebSocket     web + mobile + AI
```

| Vector | What changes | FE II unit |
| --- | --- | --- |
| **Edge computing** | Partial SSR, A/B, optimization before first byte | 2–3, 7 |
| **Device capabilities** | Browser as high-performance runtime (WASM, WebGPU, 3D) | 4, 8–9 |
| **Real-time** | Client as node in distributed state (**CRDT**, WebSocket) | 10–11 |
| **Multi-surface** | Same business logic → web, native, embeds, agents | 11–12 |

### Transfer activities (pilot)

1. **Architecture design:** diagram for global e-commerce or banking — CDN/edge, cache, auth middleware, selective hydration (Unit 2), offline fallback (Unit 4). No UI mockups.
2. **Degradation simulation:** under slow 3G and CPU ×6 (Unit 7), critical functions must remain. In U1, **predict** which layer fails first.

---

## 🔬 Scholarly honesty — why this course opens with a declaration discipline, not a promise of speed

This orientation session has **no CONTENIDOS anchor and no technical claim to establish**. What it does need to frame, before Unit 2 starts, is *why* FE II asks you to declare AI assistance rather than simply use it.

A recurring tension in AI-assisted programming is the difference between
finishing a task faster and developing durable, transferable understanding.
This course therefore treats speed as insufficient evidence: students must
explain, test, and defend the decisions in their implementation.
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
A 2025 grounded-theory study of AI-assisted programming education (Liu, Fan & Pan — Ahmes node `25fa0a93-6808-5ccd-acc7-54b67523897e`) opens with exactly this tension, quoted here **with an evidence gap left visible rather than papered over**:
-->
{% endif %}

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
Unpublished quotation retained for source audit only: "The integration of generative AI into programming education has produced a widely reported tension between performance and learning. We distinguish immediate task performance from genuine learning: durable, transferable conceptual understanding and evaluative skill, and examine how AI support shapes learning processes, not merely outcomes. While many studies document improved speed, accuracy, and affect with AI support, questions remain about the quality of underlying learning."
-->
{% endif %}

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
Ahmes coat dc2bd27d (Liu, Fan & Pan, "Tool, tutor, or crutch?"), node 25fa0a93-6808-5ccd-acc7-54b67523897e, page_index 0 ("Motivation"); resolved live this session via `ahmes query &#45;&#45;cite &#45;&#45;require-evaluator-safe` -> evaluator_safe=no, exit 2, reason "missing year"; a live `ahmes enrich &#45;&#45;meta &#45;&#45;online` attempt this session enriched 0 nodes across all three library duplicates of this coat
-->
{% endif %}

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
**`[BIBLIO-GAP]` — declared, not forced.** This node is **not** evaluator-safe: `ahmes status` reports the citation preview as `[BIBLIO-GAP]` (missing year) even after a fresh `ahmes enrich &#45;&#45;meta &#45;&#45;online` attempt run live this session enriched zero nodes — a genuine, re-confirmed gap, not a pipeline lag waiting to resolve. The passage is quoted here for its *framing*, not asserted as `(Author Year)` peer-reviewed proof, and it does not enter this course's citable bibliography. What it grounds honestly: the distinction between "AI made this faster" and "I understand this better" is a real, actively-studied tension in the field — which is exactly why every unit from here forward asks you to disclose AI assistance rather than simply demonstrate speed.
-->
{% endif %}

---

## Meta-frameworks vs micro-frontends

Both address modern front-end complexity, but from **different dimensions**:

- **Meta-framework** — optimizes *development and execution of one project* (one repo, one client/server lifecycle).
- **Micro-frontends** — an *organizational and infrastructure* strategy so multiple teams deploy interface parts autonomously.

> **They are not opposites.** In production they usually **combine**: each micro-frontend is often its own meta-framework internally.

### Meta-frameworks: full-stack orchestration layer

A meta-framework sits **on top of** a UI library (React, Vue, Svelte, Solid) to solve what the library alone does not: routing, **SSR** / **SSG**, asset optimization, and often API endpoints.

| Aspect | Detail |
| --- | --- |
| **Goal** | Unify client and server in one homogeneous project |
| **Mechanisms** | File-based routing (`/app`, `/pages`), **RSC** (*React Server Components*, React ecosystem), Server Actions, unified build (Vite, Turbopack) |
| **Examples** | Next.js, Nuxt, SvelteKit, SolidStart — and **Astro** in FE II (a **composition** meta-framework with islands, not a monolithic SPA) |

Canonical Astro docs (your Unit 2): [Why Astro](https://docs.astro.build/en/concepts/why-astro/) · [Islands](https://docs.astro.build/en/concepts/islands/)

### Micro-frontends: organizational decomposition

Inspired by microservices: several independent apps, autonomous deploys, composed in the browser or at the edge.

| Aspect | Detail |
| --- | --- |
| **Goal** | Teams scale without blocking each other |
| **Mechanisms** | Module Federation, Web Components, iframes, proxy/edge routing |
| **Cost** | More complex networking, duplicated dependencies, harder visual consistency |

### Comparison matrix

| Dimension | Meta-framework | Micro-frontends |
| --- | --- | --- |
| **Primary boundary** | One project / application | System of several applications |
| **Problem solved** | Performance, SSR/SSG, **DX**, structure | Team scale, independent deploys |
| **Dependencies** | Centralized | Fragmented or federated |
| **Integration point** | Build time / unified server | Runtime (federation) or edge proxy |

### Convergence in production

```
        [ EDGE / REVERSE PROXY (Cloudflare / NGINX) ]
                         │
     ┌───────────────────┼───────────────────┐
     ▼                   ▼                   ▼
[ Next.js ]         [ Nuxt ]            [ Astro ]
 Checkout team       Catalog team        Marketing team
 (micro-frontend A)  (micro-frontend B)  (micro-frontend C)
```

In FE II you start with the **Astro meta-framework** (Units 2–3). Multi-framework composition and micro-frontend diagrams deepen in Unit 3 — do not confuse “islands in one Astro repo” with “several repos deployed by different teams” until then.

**12-unit calendar, lab hours, and deliverables:** only on the [FE II track index]({{ '/tracks/feii/' | relative_url }}) — not duplicated in this lesson.

---

## 🔗 Connection to FE I

FE I's React track is **untouched territory** — we will not re-teach React fundamentals, hooks, routing, or basic deployment. Those are yours from semester 2.

FE II starts where FE I ends:

- **FE I:** "Build a React app with routing and auth"
- **FE II:** "Build a system of React apps with Astro, PWA, and edge caching"

The component patterns you learned in FE I — hooks, context, custom hooks — remain the same. The difference is how they're composed and deployed.

---

## 🤖 AI-Assisted Development in FE II

AI assistance in FE II follows the same docs-first methodology as FE I, but with increased focus on:

- **Architecture diagrams** — Use AI to generate system diagrams, data flow visualizations, and deployment architecture docs
- **Performance audits** — Use AI to analyze bundle reports, identify bottlenecks, and suggest optimizations
- **Testing strategies** — Use AI to design test suites, generate edge cases, and review PRs for coverage gaps
- **Code review as taught technique** — Units 5–6 use a human-in-the-loop PR workflow: the model comments, the student decides accept/reject/escalate, and a human approves the merge

The AI is a collaborator in system design, not a shortcut around learning architecture.

---

## Lab (team) — 0 h this unit, and that is the honest allocation

Unit 1 carries **0 lab hours**, and this is stated as content, not omitted as an oversight: a team lab needs a real shared-repository artefact to work from, and at kickoff none exists yet. The first team lab arrives in Unit 2, once Astro scaffolding gives the cohort something to hold in common. Filling this section with a placeholder task would misrepresent what “lab” means for the rest of the course — workplace-like work on the shared repository — so it stays empty by design.

## Exercises (individual) — decontextualised · 1 h

Not the studio piece — three short problems isolating the reframe itself, before any CONTENIDOS anchor exists to drill:

1. **Diagnostic / architecture.** Given a short FE I-style description (one React SPA, one deploy target), complete the **four-pillar vector**: for browser, service, deploy, and user, state what would change in FE II and what would stay the same.
2. Given the performance-versus-learning tension introduced above, write two sentences distinguishing what an AI tool speeding up *your* task proves, and does not prove, about what you understand. **Solvable without AI — declared as such.**
3. Open the [FE II track index]({{ '/tracks/feii/' | relative_url }}) and, without opening Units 2 and 8 lessons, predict in one sentence each what they will need from this unit’s “systems lens.” Self-check — not a graded question.

Professor expected-answer sketch: kept in `exercises.md`, not this page.

---

## 📚 Recommended Reading

Canonical documentation and advance reading for Unit 2:

- **Why Astro** (composition meta-framework) — https://docs.astro.build/en/concepts/why-astro/
- **Islands architecture** — https://docs.astro.build/en/concepts/islands/
- **Astro middleware** (edge/server orchestration) — https://docs.astro.build/en/guides/middleware/
- **PWA / offline** (Unit 4 preview) — https://web.dev/learn/pwa/
- **Core Web Vitals** (Unit 7 preview) — https://web.dev/articles/vitals
- **Testing Trophy** (Units 5–6 context) — https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications

Web Atelier Astro teaching sequence index: [{{ '/lessons/en/astro/' | relative_url }}]({{ '/lessons/en/astro/' | relative_url }})

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
**Missing evidence — stated plainly:** this unit has no CONTENIDOS anchor and no technical claim to ground. Liu, Fan & Pan (2025) frames the performance-vs-learning tension that motivates the course's AI-declaration discipline but remains `[BIBLIO-GAP]` (missing year, re-confirmed live this session) — quoted for its framing, not cited as settled evidence.
-->
{% endif %}

---

## ✅ Session Outcome

By the end of this orientation, you should:

- Understand why FE II focuses on **distributed systems of interfaces** (edge, device, real-time, multi-surface)
- Apply the **four-pillar vector** to a real product without reducing it to UI components
- Distinguish **meta-framework** (single project; Astro in U2–3) from **micro-frontend** (multiple teams/repos)
- Know where the full semester arc lives ([track index]({{ '/tracks/feii/' | relative_url }}))
- Be ready to dive into **Astro meta-framework architecture** in units 2–3
- See the durable-core philosophy in action: frameworks change, principles endure

---

> _"A monorepo is not a monolith. A monolith is not modular. A modular system need not be distributed."_
> — Tao of Development, `arch-006`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Session Outcome"
  visual-grammar: "production-interface-surfaces — multiple production interface surfaces connected as one durable system"
{% endcomment %}
{% include lesson-outcome-graphic.html %}
