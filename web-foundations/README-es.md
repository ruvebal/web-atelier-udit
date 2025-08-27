# WEB ATELIER (UDIT) – Fundamentos Web

**Fundamentos Web** es el repositorio central de la iniciativa WEB ATELIER (UDIT), que proporciona el contenido central y el marco pedagógico para un curso moderno de diseño web. Representa un enfoque **basado en proyectos, un commit por clase**, que enfatiza la práctica continua y la reflexión crítica. Cada estudiante construye un proyecto web personal de manera incremental, realizando un commit al final de cada clase. Esta metodología – guiada por el lema **“Un estudiante, un repositorio, un proyecto”** – fomenta el aprendizaje activo y la codificación ética y centrada en las personas (“Critical Coding for a Better Living”).

## Enfoque Pedagógico: Proyectos Incrementales y Diseño Web Ético

**Aprendizaje Incremental Basado en Proyectos:** Cada estudiante trabaja en un único proyecto web a lo largo del semestre, añadiendo nuevas características o mejoras en cada sesión. Al final de cada clase, el estudiante **hace un commit en su repositorio personal**, con un mensaje descriptivo documentando lo aprendido. Con el tiempo, estos commits forman una narrativa de la evolución del proyecto, resultando en un sitio web completo, accesible y responsivo que sirve como portafolio. Este enfoque integra teoría y práctica de forma continua: los conceptos no se enseñan en abstracto, sino aplicados directamente al proyecto en curso.

**Un Commit por Clase:** La estructura del curso establece que cada sesión incluye una breve introducción teórica, un ejercicio guiado y una práctica final independiente, que se traduce en un commit. Los commits semanales funcionan como “mini-sprints” inspirados en metodologías ágiles. Este hábito forma competencias profesionales: redactar mensajes significativos, documentar avances y mantener un historial de desarrollo claro. El log de commits se convierte en un diario de aprendizaje, útil tanto para el estudiante como para el profesor. Además, commits frecuentes evitan acumulación de trabajo y dificultan el plagio, ya que las contribuciones irregulares se detectan fácilmente.

**Codificación Crítica y Reflexiva:** Más allá de las destrezas técnicas, el curso promueve la reflexión sobre el contexto social y ético de la tecnología. Bajo el lema _“Critical Coding for a Better Living”_, se incorporan debates sobre accesibilidad, bienestar y ética. Ejemplos: al estudiar metodologías ágiles, se discuten también críticas sobre cómo los procesos productivos pueden alienar a los diseñadores; al trabajar accesibilidad, se enfatiza la inclusión y el impacto social del diseño. Así, los estudiantes no sólo adquieren habilidades técnicas, sino también conciencia crítica sobre las implicaciones de su trabajo.

**Agile Adaptado a la Educación:** Se adoptan principios ágiles (sprints, desarrollo iterativo) adaptándolos a un entorno pedagógico. Cada commit semanal equivale a un incremento del proyecto. Sin embargo, se mantiene la flexibilidad: si un tema resulta complejo, se prioriza la comprensión sobre la velocidad. También se reserva tiempo de “buffer” para repaso o exploración creativa. El objetivo es acercar a los estudiantes a las prácticas profesionales, pero siempre con un ritmo centrado en el aprendizaje.

## Tecnologías Principales: GitHub Pages, Jekyll y GitHub Actions

- **GitHub Pages para Despliegue:** Publica automáticamente tanto el sitio del curso como los proyectos estudiantiles. Cada push en la rama principal reconstruye el sitio en línea. Esto enseña a los estudiantes la importancia de la publicación iterativa y continua.
- **Jekyll como Generador Estático:** Convierte archivos Markdown y plantillas en HTML estático. Permite mantener el contenido en texto plano y la presentación en layouts comunes. Integrado nativamente con GitHub Pages, simplifica la experiencia docente.
- **Liquid Templating:** El motor de plantillas de Jekyll, usado para bucles y variables. Facilita generar automáticamente listados (ej. proyectos de estudiantes) a partir de archivos YAML.
- **GitHub Actions:** Automatiza la integración continua:

  - Verifica que los sitios compilen sin errores.
  - Valida YAML en `students.yaml` y `project.yaml`.
  - Genera y publica automáticamente el showroom de proyectos.
  - Permite flujos de Pull Requests para que los estudiantes aprendan colaboración.

## Tecnologías de Soporte

- **Markdown:** para escribir lecciones, briefs y documentación.
- **YAML:** para metadatos de proyectos, estudiantes y configuración.
- **Liquid:** para incrustar datos dinámicos en plantillas.
- **JSON-LD:** para añadir metadatos estructurados en `<head>` y favorecer la indexación académica.

## Estructura del Repositorio

```plaintext
web-foundations/
├── docs/
│   ├── lessons/        # Lecciones canónicas
│   ├── methodology/    # Documentos pedagógicos
│   └── templates/      # Plantillas de briefs y YAML
├── _config.yml
└── README-es.md
```

## Diferencias con otros repositorios

- `web-foundations` = repositorio **canónico**, fuente única de lecciones y metodología.
- `professor-course-template` = instancia concreta de un curso/semestre.
- `student-project-template` = repositorio individual de cada estudiante.

## Referencias

- GitHub Pages – [https://docs.github.com/es/pages](https://docs.github.com/es/pages)
- Jekyll – [https://jekyllrb.com](https://jekyllrb.com)
- GitHub Actions – [https://docs.github.com/es/actions](https://docs.github.com/es/actions)
- Nelson & Ponciano (2021). _Uso de GitHub Classroom en cursos basados en proyectos._ [https://arxiv.org/abs/2103.07242](https://arxiv.org/abs/2103.07242)
- Neumann & Baumann (2021). _Agile Methods in Higher Education._ [https://doi.org/10.48550/arXiv.2106.12166](https://doi.org/10.48550/arXiv.2106.12166)
