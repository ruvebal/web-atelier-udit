---
layout: lesson
title: 'Tailwind CSS: Componentes Inline en Vistas — Ruta A (sin componentización)'
title_alt: 'Tailwind CSS: Inline Components in Views — Path A (no componentization)'
slug: tailwind-components-inline
date: 2025-11-04
updated: 2025-11-04
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/tailwind/components-inline/
description: 'Implementa la UI directamente en vistas con Tailwind sin crear componentes ni helpers. Entiende cuándo y por qué dar el salto a componentización sin framework.'
tags: [tailwindcss, componentes, inline, sistema-diseno, pedagogía]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Tailwind CSS: Componentes Inline en Vistas — Ruta A (sin componentización)

> Esta ruta prioriza empezar simple: todo el UI se implementa directamente en vistas con clases de Tailwind. Ideal para enfocarse en tokens de diseño y patrones visuales antes de modularizar.

## Demo Interactivo

> **[Ver Demo Inline (sin componentes) →](demo-inline/)**
>
> Version minimal: botones, tarjetas, formularios y tokens implementados directamente en vistas (`src/views/*.html`).

## Requisitos

En S2, creaste un sistema de ruteo modular con archivos de vista separados. Ya deberías tener:

- Capacidad para registrar rutas en `src/views/index.js`
- Vistas definidas con `<template id="...">` en HTML

Si no has completado S2, revisa: [Ruteo SPA con HTML Template]({{ '/lessons/es/tailwind/routing-and-shared-layout/html-template/' | relative_url }}).

## Implementación Inline (sin componentes)

1. Crea una vista con botones estáticos:

```html
<!-- src/views/buttons.html -->
<template id="view-buttons">
	<div class="max-w-4xl mx-auto">
		<h1 class="text-3xl font-bold text-gray-900 mb-8">Botones (inline)</h1>

		<section class="bg-white rounded-lg shadow-md p-8 mb-8">
			<h2 class="text-2xl font-semibold mb-6">Primarios</h2>
			<div class="flex flex-wrap gap-4">
				<button
					class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
					Acción Primaria
				</button>
				<button
					disabled
					class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
					Deshabilitado
				</button>
			</div>
		</section>

		<section class="bg-white rounded-lg shadow-md p-8 mb-8">
			<h2 class="text-2xl font-semibold mb-6">Secundarios</h2>
			<div class="flex flex-wrap gap-4">
				<button
					class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
					Acción Secundaria
				</button>
				<button
					disabled
					class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
					Deshabilitado
				</button>
			</div>
		</section>

		<section class="bg-white rounded-lg shadow-md p-8">
			<h2 class="text-2xl font-semibold mb-6">Tamaños</h2>
			<div class="flex flex-wrap items-center gap-4">
				<button class="px-3 py-1.5 text-sm font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600">
					Pequeño
				</button>
				<button class="px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600">
					Mediano
				</button>
				<button class="px-6 py-3 text-base font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600">
					Grande
				</button>
			</div>
		</section>
	</div>
</template>
```

2. En tu registro de vistas, omite `onMount` y helpers:

```javascript
// src/views/index.js
export const views = {
	// otras rutas...
	'/buttons': { templateId: 'view-buttons', templateUrl: './src/views/buttons.html' },
	// otras rutas...
};
```

3. Repite el patrón para tarjetas y formularios con markup inline. Consulta el Demo Inline para ejemplos completos de `cards` y `forms`.

#### 💡 Hacer los Botones Interactivos

**Patrón recomendado: hook desde el router tras renderizar cada vista (una sola vez; delegación en `#app`).**

```javascript
// src/main.js o src/router.js
function bindInteractions(app) {
	// Guardar (loading + analytics + navegación)
	app.addEventListener('click', async (event) => {
		const guardar = event.target.closest('[data-action="guardar"]');
		if (guardar) {
			guardar.disabled = true;
			guardar.setAttribute('aria-busy', 'true');
			const original = guardar.textContent;
			guardar.textContent = 'Guardando...';
			try {
				await new Promise((r) => setTimeout(r, 1200)); // Simular API
				console.log('analytics: boton_guardar');
				location.hash = '#/proyectos';
			} catch (e) {
				alert('No se pudo guardar. Intenta de nuevo.');
			} finally {
				guardar.disabled = false;
				guardar.removeAttribute('aria-busy');
				guardar.textContent = original;
			}
			return;
		}

		// Favorito (toggle)
		const favorito = event.target.closest('[data-action="favorito"]');
		if (favorito) {
			favorito.classList.toggle('text-red-600');
			console.log('analytics: toggle_favorito');
			return;
		}

		// Abrir modal
		const abrirModal = event.target.closest('[data-action="abrir-modal"]');
		if (abrirModal) {
			document.getElementById('modal')?.classList.remove('hidden');
			return;
		}

		// Volver
		const volver = event.target.closest('[data-action="volver"]');
		if (volver) {
			history.back();
			return;
		}
	});

	// Enviar formulario
	app.addEventListener('submit', async (event) => {
		const form = event.target.closest('form[data-action="enviar-form"]');
		if (!form) return;
		event.preventDefault();
		const submitBtn = form.querySelector('[type="submit"]');
		submitBtn?.setAttribute('disabled', '');
		try {
			await new Promise((r) => setTimeout(r, 1000)); // Simular API
			alert('Formulario enviado');
		} finally {
			submitBtn?.removeAttribute('disabled');
		}
	});
}

// Enlaza una sola vez (delegación en #app persiste entre vistas)
document.addEventListener('DOMContentLoaded', () => {
	const app = document.getElementById('app');
	if (app) bindInteractions(app);
});
```

```html
<!-- Ejemplos de marcado en cualquier vista -->
<button data-action="guardar" class="...">Guardar</button>
<button data-action="favorito" class="...">❤</button>
<button data-action="abrir-modal" class="...">Abrir modal</button>
<a data-action="volver" class="...">← Volver</a>

<form data-action="enviar-form" class="...">
	<!-- campos -->
	<button type="submit" class="...">Enviar</button>
</form>
```

## Tokens de Diseño primero

Define tokens en `tailwind.config.js` y aplica utilidades como `bg-primary-500` o `text-content-muted` en tus vistas. Guía dedicada: [Tokens de diseño y style.css →]({{ '/lessons/es/tailwind/design-tokens/' | relative_url }}).

## ¿Necesitamos componentizar sin framework?

- **Cuándo NO componentizar aún:** prototipos, ejercicios cortos, o cuando el foco es puramente visual y la lógica es mínima.
- **Ventajas del enfoque inline:** menos archivos, menor carga cognitiva, feedback visual inmediato.
- **Límites:** duplicación de marcado, difícil de mantener a medida que crece, difícil de testear y de reutilizar entre vistas.
- **Umbral para migrar:** cuando repites bloques 3+ veces, necesitas variantes (tamaños/estados) en varias vistas, o aparece lógica compartida (handlers, loading, a11y avanzada).

Si llegas a ese umbral, pasa a la **Ruta B — Componentes modulares con `<template>` y helpers**: [Componentes y Sistema de Diseño →]({{ '/lessons/es/tailwind/components-design-system/' | relative_url }}), o considera adoptar un framework como Vue, React o Svelte si tu proyecto requiere componetización avanzada, lógica compleja de estado o escalabilidad a largo plazo.

---

## Preguntas Críticas del Atelier

### Exploración

- ¿Qué utilidades expresan mejor tus tokens de diseño y patrones de componentes?
- ¿Cómo cambió la composición inline tu relación con decisiones de estilizado?

### Reflexión

- ¿Dónde redujo el enfoque inline la complejidad? ¿Dónde ocultó intención?
- ¿Qué patrones repetidos señalan necesidad de componentización?

### Conceptualización

- ¿Cómo se relacionan los tokens de diseño con identidad de marca y requisitos de accesibilidad?
- ¿De qué maneras encarna el enfoque inline “diseño como código”?

### Producción

- ¿Están tus patrones inline documentados con variantes claras?
- ¿Cómo migrarías de inline a modular sin romper vistas?

### Exhibición

- ¿Cómo demostrarás variantes y responsive behavior en una presentación en vivo?
- ¿Qué enfoques alternativos (CSS-in-JS, bibliotecas) lograrían reutilización similar?

---

> **Siguiente (opcional):** [Ruta B — Componentización con `<template>` →]({{ '/lessons/es/tailwind/components-design-system/' | relative_url }})
