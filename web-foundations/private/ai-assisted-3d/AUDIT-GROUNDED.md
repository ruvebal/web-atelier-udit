# Grounded Audit — AI-Assisted 3D (`private/ai-assisted-3d/`)

> **Wired 2026-08-14:** forge Step A (`frontend-pedagogy/fe-unit-forge.mdc`) · evidence matrix rows 8–9 · student covenant `/lessons/en/feii/ai-assisted-3d-covenant/` · Units 8–9 labs. Shared adopt/reject: `~/src/studio-skillopt/docs/MERGE-GATE-PROTOCOL.md`.

> *El conocimiento os hará libres.*  
> This audit separates **what the instructor demos once** (prospector / studio stack) from **what Units 8–9 students must deliver** (R3F transfer, one understood shader, measurable perf budget, human merge rubric — **no tool shopping**). Evidence chain: Profield edited run `pass1.edited.md` (20260814) → DevIAC vectors (`project_slug=profield-ai-assisted-3d-web`, `knowledge_scope=field_prospection`) → Ahmes vaults under `source-pdfs/.ahmes/batch-manifest.json` (9 PDFs, all `PROCESSED_OK`) → FE II CV Bloque 5 (Unidades 8–9).

**Scope:** seven module files — `index.md`, `mcp-preflight/`, `cursor-rules/`, `claude-workflows/`, `windsurf-config/`, `corpus-to-boilerplate/` (+ `preflight.sh`).

**Vector discovery (2026-08-14):** `POST localhost:8100/vectors/search` returned strong hits on AI Co-Artist (mixed-initiative GLSL evolution), Shihab et al. (Copilot cognitive offloading), Ma et al. (metacognitive scaffolding). Vector snippets are **discovery only**; claims below cite Ahmes nodes after `ahmes query --cite`.

**CV anchor (Bloque 5):** Units 8–9 are an **interface-layer transfer** exercise — React state/hooks applied to R3F, GLSL intro, post-processing, perf budgets, AI **human-in-the-loop** — not a graphics degree or MCP toolchain course. FE II CV explicitly lists Bloque 5 as **`[UNVERIFIED-GAP]`** in the sovereign Ahmes vault (no peer-reviewed R3F/shader pedagogy corpus yet).

---

## Split audit (mandatory)

### Instructor / prospector layer — demo once

**Audience:** instructor, TA, studio partner preparing cohort scaffold or vShowroom runtime — **not** the default student reading path for Entrega 2.

| Asset | Role | Verdict |
| --- | --- | --- |
| `mcp-preflight/` + `preflight.sh` | Browser MCP mandatory; Stitch / 21st.dev / Nano Banana / DevIAC optional; UI UX Pro Max skill | **Keep private** — one live demo per term |
| `corpus-to-boilerplate/` | Master prompt: full 3D corpus → production scaffold (SSR, i18n, p5-texture, Hygraph stub) | **Prospector only** — scope far exceeds Units 8–9 |
| `index.md` § tooling stack | Concrete 2026 MCP/skill matrix | **Split:** move to instructor appendix; strip from student-facing Units 8–9 |
| Stitch → shadcn → Canvas workflow | Design-first 2D-over-3D | **Demo once** — illustrates taste problem + hybrid DOM/WebGL |
| DevIAC Gateway | Knowledge RAG over ingested docs | **Studio optional** — aligns with local-only AI rule |

**Grounded strengths**

- **Mixed-initiative framing** matches emerging graphics + CS-education evidence: human selection steers LLM shader evolution rather than one-shot generation (`2512_08951_ai_co_artist` — see citations).
- **Render-/browser-verified workflows** align with frontier evaluation (program → render → judge), even when the benchmark is SVG not WebGL (`2509_05208_sgp_genbench`).
- **Persistent context** (Cursor rules, `CLAUDE.md`, `DESIGN.md`) mirrors practitioner repo-instruction patterns; Profield notes no 3D-specific RCT yet — honest scope.
- **MCP as senses, not oracle:** preflight correctly treats Browser MCP as runtime verification; MCP does not establish visual correctness by itself (`pass1.edited.md` §5).

**Overskill / hype risk**

- **Tool shopping as curriculum:** five MCPs + UI UX Pro Max + three editors reads like a product launch, not Bloque 5. Profield: no peer-reviewed evaluation of MCP for R3F/WebGL in HE (`pass1.edited.md` §5, `[UNVERIFIED-GAP]`).
- **Corpus-to-boilerplate scope:** SSR streaming, i18n split, p5 live texture, Hygraph stub, Gaussian splatting placeholders — **Entrega 2 is R3F + one shader + perf budget + merge rubric**, not a studio monorepo.
- **Stitch / “vibe design”:** Profield warns GenAI can induce **design fixation** and population-level homogenization — instructor must show the counter-move (human art direction, `DESIGN.md`, rejection rubric), not imply Stitch “solves taste.”
- **Cloud API dependencies** (Stitch/Gemini, 21st.dev, OpenAI in AI Co-Artist supplementary) conflict with course **local-only AI** posture unless demo uses DevIAC/Ollama substitutes and disclosure is explicit.

**Gaps vs CV (Bloque 5 / Units 8–9)**

- CV requires **understood code**, not scaffold generation at portfolio scale — corpus prompt overshoots.
- CV does **not** list MCP setup, Stitch, or boilerplate generation as learning outcomes.
- Unit 6 (human-in-the-loop PR review) is the **evaluated** AI pattern in FE II; this module does not yet cross-link ACCEPT/REJECT decision logs to 3D merges.

**Ahmes-backed claims**

- Interactive GLSL evolution through **visual selection**, removing manual programming as a *creation* path — not a *literacy* path: `⟨2512_08951_ai_co_artist_b431f6a4⟩ · nodo 777b3e26-2775-5cc3-ade3-96fec7239cd9 · p. 2` — **[BIBLIO-GAP]** (`evaluator_safe=no`, host/title metadata mismatch).
- RL pipeline scoring **rendered images** against text (adjacent “render-verified” methodology): `⟨2509_05208_sgp_genbench_1c4cc8ae⟩ · nodo 6a647121-761a-5833-8a4c-b9443094636f · p. 6` — **[BIBLIO-GAP]**.

**[BIBLIO-GAP]**

- No Ahmes node in this manifest supports “MCP improves 3D learning outcomes” — claim absent; do not teach as evidence.
- No node for ShaderMatch failure rates (paper not in batch manifest) — cite Profield edited report only as `[UNVERIFIED-GAP]` until PDF ingested.

---

### Student layer — Units 8–9 deliverable

**Audience:** FE II students — Entrega 2 seed (Units 8–10); **minimum bar for Units 8–9:**

1. R3F scene demonstrating **interface-layer transfer** (component/state model, not raw Three.js tutorial).
2. **One custom GLSL shader** (or `shaderMaterial`) the student can explain — uniforms, coordinate space, one deliberate effect.
3. **Documented perf budget** (`renderer.info`, draw calls, DPR, post-pass count) with before/after or acceptance thresholds.
4. **Human merge rubric** applied to any AI-assisted diff (gates in `index.md` § rubric — no new MCP installs required).

| Asset | Student use | Verdict |
| --- | --- | --- |
| `index.md` § philosophy, human/model table, rubric, red-team, perf prompts | **Core** — trim tooling sections | Publish distilled excerpt to Units 8–9 |
| `cursor-rules/` (especially `20-r3f`, `30-shaders`, `50-performance`, `70-shadcn-ui`) | **Core** — copy numeric budgets into project template | Align with Unit 8–9 labs |
| `claude-workflows/` § `CLAUDE.md`, subagent *shader* + *perf audit* | **Optional** — same rules as Unit 6 AI covenant | No Stitch/MCP required |
| `windsurf-config/` | **Optional** — Windsurf users only | Mirror of Cursor rules |
| `mcp-preflight/`, `corpus-to-boilerplate/` | **Exclude** from student path | Instructor demo |

**Grounded strengths**

- **Performance as evaluable constraint** matches CV Bloque 4 transfer + Bloque 5 WebGL perf: draw-call caps, `useFrame` discipline, post-stack justification — fills Profield gap (“no HE GPU budget study”) with **explicit classroom contract**.
- **Merge rubric** (API truth, memory, motion, ui/canvas boundary) operationalizes Unit 6 human-in-the-loop without naming Copilot — students **verify**, not **shop tools**.
- **Shader excerpt + debugging prompts** align with Profield: GLSL is low-resource for LLMs; incremental diff review is research-aligned (`pass1.edited.md` §1, §3).
- **2D-over-3D architecture** (DOM shadcn vs Drei `<Html>`) matches practitioner accessibility rationale — semantic DOM vs pixel canvas (`pass1.edited.md` §6); Drei `<Html>` budget (≤20) is measurable.
- **Cursor rules `50-performance.mdc`** defaults (≤200 desktop / ≤80 mobile draw calls) give Entrega 2 a concrete checklist.

**Overskill / hype risk**

- **`index.md` “concrete tooling stack for 2026”** — students will interpret mandatory MCP installs as part of the grade; contradicts “NO tool shopping.”
- **UI UX Pro Max / DESIGN.md / Stitch** — Profield: AI lowers syntax barriers while **removing need to understand code** (AI Co-Artist); for Unit 9 “shader literacy,” design-skills must not substitute for explaining `uTime` and `vUv`.
- **`claude-workflows` composition subagent** — art-direction without code is fine for portfolio craft, but Unit 9 requires **code understood**; label as optional stretch.
- **Dissolve shader excerpt** in `index.md` — good teaching snippet; ensure Unit 9 assesses **student-authored** variant, not paste-from-lesson.

**Gaps vs CV**

| CV requirement (Bloque 5) | Module coverage | Gap |
| --- | --- | --- |
| R3F as React pattern transfer | Strong in rules + index architecture | Unit 8 lesson must link **private → public** distill |
| GLSL fundamentals + custom materials | `30-shaders.mdc`, prompts, excerpt | Missing **minimum viable GLSL syllabus** (Profield `[UNVERIFIED-GAP]`) — add 4–6 concept checklist in Unit 9 |
| Post-processing (bloom, CA) | Mentioned in prompts/boilerplate | No **mobile cost** warning tied to Unit 7 perf ethos — add one measured example |
| Perf budgets | Excellent in `50-performance.mdc`, `PERF_BUDGETS.md` template | Link to Unit 7 **optimization hints rarely used** (Phung) — budget must be **graded** |
| AI human-in-the-loop | Rubric + human/model table | Missing **decision log** template (ACCEPT/REJECT) parity with Unit 6 |
| No graphics-course drift | Risk from corpus prompt + MCP stack | **Firewall** instructor docs |

**Ahmes-backed claims**

- Copilot can increase speed while students **accept suggestions without reflecting** — cognitive offloading risk for “understood shader” outcome: `⟨2506_10051_copilot_brownfield_29f3d2f5⟩ · nodo 1d671902-3c68-5ad4-9b08-198236f1d5e5 · p. 9` — **[BIBLIO-GAP]** (Shihab et al., ICER 2025; DOI 10.1145/3702652.3744219 in extraction metadata).
- Metacognitive **planning / monitoring / evaluation** framing for AI coding assistants: `⟨2511_04144_scaffolding_metacognition_9eaf7220⟩ · nodo e20ed0ff-11c6-5d81-9f34-8bd509cc6e70 · p. 18` — **[BIBLIO-GAP]** (Ma et al.; transfer to graphics extrapolated — state boundary).
- GenAI exposure linked to **design fixation** (divergent thinking concern): `⟨2403_11164_design_fixation_de51c7ac⟩ · nodo 770815a4-c3b9-5d3e-ab71-5c009548393f · p. 0` — **[BIBLIO-GAP]** (Wadinambiarachchi et al., 2024).
- Educator vs student preference tension for AI programming tools (scaffolding vs direct help): `⟨2603_22673_design_implications_ai_programming_tools_c966127a⟩ · nodo 988d0f6e-1304-594b-be37-ce437b16c31b · p. 7` — **[BIBLIO-GAP]** (Ma et al., 2026 arXiv).
- GenAI designs rated on **unconventionality** without uniform appeal gains: `⟨2411_00168_creativity_ai_473e9c67⟩ · nodo ba2f3973-a2b6-572f-b526-73584ff2f48d · p. 7` — **[BIBLIO-GAP]** (Fu et al., 2024) — supports teaching **human aesthetic judgment**, not delegating to Stitch alone.

**[BIBLIO-GAP]**

- **No manifest node** supports “R3F pedagogically superior to Three.js” or “minimum viable GLSL syllabus” — Bloque 5 remains pilot honesty per FE II CV.
- **Horvitz mixed-initiative (1999), Amershi guidelines, ShaderMatch** — referenced in Profield edited text but **not in Ahmes batch**; do not cite as Ahmes anchors until ingested.

---

## Per-file audit summary

### `index.md` — The Copilot Era

| Dimension | Assessment |
| --- | --- |
| **Grounded strengths** | Amplifier philosophy; human/model table; merge rubric; red-team; perf triage prompts; ui/canvas boundary |
| **Overskill / hype** | Full MCP/skill marketplace; Stitch/21st.dev/Nano Banana; “design intelligence” stack |
| **Gaps vs CV** | Tooling § conflicts with student “no shopping”; needs Unit 6 decision-log link |
| **Ahmes** | Cognitive offloading + design fixation citations above apply directly to § philosophy and § design intelligence |

### `mcp-preflight/index.md` + `preflight.sh`

| Dimension | Assessment |
| --- | --- |
| **Grounded strengths** | Browser MCP as mandatory runtime check; honest “do not claim verification”; DevIAC as doc RAG |
| **Overskill / hype** | Treating Stitch + 21st.dev as default teaching stack; Gemini API keys in classroom |
| **Gaps vs CV** | Zero alignment with Units 8–9 outcomes — **instructor-only** |
| **Ahmes** | **[BIBLIO-GAP]** for MCP learning claims; browser automation grounded only via Profield practitioner row |

### `cursor-rules/index.md`

| Dimension | Assessment |
| --- | --- |
| **Grounded strengths** | Best student-facing artifact: measurable perf/shader/ui boundaries; maps 1:1 to Entrega 2 |
| **Overskill / hype** | `70-shadcn-ui` + full stack may exceed Unit 8 if shadcn not yet in student repo |
| **Gaps vs CV** | Add explicit **“explain this shader”** review gate in `30-shaders.mdc` |
| **Ahmes** | Indirect: perf-as-constraint aligns with Phung optimization-hints gap (FE II CV, separate vault) |

### `claude-workflows/index.md`

| Dimension | Assessment |
| --- | --- |
| **Grounded strengths** | `CLAUDE.md` template; shader/perf subagents; session checklist |
| **Overskill / hype** | UI overlay subagent assumes Stitch; telemetry beacons |
| **Gaps vs CV** | Subagent prompts should require **student explanation paragraph** per shader merge |
| **Ahmes** | Metacognition framework citation (Ma et al. 2511) supports planning-before-code workflow |

### `windsurf-config/index.md`

| Dimension | Assessment |
| --- | --- |
| **Grounded strengths** | Parity with Cursor; `.windsurfrules` example enforces same budgets |
| **Overskill / hype** | Low — optional editor |
| **Gaps vs CV** | None critical; cross-link to Cursor rules as canonical |
| **Ahmes** | **[BIBLIO-GAP]** — no Windsurf-specific evidence |

### `corpus-to-boilerplate/index.md`

| Dimension | Assessment |
| --- | --- |
| **Grounded strengths** | Excellent studio prospector; encodes full 3D corpus architecture |
| **Overskill / hype** | **Maximum** — Hygraph, p5 texture, SSR, splatting, CSS shader utilities in one prompt |
| **Gaps vs CV** | **Anti-pattern for Units 8–9** — would teach tool consumption over interface transfer |
| **Ahmes** | AI Co-Artist + render-verified synthesis citations justify **instructor** “verify in browser” demo only |

---

## Actionable recommendations (prioritized, max 10)

1. **Split publish paths:** keep full `private/ai-assisted-3d/` for instructors; publish a **≤2-page student covenant** in Units 8–9 (philosophy, rubric, perf template, shader debug checklist) — **no MCP table**. **Done 2026-08-14** (`docs/lessons/en/feii/ai-assisted-3d-covenant/`).
2. **Grade the merge rubric:** Entrega 2 submission must include completed rubric gates + `renderer.info` snapshot; mirrors Unit 6 ACCEPT/REJECT decision log for any AI-assisted shader/scene diff.
3. **Demote corpus-to-boilerplate:** label “Prospector / cohort scaffold — not assessed”; never assign as homework.
4. **One live MCP demo per term:** Browser MCP + optional DevIAC knowledge query; record 10-minute capture for async cohorts — do not require student MCP setup.
5. **Add Minimum Viable GLSL checklist to Unit 9:** vertex/fragment roles, one uniform, UV space, precision, one post-pass cost note — explicit `[UNVERIFIED-GAP]` pilot flag per FE II CV.
6. **Tighten design-AI section:** teach **design fixation / homogenization** (Ahmes nodes above) alongside Stitch demo; require human palette choice in `DESIGN.md` with written rationale.
7. **Align draw-call caps** in `50-performance.mdc` with Entrega 2 rubric (desktop ≤200 / mobile ≤80 already present — reference in Unit 8 lab handout).
8. **Remove or sandbox cloud-only tools** in student docs; if Stitch demo stays instructor-side, pair with **local Ollama** alternative and AI declaration template.
9. **Cross-link Unit 6 ↔ Unit 9:** same human-in-the-loop vocabulary (scaffolded hints, no solution dumps) — cite Sapoglu/VibeLearner when ICPEC PDF enters Ahmes batch `[BIBLIO-GAP]`.
10. **Ingest ShaderMatch + Horvitz** into next Profield/Ahmes batch to upgrade GLSL and mixed-initiative claims from `[UNVERIFIED-GAP]` to cite-grade nodes.

---

## Cross-links — agent-skill-optimization (human-in-the-loop parallel)

The parallel Profield run [`agent-skill-optimization`](file:///Users/ruvebal/src/profield/runs/agent-skill-optimization/00-field-scope.md) studies **skills as trainable parameters** (SkillOpt) with validation gates — structurally similar to this module’s **merge rubric** and Cursor rules as persistent context:

| Concept | `ai-assisted-3d` | `agent-skill-optimization` |
| --- | --- | --- |
| Persistent context | `.cursor/rules/*.mdc`, `CLAUDE.md`, `DESIGN.md` | Agent skills vs rules boundary (open problem #3) |
| Human gate | Merge rubric + red-team | SkillOpt validation gate / deterministic scorers |
| Overskill risk | MCP + Stitch shopping | Optimizing rules that should stay frozen |
| Local stack | DevIAC + Ollama | `studio-skillopt/` + exam-forge benchmark |
| Evidence gap | No MCP-for-3D HE study | Eval quality bottleneck (ExplainX audit) |

**Pedagogical parallel:** Unit 6 evaluates **human rejection of AI suggestions**; SkillOpt evaluates **human rejection of skill edits** — same epistemic discipline, different artifact. Consider a single FE II sidebar: “Rules/skills encode taste; humans merge or adopt.”

**Studio hook:** first SkillOpt benchmark target (`exam-forge` command generation) complements 3D module’s **deterministic verification** ethos (browser console, `renderer.info`, build) vs vibe-based acceptance.

---

## Audit metadata

| Field | Value |
| --- | --- |
| **Audited path** | `web-foundations/private/ai-assisted-3d/` (7 files) |
| **Profield source** | `/Users/ruvebal/src/profield/runs/ai-assisted-3d-web/20260814/pass1.edited.md` |
| **Vectors** | `profield-ai-assisted-3d-web` / `field_prospection` via `localhost:8100` |
| **Ahmes manifest** | `…/20260814/source-pdfs/.ahmes/batch-manifest.json` (9 sources) |
| **`ahmes query --cite` runs** | 7 nodes (all `evaluator_safe=no` → **[BIBLIO-GAP]** with verified node + page) |
| **CV** | `frontend-pedagogy/cv/udit-ruvebal-frontend-ii-cv.md` Bloque 5, Unidades 8–9 |
| **Date** | 2026-08-14 |

---

*The copilot that saves an hour but costs you an unexamined shader compiles nothing worth defending in oral exam.*

---

## Addendum — 2026-11-04: album cover + KTX2 student path

This addendum extends, and does not replace, the 2026-08-14 split above. The private prospector layer remains private. The student layer gains a bounded album-cover route and a first-principles texture-compression choice; it does not gain a tool marketplace or a studio boilerplate generator.

### Student layer — added minimum bar

For the Units 8–9 3D slice, each student contributes one route `/covers/<slug>` and only its own route files plus the single registry row defined by the assignment repository. The submission must include:

1. an original or legitimately licensed source image and a licence statement;
2. a readable cover scene that transfers React component/state reasoning into R3F;
3. one authored shader effect the student can explain in terms of uniforms, UV/coordinate space, and the intended visual change;
4. a source PNG plus ETC1S and UASTC candidates produced by the supplied encoder workflow;
5. two labelled measurements kept distinct: encoded file bytes and runtime `renderer.info.memory.textures`;
6. a written ETC1S-or-UASTC choice tied to the actual sleeve image, not a universal slogan; and
7. the TTOD-shaped contribution ritual frozen in D21: named branch, small staged own-route PRs, green CI, AI Review Log where applicable, one human approval, and the required cross-cover contribution/review.

Installing KTX-Software on every laptop is not a learning outcome. The maintained script and a PNG fallback keep the lab accessible; students own the measurement and choice.

### Instructor / prospector layer — boundary retained

The following remain instructor/TA preparation tools, never student requirements:

- `mcp-preflight/`, MCP shopping, Stitch, 21st.dev, Nano Banana, and cloud design APIs;
- `corpus-to-boilerplate/` and its SSR/i18n/Hygraph/p5/splatting scope;
- DevIAC/Athanor infrastructure and Ahmes extraction/ingest operations;
- cohort scaffold generation, encoder installation support, and private audit maintenance.

The aggregator may link the published AI-assisted 3D covenant. It must not publish this private module or instruct students to execute `corpus-to-boilerplate/`.

### Evidence boundary for X5–X8

Angel and Shreiner (2024) is the sole evaluator-safe graphics-education precedent used here: coat `10_1145_3641235_3664433_the_future_of_teaching_computer_graphics_e2e9b45c`, nodes `348bd016-3aee-5eb3-ae93-b3d422e137df` p. 1 and `92a534c1-6aff-5d5e-b1e5-2a7d2e2c65a9` p. 2, both `evaluator_safe=yes`. It supports preserving durable shader/render concepts across changing APIs. It does **not** validate R3F, Drei, KTX2 pedagogy, the album-cover brief, or TTOD-shaped route PRs as learning interventions.

KTX 2.0, Basis Universal, Three.js `KTX2Loader`, and glTF 2.0 remain dated `[STANDARD]` / `[PRACTITIONER]` platform notes that explain HOW. Higher-education KTX2 pedagogy remains `[UNVERIFIED-GAP]`. AI Co-Artist remains unsafe and excluded from student citations. Full command transcripts, Chicago forms, gaps, and platform-note URLs are recorded in `frontend-pedagogy/grounding/FEII-3D-ALBUM-KTX-CITATION-TRANSCRIPT-20261104.md`.

No commercial album scan belongs in `_studio`; a private GitHub repository is not a licence.

