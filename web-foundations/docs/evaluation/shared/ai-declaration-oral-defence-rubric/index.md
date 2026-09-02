---
layout: lesson
title: 'AI Use Declaration & Oral Defence Rubric'
title_alt: 'Declaración de Uso de IA y Rúbrica de Defensa Oral'
slug: ai-declaration-oral-defence-rubric
date: 2026-09-01
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /evaluation/shared/ai-declaration-oral-defence-rubric/
description: 'Shared 0–10 rubric for AI use declarations and oral defences — FE I and FE II. Grades process and corrective competence, not polish alone.'
tags:
  [
    evaluation,
    ai-declaration,
    oral-defence,
    rubric,
    verify-axis,
    narrate-axis,
    defer-axis,
    critique-axis,
    assessment,
    fei,
    feii,
  ]
status: complete
version: '2.0.3'
frozen: '2026-09-01'
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> **Version 2.0.3 · frozen 2026-09-01** · Scores use **0–10** bands below.

## Who this is for

**For:** FE I and FE II students submitting AI-assisted deliverables or defending a capstone/final project.

**Not for:** Written exams (see your track’s How to Pass deck) or lesson-by-lesson formative checks — those use other instruments.

This page is the grading contract for **transparent AI use** and **oral defence**. It implements what [How to Pass FE I]({{ '/tracks/fei/how-to-pass-this-track/' | relative_url }}) and [How to Pass FE II]({{ '/tracks/feii/how-to-pass-this-track/' | relative_url }}) already require: documented process and a defence of your own diff — not a polished artefact alone. Under GenAI, web-project assessment is moving from final product toward process and explanation <a class="citation-ref" href="#ref-russo-2026">(Russo et al. 2026)</a>, this rubric follows that shift using a four-pillar AI-resilient design that is **conceptual**, not yet validated as a whole instrument <a class="citation-ref" href="#ref-nikolic-2026">(Nikolić and Basta Nikolić 2026)</a>. Follow the [AI Practical Guide]({{ '/methodology/en/ai-practical-guide/' | relative_url }}) first; this page is how that protocol is scored.

| Track | When graded | Weight (institutional) |
| --- | --- | --- |
| FE I | Individual React capstone, Final Presentation, any AI-assisted project | Final Presentation **5%**; portfolio/process **10%** |
| FE II | Units 11–12 capstone + Entrega 3 | Entrega 3 **10%**; portfolio **10%** |

**Atelier split** (all rows on this page): Technical **40%** · Reflection & documentation **35%** · Conceptual **25%**. See [Evaluation Rationale]({{ '/evaluation/en/' | relative_url }}) for the wider philosophy.

<figure class="rubric-allegory">
<img src="{{ '/assets/images/evaluation-rubric-allegory/rubric-allegory-theory-practice-reflection.svg' | relative_url }}" width="1200" height="640" alt="Allegorical fractal echo: Theory, Practice, and Reflection as nested triangular pillars" loading="lazy" />
<figcaption>
<p><strong>Theory · Practice · Reflection</strong> — the methodology arc this rubric grades. Nested echoes = the same idea at deliverable, portfolio, and defence scales.</p>
<p class="image-credit">visual-forger · Julia recurrence <em>p<sub>c</sub>(z)=z²+c</em></p>
</figcaption>
</figure>

---

## Scoring bands (0–10)

Every criterion uses the same bands, aligned with UDIT ordinary evaluation (pass average **5.0**; any component below **4.5** suspends the subject).

| Band | Score | What it means |
| --- | --- | --- |
| Insufficient | **0–5** | Missing evidence, undeclared AI, or cannot explain/modify your work |
| Minimum pass | **5–6** | Required artefacts present; basic explanation |
| Competent | **7–8** | Complete process evidence; confident diff walkthrough |
| Excellent | **9–10** | Reproducible setup; live modification; deep reflection |

Weighted section scores round to one decimal, then map to this table.

The institutional percentages decide how much a deliverable counts in the subject grade; they do not change the scoring scale. Every rubric row remains a **0–10** score for Campus compatibility.

<figure class="rubric-allegory">
<img src="{{ '/assets/images/evaluation-rubric-allegory/rubric-allegory-scores.svg' | relative_url }}" width="1200" height="640" alt="Allegorical fractal echo: rubric bands 0-5, 5-6, 7-8, 9-10 and Atelier split 40-35-25" loading="lazy" />
<figcaption>
<p>Same **0–10** geometry for every row — institutional 5.0 / 4.5 rules apply to the course average, not to skipping this rubric.</p>
<p class="image-credit">visual-forger · pass-track threshold family, zoomed</p>
</figcaption>
</figure>

---

## What to submit

Self-coded portfolios treat **process** as assessable evidence <a class="citation-ref" href="#ref-garcia-2025">(Garcia 2025)</a>, web-design cohort in the Philippines; supports the model, not every criterion here. The one-student-one-repo pattern makes that evidence inspectable <a class="citation-ref" href="#ref-nelson-2021">(Nelson and Ponciano 2021)</a>.

| Artefact | FE I | FE II | Why |
| --- | :---: | :---: | --- |
| `AI_USE_DECLARATION.md` | ✓ | ✓ | Transparency <a class="citation-ref" href="#ref-nikolic-2026">(Nikolić and Basta Nikolić 2026)</a> |
| `decisions.md` + `iterations.md` | Final project | Capstone | Narrate axis |
| `docs/plans/` + `docs/reports/` | Sem. 2 | All units | Defer axis — plan before implementation |
| Meaningful **commits** | ✓ | ✓ | Authorship trail |
| **ACCEPT/REJECT log** | Optional | Unit 6+ | Critique axis |
| **Release tag** + green CI | — | Units 11–12 | Verify axis |

Missing a required row for your deliverable caps **Reflection & documentation** at **5.0** until fixed.

<figure class="rubric-allegory">
<img src="{{ '/assets/images/evaluation-rubric-allegory/rubric-allegory-human-ai.svg' | relative_url }}" width="1200" height="640" alt="Allegorical fractal echo: human accountability versus AI assistance" loading="lazy" />
<figcaption>
<p><strong>Human</strong> plan · verify · defend — <strong>AI</strong> assist · suggest · review. Accountability stays on your side of the boundary.</p>
<p class="image-credit">visual-forger · defer axis allegory</p>
</figcaption>
</figure>

---

## How the four axes are scored

Each axis is **0–10** using the bands above.

**Verify (Technical 40%)** — Corrective competence: the work runs and **you** can explain and change it without AI in the room. Copilot can speed brownfield tasks while comprehension may lag <a class="citation-ref" href="#ref-shihab-2025">(Shihab et al. 2025)</a>, unrestricted AI use risks “fragile experts” who ship but cannot correct <a class="citation-ref" href="#ref-sankaranarayanan-2026">(Sankaranarayanan 2026)</a>. *9–10:* live edit + reproducible setup. *0–5:* broken demo or cannot discuss the diff.

**Narrate (Reflection 35%)** — Process is as gradable as the product <a class="citation-ref" href="#ref-garcia-2025">(Garcia 2025)</a>. Commits, `decisions.md`, and `iterations.md` must tell a coherent story of **your** choices. *9–10:* complete logs and trade-offs. *0–5:* absent or inconsistent with claimed authorship.

**Defer (Conceptual 25%)** — Plan before you prompt. Deferred assistance and metacognitive friction preserve productive struggle <a class="citation-ref" href="#ref-sankaranarayanan-2026">(Sankaranarayanan 2026)</a>, the gap between AI completion and student validation is widening <a class="citation-ref" href="#ref-prather-2024">(Prather et al. 2024)</a>. Self-regulated workflows matter here <a class="citation-ref" href="#ref-zimmerman-2000">(Zimmerman 2000)</a>. *9–10:* plans precede AI; clear human vs AI authorship. *0–5:* AI first, or undeclared use.

**Critique (Reflection + Technical)** — Review counts only if **you** record accept/reject decisions. In-workflow AI review in related software-engineering capstones saw follow-up commits in ~32–33% of reviewed PRs <a class="citation-ref" href="#ref-oliveira-2026">(Oliveira et al. 2026)</a>, report the number honestly; it is not a target grade. *9–10:* ACCEPT/REJECT log with rationale and revision commits. *0–5:* AI output merged without judgment.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
LESSON-SAUCE-FE-I-II.md — Garcia, Shihab, Nikolić evaluator_safe=yes; profield-frontend-pedagogy.md §12.7 operational axes.
-->
{% endif %}

---

## AI Use Declaration

File: **`AI_USE_DECLARATION.md`** in the project root.

**Required sections:** (1) tools and scope, (2) per-unit/task prompts + verification + accountable reviewer, (3) file list with type of help, (4) signed accountability statement.

| Criterion | Weight | 9–10 | 5–6 | 0–5 |
| --- | ---: | --- | --- | --- |
| Completeness | 40% | Every section, every task | Most sections | Missing or false |
| Transparency | 30% | AI vs human clear | Mostly clear | Omitted / misleading |
| Verification | 20% | Tests and checks cited | Some named | None |
| Accountability | 10% | Matches repo | Generic | Absent / contradicted |

**Integrity gate:** undeclared AI discovered in review → **0** on the declaration.

---

## Oral defence

**FE I:** Final Presentation (individual React capstone). **FE II:** Entrega 3 (Units 11–12). Oral explanation of one’s own implementation is established in project-based CS courses <a class="citation-ref" href="#ref-lara-2019">(Lara et al. 2019)</a>, compilers cohort; method transfer, not a Spanish FE effect-size study; here it tests corrective competence because slides cannot substitute for the diff <a class="citation-ref" href="#ref-sankaranarayanan-2026">(Sankaranarayanan 2026)</a>.

**15 + 5 min:** problem (0–2) → architecture (2–5) → **diff walkthrough** (5–10) → evidence from logs/tests (10–12) → live demo (12–15) → Q&A (15–20). **Live defence is human-only** — AI may help you prepare, not answer.

| Criterion | Weight | 9–10 | 5–6 | 0–5 |
| --- | ---: | --- | --- | --- |
| Technical | 40% | Deployed; modifies code if asked | Demo works; weak on edges | Broken / cannot discuss |
| Process evidence | 30% | Cites logs, commits, declaration | Vague | Absent / contradicts repo |
| Presentation | 20% | Clear; on time; diff legible | Understandable | Slide theatre |
| Q&A | 10% | Honest about limits and rejected AI advice | Partial | Cannot answer on own code |

**Expect:** “Why this pattern?”, “Which AI suggestion did you reject?”, “Change this line — what breaks?”

---

## References

<p id="ref-garcia-2025" class="reference-entry">Garcia, M. 2025. “Self-Coded Digital Portfolios as Authentic Assessment in Project-Based Learning.” <em>Education Sciences</em> 15 (9): 1150. https://doi.org/10.3390/educsci15091150.</p>

<p id="ref-lara-2019" class="reference-entry">Lara, A., et al. 2019. “A Project-based Learning Experience in a Compilers Course.” In <em>Proceedings of SIGCSE '19</em>. https://doi.org/10.1145/3300115.3309502.</p>

<p id="ref-nelson-2021" class="reference-entry">Nelson, M. A., and L. Ponciano. 2021. “Experiences and Insights from Using GitHub Classroom to Support Project-Based Courses.” In <em>Proceedings of SEENG</em>. https://doi.org/10.1109/SEENG53126.2021.00013.</p>

<p id="ref-nikolic-2026" class="reference-entry">Nikolić, M., and S. Basta Nikolić. 2026. “Designing AI-Resilient Assessment in Higher Education: A Four-Pillar Conceptual Framework.” <em>Frontiers in Artificial Intelligence</em>. https://doi.org/10.3389/frai.2026.1841682.</p>

<p id="ref-oliveira-2026" class="reference-entry">Oliveira, E., M. Fu, P. Thongtanunam, S. López-Pernas, and M. Saqr. 2026. “AI-Assisted Code Review as a Scaffold for Code Quality and Self-Regulated Learning: An Experience Report.” arXiv:2604.23251.</p>

<p id="ref-prather-2024" class="reference-entry">Prather, J., B. N. Reeves, J. Leinonen, S. MacNeil, A. S. Randrianasolo, B. A. Becker, B. Kimmel, J. Wright, and B. Briggs. 2024. “The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers.” In <em>Proceedings of ICER 2024</em>. https://doi.org/10.1145/3632620.3671116.</p>

<p id="ref-russo-2026" class="reference-entry">Russo, F., J. P. Sáenz, and L. De Russis. 2026. “Investigating Web Project Assessment in an AI World.” In <em>CHI EA '26</em>. https://doi.org/10.1145/3772363.3798887.</p>

<p id="ref-sankaranarayanan-2026" class="reference-entry">Sankaranarayanan, S. 2026. “Mitigating ‘Epistemic Debt’ in Generative AI-Scaffolded Novice Programming Using Metacognitive Scripts.” arXiv:2602.20206.</p>

<p id="ref-shihab-2025" class="reference-entry">Shihab, M. I. H., et al. 2025. “The Effects of GitHub Copilot on Computing Students' Programming Effectiveness, Efficiency, and Processes in Brownfield Programming Tasks.” In <em>Proceedings of ICER 2025</em>. https://doi.org/10.1145/3702652.3744219.</p>

<p id="ref-zimmerman-2000" class="reference-entry">Zimmerman, B. J. 2000. “Attaining Self-Regulation: A Social Cognitive Perspective.” In <em>Handbook of Self-Regulation</em>, 13–39. Academic Press. https://doi.org/10.1016/B978-012109890-2/50031-7.</p>

---

> _"The honest AI engineer does not lie to herself about her tools. She knows what they can and cannot do, and she designs her workflow to amplify their strengths."_
> — Tao of Development, `arch-037`
