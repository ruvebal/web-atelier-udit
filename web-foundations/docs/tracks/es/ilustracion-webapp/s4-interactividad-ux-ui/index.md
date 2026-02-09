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

### 1.1 Navegación Sticky con Menú Responsive (30 min)

**Problema:** El template no tiene navegación. Necesitas una navbar sticky con menú responsive.

**Elige tu estilo de menú:**
- **Opción A (Recomendada):** Hamburguesa overlay
- **Opción B:** Sidebar deslizante
- **Opción C:** Mega menu dropdown

**Prompt IA — Navegación Sticky:**

**Metodología docs-first:**
1. Guarda como `docs/prompt-navegacion.md`
2. **Elige una opción** de menú (A, B o C)
3. Envía a IA
4. Implementa en orden: HTML → CSS → JS

```markdown
Crea navegación sticky con menú responsive (vanilla CSS/JS).

## ELIGE TU ESTILO DE MENÚ

Selecciona UNA opción (copia solo la sección elegida al prompt):

---

### OPCIÓN A: HAMBURGUESA OVERLAY (Recomendada - Simple y efectiva)

**Desktop:** Links horizontales  
**Mobile:** Icono ☰ → Full-screen overlay

**Ventajas:** Maximiza espacio móvil, muy común, fácil de implementar  
**Ideal para:** Portfolios minimalistas, 5-7 links

---

### OPCIÓN B: SIDEBAR DESLIZANTE (Moderna y elegante)

**Desktop:** Links horizontales  
**Mobile:** Icono ☰ → Sidebar desde izquierda (300px ancho)

**Ventajas:** Más sofisticado, permite más contenido (logo, redes, bio)  
**Ideal para:** Portfolios con mucha personalidad, 7-10 links

---

### OPCIÓN C: MEGA MENU DROPDOWN (Profesional y estructurada)

**Desktop:** Links con categorías → Hover muestra submenu grid  
**Mobile:** Acordeón con categorías expandibles

**Ventajas:** Organización para muchas páginas, muy profesional  
**Ideal para:** Portfolios con múltiples categorías de proyectos, 10+ links

---

## IMPLEMENTACIÓN ELEGIDA: [Escribe aquí: A, B o C]

## REQUISITOS COMUNES (Todas las opciones)

### Desktop (768px+)
- Navbar sticky en top (siempre visible al scroll)
- Logo/nombre a la izquierda
- Fondo semi-transparente con backdrop-filter blur
- Sombra sutil al hacer scroll

### Mobile (<768px)
- Logo/nombre a la izquierda
- Icono toggle a la derecha
- Animación suave entrada/salida
- Body scroll bloqueado cuando menú abierto

---

## CÓDIGO POR OPCIÓN

**INSTRUCCIÓN:** Copia solo el código de la opción que elegiste (A, B o C).

---

## OPCIÓN A: HAMBURGUESA OVERLAY

### HTML - Opción A

```html
<header class="navbar" id="navbar">
  <div class="navbar-container">
    <a href="#" class="navbar-logo">Tu Nombre</a>
    
    <button class="navbar-toggle" id="navbar-toggle" aria-label="Abrir menú" aria-expanded="false">
      <span class="hamburger"></span>
    </button>
    
    <nav class="navbar-menu" id="navbar-menu">
      <button class="navbar-close" id="navbar-close" aria-label="Cerrar">✕</button>
      <ul class="navbar-links">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#about">Sobre Mí</a></li>
        <li><a href="#process">Proceso</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
    </nav>
  </div>
</header>
```

### CSS - Opción A

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

---

## OPCIÓN B: SIDEBAR DESLIZANTE

### HTML - Opción B

```html
<header class="navbar" id="navbar">
  <div class="navbar-container">
    <a href="#" class="navbar-logo">Tu Nombre</a>
    
    <button class="navbar-toggle" id="navbar-toggle" aria-label="Abrir menú" aria-expanded="false">
      <span class="hamburger"></span>
    </button>
  </div>
</header>

<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <button class="sidebar-close" id="sidebar-close" aria-label="Cerrar">✕</button>
  </div>
  
  <nav class="sidebar-content">
    <div class="sidebar-logo-section">
      <a href="#" class="sidebar-logo">Tu Nombre</a>
      <p class="sidebar-tagline">Ilustrador Digital</p>
    </div>
    
    <ul class="sidebar-links">
      <li><a href="#inicio"><span class="link-icon">🏠</span> Inicio</a></li>
      <li><a href="#portfolio"><span class="link-icon">🎨</span> Portfolio</a></li>
      <li><a href="#about"><span class="link-icon">👤</span> Sobre Mí</a></li>
      <li><a href="#process"><span class="link-icon">⚙️</span> Proceso</a></li>
      <li><a href="#contact"><span class="link-icon">📧</span> Contacto</a></li>
    </ul>
    
    <div class="sidebar-social">
      <a href="#" aria-label="Instagram">📷</a>
      <a href="#" aria-label="Behance">🎯</a>
      <a href="#" aria-label="LinkedIn">💼</a>
    </div>
  </nav>
</aside>

<div class="sidebar-overlay" id="sidebar-overlay"></div>
```

### CSS - Opción B

```css
/* ============================================
   NAVBAR STICKY (Desktop + Mobile)
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

/* Hamburger - Siempre visible en mobile */
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

.hamburger::before { top: -8px; }
.hamburger::after { bottom: -8px; }

.navbar-toggle[aria-expanded="true"] .hamburger {
  background: transparent;
}

.navbar-toggle[aria-expanded="true"] .hamburger::before {
  transform: rotate(45deg) translate(5px, 6px);
}

.navbar-toggle[aria-expanded="true"] .hamburger::after {
  transform: rotate(-45deg) translate(5px, -6px);
}

/* ============================================
   SIDEBAR (Solo mobile)
   ============================================ */

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background: var(--color-background);
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1001;
  overflow-y: auto;
  display: none; /* Hidden en desktop */
}

.sidebar.active {
  transform: translateX(0);
}

.sidebar-header {
  padding: 1.5rem 2rem;
  text-align: right;
}

.sidebar-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--color-text);
  padding: 0.5rem;
}

.sidebar-content {
  padding: 2rem;
}

.sidebar-logo-section {
  margin-bottom: 3rem;
  text-align: center;
}

.sidebar-logo {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
  font-family: var(--font-family-heading);
  display: block;
  margin-bottom: 0.5rem;
}

.sidebar-tagline {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.sidebar-links {
  list-style: none;
  padding: 0;
  margin: 0 0 3rem 0;
}

.sidebar-links li {
  margin-bottom: 0.5rem;
}

.sidebar-links a {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: var(--color-text);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  font-size: var(--font-size-lg);
}

.sidebar-links a:hover {
  background: var(--color-card-bg);
  color: var(--color-primary);
  transform: translateX(8px);
}

.link-icon {
  font-size: 1.5rem;
}

.sidebar-social {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
}

.sidebar-social a {
  font-size: 1.5rem;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.sidebar-social a:hover {
  transform: scale(1.2);
}

/* Overlay oscuro detrás del sidebar */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
  display: none; /* Hidden en desktop */
}

.sidebar-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 767px) {
  .navbar-toggle {
    display: block;
  }
  
  .sidebar,
  .sidebar-overlay {
    display: block;
  }
}

body {
  padding-top: 70px;
}
```

### JavaScript - Opción B

```javascript
// ============================================
// NAVBAR STICKY + SIDEBAR
// ============================================

const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbar-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebar-close');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarLinks = document.querySelectorAll('.sidebar-links a');

// Sombra al hacer scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Toggle sidebar
function toggleSidebar() {
  const isOpen = navbarToggle.getAttribute('aria-expanded') === 'true';
  navbarToggle.setAttribute('aria-expanded', !isOpen);
  sidebar.classList.toggle('active');
  sidebarOverlay.classList.toggle('active');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

navbarToggle.addEventListener('click', toggleSidebar);
sidebarClose.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', toggleSidebar);

// Cerrar al hacer click en un link
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  });
});

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('active')) {
    toggleSidebar();
  }
});

console.log('✓ Navbar sticky con sidebar inicializado');
```

---

## OPCIÓN C: MEGA MENU DROPDOWN

### HTML - Opción C

```html
<header class="navbar" id="navbar">
  <div class="navbar-container">
    <a href="#" class="navbar-logo">Tu Nombre</a>
    
    <button class="navbar-toggle" id="navbar-toggle" aria-label="Abrir menú" aria-expanded="false">
      <span class="hamburger"></span>
    </button>
    
    <nav class="navbar-menu" id="navbar-menu">
      <ul class="navbar-links">
        <li><a href="#inicio">Inicio</a></li>
        
        <!-- Dropdown Portfolio -->
        <li class="has-dropdown">
          <button class="dropdown-toggle" aria-expanded="false">
            Portfolio <span class="dropdown-arrow">▼</span>
          </button>
          <div class="mega-dropdown">
            <div class="mega-grid">
              <div class="mega-column">
                <h4>Ilustración Editorial</h4>
                <ul>
                  <li><a href="#editorial-revistas">Revistas</a></li>
                  <li><a href="#editorial-libros">Libros</a></li>
                  <li><a href="#editorial-prensa">Prensa</a></li>
                </ul>
              </div>
              <div class="mega-column">
                <h4>Branding</h4>
                <ul>
                  <li><a href="#branding-logos">Logos</a></li>
                  <li><a href="#branding-identidad">Identidad</a></li>
                  <li><a href="#branding-packaging">Packaging</a></li>
                </ul>
              </div>
              <div class="mega-column">
                <h4>Digital</h4>
                <ul>
                  <li><a href="#digital-web">Web</a></li>
                  <li><a href="#digital-apps">Apps</a></li>
                  <li><a href="#digital-redes">Redes Sociales</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        
        <li><a href="#about">Sobre Mí</a></li>
        <li><a href="#process">Proceso</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
    </nav>
  </div>
</header>
```

### CSS - Opción C

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

/* Toggle (Mobile only) */
.navbar-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
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

.hamburger::before { top: -8px; }
.hamburger::after { bottom: -8px; }

.navbar-toggle[aria-expanded="true"] .hamburger {
  background: transparent;
}

.navbar-toggle[aria-expanded="true"] .hamburger::before {
  transform: rotate(45deg) translate(5px, 6px);
}

.navbar-toggle[aria-expanded="true"] .hamburger::after {
  transform: rotate(-45deg) translate(5px, -6px);
}

/* ============================================
   MEGA MENU - DESKTOP
   ============================================ */

.navbar-menu {
  display: flex;
}

.navbar-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

.navbar-links > li {
  position: relative;
}

.navbar-links > li > a,
.dropdown-toggle {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.navbar-links > li > a:hover,
.dropdown-toggle:hover {
  color: var(--color-primary);
}

.dropdown-arrow {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}

.has-dropdown:hover .dropdown-arrow {
  transform: rotate(180deg);
}

/* Mega Dropdown */
.mega-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: var(--color-background);
  border-radius: var(--radius-md);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  min-width: 600px;
  z-index: 100;
}

.has-dropdown:hover .mega-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.mega-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.mega-column h4 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: var(--font-size-md);
}

.mega-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mega-column li {
  margin-bottom: 0.5rem;
}

.mega-column a {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
  display: inline-block;
}

.mega-column a:hover {
  color: var(--color-primary);
  transform: translateX(4px);
}

/* ============================================
   RESPONSIVE - MOBILE ACCORDION
   ============================================ */

@media (max-width: 767px) {
  .navbar-toggle {
    display: block;
  }
  
  .navbar-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--color-background);
    flex-direction: column;
    padding: 2rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
  }
  
  .navbar-menu.active {
    transform: translateX(0);
  }
  
  .navbar-links {
    flex-direction: column;
    width: 100%;
    gap: 0;
  }
  
  .navbar-links > li {
    width: 100%;
    border-bottom: 1px solid var(--border-light);
  }
  
  .navbar-links > li > a,
  .dropdown-toggle {
    padding: 1rem 0;
    font-size: var(--font-size-lg);
    width: 100%;
    justify-content: space-between;
  }
  
  /* Accordion en mobile */
  .mega-dropdown {
    position: static;
    transform: none;
    box-shadow: none;
    padding: 0 0 1rem 1rem;
    min-width: auto;
    opacity: 1;
    visibility: visible;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  
  .has-dropdown.open .mega-dropdown {
    max-height: 500px;
  }
  
  .has-dropdown.open .dropdown-arrow {
    transform: rotate(180deg);
  }
  
  .mega-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .mega-column h4 {
    font-size: var(--font-size-md);
  }
  
  .mega-column a {
    font-size: var(--font-size-md);
    padding: 0.5rem 0;
  }
}

body {
  padding-top: 70px;
}
```

### JavaScript - Opción C

```javascript
// ============================================
// NAVBAR STICKY + MEGA MENU
// ============================================

const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const allLinks = document.querySelectorAll('.navbar-links a, .mega-column a');

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
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

navbarToggle.addEventListener('click', toggleMenu);

// Accordion dropdowns en mobile
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      const parent = toggle.closest('.has-dropdown');
      const isOpen = parent.classList.contains('open');
      
      // Cerrar otros dropdowns
      document.querySelectorAll('.has-dropdown.open').forEach(item => {
        if (item !== parent) {
          item.classList.remove('open');
        }
      });
      
      // Toggle current
      parent.classList.toggle('open');
      toggle.setAttribute('aria-expanded', !isOpen);
    }
  });
});

// Cerrar menú al hacer click en un link
allLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      toggleMenu();
      // Cerrar dropdowns
      document.querySelectorAll('.has-dropdown.open').forEach(item => {
        item.classList.remove('open');
      });
    }
  });
});

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
    toggleMenu();
  }
});

console.log('✓ Navbar sticky con mega menu inicializado');
```

---

## ACCESIBILIDAD (Todas las opciones)

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

Documenta qué opción elegiste y verifica:

1. **Opción elegida:** [A/B/C] - [Nombre opción]
2. **HTML añadido:** Navbar + estructura específica ✓
3. **CSS implementado:** _components.css con estilos de la opción ✓
4. **JavaScript funcional:** Interacciones específicas funcionando ✓
5. **Responsive verificado:**
   - Desktop (768px+): [Describe comportamiento] ✓
   - Mobile (<768px): [Describe comportamiento] ✓
6. **Animaciones:**
   - [Lista animaciones de tu opción] ✓
   - Sombra al scroll ✓
7. **Accesibilidad:**
   - aria-label y aria-expanded ✓
   - Navegación teclado ✓
   - ESC cierra menú ✓
   - Body scroll bloqueado ✓
8. **IDs de secciones:** Anclas funcionando ✓
9. **Testing:**
   - Chrome DevTools móvil ✓
   - Navegador real móvil (si disponible) ✓
   - Click, tap, teclado, hover ✓
10. **Por qué elegí esta opción:**
    - [Tu justificación basada en tu portfolio]

[La IA completará después de implementar]
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
