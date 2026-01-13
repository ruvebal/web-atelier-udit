---
layout: methodology
title: 'AI-Assisted Refactoring Strategy'
title_alt: 'Estrategia de Refactorización Asistida por IA'
slug: ai-refactoring-strategy
date: 2026-01-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /methodology/en/ai-refactoring-strategy/
description: 'Strategic framework for using AI assistants to refactor lesson metadata, enhance semantic discovery, and modernize the Web Atelier architecture.'
tags: [ai, refactoring, prompts, automation, methodology]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"The AI is not the architect—you are. The AI is the tool that amplifies your vision, not replaces it."_

---

## 1. AI Refactoring Principles

### 1.1 The Docs-First Imperative

**Before touching code, create a plan.**

Every AI-assisted refactoring session must follow:

```
┌─────────────────────────────────────────────────────────────┐
│              REFACTORING PROTOCOL                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. DOCUMENT THE PROBLEM                                     │
│     └── What is broken or missing?                           │
│     └── What is the user impact?                             │
│     └── What is the developer pain?                          │
│                                                              │
│  2. DOCUMENT THE SOLUTION                                    │
│     └── What will the end state look like?                   │
│     └── What are the success criteria?                       │
│     └── What are the constraints?                            │
│                                                              │
│  3. PLAN THE PHASES                                          │
│     └── Break into atomic, testable steps                    │
│     └── Each phase has a clear deliverable                   │
│     └── Each phase can be rolled back                        │
│                                                              │
│  4. EXECUTE WITH AI                                          │
│     └── One phase at a time                                  │
│     └── Review before applying                               │
│     └── Commit after each phase                              │
│                                                              │
│  5. DOCUMENT THE OUTCOME                                     │
│     └── Implementation report                                │
│     └── Lessons learned                                      │
│     └── Next steps                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 The Refactoring Mindset

| Mindset               | Application                                        |
| --------------------- | -------------------------------------------------- |
| **Incremental**       | Small changes, frequent commits                    |
| **Reversible**        | Every change can be undone                         |
| **Observable**        | Test after each step                               |
| **Documented**        | Comments explain WHY, not just WHAT                |
| **Human-Verified**    | AI proposes, you review and approve                |

### 1.3 When AI Excels at Refactoring

AI is excellent for:

- **Repetitive transformations** (update 70 files with same pattern)
- **Schema migrations** (add fields to front matter)
- **Code generation** (create scripts from specs)
- **Pattern matching** (find all instances of X)
- **Documentation** (generate reports from code)

AI is NOT good for:

- **Architectural decisions** (YOU decide structure)
- **Design taste** (YOU decide UX)
- **Business logic** (YOU understand context)
- **Security review** (YOU verify implications)

---

## 2. The Lessons Metadata Refactor

### 2.1 Phase 1: Define the Schema

**Goal:** Establish the enhanced front matter structure.

**Prompt:**

```markdown
## Task: Define Enhanced Lesson Front Matter Schema

### Context
I'm refactoring web-foundations lesson metadata for semantic discovery.
Current front matter: title, slug, date, author, lang, permalink

### Requirements
Design a YAML schema that includes:

1. **Core Metadata**
   - title, title_alt (for i18n)
   - slug (URL-friendly identifier)
   - date (creation/update date)
   - author (string or array)
   - lang (ISO 639-1 code)
   - permalink (URL path)

2. **Semantic Metadata**
   - category: Single primary category from predefined list
   - tags: Array of keywords (min 3, max 10)
   - difficulty: beginner | intermediate | advanced
   - duration: Integer (minutes)

3. **Relational Metadata**
   - prerequisites: Array of lesson slugs
   - related: Array of lesson slugs
   - sequence: { prev: slug, next: slug }

4. **Educational Metadata**
   - learning_objectives: Array of strings
   - audience: Array from predefined list
   - technologies: Array of tech names

5. **Status Metadata**
   - status: draft | review | published | archived
   - last_reviewed: Date
   - version: SemVer string

### Output
1. YAML schema definition (as TypeScript interface for clarity)
2. Example front matter for "responsive" lesson
3. Validation rules for each field
4. Category and audience taxonomies
```

**Expected Output:**

```typescript
// types/lesson-frontmatter.ts
interface LessonFrontMatter {
  // Core
  layout: 'lesson';
  title: string;
  title_alt?: string;
  slug: string;
  date: string; // ISO 8601
  author: string | string[];
  lang: 'en' | 'es';
  permalink: string;

  // Semantic
  category: Category;
  tags: string[]; // 3-10 items
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes

  // Relational
  prerequisites?: string[]; // slugs
  related?: string[]; // slugs
  sequence?: {
    prev?: string;
    next?: string;
  };

  // Educational
  learning_objectives?: string[];
  audience?: Audience[];
  technologies?: string[];

  // Status
  status?: 'draft' | 'review' | 'published' | 'archived';
  last_reviewed?: string; // ISO 8601
  version?: string; // SemVer
}

type Category =
  | 'html-semantics'
  | 'css-layout'
  | 'css-styling'
  | 'javascript'
  | 'accessibility'
  | 'performance'
  | 'ux-design'
  | 'tooling'
  | 'deployment'
  | 'methodology'
  | 'media';

type Audience =
  | 'web-designers'
  | 'frontend-developers'
  | 'fullstack-developers'
  | 'ux-designers'
  | 'beginners'
  | 'educators';
```

### 2.2 Phase 2: Create Extraction Script

**Goal:** Script that reads lessons and suggests metadata.

**Prompt:**

```markdown
## Task: Create Lesson Metadata Extraction Script

### Context
I have 70+ lesson files in web-foundations/docs/lessons/{en,es}/.
Each has basic front matter. I need a script to analyze content and suggest enhancements.

### Requirements
Create scripts/extract-lesson-metadata.js that:

1. **Reads each lesson file**
   - Use gray-matter for front matter parsing
   - Support .md and .html files
   - Handle both EN and ES locales

2. **Analyzes content to suggest:**
   - category: Based on file path and keywords
   - tags: From headings, code blocks, keywords
   - difficulty: From vocabulary complexity, code complexity
   - duration: From word count (200 wpm average)
   - technologies: From code blocks, mentions

3. **Outputs a report:**
   ```json
   {
     "slug": "responsive",
     "current": { /* existing front matter */ },
     "suggested": { /* AI-suggested additions */ },
     "confidence": { /* 0-1 for each suggestion */ }
   }
   ```

4. **Optionally updates files:**
   - --dry-run (default): Only output report
   - --apply: Update files with suggestions
   - --interactive: Prompt for each file

### Technical Constraints
- Node.js 20+
- Use ES modules (import/export)
- Dependencies: gray-matter, glob, chalk
- Output to stdout (JSON) and optionally to file

### Category Detection Rules
- Path contains "css" → css-layout or css-styling
- Path contains "js" → javascript
- Path contains "a11y" or "accessibility" → accessibility
- Path contains "responsive" or "layout" → css-layout
- Content mentions "ARIA", "screen reader" → accessibility
- etc.

### Output
Complete script with:
- File reading logic
- Content analysis functions
- Report generation
- CLI argument handling
- Error handling and logging
```

### 2.3 Phase 3: Create Sync Script

**Goal:** Script that generates `lessons.yml` from front matter.

**Prompt:**

```markdown
## Task: Create Lessons YAML Sync Script

### Context
After enhancing lesson front matter, I need to regenerate _data/lessons.yml
to include all semantic metadata for use in Liquid templates.

### Requirements
Create scripts/sync-lessons-yaml.js that:

1. **Reads all lesson files**
   - Glob pattern: docs/lessons/**/index.{md,html}
   - Parse front matter with gray-matter

2. **Generates lessons.yml with structure:**
   ```yaml
   - slug: responsive
     title:
       en: "Web Design: Responsive, Fluid and Intrinsic"
       es: "Diseño Web: Responsive, Fluido e Intrínseco"
     path:
       en: /lessons/en/responsive/
       es: /lessons/es/responsive/
     # ... existing fields ...
     category: css-layout
     tags: [responsive, media-queries, container-queries]
     difficulty: intermediate
     duration: 45
     status: published
   ```

3. **Handles locale pairing:**
   - Match EN and ES lessons by slug
   - Merge metadata (prefer EN as primary)
   - Flag missing translations

4. **Validates output:**
   - Check for duplicate slugs
   - Verify all required fields present
   - Report validation errors

5. **Integration:**
   - Add to package.json as `npm run sync-lessons`
   - Run as prebuild hook: `"prebuild": "node scripts/sync-lessons-yaml.js"`

### Output
Complete script with validation and error reporting.
```

### 2.4 Phase 4: Implement Filtering UI

**Goal:** Client-side filtering for the lessons page.

**Prompt:**

```markdown
## Task: Implement Lessons Filter UI with Alpine.js

### Context
File: web-foundations/docs/lessons/en/index.html (and es version)
Data: _data/lessons.yml (with category, tags, difficulty, duration)

### Requirements

1. **Filter Components:**
   - Category buttons (toggle single category)
   - Difficulty tabs (All | Beginner | Intermediate | Advanced)
   - Duration range slider (0-120 minutes)
   - Tag cloud (multi-select)
   - Search input (title + tags)

2. **Implementation:**
   - Alpine.js for reactivity
   - Load lesson data via JSON (Jekyll output)
   - Client-side filtering (no server)
   - URL state (filters in query params)

3. **Layout:**
   - Desktop: Sidebar (filters) + Grid (lessons)
   - Mobile: Collapsible filter accordion + Stack

4. **Animations:**
   - Filter chips animate in/out
   - Cards fade/slide on filter
   - Loading skeleton on initial load

5. **Accessibility:**
   - ARIA live region for result count
   - Keyboard navigation for filters
   - Focus management on filter change
   - Screen reader announcements

### Liquid Integration

```liquid
{% raw %}
<script>
  window.lessonsData = {{ site.data.lessons | jsonify }};
</script>
{% endraw %}
```

### Output
- Updated index.html for both locales
- assets/js/lesson-filter.js (Alpine.js component)
- Styles integrated with existing Tailwind
```

---

## 3. Prompts for Specific Refactoring Tasks

### 3.1 Bulk Front Matter Update

```markdown
## Task: Add Category and Tags to All Lessons

### Files to Update
- web-foundations/docs/lessons/en/*/index.md
- web-foundations/docs/lessons/es/*/index.md

### Category Mapping
Analyze each lesson and assign ONE category:
| Lesson Contains                  | Category         |
|----------------------------------|------------------|
| Responsive, Grid, Flexbox        | css-layout       |
| Animation, Transition            | css-styling      |
| JavaScript, DOM, Modules         | javascript       |
| ARIA, Screen Reader              | accessibility    |
| Typography, Color, Design        | ux-design        |
| Git, CI/CD, Docker               | tooling          |
| Deploy, GitHub Pages             | deployment       |
| Semantic HTML, DOCTYPE           | html-semantics   |

### Tag Suggestions
Generate 3-5 tags per lesson based on:
- Section headings (h2, h3)
- Code block languages
- Links to external resources
- Key terms in bold or code tags

### Output Format
For each lesson, provide:
```yaml
category: css-layout
tags: [responsive-design, media-queries, mobile-first, breakpoints]
difficulty: intermediate
duration: 45
```

### Constraints
- Do NOT change existing front matter fields
- ADD new fields after existing ones
- Preserve file formatting (prettier-ignore sections)
```

### 3.2 Generate Lesson Relationships

```markdown
## Task: Generate Prerequisite and Related Lessons

### Context
I have 70+ lessons that should form a learning path.
Need to establish relationships for navigation and recommendations.

### Input
List of all lessons with categories and tags.

### Requirements

1. **Prerequisites Analysis:**
   - Beginner lessons have no prerequisites
   - Intermediate lessons require related beginner lessons
   - Advanced lessons require intermediate lessons
   - Logic: If lesson B uses concepts from lesson A, A is prerequisite of B

2. **Related Lessons:**
   - Same category → related
   - Overlapping tags (3+) → related
   - Sequential topics → related

3. **Output Format:**
   ```yaml
   prerequisites: [first-steps, html-css-basics]
   related: [intrinsic-web-design, tailwind]
   sequence:
     prev: html-css-basics
     next: js-intro
   ```

4. **Validation:**
   - No circular prerequisites
   - All referenced slugs exist
   - Max 5 prerequisites
   - Max 5 related lessons
```

### 3.3 Create Search Index

```markdown
## Task: Create Search Index for Lessons

### Context
Need client-side search that searches:
- Title
- Tags
- Learning objectives
- Content excerpts

### Requirements

1. **Build-time index generation:**
   - Script: scripts/generate-search-index.js
   - Output: assets/search-index.json

2. **Index structure:**
   ```json
   {
     "lessons": [
       {
         "slug": "responsive",
         "title": "Web Design: Responsive...",
         "tags": ["responsive", "media-queries"],
         "excerpt": "First 200 characters...",
         "objectives": ["Understand...", "Apply..."]
       }
     ]
   }
   ```

3. **Search implementation:**
   - Use Fuse.js for fuzzy search
   - Weighted fields: title (10), tags (5), excerpt (2)
   - Highlight matches in results

4. **UI integration:**
   - Search input with debounce (300ms)
   - Dropdown results (max 5)
   - Click to navigate
   - Keyboard navigation (↑↓ Enter)
```

---

## 4. Implementation Report Template

After each AI-assisted refactoring phase, generate:

```markdown
## Implementation Report: [Phase Name]

### 1. Summary
[2-3 sentences describing what was accomplished]

### 2. Changes Made

| File | Action | Description |
|------|--------|-------------|
| scripts/extract-metadata.js | Added | Metadata extraction script |
| _data/lessons.yml | Modified | Added category, tags fields |
| lessons/en/index.html | Modified | Added filter UI |

### 3. Decisions Made

| Decision | Rationale | Alternatives |
|----------|-----------|--------------|
| Used Alpine.js | Lightweight, no build step | React (overkill), vanilla (more code) |

### 4. Verification

- [x] All lessons have category assigned
- [x] Tags average 4.5 per lesson
- [x] Filter UI works on mobile
- [ ] Search index needs optimization (TODO)

### 5. AI Assistance Log

| Prompt | Model | Result |
|--------|-------|--------|
| "Add category to all lessons" | Claude | 70/70 files updated |
| "Create filter component" | Claude | 1 file generated |

### 6. Next Steps

1. Add duration estimates
2. Optimize search index
3. Add prerequisite chains

### 7. Lessons Learned

- AI excels at bulk transformations with clear patterns
- Manual review needed for edge cases (5 lessons needed adjustment)
- Building incrementally prevents cascading errors
```

---

## 5. Safety Checklist

Before applying AI-generated changes:

### Pre-Flight Checks

- [ ] **Backup exists** (git stash or branch)
- [ ] **Plan documented** (docs/plan-*.md)
- [ ] **Dry run tested** (--dry-run flag)
- [ ] **Sample reviewed** (check 3-5 files manually)
- [ ] **Rollback plan clear** (git reset, restore)

### Post-Application Checks

- [ ] **Build succeeds** (`npm run build`)
- [ ] **No new lint errors** (`npm run lint`)
- [ ] **Visual inspection** (check pages in browser)
- [ ] **Links work** (`npm run check-links`)
- [ ] **Commit with message** (include AI-assisted note)

### Rollback Commands

```bash
# Discard all changes
git checkout -- .

# Restore specific file
git checkout HEAD -- path/to/file

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

---

## 6. The Ethical Dimension

### 6.1 Document AI Usage

Every commit message should indicate AI assistance:

```bash
# Good
git commit -m "feat(lessons): add category metadata (AI-assisted: Claude)"

# Better
git commit -m "feat(lessons): add category metadata

AI-assisted: Claude generated initial categorization
Human review: Adjusted 5 edge cases
Verified: All 70 lessons categorized"
```

### 6.2 Understand What You Commit

**Never commit code you don't understand.**

For each AI-generated file:
1. Read through the code
2. Trace the logic flow
3. Test edge cases
4. Document assumptions

### 6.3 The Verification Responsibility

AI can generate plausible but wrong code. Verify:

| Check | Method |
|-------|--------|
| Correctness | Run tests, manual testing |
| Security | Review inputs, outputs, permissions |
| Performance | Lighthouse, profiling |
| Accessibility | axe, screen reader testing |
| Style | Match existing codebase conventions |

---

## 🔗 Related Resources

| Resource | Description |
|----------|-------------|
| [Architecture Analysis]({{ '/methodology/en/architecture-refactor-analysis/' | relative_url }}) | Full options analysis |
| [Learning Path Extension]({{ '/methodology/en/learning-path-extension/' | relative_url }}) | Your path forward |
| [AI Practical Guide]({{ '/methodology/en/ai-practical-guide/' | relative_url }}) | Comprehensive AI methodology |

---

**Authorship:** Rubén Vega Balbás, PhD (UDIT) · ORCID: [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)
**License:** Content CC BY-NC-SA 4.0

_Critical Coding for a Better Living._

