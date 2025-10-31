---
layout: lesson
title: 'Herramientas de Diseño Web Clásicas y Modernas (2025)'
title_alt: 'Herramientas de Diseño Web Clásicas y Modernas (2025)'
slug: web-design-tools
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/web-design-tools/
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## 🎯 Objetivos

En esta lección, exploraremos **_frameworks_ de CSS**, **_frameworks_ de JavaScript** y **herramientas de plantillas** utilizados en el diseño web moderno. Para cada herramienta, destacaremos características clave, tecnologías subyacentes, curva de aprendizaje, **requisitos de runtime** (Node.js vs. standalone), y casos de uso prácticos.

Al final de esta lección, cada estudiante creará un **recurso de referencia HTML** (`/resources/index.html`) que servirá como guía personal y artefacto de portafolio.

---

## 📂 Estructura del Proyecto

Para esta lección, crea la siguiente estructura de archivos:

```
student-project/
├── resources/
│   └── index.html              # Tu recurso de referencia de herramientas
└── assets/
    └── css/
        ├── index.css           # CSS principal (reset, variables, layout base)
        └── resources.css       # CSS específico para la página de recursos
```

**💡 Instrucciones para estudiantes:**

- Crea la carpeta `resources/` para tu página de referencia
- Añade los archivos CSS en `/assets/css/` (carpeta ya existente)
- Tu HTML incluye **dos enlaces CSS**: uno al CSS principal (`index.css`) y otro al específico (`resources.css`)
- Puedes abrir `resources/index.html` en tu navegador para ver el resultado

---

## 🔧 Clasificación por Requisitos de Runtime

### 📦 Herramientas que REQUIEREN Node.js

#### Frameworks y Build Tools

- **TailwindCSS** - Requiere Node.js para compilación y procesamiento
- **Vite** - Build tool moderno que necesita Node.js
- **Webpack** - Bundler que requiere Node.js
- **Parcel** - Build tool que necesita Node.js
- **Snowpack** - Build tool para desarrollo rápido

#### Frameworks JavaScript Modernos

- **React** - Requiere Node.js para desarrollo y build
- **Vue.js** - Necesita Node.js para CLI y build tools
- **Angular** - Requiere Node.js para Angular CLI
- **Svelte** - Necesita Node.js para compilación
- **Next.js** - Framework React que requiere Node.js
- **Nuxt.js** - Framework Vue que requiere Node.js

#### Generadores de Sitios Estáticos

- **Gatsby** - Generador React que requiere Node.js
- **Eleventy (11ty)** - Generador que necesita Node.js
- **Astro** - Framework moderno que requiere Node.js

#### Librerías de Componentes

- **Material UI** - Requiere Node.js para instalación
- **Ant Design** - Necesita Node.js
- **Chakra UI** - Requiere Node.js
- **Shadcn UI** - Necesita Node.js y pnpm/npm

### 🌐 Herramientas que NO REQUIEREN Node.js

#### Frameworks CSS Standalone

- **Bootstrap** - Funciona con CDN o descarga directa
- **Foundation** - Disponible vía CDN
- **Bulma** - CSS puro, funciona con CDN
- **Pure.css** - CSS puro, sin dependencias
- **Milligram** - CSS minimalista, sin Node.js

#### Librerías JavaScript Vanilla

- **GSAP** - Funciona con CDN o descarga directa
- **Anime.js** - JavaScript vanilla, CDN disponible
- **Three.js** - Librería 3D, funciona con CDN
- **Chart.js** - Gráficos, funciona sin Node.js
- **AOS (Animate On Scroll)** - JavaScript vanilla

#### Plantillas y Kits

- **HTML5 UP** - Plantillas HTML/CSS puras
- **Start Bootstrap** - Plantillas Bootstrap standalone
- **Templated** - Plantillas HTML/CSS gratuitas
- **FreeHTML5** - Plantillas sin dependencias

#### Generadores Sin Node.js

- **Jekyll** - Requiere Ruby (no Node.js)
- **Hugo** - Binario Go, no necesita Node.js
- **Zola** - Generador Rust, no requiere Node.js

---

## 📚 Herramientas por Categoría

### Hojas de Estilo y Frameworks CSS

#### [Bootstrap](https://getbootstrap.com/) 🌐 Sin Node.js

- **Características clave**: Sistema de cuadrícula responsivo, componentes predefinidos, utilidades
- **Tecnología**: CSS/SCSS, JavaScript vanilla
- **Runtime**: CDN o descarga directa
- **Curva de aprendizaje**: Principiante → Intermedio
- **Casos de uso**: Prototipado rápido, sistemas heredados, educación
- **Nota ATELIER**: Haz fork de una plantilla oficial y analiza la calidad semántica vs. utilidades

#### [TailwindCSS](https://tailwindcss.com/) 📦 Requiere Node.js

- **Características clave**: Utility-first, construcción de sistemas de diseño, compilador JIT
- **Tecnología**: PostCSS, bundlers de JavaScript
- **Runtime**: Node.js (npm/pnpm) para desarrollo y build
- **Curva de aprendizaje**: Intermedio
- **Casos de uso**: Sistemas de diseño personalizados, proyectos profesionales
- **Nota ATELIER**: Compara la carga cognitiva de memorizar clases vs. claridad semántica

#### [Foundation](https://get.foundation/) 🌐 Sin Node.js

- **Características clave**: Cuadrícula responsiva, énfasis en accesibilidad
- **Tecnología**: Sass (opcional), JavaScript vanilla
- **Runtime**: CDN o descarga directa
- **Curva de aprendizaje**: Intermedio
- **Casos de uso**: Layouts enfocados en accesibilidad

#### [Bulma](https://bulma.io/) 🌐 Sin Node.js

- **Características clave**: CSS puro, sin JavaScript, Flexbox-based
- **Tecnología**: CSS puro, Sass (opcional)
- **Runtime**: CDN o descarga directa
- **Curva de aprendizaje**: Principiante
- **Casos de uso**: Prototipado rápido sin dependencias

### Kits de UI y Librerías de Componentes

#### [Material UI](https://mui.com/) 📦 Requiere Node.js

- **Características clave**: Componentes React que implementan Material Design
- **Tecnología**: React, TypeScript
- **Runtime**: Node.js para instalación y desarrollo
- **Curva de aprendizaje**: Intermedio → Avanzado
- **Casos de uso**: Dashboards empresariales, portales educativos

#### [Shadcn UI](https://ui.shadcn.com/) 📦 Requiere Node.js

- **Características clave**: Componentes React copy-paste construidos con Tailwind
- **Tecnología**: React, TailwindCSS, primitivos Radix
- **Runtime**: Node.js + pnpm/npm
- **Curva de aprendizaje**: Intermedio
- **Casos de uso**: Portafolios, páginas SaaS modernas

#### [Ark UI](https://ark-ui.com/) 📦 Requiere Node.js

- **Características clave**: Primitivos UI headless, accesibles, framework-agnostic
- **Tecnología**: TypeScript, frameworks modernos
- **Runtime**: Node.js para instalación
- **Curva de aprendizaje**: Intermedio
- **Casos de uso**: Construcción de sistemas de diseño consistentes

### Generadores de Sitios Estáticos

#### [Jekyll](https://jekyllrb.com/) 🟥 Requiere Ruby (No Node.js)

- **Características clave**: Generador de sitios estáticos, plantillas Markdown + Liquid
- **Tecnología**: Ruby, datos YAML, soporte nativo GitHub Pages
- **Runtime**: Ruby (no Node.js)
- **Curva de aprendizaje**: Principiante → Intermedio
- **Casos de uso**: Blogs, portafolios, proyectos estudiantiles
- **Nota ATELIER**: Se conecta directamente a workflows de Git

#### [Eleventy (11ty)](https://www.11ty.dev/) 📦 Requiere Node.js

- **Características clave**: Generador de sitios estáticos flexible, múltiples lenguajes de plantillas
- **Tecnología**: Node.js
- **Runtime**: Node.js (npm)
- **Curva de aprendizaje**: Intermedio
- **Casos de uso**: Alternativa ligera a Jekyll, proyectos JAMstack

#### [Hugo](https://gohugo.io/) 🟢 Sin Node.js

- **Características clave**: Generador ultra-rápido, binario único
- **Tecnología**: Go (compilado a binario)
- **Runtime**: Binario standalone (no Node.js ni Ruby)
- **Curva de aprendizaje**: Principiante → Intermedio
- **Casos de uso**: Sitios grandes, blogs, documentación

#### [Astro](https://astro.build/) 📦 Requiere Node.js

- **Características clave**: Framework moderno, islands architecture, multi-framework
- **Tecnología**: Node.js, Vite
- **Runtime**: Node.js para desarrollo y build
- **Curva de aprendizaje**: Intermedio
- **Casos de uso**: Sitios estáticos con interactividad selectiva

### Librerías de Animación y Visuales

#### [GSAP](https://greensock.com/gsap/) 🌐 Sin Node.js

- **Características clave**: Animaciones enfocadas en rendimiento, timelines, scroll triggers
- **Tecnología**: JavaScript vanilla
- **Runtime**: CDN o descarga directa
- **Curva de aprendizaje**: Intermedio → Avanzado
- **Casos de uso**: Storytelling interactivo, sitios de marketing

#### [Framer Motion](https://www.framer.com/motion/) 📦 Requiere Node.js

- **Características clave**: Librería de animación para React
- **Tecnología**: React, TypeScript
- **Runtime**: Node.js (npm)
- **Curva de aprendizaje**: Intermedio
- **Casos de uso**: Portafolios interactivos, páginas SaaS

#### [Anime.js](https://animejs.com/) 🌐 Sin Node.js

- **Características clave**: Motor de animación ligero
- **Tecnología**: JavaScript vanilla
- **Runtime**: CDN o descarga directa
- **Curva de aprendizaje**: Principiante → Intermedio
- **Casos de uso**: Ilustraciones, efectos visuales ligeros

#### [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) 🌐 Sin Node.js

- **Características clave**: Animaciones al hacer scroll
- **Tecnología**: JavaScript vanilla, CSS
- **Runtime**: CDN o descarga directa
- **Curva de aprendizaje**: Principiante
- **Casos de uso**: Landing pages, presentaciones

### Plantillas y Kits de UI Abiertos

#### [HTML5 UP](https://html5up.net/) 🌐 Sin Node.js

- **Características clave**: Plantillas HTML/CSS responsivas gratuitas
- **Tecnología**: HTML5, CSS3
- **Runtime**: Descarga directa, fork de GitHub
- **Curva de aprendizaje**: Principiante
- **Casos de uso**: Proyectos estudiantiles, despliegues rápidos

#### [Cruip](https://cruip.com/) 📦 Requiere Node.js (versiones React)

- **Características clave**: Plantillas premium + gratuitas, basadas en React/Tailwind
- **Tecnología**: React, TailwindCSS (versiones React)
- **Runtime**: Descarga directa (HTML) o Node.js (React)
- **Curva de aprendizaje**: Intermedio
- **Casos de uso**: Páginas de inicio de startups

#### [Flowbite](https://flowbite.com/) 📦 Requiere Node.js

- **Características clave**: Librería de componentes TailwindCSS
- **Tecnología**: TailwindCSS, JavaScript
- **Runtime**: Node.js (npm) o CDN
- **Curva de aprendizaje**: Intermedio
- **Casos de uso**: Prototipado rápido con Tailwind

### Recursos de Datos y Medios

#### [Hygraph](https://hygraph.com/) 🌐 SaaS (Sin instalación local)

- **Características clave**: CMS headless con GraphQL
- **Tecnología**: GraphQL API
- **Runtime**: SaaS (no requiere instalación local)
- **Curva de aprendizaje**: Intermedio
- **Casos de uso**: Gestión de contenido estructurado

#### [ImageKit.io](https://imagekit.io/) 🌐 SaaS (Sin instalación local)

- **Características clave**: CDN de imágenes, optimización, transformaciones
- **Tecnología**: CDN global, API
- **Runtime**: SaaS (no requiere instalación local)
- **Curva de aprendizaje**: Principiante
- **Casos de uso**: Entrega de medios optimizados

#### [Netlify CMS](https://www.netlify.com/) 🌐 Sin Node.js

- **Características clave**: CMS Git-based, interfaz web
- **Tecnología**: JavaScript vanilla, API Git
- **Runtime**: Funciona con cualquier generador de sitios estáticos
- **Curva de aprendizaje**: Principiante → Intermedio
- **Casos de uso**: CMS para sitios estáticos

---

## 🧩 Práctica: Crear Recurso de Referencia HTML

### 📁 Archivos a Crear

**HTML:** `resources/index.html`

```html
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Recursos de Diseño Web — [Tu Nombre]</title>
		<link rel="stylesheet" href="../assets/css/index.css" />
		<link rel="stylesheet" href="../assets/css/resources.css" />
	</head>
	<body>
		<!-- Tu contenido aquí -->
	</body>
</html>
```

**CSS Principal:** `assets/css/index.css`

```css
/* ===== CSS PRINCIPAL - RESET Y VARIABLES ===== */

/* Reset básico */
*,
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

/* Variables CSS */
:root {
	--primary-color: #2563eb;
	--secondary-color: #64748b;
	--accent-color: #f59e0b;
	--text-color: #1e293b;
	--bg-color: #f8fafc;
	--white: #ffffff;
	--border-color: #e2e8f0;

	/* Espaciado */
	--spacing-xs: 0.5rem;
	--spacing-sm: 1rem;
	--spacing-md: 1.5rem;
	--spacing-lg: 2rem;
	--spacing-xl: 3rem;

	/* Tipografía */
	--font-family: system-ui, -apple-system, sans-serif;
	--font-size-sm: 0.875rem;
	--font-size-base: 1rem;
	--font-size-lg: 1.125rem;
	--font-size-xl: 1.25rem;
	--font-size-2xl: 1.5rem;
	--font-size-3xl: 1.875rem;

	/* Bordes y sombras */
	--border-radius: 0.5rem;
	--border-radius-lg: 0.75rem;
	--shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Estilos base */
html {
	font-size: 16px;
	scroll-behavior: smooth;
}

body {
	font-family: var(--font-family);
	font-size: var(--font-size-base);
	line-height: 1.6;
	color: var(--text-color);
	background-color: var(--bg-color);
}

/* Contenedor principal */
.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 var(--spacing-md);
}

/* Tipografía */
h1,
h2,
h3,
h4,
h5,
h6 {
	font-weight: 600;
	line-height: 1.2;
	margin-bottom: var(--spacing-sm);
}

h1 {
	font-size: var(--font-size-3xl);
}
h2 {
	font-size: var(--font-size-2xl);
}
h3 {
	font-size: var(--font-size-xl);
}

p {
	margin-bottom: var(--spacing-sm);
}

/* Enlaces */
a {
	color: var(--primary-color);
	text-decoration: none;
	transition: color 0.2s ease;
}

a:hover {
	color: var(--accent-color);
}

/* Botones */
.btn {
	display: inline-block;
	padding: var(--spacing-xs) var(--spacing-md);
	background-color: var(--primary-color);
	color: var(--white);
	border-radius: var(--border-radius);
	text-decoration: none;
	font-weight: 500;
	transition: background-color 0.2s ease;
}

.btn:hover {
	background-color: var(--accent-color);
	color: var(--white);
}

/* Utilidades */
.text-center {
	text-align: center;
}
.text-left {
	text-align: left;
}
.text-right {
	text-align: right;
}

.mb-sm {
	margin-bottom: var(--spacing-sm);
}
.mb-md {
	margin-bottom: var(--spacing-md);
}
.mb-lg {
	margin-bottom: var(--spacing-lg);
}

.mt-sm {
	margin-top: var(--spacing-sm);
}
.mt-md {
	margin-top: var(--spacing-md);
}
.mt-lg {
	margin-top: var(--spacing-lg);
}
```

**CSS Específico:** `assets/css/resources.css`

```css
/* ===== CSS ESPECÍFICO PARA PÁGINA DE RECURSOS ===== */

/* Header de la página de recursos */
.resources-header {
	background: linear-gradient(135deg, var(--primary-color) 0%, #1e40af 100%);
	color: var(--white);
	padding: var(--spacing-xl) 0;
	text-align: center;
}

.resources-header h1 {
	color: var(--white);
	margin-bottom: var(--spacing-sm);
}

.resources-header p {
	opacity: 0.9;
	margin-bottom: var(--spacing-md);
}

/* Navegación de recursos */
.resources-nav {
	background-color: var(--white);
	padding: var(--spacing-md) 0;
	box-shadow: var(--shadow);
	margin-bottom: var(--spacing-xl);
}

.resources-nav ul {
	list-style: none;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: var(--spacing-lg);
}

.resources-nav a {
	padding: var(--spacing-xs) var(--spacing-sm);
	border-radius: var(--border-radius);
	transition: background-color 0.2s ease;
}

.resources-nav a:hover {
	background-color: var(--bg-color);
}

/* Secciones de herramientas */
.tools-section {
	margin-bottom: var(--spacing-xl);
}

.tools-section h2 {
	border-bottom: 2px solid var(--primary-color);
	padding-bottom: var(--spacing-xs);
	margin-bottom: var(--spacing-lg);
}

/* Grid de herramientas */
.tools-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: var(--spacing-lg);
}

/* Tarjetas de herramientas */
.tool-card {
	background: var(--white);
	border-radius: var(--border-radius-lg);
	padding: var(--spacing-lg);
	box-shadow: var(--shadow);
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tool-card:hover {
	transform: translateY(-4px);
	box-shadow: var(--shadow-lg);
}

.tool-card h3 {
	margin-bottom: var(--spacing-sm);
}

.tool-card h3 a {
	color: var(--text-color);
}

.tool-card h3 a:hover {
	color: var(--primary-color);
}

/* Badges de runtime */
.runtime-badge {
	display: inline-block;
	padding: 0.25rem 0.5rem;
	border-radius: 9999px;
	font-size: var(--font-size-sm);
	font-weight: 500;
	margin-bottom: var(--spacing-sm);
}

.runtime-badge.nodejs {
	background-color: #68d391;
	color: #1a202c;
}

.runtime-badge.standalone {
	background-color: #4299e1;
	color: var(--white);
}

.runtime-badge.saas {
	background-color: #ed8936;
	color: var(--white);
}

/* Información de la herramienta */
.tool-info {
	margin-bottom: var(--spacing-md);
}

.tool-info p {
	margin-bottom: var(--spacing-xs);
	font-size: var(--font-size-sm);
}

.tool-info strong {
	color: var(--text-color);
}

/* Notas personales */
.personal-notes {
	background-color: var(--bg-color);
	border-left: 4px solid var(--accent-color);
	padding: var(--spacing-md);
	border-radius: 0 var(--border-radius) var(--border-radius) 0;
	margin-top: var(--spacing-md);
}

.personal-notes h4 {
	color: var(--accent-color);
	margin-bottom: var(--spacing-xs);
}

/* Footer de recursos */
.resources-footer {
	background-color: var(--secondary-color);
	color: var(--white);
	text-align: center;
	padding: var(--spacing-xl) 0;
	margin-top: var(--spacing-xl);
}

/* Responsive */
@media (max-width: 768px) {
	.resources-nav ul {
		flex-direction: column;
		align-items: center;
	}

	.tools-grid {
		grid-template-columns: 1fr;
	}

	.tool-card {
		padding: var(--spacing-md);
	}
}
```

### 📋 Tareas

#### 1) Investigación y Clasificación

- Investiga al menos **8 herramientas** de diferentes categorías
- Clasifica cada herramienta según sus requisitos de runtime:
  - 📦 **Requiere Node.js** (build tools, frameworks modernos)
  - 🌐 **Sin Node.js** (CSS puro, JS vanilla, CDN)
  - 🟥 **Requiere Ruby** (Jekyll)
  - 🟢 **Binario standalone** (Hugo)
  - ☁️ **SaaS** (servicios en la nube)

#### 2) Crear `resources/index.html`

Usa **HTML5 semántico** con la estructura proporcionada y incluye:

- Header con tu información
- Navegación por secciones
- Grid de herramientas con badges de runtime
- Notas personales para cada herramienta
- Sección de reflexión crítica

#### 3) Reflexión Crítica (ATELIER)

En tu sección de reflexión, considera:

- **¿Qué herramientas se adaptan a tu flujo de trabajo?**
- **Trade-offs observados:**
  - Velocidad vs. Flexibilidad
  - Dependencias vs. Simplicidad
  - Node.js vs. Standalone
  - Creatividad vs. Convención
- **¿Cómo usarías estas herramientas en tu portafolio?**

---

## ✅ Checklist de Entregable

- [ ] `resources/index.html` creado con estructura semántica
- [ ] Al menos **8 herramientas** de diferentes categorías investigadas
- [ ] Cada herramienta clasificada por requisitos de runtime
- [ ] Badges visuales para indicar dependencias (Node.js, standalone, etc.)
- [ ] Notas personales para cada herramienta
- [ ] Sección de reflexión crítica
- [ ] Archivos CSS creados (`index.css` y `resources.css`)
- [ ] Commit y push al repositorio

---

## 🧭 Metodología ATELIER Aplicada

- **Observar:** Explora diferentes herramientas y sus requisitos técnicos
- **Intervenir:** Crea tu recurso de referencia HTML con clasificaciones claras
- **Reflexionar:** Analiza trade-offs y preferencias personales
- **Compartir:** Documenta y comparte tu investigación con el equipo

---

## 🧪 Consejos de Calidad

- Valida HTML (W3C) y ejecuta Lighthouse para accesibilidad
- Mantén las imágenes en tamaños razonables
- Usa URLs explícitas para claridad
- Documenta claramente los requisitos de runtime de cada herramienta
- Considera el impacto de Node.js en tu flujo de trabajo

---

## 📊 Tabla de Comparación Rápida

| Herramienta | Runtime       | Curva de Aprendizaje | Caso de Uso Principal   |
| ----------- | ------------- | -------------------- | ----------------------- |
| Bootstrap   | 🌐 Standalone | Principiante         | Prototipado rápido      |
| TailwindCSS | 📦 Node.js    | Intermedio           | Sistemas personalizados |
| Jekyll      | 🟥 Ruby       | Principiante         | Blogs/Portafolios       |
| Hugo        | 🟢 Binario    | Intermedio           | Sitios grandes          |
| GSAP        | 🌐 Standalone | Intermedio           | Animaciones avanzadas   |
| React       | 📦 Node.js    | Avanzado             | Aplicaciones SPA        |
| HTML5 UP    | 🌐 Standalone | Principiante         | Plantillas rápidas      |

Esta lección te prepara para tomar decisiones informadas sobre qué herramientas usar según tus necesidades, recursos disponibles y preferencias de desarrollo.