---
layout: lesson
title: 'GSAP for Designers: Typography & SVG Animation Mastery'
title_alt: 'GSAP para Diseñadores: Dominio de Tipografía y Animación SVG'
slug: gsap-bootstrap
date: 2025-12-11
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/gsap/bootstrap/
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## 🎭 The Tao of Motion

> _"The SVG scales infinitely, yet remains exactly what it is. Be like the SVG."_
> — The Tao of the Developer

Before we animate a single letter, let us pause. Animation is not decoration—it is **communication**. The difference between a portfolio that wins Awwwards and one that annoys visitors lies not in technical complexity, but in **intentionality**.

> _"Animation is not about moving things. It's about moving people."_

As designers learning development, you already understand visual hierarchy, timing, and emotional resonance. GSAP is simply the tool that translates your design intuition into living, breathing interfaces.

---

## ⏰ Estimated Duration

**120 minutes** (2 sessions or 1 extended workshop)

---

## 🎯 Learning Objectives

By the end of this lesson, you will be able to:

- **Install** GSAP via CDN and understand when to use npm
- **Animate** typography with character-by-character reveals, kinetic type, and text effects
- **Master** SVG animation including path drawing, morphing, and transforms
- **Create** timelines that sequence complex animations with precision
- **Apply** easing functions that feel natural and intentional
- **Build** scroll-triggered animations using ScrollTrigger
- **Think critically** about when motion enhances vs. distracts from user experience

---

## 🔍 Critical Perspective: Why GSAP?

### The CSS Limitation Wall

You've learned CSS animations. They're elegant for simple transitions. But as a designer, you'll quickly hit walls:

| Design Intent | CSS Reality | GSAP Solution |
|--------------|-------------|---------------|
| "Animate each letter sequentially" | Manual delays for every character | `SplitText` + `stagger` |
| "Draw this logo path on scroll" | Limited `stroke-dashoffset` control | `DrawSVG` + `ScrollTrigger` |
| "Morph this circle into a star" | Impossible | `MorphSVG` plugin |
| "Sync 10 animations perfectly" | Callback hell | `Timeline` with labels |
| "Pause, reverse, scrub with scroll" | Not possible | Full playback control |

### 🤔 Atelier Critical Prompt #1

**Before animating anything, ask yourself:**

1. **Purpose**: What does this motion communicate?
2. **Hierarchy**: Does it guide the eye or compete for attention?
3. **Accessibility**: Does it respect `prefers-reduced-motion`?
4. **Performance**: Will it run at 60fps on mobile?

> _"Write code for humans first, computers second; the Tao lies in balancing both."_
> — The Tao of the Developer

---

## 🚀 Part I: Installation & First Animation

### Method: CDN (Recommended for Learning)

For this course, we use CDN to focus on learning GSAP's API without build tool complexity. All demos use **Bootstrap 5** via CDN for styling.

```html
<!DOCTYPE html>
<html lang="en" class="h-100 overflow-x-hidden">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GSAP Typography Demo</title>
  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      min-height: 100vh;
      background: #0a0a0a;
      color: #fafafa;
    }
    .hero-title {
      font-size: clamp(3rem, 10vw, 8rem);
      font-weight: 800;
      letter-spacing: -0.03em;
    }
  </style>
</head>
<body class="d-flex align-items-center justify-content-center overflow-x-hidden">
  <h1 class="hero-title">Hello GSAP</h1>

  <!-- Bootstrap 5 JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <!-- GSAP Core -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>

  <script>
    function initAnimation() {
      if (!window.gsap) {
        setTimeout(initAnimation, 100);
        return;
      }

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Your first animation!
      gsap.from('.hero-title', {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power3.out'
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAnimation);
    } else {
      initAnimation();
    }
  </script>
</body>
</html>
```

**📂 Demo:** [demos/01-first-animation.html](./demos/01-first-animation.html)

> **⚠️ Important:** All demos use `class="h-100 overflow-x-hidden"` on the `<html>` element and `overflow-x-hidden` on the `<body>` element to prevent horizontal scroll issues when embedded in lesson pages. This is **critical** for proper scroll management in student examples. Always include these classes when creating embedded demos.

### Bootstrap 5 Quick Reference

All examples in this lesson use **Bootstrap 5** via CDN. Key patterns:

```html
<!-- Always include Bootstrap 5 CSS and JS in <head> -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- Essential scroll management classes -->
<html lang="en" class="h-100 overflow-x-hidden">
<body class="overflow-x-hidden">
```

**Common Bootstrap 5 utility classes used in GSAP demos:**
- Layout: `d-flex`, `d-grid`, `align-items-center`, `justify-content-center`
- Spacing: `p-4`, `m-4`, `gap-2`, `mb-4`
- Typography: `display-1`, `fw-bold`, `text-center`, `text-muted`
- Colors: `bg-dark`, `text-light`, `border-secondary`
- Effects: `overflow-hidden`, `rounded`, `shadow`
- Responsive: `col-md-6`, `col-sm-12`, `row`, `container`

### Understanding the Syntax

```javascript
gsap.from(target, { properties });
gsap.to(target, { properties });
gsap.fromTo(target, { from }, { to });
```

| Method | Behavior |
|--------|----------|
| `gsap.from()` | Animate FROM these values TO current state |
| `gsap.to()` | Animate TO these values FROM current state |
| `gsap.fromTo()` | Explicit start and end values |

In our first example we animated the title with `gsap.from`:

```javascript
gsap.from('.hero-title', {
  opacity: 0,
  y: 100,
  duration: 1.2,
  ease: 'power3.out'
});
```

The same effect written with `gsap.to` would be:

```javascript
// Requires the element to start in CSS at opacity: 0 and translateY(100px)
gsap.to('.hero-title', {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: 'power3.out'
});
```

Use `from` when you want to *pull* the element into its natural state from an implied starting position; use `to` when you explicitly control the starting state in CSS or JavaScript.

### Core Properties

```javascript
gsap.to('.element', {
  // Transform properties (GPU-accelerated)
  x: 100,           // translateX in pixels
  y: 50,            // translateY in pixels
  rotation: 45,     // degrees
  scale: 1.2,       // uniform scale

  // CSS properties
  opacity: 0.5,
  color: '#ff0000',

  // Timing
  duration: 1,      // seconds
  delay: 0.5,       // delay before start
  ease: 'power2.out',

  // Callbacks
  onStart: () => console.log('Started'),
  onComplete: () => console.log('Done')
});
```

> _"Experience is simply the name we give to our bugs after we fix them."_
> — The Tao of the Developer

---

## 🔤 Part II: Typography Animation

Typography is the soul of design. Animated type can transform a static page into an emotional experience.

### Level 1: Word-by-Word Reveal

```html
<h1 class="headline display-1 fw-bold overflow-hidden">
  <span class="word d-inline-block me-1 overflow-hidden">Design</span>
  <span class="word d-inline-block me-1 overflow-hidden">with</span>
  <span class="word d-inline-block me-1 overflow-hidden">intention</span>
</h1>
```

```javascript
// Check for reduced motion before animating
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  gsap.from('.word', {
    y: '100%',
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.15
  });
}
```

**📂 Demo:** [demos/02-word-reveal.html](./demos/02-word-reveal.html)

### Level 2: Character-by-Character Animation

For character-level control, we need to split text into individual spans:

```html
<h1 class="split-text display-1 fw-black">Typography</h1>
```

```javascript
// Split text into characters (manual approach)
const text = document.querySelector('.split-text');
const chars = text.textContent.split('');
text.innerHTML = chars.map(char =>
  `<span class="char d-inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
).join('');

// Animate each character (with accessibility check)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  gsap.from('.char', {
    y: 50,
    opacity: 0,
    rotation: -15,
    duration: 0.6,
    ease: 'back.out(1.7)',
    stagger: 0.03
  });
}
```

**📂 Demo:** [demos/03-char-animation.html](./demos/03-char-animation.html)

### Level 3: Kinetic Typography

Create dynamic text that responds to interaction:

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const chars = gsap.utils.toArray('.char');

  chars.forEach((char, i) => {
    char.addEventListener('mouseenter', () => {
      gsap.to(char, {
        y: -20,
        scale: 1.3,
        color: '#3b82f6',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    char.addEventListener('mouseleave', () => {
      gsap.to(char, {
        y: 0,
        scale: 1,
        color: '#fafafa',
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}
```

**📂 Demo:** [demos/04-kinetic-type.html](./demos/04-kinetic-type.html)

### Level 4: Typewriter Effect

```javascript
const text = "Design is how it works.";
const container = document.querySelector('.typewriter');

gsap.to(container, {
  duration: text.length * 0.05,
  text: {
    value: text,
    delimiter: ""
  },
  ease: "none"
});
```

> **Note:** The `text` plugin requires the TextPlugin. For CDN:
> ```html
> <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/TextPlugin.min.js"></script>
> ```

**📂 Demo:** [demos/05-typewriter.html](./demos/05-typewriter.html)

### Level 5: Scramble Text Effect

```javascript
gsap.registerPlugin(TextPlugin);

gsap.to('.scramble', {
  duration: 2,
  text: {
    value: "AWWWARDS",
    newClass: "revealed"
  },
  scrambleText: {
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    revealDelay: 0.5,
    speed: 0.3
  },
  ease: "none"
});
```

**📂 Demo:** [demos/06-scramble-text.html](./demos/06-scramble-text.html)

---

## 🎨 Part III: SVG Animation Mastery

> _"A thousand PNGs can be replaced by one SVG. This is not optimization. This is enlightenment."_
> — The Tao of the Developer

SVG animation is where GSAP truly shines. As designers, you work with vector graphics daily—now you can bring them to life.

### Level 1: Basic SVG Transforms

```html
<div class="d-flex align-items-center justify-content-center">
  <svg viewBox="0 0 200 200" width="200" height="200">
    <circle class="circle" cx="100" cy="100" r="40" fill="#0d6efd"/>
  </svg>
</div>
```

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  gsap.to('.circle', {
    scale: 1.5,
    rotation: 360,
    transformOrigin: '50% 50%',
    duration: 2,
    ease: 'elastic.out(1, 0.3)',
    repeat: -1,
    yoyo: true
  });
}
```

**📂 Demo:** [demos/07-svg-transforms.html](./demos/07-svg-transforms.html)

### Level 2: Path Drawing Effect

The signature "drawing" effect that makes logos come alive:

```html
<div class="d-flex align-items-center justify-content-center">
  <svg viewBox="0 0 400 200" width="400" height="200" style="max-width: 100%;">
    <path class="logo-path"
          d="M 50 100 Q 100 50 150 100 T 250 100 T 350 100"
          fill="none"
          stroke="#fafafa"
          stroke-width="3"
          stroke-linecap="round"/>
  </svg>
</div>
```

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Get the total length of the path
  const path = document.querySelector('.logo-path');
  const length = path.getTotalLength();

  // Set up the starting state
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length
  });

  // Animate the drawing
  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2,
    ease: 'power2.inOut'
  });
}
```

**📂 Demo:** [demos/08-path-drawing.html](./demos/08-path-drawing.html)

### Level 3: Multi-Path Logo Animation

```javascript
const paths = gsap.utils.toArray('.logo-path');
const tl = gsap.timeline();

paths.forEach((path, i) => {
  const length = path.getTotalLength();
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length
  });

  tl.to(path, {
    strokeDashoffset: 0,
    duration: 1,
    ease: 'power1.inOut'
  }, i * 0.2); // Stagger start times
});
```

**📂 Demo:** [demos/09-multi-path-logo.html](./demos/09-multi-path-logo.html)

### Level 4: SVG Morphing (Path Animation)

Transform one shape into another:

```html
<div class="d-flex align-items-center justify-content-center">
  <svg viewBox="0 0 200 200" width="200" height="200">
    <path class="morph-shape"
          d="M100,20 L180,180 L20,180 Z"
          fill="#0d6efd"/>
  </svg>
</div>
```

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Triangle to Circle to Square
  const shapes = {
    triangle: "M100,20 L180,180 L20,180 Z",
    circle: "M100,20 C155,20 180,70 180,100 C180,155 130,180 100,180 C45,180 20,130 20,100 C20,45 70,20 100,20 Z",
    square: "M30,30 L170,30 L170,170 L30,170 Z"
  };

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

  tl.to('.morph-shape', {
    attr: { d: shapes.circle },
    duration: 1,
    ease: 'power2.inOut'
  })
  .to('.morph-shape', {
    attr: { d: shapes.square },
    duration: 1,
    ease: 'power2.inOut'
  })
  .to('.morph-shape', {
    attr: { d: shapes.triangle },
    duration: 1,
    ease: 'power2.inOut'
  });
}
```

**📂 Demo:** [demos/10-svg-morphing.html](./demos/10-svg-morphing.html)

### Level 5: Animated SVG Icons

```javascript
// Hamburger to X animation
const tl = gsap.timeline({ paused: true });

tl.to('.line-top', {
  y: 8,
  rotation: 45,
  transformOrigin: 'center',
  duration: 0.3
})
.to('.line-middle', {
  opacity: 0,
  duration: 0.1
}, 0)
.to('.line-bottom', {
  y: -8,
  rotation: -45,
  transformOrigin: 'center',
  duration: 0.3
}, 0);

// Toggle on click
let isOpen = false;
document.querySelector('.menu-btn').addEventListener('click', () => {
  isOpen ? tl.reverse() : tl.play();
  isOpen = !isOpen;
});
```

**📂 Demo:** [demos/11-animated-icons.html](./demos/11-animated-icons.html)

---

## ⏱️ Part IV: Timelines & Sequencing

> _"The wise developer does not add more code. They remove conflict."_
> — The Tao of the Developer

Timelines are GSAP's superpower for complex choreography.

### Basic Timeline

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const tl = gsap.timeline();

  tl.from('.hero-title', { y: 100, opacity: 0, duration: 1 })
    .from('.hero-subtitle', { y: 50, opacity: 0, duration: 0.8 })
    .from('.hero-cta', { scale: 0, duration: 0.5, ease: 'back.out(2)' });
}
```

### Timeline Positioning

```javascript
const tl = gsap.timeline();

// Default: after previous
tl.to('.a', { x: 100, duration: 1 })

// Start 0.5s before previous ends
  .to('.b', { x: 100, duration: 1 }, '-=0.5')

// Start at same time as previous
  .to('.c', { x: 100, duration: 1 }, '<')

// Start 0.2s after previous starts
  .to('.d', { x: 100, duration: 1 }, '<0.2')

// Start at absolute time 2 seconds
  .to('.e', { x: 100, duration: 1 }, 2);
```

### Timeline with Labels

```javascript
const tl = gsap.timeline();

tl.add('intro')
  .from('.logo', { scale: 0, duration: 0.8 }, 'intro')
  .from('.tagline', { opacity: 0, y: 20 }, 'intro+=0.3')

  .add('content', '+=0.5')
  .from('.card', { y: 100, opacity: 0, stagger: 0.1 }, 'content')

  .add('cta', '+=0.3')
  .from('.button', { scale: 0, ease: 'back.out(2)' }, 'cta');
```

### Timeline Defaults

```javascript
const tl = gsap.timeline({
  defaults: {
    duration: 0.8,
    ease: 'power3.out'
  }
});

// All tweens inherit defaults
tl.from('.a', { y: 100 })
  .from('.b', { y: 100 })
  .from('.c', { y: 100, duration: 1.2 }); // Override default
```

**📂 Demo:** [demos/12-timelines.html](./demos/12-timelines.html)

---

## 🎚️ Part V: Easing — The Soul of Animation

> _"Choosing the right easing is like seasoning food. You can't see it, but everyone knows when it's wrong."_

Easing determines the **character** of your animation.

### Easing Cheat Sheet

| Ease | Feel | Use Case |
|------|------|----------|
| `power1.out` | Subtle, polite | Micro-interactions |
| `power2.out` | Professional | Standard UI animations |
| `power3.out` | Dramatic | Hero reveals |
| `power4.out` | Impactful | Attention-grabbing |
| `back.out(1.7)` | Snappy, overshoot | Buttons, modals |
| `elastic.out(1, 0.3)` | Bouncy, playful | Fun brands |
| `bounce.out` | Physical | Game-like UI |
| `linear` | Mechanical | Progress bars |

### Custom Easing

```javascript
// Using cubic-bezier
gsap.to('.box', {
  x: 300,
  ease: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
});

// Custom ease with CustomEase plugin
gsap.registerPlugin(CustomEase);
CustomEase.create('myEase', 'M0,0 C0.126,0.382 0.282,1.674 0.44,1.674 0.778,1.674 0.824,1 1,1');

gsap.to('.box', { x: 300, ease: 'myEase' });
```

**📂 Demo:** [demos/13-easing.html](./demos/13-easing.html)

### Visual Easing Guide

```
power1.out  ████████▓▓░░░░░░  Gentle deceleration
power2.out  ████████████▓░░░  Smooth deceleration
power3.out  ██████████████▓░  Strong deceleration
power4.out  ███████████████▓  Dramatic deceleration

back.out    ████████████▓▓██  Overshoot & settle
elastic.out ████▓▓██▓▓██████  Bouncy oscillation
bounce.out  ██▓█▓█▓█████████  Physical bounce
```

---

## 📜 Part VI: ScrollTrigger

> _"Before ScrollTrigger: 200 lines of scroll event listeners. After: 5 lines."_

ScrollTrigger synchronizes animations with scroll position.

### Installation

```html
<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- GSAP Core -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<!-- ScrollTrigger Plugin -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<script>
  gsap.registerPlugin(ScrollTrigger);
</script>
```

### Basic Scroll-Triggered Animation

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  gsap.from('.section-title', {
    y: 100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.section-title',
      start: 'top 80%',    // When top of element hits 80% down viewport
      end: 'top 20%',      // When top hits 20% down
      toggleActions: 'play none none reverse'
    }
  });
}
```

### Scrub Animation (Tied to Scroll)

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  gsap.to('.parallax-bg', {
    y: -200,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true  // Animation progress tied to scroll
    }
  });
}
```

### Pin Section While Animating

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.pinned-section',
    start: 'top top',
    end: '+=200%',  // Pin for 2x viewport height of scroll
    pin: true,
    scrub: 1
  }
});

tl.from('.reveal-1', { opacity: 0, y: 50 })
  .from('.reveal-2', { opacity: 0, y: 50 })
  .from('.reveal-3', { opacity: 0, y: 50 });
```

### Typography Scroll Reveal

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Reveal text as user scrolls
  gsap.utils.toArray('.scroll-text').forEach(text => {
    gsap.from(text, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: text,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}
```

**📂 Demo:** [demos/14-scrolltrigger.html](./demos/14-scrolltrigger.html)

---

## ♿ Part VII: Accessibility

> _"Accessibility is not a feature. It is the foundation upon which all features rest."_
> — The Tao of the Developer

### Respecting User Preferences

```javascript
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Disable or simplify animations
  gsap.globalTimeline.timeScale(100); // Instant animations
} else {
  // Full animations
  gsap.from('.hero', { y: 100, opacity: 0, duration: 1 });
}
```

### Progressive Enhancement Pattern

```javascript
// Default: no animation (works without JS)
// Enhanced: add animation if motion is allowed

const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

if (motionOK) {
  gsap.from('.content', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1
  });
}
```

### Accessible Animation Wrapper

```javascript
function animateIfAllowed(target, vars) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Set final state immediately
    gsap.set(target, {
      opacity: vars.opacity ?? 1,
      x: vars.x ?? 0,
      y: vars.y ?? 0
    });
  } else {
    gsap.from(target, vars);
  }
}

// Usage
animateIfAllowed('.hero-title', { y: 100, opacity: 0, duration: 1 });
```

**📂 Demo:** [demos/15-accessibility.html](./demos/15-accessibility.html)

---

## 🏆 Part VIII: Awwward-Worthy Techniques

### Technique 1: Magnetic Buttons

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const buttons = gsap.utils.toArray('.magnetic-btn');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}
```

**📂 Demo:** [demos/16-magnetic-buttons.html](./demos/16-magnetic-buttons.html)

### Technique 2: Smooth Cursor Follower

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth follow with quickTo
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.6, ease: 'power3' });
  const dotXTo = gsap.quickTo(cursorDot, 'x', { duration: 0.1 });
  const dotYTo = gsap.quickTo(cursorDot, 'y', { duration: 0.1 });

  gsap.ticker.add(() => {
    xTo(mouseX);
    yTo(mouseY);
    dotXTo(mouseX);
    dotYTo(mouseY);
  });
}
```

**📂 Demo:** [demos/17-cursor-follower.html](./demos/17-cursor-follower.html)

### Technique 3: Horizontal Scroll Gallery

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const sections = gsap.utils.toArray('.gallery-item');
  const container = document.querySelector('.gallery-container');

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => '+=' + container.offsetWidth
    }
  });
}
```

**📂 Demo:** [demos/18-horizontal-scroll.html](./demos/18-horizontal-scroll.html)

### Technique 4: Text Reveal on Scroll

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Split text and reveal line by line on scroll
  const lines = gsap.utils.toArray('.reveal-line');

  lines.forEach(line => {
    gsap.from(line, {
      y: '100%',
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}
```

**📂 Demo:** [demos/19-text-reveal-scroll.html](./demos/19-text-reveal-scroll.html)

### Technique 5: Staggered Grid Animation

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  gsap.from('.grid-item', {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)',
    stagger: {
      amount: 1.5,
      grid: [4, 4],
      from: 'center'
    },
    scrollTrigger: {
      trigger: '.grid-container',
      start: 'top 70%'
    }
  });
}
```

**📂 Demo:** [demos/20-staggered-grid.html](./demos/20-staggered-grid.html)

---

## 🛠️ Practice Exercises

### Exercise 1: Animated Logo (Beginner)
Create your name or initials as an SVG and animate the paths drawing on page load.

### Exercise 2: Portfolio Hero (Intermediate)
Build a hero section with:
- Staggered text reveal
- Animated background shapes
- Scroll-triggered content below

### Exercise 3: Interactive Gallery (Advanced)
Create a project gallery with:
- Horizontal scroll on desktop
- Magnetic hover effects
- Custom cursor that changes on hover

### Exercise 4: Full Page Experience (Master)
Build a single-page portfolio with:
- Pinned sections with scroll-driven animations
- Typography that responds to scroll position
- SVG illustrations that animate as you scroll past

---

## 📚 Resources & References

### Official Documentation
- [GSAP Docs](https://gsap.com/docs/v3/) — Comprehensive API reference
- [Easing Visualizer](https://gsap.com/docs/v3/Eases/) — Interactive easing tool
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — Scroll animation guide

### Learning Resources
- [GreenSock Learning](https://gsap.com/resources/get-started/) — Official tutorials
- [GSAP Cheat Sheet](https://gsap.com/cheatsheet/) — Quick reference

### Inspiration
- [Awwwards GSAP Sites](https://www.awwwards.com/websites/gsap-animation/) — Award-winning examples
- [Codrops](https://tympanus.net/codrops/) — Creative coding experiments

---

## 🎯 Key Takeaways

### The GSAP Decision Tree

```
Need animation?
├─ Simple hover/focus state?
│  └─ Use CSS transitions
│
├─ Sequence multiple animations?
│  └─ Use GSAP Timeline
│
├─ Sync with scroll?
│  └─ Use ScrollTrigger
│
├─ Animate SVG paths/morphing?
│  └─ Use GSAP (only option)
│
└─ Need precise control/debugging?
   └─ Use GSAP
```

### Essential Patterns

1. **Start with timelines** — Even for single animations
2. **Use defaults** — Set common properties at timeline level
3. **Stagger everything** — Sequential reveals feel intentional
4. **Ease thoughtfully** — `power2.out` is your default friend
5. **Respect motion preferences** — Always check `prefers-reduced-motion`
6. **Progressive enhancement** — Site should work without JS

> _"In shipping, there is learning. In learning, there is growth. In growth, there is the Tao."_
> — The Tao of the Developer

---

## 💬 Wisdom from the Path

> _"The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining 10 percent of the code accounts for the other 90 percent of the development time."_
> — The Tao of the Developer

> _"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."_
> — The Tao of the Developer

> _"Simplicity is the ultimate sophistication."_
> — The Tao of the Developer

---

**Now go forth and animate with intention. May your easing be smooth and your frame rates ever at 60fps.** 🎭
