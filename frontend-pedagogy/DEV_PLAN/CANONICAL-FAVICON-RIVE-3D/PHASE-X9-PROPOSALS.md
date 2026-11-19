# PHASE-X9 · TTOD proposals manifest

Staged under `~/src/.cursor/skills/ttod-bridge/pending/`. `ttod.yml` was not edited.

**ttod.yml SHA-256 before:** `9503e81d6bcd52c5fbdf52c45200372b2a0ca7fef8892a0a7e913fc46d8f7850`
**ttod.yml SHA-256 after:** `9503e81d6bcd52c5fbdf52c45200372b2a0ca7fef8892a0a7e913fc46d8f7850`
**Distillation model:** `qwen2.5:72b-instruct-q4_K_M` @ `http://localhost:11434`
**Transcript:** [PHASE-X9-OLLAMA-TRANSCRIPT.md](PHASE-X9-OLLAMA-TRANSCRIPT.md)

| Suggested id | Section | Cite | Proposal path |
| --- | --- | --- | --- |
| `img-148` | `images` | D1, F1 | `~/src/.cursor/skills/ttod-bridge/pending/20261115T193048Z-images-the-hand-authored-svg-is-the-sole-author.yaml` |
| `img-149` | `images` | D4 | `~/src/.cursor/skills/ttod-bridge/pending/20261115T193049Z-images-extrusion-depth-follows-the-square-root-.yaml` |
| `arch-111` | `architecture` | D8, D19 | `~/src/.cursor/skills/ttod-bridge/pending/20261115T193049Z-architecture-smooth-the-camera-never-the-pick-hit-ide.yaml` |
| `arch-112` | `architecture` | D3, D25 | `~/src/.cursor/skills/ttod-bridge/pending/20261115T193050Z-architecture-the-fixture-may-assert-a-count-the-engin.yaml` |
| `arch-113` | `architecture` | D22, D30, D46 | `~/src/.cursor/skills/ttod-bridge/pending/20261115T193051Z-architecture-drive-the-pose-from-elapsed-time-not-fra.yaml` |
| `wis-035` | `wisdom` | D54 | `~/src/.cursor/skills/ttod-bridge/pending/20261115T193052Z-wisdom-before-the-mesh-ask-who-owns-the-audible.yaml` |
| `wis-036` | `wisdom` | F5, D14 | `~/src/.cursor/skills/ttod-bridge/pending/20261115T193053Z-wisdom-a-merge-story-cannot-be-written-before-a.yaml` |
| `wis-037` | `wisdom` | D53 | `~/src/.cursor/skills/ttod-bridge/pending/20261115T193054Z-wisdom-the-aphorism-teaches-the-contract-the-fi.yaml` |
| `arch-114` | `architecture` | D16 | `~/src/.cursor/skills/ttod-bridge/pending/20261115T193055Z-architecture-the-golden-fixture-proves-the-tool-it-mu.yaml` |

## Texts

### img-148 · D1, F1

> The hand-authored SVG is the sole authority for geometry and colour; the GPU scene derives from it, never becomes a second author.

- **source:** `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D1+FINDINGS-2026-11-10.md#F1`
- **teaches:** Keep one hand-authored geometry authority; treat mesh/GPU output as derivation.

### img-149 · D4

> Extrusion depth follows the square root of relative area between declared bounds — larger faces advance by measured law, not by eye.

- **source:** `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D4`
- **teaches:** Derive intrinsic depth from measured relative area with an explicit sqrt law and bounds.

### arch-111 · D8, D19

> Smooth the camera, never the pick: hit identity follows raw coordinates through the same transforms the pixels used.

- **source:** `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D8+D19`
- **teaches:** Separate camera conditioning from picking so selection agrees with visible depth.

### arch-112 · D3, D25

> The fixture may assert a count; the engine must not. Facet N lives in the manifest — shaders and skills iterate what the source produced.

- **source:** `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D3+D25`
- **teaches:** Keep dual-N honesty: golden fixtures assert counts; portable engines consume dynamic N.

### arch-113 · D22, D30, D46

> Drive the pose from elapsed time, not frame count, so the same wall-clock second yields the same orientation on a slow machine.

- **source:** `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D22+D30+D46`
- **teaches:** Time-base animation on elapsed seconds so choreography stays device-independent.

### wis-035 · D54

> Before the mesh, ask who owns the audible sample clock — that synchronicity is the first relevance utility. The specimen owns the sample clock; the GPU loop owns elapsed choreography; invent no sample-lock between them.

- **source:** `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D54`
- **teaches:** Teach sound-clock ownership as the first honest reason for the stack, without fabricating audio/3D lock.

### wis-036 · F5, D14

> A merge story cannot be written before a merge exists — public provenance is observed Git history, never anticipatory narrative.

- **source:** `CANONICAL-FAVICON-RIVE-3D/FINDINGS-2026-11-10.md#F5+DECISIONS.md#D14`
- **teaches:** Publish only real repository events; leave provenance pending until merge evidence exists.

### wis-037 · D53

> The aphorism teaches the contract; the finding remains the proof — never retire the evidence because a sentence was proposed.

- **source:** `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D53`
- **teaches:** Keep findings and cold reviews in place when distilling animation wisdom into TTOD proposals.

### arch-114 · D16

> The golden fixture proves the tool; it must not become the tool's business logic.

- **source:** `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D16`
- **teaches:** Keep reusable compilers free of fixture-specific product logic.

## Skipped (already covered / near-miss in active TTOD)

- **D32** adapter/backend split — near `arch-034`, `arch-011`
- Generic SVG scalability / identity — near `img-004`, `img-016`, `arch-015`, `arch-022`
