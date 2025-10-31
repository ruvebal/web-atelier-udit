---
layout: lesson
title: 'Tailwind CSS: Ruteo SPA con HTML &lt;template&gt; — Renderizado Limpio y Seguro'
slug: tailwind-routing-html-template
date: 2025-10-27
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/tailwind/routing-and-shared-layout/html-template/
description: 'Una alternativa a plantillas de cadenas: renderizar vistas SPA desde elementos nativos HTML &lt;template&gt;, usando #app como contenedor.'
tags: [tailwindcss, spa, routing, dom, template]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Vistas basadas en HTML `<template>` (Alternativa a Plantillas de Cadenas)

Esta lección refleja la lección de ruteo anterior pero renderiza cada vista clonando contenido de elementos nativos HTML `<template>`. Seguimos usando un solo contenedor `#app`, mantenemos Tailwind para estilos, y preservamos los mismos patrones de navegación y accesibilidad.

¿Por qué `<template>`?

- La estructura vive en HTML (legible, escaneable)
- Clona de forma segura y eficiente (sin peligros de `innerHTML`)
- Funciona muy bien con `DocumentFragment` para actualizar el DOM por lotes
- Se alinea con la lección de JS DOM: {{ '/lessons/es/js-dom-manipulation/' | relative_url }}

## ¿Cuándo se introdujo el elemento HTML `<template>`?

El elemento HTML `<template>` fue **añadido a la plataforma web como estándar en 2014** y está soportado en todos los navegadores modernos (Chrome, Firefox, Safari, Edge y Opera). Su propósito es proporcionar un **fragmento declarativo e inerte de DOM** que no se renderiza al cargar la página, pero que puede ser clonado e insertado en el documento mediante JavaScript.

- **Especificación inicial:** El elemento `<template>` fue definido por primera vez como parte del [estándar W3C HTML5 en 2014](https://www.w3.org/TR/html5/single-page.html#the-template-element), con [amplio soporte en navegadores desde 2015](https://caniuse.com/template).
- **Compatibilidad:** Todos los navegadores evergreen (Chrome 26+, Firefox 22+, Safari 7+, Edge, Opera 15+) soportan `<template>`. Es seguro usarlo en cualquier proyecto web moderno.

### ¿Por qué `<template>` es revolucionario para las vistas SPA?

- **DOM seguro:** A diferencia del uso de `innerHTML` con cadenas, clonar plantillas evita riesgos de parseo e inyección.
- **Separación clara:** Permite mantener la estructura de la interfaz en HTML puro en vez de cadenas en JavaScript.
- **Rendimiento:** Permite clonación rápida (con nodos anidados, event listeners, etc.) sin volver a parsear HTML.

> **En resumen:**  
> El elemento `<template>` es una característica robusta y bien soportada para gestionar marcado dinámico y modular en SPAs. Su introducción resolvió muchos de los problemas asociados a las plantillas con cadenas y abrió el camino a una forma más "nativa en HTML" de construir UIs basadas en componentes usando JavaScript puro.

> **¡Haz una copia de seguridad de tu enfoque original!**

Antes de cambiar tu código SPA para usar `<template>`, es recomendable hacer una copia de seguridad de la versión anterior basada en plantillas de cadenas en Git. Aquí tienes un flujo de trabajo seguro utilizando ramas:

```bash
# Asegúrate de estar en main y actualizado
git checkout main
git pull

# Crea una rama de respaldo a partir de main (nombrada claramente, por ejemplo backup-string-templates)
git branch backup-string-templates

# (Opcional: O usa una marca de tiempo o nota descriptiva)
# git branch backup-2025-10-28

# Cambia a la nueva rama de respaldo
git checkout backup-string-templates

# Haz commit de todos los cambios sin confirmar (opcional pero recomendable para mayor seguridad)
git add .
git commit -m "Snapshot: backup de main antes de refactorizar"

# Sube la rama de respaldo al remoto para guardarla de forma segura
git push -u origin backup-string-templates

# Vuelve a main para continuar con el refactor
git checkout main
```

De esta manera, tu SPA original basado en plantillas de cadenas queda preservado. Si alguna vez necesitas recuperar el código, puedes extraer la rama `backup-string-templates` desde tu repositorio remoto.

---

## 1) index.html — Layout Compartido, Plantillas y Contenedor de App

```html
<!-- demo/index.html -->
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Portfolio SPA — HTML Template</title>
		<link rel="stylesheet" href="./src/style.css" />
		<script type="module" src="./src/main.js"></script>
		<script src="https://cdn.tailwindcss.com"></script>
	</head>
	<body class="bg-gray-50 text-gray-900">
		<a
			href="#app"
			class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded">
			Saltar al contenido principal
		</a>

		<!-- Navegación compartida (lista semántica) -->
		<nav
			class="fixed top-0 left-0 w-full bg-gray-900 text-white z-50 shadow-lg"
			role="navigation"
			aria-label="Navegación principal">
			<div class="mx-auto px-4">
				<div class="flex justify-between items-center py-4">
					<a href="#/" class="text-4xl font-bold hover:text-gray-300 transition-colors" aria-label="Inicio">Portfolio</a>
					<ul class="flex gap-6">
						<li><a href="#/" class="hover:text-gray-300 transition-colors" aria-current="page">Inicio</a></li>
						<li><a href="#/about" class="hover:text-gray-300 transition-colors">Acerca de</a></li>
						<li><a href="#/projects" class="hover:text-gray-300 transition-colors">Proyectos</a></li>
						<li><a href="#/contact" class="hover:text-gray-300 transition-colors">Contacto</a></li>
					</ul>
				</div>
			</div>
		</nav>

		<!-- Área de contenido principal -->
		<main id="app" class="min-h-screen pt-20 pb-24 flex items-center justify-center" role="main">
			<!-- Las plantillas de vistas son externas en ./src/views/*.html y son cargadas de forma lazy por el router. -->
		</main>

		<!-- Pie de página compartido -->
		<footer class="fixed bottom-0 left-0 w-full z-50 bg-gray-800 text-white py-8" role="contentinfo">
			<div class="container mx-auto px-4 text-center">
				<p class="text-lg">&copy; 2025 Portfolio SPA. Construido con Tailwind y Vanilla JS.</p>
			</div>
		</footer>
	</body>
</html>
```

---

## 2) Archivos Divididos — main.js, router.js, y views/index.js

### main.js, router.js, y views/index.js: Cómo Funciona Tu SPA Basada en HTML Template

Desglosemos cómo funciona la estructura de archivos de la aplicación de página única (SPA) del demo y la lógica de ruteo, y qué código va dónde:

---

#### 1. main.js — Punto de Entrada de la Aplicación

- **Propósito:** Inicializa tu SPA. Instancia el router y configura cualquier listener de eventos globales.

**demo/src/main.js**

```javascript
// demo/src/main.js
import { SimpleRouter } from './router.js';
import { views } from './views/index.js';

new SimpleRouter(views);

// Desplazamiento suave opcional para anclas en la página que no son enlaces del router
document.addEventListener('click', (e) => {
	const link = e.target.closest('a[href^="#"]');
	if (!link) return;
	const href = link.getAttribute('href');
	if (href.startsWith('#/')) return; // enlace del router
	const target = document.querySelector(href);
	if (target) {
		e.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
});
```

- **Conclusión:** Este archivo configura tu router para que los usuarios vean vistas basadas en el hash (ej. `#/about`) en la URL, y hace que la navegación se sienta fluida y como una aplicación.

---

#### 2. router.js — La Clase SimpleRouter

- **Propósito:** Maneja navegación, cambio de vistas, y resaltado de enlaces activos.
- **Cómo funciona:**

  1. **Ruteo Basado en Hash:** Escucha eventos `hashchange` y `load` en la ventana. Cuando el hash (como `#/about`) cambia, determina qué vista mostrar.
  2. **Carga de Vistas:** Para cada ruta, carga una [plantilla HTML](https://developer.mozilla.org/es/docs/Web/HTML/Element/template) desde tu carpeta `views/` si es necesario, luego la clona y muestra en `<main id="app">`.
  3. **onMount:** Si una ruta define una función `onMount(app)`, la llama después de renderizar, para que puedas ejecutar código JS para esa vista.
  4. **Resaltado de Navegación:** Actualiza el enlace de navegación activo usando `aria-current="page"` para mejor accesibilidad.

- **demo/src/router.js**

```javascript
// demo/src/router.js
export class SimpleRouter {
	constructor(routes) {
		this.routes = routes; // { '/': { templateId, templateUrl, onMount? }, ... }
		this.currentView = null;
		window.addEventListener('hashchange', () => this.handleRoute());
		window.addEventListener('load', () => this.handleRoute());
	}

	async handleRoute() {
		const hash = window.location.hash.slice(1) || '/';
		const route = this.routes[hash] || this.routes[404];
		if (route !== this.currentView) {
			await this.renderView(route);
			this.updateActiveNav(hash);
			this.currentView = route;
		}
	}

	async renderView(route) {
		const app = document.getElementById('app');
		app.textContent = '';

		await ensureTemplateAvailable(route.templateId, route.templateUrl);

		const tpl = document.getElementById(route.templateId);
		if (!tpl) {
			app.textContent = 'Plantilla no encontrada';
			return;
		}

		app.appendChild(tpl.content.cloneNode(true));
		if (typeof route.onMount === 'function') route.onMount(app);
	}

	updateActiveNav(currentHash) {
		document.querySelectorAll('nav a[href^="#/"]').forEach((link) => {
			link.removeAttribute('aria-current');
		});
		const activeLink = document.querySelector(`nav a[href="#${currentHash}"]`);
		if (activeLink) activeLink.setAttribute('aria-current', 'page');
	}
}

const templateCache = new Set();

async function ensureTemplateAvailable(templateId, templateUrl) {
	if (document.getElementById(templateId)) return;
	if (!templateUrl || templateCache.has(templateId)) return;

	const res = await fetch(templateUrl, { credentials: 'same-origin' });
	if (!res.ok) throw new Error(`Error al cargar plantilla: ${templateUrl}`);
	const html = await res.text();
	const doc = new DOMParser().parseFromString(html, 'text/html');
	const fetchedTemplate = doc.querySelector('template');
	if (!fetchedTemplate || !fetchedTemplate.id) {
		throw new Error(`No se encontró <template id="..."> en ${templateUrl}`);
	}
	document.body.appendChild(fetchedTemplate);
	templateCache.add(fetchedTemplate.id);
}
```

- **Consejo Pedagógico:** Este patrón te permite añadir nuevas rutas/vistas simplemente creando nuevos archivos de plantilla y actualizando tu configuración `views/index.js`.

---

#### 3. views/index.js — La Tabla de Vistas

- **Propósito:** Mapea declarativamente rutas de hash de URL (como `"/"` o `"/about"`) a sus archivos HTML de plantilla y funciones JS opcionales para ejecutar después de renderizar.

**demo/src/views/index.js**

```javascript
// demo/src/views/index.js
export const views = {
	'/': { templateId: 'view-home', templateUrl: './src/views/home.html' },
	'/about': { templateId: 'view-about', templateUrl: './src/views/about.html' },
	'/projects': { templateId: 'view-projects', templateUrl: './src/views/projects.html' },
	'/contact': { templateId: 'view-contact', templateUrl: './src/views/contact.html' },
	404: { templateId: 'view-404', templateUrl: './src/views/404.html' },
};
```

- **Consejo Pedagógico:** Este archivo es tu "tabla de rutas". Añade (o elimina) vistas aquí a medida que tu aplicación crece. Cada vista es un fragmento de HTML con un manejador `onMount` opcional para lógica como obtener datos o añadir event listeners.

---

### Cómo Todo Funciona Junto

1. Cuando tu aplicación carga, `main.js` configura el router.
2. El router escucha cambios de hash en la URL (ej., `#/about`).
3. Basándose en el hash, encuentra una vista en `views/index.js` — cada vista apunta a un archivo `<template>` HTML y puede proporcionar comportamiento JS.
4. El router **obtiene y renderiza** la plantilla HTML necesaria directamente en la página, reemplazando contenido en `<main id="app">`.
5. Si escribes una función `onMount` para una vista, ese código se ejecuta justo después de que la vista cargue (perfecto para inicializar JS o animación).
6. El router actualiza el resaltado de navegación para reflejar la ruta activa.

---

**Esta estructura es limpia, accesible y fácil de extender:**

- Todo el HTML para cada vista va en su propio archivo `./src/views`.
- ¡No se necesita `innerHTML` arriesgado! Se usa clonación de plantilla segura.
- Obtienes navegación con sensación instantánea, con cada vista cargada solo cuando sea necesario.

Si necesitas añadir una nueva página a tu SPA, solo:

- Añade un nuevo archivo `<template>` HTML a `./src/views`
- Actualiza `views/index.js` con una nueva ruta

¡Eso es todo!

---

## 3) style.css — Tokens Mínimos (Opcional)

```css
/* demo/src/style.css */
/* Si usas Tailwind, este archivo puede ser pequeño o vacío. Añade tokens locales según sea necesario. */
/* CSS personalizado solo para estilos de enfoque de enlace de salto (Tailwind no cubre esto bien) */
/* 
Razones de accesibilidad: 
Estas clases CSS personalizadas soportan el enlace "Saltar al contenido principal", una característica de accesibilidad esencial. 
- `.sr-only` oculta visualmente el enlace para que permanezca disponible para lectores de pantalla, ayudando a usuarios de teclado y tecnología asistiva a evitar navegación repetitiva.
- `.focus\:not-sr-only:focus` hace el enlace visible cuando está enfocado (usualmente con la tecla Tab), permitiendo a usuarios de teclado activarlo fácilmente.

Las clases de utilidad de Tailwind no cubren completamente este patrón, por lo que usamos CSS personalizado para asegurar accesibilidad fuerte para todos los usuarios.
*/

.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border-width: 0;
}
.focus\:not-sr-only:focus {
	position: static;
	width: auto;
	height: auto;
	padding: inherit;
	margin: inherit;
	overflow: visible;
	clip: auto;
	white-space: normal;
}
```

---

## Por Qué Esta Estructura

- El router es reutilizable y testeable; la tabla de vistas es declarativa
- Cada vista vive en un archivo HTML con un solo `<template id="...">` (legible)
- Evita riesgos de `innerHTML`; renderiza mediante clonación de contenido de plantilla seguro
- Puede cargar plantillas de vista de forma lazy en la primera visita, luego reutilizar desde caché
- Funciona bien con `DocumentFragment` para actualizaciones masivas (ver {{ '/lessons/es/js-dom-manipulation/' | relative_url }})

## Ejercicios

1. Añade un nuevo `<template id="view-typography">` y ruta `#/typography`.
2. Añade una lista dentro de una plantilla y poblarla desde `onMount` usando un `DocumentFragment`.
3. Convierte una vista de plantilla de cadena de la otra lección en una plantilla HTML.

---

## Archivos del Demo

La lección menciona los archivos exactos del demo arriba. También están disponibles en esta carpeta:

- `demo/index.html`
- `demo/src/main.js`
- `demo/src/style.css`

---

## Cómo Ejecutar el Demo

Puedes ejecutar el demo localmente con cualquier servidor de archivos estáticos. Por ejemplo:

1. **Usando la extensión Live Server de VS Code**

   - Abre esta carpeta en VS Code.
   - Haz clic derecho en `demo/index.html` y selecciona "Open with Live Server".

2. **Usando el servidor HTTP incorporado de `npm`:**

   ```sh
   npm install -g http-server
   http-server ./demo
   ```

3. **Usando Python (si está instalado):**
   ```sh
   cd demo
   python3 -m http.server
   ```

Luego visita [http://localhost:8080/](http://localhost:8080/) (o el puerto mostrado) en tu navegador.

### Añadiendo Estilos de Tailwind al Demo

Este demo usa clases de utilidad de Tailwind CSS. Para ver los estilos, añade el CDN de Tailwind a `demo/index.html`:

```html
<!-- demo/index.html <head> -->
<script src="https://cdn.tailwindcss.com"></script>
```

**Nota:** Para una aplicación de producción, usa una configuración de compilación apropiada de Tailwind (Vite + PostCSS) en lugar del CDN para bundles más pequeños y personalización.

---

> **Anterior:** [S2 - Ruteo SPA con String Templates ←]({{ '/lessons/es/tailwind/routing-and-shared-layout/string-templates/' | relative_url }})
>
> **Siguiente:** [S3 - Componentes y Sistema de Diseño →]({{ '/lessons/es/tailwind/components-design-system/' | relative_url }})
