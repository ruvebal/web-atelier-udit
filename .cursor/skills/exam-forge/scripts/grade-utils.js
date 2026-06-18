/**
 * Grade formatting for LMS exporters.
 * XML always uses dot decimals (0.5). Moodle UI may display comma (0,5) in Spanish locale.
 */

function normalizePoints(points) {
  const value = Number(points);
  if (!Number.isFinite(value) || value < 0) return 1;
  return value;
}

/** Moodle XML <defaultgrade> — e.g. 0.5000000 (NOT 0.5.0000000); allows 0 for trap essays */
function formatMoodleDefaultGrade(points) {
  const value = Number(points);
  if (!Number.isFinite(value) || value < 0) return (1).toFixed(7);
  return value.toFixed(7);
}

/** QTI normalMaximum — dot decimal string for XML attributes */
function formatQtiMaxScore(points) {
  const value = normalizePoints(points);
  // Avoid locale comma; keep short when integer
  return Number.isInteger(value) ? String(value) : String(value);
}

module.exports = {
  normalizePoints,
  formatMoodleDefaultGrade,
  formatQtiMaxScore,
};
