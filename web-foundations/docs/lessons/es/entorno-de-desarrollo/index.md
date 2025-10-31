---
layout: lesson
title: 'Guía para Configurar un Entorno de Desarrollo Web'
slug: entorno-de-desarrollo
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/entorno-de-desarrollo/
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## Objetivos

- **Configurar herramientas básicas**: Tener VS Code + Git operativos con extensiones esenciales.
- **Crear repositorio personal**: Establecer un repositorio en GitHub con estructura profesional.
- **Publicar sitio web**: Desplegar un "Hello, Web" funcional en GitHub Pages.
- **Optimizar imágenes**: Configurar ImageKit.io para servir imágenes optimizadas via CDN.
- **Probar Node.js** (opcional): Ejecutar scripts npm en el template estudiantil.
- **Establecer flujo diario**: Dominar el ciclo pull → edit → commit → push.

> **ATELIER Note:** cada estudiante realizará **commits incrementales** con mensajes descriptivos y mantendrá un `README.md` actualizado. Los commits serán evidencia del progreso y aprendizaje de la sesión.

---

## Por qué configurar un entorno de desarrollo

Configurar un entorno de desarrollo permite a los estudiantes:

1. **Desarrollar localmente**: Escribir y probar proyectos web en tu ordenador utilizando herramientas como **VS Code Live Server**.
2. **Colaborar**: Compartir tu trabajo con compañeros e instructores usando Git y GitHub.
3. **Publicar Live**: Subir tus proyectos en línea para recibir retroalimentación o mostrar tu trabajo a través de GitHub Pages.

Aprender este flujo de trabajo ayuda a adoptar prácticas profesionales y sentar las bases para proyectos más avanzados en el futuro.

---

## Entornos de desarrollo: Local vs Live

### 1. Desarrollo local

- **Qué es**: El desarrollo local se realiza en tu ordenador, donde escribes y pruebas código utilizando herramientas como **VS Code** y previsualizas el proyecto en tu navegador con **Live Server**.
- **Propósito**: Permite experimentar y realizar cambios rápidos sin afectar la versión pública de tu proyecto.

### 2. Desarrollo Live

- **Qué es**: El desarrollo Live implica subir tu código a un **repositorio remoto** (por ejemplo, GitHub). GitHub Pages hace que tu sitio sea accesible en línea.
- **Propósito**: Compartir y mostrar tu proyecto, colaborar con otros y construir un portafolio profesional.

---

## Pasos para configurar el entorno de desarrollo

### 1. Instalar Visual Studio Code

- **Propósito**: VS Code es un editor de código potente con integración incorporada con Git.
- Descárgalo aquí:  
  **https://code.visualstudio.com/**

#### Instalar extensiones

- **Live Server**: Para previsualizar en tiempo real tus proyectos HTML/CSS/JS.  
  Instálalo aquí:  
  **https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer**
- **GitLens**: Mejora la experiencia de Git mostrando el historial de commits y anotaciones de cambios.  
  Instálalo aquí:  
  **https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens**

---

### 2. Instalar Git

---

#### Instalación en Windows

1. **Descarga el instalador de Git:**  
   [https://git-scm.com/download/win](https://git-scm.com/download/win)

2. **Ejecuta el instalador:**

   - Haz clic en el archivo descargado y sigue las instrucciones del asistente de instalación.
   - Durante la instalación, se recomienda seleccionar **Git Bash** como terminal predeterminada.

3. **Verifica la instalación:**

   - Abre **Git Bash** desde el menú de inicio.
   - Escribe el siguiente comando para confirmar la instalación:
     ```bash
     git --version
     ```

4. **Configura tu nombre y email para Git:**  
   Después de instalar Git, es importante configurar tu identidad para registrar correctamente tus contribuciones.

   - **Configura tu nombre:**  
     Ejecuta este comando, reemplazando `Tu Nombre` por tu nombre real:

     ```bash
     git config --global user.name "Tu Nombre"
     ```

   - **Configura tu email:**  
     Ejecuta este comando, reemplazando `tu.email@example.com` por tu dirección de correo electrónico:

     ```bash
     git config --global user.email "tu.email@example.com"
     ```

   - **Verifica la configuración:**  
     Ejecuta el siguiente comando para comprobar que los datos se guardaron correctamente:
     ```bash
     git config --global --list
     ```
     El resultado debería mostrar algo similar a:
     ```
     user.name=Tu Nombre
     user.email=tu.email@example.com
     ```

5. **Nota importante:**
   - Durante la instalación y uso de Git en la terminal, tu contraseña no será visible al escribirla. Esto es un comportamiento normal para mejorar la seguridad.

---

#### Instalación en macOS

1. **Instala Homebrew (si no lo tienes):**

   - Abre la **Terminal** y ejecuta el siguiente comando para instalar Homebrew:
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Homebrew es un gestor de paquetes que facilita la instalación de software en macOS.
   - Al instalar Homebrew, se descargarán automáticamente las **Xcode Command Line Tools**, lo cual puede tardar varios minutos.

2. **Instala Git usando Homebrew:**

   - Una vez instalado Homebrew, ejecuta:
     ```bash
     brew install git
     ```

3. **Verifica la instalación:**

   - Escribe el siguiente comando para comprobar que Git se ha instalado correctamente:
     ```bash
     git --version
     ```

4. **Configura tu nombre y email para Git:**

   - **Configura tu nombre:**

     ```bash
     git config --global user.name "Tu Nombre"
     ```

   - **Configura tu email:**

     ```bash
     git config --global user.email "tu.email@example.com"
     ```

   - **Verifica la configuración:**
     ```bash
     git config --global --list
     ```

---

### 3. Iniciar desde la Plantilla de Proyecto del Estudiante (fácil primero, avanzado abajo)

Usa la plantilla oficial del estudiante en el monorepo del curso: `student-project-template`. Referencia:

- Plantilla del estudiante (GitHub): https://github.com/ruvebal/web-atelier-udit/tree/main/student-project-template

#### Principiante — Descargar ZIP en el navegador (Windows/macOS)

1. Entra al repo, botón verde "Code" → "Download ZIP".
2. Descomprime. Dentro, localiza `student-project-template/`.
3. Copia el contenido de `student-project-template/` a una carpeta nueva con el nombre de tu proyecto (ej.: `mi-proyecto-web`).
4. Crea un repositorio vacío en GitHub (mismo nombre).
5. Inicializa y sube:

```bash
cd mi-proyecto-web
git init
git add .
git commit -m "chore: scaffold desde student-project-template"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/mi-proyecto-web.git
git push -u origin main
```

#### Principiante — GitHub Desktop (GUI Windows/macOS)

1. Instala GitHub Desktop e inicia sesión.
2. File → Clone repository → URL: `https://github.com/ruvebal/web-atelier-udit` → elige ruta local.
3. En Finder/Explorer, copia `student-project-template/` a una ubicación nueva llamada `mi-proyecto-web`.
4. GitHub Desktop: File → Add local repository → selecciona `mi-proyecto-web`.
5. "Publish repository" para crearlo en tu cuenta y hacer push.

---

#### Avanzado — VS Code (Clone) y opciones CLI

- VS Code (intermedio): Source Control → "Clone Repository" → pega `https://github.com/ruvebal/web-atelier-udit` → luego copia `student-project-template/` a su propia carpeta de repo.
- CLI (Node):

```bash
# Usar tiged para traer solo el subdirectorio
npx tiged ruvebal/web-atelier-udit/student-project-template mi-proyecto-web
```

- CLI (sin Node):

```bash
svn export https://github.com/ruvebal/web-atelier-udit/trunk/student-project-template mi-proyecto-web
```

Después, `git init`, commit y push a tu nuevo repositorio.

---

### 4. Explorar la estructura del directorio clonado

Tras generar desde la plantilla, deberías ver esta estructura:

```plaintext
student-project-template/
├── index.html                 # Página inicial semántica
├── assets/
│   ├── css/
│   │   └── style.css          # Estilos responsivos y accesibles
│   └── js/
│       └── main.js            # Interacciones básicas
├── images/                    # Imágenes locales (o usar ImageKit)
├── css/style.css              # Compatibilidad: importa assets/css/style.css
├── project.yaml               # Metadatos del proyecto (completar Semana 4)
├── project-brief.md           # Concepto de proyecto (Semana 2)
└── .github/workflows/critical.yml  # CI opcional
```

Siguientes pasos:

- Abre `index.html` y ajusta título y descripción del proyecto.
- Abre `project.yaml` y completa handle, URLs y títulos (ES/EN).
- Abre `project-brief.md` y completa el brief de la Semana 2.
- Ejecuta `npm install` y luego `npm run dev` si quieres servidor en vivo (opcional, avanzado).

---

### 5. Desarrollo local con Live Server

1. Abre tu proyecto en VS Code.
2. Haz clic derecho en el archivo `index.html` y selecciona **Open with Live Server**.
3. Abre el navegador y navega a `http://127.0.0.1:5500`.

#### Usar las DevTools de Chrome

1. Pulsa **F12** o **Cmd + Option + I** (Mac) / **Ctrl + Shift + I** (Windows) para abrir las DevTools.
2. Ve a la pestaña **Network**.
3. Marca la opción **Disable Cache** para asegurarte de que el navegador siempre cargue la versión más reciente de tu proyecto.
4. Observa los cambios en tiempo real mientras actualizas tu código.

5. Abre tu proyecto en VS Code.
6. Haz clic derecho en el archivo `index.html` y selecciona **Open with Live Server**.
7. Abre el navegador y navega a `http://127.0.0.1:5500`.

---

### 6. Desarrollo Live con GitHub Pages

1. Haz un **commit** de los cambios:

   - En la pestaña **Source Control**, selecciona los archivos y haz clic en el botón `+`.
   - Escribe un mensaje de commit (por ejemplo, "Initial commit") y haz clic en el check.

2. **Push** los cambios al repositorio remoto:

   - Haz clic en **Sync Changes**.

   **Comandos equivalentes**:

   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

3. Activa GitHub Pages:
   - En GitHub, ve a **Settings** > **Pages**.
   - En **Build and deployment → Source**, elige **Deploy from a branch**.
   - En **Branch**, selecciona **main** y la carpeta **/ (root)**.
   - Haz clic en **Save**.
   - Tu sitio estará en vivo en: `https://tu-usuario.github.io/tu-repositorio/`.

### 7. Crear cuenta y configurar ImageKit.io

- Crea una cuenta gratuita en `https://imagekit.io/`.
- En el panel, anota:
  - Public Key, Private Key (no la compartas), URL Endpoint (p. ej., `https://ik.imagekit.io/<tu_id>/`).
- Crea una carpeta `images/` en tu repo y sube algunas imágenes de prueba a ImageKit.
- Añade tu dominio de desarrollo (p. ej., `http://127.0.0.1:5500`) en ImageKit → URL Endpoints → Allowed Origins.

#### ¿Por qué usar ImageKit (o un CDN de imágenes)?

- Optimiza y sirve imágenes a diferentes tamaños/formats (WebP/AVIF) según dispositivo.
- Transforma por URL (ancho, calidad, recortes) sin re-exportar archivos.
- Entrega rápida desde CDN global.

#### API Básica (media)

- Una API (Interfaz de Programación) permite pedir/gestionar recursos (como imágenes) de forma estructurada.
- En ImageKit, puedes:
  - Usar su **API de URL** (solo cliente) para transformar imágenes con parámetros.
  - Usar su **REST API** (servidor) para subir/listar/borrar. Para este curso, usa solo URL API en cliente.

Ejemplo de URL con transformaciones:

```html
<img
	src="https://ik.imagekit.io/mi_cuenta/foto.jpg?tr=w-800,q-60"
	srcset="
		https://ik.imagekit.io/mi_cuenta/foto.jpg?tr=w-400,q-60   400w,
		https://ik.imagekit.io/mi_cuenta/foto.jpg?tr=w-800,q-60   800w,
		https://ik.imagekit.io/mi_cuenta/foto.jpg?tr=w-1200,q-60 1200w
	"
	sizes="(max-width: 600px) 100vw, 600px"
	alt="Retrato natural con iluminación suave" />
```

Claves de accesibilidad:

- Escribe `alt` descriptivo y específico del contenido (no: "imagen1").
- Evita texto incrustado en la imagen; si existe, repítelo en el `alt`.
- Asegura suficiente contraste si hay texto superpuesto.

---

### 8. Alojar y optimizar imágenes con ImageKit.io

Las imágenes grandes no deben vivir en tu repositorio Git. Usa un CDN para optimizar su entrega.

1. Crea una cuenta y una librería en ImageKit.io.
2. Anota tu URL Endpoint (ej.): `https://ik.imagekit.io/tu_id`
3. Sube imágenes a carpetas (ej.: `portfolio/hero.jpg`).
4. Usa transformaciones automáticas en tu HTML para entregar tamaños optimizados:

```html
<!-- 800px de ancho, calidad 80 -->
<img
	src="https://ik.imagekit.io/tu_id/portfolio/hero.jpg?tr=w-800,q-80"
	alt="Imagen principal del proyecto"
	width="800"
	height="auto" />
```

Ejemplo responsivo con `srcset`:

```html
<img
	src="https://ik.imagekit.io/tu_id/portfolio/hero.jpg?tr=w-800,q-80"
	srcset="
		https://ik.imagekit.io/tu_id/portfolio/hero.jpg?tr=w-400,q-80   400w,
		https://ik.imagekit.io/tu_id/portfolio/hero.jpg?tr=w-800,q-80   800w,
		https://ik.imagekit.io/tu_id/portfolio/hero.jpg?tr=w-1200,q-80 1200w
	"
	sizes="(max-width: 600px) 100vw, 800px"
	alt="Imagen principal responsiva" />
```

Imagen de fondo en CSS:

```css
.hero {
	background-image: url('https://ik.imagekit.io/tu_id/portfolio/texture.png?tr=w-1600,q-70');
	background-size: cover;
	background-position: center;
}
```

Notas de accesibilidad:

- Proporciona siempre `alt` significativo (o `alt=""` solo si es decorativa).
- Prefiere formatos modernos (AVIF/WEBP) cuando estén disponibles: `?tr=f-webp`.
- Deja `/images` local solo para assets pequeños; usa CDN para fotos/arte.

### 9. Probar Node.js localmente (opcional) {: #probar-nodejs-localmente-opcional }

> Configuración rápida para usar scripts de `npm` en la plantilla del estudiante.

1. Instalar Node.js + npm

   - macOS:
     ```bash
     brew install node
     node -v && npm -v
     ```
   - Windows:
     - Descarga LTS desde `https://nodejs.org/` e instala, o:
     ```powershell
     winget install OpenJS.NodeJS.LTS
     node -v && npm -v
     ```

2. Ejecutar la plantilla con Node

   ```bash
   cd mi-proyecto-web
   npm install
   npm run dev
   # abre http://localhost:3000
   ```

3. Validar todo (opcional)

   ```bash
   npm run validate:all
   ```

#### `package.json` en un vistazo

- **scripts**: comandos rápidos con `npm run <nombre>`
  - `dev`: inicia un servidor local (puerto 3000)
  - `validate:html`, `validate:css`, `validate:js`, `validate:project`, `validate:all`
  - `lighthouse`: audita rendimiento local
- **devDependencies**: herramientas solo para desarrollo; se instalan con `npm install`.
- **private**: evita publicar accidentalmente en npm.
- **metadatos**: `name`, `version`, `repository`, `author`, `license`.

---

## Flujo diario de trabajo

### Pasos para el desarrollo diario

1. **Actualiza tu repositorio local**:

   - Abre VS Code y ve a la pestaña **Source Control**.
   - Haz clic en **Pull** para traer los últimos cambios del repositorio remoto.

   **Comando equivalente:**

   ```bash
   git pull
   ```

2. **Realiza cambios en tu código**:

   - Edita los archivos necesarios en el proyecto.
   - Guarda los cambios.

3. **Previsualiza los cambios localmente**:

   - Usa **Live Server** para ver los cambios en tiempo real.

4. **Haz un commit de tus cambios**:

   - Ve a **Source Control**, selecciona los archivos modificados y haz clic en el botón `+`.
   - Escribe un mensaje de commit describiendo los cambios y haz clic en el check.

   **Comandos equivalentes:**

   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   ```

5. **Sube los cambios al repositorio remoto**:

   - Haz clic en **Sync Changes**.

   **Comando equivalente:**

   ```bash
   git push
   ```

6. **Revisa tu sitio en GitHub Pages** (si está habilitado).
   - Asegúrate de que los cambios se reflejen correctamente.

---

## Glosario de conceptos

### Términos del sistema

1. **Terminal**: Interfaz de línea de comandos para interactuar con tu ordenador.
   - **macOS**: Abre el Terminal presionando **Cmd + Espacio**, escribe "Terminal" y pulsa **Enter**.
   - **Windows**: Usa Git Bash (se instala con Git).
2. **Comandos**: Instrucciones que escribes en el terminal para realizar tareas (por ejemplo, `ls`, `mkdir`).
3. **Ruta (Path)**: Ubicación de un archivo o carpeta en tu ordenador (por ejemplo, `/Usuarios/tu-nombre/proyecto`).
4. **Directorio**: Una carpeta que contiene archivos u otras carpetas.

### Términos de red

1. **HTTP**: Protocolo para transferir páginas web y archivos.
2. **HTTPS**: Versión segura de HTTP con cifrado.
3. **Localhost**: Se refiere a tu ordenador en una red (por ejemplo, `127.0.0.1`).
4. **Dirección IP**: Dirección única para dispositivos en una red.
5. **DNS**: Traduce nombres de dominio (por ejemplo, `github.com`) en direcciones IP.

### Términos de Git y repositorios

1. **Repositorio**: Ubicación para almacenar tu código y su historial.
   - Local: En tu ordenador.
   - Remoto: En GitHub.
2. **Commit**: Una captura del estado actual de tu proyecto.
3. **Push**: Subir cambios al repositorio remoto.
4. **Branch**: Una versión del proyecto para experimentar o desarrollar características.
5. **Binarios en Git**: Imágenes/videos/archivos no-texto no muestran diferencias línea a línea y hacen el repo pesado.
   - Evita subir originales pesados; usa un CDN como ImageKit y enlaza por URL.
   - En proyectos grandes, considera **Git LFS** para binarios, pero no es necesario en este curso.

---

## Apéndice: Instalando Homebrew en macOS

### Qué es Homebrew

Homebrew es un gestor de paquetes para macOS que simplifica la instalación de software como Git.

### Pasos para instalar Homebrew

1. Abre el Terminal: **Cmd + Espacio**, escribe "Terminal" y pulsa **Enter**.
2. Ejecuta el comando:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Sigue las instrucciones. Se instalarán las **Xcode Command Line Tools** (requiere tiempo y espacio en disco).
4. Añade Homebrew al path:
   ```bash
   echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
   eval "$(/opt/homebrew/bin/brew shellenv)"
   ```
5. Verifica la instalación:
   ```bash
   brew --version
   ```

---

## Referencias finales

- **Visual Studio Code**:  
  https://code.visualstudio.com/
- **Live Server Extension**:  
  https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
- **GitLens Extension**:  
  https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
- **Git**:  
  https://git-scm.com/
- **GitHub**:  
  https://github.com/
- **GitHub Pages Documentation**:  
  https://docs.github.com/en/pages
- **Homebrew (para macOS)**:  
  https://brew.sh/

# Adaptaciones ATELIER

## ATELIER Note: Vinculación metodológica

Este es el **primer sprint** del curso. La dinámica de _un commit por clase_ garantiza que cada estudiante registre su progreso de forma incremental. El objetivo no es solo instalar herramientas, sino **aprender a documentar con commits** desde el principio.

## Sugerencia: Añadir rúbrica de evaluación

Al final de la sesión, cada estudiante debe realizar un commit con mensaje estándar:

```bash
git commit -m "chore: environment set up · repo + index.html + pages live"
```

**Rúbrica rápida (0–2 puntos):**

- **0** — no commit / falla la publicación.
- **1** — commit presente pero documentación pobre.
- **2** — commit correcto + README completo + URL de Pages.

## ATELIER Note: Git Pro Tip del día

Antes de cada commit, ejecutar:

```bash
git status
git diff
```

Esto obliga a **leer los cambios** y evita errores comunes.

## ATELIER Note: Accesibilidad y ética

- Añade siempre `lang="es"` en el `<html>` para accesibilidad.
- Los commits deben ser **propios y documentados**. IA puede ayudar con boilerplate, pero debe reconocerse en el README (transparencia académica).
- Se fomenta el **trabajo incremental** en lugar de acumulación de tareas al final (bienestar).

## Sugerencia: Conexión con la filosofía

Recuerda que este curso se enmarca en el lema **Critical Coding for a Better Living**: aprender código no solo como técnica, sino como práctica crítica y creativa que mejora la vida.

---

# Cierre de la Lección: Entorno de Desarrollo

- Has preparado tu **entorno de desarrollo** completo.
- Has creado tu **primer repositorio personal** en GitHub.
- Has desplegado tu **primera página web** en GitHub Pages.
- Has realizado tu **primer commit evaluable** con mensaje estándar.
- Has establecido las **bases del flujo de trabajo** para el resto del curso.

**ATELIER Note:** Este commit se convierte en la base de tu proyecto/portfolio; cada semana irás añadiendo una pieza más hasta culminar en un proyecto completo.

---
