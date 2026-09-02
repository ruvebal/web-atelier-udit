---
layout: lesson
title: 'Unit 12: Capstone Oral Defence & Final Evaluation'
title_alt: 'Unidad 12: Defensa Oral del Proyecto Final y Evaluación Final'
slug: feii-unit-12-capstone-defence
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/feii/unit-12-capstone-defence/
description: 'Capstone oral defence: presentation structure, evaluation criteria, diff-based questions, and final assessment.'
tags:
  [
    feii,
    capstone,
    oral-defence,
    final-evaluation,
    presentation,
    evaluation-criteria,
    project-completion,
  ]
status: complete
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> A defence tests corrective competence and authorship under questions.</p>
<p><strong>Field lens:</strong> **Practice anchor:** demonstration, explanation, modification, and reflection. **Frontier signal:** oral defence plus transparent AI policy is an AI-resilient design instrument, not a validated guarantee.</p>
</aside>
>
> **Studio test:** Prepare to explain, alter, and critique the submitted system live.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"The oral defence is not a performance. It's a conversation about your work."_

> **AI Assistance Disclosure:** This unit requires live presentation without AI assistance. AI may be used for practice slides, but the actual defence must be human-driven.

## B1 · Defence briefing — assessment preparation

**Claim:** The oral defence measures corrective competence on the student’s own diff, not slide theatre.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
The lecture follows Unit 11’s tagged evidence package. Students learn to answer from the implementation, distinguish a verified result from a plausible story, and disclose AI assistance without outsourcing judgement. Liu’s assessment/offloading discussion (Ahmes node `dc2bd27d`, p. 12) and the DEC LATAM fairness/shallow-learning evidence (Ahmes node `b15014c1`, p. 2) ground the assessment concern; neither is treated as proof that this particular defence format produces learning.
-->
{% endif %}

**Speaker outline:** 1) purpose of defence, 2) evidence contract, 3) problem/context, 4) architecture, 5) diff, 6) tests and limits, 7) AI decisions, 8) fairness and individual accountability, 9) live demo, 10) Q&A.

## B2 · Prácticas de laboratorio — 3 h · team

Freeze the Unit 11 release tag. Assign each member one layer to explain, rehearse one accepted and one rejected AI suggestion from the log, and run the tagged build. The team definition of done is: green release, defence roster, evidence links, and no new features introduced during rehearsal.

## B3 · Resolución de ejercicios — 1 h · individual

1. **No-AI diagnostic:** read an unfamiliar diff and name one behavioural change, one risk, and one test that would discriminate them.
2. Repair an oral answer that confuses “the test passed” with “the design is accessible”.
3. Given an AI-generated patch, write the accept/reject decision and the human verification evidence.
4. Answer a fairness probe: identify which part of a team release an individual student can defend unaided.

Professor answer sketches remain private. The defence itself is teaching and assessment, not a research instrument.

## Research boundary

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- Liu, Ahmes node `dc2bd27d`, p. 12 — assessment/offloading discussion; cite the resolved page, not a vector snippet.
-->
{% endif %}
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- Digital Education Council LATAM, Ahmes node `b15014c1`, p. 2 — student concern about shallow learning and assessment fairness.
-->
{% endif %}
- **Missing evidence:** this unit does not establish a causal validity claim for the rubric. It requires reproducible student evidence and a human review; it does not authorize research-data collection or public recording.

---

## 🎯 Learning Objectives

By the end of this unit, you will be able to:

- **Structure an oral defence** — Clear narrative arc from problem to solution
- **Present the diff** — Walk through key code changes and design decisions
- **Answer technical questions** — Defend architectural choices and trade-offs
- **Demonstrate verify/narrate axes** — Show evidence and explain thinking
- **Understand evaluation criteria** — How the final assessment is scored

---

## 📖 Oral Defence Structure

### 15-Minute Presentation

```
┌─────────────────────────────────────────────────────────┐
│              ORAL DEFENCE STRUCTURE                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   0-2 min:   Problem Statement & Context                │
│   2-5 min:   Approach & Architecture                   │
│   5-10 min:  Implementation Walkthrough (the diff)       │
│   10-12 min: Verify/Narrate Evidence                   │
│   12-15 min: Live Demo & Conclusion                    │
│                                                          │
│   15-20 min: Q&A (technical questions)                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Problem Statement (0-2 min)

- What problem are you solving?
- Why is it important?
- What constraints did you face?

### Approach & Architecture (2-5 min)

- What technologies did you choose? Why?
- How does the architecture address the problem?
- What trade-offs did you make?

### Implementation Walkthrough (5-10 min)

- **The diff is the hero** — Walk through actual code changes
- Focus on the most interesting parts, not boilerplate
- Explain why you implemented each key section this way

### Verify/Narrate Evidence (10-12 min)

- **Verify:** Show tests, demos, performance metrics
- **Narrate:** Explain decisions from decisions.md and iterations.md
- **AI declaration:** Be transparent about AI assistance

### Live Demo & Conclusion (12-15 min)

- Demonstrate the working application
- Summarize what you learned
- What would you do differently next time?

---

## 🎯 Diff-Based Questions

Expect questions focused on the actual code you wrote:

### Technical Questions

- "Why did you choose Astro instead of Next.js for this component?"
- "How does your service worker caching strategy handle stale data?"
- "What happens if the WebSocket connection drops in your control panel?"
- "Why did you use this shader pattern instead of a standard material?"
- "How does your testing strategy cover edge cases?"

### Process Questions

- "What was your biggest failure in this project? How did you recover?"
- "Which AI suggestion did you reject? Why?"
- "What would you do differently if you had another week?"
- "How did you balance time between features and polish?"

---

## 📊 Evaluation Criteria

### Final Assessment Weights

| Component | Weight | Description |
|-----------|--------|-------------|
| Technical Excellence | 40% | Code quality, architecture, implementation |
| Process Evidence | 30% | Documentation, AI declaration, decision log |
| Oral Defence | 20% | Presentation quality, Q&A performance |
| Verify/Narrate Axes | 10% | Evidence completeness, narrative coherence |

### Technical Excellence (40%)

- **Code quality** — Clean, readable, well-documented code
- **Architecture** — Appropriate patterns, separation of concerns
- **Implementation** — Correct implementation of requirements
- **Performance** — Optimized for target use case

### Process Evidence (30%)

- **Documentation** — Complete decisions.md, iterations.md, AI_USE_DECLARATION.md
- **AI transparency** — All AI use documented with accountability
- **Verification** — Tests pass, metrics collected, evidence complete
- **Narration** — Clear rationale for all major decisions

### Oral Defence (20%)

- **Presentation** — Clear structure, time management, visual aids
- **Q&A** — Ability to answer technical questions accurately
- **Communication** — Explain complex concepts clearly
- **Professionalism** — Prepared, confident, respectful

### Verify/Narrate Axes (10%)

- **Verify axis** — Evidence that the implementation works
- **Narrate axis** — Explanation of why specific approaches were chosen
- **Coherence** — Evidence and narrative align with the implementation

---

## 🎯 Practice Exercise

**Time:** 3 hours

1. **Prepare presentation slides** — Structure the 15-minute talk around the diff
2. **Rehearse the walkthrough** — Practice explaining key code sections
3. **Anticipate questions** — Prepare answers for likely technical questions
4. **Run through the demo** — Ensure live demo works flawlessly
5. **Review evidence package** — Verify all documentation is complete
6. **Mock defence** — Practice with a peer or instructor

**Deliverable:** Presentation slides + live demo + complete evidence package

---

## 📚 Recommended Reading

- **Technical Presentation Guide** — https://www.eecs.harvard.edu/technical-presentation-guide/
- **Q&A Preparation** — https://www.theguardian.com/career/2014/oct/28/how-to-prepare-for-a-job-interview
- **Diff-Based Review** — https://github.com/features/code-review/

---

## ✅ Session Outcome

By the end of this unit, you should:

- Have a complete oral defence presentation prepared
- Be ready to answer technical questions about your implementation
- Understand how the final evaluation is scored
- Have all process evidence complete and verified

This unit completes the FE II capstone. Units 11-12 together constitute the **Proyecto integrador** deliverable with oral defence.

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Session Outcome"
  visual-grammar: "corrective-competence-defence — implementation, evidence, explanation, and live correction converging in a final defence"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

---

## 🎓 Final Reflection

FE II has taken you from building interfaces to building systems of interfaces:

- **Unit 1:** Reframed the interface layer as a system problem
- **Units 2-3:** Mastered Astro as a second paradigm beyond React
- **Unit 4:** Built PWA capabilities for offline resilience
- **Units 5-6:** Developed testing strategy and AI-assisted code review
- **Unit 7:** Engineered performance with Core Web Vitals
- **Units 8-9:** Extended to 3D interfaces with shader literacy
- **Unit 10:** Consumed IoT/robotics and Python-backed services
- **Units 11-12:** Integrated everything into a capstone with process evidence

The component model you learned in FE I — props, state, hooks, composition — remains the same. What changed is the deployment context: from single-page apps to distributed systems, from REST APIs to WebSocket streams, from 2D DOM to WebGL 3D.

**Critical coding for a better living.**

---

> _"The capstone is not the end. It's the beginning of your journey as a systems thinker."_
