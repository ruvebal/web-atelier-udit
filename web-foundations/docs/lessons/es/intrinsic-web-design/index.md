---
layout: lesson
title: 'Diseño Web Intrínseco: Container Queries y Subgrid'
title_alt: 'Intrinsic Web Design: Container Queries & Subgrid'
slug: intrinsic-web-design
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/intrinsic-web-design/
week: 3
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Objetivo de la sesión

- Comprender cuándo usar Container Queries y Subgrid.
- Construir una galería responsive real (mobile-first, progresiva).
- Hacer un commit con el resultado y una reflexión crítica.

---

# Guía Pedagógica: Container Queries y Subgrid en Diseño Responsive

📌 Analogía sencilla:

- **Container Queries** = "¿Qué hago según el tamaño del cajón en el que estoy?"
- **Subgrid** = "¿Cómo me alineo siguiendo las líneas del cajón de arriba?"

### Introducción: Evolución del Diseño Responsivo

Introducción: Evolución del Diseño Responsivo

El diseño web responsivo (Responsive Web Design, RWD) surgió como respuesta a la proliferación de dispositivos móviles. En 2010, Ethan Marcotte introdujo la idea de diseñar sitios que se adapten a múltiples tamaños de pantalla
freecodecamp.org
. Esto llevó al uso extendido de media queries, que permiten aplicar estilos CSS según el ancho del viewport (pantalla) del dispositivo. Durante la década pasada, los media queries fueron la principal herramienta para construir layouts adaptativos a diferentes dispositivos.

Sin embargo, el enfoque tradicional de media queries tiene limitaciones. Son reglas globales basadas en el tamaño de la ventana del navegador; esto funciona a escala de página completa, pero no considera el contexto de cada componente. Por ejemplo, un mismo componente (como una tarjeta de artículo) podría aparecer en una columna ancha o en una barra lateral angosta. Con solo media queries globales, es difícil hacer que ese componente se adapte de forma independiente a cada contexto sin introducir múltiples reglas condicionales o duplicar código CSS.

En los últimos años ha surgido un cambio hacia lo que la experta Jen Simmons denomina Intrinsic Web Design – crear componentes conscientes de su contexto, capaces de adaptarse según el espacio disponible donde se ubiquen
freecodecamp.org
. Las nuevas especificaciones de CSS, especialmente Container Queries y Subgrid, hacen posible este enfoque intrínseco al permitir diseños responsive a nivel de componente. Estas características representan el siguiente paso evolutivo del diseño responsivo, solucionando problemas históricos que afrontábamos con hacks o JavaScript.

Metodología Atelier: En nuestro curso adoptamos una metodología tipo Atelier, que enfatiza el aprendizaje práctico, experimental y colaborativo en un entorno creativo
oakinnovation.com
. Siguiendo esta filosofía, combinaremos teoría y práctica: primero entenderemos qué son las Container Queries y Subgrid (teoría), y luego las aplicaremos en un proyecto concreto (práctica). Al finalizar, podrás implementar un diseño real usando estas técnicas y hacer un commit de tu trabajo.

Container Queries: "¿Qué hago según el tamaño del cajón en el que estoy?"

Container Queries (consultas de contenedor) permiten que un elemento aplique distintos estilos CSS en función de las características de su contenedor padre, en lugar de basarse únicamente en las dimensiones de la ventana del navegador. En otras palabras, responden a la pregunta: "¿Qué estilo debo tener según el tamaño del cajón (contenedor) en el que estoy?". Esta funcionalidad ha sido muy esperada por desarrolladores web, ya que aborda una limitación de los media queries tradicionales
freecodecamp.org
.

En esencia, una container query activa estilos condicionados al ancho/alto (u otras propiedades) del elemento contenedor. Si el contenedor cumple cierta condición de tamaño, entonces los elementos dentro de él se estilizan de cierta forma. Esto nos permite diseñar componentes verdaderamente modulares y reutilizables, que se adaptan a diferentes contextos de diseño automáticamente. De este modo, el estilo de un componente depende de su espacio disponible, no del tamaño global de pantalla
blog.logrocket.com
freecodecamp.org
. Esto elimina la necesidad de sincronizar manualmente breakpoints entre un componente y su contenedor, haciendo el diseño responsivo más sencillo y mantenible
blog.logrocket.com
.

Comparación con Media Queries: A diferencia de una media query (que mira el tamaño del viewport), una container query mira el tamaño de un ancestro contenedor específico
developer.mozilla.org
. Por ejemplo, con media queries diríamos "si la pantalla mide menos de 600px, tal elemento será 100% ancho". Con container queries podemos decir "si el contenedor .sidebar mide menos de 300px, tal elemento se apila en columna" independientemente de lo que mida la pantalla completa. Esto empodera a cada componente para saber adaptarse según el espacio que le rodea, logrando diseños más contextuales y flexibles
freecodecamp.org
freecodecamp.org
. En la práctica, es común combinar ambos enfoques: las media queries siguen utilizándose para la estructura global de la página, mientras que las container queries manejan variaciones a nivel de componentes específicos.

### Metodología Atelier

En nuestro curso adoptamos la metodología Atelier: aprendizaje práctico, experimental y colaborativo. Por tanto, esta guía combina teoría con un ejercicio práctico para integrar los conceptos en un commit real.

---

## Parte 1: Container Queries

### ¿Qué son?

Permiten aplicar estilos CSS a un componente según el tamaño de su contenedor padre.

### Sintaxis básica

```css
.card-list {
	container-type: inline-size;
}

@container (min-width: 450px) {
	.card {
		flex-direction: row;
	}
}
```

### Ventajas

- Adaptabilidad modular.
- Evita duplicación de media queries globales.
- Permite componentes verdaderamente reutilizables.

---

## Parte 2: Subgrid

### ¿Qué es?

Otra cuestión clásica del CSS layout: "¿Cómo puedo alinear elementos dentro de un elemento anidado siguiendo la misma cuadrícula del elemento padre?". Subgrid es la respuesta a esta pregunta. Esta funcionalidad, introducida en CSS Grid Layout Nivel 2, permite que una cuadrícula hija (nested grid) herede y utilice las definiciones de filas y/o columnas de su contenedor padre
developer.mozilla.org
. En términos sencillos, Subgrid hace que un elemento “se alinee con las líneas del cajón de arriba”, es decir, comparte la misma retícula que su ancestro.

El problema que resuelve Subgrid

Antes de subgrid, si teníamos una rejilla dentro de otra, las celdas internas no estaban realmente alineadas con las externas. Por ejemplo, imagina que diseñas un listado de tarjetas de artículos usando CSS Grid: la rejilla principal coloca varias tarjetas en columnas. A su vez, cada tarjeta es una pequeña rejilla con filas (por ejemplo, título, contenido y pie de tarjeta). Sin subgrid, cada tarjeta define independientemente la altura de sus filas según su propio contenido, lo que provoca desencajes. Si una tarjeta tiene más texto en el contenido, su altura aumenta y sus secciones internas (título, pie) dejan de alinearse con las de las tarjetas vecinas. En otras palabras, las filas equivalentes ya no quedan a la misma altura entre distintas tarjetas, rompiendo la alineación visual uniforme
blog.logrocket.com
.

Figura 1: Tres tarjetas en un grid sin utilizar subgrid. La tarjeta central tiene más contenido, lo que hace que su título (sección superior) y su pie (sección inferior) se desplacen hacia abajo, quedando desalineados respecto a las tarjetas de los lados
blog.logrocket.com
. Cada tarjeta maneja sus propias filas, de modo que el aumento de contenido en una no afecta a las demás – esto resulta en una visual inconsistente.

Para solucionar esto históricamente se recurría a trucos, como forzar alturas fijas, usar flexbox para igualar alturas, o calcular con JavaScript la alineación. Estas soluciones son subóptimas y difíciles de mantener. Subgrid proporciona una solución nativa: permite que las filas (o columnas) de la grilla hija se sincronicen con las de la grilla padre, de forma que todas las tarjetas compartan la misma estructura de tracks (pistas) sin duplicar definiciones.

Cuando definimos en CSS grid-template-rows: subgrid; (o grid-template-columns: subgrid;) en un contenedor grid hijo, no se crea una nueva estructura de tracks para ese hijo, sino que usará los tracks ya definidos por el grid padre
developer.mozilla.org
. En el ejemplo anterior, si la rejilla principal define que cada fila (track) de las tarjetas tiene, digamos, auto de altura, al aplicar subgrid en las filas de cada tarjeta, todas las tarjetas alinearán sus secciones internas exactamente en esas mismas alturas. Así, aunque una tarjeta tenga más contenido en el cuerpo, su sección de título y pie permanecen en la misma línea horizontal que los títulos y pies de las otras tarjetas, ya que comparten la misma rejilla base.

Figura 2: Las mismas tres tarjetas tras aplicar Subgrid en sus filas. Ahora todas las tarjetas utilizan la cuadrícula del contenedor padre: a pesar de que la tarjeta central tiene más contenido, los títulos y pies de todas ellas permanecen perfectamente alineados entre sí
blog.logrocket.com
. Subgrid logra que las filas mantengan su posición inicial en la retícula general pese a que el contenido interno varíe, solucionando el problema de alineación.

Algunos detalles importantes de Subgrid:

Puedes aplicar subgrid por separado a columnas, a filas, o a ambas dimensiones. Por ejemplo, grid-template-columns: subgrid; hará que las columnas de la grilla hija coincidan con las del padre (útil para alinear elementos verticalmente en diferentes secciones), mientras que grid-template-rows: subgrid; alinea las filas (útil en casos como las tarjetas para alinear encabezados, pies, etc.). Incluso es posible subgrid en ambas direcciones
developer.mozilla.org
.

Para que funcione, el elemento padre (grid contenedor) debe tener definidos explícitamente sus tracks en esa dimensión, ya sea mediante grid-template-rows/columns o mediante grid-auto-rows/columns. El subgrid hijo entonces hereda esas medidas. Las gaps (espacios entre filas/columnas) también se heredan, aunque el subgrid puede sobrescribirlos si necesita un gap distinto
developer.mozilla.org
.

Subgrid no reinventa el layout, simplemente sincroniza. Dentro de un subgrid, puedes seguir posicionando los elementos normalmente, usando líneas de la grilla padre. Los nombres de línea también se heredan, lo que facilita posicionar elementos alineados exactamente con ciertas guías definidas en el padre.

Compatibilidad actual: Si bien inicialmente Subgrid solo funcionaba en Firefox, a fecha de 2023 ya está implementado en los navegadores modernos principales (Chrome, Safari, Edge)
developer.mozilla.org
. Esto significa que por fin podemos usarlo en producción (asegurándonos de que nuestros usuarios estén en versiones actualizadas de navegador).

En resumen, Subgrid es especialmente útil en diseños complejos y componibles: sistemas de tarjetas, layouts editoriales con múltiples columnas, formularios alineados, etc., donde quieras evitar “descosidos” visuales. Ahora llevaremos todo este conocimiento a la práctica con un ejercicio integrado.

### Sintaxis básica

```css
.card {
	display: grid;
	grid-template-rows: subgrid;
}
```

### Ventajas

- Alineación perfecta entre elementos anidados.
- Soluciona problemas clásicos de layout inconsistentes.

---

## Parte 3: Ejercicio Práctico

### Objetivo

Diseñar una galería de tarjetas que se adapte automáticamente a su contenedor y alinee sus secciones internas con Subgrid.

### Estructura HTML

```html
<section class="gallery-container">
	<div class="gallery-grid">
		<article class="card">
			<h2 class="card-title">Título 1</h2>
			<p class="card-content">Contenido breve...</p>
			<footer class="card-footer">Leer más</footer>
		</article>
		<!-- Más tarjetas -->
	</div>
</section>
```

### Estilos CSS

```css
.gallery-container {
	container-type: inline-size;
	padding: 1rem;
}

.gallery-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-auto-rows: auto;
	gap: 16px;
}

.card {
	display: grid;
	grid-template-rows: subgrid;
	padding: 1rem;
	background: #f9f9f9;
	border: 1px solid #ddd;
	border-radius: 4px;
}
```

### Container Queries aplicadas

```css
@container (max-width: 399px) {
	.gallery-grid {
		grid-template-columns: 1fr !important;
	}
	.card {
		text-align: center;
	}
}

@container (min-width: 400px) and (max-width: 799px) {
	.gallery-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

@container (min-width: 800px) {
	.gallery-grid {
		grid-template-columns: repeat(3, 1fr);
	}
}
```

---

## Parte 4: Integración Dinámica con JavaScript (opcional)

Usar un servicio como ImageKit.io para cargar imágenes dinámicamente. Desde JavaScript, fetch de URLs de imágenes y generación de tarjetas.

### Pasos

1. Crear carpeta pública en ImageKit.
2. Obtener JSON de imágenes.
3. Iterar sobre los datos y renderizar `.card` por cada imagen.

---

## Parte 5: Reflexión Final y Commit

### Actividades

- Probar el comportamiento en distintos tamaños.
- Documentar decisiones en el código.
- Realizar commit con mensaje:

```bash
git commit -m "Add responsive gallery with container queries and subgrid"
```

---

## Recursos

- [MDN Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- [MDN Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid)
- [LogRocket: Container + Subgrid](https://blog.logrocket.com/using-css-subgrids-container-queries/)
- [freeCodeCamp: Media vs Container Queries](https://www.freecodecamp.org/news/media-queries-vs-container-queries/)
- [Atelier Method – OakInnovation](https://www.oakinnovation.com/blog/free-business-theory-advice/the-atelier-method)

---