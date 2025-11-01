---
layout: lesson
title: 'Tailwind CSS: Configuración y Fundamentos — Desarrollo PWA-Ready'
title_alt: 'Tailwind CSS: Setup & Fundamentals — PWA-Ready Development'
slug: tailwind-setup-fundamentals
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/tailwind/setup-and-fundamentals/
description: 'Guía completa para configurar Tailwind CSS con Vite para desarrollo PWA moderno, incluyendo fundamentos, pedagogía y scaffolding práctico.'
tags: [tailwindcss, vite, postcss, pwa, configuración, pedagogía]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Tailwind CSS: Configuración y Fundamentos — Desarrollo PWA-Ready

> **Divulgación de asistencia IA:** Esta lección se basa en experiencia docente desde septiembre 2024, con iteraciones de IA siguiendo ciclos investigación–práctica–investigación.

## 🎭 Enfoque de Codificación Crítica

Esta lección sigue la **metodología del atelier** (exploración → reflexión → conceptualización → producción → exhibición). Codificamos no para automatizar, sino para **articular** — dar forma al pensamiento mediante ritmo, reflexión y consistencia.

- **Exploración:** Experimentos prácticos de codificación guiados por teoría.
- **Reflexión:** Comprensión de lo que ocurre detrás del código.
- **Conceptualización:** Conexión del trabajo práctico con teoría y ética del diseño.
- **Producción:** Construcción de proyectos individuales con conciencia crítica.
- **Exhibición:** Publicación y discusión colectiva de resultados.

## Requisitos

<div class="prerequisites">
  <h3>📚 Antes de comenzar</h3>
  <ul>
    <li><strong>Node.js LTS (20+):</strong> Runtime JavaScript para herramientas</li>
    <li><strong>npm/npx:</strong> Gestor de paquetes y ejecutor (npx incluido desde npm v5.2+)</li>
    <li><strong>HTML/CSS básico:</strong> Marcado semántico y fundamentos de estilos</li>
    <li><strong>Línea de comandos:</strong> Familiaridad con terminal/comandos</li>
    <li><strong>Editor de texto:</strong> VS Code con extensión Live Server recomendado</li>
  </ul>
</div>

## 🚀 Desarrollo PWA-Ready: Por qué importa

Las **Progressive Web Apps (PWAs)** representan la convergencia entre experiencias web y nativas. A diferencia de sitios web tradicionales puramente server-rendered o SPAs básicas, las PWAs pueden:

- **Funcionar offline** mediante service workers
- **Instalarse en dispositivos** como apps nativas
- **Enviar notificaciones push** para engagement
- **Acceder a APIs de dispositivo** (cámara, GPS, etc.)
- **Proporcionar rendimiento app-like** con estrategias de caché

Nuestra configuración Tailwind + Vite crea una **base PWA-ready** que puede mejorarse con service workers, archivos manifest y estrategias de caché más adelante en el curso.

## S1 — Configuración y Fundamentos (Mobile-First, Utility-First)

Esta sesión introduce **utility-first CSS** como enfoque de sistema de diseño donde clases como `.bg-blue-500` o `.p-4` aplican estilos únicos directamente en el marcado. Esto contrasta con CSS tradicional donde escribes clases y selectores personalizados.

### Implementación paso a paso

1. **Instala Node.js LTS (20+)** y verifica: `node -v` (debe mostrar 20.x.x)

2. **Crea proyecto Vite:**

   ```bash
   npm create vite@latest portafolio-tailwind -- --template vanilla
   cd portafolio-tailwind
   npm install
   npm run dev
   ```

   Esto crea un proyecto moderno con servidor de desarrollo de Vite (típicamente `http://localhost:5173`).

3. **Instala Tailwind CSS:**

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. **Configura Tailwind:**

   ```javascript
   // tailwind.config.js
   /** @type {import('tailwindcss').Config} */
   export default {
   	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   	theme: {
   		extend: {},
   	},
   	plugins: [],
   };
   ```

5. **Habilita Tailwind en CSS:**

   ```css
   /* src/style.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

6. **Importa CSS en main.js:**

   ```javascript
   // src/main.js
   import './style.css';
   ```

7. **Construye sección hero con utilidades:**

   ```html
   <!-- index.html -->
   <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
   	<div class="container mx-auto px-4 py-8">
   		<header class="text-center">
   			<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Portafolio Moderno</h1>
   			<p class="text-xl md:text-2xl text-gray-600 mb-8">Construido con Tailwind CSS & Vite</p>
   			<a
   				href="#proyectos"
   				class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
   				Ver Proyectos
   			</a>
   		</header>
   	</div>
   </div>
   ```

8. **Prueba responsividad:** Redimensiona navegador o usa vista móvil en dev tools para ver comportamiento mobile-first.

9. **Haz commit de tu trabajo:**
   ```bash
   git add .
   git commit -m "feat: S1 - Configuración Vite + Tailwind; sección hero mobile-first"
   ```

## 🎓 Explicaciones Pedagógicas

### ¿Por qué Utility-First CSS?

**CSS tradicional** separa estilos del marcado, creando desafíos de mantenibilidad a medida que los proyectos escalan. Los enfoques utility-first como Tailwind **colocalizan** estilos con componentes, reduciendo tamaño de archivos CSS y mejorando experiencia de desarrollo.

**Contexto histórico:** El movimiento utility-first evolucionó de:

- **BASSCSS (2013):** Framework utility temprano
- **Tachyons (2014):** Popularizó clases utility inmutables
- **Tailwind (2017):** Hizo las utilidades accesibles con nombres intuitivos

**Ventajas clave:**

- **Bundles más pequeños:** Utilidades no usadas se purgan en producción
- **Desarrollo más rápido:** Sin cambio de contexto entre HTML/CSS
- **Diseño consistente:** Utilidades refuerzan restricciones del sistema de diseño
- **Responsive por defecto:** Mobile-first con variantes de breakpoints

**Posibles desventajas:**

- **Contaminación HTML:** Muchas clases pueden hacer el marcado más difícil de leer
- **Curva de aprendizaje:** Requiere entender composición de utilidades
- **Límites de personalización:** Personalización pesada puede requerir `@apply` o CSS personalizado

## Preguntas Críticas del Atelier

Siguiendo nuestra **metodología del atelier**, reflexiona sobre estas preguntas:

### Exploración

- ¿Qué aprendiste al componer con utilidades frente a escribir clases CSS personalizadas?
- ¿Cómo cambió el enfoque utility-first tu relación con el estilizado?

### Reflexión

- ¿Qué decisiones con utilidades mejoraron la legibilidad? ¿Cuáles la perjudicaron?
- ¿Cómo afecta la colocalización de estilos con marcado a la mantenibilidad?

### Conceptualización

- ¿Cómo se relaciona utility-first CSS con sistemas de diseño y tokens?
- ¿De qué maneras encarna este enfoque "diseño como código"?

### Producción

- ¿Qué comunica tu mensaje de commit a colaboradores futuros?
- ¿Cómo podría escalar este enfoque para equipos o proyectos más grandes?

### Exhibición

- ¿Cómo demostrarás el comportamiento responsive mobile-first en una presentación en vivo?
- ¿Qué enfoques alternativos de estilizado podrían lograr resultados similares?

## 🏗️ Scaffold Mínimo de Repositorio

Aquí tienes un punto de partida completo para tu proyecto Tailwind + Vite:

```
portafolio-tailwind/
├── index.html
├── src/
│   ├── main.js
│   └── style.css
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

**index.html:**

```html
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Portafolio Tailwind</title>
		<script type="module" src="/src/main.js"></script>
	</head>
	<body>
		<div class="min-h-screen bg-gray-50">
			<div class="container mx-auto px-4 py-8">
				<!-- Tu contenido aquí -->
			</div>
		</div>
	</body>
</html>
```

**src/main.js:**

```javascript
import './style.css';

// Opcional: Añade interactividad básica
document.addEventListener('DOMContentLoaded', () => {
	console.log('¡Portafolio Tailwind cargado!');
});
```

**src/style.css:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Estilos personalizados pueden ir aquí */
@layer base {
	body {
		font-family: system-ui, -apple-system, sans-serif;
	}
}
```

## Inicializa Git y conecta con GitHub (HTTPS)

Versiona tu proyecto y publícalo en GitHub usando HTTPS (sin SSH).

1. Inicializa el repo y crea un `.gitignore` básico

```bash
git init
printf "node_modules/\n.vite/\ndist/\n.env\n.DS_Store\n" >> .gitignore
```

2. Configura tu identidad de Git (una vez por máquina)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"
```

3. Primer commit

```bash
git add -A
git commit -m "chore: inicializa proyecto con Tailwind + Vite"
```

4. Crea un repo vacío en GitHub (interfaz web) y copia la URL HTTPS, por ejemplo:

```text
https://github.com/<tu-usuario>/<tu-repo>.git
```

5. Añade el remoto y haz push (usa un Personal Access Token cuando te lo pida)

```bash
git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
git branch -M main
git push -u origin main
```

Notas

- Si tienes 2FA, GitHub pedirá un Personal Access Token (classic) en lugar de contraseña: Settings → Developer settings → Personal access tokens → Generate new token (classic). Scope: repo.
- Para actualizar más adelante: `git add -A && git commit -m "feat: ..." && git push`.

## Referencias

- [MDN - Fundamentos de gestión de paquetes](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_tools/Package_management)
- [Vite - Despliegue de sitio estático](https://vite.dev/guide/static-deploy)
- [Tailwind CSS - Guía de instalación](https://tailwindcss.com/docs/installation)
- [FreeCodeCamp - npm vs npx](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/)
- [PostCSS - ¿Qué es PostCSS?](https://www.freecodecamp.org/news/what-is-postcss/)
- [Frameworks CSS utility-first](https://blog.logrocket.com/top-utility-first-css-frameworks/)

---

> **Siguiente:** [S2 - Ruteo SPA y Layout →]({{ '/lessons/es/tailwind/routing-and-shared-layout/' | relative_url }})
