---
layout: lesson
title: 'Animaciones Web: Del Movimiento al Significado'
title_en: 'Web Animations: From Motion to Meaning'
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

## 🎯 Objetivos de Aprendizaje

- **Entender la animación como comunicación** - Movimiento con propósito, no decoración
- **Dominar técnicas de animación CSS** - Transiciones, keyframes, transforms y funciones de temporización
- **Aplicar mejores prácticas de rendimiento** - Aceleración por hardware, will-change y movimiento reducido
- **Diseñar animaciones accesibles** - Respetando preferencias de usuario y carga cognitiva
- **Pensar críticamente sobre el movimiento** - Cuándo la animación mejora vs. distrae de la experiencia de usuario
- **Construir animaciones listas para producción** - Desde micro-interacciones hasta secuencias complejas

---

## 🎭 Perspectiva Crítica: La Animación como Lenguaje

> "La animación no trata de hacer que las cosas se muevan. Trata de hacer que las cosas se *sientan* vivas." — Diseñador UX Anónimo

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
	from { /* o 0% */ }
	25% { }
	50% { }
	to { /* o 100% */ }
}

.element {
	animation: animation-name duration timing-function delay iteration-count direction fill-mode;
}
```

**Ejemplo - Fade-in al cargar página**:
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
.section:nth-child(1) { animation-delay: 0.1s; }
.section:nth-child(2) { animation-delay: 0.2s; }
.section:nth-child(3) { animation-delay: 0.3s; }
```

**🔑 Perspectiva Clave**: Los keyframes son **proactivos** - se ejecutan automáticamente al aplicarse.

---

### Pilar 3: Transforms (Manipulación Espacial)

**Qué**: Mover, rotar, escalar o sesgar elementos **sin activar reflow de layout**.

**Por qué**: Acelerado por GPU = rendimiento suave a 60fps.

**Funciones Principales**:
```css
transform: translateX(100px);        /* Mover horizontalmente */
transform: translateY(-50px);        /* Mover verticalmente */
transform: translate(50px, -20px);   /* Ambos a la vez */
transform: scale(1.2);               /* Crecer 20% */
transform: scaleX(0.8);              /* Comprimir horizontalmente */
transform: rotate(45deg);            /* Rotar en sentido horario */
transform: skewX(10deg);             /* Inclinar */

/* Combinar múltiples transforms */
transform: translateX(50px) rotate(15deg) scale(1.1);
```

**Ejemplo - Efecto de elevación de tarjeta**:
```css
.card {
	transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), /* Rebote */
	            box-shadow 0.3s ease;
}

.card:hover {
	transform: translateY(-8px) scale(1.02);
	box-shadow: 0 20px 40px rgba(0,0,0,0.15);
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
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
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
	from { opacity: 0; }
	to { opacity: 1; }
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
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}

@keyframes pulse {
	0%, 100% { opacity: 1; }
	50% { opacity: 0.5; }
}
```

**Importa en tu `src/main.css`**:
```css
@import './styles/animations.css';
```

---

## 🎨 Ejercicio 1: Micro-Interacciones (Estados de Botón)

**Objetivo**: Añadir retroalimentación deliciosa a botones.

**Dónde**: `src/views/componentes.js` (de lección S3)

**Código**:

```css
/* src/styles/components/button.css */
.btn {
	position: relative;
	overflow: hidden;
	transition: 
		transform var(--duration-fast) var(--ease-out),
		box-shadow var(--duration-fast) var(--ease-out);
}

/* Elevación al hover */
.btn:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Presión activa */
.btn:active {
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
	background: rgba(255,255,255,0.3);
	border-radius: inherit;
	transform: scale(0);
	opacity: 0;
}

.btn:active::after {
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
```

**Cómo probar**:
1. Aplicar clase `.btn` a botones
2. Hover → debería elevarse con sombra
3. Clic → debería comprimirse luego ripple
4. Tab + Espacio → debería mostrar anillo de foco pulsante
5. Habilitar "Reducir Movimiento" → debería seguir siendo responsivo sin movimiento distractor

**Commit**:
```bash
git add src/styles/components/button.css
git commit -m "feat: Añadir micro-interacciones a botones

- Hover: efecto de elevación con sombra
- Activo: retroalimentación de presión
- Foco: animación de anillo pulsante
- Efecto ripple al hacer clic
- Respeta prefers-reduced-motion

Mejora capacidad de respuesta percibida y deleite."
```

---

## 🎨 Ejercicio 2: Animaciones de Carga de Página (Fade-In Escalonado)

**Objetivo**: El contenido aparece con gracia al cargar la página.

**Dónde**: Cualquier vista en `src/views/`

**Código**:

```css
/* Animación fade-in para todas las secciones */
.content-section {
	animation: fadeInUp var(--duration-slow) var(--ease-out) backwards;
}

/* Delays escalonados */
.content-section:nth-child(1) { animation-delay: 0.1s; }
.content-section:nth-child(2) { animation-delay: 0.2s; }
.content-section:nth-child(3) { animation-delay: 0.3s; }
.content-section:nth-child(4) { animation-delay: 0.4s; }
.content-section:nth-child(5) { animation-delay: 0.5s; }

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

**Mejora JavaScript** (opcional):

```javascript
// src/utils/animations.js
export function observeAnimations() {
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

// src/main.js
import { observeAnimations } from './utils/animations.js';

document.addEventListener('DOMContentLoaded', () => {
	observeAnimations();
});
```

**HTML**:
```html
<section class="content-section" data-animate>
	<h2>Sobre Mí</h2>
	<p>Contenido que aparece gradualmente al hacer scroll...</p>
</section>
```

---

## 🎨 Ejercicio 3: Estados de Carga (Pantallas Skeleton y Spinners)

**Objetivo**: Mostrar progreso sin frustrar usuarios.

**Pantalla Skeleton** (preferida para contenido):

```css
.skeleton {
	background: linear-gradient(
		90deg,
		#f0f0f0 25%,
		#e0e0e0 50%,
		#f0f0f0 75%
	);
	background-size: 200% 100%;
	animation: shimmer 1.5s ease-in-out infinite;
	border-radius: 4px;
}

@keyframes shimmer {
	0% { background-position: 200% 0; }
	100% { background-position: -200% 0; }
}

/* Card skeleton */
.skeleton-card {
	.skeleton-image {
		width: 100%;
		height: 200px;
		@extend .skeleton;
	}
	.skeleton-title {
		width: 70%;
		height: 24px;
		margin: 1rem 0 0.5rem;
		@extend .skeleton;
	}
	.skeleton-text {
		width: 100%;
		height: 14px;
		margin-bottom: 0.5rem;
		@extend .skeleton;
	}
}
```

**Spinner** (usar con moderación):

```css
.spinner {
	width: 40px;
	height: 40px;
	border: 4px solid rgba(0,0,0,0.1);
	border-left-color: #3b82f6;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	to { transform: rotate(360deg); }
}

/* Etiqueta accesible */
.spinner[aria-label]::before {
	content: attr(aria-label);
	position: absolute;
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	overflow: hidden;
	white-space: nowrap;
}

/* Respetar preferencia de movimiento */
@media (prefers-reduced-motion: reduce) {
	.spinner {
		animation: pulse 1.5s ease-in-out infinite;
		border-left-color: #3b82f6;
	}
	
	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
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

## 🎯 Práctica Avanzada: Formas Metamorfoseantes (CSS clip-path)

**Objetivo**: Animar entre diferentes formas tipo SVG.

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

```css
.typewriter {
	font-family: monospace;
	overflow: hidden;
	border-right: 2px solid;
	white-space: nowrap;
	animation: 
		typing 3.5s steps(40, end),
		blink-caret 0.75s step-end infinite;
}

@keyframes typing {
	from { width: 0; }
	to { width: 100%; }
}

@keyframes blink-caret {
	from, to { border-color: transparent; }
	50% { border-color: currentColor; }
}
```

### Efecto Glitch

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
	0% { clip: rect(13px, 9999px, 94px, 0); }
	5% { clip: rect(92px, 9999px, 61px, 0); }
	10% { clip: rect(69px, 9999px, 40px, 0); }
	/* ... más pasos */
	100% { clip: rect(76px, 9999px, 19px, 0); }
}
```

### Texto con Gradiente Animado

```css
.gradient-text {
	background: linear-gradient(
		45deg,
		#12c2e9,
		#c471ed,
		#f64f59,
		#12c2e9
	);
	background-size: 300% 300%;
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
	0%, 100% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
}
```

---

## 🎯 Práctica Avanzada: Animaciones Impulsadas por Scroll (CSS Moderno)

**Nuevo en 2023**: ¡Animar basado en posición de scroll SIN JavaScript!

```css
/* Fondo parallax */
.hero {
	animation: parallax linear;
	animation-timeline: scroll();
}

@keyframes parallax {
	to { transform: translateY(50vh); }
}

/* Barra de progreso */
.reading-progress {
	position: fixed;
	top: 0;
	left: 0;
	height: 4px;
	background: linear-gradient(to right, #667eea, #764ba2);
	transform-origin: left;
	animation: progressBar linear;
	animation-timeline: scroll();
}

@keyframes progressBar {
	from { transform: scaleX(0); }
	to { transform: scaleX(1); }
}
```

**Soporte de navegador** (a 2025): Chrome 115+, Safari 17+ (verifica caniuse.com)

**Fallback** para navegadores antiguos:

```javascript
// src/utils/scroll-animations.js
if (!CSS.supports('animation-timeline: scroll()')) {
	// Polyfill o fallback JavaScript
	window.addEventListener('scroll', () => {
		const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
		document.querySelector('.reading-progress').style.transform = `scaleX(${progress})`;
	});
}
```

---

## 🏆 Desafío Experto: View Transitions API

**El Futuro**: ¡Transiciones suaves entre páginas en SPAs y MPAs!

```javascript
// Navegadores modernos (Chrome 111+)
if (document.startViewTransition) {
	document.startViewTransition(() => {
		// Actualizar DOM (ej: navegar a nueva vista)
		renderNewView();
	});
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

**Desafío 3: Web Animations API (WAAPI)**
- Reescribe una animación CSS usando JavaScript:
```javascript
element.animate([
	{ transform: 'scale(1)', opacity: 1 },
	{ transform: 'scale(1.2)', opacity: 0.8 },
	{ transform: 'scale(1)', opacity: 1 }
], {
	duration: 600,
	easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
	iterations: Infinity
});
```
- **Entregable**: Demo interactivo + comparación de rendimiento

**Desafío 4: Animaciones Intersection Observer**
- Animar secciones solo cuando visibles en viewport
- **Entregable**: Función utilidad `animateOnScroll()` reutilizable

### Para Estudiantes Avanzados:

**Desafío 5: Animaciones Basadas en Física**
- Implementar física de resorte usando bibliotecas (Popmotion, Framer Motion)
- **Entregable**: Interfaz drag-and-drop de sensación natural

**Desafío 6: Animaciones de Path SVG**
- Animar `<path>` de SVG stroke-dasharray para efecto de dibujo
- **Entregable**: Logo o icono animado

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
*"La animación no es decoración. Es comunicación. Muévete con propósito. Deleita con moderación. Siempre pregunta: ¿este movimiento sirve a mis usuarios, o solo a mi ego?"*

— Prof. Rubén Vega Balbás, PhD

---

**Próximos Pasos:**
- Revisa [Módulos JavaScript](/lessons/es/js-modules/) para organizar código de animación
- Explora [Tailwind Estado e Interactividad](/lessons/es/tailwind/state-interactivity/) para integración con framework
- Estudia [Accesibilidad y Rendimiento](/lessons/es/tailwind/accessibility-performance/) para optimización

**¡Hagamos de la web un ecosistema virtual hermoso Y útil! 🌐✨**

