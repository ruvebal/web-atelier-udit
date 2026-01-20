---
layout: lesson
title: 'Deployment: enviar al mundo'
slug: react-deployment
category: react
tags: [react, deployment, vercel, cicd, github-actions]
week: 12
phase: 4
sprint: 13
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/react/react-deployment/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# 🚀 Deployment: enviar al mundo

> *"El código que no se despliega no existe. Envíalo."*

---

## 🎯 Objetivo del sprint

**Al finalizar este sprint**: tu app está en vivo en internet, desplegada automáticamente en cada push, con variables de entorno configuradas correctamente y un dominio custom (opcional).

---

## 📍 Posición en el viaje

| Sprint | Enfoque | Tu app crece |
|--------|-------|----------------|
| 11. Testing | Calidad | Codebase fiable |
| 12. Performance | Velocidad | Experiencia optimizada |
| **→ 13. Deployment** | Lanzamiento | En vivo en la web |
| 14. Presentación | Demo | Mostrar tu trabajo |

---

## 🧭 Objetivos de aprendizaje

Al final de esta lección:

- Construirás un bundle listo para producción con Vite
- Desplegarás a Vercel (o Netlify) desde GitHub
- Configurarás variables de entorno de forma segura
- Configurarás deploys automáticos en cada push
- Configurarás preview deployments para PRs
- (Opcional) Conectarás un dominio custom

---

## 🏗️ Arquitectura de deployment

```
┌─────────────────────────────────────────────────────────┐
│               TU PIPELINE DE DEPLOYMENT                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   [Repositorio GitHub]                                   │
│          │                                               │
│          ├──► Push a main ──► Deploy producción          │
│          │                                               │
│          └──► Pull Request ──► Preview deploy            │
│                                                          │
│   [Vercel/Netlify]                                       │
│          │                                               │
│          ├──► Build (npm run build)                      │
│          ├──► Test (opcional: npm run test)              │
│          └──► Deploy a red CDN edge                      │
│                                                          │
│   [Tu App] ← En vivo en myapp.vercel.app                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Conexiones backend

| Tu backend | Consideraciones de deployment |
|--------------|--------------------------|
| **Laravel API** | Configura `VITE_API_URL` a URL de API en producción |
| **Hygraph CMS** | Añade `VITE_HYGRAPH_URL` y token de auth |
| **Firebase** | Configura proyecto Firebase para producción |

### Variables de entorno

```bash
# .env.local (desarrollo - NO commitear)
VITE_API_URL=http://localhost:8000/api
VITE_HYGRAPH_URL=https://api-us-west.hygraph.com/v2/xxx/master

# Dashboard Vercel (producción - seguro)
VITE_API_URL=https://api.yourapp.com
VITE_HYGRAPH_URL=https://api-us-west.hygraph.com/v2/xxx/master
```

**⚠️ Importante**: prefijo `VITE_` = expuesto al navegador. ¡Nunca pongas secretos aquí!

---

## 🎓 Metodología: práctica atelier

### Ritmo del sprint

```
┌─────────────────────────────────────────────────────────┐
│ DÍA 1: Primer deployment                                │
│   • Build local: npm run build                          │
│   • Conectar repo GitHub a Vercel                       │
│   • ¡Deploy! Ver tu app en vivo por primera vez         │
├─────────────────────────────────────────────────────────┤
│ DÍA 2: Environment y CI                                 │
│   • Configurar variables de entorno en Vercel           │
│   • GitHub Actions para tests antes de deploy           │
│   • Probar preview deployments en un PR                 │
├─────────────────────────────────────────────────────────┤
│ DÍA 3: Pulir y compartir                                │
│   • Arreglar bugs solo en producción                    │
│   • README profesional con link en vivo                 │
│   • Compartir con compañeras, recibir feedback          │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Checklist de deployment

### Antes de desplegar

- [ ] Todos los tests pasan localmente
- [ ] Build exitoso: `npm run build`
- [ ] Sin errores de consola en build de producción
- [ ] Variables de entorno documentadas
- [ ] Datos sensibles NO en código ni env vars públicas

### Después de desplegar

- [ ] App carga correctamente en URL de producción
- [ ] Todas las rutas funcionan (probar deep links)
- [ ] Llamadas API llegan al backend correcto
- [ ] Flujo de auth funciona en producción
- [ ] Score Lighthouse aceptable

---

### Protocolo de desarrollo asistido por IA

| Tarea | Rol de la IA | Tu rol |
|------|---------|-----------|
| Depurar errores de build | Explicar el error | Arreglar y reintentar |
| Configurar env vars | Mostrar buenas prácticas | Aplicar a tu proyecto |
| Escribir GitHub Actions | Borrador de workflow | Personalizar para tu stack |
| Arreglar bugs de producción | Sugerir causas comunes | Depurar y desplegar fix |

---

## 📝 Entregables del sprint

- [ ] **URL en vivo** de tu app (p. ej., yourapp.vercel.app)
- [ ] **Deploys automáticos** en push a main
- [ ] **Preview deploys** habilitados para PRs
- [ ] **Variables de entorno** configuradas correctamente
- [ ] **GitHub Actions** ejecutando tests antes de deploy
- [ ] **README** con link en vivo y badge de deploy status
- [ ] **Reflexión**: ¿qué aprendiste sobre producción?

---

## 🛠️ Guía rápida de deployment

### Vercel (recomendado)

```bash
# 1. Instalar Vercel CLI (opcional)
npm i -g vercel

# 2. Deploy desde CLI
vercel

# O: conectar vía dashboard
# → vercel.com → Import Git Repository → Seleccionar repo → Deploy
```

### Netlify (alternativa)

```bash
# 1. Instalar Netlify CLI (opcional)
npm i -g netlify-cli

# 2. Deploy desde CLI
netlify deploy --prod

# O: conectar vía dashboard
# → app.netlify.com → Add new site → Import from Git
```

---

## 🔗 Navegación de la lección

| Anterior | Actual | Siguiente |
|----------|---------|------|
| [Performance](../react-performance/) | **Deployment** | [Resumen React](../) |

---

## 📚 Vista previa: conceptos clave

*Contenido completo pendiente. Temas incluidos:*

1. Proceso de build: qué produce Vite
2. Vercel/Netlify: cómo funcionan
3. Buenas prácticas de variables de entorno
4. Pipelines CI/CD con GitHub Actions
5. Preview deployments para colaboración en equipo
6. Dominios custom y SSL
7. Monitoreo y tracking de errores
8. Rollbacks y seguridad en deployment

---

> *"Despliega temprano, despliega a menudo. Cada deployment te enseña algo nuevo."*
