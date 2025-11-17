---
layout: lesson
title: 'Tailwind CSS: Design Tokens & style.css — Quick Guide'
title_alt: 'Tailwind CSS: Design Tokens & style.css — Quick Guide'
slug: tailwind-design-tokens
date: 2025-11-03
updated: 2025-11-03
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/tailwind/design-tokens/
description: 'How to define design tokens in Tailwind and when to use style.css. Clear examples and best practices.'
tags: [tailwindcss, tokens, style, pedagogy]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Design Tokens in Tailwind and How They Relate to style.css

> **Example:**
>
> - In Tailwind v3:
>   1. You have a `style.css` file with `@tailwind base;`, `@tailwind components;`, and `@tailwind utilities;`.
>   2. Your design tokens (such as colors and spacing) are defined in `tailwind.config.js`.
>   3. When you build, PostCSS processes `style.css`, and Tailwind reads your config, generating utility classes for those tokens.

> - In Tailwind v4:
>   1. Your `style.css` imports Tailwind with `@import "tailwindcss";`.
>   2. Your design tokens are written as CSS custom properties inside `@theme { ... }` blocks directly in your CSS.
>   3. PostCSS processes `style.css` and Tailwind picks up the tokens from the `@theme` block to generate utilities.

## How CSS Post-Processing Works

Tailwind CSS is a **PostCSS plugin** that transforms your CSS during build time. Here's the actual flow:

1. **`style.css` (or `tailwind.css`)** is your **entry point** — the source file that gets processed.
2. **PostCSS** reads this file and runs plugins in sequence (Tailwind → Autoprefixer → cssnano).
3. **Tailwind plugin** reads `tailwind.config.js` (v3) or `@theme` directives (v4) to understand what tokens to generate.
4. **Tailwind scans** your content files (HTML, JS, etc.) to detect which utility classes are actually used.
5. **Tailwind generates** only the CSS utilities you need, based on your config and actual usage.
6. **Output** is a processed CSS file with all utilities, base styles, and your custom CSS combined.

### The Relationship Between Files

- **`style.css`**: The **source file** that PostCSS processes. Contains:

  - `@tailwind` directives (`base`, `components`, `utilities`) that tell Tailwind where to inject generated CSS
  - Your custom CSS (global styles, component classes, overrides)
  - In v4: `@theme` blocks that define design tokens directly in CSS

- **`tailwind.config.js`** (v3): The **configuration file** that defines:

  - Design tokens (colors, spacing, typography, etc.)
  - Content paths (where to scan for class usage)
  - Plugin configuration
  - Theme extensions

- **`postcss.config.js`**: Defines the **processing pipeline** (which plugins run and in what order)

### Tailwind v3 vs v4: Configuration Approaches

**Tailwind CSS v3** (Recommended: CSS Variables + Config Mapping):

- **Recommended**: Tokens defined as CSS variables in `@layer base { :root { ... } }` in `style.css`, then referenced in `tailwind.config.js` using `var(--token-name)`
- **Alternative**: Tokens defined directly in `tailwind.config.js` (JavaScript object)
- CSS file imports Tailwind via `@tailwind` directives
- PostCSS processes CSS → Tailwind reads JS config → generates utilities
- **Key syntax**: `@layer base { :root { --token: value; } }` in CSS + `var(--token)` in config
- Benefits: Single source of truth, runtime flexibility, better tooling support

**Tailwind CSS v4** (CSS-first):

- Tokens defined directly in CSS using `@theme { ... }` blocks (no `:root` wrapper needed)
- No `tailwind.config.js` required (though still supported for compatibility)
- CSS file uses `@import "tailwindcss"` and `@theme { ... }` blocks
- **Key syntax**: `@theme { --token: value; }` in CSS (replaces `@layer base { :root { ... } }`)
- More aligned with native CSS, leverages CSS custom properties
- Zero-config content detection (automatically scans project files)

**The Difference:**

- **v3**: Use `@layer base { :root { --token: value; } }` in CSS, then map to utilities in `tailwind.config.js`
- **v4**: Use `@theme { --token: value; }` directly in CSS (no `@layer base` or `:root` needed)

### TL;DR

- **`style.css`** is the entry point that PostCSS processes — it's where Tailwind gets invoked.
- **v3 (Recommended)**: Define tokens as CSS variables in `style.css`, reference them in `tailwind.config.js`.
- **v4**: Define tokens directly in CSS using `@theme` blocks.
- PostCSS transforms your CSS source file using Tailwind as a plugin.
- Tailwind generates utilities based on your config and actual class usage in your content files.
- **Principle**: CSS holds the values, Tailwind maps them to utilities.

## Example: Tailwind v3 Setup

### Recommended Approach: CSS Variables + Config Mapping

The recommended pattern for Tailwind v3 is to **define tokens as CSS variables** in `style.css` and **reference them** in `tailwind.config.js`. This provides a single source of truth, runtime flexibility, and better tooling support.

### 1. Define Tokens in CSS (`style.css`)

Define your design token **values** as CSS custom properties:

```css
/* style.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	:root {
		/* ===== RESPONSIVE TYPOGRAPHY TOKENS ===== */
		/* Font sizes: min, preferred (vw-based), max */
		--text-2xs: clamp(0.25rem, 0.3vw + 0.15em, 0.5rem);
		--text-xs: clamp(0.375rem, 0.4vw + 0.2em, 0.625rem);
		--text-sm: clamp(0.5rem, 0.5vw + 0.25em, 0.75rem);
		--text-base: clamp(0.625rem, 0.6vw + 0.3em, 0.875rem);
		--text-lg: clamp(0.75rem, 0.8vw + 0.4em, 1rem);
		--text-xl: clamp(0.875rem, 1vw + 0.5em, 1.2rem);
		--text-2xl: clamp(1rem, 1.5vw + 0.8em, 1.5rem);
		--text-3xl: clamp(1.125rem, 2vw + 1em, 2rem);
		--text-4xl: clamp(1.25rem, 2.5vw + 1.2em, 2.5rem);
		--text-5xl: clamp(1.5rem, 3vw + 1.5em, 3.25rem);
		--text-6xl: clamp(1.75rem, 3.5vw + 1.8em, 4rem);
		--text-7xl: clamp(2rem, 4vw + 2em, 4.5rem);

		/* ===== LINE HEIGHT TOKENS ===== */
		--line-height-2xs: 1.2;
		--line-height-xs: 1.2;
		--line-height-sm: 1.35;
		--line-height-base: 1.7;
		--line-height-lg: 1.6;
		--line-height-xl: 1.35;
		--line-height-2xl: 1.25;
		--line-height-3xl: 1.2;
		--line-height-4xl: 1.15;
		--line-height-5xl: 1.1;
		--line-height-6xl: 1.05;
		--line-height-7xl: 1.05;

		/* ===== LETTER SPACING TOKENS ===== */
		--letter-spacing-xl: -0.005em;
		--letter-spacing-2xl: -0.01em;
		--letter-spacing-3xl: -0.01em;
		--letter-spacing-4xl: -0.015em;
		--letter-spacing-5xl: -0.02em;
		--letter-spacing-6xl: -0.025em;
		--letter-spacing-7xl: -0.03em;

		/* ===== COLOR TOKENS ===== */
		--color-primary-50: #eff6ff;
		--color-primary-500: #3b82f6;
		--color-primary-900: #1e3a8a;
		--color-surface-light: #f8fafc;
		--color-surface-dark: #1e293b;
		--color-content: #0f172a;
		--color-content-muted: #64748b;
		--color-content-inverted: #ffffff;
	}
}

/* Your custom component styles */
@layer components {
	.btn-primary {
		@apply bg-primary-500 text-white px-4 py-2 rounded;
	}
}
```

### 2. Reference Tokens in Config (`tailwind.config.js`)

Map CSS variables to Tailwind utilities. You can either **override** colors (replace Tailwind's defaults) or **extend** them (add new colors while keeping defaults):

#### Option A: Override Colors (Replace Tailwind Defaults)

When you define `theme.colors` (not in `extend`), you replace Tailwind's default color palette. Use this pattern to preserve defaults while overriding specific semantic colors:

```javascript
// tailwind.config.js
import { colors as defaultColors } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		// Reference CSS variables for font sizes
		fontSize: {
			'2xs': ['var(--text-2xs)', { lineHeight: 'var(--line-height-2xs)' }],
			xs: ['var(--text-xs)', { lineHeight: 'var(--line-height-xs)' }],
			sm: ['var(--text-sm)', { lineHeight: 'var(--line-height-sm)' }],
			base: ['var(--text-base)', { lineHeight: 'var(--line-height-base)' }],
			lg: ['var(--text-lg)', { lineHeight: 'var(--line-height-lg)' }],
			xl: ['var(--text-xl)', { lineHeight: 'var(--line-height-xl)', letterSpacing: 'var(--letter-spacing-xl)' }],
			'2xl': ['var(--text-2xl)', { lineHeight: 'var(--line-height-2xl)', letterSpacing: 'var(--letter-spacing-2xl)' }],
			'3xl': ['var(--text-3xl)', { lineHeight: 'var(--line-height-3xl)', letterSpacing: 'var(--letter-spacing-3xl)' }],
			'4xl': ['var(--text-4xl)', { lineHeight: 'var(--line-height-4xl)', letterSpacing: 'var(--letter-spacing-4xl)' }],
			'5xl': ['var(--text-5xl)', { lineHeight: 'var(--line-height-5xl)', letterSpacing: 'var(--letter-spacing-5xl)' }],
			'6xl': ['var(--text-6xl)', { lineHeight: 'var(--line-height-6xl)', letterSpacing: 'var(--letter-spacing-6xl)' }],
			'7xl': ['var(--text-7xl)', { lineHeight: 'var(--line-height-7xl)', letterSpacing: 'var(--letter-spacing-7xl)' }],
		},
		// Override colors: preserve defaults, add custom semantic colors
		colors: {
			// Preserve Tailwind's default colors (red, blue, green, etc.)
			...defaultColors,

			// Override/add semantic colors using CSS variables
			// These are commonly used by component libraries (e.g., shadcn/ui)
			border: 'var(--color-border)',
			input: 'var(--color-input)',
			ring: 'var(--color-ring)',
			background: 'var(--color-background)',
			foreground: 'var(--color-foreground)',

			// Semantic colors with foreground variants
			// Use: bg-primary, text-primary-foreground
			primary: {
				DEFAULT: 'var(--color-primary)',
				foreground: 'var(--color-primary-foreground)',
			},
			secondary: {
				DEFAULT: 'var(--color-secondary)',
				foreground: 'var(--color-secondary-foreground)',
			},
			destructive: {
				DEFAULT: 'var(--color-destructive)',
				foreground: 'var(--color-destructive-foreground)',
			},
			muted: {
				DEFAULT: 'var(--color-muted)',
				foreground: 'var(--color-muted-foreground)',
			},
			accent: {
				DEFAULT: 'var(--color-accent)',
				foreground: 'var(--color-accent-foreground)',
			},
			popover: {
				DEFAULT: 'var(--color-popover)',
				foreground: 'var(--color-popover-foreground)',
			},
			card: {
				DEFAULT: 'var(--color-card)',
				foreground: 'var(--color-card-foreground)',
			},
		},
		extend: {
			// Extend: Add new colors without replacing defaults
			// Use: bg-surface-light, text-content-muted
			colors: {
				surface: {
					light: 'var(--color-surface-light)',
					dark: 'var(--color-surface-dark)',
				},
				content: {
					DEFAULT: 'var(--color-content)',
					muted: 'var(--color-content-muted)',
					inverted: 'var(--color-content-inverted)',
				},
			},
			// Other tokens can also reference CSS variables
			spacing: {
				18: '4.5rem',
				88: '22rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
		},
	},
	plugins: [],
};
```

#### Understanding `defaultColors` and Color Override

**`import { colors as defaultColors } from 'tailwindcss/defaultTheme'`**:

This syntax:
```js
import { colors as defaultColors } from 'tailwindcss/defaultTheme'
```
does the following:

- Imports the default Tailwind CSS color palette (like blue, red, green, gray, etc.) from Tailwind's internal theme.
- The variable `defaultColors` will hold an object that includes all standard Tailwind color names, each with their full range of shades (like 50, 100, 200, up to 900), such as `defaultColors.red[500]`.
- When you use the spread operator `...defaultColors` inside your `theme.colors` configuration, it copies all these built-in colors into your config. This means you keep access to Tailwind’s default color utility classes (such as `bg-blue-500`, `text-red-700`, etc.) rather than replacing them entirely.

In summary:
- `import { colors as defaultColors } ...` gets all default color objects
- `...defaultColors` adds them to your own palette so that default utility classes remain available alongside your custom colors


**Color Override vs Extend**:

- **`theme.colors`** (override): Replaces the entire color palette. Use `...defaultColors` to preserve defaults while adding overrides.
- **`theme.extend.colors`** (extend): Adds new colors without affecting existing ones. Best for adding brand colors alongside defaults.

**Semantic Color Pattern** (with foreground variants):

```javascript
primary: {
	DEFAULT: 'var(--color-primary)',           // bg-primary, border-primary
	foreground: 'var(--color-primary-foreground)', // text-primary-foreground
},
```

This pattern is used by component libraries (like shadcn/ui) to ensure proper contrast:

- `bg-primary` + `text-primary-foreground` = guaranteed readable text on primary background
- Useful for buttons, cards, and other components where text color must match background

#### Option B: Extend Colors (Keep All Defaults)

If you only want to add new colors without overriding, use `extend`:

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontSize: {
			// ... font sizes ...
		},
		extend: {
			// Extend: Adds new colors, keeps all Tailwind defaults
			colors: {
				primary: {
					50: 'var(--color-primary-50)',
					500: 'var(--color-primary-500)',
					900: 'var(--color-primary-900)',
				},
				surface: {
					light: 'var(--color-surface-light)',
					dark: 'var(--color-surface-dark)',
				},
				// All default Tailwind colors (red, blue, etc.) remain available
			},
		},
	},
};
```

### Benefits of This Approach

- **Single source of truth**: Values live in CSS, not duplicated in JavaScript
- **Easier maintenance**: Change values in one place (`style.css`)
- **Runtime flexibility**: CSS variables can be changed dynamically via JavaScript or media queries
- **Clear separation**: CSS = tokens (values), Config = mapping (utilities)
- **Tooling-friendly**: CSS variables work seamlessly with browser DevTools
- **Responsive tokens**: Use `clamp()` and viewport units directly in CSS variables

### Why This Works

1. **CSS defines the design tokens** (the actual values)
2. **Tailwind config maps tokens to utilities** (the class names)
3. **PostCSS processes both** and generates the final CSS
4. **Principle**: CSS holds the values, Tailwind maps them to utilities

This pattern follows the principle: **CSS holds the values, Tailwind maps them to utilities**.

### 3. PostCSS Configuration: `postcss.config.js`

Defines the processing pipeline:

```javascript
// postcss.config.js
module.exports = {
	plugins: [
		require('tailwindcss'), // Tailwind processes @tailwind directives
		require('autoprefixer'), // Adds vendor prefixes
		...(process.env.NODE_ENV === 'production'
			? [require('cssnano')({ preset: 'default' })] // Minifies in production
			: []),
	],
};
```

## Example: Tailwind v4 Setup (CSS-First)

In Tailwind v4, you define tokens directly in your CSS file using `@theme` blocks (no `@layer base` or `:root` wrapper needed):

```css
/* style.css */
@import 'tailwindcss';

/* Define design tokens directly in CSS using @theme */
/* Note: No @layer base { :root { ... } } wrapper needed in v4 */
@theme {
	/* Colors */
	--color-primary-50: #eff6ff;
	--color-primary-500: #3b82f6;
	--color-primary-900: #1e3a8a;

	--color-surface-light: #f8fafc;
	--color-surface-dark: #1e293b;

	--color-content: #0f172a;
	--color-content-muted: #64748b;
	--color-content-inverted: #ffffff;

	/* Spacing */
	--spacing-18: 4.5rem;
	--spacing-88: 22rem;

	/* Typography */
	--font-family-display: ui-sans-serif, system-ui, 'Segoe UI', Inter, Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
		sans-serif;
	--font-family-body: ui-sans-serif, system-ui, Inter, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;

	/* Border radius */
	--radius-4xl: 2rem;

	/* Box shadow */
	--shadow-elevated: 0 12px 30px -12px rgba(59, 130, 246, 0.35);
}

/* Your custom CSS */
@layer components {
	.btn-primary {
		@apply bg-primary-500 text-white px-4 py-2 rounded;
	}
}
```

### Side-by-Side Comparison: v3 vs v4 Syntax

**Tailwind v3 (Recommended approach):**

```css
@layer base {
	:root {
		--text-base: clamp(0.625rem, 0.6vw + 0.3em, 0.875rem);
		--color-primary-500: #3b82f6;
	}
}
```

Then reference in `tailwind.config.js`:

```javascript
fontSize: {
	base: ['var(--text-base)', { lineHeight: '1.7' }],
},
colors: {
	primary: {
		500: 'var(--color-primary-500)',
	},
},
```

**Tailwind v4:**

```css
@theme {
	--text-base: clamp(0.625rem, 0.6vw + 0.3em, 0.875rem);
	--color-primary-500: #3b82f6;
}
```

No config file needed — Tailwind automatically generates utilities from `@theme` tokens.

**Key differences in v4:**

- **Syntax**: `@theme { ... }` replaces `@layer base { :root { ... } }`
- No `tailwind.config.js` required (though still supported for compatibility)
- Tokens defined as CSS custom properties in `@theme` blocks
- More aligned with native CSS standards
- Zero-config content detection (automatically scans project files)

## Rationale Behind CSS Post-Processing

### Why PostCSS?

PostCSS is a tool that transforms CSS using JavaScript plugins. It's not a preprocessor (like Sass) or a postprocessor in the traditional sense — it's a **CSS transformer** that runs during your build process.

**Benefits of the PostCSS approach:**

1. **Tree-shaking**: Tailwind scans your content files and generates only the utilities you actually use. This dramatically reduces the final CSS file size (from ~3MB of possible utilities to only what you need, often <50KB).

2. **Just-in-Time (JIT) compilation**: In Tailwind v3+, utilities are generated on-demand based on your markup. If you write `bg-primary-500`, Tailwind generates that specific class. If you never use `bg-purple-900`, it's never generated.

3. **Plugin ecosystem**: PostCSS enables a rich plugin ecosystem. Your build pipeline can include:

   - **Tailwind**: Generates utility classes
   - **Autoprefixer**: Adds vendor prefixes (`-webkit-`, `-moz-`, etc.)
   - **cssnano**: Minifies CSS for production
   - **PostCSS plugins**: Custom transformations

4. **Source of truth**: Your `style.css` file is the entry point. PostCSS processes it, and the output is a single, optimized CSS file that browsers can consume.

### The Build Process Flow

```
┌─────────────────┐
│   style.css     │  ← Source file (you write this)
│  (@tailwind...) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    PostCSS      │  ← Reads CSS, runs plugins
└────────┬────────┘
         │
         ├──► Tailwind Plugin
         │    ├── Reads tailwind.config.js (v3) or @theme (v4)
         │    ├── Scans content files for class usage
         │    └── Generates utility classes
         │
         ├──► Autoprefixer
         │    └── Adds vendor prefixes
         │
         └──► cssnano (production only)
              └── Minifies CSS
         │
         ▼
┌─────────────────┐
│  output.css     │  ← Final processed CSS (browser consumes this)
│  (utilities +   │
│   your CSS)     │
└─────────────────┘
```

### The Role of Build Tools (Vite, Webpack, Rollup, etc.)

Build tools like **Vite**, **Webpack**, or **Rollup** orchestrate the entire build process, including CSS processing. Here's how they integrate PostCSS and Tailwind:

#### How Build Tools Integrate PostCSS

**Vite** (and most modern build tools) automatically detects and processes PostCSS:

```javascript
// vite.config.js (or vite.config.ts)
import { defineConfig } from 'vite';

export default defineConfig({
	// Vite automatically detects postcss.config.js
	// No additional configuration needed for PostCSS!

	// Optional: Customize CSS processing
	css: {
		postcss: './postcss.config.js', // Explicit path (optional)
		// or inline PostCSS config:
		// postcss: {
		//   plugins: [
		//     require('tailwindcss'),
		//     require('autoprefixer'),
		//   ],
		// },
	},
});
```

**How it works:**

1. **CSS Import Detection**: When Vite encounters `import './style.css'` in your JavaScript/TypeScript files, it recognizes it as a CSS dependency.

2. **Automatic PostCSS Processing**: Vite automatically:

   - Reads `postcss.config.js` (or `postcss.config.cjs`)
   - Processes the CSS file through PostCSS plugins
   - Runs Tailwind, Autoprefixer, and other plugins in sequence

3. **Development Mode** (`vite dev`):

   - Processes CSS on-demand as files change
   - Hot Module Replacement (HMR) updates styles without full page reload
   - Fast refresh for instant feedback

4. **Production Mode** (`vite build`):
   - Processes all CSS files
   - Runs cssnano for minification (if configured)
   - Bundles and optimizes CSS output
   - Generates source maps (if enabled)

#### Complete Build Flow with Vite

```
┌──────────────────┐
│  main.js         │  ← Entry point
│  import './style.css' │   ← CSS imported via JS
│  OR               │
│  index.html       │  ← Entry point
│  <link rel="stylesheet" href="./style.css"> │   ← CSS linked directly in HTML
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     Vite         │  ← Build tool orchestrates everything
└────────┬─────────┘
         │
         ├──► JavaScript Bundling (esbuild/rollup)
         │
         └──► CSS Processing
              │
              ▼
         ┌──────────────────┐
         │   style.css      │  ← Vite extracts CSS import
         │   (@tailwind...) │
         └────────┬─────────┘
                  │
                  ▼
         ┌──────────────────┐
         │    PostCSS       │  ← Vite invokes PostCSS
         └────────┬─────────┘
                  │
                  ├──► Tailwind Plugin
                  │    ├── Reads tailwind.config.js
                  │    ├── Scans content files
                  │    └── Generates utilities
                  │
                  ├──► Autoprefixer
                  │
                  └──► cssnano (production)
                       │
                       ▼
         ┌──────────────────┐
         │  output.css      │  ← Final CSS
         │  (or injected    │
         │   into <style>)  │
         └──────────────────┘
```

#### Standalone PostCSS vs Build Tool Integration

**Standalone PostCSS** (CLI - used in some setups):

```bash
# Direct PostCSS CLI usage
postcss src/style.css -o dist/style.css

# Or with watch mode
postcss src/style.css -o dist/style.css --watch
```

- Useful for static site generators (Jekyll, Hugo)
- Explicit control over CSS processing
- Run separately from JavaScript bundling

**Build Tool Integration** (Vite, Webpack, Rollup):

```html
<!-- In your index.html -->
<link rel="stylesheet" href="/style.css" />
```
Or

```javascript
// In your JavaScript/TypeScript
import './style.css'; // Vite processes this automatically
```

- Integrated into the build pipeline
- Automatic processing when CSS is imported
- HMR support in development
- CSS code-splitting in production

#### Why Build Tools Matter

Build tools like Vite provide:

1. **Unified Pipeline**: JavaScript, CSS, and other assets processed together
2. **Hot Module Replacement**: CSS changes reflect instantly in development
3. **Optimization**: Automatic code-splitting, tree-shaking, and minification
4. **Type Safety**: TypeScript support for CSS imports (with proper plugins)
5. **Performance**: Fast development builds with esbuild, optimized production builds

**Example with Vite:**

```javascript
// src/main.js
import { createApp } from 'vue';
import './style.css'; // ← Vite processes this through PostCSS/Tailwind

createApp(App).mount('#app');
```

When you run `vite dev`, Vite:

- Processes `style.css` through PostCSS (Tailwind → Autoprefixer)
- Injects processed CSS into the page
- Watches for changes and updates via HMR

When you run `vite build`, Vite:

- Processes all CSS imports
- Generates optimized, minified CSS bundle
- Extracts CSS to separate file (or inlines small CSS)

### Why Not Just Write Regular CSS?

You could write regular CSS, but Tailwind's approach offers:

- **Consistency**: Design tokens ensure consistent spacing, colors, and typography across your entire application.
- **Maintainability**: Change a token once, update everywhere it's used.
- **Developer experience**: Utility classes are faster to write than custom CSS for common patterns.
- **Performance**: Only the CSS you use is included in the final bundle.

## Best Practices

### Token Definition

- **v3 (Recommended)**: Define tokens as CSS variables in `style.css` (in `@layer base { :root { ... } }`), then reference them in `tailwind.config.js` using `var(--token-name)`. This provides a single source of truth and runtime flexibility.
- **v3 (Alternative)**: Define tokens directly in `tailwind.config.js` under `theme.extend`. Simpler but less flexible.
- **v4**: Define tokens in `@theme` blocks in your CSS file. This aligns with native CSS and makes tokens more discoverable.

### Using Tokens in Markup

- **Avoid arbitrary values**: Instead of `bg-[#3b82f6]`, use `bg-primary-500` (defined in your tokens).
- **Semantic naming**: Use names like `content-muted` rather than `gray-500` to decouple color from meaning.
- **Consistent spacing**: Use spacing tokens (`p-4`, `gap-8`) rather than arbitrary values (`p-[1.5rem]`).

### Custom CSS in style.css

Use `style.css` for:

- **Global styles**: `:root` variables, resets, base element styling
- **Component classes**: Reusable component styles using `@layer components`
- **Complex selectors**: Styles that require CSS features Tailwind doesn't cover
- **Third-party overrides**: Adjusting styles from external libraries

### Build Process

- **Development**: Run PostCSS in watch mode to see changes immediately
- **Production**: Ensure cssnano is enabled to minify the final output
- **Content paths**: In v3, ensure `content` in `tailwind.config.js` includes all files where you use Tailwind classes

---

> Next: [Components & Design System →]({{ '/lessons/en/tailwind/components-design-system/' | relative_url }})
