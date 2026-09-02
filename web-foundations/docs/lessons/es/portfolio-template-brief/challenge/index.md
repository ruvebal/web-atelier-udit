---
layout: methodology
title: 'Proyecto Final del Curso: Plantilla Profesional de Portfolio'
title_alt: 'Proyecto Final del Curso: Plantilla Profesional de Portfolio'
slug: portfolio-template-brief
date: 2025-11-19
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/portfolio-template-brief/challenge/
description: 'Brief final de proyecto para construir una plantilla de portfolio reutilizable y lista para producción en tres niveles: vanilla JS, Bootstrap+GSAP y Tailwind+Vite.'
tags: [final-project, portfolio, deployment, responsive, web-standards]
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> Un portfolio es evidencia de proceso y autoría, no una galería.</p>
<p><strong>Lente de campo:</strong> **Ancla de práctica:** trabajo auténtico integra decisiones de diseño y técnica. **Señal de frontera:** evaluación resiliente a IA exige checkpoints, reflexión y defensa.</p>
</aside>

> **Prueba de estudio:** Mantén commits semanales, notas de decisión y una declaración final de trade-offs.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Para quién es / Para quién no

**Para:** Front-End I **Sesión 13** e **integrador del semestre 1** — lee este brief, elige nivel (Vanilla / Bootstrap+GSAP / Tailwind+Vite) y planifica el portfolio en tres niveles con IA docs-first donde aplique.

**No para:** empezar React (semestre 2), saltarse evidencia del Nivel 1, ni entregar una plantilla que no puedas defender.

**Al terminar esta sesión tendrás:** plan escrito (`docs/plan*.md`), checklist de hitos, estructura de repo alineada con el brief y primer entregable del Nivel 1 acotado.

---

## Antes de empezar

| Requisito | ¿Obligatorio? |
| --- | --- |
| Sesiones 1–12 completas (o plan de carencias con el profesor) | Sí |
| Repo GitHub + URL Pages | Sí |
| Briefs SOW y hackathon 404 leídos | Recomendado |

**Tiempo oficial:** 4 h de clase + 1,5 h de lab (sesión del brief); el proyecto continúa el resto del semestre 1.

---

## Sigue este camino

| Paso | Acción | Sección |
| --- | --- | --- |
| 1 | Lee brief vivo + regla IA en dos fases | Documento vivo / Uso IA |
| 2 | Elige progresión Nivel 1 → 2 → 3 a tu ritmo | Niveles en el brief |
| 3 | Escribe `docs/plan1.md` antes de codear Nivel 1 | Uso de IA |
| 4 | Mapea requisitos a commits/hitos | Secciones de requisitos |
| 5 | Checklist en README para defensa | Entregables |
| 6 | Empieza implementación Nivel 1 (vanilla) | Producción |

---

## Comprueba antes de salir

- [ ] Existe `docs/plan1.md` antes del código nuevo de esta semana
- [ ] README lista URL Pages, nivel objetivo y declaración IA
- [ ] Alcance Nivel 1 escrito (páginas, secciones, mínimo accesibilidad)
- [ ] Puedes explicar un trade-off (CDN vs npm) en voz alta
- [ ] Primer commit de hito subido

---

## Fallos frecuentes

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| Saltaste a Tailwind sin Nivel 1 | Integrador omitido | Completa evidencia vanilla |
| Sin planes en repo | Código IA directo | Para; escribe `docs/plan1.md` |
| Plantilla genérica | Bootcamp clonado | Contenido propio + insights SOW |
| Defensa falla en autoría | No explicas commits | Documenta decisiones ATELIER |
| Niveles mezclados | Sin progresión clara | Rama o tag por nivel |

---

## Entrega (evidencia Sesión 13)

- URL repo + enlace a `docs/plan1.md`
- Sección README: nivel objetivo este mes + fecha del próximo hito

---

> **Documento Vivo:**
> Esta especificación estará siempre disponible en:
> [https://web-ateliers.github.io/web-foundations/lessons/es/portfolio-template-brief/challenge/](https://web-ateliers.github.io/web-foundations/lessons/es/portfolio-template-brief/challenge/)

> **Sobre el uso de agentes de IA:**
> Aunque trabajes con herramientas como VS Code y Copilot, **toda interacción con asistentes de programación basados en IA (por ejemplo, Cursor, GitHub Copilot, Claude, ChatGPT) debe seguir un enfoque en dos fases:**
>
> 1. **Fase 1: Planificación** — Pide a la IA que genere un plan de desarrollo para la tarea/feature concreta
> 2. **Fase 2: Implementación** — Solo después de documentar el plan, pasa a implementar
>
> Documenta cada plan en `./docs/plan1.md`, `./docs/plan2.md`, `./docs/plan3.md`, etc., antes de implementar la feature correspondiente. Esto garantiza una arquitectura intencional y evita la generación de código sin rumbo. (Y sí, sospechamos que a la IA le gusta tanto esta estructura como a ti cuando estás depurando a las 2 de la mañana.)
>
> **Nota:** Este documento se creó siguiendo precisamente esta metodología. Puedes ver el [plan de desarrollo](../plan/index.md) que guió su creación.

---

## La filosofía: Enseñar a pescar, no dar el pez

<figure class="quote">
  <blockquote>
    Dale un pez a un hombre y comerá un día. Enséñale a pescar y comerá toda la vida.
  </blockquote>
  <figcaption>
    &mdash; Proverbio chino
  </figcaption>
</figure>

Este proyecto final **no** va de crear «otro portfolio más». Ya hay suficientes portfolios estáticos perdidos en GitHub que nunca se actualizarán después de recibir una nota. En lugar de eso, vas a construir una **plantilla reutilizable**: una base bien pensada que tú (y otras personas) podréis clonar, bifurcar y personalizar para múltiples proyectos a lo largo de vuestra carrera.

Piensa en ello como tejer una **red de pesca**, no en atrapar un solo pez. Estás creando:

- Un punto de partida sólido para futuros proyectos de clientes
- Una demostración de tus capacidades técnicas
- Un sistema personalizable adaptable a distintos contextos
- Una plantilla profesional que merezca la pena bifurcar

Esta plantilla debería estar tan bien estructurada que, dentro de seis meses, cuando alguien te pida que le construyas un sitio de portfolio, puedas decir: «Déjame enseñarte mi plantilla» y tengas una base profesional lista en cuestión de minutos, no de horas.

### El enfoque Atelier Web

En nuestro método de atelier creemos en el **aprender haciendo**, con teoría, práctica y reflexión compartida. Este proyecto encarna esa filosofía:

1. **Teoría**: Has visto diseño responsive, animaciones, tipografía, accesibilidad y despliegue a lo largo del curso.
2. **Práctica**: Ahora lo integras todo en un proyecto profesional coherente.
3. **Reflexión**: Documentarás tus decisiones, criticarás tu trabajo y ayudarás a indexar a la comunidad del curso.

El desarrollo web profesional no consiste en memorizar frameworks, sino en entender principios y aplicarlos creativamente. (Y sí, también consiste en preguntarse por qué CSS Grid se comporta así a las 3 de la mañana, para descubrir luego que te faltaba `display: grid`. A todas nos ha pasado.)

---

## Visión general del proyecto

### Qué vas a construir

Una **plantilla de portfolio preparada para producción** que demuestre:

- Estándares profesionales de desarrollo web
- Principios de diseño responsive, fluido e intrínseco
- Técnicas modernas de CSS y animaciones cuidadas
- Código limpio, mantenible y bien documentado
- Buenas prácticas de despliegue y control de versiones
- Tu firma creativa única y capacidad de contar historias

### Tres niveles de calificación

Este proyecto admite tres niveles técnicos, cada uno apoyado en una base distinta:

#### 🎯 Primer Grado: Fundamentos en Vanilla

**Stack tecnológico:**

- HTML5, CSS3, JavaScript (ES6+)
- Todas las dependencias vía CDN (sin herramientas de build)
- Enfoque en los fundamentos y en una arquitectura limpia

**Ideal para:**

- Estudiantes que están consolidando las tecnologías web básicas
- Proyectos que enfatizan HTML semántico y JS vanilla
- Aprender despliegue sin la complejidad de un build

**Competencias clave:**

- Manipulación del DOM sin frameworks
- Arquitectura CSS (custom properties, estructura lógica)
- Diseño responsive con media queries
- Mentalidad de mejora progresiva (_progressive enhancement_)

---

#### 🎯 Segundo Grado: Bootstrap + GSAP

**Stack tecnológico:**

- Bootstrap 5.x (vía CDN)
- GSAP (GreenSock Animation Platform) vía CDN
- Patrones intermedios de JavaScript
- jQuery opcional (solo si ciertos componentes de Bootstrap lo requieren)

**Ideal para:**

- Estudiantes cómodos con frameworks CSS
- Proyectos que necesitan prototipado rápido
- Implementaciones avanzadas de animación

**Competencias clave:**

- Personalización de Bootstrap
- Animaciones en timeline y ScrollTrigger con GSAP
- Pensamiento basado en componentes
- Diseño responsive apoyado en framework

---

#### 🎯 Tercer Grado: SPA con Tailwind + Vite

**Stack tecnológico:**

- Vite como herramienta de build (entorno Node.js)
- Tailwind CSS como framework de utilidades
- SPA con JavaScript vanilla y routing en cliente
- PostCSS para procesado de CSS

**Ideal para:**

- Estudiantes preparados para tooling moderno
- Arquitecturas de single-page application
- Optimización avanzada de build

**Competencias clave:**

- Herramientas modernas de build y hot module replacement
- Metodología utility-first con Tailwind
- Routing en cliente (implementación vanilla JS)
- Arquitectura de componentes sin frameworks pesados
- Optimización de build para producción

---

## Requisitos comunes (todos los niveles)

Independientemente de tu nivel, todo proyecto debe incluir:

### 1. Repositorio y control de versiones

- **Repositorio en GitHub** con nombre claro y descriptivo (por ejemplo, `portfolio-template-2025`)
- **Mensajes de commit significativos** siguiendo un estilo tipo Conventional Commits
- **`.gitignore` completo** (excluye `node_modules/`, `.DS_Store`, configuraciones de IDE, etc.)
- **Tag de Git** para la entrega final: `v1.0.0`
- **GitHub Release** creado a partir del tag con notas de versión

### 2. Despliegue

- **Hosting en GitHub Pages** con URL pública y accesible
- **Página 404 personalizada** con navegación de vuelta a inicio
- **HTTPS activado** (automático en GitHub Pages)
- **Verificación del despliegue** (todos los assets cargan, sin enlaces rotos)

### 3. Documentación

- **README.md** con:

  - Enlace al despliegue **en la primera línea**
  - Descripción y propósito del proyecto
  - Stack tecnológico utilizado
  - Instrucciones de configuración para desarrollo local
  - Guía de personalización
  - Capturas de pantalla o GIF de demo
  - Créditos y agradecimientos

- **LICENSE** en la raíz (elige [MIT](https://choosealicense.com/licenses/mit/), [Apache 2.0](https://choosealicense.com/licenses/apache-2.0/) o [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) — recomendada: MIT)

- **Política de uso de agentes de IA**: si utilizas asistentes de IA, incluye una sección clara en el README describiendo cuándo y cómo se ha usado la IA. **Crítico:** toda interacción con IA debe seguir un **flujo en dos fases**:

  1. **Fase 1: Planificación** — Solicitar a la IA un plan de desarrollo
  2. **Fase 2: Implementación** — Solo después de documentar el plan, pasar a código

- **`docs/plan1.md, plan2.md, plan3.md...`**: para cada feature o tarea en la que uses IA, crea un archivo de plan independiente:

  - `docs/plan1.md` — Primera feature/tarea (ej. «Componente de navegación responsive»)
  - `docs/plan2.md` — Segunda feature/tarea (ej. «Animaciones con GSAP ScrollTrigger»)
  - `docs/plan3.md` — Tercera feature/tarea (ej. «Integración de formulario de contacto»)
  - Cada plan debe contener:
    - Tu prompt/pregunta a la IA
    - La respuesta completa de la IA (el plan)
    - Notas breves sobre qué se implementó del plan
  - **Nunca te saltes la fase de planificación** — implementar sin plan documentado vacía de sentido el desarrollo estructurado

- **Higiene profesional de commits y pull requests**: usa títulos descriptivos, resúmenes claros y auto‑reviews que documenten tu proceso y decisiones.

- **Antes de usar un agente de IA para implementar:** haz siempre un commit de tu estado (pre‑IA) con un mensaje claro (por ejemplo, `feat(nav): before applying AI planning`). Esto preserva tu trabajo original y crea un historial transparente de lo que cambió con ayuda de IA.

**Archivos mínimos obligatorios (todos los niveles):**

- `README.md`
- `LICENSE`
- `.gitignore`
- `404.html` (página de error personalizada)
- `docs/plan1.md` (si usas IA para cualquier feature; crea `plan2.md`, `plan3.md`, etc. según necesites)

**Recomendado:**

- `CONTRIBUTING.md` si otras personas pueden bifurcar o contribuir

### 4. Diseño responsive (fluido + elástico + intrínseco)

Referencia: [Lección de Diseño Responsive](/lessons/es/responsive/)

- Enfoque **mobile-first** con mejora progresiva
- **Tipografía fluida** usando `clamp()` para una escala suave
- **Layouts elásticos** que se adaptan al contexto del contenedor
- **Diseño intrínseco** con CSS Grid `auto-fit` y Container Queries (cuando estén soportadas)
- **Efectos de parallax y scroll** integrados en la estrategia de layout
- **Pruebas en distintos breakpoints**: móvil (320px-480px), tablet (481px-768px), escritorio (769px+)

### 5. Semántica y estructura HTML

- **HTML5 semántico** (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- **Jerarquía de encabezados correcta** (un solo `<h1>`, estructura lógica `<h2>`–`<h6>`)
- **Formularios accesibles** con `<label>` asociado y atributos ARIA cuando sea necesario
- **Estructura de directorios coherente**:

```
portfolio-template/
├── index.html
├── 404.html
├── README.md
├── LICENSE
├── .gitignore
├── docs/                  # Documentación y planes
│   └── plan.md            # Plan de desarrollo con agentes de IA (si se usan)
├── assets/
│   ├── css/
│   │   ├── index.css        # archivo “barrel”: centraliza todos los imports de CSS
│   │   ├── base.css         # reset, variables, estilos de raíz
│   │   ├── layout.css       # utilidades de layout/grid/flex
│   │   ├── components.css   # estilos compartidos de componentes (botones, cards, etc.)
│   │   └── [otros].css      # añade según necesidad
│   ├── js/
│   │   └── main.js
│   ├── images/              # idealmente CDN; si son locales, optimizadas y ligeras
│   └── fonts/               # si usas tipografías personalizadas (se prefieren las de sistema)
└── [configuración de build si aplica]
```

### 6. Metadatos e identidad visual

Referencia: [Lección de Metadatos e Identidad Visual](/lessons/es/metadata-visual-identity-web/)

- **Metadatos completos en `<head>`**:
  - Título, descripción, palabras clave
  - Open Graph (Facebook/LinkedIn)
  - Twitter Card
  - Meta viewport
  - Meta theme-color
- **Favicon** (varios tamaños: 16×16, 32×32, 180×180 para Apple Touch)
- **Manifest.json** (opcional pero recomendable para preparación PWA)
- **Identidad visual consistente**: paleta de color, tipografía, iconografía

### 7. Calidad de código y estándares

Referencia: [Lección de Linting y Formateo](/lessons/es/linting-and-formatting/)

- **Prettier** para formato consistente
- **ESLint** para linting de JavaScript (o JSHint como mínimo)
- **Stylelint** para CSS (opcional pero recomendable)
- **Sin errores de consola** en la versión desplegada
- **Código comentado** explicando la lógica o decisiones de diseño complejas
- **Organización CSS**: variables, reset, layout, componentes, utilidades
- **Organización JavaScript**: funciones claras, sin contaminar el espacio global

### 8. Accesibilidad básica

(Nota: la accesibilidad completa se tratará el siguiente semestre. Por ahora, céntrate en lo fundamental.)

- **Contraste de color** que cumpla WCAG AA (4.5:1 para texto de cuerpo)
- **`prefers-reduced-motion`** para desactivar animaciones cuando el usuario lo solicite
- **Texto alternativo** en todas las imágenes con significado
- **Navegación por teclado** funcional en los elementos interactivos
- **Enlace de «saltar al contenido»** para lectores de pantalla (opcional pero apreciado)

---

## Componentes técnicos a implementar

### Animación e interactividad

Elige las técnicas adecuadas para tu nivel:

#### Animaciones CSS (todos los niveles)

Referencia: [Lección de Animaciones CSS](/lessons/es/web-animations/css/)

- **Transiciones** para estados _hover_, interacciones de botones
- **Animaciones con `@keyframes`** para entrada del hero, estados de carga
- **Animaciones ligadas al scroll** (CSS moderno con `animation-timeline: scroll()`)

#### Animaciones con GSAP (Grados 2 y 3)

Referencia: [Lección de GSAP](/lessons/es/web-animations/gsap/)

- **Timelines** para secuencias complejas
- **ScrollTrigger** para reveals y efectos de parallax
- **SplitText** para efectos tipográficos (opcional, plugin premium)

### Tipografía

Referencia: [Lección de Tipografía y Color](/lessons/es/tipografia-color/)

- **Sistema tipográfico fluido** con `clamp()`:

```css
:root {
	--text-base: clamp(1rem, 2.5vw, 1.125rem);
	--text-lg: clamp(1.125rem, 3vw, 1.25rem);
	--text-xl: clamp(1.25rem, 4vw, 1.5rem);
	--text-2xl: clamp(1.5rem, 5vw, 2rem);
	--text-3xl: clamp(2rem, 6vw, 3rem);
}
```

- **Stack de sistema** o como máximo 2–3 familias de tipografía web bien elegidas
- **Interlineados responsivos**

### Tendencias de diseño (elige 2–3)

Referencia: [Lección de Tendencias Modernas de Diseño Web](/lessons/es/modern-web-design-trends/)

- **Glassmorphism**: efecto de vidrio esmerilado con `backdrop-filter: blur()`
- **Neumorphism**: soft UI con sombras sutiles (usar con moderación)
- **Parallax**: diferentes velocidades de scroll para dar profundidad
- **Modo oscuro**: toggle con custom properties + estado en JavaScript
- **Fondos en gradiente**: transiciones modernas y vibrantes
- **Scroll-snapping**: navegación por secciones
- **Micro‑interacciones**: pequeñas animaciones de placer al interactuar

### Patrones de componentes

Construye estos componentes núcleo con atención al detalle:

1. **Navegación**

   - Menú responsive (hamburguesa en móvil)
   - Scroll suave a secciones
   - Indicación de estado activo
   - Posicionamiento fijo/pegajoso (opcional)

2. **Sección Hero**

   - Titular y subtítulo convincentes
   - Botón de llamada a la acción
   - Imagen o gradiente de fondo
   - Indicador de scroll (opcional)

3. **Sección About**

   - Breve biografía o presentación
   - Grid de habilidades o tecnologías
   - Opcional: foto de perfil con efecto hover

4. **Grid de Proyectos/Portfolio**

   - Layout con CSS Grid o Flexbox
   - Tarjetas de proyecto con imágenes
   - Efectos hover (o modales) que revelan información
   - Enlaces a demos en vivo y repos de código

5. **Sección de Contacto**

   - Formulario de contacto (puedes usar Formspree) o enlace mailto
   - Enlaces a redes sociales
   - Información de localización o disponibilidad (opcional)

6. **Footer**

   - Aviso de copyright
   - Enlaces rápidos
   - Botón para volver arriba (opcional)
   - Enlace al repositorio en GitHub

---

## Rúbrica de evaluación _(provisional y de referencia, no vinculante)_

> _Nota: Estos porcentajes son un borrador de trabajo y pueden afinarse a medida que avance el curso — céntrate en el proceso, no en la perfección. No te obsesiones con cada punto; el objetivo real es disfrutar aprendiendo, construir algo significativo y hacer crecer tus habilidades._

Tu proyecto se evaluará tanto por la **excelencia técnica** (60 puntos) como por el **diseño y factores humanos** (40 puntos). Este equilibrio refleja que el desarrollo web profesional exige tanto una buena ingeniería como una experiencia de usuario cuidada.

### Excelencia técnica (60 puntos)

#### 1. Calidad de código y arquitectura (15 puntos)

- **[5 pts]** Estructura de código limpia y bien organizada
- **[3 pts]** Uso adecuado de custom properties de CSS y features modernas
- **[3 pts]** JavaScript sigue buenas prácticas
- **[2 pts]** Código formateado y linteado (Prettier + ESLint)
- **[2 pts]** Comentarios significativos que explican la lógica compleja

#### 2. Despliegue y configuración de repositorio (10 puntos)

- **[3 pts]** Repositorio en GitHub bien configurado con README claro
- **[3 pts]** Despliegue en GitHub Pages, completamente funcional
- **[2 pts]** Tag de Git (`v1.0.0`) y GitHub Release creados
- **[2 pts]** `.gitignore` completo e historial de commits limpio

#### 3. Implementación de diseño responsive (15 puntos)

- **[5 pts]** Sistema tipográfico fluido con `clamp()`
- **[4 pts]** Layout mobile-first funcionando en todos los breakpoints
- **[3 pts]** Efectos de parallax y scroll integrados en el layout
- **[3 pts]** Principios de diseño intrínseco (CSS Grid auto‑fit, conciencia de contenedor)

#### 4. Animaciones e interactividad (10 puntos)

- **[4 pts]** Animaciones suaves y con propósito (CSS y/o GSAP)
- **[3 pts]** Componentes interactivos (navegación, estados hover, formularios)
- **[3 pts]** Implementación de `prefers-reduced-motion` para accesibilidad

#### 5. Semántica HTML y accesibilidad (10 puntos)

- **[4 pts]** Estructura HTML5 semántica con jerarquía de encabezados correcta
- **[3 pts]** Metadatos completos en `<head>` y favicon
- **[3 pts]** Accesibilidad básica: contraste, alt text, navegación por teclado

---

### Diseño y factores humanos (40 puntos)

#### 6. Estética visual y coherencia (12 puntos)

- **[4 pts]** Diseño visual profesional y pulido
- **[4 pts]** Sistema coherente de color y tipografía
- **[4 pts]** Lenguaje visual consistente (espaciados, tamaños, patrones)

#### 7. Creatividad y firma personal (12 puntos)

- **[5 pts]** Toques creativos que distinguen la plantilla
- **[4 pts]** Estilo personal evidente en las decisiones de diseño
- **[3 pts]** Uso reflexivo de tendencias (no solo copiar ejemplos)

#### 8. Narratividad y _storytelling_ (8 puntos)

- **[4 pts]** Flujo narrativo claro que guía al usuario por las secciones
- **[4 pts]** Estructura de contenido que cuenta una historia coherente (aunque el contenido sea placeholder)

#### 9. Pragmatismo y usabilidad (8 puntos)

- **[4 pts]** Navegación e interacción intuitivas
- **[4 pts]** Usabilidad práctica: tiempos de carga rápidos, sin interacciones rotas

---

## Estándares profesionales web: checklist antes de entregar

Antes de entregar, verifica **cada ítem** de esta checklist. Las personas profesionales no publican trabajo sin un pase mínimo de calidad. (¿Por qué preferimos el modo oscuro? Porque los bugs van hacia la luz. Pero de verdad —este checklist atrapa muchos antes de que salgan a producción.)

### Repositorio y control de versiones

- [ ] El repositorio tiene un nombre claro y descriptivo
- [ ] Existe `README.md` con el enlace de despliegue en la parte superior
- [ ] El README incluye instrucciones de instalación y stack tecnológico
- [ ] `.gitignore` es completo y adecuado a tu stack
- [ ] El historial de commits es limpio, con mensajes significativos
- [ ] Tag `v1.0.0` creado
- [ ] GitHub Release creado con notas de versión
- [ ] No hay información sensible (API keys, contraseñas, etc.) en el repo

### Verificación del despliegue

- [ ] El sitio está en vivo en GitHub Pages en una URL pública
- [ ] Todas las páginas cargan sin errores (mira la consola del navegador)
- [ ] Todas las imágenes y assets cargan correctamente
- [ ] No hay enlaces rotos (internos ni externos)
- [ ] La página 404 personalizada funciona y permite volver al inicio
- [ ] HTTPS está activado (automático en GitHub Pages)
- [ ] El sitio funciona en modo incógnito/privado (para evitar falsos positivos por caché)

### Comportamiento responsive

- [ ] Móvil (320px): el layout es usable, sin scroll horizontal
- [ ] Móvil (480px): todo el contenido es legible y accesible
- [ ] Tablet (768px): el layout se adapta correctamente
- [ ] Escritorio (1024px): el layout completo se ve como se espera
- [ ] Escritorio grande (1920px): sin huecos absurdos ni estiramientos raros
- [ ] Cambios de orientación (vertical/horizontal) gestionados con gracia

### Calidad de código

- [ ] HTML valida (usa [W3C Validator](https://validator.w3.org/))
- [ ] CSS está organizado y sigue un sistema de nombres coherente
- [ ] JavaScript no produce errores de consola en producción
- [ ] Código formateado con Prettier
- [ ] Código linteado (ESLint para JS, opcionalmente Stylelint para CSS)
- [ ] No quedan bloques de código comentado en producción
- [ ] Los comentarios explican el «por qué», no el «qué»

### HTML semántico y estructura

- [ ] Elementos HTML5 semánticos usados correctamente
- [ ] Un solo `<h1>` por página, jerarquía de encabezados lógica
- [ ] Todas las imágenes tienen atributos `alt` descriptivos
- [ ] Los formularios tienen `<label>` correctamente asociados
- [ ] La estructura de directorios es lógica y limpia

### Diseño y animaciones

- [ ] Sistema tipográfico fluido implementado con `clamp()`
- [ ] Al menos 2 tendencias de diseño modernas implementadas
- [ ] Animaciones CSS suaves (idealmente 60fps, sin _jank_)
- [ ] `prefers-reduced-motion` desactiva animaciones cuando procede
- [ ] Estados hover en elementos interactivos
- [ ] Estados de carga para cualquier contenido asíncrono

### Metadatos e identidad visual

- [ ] `<title>` descriptivo y único
- [ ] Meta descripción existe y es convincente (150–160 caracteres)
- [ ] Etiquetas Open Graph completas (`og:title`, `og:description`, `og:image`, `og:url`)
- [ ] Etiquetas Twitter Card completas
- [ ] Favicon existe y se ve correctamente (múltiples tamaños)
- [ ] Meta viewport configurada: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] Meta theme-color configurada

### Rendimiento

- [ ] Imágenes optimizadas (usa un CDN como ImageKit o similar)
- [ ] CSS y JS minificados (si usas herramientas de build)
- [ ] Sin CSS o JS no utilizados
- [ ] Fuentes cargadas eficientemente (`font-display: swap`, subconjuntos si aplica)
- [ ] La página carga en menos de 3 segundos en 3G (prueba con throttling en DevTools)

### Accesibilidad (básica)

- [ ] Contraste de color cumple WCAG AA (4.5:1 para texto de cuerpo)
- [ ] Todos los elementos interactivos son navegables con teclado
- [ ] `prefers-reduced-motion` implementado
- [ ] Los estados de foco son visibles en elementos interactivos
- [ ] No hay información que dependa solo del color (usa también iconos o texto)

### Específico por nivel

#### Vanilla (Primer Grado)

- [ ] Todas las dependencias vía CDN (sin pasos de build)
- [ ] JavaScript en vanilla, sin jQuery ni frameworks
- [ ] Uso de custom properties de CSS para tematización

#### Bootstrap + GSAP (Segundo Grado)

- [ ] Bootstrap 5 cargado vía CDN
- [ ] Bootstrap personalizado (no tema por defecto)
- [ ] Animaciones con GSAP y ScrollTrigger implementadas
- [ ] Componentes de Bootstrap estilizados de forma coherente

#### Tailwind + Vite (Tercer Grado)

- [ ] Configuración de Vite funciona (`npm run build`)
- [ ] Tailwind elimina estilos no usados en producción
- [ ] Routing en cliente funcional
- [ ] La build de producción se despliega correctamente en GitHub Pages

---

## Plan de desarrollo en cinco _sprints_

Cada sprint está pensado para completarse en 1,5–4 horas de trabajo concentrado. Se realizarán durante las sesiones de clase, con apoyo del profesor, colaboración entre pares y uso de agentes de IA (documentando siempre la planificación).

### Sprint 1 (Semana 1): Base y configuración

**Tiempo estimado:** 1,5–2 horas
**Objetivo:** Establecer estructura del proyecto y despliegue inicial

> **Nota rápida de planificación:** Unos bocetos sencillos a lápiz de tu layout son más que suficientes; no necesitas maquetas de alta fidelidad.

#### Tareas:

1. **Configuración del repositorio**

   - Crear repositorio en GitHub con nombre claro
   - Inicializar con una plantilla de README
   - Crear `.gitignore` adecuado a tu stack
   - Preparar entorno de desarrollo local

2. **Estructura del proyecto**

   - Crear estructura de directorios (assets/css, assets/js, etc.)
   - Montar `index.html` con esqueleto semántico
   - Crear página `404.html`
   - Si usas Vite: inicializar proyecto con `npm create vite@latest`

3. **Arquitectura CSS**

   - Definir custom properties para colores, espaciado y tipografía
   - Crear reset/normalize CSS
   - Configurar estilos tipográficos base
   - Implementar stack de tipografía de sistema o cargar fuentes web

4. **Despliegue inicial**

   - Configurar GitHub Pages
   - Desplegar la primera versión
   - Verificar que el despliegue funciona

5. **Documentación**

   - Escribir README inicial con descripción del proyecto
   - Añadir enlace de despliegue al README
   - Si usas agentes de IA: crear `docs/plan1.md` con el plan de desarrollo (Fase 1) antes de implementar (Fase 2)

**Entregable:** Sitio en vivo con estructura básica desplegada en GitHub Pages

---

### Sprint 2 (Semana 2): Layout responsive y secciones núcleo

**Tiempo estimado:** 2–3 horas
**Objetivo:** Construir el layout principal con diseño responsive y fluido

#### Tareas:

1. **Sistema tipográfico fluido**

   - Implementar una escala tipográfica basada en `clamp()`
   - Probar la escala en distintos breakpoints
   - Garantizar legibilidad en todos los tamaños

2. **HTML de secciones principales**

   - Construir sección hero con CTA
   - Crear la estructura de la sección About
   - Montar la grid de proyectos
   - Añadir sección de contacto
   - Crear el footer

3. **Layout responsive**

   - Implementar CSS mobile-first
   - Añadir media queries para tablet y escritorio
   - Probar el layout en todos los breakpoints
   - Asegurar ausencia de scroll horizontal en móvil

4. **Parallax y efectos ligados al scroll**

   - Integrar parallax en el hero o en secciones seleccionadas
   - Implementar estrategias de layout ligadas al scroll
   - Probar rendimiento y suavidad

5. **Layouts con Grid/Flexbox**

   - CSS Grid para proyectos (`auto-fit`, `minmax`)
   - Flexbox para navegación y componentes más pequeños
   - Asegurar comportamiento intrínseco, consciente del contenedor

**Entregable:** Layout completamente responsive que funciona en todos los dispositivos

---

### Sprint 3 (Semana 3): Animaciones e interactividad

**Tiempo estimado:** 2–4 horas
**Objetivo:** Añadir capa de pulido con animaciones y componentes interactivos

#### Tareas:

1. **Animaciones CSS**

   - Transiciones para estados hover (botones, tarjetas, enlaces)
   - Animaciones con `@keyframes` para la entrada del hero
   - Animaciones ligadas al scroll (CSS moderno o polyfill)

2. **Implementación de GSAP** (Grados 2 y 3)

   - Configurar GSAP vía CDN o npm
   - Crear timelines para secuencias complejas
   - Implementar ScrollTrigger para reveals basados en scroll
   - Añadir efectos de parallax con GSAP

3. **Componentes interactivos**

   - Navegación responsive (menú hamburguesa en móvil)
   - Scroll suave a secciones
   - Efectos hover en tarjetas de proyecto
   - Validación de formularios (si incluyes formulario de contacto)

4. **Accesibilidad del movimiento**

   - Implementar media query `prefers-reduced-motion`
   - Probar con la preferencia de movimiento reducida activada
   - Garantizar que la funcionalidad principal no depende de las animaciones

5. **Pruebas de rendimiento**

   - Verificar que las animaciones corren a 60fps
   - Optimizar animaciones con _jank_
   - Asegurar rendimiento suave en móvil

**Entregable:** Sitio pulido, animado y con muy buena UX

---

### Sprint 4 (Semana 4): Identidad visual y pulido final

**Tiempo estimado:** 2–3 horas
**Objetivo:** Completar metadatos, identidad visual y firma creativa

#### Tareas:

1. **Implementación de metadatos**

   - Completar todas las etiquetas meta en `<head>`
   - Crear imagen Open Graph (1200×630px)
   - Configurar etiquetas Twitter Card
   - Añadir meta theme-color

2. **Favicon e identidad visual**

   - Diseñar y generar paquete de favicon (múltiples tamaños)
   - Crear `manifest.json`
   - Asegurar identidad visual consistente en todas las secciones

3. **Implementación de tendencias de diseño**

   - Escoger e implementar 2–3 tendencias modernas
   - Glassmorphism, neumorphism, gradientes, etc.
   - Asegurarse de que las tendencias suman y no distraen

4. **Firma creativa**

   - Añadir toques creativos propios
   - Micro‑interacciones con tu estilo personal
   - Easter eggs o detalles juguetones (opcionales pero divertidos)

5. **Auto‑indexación en el repositorio del curso**

   - Hacer fork del repositorio del curso del profesor
   - Añadir tu proyecto al índice de estudiantes
   - Enviar pull request con tu entrada
   - Incluir: nombre, URL del proyecto, stack tecnológico, breve descripción

**Entregable:** Sitio visualmente completo, con metadatos y registrado en el índice del curso

---

### Sprint 5 (Semana 5): QA y entrega

**Tiempo estimado:** 1,5–2 horas
**Objetivo:** Pruebas finales, optimización y entrega

#### Tareas:

1. **Revisión completa con checklist**

   - Pasar por toda la checklist de pre‑entrega
   - Corregir cualquier problema detectado
   - Documentar limitaciones conocidas

2. **Pase de calidad de código**

   - Ejecutar Prettier en todos los archivos
   - Ejecutar ESLint y corregir issues
   - Eliminar `console.log` y código comentado
   - Verificar que los comentarios restantes son útiles

3. **Pruebas cross‑browser**

   - Probar en Chrome, Firefox, Safari, Edge
   - Móvil: Safari en iOS y Chrome en Android
   - Corregir problemas específicos de cada navegador

4. **Optimización de rendimiento**

   - Optimizar imágenes (compresión, CDN)
   - Minificar CSS y JS (si usas build tools)
   - Medir velocidad de carga con DevTools
   - Objetivo: < 3 segundos en 3G

5. **Documentación final**

   - Actualizar README con detalles finales
   - Añadir capturas de pantalla o GIF de demo
   - Documentar instrucciones de instalación con claridad
   - Añadir información de licencia

6. **Control de versiones y entrega**

   - Commit final con mensaje «Release v1.0.0»
   - Crear tag: `git tag -a v1.0.0 -m "Final submission"`
   - Hacer push del tag: `git push origin v1.0.0`
   - Crear GitHub Release a partir del tag con notas

**Entregable:** Plantilla de portfolio lista para producción y lista para entrega

---

## Requisitos de entrega

### Cuando estés listo para entregar:

1. **Verifica el despliegue**

   - Confirma que el sitio está en vivo en tu URL de GitHub Pages
   - Prueba en modo incógnito/privado para evitar problemas de caché
   - Revisa la consola por errores

2. **Crea el tag de Git**

```bash
git tag -a v1.0.0 -m "Final portfolio template v1.0.0"
git push origin v1.0.0
```

3. **Crea la GitHub Release**

   - Ve al repositorio en GitHub
   - Haz clic en «Releases» → «Create a new release»
   - Elige el tag `v1.0.0`
   - Título: «Portfolio Template v1.0.0»
   - Descripción: notas breves de la release (qué incluye, features clave)
   - Publica la release

4. **Auto‑indexación en el repositorio del curso** (tarea del Sprint 4)

   - Tu entrada ayuda a crear un escaparate del trabajo de toda la clase
   - Crea un recurso colaborativo de aprendizaje
   - Practica un flujo profesional de contribución a proyectos open‑source

5. **Confirmación de entrega**

   - Verifica que tu GitHub Release es pública
   - Asegúrate de que el README tiene el enlace de despliegue bien visible arriba
   - Revisa por última vez toda la checklist

---

## Consideraciones según nivel

### Vanilla (Primer Grado): Dominio de fundamentos

**Enfoques clave:**

- Código limpio y legible sin «magia» de frameworks
- Entendimiento profundo de la manipulación del DOM
- Arquitectura CSS apoyada en custom properties
- Mentalidad de mejora progresiva

**Consejos:**

- Usa JavaScript moderno (ES6+): `const`, `let`, funciones flecha, módulos
- Organiza el JS en funciones de propósito único y claro
- Comenta la organización de tu CSS (variables, layout, componentes, utilidades)
- Abraza las limitaciones: vanilla te obliga a entender de verdad la plataforma

**Errores habituales:**

- Falta de estructura (todo en el scope global)
- Implementaciones vanilla demasiado complejas para tareas simples
- Olvidar modularizar CSS (¡usa custom properties!)

---

### Bootstrap + GSAP (Segundo Grado): Finesse con frameworks

**Enfoques clave:**

- Personalizar Bootstrap, no usar el tema por defecto
- Usar GSAP para animaciones complejas basadas en timelines
- Equilibrar la comodidad del framework con estilos propios
- Organización basada en componentes

**Consejos:**

- Personaliza Bootstrap vía variables de CDN o sobrescritura sistemática
- Usa ScrollTrigger de GSAP para efectos sofisticados basados en scroll
- No luches contra el framework: entiende la grid y utilidades de Bootstrap
- Combina utilidades responsive de Bootstrap con CSS propio para pulir detalles

**Errores habituales:**

- Look demasiado «Bootstrappy» (personaliza colores, tipografías, espaciados)
- Cargar demasiados componentes de Bootstrap (usa solo lo necesario)
- Timelines de GSAP demasiado complejos (mantén las animaciones con propósito)
- No probar en los breakpoints de Bootstrap

---

### Tailwind + Vite (Tercer Grado): Maestría en tooling moderno

**Enfoques clave:**

- Configuración y optimización del build
- Metodología utility‑first de Tailwind
- Routing en cliente (SPA) con JavaScript vanilla
- Optimización de la build de producción

**Consejos:**

- Configura Tailwind para purgar estilos no utilizados
- Usa el modo JIT de Tailwind para un desarrollo más ágil
- Implementa routing en cliente con History API
- Optimiza la build de Vite para GitHub Pages
- Crea una estructura de componentes reutilizables aunque uses solo JS vanilla

**Errores habituales:**

- «Sopa de clases» de Tailwind (extrae patrones repetidos a CSS o componentes)
- No purgar CSS (builds de producción demasiado pesadas)
- Routing roto en GitHub Pages (asegúrate de configurar `base` correctamente)
- Sobre‑ingeniería en la arquitectura SPA (mantén la solución simple)

**Despliegue Vite + GitHub Pages:**

```javascript
// vite.config.js
export default {
	base: '/your-repo-name/', // Importante para GitHub Pages
	build: {
		outDir: 'dist',
	},
};
```

Luego despliega la carpeta `dist/` a la rama `gh-pages` o configura Pages para servir desde una carpeta `/docs`.

---

## Recursos y referencias

### Lecciones esenciales

- [Responsive (canónica)](/lessons/es/responsive/) — Diseño fluido, elástico e intrínseco
- [Animaciones CSS](/lessons/es/web-animations/css/) — Transiciones, keyframes, scroll‑driven
- [Animaciones GSAP](/lessons/es/web-animations/gsap/) — Timelines y ScrollTrigger
- [Tipografía y Color](/lessons/es/tipografia-color/) — Tipografía fluida y sistemas de color
- [Tendencias Modernas de Diseño Web](/lessons/es/modern-web-design-trends/) — Glassmorphism, parallax, dark mode
- [Metadatos e Identidad Visual](/lessons/es/metadata-visual-identity-web/) — Guía completa de metadatos
- [Linting y Formateo](/lessons/es/linting-and-formatting/) — Estándares de calidad de código

### Recursos específicos por nivel

**Bootstrap + GSAP:**

- [Despliegue de proyecto final con Bootstrap](/lessons/es/bootstrap/final-project-deployment/)

**Tailwind + Vite:**

- [Tailwind: build y despliegue](/lessons/es/tailwind/build-deploy/)

### Herramientas externas

- [W3C HTML Validator](https://validator.w3.org/) — Validar HTML
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — Comprobar contraste de color
- [PageSpeed Insights](https://pagespeed.web.dev/) — Probar rendimiento
- [ImageKit.io](https://imagekit.io/) — CDN para optimizar imágenes
- [Formspree](https://formspree.io/) — Backend para formularios de contacto (plan gratuito)

---

## FAQ y resolución de problemas

### «Mi sitio en GitHub Pages muestra un error 404»

**Comprueba:**

- En _Settings → Pages_: ¿Está activado Pages y apunta a la rama/carpeta correcta?
- ¿Has hecho push de tus commits y esperado 1–2 minutos al despliegue?
- ¿Tu `index.html` está en la raíz (o en `/docs`)?
- Si usas Vite: ¿has configurado bien la opción `base` en `vite.config.js`?

### «Mi CSS/imágenes no cargan en GitHub Pages»

**Comprueba:**

- ¿Las rutas son relativas, no absolutas? (`./assets/css/style.css`, no `/assets/css/style.css`)
- ¿Has hecho commit y push de los archivos de assets?
- Mira la consola del navegador para localizar errores 404 concretos
- Si usas Vite: asegúrate de que los assets están en `public/` o importados correctamente

### «Las animaciones van a tirones en móvil»

**Optimiza:**

- Usa `transform` y `opacity` para animar (aprovecha la GPU)
- Evita animar `width`, `height`, `top`, `left`
- Añade `will-change` en elementos que vayan a animarse (con moderación)
- Prueba en un dispositivo móvil real, no solo en DevTools
- Reduce la complejidad de animaciones o respeta `prefers-reduced-motion`

### «Mi sitio es demasiado lento»

**Optimiza:**

- Comprime imágenes (usa un CDN como ImageKit o herramientas tipo TinyPNG)
- Minifica CSS y JavaScript (tooling o minificadores online)
- Elimina CSS no usado (PurgeCSS para Tailwind, auditoría manual en otros casos)
- Carga fuentes de forma eficiente (`font-display: swap`, subconjuntos)
- Defer scripts no críticos

### «Estoy atascado y no sé por dónde empezar»

**Estrategias:**

- Revisa el plan de sprints — síguelo paso a paso
- Empieza por el Sprint 1 aunque parezca básico
- Mira el demo de la lección de despliegue con Bootstrap para inspirarte en la estructura
- Pregunta en clase — es muy probable que tus compañeras tengan dudas parecidas
- Si usas IA: sigue el enfoque en dos fases — pide un plan primero (documéntalo en `docs/plan1.md`, `plan2.md`, etc.), luego implementa poco a poco

### «¿Puedo usar un framework CSS no visto en clase?»

Para este proyecto, ciñámonos a los tres stacks definidos (Vanilla, Bootstrap, Tailwind). El objetivo es demostrar dominio de los contenidos del curso, no explorar frameworks nuevos. No obstante, si tienes una razón de peso y el profesor lo aprueba, documenta muy bien tu elección en el README.

---

## Sobre el perfeccionismo y la iteración

Un poco de realidad (y ánimo): esta plantilla **no será perfecta**. Ese no es el objetivo. El desarrollo profesional va de publicar trabajo **suficientemente bueno**, aprender de él e iterar.

Probablemente te veas a las 3 de la mañana ajustando una animación hover 50 milisegundos. Esa es la señal para hacer commit y apagar el ordenador. La plantilla puede —y debe— evolucionar después de la entrega. Los portfolios reales son documentos vivos, que se actualizan a medida que tú creces.

Construye algo de lo que puedas sentirte orgullosa, cumple los requisitos y recuerda: una plantilla de portfolio entregada gana por goleada a una perfecta que nunca sale de borradores. (Y sí, somos conscientes de la ironía de dar este consejo al final de un brief de más de 2000 líneas. Haz lo que decimos, no lo que hacemos.)

Tu yo futuro —y tus futuros clientes— te lo agradecerán por haber construido bien esta base. Ahora ve y crea algo excelente.

---

## Conclusión

Este proyecto final sintetiza todo lo que has aprendido: HTML semántico, CSS responsive, animaciones modernas, despliegue profesional y diseño reflexivo. Más importante aún, estás construyendo una herramienta que **vas a usar**: una plantilla que demuestra tus capacidades y sirve como base para trabajo futuro.

Aborda este proyecto con intención. Documenta tus decisiones. Colabora con tus compañeras. Haz preguntas. Usa la IA con cabeza (y con planes). Y, sobre todo, **entrégalo**. La web necesita más sitios hechos con cariño, y estás a punto de añadir uno más al ecosistema.

---

**¿Dudas o necesitas aclaración?**
Revisa las lecciones enlazadas, consulta al profesor en clase, colabora con tus compañeras y documenta tu proceso. Nos vemos en la meta con tu release `v1.0.0`.
