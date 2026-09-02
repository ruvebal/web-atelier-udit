---
layout: lesson
title: 'Fundamentos de frameworks: una comparativa crítica'
slug: frameworks-comparative
category: react
tags: [react, vue, vanilla-js, frameworks, vite]
week: 2
phase: 1
sprint: 2
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/react/frameworks-comparative/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> *"Todos los codebases laten a tempos diferentes. Algunos en allegro, otros en adagio, otros en pánico."*
> — The Tao of Development
{: .tao-development-quote }

---

## Visión general del curso

| Aspecto | Detalles |
|--------|---------|
| **Duración** | 2 sesiones × 2 horas = 4 horas en total |
| **Metodología** | Atelier crítico: teoría + práctica + reflexión |

### Objetivos de aprendizaje

**Sesión 1**:

- Explicar qué son los frameworks y por qué existen
- Identificar características clave (componentes, reactividad)
- Aplicar criterios de selección según el tipo de proyecto
- Configurar el entorno con Vite

**Sesión 2**:

- Construir la misma app en Vanilla JS, React y Vue
- Comparar la experiencia de desarrollo entre stacks
- Tomar decisiones tecnológicas informadas basadas en evidencia

---

## Sesión 1: teoría y contexto

### 1.1 ¿Qué es un framework? (15 min)

Un **framework de front-end** aporta herramientas, patrones y convenciones para construir interfaces.

```
LIBRERÍA (React)              FRAMEWORK (Angular)
──────────────────            ────────────────────
Tú llamas a la librería.      El framework te llama a ti.
Tú decides la estructura.     La estructura ya viene dada.
Tú compones tu stack.         "Baterías incluidas".
```

#### El panorama

| Categoría | Ejemplos |
|----------|----------|
| **Frameworks completos** | Angular, Ember, Next.js |
| **Librerías UI** | React, Vue, Solid, Svelte |
| **Sin framework** | Vanilla JS, Alpine.js, htmx |

#### Evolución histórica

```
2005    jQuery: manipular el DOM fue más fácil
2013    React: modelo de componentes + Virtual DOM
2014    Vue: framework progresivo
2016    Angular 2+: TypeScript-first
2019    Svelte: reactividad en tiempo de compilación
2020+   Signals, Islands, Server Components...
```

---

### 1.2 Características clave de un framework (25 min)

#### 🧩 Arquitectura de componentes

```
              <App>
             /     \
        <Header>   <Main>
           │       /    \
        <Nav>   <List>  <Detail>
```

#### ⚡ Reactividad

Cuando los datos cambian, la UI se actualiza automáticamente—sin manipulación manual del DOM.

#### 🗺️ Routing

Navegar sin recargar la página completa (SPA).

#### 🗃️ Gestión de estado

| Patrón | Librería |
|---------|---------|
| Store centralizado | Redux, Vuex |
| Estado atómico | Recoil, Jotai |
| Basado en contexto | React Context |

---

### 1.3 Criterios para elegir framework (20 min)

| Factor | Preguntas a hacerse |
|--------|---------------------|
| **Tamaño del proyecto** | ¿Landing pequeña o SPA grande? |
| **Experiencia del equipo** | ¿Qué conoce ya el equipo? |
| **Ecosistema** | ¿Qué librerías/plugins necesitas? |
| **Mantenibilidad** | ¿Se incorporará gente nueva después? |

#### Guía rápida

| Caso de uso | Recomendación |
|----------|----------------|
| Sitios estáticos pequeños | Vanilla JS |
| Apps grandes, estado complejo | React |
| MVP rápido, aprendizaje | Vue |
| Enterprise, estructura completa | Angular |

> 🧘 **Koan**: *"Escribe código para humanos primero, para máquinas después."*

---

### 1.4 Demo: el mismo contador, tres maneras (30 min)

#### Vanilla JavaScript

```html
<button id="btn">
  Contador: <span id="count">0</span>
</button>
<script>
  let count = 0;
  document.getElementById('btn').addEventListener('click', () => {
    count++;
    document.getElementById('count').textContent = count;
  });
</script>
```

#### React

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Contador: {count}
    </button>
  );
}
```

#### Vue 3

```vue
<template>
  <button @click="count++">Contador: {{ count }}</button>
</template>
<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>
```

#### Comparación

| Criterio | Vanilla | React | Vue |
|-----------|---------|-------|-----|
| Requiere build | No | Sí | Sí |
| Curva de aprendizaje | Baja | Media | Baja‑Media |
| Ecosistema | Nativo | Masivo | En crecimiento |

---

### 1.5 Introducción a Vite (15 min)

**Vite** = build tool moderno y rápido.

```bash
# Crear proyecto
npm create vite@latest my-project -- --template react
cd my-project
npm install
npm run dev
```

**¿Por qué Vite?**

- Dev server casi instantáneo (<1s vs 30s+ con Webpack)
- Hot Module Replacement
- Configuración mínima

---

## Sesión 2: práctica comparativa

### 2.1 Estructura de rotación por equipos (10 min)

```
Equipos de 3, rotando roles:
• Implementadora: escribe código
• Integradora: revisa, testea
• Documentadora: README, notas

Sprint 1 (20 min): Vanilla JS
Sprint 2 (20 min): React
Sprint 3 (20 min): Vue
```

---

### 2.2 El reto: construir una To‑Do app (60 min)

#### Requisitos

- Añadir una tarea (input + botón)
- Mostrar lista de tareas
- Marcar tarea como completada (toggle)
- Borrar una tarea

#### Qué se ejercita

| Concepto | Cómo aparece |
|---------|--------------|
| Gestión de estado | La lista de tareas es estado |
| Input del usuario | Manejo de formularios |
| Renderizado de listas | Iterar sobre arrays |
| Operaciones CRUD | Create, Read, Update, Delete |

---

### 2.3 Presentación y reflexión (15 min)

Cada equipo presenta (3 min):

1. **Demo**: mostrar app funcionando
2. **Reto**: ¿cuál fue la parte más difícil?
3. **Comparación**: ¿qué stack se sintió más natural?

> 🧘 **Koan**: *"La experiencia es simplemente el nombre que damos a nuestros bugs después de arreglarlos."*

---

## Matriz de decisión de framework

| Criterio | Vanilla | React | Vue |
|-----------|---------|-------|-----|
| Tamaño del proyecto (1=pequeño) | 5 | 2 | 3 |
| Curva de aprendizaje (1=fácil) | 5 | 2 | 4 |
| Ecosistema (5=amplio) | 2 | 5 | 4 |
| Mantenimiento a largo plazo | 2 | 5 | 4 |

---

## Ideas clave

> **No existe el mejor framework: existe el framework más adecuado para tu contexto.**

| Si valoras... | Considera... |
|-----------------|-------------|
| Máximo control | Vanilla JS |
| Ecosistema masivo | React |
| Curva de aprendizaje suave | Vue |

---

## Referencias

- [React Documentation](https://react.dev)
- [Vue.js Documentation](https://vuejs.org)
- [Vite Documentation](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)

---

## 🔗 Navegación de la lección

| Anterior | Actual | Siguiente |
|----------|---------|------|
| [React (visión general)](../) | **Comparativa de frameworks** | [Estado e IU](../state-and-ui/) |

---

> *"La maestra desarrolladora no fuerza el scroll: canaliza su flujo."*
