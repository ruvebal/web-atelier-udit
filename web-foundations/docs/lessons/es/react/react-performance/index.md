---
layout: lesson
title: 'Performance: la velocidad como feature'
slug: react-performance
category: react
tags: [react, performance, optimization, memoization, code-splitting]
week: 11
phase: 4
sprint: 12
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/react/react-performance/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> *"El rendimiento no es una optimización. Es una feature que los usuarios sienten."*

---

## 🎯 Objetivo del sprint

**Al finalizar este sprint**: tu app es rápida—tanto en rendimiento percibido (lo que sienten los usuarios) como en rendimiento real (lo que mide Lighthouse). Perfilarás, optimizarás y demostrarás la diferencia.

---

## 📍 Posición en el viaje

| Sprint | Enfoque | Tu app crece |
|--------|-------|----------------|
| 10. Auth | Seguridad | Sesiones de usuario |
| 11. Testing | Calidad | Codebase fiable |
| **→ 12. Performance** | Velocidad | Experiencia optimizada |
| 13. Deployment | Lanzamiento | En vivo en la web |

---

## 🧭 Objetivos de aprendizaje

Al final de esta lección:

- Usarás React DevTools Profiler para encontrar renders lentos
- Aplicarás `React.memo`, `useMemo` y `useCallback` correctamente
- Implementarás code splitting con `lazy()` y `Suspense`
- Optimizarás imágenes y assets
- Medirás Core Web Vitals y score de Lighthouse
- Entenderás cuándo NO optimizar

---

## 🏗️ Checklist de rendimiento

```
┌─────────────────────────────────────────────────────────┐
│              PRIORIDAD DE RENDIMIENTO                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. RENDIMIENTO PERCIBIDO (Lo que sienten los usuarios)  │
│     • Skeleton loading states                            │
│     • Optimistic updates                                 │
│     • Feedback visual inmediato                          │
│                                                          │
│  2. TAMAÑO DE BUNDLE (Lo que llega al navegador)         │
│     • Code splitting por ruta                            │
│     • Tree shaking (importa solo lo que usas)            │
│     • Analizar con bundle analyzer                       │
│                                                          │
│  3. RENDIMIENTO EN RUNTIME (Qué tan rápido corre)        │
│     • Minimizar re-renders innecesarios                  │
│     • Virtualizar listas largas                          │
│     • Debounce en operaciones costosas                   │
│                                                          │
│  4. ASSETS (Imágenes, fuentes, etc.)                     │
│     • Lazy load de imágenes                              │
│     • Formatos modernos (WebP, AVIF)                     │
│     • Optimizar carga de fuentes                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Técnicas de optimización

### Code splitting

```jsx
// Antes: todo en un bundle
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';

// Después: cargar bajo demanda
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

// Envolver con Suspense
<Suspense fallback={<PageSkeleton />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
</Suspense>
```

### Memoización (usar con moderación)

```javascript
// Solo memoiza cuando has DEMOSTRADO un problema de rendimiento

// Para cálculos costosos
const sortedItems = useMemo(
  () => items.sort((a, b) => a.price - b.price),
  [items]
);

// Para estabilidad de callbacks (cuando se pasan a hijos memoizados)
const handleClick = useCallback(
  () => setCount(c => c + 1),
  []
);

// Para re-renders de componentes
const MemoizedChild = React.memo(({ data }) => (
  <ExpensiveComponent data={data} />
));
```

---

## 🎓 Metodología: práctica atelier

### Ritmo del sprint

```
┌─────────────────────────────────────────────────────────┐
│ DÍA 1: Medir primero                                    │
│   • Ejecutar Lighthouse, registrar baseline             │
│   • Perfilar con React DevTools                         │
│   • Identificar top 3 problemas de rendimiento          │
├─────────────────────────────────────────────────────────┤
│ DÍA 2: Optimizar                                        │
│   • Code splitting para rutas                           │
│   • Lazy loading para imágenes                          │
│   • Memoización en cuellos de botella probados          │
├─────────────────────────────────────────────────────────┤
│ DÍA 3: Verificar y documentar                           │
│   • Re-ejecutar Lighthouse, comparar antes/después      │
│   • Documentar optimizaciones en README                 │
│   • Presentar: ¿qué funcionó? ¿qué fue prematuro?       │
└─────────────────────────────────────────────────────────┘
```

### La regla de oro

> **"Mide, luego optimiza. Nunca optimices solo por intuición."**

---

### Protocolo de desarrollo asistido por IA

| Tarea | Rol de la IA | Tu rol |
|------|---------|-----------|
| Analizar reporte Lighthouse | Explicar cada métrica | Priorizar arreglos |
| Sugerir optimizaciones | Proponer técnicas | Medir antes/después |
| Depurar problemas de rendimiento | Explicar ciclo de render | Aplicar solución correcta |
| Generar lazy imports | Scaffold de code splitting | Testear loading states |

---

## 📝 Entregables del sprint

- [ ] **Score Lighthouse baseline** documentado
- [ ] **Code splitting** para al menos 3 rutas
- [ ] **Optimización de imágenes** (lazy loading, tamaño correcto)
- [ ] **Memoización** aplicada a 1-2 cuellos de botella probados
- [ ] **Score Lighthouse final** (objetivo 90+ en performance)
- [ ] **Comparación antes/después** en README
- [ ] **Reflexión**: ¿cuál fue la mayor ganancia? ¿qué fue prematuro?

---

## 📊 Core Web Vitals

| Métrica | Qué mide | Objetivo |
|--------|------------------|--------|
| **LCP** (Largest Contentful Paint) | Velocidad de carga | < 2.5s |
| **FID** (First Input Delay) | Interactividad | < 100ms |
| **CLS** (Cumulative Layout Shift) | Estabilidad visual | < 0.1 |

---

## 🔗 Navegación de la lección

| Anterior | Actual | Siguiente |
|----------|---------|------|
| [Testing](../react-testing/) | **Performance** | [Deployment](../react-deployment/) |

---

## 📚 Vista previa: conceptos clave

*Contenido completo pendiente. Temas incluidos:*

1. Psicología del rendimiento
2. Chrome DevTools Performance Tab
3. React DevTools Profiler
4. Estrategias de code splitting
5. useMemo, useCallback, React.memo
6. Virtualización para listas
7. Optimización de imágenes
8. Core Web Vitals en profundidad

---

> *"El código más rápido es el que no se ejecuta. El componente más rápido es el que no re-renderiza."*
