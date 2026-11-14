---
layout: lesson
title: 'Making of: Favicon canónico → Rive GPU 3D'
title_alt: 'Making-of agentic · Rive + AnimaScript 3D'
slug: agentic-rive-3d
date: 2026-11-14
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/web-animations/svg-master-session/agentic-rive-3d/
parent: svg-master-session
---

<aside class="lesson-framing" aria-label="Idea principal y prueba de taller">
<p><strong>Idea principal:</strong> una fuente SVG puede convertirse en un objeto 3D con prueba de profundidad y seleccionable — y la misma pila es el primer lugar en esta sesión que puede contener un reloj de muestra audible dentro del activo.</p>
<p><strong>Prueba de taller:</strong> explicar quién posee el reloj de muestra, quién posee el tiempo transcurrido para la coreografía, y quién posee el clic que debe coincidir con los píxeles, sin inventar un bloqueo que las pruebas no demuestren.</p>
</aside>

## Encargo

Este documento de fabricación es el registro público del [favicon canónico · Rive + AnimaScript 3D]({{ '/lessons/en/web-animations/svg-master-session/demo/' | relative_url }}) ejemplar: `fava-mark-static.svg` es la única geometría creada a mano, un compilador emite una malla para un número dinámico de facetas `N` (esta prueba afirma `N = 13`), un archivo firmado `.riv` dibuja esa malla con un búfer de profundidad, y un host web mantiene los controles semánticos de las facetas sincronizados con los propios eventos de selección de la escena.

También es el lugar donde la cuestión de audio de la sesión de comparación se convierte en una *utilidad*, no en una digresión. Antes de las matemáticas de la malla, lea [sincronía sonora](#sincronia-sonora-primera-utilidad-de-relevancia). La prueba auditiva ya vive en la demostración como [Reproducir zumbido — ejemplar de audio]({{ '/lessons/en/web-animations/svg-master-session/demo/#audio-specimen' | relative_url }}). Sesión principal: [Sesión Maestra de Animación SVG]({{ '/lessons/es/web-animations/svg-master-session/' | relative_url }}).

**Convención de bloque de código en esta lección:** los bloques están etiquetados como **Excerpt** (parcial, no ejecutable solo), **Template** (necesita tus rutas), o **CodeSandbox-ready** solo cuando un aprendiz puede pegar y ejecutar con mínima fricción. La mayoría de las pruebas de estudio aquí son Excerpt o Template.

## Sincronía sonora: primera utilidad de relevancia {#sincronia-sonora-primera-utilidad-de-relevancia}

<aside class="lesson-emphasis lesson-emphasis--concept" aria-label="Concepto clave">
<p class="lesson-emphasis__label">Concepto clave</p>
<p><strong>¿Quién posee el reloj de muestra audible?</strong> Entre las técnicas de la página de comparación maestra, solo Rive + AnimaScript puede empaquetar ese reloj <em>dentro</em> del artefacto WASM. Todos los demás siguen un reloj de Web Audio o multimedia externo, o reaccionan a la energía analizada.</p>
</aside>

¿Por qué abrir aquí? Un estudiante que solo ve “3D más atractivo” perderá la primera respuesta honesta a *por qué esta pila merece el impuesto del host*. La sincronía sonora es esa respuesta. El favicon GPU posee la **coreografía de tiempo transcurrido** (bucle de nueve segundos, extrusión escalonada, inspección cuaterniónica). El ejemplar `AudioProcessor` de AnimaScript posee el **reloj de muestra** para el tono. Patrón de *propiedad compartida*, no un bloqueo A/V reclamado entre esos dos componentes.

Tres patrones honestos (CÓMO, no un curso de Web Audio):

1. **Eventos de audio de Rive** — sellos de autoría; el reproductor web desbloquea después de un gesto del usuario.
2. **Rive + AnimaScript `AudioProcessor`** — `init` / `process` en el carril de audio; el Layout habla a través de `Snapshot` / `Ring`.
3. **Seguidores externos** — WAAPI / GSAP / Lottie / Canvas buscan desde `AudioContext.currentTime`, o `AnalyserNode` para visuales reactivas (no bloqueadas por muestra).

**Excerpt** — bosquejo de propiedad de [`hum.as`]({{ '/assets/animations/fava/rive/animascript-audio/hum.as' | relative_url }}):

```ts
// Excerpt — AnimaScript, not browser TypeScript
export class Hum extends AudioProcessor<Snapshot<Level>> {
  override init(sampleRate: f64, maxFrames: i32, channels: i32, level: Snapshot<Level>): void {
    this.level = level;
    this.step = (2 * Math.PI * 110) / sampleRate; // rate from init — never hard-code
  }
  override process(out: StaticArray<f32>, frames: i32, startFrame: f64): void {
    // audio thread: no wait, no allocate; startFrame is the engine clock for this block
    this.level!.latestInto(this.current);
    // … interleaved f32 samples into out …
  }
}
```

**Template** — probar el carril sin un dispositivo:

```sh
# Template — run from web-foundations/
rive docs/assets/animations/fava/rive/animascript-audio --verify
rive docs/assets/animations/fava/rive/animascript-audio \
  --render-audio=docs/assets/animations/fava/rive/animascript-audio/build/hum-preview.wav \
  --advance=1.5s
```

| Afirmación | Respuesta honesta |
| --- | --- |
| “Este es el audio de AnimaScript” | **Sí** — el WAV son las muestras del procesador. |
| “AudioWorklet en vivo en GitHub Pages” | **No** — eso necesita una compilación web con hilos y aislamiento de origen cruzado (COI). La tarjeta reproduce la captura de la CLI después de un gesto. |
| “El bucle 3D está bloqueado por muestra con el zumbido” | **No** — los fixtures no demuestran eso. Demuestran dos carriles de propiedad en una sola pila. |

## ¿Quién posee qué (capas D21)

| Capa | Propietario en este ejemplar |
| --- | --- |
| Representación vectorial | `fava-mark-static.svg` (única autoridad de geometría / relleno) |
| Tesselación / malla | compilador `svg-extrusion` → blobs empaquetados + manifiesto (`N` facetas) |
| Modelo / vista / proyección | AnimaScript `choreo.as` (ajuste ortogonal, inspección cuaterniónica, margen cercano) |
| Visibilidad / profundidad | WGSL + `depth32float` / `lessEqual` |
| Sombreado / rasterización | `canonical-favicon.wgsl` (frentes de relleno de origen; lados/traseros de clase normal) |
| Entrada / selección | selector de AnimaScript + host que consume `x3pick` (gemelo DOM, no píxeles de lienzo) |
| Tiempo / interpolación | coreografía de tiempo transcurrido; amortiguamiento orbital exponencial |
| Semántica web / fallback | botones de facetas HTML, estilos estáticos de movimiento reducido, estilos estáticos de fallo |

**SVG vs 2.5D vs malla con prueba de profundidad real.** SVG plano y planos 3D de CSS no son este ejemplar. La proyección 2.5D matemática de Canvas es un camino de enseñanza hermano. Esta tarjeta es una **malla de GPU real** con paredes laterales, ocultación y un búfer de profundidad — el reposo frontal debe seguir comparándose con el SVG estático.

## Fuente → malla → activo firmado

**Template** — regenerar geometría (el favicon es la pieza de referencia dorada, no un `N` codificado en duro):

```sh
# Template — from web-foundations/
node scripts/svg-extrusion/cli.mjs \
  --input docs/assets/icons/fava-mark-static.svg \
  --out docs/assets/animations/fava/rive/animascript-3d/generated/favicon
node scripts/svg-extrusion/pack-rive-mesh.mjs
```

La profundidad intrínseca sigue la regla D4 congelada del estudio: área después de transformaciones, luego `minDepth + (maxDepth - minDepth) × √(area / maxArea)`. Esa fórmula es una **derivación de ingeniería** validada por fixtures — no un teorema académico citado.

**Excerpt** — el margen cercano debe contener la selección emergente (hallazgo X4):

```as
// Excerpt — choreo.as
let nearMargin: f64 = SELECT_OFFSET_Z + SEPARATION_DIST + 0.02;
let nearZ: f64 = Math.max(-maxVZ - nearMargin, 0.01);
```

## Host: semántica sin mentir sobre píxeles

El host carga el `.riv` firmado, envuelve la consola para leer `x3pick`, y construye `N` botones de facetas a partir del manifiesto. No reimplementa la selección para la visualización. El movimiento reducido y el fallo de carga muestran imágenes estáticas verificadas de la *misma* escena — no una segunda aproximación 2D.

Abra la tarjeta en vivo: [Rive + AnimaScript 3D en la demostración]({{ '/lessons/en/web-animations/svg-master-session/demo/' | relative_url }}).

## Movimiento autorizado vs estado impulsado por entrada

| Eje | Lo que enseña este ejemplar |
| --- | --- |
| Línea de tiempo autorizada | extrusión escalonada, pulso de separación, órbita de inspección — coreografía de tiempo transcurrido |
| Estado impulsado por entrada | alternancia de clic/tap/teclado, selección persistente, reinicio, amortiguamiento orbital interrumpible |
| Accesibilidad | gemelo semántico en HTML; los píxeles de GPU nunca son la única superficie de control |
| Movimiento reducido | sin bucle automático; las imágenes estáticas de las facetas siguen siendo útiles |

## Procedencia (local, honesta, pendiente donde pendiente)

Las afirmaciones públicas a continuación citan **compromisos y revisiones locales reales** ya en este repositorio. **Eventos pendientes (explícitos):** el PR de implementación A aún no se ha abierto, y su fusión a `main` aún no ha ocurrido — ambas filas permanecen etiquetadas como **pendientes** hasta que X7/X8 registren eventos reales de GitHub. Un recibo legible por máquina se envía con los datos del sitio y se verifica con el verificador de procedencia; no es una ruta orientada a estudiantes.

| Evento | Rol | Id / SHA | Estado |
| --- | --- | --- | --- |
| X1 declaración XML anclada en el desplazamiento 0 | implementación del agente | `4d24ef185123dbc01401dc8897c5813edd13c94b` | registrado |
| X2 escena GPU frontal endurecida | agente + revisión fría | `9f733466bd3622e286d2a4db48300cf97a0cb74c` | registrado |
| X4 integración del host | implementación del agente | `0b47e076cf972d84e6a9a0747e0315ab12231d13` | registrado |
| X4 cierres de revisión fría F1–F5 | agente + revisión | `8b698be67ec27ff598991b171b8988b4e6cf2255` | registrado |
| X4 digest de captura de imágenes estáticas | agente + puerta | `01a53612db3d83e8c56406c31494d988aa018fc3` | registrado |
| PR de implementación A | humano / flujo de trabajo | — | **pendiente** (no abierto) |
| Fusión de PR A a `main` | humano / flujo de trabajo | — | **pendiente** (no fusionado) |

## Juicio del estudio

- Liderar con **quién posee el reloj** (reloj de muestra de audio vs tiempo transcurrido de la pantalla) antes de admirar la malla.
- Mantener el favicon como una **pieza de referencia** — el compilador y las habilidades deben seguir siendo impulsadas por datos en `N`.
- Preferir un **fallo de puerta** que enseñe un error de plano cercano o diseño uniforme sobre una demostración verde que mintiera sobre la selección.
- No narrar una fusión que no ha ocurrido.

## Referencias

- Procesadores de audio de Rive AnimaScript [audio processors](https://rive.app/rasc/docs/audio.html)
- Web de Rive [reproducción de audio](https://rive.app/docs/runtimes/web/playing-audio)
- Lección principal: [Sesión Maestra de Animación SVG]({{ '/lessons/es/web-animations/svg-master-session/' | relative_url }})
- Demo: [comparación de técnicas]({{ '/lessons/en/web-animations/svg-master-session/demo/' | relative_url }})
