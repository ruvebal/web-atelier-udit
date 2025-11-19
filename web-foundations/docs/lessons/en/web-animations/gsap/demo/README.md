# GSAP Animation Demos

Interactive examples demonstrating GSAP's core features and advanced techniques.

## 📂 Demo Files

### Completed Demos

| Demo | File | Concepts | Difficulty |
|------|------|----------|------------|
| **Tweens & Timelines** | [01-tweens-and-timelines.html](./01-tweens-and-timelines.html) | `.to()`, `.from()`, `.fromTo()`, Timeline sequencing | ⭐ Beginner |
| **ScrollTrigger Intro** | [04-scrolltrigger-intro.html](./04-scrolltrigger-intro.html) | Scroll animations, scrub, pin, parallax | ⭐⭐ Intermediate |
| **npm Setup Example** | [npm-setup-example/](./npm-setup-example/) | Modern build tools, ES modules, Vite | ⭐⭐ Intermediate |

### Coming Soon

| Demo | Description | Status |
|------|-------------|--------|
| **02-easing-visualizer.html** | Interactive easing comparison tool | 🚧 Planned |
| **03-stagger-effects.html** | Grid animations, stagger configurations | 🚧 Planned |
| **05-svg-animations.html** | SVG path drawing, morphing, transforms | 🚧 Planned |
| **06-interactive-animations.html** | Mouse follow, hover effects, draggable | 🚧 Planned |
| **07-design-patterns.html** | Micro-interactions, page transitions, loaders | 🚧 Planned |

## 🚀 Running the Demos

### Method 1: Open HTML Files Directly (CDN Demos)

Most demos use CDN links and can be opened directly in a browser:

```bash
# Just open in your browser:
open 01-tweens-and-timelines.html
```

### Method 2: Local Server (Recommended)

For best results, serve demos via local server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000

# Using VS Code Live Server extension
# Right-click HTML file → "Open with Live Server"
```

Then visit: `http://localhost:8000/01-tweens-and-timelines.html`

### Method 3: npm Example (Modern Build)

For the npm setup example:

```bash
cd npm-setup-example
npm install
npm run dev
```

## 📚 Learning Path

### Stage 1: Foundation (Start Here)
1. **01-tweens-and-timelines.html**
   - Understand `.to()`, `.from()`, `.fromTo()`
   - Learn timeline sequencing
   - Master relative positioning

### Stage 2: Scroll Animations
2. **04-scrolltrigger-intro.html**
   - ScrollTrigger basics
   - Scrubbing vs toggle actions
   - Pinning elements

### Stage 3: Modern Workflow
3. **npm-setup-example/**
   - Set up GSAP with build tools
   - Import modules properly
   - Optimize bundle size

### Stage 4: Advanced Techniques (Coming Soon)
4. Easing, stagger, SVG, interactions, patterns

## 💡 Demo Features

All demos include:

✅ **Liquid template variables** — Links work in both dev and production
✅ **Accessibility** — Respect `prefers-reduced-motion`
✅ **Interactive controls** — Buttons to trigger animations
✅ **Code snippets** — See the code that powers each demo
✅ **Responsive** — Works on mobile and desktop
✅ **Comments** — Inline explanations for learning

## 🎯 Exercise Ideas

Use these demos as starting points for your own experiments:

### Beginner Exercises
- [ ] Modify timing and easing in timeline demo
- [ ] Add your own scroll-triggered card
- [ ] Change colors and styling

### Intermediate Exercises
- [ ] Create a 5-step timeline sequence
- [ ] Build a horizontal scrolling gallery
- [ ] Implement a progress bar that fills on scroll

### Advanced Exercises
- [ ] Combine multiple plugins (ScrollTrigger + Draggable)
- [ ] Create a physics-based animation
- [ ] Build an interactive data visualization

## 🔗 Resources

- **Main Lesson**: [../index.md](../index.md)
- **GSAP Docs**: https://greensock.com/docs/
- **Easing Visualizer**: https://greensock.com/ease-visualizer/
- **CodePen Collection**: https://codepen.io/collection/DYqKXQ

## 🐛 Debugging Tips

**Demo not working?**

1. **Check console** — Open DevTools (F12) and look for errors
2. **CDN loading** — Ensure internet connection for CDN demos
3. **CORS issues** — Use a local server, don't open HTML files directly via `file://`
4. **Browser support** — Test in Chrome/Firefox/Safari (latest versions)
5. **JavaScript enabled** — Ensure JS isn't blocked by extensions

**ScrollTrigger not triggering?**

```javascript
// Add markers for debugging
scrollTrigger: {
  trigger: '.element',
  markers: true  // Shows visual trigger points
}

// Refresh after DOM changes
ScrollTrigger.refresh();

// Log all triggers
ScrollTrigger.getAll().forEach(trigger => console.log(trigger));
```

## 📝 License

- **Code**: MIT License — Use freely in your projects
- **Content**: CC BY-NC-SA 4.0 — Attribution required for educational use

---

**Questions?** Open an issue or ask in class!

**Found a bug?** Pull requests welcome 🙂

