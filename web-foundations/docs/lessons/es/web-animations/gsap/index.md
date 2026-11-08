---
layout: lesson
title: 'Dominio de Animaciones GSAP – De Cero a Producción'
title_alt: 'GSAP Animation Mastery – From Zero to Production'
slug: web-animations-gsap
date: 2025-11-19
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/web-animations/gsap/
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

## ⏰ Duración Estimada

180 minutos (3 sesiones o 2 talleres extendidos)

## 🎯 Objetivos de Aprendizaje

Al final de esta lección, serás capaz de:

- **Integrar** GSAP en proyectos usando flujos de trabajo CDN y npm/node
- **Crear** animaciones sofisticadas basadas en timelines con control preciso
- **Animar** elementos SVG con morphing, dibujo y transformaciones complejas
- **Implementar** animaciones activadas por scroll usando el plugin ScrollTrigger
- **Construir** experiencias interactivas de calidad profesional
- **Depurar** y optimizar animaciones GSAP para 60fps de rendimiento
- **Evaluar** cuándo GSAP proporciona ventajas sobre animaciones CSS

---

## 🎭 Enfoque Atelier: Del Descubrimiento a la Maestría

Siguiendo nuestra [metodología atelier](https://ruvebal.github.io/web-atelier-udit/methodology/es/), esta lección adopta **codificación crítica a través del movimiento**:

1. **🔍 Exploración** → Experimenta con la API de GSAP a través de demos progresivas
2. **💭 Reflexión** → Entiende _por qué_ existe GSAP y cuándo CSS no es suficiente
3. **📚 Conceptualización** → Conecta la animación JavaScript con sistemas de diseño y UX
4. **🛠️ Producción** → Construye animaciones complejas para tu proyecto portfolio
5. **🎪 Exhibición** → Comparte prototipos animados y critica las decisiones de timing/easing

> **"La animación no se trata de mover cosas. Se trata de mover personas."**
> — Cada diseñador que se dio cuenta de que su hermoso mockup estático de Figma está muerto hasta que respira

---

## 📖 Introducción: ¿Por Qué GSAP?

### El Muro de Limitaciones de CSS

Has aprendido animaciones CSS. Son geniales para transiciones simples y secuencias básicas de keyframes. Pero eventualmente, cada diseñador choca contra el muro:

- **"¿Cómo secuencio 10 animaciones con diferentes tiempos de inicio?"** → Los delays de CSS se vuelven inmanejables
- **"¿Puedo transformar este círculo en una estrella?"** → CSS no puede interpolar paths SVG
- **"Necesito que esto empiece cuando el scroll llegue al 40%"** → CSS scroll-timeline tiene pobre soporte de navegadores
- **"¿Por qué esto se anima diferente en Safari?"** → Las inconsistencias de animación CSS son frustrantes

### Entra GSAP (GreenSock Animation Platform)

**GSAP** es la navaja suiza de la animación web. Usado por empresas como Google, Adobe, Nike y Apple, es el estándar de la industria para animaciones de grado profesional.

**Lo que hace especial a GSAP:**

```javascript
// Esto es todo lo que necesitas para animar cualquier cosa, en cualquier lugar
gsap.to('.box', { x: 100, rotation: 360, duration: 1 });
```

- **Rendimiento**: Optimizado más allá de lo que CSS puede lograr
- **Control**: Timelines que secuencian, solapan y sincronizan animaciones perfectamente
- **Compatibilidad**: Funciona idénticamente en todos los navegadores (incluyendo Safari viejo)
- **Poder**: Anima morphing SVG, efectos de scroll, canvas, WebGL, CSS, cualquier cosa
- **Ecosistema**: Plugins para ScrollTrigger, Draggable, MorphSVG y más

---

## 🚀 Parte I: Fundamentos (Comenzando)

### Métodos de Instalación: CDN vs npm

GSAP funciona tanto con herramientas de build modernas como con HTML clásico. Elige según tu proyecto.

#### Método 1: CDN (Inicio Rápido, Prototipos)

Perfecto para experimentos, CodePen, o añadir animaciones a sitios existentes sin proceso de build.

```html
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<title>Demo GSAP CDN</title>
		<style>
			.box {
				width: 100px;
				height: 100px;
				background: hotpink;
				border-radius: 8px;
			}
		</style>
	</head>
	<body>
		<div class="box"></div>

		<!-- GSAP Core -->
		<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>

		<!-- Plugins GSAP (opcional) -->
		<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

		<script>
			// Registrar plugins
			gsap.registerPlugin(ScrollTrigger);

			// ¡Animar!
			gsap.to('.box', {
				x: 200,
				rotation: 360,
				duration: 2,
				ease: 'power2.inOut',
			});
		</script>
	</body>
</html>
```

**✅ Pros:** Configuración instantánea, sin herramientas de build, genial para aprender
**❌ Contras:** Sin tree-shaking, actualizaciones manuales de versión, trabajo offline limitado

---

#### Método 2: npm (Proyectos de Producción)

Para proyectos modernos con herramientas de build (Vite, Webpack, Parcel, etc.).

**1. Instalar GSAP:**

```bash
npm install gsap
```

**2. Importar y usar en tu JavaScript:**

```javascript
// main.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins
gsap.registerPlugin(ScrollTrigger);

// ¡Animar!
gsap.to('.box', {
	x: 200,
	rotation: 360,
	duration: 2,
	ease: 'power2.inOut',
});
```

**3. Estructura del proyecto:**

```
mi-proyecto/
├── index.html
├── src/
│   ├── main.js         ← Tus animaciones GSAP
│   └── styles.css
├── package.json
└── vite.config.js      ← o configuración webpack/parcel
```

**✅ Pros:** Tree-shaking (bundles más pequeños), control de versiones, módulos ES, funciona offline
**❌ Contras:** Requiere configuración Node.js, paso de build añade complejidad

> 💡 **Recomendación para este curso:** Comienza con CDN para enfocarte en aprender la API de GSAP. Migra a npm al construir tu proyecto portfolio.

---

### Conceptos Clave: Tweens y Timelines

#### Tweens: Los Bloques de Construcción

Un **tween** (abreviatura de "in-between") anima propiedades de un valor a otro.

```javascript
// Métodos básicos de tween
gsap.to(target, vars); // Animar HACIA valores
gsap.from(target, vars); // Animar DESDE valores
gsap.fromTo(target, fromVars, toVars); // Inicio y fin explícitos

// Ejemplos
gsap.to('.box', { x: 100, duration: 1 }); // Mover a la derecha
gsap.from('.box', { opacity: 0, duration: 1 }); // Fade in
gsap.fromTo('.box', { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 1 });
```

**Propiedades Animables:**

```javascript
gsap.to('.element', {
	// Transformaciones CSS (¡más rápidas!)
	x: 100, // translateX
	y: 50, // translateY
	rotation: 45, // rotar en grados
	scale: 1.5, // escala uniforme
	scaleX: 2, // estiramiento horizontal

	// Propiedades CSS
	opacity: 0.5,
	backgroundColor: '#ff0000',
	borderRadius: '50%',

	// Atributos SVG
	attr: { cx: 100, cy: 50, r: 30 },

	// Timing
	duration: 2, // segundos
	delay: 0.5, // retraso antes de iniciar
	ease: 'power2.out', // función de easing

	// Callbacks
	onStart: () => console.log('¡Iniciado!'),
	onComplete: () => console.log('¡Terminado!'),
	onUpdate: () => console.log('Animando...'),
});
```

---

#### Timelines: Secuenciación Simplificada

**Problema con JavaScript plano:**

```javascript
// ❌ Infierno de callbacks
gsap.to('.box1', {
	x: 100,
	duration: 1,
	onComplete: () => {
		gsap.to('.box2', {
			y: 100,
			duration: 1,
			onComplete: () => {
				gsap.to('.box3', { rotation: 360, duration: 1 });
			},
		});
	},
});
```

**Solución con Timeline de GSAP:**

```javascript
// ✅ Limpio y mantenible
const tl = gsap.timeline();

tl
	.to('.box1', { x: 100, duration: 1 })
	.to('.box2', { y: 100, duration: 1 })
	.to('.box3', { rotation: 360, duration: 1 });
```

**Superpoderes del Timeline:**

```javascript
const tl = gsap.timeline({
	defaults: { duration: 1, ease: 'power2.inOut' }, // Aplicar a todos los hijos
	repeat: 2, // Repetir toda la secuencia
	yoyo: true, // Reproducir hacia adelante y luego hacia atrás
	paused: true, // Iniciar pausado (controlar con JS)
});

// Posicionamiento relativo
tl
	.to('.a', { x: 100 })
	.to('.b', { x: 100 }, '-=0.5') // Iniciar 0.5s antes de que termine el anterior
	.to('.c', { x: 100 }, '<') // Iniciar con el anterior
	.to('.d', { x: 100 }, '>'); // Iniciar después del anterior (por defecto)

// Labels para timing complejo
tl
	.add('escenaUno')
	.to('.hero', { scale: 1.2, duration: 1 })
	.to('.title', { opacity: 1, y: 0 }, 'escenaUno+=0.5') // 0.5s después del label
	.add('escenaDos', '+=1')
	.to('.hero', { scale: 1, duration: 1 }, 'escenaDos');

// Controlar el timeline
tl.play(); // Reproducir desde posición actual
tl.pause(); // Pausar
tl.restart(); // Iniciar desde el principio
tl.reverse(); // Reproducir hacia atrás
tl.seek(2); // Saltar a 2 segundos
tl.timeScale(2); // Doble velocidad
```

---

**📂 Demo:** [demo/01-tweens-and-timelines.html](./demo/01-tweens-and-timelines.html)

> **Cita Anónima de Diseñador:**
> _"Pasé 3 horas anidando llamadas setTimeout y llorando. Luego aprendí sobre timelines de GSAP y me di cuenta de que podría haber estado en casa a la hora del almuerzo. Las lágrimas fueron desperdiciadas."_

---

## 🎨 Parte II: Técnicas Intermedias

### Easing: El Alma de la Animación

Las **funciones de easing** controlan la _velocidad de cambio_ durante una animación. Son lo que hace que el movimiento se sienta natural vs robótico.

```javascript
// Linear (robótico - evitar a menos que sea intencional)
gsap.to('.box', { x: 100, ease: 'linear' });

// Power eases (más comunes)
gsap.to('.box', { x: 100, ease: 'power1.out' }); // Desaceleración sutil
gsap.to('.box', { x: 100, ease: 'power2.out' }); // Desaceleración suave
gsap.to('.box', { x: 100, ease: 'power3.out' }); // Desaceleración fuerte
gsap.to('.box', { x: 100, ease: 'power4.out' }); // Desaceleración dramática

// Elastic (rebotante)
gsap.to('.box', { x: 100, ease: 'elastic.out(1, 0.3)' });

// Back (ligero sobrepaso)
gsap.to('.box', { x: 100, ease: 'back.out(1.7)' });

// Bounce (físico)
gsap.to('.box', { x: 100, ease: 'bounce.out' });

// Cubic-bezier personalizado
gsap.to('.box', { x: 100, ease: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' });
```

**Tabla de Referencia de Easing:**

| Tipo de Ease  | Cuándo Usar                          | Sensación            |
| ------------- | ------------------------------------ | -------------------- |
| `power1.out`  | Micro-interacciones, feedback UI     | Sutil, cortés        |
| `power2.out`  | Animaciones estándar, revelaciones   | Profesional, suave   |
| `power3.out`  | Secciones hero, énfasis              | Dramático, impactante|
| `elastic.out` | UI divertida, marcas alegres         | Rebotante, enérgico  |
| `back.out`    | Botones, elementos interactivos      | Ágil, satisfactorio  |
| `linear`      | Barras de progreso, movimiento mecánico | Velocidad constante |

**📂 Demo:** [demo/02-easing-visualizer.html](./demo/02-easing-visualizer.html)

> **Cita Anónima de Desarrollador:**
> _"Elegir el easing correcto es como sazonar la comida. No puedes verlo, pero todos saben cuándo está mal. Y tu diseñador definitivamente lo sabrá."_

---

### Stagger: Animaciones por Lotes con Estilo

Anima múltiples elementos con un retraso escalonado automáticamente.

```javascript
// Stagger básico
gsap.to('.card', {
	y: 0,
	opacity: 1,
	duration: 0.6,
	stagger: 0.1, // 0.1s entre cada tarjeta
});

// Opciones avanzadas de stagger
gsap.to('.card', {
	y: 0,
	opacity: 1,
	duration: 0.6,
	stagger: {
		amount: 1.5, // Tiempo total para escalonar (distribuido uniformemente)
		from: 'center', // 'start', 'center', 'end', 'edges', 'random', index
		grid: [3, 4], // Para layouts de grid [filas, cols]
		axis: 'x', // Escalonar a lo largo del eje x
		ease: 'power2.inOut',
	},
});

// Stagger desde índice específico
gsap.to('.item', {
	scale: 1.2,
	duration: 0.3,
	stagger: {
		each: 0.05,
		from: 5, // Iniciar desde índice 5
	},
});

// Stagger basado en función (control último)
gsap.to('.item', {
	y: -20,
	duration: 0.5,
	stagger: {
		each: 0.1,
		from: 'center',
		onStart: function () {
			console.log('Animando:', this.targets()[0]);
		},
	},
});
```

**📂 Demo:** [demo/03-stagger-effects.html](./demo/03-stagger-effects.html)

---

### ScrollTrigger: Animaciones Basadas en Scroll

**ScrollTrigger** es el plugin más popular de GSAP. Sincroniza animaciones con la posición del scroll.

```javascript
// Registrar el plugin
gsap.registerPlugin(ScrollTrigger);

// Animación básica activada por scroll
gsap.to('.box', {
  x: 500,
  scrollTrigger: {
    trigger: '.box',       // Elemento a observar
    start: 'top center',   // Cuando el top del trigger llega al center del viewport
    end: 'bottom center',  // Cuando el bottom del trigger llega al center
    scrub: true,           // Animar en sincronía con el scroll
    markers: true          // Mostrar marcadores visuales (debugging)
  }
});

// Posiciones start/end explicadas:
// Formato: "posiciónTrigger posiciónViewport"
// Trigger: top, center, bottom, o pixels/porcentaje
// Viewport: top, center, bottom, o pixels/porcentaje

// Ejemplos
scrollTrigger: {
  start: 'top 80%',      // Cuando top del trigger llega al 80% del viewport
  end: 'bottom 20%',     // Cuando bottom llega al 20% del viewport
}

// Timeline con ScrollTrigger
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,            // Scrubbing suave (1 segundo de lag)
    pin: true,           // Pin el elemento trigger
    anticipatePin: 1     // Pinning suave
  }
});

tl.to('.hero', { scale: 1.5, duration: 1 })
  .to('.hero', { opacity: 0, duration: 1 });

// Toggle de clase en scroll
ScrollTrigger.create({
  trigger: '.section',
  start: 'top center',
  end: 'bottom center',
  onEnter: () => console.log('Enter'),
  onLeave: () => console.log('Leave'),
  onEnterBack: () => console.log('Enter back'),
  onLeaveBack: () => console.log('Leave back'),
  toggleClass: { targets: '.section', className: 'is-active' }
});

// Efecto parallax
gsap.to('.bg', {
  y: 300,
  ease: 'none',
  scrollTrigger: {
    trigger: '.section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
```

**📂 Demo:** [demo/04-scrolltrigger-intro.html](./demo/04-scrolltrigger-intro.html)

> **Cita Anónima de Diseñador:**
> _"Antes de ScrollTrigger: 200 líneas de event listeners de scroll y requestAnimationFrame. Después: 5 líneas. Tuve una crisis existencial sobre lo que he estado haciendo con mi vida."_

---

## 🚀 Parte III: Técnicas Avanzadas

### Animación SVG: Más Allá de las Limitaciones de CSS

GSAP añade herramientas para secuenciar SVG, dibujar segmentos parciales y emparejar rutas. CSS también permite dibujar rutas completas y puede interpolar algunos paths compatibles cuando el navegador admite `d: path()`.

#### Dibujo de Paths SVG

```javascript
// Método CSS: dibujo completo con stroke-dashoffset
gsap.to('.path', {
	strokeDashoffset: 0,
	duration: 2,
});

// DrawSVG: segmentos parciales y control integrado con GSAP
gsap.from('.path', {
	drawSVG: 0, // Dibujar desde 0% hasta 100%
	duration: 2,
	ease: 'power1.inOut',
});

// Dibujar desde el centro hacia fuera
gsap.from('.path', {
	drawSVG: '50% 50%', // Iniciar en el centro
	duration: 2,
});

// Efecto de firma animada
const tl = gsap.timeline();
tl
	.from('.sig-path-1', { drawSVG: 0, duration: 0.8 })
	.from('.sig-path-2', { drawSVG: 0, duration: 0.6 }, '-=0.2')
	.from('.sig-path-3', { drawSVG: 0, duration: 0.5 }, '-=0.2');
```

#### SVG Morphing

```javascript
// MorphSVG: disponible como plugin GSAP desde npm (GSAP 3.13+)
gsap.to('#circle', {
	morphSVG: '#star', // Transformar círculo en estrella
	duration: 2,
	ease: 'power2.inOut',
});

// Alternativa gratuita: Animar puntos individuales del path
gsap.to('.morph-path', {
	attr: { d: 'M100,50 L150,100 L50,100 Z' }, // Nueva definición de path
	duration: 2,
	ease: 'power2.inOut',
});
```

#### Transformaciones SVG

```javascript
// Animar elementos SVG con origen de transformación
gsap.to('.svg-circle', {
	rotation: 360,
	scale: 1.5,
	transformOrigin: '50% 50%', // Centro del elemento
	duration: 2,
	ease: 'back.out(1.7)',
});

// Animar a lo largo de un path (plugin MotionPath)
gsap.to('.dot', {
	motionPath: {
		path: '#path', // Path SVG a seguir
		align: '#path', // Alinear a la tangente del path
		autoRotate: true, // Rotar para coincidir con la dirección del path
		alignOrigin: [0.5, 0.5], // Centro del elemento
	},
	duration: 5,
	ease: 'none',
	repeat: -1,
});
```

**📂 Demo:** [demo/05-svg-animations.html](./demo/05-svg-animations.html)

---

### Interacciones Complejas: Mouse, Drag, Scroll

#### Animación de Seguimiento del Mouse

```javascript
let mouse = { x: 0, y: 0 };
let cursor = { x: 0, y: 0 };

window.addEventListener('mousemove', (e) => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

// Seguimiento suave con quickTo de GSAP
const xTo = gsap.quickTo('.cursor', 'x', { duration: 0.6, ease: 'power3' });
const yTo = gsap.quickTo('.cursor', 'y', { duration: 0.6, ease: 'power3' });

gsap.ticker.add(() => {
	xTo(mouse.x);
	yTo(mouse.y);
});
```

#### Efectos Hover

```javascript
const buttons = gsap.utils.toArray('.btn');

buttons.forEach((btn) => {
	const icon = btn.querySelector('.icon');

	btn.addEventListener('mouseenter', () => {
		gsap.to(icon, {
			x: 5,
			rotation: 15,
			duration: 0.3,
			ease: 'back.out(2)',
		});
	});

	btn.addEventListener('mouseleave', () => {
		gsap.to(icon, {
			x: 0,
			rotation: 0,
			duration: 0.3,
			ease: 'power2.out',
		});
	});
});
```

#### Elementos Arrastrables (plugin Draggable)

```javascript
gsap.registerPlugin(Draggable);

Draggable.create('.box', {
	type: 'x,y', // Arrastrar en cualquier dirección
	bounds: '.container', // Restringir al contenedor
	inertia: true, // Momento basado en física
	onDrag: function () {
		console.log(this.x, this.y);
	},
});

// Ajustar a cuadrícula
Draggable.create('.box', {
	type: 'x,y',
	snap: {
		x: (value) => Math.round(value / 50) * 50, // Cuadrícula de 50px
		y: (value) => Math.round(value / 50) * 50,
	},
});
```

**📂 Demo:** [demo/06-interactive-animations.html](./demo/06-interactive-animations.html)

---

### Optimización de Rendimiento

**GSAP ya está altamente optimizado, pero puedes ayudar:**

```javascript
// ✅ BUENO: Animar transformaciones y opacidad (acelerado por GPU)
gsap.to('.box', { x: 100, y: 50, rotation: 45, opacity: 0.5 });

// ❌ MALO: Animar propiedades de layout (provoca reflow)
gsap.to('.box', { top: 100, left: 50, width: 200 });

// Usar will-change para animaciones complejas
gsap.set('.animated', { willChange: 'transform, opacity' });

// Limpiar will-change al terminar
tl.to('.box', { /* animación */ })
  .call(() => gsap.set('.box', { clearProps: 'willChange' }));

// Agrupar lecturas del DOM para prevenir layout thrashing
const positions = gsap.utils.toArray('.item').map(el => {
  return { x: el.offsetLeft, y: el.offsetTop };
});

// Luego animar con esos valores
positions.forEach((pos, i) => {
  gsap.from('.item')[i], { x: pos.x, y: pos.y });
});

// Usar invalidateOnRefresh para animaciones responsive
ScrollTrigger.create({
  trigger: '.section',
  start: 'top top',
  end: () => `+=${document.querySelector('.section').offsetHeight}`,
  invalidateOnRefresh: true  // Recalcular al redimensionar ventana
});
```

**Depuración:**

```javascript
// Habilitar herramientas de depuración de GSAP
GSAPDebugger.create();

// Registrar progreso del timeline
tl.eventCallback('onUpdate', () => {
	console.log('Progreso:', tl.progress());
});

// Visualizar marcadores de ScrollTrigger
ScrollTrigger.create({
	trigger: '.section',
	markers: {
		startColor: 'green',
		endColor: 'red',
		fontSize: '18px',
		fontWeight: 'bold',
		indent: 20,
	},
});

// Verificar conflictos de animación
gsap.globalTimeline.getChildren().forEach((tween) => {
	console.log('Target:', tween.targets(), 'Progreso:', tween.progress());
});
```

---

## 🎨 Patrones de Diseño y Mejores Prácticas

### Micro-interacciones

```javascript
// Feedback de clic en botón
function animateButton(btn) {
	const tl = gsap.timeline();

	tl.to(btn, { scale: 0.95, duration: 0.1 }).to(btn, { scale: 1, duration: 0.2, ease: 'back.out(3)' });

	return tl;
}

document.querySelectorAll('.btn').forEach((btn) => {
	btn.addEventListener('click', () => animateButton(btn));
});
```

### Transiciones de Página

```javascript
function pageTransition() {
	const tl = gsap.timeline();

	// Animación de salida
	tl.to('.old-content', {
		opacity: 0,
		y: -50,
		duration: 0.4,
		ease: 'power2.in',
	});

	// Animación de entrada
	tl.from(
		'.new-content',
		{
			opacity: 0,
			y: 50,
			duration: 0.6,
			ease: 'power2.out',
		},
		'-=0.2'
	);

	return tl;
}
```

### Secuencias de Carga

```javascript
function loadingAnimation() {
	const tl = gsap.timeline();

	// Escalonar entrada de elementos del logo
	tl.from('.logo-path', {
		drawSVG: 0,
		duration: 1,
		stagger: 0.2,
		ease: 'power2.out',
	});

	// Fade in del texto
	tl.from(
		'.brand-name',
		{
			opacity: 0,
			y: 20,
			duration: 0.8,
			ease: 'power3.out',
		},
		'-=0.5'
	);

	// Escalar y ocultar
	tl.to(
		'.loader',
		{
			scale: 3,
			opacity: 0,
			duration: 0.8,
			ease: 'power4.in',
		},
		'+=0.5'
	);

	return tl;
}
```

**📂 Demo:** [demo/07-design-patterns.html](./demo/07-design-patterns.html)

---

## 🛠️ Ejercicios Prácticos

### Nivel 1: Fundamentos (Requerido)

1. **Navegación Animada**

   - Crea un menú nav que se deslice al cargar la página
   - Añade efectos hover a los items del menú con GSAP
   - Anima un icono de hamburguesa abrir/cerrar

2. **Tarjetas con Scroll-Reveal**

   - Grid de tarjetas que aparezcan y suban al hacer scroll
   - Usa stagger para revelación secuencial
   - Añade efecto parallax a las imágenes de las tarjetas

3. **Botón Interactivo**
   - Crea un botón con animación de carga
   - Anima estados de éxito/error
   - Añade micro-interacciones satisfactorias

### Nivel 2: Intermedio (Recomendado)

4. **Sección Hero Animada**

   - Revelamientos de texto con animación split-text
   - Parallax de fondo al hacer scroll
   - Scroll suave a la siguiente sección

5. **Animación de Logo SVG**

   - Anima paths del logo dibujándose al cargar la página
   - Añade efecto hover que transforme colores
   - Crea animación de pulso sutil infinita

6. **Transición de Modal**
   - Animación suave de apertura/cierre de modal
   - Fade de backdrop con efecto blur
   - Animación stagger-in del contenido

### Nivel 3: Avanzado (Para los Valientes)

7. **Galería de Scroll Horizontal**

   - Crea una sección de scroll horizontal
   - Pin la sección mientras haces scroll horizontal del contenido
   - Añade capas parallax a diferentes velocidades

8. **Animación Basada en Física**

   - Implementa elementos arrastrables con inercia
   - Crea efecto de botón magnético (elementos atraídos al cursor)
   - Construye un sistema de animación flotante/bamboleante

9. **Secuencia Compleja de Timeline**

   - Construye una historia animada multi-escena
   - Sincroniza 10+ animaciones con labels
   - Añade controles pausar/reproducir/reiniciar
   - Crea navegación por capítulos

10. **Animación de SVG Morphing**
    - Transforma entre 5 formas diferentes suavemente
    - Crea un set de iconos animados
    - Construye un logo que cambia de forma

**📂 Ejercicios Iniciales:** [demo/exercises/](./demo/exercises/)

---

## 🌟 Ideas de Showcase Avanzado para Estudiantes

Para estudiantes listos para superar límites:

### 1. **Experiencia de Storytelling Inmersiva**

Construye un sitio de storytelling parallax donde el scroll revele capítulos narrativos con animaciones complejas, ilustraciones SVG y tipografía dinámica.

**Inspiración:**

- Páginas de productos Apple
- [Every Last Drop](http://everylastdrop.co.uk/)
- [Bruno Simon Portfolio](https://bruno-simon.com/)

### 2. **Visualización Interactiva de Datos**

Anima gráficos y charts que respondan al scroll o input del usuario. Transforma entre diferentes vistas de datos suavemente.

**Técnicas:**

- MorphSVG para transiciones de gráficos
- ScrollTrigger para revelaciones de datos
- Easing personalizado para movimiento data-feel

### 3. **Integración WebGL + GSAP**

Combina Three.js (gráficos 3D) con GSAP para animaciones de cámara y transiciones de escena.

**Ejemplo:**

```javascript
const camera = new THREE.PerspectiveCamera(/*...*/);

gsap.to(camera.position, {
	z: 10,
	scrollTrigger: {
		trigger: '.section',
		start: 'top top',
		end: 'bottom top',
		scrub: true,
	},
});
```

### 4. **Animación de Arte Generativo**

Crea patrones en evolución usando GSAP para animar parámetros de dibujos en canvas o patrones SVG.

### 5. **Animación Controlada por Voz**

Usa Web Speech API para disparar animaciones GSAP basadas en comandos de voz o niveles de sonido.

```javascript
const recognition = new webkitSpeechRecognition();

recognition.onresult = (event) => {
	const command = event.results[0][0].transcript;

	if (command.includes('explotar')) {
		explodeAnimation();
	}
};
```

---

## 📚 Recursos y Referencias

### Documentación Oficial

- [Docs GSAP](https://greensock.com/docs/) — Referencia completa de la API
- [Aprendizaje GSAP](https://greensock.com/learning/) — Tutoriales en video y guías
- [Demos ScrollTrigger](https://codepen.io/collection/AEbkkJ) — Colección oficial de demos
- [Visualizador de Easing](https://greensock.com/ease-visualizer/) — Herramienta interactiva de easing

### Comunidad y Aprendizaje

- [Foros GreenSock](https://greensock.com/forums/) — Obtén ayuda de expertos de GSAP
- [Colección GSAP en CodePen](https://codepen.io/collection/DYqKXQ) — Demos de la comunidad
- [Guía GSAP CSS-Tricks](https://css-tricks.com/writing-smarter-animation-code/) — Artículos y tutoriales
- [Hoja de Referencia GSAP](https://ihatetomatoes.net/greensock-cheat-sheet/) — Referencia rápida

### Inspiración

- [Sitios GSAP en Awwwards](https://www.awwwards.com/websites/gsap-animation/) — Ejemplos premiados
- [Demos Codrops](https://tympanus.net/Development/) — Experimentos de codificación creativa
- [Active Theory](https://activetheory.net/) — Trabajo GSAP de calidad profesional
- [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/) — Librería de scroll suave

### Temas Avanzados

- [Instalación de GSAP](https://gsap.com/docs/v3/Installation/) — plugins como DrawSVG y MorphSVG disponibles desde npm en GSAP 3.13+
- [React GSAP](https://github.com/bitworking/react-gsap) — GSAP en React
- [GSAP + Three.js](https://tympanus.net/codrops/2019/10/14/how-to-create-an-interactive-3d-character-with-three-js/) — Integración de animación 3D
- [Rendimiento GSAP](https://css-tricks.com/myth-busting-css-animations-vs-javascript/) — Profundización en optimización

### Libros y Cursos

- _"Web Animation using JavaScript"_ de Julian Shapiro — Cubre GSAP en profundidad
- _"SVG Animations"_ de Sarah Drasner — Técnicas SVG + GSAP
- [Frontend Masters: Curso de Animaciones Web](https://frontendmasters.com/courses/web-animation/) — Curso en video

---

## 💬 Sabiduría desde las Trincheras

<figure class="quote">
  <blockquote>
    GSAP es la diferencia entre 'animé algo' y 'animé algo que la gente realmente quiere ver'. CSS es como acuarelas. GSAP es como tener un equipo de filmación.
  </blockquote>
  <figcaption>
    &mdash; Cita Anónima de Diseñador-Desarrollador #1
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    Mi primer timeline de GSAP tenía 300 líneas de código. Luego aprendí sobre defaults y posicionamiento relativo. Ahora son 30 líneas y duermo por las noches.
  </blockquote>
  <figcaption>
    &mdash; Cita Anónima de Diseñador-Desarrollador #2
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    Cliente: '¿Puedes hacer que rebote?' Yo con CSS: 'Puedo intentarlo...' Yo con GSAP: '¿Qué tan rebotante lo quieres y te gustaría que rotara mientras rebota?'
  </blockquote>
  <figcaption>
    &mdash; Cita Anónima de Diseñador-Desarrollador #3
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    Le mostré una demo de ScrollTrigger a mi diseñador. Preguntaron si podíamos hacer todo el sitio así. Dije que sí. No he dormido en tres días. Valió la pena.
  </blockquote>
  <figcaption>
    &mdash; Cita Anónima de Diseñador-Desarrollador #4
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    Aprender timelines de GSAP fue como descubrir que no tienes que lavar los platos de uno en uno. Puedes cargar el lavavajillas. Y programarlo. Y se limpia solo.
  </blockquote>
  <figcaption>
    &mdash; Cita Anónima de Diseñador-Desarrollador #5
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    Antes de GSAP: 'Esta animación no funciona en Safari.' Después de GSAP: '¿Espera, funciona en Safari?' El listón de felicidad es muy bajo en desarrollo web.
  </blockquote>
  <figcaption>
    &mdash; Cita Anónima de Diseñador-Desarrollador #6
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    GSAP 3.13 y versiones posteriores publican sus plugins en npm. Decide si DrawSVG o MorphSVG ahorran suficiente trabajo de autoría para justificar la dependencia adicional.
  </blockquote>
  <figcaption>
    &mdash; Cita Anónima de Diseñador-Desarrollador #7
  </figcaption>
</figure>

<figure class="quote">
  <blockquote>
    Mi sitio portfolio tiene una animación de intro de 2 segundos. Me tomó 2 semanas hacerla. Por esto los diseñadores no simplemente 'lo animan rápido'.
  </blockquote>
  <figcaption>
    &mdash; Cita Anónima de Diseñador-Desarrollador #8
  </figcaption>
</figure>

---

## 🎯 Conclusiones Clave

### Cuándo Usar GSAP vs CSS

| Caso de Uso          | Animaciones CSS | GSAP                 |
| -------------------- | --------------- | -------------------- |
| Efectos hover simples| ✅ Perfecto     | ⚠️ Excesivo          |
| Secuencias complejas | ❌ Doloroso     | ✅ Perfecto          |
| SVG morphing         | ⚠️ Solo entre rutas compatibles y en navegadores que admiten `d: path()` | ✅ Fácil con `MorphSVG` |
| Control de timeline  | ❌ Limitado     | ✅ Poderoso          |
| Animaciones de scroll| ⚠️ Experimental | ✅ Listo para producción |
| Rendimiento          | ✅ Bueno        | ✅ Mejor             |
| Soporte navegadores  | ⚠️ Varía        | ✅ Consistente       |
| Curva de aprendizaje | Fácil           | Moderada             |
| Tamaño de archivo    | 0KB             | ~50KB (core gzipped) |

### El Árbol de Decisión GSAP

```
¿Necesitas animación?
├─ ¿Es un estado hover/focus simple?
│  └─ SÍ → Usa CSS :hover con transition
│
├─ ¿Necesita secuenciarse con otras animaciones?
│  └─ SÍ → Usa Timeline de GSAP
│
├─ ¿Necesita sincronizarse con scroll?
│  └─ SÍ → Usa ScrollTrigger de GSAP
│
├─ ¿Necesita transformar formas SVG?
│  └─ SÍ → Usa GSAP (plugin MorphSVG)
│
├─ ¿Necesita control preciso y depuración?
│  └─ SÍ → Usa GSAP
│
└─ ¿Es un loop de keyframe sin interacción?
   └─ TAL VEZ → CSS está bien, pero GSAP da más control
```

### Patrones Esenciales para Recordar

1. **Empieza con timelines** — Incluso si crees que necesitas solo un tween
2. **Usa defaults** — Establece propiedades comunes a nivel de timeline
3. **Posicionamiento relativo** — `'-=0.5'`, `'<'`, `'>'` son tus amigos
4. **Labels para secuencias complejas** — Nombra tus escenas
5. **Separa lógica de animación** — Mantén el código de animación modular
6. **Mejora progresiva** — El sitio debe funcionar sin GSAP
7. **Respeta `prefers-reduced-motion`** — Accesibilidad primero

```javascript
// Verificación de accesibilidad
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
	gsap.globalTimeline.timeScale(100); // Animaciones instantáneas
	// O deshabilitar completamente:
	// gsap.config({ force3D: false, autoSleep: 60 });
}
```

---

## 🎪 Exhibición: Muestra Tu Trabajo

Una vez que hayas construido tus animaciones potenciadas por GSAP:

1. **Despliega** tu proyecto en GitHub Pages o Netlify
2. **Documenta** tu estrategia de animación:
   - ¿Por qué GSAP sobre CSS para este proyecto?
   - ¿Qué técnicas proporcionaron más valor?
   - ¿Qué te desafió más?
3. **Presenta** (3 minutos):
   - Una animación compleja de la que estés orgulloso
   - Explica la estructura del timeline
   - Razona las decisiones de timing desde el punto de vista UX
4. **Critica** el trabajo de un compañero:
   - ¿La animación sirve al contenido o distrae?
   - ¿El timing es natural o mecánico?
   - Sugiere una mejora

**Criterios de Evaluación:**

| Criterio                | Peso | Lo Que Buscamos                                        |
| ----------------------- | ---- | ------------------------------------------------------ |
| **Ejecución Técnica**   | 30%  | Código limpio, uso apropiado de timelines, rendimiento |
| **Integración de Diseño**| 25% | La animación sirve a la UX, mejora el contenido        |
| **Creatividad**         | 20%  | Aplicación única de técnicas                           |
| **Pulido**              | 15%  | Easing suave, buen timing, detalles                    |
| **Accesibilidad**       | 10%  | Respeta prefers-reduced-motion, no bloquea contenido   |

---

## 🚀 Próximos Pasos

**Inmediato:**

1. Completa los 10 ejercicios prácticos
2. Añade animaciones GSAP a tu proyecto portfolio
3. Experimenta con ScrollTrigger en tu landing page

**Esta Semana:**

1. Únete a los [Foros GreenSock](https://greensock.com/forums/)
2. Estudia 3 sitios GSAP de Awwwards — inspecciona su código
3. Recrea una animación que admires

**Este Mes:**

1. Compara los [plugins de GSAP](https://gsap.com/docs/v3/Plugins/) con CSS y WAAPI antes de añadir dependencias
2. Construye una pieza interactiva compleja
3. Comparte tu trabajo en Twitter/CodePen con #GSAP

**Largo Plazo:**

1. Domina la integración React/Vue + GSAP
2. Explora GSAP + WebGL (Three.js)
3. Construye una librería de animaciones GSAP para tu design system

---

**Próxima Lección**: [Animaciones Canvas & WebGL](../canvas/) _(Próximamente)_

**Lección Anterior**: [Animaciones CSS](../css/)

**Licencia**: Contenido CC BY-NC-SA 4.0 · Código MIT
**Autor**: Rubén Vega Balbás, PhD · [UDIT](https://www.udit.es)

---

> **Cita Anónima Final:**
> _"Empecé a aprender GSAP para hacer que las cosas se movieran. Me quedé porque me di cuenta de que me hace mejor diseñador. Entender timing, easing y secuencias te hace pensar diferente sobre cada interacción. Además, los timelines son simplemente **chef's kiss**."_
