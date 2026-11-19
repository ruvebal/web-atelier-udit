---
layout: lesson
title: 'Animaciones Web con CSS – De lo Básico a lo Avanzado'
title_alt: 'Web Animations with CSS – From Basics to Advanced Techniques'
slug: web-animations-css
date: 2025-11-18
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/web-animations/css/
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

## ⏰ Duración Estimada

120 minutos (2 sesiones o 1 taller extendido)

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección, serás capaz de:

- **Explorar** las capacidades de animación CSS a través de experimentación práctica
- **Aplicar** transiciones, keyframes y transformaciones para crear experiencias de usuario atractivas
- **Comprender** las implicaciones de rendimiento de diferentes propiedades de animación
- **Implementar** técnicas avanzadas como animaciones SVG y efectos basados en scroll
- **Evaluar** cuándo usar CSS vs JavaScript para animaciones
- **Crear** animaciones accesibles y eficientes que respeten las preferencias del usuario

---

## 🎭 Enfoque Atelier: Codificación Crítica con Movimiento

Siguiendo nuestra [metodología atelier](https://ruvebal.github.io/web-atelier-udit/methodology/es/), esta lección abraza la **codificación crítica** a través de un ciclo de cinco fases:

1. **🔍 Exploración** → Experimenta con cada técnica de animación en demos aisladas
2. **💭 Reflexión** → Comprende _por qué_ funcionan las animaciones y su impacto en la UX
3. **📚 Conceptualización** → Conecta la práctica con la teoría del diseño, rendimiento y accesibilidad
4. **🛠️ Producción** → Construye animaciones para tu proyecto personal
5. **🎪 Exhibición** → Comparte y critica las decisiones de animación en tu trabajo

> **El movimiento no es decoración—es comunicación.**
> Cada animación debe tener un propósito: guiar la atención, proporcionar feedback o mejorar la comprensión.

---

## 📖 Introducción

Las animaciones CSS3 permiten a desarrolladores web y diseñadores crear efectos visuales suaves y dinámicos directamente en CSS, a menudo eliminando la necesidad de JavaScript. Esta lección cubre técnicas fundamentales y métodos avanzados, asegurando que puedas tomar decisiones informadas sobre cuándo y cómo animar.

---

## 🎓 Parte I: Técnicas Fundamentales

Estas técnicas de animación básicas forman los bloques de construcción del diseño de movimiento web. Domínalas antes de pasar a métodos avanzados.

---

### **1. Transiciones**

**📂 Demo:** [demo/01-transitions.html](./demo/01-transitions.html)

- **Qué Es**: Una característica CSS que anima suavemente los cambios en los valores de las propiedades durante una duración especificada.
- **Cómo Funciona**: Especificas qué propiedades deben hacer transición (ej. `background-color`) y cuánto debe durar la animación.
- **Ejemplo**:
  - **HTML**: Una caja que cambia de color al pasar el ratón.
  - **CSS**:
    ```css
    .box {
    	background-color: blue;
    	transition: background-color 0.5s ease;
    }
    .box:hover {
    	background-color: red;
    }
    ```
  - **Puntos Clave**:
    - `transition` define la duración y el easing de la animación.
    - Se activa por eventos como `hover` o `focus`.

---

### **2. Keyframes**

**📂 Demo:** [demo/02-keyframes.html](./demo/02-keyframes.html)

- **Qué Es**: Una regla CSS (`@keyframes`) usada para definir pasos intermedios en una animación.
- **Cómo Funciona**: Creas keyframes que especifican cómo debe verse un elemento en varios puntos en el tiempo durante la animación.
- **Ejemplo**:
  - **HTML**: Una caja deslizándose desde la izquierda.
  - **CSS**:
    ```css
    @keyframes slideIn {
    	from {
    		transform: translateX(-100%);
    	}
    	to {
    		transform: translateX(0);
    	}
    }
    .box {
    	animation: slideIn 1s ease;
    }
    ```
  - **Puntos Clave**:
    - Usa `@keyframes` para definir el comportamiento de la animación.
    - Aplica la animación usando la propiedad `animation`, especificando el nombre, duración y easing.

---

### **3. Transformaciones**

**📂 Demo:** [demo/03-transformations.html](./demo/03-transformations.html)

- **Qué Es**: La propiedad `transform` modifica la forma, tamaño, posición o rotación de un elemento.
- **Cómo Funciona**: Puedes rotar, escalar, sesgar o trasladar un elemento, a menudo combinado con transiciones o animaciones.
- **Ejemplo**:
  - **HTML**: Una caja que rota y escala al pasar el ratón.
  - **CSS**:
    ```css
    .box:hover {
    	transform: rotate(45deg) scale(1.2);
    	transition: transform 0.5s;
    }
    ```
  - **Puntos Clave**:
    - `rotate(deg)` rota un elemento.
    - `scale(x, y)` redimensiona el elemento.
    - `transition` hace la transformación suave.

---

### **4. Animaciones Infinitas**

**📂 Demo:** [demo/04-infinite-animations.html](./demo/04-infinite-animations.html)

- **Qué Es**: Animaciones que se repiten indefinidamente usando la propiedad `animation-iteration-count: infinite`.
- **Cómo Funciona**: Define la animación usando keyframes, luego configúrala para que se repita.
- **Ejemplo**:
  - **HTML**: Una caja girando.
  - **CSS**:
    ```css
    @keyframes spin {
    	from {
    		transform: rotate(0deg);
    	}
    	to {
    		transform: rotate(360deg);
    	}
    }
    .box {
    	animation: spin 2s linear infinite;
    }
    ```
  - **Puntos Clave**:
    - Usa `infinite` para repetir la animación indefinidamente.
    - Controla la velocidad y el easing con `animation-duration` y `animation-timing-function`.

---

## 🚀 Parte II: Técnicas Avanzadas

Estos métodos sofisticados son para estudiantes listos para ir más allá de lo básico y crear animaciones de calidad profesional y eficientes.

---

### **5. Animaciones de Texto**

**📂 Demo:** [demo/05-text-animations.html](./demo/05-text-animations.html)

- **Qué Es**: Aplicar animaciones a propiedades de texto como `text-shadow`, color o posición para hacer el texto visualmente dinámico.
- **Cómo Funciona**: Define un efecto de brillo, animación de máquina de escribir o fade-in usando keyframes.
- **Ejemplo**:
  - **HTML**: Texto que brilla entrando y saliendo.
  - **CSS**:
    ```css
    @keyframes glow {
    	0%,
    	100% {
    		text-shadow: 0 0 10px blue;
    	}
    	50% {
    		text-shadow: 0 0 20px cyan;
    	}
    }
    .text {
    	animation: glow 1.5s ease-in-out infinite;
    }
    ```
  - **Puntos Clave**:
    - Usa `text-shadow` para efectos de brillo.
    - Combina `infinite` y easing para animaciones suaves y cíclicas.

---

### **6. Animaciones de Fondo**

**📂 Demo:** [demo/06-background-animations.html](./demo/06-background-animations.html)

- **Qué Es**: Animar propiedades de fondo como color, gradiente o posición.
- **Cómo Funciona**: Usa `background-position` con keyframes para crear efectos de movimiento.
- **Ejemplo**:
  - **HTML**: Un fondo degradado que se mueve continuamente.
  - **CSS**:
    ```css
    @keyframes backgroundMove {
    	from {
    		background-position: 0 0;
    	}
    	to {
    		background-position: 200% 0;
    	}
    }
    .box {
    	background: linear-gradient(to right, red, yellow, green, blue);
    	background-size: 200% 100%;
    	animation: backgroundMove 3s linear infinite;
    }
    ```
  - **Puntos Clave**:
    - Usa gradientes y `background-size` para movimiento suave.
    - `background-position` desplaza el gradiente con el tiempo.

---

### **7. Animaciones Escalonadas**

**📂 Demo:** [demo/07-staggered-animations.html](./demo/07-staggered-animations.html)

- **Qué Es**: Retrasar animaciones para múltiples elementos para crear un efecto secuenciado.
- **Cómo Funciona**: Usa `animation-delay` para cada elemento hijo para iniciar sus animaciones en diferentes momentos.
- **Ejemplo**:
  - **HTML**: Un conjunto de cajas animándose una tras otra.
  - **CSS**:
    ```css
    .box:nth-child(1) {
    	animation-delay: 0s;
    }
    .box:nth-child(2) {
    	animation-delay: 0.2s;
    }
    .box:nth-child(3) {
    	animation-delay: 0.4s;
    }
    @keyframes fadeIn {
    	from {
    		opacity: 0;
    	}
    	to {
    		opacity: 1;
    	}
    }
    .box {
    	animation: fadeIn 1s ease-in;
    }
    ```
  - **Puntos Clave**:
    - `nth-child(n)` aplica estilos a elementos hijos específicos.
    - `animation-delay` crea efectos escalonados.

---

### **8. Formas Metamórficas**

**📂 Demo:** [demo/08-morphing-shapes.html](./demo/08-morphing-shapes.html)

- **Qué Es**: Anima la forma de un elemento modificando propiedades como `border-radius` o `clip-path`.
- **Cómo Funciona**: Usa `border-radius` en keyframes para cambiar la forma con el tiempo.
- **Ejemplo**:
  - **HTML**: Una caja transformándose en círculo y de vuelta.
  - **CSS**:
    ```css
    @keyframes morph {
    	0% {
    		border-radius: 0%;
    	}
    	50% {
    		border-radius: 50%;
    	}
    	100% {
    		border-radius: 0%;
    	}
    }
    .box {
    	animation: morph 2s infinite;
    }
    ```
  - **Puntos Clave**:
    - `border-radius` cambia un cuadrado en un círculo.
    - Los keyframes permiten transiciones de forma complejas.

---

### **9. Animaciones SVG**

**📂 Demo:** [demo/09-svg-animations.html](./demo/09-svg-animations.html)

- **Qué Es**: Animar Gráficos Vectoriales Escalables usando CSS o SMIL (Synchronized Multimedia Integration Language).
- **Cómo Funciona**: Aplica animaciones a rutas SVG, formas y atributos para movimiento independiente de resolución.
- **Ejemplo**:
  - **SVG**: Logo animado con efecto de dibujo de ruta.
  - **CSS**:
    ```css
     .logo-path {
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
    	animation: draw 3s ease-in-out forwards;
    }
    @keyframes draw {
    	to {
    		stroke-dashoffset: 0;
    	}
    }
    ```
  - **Puntos Clave**:
    - `stroke-dasharray` y `stroke-dashoffset` crean el efecto de dibujo.
    - Añade `pathLength="1"` a la ruta SVG para normalizar los valores del trazo, sin adivinar la longitud de cada ruta.
    - Los SVG escalan perfectamente en todas las pantallas.
    - Excelente para iconos, ilustraciones y logos.
    - `<animate>` de SVG (SMIL) sigue siendo una opción compatible; compara su portabilidad y control desde la página en la [sesión maestra de animación SVG]({{ '/lessons/en/web-animations/svg-master-session/' | relative_url }}).

> **💡 Más Allá de CSS para Animaciones SVG:**
> Mientras CSS puede animar propiedades SVG, **el morphing SVG complejo, secuenciación y animaciones basadas en física** se benefician significativamente de bibliotecas de animación JavaScript como **GSAP (GreenSock Animation Platform)**. GSAP proporciona:
>
> - **Plugin MorphSVG**: Transforma suavemente entre formas SVG completamente diferentes
> - **Plugin DrawSVG**: Más control sobre el dibujo de paths que CSS `stroke-dashoffset`
> - **Secuenciación con Timeline**: Orquesta coreografías complejas multi-elemento
> - **Utilidad para dibujar paths**: `DrawSVG` anima segmentos parciales y se integra en timelines de GSAP; el dibujo básico de toda la ruta también se puede hacer con valores de trazo CSS normalizados.
> - **Física y Easing**: Funciones de easing avanzadas y movimiento basado en física
>
> **Cuándo usar CSS vs GSAP para SVG:**
>
> - **CSS**: Transformaciones simples, opacidad, dibujo básico de paths, estados hover
> - **GSAP**: Morphing complejo, coreografía secuenciada, animaciones interactivas, proyectos de grado profesional
>
> Consulta nuestra [lección de Animaciones GSAP](../gsap/) para técnicas avanzadas.

---

### **10. Animaciones Basadas en Scroll**

**📂 Demo:** [demo/10-scroll-driven.html](./demo/10-scroll-driven.html)

- **Qué Es**: Animaciones CSS modernas que responden a la posición del scroll usando `animation-timeline: scroll()`.
- **Cómo Funciona**: Las animaciones progresan basadas en el scroll del viewport en lugar del tiempo.
- **Ejemplo**:
  - **HTML**: Barra de progreso de lectura o sección hero con parallax.
  - **CSS**:
    ```css
    @supports (animation-timeline: scroll()) {
    	.progress-bar {
    		animation: grow linear;
    		animation-timeline: scroll();
    	}
    	@keyframes grow {
    		from { transform: scaleX(0); }
    		to { transform: scaleX(1); }
    	}
    }
    ```
  - **Puntos Clave**:
    - Nueva característica con soporte creciente en navegadores (mejora progresiva).
    - Funciona con degradado elegante con JavaScript para navegadores antiguos.
    - Reduce JavaScript para efectos basados en scroll.

---

## 🎯 Cuándo las Animaciones CSS Necesitan Triggers de JavaScript

**📂 Demo:** [demo/11-intersection-observer.html](./demo/11-intersection-observer.html)

Aunque CSS proporciona capacidades de animación poderosas, **la mayoría de las animaciones no comienzan automáticamente**—necesitan ser activadas. Comprender cuándo y cómo activar animaciones es crucial para crear experiencias de usuario efectivas y eficientes.

### El Problema: Animaciones Sin Triggers

Considera este escenario común:

```css
.feature-card {
	opacity: 0;
	animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
```

**Problema**: Esta animación comienza inmediatamente cuando la página carga, incluso si la `.feature-card` está muy abajo en la página donde los usuarios no pueden verla. Para cuando los usuarios lleguen scrolleando, la animación ya habrá terminado.

### Solución 1: Intersection Observer API (Recomendado)

La **Intersection Observer API** es la forma moderna y eficiente de activar animaciones cuando los elementos entran en el viewport.

#### Cómo Funciona

```javascript
// 1. Define qué sucede cuando el elemento es visible
const observerOptions = {
	root: null, // viewport
	rootMargin: '0px',
	threshold: 0.1, // activa cuando el 10% es visible
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			// El elemento es visible - agrega clase de animación
			entry.target.classList.add('animate-in');

			// Opcional: deja de observar después de que la animación se active una vez
			observer.unobserve(entry.target);
		}
	});
}, observerOptions);

// 2. Observa todos los elementos que quieres animar
document.querySelectorAll('.feature-card').forEach((card) => {
	observer.observe(card);
});
```

#### Configuración CSS

```css
/* Estado inicial: invisible y posicionado */
.feature-card {
	opacity: 0;
	transform: translateY(30px);
	transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

/* Estado activado: visible y en su lugar */
.feature-card.animate-in {
	opacity: 1;
	transform: translateY(0);
}
```

#### ¿Por Qué Intersection Observer?

✅ **Eficiente**: Se ejecuta en el hilo principal pero no requiere listeners de scroll
✅ **Ahorra batería**: Solo verifica cuando los elementos cruzan límites de visibilidad
✅ **Flexible**: Configura umbrales de visibilidad, márgenes de raíz y múltiples raíces
✅ **Limpio**: Separa la lógica de observación del estilo de animación
✅ **Confiable**: Funciona correctamente con contenido cargado de forma lazy y cambios dinámicos del DOM

### Solución 2: Alternativas Solo CSS (Casos Limitados)

#### A. Animaciones Basadas en Scroll (Navegadores Modernos)

```css
@supports (animation-timeline: view()) {
	.feature-card {
		animation: fadeInUp linear;
		animation-timeline: view();
		animation-range: entry 0% cover 30%;
	}
}
```

**Pros**: No requiere JavaScript
**Contras**: Soporte limitado en navegadores (Chrome 115+), menos control sobre el punto de activación

#### B. Estados `:hover`, `:focus`, `:active`

```css
.button {
	transition: transform 0.3s;
}

.button:hover {
	transform: scale(1.05);
}
```

**Bueno para**: Interacciones iniciadas por el usuario
**No adecuado para**: Revelaciones basadas en scroll, animaciones de carga de página

### Solución 3: Listeners de Scroll Heredados (Evitar Si Es Posible)

Antes de Intersection Observer, los desarrolladores usaban listeners de eventos de scroll:

```javascript
// ⚠️ NO RECOMENDADO - Problemas de rendimiento
window.addEventListener('scroll', () => {
	const cards = document.querySelectorAll('.feature-card');
	cards.forEach((card) => {
		const rect = card.getBoundingClientRect();
		if (rect.top < window.innerHeight) {
			card.classList.add('animate-in');
		}
	});
});
```

**Problemas**:

- ❌ Se dispara continuamente durante el scroll (100+ veces por segundo)
- ❌ Causa thrashing de layout si no se hace debounce correctamente
- ❌ Drena la batería en dispositivos móviles
- ❌ Bloquea la ejecución del hilo principal

**Reemplazo moderno**: Usa Intersection Observer en su lugar.

### Patrones Comunes de Triggers de Animación

| Caso de Uso                         | Mejor Solución               | Implementación                                              |
| ----------------------------------- | ---------------------------- | ----------------------------------------------------------- |
| Elemento entra en viewport          | Intersection Observer        | Observa con threshold, agrega clase en intersección         |
| Interacción usuario (hover, click)  | Pseudo-clases CSS            | `:hover`, `:focus`, `:active`                               |
| Carga de página                     | Animación CSS al cargar      | Agrega clase al `<body>` cuando el DOM está listo           |
| Progreso de scroll                  | CSS scroll-driven (moderno)  | `animation-timeline: scroll()`                              |
| Secuencia basada en tiempo          | JavaScript `setTimeout`      | Encadena animaciones con delays                             |
| Gesto usuario (swipe, drag)         | Event handlers JavaScript    | `touchstart`, `mousedown` + transform                       |
| Feedback validación formulario      | Toggle de clase              | Agregar/quitar clases `.error` o `.success`                 |
| Apertura modal/diálogo              | Animación CSS + ARIA         | Toggle clase `.is-open` con atributo `aria-hidden`          |

### Ejemplo Práctico: Revelación Escalonada de Tarjetas

```html
<div class="card-grid">
	<article class="card" data-delay="0">Tarjeta 1</article>
	<article class="card" data-delay="100">Tarjeta 2</article>
	<article class="card" data-delay="200">Tarjeta 3</article>
</div>
```

```css
.card {
	opacity: 0;
	transform: translateY(30px);
	transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.card.animate-in {
	opacity: 1;
	transform: translateY(0);
}
```

```javascript
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const delay = entry.target.dataset.delay || 0;
				setTimeout(() => {
					entry.target.classList.add('animate-in');
				}, delay);
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.2 }
);

document.querySelectorAll('.card').forEach((card) => observer.observe(card));
```

### Soporte de Navegadores y Polyfills

**Intersection Observer**: Soportado en todos los navegadores modernos (IE11 requiere polyfill)

```html
<!-- Polyfill para navegadores antiguos -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>
```

**Animaciones scroll-driven**: Chrome/Edge 115+, soporte limitado en otros lugares

```css
/* Mejora progresiva con detección de características */
@supports (animation-timeline: scroll()) {
	/* Navegadores modernos obtienen animaciones suaves de scroll */
}

@supports not (animation-timeline: scroll()) {
	/* Fallback para navegadores antiguos (quizás Intersection Observer) */
}
```

### Consejos de Depuración

1. **Visualiza umbrales de Intersection Observer**:

```javascript
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			console.log(`${entry.target.id}: ${entry.intersectionRatio.toFixed(2)} visible`);
		});
	},
	{ threshold: [0, 0.25, 0.5, 0.75, 1] }
);
```

2. **Agrega bordes de depuración** para ver márgenes de raíz del observer:

```css
.observed-element {
	outline: 2px dashed red; /* Eliminar después de depurar */
}
```

3. **Prueba con reduced motion** para asegurar que los fallbacks funcionen:

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
	// Omite animaciones o usa transiciones instantáneas
	document.body.classList.add('reduce-motion');
}
```

### Puntos Clave

- **CSS define CÓMO se animan los elementos**, JavaScript decide **CUÁNDO**
- **Intersection Observer** es el estándar para animaciones activadas por viewport
- **Los listeners de scroll son heredados** y deben evitarse para triggers de animación
- **Respeta las preferencias del usuario** con `prefers-reduced-motion`
- **Mejora progresiva**: Animaciones CSS modernas basadas en scroll con fallbacks JS
- **Separación de responsabilidades**: Mantén el estilo de animación en CSS, la lógica de activación en JS

---

## 🎨 Principios de Diseño para Movimiento

### Cuándo Animar

✅ **Buenas Razones:**
- **Feedback**: Confirmar acciones del usuario (clics en botones, envíos de formularios)
- **Guía**: Dirigir la atención a elementos importantes
- **Continuidad**: Mostrar relaciones espaciales o jerárquicas
- **Personalidad**: Reforzar la identidad de marca

❌ **Evita Animar:**
- Solo por decoración sin propósito
- Elementos que distraen del contenido principal
- UI crítica que los usuarios necesitan inmediatamente

### Guías de Duración

| Duración | Caso de Uso | Ejemplo |
|----------|----------|---------|
| 100-200ms | Micro-interacciones | Hover de botón, toggle de checkbox |
| 200-500ms | Transiciones de UI | Apertura de modal, menú desplegable |
| 500-1000ms | Transiciones de página | Cambios de ruta, animaciones hero |
| 1000ms+ | Animaciones ambientales | Patrones de fondo, estados de carga |

---

## ⚡ Consideraciones de Rendimiento

### Propiedades Aceleradas por Hardware

**Rápidas** (aceleradas por GPU):
- `transform` (translate, scale, rotate, skew)
- `opacity`
- `filter` (con precaución)

**Lentas** (activan layout/paint):
- `top`, `left`, `right`, `bottom`
- `width`, `height`
- `margin`, `padding`
- `background-position` (usa `transform` en su lugar)

### Mejores Prácticas

```css
/* ✅ BUENO: Acelerado por GPU */
.element {
	transform: translateY(20px);
	opacity: 0;
	transition: transform 0.3s, opacity 0.3s;
}

/* ❌ MALO: Causa reflow */
.element {
	top: 20px;
	display: none;
	transition: top 0.3s;
}

/* ✅ BUENO: Especifica qué animar */
.button {
	transition: background-color 0.2s ease-in-out;
}

/* ❌ MALO: Anima todo */
.button {
	transition: all 0.2s;
}
```

---

## ♿ Accesibilidad: Respetando las Preferencias del Usuario

Siempre respeta la media query `prefers-reduced-motion` para usuarios con trastornos vestibulares o sensibilidad al movimiento:

```css
/* Por defecto: animaciones completas */
.animated {
	animation: slide 1s ease-in-out;
}

/* Respeta la preferencia del usuario */
@media (prefers-reduced-motion: reduce) {
	.animated {
		animation: none;
		/* Proporciona cambio de estado instantáneo en su lugar */
	}
	* {
		animation-duration: 0.01ms !important;
		transition-duration: 0.01ms !important;
	}
}
```

**Lista de Verificación de Accesibilidad:**
- ✅ Proporciona fallbacks de reduced-motion
- ✅ Asegura que las animaciones no impidan el acceso al contenido
- ✅ No confíes solo en la animación para transmitir información
- ✅ Evita contenido parpadeante que pueda desencadenar convulsiones (< 3 parpadeos/seg)

---

## 🛠️ Ejercicio Práctico: Anima Tu Portafolio

**Tarea**: Aplica animaciones a tu repositorio de proyecto personal.

### Requisitos:

1. **Básico** (Requerido):
   - Agrega transiciones hover a todos los elementos interactivos (botones, enlaces)
   - Implementa un fade-in escalonado para secciones de página al cargar
   - Usa transforms para efectos de elevación de tarjetas

2. **Avanzado** (Opcional):
   - Crea una animación de carga personalizada
   - Agrega barra de progreso de lectura basada en scroll
   - Anima logo SVG con dibujo de ruta
   - Implementa formas metamórficas para iconos de navegación

3. **Documentación**:
   - Commit con mensaje: `feat: agregar animaciones CSS a [componente]`
   - Documenta las decisiones de animación en el journal de tu proyecto
   - Explica *por qué* cada animación sirve a la experiencia de usuario

### Criterios de Evaluación:

| Criterio | Peso | Descripción |
|-----------|--------|-------------|
| Propósito | 30% | Las animaciones sirven objetivos de UX, no solo decoración |
| Rendimiento | 25% | Usa propiedades aceleradas por GPU |
| Accesibilidad | 25% | Respeta `prefers-reduced-motion` |
| Ejecución | 20% | Suave, pulida, sin errores |

---

## 📚 Recursos Adicionales

### Referencias
- **MDN Web Docs**: [Animaciones CSS](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Animations)
- **Rendimiento de Animación Web**: [Guía de Google Developers](https://developers.google.com/web/fundamentals/performance/rendering)
- **Animaciones Scroll-Driven**: [Blog de Chrome Developer](https://developer.chrome.com/articles/scroll-driven-animations/)

### Inspiración
- [CSS Animation Rocks](https://cssanimation.rocks/)
- [Codrops CSS Reference](https://tympanus.net/codrops/css_reference/)
- [UI Movement](https://uimovement.com/) - Patrones de animación de diseño

### Herramientas
- [Generador Cubic Bezier](https://cubic-bezier.com/) - Curvas de easing personalizadas
- [Animista](https://animista.net/) - Biblioteca de animaciones listas para usar
- [Keyframes.app](https://keyframes.app/) - Editor visual de animaciones

---

## 🎯 Resumen y Puntos Clave

### Conceptos Esenciales

1. **Transiciones** suavizan cambios de propiedad activados por estado (hover, focus)
2. **Keyframes** definen animaciones multi-paso con control explícito
3. **Transformaciones** manipulan elementos sin activar recalculación de layout
4. **Rendimiento** importa: usa `transform` y `opacity` para animaciones suaves a 60fps
5. **Accesibilidad** no es opcional: respeta preferencias de usuario y proporciona fallbacks

### Consejos Pro

- **Comienza sutil**: Las animaciones deben mejorar, no abrumar
- **Diseña con intención**: Cada animación debe responder "¿por qué?"
- **Prueba en dispositivos**: Lo que funciona suavemente en desktop puede retrasarse en móvil
- **Itera basado en feedback**: Observa a los usuarios interactuar con tus animaciones
- **Sigue aprendiendo**: Nuevas características CSS como View Transitions API están llegando

---

## 💬 Preguntas de Reflexión

Antes de continuar, considera:

1. ¿Qué animaciones en los demos se sintieron con propósito vs puramente decorativas?
2. ¿Cómo afectan las animaciones al rendimiento percibido de un sitio?
3. ¿Cuándo podrían ser más apropiadas las animaciones JavaScript que CSS?
4. ¿Cómo puede el diseño de movimiento reforzar la identidad y valores de tu proyecto?

---

## 🎪 Exhibición: Comparte Tu Trabajo

Una vez que hayas implementado animaciones en tu proyecto:

1. **Despliega** tu sitio actualizado en GitHub Pages
2. **Documenta** tu estrategia de animación en el README de tu proyecto
3. **Presenta** (2 minutos) una animación de la que estés orgulloso y explica su propósito de UX
4. **Critica** el trabajo de un compañero: ¿El movimiento sirve al usuario o distrae?

Recuerda: **El movimiento es una herramienta de diseño, no una decoración.** Úsala sabiamente.

---

**Próxima Lección**: [Dominio de Animaciones GSAP – De Cero a Producción](../gsap/)

**Licencia**: Contenido CC BY-NC-SA 4.0 · Código MIT
**Autor**: Rubén Vega Balbás, PhD · [UDIT](https://www.udit.es)

