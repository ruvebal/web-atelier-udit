---
layout: lesson
title: 'Tailwind CSS: SPA Routing with HTML &lt;template&gt; — Clean, Safe Rendering'
slug: tailwind-routing-html-template
date: 2025-10-27
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/tailwind/routing-and-shared-layout/html-template/
description: 'An alternative to string templates: render SPA views from native HTML &lt;template&gt; elements, using #app as the container.'
tags: [tailwindcss, spa, routing, dom, template]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# HTML `<template>`-based Views (Alternative to String Templates)

> **Backup Your Original Approach!**

Before switching your SPA code over to use `<template>`, it's a good idea to back up the previous string-template version in Git. Here’s a safe workflow using branches:

```bash
# Make sure you're on main and up to date
git checkout main
git pull

# Create a backup branch from main (name it clearly, e.g. backup-string-templates)
git branch backup-string-templates

# (Optional: Or use a timestamp or descriptive note)
# git branch backup-2025-10-28

# Switch to that new backup branch
git checkout backup-string-templates

# Commit any uncommitted changes (optional but recommended for completeness)
git add .
git commit -m "Snapshot: backup of main before refactor"

# Push the backup branch to remote for safekeeping
git push -u origin backup-string-templates

# Return to main to continue with the refactor
git checkout main
```

This way, your original string-template SPA is preserved. If you ever need to retrieve code, you can check out `backup-string-templates` from your remote repository.

---

This lesson mirrors the previous routing lesson but renders each view by cloning content from native HTML `<template>` elements. We still use a single `#app` container, keep Tailwind for styles, and preserve the same navigation and accessibility patterns.

Why `<template>`?

- Structure lives in HTML (readable, skimmable)
- Clone safely and efficiently (no `innerHTML` hazards)
- Works great with `DocumentFragment` to batch DOM updates
- Aligns with the JS DOM lesson: {{ '/lessons/en/js-dom-manipulation/' | relative_url }}

## When Was the HTML `<template>` Element Introduced?

The HTML `<template>` element was **added to the web platform as a living standard in 2014** and is supported in all modern browsers (Chrome, Firefox, Safari, Edge, and Opera). Its intent is to provide a **declarative, inert chunk of DOM** that is not rendered on page load but can be cloned and inserted into the document by JavaScript.

- **Initial specification:** The `<template>` element was first defined as part of the [W3C HTML5 standard in 2014](https://www.w3.org/TR/html5/single-page.html#the-template-element), with [broad browser support arriving by 2015](https://caniuse.com/template).
- **Browser support:** All evergreen browsers (Chrome 26+, Firefox 22+, Safari 7+, Edge, Opera 15+) support `<template>`. It is safe to use for any modern web project.

### Why is `<template>` a game-changer for SPA views?

- **Safe DOM:** Unlike string-based `innerHTML`, template cloning avoids parsing and injection risks.
- **Clean separation:** Lets you keep your UI structure in pure HTML instead of JavaScript strings.
- **Performance:** Allows rapid cloning (with nested nodes, event listeners, etc.) without re-parsing HTML.

> **In summary:**  
> The `<template>` element is a robust, well-supported feature for managing dynamic, modular markup in SPAs. Its introduction solved many of the pain points associated with string templates and unlocked a more "HTML-native" way of building component-based UIs in vanilla JavaScript.

---

## 1) index.html — Shared Layout, Templates, and App Container

```html
<!-- demo/index.html -->
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Portfolio SPA — HTML Template</title>
		<link rel="stylesheet" href="./src/style.css" />
		<script type="module" src="./src/main.js"></script>
		<script src="https://cdn.tailwindcss.com"></script>
	</head>
	<body class="bg-gray-50 text-gray-900">
		<a
			href="#app"
			class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded">
			Skip to main content
		</a>

		<!-- Shared navigation (semantic list) -->
		<nav
			class="fixed top-0 left-0 w-full bg-gray-900 text-white z-50 shadow-lg"
			role="navigation"
			aria-label="Main navigation">
			<div class="mx-auto px-4">
				<div class="flex justify-between items-center py-4">
					<a href="#/" class="text-4xl font-bold hover:text-gray-300 transition-colors" aria-label="Home">Portfolio</a>
					<ul class="flex gap-6">
						<li><a href="#/" class="hover:text-gray-300 transition-colors" aria-current="page">Home</a></li>
						<li><a href="#/about" class="hover:text-gray-300 transition-colors">About</a></li>
						<li><a href="#/projects" class="hover:text-gray-300 transition-colors">Projects</a></li>
						<li><a href="#/contact" class="hover:text-gray-300 transition-colors">Contact</a></li>
					</ul>
				</div>
			</div>
		</nav>

		<!-- Main content area -->
		<main id="app" class="min-h-screen pt-20 pb-24 flex items-center justify-center" role="main">
			<!-- View templates are external in ./src/views/*.html and lazy-loaded by the router. -->
		</main>

		<!-- Shared footer -->
		<footer class="fixed bottom-0 left-0 w-full z-50 bg-gray-800 text-white py-8" role="contentinfo">
			<div class="container mx-auto px-4 text-center">
				<p class="text-lg">&copy; 2025 Portfolio SPA. Built with Tailwind & Vanilla JS.</p>
			</div>
		</footer>
	</body>
</html>
```

---

## 2) Split Files — main.js, router.js, and views/index.js

### main.js, router.js, and views/index.js: How Your HTML Template-Based SPA Works

Let's break down how the demo's single-page app (SPA) file structure and routing logic works, and which code goes where:

---

#### 1. main.js — Application Entry Point

- **Purpose:** Bootstraps your SPA. Instantiates the router and configures any global event listeners.

**demo/src/main.js**

```javascript
// demo/src/main.js
import { SimpleRouter } from './router.js';
import { views } from './views/index.js';

new SimpleRouter(views);

// Optional smooth scroll for in-page anchors that are not router links
document.addEventListener('click', (e) => {
	const link = e.target.closest('a[href^="#"]');
	if (!link) return;
	const href = link.getAttribute('href');
	if (href.startsWith('#/')) return; // router link
	const target = document.querySelector(href);
	if (target) {
		e.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
});
```

- **Takeaway:** This file sets up your router so users see views based on the hash (e.g. `#/about`) in the URL, and makes navigation feel smooth and app-like.

---

#### 2. router.js — The SimpleRouter Class

- **Purpose:** Handles navigation, view switching, and active link highlighting.
- **How it works:**

  1. **Hash-based Routing:** Listens for `hashchange` and `load` events on the window. When the hash (like `#/about`) changes, it figures out what view to show.
  2. **View Loading:** For each route, loads a [HTML template](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) from your `views/` folder if needed, then clones and displays it in `<main id="app">`.
  3. **onMount:** If a route defines an `onMount(app)` function, it calls it after rendering, so you can run JS code for that view.
  4. **Navigation Highlight:** Updates the active nav link using `aria-current="page"` for better accessibility.

- **demo/src/router.js**

```javascript
// demo/src/router.js
export class SimpleRouter {
	constructor(routes) {
		this.routes = routes; // { '/': { templateId, templateUrl, onMount? }, ... }
		this.currentView = null;
		window.addEventListener('hashchange', () => this.handleRoute());
		window.addEventListener('load', () => this.handleRoute());
	}

	async handleRoute() {
		const hash = window.location.hash.slice(1) || '/';
		const route = this.routes[hash] || this.routes[404];
		if (route !== this.currentView) {
			await this.renderView(route);
			this.updateActiveNav(hash);
			this.currentView = route;
		}
	}

	async renderView(route) {
		const app = document.getElementById('app');
		app.textContent = '';

		await ensureTemplateAvailable(route.templateId, route.templateUrl);

		const tpl = document.getElementById(route.templateId);
		if (!tpl) {
			app.textContent = 'Template not found';
			return;
		}

		app.appendChild(tpl.content.cloneNode(true));
		if (typeof route.onMount === 'function') route.onMount(app);
	}

	updateActiveNav(currentHash) {
		document.querySelectorAll('nav a[href^="#/"]').forEach((link) => {
			link.removeAttribute('aria-current');
		});
		const activeLink = document.querySelector(`nav a[href="#${currentHash}"]`);
		if (activeLink) activeLink.setAttribute('aria-current', 'page');
	}
}

const templateCache = new Set();

async function ensureTemplateAvailable(templateId, templateUrl) {
	if (document.getElementById(templateId)) return;
	if (!templateUrl || templateCache.has(templateId)) return;

	const res = await fetch(templateUrl, { credentials: 'same-origin' });
	if (!res.ok) throw new Error(`Failed to load template: ${templateUrl}`);
	const html = await res.text();
	const doc = new DOMParser().parseFromString(html, 'text/html');
	const fetchedTemplate = doc.querySelector('template');
	if (!fetchedTemplate || !fetchedTemplate.id) {
		throw new Error(`No <template id="..."> found in ${templateUrl}`);
	}
	document.body.appendChild(fetchedTemplate);
	templateCache.add(fetchedTemplate.id);
}
```

- **Pedagogical Tip:** This pattern lets you add new routes/views just by creating new template files and updating your `views/index.js` config.

---

#### 3. views/index.js — The Views Table

- **Purpose:** Declaratively maps URL hash routes (like `"/"` or `"/about"`) to their template HTML files and optional JS functions to run after rendering.

**demo/src/views/index.js**

```javascript
// demo/src/views/index.js
export const views = {
	'/': { templateId: 'view-home', templateUrl: './src/views/home.html' },
	'/about': { templateId: 'view-about', templateUrl: './src/views/about.html' },
	'/projects': { templateId: 'view-projects', templateUrl: './src/views/projects.html' },
	'/contact': { templateId: 'view-contact', templateUrl: './src/views/contact.html' },
	404: { templateId: 'view-404', templateUrl: './src/views/404.html' },
};
```

- **Pedagogical Tip:** This file is your "routes table". Add (or remove) views here as your app grows. Each view is a chunk of HTML with an optional `onMount` handler for logic like fetching data or adding event listeners.

---

### How It All Works Together

1. When your app loads, `main.js` sets up the router.
2. The router listens for URL hash changes (e.g., `#/about`).
3. Based on the hash, it finds a view in `views/index.js` — each view points to an HTML `<template>` file and can provide JS behavior.
4. The router **fetches and renders** the needed HTML template right into the page, replacing content in the `<main id="app">`.
5. If you write an `onMount` function for a view, that code runs just after the view loads (perfect for initializing JS or animation).
6. The router updates navigation highlighting to reflect the active route.

---

**This structure is clean, accessible, and easy to extend:**

- All HTML for each view goes in its own `./src/views` file.
- No risky `innerHTML` necessary! Safe template cloning is used.
- You get instant-feeling navigation, with each view loaded only as needed.

If you need to add a new page to your SPA, just:

- Add a new `<template>` HTML file to `./src/views`
- Update `views/index.js` with a new route

That's it!

---

## 3) style.css — Minimal Tokens (Optional)

```css
/* demo/src/style.css */
/* If you use Tailwind, this file can be tiny or empty. Add local tokens as needed. */
/* Custom CSS only for skip link focus styles (Tailwind doesn't cover this well) */
/* 
Accessibility reasons: 
These custom CSS classes support the "Skip to main content" link, an essential accessibility feature. 
- `.sr-only` visually hides the link so it remains available to screen readers, helping keyboard and assistive technology users bypass repetitive navigation.
- `.focus\:not-sr-only:focus` makes the link visible when focused (usually by Tab key), letting keyboard users activate it easily.

Tailwind's utility classes do not fully cover this pattern, so we use custom CSS to ensure strong accessibility for all users.
*/

.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border-width: 0;
}
.focus\:not-sr-only:focus {
	position: static;
	width: auto;
	height: auto;
	padding: inherit;
	margin: inherit;
	overflow: visible;
	clip: auto;
	white-space: normal;
}
```

---

## Why This Structure

- Router is reusable and testable; views table is declarative
- Each view lives in one HTML file with a single `<template id="...">` (readable)
- Avoids `innerHTML` risks; render via cloning safe template content
- Can lazy-load view templates on first visit, then reuse from cache
- Works well with `DocumentFragment` for bulk updates (see {{ '/lessons/en/js-dom-manipulation/' | relative_url }})

## Exercises

1. Add a new `<template id="view-typography">` and route `#/typography`.
2. Add a list inside a template and populate it from `onMount` using a `DocumentFragment`.
3. Convert one string-template view from the other lesson into an HTML template.

---

## Demo Files

The lesson quotes the exact demo files above. They are also available in this folder:

- `demo/index.html`
- `demo/src/main.js`
- `demo/src/style.css`

---

## How to Run the Demo

You can run the demo locally with any static file server. For example:

1. **Using VS Code Live Server extension**

   - Open this folder in VS Code.
   - Right-click `demo/index.html` and select "Open with Live Server".

2. **Using `npm`'s built-in HTTP server:**

   ```sh
   npm install -g http-server
   http-server ./demo
   ```

3. **Using Python (if installed):**
   ```sh
   cd demo
   python3 -m http.server
   ```

Then visit [http://localhost:8080/](http://localhost:8080/) (or the port shown) in your browser.

### Adding Tailwind Styles to the Demo

This demo uses Tailwind CSS utility classes. To see the styles, add the Tailwind CDN to `demo/index.html`:

```html
<!-- demo/index.html <head> -->
<script src="https://cdn.tailwindcss.com"></script>
```

**Note:** For a production app, use a proper Tailwind build setup (Vite + PostCSS) instead of the CDN for smaller bundles and customization.

---

> **Previous:** [S2 - SPA Routing with String Templates ←]({{ '/lessons/en/tailwind/routing-and-shared-layout/string-templates/' | relative_url }})
>
> **Next:** [S3 - Components & Design System →]({{ '/lessons/en/tailwind/components-design-system/' | relative_url }})
