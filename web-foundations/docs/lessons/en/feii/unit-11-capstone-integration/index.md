---
layout: lesson
title: 'Unit 11: Capstone Integration — Process Evidence & AI Use Declaration'
title_alt: 'Unidad 11: Integración del Proyecto Final — Evidencia del Proceso y Declaración de Uso de IA'
slug: feii-unit-11-capstone-integration
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-11-capstone-integration/
description: 'Capstone project integration: process evidence documentation, AI use declaration, and the verify/narrate axes from the profield methodology.'
tags:
  [
    feii,
    capstone,
    process-evidence,
    ai-declaration,
    verify-axis,
    narrate-axis,
    documentation,
    project-integration,
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

> _"The process is as important as the product. Evidence shows how you think."_

> **AI Assistance Disclosure:** This unit teaches AI use declaration as a required deliverable. All AI assistance must be documented with plans, prompts, and implementation reports.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Document process evidence** — Track design decisions, iterations, and problem-solving
- **Declare AI use transparently** — Document all AI assistance with attribution and accountability
- **Apply the verify axis** — Evidence that the code works as intended (tests, demos, measurements)
- **Apply the narrate axis** — Explain the thinking behind decisions (rationale, trade-offs, alternatives)
- **Prepare for oral defence** — Structure the diff presentation and anticipate questions

---

## 📖 The Verify/Narrate Axes

From the profield methodology (§12.7), all capstone projects must demonstrate two axes:

### Verify Axis (Does it work?)

Evidence that the implementation functions correctly:

- **Tests** — Unit, integration, and E2E test results
- **Demos** — Screenshots, videos, or live deployments
- **Measurements** — Performance metrics, Lighthouse scores, Core Web Vitals
- **Reproducibility** — Clear setup instructions, dependency specifications

### Narrate Axis (Why this approach?)

Explanation of the thinking behind decisions:

- **Rationale** — Why this technology? Why this architecture?
- **Trade-offs** — What alternatives were considered? Why rejected?
- **Constraints** — What limitations influenced the design?
- **Future evolution** — How would this scale? What's missing?

---

## 📋 Process Evidence Documentation

### Commit Message Discipline

```bash
# Good commit message
feat: add Astro islands architecture for product catalog

- Implement static ocean for SEO-friendly content
- Add React islands for interactive filters
- Set up content collections with Zod validation
- Measure 40% LCP improvement vs SPA baseline

Refs: #123
```

### Decision Log

```markdown
# decisions.md

## 2026-08-08: Astro vs. Next.js

**Decision:** Use Astro for product catalog
**Rationale:** Content-first, better SEO, zero-JS by default
**Trade-offs:** Less ecosystem than Next.js, learning curve
**Alternatives considered:** Next.js (too heavy for static content), Gatsby (deprecated)
```

### Iteration Log

```markdown
# iterations.md

## Iteration 1: Pure Static Site
**Status:** Rejected
**Reason:** No interactivity, poor UX for complex products

## Iteration 2: Islands Architecture
**Status:** Accepted
**Reason:** Balance SEO and interactivity, performant
```

---

## 🤖 AI Use Declaration

### Required Sections

Every AI-assisted project must include an AI declaration:

```markdown
# AI_USE_DECLARATION.md

## AI Assistance Summary

This project used AI assistance for:
- Architecture design (unit 2-3)
- Test generation (unit 5)
- Code review suggestions (unit 6)
- Shader optimization (unit 9)

## AI Tools Used

- Cursor AI (IDE-assisted coding)
- Ollama (local LLM, no cloud APIs)
- GitHub Copilot (PR review suggestions)

## AI Use by Unit

### Unit 2-3: Astro Architecture
- **Prompts:** Astro islands architecture patterns, multi-framework integration
- **Output:** Initial project scaffold, islands configuration
- **Verification:** Manually reviewed against Astro documentation
- **Accountability:** All architectural decisions approved by human reviewer

### Unit 5: Testing Strategy
- **Prompts:** Vitest configuration, RTL test patterns
- **Output:** Test suite skeleton, sample tests
- **Verification:** All tests pass, coverage 80%+
- **Accountability:** Test design approved by human reviewer

## Accountability Statement

All AI-generated code was reviewed, tested, and approved by [Student Name]. AI is a collaborator, not a decision-maker. Human judgment remains final.

## Files with AI Assistance

- `src/pages/products.astro` — Initial scaffold
- `src/components/ProductFilter.jsx` — Islands hydration pattern
- `tests/unit.test.ts` — Test generation
- (List all files touched by AI)
```

---

## 🎯 Capstone Project Structure

### Required Directory Layout

```
capstone-project/
├── src/                    # Implementation
├── tests/                  # Verify axis evidence
├── docs/
│   ├── decisions.md        # Narrate axis: decision log
│   ├── iterations.md      # Narrate axis: iteration log
│   ├── AI_USE_DECLARATION.md  # AI use declaration
│   └── README.md          # Project overview + setup
├── evidence/               # Verify axis evidence
│   ├── screenshots/       # UI screenshots
│   ├── videos/            # Demo videos
│   ├── metrics/           # Performance measurements
│   └── test-reports/      # CI/CD test results
└── deployment/             # Deployment configuration
```

---

## 🎯 Practice Exercise

**Time:** 3 hours

1. **Set up process documentation** — Create decisions.md, iterations.md, AI_USE_DECLARATION.md
2. **Track AI use** — Document every AI interaction with prompts, outputs, and verification
3. **Collect verify evidence** — Run tests, capture screenshots, measure performance
4. **Write narrate documentation** — Explain architectural decisions, trade-offs, alternatives
5. **Prepare oral defence structure** — Outline the diff presentation, anticipate technical questions
6. **Review against requirements** — Verify all deliverables are present and complete

**Deliverable:** Complete process evidence package ready for unit 12 oral defence

---

## 📚 Recommended Reading

- **Verify/Narrate Axes** — Profield methodology §12.7
- **AI-Assisted Development Guide** — Web Atelier methodology guide
- **Documentation Best Practices** — https://www.writethedocs.org/
- **Oral Presentation Tips** — https://www.ted.com/talks/how_to_speak_so_people_want_to_listen

---

## ✅ Session Outcome

By the end of this unit, you should:

- Have complete process evidence documentation (decisions, iterations, AI use)
- Understand the verify/narrate axes and how to demonstrate both
- Be able to structure an oral defence presentation around the project diff
- Have all evidence collected for the final evaluation in unit 12

This unit prepares you for the capstone oral defence. The next unit will cover the actual presentation and evaluation.

---

> _"Evidence is not optional. It's how you prove you did the work."_
