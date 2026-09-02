---
layout: lesson
title: 'Astro Teaching Sequence — Islands, SSR & Agentic Docs'
title_alt: 'Secuencia Astro — Islas, SSR y documentación agentica'
slug: astro
category: astro
tags: [astro, curriculum, overview, mcp, islands-architecture, feii]
date: 2026-08-28
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/astro/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Astro is not just another framework. It's a different paradigm for composing interfaces."_

---

## 🎯 What this sequence is

The **canonical Astro arc** for UDIT Front-End II — two units inside the [FE II lesson index]({{ '/lessons/en/feii/' | relative_url }}), parallel to how the [React teaching sequence]({{ '/lessons/en/react/' | relative_url }}) indexes FE I semester 2.

FE I owns React literacy. FE II adds Astro as a **second rendering paradigm**: static-by-default, islands for interactivity, composition across frameworks.

---

## 📚 Units in this sequence

| # | Unit | Focus | MCP / agentic |
| --- | --- | --- | --- |
| 1 | [Astro Meta-Framework — Islands & SSR]({{ '/lessons/en/feii/unit-2-astro-fundamentals/' | relative_url }}) | Scaffold, islands, React integration | **Astro Docs MCP** — live docs in your IDE |
| 2 | [Advanced Astro & Multi-Framework Integration]({{ '/lessons/en/feii/unit-3-astro-advanced/' | relative_url }}) | Content collections, micro-frontends | `astro:content`, `astro/zod`, build-time `llms.txt` patterns |

---

## 🤖 AI & MCP integration

Astro ships a **remote MCP endpoint** so agents (Cursor, VS Code Copilot, Claude Desktop, Windsurf) read current documentation instead of hallucinating API shapes.

**Official endpoint:** [https://mcp.docs.astro.build/mcp](https://mcp.docs.astro.build/mcp)

**Cursor / Claude / Windsurf configuration** (`mcp.json`):

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

**Why we teach this in FE II:** MCP is a **boundary**, not autopilot — same contract as [MCP in FE I React]({{ '/lessons/en/react/ai-assisted-development-foundations/' | relative_url }}#model-context-protocol-mcp). The agent queries live docs; you still verify against the running app.

### Ecosystem tools (dated platform notes — re-verify each term)

| Tool | Role |
| --- | --- |
| [Astro Docs](https://docs.astro.build/) | Core concepts, integrations, upgrade guide |
| [Building with AI Tools](https://docs.astro.build/en/guides/build-with-ai/) | Official AI-assisted workflow guidance |
| [Starlight](https://starlight.astro.build/) | Docs framework on Astro |
| Astro Actions & `astro:content` | Type-safe server functions and content collections |
| `astro/zod` | Zod schemas for collection frontmatter — use this, not `import * as z from "zod"` |
| Agent Markup / `llms.txt` integrations | Build-time Markdown mirrors for LLM-readable sites |
| [View Transitions](https://docs.astro.build/en/guides/view-transitions/) | Native transitions, zero-JS baseline |

### Structural research (not peer-reviewed Astro papers)

- **Islands architecture** — Miller, J. (2020). *Islands Architecture.* Partial hydration as isolated interactive widgets in static HTML.
- **Core Web Vitals & hydration cost** — empirical web-performance literature on client JS overhead (INP/LCP). Search arXiv (`cs.SE`, `cs.HC`) for partial/progressive hydration.

---

## 🔗 Related

- **[Front-End II track]({{ '/tracks/en/feii/' | relative_url }})** — course framing, deliverables, Entrega 1
- **[React Teaching Sequence]({{ '/lessons/en/react/' | relative_url }})** — FE I prerequisite
- **[AI Practical Guide]({{ '/methodology/en/ai-practical-guide/' | relative_url }})** — docs-first disclosure
- **[Architecture Foundations]({{ '/lessons/en/ai-assisted-development/foundations/' | relative_url }})** — MCP as typed commands

---

> _"The best interface is the one you don't notice because it just works. Astro gets you closer to that ideal."_
