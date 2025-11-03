---
layout: lesson
title: 'Tailwind CSS: Ruteo SPA con String Templates — Vistas Modulares y Navegación'
title_alt: 'Tailwind CSS: SPA Routing with String Templates — Modular Views & Navigation'
slug: tailwind-routing-string-templates
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/tailwind/routing-and-shared-layout/string-templates/
description: 'Guía completa para implementar ruteo SPA con plantillas de cadenas de JavaScript, arquitectura de vistas modulares y patrones de navegación accesibles con Tailwind CSS.'
tags: [tailwindcss, spa, routing, string-templates, accessibility, pedagogy]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Tailwind CSS: Ruteo SPA y Layout Compartido — Construyendo Experiencias Interactivas

> **Declaración de Asistencia IA:** Esta lección se basa en experiencia de aula desde septiembre de 2024, con iteraciones de IA siguiendo ciclos de investigación–práctica–investigación.

## 🎭 Enfoque Crítico de Código

Esta lección sigue la **metodología de atelier** (exploración → reflexión → conceptualización → producción → exhibición). Construimos no para automatizar, sino para **articular** — dando forma al pensamiento a través del ritmo, reflexión y resistencia.

- **Exploración:** Experimentos interactivos de código con sistemas de ruteo.
- **Reflexión:** Comprender la arquitectura SPA y las compensaciones de accesibilidad.
- **Conceptualización:** Conectar patrones de navegación con el diseño de experiencia de usuario.
- **Producción:** Construir sistemas de ruteo accesibles y performantes.
- **Exhibición:** Demostrar experiencias de navegación fluidas.

## Requisitos

<div class="prerequisites">
  <h3>📚 Antes de Comenzar</h3>
  <ul>
    <li><strong>S1 completado:</strong> Configuración de Vite + Tailwind con estructura HTML básica</li>
    <li><strong>Fundamentos de JavaScript:</strong> Manipulación del DOM, eventos, funciones básicas</li>
    <li><strong>Utilidades de Tailwind:</strong> Familiaridad con diseño responsivo y estilizado de componentes</li>
    <li><strong>Fundamentos de Git:</strong> Confirmar cambios y escribir mensajes de commit significativos</li>
  </ul>
</div>

## 🚀 Arquitectura SPA: Más Allá de Páginas Estáticas

**Las Aplicaciones de Página Única (SPAs)** cargan un documento HTML y usan JavaScript para actualizar el contenido dinámicamente. Esto crea **experiencias tipo aplicación** donde la navegación se siente instantánea, pero introduce consideraciones:

- **Renderizado del Lado del Cliente (CSR):** El navegador genera contenido dinámicamente
- **Desafíos de SEO:** El contenido puede no ser rastreable sin renderizado del lado del servidor
- **Dependencia de JavaScript:** Los usuarios sin JS ven páginas en blanco
- **Compensaciones de rendimiento:** Carga inicial vs. velocidad de navegación

Nuestro router basado en hash proporciona una **base lista para PWA** que puede evolucionar a patrones de ruteo más sofisticados.

## S2 — Ruteo SPA y Layout Compartido (Navegación, Accesibilidad)

Esta sesión implementa **ruteo basado en hash** para navegación fluida sin recargas completas de página, manteniendo estándares de accesibilidad.

### Implementación Paso a Paso

1. **Crear estructura de layout compartido:**

   ```html
   <!-- index.html -->
   <!DOCTYPE html>
   <html lang="es">
   	<head>
   		<meta charset="UTF-8" />
   		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
   		<title>Portfolio SPA</title>
   		<script type="module" src="/src/main.js"></script>
   	</head>
   	<body class="bg-surface-light text-content">
   		<!-- Usando tokens de tema: superficie clara + texto predeterminado -->
   		<!-- Enlace de salto para accesibilidad -->
   		<a
   			href="#app"
   			class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-content-inverted px-4 py-2 rounded">
   			<!-- Usar marca y texto invertido -->
   			Saltar al contenido principal
   		</a>

   		<!-- Navegación compartida (lista semántica) -->
   		<nav
   			class="fixed top-0 left-0 w-full bg-primary-900 text-content-inverted z-50 shadow-elevated"
   			role="navigation"
   			aria-label="Navegación principal">
   			<!-- Encabezado de marca con sombra elevada -->
   			<div class="mx-auto px-4">
   				<div class="flex justify-between items-center py-4">
   					<a href="#/" class="text-4xl font-bold hover:text-primary-50 transition-colors" aria-label="Inicio">
   						Portfolio
   					</a>
   					<!-- Usando tamaño de utilidad predeterminado (text-4xl) anulado en config -->
   					<ul class="flex gap-6">
   						<li><a href="#/" class="hover:text-primary-50 transition-colors" aria-current="page">Inicio</a></li>
   						<li><a href="#/about" class="hover:text-primary-50 transition-colors">Acerca de</a></li>
   						<li><a href="#/projects" class="hover:text-primary-50 transition-colors">Proyectos</a></li>
   						<li><a href="#/contact" class="hover:text-primary-50 transition-colors">Contacto</a></li>
   					</ul>
   				</div>
   			</div>
   		</nav>

   		<!-- Área de contenido principal -->
   		<main id="app" class="min-h-screen pt-20 pb-24 flex items-center justify-center" role="main">
   			<!-- Las vistas también usan tokens -->
   			<!-- Las vistas se renderizarán aquí -->
   		</main>

   		<!-- Pie de página compartido -->
   		<footer class="fixed bottom-0 left-0 w-full z-50 bg-surface-dark text-content-inverted py-8" role="contentinfo">
   			<!-- Superficie oscura + texto invertido -->
   			<div class="container mx-auto px-4 text-center">
   				<p class="text-lg">&copy; 2025 Portfolio SPA. Construido con Tailwind y Vanilla JS.</p>
   				<!-- Usando tamaño de utilidad predeterminado (text-lg) anulado en config -->
   			</div>
   		</footer>
   	</body>
   </html>
   ```

2. **Implementar router basado en hash:**

   Nota didáctica — Clase vs Función (conciso):

   - Tanto una clase como una función fábrica funcionan aquí.
   - Clase = estado encapsulado + múltiples instancias; Fábrica = simple + componible.
   - Usamos una clase para claridad ahora; refactoriza a una fábrica más tarde si lo prefieres.

```javascript
// src/router.js
// Pista: también podría ser una fábrica; la clase encapsula estado + configuración.
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

		// Ejecutar cualquier JavaScript específico de la vista
		if (route.script) {
			route.script();
		}
	}

	updateActiveNav(currentHash) {
		// Solo considerar enlaces del router SPA que comienzan con "#/".
		// Esto evita tocar anclas en la página como "#app" (enlaces de salto, enlaces de sección).
		document.querySelectorAll('nav a[href^="#/"]').forEach((link) => {
			link.removeAttribute('aria-current');
		});

		// currentHash es como "/", "/about", ...
		// Construir el selector completo como `#${currentHash}` para coincidir con hrefs de nav (ej. href="#/about").
		const activeLink = document.querySelector(`nav a[href="#${currentHash}"]`);
		if (activeLink) {
			activeLink.setAttribute('aria-current', 'page');
		}
	}
}

export default SimpleRouter;
```

3. **Crear estructura de directorio de vistas:**

   Primero, crea archivos de vista separados para mejor organización y mantenibilidad:

   ```javascript
   // src/views/home.js
   export default {
   	// Nota: Esto usa una cadena de plantilla de JavaScript (backticks) para construir HTML.
   	// Para una comprensión más profunda de las opciones de renderizado del DOM, seguridad e historia,
   	// ver la lección: {{ '/lessons/es/js-dom-manipulation/' | relative_url }}
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">Bienvenido</h1>
          <p class="text-xl text-gray-600 mb-8">Esta es la página de inicio de nuestra SPA.</p>
          <a href="#/about" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Conoce Más Sobre Nosotros
          </a>
        </div>
      </section>
    `,
   };
   ```

   ```javascript
   // src/views/about.js
   export default {
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Acerca de Nosotros</h1>
          <div class="max-w-3xl mx-auto">
            <p class="text-lg text-gray-700 mb-4">
              Construimos aplicaciones web modernas con Tailwind CSS y JavaScript vanilla.
              Nuestro enfoque está en accesibilidad, rendimiento y experiencia de usuario.
            </p>
            <p class="text-lg text-gray-700 mb-6">
              Esta SPA demuestra ruteo, diseño responsivo y mejora progresiva.
            </p>
            <a href="#/" class="text-blue-500 hover:text-blue-600 font-medium">← Volver al Inicio</a>
          </div>
        </div>
      </section>
    `,
   };
   ```

   ```javascript
   // src/views/projects.js
   export default {
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Nuestros Proyectos</h1>
          <div class="max-w-3xl mx-auto">
            <p class="text-lg text-gray-700 mb-6">
              Próximamente: Una muestra de proyectos construidos con tecnologías web modernas.
            </p>
            <a href="#/" class="text-blue-500 hover:text-blue-600 font-medium">← Volver al Inicio</a>
          </div>
        </div>
      </section>
    `,
   };
   ```

   ```javascript
   // src/views/contact.js
   export default {
   	template: `
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Contacto</h1>
          <div class="max-w-3xl mx-auto">
            <p class="text-lg text-gray-700 mb-6">
              Ponte en contacto con nosotros a través de nuestros canales sociales.
            </p>
            <a href="#/" class="text-blue-500 hover:text-blue-600 font-medium">← Volver al Inicio</a>
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
            Ir al Inicio
          </a>
        </div>
      </section>
    `,
   };
   ```

   Ahora crea un archivo índice para recopilar todas las vistas:

   ```javascript
   // src/views/index.js
   import home from './home.js';
   import about from './about.js';
   import projects from './projects.js';
   import contact from './contact.js';
   import notFound from './404.js';

   export const views = {
   	'/': home,
   	'/about': about,
   	'/projects': projects,
   	'/contact': contact,
   	404: notFound,
   };
   ```

4. **Inicializar router en main.js:**

   ```javascript
   // src/main.js
   import SimpleRouter from './router.js';
   import { views } from './views/index.js';
   import './style.css';

   // Inicializar router
   const router = new SimpleRouter(views);

   // Opcional: Desplazamiento suave para anclas en la página (enlaces hash) SIN romper el ruteo SPA
   // Nosotros:
   // 1) Usamos delegación de eventos (un solo listener) para capturar clics en etiquetas anchor.
   // 2) Solo manejamos hashes que apuntan a secciones en la página (ej. #app, #footer).
   // 3) Ignoramos explícitamente enlaces del router que comienzan con "#/" para que el ruteo basado en hash continúe funcionando.
   document.addEventListener('click', (e) => {
   	const link = e.target.closest('a[href^="#"]');
   	if (!link) return; // No es un enlace hash
   	const href = link.getAttribute('href');

   	// Ignorar enlaces del router SPA como "#/about" — dejar que el router maneje la navegación
   	if (href.startsWith('#/')) return;

   	// Desplazamiento suave al objetivo en la página (ej. #app)
   	const target = document.querySelector(href);
   	if (target) {
   		e.preventDefault();
   		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
   	}
   });
   ```

5. **Añadir style.css para accesibilidad:**

   ```css
   /* src/style.css */
   /* 
   CSS personalizado solo para estilos de enfoque de enlace de salto (Tailwind no cubre esto bien).
   
   Si tienes Tailwind + PostCSS instalado (como en una configuración típica de Vite), TU ARCHIVO style.css
   debe comenzar así:
   
       @tailwind base;
       @tailwind components;
       @tailwind utilities;
   
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

6. **Probar la SPA:**

   - Navegar entre rutas usando enlaces de navegación
   - Verificar que el hash de la URL se actualice sin recarga de página
   - Probar navegación con teclado y estados de enfoque
   - Verificar layout responsivo en diferentes tamaños de pantalla

7. **Confirmar tu trabajo:**
   ```bash
   git add .
   git commit -m "feat: S2 - router hash SPA + layout compartido, navegación accesible"
   ```

## 🎯 Ejercicios de Práctica: Construyendo Rutas para Práctica de Diseño Web

Ahora que tienes un sistema de ruteo modular, ¡cada nuevo ejercicio de Tailwind puede tener su propia ruta! Este enfoque mantiene tu código organizado y te permite construir un portafolio de experimentos de diseño.

### Ejercicio 2.1: Crear una Ruta de Muestra de Tipografía

Crear una ruta para practicar tipografía y color:

```javascript
// src/views/typography.js
export default {
	template: `
    <section class="py-16 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div class="container mx-auto px-4 max-w-4xl">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Tipografía y Color</h1>
        <p class="text-xl text-gray-600 mb-8">Explorando la escala tipográfica y el sistema de color de Tailwind</p>
        
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Jerarquía de Encabezados</h2>
          <h3 class="text-2xl font-semibold text-gray-800 mb-2">Ejemplo de Subencabezado</h3>
          <h4 class="text-xl font-medium text-gray-700 mb-2">Título de Sección</h4>
          <p class="text-base text-gray-600 leading-relaxed mb-4">
            Este es texto de cuerpo que demuestra altura de línea y espaciado apropiados. 
            Nota cómo la tipografía predeterminada de Tailwind crea contenido legible y accesible.
          </p>
          <p class="text-sm text-gray-500">Texto pequeño para metadatos o pies de foto.</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-blue-500 text-white p-4 rounded text-center font-semibold">Azul</div>
          <div class="bg-green-500 text-white p-4 rounded text-center font-semibold">Verde</div>
          <div class="bg-purple-500 text-white p-4 rounded text-center font-semibold">Morado</div>
          <div class="bg-red-500 text-white p-4 rounded text-center font-semibold">Rojo</div>
        </div>
        
        <a href="#/" class="inline-block mt-8 text-blue-600 hover:text-blue-700 font-medium">← Volver al Inicio</a>
      </div>
    </section>
  `,
};
```

Luego regístrala:

```javascript
// src/views/index.js
import home from './home.js';
import about from './about.js';
import projects from './projects.js';
import contact from './contact.js';
import typography from './typography.js'; // Añadir esto
import notFound from './404.js';

export const views = {
	'/': home,
	'/about': about,
	'/projects': projects,
	'/contact': contact,
	'/typography': typography, // Añadir esto
	404: notFound,
};
```

Añadir a la navegación:

```html
<!-- index.html - Añadir a la lista nav -->
<li><a href="#/typography" class="hover:text-blue-400 transition-colors">Tipografía</a></li>
```

### Ejercicio 2.2: Crear una Ruta de Playground de Componentes

Esta ruta será tu campo de pruebas para componentes reutilizables:

```javascript
// src/views/components.js
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

        <!-- Cuadrícula de tarjetas -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Tarjetas</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div class="h-32 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div class="p-4">
                <h3 class="font-bold text-gray-900 mb-2">Título de Tarjeta</h3>
                <p class="text-gray-600 text-sm">Descripción de la tarjeta va aquí.</p>
              </div>
            </article>
            
            <article class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div class="h-32 bg-gradient-to-r from-green-400 to-teal-500"></div>
              <div class="p-4">
                <h3 class="font-bold text-gray-900 mb-2">Título de Tarjeta</h3>
                <p class="text-gray-600 text-sm">Descripción de la tarjeta va aquí.</p>
              </div>
            </article>
            
            <article class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div class="h-32 bg-gradient-to-r from-pink-400 to-red-500"></div>
              <div class="p-4">
                <h3 class="font-bold text-gray-900 mb-2">Título de Tarjeta</h3>
                <p class="text-gray-600 text-sm">Descripción de la tarjeta va aquí.</p>
              </div>
            </article>
          </div>
        </div>
        
        <a href="#/" class="inline-block text-blue-600 hover:text-blue-700 font-medium">← Volver al Inicio</a>
      </div>
    </section>
  `,
};
```

**Confirmar tu trabajo de práctica:**

```bash
git add .
git commit -m "feat: Añadir rutas de práctica de tipografía y componentes"
```

### 🎨 Por Qué Este Enfoque Funciona

- **Experimentación aislada:** Cada concepto de diseño tiene su propia ruta
- **Construcción de portafolio:** Tu SPA se convierte en una muestra de tu trabajo
- **Complejidad progresiva:** Empieza simple, añade características incrementalmente
- **Práctica real de ruteo:** Estás aprendiendo organización de código profesional
- **Listo para el futuro:** En S3, refactorizaremos estos en componentes reutilizables

### 💡 Ejercicio de Desafío

Crea tu propia ruta para práctica de layout responsivo:

1. Crea `src/views/layouts.js`
2. Construye una página mostrando diferentes patrones de grid y flexbox
3. Añádela a `src/views/index.js` y navegación
4. Prueba comportamiento responsivo en diferentes tamaños de pantalla

## 🎓 Explicaciones Pedagógicas

### Compensaciones de Arquitectura SPA

**Beneficios del Renderizado del Lado del Cliente (CSR):**

- **UX fluido:** Sin recargas de página, sensación de aplicación
- **Navegación rápida:** El contenido se actualiza instantáneamente
- **Potencial offline:** Puede funcionar con service workers

**Desafíos del CSR:**

- **Limitaciones de SEO:** Contenido no rastreable sin SSR/hidratación
- **Carga inicial:** Bundle más grande, primer pintado más lento
- **Dependencia de JS:** Se rompe sin JavaScript habilitado
- **Estado de navegación:** Atrás/adelante del navegador necesita manejo cuidadoso

**El ruteo hash** proporciona un punto de entrada simple que puede evolucionar a patrones más sofisticados como la API History o ruteo basado en frameworks.

### Accesibilidad en Navegación SPA

Las SPAs deben mantener **estándares de accesibilidad web** mientras proporcionan experiencias dinámicas:

- **Landmarks semánticos:** `<nav>`, `<main>`, `<footer>` para lectores de pantalla
- **Enlaces de salto:** Permiten a usuarios de teclado saltar al contenido
- **Gestión de enfoque:** Asegurar que el enfoque se mueva apropiadamente durante cambios de ruta
- **Etiquetas ARIA:** Proporcionar contexto para contenido dinámico
- **Mejora progresiva:** Funcionalidad básica funciona sin JS

## Preguntas Críticas del Atelier

Siguiendo nuestra **metodología de atelier**, reflexiona sobre estas preguntas:

### Exploración

- ¿Qué mejoras de experiencia de usuario provienen de evitar recargas completas de página?
- ¿Cómo afecta la simplicidad del router a la velocidad de desarrollo?

### Reflexión

- ¿Qué compensaciones de accesibilidad introduce el renderizado del lado del cliente?
- ¿Cómo afecta el ruteo basado en hash al rendimiento percibido?

### Conceptualización

- ¿Cómo dan forma los patrones de ruteo a la narrativa y la arquitectura de información?
- ¿De qué maneras la navegación SPA encarna el "diseño de interacción"?

### Producción

- ¿Es tu código de router pequeño, claro y bien documentado para mantenibilidad?
- ¿Cómo podría escalar este enfoque de ruteo para aplicaciones más grandes?

### Exhibición

- ¿Cómo demostrarás los cambios de ruta y manejo de enfoque en una demo en vivo?
- ¿Qué enfoques alternativos de ruteo (API History, frameworks) podrían lograr resultados similares?

## 🏗️ Scaffold Mínimo del Repositorio

Aquí hay un punto de partida completo para tu router SPA con vistas modulares:

```
spa-portfolio/
├── index.html
├── src/
│   ├── main.js
│   ├── router.js
│   ├── style.css
│   └── views/
│       ├── index.js
│       ├── home.js
│       ├── about.js
│       ├── projects.js
│       ├── contact.js
│       └── 404.js
└── package.json
```

**¿Por qué archivos de vista separados?**

- **Mantenibilidad:** Cada vista es autocontenida y fácil de localizar
- **Escalabilidad:** Añadir nuevas rutas no infla un solo archivo
- **Colaboración en equipo:** Múltiples desarrolladores pueden trabajar en diferentes vistas simultáneamente
- **Pedagogía:** Enseña organización de código apropiada desde el inicio

**src/router.js:**

```javascript
// Implementación de router basado en hash
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
        <h1 class="text-5xl font-bold text-gray-900 mb-6">Bienvenido</h1>
        <p class="text-xl text-gray-600 mb-8">¡Navega usando el menú arriba!</p>
      </div>
    </section>
  `,
};
```

**src/views/about.js:**

```javascript
export default {
	template: `
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-3xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-6">Acerca de Esta SPA</h1>
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
        <a href="#/" class="text-blue-500 hover:text-blue-600">Ir al Inicio</a>
      </div>
    </section>
  `,
};
```

**src/views/index.js:**

```javascript
import home from './home.js';
import about from './about.js';
import notFound from './404.js';

export const views = {
	'/': home,
	'/about': about,
	404: notFound,
};
```

## Referencias

- [MDN - Renderizado del lado del cliente (CSR)](https://developer.mozilla.org/es/docs/Glossary/CSR)
- [CleanCommit - Comparación SPA vs MPA](https://cleancommit.io/blog/spa-vs-mpa-which-is-the-king/)
- [StackOverflow - Ruteo SPA con Vanilla JS](https://stackoverflow.com/questions/54231533/how-to-create-a-vanilla-js-routing-for-spa)

---

> **Siguiente:** [S2b - Ruteo SPA con HTML `<template>` →]({{ '/lessons/es/tailwind/routing-and-shared-layout/html-template/' | relative_url }})
