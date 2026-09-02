---
layout: lesson
title: 'Tendencias de Diseño Web Moderno: Guía Práctica para Estudiantes'
title_alt: 'Modern Web Design Trends: Practical Guide for Students'
slug: modern-web-design-trends
description: 'Una exploración práctica de tendencias clave en diseño web como parallax, glassmorphism, tipografía, modo oscuro, minimalismo vs. maximalismo, narrativas basadas en scroll y efectos 3D. Simplificada para principiantes con ejercicios activos y reflexiones críticas.'
date: 2025-10-14
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/modern-web-design-trends/
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> Una tendencia es una hipótesis de diseño, no un requisito.</p>
<p><strong>Lente de campo:</strong> **Ancla de práctica:** las tendencias deben servir comunicación, usabilidad y contexto. **Señal de frontera:** estéticas inmersivas, con IA y 3D están activas pero pedagógicamente inestables.</p>
</aside>

> **Prueba de estudio:** Elige dos tendencias, declara el objetivo de usuario y anota qué rechazaste.

{% include lesson-semantic-graphic.html %}

# Tendencias de Diseño Web Moderno: Guía Práctica para Estudiantes

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Para quién es / Para quién no

**Para:** Front-End I **Sesión 12** — muestrear críticamente 2–3 tendencias e implementar **una** en tu portfolio con un objetivo de usuario declarado.

**No para:** copiar sitios premiados enteros, tendencias que rompen accesibilidad, ni omitir la reflexión «qué rechacé».

**Al terminar esta sesión tendrás:** una tendencia con CSS/JS plano, una crítica de otra rechazada y un commit.

---

## Antes de empezar

| Requisito | ¿Obligatorio? |
| --- | --- |
| Sesiones 3–11 completas | Sí |
| Repo desplegado en GitHub Pages | Sí |
| Bases de `prefers-reduced-motion` y contraste | Sí |

**Tiempo oficial:** 2 h de clase + 1 h de laboratorio.

---

## Sigue este camino

| Paso | Acción | Sección |
| --- | --- | --- |
| 1 | Lee dos módulos (p. ej. parallax + modo oscuro) | Módulos abajo |
| 2 | Declara objetivo de usuario antes de codear | Prueba de estudio |
| 3 | Implementa **una** tendencia en tu portfolio | Producción |
| 4 | Documenta una tendencia rechazada y por qué | Reflexión |
| 5 | Commit | Entrega |

---

## Comprueba antes de salir

- [ ] La tendencia sirve a un objetivo de comunicación claro
- [ ] Contraste y teclado siguen pasando tus comprobaciones de S3–S6
- [ ] Considerado fallback con reduced-motion
- [ ] Nota escrita: tendencia adoptada + rechazada
- [ ] Commit subido

---

## Fallos frecuentes

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| Sitio ilegible | Glassmorphism sin contraste | Prueba WCAG; fallback sólido |
| Scroll entrecortado | Parallax pesado en móvil | Menos capas; `prefers-reduced-motion` |
| Modo oscuro rompe imágenes | Solo invertir colores | Variables CSS |
| Sopa de tendencias | Cinco efectos a la vez | Entrega uno |
| Demo OK, portfolio no | CodePen aislado | Integra con tus tokens |

---

## Entrega (evidencia Sesión 12)

- Commit con una tendencia integrada
- Dos viñetas: objetivo servido + tendencia rechazada

---

¡Bienvenido a esta guía práctica sobre tendencias modernas en diseño web! Exploraremos tendencias que hacen que los sitios web sean más atractivos y comunicativos. Cada tendencia se divide en módulos cortos y simples. Aprenderás el "por qué" y el "cómo" a través de analogías, demos interactivos y reflexiones.

Piensa en el diseño web como narración: las tendencias son herramientas para hacer tu historia más clara, divertida o inmersiva. Nos enfocaremos en **aprendizaje activo**—¡prueba cosas mientras avanzas! Cada módulo incluye un demo completo e interactivo que puedes explorar, inspeccionar y personalizar.

> **Consejo Rápido:** Lee un módulo a la vez. Después de cada uno, explora el demo y reflexiona. ¡Esto mantiene las cosas claras y divertidas!

> **Divulgación de Asistencia de IA:** Esta lección se basa en experiencia de aula desde septiembre de 2024, con iteraciones de IA siguiendo ciclos de investigación–práctica–investigación.

---

## Módulo 1: Parallax Scrolling – Agregando Profundidad Como una Película

### ¿Qué Es?

El parallax scrolling hace que los fondos se muevan más lento que el contenido en primer plano mientras desplazas. Es como mirar por la ventana de un auto: los árboles (fondo) se mueven más lento que la carretera (primer plano). Esto agrega **profundidad** y hace que los sitios se sientan dinámicos.

**Analogía:** Imagina un cómic donde los paneles de fondo cambian ligeramente al pasar las páginas—crea una sensación de movimiento sin abrumar la historia.

### ¿Por Qué Usarlo?

- Hace que los sitios sean más atractivos (los usuarios desplazan más tiempo).
- Ayuda a contar una historia visualmente (ej. un portafolio mostrando "viaje" a través de capas).
- Pero: Puede causar mareos o ralentizar sitios—úsalo con moderación.

### Aprendizaje Práctico: Explora el Demo

**📂 Abre el archivo demo:** [`demo/01-parallax-scrolling.html`](demo/01-parallax-scrolling.html)

**🎯 Qué buscar:**

La **propiedad CSS clave** que crea el parallax es `background-attachment: fixed`. Aquí está la técnica principal del demo:

```css
.parallax-bg {
	background-image: url('...');
	min-height: 400px;
	background-attachment: fixed; /* ¡Esto crea el efecto parallax! */
	background-position: center;
	background-size: cover;
}
```

**Cómo funciona:**

- `background-attachment: fixed` mantiene la imagen de fondo **estacionaria relativa al viewport**
- Al desplazarte, el contenido se mueve pero el fondo permanece en su lugar
- Esto crea la ilusión de profundidad (como mirar a través de capas)

**📚 Pasos de aprendizaje:**

1. **Visualízalo en tu navegador** – Desplázate arriba y abajo para experimentar el efecto parallax
2. **Compara ambas secciones** – La sección morada usa `fixed`, la verde usa `scroll` (por defecto)
3. **Abre las DevTools (F12)** – Busca `.parallax-bg` y cambia `background-attachment` entre `fixed` y `scroll`
4. **Revisa el JavaScript** – El demo respeta `prefers-reduced-motion` para accesibilidad
5. **Experimenta** – Cambia `min-height`, intercambia colores o agrega tus propias imágenes

**Tiempo:** 5-10 minutos. **Reflexión:** ¿El efecto parallax mejora la narrativa o se siente distractor? ¿Cómo impacta el movimiento a diferentes usuarios?

> **Insight Clave:** El parallax es simple pero poderoso—prueba en móvil para asegurar que no distraiga.

🎯 **[Ver Demo Interactivo: Parallax Scrolling →](demo/01-parallax-scrolling.html)**

### Implementación Práctica

- **Parallax Simple:** Lograble con **HTML/CSS**, ej. usando `background-attachment: fixed` o **transformaciones CSS** para crear efectos en capas.
- **Parallax Complejo:** A menudo requiere **JavaScript** para ajustar posiciones de elementos en el scroll, o bibliotecas como **ScrollMagic** o **GSAP ScrollTrigger** para animaciones más avanzadas.
- **CSS Moderno:** Las **transformaciones 3D** (ej. `translateZ` en un contenedor de perspectiva) pueden simular **efectos multiplanos**.
- **Bibliotecas Populares:** Herramientas como **parallax.js** mueven imágenes en capas a diferentes velocidades para crear **profundidad**.

#### Para Estudiantes Intermedios

Prueba agregar una sección **parallax básica** a una página web. Por ejemplo, usa un **fondo de imagen fijo** para que el contenido se desplace sobre él, o usa un pequeño script con `transform: translateY()` para mover una imagen más lento que el scroll. Enfócate en efectos **sutiles**, **suaves** y prueba en **escritorio** y **móvil** (nota que algunos navegadores móviles deshabilitan fondos fijos por rendimiento). Reflexiona sobre si el efecto guía la **atención del usuario** como se pretende.

#### Para Estudiantes Avanzados

Construye una sección **parallax narrativa personalizada** con múltiples **paneles de pantalla completa**. Usa la **API Intersection Observer** o una biblioteca de scroll para activar animaciones cuando cada sección entre en el viewport. Incorpora **2–3 capas de profundidad**, y considera **rendimiento** y **accesibilidad**: usa `requestAnimationFrame` para actualizaciones suaves, y proporciona un toggle para deshabilitar animaciones para usuarios que prefieren **movimiento reducido**. Esto profundizará tu comprensión de **animación basada en scroll** y **flujo narrativo**.

**Conclusión Clave:**  
El **desplazamiento parallax** demuestra cómo la **web** puede agregar **narrativa** a través de la **interacción**. Siempre pregunta: _¿Ayuda este movimiento a contar mi historia o mejorar la comprensión?_ Si sí, el **parallax** puede ser una **herramienta poderosa**. Si no, un enfoque más simple puede ser mejor. Usa el **parallax** con moderación—como una especia vívida, un poco puede deleitar, pero demasiado puede abrumar.

---

## Módulo 2: Glassmorphism – Efectos de Vidrio Esmerilado para UIs Modernas

### ¿Qué Es?

El glassmorphism crea un look de "vidrio esmerilado": elementos semi-transparentes con desenfoque, como una ventana empañada. Ves a través pero con suavidad.

**Analogía:** Piensa en una puerta de ducha con condensación—las formas son visibles pero borrosas, agregando un feel moderno y en capas.

**Orígenes y Definiciones**

- El Primer Neumorfismo, Alexander Plyuto
- [Shot en Dribbble: Skeuomorph Mobile Banking](https://dribbble.com/shots/7994421-Skeuomorph-Mobile-Banking)
- [NFT de Foundation](https://foundation.app/mint/eth/0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405/26542)

### ¿Por Qué Usarlo?

- Agrega profundidad y sensación premium (ej. tarjetas que "flotan").
- Popular en apps como iOS—se siente táctil sin ser pesado.
- Advertencia: Puede reducir legibilidad; asegura buen contraste.

### 🎨 La Clave: Fondos Texturizados

**El glassmorphism NECESITA un fondo visualmente interesante para funcionar.** Sin textura, color o movimiento detrás, el efecto de blur no tiene nada que mostrar y se vuelve invisible o aburrido.

**Fondos ideales:**

- ✅ **Gradientes complejos** con múltiples colores
- ✅ **Imágenes fotográficas** con detalles
- ✅ **Formas animadas** o elementos en movimiento
- ✅ **Patrones geométricos** o texturas SVG
- ❌ **NO funciona con colores planos** o fondos blancos simples

> **Por eso este demo incluye:** formas de colores animadas, gradientes multi-color, y patrones geométricos sutiles. El blur del glassmorphism necesita "algo que desenfocar" para brillar.

### Aprendizaje Práctico: Explora el Demo

**📂 Abre el archivo demo:** [`demo/02-glassmorphism.html`](demo/02-glassmorphism.html)

**🎯 Qué buscar:**

El **ingrediente mágico** es `backdrop-filter` combinado con fondos semi-transparentes. Pero nota cómo el **fondo texturizado y animado** hace que el efecto realmente destaque. Aquí está la receta completa del demo:

```css
.glass-card {
	/* Fondo semi-transparente - deja ver el contenido a través */
	background: rgba(255, 255, 255, 0.2);

	/* ¡La magia del glassmorphism! */
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px); /* Soporte Safari */

	/* Borde sutil añade definición */
	border: 1px solid rgba(255, 255, 255, 0.3);

	/* Esquinas redondeadas modernas */
	border-radius: 16px;

	/* Profundidad con sombra */
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
}
```

**Cómo funciona:**

- `backdrop-filter: blur()` desenfoca **lo que está detrás** del elemento
- `rgba()` con alpha bajo (0.2) hace el fondo **transparente**
- La combinación crea un efecto de "vidrio esmerilado"
- El borde añade definición para que el vidrio no desaparezca

**📚 Pasos de aprendizaje:**

1. **Experimenta tres variaciones** – Estándar (10px blur), oscuro (15px) y blur extra (20px)
2. **Compara cantidades de blur** – Nota cómo la legibilidad cambia con 5px vs. 20px
3. **Abre las DevTools** – Prueba cambiar `blur(10px)` a diferentes valores como `blur(5px)` o `blur(30px)`
4. **Ajusta transparencia** – Cambia `rgba(255, 255, 255, 0.2)` a `0.1` o `0.5` y ve la diferencia
5. **Prueba legibilidad** – Pregúntate: ¿aún puedes leer el texto cómodamente?

**Tiempo:** 5-10 minutos. **Reflexión:** ¿Cuándo el vidrio mejora vs. dificulta la legibilidad? ¿Cómo afecta la cantidad de blur la sensación "premium"?

> **Insight Clave:** Usa `backdrop-filter` para el blur—es compatible en navegadores modernos.

🎯 **[Ver Demo Interactivo: Glassmorphism →](demo/02-glassmorphism.html)**

#### Para Estudiantes Avanzados

**Desafío:**

- Implementa un switch de tema o iluminación ambiental dinámica (ej. modo oscuro y claro, con vidrio adaptándose en consecuencia).

- Integra un fondo WebGL sutil (ej. gradiente animado o sistema de partículas) detrás de una UI glassmórfica.

- Diseña una interfaz entera en estilo glassmórfico (barras de navegación, modales, tarjetas todas translúcidas) y evalúa críticamente el resultado.

- Perfila el rendimiento con muchos `backdrop-filter`s; usa técnicas CSS para limitar el área de efecto.

- Combina glassmorphism con animaciones (ej. un panel de vidrio deslizándose) y optimiza para suavidad (ej. `will-change: backdrop-filter`).

---

## Módulo 3: Neumorphism – Sombras Suaves 3D para Interfaces en Relieve

### ¿Qué Es?

El neumorphism (una fusión de "nuevo" y "skeuomorfismo") combina elementos 3D con sombras suaves y luces sutiles para crear un look "en relieve" o "presionado". Usa sombras claras para elementos elevados y sombras oscuras para inset, a menudo en un fondo coincidente para un feel integrado. Combinado con glassmorphism, agrega capas translúcidas para mayor profundidad.

**Analogía:** Imagina botones que parecen presionados suavemente en arcilla blanda—los bordes elevados captan la luz, las áreas inset se sienten hundidas, dando una calidad táctil, casi física a las pantallas planas.

### Orígenes y Definiciones

- Acuñado por el diseñador Alexander Plyuto, el neumorphism se inspira en el skeuomorfismo (diseños realistas que imitan objetos físicos) pero lo suaviza para interfaces modernas y minimalistas.
- Primer ejemplo notable: El concepto "Skeuomorph Mobile Banking" de Plyuto en Dribbble ([Shot en Dribbble](https://dribbble.com/shots/7994421-Skeuomorph-Mobile-Banking)).
- Ganó tracción en 2020 como un "siguiente paso" después del diseño plano, a menudo emparejado con glassmorphism para UIs futuristas en capas.

### ¿Por Qué Usarlo?

- Crea un feel suave y accesible—los elementos parecen tocables e integrados.
- Mejora la experiencia de usuario en apps (ej. toggles que "se presionan" como botones reales).
- Popular en fintech y herramientas creativas para un vibe premium e innovador.
- Advertencia: Puede reducir la accesibilidad (bajo contraste); asegura diferencias de color suficientes para legibilidad.

### Aprendizaje Práctico: Explora el Demo

**📂 Abre el archivo demo:** [`demo/03-neumorphism.html`](demo/03-neumorphism.html)

**🎯 Qué buscar:**

El neumorphism usa **sombras duales** (clara y oscura) para crear un look suave y en relieve. Aquí está la técnica del demo:

```css
.neu-button {
	background: #e0e0e0; /* ¡Debe coincidir con el fondo de la página! */
	border: none;
	border-radius: 20px;
	padding: 15px 30px;

	/* Sombras duales crean el efecto elevado */
	box-shadow: 8px 8px 15px #bebebe, /* Sombra oscura (abajo-derecha) */ -8px -8px 15px #ffffff; /* Sombra clara (arriba-izquierda) */

	transition: all 0.3s ease;
}

.neu-button:active {
	/* Sombras inset crean efecto "presionado" */
	box-shadow: inset 8px 8px 15px #bebebe, /* Presionado hacia adentro */ inset -8px -8px 15px #ffffff;
}
```

**Cómo funciona:**

- **Dos sombras en ángulos opuestos** simulan luz golpeando una superficie 3D
- Sombra oscura (#bebebe) abajo-derecha = lado con sombra
- Sombra clara (#ffffff) arriba-izquierda = lado iluminado
- La palabra clave `inset` hace que las sombras vayan hacia adentro (efecto presionado)
- **El fondo debe coincidir con el padre** para integración perfecta

**📚 Pasos de aprendizaje:**

1. **Haz clic en los botones** – Siente cómo la sombra cambia de outset a inset
2. **Estudia los pares de sombras** – Abre DevTools, encuentra `.neu-button` y cambia los ángulos de sombra
3. **Compara elevado vs. presionado** – Nota cómo `inset` cambia toda la sensación
4. **Prueba el campo de entrada** – Usa sombras inset por defecto (se ve hundido)
5. **Prueba coincidencia de color** – Cambia el color de fondo y ve por qué coincidir es crucial
6. **Revisa el contraste** – ¿Por qué el color de texto del demo es #555 en lugar de #000?

**Tiempo:** 5-10 minutos. **Reflexión:** ¿La sensación táctil mejora la interacción o solo añade complejidad visual? ¿Cómo afecta el bajo contraste a la accesibilidad?

> **Insight Clave:** El neumorphism brilla en temas claros—combínalo con glassmorphism para efectos híbridos como tarjetas elevadas translúcidas.

🎯 **[Ver Demo Interactivo: Neumorphism →](demo/03-neumorphism.html)**

---

## Módulo 4: Tendencias en Tipografía Web – Fuentes Que Hablan Más Alto

### ¿Qué Es?

Los últimos años han visto un **renacimiento en la tipografía web**, impulsado por avances tecnológicos y experimentación creativa. La tipografía moderna combina **fuentes variables**, **escalado fluido**, **texto display audaz**, y consideraciones profundas sobre **accesibilidad** y **personalidad de marca**.

**Analogía:** Las fuentes son como voces—una fuente audaz y juguetona es como un narrador emocionado; una serif limpia es como un profesor calmado. Pero ahora, esas voces pueden cambiar de tono (peso), volumen (tamaño fluido), y expresión (estilos variables) según el contexto.

### 🔤 1. Fuentes Variables: El Cambio Técnico Más Significativo

#### ¿Qué Son?

Las **fuentes variables** son quizás el avance técnico más importante en tipografía web. Permiten que un **solo archivo de fuente** se comporte como **múltiples fuentes**, ajustando suavemente **peso**, **ancho**, **inclinación** y otros ejes de diseño.

#### Beneficios de Rendimiento y Diseño:

- **Rendimiento:** En lugar de cargar 5 archivos separados (Light, Regular, Bold, Black, etc.), una fuente variable cubre todos, reduciendo el tamaño de archivo y las solicitudes HTTP.
- **Diseño responsivo:** Puedes hacer texto ligeramente más ancho y pesado en pantallas pequeñas para legibilidad.
- **Interactividad:** Anima entre estilos—un encabezado podría engrosarse sutilmente al hacer hover.

**Ejemplo CSS:**

```css
/* Fuente variable con eje de peso (weight) */
h1 {
	font-family: 'Inter Variable', sans-serif;
	font-weight: 200; /* Ultra ligero */
	transition: font-weight 0.3s ease;
}

h1:hover {
	font-weight: 900; /* Ultra audaz - transición suave */
}

/* Control de múltiples ejes */
.custom-text {
	font-variation-settings: 'wght' 650, 'wdth' 90, 'slnt' -5;
	/* Peso 650, Ancho 90%, Inclinación -5° */
}
```

#### Impacto:

Las fuentes variables llevan la flexibilidad de las fuentes de impresión (donde un diseñador tiene toda una familia de pesos) a la web en un **solo activo**. Sitios modernos las usan para tipografía más rica sin penalización de velocidad.

---

### 📐 2. Escalas de Tipo Fluido y Responsivo

#### El Problema:

En la era de **múltiples tamaños de pantalla**, necesitamos texto que sea legible en móviles pero bien proporcionado en escritorios, **sin saltos abruptos**.

#### La Solución: Tipografía Fluida con `clamp()`

La función `clamp()` permite que los tamaños de fuente escalen suavemente entre un mínimo y máximo basado en el ancho de la pantalla.

**Cómo funciona:**

```css
.hero h1 {
	/* clamp(mínimo, preferido, máximo) */
	font-size: clamp(2rem, 5vw + 1rem, 4rem);

	/* Traducción:
       - Nunca más pequeño que 2rem (32px) en móviles
       - Escala con el viewport: 5vw + 1rem
       - Nunca más grande que 4rem (64px) en pantallas grandes
    */
}

.hero p {
	font-size: clamp(0.9rem, 1vw + 0.5rem, 1.1rem);
	/* Rango menor = escalado más sutil para texto de cuerpo */
}
```

**Compara tres enfoques:**

```css
/* ❌ Forma antigua: Fijo */
h1 {
	font-size: 32px;
} /* Igual en todas las pantallas - no responsivo */

/* ⚠️ Mejor: Unidades de viewport */
h1 {
	font-size: 5vw;
} /* Escala pero puede ser ilegible en móvil o enorme en 4K */

/* ✅ Mejor: Fluido con límites */
h1 {
	font-size: clamp(2rem, 5vw, 4rem);
} /* Escala inteligentemente con límites seguros */
```

#### Beneficios:

- Elimina puntos de quiebre fijos para tipografía
- Tu hermosa tipografía display no será microscópica en móviles ni cómica en monitores 4K
- Mejor experiencia de usuario sin código complejo

---

### 🎨 3. Texto Display Grande, Audaz y Experimental

#### La Tendencia Visual:

Muchos sitios web modernos usan **tipografía oversized** como elemento clave de diseño. Secciones hero pueden presentar una sola palabra o frase ocupando toda la pantalla, creando **drama** y **foco inmediato**.

#### Ejemplos de Uso:

- **Hero tipográfico:** Una palabra grande en lugar de una imagen hero tradicional
- **Tipografía cinética:** Letras que animan o morfean en interacción
- **Fuentes expresivas:** Sans-serif neo-grotescos, serifs elegantes, o monospace retro para personalidad

**Ejemplo de Hero Tipográfico:**

```css
.typographic-hero {
	font-size: clamp(4rem, 15vw, 12rem); /* Enorme */
	font-weight: 900;
	line-height: 0.9; /* Apretado para impacto */
	letter-spacing: -0.02em; /* Tracking negativo */
	text-transform: uppercase;
}
```

#### Tendencias 2024-2025:

- **Sans-serif neo-grotescos** (fuentes limpias, mid-century modern) por claridad
- **Serifs elegantes** para sofisticación
- **Fuentes monospace retro** para personalidad tech/nostalgia
- **Typefaces personalizadas** para unicidad de marca

---

### 💼 4. Tipografía y Branding / Emoción

#### Tipografía = Identidad de Marca

La elección de typeface y cómo se usa transmite **personalidad** y **emoción**:

| Contexto                    | Elección Tipográfica                                | Mensaje                  |
| --------------------------- | --------------------------------------------------- | ------------------------ |
| **Startup Fintech**         | Sans-serif elegante + espaciado generoso            | Moderno, confiable       |
| **Agencia Creativa**        | Serif elegante + fuente display quirky              | Classy e innovador       |
| **Marca de Lujo**           | Serif delicada con tracking amplio                  | Sofisticación, exclusivo |
| **Tech/Gaming**             | Monospace o geométrica audaz                        | Edgy, técnico            |
| **Editorial/Blog**          | Serif para headers + sans-serif legible para cuerpo | Contemporáneo, legible   |
| **Marca Amigable/Infantil** | Sans-serif redondeada con pesos variables           | Accesible, cálido        |

#### Recursos:

- **Typewolf:** Muestra emparejamientos de fuentes populares en sitios reales
- **Google Fonts:** Acceso fácil a cientos de typefaces
- **Adobe Fonts:** Fuentes profesionales para suscriptores

---

### ♿ 5. Accesibilidad en Tipografía: Una Prioridad Crítica

#### Mejor Práctica Esencial:

Diseñar tipografía para **accesibilidad** no es opcional—es fundamental para una web inclusiva.

#### Checklist de Accesibilidad Tipográfica:

1. **Contraste suficiente:**

   - Texto normal: mínimo 4.5:1
   - Texto grande (18px+ o 14px+ bold): mínimo 3:1
   - ❌ Evita gris claro sobre blanco (común pero problemático)

2. **Tamaños de fuente adecuados:**

   - Base: **16px o mayor** para texto de cuerpo
   - ❌ No más 10px diminuto para "texto legal"
   - Usa `rem` para que usuarios puedan ajustar tamaño

3. **Legibilidad de fuente:**

   - Evita cursivas decorativas para texto largo
   - Asegura que caracteres sean distinguibles (l vs I vs 1)
   - Considera fuentes amigables a disléxicos (OpenDyslexic, Lexie Readable)

4. **Longitud de línea y espaciado:**

   - **60-80 caracteres por línea** para legibilidad óptima
   - Usa `max-width` en párrafos para prevenir líneas largas en pantallas grandes
   - `line-height: 1.5-1.8` para texto de cuerpo

5. **Respeto por preferencias del usuario:**
   ```css
   body {
   	font-size: 1rem; /* Relativo al tamaño base del navegador */
   }
   /* El usuario puede ajustar en configuración del navegador */
   ```

---

### 🌐 6. Consideraciones Únicas de la Web

#### Diferencias con Diseño de Impresión:

A diferencia de impresión (donde el diseñador controla todo), la tipografía web debe adaptarse a:

- **Entornos variables:** Diferentes navegadores, sistemas operativos, resoluciones
- **Control del usuario:** Zoom, tamaño de fuente personalizado
- **Fallos de carga:** Fuentes web que no cargan

#### Técnicas de Enhancement Progresivo:

**1. Font Stacks Robustas:**

```css
body {
	font-family: 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	/* Fuente personalizada → Fuente del sistema → Genérica */
}
```

**2. Control de Font Loading:**

```css
@font-face {
	font-family: 'MyWebFont';
	src: url('font.woff2') format('woff2');
	font-display: swap; /* Muestra fuente fallback inmediatamente */
}
```

Opciones de `font-display`:

- `swap`: Texto visible inmediatamente con fallback (mejor para rendimiento)
- `block`: Espera fuente web (riesgo de texto invisible—FOIT)
- `fallback`: Compromiso entre swap y block
- `optional`: Navegador decide basado en velocidad de conexión

**3. Sistemas de Unidades:**

```css
/* ✅ Usa unidades relativas */
h1 {
	font-size: 2.5rem;
} /* Relativo a root */
.component {
	font-size: 1.2em;
} /* Relativo al padre - escalable */

/* ❌ Evita unidades fijas cuando sea posible */
p {
	font-size: 16px;
} /* No escala con preferencias del usuario */
```

---

### 🎯 Aprendizaje Práctico: Explora el Demo

**📂 Abre el archivo demo:** [`demo/04-fluid-typography.html`](demo/04-fluid-typography.html)

**🎯 Qué buscar en el demo:**

El demo ilustra los conceptos clave de este módulo:

1. **Comparación de tres enfoques:**

   - Tamaños fijos (la forma antigua)
   - Unidades de viewport (sin límites)
   - `clamp()` (fluido con límites seguros)

2. **Tipografía fluida en acción:**

   - Hero con texto que escala suavemente
   - Diferentes elementos con diferentes rangos de escalado

3. **Jerarquía visual:**
   - Cómo los tamaños relativos crean estructura
   - Uso de peso y espaciado para énfasis

**📚 Pasos de aprendizaje:**

1. **Redimensiona la ventana del navegador** – Arrástrala de ancha a estrecha y observa el texto escalar
2. **Compara las cajas de demo** – Fijo vs. basado en viewport vs. clamp()
3. **Abre las DevTools** – Encuentra `.hero h1` y cambia `5vw` a `10vw` para ver escalado dramático
4. **Ajusta límites** – Prueba `clamp(1rem, 5vw, 10rem)` para un rango más amplio
5. **Prueba legibilidad** – ¿El tamaño mínimo aún es legible? ¿El máximo es demasiado grande?
6. **Experimenta con fuentes variables** – Si tienes acceso a una, prueba animar `font-weight`
7. **Verifica contraste** – Usa DevTools Lighthouse para auditar accesibilidad
8. **Prueba con zoom del navegador** – ¿El diseño sigue funcionando al 200%?

**Tiempo:** 15-20 minutos.

**Reflexión:**

- ¿Cómo mejora la tipografía fluida la experiencia del usuario en diferentes dispositivos?
- ¿Cuándo podrían ser mejores los tamaños fijos? (Ej: UI de aplicación vs. contenido editorial)
- ¿Qué consideraciones de accesibilidad son más importantes para tu proyecto?
- ¿Cómo transmite la tipografía la personalidad de una marca?

🎯 **[Ver Demo Interactivo: Fluid Typography →](demo/04-fluid-typography.html)**

---

### 🛠️ Herramientas y Recursos

#### Fuentes Web:

- **[Google Fonts](https://fonts.google.com/)** – Cientos de fuentes gratuitas, fácil implementación
- **[Adobe Fonts](https://fonts.adobe.com/)** – Fuentes profesionales para suscriptores Creative Cloud
- **[Font Squirrel](https://www.fontsquirrel.com/)** – Fuentes gratuitas para uso comercial
- **[Variable Fonts](https://v-fonts.com/)** – Catálogo de fuentes variables

#### Herramientas:

- **[Typewolf](https://www.typewolf.com/)** – Inspiración de emparejamientos de fuentes
- **[Type Scale](https://type-scale.com/)** – Generador de escalas tipográficas
- **[Modular Scale](https://www.modularscale.com/)** – Calculadora de proporciones
- **[Fluid Type Scale Calculator](https://www.fluid-type-scale.com/)** – Genera valores `clamp()` personalizados

#### Testing:

- **[WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)** – Verifica ratios de contraste
- **Chrome DevTools Lighthouse** – Auditorías automáticas de accesibilidad
- **[Who Can Use](https://www.whocanuse.com/)** – Visualiza cómo diferentes personas ven tu contraste

---

### 📋 Resumen: Principios Clave de Tipografía Web Moderna

1. **✅ Usa fuentes variables** cuando sea posible para rendimiento y flexibilidad
2. **✅ Implementa tipografía fluida** con `clamp()` para escalado responsivo sin saltos
3. **✅ Establece jerarquía clara** con tamaños, pesos y espaciado coherentes
4. **✅ Prioriza accesibilidad** - contraste, tamaño, legibilidad, longitud de línea
5. **✅ Elige fuentes que reflejen personalidad** de marca y propósito del contenido
6. **✅ Limita a 2-3 familias de fuentes** para rendimiento y coherencia visual
7. **✅ Usa unidades relativas** (`rem`, `em`) para respetar preferencias del usuario
8. **✅ Implementa font loading estratégico** con `font-display` apropiado
9. **✅ Prueba en múltiples dispositivos** y tamaños de pantalla
10. **✅ Audita regularmente** contraste y legibilidad con herramientas automáticas

> **Insight Clave:** La tipografía web ha evolucionado de limitación técnica a oportunidad creativa. Con fuentes variables, escalado fluido y consideraciones de accesibilidad, puedes crear experiencias tipográficas ricas que funcionan para todos los usuarios en todos los dispositivos.

---

## Módulo 5: Diseño en Modo Oscuro – Interfaces Cómodas para Todos

### ¿Qué Es?

El modo oscuro usa fondos oscuros con texto claro—ideal para luz baja o ahorro de batería.

**Analogía:** Como cambiar de una habitación brillante a una lámpara acogedora—más fácil para los ojos de noche.

### ¿Por Qué Usarlo?

- Reduce la fatiga visual y ahorra batería en pantallas OLED.
- Preferencia del usuario—muchas apps lo ofrecen.
- Advertencia: Puede ser más difícil de leer en luz brillante; diseña para ambos modos.

### Dos Enfoques para el Modo Oscuro

Hay **dos caminos principales** para implementar modo oscuro. ¡Cada uno tiene sus pros y contras!

---

#### Camino A: CSS Puro (Automático, Basado en el SO)

Este método usa CSS para detectar la preferencia del SO del usuario. **¡No necesita JavaScript!**

**✅ Pros:** Simple, respeta la preferencia del sistema del usuario, sin código que mantener.  
**❌ Contras:** No se puede cambiar manualmente, no es persistente (siempre sigue la configuración del SO).

**Aprendizaje Práctico: Explora el Camino A en el Demo**

**📂 Abre el archivo demo:** [`demo/05-dark-mode.html`](demo/05-dark-mode.html)

**🎯 Qué buscar (Camino A - Solo CSS):**

El demo usa **Propiedades Personalizadas CSS (variables)** con una **media query** para detectar las preferencias del SO:

```css
:root {
	/* Colores modo claro (por defecto) */
	--bg-primary: #ffffff;
	--text-primary: #212529;
	--accent: #667eea;
}

/* Cambio automático cuando el SO está en modo oscuro */
@media (prefers-color-scheme: dark) {
	:root {
		--bg-primary: #1a1a1a;
		--text-primary: #e9ecef;
		--accent: #8b9eff;
	}
}

/* Usar variables en todo el sitio */
body {
	background-color: var(--bg-primary);
	color: var(--text-primary);
	transition: background-color 0.3s ease; /* Transición suave */
}
```

**Cómo funciona:**

- **Variables CSS** (`--nombre-variable`) almacenan colores en un lugar
- `@media (prefers-color-scheme: dark)` detecta la configuración del SO
- Cuando el SO cambia, las variables se actualizan automáticamente
- `var(--nombre-variable)` usa el valor actual
- **¡Cero JavaScript necesario!**

**📚 Pasos de aprendizaje:**

1. **Cambia el modo oscuro de tu SO** (Preferencias del Sistema → Apariencia)
2. **Observa el demo cambiar** instantáneamente para coincidir con tu SO
3. **Abre DevTools** → Elements → `:root` para ver las variables cambiar
4. **Pruébalo tú mismo** – Agrega `--nuevo-color: red;` y úsalo con `var(--nuevo-color)`

**Tiempo:** 3 minutos. **Reflexión:** ¿Es conveniente o restrictiva la detección automática? ¿Deberían los usuarios siempre tener control?

---

#### Camino B: Toggle con JavaScript (Manual, Persistente)

Este método permite a los usuarios **cambiar manualmente** el modo oscuro con un botón. ¡Puedes guardar su elección en `localStorage` para hacerlo persistente!

**✅ Pros:** Control del usuario, puede ser persistente entre visitas, funciona independientemente del SO.  
**❌ Contras:** Requiere JavaScript, más código que mantener.

**Aprendizaje Práctico: Explora el Camino B en el Demo**

**📂 Continúa con el mismo archivo demo:** [`demo/05-dark-mode.html`](demo/05-dark-mode.html)

**🎯 Qué buscar (Camino B - Toggle JavaScript):**

El demo usa el atributo `data-theme` con JavaScript para cambiar manualmente:

```css
/* Modo claro (por defecto) */
:root {
	--bg-primary: #ffffff;
	--text-primary: #212529;
}

/* Modo oscuro cuando se establece el atributo */
[data-theme='dark'] {
	--bg-primary: #1a1a1a;
	--text-primary: #e9ecef;
}
```

```javascript
// Función de cambio
function toggleTheme() {
	const html = document.documentElement;
	const currentTheme = html.getAttribute('data-theme');
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

	// Aplicar nuevo tema
	html.setAttribute('data-theme', newTheme);

	// Guardar en localStorage para persistencia
	localStorage.setItem('theme', newTheme);
}

// Cargar tema guardado al cargar la página
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
	document.documentElement.setAttribute('data-theme', savedTheme);
}
```

**Cómo funciona:**

- El atributo `data-theme` controla qué reglas CSS se aplican
- `localStorage` guarda la preferencia del usuario en el navegador
- **Persiste entre recargas de página y sesiones**
- `getAttribute()` / `setAttribute()` gestionan el tema
- El botón toggle llama a `toggleTheme()` al hacer clic

**Diferencia clave del Camino A:**

- ✅ El usuario tiene **control manual**
- ✅ La preferencia **persiste** entre visitas
- ❌ Requiere JavaScript (no funcionará si JS está deshabilitado)

**📚 Pasos de aprendizaje:**

1. **Haz clic en el botón toggle** (icono de luna/sol en el encabezado)
2. **Recarga la página** – ¡Nota que recuerda tu elección!
3. **Abre DevTools → Application → Local Storage** – Encuentra `theme: "dark"`
4. **Ve el elemento HTML** – Observa `<html data-theme="dark">` cambiar
5. **Experimenta** – Prueba `localStorage.setItem('theme', 'dark')` en la Consola

**Tiempo:** 7 minutos. **Reflexión:** ¿Cuándo es mejor el control manual que el automático? ¿Qué tan importante es la persistencia para la UX?

---

---

#### Camino C: Checkbox + CSS (Elegante, Sin JavaScript)

Este método avanzado usa un **checkbox oculto** con el **combinador de hermanos general (`~`)** para controlar el tema. **¡Magia CSS pura!**

**✅ Pros:** Sin JavaScript, elegante, HTML semántico, uso creativo de selectores CSS.  
**❌ Contras:** Estructura HTML ligeramente más compleja, patrón menos común (pero muy educativo).

**Aprendizaje Práctico: Explora el Camino C en un Demo Separado**

**📂 El Camino C tiene su propio archivo demo dedicado:** [`demo/5C-dark-mode-checkbox.html`](demo/5C-dark-mode-checkbox.html)

**🎯 Qué buscar (Camino C - Método Checkbox):**

Esta técnica usa un **checkbox oculto** que controla elementos hermanos:

```css
/* Enfoque de temas con CSS puro */

/* Por Defecto: Tema Claro (Púrpura Tirio) */
:root {
	--toggle-shape: '\25D0'; /* Círculo relleno ◐ */

	--background: hsla(307, 45%, 50%, 0.75); /* Púrpura */
	--foreground: hsla(50, 100%, 54%, 0.9); /* Amarillo */
	--card: hsla(303, 50%, 43%, 0.9);
	--primary: hsla(318, 58%, 38%, 1);
}

/* Tema Oscuro: Activar cuando el checkbox está marcado */
/* Clave: ~ (combinador de hermanos general) */
#theme-toggle:checked ~ * {
	--toggle-shape: '\25D1'; /* Círculo delineado ◑ */

	--background: hsla(213, 100%, 18%, 0.9999); /* Índigo */
	--foreground: hsla(60, 60%, 49%, 0.9999); /* Amarillo-verde */
	--card: hsla(215, 100%, 26%, 0.9);
	--primary: hsla(204, 100%, 38%, 0.75);
}

/* Botón Toggle */
.theme-toggle-button {
	cursor: pointer;
	padding: 0.5rem 1rem;
	color: var(--foreground);
	background-color: var(--background);
	transition: all 0.3s;
}

.theme-toggle-button:before {
	content: var(--toggle-shape); /* ¡Símbolo dinámico! */
}
```

```html
<!-- Checkbox oculto controla el tema -->
<input type="checkbox" id="theme-toggle" hidden />

<!-- Todo el contenido va aquí -->
<main>
	<!-- El botón toggle usa <label> para controlar checkbox -->
	<label for="theme-toggle" class="theme-toggle-button"></label>

	<h1>Contenido estilizado con variables CSS</h1>
	<!-- Resto de tu contenido -->
</main>
```

**Cómo funciona:**

1. **Checkbox oculto** (`<input type="checkbox" id="theme-toggle" hidden>`) almacena el estado
2. **Label actúa como botón** (`<label for="theme-toggle">`) - hacer clic marca/desmarca el checkbox
3. **Combinador de hermanos** (`#theme-toggle:checked ~ *`) selecciona TODOS los hermanos cuando está marcado
4. **Variables CSS se actualizan** para todos los descendientes automáticamente
5. **Contenido Unicode** cambia (`--toggle-shape`) para retroalimentación visual
6. **¡Cero JavaScript necesario!**

**Por qué esto es elegante:**

- ✅ **Semántico:** El checkbox representa estado binario (claro/oscuro)
- ✅ **Solo-CSS:** Sin dependencias de JavaScript
- ✅ **Creativo:** Usa selectores CSS avanzados
- ✅ **Mantenible:** Toda la lógica del tema en CSS
- ✅ **Educativo:** Muestra el poder de los combinadores CSS

**La Magia de `~` (Combinador de Hermanos General):**

```css
/* Cuando el checkbox está marcado... */
#theme-toggle:checked 
	/* ...selecciona TODOS los hermanos siguientes (~) */
	~ * {
	/* ...y actualiza sus variables */
	--background: /* colores oscuros */ ;
}
```

**Técnica clave:**  
El checkbox debe estar **antes** de todo el contenido en HTML, y todo el contenido debe ser hermano. Esto permite que `~` alcance todo.

**📚 Pasos de aprendizaje:**

1. **Haz clic en el toggle del tema** (botón de símbolo en el encabezado)
2. **Abre DevTools → Elements** – Encuentra `<input id="theme-toggle">`
3. **Obsérvalo marcar/desmarcar** al hacer clic en la etiqueta
4. **Inspecciona estilos de `:root`** – Ve las variables cambiar con el estado `:checked`
5. **Prueba** – Agrega `#theme-toggle:checked ~ main { border: 5px solid red; }` para ver el selector hermano en acción
6. **Experimenta** – Crea tu propia paleta de colores con valores HSL

**Tiempo:** 10 minutos. **Reflexión:** ¿Cuándo es mejor el CSS elegante que JavaScript? ¿El enfoque de checkbox tiene sentido semántico?

> **Insight Pro:** Este enfoque elegante prueba que ¡no siempre necesitas JavaScript para interacciones complejas!

---

### Comparando los Tres Caminos

| Característica        | Camino A (CSS) | Camino B (JS)    | Camino C (Checkbox)            |
| --------------------- | -------------- | ---------------- | ------------------------------ |
| **JavaScript**        | ❌ Ninguno     | ✅ Requerido     | ❌ Ninguno                     |
| **Control Usuario**   | ❌ Solo auto   | ✅ Manual        | ✅ Manual                      |
| **Persistencia**      | ❌ No          | ✅ localStorage  | ❌ No (se puede añadir con JS) |
| **Detección SO**      | ✅ Automático  | ❌ Manual        | ❌ Manual                      |
| **Complejidad**       | ⭐ Simple      | ⭐⭐ Moderado    | ⭐⭐ Moderado                  |
| **Valor Educativo**   | ⭐⭐ Bueno     | ⭐⭐⭐ Excelente | ⭐⭐⭐ Excelente               |
| **Uso en Producción** | ✅ Común       | ✅ Más común     | ✅ Creativo                    |

**Ejemplos de Casos de Uso:**

- **Camino A (CSS):** Blogs, sitios de documentación (simple, respeta preferencia global del usuario)
- **Camino B (JavaScript):** Apps, dashboards (usuarios quieren control, necesitan persistencia)
- **Camino C (Checkbox):** Portafolios creativos, sitios educativos (elegante, muestra habilidades CSS)
- **Enfoque Combinado:** E-commerce, redes sociales (respetar SO pero permitir override)

> **Insight Clave:** Cada camino tiene compensaciones. El Camino A es más simple pero inflexible. El Camino B es más poderoso pero necesita JavaScript. El Camino C es elegante y educativo. ¡Elige según las necesidades de tu proyecto y objetivos de aprendizaje!

🎯 **Demos Interactivos:**

- **[Camino A y B: Demo Toggle JavaScript →](demo/05-dark-mode.html)** (Toggle manual + auto-detección)
- **[Camino C: Demo Checkbox + CSS →](demo/5C-dark-mode-checkbox.html)** (CSS puro)

### Combinando Ambos: Lo Mejor de Ambos Mundos

**Consejo pro:** ¡Puedes combinar ambos! Comienza con detección automática CSS, luego deja que JavaScript la anule:

```css
/* Respetar preferencia del SO por defecto */
@media (prefers-color-scheme: dark) {
	body {
		background: #121212;
		color: white;
	}
}
/* Pero permitir anulación manual */
body.light-override {
	background: white;
	color: black;
}
body.dark-override {
	background: #121212;
	color: white;
}
```

**Ejemplos de Casos de Uso:**

- **CSS Puro:** Blogs, sitios de documentación (simple, respeta la preferencia global del usuario).
- **Toggle JavaScript:** Apps, dashboards (los usuarios quieren control, necesitan persistencia).
- **Combinado:** E-commerce, redes sociales (respetar SO pero permitir anulación).

> **Insight Clave:** CSS puro es elegante pero inflexible. JavaScript agrega control pero requiere más trabajo. ¡Elige según las necesidades de tus usuarios!

---

## Módulo 6: Minimalismo vs. Maximalismo – ¿Menos o Más?

### ¿Qué Es?

Minimalismo: Diseños simples y limpios con mucho espacio. Maximalismo: Diseños audaces y ocupados con colores y detalles.

**Analogía:** El minimalismo es una biblioteca silenciosa; el maximalismo es un festival vibrante—ambos cuentan historias, solo de manera diferente.

### ¿Por Qué Usarlo?

- Minimalismo: Enfoca la atención, se siente profesional.
- Maximalismo: Destaca, muestra personalidad.
- Equilibrio: Usa minimal para claridad, maximal para impacto.

### Aprendizaje Práctico: Explora el Demo

**📂 Abre el archivo demo:** [`demo/06-minimalism-maximalism.html`](demo/06-minimalism-maximalism.html)

**🎯 Qué buscar:**

El demo contrasta dos filosofías de diseño opuestas. Aquí están las técnicas clave:

**Minimalismo:**

```css
.minimal-section {
	/* Mucho espacio en blanco */
	padding: 4rem 2rem;

	/* Paleta de color limitada */
	background: #ffffff;
	color: #333333;

	/* Tipografía simple y limpia */
	font-family: 'Helvetica Neue', sans-serif;
	line-height: 1.8;

	/* Espaciado generoso */
	margin-bottom: 3rem;
}

.minimal-card {
	padding: 3rem; /* Espacio para respirar */
	border: 1px solid #e0e0e0; /* Borde sutil */
	border-radius: 4px; /* Redondeo mínimo */
}
```

**Maximalismo:**

```css
.maximal-section {
	/* Fondos densos y en capas */
	background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #ffe66d);
	background-size: 200% 200%;
	animation: gradientShift 5s ease infinite;

	/* Patrones y texturas ricas */
	background-image: url('patron.png'), linear-gradient(135deg, #667eea 0%, #764ba2 100%);

	/* Tipografía audaz y variada */
	font-family: 'Impact', sans-serif;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

	/* Espaciado apretado, más densidad */
	padding: 1rem;
}
```

**Diferencias clave:**

- **Espaciado:** Minimalismo = generoso; Maximalismo = apretado
- **Color:** Minimalismo = 2-3 colores; Maximalismo = espectro completo
- **Elementos:** Minimalismo = pocos; Maximalismo = muchos
- **Peso visual:** Minimalismo = ligero; Maximalismo = pesado

**📚 Pasos de aprendizaje:**

1. **Desplázate por ambas secciones** – Siente la diferencia emocional
2. **Compara espaciado** – Mide valores de padding/margin en DevTools
3. **Cuenta colores** – ¿Cuántos colores distintos en cada sección?
4. **Nota la jerarquía** – ¿Cómo guía cada estilo tu atención?
5. **Prueba legibilidad** – ¿Cuál es más fácil de escanear? ¿Cuál es más memorable?
6. **Prueba híbrido** – ¿Puedes combinar diseño minimalista con acentos maximalistas?

**Tiempo:** 10 minutos. **Reflexión:** ¿Cuál comunica más efectivamente? ¿Tu audiencia prefiere calma o emoción? ¿Cuándo "menos" realmente significa "más"?

> **Insight Clave:** Las tendencias cambian—el minimalismo fue grande en los 2010s; el maximalismo está surgiendo por unicidad.

🎯 **[Ver Demo Interactivo: Minimalism vs. Maximalism →](demo/06-minimalism-maximalism.html)**

---

## Módulo 7: Narrativas Basadas en Scroll – Historias Que Se Despliegan

### ¿Qué Es?

Scrollytelling: Historias que se revelan al desplazar, con animaciones o medios.

**Analogía:** Como un libro de aventuras donde las páginas "animan" al pasarlas.

### ¿Por Qué Usarlo?

- Mantiene a los usuarios enganchados (tiempos de scroll más largos).
- Ideal para explicar temas complejos (ej. historias de datos).
- Advertencia: Puede ser pesado—optimiza para rendimiento.

### Aprendizaje Práctico: Explora el Demo

**📂 Abre el archivo demo:** [`demo/07-scrollytelling.html`](demo/07-scrollytelling.html)

**🎯 Qué buscar:**

El scrollytelling usa la **API Intersection Observer** para activar animaciones cuando los elementos entran al viewport:

```javascript
// Crear un observador para vigilar cuando los elementos entran en vista
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// El elemento es visible - agregar clase 'visible'
				entry.target.classList.add('visible');
			}
		});
	},
	{
		threshold: 0.2, // Activar cuando 20% del elemento es visible
	}
);

// Observar todas las secciones de la historia
document.querySelectorAll('.story-section').forEach((section) => {
	observer.observe(section);
});
```

```css
/* Estado inicial: oculto y desplazado hacia abajo */
.story-section {
	opacity: 0;
	transform: translateY(50px);
	transition: opacity 0.8s ease, transform 0.8s ease;
}

/* Estado revelado: visible y en su lugar */
.story-section.visible {
	opacity: 1;
	transform: translateY(0);
}
```

**Cómo funciona:**

- **Intersection Observer** vigila elementos que entran al viewport
- Mucho más **eficiente que scroll listeners** (mejor rendimiento)
- `threshold: 0.2` significa "activar cuando 20% visible"
- `isIntersecting` verifica si el elemento está en vista
- Las transiciones CSS crean revelaciones suaves

**📚 Pasos de aprendizaje:**

1. **Desplázate lentamente** – Observa cada sección aparecer con fade/slide
2. **Abre la Consola de DevTools** – El demo registra cuando las secciones se vuelven visibles
3. **Encuentra `.story-section`** – Ve cómo se agrega la clase `visible`
4. **Ajusta threshold** – Prueba cambiar `0.2` a `0.5` o `0.8` en el código
5. **Modifica transiciones** – Cambia `0.8s` a `2s` para animaciones más lentas
6. **Retrasos escalonados** – Nota cómo los elementos de estadísticas aparecen uno tras otro

**Tiempo:** 5-10 minutos. **Reflexión:** ¿La revelación progresiva mejora la narración o distrae del contenido? ¿Cuándo es apropiado el scrollytelling vs. gratuito?

> **Insight Clave:** Usa herramientas como GSAP para efectos avanzados—empieza simple.

🎯 **[Ver Demo Interactivo: Scrollytelling →](demo/07-scrollytelling.html)**

---

## Módulo 8: 3D en la Web – De Plano a Inmersivo

### ¿Qué Es?

Agrega profundidad 3D: CSS para efectos simples, WebGL para escenas complejas (ej. objetos rotativos).

**Analogía:** El diseño plano es una foto; el 3D es una escultura—puedes "caminar alrededor" de ella.

### ¿Por Qué Usarlo?

- Hace que los sitios sean inmersivos (ej. vistas previas de productos).
- Divertido para portafolios.
- Advertencia: Puede ralentizar sitios—usa fallbacks.

### Aprendizaje Práctico: Explora el Demo

**📂 Abre el archivo demo:** [`demo/08-3d-web.html`](demo/08-3d-web.html)

**🎯 Qué buscar:**

Las transformaciones 3D en CSS requieren **tres propiedades clave**. Aquí está la técnica de tarjeta con flip:

```css
/* Contenedor establece el espacio 3D */
.flip-container {
	perspective: 1000px; /* Crea profundidad - como distancia de cámara */
	height: 300px;
}

/* Tarjeta preserva transformaciones 3D para hijos */
.flip-card {
	width: 100%;
	height: 100%;
	transform-style: preserve-3d; /* ¡Esencial para 3D! */
	transition: transform 0.6s; /* Animación suave */
}

/* Rotar al pasar cursor */
.flip-container:hover .flip-card {
	transform: rotateY(180deg); /* Girar alrededor del eje Y */
}

/* Caras frontal y trasera */
.flip-front,
.flip-back {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden; /* Ocultar reverso cuando gira */
}

.flip-back {
	transform: rotateY(180deg); /* Empezar rotada */
}
```

**Los 3 pilares del 3D en CSS:**

1. **`perspective`** – Crea profundidad (menor = más extremo, mayor = sutil)
2. **`transform-style: preserve-3d`** – Habilita transformaciones 3D para hijos
3. **`backface-visibility: hidden`** – Oculta el lado trasero de los elementos

**Cómo funciona:**

- **Perspective** establece un contexto de visualización 3D
- **preserve-3d** mantiene el posicionamiento 3D a través de elementos anidados
- **transform: rotateY/X/Z** rota en espacio 3D
- **backface-visibility** previene el efecto "transparente"

**Ejemplo de cubo 3D:**

```css
.cube {
	transform-style: preserve-3d;
	animation: rotateCube 20s infinite linear;
}

/* Cada cara posicionada en espacio 3D */
.cube-front {
	transform: translateZ(100px);
}
.cube-back {
	transform: rotateY(180deg) translateZ(100px);
}
.cube-right {
	transform: rotateY(90deg) translateZ(100px);
}
.cube-left {
	transform: rotateY(-90deg) translateZ(100px);
}
.cube-top {
	transform: rotateX(90deg) translateZ(100px);
}
.cube-bottom {
	transform: rotateX(-90deg) translateZ(100px);
}
```

**📚 Pasos de aprendizaje:**

1. **Pasa cursor sobre la tarjeta flip** – Observa cómo los lados frontal/trasero intercambian
2. **Observa el cubo rotando** – Ve las seis caras en espacio 3D
3. **Abre las DevTools** – Encuentra `.flip-container` y cambia `perspective` de `1000px` a `500px` o `2000px`
4. **Modifica rotación** – Prueba `rotateX(180deg)` en lugar de `rotateY(180deg)`
5. **Prueba `preserve-3d`** – Elimínalo y ve cómo se rompe el efecto 3D
6. **Ajusta velocidad de animación** – Cambia `20s` a `5s` para rotación más rápida

**Tiempo:** 5-10 minutos. **Reflexión:** ¿Cuándo mejora el 3D la UX (ej. vistas previas de productos) vs. cuándo es solo decoración visual? ¿Cuál es el costo de rendimiento?

> **Insight Clave:** CSS para básicos; Three.js para avanzado—prueba rendimiento.

🎯 **[Ver Demo Interactivo: 3D on the Web →](demo/08-3d-web.html)**

---

## Demos Interactivos

💡 **¡Todos los demos están listos para explorar!** Hemos creado 8 demos completos e interactivos para cada módulo. Cada demo incluye:

- **Código funcional** que puedes inspeccionar y del cual aprender
- **Explicaciones detalladas** y mejores prácticas integradas en la página
- **Reflexiones críticas de diseño** siguiendo la metodología Atelier
- **Archivos HTML autocontenidos** que puedes descargar, modificar y hacer tuyos
- **Sin dependencias externas** – ¡todo funciona offline!

**Cómo usar los demos:**

1. **Navega en tu navegador** – Haz clic en cualquier enlace de demo para verlo en acción
2. **Ve el código fuente** – Haz clic derecho y "Ver código fuente de la página" para ver todo el código
3. **Usa las DevTools** – Presiona F12 para inspeccionar elementos y experimentar con cambios en vivo
4. **Descarga y modifica** – Guarda los archivos HTML y personalízalos para tus proyectos
5. **Aprende haciendo** – Cambia valores, rompe cosas, arregla—¡así es como aprendes!

👉 [**Ver todos los demos →**](demo/)

---

## Conclusión y Proyecto Final

¡Has explorado 8 tendencias! El diseño web es sobre comunicación: las tendencias ayudan a "hablar" visualmente.

**Proyecto Final:** Elige 2-3 tendencias y aplícalas a un sitio simple (ej. un portafolio de una página).

**Enfoque sugerido:**

1. **Empieza con un demo** – Elige tu archivo demo favorito y guárdalo como punto de partida
2. **Combina tendencias** – Mezcla glassmorphism con modo oscuro, o parallax con tipografía fluida
3. **Hazlo tuyo** – Reemplaza el contenido con tu propio texto, imágenes y colores
4. **Prueba exhaustivamente** – Verifica en móvil, prueba accesibilidad, verifica rendimiento
5. **Reflexiona profundamente** – ¿Qué funcionó? ¿Qué cambiarías? ¿Mejora la experiencia del usuario?

**Reflexión Atelier:** ¿Cómo alinean estas tendencias con el diseño crítico? Pregúntate:

- "¿Mejora esto la comprensión del usuario o solo se ve bien?"
- "¿Quién podría tener dificultades con esta elección de diseño?"
- "¿Cuál es el propósito de cada elemento visual?"
- "¿Podría lograr el mismo objetivo con técnicas más simples?"

**Takeaway Clave:** Las tendencias son herramientas—úsalas con pensamiento. ¡Experimenta, reflexiona e itera!

## Referencias

- [Awwwards](https://www.awwwards.com/) – Ejemplos de tendencias e inspiración de diseño
- [Nielsen Norman Group](https://nngroup.com/) – Investigación UX sobre modo oscuro, parallax y accesibilidad
- [MDN Web Docs](https://developer.mozilla.org/) – Documentación completa de CSS y APIs web
- **Archivos Demo** – Los 8 demos interactivos están en la carpeta `demo/`—¡abre, inspecciona y aprende!