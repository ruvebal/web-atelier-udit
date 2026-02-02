# Back to Top Button Implementation Guide

## Context
This guide documents the successful implementation of a back-to-top button in a Jekyll + Liquid + Tailwind CSS project. Use this as a reference for implementing the same feature in other Markdown/Liquid layout projects.

## Problem Solved
The back-to-top button was initially not visible due to:
1. Layout files requiring full Jekyll rebuild (not just livereload)
2. CSS changes needing regeneration
3. Browser cache preventing visibility of new assets
4. Button being hidden by default until scroll threshold is reached

## Implementation Steps

### 1. Add HTML Button to Layout File

**Location**: `_layouts/lesson.html` (or your equivalent layout file)

**Position**: Inside the main scrollable container, before the article content

```html
<div class="lesson-main">
    <!-- Back to top button -->
    <button id="back-to-top" class="back-to-top" aria-label="{% if page.lang == 'es' %}Volver arriba{% else %}Back to top{% endif %}" title="{% if page.lang == 'es' %}Volver arriba{% else %}Back to top{% endif %}">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    </button>

    <article class="lesson-content">
        <!-- Your content here -->
    </article>
</div>
```

**Key Points**:
- Place button inside the scrollable container (`.lesson-main` in this case)
- Use semantic HTML with proper ARIA labels
- Support i18n with Liquid conditionals if needed
- Use inline SVG for the up arrow icon

### 2. Add JavaScript Functionality

**Location**: Same layout file, in existing `<script>` block or create new one

**Code**:
```javascript
(function () {
    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    const lessonMain = document.querySelector('.lesson-main'); // Your scrollable container

    if (backToTopButton && lessonMain) {
        // Show/hide button based on scroll position
        lessonMain.addEventListener('scroll', function() {
            if (lessonMain.scrollTop > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            lessonMain.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
})();
```

**Key Points**:
- Wrap in IIFE to avoid global scope pollution
- Check elements exist before adding listeners
- Use 300px scroll threshold (adjust as needed)
- Target the correct scrollable container (not `window` if using custom scroll containers)
- Use `scrollTo` with `behavior: 'smooth'` for animation

### 3. Add CSS Styles

**Location**: Main site CSS file (e.g., `assets/css/site.css`)

**Code**:
```css
/* ========================================
   Back to Top Button
   ======================================== */

.back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    background: var(--primary);
    color: var(--on-primary);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    opacity: 0;
    visibility: hidden;
    transform: translateY(1rem);
    transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease, background-color 0.2s ease;
    z-index: 90;
}

.back-to-top:hover {
    background: var(--primary-hover);
    transform: translateY(0);
}

.back-to-top:focus {
    outline: 2px solid var(--focus-outline);
    outline-offset: 2px;
}

.back-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.back-to-top svg {
    width: 1.25rem;
    height: 1.25rem;
}

/* Dark mode support */
.dark .back-to-top {
    background: #3b82f6;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.dark .back-to-top:hover {
    background: #2563eb;
}

/* Mobile adjustments */
@media (max-width: 768px) {
    .back-to-top {
        bottom: 1rem;
        right: 1rem;
        width: 2.5rem;
        height: 2.5rem;
    }
    
    .back-to-top svg {
        width: 1rem;
        height: 1rem;
    }
}

/* Hide in print */
@media print {
    .back-to-top {
        display: none !important;
    }
}
```

**Key Points**:
- Use `position: fixed` for viewport-relative positioning
- Start hidden with `opacity: 0` and `visibility: hidden`
- Use `.visible` class to show (toggled by JavaScript)
- Add smooth transitions for professional feel
- Include hover and focus states for accessibility
- Support dark mode if your project uses it
- Make responsive for mobile devices
- Hide in print media
- Adjust z-index to work with your layout (avoid conflicts with modals, dropdowns, etc.)

### 4. CSS Variable Requirements

Ensure your CSS has these variables defined (or replace with hardcoded colors):

```css
:root {
    --primary: #1d4ed8;           /* Button background */
    --primary-hover: #1e40af;     /* Button hover state */
    --on-primary: #ffffff;        /* Icon color */
    --focus-outline: #93c5fd;     /* Focus ring color */
}
```

### 5. Build and Deploy

**Critical**: Layout and CSS changes require full rebuild:

```bash
# Stop current server (Ctrl+C)

# Rebuild and serve (adjust command for your project)
npm run develop
# or
bundle exec jekyll serve --livereload

# For production build
npm run build
```

**Important Notes**:
- Layout file changes (`_layouts/*.html`) are NOT picked up by livereload alone
- CSS changes in source files need regeneration
- Always do a hard refresh in browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)

### 6. Testing Checklist

After implementation, verify:

- [ ] Button HTML exists in generated `_site` HTML files
- [ ] CSS classes exist in generated `_site/assets/css/*.css` files
- [ ] Button is hidden on page load (check DevTools)
- [ ] Button appears after scrolling down ~300px
- [ ] Button disappears when scrolling back to top
- [ ] Clicking button smoothly scrolls to top
- [ ] Button has proper hover effects
- [ ] Button has visible focus state (keyboard navigation)
- [ ] Button works on mobile devices
- [ ] Button is hidden in print view
- [ ] Dark mode styling works (if applicable)
- [ ] No JavaScript errors in console

### 7. Troubleshooting

**Button not visible after rebuild:**
1. Hard refresh browser (`Cmd+Shift+R`)
2. Check browser DevTools Console for JS errors
3. Verify button exists in DOM: search for `id="back-to-top"` in Elements panel
4. Force visibility in Console: `document.getElementById('back-to-top').classList.add('visible')`
5. Check CSS is loaded: search for `.back-to-top` in Styles panel

**Button appears but doesn't work:**
1. Check JavaScript console for errors
2. Verify scroll container selector matches your layout
3. Test scroll event: `document.querySelector('.lesson-main').addEventListener('scroll', () => console.log('scrolling'))`

**Button conflicts with other elements:**
1. Adjust `z-index` value (currently 90)
2. Change `bottom` and `right` positioning
3. Check for CSS conflicts with other fixed/sticky elements

### 8. Customization Options

**Scroll threshold**: Change `300` to desired pixel value
```javascript
if (lessonMain.scrollTop > 500) { // Show after 500px
```

**Button position**: Modify CSS
```css
.back-to-top {
    bottom: 1rem;  /* Distance from bottom */
    left: 2rem;    /* Change to left side */
}
```

**Button style**: Modify CSS
```css
.back-to-top {
    border-radius: 0.5rem;  /* Square with rounded corners */
    width: 4rem;            /* Larger button */
    height: 4rem;
}
```

**Animation speed**: Adjust transition duration
```css
transition: opacity 0.5s ease, visibility 0.5s ease, transform 0.5s ease;
```

## Adaptation for Other Projects

### For Standard Jekyll Projects
- Use same approach, adjust container selectors
- If scrolling on `window` instead of container, use `window.scrollY` instead of `element.scrollTop`

### For Tailwind-Only Projects (No Jekyll)
- Remove Liquid syntax from aria-label
- Hard-code language strings or use JavaScript i18n
- Same CSS approach (or convert to Tailwind utility classes)

### For Other Static Site Generators (Hugo, 11ty, etc.)
- Adapt Liquid syntax to template engine syntax
- Same HTML structure and JavaScript logic
- Same CSS approach

## Files Modified in This Implementation

1. `/docs/_layouts/lesson.html` - Added button HTML and JavaScript
2. `/docs/assets/css/site.css` - Added button styles

## Success Criteria

✅ Button appears after scrolling down
✅ Button smoothly scrolls to top when clicked
✅ Button has proper accessibility attributes
✅ Button works on desktop and mobile
✅ Button respects dark mode
✅ Button hidden in print
✅ No JavaScript errors
✅ Smooth animations and transitions

---

**Date Created**: 2026-01-29
**Project**: web-atelier-udit
**Status**: ✅ Implemented and tested
