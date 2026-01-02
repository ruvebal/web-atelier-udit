---
layout: default
title: Diseño Web 2025 · Otoño
lang: es
term: 2025-fall
permalink: /2025-fall/es/
---

<div class="course-hero">
  <img src="{{ '/assets/icons/favicon.svg' | relative_url }}" alt="" class="course-hero__logo" aria-hidden="true" />
  <h1>{{ page.title }}</h1>
  <p class="semester">{{ site.data.courses[page.term].es.term }}</p>
  <p class="lead"><em>Critical Coding for a Better Living</em></p>
</div>

<div class="container prose">

## Bienvenida

Este es el sitio del curso de **{{ site.data.courses[page.term].es.course_name }}**. Aquí encontrarás:

- Enlaces a las lecciones canónicas
- El showroom de proyectos estudiantiles
- Calendario y entregas importantes

**Universidad:** {{ site.data.courses[page.term].es.university }}
**Profesor:** Rubén Vega Balbás, PhD
**ORCID:** [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)

---

## Lecciones

Las lecciones canónicas se encuentran en [Web Foundations]({{ site.data.courses[page.term].es.canonical_lessons_base }}).

<ul class="lessons-list">
  <li class="lesson-item">
    <span class="week">Semana 1</span>
    <a href="{{ site.data.courses[page.term].es.canonical_lessons_base }}/lessons/es/entorno-de-desarrollo/">
      Entorno de Desarrollo
    </a>
  </li>
  <li class="lesson-item">
    <span class="week">Semana 2</span>
    <a href="{{ site.data.courses[page.term].es.canonical_lessons_base }}/lessons/es/primeros-pasos/">
      Primeros Pasos con HTML
    </a>
  </li>
  <li class="lesson-item">
    <span class="week">Semana 3</span>
    <a href="{{ site.data.courses[page.term].es.canonical_lessons_base }}/lessons/es/tipografia-color/">
      Tipografía y Color
    </a>
  </li>
  <li class="lesson-item">
    <span class="week">Semana 4</span>
    <a href="{{ site.data.courses[page.term].es.canonical_lessons_base }}/lessons/es/responsive/">
      Diseño Responsive
    </a>
  </li>
  <li class="lesson-item">
    <span class="week">Semana 5</span>
    <a href="{{ site.data.courses[page.term].es.canonical_lessons_base }}/lessons/es/js-intro/">
      Introducción a JavaScript
    </a>
  </li>
  <li class="lesson-item">
    <span class="week">Semana 6+</span>
    <a href="{{ site.data.courses[page.term].es.canonical_lessons_base }}/lessons/es/">
      Ver Todas las Lecciones →
    </a>
  </li>
</ul>

---

## Proyectos Estudiantiles

{% include students-list-by-files.html lang='es' term='2025-fall' %}

---

## Calendario y Entregas

| Semana | Tema                    | Entrega                |
| ------ | ----------------------- | ---------------------- |
| 1      | Configuración y Entorno | Entorno listo          |
| 2      | Fundamentos HTML        | Brief de proyecto      |
| 3      | CSS y Diseño Visual     | Estilos iniciales      |
| 4      | Layout y Responsividad  | Metadatos del proyecto |
| 5      | Fundamentos JavaScript  | Lanzamiento showroom   |
| 6-10   | Framework y Componentes | Commits semanales      |
| 11     | Pulido y Testing        | Revisión de código     |
| 12     | Presentación Final      | Demo en vivo           |

---

## Recursos

- [Metodología ATELIER]({{ site.data.courses[page.term].es.canonical_lessons_base }}/methodology/es/)
- [Plantillas y Ejemplos]({{ site.data.courses[page.term].es.canonical_lessons_base }}/templates/)
- [Documentación del Curso](/docs/)

</div>
