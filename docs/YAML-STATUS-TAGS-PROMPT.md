# YAML Status Tags with CSS Badge Rendering - Implementation Prompt

> **Purpose**: This document provides a comprehensive specification for implementing a bilingual status badge system using YAML front matter and CSS styling. Follow these instructions to replicate the exact system used in the Web Atelier UDIT project.

---

## System Overview

The status tag system consists of three integrated components:

1. **YAML Front Matter** - Status field in markdown file metadata
2. **Liquid Template Logic** - Conditional rendering with bilingual support and dynamic class generation
3. **CSS Styling** - Color-coded badges with light/dark mode support

---

## 1. YAML Front Matter Configuration

### Basic Usage

Add a `status` field to your markdown file's front matter:

```yaml
---
layout: lesson
title: 'Your Lesson Title'
slug: your-lesson-slug
date: 2026-01-15
author: 'Author Name'
lang: es
status: borrador
---
```

### Supported Status Values

The system supports the following status values (case-insensitive):

| Status Value                                 | Badge Color | English Display | Spanish Display |
| -------------------------------------------- | ----------- | --------------- | --------------- |
| `finished` / `terminado`                     | Green       | ✓ Finished      | ✓ Finalizado    |
| `draft` / `borrador`                         | Yellow      | Draft           | Borrador        |
| `in progress` / `in-progress` / `en proceso` | Yellow      | In Progress     | En Proceso      |
| Any other value                              | Default     | Capitalized     | Capitalized     |

### Example Front Matter Configurations

**Spanish - Draft status:**

```yaml
---
layout: lesson
title: 'Ilustración Aplicada: Productos Digitales Web-App'
title_alt: 'Ilustración Aplicada: Productos Digitales Web-App'
slug: ilustracion-webapp
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /tracks/es/ilustracion-webapp/
description: 'Curso del módulo (4 sesiones): objetivos, metodología, entregables.'
tags: [ilustracion, web, webapp, html, css]
status: borrador
---
```

**English - Finished status:**

```yaml
---
layout: lesson
title: 'Web Animations with CSS and JavaScript'
slug: web-animations
date: 2026-01-10
author: 'John Doe'
lang: en
status: finished
---
```

**In Progress status:**

```yaml
---
layout: lesson
title: 'Responsive Design Fundamentals'
slug: responsive-design
date: 2026-01-12
lang: en
status: in progress
---
```

---

## 2. Liquid Template Logic

### Complete Template Code

Add this to your layout file (e.g., `_layouts/lesson.html`) where you want the status badge to appear:

```liquid
{% if page.status %}
{% assign status_lower = page.status | downcase %}
<span class="lesson-status status-{{ page.status | downcase | replace: ' ', '-' }} flex-shrink-0">
	{% if status_lower == 'finished' or status_lower == 'terminado' %}
		{% if page.lang == 'es' %}✓ Finalizado{% else %}✓ Finished{% endif %}
	{% elsif status_lower == 'draft' or status_lower == 'borrador' %}
		{% if page.lang == 'es' %}Borrador{% else %}Draft{% endif %}
	{% elsif status_lower == 'in progress' or status_lower == 'in-progress' or status_lower == 'en proceso' %}
		{% if page.lang == 'es' %}En Proceso{% else %}In Progress{% endif %}
	{% else %}
		{{ page.status | capitalize }}
	{% endif %}
</span>
{% endif %}
```

### Template Logic Breakdown

| Step                   | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `{% if page.status %}` | Only render badge if status field exists                                |
| `status_lower`         | Convert to lowercase for case-insensitive comparison                    |
| `status-{{ ... }}`     | Generate dynamic CSS class (e.g., `status-draft`, `status-in-progress`) |
| `replace: ' ', '-'`    | Convert spaces to hyphens for valid CSS class names                     |
| `page.lang == 'es'`    | Bilingual output based on page language                                 |
| `capitalize`           | Fallback formatting for custom status values                            |

### Full Layout Context Example

Here's how the status badge fits into a complete lesson header:

```html
<header class="lesson-header">
	<div class="flex items-start justify-between gap-4 mb-4">
		<div class="flex-1">
			<h1 class="lesson-title">{{ page.title | escape }}</h1>
			{% if page.title_alt %}
			<h2 class="lesson-subtitle">{{ page.title_alt | escape }}</h2>
			{% endif %}
		</div>
		{% if page.status %} {% assign status_lower = page.status | downcase %}
		<span class="lesson-status status-{{ page.status | downcase | replace: ' ', '-' }} flex-shrink-0">
			{% if status_lower == 'finished' or status_lower == 'terminado' %} {% if page.lang == 'es' %}✓ Finalizado{% else %}✓
			Finished{% endif %} {% elsif status_lower == 'draft' or status_lower == 'borrador' %} {% if page.lang == 'es'
			%}Borrador{% else %}Draft{% endif %} {% elsif status_lower == 'in progress' or status_lower == 'in-progress' or
			status_lower == 'en proceso' %} {% if page.lang == 'es' %}En Proceso{% else %}In Progress{% endif %} {% else %} {{
			page.status | capitalize }} {% endif %}
		</span>
		{% endif %}
	</div>
	<div class="lesson-meta">
		<span class="lesson-author">{{ page.author | default: "Web Atelier" }}</span>
		<time class="lesson-date" datetime="{{ page.date | date: '%Y-%m-%d' }}">{{ page.date | date: '%-d %B %Y' }}</time>
	</div>
</header>
```

---

## 3. CSS Styling

### Complete CSS for Status Badges

Add these styles to your main stylesheet:

```css
/* ========================================
   Status Badge Base Styles
   ======================================== */
.lesson-status {
	display: inline-flex;
	align-items: center;
	padding: 0.375rem 0.75rem;
	border-radius: 0.5rem;
	font-size: 0.75rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	white-space: nowrap;
}

/* ========================================
   Finished/Completed Status (Green)
   ======================================== */

/* Light Mode */
.lesson-status.status-finished,
.lesson-status.status-terminado,
.lesson-status[class*='status-finished'],
.lesson-status[class*='status-terminado'] {
	background: #dcfce7; /* green-100 */
	color: #166534; /* green-800 */
}

/* Dark Mode */
.dark .lesson-status.status-finished,
.dark .lesson-status.status-terminado,
.dark .lesson-status[class*='status-finished'],
.dark .lesson-status[class*='status-terminado'] {
	background: #14532d; /* green-900 */
	color: #86efac; /* green-300 */
}

/* ========================================
   Draft/In Progress Status (Yellow/Amber)
   ======================================== */

/* Light Mode */
.lesson-status.status-draft,
.lesson-status.status-borrador,
.lesson-status.status-en-proceso,
.lesson-status[class*='in-progress'],
.lesson-status.status-in-progress,
.lesson-status[class*='in progress'],
.lesson-status[class*='status-draft'],
.lesson-status[class*='status-borrador'],
.lesson-status[class*='status-en-proceso'] {
	background: #fef3c7; /* amber-100 */
	color: #92400e; /* amber-800 */
}

/* Dark Mode */
.dark .lesson-status.status-draft,
.dark .lesson-status.status-borrador,
.dark .lesson-status.status-en-proceso,
.dark .lesson-status[class*='in-progress'],
.dark .lesson-status.status-in-progress,
.dark .lesson-status[class*='in progress'],
.dark .lesson-status[class*='status-draft'],
.dark .lesson-status[class*='status-borrador'],
.dark .lesson-status[class*='status-en-proceso'] {
	background: #78350f; /* amber-900 */
	color: #fde047; /* yellow-300 */
}

/* ========================================
   Responsive Adjustments
   ======================================== */
@media (max-width: 768px) {
	.lesson-header .flex {
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
	}

	.lesson-status {
		align-self: flex-start;
	}
}
```

### CSS Class Generation Reference

The template generates CSS classes dynamically:

| YAML Value    | Generated Class      |
| ------------- | -------------------- |
| `finished`    | `status-finished`    |
| `terminado`   | `status-terminado`   |
| `draft`       | `status-draft`       |
| `borrador`    | `status-borrador`    |
| `in progress` | `status-in-progress` |
| `In Progress` | `status-in-progress` |
| `en proceso`  | `status-en-proceso`  |
| `custom`      | `status-custom`      |

---

## 4. Extending the System

### Adding New Status Types

To add a new status type (e.g., "archived" / "archivado"):

**Step 1: Update the Liquid template:**

```liquid
{% if page.status %}
{% assign status_lower = page.status | downcase %}
<span class="lesson-status status-{{ page.status | downcase | replace: ' ', '-' }} flex-shrink-0">
	{% if status_lower == 'finished' or status_lower == 'terminado' %}
		{% if page.lang == 'es' %}✓ Finalizado{% else %}✓ Finished{% endif %}
	{% elsif status_lower == 'draft' or status_lower == 'borrador' %}
		{% if page.lang == 'es' %}Borrador{% else %}Draft{% endif %}
	{% elsif status_lower == 'in progress' or status_lower == 'in-progress' or status_lower == 'en proceso' %}
		{% if page.lang == 'es' %}En Proceso{% else %}In Progress{% endif %}
	{% elsif status_lower == 'archived' or status_lower == 'archivado' %}
		{% if page.lang == 'es' %}📦 Archivado{% else %}📦 Archived{% endif %}
	{% else %}
		{{ page.status | capitalize }}
	{% endif %}
</span>
{% endif %}
```

**Step 2: Add CSS for the new status:**

```css
/* Archived Status (Gray) */
.lesson-status.status-archived,
.lesson-status.status-archivado,
.lesson-status[class*='status-archived'],
.lesson-status[class*='status-archivado'] {
	background: #f3f4f6; /* gray-100 */
	color: #4b5563; /* gray-600 */
}

.dark .lesson-status.status-archived,
.dark .lesson-status.status-archivado,
.dark .lesson-status[class*='status-archived'],
.dark .lesson-status[class*='status-archivado'] {
	background: #374151; /* gray-700 */
	color: #d1d5db; /* gray-300 */
}
```

### Adding More Color Variants

Here's a complete color palette for additional status types:

```css
/* ========================================
   Additional Status Colors
   ======================================== */

/* Review/Pending (Blue) */
.lesson-status.status-review,
.lesson-status.status-revision,
.lesson-status.status-pending,
.lesson-status.status-pendiente {
	background: #dbeafe; /* blue-100 */
	color: #1e40af; /* blue-800 */
}

.dark .lesson-status.status-review,
.dark .lesson-status.status-revision,
.dark .lesson-status.status-pending,
.dark .lesson-status.status-pendiente {
	background: #1e3a8a; /* blue-900 */
	color: #93c5fd; /* blue-300 */
}

/* Deprecated/Obsolete (Red) */
.lesson-status.status-deprecated,
.lesson-status.status-obsoleto,
.lesson-status.status-obsolete {
	background: #fee2e2; /* red-100 */
	color: #991b1b; /* red-800 */
}

.dark .lesson-status.status-deprecated,
.dark .lesson-status.status-obsoleto,
.dark .lesson-status.status-obsolete {
	background: #7f1d1d; /* red-900 */
	color: #fca5a5; /* red-300 */
}

/* Beta/Experimental (Purple) */
.lesson-status.status-beta,
.lesson-status.status-experimental {
	background: #f3e8ff; /* purple-100 */
	color: #6b21a8; /* purple-800 */
}

.dark .lesson-status.status-beta,
.dark .lesson-status.status-experimental {
	background: #581c87; /* purple-900 */
	color: #d8b4fe; /* purple-300 */
}

/* New/Featured (Teal) */
.lesson-status.status-new,
.lesson-status.status-nuevo,
.lesson-status.status-featured,
.lesson-status.status-destacado {
	background: #ccfbf1; /* teal-100 */
	color: #115e59; /* teal-800 */
}

.dark .lesson-status.status-new,
.dark .lesson-status.status-nuevo,
.dark .lesson-status.status-featured,
.dark .lesson-status.status-destacado {
	background: #134e4a; /* teal-900 */
	color: #5eead4; /* teal-300 */
}
```

---

## 5. File Structure Summary

```
your-project/
├── _layouts/
│   └── lesson.html          # Layout with status badge template
├── assets/
│   └── css/
│       └── site.css         # Status badge CSS styles
└── content/
    └── your-lesson.md       # Content file with status in front matter
```

---

## 6. Visual Reference

### Badge Appearance

| Status      | Light Mode                              | Dark Mode                                |
| ----------- | --------------------------------------- | ---------------------------------------- |
| Finished    | 🟢 Green bg (#dcfce7) + Dark green text | 🟢 Dark green bg (#14532d) + Light green |
| Draft       | 🟡 Amber bg (#fef3c7) + Dark amber text | 🟡 Dark amber bg (#78350f) + Yellow text |
| In Progress | 🟡 Amber bg (#fef3c7) + Dark amber text | 🟡 Dark amber bg (#78350f) + Yellow text |
| Archived    | ⚪ Gray bg (#f3f4f6) + Gray text        | ⚪ Dark gray bg (#374151) + Light gray   |
| Review      | 🔵 Blue bg (#dbeafe) + Dark blue text   | 🔵 Dark blue bg (#1e3a8a) + Light blue   |
| Deprecated  | 🔴 Red bg (#fee2e2) + Dark red text     | 🔴 Dark red bg (#7f1d1d) + Light red     |

### Badge Styling Properties

- **Border Radius**: 0.5rem (8px) - pill-shaped
- **Padding**: 0.375rem 0.75rem (6px 12px)
- **Font Size**: 0.75rem (12px)
- **Font Weight**: 600 (semi-bold)
- **Text Transform**: uppercase
- **Letter Spacing**: 0.05em

---

## 7. Accessibility Considerations

### Color Contrast

All color combinations meet WCAG AA standards:

| Status   | Light Mode Contrast | Dark Mode Contrast |
| -------- | ------------------- | ------------------ |
| Finished | 4.5:1+ (green)      | 4.5:1+ (green)     |
| Draft    | 4.5:1+ (amber)      | 4.5:1+ (yellow)    |
| Archived | 4.5:1+ (gray)       | 4.5:1+ (gray)      |

### Screen Reader Support

The status text is readable by screen readers. Consider adding `aria-label` for additional context:

```html
<span class="lesson-status status-draft" aria-label="Document status: Draft" role="status">Draft</span>
```

---

## 8. Implementation Checklist

- [ ] Add `status` field to YAML front matter in content files
- [ ] Add Liquid conditional logic to layout template
- [ ] Add base `.lesson-status` CSS styles
- [ ] Add color variants for each status type (light + dark mode)
- [ ] Test bilingual output (EN/ES)
- [ ] Test responsive layout on mobile
- [ ] Verify color contrast for accessibility
- [ ] Add any custom status types needed

---

## 9. Quick Reference Card

### YAML Front Matter

```yaml
status: finished # or: terminado, draft, borrador, in progress, en proceso
```

### Generated HTML

```html
<span class="lesson-status status-finished flex-shrink-0">✓ Finished</span>
```

### CSS Selector Pattern

```css
.lesson-status.status-{value} { ... }
.dark .lesson-status.status-{value} { ... }
```

---

## References

- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors) - Color palette source
- [WCAG Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Jekyll/Liquid Front Matter](https://jekyllrb.com/docs/front-matter/)
- [CSS Attribute Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)

---

_Generated from Web Atelier UDIT project implementation - January 2026_
