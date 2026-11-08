---
layout: lesson
title: 'Animación SVG: un favicon ruvebal, siete técnicas'
title_alt: 'Sesión maestra de animación SVG'
slug: svg-master-session
date: 2026-11-08
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/web-animations/svg-master-session/
---

<aside class="lesson-framing" aria-label="Idea principal y prueba de taller">
<p><strong>Idea principal:</strong> la mejor animación es la técnica más sencilla que logra el movimiento deseado, mantiene el código comprensible y respeta a quienes usan la página.</p>
<p><strong>Prueba de taller:</strong> comparar el mismo favicon ruvebal con técnicas nativas de SVG/CSS y bibliotecas JavaScript, y defender cuál conviene a esta landing page.</p>
</aside>

## Encargo

La fuente visual de esta sesión es el favicon de Web Atelier: 15 trazados superpuestos que usan la paleta del curso (azul marino, azul, violeta y chartreuse). El favicon y el icono principal de la portada comparten un ciclo CSS de color de ocho segundos: cada faceta recorre la paleta con un pequeño desfase, mientras la geometría permanece quieta. En la portada, el SVG externo se sustituye progresivamente por una copia inline: al seleccionar una faceta se invierte su color; las flechas recorren las facetas y Enter o Espacio alternan la elegida. El ciclo se detiene con `prefers-reduced-motion`; algunos navegadores también pueden pausar o bloquear la animación del favicon. La navegación y la comparación usan una copia estática para que el movimiento no altere la demostración común.

Abre la [comparación interactiva de técnicas (demo en inglés)]({{ '/lessons/en/web-animations/svg-master-session/demo/' | relative_url }}). La ronda 1 plantea la misma tarea y el mismo tiempo a transiciones/keyframes CSS, SMIL, WAAPI, GSAP, Motion y Anime.js. La ronda 2 cambia la tarea para mostrar la fortaleza de cada técnica. La ronda 3 compara cómo reciben, guardan, interrumpen y coordinan interacción por faceta. La sección de recursos reproduce JSON Lottie y un paquete dotLottie v2, con scrubbing temporal y cambio de variantes. El proyecto Rive en RML está verificado y listo para exportar; el `.riv` firmado requiere iniciar sesión en la CLI de Rive.

## Resultados de aprendizaje

Al terminar, el alumnado podrá explicar cuándo conviene insertar un SVG inline; comparar transiciones y keyframes CSS, SMIL, WAAPI, GSAP, Motion para JavaScript y Anime.js; distinguir una técnica de un formato exportado/runtime; escoger una solución con criterios de encaje visual, claridad, coste y accesibilidad; y crear una versión del favicon ruvebal compatible con movimiento reducido.

## Mapa de técnicas

<aside class="lesson-emphasis lesson-emphasis--concept" aria-label="Concepto clave">
<p class="lesson-emphasis__label">Concepto clave</p>
<p><strong>Las propiedades animables son compartidas; los modelos de control no.</strong> Primero decide si el tiempo, el estado y la interacción pertenecen a la página, al documento SVG o a un runtime exportado.</p>
</aside>

| Técnica | Qué aporta | Ventaja | Coste o límite |
| --- | --- | --- | --- |
| Transición CSS | Opacidad con retrasos por trazado | Menos código y ninguna dependencia | La secuencia y la repetición requieren estado y clases |
| Keyframes CSS | La misma secuencia declarativa | Fácil de inspeccionar y ajustar | Más coreografía implica más selectores; hay que probar transformaciones SVG |
| SMIL | Elementos `<animate>` dentro del SVG | Autocontenido, sin biblioteca | Los controles externos y secuencias largas son menos cómodos |
| Web Animations API (WAAPI) | Trazados con retrasos y controles nativos | Permite pausar, invertir y repetir sin dependencia | Hay que programar la orquestación |
| GSAP | Entrada escalonada con timeline | Secuencias y easing claros; ya se enseña en FE I | Runtime añadido; compensa si la coreografía lo justifica |
| Motion para JavaScript | `animate()` con `stagger()` | API compacta para SVG, también sin React | Añade otra biblioteca cuando CSS o WAAPI podrían bastar |
| Anime.js | `animate()` con `stagger()` | API expresiva y concisa | Otra dependencia con una función ya cubierta por GSAP |
| Lottie | Animación vectorial generada y exportada a JSON, reproducida en la demo | Formato portable con tiempos independientes por faceta | Representación y reproductor aparte; el JSON pesa 38 KB antes de comprimir la transferencia |
| dotLottie | Dos animaciones Lottie dentro de un paquete v2 reproducido en canvas | Agrupa variantes claro/oscuro en un archivo de 14 KB | Sigue necesitando runtime Lottie; no anima el DOM SVG existente |
| Rive | Fuente RML generada con animación one-shot y entrada de máquina de estados | Modelo compacto para interacción y colaboración con diseño | La exportación `.riv` firmada requiere cuenta; la fuente se verifica offline y el archivo reproducible espera el inicio de sesión |

CSS, SMIL y WAAPI son opciones nativas; GSAP, Motion y Anime.js son bibliotecas; Lottie, dotLottie y Rive son formatos o flujos de trabajo con runtime. Referencias: [MDN sobre insertar SVG](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Including_vector_graphics), [SMIL](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_animation_with_SMIL), [WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API), [GSAP](https://gsap.com/docs/v3/Installation/), [Motion](https://motion.dev/docs/quick-start), [Anime.js](https://animejs.com/documentation/animation/), [dotLottie](https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x) y [Rive](https://rive.app/use-cases/websites).

### Señal actual de la plataforma

CSS nativo sigue ampliando sus posibilidades, incluidas las líneas de tiempo ligadas al scroll; la encuesta State of CSS 2025 estudió estas funciones emergentes con 5.506 participantes. Es una razón para enseñar primero opciones nativas, no para añadir movimiento por scroll a un logotipo. La propiedad CSS `d: path()` aún no es Baseline según MDN, así que aquí no se usa como técnica por defecto. Importar un SVG a Lottie prepara el arte, pero no crea la animación: aún hay que diseñarla y exportarla. ([Metodología State of CSS](https://2025.stateofcss.com/en-US/about/), [compatibilidad CSS `d` en MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/d), [importación SVG a LottieFiles](https://docs.lottiefiles.com/en/integrations/after-effects/03_import/importing-from-file))

## Rúbrica del concurso: elegancia y economía

Puntúa cada alternativa de 1 a 5 y anota una evidencia de la demo.

| Criterio | Peso | Qué observar |
| --- | ---: | --- |
| Encaje del movimiento | 20 % | Refuerza la identidad, tiene buen ritmo y termina limpiamente |
| Fidelidad al SVG | 15 % | Conserva colores y geometría en distintos tamaños |
| Granularidad de interacción | 25 % | Puntero y teclado alcanzan la faceta o estado deseado sin selectores frágiles |
| Elegancia del código | 20 % | Entrada, estado, tiempo, interrupción y reset se entienden y ajustan con facilidad |
| Economía de entrega | 20 % | Código, runtime, conversión y mantenimiento guardan proporción con el resultado |

Para este uso, **CSS es la referencia económica**: un keyframe dentro del SVG mantiene el ciclo de color autocontenido y un control sencillo en la página lo pausa cambiando a la versión estática. Si hace falta una coreografía de varios tiempos o controles de reproducción más ricos, **GSAP encaja mejor con el curso** porque ya se enseña en la sesión 11. Motion y Anime.js deberían elegirse solo si sus API mejoran claramente el proyecto. Lottie/dotLottie o Rive compensan si la autoría, la interacción o la reutilización entre plataformas justifican exportar otro recurso. Estos son juicios de diseño para este encargo, no resultados empíricos ni una clasificación universal.

## La misma entrada, distintas formas de código

La demo prepara los trazados una sola vez; cada técnica los revela con tiempos parecidos. Compara cuánta lógica de estado y secuenciación expone cada API:

```css
/* Keyframes CSS: el navegador controla la secuencia */
.is-playing .facet {
  animation: reveal 420ms ease-out both;
  animation-delay: calc(var(--order) * 34ms);
}
@keyframes reveal { from { opacity: 0 } to { opacity: 1 } }
```

```xml
<!-- SMIL: el elemento animado vive dentro del SVG -->
<animate attributeName="opacity" from="0" to="1"
  dur="420ms" fill="freeze" begin="indefinite" />
```

```js
// WAAPI: control de reproducción nativo del navegador
paths.forEach((path, i) => path.animate(
  [{ opacity: 0 }, { opacity: 1 }],
  { duration: 420, delay: i * 34, fill: "both" }
));

// GSAP: un timeline controla el stagger
gsap.timeline().fromTo(paths, { opacity: 0 }, {
  opacity: 1, duration: 0.42, stagger: 0.034, ease: "power2.out"
});

// Motion: objetivos y retrasos compactos
animate(paths, { opacity: [0, 1] }, {
  duration: 0.42, delay: stagger(0.034)
});

// Anime.js: intención similar con otra API
animate(paths, {
  opacity: [0, 1], duration: 420, delay: stagger(34)
});
```

La demo compara también transiciones CSS: una clase cambia la opacidad de cada trazado y los retrasos crean la secuencia. Es la opción más económica cuando solo se necesitan dos estados: oculto y visible.

## Ronda 2: mejor en su especialidad

La ronda 1 compara las formas de escribir el código manteniendo fijo el objetivo. La ronda 2 cambia la tarea para que cada alternativa muestre una fortaleza propia. No son capacidades exclusivas: son buenos encajes para enseñar y comparar.

<aside class="lesson-emphasis lesson-emphasis--decision" aria-label="Decisión de diseño">
<p class="lesson-emphasis__label">Decisión de diseño</p>
<p><strong>«Mejor» significa mejor ajustada al problema de movimiento.</strong> Un cambio pequeño premia la economía; una secuencia reversible con etiquetas premia la orquestación; un comportamiento portable puede justificar otro runtime.</p>
</aside>

| Técnica | Demostración | Qué muestra | Coste a observar |
| --- | --- | --- | --- |
| Transición CSS | Hover, foco o activación de un control de marca | Respuesta declarativa entre estados | CSS mínimo; solo tiene sentido en un enlace o control real |
| Keyframes CSS | Entrada de tres tiempos: anticipación, rebote y cierre | Desplazamientos explícitos y coreografía legible | Más etapas requieren mantener más keyframes |
| SMIL | Repetir una rotación corta definida dentro del SVG | El tiempo viaja junto con el recurso vectorial | Controles externos y movimiento reducido requieren más cuidado |
| WAAPI | Recorrer la construcción de las facetas con un slider | Búsqueda temporal y objetos Animation nativos | Es la alternativa con más estado y controles accesibles personalizados |
| GSAP | Reproducir o invertir un timeline con etiquetas | Secuenciación y control de dirección | El runtime compensa cuando la coreografía lo requiere |
| Motion | Respuesta pequeña con muelle al hover, foco o pulsación | Respuesta física con una API compacta | Añade una biblioteca; el muelle debe mejorar la interacción |
| Anime.js | Dibujar el contorno de las facetas y después borrarlo | Ayudantes SVG para dibujar y escalonar objetivos | Runtime y trazos superpuestos; evitar exceso de detalle en el icono |
| Lottie | Entrada cinética dirigida por diseño y con acentos solapados | Autoría de motion design y animación exportable | Requiere JSON real y reproductor; importar SVG no crea movimiento |
| dotLottie | Agrupar estados idle/entrada/tema alternativo | Empaquetado y funciones del reproductor Lottie | Contenedor/runtime, no una técnica distinta para el DOM SVG |
| Rive | Estados interactivos idle/atracción/gesto final | Animación interactiva con máquina de estados | Requiere preparar el arte, crear/exportar un `.riv` y cargar runtime |

Puntúa las tres rondas por separado. En la segunda, juzga si la técnica encaja con la tarea de movimiento. En la tercera, valora alcance de entrada, claridad de estado, interrupción, reset, equivalencia de teclado y si el modelo interactivo compensa su coste. Lottie y dotLottie son exportaciones reales con reproductores funcionales. Rive aparece correctamente como pendiente de su archivo firmado; un fundido CSS de una imagen no demostraría de forma justa estos flujos de autoría.

## Ronda 3: la interacción es compartida, pero no igualmente portable

Color, opacidad, transformaciones, visibilidad y movimiento no pertenecen en exclusiva a ningún motor. Con SVG inline, CSS, SMIL, WAAPI, GSAP, Motion y Anime.js pueden apuntar a la misma faceta. Lo que cambia es la arquitectura: quién resuelve el hit testing, dónde vive el estado persistente, cómo se interrumpen varias animaciones y si la interacción viaja dentro del recurso exportado.

Un SVG cargado mediante `<img>` es deliberadamente no interactivo desde la página. El SVG inline expone nodos DOM normales; `pointer-events` permite decidir si reciben entrada el relleno, el trazo o la zona pintada. La delegación de eventos en el `<svg>` raíz puede identificar `event.target`, de modo que 15 facetas no exigen 15 controladores independientes. ([MDN: scripting de SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/Scripting), [MDN: `pointer-events` en SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/pointer-events))

<aside class="lesson-emphasis lesson-emphasis--practice" aria-label="Regla práctica">
<p class="lesson-emphasis__label">Regla práctica</p>
<p><strong>Elige el propietario más pequeño para la interacción.</strong> Deja que CSS presente el estado, que JavaScript guarde solo el estado necesario y que un runtime especializado mande únicamente cuando el comportamiento deba viajar con el recurso.</p>
</aside>

| Técnica | Modelo de interacción | Mejor uso interactivo | Fricción principal |
| --- | --- | --- | --- |
| Transición/keyframes CSS | Cualquier trazado reacciona a `:hover`, `:focus` o una clase; el click persistente necesita estado HTML/JS | Color, opacidad, foco o selección entre dos estados | CSS anima el estado, pero no posee por sí solo lógica arbitraria de click |
| SMIL | Un elemento puede empezar con `facet.click` o `beginElement()` | Pulso, color, transformación o recorrido disparado dentro del SVG | Toggles complejos, estado global y paridad de teclado requieren coordinación |
| WAAPI | Cada faceta puede poseer un objeto `Animation` independiente | Ocultar/restaurar, scrub, reverse, velocidad e interrupción granular | Hit testing, estado y foco siguen siendo código de aplicación |
| GSAP | Una entrada coordina muchos objetivos en un timeline interrumpible | Selección que afecta a la faceta y a todas sus vecinas | El evento sigue siendo DOM; una sola propiedad no justifica el runtime |
| Motion | Objetivos DOM/SVG con hover/press y muelles | Feedback físico de hover, foco, pulsación o drag | Otra dependencia; una coreografía larga es menos explícita que un timeline etiquetado |
| Anime.js | Objetivos SVG, valores funcionales, callbacks y delays calculados | Ondas locales, atributos SVG y efectos compactos por distancia | La semántica de entrada sigue necesitando DOM; WAAPI cubre casos simples |
| Lottie | El reproductor controla timeline, dirección, marcadores, segmentos y frames | Explicadores con scrub y capítulos dirigidos | Los nodos SVG renderizados no son un contrato público estable entre renderers |
| dotLottie v2 | Empaqueta animaciones, temas, inputs, interacciones y máquinas de estados | Estados/temas exportados e interacción portable a nivel de player | Hay que crear la máquina dentro del paquete; el paquete ruvebal actual solo cambia variantes completas |
| Rive | Listeners, hit areas, capas de estado, transiciones, eventos y data binding viajan con el arte | Iconos, controles y gráficos interactivos reutilizables entre runtimes | Coste de reautoría/exportación/runtime; la semántica accesible sigue en el host |

Referencias primarias: [eventos SMIL](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/begin), [objetos de reproducción WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API), [gestos de Motion](https://motion.dev/examples/js-gestures), [atributos SVG en Anime.js](https://animejs.com/documentation/animation/animatable-properties/svg-attributes/), [métodos de Lottie](https://github.com/airbnb/lottie-web/blob/master/README.md), [máquinas de estados dotLottie v2](https://www.dotlottie.io/spec/2.0/) y [estados interactivos de Rive](https://rive.app/use-cases/websites).

**Veredicto:** SVG inline + un listener delegado + una clase CSS es la solución más económica para invertir una faceta en la portada. WAAPI ofrece el control granular nativo más completo; GSAP coordina mejor muchos objetivos dentro del curso; Motion destaca en respuesta física; Rive es la opción más fuerte cuando la lógica interactiva debe viajar con el recurso. Lottie destaca como timeline intercambiable, no como API de las facetas SVG originales.

## Generación y exportación de recursos

El SVG canónico es [`fava-mark-static.svg`]({{ '/assets/icons/fava-mark-static.svg' | relative_url }}). Desde `web-foundations/`, ejecuta el generador para volver a extraer sus 15 facetas y crear los recursos:

```sh
python3 scripts/build-fava-motion-assets.py
```

Se crean `fava-brand.json` (florecimiento de una sola reproducción con escala/opacidad escalonadas), `fava-night.json` (misma animación con colores claros), `fava-showcase.lottie` (paquete ZIP dotLottie v2 con ambas variantes) y `rive/scene.rml` con `rive.yaml` (geometría convertida y timeline/máquina de estados Rive). La demo usa `lottie-web` para JSON y `@lottiefiles/dotlottie-web` para el paquete. Ambos conservan una copia SVG estática para `prefers-reduced-motion` o si no carga el reproductor.

La CLI de Rive puede verificar y previsualizar la fuente RML sin cuenta. Para exportar el `.riv` firmado hay que iniciar sesión y ejecutar:

```sh
rive login
rive docs/assets/animations/fava/rive --verify
rive docs/assets/animations/fava/rive --publish=local --output-dir=.
```

El archivo esperado es `docs/assets/animations/fava/rive/fava-motion.riv`; al existir, la demo habilita automáticamente su canvas y el botón de repetición. Mientras tanto se enlaza la fuente RML verificada y se muestra el icono estático. Documentación: [CLI de Rive](https://rive.app/agents), [especificación dotLottie v2](https://dotlottie.io/spec/2.0/) y [reproductor JavaScript de dotLottie](https://docs.lottiefiles.com/en/runtimes/distributions/js).

## Sesión maestra de 3 horas

| Tiempo | Actividad | Evidencia |
| ---: | --- | --- |
| 15 min | Inspeccionar favicon y copia estática: viewBox, paleta, orden, solapamientos e IDs | Marcar qué facetas pueden animarse sin cambiar su geometría |
| 25 min | Comparar CSS, SMIL y WAAPI con la misma entrada | Explicar qué es nativo y qué requiere lógica de página |
| 25 min | Comparar GSAP, Motion y Anime.js con la misma entrada | Puntuar claridad y coste del runtime |
| 20 min | Reproducir los ejemplos de mejor especialidad | Nombrar la tarea que cada técnica resuelve especialmente bien |
| 30 min | Usar el laboratorio de interacción y los controles de timeline | Distinguir DOM, objetos de reproducción, gestos, timelines coordinados y máquinas de estados |
| 10 min | Reproducir Lottie/dotLottie e inspeccionar la fuente/exportación Rive | Identificar conversión, autoría, reproductor y coste de exportación |
| 45 min | Integrar la versión elegida en la landing page | Mantener silueta, interacción de teclado y alternativa estática |
| 10 min | Revisar movimiento reducido, teclado y rendimiento | Mostrar el comportamiento y anotar una observación |

## Accesibilidad y entrega

- El icono es decorativo junto al texto de marca. Cuando sus facetas se convierten en controles, expón el SVG inline como grupo etiquetado, usa `tabindex` itinerante para aportar un solo paso de Tab y admite flechas más Enter/Espacio.
- Mantén estáticos los iconos de navegación. El favicon y el icono principal usan un ciclo de color lento, sin movimiento geométrico. La portada tiene control para pausar/reanudar y ambos recursos se detienen con `prefers-reduced-motion`; algunos navegadores pueden congelar o ignorar la animación de pestaña.
- La demo dura poco y se reproduce una vez. Si una animación de producción empieza sola, dura más de cinco segundos y aparece junto a otro contenido, WCAG 2.2.2 requiere un control para pausarla, detenerla u ocultarla.
- Mantén sutil el ciclo de color, sin destellos ni transiciones rápidas. No lo repitas en otros iconos grandes de la página.

Referencias: [WAI, WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide) y [técnica C39 de `prefers-reduced-motion`](https://www.w3.org/WAI/WCAG22/Techniques/css/C39).

## Entrega

Una versión del favicon ruvebal en la landing page y una nota con técnica elegida, puntuación de al menos tres alternativas, comportamiento con movimiento reducido, coste añadido y un elemento que se eliminaría si no mejora la comunicación.

## Nota docente

El marco de investigación del perfil FE I entiende el movimiento como una capa temporal de comunicación con coste. Esta actividad concreta ese principio como comparación de diseño acotada; no afirma que la enseñanza de animación SVG esté validada empíricamente. Conserva decisiones y revisiones del alumnado si la sesión pasa a formar parte de la línea de investigación.

Ver también: [Animaciones web]({{ '/lessons/es/web-animations/' | relative_url }}), [CSS Web Animations]({{ '/lessons/es/web-animations/css/' | relative_url }}) y [GSAP para diseño]({{ '/lessons/es/gsap/overview/' | relative_url }}).
