# Components & Design System Demo

This demo showcases a complete design system built with Tailwind CSS using the `<template>` approach for SPA routing.

## Features

- **HTML `<template>` elements** for clean, safe rendering
- **Design tokens** (colors, spacing, typography)
- **Component library** (buttons, cards, forms)
- **Accessibility-first** approach with ARIA attributes
- **Responsive design** with mobile-first breakpoints

## Running the Demo

1. Open `index.html` in a browser with a local server
2. Navigate using the top menu or hash URLs:
   - `#/` - Home
   - `#/buttons` - Button components
   - `#/cards` - Card components
   - `#/forms` - Form components
   - `#/tokens` - Design tokens

## File Structure

```
demo/
├── index.html          # Main HTML with all templates
├── src/
│   ├── main.js         # Application entry point
│   ├── router.js       # SPA routing logic
│   ├── style.css       # Tailwind + custom styles
│   └── views/
│       └── index.js    # View registry
└── README.md           # This file
```

## Key Concepts

- **Template-based views**: Each view is defined as an HTML `<template>` element
- **Clone and append**: Router clones template content into `#app` container
- **Component patterns**: Reusable CSS classes defined in `style.css`
- **Design tokens**: Extended Tailwind config (colors, spacing, etc.)

## Related Lesson

See the full lesson at `/lessons/en/tailwind/components-design-system/`
