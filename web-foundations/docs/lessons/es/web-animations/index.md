---
layout: lesson
title: 'Animaciones Web: Del Movimiento al Significado'
title_alt: 'Web Animations: From Motion to Meaning'
slug: web-animations
date: 2025-10-21
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/web-animations/
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

## ⚡ Inicio Rápido (10 minutos)

- Crea `styles/animations.css` y pega el snippet de abajo.
- Añade el HTML exactamente como se muestra en cualquier página.
- Activa “Reducir movimiento” en el sistema operativo para verificar accesibilidad.

```css
/* Sistema mínimo de animación para el taller */
:root {
	--duration-fast: 200ms;
	--duration: 300ms;
	--ease-out: cubic-bezier(0, 0, 0.2, 1);
	--color-primary: #3b82f6;
}

/* Respetar preferencias de movimiento */
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}

/* Micro-interacción de botón */
.btn {
	padding: 0.75rem 1.5rem;
	border: 0;
	border-radius: 6px;
	background: var(--color-primary);
	color: #fff;
	font-weight: 600;
	transition: transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out);
}
.btn:hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}
.btn:active {
	transform: translateY(0);
	transition-duration: 100ms;
}

/* Fade-in escalonado */
.content-section {
	animation: fadeInUp var(--duration) var(--ease-out) backwards;
}
.content-section:nth-child(1) {
	animation-delay: 0.1s;
}
.content-section:nth-child(2) {
	animation-delay: 0.2s;
}
.content-section:nth-child(3) {
	animation-delay: 0.3s;
}
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
```

```html
<button class="btn">Acción principal</button>

<section class="content-section">
	<h2>Sección A</h2>
	<p>Aparece inmediatamente.</p>
</section>
<section class="content-section">
	<h2>Sección B</h2>
	<p>Aparece tras 0.1s.</p>
</section>
<section class="content-section">
	<h2>Sección C</h2>
	<p>Aparece tras 0.2s.</p>
</section>
```

> Nota para docentes: Demostración primero. Pregunta: ¿Qué animamos y por qué? ¿Qué pasa con movimiento reducido?

<p style="font-size:13px;color:#374151;margin-top:6px;">Demostración: <a href="./demo">Abrir demo interactiva</a></p>

---

## 🎯 Objetivos de Aprendizaje

- **Entender la animación como comunicación** - Movimiento con propósito, no decoración
- **Dominar técnicas de animación CSS** - Transiciones, keyframes, transforms y funciones de temporización
- **Aplicar mejores prácticas de rendimiento** - Aceleración por hardware, will-change y movimiento reducido
- **Diseñar animaciones accesibles** - Respetando preferencias de usuario y carga cognitiva
- **Pensar críticamente sobre el movimiento** - Cuándo la animación mejora vs. distrae de la experiencia de usuario
- **Construir animaciones listas para producción** - Desde micro-interacciones hasta secuencias complejas

---

## 🎭 Perspectiva Crítica: La Animación como Lenguaje

> "La animación no trata de hacer que las cosas se muevan. Trata de hacer que las cosas se _sientan_ vivas." — Diseñador UX Anónimo

Antes de codificar una sola transición, pausemos y **pensemos críticamente** sobre por qué animamos:

### Lo Bueno: Movimiento que Sirve

- **Proporciona retroalimentación** - Botón presionado, formulario enviado, datos cargando
- **Guía la atención** - "Mira aquí después" navegación espacial
- **Revela relaciones** - Padre-hijo, causa-efecto, antes-después
- **Deleita a usuarios** - Personalidad, voz de marca, conexión emocional
- **Reduce carga cognitiva** - Transiciones suaves previenen desorientación

### Lo Malo: Movimiento que Daña

- **Distrae del contenido** - Spinners gratuitos, todo rebotando
- **Dispara trastornos vestibulares** - Parallax, rotación sin `prefers-reduced-motion`
- **Ralentiza interacción** - Animaciones largas bloqueando progreso del usuario
- **Drena batería** - Animaciones ineficientes en dispositivos móviles
- **Excluye usuarios** - Sin alternativa para sensibilidad al movimiento

### 🤔 Pregunta Crítica Atelier #1

**Antes de animar cualquier cosa en tu proyecto, pregunta:**

1. **Propósito**: ¿Qué necesidad del usuario sirve este movimiento?
2. **Alternativas**: ¿Podría el diseño estático comunicar lo mismo?
3. **Costo**: ¿Cuál es el trade-off rendimiento/accesibilidad?
4. **Significado**: ¿Este movimiento se alinea con la voz de mi proyecto?

**Documenta tus respuestas en tu diario de proyecto (mensaje de commit o `DESIGN-DECISIONS.md`).**

---

## 📜 La Evolución de la Animación Web

```text
1995-2005 ━━━━━━━━━━━━━━━━━ Edad Oscura
         │                   • Tags <blink>, <marquee> (deprecados)
         │                   • Animaciones GIF (limitadas, pesadas)
         │                   • Flash (propietario, inaccesible)
         │
2006-2010 ━━━━━━━━━━━━━━━━━ Era jQuery
         │                   • .animate(), .slideDown()
         │                   • Impulsado por JavaScript (problemas rendimiento)
         │                   • Inconsistencia entre navegadores
         │
2011-2015 ━━━━━━━━━━━━━━━━━ Revolución CSS3
         │                   • transition, @keyframes
         │                   • transform (acelerado por GPU)
         │                   • Propiedades animation-*
         │
2016-2020 ━━━━━━━━━━━━━━━━━ Declarativo Moderno
         │                   • Web Animations API (WAAPI)
         │                   • Intersection Observer
         │                   • Variables CSS en animaciones
         │                   • Experimentos API Houdini
         │
2021-HOY  ━━━━━━━━━━━━━━━━━ Maduro y Accesible
                             • View Transitions API
                             • Animaciones impulsadas por scroll
                             • Estándar prefers-reduced-motion
                             • Presupuestos de rendimiento para movimiento
```

> "Las animaciones CSS ganaron porque pusieron el control del movimiento donde pertenece: en la capa de presentación, no la capa de comportamiento." — CSS-Tricks, adaptado

---

## 🎓 Teoría: Los 3 Pilares de la Animación CSS

### Pilar 1: Transiciones (Estado → Estado)

**Qué**: Interpolación suave entre dos valores de propiedad.

**Cuándo**: Estados activados por usuario (hover, focus, active) o cambios de clase.

**Sintaxis**:

```css
.element {
	transition: property duration timing-function delay;
}
```

**Ejemplo**:

```css
.button {
	background: #3b82f6;
	color: white;
	transition: background 0.3s ease, transform 0.15s ease-out;
}

.button:hover {
	background: #2563eb;
	transform: translateY(-2px);
}

.button:active {
	transform: translateY(0);
	transition-duration: 0.1s; /* Más rápido al hacer clic */
}
```

**🔑 Perspectiva Clave**: Las transiciones son **reactivas** - necesitan un disparador (hover, cambio de clase, actualización de estado JS).

---

### Pilar 2: Keyframes (Coreografía Multi-Paso)

**Qué**: Define pasos intermedios en una secuencia de animación.

**Cuándo**: Animaciones complejas, efectos en bucle, independientes de interacción de usuario.

**Sintaxis**:

```css
@keyframes animation-name {
	from {
		/* o 0% */
	}
	25% {
	}
	50% {
	}
	to {
		/* o 100% */
	}
}

.element {
	animation: animation-name duration timing-function delay iteration-count direction fill-mode;
}
```

**Ejemplo - Fade-in al cargar página**:

```html
<section class="content-section">
	<h2>Bienvenida</h2>
	<p>Este bloque aparece suavemente al cargar.</p>
</section>
<section class="content-section">
	<h2>Características</h2>
	<p>Escalona con pequeños retrasos.</p>
</section>
```

```css
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.content-section {
	animation: fadeInUp 0.6s ease-out forwards;
}

/* Escalonar con delays */
.content-section:nth-child(1) {
	animation-delay: 0.1s;
}
.content-section:nth-child(2) {
	animation-delay: 0.2s;
}
.content-section:nth-child(3) {
	animation-delay: 0.3s;
}
```

**🔑 Perspectiva Clave**: Los keyframes son **proactivos** - se ejecutan automáticamente al aplicarse.

---

### Pilar 3: Transforms (Manipulación Espacial)

**Qué**: Mover, rotar, escalar o sesgar elementos **sin activar reflow de layout**.

**Por qué**: Acelerado por GPU = rendimiento suave a 60fps.

**Funciones Principales**:

```css
transform: translateX(100px); /* Mover horizontalmente */
transform: translateY(-50px); /* Mover verticalmente */
transform: translate(50px, -20px); /* Ambos a la vez */
transform: scale(1.2); /* Crecer 20% */
transform: scaleX(0.8); /* Comprimir horizontalmente */
transform: rotate(45deg); /* Rotar en sentido horario */
transform: skewX(10deg); /* Inclinar */

/* Combinar múltiples transforms */
transform: translateX(50px) rotate(15deg) scale(1.1);
```

**Ejemplo - Efecto de elevación de tarjeta**:

```css
.card {
	transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), /* Rebote */ box-shadow 0.3s ease;
}

.card:hover {
	transform: translateY(-8px) scale(1.02);
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

**🔑 Perspectiva Clave**: Siempre usa `transform` y `opacity` para animaciones - son **solo-compositor** (sin repintados).

---

## ⚡ Rendimiento: La Optimización "Will-Change"

**Problema**: El primer frame de animación puede tartamudear (navegador preparando capa GPU).

**Solución**: Decirle al navegador por adelantado qué se animará.

```css
.button {
	will-change: transform, opacity;
	/* Navegador crea capa GPU inmediatamente */
}

/* ⚠️ ¡No abusar! */
.everything {
	will-change: auto; /* Por defecto - solo optimizar lo que anima */
}
```

**Mejor Práctica**:

```css
/* Añadir will-change solo cuando sea necesario */
.card:hover,
.card:focus-within {
	will-change: transform;
}
```

**Prohibido**:

```css
/* ❌ MALO - desperdicia memoria en cada elemento */
* {
	will-change: transform;
}
```

---

## ♿ Accesibilidad: Respetando Preferencias de Movimiento del Usuario

**Realidad**: ~35% de usuarios experimentan mareo por animaciones (Asociación de Trastornos Vestibulares).

**Solución**: Media query `prefers-reduced-motion`.

```css
/* Animación completa para usuarios que la toleran */
@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.loader {
	animation: spin 1s linear infinite;
}

/* Respetar preferencia de usuario */
@media (prefers-reduced-motion: reduce) {
	.loader {
		animation: none;
		/* Proporcionar alternativa estática */
		opacity: 0.6;
	}

	* {
		animation-duration: 0.01ms !important;
		transition-duration: 0.01ms !important;
	}
}
```

**Enfoque de Mejora Progresiva**:

```css
/* Comenzar sin movimiento (predeterminado seguro) */
.element {
	opacity: 1;
}

/* Añadir movimiento solo si usuario permite */
@media (prefers-reduced-motion: no-preference) {
	.element {
		animation: fadeIn 0.5s ease;
	}
}
```

### 🤔 Pregunta Crítica Atelier #2

**El movimiento no es inclusivo por defecto.**

Prueba tus animaciones con:

1. **Configuración del sistema**: Habilita "Reducir Movimiento" en accesibilidad del SO
2. **DevTools**: Chrome/Firefox tienen emulación de movimiento
3. **Usuarios reales**: Pregunta a alguien con sensibilidad vestibular

**Requisito de commit**: Todas las animaciones DEBEN tener alternativa `prefers-reduced-motion`.

---

## 🏗️ Taller Atelier: Construyendo Sistemas de Animación

### Configuración: Iniciador de Utilidades de Animación

Crea `src/styles/animations.css` en tu proyecto:

```css
/* ============================================
   SISTEMA DE ANIMACIÓN
   Tokens de Diseño + Animaciones Reutilizables
   ============================================ */

/* --- Tokens de Temporización --- */
:root {
	--duration-instant: 100ms;
	--duration-fast: 200ms;
	--duration-normal: 300ms;
	--duration-slow: 500ms;
	--duration-slower: 800ms;

	--ease-in: cubic-bezier(0.4, 0, 1, 1);
	--ease-out: cubic-bezier(0, 0, 0.2, 1);
	--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
	--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
	--ease-elastic: cubic-bezier(0.68, -0.35, 0.265, 1.35);
}

/* --- Reset Base --- */
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}

/* --- Clases de Utilidad --- */
.fade-in {
	animation: fadeIn var(--duration-normal) var(--ease-out);
}

.slide-in-up {
	animation: slideInUp var(--duration-slow) var(--ease-out);
}

.scale-in {
	animation: scaleIn var(--duration-fast) var(--ease-bounce);
}

/* --- Biblioteca de Keyframes --- */
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes slideInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes scaleIn {
	from {
		opacity: 0;
		transform: scale(0.8);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

@keyframes pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}
```

**Importa en tu `src/main.css`**:

```css
@import './styles/animations.css';
```

---

## 🎨 Ejercicio 1: Micro-Interacciones (Estados de Botón)

> **✅ CSS Puro - No Requiere JavaScript | Sin Dependencias de Frameworks**

**Objetivo**: Añadir retroalimentación deliciosa a botones usando solo CSS.

**Dónde**: `styles/button.css` (o cualquier página HTML + archivo CSS)

---

### Paso 1: HTML Base

```html
<button class="btn btn-primary">Botón Primario</button>
<button class="btn btn-secondary">Botón Secundario</button>
<button class="btn btn-primary" disabled>Botón Deshabilitado</button>
```

---

### Paso 2: Estilos Base y Variantes

```css
/* styles/button.css */

/* --- Estilos Base del Botón --- */
.btn {
	position: relative;
	overflow: hidden;
	padding: 0.75rem 1.5rem;
	border: none;
	border-radius: 6px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out);
}

/* --- Variantes de Color --- */
.btn-primary {
	background-color: var(--color-primary);
	color: white;
}

.btn-secondary {
	background-color: var(--color-secondary);
	color: white;
}

/* --- Animaciones de Interacción --- */

/* Elevación al hover */
.btn:hover:not(:disabled) {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Presión activa */
.btn:active:not(:disabled) {
	transform: translateY(0);
	transition-duration: var(--duration-instant);
}

/* Animación de anillo de foco */
.btn:focus-visible {
	outline: 2px solid currentColor;
	outline-offset: 2px;
	animation: pulseRing 0.6s ease-out;
}

@keyframes pulseRing {
	0% {
		outline-offset: 2px;
		outline-color: currentColor;
	}
	100% {
		outline-offset: 6px;
		outline-color: transparent;
	}
}

/* Efecto ripple (avanzado) */
.btn::after {
	content: '';
	position: absolute;
	inset: 0;
	background: rgba(255, 255, 255, 0.3);
	border-radius: inherit;
	transform: scale(0);
	opacity: 0;
}

.btn:active:not(:disabled)::after {
	animation: ripple 0.6s ease-out;
}

@keyframes ripple {
	0% {
		transform: scale(0);
		opacity: 1;
	}
	100% {
		transform: scale(1);
		opacity: 0;
	}
}

/* Estado deshabilitado */
.btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

/* Accesibilidad: movimiento reducido */
@media (prefers-reduced-motion: reduce) {
	.btn {
		transition-duration: 0.01ms !important;
	}
	.btn::after,
	.btn:focus-visible {
		animation: none !important;
	}
}
```

### Notas para Docentes

- Demostrar hover/active/focus con teclado y ratón.
- Preguntar: ¿Qué propiedades animan? ¿Por qué `transform` y no `top`?
- Activar “Reducir movimiento” y verificar ausencia de movimiento distrayente.
- Extensión: revisar contraste de color y visibilidad de foco.

---

## 🎨 Ejercicio 2: Animaciones de Carga de Página (Fade-In Escalonado)

> **✅ CSS Puro - No Requiere JavaScript**

**Objetivo**: El contenido aparece con gracia al cargar la página usando solo CSS.

**Dónde**: Cualquier página HTML + `styles/animations.css`

**HTML**:

```html
<main>
	<section class="content-section">
		<h2>Sobre Mí</h2>
		<p>Primera sección aparece inmediatamente...</p>
	</section>
	<section class="content-section">
		<h2>Mi Trabajo</h2>
		<p>Segunda sección aparece 0.1s después...</p>
	</section>
	<section class="content-section">
		<h2>Contacto</h2>
		<p>Tercera sección aparece 0.2s después...</p>
	</section>
</main>
```

**CSS**:

```css
/* Animación fade-in para todas las secciones */
.content-section {
	animation: fadeInUp var(--duration-slow) var(--ease-out) backwards;
}

/* Delays escalonados */
.content-section:nth-child(1) {
	animation-delay: 0.1s;
}
.content-section:nth-child(2) {
	animation-delay: 0.2s;
}
.content-section:nth-child(3) {
	animation-delay: 0.3s;
}
.content-section:nth-child(4) {
	animation-delay: 0.4s;
}
.content-section:nth-child(5) {
	animation-delay: 0.5s;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Movimiento reducido: aparición instantánea */
@media (prefers-reduced-motion: reduce) {
	.content-section {
		animation: none;
	}
}
```

### Notas para Docentes

- Mantener simple: solo delays; evitar coreografías exageradas.
- Explicar `backwards` para evitar parpadeos iniciales.
- Comparar con/ sin `prefers-reduced-motion` activado.
- Extensión: JavaScript (Intersection Observer) solo si se requiere activar por scroll.

---

### ⚠️ Mejora Opcional con JavaScript - Animaciones Activadas por Scroll (Avanzado)

> **Requiere**: Intersection Observer API (soporte navegador: 95%+ globalmente)
>
> **Cuándo usar**: Solo si necesitas animaciones activadas al hacer scroll hacia la vista (no al cargar la página)

**JavaScript** (mejora opcional):

```javascript
// utils/scroll-animations.js
function observeAnimations() {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-in');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.1 }
	);

	document.querySelectorAll('[data-animate]').forEach((el) => {
		observer.observe(el);
	});
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
	observeAnimations();
});
```

**HTML** (con atributo `data-animate`):

```html
<section class="content-section" data-animate>
	<h2>Sobre Mí</h2>
	<p>Contenido que aparece gradualmente al hacer scroll...</p>
</section>
```

**CSS** (para animaciones activadas por JavaScript):

```css
/* Inicialmente oculto */
[data-animate] {
	opacity: 0;
	transform: translateY(30px);
}

/* Animar cuando se añade la clase .animate-in por JavaScript */
[data-animate].animate-in {
	animation: fadeInUp 0.6s ease-out forwards;
}
```

> **Nota**: El enfoque de CSS puro (sin JavaScript) es recomendado para la mayoría de casos. Usa JavaScript solo cuando necesites específicamente animaciones activadas por scroll.

---

## 🎨 Ejercicio 3: Estados de Carga (Pantallas Skeleton y Spinners)

> **✅ CSS Puro - No Requiere JavaScript**

**Objetivo**: Mostrar progreso sin frustrar usuarios.

---

### Opción A: Pantalla Skeleton (Preferida para Contenido)

**HTML**:

```html
<article class="skeleton-card">
	<div class="skeleton skeleton-image"></div>
	<div class="skeleton skeleton-title"></div>
	<div class="skeleton skeleton-text"></div>
	<div class="skeleton skeleton-text"></div>
</article>
```

**CSS**:

```css
/* Animación shimmer base para skeleton */
.skeleton {
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: shimmer 1.5s ease-in-out infinite;
	border-radius: 4px;
}

@keyframes shimmer {
	0% {
		background-position: 200% 0;
	}
	100% {
		background-position: -200% 0;
	}
}

/* Variantes de skeleton */
.skeleton-image {
	width: 100%;
	height: 200px;
}

.skeleton-title {
	width: 70%;
	height: 24px;
	margin: 1rem 0 0.5rem;
}

.skeleton-text {
	width: 100%;
	height: 14px;
	margin-bottom: 0.5rem;
}

/* Card skeleton completa */
.skeleton-card {
	padding: 1rem;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
}

/* Respeta preferencias de movimiento */
@media (prefers-reduced-motion: reduce) {
	.skeleton {
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.6;
		}
	}
}
```

---

### Opción B: Spinner (Usar con Moderación)

> **Usar solo para esperas cortas (<3 segundos). Prefiere pantallas skeleton para carga de contenido.**

**HTML**:

```html
<div class="spinner" role="status" aria-label="Cargando contenido"></div>
<p class="sr-only">Cargando contenido, por favor espera...</p>
```

**CSS**:

```css
.spinner {
	width: 40px;
	height: 40px;
	border: 4px solid rgba(0, 0, 0, 0.1);
	border-left-color: var(--color-primary, #3b82f6);
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

/* Texto solo para lectores de pantalla */
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

/* Respeta preferencias de movimiento */
@media (prefers-reduced-motion: reduce) {
	.spinner {
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
}
```

### 🤔 Pregunta Crítica Atelier #3

**Las animaciones de carga son una señal de fallo.**

Si los usuarios ven tu loader a menudo:

- Tu app es demasiado lenta (optimiza backend/assets)
- No estás usando mejora progresiva
- Estás priorizando "verse ocupado" sobre "ser rápido"

**Mejor**: UI instantánea con actualizaciones optimistas, luego sincronizar en segundo plano.

**Documenta en tu proyecto**: ¿Cómo minimizaste estados de carga?

---

## 🎨 Ejercicio 4: Animaciones SVG (Íconos y Logos)

> **✅ CSS Puro + SVG - No Requiere JavaScript**

**Objetivo**: Animar gráficos SVG usando CSS puro para animaciones profesionales y escalables.

---

### Efecto de Dibujo de Path SVG

**HTML** (SVG inline):

```html
<svg class="logo-animated" width="200" height="200" viewBox="0 0 200 200">
	<path class="logo-path" d="M 50 100 Q 100 50 150 100 T 250 100" fill="none" stroke="currentColor" stroke-width="3" />
</svg>
```

**CSS**:

```css
.logo-path {
	stroke-dasharray: 1000;
	stroke-dashoffset: 1000;
	animation: draw 2s ease-out forwards;
}

@keyframes draw {
	to {
		stroke-dashoffset: 0;
	}
}

/* Respeta preferencias de movimiento */
@media (prefers-reduced-motion: reduce) {
	.logo-path {
		animation: none;
		stroke-dashoffset: 0;
	}
}
```

**Cómo funciona**:

- `stroke-dasharray` crea trazo discontinuo
- `stroke-dashoffset` oculta el trazo inicialmente
- La animación lleva `stroke-dashoffset` a 0, "dibujando" el path

---

### Metamorfosis de Íconos SVG

**HTML**:

```html
<svg class="icon-morph" width="48" height="48" viewBox="0 0 24 24">
	<circle class="circle-to-square" cx="12" cy="12" r="8" fill="currentColor" />
</svg>
```

**CSS**:

```css
.circle-to-square {
	animation: morph-shape 3s ease-in-out infinite;
	transform-origin: center;
}

@keyframes morph-shape {
	0%,
	100% {
		d: path('M12,4 a8,8 0 1,0 0,16 a8,8 0 1,0 0,-16'); /* Círculo */
	}
	50% {
		d: path('M4,4 h16 v16 h-16 z'); /* Cuadrado */
	}
}
```

---

### Patrón de Fondo SVG Animado

**HTML**:

```html
<div class="hero-section">
	<svg class="bg-pattern" width="100%" height="100%">
		<defs>
			<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
				<circle cx="20" cy="20" r="2" fill="rgba(59, 130, 246, 0.1)" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#grid)" />
	</svg>
	<h1>Contenido sobre fondo animado</h1>
</div>
```

**CSS**:

```css
.bg-pattern {
	position: absolute;
	inset: 0;
	z-index: -1;
	animation: pattern-slide 20s linear infinite;
}

@keyframes pattern-slide {
	to {
		transform: translate(40px, 40px);
	}
}

/* Hero con posicionamiento relativo */
.hero-section {
	position: relative;
	min-height: 400px;
	display: flex;
	align-items: center;
	justify-content: center;
}
```

---

## 🎯 Práctica Avanzada: Formas Metamorfoseantes (CSS clip-path)

> **✅ CSS Puro - No Requiere JavaScript**

**Objetivo**: Animar entre diferentes formas tipo SVG.

**HTML**:

```html
<button class="morph-button">Pasar el cursor para metamorfosis</button>
<div class="shape"></div>
```

```css
.morph-button {
	clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	transition: clip-path 0.5s var(--ease-in-out);
}

.morph-button:hover {
	clip-path: polygon(0 10%, 100% 0, 100% 90%, 0 100%);
}

/* Metamorfosis círculo a cuadrado */
.shape {
	width: 100px;
	height: 100px;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	clip-path: circle(50%);
	transition: clip-path 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.shape:hover {
	clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
```

**Casos de uso**:

- Transformaciones de menú de navegación
- Efectos de revelación de tarjetas
- Visualizaciones de datos interactivas
- Secciones de contenido dirigidas por arte

---

## 🎯 Práctica Avanzada: Animaciones de Texto (Typewriter, Glitch, Gradient)

### Efecto Máquina de Escribir

**HTML**:

```html
<h2 class="typewriter">Diseña con movimiento, no con distracción.</h2>
```

```css
.typewriter {
	font-family: monospace;
	overflow: hidden;
	border-right: 2px solid;
	white-space: nowrap;
	animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
	from {
		width: 0;
	}
	to {
		width: 100%;
	}
}
@keyframes blink-caret {
	from,
	to {
		border-color: transparent;
	}
	50% {
		border-color: currentColor;
	}
}
```

### Efecto Glitch

**HTML**:

```html
<h2 class="glitch" data-text="GLITCH">GLITCH</h2>
```

```css
.glitch {
	position: relative;
	animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
}
.glitch::before,
.glitch::after {
	content: attr(data-text);
	position: absolute;
	inset: 0;
}
.glitch::before {
	left: 2px;
	text-shadow: -2px 0 #ff00de;
	clip: rect(24px, 550px, 90px, 0);
	animation: glitch-anim 2s infinite linear alternate-reverse;
}
.glitch::after {
	left: -2px;
	text-shadow: -2px 0 #00fff9, 2px 2px #ff00de;
	animation: glitch-anim 2s infinite linear alternate-reverse;
}
@keyframes glitch-anim {
	0% {
		clip: rect(13px, 9999px, 94px, 0);
	}
	5% {
		clip: rect(92px, 9999px, 61px, 0);
	}
	10% {
		clip: rect(69px, 9999px, 40px, 0);
	}
	100% {
		clip: rect(76px, 9999px, 19px, 0);
	}
}
```

### Texto con Gradiente Animado

**HTML**:

```html
<h2 class="gradient-text">Gradiente animado</h2>
```

```css
.gradient-text {
	background: linear-gradient(45deg, #12c2e9, #c471ed, #f64f59, #12c2e9);
	background-size: 300% 300%;
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
	0%,
	100% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
}
```

---

## 🎯 Práctica Avanzada: Animaciones Impulsadas por Scroll (CSS Moderno)

> **✅ CSS Puro - ¡Nuevo en 2024!**
>
> **Soporte de navegador**: Chrome 115+, Safari 17+ (a 2025) - verifica [caniuse.com](https://caniuse.com/css-scroll-timeline) > **Cuándo usar**: Mejora progresiva para navegadores modernos

**Objetivo**: ¡Animar basado en posición de scroll SIN JavaScript!

**HTML**:

```html
<div class="hero">
	<h1>Haz scroll para ver efecto parallax</h1>
</div>

<div class="reading-progress"></div>
```

**CSS**:

```css
/* Fondo parallax */
.hero {
	animation: parallax linear;
	animation-timeline: scroll();
}

@keyframes parallax {
	to {
		transform: translateY(50vh);
	}
}

/* Barra de progreso de lectura */
.reading-progress {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 4px;
	background: linear-gradient(to right, #667eea, #764ba2);
	transform-origin: left;
	animation: progressBar linear;
	animation-timeline: scroll();
}

@keyframes progressBar {
	from {
		transform: scaleX(0);
	}
	to {
		transform: scaleX(1);
	}
}
```

---

### ⚠️ Fallback JavaScript para Navegadores Antiguos (Opcional)

> **Usar solo si necesitas soportar navegadores sin soporte para `animation-timeline`**

```javascript
// utils/scroll-fallback.js
if (!CSS.supports('animation-timeline: scroll()')) {
	// Fallback JavaScript para navegadores antiguos
	window.addEventListener('scroll', () => {
		const scrolled = window.scrollY;
		const total = document.body.scrollHeight - window.innerHeight;
		const progress = scrolled / total;

		document.querySelector('.reading-progress').style.transform = `scaleX(${progress})`;
	});
}
```

---

## 🏆 Desafío Experto: View Transitions API

> **⚠️ JavaScript Requerido - API de Navegador de Vanguardia**
>
> **Soporte de navegador**: Chrome 111+, Edge 111+ (a 2025)
> **Cuándo usar**: Transiciones avanzadas de páginas SPA (no alcanzable solo con CSS)

**El Futuro**: ¡Transiciones suaves entre páginas en SPAs y MPAs!

```javascript
// Verificar soporte del navegador
if (document.startViewTransition) {
	document.startViewTransition(() => {
		// Actualizar DOM (ej: navegar a nueva vista)
		renderNewView();
	});
} else {
	// Fallback: navegación instantánea
	renderNewView();
}
```

**CSS**:

```css
::view-transition-old(root),
::view-transition-new(root) {
	animation-duration: 0.5s;
}

/* Transiciones personalizadas para elementos específicos */
.hero-image {
	view-transition-name: hero;
}

::view-transition-old(hero),
::view-transition-new(hero) {
	animation-duration: 1s;
	animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

## 📚 Lista de Verificación de Rendimiento de Animación

Antes de hacer commit de animaciones a tu proyecto:

- [ ] **Solo animar `transform` y `opacity`** (acelerado por GPU)
- [ ] **Usar `will-change` con moderación** (solo en hover/interacción)
- [ ] **Implementar `prefers-reduced-motion`** (requisito de accesibilidad)
- [ ] **Probar en dispositivos móviles** (impacto batería/rendimiento)
- [ ] **Evitar animar `width/height/top/left`** (dispara layout)
- [ ] **Usar `requestAnimationFrame()` para animaciones JS**
- [ ] **Debounce listeners de scroll** (si usando JavaScript)
- [ ] **Establecer presupuestos de animación** (máx 3-4 animaciones simultáneas)

**Pruebas de rendimiento**:

```bash
# Chrome DevTools > Performance
# Grabar → Interactuar → Verificar:
# - Caída de frames (debajo de 60fps)
# - Operaciones Layout/Paint
# - Fugas de memoria (heap creciente)
```

---

## 🎓 Reflexión Atelier: Cuándo NO Animar

La animación es una herramienta, no un requisito. Considera **diseño estático** cuando:

1. **El contenido es prioridad** - No distraigas de lectura/tareas críticas
2. **Dispositivos de baja gama** - Respeta CPU/batería limitada
3. **Contextos profesionales** - Sitios bancarios, salud, legales favorecen confianza sobre deleite
4. **Preocupaciones de accesibilidad** - Sensibilidad al movimiento, carga cognitiva, lectores de pantalla
5. **Presupuesto de rendimiento** - Has alcanzado tu tamaño de bundle / tiempo de carga

### 🤔 Pregunta Crítica Atelier #4

**"Muévete rápido y rompe cosas" es una mentira.**

En tu diario de proyecto, reflexiona:

- ¿Qué animaciones eliminaste después de probar?
- ¿Qué alternativas estáticas funcionaron mejor?
- ¿Cómo experimentaron tu movimiento usuarios con discapacidades?

**Objetivo**: El 80% de tu UX debería funcionar perfectamente con CSS y animaciones deshabilitadas.

---

## 🌍 Estudios de Caso del Mundo Real

### Bueno: Retroalimentación Sutil de Stripe

- Hover de botón: elevación 2px + sombra (50ms)
- Validación de formulario: Checkmark verde fade-in (200ms)
- Transiciones de página: Cross-fade (300ms)
- **Por qué funciona**: Rápido, con propósito, mejora confianza

### Malo: Sitios Portfolio Principios 2010

- Cada elemento rotando al hacer scroll
- Parallax sobre parallax
- Texto escribiéndose carácter por carácter
- **Por qué falló**: Lento, distractor, inductor de náusea

### Excelente: Páginas de Producto Apple

- Revelaciones de producto impulsadas por scroll
- Temporización precisa (sincronizada con narrativa)
- Alto rendimiento (solo transform/opacity)
- **Por qué es ejemplar**: El movimiento sirve a la narrativa, no al ego

---

## 📝 Asignación: Anima Tu Portafolio

**Requisitos**:

1. **Añade 3 tipos de animaciones a tu proyecto**:

   - Micro-interacción (hover botón/link)
   - Animación de carga de página (fade-in escalonado)
   - Estado de carga (skeleton o spinner)

2. **Rendimiento**:

   - Solo `transform` y `opacity`
   - Probar en móvil (sin jank)
   - Documentar métricas de rendimiento

3. **Accesibilidad**:

   - Implementar `prefers-reduced-motion`
   - Probar con movimiento deshabilitado
   - Asegurar estados de foco claros

4. **Reflexión Crítica**:
   - Escribir 2-3 párrafos en `DESIGN-DECISIONS.md`:
     - ¿Por qué elegiste estas animaciones?
     - ¿Qué alternativas consideraste?
     - ¿Cómo mejoran la UX?

**Commit**:

```bash
git add src/styles/animations.css src/views/ DESIGN-DECISIONS.md
git commit -m "feat: Añadir sistema de animación a portafolio

Animaciones:
- Micro-interacciones de botón (elevación hover + ripple)
- Fade-in escalonado de carga de página (delays 0.1s)
- Carga skeleton para tarjetas de proyecto

Rendimiento:
- Todas las animaciones usan solo transform/opacity
- will-change solo en elementos interactivos
- Probado: 60fps en iPhone SE 2020

Accesibilidad:
- Fallback prefers-reduced-motion (transiciones instantáneas)
- Indicadores de foco con animación de pulso
- Navegación por teclado probada

Reflexión en DESIGN-DECISIONS.md:
- El movimiento sirve a retroalimentación, no decoración
- Eliminé parallax tras pruebas vestibulares
- Diseño estático funciona mejor para CTA crítico"
```

---

## 🎯 Desafíos Opcionales Avanzados

### Para Estudiantes Enfocados en Diseño:

**Desafío 1: Emoción Mediante Movimiento**

- Crea 3 estilos de botón que transmitan emociones diferentes:
  - Juguetón (rebote, wiggle)
  - Serio (sutil, preciso)
  - Energético (pulso, escala)
- **Entregable**: Codepen + justificación de diseño de 1 página

**Desafío 2: Sistema de Animación de Marca**

- Define tokens de diseño de movimiento para una marca (Airbnb, Nike, tu proyecto)
- **Entregable**: Variables CSS para duraciones, easings, patrones

### Para Estudiantes Enfocados en Código:

**Desafío 3: Web Animations API (WAAPI)** ⚠️ _JavaScript Requerido_

> **Cuándo usar**: Animaciones complejas que requieren control programático (play/pause/reverse)

- Reescribe una animación CSS usando JavaScript:

```javascript
// utils/waapi-example.js
const element = document.querySelector('.animated-element');

const animation = element.animate(
	[
		{ transform: 'scale(1)', opacity: 1 },
		{ transform: 'scale(1.2)', opacity: 0.8 },
		{ transform: 'scale(1)', opacity: 1 },
	],
	{
		duration: 600,
		easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
		iterations: Infinity,
	}
);

// Controlar animaciones programáticamente
animation.pause();
animation.play();
animation.reverse();
```

- **Entregable**: Demo interactivo + comparación de rendimiento (CSS vs WAAPI)
- **Comparar**: Uso de CPU, tasa de frames, tamaño del bundle

**Desafío 4: Animaciones Intersection Observer** ⚠️ _JavaScript Requerido_

> **Alternativa CSS pura**: Usa `animation-delay` al cargar página (ver Ejercicio 2)
> **Usa JavaScript solo si**: Necesitas animaciones activadas por scroll (no animaciones de carga)

- Animar secciones solo cuando visibles en viewport
- **Entregable**: Función utilidad `animateOnScroll()` reutilizable

### Para Estudiantes Avanzados:

**Desafío 5: Animaciones Basadas en Física** ⚠️ _JavaScript + Biblioteca Requerida_

> **Bibliotecas**: Popmotion, Framer Motion, React Spring
> **Tamaño del bundle**: ~10-30KB (considera trade-offs de rendimiento)

- Implementar física de resorte para movimiento natural
- **Entregable**: Interfaz drag-and-drop de sensación natural
- **Reflexiona**: ¿Valió la pena el tamaño del bundle? ¿CSS podría haber logrado resultados similares?

**Desafío 6: Animaciones de Path SVG** ✅ _CSS Puro_

> **Recomendado**: ¡Esto es alcanzable con CSS puro! (ver Ejercicio 4)

- Animar `<path>` de SVG usando `stroke-dasharray` y `stroke-dashoffset`
- **Entregable**: Logo o icono animado que se dibuja al cargar la página
- **Bonus**: Añadir fallback para `prefers-reduced-motion`

---

## 📚 Aprendizaje Adicional

### Lectura Esencial

- **Material Design Motion**: [motion.material.io](https://material.io/design/motion)
- **Refactoring UI**: Capítulo de animación (principios de diseño)
- **Val Head**: _Designing Interface Animation_ (O'Reilly)
- **Rachel Nabors**: _Animation at Work_ (A Book Apart)

### Herramientas y Playgrounds

- **Cubic Bezier**: [cubic-bezier.com](https://cubic-bezier.com) - Editor de curvas de easing
- **Animista**: [animista.net](https://animista.net) - Biblioteca de animaciones CSS
- **Lottie**: [airbnb.design/lottie](https://airbnb.design/lottie) - After Effects a web
- **GSAP**: [greensock.com/gsap](https://greensock.com/gsap) - Biblioteca de animación JavaScript

### Estándares y Especificaciones

- **MDN: Animaciones CSS**: [mdn.io/css-animations](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Animations)
- **WCAG 2.1**: Animación y Movimiento (Criterio de Éxito 2.3.3)
- **View Transitions API**: [github.com/WICG/view-transitions](https://github.com/WICG/view-transitions)

---

## 🎓 Reflexión Final Atelier

> "La mejor animación es invisible. Los usuarios deberían sentir el flujo, no estudiar la técnica." — Anónimo

Al completar esta lección, has aprendido:

1. ✅ **Dominio técnico** - Transiciones CSS, keyframes, transforms
2. ✅ **Conciencia de rendimiento** - Aceleración GPU, will-change, movimiento reducido
3. ✅ **Compromiso con accesibilidad** - Preferencias de movimiento, carga cognitiva
4. ✅ **Pensamiento crítico** - Cuándo animar (y cuándo no)
5. ✅ **Práctica profesional** - Sistemas de diseño, documentación, testing

**Ahora estás equipado para hacer la web más deliciosa Y más inclusiva.**

---

## 📝 Commit Tu Aprendizaje

```bash
git add .
git commit -m "feat: Completar dominio de Animaciones Web

Teoría:
- Entender transiciones, keyframes, transforms
- Dominar funciones de temporización y easing
- Aprender técnicas de optimización de rendimiento

Práctica:
- Construido sistema de animación con tokens de diseño
- Implementadas micro-interacciones (botones)
- Creados estados de carga (skeleton, spinner)
- Añadidas animaciones de carga de página (escalonadas)

Accesibilidad:
- Todas las animaciones respetan prefers-reduced-motion
- Probado con movimiento deshabilitado
- Decisiones de accesibilidad documentadas

Reflexión Crítica:
- La animación sirve a propósito, no decoración
- Presupuesto de rendimiento aplicado
- Usuarios con trastornos vestibulares considerados

Portafolio: Ahora tiene movimiento delicioso y accesible ✨"
```

---

**🎨 Filosofía Atelier:**
_"La animación no es decoración. Es comunicación. Muévete con propósito. Deleita con moderación. Siempre pregunta: ¿este movimiento sirve a mis usuarios, o solo a mi ego?"_

— Prof. Rubén Vega Balbás, PhD

---

**Próximos Pasos:**

- Revisa [Módulos JavaScript]({{ '/lessons/es/js-modules/' | relative_url }}) para organizar código de animación modularmente
- Estudia las guías de accesibilidad (WCAG 2.1) para movimiento y animación
- Explora herramientas de optimización de rendimiento (Chrome DevTools, Lighthouse)
- Practica técnicas de animación SVG para logos e íconos
- Aprende más sobre `scroll()` timeline de CSS para animaciones impulsadas por scroll

**¡Hagamos de la web un ecosistema virtual hermoso Y útil! 🌐✨**
