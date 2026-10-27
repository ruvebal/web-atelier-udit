#!/usr/bin/env bash
# Overnight Mondrian corpus: Ahmes batch (NER + relations + semantic) → biblio coats
# → Athanor inject → optional DevIAC derived vectors.
#
# Resume-safe: ahmes batch skips PROCESSED_OK by SHA; re-run this script after a
# crash. Do not --force unless deliberately re-extracting.
#
# Usage:
#   nohup ./overnight-mondrian-corpus.sh >> ../logs/overnight.latest.log 2>&1 &
#   echo $! > ../logs/overnight.pid
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAGE="${MONDRIAN_CORPUS_STAGE:-$ROOT/corpus-staging}"
LOG_DIR="${MONDRIAN_CORPUS_LOGS:-$ROOT/logs}"
AHMES_BIN="${AHMES_BIN:-$HOME/src/ahmes/.venv/bin/ahmes}"
ATHANOR_BIN="${ATHANOR_BIN:-$HOME/src/athanor/.venv/bin/athanor}"
ATHANOR_ENV="${ATHANOR_ENV:-$HOME/src/athanor/.env}"
READY="${AHMES_READY:-$HOME/src/ahmes/scripts/profield-athanor-ready.sh}"
DEVIAC_INGEST="${DEVIAC_INGEST:-$HOME/src/deviac/scripts/ingest_ahmes_manifest.sh}"
AHMES_LIBRARY="${AHMES_LIBRARY:-$HOME/ahmes-library}"
PROJECT_SLUG="${MONDRIAN_ATHANOR_SLUG:-mondrian-project}"
LIBRARY="${MONDRIAN_AHMES_LIBRARY:-scholar}"
WORKERS="${MONDRIAN_BATCH_WORKERS:-1}"
SKIP_DEVIAC="${MONDRIAN_SKIP_DEVIAC:-0}"
STAMP="$(date -u +%Y-%m-%dT%H%M%SZ)"
RECEIPT="$LOG_DIR/overnight-receipt-$STAMP.md"
LATEST_LOG="$LOG_DIR/overnight.latest.log"

mkdir -p "$LOG_DIR"
# If stdout is already redirected (nohup >> latest.log), do not tee again.
if [[ -t 1 ]]; then
  exec > >(tee -a "$LATEST_LOG") 2>&1
fi

echo "=== Mondrian overnight START $STAMP ==="
echo "stage: $STAGE"
echo "project_slug: $PROJECT_SLUG library: $LIBRARY workers: $WORKERS"

[[ -x "$AHMES_BIN" ]] || { echo "ERROR: ahmes missing: $AHMES_BIN"; exit 1; }
[[ -x "$ATHANOR_BIN" ]] || { echo "ERROR: athanor missing: $ATHANOR_BIN"; exit 1; }
[[ -x "$READY" ]] || { echo "ERROR: ready script missing: $READY"; exit 1; }
[[ -d "$STAGE" ]] || { echo "ERROR: staging dir missing: $STAGE"; exit 1; }

n_files="$(find "$STAGE" -maxdepth 1 \( -name '*.pdf' -o -name '*.epub' \) | wc -l | tr -d ' ')"
[[ "$n_files" -gt 0 ]] || { echo "ERROR: no pdf/epub in $STAGE"; exit 1; }
echo "staged files: $n_files"

curl -sf http://localhost:11434/api/tags >/dev/null || {
  echo "ERROR: Ollama not reachable at localhost:11434"
  exit 1
}
echo "ollama: ok"

if [[ -f "$ATHANOR_ENV" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ATHANOR_ENV"
  set +a
fi

pg_isready -h localhost -p 5432 >/dev/null || {
  echo "ERROR: Postgres not accepting connections on :5432"
  exit 1
}
echo "postgres: ok"

# ── 1. Ahmes batch (extraction + NER + relations + semantic) ─────────────────
# Relations are required for GraphRAG neighbor hops; the stock ready script
# batch omits --enrich-relations, so we batch here first, then call ready
# without --with-batch for the two-pass meta coats.
echo "→ ahmes batch (idempotent; workers=$WORKERS)"
"$AHMES_BIN" batch "$STAGE" \
  -o "$AHMES_LIBRARY" \
  --library "$LIBRARY" \
  --save-db \
  --treeshake \
  --min-length 8 \
  --enrich-ner \
  --enrich-relations \
  --enrich-semantic \
  --workers "$WORKERS"

MANIFEST="$STAGE/.ahmes/batch-manifest.json"
REPORT="$STAGE/.ahmes/batch-report.json"
[[ -f "$MANIFEST" ]] || { echo "ERROR: missing $MANIFEST"; exit 1; }

# ── 2. Bibliographic coats (online Crossref/OL) ──────────────────────────────
echo "→ profield-athanor-ready (meta coats only; batch already done)"
# Soft gate: BIBLIO-GAP on ISBN-only books must not block inject of PROCESSED_OK coats.
if ! "$READY" "$STAGE"; then
  echo "WARN: athanor-ready --require-coats failed; injecting PROCESSED_OK coats anyway"
fi

# ── 3. Athanor inject (cite-grade collective store) ──────────────────────────
echo "→ athanor inject --from-manifest → $PROJECT_SLUG"
"$ATHANOR_BIN" inject \
  --from-manifest "$MANIFEST" \
  --project-slug "$PROJECT_SLUG" \
  --library "$LIBRARY"

# ── 4. Optional DevIAC derived vectors (discovery only, never citation) ──────
if [[ "$SKIP_DEVIAC" != "1" && -x "$DEVIAC_INGEST" ]]; then
  echo "→ DevIAC derived vector ingest (not citation authority)"
  "$DEVIAC_INGEST" "$STAGE" \
    --project-slug "$PROJECT_SLUG" \
    --knowledge-scope field_prospection \
    --force || echo "WARN: DevIAC ingest failed (non-fatal for Ahmes/Athanor)"
else
  echo "→ DevIAC ingest skipped"
fi

# ── 5. Smoke retrieval (discovery only) ──────────────────────────────────────
echo "→ athanor search smoke"
"$ATHANOR_BIN" search "Neo-Plasticism horizontal vertical equilibrium" \
  --project-slug "$PROJECT_SLUG" \
  --library "$LIBRARY" \
  --top-k 5 || echo "WARN: smoke search failed"

"$ATHANOR_BIN" search "Mondrian plastic means colour planes lines" \
  --project-slug "$PROJECT_SLUG" \
  --library "$LIBRARY" \
  --top-k 5 || echo "WARN: smoke search failed"

# ── 6. Receipt ───────────────────────────────────────────────────────────────
{
  echo "# Mondrian overnight receipt — $STAMP"
  echo
  echo "| Field | Value |"
  echo "| --- | --- |"
  echo "| Stage | \`$STAGE\` |"
  echo "| Manifest | \`$MANIFEST\` |"
  echo "| Athanor slug | \`$PROJECT_SLUG\` |"
  echo "| Library | \`$LIBRARY\` |"
  echo "| Workers | $WORKERS |"
  echo "| Host end (UTC) | $(date -u +%Y-%m-%dT%H:%M:%SZ) |"
  echo
  echo "## Batch report summary"
  if [[ -f "$REPORT" ]]; then
    python3 - "$REPORT" <<'PY'
import json, sys
from pathlib import Path
r = json.loads(Path(sys.argv[1]).read_text())
# report shape varies; print compact keys
if isinstance(r, dict):
    for k in ("processed_ok", "failed", "skipped", "total", "status_counts", "summary"):
        if k in r:
            print(f"- **{k}:** `{r[k]}`")
    print()
    print("```json")
    print(json.dumps(r, indent=2)[:4000])
    print("```")
else:
    print("```json")
    print(json.dumps(r, indent=2)[:4000])
    print("```")
PY
  else
    echo "_No batch-report.json_"
  fi
  echo
  echo "## Next morning"
  echo "1. Read \`grounding/GRAPHRAG-PHASE-QUERIES.md\` and run the M0/M3 query bank."
  echo "2. Promote evaluator-safe hits into \`ABOUT-MONDRIAN-VALUE.md\` selection table."
  echo "3. Resume M0 grounding gate with primary-source quotes where coats exist."
} > "$RECEIPT"

echo "receipt: $RECEIPT"
echo "=== Mondrian overnight END $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
