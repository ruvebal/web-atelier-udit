# Temario bibliography — T3 production frontier Astro/PWA/3D/IoT — edited merge
<!-- pass1 + pass2 reconciled · bilingual ES/EN · frontend-pedagogy -->

## Provenance

- pass1_prompt: `T3-production-frontier-astro-pwa-3d-iot.pass1.prompt.md`
- pass1_artifact: `T3-production-frontier-astro-pwa-3d-iot.pass1.raw.md`
- pass1_surface: ChatGPT Deep Research · external model A · rendered capture
- pass1_capture_note: raw artifact preserves the completed rendered research map; the completion control stalled after research/search completion
- pass2_artifact: `T3-production-frontier-astro-pwa-3d-iot.pass2.raw.md`
- pass2_surface: Claude Cloud · external model B
- merge_surface: Codex careful human+tools · Pass 3
- date: 2026-08-11
- merge_policy: promoted only pass2-confirmed or pass2-disputed-corrected records with DOI/ISBN; unresolved records remain in Quarantine

## Arquitectura de renderizado en producción / Production rendering architecture

### A · Técnico / Technical

- [ESTABLISHED] La arquitectura de micro-frontends tiene beneficios y costes recurrentes —autonomía, despliegue independiente, duplicación, payload y complejidad operativa— y debe enseñarse como decisión contextual.
  - cite: Severi Peltonen, Luca Mezzalira, and Davide Taibi, *Motivations, Benefits, and Issues for Adopting Micro-Frontends: A Multivocal Literature Review*, 2021, *Information and Software Technology* 136
  - doi: 10.1016/j.infsof.2021.106571
  - ES: Micro-frontends: motivaciones, beneficios, costes y adopción
  - EN: Micro-frontends: motivations, benefits, costs, and adoption
  - fit_ES: Permite enseñar micro-frontends como decisión arquitectónica condicionada por escala organizativa y técnica.
  - fit_EN: It supports teaching micro-frontends as an architectural decision conditioned by organizational and technical scale.
  - scope: interface-layer
  - verified_by: pass2-confirmed

- [EMERGING] Las arquitecturas de islas recuperan HTML generado fuera del cliente y limitan JavaScript/hidratación a regiones interactivas.
  - cite: Juho Vepsäläinen, Arto Hellas, and Petri Vuorimaa, *The Rise of Disappearing Frameworks in Web Development*, 2023, *Web Engineering: 23rd International Conference (ICWE 2023)*, Springer LNCS 13893
  - doi: 10.1007/978-3-031-34444-2_23
  - isbn: 978-3-031-34444-2
  - ES: Arquitectura de islas, hidratación parcial y frameworks que desaparecen
  - EN: Islands architecture, partial hydration, and disappearing frameworks
  - fit_ES: Fundamenta comparar SPA hidratada, SSR/SSG y enfoques de islas atendiendo al coste de JavaScript en cliente.
  - fit_EN: It grounds comparisons of hydrated SPAs, SSR/SSG, and islands approaches in client-side JavaScript cost.
  - scope: web-platform
  - verified_by: pass2-confirmed

### B · Canónico-teórico / Canonical-theoretical

No se promueve *Building Micro-Frontends*: su ISBN quedó `unverifiable` en Pass 2.

### C · Académico / Academic

No se promueve de Amorim/Canedo: DOI e ISBN quedaron `unverifiable` en Pass 2.

## PWA y resiliencia offline / PWA and offline resilience

### A · Técnico / Technical

Service Workers y Web Application Manifest permanecen en Quarantine: son documentación normativa sin DOI/ISBN y no deben entrar en el cuerpo bibliográfico bajo el hard gate.

### B · Canónico-teórico / Canonical-theoretical

No se promueve Steiner: Pass 2 lo dejó `unverifiable` aunque el DOI está presente en el mapa.

### C · Académico / Academic

No se promueve Malavolta et al.: Pass 2 lo dejó `unverifiable`.

## Ingeniería de rendimiento / Performance engineering

### A · Técnico / Technical

No se promueven Web Vitals, Hogan ni Wagner: documentación/monografías sin confirmación suficiente en Pass 2 permanecen en Quarantine.

### B · Canónico-teórico / Canonical-theoretical

No se promueve Janssen et al.: DOI `unverifiable` en Pass 2.

### C · Académico / Academic

- [EMERGING] La eficiencia energética del front-end puede variar materialmente con compresión de imágenes, lazy loading y minificación, por lo que el presupuesto de rendimiento también puede justificarse como restricción ambiental.
  - cite: Jerin Anan Proma, Fatema Tuz Zannat, Mohammed Shawqi Aftab, Tahura Akter Tripty, M. Saddam Hossain Khan, Raihan Ul Islam, and Rashedul Amin Tuhin, *Energy-Efficient Web Design: Measuring Impact of Front-end Optimizations*, 2025, *Proceedings of the 12th International Conference on Next Generation Computing, Communication, Systems and Security (NSysS ’25)*
  - doi: 10.1145/3777555.3777561
  - ES: Rendimiento front-end y eficiencia energética
  - EN: Front-end performance and energy efficiency
  - fit_ES: Amplía performance hacia el coste material del software entregado.
  - fit_EN: It extends performance discussion toward the material cost of delivered software.
  - scope: peer-reviewed
  - verified_by: pass2-confirmed
  - verification_url: https://fse.ewubd.edu/publications?page=8

- [EMERGING] La medición directa del consumo de aplicaciones web está madurando como línea de ingeniería de software sostenible, sin equivalencia simple entre performance score y consumo energético.
  - cite: L. Khrouf, M. Shatnawi, A. Thiam Niang, and A. Verhaeghe, *On the Energy Consumption of Web Applications: An Empirical Study of their Design Solutions*, 2025, *GREENS@ICSE 2025*
  - doi: 10.1109/GREENS66463.2025.00012
  - ES: Coste energético medido de aplicaciones web
  - EN: Measured energy cost of web applications
  - fit_ES: Introduce los límites de las métricas proxy y exige medición antes de atribuir sostenibilidad.
  - fit_EN: It introduces proxy-metric limits and requires measurement before attributing sustainability.
  - scope: peer-reviewed
  - verified_by: pass2-confirmed

## Frontera 3D y estética en la web / 3D and aesthetic frontier on the web

### A · Técnico / Technical

No se promueven *WebGL Insights* ni *Real-Time Rendering*: los ISBN quedaron `unverifiable` en Pass 2.

### B · Canónico-teórico / Canonical-theoretical

No se promueve una referencia 3D canónica adicional con verificación Pass 2 suficiente.

### C · Académico / Academic

No se promueven Bi et al. ni Rivas Pagador/Cabrero Barros: ambos DOI quedaron `unverifiable` en Pass 2.

## Capa de interfaz más allá de la página web / Interface layer beyond the browser page

### A · Técnico / Technical

No se promueve Miu et al.: el DOI está presente, pero el venue quedó impreciso y `unverifiable` en Pass 2.

### B · Canónico-teórico / Canonical-theoretical

No se promueve *Designing Interfaces*: el ISBN quedó `unverifiable` en Pass 2.

### C · Académico / Academic

No se promueven los dos trabajos de laboratorios remotos: Pass 2 dejó ambos DOI `unverifiable`.

## Cross-cut · AI-assisted code review (human-in-the-loop)

### A · Técnico / Technical

- [ESTABLISHED] La revisión automática debe enseñarse como señal falible que exige inspección humana, porque incluso herramientas consolidadas producen falsos positivos.
  - cite: Zhaoqiang Guo, Tingting Tan, Shiran Liu, Xutong Liu, Wei Lai, Yibiao Yang, Yanhui Li, Lin Chen, Wei Dong, and Yuming Zhou, *Mitigating False Positive Static Analysis Warnings: Progress, Challenges, and Opportunities*, 2023, *IEEE Transactions on Software Engineering*
  - doi: 10.1109/TSE.2023.3329667
  - ES: Falsos positivos, triage y responsabilidad del revisor
  - EN: False positives, triage, and reviewer responsibility
  - fit_ES: Fundamenta decisiones ACCEPT/REJECT justificadas frente a comentarios generados.
  - fit_EN: It grounds justified ACCEPT/REJECT decisions rather than automatic acceptance of generated comments.
  - scope: programming-general
  - verified_by: pass2-disputed-corrected
  - verification_url: https://dblp.org/rec/journals/tse/GuoTLLLYLCDZ23.html

### B · Canónico-teórico / Canonical-theoretical

No se promueven AlOmar, Prather et al. ni las guías docentes de GenAI: quedaron `unverifiable` en Pass 2.

### C · Académico / Academic

No se promueven Oliveira et al. ni Parra/Willingham: el primero tiene DOI no confirmado en Pass 2 y el segundo quedó `unverifiable`.

## Quarantine

- Luca Mezzalira, *Building Micro-Frontends*, ISBN 978-1492082996; Giovanni Cunha de Amorim and Edna Dias Canedo, DOI 10.5220/0013195800003929 / ISBN 978-989-758-749-8 — `unverifiable`.
- W3C *Service Workers 1* and *Web Application Manifest* — no DOI/ISBN; normative resources retained only as platform notes.
- Thomas Steiner, DOI 10.1145/3184558.3188742; Ivano Malavolta et al., DOI 10.1145/3387905.3388593; Philip Walton/Barry Pollard, web.dev; Lara Callender Hogan, ISBN 978-1491902516; Jeremy Wagner, ISBN 978-1617293771; Kevin Janssen et al., DOI 10.1145/3530019.3530033 — `unverifiable`.
- Patrick Cozzi, ISBN 978-1498716079; Tomas Akenine-Möller et al., ISBN 978-1138627000; Bi et al., DOI 10.1145/3543507.3583329; Rivas Pagador/Cabrero Barros, DOI 10.1145/3505284.3532981 — `unverifiable`.
- Anson Miu et al., DOI 10.1145/3426422.3426984; Jenifer Tidwell et al., ISBN 978-1492051961; Garefalakis et al., DOI 10.1145/3716554.3716602 and DOI 10.3390/info15040209 — `unverifiable`.
- Eman Abdullah AlOmar, DOI 10.1145/3722229; Eduardo Araujo Oliveira et al., DOI 10.1145/3786580.3786956; E. Parra/S. Willingham, DOI 10.1109/CSEET66350.2025.00008; James Prather et al., DOI 10.1145/3649405.3659534; A. Alami et al., DOI 10.1109/CHASE66643.2025.00016 — `unverifiable`.

## Gaps that remain

- No sufficiently verified Pass 2 source establishes higher-education pedagogy for Astro/Next/Nuxt-style metaframeworks or islands.
- No sufficiently verified Pass 2 source establishes React Three Fiber pedagogy; Three.js/R3F remains a curricular frontier, not a demonstrated pedagogical standard.
- No sufficiently verified Pass 2 source establishes a React/component-model transfer principle for IoT/robotics or FastAPI/Python as a front-end pedagogy.

## Change log

- Converted the amended, cleaned rendered capture into a Pass 3 edited merge with explicit Provenance, Quarantine, and per-item `verified_by` fields.
- Promoted only Peltonen, Vepsäläinen, Energy-Efficient Web Design, Khrouf, and corrected Guo records.
- Corrected the Guo first author, restored the full Energy-Efficient Web Design author/venue record, and restored Khrouf’s subtitle and author list.
- Kept all unresolved 3D, IoT, PWA, and AI-review candidates in Quarantine; did not invent a Three.js/R3F pedagogy source to fill the gap.
