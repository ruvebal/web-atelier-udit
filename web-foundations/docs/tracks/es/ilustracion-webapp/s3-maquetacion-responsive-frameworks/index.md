---
layout: lesson
title: 'Maquetación responsive con Bootstrap + Tailwind (sin build)'
title_alt: 'Maquetación responsive con Bootstrap + Tailwind (sin build)'
slug: ilustracion-webapp-s3
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/s3-maquetacion-responsive-frameworks/
description: 'Tercera sesión: dar forma visual al proyecto con maquetación responsive, componentes y branding personal usando frameworks CSS de forma pragmática.'
tags: [responsive, bootstrapcss, tailwindcss, accesibilidad, diseno, ilustracion]
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

- Convertir tu galería en una **página multi-sección** con jerarquía visual clara.
- Diseñar **mobile-first** y verificar la experiencia en móvil / tablet / desktop.
- Introducir frameworks CSS de forma pragmática:
  - Bootstrap para **grid + componentes**.
  - Tailwind para **retoques utilitarios** (opcional).
- Aplicar "**accesibilidad por defecto**": contraste, tipografía legible, `alt`, foco.

## 🧭 Canon (contenido ya existente para ampliar)

Para detalles y teoría profunda, enlaza aquí (sin duplicar):

- Teoría extensa (sin frameworks):
  - [Diseño Web: Responsive, Fluido e Intrínseco]({{ '/lessons/es/responsive/' | relative_url }})
  - [Animaciones Web con CSS – De lo Básico a lo Avanzado]({{ '/lessons/es/web-animations/css/' | relative_url }})
  - [Dominio de Animaciones GSAP – De Cero a Producción]({{ '/lessons/es/web-animations/gsap/' | relative_url }})

- Bootstrap (si decides seguir el camino Bootstrap):
  - [Bootstrap CSS: Configuración y Fundamentos]({{ '/lessons/es/bootstrap/setup-and-fundamentals/' | relative_url }})
  - [Bootstrap CSS: Sistema de Rejilla y Contenedores]({{ '/lessons/es/bootstrap/layout-grid-containers/' | relative_url }})
  - [Bootstrap CSS: Componentes y Patrones de UI]({{ '/lessons/es/bootstrap/components-navbar-cards/' | relative_url }})

- Tailwind (si decides profundizar el camino Tailwind):
  - [Tailwind CSS: Configuración y Fundamentos]({{ '/lessons/es/tailwind/setup-and-fundamentals/' | relative_url }})

- Identidad y metadatos (branding para web):
  - [Identidad Visual + Metadatos para Web]({{ '/lessons/es/metadata-visual-identity-web/' | relative_url }})

## 1) Exploración — ¿Qué hace que un portfolio "se sienta pro"?

Analiza 2 sitios:

- 1 portfolio de ilustrador.
- 1 landing de producto digital.

Checklist:

- ¿Qué sección ves primero y por qué?
- ¿Cómo se navega en móvil?
- ¿Hay suficiente contraste?
- ¿Cómo se presentan imágenes (tamaño, ritmo, grilla)?

## 2) Conceptualización — Arquitectura de página (sin perder tu voz)

Define tu "stack visual" en una frase:

- "Mi web se siente como _______ (editorial / cómic / museo / fanzine / app)."

Define la arquitectura mínima:

- Header + navegación
- Hero (con tu mejor ilustración)
- Galería principal (de S2)
- Bio / statement
- CTA / contacto

## 3) Producción — Maquetación responsive (en 60–90 min)

### Opción recomendada: Bootstrap (CDN)

Bootstrap funciona muy bien en un contexto de tiempo limitado.

- Objetivo técnico mínimo:
  - Usar `container`, `row`, `col-*` para estructurar.
  - Al menos 1 componente:
    - navbar, cards, o carousel (para mostrar tu arte).

Profundiza aquí si lo necesitas:

- [Bootstrap CSS: Sistema de Rejilla y Contenedores]({{ '/lessons/es/bootstrap/layout-grid-containers/' | relative_url }})

### Opción complementaria: Tailwind para retoques

Si quieres personalizar rápido sin escribir CSS largo:

- Úsalo para:
  - spacing
  - tipografía
  - estados (`hover`, `focus-visible`)

Para interactividad de estados (sin JS):

- [Tailwind: Estado e Interactividad]({{ '/lessons/es/tailwind/state-interactivity/' | relative_url }})

## 4) Branding personal — color, tipografía y ritmo

Checklist de decisiones (no infinitas, pocas y consistentes):

- 1 paleta (2–3 colores core que reflejen tu estilo de ilustración).
- 1 tipografía de títulos + 1 tipografía de texto.
- 1 escala de espaciado (ritmo vertical consistente).

Guía recomendada:

- [Identidad Visual + Metadatos para Web]({{ '/lessons/es/metadata-visual-identity-web/' | relative_url }})

## 5) Accesibilidad por defecto (micro-hábitos)

- `alt` descriptivo en imágenes (ya lo practicaste en S2).
- Contraste texto/fondo suficiente.
- Tamaño de fuente legible.
- `:focus-visible` visible en links/botones.

## 6) Exhibición — Demo rápida (5 min)

Comparte:

- Vista móvil (DevTools).
- Vista desktop.
- 1 decisión de diseño que defendiste.

## 7) Reflexión ATELIER

- ¿Qué ganaste usando framework? ¿Qué perdiste?
- ¿Qué parte de tu "voz" visual se conservó?
- ¿Qué interacción te gustaría añadir en S4?

## ✅ Entregable (al final de S3)

- Sitio multi-sección responsive con tu galería integrada.
- Un componente integrado (Bootstrap o equivalente).
- Un commit final de sesión.
- Nota breve (en README o en un issue): "mi idea de interactividad para S4".

<table style="width: 100%; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
  <tr>
    <td style="text-align: left;">
      ← Anterior: <a href="{{ '/tracks/es/ilustracion-webapp/s2-galerias-layouts-media/' | relative_url }}">S2: Galerías y layouts para tu arte</a>
    </td>
    <td style="text-align: right;">
      Siguiente →: <a href="{{ '/tracks/es/ilustracion-webapp/s4-interactividad-ux-ui/' | relative_url }}">S4: Interactividad + UX/UI básico</a>
    </td>
  </tr>
</table>
