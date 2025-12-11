# GSAP Animation Demos

> _"The SVG scales infinitely, yet remains exactly what it is. Be like the SVG."_
> — The Tao of the Developer

Interactive demonstrations for the GSAP Typography & SVG Animation lesson.

## 📂 Demo Index

### Part I: Getting Started
| Demo | Description | Concepts |
|------|-------------|----------|
| [01-first-animation.html](./01-first-animation.html) | Your first GSAP animation | `gsap.from()`, basic properties |

### Part II: Typography Animation
| Demo | Description | Concepts |
|------|-------------|----------|
| [02-word-reveal.html](./02-word-reveal.html) | Word-by-word text reveal | `stagger`, word animation |
| [03-char-animation.html](./03-char-animation.html) | Character-by-character animation | Text splitting, `stagger` variations |
| [04-kinetic-type.html](./04-kinetic-type.html) | Interactive kinetic typography | Mouse events, hover effects |
| [05-typewriter.html](./05-typewriter.html) | Typewriter text effect | TextPlugin |
| [06-scramble-text.html](./06-scramble-text.html) | Scramble/decode text effect | ScrambleTextPlugin |

### Part III: SVG Animation
| Demo | Description | Concepts |
|------|-------------|----------|
| [07-svg-transforms.html](./07-svg-transforms.html) | Basic SVG transforms | `transformOrigin`, `repeat`, `yoyo` |
| [08-path-drawing.html](./08-path-drawing.html) | SVG path drawing effect | `strokeDasharray`, `strokeDashoffset` |
| [09-multi-path-logo.html](./09-multi-path-logo.html) | Multi-path logo animation | Sequenced path drawing |
| [10-svg-morphing.html](./10-svg-morphing.html) | Shape morphing animation | `attr`, path animation |
| [11-animated-icons.html](./11-animated-icons.html) | Animated icon transitions | Timeline, icon states |

### Part IV: Timelines & Control
| Demo | Description | Concepts |
|------|-------------|----------|
| [12-timelines.html](./12-timelines.html) | Timeline sequencing | `gsap.timeline()`, positioning |

### Part V: Easing
| Demo | Description | Concepts |
|------|-------------|----------|
| [13-easing.html](./13-easing.html) | Easing visualizer | All easing functions |

### Part VI: ScrollTrigger
| Demo | Description | Concepts |
|------|-------------|----------|
| [14-scrolltrigger.html](./14-scrolltrigger.html) | Scroll-triggered animations | ScrollTrigger, pinning, scrub |

### Part VII: Accessibility
| Demo | Description | Concepts |
|------|-------------|----------|
| [15-accessibility.html](./15-accessibility.html) | Accessible animations | `prefers-reduced-motion` |

### Part VIII: Advanced Techniques
| Demo | Description | Concepts |
|------|-------------|----------|
| [16-magnetic-buttons.html](./16-magnetic-buttons.html) | Magnetic hover effect | Mouse tracking, `elastic` ease |
| [17-cursor-follower.html](./17-cursor-follower.html) | Custom cursor follower | `quickTo`, ticker |
| [18-horizontal-scroll.html](./18-horizontal-scroll.html) | Horizontal scroll gallery | ScrollTrigger, pinning |
| [19-text-reveal-scroll.html](./19-text-reveal-scroll.html) | Text reveal on scroll | ScrollTrigger, stagger |
| [20-staggered-grid.html](./20-staggered-grid.html) | Grid animation | Grid stagger, `from: 'center'` |

---

## 🚀 How to Use

1. **Open any demo** directly in your browser
2. **View source** to see the code
3. **Experiment** by modifying values in DevTools console
4. **Copy patterns** to your own projects

## 📦 CDN Links Used

```html
<!-- GSAP Core -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>

<!-- ScrollTrigger Plugin -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

<!-- TextPlugin (for typewriter effects) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/TextPlugin.min.js"></script>
```

## ♿ Accessibility

All demos respect `prefers-reduced-motion`:

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Skip or simplify animations
}
```

## 📚 Learn More

- [Main Lesson: GSAP for Designers](../index.md)
- [GSAP Official Docs](https://gsap.com/docs/v3/)
- [Easing Visualizer](https://gsap.com/docs/v3/Eases/)

---

> _"In shipping, there is learning. In learning, there is growth. In growth, there is the Tao."_
> — The Tao of the Developer
