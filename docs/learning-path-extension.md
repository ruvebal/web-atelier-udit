---
layout: methodology
title: 'The Path Forward: MCP, Tooling & Digital Humanities'
title_alt: 'El Camino Adelante: MCP, Herramientas y Humanidades Digitales'
slug: learning-path-extension
date: 2026-01-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /methodology/en/learning-path-extension/
description: 'A strategic roadmap for advancing AI-assisted development skills, building MCP servers, and scaling Digital Humanities course infrastructure.'
tags: [mcp, tooling, automation, digital-humanities, learning-path]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"The master developer does not seek to learn every tool—they seek to understand the patterns that make all tools comprehensible."_
> — The Tao of the Developer

---

## 1. Where You Stand: An Assessment

### 1.1 Your Current Capabilities

Based on the projects and patterns observed:

```
┌─────────────────────────────────────────────────────────────┐
│              CAPABILITY MATRIX                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  STRONG (★★★★★)                                              │
│  ├── Jekyll/Liquid static sites                              │
│  ├── Tailwind CSS + design systems                           │
│  ├── Bilingual content architecture (EN/ES)                  │
│  ├── GitHub Pages deployment                                 │
│  ├── AI-assisted development (docs-first)                    │
│  └── Pedagogical content creation                            │
│                                                              │
│  DEVELOPING (★★★☆☆)                                          │
│  ├── Node.js scripting (YAML transformations)                │
│  ├── React (via MCP awareness)                               │
│  ├── Docker orchestration (awareness)                        │
│  └── FastAPI backend (Oraculum patterns)                     │
│                                                              │
│  EXPLORING (★★☆☆☆)                                           │
│  ├── MCP server development                                  │
│  ├── Vector databases (ChromaDB)                             │
│  ├── SSR frameworks (Astro, React Router 7)                  │
│  └── Monorepo architecture                                   │
│                                                              │
│  NEXT HORIZON (★☆☆☆☆)                                        │
│  ├── Custom MCP tool creation                                │
│  ├── Real-time systems (WebSocket broadcasting)              │
│  ├── RAG pipelines                                           │
│  └── Multi-project automation                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Your Unique Position

As a **Digital Humanities scholar** with **web development expertise**, you occupy a rare intersection:

| Domain            | Your Edge                               |
| ----------------- | --------------------------------------- |
| **Technical**     | Can build what you envision             |
| **Pedagogical**   | Understand learning progressions        |
| **Philosophical** | Bring Tao wisdom to technical decisions |
| **Multilingual**  | Native EN/ES content creation           |
| **Ethical**       | ACM/UNESCO frameworks integrated        |

This positions you to build tools that **other educators need but cannot build themselves**.

---

## 2. The MCP Vision: When and How

### 2.1 The Pattern First, The Tool Second

**TTOD Wisdom:**

> _"Do not build the bridge before you have walked the path many times and know exactly where it must be placed."_

**Applied:**

```
┌─────────────────────────────────────────────────────────────┐
│              MCP READINESS LADDER                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  LEVEL 1: PATTERN RECOGNITION (You are here)                 │
│  └── Build 3+ projects with similar needs                    │
│  └── Document the repetitive tasks                           │
│  └── Identify what could be automated                        │
│                                                              │
│  LEVEL 2: MANUAL AUTOMATION                                  │
│  └── Create Node.js scripts for common tasks                 │
│  └── Build CLI tools with commander.js                       │
│  └── Version and share across projects                       │
│                                                              │
│  LEVEL 3: MCP PROTOTYPING                                    │
│  └── Wrap existing scripts as MCP tools                      │
│  └── Test with Claude Desktop or Cursor                      │
│  └── Iterate based on actual usage                           │
│                                                              │
│  LEVEL 4: MCP PRODUCTION                                     │
│  └── Build robust server with validation                     │
│  └── Add resources, prompts, capabilities                    │
│  └── Publish for community use                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 What Your MCP Could Do

Based on your projects, a **Digital Humanities Course Builder MCP** could expose:

```
┌─────────────────────────────────────────────────────────────┐
│              MCP: COURSE-BUILDER                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  TOOLS (Write Operations)                                    │
│  ├── scaffold_course(template, config)                       │
│  │   └── Create new course from professor-template           │
│  │                                                           │
│  ├── add_lesson(course, lesson_config)                       │
│  │   └── Generate lesson file with full front matter         │
│  │                                                           │
│  ├── sync_translations(source_lang, target_lang)             │
│  │   └── Update ES from EN or vice versa                     │
│  │                                                           │
│  ├── generate_exam(yaml_path, format)                        │
│  │   └── Output Moodle XML, QTI, or print PDF                │
│  │                                                           │
│  ├── add_student(course, student_yaml)                       │
│  │   └── Add student to showroom                             │
│  │                                                           │
│  └── deploy_course(course, platform)                         │
│      └── Build and deploy to GitHub Pages                    │
│                                                              │
│  RESOURCES (Read Operations)                                 │
│  ├── lessons://web-foundations/{slug}                        │
│  │   └── Read lesson content                                 │
│  │                                                           │
│  ├── exams://portfolio-self-assessment                       │
│  │   └── Read exam questions                                 │
│  │                                                           │
│  ├── students://{course}/{term}                              │
│  │   └── List enrolled students                              │
│  │                                                           │
│  └── ttod://wisdom/{category}                                │
│      └── Get Tao quotes by category                          │
│                                                              │
│  PROMPTS (Templates)                                         │
│  ├── create-lesson                                           │
│  │   └── Template for AI-assisted lesson creation            │
│  │                                                           │
│  ├── review-accessibility                                    │
│  │   └── Audit lesson for WCAG compliance                    │
│  │                                                           │
│  └── translate-content                                       │
│      └── High-quality EN↔ES translation                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 When to Build It

> [!NOTE] > **Updated Recommendation (January 2026)**: After reviewing the [Craftsperson's Path](../../../fullstack/craftsperson-path.md), the recommendation has changed. **Set up studio infrastructure (including MCP servers) FIRST** (Week 1-2), then build projects as "satellites" connecting to the studio core. See [Infrastructure Strategy Recommendation](./infrastructure-strategy-recommendation.md) for the full analysis.

**Original progression (for reference):**

| Milestone              | Signal You're Ready                |
| ---------------------- | ---------------------------------- |
| **3 courses deployed** | You've repeated the pattern enough |
| **Scripts documented** | You have reusable Node.js tools    |
| **Pain points clear**  | You know exactly what to automate  |
| **Time available**     | 20-40 hours to invest              |

**Revised recommendation:** Set up studio infrastructure (lilith + beelzebub) with MCP servers in Week 1-2, then projects connect to shared services. This enables rapid project creation and AI memory from the start.

---

## 3. The Trinity of Revelation as Universal Pattern

### 3.1 The Pattern Abstracted

Your Oraculum's "Trinity of Revelation" is a universal architecture:

```
┌─────────────────────────────────────────────────────────────┐
│              TRINITY ARCHITECTURE (Generalized)              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. DHARMAKAYA (Static Essence)                              │
│     └── Pre-rendered content                                 │
│     └── SEO-friendly                                         │
│     └── Instant first load                                   │
│     └── Technology: SSG (Jekyll, Astro, Hugo)                │
│                                                              │
│  2. SAMBHOGAKAYA (Living Stream)                             │
│     └── Real-time updates                                    │
│     └── Push-based communication                             │
│     └── Ambient presence                                     │
│     └── Technology: WebSocket, SSE, Edge Workers             │
│                                                              │
│  3. NIRMANAKAYA (Manifested Response)                        │
│     └── On-demand queries                                    │
│     └── Semantic search                                      │
│     └── Personalized answers                                 │
│     └── Technology: REST API, Vector DB, RAG                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Application Across Projects

| Project             | Static           | Stream           | Search              |
| ------------------- | ---------------- | ---------------- | ------------------- |
| **Web Atelier**     | Jekyll lessons   | (not needed)     | Fuse.js client-side |
| **Oraculum**        | SSR sutras       | Edge WebSocket   | ChromaDB vectors    |
| **Video Editing**   | Astro lessons    | (not needed)     | Pagefind            |
| **Course Template** | Jekyll pages     | (not needed)     | Category filter     |
| **Future: Archive** | Static documents | Live annotations | Full-text + vectors |

### 3.3 Shared Infrastructure

When you have 5+ projects, consider a shared layer:

```
┌─────────────────────────────────────────────────────────────┐
│              SHARED INFRASTRUCTURE LAYER                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  docker-compose.yml (shared services)                        │
│  ├── nginx-proxy (unified routing)                           │
│  ├── chromadb (vector storage)                               │
│  ├── redis (caching, real-time)                              │
│  └── postgres (structured data)                              │
│                                                              │
│  Each project connects via environment variables:            │
│  ├── VECTOR_DB_URL=http://chromadb:8000                      │
│  ├── CACHE_URL=redis://redis:6379                            │
│  └── DATABASE_URL=postgres://user:pass@postgres:5432/db      │
│                                                              │
│  MCP server orchestrates:                                    │
│  ├── Start/stop project stacks                               │
│  ├── Migrate databases                                       │
│  └── Sync content between projects                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Learning Roadmap: The Next 12 Months

### 4.1 Quarter 1: Foundation Solidification

| Week | Focus                       | Deliverable                   |
| ---- | --------------------------- | ----------------------------- |
| 1-2  | Lessons metadata refactor   | Enhanced `lessons.yml`        |
| 3-4  | Client-side filtering       | Filter UI for lessons         |
| 5-6  | Professor template update   | Better semantics for courses  |
| 7-8  | Documentation consolidation | All methodology docs complete |

**Skills deepened:** Jekyll optimization, Alpine.js, YAML schemas

### 4.2 Quarter 2: Node.js Tooling

| Week | Focus                       | Deliverable                      |
| ---- | --------------------------- | -------------------------------- |
| 1-2  | CLI tool creation           | `web-atelier-cli` package        |
| 3-4  | Exam transformation suite   | Unified QTI/Moodle/PDF generator |
| 5-6  | Content sync tools          | EN↔ES translation helper         |
| 7-8  | GitHub Actions optimization | Faster, smarter CI/CD            |

**Skills developed:** commander.js, inquirer, child_process

### 4.3 Quarter 3: MCP Exploration

| Week | Focus                   | Deliverable                     |
| ---- | ----------------------- | ------------------------------- |
| 1-2  | MCP specification study | Documented understanding        |
| 3-4  | First MCP server        | Simple tool wrapper             |
| 5-6  | Resource providers      | Expose lessons as MCP resources |
| 7-8  | Prompt templates        | Reusable prompt library         |

**Skills developed:** MCP protocol, JSON-RPC, tool definition

### 4.4 Quarter 4: Integration & Scaling

| Week | Focus                     | Deliverable                  |
| ---- | ------------------------- | ---------------------------- |
| 1-2  | Multi-course management   | Unified dashboard concept    |
| 3-4  | Vector search integration | Semantic lesson discovery    |
| 5-6  | Analytics foundation      | Learning analytics prototype |
| 7-8  | Community release         | Open-source CLI/MCP          |

**Skills developed:** Docker orchestration, vector DBs, analytics

---

## 5. The TTOD Counsel

### 5.1 Wisdom for Your Current Phase

From `_data/ttod.yml`:

> **On Incremental Progress:** > _"The master refactors not by rewriting everything, but by improving one function, then another, then another."_

> **On Tool Building:** > _"Build the tool when you are tired of the manual work, not when you imagine you might be."_

> **On Architecture:** > _"The wise architect builds the simplest structure that serves the need. Complexity is added only when simplicity fails."_

> **On Learning:** > _"The student who studies one framework deeply understands all frameworks. The student who studies all frameworks superficially understands none."_

### 5.2 Applied Guidance

| Temptation                                     | Tao Response                                    |
| ---------------------------------------------- | ----------------------------------------------- |
| "Build MCP now"                                | Build scripts first; MCP wraps mature scripts   |
| "Migrate to Astro immediately"                 | Optimize Jekyll first; migrate when blocked     |
| "Create universal Digital Humanities platform" | Create for your courses first; generalize later |
| "Learn everything at once"                     | Master one layer, then the next                 |

---

## 6. The Digital Humanities Multiplier

### 6.1 Your Unique Contribution Potential

As a Digital Humanities scholar building web tools, you can create:

```
┌─────────────────────────────────────────────────────────────┐
│              POTENTIAL IMPACT                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  FOR EDUCATORS                                               │
│  ├── Open course templates                                   │
│  ├── Multilingual lesson infrastructure                      │
│  ├── AI-assisted content creation guides                     │
│  └── Ethical technology teaching resources                   │
│                                                              │
│  FOR STUDENTS                                                │
│  ├── Beautiful, accessible learning materials                │
│  ├── Semantic navigation and discovery                       │
│  ├── Portfolio infrastructure                                │
│  └── Employable skills (real-world workflows)                │
│                                                              │
│  FOR THE FIELD                                               │
│  ├── Digital Humanities infrastructure patterns              │
│  ├── AI ethics integration models                            │
│  ├── Open educational resources (OER)                        │
│  └── Reproducible pedagogical methods                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 The Value Multiplier

Each hour you invest creates:

| Investment              | Return                                        |
| ----------------------- | --------------------------------------------- |
| 1 hour on lessons.yml   | Better UX for 100s of students                |
| 1 hour on CLI tool      | Saved 10+ hours across future courses         |
| 1 hour on MCP           | Enabled other educators to use AI effectively |
| 1 hour on documentation | Knowledge preserved beyond your tenure        |

---

## 7. Immediate Next Steps

### This Week

1. **Run the metadata enhancement** (see [AI Refactoring Strategy]({{ '/methodology/en/ai-refactoring-strategy/' | relative_url }}))
2. **Commit the enhanced `lessons.yml`**
3. **Prototype filter UI** (basic Alpine.js)

### This Month

1. **Complete filtering implementation**
2. **Update professor-course-template** with new semantics
3. **Document the pattern** for future courses

### This Quarter

1. **Evaluate Astro** for new projects (not migration yet)
2. **Start CLI tool** (`web-atelier-cli`)
3. **Plan MCP architecture** (document, don't build yet)

---

## 🔗 Related Resources

| Resource                                                                     | Description                |
| ---------------------------------------------------------------------------- | -------------------------- | ------------------------- |
| [Architecture Analysis]({{ '/methodology/en/architecture-refactor-analysis/' | relative_url }})           | Full technical options    |
| [AI Refactoring Strategy]({{ '/methodology/en/ai-refactoring-strategy/'      | relative_url }})           | Prompts and process       |
| [AI Practical Guide]({{ '/methodology/en/ai-practical-guide/'                | relative_url }})           | Comprehensive methodology |
| [The Tao of AI Development]({{ '/methodology/en/tao-of-ai-development/'      | relative_url }})           | Philosophical guidance    |
| [MCP Documentation](https://spec.modelcontextprotocol.io/)                   | Official MCP specification |

---

> _"The journey of a thousand courses begins with a single well-structured `lessons.yml`."_
> — The Tao of the Digital Humanist

---

**Authorship:** Rubén Vega Balbás, PhD (UDIT) · ORCID: [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)
**License:** Content CC BY-NC-SA 4.0

_Critical Coding for a Better Living._
