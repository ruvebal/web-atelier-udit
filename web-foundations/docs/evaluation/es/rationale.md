---
layout: default
title: "Razonamiento de Evaluación Web Atelier"
lang: es
description: "Metodología, filosofía de calificación y bibliografía para todas las evaluaciones del Atelier."
---

# Razonamiento de Evaluación Web Atelier

> **Alcance:** Todas las evaluaciones del Web Atelier (quices, revisiones prácticas, defensas orales, crítica entre pares) en las cohortes en español e inglés.  
> **Responsable:** Comité de Currículo Web Atelier (UDIT)  
> **Última actualización:** 2026-01-02

---

## 1. Alineación metodológica

Las evaluaciones extienden el ciclo **Teoría → Práctica → Reflexión compartida** descrito en `/methodology/es/`:

| Pilar | Componentes evaluativos |
|-------|-------------------------|
| **Teoría** | Preguntas conceptuales basadas en las lecciones canónicas y la bibliografía anotada |
| **Práctica** | Evidencias en repositorios, tokens de diseño, despliegues, revisiones de código, demos |
| **Reflexión** | Ensayos, retrospectivas, reportes de uso de IA, feedback entre pares |

Se prioriza la **metacognición**: los estudiantes deben explicar sus decisiones y el impacto en su aprendizaje, no repetir definiciones.

---

## 2. Taxonomía de evaluación

| Dimensión | Descripción | Instrumentos |
|-----------|-------------|--------------|
| **Autoconocimiento** | Claridad sobre decisiones, trade-offs, próximos pasos | Ensayos, entrevistas, diarios reflexivos |
| **Excelencia técnica** | Calidad de código, accesibilidad, despliegue, rendimiento | Auditorías, rúbricas, pruebas automatizadas |
| **Dominio conceptual** | Comprensión de responsive, arquitectura CSS, JS módulos, ética | Quices, matching, defensas orales |
| **Comunidad y ética** | Documentación del uso de IA, atribución, inclusión | Reportes de workflow, auditorías de accesibilidad, peer review |

Las rúbricas se trazan a WCAG, principios de diseño inclusivo, ética ACM y la bibliografía del Atelier.

---

## 3. Tubo de activos bilingüe

1. **Fuente de verdad:** Bancos YAML por idioma alojados en un área privada para profesorado.  
2. **Transformadores:** `yaml-to-moodle-xml.js` (Moodle) y `yaml-to-qti.js` (IMS QTI 2.1).  
3. **Validación:** `xmllint` + suites IMS (hoja de ruta: QTI 3.0).  
4. **Distribución:** Solo se publican los paquetes finales dentro del LMS; los bancos originales permanecen reservados.

Así se pueden localizar preguntas, regenerar paquetes y mantener la documentación pública sin exponer el contenido evaluativo.

---

## 4. Filosofía de puntuación

- **Distribución:** Técnica (≈40%), Reflexión/Documentación (≈35%), Conceptos (≈25%).
- **Tiempo sugerido:** Ensayos 3–4 min, objetivas 1 min, buffer 5–10 min.
- **Evidencias obligatorias:** Commits, URLs de despliegue HTTPS, escaneos de accesibilidad, planes de IA (`docs/plan*.md`).

---

## 5. Bibliografía y referencias

Evaluaciones y rúbricas citan:

- **Pedagogía web:** Franchi & Vega (2024), aprendizaje experiencial de Kolb, literatura agile aplicada a educación.
- **Accesibilidad:** WCAG 2.1, Inclusive Design Principles, WAI-ARIA Authoring Practices.
- **Arquitectura CSS:** Design Tokens W3C, CUBE CSS, buenas prácticas publicadas.
- **Ética / IA:** Código ACM, recomendaciones UNESCO sobre IA, briefs internos del Atelier.

Consulte `/bibliography` y `/references` para el listado completo.

---

## 6. Notas para LMS

- **Moodle:** Importar XML en Banco de Preguntas → Moodle XML.
- **Blackboard Ultra:** Comprimir `examen-portafolio-auto-evaluacion-qti/` y usar "Import Content".
- **Canvas / Brightspace:** Usar QTI 2.1. Hoja de ruta: sumar exportador QTI 3.0.

Versionar YAML + paquetes garantiza reproducibilidad entre cursos.

---

## 7. Próximos pasos

- [ ] Exportador QTI 3.0 (XML + JSON).  
- [ ] Publicar rúbricas completas por dimensión.  
- [ ] Añadir scripts para exámenes orales y crítica entre pares.  
- [ ] Automatizar verificación de repositorios y despliegues.

---

*Este documento sirve como referencia general de evaluación para cualquier examen del Web Atelier. Consulte el hub de evaluación para enlaces y descargas actualizadas.*
