---
layout: lesson
title: 'Autenticación: asegurar tu aplicación'
slug: react-authentication
category: react
tags: [react, authentication, jwt, security, oauth]
week: 9
phase: 3
sprint: 10
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/react/react-authentication/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

> *"La autenticación es donde chocan seguridad, UX y arquitectura. Manéjala con cuidado."*

---

## 🎯 Objetivo del sprint

**Al finalizar este sprint**: implementar autenticación completa (login, logout, registro, rutas protegidas y sesiones persistentes) con buenas prácticas de seguridad.

---

## 📍 Posición en el viaje

| Sprint | Enfoque | Tu app crece |
|--------|-------|----------------|
| 8. Routing | Navegación | Estructura multipágina |
| 9. Backend | Data fetching | Datos reales, app real |
| **→ 10. Auth** | Seguridad | Sesiones de usuario |
| 11. Testing | Calidad | Codebase fiable |

---

## 🧭 Objetivos de aprendizaje

Al final de esta lección:

- Entenderás JWT vs autenticación basada en sesiones
- Construirás flujos de login, logout y registro
- Almacenarás tokens de forma segura (y sabrás qué NO es seguro)
- Implementarás AuthContext con estado de usuario
- Protegerás rutas en función del estado de auth
- Gestionarás refresh/expiración de tokens

---

## 🏗️ Qué construiremos este sprint

### Arquitectura de autenticación

```text
src/
├── auth/
│   ├── AuthContext.jsx      // Estado de usuario + login/logout
│   ├── AuthProvider.jsx     // Envuelve la app, comprueba token
│   ├── useAuth.js           // Hook consumidor
│   └── ProtectedRoute.jsx   // Guardia de ruta
├── pages/
│   ├── Login.jsx            // Formulario login
│   ├── Register.jsx         // Formulario registro
│   └── Profile.jsx          // Página protegida
└── api/
    └── auth.js              // Calls de API login/logout
```

---

## 🔧 Opciones de integración

### Opción A: Laravel Sanctum (recomendado para full‑stack)

```javascript
// Laravel Sanctum con cookies (CSRF protected)
await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
const response = await fetch('/api/login', {
  method: 'POST',
  credentials: 'include',
  body: JSON.stringify({ email, password })
});
```

### Opción B: JWT con Laravel API

```javascript
// Flujo JWT
const { token } = await login(email, password);
localStorage.setItem('token', token); // ⚠️ No ideal en producción

// Adjuntar a requests
headers: { 'Authorization': `Bearer ${token}` }
```

### Opción C: Firebase Auth (setup rápido)

```javascript
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);
const user = result.user;
```

### Opción D: Proveedores OAuth (GitHub, Google)

```javascript
// Flujo redirect
window.location.href = '/api/auth/github/redirect';
// El callback gestiona el intercambio de tokens
```

---

## ⚠️ Puntos críticos de seguridad

| ❌ No | ✅ Sí |
|----------|-------|
| Guardar JWT en `localStorage` | Usar cookies `httpOnly` |
| Confiar solo en auth cliente | Validar en servidor cada request |
| Loguear datos sensibles | Redactar tokens en logs |
| Hardcodear secretos | Variables de entorno |
| Saltarse HTTPS | Siempre HTTPS en producción |

---

## 🎓 Metodología: práctica atelier

### Ritmo del sprint

```
┌─────────────────────────────────────────────────────────┐
│ DÍA 1: Fundamentos de auth                               │
│   • Construir AuthProvider y hook useAuth                │
│   • Login con validación                                 │
│   • Probar flujo con Laravel o Firebase                  │
├─────────────────────────────────────────────────────────┤
│ DÍA 2: Completar el flujo                                │
│   • Registro con validación                              │
│   • ProtectedRoute conectado a AuthContext               │
│   • Logout y persistencia de sesión                      │
├─────────────────────────────────────────────────────────┤
│ DÍA 3: Revisión de seguridad                             │
│   • Auditoría peer: buscar vulnerabilidades              │
│   • Edge cases: token expirado, red caída                │
│   • Debate: ¿contra qué ataques proteges?                │
└─────────────────────────────────────────────────────────┘
```

### Protocolo de desarrollo asistido por IA

| Tarea | Rol de la IA | Tu rol |
|------|---------|-----------|
| Generar formularios de auth | Scaffold con validación | Integrar tus componentes UI |
| Depurar errores 401 | Explicar lifecycle del token | Arreglar refresh logic |
| Revisar seguridad | Sugerir mejoras | Implementar con comprensión |
| Edge cases | Proponer estados de error | Diseñar para confianza del usuario |

---

## 📝 Entregables del sprint

- [ ] **AuthContext** con user state, login, logout, register
- [ ] **Página login** con validación y manejo de errores
- [ ] **Página registro** con confirmación de contraseña
- [ ] **Rutas protegidas** redirigiendo no autenticados
- [ ] **Sesión persistente** (mantener login al refrescar)
- [ ] **Logout** que limpia el estado de auth
- [ ] **Checklist de seguridad** revisada con otro equipo
- [ ] **Reflexión**: ¿cuáles son los trade-offs de tu enfoque de auth?

---

## 🔗 Navegación de la lección

| Anterior | Actual | Siguiente |
|----------|---------|------|
| [Integración backend](../react-backend-integration/) | **Autenticación** | [Testing](../react-testing/) |

---

## 📚 Vista previa: conceptos clave

*Contenido completo pendiente. Temas incluidos:*

1. Autenticación vs autorización
2. JWT: estructura, claims, firma
3. Cookies de sesión vs tokens
4. OAuth 2.0 y OpenID Connect
5. CSRF, XSS y seguridad de tokens
6. Refresh tokens y silent auth
7. RBAC (Role-Based Access Control)
8. Estado de auth en React Context

---

> *"La confianza se gana en gotas y se pierde a cubos. El código de auth no es diferente."*
