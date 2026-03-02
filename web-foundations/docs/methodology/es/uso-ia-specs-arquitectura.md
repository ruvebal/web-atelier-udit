# Cómo usar la IA: requiere descripción de specs y arquitectura

**Nota breve:** Los asistentes de IA (Cursor, Copilot, etc.) rinden cuando el contexto es explícito. Sin especificaciones ni descripción de la arquitectura, las respuestas son genéricas, inconsistentes o desalineadas con tu proyecto.

---

## Regla de oro

> **La IA (y asistentes similares) necesita saber *qué* quieres y *cómo* está organizado el sistema.**  
> Especificaciones + arquitectura = respuestas útiles y coherentes.

---

## Qué aportar antes de pedir implementación

| Tipo | Para qué sirve | Dónde suele vivir |
|------|----------------|-------------------|
| **Specs / requisitos** | Qué debe hacer la feature, criterios de aceptación, restricciones | Plan de ejercicios, brief del proyecto, issue o ticket |
| **Arquitectura** | Estructura de carpetas, capas (UI, hooks, API), convenciones de nombres | README, documento de arquitectura, `project-brief.md` |
| **Contexto de archivos** | Estado actual del código que se va a tocar | Archivos que adjuntas o enlazas en el prompt |

Si no hay specs, la IA inventa requisitos. Si no hay arquitectura, puede proponer algo que no encaja con tu app.

---

## Práctica recomendada

1. **Escribir (o tener) un plan o brief** con:
   - Objetivo de la tarea
   - Requisitos numerados (qué debe cumplirse)
   - Criterios de aceptación (cómo comprobar que está bien)
   - Lección o documento asociado (para tono y convenciones)

2. **Indicar la arquitectura relevante** cuando afecte al cambio:
   - Dónde viven los hooks, componentes, estado
   - Si hay capa API, rutas, etc.
   - Convenciones (p. ej. "filtros derivados, no estado duplicado")

3. **Adjuntar o enlazar archivos de contexto** en lugar de pegar trozos sueltos:
   - Plan de ejercicios o brief
   - Archivos que se van a modificar
   - Ejemplos de "cómo hacemos esto aquí" (p. ej. otro hook o pantalla similar)

4. **Pedir que la respuesta respete el plan**: "Implementa según el plan en `docs/plan-ejercicios-react.md`, sección Fase X", "No inventes requisitos que no estén en el brief".

---

## Ejemplo de prompt que funciona bien

```text
Implementa la Fase 5 del plan ubicado en:
[camino al plan o @archivo]

TAREA: [resumen en una línea]

REQUISITOS:
1. [requisito 1]
2. [requisito 2]
…

ARQUITECTURA / CONTEXTO:
- Estado de búsqueda en App; lista filtrada derivada (no estado separado).
- Hook useDebounce en src/hooks/.

LECCIÓN ASOCIADA: [enlace a lección si aplica]

ENTREGABLE: [qué debe quedar hecho o documentado]
```

Así la IA recibe **specs** (requisitos y entregable) y **arquitectura** (dónde va cada cosa y convenciones).

---

## Relación con la metodología docs-first

Esta nota encaja con la [Guía práctica de desarrollo asistido por IA](ai-practical-guide/index.md):

- **Docs-first:** El plan o brief existe antes del prompt; la IA ejecuta sobre ese documento.
- **Archivos de contexto:** Ver [Ejemplo: metodología archivos de contexto](../../../../student-project-template/docs/ejemplo-contexto-archivos.md): adjuntar `project-brief.md`, planes y archivos a modificar en lugar de duplicar información en el prompt.
- **Informes de implementación:** Después de implementar, documentar qué se hizo y qué decisiones se tomaron ayuda a futuras iteraciones con la IA (y a quien revise el código).

---

## Resumen en una frase

**Usar la IA de forma efectiva = darle specs claros + descripción de la arquitectura (y, cuando aplique, archivos de contexto) en lugar de pedidos vagos.**
