---
layout: lesson
title: 'Tailwind CSS: SPA Routing & Shared Layout — Building Interactive Experiences'
title_en: 'Tailwind CSS: SPA Routing & Shared Layout — Building Interactive Experiences'
slug: tailwind-routing-layout
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/tailwind/routing-and-shared-layout/
description: 'Complete guide to implementing SPA routing and shared layouts with Tailwind CSS, including pedagogy, accessibility, and practical scaffolding.'
tags: [tailwindcss, spa, routing, accessibility, pedagogy]
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
   	<body>
   		<!-- Skip link for accessibility -->
   		<a
   			href="#main"
   			class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-500 text-white px-4 py-2 rounded">
   			Skip to main content
   		</a>

   		<!-- Shared navigation -->
   		<nav class="bg-gray-900 text-white sticky top-0 z-50" role="navigation" aria-label="Main navigation">
   			<div class="container mx-auto px-4">
   				<div class="flex justify-between items-center py-4">
   					<a href="#/" class="text-xl font-bold hover:text-blue-400 transition-colors" aria-label="Home">Portfolio</a>
   					<div class="space-x-6">
   						<a href="#/" class="hover:text-blue-400 transition-colors" aria-current="page">Home</a>
   						<a href="#/about" class="hover:text-blue-400 transition-colors">About</a>
   						<a href="#/projects" class="hover:text-blue-400 transition-colors">Projects</a>
   						<a href="#/contact" class="hover:text-blue-400 transition-colors">Contact</a>
   					</div>
   				</div>
   			</div>
   		</nav>

   		<!-- Main content area -->
   		<main id="app" class="min-h-screen" role="main">
   			<!-- Views will be rendered here -->
   		</main>

   		<!-- Shared footer -->
   		<footer class="bg-gray-800 text-white py-8" role="contentinfo">
   			<div class="container mx-auto px-4 text-center">
   				<p>&copy; 2025 Portfolio SPA. Built with Tailwind & Vanilla JS.</p>
   			</div>
   		</footer>
   	</body>
   </html>
   ```

2. **Implement hash-based router:**

   ```javascript
   // src/router.js
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
   		// Remove aria-current from all nav links
   		document.querySelectorAll('nav a').forEach((link) => {
   			link.removeAttribute('aria-current');
   		});

   		// Add aria-current to matching nav link
   		const activeLink = document.querySelector(`nav a[href="${currentHash}"]`);
   		if (activeLink) {
   			activeLink.setAttribute('aria-current', 'page');
   		}
   	}
   }

   export default SimpleRouter;
   ```

3. **Create view templates:**

   ```javascript
   // src/views.js
   export const views = {
   	'/': {
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
   	},
   	'/about': {
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
   	},
   	404: {
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
   	},
   };
   ```

4. **Initialize router in main.js:**

   ```javascript
   // src/main.js
   import SimpleRouter from './router.js';
   import { views } from './views.js';

   // Initialize router
   const router = new SimpleRouter(views);

   // Optional: Add smooth scrolling for anchor links
   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
   	anchor.addEventListener('click', function (e) {
   		e.preventDefault();
   		const target = document.querySelector(this.getAttribute('href'));
   		if (target) {
   			target.scrollIntoView({
   				behavior: 'smooth',
   				block: 'start',
   			});
   		}
   	});
   });
   ```

5. **Test the SPA:**

   - Navigate between routes using nav links
   - Verify URL hash updates without page reload
   - Test keyboard navigation and focus states
   - Check responsive layout on different screen sizes

6. **Commit your work:**
   ```bash
   git add .
   git commit -m "feat: S2 - SPA hash router + shared layout, accessible navigation"
   ```

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

Here's a complete starting point for your SPA router:

```
spa-portfolio/
├── index.html
├── src/
│   ├── main.js
│   ├── router.js
│   └── views.js
└── package.json
```

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

**src/views.js:**

```javascript
export const views = {
	'/': {
		template: `
      <section class="py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">Welcome Home</h1>
          <p class="text-xl text-gray-600 mb-8">Navigate using the menu above!</p>
        </div>
      </section>
    `,
	},
	'/about': {
		template: `
      <section class="py-16">
        <div class="container mx-auto px-4 max-w-3xl">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">About This SPA</h1>
          <p class="text-lg text-gray-700">Built with vanilla JavaScript and Tailwind CSS for maximum control and learning.</p>
        </div>
      </section>
    `,
	},
	404: {
		template: `
      <section class="py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Page Not Found</h1>
          <a href="#/" class="text-blue-500 hover:text-blue-600">Go Home</a>
        </div>
      </section>
    `,
	},
};
```

## References

- [MDN - Client-side rendering (CSR)](https://developer.mozilla.org/en-US/docs/Glossary/CSR)
- [CleanCommit - SPA vs MPA comparison](https://cleancommit.io/blog/spa-vs-mpa-which-is-the-king/)
- [StackOverflow - Vanilla JS SPA routing](https://stackoverflow.com/questions/54231533/how-to-create-a-vanilla-js-routing-for-spa)

---

> **Next:** [S3 - Components & Design System →]({{ '/lessons/en/tailwind/components-design-system/' | relative_url }})
