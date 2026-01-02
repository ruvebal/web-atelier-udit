# WEB ATELIER (UDIT) · Plantilla de Curso para Profesores

_Critical Coding for a Better Living._

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Listo-brightgreen)](https://pages.github.com/)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.x-red)](https://jekyllrb.com/)
[![Licencia: MIT](https://img.shields.io/badge/Código-MIT-blue)](LICENSE-CODE)
[![Licencia: CC BY-NC-SA 4.0](https://img.shields.io/badge/Contenido-CC%20BY--NC--SA%204.0-lightgrey)](LICENSE-CONTENT)

**Autor:** Rubén Vega Balbás, PhD
**Institución:** UDIT – Universidad de Diseño, Innovación y Tecnología
**ORCID:** [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)
**Web:** [udit.es](https://www.udit.es)

---

## Inicio Rápido: Crea Tu Curso

### Opción 1: Usar como Plantilla de GitHub (Recomendado)

1. **Haz clic en "Use this template"** en GitHub (botón verde, arriba a la derecha)
2. **Nombra tu repositorio** (ej. `diseno-web-2025-otono`)
3. **Clona tu nuevo repositorio:**

   ```bash
   git clone https://github.com/TU_USUARIO/TU_REPO.git
   cd TU_REPO
   ```

4. **Configura tu curso** (ver [Configuración](#configuración) más abajo)
5. **Activa GitHub Pages** en Settings → Pages → Source: rama `main`

### Opción 2: Fork y Personalizar

```bash
# 1. Haz fork desde la interfaz de GitHub, luego clona tu fork
git clone https://github.com/TU_USUARIO/professor-course-template.git
cd professor-course-template

# 2. Renombra origin y añade upstream para actualizaciones
git remote rename origin upstream
git remote add origin https://github.com/TU_USUARIO/TU_NUEVO_REPO.git

# 3. Sube a tu nuevo repositorio
git push -u origin main
```

### Opción 3: Clonación Manual (Inicio Limpio)

```bash
# Clona sin historial de git
git clone --depth 1 https://github.com/ruvebal/web-atelier-udit.git temp-clone
cp -r temp-clone/professor-course-template ./mi-curso
rm -rf temp-clone
cd mi-curso

# Inicializa repositorio git nuevo
rm -rf .git
git init
git add .
git commit -m "Commit inicial: sitio de curso desde plantilla WEB ATELIER"

# Añade tu remoto y sube
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

---

## Configuración

### 1. Actualiza `_config.yml`

```yaml
title: 'Nombre de Tu Curso'
description: 'Descripción del curso para SEO'
url: 'https://TU_USUARIO.github.io'
baseurl: '/TU_REPO'
repository: 'TU_USUARIO/TU_REPO'
```

### 2. Actualiza los Datos del Curso

Edita `_data/courses/2025-fall/en.yml` y `es.yml`:

```yaml
university: 'Nombre de Tu Universidad'
course_name: 'Nombre del Curso'
term: '2025 · Otoño'
canonical_lessons_base: 'https://ruvebal.github.io/web-atelier-udit'
```

### 3. Personaliza las Páginas del Semestre

- Edita `2025-fall/en/index.md` y `2025-fall/es/index.md`
- Actualiza los enlaces de lecciones según tu plan de estudios
- Modifica la tabla de calendario con tus fechas

### 4. Añade Estudiantes (Durante el Semestre)

Crea archivos YAML individuales en `_data/students/2025-fall/`:

```yaml
# _data/students/2025-fall/maria-garcia.yml
name: 'María García'
project_title: 'Portfolio Web'
repo: 'https://github.com/mariagarcia/portfolio'
site: 'https://mariagarcia.github.io/portfolio'
```

---

## Desarrollo Local

### Requisitos

- Ruby 3.x
- Bundler (`gem install bundler`)
- Node.js (opcional, para scripts)

### Instalación

```bash
# Instala dependencias
bundle install

# Ejecuta servidor local
bundle exec jekyll serve --livereload

# Ver en http://localhost:4000/TU_BASEURL/
```

### Build para Producción

```bash
bundle exec jekyll build
# Salida en _site/
```

---

## Estructura del Repositorio

```plaintext
professor-course-template/
├── _config.yml                   # Configuración Jekyll
├── _layouts/
│   └── default.html              # Layout principal con modo oscuro
├── _includes/
│   ├── head.html                 # Meta, estilos, script de tema
│   ├── header.html               # Nav sticky con toggle idioma/tema
│   ├── footer.html               # Branding UDIT, licencias
│   ├── lang-switcher.html        # Toggle EN/ES
│   ├── head-hreflang.html        # Tags SEO multilingüe
│   ├── head-jsonld.html          # Datos estructurados (JSON-LD)
│   └── students-list-by-files.html # Generador de showroom
├── _data/
│   ├── courses/2025-fall/        # Metadatos del curso (en.yml, es.yml)
│   ├── lessons/2025-fall/        # Enlaces de lecciones (en.yml, es.yml)
│   ├── students/2025-fall/       # Archivos YAML de estudiantes
│   └── locales.yml               # Idiomas soportados
├── 2025-fall/
│   ├── index.html                # Redirect del semestre (detección idioma)
│   ├── en/index.md               # Página del curso en inglés
│   └── es/index.md               # Página del curso en español
├── assets/css/
│   └── site.css                  # Overrides de estilos locales
├── docs/                         # Políticas del curso
│   ├── ACCESSIBILITY.md
│   ├── AI_POLICY.md
│   ├── ETHICS.md
│   ├── PRIVACY.md
│   └── SUSTAINABILITY.md
├── .github/workflows/
│   ├── pages.yml                 # Despliegue GitHub Pages
│   ├── critical.yml              # Validación de build
│   └── validate-students-pr.yml  # Validación de PR de estudiantes
├── index.html                    # Redirect raíz al semestre actual
├── Gemfile                       # Dependencias Ruby
├── package.json                  # Scripts Node.js
├── LICENSE-CODE                  # Licencia MIT
├── LICENSE-CONTENT               # CC BY-NC-SA 4.0
└── README.md                     # Documentación (inglés)
```

---

## Características

### Heredadas de Web Foundations

- **Modo Oscuro** – Toggle con persistencia en localStorage
- **Skip Link** – Mejora de accesibilidad
- **Botón Copiar Código** – Copia con un clic en bloques de código
- **Header Sticky** – Con efecto backdrop blur
- **Diseño Responsive** – Enfoque mobile-first
- **Tipografía Kramdown** – Comillas tipográficas, símbolos
- **JSON-LD** – Datos estructurados para SEO e indexación académica

### Específicas del Curso

- **Soporte Bilingüe** – EN/ES con detección automática de idioma
- **Showroom de Estudiantes** – Generado automáticamente desde archivos YAML
- **Grid de Lecciones** – Layout visual de cards enlazando a Web Foundations
- **Tabla de Calendario** – Seguimiento de entregas semanales
- **Validación de PR** – Comprobación automática de entregas de estudiantes

---

## Flujos de Trabajo

### Flujo de Entrega Estudiantil (Semana 4)

1. El estudiante hace fork del repositorio del curso
2. Crea `_data/students/2025-fall/su-nombre.yml`
3. Abre Pull Request
4. GitHub Action valida el esquema YAML
5. El profesor revisa y hace merge
6. El showroom se actualiza automáticamente

### Añadir un Nuevo Semestre

```bash
# Copia la carpeta del semestre
cp -r 2025-fall 2026-primavera

# Copia los archivos de datos
cp -r _data/courses/2025-fall _data/courses/2026-primavera
cp -r _data/lessons/2025-fall _data/lessons/2026-primavera
mkdir -p _data/students/2026-primavera

# Actualiza el redirect en index.html al nuevo semestre
# Actualiza los defaults en _config.yml si es necesario
```

---

## Relación con Web Foundations

Esta plantilla **enlaza a** [Web Foundations](https://ruvebal.github.io/web-atelier-udit/) para las lecciones canónicas. **No** duplica el contenido de las lecciones.

| Repositorio                 | Propósito                                       |
| --------------------------- | ----------------------------------------------- |
| `web-foundations`           | Lecciones canónicas, metodología, plantillas    |
| `professor-course-template` | Sitio del curso por semestre, showroom          |
| `student-project-template`  | Proyectos individuales de portfolio estudiantil |

**Importante:** NO hagas fork de `web-foundations` para tu curso. Usa esta plantilla.

---

## Enfoque Pedagógico

### Un Estudiante, Un Repositorio, Un Proyecto

- Los estudiantes construyen un único proyecto web durante todo el semestre
- Cada clase termina con un commit documentando el progreso
- El log de commits se convierte en un diario de aprendizaje

### Critical Coding for a Better Living

- Habilidades técnicas integradas con reflexión ética
- Accesibilidad como requisito central, no un añadido
- Discusiones sobre bienestar, inclusividad y diseño responsable

### Agile Adaptado a la Educación

- "Mini-sprints" semanales con flexibilidad para el aprendizaje
- Semanas buffer para refuerzo o exploración creativa
- Prácticas profesionales (CI/CD, control de versiones) a ritmo centrado en el estudiante

---

## Licencias

| Contenido                         | Licencia                                                 |
| --------------------------------- | -------------------------------------------------------- |
| Código (HTML, CSS, JS, configs)   | MIT – ver [LICENSE-CODE](LICENSE-CODE)                   |
| Contenido (texto, imágenes, docs) | CC BY-NC-SA 4.0 – ver [LICENSE-CONTENT](LICENSE-CONTENT) |

© 2025 Rubén Vega Balbás, PhD — WEB ATELIER (UDIT)

---

## Referencias

- Nelson & Ponciano (2021). [Experiencias usando GitHub Classroom para cursos basados en proyectos](https://arxiv.org/abs/2103.07242). arXiv.
- Vega, Jiménez & Villalobos (2012). [Implementando solución de aprendizaje incremental basado en proyectos](http://www.scitepress.org/Papers/2012/39005/). CSEDU.
- Neumann & Baumann (2021). [Métodos Ágiles en Educación Superior](https://doi.org/10.48550/arXiv.2106.12166). IEEE FIE.
- Wallet, B. (2025). [Tu trabajo de UX es frustrante](https://uxdesign.cc/its-not-you-your-ux-design-job-is-frustrating-and-unfulfilling-14d5180800d7). UX Collective.

---

## Soporte

- **Issues:** [GitHub Issues](https://github.com/ruvebal/web-atelier-udit/issues)
- **Lecciones Canónicas:** [Web Foundations](https://ruvebal.github.io/web-atelier-udit/)
- **Contacto:** UDIT – Universidad de Diseño, Innovación y Tecnología
