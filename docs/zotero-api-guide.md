---
layout: default
title: 'Guía: Zotero API → Bibliografía Web (pipeline)'
lang: es
date: 2026-01-13
author: 'Rubén Vega Balbás, PhD'
---

# Guía: Zotero API → Bibliografía Web (pipeline)

## Objetivo

Automatizar una bibliografía “viva” a partir de Zotero (grupo) y publicarla en el sitio (Jekyll), manteniendo:

- Fuente única de verdad: Zotero
- Render web consistente
- Enlaces estables a items: `https://www.zotero.org/groups/5649080/ruvebal-web/items/ITEMKEY`

## 1) Datos necesarios

- **Group ID**: `5649080`
- **Group slug**: `ruvebal-web`
- **API base**: `https://api.zotero.org/groups/5649080/`

Opcional (si el grupo o colecciones no son públicas):

- **API key** (NO hardcodear en repo)

## 2) Qué conviene generar

Dos salidas típicas:

- `web-foundations/docs/bibliography/es/index.md`
  - Página “índice” estable
- `web-foundations/docs/bibliography/es/items.md` (o carpeta `items/`)
  - Listado detallado por tema/colección

## 3) Estrategia de mapeo

- Items “top-level” (libros/artículos) deben transformarse a un formato consistente:
  - `title`
  - `creators`
  - `date`
  - `publicationTitle` / `publisher`
  - `DOI` / `url`
  - `tags`
  - `collections`
  - `key` (para link Zotero item page)

Regla de enlace:

- Si existe `DOI` o `url` del publisher, enlazarlo como recurso externo.
- Siempre ofrecer también el enlace a Zotero item page:
  - `https://www.zotero.org/groups/5649080/ruvebal-web/items/<key>`

## 4) API calls recomendadas

- Listar items (paginado):
  - `GET https://api.zotero.org/groups/5649080/items?limit=100&start=0`
  - Repetir aumentando `start`.

- Solo items “top-level” (evitar adjuntos):
  - `GET .../items?itemType=-attachment&limit=100&start=0`

- Obtener colecciones:
  - `GET https://api.zotero.org/groups/5649080/collections?limit=100&start=0`

Notas:

- La API devuelve headers útiles (`Total-Results`, etc.).
- Puedes pedir JSON:
  - `Accept: application/json`

## 5) Implementación (propuesta)

### Opción A — Script Node (recomendado si ya hay tooling JS)

- Crear `scripts/zotero/` con:
  - `fetch-zotero-items.mjs`
  - `render-bibliography.mjs`

Output:

- Generar `.md` listo para Jekyll.

### Opción B — Script Python

- Crear `scripts/zotero/` con:
  - `fetch_zotero_items.py`
  - `render_bibliography.py`

## 6) CI / Build

- En GitHub Actions:
  - Paso 1: ejecutar script de fetch+render
  - Paso 2: commitear cambios generados (o subir como artefacto)
  - Paso 3: build Jekyll + deploy

Recomendación:

- Si hay API key, usar `secrets`.

## 7) Debug típico

- Items no aparecen:
  - revisar privacidad del grupo
  - revisar paginado
  - confirmar `itemType=-attachment`

- Duplicados:
  - agrupar por `key`

- Títulos raros:
  - usar `data.title` y normalizar whitespace

## 8) Próximo paso sugerido

- Implementar primero un **export mínimo**:
  - 20 items
  - 1 página `bibliography/es/index.md` con listado simple
- Iterar:
  - agrupar por tags/colecciones
  - generar página por tema
