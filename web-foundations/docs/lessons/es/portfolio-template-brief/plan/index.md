# Proyecto Final de Portfolio del Curso

## Resumen del plan

Crear un documento de brief final de proyecto, profesional y enfocado, en `/web-foundations/docs/lessons/es/portfolio-template-brief/challenge/index.md` que guíe al estudiantado en la construcción de una plantilla de portfolio lista para producción en tres niveles: vanilla, Bootstrap+GSAP y Tailwind+Vite.

## Estructura del documento

### 1. Front matter e introducción

- Front matter de Jekyll con layout adecuado (`methodology`), título, permalink.
- Epígrafe sobre el uso de IA: si se usan agentes/asistentes de IA, el estudiantado **debe** pedir primero un plan y documentarlo en `./docs/plan.md` antes de implementar.
- Apertura con la metáfora del proverbio chino (enseñar a pescar vs. dar el pez).
- Referencia a la filosofía del método atelier.
- Justificación del proyecto: construir una plantilla reutilizable, no un portfolio puntual.

### 2. Especificaciones de los tres niveles

Cada nivel claramente diferenciado con:

- **Primer Grado (Vanilla)**: fundamentos de HTML, CSS y JS con recursos vía CDN.
- **Segundo Grado (Bootstrap+GSAP)**: Bootstrap 5 + animaciones con GSAP vía CDN, JS intermedio.
- **Tercer Grado (Tailwind+Vite)**: configuración con Node/Vite, Tailwind, SPA con routing en JS vanilla.

### 3. Requisitos comunes (todos los niveles)

- Configuración de repositorio y despliegue en GitHub Pages.
- Diseño responsive (fluido + elástico + intrínseco, según la lección de responsive).
- Estructura HTML5 semántica.
- Estructura coherente de directorios.
- Metadatos e identidad visual (Open Graph, favicon, etc.).
- Página 404 personalizada.
- README con el enlace en vivo en la parte superior.
- `.gitignore` completo.
- Calidad de código: Prettier + ESLint/Stylelint.
- Accesibilidad básica: contraste de color, `prefers-reduced-motion`.

### 4. Checklist de estándares profesionales web

Checklist de QA previa a la entrega que cubra:

- Convenciones de repositorio.
- Verificación del despliegue.
- Comportamiento responsive (móvil, tablet, escritorio).
- Calidad de código (linteado, formateado).
- Semántica HTML.
- Implementación de diseño (tipografía, animaciones, tendencias modernas).
- Metadatos completos.
- Fundamentos de rendimiento.
- Fundamentos de accesibilidad (contraste, preferencias de movimiento).

### 5. Componentes técnicos a implementar

Referencias a lecciones específicas para:

- Animaciones CSS (transiciones, keyframes, scroll‑driven).
- Animaciones GSAP (para 2.º y 3.º grado).
- Técnicas tipográficas (tipografía fluida con `clamp()`).
- Tendencias de diseño (glassmorphism, parallax, dark mode, etc.).
- Patrones de componentes principales de las lecciones.
- Otros componentes que puedan proponerse como inspiración (el estudiantado cuenta con apoyo de IA —véase política de agentes—, del profesor y de sus compañeras, porque los sprints se trabajan en sesión).

### 6. Rúbrica de evaluación (Total: 100 puntos)

**Excelencia técnica (60 puntos):**

- Calidad de código y arquitectura (15 pts).
- Despliegue y configuración de repositorio (10 pts).
- Implementación de diseño responsive (15 pts).
- Animaciones e interactividad (10 pts).
- Semántica HTML y accesibilidad (10 pts).

**Diseño y factores humanos (40 puntos):**

- Estética visual y coherencia (12 pts).
- Creatividad y firma personal (12 pts).
- Narratividad y _storytelling_ (8 pts).
- Pragmatismo y usabilidad (8 pts).

### 7. Requisitos de entrega

- Crear tag de Git (`v1.0.0`).
- Crear GitHub Release asociado al tag.
- Auto‑indexarse en el repositorio de curso del profesor (tarea específica de un sprint).
- Verificar la URL en producción.

### 8. Plan de desarrollo en cinco sprints

**Sprint 1 (Semana 1): Base y configuración (1,5–2 horas)**

- Creación de repositorio e infraestructura inicial.
- Esqueleto HTML con estructura semántica.
- Configuración de arquitectura CSS (variables, reset).
- Despliegue inicial en GitHub Pages.
- Inicialización del README.

**Sprint 2 (Semana 2): Layout responsive y secciones clave (2–3 horas)**

- Implementar diseño responsive fluido/elástico.
- Construir secciones principales (hero, about, proyectos, contacto).
- Sistema tipográfico con `clamp()`.
- Media queries mobile‑first.
- Pruebas en distintos breakpoints.

**Sprint 3 (Semana 3): Animaciones e interactividad (2–4 horas)**

- Animaciones y transiciones CSS.
- Animaciones GSAP (para 2.º/3.º grado).
- Efectos ligados al scroll.
- Componentes interactivos (nav, cards, formularios).
- Accesibilidad del movimiento (`prefers-reduced-motion`).

**Sprint 4 (Semana 4): Identidad visual y pulido (2–3 horas)**

- Implementación de metadatos.
- Favicon e identidad visual.
- Página 404 personalizada.
- Implementación de tendencias (glassmorphism, parallax, etc.).
- Firma creativa personal.
- Auto‑indexación en el repositorio del curso.

**Sprint 5 (Semana 5): QA y entrega (1,5–2 horas)**

- Pasar la checklist completa.
- Formateo y linting de código.
- Pruebas cross‑browser.
- Optimización de rendimiento.
- Creación de tag y release.
- Documentación final en README.

### 9. Consideraciones por nivel

- Vanilla: foco en fundamentos y estructura limpia.
- Bootstrap: aprovechar patrones del framework y GSAP para animaciones avanzadas.
- Tailwind: arquitectura de componentes, routing SPA, optimización de build.

### 10. Recursos enlazados

Enlaces internos a lecciones:

- `/lessons/es/responsive/` (lección canónica de responsive).
- `/lessons/es/web-animations/css/`.
- `/lessons/es/web-animations/gsap/`.
- `/lessons/es/tipografia-color/`.
- `/lessons/es/modern-web-design-trends/`.
- `/lessons/es/metadata-visual-identity-web/`.
- `/lessons/es/linting-and-formatting/`.
- `/lessons/es/bootstrap/final-project-deployment/` (para 2.º grado).
- `/lessons/es/tailwind/build-deploy/` (para 3.º grado).

### 11. Toques de atelier

- Humor auto‑crítico sobre perfeccionismo vs. pragmatismo.
- Reconocer que las plantillas evolucionan (es una red que irás remendando y mejorando).
- Mensajes de ánimo sobre la mejora iterativa.
- Referencia al método «aprender haciendo».

## Notas de implementación

- Usar el layout `methodology` para aprovechar el TOC y el _branding_ del atelier.
- Tono profesional pero cercano y motivador.
- Instrucciones claras y accionables.
- Diferenciar con nitidez requisitos frente a recomendaciones.
- Incluir ejemplos de código donde ayuden a clarificar ideas.
- Comprobar que todos los enlaces a lecciones son relativos y correctos.


