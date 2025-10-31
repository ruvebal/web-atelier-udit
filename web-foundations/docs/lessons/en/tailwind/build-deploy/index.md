---
layout: lesson
title: 'Tailwind CSS: Build & Deploy — Production-Ready PWA'
title_alt: 'Tailwind CSS: Build & Deploy — Production-Ready PWA'
slug: tailwind-build-deploy
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/tailwind/build-deploy/
description: 'Complete guide to building and deploying Tailwind CSS applications, including PWA features, GitHub Pages, and production optimization.'
tags: [tailwindcss, build, deploy, pwa, github-pages, pedagogy]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Tailwind CSS: Build & Deploy — Production-Ready PWA

> **AI Assistance Disclosure:** This lesson draws from classroom experience since September 2024, with AI iterations following research–practice–research cycles.

## 🎭 Critical Coding Approach

This lesson follows the **atelier methodology** (exploration → reflection → conceptualization → production → exhibition). We build not to automate, but to **articulate** — giving form to thought through rhythm, reflection, and resistance.

- **Exploration:** Understanding build processes and deployment strategies.
- **Reflection:** Considering how deployment affects user experience and accessibility.
- **Conceptualization:** Connecting build optimization to sustainability and ethics.
- **Production:** Creating production-ready applications with PWA features.
- **Exhibition:** Demonstrating polished, deployable web applications.

## Prerequisites

<div class="prerequisites">
  <h3>📚 Before Starting</h3>
  <ul>
    <li><strong>Completed S1–S5:</strong> Full Tailwind SPA with components, state, and optimizations</li>
    <li><strong>Build tools:</strong> Understanding of npm scripts and bundling</li>
    <li><strong>Git and GitHub:</strong> Repository management and GitHub Pages setup</li>
    <li><strong>Static hosting:</strong> Experience with deployment platforms</li>
  </ul>
</div>

## 🚀 Production Builds: From Development to Deployment

**Production builds** transform development code into optimized, deployable applications. Key differences include:

- **Bundle optimization:** Minification, tree-shaking, and asset optimization
- **Environment variables:** Different configurations for dev vs. production
- **Asset handling:** Hashed filenames, CDN optimization, lazy loading
- **Performance monitoring:** Analytics and error tracking setup

Our approach creates **production-ready PWAs** that can be installed, work offline, and provide native app-like experiences.

## S6 — Build & Deploy (Production, PWA, GitHub Pages)

This session focuses on building optimized production bundles and deploying to static hosting platforms.

### Step-by-Step Implementation

1. **Configure Vite for production:**

   ```javascript
   // vite.config.js
   import { defineConfig } from 'vite';

   export default defineConfig({
   	base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
   	build: {
   		outDir: 'dist',
   		assetsDir: 'assets',
   		sourcemap: false, // Disable for production
   		minify: 'terser',
   		rollupOptions: {
   			output: {
   				manualChunks: {
   					vendor: ['react', 'react-dom'], // If using React
   				},
   			},
   		},
   	},
   });
   ```

2. **Add PWA manifest:**

   ```html
   <!-- public/manifest.json -->
   { "name": "Tailwind Portfolio", "short_name": "Portfolio", "description": "Modern portfolio built with Tailwind CSS
   and Vite", "start_url": "/", "display": "standalone", "background_color": "#ffffff", "theme_color": "#3b82f6",
   "icons": [ { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" }, { "src": "/icons/icon-512.png",
   "sizes": "512x512", "type": "image/png" } ] }
   ```

3. **Add manifest link to HTML:**

   ```html
   <!-- index.html -->
   <link rel="manifest" href="/manifest.json" />
   <meta name="theme-color" content="#3b82f6" />
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Verify production build:**

   ```bash
   # Serve dist folder locally to test
   npx serve dist

   # Check that all assets load correctly
   # Verify PWA install prompt appears
   # Test offline functionality
   ```

6. **Configure GitHub Pages:**

   - Go to repository Settings → Pages
   - Select "GitHub Actions" as source
   - Create `.github/workflows/deploy.yml`

7. **Create deployment workflow:**

   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages

   on:
    push:
     branches: [main]
    workflow_dispatch:

   permissions:
    contents: read
    pages: write
    id-token: write

   concurrency:
    group: 'pages'
    cancel-in-progress: false

   jobs:
    build:
     runs-on: ubuntu-latest
     steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
         node-version: '20'
         cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
         path: './dist'

    deploy:
     environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
     runs-on: ubuntu-latest
     needs: build
     steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
   ```

8. **Add deployment documentation:**

   ````markdown
   <!-- README.md -->

   # Tailwind Portfolio

   Modern portfolio built with Tailwind CSS, Vite, and vanilla JavaScript.

   ## Development

   ```bash
   npm install
   npm run dev
   ```
   ````

   ## Build & Deploy

   ```bash
   npm run build
   ```

   The site is automatically deployed to GitHub Pages via GitHub Actions.

   ```

   ```

9. **Test PWA features:**

   - Install the app from browser
   - Test offline functionality
   - Verify service worker registration
   - Check app manifest properties

10. **Commit your production-ready application:**
    ```bash
    git add .
    git commit -m "feat: S6 - Production build + PWA features + GitHub Pages deployment"
    ```

## 🎓 Pedagogical Explanations

### Production Build Optimization

**Vite's build process** transforms development code into production-ready assets:

**Bundle analysis:**

- **Tree shaking:** Removes unused code
- **Code splitting:** Splits code into smaller chunks for faster loading
- **Asset optimization:** Compresses and hashes files for caching

**PWA features:**

- **Service workers:** Enable offline functionality and background sync
- **Web app manifest:** Defines how the app appears when installed
- **Caching strategies:** Improve performance and offline experience

### Deployment Considerations

**Static hosting** provides global CDN distribution but requires specific configurations:

**GitHub Pages specifics:**

- **Base path:** Must match repository name for subpath deployment
- **HTTPS:** Required for PWA features and modern web APIs
- **Custom domains:** Can be configured for production use

**Performance monitoring:**

- **Core Web Vitals:** Track real-world performance metrics
- **Error tracking:** Monitor JavaScript errors and user interactions
- **Analytics:** Understand user behavior and conversion metrics

## Atelier Critical Questions

Following our **atelier methodology**, reflect on these questions:

### Exploration

- What changed most significantly between your development and production builds?
- How did the deployment process reveal previously unnoticed issues?

### Reflection

- How does your deployment story and hosting choice affect end users?
- What performance trade-offs did you make for production optimization?

### Conceptualization

- What makes a project "ready" to show to others versus "ready" for users?
- How does the build process relate to software sustainability and maintenance?

### Production

- Is your README clear and comprehensive for future contributors and maintainers?
- How maintainable is your build and deployment configuration?

### Exhibition

- What narrative will you present with your live, deployed site?
- How will you invite critique and demonstrate the evolution from S1 to S6?

## Critical Prompts

### Reflection Prompts

- How does Tailwind's build process change your approach to production code?
- What is the relationship between development experience and production reality?
- How can critical coding shape our understanding of software deployment and distribution?
- How does your deployed application represent your journey as a developer?

### Ethics Prompts

- Whose infrastructure and labor enable your application's deployment and hosting?
- How do your build optimizations affect users with different devices and connections?
- What happens when deployment requirements conflict with accessibility or performance needs?

### Technical Philosophy Prompts

- Is "build optimization" more about performance or about developer experience?
- How does the build-deploy process relate to concepts like reproducible builds?
- What does it mean to "deploy responsibly" in terms of environmental and social impact?

## 🏗️ Minimal Repo Scaffold

Here's a complete starting point for your production-ready application:

```
production-portfolio/
├── index.html
├── public/
│   ├── manifest.json
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
├── src/
│   ├── main.js
│   ├── style.css
│   └── components/
└── .github/
    └── workflows/
        └── deploy.yml
```

**public/manifest.json:**

```json
{
	"name": "Tailwind Portfolio",
	"short_name": "Portfolio",
	"description": "Modern portfolio built with Tailwind CSS and Vite",
	"start_url": "/",
	"display": "standalone",
	"background_color": "#ffffff",
	"theme_color": "#3b82f6",
	"icons": [
		{
			"src": "/icons/icon-192.png",
			"sizes": "192x192",
			"type": "image/png"
		},
		{
			"src": "/icons/icon-512.png",
			"sizes": "512x512",
			"type": "image/png"
		}
	]
}
```

**vite.config.js:**

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
		sourcemap: false,
		minify: 'terser',
	},
});
```

**.github/workflows/deploy.yml:**

```yaml
name: Deploy to GitHub Pages

on:
 push:
  branches: [main]
 workflow_dispatch:

permissions:
 contents: read
 pages: write
 id-token: write

jobs:
 build:
  runs-on: ubuntu-latest
  steps:
   - name: Checkout
     uses: actions/checkout@v4

   - name: Setup Node
     uses: actions/setup-node@v4
     with:
      node-version: '20'
      cache: 'npm'

   - name: Install dependencies
     run: npm ci

   - name: Build
     run: npm run build

   - name: Setup Pages
     uses: actions/configure-pages@v4

   - name: Upload artifact
     uses: actions/upload-pages-artifact@v3
     with:
      path: './dist'

 deploy:
  environment:
   name: github-pages
   url: ${{ steps.deployment.outputs.page_url }}
  runs-on: ubuntu-latest
  needs: build
  steps:
   - name: Deploy to GitHub Pages
     id: deployment
     uses: actions/deploy-pages@v4
```

## References

- [Vite - Build configuration](https://vite.dev/config/build-options.html)
- [MDN - Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [GitHub Pages - Deployment](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
- [PWA documentation](https://web.dev/pwa/)

---

> **Congratulations!** You've completed the full Tailwind CSS roadmap. Your portfolio is now a production-ready PWA deployed to the web. 🎉