---
layout: lesson
title: 'Classic and Modern Web Design Tools (2025)'
title_alt: ''
slug: web-design-tools
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/web-design-tools/
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## 🎯 Objectives

In this lesson, we'll explore **CSS frameworks**, **JavaScript frameworks**, and **templating tools** used in modern web design. For each tool, we'll highlight key characteristics, underlying technologies, learning curve, **runtime requirements** (Node.js vs. standalone), and practical use cases.

By the end of this lesson, each student will create a **reference resource HTML** (`/resources/index.html`) that will serve as a personal guide and portfolio artifact.

---

## 📂 Project Structure

For this lesson, create the following file structure:

```
student-project/
├── resources/
│   └── index.html              # Your tool reference resource
└── assets/
    └── css/
        ├── index.css           # Main CSS (reset, variables, base layout)
        └── resources.css       # Specific CSS for the resources page
```

**💡 Instructions for students:**

- Create the `resources/` folder for your reference page
- Add CSS files to `/assets/css/` (existing folder)
- Your HTML includes **two CSS links**: one to the main CSS (`index.css`) and another to the specific one (`resources.css`)
- You can open `resources/index.html` in your browser to see the result

---

## 🔧 Classification by Runtime Requirements

### 📦 Tools that REQUIRE Node.js

#### Frameworks and Build Tools

- **TailwindCSS** - Requires Node.js for compilation and processing
- **Vite** - Modern build tool that needs Node.js
- **Webpack** - Bundler that requires Node.js
- **Parcel** - Build tool that needs Node.js
- **Snowpack** - Build tool for fast development

#### Modern JavaScript Frameworks

- **React** - Requires Node.js for development and build
- **Vue.js** - Needs Node.js for CLI and build tools
- **Angular** - Requires Node.js for Angular CLI
- **Svelte** - Needs Node.js for compilation
- **Next.js** - React framework that requires Node.js
- **Nuxt.js** - Vue framework that requires Node.js

#### Static Site Generators

- **Gatsby** - React generator that requires Node.js
- **Eleventy (11ty)** - Generator that needs Node.js
- **Astro** - Modern framework that requires Node.js

#### Component Libraries

- **Material UI** - Requires Node.js for installation
- **Ant Design** - Needs Node.js
- **Chakra UI** - Requires Node.js
- **Shadcn UI** - Needs Node.js and pnpm/npm

### 🌐 Tools that DON'T REQUIRE Node.js

#### Standalone CSS Frameworks

- **Bootstrap** - Works with CDN or direct download
- **Foundation** - Available via CDN
- **Bulma** - Pure CSS, works with CDN
- **Pure.css** - Pure CSS, no dependencies
- **Milligram** - Minimalist CSS, no Node.js

#### Vanilla JavaScript Libraries

- **GSAP** - Works with CDN or direct download
- **Anime.js** - Vanilla JavaScript, CDN available
- **Three.js** - 3D library, works with CDN
- **Chart.js** - Charts, works without Node.js
- **AOS (Animate On Scroll)** - Vanilla JavaScript

#### Templates and Kits

- **HTML5 UP** - Pure HTML/CSS templates
- **Start Bootstrap** - Bootstrap standalone templates
- **Templated** - Free HTML/CSS templates
- **FreeHTML5** - Templates without dependencies

#### Generators Without Node.js

- **Jekyll** - Requires Ruby (not Node.js)
- **Hugo** - Go binary, doesn't need Node.js
- **Zola** - Rust generator, doesn't require Node.js

---

## 📚 Tools by Category

### Stylesheets and CSS Frameworks

#### [Bootstrap](https://getbootstrap.com/) 🌐 No Node.js

- **Key features**: Responsive grid system, prebuilt components, utilities
- **Technology**: CSS/SCSS, vanilla JavaScript
- **Runtime**: CDN or direct download
- **Learning curve**: Beginner → Intermediate
- **Use cases**: Quick prototyping, legacy systems, education
- **ATELIER note**: Fork an official template and analyze semantic quality vs. utilities

#### [TailwindCSS](https://tailwindcss.com/) 📦 Requires Node.js

- **Key features**: Utility-first, design system building, JIT compiler
- **Technology**: PostCSS, JavaScript bundlers
- **Runtime**: Node.js (npm/pnpm) for development and build
- **Learning curve**: Intermediate
- **Use cases**: Custom design systems, professional projects
- **ATELIER note**: Compare cognitive load of memorizing classes vs. semantic clarity

#### [Foundation](https://get.foundation/) 🌐 No Node.js

- **Key features**: Responsive grid, accessibility emphasis
- **Technology**: Sass (optional), vanilla JavaScript
- **Runtime**: CDN or direct download
- **Learning curve**: Intermediate
- **Use cases**: Accessibility-focused layouts

#### [Bulma](https://bulma.io/) 🌐 No Node.js

- **Key features**: Pure CSS, no JavaScript, Flexbox-based
- **Technology**: Pure CSS, Sass (optional)
- **Runtime**: CDN or direct download
- **Learning curve**: Beginner
- **Use cases**: Quick prototyping without dependencies

### UI Kits and Component Libraries

#### [Material UI](https://mui.com/) 📦 Requires Node.js

- **Key features**: React components implementing Material Design
- **Technology**: React, TypeScript
- **Runtime**: Node.js for installation and development
- **Learning curve**: Intermediate → Advanced
- **Use cases**: Enterprise dashboards, educational portals

#### [Shadcn UI](https://ui.shadcn.com/) 📦 Requires Node.js

- **Key features**: Copy-paste React components built with Tailwind
- **Technology**: React, TailwindCSS, Radix primitives
- **Runtime**: Node.js + pnpm/npm
- **Learning curve**: Intermediate
- **Use cases**: Portfolios, modern SaaS landing pages

#### [Ark UI](https://ark-ui.com/) 📦 Requires Node.js

- **Key features**: Headless, accessible UI primitives, framework-agnostic
- **Technology**: TypeScript, modern frameworks
- **Runtime**: Node.js for installation
- **Learning curve**: Intermediate
- **Use cases**: Building consistent design systems with flexibility

### Static Site Generators

#### [Jekyll](https://jekyllrb.com/) 🟥 Requires Ruby (No Node.js)

- **Key features**: Static site generator, Markdown + Liquid templates
- **Technology**: Ruby, YAML data, native GitHub Pages support
- **Runtime**: Ruby (not Node.js)
- **Learning curve**: Beginner → Intermediate
- **Use cases**: Blogs, portfolios, student projects
- **ATELIER note**: Connects directly to Git workflows

#### [Eleventy (11ty)](https://www.11ty.dev/) 📦 Requires Node.js

- **Key features**: Flexible static site generator, multiple template languages
- **Technology**: Node.js
- **Runtime**: Node.js (npm)
- **Learning curve**: Intermediate
- **Use cases**: Lightweight alternative to Jekyll, JAMstack projects

#### [Hugo](https://gohugo.io/) 🟢 No Node.js

- **Key features**: Ultra-fast generator, single binary
- **Technology**: Go (compiled to binary)
- **Runtime**: Standalone binary (no Node.js or Ruby)
- **Learning curve**: Beginner → Intermediate
- **Use cases**: Large sites, blogs, documentation

#### [Astro](https://astro.build/) 📦 Requires Node.js

- **Key features**: Modern framework, islands architecture, multi-framework
- **Technology**: Node.js, Vite
- **Runtime**: Node.js for development and build
- **Learning curve**: Intermediate
- **Use cases**: Static sites with selective interactivity

### Animation and Visual Libraries

#### [GSAP](https://greensock.com/gsap/) 🌐 No Node.js

- **Key features**: Performance-focused animations, timelines, scroll triggers
- **Technology**: Vanilla JavaScript
- **Runtime**: CDN or direct download
- **Learning curve**: Intermediate → Advanced
- **Use cases**: Interactive storytelling, marketing sites

#### [Framer Motion](https://www.framer.com/motion/) 📦 Requires Node.js

- **Key features**: Animation library for React
- **Technology**: React, TypeScript
- **Runtime**: Node.js (npm)
- **Learning curve**: Intermediate
- **Use cases**: Interactive portfolios, SaaS landing pages

#### [Anime.js](https://animejs.com/) 🌐 No Node.js

- **Key features**: Lightweight animation engine
- **Technology**: Vanilla JavaScript
- **Runtime**: CDN or direct download
- **Learning curve**: Beginner → Intermediate
- **Use cases**: Illustrations, lightweight visual effects

#### [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) 🌐 No Node.js

- **Key features**: Scroll-triggered animations
- **Technology**: Vanilla JavaScript, CSS
- **Runtime**: CDN or direct download
- **Learning curve**: Beginner
- **Use cases**: Landing pages, presentations

### Templates and Open UI Kits

#### [HTML5 UP](https://html5up.net/) 🌐 No Node.js

- **Key features**: Free responsive HTML/CSS templates
- **Technology**: HTML5, CSS3
- **Runtime**: Direct download, GitHub fork
- **Learning curve**: Beginner
- **Use cases**: Student projects, quick deployments

#### [Cruip](https://cruip.com/) 📦 Requires Node.js (React versions)

- **Key features**: Premium + free templates, based on React/Tailwind
- **Technology**: React, TailwindCSS (React versions)
- **Runtime**: Direct download (HTML) or Node.js (React)
- **Learning curve**: Intermediate
- **Use cases**: Startup landing pages

#### [Flowbite](https://flowbite.com/) 📦 Requires Node.js

- **Key features**: TailwindCSS component library
- **Technology**: TailwindCSS, JavaScript
- **Runtime**: Node.js (npm) or CDN
- **Learning curve**: Intermediate
- **Use cases**: Rapid prototyping with Tailwind

### Data and Media Resources

#### [Hygraph](https://hygraph.com/) 🌐 SaaS (No local installation)

- **Key features**: Headless CMS with GraphQL
- **Technology**: GraphQL API
- **Runtime**: SaaS (no local installation required)
- **Learning curve**: Intermediate
- **Use cases**: Managing structured content

#### [ImageKit.io](https://imagekit.io/) 🌐 SaaS (No local installation)

- **Key features**: Image CDN, optimization, transformations
- **Technology**: Global CDN, API
- **Runtime**: SaaS (no local installation required)
- **Learning curve**: Beginner
- **Use cases**: Delivering optimized media

#### [Netlify CMS](https://www.netlify.com/) 🌐 No Node.js

- **Key features**: Git-based CMS, web interface
- **Technology**: Vanilla JavaScript, Git API
- **Runtime**: Works with any static site generator
- **Learning curve**: Beginner → Intermediate
- **Use cases**: CMS for static sites

---

## 🧩 Practice: Create Reference Resource HTML

### 📁 Files to Create

**HTML:** `resources/index.html`

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Web Design Resources — [Your Name]</title>
		<link rel="stylesheet" href="../assets/css/index.css" />
		<link rel="stylesheet" href="../assets/css/resources.css" />
	</head>
	<body>
		<!-- Your content here -->
	</body>
</html>
```

**Main CSS:** `assets/css/index.css`

```css
/* ===== MAIN CSS - RESET AND VARIABLES ===== */

/* Basic reset */
*,
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

/* CSS Variables */
:root {
	--primary-color: #2563eb;
	--secondary-color: #64748b;
	--accent-color: #f59e0b;
	--text-color: #1e293b;
	--bg-color: #f8fafc;
	--white: #ffffff;
	--border-color: #e2e8f0;

	/* Spacing */
	--spacing-xs: 0.5rem;
	--spacing-sm: 1rem;
	--spacing-md: 1.5rem;
	--spacing-lg: 2rem;
	--spacing-xl: 3rem;

	/* Typography */
	--font-family: system-ui, -apple-system, sans-serif;
	--font-size-sm: 0.875rem;
	--font-size-base: 1rem;
	--font-size-lg: 1.125rem;
	--font-size-xl: 1.25rem;
	--font-size-2xl: 1.5rem;
	--font-size-3xl: 1.875rem;

	/* Borders and shadows */
	--border-radius: 0.5rem;
	--border-radius-lg: 0.75rem;
	--shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Base styles */
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

/* Main container */
.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 var(--spacing-md);
}

/* Typography */
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

/* Links */
a {
	color: var(--primary-color);
	text-decoration: none;
	transition: color 0.2s ease;
}

a:hover {
	color: var(--accent-color);
}

/* Buttons */
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

/* Utilities */
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

**Specific CSS:** `assets/css/resources.css`

```css
/* ===== SPECIFIC CSS FOR RESOURCES PAGE ===== */

/* Resources page header */
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

/* Resources navigation */
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

/* Tool sections */
.tools-section {
	margin-bottom: var(--spacing-xl);
}

.tools-section h2 {
	border-bottom: 2px solid var(--primary-color);
	padding-bottom: var(--spacing-xs);
	margin-bottom: var(--spacing-lg);
}

/* Tool grid */
.tools-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: var(--spacing-lg);
}

/* Tool cards */
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

/* Runtime badges */
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

/* Tool information */
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

/* Personal notes */
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

/* Resources footer */
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

### 📋 Tasks

#### 1) Research and Classification

- Research at least **8 tools** from different categories
- Classify each tool according to runtime requirements:
  - 📦 **Requires Node.js** (build tools, modern frameworks)
  - 🌐 **No Node.js** (pure CSS, vanilla JS, CDN)
  - 🟥 **Requires Ruby** (Jekyll)
  - 🟢 **Standalone binary** (Hugo)
  - ☁️ **SaaS** (cloud services)

#### 2) Create `resources/index.html`

Use **semantic HTML5** with the provided structure and include:

- Header with your information
- Navigation by sections
- Tool grid with runtime badges
- Personal notes for each tool
- Critical reflection section

#### 3) Critical Reflection (ATELIER)

In your reflection section, consider:

- **Which tools fit your workflow?**
- **Trade-offs observed:**
  - Speed vs. Flexibility
  - Dependencies vs. Simplicity
  - Node.js vs. Standalone
  - Creativity vs. Convention
- **How would you use these tools in your portfolio?**

---

## ✅ Deliverable Checklist

- [ ] `resources/index.html` created with semantic structure
- [ ] At least **8 tools** from different categories researched
- [ ] Each tool classified by runtime requirements
- [ ] Visual badges for dependencies (Node.js, standalone, etc.)
- [ ] Personal notes for each tool
- [ ] Critical reflection section
- [ ] CSS files created (`index.css` and `resources.css`)
- [ ] Commit and push to repository

---

## 🧭 ATELIER Methodology Applied

- **Observe:** Explore different tools and their technical requirements
- **Intervene:** Create your HTML reference resource with clear classifications
- **Reflect:** Analyze trade-offs and personal preferences
- **Share:** Document and share your research with the team

---

## 🧪 Quality Tips

- Validate HTML (W3C) and run Lighthouse for accessibility
- Keep images at reasonable sizes
- Use explicit URLs for clarity
- Clearly document runtime requirements for each tool
- Consider the impact of Node.js on your workflow

---

## 📊 Quick Comparison Table

| Tool        | Runtime       | Learning Curve | Main Use Case       |
| ----------- | ------------- | -------------- | ------------------- |
| Bootstrap   | 🌐 Standalone | Beginner       | Quick prototyping   |
| TailwindCSS | 📦 Node.js    | Intermediate   | Custom systems      |
| Jekyll      | 🟥 Ruby       | Beginner       | Blogs/Portfolios    |
| Hugo        | 🟢 Binary     | Intermediate   | Large sites         |
| GSAP        | 🌐 Standalone | Intermediate   | Advanced animations |
| React       | 📦 Node.js    | Advanced       | SPA applications    |
| HTML5 UP    | 🌐 Standalone | Beginner       | Quick templates     |

This lesson prepares you to make informed decisions about which tools to use based on your needs, available resources, and development preferences.