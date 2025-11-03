---
layout: lesson
title: 'Tailwind CSS: SPA Routing with String Templates'
title_alt: 'Tailwind CSS: SPA Routing with String Templates'
slug: tailwind-routing-string-templates
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/tailwind/routing-and-shared-layout/string-templates/
description: 'Complete guide to implementing SPA routing with JavaScript string templates, modular views architecture, and accessible navigation patterns with Tailwind CSS.'
tags: [tailwindcss, spa, routing, string-templates, accessibility, pedagogy]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Tailwind CSS: SPA Routing & Shared Layout — Building Interactive Experiences

> **AI Assistance Disclosure:** This lesson draws from classroom experience since September 2024, with AI iterations following research–practice–research cycles.

## 🎭 Critical Coding Approach

This lesson follows the **atelier methodology** (exploration → reflection → conceptualization → production → exhibition). We build not to automate, but to **articulate** — giving form to thought through rhythm, reflection, and resistance.

- **Exploration:** Interactive coding experiments with routing systems.
- **Reflection:** Understanding SPA architecture and accessibility trade-offs.
- **Conceptualization:** Connecting navigation patterns to user experience design.
- **Production:** Building accessible, performant routing systems.
- **Exhibition:** Demonstrating smooth navigation experiences.

## Prerequisites

<div class="prerequisites">
  <h3>📚 Before Starting</h3>
  <ul>
    <li><strong>Completed S1:</strong> Vite + Tailwind setup with basic HTML structure</li>
    <li><strong>JavaScript fundamentals:</strong> DOM manipulation, events, basic functions</li>
    <li><strong>Tailwind utilities:</strong> Familiarity with responsive design and component styling</li>
    <li><strong>Git basics:</strong> Committing changes and writing meaningful commit messages</li>
  </ul>
</div>

## 🚀 SPA Architecture: Beyond Static Pages

**Single-Page Applications (SPAs)** load one HTML document and use JavaScript to update content dynamically. This creates **app-like experiences** where navigation feels instant, but introduces considerations:

- **Client-Side Rendering (CSR):** Browser generates content dynamically
- **SEO challenges:** Content may not be crawlable without server-side rendering
- **JavaScript dependency:** Users without JS see blank pages
- **Performance trade-offs:** Initial load vs. navigation speed

Our hash-based router provides a **PWA-ready foundation** that can evolve into more sophisticated routing patterns.

## S2 — SPA Routing & Shared Layout (Navigation, Accessibility)

This session implements **hash-based routing** for smooth navigation without full page reloads, while maintaining accessibility standards.

### Step-by-Step Implementation

1. **Create shared layout structure:**

   ```html
   <!-- index.html -->
   <!DOCTYPE html>
   <html lang="en">
   	<head>
   		<meta charset="UTF-8" />
   		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
   		<title>Portfolio SPA</title>
   		<script type="module" src="/src/main.js"></script>
   	</head>
   	<body class="bg-surface-light text-content">
   		<!-- Using theme tokens: light surface + default text -->
   		<!-- Skip link for accessibility -->
   		<a
   			href="#app"
   			class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-content-inverted px-4 py-2 rounded">
   			<!-- Use brand and inverted text -->
   			Skip to main content
   		</a>

   		<!-- Shared navigation (semantic list) -->
   		<nav
   			class="fixed top-0 left-0 w-full bg-primary-900 text-content-inverted z-50 shadow-elevated"
   			role="navigation"
   			aria-label="Main navigation">
   			<!-- Brand header with elevated shadow -->
   			<div class="mx-auto px-4">
   				<div class="flex justify-between items-center py-4">
   					<a href="#/" class="text-4xl font-bold hover:text-primary-50 transition-colors" aria-label="Home">Portfolio</a>
   					<!-- Using default utility size (text-4xl) overridden in config -->
   					<ul class="flex gap-6">
   						<li><a href="#/" class="hover:text-primary-50 transition-colors" aria-current="page">Home</a></li>
   						<li><a href="#/about" class="hover:text-primary-50 transition-colors">About</a></li>
   						<li><a href="#/projects" class="hover:text-primary-50 transition-colors">Projects</a></li>
   						<li><a href="#/contact" class="hover:text-primary-50 transition-colors">Contact</a></li>
   					</ul>
   				</div>
   			</div>
   		</nav>

   		<!-- Main content area -->
   		<main id="app" class="min-h-screen pt-20 pb-24 flex items-center justify-center" role="main">
   			<!-- Views use tokens too -->
   			<!-- Views will be rendered here -->
   		</main>

   		<!-- Shared footer -->
   		<footer class="fixed bottom-0 left-0 w-full z-50 bg-surface-dark text-content-inverted py-8" role="contentinfo">
   			<!-- Dark surface + inverted text -->
   			<div class="container mx-auto px-4 text-center">
   				<p class="text-lg">&copy; 2025 Portfolio SPA. Built with Tailwind & Vanilla JS.</p>
   				<!-- Using default utility size (text-lg) overridden in config -->
   			</div>
   		</footer>
   	</body>
   </html>
   ```

2. **Implement hash-based router:**

   Teaching note — Class vs Function (concise):

   - Both a class and a factory function work here.
   - Class = encapsulated state + multiple instances; Factory = simple + composable.
   - We use a class for clarity now; refactor to a factory later if preferred.

```javascript
// src/router.js
// Hint: could also be a factory; class encapsulates state + setup.
class SimpleRouter {
	constructor(routes) {
		this.routes = routes;
		this.currentView = null;

		// Listen for hash changes
		window.addEventListener('hashchange', () => this.handleRoute());
		window.addEventListener('load', () => this.handleRoute());
	}

	handleRoute() {
		const hash = window.location.hash.slice(1) || '/';
		const route = this.routes[hash] || this.routes['404'];

		if (route !== this.currentView) {
			this.renderView(route);
			this.updateActiveNav(hash);
			this.currentView = route;
		}
	}

	renderView(route) {
		const app = document.getElementById('app');
		app.innerHTML = route.template;

		// Execute any view-specific JavaScript
		if (route.script) {
			route.script();
		}
	}

	updateActiveNav(currentHash) {
		// Only consider SPA router links that start with "#/".
		// This avoids touching in-page anchors like "#app" (skip links, section links).
		document.querySelectorAll('nav a[href^="#/"]').forEach((link) => {
			link.removeAttribute('aria-current');
		});

		// currentHash is like "/", "/about", ...
		// Build the full selector as `#${currentHash}` to match nav hrefs (e.g. href="#/about").
		const activeLink = document.querySelector(`nav a[href="#${currentHash}"]`);
		if (activeLink) {
			activeLink.setAttribute('aria-current', 'page');
		}
	}
}

export default SimpleRouter;
```

3. **Create views directory structure:**

   First, create separate view files for better organization and maintainability:

   ```javascript
   // src/views/home.js
   export default {
   	// Note: This uses a JavaScript template string (backticks) to build HTML.
   	// For a deeper understanding of DOM rendering options, security, and history,
   	// see the lesson: {{ '/lessons/en/js-dom-manipulation/' | relative_url }}
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">Welcome Home</h1>
          <p class="text-xl text-gray-600 mb-8">This is the home page of our SPA.</p>
          <a href="#/about" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Learn About Us
          </a>
        </div>
      </section>
    `,
   };
   ```

   ```javascript
   // src/views/about.js
   export default {
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
          <div class="max-w-3xl mx-auto">
            <p class="text-lg text-gray-700 mb-4">
              We build modern web applications with Tailwind CSS and vanilla JavaScript.
              Our focus is on accessibility, performance, and user experience.
            </p>
            <p class="text-lg text-gray-700 mb-6">
              This SPA demonstrates routing, responsive design, and progressive enhancement.
            </p>
            <a href="#/" class="text-blue-500 hover:text-blue-600 font-medium">← Back to Home</a>
          </div>
        </div>
      </section>
    `,
   };
   ```

   ```javascript
   // src/views/projects.js
   export default {
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Our Projects</h1>
          <div class="max-w-3xl mx-auto">
            <p class="text-lg text-gray-700 mb-6">
              Coming soon: A showcase of projects built with modern web technologies.
            </p>
            <a href="#/" class="text-blue-500 hover:text-blue-600 font-medium">← Back to Home</a>
          </div>
        </div>
      </section>
    `,
   };
   ```

   ```javascript
   // src/views/contact.js
   export default {
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Contact</h1>
          <div class="max-w-3xl mx-auto">
            <p class="text-lg text-gray-700 mb-6">
              Get in touch with us through our social channels.
            </p>
            <a href="#/" class="text-blue-500 hover:text-blue-600 font-medium">← Back to Home</a>
          </div>
        </div>
      </section>
    `,
   };
   ```

   ```javascript
   // src/views/404.js
   export default {
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Page Not Found</h1>
          <p class="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
          <a href="#/" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Go Home
          </a>
        </div>
      </section>
    `,
   };
   ```

   Now create an index file to collect all views:

   ```javascript
   // src/views/index.js
   import home from './home.js';
   import about from './about.js';
   import projects from './projects.js';
   import contact from './contact.js';
   import notFound from './404.js';

   export const views = {
   	'/': home,
   	'/about': about,
   	'/projects': projects,
   	'/contact': contact,
   	404: notFound,
   };
   ```

4. **Initialize router in main.js:**

   ```javascript
   // src/main.js
   import SimpleRouter from './router.js';
   import { views } from './views/index.js';
   import './style.css';

   // Initialize router
   const router = new SimpleRouter(views);

   // Optional: Smooth scroll for in-page anchors (hash links) WITHOUT breaking SPA routing
   // We:
   // 1) Use event delegation (single listener) to capture clicks on anchor tags.
   // 2) Only handle hashes that point to in-page sections (e.g. #app, #footer).
   // 3) Explicitly ignore router links that start with "#/" so hash-based routing continues to work.
   document.addEventListener('click', (e) => {
   	const link = e.target.closest('a[href^="#"]');
   	if (!link) return; // Not a hash link
   	const href = link.getAttribute('href');

   	// Ignore SPA router links like "#/about" — let the router handle navigation
   	if (href.startsWith('#/')) return;

   	// Smooth-scroll to in-page target (e.g. #app)
   	const target = document.querySelector(href);
   	if (target) {
   		e.preventDefault();
   		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
   	}
   });
   ```

5. **Add style.css for accessibility:**

   ```css
   /* src/style.css */
   /* 
   Custom CSS for skip link focus styles (not fully covered by Tailwind).
   
   If you are using Tailwind + PostCSS (as in a typical Vite setup), your style.css
   should start like this:
   
       @tailwind base;
       @tailwind components;
       @tailwind utilities;
   
   Accessibility rationale:
   These custom CSS classes support the "Skip to main content" link, an essential accessibility feature.
   - `.sr-only` visually hides the link so it remains accessible to screen readers, helping keyboard and assistive tech users bypass repetitive navigation.
   - `.focus\:not-sr-only:focus` makes the link visible when focused (usually with the Tab key), allowing keyboard users to easily activate it.
   
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

6. **Test the SPA:**

   - Navigate between routes using nav links
   - Verify URL hash updates without page reload
   - Test keyboard navigation and focus states
   - Check responsive layout on different screen sizes

7. **Commit your work:**
   ```bash
   git add .
   git commit -m "feat: S2 - SPA hash router + shared layout, accessible navigation"
   ```

## 🎯 Practice Exercises: Building Routes for Web Design Practice

Now that you have a modular routing system, each new Tailwind exercise can have its own route! This approach keeps your code organized and lets you build a portfolio of design experiments.

### Exercise 2.1: Create a Typography Showcase Route

Create a route to practice typography and color:

```javascript
// src/views/typography.js
export default {
	template: `
    <section class="py-16 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div class="container mx-auto px-4 max-w-4xl">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Typography & Color</h1>
        <p class="text-xl text-gray-600 mb-8">Exploring Tailwind's typographic scale and color system</p>
        
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Heading Hierarchy</h2>
          <h3 class="text-2xl font-semibold text-gray-800 mb-2">Subheading Example</h3>
          <h4 class="text-xl font-medium text-gray-700 mb-2">Section Title</h4>
          <p class="text-base text-gray-600 leading-relaxed mb-4">
            This is body text demonstrating proper line height and spacing. 
            Notice how Tailwind's default typography creates readable, accessible content.
          </p>
          <p class="text-sm text-gray-500">Small text for metadata or captions.</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-blue-500 text-white p-4 rounded text-center font-semibold">Blue</div>
          <div class="bg-green-500 text-white p-4 rounded text-center font-semibold">Green</div>
          <div class="bg-purple-500 text-white p-4 rounded text-center font-semibold">Purple</div>
          <div class="bg-red-500 text-white p-4 rounded text-center font-semibold">Red</div>
        </div>
        
        <a href="#/" class="inline-block mt-8 text-blue-600 hover:text-blue-700 font-medium">← Back to Home</a>
      </div>
    </section>
  `,
};
```

Then register it:

```javascript
// src/views/index.js
import home from './home.js';
import about from './about.js';
import projects from './projects.js';
import contact from './contact.js';
import typography from './typography.js'; // Add this
import notFound from './404.js';

export const views = {
	'/': home,
	'/about': about,
	'/projects': projects,
	'/contact': contact,
	'/typography': typography, // Add this
	404: notFound,
};
```

Add to navigation:

```html
<!-- index.html - Add to nav list -->
<li><a href="#/typography" class="hover:text-blue-400 transition-colors">Typography</a></li>
```

### Exercise 2.2: Create a Components Playground Route

This route will be your testing ground for reusable components:

```javascript
// src/views/components.js
export default {
	template: `
    <section class="py-16 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">Component Playground</h1>
        
        <!-- Button variants -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Buttons</h2>
          <div class="flex flex-wrap gap-4">
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
              Primary
            </button>
            <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
              Secondary
            </button>
            <button class="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-bold py-2 px-4 rounded transition-colors">
              Outline
            </button>
          </div>
        </div>

        <!-- Card grid -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Cards</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div class="h-32 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div class="p-4">
                <h3 class="font-bold text-gray-900 mb-2">Card Title</h3>
                <p class="text-gray-600 text-sm">Card description goes here.</p>
              </div>
            </article>
            
            <article class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div class="h-32 bg-gradient-to-r from-green-400 to-teal-500"></div>
              <div class="p-4">
                <h3 class="font-bold text-gray-900 mb-2">Card Title</h3>
                <p class="text-gray-600 text-sm">Card description goes here.</p>
              </div>
            </article>
            
            <article class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div class="h-32 bg-gradient-to-r from-pink-400 to-red-500"></div>
              <div class="p-4">
                <h3 class="font-bold text-gray-900 mb-2">Card Title</h3>
                <p class="text-gray-600 text-sm">Card description goes here.</p>
              </div>
            </article>
          </div>
        </div>
        
        <a href="#/" class="inline-block text-blue-600 hover:text-blue-700 font-medium">← Back to Home</a>
      </div>
    </section>
  `,
};
```

**Commit your practice work:**

```bash
git add .
git commit -m "feat: Add typography and components practice routes"
```

### 🎨 Why This Approach Works

- **Isolated experimentation:** Each design concept has its own route
- **Portfolio building:** Your SPA becomes a showcase of your work
- **Progressive complexity:** Start simple, add features incrementally
- **Real routing practice:** You're learning professional code organization
- **Future-ready:** In S3, we'll refactor these into reusable components

### 💡 Challenge Exercise

Create your own route for responsive layout practice:

1. Create `src/views/layouts.js`
2. Build a page showcasing different grid and flexbox patterns
3. Add it to `src/views/index.js` and navigation
4. Test responsive behavior at different screen sizes

## 🎓 Pedagogical Explanations

### SPA Architecture Trade-offs

**Client-Side Rendering (CSR) Benefits:**

- **Smooth UX:** No page reloads, app-like feel
- **Fast navigation:** Content updates instantly
- **Offline potential:** Can work with service workers

**CSR Challenges:**

- **SEO limitations:** Content not crawlable without SSR/hydration
- **Initial load:** Larger bundle, slower first paint
- **JS dependency:** Breaks without JavaScript enabled
- **Navigation state:** Browser back/forward needs careful handling

**Hash routing** provides a simple entry point that can evolve into more sophisticated patterns like the History API or framework-based routing.

### Accessibility in SPA Navigation

SPAs must maintain **web accessibility standards** while providing dynamic experiences:

- **Semantic landmarks:** `<nav>`, `<main>`, `<footer>` for screen readers
- **Skip links:** Allow keyboard users to jump to content
- **Focus management:** Ensure focus moves appropriately during route changes
- **ARIA labels:** Provide context for dynamic content
- **Progressive enhancement:** Core functionality works without JS

## Atelier Critical Questions

Following our **atelier methodology**, reflect on these questions:

### Exploration

- What user experience improvements come from avoiding full page reloads?
- How does the router's simplicity affect development velocity?

### Reflection

- Which accessibility trade-offs does client-side rendering introduce?
- How does hash-based routing affect perceived performance?

### Conceptualization

- How do routing patterns shape narrative and information architecture?
- In what ways does SPA navigation embody "interaction design"?

### Production

- Is your router code small, clear, and well-documented for maintainability?
- How might this routing approach scale for larger applications?

### Exhibition

- How will you demonstrate route changes and focus handling in a live demo?
- What alternative routing approaches (History API, frameworks) could achieve similar results?

## 🏗️ Minimal Repo Scaffold

Here's a complete starting point for your SPA router with modular views:

```
spa-portfolio/
├── index.html
├── src/
│   ├── main.js
│   ├── router.js
│   ├── style.css
│   └── views/
│       ├── index.js
│       ├── home.js
│       ├── about.js
│       ├── projects.js
│       ├── contact.js
│       └── 404.js
└── package.json
```

**Why separate view files?**

- **Maintainability:** Each view is self-contained and easy to locate
- **Scalability:** Adding new routes doesn't bloat a single file
- **Team collaboration:** Multiple developers can work on different views simultaneously
- **Pedagogy:** Teaches proper code organization from the start

**src/router.js:**

```javascript
// Hash-based router implementation
class SimpleRouter {
	constructor(routes) {
		this.routes = routes;
		this.currentView = null;

		window.addEventListener('hashchange', () => this.handleRoute());
		window.addEventListener('load', () => this.handleRoute());
	}

	handleRoute() {
		const hash = window.location.hash.slice(1) || '/';
		const route = this.routes[hash] || this.routes['404'];

		if (route !== this.currentView) {
			this.renderView(route);
			this.updateActiveNav(hash);
			this.currentView = route;
		}
	}

	renderView(route) {
		const app = document.getElementById('app');
		app.innerHTML = route.template;

		if (route.script) {
			route.script();
		}
	}

	updateActiveNav(currentHash) {
		document.querySelectorAll('nav a').forEach((link) => {
			link.removeAttribute('aria-current');
		});

		const activeLink = document.querySelector(`nav a[href="${currentHash}"]`);
		if (activeLink) {
			activeLink.setAttribute('aria-current', 'page');
		}
	}
}

export default SimpleRouter;
```

**src/views/home.js:**

```javascript
export default {
	template: `
    <section class="py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">Welcome Home</h1>
        <p class="text-xl text-gray-600 mb-8">Navigate using the menu above!</p>
      </div>
    </section>
  `,
};
```

**src/views/about.js:**

```javascript
export default {
	template: `
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-3xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-6">About This SPA</h1>
        <p class="text-lg text-gray-700">Built with vanilla JavaScript and Tailwind CSS for maximum control and learning.</p>
      </div>
    </section>
  `,
};
```

**src/views/404.js:**

```javascript
export default {
	template: `
    <section class="py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-6">Page Not Found</h1>
        <a href="#/" class="text-blue-500 hover:text-blue-600">Go Home</a>
      </div>
    </section>
  `,
};
```

**src/views/index.js:**

```javascript
import home from './home.js';
import about from './about.js';
import notFound from './404.js';

export const views = {
	'/': home,
	'/about': about,
	404: notFound,
};
```

## References

- [MDN - Client-side rendering (CSR)](https://developer.mozilla.org/en-US/docs/Glossary/CSR)
- [CleanCommit - SPA vs MPA comparison](https://cleancommit.io/blog/spa-vs-mpa-which-is-the-king/)
- [StackOverflow - Vanilla JS SPA routing](https://stackoverflow.com/questions/54231533/how-to-create-a-vanilla-js-routing-for-spa)

---

> **Next:** [S2b - SPA Routing with HTML `<template>` →]({{ '/lessons/en/tailwind/routing-and-shared-layout/html-template/' | relative_url }})
