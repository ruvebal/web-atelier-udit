---
layout: lesson
title: 'Interactividad + UX/UI básico: de imagen a experiencia'
title_alt: 'Interactividad + UX/UI básico: de imagen a experiencia'
slug: ilustracion-webapp-s4
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/s4-interactividad-ux-ui/
description: 'Cuarta sesión: añadir movimiento, interacción y pruebas rápidas de usabilidad. JavaScript mínimo viable + UX básico para ilustradores.'
tags: [javascript, ux, ui, interactividad, accesibilidad, atelier, ilustracion]
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

- Entender que "bonito" no siempre es "usable": introducir **UX 101**.
- Añadir **al menos una interacción real** al proyecto (sin complejidad innecesaria).
- Practicar interactividad en tres capas:
  - CSS (estados, transiciones).
  - Componentes (Bootstrap JS, si aplica).
  - JS mínimo viable (DOM + eventos).
- Hacer **testing rápido** con pares y mejorar iterando.

## 🧭 Canon (contenido ya existente para ampliar)

- JavaScript base:
  - [Introducción a JS]({{ '/lessons/es/js-intro/' | relative_url }})

- DOM y eventos:
  - [JS: DOM Manipulation]({{ '/lessons/es/js-dom-manipulation/' | relative_url }})

- Interactividad con Bootstrap (si tu proyecto usa Bootstrap):
  - [Bootstrap: Interactividad y Componentes JavaScript]({{ '/lessons/es/bootstrap/interactivity-js-components/' | relative_url }})

- Estados visuales (sin JS):
  - [Pseudo-elementos y estilos de estado]({{ '/lessons/es/pseudo-elementos-y-estilos-de-estado/' | relative_url }})

- Animación (si quieres ir un paso más):
  - [Animaciones Web con CSS – De lo Básico a lo Avanzado]({{ '/lessons/es/web-animations/css/' | relative_url }})
  - [Dominio de Animaciones GSAP – De Cero a Producción]({{ '/lessons/es/web-animations/gsap/' | relative_url }})

## 道 Tao de la interactividad

Una interfaz no "se mueve" para entretener: se mueve para **comunicar**.

- El estado comunica disponibilidad.
- La transición comunica continuidad.
- El feedback comunica respeto por el usuario.

## 1) UX 101 para ilustradores (20–30 min)

### Tres principios prácticos

- **Jerarquía**: ¿qué es lo primero que quieres que el usuario vea/haga?
- **Flujo**: ¿qué camino recorre el usuario?
- **Acción**: ¿cómo le indicas "qué hacer" sin explicarlo con texto largo?

Ejercicio corto:

- En parejas, navega un sitio de referencia y responde:
  - ¿encuentras rápido el portfolio/galería?
  - ¿la navegación es evidente?
  - ¿hay fricción en móvil?

## 2) Interactividad sin JavaScript (CSS-first)

Añade en tu proyecto:

- Estados en links y botones:
  - `hover`, `focus-visible`, `active`.
- Transiciones suaves:
  - `transition`, `transform`.

Referencia:

- [Pseudo-elementos y estilos de estado]({{ '/lessons/es/pseudo-elementos-y-estilos-de-estado/' | relative_url }})

## 3) JavaScript mínimo viable (DOM + eventos)

El objetivo hoy no es "aprender JS entero", sino **perder el miedo** y hacer algo útil.

### Interacciones sugeridas para ilustradores (elige 1)

- **Modo oscuro** (toggle de clase en `body`).
- **Lightbox para galería**: abrir imagen en modal (ideal para mostrar tu arte en grande).
- **Menú móvil**: abrir/cerrar navegación.
- **Filtro simple**: mostrar/ocultar proyectos por categoría o técnica.

Apóyate en:

- [Introducción a JS]({{ '/lessons/es/js-intro/' | relative_url }})
- [JS: DOM Manipulation]({{ '/lessons/es/js-dom-manipulation/' | relative_url }})

## 4) Si usas Bootstrap: interactividad sin escribir JS "desde cero"

Bootstrap permite interacciones con `data-*`.

- Modales para imágenes (lightbox de tu galería).
- Carruseles (para mostrar series de ilustraciones).
- Dropdowns.

Referencia:

- [Bootstrap: Interactividad y Componentes JavaScript]({{ '/lessons/es/bootstrap/interactivity-js-components/' | relative_url }})

## 5) Taller ATELIER — Handson interactividad (60–90 min)

Estrategia recomendada:

- Implementa rápido una primera versión.
- Prueba en móvil.
- Ajusta accesibilidad.
- Haz commit.

## 6) Testing de usabilidad rápida (parejas)

Ritual:

- Tu compañerx entra como "usuario nuevo".
- Tarea: "encuentra 2 proyectos y dime cuál te gusta más y por qué".
- Observa sin justificar.
- Apunta 3 fricciones.

Itera con cambios pequeños.

## 7) Exhibición — Demo final (5 min)

Comparte:

- La interacción (cómo se usa).
- Qué problema resuelve.
- Qué mejoraste tras el test.

## ✅ Entregable (al final de S4)

- Proyecto con al menos 1 interacción implementada (lightbox, filtro, menú, etc.).
- Evidencia de test (3 bullets de feedback + 3 ajustes).
- Un commit final de sesión.
- Sitio listo para presentar como portfolio de ilustración.

---

<table style="width: 100%; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
  <tr>
    <td style="text-align: left;">
      ← Anterior: <a href="{{ '/tracks/es/ilustracion-webapp/s3-maquetacion-responsive-frameworks/' | relative_url }}">S3: Maquetación responsive con Bootstrap + Tailwind</a>
    </td>
    <td style="text-align: right;">
      Siguiente →: <a href="{{ '/tracks/es/ilustracion-webapp/' | relative_url }}">Track: Ilustración Aplicada</a> 🎉
    </td>
  </tr>
</table>
