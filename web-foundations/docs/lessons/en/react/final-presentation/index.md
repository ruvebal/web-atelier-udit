---
layout: lesson
title: 'Final Presentation: Demo Day & Monograph'
slug: final-presentation
category: react
tags: [react, presentation, demo, portfolio, writing, ethics]
week: 13
phase: 4
sprint: 14
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/react/final-presentation/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> _"Code that cannot be explained does not yet exist for the team."_

---

## 🎯 Sprint Goal

**By the end of this sprint**: you can **demonstrate** a working application, **explain** your architecture decisions, **justify** trade-offs, and submit a **monograph** that documents process, constraints, failures, and learning (including AI usage).

---

## ✅ Deliverables (Required)

- **Live application**
  - Deployed URL (production build)
  - Demo credentials (if auth exists) or a public demo mode
  - Accessibility baseline (keyboard navigation + visible focus + semantic structure)
- **Source code**
  - GitHub repo with clean commit history (no secrets committed)
  - README with setup + scripts + architecture summary
- **Monograph** (PDF or Markdown exported to PDF)
  - Short, precise, evidence-based (screenshots, diagrams, metrics)
- **Demo Day Slide Deck** (optional but recommended)

---

## 🧭 Demo Day Format (Suggested)

### 1) The Problem (60–90s)

- Who is the user?
- What pain do you solve?
- Why does it matter?

### 2) The Product (3–5 min)

- Guided walkthrough of the “happy path”
- One “edge case” flow (error state, empty state, loading state)

### 3) The Architecture (3–5 min)

- Component boundaries (why these components?)
- State model (UI / server / URL / shared)
- Data flow (how does state change propagate?)
- Integration points (API, auth, deployment)

### 4) The Critique (2–3 min)

- What failed, what you changed, why
- What you would do next (roadmap)

---

## 🧾 Monograph Template (Minimal, High Signal)

### 1) Abstract (5–8 lines)

What you built + what you learned.

### 2) Context & Constraints

- Time constraints
- Team constraints
- Technical constraints
- Risk spikes (what you tested early)

### 3) Architecture Decisions (ADR-style)

For 3–6 key decisions, write:

- **Decision**: What you chose
- **Alternatives**: What you considered
- **Trade-offs**: What you gained and what you lost
- **Evidence**: Links to commits/issues, screenshots, metrics

### 4) Accessibility & UX

- Keyboard-only demo notes
- Color/contrast checks
- Reduced motion handling (if relevant)
- UX patterns you adopted (and why)

### 5) Performance & Reliability

- Performance budget or at least 1 measurement (Lighthouse / Web Vitals snapshot)
- Error handling strategy (loading/error/empty states)
- Any monitoring/logging notes (even basic)

### 6) AI Usage Disclosure (Mandatory)

Write **exactly** what AI did and did not do:

- Prompts you used (representative samples)
- What you accepted vs rejected
- Failures: where AI misled you
- Verification: how you validated outputs (tests, docs, manual checks)

### 7) Reflection (Atelier)

- What did you learn about your own thinking?
- What did you learn about your team?
- What did you learn about tools (and their limits)?

---

## 🎓 Assessment Rubric (Aligned with Course)

| Component | Weight | What “Excellent” Looks Like |
| --- | --- | --- |
| Working application | 40% | Stable, coherent UX, production-ready baseline |
| Live demo | 15% | Clear narrative, handles edge case, no hand-waving |
| Technical presentation | 15% | Decisions + trade-offs + evidence, not feature listing |
| Monograph | 20% | Concise, structured, reflective, with artifacts |
| Reflection quality | 10% | Honest self-critique + concrete next steps |

---

## 💭 Reflection Questions

> 💭 _Which decision was “expensive” to change? What would you do earlier next time?_

> 💭 _What is one bug you shipped that taught you more than any tutorial?_

> 💭 _What did AI make easier—and what did it make riskier?_

---

## 🧘 Koan

> _"When the demo breaks, do not blame the projector. Study the code you did not understand."_

