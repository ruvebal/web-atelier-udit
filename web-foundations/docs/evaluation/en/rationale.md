---
layout: default
title: "Web Atelier Evaluation Rationale"
lang: en
description: "Methodology-wide assessment rationale, scoring philosophy, and bibliography alignment for Web Atelier."
---

# Web Atelier Evaluation Rationale

> **Scope:** All Web Atelier assessments (quizzes, practical reviews, oral defenses, peer critique) across English and Spanish tracks.  
> **Owner:** Web Atelier Curriculum Committee (UDIT)  
> **Last Updated:** 2026-01-02

---

## 1. Methodological Alignment

Web Atelier assessments extend the same **Theory → Practice → Shared Reflection** arc described in `/methodology/en/`:

| Pillar | Evaluation Touchpoints |
|--------|------------------------|
| **Theory** | Concept checks drawn from canonical lessons, annotated references, and bibliography readings |
| **Practice** | Evidence from repositories, design tokens, deployments, code reviews, live demos |
| **Reflection** | Essays, retrospectives, oral critiques, AI-usage disclosures, peer feedback |

Assessments deliberately favor **metacognitive evidence** (students explaining their own implementation) over rote recall. This ensures grades reflect the atelier ethos of *learning by doing*.

---

## 2. Assessment Taxonomy

| Dimension | Description | Instruments |
|-----------|-------------|-------------|
| **Self-Awareness** | Students articulate decisions, trade-offs, and next actions | Essay prompts, viva voce, reflective journals |
| **Technical Excellence** | Code quality, performance budgets, accessibility, deployment maturity | Repository audits, automated tests, rubric checklists |
| **Conceptual Mastery** | Understanding of responsive design, CSS architecture, JS modules, ethics | Objective quizzes, oral questioning, matching/ordering exercises |
| **Community & Ethics** | Contribution patterns, documentation of AI tooling, attribution, inclusion | AI workflow reports, accessibility audits, peer review |

> **Rubrics:** Each dimension maps to rubric rows aligned with WCAG, W3C design principles, ACM ethical guidelines, and the Web Atelier bibliography (`/bibliography`).

---

## 3. Bilingual Asset Pipeline

All high-stakes exams share a single YAML question bank per locale, stored in a **private instructor-only area** of the repository.

1. **Source of Truth:** Locale-specific YAML maintained outside the public site tree.  
2. **Transformers:** `yaml-to-moodle-xml.js` (Moodle) and `yaml-to-qti.js` (IMS QTI 2.1).  
3. **Validation:** `xmllint` for XML outputs, IMS tooling for QTI (roadmap: QTI 3.0).  
4. **Distribution:** Only packaged artifacts are distributed to LMS instances; the raw banks stay private.

This separation lets instructors localize questions, regenerate LMS assets, and keep the pedagogical rationale public without exposing the actual prompts.

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

---

## 5. Bibliography & Canonical References

Evaluations cite the same primary sources compiled in `/bibliography` and `/references`:

- **Web Pedagogy:** Franchi & Vega (2024), Kolb experiential learning, agile-in-education literature.
- **Accessibility:** WCAG 2.1, Inclusive Design Principles, WAI-ARIA Authoring Practices.
- **CSS Architecture:** W3C Design Tokens, CUBE CSS, Smashing Magazine best practices.
- **Ethics & AI:** ACM Code of Ethics, UNESCO AI recommendations, Web Atelier AI workflow briefs.

Each rationale section anchors back to these references to justify question selection and scoring.

---

## 6. LMS Implementation Notes

- **Moodle:** Import XML via Question Bank → Import (Moodle XML). Ensure categories map to `$course$/top/[Category]`.
- **Blackboard Ultra:** Zip the QTI directory (`examen-portafolio-auto-evaluacion-qti`) and import via **Content Collection → Upload** or **Tests → Import**.
- **Canvas / Brightspace:** Use QTI 2.1 package; plan upgrade path to QTI 3.0 JSON once specification support lands.

Instructors should version-control generated packages alongside the YAML to guarantee reproducibility.

---

## 7. Future Work

- [ ] Extend exporters to **QTI 3.0 (XML + JSON)** leveraging IMS Assessment Results Service schemas.
- [ ] Publish **rubric markdown** per dimension for transparent grading.
- [ ] Add **oral exam scripts** and peer review forms to the evaluation hub.
- [ ] Automate **link verification** (repository + deployment) before grading sessions.

---

*This document functions as the overarching rationale for every Web Atelier assessment artifact. For locale-specific instructions, visit the evaluation hub or consult the lesson index.*
