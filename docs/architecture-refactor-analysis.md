---
layout: methodology
title: 'Lessons Architecture & Semantic Refactor Analysis'
title_alt: 'Análisis de Arquitectura de Lecciones y Refactorización Semántica'
slug: architecture-refactor-analysis
date: 2026-01-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /methodology/en/architecture-refactor-analysis/
description: 'Comprehensive analysis of architectural approaches for lesson semantics, filtering, and search in the Web Atelier. Jekyll optimization vs. migration alternatives.'
tags: [architecture, refactor, jekyll, astro, lessons, semantics, search]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"The Tao of Architecture: Choose the path that serves the vision with least resistance—but know all paths before choosing."_

---

## 📊 Implementation Status

**Last Updated:** January 2026

| Phase       | Task                  | Status             | Date     |
| ----------- | --------------------- | ------------------ | -------- |
| **Phase 2** | Client-Side Filtering | ✅ **Completed**   | Jan 2026 |
| **Phase 1** | Metadata Enhancement  | 🔄 **In Progress** | Jan 2026 |
| **Phase 3** | UI Redesign           | ⏳ Pending         | —        |

### 🆕 Phase 1 Deep Dive: Semantic Knowledge Hub

**A comprehensive plan for Phase 1 has been created:** [Semantic Knowledge Hub Implementation Plan]({{ '/methodology/en/semantic-knowledge-hub/' | relative_url }})

This plan addresses the broader vision of:

- Unified ontology across 9 knowledge domains
- Thesaurus and taxonomy for semantic discovery
- TTOD ↔ Lessons bidirectional sync
- MCP integration for AI-assisted development
- Future graph database considerations

### ✅ What's Been Implemented

- **Search functionality** — Debounced search (300ms) filtering by title and slug
- **Category filtering** — 6 category buttons (CSS, JS, Tailwind, Bootstrap, Animations, Media)
- **Alpine.js integration** — Custom `lessonBrowser()` component with reactive filtering
- **Result counting** — Dynamic "X of Y lessons" display with ARIA live regions
- **Smooth animations** — Card fade in/out transitions on filter changes
- **Responsive design** — Works across mobile, tablet, and desktop
- **Accessibility** — ARIA labels, keyboard navigation, screen reader support

### ⏳ What's Next

- **Metadata enhancement** — Add category, tags, difficulty, duration to lesson front matter
- **YAML sync script** — Auto-generate `lessons.yml` from enhanced front matter
- **Advanced filtering** — Tag cloud, difficulty filter, duration range
- **Fuzzy search** — Integrate Fuse.js for better search results

---

## 1. Current State Analysis

**Last Updated:** January 2026
**Status:** Phase 2 (Client-Side Filtering) ✅ Completed

### 1.1 The Problem: `lessons.yml` Is Too Wide

The current `_data/lessons.yml` contains 70+ lesson entries with minimal metadata:

```yaml
- slug: responsive
  title:
   es: 'Diseño Web: Responsive, Fluido e Intrínseco'
   en: 'Web Design: Responsive, Fluid and Intrinsic'
  path:
   es: /lessons/es/responsive/
   en: /lessons/en/responsive/
  file:
   es: lessons/es/responsive/index.md
   en: lessons/en/responsive/index.md
  status:
   es: complete
   en: complete
  # Missing: category, tags, difficulty, duration, prerequisites
```

**Current Limitations:**

| Issue                  | Impact                                          | Status                      |
| ---------------------- | ----------------------------------------------- | --------------------------- |
| No category filtering  | Users can't browse by topic (CSS, JS, UX, etc.) | ✅ **FIXED** (slug-based)   |
| No tags/keywords       | No semantic discovery                           | ⏳ Pending metadata         |
| No difficulty levels   | Beginners see advanced content indiscriminately | ⏳ Pending metadata         |
| No duration estimates  | Can't plan study sessions                       | ⏳ Pending metadata         |
| No prerequisite chains | Non-linear navigation                           | ⏳ Pending metadata         |
| No semantic search     | Only title-based browsing                       | ✅ **FIXED** (basic search) |
| Flat list structure    | 70+ cards overwhelm the UI                      | ✅ **FIXED** (filtering)    |

### 1.2 Current Architecture Stack

```
┌─────────────────────────────────────────────────────────────┐
│                     CURRENT STACK                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Jekyll 4.x ─────► Liquid Templates ─────► Static HTML      │
│       │                   │                                  │
│       │                   ├── _layouts/ (lesson.html)        │
│       │                   ├── _includes/ (components)        │
│       │                   └── _data/lessons.yml              │
│       │                                                      │
│  Tailwind CSS ───► @tailwindcss/typography ───► site.css    │
│       │                                                      │
│  GitHub Actions ─► Build Jekyll ─► Deploy to Pages           │
│                                                              │
│  Lesson Files ───► Markdown + YAML Front Matter             │
│       │                                                      │
│       └── title, slug, date, author, lang, permalink         │
│           (NO: category, tags, difficulty, duration)         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 Lesson Front Matter Audit

Current lesson front matter (e.g., `responsive/index.md`):

```yaml
---
layout: lesson
title: 'Web Design: Responsive, Fluid and Intrinsic'
title_alt: ''
slug: responsive
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/responsive/
---
```

**What's Missing for Semantic Discovery:**

```yaml
---
# Current fields...
# NEW fields needed:
category: css-layout # Primary category
tags: [responsive, media-queries, fluid-design, intrinsic, container-queries]
difficulty: intermediate # beginner | intermediate | advanced
duration: 45 # minutes
prerequisites: [html-css-basics, first-steps]
audience: [web-designers, frontend-developers]
keywords: [RWD, mobile-first, breakpoints, clamp, viewport]
learning_objectives:
 - Understand responsive vs. fluid vs. intrinsic design
 - Apply media queries and container queries
 - Use clamp() for fluid typography
---
```

---

## 2. Architectural Options Analysis

### Option A: Jekyll Optimization (Recommended First Step) ✅ **IN PROGRESS**

**Strategy:** Keep Jekyll, enhance metadata, add client-side filtering.

**Progress:**

- ✅ Phase 2: Client-side filtering implemented (January 2026)
- ⏳ Phase 1: Metadata enhancement (pending)
- ⏳ Phase 3: UI redesign (pending)

```
┌─────────────────────────────────────────────────────────────┐
│              OPTION A: JEKYLL OPTIMIZATION                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. ENHANCE FRONT MATTER                                     │
│     └── Add category, tags, difficulty, duration             │
│     └── Script: extract-lesson-metadata.js                   │
│                                                              │
│  2. REBUILD lessons.yml FROM FRONT MATTER                    │
│     └── Script: sync-lessons-yaml.js                         │
│     └── Auto-sync on build (package.json prebuild)           │
│                                                              │
│  3. CLIENT-SIDE FILTERING                                    │
│     └── Alpine.js or vanilla JS                              │
│     └── Category buttons, tag chips, difficulty slider       │
│     └── Local search (Fuse.js or lunr.js)                    │
│                                                              │
│  4. UI REDESIGN                                              │
│     └── Sidebar filters + main grid                          │
│     └── Card badges: difficulty, duration, category          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

| Metric          | Value       |
| --------------- | ----------- |
| **Time**        | 8-12 hours  |
| **Complexity**  | Low         |
| **Learning**    | Minimal     |
| **Risk**        | Very Low    |
| **Maintenance** | Same as now |
| **Performance** | Good        |
| **SEO**         | Unchanged   |
| **Effort/ROI**  | ⭐⭐⭐⭐⭐  |

### Option B: Astro Migration

**Strategy:** Full migration to Astro with content collections.

```
┌─────────────────────────────────────────────────────────────┐
│              OPTION B: ASTRO MIGRATION                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Astro 4.x ─────► Content Collections ─────► Static HTML    │
│       │                   │                                  │
│       │                   ├── src/content/lessons/           │
│       │                   ├── src/layouts/LessonLayout.astro │
│       │                   └── Type-safe front matter         │
│       │                                                      │
│  Benefits:                                                   │
│       ├── Built-in content collections with Zod validation   │
│       ├── Type-safe front matter schemas                     │
│       ├── 10x faster builds                                  │
│       ├── Islands architecture (interactive filters)         │
│       └── Modern DX (Vite, hot reload)                       │
│                                                              │
│  Costs:                                                      │
│       ├── Learning curve (new framework)                     │
│       ├── Migration effort (70+ lessons)                     │
│       ├── Rewrite layouts and includes                       │
│       └── Update CI/CD workflows                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

| Metric          | Value                                   |
| --------------- | --------------------------------------- |
| **Time**        | 20-30 hours                             |
| **Complexity**  | Medium-High                             |
| **Learning**    | Significant (Astro, content API)        |
| **Risk**        | Medium (migration bugs)                 |
| **Maintenance** | Better long-term                        |
| **Performance** | Excellent                               |
| **SEO**         | Same or better                          |
| **Effort/ROI**  | ⭐⭐⭐ (high effort, high future value) |

### Option C: 11ty (Eleventy) Migration

**Strategy:** Migrate to 11ty, similar to Jekyll but with Node.js.

```
┌─────────────────────────────────────────────────────────────┐
│              OPTION C: 11TY MIGRATION                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Benefits:                                                   │
│       ├── Node.js ecosystem (no Ruby)                        │
│       ├── Flexible data cascade                              │
│       ├── Familiar template syntax (Nunjucks/Liquid)         │
│       ├── Fast builds                                        │
│       └── Strong community                                   │
│                                                              │
│  Costs:                                                      │
│       ├── Migration effort (layouts, includes)               │
│       ├── Less modern than Astro                             │
│       └── No built-in content collections                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

| Metric          | Value           |
| --------------- | --------------- |
| **Time**        | 15-20 hours     |
| **Complexity**  | Medium          |
| **Learning**    | Moderate        |
| **Risk**        | Medium          |
| **Maintenance** | Good            |
| **Performance** | Excellent       |
| **Effort/ROI**  | ⭐⭐⭐ (medium) |

### Option D: Hugo Migration

**Strategy:** Migrate to Hugo (Go-based, fastest builds).

| Metric          | Value                          |
| --------------- | ------------------------------ |
| **Time**        | 25-35 hours                    |
| **Complexity**  | High (Go templates unfamiliar) |
| **Learning**    | Significant                    |
| **Risk**        | High                           |
| **Maintenance** | Good                           |
| **Performance** | Best-in-class                  |
| **Effort/ROI**  | ⭐⭐ (steep learning curve)    |

### Option E: Hybrid (Jekyll + SvelteKit Islands)

**Strategy:** Keep Jekyll, add SvelteKit components for interactive filtering.

| Metric          | Value                              |
| --------------- | ---------------------------------- |
| **Time**        | 12-18 hours                        |
| **Complexity**  | Medium                             |
| **Learning**    | Moderate (SvelteKit)               |
| **Risk**        | Low                                |
| **Maintenance** | Mixed (two systems)                |
| **Performance** | Good                               |
| **Effort/ROI**  | ⭐⭐⭐⭐ (pragmatic, future-proof) |

---

## 3. ROI Analysis: Units of Effort

### Effort Calculation Matrix

| Option                 | Hours | Complexity | Learning | Risk   | Long-term Value | **ROI Score** |
| ---------------------- | ----- | ---------- | -------- | ------ | --------------- | ------------- |
| **A: Jekyll Optimize** | 10    | Low        | Minimal  | Low    | Good            | **9.2/10**    |
| **B: Astro Migration** | 25    | High       | High     | Medium | Excellent       | 7.5/10        |
| **C: 11ty Migration**  | 18    | Medium     | Moderate | Medium | Good            | 6.8/10        |
| **D: Hugo Migration**  | 30    | High       | High     | High   | Good            | 5.5/10        |
| **E: Jekyll + Svelte** | 15    | Medium     | Moderate | Low    | Excellent       | **8.0/10**    |

**ROI Formula:**

```
ROI = (Long-term Value × 3 + Performance × 2 - Learning Curve - Risk × 2) / Hours
```

### Recommendation Ranking

1. **Option A: Jekyll Optimization** — Best ROI, lowest risk, immediate results
2. **Option E: Jekyll + Svelte** — Future-proof hybrid, good ROI
3. **Option B: Astro Migration** — Best long-term, but high investment
4. **Option C: 11ty** — Viable alternative if leaving Ruby
5. **Option D: Hugo** — Only if build speed is critical

---

## 4. Implementation Plans

### 4.1 Plan A: Jekyll Optimization (Recommended)

#### Phase 1: Metadata Enhancement (4 hours)

**Prompt for AI-Assisted Implementation:**

```markdown
## Task: Enhance Lesson Front Matter with Semantic Metadata

### Context

I have 70+ lesson files in web-foundations/docs/lessons/{en,es}/.
Each has basic front matter (title, slug, date, author, lang, permalink).

### Requirements

1. Create a schema for enhanced front matter:

   - category: Primary category (css-layout, javascript, ux, accessibility, etc.)
   - tags: Array of keywords
   - difficulty: beginner | intermediate | advanced
   - duration: Estimated reading time in minutes
   - prerequisites: Array of lesson slugs
   - learning_objectives: Array of strings

2. Create a Node.js script (scripts/enhance-lesson-metadata.js) that:

   - Reads each lesson file
   - Analyzes content to suggest category, tags, difficulty
   - Outputs a report of suggested enhancements
   - Optionally updates files in-place (with --apply flag)

3. Create a script (scripts/sync-lessons-yaml.js) that:
   - Reads all lesson front matter
   - Generates \_data/lessons.yml with full metadata
   - Runs as prebuild hook

### Constraints

- Must preserve existing front matter
- Must work with both EN and ES locales
- Use gray-matter for front matter parsing
- Output readable YAML
```

#### Phase 2: Client-Side Filtering (4 hours)

**Status:** ✅ **COMPLETED** (January 2026)

**Implementation Summary:**

- ✅ **Search bar** with debounced input (300ms) — filters by title and slug
- ✅ **Category filter buttons** — CSS, JS, Tailwind, Bootstrap, Animations, Media
- ✅ **Alpine.js integration** — added via CDN, custom `lessonBrowser()` component
- ✅ **Result count** — dynamic updates showing "X of Y lessons"
- ✅ **Smooth animations** — cards fade in/out on filter changes
- ✅ **Accessibility** — ARIA labels, live regions for result announcements
- ✅ **Responsive design** — works on mobile, tablet, desktop

**Current Implementation:**

```javascript
// Alpine.js component in lessons/{en,es}/index.html
function lessonBrowser() {
	return {
		searchQuery: '',
		category: 'all',
		// Category matching via slug-based heuristics
		// Works even without explicit category fields in lessons.yml
	};
}
```

**Category Matching Logic:**

The filtering uses slug-based heuristics to match categories:

- **CSS**: matches `css`, `responsive`, `intrinsic`, `html-css`, `pseudo`, `typography`
- **JS**: matches `js`, `javascript`, `dom`, `modules`
- **Tailwind**: matches `tailwind`
- **Bootstrap**: matches `bootstrap`
- **Animations**: matches `animations`, `gsap`, `web-animations`
- **Media**: matches `media`, `video`, `images`, `tao-of-moving-images`

**Remaining Work (Future Enhancements):**

- ⏳ Tag cloud (requires tags in lessons.yml)
- ⏳ Difficulty filter (requires difficulty field)
- ⏳ Duration filter (requires duration field)
- ⏳ Fuse.js integration for fuzzy search (currently simple string matching)
- ⏳ Sidebar layout for desktop (currently horizontal filter bar)

**Files Modified:**

- `docs/lessons/en/index.html` — full filtering implementation
- `docs/lessons/es/index.html` — full filtering implementation

#### Phase 3: UI Redesign (4 hours)

**Prompt for AI-Assisted Implementation:**

```markdown
## Task: Redesign Lessons Grid with Category Cards

### Context

Current: Flat 4-column grid of all lessons
Goal: Semantic, organized, filterable lesson browser

### Requirements

1. Card redesign:

   - Category badge (color-coded)
   - Difficulty indicator (🟢🟡🔴 or icons)
   - Duration estimate
   - Tag chips (max 3, "+N more" truncation)
   - Completion status (if tracked)

2. Layout:

   - Desktop: Sticky sidebar (filters) + scrollable grid
   - Tablet: Horizontal filter bar + 2-column grid
   - Mobile: Collapsible filters + single column

3. Visual hierarchy:
   - Group by category (optional toggle)
   - Sort options: Alphabetical, Date, Difficulty, Duration
   - "Recommended for you" section (based on beginner lessons)

### Style Guide

- Use existing Tailwind theme
- Glass-morphism cards (current style)
- Smooth hover animations
- Dark mode support
```

### 4.2 Plan B: Astro Migration (Future)

**Prompt for AI-Assisted Implementation:**

```markdown
## Task: Plan Astro Migration for Web Foundations

### Context

Current: Jekyll 4.x with Liquid templates, 70+ lessons
Goal: Astro 4.x with content collections, type-safe front matter

### Phase 1: Project Setup (2 hours)

1. Initialize Astro project in new branch/directory
2. Configure for GitHub Pages (site/base in astro.config.mjs)
3. Install integrations: @astrojs/mdx, @astrojs/tailwind
4. Set up content collection schema in src/content/config.ts

### Phase 2: Layout Migration (4 hours)

1. Convert \_layouts/lesson.html → src/layouts/LessonLayout.astro
2. Convert \_layouts/default.html → src/layouts/BaseLayout.astro
3. Convert \_includes/_ → src/components/_.astro
4. Migrate CSS (Tailwind config, site.css)

### Phase 3: Content Migration (6 hours)

1. Move lessons to src/content/lessons/{en,es}/
2. Update front matter to match Zod schema
3. Convert Liquid includes to Astro components
4. Validate all content with `astro check`

### Phase 4: Filtering Implementation (4 hours)

1. Create FilterableGrid.tsx (React island)
2. Implement search with Pagefind or Fuse.js
3. Build category/tag filtering UI
4. Test on all breakpoints

### Phase 5: CI/CD & Testing (4 hours)

1. Update .github/workflows/pages.yml for Astro
2. Add build validation workflow
3. Performance testing (Lighthouse)
4. Cross-browser testing

### Constraints

- Must maintain URL structure (redirects if needed)
- Must preserve SEO (meta tags, structured data)
- Must deploy to GitHub Pages (static output)
```

---

## 5. Addressing Your Specific Questions

### 5.1 Is the Astro Implementation Guide Overkill?

**File:** `/Users/ruvebal/projects/ruvebal/scholar/udit/advertising-video_editing/docs/astro/astro-implementation-guide.md`

**Assessment:** **Not overkill—it's appropriately comprehensive.**

| Aspect             | Verdict                                                  |
| ------------------ | -------------------------------------------------------- |
| **Scope**          | Complete guide for a full Astro project                  |
| **Detail Level**   | Production-ready, not excessive                          |
| **Reusability**    | Can serve as template for other course sites             |
| **Time Estimate**  | Accurate (4-6 hours)                                     |
| **Recommendation** | **Use it** when you decide to migrate a project to Astro |

**The guide is valuable because:**

- Provides copy-paste components
- Includes GitHub Pages deployment
- Has AI prompts for each phase
- Serves as documentation for future courses

### 5.2 What About the React Scaffold Prompt?

**File:** `/Users/ruvebal/src/oraculum/docs/prompts/phase2_react_scaffold.md`

**Assessment:** **Appropriately scoped for a React Router 7 project.**

| Aspect             | Verdict                                             |
| ------------------ | --------------------------------------------------- |
| **Scope**          | Focused on React Router 7 + Tailwind v4             |
| **Context**        | Specific to Oraculum (SSR, loaders, Zen aesthetics) |
| **Reusability**    | Moderate (React Router 7 specific)                  |
| **Recommendation** | **Keep as is**—serves its purpose for that project  |

### 5.3 Should You Build an MCP for Docker Monorepos?

**The Vision:** An MCP server that scaffolds full-stack projects from templates.

```
┌─────────────────────────────────────────────────────────────┐
│              MCP MONOREPO SCAFFOLDER                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Prompt: "Create a Digital Humanities project with:         │
│           - React frontend                                   │
│           - FastAPI backend                                  │
│           - PostgreSQL + ChromaDB (vectors)                  │
│           - Nginx reverse proxy                              │
│           - Docker Compose orchestration"                    │
│                                                              │
│  MCP Tools:                                                  │
│       ├── scaffold_project(template, config)                 │
│       ├── generate_docker_compose(services)                  │
│       ├── create_frontend(framework, style)                  │
│       ├── create_backend(framework, db)                      │
│       └── setup_ci_cd(platform)                              │
│                                                              │
│  Output: Complete monorepo with:                             │
│       ├── docker-compose.yml                                 │
│       ├── frontend-react/                                    │
│       ├── backend-fastapi/                                   │
│       ├── nginx/                                             │
│       ├── .github/workflows/                                 │
│       └── docs/                                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Assessment:** **Yes, this is valid and valuable**, but with caveats:

| Factor               | Analysis                                  |
| -------------------- | ----------------------------------------- |
| **Time Investment**  | 20-40 hours to build properly             |
| **Reusability**      | High across Digital Humanities projects   |
| **Complexity**       | Medium-High (Docker, multiple frameworks) |
| **When to Build**    | After 3+ projects share similar structure |
| **Current Priority** | **Low**—focus on lessons semantics first  |

**Recommendation:**

- **Now:** Document your patterns manually
- **After 3 projects:** Extract into MCP
- **See:** [The Extension Path]({{ '/methodology/en/learning-path-extension/' | relative_url }})

### 5.4 Can Trinity of Revelation Serve Multiple Projects?

**File:** `/Users/ruvebal/src/oraculum/docs/lessons/the-trinity-of-revelation.md`

**The Pattern:**

```
┌─────────────────────────────────────────────────────────────┐
│              TRINITY ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Dharmakaya (Static/SSR)                                  │
│     └── Pre-rendered content, SEO, instant perception        │
│                                                              │
│  2. Sambhogakaya (Stream/WebSocket)                          │
│     └── Ambient updates, real-time, edge broadcasting        │
│                                                              │
│  3. Nirmanakaya (Search/API)                                 │
│     └── On-demand queries, vector search, targeted answers   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Assessment:** **Yes, this pattern is universal for content-rich applications.**

**Applicable Projects:**

| Project             | Static       | Stream               | Search             |
| ------------------- | ------------ | -------------------- | ------------------ |
| Web Atelier Lessons | Jekyll pages | (not needed)         | Fuse.js/Pagefind   |
| Oraculum            | SSR sutras   | WebSocket broadcasts | ChromaDB vectors   |
| Course Template     | Jekyll pages | (not needed)         | Client-side filter |
| Video Editing       | Astro pages  | (not needed)         | Video metadata     |

**The shared MCP server could expose:**

- `static_render(content)` — SSR/SSG output
- `stream_broadcast(event)` — Real-time updates
- `semantic_search(query)` — Vector/fuzzy search

---

## 6. The TTOD Wisdom on This Decision

From `_data/ttod.yml`, the Tao speaks to this situation:

> _"The wise developer builds what is needed, not what is imagined."_

**Applied to Your Decision:**

| Temptation                        | Wisdom                                             |
| --------------------------------- | -------------------------------------------------- |
| "Migrate everything to Astro"     | Solve the problem first, migrate later             |
| "Build a universal MCP now"       | Wait for patterns to emerge from real projects     |
| "Redesign the entire lessons UI"  | Start with metadata, then filtering, then design   |
| "Make it perfect before shipping" | Ship the filter, iterate based on student feedback |

**The Path:**

1. ⏳ **Enhance metadata** (immediate, high value) — _Next step_
2. ✅ **Add filtering** (immediate, solves the "too wide" problem) — _Completed Jan 2026_
3. ⏳ **Observe usage** (what do students actually filter by?) — _In progress_
4. ⏳ **Refine UI** (based on data, not assumptions) — _Pending_
5. ⏳ **Consider migration** (when Jekyll becomes a bottleneck) — _Future_

---

## 7. Summary: Recommended Path

### Immediate Actions (This Week)

| Action                   | Time    | Priority | Status                                                             |
| ------------------------ | ------- | -------- | ------------------------------------------------------------------ | ---------------- |
| Add category/tags schema | 1 hour  | High     | 🔄 See [Semantic Hub]({{ '/methodology/en/semantic-knowledge-hub/' | relative_url }}) |
| Create metadata script   | 2 hours | High     | 🔄 See [Semantic Hub]({{ '/methodology/en/semantic-knowledge-hub/' | relative_url }}) |
| Sync lessons.yml script  | 1 hour  | High     | 🔄 See [Semantic Hub]({{ '/methodology/en/semantic-knowledge-hub/' | relative_url }}) |
| Basic client-side filter | 3 hours | High     | ✅ **DONE**                                                        |

### Short-Term (This Month)

| Action                    | Time    | Priority |
| ------------------------- | ------- | -------- |
| Full metadata for lessons | 4 hours | Medium   |
| Advanced filtering UI     | 4 hours | Medium   |
| Search implementation     | 2 hours | Medium   |
| Mobile filter UX          | 2 hours | Medium   |

### Medium-Term (This Quarter)

| Action                    | Time    | Priority |
| ------------------------- | ------- | -------- |
| Astro evaluation          | 4 hours | Low      |
| MCP pattern documentation | 2 hours | Low      |
| Professor template update | 4 hours | Medium   |

---

## 🔗 Related Resources

| Resource                                                                         | Description      |
| -------------------------------------------------------------------------------- | ---------------- | --------------------------------------- |
| [**Semantic Knowledge Hub**]({{ '/methodology/en/semantic-knowledge-hub/'        | relative_url }}) | 🆕 Phase 1 detailed implementation plan |
| [AI-Assisted Refactoring Strategy]({{ '/methodology/en/ai-refactoring-strategy/' | relative_url }}) | How to use AI for this refactor         |
| [Learning Path Extension]({{ '/methodology/en/learning-path-extension/'          | relative_url }}) | Your path forward with MCP and tooling  |
| [AI Practical Guide]({{ '/methodology/en/ai-practical-guide/'                    | relative_url }}) | The docs-first methodology              |
| [The Tao of AI Development]({{ '/methodology/en/tao-of-ai-development/'          | relative_url }}) | Philosophical guidance                  |

---

**Authorship:** Rubén Vega Balbás, PhD (UDIT) · ORCID: [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)
**License:** Content CC BY-NC-SA 4.0

_Critical Coding for a Better Living._
