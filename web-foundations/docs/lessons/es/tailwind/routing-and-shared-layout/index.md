---
layout: lesson
title: 'Tailwind CSS: Ruteo SPA y Layout Compartido — Construyendo Experiencias Interactivas'
title_alt: 'Tailwind CSS: SPA Routing & Shared Layout — Building Interactive Experiences'
slug: tailwind-routing-layout
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/tailwind/routing-and-shared-layout/
description: 'Guía completa para implementar ruteo SPA y layouts compartidos con Tailwind CSS, incluyendo pedagogía, accesibilidad y scaffolding práctico.'
tags: [tailwindcss, spa, ruteo, accesibilidad, pedagogía]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Tailwind CSS: Ruteo SPA y Layout Compartido — Construyendo Experiencias Interactivas

> **Divulgación de asistencia IA:** Esta lección se basa en experiencia docente desde septiembre 2024, con iteraciones de IA siguiendo ciclos investigación–práctica–investigación.

## 🎭 Enfoque de Codificación Crítica

Esta lección sigue la **metodología del atelier** (exploración → reflexión → conceptualización → producción → exhibición). Construimos no para automatizar, sino para **articular** — dar forma al pensamiento mediante ritmo, reflexión y resistencia.

- **Exploración:** Experimentos interactivos de codificación con sistemas de ruteo.
- **Reflexión:** Comprensión de arquitectura SPA y compromisos de accesibilidad.
- **Conceptualización:** Conexión de patrones de navegación con diseño de experiencia de usuario.
- **Producción:** Construcción de sistemas de ruteo accesibles y performantes.
- **Exhibición:** Demostración de experiencias de navegación fluidas.

## Requisitos

<div class="prerequisites">
  <h3>📚 Antes de comenzar</h3>
  <ul>
    <li><strong>S1 completada:</strong> Configuración Vite + Tailwind con estructura HTML básica</li>
    <li><strong>Fundamentos JavaScript:</strong> Manipulación DOM, eventos, funciones básicas</li>
    <li><strong>Utilidades Tailwind:</strong> Familiaridad con diseño responsive y estilizado de componentes</li>
    <li><strong>Git básico:</strong> Hacer commits y escribir mensajes de commit significativos</li>
  </ul>
</div>

## 🚀 Arquitectura SPA: Más allá de páginas estáticas

Las **Single-Page Applications (SPAs)** cargan un documento HTML y usan JavaScript para actualizar contenido dinámicamente. Esto crea **experiencias app-like** donde la navegación se siente instantánea, pero introduce consideraciones:

- **Client-Side Rendering (CSR):** El navegador genera contenido dinámicamente
- **Desafíos SEO:** El contenido puede no ser rastreable sin server-side rendering
- **Dependencia JavaScript:** Los usuarios sin JS ven páginas en blanco
- **Compromisos de rendimiento:** Carga inicial vs. velocidad de navegación

Nuestro router por hash proporciona una **base PWA-ready** que puede evolucionar hacia patrones de ruteo más sofisticados.

## S2 — Ruteo SPA y Layout Compartido (Navegación, Accesibilidad)

Esta sesión implementa **ruteo por hash** para navegación fluida sin recargas completas, manteniendo estándares de accesibilidad.

### Implementación paso a paso

1. **Crea estructura de layout compartido:**

   ```html
   <!-- index.html -->
   <!DOCTYPE html>
   <html lang="es">
   	<head>
   		<meta charset="UTF-8" />
   		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
   		<title>Portafolio SPA</title>
   		<script type="module" src="/src/main.js"></script>
   	</head>
   	<body>
   		<!-- Skip link para accesibilidad -->
   		<a
   			href="#app"
   			class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-500 text-white px-4 py-2 rounded">
   			Saltar al contenido principal
   		</a>

   		<!-- Navegación compartida (lista semántica) -->
   		<nav class="fixed top-0 left-0 w-full bg-gray-900 text-white z-50" role="navigation" aria-label="Main navigation">
   			<div class="container mx-auto px-4">
   				<div class="flex justify-between items-center py-4">
   					<a href="#/" class="text-xl font-bold hover:text-blue-400 transition-colors" aria-label="Inicio">Portafolio</a>
   					<ul class="flex gap-6">
   						<li><a href="#/" class="hover:text-blue-400 transition-colors" aria-current="page">Inicio</a></li>
   						<li><a href="#/sobre" class="hover:text-blue-400 transition-colors">Sobre</a></li>
   						<li><a href="#/proyectos" class="hover:text-blue-400 transition-colors">Proyectos</a></li>
   						<li><a href="#/contacto" class="hover:text-blue-400 transition-colors">Contacto</a></li>
   					</ul>
   				</div>
   			</div>
   		</nav>

   		<!-- Área de contenido principal -->
   		<main id="app" class="fixed inset-0 min-h-screen flex items-center justify-center" role="main">
   			<!-- Views will be rendered here -->
   		</main>

   		<!-- Footer compartido -->
   		<footer class="fixed bottom-0 left-0 w-full z-50 bg-gray-800 text-white py-8" role="contentinfo">
   			<div class="container mx-auto px-4 text-center">
   				<p>&copy; 2025 Portafolio SPA. Construido con Tailwind & JavaScript vanilla.</p>
   			</div>
   		</footer>
   	</body>
   </html>
   ```

2. **Implementa router por hash:**

   ```javascript
   // src/router.js
   class SimpleRouter {
   	constructor(routes) {
   		this.routes = routes;
   		this.currentView = null;

   		// Escuchar cambios de hash
   		window.addEventListener('hashchange', () => this.handleRoute());
   		window.addEventListener('load', () => this.handleRoute());
   	}

   	handleRoute() {
   		const hash = window.location.hash.slice(1) || '/';
   		const route = this.routes[hash] || this.routes['404'];

   		if (route !== this.currentView) {
   			this.renderView(route);
   			this.updateActiveNav(hash);
   			this.currentView = route;
   		}
   	}

   	renderView(route) {
   		const app = document.getElementById('app');
   		app.innerHTML = route.template;

   		// Ejecutar JavaScript específico de la vista
   		if (route.script) {
   			route.script();
   		}
   	}

   	updateActiveNav(currentHash) {
   		// Solo considerar enlaces del router SPA que empiezan por "#/".
   		// Evita tocar anclas internas como "#app" (skip links, enlaces de sección).
   		document.querySelectorAll('nav a[href^="#/"]').forEach((link) => {
   			link.removeAttribute('aria-current');
   		});

   		// currentHash es como "/", "/sobre", ...
   		// Construimos el selector completo como `#${currentHash}` para coincidir con hrefs (ej. href="#/sobre").
   		const activeLink = document.querySelector(`nav a[href="#${currentHash}"]`);
   		if (activeLink) {
   			activeLink.setAttribute('aria-current', 'page');
   		}
   	}
   }

   export default SimpleRouter;
   ```

3. **Crea estructura de directorio de vistas:**

   Primero, crea archivos de vista separados para mejor organización y mantenibilidad:

   ```javascript
   // src/views/home.js
   export default {
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">Bienvenido a Inicio</h1>
          <p class="text-xl text-gray-600 mb-8">Esta es la página de inicio de nuestra SPA.</p>
          <a href="#/sobre" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Conoce Sobre Nosotros
          </a>
        </div>
      </section>
    `,
   };
   ```

   ```javascript
   // src/views/sobre.js
   export default {
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Sobre Nosotros</h1>
          <div class="max-w-3xl mx-auto">
            <p class="text-lg text-gray-700 mb-4">
              Construimos aplicaciones web modernas con Tailwind CSS y JavaScript vanilla.
              Nuestro enfoque está en accesibilidad, rendimiento y experiencia de usuario.
            </p>
            <p class="text-lg text-gray-700 mb-6">
              Esta SPA demuestra ruteo, diseño responsive y mejora progresiva.
            </p>
            <a href="#/" class="text-blue-500 hover:text-blue-600 font-medium">← Volver a Inicio</a>
          </div>
        </div>
      </section>
    `,
   };
   ```

   ```javascript
   // src/views/proyectos.js
   export default {
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Nuestros Proyectos</h1>
          <div class="max-w-3xl mx-auto">
            <p class="text-lg text-gray-700 mb-6">
              Próximamente: Una muestra de proyectos construidos con tecnologías web modernas.
            </p>
            <a href="#/" class="text-blue-500 hover:text-blue-600 font-medium">← Volver a Inicio</a>
          </div>
        </div>
      </section>
    `,
   };
   ```

   ```javascript
   // src/views/contacto.js
   export default {
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Contacto</h1>
          <div class="max-w-3xl mx-auto">
            <p class="text-lg text-gray-700 mb-6">
              Ponte en contacto con nosotros a través de nuestros canales sociales.
            </p>
            <a href="#/" class="text-blue-500 hover:text-blue-600 font-medium">← Volver a Inicio</a>
          </div>
        </div>
      </section>
    `,
   };
   ```

   ```javascript
   // src/views/404.js
   export default {
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Página No Encontrada</h1>
          <p class="text-xl text-gray-600 mb-8">La página que buscas no existe.</p>
          <a href="#/" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Ir a Inicio
          </a>
        </div>
      </section>
    `,
   };
   ```

   Ahora crea un archivo índice para colectar todas las vistas:

   ```javascript
   // src/views/index.js
   import home from './home.js';
   import sobre from './sobre.js';
   import proyectos from './proyectos.js';
   import contacto from './contacto.js';
   import notFound from './404.js';

   export const views = {
   	'/': home,
   	'/sobre': sobre,
   	'/proyectos': proyectos,
   	'/contacto': contacto,
   	404: notFound,
   };
   ```

4. **Inicializa router en main.js:**

   ```javascript
   // src/main.js
   import SimpleRouter from './router.js';
   import { views } from './views/index.js';

   // Inicializar router
   const router = new SimpleRouter(views);

   // Opcional: Scroll suave para anclas internas SIN romper el ruteo SPA
   // 1) Delegación de eventos: un solo listener captura clicks en anchors.
   // 2) Solo manejamos hashes que apuntan a secciones internas (ej. #app).
   // 3) Ignoramos enlaces del router que empiezan por "#/" para que el router gestione la navegación.
   document.addEventListener('click', (e) => {
   	const link = e.target.closest('a[href^="#"]');
   	if (!link) return; // No es un enlace con hash
   	const href = link.getAttribute('href');
   	if (href.startsWith('#/')) return; // enlace del router: lo gestiona el router
   	const target = document.querySelector(href);
   	if (target) {
   		e.preventDefault();
   		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
   	}
   });
   ```

5. **Prueba la SPA:**

   - Navega entre rutas usando enlaces de navegación
   - Verifica que el hash de URL se actualice sin recarga de página
   - Prueba navegación por teclado y estados de foco
   - Comprueba layout responsive en diferentes tamaños de pantalla

6. **Haz commit de tu trabajo:**
   ```bash
   git add .
   git commit -m "feat: S2 - Router SPA por hash + layout compartido, navegación accesible"
   ```

## Ejercicios Prácticos: Construyendo Rutas para Práctica de Diseño Web

Ahora que tienes un sistema de ruteo modular, ¡cada nuevo ejercicio de Tailwind puede tener su propia ruta! Este enfoque mantiene tu código organizado y te permite construir un portafolio de experimentos de diseño.

### Ejercicio 2.1: Crea una Ruta de Muestra de Tipografía

Crea una ruta para practicar tipografía y color:

```javascript
// src/views/tipografia.js
export default {
	template: `
    <section class="py-16 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div class="container mx-auto px-4 max-w-4xl">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Tipografía y Color</h1>
        <p class="text-xl text-gray-600 mb-8">Explorando la escala tipográfica y el sistema de colores de Tailwind</p>
        
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Jerarquía de Encabezados</h2>
          <h3 class="text-2xl font-semibold text-gray-800 mb-2">Ejemplo de Subencabezado</h3>
          <h4 class="text-xl font-medium text-gray-700 mb-2">Título de Sección</h4>
          <p class="text-base text-gray-600 leading-relaxed mb-4">
            Este es texto de cuerpo demostrando altura de línea y espaciado apropiados. 
            Observa cómo la tipografía por defecto de Tailwind crea contenido legible y accesible.
          </p>
          <p class="text-sm text-gray-500">Texto pequeño para metadatos o pies de foto.</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-blue-500 text-white p-4 rounded text-center font-semibold">Azul</div>
          <div class="bg-green-500 text-white p-4 rounded text-center font-semibold">Verde</div>
          <div class="bg-purple-500 text-white p-4 rounded text-center font-semibold">Morado</div>
          <div class="bg-red-500 text-white p-4 rounded text-center font-semibold">Rojo</div>
        </div>
        
        <a href="#/" class="inline-block mt-8 text-blue-600 hover:text-blue-700 font-medium">← Volver a Inicio</a>
      </div>
    </section>
  `,
};
```

Luego regístrala:

```javascript
// src/views/index.js
import home from './home.js';
import sobre from './sobre.js';
import proyectos from './proyectos.js';
import contacto from './contacto.js';
import tipografia from './tipografia.js'; // Añade esto
import notFound from './404.js';

export const views = {
	'/': home,
	'/sobre': sobre,
	'/proyectos': proyectos,
	'/contacto': contacto,
	'/tipografia': tipografia, // Añade esto
	404: notFound,
};
```

Añade a la navegación:

```html
<!-- index.html - Añade a la lista nav -->
<li><a href="#/tipografia" class="hover:text-blue-400 transition-colors">Tipografía</a></li>
```

### Ejercicio 2.2: Crea una Ruta de Playground de Componentes

Esta ruta será tu campo de pruebas para componentes reutilizables:

```javascript
// src/views/componentes.js
export default {
	template: `
    <section class="py-16 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">Playground de Componentes</h1>
        
        <!-- Variantes de botones -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Botones</h2>
          <div class="flex flex-wrap gap-4">
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
              Primario
            </button>
            <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
              Secundario
            </button>
            <button class="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-bold py-2 px-4 rounded transition-colors">
              Contorno
            </button>
          </div>
        </div>

        <!-- Grid de tarjetas -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Tarjetas</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div class="h-32 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div class="p-4">
                <h3 class="font-bold text-gray-900 mb-2">Título de Tarjeta</h3>
                <p class="text-gray-600 text-sm">La descripción de la tarjeta va aquí.</p>
              </div>
            </article>
            
            <article class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div class="h-32 bg-gradient-to-r from-green-400 to-teal-500"></div>
              <div class="p-4">
                <h3 class="font-bold text-gray-900 mb-2">Título de Tarjeta</h3>
                <p class="text-gray-600 text-sm">La descripción de la tarjeta va aquí.</p>
              </div>
            </article>
            
            <article class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div class="h-32 bg-gradient-to-r from-pink-400 to-red-500"></div>
              <div class="p-4">
                <h3 class="font-bold text-gray-900 mb-2">Título de Tarjeta</h3>
                <p class="text-gray-600 text-sm">La descripción de la tarjeta va aquí.</p>
              </div>
            </article>
          </div>
        </div>
        
        <a href="#/" class="inline-block text-blue-600 hover:text-blue-700 font-medium">← Volver a Inicio</a>
      </div>
    </section>
  `,
};
```

**Haz commit de tu trabajo de práctica:**

```bash
git add .
git commit -m "feat: Añadir rutas de práctica para tipografía y componentes"
```

### 🎨 Por Qué Funciona Este Enfoque

- **Experimentación aislada:** Cada concepto de diseño tiene su propia ruta
- **Construcción de portafolio:** Tu SPA se convierte en una muestra de tu trabajo
- **Complejidad progresiva:** Empieza simple, añade características incrementalmente
- **Práctica real de ruteo:** Estás aprendiendo organización de código profesional
- **Listo para el futuro:** En S3, refactorizaremos estos en componentes reutilizables

### 💡 Ejercicio Desafío

Crea tu propia ruta para práctica de layouts responsive:

1. Crea `src/views/layouts.js`
2. Construye una página mostrando diferentes patrones de grid y flexbox
3. Añádela a `src/views/index.js` y a la navegación
4. Prueba el comportamiento responsive en diferentes tamaños de pantalla

## 🎓 Explicaciones Pedagógicas

### Compromisos de Arquitectura SPA

**Beneficios de Client-Side Rendering (CSR):**

- **UX fluida:** Sin recargas de página, sensación app-like
- **Navegación rápida:** Actualización de contenido instantánea
- **Potencial offline:** Puede funcionar con service workers

**Desafíos de CSR:**

- **Limitaciones SEO:** Contenido no rastreable sin SSR/hidratación
- **Carga inicial:** Bundle más grande, primer paint más lento
- **Dependencia JS:** Se rompe sin JavaScript habilitado
- **Estado de navegación:** Necesita manejo cuidadoso de back/forward

**Ruteo por hash** proporciona un punto de entrada simple que puede evolucionar hacia patrones más sofisticados como History API o ruteo basado en frameworks.

### Accesibilidad en Navegación SPA

Las SPAs deben mantener **estándares de accesibilidad web** mientras proporcionan experiencias dinámicas:

- **Landmarks semánticos:** `<nav>`, `<main>`, `<footer>` para lectores de pantalla
- **Skip links:** Permiten a usuarios de teclado saltar al contenido
- **Gestión de foco:** Asegura que el foco se mueva apropiadamente durante cambios de ruta
- **Etiquetas ARIA:** Proporcionan contexto para contenido dinámico
- **Mejora progresiva:** Funcionalidad core funciona sin JS

## Preguntas Críticas del Atelier

Siguiendo nuestra **metodología del atelier**, reflexiona sobre estas preguntas:

### Exploración

- ¿Qué mejoras de experiencia de usuario vienen de evitar recargas completas?
- ¿Cómo afecta la simplicidad del router a la velocidad de desarrollo?

### Reflexión

- ¿Qué compromisos de accesibilidad introduce el rendering del lado cliente?
- ¿Cómo afecta el ruteo por hash al rendimiento percibido?

### Conceptualización

- ¿Cómo moldean los patrones de ruteo la narrativa y arquitectura de información?
- ¿De qué maneras encarna la navegación SPA "diseño de interacción"?

### Producción

- ¿Es tu código de router pequeño, claro y bien documentado para mantenibilidad?
- ¿Cómo podría escalar este enfoque de ruteo para aplicaciones más grandes?

### Exhibición

- ¿Cómo demostrarás cambios de ruta y manejo del foco en una demo en vivo?
- ¿Qué enfoques alternativos de ruteo (History API, frameworks) podrían lograr resultados similares?

## 🏗️ Scaffold Mínimo de Repositorio

Aquí tienes un punto de partida completo para tu router SPA con vistas modulares:

```
spa-portafolio/
├── index.html
├── src/
│   ├── main.js
│   ├── router.js
│   ├── style.css
│   └── views/
│       ├── index.js
│       ├── home.js
│       ├── sobre.js
│       ├── proyectos.js
│       ├── contacto.js
│       └── 404.js
└── package.json
```

**¿Por qué archivos de vista separados?**

- **Mantenibilidad:** Cada vista es autocontenida y fácil de localizar
- **Escalabilidad:** Añadir nuevas rutas no satura un solo archivo
- **Colaboración en equipo:** Múltiples desarrolladores pueden trabajar en diferentes vistas simultáneamente
- **Pedagogía:** Enseña organización de código apropiada desde el inicio

**src/router.js:**

```javascript
// Implementación de router por hash
class SimpleRouter {
	constructor(routes) {
		this.routes = routes;
		this.currentView = null;

		window.addEventListener('hashchange', () => this.handleRoute());
		window.addEventListener('load', () => this.handleRoute());
	}

	handleRoute() {
		const hash = window.location.hash.slice(1) || '/';
		const route = this.routes[hash] || this.routes['404'];

		if (route !== this.currentView) {
			this.renderView(route);
			this.updateActiveNav(hash);
			this.currentView = route;
		}
	}

	renderView(route) {
		const app = document.getElementById('app');
		app.innerHTML = route.template;

		if (route.script) {
			route.script();
		}
	}

	updateActiveNav(currentHash) {
		document.querySelectorAll('nav a').forEach((link) => {
			link.removeAttribute('aria-current');
		});

		const activeLink = document.querySelector(`nav a[href="${currentHash}"]`);
		if (activeLink) {
			activeLink.setAttribute('aria-current', 'page');
		}
	}
}

export default SimpleRouter;
```

**src/views/home.js:**

```javascript
export default {
	template: `
    <section class="py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">Bienvenido a Inicio</h1>
        <p class="text-xl text-gray-600 mb-8">¡Navega usando el menú arriba!</p>
      </div>
    </section>
  `,
};
```

**src/views/sobre.js:**

```javascript
export default {
	template: `
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-3xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-6">Sobre Esta SPA</h1>
        <p class="text-lg text-gray-700">Construida con JavaScript vanilla y Tailwind CSS para máximo control y aprendizaje.</p>
      </div>
    </section>
  `,
};
```

**src/views/404.js:**

```javascript
export default {
	template: `
    <section class="py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-6">Página No Encontrada</h1>
        <a href="#/" class="text-blue-500 hover:text-blue-600">Ir a Inicio</a>
      </div>
    </section>
  `,
};
```

**src/views/index.js:**

```javascript
import home from './home.js';
import sobre from './sobre.js';
import notFound from './404.js';

export const views = {
	'/': home,
	'/sobre': sobre,
	404: notFound,
};
```

## Referencias

- [MDN - Client-side rendering (CSR)](https://developer.mozilla.org/en-US/docs/Glossary/CSR)
- [CleanCommit - Comparación SPA vs MPA](https://cleancommit.io/blog/spa-vs-mpa-which-is-the-king/)
- [StackOverflow - Ruteo SPA en JS vanilla](https://stackoverflow.com/questions/54231533/how-to-create-a-vanilla-js-routing-for-spa)

---

> **Siguiente:** [S3 - Componentes y Sistema de Diseño →]({{ '/lessons/es/tailwind/components-design-system/' | relative_url }})
