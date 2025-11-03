---
layout: lesson
title: 'Tailwind CSS: Estado e Interactividad — Modificadores que dan vida'
title_alt: 'Tailwind CSS: State & Interactivity — Bringing Interfaces to Life'
slug: state-interactivity
date: 2025-11-03
updated: 2025-11-03
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/tailwind/state-interactivity/
description: 'Atelier de interactividad con Tailwind: hover, focus, active, disabled, group, peer, aria y dark mode. Prototipado rápido aplicado a tu portafolio.'
tags: [tailwindcss, interactividad, estados, modifiers, pedagogía]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Estado e Interactividad — Modificadores que dan vida

## Enfoque de Atelier: prototipar primero, refinar después

- Prioriza **prototipado rápido**: copia patrones funcionales y adapta tokens.
- Enseñamos interactividad sin framework, evitando complejidad innecesaria.
- Aplica inmediatamente en tu portafolio `[portafolio-tailwind](https://github.com/ruvebal/portafolio-tailwind)` enriqueciendo `views/*`.

## Demo Interactivo

> **[Abrir Demo →](demo/)**

Las secciones incluyen ejemplos incrustados vía iframe. Interactúa, inspecciona y replica.

---

## 1) Estados esenciales: hover, focus, active, disabled

- **hover:** respuesta visual al pasar el cursor.
- **focus / focus-visible:** accesible por teclado; usa `focus-visible:` para no mostrar anillos con mouse.
- **active:** feedback inmediato durante el click.
- **disabled:** comunica estados de espera o bloqueo temporal.

<iframe src="demo/buttons-states.html" title="Botones: estados" style="width: 100%; height: 420px; border: 1px solid #e5e7eb; border-radius: 0.5rem;" loading="lazy"></iframe>

---

## 2) Formularios que guían: focus-visible y focus-within

- `focus-visible:` muestra anillos solo con teclado (mejor UX).
- `focus-within:` resalta el contenedor cuando cualquier hijo tiene foco.

<iframe src="demo/forms-focus.html" title="Formularios y foco" style="width: 100%; height: 420px; border: 1px solid #e5e7eb; border-radius: 0.5rem;" loading="lazy"></iframe>

---

## 3) Padre ↔ Hijo: group y peer

- `group-hover:` activa overlays o acciones dentro de tarjetas.
- `peer-checked:` muestra/oculta contenido en función de un input vecino.

<iframe src="demo/group-peer.html" title="group y peer" style="width: 100%; height: 520px; border: 1px solid #e5e7eb; border-radius: 0.5rem;" loading="lazy"></iframe>

---

## 4) Apilar modifiers: responsive, dark, aria-_, data-_

- Combina variantes: `dark:md:hover:` para cambios contextuales.
- Usa `aria-[expanded]` y `data-[state]` para estados UI semánticos.

<iframe src="demo/stacked-modifiers.html" title="Modifiers apilados" style="width: 100%; height: 520px; border: 1px solid #e5e7eb; border-radius: 0.5rem;" loading="lazy"></iframe>

---

## 🛠️ Aplicado a tu portafolio (`views/*`)

Trabaja en tu repositorio `[portafolio-tailwind](https://github.com/ruvebal/portafolio-tailwind)`:

1. **Navegación**

- En `views/*`, añade `hover:underline` y `focus-visible:ring-2 focus-visible:ring-primary-500` a los enlaces.
- Marca el enlace activo con `aria-current="page"` y estilízalo con `[aria-current="page"]:text-primary-600`.

2. **Tarjetas de proyectos**

- Envuelve cada tarjeta en `.group` y muestra overlay con `group-hover:opacity-100`.
- Añade `active:scale-95` a botones dentro de la tarjeta para feedback inmediato.

3. **Formularios**

- Usa `focus-within:` en contenedores de campos.
- Deshabilita el botón de envío durante operaciones asíncronas (`disabled:*` + `pointer-events-none`).

4. **Accesibilidad**

- Asegura `:focus-visible` claro en todos los controles interactivos.
- Tunea `aria-[expanded]` para menús/accordions y reacciona visualmente.

### Lista de verificación

- [ ] Links con `hover:` y `focus-visible:` consistentes
- [ ] Overlays de tarjeta con `group-hover:`
- [ ] Botones con `active:` y estados `disabled:` durante carga
- [ ] Formularios con `focus-within:`
- [ ] Accordions/menús con `aria-[expanded]` estilizado

---

## Referencias

- Tailwind — Handling Hover, Focus, and Other States: `[v3.tailwindcss.com/docs/hover-focus-and-other-states](https://v3.tailwindcss.com/docs/hover-focus-and-other-states)`

---

> **Siguiente:** [Componentes y Sistema de Diseño →]({{ '/lessons/es/tailwind/components-design-system/' | relative_url }})

---

layout: lesson
title: 'Tailwind CSS: Estado e Interactividad — Construyendo Experiencias de Usuario Dinámicas'
title_alt: 'Tailwind CSS: State & Interactivity — Building Dynamic User Experiences'
slug: tailwind-state-interactivity
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/tailwind/state-interactivity/
description: 'Guía completa para implementar gestión de estado y características interactivas con Tailwind CSS, incluyendo formularios, validación y accesibilidad.'
tags: [tailwindcss, interactividad, estado, formularios, accesibilidad, pedagogía]

---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Tailwind CSS: Estado e Interactividad — Construyendo Experiencias de Usuario Dinámicas

> **Divulgación de asistencia IA:** Esta lección se basa en experiencia docente desde septiembre 2024, con iteraciones de IA siguiendo ciclos investigación–práctica–investigación.

## 🎭 Enfoque de Codificación Crítica

Esta lección sigue la **metodología del atelier** (exploración → reflexión → conceptualización → producción → exhibición). Construimos no para automatizar, sino para **articular** — dar forma al pensamiento mediante ritmo, reflexión y resistencia.

- **Exploración:** Creación de estados interactivos y sistemas de feedback de usuario.
- **Reflexión:** Comprensión de cómo la interactividad moldea la experiencia de usuario.
- **Conceptualización:** Conexión de gestión de estado con ética del diseño y accesibilidad.
- **Producción:** Construcción de componentes interactivos performantes y accesibles.
- **Exhibición:** Demostración de interacciones de usuario fluidas y responsivas.

## Requisitos

<div class="prerequisites">
  <h3>📚 Antes de comenzar</h3>
  <ul>
    <li><strong>S1–S3 completadas:</strong> Configuración Vite + Tailwind, ruteo SPA y sistema de componentes</li>
    <li><strong>Fundamentos JavaScript:</strong> Eventos DOM, manejo de formularios, gestión básica de estado</li>
    <li><strong>Utilidades Tailwind:</strong> Experiencia con variantes hover, focus y estado</li>
    <li><strong>Bases de accesibilidad:</strong> Comprensión de ARIA y navegación por teclado</li>
  </ul>
</div>

## 🚀 Interactividad: Más allá de Interfaces Estáticas

El **estado interactivo** transforma diseños estáticos en sistemas vivos que responden a acciones de usuario. En Tailwind, expresamos interactividad mediante:

- **Variantes de estado:** `hover:`, `focus:`, `active:`, `disabled:`
- **Estados de formulario:** `valid:`, `invalid:`, `checked:`, `required:`
- **Utilidades de animación:** `transition-`, `duration-`, `ease-`
- **Integración JavaScript:** Manejo de eventos y manipulación DOM

Nuestro enfoque crea **interactividad PWA-ready** con mejora progresiva y diseño accessibility-first.

## S4 — Estado e Interactividad (Formularios, Navegación, Feedback)

Esta sesión añade comportamiento dinámico a componentes, enfocándose en formularios, estados de navegación y sistemas de feedback de usuario.

### 🔗 Construyendo sobre el Sistema de Ruteo S2-S3

En S2, creaste un sistema de ruteo modular, y en S3, lo mejoraste con un sistema de diseño. Ahora añadiremos **rutas interactivas** que demuestran gestión de estado y validación de formularios. Ya deberías tener:

- Estructura modular de vistas en `src/views/`
- Router manejando navegación por hash
- Tokens de diseño para estilizado consistente
- Patrones de componentes de S3

**Esta sesión se enfoca en añadir interactividad** a tus rutas existentes y crear nuevas demostraciones interactivas.

### Implementación paso a paso

1. **Crea formulario de contacto accesible:**

   ```html
   <!-- Formulario de contacto con etiquetado y validación apropiados -->
   <form class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md" novalidate>
   	<div class="mb-6">
   		<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
   			Nombre Completo
   			<span class="text-red-500" aria-label="requerido">*</span>
   		</label>
   		<input
   			type="text"
   			id="name"
   			name="name"
   			required
   			class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent invalid:border-red-500 invalid:ring-red-500"
   			aria-describedby="name-error" />
   		<div id="name-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
   	</div>

   	<div class="mb-6">
   		<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
   			Dirección de Email
   			<span class="text-red-500" aria-label="requerido">*</span>
   		</label>
   		<input
   			type="email"
   			id="email"
   			name="email"
   			required
   			class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent invalid:border-red-500 invalid:ring-red-500"
   			aria-describedby="email-error" />
   		<div id="email-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
   	</div>

   	<div class="mb-6">
   		<label for="message" class="block text-sm font-medium text-gray-700 mb-2">
   			Mensaje
   			<span class="text-red-500" aria-label="requerido">*</span>
   		</label>
   		<textarea
   			id="message"
   			name="message"
   			rows="4"
   			required
   			class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent invalid:border-red-500 invalid:ring-red-500 resize-none"
   			aria-describedby="message-error"></textarea>
   		<div id="message-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
   	</div>

   	<button
   		type="submit"
   		class="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
   		Enviar Mensaje
   	</button>
   </form>
   ```

2. **Implementa validación de formulario con JavaScript:**

   ```javascript
   // src/form-validation.js
   class FormValidator {
   	constructor(form) {
   		this.form = form;
   		this.fields = form.querySelectorAll('input, textarea, select');
   		this.errors = new Map();

   		this.init();
   	}

   	init() {
   		// Validación en tiempo real al salir del campo
   		this.fields.forEach((field) => {
   			field.addEventListener('blur', () => this.validateField(field));
   			field.addEventListener('input', () => this.clearFieldError(field));
   		});

   		// Envío del formulario
   		this.form.addEventListener('submit', (e) => this.handleSubmit(e));
   	}

   	validateField(field) {
   		const value = field.value.trim();
   		const errorElement = document.getElementById(`${field.name}-error`);

   		// Limpiar error previo
   		this.clearFieldError(field);

   		// Reglas de validación
   		if (field.hasAttribute('required') && !value) {
   			this.showFieldError(field, 'Este campo es requerido');
   			return false;
   		}

   		if (field.type === 'email' && value) {
   			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   			if (!emailRegex.test(value)) {
   				this.showFieldError(field, 'Por favor ingresa una dirección de email válida');
   				return false;
   			}
   		}

   		return true;
   	}

   	showFieldError(field, message) {
   		const errorElement = document.getElementById(`${field.name}-error`);
   		if (errorElement) {
   			errorElement.textContent = message;
   			errorElement.classList.remove('hidden');
   			field.classList.add('invalid');
   			field.setAttribute('aria-invalid', 'true');
   			field.setAttribute('aria-describedby', `${field.name}-error`);
   		}
   	}

   	clearFieldError(field) {
   		const errorElement = document.getElementById(`${field.name}-error`);
   		if (errorElement) {
   			errorElement.classList.add('hidden');
   			field.classList.remove('invalid');
   			field.removeAttribute('aria-invalid');
   		}
   	}

   	handleSubmit(e) {
   		e.preventDefault();

   		let isValid = true;
   		this.fields.forEach((field) => {
   			if (!this.validateField(field)) {
   				isValid = false;
   			}
   		});

   		if (isValid) {
   			// Simular envío del formulario
   			const submitBtn = this.form.querySelector('button[type="submit"]');
   			const originalText = submitBtn.textContent;

   			submitBtn.textContent = 'Enviando...';
   			submitBtn.disabled = true;

   			setTimeout(() => {
   				alert('¡Mensaje enviado exitosamente!');
   				this.form.reset();
   				submitBtn.textContent = originalText;
   				submitBtn.disabled = false;
   			}, 1000);
   		}
   	}
   }

   export default FormValidator;
   ```

3. **Mejora navegación con estados activos:**

   ```html
   <!-- Navegación mejorada con estados activos -->
   <nav class="bg-gray-900 text-white" role="navigation" aria-label="Navegación principal">
   	<div class="container mx-auto px-4">
   		<div class="flex justify-between items-center py-4">
   			<a href="#/" class="text-xl font-bold hover:text-blue-400 transition-colors">Portafolio</a>
   			<div class="space-x-6">
   				<a href="#/" class="nav-link hover:text-blue-400 transition-colors" data-route="/">Inicio</a>
   				<a href="#/sobre" class="nav-link hover:text-blue-400 transition-colors" data-route="/sobre">Sobre</a>
   				<a href="#/proyectos" class="nav-link hover:text-blue-400 transition-colors" data-route="/proyectos">
   					Proyectos
   				</a>
   				<a href="#/contacto" class="nav-link hover:text-blue-400 transition-colors" data-route="/contacto">Contacto</a>
   			</div>
   		</div>
   	</div>
   </nav>
   ```

4. **Añade gestión de estado de navegación:**

   ```javascript
   // src/navigation.js
   class NavigationManager {
   	constructor() {
   		this.navLinks = document.querySelectorAll('.nav-link');
   		this.init();
   	}

   	init() {
   		// Actualizar estado activo al cambiar ruta
   		window.addEventListener('hashchange', () => this.updateActiveState());
   		window.addEventListener('load', () => this.updateActiveState());

   		// Añadir manejadores de clic para scroll suave
   		this.navLinks.forEach((link) => {
   			link.addEventListener('click', (e) => this.handleNavClick(e));
   		});
   	}

   	updateActiveState() {
   		const currentHash = window.location.hash.slice(1) || '/';

   		this.navLinks.forEach((link) => {
   			const route = link.getAttribute('data-route');

   			if (route === currentHash) {
   				link.classList.add('text-blue-400', 'font-semibold');
   				link.setAttribute('aria-current', 'page');
   			} else {
   				link.classList.remove('text-blue-400', 'font-semibold');
   				link.removeAttribute('aria-current');
   			}
   		});
   	}

   	handleNavClick(e) {
   		// Opcional: Añadir scroll suave para enlaces ancla
   		const href = e.target.getAttribute('href');
   		if (href && href.startsWith('#') && href.length > 1) {
   			e.preventDefault();
   			const target = document.querySelector(href);
   			if (target) {
   				target.scrollIntoView({
   					behavior: 'smooth',
   					block: 'start',
   				});
   			}
   		}
   	}
   }

   export default NavigationManager;
   ```

5. **Añade soporte para movimiento reducido:**

   ```css
   /* src/style.css - Añadir a estilos existentes */
   @media (prefers-reduced-motion: reduce) {
   	* {
   		animation-duration: 0.01ms !important;
   		animation-iteration-count: 1 !important;
   		transition-duration: 0.01ms !important;
   	}
   }
   ```

6. **Prueba características interactivas:**

   - Rellena formulario y prueba validación
   - Navega entre rutas y verifica estados activos
   - Prueba navegación por teclado y gestión de foco
   - Verifica que preferencias de movimiento reducido se respeten

7. **Haz commit de tus características interactivas:**
   ```bash
   git add .
   git commit -m "feat: S4 - Validación de formulario + navegación interactiva (estados accesibles)"
   ```

## 🎯 Ejercicios Prácticos: Construyendo Rutas Interactivas

Ahora creemos rutas dedicadas para practicar gestión de estado e interactividad, continuando nuestro enfoque de ruteo modular.

### Ejercicio 4.1: Crea Ruta de Muestra Interactiva

Construye una ruta demostrando varios estados interactivos:

```javascript
// src/views/interactivo.js
export default {
	template: `
    <section class="py-16 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 max-w-4xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">Muestra de Estados Interactivos</h1>
        
        <!-- Demo de Estados de Botones -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Estados de Botones</h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Estados Hover y Focus</h3>
              <button class="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-white font-medium py-2 px-4 rounded-md transition-colors">
                Pasa el Mouse y Haz Click
              </button>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Estado de Carga</h3>
              <button id="loading-btn" class="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                Click para Cargar
              </button>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Estado Deshabilitado</h3>
              <button disabled class="bg-gray-400 text-white font-medium py-2 px-4 rounded-md cursor-not-allowed opacity-50">
                Botón Deshabilitado
              </button>
            </div>
          </div>
        </div>

        <!-- Estados de Toggle y Checkbox -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Estados de Toggle y Selección</h2>
          
          <div class="space-y-4">
            <label class="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" class="w-5 h-5 text-primary-500 rounded focus:ring-2 focus:ring-primary-500" />
              <span class="text-gray-700">Habilitar notificaciones</span>
            </label>
            
            <label class="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" checked class="w-5 h-5 text-primary-500 rounded focus:ring-2 focus:ring-primary-500" />
              <span class="text-gray-700">Recibir actualizaciones</span>
            </label>
            
            <div class="flex items-center space-x-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="theme" value="light" class="w-4 h-4 text-primary-500 focus:ring-2 focus:ring-primary-500" checked />
                <span class="text-gray-700">Modo Claro</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="theme" value="dark" class="w-4 h-4 text-primary-500 focus:ring-2 focus:ring-primary-500" />
                <span class="text-gray-700">Modo Oscuro</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Estado Dropdown/Acordeón -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Estado de Acordeón</h2>
          
          <div class="space-y-2">
            <div class="border border-gray-200 rounded-lg">
              <button class="accordion-trigger w-full text-left px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg transition-colors">
                ¿Qué es Tailwind CSS?
              </button>
              <div class="accordion-content hidden px-4 pb-3 text-gray-600">
                Tailwind CSS es un framework CSS utility-first para construir interfaces de usuario personalizadas rápidamente.
              </div>
            </div>
            
            <div class="border border-gray-200 rounded-lg">
              <button class="accordion-trigger w-full text-left px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg transition-colors">
                ¿Cómo funciona la gestión de estado?
              </button>
              <div class="accordion-content hidden px-4 pb-3 text-gray-600">
                La gestión de estado rastrea la condición actual de elementos UI y los actualiza basándose en interacciones de usuario.
              </div>
            </div>
          </div>
        </div>

        <!-- Demo de Notificación Toast -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Estados de Notificación</h2>
          <button id="show-toast" class="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
            Mostrar Notificación
          </button>
          <div id="toast-container" class="fixed bottom-4 right-4 space-y-2 z-50"></div>
        </div>
        
        <a href="#/" class="inline-block text-primary-500 hover:text-primary-600 font-medium">← Volver a Inicio</a>
      </div>
    </section>
  `,
	script() {
		// Botón de carga
		const loadingBtn = document.getElementById('loading-btn');
		if (loadingBtn) {
			loadingBtn.addEventListener('click', () => {
				loadingBtn.textContent = 'Cargando...';
				loadingBtn.disabled = true;
				setTimeout(() => {
					loadingBtn.textContent = '¡Éxito!';
					loadingBtn.classList.add('bg-green-500');
					setTimeout(() => {
						loadingBtn.textContent = 'Click para Cargar';
						loadingBtn.disabled = false;
						loadingBtn.classList.remove('bg-green-500');
					}, 1500);
				}, 2000);
			});
		}

		// Funcionalidad de acordeón
		document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
			trigger.addEventListener('click', () => {
				const content = trigger.nextElementSibling;
				content.classList.toggle('hidden');
			});
		});

		// Notificación toast
		const showToastBtn = document.getElementById('show-toast');
		const toastContainer = document.getElementById('toast-container');
		if (showToastBtn && toastContainer) {
			showToastBtn.addEventListener('click', () => {
				const toast = document.createElement('div');
				toast.className =
					'bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg transform transition-transform duration-300';
				toast.textContent = '¡Acción completada exitosamente!';
				toastContainer.appendChild(toast);

				setTimeout(() => {
					toast.style.transform = 'translateX(400px)';
					setTimeout(() => toast.remove(), 300);
				}, 3000);
			});
		}
	},
};
```

### Ejercicio 4.2: Crea Ruta de Formulario de Contacto

Construye un formulario de contacto completo con validación:

```javascript
// src/views/formulario-contacto.js
export default {
	template: `
    <section class="py-16 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div class="container mx-auto px-4 max-w-2xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-4 text-center">Contáctanos</h1>
        <p class="text-lg text-gray-600 mb-8 text-center">Completa el formulario abajo y te responderemos pronto.</p>
        
        <form id="contact-form" class="bg-white rounded-lg shadow-lg p-8" novalidate>
          <!-- Campo Nombre -->
          <div class="mb-6">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="Juan Pérez"
              aria-describedby="name-error"
            />
            <div id="name-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
          </div>

          <!-- Campo Email -->
          <div class="mb-6">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Dirección de Email <span class="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="juan@ejemplo.com"
              aria-describedby="email-error"
            />
            <div id="email-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
          </div>

          <!-- Campo Asunto -->
          <div class="mb-6">
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
              Asunto <span class="text-red-500">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              aria-describedby="subject-error"
            >
              <option value="">Selecciona un asunto</option>
              <option value="general">Consulta General</option>
              <option value="support">Soporte Técnico</option>
              <option value="feedback">Retroalimentación</option>
              <option value="other">Otro</option>
            </select>
            <div id="subject-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
          </div>

          <!-- Campo Mensaje -->
          <div class="mb-6">
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              Mensaje <span class="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-colors"
              placeholder="Cuéntanos cómo podemos ayudarte..."
              aria-describedby="message-error"
            ></textarea>
            <div id="message-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
          </div>

          <!-- Checkbox de Privacidad -->
          <div class="mb-6">
            <label class="flex items-start space-x-3">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                required
                class="mt-1 w-4 h-4 text-primary-500 rounded focus:ring-2 focus:ring-primary-500"
                aria-describedby="privacy-error"
              />
              <span class="text-sm text-gray-700">
                Acepto la política de privacidad y términos de servicio <span class="text-red-500">*</span>
              </span>
            </label>
            <div id="privacy-error" class="mt-1 text-sm text-red-600 hidden" role="alert"></div>
          </div>

          <!-- Botón Enviar -->
          <button
            type="submit"
            class="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Enviar Mensaje
          </button>

          <!-- Mensaje de Éxito -->
          <div id="success-message" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700 hidden" role="status">
            ✓ ¡Mensaje enviado exitosamente! Te responderemos pronto.
          </div>
        </form>
        
        <a href="#/" class="inline-block mt-8 text-primary-500 hover:text-primary-600 font-medium">← Volver a Inicio</a>
      </div>
    </section>
  `,
	script() {
		const form = document.getElementById('contact-form');
		if (!form) return;

		const fields = form.querySelectorAll('input, textarea, select');
		const successMessage = document.getElementById('success-message');

		// Funciones de validación
		const validateField = (field) => {
			const value = field.value.trim();
			const errorElement = document.getElementById(`${field.name}-error`);

			// Limpiar error previo
			field.classList.remove('border-red-500');
			errorElement?.classList.add('hidden');
			field.removeAttribute('aria-invalid');

			// Validación de requerido
			if (field.hasAttribute('required') && !value) {
				showError(field, errorElement, 'Este campo es requerido');
				return false;
			}

			// Validación de email
			if (field.type === 'email' && value) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) {
					showError(field, errorElement, 'Por favor ingresa un email válido');
					return false;
				}
			}

			// Validación de checkbox
			if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
				showError(field, errorElement, 'Debes aceptar para continuar');
				return false;
			}

			return true;
		};

		const showError = (field, errorElement, message) => {
			field.classList.add('border-red-500');
			field.setAttribute('aria-invalid', 'true');
			if (errorElement) {
				errorElement.textContent = message;
				errorElement.classList.remove('hidden');
			}
		};

		// Validación en tiempo real
		fields.forEach((field) => {
			field.addEventListener('blur', () => validateField(field));
			field.addEventListener('input', () => {
				const errorElement = document.getElementById(`${field.name}-error`);
				field.classList.remove('border-red-500');
				errorElement?.classList.add('hidden');
			});
		});

		// Envío de formulario
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let isValid = true;
			fields.forEach((field) => {
				if (!validateField(field)) {
					isValid = false;
				}
			});

			if (isValid) {
				const submitBtn = form.querySelector('button[type="submit"]');
				submitBtn.textContent = 'Enviando...';
				submitBtn.disabled = true;

				// Simular llamada API
				setTimeout(() => {
					successMessage.classList.remove('hidden');
					form.reset();
					submitBtn.textContent = 'Enviar Mensaje';
					submitBtn.disabled = false;

					// Ocultar mensaje de éxito después de 5 segundos
					setTimeout(() => {
						successMessage.classList.add('hidden');
					}, 5000);
				}, 1500);
			} else {
				// Enfocar primer campo inválido
				const firstInvalid = form.querySelector('[aria-invalid="true"]');
				firstInvalid?.focus();
			}
		});
	},
};
```

### Ejercicio 4.3: Registra Nuevas Rutas

Añade tus nuevas rutas interactivas al router:

```javascript
// src/views/index.js
import home from './home.js';
import sobre from './sobre.js';
import proyectos from './proyectos.js';
import contacto from './contacto.js';
import tipografia from './tipografia.js';
import componentes from './componentes.js';
import tokensDiseno from './tokens-diseno.js';
import interactivo from './interactivo.js'; // Añade esto
import formularioContacto from './formulario-contacto.js'; // Añade esto
import notFound from './404.js';

export const views = {
	'/': home,
	'/sobre': sobre,
	'/proyectos': proyectos,
	'/contacto': contacto,
	'/tipografia': tipografia,
	'/componentes': componentes,
	'/tokens-diseno': tokensDiseno,
	'/interactivo': interactivo, // Añade esto
	'/formulario-contacto': formularioContacto, // Añade esto
	404: notFound,
};
```

Actualiza la navegación:

```html
<!-- index.html -->
<li><a href="#/interactivo" class="hover:text-blue-400 transition-colors">Interactivo</a></li>
<li><a href="#/formulario-contacto" class="hover:text-blue-400 transition-colors">Formulario</a></li>
```

**Haz commit de tus rutas interactivas:**

```bash
git add .
git commit -m "feat: S4 - Añadir rutas de muestra interactiva y formulario de contacto"
```

### 🎨 Por Qué Funciona Este Enfoque

- **Testing aislado:** Cada patrón interactivo en su propia demostración
- **Práctica del mundo real:** El formulario de contacto es un requerimiento común de clientes
- **Complejidad progresiva:** Desde estados simples de botones hasta validación compleja de formularios
- **Patrones reutilizables:** Copia patrones de interacción a otras rutas
- **Construcción de portafolio:** Demuestra habilidades de UX y accesibilidad

### 💡 Ejercicio Desafío

Crea una ruta `src/views/carrito.js` que implemente:

1. Agregar/eliminar items con gestión de estado
2. Cálculo de total en tiempo real
3. Botones de incremento/decremento de cantidad
4. Manejo de estado vacío

¡Esto demuestra patrones de interacción de e-commerce!

## 🎓 Explicaciones Pedagógicas

### Gestión de Estado en Diseño Interactivo

El **estado** representa la condición actual de elementos UI e interacciones de usuario. Una gestión efectiva de estado requiere:

**Feedback visual:**

- **Estados hover:** Vista previa de interacciones antes del compromiso
- **Estados focus:** Indicación clara de navegación por teclado
- **Estados de carga:** Comunicación del estado del sistema durante operaciones
- **Estados de error:** Guía hacia resolución para usuarios

**Consideraciones de accesibilidad:**

- **Regiones ARIA live:** Anunciar cambios de contenido dinámico
- **Validación de formulario:** Asociar errores con inputs usando `aria-describedby`
- **Navegación por teclado:** Asegurar que todos los elementos interactivos sean enfocables
- **Soporte para lectores de pantalla:** Proporcionar contexto para cambios de estado

### Mejora Progresiva vs. Degradación Elegante

La **mejora progresiva** construye funcionalidad core primero, luego añade mejoras:

1. **HTML semántico:** Funciona sin CSS o JavaScript
2. **Mejora CSS:** Mejoras visuales y comportamiento responsive
3. **Mejora JavaScript:** Características interactivas y contenido dinámico

La **degradación elegante** comienza con características completas y las remueve para navegadores antiguos.

## Preguntas Críticas del Atelier

Siguiendo nuestra **metodología del atelier**, reflexiona sobre estas preguntas:

### Exploración

- ¿Qué características interactivas mejoraron tasas de completitud de tareas en tus pruebas?
- ¿Cómo afectaron diferentes variantes de estado la comprensión de acciones disponibles por usuarios?

### Reflexión

- ¿Alguna animación o transición perjudicó a usuarios que prefieren movimiento reducido?
- ¿Cuáles mecanismos de feedback de estado fueron más intuitivos versus confusos?

### Conceptualización

- ¿Cómo moldean estados interactivos, feedback de usuario y affordances la UX general?
- ¿De qué maneras encarna la gestión de estado principios de "diseño responsive"?

### Producción

- ¿Es tu interactividad testeable y mejorada progresivamente para diferentes capacidades?
- ¿Qué tan mantenibles son tus patrones de gestión de estado para características futuras?

### Exhibición

- ¿Qué escenario de interacción específico demostrarás para evidenciar mejoras de usabilidad?
- ¿Cómo probarás características interactivas en diferentes dispositivos y tecnologías asistivas?

## Preguntas Críticas

### Preguntas de Reflexión

- ¿Cómo cambia el sistema de estado de Tailwind tu enfoque hacia el diseño interactivo?
- ¿Cuál es la relación entre feedback visual y cognición del usuario?
- ¿Cómo puede la codificación crítica moldear nuestra comprensión del diseño de interacción digital?
- ¿Cómo representa tu sistema interactivo tu filosofía como diseñador-desarrollador?

### Preguntas de Ética

- ¿Cuáles patrones de interacción se priorizan en tus decisiones de gestión de estado?
- ¿Cómo respetan tus animaciones y transiciones preferencias de accesibilidad de usuario?
- ¿Qué ocurre cuando la complejidad interactiva excluye ciertos grupos de usuario?

### Preguntas de Filosofía Técnica

- ¿Es la UI impulsada por estado más "declarativa" o "imperativa" que enfoques tradicionales?
- ¿Cómo se relaciona el estado de componente con paradigmas de programación como programación reactiva?
- ¿Qué significa "diseñar para interacción" en un sistema utility-first?

## 🏗️ Scaffold Mínimo de Repositorio

Aquí tienes un punto de partida completo para tus componentes interactivos:

```
interactivo-tailwind/
├── index.html
├── src/
│   ├── main.js
│   ├── form-validation.js
│   ├── navigation.js
│   └── style.css
└── tailwind.config.js
```

**src/form-validation.js:**

```javascript
// Validación de formulario con accesibilidad
class AccessibleFormValidator {
	constructor(form) {
		this.form = form;
		this.init();
	}

	init() {
		this.form.addEventListener('submit', (e) => this.handleSubmit(e));

		// Validación en tiempo real
		this.form.querySelectorAll('input, textarea').forEach((field) => {
			field.addEventListener('blur', () => this.validateField(field));
			field.addEventListener('input', () => this.clearError(field));
		});
	}

	validateField(field) {
		const value = field.value.trim();
		const errorId = `${field.name}-error`;
		const errorElement = document.getElementById(errorId);

		if (field.required && !value) {
			this.showError(field, errorId, 'Este campo es requerido');
			return false;
		}

		if (field.type === 'email' && value && !this.isValidEmail(value)) {
			this.showError(field, errorId, 'Por favor ingresa un email válido');
			return false;
		}

		return true;
	}

	showError(field, errorId, message) {
		field.classList.add('border-red-500');
		field.setAttribute('aria-invalid', 'true');
		field.setAttribute('aria-describedby', errorId);

		const errorElement = document.getElementById(errorId);
		if (errorElement) {
			errorElement.textContent = message;
			errorElement.classList.remove('hidden');
		}
	}

	clearError(field) {
		field.classList.remove('border-red-500');
		field.removeAttribute('aria-invalid');
	}

	isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	handleSubmit(e) {
		e.preventDefault();

		if (Array.from(this.form.querySelectorAll('input, textarea')).every((field) => this.validateField(field))) {
			// Simular envío
			console.log('Formulario enviado exitosamente');
		}
	}
}
```

## Referencias

- [MDN - Accesibilidad de formularios](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms/Basic_form_hints)
- [WebAIM - Validación de formularios](https://webaim.org/techniques/formvalidation/)
- [Tailwind - Variantes de estado](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [Regiones ARIA live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)

---

> **Siguiente:** [S5 - Accesibilidad y Rendimiento →]({{ '/lessons/es/tailwind/accessibility-performance/' | relative_url }})
