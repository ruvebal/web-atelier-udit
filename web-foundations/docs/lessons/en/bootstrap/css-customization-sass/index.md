---
layout: lesson
title: 'Bootstrap CSS: CSS Customization & Sass — Design System Theming'
title_alt: 'Bootstrap CSS: CSS Customization & Sass — Design System Theming'
slug: bootstrap-css-customization-sass
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/bootstrap/css-customization-sass/
description: 'Bootstrap theming, Sass customization, CSS overrides, and design system implementation.'
tags: [bootstrapcss, sass, theming, customization, design-systems]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Bootstrap CSS: CSS Customization & Sass — Design System Theming

## Session Overview

This session explores **Bootstrap customization** and theming strategies. Students will learn how to create cohesive design systems by customizing Bootstrap's default styles, working with Sass variables, and implementing professional theming workflows.

## Learning Objectives

- Understand Bootstrap's theming architecture
- Learn to customize Bootstrap using CSS overrides
- Master Sass variable customization for comprehensive theming
- Create and maintain cohesive design systems

## Core Concepts

### Bootstrap's Theming Architecture

**Bootstrap's theming system** is built around CSS custom properties and Sass variables that control colors, typography, spacing, and component styles. This architecture allows for:

- **Consistent design tokens** across all components
- **Easy customization** without modifying source files
- **Scalable theming** for multiple brands or contexts
- **Maintainable stylesheets** with centralized design decisions

### CSS Custom Properties (CSS Variables)

Bootstrap 5 uses **CSS custom properties** for runtime theming:

```css
:root {
	--bs-primary: #007bff;
	--bs-secondary: #6c757d;
	--bs-success: #28a745;
	--bs-danger: #dc3545;
	--bs-warning: #ffc107;
	--bs-info: #17a2b8;
	--bs-light: #f8f9fa;
	--bs-dark: #343a40;
}
```

### Sass Variables for Build-time Customization

For more comprehensive theming, Bootstrap provides **Sass variables** that are compiled into CSS:

```scss
// Custom theme variables
$primary: #ff6b35;
$secondary: #f7931e;
$success: #28a745;
$danger: #dc3545;

// Typography
$font-family-base: 'Inter', sans-serif;
$font-size-base: 1rem;
$line-height-base: 1.6;

// Spacing
$spacer: 1rem;

// Border radius
$border-radius: 0.375rem;
$border-radius-lg: 0.5rem;
```

## Customization Methods

### Method 1: CSS Overrides (Quick Customization)

The simplest approach is **overriding Bootstrap's default styles** with custom CSS:

```css
/* Custom primary color */
.bg-primary {
	background-color: #ff6b35 !important;
}

.btn-primary {
	background-color: #ff6b35;
	border-color: #ff6b35;
}

.btn-primary:hover {
	background-color: #e55a2b;
	border-color: #e55a2b;
}

/* Custom navbar styling */
.navbar-brand {
	font-weight: 700;
	font-size: 1.5rem;
}

.navbar-nav .nav-link {
	font-weight: 500;
	transition: color 0.3s ease;
}

/* Custom card styling */
.card {
	border: none;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
	transform: translateY(-5px);
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

### Method 2: Sass Variable Customization (Professional Approach)

For comprehensive theming, customize Bootstrap at the source using Sass:

```scss
// 1. Import Bootstrap functions and variables
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';

// 2. Override default variables
$primary: #ff6b35;
$secondary: #f7931e;
$font-family-base: 'Inter', sans-serif;
$border-radius: 0.5rem;

// 3. Import Bootstrap components (after variable overrides)
@import 'bootstrap/scss/bootstrap';
```

### Method 3: CSS Custom Properties (Runtime Theming)

Use Bootstrap's built-in CSS custom properties for dynamic theming:

```css
/* Override Bootstrap's CSS custom properties */
:root {
	--bs-primary: #ff6b35;
	--bs-secondary: #f7931e;
	--bs-font-sans-serif: 'Inter', sans-serif;
}
```

## Hands-on Practice

### Exercise 1: Basic CSS Override Theming

Create a custom theme using CSS overrides:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Custom Bootstrap Theme</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
		<link href="custom-theme.css" rel="stylesheet" />
	</head>
	<body>
		<nav class="navbar navbar-expand-lg">
			<div class="container">
				<a class="navbar-brand" href="#">Custom Brand</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav ms-auto">
						<li class="nav-item"><a class="nav-link" href="#">Home</a></li>
						<li class="nav-item"><a class="nav-link" href="#">About</a></li>
						<li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
					</ul>
				</div>
			</div>
		</nav>

		<div class="container mt-5">
			<div class="row">
				<div class="col-md-8">
					<div class="card custom-card">
						<div class="card-body">
							<h2 class="card-title">Custom Styled Card</h2>
							<p class="card-text">
								This card uses custom CSS overrides to create a unique design while maintaining Bootstrap's responsive behavior.
							</p>
							<button class="btn btn-primary">Custom Primary Button</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
	</body>
</html>
```

**custom-theme.css:**

```css
/* Custom color scheme */
:root {
	--custom-primary: #ff6b35;
	--custom-secondary: #f7931e;
	--custom-accent: #ffcc02;
}

/* Override Bootstrap components */
.navbar-brand {
	color: var(--custom-primary) !important;
	font-weight: 700;
	font-size: 1.5rem;
}

.navbar-nav .nav-link {
	color: var(--custom-secondary) !important;
	font-weight: 500;
	transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
	color: var(--custom-primary) !important;
}

.custom-card {
	background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
	border: 2px solid var(--custom-accent);
	border-radius: 1rem;
	box-shadow: 0 8px 25px rgba(255, 107, 53, 0.15);
}

.btn-primary {
	background-color: var(--custom-primary);
	border-color: var(--custom-primary);
	padding: 0.75rem 2rem;
	font-weight: 600;
	border-radius: 2rem;
	transition: all 0.3s ease;
}

.btn-primary:hover {
	background-color: #e55a2b;
	border-color: #e55a2b;
	transform: translateY(-2px);
	box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
}

/* Custom utility classes */
.text-custom-primary {
	color: var(--custom-primary) !important;
}

.bg-custom-gradient {
	background: linear-gradient(135deg, var(--custom-primary) 0%, var(--custom-secondary) 100%);
}
```

### Exercise 2: Sass-based Theming (Advanced)

For more advanced customization using Sass:

```scss
// custom-bootstrap.scss
// 1. Import Bootstrap's functions and variables
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';

// 2. Override default variables BEFORE importing Bootstrap
$primary: #ff6b35;
$secondary: #f7931e;
$font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$border-radius: 0.75rem;
$spacer: 1.25rem;

// 3. Import Bootstrap components
@import '~bootstrap/scss/bootstrap';

// 4. Add custom styles after Bootstrap import
.custom-hero {
	background: linear-gradient(135deg, $primary 0%, $secondary 100%);
	color: white;
	padding: $spacer * 4;
	border-radius: $border-radius-lg;

	.btn-primary {
		@extend .btn, .btn-primary;
		padding: $spacer * 0.75 $spacer * 2;
		border-radius: 2rem;
		font-weight: 600;
	}
}
```

## Advanced Theming Techniques

### Color Palette Generation

Create harmonious color palettes using Bootstrap's color system:

```scss
// Generate color variations
$primary: #007bff;
$secondary: #6c757d;

// Bootstrap automatically generates these variations:
// --bs-primary-50, --bs-primary-100, --bs-primary-200, etc.
// --bs-secondary-50, --bs-secondary-100, --bs-secondary-200, etc.
```

### Typography System Customization

Customize Bootstrap's typography scale:

```scss
// Custom typography scale
$font-sizes: (
	1: 3rem,
	2: 2.25rem,
	3: 1.75rem,
	4: 1.5rem,
	5: 1.25rem,
	6: 1rem,
);

$h1-font-size: map-get($font-sizes, 1);
$h2-font-size: map-get($font-sizes, 2);
// etc.
```

### Spacing System Customization

Create custom spacing scales:

```scss
// Custom spacing scale
$spacers: (
	0: 0,
	1: 0.25rem,
	2: 0.5rem,
	3: 1rem,
	4: 1.5rem,
	5: 2rem,
	6: 3rem,
	7: 4rem,
	8: 6rem,
);
```

## Design System Best Practices

### Consistent Design Tokens

Establish a systematic approach to design tokens:

```scss
// Brand colors
$brand-colors: (
	'primary': #ff6b35,
	'secondary': #f7931e,
	'accent': #ffcc02,
	'neutral': #6c757d,
);

// Typography scale
$type-scale: (
	'xs': 0.75rem,
	'sm': 0.875rem,
	'base': 1rem,
	'lg': 1.125rem,
	'xl': 1.25rem,
	'2xl': 1.5rem,
	'3xl': 1.875rem,
	'4xl': 2.25rem,
	'5xl': 3rem,
);

// Spacing scale
$space-scale: (
	'xs': 0.25rem,
	'sm': 0.5rem,
	'md': 1rem,
	'lg': 1.5rem,
	'xl': 2rem,
	'2xl': 3rem,
);
```

### Component-level Theming

Apply design tokens consistently across components:

```scss
// Button theming
.btn {
	&.btn-primary {
		background-color: map-get($brand-colors, 'primary');
		border-color: map-get($brand-colors, 'primary');

		&:hover {
			background-color: darken(map-get($brand-colors, 'primary'), 10%);
			border-color: darken(map-get($brand-colors, 'primary'), 10%);
		}
	}

	&.btn-secondary {
		background-color: map-get($brand-colors, 'secondary');
		border-color: map-get($brand-colors, 'secondary');
	}
}

// Card theming
.card {
	border-radius: map-get($space-scale, 'lg');
	box-shadow: 0 4px 6px rgba(map-get($brand-colors, 'neutral'), 0.1);

	.card-title {
		font-size: map-get($type-scale, 'xl');
		font-weight: 600;
	}
}
```

## Critical Reflection Prompts

### Exploration

- How did customizing Bootstrap's default styles affect your understanding of CSS architecture?
- What surprised you most about the relationship between Sass variables and compiled CSS?

### Reflection

- How does Bootstrap's theming approach compare to building a design system from scratch?
- In what ways does customization reflect principles of progressive enhancement?

### Conceptualization

- How do design tokens relate to brand identity and consistency across digital products?
- What are the accessibility implications of custom color and typography systems?

### Production

- How might Bootstrap's theming approach scale for larger projects or design teams?
- What are the performance implications of custom theming versus using default Bootstrap styles?

### Exhibition

- How will you demonstrate the cohesiveness and professionalism of your custom Bootstrap theme?
- What alternative theming approaches could achieve similar design system consistency?

## References & Further Reading

### Official Documentation

- [Bootstrap Theming](https://getbootstrap.com/docs/5.3/customize/overview/)
- [Bootstrap Sass Variables](https://getbootstrap.com/docs/5.3/customize/sass/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

### Design Systems & Theming

- [Design Tokens](https://design-tokens.github.io/)
- [Building Design Systems](https://www.designsystems.com/)
- [Theming with CSS Custom Properties](https://web.dev/building-a-theme-system/)

### Sass & Build Tools

- [Sass Documentation](https://sass-lang.com/documentation)
- [Webpack with Sass](https://webpack.js.org/loaders/sass-loader/)
- [Vite with Sass](https://vitejs.dev/guide/features.html#css-pre-processors)

### Color Theory & Accessibility

- [Color Theory for Designers](https://www.smashingmagazine.com/2010/02/color-theory-for-designers-part-1-the-meaning-of-color/)
- [WebAIM Color Contrast](https://webaim.org/resources/contrastchecker/)
- [Inclusive Color Palettes](https://stripe.com/docs/payments/elements/design#inclusive-color-palettes)

> **Next:** [S5 - Interactivity & JavaScript →]({{ '/lessons/en/bootstrap/interactivity-js-components/' | relative_url }})