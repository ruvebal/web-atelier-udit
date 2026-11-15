# PHASE-X9 · Propose the animation wisdom, and keep the findings

**Status:** VERIFYING
**Branch:** `cascade/CANONICAL-FAVICON-RIVE-3D-9`
**Worktree:** sibling `web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-9` (lane `CANONICAL-FAVICON-RIVE-3D`)
**Base:** `origin/main` @ `e9c33363839a9fa2b518c39b1bfc9428ab96e26c` (PR B #8 merge)

## Goal met

Distilled cascade motion/graphics contracts into TTOD proposals via local Ollama (`qwen2.5:72b-instruct-q4_K_M` @ `localhost:11434`, D52) and `ttod-bridge.propose_quote`. Findings, cold reviews, and `DECISIONS.md` left in place (D53 / A7).

## What changed (files)

- `~/src/.cursor/skills/ttod-bridge/pending/20261115T1930*.yaml` — nine staged proposals (`origin: blackbox`, `pending_human_review`, no `validated_by`)
- Pack: `PHASE-X9-PROPOSALS.md`, `PHASE-X9-OLLAMA-TRANSCRIPT.md`, `baseline/X9/proposals-manifest.json`, `baseline/X9/ollama-distillation-transcript.json`, `baseline/X9/x9-acceptance-checks.py`, `baseline/X9/A{1..7}.command.json`, `build/x9-checks/A{1..7}.json`, `PHASE-X9-EVIDENCE.json`, this report
- `INDEX.md` / `PHASE-X9.md` status tokens only (READY→IN_PROGRESS→VERIFYING)
- **Not changed:** `~/src/ttod/ttod.yml` (SHA-256 `9503e81d6bcd52c5fbdf52c45200372b2a0ca7fef8892a0a7e913fc46d8f7850` before and after), `DECISIONS.md`, `FINDINGS-2026-11-10.md`, any `*COLD-REVIEW*`

## Proposals staged

| Suggested id | Cite | Source |
| --- | --- | --- |
| `img-148` | D1, F1 | `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D1+FINDINGS-2026-11-10.md#F1` |
| `img-149` | D4 | `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D4` |
| `arch-111` | D8, D19 | `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D8+D19` |
| `arch-112` | D3, D25 | `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D3+D25` |
| `arch-113` | D22, D30, D46 | `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D22+D30+D46` |
| `wis-035` | D54 | `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D54` |
| `wis-036` | F5, D14 | `CANONICAL-FAVICON-RIVE-3D/FINDINGS-2026-11-10.md#F5+DECISIONS.md#D14` |
| `wis-037` | D53 | `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D53` |
| `arch-114` | D16 | `CANONICAL-FAVICON-RIVE-3D/DECISIONS.md#D16` |

Manifest: [PHASE-X9-PROPOSALS.md](PHASE-X9-PROPOSALS.md) · machine: `baseline/X9/proposals-manifest.json`

## Commands run (implementer)

```text
git fetch origin main
git worktree add -b cascade/CANONICAL-FAVICON-RIVE-3D-9 … origin/main   # @ e9c3336
sha256sum ~/src/ttod/ttod.yml   # before
# TTODCliAdapter.search_quotes for near-miss themes
# ollama.Client(host='http://localhost:11434').chat(model='qwen2.5:72b-instruct-q4_K_M', …)  # distill + refine
# TTODCliAdapter.propose_quote(…) × 9
sha256sum ~/src/ttod/ttod.yml   # after — identical
~/src/ttod/.venv/bin/python …/baseline/X9/x9-acceptance-checks.py A1..A7
```

## ttod.yml integrity (A2)

- **Before:** `9503e81d6bcd52c5fbdf52c45200372b2a0ca7fef8892a0a7e913fc46d8f7850`
- **After:** `9503e81d6bcd52c5fbdf52c45200372b2a0ca7fef8892a0a7e913fc46d8f7850`
- **Identical:** yes

## Skipped (already in / near active TTOD)

- D32 adapter/backend split — near `arch-034`, `arch-011`
- Generic SVG scalability / identity — near `img-004`, `img-016`, `arch-015`, `arch-022`

## Pending / uncertain

- Human acceptance inside TTOD (`proposal accept` / `cli.py add` + `validated_by: human`) is out of scope for X9.
- Suggested ids (`img-148`…, `arch-111`…, `wis-035`…) are suggestions only — not citable until merged.
- Official exit-gate / harness verify log is the runner’s job; this report stops at VERIFYING (not DONE).
- Condition restoration: D54 “first relevance utility” and D3/D25 dual-N fixture/engine split were restored into proposal text after the refine pass dropped them; recorded in proposal `ollama_basis` fields.

## Resume point

Cold review of this VERIFYING package (D52 local Qwen reviewer), then orchestrator promotion. Do not merge proposals from this phase.

Generated: 2026-11-15T19:32:08.878450+00:00
