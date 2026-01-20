---
layout: lesson
title: 'Arquitectura de estado: escalar más allá de los componentes'
slug: react-state-architecture
category: react
tags: [react, state, context, zustand, redux, useReducer]
week: 6
phase: 2
sprint: 7
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/react/react-state-architecture/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# 🏛️ Arquitectura de estado: escalar más allá de los componentes

> *"Cuando el estado crece más allá de un componente, la arquitectura se convierte en tu aliada o en tu enemiga."*

---

## 🎯 Objetivo del sprint

**Al finalizar este sprint**: implementar una arquitectura de estado escalable que permita que features de tu app se comuniquen (carrito, auth, tema, preferencias…).

---

## 📍 Posición en el viaje

| Sprint | Enfoque | Tu app crece |
|--------|---------|--------------|
| 5. Fundamentos | Componentes, JSX, Props | Esqueleto de librería de componentes |
| 6. Hooks | Estado y efectos | Componentes interactivos |
| **→ 7. Arquitectura** | Estado global | Features conectadas |
| 8. Routing | Navegación | Estructura multipágina |

---

## 🧭 Objetivos de aprendizaje

Al final de esta lección:

- Decidirás cuándo el estado local no es suficiente
- Implementarás `useReducer` para lógica de estado compleja
- Compartirás estado mediante React Context
- Integrarás Zustand para estado global ligero
- Entenderás patrones de Redux (a nivel conceptual)
- Estructurarás el estado por dominios

---

## 🏗️ Qué construiremos este sprint

### Dominios de estado para tu app

```typescript
// Organiza el estado por dominio:

src/
├── store/
│   ├── auth/           // Sesión de usuario, tokens
│   │   ├── AuthContext.tsx
│   │   └── useAuth.ts
│   ├── cart/           // Carrito (si aplica)
│   │   └── useCartStore.ts  // Zustand
│   ├── theme/          // Modo oscuro/claro
│   │   └── ThemeContext.tsx
│   └── ui/             // Modales, sidebars, toasts
│       └── useUIStore.ts
```

---

## 🔧 Puntos de integración

| Fuente de datos | Capa de estado |
|-------------|-------------|
| **Laravel API** | Tokens de auth en Context, datos en React Query (próximo sprint) |
| **Hygraph CMS** | Contenido cacheado con React Query, UI state local |
| **Local Storage** | Store persistido (tema, preferencias) con Zustand |

### Árbol de decisión de estado

```
¿Este estado...
│
├─→ ¿Lo usan 1-2 componentes cercanos?
│   └─→ useState + prop drilling ✓
│
├─→ ¿Es complejo y tiene muchas acciones?
│   └─→ useReducer ✓
│
├─→ ¿Lo necesitan componentes lejanos?
│   ├─→ ¿Pequeño/simple? → Context ✓
│   └─→ ¿Grande/complejo? → Zustand/Redux ✓
│
└─→ ¿Viene del servidor?
    └─→ React Query (próximo sprint) ✓
```

---

## 🎓 Metodología: práctica atelier

### Ritmo del sprint

```
┌─────────────────────────────────────────────────────────┐
│ DÍA 1: Context y reducers                                │
│   • Construir AuthContext juntas (login/logout/user)     │
│   • Refactor: de useState complejo a useReducer          │
│   • Debate: ¿cuándo lo local se vuelve global?           │
├─────────────────────────────────────────────────────────┤
│ DÍA 2: Taller de Zustand                                 │
│   • Live coding: store de carrito con Zustand            │
│   • Equipos: 1-2 stores según dominios de su app         │
│   • Práctica IA: generar acciones/selectors              │
├─────────────────────────────────────────────────────────┤
│ DÍA 3: Revisión de arquitectura                          │
│   • Cada equipo presenta su arquitectura de estado       │
│   • Crítica: ¿over-engineered? ¿insuficiente?            │
│   • Refactor según feedback                              │
└─────────────────────────────────────────────────────────┘
```

### Protocolo de desarrollo asistido por IA

| Tarea | Rol de la IA | Tu rol |
|------|---------|-----------|
| Diseñar la forma del estado | Proponer estructura | Evaluar para tu dominio |
| Generar acciones del reducer | Scaffold de switch | Garantizar inmutabilidad |
| Depurar re-renders en Context | Explicar el problema | Aplicar memoización |
| Comparar librerías | Listar pros/contras | Decidir para tu proyecto |

---

## 📝 Entregables del sprint

- [ ] **AuthContext** con estado login/logout/user
- [ ] **1 store Zustand** para una feature (carrito, preferencias, etc.)
- [ ] **useReducer** para al menos un componente complejo
- [ ] **Diagrama de arquitectura de estado** en README
- [ ] **Persistencia** en localStorage para al menos un store
- [ ] **Reflexión**: ¿qué patrones emergieron? ¿qué cambiarías?

---

## 🔗 Navegación de la lección

| Anterior | Actual | Siguiente |
|----------|---------|------|
| [Dominio de hooks](../react-hooks/) | **Arquitectura de estado** | [Routing](../react-routing/) |

---

## 📚 Vista previa: conceptos clave

*Contenido completo pendiente. Temas incluidos:*

1. Principio de localidad del estado
2. useReducer: Redux en miniatura
3. Context API en profundidad
4. Zustand: store moderno y ligero
5. Selectores y estado derivado
6. Estrategias de persistencia
7. Estado y TypeScript
8. Antipatrones comunes

---

> *"La mejor arquitectura es la más simple que resuelve tu problema. Ni más simple, ni más compleja."*
