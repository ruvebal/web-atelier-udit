<!--
Pre-M1 scaffold — real starter code copied into the product monorepo at M1.
Author: Rubén Vega Balbás, PhD · 27 October 2026
-->

# Scaffold (pre-repository)

These files are the **professor-owned starter**. At PHASE-M1 `git init` they
move into the product tree:

| Scaffold path | Product path |
| --- | --- |
| `tokens/` | `packages/tokens/` |
| `schema/work.schema.json` | `packages/works/schema/work.schema.json` |
| `export/` | `packages/matrix/export/` (or `packages/editor/lib/export/`) |
| `api/generate_request.schema.json` | `services/api/schemas/` (Phase 2) |
| `CODEOWNERS.example` | `/.github/CODEOWNERS` |

Student task IDs live in [`../TEAM-ASSIGNMENTS.md`](../TEAM-ASSIGNMENTS.md).
Do not treat this folder as a runnable app — M1 wires packages and Astro.
