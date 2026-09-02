---
layout: lesson
title: 'Front-End II — Desarrollo Web: Front-End II'
title_alt: 'Front-End II — Desarrollo Web: Front-End II'
slug: feii-track
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/feii/
description: 'Track semestral del Grado en Desarrollo Full-Stack y Ciencia de Datos e IA (UDIT). Arquitectura de producción, PWA, testing, performance, 3D e IoT/robotics. 6 ECTS, 150 h totales (30 h laboratorio).'
tags: [frontend, astro, pwa, testing, performance, r3f, iot, python, udit, production-architecture, annual]
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

{% include track-lang-switch.html track='feii' %}

## Cómo aprobar este curso

**Empieza aquí para calificación, entregables, calendario y normas de recuperación:** [Cómo aprobar Front-End II]({{ '/tracks/feii/how-to-pass-this-track/' | relative_url }}).

> **Nota sobre idioma de las lecciones:** Este índice y la guía de aprobación están en español. Las **Unidades 1–4** están en `/lessons/es/feii/…`. El resto sigue la biblioteca canónica en inglés hasta que se publique traducción.

---

## 🎯 Visión pedagógica

<figure class="track-curriculum-figure">
<img src="{{ '/assets/images/track-curriculum/feii-pedagogical-vision-628a179fe8d0.svg' | relative_url }}" alt="Diagrama abstracto de la visión pedagógica de Front-End II: capa de interfaz expandiéndose del navegador al 3D e IoT, con cuatro pilares." width="1200" height="640" loading="lazy" aria-describedby="feii-pedagogical-vision-caption">
<figcaption id="feii-pedagogical-vision-caption">
<p>Pedagogía system-first — el modelo de componentes se mantiene estable mientras el contexto de despliegue se expande a interfaces espaciales, dispositivos y servicios Python.</p>
<p class="image-credit">Figura formula-led · fondo de recurrencia Julia · @ruvebal · visual-forger 1.1.0</p>
</figcaption>
</figure>

Front-End II es la transición de construir interfaces a construir **sistemas de interfaces**. Donde FE I enseñó a pensar component-first, FE II enseña system-first: arquitectura de producción, resiliencia offline, testing automatizado, ingeniería de rendimiento y la frontera de la capa de interfaz más allá del navegador (3D, IoT/robotics, servicios con backend Python).

Nuestra pedagogía descansa en cuatro pilares:

- **Núcleo durable, capa volátil** — El modelo de componentes (props, state, hooks) es la base estable; frameworks y targets de renderizado (DOM, WebGL, APIs de dispositivo) son la superficie transitoria.
- **IA docs-first, declarada y verificada** — Planes antes de código, prompts documentados, verificación humana de todo lo generado.
- **Rendimiento como respeto** — Core Web Vitals, presupuestos de performance y optimización como expectativa base del desarrollo profesional.
- **Pensamiento capa-interfaz** — La interfaz se extiende más allá del navegador: espacial (3D), dispositivos físicos (IoT/robotics) y servicios backend (Python). El modelo de componentes se mantiene; cambia el contexto de despliegue.

**¿Mejor vida para quién?** Front-End II sube la apuesta: un shader corre cada frame, un stream en tiempo real no duerme, una dependencia de terceros viaja a cada visitante. Los presupuestos de la Unidad 7 no son un ejercicio de puntuación — son el hábito de preguntar, antes de añadir algo, **qué cuesta al mundo en el que corre y quién paga.** La accesibilidad formula la misma pregunta sobre quién queda fuera.

---

## 📖 Panorama del curso

**Front-End II** es la asignatura semestral de 6 ECTS (150 h totales, 30 h de laboratorio) de UDIT para Full-Stack y Ciencia de Datos e IA. La carga formal es **10 h lección magistral + 30 h laboratorio + 14 h ejercicios individuales + 94 h estudio autónomo + 2 h evaluación**. El track abarca 12 unidades organizadas en torno a arquitectura de producción y expansión de la capa de interfaz:

- **Unidades 1–3** — Arquitectura de producción con meta-framework Astro (SSR, islands, micro-frontends)
- **Unidad 4** — PWA y capacidades offline (service workers, estrategias de caché)
- **Unidades 5–6** — Estrategia de testing y revisión de código asistida por IA (Testing Trophy, CI/CD, human-in-the-loop)
- **Unidad 7** — Ingeniería de rendimiento (Core Web Vitals, presupuestos, optimización de bundles)
- **Unidades 8–9** — Estética 3D y shader literacy (React Three Fiber, GLSL, post-processing)
- **Unidad 10** — Panel de control IoT/robotics con interfaz respaldada por Python (WebSocket, APIs de dispositivo)
- **Unidades 11–12** — Integración capstone y defensa oral (evidencia de proceso, declaración IA, ejes verify/narrate)

### Arco semestral

<figure class="track-curriculum-figure">
<img src="{{ '/assets/images/track-curriculum/feii-semester-arc-0d22fb4d25eb.svg' | relative_url }}" alt="Diagrama del arco semestral de Front-End II: Kickoff, Astro, PWA, testing, performance, 3D, IoT, capstone y defensa en doce unidades." width="1200" height="640" loading="lazy" aria-describedby="feii-semester-arc-caption">
<figcaption id="feii-semester-arc-caption">
<p>Arco de doce unidades — Kickoff → Astro → PWA → Testing → Performance → 3D/Shaders → IoT/Python → Capstone → Defensa.</p>
<p class="image-credit">Figura formula-led · fondo de recurrencia Julia · @ruvebal · visual-forger 1.1.0</p>
</figcaption>
</figure>

---

## 📚 Secuencia de sesiones

Este track sigue la secuencia curricular canónica: 12 sesiones en el semestre, con asignación explícita de laboratorio que suma las 30 h oficiales. Las ventanas listadas orientan la secuencia; no se suman a las actividades formativas formales de arriba.

{% if site.publication.publish_internal_metadata %}

<!-- curriculum-internal:
Sequence source: `web-foundations/docs/_data/tracks.yml`, key `feii`.
-->

{% endif %}

### FE II — Arquitectura de producción y frontera capa-interfaz (12 sesiones)

| #   | Sesión                                                                                                            | Duración | Horas lab | Descripción |
| --- | ------------------------------------------------------------------------------------------------------------------ | -------- | --------- | ----------- |
| U1  | [Kickoff: de React FE I a arquitectura de producción]({{ '/lessons/es/feii/unit-1-kickoff/'                        | relative_url }}) | 2 h        | 0 h          | Sistema distribuido de interfaces: edge, vector cuatripartito, frontera |
| U2  | [Meta-framework Astro — Islas y SSR]({{ '/lessons/es/feii/unit-2-astro-fundamentals/'               | relative_url }}) | 3 h        | 2 h          | Astro, content-first, SSR vs SSG, multi-framework    |
| U3  | [Astro avanzado e integración multi-framework]({{ '/lessons/es/feii/unit-3-astro-advanced/'           | relative_url }}) | 3 h        | 2 h          | Content collections, routing i18n (obligatorio), data fetching, micro-frontends |
| U4  | [Progressive Web Apps y capacidades offline]({{ '/lessons/es/feii/unit-4-pwa-offline/'                            | relative_url }}) | 2 h        | 2 h          | Service workers, caché, web app manifest             |
| U5  | [Estrategia de testing — suite que justifique su coste]({{ '/lessons/en/feii/unit-5-testing-strategy/'          | relative_url }}) | 3 h        | 3 h          | Qué _no_ testear, flakiness, presupuestos CI, contract testing       |
| U6  | [Revisión de código asistida por IA — human-in-the-loop]({{ '/lessons/en/feii/unit-6-ai-code-review/'         | relative_url }}) | 3 h        | 3 h          | PRs GitHub, log aceptar/rechazar/escalar, aprobación humana |
| U7  | [Ingeniería de rendimiento — Core Web Vitals]({{ '/lessons/en/feii/unit-7-performance/'               | relative_url }}) | 2 h        | 2 h          | Core Web Vitals, presupuestos, optimización de bundles         |
| U8  | [React Three Fiber — interfaces 3D con patrones React]({{ '/lessons/en/feii/unit-8-r3f-fundamentals/'             | relative_url }}) | 3 h        | 3 h          | Componentes 3D declarativos, estado en 3D, raycasting                |
| U9  | [Shader literacy y estética de interfaz de vanguardia]({{ '/lessons/en/feii/unit-9-shader-literacy/'                | relative_url }}) | 3 h        | 3 h          | GLSL básico, shaders custom, post-processing              |
| U10 | [Panel IoT/robotics e interfaz con backend Python]({{ '/lessons/en/feii/unit-10-iot-python-backend/'           | relative_url }}) | 2 h        | 4 h          | APIs de dispositivo, WebSocket, integración FastAPI                |
| U11 | [Integración capstone — evidencia de proceso y declaración IA]({{ '/lessons/en/feii/unit-11-capstone-integration/' | relative_url }}) | 3 h        | 3 h          | Documentación de proceso, declaración IA, ejes verify/narrate        |
| U12 | [Defensa oral capstone y evaluación final]({{ '/lessons/en/feii/unit-12-capstone-defence/'                         | relative_url }}) | 2 h       | 3 h        | Estructura de presentación, criterios, Q&A                  |
{: .track-session-table }

**Total horas de laboratorio:** 30 h (coincide con la asignación oficial de `ACTIVIDADES FORMATIVAS`)

---

## 🎯 Objetivos de aprendizaje

Al completar este track, el estudiantado podrá:

- **Dominar arquitectura de producción** — Meta-frameworks (Astro), SSR/SSG, micro-frontends e islands architecture
- **Construir aplicaciones PWA** — Service workers, offline e instalabilidad
- **Aplicar estrategias de testing profesionales** — Testing Trophy, CI/CD y revisión de código asistida por IA
- **Ingeniería de rendimiento** — Core Web Vitals, presupuestos y optimización de bundles
- **Extender a interfaces 3D** — React Three Fiber, shader literacy y post-processing
- **Consumir servicios IoT/robotics y Python** — WebSocket, APIs de dispositivo e integración backend
- **Documentar evidencia de proceso** — Logs de decisiones, iteraciones y declaraciones de uso de IA
- **Presentar trabajo técnico** — Estructura de defensa oral, preguntas basadas en diffs y criterios de evaluación

---

## 📦 Entregables

### Entrega 1 (unidades 2–6)

- **Proyecto arquitectónico Astro** — Content collections, **routing i18n de Astro (es + en, obligatorio)**, islands, integración multi-framework
- **Estrategia de testing** — Unit (Vitest), component (RTL), E2E (Playwright), pipeline CI/CD
- **Revisión de código asistida por IA** — Workflow GitHub Actions con herramientas de revisión IA y proceso human-in-the-loop

### Entrega 2 (unidades 8–10)

- **Interfaz 3D con R3F** — Componentes 3D declarativos, raycasting interactivo, animación
- **Efectos shader** — Shaders GLSL custom, post-processing (bloom, aberración cromática)
- **Panel de control IoT/robotics** — Datos en tiempo real vía WebSocket, backend Python FastAPI, control de dispositivos

### Entrega 3 / Examen final (unidades 11–12)

- **Proyecto capstone** — Integración de todas las unidades en un sistema coherente
- **Evidencia de proceso** — decisions.md, iterations.md, AI_USE_DECLARATION.md
- **Defensa oral** — Presentación de 15 minutos con walkthrough de diffs, Q&A y demo en vivo

---

## 📊 Evaluación

**Pesos FE II** (reconciliados con guía oficial y Fase 3):

| Componente                                    | %   |
| -------------------------------------------- | --- |
| Pruebas                                      | 30 % |
| Trabajos, entregables y proyectos | 60 % |
| Portafolio de resolución de problemas       | 10 % |
{: .track-evaluation-table}

**Desglose a nivel de track** (alineado con pesos institucionales y filosofía evaluativa):

- **Excelencia técnica (40 %)** — Calidad de código, arquitectura, implementación, rendimiento
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
- **[Track Front-End I]({{ '/tracks/fei/' | relative_url }})** — curso prerrequisito; FE II abre donde FE I cierra
- **[Guía práctica de IA]({{ '/methodology/es/ai-practical-guide/' | relative_url }})** — Cuándo planificar, cómo declarar, qué debes defender
- **[Fundamentos de arquitectura]({{ '/methodology/es/ai-assisted-development-foundations/' | relative_url }})** — RPC, RAG, MVC como disciplina
- **[Guía docente oficial](https://udit.es)** — Documentación del curso en UDIT

---

## 📝 Notas

- **Decisión meta-framework** — Astro seleccionado para unidades 2–3 por filosofía content-first e islands architecture. Decisión tomada al inicio de la Fase 2.
- **3D como transfer capa-interfaz** — Las unidades 8–9 enseñan 3D como ejercicio de transferencia del modelo component/state a interfaces espaciales. No es un curso de gráficos sino aplicación de patrones React a WebGL.
- **IoT/robotics load-bearing** — La unidad 10 es estructural: payoff directo para estudiantes Full-Stack y Data Science. La Entrega 2 usa primero el contrato de laboratorio publicado; cualquier integración posterior con Back-End II debe ser compatible o documentada como cambio versionado.
- **Cero solapamiento FE I** — No se repiten fundamentos React, hooks, routing ni despliegue básico de FE I.
- **Límite de evidencia** — La secuencia docente de transfer de interfaz en unidades 8–10 es un piloto declarado. El curso aporta un contrato de laboratorio ejecutable; no afirma validación empírica previa para esta cohorte.

---

> _"La capa de interfaz se expande más allá del navegador. Tu código también debería."_
