---
layout: lesson
title: 'Desarrollo Web: Front-End I'
title_alt: 'Desarrollo Web: Front-End I'
slug: fei
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/fei/
description: 'Track anual del Grado en Desarrollo Full-Stack y Ciencia de Datos e IA (UDIT). Semestre 1: vanilla JS/CSS sin frameworks. Semestre 2: React moderno con IA asistida. 6 ECTS, 150 h totales (30 h laboratorio).'
tags: [frontend, html, css, javascript, react, accessibility, responsive, animation, 3d, udit, annual]
status: complete
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"Critical coding for a better living."_

> **Declaración de asistencia IA:** Este track integra desarrollo asistido por IA siguiendo la metodología docs-first. Planes, prompts e informes de implementación se documentan durante todo el proceso. La pedagogía está fundamentada en la experiencia de aula y la reflexión crítica sobre el rol de la IA en la educación.

---

{% include track-lang-switch.html track='fei' %}

## Cómo aprobar este curso

**Empieza aquí para calificación, entregables, calendario y normas de recuperación:** [Cómo aprobar Front-End I]({{ '/tracks/fei/how-to-pass-this-track/' | relative_url }}).

> **Nota sobre idioma de las lecciones:** Este índice y la guía de aprobación están en español. Las **Sesiones 1–13** del semestre 1 y la mayoría de lecciones React (S14–S27) están en `/lessons/es/…`. S17, S24, S28–S29 y el resto siguen la biblioteca canónica en inglés hasta traducción.

---

## 🎯 Visión pedagógica

<figure class="track-curriculum-figure">
<img src="{{ '/assets/images/track-curriculum/fei-pedagogical-vision-93720dab0138.svg' | relative_url }}" alt="Diagrama abstracto de la visión pedagógica de Front-End I: cuatro pilares orbitando un puente humano entre personas y sistemas." width="1200" height="640" loading="lazy" aria-describedby="fei-pedagogical-vision-caption">
<figcaption id="fei-pedagogical-vision-caption">
<p>Cuatro pilares — núcleo durable, IA declarada, accesibilidad como ética, rendimiento como respeto — orbitan la capa de interacción orientada a las personas.</p>
<p class="image-credit">Figura formula-led · fondo de recurrencia Julia · @ruvebal · visual-forger 1.1.0</p>
</figcaption>
</figure>

El desarrollo front-end es **la capa de interacción humana de la web** — no producción de sitios, sino **el puente entre personas y sistemas**. Este track forma desarrolladores que piensan críticamente su oficio, entienden el núcleo durable bajo frameworks volátiles y construyen interfaces que respetan tanto a quien las usa como a las máquinas que las renderizan.

Nuestra pedagogía descansa en cuatro pilares:

- **Núcleo durable, capa volátil** — La semántica HTML, los fundamentos CSS y los principios JavaScript forman la base estable; frameworks y herramientas son la superficie transitoria que aprendemos a navegar con criterio.
- **IA docs-first, declarada y verificada** — Los asistentes de IA se usan con transparencia: los planes preceden a la implementación, los prompts se documentan y todo el código se verifica contra el criterio humano.
- **Accesibilidad como ética, no como checklist** — WCAG se integra desde el inicio, no como parche final. Diseñamos para lectores de pantalla, teclado y usuarios neurodiversos porque el diseño inclusivo es diseño ético.
- **Rendimiento como respeto** — Interfaces rápidas y responsivas no son objetivos de optimización sino expectativas base. Consideramos los dispositivos y redes reales de quienes usan lo que construimos.

**¿Mejor vida para quién?** No solo para quien lee. El código que hace menos trabajo consume menos energía, y esa energía se convierte en calor — en un móvil, en un portátil, en un centro de datos. Ese coste no se queda en el dispositivo: aterriza en un clima compartido y, por tanto, en todo lo vivo. Somos seres tecnológicos; la frontera entre lo vivo y lo construido nunca fue limpia.

Por eso rendimiento y accesibilidad se enseñan aquí como **ética, no como optimización**. Una página más ligera y una página navegable con lector de pantalla son la misma pregunta formulada dos veces: ¿qué cuesta al mundo en el que corre, y quién paga?

---

## 📖 Panorama del curso

**Front-End I** es la asignatura anual de 6 ECTS (150 h totales, 30 h de laboratorio) de UDIT para los grados Full-Stack y Ciencia de Datos e IA. El track abarca dos semestres con una progresión clara:

- **Semestre 1** — JavaScript y CSS vanilla sin frameworks. Los estudiantes construyen una plantilla de portfolio en tres niveles (vanilla, Bootstrap+GSAP, Tailwind+Vite).
- **Semestre 2** — React moderno con desarrollo asistido por IA. Catorce sesiones desde filosofía hasta despliegue, proyecto individual capstone en React y presentación final.

### Arco anual

<figure class="track-curriculum-figure">
<img src="{{ '/assets/images/track-curriculum/fei-annual-arc-c4108e9214d6.svg' | relative_url }}" alt="Diagrama del arco anual de Front-End I: progresión vanilla del semestre 1 hacia capstone React y defensa final del semestre 2." width="1200" height="640" loading="lazy" aria-describedby="fei-annual-arc-caption">
<figcaption id="fei-annual-arc-caption">
<p>Arco anual — El semestre 1 construye fundamentos HTML, CSS y JavaScript vanilla; el semestre 2 avanza por sistemas React hasta capstone y defensa final.</p>
<p class="image-credit">Figura formula-led · fondo de recurrencia Julia · @ruvebal · visual-forger 1.1.0</p>
</figcaption>
</figure>

---

## 📚 Secuencia de sesiones

Este track sigue la secuencia curricular canónica: **29 puntos de contacto publicados** en ambos semestres, con asignación explícita de laboratorio que suma las 30 h oficiales.

{% if site.publication.publish_internal_metadata %}

<!-- curriculum-internal:
Sequence source: `web-foundations/docs/_data/tracks.yml`, key `fei`.
-->

{% endif %}

La carga oficial de 150 h es **10 h lección magistral + 30 h laboratorio + 14 h ejercicios individuales + 94 h estudio autónomo + 2 h evaluación**. Las columnas `Duración` y `Horas lab` son un mapa de secuencia, no dos cantidades que deban sumarse: el laboratorio es un modo formalmente asignado dentro de la carga del curso.

### Semestre 1 — Vanilla JS/CSS (13 sesiones)

| #   | Sesión                                                                                              | Duración | Horas lab | Descripción |
| --- | ---------------------------------------------------------------------------------------------------- | -------- | --------- | ----------- |
| S1  | [Configuración del entorno de desarrollo]({{ '/lessons/es/entorno-de-desarrollo/'                            | relative_url }}) | 2 h        | 1 h          | VS Code, Git/GitHub, extensiones, flujos básicos                  |
| S2  | [Primeros pasos: Git y flujo GitHub]({{ '/lessons/es/primeros-pasos/'                                       | relative_url }}) | 2 h        | 1 h          | Commits, ramas, pull requests, GitHub Pages                    |
| S3  | [HTML semántico + fundamentos CSS]({{ '/lessons/es/html-css-basics/'                                 | relative_url }}) | 3 h        | 1,5 h        | Semántica HTML5, selectores CSS, box model, tipografía             |
| S4  | [Tipografía y sistemas de color]({{ '/lessons/es/tipografia-color/'                                      | relative_url }}) | 2 h        | 1 h          | Tipografía fluida con clamp(), paletas accesibles          |
| S5  | [Diseño web intrínseco: container queries]({{ '/lessons/es/intrinsic-web-design/'                     | relative_url }}) | 2 h        | 1 h          | Container queries, subgrid, diseño responsivo por contexto       |
| S6  | [Pseudo-elementos y estilos por estado]({{ '/lessons/es/pseudo-elementos-y-estilos-de-estado/'          | relative_url }}) | 2 h        | 1 h          | :hover, :focus-visible, ::before/::after, interacción accesible |
| S7  | [Introducción a JavaScript]({{ '/lessons/es/js-intro/'                                                 | relative_url }}) | 3 h        | 1,5 h        | Fundamentos JS, tipos, control de flujo, modelo de eventos                 |
| S8  | [Manipulación del DOM: strings, APIs, plantillas]({{ '/lessons/es/js-dom-manipulation/'                   | relative_url }}) | 3 h        | 1 h          | innerHTML vs APIs nativas, seguridad XSS, patrones de actualización           |
| S9  | [Módulos JavaScript: modularidad ES6]({{ '/lessons/es/js-modules/'                                    | relative_url }}) | 2 h        | 1 h          | Historia de modularidad (IIFE → CommonJS → ES6), import/export     |
| S10 | [Linting y formateo: estándares profesionales]({{ '/lessons/es/linting-and-formatting/'              | relative_url }}) | 1,5 h      | 0,5 h        | Prettier, ESLint, Stylelint, HTMLHint configuration               |
| S11 | [GSAP: animación tipográfica y SVG]({{ '/lessons/es/gsap/overview/'                                   | relative_url }}) | 3 h        | 1,5 h        | Timelines GSAP, stagger, easing, ScrollTrigger                    |
| S12 | [Tendencias de diseño web moderno]({{ '/lessons/es/modern-web-design-trends/'                                | relative_url }}) | 2 h        | 1 h          | Parallax, glassmorphism, neumorphism, dark mode demos             |
| S13 | [Brief plantilla portfolio (proyecto semestre 1)]({{ '/lessons/es/portfolio-template-brief/challenge/' | relative_url }}) | 4 h        | 1,5 h        | Integrador semestral: portfolio en tres niveles           |
{: .track-session-table }

### Semestre 2 — React moderno (14 sesiones + proyecto + final)

| #   | Sesión                                                                                                        | Duración | Horas lab | Descripción |
| --- | -------------------------------------------------------------------------------------------------------------- | -------- | --------- | ----------- |
| S14 | [Filosofía y visión pedagógica]({{ '/lessons/es/react/modern-fe-intro/'                                      | relative_url }}) | 3 h                   | 1 h          | Mindset Tao Developer, Five Pillars, filosofía critical coding               |
| S15 | [Fundamentos de frameworks y comparativa]({{ '/lessons/es/react/frameworks-comparative/'                           | relative_url }}) | 4 h                   | 1,5 h        | React vs Vue vs Vanilla, matriz de decisión, setup Vite          |
| S16 | [Estado e interfaz: máquinas de estados finitos]({{ '/lessons/es/react/state-and-ui/'                                       | relative_url }}) | 3 h                   | 1,5 h        | Modelado FSM, taxonomía de estado, antipatrones                           |
| S17 | [Fundamentos de desarrollo asistido por IA]({{ '/lessons/en/react/ai-assisted-development-foundations/'              | relative_url }}) | 2 h                   | 0,5 h        | LLMs probabilísticos, contratos arquitectónicos, observabilidad       |
| S18 | [Fundamentos React: componentes y JSX]({{ '/lessons/es/react/react-fundamentals/'                              | relative_url }}) | 3 h                   | 1,5 h        | Componentes funcionales, JSX, props, eventos, renderizado                   |
| S19 | [Dominio de hooks: useState, useEffect, custom hooks]({{ '/lessons/es/react/react-hooks/'                         | relative_url }}) | 3 h                   | 1,5 h        | useState, useEffect, useRef, useMemo/useCallback, custom hooks                |
| S20 | [Arquitectura de estado: useReducer, Context, librerías externas]({{ '/lessons/es/react/react-state-architecture/' | relative_url }}) | 3 h                   | 1,5 h        | useReducer, Context API, Zustand/Redux Toolkit, árbol de decisión                 |
| S21 | [Routing y navegación: React Router v7]({{ '/lessons/es/react/react-routing/'                                  | relative_url }}) | 3 h                   | 1,5 h        | React Router v6/v7, rutas dinámicas, anidadas, protegidas           |
| S22 | [Integración backend: Fetch, React Query, GraphQL]({{ '/lessons/es/react/react-backend-integration/'           | relative_url }}) | 3 h                   | 1,5 h        | Fetch API, async, React Query caching/mutations, GraphQL             |
| S23 | [Autenticación: JWT, sesiones, seguridad]({{ '/lessons/es/react/react-authentication/'                         | relative_url }}) | 3 h                   | 1,5 h        | JWT, sesiones, OAuth, implementación segura, prevención XSS   |
| S24 | [Framework Mode + SSR auth + i18n (avanzado)]({{ '/lessons/en/react/react-framework-mode-auth-i18n/'           | relative_url }}) | 3 h                   | 1 h          | React Router v7 Framework Mode, SSR routes.js, auth server-side, :locale i18n |
| S25 | [Testing: Vitest, RTL, Cypress]({{ '/lessons/es/react/react-testing/'                                          | relative_url }}) | 2 h                   | 1 h          | Vitest, React Testing Library, E2E con Cypress        |
| S26 | [Rendimiento: memoización, code splitting, bundle]({{ '/lessons/es/react/react-performance/'          | relative_url }}) | 2 h                   | 1 h          | React DevTools Profiler, React.memo, lazy() + Suspense, análisis de bundle       |
| S27 | [Despliegue: Vercel, Netlify, CI/CD]({{ '/lessons/es/react/react-deployment/'                                  | relative_url }}) | 2 h                   | 1 h          | Build Vite, Vercel/Netlify, variables de entorno, GitHub Actions    |
| S28 | [Proyecto capstone individual en React]({{ '/lessons/en/react/geophysical-aggregator-project/'            | relative_url }}) | 3 semanas (individual) | 0 h          | App SSR con React Query, dos APIs públicas, i18n, auth, despliegue público      |
| S29 | [Presentación final y monografía]({{ '/lessons/en/react/final-presentation/'                                    | relative_url }}) | 2 h       | 0 h        | Demo en vivo, presentación técnica, monografía reflexiva                       |
{: .track-session-table }

---

## 🎯 Objetivos de aprendizaje

Al completar este track, el estudiantado podrá:

- **Dominar fundamentos front-end** — HTML5 semántico, CSS moderno y JavaScript ES6+ como núcleo durable
- **Construir interfaces interactivas** — Sin frameworks (semestre 1) y con React moderno (semestre 2)
- **Aplicar patrones de arquitectura escalables** — Desde estado local hasta Context/Redux y renderizado en servidor
- **Integrar sistemas reales** — APIs públicas, autenticación segura, internacionalización y despliegue CI/CD
- **Practicar desarrollo agéntico asistido por IA** — Metodología docs-first con contratos arquitectónicos, límites MCP (p. ej. Astro Docs MCP en FE II, shadcn MCP en React), reglas/skills de agente y validación crítica
- **Publicar aplicaciones profesionales** — Desde plantillas portfolio hasta dashboards con datos y optimización de rendimiento

---

## 📦 Entregables

### Entregables semestre 1

- **Proyecto plantilla portfolio** — Implementación progresiva en tres niveles:
  - Nivel 1 (Vanilla): HTML, CSS, JS vía CDN
  - Nivel 2 (Bootstrap+GSAP): Bootstrap 5 + animaciones GSAP vía CDN
  - Nivel 3 (Tailwind+Vite): Node/Vite, Tailwind, SPA con routing vanilla
- **[Análisis de sitios destacados (SOW)]({{ '/lessons/es/analisis-web/practica/' | relative_url }})** — Análisis crítico de al menos cuatro sitios premiados (página `/sow/`, metodología ATELIER, pitch ~10 min)
- **[Hackathon 404: «404s to Mars»]({{ '/lessons/en/404/hackathon/' | relative_url }})** — Sprint en equipo: página 404 temática Marte, desplegada en GitHub Pages (2 h en clase + ventana de refinamiento)
- **Repositorio GitHub** — Historial limpio, mensajes de commit significativos, README con enlace en vivo
- **Evidencia por sesión** — Commits, reflexiones ATELIER y demostración de conceptos

### Entregables semestre 2

- **Proyecto capstone individual React** — Integrador individual:
  - App React Router v7 Framework Mode desplegada en URL pública
  - Al menos dos APIs públicas alineadas con el brief vigente
  - React Query con `staleTime` e `initialData` SSR
  - Interfaz bilingüe (`/en/...`, `/es/...`) con locale resuelto en servidor
  - Autenticación con cookies httpOnly en al menos una ruta
  - Repositorio GitHub con `docs/plans/`, `docs/reports/` y declaración IA en README
- **Presentación final** — Demo en vivo (40 %), presentación técnica (15 %), monografía (20 %), calidad reflexiva (10 %)

---

## 📊 Evaluación

**Pesos oficiales FE I** (de `desarrollo-web-front-end-i-2025-2026.json`):

| Componente                                    | %   | Descripción                                                           |
| -------------------------------------------- | --- | --------------------------------------------------------------------- |
| Pruebas                                      | 30 % | Exámenes escritos de teoría y práctica             |
| Trabajos, entregables y proyectos | 60 % | Plantilla portfolio (sem. 1) + capstone React individual (sem. 2) |
| Portafolio de resolución de problemas       | 10 % | Resolución de problemas, ejercicios y reflexiones                    |
{: .track-evaluation-table}

**Desglose a nivel de track** (alineado con pesos institucionales y filosofía evaluativa):

- **Excelencia técnica (40 %)** — Calidad de código, arquitectura, despliegue, diseño responsivo, animaciones, semántica HTML, accesibilidad
- **Reflexión y documentación (35 %)** — Evidencia de proceso, declaración IA, logs de decisiones e iteraciones
- **Comprensión conceptual (25 %)** — Patrones, trade-offs y fundamentación arquitectónica

---

## 🛠️ Metodología

**ATELIER** (Exploración, Conceptualización, Producción, Exhibición, Reflexión) + **Desarrollo asistido por IA con validación crítica**

Cada sesión sigue el ciclo ATELIER:

1. **Exploración** — Observar patrones, investigar buenas prácticas, experimentar con herramientas
2. **Conceptualización** — Planificar el enfoque, definir criterios de éxito, documentar decisiones arquitectónicas
3. **Producción** — Implementar según el plan, usar asistentes IA con transparencia y metodología docs-first
4. **Exhibición** — Presentar el trabajo, demostrar funcionalidad, recibir feedback
5. **Reflexión** — Evaluar resultados, documentar aprendizajes, iterar tras la crítica

La asistencia IA sigue la **[Guía práctica de IA]({{ '/methodology/es/ai-practical-guide/' | relative_url }})**:

- **Docs-first** — Los planes preceden a la implementación; los prompts se documentan
- **Enfoque en dos fases** — Planificación (sin código) → Implementación (siguiendo el plan)
- **Archivos de contexto** — `project-brief.md` y similares como fuente única de verdad
- **Validación crítica** — Todo código generado por IA se revisa con criterio humano y estándares de accesibilidad

---

## 🔗 Recursos relacionados

- **[Declaración IA y rúbrica de defensa oral]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})** — Rúbrica compartida para declaraciones de uso de IA y defensas orales
- **[Secuencia docente React]({{ '/lessons/es/react/' | relative_url }})** — Currículo detallado del semestre 2 con grafo de dependencias
- **[Secuencia docente Astro]({{ '/lessons/en/astro/' | relative_url }})** — Continuación FE II: islands, SSR, Astro Docs MCP (avance para estudiantes del track anual)
- **[Brief plantilla portfolio]({{ '/lessons/en/portfolio-template-brief/plan/' | relative_url }})** — Especificaciones del proyecto del semestre 1
- **[Proyecto capstone React individual]({{ '/lessons/en/react/geophysical-aggregator-project/' | relative_url }})** — Brief del proyecto individual del semestre 2
- **[Track Front-End II]({{ '/tracks/feii/' | relative_url }})** — continuación del curso en 3.º curso
- **[Guía práctica de IA]({{ '/methodology/es/ai-practical-guide/' | relative_url }})** — Cuándo planificar, cómo declarar, qué debes defender
- **[Fundamentos de arquitectura]({{ '/methodology/es/ai-assisted-development-foundations/' | relative_url }})** — RPC, RAG, MVC como disciplina
- **[Guía docente oficial](https://udit.es)** — Documentación del curso en UDIT

---

## 📝 Notas

- **Base 3D** — El semestre 1 incluye contenido 3D introductorio (GSAP, tendencias de diseño) como semilla de la unidad 3D avanzada de FE II. FE II construye sobre esta base sin duplicarla.
- **Stack agéntico (avance FE II)** — El semestre 2 de FE I introduce MCP como límite en [Fundamentos de desarrollo asistido por IA]({{ '/lessons/en/react/ai-assisted-development-foundations/' | relative_url }}). FE II extiende con **Astro Docs MCP** en la [Unidad 2]({{ '/lessons/es/feii/unit-2-astro-fundamentals/' | relative_url }}).
- **Límite UX/UI** — Este track cubre práctica de implementación: estructura semántica, teclado, contraste y testing de accesibilidad. El curso dedicado UX/UI cubre investigación, arquitectura de información y la secuencia profunda de user testing.
- **Contexto inter-grado** — El track sirve a Full-Stack y Ciencia de Datos e IA. Las sinergias con Back-End II y Data Science se basan en contacto directo con el profesorado, no en verificación independiente de guías (los JSON oficiales pueden estar vacíos).
- **Territorio React** — Las 14 sesiones React del semestre 2, el proyecto individual y la presentación final son territorio exclusivo de FE I; FE II no debe repetir fundamentos/hooks/testing/despliegue básicos de React.

---

> _"Toda creación es recreación del principio original. El código, como la alquimia, transforma."_
