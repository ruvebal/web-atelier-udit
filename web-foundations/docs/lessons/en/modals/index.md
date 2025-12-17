---
layout: lesson
title: 'Modals & Navigation Patterns – New Page vs. Modal Dialogs'
title_alt: 'Modales y Patrones de Navegación – Nueva Página vs. Diálogos Modales'
slug: modals
date: 2025-12-17
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/modals/
tags: [modals, dialog, accessibility, css, javascript, ux, navigation]
description: 'A critical exploration of when to use modals vs. new pages, with implementations in pure CSS and vanilla JavaScript. Learn to build accessible, user-centered interfaces.'
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

## ⏰ Estimated Duration

90 minutes (1 session + practice)

## 🎯 Learning Objectives

By the end of this lesson, you will be able to:

- **Understand** when to use modals vs. new pages from a UX perspective
- **Implement** accessible modals using pure CSS (`:target` selector)
- **Build** vanilla JavaScript modals with proper ARIA attributes and keyboard navigation
- **Master** the native HTML `<dialog>` element for modern browsers
- **Apply** these patterns to project card grids in portfolios
- **Evaluate** trade-offs in different approaches based on context

---

## 🎭 The Question: New Page or Modal?

> _"The best interface is no interface."_
> — The Tao of Development (ux-002)

Your students ask an excellent question: When users click on project cards in a portfolio grid, should they:

1. **Navigate to a new page** with full project details?
2. **Open a modal** that overlays the current page?

The answer, like most in design, is: **it depends**.

---

## 🧭 Part I: UX Design Considerations

### When to Use a New Page

| Scenario                | Reasoning                                                 |
| ----------------------- | --------------------------------------------------------- |
| **Complex content**     | Project has multiple sections, images, videos, case study |
| **Deep linking needed** | Users want to bookmark or share specific projects         |
| **SEO matters**         | Each project needs its own URL for indexing               |
| **Mobile context**      | Full-screen experiences work better on small screens      |
| **User expectation**    | Portfolio visitors expect project pages                   |

**Best for:** Case studies, detailed project breakdowns, content-heavy presentations.

### When to Use a Modal

| Scenario                   | Reasoning                                    |
| -------------------------- | -------------------------------------------- |
| **Quick preview**          | Users want to glance without losing context  |
| **Confirmation dialogs**   | "Are you sure?" before destructive actions   |
| **Forms & inputs**         | Newsletter signup, contact forms, login      |
| **Lightbox galleries**     | Image/video zoom while preserving page state |
| **Temporary interactions** | Settings, filters, quick actions             |

**Best for:** Previews, quick actions, supplementary content that doesn't warrant its own URL.

### The Middle Path: Progressive Enhancement

> _"Design is not just what it looks like and feels like. Design is how it works."_
> — The Tao of Development (ux-003)

Consider a **hybrid approach**:

1. Modal for quick preview on grid
2. "View Full Project →" link inside modal leads to dedicated page
3. Both paths serve different user intents

---

## 📖 Part II: Implementing Modals

We'll explore four approaches, from simplest to most robust:

1. **CSS-only** (`:target` selector) – No JavaScript required
2. **Vanilla JavaScript** – Full control, accessibility-first
3. **Native `<dialog>`** – Browser-native, modern API
4. **Project Grid Pattern** – Real-world portfolio application

---

### 🎨 Approach 1: CSS-Only Modal (`:target`)

**📂 Demo:** [demo/01-css-modal.html](./demo/01-css-modal.html)

The `:target` pseudo-class matches an element whose `id` matches the URL fragment (the part after `#`).

```
┌──────────────────┐      ┌─────────────────┐      ┌──────────────────┐
│  Click Link      │ ────▶│  URL Changes    │ ────▶│  :target Matches │
│  href="#modal"   │      │  page.html#modal│      │  Modal Visible   │
└──────────────────┘      └─────────────────┘      └──────────────────┘
```

#### How It Works

```html
<!-- Trigger -->
<a href="#project-modal">View Project</a>

<!-- Modal Structure -->
<div id="project-modal" class="modal">
	<div class="modal__backdrop">
		<div class="modal__content">
			<h2>Project Title</h2>
			<p>Project description...</p>
			<a href="#" class="modal__close">Close</a>
		</div>
	</div>
</div>
```

```css
/* Hidden by default */
.modal {
	opacity: 0;
	visibility: hidden;
	position: fixed;
	inset: 0;
	transition: opacity 0.3s ease, visibility 0.3s ease;
}

/* Visible when targeted */
.modal:target {
	opacity: 1;
	visibility: visible;
}

/* Backdrop */
.modal__backdrop {
	position: absolute;
	inset: 0;
	background: rgba(0, 0, 0, 0.7);
	display: grid;
	place-items: center;
}

/* Content panel */
.modal__content {
	background: white;
	padding: 2rem;
	border-radius: 1rem;
	max-width: 90vw;
	max-height: 90vh;
	overflow: auto;
}
```

#### Pros & Cons

| ✅ Pros                           | ❌ Cons                        |
| --------------------------------- | ------------------------------ |
| Zero JavaScript                   | No keyboard trap (Tab escapes) |
| Works without JS enabled          | No Escape key to close         |
| URL reflects state (bookmarkable) | History gets cluttered         |
| Simple to implement               | No focus management            |
| Progressive enhancement           | Accessibility limitations      |

> _"Simplicity is prerequisite for reliability."_
> — The Tao of Development (cc-008)

**Use when:** Lightweight previews, image lightboxes, progressive enhancement base.

---

### 🔧 Approach 2: Vanilla JavaScript Modal

**📂 Demo:** [demo/02-vanilla-modal.html](./demo/02-vanilla-modal.html)

For full accessibility, JavaScript is necessary. The key requirements:

1. **Focus trap** – Tab stays inside modal
2. **Escape to close** – Standard keyboard behavior
3. **ARIA attributes** – Screen reader announcements
4. **Return focus** – When closed, focus returns to trigger
5. **Backdrop close** – Click outside to dismiss

#### ARIA Attributes for Modals

```html
<div
	id="modal"
	role="dialog"
	aria-modal="true"
	aria-labelledby="modal-title"
	aria-describedby="modal-description"
	hidden>
	<h2 id="modal-title">Project Title</h2>
	<p id="modal-description">Description...</p>
	<button class="modal-close" aria-label="Close modal">×</button>
</div>
```

| Attribute           | Purpose                           |
| ------------------- | --------------------------------- |
| `role="dialog"`     | Identifies as modal dialog        |
| `aria-modal="true"` | Indicates content behind is inert |
| `aria-labelledby`   | Points to visible title           |
| `aria-describedby`  | Points to description (optional)  |
| `aria-label`        | For icon-only close button        |

#### JavaScript Implementation

```javascript
class Modal {
	constructor(element) {
		this.modal = element;
		this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
		this.firstFocusable = null;
		this.lastFocusable = null;
		this.previouslyFocused = null;

		this.handleKeydown = this.handleKeydown.bind(this);
		this.handleBackdropClick = this.handleBackdropClick.bind(this);
	}

	open(trigger) {
		// Store the element that triggered the modal
		this.previouslyFocused = trigger || document.activeElement;

		// Show modal
		this.modal.hidden = false;
		this.modal.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';

		// Setup focus trap
		this.setupFocusTrap();

		// Add event listeners
		document.addEventListener('keydown', this.handleKeydown);
		this.modal.addEventListener('click', this.handleBackdropClick);

		// Move focus to first focusable element
		this.firstFocusable?.focus();
	}

	close() {
		this.modal.hidden = true;
		this.modal.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';

		// Remove event listeners
		document.removeEventListener('keydown', this.handleKeydown);
		this.modal.removeEventListener('click', this.handleBackdropClick);

		// Return focus to trigger
		this.previouslyFocused?.focus();
	}

	setupFocusTrap() {
		const focusable = this.modal.querySelectorAll(this.focusableElements);
		this.firstFocusable = focusable[0];
		this.lastFocusable = focusable[focusable.length - 1];
	}

	handleKeydown(event) {
		if (event.key === 'Escape') {
			this.close();
			return;
		}

		if (event.key === 'Tab') {
			// Trap focus within modal
			if (event.shiftKey && document.activeElement === this.firstFocusable) {
				event.preventDefault();
				this.lastFocusable.focus();
			} else if (!event.shiftKey && document.activeElement === this.lastFocusable) {
				event.preventDefault();
				this.firstFocusable.focus();
			}
		}
	}

	handleBackdropClick(event) {
		// Close only if clicking the backdrop itself, not content
		if (event.target === this.modal || event.target.classList.contains('modal__backdrop')) {
			this.close();
		}
	}
}
```

> _"Accessibility is not an afterthought. It is architecture."_
> — The Tao of Development (a11y-001)

---

### 🌐 Approach 3: Native `<dialog>` Element

**📂 Demo:** [demo/03-dialog-element.html](./demo/03-dialog-element.html)

The HTML `<dialog>` element provides **native modal behavior** with less JavaScript:

```html
<dialog id="project-dialog">
	<form method="dialog">
		<h2>Project Title</h2>
		<p>Project content...</p>
		<button value="close">Close</button>
	</form>
</dialog>

<button onclick="document.getElementById('project-dialog').showModal()">View Project</button>
```

#### Built-in Features

| Feature                       | Status    |
| ----------------------------- | --------- |
| Backdrop (::backdrop)         | ✅ Native |
| Escape to close               | ✅ Native |
| Focus trap                    | ✅ Native |
| Top layer (above all content) | ✅ Native |
| Form submission closes        | ✅ Native |
| Return focus                  | ⚠️ Manual |

#### The `::backdrop` Pseudo-Element

```css
dialog::backdrop {
	background: rgba(0, 0, 0, 0.7);
	backdrop-filter: blur(4px);
}

dialog {
	border: none;
	border-radius: 1rem;
	padding: 2rem;
	max-width: 90vw;
	max-height: 90vh;
}

/* Animation */
dialog[open] {
	animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: scale(0.95);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}
```

#### Methods

| Method               | Behavior                      |
| -------------------- | ----------------------------- |
| `dialog.show()`      | Opens non-modal (no backdrop) |
| `dialog.showModal()` | Opens as modal with backdrop  |
| `dialog.close()`     | Closes dialog                 |

> _"Reuse proven patterns; avoid reinventing the wheel."_
> — The Tao of Development (cc-008)

**Browser Support:** All modern browsers (Chrome, Firefox, Safari, Edge). Consider polyfill for older browsers.

---

## 🎯 Part III: Project Grid Modal Pattern

**📂 Demo:** [demo/04-project-grid.html](./demo/04-project-grid.html)

Let's apply these concepts to the common portfolio use case: a grid of project cards that open modals.

### HTML Structure

```html
<section class="projects-grid">
	<article class="project-card" data-project="1">
		<img src="project-1-thumb.jpg" alt="Project 1 thumbnail" />
		<h3>Project Title</h3>
		<p>Brief description...</p>
		<button class="project-card__trigger" aria-haspopup="dialog">View Details</button>
	</article>

	<!-- More cards... -->
</section>

<dialog id="project-modal" aria-labelledby="modal-title">
	<div class="modal__content">
		<button class="modal__close" aria-label="Close modal">
			<svg><!-- Close icon --></svg>
		</button>
		<img id="modal-image" src="" alt="" />
		<h2 id="modal-title"></h2>
		<p id="modal-description"></p>
		<a id="modal-link" href="#">View Full Project →</a>
	</div>
</dialog>
```

### Dynamic Content Loading

```javascript
// Project data (could come from API)
const projects = [
	{
		id: 1,
		title: 'E-commerce Redesign',
		description: 'Complete redesign of checkout flow...',
		image: 'project-1-full.jpg',
		url: '/projects/ecommerce-redesign/',
	},
	// More projects...
];

// Open modal with project data
function openProjectModal(projectId, trigger) {
	const project = projects.find((p) => p.id === projectId);
	if (!project) return;

	const dialog = document.getElementById('project-modal');

	// Populate content
	dialog.querySelector('#modal-title').textContent = project.title;
	dialog.querySelector('#modal-description').textContent = project.description;
	dialog.querySelector('#modal-image').src = project.image;
	dialog.querySelector('#modal-link').href = project.url;

	// Store trigger for focus return
	dialog.dataset.trigger = trigger.id;

	// Open
	dialog.showModal();
}

// Event delegation on grid
document.querySelector('.projects-grid').addEventListener('click', (e) => {
	const trigger = e.target.closest('.project-card__trigger');
	if (!trigger) return;

	const card = trigger.closest('.project-card');
	const projectId = parseInt(card.dataset.project, 10);

	openProjectModal(projectId, trigger);
});
```

---

## ♿ Accessibility Checklist

Before shipping modals to production, verify:

| Requirement                       | How to Test                   |
| --------------------------------- | ----------------------------- |
| Focus moves to modal on open      | Tab after opening             |
| Focus is trapped in modal         | Tab through all elements      |
| Escape key closes modal           | Press Escape                  |
| Focus returns to trigger on close | Close and check               |
| Screen reader announces modal     | Test with VoiceOver/NVDA      |
| Backdrop click closes (optional)  | Click outside                 |
| No scrolling of background        | Scroll while modal open       |
| Reduced motion respected          | Enable prefers-reduced-motion |

```css
@media (prefers-reduced-motion: reduce) {
	dialog,
	.modal {
		animation: none;
		transition: none;
	}
}
```

---

## ⚡ Performance Considerations

> _"The wise developer does not add more code. They remove conflict."_
> — The Tao of Development (cc-006)

### Lazy Loading Modal Content

Don't load heavy assets until modal opens:

```javascript
dialog.addEventListener('open', () => {
	const img = dialog.querySelector('img[data-src]');
	if (img && !img.src) {
		img.src = img.dataset.src;
	}
});
```

### Prefetching on Hover (Optional)

```javascript
card.addEventListener(
	'mouseenter',
	() => {
		const projectId = card.dataset.project;
		prefetchProjectData(projectId);
	},
	{ once: true }
);
```

---

## 🎓 Atelier Workshop Exercise

### Task: Add Modals to Your Portfolio

1. **Analyze your content:** Do your projects need full pages or previews?
2. **Choose your approach:** CSS-only, vanilla JS, or `<dialog>`?
3. **Implement with accessibility:** Focus trap, ARIA, keyboard nav
4. **Test thoroughly:** Keyboard-only, screen reader, mobile

### Commit Message

```
feat(portfolio): add accessible project modals

- Implement modal dialogs for project previews
- Add proper ARIA attributes and focus management
- Include keyboard navigation (Escape to close, Tab trap)
- Respect prefers-reduced-motion
```

---

## 🔧 Practice Extensions

1. **Add transitions:** Smooth open/close animations
2. **Swipe to dismiss:** Mobile gesture support
3. **Gallery mode:** Navigate between projects without closing
4. **URL sync:** Update URL hash without page reload
5. **Loading states:** Skeleton UI while content loads

---

## 📚 Further Reading

### References

- **MDN:** [<dialog> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- **MDN:** [:target pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:target)
- **WAI-ARIA:** [Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- **A11y Project:** [Modal Dialogs](https://www.a11yproject.com/posts/how-to-hide-content/)

### Inspiration

- [Micromodal.js](https://micromodal.vercel.app/) – Lightweight library
- [a11y-dialog](https://a11y-dialog.netlify.app/) – Accessibility-first
- [Radix UI Dialog](https://www.radix-ui.com/docs/primitives/components/dialog) – React primitives

---

## 🎯 Summary & Key Takeaways

### Decision Framework

```
Is the content substantial (case study, multiple sections)?
├─ YES → New page (SEO, bookmarking, mobile)
└─ NO → Modal might work
    │
    └─ Does user need to preserve page context?
       ├─ YES → Modal (quick preview, return to grid)
       └─ NO → Either works; consider user expectations
```

### Essential Concepts

1. **Context matters:** No universal answer to "modal or page?"
2. **CSS-only works** for simple cases, but has accessibility limits
3. **Vanilla JS** gives full control with ~50 lines of code
4. **`<dialog>` element** is the modern, native solution
5. **Accessibility is non-negotiable:** Focus trap, ARIA, keyboard nav

### The Tao Reminder

> _"Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."_
> — The Tao of Development (cc-007)

Choose the simplest solution that meets all requirements. A well-implemented CSS modal beats a broken JavaScript one. A native `<dialog>` beats a custom implementation with the same features.

---

## 💬 Reflection Questions

Before moving on, consider:

1. What type of content do your portfolio projects contain?
2. Would your users benefit from quick previews or full pages?
3. How will you handle the modal → full page transition?
4. Have you tested with keyboard-only navigation?

---

**Next Steps:**

- Review the [demo files](./demo/) for working implementations
- Apply the pattern to your portfolio project
- Test accessibility with a screen reader
- Document your decisions in your project journal

---

**License:** Content CC BY-NC-SA 4.0 · Code MIT
**Author:** Rubén Vega Balbás, PhD · [UDIT](https://www.udit.es)

_Critical Coding for a Better Living._
