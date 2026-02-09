---
layout: lesson
title: 'Galería de Proyectos y Lanzamiento'
title_alt: 'Galería de Proyectos y Lanzamiento'
slug: ilustracion-webapp-s4
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/s4-interactividad-ux-ui/
description: 'Cuarta sesión: galería de proyectos con ImageKit, UX testing con compañeros y lanzamiento final del portfolio.'
tags: [javascript, galeria, ux, imagekit, ilustracion, lanzamiento]
status: borrador
---

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

---

## ⏰ Duración estimada

**3,5 horas (1 sesión)**

---

## 🎯 Objetivos

- Añadir **galería de proyectos** con imágenes de ImageKit
- Implementar **lightbox** para vista ampliada (opcional)
- Realizar **testing UX** con compañeros
- **Iterar** con feedback
- **Lanzar** portfolio completo

---

## 📁 Archivos Clave

**Contexto:**
- `project-brief.md` → Sección "Proyectos para Galería"

**A Modificar:**
- `index.html` → Añadir sección galería
- `assets/js/main.js` → Lightbox (opcional)
- `assets/css/_scrollytelling.css` → Estilos lightbox (opcional)

---

## ⏱️ Desglose de Tiempo

| Parte | Duración | Actividad                      |
| ----- | -------- | ------------------------------ |
| **1** | 60 min   | Galería de proyectos + lightbox |
| **2** | 45 min   | UX testing con compañeros       |
| **3** | 45 min   | Iteración y pulido              |
| **4** | 45 min   | Lanzamiento y presentación      |

---

## Parte 1: Galería de Proyectos (60 min)

### 1.1 Completar Proyectos en Brief (15 min)

**Acción:** Abre `project-brief.md` sección "Proyectos para Galería"

**Completa mínimo 6 proyectos con:**
- URL de ImageKit (con transformaciones)
- Título del proyecto
- Descripción (1 frase)
- Categoría
- Alt text descriptivo

**Formato URLs ImageKit optimizadas:**
```
https://ik.imagekit.io/tu-id/tr:w-400,h-300,q-80,f-auto/proyecto.jpg
```

### 1.2 Prompt IA — Galería de Proyectos

**Metodología docs-first:**
1. Guarda como `docs/prompt-galeria.md`
2. **Adjunta:** `project-brief.md`
3. Envía a IA
4. Implementa sección nueva

```markdown
Crea galería de proyectos usando mis imágenes de ImageKit.

## 📎 CONTEXTO
Adjunta: `project-brief.md`

Lee sección "Proyectos para Galería" - extrae:
- URLs de ImageKit de cada proyecto
- Títulos, descripciones, categorías
- Alt text

## UBICACIÓN

Añadir NUEVA sección en `index.html` después del `parallax-section` (línea ~60), ANTES del `chapter-2` (My Work).

## ESTRUCTURA

```html
<!-- NUEVA SECCIÓN - Añadir aquí -->
<section class="story-section chapter-1" data-observe>
  <div class="story-content">
    <h2>Mi Portfolio</h2>
    <p class="text-large mb-lg">Proyectos destacados de ilustración</p>

    <div class="interactive-cards">
      <!-- Generar UNA card por cada proyecto del brief -->
      <div class="card project-card" data-category="[categoría del brief]">
        <img 
          src="[URL ImageKit del brief con tr:w-400,h-300,q-80,f-auto]" 
          alt="[Alt text del brief]"
          loading="lazy"
          style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem; cursor: pointer;">
        <h4>[Título del brief]</h4>
        <p>[Descripción del brief]</p>
        <span class="project-tag">[Categoría del brief]</span>
      </div>
      
      <!-- Repetir para CADA proyecto listado en project-brief.md -->
    </div>
  </div>
</section>
```

## CSS ADICIONAL

Añadir al final de `assets/css/_scrollytelling.css`:

```css
/* Project cards */
.project-card img {
  transition: transform 0.3s ease;
}

.project-card:hover img {
  transform: scale(1.05);
}

.project-tag {
  display: inline-block;
  background: var(--color-card-bg);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  color: var(--color-accent-blue);
  margin-top: 0.5rem;
}
```

## REPORT

1. **Proyectos extraídos de brief:** [N proyectos]
2. **Categorías:** [Lista categorías únicas]
3. **URLs ImageKit:** Todas con transformaciones optimizadas ✓
4. **Alt text:** Descriptivo en [N] imágenes ✓
5. **Lazy loading:** Aplicado a todas ✓
6. **Grid responsive:** Auto-fit 1/2/3 columnas ✓
7. **Ubicación:** Insertado después parallax, antes chapter-2 ✓

[La IA completará]
```

### 1.3 Lightbox Opcional (15 min)

**Prompt IA:**

```markdown
Añade lightbox para ampliar imágenes.

## FUNCIONALIDAD

Click en imagen → Modal con imagen ampliada (ImageKit tr:w-1200)

## CÓDIGO JAVASCRIPT

Añadir al final de `assets/js/main.js`:

[El código JavaScript completo del lightbox se proporcionará en la sesión - ver versión anterior de S4 para referencia]

## CSS

Añadir a `assets/css/_scrollytelling.css`:

[El código CSS del lightbox - ver código anterior]

## REPORT
1. Lightbox implementado: Click funciona ✓
2. Cierre múltiple: X, ESC, click fuera ✓
3. Imágenes ampliadas: URLs ImageKit tr:w-1200 ✓
4. Accesibilidad: aria-label, body scroll bloqueado ✓

[La IA completará]
```

---

## Parte 2: Testing UX con Compañeros (45 min)

### 2.1 Dinámica (25 min)

**Formato:** Parejas intercambian portfolios

**5 Tareas de Testing:**
1. Primera impresión (30s): ¿De qué trata?
2. Scroll completo (2min): ¿Qué secciones viste?
3. Galería (1min): ¿Cuántos proyectos? ¿Se ven bien?
4. Contacto (30s): ¿Cómo contactarías?
5. Móvil (2min): Emulador o real

### 2.2 Tabla de Feedback

| Aspecto | ✓/✗ | Comentario |
|---------|-----|------------|
| Claridad identidad | | |
| Scroll fluido | | |
| Galería carga rápido | | |
| Bio interesante | | |
| CTA claro | | |
| Móvil funcional | | |

**1 mejora crítica:** _______________

### 2.3 Discusión (20 min)

Cada pareja comparte:
- 1 cosa excelente
- 1 mejora crítica
- 1 idea inspiradora

---

## Parte 3: Iteración (45 min)

### Priorizar y Ejecutar

**Matriz:**
- 🔴 Crítico: Imágenes no cargan, texto ilegible
- 🟡 Alto: Bio larga, CTA confuso
- 🟢 Medio: Animaciones lentas
- ⚪ Bajo: Espaciados menores

**Implementa 2-3 mejoras** de prioridad Alta/Crítica.

**Ejemplos comunes:**
- Imágenes lentas → Optimizar ImageKit
- Bio larga → Reducir a 2 párrafos
- CTA no claro → Aumentar contraste

---

## Parte 4: Lanzamiento (45 min)

### 4.1 Meta Tags (10 min)

```html
<meta property="og:title" content="[Tu Nombre del brief] - Portfolio">
<meta property="og:description" content="[Tu tagline del brief]">
<meta property="og:image" content="[URL proyecto destacado de brief]">
```

### 4.2 Case Study (15 min)

Crear `case-study.md`:

```markdown
# Portfolio Scrollytelling - [Tu Nombre]

## Concepto
[Extrae de project-brief.md sección "Concepto del Portfolio"]

## Proceso (4 Sesiones)
S1: Foundation
S2: Content Strategy  
S3: Personalización con mi identidad visual
S4: Galería + UX Testing + Lanzamiento

## Tecnologías
- Scrollytelling con Intersection Observer
- ImageKit para optimización
- CSS modular
- GitHub Pages

## URL Final
https://[tu-usuario].github.io/[repo]/
```

### 4.3 Presentación (15 min)

**2-3 min por persona:**
1. URL live + scroll
2. 1 componente favorito
3. 1 desafío superado
4. 1 aprendizaje

---

## ✅ Entregables S4

- [ ] Galería con mínimo 6 proyectos (ImageKit)
- [ ] Lightbox funcional (opcional)
- [ ] Testing con compañero completado
- [ ] 2-3 mejoras implementadas
- [ ] Meta tags Open Graph
- [ ] Case study documentado
- [ ] Portfolio público funcionando

---

<table style="width: 100%; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
  <tr>
    <td style="text-align: left;">
      ← Anterior: <a href="{{ '/tracks/es/ilustracion-webapp/s3-maquetacion-responsive-frameworks/' | relative_url }}">S3: Personalización</a>
    </td>
    <td style="text-align: right;">
      <a href="{{ '/tracks/es/ilustracion-webapp/' | relative_url }}">Volver al Track</a>
    </td>
  </tr>
</table>
