---
layout: default
title: Web Design 2025 · Fall
lang: en
term: 2025-fall
permalink: /2025-fall/en/
---

<div class="course-hero">
  <img src="{{ '/assets/icons/favicon.svg' | relative_url }}" alt="" class="course-hero__logo" aria-hidden="true" />
  <h1>{{ page.title }}</h1>
  <p class="semester">{{ site.data.courses[page.term].en.term }}</p>
  <p class="lead"><em>Critical Coding for a Better Living</em></p>
</div>

<div class="container prose">

## Welcome

This is the course site for **{{ site.data.courses[page.term].en.course_name }}**. Here you'll find:

- Links to canonical lessons
- Student project showroom
- Schedule and important deliverables

**University:** {{ site.data.courses[page.term].en.university }}
**Professor:** Rubén Vega Balbás, PhD
**ORCID:** [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)

---

## Lessons

Canonical lessons are located in [Web Foundations]({{ site.data.courses[page.term].en.canonical_lessons_base }}).

<ul class="lessons-list">
  <li class="lesson-item">
    <span class="week">Week 1</span>
    <a href="{{ site.data.courses[page.term].en.canonical_lessons_base }}/lessons/en/development-environment/">
      Development Environment
    </a>
  </li>
  <li class="lesson-item">
    <span class="week">Week 2</span>
    <a href="{{ site.data.courses[page.term].en.canonical_lessons_base }}/lessons/en/first-steps/">
      First Steps with HTML
    </a>
  </li>
  <li class="lesson-item">
    <span class="week">Week 3</span>
    <a href="{{ site.data.courses[page.term].en.canonical_lessons_base }}/lessons/en/typography-color/">
      Typography & Color
    </a>
  </li>
  <li class="lesson-item">
    <span class="week">Week 4</span>
    <a href="{{ site.data.courses[page.term].en.canonical_lessons_base }}/lessons/en/responsive/">
      Responsive Design
    </a>
  </li>
  <li class="lesson-item">
    <span class="week">Week 5</span>
    <a href="{{ site.data.courses[page.term].en.canonical_lessons_base }}/lessons/en/js-intro/">
      Introduction to JavaScript
    </a>
  </li>
  <li class="lesson-item">
    <span class="week">Week 6+</span>
    <a href="{{ site.data.courses[page.term].en.canonical_lessons_base }}/lessons/en/">
      View All Lessons →
    </a>
  </li>
</ul>

---

## Student Projects

{% include students-list-by-files.html lang='en' term='2025-fall' %}

---

## Schedule & Deliverables

| Week | Topic                   | Deliverable           |
| ---- | ----------------------- | --------------------- |
| 1    | Setup & Environment     | Dev environment ready |
| 2    | HTML Foundations        | Project brief         |
| 3    | CSS & Visual Design     | Initial styles        |
| 4    | Layout & Responsiveness | Project metadata      |
| 5    | JavaScript Basics       | Showroom launch       |
| 6-10 | Framework & Components  | Weekly commits        |
| 11   | Polish & Testing        | Code review           |
| 12   | Final Presentation      | Live demo             |

---

## Resources

- [ATELIER Methodology]({{ site.data.courses[page.term].en.canonical_lessons_base }}/methodology/en/)
- [Templates & Examples]({{ site.data.courses[page.term].en.canonical_lessons_base }}/templates/)
- [Course Documentation](/docs/)

</div>
