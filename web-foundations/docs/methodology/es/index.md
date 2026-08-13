---
layout: lesson
title: 'Educación en Diseño Web Orientada a la Práctica a través de Proyectos Incrementales'
title_en: 'Practice-Oriented Web Design Education Through Incremental Projects'
slug: methodology
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /methodology/es/
---

## 📋 Tabla de Contenidos

{: .no_toc }

<!-- prettier-ignore-start -->

- TOC
{:toc}

<!-- prettier-ignore-end -->

> Declaración sobre Asistencia de IA: Partes de esta metodología y materiales relacionados fueron iterados con herramientas de IA (_ChatGPT GPT‑4/GPT‑5_, _Copilot/Codex_, _Cursor/Claude_). Las iteraciones siguieron un ciclo investigación–práctica–investigación y fueron revisadas por el autor. La pedagogía se fundamenta principalmente en la experiencia en el aula enseñando desarrollo web desde septiembre de 2024.

> 🧭 **Manifiesto**: El giro de una frase — **[Fundamentos de desarrollo asistido por IA]({{ '/methodology/es/ai-assisted-development-foundations/' | relative_url }})**.
>
> 📘 **Protocolo de aula**: Cuándo planificar, cómo declarar, qué debes defender. **[Guía práctica]({{ '/methodology/es/ai-practical-guide/' | relative_url }})**.
>
> 🏗 **Cluster de arquitectura**: RPC, RAG, MVC como disciplina, luego el sprint de React. **[AI-assisted development]({{ '/lessons/en/ai-assisted-development/' | relative_url }})**.

## Introducción y Fundamento

Enseñar diseño web y desarrollo _front-end_ a nivel universitario requiere equilibrar teoría y práctica. Un enfoque de **aprendizaje basado en proyectos** puede involucrar a los estudiantes con tareas significativas del mundo real y proporcionar una experiencia más realista y profesional que los formatos de solo conferencias. Al estructurar el curso alrededor de un proyecto incremental – donde cada clase construye sobre un único proyecto web – los estudiantes se mantienen motivados y ven la aplicación directa de los conceptos. Este enfoque se alinea con los principios del aprendizaje activo: los estudiantes resuelven problemas activamente e integran temas de varios dominios, lo que fomenta la autonomía y una comprensión más profunda. También aborda desafíos comunes en cursos técnicos. Los métodos tradicionales a menudo presentan conceptos abstractos sin contexto, dejando a los estudiantes ansiosos y convencidos de que "cómo aplicar las cosas" es enseñable o solo para "genios". En contraste, una metodología incremental y orientada a la práctica fundamenta cada concepto en el proyecto en evolución, desmitificando ideas abstractas y reduciendo el factor de intimidación.

**Un estudiante, un repositorio, un proyecto** – este lema captura nuestra metodología. Cada estudiante trabaja en un proyecto web personal durante todo el semestre, usando un repositorio _Git_ privado para rastrear el progreso. Cada semana (aproximadamente una sesión de clase de 2 horas), el estudiante aprende nuevos conceptos, los practica en un ejercicio guiado, y luego completa una pequeña tarea práctica. Al final de la clase, hacen _commit_ de su trabajo al repositorio con documentación clara de lo que se hizo. Durante el término, estos _commits_ forman una narrativa del crecimiento del proyecto, resultando en un sitio web completamente funcional, responsivo, accesible e interactivo en su portafolio. Esta construcción iterativa sirve múltiples propósitos: refuerza el aprendizaje continuo, produce una pieza de portafolio tangible, e inherentemente documenta el proceso de aprendizaje tanto para estudiantes como para instructores.

## Estructura de Clase: Teoría, Práctica Guiada y _Commits_

Cada sesión de clase está estructurada en tres bloques para maximizar el aprender haciendo:

- **Introducción Teórica Breve:** El instructor introduce un nuevo concepto o técnica (ej. un método de diseño CSS, un principio de diseño UI, una guía de accesibilidad) en una conferencia concisa. Esto proporciona justo la teoría suficiente para contextualizar el trabajo del día sin abrumar a los estudiantes.
- **Ejercicio Práctico Guiado:** Los estudiantes inmediatamente aplican el concepto en una sesión de codificación en vivo o tutorial práctico. El instructor guía a través de un ejemplo (como implementar una barra de navegación responsiva o usar un componente de sistema de diseño), y los estudiantes siguen, hacen preguntas, y ajustan el ejemplo. Esta práctica guiada conecta la teoría con el trabajo independiente, construyendo confianza en los estudiantes.
- **Ejercicio Independiente y _Commit_:** Al final de la sesión, los estudiantes trabajan en una tarea corta extendiendo o aplicando el concepto a su propio proyecto. Esto podría ser crear una nueva sección de página, mejorar usabilidad, o añadir una característica interactiva relacionada con el tema de esa semana. Al final de la clase, **cada estudiante hace un _commit_ de _Git_** en su repositorio, subiendo las actualizaciones. El mensaje de _commit_ debe documentar brevemente lo que se logró (ej. "Añadida galería responsiva con diseño de cuadrícula y etiquetas ARIA"). Este ritual alienta a los estudiantes a reflexionar sobre su trabajo y practicar hábitos profesionales de control de versiones.

Bajo este modelo, la lección de cada semana es similar a un "_sprint_" en terminología ágil – un ciclo de desarrollo corto que produce un incremento concreto del proyecto. Para la siguiente semana, los estudiantes tienen una nueva pieza de un sitio web para mostrar por su esfuerzo. Con el tiempo, estos incrementos se acumulan en un proyecto completo. Este diseño refleja cómo se construye software del mundo real iterativamente, lo que ayuda a los estudiantes a **aclimatarse a flujos de trabajo profesionales** temprano. La cadencia regular de _sprints_ (con fechas límite semanales) proporciona un ritmo para el progreso, asegurando que el proyecto avance constantemente en lugar de mediante empujones de último minuto. También hace que el proceso de aprendizaje sea menos abrumador al dividirlo en fragmentos manejables.

## Cronograma de Enseñanza Actualizado Semana por Semana (Primeras Cinco Semanas)

| Semana | Enfoque                                                          | Tarea de _Git_ / Repositorio                                                                                                |
| ------ | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **1**  | **Configuración – VS Code, Git, GitHub**                         | Crear repositorio personal desde la plantilla, añadir y subir `README.md` con identificador de estudiante.                  |
| **2**  | **Taller de Definición de Proyecto**                             | _Commit_ `project‑brief.md` **y** comenzar `project.yaml` (metadatos).                                                      |
| **3**  | **Estilo – Tipografía y Color**                                  | Implementar identidad de marca en HTML/CSS; _commit_ primeros activos de diseño.                                            |
| **4**  | **Publicación y Envío de Metadatos**                             | Habilitar _GitHub Pages_; enviar PR a `/2025‑fall/students.yaml` _o_ subir `project.yaml` validado.                         |
| **5**  | **Análisis de Tendencias de Diseño y Lanzamiento de _Showroom_** | Sesión de revisión por pares; _script_ CI construye _showroom_ del curso desde `students.yaml` y URLs de proyectos en vivo. |

> Después de la Semana 5 el curso retoma el ritmo de _sprint_ previamente descrito (accesibilidad, interacción, pruebas, etc.).

## Desarrollo de Portafolio Incremental y sus Beneficios

Construir un único proyecto incrementalmente ofrece varios beneficios educativos. Primero, **integra conocimiento continuamente**: en lugar de aprender temas en aislamiento, los estudiantes inmediatamente ven cómo cada nuevo concepto mejora su proyecto. Por ejemplo, una lección sobre diseño responsivo no es solo teoría – resulta en que el estudiante realmente hace su proyecto _mobile-friendly_ esa semana. Esta aplicación contextual refuerza por qué cada concepto importa, contrarrestando la tendencia a ver temas fundamentales como irrelevantes o puramente académicos.

Segundo, el enfoque resulta en una **pieza de portafolio personal** para cada estudiante. Al final del semestre, cada estudiante tiene un sitio web completamente realizado que pueden demostrar – uno que han construido desde cero, paso a paso. Esto es valioso para su aprendizaje y desarrollo profesional; los estudiantes perciben el repositorio del proyecto como una vitrina de su trabajo y habilidades. También promueve un sentido de propiedad y orgullo en su trabajo, lo que puede ser más motivador que una serie de tareas desconectadas.

Tercero, la **disciplina de _commit_ después de cada clase** enseña buenos hábitos de desarrollo. Los estudiantes aprenden a documentar su progreso y escribir mensajes de _commit_ significativos, una práctica que mejora la atención al codificar y la comunicación. El registro de _commits_ efectivamente se convierte en un diario de aprendizaje. Los instructores pueden revisar este registro para entender el viaje de cada estudiante – viendo cómo abordaron tareas y superaron desafíos.

## Resumen de _Git_

| Propósito                              | Repositorio               | Método                                          |
| -------------------------------------- | ------------------------- | ----------------------------------------------- |
| Lecciones canónicas                    | `web-foundations`         | Escritas en `docs/lessons/` como HTML o MD      |
| Plan de lecciones específico del curso | `web-design`              | Archivos HTML redirectores (`meta refresh`)     |
| Metodología y plantillas compartidas   | `web-foundations/docs/`   | Referenciado por URL o incluido si es necesario |
| Proyectos estudiantiles                | Repositorios individuales | Clonados desde plantilla                        |
| Cronograma de clase e índice           | `web-design/2025-fall/`   | Archivos YAML, HTML, o MD                       |

## Gestión de Escala: Factibilidad con 120+ Estudiantes

Una preocupación práctica es si un modelo de _commit_ por clase es sostenible para un instructor con cohortes grandes (ej. 120 estudiantes cada semestre). Revisar docenas de _commits_ cada semana no es trivial. Sin embargo, hay estrategias y herramientas para hacer esto factible:

- **_GitHub Classroom_ y Automatización:** Empleamos _GitHub Classroom_ (o una plataforma similar) para gestionar repositorios de estudiantes. Esta herramienta automatiza la configuración de repositorios y proporciona un _dashboard_ para todos los repositorios de estudiantes. Los instructores pueden ver rápidamente el historial de _commits_ de cada estudiante en un lugar.

- **Triaje de _Commits_ con Métricas:** En lugar de leer cada línea de código en cada _commit_, el instructor puede **hacer triaje** de _commits_. Al mirar mensajes de _commit_ y usar estadísticas de _commit_ (tamaños de diff, resultados de pruebas), uno puede identificar qué entregas podrían necesitar atención.

- **Revisión por Pares y Discusión:** Para aprovechar el tamaño grande de la clase como un recurso en lugar de una carga, incorporamos participación de pares. Los estudiantes pueden ser agrupados en pequeños "equipos de revisión por pares" que periódicamente miran el trabajo de cada uno.

## _Sprints_ Ágiles en el Aula

Tomamos prestada terminología de metodologías ágiles (como "_sprints_") para enmarcar el ciclo de trabajo de cada lección. Esta alineación con prácticas profesionales es intencional: acultura a los estudiantes al ritmo iterativo común en proyectos de la industria. Cada _sprint_ de clase comienza con una "planificación" (la introducción de nuevas tareas/conceptos), se mueve a través de "ejecución" (práctica guiada e independiente), y termina con una "revisión" (el _commit_ y posiblemente un rápido _show-and-tell_ o recapitulación).

Sin embargo, también **adaptamos y criticamos prácticas ágiles** para adaptarse a un contexto educativo. Uno debe recordar que los estudiantes están en un proceso de aprendizaje, no en un ambiente de entrega de producto. Por lo tanto usamos la estructura de _sprint_ flexiblemente: si muchos estudiantes luchan con un concepto, el "siguiente _sprint_" podría incluir revisión adicional o un alcance más pequeño.

## Reflexiones Críticas sobre Creatividad, Bienestar y Productividad

Un componente importante de este diseño de curso es integrar **perspectivas críticas sobre la naturaleza del trabajo creativo** en la industria web. No queremos simplemente entrenar a estudiantes para ser engranajes en la industria tecnológica; queremos que cuestionen y entiendan el contexto de su trabajo. A lo largo del curso, tejemos discusiones sobre las implicaciones más amplias de metodologías de diseño y desarrollo.

Temas como **ética en UX/UI, diseño sostenible, y diseño inclusivo** son así enmarcados no solo como temas técnicos o estéticos, sino como socio-culturales. Por ejemplo, mientras los estudiantes trabajan en hacer sus proyectos accesibles, profundizamos en por qué la accesibilidad es un derecho humano y cómo la tecnología puede marginalizar a las personas cuando el beneficio es el único motivo.

## Alentando Colaboración y Superando Barreras

Mientras cada estudiante trabaja en un proyecto individual (para asegurar que todos aprendan tangiblemente las habilidades), intencionalmente cultivamos una **comunidad de colaboración** dentro de la clase. Aprender a diseñar y codificar es a menudo un deporte de equipo en la industria, y el aprendizaje entre pares puede mejorar grandemente la comprensión.

Respecto al **miedo de codificar y herramientas de línea de comandos** (ej. usar _Git_ o _npm_), tomamos un enfoque gradual y amigable al diseño. Temprano en el curso, proporcionamos herramientas amigables al usuario y alternativas UI: por ejemplo, usar _Visual Studio Code_ con una extensión _Git_ o _GitHub Desktop_, para que los estudiantes puedan hacer _commit_ y _push_ con botones en lugar de comandos.

## Integrando IA como Ayuda, No Atajo

> 🧭 **Manifiesto**: El giro de una frase — los LLM son motores probabilísticos dentro de sistemas. **[Fundamentos de desarrollo asistido por IA]({{ '/methodology/es/ai-assisted-development-foundations/' | relative_url }})**.
>
> 📘 **Protocolo de aula**: Cuándo planificar, cómo declarar, qué debes defender. **[Guía práctica]({{ '/methodology/es/ai-practical-guide/' | relative_url }})**.
>
> 🏗 **Cluster de arquitectura**: RPC, RAG, MVC como disciplina, luego el sprint de React. **[AI-assisted development]({{ '/lessons/en/ai-assisted-development/' | relative_url }})**.
>
> 道 **Addendum Filosófico**: Para sabiduría ancestral sobre ética, artesanía y la lucha eterna contra el código basura, consulta **[El Tao del Desarrollo con IA]({{ '/methodology/es/tao-of-ai-development/' | relative_url }})**.

La [Carta Europea del Investigador](https://euraxess.ec.europa.eu/jobs/charter) (Comisión Europea, 2005) recoge lo que la UE exige de los investigadores financiados: evitar el plagio, respetar la propiedad intelectual, rendir cuentas del trabajo delegado. Exijo de mis estudiantes el mismo estándar que mi propia red de financiación exige de mí:

> "Researchers should make every effort to ensure that their research is relevant to society and does not duplicate research previously carried out elsewhere. They must avoid plagiarism of any kind and abide by the principle of intellectual property and joint data ownership..."
>
> "Researchers need to be aware that they are accountable towards their employers, funders or other related public or private bodies as well as, on more ethical grounds, towards society as a whole..."
> — *European Charter for Researchers* (European Commission, 2005), "Professional responsibility" (p. 12–13) & "Accountability" (p. 14)
> Ancla Ahmes: `svcm/documents/am509774cee_en_e4_5bcc3da7/`

Este espejo pedagógico se apoya en política internacional, no solo en la preferencia del docente. Sobre IA en la enseñanza, la UNESCO recomienda:

> "Member States should encourage research initiatives on the responsible and ethical use of AI technologies in teaching, teacher training and e-learning, among other issues... Member States should also ensure that AI technologies empower students and teachers and enhance their experience, bearing in mind that relational and social aspects and the value of traditional forms of education are vital in teacher-student and student-student relationships... AI should support the learning process without reducing cognitive abilities and without extracting sensitive information, in compliance with relevant personal data protection standards."
> — UNESCO, *Recommendation on the Ethics of Artificial Intelligence* (2021), §104

Dado el auge de la IA generativa, una consideración moderna importante es cómo incorporar herramientas de IA en el currículo de diseño web. Los estudiantes hoy tienen acceso a sistemas como _ChatGPT_ y _GitHub Copilot_ que pueden producir fragmentos de código o sugerencias de diseño. Nuestro enfoque es **integrar IA como ayuda de aprendizaje mientras mantenemos integridad académica**.

Informamos a los estudiantes que pueden usar asistentes basados en IA para inspiración, depuración, o para obtener pistas cuando están atascados, tanto como usarían _Google_ o _Stack Overflow_. Sin embargo, deben **citar o reconocer contribuciones significativas generadas por IA** en su documentación de _commit_. Para mantener el foco en el aprendizaje, diseñamos tareas centradas en el proceso y la personalización, no en soluciones triviales que una IA podría entregar de forma genérica. Esto se alinea con la política de alfabetización digital y en IA de la UE y la UNESCO: aprendices y docentes deben adquirir competencias digitales, alfabetización mediática y pensamiento crítico para participar activamente en la sociedad y los procesos democráticos (Declaración Europea sobre los Derechos Digitales y los Principios para el Decenio Digital, 2022; UNESCO, 2021, pp. 33, 35).

## Estrategia de Evaluación: Evaluación Continua y Final

Nuestra estrategia de evaluación está diseñada para evaluar no solo el producto final sino el proceso de aprendizaje a lo largo del curso. Combina **evaluación continua** (a través de los _commits_ semanales y posiblemente hitos de medio término) con una **evaluación final** (tanto el proyecto terminado como un examen escrito o presentación).

**Evaluación Continua:** El _commit_ de cada semana se verifica por completitud y calidad. En lugar de asignar una calificación pesada a cada _commit_ individual, los usamos formativamente: los estudiantes obtienen crédito por entregar su trabajo y breve retroalimentación sobre qué mejorar.

**Evaluación de Proyecto Final:** Al final del término, el repositorio de cada estudiante contiene el proyecto completo y su historial. El sitio web final está desplegado (usamos _GitHub Pages_ o un servicio similar, para que cada proyecto esté vivo para demostración).

**Examen Reflexivo (basado en _Moodle_):** Conducimos un examen escrito en nuestra plataforma _Moodle_ enfocándose en comprensión conceptual. Sin embargo, en lugar de preguntas abstractas, muchas están adaptadas a la experiencia de proyecto propio del estudiante.

## Conclusión

En resumen, esta metodología orientada a la práctica, clase por clase para educación en diseño web integra construcción de habilidades técnicas con práctica profesional y reflexión crítica. Al estructurar cada lección como un mini _sprint_ de proyecto (con teoría, práctica, y un _commit_), los estudiantes progresivamente construyen un proyecto web completo que sirve como artefacto de portafolio y andamio de aprendizaje.

Por el final del curso, cada estudiante tiene un repositorio de _commits_ contando la historia de su viaje de aprendizaje, un sitio web desplegado mostrando sus habilidades, y una comprensión matizada de cómo práctica disciplinada y pensamiento crítico se combinan para informar buen diseño web. Esta metodología no solo produce diseñadores y desarrolladores _front-end_ competentes, sino también practicantes auto-reflexivos preparados para la naturaleza colaborativa y siempre evolutiva de la industria web.

**Fuentes:**

- Nelson, M. A., & Ponciano, L. (2021). _Experiences and insights from using GitHub Classroom to support Project-Based Courses_. _IEEE Global Engineering Education Conference._ (arXiv preprint)
- Vega, C., Jiménez, C., & Villalobos, J. (2012). _Implementing an Incremental Project-Based Learning Solution for CS1/CS2 Courses_. _Proc. of CSEDU 2012_. (Cupi2 Project)
- Bas Wallet (2025). _It's not you: your UX design job is frustrating and unfulfilling – Marx's concept of alienation applied to today's design industry_. _UX Collective, Medium._

---

**Autoría:** Rubén Vega Balbás, PhD (UDIT, Universidad de Diseño, Innovación y Tecnología) · ORCID: <https://orcid.org/0000-0001-6862-9081> · <https://www.udit.es>
**Licencias:** Código MIT · Contenido CC BY-NC-SA 4.0

_Critical Coding for a Better Living._
