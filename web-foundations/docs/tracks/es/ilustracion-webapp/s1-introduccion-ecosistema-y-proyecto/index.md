---
layout: lesson
title: 'La web como lienzo + planteamiento del proyecto'
title_alt: 'La web como lienzo + planteamiento del proyecto'
slug: ilustracion-webapp-s1
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/s1-introduccion-ecosistema-y-proyecto/
description: 'Primera sesión: entender la web como medio creativo, configurar el flujo Git/GitHub Pages y publicar un primer "Hello, Web" con tu ilustración.'
tags: [ilustracion, web, html, css, github, atelier]
status: borrador
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## ⏰ Duración estimada

3,5 horas (1 sesión)

## 🎯 Objetivos

- Entender **por qué la web es un medio creativo** para ilustradores: ubicuidad, acceso, iteración y publicación.
- Dominar el **mínimo técnico viable** para empezar: HTML/CSS básicos + un flujo de trabajo con Git.
- Arrancar el proyecto con un **primer resultado tangible**: sitio publicado el mismo día.
- Practicar el hábito ATELIER: **un commit por sesión**, con intención.

## 🧭 Antes de empezar

Esta sesión conecta y reutiliza contenido ya existente. Úsalo como "canon" para detalles y teoría:

- Entorno y GitHub Pages:
  - [Guía para Configurar un Entorno de Desarrollo Web]({{ '/lessons/es/entorno-de-desarrollo/' | relative_url }})
- HTML semántico + CSS básico (práctica guiada):
  - [Práctica: HTML semántico + Fundamentos de CSS]({{ '/lessons/es/html-css-basics/' | relative_url }})
- Metodología:
  - [Metodología ATELIER (ES)]({{ '/methodology/es/' | relative_url }})

## 道 Tao del desarrollo web (versión ATELIER)

En ATELIER, "aprender web" no es memorizar etiquetas: es **cultivar una práctica**.

- El código es un **material**.
- El commit es una **huella**.
- El sitio publicado es tu **exhibición**.

## 1) Exploración — La web como nuevo lienzo

- Observa ejemplos:
  - Portfolios de ilustradores.
  - Storytelling interactivo.
  - Webcomics y microsites.

Preguntas guía:

- ¿Qué cambia cuando una ilustración pasa de "imagen" a "interfaz"?
- ¿Qué gana tu trabajo con **navegación, tiempo, interacción**?

## 2) Conceptualización — Idea, audiencia y wireframe

Define en 10–15 líneas:

- **Qué vas a construir** (portfolio, landing de proyecto ilustrado, micro-app, etc.).
- **Para quién** (audiencia objetivo).
- **Qué debe poder hacer** un usuario al entrar (acciones/recorrido).

Wireframe mínimo (papel o digital):

- Header (marca/nombre)
- Sección hero (intención)
- Galería / proyectos
- Bio / contexto
- Contacto

## 3) Producción — Hello, Web (sitio publicado en día 1)

### Paso A — Crea tu repo (template)

- Usa el template estudiantil como base para no perder tiempo en setup:
  - `student-project-template` (referencia desde la lección de HTML/CSS)

Si necesitas guía detallada, sigue:

- [Guía para Configurar un Entorno de Desarrollo Web]({{ '/lessons/es/entorno-de-desarrollo/' | relative_url }})

### Paso B — Edita `index.html` con estructura mínima

Criterios:

- Usa estructura semántica (`<header>`, `<main>`, `<section>`, `<footer>`).
- Inserta **al menos una ilustración tuya** optimizada y con `alt` significativo.
- Mantén una jerarquía de encabezados coherente (`h1` → `h2` → `h3`).

Para una práctica paso a paso:

- [Práctica: HTML semántico + Fundamentos de CSS]({{ '/lessons/es/html-css-basics/' | relative_url }})

### Paso C — Primer commit (evidencia)

Haz un commit que cuente una historia:

- `feat: S1 - publica mi hello web con bio + primera ilustración`

## 4) Exhibición — Publica y comparte

- Activa GitHub Pages.
- Comparte en clase:
  - URL pública.
  - 1 captura de pantalla.
  - 1 frase: "qué quiero construir realmente".

## 5) Reflexión ATELIER (5–10 min)

- ¿Qué fue más difícil: el diseño, el texto, o el flujo Git?
- ¿Qué parte te dio más "confianza" al ver el sitio online?
- ¿Qué decisión de hoy te comprometes a mantener en S2?

## ✅ Entregable (al final de S1)

- URL del sitio publicado.
- Repo en GitHub.
- Wireframe (foto o archivo).
- Un commit final de sesión.

---

<table style="width: 100%; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
  <tr>
    <td style="text-align: left;">
      ← Anterior: <a href="{{ '/tracks/es/ilustracion-webapp/' | relative_url }}">Track: Ilustración Aplicada</a>
    </td>
    <td style="text-align: right;">
      Siguiente →: <a href="{{ '/tracks/es/ilustracion-webapp/s2-galerias-layouts-media/' | relative_url }}">S2: Galerías y layouts para tu arte</a>
    </td>
  </tr>
</table>
