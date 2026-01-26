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

**Fase de Producto**: Content → Visual Design → Component Library

---

## 🎯 Objetivos

### Objetivos de Producto

- Crear **contenido compelling** que comunique valor en segundos
- Establecer **jerarquía visual** clara para guiar la atención del usuario
- Construir **galería de proyectos** que muestre tu mejor trabajo con ritmo y narrativa
- Aplicar **criterios de diseño nivel Awwwards** en composición y estética

### Objetivos Técnicos

- Dominar **CSS Grid y Flexbox** para layouts profesionales de portfolio
- Implementar **sistema de componentes** reutilizables (cards, galería, navegación)
- Optimizar **imágenes para web** (formatos modernos, lazy loading, responsive)
- Aplicar **diseño intrínseco** para adaptación fluida a cualquier pantalla

### Objetivos de Diseño

- Alcanzar **excelencia visual** con tipografía, color y composición
- Crear **micro-interacciones CSS** que mejoren la experiencia
- Mantener **consistencia** con el sistema de diseño de S1
- Lograr **contraste WCAG AA** en todos los elementos

## 🧭 Canon de Referencia

Para detalles y teoría profunda, consulta:

**Media y Optimización**:

- [Media: Video y contenido audiovisual]({{ '/lessons/es/media/video/' | relative_url }})
- [El Tao de las imágenes en movimiento]({{ '/lessons/es/media/video/the-tao-of-moving-images/' | relative_url }})

**Layouts y Grids**:

- [Diseño Web: Responsive, Fluido e Intrínseco]({{ '/lessons/es/responsive/' | relative_url }})
- [Diseño Intrínseco Web]({{ '/lessons/es/intrinsic-web-design/' | relative_url }})

**Metodología IA**:

- [Guía Práctica de Desarrollo Asistido por IA]({{ '/methodology/es/ai-practical-guide/' | relative_url }})

### Preparación Previa

Antes de la sesión, ten listo:

- [ ] 6-8 imágenes de tus mejores proyectos
- [ ] Imágenes optimizadas (WebP, < 500KB cada una)
- [ ] Títulos y descripciones breves para cada proyecto
- [ ] Referencias visuales de galerías que admiras
- [ ] Sistema de diseño de S1 funcionando

---

## ⏱️ Desglose de Tiempo (3.5 horas)

| Parte | Duración | Fase              | Actividad Principal                                     |
| ----- | -------- | ----------------- | ------------------------------------------------------- |
| **1** | 40 min   | Content Strategy  | Copy compelling, jerarquía de información, storytelling |
| **2** | 90 min   | Visual Design     | Tipografía, layout Grid/Flexbox, color, imagery         |
| **3** | 60 min   | Component Library | Cards, galería, estados hover, micro-interacciones      |
| **4** | 30 min   | Polish & Deploy   | Testing responsive, optimización, commit                |

---

## Parte 1: Content Strategy (40 min)

### 1.1 Exploración — Análisis de Galerías Profesionales (15 min)

**Actividad**: Analiza 3 portfolios de ilustradores premiados

**Criterios de análisis**:

| Aspecto          | Preguntas Clave                                             |
| ---------------- | ----------------------------------------------------------- |
| **Layout**       | ¿Grilla regular o asimétrica? ¿Masonry o grid fijo?         |
| **Ritmo Visual** | ¿Cómo manejan tamaños y espacios? ¿Hay respiración?         |
| **Jerarquía**    | ¿Proyectos destacados vs. secundarios? ¿Cómo se distinguen? |
| **Responsive**   | ¿Qué pasa en móvil? ¿Se mantiene la jerarquía?              |
| **Performance**  | ¿Cargan rápido? ¿Lazy loading? ¿Imágenes optimizadas?       |
| **Interacción**  | ¿Hover añade info? ¿Transiciones suaves? ¿Feedback visual?  |
| **Contenido**    | ¿Títulos descriptivos? ¿Contexto del proyecto?              |

**Prompt IA - Análisis de Galerías**:

```markdown
Analiza estos 3 portfolios de ilustradores [URLs]:

Para cada uno, evalúa:

1. **Diseño Visual (Awwwards criteria)**
   - Estética general (1-10)
   - Tipografía y jerarquía
   - Uso de color y contraste
   - Composición y espaciado

2. **UX de Galería**
   - Facilidad para explorar proyectos
   - Claridad de navegación
   - Información por proyecto (título, descripción, tags)
   - Call-to-actions efectivos

3. **Técnica**
   - Tipo de layout (grid, masonry, custom)
   - Responsive behavior
   - Performance (carga de imágenes)
   - Micro-interacciones

4. **Insights Accionables**
   - 3 cosas que funcionan bien
   - 3 oportunidades de mejora
   - 2 ideas que puedo adaptar a mi portfolio

Formato: Tabla comparativa + recomendaciones específicas.
```

### 1.2 Content Strategy — Copy Compelling (15 min)

**Actividad**: Escribe contenido que venda tu trabajo

**Elementos de contenido**:

1. **Headline de galería** (5-10 palabras)
   - Ejemplo: "Ilustraciones que cuentan historias"
   - Ejemplo: "Narrativa visual para marcas con propósito"

2. **Descripción por proyecto** (20-30 palabras)
   - Contexto: ¿Para quién? ¿Qué problema resolvió?
   - Enfoque: ¿Qué técnica? ¿Qué hace único este proyecto?
   - Resultado: ¿Qué impacto tuvo?

3. **Tags/Categorías**
   - Técnica: Acuarela, Digital, Mixta
   - Industria: Editorial, Publicidad, Personal
   - Estilo: Narrativo, Conceptual, Decorativo

**Prompt IA - Content Strategy**:

```markdown
Crea copy compelling para mi galería de proyectos.

Contexto:

- Especialidad: [tu especialidad]
- Audiencia: [directores de arte, editores, etc.]
- Tono: [profesional/creativo/accesible]

Para cada uno de mis 6 proyectos:

Proyecto 1: [título provisional]

- Cliente/Contexto: [describe]
- Técnica: [describe]
- Objetivo: [qué buscaba lograr]

Genera:

1. **Headline de galería** (3 opciones)
   - Debe comunicar valor en 5 segundos
   - Tono consistente con mi marca

2. **Descripción por proyecto** (20-30 palabras)
   - Formato: Contexto + Enfoque + Resultado
   - Lenguaje activo y específico
   - Evitar jerga innecesaria

3. **Tags relevantes**
   - Categorías útiles para filtrado
   - Términos que buscaría mi audiencia

Criterios: Claridad > Creatividad. El copy debe vender, no decorar.
```

### 1.3 Jerarquía de Información (10 min)

**Actividad**: Define qué proyectos destacar y por qué

**Matriz de priorización**:

| Proyecto   | Calidad Visual | Relevancia Audiencia | Diversidad Técnica | Prioridad |
| ---------- | -------------- | -------------------- | ------------------ | --------- |
| Proyecto A | Alta           | Alta                 | Media              | **Hero**  |
| Proyecto B | Alta           | Media                | Alta               | Destacado |
| Proyecto C | Media          | Alta                 | Media              | Estándar  |

**Decisiones de jerarquía**:

- **Hero project** (1): Ocupa 2 columnas, primera posición
- **Destacados** (2-3): Tamaño grande, posiciones estratégicas
- **Estándar** (3-5): Tamaño regular, completan la galería

**Documenta**: `docs/content-strategy-s2.md`

---

## Parte 2: Visual Design Excellence (90 min)

### 2.1 Tipografía y Jerarquía Visual (20 min)

**Actividad**: Refina tu sistema tipográfico para contenido

**Escala tipográfica para galería**:

```css
/* Títulos de proyectos */
.project-title {
	font-size: clamp(1.25rem, 2vw + 1rem, 1.75rem);
	font-weight: 600;
	line-height: 1.2;
	letter-spacing: -0.02em;
}

/* Descripciones */
.project-description {
	font-size: clamp(0.875rem, 1vw + 0.75rem, 1rem);
	line-height: 1.6;
	color: var(--color-text-muted);
}

/* Tags */
.project-tag {
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	font-weight: 500;
}
```

**Prompt IA - Tipografía**:

```markdown
Optimiza mi sistema tipográfico para galería de proyectos.

Sistema actual:

- Heading font: [tu fuente]
- Body font: [tu fuente]
- Base size: 16px

Necesito:

1. **Escala para galería**
   - Título de galería (h2)
   - Título de proyecto (h3)
   - Descripción de proyecto (p)
   - Tags/categorías (small)

2. **Responsive con clamp()**
   - Mobile: legible en 320px
   - Desktop: aprovecha espacio en 1920px
   - Fluid scaling entre breakpoints

3. **Jerarquía visual**
   - Contraste de tamaño claro
   - Line-height óptimo para legibilidad
   - Letter-spacing para títulos

4. **CSS listo para copiar**
   - Variables CSS
   - Clases reutilizables
   - Comentarios explicativos

Criterios: Legibilidad > Estética. Debe funcionar en todos los tamaños.
```

### 2.2 Layout de Galería con CSS Grid (30 min)

**Actividad**: Implementa layout profesional con Grid

**Opciones de layout**:

**Opción A: Grid Uniforme con Hero**

```css
.gallery {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: var(--space-lg);
}

.project--hero {
	grid-column: span 2;
	grid-row: span 2;
}
```

**Opción B: Grid Asimétrico**

```css
.gallery {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: var(--space-md);
}

.project--large {
	grid-column: span 8;
}
.project--medium {
	grid-column: span 6;
}
.project--small {
	grid-column: span 4;
}
```

**Opción C: Masonry con Grid (experimental)**

```css
.gallery {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	grid-auto-rows: masonry; /* Experimental */
	gap: var(--space-md);
}
```

**Prompt IA - Layout Grid**:

```markdown
Diseña un layout de galería CSS Grid para portfolio de ilustrador/a.

Requisitos:

1. **Estructura**
   - 6-8 proyectos
   - 1 hero project (doble tamaño)
   - 2-3 proyectos destacados (grande)
   - Resto estándar

2. **Responsive**
   - Mobile (< 768px): 1 columna, hero normal
   - Tablet (768-1023px): 2 columnas, hero span 2
   - Desktop (1024px+): 3-4 columnas, hero span 2x2

3. **Diseño Intrínseco**
   - Auto-fit para flexibilidad
   - Minmax para control de tamaño
   - Gap consistente con sistema de diseño

4. **Consideraciones**
   - Aspect ratio consistente (4:3 o 16:9)
   - Object-fit: cover para imágenes
   - Transiciones suaves en hover

Genera:

- CSS completo con comentarios
- Variantes de layout (uniforme, asimétrico, masonry)
- Recomendación con justificación
```

### 2.3 Color y Contraste (15 min)

**Actividad**: Verifica y ajusta contraste WCAG AA

**Checklist de contraste**:

- [ ] Títulos sobre fondo: ≥ 4.5:1
- [ ] Descripciones sobre fondo: ≥ 4.5:1
- [ ] Tags sobre fondo: ≥ 4.5:1
- [ ] Texto sobre imágenes: overlay con contraste suficiente
- [ ] Estados hover: cambio visible pero no agresivo

**Herramientas**:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)

**Prompt IA - Verificación de Contraste**:

```markdown
Verifica el contraste de mi sistema de colores para galería.

Colores actuales:

- Fondo: [hex]
- Texto primario: [hex]
- Texto secundario: [hex]
- Color de acento: [hex]

Verifica:

1. **Ratios WCAG AA**
   - Texto normal: ≥ 4.5:1
   - Texto grande (18px+): ≥ 3:1
   - UI components: ≥ 3:1

2. **Casos de uso**
   - Títulos de proyecto sobre fondo
   - Descripciones sobre fondo
   - Tags/categorías
   - Texto sobre imágenes (con overlay)
   - Estados hover/focus

3. **Ajustes necesarios**
   - Si algún ratio falla, sugiere alternativas
   - Mantén coherencia con paleta
   - Proporciona valores hex ajustados

Formato: Tabla con ratios + recomendaciones.
```

### 2.4 Imagery y Optimización (25 min)

**Actividad**: Optimiza imágenes para web

**Proceso de optimización**:

1. **Formato**
   - WebP (primera opción, -30% tamaño vs JPEG)
   - JPEG optimizado (fallback)
   - Evitar PNG para fotos (muy pesado)

2. **Tamaños**
   - Thumbnail: 400px ancho, ~50KB
   - Medium: 800px ancho, ~150KB
   - Large: 1600px ancho, ~300KB
   - Hero: 2400px ancho, ~500KB

3. **Responsive Images**

```html
<picture>
	<source
		srcset="img/proyecto-400.webp 400w, img/proyecto-800.webp 800w, img/proyecto-1600.webp 1600w"
		type="image/webp" />
	<img src="img/proyecto-800.jpg" alt="Descripción detallada del proyecto" loading="lazy" width="800" height="600" />
</picture>
```

4. **Lazy Loading**
   - Atributo `loading="lazy"` en todas las imágenes
   - Excepto hero/above-the-fold

**Herramientas**:

- [TinyPNG](https://tinypng.com/) - Compresión
- [Squoosh](https://squoosh.app/) - Conversión WebP
- [ImageOptim](https://imageoptim.com/) - Batch optimization

**Prompt IA - Optimización de Imágenes**:

```markdown
Crea un script de optimización para mis imágenes de portfolio.

Contexto:

- Tengo 8 proyectos
- Cada proyecto tiene 1 imagen principal
- Formatos originales: PNG, JPEG (alta resolución)
- Tamaños originales: 3000-5000px, 2-5MB cada una

Necesito:

1. **Proceso de optimización**
   - Redimensionar a múltiples tamaños (400, 800, 1600, 2400px)
   - Convertir a WebP + mantener JPEG fallback
   - Comprimir sin pérdida visible de calidad
   - Mantener aspect ratio original

2. **Nomenclatura**
   - proyecto-nombre-[tamaño].[formato]
   - Ejemplo: proyecto-editorial-800.webp

3. **Script automatizado**
   - Bash script o Node.js
   - Procesa todas las imágenes en carpeta
   - Genera todas las variantes
   - Muestra reporte de tamaños

4. **HTML responsive**
   - Template <picture> con srcset
   - Lazy loading
   - Width/height para evitar layout shift

Formato: Script + instrucciones + template HTML.
```

---

## Parte 3: Component Library (60 min)

### 3.1 Card Component (20 min)

**Actividad**: Crea componente de proyecto reutilizable

**Estructura HTML semántica**:

```html
<article class="project-card" data-category="editorial">
	<a href="#proyecto-detalle" class="project-card__link">
		<figure class="project-card__figure">
			<picture>
				<source srcset="img/proyecto-400.webp 400w, img/proyecto-800.webp 800w" type="image/webp" />
				<img
					src="img/proyecto-800.jpg"
					alt="Ilustración editorial para revista literaria: personaje leyendo bajo árbol"
					loading="lazy"
					width="800"
					height="600"
					class="project-card__image" />
			</picture>
			<figcaption class="project-card__overlay">
				<span class="project-card__category">Editorial</span>
			</figcaption>
		</figure>
		<div class="project-card__content">
			<h3 class="project-card__title">Revista Literaria 2024</h3>
			<p class="project-card__description">
				Ilustraciones narrativas para sección de cuentos. Técnica mixta: acuarela digital + texturas analógicas.
			</p>
			<ul class="project-card__tags">
				<li class="tag">Editorial</li>
				<li class="tag">Acuarela</li>
				<li class="tag">Narrativo</li>
			</ul>
		</div>
	</a>
</article>
```

**CSS del componente**:

```css
.project-card {
	position: relative;
	border-radius: var(--radius-md);
	overflow: hidden;
	background: var(--color-bg-alt);
	transition:
		transform 300ms ease,
		box-shadow 300ms ease;
}

.project-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.project-card__figure {
	position: relative;
	margin: 0;
	aspect-ratio: 4 / 3;
	overflow: hidden;
}

.project-card__image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 500ms ease;
}

.project-card:hover .project-card__image {
	transform: scale(1.05);
}

.project-card__overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
	display: flex;
	align-items: flex-end;
	padding: var(--space-md);
	opacity: 0;
	transition: opacity 300ms ease;
}

.project-card:hover .project-card__overlay {
	opacity: 1;
}

.project-card__category {
	color: white;
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	font-weight: 600;
}

.project-card__content {
	padding: var(--space-md);
}

.project-card__title {
	font-size: clamp(1.125rem, 1.5vw + 0.875rem, 1.375rem);
	margin: 0 0 var(--space-xs) 0;
	color: var(--color-text);
}

.project-card__description {
	font-size: 0.875rem;
	line-height: 1.6;
	color: var(--color-text-muted);
	margin: 0 0 var(--space-sm) 0;
}

.project-card__tags {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-xs);
	list-style: none;
	padding: 0;
	margin: 0;
}

.tag {
	font-size: 0.75rem;
	padding: 0.25rem 0.5rem;
	background: var(--color-bg);
	border-radius: var(--radius-sm);
	color: var(--color-text-muted);
}
```

**Prompt IA - Card Component**:

```markdown
Crea un componente de proyecto (card) para galería de portfolio.

Requisitos:

1. **Estructura**
   - Imagen responsive con picture/srcset
   - Título del proyecto
   - Descripción breve (20-30 palabras)
   - Tags/categorías
   - Overlay en hover con categoría

2. **Estados**
   - Default: card estático
   - Hover: elevación + zoom imagen + overlay visible
   - Focus: outline visible para teclado
   - Active: feedback táctil

3. **Accesibilidad**
   - Semántica HTML correcta (<article>, <figure>)
   - Alt text descriptivo en imágenes
   - Link wrapping para toda la card
   - Keyboard navigable

4. **Performance**
   - Lazy loading en imágenes
   - Transiciones GPU-accelerated (transform, opacity)
   - Will-change solo en hover

5. **Responsive**
   - Funciona en cards de 280px a 600px ancho
   - Tipografía fluid con clamp()
   - Padding proporcional

Genera:

- HTML completo
- CSS con BEM naming
- Variantes (hero, destacado, estándar)
- Comentarios explicativos
```

### 3.2 Galería Completa (25 min)

**Actividad**: Ensambla galería con todos los proyectos

**HTML de galería**:

```html
<section class="gallery" aria-labelledby="gallery-heading">
	<div class="container">
		<header class="gallery__header">
			<h2 id="gallery-heading" class="gallery__title">Proyectos Destacados</h2>
			<p class="gallery__description">Ilustraciones que cuentan historias para marcas con propósito.</p>
		</header>

		<div class="gallery__grid">
			<!-- Hero project -->
			<article class="project-card project-card--hero">
				<!-- contenido -->
			</article>

			<!-- Featured projects -->
			<article class="project-card project-card--featured">
				<!-- contenido -->
			</article>

			<!-- Standard projects -->
			<article class="project-card">
				<!-- contenido -->
			</article>
			<!-- repetir -->
		</div>
	</div>
</section>
```

**CSS de galería**:

```css
.gallery {
	padding: var(--space-2xl) 0;
}

.gallery__header {
	text-align: center;
	max-width: 600px;
	margin: 0 auto var(--space-xl) auto;
}

.gallery__title {
	font-size: clamp(2rem, 4vw + 1rem, 3rem);
	margin: 0 0 var(--space-sm) 0;
}

.gallery__description {
	font-size: clamp(1rem, 1.5vw + 0.75rem, 1.25rem);
	color: var(--color-text-muted);
}

.gallery__grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: var(--space-lg);
}

/* Variantes de tamaño */
.project-card--hero {
	grid-column: span 2;
	grid-row: span 2;
}

.project-card--featured {
	grid-column: span 2;
}

/* Responsive */
@media (max-width: 768px) {
	.project-card--hero,
	.project-card--featured {
		grid-column: span 1;
		grid-row: span 1;
	}

	.gallery__grid {
		grid-template-columns: 1fr;
	}
}
```

### 3.3 Micro-interacciones CSS (15 min)

**Actividad**: Añade pulido con transiciones y animaciones

**Micro-interacciones clave**:

1. **Hover en cards**

```css
.project-card {
	transition:
		transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
		box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover {
	transform: translateY(-8px);
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}
```

2. **Zoom en imágenes**

```css
.project-card__image {
	transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .project-card__image {
	transform: scale(1.08);
}
```

3. **Fade-in en overlay**

```css
.project-card__overlay {
	opacity: 0;
	transition: opacity 400ms ease;
}

.project-card:hover .project-card__overlay {
	opacity: 1;
}
```

4. **Respeto por prefers-reduced-motion**

```css
@media (prefers-reduced-motion: reduce) {
	.project-card,
	.project-card__image,
	.project-card__overlay {
		transition: none;
	}

	.project-card:hover {
		transform: none;
	}

	.project-card:hover .project-card__image {
		transform: none;
	}
}
```

**Prompt IA - Micro-interacciones**:

```markdown
Diseña micro-interacciones CSS para galería de portfolio.

Componentes:

- Cards de proyecto
- Imágenes
- Overlay de información
- Tags/categorías

Requisitos:

1. **Principios**
   - Sutiles pero perceptibles
   - Propósito claro (feedback, guía, deleite)
   - Performance (GPU-accelerated)
   - Accesibles (respeta prefers-reduced-motion)

2. **Interacciones específicas**
   - Hover en card: elevación + sombra
   - Hover en imagen: zoom sutil (1.05-1.1x)
   - Hover en overlay: fade-in con info
   - Focus en link: outline visible
   - Hover en tags: cambio de color

3. **Timing**
   - Duración: 200-400ms (rápido pero no abrupto)
   - Easing: cubic-bezier para naturalidad
   - Stagger: delays progresivos si hay múltiples elementos

4. **Accesibilidad**
   - @media (prefers-reduced-motion: reduce)
   - Mantener funcionalidad sin animaciones
   - Focus states siempre visibles

Genera:

- CSS completo con transiciones
- Variantes de easing
- Media query para reduced motion
- Comentarios sobre por qué cada decisión
```

---

## Parte 4: Polish & Deploy (30 min)

### 4.1 Testing Responsive (10 min)

**Actividad**: Verifica en todos los breakpoints

**Checklist de testing**:

- [ ] **Mobile (320px-767px)**
  - Galería en 1 columna
  - Imágenes cargan lazy
  - Texto legible
  - Touch targets ≥ 44px
  - No scroll horizontal

- [ ] **Tablet (768px-1023px)**
  - Galería en 2 columnas
  - Hero project visible
  - Spacing proporcional
  - Hover states funcionan

- [ ] **Desktop (1024px+)**
  - Galería en 3-4 columnas
  - Hero project destacado
  - Micro-interacciones suaves
  - Layout balanceado

**Herramientas**:

- Chrome DevTools (Cmd+Shift+M)
- Responsive Viewer extension
- Dispositivos reales si es posible

### 4.2 Accesibilidad (10 min)

**Checklist WCAG AA**:

- [ ] **Imágenes**
  - Alt text descriptivo (no "imagen 1")
  - Describe contenido y contexto
  - Vacío si decorativa

- [ ] **Contraste**
  - Títulos: ≥ 4.5:1
  - Descripciones: ≥ 4.5:1
  - Tags: ≥ 4.5:1
  - Overlay text: ≥ 4.5:1

- [ ] **Navegación por teclado**
  - Tab recorre todos los proyectos
  - Focus visible en cada card
  - Enter/Space activa links
  - Escape cierra modals (si hay)

- [ ] **Semántica**
  - Headings jerárquicos (h2 → h3)
  - Landmarks (<section>, <article>)
  - ARIA labels donde necesario

- [ ] **Reduced Motion**
  - Animaciones desactivadas
  - Funcionalidad intacta

**Verificación**:

- [WAVE](https://wave.webaim.org/) - Accessibility checker
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- Lighthouse Accessibility audit

### 4.3 Deploy y Documentación (10 min)

**Commit**:

```bash
git add .
git commit -m "feat(s2): galería de proyectos con diseño visual nivel Awwwards

- Implementa content strategy con copy compelling
- Layout CSS Grid responsive con hero project
- Componente de proyecto reutilizable con micro-interacciones
- Optimización de imágenes (WebP + lazy loading)
- Tipografía refinada con jerarquía clara
- Contraste WCAG AA verificado
- Accesibilidad completa (teclado + screen readers)

Entregables S2:
- [x] Contenido compelling
- [x] Diseño visual nivel Awwwards
- [x] Librería de componentes
- [x] Responsive en todos los dispositivos
- [x] Micro-interacciones CSS
- [x] 1 commit significativo"
```

**Actualiza README**:

```markdown
## 📋 Sesión 2 - Visual Excellence & Content Strategy

### Entregables

- [x] 6-8 proyectos con contenido compelling
- [x] Galería responsive con CSS Grid
- [x] Hero project destacado
- [x] Componente de proyecto reutilizable
- [x] Micro-interacciones CSS
- [x] Imágenes optimizadas (WebP + lazy loading)
- [x] Contraste WCAG AA verificado
- [x] 1 commit significativo

### Decisiones de Diseño

**Layout**:

- Grid con hero project (2x2)
- 2-3 proyectos destacados
- Auto-fit para flexibilidad

**Tipografía**:

- Títulos: [tamaño y fuente]
- Descripciones: [tamaño y fuente]
- Escala fluid con clamp()

**Micro-interacciones**:

- Hover: elevación + zoom imagen
- Overlay con categoría
- Respeta prefers-reduced-motion

### Próximos Pasos (S3)

- [ ] Navegación multi-sección
- [ ] Footer con contacto
- [ ] Componentes adicionales (about, contact)
- [ ] Framework CSS (Bootstrap/Tailwind) opcional
```

---

## ✅ Checklist de Entregables S2

### Mínimo Viable (Requerido)

- [ ] **Galería funcional** con 6-8 proyectos
- [ ] **Content strategy** documentada (`docs/content-strategy-s2.md`)
- [ ] **Layout responsive** (320px-1920px)
- [ ] **Hero project** destacado visualmente
- [ ] **Componente de proyecto** reutilizable
- [ ] **Imágenes optimizadas** (WebP, < 500KB)
- [ ] **Lazy loading** en imágenes
- [ ] **Micro-interacciones** CSS
- [ ] **1 commit significativo**
- [ ] **README actualizado**

### Calidad de Diseño

- [ ] Tipografía con jerarquía clara
- [ ] Contraste WCAG AA en todos los textos
- [ ] Spacing consistente con sistema de diseño
- [ ] Transiciones suaves (300-400ms)
- [ ] Estados hover/focus visibles
- [ ] Respeta prefers-reduced-motion

### Excelencia (Opcional)

- [ ] Filtros por categoría (CSS o JS)
- [ ] Lightbox para ver imágenes grandes
- [ ] Animaciones de entrada (scroll-triggered)
- [ ] Dark mode para galería
- [ ] Metadata Open Graph por proyecto

---

## 🎯 Criterios de Éxito S2

### Diseño Visual (Awwwards)

✅ **Estética profesional** con tipografía, color y composición cuidadas  
✅ **Jerarquía visual clara** que guía la atención del usuario  
✅ **Micro-interacciones** que mejoran la experiencia sin distraer  
✅ **Consistencia** con sistema de diseño de S1

### Contenido

✅ **Copy compelling** que comunica valor en segundos  
✅ **Descripciones específicas** que contextualizan cada proyecto  
✅ **Alt text descriptivo** en todas las imágenes  
✅ **Tags relevantes** para categorización

### Técnica

✅ **CSS Grid** implementado correctamente  
✅ **Responsive** sin roturas en ningún breakpoint  
✅ **Imágenes optimizadas** con WebP + lazy loading  
✅ **Performance** con carga rápida (< 3s)

---

## 📚 Recursos Adicionales

### Diseño

- [Awwwards: Portfolio Galleries](https://www.awwwards.com/websites/portfolio/)
- [Dribbble: Gallery Layouts](https://dribbble.com/search/gallery-layout)
- [CSS Grid Garden](https://cssgridgarden.com/) - Juego para aprender Grid

### Optimización

- [web.dev: Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Squoosh](https://squoosh.app/) - Herramienta de compresión
- [Responsive Images 101](https://cloudfour.com/thinks/responsive-images-101-definitions/)

### Inspiración

- [Siteinspire: Illustration](https://www.siteinspire.com/websites?categories=18)
- [Behance: Portfolio Design](https://www.behance.net/search/projects?field=portfolio%20design)
- [Codrops: Image Grid Effects](https://tympanus.net/codrops/category/playground/)

### 4.4 Exhibición y Reflexión (5 min)

**Presentación** (2 min por persona):

1. **Muestra tu galería**
   - Vista móvil y desktop
   - Hover en proyectos

2. **Comparte 1 decisión de diseño**
   - Layout elegido y por qué
   - Proyecto hero y criterio de selección

3. **Muestra 1 proyecto del que estés orgulloso/a**
   - Por qué lo destacas
   - Qué comunica

**Reflexión ATELIER**:

```markdown
## Reflexión S2

### Diseño

1. ¿Qué aprendiste sobre presentar tu arte en web?
2. ¿Qué decisión de diseño defiendes más?
3. ¿Cómo balanceaste estética y funcionalidad?

### Contenido

1. ¿Fue difícil escribir sobre tu trabajo?
2. ¿El copy comunica lo que querías?
3. ¿Qué ajustarías en las descripciones?

### Técnica

1. ¿CSS Grid fue intuitivo o complejo?
2. ¿Las micro-interacciones mejoran la experiencia?
3. ¿Qué concepto técnico necesitas reforzar?

### Próxima Sesión

1. ¿Qué secciones adicionales necesitas (about, contact)?
2. ¿Quieres usar framework CSS o continuar vanilla?
3. ¿Qué interacción te gustaría añadir en S3?
```

**Documenta**: `docs/reflexion-s2.md`

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
