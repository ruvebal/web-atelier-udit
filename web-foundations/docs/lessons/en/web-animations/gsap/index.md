---
layout: lesson
title: 'GSAP Animation Mastery – From Zero to Production'
title_alt: 'Dominio de Animaciones GSAP – De Cero a Producción'
slug: web-animations-gsap
date: 2025-11-19
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/web-animations/gsap/
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

## ⏰ Estimated Duration

180 minutes (3 sessions or 2 extended workshops)

## 🎯 Learning Objectives

By the end of this lesson, you will be able to:

- **Integrate** GSAP into projects using both CDN and npm/node workflows
- **Create** sophisticated timeline-based animations with precise control
- **Animate** SVG elements with morphing, drawing, and complex transformations
- **Implement** scroll-triggered animations using ScrollTrigger plugin
- **Build** production-quality interactive experiences
- **Debug** and optimize GSAP animations for 60fps performance
- **Evaluate** when GSAP provides advantages over CSS animations

---

## 🎭 Atelier Approach: From Discovery to Mastery

Following our [atelier methodology](https://ruvebal.github.io/web-atelier-udit/methodology/en/), this lesson embraces **critical coding through motion**:

1. **🔍 Exploration** → Experiment with GSAP's API through progressive demos
2. **💭 Reflection** → Understand _why_ GSAP exists and when CSS isn't enough
3. **📚 Conceptualization** → Connect JavaScript animation to design systems and UX
4. **🛠️ Production** → Build complex animations for your portfolio project
5. **🎪 Exhibition** → Share animated prototypes and critique timing/easing choices

> **"Animation is not about moving things. It's about moving people."**
> — Every designer who realized their beautiful static Figma mockup is dead until it breathes

---

## 📖 Introduction: Why GSAP?

### The CSS Limitation Wall

You've learned CSS animations. They're great for simple transitions and basic keyframe sequences. But eventually, every designer hits the wall:

- **"How do I sequence 10 animations with different start times?"** → CSS delays become unmaintainable
- **"Can I morph this circle into a star shape?"** → CSS can't interpolate SVG paths
- **"I need this to start when scrolling reaches 40%"** → CSS scroll-timeline has poor browser support
- **"Why does this animate differently in Safari?"** → CSS animation inconsistencies are frustrating

### Enter GSAP (GreenSock Animation Platform)

**GSAP** is the Swiss Army knife of web animation. Used by companies like Google, Adobe, Nike, and Apple, it's the industry standard for production-grade animations.

**What makes GSAP special:**

```javascript
// This is all you need to animate anything, anywhere
gsap.to('.box', { x: 100, rotation: 360, duration: 1 });
```

- **Performance**: Optimized beyond what CSS can achieve
- **Control**: Timelines that sequence, overlap, and sync animations perfectly
- **Compatibility**: Works identically across all browsers (including old Safari)
- **Power**: Animate SVG morphing, scroll effects, canvas, WebGL, CSS, anything
- **Ecosystem**: Plugins for ScrollTrigger, Draggable, MorphSVG, and more

---

## 🚀 Part I: Foundation (Getting Started)

### Installation Methods: CDN vs npm

GSAP works with both modern build tools and classic HTML. Choose based on your project.

#### Method 1: CDN (Quick Start, Prototypes)

Perfect for experiments, CodePen, or adding animations to existing sites without a build process.

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>GSAP CDN Demo</title>
		<style>
			.box {
				width: 100px;
				height: 100px;
				background: hotpink;
				border-radius: 8px;
			}
		</style>
	</head>
	<body>
		<div class="box"></div>

		<!-- GSAP Core -->
		<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>

		<!-- GSAP Plugins (optional) -->
		<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

		<script>
			// Register plugins
			gsap.registerPlugin(ScrollTrigger);

			// Animate!
			gsap.to('.box', {
				x: 200,
				rotation: 360,
				duration: 2,
				ease: 'power2.inOut',
			});
		</script>
	</body>
</html>
```

**✅ Pros:** Instant setup, no build tools, great for learning
**❌ Cons:** No tree-shaking, manual version updates, limited offline work

---

#### Method 2: npm (Production Projects)

For modern projects with build tools (Vite, Webpack, Parcel, etc.).

**1. Install GSAP:**

```bash
npm install gsap
```

**2. Import and use in your JavaScript:**

```javascript
// main.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Animate!
gsap.to('.box', {
	x: 200,
	rotation: 360,
	duration: 2,
	ease: 'power2.inOut',
});
```

**3. Project structure:**

```
my-project/
├── index.html
├── src/
│   ├── main.js         ← Your GSAP animations
│   └── styles.css
├── package.json
└── vite.config.js      ← or webpack/parcel config
```

**✅ Pros:** Tree-shaking (smaller bundles), version control, ES modules, works offline
**❌ Cons:** Requires Node.js setup, build step adds complexity

> 💡 **Recommendation for this course:** Start with CDN to focus on learning GSAP's API. Migrate to npm when building your portfolio project.

---

### Core Concepts: Tweens and Timelines

#### Tweens: The Building Blocks

A **tween** (short for "in-between") animates properties from one value to another.

```javascript
// Basic tween methods
gsap.to(target, vars); // Animate TO values
gsap.from(target, vars); // Animate FROM values
gsap.fromTo(target, fromVars, toVars); // Explicit start and end

// Examples
gsap.to('.box', { x: 100, duration: 1 }); // Move right
gsap.from('.box', { opacity: 0, duration: 1 }); // Fade in
gsap.fromTo('.box', { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 1 });
```

**Animatable Properties:**

```javascript
gsap.to('.element', {
	// CSS transforms (faster!)
	x: 100, // translateX
	y: 50, // translateY
	rotation: 45, // rotate in degrees
	scale: 1.5, // uniform scale
	scaleX: 2, // horizontal stretch

	// CSS properties
	opacity: 0.5,
	backgroundColor: '#ff0000',
	borderRadius: '50%',

	// SVG attributes
	attr: { cx: 100, cy: 50, r: 30 },

	// Timing
	duration: 2, // seconds
	delay: 0.5, // delay before start
	ease: 'power2.out', // easing function

	// Callbacks
	onStart: () => console.log('Started!'),
	onComplete: () => console.log('Done!'),
	onUpdate: () => console.log('Animating...'),
});
```

---

#### Timelines: Sequencing Made Simple

**Problem with plain JavaScript:**

```javascript
// ❌ Callback hell
gsap.to('.box1', {
	x: 100,
	duration: 1,
	onComplete: () => {
		gsap.to('.box2', {
			y: 100,
			duration: 1,
			onComplete: () => {
				gsap.to('.box3', { rotation: 360, duration: 1 });
			},
		});
	},
});
```

**Solution with GSAP Timeline:**

```javascript
// ✅ Clean and maintainable
const tl = gsap.timeline();

tl
	.to('.box1', { x: 100, duration: 1 })
	.to('.box2', { y: 100, duration: 1 })
	.to('.box3', { rotation: 360, duration: 1 });
```

**Timeline Superpowers:**

```javascript
const tl = gsap.timeline({
	defaults: { duration: 1, ease: 'power2.inOut' }, // Apply to all children
	repeat: 2, // Repeat the entire sequence
	yoyo: true, // Play forward then backward
	paused: true, // Start paused (control with JS)
});

// Relative positioning
tl
	.to('.a', { x: 100 })
	.to('.b', { x: 100 }, '-=0.5') // Start 0.5s before previous ends
	.to('.c', { x: 100 }, '<') // Start with previous
	.to('.d', { x: 100 }, '>'); // Start after previous (default)

// Labels for complex timing
tl
	.add('sceneOne')
	.to('.hero', { scale: 1.2, duration: 1 })
	.to('.title', { opacity: 1, y: 0 }, 'sceneOne+=0.5') // 0.5s after label
	.add('sceneTwo', '+=1')
	.to('.hero', { scale: 1, duration: 1 }, 'sceneTwo');

// Control the timeline
tl.play(); // Play from current position
tl.pause(); // Pause
tl.restart(); // Start from beginning
tl.reverse(); // Play backward
tl.seek(2); // Jump to 2 seconds
tl.timeScale(2); // Double speed
```

---

**📂 Demo:** [demo/01-tweens-and-timelines.html](./demo/01-tweens-and-timelines.html)

> **Anonymous Designer Quote:** > _"I spent 3 hours nesting setTimeout calls and crying. Then I learned about GSAP timelines and realized I could've been home by lunch. The tears were wasted."_

---

## 🎨 Part II: Intermediate Techniques

### Easing: The Soul of Animation

**Easing functions** control the _rate of change_ during an animation. They're what makes motion feel natural vs robotic.

```javascript
// Linear (robotic - avoid unless intentional)
gsap.to('.box', { x: 100, ease: 'linear' });

// Power eases (most common)
gsap.to('.box', { x: 100, ease: 'power1.out' }); // Subtle deceleration
gsap.to('.box', { x: 100, ease: 'power2.out' }); // Smooth deceleration
gsap.to('.box', { x: 100, ease: 'power3.out' }); // Strong deceleration
gsap.to('.box', { x: 100, ease: 'power4.out' }); // Dramatic deceleration

// Elastic (bouncy)
gsap.to('.box', { x: 100, ease: 'elastic.out(1, 0.3)' });

// Back (slight overshoot)
gsap.to('.box', { x: 100, ease: 'back.out(1.7)' });

// Bounce (physicsy)
gsap.to('.box', { x: 100, ease: 'bounce.out' });

// Custom cubic-bezier
gsap.to('.box', { x: 100, ease: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' });
```

**Easing Cheat Sheet:**

| Ease Type     | When to Use                      | Feel                 |
| ------------- | -------------------------------- | -------------------- |
| `power1.out`  | Micro-interactions, UI feedback  | Subtle, polite       |
| `power2.out`  | Standard animations, reveals     | Professional, smooth |
| `power3.out`  | Hero sections, emphasis          | Dramatic, impactful  |
| `elastic.out` | Playful UI, fun brands           | Bouncy, energetic    |
| `back.out`    | Buttons, interactive elements    | Snappy, satisfying   |
| `linear`      | Progress bars, mechanical motion | Constant speed       |

**📂 Demo:** [demo/02-easing-visualizer.html](./demo/02-easing-visualizer.html)

> **Anonymous Developer Quote:** > _"Choosing the right easing is like seasoning food. You can't see it, but everyone knows when it's wrong. And your designer will definitely know."_

---

### Stagger: Batch Animations with Flair

Animate multiple elements with a staggered delay automatically.

```javascript
// Basic stagger
gsap.to('.card', {
	y: 0,
	opacity: 1,
	duration: 0.6,
	stagger: 0.1, // 0.1s between each card
});

// Advanced stagger options
gsap.to('.card', {
	y: 0,
	opacity: 1,
	duration: 0.6,
	stagger: {
		amount: 1.5, // Total time to stagger (distributed evenly)
		from: 'center', // 'start', 'center', 'end', 'edges', 'random', index
		grid: [3, 4], // For grid layouts [rows, cols]
		axis: 'x', // Stagger along x-axis
		ease: 'power2.inOut',
	},
});

// Stagger from specific index
gsap.to('.item', {
	scale: 1.2,
	duration: 0.3,
	stagger: {
		each: 0.05,
		from: 5, // Start from index 5
	},
});

// Function-based stagger (ultimate control)
gsap.to('.item', {
	y: -20,
	duration: 0.5,
	stagger: {
		each: 0.1,
		from: 'center',
		onStart: function () {
			console.log('Animating:', this.targets()[0]);
		},
	},
});
```

**📂 Demo:** [demo/03-stagger-effects.html](./demo/03-stagger-effects.html)

---

### ScrollTrigger: Scroll-Based Animations

**ScrollTrigger** is GSAP's most popular plugin. It synchronizes animations with scroll position.

```javascript
// Register the plugin
gsap.registerPlugin(ScrollTrigger);

// Basic scroll-triggered animation
gsap.to('.box', {
  x: 500,
  scrollTrigger: {
    trigger: '.box',       // Element to watch
    start: 'top center',   // When top of trigger hits center of viewport
    end: 'bottom center',  // When bottom of trigger hits center
    scrub: true,           // Animate in sync with scroll
    markers: true          // Show visual markers (debugging)
  }
});

// Start/End positions explained:
// Format: "triggerPosition viewportPosition"
// Trigger: top, center, bottom, or pixels/percentage
// Viewport: top, center, bottom, or pixels/percentage

// Examples
scrollTrigger: {
  start: 'top 80%',      // When top of trigger hits 80% down viewport
  end: 'bottom 20%',     // When bottom hits 20% down viewport
}

// Timeline with ScrollTrigger
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,            // Smooth scrubbing (1 second lag)
    pin: true,           // Pin the trigger element
    anticipatePin: 1     // Smooth pinning
  }
});

tl.to('.hero', { scale: 1.5, duration: 1 })
  .to('.hero', { opacity: 0, duration: 1 });

// Toggle class on scroll
ScrollTrigger.create({
  trigger: '.section',
  start: 'top center',
  end: 'bottom center',
  onEnter: () => console.log('Enter'),
  onLeave: () => console.log('Leave'),
  onEnterBack: () => console.log('Enter back'),
  onLeaveBack: () => console.log('Leave back'),
  toggleClass: { targets: '.section', className: 'is-active' }
});

// Parallax effect
gsap.to('.bg', {
  y: 300,
  ease: 'none',
  scrollTrigger: {
    trigger: '.section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
```

**📂 Demo:** [demo/04-scrolltrigger-intro.html](./demo/04-scrolltrigger-intro.html)

> **Anonymous Designer Quote:** > _"Before ScrollTrigger: 200 lines of scroll event listeners and requestAnimationFrame. After: 5 lines. I had an existential crisis about what I've been doing with my life."_

---

## 🚀 Part III: Advanced Techniques

### SVG Animation: Beyond CSS Limitations

GSAP can animate SVG in ways CSS simply cannot.

#### SVG Path Drawing

```javascript
// CSS method (limited)
gsap.to('.path', {
	strokeDashoffset: 0,
	duration: 2,
});

// DrawSVG plugin (requires Club GreenSock membership)
gsap.from('.path', {
	drawSVG: 0, // Draw from 0% to 100%
	duration: 2,
	ease: 'power1.inOut',
});

// Draw from center out
gsap.from('.path', {
	drawSVG: '50% 50%', // Start at center
	duration: 2,
});

// Animated signature effect
const tl = gsap.timeline();
tl
	.from('.sig-path-1', { drawSVG: 0, duration: 0.8 })
	.from('.sig-path-2', { drawSVG: 0, duration: 0.6 }, '-=0.2')
	.from('.sig-path-3', { drawSVG: 0, duration: 0.5 }, '-=0.2');
```

#### SVG Morphing

```javascript
// MorphSVG plugin (requires Club GreenSock - $99/year)
gsap.to('#circle', {
	morphSVG: '#star', // Morph circle into star
	duration: 2,
	ease: 'power2.inOut',
});

// Free alternative: Animate individual path points
gsap.to('.morph-path', {
	attr: { d: 'M100,50 L150,100 L50,100 Z' }, // New path definition
	duration: 2,
	ease: 'power2.inOut',
});
```

#### SVG Transforms

```javascript
// Animate SVG elements with transform origin
gsap.to('.svg-circle', {
	rotation: 360,
	scale: 1.5,
	transformOrigin: '50% 50%', // Center of element
	duration: 2,
	ease: 'back.out(1.7)',
});

// Animate along a path (MotionPath plugin)
gsap.to('.dot', {
	motionPath: {
		path: '#path', // SVG path to follow
		align: '#path', // Align to path tangent
		autoRotate: true, // Rotate to match path direction
		alignOrigin: [0.5, 0.5], // Center of element
	},
	duration: 5,
	ease: 'none',
	repeat: -1,
});
```

**📂 Demo:** [demo/05-svg-animations.html](./demo/05-svg-animations.html)

---

### Complex Interactions: Mouse, Drag, Scroll

#### Mouse Follow Animation

```javascript
let mouse = { x: 0, y: 0 };
let cursor = { x: 0, y: 0 };

window.addEventListener('mousemove', (e) => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

// Smooth follow with GSAP quickTo
const xTo = gsap.quickTo('.cursor', 'x', { duration: 0.6, ease: 'power3' });
const yTo = gsap.quickTo('.cursor', 'y', { duration: 0.6, ease: 'power3' });

gsap.ticker.add(() => {
	xTo(mouse.x);
	yTo(mouse.y);
});
```

#### Hover Effects

```javascript
const buttons = gsap.utils.toArray('.btn');

buttons.forEach((btn) => {
	const icon = btn.querySelector('.icon');

	btn.addEventListener('mouseenter', () => {
		gsap.to(icon, {
			x: 5,
			rotation: 15,
			duration: 0.3,
			ease: 'back.out(2)',
		});
	});

	btn.addEventListener('mouseleave', () => {
		gsap.to(icon, {
			x: 0,
			rotation: 0,
			duration: 0.3,
			ease: 'power2.out',
		});
	});
});
```

#### Draggable Elements (Draggable plugin)

```javascript
gsap.registerPlugin(Draggable);

Draggable.create('.box', {
	type: 'x,y', // Drag in any direction
	bounds: '.container', // Constrain to container
	inertia: true, // Physics-based momentum
	onDrag: function () {
		console.log(this.x, this.y);
	},
});

// Snap to grid
Draggable.create('.box', {
	type: 'x,y',
	snap: {
		x: (value) => Math.round(value / 50) * 50, // 50px grid
		y: (value) => Math.round(value / 50) * 50,
	},
});
```

**📂 Demo:** [demo/06-interactive-animations.html](./demo/06-interactive-animations.html)

---

### Performance Optimization

**GSAP is already highly optimized, but you can help:**

```javascript
// ✅ GOOD: Animate transforms and opacity (GPU-accelerated)
gsap.to('.box', { x: 100, y: 50, rotation: 45, opacity: 0.5 });

// ❌ BAD: Animate layout properties (triggers reflow)
gsap.to('.box', { top: 100, left: 50, width: 200 });

// Use will-change for complex animations
gsap.set('.animated', { willChange: 'transform, opacity' });

// Clear will-change when done
tl.to('.box', { /* animation */ })
  .call(() => gsap.set('.box', { clearProps: 'willChange' }));

// Batch DOM reads to prevent layout thrashing
const positions = gsap.utils.toArray('.item').map(el => {
  return { x: el.offsetLeft, y: el.offsetTop };
});

// Then animate with those values
positions.forEach((pos, i) => {
  gsap.from('.item')[i], { x: pos.x, y: pos.y });
});

// Use invalidateOnRefresh for responsive animations
ScrollTrigger.create({
  trigger: '.section',
  start: 'top top',
  end: () => `+=${document.querySelector('.section').offsetHeight}`,
  invalidateOnRefresh: true  // Recalculate on window resize
});
```

**Debugging:**

```javascript
// Enable GSAP's debug tools
GSAPDebugger.create();

// Log timeline progress
tl.eventCallback('onUpdate', () => {
	console.log('Progress:', tl.progress());
});

// Visualize ScrollTrigger markers
ScrollTrigger.create({
	trigger: '.section',
	markers: {
		startColor: 'green',
		endColor: 'red',
		fontSize: '18px',
		fontWeight: 'bold',
		indent: 20,
	},
});

// Check animation conflicts
gsap.globalTimeline.getChildren().forEach((tween) => {
	console.log('Target:', tween.targets(), 'Progress:', tween.progress());
});
```

---

## 🎨 Design Patterns & Best Practices

### Micro-interactions

```javascript
// Button click feedback
function animateButton(btn) {
	const tl = gsap.timeline();

	tl.to(btn, { scale: 0.95, duration: 0.1 }).to(btn, { scale: 1, duration: 0.2, ease: 'back.out(3)' });

	return tl;
}

document.querySelectorAll('.btn').forEach((btn) => {
	btn.addEventListener('click', () => animateButton(btn));
});
```

### Page Transitions

```javascript
function pageTransition() {
	const tl = gsap.timeline();

	// Exit animation
	tl.to('.old-content', {
		opacity: 0,
		y: -50,
		duration: 0.4,
		ease: 'power2.in',
	});

	// Enter animation
	tl.from(
		'.new-content',
		{
			opacity: 0,
			y: 50,
			duration: 0.6,
			ease: 'power2.out',
		},
		'-=0.2'
	);

	return tl;
}
```

### Loading Sequences

```javascript
function loadingAnimation() {
	const tl = gsap.timeline();

	// Stagger in logo elements
	tl.from('.logo-path', {
		drawSVG: 0,
		duration: 1,
		stagger: 0.2,
		ease: 'power2.out',
	});

	// Fade in text
	tl.from(
		'.brand-name',
		{
			opacity: 0,
			y: 20,
			duration: 0.8,
			ease: 'power3.out',
		},
		'-=0.5'
	);

	// Scale out and hide
	tl.to(
		'.loader',
		{
			scale: 3,
			opacity: 0,
			duration: 0.8,
			ease: 'power4.in',
		},
		'+=0.5'
	);

	return tl;
}
```

**📂 Demo:** [demo/07-design-patterns.html](./demo/07-design-patterns.html)

---

## 🛠️ Practice Exercises

### Level 1: Foundation (Required)

1. **Animated Navigation**

   - Create a nav menu that slides in when page loads
   - Add hover effects to menu items with GSAP
   - Animate a hamburger icon open/close

2. **Scroll-Reveal Cards**

   - Grid of cards that fade in and slide up on scroll
   - Use stagger for sequential reveal
   - Add parallax effect to card images

3. **Interactive Button**
   - Create a button with a loading animation
   - Animate success/error states
   - Add satisfying micro-interactions

### Level 2: Intermediate (Recommended)

4. **Animated Hero Section**

   - Text reveals with split-text animation
   - Background parallax on scroll
   - Smooth scroll to next section

5. **SVG Logo Animation**

   - Animate logo paths drawing on page load
   - Add hover effect that morphs colors
   - Create infinite subtle pulse animation

6. **Modal Transition**
   - Smooth modal open/close animation
   - Backdrop fade with blur effect
   - Content stagger-in animation

### Level 3: Advanced (For the Brave)

7. **Horizontal Scroll Gallery**

   - Create a horizontal scrolling section
   - Pin section while horizontally scrolling content
   - Add parallax layers at different speeds

8. **Physics-Based Animation**

   - Implement draggable elements with inertia
   - Create a magnetic button effect (elements attracted to cursor)
   - Build a floating/bobbing animation system

9. **Complex Timeline Sequence**

   - Build a multi-scene animated story
   - Synchronize 10+ animations with labels
   - Add pause/play/restart controls
   - Create chapter navigation

10. **SVG Morphing Animation** _(Requires Club GreenSock)_
    - Morph between 5 different shapes smoothly
    - Create an animated icon set
    - Build a shape-shifting logo

**📂 Exercise Starters:** [demo/exercises/](./demo/exercises/)

---

## 🌟 Advanced Student Showcase Ideas

For students ready to push boundaries:

### 1. **Immersive Storytelling Experience**

Build a parallax storytelling site where scroll reveals narrative chapters with complex animations, SVG illustrations, and dynamic typography.

**Inspiration:**

- Apple product pages
- [Every Last Drop](http://everylastdrop.co.uk/)
- [Bruno Simon Portfolio](https://bruno-simon.com/)

### 2. **Interactive Data Visualization**

Animate charts and graphs that respond to scroll or user input. Morph between different data views smoothly.

**Techniques:**

- MorphSVG for chart transitions
- ScrollTrigger for data reveals
- Custom easing for data-feel motion

### 3. **WebGL + GSAP Integration**

Combine Three.js (3D graphics) with GSAP for camera animations and scene transitions.

**Example:**

```javascript
const camera = new THREE.PerspectiveCamera(/*...*/);

gsap.to(camera.position, {
	z: 10,
	scrollTrigger: {
		trigger: '.section',
		start: 'top top',
		end: 'bottom top',
		scrub: true,
	},
});
```

### 4. **Generative Art Animation**

Create evolving patterns using GSAP to animate parameters of canvas drawings or SVG patterns.

### 5. **Voice-Controlled Animation**

Use Web Speech API to trigger GSAP animations based on voice commands or sound levels.

```javascript
const recognition = new webkitSpeechRecognition();

recognition.onresult = (event) => {
	const command = event.results[0][0].transcript;

	if (command.includes('explode')) {
		explodeAnimation();
	}
};
```

---

## 📚 Resources & References

### Official Documentation

- [GSAP Docs](https://greensock.com/docs/) — Comprehensive API reference
- [GSAP Learning](https://greensock.com/learning/) — Video tutorials and guides
- [ScrollTrigger Demos](https://codepen.io/collection/AEbkkJ) — Official demo collection
- [Easing Visualizer](https://greensock.com/ease-visualizer/) — Interactive easing tool

### Community & Learning

- [GreenSock Forums](https://greensock.com/forums/) — Get help from GSAP experts
- [CodePen GSAP Collection](https://codepen.io/collection/DYqKXQ) — Community demos
- [CSS-Tricks GSAP Guide](https://css-tricks.com/writing-smarter-animation-code/) — Articles and tutorials
- [GSAP Cheat Sheet](https://ihatetomatoes.net/greensock-cheat-sheet/) — Quick reference

### Inspiration

- [Awwwards GSAP Sites](https://www.awwwards.com/websites/gsap-animation/) — Award-winning examples
- [Codrops Demos](https://tympanus.net/Development/) — Creative coding experiments
- [Active Theory](https://activetheory.net/) — Production-quality GSAP work
- [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/) — Smooth scroll library

### Advanced Topics

- [Club GreenSock](https://greensock.com/club/) — Premium plugins ($99/year)
- [React GSAP](https://github.com/bitworking/react-gsap) — GSAP in React
- [GSAP + Three.js](https://tympanus.net/codrops/2019/10/14/how-to-create-an-interactive-3d-character-with-three-js/) — 3D animation integration
- [GSAP Performance](https://css-tricks.com/myth-busting-css-animations-vs-javascript/) — Deep dive into optimization

### Books & Courses

- _"Web Animation using JavaScript"_ by Julian Shapiro — Covers GSAP in depth
- _"SVG Animations"_ by Sarah Drasner — SVG + GSAP techniques
- [Frontend Masters: Web Animations Course](https://frontendmasters.com/courses/web-animation/) — Video course

---

## 💬 Wisdom from the Trenches

<figure class="quote">
  <blockquote>
    GSAP is the difference between 'I animated something' and 'I animated something people actually want to watch.' CSS is like watercolors. GSAP is like having a film crew.
  </blockquote>
  <figcaption>
    &mdash; Anonymous Designer-Developer Quote #1
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    My first GSAP timeline was 300 lines of code. Then I learned about defaults and relative positioning. Now it's 30 lines and I sleep at night.
  </blockquote>
  <figcaption>
    &mdash; Anonymous Designer-Developer Quote #2
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    Client: 'Can you make it bounce?' Me with CSS: 'I can try...' Me with GSAP: 'How bouncy do you want it and would you like it to rotate while it bounces?'
  </blockquote>
  <figcaption>
    &mdash; Anonymous Designer-Developer Quote #3
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    I showed my designer a ScrollTrigger demo. They asked if we could make the whole site like that. I said yes. I haven't slept in three days. Worth it.
  </blockquote>
  <figcaption>
    &mdash; Anonymous Designer-Developer Quote #4
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    Learning GSAP timelines was like discovering you don't have to wash dishes one at a time. You can load the dishwasher. And program it. And it cleans itself.
  </blockquote>
  <figcaption>
    &mdash; Anonymous Designer-Developer Quote #5
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    Before GSAP: 'This animation doesn't work in Safari.' After GSAP: 'Wait, it works in Safari?' The bar for happiness is very low in web development.
  </blockquote>
  <figcaption>
    &mdash; Anonymous Designer-Developer Quote #6
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    GSAP's pricing model is reverse psychological warfare. You spend a month with the free version, realize you need MorphSVG, and suddenly $99/year seems like a bargain for your sanity.
  </blockquote>
  <figcaption>
    &mdash; Anonymous Designer-Developer Quote #7
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    My portfolio site has a 2-second intro animation. It took me 2 weeks to make. This is why designers don't just 'quickly animate it.'
  </blockquote>
  <figcaption>
    &mdash; Anonymous Designer-Developer Quote #8
  </figcaption>
</figure>

---

## 🎯 Key Takeaways

### When to Use GSAP vs CSS

| Use Case             | CSS Animations  | GSAP                 |
| -------------------- | --------------- | -------------------- |
| Simple hover effects | ✅ Perfect      | ⚠️ Overkill          |
| Complex sequences    | ❌ Painful      | ✅ Perfect           |
| SVG morphing         | ❌ Impossible   | ✅ Easy              |
| Timeline control     | ❌ Limited      | ✅ Powerful          |
| Scroll animations    | ⚠️ Experimental | ✅ Production-ready  |
| Performance          | ✅ Good         | ✅ Better            |
| Browser support      | ⚠️ Varies       | ✅ Consistent        |
| Learning curve       | Easy            | Moderate             |
| File size            | 0KB             | ~50KB (gzipped core) |

### The GSAP Decision Tree

```
Need animation?
├─ Is it a simple hover/focus state?
│  └─ YES → Use CSS :hover with transition
│
├─ Does it need to sequence with other animations?
│  └─ YES → Use GSAP Timeline
│
├─ Does it need to sync with scroll?
│  └─ YES → Use GSAP ScrollTrigger
│
├─ Does it need to morph SVG shapes?
│  └─ YES → Use GSAP (MorphSVG plugin)
│
├─ Does it need precise control and debugging?
│  └─ YES → Use GSAP
│
└─ Is it a keyframe loop with no interaction?
   └─ MAYBE → CSS is fine, but GSAP gives more control
```

### Essential Patterns to Remember

1. **Start with timelines** — Even if you think you need just one tween
2. **Use defaults** — Set common properties at timeline level
3. **Relative positioning** — `'-=0.5'`, `'<'`, `'>'` are your friends
4. **Labels for complex sequences** — Name your scenes
5. **Separate logic from animation** — Keep animation code modular
6. **Progressive enhancement** — Site should work without GSAP
7. **Respect `prefers-reduced-motion`** — Accessibility first

```javascript
// Accessibility check
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
	gsap.globalTimeline.timeScale(100); // Instant animations
	// Or disable entirely:
	// gsap.config({ force3D: false, autoSleep: 60 });
}
```

---

## 🎪 Exhibition: Show Your Work

Once you've built your GSAP-powered animations:

1. **Deploy** your project to GitHub Pages or Netlify
2. **Document** your animation strategy:
   - Why GSAP over CSS for this project?
   - Which techniques provided the most value?
   - What challenged you the most?
3. **Present** (3 minutes):
   - One complex animation you're proud of
   - Walk through the timeline structure
   - Explain the UX reasoning behind timing choices
4. **Critique** a peer's work:
   - Does the animation serve the content or distract?
   - Is the timing natural or mechanical?
   - Suggest one improvement

**Evaluation Criteria:**

| Criterion               | Weight | What We're Looking For                                 |
| ----------------------- | ------ | ------------------------------------------------------ |
| **Technical Execution** | 30%    | Clean code, proper use of timelines, performance       |
| **Design Integration**  | 25%    | Animation serves UX, enhances content                  |
| **Creativity**          | 20%    | Unique application of techniques                       |
| **Polish**              | 15%    | Smooth easing, good timing, details                    |
| **Accessibility**       | 10%    | Respects prefers-reduced-motion, doesn't block content |

---

## 🚀 Next Steps

**Immediate:**

1. Complete the 10 practice exercises
2. Add GSAP animations to your portfolio project
3. Experiment with ScrollTrigger on your landing page

**This Week:**

1. Join the [GreenSock Forums](https://greensock.com/forums/)
2. Study 3 Awwwards GSAP sites — inspect their code
3. Recreate one animation you admire

**This Month:**

1. Consider [Club GreenSock](https://greensock.com/club/) membership for premium plugins
2. Build one complex interactive piece
3. Share your work on Twitter/CodePen with #GSAP

**Long Term:**

1. Master React/Vue + GSAP integration
2. Explore GSAP + WebGL (Three.js)
3. Build a GSAP animation library for your design system

---

**Next Lesson**: [Canvas & WebGL Animations](../canvas/) _(Coming Soon)_

**Previous Lesson**: [CSS Animations](../css/)

**License**: Content CC BY-NC-SA 4.0 · Code MIT
**Author**: Rubén Vega Balbás, PhD · [UDIT](https://www.udit.es)

---

> **Final Anonymous Quote:** > \*"I started learning GSAP to make things move. I stayed because I realized it makes me a better designer. Understanding timing, easing, and sequence makes you think differently about every interaction. Also, timelines are just** \***chef's kiss\*\*\*."
