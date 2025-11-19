---
layout: lesson
title: 'Web Animations with CSS – From Basics to Advanced Techniques'
title_alt: 'Animaciones Web con CSS – De lo Básico a lo Avanzado'
slug: web-animations-css
date: 2025-11-18
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/web-animations/css/
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

## ⏰ Estimated Duration

120 minutes (2 sessions or 1 extended workshop)

## 🎯 Learning Objectives

By the end of this lesson, you will be able to:

- **Explore** CSS animation capabilities through hands-on experimentation
- **Apply** transitions, keyframes, and transforms to create engaging user experiences
- **Understand** the performance implications of different animation properties
- **Implement** advanced techniques like SVG animations and scroll-driven effects
- **Evaluate** when to use CSS vs JavaScript for animations
- **Create** accessible, performant animations that respect user preferences

---

## 🎭 Atelier Approach: Critical Coding with Motion

Following our [atelier methodology](https://ruvebal.github.io/web-atelier-udit/methodology/en/), this lesson embraces **critical coding** through a five-phase cycle:

1. **🔍 Exploration** → Experiment with each animation technique in isolated demos
2. **💭 Reflection** → Understand _why_ animations work and their impact on UX
3. **📚 Conceptualization** → Connect practice to design theory, performance, and accessibility
4. **🛠️ Production** → Build animations for your personal project
5. **🎪 Exhibition** → Share and critique animation choices in your work

> **Motion is not decoration—it's communication.**
> Every animation should have a purpose: guide attention, provide feedback, or enhance understanding.

---

## 📖 Introduction

CSS3 animations enable web developers and designers to create smooth, dynamic visual effects directly in CSS, often eliminating the need for JavaScript. This lesson covers foundational techniques and advanced methods, ensuring you can make informed decisions about when and how to animate.

---

## 🎓 Part I: Foundational Techniques

These core animation techniques form the building blocks of web motion design. Master these before moving to advanced methods.

---

### **1. Transitions**

**📂 Demo:** [demo/01-transitions.html](./demo/01-transitions.html)

- **What It Is**: A CSS feature that smoothly animates changes in property values over a specified duration.
- **How It Works**: You specify which properties should transition (e.g., `background-color`) and how long the animation should last.
- **Example**:
  - **HTML**: A box that changes color when hovered.
  - **CSS**:
    ```css
    .box {
    	background-color: blue;
    	transition: background-color 0.5s ease;
    }
    .box:hover {
    	background-color: red;
    }
    ```
  - **Key Points**:
    - `transition` defines the duration and easing of the animation.
    - Triggered by events like `hover` or `focus`.

---

### **2. Keyframes**

**📂 Demo:** [demo/02-keyframes.html](./demo/02-keyframes.html)

- **What It Is**: A CSS rule (`@keyframes`) used to define intermediate steps in an animation.
- **How It Works**: You create keyframes that specify how an element should look at various points in time during the animation.
- **Example**:
  - **HTML**: A box sliding in from the left.
  - **CSS**:
    ```css
    @keyframes slideIn {
    	from {
    		transform: translateX(-100%);
    	}
    	to {
    		transform: translateX(0);
    	}
    }
    .box {
    	animation: slideIn 1s ease;
    }
    ```
  - **Key Points**:
    - Use `@keyframes` to define the animation behavior.
    - Apply the animation using the `animation` property, specifying the name, duration, and easing.

---

### **3. Transformations**

**📂 Demo:** [demo/03-transformations.html](./demo/03-transformations.html)

- **What It Is**: The `transform` property modifies the shape, size, position, or rotation of an element.
- **How It Works**: You can rotate, scale, skew, or translate an element, often combined with transitions or animations.
- **Example**:
  - **HTML**: A box rotates and scales when hovered.
  - **CSS**:
    ```css
    .box:hover {
    	transform: rotate(45deg) scale(1.2);
    	transition: transform 0.5s;
    }
    ```
  - **Key Points**:
    - `rotate(deg)` rotates an element.
    - `scale(x, y)` resizes the element.
    - `transition` makes the transformation smooth.

---

### **4. Infinite Animations**

**📂 Demo:** [demo/04-infinite-animations.html](./demo/04-infinite-animations.html)

- **What It Is**: Animations that loop indefinitely using the `animation-iteration-count: infinite` property.
- **How It Works**: Define the animation using keyframes, then set it to repeat.
- **Example**:
  - **HTML**: A spinning box.
  - **CSS**:
    ```css
    @keyframes spin {
    	from {
    		transform: rotate(0deg);
    	}
    	to {
    		transform: rotate(360deg);
    	}
    }
    .box {
    	animation: spin 2s linear infinite;
    }
    ```
  - **Key Points**:
    - Use `infinite` to loop the animation.
    - Control the speed and easing with `animation-duration` and `animation-timing-function`.

---

## 🚀 Part II: Advanced Techniques

These sophisticated methods are for students ready to push beyond basics and create production-quality, performant animations.

---

### **5. Text Animations**

**📂 Demo:** [demo/05-text-animations.html](./demo/05-text-animations.html)

- **What It Is**: Applying animations to text properties like `text-shadow`, color, or position to make text visually dynamic.
- **How It Works**: Define a glowing effect, typewriter animation, or fade-in using keyframes.
- **Example**:
  - **HTML**: Text glows in and out.
  - **CSS**:
    ```css
    @keyframes glow {
    	0%,
    	100% {
    		text-shadow: 0 0 10px blue;
    	}
    	50% {
    		text-shadow: 0 0 20px cyan;
    	}
    }
    .text {
    	animation: glow 1.5s ease-in-out infinite;
    }
    ```
  - **Key Points**:
    - Use `text-shadow` for glowing effects.
    - Combine `infinite` and easing for smooth, looping animations.

---

### **6. Background Animations**

**📂 Demo:** [demo/06-background-animations.html](./demo/06-background-animations.html)

- **What It Is**: Animate background properties like color, gradient, or position.
- **How It Works**: Use `background-position` with keyframes to create moving effects.
- **Example**:
  - **HTML**: A gradient background moves continuously.
  - **CSS**:
    ```css
    @keyframes backgroundMove {
    	from {
    		background-position: 0 0;
    	}
    	to {
    		background-position: 200% 0;
    	}
    }
    .box {
    	background: linear-gradient(to right, red, yellow, green, blue);
    	background-size: 200% 100%;
    	animation: backgroundMove 3s linear infinite;
    }
    ```
  - **Key Points**:
    - Use gradients and `background-size` for smooth movement.
    - `background-position` shifts the gradient over time.

---

### **7. Staggered Animations**

**📂 Demo:** [demo/07-staggered-animations.html](./demo/07-staggered-animations.html)

- **What It Is**: Delaying animations for multiple elements to create a sequenced effect.
- **How It Works**: Use `animation-delay` for each child element to start their animations at different times.
- **Example**:
  - **HTML**: A set of boxes animating one after another.
  - **CSS**:
    ```css
    .box:nth-child(1) {
    	animation-delay: 0s;
    }
    .box:nth-child(2) {
    	animation-delay: 0.2s;
    }
    .box:nth-child(3) {
    	animation-delay: 0.4s;
    }
    @keyframes fadeIn {
    	from {
    		opacity: 0;
    	}
    	to {
    		opacity: 1;
    	}
    }
    .box {
    	animation: fadeIn 1s ease-in;
    }
    ```
  - **Key Points**:
    - `nth-child(n)` applies styles to specific child elements.
    - `animation-delay` creates staggered effects.

---

### **8. Morphing Shapes**

**📂 Demo:** [demo/08-morphing-shapes.html](./demo/08-morphing-shapes.html)

- **What It Is**: Animates an element’s shape by modifying properties like `border-radius` or `clip-path`.
- **How It Works**: Use `border-radius` in keyframes to change the shape over time.
- **Example**:
  - **HTML**: A box morphing into a circle and back.
  - **CSS**:
    ```css
    @keyframes morph {
    	0% {
    		border-radius: 0%;
    	}
    	50% {
    		border-radius: 50%;
    	}
    	100% {
    		border-radius: 0%;
    	}
    }
    .box {
    	animation: morph 2s infinite;
    }
    ```
  - **Key Points**:
    - `border-radius` changes a square into a circle.
    - Keyframes allow complex shape transitions.

---

### **9. SVG Animations**

**📂 Demo:** [demo/09-svg-animations.html](./demo/09-svg-animations.html)

- **What It Is**: Animating Scalable Vector Graphics using CSS or SMIL (Synchronized Multimedia Integration Language).
- **How It Works**: Apply animations to SVG paths, shapes, and attributes for resolution-independent motion.
- **Example**:
  - **SVG**: Animated logo with path drawing effect.
  - **CSS**:
    ```css
    .logo-path {
    	stroke-dasharray: 1000;
    	stroke-dashoffset: 1000;
    	animation: draw 3s ease-in-out forwards;
    }
    @keyframes draw {
    	to {
    		stroke-dashoffset: 0;
    	}
    }
    ```
  - **Key Points**:
    - `stroke-dasharray` and `stroke-dashoffset` create the drawing effect.
    - SVGs scale perfectly on all screens.
    - Great for icons, illustrations, and logos.

> **💡 Beyond CSS for SVG Animations:**
> While CSS can animate SVG properties, **complex SVG morphing, sequencing, and physics-based animations** benefit significantly from JavaScript animation libraries like **GSAP (GreenSock Animation Platform)**. GSAP provides:
>
> - **MorphSVG Plugin**: Smoothly morph between completely different SVG shapes
> - **DrawSVG Plugin**: More control over path drawing than CSS `stroke-dashoffset`
> - **Timeline Sequencing**: Orchestrate complex multi-element choreography
> - **Cross-browser Consistency**: Eliminates CSS animation quirks across browsers
> - **Physics & Easing**: Advanced easing functions and physics-based motion
>
> **When to use CSS vs GSAP for SVG:**
>
> - **CSS**: Simple transforms, opacity, basic path drawing, hover states
> - **GSAP**: Complex morphing, sequenced choreography, interactive animations, production-grade projects
>
> See our [GSAP Animation lesson](../gsap/) for advanced techniques.

---

### **10. Scroll-Driven Animations**

**📂 Demo:** [demo/10-scroll-driven.html](./demo/10-scroll-driven.html)

- **What It Is**: Modern CSS animations that respond to scroll position using `animation-timeline: scroll()`.
- **How It Works**: Animations progress based on viewport scroll rather than time.
- **Example**:
  - **HTML**: Reading progress bar or parallax hero section.
  - **CSS**:
    ```css
    @supports (animation-timeline: scroll()) {
    	.progress-bar {
    		animation: grow linear;
    		animation-timeline: scroll();
    	}
    	@keyframes grow {
    		from {
    			transform: scaleX(0);
    		}
    		to {
    			transform: scaleX(1);
    		}
    	}
    }
    ```
  - **Key Points**:
    - New feature with growing browser support (progressive enhancement).
    - Falls back gracefully with JavaScript for older browsers.
    - Reduces JavaScript for scroll-based effects.

---

## 🎯 When CSS Animations Need JavaScript Triggers

**📂 Demo:** [demo/11-intersection-observer.html](./demo/11-intersection-observer.html)

While CSS provides powerful animation capabilities, **most animations don't start automatically**—they need to be triggered. Understanding when and how to trigger animations is crucial for creating effective, performant user experiences.

### The Problem: Animations Without Triggers

Consider this common scenario:

```css
.feature-card {
	opacity: 0;
	animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
```

**Issue**: This animation starts immediately when the page loads, even if the `.feature-card` is far down the page where users can't see it. By the time users scroll to it, the animation has already finished.

### Solution 1: Intersection Observer API (Recommended)

The **Intersection Observer API** is the modern, performant way to trigger animations when elements enter the viewport.

#### How It Works

```javascript
// 1. Define what happens when element is visible
const observerOptions = {
	root: null, // viewport
	rootMargin: '0px',
	threshold: 0.1, // trigger when 10% visible
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			// Element is visible - add animation class
			entry.target.classList.add('animate-in');

			// Optional: stop observing after animation triggers once
			observer.unobserve(entry.target);
		}
	});
}, observerOptions);

// 2. Observe all elements you want to animate
document.querySelectorAll('.feature-card').forEach((card) => {
	observer.observe(card);
});
```

#### CSS Setup

```css
/* Initial state: invisible and positioned */
.feature-card {
	opacity: 0;
	transform: translateY(30px);
	transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

/* Triggered state: visible and in place */
.feature-card.animate-in {
	opacity: 1;
	transform: translateY(0);
}
```

#### Why Intersection Observer?

✅ **Performant**: Runs on the main thread but doesn't require scroll listeners
✅ **Battery-friendly**: Only checks when elements cross visibility boundaries
✅ **Flexible**: Configure visibility thresholds, root margins, and multiple roots
✅ **Clean**: Separates observation logic from animation styling
✅ **Reliable**: Works correctly with lazy-loaded content and dynamic DOM changes

### Solution 2: CSS-Only Alternatives (Limited Cases)

#### A. Scroll-Driven Animations (Modern Browsers)

```css
@supports (animation-timeline: view()) {
	.feature-card {
		animation: fadeInUp linear;
		animation-timeline: view();
		animation-range: entry 0% cover 30%;
	}
}
```

**Pros**: No JavaScript required
**Cons**: Limited browser support (Chrome 115+), less control over trigger point

#### B. `:hover`, `:focus`, `:active` States

```css
.button {
	transition: transform 0.3s;
}

.button:hover {
	transform: scale(1.05);
}
```

**Good for**: User-initiated interactions
**Not suitable for**: Scroll-based reveals, page load animations

### Solution 3: Legacy Scroll Listeners (Avoid if Possible)

Before Intersection Observer, developers used scroll event listeners:

```javascript
// ⚠️ NOT RECOMMENDED - Performance issues
window.addEventListener('scroll', () => {
	const cards = document.querySelectorAll('.feature-card');
	cards.forEach((card) => {
		const rect = card.getBoundingClientRect();
		if (rect.top < window.innerHeight) {
			card.classList.add('animate-in');
		}
	});
});
```

**Problems**:

- ❌ Fires continuously during scroll (100+ times per second)
- ❌ Causes layout thrashing if not debounced properly
- ❌ Drains battery on mobile devices
- ❌ Blocks main thread execution

**Modern replacement**: Use Intersection Observer instead.

### Common Animation Trigger Patterns

| Use Case                        | Best Solution              | Implementation                                       |
| ------------------------------- | -------------------------- | ---------------------------------------------------- |
| Element enters viewport         | Intersection Observer      | Observe with threshold, add class on intersection    |
| User interaction (hover, click) | CSS pseudo-classes         | `:hover`, `:focus`, `:active`                        |
| Page load                       | CSS animation on load      | Add class to `<body>` when DOM ready                 |
| Scroll progress                 | Scroll-driven CSS (modern) | `animation-timeline: scroll()`                       |
| Time-based sequence             | JavaScript `setTimeout`    | Chain animations with delays                         |
| User gesture (swipe, drag)      | JavaScript event handlers  | `touchstart`, `mousedown` + transform                |
| Form validation feedback        | Class toggle on validation | Add/remove `.error` or `.success` classes            |
| Modal/dialog open               | CSS animation + ARIA       | Toggle `.is-open` class with `aria-hidden` attribute |

### Practical Example: Staggered Card Reveal

```html
<div class="card-grid">
	<article class="card" data-delay="0">Card 1</article>
	<article class="card" data-delay="100">Card 2</article>
	<article class="card" data-delay="200">Card 3</article>
</div>
```

```css
.card {
	opacity: 0;
	transform: translateY(30px);
	transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.card.animate-in {
	opacity: 1;
	transform: translateY(0);
}
```

```javascript
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const delay = entry.target.dataset.delay || 0;
				setTimeout(() => {
					entry.target.classList.add('animate-in');
				}, delay);
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.2 }
);

document.querySelectorAll('.card').forEach((card) => observer.observe(card));
```

### Browser Support & Polyfills

**Intersection Observer**: Supported in all modern browsers (IE11 requires polyfill)

```html
<!-- Polyfill for older browsers -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>
```

**Scroll-driven animations**: Chrome/Edge 115+, limited support elsewhere

```css
/* Progressive enhancement with feature detection */
@supports (animation-timeline: scroll()) {
	/* Modern browsers get smooth scroll animations */
}

@supports not (animation-timeline: scroll()) {
	/* Fallback for older browsers (maybe Intersection Observer) */
}
```

### Debugging Tips

1. **Visualize Intersection Observer thresholds**:

```javascript
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			console.log(`${entry.target.id}: ${entry.intersectionRatio.toFixed(2)} visible`);
		});
	},
	{ threshold: [0, 0.25, 0.5, 0.75, 1] }
);
```

2. **Add debug borders** to see observer root margins:

```css
.observed-element {
	outline: 2px dashed red; /* Remove after debugging */
}
```

3. **Test with reduced motion** to ensure fallbacks work:

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
	// Skip animations or use instant transitions
	document.body.classList.add('reduce-motion');
}
```

### Key Takeaways

- **CSS defines HOW elements animate**, JavaScript decides **WHEN**
- **Intersection Observer** is the standard for viewport-triggered animations
- **Scroll listeners are legacy** and should be avoided for animation triggers
- **Respect user preferences** with `prefers-reduced-motion`
- **Progressive enhancement**: Modern CSS scroll-driven animations with JS fallbacks
- **Separation of concerns**: Keep animation styling in CSS, triggering logic in JS

---

## 🎨 Design Principles for Motion

### When to Animate

✅ **Good Reasons:**

- **Feedback**: Confirm user actions (button clicks, form submissions)
- **Guidance**: Direct attention to important elements
- **Continuity**: Show spatial or hierarchical relationships
- **Personality**: Reinforce brand identity

❌ **Avoid Animating:**

- Just for decoration without purpose
- Elements that distract from core content
- Critical UI that users need immediately

### Duration Guidelines

| Duration   | Use Case           | Example                             |
| ---------- | ------------------ | ----------------------------------- |
| 100-200ms  | Micro-interactions | Button hover, checkbox toggle       |
| 200-500ms  | UI transitions     | Modal open, dropdown menu           |
| 500-1000ms | Page transitions   | Route changes, hero animations      |
| 1000ms+    | Ambient animations | Background patterns, loading states |

---

## ⚡ Performance Considerations

### Hardware-Accelerated Properties

**Fast** (GPU-accelerated):

- `transform` (translate, scale, rotate, skew)
- `opacity`
- `filter` (with caution)

**Slow** (triggers layout/paint):

- `top`, `left`, `right`, `bottom`
- `width`, `height`
- `margin`, `padding`
- `background-position` (use `transform` instead)

### Best Practices

```css
/* ✅ GOOD: GPU-accelerated */
.element {
	transform: translateY(20px);
	opacity: 0;
	transition: transform 0.3s, opacity 0.3s;
}

/* ❌ BAD: Causes reflow */
.element {
	top: 20px;
	display: none;
	transition: top 0.3s;
}

/* ✅ GOOD: Specify what to animate */
.button {
	transition: background-color 0.2s ease-in-out;
}

/* ❌ BAD: Animates everything */
.button {
	transition: all 0.2s;
}
```

---

## ♿ Accessibility: Respecting User Preferences

Always respect the `prefers-reduced-motion` media query for users with vestibular disorders or motion sensitivity:

```css
/* Default: full animations */
.animated {
	animation: slide 1s ease-in-out;
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
	.animated {
		animation: none;
		/* Provide instant state change instead */
	}
	* {
		animation-duration: 0.01ms !important;
		transition-duration: 0.01ms !important;
	}
}
```

**Accessibility Checklist:**

- ✅ Provide reduced-motion fallbacks
- ✅ Ensure animations don't prevent access to content
- ✅ Don't rely solely on animation to convey information
- ✅ Avoid flashing content that could trigger seizures (< 3 flashes/sec)

---

## 🛠️ Practice Exercise: Animate Your Portfolio

**Task**: Apply animations to your personal project repository.

### Requirements:

1. **Basic** (Required):

   - Add hover transitions to all interactive elements (buttons, links)
   - Implement a staggered fade-in for page sections on load
   - Use transforms for card lift effects

2. **Advanced** (Optional):

   - Create a custom loading animation
   - Add scroll-driven reading progress bar
   - Animate SVG logo with path drawing
   - Implement morphing shapes for navigation icons

3. **Documentation**:
   - Commit with message: `feat: add CSS animations to [component]`
   - Document animation choices in your project journal
   - Explain _why_ each animation serves the user experience

### Evaluation Criteria:

| Criterion     | Weight | Description                                    |
| ------------- | ------ | ---------------------------------------------- |
| Purpose       | 30%    | Animations serve UX goals, not just decoration |
| Performance   | 25%    | Uses GPU-accelerated properties                |
| Accessibility | 25%    | Respects `prefers-reduced-motion`              |
| Execution     | 20%    | Smooth, polished, bug-free                     |

---

## 📚 Further Resources

### References

- **MDN Web Docs**: [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- **Web Animation Performance**: [Google Developers Guide](https://developers.google.com/web/fundamentals/performance/rendering)
- **Scroll-Driven Animations**: [Chrome Developer Blog](https://developer.chrome.com/articles/scroll-driven-animations/)

### Inspiration

- [CSS Animation Rocks](https://cssanimation.rocks/)
- [Codrops CSS Reference](https://tympanus.net/codrops/css_reference/)
- [UI Movement](https://uimovement.com/) - Design animation patterns

### Tools

- [Cubic Bezier Generator](https://cubic-bezier.com/) - Custom easing curves
- [Animista](https://animista.net/) - Ready-made animation library
- [Keyframes.app](https://keyframes.app/) - Visual animation editor

---

## 🎯 Summary & Key Takeaways

### Essential Concepts

1. **Transitions** smooth property changes triggered by state (hover, focus)
2. **Keyframes** define multi-step animations with explicit control
3. **Transforms** manipulate elements without triggering layout recalculation
4. **Performance** matters: use `transform` and `opacity` for smooth 60fps animations
5. **Accessibility** is not optional: respect user preferences and provide fallbacks

### Pro Tips

- **Start subtle**: Animations should enhance, not overwhelm
- **Design with intent**: Every animation should answer "why?"
- **Test on devices**: What runs smoothly on desktop may lag on mobile
- **Iterate based on feedback**: Watch users interact with your animations
- **Keep learning**: New CSS features like View Transitions API are coming

---

## 💬 Reflection Questions

Before moving on, consider:

1. Which animations in the demos felt purposeful vs purely decorative?
2. How do animations affect the perceived performance of a site?
3. When might JavaScript animations be more appropriate than CSS?
4. How can motion design reinforce your project's identity and values?

---

## 🎪 Exhibition: Share Your Work

Once you've implemented animations in your project:

1. **Deploy** your updated site to GitHub Pages
2. **Document** your animation strategy in your project README
3. **Present** (2 minutes) one animation you're proud of and explain its UX purpose
4. **Critique** a peer's work: Does the motion serve the user or distract?

Remember: **Motion is a design tool, not a decoration.** Use it wisely.

---

**Next Lesson**: [GSAP Animation Mastery – From Zero to Production](../gsap/)

**License**: Content CC BY-NC-SA 4.0 · Code MIT
**Author**: Rubén Vega Balbás, PhD · [UDIT](https://www.udit.es)
