---
layout: lesson
title: 'Web Atelier Evaluation Rationale'
title_alt: 'Evaluation & Assessment Methodology'
lang: en
slug: evaluation-rationale
date: 2026-01-02
author: 'Rubén Vega Balbás, PhD'
description: 'Methodology-wide assessment rationale, scoring philosophy, and bibliography alignment for Web Atelier.'
permalink: /evaluation/en/
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

## 1. Methodological Alignment

Web Atelier assessments (quizzes, practical reviews, oral defenses, peer critique) across English and Spanish tracks extend the same **Theory → Practice → Shared Reflection** arc described in [{{ site.url }}{{ site.baseurl }}/methodology/en/]({{ site.url }}{{ site.baseurl }}/methodology/en/):

| Pillar         | Evaluation Touchpoints                                                                       |
| -------------- | -------------------------------------------------------------------------------------------- |
| **Theory**     | Concept checks drawn from canonical lessons, annotated references, and bibliography readings |
| **Practice**   | Evidence from repositories, design tokens, deployments, code reviews, live demos             |
| **Reflection** | Essays, retrospectives, oral critiques, AI-usage disclosures, peer feedback                  |

Assessments deliberately favor **metacognitive evidence** (students explaining their own implementation) over rote recall. This ensures grades reflect the atelier ethos of _learning by doing_.

---

## 2. Assessment Taxonomy

| Dimension                | Description                                                                | Instruments                                                      |
| ------------------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Self-Awareness**       | Students articulate decisions, trade-offs, and next actions                | Essay prompts, viva voce, reflective journals                    |
| **Technical Excellence** | Code quality, performance budgets, accessibility, deployment maturity      | Repository audits, automated tests, rubric checklists            |
| **Conceptual Mastery**   | Understanding of responsive design, CSS architecture, JS modules, ethics   | Objective quizzes, oral questioning, matching/ordering exercises |
| **Community & Ethics**   | Contribution patterns, documentation of AI tooling, attribution, inclusion | AI workflow reports, accessibility audits, peer review           |

> **Rubrics:** Each dimension maps to rubric rows aligned with WCAG, W3C design principles, ACM ethical guidelines, and the Web Atelier bibliography ([{{ site.url }}{{ site.baseurl }}/bibliography/]({{ site.url }}{{ site.baseurl }}/bibliography/)).

---

## 3. Learning Mindset & Confidence Cues

Even before you open an LMS, notice how your attention naturally centers on **meaningful learning** instead of raw scores. As you breathe steadily, you can remember a moment when a challenging concept finally clicked—carry that feeling into every assessment.

- **Neuro-Linguistic anchors:** _While you read each prompt, you may hear an inner coach whispering, “You already know how to reason through this; let curiosity lead the way.”_
- **Reframing grades:** Think of every point as evidence of reflection, not judgment. Each response is a prototype in your professional portfolio.
- **Embodied practice:** Picture yourself presenting the project to a future teammate; your posture relaxes, your voice steadies, and your ideas land with clarity.

> You can decide—right now—that exams are simply mirrors of the learning journey you already own. When you choose to focus on significance, grades tend to follow.

---

## 4. Scoring Philosophy & Timing

- **Point Allocation:**
  - Technical Implementation ≈ 40%
  - Reflection & Documentation ≈ 35%
  - Conceptual Understanding ≈ 25%
- **Timing Guidance:**
  - Essays: 3–4 minutes each (with grader info for consistency)
  - Objective items: 1 minute each
  - Buffer for uploads / link verification: 5–10 minutes
- **Evidence Requirements:** Students must cite repo commits, deployment URLs, accessibility scans, and AI plans (`docs/plan*.md`) when relevant.
- **Detailed Rubrics:** Refer to the [Portfolio Template Final Project Rubric]({{ site.url }}{{ site.baseurl }}/evaluation/final-project-portfolio-rubric/) for a model breakdown of criteria mapped to points and qualitative guidance.

---

## 5. Bibliography & Canonical References

Evaluations cite the same primary sources compiled in [{{ site.url }}{{ site.baseurl }}/bibliography/]({{ site.url }}{{ site.baseurl }}/bibliography/) and [{{ site.url }}{{ site.baseurl }}/references/]({{ site.url }}{{ site.baseurl }}/references/):

- **Web Pedagogy:** Franchi & Vega (2024), Kolb experiential learning, agile-in-education literature.
- **Accessibility:** WCAG 2.1, Inclusive Design Principles, WAI-ARIA Authoring Practices.
- **CSS Architecture:** W3C Design Tokens, CUBE CSS, Smashing Magazine best practices.
- **Ethics & AI:** ACM Code of Ethics, UNESCO AI recommendations, Web Atelier AI workflow briefs.

Each rationale section anchors back to these references to justify question selection and scoring.

---

## 6. Future Work

- [ ] Extend exporters to **QTI 3.0 (XML + JSON)** leveraging IMS Assessment Results Service schemas.
- [ ] Publish **rubric markdown** per dimension for transparent grading.
- [ ] Add **oral exam scripts** and peer review forms to the evaluation hub.
- [ ] Automate **link verification** (repository + deployment) before grading sessions.

---

_This document functions as the overarching rationale for every Web Atelier assessment artifact. For locale-specific instructions, visit the [evaluation hub]({{ site.url }}{{ site.baseurl }}/evaluation/) or consult the [lesson index]({{ site.url }}{{ site.baseurl }}/lessons/en/)._
