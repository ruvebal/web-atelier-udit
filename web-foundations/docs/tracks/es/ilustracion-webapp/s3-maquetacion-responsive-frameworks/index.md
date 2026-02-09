---
layout: lesson
title: 'Maquetación responsive y estructura multi-sección'
title_alt: 'Maquetación responsive y estructura multi-sección'
slug: ilustracion-webapp-s3
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/s3-maquetacion-responsive-frameworks/
description: 'Tercera sesión: página multi-sección completa, arquitectura de componentes, branding personal y testing responsive.'
tags: [responsive, tailwindcss, accesibilidad, diseno, ilustracion, componentes]
status: borrador
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## ⏰ Duración estimada

**3,5 horas (1 sesión)**

---

## 🎯 Objetivos

- Convertir la galería en una **página multi-sección** completa
- Implementar **navegación** y secciones **About/Contact/Footer**
- Aplicar **branding personal** consistente
- Lograr **diseño responsive** mobile/desktop-first

---

## 🧭 Canon de Referencia

- [Tailwind CSS: Configuración y Fundamentos]({{ '/lessons/es/tailwind/setup-and-fundamentals/' | relative_url }})
- [Diseño Web: Responsive, Fluido e Intrínseco]({{ '/lessons/es/responsive/' | relative_url }})
- [Identidad Visual + Metadatos para Web]({{ '/lessons/es/metadata-visual-identity-web/' | relative_url }})

---

## ⏱️ Desglose de Tiempo

| Parte | Duración | Actividad                          |
| ----- | -------- | ---------------------------------- |
| **1** | 20 min   | Revisión de contenidos preparados  |
| **2** | 30 min   | Arquitectura de página (esqueleto) |
| **3** | 90 min   | Maquetación de secciones           |
| **4** | 45 min   | Testing responsive y accesibilidad |
| **5** | 25 min   | Commit y documentación             |

---

## Parte 1: Revisión de Contenidos (20 min)

### Checklist de preparación

Antes de maquetar, verificar que cada estudiante tiene:

- [ ] **Imágenes** subidas en ImageKit (con URLs a mano)
- [ ] **Textos** redactados (bio, statement, descripciones)
- [ ] **Tipografías** decididas (Google Fonts)
- [ ] **Colores** definidos (paleta base)

### Integración rápida

Si falta algún elemento, resolverlo en 5-10 minutos:

```html
<!-- Google Fonts en <head> -->
<link href="https://fonts.googleapis.com/css2?family=TU_FUENTE&display=swap" rel="stylesheet" />
```

```css
/* En theme.css o variables */
:root {
	--color-primary: #tu-color;
	--color-secondary: #tu-color;
	--font-heading: 'Tu Fuente', serif;
	--font-body: 'Tu Fuente', sans-serif;
}
```

### Prompt IA — Integración de Sistema de Diseño

```markdown
Integra mi sistema de diseño en el portfolio.

**Tipografías seleccionadas:**
- Heading: [Nombre de fuente] (Google Fonts)
- Body: [Nombre de fuente] (Google Fonts)

**Paleta de colores:**
- Primario: #[hex]
- Secundario: #[hex]
- Fondo: #[hex]
- Texto: #[hex]

**Tareas:**
1. Añade los enlaces de Google Fonts en <head>
2. Define variables CSS en theme.css con estos valores
3. Aplica las fuentes a headings y body
4. Verifica contraste WCAG AA (4.5:1 texto, 3:1 UI)
5. Crea clases utilitarias: .text-primary, .bg-primary, etc.

Genera el código CSS completo con variables y aplicación.
```

---

## Parte 2: Arquitectura de Página (30 min)

### Esqueleto común

Dibujar en pizarra la estructura que todos deben seguir:

```
┌─────────────────────────────────────┐
│  <header> NAVEGACIÓN                │
│  [Logo/Nombre]  [Work|About|Contact]│
├─────────────────────────────────────┤
│  <main>                             │
│    ┌─────────────────────────────┐  │
│    │ HERO                        │  │
│    │ Imagen destacada + lema     │  │
│    └─────────────────────────────┘  │
│    ┌─────────────────────────────┐  │
│    │ PROYECTOS / GALERÍA         │  │
│    │ Grid de ilustraciones       │  │
│    └─────────────────────────────┘  │
│    ┌─────────────────────────────┐  │
│    │ SOBRE MÍ (Bio/Statement)    │  │
│    │ Foto + texto personal       │  │
│    └─────────────────────────────┘  │
├─────────────────────────────────────┤
│  <footer>                           │
│  Contacto + Redes sociales          │
└─────────────────────────────────────┘
```

### Elementos semánticos clave

- `<header>` con `<nav>` para navegación
- `<main>` para contenido principal
- `<section>` con `id` para cada bloque (hero, work, about)
- `<footer>` para contacto y redes
- Encabezados `<h1>` → `<h2>` en orden lógico

---

## Parte 3: Maquetación de Secciones (90 min)

### 3.1 Header/Navegación (15 min)

```html
<header>
	<nav>
		<a href="#">Tu Nombre</a>
		<ul>
			<li><a href="#work">Trabajo</a></li>
			<li><a href="#about">Sobre mí</a></li>
			<li><a href="#contact">Contacto</a></li>
		</ul>
		<!-- Botón hamburguesa para móvil (opcional S4) -->
	</nav>
</header>
```

**Tip responsive**: En móvil, la navegación puede ser un menú simple o implementar hamburguesa en S4.

### 3.2 Sección Hero (15 min)

Primera impresión del portfolio. Debe captar la esencia del estudiante.

```html
<section id="hero">
	<h1>Tu Nombre</h1>
	<p>Tu lema o frase de impacto</p>
	<img src="ilustracion-destacada.jpg" alt="Descripción" />
	<a href="#work">Ver mi trabajo</a>
</section>
```

**Consideraciones**:

- Si hay texto sobre imagen, usar overlay para contraste
- La imagen debe ser representativa del estilo

**Prompt IA — Sección Hero**:

```markdown
Crea la sección Hero de mi portfolio usando mis contenidos.

**Contenidos preparados:**
- Nombre/Logo: [Tu nombre]
- Lema/Tagline: [Tu lema preparado del email]
- Imagen destacada: [URL de ImageKit]

**Requisitos de diseño:**
- Layout con imagen destacada + texto superpuesto o al lado
- Aplicar tipografía heading de mi sistema de diseño
- Usar color primario en CTA
- Si texto sobre imagen: overlay oscuro/claro para contraste
- Responsive: stack vertical en móvil, horizontal en desktop
- Altura mínima: 70vh

**Accesibilidad:**
- Alt text descriptivo en imagen
- Contraste WCAG AA en texto
- CTA con target mínimo 44px

Genera HTML + CSS completo para la sección hero.
```

### 3.3 Sección Proyectos/Galería (30 min)

Reutilizar la galería de S2 o crear grid nuevo.

```html
<section id="work">
	<h2>Mi Trabajo</h2>
	<div class="gallery-grid">
		<!-- Cards de proyectos -->
		<article class="project-card">
			<img src="proyecto1.jpg" alt="Descripción del proyecto" />
			<h3>Nombre del proyecto</h3>
		</article>
		<!-- Más cards... -->
	</div>
</section>
```

**Grid responsive**:

- Móvil: 1 columna
- Tablet: 2 columnas
- Desktop: 3-4 columnas

**Prompt IA — Galería de Proyectos**:

```markdown
Crea la galería de proyectos usando mis ilustraciones.

**Imágenes preparadas en ImageKit:**
[Lista tus URLs de ImageKit organizadas por proyecto]

Ejemplo:
- Proyecto 1: https://ik.imagekit.io/tu-id/proyecto1-cover.jpg
- Proyecto 2: https://ik.imagekit.io/tu-id/proyecto2-cover.jpg
- ...

**Requisitos:**
- Grid responsive (1 col móvil, 2 tablet, 3-4 desktop)
- Cards con imagen + título del proyecto
- Hover effect sutil (scale, overlay, etc.)
- Aspect ratio consistente (ej. 4:3 o 16:9)
- Lazy loading para performance
- Alt text descriptivo en cada imagen

**Opcional:**
- Filtros por categoría/tipo de ilustración
- Lightbox para ver imágenes ampliadas

Genera HTML + CSS para la galería.
```

### 3.4 Sección Sobre Mí (15 min)

Tono personal que refleje la identidad del ilustrador.

```html
<section id="about">
	<h2>Sobre mí</h2>
	<img src="foto-autor.jpg" alt="Tu nombre" />
	<p>Tu bio aquí...</p>
	<blockquote>Extracto de tu statement artístico</blockquote>
</section>
```

**Personalización**: Tipografía decorativa para el nombre, fondo con color de la paleta, etc.

**Prompt IA — Sección Sobre Mí**:

```markdown
Crea la sección "Sobre mí" con mis textos preparados.

**Contenidos:**
- Bio: [Pega tu bio preparada]
- Statement artístico: [Pega tu statement preparado]
- Foto personal (opcional): [URL de ImageKit si la tienes]

**Requisitos de diseño:**
- Layout: foto + texto (grid 2 columnas en desktop, stack en móvil)
- Tipografía body de mi sistema de diseño
- Statement destacado con blockquote o estilo especial
- Fondo sutil con color secundario de mi paleta
- Espaciado generoso para legibilidad

**Personalización:**
- Refleja mi identidad como ilustrador/a
- Usa tipografía decorativa para mi nombre si aplica
- Considera añadir lista de skills/herramientas (opcional)

Genera HTML + CSS para la sección about.
```

### 3.5 Footer/Contacto (15 min)

```html
<footer id="contact">
	<h2>Contacto</h2>
	<a href="mailto:tu@email.com">tu@email.com</a>
	<ul>
		<li><a href="https://instagram.com/tu" aria-label="Instagram">Instagram</a></li>
		<li><a href="https://behance.net/tu" aria-label="Behance">Behance</a></li>
		<!-- Más redes -->
	</ul>
	<p>© 2026 Tu Nombre</p>
</footer>
```

**Importante**: Usar `aria-label` en iconos de redes sociales.

**Prompt IA — Footer con Contacto**:

```markdown
Crea el footer con información de contacto y redes sociales.

**Información de contacto:**
- Email: [tu@email.com]
- Redes sociales con URLs:
  - Instagram: [URL]
  - Behance: [URL]
  - LinkedIn: [URL]
  - [Otras que uses]

**Requisitos:**
- Sección destacada con CTA de contacto (email visible)
- Iconos de redes sociales con aria-label
- Layout centrado y limpio
- Usar color primario en enlaces hover
- Copyright con tu nombre y año actual

**Accesibilidad:**
- Cada icono social debe tener aria-label descriptivo
- Enlaces externos con target="_blank" y rel="noopener"
- Touch targets de 44px+ en móvil

Genera HTML + CSS para footer completo.
```

---

## Parte 4: Testing Responsive y Accesibilidad (45 min)

### 4.1 Testing Responsive

**Enfoque mobile-first**: Comenzar con móvil, luego adaptar.

| Breakpoint            | Verificar                                          |
| --------------------- | -------------------------------------------------- |
| **320px** (móvil)     | Stack vertical, texto legible, touch targets 44px+ |
| **768px** (tablet)    | Grid 2 columnas, navegación visible                |
| **1024px+** (desktop) | Layout completo, hover states                      |

**Herramientas**:

- DevTools → Device Mode
- Probar en móvil real si es posible

### 4.2 Checklist de Accesibilidad

- [ ] **Semántica**: `<nav>`, `<main>`, `<footer>`, headings ordenados
- [ ] **Contraste**: Texto legible sobre fondos (ratio 4.5:1 mínimo)
- [ ] **Navegación teclado**: Tab funciona en todos los enlaces
- [ ] **Alt text**: Todas las imágenes tienen descripción
- [ ] **Focus visible**: Se ve qué elemento está enfocado

### 4.3 Verificar imágenes

- [ ] Cargan correctamente desde ImageKit
- [ ] No son excesivamente pesadas
- [ ] Tienen dimensiones apropiadas

---

## Parte 5: Commit y Documentación (25 min)

### Commit

```bash
git add .
git commit -m "feat(s3): página multi-sección responsive

- Header con navegación
- Sección Hero
- Galería de proyectos
- Sección About
- Footer con contacto y redes
- Diseño responsive mobile-first"
```

### Verificar GitHub Pages

Asegurar que el deploy refleja los cambios.

---

## ✅ Checklist de Entregables S3

- [ ] **Todas las secciones** implementadas (Hero, Work, About, Footer)
- [ ] **Navegación** funcional con anclas
- [ ] **Contenido real** (imágenes propias, textos redactados)
- [ ] **Responsive** funcionando en móvil y desktop
- [ ] **Semántica HTML** correcta
- [ ] **1 commit** documentando el progreso

---

## 🎯 Al finalizar la sesión

Cada estudiante debe tener:

1. ✅ Sitio multi-sección **estructuralmente completo**
2. ✅ Navegación funcional (anclas a secciones)
3. ✅ Diseño adaptativo en móvil y escritorio
4. ✅ Contenido personalizado integrado

---

## 🎨 Prompt IA Master — Portfolio Completo

**Para estudiantes que prefieren un enfoque integrado:**

```markdown
Crea mi portfolio completo de ilustrador/a con TODOS mis contenidos preparados.

## Contenidos Preparados

**Sistema de Diseño:**
- Tipografía Heading: [Nombre] (Google Fonts)
- Tipografía Body: [Nombre] (Google Fonts)
- Color Primario: #[hex]
- Color Secundario: #[hex]
- Color Fondo: #[hex]
- Color Texto: #[hex]

**Textos:**
- Nombre/Logo: [Tu nombre]
- Lema Hero: [Tu lema]
- Bio: [Tu bio completa]
- Statement: [Tu statement artístico]

**Imágenes (URLs de ImageKit):**
- Hero: [URL]
- Proyectos:
  1. [Proyecto 1 - URL + descripción breve]
  2. [Proyecto 2 - URL + descripción breve]
  3. [Proyecto 3 - URL + descripción breve]
  ...
- Foto personal: [URL] (opcional)

**Contacto:**
- Email: [email]
- Instagram: [URL]
- Behance: [URL]
- Otras redes: [URLs]

## Estructura Requerida

**HTML Semántico:**
```
<header> con <nav>
  └─ Logo/Nombre + enlaces (#work, #about, #contact)
<main>
  <section id="hero">
    └─ Título + Lema + Imagen destacada + CTA
  <section id="work">
    └─ Grid responsive de proyectos (cards con imagen + título)
  <section id="about">
    └─ Foto + Bio + Statement
<footer id="contact">
  └─ Email + Redes sociales + Copyright
```

**Responsive:**
- Mobile-first (320px base)
- Breakpoints: 768px, 1024px, 1440px
- Móvil: stack vertical, 1 columna
- Tablet: 2 columnas en galería
- Desktop: 3-4 columnas, navegación horizontal

**Accesibilidad:**
- Headings jerárquicos (h1 > h2 > h3)
- Alt text descriptivo en TODAS las imágenes
- Contraste WCAG AA (4.5:1 texto, 3:1 UI)
- Navegación por teclado funcional
- aria-label en iconos de redes

**CSS:**
- Variables CSS para colores y fuentes
- Grid/Flexbox para layouts
- Transiciones suaves en hover
- Progressive enhancement

## Entregables

Genera 3 archivos:

1. **index.html** — Estructura completa
2. **theme.css** — Sistema de diseño + estilos
3. **README.md** — Documentación del portfolio

Documenta decisiones de diseño y próximos pasos para S4 (interactividad).
```

---

## Reflexión ATELIER

```markdown
## Reflexión S3

### Estructura

1. ¿Qué sección fue más difícil de maquetar?
2. ¿Tu diseño refleja tu identidad como ilustrador/a?

### Responsive

1. ¿Qué ajustes tuviste que hacer para móvil?
2. ¿Qué breakpoints usaste?

### Preparación S4

1. ¿Qué interacciones quieres añadir?
2. ¿Qué mejorarías de la navegación?
```

---

<table style="width: 100%; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
  <tr>
    <td style="text-align: left;">
      ← Anterior: <a href="{{ '/tracks/es/ilustracion-webapp/s2-galerias-layouts-media/' | relative_url }}">S2: Galerías y layouts</a>
    </td>
    <td style="text-align: right;">
      Siguiente →: <a href="{{ '/tracks/es/ilustracion-webapp/s4-interactividad-ux-ui/' | relative_url }}">S4: Interactividad y UX</a>
    </td>
  </tr>
</table>
