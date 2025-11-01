---
layout: lesson
title: 'Tailwind CSS: Build y Deploy — PWA Lista para Producción'
title_alt: 'Tailwind CSS: Build & Deploy — Production-Ready PWA'
slug: tailwind-build-deploy
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/tailwind/build-deploy/
description: 'Guía completa para construir y desplegar aplicaciones Tailwind CSS, incluyendo características PWA, GitHub Pages y optimización de producción.'
tags: [tailwindcss, build, deploy, pwa, github-pages, pedagogía]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Tailwind CSS: Build y Deploy — PWA Lista para Producción

> **Divulgación de asistencia IA:** Esta lección se basa en experiencia docente desde septiembre 2024, con iteraciones de IA siguiendo ciclos investigación–práctica–investigación.

## 🎭 Enfoque de Codificación Crítica

Esta lección sigue la **metodología del atelier** (exploración → reflexión → conceptualización → producción → exhibición). Construimos no para automatizar, sino para **articular** — dar forma al pensamiento mediante ritmo, reflexión y resistencia.

- **Exploración:** Comprensión de procesos de build y estrategias de despliegue.
- **Reflexión:** Consideración de cómo el despliegue afecta experiencia de usuario y accesibilidad.
- **Conceptualización:** Conexión de optimización de build con sostenibilidad y ética.
- **Producción:** Creación de aplicaciones listas para producción con características PWA.
- **Exhibición:** Demostración de aplicaciones web pulidas y desplegables.

## Requisitos

<div class="prerequisites">
  <h3>📚 Antes de comenzar</h3>
  <ul>
    <li><strong>S1–S5 completadas:</strong> SPA Tailwind completa con componentes, estado y optimizaciones</li>
    <li><strong>Herramientas de build:</strong> Comprensión de scripts npm y bundling</li>
    <li><strong>Git y GitHub:</strong> Gestión de repositorios y configuración de GitHub Pages</li>
    <li><strong>Hosting estático:</strong> Experiencia con plataformas de despliegue</li>
  </ul>
</div>

## 🚀 Builds de Producción: De Desarrollo a Despliegue

Los **builds de producción** transforman código de desarrollo en aplicaciones optimizadas y desplegables. Las diferencias clave incluyen:

- **Optimización de bundle:** Minificación, tree-shaking y optimización de assets
- **Variables de entorno:** Configuraciones diferentes para dev vs. producción
- **Manejo de assets:** Nombres con hash, optimización CDN, carga lazy
- **Monitoreo de rendimiento:** Configuración de analytics y rastreo de errores

Nuestro enfoque crea **PWAs listas para producción** que pueden instalarse, funcionar offline y proporcionar experiencias app-like nativas.

## S6 — Build y Deploy (Producción, PWA, GitHub Pages)

Esta sesión se enfoca en construir bundles de producción optimizados y desplegar en plataformas de hosting estático.

### Implementación paso a paso

1. **Configura Vite para producción:**

   ```javascript
   // vite.config.js
   import { defineConfig } from 'vite';

   export default defineConfig({
   	base: process.env.NODE_ENV === 'production' ? '/nombre-de-tu-repo/' : '/',
   	build: {
   		outDir: 'dist',
   		assetsDir: 'assets',
   		sourcemap: false, // Deshabilitar para producción
   		minify: 'terser',
   		rollupOptions: {
   			output: {
   				manualChunks: {
   					vendor: ['react', 'react-dom'], // Si usas React
   				},
   			},
   		},
   	},
   });
   ```

2. **Añade manifest PWA:**

   ```html
   <!-- public/manifest.json -->
   { "name": "Portafolio Tailwind", "short_name": "Portafolio", "description": "Portafolio moderno construido con
   Tailwind CSS y Vite", "start_url": "/", "display": "standalone", "background_color": "#ffffff", "theme_color":
   "#3b82f6", "icons": [ { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" }, { "src":
   "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" } ] }
   ```

3. **Añade enlace de manifest a HTML:**

   ```html
   <!-- index.html -->
   <link rel="manifest" href="/manifest.json" />
   <meta name="theme-color" content="#3b82f6" />
   ```

4. **Construye para producción:**

   ```bash
   npm run build
   ```

5. **Verifica build de producción:**

   ```bash
   # Sirve carpeta dist localmente para testing
   npx serve dist

   # Comprueba que todos los assets carguen correctamente
   # Verifica que aparezca el prompt de instalación PWA
   # Prueba funcionalidad offline
   ```

6. **Configura GitHub Pages:**

   - Ve a configuración del repositorio → Pages
   - Selecciona "GitHub Actions" como fuente
   - Crea `.github/workflows/deploy.yml`

7. **Crea workflow de despliegue:**

   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages

   on:
    push:
     branches: [main]
    workflow_dispatch:

   permissions:
    contents: read
    pages: write
    id-token: write

   concurrency:
    group: 'pages'
    cancel-in-progress: false

   jobs:
    build:
     runs-on: ubuntu-latest
     steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
         node-version: '20'
         cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
         path: './dist'

    deploy:
     environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
     runs-on: ubuntu-latest
     needs: build
     steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
   ```

8. **Añade documentación de despliegue:**

   ````markdown
   <!-- README.md -->

   # Portafolio Tailwind

   Portafolio moderno construido con Tailwind CSS, Vite y JavaScript vanilla.

   ## Desarrollo

   ```bash
   npm install
   npm run dev
   ```
   ````

   ## Build y Deploy

   ```bash
   npm run build
   ```

   El sitio se despliega automáticamente a GitHub Pages vía GitHub Actions.

   ```

   ```

9. **Prueba características PWA:**

   - Instala la app desde el navegador
   - Prueba funcionalidad offline
   - Verifica registro de service worker
   - Comprueba propiedades del manifest de la app

10. **Haz commit de tu aplicación lista para producción:**
    ```bash
    git add .
    git commit -m "feat: S6 - Build de producción + características PWA + despliegue en GitHub Pages"
    ```

## 🎓 Explicaciones Pedagógicas

### Optimización de Build de Producción

El **proceso de build de Vite** transforma código de desarrollo en assets listos para producción:

**Análisis de bundle:**

- **Tree shaking:** Remueve código no utilizado
- **Code splitting:** Divide código en chunks más pequeños para carga más rápida
- **Optimización de assets:** Comprime y añade hash a archivos para caché

**Características PWA:**

- **Service workers:** Habilitan funcionalidad offline y sincronización en segundo plano
- **Web app manifest:** Define cómo aparece la app cuando se instala
- **Estrategias de caché:** Mejoran rendimiento y experiencia offline

### Consideraciones de Despliegue

El **hosting estático** proporciona distribución CDN global pero requiere configuraciones específicas:

**Específicos de GitHub Pages:**

- **Ruta base:** Debe coincidir con nombre de repositorio para despliegue en subruta
- **HTTPS:** Requerido para características PWA y APIs web modernas
- **Dominios personalizados:** Se pueden configurar para uso en producción

**Monitoreo de rendimiento:**

- **Core Web Vitals:** Rastreo de métricas de rendimiento real
- **Rastreo de errores:** Monitoreo de errores JavaScript e interacciones de usuario
- **Analytics:** Comprensión de comportamiento de usuario y métricas de conversión

## Preguntas Críticas del Atelier

Siguiendo nuestra **metodología del atelier**, reflexiona sobre estas preguntas:

### Exploración

- ¿Qué cambió más significativamente entre tus builds de desarrollo y producción?
- ¿Cómo reveló el proceso de despliegue problemas previamente no notados?

### Reflexión

- ¿Cómo afecta tu historia de despliegue y elección de hosting a usuarios finales?
- ¿Qué compromisos de rendimiento hiciste para optimización de producción?

### Conceptualización

- ¿Qué hace que un proyecto esté "listo" para mostrar a otros versus "listo" para usuarios?
- ¿Cómo se relaciona el proceso de build con sostenibilidad y mantenimiento de software?

### Producción

- ¿Es tu README claro y comprehensivo para colaboradores y mantenedores futuros?
- ¿Qué tan mantenible es tu configuración de build y despliegue?

### Exhibición

- ¿Qué narrativa presentarás con tu sitio desplegado en vivo?
- ¿Cómo invitarás crítica y demostrarás la evolución de S1 a S6?

## Preguntas Críticas

### Preguntas de Reflexión

- ¿Cómo cambia el proceso de build de Tailwind tu enfoque hacia código de producción?
- ¿Cuál es la relación entre experiencia de desarrollo y realidad de producción?
- ¿Cómo puede la codificación crítica moldear nuestra comprensión de despliegue y distribución de software?
- ¿Cómo representa tu aplicación desplegada tu trayectoria como desarrollador?

### Preguntas de Ética

- ¿Cuál infraestructura y labor habilitan el despliegue y hosting de tu aplicación?
- ¿Cómo afectan tus optimizaciones de build a usuarios con diferentes dispositivos y conexiones?
- ¿Qué ocurre cuando requisitos de despliegue chocan con necesidades de accesibilidad o rendimiento?

### Preguntas de Filosofía Técnica

- ¿Es la "optimización de build" más sobre rendimiento o sobre experiencia de desarrollador?
- ¿Cómo se relaciona el proceso build-deploy con conceptos como builds reproducibles?
- ¿Qué significa "desplegar responsablemente" en términos de impacto ambiental y social?

## 🏗️ Scaffold Mínimo de Repositorio

Aquí tienes un punto de partida completo para tu aplicación lista para producción:

```
portafolio-produccion/
├── index.html
├── public/
│   ├── manifest.json
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
├── src/
│   ├── main.js
│   ├── style.css
│   └── components/
└── .github/
    └── workflows/
        └── deploy.yml
```

**public/manifest.json:**

```json
{
	"name": "Portafolio Tailwind",
	"short_name": "Portafolio",
	"description": "Portafolio moderno construido con Tailwind CSS y Vite",
	"start_url": "/",
	"display": "standalone",
	"background_color": "#ffffff",
	"theme_color": "#3b82f6",
	"icons": [
		{
			"src": "/icons/icon-192.png",
			"sizes": "192x192",
			"type": "image/png"
		},
		{
			"src": "/icons/icon-512.png",
			"sizes": "512x512",
			"type": "image/png"
		}
	]
}
```

**vite.config.js:**

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/nombre-de-tu-repo/' : '/',
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
		sourcemap: false,
		minify: 'terser',
	},
});
```

**.github/workflows/deploy.yml:**

```yaml
name: Deploy to GitHub Pages

on:
 push:
  branches: [main]
 workflow_dispatch:

permissions:
 contents: read
 pages: write
 id-token: write

jobs:
 build:
  runs-on: ubuntu-latest
  steps:
   - name: Checkout
     uses: actions/checkout@v4

   - name: Setup Node
     uses: actions/setup-node@v4
     with:
      node-version: '20'
      cache: 'npm'

   - name: Install dependencies
     run: npm ci

   - name: Build
     run: npm run build

   - name: Setup Pages
     uses: actions/configure-pages@v4

   - name: Upload artifact
     uses: actions/upload-pages-artifact@v3
     with:
      path: './dist'

 deploy:
  environment:
   name: github-pages
   url: ${{ steps.deployment.outputs.page_url }}
  runs-on: ubuntu-latest
  needs: build
  steps:
   - name: Deploy to GitHub Pages
     id: deployment
     uses: actions/deploy-pages@v4
```

## Referencias

- [Vite - Configuración de build](https://vite.dev/config/build-options.html)
- [MDN - Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [GitHub Pages - Despliegue](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
- [Documentación PWA](https://web.dev/pwa/)

---

> **¡Felicitaciones!** Has completado la hoja de ruta completa de Tailwind CSS. Tu portafolio es ahora una PWA lista para producción desplegada en la web. 🎉
