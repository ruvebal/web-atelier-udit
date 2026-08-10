# **Desarrollo Web: Front-End I**


# **Guía Curricular **


**Prf. Rubén Vega Balbás, PhD \<[ruben.vega@udit.es](mailto:ruben.vega@udit.es)\>**


Este primer curso se enfoca en consolidar bases avanzadas de desarrollo front-end sin frameworks, preparando el terreno para librerías y frameworks en el segundo semestre. Se cubren CSS3 y JavaScript avanzado, junto con principios de diseño UX/UI y comunicación básica con el backend. Los estudiantes trabajarán en proyectos individuales que consumen APIs sencillas (por ejemplo, creadas en Backend I) para afianzar la integración front-back.

## Fundamento Pedagógico

> _Critical Coding for a Better Living._

El desarrollo front-end se entiende aquí no como "producción de páginas web", sino como el diseño de la **capa de interacción humana** de los sistemas digitales: el puente entre las personas y el software que usan. La asignatura separa un **núcleo duradero** (semántica HTML, fundamentos CSS, principios JavaScript, accesibilidad) de una **capa volátil** (frameworks, herramientas de build, plataformas de despliegue) — se enseñan los fundamentos primero porque sobreviven al framework de turno, y los frameworks se enseñan como capas reemplazables, no como destino final. El desarrollo asistido por IA se practica de forma **transparente, documentada y verificada** (metodología docs-first: plan antes que implementación, prompts documentados, código revisado con criterio humano) — no se esconde ni se prohíbe, se enseña como competencia profesional real. La evaluación prioriza la **evidencia de proceso** (historial de commits, declaraciones de uso de IA, defensa oral — Técnica 40% / Reflexión y Documentación 35% / Comprensión Conceptual 25%) sobre el pulido del producto final, porque lo que se examina es la comprensión, no solo el resultado. Y la accesibilidad se trata como **práctica ética**, no como checklist de última hora — en este primer curso, donde se sientan los fundamentos, esto significa que WCAG, navegación por teclado y contraste de color se enseñan desde el Módulo 1, no se añaden al final.

**¿Mejor vivir para quién?** No solo para quien lee. El código que hace menos trabajo consume menos energía, y la energía gastada se convierte en calor — en un móvil, en un portátil, en un centro de datos. Ese coste no se detiene en el dispositivo: recae sobre un clima compartido y, por tanto, sobre todo lo que vive en él. Somos seres tecnológicos, y la línea entre lo vivo y lo construido nunca fue limpia; si estás vivo, ya estás dentro de esto. De ahí que rendimiento y accesibilidad sean la misma pregunta hecha dos veces: qué cuesta esto al mundo donde se ejecuta, y quién lo paga.


**Módulo 1: Hojas de Estilo Avanzadas (CSS3) y Diseño Responsivo**  
En este módulo se profundiza en CSS3 para lograr interfaces modernas y adaptables:

- **Diseño Responsivo:** Uso de media queries y unidades relativas para adaptar el layout a múltiples dispositivos (desktop, móvil, tablet). Se abordan técnicas **mobile-first** y diseño fluido. *Ejemplo:* Implementar un sitio personal que reorganice su contenido en una columna en pantallas pequeñas y en múltiples columnas en pantallas grandes. ([API Canvas - Referencia de la API Web | MDN](https://developer.mozilla.org/es/docs/Web/API/Canvas_API#:~:text=Añadido%20en%20HTML5%2C%20el%20elemento,de%20vídeo%20en%20tiempo%20real)) ([Responsive web design - Wikipedia](https://en.wikipedia.org/wiki/Responsive_web_design#:~:text=Responsive%20web%20design%20,2))

- **Flexbox y CSS Grid:** Aprender a emplear **Flexbox** (layout unidimensional) y **CSS Grid** (layout bidimensional) de forma avanzada. Se comparan ambos métodos y se discuten criterios para elegir cada uno. *Ejemplo práctico:* Rehacer el layout de una página dada usando Grid en lugar de un sistema basado en floats. *Nota:* Se enfatiza que **Flexbox es para diseños de una dimensión** (una fila o columna) mientras que **Grid es para dos dimensiones** (filas y columnas) ([Relación de Grid Layout con otros métodos de diseño y posicionamiento - CSS - CSS | MDN](https://developer.mozilla.org/es/docs/Web/CSS/CSS_grid_layout/Relationship_of_grid_layout_with_other_layout_methods#:~:text=La%20diferencia%20básica%20entre%20CSS,te%20ayudarán%20a%20entender%20Grid)). Esto permite evitar técnicas obsoletas como diseño con tablas o floats para maquetación.

- **Pseudo-clases y Pseudo-elementos dinámicos:** Uso de selectores avanzados como `:hover`, `:nth-child()`, `::before`, `::after`, etc., para crear interactividad y contenido decorativo sin HTML extra. Se explica que una **pseudoclase** es un selector que selecciona elementos en un estado específico (ej. primer hijo, elemento sobre el que pasa el cursor) ([Pseudoclases y pseudoelementos - Aprende desarrollo web | MDN](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Styling_basics/Pseudo_classes_and_elements#:~:text=Una%20pseudoclase%20es%20un%20selector,flexible%20y%20fácil%20de%20mantener)), mientras que un **pseudo-elemento** permite estilizar partes de un elemento (ej. primera letra, contenido antes/después). *Actividad:* Crear un menú con botones cuyo estilo cambie al pasar el mouse (`:hover`) y marcar la página actual con `:active` o clases dinámicas.

- **Variables CSS (Custom Properties):** Definir y utilizar variables CSS para temas y reutilización de valores (ej. colores de marca, tipografía). Se muestra cómo las variables personalizadas se heredan en el DOM y facilitan mantener la consistencia de diseño. *Ejemplo:* Declarar `--color-primario` en `:root` y usarla en múltiples reglas; cambiar su valor actualiza toda la paleta. *Nota:* Aclarar que las **propiedades personalizadas CSS no son “variables” tradicionales** almacenadas, sino parte de la cascada: su valor se calcula donde se utiliza, y heredan a los descendientes ([Uso de propiedades personalizadas (variables) en CSS - CSS | MDN](https://developer.mozilla.org/es/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties#:~:text=%2A%20Para%20el%20elemento%20%60class%3D,predeterminado%20de%20cualquier%20propiedad%20personalizada)). Esto evita repetir valores y permite ajustes globales rápidos.

- **Efectos y Animaciones CSS3:** Aplicar transiciones (`transition`), transformaciones 2D/3D (`transform`), y animaciones con `@keyframes`. Diseñar efectos sutiles para mejorar la UX (por ejemplo, animar el hover de botones, crear un **spinner CSS** para estados de carga). *Actividad:* Implementar una animación al aparecer un modal (con opacidad y desplazamiento) usando solo CSS.

- **Buenas prácticas de CSS:** Organización de CSS modular (por componentes pero sin preprocesadores , p. ej. SASS), convenciones de nomenclatura (BEM) y consideraciones de rendimiento (evitar selectores demasiado generales o anidados que afecten muchos elementos). Se discute el uso de **frameworks CSS** (Bootstrap, Tailwind) señalando que aunque útiles, se priorizará entender CSS puro antes. *Nota:* Se indica evitar dependencias excesivas en frameworks CSS si no son necesarias, y **no abusar de !important** o estilos en línea, ya que dificultan el mantenimiento.

(image) *Las bases del diseño responsivo*: En CSS moderno, el contenido debe adaptarse al medio como el agua al recipiente. El diseño responsive logra que la misma información fluya y se reacomode desde pantallas de escritorio hasta móviles, manteniendo funcionalidad y estética ([Responsive web design - Wikipedia](https://en.wikipedia.org/wiki/Responsive_web_design#:~:text=Image%3A%20A%20screenshot%20of%20Wikipedia,on%20a%20computer%20screen)) ([Responsive web design - Wikipedia](https://en.wikipedia.org/wiki/Responsive_web_design#:~:text=Responsive%20web%20design%20,2)). Esto se logra con CSS3 (media queries, grids flexibles e imágenes fluidas), garantizando **usabilidad** en cualquier dispositivo.

- **Accesibilidad en CSS:** Se introducen prácticas como uso de unidades relativas para respetar ajustes de accesibilidad (p.ej. `rem` para fuentes), contraste de color adecuado (WCAG AA), uso correcto de `:focus` para estados de teclado, y uso de herramientas como **axe DevTools** para detectar problemas. *Ejercicio:* Ensayar la página con solo teclado (tabulación) y asegurar que los indicadores de foco sean visibles en todos los elementos interactivos. 

**Actividades prácticas Módulo 1:** Cada semana se proponen ejercicios cortos, p. ej.: maquetar una tarjeta de perfil con Flexbox; crear una galería responsive con Grid; agregar animaciones a un menú. A mitad del módulo, un **miniproyecto**: Diseñar la página principal de un blog responsivo, aplicando todos los conceptos (flex/grid, variables, animaciones). Este proyecto se versionará en un repositorio Git personal del estudiante. Se revisará código enfatizando semántica HTML correcta y CSS mantenible (se alienta a usar GitHub para seguimiento de cambios).

**Módulo 2: JavaScript Avanzado y Dominios del Front-End**  
Este módulo abarca JavaScript moderno (ES6+), asincronía, uso de librerías y comunicación básica con APIs, sentando bases sólidas de programación en el navegador:

- **Fundamentos Modernos de JS:** Repaso rápido de ES6: let/const vs var, arrow functions, template strings, desestructuración, spread/rest, etc., para asegurar estilo moderno. Se enfatiza escritura limpia y evitar prácticas obsoletas (como el hoisting de `var` o funciones anidadas innecesariamente). *Ejemplo:* Convertir código ES5 (funciones tradicionales, concatenación de strings) a ES6+.

- **Módulos de JavaScript:** Uso de la sintaxis `import/export` para organizar código en módulos reutilizables. Se explica cómo los navegadores modernos soportan módulos nativos y cómo bundlers (Webpack, Vite) manejan dependencias en proyectos grandes. *Actividad:* Dividir una aplicación en archivos ESModules (por ejemplo `math.js` exportando funciones y `app.js` importándolas). Se mencionan **librerías de terceros**: cómo instalarlas vía npm y importarlas. *Ejemplo práctico:* Usar una librería como **Lodash** o **Day.js** en un proyecto, configurando un bundler sencillo (p. ej. Vite) para gestionar la construcción.

- **DOM avanzado y eventos:** Manipulación eficiente del DOM con métodos modernos (querySelector, etc.), evitando técnicas obsoletas (como `document.write`). Se cubre delegación de eventos y buenas prácticas para no saturar la página con listeners. *Ejemplo:* Implementar una lista interactiva donde al hacer clic en un item se muestra un detalle, usando eventos delegados en lugar de asignar un evento a cada elemento.

- **Asincronía en JavaScript:** Profundizar en **Promesas** y el patrón async/await para manejo claro de operaciones asíncronas (peticiones HTTP, temporizadores, etc.). Se define Promise formalmente: *“El objeto Promise representa la eventual finalización (o falla) de una operación asincrónica y su valor resultante”* ([Promise - JavaScript | MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise#:~:text=El%20objeto%20,asincrónica%20y%20su%20valor%20resultante)). Se realizan ejercicios encadenando promesas (`.then()/.catch()`) y luego reescribiéndolos con `async/await` para ver la equivalencia y legibilidad mejorada. *Actividad:* Consumir una API pública sencilla (por ejemplo, la API de chistes de Chuck Norris) usando `fetch` (que devuelve promesas) y manejar el resultado con `await`. Se discute cómo tratar errores (bloque try/catch o `.catch`).

- **Fetch API y AJAX moderno:** Uso de `fetch()` para solicitudes HTTP en vez de XMLHttpRequest. Manejo de JSON (método `.json()` de Response) y estados de respuesta. *Ejercicio:* Escribir una función `cargarDatos()` que realice fetch a un endpoint (puede ser un JSON estático hosteado en GitHub Pages) y muestre datos en la página, mostrando un indicador de carga mientras espera. Se mencionan *headers*, *status codes* y CORS a nivel introductorio, en preparación para integrar con el backend real.

- **Manejo del estado de carga y errores en UI:** Introducir patrones para indicar carga (loading spinners, mensajes) y notificar errores al usuario (mensajes de error amigables). *Ejemplo:* Implementar en la función anterior que antes de `fetch` muestre un spinner CSS y al terminar lo oculte, mostrando datos o mensaje de error según corresponda.

- **Uso de librerías utilitarias:** Se muestra cómo integrar librerías **propias** (módulos escritos por el alumno) y **de terceros**. Por ejemplo, incorporar Moment.js o Day.js para formateo de fechas, o Chart.js para gráficas simples, destacando cómo la modularidad y las promesas facilitan su uso. *Actividad:* Graficar datos obtenidos vía fetch (por ejemplo, temperaturas semanales) usando Chart.js, importado como módulo.

- **Buenas prácticas JS:** Código limpio (funciones puras cuando sea posible, evitar modificar objetos globales), entender **scope** y evitar variables globales, usar herramientas como linters o formateadores (ESLint, Prettier) para mantener consistencia. *Nota tecnológica:* Se desalienta el uso de **jQuery** para nuevos proyectos – aunque fue crucial históricamente, hoy las API nativas cubren la mayoría de sus casos de uso; aprender jQuery no es prioridad y se considera una **tecnología legada**. Igualmente, evitar **AngularJS 1.x**, ya discontinuado, y preferir frameworks modernos (React, Vue, etc.) que se verán en Frontend II.

**Actividades prácticas Módulo 2:** Ejercicios incrementales: convertir callbacks anidados (“callback hell”) en promesas, luego en async/await; hacer pequeñas apps como un buscador que consulte una API (p.ej. buscar películas por título usando OMDB API) mostrando resultados en la página. Se introduce un **proyecto parcial**: Consumir desde front-end una **API REST** sencilla desarrollada en Backend I (por ejemplo, lista de usuarios o productos) – la tarea consiste en hacer peticiones `GET` para listar elementos y quizás `POST` para crear uno nuevo, manejando respuestas en la interfaz. Esto permite coordinación con estudiantes backend: podrían proveer endpoints para que front construya una pequeña interfaz (ej. un mini CRUD). El proyecto se realiza en el repositorio personal e incluye documentación en el README (explicando cómo correr el front y qué endpoints del backend consume).

**Módulo 3: Fundamentos de UX/UI y Accesibilidad Web**  
En paralelo a los módulos técnicos, se incorpora un módulo orientado al **diseño de interfaces** y la experiencia de usuario, reflejando la competencia CM01:

- **Principios de Diseño Visual:** Se repasan nociones básicas de **diseño gráfico aplicado a UI** – alineación, contraste, jerarquía visual, tipografía web, teoría de color. No busca ser un curso de diseño profundo, pero sí sensibilizar al desarrollador front-end en crear interfaces estéticamente agradables y coherentes. *Ejemplo:* Analizar interfaces conocidas (como la página de inicio de Google, una tienda online reconocida) e identificar qué hace que sean limpias y usables.

- **Usabilidad y Experiencia de Usuario:** Introducir las diez heurísticas de usabilidad de Nielsen de forma resumida y cómo aplicarlas en aplicaciones web. Discutir conceptos como **feedback inmediato** (ej. indicar cuando un botón ha sido accionado), **consistencia** (que la navegación y términos usados sean uniformes), prevención de errores (deshabilitar acciones inválidas, etc.). *Actividad:* Evaluar con una lista de verificación la usabilidad de la interfaz creada en el módulo 1 o 2, proponiendo mejoras (ej. agregar etiquetas claras a iconos, mejorar contraste de texto sobre fondos).

- **Accesibilidad web:** Presentar los estándares WCAG (Web Content Accessibility Guidelines) y su importancia. Se cubren prácticas esenciales: proporcionar texto alternativo en imágenes, etiquetas en formularios, soporte a navegación por teclado, roles ARIA básicos para componentes personalizados, etc. *Ejemplo:* Tomar un formulario diseñado previamente e inspeccionar su accesibilidad: ¿todos los inputs tienen `\<label\>` asociado? ¿El orden del tabulador es lógico? Ajustar el formulario para mejorar estos aspectos. Se puede citar el resumen de WCAG 2.1 en español para enfatizar la meta: contenido **perceptible, operable, comprensible y robusto** para cualquier usuario ([WCAG 2.1 de un vistazo | Web Accessibility Initiative (WAI) - W3C](https://www.w3.org/WAI/standards-guidelines/wcag/glance/es#:~:text=W3C%20www,1)).

- **Diseño Mobile First:** Extender lo visto en CSS responsivo con la perspectiva de diseñar primero para móvil (pantallas pequeñas obligan a priorizar contenido) y luego escalar a desktop. *Actividad:* Rediseñar una página hecha previamente, imaginando su estructura en móvil primero (wireframe simple) y luego validando si esa estructura escala bien a desktop con CSS.

- **Herramientas de diseño y prototipado:** Breve introducción a herramientas como Figma o Adobe XD para crear prototipos de interfaces. Aunque el curso es de desarrollo, entender el proceso de diseño ayuda a colaborar con diseñadores. *Ejercicio opcional:* Construir un prototipo de baja fidelidad de la aplicación final del semestre antes de codificarla, e intercambiar feedback con compañeros (ej. prueba de usabilidad en papel o captura estática).

- **Evaluación heurística y pruebas con usuarios:** Se incentiva a que los estudiantes realicen pequeñas pruebas informales de sus interfaces con compañeros simulando ser usuarios, para detectar posibles problemas de UX.

**Actividades prácticas Módulo 3:** Este módulo tiene un carácter transversal, por lo que muchas actividades se integran con los proyectos de los módulos técnicos. Por ejemplo, antes de codificar un componente complejo, realizar un boceto/prototipo y revisar accesibilidad. Se puede asignar como tarea la lectura de artículos cortos sobre UX (en español, de blogs como Medium UX, etc.) y pedir a los estudiantes que presenten brevemente uno o dos aprendizajes clave de esas lecturas en clase (desarrollando la habilidad HB05 de valorar la combinación de estética y funcionalidad).

**Proyecto integrador de Frontend I:** Al finalizar el semestre, los estudiantes desarrollarán un proyecto que reúna todo lo aprendido. Este proyecto se realiza **en coordinación con el proyecto final de Backend I**. Por ejemplo, si en Backend I construyeron una API REST básica (p. ej. gestión de tareas, catálogo de productos, etc.), en Frontend I cada estudiante creará la interfaz **frontend** para consumir esa API. Características del proyecto:

- Deberá ser una **SPA sencilla sin frameworks** (usando HTML, CSS, JS puro o mínimas librerías) que liste recursos desde el backend, permita crear/editar elementos si aplica, manejando estados de carga y mostrando mensajes de éxito/error apropiados. 

- Deberá cumplir principios de diseño y accesibilidad vistos (diseño responsive, navegación clara, formularios accesibles). 

- Se trabajará en el repositorio personal y se documentará cómo conectar con el backend (URL de la API, etc.). Idealmente se desplegará en un servicio gratuito (p. ej. GitHub Pages para front y Heroku/Render para el API) para poder demostrarlo en conjunto. 

- Los docentes de front y back coordinarán para asegurarse de que los endpoints y formatos de datos estén alineados. 

*Evaluación:* Se evaluará tanto la calidad del código (estructura de módulos, buenas prácticas JS/CSS, ausencia de malas prácticas), como la calidad de la interfaz (usabilidad, responsividad, cumplimiento de requisitos funcionales). Asimismo, se valorará la creatividad en la presentación y la correcta integración con la API de backend.

---

# Semestre 2: Desarrollo Moderno con React

_Añadido 2026-08-09 — resumen curricular del semestre 2, ya construido como 15 lecciones canónicas en `docs/lessons/en/react/` (publicado en `/tracks/fei/`). Esta sección documenta lo que ya se enseña; no introduce diseño curricular nuevo._

El segundo semestre traslada los fundamentos del semestre 1 (HTML/CSS/JS sin frameworks) a un framework moderno — React — sin repetir esos fundamentos, y con desarrollo asistido por IA integrado desde el primer módulo, no añadido al final.

**Módulo 4: Filosofía de Frameworks y Fundamentos de Estado**
El semestre arranca por el porqué, no por el cómo: la lección de apertura ("Philosophy & Pedagogical Vision") plantea la mentalidad del *Tao Developer* y los Cinco Pilares de la filosofía critical-coding del curso, antes de tocar una sola línea de JSX. Sigue una comparativa de frameworks basada en criterios reales de decisión técnica (React vs. Vue vs. vanilla), modelado de estado como máquina de estados finitos y taxonomía de antipatrones, y una lección dedicada a fundamentos de desarrollo asistido por IA — LLMs como razonamiento probabilístico, contratos arquitectónicos, observabilidad — sentando las bases de cómo se usa la IA en el resto del semestre.

**Módulo 5: Desarrollo con React (Componentes, Estado, Enrutamiento, Backend)**
El núcleo práctico del semestre: componentes funcionales y JSX; dominio de hooks — `useState`, `useEffect`, `useRef`, `useMemo`/`useCallback`, hooks personalizados; arquitectura de estado — `useReducer`, Context API, librerías externas (Zustand/Redux Toolkit) con árbol de decisión explícito; enrutamiento con React Router v7 — rutas dinámicas, anidadas, protegidas; integración con backend — Fetch, React Query (caching, mutations), y GraphQL; autenticación — JWT, sesiones, OAuth, prevención XSS; y una lección avanzada de React Router v7 Framework Mode con SSR, autenticación del lado servidor, e internacionalización por locale. Este último punto — SSR + auth + i18n en un solo flujo — no tiene equivalente en la guía original de Frontend II Módulo 5; es contenido genuinamente avanzado que sienta la base para que Frontend II no necesite volver a explicarlo.

**Módulo 6: Testing de Front-End**
Testing unitario con Vitest, testing de componentes con React Testing Library, y end-to-end con Cypress — un solo módulo compacto en vez de dos, porque en la práctica se enseña como un continuo pirámide-de-testing, no como bloques separados.

**Módulo 7: Rendimiento y Despliegue**
Optimización de rendimiento — React DevTools Profiler, `React.memo`, code-splitting con `lazy()`+`Suspense`, análisis de bundle — y despliegue profesional — build de producción con Vite, Vercel/Netlify, variables de entorno, CI/CD con GitHub Actions.

**Proyecto integrador de Frontend I — Semestre 2: Geophysical Aggregator**
Proyecto individual (no en equipo): una aplicación SSR con React Router v7 Framework Mode que consume al menos dos APIs geofísicas públicas (USGS, Open-Meteo, NOAA, etc.), usa React Query para gestión de datos con `staleTime` e `initialData` en SSR, ofrece interfaz bilingüe con locale resuelto en servidor, y protege al menos una ruta con autenticación por cookie httpOnly. El repositorio debe incluir `docs/plans/`, `docs/reports/`, y declaración de uso de IA en el README — la misma disciplina de evidencia de proceso que rige el resto de la asignatura. Cierra con presentación final: demo en vivo (40%), presentación técnica (15%), monografía (20%), calidad de la reflexión (10%).

*Nota de alcance:* este semestre 2 es el territorio ya construido que Frontend II (Módulos 4–7 en su guía original) debía dejar de repetir — ver la guía curricular de Frontend II revisada, que ahora abre donde este semestre cierra: arquitectura de producción, PWA, testing avanzado con revisión de IA, rendimiento, 3D, e interfaces IoT/Python.



---
---
---

## Fundamentación académica de las decisiones curriculares

_Añadido 2026-08-10. Evidencia **exclusivamente de los bundles soberanos Ahmes** del proyecto (manifiestos `fe-main` = `runs/frontend-pedagogy/01/pdfs/.ahmes/batch-manifest.json` y `fe-ibero` = `…/pdfs-ibero/.ahmes/batch-manifest.json`; 17 `content_hash` únicos, deduplicados). Cada afirmación resuelve a `extraction.db` con `node_id` y página. **No se cita desde `REFERENCES-for-refcheck.md`**: es lista de candidatos, no evidencia extraída._

**Convención de cita:** `⟨coat⟩ · nodo ⟨node_id⟩ · p. ⟨página⟩`, donde *coat* es el directorio en `~/ahmes-library/scholar/documents/`. Duplicados resueltos: se usa `liu_fan_pan…dc2bd27d` (no `tool_tutor…`, mismo hash) y `digital_accessibility_literacy…91241359` (no `fisseler…`, mismo hash). `correction_to_tool_tutor…4429a07e` no se cita: es erratum.

### Decisiones respaldadas

**1 · Proyecto integrador y "un estudiante, un repositorio, un proyecto"**
`garcia_self_coded…8fef58f2` · nodo `ba2fa258` · p. 0 — Portafolios digitales como evaluación en ABP; el estudio parte de que *"students exert minimal effort in creating digital portfolios because they find the writing component unchallenging"*, y propone en su lugar el portafolio **autocodificado**. Contexto (nodo `7cac84dd` · p. 3): FEU Institute of Technology, Manila (Filipinas), programa de TI de cuatro años.
> **Es la única fuente del vault cuya cohorte es un curso de diseño y desarrollo web.** Todo lo demás es programación general o ciencia de datos. Coincidencia temática directa con nuestro proyecto integrador.

**2 · Metodología docs-first (plan antes que código) — con matiz importante**
`phung_et_al…ea8cf54c` · nodo `bdd21a1f` · p. 0 y nodo `cc62b45e` · p. 5 — Sistema de pistas organizado en fases metacognitivas (planificación, monitorización, evaluación). El dato preciso de resultados: *"debugging hints being requested the most, followed by planning hints, while optimization hints were rarely used"*.
> ⚠️ **Corrección de una lectura previa de esta guía.** Una pasada anterior afirmó que las pistas de planificación eran las más solicitadas. El nodo de resultados dice que **las más solicitadas son las de depuración**, seguidas de planificación. Lo que sí sostiene la fuente es que la planificación recibe mayor tiempo de contemplación y que la **optimización casi no se solicita nunca** — de ahí que el rendimiento deba imponerse curricularmente (Frontend II, Bloque 4) y no esperarse.

**3 · IA con validación crítica y defensa oral**
`liu_fan_pan…dc2bd27d` · nodo `1db27080` · p. 1 — La pregunta que estructura el curso: *"do they reflect genuine learning facilitated by effective scaffolding, or do they co-occur with superficial dependency enabled by cognitive offloading?"*, en marco vygotskiano.
Voz estudiantil (`verbatim_quote`), nodo `c3157096` · p. 12:
> *"I got good grades on all the projects, but now I have the final exam next week without Copilot… and honestly, I'm terrified. I'm not sure what I actually know."*

Y la presión de plazo, nodo `674ecb42` · p. 8: *"when it's 2 AM and the project is due at 9 AM… I'm not trying to learn anymore, I'm just trying to finish."*
> Justificación empírica de la **defensa oral**: sin ella, la calificación mide entrega, no comprensión — y el propio alumnado lo sabe.

**4 · Acceso escalonado a la IA en evaluación**
`singh_et_al…37173a2a` · nodo `56059570` · p. 0 (*"Hint-Writing with Deferred AI Assistance: Fostering Critical Engagement"*) y nodo `95f7d0fa` · p. 5, que analiza si el alumnado **detecta errores omitidos por la pista de GPT** o **descarta la pista**. Modelo directo para estructurar el acceso a IA en pruebas.

**5 · La IA asiste sin resolver**
`kazemitabaar…23259ff1` · nodo `c2a108d2` · p. 0 — *"LLM-powered tools like ChatGPT offer instant support, but reveal direct answers with code, which may hinder deep conceptual engagement"*; CodeAid entrega ayuda **sin revelar la solución**. Respalda enseñar la IA como andamiaje, no como oráculo.

**6 · Accesibilidad como alfabetización, no checklist**
`digital_accessibility_literacy…91241359` · nodo `89cdb78b` · p. 1 — *"Central to literacy concepts is the individual's ability to encode and decode… a person should be able to read (decoding) and write (encoding)"*, trasladado a la accesibilidad. Nodo `af211774` · p. 2: la alfabetización integra *"awareness raising, technical standards, inclusive design practices, and the consideration of user feedback"* de forma continua. Nodo `0832db64` · p. 0 diagnostica que *"a discourse on a pedagogical culture for teaching digital literacy is still lacking"*.

**7 · El profesorado es el cuello de botella — y discrepa**
`teaching_digital_accessibility…d57634a5` (Parthasarathy & Joshi, 2024, ICER, DOI `10.1145/3632620.3671122`), voces docentes:
- nodo `5c396979` · p. 7 — *"As a computer science teacher… I [should] also know what should be taught"* (P7): el profesorado pide formarse primero.
- nodo `49ac62fd` · p. 6 — *"lack of awareness, people who are designing need to have an idea about accessibility… inclusive design is not practiced"* (P12).
- nodo `b2fc2c85` · p. 6 — **contraargumento explícito**: parte del profesorado considera que la empatía *"is not an appropriate learning outcome for CS courses"*.
> Se cita el desacuerdo a propósito. Esta guía adopta la posición ética-y-empática, pero el alumnado debe saber que **está en disputa dentro del propio campo**; eso es enseñar críticamente y no doctrina.

**8 · La auditoría WCAG es trabajo de campo real, no simulacro**
`batista_baluz…0d28c6a5` · nodo `301dc884` · p. 0 — webs universitarias brasileñas frente a WCAG 2.1, con *"the absence of alternative text"* y contraste inadecuado como fallos recurrentes.
`correa_vitoriano_llanos…ac71e73e` · nodo `0b8e3a74` · p. 0 — SIGAA y el modelo **eMAG**; el estudio investiga por qué persisten las carencias pese al marco normativo.
> Los errores que el alumnado detecta y corrige en clase son exactamente los que el sector sigue cometiendo.

**9 · Declaración de uso de IA: integridad que se forma**
`gonzalez_videgaray…078b0a6a` · nodo `fbe705f2` · p. 6 — el uso legítimo de la IA generativa entendido como *"asistencia situada dentro de la Zona de Desarrollo Próximo propuesta por Vygotsky"*, actuando como *"par más capaz"*. Nodo `d22a81d1` · p. 4 para la definición operativa de plagio.
> Enlaza con Liu (vygotskiano): un mismo marco teórico sostiene el andamiaje y la integridad. La declaración de IA es formación, no vigilancia.

**10 · Rango curricular de la web**
`3664191_da20f30d` (CS2023) · nodo `ae35ed39` · **p. 265** — la unidad existe como *"SPD-Web: Web Platforms (2 hours)"*.
> Dato con filo: el currículo internacional de referencia dedica **2 horas** a plataformas web dentro de *Specialized Platform Development*. Legitima el área **y** justifica que una titulación de desarrollo web necesite asignaturas propias: 2 horas no forman a nadie.

**11 · Contexto iberoamericano**
`digital_education_council…20489b0b` · nodo `b15014c1` · p. 2 — *"A clear majority of students (65%) worry about AI leading to shallow learning and an absence of fairness in assessment (56%)"*.
> El alumnado **pide** evaluación justa ante la IA. La defensa oral y la declaración de uso responden a una demanda estudiantil documentada, no solo a una preocupación docente.
Respaldo regional adicional: `cepal…48ba6c8d` · nodo `769a6e2c` (competencias digitales en América Latina y el Caribe) · `goncalves…2fab894b` · nodo `718bf891` (revisión sistemática de enseñanza de programación en Brasil) · `neves_oliveira…68dbfea1` · nodo `ca72455e` (informática K-12 en Portugal) · `rcs…91103623` · nodo `9fabe333` (revisión sistemática sobre IA generativa en enseñanza de matemáticas y programación).

### Disciplina de alcance (declarada, no disimulada)

- **Solo Garcia** tiene cohorte de **diseño y desarrollo web**; en Filipinas, no en España.
- **Phung, Singh, Kazemitabaar y Liu** son de **programación general o ciencia de datos**, no de front-end. Su transferencia a este contexto es una decisión razonada, no un hallazgo replicado.
- **Parthasarathy & Joshi** recoge percepciones docentes en **India**; **Batista, Correa** son de **Brasil**. No hay evidencia extraída de cohortes españolas en el vault.

### Lagunas del vault (declaradas, no rellenadas)

- **Módulos 1 y 2 (CSS3 avanzado, JavaScript, asincronía):** ninguna fuente extraída sobre su enseñanza. Se sostienen en práctica profesional y documentación de plataforma.
- **Coste energético y climático del código:** ninguna fuente en el vault. Compromiso razonado, no hallazgo citado; sin cifras inventadas.
- **Marco legal español (RD 1112/2018 y equivalentes):** **no ingerido**. El único apoyo normativo extraído es indirecto — eMAG (Brasil) vía Correa. Invocar obligación legal española exige una pasada de corpus propia.
- **Calidad bibliográfica desigual:** los coats de Liu (`TI - Abstract`), Phung y Singh (`TI - 1 Introduction`) y CodeAid (`TI - Paul Denny`) tienen metadatos imperfectos. Se citan por coat y nodo, y **no se han fabricado citas más limpias de lo que RIS/`metadata` sostienen**. Coats con metadatos completos: Garcia (DOI `10.3390/educsci15091150`), Parthasarathy & Joshi (DOI `10.1145/3632620.3671122`), CS2023 (Kumar, Eaton et al.).
