---
layout: lesson
title: 'GSAP para Diseñadores: Dominio de Tipografía y Animación SVG'
title_alt: 'GSAP for Designers: Typography & SVG Animation Mastery'
slug: gsap-overview
date: 2025-12-11
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/gsap/overview/
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> El movimiento es una capa temporal de comunicación con coste.</p>
<p><strong>Lente de campo:</strong> **Ancla de práctica:** timing, easing, jerarquía, feedback y animación consciente del rendimiento. **Señal de frontera:** motion scroll-driven y 3D/GPU amplían la capa expresiva.</p>
</aside>

> **Prueba de estudio:** Añade comportamiento con reduced-motion y anota una observación de rendimiento.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Para quién es / Para quién no

**Para:** Front-End I **Sesión 11** — GSAP vía CDN en tu portfolio: un motion tipográfico, un demo SVG o scroll-driven, respetando `prefers-reduced-motion`.

**No para:** plugins Club GSAP/npm fuera del alcance de la lección, librerías React de animación (semestre 2), ni motion que oculte contenido a usuarios de teclado.

**Al terminar esta sesión tendrás:** GSAP cargado en tu sitio, al menos un timeline o tween commiteado y fallback reduced-motion documentado.

---

## Antes de empezar

| Requisito | ¿Obligatorio? |
| --- | --- |
| Sesiones 7–10 completas (JS + módulos + linting) | Sí |
| Portfolio con HTML semántico + tokens CSS | Sí |
| Texto o SVG en la página para animar | Sí |

**Tiempo oficial:** 3 h de clase + 1,5 h de laboratorio.

---

## Sigue este camino

| Paso | Acción | Sección |
| --- | --- | --- |
| 1 | Lee el Tao del Movimiento + encuadre accesibilidad | Tao del Movimiento / Parte VII |
| 2 | Añade CDN GSAP; ejecuta Demo 01 en local | Parte I |
| 3 | Anima titular o split de palabras en tu portfolio | Parte II |
| 4 | Añade un acento SVG o ScrollTrigger (profundidad opcional) | Parte III o VI |
| 5 | Añade override `@media (prefers-reduced-motion: reduce)` | Accesibilidad |
| 6 | Commit + nota de rendimiento (una observación DevTools) | Entrega |

---

## Comprueba antes de salir

- [ ] La animación corre en GitHub Pages (scripts CDN por HTTPS)
- [ ] Contenido legible con animación desactivada o reduced-motion activo
- [ ] Sin parpadeos tipo convulsión; duraciones intencionadas
- [ ] Focus de teclado no atrapado ni oculto por el motion
- [ ] Commit subido

---

## Fallos frecuentes

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| `gsap is not defined` | Orden de scripts o CDN bloqueado | Carga GSAP antes de tu script init |
| Layout shift al cargar | Animar width/height sin reserva | Prefiere `transform` y `opacity` |
| ScrollTrigger no dispara | Falta registro del plugin o trigger incorrecto | Sigue la Parte VI al pie de la letra |
| Motion mareante | Ignorado reduced-motion | Condiciona timelines con `matchMedia` |
| Demo copiada no encaja | Snippet Awwwards pegado entero | Adapta timing a tu escala tipográfica |

---

## Entrega (evidencia Sesión 11)

- Commit con integración GSAP en el portfolio
- Una frase: objetivo de usuario que sirve el motion + una cosa que rechazaste animar

---

## 🎭 El Tao del Movimiento

> _"El SVG escala infinitamente y sigue siendo exactamente lo que es. Sé como el SVG."_
> — Tao del Desarrollador

Antes de animar una sola letra, pausa. La animación no es decoración: es **comunicación**. La diferencia entre un portfolio premiado en Awwwards y uno que molesta a quien lo visita no está en la complejidad técnica, sino en la **intencionalidad**.

> _"La animación no va de mover cosas. Va de mover personas."_

Como diseñadores aprendiendo desarrollo, ya entiendes jerarquía visual, timing y resonancia emocional. GSAP es la herramienta que traduce tu intuición de diseño en interfaces vivas.

---

## ⏰ Duración estimada

**120 minutos** (2 sesiones o 1 taller extendido)

---

## 🎯 Objetivos de aprendizaje

Al final de esta lección podrás:

- **Instalar** GSAP vía CDN y entender cuándo usar npm
- **Animar** tipografía con reveals carácter a carácter, kinetic type y efectos de texto
- **Dominar** animación SVG: path drawing, morphing y transforms
- **Crear** timelines que secuencian animaciones complejas con precisión
- **Aplicar** funciones easing naturales e intencionadas
- **Construir** animaciones scroll-triggered con ScrollTrigger
- **Pensar críticamente** cuándo el motion mejora o distrae la experiencia

---

## 🔍 Perspectiva crítica: ¿Por qué GSAP?

### El muro de limitaciones de CSS

Has aprendido animaciones CSS. Son elegantes para transiciones simples. Pero como diseñador chocarás pronto con límites:

| Intención de diseño | Realidad CSS | Solución GSAP |
|--------------|-------------|---------------|
| "Animar cada letra en secuencia" | Delays manuales por carácter | `SplitText` + `stagger` |
| "Dibujar este logo al hacer scroll" | Control limitado de `stroke-dashoffset` | `DrawSVG` + `ScrollTrigger` |
| "Morphing círculo a estrella" | Imposible | plugin `MorphSVG` |
| "Sincronizar 10 animaciones" | Callback hell | `Timeline` con labels |
| "Pausar, revertir, scrub con scroll" | No posible | Control total de reproducción |

### 🤔 Prompt crítico ATELIER #1

**Antes de animar nada, pregúntate:**

1. **Propósito**: ¿Qué comunica este motion?
2. **Jerarquía**: ¿Guía la mirada o compite por atención?
3. **Accesibilidad**: ¿Respeta `prefers-reduced-motion`?
4. **Rendimiento**: ¿Correrá a 60fps en móvil?

> _"Escribe código para humanos primero, para máquinas después; el Tao está en equilibrar ambos."_
> — Tao del Desarrollador

---

## 🚀 Parte I: Instalación y primera animación

### Método: CDN (recomendado para aprender)

En este curso usamos CDN para centrarnos en la API de GSAP sin complejidad de build tools.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GSAP Typography Demo</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: system-ui, -apple-system, sans-serif;
      background: #0a0a0a;
      color: #fafafa;
    }
    .hero-title {
      font-size: clamp(3rem, 10vw, 8rem);
      font-weight: 700;
      letter-spacing: -0.02em;
    }
  </style>
</head>
<body>
  <h1 class="hero-title">Hello GSAP</h1>

  <!-- GSAP Core -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  
  <script>
    // Your first animation!
    gsap.to('.hero-title', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    });
  </script>
</body>
</html>
```

**📂 Demo:** [demos/01-first-animation.html](./demos/01-first-animation.html)

### Entender la sintaxis

```javascript
gsap.from(target, { properties });
gsap.to(target, { properties });
gsap.fromTo(target, { from }, { to });
```

| Método | Comportamiento |
|--------|----------|
| `gsap.from()` | Anima DESDE estos valores HACIA el estado actual |
| `gsap.to()` | Anima HACIA estos valores DESDE el estado actual |
| `gsap.fromTo()` | Valores inicio y fin explícitos |

En el primer ejemplo animamos el título con `gsap.from`:

```javascript
gsap.from('.hero-title', {
  opacity: 0,
  y: 100,
  duration: 1.2,
  ease: 'power3.out'
});
```

El mismo efecto con `gsap.to` sería:

```javascript
// Requires the element to start in CSS at opacity: 0 and translateY(100px)
gsap.to('.hero-title', {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: 'power3.out'
});
```

Usa `from` cuando quieras *tirar* del elemento hacia su estado natural desde un inicio implícito; usa `to` cuando controles el estado inicial en CSS o JavaScript.

### Propiedades principales

```javascript
gsap.to('.element', {
  // Transform properties (GPU-accelerated)
  x: 100,           // translateX in pixels
  y: 50,            // translateY in pixels
  rotation: 45,     // degrees
  scale: 1.2,       // uniform scale
  
  // CSS properties
  opacity: 0.5,
  color: '#ff0000',
  
  // Timing
  duration: 1,      // seconds
  delay: 0.5,       // delay before start
  ease: 'power2.out',
  
  // Callbacks
  onStart: () => console.log('Started'),
  onComplete: () => console.log('Done')
});
```

> _"Experience is simply the name we give to our bugs after we fix them."_
> — Tao del Desarrollador

---

## 🔤 Parte II: Animación tipográfica

La tipografía es el alma del diseño. El type animado transforma una página estática en experiencia emocional.

### Nivel 1: Reveal palabra a palabra

```html
<h1 class="headline">
  <span class="word">Design</span>
  <span class="word">with</span>
  <span class="word">intention</span>
</h1>
```

```css
.headline {
  font-size: clamp(2rem, 8vw, 6rem);
  font-weight: 800;
  overflow: hidden;
}
.word {
  display: inline-block;
  margin-right: 0.3em;
}
```

```javascript
gsap.from('.word', {
  y: '100%',
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  stagger: 0.15
});
```

**📂 Demo:** [demos/02-word-reveal.html](./demos/02-word-reveal.html)

### Nivel 2: Animación carácter a carácter

Para control por carácter, dividimos el texto en spans:

```html
<h1 class="split-text">Typography</h1>
```

```javascript
// Dividir texto en caracteres (enfoque manual)
const text = document.querySelector('.split-text');
const chars = text.textContent.split('');
text.innerHTML = chars.map(char => 
  `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`
).join('');

// Animar cada carácter
gsap.from('.char', {
  y: 50,
  opacity: 0,
  rotation: -15,
  duration: 0.6,
  ease: 'back.out(1.7)',
  stagger: 0.03
});
```

**📂 Demo:** [demos/03-char-animation.html](./demos/03-char-animation.html)

### Nivel 3: Tipografía cinética

Crea texto dinámico que responde a la interacción:

```javascript
const chars = gsap.utils.toArray('.char');

chars.forEach((char, i) => {
  char.addEventListener('mouseenter', () => {
    gsap.to(char, {
      y: -20,
      scale: 1.3,
      color: '#3b82f6',
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  char.addEventListener('mouseleave', () => {
    gsap.to(char, {
      y: 0,
      scale: 1,
      color: '#fafafa',
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  });
});
```

**📂 Demo:** [demos/04-kinetic-type.html](./demos/04-kinetic-type.html)

### Nivel 4: Efecto máquina de escribir

```javascript
const text = "Design is how it works.";
const container = document.querySelector('.typewriter');

gsap.to(container, {
  duration: text.length * 0.05,
  text: {
    value: text,
    delimiter: ""
  },
  ease: "none"
});
```

> **Nota:** el plugin `text` requiere TextPlugin. Por CDN:
> ```html
> <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/TextPlugin.min.js"></script>
> ```

**📂 Demo:** [demos/05-typewriter.html](./demos/05-typewriter.html)

### Nivel 5: Efecto scramble de texto

```javascript
gsap.registerPlugin(TextPlugin);

gsap.to('.scramble', {
  duration: 2,
  text: {
    value: "AWWWARDS",
    newClass: "revealed"
  },
  scrambleText: {
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    revealDelay: 0.5,
    speed: 0.3
  },
  ease: "none"
});
```

**📂 Demo:** [demos/06-scramble-text.html](./demos/06-scramble-text.html)

---

## 🎨 Parte III: Dominio de animación SVG

> _"A thousand PNGs can be replaced by one SVG. This is not optimization. This is enlightenment."_
> — Tao del Desarrollador

La animación SVG es donde GSAP brilla. Como diseñadores trabajáis con vector a diario — ahora podéis darle vida.

### Nivel 1: Transforms SVG básicos

```html
<svg viewBox="0 0 200 200" width="200" height="200">
  <circle class="circle" cx="100" cy="100" r="40" fill="#3b82f6"/>
</svg>
```

```javascript
gsap.to('.circle', {
  scale: 1.5,
  rotation: 360,
  transformOrigin: '50% 50%',
  duration: 2,
  ease: 'elastic.out(1, 0.3)',
  repeat: -1,
  yoyo: true
});
```

**📂 Demo:** [demos/07-svg-transforms.html](./demos/07-svg-transforms.html)

### Nivel 2: Efecto path drawing

El efecto "drawing" que da vida a los logos:

```html
<svg viewBox="0 0 400 200" width="400" height="200">
  <path class="logo-path" 
        d="M 50 100 Q 100 50 150 100 T 250 100 T 350 100"
        fill="none" 
        stroke="#fafafa" 
        stroke-width="3"
        stroke-linecap="round"/>
</svg>
```

```javascript
// Obtener la longitud total del path
const path = document.querySelector('.logo-path');
const length = path.getTotalLength();

// Configurar estado inicial
gsap.set(path, {
  strokeDasharray: length,
  strokeDashoffset: length
});

// Animar el dibujo
gsap.to(path, {
  strokeDashoffset: 0,
  duration: 2,
  ease: 'power2.inOut'
});
```

**📂 Demo:** [demos/08-path-drawing.html](./demos/08-path-drawing.html)

### Nivel 3: Animación logo multi-path

```javascript
const paths = gsap.utils.toArray('.logo-path');
const tl = gsap.timeline();

paths.forEach((path, i) => {
  const length = path.getTotalLength();
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length
  });
  
  tl.to(path, {
    strokeDashoffset: 0,
    duration: 1,
    ease: 'power1.inOut'
  }, i * 0.2); // Escalonar tiempos de inicio
});
```

**📂 Demo:** [demos/09-multi-path-logo.html](./demos/09-multi-path-logo.html)

### Nivel 4: Morphing SVG (animación de path)

Transforma una forma en otra:

```html
<svg viewBox="0 0 200 200" width="200" height="200">
  <path class="morph-shape" 
        d="M100,20 L180,180 L20,180 Z" 
        fill="#3b82f6"/>
</svg>
```

```javascript
// Triángulo a círculo a cuadrado
const shapes = {
  triangle: "M100,20 L180,180 L20,180 Z",
  circle: "M100,20 C155,20 180,70 180,100 C180,155 130,180 100,180 C45,180 20,130 20,100 C20,45 70,20 100,20 Z",
  square: "M30,30 L170,30 L170,170 L30,170 Z"
};

const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

tl.to('.morph-shape', {
  attr: { d: shapes.circle },
  duration: 1,
  ease: 'power2.inOut'
})
.to('.morph-shape', {
  attr: { d: shapes.square },
  duration: 1,
  ease: 'power2.inOut'
})
.to('.morph-shape', {
  attr: { d: shapes.triangle },
  duration: 1,
  ease: 'power2.inOut'
});
```

**📂 Demo:** [demos/10-svg-morphing.html](./demos/10-svg-morphing.html)

### Nivel 5: Iconos SVG animados

```javascript
// Animación hamburguesa a X
const tl = gsap.timeline({ paused: true });

tl.to('.line-top', {
  y: 8,
  rotation: 45,
  transformOrigin: 'center',
  duration: 0.3
})
.to('.line-middle', {
  opacity: 0,
  duration: 0.1
}, 0)
.to('.line-bottom', {
  y: -8,
  rotation: -45,
  transformOrigin: 'center',
  duration: 0.3
}, 0);

// Alternar al clic
let isOpen = false;
document.querySelector('.menu-btn').addEventListener('click', () => {
  isOpen ? tl.reverse() : tl.play();
  isOpen = !isOpen;
});
```

**📂 Demo:** [demos/11-animated-icons.html](./demos/11-animated-icons.html)

---

## ⏱️ Parte IV: Timelines y secuenciación

> _"The wise developer does not add more code. They remove conflict."_
> — Tao del Desarrollador

Los timelines son la superpotencia de GSAP para coreografías complejas.

### Timeline básico

```javascript
const tl = gsap.timeline();

tl.from('.hero-title', { y: 100, opacity: 0, duration: 1 })
  .from('.hero-subtitle', { y: 50, opacity: 0, duration: 0.8 })
  .from('.hero-cta', { scale: 0, duration: 0.5, ease: 'back.out(2)' });
```

### Posicionamiento en timeline

```javascript
const tl = gsap.timeline();

// Por defecto: tras el anterior
tl.to('.a', { x: 100, duration: 1 })

// 0,5 s antes de que acabe el anterior
  .to('.b', { x: 100, duration: 1 }, '-=0.5')

// A la vez que el anterior
  .to('.c', { x: 100, duration: 1 }, '<')

// 0,2 s después de que empiece el anterior
  .to('.d', { x: 100, duration: 1 }, '<0.2')

// En el segundo 2 absoluto
  .to('.e', { x: 100, duration: 1 }, 2);
```

### Timeline con labels

```javascript
const tl = gsap.timeline();

tl.add('intro')
  .from('.logo', { scale: 0, duration: 0.8 }, 'intro')
  .from('.tagline', { opacity: 0, y: 20 }, 'intro+=0.3')
  
  .add('content', '+=0.5')
  .from('.card', { y: 100, opacity: 0, stagger: 0.1 }, 'content')
  
  .add('cta', '+=0.3')
  .from('.button', { scale: 0, ease: 'back.out(2)' }, 'cta');
```

### Defaults del timeline

```javascript
const tl = gsap.timeline({
  defaults: {
    duration: 0.8,
    ease: 'power3.out'
  }
});

// Todos los tweens heredan defaults
tl.from('.a', { y: 100 })
  .from('.b', { y: 100 })
  .from('.c', { y: 100, duration: 1.2 }); // Sobrescribir default
```

**📂 Demo:** [demos/12-timelines.html](./demos/12-timelines.html)

---

## 🎚️ Parte V: Easing — el alma de la animación

> _"Choosing the right easing is like seasoning food. You can't see it, but everyone knows when it's wrong."_

El easing determina el **carácter** de tu animación.

### Hoja de trucos de easing

| Ease | Sensación | Caso de uso |
|------|------|----------|
| `power1.out` | Sutil, educado | Micro-interacciones |
| `power2.out` | Profesional | Animaciones UI estándar |
| `power3.out` | Dramático | Reveals de hero |
| `power4.out` | Impactante | Captar atención |
| `back.out(1.7)` | Snappy, overshoot | Botones, modales |
| `elastic.out(1, 0.3)` | Rebotón, lúdico | Marcas divertidas |
| `bounce.out` | Físico | UI tipo juego |
| `linear` | Mecánico | Barras de progreso |

### Easing personalizado

```javascript
// Usando cubic-bezier
gsap.to('.box', {
  x: 300,
  ease: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
});

// Ease custom con plugin CustomEase
gsap.registerPlugin(CustomEase);
CustomEase.create('myEase', 'M0,0 C0.126,0.382 0.282,1.674 0.44,1.674 0.778,1.674 0.824,1 1,1');

gsap.to('.box', { x: 300, ease: 'myEase' });
```

**📂 Demo:** [demos/13-easing.html](./demos/13-easing.html)

### Guía visual de easing

```
power1.out  ████████▓▓░░░░░░  Desaceleración suave
power2.out  ████████████▓░░░  Desaceleración fluida  
power3.out  ██████████████▓░  Desaceleración fuerte
power4.out  ███████████████▓  Desaceleración dramática

back.out    ████████████▓▓██  Overshoot y asentamiento
elastic.out ████▓▓██▓▓██████  Oscilación rebotona
bounce.out  ██▓█▓█▓█████████  Rebote físico
```

---

## 📜 Parte VI: ScrollTrigger

> _"Before ScrollTrigger: 200 lines of scroll event listeners. After: 5 lines."_

ScrollTrigger sincroniza animaciones con la posición de scroll.

### Instalación

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);
</script>
```

### Animación básica activada por scroll

```javascript
gsap.from('.section-title', {
  y: 100,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.section-title',
    start: 'top 80%',    // Cuando la parte superior llega al 80% del viewport
    end: 'top 20%',      // Cuando la parte superior llega al 20%
    toggleActions: 'play none none reverse'
  }
});
```

### Animación scrub (ligada al scroll)

```javascript
gsap.to('.parallax-bg', {
  y: -200,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true  // Progreso ligado al scroll
  }
});
```

### Fijar sección mientras animas

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.pinned-section',
    start: 'top top',
    end: '+=200%',  // Pin durante 2× altura de viewport de scroll
    pin: true,
    scrub: 1
  }
});

tl.from('.reveal-1', { opacity: 0, y: 50 })
  .from('.reveal-2', { opacity: 0, y: 50 })
  .from('.reveal-3', { opacity: 0, y: 50 });
```

### Reveal tipográfico al scroll

```javascript
// Revelar texto al hacer scroll
gsap.utils.toArray('.scroll-text').forEach(text => {
  gsap.from(text, {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: text,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
});
```

**📂 Demo:** [demos/14-scrolltrigger.html](./demos/14-scrolltrigger.html)

---

## ♿ Parte VII: Accesibilidad

> _"La accesibilidad no es una feature. Es la base sobre la que descansan todas las demás."_
> — Tao del Desarrollador

### Respetar preferencias del usuario

```javascript
// Comprobar preferencia reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Desactivar o simplificar animaciones
  gsap.globalTimeline.timeScale(100); // Animaciones instantáneas
} else {
  // Animaciones completas
  gsap.from('.hero', { y: 100, opacity: 0, duration: 1 });
}
```

### Patrón de mejora progresiva

```javascript
// Por defecto: sin animación (funciona sin JS)
// Mejorado: animación si el motion está permitido

const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

if (motionOK) {
  gsap.from('.content', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1
  });
}
```

### Wrapper de animación accesible

```javascript
function animateIfAllowed(target, vars) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Estado final inmediato
    gsap.set(target, { 
      opacity: vars.opacity ?? 1,
      x: vars.x ?? 0,
      y: vars.y ?? 0
    });
  } else {
    gsap.from(target, vars);
  }
}

// Uso
animateIfAllowed('.hero-title', { y: 100, opacity: 0, duration: 1 });
```

**📂 Demo:** [demos/15-accessibility.html](./demos/15-accessibility.html)

---

## 🏆 Parte VIII: Técnicas dignas de Awwwards

### Técnica 1: Botones magnéticos

```javascript
const buttons = gsap.utils.toArray('.magnetic-btn');

buttons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  });
});
```

**📂 Demo:** [demos/16-magnetic-buttons.html](./demos/16-magnetic-buttons.html)

### Técnica 2: Cursor follower suave

```javascript
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Seguimiento suave con quickTo
const xTo = gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3' });
const yTo = gsap.quickTo(cursor, 'y', { duration: 0.6, ease: 'power3' });
const dotXTo = gsap.quickTo(cursorDot, 'x', { duration: 0.1 });
const dotYTo = gsap.quickTo(cursorDot, 'y', { duration: 0.1 });

gsap.ticker.add(() => {
  xTo(mouseX);
  yTo(mouseY);
  dotXTo(mouseX);
  dotYTo(mouseY);
});
```

**📂 Demo:** [demos/17-cursor-follower.html](./demos/17-cursor-follower.html)

### Técnica 3: Galería scroll horizontal

```javascript
const sections = gsap.utils.toArray('.gallery-item');
const container = document.querySelector('.gallery-container');

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => '+=' + container.offsetWidth
  }
});
```

**📂 Demo:** [demos/18-horizontal-scroll.html](./demos/18-horizontal-scroll.html)

### Técnica 4: Reveal de texto al scroll

```javascript
// Revelar línea a línea al scroll
const lines = gsap.utils.toArray('.reveal-line');

lines.forEach(line => {
  gsap.from(line, {
    y: '100%',
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: line,
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  });
});
```

**📂 Demo:** [demos/19-text-reveal-scroll.html](./demos/19-text-reveal-scroll.html)

### Técnica 5: Animación grid escalonada

```javascript
gsap.from('.grid-item', {
  scale: 0,
  opacity: 0,
  duration: 0.6,
  ease: 'back.out(1.7)',
  stagger: {
    amount: 1.5,
    grid: [4, 4],
    from: 'center'
  },
  scrollTrigger: {
    trigger: '.grid-container',
    start: 'top 70%'
  }
});
```

**📂 Demo:** [demos/20-staggered-grid.html](./demos/20-staggered-grid.html)

---

## 🛠️ Ejercicios de práctica

### Ejercicio 1: Logo animado (principiante)
Crea tu nombre o iniciales en SVG y anima el path drawing al cargar la página.

### Ejercicio 2: Hero de portfolio (intermedio)
Construye una sección hero con:
- Reveal de texto escalonado
- Formas de fondo animadas
- Contenido scroll-triggered debajo

### Ejercicio 3: Galería interactiva (avanzado)
Crea una galería de proyectos con:
- Scroll horizontal en desktop
- Efectos hover magnéticos
- Cursor custom que cambia al hover

### Ejercicio 4: Experiencia full-page (maestría)
Construye un portfolio one-page con:
- Secciones pin con animaciones scroll-driven
- Tipografía que responde al scroll
- Ilustraciones SVG que animan al pasar el scroll

---

## 📚 Recursos y referencias

### Documentación oficial
- [GSAP Docs](https://gsap.com/docs/v3/) — Referencia API completa
- [Easing Visualizer](https://gsap.com/docs/v3/Eases/) — Herramienta interactiva de easing
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — Guía de animación scroll

### Recursos de aprendizaje
- [GreenSock Learning](https://gsap.com/resources/get-started/) — Tutoriales oficiales
- [GSAP Cheat Sheet](https://gsap.com/cheatsheet/) — Referencia rápida

### Inspiración
- [Awwwards GSAP Sites](https://www.awwwards.com/websites/gsap-animation/) — Ejemplos premiados
- [Codrops](https://tympanus.net/codrops/) — Experimentos de creative coding

---

## 🎯 Ideas clave

### Árbol de decisión GSAP

```
¿Necesitas animación?
├─ ¿Estado hover/focus simple?
│  └─ Usa transiciones CSS
│
├─ ¿Secuenciar varias animaciones?
│  └─ Usa GSAP Timeline
│
├─ ¿Sincronizar con scroll?
│  └─ Usa ScrollTrigger
│
├─ ¿Animar paths/morphing SVG?
│  └─ Usa GSAP (única opción)
│
└─ ¿Control/debug preciso?
   └─ Usa GSAP
```

### Patrones esenciales

1. **Empieza con timelines** — Incluso para una sola animación
2. **Usa defaults** — Propiedades comunes a nivel timeline
3. **Stagger en todo** — Los reveals secuenciales se sienten intencionados
4. **Ease con criterio** — `power2.out` es tu amigo por defecto
5. **Respeta preferencias de motion** — Comprueba siempre `prefers-reduced-motion`
6. **Mejora progresiva** — El sitio debe funcionar sin JS

> _"In shipping, there is learning. In learning, there is growth. In growth, there is the Tao."_
> — Tao del Desarrollador

{% comment %}
outcome-graphic-selection:
  source-section: "🎯 Key Takeaways"
  visual-grammar: "temporal-communication-score — motion paths sequenced by timing, easing, attention, and reduced-motion responsibility"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

---

## 💬 Sabiduría del camino

> _"The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining 10 percent of the code accounts for the other 90 percent of the development time."_
> — Tao del Desarrollador

> _"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."_
> — Tao del Desarrollador

> _"Simplicity is the ultimate sophistication."_
> — Tao del Desarrollador

---

**Ve y anima con intención. Que tu easing sea suave y tus fps estén siempre a 60.** 🎭
