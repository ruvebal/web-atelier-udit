---
layout: lesson
title: 'Tailwind CSS: Ruteo SPA y Layout Compartido — Construyendo Experiencias Interactivas'
title_en: 'Tailwind CSS: SPA Routing & Shared Layout — Building Interactive Experiences'
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

## Prerrequisitos

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
   			href="#main"
   			class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-500 text-white px-4 py-2 rounded">
   			Saltar al contenido principal
   		</a>

   		<!-- Navegación compartida -->
   		<nav class="bg-gray-900 text-white sticky top-0 z-50" role="navigation" aria-label="Navegación principal">
   			<div class="container mx-auto px-4">
   				<div class="flex justify-between items-center py-4">
   					<a href="#/" class="text-xl font-bold hover:text-blue-400 transition-colors" aria-label="Inicio">Portafolio</a>
   					<div class="space-x-6">
   						<a href="#/" class="hover:text-blue-400 transition-colors" aria-current="page">Inicio</a>
   						<a href="#/sobre" class="hover:text-blue-400 transition-colors">Sobre</a>
   						<a href="#/proyectos" class="hover:text-blue-400 transition-colors">Proyectos</a>
   						<a href="#/contacto" class="hover:text-blue-400 transition-colors">Contacto</a>
   					</div>
   				</div>
   			</div>
   		</nav>

   		<!-- Área de contenido principal -->
   		<main id="app" class="min-h-screen" role="main">
   			<!-- Las vistas se renderizarán aquí -->
   		</main>

   		<!-- Footer compartido -->
   		<footer class="bg-gray-800 text-white py-8" role="contentinfo">
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
   		// Remover aria-current de todos los enlaces de navegación
   		document.querySelectorAll('nav a').forEach((link) => {
   			link.removeAttribute('aria-current');
   		});

   		// Añadir aria-current al enlace activo
   		const activeLink = document.querySelector(`nav a[href="${currentHash}"]`);
   		if (activeLink) {
   			activeLink.setAttribute('aria-current', 'page');
   		}
   	}
   }

   export default SimpleRouter;
   ```

3. **Crea plantillas de vistas:**

   ```javascript
   // src/views.js
   export const views = {
   	'/': {
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
   	},
   	'/sobre': {
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
   	},
   	404: {
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
   	},
   };
   ```

4. **Inicializa router en main.js:**

   ```javascript
   // src/main.js
   import SimpleRouter from './router.js';
   import { views } from './views.js';

   // Inicializar router
   const router = new SimpleRouter(views);

   // Opcional: Añadir scroll suave para enlaces ancla
   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
   	anchor.addEventListener('click', function (e) {
   		e.preventDefault();
   		const target = document.querySelector(this.getAttribute('href'));
   		if (target) {
   			target.scrollIntoView({
   				behavior: 'smooth',
   				block: 'start',
   			});
   		}
   	});
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

Aquí tienes un punto de partida completo para tu router SPA:

```
spa-portafolio/
├── index.html
├── src/
│   ├── main.js
│   ├── router.js
│   └── views.js
└── package.json
```

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

**src/views.js:**

```javascript
export const views = {
	'/': {
		template: `
      <section class="py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">Bienvenido a Inicio</h1>
          <p class="text-xl text-gray-600 mb-8">¡Navega usando el menú arriba!</p>
        </div>
      </section>
    `,
	},
	'/sobre': {
		template: `
      <section class="py-16">
        <div class="container mx-auto px-4 max-w-3xl">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Sobre Esta SPA</h1>
          <p class="text-lg text-gray-700">Construida con JavaScript vanilla y Tailwind CSS para máximo control y aprendizaje.</p>
        </div>
      </section>
    `,
	},
	404: {
		template: `
      <section class="py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Página No Encontrada</h1>
          <a href="#/" class="text-blue-500 hover:text-blue-600">Ir a Inicio</a>
        </div>
      </section>
    `,
	},
};
```

## Referencias

- [MDN - Client-side rendering (CSR)](https://developer.mozilla.org/en-US/docs/Glossary/CSR)
- [CleanCommit - Comparación SPA vs MPA](https://cleancommit.io/blog/spa-vs-mpa-which-is-the-king/)
- [StackOverflow - Ruteo SPA en JS vanilla](https://stackoverflow.com/questions/54231533/how-to-create-a-vanilla-js-routing-for-spa)
---

> **Siguiente:** [S3 - Componentes y Sistema de Diseño →](/lessons/es/tailwind/componentes-sistema-diseno/)
