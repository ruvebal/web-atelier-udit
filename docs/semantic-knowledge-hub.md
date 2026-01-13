---
layout: methodology
title: 'Semantic Knowledge Hub: Phase 1 Implementation Plan'
title_alt: 'Hub de Conocimiento Semántico: Plan de Implementación Fase 1'
slug: semantic-knowledge-hub
date: 2026-01-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /methodology/en/semantic-knowledge-hub/
description: 'Architectural blueprint for a unified semantic infrastructure serving multiple projects, teaching repositories, and AI-assisted development workflows.'
tags: [architecture, semantics, knowledge-graph, ontology, ai, mcp, metadata]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"The Tao that can be told is not the eternal Tao. But the Tao that can be indexed is a damn good start."_

---

> [!IMPORTANT] > **Infrastructure-First Update (January 2026)**: After reviewing the [Craftsperson's Path](../../../fullstack/craftsperson-path.md), the recommended approach is to **set up studio infrastructure FIRST** (MCP servers, ChromaDB, Ollama) before building the Semantic Knowledge Hub. This enables the Hub to be MCP-accessible from day one. See [Infrastructure Strategy Recommendation](./infrastructure-strategy-recommendation.md) for details.

## 📊 Project Status

**Last Updated:** January 2026
**Status:** Phase 0 — Studio Infrastructure Setup (NEW) → Phase 1 — Planning & Schema Design

| Phase | Task                                          | Status                        | Est. Time   |
| ----- | --------------------------------------------- | ----------------------------- | ----------- |
| **0** | Studio Infrastructure (MCP, ChromaDB, Ollama) | ⚠️ Prerequisite               | 8-12 hours  |
| **1** | Ontology & Schema Design                      | 🔄 In Progress                | 8-12 hours  |
| **2** | Static Knowledge Base (JSON-LD)               | ⏳ Pending                    | 6-10 hours  |
| **3** | MCP Integration                               | ⚡ Accelerated (with Phase 0) | 10-20 hours |
| **4** | API Layer (Optional)                          | ⏳ Pending                    | 10-15 hours |
| **5** | Graph Database (Advanced)                     | ⏳ Future                     | 15-25 hours |

---

## 1. The Vision: What Are We Building?

### 1.1 The Problem Space

You have fragmented knowledge across:

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CURRENT STATE: FRAGMENTATION                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  PROJECT 1: web-foundations                                          │
│  ├── _data/ttod.yml (176 quotes, 16 sections, rich taxonomy)        │
│  ├── _data/lessons.yml (70+ lessons, minimal metadata)              │
│  └── Markdown lessons (inconsistent front matter)                    │
│                                                                      │
│  PROJECT 2: advertising-video_editing                                │
│  └── Separate lesson structure, no shared taxonomy                   │
│                                                                      │
│  PROJECT 3: professor-course-template                                │
│  └── Generic structure, needs semantic enhancement                   │
│                                                                      │
│  PROJECT 4: oraculum                                                 │
│  └── Sutras, teachings, different ontology                           │
│                                                                      │
│  PROJECT 5+: Future courses, articles, research                      │
│  └── Currently: Start from scratch each time                         │
│                                                                      │
│  PROBLEM: No shared vocabulary, no cross-referencing,                │
│           no unified search, no AI-queryable knowledge base          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 The Target State

```
┌─────────────────────────────────────────────────────────────────────┐
│                 TARGET STATE: SEMANTIC KNOWLEDGE HUB                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                    ┌─────────────────────────┐                       │
│                    │  SEMANTIC KNOWLEDGE HUB  │                       │
│                    │  (Central Repository)    │                       │
│                    │                          │                       │
│                    │  • Ontology/Schema       │                       │
│                    │  • Thesaurus             │                       │
│                    │  • Lexicon               │                       │
│                    │  • Taxonomy              │                       │
│                    │  • Wisdom Database       │                       │
│                    └───────────┬─────────────┘                       │
│                                │                                     │
│            ┌───────────────────┼───────────────────┐                 │
│            │                   │                   │                 │
│            ▼                   ▼                   ▼                 │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐           │
│   │ Static JSON │     │   API       │     │ MCP Server  │           │
│   │ (Jekyll/    │     │ (Optional   │     │ (AI Tool    │           │
│   │  Astro)     │     │  Backend)   │     │  Access)    │           │
│   └──────┬──────┘     └──────┬──────┘     └──────┬──────┘           │
│          │                   │                   │                   │
│          ▼                   ▼                   ▼                   │
│   ┌─────────────────────────────────────────────────────┐           │
│   │              CONSUMER PROJECTS                       │           │
│   │                                                      │           │
│   │  • web-foundations (lessons, TTOD)                   │           │
│   │  • advertising-video_editing                         │           │
│   │  • professor-course-template                         │           │
│   │  • oraculum                                          │           │
│   │  • Future courses                                    │           │
│   │  • Articles & publications                           │           │
│   │  • AI development assistants                         │           │
│   │                                                      │           │
│   └─────────────────────────────────────────────────────┘           │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.3 Semantic Discussion: What Are We Building?

Let us define our terms precisely:

| Term                | Definition                                                     | Our Implementation                                                                          |
| ------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Ontology**        | Formal specification of concepts and relationships in a domain | Schema defining entities (Concept, Lesson, Quote, Tag) and their relations                  |
| **Thesaurus**       | Controlled vocabulary with synonyms, broader/narrower terms    | Mapping between related concepts (e.g., "responsive" ↔ "mobile-first" ↔ "fluid design")     |
| **Lexicon**         | Complete vocabulary of a domain                                | All terms used across your teaching materials                                               |
| **Taxonomy**        | Hierarchical classification system                             | Categories → Subcategories → Topics (e.g., CSS → Layout → Grid → Subgrid)                   |
| **Knowledge Graph** | Network of entities connected by typed relationships           | TTOD quotes linked to lessons, lessons linked to concepts, concepts linked to prerequisites |
| **Syllabus**        | Structured learning path                                       | Ordered sequence through the taxonomy with prerequisites                                    |

**The Unified Vision:**

> A **Semantic Knowledge Hub** is a central repository containing an **ontology** that defines your **lexicon**, organized into a **taxonomy**, enriched with a **thesaurus** for discovery, manifested as a **knowledge graph** for navigation, and sequenced as **syllabi** for learning paths.

---

## 2. Domain Analysis: Your Knowledge Domains

Based on your work, here is the proposed multi-domain ontology:

### 2.1 Primary Domains

```yaml
domains:
 - id: web-ecosystem
   label: 'Web Ecosystem'
   color: '#3b82f6' # blue
   subdomains:
    - html-semantics
    - css-styling
    - javascript-programming
    - web-apis
    - web-performance
    - web-accessibility

 - id: digital-media
   label: 'Digital Media'
   color: '#8b5cf6' # violet
   subdomains:
    - video-production
    - image-optimization
    - audio-design
    - animation-motion
    - typography-design

 - id: development
   label: 'Software Development'
   color: '#10b981' # emerald
   subdomains:
    - code-craft
    - debugging
    - testing
    - documentation
    - version-control

 - id: devops
   label: 'DevOps & Operations'
   color: '#f59e0b' # amber
   subdomains:
    - ci-cd
    - containerization
    - deployment
    - monitoring
    - reliability

 - id: system-architecture
   label: 'System Architecture'
   color: '#0d9488' # teal
   subdomains:
    - modularization
    - boundaries
    - composition
    - dependencies
    - patterns

 - id: design
   label: 'Design'
   color: '#ec4899' # pink
   subdomains:
    - ux-design
    - ui-design
    - design-systems
    - visual-identity
    - interaction-design

 - id: creative-technology
   label: 'Creative Technology'
   color: '#f43f5e' # rose
   subdomains:
    - generative-art
    - interactive-installations
    - data-visualization
    - creative-coding
    - immersive-media

 - id: cybernetic-theory
   label: 'Cybernetic Theory'
   color: '#6366f1' # indigo
   subdomains:
    - systems-thinking
    - feedback-loops
    - emergence
    - information-theory
    - human-machine-interaction

 - id: pedagogy
   label: 'Pedagogy & Teaching'
   color: '#84cc16' # lime
   subdomains:
    - learning-design
    - assessment
    - scaffolding
    - reflection
    - mentorship
```

### 2.2 Cross-Domain Relationships

```
┌─────────────────────────────────────────────────────────────────────┐
│                   CROSS-DOMAIN RELATIONSHIP MAP                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────────────┐          ┌──────────────────┐                │
│   │  Web Ecosystem   │◄────────►│  Digital Media   │                │
│   └────────┬─────────┘          └────────┬─────────┘                │
│            │                             │                          │
│            │ informs                     │ requires                 │
│            ▼                             ▼                          │
│   ┌──────────────────┐          ┌──────────────────┐                │
│   │   Development    │◄────────►│ System Arch.     │                │
│   └────────┬─────────┘          └────────┬─────────┘                │
│            │                             │                          │
│            │ deploys via                 │ patterns from            │
│            ▼                             ▼                          │
│   ┌──────────────────┐          ┌──────────────────┐                │
│   │     DevOps       │          │ Cybernetic Theory │               │
│   └────────┬─────────┘          └────────┬─────────┘                │
│            │                             │                          │
│            └─────────────┬───────────────┘                          │
│                          │                                          │
│                          ▼                                          │
│              ┌──────────────────────┐                               │
│              │      Pedagogy         │                               │
│              │  (Meta-domain:        │                               │
│              │   how to teach all)   │                               │
│              └──────────────────────┘                               │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Architecture Options: Do You Need a Backend?

### 3.1 Decision Matrix

| Requirement                    | Static JSON         | Serverless API      | Full Backend        | Graph DB            |
| ------------------------------ | ------------------- | ------------------- | ------------------- | ------------------- |
| **Cross-project sharing**      | ✅ Git submodule    | ✅ API calls        | ✅ API calls        | ✅ API calls        |
| **Jekyll/Astro compatibility** | ✅ Native           | ⚠️ Build-time fetch | ⚠️ Build-time fetch | ⚠️ Build-time fetch |
| **Real-time updates**          | ❌ Rebuild needed   | ✅ Yes              | ✅ Yes              | ✅ Yes              |
| **Complex queries**            | ❌ Client-side only | ⚠️ Limited          | ✅ Yes              | ✅ Excellent        |
| **Graph traversal**            | ❌ Manual           | ❌ Manual           | ⚠️ Possible         | ✅ Native           |
| **MCP integration**            | ✅ File access      | ✅ API tools        | ✅ API tools        | ✅ API tools        |
| **Hosting cost**               | Free (GitHub)       | Low (Cloudflare)    | Medium              | Higher              |
| **Complexity**                 | Low                 | Medium              | High                | High                |
| **Time to MVP**                | 4-8 hours           | 8-15 hours          | 20-40 hours         | 30-50 hours         |

### 3.2 Recommended Path: Progressive Enhancement

> [!IMPORTANT] > **Updated (January 2026)**: Phase 0 (Studio Infrastructure) should be completed FIRST. This enables MCP integration from the start and makes the Semantic Knowledge Hub immediately useful to all projects.

```
┌─────────────────────────────────────────────────────────────────────┐
│              PROGRESSIVE ARCHITECTURE PATH                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  PHASE 0: STUDIO INFRASTRUCTURE (PREREQUISITE) ⚠️                    │
│  ──────────────────────────────────────────────                      │
│  • Set up lilith (MCP servers, ChromaDB, Ollama)                      │
│  • Set up beelzebub (PostgreSQL, Redis)                              │
│  • Configure Traefik for routing                                    │
│  • Create MCP servers (knowledge, vectors, filesystem)               │
│  • 8-12 hours to implement                                           │
│  • Reference: [Craftsperson's Path](../../../fullstack/craftsperson-path.md) │
│                                                                      │
│  PHASE 1: STATIC KNOWLEDGE BASE (MVP)                                │
│  ────────────────────────────────────                                │
│  • schema.json — Ontology definition                                 │
│  • concepts.json — All concepts with relationships                   │
│  • thesaurus.json — Synonym mappings                                 │
│  • taxonomy.json — Hierarchical categories                           │
│  • Served as git submodule or npm package                            │
│  • 8-12 hours to implement                                           │
│                                                                      │
│  PHASE 2: BUILD-TIME ENRICHMENT                                      │
│  ──────────────────────────────                                      │
│  • Node.js scripts to enrich lesson front matter                     │
│  • Auto-sync lessons.yml from lesson files                           │
│  • Cross-reference validation                                        │
│  • 6-10 hours additional                                             │
│                                                                      │
│  PHASE 3: MCP INTEGRATION (ACCELERATED WITH PHASE 0) ⚡              │
│  ────────────────────────────────────────────────                   │
│  • MCP server exposing knowledge base                                │
│  • Ingest knowledge into ChromaDB (from Phase 0)                    │
│  • AI-assisted development queries                                   │
│  • Wisdom injection into prompts                                     │
│  • 10-20 hours (reduced if infrastructure exists)                   │
│                                                                      │
│  PHASE 4: OPTIONAL API LAYER                                         │
│  ───────────────────────────                                         │
│  • Cloudflare Workers or Vercel Edge Functions                       │
│  • /api/concepts, /api/search, /api/related                          │
│  • Only if real-time updates needed                                  │
│  • 10-15 hours additional                                            │
│                                                                      │
│  PHASE 5: GRAPH DATABASE (ADVANCED)                                  │
│  ─────────────────────────────────                                   │
│  • Neo4j Aura (free tier) or EdgeDB                                  │
│  • Complex relationship queries                                       │
│  • Learning path generation                                          │
│  • 15-25 hours additional                                            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.3 Do You Need a Graph Database?

**Not initially.** Here's why:

| When Graph DB is OVERKILL   | When Graph DB is JUSTIFIED                         |
| --------------------------- | -------------------------------------------------- |
| < 1000 concepts             | > 5000 concepts with complex relationships         |
| Relationships are 1-2 hops  | Multi-hop traversal needed (A→B→C→D)               |
| Batch processing acceptable | Real-time complex queries required                 |
| Single consumer             | Multiple concurrent consumers with different needs |
| Learning/teaching focus     | Production system with SLAs                        |

**Your current state:** ~200 TTOD quotes, ~70 lessons, ~9 domains = ~400 entities. This is easily handled by JSON with client-side processing or build-time scripts.

**When to upgrade:** When you find yourself writing complex nested loops to traverse relationships, or when build times become unacceptable.

---

## 4. Phase 1: Detailed Implementation Plan

### 4.1 Repository Structure

**Option A: Dedicated Repository (Recommended)**

```
semantic-knowledge-hub/
├── schema/
│   ├── ontology.schema.json    # JSON Schema for validation
│   └── types.d.ts              # TypeScript types
├── data/
│   ├── concepts.json           # All concepts
│   ├── domains.json            # Domain hierarchy
│   ├── thesaurus.json          # Synonym mappings
│   ├── wisdom/
│   │   └── ttod.json           # Exported from ttod.yml
│   └── syllabi/
│       ├── web-foundations.json
│       └── video-editing.json
├── scripts/
│   ├── validate.js             # Schema validation
│   ├── export-ttod.js          # Convert ttod.yml → JSON
│   ├── sync-lessons.js         # Enrich lesson metadata
│   └── generate-graph.js       # Create visualization data
├── dist/
│   ├── bundle.json             # Combined export
│   └── graph.json              # D3/Three.js compatible
├── package.json
└── README.md
```

**Option B: Submodule in web-atelier-udit**

```
web-atelier-udit/
├── semantic-hub/               # Git submodule
│   └── (same structure as above)
├── web-foundations/
│   └── docs/_data/
│       └── semantic-hub → ../../semantic-hub/dist/
└── other-project/
    └── _data/semantic-hub → ../semantic-hub/dist/
```

### 4.2 Schema Design

**Core Entities:**

```typescript
// types.d.ts

interface Concept {
	id: string; // e.g., "css-grid"
	label: string; // e.g., "CSS Grid Layout"
	labelAlt?: Record<string, string>; // { es: "Diseño CSS Grid" }
	domain: string; // e.g., "web-ecosystem"
	subdomain: string; // e.g., "css-styling"
	definition: string;
	keywords: string[];
	synonyms: string[]; // Thesaurus links
	broader?: string; // Parent concept
	narrower?: string[]; // Child concepts
	related?: string[]; // Related concepts
	prerequisites?: string[]; // Learning dependencies
	teaches?: string[]; // What understanding this enables
	externalLinks?: ExternalLink[];
}

interface Domain {
	id: string;
	label: string;
	color: string;
	description: string;
	subdomains: Subdomain[];
}

interface Subdomain {
	id: string;
	label: string;
	concepts: string[]; // Concept IDs
}

interface Wisdom {
	id: string; // e.g., "img-001"
	text: string;
	domain: string;
	subdomain?: string;
	level: 'beginner' | 'intermediate' | 'advanced' | 'master';
	concepts: string[]; // Linked concept IDs
	teaches: string;
	related?: string[]; // Other wisdom IDs
}

interface Lesson {
	id: string;
	slug: string;
	title: Record<string, string>;
	domain: string;
	subdomain: string;
	concepts: string[]; // Concept IDs covered
	prerequisites?: string[]; // Lesson IDs or Concept IDs
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	duration: number; // minutes
	wisdom?: string[]; // TTOD quote IDs
}

interface Syllabus {
	id: string;
	title: string;
	description: string;
	domain: string;
	modules: SyllabusModule[];
}

interface SyllabusModule {
	id: string;
	title: string;
	lessons: string[]; // Lesson IDs in order
	concepts: string[]; // Concepts covered
	duration: number;
}
```

### 4.3 Implementation Prompts

#### Prompt 1: Schema Validation Setup

```markdown
## Task: Create Schema Validation Infrastructure

### Context

I'm building a Semantic Knowledge Hub to unify concepts across multiple teaching repositories.

### Requirements

1. Create JSON Schema files in `schema/`:

   - `concept.schema.json` — Validates concept entries
   - `domain.schema.json` — Validates domain hierarchy
   - `wisdom.schema.json` — Validates TTOD quotes
   - `lesson.schema.json` — Validates lesson metadata

2. Create `scripts/validate.js`:

   - Reads all JSON files in `data/`
   - Validates against corresponding schema
   - Reports errors with file path and location
   - Returns exit code 1 if any errors

3. Create TypeScript type definitions in `schema/types.d.ts`:
   - Export all entity types
   - Include JSDoc comments for documentation

### Constraints

- Use Ajv for JSON Schema validation
- Support JSON Schema Draft 2020-12
- Include descriptive error messages

### Output

- Schema files with examples in `$defs`
- Validation script with CLI interface
- Type definitions
```

#### Prompt 2: TTOD Export Script

```markdown
## Task: Create TTOD Export Script

### Context

I have a rich `ttod.yml` file (2800+ lines) with quotes, metadata, collections, and visualization hints.
I need to export it to JSON format for the Semantic Knowledge Hub.

### Requirements

1. Create `scripts/export-ttod.js`:

   - Read `web-foundations/docs/_data/ttod.yml`
   - Parse and validate structure
   - Export to `data/wisdom/ttod.json`
   - Generate `data/wisdom/collections.json` (curated sets)
   - Generate `data/wisdom/graph-nodes.json` (for visualization)

2. Transformations:

   - Map `section` to `domain` using domain mapping
   - Extract unique tags into `data/thesaurus-seed.json`
   - Generate concept stubs from subsections
   - Preserve related links as graph edges

3. Generate statistics:
   - Count by domain/subdomain
   - Count by level
   - Connectivity metrics

### Input

- `ttod.yml` location: `web-foundations/docs/_data/ttod.yml`

### Output

- `data/wisdom/ttod.json` — Flat array of wisdom entries
- `data/wisdom/collections.json` — Named collections
- `data/thesaurus-seed.json` — Initial thesaurus from tags
- `data/graph/edges-wisdom.json` — Related links as edges
```

#### Prompt 3: Lesson Metadata Enhancement

```markdown
## Task: Create Lesson Metadata Sync Script

### Context

I have 70+ lessons in `web-foundations/docs/lessons/{en,es}/` with basic front matter.
I need to enhance them with semantic metadata from the Knowledge Hub.

### Requirements

1. Create `scripts/sync-lessons.js`:

   - Scan all lesson Markdown files
   - Extract current front matter
   - Suggest enhancements based on content analysis:
     - `domain` — Infer from path/content
     - `subdomain` — More specific categorization
     - `concepts` — List of concept IDs covered
     - `difficulty` — beginner/intermediate/advanced
     - `duration` — Estimate from word count
     - `prerequisites` — Suggest based on concept graph

2. Output modes:

   - `--report` — Generate enhancement suggestions
   - `--apply` — Update front matter in place
   - `--sync-yaml` — Update `_data/lessons.yml`

3. Validation:
   - Ensure all referenced concepts exist
   - Warn on orphan lessons (no concept links)
   - Warn on missing prerequisites

### Output

- Updated lesson front matter (with --apply)
- Updated lessons.yml (with --sync-yaml)
- Report of suggestions and warnings
```

#### Prompt 4: Thesaurus Builder

````markdown
## Task: Create Thesaurus Management Script

### Context

I need a thesaurus to map synonyms, related terms, and hierarchical relationships
across my knowledge domains.

### Requirements

1. Create `data/thesaurus.json` structure:

```json
{
	"terms": {
		"responsive-design": {
			"preferred": "responsive-design",
			"synonyms": ["responsive", "rwd", "mobile-first"],
			"broader": "css-layout",
			"narrower": ["media-queries", "fluid-typography"],
			"related": ["intrinsic-design", "container-queries"],
			"domains": ["web-ecosystem"]
		}
	}
}
```
````

2. Create `scripts/thesaurus.js`:

   - `--seed` — Generate initial thesaurus from TTOD tags
   - `--validate` — Check for orphan terms
   - `--suggest` — AI-assisted synonym suggestions
   - `--export` — Generate lookup table for search

3. Integration:
   - Used by lesson sync to suggest concepts
   - Used by search to expand queries
   - Used by AI prompts for context

### Output

- `data/thesaurus.json` — Master thesaurus
- `dist/thesaurus-lookup.json` — Flattened for search

````

#### Prompt 5: Knowledge Graph Visualization

```markdown
## Task: Create Knowledge Graph Export for 3D Visualization

### Context

I want to visualize the semantic relationships between concepts, lessons, and wisdom
using 3d-force-graph (Three.js).

### Requirements

1. Create `scripts/generate-graph.js`:

   - Read all entities (concepts, wisdom, lessons)
   - Generate nodes with:
     - `id`, `label`, `type` (concept/wisdom/lesson)
     - `domain`, `subdomain`
     - `level` or `difficulty`
     - `size` (based on connections)
   - Generate edges with:
     - `source`, `target`
     - `type` (broader, narrower, related, teaches, prerequisite)
     - `strength` (for force layout)

2. Output formats:

   - `dist/graph.json` — 3d-force-graph compatible
   - `dist/graph.gexf` — Gephi export
   - `dist/graph-stats.json` — Metrics (centrality, clusters)

3. Visualization hints:
   - Color by domain
   - Size by degree centrality
   - Z-axis by level/difficulty
   - Cluster by subdomain

### Output

- Graph data files for visualization
- HTML viewer page (optional)
````

---

## 5. Integration with AI-Assisted Development

### 5.1 MCP Server Vision

```
┌─────────────────────────────────────────────────────────────────────┐
│                   MCP SEMANTIC KNOWLEDGE SERVER                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  RESOURCES (Read Operations)                                         │
│  ─────────────────────────                                           │
│  • semantic://concepts/{id}      → Concept details                   │
│  • semantic://domains/{id}       → Domain with concepts              │
│  • semantic://wisdom/{id}        → TTOD quote                        │
│  • semantic://lessons/{slug}     → Lesson metadata                   │
│  • semantic://thesaurus/{term}   → Synonym mappings                  │
│                                                                      │
│  TOOLS (Query Operations)                                            │
│  ────────────────────────                                            │
│  • search_concepts(query)        → Semantic search                   │
│  • get_related(id, depth)        → Graph traversal                   │
│  • get_prerequisites(lesson)     → Dependency chain                  │
│  • suggest_wisdom(context)       → Relevant TTOD quotes              │
│  • validate_lesson(content)      → Check coverage                    │
│                                                                      │
│  PROMPTS (Templates)                                                 │
│  ──────────────────                                                  │
│  • explain_concept               → Generate explanation              │
│  • create_lesson                 → Scaffold new lesson               │
│  • review_content                → Check against standards           │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 AI Development Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│              AI-ASSISTED CONTENT CREATION WORKFLOW                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. CONTEXT INJECTION                                                │
│     ┌─────────────────────────────────────────────────────────┐     │
│     │  User: "Create a lesson on CSS Container Queries"       │     │
│     │                                                          │     │
│     │  AI (via MCP):                                           │     │
│     │  → search_concepts("container queries")                  │     │
│     │  → get_related("container-queries", 2)                   │     │
│     │  → suggest_wisdom("container queries css")               │     │
│     │  → get_prerequisites("intrinsic-web-design")             │     │
│     └─────────────────────────────────────────────────────────┘     │
│                                                                      │
│  2. ENRICHED GENERATION                                              │
│     ┌─────────────────────────────────────────────────────────┐     │
│     │  AI generates lesson with:                               │     │
│     │  • Correct domain/subdomain classification               │     │
│     │  • Accurate prerequisite links                           │     │
│     │  • Relevant TTOD quotes embedded                         │     │
│     │  • Consistent terminology from thesaurus                 │     │
│     │  • Cross-references to related lessons                   │     │
│     └─────────────────────────────────────────────────────────┘     │
│                                                                      │
│  3. VALIDATION                                                       │
│     ┌─────────────────────────────────────────────────────────┐     │
│     │  AI (via MCP):                                           │     │
│     │  → validate_lesson(generated_content)                    │     │
│     │  → Checks: concept coverage, terminology, structure      │     │
│     │  → Returns: suggestions, warnings, improvements          │     │
│     └─────────────────────────────────────────────────────────┘     │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 6. Bidirectional Sync: TTOD ↔ Lessons

### 6.1 The Shared Syllabus Problem

Currently:

- TTOD quotes reference lessons (`lesson: the-tao-of-web-images`)
- Lessons could reference TTOD quotes (but don't consistently)
- No automatic sync

### 6.2 Solution: Single Source of Truth

```
┌─────────────────────────────────────────────────────────────────────┐
│                   BIDIRECTIONAL SYNC ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                    ┌─────────────────────────┐                       │
│                    │   SEMANTIC KNOWLEDGE    │                       │
│                    │        HUB              │                       │
│                    │                          │                       │
│                    │  concepts.json (master)  │                       │
│                    │  thesaurus.json          │                       │
│                    │  syllabus-*.json         │                       │
│                    └───────────┬─────────────┘                       │
│                                │                                     │
│            ┌───────────────────┼───────────────────┐                 │
│            │                   │                   │                 │
│            ▼                   │                   ▼                 │
│   ┌─────────────────┐         │         ┌─────────────────┐         │
│   │    ttod.yml     │◄────────┴────────►│  lessons.yml    │         │
│   │                  │                   │                  │         │
│   │  • References    │   ◄── sync ──►   │  • References    │         │
│   │    concept IDs   │                   │    TTOD quote IDs│         │
│   │  • Uses thesaurus│                   │  • Uses thesaurus│         │
│   │    for tags      │                   │    for categories│         │
│   └─────────────────┘                   └─────────────────┘         │
│                                                                      │
│   SYNC SCRIPT: scripts/bidirectional-sync.js                        │
│                                                                      │
│   • Validates all cross-references                                   │
│   • Updates wisdom→lesson and lesson→wisdom links                   │
│   • Ensures thesaurus consistency                                    │
│   • Generates coverage reports                                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.3 Sync Script Prompt

```markdown
## Task: Create Bidirectional Sync Script

### Context

TTOD quotes and lessons need to reference each other consistently.
The Semantic Knowledge Hub is the source of truth for concepts.

### Requirements

1. Create `scripts/bidirectional-sync.js`:

   - Read `data/wisdom/ttod.json`
   - Read all lesson front matter
   - Validate cross-references:
     - Wisdom `lesson` field matches existing lesson
     - Lesson `wisdom` field matches existing quotes
   - Update missing links:
     - If wisdom mentions a lesson, add wisdom ID to lesson
     - If lesson covers a concept, find related wisdom

2. Validation reports:

   - Orphan wisdom (no lesson link)
   - Orphan lessons (no wisdom link)
   - Broken references
   - Suggested new links

3. Output:
   - Updated files (with --apply)
   - Coverage report (Markdown)
   - Graph of lesson↔wisdom connections

### Constraints

- Never delete existing links
- Always require confirmation for updates
- Generate backup before modifying
```

---

## 7. Timeline & Complexity Assessment

### 7.1 Phase 1 Breakdown

| Task               | Complexity | Est. Hours      | Dependencies  |
| ------------------ | ---------- | --------------- | ------------- |
| Repository setup   | Low        | 1               | None          |
| Schema design      | Medium     | 2-3             | None          |
| Type definitions   | Low        | 1               | Schema        |
| TTOD export script | Medium     | 3-4             | Schema        |
| Thesaurus seed     | Medium     | 2-3             | TTOD export   |
| Validation scripts | Medium     | 2-3             | Schema, types |
| Lesson sync script | High       | 4-6             | Thesaurus     |
| Documentation      | Low        | 2               | All above     |
| **Total Phase 1**  |            | **17-23 hours** |               |

### 7.2 Incremental Value Delivery

```
Week 1: Foundation (8-12 hours)
├── Day 1: Repo setup, schema design, type definitions
├── Day 2: TTOD export script, initial thesaurus
└── Day 3: Validation infrastructure, documentation

Week 2: Integration (8-12 hours)
├── Day 4: Lesson sync script (read-only mode)
├── Day 5: Bidirectional sync, coverage reports
└── Day 6: Graph export, visualization

Week 3+: Enhancement (ongoing)
├── API layer (if needed)
├── MCP server
└── Graph database (if justified)
```

---

## 8. Success Criteria

### Phase 1 Complete When:

- [ ] Schema validates all entities
- [ ] TTOD exported to JSON with concept links
- [ ] Thesaurus seeds from existing tags
- [ ] Lesson metadata enhanced (at least 50%)
- [ ] Bidirectional references validated
- [ ] Graph visualization working
- [ ] Documentation complete

### Overall Success Metrics:

- [ ] New lesson creation time reduced by 30%
- [ ] Cross-referencing accuracy > 90%
- [ ] Terminology consistency across projects
- [ ] AI-assisted content creation uses knowledge base
- [ ] Search finds relevant content across domains

---

## 9. Related Resources

| Resource                                                                              | Description      |
| ------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------ |
| [Architecture Refactor Analysis]({{ '/methodology/en/architecture-refactor-analysis/' | relative_url }}) | Current state and filtering implementation |
| [AI Practical Guide]({{ '/methodology/en/ai-practical-guide/'                         | relative_url }}) | Docs-first methodology for implementation  |
| [The Tao of AI Development]({{ '/methodology/en/tao-of-ai-development/'               | relative_url }}) | Philosophical guidance on AI-assisted work |
| [TTOD.yml]({{ '/methodology/en/ttod/'                                                 | relative_url }}) | Source wisdom database                     |

---

> _"The lexicon that unifies all domains is not found—it is cultivated. Begin with what you know, and the taxonomy will reveal itself."_

---

**Authorship:** Rubén Vega Balbás, PhD (UDIT) · ORCID: [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)
**License:** Content CC BY-NC-SA 4.0

_Critical Coding for a Better Living._
