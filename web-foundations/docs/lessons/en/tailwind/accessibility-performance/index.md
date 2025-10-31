---
layout: lesson
title: 'Tailwind CSS: Accessibility & Performance — Inclusive & Optimized Design'
title_alt: 'Tailwind CSS: Accessibility & Performance — Inclusive & Optimized Design'
slug: tailwind-accessibility-performance
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/tailwind/accessibility-performance/
description: 'Complete guide to accessibility auditing and performance optimization with Tailwind CSS, including WCAG compliance and Lighthouse testing.'
tags: [tailwindcss, accessibility, performance, a11y, lighthouse, pedagogy]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Tailwind CSS: Accessibility & Performance — Inclusive & Optimized Design

> **AI Assistance Disclosure:** This lesson draws from classroom experience since September 2024, with AI iterations following research–practice–research cycles.

## 🎭 Critical Coding Approach

This lesson follows the **atelier methodology** (exploration → reflection → conceptualization → production → exhibition). We build not to automate, but to **articulate** — giving form to thought through rhythm, reflection, and resistance.

- **Exploration:** Auditing interfaces for inclusion and performance metrics.
- **Reflection:** Understanding accessibility as a design and ethical imperative.
- **Conceptualization:** Connecting performance to user experience and social justice.
- **Production:** Building performant, accessible interfaces that work for everyone.
- **Exhibition:** Demonstrating inclusive design through measurable improvements.

## Prerequisites

<div class="prerequisites">
  <h3>📚 Before Starting</h3>
  <ul>
    <li><strong>Completed S1–S4:</strong> Full Tailwind SPA with components, state, and interactivity</li>
    <li><strong>Accessibility basics:</strong> Understanding of WCAG, semantic HTML, ARIA</li>
    <li><strong>Performance concepts:</strong> Familiarity with Core Web Vitals and optimization</li>
    <li><strong>Developer tools:</strong> Experience with browser dev tools and Lighthouse</li>
  </ul>
</div>

## 🚀 Inclusive Design: Performance for All Users

**Accessibility** and **performance** are interconnected aspects of inclusive design. Poor performance disproportionately affects users with:

- **Slow connections:** Rural areas, developing regions, mobile networks
- **Older devices:** Limited processing power and memory
- **Assistive technologies:** Screen readers, voice control, alternative input methods
- **Cognitive disabilities:** Simplified interfaces reduce cognitive load

Our approach creates **PWA-ready** experiences that are fast, accessible, and work across all devices and user capabilities.

## S5 — Accessibility & Performance (Audit, Optimization, Testing)

This session focuses on auditing for accessibility compliance and optimizing for performance, ensuring our interfaces work for everyone.

### Step-by-Step Implementation

1. **Add skip link for keyboard navigation:**

   ```html
   <!-- Skip link - must be first focusable element -->
   <a
   	href="#main"
   	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded z-50">
   	Skip to main content
   </a>
   ```

2. **Audit semantic structure and landmarks:**

   ```html
   <!-- Ensure proper heading hierarchy -->
   <header>
   	<h1>Main Page Title</h1>
   </header>

   <nav role="navigation" aria-label="Main navigation">
   	<!-- Navigation content -->
   </nav>

   <main id="main">
   	<section>
   		<h2>Section Title</h2>
   		<!-- Section content -->
   	</section>
   </main>

   <footer role="contentinfo">
   	<!-- Footer content -->
   </footer>
   ```

3. **Check and fix color contrast:**

   ```css
   /* Ensure WCAG AA compliance (4.5:1 for normal text, 3:1 for large text) */
   .text-gray-600 {
   	/* May need adjustment for better contrast */
   }
   .bg-primary-500 {
   	color: #ffffff;
   } /* Ensure sufficient contrast */
   ```

4. **Implement proper focus management:**

   ```css
   /* Focus-visible for keyboard navigation */
   .focus-visible\:ring-2:focus-visible {
   	outline: 2px solid transparent;
   	outline-offset: 2px;
   }
   ```

5. **Add reduced motion support:**

   ```css
   /* Respect user preferences for reduced motion */
   @media (prefers-reduced-motion: reduce) {
   	*,
   	*::before,
   	*::after {
   		animation-duration: 0.01ms !important;
   		animation-iteration-count: 1 !important;
   		transition-duration: 0.01ms !important;
   	}
   }
   ```

6. **Optimize images and assets:**

   ```html
   <!-- Responsive images with proper alt text -->
   <picture>
   	<source media="(min-width: 768px)" srcset="hero-large.webp" />
   	<img
   		src="hero-small.webp"
   		alt="Hero image showing modern web development"
   		loading="lazy"
   		class="w-full h-64 object-cover" />
   </picture>
   ```

7. **Run Lighthouse audit:**

   ```bash
   # Install Lighthouse CLI
   npm install -g lighthouse

   # Run performance audit
   lighthouse http://localhost:5173 --output html --output-path ./lighthouse-report.html
   ```

8. **Analyze and fix performance issues:**

   ```javascript
   // Optimize bundle size by lazy loading non-critical components
   const loadComponent = async (componentName) => {
   	const module = await import(`./components/${componentName}.js`);
   	return module.default;
   };

   // Use when component is needed
   const ContactForm = await loadComponent('ContactForm');
   ```

9. **Test with assistive technologies:**

   - Use screen reader (NVDA, JAWS, VoiceOver)
   - Test keyboard-only navigation
   - Verify high contrast mode compatibility
   - Check with slow network throttling

10. **Commit your accessibility and performance improvements:**
    ```bash
    git add .
    git commit -m "feat: S5 - Accessibility audit + performance optimizations (WCAG AA, Lighthouse improvements)"
    ```

## 🎯 Practice Exercise: Accessibility Demo Route

Create a comprehensive route showcasing accessibility features and demonstrating WCAG compliance:

### Exercise 5.1: Create Accessibility Showcase Route

```javascript
// src/views/accessibility.js
export default {
	template: `
    <section class="py-16 min-h-screen">
      <div class="container mx-auto px-4 max-w-6xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">Accessibility Features Showcase</h1>
        <p class="text-lg text-gray-600 mb-12">
          Demonstrating WCAG 2.1 AA compliant components and inclusive design patterns.
        </p>

        <!-- Skip Link Demo -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Skip Links</h2>
          <p class="text-gray-700 mb-4">
            Try pressing <kbd class="px-2 py-1 bg-gray-200 rounded">Tab</kbd> to reveal the skip link at the top of this page.
            Skip links help keyboard users navigate directly to main content.
          </p>
          <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded-md z-50">
            Skip to main content
          </a>
        </div>

        <!-- Semantic HTML Demo -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Semantic Structure</h2>
          <p class="text-gray-700 mb-4">
            Proper HTML5 landmarks help screen readers understand page structure.
          </p>
          <div class="space-y-2 font-mono text-sm bg-gray-50 p-4 rounded">
            <div><code class="text-blue-600">&lt;header&gt;</code> - Site header</div>
            <div><code class="text-blue-600">&lt;nav&gt;</code> - Navigation menus</div>
            <div><code class="text-blue-600">&lt;main&gt;</code> - Primary content</div>
            <div><code class="text-blue-600">&lt;article&gt;</code> - Self-contained content</div>
            <div><code class="text-blue-600">&lt;aside&gt;</code> - Complementary content</div>
            <div><code class="text-blue-600">&lt;footer&gt;</code> - Site footer</div>
          </div>
        </div>

        <!-- Color Contrast Demo -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Color Contrast (WCAG AA: 4.5:1)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Good contrast -->
            <div class="border-2 border-green-500 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-gray-900">✓ Good Contrast</span>
                <span class="text-sm text-green-600">7.8:1</span>
              </div>
              <p class="text-gray-900 bg-white p-3 rounded">
                This text has sufficient contrast for readability.
              </p>
            </div>
            
            <!-- Bad contrast (for demonstration) -->
            <div class="border-2 border-red-500 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-gray-900">✗ Poor Contrast</span>
                <span class="text-sm text-red-600">2.3:1</span>
              </div>
              <p class="text-gray-400 bg-white p-3 rounded">
                This text fails WCAG AA standards (for demo only).
              </p>
            </div>
          </div>
        </div>

        <!-- Focus States Demo -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Visible Focus States</h2>
          <p class="text-gray-700 mb-4">
            Try tabbing through these interactive elements to see clear focus indicators.
          </p>
          <div class="flex flex-wrap gap-4">
            <button class="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-4 focus:ring-primary-300 transition-all">
              Primary Button
            </button>
            <button class="border-2 border-primary-500 text-primary-500 hover:bg-primary-50 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-4 focus:ring-primary-300 transition-all">
              Secondary Button
            </button>
            <a href="#" class="text-primary-500 hover:text-primary-600 underline focus:outline-none focus:ring-4 focus:ring-primary-300 rounded transition-all">
              Text Link
            </a>
          </div>
        </div>

        <!-- ARIA Labels Demo -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">ARIA Labels & Live Regions</h2>
          <div class="space-y-4">
            <div>
              <label for="search-demo" class="block text-sm font-medium text-gray-700 mb-2">
                Search (with aria-label)
              </label>
              <div class="relative">
                <input
                  type="search"
                  id="search-demo"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
                  placeholder="Search..."
                  aria-label="Search the website"
                />
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div>
              <button id="notification-btn" class="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md focus:ring-4 focus:ring-primary-300 transition-all">
                Trigger Live Region Announcement
              </button>
              <div id="live-region" class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md hidden" role="status" aria-live="polite">
                <p class="text-blue-900"></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Keyboard Navigation Demo -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Keyboard Navigation Patterns</h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold mb-2">Tab List Pattern (Arrow Keys)</h3>
              <div class="border border-gray-200 rounded-lg overflow-hidden" role="tablist" aria-label="Sample tabs">
                <div class="flex border-b border-gray-200">
                  <button class="tab-button flex-1 px-4 py-2 font-medium text-primary-600 bg-primary-50 border-b-2 border-primary-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500" role="tab" aria-selected="true" aria-controls="tab1-panel" id="tab1">
                    Tab 1
                  </button>
                  <button class="tab-button flex-1 px-4 py-2 font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500" role="tab" aria-selected="false" aria-controls="tab2-panel" id="tab2" tabindex="-1">
                    Tab 2
                  </button>
                  <button class="tab-button flex-1 px-4 py-2 font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500" role="tab" aria-selected="false" aria-controls="tab3-panel" id="tab3" tabindex="-1">
                    Tab 3
                  </button>
                </div>
                <div id="tab1-panel" role="tabpanel" aria-labelledby="tab1" class="p-4">
                  Content for Tab 1. Use arrow keys to navigate between tabs.
                </div>
                <div id="tab2-panel" role="tabpanel" aria-labelledby="tab2" class="p-4 hidden">
                  Content for Tab 2.
                </div>
                <div id="tab3-panel" role="tabpanel" aria-labelledby="tab3" class="p-4 hidden">
                  Content for Tab 3.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Screen Reader Only Content -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Screen Reader Only Content</h2>
          <p class="text-gray-700 mb-4">
            The <code class="px-2 py-1 bg-gray-100 rounded">.sr-only</code> class hides content visually but keeps it accessible to screen readers.
          </p>
          <div class="bg-gray-50 p-4 rounded">
            <button class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md focus:ring-4 focus:ring-red-300 transition-all">
              <svg class="inline w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span class="sr-only">Delete item</span>
            </button>
            <p class="text-sm text-gray-600 mt-2">
              This button shows only an icon visually, but screen readers will announce "Delete item"
            </p>
          </div>
        </div>
        
        <a href="#/" class="inline-block text-primary-500 hover:text-primary-600 font-medium">← Back to Home</a>
      </div>
    </section>
  `,
	script() {
		// Live region demo
		const notificationBtn = document.getElementById('notification-btn');
		const liveRegion = document.getElementById('live-region');
		if (notificationBtn && liveRegion) {
			notificationBtn.addEventListener('click', () => {
				const message = liveRegion.querySelector('p');
				message.textContent = 'Notification triggered! This announcement is read by screen readers.';
				liveRegion.classList.remove('hidden');

				setTimeout(() => {
					liveRegion.classList.add('hidden');
				}, 5000);
			});
		}

		// Tab pattern keyboard navigation
		const tabs = document.querySelectorAll('[role="tab"]');
		const tabPanels = document.querySelectorAll('[role="tabpanel"]');

		tabs.forEach((tab, index) => {
			tab.addEventListener('click', () => activateTab(index));
			tab.addEventListener('keydown', (e) => {
				let newIndex = index;

				if (e.key === 'ArrowRight') {
					e.preventDefault();
					newIndex = index + 1 >= tabs.length ? 0 : index + 1;
				} else if (e.key === 'ArrowLeft') {
					e.preventDefault();
					newIndex = index - 1 < 0 ? tabs.length - 1 : index - 1;
				} else if (e.key === 'Home') {
					e.preventDefault();
					newIndex = 0;
				} else if (e.key === 'End') {
					e.preventDefault();
					newIndex = tabs.length - 1;
				} else {
					return;
				}

				activateTab(newIndex);
				tabs[newIndex].focus();
			});
		});

		function activateTab(index) {
			tabs.forEach((t, i) => {
				const isSelected = i === index;
				t.setAttribute('aria-selected', isSelected);
				t.setAttribute('tabindex', isSelected ? '0' : '-1');
				t.classList.toggle('text-primary-600', isSelected);
				t.classList.toggle('bg-primary-50', isSelected);
				t.classList.toggle('border-b-2', isSelected);
				t.classList.toggle('border-primary-600', isSelected);
				t.classList.toggle('text-gray-600', !isSelected);

				tabPanels[i].classList.toggle('hidden', !isSelected);
			});
		}
	},
};
```

### Exercise 5.2: Register the Route

Add your accessibility showcase to the router:

```javascript
// src/views/index.js
import home from './home.js';
import about from './about.js';
import projects from './projects.js';
import contact from './contact.js';
import typography from './typography.js';
import components from './components.js';
import designTokens from './design-tokens.js';
import interactive from './interactive.js';
import contactForm from './contact-form.js';
import accessibility from './accessibility.js'; // Add this
import notFound from './404.js';

export const views = {
	'/': home,
	'/about': about,
	'/projects': projects,
	'/contact': contact,
	'/typography': typography,
	'/components': components,
	'/design-tokens': designTokens,
	'/interactive': interactive,
	'/contact-form': contactForm,
	'/accessibility': accessibility, // Add this
	404: notFound,
};
```

Add to navigation:

```html
<!-- index.html -->
<li><a href="#/accessibility" class="hover:text-blue-400 transition-colors">Accessibility</a></li>
```

**Commit your accessibility showcase:**

```bash
git add .
git commit -m "feat: S5 - Add accessibility features showcase route (WCAG AA compliance demo)"
```

### 🎨 Why This Route Matters

- **Living documentation:** Demonstrates accessibility features in action
- **Testing ground:** Try features with keyboard and screen readers
- **Client education:** Show stakeholders why accessibility matters
- **Portfolio piece:** Proves understanding of inclusive design
- **Reference guide:** Copy patterns to other routes

### 💡 Accessibility Testing Checklist

Use your `/accessibility` route to verify:

1. ✅ Tab through all interactive elements
2. ✅ Test with screen reader (VoiceOver, NVDA, JAWS)
3. ✅ Check color contrast with DevTools
4. ✅ Navigate using only keyboard
5. ✅ Test with browser zoom at 200%
6. ✅ Verify ARIA labels are meaningful
7. ✅ Check heading hierarchy
8. ✅ Run Lighthouse accessibility audit

## 🎓 Pedagogical Explanations

### Accessibility Auditing Methodology

**Systematic accessibility auditing** involves multiple perspectives:

**Automated testing:**

- **Lighthouse:** Performance, accessibility, SEO, PWA scores
- **axe-core:** Browser extension for detailed accessibility checks
- **WAVE:** Web accessibility evaluation tool

**Manual testing:**

- **Keyboard navigation:** Tab through all interactive elements
- **Screen reader testing:** Use NVDA/JAWS/VoiceOver
- **Color contrast:** Tools like WebAIM contrast checker
- **Focus management:** Ensure logical focus order and visible focus indicators

**User testing:**

- **Cognitive walkthroughs:** Step through tasks from user perspective
- **Assistive technology users:** Real-world testing with target audiences
- **Performance testing:** Test on slow connections and older devices

### Performance Optimization Strategies

**Core Web Vitals** measure real-world user experience:

- **LCP (Largest Contentful Paint):** Loading performance (< 2.5s)
- **FID (First Input Delay):** Interactivity (< 100ms)
- **CLS (Cumulative Layout Shift):** Visual stability (< 0.1)

**Tailwind-specific optimizations:**

- **CSS purging:** Automatically removes unused utility classes
- **Critical CSS:** Inline above-the-fold styles
- **Responsive images:** Use `srcset` and proper `alt` attributes
- **Font optimization:** Subset fonts and use `font-display: swap`

## Atelier Critical Questions

Following our **atelier methodology**, reflect on these questions:

### Exploration

- Which accessibility audit findings surprised you most about your interface?
- How did performance metrics change your understanding of "good enough" performance?

### Reflection

- Who is currently excluded by your design and performance choices, and how did you respond?
- Which performance optimizations had the biggest impact versus effort ratio?

### Conceptualization

- What is "enough" performance for your specific audience and use case?
- How do accessibility and performance relate to broader concepts of digital inclusion?

### Production

- Are your accessibility and performance improvements minimal yet impactful?
- How maintainable are your optimization patterns for future features?

### Exhibition

- How will you demonstrate before/after accessibility and performance improvements?
- What specific scenarios will you use to showcase inclusive design?

## Critical Prompts

### Reflection Prompts

- How does Tailwind's utility system change your approach to accessibility implementation?
- What is the relationship between visual design and cognitive accessibility?
- How can critical coding shape our understanding of digital inclusion and justice?
- How does your optimized interface represent your values as an inclusive designer?

### Ethics Prompts

- Whose needs are prioritized in your accessibility and performance decisions?
- How do your optimizations address or perpetuate digital divides?
- What happens when performance requirements conflict with accessibility needs?

### Technical Philosophy Prompts

- Is "accessible by default" achievable in utility-first systems, or does it require explicit consideration?
- How does performance optimization relate to sustainability and environmental impact?
- What does it mean to "design for the margins" in web performance and accessibility?

## 🏗️ Minimal Repo Scaffold

Here's a complete starting point for your accessibility and performance work:

```
a11y-performance-tailwind/
├── index.html
├── src/
│   ├── main.js
│   ├── a11y-audit.js
│   ├── performance-optimizer.js
│   └── style.css
├── lighthouse-report.html
└── tailwind.config.js
```

**src/a11y-audit.js:**

```javascript
// Accessibility audit utilities
class AccessibilityAuditor {
	constructor() {
		this.issues = [];
		this.init();
	}

	init() {
		// Check for common accessibility issues
		this.checkSkipLinks();
		this.checkHeadings();
		this.checkAltText();
		this.checkColorContrast();
		this.checkFocusManagement();
	}

	checkSkipLinks() {
		const skipLinks = document.querySelectorAll('a[href^="#"]:first-child');
		if (skipLinks.length === 0) {
			this.logIssue('Missing skip link for keyboard navigation');
		}
	}

	checkHeadings() {
		const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
		let previousLevel = 0;

		headings.forEach((heading, index) => {
			const level = parseInt(heading.tagName.charAt(1));

			if (index === 0 && level !== 1) {
				this.logIssue('First heading should be H1');
			}

			if (level > previousLevel + 1) {
				this.logIssue(`Heading level skip: ${previousLevel} to ${level}`);
			}

			previousLevel = level;
		});
	}

	checkAltText() {
		const images = document.querySelectorAll('img');
		images.forEach((img) => {
			if (!img.alt && !img.hasAttribute('aria-hidden')) {
				this.logIssue(`Image missing alt text: ${img.src}`);
			}
		});
	}

	checkColorContrast() {
		// This would integrate with a contrast checking library
		console.log('Color contrast check: Use WebAIM contrast checker or axe-core');
	}

	checkFocusManagement() {
		const focusableElements = document.querySelectorAll(
			'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
		);

		if (focusableElements.length === 0) {
			this.logIssue('No focusable elements found');
		}
	}

	logIssue(message) {
		this.issues.push(message);
		console.warn('A11y Issue:', message);
	}

	generateReport() {
		return {
			issues: this.issues,
			score: Math.max(0, 100 - this.issues.length * 10),
			recommendations: this.getRecommendations(),
		};
	}

	getRecommendations() {
		return [
			'Add skip links for keyboard users',
			'Ensure proper heading hierarchy (H1 → H2 → H3)',
			'Provide alt text for all meaningful images',
			'Test color contrast ratios (WCAG AA: 4.5:1)',
			'Verify focus order and visible focus indicators',
		];
	}
}

export default AccessibilityAuditor;
```

**src/performance-optimizer.js:**

```javascript
// Performance optimization utilities
class PerformanceOptimizer {
	constructor() {
		this.metrics = {};
		this.init();
	}

	init() {
		this.measureCoreWebVitals();
		this.optimizeImages();
		this.optimizeFonts();
		this.setupLazyLoading();
	}

	measureCoreWebVitals() {
		// Largest Contentful Paint
		new PerformanceObserver((list) => {
			const entries = list.getEntries();
			const lastEntry = entries[entries.length - 1];
			this.metrics.lcp = lastEntry.startTime;
			console.log('LCP:', this.metrics.lcp);
		}).observe({ entryTypes: ['largest-contentful-paint'] });

		// First Input Delay
		new PerformanceObserver((list) => {
			const entries = list.getEntries();
			entries.forEach((entry) => {
				this.metrics.fid = entry.processingStart - entry.startTime;
				console.log('FID:', this.metrics.fid);
			});
		}).observe({ entryTypes: ['first-input'] });

		// Cumulative Layout Shift
		new PerformanceObserver((list) => {
			let clsValue = 0;
			const entries = list.getEntries();

			entries.forEach((entry) => {
				if (!entry.hadRecentInput) {
					clsValue += entry.value;
				}
			});

			this.metrics.cls = clsValue;
			console.log('CLS:', this.metrics.cls);
		}).observe({ entryTypes: ['layout-shift'] });
	}

	optimizeImages() {
		const images = document.querySelectorAll('img[loading="lazy"]');

		if ('IntersectionObserver' in window) {
			const imageObserver = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target;
						img.src = img.dataset.src;
						imageObserver.unobserve(img);
					}
				});
			});

			images.forEach((img) => imageObserver.observe(img));
		}
	}

	optimizeFonts() {
		// Use font-display: swap for better performance
		const style = document.createElement('style');
		style.textContent = `
      @font-face {
        font-family: 'CustomFont';
        src: url('./fonts/custom.woff2') format('woff2');
        font-display: swap;
      }
    `;
		document.head.appendChild(style);
	}

	setupLazyLoading() {
		// Component lazy loading
		this.loadComponent = (componentName) => {
			return import(`./components/${componentName}.js`);
		};
	}

	generateReport() {
		return {
			metrics: this.metrics,
			recommendations: this.getRecommendations(),
			score: this.calculatePerformanceScore(),
		};
	}

	calculatePerformanceScore() {
		const { lcp = 0, fid = 0, cls = 0 } = this.metrics;

		// Simple scoring based on Core Web Vitals thresholds
		let score = 100;

		if (lcp > 2500) score -= 30;
		else if (lcp > 4000) score -= 50;

		if (fid > 100) score -= 20;
		else if (fid > 300) score -= 40;

		if (cls > 0.1) score -= 20;
		else if (cls > 0.25) score -= 40;

		return Math.max(0, score);
	}

	getRecommendations() {
		return [
			'Implement lazy loading for images below the fold',
			'Use font-display: swap for web fonts',
			'Minimize and compress CSS/JS bundles',
			'Implement service worker for caching',
			'Optimize images (WebP format, proper sizing)',
		];
	}
}

export default PerformanceOptimizer;
```

## References

- [WebAIM - Accessibility guidelines](https://webaim.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN - Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Google - Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse documentation](https://developers.google.com/web/tools/lighthouse)

---

> **Next:** [S6 - Build & Deploy →]({{ '/lessons/en/tailwind/build-deploy/' | relative_url }})