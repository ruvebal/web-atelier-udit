---
layout: lesson
title: 'Routing y navegación: la SPA multipágina'
slug: react-routing
category: react
tags: [react, routing, react-router, navigation, spa]
week: 7
phase: 2
sprint: 8
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/react/react-routing/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> *"El routing es el arte de hacer que muchas páginas se sientan como una sola app."*

---

## 🎯 Objetivo del sprint

**Al finalizar este sprint**: transformar tu app en una experiencia multipágina completa con URLs limpias, rutas protegidas y navegación fluida, manteniendo el modelo de single‑page application.

---

## 📍 Posición en el viaje

| Sprint | Enfoque | Tu app crece |
|--------|---------|--------------|
| 5. Fundamentos | Componentes, JSX, Props | Esqueleto de librería de componentes |
| 6. Hooks | Estado y efectos | Componentes interactivos |
| 7. Arquitectura | Estado global | Features conectadas |
| **→ 8. Routing** | Navegación | Estructura multipágina |

---

## 🧭 Objetivos de aprendizaje

Al final de esta lección:

- Configurarás React Router v6 en tu proyecto
- Crearás rutas declarativas con `<Routes>` y `<Route>`
- Navegarás programáticamente con `useNavigate`
- Leerás parámetros con `useParams` y `useSearchParams`
- Implementarás rutas anidadas y layouts con `<Outlet>`
- Protegerás rutas basadas en el estado de autenticación

---

## 🏗️ Qué construiremos este sprint

### Estructura de rutas para tu app

```typescript
// Ejemplo de estructura de rutas:

<Routes>
  {/* Rutas públicas */}
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="products" element={<ProductList />} />
    <Route path="products/:id" element={<ProductDetail />} />
  </Route>

  {/* Rutas de autenticación */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Rutas protegidas */}
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/settings" element={<Settings />} />
  </Route>

  {/* Catch-all */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 🔧 Puntos de integración

| Fuente de datos | Integración con routing |
|-------------|---------------------|
| **Laravel API** | Rutas dinámicas desde API (p. ej., `/products/:slug`) |
| **Hygraph CMS** | Rutas basadas en contenido (posts, páginas) |
| **Estado de auth** | Rutas protegidas consultan AuthContext |

### La URL como estado

```typescript
// Filtros en la URL = estado compartible y marcable

// En lugar de:
const [filter, setFilter] = useState('all');

// Usa:
const [searchParams, setSearchParams] = useSearchParams();
const filter = searchParams.get('filter') || 'all';

// URL: /products?filter=electronics&sort=price
```

---

## 🎓 Metodología: práctica atelier

### Ritmo del sprint

```
┌─────────────────────────────────────────────────────────┐
│ DÍA 1: Routing básico                                   │
│   • Configurar React Router                             │
│   • Rutas públicas y layouts                            │
│   • Práctica: navegar entre páginas existentes          │
├─────────────────────────────────────────────────────────┤
│ DÍA 2: Rutas dinámicas y protegidas                      │
│   • Detalles con useParams                              │
│   • Wrapper ProtectedRoute                              │
│   • Conectar con AuthContext del sprint 7               │
├─────────────────────────────────────────────────────────┤
│ DÍA 3: Pulido y edge cases                               │
│   • Loading states durante navegación                    │
│   • 404 con una NotFound page cuidada                    │
│   • Test: deep‑link, bookmark, refresh                  │
└─────────────────────────────────────────────────────────┘
```

### Protocolo de desarrollo asistido por IA

| Tarea | Rol de la IA | Tu rol |
|------|---------|-----------|
| Generar estructura de rutas | Proponer según tu app | Verificar lógica de navegación |
| Implementar ProtectedRoute | Scaffold del wrapper | Testear edge cases (sin token, expirado) |
| Rutas anidadas | Mostrar patrón Outlet | Adaptarlo a tu estructura |
| Depurar navegación | Explicar pitfalls | Arreglar y testear |

---

## 📝 Entregables del sprint

- [ ] **5+ rutas** cubriendo páginas principales
- [ ] **Layout anidado** con header/footer compartidos
- [ ] **Ruta dinámica** con parámetro (p. ej., `:id`)
- [ ] **Ruta protegida** que requiere autenticación
- [ ] **Página 404** con navegación útil
- [ ] **Filtrado basado en URL** en al menos una lista
- [ ] **Reflexión**: ¿cómo cambia tu UX pensar la URL como estado?

---

## 🔗 Navegación de la lección

| Anterior | Actual | Siguiente |
|----------|---------|------|
| [Arquitectura de estado](../react-state-architecture/) | **Routing** | [Integración backend](../react-backend-integration/) |

---

## 📚 Vista previa: conceptos clave

*Contenido completo pendiente. Temas incluidos:*

1. SPA vs MPA: modelo mental
2. Fundamentos de React Router v6
3. Rutas dinámicas y useParams
4. Search params como estado
5. Rutas anidadas y layouts
6. Patrón de rutas protegidas
7. Navegación: links vs programática
8. Scroll restoration y transiciones

---

> *"Una URL es una promesa al usuario: esta dirección siempre mostrará este contenido."*
