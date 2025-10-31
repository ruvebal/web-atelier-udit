---
layout: lesson
title: 'Diseño Web: Responsive, Fluido e Intrínseco'
title_alt: ''
slug: responsive
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/responsive/
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## Introducción y Contexto

> Good designers and developers are innovative by nature, and as more and more content makers begin to play with intrinsic the design, the more stunning and jaw dropping their creations will become. — **Danny Decker**[^1]

El **diseño web responsive** se refiere a la creación de sitios capaces de proporcionar una experiencia de usuario óptima en una amplia variedad de dispositivos, desde ordenadores de escritorio hasta teléfonos móviles[^2].

En la actualidad, existen cientos de tamaños de pantalla diferentes utilizados por los usuarios; de hecho, en un sitio web con suficiente tráfico pueden registrarse **más de 1.000 resoluciones distintas**[^3]. Esta enorme diversidad —que incluye no solo PCs y smartphones, sino también tablets, televisores 4K, wearables y pantallas integradas en dispositivos del IoT— hace **indispensable** que los diseñadores adopten enfoques adaptativos. Un diseño que no se adapte a diferentes pantallas puede ofrecer una experiencia deficiente o incluso volverse inutilizable en ciertos dispositivos. Por ello, las técnicas de diseño **responsive** (adaptativo) y **fluido** se han vuelto fundamentales para garantizar la **accesibilidad y usabilidad** en el _ecosistema web moderno_.

**Objetivos de aprendizaje:**

- Comprender **por qué** surgió el diseño responsive y fluido, en el contexto del auge de dispositivos móviles y del Internet de las Cosas (IoT).
- Conocer la **evolución histórica** del diseño web adaptativo, desde los primeros _layouts_ fluidos y el uso de _media queries_ CSS, hasta técnicas modernas como **el diseño fluido** (`clamp()` et.al.) y **el diseño intrínseco** (`@container`)
- Aplicar de forma **práctica** técnicas modernas de CSS —`media queries`, `container queries`, `style queries` función `clamp()`, unidades relativas (`em`, `rem`, `vw`, `vh`, `%`, etc.)— para crear diseños fluidos y adaptativos en HTML/CSS **sin usar frameworks**.
- Reflexionar sobre las **ventajas y limitaciones** de cada técnica (diseño responsive _vs_ fluido) y las posibilidades de **combinarlas** en proyectos reales.

## Fundamentos del Diseño Responsive, Fluido e Intrínseco

### La necesidad del diseño adaptativo en la era multi-dispositivo

El crecimiento explosivo de dispositivos con acceso web a lo largo de las últimas dos décadas cambió por completo la forma de abordar el diseño de sitios. A inicios de los 2000, la mayoría de páginas se diseñaban pensando solo en monitores de escritorio con tamaños fijos; no se consideraba mayor variabilidad en las dimensiones de panta[^4]. Sin embargo, la llegada del **smartphone** (marcada por el lanzamiento del iPhone en 2007) inició una nueva era. En pocos años, millones de personas comenzaron a navegar en pantallas pequeñas y con orientación vertical, obligando a repensar los diseños web tradiciona[^5]. Pronto se sumaron **tablets**, lectores electrónicos, televisores inteligentes e incluso relojes, cada uno con distintas resoluciones y características de navegación.

Para 2015, el acceso móvil ya superaba al de escritorio en volumen de tráfico[^6], y empresas como Google empezaron a penalizar en posicionamiento a los sitios no optimizados para móviles (el llamado _"Mobilegeddon"_ de 20[^7]. En este contexto, surgió la **necesidad imperiosa** de que los sitios web fueran capaces de "adaptarse" al entorno del usuario en vez de forzar al usuario a adaptarse al sitio (p. ej., haciendo _zoom_ constantemente en el móvil). Así, el diseño adaptativo se convirtió en una **estrategia crucial** para llegar y fidelizar a la audiencia moderna en la era multi-dispositivo[^8].

### Breve evolución histórica: de layouts fijos a grids fluidos y _responsive design_

En los primeros días de la web, los layouts solían ser **estáticos o fijos**: definidos en píxeles, con un ancho rígido pensado para pantallas de ~800px o 1024px de ancho. Esto generaba experiencias pobres fuera de ese rango (barras de desplazamiento horizontal en pantallas pequeñas, o enormes márgenes vacíos en pantallas grandes).

A medida que aparecieron más tamaños de pantalla, se exploraron alternativas. Antes de la popularización del término _responsive_, hubo intentos de **diseño líquido o fluido** (_liquid layouts_), donde las anchuras se definían en porcentajes o en `em` (unidades relativas) en lugar de píxeles. La idea era que la página se estirara o encogiera para rellenar el espacio disponi[^9]. Aunque este enfoque fluido funcionaba bien en ciertos rangos (ej. tablets o monitores medianos), se encontraron problemas en los extremos: en pantallas muy grandes las imágenes y elementos podían ampliarse excesivamente, y en pantallas muy pequeñas el texto resultaba diminuto e ilegi[^10]. Se intentó mejorar introduciendo anchuras máximas y mínimas para el contenedor, pero eso reintroducía zonas vacías en pantallas enormes o provocaba de nuevo _scroll_ horizontal en pantallas ultra peque[^11]. En paralelo, también surgió el llamado **diseño adaptativo (Adaptive Web Design)**, que consistía en preparar **plantillas estáticas múltiples** para diferentes tamaños (por ejemplo, un diseño específico para móvil, otro para tablet, otro para desktop) y elegir cuál mostrar según el dispositivo o el ancho detectado[^12]. Si bien el adaptativo permitía cierto grado de optimización por dispositivo, implicaba mantener varias versiones del sitio (mayor costo) y a menudo brindaba una experiencia inconsistente —por ejemplo, versiones móviles recortadas en contenido o funcionamiento[^13]—.

El gran salto ocurrió en **mayo de 2010**, cuando el diseñador Ethan Marcotte publicó en _A List Apart_ el artículo **"Responsive Web Design"**, acuñando el término y proponiendo una nueva metodolo[^14]. Marcotte integró varias ideas: el uso de **grillas fluidas** y **imágenes flexibles** combinado con las recién estandarizadas **media queries de CSS3**. En un artículo previo (2009) ya había introducido el concepto de _fluid grids_, explicando cómo convertir un diseño de píxeles a porcentajes relativos tomando como base el tamaño del texto del navegador[^15]. Ahora, con las media queries, era posible aplicar diferentes reglas CSS según las características del dispositivo (ancho de pantalla, orientación, resolución, etc.). En resumen, **Responsive Web Design (RWD)** implicaba construir una sola página capaz de **reorganizar su layout y escalar sus elementos fluidamente** para verse bien en cualquier dispositivo[^16].

Esta aproximación _"One Web"_ unificada resultó ser la más viable: en lugar de múltiples sitios, uno solo que "respondía" al entorno. Las técnicas clásicas de RWD se resumen en: **rejillas fluidas** (columnas dimensionadas en % en lugar de[^17], **imágenes flexibles** (imágenes con max-width: 100% para que no sobrepasen su contenedor[^18], y **media queries CSS** para aplicar cambios de diseño en puntos de quiebre (_breakpoints_) específicos[^19]. Esta filosofía se extendió rápidamente: para 2013–2015 se volvió un estándar de la industria, apoyada por metodologías como _mobile-first_ (diseñar primero para móvil e ir "escalando" hacia desktop) y frameworks populares (Bootstrap, Foundation, etc.) que incorporaron rejillas responsivas.

En los últimos años ha surgido un enfoque cada vez más **intrínseco y fluido** del diseño web adaptable. No se trata de abandonar por completo los _breakpoints_, sino de dejar que CSS haga más trabajo continuo por nosotros. Por ejemplo, la tipografía y los márgenes pueden definirse con `clamp()` y unidades relativas, reduciendo mucho las media queries necesarias[^20]. De igual modo, las **container queries** y las recién aparecidas **style queries** permiten que los componentes se adapten a su contexto inmediato.

**Resumiendo la evolución:**

- _1990s–2000s:_ Layouts fijos en píxeles (pensados para ~800px–1024px).

- _2005–2010:_ Layouts líquidos (“fluidos”) con `%` y `em`.

- _2010:_ Ethan Marcotte publica _“Responsive Web Design”_, proponiendo rejillas fluidas, imágenes flexibles y media queries CSS3.

- _2013–2015:_ Metodologías _mobile-first_ y frameworks (Bootstrap, Foundation) consolidan el RWD en la industria.

- _2020:_ CSS Grid y Flexbox son ampliamente soportados; surgen funciones CSS avanzadas como `minmax()`, `clamp()`, unidades `vw/vh`.

- _2023–2025:_ Adopción de **Container Queries** y **Style Queries** en navegadores; auge del **diseño intrínseco**.

### Diseño Responsive, Fluido e Intrínseco

Es común confundir los términos, ya que todos se refieren a lograr que la interfaz se adapte. En esta guía los distinguiremos así:

- **Diseño Fluido (o "líquido")**: Todas las dimensiones en la hoja de estilo se definen con **unidades relativas** (%, `em`, `rem`, `vw`, etc.) en lugar de valores fijos en píxeles. De este modo, el diseño escala de forma continua cuando el usuario redimensiona la ventana o cambia de dispositivo. Un layout fluido _puro_ evita utilizar cualquier anchura fija mientras no sea necesario[^21]. Por ejemplo, una columna podría ocupar `50%` del ancho del contenedor en lugar de, digamos, `400px`. Si el contenedor crece, la columna crece proporcionalmente. La ventaja es un aprovechamiento máximo del espacio en cada tamaño y transiciones **suaves**, sin "saltos" bruscos. Sin embargo, como vimos, un fluido puro puede llevar al extremo de elementos desproporcionados (texto demasiado pequeño en móvil, líneas de texto excesivamente largas en pantallas XXL, etc.). La solución moderna incorpora **límites**: es habitual combinar el fluido con valores _mínimos_ y _máximos_ para ciertos elementos clave. Por ejemplo, se puede permitir que un título escale con la pantalla pero fijando un mínimo de 16px para que nunca sea ilegible en un telé[^22]. En suma, el diseño fluido busca que todo _fluya_ proporcionalmente al espacio disponible, manteniendo algunos topes para garantizar usabilidad.

- **Diseño Responsive (Responsivo o Adaptativo)**: En sentido estricto, _responsive web design_ es un enfoque amplio que engloba varias técnicas (de hecho, un buen diseño responsivo suele incluir componentes fluidos). A efectos de comparación, podemos definir el enfoque responsive típico como aquel que utiliza **puntos de corte (breakpoints)** con **media queries CSS** para reorganizar o redimensionar elementos en ciertos anchos predefinidos. Fuera de esos puntos, a veces las dimensiones permanecen fijas. Por ejemplo, un sitio podría mostrarse con un ancho fijo de 1200px en pantallas grandes, pero al bajar de 992px de ancho aplicaría una media query para pasar a un ancho de 100% (fluido) o a una columna; luego a menos de 768px otra media query para reorganizar aún más (menú colapsado, etc.). Este sería un enfoque _responsive adaptativo clásico_, a veces llamado **diseño adaptativo** en español cuando se enfatiza el uso de breakpoints. La web “salta” o **cambia de diseño en ciertos umbrales** en lugar de ajustar cada píxel continuamente. Bien ejecutado, el responsive puede ofrecer diseños muy optimizados por tramo de tamaños, mostrando u ocultando elementos según convenga a cada formato. No obstante, si se abusa de valores fijos y solo se confía en unos pocos breakpoints, es posible que entre esos puntos existan rangos subóptimos (por ejemplo, 801px ancho versus 799px podría dar experiencias bastante diferentes si solo hay un corte justo en 800px).

- **Diseño Intrínseco (Intrinsic Design):** En este enfoque **el propio contenido conforma el layout**, en lugar de adaptarse pasivamente a él[^23]. Con CSS Grid y Flexbox se crean diseños basados en el _tamaño intrínseco_ del contenido: áreas con contenido grande ocupan más espacio y las pequeñas se ajustan proporcionalmente[^24]. Esto permite interfaces "elásticas" que minimizan hacks y media queries: por ejemplo, usando `grid-template-columns: minmax(min-content, 1fr)` se deja que las columnas crezcan según su contenido[^25]. El diseño intrínseco busca que el layout sea más natural y **autoajustable**, reduciendo los saltos abruptos entre breakpoints.

**Similitudes y combinación:** Tanto el diseño responsive como el fluido persiguen el mismo fin: que la página se **adapte a múltiples tamaños** de pantalla. De hecho, no son excluyentes, sino complementarios. El diseño responsivo _moderno_ suele incorporar fluidez en muchos elementos, y solo utiliza breakpoints cuando es necesario cambiar la disposición general. En palabras de algunos autores, el diseño fluido es realmente una forma de diseño responsive, en la cual se evitan tamaños fijos siempre que se pueda[^26]. En la práctica, un enfoque recomendado es usar **fluidez por defecto** (layouts basados en porcentajes o `fr` de Grid, texto e imágenes escalables) y aplicar **media queries** para ajustes más drásticos de la estructura o para limitar esa fluidez en extremos. Gracias a esto obtenemos una experiencia más suave _entre_ breakpoints, evitando huecos muertos, y garantizamos a la vez una presentación apropiada en cada rango de dispositivos[^27].

**¿Cuándo usar uno u otro?** Realmente no se trata de escoger entre "responsive vs fluido vs elástico", sino de cuánto énfasis dar a cada estrategia. Si nuestro contenido es relativamente simple y puede reorganizarse en una sola columna en móvil, podríamos optar por un diseño muy fluido con mínimos breakpoints. Por otro lado, si diseñamos una interfaz muy compleja (ej: una aplicación web) podríamos necesitar múltiples breakpoints y ciertos elementos con tamaños fijos mínimos para mantener consistencia. En general, hoy en día se aconseja **combinar**: usar fluidez siempre que mejore la experiencia (tipografías, contenedores que escalen, etc.) y utilizar puntos de quiebre para cambios de layout o para mantener la legibilidad y la estética. Exploraremos cómo lograr esta combinación en la práctica.

### Tendencias actuales: ¿diseño fluido vs responsive? ¿Hacia dónde vamos?

En el panorama de 2024-2025, vemos una convergencia interesante: tras años de consolidación del diseño responsive, están ganando protagonismo enfoques que podríamos llamar "fluidos" o **diseño _intrínsecamente_ responsivo**. Esto no significa desechar los breakpoints, sino que muchas cosas que antes solo se resolvían con media queries hoy se logran con técnicas fluidas o nuevas funcionalidades de CSS:

- **Fluidez en tipografía y espaciados:** Como ya practicamos, el uso de `clamp()` con unidades relativas ha reducido la necesidad de escribir varias media queries para cosas como ajustar el tamaño de letra, márgenes o anchos de columna. Esto simplifica el CSS y crea transiciones más suaves. En cierto modo, el **diseño fluido está sustituyendo parcialmente al responsive tradicional** en esos aspectos micro: ya no necesitamos breakpoints para cada tamaño de texto, porque las fuentes son líquidas por naturaleza[^35]. Muchos sitios modernos adoptan esta "tipografía fluida" para mejorar la consistencia visual en cualquier dispositivo sin saltos notables.

- **Container Queries:** Una de las adiciones más esperadas a CSS (ya disponibles en navegadores modernos) son las _container queries_. Si las media queries tradicionales basan las condiciones en el viewport (global), las container queries permiten que un componente adapte su estilo según el tamaño de su **contenedor padre** específico. Esto es revolucionario para diseño _responsive_ de componentes reutilizables. Por ejemplo, un widget de card podría tener diferentes disposiciones de sus elementos internos si su contenedor es ancho o estrecho, independientemente del tamaño global de la página. Las container queries complementan al diseño fluido, haciendo posible un responsive _contextual_. A medida que se estandaricen, veremos patrones de diseño aún más modulables.

- **Intrinsic Web Design:** En los últimos años ha surgido un cambio hacia lo que la experta Jen Simmons denomina Intrinsic Web Design – crear componentes conscientes de su contexto, capaces de adaptarse según el espacio disponible donde se ubiquen[^36]. Las nuevas especificaciones de CSS, especialmente Container Queries y Subgrid, hacen posible este enfoque intrínseco al permitir diseños responsive a nivel de componente. Estas características representan el siguiente paso evolutivo del diseño responsivo, solucionando problemas históricos que afrontábamos con hacks o JavaScript.

- **Otras tendencias:** El _Responsive Web Design_ sigue evolucionando con la tecnología: el aumento de dispositivos plegables (foldables), por ejemplo, introduce conceptos de diferentes ventanas en un mismo dispositivo; la integración con plataformas de TV o vehículos requiere pensar en distancias de visualización distintas; y la accesibilidad enfatiza adaptar no solo al tamaño sino a las necesidades del usuario (zoom, contrastes, motion preferences). También, la llegada de herramientas como **CSS Nesting**, **CSS Layers**, etc., facilitan manejar CSS complejo de forma organizada, lo cual es útil cuando combinamos muchas condiciones responsivas.

En resumen, **lo fluido no reemplaza a lo responsive, sino que lo enriquece**. Seguiremos definiendo breakpoints para cambios de layout mayores, pero probablemente necesitaremos menos breakpoints "menores" porque dejaremos que CSS haga el trabajo continuo por nosotros en cuestiones de tamaños relativos. La tendencia es lograr interfaces más "**elásticas**" (término que a veces se usa), que se sientan naturales en cualquier entorno sin evidenciar puntos de corte bruscos.

### Ventajas y limitaciones: comparativa de enfoques

Para afianzar conceptos, hagamos una **comparativa** de las ventajas, desventajas y consideraciones de cada técnica:

- **Media Queries (Responsive clásico):**

  - _Ventajas:_ Permiten **control granular**: podemos reordenar, mostrar/ocultar elementos, cambiar estilos completamente en diferentes rangos de pantalla. Son muy poderosas para adaptar el **layout** y contenido a cada contexto (ej: un menú diferente en móvil). Fácil de entender: "a tal ancho, aplica estos estilos".
  - _Limitaciones:_ Requieren anticipar puntos de corte; si aparece un nuevo tamaño intermedio puede que tengamos que ajustar el CSS. Pueden generar experiencias _discretas_ (saltos). Un abuso de media queries complica el mantenimiento (CSS largo y fragmentado por breakpoints). No resuelven bien la adaptación _continua_ dentro de un rango (solo antes/después del corte).
  - _Cuándo usarlas:_ Siempre que necesitemos **cambios drásticos** de layout o estilos que no se logren solo con valores fluidos. Por ejemplo, cambiar de un menú horizontal a uno tipo hamburguesa en móvil, o pasar de un diseño multi-columna a uno de una columna. También para aplicar estilos totalmente diferentes en orientación paisaje vs retrato, etc.

- **Diseño Fluido (unidades relativas, %):**

  - _Ventajas:_ **Simplicidad** en muchos casos: usar % y dejar que el navegador calcule. Garantiza uso óptimo del espacio a cualquier resolución (no hay "espacios muertos" fuera de breakpoints). Menos CSS condicionado; a veces con una sola regla en % logras adaptarte a mil tamaños. Mejora la sensación visual, evitando que el usuario note cambios abruptos. Ideal para elementos **proporcionales** (ej. un gráfico que siempre debe ocupar el 100% del contenedor).
  - _Limitaciones:_ Sin puntos de anclaje, puede provocar **problemas de usabilidad** en extremos: si todo es completamente líquido, en pantallas enormes el contenido puede volverse demasiado expandido (líneas de texto muy largas, imágenes gigantes) y en pantallas minúsculas todo se aprieta[^37]. Requiere pensar en **límites** (min/max) para no romper el diseño. Además, no puede por sí solo reorganizar profundamente el layout (por ej., no convierte automáticamente un menú horizontal en vertical; eso necesita una media query o flex-direction condicional).
  - _Cuándo usarlo:_ En **componentes escalables** donde una adaptación continua es deseable: textos, cajas, márgenes, elementos que simplemente deben agrandarse o achicarse según espacio. Úsalo para el _99% del tiempo_ en que la página está entre los breakpoints principales. En general, comienza tus estilos usando unidades relativas y solo añade breakpoints si detectas que en cierto punto algo deja de verse bien.

- **Función `clamp()` y unidades viewport (`vw`, etc.):**
  - _Ventajas:_ Traen lo mejor del fluido con la seguridad de límites. `clamp()` en particular reduce muchas media queries a una sola regla[^38]. Facilita la creación de componentes truly **responsive-by-definition** (ej: un título con `clamp()` ya "sabe" adaptarse en cualquier escenario). Las unidades de viewport permiten relacionar elementos con el tamaño real de pantalla (útil para fullscreen sections, por ejemplo un banner que siempre ocupa 100vh del viewport).
  - _Limitaciones:_ Pueden ser un poco **contraintuitivas** al inicio (hay que elegir bien los valores de vw y límites para lograr el efecto deseado, a veces ensayo y error). Abusar de unidades de viewport en elementos dentro de contenedores pequeños podría llevar a incoherencias (ej: usar `vw` para algo dentro de un sidebar estrecho no tiene en cuenta el sidebar, mejor usar `%` en ese caso). En navegadores móviles, `vh` puede tener comportamientos peculiares debido a la barra de direcciones dinámica.
  - _Cuándo usarlos:_ `clamp()` para cualquier propiedad que quieras que sea fluida pero **acotada**. _Viewport units_ para dimensiones globales o elementos que dependan del tamaño de ventana completo (fondos, tipografías principales, etc.), con precaución de combinar con `clamp` o `minmax` según necesites.

En la práctica, un **buen diseño responsivo** combinará todo esto: usarás unidades relativas y clamp para muchas cosas, y tendrás algunas media queries estratégicas. El resultado debe ser un sitio que **responde** al entorno (responsive) pero de manera **flexible** (fluid) en todo momento, adoptando una mentalidad **elástica** donde cada componente es consciente de su contexto y se adapta intrínsecamente.

## Técnicas Modernas para Diseño Fluido

### Unidades relativas en CSS: la base del diseño fluido

El diseño fluido se basa en el uso de **unidades relativas** en lugar de valores fijos. Estas unidades permiten que los elementos se adapten proporcionalmente al tamaño de su contenedor o del viewport:

- **Porcentajes (`%`)**: Se calculan respecto al elemento padre. Útiles para anchos, alturas y márgenes que deben ser proporcionales.
- **Unidades de viewport (`vw`, `vh`, `vmin`, `vmax`)**: Se basan en el tamaño de la ventana del navegador. `1vw` = 1% del ancho del viewport.
- **Unidades relativas (`rem`, `em`)**: `rem` se basa en el tamaño de fuente del elemento raíz, `em` en el elemento padre.
- **Unidades de fracción (`fr`)**: Específicas de CSS Grid, distribuyen el espacio disponible proporcionalmente.

**Ejemplo práctico:**

```css
.container {
	width: 90%; /* 90% del contenedor padre */
	max-width: 1200px; /* Límite máximo */
	margin: 0 auto; /* Centrado */
	padding: 2rem; /* Espaciado relativo al tamaño de fuente */
}

.grid {
	display: grid;
	grid-template-columns: 1fr 2fr 1fr; /* Columnas proporcionales */
	gap: 2vw; /* Espacio entre elementos relativo al viewport */
}
```

### Tipografía fluida con CSS `clamp()`: textos que se adaptan sin saltos ✨

La función `clamp()` es una de las herramientas más poderosas para crear tipografía verdaderamente fluida. Permite definir un valor que se escala entre un mínimo y un máximo:

```css
/* Sintaxis: clamp(valor_mínimo, valor_preferido, valor_máximo) */
h1 {
	font-size: clamp(1.5rem, 4vw, 3rem);
	/* Escala desde 1.5rem hasta 3rem, usando 4vw como valor preferido */
}

p {
	font-size: clamp(1rem, 2.5vw, 1.25rem);
	line-height: clamp(1.4, 1.6, 1.8);
}
```

**Ventajas del `clamp()`:**

- **Sin saltos abruptos**: La transición es suave entre tamaños
- **Menos media queries**: Una sola regla reemplaza múltiples breakpoints
- **Mejor legibilidad**: Los textos siempre están en el rango óptimo
- **Mantenimiento simplificado**: Menos CSS condicionado

**Ejemplo avanzado con variables CSS:**

```css
:root {
	--text-xs: clamp(0.75rem, 1.5vw, 0.875rem);
	--text-sm: clamp(0.875rem, 2vw, 1rem);
	--text-base: clamp(1rem, 2.5vw, 1.125rem);
	--text-lg: clamp(1.125rem, 3vw, 1.25rem);
	--text-xl: clamp(1.25rem, 4vw, 1.5rem);
	--text-2xl: clamp(1.5rem, 5vw, 2rem);
	--text-3xl: clamp(2rem, 6vw, 3rem);
}

/* Uso consistente en toda la aplicación */
.title {
	font-size: var(--text-3xl);
}
.subtitle {
	font-size: var(--text-xl);
}
.body {
	font-size: var(--text-base);
}
```

### Layouts fluidos con CSS Grid y más técnicas modernas

Hasta ahora hablamos de diseños fluidos principalmente en términos de escalado continuo de tamaños. Pero **fluidez** también se puede aplicar a la composición general de la página utilizando las nuevas capacidades de CSS Layout:

- **CSS Grid Auto-fill/auto-fit:** Grid Layout nos permite crear rejillas **responsivas sin media queries** en ciertos casos. Por ejemplo, podemos tener un contenedor de tarjetas y queremos tantas columnas como quepan de 200px de ancho cada una. Usando `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));` logramos que el grid meta automáticamente más columnas fluidamente a medida que el espacio lo permite, y reduzca el número de columnas cuando el espacio es menor (colocando las tarjetas restantes en nuevas filas). Cada tarjeta en ese ejemplo tendría un mínimo de 200px (para no hacerse demasiado estrecha) y un máximo de 1fr (para llenar el espacio disponible). Esta técnica produce un efecto de reflujo adaptativo sin especificar puntos de corte explícitos.

- **Flexbox con `flex-basis` y `flex-grow`:** Similar al Grid, Flexbox puede crear layouts que se adaptan fluidamente. Con `flex: 1 1 200px` (que es `flex-grow: 1; flex-shrink: 1; flex-basis: 200px;`), los elementos crecerán para llenar el espacio disponible, se encogerán si es necesario, pero mantendrán un tamaño base de 200px. Esto es útil para crear barras laterales que se adapten al contenido o para distribuir elementos de manera proporcional.

- **Container Queries:** Una funcionalidad más reciente (aunque aún con soporte limitado en navegadores) son las _container queries_. A diferencia de las media queries que se basan en el tamaño del viewport, las container queries permiten que un componente se adapte según el tamaño de su **contenedor padre**. Esto es revolucionario para el diseño de componentes reutilizables: un widget de tarjeta podría tener un layout diferente si está en una barra lateral estrecha versus si está en el contenido principal, independientemente del tamaño de la pantalla. A medida que el soporte mejore, veremos patrones de diseño aún más modulables y verdaderamente "intrínsecos".

### Style Queries: La próxima evolución del diseño contextual 🆕

Las **Style Queries** representan la evolución natural de las Container Queries. Mientras que las Container Queries permiten que los componentes se adapten según el **tamaño** de su contenedor, las Style Queries permiten que se adapten según las **propiedades de estilo** del contenedor. Esto abre posibilidades completamente nuevas para el diseño contextual.

**¿Qué son las Style Queries?**

Las Style Queries permiten que un componente CSS responda a las propiedades de estilo de su contenedor, no solo a su tamaño. Esto es revolucionario porque permite una adaptación más contextual y semántica basada en el contexto visual.

**Ejemplo básico:**

```css
/* Contenedor con tema oscuro */
.theme-dark {
	--color-primary: #3b82f6;
	--color-surface: #1e293b;
}

/* Componente que se adapta al tema del contenedor */
@container style(--color-surface: #1e293b) {
	.card {
		background: var(--color-surface);
		color: white;
		border: 1px solid #374151;
	}
}

@container style(--color-surface: #f8fafc) {
	.card {
		background: var(--color-surface);
		color: #1e293b;
		border: 1px solid #e2e8f0;
	}
}
```

**Ventajas de las Style Queries:**

- **Contexto semántico**: Los componentes se adaptan al contexto de estilo, no solo al tamaño
- **Componentización avanzada**: Mejor encapsulación de estilos y comportamiento
- **Flexibilidad temática**: Permite sistemas de diseño más sofisticados con múltiples temas
- **Mantenibilidad**: Reduce la necesidad de clases utilitarias múltiples y JavaScript

**Estado del soporte (2025):**

- **Chrome 111+**: Soporte experimental con flag `--enable-blink-features=CSSContainerStyleQueries`
- **Firefox**: En desarrollo
- **Safari**: En desarrollo

**Ejemplo práctico - Sistema de componentes:**

```html
<!-- Componente que se adapta al tema del contenedor -->
<div class="theme-dark">
	<div class="card">
		<h3>Título de la tarjeta</h3>
		<p>Contenido que se adapta automáticamente al tema.</p>
	</div>
</div>

<div class="theme-light">
	<div class="card">
		<h3>Otra tarjeta</h3>
		<p>Mismo componente, diferente contexto de estilo.</p>
	</div>
</div>
```

```css
/* Las Style Queries permiten que .card se adapte automáticamente */
@container style(background-color: #1e293b) {
	.card {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}
}

@container style(background-color: #f8fafc) {
	.card {
		background: white;
		color: #1e293b;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
}
```

**Cuándo usar Style Queries:**

- **Sistemas de diseño complejos** con múltiples temas
- **Componentes reutilizables** que deben adaptarse al contexto visual
- **Aplicaciones con temas dinámicos** (modo oscuro/claro)
- **Librerías de componentes** que necesitan máxima flexibilidad

**Alternativas actuales mientras esperamos soporte completo:**

- CSS Custom Properties con JavaScript para detección de temas
- CSS-in-JS con context providers
- Clases utilitarias condicionales
- CSS Cascade Layers para organización de estilos

### Imágenes y otros elementos gráficos responsivos

Las imágenes son uno de los elementos más desafiantes en el diseño responsive, ya que necesitan adaptarse tanto en tamaño como en contenido:

- **Imágenes escalables:** La regla básica `max-width: 100%; height: auto;` hace que las imágenes se escalen proporcionalmente sin exceder su contenedor. Sin embargo, esto puede llevar a imágenes muy pequeñas en pantallas grandes o muy grandes en pantallas pequeñas. Una solución más sofisticada es usar la propiedad `object-fit` con dimensiones fijas: `width: 100%; height: 200px; object-fit: cover;` asegura que la imagen mantenga sus proporciones y llene el espacio asignado, recortando si es necesario.

- **Elemento `<picture>` y `srcset`:** Para un control más granular, el elemento `<picture>` permite especificar diferentes imágenes según el tamaño de pantalla o la densidad de píxeles. Esto es crucial para optimizar el rendimiento: cargar una imagen de 300px de ancho en un móvil y una de 1200px en desktop. El navegador selecciona automáticamente la imagen más apropiada.

- **SVGs y gráficos vectoriales:** Los SVG (gráficos vectoriales) son intrínsecamente escalables. Un SVG insertado en la página puede comportarse como "imagen flexible" sin pérdida de calidad. Asegúrense siempre de darles atributos de ancho/alto relativos o estilos CSS adecuados. Un truco: si embebemos SVG directamente en HTML, podemos usar CSS para controlar su tamaño como a cualquier elemento (ej: `width: 50%;`). Los iconos en SVG, por ejemplo, pueden ser coloreados o dimensionados con `em` para que acompañen al texto fluidamente.

- **Elementos embebidos (iframes, videos):** Para hacer un video de YouTube o un mapa de Google _responsive_, se suele envolver en un contenedor de relación de aspecto. Esto implica un poco más de CSS (usando porcentajes en padding para la relación 16:9, etc.). Es un detalle avanzado, pero mencionable: hay técnicas con `aspect-ratio` en CSS moderno que facilitan definir que un elemento debe mantener cierta proporción al redimensionar.

En nuestros ejemplos prácticos, nos enfocaremos en imágenes simples y SVG. Asegúrense siempre de probar cómo se comportan sus imágenes cuando la pantalla cambia de tamaño. Una imagen demasiado pequeña con `max-width:100%` puede pixelarse en pantallas grandes; una demasiado grande puede sobrepasar contenedores sin esa regla. **Verifiquen ambos extremos.**

## Ejercicios Prácticos: Progresión de Aprendizaje

| Ejemplo | Técnicas                     | Nivel      | Propósito              |
| ------- | ---------------------------- | ---------- | ---------------------- |
| **1**   | Media Queries + Flexbox      | Básico     | Fundamentos responsive |
| **2**   | Grid + Container Queries     | Intermedio | Técnicas modernas      |
| **3**   | SPA + Scroll-snap + Imágenes | Avanzado   | Proyecto completo      |

### 📂 Estructura de Archivos para Todos los Ejercicios

Para cada ejercicio, crea la siguiente estructura de archivos:

```
/responsive/
├── ejercicio-1.html              # HTML para Ejercicio 1
├── ejercicio-2.html              # HTML para Ejercicio 2
└── ejercicio-3.html              # HTML para Ejercicio 3

# CSS en la carpeta raíz (ya existe)
/assets/css/
├── index.css                     # CSS del tema del estudiante
├── ejercicio-1.css               # CSS específico para Ejercicio 1
├── ejercicio-2.css               # CSS específico para Ejercicio 2
└── ejercicio-3.css               # CSS específico para Ejercicio 3
```

**💡 Consejos para estudiantes:**

- Crea la carpeta `/responsive/` para los HTMLs
- Añade los archivos CSS específicos en `/assets/css/` (carpeta ya existente)
- Cada HTML tiene **dos enlaces CSS**:
  - `../assets/css/index.css` - Tema general del estudiante (ya existe)
  - `../assets/css/ejercicio-n.css` - CSS específico del ejercicio
- Puedes abrir cada archivo HTML en el navegador para ver el resultado
- El CSS específico sobrescribe los estilos del tema general cuando sea necesario

**⚠️ Recordatorios importantes:**

- **Git y binarios**: No incluyas imágenes, videos o archivos binarios grandes en Git. Usa [ImageKit.io CDN API](https://imagekit.io/) para optimización automática de imágenes
- **Enlaces CSS**: Los enlaces `../assets/css/` funcionan localmente, pero GitHub Pages despliega en un subdirectorio (`/name-of-repository/`), por lo que los enlaces absolutos se rompen en el despliegue remoto. Considera usar rutas absolutas desde la raíz del sitio para compatibilidad con GitHub Pages.

### Ejemplo práctico 1: Portafolio Responsivo Básico con Media Queries y Flexbox

Para entender los fundamentos del diseño responsive, vamos a crear un portafolio que utiliza las técnicas tradicionales pero efectivas. Utilizaremos **media queries** para adaptar el layout según el tamaño del viewport y **Flexbox** para crear layouts flexibles. Este será nuestro punto de partida que evolucionaremos en el Ejemplo 2.

**HTML:** Estructura de portafolio básica:

**📁 Archivo a crear:** `/responsive/ejercicio-1.html`

```html
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Mi Portafolio - Responsive Básico</title>
		<!-- Enlaces relativos: funcionan localmente, se rompen en GitHub Pages -->
		<link rel="stylesheet" href="../assets/css/index.css" />
		<link rel="stylesheet" href="../assets/css/ejercicio-1.css" />
	</head>
	<body>
		<header class="site-header">
			<div class="container">
				<h1 class="site-title">Mi Portafolio</h1>
				<nav class="main-nav">
					<ul class="nav-list">
						<li><a href="#inicio">Inicio</a></li>
						<li><a href="#sobre">Sobre Mí</a></li>
						<li><a href="#trabajos">Trabajos</a></li>
						<li><a href="#contacto">Contacto</a></li>
					</ul>
				</nav>
			</div>
		</header>

		<main class="main-content">
			<div class="container">
				<!-- Sección Hero -->
				<section class="hero-section">
					<h2>Hola, soy [Tu Nombre]</h2>
					<p>Desarrollador Frontend especializado en diseño responsive</p>
					<a href="#trabajos" class="cta-button">Ver mis trabajos</a>
				</section>

				<!-- Sección Proyectos -->
				<section class="projects-section">
					<h2>Mis Proyectos</h2>
					<div class="projects-grid">
						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=1" alt="Proyecto 1" />
							<div class="project-info">
								<h3>Proyecto Web</h3>
								<p>Descripción del primer proyecto desarrollado con técnicas responsive básicas.</p>
								<div class="project-tags">
									<span class="tag">HTML</span>
									<span class="tag">CSS</span>
									<span class="tag">JavaScript</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=2" alt="Proyecto 2" />
							<div class="project-info">
								<h3>Aplicación Móvil</h3>
								<p>Una aplicación que se adapta a diferentes dispositivos usando media queries.</p>
								<div class="project-tags">
									<span class="tag">React</span>
									<span class="tag">Flexbox</span>
									<span class="tag">API</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=3" alt="Proyecto 3" />
							<div class="project-info">
								<h3>Dashboard</h3>
								<p>Panel de control con layout responsive usando Flexbox y media queries.</p>
								<div class="project-tags">
									<span class="tag">Vue.js</span>
									<span class="tag">CSS</span>
									<span class="tag">Node.js</span>
								</div>
							</div>
						</article>
					</div>
				</section>
			</div>
		</main>

		<footer class="site-footer">
			<div class="container">
				<p>&copy; 2025 Mi Portafolio. Diseñado con técnicas responsive básicas.</p>
			</div>
		</footer>
	</body>
</html>
```

**CSS:** Implementamos Media Queries y Flexbox (versión básica):

**📁 Archivo a crear:** `/assets/css/ejercicio-1.css`

> **🎨 Jerarquía CSS:** Este archivo se carga después de `index.css`, por lo que puede sobrescribir los estilos del tema general del estudiante cuando sea necesario.

```css
/* ===== PORTAFOLIO RESPONSIVE BÁSICO (MOBILE-FIRST) ===== */
/*
 * ESTRATEGIA MOBILE-FIRST:
 * 1. Estilos base ahora son móviles (pantallas pequeñas)
 * 2. Media queries usan min-width en lugar de max-width
 * 3. Progressive enhancement - agregamos estilos para pantallas más grandes
 */

/* Variables CSS básicas para Ejercicio 1 */
:root {
	--primary-color: #2563eb;
	--secondary-color: #64748b;
	--accent-color: #f59e0b;
	--white: #ffffff;
	--border-color: #e2e8f0;
	--spacing-sm: 1rem;
	--spacing-md: 1.5rem;
	--spacing-lg: 2rem;
	--spacing-xl: 3rem;
	--border-radius: 0.5rem;
	--shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

body {
	font-family: system-ui, -apple-system, sans-serif;
	line-height: 1.6;
}

/* ===== CONTAINER BÁSICO ===== */
.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 var(--spacing-sm);
}

/* ===== HEADER RESPONSIVO (Mobile-First: estilos base para móvil) ===== */
.site-header {
	background: var(--primary-color);
	color: white;
	padding: var(--spacing-md) 0;
}

.site-header .container {
	display: flex;
	flex-direction: column; /* Móvil: navegación vertical */
	text-align: center;
	gap: var(--spacing-sm);
}

.site-title {
	font-size: 1.25rem; /* Móvil: título más pequeño */
	font-weight: 700;
}

.main-nav ul {
	display: flex;
	flex-direction: column; /* Móvil: enlaces apilados verticalmente */
	list-style: none;
	gap: var(--spacing-sm);
}

.main-nav a {
	color: white;
	text-decoration: none;
	padding: 0.5rem 1rem;
	border-radius: var(--border-radius);
	transition: background-color 0.2s;
}

.main-nav a:hover {
	background-color: rgba(255, 255, 255, 0.1);
}

/* ===== SECCIONES ===== */
.hero-section {
	text-align: center;
	padding: var(--spacing-lg) 0; /* Móvil: padding reducido */
	background: linear-gradient(135deg, var(--primary-color) 0%, #1e40af 100%);
	color: white;
	margin: var(--spacing-lg) 0;
	border-radius: var(--border-radius);
}

.hero-section h2 {
	font-size: 1.25rem; /* Móvil: texto más pequeño */
	margin-bottom: var(--spacing-sm);
}

.hero-section p {
	font-size: 1.125rem;
	margin-bottom: var(--spacing-lg);
	opacity: 0.9;
}

.projects-section {
	margin: var(--spacing-xl) 0;
}

.projects-section h2 {
	text-align: center;
	font-size: 1.5rem; /* Móvil: tamaño moderado */
	margin-bottom: var(--spacing-lg);
}

/* ===== GRID DE PROYECTOS CON FLEXBOX ===== */
.projects-grid {
	display: flex;
	flex-direction: column; /* Móvil: una sola columna */
	gap: var(--spacing-lg);
	align-items: center;
}

.project-card {
	width: 100%; /* Móvil: ancho completo */
	max-width: 100%;
	background: var(--white);
	border-radius: var(--border-radius);
	overflow: hidden;
	box-shadow: var(--shadow);
	transition: transform 0.2s;
}

.project-card:hover {
	transform: translateY(-4px);
}

.project-card img {
	width: 100%;
	height: 200px;
	object-fit: cover;
}

.project-info {
	padding: var(--spacing-md);
}

.project-info h3 {
	font-size: 1.125rem;
	margin-bottom: var(--spacing-sm);
}

.project-info p {
	color: var(--secondary-color);
	margin-bottom: var(--spacing-md);
	font-size: 0.875rem;
}

/* ===== TAGS ===== */
.project-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.tag {
	background: var(--primary-color);
	color: white;
	padding: 0.25rem 0.75rem;
	border-radius: 9999px;
	font-size: 0.75rem;
	font-weight: 500;
}

/* ===== BOTÓN CTA ===== */
.cta-button {
	background: var(--accent-color);
	color: white;
	padding: var(--spacing-sm) var(--spacing-lg);
	text-decoration: none;
	border-radius: var(--border-radius);
	font-weight: 600;
	transition: background-color 0.2s;
	display: inline-block;
}

.cta-button:hover {
	background: #d97706;
}

/* ===== MEDIA QUERIES (Mobile-First: Progressive Enhancement) ===== */
/*
 * ESTRATEGIA MOBILE-FIRST:
 * - Estilos base son para móvil (ya definidos arriba)
 * - min-width agrega estilos para pantallas más grandes
 * - Progressive enhancement - mejoramos la experiencia conforme crece la pantalla
 */

/* Tablet: 2-3 columnas - 481px+ */
@media (min-width: 481px) {
	.site-title {
		font-size: 1.5rem;
	}

	.projects-grid {
		flex-direction: row; /* Tablet: múltiples columnas */
		flex-wrap: wrap;
		justify-content: center;
	}

	.project-card {
		flex: 1;
		min-width: 280px;
		max-width: 350px;
	}

	.hero-section h2 {
		font-size: 1.5rem;
	}

	.projects-section h2 {
		font-size: 1.75rem;
	}
}

/* Desktop: Layout horizontal completo - 769px+ */
@media (min-width: 769px) {
	.site-header .container {
		flex-direction: row; /* Desktop: navegación horizontal */
		justify-content: space-between;
		align-items: center;
		text-align: left;
	}

	.main-nav ul {
		flex-direction: row; /* Desktop: enlaces en línea */
		gap: var(--spacing-md);
	}

	.site-title {
		font-size: 1.5rem;
	}

	.project-card {
		min-width: 300px;
		max-width: 400px; /* Desktop: tarjetas más anchas */
	}

	.hero-section {
		padding: var(--spacing-xl) 0; /* Desktop: más espacio */
	}

	.hero-section h2 {
		font-size: 2rem; /* Desktop: títulos más grandes */
	}

	.hero-section p {
		font-size: 1.125rem;
	}
}

/* ===== TIPOGRAFÍA BÁSICA ===== */
h1,
h2,
h3 {
	font-weight: 600;
	line-height: 1.2;
}

h1 {
	font-size: 1.5rem;
}

h2 {
	font-size: 1.75rem;
}

h3 {
	font-size: 1.125rem;
}

p {
	margin-bottom: var(--spacing-sm);
}

/* ===== FOOTER ===== */
.site-footer {
	background: var(--secondary-color);
	color: white;
	text-align: center;
	padding: var(--spacing-lg) 0;
	margin-top: var(--spacing-xl);
}

/* ===== RESPONSIVE IMAGES ===== */
img {
	max-width: 100%;
	height: auto;
}

/* ===== UTILIDADES ===== */
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
```

> **💡 Recordatorio:**
>
> - Guarda el código HTML en `/responsive/ejercicio-1.html`
> - Añade el código CSS en `/assets/css/ejercicio-1.css` (carpeta ya existe)
> - El HTML incluye dos enlaces CSS: tema general y específico del ejercicio

**🚀 Cómo probar tu ejercicio:**

1. Abre `/responsive/ejercicio-1.html` en tu navegador
2. Redimensiona la ventana para ver el comportamiento responsive
3. Usa las herramientas de desarrollador (F12) para simular dispositivos móviles

**¿Cómo funciona este ejemplo?**

1. **Mobile-First**: Los estilos base están diseñados para móviles (pantallas pequeñas). La navegación es vertical, las tarjetas ocupan el ancho completo, y el texto es de tamaño moderado.

2. **Media Queries Progresivas**: Usamos `@media (min-width: 481px)` y `@media (min-width: 769px)` para **agregar** estilos conforme la pantalla crece, en lugar de **quitar** estilos con `max-width`.

3. **Flexbox Adaptativo**: La cuadrícula de proyectos usa `display: flex` que se adapta desde columna única (móvil) hasta múltiples columnas (tablet/desktop).

4. **Progressive Enhancement**: Comenzamos con la experiencia móvil básica y mejoramos para pantallas más grandes, agregando características según el espacio disponible.

**Ventajas del enfoque Mobile-First:**

- ✅ **Mejor Performance**: Los dispositivos móviles cargan menos CSS
- ✅ **Progressive Enhancement**: Mejoramos la experiencia para pantallas más grandes
- ✅ **Accesibilidad**: Prioriza la experiencia en dispositivos con menos recursos
- ✅ **Best Practice Moderna**: Alineado con estándares actuales de la industria
- ✅ **Mobile-First Indexing**: Google prioriza la versión móvil para SEO

**Evolución hacia el Ejemplo 2:**

Este portafolio básico será la base para el Ejemplo 2, donde:

- Reemplazaremos **Flexbox** por **CSS Grid** con `auto-fit`
- Añadiremos **Container Queries** para adaptación intrínseca
- Implementaremos **tipografía fluida** con `clamp()`
- Agregaremos **scroll snapping** y **screen-frames**

**Breakpoints Comunes:**

- **Móvil**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px+

**Consejos para Media Queries:**

```css
/* 🎯 RECOMENDADO: Mobile First */
/* Empieza con móvil y agrega estilos para pantallas más grandes */
@media (min-width: 768px) {
	/* Estilos para tablet y desktop */
}

/* Desktop First (enfoque tradicional, menos eficiente) */
/* Empieza con desktop y agrega estilos para pantallas más pequeñas */
@media (max-width: 768px) {
	/* Estilos para tablet y móvil */
}
```

### Ejemplo práctico 2: Portafolio Intrínseco con Técnicas Modernas

Ahora vamos a **evolucionar** el portafolio del Ejemplo 1 aplicando las técnicas más avanzadas de diseño fluido e intrínseco. Mantendremos la misma estructura base pero reemplazaremos las técnicas básicas por CSS Grid, Container Queries, y tipografía fluida.

**HTML:**

**📁 Archivo a crear:** `/responsive/ejercicio-2.html`

```html
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Portafolio Responsive</title>
		<!-- Enlaces relativos: funcionan localmente, se rompen en GitHub Pages -->
		<link rel="stylesheet" href="../assets/css/index.css" />
		<link rel="stylesheet" href="../assets/css/ejercicio-2.css" />
	</head>
	<body>
		<header class="portfolio-header">
			<div class="container">
				<h1 class="portfolio-title">Mi Portafolio</h1>
				<nav class="portfolio-nav">
					<a href="#proyectos">Proyectos</a>
					<a href="#sobre">Sobre Mí</a>
					<a href="#contacto">Contacto</a>
				</nav>
			</div>
		</header>

		<main class="portfolio-main">
			<section class="projects-section">
				<div class="container">
					<h2>Mis Proyectos</h2>
					<div class="projects-grid">
						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=1" alt="Proyecto 1" />
							<div class="project-content">
								<h3>Proyecto Web</h3>
								<p>Descripción del primer proyecto desarrollado con tecnologías modernas.</p>
								<div class="project-tags">
									<span class="tag">HTML</span>
									<span class="tag">CSS</span>
									<span class="tag">JavaScript</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=2" alt="Proyecto 2" />
							<div class="project-content">
								<h3>Aplicación Móvil</h3>
								<p>Una aplicación móvil responsive que se adapta a diferentes dispositivos.</p>
								<div class="project-tags">
									<span class="tag">React</span>
									<span class="tag">CSS Grid</span>
									<span class="tag">API</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=3" alt="Proyecto 3" />
							<div class="project-content">
								<h3>Dashboard</h3>
								<p>Panel de control con visualizaciones de datos en tiempo real.</p>
								<div class="project-tags">
									<span class="tag">Vue.js</span>
									<span class="tag">D3.js</span>
									<span class="tag">Node.js</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=4" alt="Proyecto 4" />
							<div class="project-content">
								<h3>E-commerce</h3>
								<p>Tienda online con carrito de compras y sistema de pagos.</p>
								<div class="project-tags">
									<span class="tag">PHP</span>
									<span class="tag">MySQL</span>
									<span class="tag">Stripe</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=5" alt="Proyecto 5" />
							<div class="project-content">
								<h3>Blog Personal</h3>
								<p>Blog con sistema de comentarios y administración de contenido.</p>
								<div class="project-tags">
									<span class="tag">Jekyll</span>
									<span class="tag">Markdown</span>
									<span class="tag">GitHub</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<img src="https://picsum.photos/400/300?random=6" alt="Proyecto 6" />
							<div class="project-content">
								<h3>API REST</h3>
								<p>Servicio web con documentación automática y autenticación.</p>
								<div class="project-tags">
									<span class="tag">Express</span>
									<span class="tag">MongoDB</span>
									<span class="tag">JWT</span>
								</div>
							</div>
						</article>
					</div>
				</div>
			</section>
		</main>

		<footer class="portfolio-footer">
			<div class="container">
				<p>&copy; 2025 Mi Portafolio. Diseñado con técnicas modernas de CSS.</p>
			</div>
		</footer>
	</body>
</html>
```

**CSS:**

**📁 Archivo a crear:** `/assets/css/ejercicio-2.css`

> **🎨 Jerarquía CSS:** Este archivo se carga después de `index.css`, por lo que puede sobrescribir los estilos del tema general del estudiante cuando sea necesario.

```css
/* ===== PORTAFOLIO RESPONSIVE CON TÉCNICAS MODERNAS ===== */

:root {
	--primary-color: #3b82f6;
	--secondary-color: #64748b;
	--accent-color: #f59e0b;
	--border-color: #e2e8f0;
	--shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
	--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
	--border-radius: 0.75rem;
	--spacing-xs: 0.5rem;
	--spacing-sm: 1rem;
	--spacing-md: 1.5rem;
	--spacing-lg: 2rem;
	--spacing-xl: 3rem;
}

body {
	font-family: system-ui, -apple-system, sans-serif;
	line-height: 1.6;
}

.container {
	container-type: inline-size;
	container-name: portfolio-container;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 var(--spacing-md);
}

/* ===== HEADER ===== */
.portfolio-header {
	background: var(--primary-color);
	color: white;
	padding: var(--spacing-lg) 0;
	position: sticky;
	top: 0;
	z-index: 100;
	box-shadow: var(--shadow);
}

.portfolio-header .container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: var(--spacing-md);
}

.portfolio-title {
	font-size: clamp(1.5rem, 4vw, 2.5rem);
	font-weight: 700;
}

.portfolio-nav {
	display: flex;
	gap: var(--spacing-lg);
	flex-wrap: wrap;
}

.portfolio-nav a {
	color: white;
	text-decoration: none;
	padding: var(--spacing-xs) var(--spacing-sm);
	border-radius: var(--border-radius);
	transition: background-color 0.2s;
	font-weight: 500;
}

.portfolio-nav a:hover {
	background-color: rgba(255, 255, 255, 0.1);
}

/* ===== GRID RESPONSIVO CON AUTO-FIT Y SUBGRID ===== */
.projects-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: var(--spacing-lg);
	margin: var(--spacing-xl) 0;
}

/* ===== SUBGRID PARA ALINEACIÓN PERFECTA ===== */
.project-card {
	display: grid;
	grid-template-columns: subgrid;
	grid-column: span 1;
	/* Fallback para navegadores sin soporte de subgrid */
	@supports not (grid-template-columns: subgrid) {
		display: flex;
		flex-direction: column;
	}
}

/* Aplicar subgrid solo cuando está soportado */
@supports (grid-template-columns: subgrid) {
	.projects-grid {
		grid-template-rows: auto auto 1fr auto; /* Título, imagen, descripción, tags */
	}

	.project-card {
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: subgrid;
		grid-column: span 1;
		grid-row: span 1;
	}

	.project-card h3 {
		grid-row: 1;
	}

	.project-card img {
		grid-row: 2;
	}

	.project-card p {
		grid-row: 3;
	}

	.project-card .project-tags {
		grid-row: 4;
		align-self: end;
	}
}

/* ===== CONTAINER QUERIES (ENFOQUE MOBILE-FIRST) ===== */
/*
 * ¡LOS CONTAINER QUERIES TAMBIÉN PUEDEN SER MOBILE-FIRST!
 * Los estilos base son para contenedores estrechos (como móvil)
 * min-width agrega estilos para contenedores más anchos
 */

/* Base: Contenedores estrechos (como móvil) - layout horizontal de tarjetas */
.project-card {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	gap: var(--spacing-md);
}

.project-card img {
	width: 120px;
	height: 90px;
	object-fit: cover;
	flex-shrink: 0;
}

.project-content {
	flex: 1;
}

/* Mejora progresiva: Contenedores anchos - layout vertical de tarjetas */
@container portfolio-container (min-width: 600px) {
	.project-card {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0;
	}

	.project-card img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		flex-shrink: 0;
	}

	.project-content {
		flex: 1;
		padding: var(--spacing-lg);
	}
}

/* ===== TARJETAS DE PROYECTO ===== */
.project-card {
	background: var(--card-bg);
	border-radius: var(--border-radius);
	box-shadow: var(--shadow);
	overflow: hidden;
	transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
	transform: translateY(-4px);
	box-shadow: var(--shadow-lg);
}

.project-card img {
	width: 100%;
	height: 200px;
	object-fit: cover;
	transition: transform 0.2s;
}

.project-card:hover img {
	transform: scale(1.05);
}

.project-content {
	padding: var(--spacing-lg);
}

.project-content h3 {
	font-size: clamp(1.125rem, 2.5vw, 1.5rem);
	font-weight: 600;
	margin-bottom: var(--spacing-sm);
	color: var(--text-color);
}

.project-content p {
	color: var(--secondary-color);
	margin-bottom: var(--spacing-md);
	line-height: 1.5;
}

/* ===== TAGS ===== */
.project-tags {
	display: flex;
	flex-wrap: wrap;
	gap: var(--spacing-xs);
}

.tag {
	background: var(--primary-color);
	color: white;
	padding: var(--spacing-xs) var(--spacing-sm);
	border-radius: 9999px;
	font-size: 0.75rem;
	font-weight: 500;
}

/* ===== TIPOGRAFÍA FLUIDA ===== */
h1,
h2,
h3 {
	font-weight: 600;
	line-height: 1.2;
}

h2 {
	font-size: clamp(1.5rem, 4vw, 2.25rem);
	text-align: center;
	margin: var(--spacing-xl) 0;
	color: var(--text-color);
}

/* ===== FOOTER ===== */
.portfolio-footer {
	background: var(--secondary-color);
	color: white;
	text-align: center;
	padding: var(--spacing-lg) 0;
	margin-top: var(--spacing-xl);
}

/* ===== RESPONSIVE IMAGES ===== */
img {
	max-width: 100%;
	height: auto;
}

/* ===== UTILIDADES ===== */
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
```

> **💡 Recordatorio:**
>
> - Guarda el código HTML en `/responsive/ejercicio-2.html`
> - Añade el código CSS en `/assets/css/ejercicio-2.css` (carpeta ya existe)
> - El HTML incluye dos enlaces CSS: tema general y específico del ejercicio

**🚀 Cómo probar tu ejercicio:**

1. Abre `/responsive/ejercicio-2.html` en tu navegador
2. Redimensiona la ventana para ver el comportamiento responsive
3. Compara con el Ejercicio 1 para ver las mejoras
4. Usa las herramientas de desarrollador (F12) para simular dispositivos móviles

**¿Qué demuestra este ejemplo?**

1. **Evolución del Ejemplo 1**: Mantiene la misma estructura HTML pero con técnicas CSS avanzadas
2. **Grid Auto-fit**: `repeat(auto-fit, minmax(300px, 1fr))` reemplaza el Flexbox del Ejemplo 1
3. **Subgrid**: Las tarjetas heredan la estructura de filas del grid padre para alineación perfecta
4. **Container Queries**: Cambia el layout de las tarjetas cuando el contenedor es estrecho (no el viewport)
5. **Tipografía Fluida**: `clamp()` para escalado suave de títulos sin saltos bruscos
6. **Unidades Relativas**: `rem`, `%`, `fr`, `vw` para fluidez intrínseca
7. **Efectos Modernos**: Hover effects, transiciones suaves, sombras
8. **Diseño Intrínseco**: Los componentes se adaptan según su contexto, no según breakpoints globales

**Mejoras respecto al Ejemplo 1:**

- **Flexbox → CSS Grid**: Layout más potente y flexible
- **Media Queries → Container Queries**: Adaptación basada en el contenedor, no en el viewport
- **Tamaños Fijos → Tipografía Fluida**: Escalado suave con `clamp()`
- **Breakpoints Fijos → Fluidez Intrínseca**: Adaptación automática sin puntos de quiebre
- **Menos Código**: Grid Auto-fit reduce la necesidad de media queries

**Ventajas de este enfoque avanzado:**

- **Fluidez Intrínseca**: Los elementos se adaptan según su espacio disponible
- **Menos Media Queries**: Grid Auto-fit reduce la necesidad de breakpoints
- **Componentes Reutilizables**: Container Queries permiten componentes conscientes de su contexto
- **Mejor UX**: Transiciones más suaves y naturales
- **Mantenimiento**: Código más limpio y menos breakpoints que gestionar

**Comparación con el Ejemplo 1:**

| Aspecto            | Ejemplo 1 (Básico)      | Ejemplo 2 (Avanzado)     |
| ------------------ | ----------------------- | ------------------------ |
| **Técnica**        | Media Queries + Flexbox | Container Queries + Grid |
| **Enfoque**        | Breakpoints fijos       | Fluidez intrínseca       |
| **Complejidad**    | Simple                  | Avanzado                 |
| **Compatibilidad** | Universal               | Navegadores modernos     |
| **Mantenimiento**  | Fácil                   | Moderado                 |
| **Estructura**     | Misma base HTML         | Misma base HTML          |

---

### Imágenes y otros elementos gráficos responsivos

Adaptar el **contenido visual** es tan importante como el layout o la tipografía:

- **Imágenes flexibles:** La regla de oro para hacer una imagen (etiqueta `<img>`) fluida es aplicarle `max-width: 100%; height: auto;`. Con esto, una imagen se encogerá proporcionalmente si el contenedor es más estrecho que ella, evitando desbordamiento[^34]. Por ejemplo, en una columna flexible podemos incluir `<img src="foto.jpg" alt="..." style="max-width:100%; height:auto;">` para que esa imagen nunca exceda el ancho de la columna. Esto resuelve que en móvil la imagen se vea más pequeña automáticamente y en desktop se vea a su tamaño natural (hasta su 100%). Hoy día muchos _reset/normalize CSS_ o frameworks incluyen `.img-fluid { max-width:100%; height:auto; }` por defecto.

- **Imágenes responsivas (srcset):** Aunque escapa un poco del enfoque “solo CSS” de la clase, es bueno mencionar que HTML5 ofrece atributos como `srcset` y el elemento `<picture>` para servir automáticamente imágenes de diferentes resoluciones o recortes según el dispositivo. Esto mejora rendimiento y adecuación visual (por ejemplo, cargar una versión más pequeña de una foto en pantallas móviles Retina). En nuestros ejercicios nos centraremos en CSS, pero sepan que es una técnica complementaria esencial para **responsive images**.

- **SVGs y gráficos vectoriales:** Los SVG (gráficos vectoriales) son intrínsecamente escalables. Un SVG insertado en la página puede comportarse como “imagen flexible” sin pérdida de calidad. Asegúrense de darles atributos de ancho/alto relativos o estilos CSS adecuados. Un truco: si embebemos SVG directamente en HTML, podemos usar CSS para controlar su tamaño como a cualquier elemento (ej: `width: 50%;`). Los iconos en SVG, por ejemplo, pueden ser coloreados o dimensionados con `em` para que acompañen al texto fluidamente.

- **Elementos embebidos (iframes, videos):** Para hacer un video de YouTube o un mapa de Google _responsive_, se suele envolver en un contenedor de relación de aspecto. Esto implica un poco más de CSS (usando porcentajes en padding para la relación 16:9, etc.). Es un detalle avanzado, pero mencionable: hay técnicas con `aspect-ratio` en CSS moderno que facilitan definir que un elemento debe mantener cierta proporción al redimensionar.

En nuestros ejemplos prácticos, nos enfocaremos en imágenes simples y SVG. Asegúrense siempre de probar cómo se comportan sus imágenes cuando la pantalla cambia de tamaño. Una imagen demasiado pequeña con `max-width:100%` puede pixelarse en pantallas grandes; una demasiado grande puede sobrepasar contenedores sin esa regla. **Verifiquen ambos extremos.**

### Ejemplo práctico 3: Portafolio SPA con Scroll-Snap e Imágenes Responsive

Vamos a crear el **proyecto final completo**: un portafolio tipo SPA con scroll por screen-frames, imágenes responsive avanzadas y todas las técnicas modernas aprendidas. Este será nuestro proyecto integrador que demuestra el dominio completo del diseño web intrínseco.

**HTML completo del Portafolio SPA:**

**📁 Archivo a crear:** `/responsive/ejercicio-3.html`

```html
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Portafolio Intrínseco - [Tu Nombre]</title>
		<!-- Enlaces relativos: funcionan localmente, se rompen en GitHub Pages -->
		<link rel="stylesheet" href="../assets/css/index.css" />
		<link rel="stylesheet" href="../assets/css/ejercicio-3.css" />
	</head>
	<body>
		<!-- Navegación SPA fija -->
		<nav class="main-nav">
			<div class="nav-container">
				<a href="#home" class="nav-link active">Inicio</a>
				<a href="#about" class="nav-link">Sobre Mí</a>
				<a href="#work" class="nav-link">Trabajos</a>
				<a href="#contact" class="nav-link">Contacto</a>
			</div>
		</nav>

		<!-- Contenido principal con scroll-snap -->
		<main class="scroll-container">
			<!-- Sección Home -->
			<section id="home" class="section home-section theme-light">
				<div class="hero-background">
					<picture>
						<source media="(min-width: 1200px)" srcset="https://picsum.photos/1920/1080?random=hero-large" />
						<source media="(min-width: 768px)" srcset="https://picsum.photos/1200/800?random=hero-medium" />
						<img src="https://picsum.photos/768/600?random=hero-small" alt="Fondo hero responsive" class="hero-bg-image" />
					</picture>
				</div>
				<div class="container">
					<div class="hero-content">
						<h1 class="hero-title">Hola, soy [Tu Nombre]</h1>
						<p class="hero-subtitle">Desarrollador Frontend especializado en diseño intrínseco</p>
						<a href="#work" class="cta-button">Ver mis trabajos</a>
					</div>
				</div>
			</section>

			<!-- Sección About -->
			<section id="about" class="section about-section">
				<div class="container">
					<h2 class="section-title">Sobre Mí</h2>
					<div class="about-content">
						<div class="about-text">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
								magna aliqua.
							</p>
							<p>
								Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
						<div class="about-image">
							<picture>
								<source media="(min-width: 768px)" srcset="https://picsum.photos/400/500?random=profile-large" />
								<img src="https://picsum.photos/300/400?random=profile-small" alt="Foto de perfil" class="profile-image" />
							</picture>
						</div>
					</div>
				</div>
			</section>

			<!-- Sección Work -->
			<section id="work" class="section work-section theme-light">
				<div class="container">
					<h2 class="section-title">Mis Trabajos</h2>
					<div class="projects-grid">
						<article class="project-card">
							<div class="project-image-container">
								<picture>
									<source media="(min-width: 600px)" srcset="https://picsum.photos/600/400?random=1" />
									<img src="https://picsum.photos/400/300?random=1" alt="Proyecto Web" class="project-image" />
								</picture>
								<div class="project-overlay">
									<a href="#" class="project-link">Ver proyecto</a>
								</div>
							</div>
							<div class="project-info">
								<h3>Proyecto Web</h3>
								<p>Descripción del proyecto desarrollado con técnicas modernas de CSS.</p>
								<div class="project-tags">
									<span class="tag">HTML</span>
									<span class="tag">CSS</span>
									<span class="tag">JavaScript</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<div class="project-image-container">
								<picture>
									<source media="(min-width: 600px)" srcset="https://picsum.photos/600/400?random=2" />
									<img src="https://picsum.photos/400/300?random=2" alt="Aplicación Móvil" class="project-image" />
								</picture>
								<div class="project-overlay">
									<a href="#" class="project-link">Ver proyecto</a>
								</div>
							</div>
							<div class="project-info">
								<h3>Aplicación Móvil</h3>
								<p>App responsive que se adapta intrínsecamente a diferentes dispositivos.</p>
								<div class="project-tags">
									<span class="tag">React</span>
									<span class="tag">CSS Grid</span>
									<span class="tag">API</span>
								</div>
							</div>
						</article>

						<article class="project-card">
							<div class="project-image-container">
								<picture>
									<source media="(min-width: 600px)" srcset="https://picsum.photos/600/400?random=3" />
									<img src="https://picsum.photos/400/300?random=3" alt="Dashboard" class="project-image" />
								</picture>
								<div class="project-overlay">
									<a href="#" class="project-link">Ver proyecto</a>
								</div>
							</div>
							<div class="project-info">
								<h3>Dashboard</h3>
								<p>Panel de control con visualizaciones fluidas y adaptativas.</p>
								<div class="project-tags">
									<span class="tag">Vue.js</span>
									<span class="tag">D3.js</span>
									<span class="tag">Node.js</span>
								</div>
							</div>
						</article>
					</div>
				</div>
			</section>

			<!-- Sección About con imagen de perfil responsive -->
			<section id="about" class="section about-section theme-dark">
				<div class="container">
					<h2 class="section-title">Sobre Mí</h2>
					<div class="about-content">
						<div class="about-text">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
								magna aliqua.
							</p>
							<p>
								Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</p>
						</div>
						<div class="about-image">
							<picture>
								<source media="(min-width: 768px)" srcset="https://picsum.photos/400/500?random=profile-large" />
								<img src="https://picsum.photos/300/400?random=profile-small" alt="Foto de perfil" class="profile-image" />
							</picture>
						</div>
					</div>
				</div>
			</section>

			<!-- Sección Contact -->
			<section id="contact" class="section contact-section theme-dark">
				<div class="container">
					<h2 class="section-title">Contacto</h2>
					<div class="contact-content">
						<div class="contact-info">
							<h3>¡Hablemos!</h3>
							<p>Estoy disponible para nuevos proyectos y colaboraciones.</p>
							<div class="contact-details">
								<a href="mailto:tu@email.com" class="contact-link">tu@email.com</a>
								<a href="https://github.com/tuusuario" class="contact-link">GitHub</a>
								<a href="https://linkedin.com/in/tuusuario" class="contact-link">LinkedIn</a>
							</div>
						</div>
						<div class="contact-form">
							<form>
								<input type="text" placeholder="Tu nombre" required />
								<input type="email" placeholder="Tu email" required />
								<textarea placeholder="Tu mensaje" rows="4" required></textarea>
								<button type="submit" class="submit-button">Enviar mensaje</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</main>
	</body>
</html>
```

**CSS completo del Portafolio SPA:**

**📁 Archivo a crear:** `/assets/css/ejercicio-3.css`

> **🎨 Jerarquía CSS:** Este archivo se carga después de `index.css`, por lo que puede sobrescribir los estilos del tema general del estudiante cuando sea necesario.

```css
/* ===== PORTAFOLIO SPA CON SCROLL-SNAP ===== */

:root {
	/* Colores base */
	--white: #ffffff;
	--accent: #f59e0b;

	/* Espaciado fluido */
	--space-xs: clamp(0.5rem, 1vw, 0.75rem);
	--space-sm: clamp(1rem, 2vw, 1.5rem);
	--space-md: clamp(1.5rem, 3vw, 2.5rem);
	--space-lg: clamp(2rem, 4vw, 3.5rem);
	--space-xl: clamp(3rem, 6vw, 5rem);

	/* Tipografía fluida */
	--text-xs: clamp(0.75rem, 1.5vw, 0.875rem);
	--text-sm: clamp(0.875rem, 2vw, 1rem);
	--text-base: clamp(1rem, 2.5vw, 1.125rem);
	--text-lg: clamp(1.125rem, 3vw, 1.25rem);
	--text-xl: clamp(1.25rem, 4vw, 1.5rem);
	--text-2xl: clamp(1.5rem, 5vw, 2rem);
	--text-3xl: clamp(2rem, 6vw, 3rem);
	--text-4xl: clamp(2.5rem, 8vw, 4rem);

	/* Alturas de línea fluidas */
	--leading-tight: clamp(1.1, 1.2, 1.25);
	--leading-normal: clamp(1.4, 1.5, 1.6);
	--leading-relaxed: clamp(1.5, 1.6, 1.75);

	/* Sombras */
	--shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

	/* Bordes */
	--radius: clamp(0.5rem, 1vw, 0.75rem);
	--radius-lg: clamp(0.75rem, 1.5vw, 1rem);
}

/* ===== DEFINICIÓN DE TEMAS PARA STYLE QUERIES ===== */
.theme-light {
	--color-surface: #f8fafc;
	--color-text: #1e293b;
	--color-primary: #3b82f6;
	--color-secondary: #64748b;
	--color-accent: #f59e0b;
	--color-border: #e2e8f0;
	--color-shadow: rgba(0, 0, 0, 0.1);
}

.theme-dark {
	--color-surface: #1e293b;
	--color-text: #f8fafc;
	--color-primary: #60a5fa;
	--color-secondary: #94a3b8;
	--color-accent: #fbbf24;
	--color-border: #374151;
	--color-shadow: rgba(0, 0, 0, 0.3);
}

/* Reset y base */
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html {
	scroll-behavior: smooth;
}

body {
	font-family: system-ui, -apple-system, sans-serif;
	line-height: var(--leading-normal);
	color: var(--color-text);
	background: var(--color-surface);
}

/* ===== SCROLL SNAPPING ===== */
.scroll-container {
	scroll-snap-type: y mandatory;
	height: 100vh;
	overflow-y: scroll;
}

.section {
	/* Usamos 100dvh (altura dinámica del viewport), 100svh (altura del viewport pequeño) o 100lvh (altura del viewport grande) para asegurar que cada sección ocupe toda la pantalla visible, incluso en móviles donde la barra del navegador puede cambiar el tamaño del viewport. 100svh es especialmente útil para manejar las barras de herramientas móviles que aparecen o desaparecen, proporcionando un área visible más precisa. 100lvh puede ser útil para asegurar la altura máxima cuando la interfaz del navegador está completamente expandida. */
	min-height: 100dvh;
	scroll-snap-align: start;
	display: flex;
	align-items: center;
	position: relative;
}

.container {
	container-type: inline-size;
	container-name: section-container;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 var(--space-md);
	width: 100%;
}

/* ===== NAVEGACIÓN SPA ===== */
.main-nav {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(10px);
	z-index: 1000;
	padding: var(--space-sm) 0;
	box-shadow: var(--shadow);
}

.nav-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 var(--space-md);
	display: flex;
	justify-content: center;
	gap: var(--space-lg);
}

.nav-link {
	text-decoration: none;
	color: var(--color-text);
	font-weight: 500;
	font-size: var(--text-sm);
	padding: var(--space-xs) var(--space-sm);
	border-radius: var(--radius);
	transition: all 0.2s;
}

.nav-link:hover,
.nav-link.active {
	background: var(--color-primary);
	color: var(--white);
}

/* ===== STYLE QUERIES: ADAPTACIÓN CONTEXTUAL DE COMPONENTES ===== */
/*
 * 🆕 TÉCNICA EXPERIMENTAL: Style Queries
 * Permite que los componentes se adapten según las propiedades de estilo de su contenedor
 * En lugar de solo basarse en el tamaño (Container Queries)
 */

/* Contenedor con tema claro - componentes se adaptan automáticamente */
@container style(--color-surface: #f8fafc) {
	.section-title {
		color: var(--color-text);
		text-shadow: none;
	}

	.project-card {
		background: var(--color-surface);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		box-shadow: 0 4px 6px var(--color-shadow);
	}

	.project-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 15px var(--color-shadow);
	}

	.cta-button {
		background: var(--color-primary);
		color: white;
		border: 2px solid var(--color-primary);
	}

	.cta-button:hover {
		background: transparent;
		color: var(--color-primary);
	}
}

/* Contenedor con tema oscuro - componentes se adaptan automáticamente */
@container style(--color-surface: #1e293b) {
	.section-title {
		color: var(--color-text);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}

	.project-card {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		backdrop-filter: blur(10px);
		box-shadow: 0 4px 6px var(--color-shadow);
	}

	.project-card:hover {
		background: rgba(255, 255, 255, 0.15);
		transform: translateY(-4px);
		box-shadow: 0 8px 15px var(--color-shadow);
	}

	.cta-button {
		background: var(--color-primary);
		color: var(--color-text);
		border: 2px solid var(--color-primary);
	}

	.cta-button:hover {
		background: transparent;
		color: var(--color-primary);
	}
}

/* ===== SECCIONES ===== */
.home-section {
	background: linear-gradient(135deg, var(--color-primary) 0%, #1e40af 100%);
	color: var(--white);
	text-align: center;
}

.about-section {
	background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.work-section {
	background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
	color: var(--white);
}

.contact-section {
	background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
	color: var(--white);
}

/* ===== HERO CON IMAGEN DE FONDO ===== */
.hero-background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
}

.hero-bg-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}

.hero-content {
	text-align: center;
	color: var(--white);
	z-index: 1;
	background: rgba(0, 0, 0, 0.4);
	padding: var(--space-xl);
	border-radius: var(--radius);
	backdrop-filter: blur(10px);
}

.hero-title {
	font-size: var(--text-4xl);
	font-weight: 700;
	line-height: var(--leading-tight);
	margin-bottom: var(--space-md);
}

.hero-subtitle {
	font-size: var(--text-xl);
	line-height: var(--leading-relaxed);
	margin-bottom: var(--space-lg);
	opacity: 0.9;
}

.section-title {
	font-size: var(--text-3xl);
	font-weight: 600;
	text-align: center;
	margin-bottom: var(--space-xl);
}

/* ===== GRID INTRÍNSECO CON SUBGRID ===== */
.projects-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: var(--space-lg);
}

/* ===== SUBGRID PARA ALINEACIÓN PERFECTA ===== */
.project-card {
	display: grid;
	grid-template-columns: subgrid;
	grid-column: span 1;
	/* Fallback para navegadores sin soporte de subgrid */
	@supports not (grid-template-columns: subgrid) {
		display: flex;
		flex-direction: column;
	}
}

/* Aplicar subgrid solo cuando está soportado */
@supports (grid-template-columns: subgrid) {
	.projects-grid {
		grid-template-rows: auto auto 1fr auto auto; /* Imagen, overlay, título, descripción, tags */
	}

	.project-card {
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: subgrid;
		grid-column: span 1;
		grid-row: span 1;
	}

	.project-image-container {
		grid-row: 1;
	}

	.project-overlay {
		grid-row: 2;
	}

	.project-info h3 {
		grid-row: 3;
	}

	.project-info p {
		grid-row: 4;
	}

	.project-tags {
		grid-row: 5;
		align-self: end;
	}
}

/* ===== CONTAINER QUERIES ===== */
@container section-container (min-width: 600px) {
	.project-card {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: var(--space-md);
	}

	.project-card img {
		width: 120px;
		height: 90px;
		object-fit: cover;
		flex-shrink: 0;
	}

	.project-info {
		flex: 1;
	}
}

/* ===== TARJETAS DE PROYECTO ===== */
.project-card {
	background: var(--white);
	border-radius: var(--radius-lg);
	overflow: hidden;
	box-shadow: var(--shadow);
	transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
	transform: translateY(-4px);
	box-shadow: var(--shadow-lg);
}

.project-image-container {
	position: relative;
	overflow: hidden;
}

.project-image {
	width: 100%;
	height: 200px;
	object-fit: cover;
	transition: transform 0.3s ease;
}

.project-card:hover .project-image {
	transform: scale(1.05);
}

.project-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
	opacity: 1;
}

.project-link {
	color: white;
	text-decoration: none;
	padding: var(--space-sm) var(--space-lg);
	border: 2px solid white;
	border-radius: var(--radius);
	font-weight: 600;
	transition: all 0.3s ease;
}

.project-link:hover {
	background: white;
	color: var(--color-text);
}

.project-info {
	padding: var(--space-md);
}

.project-info h3 {
	font-size: var(--text-lg);
	font-weight: 600;
	margin-bottom: var(--space-xs);
	color: var(--color-text);
}

.project-info p {
	font-size: var(--text-sm);
	color: var(--color-secondary);
	margin-bottom: var(--space-sm);
	line-height: var(--leading-normal);
}

/* ===== TAGS ===== */
.project-tags {
	display: flex;
	flex-wrap: wrap;
	gap: var(--space-xs);
}

.tag {
	background: var(--color-primary);
	color: var(--white);
	padding: var(--space-xs) var(--space-sm);
	border-radius: 9999px;
	font-size: var(--text-xs);
	font-weight: 500;
}

/* ===== BOTONES ===== */
.cta-button,
.submit-button {
	background: var(--accent);
	color: var(--white);
	padding: var(--space-sm) var(--space-lg);
	border: none;
	border-radius: var(--radius);
	font-size: var(--text-base);
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s;
	text-decoration: none;
	display: inline-block;
}

.cta-button:hover,
.submit-button:hover {
	background: #d97706;
	transform: translateY(-2px);
}

/* ===== RESPONSIVE IMAGES ===== */
img {
	max-width: 100%;
	height: auto;
}

/* ===== UTILIDADES ===== */
.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

/* Hero con imagen de fondo responsive */
.hero-section {
	position: relative;
	min-height: 100dvh;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.hero-background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
}

.hero-bg-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}

.hero-content {
	text-align: center;
	color: white;
	z-index: 1;
	background: rgba(0, 0, 0, 0.4);
	padding: var(--spacing-xl);
	border-radius: var(--border-radius);
	backdrop-filter: blur(10px);
}

/* ===== CONTAINER DE IMÁGENES DE PROYECTOS ===== */
.project-image-container {
	position: relative;
	overflow: hidden;
	border-radius: var(--border-radius) var(--border-radius) 0 0;
}

.project-image {
	width: 100%;
	height: 200px;
	object-fit: cover;
	object-position: center;
	transition: transform 0.3s ease;
}

.project-card:hover .project-image {
	transform: scale(1.05);
}

/* Overlay con efecto hover */
.project-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
	opacity: 1;
}

.project-link {
	color: white;
	text-decoration: none;
	padding: var(--spacing-sm) var(--spacing-lg);
	border: 2px solid white;
	border-radius: var(--border-radius);
	font-weight: 600;
	transition: all 0.3s ease;
}

.project-link:hover {
	background: white;
	color: var(--text-color);
}

/* ===== IMAGEN DE PERFIL RESPONSIVE ===== */
.about-content {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--spacing-xl);
	align-items: center;
}

.about-image {
	text-align: center;
}

.profile-image {
	width: 100%;
	max-width: 300px;
	height: auto;
	border-radius: 50%;
	box-shadow: var(--shadow-lg);
	transition: transform 0.3s ease;
}

.profile-image:hover {
	transform: scale(1.05);
}

/* ===== CONTAINER QUERIES PARA IMÁGENES ===== */
@container section-container (min-width: 600px) {
	.about-content {
		grid-template-columns: 1fr;
		text-align: center;
	}

	.project-image-container {
		height: 150px;
	}

	.project-image {
		height: 150px;
	}

	.hero-content {
		padding: var(--spacing-lg);
	}
}

/* ===== RESPONSIVE IMAGES CON ASPECT RATIO ===== */
.aspect-ratio-container {
	position: relative;
	width: 100%;
	height: 0;
	padding-bottom: 56.25%; /* 16:9 aspect ratio */
	overflow: hidden;
}

.aspect-ratio-container img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

/* ===== IMÁGENES CON DIFERENTES DENSIDADES ===== */
.high-dpi-image {
	width: 100%;
	height: auto;
	/* Para pantallas de alta densidad */
	image-rendering: -webkit-optimize-contrast;
	image-rendering: crisp-edges;
}

/* ===== RESPONSIVE SVG ===== */
.responsive-svg {
	width: 100%;
	height: auto;
	max-width: 100%;
}

.responsive-svg svg {
	width: 100%;
	height: auto;
}

/* ===== LAZY LOADING PARA IMÁGENES ===== */
.lazy-image {
	opacity: 0;
	transition: opacity 0.3s ease;
}

.lazy-image.loaded {
	opacity: 1;
}

/* ===== MEDIA QUERIES PARA IMÁGENES (Mobile-First: Progressive Enhancement) ===== */
/*
 * ESTRATEGIA MOBILE-FIRST:
 * - Estilos base son para móvil (ya definidos arriba)
 * - min-width agrega estilos para pantallas más grandes
 * - Progressive enhancement - mejoramos la experiencia conforme crece la pantalla
 */

/* Tablet: 481px+ */
@media (min-width: 481px) {
	.hero-content {
		padding: var(--space-md);
	}

	.project-image {
		height: 160px;
	}

	.profile-image {
		max-width: 200px;
	}
}

/* Desktop pequeño: 769px+ */
@media (min-width: 769px) {
	.hero-bg-image {
		object-position: center;
	}

	.project-image {
		height: 180px;
	}

	.profile-image {
		max-width: 250px;
	}

	.hero-content {
		padding: var(--space-lg);
	}
}

/* Desktop grande: 1024px+ */
@media (min-width: 1024px) {
	.project-image {
		height: 200px;
	}

	.profile-image {
		max-width: 300px;
	}
}

	.project-image {
		height: 160px;
	}

	.profile-image {
		max-width: 200px;
	}
}

/* ===== UTILIDADES PARA IMÁGENES ===== */
.image-placeholder {
	background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(
			-45deg,
			#f0f0f0 25%,
			transparent 25%
		), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
	background-size: 20px 20px;
	background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.image-loading {
	background: var(--bg-color);
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--secondary-color);
}
```

> **💡 Recordatorio:**
>
> - Guarda el código HTML en `/responsive/ejercicio-3.html`
> - Añade el código CSS en `/assets/css/ejercicio-3.css` (carpeta ya existe)
> - El HTML incluye dos enlaces CSS: tema general y específico del ejercicio

**🚀 Cómo probar tu ejercicio:**

1. Abre `/responsive/ejercicio-3.html` en tu navegador
2. Prueba el scroll-snap desplazándote por las secciones
3. Redimensiona la ventana para ver el comportamiento responsive
4. Compara con los ejercicios anteriores para ver la evolución
5. Usa las herramientas de desarrollador (F12) para simular dispositivos móviles

**JavaScript para lazy loading (opcional):**

```javascript
// Lazy loading para imágenes
const lazyImages = document.querySelectorAll('.lazy-image');

const imageObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const img = entry.target;
			img.src = img.dataset.src;
			img.classList.add('loaded');
			observer.unobserve(img);
		}
	});
});

lazyImages.forEach((img) => imageObserver.observe(img));

// Preload de imágenes críticas
const preloadImage = (src) => {
	const img = new Image();
	img.src = src;
};

// Preload de la imagen hero
preloadImage('https://picsum.photos/1920/1080?random=hero-large');
```

**¿Qué demuestra este ejemplo?**

1. **Picture Element**: Diferentes imágenes según el tamaño de pantalla
2. **Object-fit**: Control preciso del recorte y posicionamiento
3. **Aspect Ratio**: Mantener proporciones consistentes
4. **Subgrid**: Alineación perfecta de elementos en las tarjetas de proyecto
5. **Lazy Loading**: Carga diferida para mejor performance
6. **Hover Effects**: Interacciones visuales con las imágenes
7. **Container Queries**: Adaptación basada en el contenedor, no en el viewport
8. **High DPI**: Optimización para pantallas de alta densidad

**Técnicas aplicadas:**

- **`<picture>`**: Múltiples fuentes según media queries
- **`object-fit: cover`**: Recorte inteligente manteniendo proporciones
- **`grid-template-columns: subgrid`**: Herencia de estructura de grid para alineación perfecta
- **`aspect-ratio`**: Proporciones consistentes sin JavaScript
- **`backdrop-filter`**: Efectos modernos de desenfoque
- **Container Queries**: Adaptación intrínseca de las imágenes
- **Style Queries**: 🆕 Adaptación contextual basada en propiedades de estilo del contenedor
- **Lazy Loading**: Carga optimizada para performance

**🆕 Style Queries en acción:**

Este ejercicio demuestra **Style Queries** con un sistema de temas donde los componentes se adaptan automáticamente según el contexto de estilo de su contenedor:

- **Tema claro** (`theme-light`): Componentes con fondos sólidos y sombras sutiles
- **Tema oscuro** (`theme-dark`): Componentes con fondos translúcidos y efectos de blur
- **Adaptación automática**: Los mismos componentes cambian su apariencia según el tema del contenedor
- **Sin JavaScript**: Todo manejado por CSS con `@container style()`

## Conclusión: Hacia el Diseño Intrínseco

A lo largo de esta lección hemos explorado la evolución del diseño web desde el responsive tradicional hacia enfoques más **intrínsecos y elásticos**. Los tres ejercicios prácticos demuestran esta progresión:

- **Ejercicio 1** nos enseñó los fundamentos con Media Queries y Flexbox
- **Ejercicio 2** introdujo técnicas modernas con Grid y Container Queries
- **Ejercicio 3** integró todo en un portafolio SPA completo

### Preguntas de Reflexión

Para consolidar el aprendizaje, reflexiona sobre estas cuestiones:

- **¿Por qué** es importante ofrecer una experiencia unificada en distintos dispositivos? (Pista: piensa en la satisfacción del usuario, SEO, alcance de audiencia, etc.)
- Analiza un sitio web conocido y describe **qué partes** de su diseño parecen fluidas y cuáles responden a breakpoints. ¿Notas saltos? ¿Podrías mejorar algo con técnicas aprendidas?
- Considera un elemento de UI complejo (por ej., una tabla de datos grande). ¿Qué combinación de técnicas usarías para hacerlo usable en móvil sin perder funcionalidad en desktop?
- **Perspectiva intrínseca**: Imagina un componente de navegación que debe funcionar tanto en el header principal como en un sidebar estrecho. ¿Cómo diseñarías este componente para que sea **consciente de su contexto** y se adapte automáticamente?

El futuro del diseño web está en crear **sistemas elásticos** donde cada componente es consciente de su contexto y se adapta intrínsecamente, combinando lo mejor del responsive tradicional con la fluidez moderna.

## 📁 Resumen de Archivos Creados

Al final de esta lección, deberías tener la siguiente estructura de archivos:

```
/responsive/
├── ejercicio-1.html              # Portafolio básico con Media Queries + Flexbox
├── ejercicio-2.html              # Portafolio moderno con Grid + Container Queries
└── ejercicio-3.html              # Portafolio SPA con Scroll-snap + Imágenes responsive

/assets/css/
├── index.css                     # CSS del tema del estudiante (ya existe)
├── ejercicio-1.css               # CSS específico para Ejercicio 1
├── ejercicio-2.css               # CSS específico para Ejercicio 2
└── ejercicio-3.css               # CSS específico para Ejercicio 3
```

**🎯 Próximos pasos:**

1. **Abre cada ejercicio** en tu navegador para ver los resultados
2. **Compara los ejercicios** para entender la evolución de técnicas
3. **Experimenta** modificando los valores CSS y observa los cambios
4. **Prueba en diferentes dispositivos** o usando las herramientas de desarrollador
5. **Personaliza** los ejercicios con tu propio contenido e imágenes

---

## Referencias

[^1]: [https://www.harlointeractive.com/blog/post/goodbye-responsive-hello-intrinsic](https://www.harlointeractive.com/blog/post/goodbye-responsive-hello-intrinsic)
[^2]: [La importancia del diseño web responsive en la era móvil | Pibeca Solutions](https://www.pibeca.com/2023/11/27/la-importancia-del-diseno-web-responsive-en-la-era-movil/#:~:text=El%20dise%C3%B1o%20web%20responsive%20se,audiencia%20cada%20vez%20m%C3%A1s%20m%C3%B3vil)
[^3]: [El diseño web fluido](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=Hoy%20en%20d%C3%ADa%2C%20en%20una,%E2%80%8D)
[^4]: [La importancia del diseño web responsive en la era móvil | Pibeca Solutions](https://www.pibeca.com/2023/11/27/la-importancia-del-diseno-web-responsive-en-la-era-movil/#:~:text=El%20dise%C3%B1o%20web%20ha%20experimentado,este%20enfoque%20ha%20cambiado%20dr%C3%A1sticamente)
[^5]: [El diseño web fluido](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=Desde%20que%20sali%C3%B3%20el%20iPhone,%E2%80%8D)
[^6]: [La importancia del diseño web responsive en la era móvil | Pibeca Solutions](https://www.pibeca.com/2023/11/27/la-importancia-del-diseno-web-responsive-en-la-era-movil/#:~:text=Este%20cambio%20hacia%20el%20dise%C3%B1o,a%20la%20audiencia%20en%20l%C3%ADnea)
[^7]: [Responsive web design - Wikipedia](https://en.wikipedia.org/wiki/Responsive_web_design#:~:text=Responsive%20web%20design%20became%20more,13)
[^8]: [La importancia del diseño web responsive en la era móvil | Pibeca Solutions](https://www.pibeca.com/2023/11/27/la-importancia-del-diseno-web-responsive-en-la-era-movil/#:~:text=Este%20cambio%20hacia%20el%20dise%C3%B1o,a%20la%20audiencia%20en%20l%C3%ADnea)
[^9]: [¿Qué son los diseños web fluidos, adaptativos y responsivos?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/#:~:text=Dise%C3%B1o%20web%20l%C3%ADquido%20o%20fluido)
[^10]: [¿Qué son los diseños web fluidos, adaptativos y responsivos?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/#:~:text=En%20este%20tipo%20de%20dise%C3%B1o,textos%20son%20dif%C3%ADciles%20de%20leer)
[^11]: [¿Qué son los diseños web fluidos, adaptativos y responsivos?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/#:~:text=Como%20una%20forma%20de%20evitar,horizontal%20en%20las%20m%C3%A1s%20peque%C3%B1as)
[^12]: [¿Qué son los diseños web fluidos, adaptativos y responsivos?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/#:~:text=Usa%20plantillas%20est%C3%A1ticas%20basadas%20en,se%20cambia%20a%20otro%20dise%C3%B1o)
[^13]: [¿Qué son los diseños web fluidos, adaptativos y responsivos?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/#:~:text=Esta%20aproximaci%C3%B3n%20podr%C3%ADa%20funcionar%20mejor,gana%20cada%20vez%20m%C3%A1s%20relevancia)
[^14]: [El diseño web fluido](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=En%20cualquier%20caso%2C%20como%20dec%C3%ADa%2C,%E2%80%8D)
[^15]: [El diseño web fluido](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=Pero%20la%20accesibilidad%20y%20la,%E2%80%8D)
[^16]: [La importancia del diseño web responsive en la era móvil | Pibeca Solutions](https://www.pibeca.com/2023/11/27/la-importancia-del-diseno-web-responsive-en-la-era-movil/#:~:text=La%20respuesta%20a%20este%20desaf%C3%ADo,desde%20el%20que%20se%20accede)
[^17]: [Responsive web design - Wikipedia](https://en.wikipedia.org/wiki/Responsive_web_design#:~:text=,to%20any%20device%20screen%20size)
[^18]: [Responsive web design - Wikipedia](https://en.wikipedia.org/wiki/Responsive_web_design#:~:text=,to%20any%20device%20screen%20size)
[^19]: [Responsive web design - Wikipedia](https://en.wikipedia.org/wiki/Responsive_web_design#:~:text=,to%20any%20device%20screen%20size)
[^20]: [GitHub](https://github.com/ruvebal-udit/web-fundamentals/blob/eaa1f9b1d58060e616645f06d6f85d56b9e18a10/docs/responsive/LEEME.md#L401-L405)
[^21]: [El diseño web fluido](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=Responsive%20Fluido%3A)
[^22]: [El diseño web fluido](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=El%20dise%C3%B1o%20fluido%20es%2C%20por,%E2%80%8D)
[^23]: [harlointeractive.com](https://www.harlointeractive.com/blog/post/goodbye-responsive-hello-intrinsic#:~:text=The%20beauty%20of%20intrinsic%20design,it%20into%20rigidly%20proportioned%20columns)
[^24]: [harlointeractive.com](https://www.harlointeractive.com/blog/post/goodbye-responsive-hello-intrinsic#:~:text=The%20beauty%20of%20intrinsic%20design,it%20into%20rigidly%20proportioned%20columns)
[^25]: [harlointeractive.com](https://www.harlointeractive.com/blog/post/goodbye-responsive-hello-intrinsic#:~:text=The%20beauty%20of%20intrinsic%20design,it%20into%20rigidly%20proportioned%20columns)
[^26]: [El diseño web fluido](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=Responsive%20Fluido%3A)
[^27]: [El diseño web fluido](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=Mantendremos%20los%20breakpoints%20y%20la,%E2%80%8D)
[^28]: [Diseño web responsive: Tipografía fluida con CSS clamp • Silo Creativo](https://www.silocreativo.com/diseno-web-responsive-tipografia-fluida-con-css-clamp/#:~:text=La%20tipograf%C3%ADa%20fluida%20tiene%20una,de%20media%20queries%20con%20diferentes)
[^29]: [clamp() - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp#:~:text=Note%20that%20using%20,the%20use%20of%20media%20queries)
[^30]: [Diseño y tipografía fluida con CSS: Cómo aplicarlo a tu web con clamp](https://utopigstudio.com/es/blog/diseno/tipografia-fluida-css-clamp#:~:text=Esta%20funci%C3%B3n%20toma%20tres%20argumentos%3A)
[^31]: [Diseño y tipografía fluida con CSS: Cómo aplicarlo a tu web con clamp](https://utopigstudio.com/es/blog/diseno/tipografia-fluida-css-clamp#:~:text=Pst%3A%20Clamp%20como%20verbo%20en,que%20el%20nombre%20tiene%20sentido)
[^32]: [El diseño web fluido](https://www.kingseo.es/post/el-diseno-web-fluido-2022#:~:text=El%20dise%C3%B1o%20fluido%20es%2C%20por,%E2%80%8D)
[^33]: [Diseño web responsive: Tipografía fluida con CSS clamp • Silo Creativo](https://www.silocreativo.com/diseno-web-responsive-tipografia-fluida-con-css-clamp/#:~:text=Con%20las%20tipograf%C3%ADas%20fluidas%2C%20hacemos,m%C3%ADnimo%20de%20tama%C3%B1o%20de%20fuente)
[^34]: [Images - Bootstrap](https://getbootstrap.com/docs/4.0/content/images/#:~:text=Images%20,scales%20with%20the%20parent%20element)
[^35]: [Diseño web responsive: Tipografía fluida con CSS clamp • Silo Creativo](https://www.silocreativo.com/diseno-web-responsive-tipografia-fluida-con-css-clamp/#:~:text=tama%C3%B1o%20adecuado,referimos%20a%20la%20tipograf%C3%ADa%20fluida)
[^36]: freecodecamp.org
[^37]: [¿Qué son los diseños web fluidos, adaptativos y responsivos?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/#:~:text=En%20este%20tipo%20de%20dise%C3%B1o,textos%20son%20dif%C3%ADciles%20de%20leer)
[^38]: [clamp() - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp#:~:text=Note%20that%20using%20,the%20use%20of%20media%20queries)
[^40]: [alistapart.com](https://alistapart.com/article/responsive-web-design/)
[^41]: [alistapart.com](https://alistapart.com/article/fluidgrids/)
[^42]: [¿Qué son los diseños web fluidos, adaptativos y responsivos?](https://blog.ida.cl/diseno/diferencias-diseno-web-fluido-adaptativo-responsivo/)
[^43]: [Diseño web responsive: Tipografía fluida con CSS clamp • Silo Creativo](https://www.silocreativo.com/diseno-web-responsive-tipografia-fluida-con-css-clamp/)
[^44]: [Diseño y tipografía fluida con CSS: Cómo aplicarlo a tu web con clamp](https://utopigstudio.com/es/blog/diseno/tipografia-fluida-css-clamp)
[^45]: [El diseño web fluido](https://www.kingseo.es/post/el-diseno-web-fluido-2022)
[^46]: [La importancia del diseño web responsive en la era móvil | Pibeca Solutions](https://www.pibeca.com/2023/11/27/la-importancia-del-diseno-web-responsive-en-la-era-movil/)
[^47]: [Images - Bootstrap](https://getbootstrap.com/docs/4.0/content/images/)