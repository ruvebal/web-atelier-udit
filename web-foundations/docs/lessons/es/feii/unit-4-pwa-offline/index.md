---
layout: lesson
title: 'Unidad 4: PWA y capacidades offline'
title_alt: 'Unit 4: Progressive Web Apps & Offline Capabilities'
slug: feii-unit-4-pwa-offline
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/feii/unit-4-pwa-offline/
description: 'Fundamentos PWA: service workers, caché offline, instalabilidad y ciclo de vida PWA.'
tags:
  [
    feii,
    pwa,
    service-workers,
    offline-first,
    caching-strategies,
    installability,
  ]
status: complete
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> Offline es una promesa de producto diseñada como modo de fallo.</p>
<p><strong>Lente de campo:</strong> **Ancla de práctica:** service workers, caché, manifests y estados de recuperación. **Señal de frontera:** datos local-first, resolución de conflictos de sync y trabajo en background sensible al navegador siguen evolucionando. **Estado pedagógico:** la arquitectura offline-first está fundamentada; esta secuencia FE de modos de fallo sigue siendo un piloto.</p>
</aside>

> **Prueba de estudio:** Prueba estados offline, stale, reconexión y conflicto de datos.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Antes de empezar

| Requisito | ¿Obligatorio? |
| --- | --- |
| Proyecto Astro del equipo de Unidades 2–3 (HTTPS o localhost) | Sí |
| `npm run build` verde en rama principal | Sí |
| Chrome o Edge DevTools (pestañas Application + Lighthouse) | Sí |
| Issue de backlog del equipo para fallback offline | Para lab B2 |

**Tiempo oficial:** 1 h magistral (B1) + 2 h lab (equipo, B2) + 2 h resolución de ejercicios (individual, B3).

> Los service workers exigen **HTTPS** en producción. `localhost` está exento en desarrollo.

---

## Sigue este camino

| Fase | Quién | Acción | Sección |
| --- | --- | --- | --- |
| 1 | Individual | Listar qué rutas/funciones deben sobrevivir offline vs pueden degradarse | Idea maestra + Qué es una PWA |
| 2 | Individual | Añadir `manifest.json` + link tags; verificar que cargan los iconos | Web App Manifest |
| 3 | Individual | Registrar `sw.js`; confirmar en DevTools → Application | Service Workers |
| 4 | Individual | Asignar cache-first / network-first / stale-while-revalidate **por ruta** | Estrategias de caché |
| 5 | Individual | Prueba offline: cargar online → DevTools Offline → refrescar | Ejercicio práctico |
| 6 | Equipo | Entregar fallback offline en issue real; registrar delta Lighthouse (B2) | B2 · Lab |
| 7 | Individual | Completar B3; ítem 2 declarado sin IA | B3 · Ejercicios |

---

## Comprueba antes de salir

- [ ] El manifest valida en DevTools → Application → Manifest (sin iconos ausentes)
- [ ] El service worker está **activated**; flujo de actualización documentado si cambiaste `sw.js`
- [ ] Refrescar offline carga shell o página offline explícita (no pantalla en blanco)
- [ ] Sección PWA de Lighthouse puntuada antes **y** después (captura o artefacto CI)
- [ ] La nota de release mapea cada ruta a una estrategia de caché y por qué
- [ ] Ítem 2 de B3 completado sin asistencia IA (declarado)

---

## Fallos frecuentes

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| El SW nunca se activa | Error de sintaxis en `sw.js`; promesa de registro rechazada | Revisar Consola; corregir ruta de registro (`/sw.js` en raíz del sitio) |
| Assets viejos tras deploy | Nombre de caché sin cambiar; sin limpieza en `activate` | Subir versión de caché; borrar cachés antiguas en handler `activate` |
| Datos API no se actualizan | Cache-first en JSON dinámico | Cambiar ruta a network-first o stale-while-revalidate |
| Falta prompt de instalación | Manifest inválido, iconos ausentes o sin HTTPS | Corregir errores del manifest en DevTools; probar en localhost o HTTPS |
| Offline = pantalla blanca | Shell no precacheado; solo rutas de red | Precachear `/`, CSS, JS, HTML de fallback offline |
| «Funciona en dev, no en prod» | SW bloqueado en origen HTTP | Desplegar con HTTPS |
| Lab de equipo bloqueado | Sin issue en backlog | Usar issue semilla del profesor |

---

## Entrega (evidencia Unidad 4)

- **Individual:** respuestas B3 + notas de prueba offline (qué falló, qué corregiste)
- **Equipo:** enlace al issue, enlace al PR, Lighthouse antes/después, nota de release con estrategia de caché

---

> _"La mejor web app es la que funciona aunque la red no."_

> **Declaración de asistencia IA:** Esta unidad integra desarrollo asistido por IA siguiendo la metodología docs-first. Planes, prompts e informes de implementación se documentan durante todo el proceso.

---

## Convenciones de código en esta unidad

Mismo vocabulario que las Unidades 2–3 y la Unidad 5 de FE II — comprueba la etiqueta antes de pegar:

- **CodeSandbox-ready** — archivo completo; copiar-pegar; funciona con el scaffold del sandbox.
- **Excerpt** — patrón parcial, ilustrativo. **No** ejecuta tal cual. Los tres handlers fetch de estrategias de caché abajo son Excerpt.
- **Template** — copiar y sustituir valores marcados antes de usar. El JSON del manifest abajo es Template — `name`, colores y rutas de iconos son ejemplos de esta lección, no los tuyos.

---

## 🎯 Objetivos de aprendizaje

Al final de esta unidad podrás:

- **Comprender el paradigma PWA** — Qué hace «progresiva» una app y por qué importa
- **Implementar service workers** — Estrategias de caché, fallbacks offline e invalidación
- **Hacer apps instalables** — Web app manifest, prompts de instalación y comportamiento app-like
- **Diseñar experiencias offline** — Degradación elegante y patrones offline-first
- **Probar capacidades PWA** — Auditoría Lighthouse PWA, pruebas offline y validación de rendimiento

---

## 📖 Qué es una PWA

Una Progressive Web App usa capacidades web modernas para ofrecer una experiencia similar a una app nativa:

### Características PWA centrales

1. **Instalable** — Se puede añadir a la pantalla de inicio desde el navegador
2. **Capaz offline** — Funciona sin conectividad de red
3. **Rápida y responsiva** — Carga rápida, respuesta instantánea al usuario
4. **Segura** — Servida por HTTPS (requisito PWA)
5. **Descubrible** — Identificable como aplicación (manifest, meta tags)

### Filosofía de mejora progresiva

Las PWA mejoran la experiencia web por capas:

```
┌─────────────────────────────────────────────────────────┐
│           CAPAS DE MEJORA PROGRESIVA                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Capa 1: HTML/CSS básico (funciona en todas partes)     │
│   Capa 2: Mejora con JavaScript (navegadores modernos)   │
│   Capa 3: Service Worker (soporte PWA)                   │
│   Capa 4: Instalable (integración pantalla inicio)       │
│                                                          │
│   Cada capa añade capacidad sin romper las anteriores    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

Distinto de apps nativas, que exigen soporte de plataforma todo-o-nada.

---

## 🔧 Service Workers

Los service workers son la columna vertebral del offline en PWA:

### Qué es un Service Worker

Un service worker es un archivo JavaScript que corre separado del hilo principal:

- **Proxy de red** — Intercepta peticiones y decide cómo manejarlas
- **Control de caché** — Almacena assets para offline e invalida caché
- **Sync en background** — Acciones con la app cerrada (push, sync de datos)

### Ciclo de vida del Service Worker

**Excerpt** — añade `skipWaiting` / limpieza de caché en `activate` cuando iteres en lab:

```js
// sw.js — Excerpt
self.addEventListener('install', (event) => {
  // Cachear assets durante install
  event.waitUntil(
    caches.open('static-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/script.js',
        '/images/logo.png',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Interceptar peticiones de red
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### Registrar un Service Worker

**Excerpt** — llamar tras cargar la página; el SW debe servirse desde el scope raíz del sitio:

```js
// main.js — Excerpt
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('SW registered:', registration);
    })
    .catch((error) => {
      console.log('SW registration failed:', error);
    });
}
```

---

## 📦 Estrategias de caché

Patrones distintos según el caso de uso:

### Estrategia cache-first

Mejor para assets estáticos que cambian poco:

```js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        const responseClone = fetchResponse.clone();
        caches.open('dynamic-v1').then((cache) => {
          cache.put(event.request, responseClone);
        });
        return fetchResponse;
      });
    })
  );
});
```

**Usar para:** CSS, JS, imágenes, fuentes

### Estrategia network-first

Mejor para contenido dinámico que debe estar fresco:

```js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then((fetchResponse) => {
      const responseClone = fetchResponse.clone();
      caches.open('dynamic-v1').then((cache) => {
        cache.put(event.request, responseClone);
      });
      return fetchResponse;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});
```

**Usar para:** respuestas API, HTML dinámico

### Stale-while-revalidate

Equilibrio entre velocidad y frescura:

```js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        const networkResponseClone = networkResponse.clone();
        caches.open('dynamic-v1').then((cache) => {
          cache.put(event.request, networkResponseClone);
        });
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    })
  );
});
```

**Usar para:** la mayoría del contenido web (buen default general)

---

## 📱 Web App Manifest

El manifest hace instalable tu app:

### manifest.json

```json
{
  "name": "FE II PWA Demo",
  "short_name": "FE II PWA",
  "description": "Demostración Progressive Web App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Enlazar el manifest

```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#2563eb" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

### Modos de display

- **standalone** — Pantalla completa, sin UI del navegador
- **minimal-ui** — UI mínima del navegador (atrás, barra URL)
- **browser** — Ventana normal del navegador

---

## 🎯 Ejercicio práctico

**Tiempo:** 2 horas

1. **Usa el proyecto Astro del equipo** de Unidades 2–3 (no abras un repo nuevo)
2. **Añade un service worker** con estrategia cache-first para assets estáticos
3. **Crea un web app manifest** con iconos y ajustes de display
4. **Prueba funcionalidad offline**:
   - Carga la app con red conectada
   - Pasa a offline (DevTools → Network → Offline)
   - Refresca — debe cargar desde caché
5. **Prueba instalabilidad**:
   - Abre en Chrome/Edge
   - Busca el icono de instalar en la barra de direcciones
   - Instala en pantalla de inicio
   - Ábrela desde inicio — debe parecer app nativa
6. **Ejecuta auditoría PWA Lighthouse** — objetivo 90+

**Entregable:** URL PWA + captura de auditoría PWA Lighthouse

---

## 📚 Lecturas recomendadas

- **PWA Checklist** — https://web.dev/progressive-web-apps-checklist/
- **Service Worker API** — https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API
- **Workbox** — https://developer.chrome.com/docs/workbox (librería de service workers)
- **Web App Manifest** — https://developer.mozilla.org/es/docs/Web/Manifest

---

## ✅ Resultado de la sesión

Al final de esta unidad deberías:

- Entender qué hace PWA una web app y por qué importa la mejora progresiva
- Poder implementar service workers con distintas estrategias de caché
- Crear manifests que hagan instalable la app
- Diseñar experiencias offline-first con degradación elegante
- Probar capacidades PWA con Lighthouse y simulación offline

Esta unidad cubre el CONTENIDO oficial **Desarrollo de PWA, funcionalidades offline**. Las competencias aplican a cualquier proyecto web futuro, con Astro, React o JS vanilla.

---

> _"Offline no es un bug. Es una característica de la web distribuida."_

> _"Despliega con prisa, arrepiéntete en el downtime."_
> — Tao of Development, `ops-001`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Resultado de la sesión"
  visual-grammar: "offline-resilience-path — a network request moving between online, cached, stale, and recoverable offline states"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

## B1 · Lección magistral — 1 h

**Tesis:** offline-first es una decisión arquitectónica tomada antes de que falle la red, no un fallback añadido después.

Un estudio de arquitectura de sistemas educativos lista «connectivity independent» como requisito de primera clase, cubierto por service workers, junto a la distinción entre funciones que deben sobrevivir offline (puntos, badges, seguimiento de progreso) y las que requieren conectividad (leaderboards, interacción social) — «enhanced with service workers to function offline or on low-quality networks» (Fibrian et al. 2026, 2).
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
An educational-systems architecture study lists "connectivity independent" as a first-class requirement, met by service workers, alongside a stated distinction between features that must survive offline (points, badges, progress tracking) and features that legitimately require connectivity (leaderboards, social interaction) — "enhanced with service workers to function offline or on low-quality networks" (Fibrian et al. 2026, 2 — Ahmes coat `483a966a`, node `00b4388d-211a-5715-8504-64973d1a8eb7`).
-->
{% endif %}

**Lee esta cita con cuidado.** La fuente estudia la arquitectura software de un *sistema de aprendizaje gamificado*, no cómo enseñar desarrollo front-end. Fundamenta vocabulario y requisito de diseño — qué puede degradarse con gracia y qué no — nunca la afirmación de que esta secuencia docente funciona pedagógicamente.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
**Evidence update (2026-08-23):** Fibrian et al. is now confirmed evaluator-safe in Ahmes for offline-first architecture, service workers, caching, UI trade-offs, and prototype limits. A separate 2026 school study is retained as a web-only research lead in the dated FE II gap-pass record in the research repository copy, not as a student-facing Ahmes citation. The HE precedent named in the matrix (Case 2020) remains outside the vault. **No source establishes that this unit's PWA/offline teaching sequence produces measurably better learning outcomes than an alternative.**
-->
{% endif %}

**Esquema para el docente:** véase `deck-outline.md`.

## B2 · Prácticas de laboratorio — 2 h · equipo

Issue real del backlog: añadir fallback offline al proyecto Astro del equipo de Unidades 2–3 — shell cacheado o página offline explícita — eligiendo **cache-first** para assets estáticos y **network-first o stale-while-revalidate** para rutas dinámicas, decidido por ruta, no en bloque.

Definición de hecho: puntuación Lighthouse PWA registrada antes y después; manifest que hace instalable la app; CI verde; revisión humana de sugerencias IA; nota de release que indique qué estrategia de caché cubre qué ruta y por qué.

Los roles rotan; no repitas un rol ya asumido en labs de Unidades 2–3.

Evidencia: rama, PR, delta Lighthouse, fila de log aceptar/rechazar IA si usaste asistencia.

## B3 · Resolución de ejercicios — 2 h · individual

1. **Diagnóstico:** un service worker cachea una respuesta API con cache-first y nunca la invalida. Describe el bug de stale que verá el usuario y nombra la estrategia de caché que lo corrige.
2. **Sin IA (declarado):** para cuatro descripciones de funcionalidad (editor de borradores guardados, widget de chat en vivo, página de ayuda estática, formulario de pago), decide «debe funcionar offline», «puede degradarse con gracia» o «debe fallar en voz alta offline», y justifica cada una en una frase, sin asistencia IA.
3. Explica por qué que falle silenciosamente el registro del service worker en un navegador que no lo soporta es un éxito de mejora progresiva, no un bug — y qué no debe asumir nunca la app como consecuencia.

Los esbozos de respuesta del profesor pertenecen a la copia del instructor, no al material público. Estos ejercicios están descontextualizados del producto del equipo a propósito.

## Referencias

- Fibrian, I. D., T. P. Utomo, I. Lukmana, and Z. Muttaqin. 2026. “Architectural Consideration for Gamified Learning Systems: An Exploration of Offline-First Progressive Web Application.” *Register: Jurnal Ilmiah Teknologi Sistem Informasi* 11 (2): 139–150. https://doi.org/10.26594/register.v11i2.5087.
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- Fibrian, I. D., Utomo, T. P., Lukmana, I. &amp; Muttaqin, Z. (2026). *Architectural Consideration for Gamified Learning Systems: An Exploration of Offline-First Progressive Web Application.* Register: Jurnal Ilmiah Teknologi Sistem Informasi 11(2), 139–150. `10.26594/register.v11i2.5087`. Ahmes coat `483a966a`, node `00b4388d-211a-5715-8504-64973d1a8eb7`, p.2. Resolved via `ahmes query &#45;&#45;cite`, `evaluator_safe=yes`.
-->
{% endif %}
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
located by grep over extract/index.md for "enhanced with service workers" inside coat 483a966a (matrix-named as the adjacent architecture coat for Unit 4), node/page resolved via sqlite3 join fission_node × anchor_spatial, cite confirmed via `ahmes query &#45;&#45;cite <db>:<node_id> &#45;&#45;require-evaluator-safe`
-->
{% endif %}
- **Límite de evidencia restante:** esta unidad no establece que enseñar arquitectura PWA offline-first produzca mejores resultados de aprendizaje medibles para estudiantes de front-end que una secuencia alternativa. La fuente citada estudia el diseño offline-first de un sistema de aprendizaje; la unidad sigue siendo un piloto docente de modos de fallo con trazas de proceso y pruebas de verificación.
