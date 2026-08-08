---
layout: lesson
title: 'AI Use Declaration & Oral Defence Rubric'
title_alt: 'Declaración de Uso de IA y Rúbrica de Defensa Oral'
slug: ai-declaration-oral-defence-rubric
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /evaluation/shared/ai-declaration-oral-defence-rubric/
description: 'Shared rubric for AI use declarations and oral defences across Web Atelier tracks, grounded in profield methodology axes (verify, narrate, defer, critique).'
tags:
  [
    evaluation,
    ai-declaration,
    oral-defence,
    rubric,
    profield,
    verify-axis,
    narrate-axis,
    assessment,
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

## 🎯 Purpose

This shared rubric provides consistent evaluation criteria for AI use declarations and oral defences across all Web Atelier tracks (FE I, FE II, and future courses). It is grounded in the profield methodology's operational axes (`verify`, `narrate`, `defer`, `critique`) and the Web Atelier evaluation philosophy (Technical 40% / Reflection 35% / Conceptual 25%).

---

## 📖 Profield Operational Axes

### Verify Axis

**Definition:** Tests whether the learner can debug, justify, modify, and explain submitted code under AI-assisted conditions.

**Evidence Requirements:**
- Code functions as intended (tests pass, demo works)
- Student can explain key implementation decisions
- Student can debug and modify code on demand
- Evidence is reproducible (setup instructions, dependencies specified)

**Rubric Criteria:**
- **Excellent (4):** Code works flawlessly, student can explain and modify any section, debugging is systematic
- **Good (3):** Code works with minor issues, student can explain most sections, basic debugging demonstrated
- **Satisfactory (2):** Code works with known issues, student can explain some sections, debugging is trial-and-error
- **Needs Improvement (1):** Code has major issues, student cannot explain implementation, no debugging demonstrated

### Narrate Axis

**Definition:** Requires students to expose process, rationale, authorship, version history, and explanation rather than only final product.

**Evidence Requirements:**
- Decision log (decisions.md) documenting architectural choices
- Iteration log (iterations.md) showing problem-solving process
- Commit history with meaningful messages
- Rationale for trade-offs and alternatives considered

**Rubric Criteria:**
- **Excellent (4):** Complete decision and iteration logs, clear rationale for all major choices, commit history tells a coherent story
- **Good (3):** Most decisions documented, rationale is clear for key choices, commit history is adequate
- **Satisfactory (2):** Some decisions documented, rationale is partial, commit history exists but lacks clarity
- **Needs Improvement (1):** Minimal or no process documentation, rationale absent, commit history is unclear

### Defer Axis

**Definition:** Treats delayed or staged AI access as a scaffold to preserve productive struggle, planning, and metacognition.

**Evidence Requirements:**
- AI assistance used after initial planning (not as first step)
- Plans precede implementation (docs-first methodology)
- Student can explain what AI generated vs. what they authored
- Metacognitive reflection on AI assistance effectiveness

**Rubric Criteria:**
- **Excellent (4):** AI used only after thorough planning, clear distinction between AI-generated and authored code, deep reflection on AI assistance
- **Good (3):** AI used after some planning, reasonable distinction between AI and authorship, some reflection
- **Satisfactory (2):** AI used with minimal planning, partial distinction between AI and authorship, minimal reflection
- **Needs Improvement (1):** AI used as first step, no distinction between AI and authorship, no reflection

### Critique Axis

**Definition:** Uses peer, instructor, and AI-assisted review as explicit learning evidence.

**Evidence Requirements:**
- Peer review participation and feedback given
- Response to instructor/peer feedback in revisions
- AI-assisted code review documented with human validation
- Evidence of iterative improvement based on critique

**Rubric Criteria:**
- **Excellent (4):** Active peer review participation, detailed response to all feedback, AI review thoroughly validated, clear iteration
- **Good (3):** Peer review participation, response to most feedback, AI review mostly validated, some iteration
- **Satisfactory (2):** Limited peer review, response to some feedback, AI review partially validated, minimal iteration
- **Needs Improvement (1):** No peer review, no response to feedback, AI review unvalidated, no iteration

---

## 🤖 AI Use Declaration Requirements

Every deliverable that uses AI assistance must include an `AI_USE_DECLARATION.md` file with the following sections:

### Required Sections

1. **AI Assistance Summary**
   - List all AI tools used (Cursor AI, Ollama, GitHub Copilot, etc.)
   - Specify the scope of AI assistance (architecture, code generation, testing, etc.)

2. **AI Use by Unit/Task**
   - For each unit or task, document:
     - Prompts used
     - AI-generated output
     - Human verification steps
     - Accountability statement (who approved the AI suggestions)

3. **Files with AI Assistance**
   - List all files touched by AI
   - Specify the type of assistance (scaffold, generation, review, etc.)

4. **Accountability Statement**
   - Explicit statement that all AI-generated code was reviewed, tested, and approved by a human
   - Confirmation that human judgment remains final

### Evaluation Criteria

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Completeness | 40% | All required sections present and complete |
| Transparency | 30% | Clear distinction between AI-generated and authored code |
| Verification | 20% | Evidence of human review and testing |
| Accountability | 10% | Explicit human responsibility statement |

---

## 🎤 Oral Defence Rubric

### Structure (15 minutes)

- **0-2 min:** Problem statement and context
- **2-5 min:** Approach and architecture
- **5-10 min:** Implementation walkthrough (the diff)
- **10-12 min:** Verify/narrate evidence
- **12-15 min:** Live demo and conclusion
- **15-20 min:** Q&A

### Evaluation Criteria

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Technical Excellence | 40% | Code quality, architecture, implementation correctness |
| Process Evidence | 30% | Documentation, AI declaration, decision logs |
| Presentation Quality | 20% | Clear structure, time management, visual aids |
| Q&A Performance | 10% | Ability to answer technical questions accurately |

### Q&A Expectations

Expect diff-based questions focused on the actual code:
- "Why did you choose this architecture pattern?"
- "How does your error handling cover edge cases?"
- "What happens if the connection drops?"
- "Which AI suggestion did you reject? Why?"

---

## 📊 Alignment with Web Atelier Evaluation Philosophy

This rubric aligns with the Web Atelier evaluation rationale (Technical 40% / Reflection 35% / Conceptual 25%):

- **Technical Excellence (40%)** → Verify axis + oral defence technical criteria
- **Reflection & Documentation (35%)** → Narrate axis + AI declaration completeness
- **Conceptual Understanding (25%)** → Defer axis + Q&A conceptual questions

---

## 📚 Grounding References

- **Sankaranarayanan 2026** — "Mitigating 'Epistemic Debt'" — corrective competence framework
- **Oliveira et al. 2026** — AI-assisted code review as scaffold for code quality
- **Web Atelier Evaluation Rationale** — docs/evaluation/en/index.md
- **Profield Front-End Pedagogy** — §12.7 operational axes

---

## ✅ Usage

This rubric is referenced by:
- `/tracks/fei/how-to-pass-this-track/` — FE I evaluation
- `/tracks/feii/how-to-pass-this-track/` — FE II evaluation
- Future Web Atelier tracks (as needed)

Both tracks link to this shared component rather than duplicating rubric content.

---

> _"AI assists, but humans decide. The difference is accountability."_
