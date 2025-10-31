---
layout: lesson
title: 'Práctica: Informe de Análisis de Sitios Web Sobresalientes (SOW)'
title_alt: ''
slug: web-analysis-practice
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/analisis-web/practica/
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## Presentación

Esta práctica propone crear una página `/sow/index.html` donde cada estudiante analice al menos **4 sitios premiados** (por ejemplo, ganadores en [Awwwards](https://www.awwwards.com/), [Webby Awards](https://www.webbyawards.com/), [FWA](https://thefwa.com/) o [CSS Design Awards](https://www.cssdesignawards.com/)). El objetivo es practicar el análisis crítico de diseño web siguiendo la metodología Atelier: los alumnos revisarán aspectos como estructura, usabilidad, visuales y desempeño, y reflejarán sus conocimientos en un informe en formato web.

>Importante: Revisar priemro la guía de análisis: [https://ruvebal.github.io/web-atelier-udit/lessons/es/analisis-web/](https://ruvebal.github.io/web-atelier-udit/lessons/es/analisis-web/)

---

## 🎯 Objetivos de la práctica

- **Análisis crítico**: Cada sitio debe examinarse desde varias perspectivas (estructura, diseño visual, interacción, rendimiento, etc.) e incluir una reflexión crítica sobre el contexto y los posibles sesgos o implicaciones sociales.
- **Práctica iterativa (Atelier)**:
  1. **Selección**: ¿Por qué elegiste este sitio premiado?
  2. **Impresión inicial**: ¿Qué sensaciones produce?
  3. **Estructura**: ¿Cómo está organizada la información?
  4. **Visual**: Paleta, tipografía, branding.
  5. **Interacción**: Animaciones, efectos, microinteracciones.
  6. **Usabilidad**: Claridad, accesibilidad, carga.
  7. **Técnico**: Velocidad, semántica, Core Web Vitals.
  8. **Criterios de excelencia**: Creatividad, contenido, UX.
  9. **Conclusión**: Puntos fuertes, debilidades y aprendizajes.

---

## 📂 Estructura semántica propuesta

```html
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Some Outstanding Webs – Análisis de Sitios Premiados</title>
		<link rel="stylesheet" href="/assets/css/index.css" />
		<link rel="stylesheet" href="/assets/css/sow.css" />
	</head>
	<body>
		<header>
			<h1>Some Outstanding Webs</h1>
			<nav>
				<!-- Menú de navegación fijo -->
				<ul>
					<li><a href="#site-awwwards">Awwwards</a></li>
					<li><a href="#site-webby">Webby</a></li>
					<li><a href="#site-fwa">FWA</a></li>
					<li><a href="#site-cssda">CSSDA</a></li>
				</ul>
			</nav>
		</header>

		<main>
			<!-- Secciones individuales para cada sitio -->
			<section id="site-awwwards">
				<h2>Awwwards</h2>
				<!-- Contenido de análisis del sitio Awwwards -->
			</section>

			<section id="site-webby">
				<h2>Webby Awards</h2>
				<!-- Contenido de análisis del sitio Webby -->
			</section>

			<!-- Más secciones para FWA, CSS Design Awards, etc. -->
		</main>

		<footer>
			<p>© 2025 Web Atelier (UDIT) – Informe de análisis.</p>
		</footer>
	</body>
</html>
```

En este esquema, usamos elementos como `<header>`, `<nav>`, `<main>`, `<section>`, `<h1>…<h6>`, y `<footer>` para dar significado a cada bloque. Usar HTML semántico mejora la legibilidad del código y la accesibilidad [GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L181-L184). El CSS se carga en orden: primero el archivo general `/assets/css/index.css` (plantilla base), y luego un `sow.css` específico que puede sobrescribir estilos si es necesario.

---

## 📌 Menú fijo (sticky)

Para facilitar la navegación entre secciones, el menú debe ser “sticky” o fijo en la parte superior. Con CSS es sencillo:

```css
header {
	background: #fff;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
nav {
	position: sticky;
	top: 0;
	z-index: 1000;
}
nav ul {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
}
nav ul li {
	margin-right: 1rem;
}
nav ul li a {
	text-decoration: none;
	color: #333;
}
```

Con esto el `<nav>` quedará fijo al hacer scroll. Como opción avanzada, se pueden añadir _scroll-behavior: smooth_ en CSS para transiciones suaves al hacer clic en los enlaces del menú, o estilos hover/active en los links para mayor interactividad. Por ejemplo:

```css
html {
	scroll-behavior: smooth;
}
nav ul li a:hover,
nav ul li a:focus {
	color: #007acc;
	outline: none;
}
```

---

## 🎬 Portada animada (opcional)

Se puede incluir una **portada o intro animada** con tipografía llamativa (“Some Outstanding Webs”). Esto es opcional, pero aporta un toque creativo. Un ejemplo básico de animación CSS sería un efecto _fade-in_ en el título:

```html
<section class="cover">
	<h1 class="title">Some Outstanding Webs</h1>
</section>
```

```css
.cover {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: #222;
	color: #fff;
}
.title {
	font-size: 3rem;
	text-transform: uppercase;
	opacity: 0;
	animation: fadeIn 2s forwards ease-in;
}
@keyframes fadeIn {
	to {
		opacity: 1;
	}
}
```

_*Avanzado:* Para un efecto “máquina de escribir”, se podría usar la técnica de animar el *width* del texto. Por ejemplo:_

```css
.title {
	overflow: hidden;
	white-space: nowrap;
	border-right: 0.15em solid currentColor;
	animation: typing 3s steps(30, end) forwards, blink-caret 0.75s step-end infinite;
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
	50% {
		border-color: transparent;
	}
}
```

Este código hará que el título se “escriba” letra por letra. Se valoran las animaciones suaves y que no distraigan demasiado del contenido principal. Cualquier animación extra (rotaciones suaves, fondo dinámico, etc.) es bienvenida en la versión avanzada, siempre que no afecte negativamente la experiencia ni la accesibilidad.

---

## 📝 Secciones de análisis

Cada sitio premiado debe tener su propia sección con la siguiente estructura sugerida:

- **Iframe del sitio:** Insertar el sitio en un `<iframe>` para que el lector pueda explorar la página directamente (si el sitio lo permite). Por ejemplo:

```html
<iframe src="https://www.awwwards.com" title="Sitio Awwwards" width="100%" height="400" loading="lazy"></iframe>
```

- Ajusta `height` según convenga y añade `loading="lazy"` para mejorar el rendimiento. Verifica que el sitio permita mostrarse en iframe (algunos bloquean esta opción, en cuyo caso bastaría con un enlace).

- **Texto de análisis:** A continuación, un texto descriptivo en columnas responsivas. Usa CSS de multicolumna o _flexbox_ para que en pantallas grandes el texto fluya en dos columnas. Ejemplo con CSS multicolumna:

```html
<div class="analysis-text">
	<p>El sitio de Awwwards presenta una experiencia inmersiva con un efecto parallax en el header...</p>
	<!-- más párrafos -->
</div>
```

```css
.analysis-text {
	columns: 1;
	column-gap: 2rem;
}
@media (min-width: 800px) {
	.analysis-text {
		columns: 2;
	}
}
```

- Esto asegura que el texto sea **legible** en móviles (una columna) y se distribuya en dos columnas en pantallas amplias. Asegúrate de explicar cada aspecto según el esquema de análisis (estructura, visual, interacción, etc.)[GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L140-L148).

- **Grid de capturas:** Muestra capturas de pantalla representativas del sitio en una cuadrícula (galería). Por ejemplo:

```html
<div class="screenshots">
	<img src="/assets/sow/awwwards1.png" alt="Captura de pantalla 1" />
	<img src="/assets/sow/awwwards2.png" alt="Captura de pantalla 2" />
	<!-- más imágenes -->
</div>
```

```css
.screenshots {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 1rem;
}
.screenshots img {
	width: 100%;
	height: auto;
	border: 1px solid #ccc;
}
```

- La cuadrícula se ajusta automáticamente al ancho disponible. Este bloque ilustra visualmente lo analizado en el texto. Incluye pies de foto breves en `alt` describiendo cada captura.

- **Conclusión:** Un párrafo o lista final con las conclusiones y **takeaways**. ¿Qué hace sobresaliente al sitio? ¿Dónde flaquea? ¿Qué aprendizajes se obtienen? Esta conclusión permite cerrar el análisis con una reflexión crítica breve[GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L149-L152).

En cada sección se espera utilizar encabezados jerárquicos (\<code>\<h2>\</code> o \<code>\<h3>\</code>), párrafos y listas para mantener la semántica. Por ejemplo:

```html
<section id="site-awwwards">
	<h2>Awwwards - Análisis del sitio ganador</h2>
	<iframe ...></iframe>
	<div class="analysis-text">
		<p>El sitio de Awwwards X utiliza muchos efectos en scroll...</p>
		<ul>
			<li>
				<strong>Estructura:</strong>
				...
			</li>
			<li>
				<strong>Visual:</strong>
				...
			</li>
			<!-- etc -->
		</ul>
	</div>
	<div class="screenshots">
		<img src="img1.png" alt="Captura 1" />
		<img src="img2.png" alt="Captura 2" />
	</div>
	<p class="conclusion">
		**Conclusión:** El sitio destaca por su creatividad en animaciones, pero podría mejorar la carga para optimizar el
		rendimiento en móviles.
	</p>
</section>
```

Como tareas básicas vs. avanzadas, sugiere incluir más detalles en el texto o efectos extras en la versión avanzada (por ejemplo, un pequeño slider/carousel para las capturas en lugar de grid estático).

---

## 🎨 Uso de CSS

- **Hoja principal (`index.css`)**: Debería contener estilos generales (tipografías, colores, reset, etc.). Carga este archivo primero.

- **Hoja específica (`sow.css`)**: Carga después de `index.css` para sobrescribir o añadir estilos propios de este informe. Por ejemplo, en `sow.css` definirás las reglas de layout del menú, columnas de texto y grid de imágenes descritas arriba. Así:

```css
<link rel="stylesheet" href="/assets/css/index.css">
<link rel="stylesheet" href="/assets/css/sow.css">

```

---

## 🌟 Opciones avanzadas

Para alumnos avanzados se pueden incorporar efectos adicionales:

- **Animaciones CSS**: Transiciones suaves en botones e imágenes (`:hover { transform: scale(1.05); }`), parallax scrolling con background-attachment, o microinteracciones con `@keyframes`.

- **Scroll reveal**: Usar librerías JavaScript ligeras o la API de intersección para animar secciones al entrar en viewport.

- **SVG Animado**: Incluir gráficos SVG con animación (e.g., un logo que dibuje su contorno).

- **Accesibilidad extra**: Añadir roles ARIA en el menú de navegación o controles para lectores de pantalla.

- **Performance**: Implementar `loading="lazy"`, optimizar imágenes (usar WebP/AVIF, versiones responsive), y código CSS/JS limpio.

Estos son opcionales pero demuestran profundidad de diseño. Recuerda siempre probar con herramientas como Lighthouse, WAVE o validador W3C para respaldar tu análisis técnico[GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L181-L184).

---

## 🤔 Reflexión crítica (Atelier)

Más allá de lo estético, el informe debe incluir **reflexiones críticas**. ¿Qué transmite cada sitio en términos de cultura o propósito? ¿Hay elementos que benefician a unos usuarios y excluyen a otros? La metodología Atelier enfatiza la importancia de cuestionar el _por qué_ detrás del diseño[GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L183-L184). Por ejemplo:

- ¿A quiénes atrae el estilo visual? ¿Refuerza estereotipos o es inclusivo?

- ¿Qué valores o mensajes subyacen en el contenido?

- ¿Se justifica técnicamente cada “efecto wow” o es meramente decorativo?

- ¿Cómo equilibra el sitio forma vs. función (¿creatividad vs. usabilidad?)[GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L140-L148)?

Estas preguntas deben guiar tu conclusión final de cada análisis. Aporta puntos de mejora basados en criterios objetivos y en tu juicio profesional. Recuerda que la práctica no es solo describir, sino profesionalizar el discurso reflexionando sobre cada hallazgo[GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L183-L184)[GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L140-L148).

---

## Ejemplos de código (básico vs avanzado)

- **HTML semántico básico:** Usa las etiquetas principales y una estructura simple como la mostrada arriba.

- **HTML avanzado:** Podrías usar más `section` o `article` para cada parte del análisis, `<aside>` para notas laterales, o `<figure>`+`<figcaption>` en las capturas.

- **CSS menú básico:** `position: sticky` + diseño flex.

- **CSS menú avanzado:** Menú responsive con _hamburger_ en móvil, o menú colapsable con transiciones.

- **Capturas básico:** Grid estático como se mostró.

- **Capturas avanzado:** Carrusel con flechas usando CSS+JS, o efecto _lightbox_ al hacer click en la imagen.

- **Animación básica:** `@keyframes fadeIn`.

- **Animación avanzada:** Tipografía _typing_ mostrada arriba, o incluso pequeñas animaciones Lottie/SVG para el título.

Cada bloque de código ejemplificado arriba es un punto de partida. Personalízalo y complétalo de acuerdo a tu criterio de diseño y análisis. Lo importante es mantener código limpio, bien indentado, comentado si es necesario, y sin errores de validación.

---

## ✅ Entregable

- Archivo `/sow/index.html` con al menos 4 sitios analizados.
- Estilos en `/assets/css/index.css` y `/assets/css/sow.css`.
- Menú fijo, iframes, textos críticos, grid de capturas y conclusión.
- Opcional: portada animada.
- **Commit en GitHub.**

```bash
git add sow/index.html assets/css/sow.css
git commit -m "Add SOW analysis report with 4 award-winning sites"
git push
```

---

## 📊 Evaluación

- **Profundidad y claridad** del análisis.
- **Estructura semántica y código limpio**.
- **Diseño y calidad visual**.
- **Reflexión crítica** siguiendo Atelier.

¡Ánimo con la práctica! Este ejercicio busca combinar observación estética con rigor técnico. **Analiza cada sitio como un profesional:** describe, evalúa y propone mejoras basadas en criterios claros. Usa la guía y las referencias como apoyo, pero sé creativo en tu implementación. Un buen análisis equilibrará forma y fondo[GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L140-L148)[GitHub](https://github.com/ruvebal/web-atelier-udit/blob/de2316cf9de7f7ce5a5014a5b120e5dd20913213/web-foundations/docs/lessons/es/analisis-web/index.md#L183-L184), y demostrará tu pensamiento crítico según la metodología Atelier.

**¡Buena suerte y manos a la obra!**