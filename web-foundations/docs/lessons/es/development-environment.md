---
layout: lesson
title: Entorno de Desarrollo
title_en: Development Environment
author: 'Rubén Vega Balbás, PhD'
lang: es
slug: development-environment
date: 2025-01-15T00:00:00.000Z
---

# Configuración del Entorno de Desarrollo

En esta lección aprenderás a configurar tu entorno de desarrollo para el curso WEB ATELIER (UDIT).

## Herramientas Necesarias

### 1. Editor de Código

- **Visual Studio Code** (recomendado)
- **Sublime Text**
- **Atom** (descontinuado, pero aún funcional)

### 2. Control de Versiones

- **Git** - Sistema de control de versiones
- **GitHub** - Plataforma de alojamiento de código

### 3. Navegador Web

- **Firefox Developer Edition** (recomendado para desarrollo)
- **Chrome DevTools**
- **Safari** (para pruebas en macOS)

## Configuración de GitHub

### Crear una Cuenta

1. Ve a [github.com](https://github.com)
2. Crea una cuenta con tu email de UDIT
3. Verifica tu email

### Configurar Git Localmente

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@udit.es"
```

### Generar Clave SSH (Opcional pero Recomendado)

```bash
ssh-keygen -t ed25519 -C "tu-email@udit.es"
```

## Extensiones Recomendadas para VS Code

- **Live Server** - Servidor local para desarrollo
- **HTML CSS Support** - Autocompletado mejorado
- **Prettier** - Formateo automático de código
- **GitLens** - Mejoras para Git
- **axe Accessibility Linter** - Verificación de accesibilidad

## Estructura de Proyecto

Tu proyecto seguirá esta estructura:

```
mi-proyecto-web/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── images/
├── project.yaml
├── project-brief.md
└── README.md
```

## Flujo de Trabajo Semanal

1. **Clonar/Actualizar** tu repositorio
2. **Trabajar** en los cambios de la semana
3. **Probar** localmente con Live Server
4. **Commit** con mensaje descriptivo
5. **Push** a GitHub
6. **Verificar** el sitio en GitHub Pages

## Comandos Git Básicos

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/tu-proyecto.git

# Ver estado
git status

# Añadir cambios
git add .

# Hacer commit
git commit -m "Descripción del cambio"

# Subir cambios
git push origin main
```

## Próximos Pasos

En la siguiente clase comenzaremos con HTML semántico y la estructura básica de tu proyecto personal.
