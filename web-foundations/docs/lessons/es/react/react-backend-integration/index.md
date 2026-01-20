---
layout: lesson
title: 'Integración con backend: conectando con el mundo real'
slug: react-backend-integration
category: react
tags: [react, fetch, api, react-query, laravel, hygraph]
week: 8
phase: 3
sprint: 9
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/react/react-backend-integration/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> *"Un frontend sin backend es una pintura sin galería: hermosa, pero invisible."*

---

## 🎯 Objetivo del sprint

**Al finalizar este sprint**: tu app habla con fuentes de datos reales—obtiene, cachea y muta datos desde APIs de Laravel, Hygraph CMS u otros backends con patrones de nivel profesional.

---

## 📍 Posición en el viaje

| Sprint | Enfoque | Tu app crece |
|--------|-------|----------------|
| 7. Arquitectura | Estado global | Features conectadas |
| 8. Routing | Navegación | Estructura multipágina |
| **→ 9. Backend** | Data fetching | Datos reales, app real |
| 10. Auth | Seguridad | Sesiones de usuario |

---

## 🧭 Objetivos de aprendizaje

Al final de esta lección:

- Harás fetch de datos con Fetch API y async/await
- Gestionarás estados loading, error y empty de forma elegante
- Implementarás React Query para caché y sincronización
- Harás mutaciones (POST, PUT, DELETE) y optimistic updates
- Integrarás endpoints REST de Laravel
- (Opcional) Consultarás Hygraph GraphQL

---

## 🏗️ Qué construiremos este sprint

### Arquitectura de capa API

```typescript
// Separación limpia de responsabilidades:

src/
├── api/
│   ├── client.ts         // Wrapper de Axios o fetch
│   ├── endpoints.ts      // Constantes de URL
│   └── types.ts          // Tipos de respuesta
├── hooks/
│   ├── useProducts.ts    // React Query para productos
│   ├── useUser.ts        // React Query para usuario
│   └── useMutations.ts   // Create, update, delete
└── components/
    └── ProductList.tsx   // Usa useProducts
```

---

## 🔧 Opciones de integración

Elige una o más según tu proyecto:

### Opción A: Laravel REST API

```typescript
// Endpoints típicos en Laravel
const API = {
  products: '/api/products',
  product: (id: string) => `/api/products/${id}`,
  auth: '/api/auth/login',
  user: '/api/user',
};

// Uso con React Query
const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: () => fetch(API.products).then(r => r.json())
});
```

### Opción B: Hygraph GraphQL

```typescript
// Query GraphQL
const PRODUCTS_QUERY = `
  query Products {
    products {
      id
      name
      price
      image { url }
    }
  }
`;

// Fetch desde Hygraph
const { data } = useQuery({
  queryKey: ['products'],
  queryFn: () => hygraphClient.request(PRODUCTS_QUERY)
});
```

### Opción C: JSON local / Mock API

```typescript
// Para desarrollo sin backend
const { data } = useQuery({
  queryKey: ['products'],
  queryFn: () => import('./data/products.json')
});
```

---

## 🎓 Metodología: práctica atelier

### Ritmo del sprint

```
┌─────────────────────────────────────────────────────────┐
│ DÍA 1: Fundamentos de fetching                           │
│   • Configurar cliente API (Axios o wrapper fetch)       │
│   • Patrón básico useQuery con React Query               │
│   • Estados loading/error en UI                          │
├─────────────────────────────────────────────────────────┤
│ DÍA 2: Mutations y datos reales                          │
│   • Conectar con Laravel (coordinar con backend)         │
│   • useMutation para create/update/delete                │
│   • Optimistic updates para UX ágil                      │
├─────────────────────────────────────────────────────────┤
│ DÍA 3: Caché y edge cases                                │
│   • Configurar cacheTime y stale-while-revalidate        │
│   • Gestionar offline (opcional)                         │
│   • Error boundaries para requests fallidos              │
└─────────────────────────────────────────────────────────┘
```

### Protocolo de desarrollo asistido por IA

| Tarea | Rol de la IA | Tu rol |
|------|---------|-----------|
| Depurar errores API | Explicar CORS, 401, 500 | Ajustar config y reintentar |
| Generar tipos API | Inferir desde JSON | Validar y refinar |
| Diseñar loading states | Proponer skeleton/spinner | Encajar en tu design system |
| Optimizar queries | Proponer estrategia de caché | Probar invalidación |

---

## 📝 Entregables del sprint

- [ ] **Cliente API** con base URL y headers de auth
- [ ] **3+ hooks** de fetching con React Query
- [ ] **Loading states** (skeletons o spinners)
- [ ] **Manejo de errores** con mensajes orientados a usuario
- [ ] **1 mutation** (create/update/delete)
- [ ] **Invalidación de caché** tras mutaciones
- [ ] **Reflexión**: ¿cómo cambia tu app trabajar con datos async?

---

## 🔗 Navegación de la lección

| Anterior | Actual | Siguiente |
|----------|---------|------|
| [Routing](../react-routing/) | **Integración backend** | [Autenticación](../react-authentication/) |

---

## 📚 Vista previa: conceptos clave

*Contenido completo pendiente. Temas incluidos:*

1. Repaso Async/Await y Promises
2. Fetch API vs Axios
3. React Query: patrones esenciales
4. Estrategias de caché
5. Mutations y optimistic updates
6. Error boundaries para async
7. GraphQL con Apollo o urql (opcional)
8. Type safety con respuestas API

---

> *"Los datos reales son desordenados. Tu trabajo es hacer que se sientan limpios."*
