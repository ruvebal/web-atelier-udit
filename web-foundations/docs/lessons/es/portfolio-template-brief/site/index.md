---
layout: lesson
title: 'Plantilla de Portfolio: Showcase y Recursos'
title_alt: 'Plantilla de Portfolio: Showcase y Recursos'
slug: portfolio-template-brief-site
date: 2025-11-19
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/portfolio-template-brief/site/
description: 'Página de aterrizaje para el proyecto final de plantilla de portfolio: resumen, enlaces clave y guía de uso para estudiantes y profesorado.'
tags: [final-project, portfolio, showcase, methodology]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## 1. Contexto: ¿qué es este sitio dentro del proyecto?

Esta página funciona como **punto de entrada** al ecosistema del proyecto final de portfolio:

- El **brief completo** del proyecto (requisitos, rúbrica, checklist).
- Los **planes de desarrollo** (para estudiantes y para IA) en ambos idiomas.
- Futuras iteraciones de **showcase visual** (parallax, glassmorphism, tipografía fluida, etc.) descritas en el plan.

Si el brief es el **contrato pedagógico**, esta página es el **mapa de navegación** para no perderse entre tantos PDFs mentales y pestañas del navegador.

---

## 2. Rutas para estudiantes

### 2.1. Leer primero: el brief del proyecto

- 🇪🇸 **Brief en español**
  `/lessons/es/portfolio-template-brief/challenge/`
  Archivo fuente: `lessons/es/portfolio-template-brief/challenge/index.md`

- 🇬🇧 **Brief en inglés**
  `/lessons/en/portfolio-template-brief/challenge/`
  Archivo fuente: `lessons/en/portfolio-template-brief/challenge/index.md`

Ahí encontrarás:

- Filosofía del proyecto (enseñar a pescar, no regalar el pez).
- Tres niveles técnicos (Vanilla, Bootstrap+GSAP, Tailwind+Vite).
- Requisitos comunes (repositorio, despliegue, accesibilidad, etc.).
- Rúbrica detallada y checklist de calidad profesional.

### 2.2. Plan de trabajo (sprints y estructura)

- 🇪🇸 **Plan del brief (ES)**
  `lessons/es/portfolio-template-brief/plan/index.md`

- 🇬🇧 **Plan del brief (EN)**
  `lessons/en/portfolio-template-brief/plan/index.md`

Estos documentos responden a la pregunta:
> «¿Cómo estructuramos el brief para que sea graduable, claro y alineado con las lecciones?»

### 2.3. Plan del showcase (para estudiantes curiosas y profes frikis)

- 🇪🇸 **Plan del showcase (ES)**
  `lessons/es/portfolio-template-brief/site/plan/index.md`

- 🇬🇧 **Plan del showcase (EN)**
  `lessons/en/portfolio-template-brief/site/plan/index.md`

Ahí se detalla cómo convertir esta página en un **showcase de diseño de nivel premios**, incluyendo:

- Refactorización de `site.css` hacia una arquitectura modular con archivo *barrel*.
- Hero con parallax, cards glassmorphism, tipografía fluida.
- Estrategia de inlining de CSS/JS para rendimiento.
- Prompt listo para usar con un agente de IA (Claude 4.5 recomendado).

---

## 3. Cómo usar esta página según tu rol

### 3.1. Estudiantes

1. **Lee el brief** en tu idioma preferido (`challenge/index.md`).
2. **Revisa el plan** correspondiente (`plan/index.md`) para entender cómo está estructurado el documento y la rúbrica.
3. Solo si quieres ir un paso más allá en diseño:
   - Curiosea el **plan del showcase** (`site/plan/index.md`) como ejemplo de documentación avanzada y colaboración con IA.
4. Para el desarrollo de tu portfolio:
   - Vuelve a las lecciones enlazadas (responsive, tipografía, GSAP, Tailwind, etc.).

No necesitas implementar todo lo descrito en el plan del showcase para aprobar:
piensa en él como **nivel «New Game+»** para quien quiera ir más allá.

### 3.2. Profesorado / investigadores en docencia

- Usa el brief y los planes como **artefactos de investigación docente**:
  - Cómo se documenta el uso de IA.
  - Cómo se alinean rúbricas, checklist y sprints.
- El plan del showcase (`site/plan/`) muestra:
  - Cómo pedir a la IA **arquitectura** y no solo trozos de código.
  - Cómo documentar riesgos, criterios de éxito y meta‑reflexión.
- Esta página (`site/index.md`) puede evolucionar hacia:
  - Un **índice vivo** de entregas estudiantiles.
  - Un **showroom** de plantillas de portfolio destacadas en futuras ediciones.

---

## 4. Relación con las lecciones del curso

El ecosistema de este proyecto se apoya explícitamente en las siguientes lecciones (en español):

- `/lessons/es/responsive/` — diseño responsive, fluido e intrínseco.
- `/lessons/es/web-animations/css/` — animaciones CSS (transiciones, keyframes, scroll‑driven).
- `/lessons/es/web-animations/gsap/` — animaciones avanzadas con GSAP.
- `/lessons/es/tipografia-color/` — sistema tipográfico fluido y color.
- `/lessons/es/modern-web-design-trends/` — tendencias modernas (parallax, glassmorphism, dark mode…).
- `/lessons/es/metadata-visual-identity-web/` — metadatos e identidad visual.
- `/lessons/es/linting-and-formatting/` — formateo, linting y estándares de calidad.
- `/lessons/es/bootstrap/final-project-deployment/` — despliegue de proyecto final con Bootstrap.
- `/lessons/es/tailwind/build-deploy/` — build y deploy con Tailwind + Vite.

Esta página no duplica esos contenidos, sino que los **orquesta** alrededor de un proyecto final graduable.

---

## 5. Futuras iteraciones de diseño (showcase)

El plan del showcase propone evolucionar esta página hacia un ejemplo de:

- **Hero con parallax** usando CSS moderno (`animation-timeline: scroll()`).
- **Cards glassmorphism** para mostrar rutas y recursos.
- **Tipografía fluida** con `clamp()` y escalas pensadas para lecciones largas.
- **Animaciones ligadas al scroll** que sigan `prefers-reduced-motion`.
- **Layouts intrínsecos** basados en CSS Grid (`auto-fit`, `minmax`) y container queries.

Por ahora, esta versión es deliberadamente **más sobria y textual**, priorizando:

- Claridad de rutas (qué leer primero, qué es opcional).
- Estabilidad del sitio Jekyll (sin introducir layouts nuevos sin testear).
- Una base sólida para próximas iteraciones con el alumnado y la IA.

Si en algún momento te descubres a las 3:00 ajustando un `box-shadow` del hero por tercera vez, considera esto tu recordatorio oficial para:

1. Hacer un commit.
2. Irte a dormir.
3. Apuntar la mejora como «versión 2.0» en el próximo curso.

---

## 6. Siguientes pasos sugeridos

- **Para ti (como estudiante):**
  - Marca en tu calendario cuándo vas a avanzar cada sprint del plan.
  - Elige tu stack (Vanilla, Bootstrap, Tailwind) y cíñete a su checklist.
  - Usa la IA solo siguiendo la metodología en dos fases, documentando tus planes.

- **Para ti (como profe / investigadora):**
  - Revisa si el lenguaje del brief y la rúbrica es claro para tu grupo.
  - Anota qué partes del plan funcionan en clase y cuáles habría que simplificar.
  - Usa el plan del showcase para documentar experimentos de diseño avanzado.

Esta página está pensada como un documento vivo: si algo no te resulta útil, dilo; si algo te ayuda mucho, documéntalo. Esa es, en el fondo, la esencia del atelier.


