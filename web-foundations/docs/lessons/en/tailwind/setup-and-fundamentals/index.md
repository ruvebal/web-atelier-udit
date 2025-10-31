---
layout: lesson
title: 'Tailwind CSS: Setup & Fundamentals — PWA-Ready Development'
title_alt: 'Tailwind CSS: Setup & Fundamentals — PWA-Ready Development'
slug: tailwind-setup-fundamentals
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/tailwind/setup-and-fundamentals/
description: 'Complete guide to setting up Tailwind CSS with Vite for modern PWA development, including fundamentals, pedagogy, and practical scaffolding.'
tags: [tailwindcss, vite, postcss, pwa, setup, pedagogy]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Tailwind CSS: Setup & Fundamentals — PWA-Ready Development

> **AI Assistance Disclosure:** This lesson draws from classroom experience since September 2024, with AI iterations following research–practice–research cycles.

## 🎭 Critical Coding Approach

This lesson follows the **atelier methodology** (exploration → reflection → conceptualization → production → exhibition). We code not to automate, but to **articulate** — giving form to thought through rhythm, reflection, and resistance.

- **Exploration:** Hands-on coding experiments guided by theory.
- **Reflection:** Understanding what happens behind the code.
- **Conceptualization:** Connecting practical work to design theory and ethics.
- **Production:** Building individual projects with critical awareness.
- **Exhibition:** Publishing and discussing outcomes collectively.

## Prerequisites

<div class="prerequisites">
  <h3>📚 Before Starting</h3>
  <ul>
    <li><strong>Node.js LTS (20+):</strong> JavaScript runtime for tooling</li>
    <li><strong>npm/npx:</strong> Package manager and runner (npx included since npm v5.2+)</li>
    <li><strong>Basic HTML/CSS:</strong> Semantic markup and styling fundamentals</li>
    <li><strong>Command Line:</strong> Comfort with terminal/terminal commands</li>
    <li><strong>Text Editor:</strong> VS Code with Live Server extension recommended</li>
  </ul>
</div>

## 🚀 PWA-Ready Development: Why This Matters

**Progressive Web Apps (PWAs)** represent the convergence of web and native app experiences. Unlike traditional websites that are purely server-rendered or basic SPAs, PWAs can:

- **Work offline** through service workers
- **Install on devices** like native apps
- **Send push notifications** for engagement
- **Access device APIs** (camera, GPS, etc.)
- **Provide app-like performance** with caching strategies

Our Tailwind + Vite setup creates a **PWA-ready foundation** that can be enhanced with service workers, manifest files, and caching strategies later in the course.

## S1 — Setup & Fundamentals (Mobile-First, Utility-First)

This session introduces **utility-first CSS** as a design system approach where classes like `.bg-blue-500` or `.p-4` apply single styles directly in markup. This contrasts with traditional CSS where you write custom classes and selectors.

### Step-by-Step Implementation

1. **Install Node.js LTS (20+)** and verify: `node -v` (should show 20.x.x)

2. **Create Vite project:**

   ```bash
   npm create vite@latest tailwind-portfolio -- --template vanilla
   cd tailwind-portfolio
   npm install
   npm run dev
   ```

   This scaffolds a modern project with Vite's dev server (typically `http://localhost:5173`).

3. **Install Tailwind CSS:**

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. **Configure Tailwind:**

   ```javascript
   // tailwind.config.js
   /** @type {import('tailwindcss').Config} */
   export default {
   	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   	theme: {
   		extend: {},
   	},
   	plugins: [],
   };
   ```

5. **Enable Tailwind in CSS:**

   ```css
   /* src/style.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

6. **Import CSS in main.js:**

   ```javascript
   // src/main.js
   import './style.css';
   ```

7. **Build hero section with utilities:**

   ```html
   <!-- index.html -->
   <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
   	<div class="container mx-auto px-4 py-8">
   		<header class="text-center">
   			<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Modern Portfolio</h1>
   			<p class="text-xl md:text-2xl text-gray-600 mb-8">Built with Tailwind CSS & Vite</p>
   			<a
   				href="#projects"
   				class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
   				View Projects
   			</a>
   		</header>
   	</div>
   </div>
   ```

8. **Test responsiveness:** Resize browser or use dev tools mobile view to see mobile-first behavior.

9. **Commit your work:**
   ```bash
   git add .
   git commit -m "feat: S1 - Vite + Tailwind setup; hero section mobile-first"
   ```

## 🎓 Pedagogical Explanations

### Why Utility-First CSS?

**Traditional CSS** separates styling from markup, creating maintainability challenges as projects scale. Utility-first approaches like Tailwind **colocate** styles with components, reducing CSS file size and improving developer experience.

**Historical context:** The utility-first movement evolved from:

- **BASSCSS (2013):** Early utility framework
- **Tachyons (2014):** Popularized immutable utility classes
- **Tailwind (2017):** Made utilities approachable with intuitive naming

**Key advantages:**

- **Smaller bundles:** Unused utilities are purged in production
- **Faster development:** No context switching between HTML/CSS
- **Consistent design:** Utilities enforce design system constraints
- **Responsive by default:** Mobile-first with breakpoint variants

**Potential drawbacks:**

- **HTML pollution:** Many classes can make markup harder to read
- **Learning curve:** Requires understanding utility composition
- **Customization limits:** Heavy customization may require `@apply` or custom CSS

## Atelier Critical Questions

Following our **atelier methodology**, reflect on these questions:

### Exploration

- What did you learn by composing with utilities versus writing custom CSS classes?
- How did the utility-first approach change your relationship to styling?

### Reflection

- Which utility choices improved code readability? Which hindered it?
- How does colocating styles with markup affect maintainability?

### Conceptualization

- How does utility-first CSS relate to design systems and design tokens?
- In what ways does this approach embody "design as code"?

### Production

- What does your commit message communicate to future collaborators?
- How might this approach scale for larger teams or projects?

### Exhibition

- How will you demo the mobile-first responsive behavior in a live presentation?
- What alternative styling approaches could achieve similar results?

## 🏗️ Minimal Repo Scaffold

Here's a complete starting point for your Tailwind + Vite project:

```
tailwind-portfolio/
├── index.html
├── src/
│   ├── main.js
│   └── style.css
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Tailwind Portfolio</title>
		<script type="module" src="/src/main.js"></script>
	</head>
	<body>
		<div class="min-h-screen bg-gray-50">
			<div class="container mx-auto px-4 py-8">
				<!-- Your content here -->
			</div>
		</div>
	</body>
</html>
```

**src/main.js:**

```javascript
import './style.css';

// Optional: Add basic interactivity
document.addEventListener('DOMContentLoaded', () => {
	console.log('Tailwind Portfolio loaded!');
});
```

**src/style.css:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles can go here */
@layer base {
	body {
		font-family: system-ui, -apple-system, sans-serif;
	}
}
```

## Initialize Git and connect to GitHub (HTTPS)

Students should version their work and publish to GitHub using HTTPS (no SSH needed).

1. Initialize repo and create a basic .gitignore

```bash
git init
printf "node_modules/\n.vite/\ndist/\n.env\n.DS_Store\n" >> .gitignore
```

2. Set your Git identity (once per machine)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

3. First commit

```bash
git add -A
git commit -m "chore: initialize project with Tailwind + Vite"
```

4. Create a new empty repo on GitHub (web UI). Copy its HTTPS URL, e.g.:

```text
https://github.com/<your-user>/<your-repo>.git
```

5. Add remote and push (use a GitHub Personal Access Token when prompted)

```bash
git remote add origin https://github.com/<your-user>/<your-repo>.git
git branch -M main
git push -u origin main
```

Notes

- If 2FA is enabled, GitHub will ask for a Personal Access Token (classic) instead of a password: Settings → Developer settings → Personal access tokens → Generate new token (classic). Scope: repo.
- You can update later with: `git add -A && git commit -m "feat: ..." && git push`.

## References

- [MDN - Package management basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_tools/Package_management)
- [Vite - Static site deployment](https://vite.dev/guide/static-deploy)
- [Tailwind CSS - Installation guide](https://tailwindcss.com/docs/installation)
- [FreeCodeCamp - npm vs npx](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/)
- [PostCSS overview](https://www.freecodecamp.org/news/what-is-postcss/)
- [Utility-first CSS frameworks](https://blog.logrocket.com/top-utility-first-css-frameworks/)

---

> **Next:** [S2 - SPA Routing & Layout →]({{ '/lessons/en/tailwind/routing-and-shared-layout/' | relative_url }})