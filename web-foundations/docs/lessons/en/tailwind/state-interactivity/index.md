---
layout: lesson
title: 'Tailwind CSS: State & Interactivity — Modifiers that bring UI to life'
title_alt: 'Tailwind CSS: State & Interactivity — Modifiers that bring UI to life'
slug: state-interactivity
date: 2025-11-03
updated: 2025-11-03
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/tailwind/state-interactivity/
description: 'Atelier on interactivity with Tailwind: hover, focus, active, disabled, group, peer, aria and dark mode. Quick prototyping applied to your portfolio.'
tags: [tailwindcss, interactivity, states, modifiers, pedagogy]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# State & Interactivity — Modifiers that bring UI to life

## Atelier Rationale: prototype first, refine later

- Prioritize **quick prototyping**: copy functional patterns, adjust tokens.
- We teach interactivity without a framework, avoiding unnecessary complexity.
- Apply immediately in your portfolio `[portafolio-tailwind](https://github.com/ruvebal/portafolio-tailwind)` enriching `views/*`.

## Interactive Demo

> **[Open Demo →](demo/)**

Sections include embedded iframes. Interact, inspect, and replicate.

---

## 1) Essential states: hover, focus, active, disabled

- **hover:** visual feedback on pointer hover.
- **focus / focus-visible:** keyboard-accessible; use `focus-visible:` to avoid mouse rings.
- **active:** immediate feedback during press.
- **disabled:** communicates waiting or temporary lock.

<iframe src="demo/buttons-states.html" title="Buttons: states" style="width: 100%; height: 420px; border: 1px solid #e5e7eb; border-radius: 0.5rem;" loading="lazy"></iframe>

---

## 2) Forms that guide: focus-visible and focus-within

- `focus-visible:` shows rings for keyboard only (better UX).
- `focus-within:` highlights the container when any child is focused.

<iframe src="demo/forms-focus.html" title="Forms & focus" style="width: 100%; height: 420px; border: 1px solid #e5e7eb; border-radius: 0.5rem;" loading="lazy"></iframe>

---

## 3) Parent ↔ Child: group and peer

- `group-hover:` triggers overlays/actions inside cards.
- `peer-checked:` show/hide content based on a sibling input state.

<iframe src="demo/group-peer.html" title="group & peer" style="width: 100%; height: 520px; border: 1px solid #e5e7eb; border-radius: 0.5rem;" loading="lazy"></iframe>

---

## 4) Stacking modifiers: responsive, dark, aria-*, data-*

- Combine variants: `dark:md:hover:` for contextual changes.
- Use `aria-[expanded]` and `data-[state]` for semantic UI states.

<iframe src="demo/stacked-modifiers.html" title="Stacked modifiers" style="width: 100%; height: 520px; border: 1px solid #e5e7eb; border-radius: 0.5rem;" loading="lazy"></iframe>

---

## 🛠️ Apply to your portfolio (`views/*`)

Work in your repository `[portafolio-tailwind](https://github.com/ruvebal/portafolio-tailwind)`:

1) **Navigation**

- In `views/*`, add `hover:underline` and `focus-visible:ring-2 focus-visible:ring-primary-500` to links.
- Mark the active link with `aria-current="page"` and style `[aria-current="page"]:text-primary-600`.

2) **Project cards**

- Wrap each card in `.group` and reveal overlays using `group-hover:opacity-100`.
- Add `active:scale-95` to buttons for instant feedback.

3) **Forms**

- Use `focus-within:` on field containers.
- Disable the submit button during async operations (`disabled:*` + `pointer-events-none`).

4) **Accessibility**

- Ensure clear `:focus-visible` on all interactive controls.
- Wire up `aria-[expanded]` for menus/accordions and respond visually.

### Checklist

- [ ] Links with consistent `hover:` and `focus-visible:`
- [ ] Card overlays with `group-hover:`
- [ ] Buttons with `active:` and `disabled:` during loading
- [ ] Forms with `focus-within:`
- [ ] Accordions/menus styled via `aria-[expanded]`

---

## References

- Tailwind — Handling Hover, Focus, and Other States: `[v3.tailwindcss.com/docs/hover-focus-and-other-states](https://v3.tailwindcss.com/docs/hover-focus-and-other-states)`

---

> **Next:** [Components & Design System →]({{ '/lessons/en/tailwind/components-design-system/' | relative_url }})

---
layout: lesson
title: 'Tailwind CSS: State & Interactivity — Building Dynamic User Experiences'
title_alt: 'Tailwind CSS: State & Interactivity — Building Dynamic User Experiences'
slug: tailwind-state-interactivity
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/tailwind/state-interactivity/
description: 'Complete guide to implementing state management and interactive features with Tailwind CSS, including forms, validation, and accessibility.'
tags: [tailwindcss, interactivity, state, forms, accessibility, pedagogy]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Tailwind CSS: State & Interactivity — Building Dynamic User Experiences

> **AI Assistance Disclosure:** This lesson draws from classroom experience since September 2024, with AI iterations following research–practice–research cycles.

## 🎭 Critical Coding Approach

This lesson follows the **atelier methodology** (exploration → reflection → conceptualization → production → exhibition). We build not to automate, but to **articulate** — giving form to thought through rhythm, reflection, and resistance.

- **Exploration:** Creating interactive states and user feedback systems.
- **Reflection:** Understanding how interactivity shapes user experience.
- **Conceptualization:** Connecting state management to design ethics and accessibility.
- **Production:** Building performant, accessible interactive components.
- **Exhibition:** Demonstrating fluid, responsive user interactions.

## Prerequisites

<div class="prerequisites">
  <h3>📚 Before Starting</h3>
  <ul>
    <li><strong>Completed S1–S3:</strong> Vite + Tailwind setup, SPA routing, and component system</li>
    <li><strong>JavaScript fundamentals:</strong> DOM events, form handling, basic state management</li>
    <li><strong>Tailwind utilities:</strong> Experience with hover, focus, and state variants</li>
    <li><strong>Accessibility basics:</strong> Understanding of ARIA and keyboard navigation</li>
  </ul>
</div>

## 🚀 Interactivity: Beyond Static Interfaces

**Interactive state** transforms static designs into living systems that respond to user actions. In Tailwind, we express interactivity through:

- **State variants:** `hover:`, `focus:`, `active:`, `disabled:`
- **Form states:** `valid:`, `invalid:`, `checked:`, `required:`
- **Animation utilities:** `transition-`, `duration-`, `ease-`
- **JavaScript integration:** Event handling and DOM manipulation

Our approach creates **PWA-ready interactivity** with progressive enhancement and accessibility-first design.

## S4 — State & Interactivity (Forms, Navigation, Feedback)

This session adds dynamic behavior to components, focusing on forms, navigation states, and user feedback systems.

### 🔗 Building on S2-S3 Routing System

In S2, you created a modular routing system, and in S3, you enhanced it with a design system. Now we'll add **interactive routes** that demonstrate state management and form validation. You should already have:

- Modular view structure in `src/views/`
- Router handling hash-based navigation
- Design tokens for consistent styling
- Component patterns from S3

**This session focuses on adding interactivity** to your existing routes and creating new interactive demonstrations.

### Step-by-Step Implementation

1. **Create accessible contact form:**

   ```html
   <!-- Contact form with proper labeling and validation -->
   <form class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md" novalidate>
   	<div class="mb-6">
   		<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
   			Full Name
   			<span class="text-red-500" aria-label="required">*</span>
   		</label>
   		<input
   			type="text"
   			id="name"
   			name="name"
   			required
   			class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent invalid:border-red-500 invalid:ring-red-500"
   			aria-describedby="name-error" />
   		<div id="name-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
   	</div>

   	<div class="mb-6">
   		<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
   			Email Address
   			<span class="text-red-500" aria-label="required">*</span>
   		</label>
   		<input
   			type="email"
   			id="email"
   			name="email"
   			required
   			class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent invalid:border-red-500 invalid:ring-red-500"
   			aria-describedby="email-error" />
   		<div id="email-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
   	</div>

   	<div class="mb-6">
   		<label for="message" class="block text-sm font-medium text-gray-700 mb-2">
   			Message
   			<span class="text-red-500" aria-label="required">*</span>
   		</label>
   		<textarea
   			id="message"
   			name="message"
   			rows="4"
   			required
   			class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent invalid:border-red-500 invalid:ring-red-500 resize-none"
   			aria-describedby="message-error"></textarea>
   		<div id="message-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
   	</div>

   	<button
   		type="submit"
   		class="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
   		Send Message
   	</button>
   </form>
   ```

2. **Implement form validation with JavaScript:**

   ```javascript
   // src/form-validation.js
   class FormValidator {
   	constructor(form) {
   		this.form = form;
   		this.fields = form.querySelectorAll('input, textarea, select');
   		this.errors = new Map();

   		this.init();
   	}

   	init() {
   		// Real-time validation on input
   		this.fields.forEach((field) => {
   			field.addEventListener('blur', () => this.validateField(field));
   			field.addEventListener('input', () => this.clearFieldError(field));
   		});

   		// Form submission
   		this.form.addEventListener('submit', (e) => this.handleSubmit(e));
   	}

   	validateField(field) {
   		const value = field.value.trim();
   		const errorElement = document.getElementById(`${field.name}-error`);

   		// Clear previous error
   		this.clearFieldError(field);

   		// Validation rules
   		if (field.hasAttribute('required') && !value) {
   			this.showFieldError(field, 'This field is required');
   			return false;
   		}

   		if (field.type === 'email' && value) {
   			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   			if (!emailRegex.test(value)) {
   				this.showFieldError(field, 'Please enter a valid email address');
   				return false;
   			}
   		}

   		return true;
   	}

   	showFieldError(field, message) {
   		const errorElement = document.getElementById(`${field.name}-error`);
   		if (errorElement) {
   			errorElement.textContent = message;
   			errorElement.classList.remove('hidden');
   			field.classList.add('invalid');
   			field.setAttribute('aria-invalid', 'true');
   			field.setAttribute('aria-describedby', `${field.name}-error`);
   		}
   	}

   	clearFieldError(field) {
   		const errorElement = document.getElementById(`${field.name}-error`);
   		if (errorElement) {
   			errorElement.classList.add('hidden');
   			field.classList.remove('invalid');
   			field.removeAttribute('aria-invalid');
   		}
   	}

   	handleSubmit(e) {
   		e.preventDefault();

   		let isValid = true;
   		this.fields.forEach((field) => {
   			if (!this.validateField(field)) {
   				isValid = false;
   			}
   		});

   		if (isValid) {
   			// Simulate form submission
   			const submitBtn = this.form.querySelector('button[type="submit"]');
   			const originalText = submitBtn.textContent;

   			submitBtn.textContent = 'Sending...';
   			submitBtn.disabled = true;

   			setTimeout(() => {
   				alert('Message sent successfully!');
   				this.form.reset();
   				submitBtn.textContent = originalText;
   				submitBtn.disabled = false;
   			}, 1000);
   		}
   	}
   }

   export default FormValidator;
   ```

3. **Enhance navigation with active states:**

   ```html
   <!-- Enhanced navigation with active states -->
   <nav class="bg-gray-900 text-white" role="navigation" aria-label="Main navigation">
   	<div class="container mx-auto px-4">
   		<div class="flex justify-between items-center py-4">
   			<a href="#/" class="text-xl font-bold hover:text-blue-400 transition-colors">Portfolio</a>
   			<div class="space-x-6">
   				<a href="#/" class="nav-link hover:text-blue-400 transition-colors" data-route="/">Home</a>
   				<a href="#/about" class="nav-link hover:text-blue-400 transition-colors" data-route="/about">About</a>
   				<a href="#/projects" class="nav-link hover:text-blue-400 transition-colors" data-route="/projects">Projects</a>
   				<a href="#/contact" class="nav-link hover:text-blue-400 transition-colors" data-route="/contact">Contact</a>
   			</div>
   		</div>
   	</div>
   </nav>
   ```

4. **Add navigation state management:**

   ```javascript
   // src/navigation.js
   class NavigationManager {
   	constructor() {
   		this.navLinks = document.querySelectorAll('.nav-link');
   		this.init();
   	}

   	init() {
   		// Update active state on route change
   		window.addEventListener('hashchange', () => this.updateActiveState());
   		window.addEventListener('load', () => this.updateActiveState());

   		// Add click handlers for smooth scrolling
   		this.navLinks.forEach((link) => {
   			link.addEventListener('click', (e) => this.handleNavClick(e));
   		});
   	}

   	updateActiveState() {
   		const currentHash = window.location.hash.slice(1) || '/';

   		this.navLinks.forEach((link) => {
   			const route = link.getAttribute('data-route');

   			if (route === currentHash) {
   				link.classList.add('text-blue-400', 'font-semibold');
   				link.setAttribute('aria-current', 'page');
   			} else {
   				link.classList.remove('text-blue-400', 'font-semibold');
   				link.removeAttribute('aria-current');
   			}
   		});
   	}

   	handleNavClick(e) {
   		// Optional: Add smooth scrolling for anchor links
   		const href = e.target.getAttribute('href');
   		if (href && href.startsWith('#') && href.length > 1) {
   			e.preventDefault();
   			const target = document.querySelector(href);
   			if (target) {
   				target.scrollIntoView({
   					behavior: 'smooth',
   					block: 'start',
   				});
   			}
   		}
   	}
   }

   export default NavigationManager;
   ```

5. **Add reduced motion support:**

   ```css
   /* src/style.css - Add to existing styles */
   @media (prefers-reduced-motion: reduce) {
   	* {
   		animation-duration: 0.01ms !important;
   		animation-iteration-count: 1 !important;
   		transition-duration: 0.01ms !important;
   	}
   }
   ```

6. **Test interactive features:**

   - Fill out form and test validation
   - Navigate between routes and verify active states
   - Test keyboard navigation and focus management
   - Verify reduced motion preferences are respected

7. **Commit your interactive features:**
   ```bash
   git add .
   git commit -m "feat: S4 - Form validation + interactive navigation (accessible states)"
   ```

## 🎯 Practice Exercises: Building Interactive Routes

Now let's create dedicated routes to practice state management and interactivity, continuing our modular routing approach.

### Exercise 4.1: Create Interactive Showcase Route

Build a route demonstrating various interactive states:

```javascript
// src/views/interactive.js
export default {
	template: `
    <section class="py-16 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 max-w-4xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">Interactive States Showcase</h1>
        
        <!-- Button States Demo -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Button States</h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Hover & Focus States</h3>
              <button class="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-white font-medium py-2 px-4 rounded-md transition-colors">
                Hover & Click Me
              </button>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Loading State</h3>
              <button id="loading-btn" class="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                Click to Load
              </button>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Disabled State</h3>
              <button disabled class="bg-gray-400 text-white font-medium py-2 px-4 rounded-md cursor-not-allowed opacity-50">
                Disabled Button
              </button>
            </div>
          </div>
        </div>

        <!-- Toggle & Checkbox States -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Toggle & Selection States</h2>
          
          <div class="space-y-4">
            <label class="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" class="w-5 h-5 text-primary-500 rounded focus:ring-2 focus:ring-primary-500" />
              <span class="text-gray-700">Enable notifications</span>
            </label>
            
            <label class="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" checked class="w-5 h-5 text-primary-500 rounded focus:ring-2 focus:ring-primary-500" />
              <span class="text-gray-700">Receive updates</span>
            </label>
            
            <div class="flex items-center space-x-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="theme" value="light" class="w-4 h-4 text-primary-500 focus:ring-2 focus:ring-primary-500" checked />
                <span class="text-gray-700">Light Mode</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="theme" value="dark" class="w-4 h-4 text-primary-500 focus:ring-2 focus:ring-primary-500" />
                <span class="text-gray-700">Dark Mode</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Dropdown/Accordion State -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Accordion State</h2>
          
          <div class="space-y-2">
            <div class="border border-gray-200 rounded-lg">
              <button class="accordion-trigger w-full text-left px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg transition-colors">
                What is Tailwind CSS?
              </button>
              <div class="accordion-content hidden px-4 pb-3 text-gray-600">
                Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.
              </div>
            </div>
            
            <div class="border border-gray-200 rounded-lg">
              <button class="accordion-trigger w-full text-left px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg transition-colors">
                How does state management work?
              </button>
              <div class="accordion-content hidden px-4 pb-3 text-gray-600">
                State management tracks the current condition of UI elements and updates them based on user interactions.
              </div>
            </div>
          </div>
        </div>

        <!-- Toast Notification Demo -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Notification States</h2>
          <button id="show-toast" class="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
            Show Notification
          </button>
          <div id="toast-container" class="fixed bottom-4 right-4 space-y-2 z-50"></div>
        </div>
        
        <a href="#/" class="inline-block text-primary-500 hover:text-primary-600 font-medium">← Back to Home</a>
      </div>
    </section>
  `,
	script() {
		// Loading button
		const loadingBtn = document.getElementById('loading-btn');
		if (loadingBtn) {
			loadingBtn.addEventListener('click', () => {
				loadingBtn.textContent = 'Loading...';
				loadingBtn.disabled = true;
				setTimeout(() => {
					loadingBtn.textContent = 'Success!';
					loadingBtn.classList.add('bg-green-500');
					setTimeout(() => {
						loadingBtn.textContent = 'Click to Load';
						loadingBtn.disabled = false;
						loadingBtn.classList.remove('bg-green-500');
					}, 1500);
				}, 2000);
			});
		}

		// Accordion functionality
		document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
			trigger.addEventListener('click', () => {
				const content = trigger.nextElementSibling;
				content.classList.toggle('hidden');
			});
		});

		// Toast notification
		const showToastBtn = document.getElementById('show-toast');
		const toastContainer = document.getElementById('toast-container');
		if (showToastBtn && toastContainer) {
			showToastBtn.addEventListener('click', () => {
				const toast = document.createElement('div');
				toast.className =
					'bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg transform transition-transform duration-300';
				toast.textContent = 'Action completed successfully!';
				toastContainer.appendChild(toast);

				setTimeout(() => {
					toast.style.transform = 'translateX(400px)';
					setTimeout(() => toast.remove(), 300);
				}, 3000);
			});
		}
	},
};
```

### Exercise 4.2: Create Contact Form Route

Build a complete contact form with validation:

```javascript
// src/views/contact-form.js
export default {
	template: `
    <section class="py-16 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div class="container mx-auto px-4 max-w-2xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-4 text-center">Contact Us</h1>
        <p class="text-lg text-gray-600 mb-8 text-center">Fill out the form below and we'll get back to you soon.</p>
        
        <form id="contact-form" class="bg-white rounded-lg shadow-lg p-8" novalidate>
          <!-- Name Field -->
          <div class="mb-6">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="John Doe"
              aria-describedby="name-error"
            />
            <div id="name-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
          </div>

          <!-- Email Field -->
          <div class="mb-6">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span class="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="john@example.com"
              aria-describedby="email-error"
            />
            <div id="email-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
          </div>

          <!-- Subject Field -->
          <div class="mb-6">
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
              Subject <span class="text-red-500">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              aria-describedby="subject-error"
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
            <div id="subject-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
          </div>

          <!-- Message Field -->
          <div class="mb-6">
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              Message <span class="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-colors"
              placeholder="Tell us how we can help..."
              aria-describedby="message-error"
            ></textarea>
            <div id="message-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
          </div>

          <!-- Privacy Checkbox -->
          <div class="mb-6">
            <label class="flex items-start space-x-3">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                required
                class="mt-1 w-4 h-4 text-primary-500 rounded focus:ring-2 focus:ring-primary-500"
                aria-describedby="privacy-error"
              />
              <span class="text-sm text-gray-700">
                I agree to the privacy policy and terms of service <span class="text-red-500">*</span>
              </span>
            </label>
            <div id="privacy-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Send Message
          </button>

          <!-- Success Message -->
          <div id="success-message" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700 hidden" role="status">
            ✓ Message sent successfully! We'll get back to you soon.
          </div>
        </form>
        
        <a href="#/" class="inline-block mt-8 text-primary-500 hover:text-primary-600 font-medium">← Back to Home</a>
      </div>
    </section>
  `,
	script() {
		const form = document.getElementById('contact-form');
		if (!form) return;

		const fields = form.querySelectorAll('input, textarea, select');
		const successMessage = document.getElementById('success-message');

		// Validation functions
		const validateField = (field) => {
			const value = field.value.trim();
			const errorElement = document.getElementById(`${field.name}-error`);

			// Clear previous error
			field.classList.remove('border-red-500');
			errorElement?.classList.add('hidden');
			field.removeAttribute('aria-invalid');

			// Required validation
			if (field.hasAttribute('required') && !value) {
				showError(field, errorElement, 'This field is required');
				return false;
			}

			// Email validation
			if (field.type === 'email' && value) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) {
					showError(field, errorElement, 'Please enter a valid email address');
					return false;
				}
			}

			// Checkbox validation
			if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
				showError(field, errorElement, 'You must agree to continue');
				return false;
			}

			return true;
		};

		const showError = (field, errorElement, message) => {
			field.classList.add('border-red-500');
			field.setAttribute('aria-invalid', 'true');
			if (errorElement) {
				errorElement.textContent = message;
				errorElement.classList.remove('hidden');
			}
		};

		// Real-time validation
		fields.forEach((field) => {
			field.addEventListener('blur', () => validateField(field));
			field.addEventListener('input', () => {
				const errorElement = document.getElementById(`${field.name}-error`);
				field.classList.remove('border-red-500');
				errorElement?.classList.add('hidden');
			});
		});

		// Form submission
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let isValid = true;
			fields.forEach((field) => {
				if (!validateField(field)) {
					isValid = false;
				}
			});

			if (isValid) {
				const submitBtn = form.querySelector('button[type="submit"]');
				submitBtn.textContent = 'Sending...';
				submitBtn.disabled = true;

				// Simulate API call
				setTimeout(() => {
					successMessage.classList.remove('hidden');
					form.reset();
					submitBtn.textContent = 'Send Message';
					submitBtn.disabled = false;

					// Hide success message after 5 seconds
					setTimeout(() => {
						successMessage.classList.add('hidden');
					}, 5000);
				}, 1500);
			} else {
				// Focus first invalid field
				const firstInvalid = form.querySelector('[aria-invalid="true"]');
				firstInvalid?.focus();
			}
		});
	},
};
```

### Exercise 4.3: Register New Routes

Add your new interactive routes to the router:

```javascript
// src/views/index.js
import home from './home.js';
import about from './about.js';
import projects from './projects.js';
import contact from './contact.js';
import typography from './typography.js';
import components from './components.js';
import designTokens from './design-tokens.js';
import interactive from './interactive.js'; // Add this
import contactForm from './contact-form.js'; // Add this
import notFound from './404.js';

export const views = {
	'/': home,
	'/about': about,
	'/projects': projects,
	'/contact': contact,
	'/typography': typography,
	'/components': components,
	'/design-tokens': designTokens,
	'/interactive': interactive, // Add this
	'/contact-form': contactForm, // Add this
	404: notFound,
};
```

Update navigation:

```html
<!-- index.html -->
<li><a href="#/interactive" class="hover:text-blue-400 transition-colors">Interactive</a></li>
<li><a href="#/contact-form" class="hover:text-blue-400 transition-colors">Contact Form</a></li>
```

**Commit your interactive routes:**

```bash
git add .
git commit -m "feat: S4 - Add interactive showcase and contact form routes"
```

### 🎨 Why This Approach Works

- **Isolated testing:** Each interactive pattern in its own demonstration
- **Real-world practice:** Contact form is a common client requirement
- **Progressive complexity:** From simple button states to complex form validation
- **Reusable patterns:** Copy interaction patterns to other routes
- **Portfolio building:** Demonstrates UX and accessibility skills

### 💡 Challenge Exercise

Create a route `src/views/cart.js` that implements:

1. Add/remove items with state management
2. Real-time total calculation
3. Quantity increment/decrement buttons
4. Empty state handling

This demonstrates e-commerce interaction patterns!

## 🎓 Pedagogical Explanations

### State Management in Interactive Design

**State** represents the current condition of UI elements and user interactions. Effective state management requires:

**Visual feedback:**

- **Hover states:** Preview interactions before commitment
- **Focus states:** Clear indication of keyboard navigation
- **Loading states:** Communicate system status during operations
- **Error states:** Guide users toward resolution

**Accessibility considerations:**

- **ARIA live regions:** Announce dynamic content changes
- **Form validation:** Associate errors with inputs using `aria-describedby`
- **Keyboard navigation:** Ensure all interactive elements are focusable
- **Screen reader support:** Provide context for state changes

### Progressive Enhancement vs. Graceful Degradation

**Progressive enhancement** builds core functionality first, then adds enhancements:

1. **Semantic HTML:** Works without CSS or JavaScript
2. **CSS enhancement:** Visual improvements and responsive behavior
3. **JavaScript enhancement:** Interactive features and dynamic content

**Graceful degradation** starts with full features and removes them for older browsers.

## Atelier Critical Questions

Following our **atelier methodology**, reflect on these questions:

### Exploration

- What interactive features improved task completion rates in your testing?
- How did different state variants affect user understanding of available actions?

### Reflection

- Did any animations or transitions hinder users who prefer reduced motion?
- Which state feedback mechanisms were most intuitive versus confusing?

### Conceptualization

- How do interactive states, user feedback, and affordances shape overall UX?
- In what ways does state management embody "responsive design" principles?

### Production

- Is your interactivity testable and progressively enhanced for different capabilities?
- How maintainable are your state management patterns for future features?

### Exhibition

- What specific interaction scenario will you demo to evidence usability improvements?
- How will you test interactive features across different devices and assistive technologies?

## Critical Prompts

### Reflection Prompts

- How does Tailwind's state system change your approach to interactive design?
- What is the relationship between visual feedback and user cognition?
- How can critical coding shape our understanding of digital interaction design?
- How does your interactive system represent your philosophy as a designer-developer?

### Ethics Prompts

- Whose interaction patterns are prioritized in your state management choices?
- How do your animations and transitions respect user accessibility preferences?
- What happens when interactive complexity excludes certain user groups?

### Technical Philosophy Prompts

- Is state-driven UI more "declarative" or "imperative" than traditional approaches?
- How does component state relate to programming paradigms like reactive programming?
- What does it mean to "design for interaction" in a utility-first system?

## 🏗️ Minimal Repo Scaffold

Here's a complete starting point for your interactive components:

```
interactive-tailwind/
├── index.html
├── src/
│   ├── main.js
│   ├── form-validation.js
│   ├── navigation.js
│   └── style.css
└── tailwind.config.js
```

**src/form-validation.js:**

```javascript
// Form validation with accessibility
class AccessibleFormValidator {
	constructor(form) {
		this.form = form;
		this.init();
	}

	init() {
		this.form.addEventListener('submit', (e) => this.handleSubmit(e));

		// Real-time validation
		this.form.querySelectorAll('input, textarea').forEach((field) => {
			field.addEventListener('blur', () => this.validateField(field));
			field.addEventListener('input', () => this.clearError(field));
		});
	}

	validateField(field) {
		const value = field.value.trim();
		const errorId = `${field.name}-error`;
		const errorElement = document.getElementById(errorId);

		if (field.required && !value) {
			this.showError(field, errorId, 'This field is required');
			return false;
		}

		if (field.type === 'email' && value && !this.isValidEmail(value)) {
			this.showError(field, errorId, 'Please enter a valid email');
			return false;
		}

		return true;
	}

	showError(field, errorId, message) {
		field.classList.add('border-red-500');
		field.setAttribute('aria-invalid', 'true');
		field.setAttribute('aria-describedby', errorId);

		const errorElement = document.getElementById(errorId);
		if (errorElement) {
			errorElement.textContent = message;
			errorElement.classList.remove('hidden');
		}
	}

	clearError(field) {
		field.classList.remove('border-red-500');
		field.removeAttribute('aria-invalid');
	}

	isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	handleSubmit(e) {
		e.preventDefault();

		if (Array.from(this.form.querySelectorAll('input, textarea')).every((field) => this.validateField(field))) {
			// Simulate submission
			console.log('Form submitted successfully');
		}
	}
}
```

## References

- [MDN - Form accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms/Basic_form_hints)
- [WebAIM - Form validation](https://webaim.org/techniques/formvalidation/)
- [Tailwind - State variants](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)

---

> **Next:** [S5 - Accessibility & Performance →]({{ '/lessons/en/tailwind/accessibility-performance/' | relative_url }})