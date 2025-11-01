---
layout: lesson
title: 'Inspiración & Inicio'
title_alt: 'Inspiration & Kickoff'
slug: inicio-inspiracion
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/inicio-inspiracion/
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## Objetivo de la sesión (2h)

- 1. Iniciar tu diario de inspiración y definir la dirección del proyecto.
- 2. Redactar la primera versión del brief (audiencia, tema, alcance).
- 3. Practicar accesibilidad por defecto y citar fuentes (ethos de critical coding).

---

## Requisito

Completa la lección anterior: Entorno de Desarrollo. Tu repo debe estar publicado en GitHub Pages y contener el scaffold de la plantilla de estudiante.

- Referencia de la plantilla del estudiante: https://github.com/ruvebal/web-atelier-udit/tree/main/student-project-template
- Archivos que editarás hoy:
  - `project-brief.md` (definición de proyecto)
  - `project-inspiration.md` (registro de inspiración)

---

## Resultados

Al final de la sesión tendrás:

- Un diario de inspiración documentado con fuentes y créditos de imágenes
- Un brief inicial (problema, audiencia, valores, criterios de éxito)
- Una pequeña galería o lista accesible en `index.html` con enlaces a inspiraciones
- Un commit calificado que evidencie el progreso (proceso sobre perfección)

---

## Paso 1 — Lee el brief y fija una dirección

Abre `project-brief.md` y completa estas secciones con frases breves y concretas:

- ¿Qué vas a construir? (1–2 frases)
- ¿Para quién? (audiencia principal, al menos una necesidad de accesibilidad)
- ¿Por qué importa? (valor, cuidado, bienestar, ética)
- Criterios de éxito (3–5 resultados medibles)

Consejo: Alinea con el lema “Critical Coding for a Better Living”. Elige un tema que beneficie a las personas, respete el tiempo/atención y sea inclusivo.

---

## Paso 2 — Crea tu diario de inspiración

Abre `project-inspiration.md` y añade:

- 5–8 enlaces a referencias de calidad (sitios, artículos, visuales)
- 1–2 moodboards ligeros (como listas/secciones o una pequeña galería)
- Notas sobre lenguaje visual (tipografía, color, ritmo, movimiento) y tono de voz

Buenas prácticas con imágenes:

- Prefiere imágenes pequeñas y optimizadas y añade `alt` significativo
- Añade pies con fuente y licencia; evita hotlinking de originales pesados
- CDN opcional: sube a ImageKit y usa transformaciones de ancho/calidad (`?tr=w-800,q-80`)

---

## Paso 3 — Accesibilidad por defecto (práctica ahora)

Aplica esto en tus páginas actuales:

- Asegura `<html lang="en">` y una jerarquía de encabezados lógica (un `<h1>`)
- Proporciona `alt` significativo o `alt=""` si la imagen es decorativa
- Mantén contraste ≥ 4.5:1 en texto; evita texto embebido en imágenes
- Asegura foco visible y navegable por teclado (enlaces, skip link)
- Escribe textos de enlace que tengan sentido fuera de contexto (no solo “aquí”)

---

## Paso 4 — Pequeño artefacto público

En `index.html`, añade una sección “Inspiración”:

- Una lista de 3–5 enlaces y por qué importan (1 línea)
- Opcional: mini galería (imágenes optimizadas con `alt` y créditos)

Manténlo simple; esto es un rastro público de tu pensamiento, no un diseño final.

---

## Commit y rúbrica

Commit obligatorio al final de clase:

```bash
git add .
git commit -m "feat: inicio de inspiración · brief v1 + créditos + a11y"
git push
```

Rúbrica rápida (0–2):

- 0 — Sin commit / faltan fuentes
- 1 — Commit presente pero a11y/créditos débiles
- 2 — Brief v1 claro, a11y aplicada, fuentes con créditos, pequeño artefacto público

---

## Lista de verificación (copia en tu PR/issue/notas)

- [ ] `project-brief.md` v1 completado
- [ ] `project-inspiration.md` con 5–8 fuentes y notas
- [ ] `index.html` incluye sección de inspiración
- [ ] Todas las imágenes tienen `alt` y créditos; los colores cumplen el contraste
- [ ] Commit subido; Pages actualizado

---

## Reflexión de Critical Coding

Escribe 3–5 frases en `project-brief.md` sobre cómo tu proyecto sirve a las personas (cuidado, acceso, soporte multilingüe), evita patrones extractivos y valora la atención sostenible. Vincula al menos una decisión a accesibilidad (ej.: tamaño tipográfico, contraste, reducción de movimiento).
