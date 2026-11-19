# GSAP with npm & Vite Example

This example demonstrates how to use GSAP with modern build tools (npm + Vite).

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

## Project Structure

```
npm-setup-example/
├── index.html          # HTML entry point
├── main.js             # JavaScript with GSAP imports
├── style.css           # Styles
├── package.json        # Dependencies
└── README.md           # This file
```

## Key Differences from CDN

### CDN (Simple)
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script>
  gsap.to('.box', { x: 100 }); // Global gsap object
</script>
```

### npm (Modern)
```javascript
import { gsap } from 'gsap';  // ES module import
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.to('.box', { x: 100 });
```

## Advantages of npm Method

✅ **Tree-shaking** — Only include plugins you actually use
✅ **Version control** — Lock dependencies in `package.json`
✅ **Offline development** — No CDN required
✅ **Type safety** — Use with TypeScript
✅ **Better IDE support** — Autocomplete and type hints
✅ **Module system** — Clean imports and exports

## Common GSAP Plugins

```javascript
// Import what you need
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register plugins
gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);
```

## Optional Plugins

GSAP 3.13 and later publish plugins such as MorphSVG, DrawSVG, and SplitText on npm. Import only the plugins the project uses, then register them with `gsap.registerPlugin()`.

```bash
npm install gsap
```

## Resources

- [GSAP Docs](https://greensock.com/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [npm Installation](https://greensock.com/docs/v3/Installation)

