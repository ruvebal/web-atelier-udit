---
layout: lesson
title: 'Tailwind CSS: Componentes y Sistema de Diseño — Construyendo Patrones Reutilizables'
title_alt: 'Tailwind CSS: Components & Design System — Building Reusable Patterns'
slug: tailwind-components-design-system
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/tailwind/components-design-system/
description: 'Guía completa para crear componentes reutilizables y sistemas de diseño con Tailwind CSS, incluyendo tokens, patrones y enfoques pedagógicos.'
tags: [tailwindcss, componentes, sistema-diseno, tokens, pedagogía]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Tailwind CSS: Componentes y Sistema de Diseño — Construyendo Patrones Reutilizables

> **Divulgación de asistencia IA:** Esta lección se basa en experiencia docente desde septiembre 2024, con iteraciones de IA siguiendo ciclos investigación–práctica–investigación.

## Enfoque de Codificación Crítica

Esta lección sigue la **metodología del atelier** (exploración → reflexión → conceptualización → producción → exhibición). Construimos no para automatizar, sino para **articular** — dar forma al pensamiento mediante ritmo, reflexión y resistencia.

- **Exploración:** Diseño y composición de patrones de componentes reutilizables.
- **Reflexión:** Comprensión de sistemas de diseño como artefactos culturales.
- **Conceptualización:** Conexión de reutilización de componentes con teoría y ética del diseño.
- **Producción:** Construcción de bibliotecas de componentes mantenibles y escalables.
- **Exhibición:** Demostración de sistemas de diseño cohesionados en acción.

## Demo Interactivo

> **[Ver Demo en Vivo →](demo/)**
>
> Explora un sistema de diseño completo con botones, tarjetas, formularios y tokens de diseño usando el enfoque de `<template>` y helpers modulares. ¡Todo el código es autocontenido y listo para ejecutar!

> Nota: Los componentes del demo son visuales por defecto. Usa `onMount` para activar botones y agregar interacciones de vida real (guardar, navegación, analytics). Ver sección “Hacer los Botones Interactivos”.

## Requisitos

En S2, creaste un sistema de ruteo modular usando elementos HTML `<template>` (ver [Ruteo SPA con HTML Template](/web-atelier-udit/lessons/es/tailwind/routing-and-shared-layout/html-template/)). Ya deberías tener:

- `src/views/componentes.html` del Ejercicio 2.2 (usando `<template>`)
- La capacidad de crear nuevas rutas con archivos HTML `<template>` separados
- Una base para construir tu portafolio de trabajo de diseño

**Si aún no has completado los ejercicios de S2**, crea el archivo `src/views/componentes.html` ahora usando el enfoque de `<template>` (ver Ejercicio 2.2 de S2).

<div class="prerequisites">
  <h3>Antes de comenzar</h3>
  <ul>
    <li><strong>S1 y S2 completadas:</strong> Configuración Vite + Tailwind y base de ruteo SPA</li>
    <li><strong>Composición de utilidades:</strong> Experiencia combinando clases Tailwind para layouts</li>
    <li><strong>Diseño responsive:</strong> Comprensión de mobile-first y variantes de breakpoints</li>
    <li><strong>Flujo de Git:</strong> Commits incrementales con mensajes claros</li>
  </ul>
</div>

## 🚀 Sistemas de Diseño: Más allá de Componentes Individuales

Los **sistemas de diseño** son más que bibliotecas de componentes — codifican valores organizacionales, estándares de accesibilidad y patrones de experiencia de usuario. En Tailwind, expresamos sistemas de diseño mediante:

- **Tokens de diseño:** Colores, espaciado y escalas tipográficas consistentes
- **Patrones de componentes:** Agrupaciones de utilidades que podemos reutilizar en diferentes partes del proyecto
- **Nombres semánticos:** Composiciones de clases que revelan intención
- **Mejora progresiva:** Fallbacks y enfoques accessibility-first

Nuestro enfoque crea **componentes PWA-ready** que funcionan en dispositivos y tecnologías asistivas.

## S3 — Componentes y Sistema de Diseño (Tokens, Patrones, Reutilización)

Esta sesión transforma combinaciones de utilidades en sistemas de componentes reutilizables y mantenibles que codifican decisiones de diseño y requisitos de accesibilidad.

### Racional pedagógico: prototipado rápido con componentes ya hechos

- Para principiantes y prototipado, priorizamos **componentes ya hechos de Tailwind** (copiar/pegar + adaptar tokens) antes que crear sistemas complejos.
- Evitamos montar componentes con JavaScript y `<template>` por ahora: añade complejidad y reduce legibilidad sin un framework.
- Si necesitas profundizar, las secciones avanzadas más abajo son opcionales. Para la base visual, empieza con piezas listas y tokens coherentes.

### Construyendo sobre el Ruteo S2 con `<template>`

Si prefieres no crear componentes reutilizables todavía, consulta la lección “Ruta A — Componentes inline en vistas (sin componentización)” y su demo correspondiente.

### Implementación paso a paso

**💡 Importante:** Todos los componentes que crees en esta sesión se implementarán como **componentes modulares reutilizables** en archivos separados (`src/components/*.html`), y luego se usarán en las vistas `<template>` que ya creaste en S2. Específicamente, trabajarás principalmente en `src/views/componentes.html` y crearás componentes en `src/components/`.

1. **Define tokens de diseño (2 min):**

   Para una guía clara y autocontenida sobre cómo definir tokens en `tailwind.config.js` y cuándo usar `style.css`, consulta la lección dedicada:

   - [Tailwind CSS: Tokens de diseño y style.css — Guía breve](/web-atelier-udit/lessons/es/tailwind/design-tokens/)

   Luego, vuelve aquí para aplicar esos tokens en componentes listos.

2. **Crea componente reutilizable Button como `<template>` modular:**

   **Estructura de componentes modulares:**

   Primero, crea la carpeta `src/components/` para organizar tus componentes reutilizables:

   ```
   src/
   ├── components/
   │   ├── button-primary.html
   │   ├── button-secondary.html
   │   └── button-ghost.html
   ├── views/
   │   ├── componentes.html
   │   └── index.js
   └── router.js
   ```

   **Crear componentes Button modulares:**

   ```html
   <!-- src/components/button-primary.html -->
   <template id="button-primary">
   	<button
   		class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-transparent bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
   		<!-- 
   			⚠️ Importante: El atributo `is="button-primary"` mostrado arriba NO funcionará por sí solo en HTML estándar y no convierte automáticamente tu botón en un componente reutilizable basado en <template>.
   			
   			En la web, el atributo `is=""` solo es válido para *custom built-in elements* (Web Components definidos con JavaScript y extendiendo tags nativos), y requiere registro explícito en JavaScript usando `customElements.define`. Los elementos <template> por sí mismos no pueden usarse con `is=""`.
   			
   			Forma correcta: debes cargar el `<template>` desde tu HTML y clonarlo por JavaScript para reutilizarlo:
   			
   			  // Cargar y usar un componente de botón en JS
   			  const tpl = document.getElementById('button-primary');
   			  const btn = tpl.content.cloneNode(true);
   			  btn.querySelector('button').textContent = 'Enviar';
   			  document.body.appendChild(btn);
   
   			Así puedes reutilizar el botón cambiando el contenido insertado en el clon, pero *no* mediante is="button-primary".
   		-->
   		<slot></slot>
   	</button>
   </template>
   ```

   ```html
   <!-- src/components/button-secondary.html -->
   <template id="button-secondary">
   	<button
   		class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
   		<slot></slot>
   	</button>
   </template>
   ```

   ```html
   <!-- src/components/button-ghost.html -->
   <template id="button-ghost">
   	<button
   		class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
   		<slot></slot>
   	</button>
   </template>
   ```

   **Usar componentes en la vista:**

   ```html
   <!-- src/views/componentes.html -->
   <template id="view-componentes">
   	<section class="py-16 bg-gray-50">
   		<div class="container mx-auto px-4">
   			<h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">Sistema de Componentes</h1>

   			<!-- Sistema de Botones -->
   			<div class="bg-white rounded-lg shadow-md p-6 mb-8">
   				<h2 class="text-2xl font-bold text-gray-900 mb-4">Botones</h2>
   				<div class="flex flex-wrap gap-4" id="buttons-container">
   					<!-- Los botones se clonarán aquí dinámicamente -->
   				</div>
   			</div>

   			<!-- Aquí añadirás más componentes en los siguientes pasos -->

   			<a href="#/" class="inline-block text-primary-500 hover:text-primary-600 font-medium">← Volver a Inicio</a>
   		</div>
   	</section>
   </template>
   ```

   **Cargar y usar componentes con JavaScript:**

   ```javascript
   // src/views/componentes.js (archivo de configuración para onMount)
   export async function mountComponentes(app) {
   	// Cargar componentes si no están ya en el DOM
   	await ensureTemplateAvailable('button-primary', './src/components/button-primary.html');
   	await ensureTemplateAvailable('button-secondary', './src/components/button-secondary.html');
   	await ensureTemplateAvailable('button-ghost', './src/components/button-ghost.html');

   	const container = app.querySelector('#buttons-container');

   	// Clonar y usar componente primario
   	const primaryBtn = document.getElementById('button-primary').content.cloneNode(true);
   	primaryBtn.querySelector('button').textContent = 'Botón Primario';
   	container.appendChild(primaryBtn);

   	// Clonar y usar componente secundario
   	const secondaryBtn = document.getElementById('button-secondary').content.cloneNode(true);
   	secondaryBtn.querySelector('button').textContent = 'Botón Secundario';
   	container.appendChild(secondaryBtn);

   	// Clonar y usar componente ghost
   	const ghostBtn = document.getElementById('button-ghost').content.cloneNode(true);
   	ghostBtn.querySelector('button').textContent = 'Botón Ghost';
   	container.appendChild(ghostBtn);
   }

   // Función helper para cargar templates (similar a la del router)
   async function ensureTemplateAvailable(templateId, templateUrl) {
   	if (document.getElementById(templateId)) return;

   	const res = await fetch(templateUrl, { credentials: 'same-origin' });
   	if (!res.ok) throw new Error(`Failed to load template: ${templateUrl}`);
   	const html = await res.text();

   	const doc = new DOMParser().parseFromString(html, 'text/html');
   	const fetchedTemplate = doc.querySelector('template');
   	if (!fetchedTemplate || !fetchedTemplate.id) {
   		throw new Error(`No <template id="..."> found in ${templateUrl}`);
   	}
   	document.body.appendChild(fetchedTemplate);
   }
   ```

   **Registrar vista con onMount:**

   ```javascript
   // src/views/index.js
   import { mountComponentes } from './componentes.js';

   export const views = {
   	'/componentes': {
   		templateId: 'view-componentes',
   		templateUrl: './src/views/componentes.html',
   		onMount: mountComponentes,
   	},
   	// ... otras vistas
   };
   ```

**Cómo probar:**

1. Guarda todos los archivos
2. Navega a `#/componentes` en tu navegador
3. Prueba hover sobre cada botón
4. Presiona Tab para verificar estados de focus
5. Inspecciona con DevTools para ver clases aplicadas

---

#### 💡 Hacer los Botones Interactivos

Los botones anteriores son **solo visuales**. Para hacerlos funcionales con el enfoque `<template>`, añade event listeners en la función `onMount`:

```javascript
// src/views/componentes.js
export async function mountComponentes(app) {
	// ... código de carga de componentes anterior ...

	const container = app.querySelector('#buttons-container');

	// Clonar componente primario y añadir interactividad
	const primaryBtn = document.getElementById('button-primary').content.cloneNode(true);
	const primaryBtnEl = primaryBtn.querySelector('button');
	primaryBtnEl.textContent = 'Botón Primario';
	primaryBtnEl.addEventListener('click', () => {
		console.log('¡Botón clickeado!');
		alert('Acción ejecutada');
	});
	container.appendChild(primaryBtn);

	// Clonar componente secundario con handler
	const secondaryBtn = document.getElementById('button-secondary').content.cloneNode(true);
	const secondaryBtnEl = secondaryBtn.querySelector('button');
	secondaryBtnEl.textContent = 'Botón Secundario';
	secondaryBtnEl.addEventListener('click', () => {
		console.log('Secundario clickeado');
	});
	container.appendChild(secondaryBtn);

	// Clonar componente ghost con handler
	const ghostBtn = document.getElementById('button-ghost').content.cloneNode(true);
	const ghostBtnEl = ghostBtn.querySelector('button');
	ghostBtnEl.textContent = 'Botón Ghost';
	ghostBtnEl.addEventListener('click', () => {
		console.log('Ghost clickeado');
	});
	container.appendChild(ghostBtn);
}
```

**Interacciones de vida real con `onMount`:**

```javascript
// Dentro de onMount (p.ej., mountComponentes)
// 1) Guardar cambios: loading, analytics y navegación
const saveBtn = app.querySelector('#buttons-container button');
if (saveBtn) {
	saveBtn.addEventListener('click', async () => {
		saveBtn.disabled = true;
		saveBtn.setAttribute('aria-busy', 'true');
		const original = saveBtn.textContent;
		saveBtn.textContent = 'Guardando...';
		try {
			// Simular llamada API
			await new Promise((r) => setTimeout(r, 1200));
			// Analytics/eventos
			console.log('analytics: boton_guardar');
			// Navegación
			location.hash = '#/proyectos';
		} catch (e) {
			alert('No se pudo guardar. Intenta de nuevo.');
		} finally {
			saveBtn.disabled = false;
			saveBtn.removeAttribute('aria-busy');
			saveBtn.textContent = original;
		}
	});
}
```

**Crear función helper para componentes interactivos:**

Para evitar repetir código, crea una función helper que simplifique el uso de componentes:

```javascript
// src/utils/component-helpers.js
export async function useComponent(templateId, templateUrl, container, config = {}) {
	await ensureTemplateAvailable(templateId, templateUrl);

	const template = document.getElementById(templateId);
	if (!template) throw new Error(`Template ${templateId} not found`);

	const clone = template.content.cloneNode(true);
	const element = clone.querySelector(template.querySelector('*').tagName.toLowerCase());

	// Configurar texto si se proporciona
	if (config.text) {
		element.textContent = config.text;
	}

	// Añadir event listener si se proporciona
	if (config.onClick) {
		element.addEventListener('click', config.onClick);
	}

	// Añadir clases adicionales si se proporcionan
	if (config.classes) {
		element.classList.add(...config.classes.split(' '));
	}

	// Añadir atributos si se proporcionan
	if (config.attributes) {
		Object.entries(config.attributes).forEach(([key, value]) => {
			element.setAttribute(key, value);
		});
	}

	container.appendChild(clone);
	return element;
}

// Uso mejorado en mountComponentes:
import { useComponent } from '../utils/component-helpers.js';

export async function mountComponentes(app) {
	const container = app.querySelector('#buttons-container');

	await useComponent('button-primary', './src/components/button-primary.html', container, {
		text: 'Guardar Cambios',
		onClick: () => {
			console.log('Guardando...');
			alert('¡Cambios guardados!');
		},
	});

	await useComponent('button-secondary', './src/components/button-secondary.html', container, {
		text: 'Cancelar',
		onClick: () => console.log('Cancelado'),
	});

	await useComponent('button-ghost', './src/components/button-ghost.html', container, {
		text: 'Más Opciones',
		onClick: () => console.log('Ghost clickeado'),
	});
}
```

---

#### Estados Activos y Disabled

**Estado Active (cuando se hace clic):**

```html
<!-- Añade clase active: con bg más oscuro -->
<button class="... bg-primary-500 hover:bg-primary-600 active:bg-primary-700">Botón con estado active</button>
```

**Estado Disabled (botón deshabilitado):**

```html
<!-- Añade atributo disabled + clases de estilo -->
<button disabled class="... disabled:opacity-50 disabled:cursor-not-allowed">Botón Deshabilitado</button>
```

**Deshabilitar dinámicamente con JavaScript:**

```javascript
// Deshabilitar botón
const btn = document.getElementById('submit-btn');
btn.disabled = true;
btn.classList.add('opacity-50', 'cursor-not-allowed');

// Simular proceso (ej: envío de formulario)
setTimeout(() => {
	btn.disabled = false;
	btn.classList.remove('opacity-50', 'cursor-not-allowed');
}, 2000);
```

---

#### Ejemplo Completo: Botón con Estado de Carga

**Crear componente de botón con estados de carga:**

```html
<!-- src/components/button-loading.html -->
<template id="button-loading">
	<button
		class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-transparent bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
		<slot></slot>
	</button>
</template>
```

**Función helper para botón con estados:**

```javascript
// src/utils/loading-button.js
// Función helper para cargar templates (reutilizable)
async function ensureTemplateAvailable(templateId, templateUrl) {
	if (document.getElementById(templateId)) return;

	const res = await fetch(templateUrl, { credentials: 'same-origin' });
	if (!res.ok) throw new Error(`Failed to load template: ${templateUrl}`);
	const html = await res.text();

	const doc = new DOMParser().parseFromString(html, 'text/html');
	const fetchedTemplate = doc.querySelector('template');
	if (!fetchedTemplate || !fetchedTemplate.id) {
		throw new Error(`No <template id="..."> found in ${templateUrl}`);
	}
	document.body.appendChild(fetchedTemplate);
}

export async function createLoadingButton(container, text, asyncAction) {
	await ensureTemplateAvailable('button-loading', './src/components/button-loading.html');

	const template = document.getElementById('button-loading');
	const clone = template.content.cloneNode(true);
	const button = clone.querySelector('button');

	const originalText = text;
	button.textContent = text;

	button.addEventListener('click', async () => {
		// Deshabilitar y mostrar estado de carga
		button.disabled = true;
		button.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Cargando...
    `;

		try {
			// Ejecutar acción asíncrona
			await asyncAction();

			// Mostrar éxito
			button.innerHTML = `
        <svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        ¡Éxito!
      `;

			// Restaurar después de 2 segundos
			setTimeout(() => {
				button.disabled = false;
				button.textContent = originalText;
			}, 2000);
		} catch (error) {
			// Mostrar error
			button.innerHTML = `
        <svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        Error
      `;

			setTimeout(() => {
				button.disabled = false;
				button.textContent = originalText;
			}, 2000);
		}
	});

	container.appendChild(clone);
	return button;
}

// Uso en mountComponentes:
import { createLoadingButton } from '../utils/loading-button.js';

export async function mountComponentes(app) {
	const container = app.querySelector('#buttons-container');

	await createLoadingButton(container, 'Guardar Cambios', async () => {
		// Simular llamada API
		await new Promise((resolve) => setTimeout(resolve, 1500));
		console.log('Datos guardados');
	});
}
```

---

#### 📚 Referencia Rápida: Clases de Estado

```css
/* Estados interactivos en Tailwind */
hover:          /* Mouse encima */
focus:          /* Foco del teclado */
active:         /* Mientras se hace clic */
disabled:       /* Botón deshabilitado */
group-hover:    /* Hover en elemento padre */

/* Ejemplos */
.hover:bg-blue-600        /* Fondo azul al hover */
.focus:ring-2             /* Anillo al enfocar */
.active:scale-95          /* Reducir al clickear */
.disabled:opacity-50      /* Semi-transparente si disabled */
```

---

**💡 Consejo Pro:** Para aplicaciones grandes, siempre usa **componentes modulares** (Opción 3) para mantener el código organizado y reutilizable. Revisa la lección [JavaScript Modules](/web-atelier-udit/lessons/es/js-modules/) para dominar este enfoque profesional.

3. **Construye patrón de componente Card modular:**

   **Crear componente Card reutilizable:**

   ```html
   <!-- src/components/card.html -->
   <template id="card">
   	<article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
   		<div class="aspect-w-16 aspect-h-9 bg-gray-200">
   			<slot name="image"></slot>
   		</div>
   		<div class="p-6">
   			<h3 class="text-lg font-semibold text-gray-900 mb-2">
   				<slot name="title">Título de Tarjeta</slot>
   			</h3>
   			<p class="text-gray-600 text-sm mb-4 line-clamp-3">
   				<slot name="description">Descripción de la tarjeta</slot>
   			</p>
   			<div class="flex flex-wrap gap-2">
   				<slot name="tags"></slot>
   			</div>
   		</div>
   	</article>
   </template>
   ```

   **Actualizar vista componentes.html:**

   ```html
   <!-- src/views/componentes.html -->
   <template id="view-componentes">
   	<section class="py-16 bg-gray-50">
   		<div class="container mx-auto px-4">
   			<h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">Sistema de Componentes</h1>

   			<!-- Sistema de Botones -->
   			<div class="bg-white rounded-lg shadow-md p-6 mb-8">
   				<h2 class="text-2xl font-bold text-gray-900 mb-4">Botones</h2>
   				<div class="flex flex-wrap gap-4" id="buttons-container">
   					<!-- Los botones se clonarán aquí dinámicamente -->
   				</div>
   			</div>

   			<!-- Sistema de Tarjetas -->
   			<div class="bg-white rounded-lg shadow-md p-6 mb-8">
   				<h2 class="text-2xl font-bold text-gray-900 mb-4">Tarjetas</h2>
   				<div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="cards-container">
   					<!-- Las tarjetas se clonarán aquí dinámicamente -->
   				</div>
   			</div>

   			<a href="#/" class="inline-block text-primary-500 hover:text-primary-600 font-medium">← Volver a Inicio</a>
   		</div>
   	</section>
   </template>
   ```

   **Crear helper para usar Card:**

   ```javascript
   // src/utils/card-helpers.js
   async function ensureTemplateAvailable(templateId, templateUrl) {
   	if (document.getElementById(templateId)) return;

   	const res = await fetch(templateUrl, { credentials: 'same-origin' });
   	if (!res.ok) throw new Error(`Failed to load template: ${templateUrl}`);
   	const html = await res.text();

   	const doc = new DOMParser().parseFromString(html, 'text/html');
   	const fetchedTemplate = doc.querySelector('template');
   	if (!fetchedTemplate || !fetchedTemplate.id) {
   		throw new Error(`No <template id="..."> found in ${templateUrl}`);
   	}
   	document.body.appendChild(fetchedTemplate);
   }

   export async function createCard(container, { image, title, description, tags = [] }) {
   	await ensureTemplateAvailable('card', './src/components/card.html');

   	const template = document.getElementById('card');
   	const clone = template.content.cloneNode(true);
   	const card = clone.querySelector('article');

   	// Insertar imagen
   	const imageSlot = card.querySelector('slot[name="image"]');
   	if (imageSlot && image) {
   		const img = document.createElement('img');
   		img.src = image;
   		img.alt = title || 'Imagen del proyecto';
   		img.className = 'w-full h-48 object-cover';
   		imageSlot.replaceWith(img);
   	}

   	// Insertar título
   	const titleSlot = card.querySelector('slot[name="title"]');
   	if (titleSlot && title) {
   		titleSlot.textContent = title;
   	}

   	// Insertar descripción
   	const descSlot = card.querySelector('slot[name="description"]');
   	if (descSlot && description) {
   		descSlot.textContent = description;
   	}

   	// Insertar tags
   	const tagsSlot = card.querySelector('slot[name="tags"]');
   	if (tagsSlot && tags.length > 0) {
   		const tagsContainer = document.createElement('div');
   		tagsContainer.className = 'flex flex-wrap gap-2';
   		tags.forEach((tag) => {
   			const tagSpan = document.createElement('span');
   			tagSpan.className =
   				'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800';
   			tagSpan.textContent = tag;
   			tagsContainer.appendChild(tagSpan);
   		});
   		tagsSlot.replaceWith(tagsContainer);
   	}

   	container.appendChild(clone);
   	return card;
   }
   ```

   **Usar Card en mountComponentes:**

   ```javascript
   // src/views/componentes.js
   import { createCard } from '../utils/card-helpers.js';

   export async function mountComponentes(app) {
   	// ... código de botones anterior ...

   	const cardsContainer = app.querySelector('#cards-container');

   	await createCard(cardsContainer, {
   		image: 'https://picsum.photos/400/225?random=1',
   		title: 'Título del Proyecto',
   		description:
   			'Descripción del proyecto que demuestra el patrón de tarjeta con espaciado y jerarquía tipográfica consistentes.',
   		tags: ['React', 'API'],
   	});

   	await createCard(cardsContainer, {
   		image: 'https://picsum.photos/400/225?random=2',
   		title: 'Otro Proyecto',
   		description: 'Otra tarjeta de ejemplo con diferentes tags.',
   		tags: ['Vue', 'Tailwind'],
   	});

   	await createCard(cardsContainer, {
   		image: 'https://picsum.photos/400/225?random=3',
   		title: 'Proyecto Final',
   		description: 'Última tarjeta de ejemplo.',
   		tags: ['JavaScript', 'CSS'],
   	});
   }
   ```

   **Cómo probar:**

   1. Navega a `#/componentes`
   2. Verifica que las tarjetas se muestren en grid
   3. Reduce el ancho del navegador para ver responsive behavior
   4. Hover sobre tarjetas para ver efecto de sombra
   5. Cambia los números en picsum.photos para diferentes imágenes

4. **Crea vista de proyectos con grid responsive (sin string templates):**

   **Dónde:** Añade un `<template id="view-proyectos">` a tu `index.html` (o `demo/index.html`) y registra la ruta en tu tabla de vistas. No uses `src/views/proyectos.js` ni plantillas de cadena.

```html
<!-- index.html -->
<template id="view-proyectos">
	<section class="py-16 bg-gray-50 min-h-screen">
		<div class="container mx-auto px-4">
			<header class="text-center mb-12">
				<h1 class="text-4xl font-bold text-gray-900 mb-4">Proyectos Destacados</h1>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					Una muestra de trabajo demostrando diseño responsive y tecnologías web modernas.
				</p>
			</header>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<!-- Tarjeta 1 -->
				<article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
					<div class="aspect-w-16 aspect-h-9 bg-gradient-to-r from-blue-400 to-purple-500"></div>
					<div class="p-6">
						<h3 class="text-lg font-semibold text-gray-900 mb-2">Portfolio Personal</h3>
						<p class="text-gray-600 text-sm mb-4">Sitio web responsive construido con Tailwind CSS y JavaScript.</p>
						<div class="flex flex-wrap gap-2">
							<span
								class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
								Tailwind
							</span>
							<span
								class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
								JavaScript
							</span>
						</div>
					</div>
				</article>

				<!-- Tarjeta 2 -->
				<article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
					<div class="aspect-w-16 aspect-h-9 bg-gradient-to-r from-green-400 to-teal-500"></div>
					<div class="p-6">
						<h3 class="text-lg font-semibold text-gray-900 mb-2">Dashboard Analítico</h3>
						<p class="text-gray-600 text-sm mb-4">Interfaz de análisis de datos con componentes reutilizables.</p>
						<div class="flex flex-wrap gap-2">
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
								React
							</span>
							<span
								class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
								API
							</span>
						</div>
					</div>
				</article>

				<!-- Tarjeta 3 -->
				<article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
					<div class="aspect-w-16 aspect-h-9 bg-gradient-to-r from-pink-400 to-red-500"></div>
					<div class="p-6">
						<h3 class="text-lg font-semibold text-gray-900 mb-2">E-commerce</h3>
						<p class="text-gray-600 text-sm mb-4">Tienda online con carrito de compras y checkout integrado.</p>
						<div class="flex flex-wrap gap-2">
							<span
								class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
								Vue
							</span>
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
								Stripe
							</span>
						</div>
					</div>
				</article>
			</div>

			<a href="#/" class="inline-block mt-8 text-primary-500 hover:text-primary-600 font-medium">← Volver a Inicio</a>
		</div>
	</section>
</template>
```

Registra la ruta en tu tabla `views` (sin modularización):

```javascript
// src/views/index.js (o donde definas tu mapa de rutas)
export const views = {
	'/': { templateId: 'view-home' },
	'/proyectos': { templateId: 'view-proyectos' },
	404: { templateId: 'view-home' },
};
```

**Cómo probar:**

1. Navega a `#/proyectos` en tu navegador
2. Verifica grid responsive: 1 columna (móvil), 2 (tablet), 3 (desktop)
3. Usa DevTools responsive mode para probar breakpoints
4. Hover sobre tarjetas para ver transiciones
5. Verifica que todos los espaciados sean consistentes

6. **Implementa patrón de componente Section (sin string templates):**

   **Dónde:** Añade un `<template id="view-sobre">` a tu `index.html` (o `demo/index.html`) y registra la ruta. Mantén todo en HTML + Tailwind.

   ```html
   <!-- index.html -->
   <template id="view-sobre">
   	<section class="py-16 min-h-screen">
   		<div class="container mx-auto px-4">
   			<div class="max-w-4xl mx-auto">
   				<!-- Header de sección -->
   				<header class="text-center mb-12">
   					<h1 class="text-4xl font-bold text-gray-900 mb-4">Sobre Mí</h1>
   					<p class="text-lg text-gray-600">
   						Desarrollador web apasionado por crear experiencias digitales accesibles y performantes.
   					</p>
   				</header>

   				<!-- Contenido principal con patrón consistente -->
   				<div class="prose prose-lg max-w-none">
   					<div class="bg-white rounded-lg shadow-md p-8 mb-8">
   						<h2 class="text-2xl font-bold text-gray-900 mb-4">Mi Historia</h2>
   						<p class="text-gray-700 mb-4">
   							Comencé mi camino en el desarrollo web en 2024, enfocándome en tecnologías modernas como Tailwind CSS,
   							JavaScript vanilla, y arquitecturas SPA.
   						</p>
   						<p class="text-gray-700">
   							Mi objetivo es crear interfaces que no solo se vean bien, sino que funcionen perfectamente para todos los
   							usuarios, independientemente de sus capacidades.
   						</p>
   					</div>

   					<div class="bg-white rounded-lg shadow-md p-8 mb-8">
   						<h2 class="text-2xl font-bold text-gray-900 mb-4">Habilidades</h2>
   						<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
   							<div class="text-center p-4 bg-primary-50 rounded-lg">
   								<div class="text-3xl mb-2">🎨</div>
   								<div class="font-medium text-gray-900">Tailwind CSS</div>
   							</div>
   							<div class="text-center p-4 bg-yellow-50 rounded-lg">
   								<div class="text-3xl mb-2">⚡</div>
   								<div class="font-medium text-gray-900">JavaScript</div>
   							</div>
   							<div class="text-center p-4 bg-green-50 rounded-lg">
   								<div class="text-3xl mb-2">♿</div>
   								<div class="font-medium text-gray-900">Accesibilidad</div>
   							</div>
   							<div class="text-center p-4 bg-blue-50 rounded-lg">
   								<div class="text-3xl mb-2">📱</div>
   								<div class="font-medium text-gray-900">Responsive Design</div>
   							</div>
   							<div class="text-center p-4 bg-purple-50 rounded-lg">
   								<div class="text-3xl mb-2">🚀</div>
   								<div class="font-medium text-gray-900">Performance</div>
   							</div>
   							<div class="text-center p-4 bg-pink-50 rounded-lg">
   								<div class="text-3xl mb-2">🎯</div>
   								<div class="font-medium text-gray-900">UX Design</div>
   							</div>
   						</div>
   					</div>
   				</div>

   				<div class="text-center mt-12">
   					<a
   						href="#/proyectos"
   						class="inline-block bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-8 rounded-md transition-colors">
   						Ver Mis Proyectos
   					</a>
   				</div>

   				<a href="#/" class="inline-block mt-8 text-primary-500 hover:text-primary-600 font-medium">← Volver a Inicio</a>
   			</div>
   		</div>
   	</section>
   </template>
   ```

   **Cómo probar:**

   1. Navega a `#/sobre`
   2. Verifica espaciado consistente (py-16, mb-12, mb-8, etc.)
   3. Comprueba jerarquía tipográfica (h1 > h2 > p)
   4. Prueba responsive en móvil (grid de habilidades: 2 cols → 3 cols)
   5. Verifica que max-width contenga el contenido apropiadamente

7. **Verifica que el router cargue las vistas actualizadas (mapa simple):**

   **Asegúrate de que tu mapa de rutas apunte a los `<template>` embebidos:**

   ```javascript
   // src/views/index.js (o donde definas tu mapa de rutas)
   export const views = {
   	'/': { templateId: 'view-home' },
   	'/sobre': { templateId: 'view-sobre' },
   	'/proyectos': { templateId: 'view-proyectos' },
   	404: { templateId: 'view-home' },
   };
   ```

8. **Prueba reutilización de componentes en todas las vistas:**

   **Lista de verificación de testing:**

   - [ ] `#/componentes` - Todos los patrones de componentes se visualizan
   - [ ] `#/proyectos` - Grid responsive funciona en móvil/tablet/desktop
   - [ ] `#/sobre` - Espaciado consistente y jerarquía tipográfica
   - [ ] Hover sobre tarjetas en ambas vistas muestra transición de sombra
   - [ ] Tab a través de botones muestra estados de focus claros
   - [ ] DevTools confirma que clases de Tailwind se aplican correctamente
   - [ ] Sin errores en consola del navegador
   - [ ] Contraste de colores cumple WCAG AA (verifica con DevTools)

9. **Haz commit de tu sistema de componentes:**
   ```bash
   git add src/views/componentes.js src/views/proyectos.js src/views/sobre.js src/views/index.js
   git commit -m "feat: S3 - Tokens de diseño + componentes reutilizables implementados en vistas
   ```

- Actualizado componentes.js con sistema de botones y tarjetas
- Actualizado proyectos.js con grid responsive de proyectos
- Actualizado sobre.js con patrones de sección consistentes
- Todos los componentes usando design tokens"

  ```

  ```

## Progresión Arquitectónica: De Monolítico a Modular

### ¿Por Qué Empezamos con Todo en Una Vista?

En los pasos anteriores, pusimos todos los componentes en `src/views/componentes.js`. Esto es **pedagógicamente intencional**:

**Ventajas del enfoque inicial (todo en una vista):**

- ✅ **Más simple de entender** al principio
- ✅ **Menos archivos** = menos complejidad cognitiva
- ✅ **Ver todo junto** ayuda a entender patrones
- ✅ **Fácil de probar** en una sola ruta

**Pero para estudiantes avanzados y proyectos reales...**

### Nivel Avanzado: Componentes en Archivos Separados

Para proyectos escalables y equipos grandes, cada componente debería estar en su propio archivo.

**Ventajas del enfoque modular:**

- ✅ **Reutilización real** - importa solo lo que necesitas
- ✅ **Testing aislado** - prueba cada componente independientemente
- ✅ **Colaboración** - diferentes devs en diferentes componentes
- ✅ **Mantenibilidad** - cambios localizados
- ✅ **Tree-shaking** - bundlers eliminan código no usado
- ✅ **Profesional** - así se hace en la industria

### Refactorización: Estructura Modular de Componentes con `<template>`

Vamos a refactorizar para que quede así:

```
src/
├── components/
│   ├── button-primary.html    # Componente Button reutilizable
│   ├── button-secondary.html
│   ├── button-ghost.html
│   ├── card.html              # Componente Card reutilizable
│   ├── section.html           # Wrapper Section reutilizable
│   └── skill-card.html        # Componente SkillCard específico
├── utils/
│   ├── component-helpers.js   # Helpers para usar componentes
│   ├── card-helpers.js
│   └── loading-button.js
├── views/
│   ├── componentes.html       # Vista que usa componentes
│   ├── componentes.js         # onMount para componentes
│   ├── proyectos.html         # Vista de proyectos
│   ├── proyectos.js           # onMount que usa Card component
│   ├── sobre.html             # Vista sobre
│   ├── sobre.js               # onMount que usa Section y SkillCard
│   └── index.js               # Registro de vistas
├── router.js
└── main.js
```

## Ejercicios Prácticos: Refactorización Modular (Nivel Avanzado)

### Ejercicio 3.3: Extraer Componentes a Archivos Separados

#### Paso 1: Crea el componente Button reutilizable

```javascript
// src/components/Button.js
/**
 * Button Component
 * Reusable button with variants: primary, secondary, ghost
 * @param {string} variant - Button style variant
 * @param {string} size - Button size (sm, md, lg)
 * @param {string} text - Button text content
 * @param {Function} onClick - Optional click handler
 * @returns {string} HTML template string
 */
export function Button({ variant = 'primary', size = 'md', text = 'Button', onClick = null } = {}) {
	const baseClasses =
		'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';

	const variants = {
		primary: 'border border-transparent bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
		secondary: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500',
		ghost: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base',
	};

	return `
    <button 
      class="${baseClasses} ${variants[variant]} ${sizes[size]}"
      ${onClick ? `onclick="${onClick}"` : ''}>
      ${text}
    </button>
  `;
}

// Export con valores por defecto para fácil uso
export const PrimaryButton = (text, size = 'md') => Button({ variant: 'primary', text, size });
export const SecondaryButton = (text, size = 'md') => Button({ variant: 'secondary', text, size });
export const GhostButton = (text, size = 'md') => Button({ variant: 'ghost', text, size });
```

#### Paso 2: Crea el componente Card reutilizable

```javascript
// src/components/Card.js
/**
 * Card Component
 * Reusable card with optional image, title, description, and tags
 * @param {string} image - Image URL or gradient
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @param {Array<string>} tags - Array of tag names
 * @param {string} tagColors - Tailwind color classes for tags
 * @returns {string} HTML template string
 */
export function Card({ image = null, title = 'Card Title', description = '', tags = [], tagColors = {} } = {}) {
	const imageSrc = image?.startsWith('http')
		? `<img src="${image}" alt="${title}" class="w-full h-48 object-cover" />`
		: `<div class="flex items-center justify-center ${image || 'bg-gray-200'} text-white text-2xl font-bold h-48">
         ${title}
       </div>`;

	const tagsHtml =
		tags.length > 0
			? `
      <div class="flex flex-wrap gap-2 mt-4">
        ${tags
									.map(
										(tag, i) => `
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
											tagColors[tag] || 'bg-gray-100 text-gray-800'
										}">
            ${tag}
          </span>
        `
									)
									.join('')}
      </div>
    `
			: '';

	return `
    <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div class="aspect-w-16 aspect-h-9">
        ${imageSrc}
      </div>
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">${title}</h3>
        <p class="text-gray-600 text-sm">${description}</p>
        ${tagsHtml}
      </div>
    </article>
  `;
}
```

#### Paso 3: Crea el componente Section wrapper

```javascript
// src/components/Section.js
/**
 * Section Component
 * Consistent section wrapper with header and content
 * @param {string} title - Section title
 * @param {string} subtitle - Section subtitle (optional)
 * @param {string} content - Section HTML content
 * @param {string} bgColor - Background color class
 * @returns {string} HTML template string
 */
export function Section({ title, subtitle = '', content = '', bgColor = 'bg-white' } = {}) {
	return `
    <div class="${bgColor} rounded-lg shadow-md p-8 mb-8">
      ${
							title
								? `
        <header class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">${title}</h2>
          ${subtitle ? `<p class="text-gray-600">${subtitle}</p>` : ''}
        </header>
      `
								: ''
						}
      <div class="content">
        ${content}
      </div>
    </div>
  `;
}
```

#### Paso 4: Refactoriza la vista de componentes para usar imports

```html
<!-- index.html -->
<template id="view-componentes">
	<section class="py-16 bg-gray-50 min-h-screen">
		<div class="container mx-auto px-4">
			<h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">Sistema de Componentes</h1>

			<!-- Sistema de Botones (estático, sin JS) -->
			<div class="bg-white rounded-lg shadow-md p-6 mb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Sistema de Botones</h2>
				<div class="flex flex-wrap gap-4">
					<button
						class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
						Botón Primario
					</button>
					<button
						class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
						Botón Secundario
					</button>
					<button
						class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
						Botón Ghost
					</button>
				</div>
			</div>

			<!-- Patrones de Tarjetas (estático) -->
			<div class="bg-white rounded-lg shadow-md p-6 mb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Patrones de Tarjetas</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
						<div class="aspect-w-16 aspect-h-9 bg-gray-200">
							<img
								src="https://picsum.photos/400/225?random=1"
								alt="Vista previa del proyecto"
								class="w-full h-48 object-cover" />
						</div>
						<div class="p-6">
							<h3 class="text-lg font-semibold text-gray-900 mb-2">Tarjeta con Imagen</h3>
							<p class="text-gray-600 text-sm mb-4">Tarjeta con cabecera de imagen y contenido de texto debajo.</p>
						</div>
					</article>
					<article class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center">
						<div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						</div>
						<h3 class="card-title text-lg font-semibold text-gray-900 mb-2">Tarjeta con Icono</h3>
						<p class="text-gray-600 text-sm">Tarjeta con icono centrado y contenido.</p>
					</article>
					<article
						class="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-md p-6 text-white hover:shadow-lg transition-shadow">
						<h3 class="text-sm font-medium text-primary-100 mb-1">Total Proyectos</h3>
						<p class="text-3xl font-bold mb-1">42</p>
						<p class="text-sm text-primary-100">↑ 12% desde el mes pasado</p>
					</article>
				</div>
			</div>

			<!-- Componentes de Formulario (estático) -->
			<div class="bg-white rounded-lg shadow-md p-6">
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Componentes de Formulario</h2>
				<div class="max-w-md space-y-4">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
						<input
							type="text"
							id="name"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
							placeholder="Ingresa tu nombre" />
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
						<input
							type="email"
							id="email"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
							placeholder="tu@ejemplo.com" />
					</div>
					<div>
						<label for="message" class="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
						<textarea
							id="message"
							rows="3"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
							placeholder="Tu mensaje..."></textarea>
					</div>
				</div>
			</div>

			<a href="#/" class="inline-block text-primary-500 hover:text-primary-600 font-medium">← Volver a Inicio</a>
		</div>
	</section>
</template>
```

#### Paso 5: Usa componentes en otras vistas

```html
<!-- index.html -->
<template id="view-proyectos">
	<section class="py-16 bg-gray-50 min-h-screen">
		<div class="container mx-auto px-4">
			<header class="text-center mb-12">
				<h1 class="text-4xl font-bold text-gray-900 mb-4">Proyectos Destacados</h1>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">Componentes Card mostrados en un contexto real.</p>
			</header>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<!-- Cards aquí -->
			</div>
			<a href="#/" class="inline-block mt-8 text-primary-500 hover:text-primary-600 font-medium">← Volver a Inicio</a>
		</div>
	</section>
</template>
```

### 🎨 Ventajas de Este Enfoque Modular

**1. Reutilización Real:**

```javascript
// Usa el mismo componente en múltiples vistas
import { Card } from '../components/Card.js';
// proyectos.js, componentes.js, blog.js todos usan Card
```

**2. Testing Aislado:**

```javascript
// Prueba solo el componente Button
import { Button } from '../components/Button.js';
// Test unitario sin dependencias de vistas
```

**3. Mantenimiento Localizado:**

```javascript
// Cambiar Button.js actualiza TODAS las vistas que lo usan
// Un cambio, múltiples beneficios
```

**4. Documentación Clara:**

```javascript
// JSDoc en cada componente explica uso
/**
 * @param {string} variant - Button style variant
 * @param {string} size - Button size (sm, md, lg)
 */
```

### 🔄 Comparación de Enfoques

| Aspecto                 | Monolítico (S3 básico) | Modular (S3 avanzado)  |
| ----------------------- | ---------------------- | ---------------------- |
| **Complejidad inicial** | ⭐ Baja                | ⭐⭐⭐ Alta            |
| **Reutilización**       | ❌ Copy-paste          | ✅ Import              |
| **Mantenibilidad**      | ⭐⭐ Media             | ⭐⭐⭐⭐⭐ Excelente   |
| **Testing**             | ⭐ Difícil             | ⭐⭐⭐⭐⭐ Fácil       |
| **Colaboración**        | ⭐⭐ Conflictos        | ⭐⭐⭐⭐⭐ Paralela    |
| **Escalabilidad**       | ⭐⭐ Limitada          | ⭐⭐⭐⭐⭐ Ilimitada   |
| **Bundle size**         | ⭐⭐⭐ Todo incluido   | ⭐⭐⭐⭐⭐ Tree-shaken |

### 💡 Cuándo Usar Cada Enfoque

**Usa enfoque monolítico (todo en una vista) cuando:**

- 🎓 Estás aprendiendo y quieres simplicidad
- 🚀 Prototipado rápido
- 👤 Proyecto personal pequeño
- 📝 Los componentes son únicos a esa vista

**Usa enfoque modular (archivos separados) cuando:**

- 👥 Trabajas en equipo
- 📈 El proyecto crecerá
- 🔄 Necesitas reutilizar componentes
- ✅ Quieres testing robusto
- 💼 Es un proyecto profesional

### 🏆 Desafío para Estudiantes Avanzados

**Refactoriza tu proyecto completo:**

1. ✅ Crea carpeta `src/components/`
2. ✅ Extrae Button, Card, Section a archivos separados
3. ✅ Añade JSDoc a cada componente
4. ✅ Actualiza todas las vistas para importar componentes
5. ✅ Crea un `src/components/index.js` para barrel exports:

```javascript
// src/components/index.js
export { Button, PrimaryButton, SecondaryButton, GhostButton } from './Button.js';
export { Card } from './Card.js';
export { Section } from './Section.js';

// Ahora importa todo desde un lugar:
// import { Button, Card, Section } from '../components/index.js';
```

6. ✅ Commit con mensaje descriptivo:

```bash
git add src/components/ src/views/
git commit -m "refactor: Extract components to separate files for reusability

- Create src/components/ directory structure
- Extract Button, Card, Section components
- Add JSDoc documentation to all components
- Update views to import from components
- Add barrel export in components/index.js

BREAKING CHANGE: Views now depend on component imports"
```

## 🎯 Ejercicios Prácticos: Mejorando Tus Rutas de Componentes

Ahora que entiendes los tokens de diseño y patrones de componentes, mejora las rutas que creaste en S2.

### Ejercicio 3.1: Actualiza Tu Playground de Componentes

Actualiza tu `src/views/componentes.js` para usar tokens de diseño:

```html
<!-- index.html -->
<template id="view-componentes-playground">
	<section class="py-16 bg-surface-light min-h-screen">
		<div class="container mx-auto px-4">
			<h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">Muestra de Sistema de Diseño</h1>

			<!-- Sistema de Botones con Tokens de Diseño -->
			<div class="bg-white rounded-lg shadow-md p-6 mb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Sistema de Botones</h2>
				<div class="flex flex-wrap gap-4">
					<button
						class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
						Acción Primaria
					</button>
					<button
						class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
						Acción Secundaria
					</button>
					<button
						class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
						Botón Ghost
					</button>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Tamaños de Botón</h3>
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
			</div>

			<!-- Biblioteca de Patrones de Tarjetas -->
			<div class="bg-white rounded-lg shadow-md p-6 mb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Patrones de Tarjetas</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<!-- Tarjeta con Imagen -->
					<article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
						<div class="aspect-w-16 aspect-h-9 bg-gray-200">
							<img
								src="https://picsum.photos/400/225?random=1"
								alt="Vista previa del proyecto"
								class="w-full h-48 object-cover" />
						</div>
						<div class="p-6">
							<h3 class="text-lg font-semibold text-gray-900 mb-2">Tarjeta con Imagen</h3>
							<p class="text-gray-600 text-sm mb-4">Tarjeta con cabecera de imagen y contenido de texto debajo.</p>
							<div class="flex gap-2">
								<span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">Diseño</span>
								<span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Destacado</span>
							</div>
						</div>
					</article>

					<!-- Tarjeta con Icono -->
					<article class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center">
						<div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						</div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">Tarjeta con Icono</h3>
						<p class="text-gray-600 text-sm">Tarjeta con icono centrado y contenido.</p>
					</article>

					<!-- Tarjeta de Estadísticas -->
					<article
						class="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-md p-6 text-white hover:shadow-lg transition-shadow">
						<h3 class="text-sm font-medium text-primary-100 mb-1">Total Proyectos</h3>
						<p class="text-3xl font-bold mb-1">42</p>
						<p class="text-sm text-primary-100">↑ 12% desde el mes pasado</p>
					</article>
				</div>
			</div>

			<!-- Componentes de Formulario -->
			<div class="bg-white rounded-lg shadow-md p-6 mb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Componentes de Formulario</h2>
				<div class="max-w-md space-y-4">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
						<input
							type="text"
							id="name"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
							placeholder="Ingresa tu nombre" />
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
						<input
							type="email"
							id="email"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
							placeholder="tu@ejemplo.com" />
					</div>
					<div>
						<label for="message" class="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
						<textarea
							id="message"
							rows="3"
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
							placeholder="Tu mensaje..."></textarea>
					</div>
				</div>
			</div>

			<a href="#/" class="inline-block text-primary-500 hover:text-primary-600 font-medium">← Volver a Inicio</a>
		</div>
	</section>
</template>
```

### Ejercicio 3.2: Crea una Ruta de Referencia de Tokens de Diseño

Crea una nueva ruta para documentar tu sistema de diseño:

```html
<!-- index.html -->
<template id="view-tokens-diseno">
	<section class="py-16 min-h-screen">
		<div class="container mx-auto px-4 max-w-6xl">
			<h1 class="text-4xl font-bold text-gray-900 mb-8">Referencia de Tokens de Diseño</h1>

			<div class="bg-white rounded-lg shadow-md p-6 mb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Sistema de Colores</h2>
				<h3 class="text-lg font-semibold text-gray-900 mb-3">Colores Primarios</h3>
				<div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
					<div class="space-y-2">
						<div class="h-20 bg-primary-50 rounded border border-gray-200"></div>
						<p class="text-sm font-mono text-gray-600">primary-50</p>
					</div>
					<div class="space-y-2">
						<div class="h-20 bg-primary-500 rounded"></div>
						<p class="text-sm font-mono text-gray-600">primary-500</p>
					</div>
					<div class="space-y-2">
						<div class="h-20 bg-primary-900 rounded"></div>
						<p class="text-sm font-mono text-gray-600">primary-900</p>
					</div>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-3">Colores de Superficie</h3>
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<div class="h-20 bg-surface-light rounded border border-gray-200"></div>
						<p class="text-sm font-mono text-gray-600">surface-light</p>
					</div>
					<div class="space-y-2">
						<div class="h-20 bg-surface-dark rounded"></div>
						<p class="text-sm font-mono text-gray-600 text-white">surface-dark</p>
					</div>
				</div>
			</div>

			<div class="bg-white rounded-lg shadow-md p-6 mb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Escala Tipográfica</h2>
				<div class="space-y-4">
					<div class="border-b border-gray-200 pb-4">
						<p class="text-5xl font-bold text-gray-900 mb-2">Display</p>
						<p class="text-sm text-gray-600 font-mono">text-5xl font-bold</p>
					</div>
					<div class="border-b border-gray-200 pb-4">
						<p class="text-4xl font-bold text-gray-900 mb-2">Encabezado 1</p>
						<p class="text-sm text-gray-600 font-mono">text-4xl font-bold</p>
					</div>
					<div class="border-b border-gray-200 pb-4">
						<p class="text-3xl font-bold text-gray-900 mb-2">Encabezado 2</p>
						<p class="text-sm text-gray-600 font-mono">text-3xl font-bold</p>
					</div>
					<div class="border-b border-gray-200 pb-4">
						<p class="text-base text-gray-900 mb-2">
							Texto de Cuerpo - El veloz murciélago hindú comía feliz cardillo y kiwi
						</p>
						<p class="text-sm text-gray-600 font-mono">text-base</p>
					</div>
				</div>
			</div>

			<div class="bg-white rounded-lg shadow-md p-6 mb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Sistema de Espaciado</h2>
				<div class="space-y-4">
					<div class="flex items-center gap-4">
						<div class="w-20 text-sm font-mono text-gray-600">spacing-4</div>
						<div class="h-4 bg-primary-500 rounded" style="width: 1rem;"></div>
						<span class="text-sm text-gray-600">1rem / 16px</span>
					</div>
					<div class="flex items-center gap-4">
						<div class="w-20 text-sm font-mono text-gray-600">spacing-8</div>
						<div class="h-4 bg-primary-500 rounded" style="width: 2rem;"></div>
						<span class="text-sm text-gray-600">2rem / 32px</span>
					</div>
					<div class="flex items-center gap-4">
						<div class="w-20 text-sm font-mono text-gray-600">spacing-18</div>
						<div class="h-4 bg-primary-500 rounded" style="width: 4.5rem;"></div>
						<span class="text-sm text-gray-600">4.5rem / 72px (personalizado)</span>
					</div>
				</div>
			</div>

			<a href="#/componentes" class="inline-block text-primary-500 hover:text-primary-600 font-medium">
				Ver Componentes →
			</a>
		</div>
	</section>
</template>
```

Registra la nueva ruta:

```javascript
// src/views/index.js
import home from './home.js';
import sobre from './sobre.js';
import proyectos from './proyectos.js';
import contacto from './contacto.js';
import tipografia from './tipografia.js';
import componentes from './componentes.js';
import tokensDiseno from './tokens-diseno.js'; // Añade esto
import notFound from './404.js';

export const views = {
	'/': home,
	'/sobre': sobre,
	'/proyectos': proyectos,
	'/contacto': contacto,
	'/tipografia': tipografia,
	'/componentes': componentes,
	'/tokens-diseno': tokensDiseno, // Añade esto
	404: notFound,
};
```

Añade a la navegación:

```html
<!-- index.html -->
<li><a href="#/componentes" class="hover:text-blue-400 transition-colors">Componentes</a></li>
<li><a href="#/tokens-diseno" class="hover:text-blue-400 transition-colors">Tokens de Diseño</a></li>
```

**Haz commit de tu sistema de componentes mejorado:**

```bash
git add .
git commit -m "feat: S3 - Componentes mejorados con tokens de diseño y documentación"
```

### 🎨 Mejores Prácticas de Sistemas de Diseño

- **Documenta todo:** Tu ruta de tokens de diseño se convierte en documentación viva
- **Consistencia primero:** Cada nuevo componente debe usar tokens, no valores arbitrarios
- **Verificaciones de accesibilidad:** Prueba contraste de colores, estados de foco y navegación por teclado
- **Mobile-first:** Construye componentes responsive desde la pantalla más pequeña hacia arriba

## 🎓 Explicaciones Pedagógicas

### Composición de Componentes vs. CSS Personalizado

La **composición de utilidades** trata componentes como combinaciones de estilos atómicos, mientras que **CSS personalizado** crea abstracciones nombradas. Cada enfoque tiene compromisos:

**Ventajas de composición de utilidades:**

- **Estilizado explícito:** Cada decisión de estilo es visible en el marcado
- **Bundles más pequeños:** Estilos no usados se purgan automáticamente
- **Mantenimiento más fácil:** Sin conflictos de cascada o guerras de especificidad
- **Responsive por defecto:** Variantes de breakpoints integradas

**Desafíos de composición de utilidades:**

- **Verbosidad HTML:** Muchas clases pueden saturar el marcado
- **Curva de aprendizaje:** Requiere entender relaciones entre utilidades
- **Refuerzo de consistencia:** Los equipos necesitan convenciones para patrones comunes

Los **tokens de diseño** salvan esta brecha proporcionando nombres semánticos para decisiones de diseño mientras mantienen beneficios de composición de utilidades.

### Accesibilidad en Diseño de Componentes

Los componentes deben ser **accesibles por defecto**:

- **HTML semántico:** Usa landmarks y roles apropiados
- **Atributos ARIA:** Proporciona contexto para contenido dinámico
- **Navegación por teclado:** Asegura que todos los elementos interactivos sean enfocables
- **Contraste de colores:** Cumple estándares WCAG AA (4.5:1 para texto normal)
- **Movimiento reducido:** Respeta preferencias de usuario

## Preguntas Críticas del Atelier

Siguiendo nuestra **metodología del atelier**, reflexiona sobre estas preguntas:

### Exploración

- ¿Qué utilidades expresan mejor tus tokens de diseño y patrones de componentes?
- ¿Cómo cambió la composición de componentes tu relación con decisiones de estilizado?

### Reflexión

- ¿Dónde redujo la reutilización de componentes la complejidad? ¿Dónde ocultó la intención?
- ¿Qué patrones de componentes mejoraron la mantenibilidad versus uso individual de utilidades?

### Conceptualización

- ¿Cómo se relacionan los tokens de diseño con identidad de marca y requisitos de accesibilidad?
- ¿De qué maneras encarna la composición de componentes "diseño como código"?

### Producción

- ¿Están tus componentes documentados con patrones de uso y variantes claros?
- ¿Cómo podría escalar este enfoque de componentes para equipos o proyectos más grandes?

### Exhibición

- ¿Cómo demostrarás variantes de componentes y comportamiento responsive en una presentación en vivo?
- ¿Qué enfoques alternativos de componentes (CSS-in-JS, bibliotecas de componentes) podrían lograr reutilización similar?

## Preguntas Críticas

### Preguntas de Reflexión

- ¿Cómo cambia Tailwind tu enfoque hacia la arquitectura de sistemas de diseño?
- ¿Cuál es la relación entre semántica de componentes y estética visual?
- ¿Cómo puede la codificación crítica moldear nuestra comprensión de la cultura digital del diseño?
- ¿Cómo representa tu sistema de componentes tu identidad como diseñador-desarrollador?

### Preguntas de Ética del Diseño

- ¿Cuáles necesidades se priorizan en tus decisiones de accesibilidad de componentes?
- ¿Cómo codifican tus tokens de diseño valores culturales u organizacionales?
- ¿Qué ocurre cuando la reutilización de componentes choca con necesidades únicas de usuario?

### Preguntas de Filosofía Técnica

- ¿Es la composición de utilidades más "honesta" que sistemas de componentes abstraídos?
- ¿Cómo se relaciona la composición de componentes con paradigmas de programación como composición funcional?
- ¿Qué significa "diseñar con restricciones" en un sistema utility-first?

## 🏗️ Scaffold Mínimo de Repositorio

Aquí tienes un punto de partida completo para tu sistema de componentes usando `<template>`:

```
sistema-componentes-tailwind/
├── index.html
├── src/
│   ├── main.js
│   ├── router.js
│   ├── style.css
│   ├── components/
│   │   ├── button-primary.html
│   │   ├── button-secondary.html
│   │   ├── card.html
│   │   └── section.html
│   ├── utils/
│   │   └── component-helpers.js
│   └── views/
│       ├── index.js
│       ├── componentes.html
│       ├── componentes.js
│       └── home.html
└── tailwind.config.js
```

**src/components/button.js:**

```javascript
// Factory de componente Button
export function createButton({ variant = 'primary', size = 'md', children, ...props }) {
	const baseClasses =
		'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

	const variants = {
		primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
		secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500',
		ghost: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base',
	};

	return {
		tag: 'button',
		className: `${baseClasses} ${variants[variant]} ${sizes[size]}`,
		children,
		...props,
	};
}
```

**src/components/card.js:**

```javascript
// Patrón de componente Card
export function createCard({ title, description, image, tags = [], href }) {
	const cardClasses = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow';

	return {
		tag: 'article',
		className: cardClasses,
		children: [
			{
				tag: 'div',
				className: 'aspect-w-16 aspect-h-9 bg-gray-200',
				children: image
					? [
							{
								tag: 'img',
								src: image,
								alt: `${title} preview`,
								className: 'w-full h-48 object-cover',
							},
					  ]
					: [],
			},
			{
				tag: 'div',
				className: 'p-6',
				children: [
					{ tag: 'h3', className: 'text-lg font-semibold text-gray-900 mb-2', children: title },
					{ tag: 'p', className: 'text-gray-600 text-sm mb-4 line-clamp-3', children: description },
					tags.length > 0
						? {
								tag: 'div',
								className: 'flex flex-wrap gap-2',
								children: tags.map((tag) => ({
									tag: 'span',
									className:
										'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800',
									children: tag,
								})),
						  }
						: null,
				],
			},
		],
	};
}
```

## Referencias

- [Tailwind CSS - Guía de tokens de diseño](https://tailwindcss.com/docs/adding-custom-styles#using-css-variables)
- [Handbook de sistemas de diseño](https://www.designsystems.com/)
- [Guías de componentes WCAG](https://www.w3.org/WAI/ARIA/apg/patterns/)

---

> **Siguiente:** [S4 - Estado e Interactividad →]({{ '/lessons/es/tailwind/state-interactivity/' | relative_url }})
