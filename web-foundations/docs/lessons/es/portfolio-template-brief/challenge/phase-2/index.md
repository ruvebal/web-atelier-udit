---
layout: methodology
title: 'Fase 2: Diseño Responsivo y Arquitectura de Scroll'
title_alt: 'Fase 2: Diseño Responsivo y Arquitectura de Scroll'
slug: portfolio-fase-2
date: 2025-11-27
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/portfolio-template-brief/challenge/phase-2/
description: 'Guía técnica para implementar diseños responsivos y efectos de scroll en tres niveles: vanilla CSS, Bootstrap+GSAP y Tailwind+Vite.'
tags: [fase-2, responsive, scroll, parallax, css, gsap, tailwind]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> **El Tao del Desarrollador:**
> _"El scroll revela lo que la paciencia oculta. No construyas para el viewport que ves, sino para el viaje que el usuario recorre."_
{: .tao-development-quote }

---

## Objetivos de la Fase 2

**Tiempo:** 2-3 horas | **Entregable:** Diseño completamente responsivo con efectos de scroll

| Tarea                       | Prioridad | Complejidad |
| --------------------------- | --------- | ----------- |
| Sistema de Tipografía Fluida| 🔴 Alta   | Media       |
| Secciones HTML Principales  | 🔴 Alta   | Baja        |
| Diseño Responsivo           | 🔴 Alta   | Media       |
| **Arquitectura de Scroll**  | 🟡 Media  | Alta        |
| Layouts Grid/Flexbox        | 🔴 Alta   | Media       |

---

## 🎬 Demos en Vivo

Estudia estos ejemplos funcionales antes de implementar. **Mira el código fuente, no solo la demo.**

| Nivel | Demo | Código | Stack |
|-------|------|--------|-------|
| **Nivel 1** | [Demo Vanilla CSS](./demos/grade-1/) | [Ver Código](./demos/grade-1/main.js) | HTML + CSS + IntersectionObserver |
| **Nivel 2** | [Demo Bootstrap + GSAP](./demos/grade-2/) | [Ver Código](./demos/grade-2/main.js) | Bootstrap 5 + GSAP ScrollTrigger |
| **Nivel 3** | [Demo Tailwind](./demos/grade-3/) | [Ver Código](./demos/grade-3/main.js) | Tailwind CSS + GSAP Modular |

> **El Tao del Desarrollador:**
> _"Copiar código enseña por un día. Entender código construye para toda la vida."_
{: .tao-development-quote }

---

## 1. Tipografía Fluida (Todos los Niveles)

Antes de los efectos de scroll, establece tu escala tipográfica. **Ninguna animación de scroll sobrevive a una mala tipografía.**

```css
:root {
	/* Escala tipográfica fluida — mín @ 320px, máx @ 1200px */
	--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
	--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
	--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
	--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
	--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
	--text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
	--text-3xl: clamp(2rem, 1.5rem + 2.5vw, 3rem);
	--text-4xl: clamp(2.5rem, 1.75rem + 3.75vw, 4rem);

	/* Escala de espaciado fluido */
	--space-xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
	--space-sm: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);
	--space-md: clamp(1rem, 0.8rem + 1vw, 1.5rem);
	--space-lg: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
	--space-xl: clamp(2rem, 1.5rem + 2.5vw, 4rem);
	--space-2xl: clamp(3rem, 2rem + 5vw, 6rem);
}
```

> **Referencia:** [Lección de Tipografía y Color]({{ base_url }}/lessons/es/tipografia-color/)

---

## 2. Arquitectura de Scroll: Los Tres Caminos

> **El Tao del Desarrollador:**
> _"Tres caminos llevan a la misma montaña. El desarrollador sabio elige el camino que coincide con sus herramientas, no con su ego."_
{: .tao-development-quote }

### Comprendiendo las Técnicas de Scroll

| Técnica                    | Soporte Navegador | Rendimiento | Complejidad | Ideal Para        |
| -------------------------- | ----------------- | ----------- | ----------- | ----------------- |
| CSS `scroll-timeline`      | 🟡 ~75%           | ⚡ Excelente | Baja        | Nivel 1 (Vanilla) |
| Intersection Observer      | 🟢 ~97%           | ⚡ Excelente | Media       | Todos los niveles |
| GSAP ScrollTrigger         | 🟢 ~99%           | ⚡ Muy Bueno | Media       | Nivel 2 y 3       |
| Event listener `scroll`    | 🟢 100%           | 🔴 Malo     | Baja        | **Evitar**        |

**Regla Crítica:** Nunca uses `addEventListener('scroll', ...)` para animaciones. Se dispara en cada píxel y destruye el rendimiento.

---

## 🎯 Nivel 1: Scroll con Vanilla CSS

### 2.1 Animaciones CSS Basadas en Scroll (Moderno)

El enfoque **solo CSS** usando `animation-timeline: scroll()`. Sin JavaScript necesario.

```css
/* Base: el elemento comienza invisible y desplazado */
.reveal-on-scroll {
	opacity: 0;
	transform: translateY(30px);
	animation: revealUp linear both;
	animation-timeline: view();
	animation-range: entry 0% entry 100%;
}

@keyframes revealUp {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Fondo hero con parallax */
.hero {
	background-image: url('hero-bg.jpg');
	background-size: cover;
	background-attachment: fixed; /* Parallax simple como fallback */
}

/* Parallax moderno con scroll-timeline */
.parallax-layer {
	animation: parallaxShift linear both;
	animation-timeline: scroll(root);
}

@keyframes parallaxShift {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(-20%);
	}
}
```

**⚠️ Nota de Compatibilidad:** `scroll-timeline` funciona en Chrome 115+, Edge 115+, Firefox 110+ (con flag). Proporciona fallbacks.

### 2.2 Intersection Observer (Fallback Universal)

Para navegadores sin `scroll-timeline`, usa este patrón de **revelado único**:

```javascript
// js/scroll-reveal.js
const observerOptions = {
	root: null, // viewport
	rootMargin: '0px 0px -10% 0px', // disparar ligeramente antes de ser completamente visible
	threshold: 0.1,
};

const revealOnScroll = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('revealed');
			observer.unobserve(entry.target); // Disparar solo una vez
		}
	});
};

const observer = new IntersectionObserver(revealOnScroll, observerOptions);

document.querySelectorAll('[data-reveal]').forEach((el) => {
	observer.observe(el);
});
```

```css
/* Combinar con CSS */
[data-reveal] {
	opacity: 0;
	transform: translateY(20px);
	transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

[data-reveal].revealed {
	opacity: 1;
	transform: translateY(0);
}

/* Hijos escalonados */
[data-reveal-stagger] > * {
	opacity: 0;
	transform: translateY(20px);
	transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

[data-reveal-stagger].revealed > *:nth-child(1) { transition-delay: 0.1s; }
[data-reveal-stagger].revealed > *:nth-child(2) { transition-delay: 0.2s; }
[data-reveal-stagger].revealed > *:nth-child(3) { transition-delay: 0.3s; }
[data-reveal-stagger].revealed > *:nth-child(4) { transition-delay: 0.4s; }

[data-reveal-stagger].revealed > * {
	opacity: 1;
	transform: translateY(0);
}
```

```html
<!-- Uso -->
<section data-reveal>
	<h2>Sobre Mí</h2>
	<p>El contenido se revela al hacer scroll...</p>
</section>

<div class="projects-grid" data-reveal-stagger>
	<article>Proyecto 1</article>
	<article>Proyecto 2</article>
	<article>Proyecto 3</article>
</div>
```

> **Referencia:** [Lección de Animaciones CSS]({{ base_url }}/lessons/es/web-animations/css/)

---

## 🎯 Nivel 2: Bootstrap + GSAP

> **El Tao del Desarrollador:**
> _"El poder sin mesura es caos. GSAP te da la espada; la sabiduría te dice cuándo envainarla."_
{: .tao-development-quote }

### 2.3 Configuración de GSAP ScrollTrigger

```html
<!-- Cargar via CDN (después de Bootstrap) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js"></script>
```

### 2.4 Patrones Básicos de ScrollTrigger

```javascript
// js/animations.js
gsap.registerPlugin(ScrollTrigger);

// Patrón 1: Revelado simple
gsap.utils.toArray('.reveal').forEach((el) => {
	gsap.from(el, {
		y: 50,
		opacity: 0,
		duration: 0.8,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: el,
			start: 'top 85%', // cuando la parte superior del elemento llega al 85% del viewport
			toggleActions: 'play none none none', // reproducir una vez
		},
	});
});

// Patrón 2: Fondo con parallax
gsap.to('.hero-bg', {
	yPercent: -30,
	ease: 'none',
	scrollTrigger: {
		trigger: '.hero',
		start: 'top top',
		end: 'bottom top',
		scrub: true, // vincula la animación a la posición del scroll
	},
});

// Patrón 3: Sección fijada con progreso
gsap.to('.progress-bar', {
	scaleX: 1,
	ease: 'none',
	scrollTrigger: {
		trigger: '.content-section',
		start: 'top top',
		end: 'bottom bottom',
		scrub: 0.3,
	},
});
```

### 2.5 Revelado de Grid Escalonado

```javascript
// Grid de proyectos con escalonado
ScrollTrigger.batch('.project-card', {
	onEnter: (batch) =>
		gsap.from(batch, {
			y: 40,
			opacity: 0,
			duration: 0.6,
			stagger: 0.15,
			ease: 'power2.out',
		}),
	start: 'top 90%',
	once: true,
});
```

### 2.6 Integración Bootstrap + GSAP

```html
<!-- Contenedor Bootstrap con animaciones GSAP -->
<section class="py-5">
	<div class="container">
		<div class="row g-4">
			<div class="col-md-6 col-lg-4 project-card">
				<div class="card h-100 shadow-sm">
					<img src="..." class="card-img-top" alt="Proyecto" />
					<div class="card-body">
						<h5 class="card-title">Nombre del Proyecto</h5>
						<p class="card-text">Descripción...</p>
					</div>
				</div>
			</div>
			<!-- Más tarjetas... -->
		</div>
	</div>
</section>
```

> **Referencia:** [Lección de Animaciones GSAP]({{ base_url }}/lessons/es/web-animations/gsap/)

---

## 🎯 Nivel 3: Tailwind + Vite

### 2.7 GSAP Modular con Vite

```bash
npm install gsap
```

```javascript
// src/js/animations/scroll.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
	// Revelado por lotes para mejor rendimiento
	ScrollTrigger.batch('[data-animate="fade-up"]', {
		onEnter: (elements) =>
			gsap.from(elements, {
				y: 30,
				opacity: 0,
				duration: 0.6,
				stagger: 0.1,
				ease: 'power2.out',
			}),
		start: 'top 90%',
		once: true,
	});

	// Capas con parallax
	gsap.utils.toArray('[data-parallax]').forEach((el) => {
		const speed = el.dataset.parallax || 0.2;
		gsap.to(el, {
			yPercent: -100 * speed,
			ease: 'none',
			scrollTrigger: {
				trigger: el.parentElement,
				start: 'top bottom',
				end: 'bottom top',
				scrub: true,
			},
		});
	});
}

export function initSmoothScroll() {
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', (e) => {
			e.preventDefault();
			const target = document.querySelector(anchor.getAttribute('href'));
			if (target) {
				gsap.to(window, {
					duration: 0.8,
					scrollTo: { y: target, offsetY: 80 },
					ease: 'power2.inOut',
				});
			}
		});
	});
}
```

```javascript
// src/main.js
import './style.css';
import { initScrollAnimations, initSmoothScroll } from './js/animations/scroll.js';

document.addEventListener('DOMContentLoaded', () => {
	initScrollAnimations();
	initSmoothScroll();
});
```

### 2.8 Tailwind + Clases de Animación Scroll

```html
<!-- Markup Tailwind con atributos de datos para animación -->
<section class="min-h-screen flex items-center relative overflow-hidden">
	<!-- Fondo con parallax -->
	<div
		class="absolute inset-0 bg-cover bg-center"
		style="background-image: url('hero.jpg')"
		data-parallax="0.3"></div>

	<!-- Contenido -->
	<div class="container mx-auto px-4 relative z-10">
		<h1 class="text-4xl md:text-6xl font-bold" data-animate="fade-up">
			Tu Nombre
		</h1>
		<p class="mt-4 text-xl text-gray-600" data-animate="fade-up">
			Desarrollador Web & Diseñador
		</p>
	</div>
</section>

<!-- Grid de proyectos -->
<section class="py-20">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<article
				class="bg-white rounded-lg shadow-lg overflow-hidden"
				data-animate="fade-up">
				<!-- Contenido de tarjeta -->
			</article>
		</div>
	</div>
</section>
```

> **Referencia:** [Componentes Tailwind y Sistema de Diseño]({{ base_url }}/lessons/es/tailwind/components-design-system/)

---

## 3. Patrones de Scroll: Qué Construir

> **El Tao del Desarrollador:**
> _"El maestro no pregunta '¿Qué puedo animar?' sino '¿Qué merece movimiento?' La quietud también tiene valor."_
{: .tao-development-quote }

### Efectos de Scroll Recomendados por Sección

| Sección      | Técnica                 | Propósito                         |
| ------------ | ----------------------- | --------------------------------- |
| **Hero**     | Fondo con parallax      | Profundidad, interés visual       |
| **Sobre Mí**| Fade-up al entrar       | Enfocar atención                  |
| **Skills**   | Barras con relleno      | Mostrar progresión                |
| **Proyectos**| Revelado grid escalonado| Descubrimiento guiado             |
| **Contacto** | Fade simple             | CTA calmado y claro               |
| **Footer**   | Ninguno                 | Estabilidad, confianza            |

### Anti-Patrones a Evitar

❌ **No hagas:**
- Animar todo (ruido visual)
- Usar event listeners de `scroll` (mata el rendimiento)
- Crear scroll-jacking (secuestrar el scroll natural)
- Añadir parallax al texto (pesadilla de legibilidad)
- Olvidar `prefers-reduced-motion`

✅ **Sí haz:**
- Animar máximo 30-40% de los elementos
- Usar `IntersectionObserver` o `ScrollTrigger`
- Mejorar el scroll, no reemplazarlo
- Aplicar parallax solo a fondos decorativos
- Siempre proporcionar fallback para movimiento reducido

---

## 4. Accesibilidad: Lo No Negociable

```css
/* REQUERIDO: Respetar las preferencias del usuario */
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}
}
```

```javascript
// GSAP: Verificar antes de inicializar
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
	initScrollAnimations();
}
```

> **El Tao del Desarrollador:**
> _"La accesibilidad no es una característica. Es respeto hecho manifiesto en código."_
{: .tao-development-quote }

---

## 5. Lista de Verificación de Rendimiento

Antes de pasar a la Fase 3, verifica:

- [ ] **Sin layout thrashing** — Usa solo `transform` y `opacity`
- [ ] **Scroll a 60fps** — Revisa la pestaña Performance en DevTools
- [ ] **Movimiento reducido funciona** — Prueba con la configuración del sistema activada
- [ ] **Sin jank de scroll en móvil** — Prueba en dispositivos reales
- [ ] **Parallax es sutil** — Máximo 20-30% de desplazamiento, nunca en texto
- [ ] **Observers limpiados** — Desconectar cuando termine (enrutamiento SPA)

---

## 6. Referencia Rápida: Patrones Copiar-Pegar

### Configuración Minimal Vanilla (Nivel 1)

```html
<script>
	// Inline por simplicidad — mover a archivo externo en producción
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add('visible');
					observer.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.1 }
	);
	document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
</script>

<style>
	.animate-on-scroll {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.5s, transform 0.5s;
	}
	.animate-on-scroll.visible {
		opacity: 1;
		transform: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.animate-on-scroll {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
```

### Configuración Minimal GSAP (Nivel 2 y 3)

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js"></script>
<script>
	gsap.registerPlugin(ScrollTrigger);

	if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		gsap.utils.toArray('.gsap-reveal').forEach((el) => {
			gsap.from(el, {
				y: 40,
				opacity: 0,
				duration: 0.7,
				scrollTrigger: { trigger: el, start: 'top 85%', once: true },
			});
		});
	}
</script>
```

---

## 7. Recursos Externos

### Documentación
- [MDN: Animaciones Basadas en Scroll](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)
- [Documentación GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [API Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

### Herramientas
- [Depurador de Animaciones Scroll](https://scroll-driven-animations.style/) — Visualiza CSS scroll timelines
- [Hoja de Referencia GSAP](https://gsap.com/cheatsheet/) — Referencia rápida

### Inspiración (Estudiar, No Copiar)
- [Awwwards: Animaciones Scroll](https://www.awwwards.com/websites/scroll-animation/)
- [Codrops: Demos ScrollTrigger](https://tympanus.net/codrops/?s=scrolltrigger)

---

## 8. Referencias a Lecciones Internas

- [Diseño Responsivo (Canónica)]({{ base_url }}/lessons/es/responsive/) — Fluido, elástico, intrínseco
- [Animaciones CSS]({{ base_url }}/lessons/es/web-animations/css/) — Transiciones, keyframes, scroll-driven
- [Animaciones GSAP]({{ base_url }}/lessons/es/web-animations/gsap/) — Animaciones timeline y ScrollTrigger
- [Tipografía y Color]({{ base_url }}/lessons/es/tipografia-color/) — Tipografía fluida, sistemas de color
- [Módulos JavaScript]({{ base_url }}/lessons/es/js-modules/) — Organizar código de animación modularmente

---

## Palabras Finales

> **El Tao del Desarrollador:**
> _"El scroll es una conversación entre usuario e interfaz. Habla claro. Escucha su ritmo. Nunca grites."_
{: .tao-development-quote }

Tu entregable de la Fase 2: Un **diseño completamente responsivo** donde el scroll revela contenido con propósito y mesura. El usuario debe sentirse guiado, no asaltado.

**Siguiente:** [Fase 3 — Animaciones e Interactividad]({{ base_url }}/lessons/es/portfolio-template-brief/challenge/phase-3/) (próximamente)

---

_¿Preguntas? ¿Atascado? Abre un issue en tu repositorio con el prefijo `[Fase 2]` y etiqueta a tu profesor._
