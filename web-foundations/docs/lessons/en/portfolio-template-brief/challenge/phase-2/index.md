---
layout: methodology
title: 'Phase 2: Responsive Layout & Scroll Architecture'
title_alt: 'Phase 2: Responsive Layout & Scroll Architecture'
slug: portfolio-phase-2
date: 2025-11-27
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/portfolio-template-brief/challenge/phase-2/
description: 'Technical guide for implementing responsive layouts and scroll-driven effects across three grade levels: vanilla CSS, Bootstrap+GSAP, and Tailwind+Vite.'
tags: [phase-2, responsive, scroll, parallax, css, gsap, tailwind]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> **The Tao of the Developer:**
> _"The scroll reveals what patience conceals. Build not for the viewport you see, but for the journey the user takes."_

---

## Phase 2 Objectives

**Time:** 2-3 hours | **Deliverable:** Fully responsive layout with scroll-driven effects

| Task                        | Priority | Complexity |
| --------------------------- | -------- | ---------- |
| Fluid Typography System     | 🔴 High  | Medium     |
| Core Sections HTML          | 🔴 High  | Low        |
| Responsive Layout           | 🔴 High  | Medium     |
| **Scroll Architecture**     | 🟡 Med   | High       |
| Grid/Flexbox Layouts        | 🔴 High  | Medium     |

---

## 🎬 Live Demos

Study these working examples before implementing. **View source, don't just view.**

| Grade | Demo | Source | Stack |
|-------|------|--------|-------|
| **Grade 1** | [Vanilla CSS Demo](./demos/grade-1/) | [View Code](./demos/grade-1/main.js) | HTML + CSS + IntersectionObserver |
| **Grade 2** | [Bootstrap + GSAP Demo](./demos/grade-2/) | [View Code](./demos/grade-2/main.js) | Bootstrap 5 + GSAP ScrollTrigger |
| **Grade 3** | [Tailwind Demo](./demos/grade-3/) | [View Code](./demos/grade-3/main.js) | Tailwind CSS + Modular GSAP |

> **The Tao of the Developer:**
> _"Copy code, and you learn for a day. Understand code, and you build for a lifetime."_

---

## 1. Fluid Typography (All Grades)

Before scroll effects, establish your typographic scale. **No scroll animation survives bad typography.**

```css
:root {
	/* Fluid type scale — min @ 320px, max @ 1200px */
	--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
	--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
	--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
	--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
	--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
	--text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
	--text-3xl: clamp(2rem, 1.5rem + 2.5vw, 3rem);
	--text-4xl: clamp(2.5rem, 1.75rem + 3.75vw, 4rem);

	/* Fluid spacing scale */
	--space-xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
	--space-sm: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);
	--space-md: clamp(1rem, 0.8rem + 1vw, 1.5rem);
	--space-lg: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
	--space-xl: clamp(2rem, 1.5rem + 2.5vw, 4rem);
	--space-2xl: clamp(3rem, 2rem + 5vw, 6rem);
}
```

> **Reference:** [Typography & Color Lesson]({{ base_url }}/lessons/en/typography-color/)

---

## 2. Scroll Architecture: The Three Paths

> **The Tao of the Developer:**
> _"Three paths lead to the same mountain. The wise developer chooses the path that matches their tools, not their ego."_

### Understanding Scroll Techniques

| Technique                | Browser Support | Performance | Complexity | Best For           |
| ------------------------ | --------------- | ----------- | ---------- | ------------------ |
| CSS `scroll-timeline`    | 🟡 ~75%         | ⚡ Excellent | Low        | Grade 1 (Vanilla)  |
| Intersection Observer    | 🟢 ~97%         | ⚡ Excellent | Medium     | All grades         |
| GSAP ScrollTrigger       | 🟢 ~99%         | ⚡ Very Good | Medium     | Grade 2 & 3        |
| `scroll` event listener  | 🟢 100%         | 🔴 Poor     | Low        | **Avoid**          |

**Critical Rule:** Never use `addEventListener('scroll', ...)` for animations. It fires on every pixel and destroys performance.

---

## 🎯 Grade 1: Vanilla CSS Scroll

### 2.1 CSS Scroll-Driven Animations (Modern)

The **CSS-only** approach using `animation-timeline: scroll()`. No JavaScript required.

```css
/* Base: element starts invisible and translated */
.reveal-on-scroll {
	opacity: 0;
	transform: translateY(30px);
	animation: revealUp linear both;
	animation-timeline: view();
	animation-range: entry 0% entry 100%;
}

@keyframes revealUp {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Parallax hero background */
.hero {
	background-image: url('hero-bg.jpg');
	background-size: cover;
	background-attachment: fixed; /* Simple parallax fallback */
}

/* Modern parallax with scroll-timeline */
.parallax-layer {
	animation: parallaxShift linear both;
	animation-timeline: scroll(root);
}

@keyframes parallaxShift {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(-20%);
	}
}
```

**⚠️ Browser Support Note:** `scroll-timeline` works in Chrome 115+, Edge 115+, Firefox 110+ (with flag). Provide fallbacks.

### 2.2 Intersection Observer (Universal Fallback)

For browsers without `scroll-timeline`, use this **one-time reveal** pattern:

```javascript
// js/scroll-reveal.js
const observerOptions = {
	root: null, // viewport
	rootMargin: '0px 0px -10% 0px', // trigger slightly before fully visible
	threshold: 0.1,
};

const revealOnScroll = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('revealed');
			observer.unobserve(entry.target); // Fire once only
		}
	});
};

const observer = new IntersectionObserver(revealOnScroll, observerOptions);

document.querySelectorAll('[data-reveal]').forEach((el) => {
	observer.observe(el);
});
```

```css
/* Pair with CSS */
[data-reveal] {
	opacity: 0;
	transform: translateY(20px);
	transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

[data-reveal].revealed {
	opacity: 1;
	transform: translateY(0);
}

/* Staggered children */
[data-reveal-stagger] > * {
	opacity: 0;
	transform: translateY(20px);
	transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

[data-reveal-stagger].revealed > *:nth-child(1) { transition-delay: 0.1s; }
[data-reveal-stagger].revealed > *:nth-child(2) { transition-delay: 0.2s; }
[data-reveal-stagger].revealed > *:nth-child(3) { transition-delay: 0.3s; }
[data-reveal-stagger].revealed > *:nth-child(4) { transition-delay: 0.4s; }

[data-reveal-stagger].revealed > * {
	opacity: 1;
	transform: translateY(0);
}
```

```html
<!-- Usage -->
<section data-reveal>
	<h2>About Me</h2>
	<p>Content reveals on scroll...</p>
</section>

<div class="projects-grid" data-reveal-stagger>
	<article>Project 1</article>
	<article>Project 2</article>
	<article>Project 3</article>
</div>
```

> **Reference:** [CSS Animations Lesson]({{ base_url }}/lessons/en/web-animations/css/)

---

## 🎯 Grade 2: Bootstrap + GSAP

> **The Tao of the Developer:**
> _"Power without restraint is chaos. GSAP gives you the sword; wisdom tells you when to sheathe it."_

### 2.3 GSAP ScrollTrigger Setup

```html
<!-- Load via CDN (after Bootstrap) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js"></script>
```

### 2.4 Basic ScrollTrigger Patterns

```javascript
// js/animations.js
gsap.registerPlugin(ScrollTrigger);

// Pattern 1: Simple reveal
gsap.utils.toArray('.reveal').forEach((el) => {
	gsap.from(el, {
		y: 50,
		opacity: 0,
		duration: 0.8,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: el,
			start: 'top 85%', // when top of element hits 85% of viewport
			toggleActions: 'play none none none', // play once
		},
	});
});

// Pattern 2: Parallax background
gsap.to('.hero-bg', {
	yPercent: -30,
	ease: 'none',
	scrollTrigger: {
		trigger: '.hero',
		start: 'top top',
		end: 'bottom top',
		scrub: true, // ties animation to scroll position
	},
});

// Pattern 3: Pinned section with progress
gsap.to('.progress-bar', {
	scaleX: 1,
	ease: 'none',
	scrollTrigger: {
		trigger: '.content-section',
		start: 'top top',
		end: 'bottom bottom',
		scrub: 0.3,
	},
});
```

### 2.5 Staggered Grid Reveal

```javascript
// Projects grid with stagger
ScrollTrigger.batch('.project-card', {
	onEnter: (batch) =>
		gsap.from(batch, {
			y: 40,
			opacity: 0,
			duration: 0.6,
			stagger: 0.15,
			ease: 'power2.out',
		}),
	start: 'top 90%',
	once: true,
});
```

### 2.6 Bootstrap + GSAP Integration

```html
<!-- Bootstrap container with GSAP animations -->
<section class="py-5">
	<div class="container">
		<div class="row g-4">
			<div class="col-md-6 col-lg-4 project-card">
				<div class="card h-100 shadow-sm">
					<img src="..." class="card-img-top" alt="Project" />
					<div class="card-body">
						<h5 class="card-title">Project Name</h5>
						<p class="card-text">Description...</p>
					</div>
				</div>
			</div>
			<!-- More cards... -->
		</div>
	</div>
</section>
```

> **Reference:** [GSAP Animations Lesson]({{ base_url }}/lessons/en/web-animations/gsap/)

---

## 🎯 Grade 3: Tailwind + Vite

### 2.7 Modular GSAP with Vite

```bash
npm install gsap
```

```javascript
// src/js/animations/scroll.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
	// Batch reveal for performance
	ScrollTrigger.batch('[data-animate="fade-up"]', {
		onEnter: (elements) =>
			gsap.from(elements, {
				y: 30,
				opacity: 0,
				duration: 0.6,
				stagger: 0.1,
				ease: 'power2.out',
			}),
		start: 'top 90%',
		once: true,
	});

	// Parallax layers
	gsap.utils.toArray('[data-parallax]').forEach((el) => {
		const speed = el.dataset.parallax || 0.2;
		gsap.to(el, {
			yPercent: -100 * speed,
			ease: 'none',
			scrollTrigger: {
				trigger: el.parentElement,
				start: 'top bottom',
				end: 'bottom top',
				scrub: true,
			},
		});
	});
}

export function initSmoothScroll() {
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', (e) => {
			e.preventDefault();
			const target = document.querySelector(anchor.getAttribute('href'));
			if (target) {
				gsap.to(window, {
					duration: 0.8,
					scrollTo: { y: target, offsetY: 80 },
					ease: 'power2.inOut',
				});
			}
		});
	});
}
```

```javascript
// src/main.js
import './style.css';
import { initScrollAnimations, initSmoothScroll } from './js/animations/scroll.js';

document.addEventListener('DOMContentLoaded', () => {
	initScrollAnimations();
	initSmoothScroll();
});
```

### 2.8 Tailwind + Scroll Animation Classes

```html
<!-- Tailwind markup with animation data attributes -->
<section class="min-h-screen flex items-center relative overflow-hidden">
	<!-- Parallax background -->
	<div
		class="absolute inset-0 bg-cover bg-center"
		style="background-image: url('hero.jpg')"
		data-parallax="0.3"></div>

	<!-- Content -->
	<div class="container mx-auto px-4 relative z-10">
		<h1 class="text-4xl md:text-6xl font-bold" data-animate="fade-up">
			Your Name
		</h1>
		<p class="mt-4 text-xl text-gray-600" data-animate="fade-up">
			Web Developer & Designer
		</p>
	</div>
</section>

<!-- Projects grid -->
<section class="py-20">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<article
				class="bg-white rounded-lg shadow-lg overflow-hidden"
				data-animate="fade-up">
				<!-- Card content -->
			</article>
		</div>
	</div>
</section>
```

> **Reference:** [Tailwind Components & Design System]({{ base_url }}/lessons/en/tailwind/components-design-system/)

---

## 3. Scroll Patterns: What to Build

> **The Tao of the Developer:**
> _"The master asks not 'What can I animate?' but 'What deserves motion?' Stillness has value too."_

### Recommended Scroll Effects by Section

| Section     | Technique              | Purpose                           |
| ----------- | ---------------------- | --------------------------------- |
| **Hero**    | Parallax background    | Depth, visual interest            |
| **About**   | Fade-up on entry       | Focus attention                   |
| **Skills**  | Staggered bar fill     | Show progression                  |
| **Projects**| Staggered grid reveal  | Guided discovery                  |
| **Contact** | Simple fade            | Calm, clear CTA                   |
| **Footer**  | None                   | Stability, trust                  |

### Anti-Patterns to Avoid

❌ **Don't:**
- Animate everything (visual noise)
- Use `scroll` event listeners (performance killer)
- Create scroll-jacking (hijacking natural scroll)
- Add parallax to text (readability nightmare)
- Forget `prefers-reduced-motion`

✅ **Do:**
- Animate 30-40% of elements max
- Use `IntersectionObserver` or `ScrollTrigger`
- Enhance scroll, don't replace it
- Apply parallax to decorative backgrounds only
- Always provide motion-reduced fallback

---

## 4. Accessibility: The Non-Negotiable

```css
/* REQUIRED: Respect user preferences */
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}
}
```

```javascript
// GSAP: Check before initializing
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
	initScrollAnimations();
}
```

> **The Tao of the Developer:**
> _"Accessibility is not a feature. It is respect made manifest in code."_

---

## 5. Performance Checklist

Before moving to Phase 3, verify:

- [ ] **No layout thrashing** — Use `transform` and `opacity` only
- [ ] **60fps scroll** — Check DevTools Performance tab
- [ ] **Reduced motion works** — Test with system setting enabled
- [ ] **No scroll jank on mobile** — Test on real devices
- [ ] **Parallax is subtle** — Max 20-30% shift, never on text
- [ ] **Observers cleaned up** — Disconnect when done (SPA routing)

---

## 6. Quick Reference: Copy-Paste Patterns

### Minimal Vanilla Setup (Grade 1)

```html
<script>
	// Inline for simplicity — move to external file in production
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add('visible');
					observer.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.1 }
	);
	document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
</script>

<style>
	.animate-on-scroll {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.5s, transform 0.5s;
	}
	.animate-on-scroll.visible {
		opacity: 1;
		transform: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.animate-on-scroll {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
```

### Minimal GSAP Setup (Grade 2 & 3)

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js"></script>
<script>
	gsap.registerPlugin(ScrollTrigger);

	if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		gsap.utils.toArray('.gsap-reveal').forEach((el) => {
			gsap.from(el, {
				y: 40,
				opacity: 0,
				duration: 0.7,
				scrollTrigger: { trigger: el, start: 'top 85%', once: true },
			});
		});
	}
</script>
```

---

## 7. External Resources

### Documentation
- [MDN: Scroll-driven Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)
- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

### Tools
- [Scroll-driven Animations Debugger](https://scroll-driven-animations.style/) — Visualize CSS scroll timelines
- [GSAP Cheat Sheet](https://gsap.com/cheatsheet/) — Quick reference

### Inspiration (Study, Don't Copy)
- [Awwwards: Scroll Animations](https://www.awwwards.com/websites/scroll-animation/)
- [Codrops: ScrollTrigger Demos](https://tympanus.net/codrops/?s=scrolltrigger)

---

## 8. Internal Lesson References

- [Responsive Design (Canonical)]({{ base_url }}/lessons/en/responsive/) — Fluid, elastic, intrinsic
- [CSS Animations]({{ base_url }}/lessons/en/web-animations/css/) — Transitions, keyframes, scroll-driven
- [GSAP Animations]({{ base_url }}/lessons/en/web-animations/gsap/) — Timeline animations and ScrollTrigger
- [Typography & Color]({{ base_url }}/lessons/en/typography-color/) — Fluid typography, color systems
- [JavaScript Modules]({{ base_url }}/lessons/en/js-modules/) — Organize animation code modularly

---

## Final Words

> **The Tao of the Developer:**
> _"The scroll is a conversation between user and interface. Speak clearly. Listen to their pace. Never shout."_

Your Phase 2 deliverable: A **fully responsive layout** where scroll reveals content with purpose and restraint. The user should feel guided, not assaulted.

**Next:** [Phase 3 — Animations & Interactivity]({{ base_url }}/lessons/en/portfolio-template-brief/challenge/phase-3/) (coming soon)

---

_Questions? Stuck? Open an issue in your repository with the `[Phase 2]` prefix and tag your professor._
