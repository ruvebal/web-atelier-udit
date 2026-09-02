#!/usr/bin/env bash
set -euo pipefail

STUDIO_USER_ROOT="${STUDIO_USER_ROOT:-/Users/ruvebal}"
FORMULA_BUNDLE="${FORMULA_BUNDLE:-${STUDIO_USER_ROOT}/ahmes-library/scholar/documents/comparing_rendering_methods_for_julia_sets_a1e80611/extract/formula-audit}"
export FRACTAL_ARCHITECT_SKILL="${FRACTAL_ARCHITECT_SKILL:-${STUDIO_USER_ROOT}/projects/ruvebal/scholar/universidadeuropea/digital-creativity-uem/digital-creativity-pedagogy/.cursor/skills/fractal-architect/SKILL.md}"
export FRACTAL_ARCHITECT_AGENT="${FRACTAL_ARCHITECT_AGENT:-${STUDIO_USER_ROOT}/projects/ruvebal/scholar/universidadeuropea/digital-creativity-uem/digital-creativity-pedagogy/.cursor/agents/fractal-architect.md}"
export FRACTAL_ARCHITECT_SKILL_SHA256="${FRACTAL_ARCHITECT_SKILL_SHA256:-29a8d769ef2dfa1eb290d76fb33d0f743dc8b1a160427d896e0c6da727d996e8}"
export FRACTAL_ARCHITECT_AGENT_SHA256="${FRACTAL_ARCHITECT_AGENT_SHA256:-1d660a45cf09a6f4217cc6d30d5fbd5c9a527a7b67cae79a4631c5fc4139d91c}"

node scripts/fractal-architecture/generate-pass-track-backgrounds.mjs \
  "${FORMULA_BUNDLE}/formula-glossary.public.json" \
  docs/assets/images/fractal-pass-track \
  "${FORMULA_BUNDLE}/formula-glossary.private.json" \
  ../frontend-pedagogy/grounding/fractal-architecture/formula-consumption-proof.private.json \
  ../frontend-pedagogy/archives/fractal-pass-track \
  ../frontend-pedagogy/fractal-architecture/originals/pass-track \
  udit
