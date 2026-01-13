---
layout: lesson
title: 'Galerías y layouts para tu arte'
title_alt: 'Galerías y layouts para tu arte'
slug: ilustracion-webapp-s2
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/s2-galerias-layouts-media/
description: 'Segunda sesión: construir galerías de imágenes y layouts que muestren tu trabajo con ritmo visual y jerarquía. Enfoque en media, grids y presentación de arte.'
tags: [ilustracion, web, media, grid, galeria, layout, css, responsive]
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

- Construir **galerías de imágenes** que presenten tu trabajo con ritmo y jerarquía.
- Dominar **CSS Grid y Flexbox** para layouts de portfolio.
- Optimizar imágenes para web (formatos, tamaños, `alt`).
- Aplicar principios de **diseño intrínseco** para que tu galería se adapte a cualquier pantalla.

## 🧭 Canon (contenido ya existente para ampliar)

Para detalles y teoría profunda, enlaza aquí (sin duplicar):

- Media y contenido audiovisual:
  - [Media: Video y contenido audiovisual]({{ '/lessons/es/media/video/' | relative_url }})
  - [El Tao de las imágenes en movimiento]({{ '/lessons/es/media/video/the-tao-of-moving-images/' | relative_url }})

- Layouts y grids:
  - [Diseño Web: Responsive, Fluido e Intrínseco]({{ '/lessons/es/responsive/' | relative_url }})
  - [Diseño Intrínseco Web]({{ '/lessons/es/intrinsic-web-design/' | relative_url }})

## 1) Exploración — ¿Cómo presentan su arte otros ilustradores?

Analiza 2–3 portfolios de ilustradores:

- ¿Usan grillas regulares o layouts asimétricos?
- ¿Cómo manejan el ritmo visual (tamaños, espacios)?
- ¿Qué pasa con las imágenes en móvil?

Checklist:

- ¿Las imágenes cargan rápido?
- ¿Hay jerarquía clara (proyecto destacado vs. secundarios)?
- ¿El hover/interacción añade información?

## 2) Conceptualización — Tu galería ideal

Define:

- **Tipo de galería**: grid uniforme, masonry, destacado + miniaturas, carrusel.
- **Jerarquía**: ¿todos los proyectos iguales o hay "hero projects"?
- **Información por pieza**: solo imagen, título, descripción, enlace a detalle.

Boceto rápido (papel o digital):

- Cómo se ve en móvil (1 columna).
- Cómo se ve en desktop (2–4 columnas).

## 3) Producción — Construye tu galería

### Paso A — Prepara tus imágenes

- Formatos recomendados: WebP o JPEG optimizado.
- Tamaños: máximo 1200–1600px de ancho para web.
- Nombres descriptivos: `proyecto-nombre-01.webp`.
- `alt` significativo: describe qué se ve, no "imagen 1".

### Paso B — Estructura HTML semántica

```html
<section class="galeria" aria-label="Galería de proyectos">
  <article class="proyecto">
    <img src="img/proyecto-01.webp" alt="Ilustración de personaje fantástico en acuarela">
    <h3>Personaje fantástico</h3>
  </article>
  <!-- más proyectos -->
</section>
```

### Paso C — CSS Grid para layout

```css
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.proyecto img {
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 4 / 3;
}
```

Profundiza aquí:

- [Diseño Web: Responsive, Fluido e Intrínseco]({{ '/lessons/es/responsive/' | relative_url }})

### Paso D — Variantes de layout

- **Proyecto destacado** (ocupa 2 columnas):

```css
.proyecto.destacado {
  grid-column: span 2;
}
```

- **Masonry** (si quieres alturas variables):
  - Usa `grid-auto-rows: masonry` (experimental) o JS ligero.

## 4) Accesibilidad para galerías

- `alt` descriptivo en cada imagen.
- Si hay lightbox/modal, asegura navegación por teclado.
- Contraste suficiente en textos sobre imágenes.

## 5) Exhibición — Demo rápida (5 min)

Comparte:

- Vista móvil y desktop de tu galería.
- 1 decisión de diseño que tomaste (grid, jerarquía, etc.).
- 1 imagen que te enorgullece mostrar.

## 6) Reflexión ATELIER

- ¿Qué aprendiste sobre cómo presentar tu arte en web?
- ¿Qué ajustarías en la próxima iteración?
- ¿Qué interacción te gustaría añadir (hover, lightbox, filtros)?

## ✅ Entregable (al final de S2)

- Galería funcional con al menos 4–6 imágenes de tu trabajo.
- Layout responsive (móvil + desktop).
- Un commit final de sesión.
- Nota breve: "qué quiero mejorar en S3".

---

<table style="width: 100%; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
  <tr>
    <td style="text-align: left;">
      ← Anterior: <a href="{{ '/tracks/es/ilustracion-webapp/s1-introduccion-ecosistema-y-proyecto/' | relative_url }}">S1: La web como lienzo + planteamiento del proyecto</a>
    </td>
    <td style="text-align: right;">
      Siguiente →: <a href="{{ '/tracks/es/ilustracion-webapp/s3-maquetacion-responsive-frameworks/' | relative_url }}">S3: Maquetación responsive con Bootstrap + Tailwind</a>
    </td>
  </tr>
</table>
