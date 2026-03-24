# MCP Preflight for the 3D Stack

**Author / Course Direction:** Prof. Rubén Vega Balbás, PhD `<ruben.vega@udit.es>`

> *"Context is not luxury. In 3D web, context is the difference between a scaffold and a hallucination."*

Yes: if you want the best result from the `Corpus to Boilerplate` prompt, you should plug the relevant **MCPs** and **skills** before executing it.

This file documents:

- which MCPs and skills are most useful for a 3D web stack
- which ones to connect **before** running a large scaffold prompt
- how to configure them as part of the architecture, not as optional convenience
- how to use your DevIAC gateway as the MCP infrastructure backbone

---

## Short answer

**Yes, plug MCPs and skills before execution.**

For a 3D web boilerplate with a shadcn/ui overlay layer, MCPs improve the agent's ability to:

- design the 2D interface layer (Stitch)
- pull pre-built 3D-reactive components (21st.dev)
- inspect the live result in a browser
- generate visual references and placeholders (Nano Banana 2)
- reason over assets and file trees
- query up-to-date API documentation (DevIAC knowledge)
- make informed design decisions (UI UX Pro Max skill)

If you run a large prompt without the right MCPs, the agent may still generate a scaffold, but it will be weaker in:

- design coherence (no DESIGN.md, no Stitch-generated screens)
- visual verification
- asset-path correctness
- console/runtime debugging
- component quality (reinvents what 21st.dev already ships)

---

## The concrete MCP + Skills stack

No more generic categories. These are the tools.

### 1. Browser MCP — runtime verification

**Priority:** mandatory for high-quality 3D work

Use it for:

- opening the generated app
- validating that a scene actually renders
- checking browser console warnings/errors
- checking network requests for models, textures, HDRs, KTX2 transcoder files
- taking screenshots during visual QA
- verifying shadcn/ui overlay renders correctly on top of the Canvas

For 3D web, browser MCP is especially important because many failures are only obvious at runtime:

- wrong asset paths
- broken KTX2 transcoder path
- WebGL/WebGPU fallback issues
- shader compile errors
- color-space mistakes
- missing reduced-motion behavior
- Drei Html instances not rendering or z-fighting with DOM overlay

**In this workspace, the browser MCP is already available**: the `cursor-ide-browser` stack.

---

### 2. Stitch MCP — UI generation + design system

**Priority:** high — primary design MCP

[Google Stitch](https://stitch.withgoogle.com) generates production-ready UI from prompts, screenshots, or aesthetics ("vibe design"). Powered by Gemini 2.5 Pro. 350 free generations/month.

**Key skills for the 3D stack:**

| Skill | What it does |
|-------|-------------|
| `stitch-design` | Unified design with prompt enhancement and design system synthesis |
| `stitch-loop` | Multi-page site generation from a single prompt |
| `design-md` | Generates a comprehensive DESIGN.md file |
| `enhance-prompt` | Transforms vague ideas into Stitch-optimized prompts |
| `react-components` | Converts Stitch screens to React component systems |
| `shadcn-ui` | Integration guidance for shadcn/ui components |

**Why it matters for 3D:** The 2D interface layer is half the product. Stitch designs the shadcn/ui panels, navigation, and overlays that live on top of the Canvas. It also generates the DESIGN.md that anchors all palette, typography, and spacing decisions.

**Setup:** Install skills from [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills). Integrates with Cursor, Claude Code, Windsurf, Gemini CLI.

**Workflow:**
1. Describe the aesthetic direction to Stitch
2. Generate key screens (home hero, playground controls, scroll content)
3. Convert to React components using `react-components` skill
4. Align with shadcn/ui using `shadcn-ui` skill
5. Integrate into R3F architecture as DOM overlay or Drei Html panels

---

### 3. 21st.dev Magic MCP — component library

**Priority:** recommended — component asset library

[21st.dev](https://21st.dev) is a Y Combinator-backed platform providing infrastructure and UI building blocks. The Magic MCP gives AI assistants access to pre-built React + Tailwind components.

**Key features:**

- Browse [3D components](https://21st.dev/s/3d) for R3F-compatible elements
- Use `/ui` commands in Cursor: `/ui create a modern navigation bar`
- Live preview of generated components
- SVGL integration for brand assets

**Why it matters for 3D:** Saves time on standard UI primitives and provides curated 3D-reactive components that would take hours to build from scratch.

**Setup:** `npx @21st-dev/cli@latest install <client> --api-key <key>`

---

### 4. Nano Banana 2 MCP — visual references

**Priority:** optional — useful for placeholders, concept art, texture references

[Nano Banana 2](https://github.com/daveremy/nano-banana-2-mcp) generates images via Gemini 3.1 Flash with resolution control (1K–4K), custom aspect ratios, thinking modes, and multi-variation output.

**Use for:**

- Placeholder hero images during scaffold phase
- Texture reference sheets before commissioning final assets
- Concept art for art direction meetings
- Portfolio thumbnail generation
- Environment / mood boards for scene design

**Not for:** final production textures or commercial assets without rights review.

**Setup:** Requires Gemini API key. Configure in editor MCP settings.

---

### 5. DevIAC Gateway — MCP infrastructure backbone

**Priority:** recommended if running the DevIAC studio

Your [DevIAC](https://github.com/you/deviac) MCP gateway provides the shared infrastructure layer:

| Service | Endpoint | Role |
|---------|----------|------|
| **Knowledge MCP** | stdio (local) / `mcp.crea-comm.loc` (LAN) | RAG over ingested docs: three.js, R3F, React Router, Vite, Tailwind |
| **Filesystem MCP** | stdio / HTTP | File tree operations, manifest generation |
| **Vectors MCP** | stdio / HTTP | pgvector-backed semantic search over developer knowledge |
| **Ollama** | `localhost:11434` / `tanit:11434` | Local model inference (Metal GPU on M4 Max) |

**Why it matters:** Instead of the AI hallucinating API names, it can **query** your ingested documentation. The knowledge MCP grounds three.js answers in actual docs, not 2-year-old training data.

**Setup:**
```bash
cd deviac
make up-tanit     # starts Postgres, MCP Gateway, Traefik
make ingest       # loads docs into pgvector (optional, if new docs added)
```

**Dual-mode access:**
- **Tanit (local):** stdio MCP for Cursor/Windsurf running on the same machine
- **LAN partners:** HTTP MCP via `https://mcp.crea-comm.loc` for other studio machines

---

### 6. UI UX Pro Max — design intelligence skill

**Priority:** high — addresses the taste gap

**This is a skill, not an MCP.** Install it in your editor.

[UI UX Pro Max](https://ui-ux-pro-max-skill.com) injects professional design intelligence into AI coding assistants:

- 67 UI styles (glassmorphism, neumorphism, brutalism, editorial, etc.)
- 96 industry-specific color palettes
- 56 font pairings
- 98 UX guidelines and reasoning rules
- 24+ chart types and landing page patterns
- Design system v2.0 generator

**Why it matters for 3D:** The AI's biggest weakness in 3D web is **taste** — palette, typography, spatial hierarchy, motion language. UI UX Pro Max gives the AI a curated design vocabulary instead of averaging Stack Overflow answers.

**Setup:** Install as a Cursor agent skill, Claude Code skill, or Windsurf skill. 32,000+ GitHub stars.

---

## MCP stack by use case

| Use case | MCP stack | Skills |
|----------|-----------|--------|
| Minimal boilerplate | Browser | — |
| Teaching scaffold | Browser + DevIAC Knowledge | UI UX Pro Max |
| Portfolio starter | Browser + Stitch + 21st.dev | UI UX Pro Max |
| Studio-grade starter | Browser + Stitch + 21st.dev + DevIAC | UI UX Pro Max |
| Asset-heavy 3D project | Browser + Stitch + Nano Banana 2 + DevIAC | UI UX Pro Max |
| Full stack (recommended) | Browser + Stitch + 21st.dev + Nano Banana 2 + DevIAC | UI UX Pro Max |

---

## Preflight checklist before running the prompt

Run this checklist before executing `Corpus to Boilerplate`.

### A. Context preflight

- Confirm the target output path
- Confirm whether the scaffold should live inside the current repo or in a new repo
- Confirm product mode: `portfolio`, `editorial-3d-site`, `teaching-starter`, or `experimental-showcase`

### B. MCP preflight

- [ ] Browser MCP connected and usable
- [ ] Stitch MCP skills installed (`google-labs-code/stitch-skills`)
- [ ] 21st.dev Magic MCP configured with API key
- [ ] Nano Banana 2 MCP configured with Gemini API key (optional)
- [ ] DevIAC gateway running (`make up-tanit`) if using studio infrastructure

### C. Skills preflight

- [ ] UI UX Pro Max skill installed in your editor
- [ ] Verify it activates on design-related prompts

### D. Design preflight

- [ ] Decide aesthetic direction (mood, references, color temperature)
- [ ] Decide dark/light mode strategy
- [ ] Decide font pairing preference (or let UI UX Pro Max suggest)
- [ ] Decide motion language (cinematic, subtle, reduced-only)

### E. Asset preflight

- Decide whether to include placeholder assets only
- Decide whether the scaffold should already create `public/basis/`
- Decide whether KTX2, glTF, HDR, and 3DGS directories should be empty placeholders or include sample references
- Decide whether to use Nano Banana 2 for placeholder generation

### F. AI config preflight

- Cursor rules loaded
- `CLAUDE.md` strategy decided
- `.windsurfrules` strategy decided
- `DESIGN.md` strategy: Stitch-generated or manual template
- Lesson code-block convention rule active if working inside this repo

---

## Recommended execution order

This is the most reliable sequence.

1. Start DevIAC gateway (`make up-tanit`) if using studio infrastructure
2. Connect MCPs in editor settings
3. Install UI UX Pro Max skill
4. Verify Browser MCP can open a page and inspect console output
5. Verify Stitch MCP responds (test with a simple `enhance-prompt` call)
6. Verify the target directory exists
7. Reference the full `web-foundations/docs/lessons/en/3d/` corpus
8. **Design phase:** Use Stitch to generate DESIGN.md and 2–3 key screens
9. Attach or reference the `Corpus to Boilerplate` prompt file
10. Ask the agent to propose the tree first
11. Approve the tree
12. Generate files
13. Run `npx shadcn@latest init` if the agent did not (or verify it was done)
14. Run the app
15. Validate visually in the browser MCP

---

## What to ask the agent explicitly

When MCPs and skills are connected, strengthen the prompt with this paragraph:

**Template** — Paste after the main boilerplate prompt.

```text
Use connected MCPs and skills during execution:
- Use Stitch MCP to generate DESIGN.md and key UI screens before writing React code.
- Use 21st.dev Magic MCP to reference pre-built components where they match the specification.
- Use Browser MCP to inspect the running app: verify canvas renders, check console, validate asset paths.
- Use Nano Banana 2 for placeholder images if needed.
- Use UI UX Pro Max skill for design system decisions.
- If DevIAC knowledge MCP is available, query it for current three.js / R3F / React Router APIs.
- If any MCP or skill is unavailable, state that limitation clearly instead of pretending verification happened.
```

---

## Practical MCP role mapping for this corpus

| Corpus area | Primary MCP/Skill | Why |
|---|---|---|
| `foundations/`, `threejs-core/` | Browser | Render-loop and console validation |
| `react-three-fiber/` | Browser + 21st.dev | Component integration + runtime check |
| `textures/ktx2/`, `asset-pipeline/` | Browser + DevIAC Filesystem | Path correctness, transcoder, asset structure |
| `materials-shaders/` | Browser + DevIAC Knowledge | Shader validation + API accuracy |
| `scroll-driven-3d/`, `post-processing/` | Browser | Visual behavior and performance verification |
| `gaussian-splatting/` | Browser + Nano Banana 2 | Loading, memory, placeholder visuals |
| `portfolio-craft/` | Stitch + UI UX Pro Max + 21st.dev | Design system, UI generation, components |
| `accessibility-3d/` | Browser | Reduced-motion, keyboard nav, ARIA |
| `ai-assisted-3d/` | DevIAC + all MCPs | Config generation and repeatable workflow |

---

## DevIAC as the backbone

If you are running the DevIAC studio, the MCP gateway is the natural home for:

- **Documentation RAG:** ingest three.js, R3F, Vite, React Router, Tailwind, shadcn docs into the knowledge MCP. The agent queries current APIs instead of hallucinating.
- **Project knowledge:** ingest your project plans, architecture decisions, performance reports. The agent reasons from your data, not generic training.
- **LAN-wide access:** studio partners on other machines access the same knowledge via `mcp.crea-comm.loc`. One ingestion, many consumers.

### Recommended docs to ingest

```bash
# three.js API docs
make ingest DOCS=path/to/threejs-docs

# R3F + Drei docs
make ingest DOCS=path/to/r3f-docs

# React Router v7 docs
make ingest DOCS=path/to/react-router-docs

# Tailwind CSS v4 docs
make ingest DOCS=path/to/tailwind-docs

# shadcn/ui docs
make ingest DOCS=path/to/shadcn-docs
```

After ingestion, the knowledge MCP returns grounded answers instead of confabulated API names.

---

## MCP stack matrix per tool

### Cursor

| MCP/Skill | Setup | Notes |
|-----------|-------|-------|
| Browser | Built-in (`cursor-ide-browser`) | Already available in this workspace |
| Stitch | Install skills: `google-labs-code/stitch-skills` | Configure in Cursor MCP settings |
| 21st.dev Magic | `npx @21st-dev/cli@latest install cursor --api-key KEY` | Provides `/ui` command |
| Nano Banana 2 | Add to `~/.cursor/mcp.json` | Requires Gemini API key |
| DevIAC Gateway | stdio mode (local on Tanit) | Point to `services/mcp/` servers |
| UI UX Pro Max | Install as agent skill | Activates on design prompts |

### Claude Code

| MCP/Skill | Setup | Notes |
|-----------|-------|-------|
| Browser | Not built-in; use external browser MCP | Or use DevIAC browser proxy |
| Stitch | Install Stitch skills in Claude Code skills directory | Follows CLAUDE.md conventions |
| 21st.dev Magic | Configure MCP server in Claude settings | |
| Nano Banana 2 | Configure MCP server in Claude settings | |
| DevIAC Gateway | HTTP mode: `https://mcp.crea-comm.loc` | LAN access for non-Tanit machines |
| UI UX Pro Max | Install as Claude Code skill | |

### Windsurf

| MCP/Skill | Setup | Notes |
|-----------|-------|-------|
| Browser | Built-in or configure external | Check Windsurf MCP docs |
| Stitch | Install Stitch skills | Configure in Windsurf settings |
| 21st.dev Magic | `npx @21st-dev/cli@latest install windsurf --api-key KEY` | |
| Nano Banana 2 | Add to Windsurf MCP config | |
| DevIAC Gateway | stdio (local) or HTTP (LAN) | Same dual-mode as Cursor |
| UI UX Pro Max | Install as Windsurf skill | |

---

## Boilerplate prompt add-on

Add this block to the `Corpus to Boilerplate` prompt if you want MCP-aware execution baked in.

**Template** — Prompt add-on for Cursor, Claude, or Windsurf.

```text
MCP + Skills preflight requirement:

- Use Stitch MCP to generate DESIGN.md and key screens before writing implementation code.
- Use 21st.dev to check for existing components before building from scratch.
- Use Browser MCP for runtime verification before finalizing the scaffold.
- Use UI UX Pro Max for palette, typography, and UX reasoning.
- If DevIAC knowledge MCP is connected, verify three.js/R3F API calls against ingested docs.
- If a connected MCP or skill reveals issues (missing asset paths, loader errors, console warnings, design inconsistencies), fix them before final summary.
- Do not claim verification unless it actually happened through the available tools.
```

---

## Tao moment

> *The model is fast, but blindness is faster. MCPs are not decoration; they are the senses that turn a generated scaffold into a tested one. Skills are not shortcuts; they are the taste that turns a functional UI into a beautiful one.*

---

## Related lessons

- [AI-Assisted 3D Development — The Copilot Era](../)
- [Claude Workflows for 3D Web](../claude-workflows/)
- [Cursor Rules for 3D Projects](../cursor-rules/)
- [Windsurf Configuration for 3D Projects](../windsurf-config/)
- [Corpus to Boilerplate — Master Prompt File](../corpus-to-boilerplate/)

---

## Credits

- Concept, direction, and curriculum framing: **Prof. Rubén Vega Balbás, PhD** `<ruben.vega@udit.es>`
