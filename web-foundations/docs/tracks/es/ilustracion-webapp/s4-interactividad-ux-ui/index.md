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

| Parte | Duración | Actividad                                |
| ----- | -------- | ---------------------------------------- |
| **1** | 90 min   | Navegación sticky (30min) + Galería (60min) |
| **2** | 40 min   | UX testing con compañeros                |
| **3** | 40 min   | Iteración y pulido                       |
| **4** | 40 min   | Lanzamiento y presentación               |

---

## Parte 1: Navegación Sticky + Galería de Proyectos (90 min)

### 1.1 Navegación Sticky con Menú Hamburguesa (30 min)

**Problema:** El template no tiene navegación. Necesitas una navbar sticky con menú hamburguesa responsive.

**Prompt IA — Navegación Sticky:**

**Metodología docs-first:**
1. Guarda como `docs/prompt-navegacion.md`
2. Envía a IA
3. Implementa en orden: HTML → CSS → JS

```markdown
Crea navegación sticky con menú hamburguesa responsive (vanilla CSS/JS).

## REQUISITOS FUNCIONALES

### Desktop (768px+)
- Navbar sticky en top (siempre visible al scroll)
- Logo/nombre a la izquierda
- Links horizontales a la derecha: Inicio, Portfolio, Sobre mí, Proceso, Contacto
- Fondo semi-transparente con backdrop-filter blur
- Sombra sutil al hacer scroll

### Mobile (<768px)
- Logo/nombre a la izquierda
- Icono hamburguesa (☰) a la derecha
- Click hamburguesa → menú full-screen overlay
- Links verticales centrados
- Botón cerrar (✕) en esquina
- Animación suave entrada/salida

## ESTRUCTURA HTML

Añadir ANTES del `<div class="hero">` en index.html:

```html
<header class="navbar" id="navbar">
  <div class="navbar-container">
    <a href="#" class="navbar-logo">Tu Nombre</a>
    
    <button class="navbar-toggle" id="navbar-toggle" aria-label="Abrir menú de navegación" aria-expanded="false">
      <span class="hamburger"></span>
    </button>
    
    <nav class="navbar-menu" id="navbar-menu">
      <button class="navbar-close" id="navbar-close" aria-label="Cerrar menú">✕</button>
      <ul class="navbar-links">
        <li><a href="#main">Inicio</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#about">Sobre Mí</a></li>
        <li><a href="#process">Proceso</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
    </nav>
  </div>
</header>
```

## CSS

Añadir a `assets/css/_components.css`:

```css
/* ============================================
   NAVBAR STICKY
   ============================================ */

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: box-shadow 0.3s ease;
}

.navbar.scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
  font-family: var(--font-family-heading);
}

.navbar-logo:hover {
  color: var(--color-primary);
}

/* Toggle (Hamburger) - Solo móvil */
.navbar-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1002;
}

.hamburger {
  display: block;
  width: 28px;
  height: 2px;
  background: var(--color-text);
  position: relative;
  transition: background 0.3s ease;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 28px;
  height: 2px;
  background: var(--color-text);
  transition: transform 0.3s ease;
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  bottom: -8px;
}

/* Hamburger animado cuando está abierto */
.navbar-toggle[aria-expanded="true"] .hamburger {
  background: transparent;
}

.navbar-toggle[aria-expanded="true"] .hamburger::before {
  transform: rotate(45deg) translate(5px, 6px);
}

.navbar-toggle[aria-expanded="true"] .hamburger::after {
  transform: rotate(-45deg) translate(5px, -6px);
}

/* Menú Desktop */
.navbar-menu {
  display: flex;
}

.navbar-close {
  display: none;
}

.navbar-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.navbar-links a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.navbar-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width 0.3s ease;
}

.navbar-links a:hover {
  color: var(--color-primary);
}

.navbar-links a:hover::after {
  width: 100%;
}

/* ============================================
   RESPONSIVE - MOBILE
   ============================================ */

@media (max-width: 767px) {
  .navbar-toggle {
    display: block;
  }
  
  .navbar-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background: var(--color-background);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1001;
  }
  
  .navbar-menu.active {
    transform: translateX(0);
  }
  
  .navbar-close {
    display: block;
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--color-text);
    padding: 0.5rem;
  }
  
  .navbar-links {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .navbar-links a {
    font-size: var(--font-size-xl);
  }
}

/* Offset para contenido (porque navbar es fixed) */
body {
  padding-top: 70px;
}
```

## JAVASCRIPT

Añadir a `assets/js/main.js` al final:

```javascript
// ============================================
// NAVBAR STICKY + HAMBURGER MENU
// ============================================

const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
const navbarClose = document.getElementById('navbar-close');
const navbarLinks = document.querySelectorAll('.navbar-links a');

// Sombra al hacer scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Toggle menú móvil
function toggleMenu() {
  const isOpen = navbarToggle.getAttribute('aria-expanded') === 'true';
  navbarToggle.setAttribute('aria-expanded', !isOpen);
  navbarMenu.classList.toggle('active');
  
  // Bloquear scroll del body cuando menú está abierto
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

navbarToggle.addEventListener('click', toggleMenu);
navbarClose.addEventListener('click', toggleMenu);

// Cerrar menú al hacer click en un link
navbarLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      toggleMenu();
    }
  });
});

// Cerrar menú con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
    toggleMenu();
  }
});

console.log('✓ Navbar sticky con menú hamburguesa inicializado');
```

## ACCESIBILIDAD

**Verificar:**
- [ ] `aria-label` en botones toggle/close
- [ ] `aria-expanded` actualiza en toggle
- [ ] Navegación por teclado funciona (Tab, Enter, ESC)
- [ ] Focus visible en todos los links
- [ ] Scroll bloqueado cuando menú móvil abierto

## IDs DE SECCIONES

Añadir IDs a las secciones para anclas:

```html
<!-- En index.html, actualizar secciones: -->
<section class="story-section chapter-1" data-observe id="about">
<section class="story-section chapter-2" data-observe id="portfolio">
<section class="timeline-section chapter-3" data-observe id="process">
<section class="final-section" data-observe id="contact">
```

## REPORT DE IMPLEMENTACIÓN

1. **HTML añadido:** Navbar antes del hero ✓
2. **CSS implementado:** _components.css actualizado ✓
3. **JavaScript funcional:** Toggle + scroll shadow ✓
4. **Responsive verificado:**
   - Desktop (768px+): Links horizontales ✓
   - Mobile (<768px): Menú hamburguesa overlay ✓
5. **Animaciones:**
   - Hamburger → X animado ✓
   - Menu slide-in from right ✓
   - Sombra al scroll ✓
6. **Accesibilidad:**
   - aria-label y aria-expanded ✓
   - Navegación teclado ✓
   - ESC cierra menú ✓
   - Body scroll bloqueado ✓
7. **IDs de secciones:** Anclas funcionando ✓
8. **Testing:**
   - Chrome DevTools móvil ✓
   - Safari iOS real (si disponible) ✓
   - Click, tap, teclado ✓

[La IA completará]
```

---

### 1.2 Completar Proyectos en Brief (15 min)

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

### 1.3 Galería de Proyectos (30 min)

Ver prompt completo en sección original "1.2 Prompt IA — Galería de Proyectos" arriba.

---

### 1.4 Lightbox Opcional (15 min)

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

## Parte 2: Testing UX con Compañeros (40 min)

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

## Parte 3: Iteración (40 min)

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

## Parte 4: Lanzamiento (40 min)

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

- [ ] Navegación sticky con menú hamburguesa funcional
- [ ] Galería con mínimo 6 proyectos (ImageKit)
- [ ] Lightbox funcional (opcional pero recomendado)
- [ ] Testing con compañero completado
- [ ] 2-3 mejoras implementadas
- [ ] Meta tags Open Graph
- [ ] Case study documentado
- [ ] Portfolio público funcionando
- [ ] 1 commit final significativo

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
