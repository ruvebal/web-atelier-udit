---
layout: lesson
title: 'Classic and Modern Web Design Tools Overview (2025)'
title_es: ''
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

In this overview, we’ll compare some of the most widely used front-end **CSS frameworks**, **JavaScript frameworks**, and **templating tools** in modern web design. For each, we highlight key characteristics, underlying technologies, learning curve, complexity, and notable features. We also discuss how to create a semantic HTML report to present a comparison of these tools, and explain how GitHub and Git workflows facilitate experimenting with these resources. This guide is meant to help you create your own `resources.html` page inside your repo.

---

## Classic Stylesheets and CSS Frameworks

### [Bootstrap](https://getbootstrap.com/)

- **Key features**: Responsive grid system, prebuilt components, utilities.
- **Tech**: SCSS, JavaScript (vanilla, optional with Popper).
- **Learning curve**: Beginner → Intermediate.
- **Setup**: CDN or npm install.
- **Use cases**: Quick prototyping, legacy systems, education.
- **ATELIER note**: Fork an official starter template and analyze semantic quality of components vs. utility-based CSS.

### [TailwindCSS](https://tailwindcss.com/)

- **Key features**: Utility-first, design system building, JIT compiler.
- **Tech**: PostCSS, JavaScript bundlers.
- **Learning curve**: Intermediate.
- **Setup**: npm (preferred), CDN for demos.
- **Use cases**: Custom design systems, professional-grade projects.
- **ATELIER note**: Compare the cognitive load of memorizing utility classes vs. semantic clarity in HTML.

### [Foundation](https://get.foundation/)

- **Key features**: Responsive grid, accessibility emphasis, email templates.
- **Tech**: Sass, JavaScript plugins.
- **Learning curve**: Intermediate.
- **Setup**: CDN, npm, or CLI tool.
- **Use cases**: Accessibility-focused layouts, responsive email design.

---

## UI Kits and Component Libraries

### [Material UI](https://mui.com/)

- **Key features**: React components implementing Google’s Material Design.
- **Tech**: React, TypeScript.
- **Learning curve**: Intermediate → Advanced.
- **Setup**: npm, React integration.
- **Use cases**: Enterprise dashboards, educational portals.

### [Shadcn UI](https://ui.shadcn.com/)

- **Key features**: Copy-paste React components built with Tailwind.
- **Tech**: React, TailwindCSS, Radix primitives.
- **Learning curve**: Intermediate.
- **Setup**: pnpm/npm, manual component copying.
- **Use cases**: Portfolios, modern SaaS landing pages.

### [Ark UI](https://ark-ui.com/)

- **Key features**: Headless, accessible UI primitives, framework-agnostic.
- **Tech**: TypeScript, modern frameworks.
- **Learning curve**: Intermediate.
- **Setup**: npm package.
- **Use cases**: Building consistent design systems with flexibility.

---

## Static Site Generators and Templates

### [Jekyll](https://jekyllrb.com/)

- **Key features**: Static site generator, Markdown + Liquid templates.
- **Tech**: Ruby, YAML data, GitHub Pages native support.
- **Learning curve**: Beginner → Intermediate.
- **Setup**: GitHub Pages, local Ruby install.
- **Use cases**: Blogs, portfolios, student projects.
- **ATELIER note**: Connects directly to Git workflows; students should fork and deploy to Pages.

### [Eleventy (11ty)](https://www.11ty.dev/)

- **Key features**: Flexible static site generator, multiple template languages.
- **Tech**: Node.js.
- **Learning curve**: Intermediate.
- **Setup**: npm.
- **Use cases**: Lightweight alternative to Jekyll, JAMstack projects.

---

## Animation and Visual Libraries

### [GSAP](https://greensock.com/gsap/)

- **Key features**: Performance-focused animations, timelines, scroll triggers.
- **Tech**: JavaScript.
- **Learning curve**: Intermediate → Advanced.
- **Setup**: CDN or npm.
- **Use cases**: Interactive storytelling, marketing sites.

### [Framer Motion](https://www.framer.com/motion/)

- **Key features**: Animation library for React.
- **Tech**: React, TypeScript.
- **Learning curve**: Intermediate.
- **Setup**: npm.
- **Use cases**: Interactive portfolios, SaaS landing pages.

### [Anime.js](https://animejs.com/)

- **Key features**: Lightweight animation engine.
- **Tech**: Vanilla JavaScript.
- **Learning curve**: Beginner → Intermediate.
- **Setup**: CDN or npm.
- **Use cases**: Illustrations, lightweight visual effects.

---

## Templates and Open UI Kits

### [HTML5 UP](https://html5up.net/)

- **Key features**: Free responsive HTML/CSS templates.
- **Tech**: HTML5, CSS3.
- **Learning curve**: Beginner.
- **Setup**: Direct download, GitHub fork.
- **Use cases**: Student projects, quick deployments.

### [Cruip](https://cruip.com/)

- **Key features**: Premium + free templates, React/Tailwind based.
- **Tech**: React, TailwindCSS.
- **Learning curve**: Intermediate.
- **Setup**: Direct download, npm for React versions.
- **Use cases**: Startup landing pages.

### [Flowbite](https://flowbite.com/)

- **Key features**: TailwindCSS component library.
- **Tech**: TailwindCSS, JavaScript.
- **Learning curve**: Intermediate.
- **Setup**: npm or CDN.
- **Use cases**: Rapid prototyping with Tailwind.

---

## Data and Media Resources

### [Hygraph](https://hygraph.com/)

- **Key features**: Headless CMS with GraphQL.
- **Tech**: Node.js, GraphQL.
- **Learning curve**: Intermediate.
- **Setup**: SaaS CMS.
- **Use cases**: Managing structured content.

### [ImageKit.io](https://imagekit.io/)

- **Key features**: Image CDN, optimization, transformations.
- **Tech**: Global CDN, API.
- **Learning curve**: Beginner.
- **Setup**: Account + API key.
- **Use cases**: Delivering optimized media.

### In-project YAML data

- **Key features**: Simple static data for templates (Jekyll/Eleventy).
- **Tech**: YAML, Markdown.
- **Learning curve**: Beginner.
- **Use cases**: Student projects with simple datasets.

---

## Pedagogical Critical Notes (ATELIER)

- **Forking & Cloning**: Every tool listed has GitHub repos or starter templates; fork them, clone locally, and document experiments in your repo.
- **Semantic HTML**: Build your `resources.html` using semantic structures: `<section>`, `<article>`, `<header>`, `<footer>`. Each tool should be an `<article>` with attributes.
- **Comparative Table**: Represent attributes (learning curve, setup, complexity) in a `<table>`.
- **Critical Reflection**: In your repo’s README, write short reflections: _Did Tailwind make HTML less semantic? Did Bootstrap accelerate prototyping but constrain creativity?_
- **Portfolio Value**: Your `resources.html` is not only a technical report, but also a **design literacy artifact** to showcase in your portfolio.

---

## 🧩 Practice: Research and Comparative HTML Report on Web Design Tools

## 🎯 Goal

After today’s presentation, each student will:

- Explore **classic and modern web design frameworks, templates, and tools**.
- Build a **comparative HTML report (`resources.html`)** in their repo.
- Reflect on **personal choices** (what tools/templates attract you most and why).
- Share their work by committing and pushing the file **before the session ends**.

---

### 📂 Repository Structure

Work inside your **student project repo**:

```
student-project-template/
├── assets/
│   └── site.css         # Your custom stylesheet
└── resources.html       # The file you will create today
```

---

## 📋 Tasks

### 1) Research

- Visit the resources presented (Bootstrap, TailwindCSS, Jekyll, GSAP, HTML5 UP, etc.).
- Explore at least **5 tools/templates** from **different categories**.
- Take **screenshots** (local preview or official demos).
- Copy **official links** to the projects.

#### 2) Build `resources.html`

Use **semantic HTML5**:

- `<header>` with your name and course.
- `<main>` with `<section>` for each category (frameworks, animations, templates…).
- `<article>` for each tool you researched.
- `<figure>` + `<img>` for screenshots.
- `<iframe>` for live demos (when allowed by the site).
- `<p>` for your **personal notes** (critical comments, ATELIER style).

**Example snippet:**

```html
<article>
	<h3><a href="https://tailwindcss.com/">TailwindCSS</a></h3>
	<figure>
		<img src="assets/img/tailwind-demo.png" alt="Tailwind demo screenshot" width="640" height="360" />
		<figcaption>My screenshot of Tailwind demo</figcaption>
	</figure>
	<p>
		<strong>Notes:</strong>
		Utility classes make me faster, but HTML feels less semantic. Trade-off: speed vs. readability.
	</p>
	<iframe src="https://tailwindcss.com/" width="600" height="400" loading="lazy"></iframe>
</article>
```

#### 3) Styling (`assets/site.css`)

- Add simple styles for **typography**, **spacing**, and **gallery of screenshots**.
- Keep it readable; e.g., max-width on content, line-height, and a light color palette.

#### 4) Reflection (ATELIER)

At the end of the page, add a `<section>` **Personal Notes**:

- Which tool or template inspires you most, and **why**?
- Trade-offs observed (**speed vs. clarity**, **creativity vs. convention**, **weight vs. features**).
- How would you use this tool in your **portfolio project**?

#### 5) Git Workflow

Stage, commit, and push before session end:

```bash
git add resources.html assets/site.css
git commit -m "Add resources.html with notes and comparisons"
git push
```

If you work in branches or PRs, make sure your **PR is opened/updated** before leaving.

---

### ✅ Deliverable Checklist

- `resources.html` with **≥ 5 tools/templates** compared (from different categories).
- **Screenshots** and/or **iframes** included.
- **Personal notes** written in your own words.
- Pushed to your repo **before the end of class**.

---

### 🧭 ATELIER Methodology Applied

- **Observe:** Explore demos, templates, and frameworks.
- **Intervene:** Build your HTML comparison with screenshots and links.
- **Reflect:** Write notes on usefulness, limits, and design philosophy.
- **Share:** Commit and push so peers and professor can review.

---

### 🧪 Optional Quality Tips

- Validate HTML (W3C) and run Lighthouse for **accessibility** and **performance**.
- Keep images under reasonable sizes; name files clearly (`tool-name-01.png`).
- Use explicit URLs as text for clarity (e.g., `https://getbootstrap.com`).

---

### 🧱 Starter Outline for `resources.html`

Copy this skeleton and fill it in:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Web Design Resources — Your Name</title>
		<link rel="stylesheet" href="assets/site.css" />
	</head>
	<body>
		<header>
			<h1>Web Design Resources</h1>
			<p>Student: Your Name · Course: Advanced Web Design</p>
			<nav>
				<a href="#frameworks">Frameworks</a>
				·
				<a href="#animations">Animations</a>
				·
				<a href="#templates">Templates</a>
				·
				<a href="#notes">Personal Notes</a>
			</nav>
		</header>

		<main>
			<section id="frameworks">
				<h2>CSS Frameworks</h2>

				<article>
					<h3><a href="https://getbootstrap.com/">Bootstrap</a></h3>
					<figure>
						<img src="assets/img/bootstrap-demo.png" alt="Bootstrap demo" width="640" height="360" />
						<figcaption>My screenshot of Bootstrap components</figcaption>
					</figure>
					<p>
						<strong>Notes:</strong>
						Quick prototyping with prebuilt components. Consider customizing theme to avoid “generic” look.
					</p>
					<iframe src="https://getbootstrap.com/" width="600" height="400" loading="lazy"></iframe>
				</article>

				<article>
					<h3><a href="https://tailwindcss.com/">TailwindCSS</a></h3>
					<figure>
						<img src="assets/img/tailwind-demo.png" alt="Tailwind demo" width="640" height="360" />
						<figcaption>Utility-first classes — my experiment</figcaption>
					</figure>
					<p>
						<strong>Notes:</strong>
						Fast to iterate; watch class bloat. Extract components for readability.
					</p>
					<iframe src="https://tailwindcss.com/" width="600" height="400" loading="lazy"></iframe>
				</article>
			</section>

			<section id="animations">
				<h2>Animation Libraries</h2>

				<article>
					<h3><a href="https://greensock.com/gsap/">GSAP</a></h3>
					<figure>
						<img src="assets/img/gsap-demo.png" alt="GSAP demo" width="640" height="360" />
						<figcaption>Timeline and scroll experiments</figcaption>
					</figure>
					<p>
						<strong>Notes:</strong>
						Powerful for storytelling; mind performance and reduced motion preferences.
					</p>
					<iframe src="https://greensock.com/gsap/" width="600" height="400" loading="lazy"></iframe>
				</article>
			</section>

			<section id="templates">
				<h2>Templates & UI Kits</h2>

				<article>
					<h3><a href="https://html5up.net/">HTML5 UP</a></h3>
					<figure>
						<img src="assets/img/html5up-demo.png" alt="HTML5 UP demo" width="640" height="360" />
						<figcaption>Template I’m considering to adapt</figcaption>
					</figure>
					<p>
						<strong>Notes:</strong>
						Good starting point; verify accessibility and semantics.
					</p>
					<iframe src="https://html5up.net/" width="600" height="400" loading="lazy"></iframe>
				</article>
			</section>

			<section id="notes">
				<h2>Personal Notes</h2>
				<p>
					Which tools fit my portfolio and why? What trade-offs did I find? What’s my plan to integrate one in my project
					next week?
				</p>
			</section>
		</main>

		<footer>
			<p>© 2025 — Web Atelier · All external links belong to their respective owners.</p>
		</footer>
	</body>
</html>
```
