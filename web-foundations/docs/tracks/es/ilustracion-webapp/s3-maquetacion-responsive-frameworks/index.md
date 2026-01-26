---
layout: lesson
title: 'Maquetación responsive con Tailwind CSS'
title_alt: 'Maquetación responsive con Tailwind CSS'
slug: ilustracion-webapp-s3
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/s3-maquetacion-responsive-frameworks/
description: 'Tercera sesión: página multi-sección completa con Tailwind CSS, arquitectura de componentes, branding personal y testing responsive.'
tags: [responsive, tailwindcss, accesibilidad, diseno, ilustracion, componentes]
status: borrador
---

## ⏰ Duración estimada

**3,5 horas (1 sesión)**

**Fase de Producto**: Architecture → Tailwind Integration → Testing → Polish

---

## 🎯 Objetivos

### Objetivos de Producto

- Convertir tu galería en una **página multi-sección** completa
- Implementar **navegación** efectiva y secciones **About/Contact**
- Aplicar **branding personal** consistente

### Objetivos Técnicos

- Dominar **Tailwind CSS via CDN** para desarrollo rápido
- Implementar **diseño responsive** mobile-first
- Crear **componentes** con utility classes
- Aplicar **dark mode** con Tailwind

### Objetivos de Calidad

- Alcanzar **Lighthouse 90+** en todas las métricas
- Testing exhaustivo en **todos los breakpoints**

---

## 🧭 Canon de Referencia

**Tailwind CSS**:
- [Tailwind CSS: Configuración y Fundamentos]({{ '/lessons/es/tailwind/setup-and-fundamentals/' | relative_url }})
- [Tailwind: Estado e Interactividad]({{ '/lessons/es/tailwind/state-interactivity/' | relative_url }})

**Responsive Design**:
- [Diseño Web: Responsive, Fluido e Intrínseco]({{ '/lessons/es/responsive/' | relative_url }})

**Branding**:
- [Identidad Visual + Metadatos para Web]({{ '/lessons/es/metadata-visual-identity-web/' | relative_url }})

---

## ⏱️ Desglose de Tiempo (3.5 horas)

| Parte | Duración | Fase | Actividad |
|-------|----------|------|-----------|
| **1** | 30 min | Architecture | Planificar estructura de página |
| **2** | 90 min | Integration | Tailwind CDN, navegación, About, Contact |
| **3** | 45 min | Testing | Responsive, accesibilidad, performance |
| **4** | 45 min | Polish | Dark mode, deploy, documentación |

---

## Parte 1: Architecture (30 min)

### 1.1 Estructura de Página

Define tu arquitectura:

```
┌─────────────────────────────────────┐
│  HEADER (fixed)                     │
│  [Logo]     [Work|About|Contact]    │
├─────────────────────────────────────┤
│  HERO                               │
│  [Título + CTA + Ilustración]       │
├─────────────────────────────────────┤
│  WORK (galería de S2)               │
├─────────────────────────────────────┤
│  ABOUT                              │
│  [Foto + bio + skills]              │
├─────────────────────────────────────┤
│  CONTACT                            │
│  [CTA + email + redes]              │
├─────────────────────────────────────┤
│  FOOTER                             │
└─────────────────────────────────────┘
```

**Prompt IA - Arquitectura**:

```markdown
Planifica la arquitectura de mi portfolio multi-sección.

Secciones: Header, Hero, Work, About, Contact, Footer

Para cada sección, define:
1. Contenido necesario
2. Layout (columnas, grid)
3. Comportamiento responsive
4. Componentes Tailwind a usar

Documenta en docs/architecture-s3.md
```

---

## Parte 2: Tailwind Integration (90 min)

### 2.1 Setup Tailwind CDN (10 min)

En tu `<head>`:

```html
<!-- Tailwind CSS via CDN -->
<script src="https://cdn.tailwindcss.com"></script>

<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#1d4ed8',
          secondary: '#64748b',
        },
        fontFamily: {
          heading: ['Playfair Display', 'serif'],
          body: ['Inter', 'sans-serif'],
        },
      },
    },
  }
</script>
```

### 2.2 Navegación Responsive (20 min)

```html
<header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
  <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
    <a href="#" class="text-xl font-bold">Tu Nombre</a>
    
    <!-- Desktop Nav -->
    <ul class="hidden md:flex items-center gap-8">
      <li><a href="#work" class="hover:text-primary">Work</a></li>
      <li><a href="#about" class="hover:text-primary">About</a></li>
      <li><a href="#contact" class="bg-primary text-white px-4 py-2 rounded">Contact</a></li>
    </ul>
    
    <!-- Mobile Menu Button -->
    <button class="md:hidden" aria-label="Menú">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </nav>
</header>
```

### 2.3 Sección About (30 min)

```html
<section id="about" class="py-20 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <img src="images/about.jpg" alt="Descripción" 
           class="rounded-2xl shadow-xl aspect-[4/5] object-cover">
      <div>
        <h2 class="text-3xl font-bold mb-6">Sobre mí</h2>
        <p class="text-gray-600 mb-6">Tu bio aquí...</p>
        <div class="flex flex-wrap gap-2 mb-8">
          <span class="px-3 py-1 bg-white rounded-full text-sm">Skill 1</span>
          <span class="px-3 py-1 bg-white rounded-full text-sm">Skill 2</span>
        </div>
        <a href="#contact" class="bg-primary text-white px-6 py-3 rounded-lg">
          Trabajemos juntos
        </a>
      </div>
    </div>
  </div>
</section>
```

### 2.4 Sección Contact (30 min)

```html
<section id="contact" class="py-20">
  <div class="container mx-auto px-4 text-center max-w-2xl">
    <h2 class="text-4xl font-bold mb-6">¿Tienes un proyecto?</h2>
    <p class="text-xl text-gray-600 mb-8">
      Me encantaría escuchar tu idea.
    </p>
    <a href="mailto:tu@email.com" 
       class="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg text-lg mb-8">
      tu@email.com
    </a>
    <div class="flex justify-center gap-4">
      <a href="#" class="p-3 text-gray-400 hover:text-primary">Instagram</a>
      <a href="#" class="p-3 text-gray-400 hover:text-primary">Behance</a>
    </div>
  </div>
</section>
```

---

## Parte 3: Testing (45 min)

### 3.1 Testing Responsive

**Checklist**:

- [ ] **Mobile (320px)**: Stack vertical, hamburger menu, touch targets 44px+
- [ ] **Tablet (768px)**: Grid 2 columnas, navegación visible
- [ ] **Desktop (1024px+)**: Layout completo, hover states

### 3.2 Testing Accesibilidad

- [ ] Contraste WCAG AA (4.5:1)
- [ ] Navegación por teclado
- [ ] Focus visible
- [ ] Alt text en imágenes
- [ ] Headings jerárquicos

### 3.3 Lighthouse

Target: **90+** en Performance, Accessibility, Best Practices, SEO

---

## Parte 4: Polish & Deploy (45 min)

### 4.1 Dark Mode

```html
<script>
  tailwind.config = {
    darkMode: 'class',
    // ...
  }
</script>

<!-- Uso -->
<section class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

### 4.2 Commit

```bash
git add .
git commit -m "feat(s3): página multi-sección con Tailwind CSS

- Navegación responsive
- Sección About con grid
- Sección Contact con CTA
- Dark mode
- Testing responsive completo
- Lighthouse 90+"
```

---

## ✅ Checklist de Entregables S3

- [ ] **Página multi-sección** (Hero, Work, About, Contact, Footer)
- [ ] **Tailwind CSS** integrado
- [ ] **Navegación responsive** (desktop + móvil)
- [ ] **Sección About** con foto, bio, skills
- [ ] **Sección Contact** con CTA
- [ ] **Dark mode** implementado
- [ ] **Testing responsive** en todos los breakpoints
- [ ] **Lighthouse 90+**
- [ ] **1 commit significativo**

---

## 🎯 Criterios de Éxito S3

✅ **Página completa** con todas las secciones  
✅ **Tailwind** dominado para utility-first CSS  
✅ **Responsive** sin roturas en ningún breakpoint  
✅ **Accesibilidad** verificada  
✅ **Dark mode** funcional  

---

## Reflexión ATELIER

```markdown
## Reflexión S3

### Framework
1. ¿Qué ganaste con Tailwind? ¿Qué te costó?
2. ¿Utility-first funciona para tu flujo?

### Diseño
1. ¿Tu voz visual se conservó?
2. ¿About/Contact comunican lo que querías?

### Preparación S4
1. ¿Qué animaciones GSAP quieres añadir?
2. ¿Qué mejoras de UX detectaste?
```

---

<table style="width: 100%; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
  <tr>
    <td style="text-align: left;">
      ← Anterior: <a href="{{ '/tracks/es/ilustracion-webapp/s2-galerias-layouts-media/' | relative_url }}">S2: Galerías y layouts</a>
    </td>
    <td style="text-align: right;">
      Siguiente →: <a href="{{ '/tracks/es/ilustracion-webapp/s4-interactividad-ux-ui/' | relative_url }}">S4: Interactividad con GSAP</a>
    </td>
  </tr>
</table>
