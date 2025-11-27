---
layout: lesson
title: 'Web Animations: From Motion to Meaning'
title_alt: 'Animaciones Web: Del Movimiento al Significado'
slug: web-animations
date: 2025-10-21
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/web-animations/
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

## ⚡ Quick Start (10 minutes)

- Create `styles/animations.css` and paste the snippet below.
- Add the HTML exactly as shown to any page.
- Toggle 'Reduce Motion' in OS to verify accessibility.

<iframe
	src="./examples/button.html"
	title="Button micro-interaction example"
	style="width:100%;max-width:860px;height:220px;border:1px solid #e5e7eb;border-radius:6px;"
	loading="lazy"
></iframe>

<p style="font-size:13px;color:#374151;margin-top:6px;">Demo: <a href="./demo">Open interactive demo</a></p>

```css
/* Minimal animation system for the workshop */
:root {
	--duration-fast: 200ms;
	--duration: 300ms;
	--ease-out: cubic-bezier(0, 0, 0.2, 1);
	--color-primary: #3b82f6;
}

/* Respect motion preferences */
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}
/* Button micro-interaction */
.btn {
	padding: 0.75rem 1.5rem;
	border: 0;
	border-radius: 6px;
	background: var(--color-primary);
	color: #fff;
	font-weight: 600;
	transition: transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out);
}
.btn:hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}
.btn:active {
	transform: translateY(0);
	transition-duration: 100ms;
}

/* Staggered fade-in */
.content-section {
	animation: fadeInUp var(--duration) var(--ease-out) backwards;
}
.content-section:nth-child(1) {
	animation-delay: 0.1s;
}
.content-section:nth-child(2) {
	animation-delay: 0.2s;
}
.content-section:nth-child(3) {
	animation-delay: 0.3s;
}
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
```

```html
<button class="btn">Primary Action</button>

<section class="content-section">
	<h2>Section A</h2>
	<p>Appears immediately.</p>
</section>
<section class="content-section">
	<h2>Section B</h2>
	<p>Appears after 0.1s.</p>
</section>
<section class="content-section">
	<h2>Section C</h2>
	<p>Appears after 0.2s.</p>
</section>
```

> Teacher note: Demo first. Ask: What did we animate? Why? What if motion is reduced?

---

## 🎯 Learning Objectives

- **Understand animation as communication** - Motion with purpose, not decoration
- **Master CSS animation techniques** - Transitions, keyframes, transforms, and timing functions
- **Apply performance best practices** - Hardware acceleration, will-change, and reduced motion
- **Design accessible animations** - Respecting user preferences and cognitive load
- **Think critically about motion** - When animation enhances vs. distracts from user experience
- **Build production-ready animations** - From micro-interactions to complex sequences

---

## 🎭 Critical Perspective: Animation as Language

> "Animation is not about making things move. It's about making things _feel_ alive." — Anonymous UX Designer

Before we code a single transition, let's pause and **think critically** about why we animate:

### The Good: Motion That Serves

- **Provides feedback** - Button pressed, form submitted, data loading
- **Guides attention** - "Look here next" spatial navigation
- **Reveals relationships** - Parent-child, cause-effect, before-after
- **Delights users** - Personality, brand voice, emotional connection
- **Reduces cognitive load** - Smooth transitions prevent disorientation

### The Bad: Motion That Harms

- **Distracts from content** - Gratuitous spinners, bouncing everything
- **Triggers vestibular disorders** - Parallax, rotation without `prefers-reduced-motion`
- **Slows interaction** - Long animations blocking user progress
- **Drains battery** - Inefficient animations on mobile devices
- **Excludes users** - No fallback for motion sensitivity

### 🤔 Atelier Critical Prompt #1

**Before animating anything in your project, ask:**

1. **Purpose**: What user need does this motion serve?
2. **Alternatives**: Could static design communicate the same thing?
3. **Cost**: What's the performance/accessibility trade-off?
4. **Meaning**: Does this motion align with my project's voice?

**Document your answers in your project journal (commit message or `DESIGN-DECISIONS.md`).**

---

## 📜 The Evolution of Web Animation

```text
1995-2005 ━━━━━━━━━━━━━━━━━ Dark Ages
         │                   • <blink>, <marquee> tags (deprecated)
         │                   • GIF animations (limited, heavy)
         │                   • Flash (proprietary, inaccessible)
         │
2006-2010 ━━━━━━━━━━━━━━━━━ jQuery Era
         │                   • .animate(), .slideDown()
         │                   • JavaScript-driven (performance issues)
         │                   • Cross-browser inconsistency
         │
2011-2015 ━━━━━━━━━━━━━━━━━ CSS3 Revolution
         │                   • transition, @keyframes
         │                   • transform (GPU-accelerated)
         │                   • animation-* properties
         │
2016-2020 ━━━━━━━━━━━━━━━━━ Modern Declarative
         │                   • Web Animations API (WAAPI)
         │                   • Intersection Observer
         │                   • CSS Variables in animations
         │                   • Houdini API experiments
         │
2021-NOW  ━━━━━━━━━━━━━━━━━ Mature & Accessible
                             • View Transitions API
                             • Scroll-driven animations
                             • prefers-reduced-motion standard
                             • Performance budgets for motion
```

> "CSS animations won because they put motion control where it belongs: in the presentation layer, not the behavior layer." — CSS-Tricks, adapted

---

## 🎓 Theory: The 3 Pillars of CSS Animation

### Pillar 1: Transitions (State → State)

**What is a "state"?**  
A "state" is simply how an element appears or behaves at a certain moment—such as default, hovered, focused, or active. Transitions help you animate the visual change when an element moves from one state to another (for example, from its normal style to a hovered style).

**Create your own sandbox:**  
For all code examples and hands-on practice with animation in this lesson, create a file at `/animations/index.html` in your project. Use it as your sandbox for experiments!

**Example HTML (copy this into `/animations/index.html`):**

```html
<button class="button">Hover me!</button>
```

Now try adding the CSS below to your sandbox to experiment with transitions.

**What**: Smooth interpolation between two property values.

**When**: User-triggered states (hover, focus, active) or class changes.

**Syntax**:

```css
.element {
	transition: property duration timing-function delay;
}
```

**Example**:

```css
.button {
	background: #3b82f6;
	color: white;
	transition: background 0.3s ease, transform 0.15s ease-out;
}

.button:hover {
	background: #2563eb;
	transform: translateY(-2px);
}

.button:active {
	transform: translateY(0);
	transition-duration: 0.1s; /* Faster on click */
}
```

**🔑 Key Insight**: Transitions are **reactive** - they need a trigger (hover, class change, JS state update).

---

### Pillar 2: Keyframes (Multi-Step Choreography)

**What**: Define intermediate steps in an animation sequence.

**When**: Complex animations, looping effects, independent from user interaction.

**Syntax**:

```css
@keyframes animation-name {
	from {
		/* or 0% */
	}
	25% {
	}
	50% {
	}
	to {
		/* or 100% */
	}
}

.element {
	animation: animation-name duration timing-function delay iteration-count direction fill-mode;
}
```

**Example - Fade-in on page load**:

```html
<section class="content-section">
	<h2>Welcome</h2>
	<p>This block fades in and moves up on load.</p>
</section>
<section class="content-section">
	<h2>Features</h2>
	<p>Stagger with increasing delays.</p>
</section>
```

```css
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.content-section {
	animation: fadeInUp 0.6s ease-out forwards;
}

/* Stagger with delays */
.content-section:nth-child(1) {
	animation-delay: 0.1s;
}
.content-section:nth-child(2) {
	animation-delay: 0.2s;
}
.content-section:nth-child(3) {
	animation-delay: 0.3s;
}
```

**🔑 Key Insight**: Keyframes are **proactive** - they run automatically when applied.

---

### Pillar 3: Transforms (Spatial Manipulation)

**What**: Move, rotate, scale, or skew elements **without triggering layout reflow**.

**Why**: GPU-accelerated = smooth 60fps performance.

**Core Functions**:

```css
transform: translateX(100px); /* Move horizontally */
transform: translateY(-50px); /* Move vertically */
transform: translate(50px, -20px); /* Both at once */
transform: scale(1.2); /* Grow 20% */
transform: scaleX(0.8); /* Squish horizontally */
transform: rotate(45deg); /* Rotate clockwise */
transform: skewX(10deg); /* Tilt */

/* Combine multiple transforms */
transform: translateX(50px) rotate(15deg) scale(1.1);
```

**Example - Card lift effect**:

```html
<article class="card">
	<h3>Card Title</h3>
	<p>Hover me to see lift and shadow.</p>
</article>
```

```css
.card {
	transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), /* Bounce */ box-shadow 0.3s ease;
}

.card:hover {
	transform: translateY(-8px) scale(1.02);
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

**🔑 Key Insight**: Always use `transform` and `opacity` for animations - they're **compositor-only** (no repaints).

---

## ⚡ Performance: The "Will-Change" Optimization

**Problem**: First frame of animation can stutter (browser preparing GPU layer).

**Solution**: Tell browser in advance what will animate.

```css
.button {
	will-change: transform, opacity;
	/* Browser creates GPU layer immediately */
}

/* ⚠️ Don't overuse! */
.everything {
	will-change: auto; /* Default - only optimize what animates */
}
```

**Best Practice**:

```css
/* Add will-change only when needed */
.card:hover,
.card:focus-within {
	will-change: transform;
}
```

**Forbidden**:

```css
/* ❌ BAD - wastes memory on every element */
* {
	will-change: transform;
}
```

---

## ♿ Accessibility: Respecting User Motion Preferences

**Reality**: ~35% of users experience motion sickness from animations (Vestibular Disorders Association).

**Solution**: `prefers-reduced-motion` media query.

```css
/* Full animation for users who can tolerate it */
@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.loader {
	animation: spin 1s linear infinite;
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
	.loader {
		animation: none;
		/* Provide static alternative */
		opacity: 0.6;
	}

	* {
		animation-duration: 0.01ms !important;
		transition-duration: 0.01ms !important;
	}
}
```

**Progressive Enhancement Approach**:

```css
/* Start with no motion (safe default) */
.element {
	opacity: 1;
}

/* Add motion only if user allows */
@media (prefers-reduced-motion: no-preference) {
	.element {
		animation: fadeIn 0.5s ease;
	}
}
```

### 🤔 Atelier Critical Prompt #2

**Motion is not inclusive by default.**

Test your animations with:

1. **System settings**: Enable "Reduce Motion" in OS accessibility
2. **DevTools**: Chrome/Firefox have motion emulation
3. **Real users**: Ask someone with vestibular sensitivity

**Commit requirement**: All animations MUST have `prefers-reduced-motion` fallback.

---

## 🏗️ Atelier Workshop: Building Animation Systems

> **✅ Pure CSS - No Framework Required**
>
> All examples use standard CSS. No Tailwind, Bootstrap, or JavaScript dependencies (unless explicitly marked).

### Setup: Animation Utilities Starter

Create `src/styles/animations.css` in your project:

```css
/* ============================================
ANIMATION SYSTEM - Pure CSS
Design Tokens + Reusable Animations
Framework-agnostic, works everywhere
============================================ */

/* --- Timing Tokens --- */
:root {
	--duration-instant: 100ms;
	--duration-fast: 200ms;
	--duration-normal: 300ms;
	--duration-slow: 500ms;
	--duration-slower: 800ms;

	--ease-in: cubic-bezier(0.4, 0, 1, 1);
	--ease-out: cubic-bezier(0, 0, 0.2, 1);
	--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
	--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
	--ease-elastic: cubic-bezier(0.68, -0.35, 0.265, 1.35);

	/* Color tokens (framework-agnostic) */
	--color-primary: #3b82f6;
	--color-gray-100: #f3f4f6;
	--color-gray-700: #374151;
	--color-gray-900: #111827;
}

/* --- Base Reset --- */
/*
The following media query targets users who have enabled "Reduce Motion" in their operating system or browser preferences.
When (prefers-reduced-motion: reduce) is true, all CSS animations and transitions are effectively disabled for better accessibility.
*/
@media (prefers-reduced-motion: reduce) {
	_,
	_::before,
	\*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}

/* --- Utility Classes --- */
.fade-in {
	animation: fadeIn var(--duration-normal) var(--ease-out);
}

.slide-in-up {
	animation: slideInUp var(--duration-slow) var(--ease-out);
}

.scale-in {
	animation: scaleIn var(--duration-fast) var(--ease-bounce);
}

/* --- Keyframe Library --- */
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes slideInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes scaleIn {
	from {
		opacity: 0;
		transform: scale(0.8);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

@keyframes pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}
```

**Import in your `src/main.css`**:

```css
@import './styles/animations.css';
```

---

## 🎨 Exercise 1: Micro-Interactions (Button States)

> **✅ Pure CSS - No JavaScript Required**

**Goal**: Add delightful feedback to buttons.

**Where**: `styles/button.css` (or any HTML page + CSS file)

---

### Step 1: HTML

```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-primary" disabled>Disabled Button</button>
```

<iframe src="./examples/button.html" title="Button variants demo" style="width:100%;max-width:760px;height:180px;border:1px solid #e5e7eb;border-radius:6px;" loading="lazy"></iframe>
	<p style="font-size:13px;color:#374151;margin-top:6px;">Open <a href="./examples/button.html">button example</a> in a new tab if the embed is blocked.</p>

### Step 2: CSS (Base + Variants)

```css
/* styles/button.css */

/* Base button styles */
.btn {
	position: relative;
	overflow: hidden;
	padding: 0.75rem 1.5rem;
	border: none;
	border-radius: 6px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out);
}

/* Variants */
.btn-primary {
	background-color: var(--color-primary);
	color: white;
}
.btn-secondary {
	background-color: var(--color-gray-100);
	color: var(--color-gray-900);
}

/* Interactions */
.btn:hover:not(:disabled) {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.btn:active:not(:disabled) {
	transform: translateY(0);
	transition-duration: var(--duration-instant);
}

/* Focus ring animation */
.btn:focus-visible {
	outline: 2px solid currentColor;
	outline-offset: 2px;
	animation: pulseRing 0.6s ease-out;
}
@keyframes pulseRing {
	0% {
		outline-offset: 2px;
	}
	100% {
		outline-offset: 6px;
		outline-color: transparent;
	}
}

/* Ripple effect (optional) */
.btn::after {
	content: '';
	position: absolute;
	inset: 0;
	background: rgba(255, 255, 255, 0.3);
	border-radius: inherit;
	transform: scale(0);
	opacity: 0;
}
.btn:active:not(:disabled)::after {
	animation: ripple 0.6s ease-out;
}
@keyframes ripple {
	0% {
		transform: scale(0);
		opacity: 1;
	}
	100% {
		transform: scale(1);
		opacity: 0;
	}
}

/* Disabled */
.btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

/* Accessibility: reduced motion */
@media (prefers-reduced-motion: reduce) {
	.btn {
		transition-duration: 0.01ms !important;
	}
	.btn::after,
	.btn:focus-visible {
		animation: none !important;
	}
}
```

### Teacher Notes

- Demonstrate hover/active/focus with keyboard and mouse.
- Ask: Which properties animate? Why `transform` and not `top`?
- Toggle OS “Reduce Motion” and verify no distracting motion.
- Optional: Discuss color-contrast and focus visibility.

---

## 🎨 Exercise 2: Page Load Animations (Staggered Fade-In)

> **✅ Pure CSS - No JavaScript Required**

**Goal**: Content gracefully appears on page load using only CSS.

**Where**: Any HTML page + `styles/animations.css`

**HTML**:

```html
<main>
	<section class="content-section">
		<h2>About Me</h2>
		<p>First section fades in immediately...</p>
	</section>
	<section class="content-section">
		<h2>My Work</h2>
		<p>Second section fades in 0.1s later...</p>
	</section>
	<section class="content-section">
		<h2>Contact</h2>
		<p>Third section fades in 0.2s later...</p>
	</section>
</main>
```

<iframe src="./examples/staggered.html" title="Staggered fade-in demo" style="width:100%;max-width:860px;height:340px;border:1px solid #e5e7eb;border-radius:6px;" loading="lazy"></iframe>

**CSS**:

```css
/* Fade-in animation for all sections */
.content-section {
	animation: fadeInUp var(--duration-slow) var(--ease-out) backwards;
}

/* Stagger delays */
.content-section:nth-child(1) {
	animation-delay: 0.1s;
}
.content-section:nth-child(2) {
	animation-delay: 0.2s;
}
.content-section:nth-child(3) {
	animation-delay: 0.3s;
}
.content-section:nth-child(4) {
	animation-delay: 0.4s;
}
.content-section:nth-child(5) {
	animation-delay: 0.5s;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Reduced motion: instant appearance */
@media (prefers-reduced-motion: reduce) {
	.content-section {
		animation: none;
	}
}
```

### Teacher Notes

- Keep it simple: delay only; do not over-animate.
- Explain `backwards` fill mode prevents initial flicker.
- Compare with/without `prefers-reduced-motion` enabled.
- Extension: Optional JS (Intersection Observer) only if scroll-triggered is required.

---

### ⚠️ Optional JavaScript Enhancement - Scroll-Triggered Animations (Advanced)

> **Requires**: Intersection Observer API (browser support: 95%+ globally)
>
> **When to use**: Only if you need animations triggered by scrolling into view (not on page load)

**JavaScript** (optional enhancement):

```javascript
// utils/scroll-animations.js
function observeAnimations() {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-in');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.1 }
	);

	document.querySelectorAll('[data-animate]').forEach((el) => {
		observer.observe(el);
	});
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	observeAnimations();
});
```

**HTML** (with `data-animate` attribute):

```html
<section class="content-section" data-animate>
	<h2>About Me</h2>
	<p>Content that fades in when scrolled into view...</p>
</section>
```

**CSS** (for JavaScript-triggered animations):

```css
/* Initially hidden */
[data-animate] {
	opacity: 0;
	transform: translateY(30px);
}

/* Animate when .animate-in class is added by JavaScript */
[data-animate].animate-in {
	animation: fadeInUp 0.6s ease-out forwards;
}
```

> **Note**: The pure CSS approach (without JavaScript) is recommended for most cases. Use JavaScript only when you specifically need scroll-triggered animations.

---

## 🎨 Exercise 3: Loading States (Skeleton Screens & Spinners)

> **✅ Pure CSS - No JavaScript Required**

**Goal**: Show progress without frustrating users.

---

### Option A: Skeleton Screen (Preferred for Content)

**HTML**:

```html
<article class="skeleton-card">
	<div class="skeleton skeleton-image"></div>
	<div class="skeleton skeleton-title"></div>
	<div class="skeleton skeleton-text"></div>
	<div class="skeleton skeleton-text"></div>
</article>
```

<iframe src="./examples/skeleton.html" title="Skeleton screen demo" style="width:100%;max-width:640px;height:320px;border:1px solid #e5e7eb;border-radius:6px;" loading="lazy"></iframe>

**CSS**:

```css
/* Base skeleton shimmer animation */
.skeleton {
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: shimmer 1.5s ease-in-out infinite;
	border-radius: 4px;
}

@keyframes shimmer {
	0% {
		background-position: 200% 0;
	}
	100% {
		background-position: -200% 0;
	}
}

/* Skeleton variants */
.skeleton-image {
	width: 100%;
	height: 200px;
}
.skeleton-title {
	width: 70%;
	height: 24px;
	margin: 1rem 0 0.5rem;
}
.skeleton-text {
	width: 100%;
	height: 14px;
	margin-bottom: 0.5rem;
}

/* Complete skeleton card */
.skeleton-card {
	padding: 1rem;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
}

/* Respect motion preferences */
@media (prefers-reduced-motion: reduce) {
	.skeleton {
		animation: pulse 1.5s ease-in-out infinite;
	}
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.6;
		}
	}
}
```

---

### Option B: Spinner (Use Sparingly)

> **Use only for short waits (<3 seconds). Prefer skeleton screens for content loading.**

**HTML**:

```html
<div class="spinner" role="status" aria-label="Loading content"></div>
<p class="sr-only">Loading content, please wait...</p>
```

**CSS**:

```css
.spinner {
	width: 40px;
	height: 40px;
	border: 4px solid rgba(0, 0, 0, 0.1);
	border-left-color: var(--color-primary, #3b82f6);
	border-radius: 50%;
	animation: spin 1s linear infinite;
}
@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

/* Screen reader only text */
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

/* Respect motion preference */
@media (prefers-reduced-motion: reduce) {
	.spinner {
		animation: pulse 1.5s ease-in-out infinite;
	}
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
}
```

### Teacher Notes

- Prefer skeletons for content; spinners only for brief actions (<3s).
- Ask: How can we avoid loaders? (optimistic UI, prefetching, streaming)
- Ensure color contrast and SR-only text is present for accessibility.
- Verify reduced motion still provides clear feedback without rotation.

---

## 🎨 Exercise 4: SVG Animations (Icons & Logos)

> **✅ Pure CSS + SVG - No JavaScript Required**

**Goal**: Animate SVG graphics using pure CSS for professional, scalable animations.

---

### SVG Path Drawing Effect

**HTML** (inline SVG):

```html
<svg class="logo-animated" width="200" height="200" viewBox="0 0 200 200">
	<path class="logo-path" d="M 50 100 Q 100 50 150 100 T 250 100" fill="none" stroke="currentColor" stroke-width="3" />
</svg>
```

<iframe src="./examples/svg-draw.html" title="SVG path draw demo" style="width:100%;max-width:420px;height:220px;border:1px solid #e5e7eb;border-radius:6px;" loading="lazy"></iframe>

**CSS**:

```css
.logo-path {
	stroke-dasharray: 1000;
	stroke-dashoffset: 1000;
	animation: draw 2s ease-out forwards;
}
@keyframes draw {
	to {
		stroke-dashoffset: 0;
	}
}

/* Respect motion preferences */
@media (prefers-reduced-motion: reduce) {
	.logo-path {
		animation: none;
		stroke-dashoffset: 0;
	}
}
```

**How it works**:

- `stroke-dasharray` creates dashed stroke
- `stroke-dashoffset` hides the stroke initially
- Animation brings `stroke-dashoffset` to 0, "drawing" the path

---

### SVG Icon Morphing

**HTML**:

```html
<svg class="icon-morph" width="48" height="48" viewBox="0 0 24 24">
	<circle class="circle-to-square" cx="12" cy="12" r="8" fill="currentColor" />
</svg>
```

**CSS**:

```css
.circle-to-square {
	animation: morph-shape 3s ease-in-out infinite;
	transform-origin: center;
}

@keyframes morph-shape {
	0%,
	100% {
		d: path('M12,4 a8,8 0 1,0 0,16 a8,8 0 1,0 0,-16'); /* Circle */
	}
	50% {
		d: path('M4,4 h16 v16 h-16 z'); /* Square */
	}
}
```

---

### Animated SVG Background Pattern

**HTML**:

```html
<div class="hero-section">
	<svg class="bg-pattern" width="100%" height="100%">
		<defs>
			<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
				<circle cx="20" cy="20" r="2" fill="rgba(59, 130, 246, 0.1)" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#grid)" />
	</svg>
	<h1>Content over animated background</h1>
</div>
```

**CSS**:

```css
.bg-pattern {
	position: absolute;
	inset: 0;
	z-index: -1;
	animation: pattern-slide 20s linear infinite;
}

@keyframes pattern-slide {
	to {
		transform: translate(40px, 40px);
	}
}

/* Hero with relative positioning */
.hero-section {
	position: relative;
	min-height: 400px;
	display: flex;
	align-items: center;
	justify-content: center;
}
```

---

## 🎯 Advanced Practice: Morphing Shapes (CSS clip-path)

**HTML**:

```html
<button class="morph-button">Hover to morph</button>
<div class="shape"></div>
```

```css
.morph-button {
	clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	transition: clip-path 0.5s var(--ease-in-out);
}

.morph-button:hover {
	clip-path: polygon(0 10%, 100% 0, 100% 90%, 0 100%);
}

/* Circle to square morph */
.shape {
	width: 100px;
	height: 100px;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	clip-path: circle(50%);
	transition: clip-path 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.shape:hover {
	clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
```

### Typewriter Effect

**HTML**:

```html
<h2 class="typewriter">Design with motion, not distraction.</h2>
```

```css
.typewriter {
	font-family: monospace;
	overflow: hidden;
	border-right: 2px solid;
	white-space: nowrap;
	animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
	from {
		width: 0;
	}
	to {
		width: 100%;
	}
}
@keyframes blink-caret {
	from,
	to {
		border-color: transparent;
	}
	50% {
		border-color: currentColor;
	}
}
```

### Glitch Effect

**HTML**:

```html
<h2 class="glitch" data-text="GLITCH">GLITCH</h2>
```

```css
.glitch {
	position: relative;
	animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
}
.glitch::before,
.glitch::after {
	content: attr(data-text);
	position: absolute;
	inset: 0;
}
.glitch::before {
	left: 2px;
	text-shadow: -2px 0 #ff00de;
	clip: rect(24px, 550px, 90px, 0);
	animation: glitch-anim 2s infinite linear alternate-reverse;
}
.glitch::after {
	left: -2px;
	text-shadow: -2px 0 #00fff9, 2px 2px #ff00de;
	animation: glitch-anim 2s infinite linear alternate-reverse;
}
@keyframes glitch-anim {
	0% {
		clip: rect(13px, 9999px, 94px, 0);
	}
	5% {
		clip: rect(92px, 9999px, 61px, 0);
	}
	10% {
		clip: rect(69px, 9999px, 40px, 0);
	}
	100% {
		clip: rect(76px, 9999px, 19px, 0);
	}
}
```

### Animated Gradient Text

**HTML**:

```html
<h2 class="gradient-text">Animated Gradient</h2>
```

```css
.gradient-text {
	background: linear-gradient(45deg, #12c2e9, #c471ed, #f64f59, #12c2e9);
	background-size: 300% 300%;
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
	0%,
	100% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
}
```

---

## 🎯 Advanced Practice: Scroll-Driven Animations (Modern CSS)

> **✅ Pure CSS - New in 2024!**
>
> **Browser support**: Chrome 115+, Safari 17+ (as of 2025) - check [caniuse.com](https://caniuse.com/css-scroll-timeline) > **When to use**: Progressive enhancement for modern browsers

**Goal**: Animate based on scroll position WITHOUT JavaScript!

**HTML**:

```html
<div class="hero">
	<h1>Scroll to see parallax effect</h1>
</div>

<div class="reading-progress"></div>
```

<p style="font-size:13px;color:#374151;margin-top:6px;">Check live demo: <a href="./demo/">Scroll-driven animations demo</a></p>

<p style="font-size:13px;color:#374151;margin-top:6px;">Related demo (parallax): <a href="/web-atelier-udit/lessons/en/modern-web-design-trends/demo/01-parallax-scrolling.html">01 — Parallax Scrolling (modern-web-design-trends)</a>. Note: the classic <code>background-attachment: fixed</code> parallax works on desktop but is unreliable on many mobile browsers — prefer transform-based or CSS <code>scroll()</code> timeline techniques and always provide a <code>prefers-reduced-motion</code> fallback for accessibility.</p>

**CSS**:

```css
/* Parallax background */
.hero {
	animation: parallax linear;
	animation-timeline: scroll();
}

@keyframes parallax {
	to {
		transform: translateY(50vh);
	}
}

/* Reading progress bar */
.reading-progress {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 4px;
	background: linear-gradient(to right, #667eea, #764ba2);
	transform-origin: left;
	animation: progressBar linear;
	animation-timeline: scroll();
}

@keyframes progressBar {
	from {
		transform: scaleX(0);
	}
	to {
		transform: scaleX(1);
	}
}
```

---

### ⚠️ JavaScript Fallback for Older Browsers (Optional)

> **Use only if you need to support browsers without `animation-timeline` support**

```javascript
// utils/scroll-fallback.js
if (!CSS.supports('animation-timeline: scroll()')) {
	// JavaScript fallback for older browsers
	window.addEventListener('scroll', () => {
		const scrolled = window.scrollY;
		const total = document.body.scrollHeight - window.innerHeight;
		const progress = scrolled / total;

		document.querySelector('.reading-progress').style.transform = `scaleX(${progress})`;
	});
}
```

---

## 🏆 Expert Challenge: View Transitions API

> **⚠️ JavaScript Required - Cutting-Edge Browser API**
>
> **Browser support**: Chrome 111+, Edge 111+ (as of 2025)
> **When to use**: Advanced SPA page transitions (not achievable with CSS alone)

**The Future**: Smooth transitions between pages in SPAs and MPAs!

```javascript
// Check for browser support
if (document.startViewTransition) {
	document.startViewTransition(() => {
		// Update DOM (e.g., navigate to new view)
		renderNewView();
	});
} else {
	// Fallback: instant navigation
	renderNewView();
}
```

**CSS**:

```css
::view-transition-old(root),
::view-transition-new(root) {
	animation-duration: 0.5s;
}

/* Custom transitions for specific elements */
.hero-image {
	view-transition-name: hero;
}

::view-transition-old(hero),
::view-transition-new(hero) {
	animation-duration: 1s;
	animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

## 📚 Animation Performance Checklist

Before committing animations to your project:

- [ ] **Only animate `transform` and `opacity`** (GPU-accelerated)
- [ ] **Use `will-change` sparingly** (only on hover/interaction)
- [ ] **Implement `prefers-reduced-motion`** (accessibility requirement)
- [ ] **Test on mobile devices** (battery/performance impact)
- [ ] **Avoid animating `width/height/top/left`** (triggers layout)
- [ ] **Use `requestAnimationFrame()` for JS animations**
- [ ] **Debounce scroll listeners** (if using JavaScript)
- [ ] **Set animation budgets** (max 3-4 simultaneous animations)

**Performance testing**:

```bash
# Chrome DevTools > Performance
# Record → Interact → Check for:
# - Frame drops (below 60fps)
# - Layout/Paint operations
# - Memory leaks (increasing heap)
```

---

## 🎓 Atelier Reflection: When NOT to Animate

Animation is a tool, not a requirement. Consider **static design** when:

1. **Content is priority** - Don't distract from reading/critical tasks
2. **Low-end devices** - Respect limited CPU/battery
3. **Professional contexts** - Banking, healthcare, legal sites favor trust over delight
4. **Accessibility concerns** - Motion sensitivity, cognitive load, screen readers
5. **Performance budget** - You've maxed out your bundle size / load time

### 🤔 Atelier Critical Prompt #4

**"Move fast and break things" is a lie.**

In your project journal, reflect:

- Which animations did you remove after testing?
- What static alternatives worked better?
- How did users with disabilities experience your motion?

**Aim**: 80% of your UX should work perfectly with CSS and animations disabled.

---

## 🌍 Real-World Case Studies

### Good: Stripe's Subtle Feedback

- Button hover: 2px lift + shadow (50ms)
- Form validation: Green checkmark fade-in (200ms)
- Page transitions: Cross-fade (300ms)
- **Why it works**: Fast, purposeful, enhances trust

### Bad: Early 2010s Portfolio Sites

- Every element rotating on scroll
- Parallax on parallax
- Text typing character-by-character
- **Why it failed**: Slow, distracting, nausea-inducing

### Excellent: Apple Product Pages

- Scroll-driven product reveals
- Precise timing (synchronized with narrative)
- High-performance (only transform/opacity)
- **Why it's exemplary**: Motion serves storytelling, not ego

---

## 📝 Assignment: Animate Your Portfolio

**Requirements**:

1. **Add 3 types of animations to your project**:

   - Micro-interaction (button/link hover)
   - Page load animation (staggered fade-in)
   - Loading state (skeleton or spinner)

2. **Performance**:

   - Only `transform` and `opacity`
   - Test on mobile (no jank)
   - Document performance metrics

3. **Accessibility**:

   - Implement `prefers-reduced-motion`
   - Test with motion disabled
   - Ensure focus states are clear

4. **Critical Reflection**:
   - Write 2-3 paragraphs in `DESIGN-DECISIONS.md`:
     - Why did you choose these animations?
     - What alternatives did you consider?
     - How do they improve UX?

**Commit**:

```bash
git add src/styles/animations.css src/views/ DESIGN-DECISIONS.md
git commit -m "feat: Add animation system to portfolio

Animations:
- Button micro-interactions (hover lift + ripple)
- Staggered page load fade-in (0.1s delays)
- Skeleton loading for project cards

Performance:
- All animations use transform/opacity only
- will-change on interactive elements only
- Tested: 60fps on iPhone SE 2020

Accessibility:
- prefers-reduced-motion fallback (instant transitions)
- Focus indicators pulse animation
- Keyboard navigation tested

Reflection in DESIGN-DECISIONS.md:
- Motion serves feedback, not decoration
- Removed parallax after vestibular testing
- Static design works better for critical CTA"
```

---

## 🎯 Advanced Optional Challenges

### For Design-Focused Students:

**Challenge 1: Emotion Through Motion**

- Create 3 button styles that convey different emotions:
  - Playful (bounce, wiggle)
  - Serious (subtle, precise)
  - Energetic (pulse, scale)
- **Deliverable**: Codepen + 1-page design rationale

**Challenge 2: Brand Animation System**

- Define motion design tokens for a brand (Airbnb, Nike, your project)
- **Deliverable**: CSS variables for durations, easings, patterns

### For Code-Focused Students:

**Challenge 3: Web Animations API (WAAPI)** ⚠️ _JavaScript Required_

> **When to use**: Complex animations requiring programmatic control (play/pause/reverse)

- Rewrite a CSS animation using JavaScript:

```javascript
// utils/waapi-example.js
const element = document.querySelector('.animated-element');

const animation = element.animate(
	[
		{ transform: 'scale(1)', opacity: 1 },
		{ transform: 'scale(1.2)', opacity: 0.8 },
		{ transform: 'scale(1)', opacity: 1 },
	],
	{
		duration: 600,
		easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
		iterations: Infinity,
	}
);

// Control animations programmatically
animation.pause();
animation.play();
animation.reverse();
```

- **Deliverable**: Interactive demo + performance comparison (CSS vs WAAPI)
- **Compare**: CPU usage, frame rate, bundle size

**Challenge 4: Intersection Observer Animations** ⚠️ _JavaScript Required_

> **Pure CSS alternative**: Use `animation-delay` on page load (see Exercise 2)
> **Use JavaScript only if**: You need scroll-triggered animations (not load animations)

- Animate sections only when visible in viewport
- **Deliverable**: Reusable `animateOnScroll()` utility function

### For Advanced Students:

**Challenge 5: Physics-Based Animations** ⚠️ _JavaScript + Library Required_

> **Libraries**: Popmotion, Framer Motion, React Spring
> **Bundle size**: ~10-30KB (consider performance trade-offs)

- Implement spring physics for natural movement
- **Deliverable**: Natural-feeling drag-and-drop interface
- **Reflect**: Was the bundle size worth it? Could CSS have achieved similar results?

**Challenge 6: SVG Path Animations** ✅ _Pure CSS_

> **Recommended**: This is achievable with pure CSS! (see Exercise 4)

- Animate SVG `<path>` using `stroke-dasharray` and `stroke-dashoffset`
- **Deliverable**: Animated logo or icon that draws on page load
- **Bonus**: Add `prefers-reduced-motion` fallback

---

## 📚 Further Learning

### Essential Reading

- **Material Design Motion**: [motion.material.io](https://material.io/design/motion)
- **Refactoring UI**: Animation chapter (design principles)
- **Val Head**: _Designing Interface Animation_ (O'Reilly)
- **Rachel Nabors**: _Animation at Work_ (A Book Apart)

### Tools & Playgrounds

- **Cubic Bezier**: [cubic-bezier.com](https://cubic-bezier.com) - Easing curve editor
- **Animista**: [animista.net](https://animista.net) - CSS animation library
- **Lottie**: [airbnb.design/lottie](https://airbnb.design/lottie) - After Effects to web
- **GSAP**: [greensock.com/gsap](https://greensock.com/gsap) - JavaScript animation library

### Standards & Specs

- **MDN: CSS Animations**: [mdn.io/css-animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- **WCAG 2.1**: Animation & Motion (Success Criterion 2.3.3)
- **View Transitions API**: [github.com/WICG/view-transitions](https://github.com/WICG/view-transitions)

---

## 🎓 Atelier Final Reflection

> "The best animation is invisible. Users should feel the flow, not study the technique." — Anonymous

By completing this lesson, you've learned:

1. ✅ **Technical mastery** - CSS transitions, keyframes, transforms
2. ✅ **Performance awareness** - GPU acceleration, will-change, reduced motion
3. ✅ **Accessibility commitment** - Motion preferences, cognitive load
4. ✅ **Critical thinking** - When to animate (and when not to)
5. ✅ **Professional practice** - Design systems, documentation, testing

**You are now equipped to make the web more delightful AND more inclusive.**

---

## 📝 Commit Your Learning

```bash
git add .
git commit -m "feat: Complete Web Animations mastery

Theory:
- Understand transitions, keyframes, transforms
- Master timing functions and easing
- Learn performance optimization techniques

Practice:
- Built animation system with design tokens
- Implemented micro-interactions (buttons)
- Created loading states (skeleton, spinner)
- Added page load animations (staggered)

Accessibility:
- All animations respect prefers-reduced-motion
- Tested with motion disabled
- Documented accessibility decisions

Critical Reflection:
- Animation serves purpose, not decoration
- Performance budget enforced
- Users with vestibular disorders considered

Portfolio: Now has delightful, accessible motion ✨"
```

---

**🎨 Atelier Philosophy:**
_"Animation is not decoration. It is communication. Move with purpose. Delight with restraint. Always ask: does this motion serve my users, or only my ego?"_

— Prof. Rubén Vega Balbás, PhD

---

**Next Steps:**

- Review [JavaScript Modules]({{ base_url }}/lessons/en/js-modules/) to organize animation code modularly
- Study accessibility guidelines (WCAG 2.1) for motion and animation
- Explore performance optimization tools (Chrome DevTools, Lighthouse)
- Practice SVG animation techniques for logos and icons
- Learn more about CSS `scroll()` timeline for scroll-driven animations

**Let's make the web a beautiful AND usable virtual ecosystem!**
