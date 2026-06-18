#!/usr/bin/env bash
# Export a YAML exam bank to all supported LMS formats.
#
# 1. Validates the bank (schema, points, XHTML, bias checks).
# 2. Exports to Moodle XML, Moodle GIFT, Blackboard QTI 2.1, Blackboard TXT.
# 3. Creates a ready-to-upload ZIP for Blackboard (imsmanifest.xml at root).
#
# Portability: see ../PORTABILITY.md
# Default output: private/exams-out/<basename>/ when input is under private/exams/
#
# Usage:
#   ./export-exam.sh private/exams/my-exam.yml
#   ./export-exam.sh my-exam.yml --moodle-only
#   ./export-exam.sh my-exam.yml --qti-only
#   ./export-exam.sh my-exam.yml --gift-only
#   ./export-exam.sh my-exam.yml --bb-txt-only
#   ./export-exam.sh my-exam.yml --validate-only
#   ./export-exam.sh my-exam.yml --skip-validation
#   EXAM_FORGE_OUT=private/exams-out ./export-exam.sh private/exams/my-exam.yml
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INPUT="${1:-}"
MODE="${2:-all}"

if [[ -z "${INPUT}" ]]; then
  cat >&2 <<'USAGE'
Usage: export-exam.sh <exam.yml> [MODE]

Modes:
  (default)           validate + export all 4 formats + ZIP
  --moodle-only       validate + Moodle XML
  --gift-only         validate + Moodle GIFT
  --qti-only          validate + Blackboard QTI + ZIP
  --bb-txt-only       validate + Blackboard TXT
  --bb-split          QTI export + split essay/auto ZIPs for /10 scoring
  --validate-only     validate only, no export
  --skip-validation   export without validation

Output: private/exams-out/<name>/ (auto-detected from input path)
Override: EXAM_FORGE_OUT=/path/to/output/dir
USAGE
  exit 1
fi

if [[ ! -f "${INPUT}" ]]; then
  echo "Error: file not found: ${INPUT}" >&2
  exit 1
fi

if [[ ! -d "${SCRIPT_DIR}/node_modules" ]]; then
  echo "Installing dependencies (js-yaml)..."
  (cd "${SCRIPT_DIR}" && npm install --silent)
fi

BASE="$(basename "${INPUT}" .yml)"
BASE="${BASE%.yaml}"
INPUT_DIR="$(cd "$(dirname "${INPUT}")" && pwd)"

# Resolve output directory (prefer gitignored exams-out/)
resolve_out_root() {
  if [[ -n "${EXAM_FORGE_OUT:-}" ]]; then
    echo "${EXAM_FORGE_OUT}"
    return
  fi
  if [[ "${INPUT_DIR}" == */private/exams ]] || [[ "${INPUT_DIR}" == */private/exams/* ]]; then
    echo "${INPUT_DIR%/exams*}/exams-out"
    return
  fi
  if [[ -d "${INPUT_DIR}/../exams-out" ]]; then
    echo "$(cd "${INPUT_DIR}/../exams-out" && pwd)"
    return
  fi
  echo "${INPUT_DIR}/export"
}

OUT_ROOT="$(resolve_out_root)"
OUT_DIR="${OUT_ROOT}/${BASE}"
mkdir -p "${OUT_DIR}"
OUT_DIR_ABS="$(cd "${OUT_DIR}" && pwd)"

MOODLE_OUT="${OUT_DIR}/${BASE}-moodle.xml"
GIFT_OUT="${OUT_DIR}/${BASE}.gift.txt"
QTI_OUT="${OUT_DIR}/${BASE}-qti"
BB_TXT_OUT="${OUT_DIR}/${BASE}-bb-pool.txt"

# --- Validation gate ---
run_validation() {
  echo "━━━ Validating bank ━━━"
  if node "${SCRIPT_DIR}/validate-exam.js" --input="${INPUT}"; then
    echo ""
  else
    local exit_code=$?
    if [[ ${exit_code} -eq 1 ]]; then
      echo "❌ Validation failed — fix errors before exporting." >&2
      exit 1
    fi
    # exit 2 = warnings only, continue
    echo ""
  fi
}

# --- Exporters ---
export_moodle() {
  echo "━━━ Moodle XML ━━━"
  node "${SCRIPT_DIR}/yaml-to-moodle-xml.js" \
    --input="${INPUT}" \
    --output="${MOODLE_OUT}"
}

export_gift() {
  echo "━━━ Moodle GIFT ━━━"
  node "${SCRIPT_DIR}/yaml-to-gift.js" \
    --input="${INPUT}" \
    --output="${GIFT_OUT}"
}

zip_qti_dir() {
  local dir="$1"
  local zip_path="$2"
  rm -f "${zip_path}"
  (cd "${dir}" && zip -r "${zip_path}" . -x "*.DS_Store") >/dev/null
}

export_qti() {
  echo "━━━ Blackboard QTI 2.1 (Ultra profile) ━━━"
  node "${SCRIPT_DIR}/yaml-to-qti.js" \
    --input="${INPUT}" \
    --outdir="${QTI_OUT}"

  echo "Creating ZIP..."
  zip_qti_dir "${QTI_OUT}" "${OUT_DIR_ABS}/${BASE}-qti.zip"
  echo "Blackboard ZIP: ${OUT_DIR_ABS}/${BASE}-qti.zip"

  if [[ "${BB_SPLIT_POINTS:-}" == "1" ]] || [[ "${MODE}" == "--bb-split" ]]; then
    echo "━━━ Blackboard split banks (essays / auto) ━━━"
    node "${SCRIPT_DIR}/yaml-to-qti.js" \
      --input="${INPUT}" \
      --outdir="${QTI_OUT}" \
      --split-by-points
    ESSAY_QTI="${OUT_DIR}/${BASE}-essays-qti"
    AUTO_QTI="${OUT_DIR}/${BASE}-auto-qti"
    zip_qti_dir "${ESSAY_QTI}" "${OUT_DIR_ABS}/${BASE}-essays-qti.zip"
    zip_qti_dir "${AUTO_QTI}" "${OUT_DIR_ABS}/${BASE}-auto-qti.zip"
    echo "Essay pool ZIP (set 0.5 pt when adding): ${OUT_DIR_ABS}/${BASE}-essays-qti.zip"
    echo "Auto pool ZIP (set 0.25 pt when adding): ${OUT_DIR_ABS}/${BASE}-auto-qti.zip"
  fi
}

export_bb_txt() {
  echo "━━━ Blackboard TXT Pool ━━━"
  node "${SCRIPT_DIR}/yaml-to-bb-txt.js" \
    --input="${INPUT}" \
    --output="${BB_TXT_OUT}"
}

# --- Main ---
echo "Output directory: ${OUT_DIR}"
echo ""

case "${MODE}" in
  --validate-only)
    run_validation
    ;;
  --skip-validation)
    export_moodle; echo ""; export_gift; echo ""; export_qti; echo ""; export_bb_txt
    ;;
  --moodle-only)
    run_validation; export_moodle
    ;;
  --gift-only)
    run_validation; export_gift
    ;;
  --qti-only)
    run_validation; export_qti
    ;;
  --bb-split)
    run_validation; BB_SPLIT_POINTS=1 export_qti
    ;;
  --bb-txt-only)
    run_validation; export_bb_txt
    ;;
  all|*)
    run_validation
    export_moodle; echo ""
    export_gift; echo ""
    export_qti; echo ""
    export_bb_txt
    echo ""
    echo "━━━ Summary ━━━"
    echo "  Moodle XML:     ${MOODLE_OUT}"
    echo "  Moodle GIFT:    ${GIFT_OUT}"
    echo "  Blackboard QTI: ${OUT_DIR}/${BASE}-qti.zip"
    echo "  Blackboard TXT: ${BB_TXT_OUT}"
    ;;
esac
