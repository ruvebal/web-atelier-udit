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

## Fundamentación académica de las decisiones curriculares

_Añadido 2026-08-10. Mapea cada decisión de diseño a la evidencia que la respalda. **Fuentes exclusivamente del vault ahmes del proyecto** (`profield/runs/frontend-pedagogy/01/pdfs` y `pdfs-ibero`), leídas en texto completo. No se cita nada fuera del vault, y se declara explícitamente dónde el vault **no** respalda una decisión._

| Decisión curricular | Evidencia (vault) | Qué respalda exactamente |
| --- | --- | --- |
| **Módulo 3 — accesibilidad como práctica ética**, no checklist final | Fisseler (2024) | La alfabetización en accesibilidad abarca *"both the creation (encoding) and interpretation (decoding) of accessible digital content"*, y su enseñanza *"improves technical skills and instills ethical and social responsibility"*. Cita a Lewthwaite y Sloan: es *"a socio-technical challenge that is primarily about the problem of teaching empathy"*. |
| **Módulo 3 — enseñarla es la excepción, no la norma** | Fisseler (2024); Bhatt & Joshi / educadores en India (ICER '24) | Fisseler reporta que solo ~**15%** del profesorado encuestado enseña accesibilidad digital. El estudio en India documenta las perspectivas del profesorado sobre por qué no se enseña. Justifica que este módulo exista y no se delegue. |
| **Módulo 3 — auditoría WCAG sobre sitios reales** como actividad | Batista & Baluz (2025); Correa, Vitoriano & Llanos (2025) | Batista evalúa webs universitarias brasileñas contra **WCAG 2.1** con la herramienta QualWeb: fallos recurrentes de **textos alternativos ausentes y contraste inadecuado** — exactamente los errores que el alumnado puede detectar y corregir. Correa evalúa **SIGAA, usado por 39 instituciones de educación superior**, y constata que las carencias persisten *"even after 20 years of eMAG"*, con metodología *living lab* junto a estudiantes con discapacidad visual. La auditoría no es un ejercicio ficticio: es el estado real del sector. |
| **Proyecto integrador — portafolio autocodificado** | Garcia (2025) | **Coincidencia temática directa**: 176 estudiantes de grado en un *"website design and development course"*, con tareas semanales de código que culminan en un **portafolio autocodificado** bajo aprendizaje basado en proyectos. Es el diseño de nuestro proyecto integrador y del lema *"un estudiante, un repositorio, un proyecto"*. |
| **Semestre 2 — metodología docs-first** (plan antes que código) | Phung et al. (2025) | 102 estudiantes; entre pistas de *planning*, *debugging* y *optimization*, las de **planificación fueron las más solicitadas y se asocian consistentemente con mejores calificaciones**. Respaldo empírico directo de exigir plan antes de implementar. |
| **Semestre 2 — IA con validación crítica** | Liu, Fan & Pan (2026) | Nombra dos fallos evaluables que este curso combate: *"Trust-but-Can't-Verify"* en principiantes y *"Boilerplate Blindspot"* en avanzados, junto a *"attenuated meta-cognitive calibration — a mismatch between perceived readiness and independent capability"*. Es la justificación de la defensa oral. |
| **Semestre 2 — asistencia diferida y escritura de pistas** | Singh et al. (2026) | Compara escribir pistas de forma independiente, con IA a demanda y con **IA diferida**; la tarea fuerza depuración, pensamiento crítico y reflexión. Modelo para estructurar el acceso a la IA en evaluación. |
| **Semestre 2 — despliegue de asistente de IA en aula** | Kazemitabaar et al. (2024), CHI | Despliegue real en aula de un asistente LLM: evidencia de qué ocurre cuando la IA es ambiente, no excepción. |
| **Declaración de uso de IA e integridad** | González-Videgaray et al. (2026) | En el ámbito hispanohablante: la integridad académica es *"una actitud sustentada en un sistema de valores colectivo que debe formarse, preservarse y fomentarse"* — **formarse**, no solo vigilarse. Respalda declarar y evaluar el uso de IA en lugar de prohibirlo. |
| **Pertinencia regional del enfoque** | CEPAL (2024); Digital Education Council (2026); Gonçalves et al. (2025); Neves & Oliveira (2024); RCS (2026) | Competencias digitales en América Latina y el Caribe; encuesta sobre IA en educación superior en LATAM; revisión sistemática de la enseñanza de programación en Brasil; experiencia de informática K-12 en Portugal; revisión sistemática sobre IA generativa en la enseñanza de matemáticas y programación. Sitúan las decisiones en el espacio iberoamericano, no solo anglosajón. |
| **Rango curricular** (web y accesibilidad como núcleo) | CS2023 | Legitimidad curricular internacional para tratar plataformas web y accesibilidad como área de conocimiento, no como optativa. |

**Dónde el vault NO respalda el diseño — declarado, no rellenado.**

- **Módulos 1 y 2 (CSS3 avanzado, JavaScript y asincronía):** el vault no contiene investigación educativa sobre enseñanza de CSS moderno, layout o asincronía en JavaScript. Estos módulos se sostienen en la práctica profesional y en documentación de plataforma (MDN), no en evidencia empírica. Es una laguna real del campo, no un descuido de esta guía.
- **Coste energético y climático del código** (véase *Fundamento Pedagógico*): el vault no contiene ninguna fuente sobre energía o huella de carbono de la computación. Se mantiene como **compromiso razonado, no como hallazgo citado**, y no se acompaña de cifras inventadas.
- **Marco legal de accesibilidad** (RD 1112/2018 y equivalentes): no hay instrumentos legales en el vault. El único apoyo disponible es indirecto — Correa et al. discuten **eMAG** (Brasil) como marco normativo. Si esta guía va a invocar obligación legal española, requiere una pasada de corpus propia.

**Referencias (todas leídas del vault)**

- ACM/IEEE-CS/AAAI (2023). *Computer Science Curricula 2023.* DOI: `10.1145/3664191`
- Batista, H. E. N., & Baluz, R. A. R. S. (2025). *Evaluation of Higher Education Institution Websites According to WCAG 2.1… Brazil.* iSys, 18(1).
- Correa, M., Vitoriano, M. A., & Llanos, C. H. (2025). *Web Accessibility in an Academic Management System in Brazil.* Informatics, 12(3), 63.
- CEPAL/ECLAC (2024). *Digital competences in Latin America and the Caribbean.*
- Digital Education Council (2026). *AI in Higher Education — LATAM Survey 2026.*
- Fisseler, B. (2024). *Digital Accessibility Literacy.* ASSETS 2024 Workshop.
- Garcia, M. B. (2025). *Self-Coded Digital Portfolios as an Authentic Project-Based Learning Assessment in Computing Education.*
- Gonçalves, S. C. L., et al. (2025). *Programming in Brazilian Higher Education and High School: A Systematic Literature Review.*
- González-Videgaray, M. del C., et al. (2026). *Integridad académica y plagio en la educación superior: disrupción de la IA generativa.* FIGURAS, 7(2).
- Kazemitabaar, M., et al. (2024). *CodeAid: Evaluating a Classroom Deployment of an LLM-based Programming Assistant.* CHI 2024.
- Liu, D., Fan, G., & Pan, L. (2026). *Tool, tutor, or crutch?* Int. J. STEM Education, 13:10.
- Neves, F. L., & Oliveira, J. N. (2024). *First Steps towards K-12 Computer Science Education in Portugal.*
- Phung, et al. (2025). *Plan More, Debug Less.* AIED 2025.
- RCS (2026). *IA generativa para la enseñanza de matemáticas y programación en educación superior: revisión sistemática.*
- Singh, et al. (2026). *Hint-Writing with Deferred AI Assistance.*
- *Teaching Digital Accessibility in Computing Education: Views of Educators in India* (ICER '24).
