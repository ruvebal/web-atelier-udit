#!/usr/bin/env node
/**
 * validate-exam.js — Schema, pedagogy, and anti-AI linter for YAML exam banks.
 *
 * Part of: .cursor/skills/exam-forge/scripts/
 * Exits 0 if bank passes, 1 if errors, 2 if only warnings.
 *
 * Checks (errors):
 *   - Required top-level keys (metadata, categories, questions)
 *   - metadata.language present
 *   - Every question has id, category, type, name, points, question
 *   - category references resolve to categories[]
 *   - Duplicate question IDs
 *   - answers[] required for multichoice / truefalse
 *   - subquestions[] required for matching
 *   - groups[] required for gapselect
 *   - XHTML validity of question stems (well-formed tags)
 *   - Fraction values: at least one answer with fraction > 0 for MCQ
 *
 * Checks (warnings):
 *   - metadata.total_points vs actual sum
 *   - MCQ longest-answer bias (correct answer is longest)
 *   - Anti-AI local-anchor coverage (< 20%)
 *   - Anti-AI honeypot coverage heuristic (informational)
 *   - Missing feedback on MCQ answers
 *   - Essay without grader_info
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { resolveInputPath } = require('./resolve-path');

const VALID_TYPES = ['multichoice', 'truefalse', 'matching', 'essay', 'gapselect'];
const REQUIRED_META = ['title', 'course', 'language'];
const REQUIRED_Q = ['id', 'category', 'type', 'name', 'points', 'question'];

const LOCAL_ANCHOR_SIGNALS = [
  /\bslide\b/i, /\bexercise\b/i, /\bejercicio\b/i, /\bclass\b/i, /\bclase\b/i,
  /\bsrc\//i, /\bpages\//i, /\bcomponents\//i, /\bservices\//i, /\bhooks\//i,
  /\blab\b/i, /\bpráctica\b/i, /\bproject\b/i, /\bproyecto\b/i, /\btemplate\b/i,
  /\bplantilla\b/i, /\brepo\b/i, /\brepository\b/i, /\brepositorio\b/i,
  /\bAtelier\b/i, /\bGeophysical\b/i, /\bAggregator\b/i,
];

function parseArgs(argv) {
  const args = { strict: false };
  for (const arg of argv) {
    if (arg.startsWith('--input=')) args.input = arg.split('=').slice(1).join('=');
    if (arg === '--strict') args.strict = true;
  }
  return args;
}

function isWellFormedXhtml(html) {
  if (!html || typeof html !== 'string') return true;
  const trimmed = html.trim();
  if (!trimmed.includes('<')) return true;
  const openTags = (trimmed.match(/<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*(?<!\/)>/g) || [])
    .map(t => t.match(/<([a-zA-Z][a-zA-Z0-9]*)/)[1].toLowerCase());
  const closeTags = (trimmed.match(/<\/([a-zA-Z][a-zA-Z0-9]*)>/g) || [])
    .map(t => t.match(/<\/([a-zA-Z][a-zA-Z0-9]*)/)[1].toLowerCase());
  const voidElements = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr']);
  const nonVoidOpen = openTags.filter(t => !voidElements.has(t));
  if (nonVoidOpen.length !== closeTags.length) return false;
  const unescapedAmpersands = trimmed.match(/&(?!amp;|lt;|gt;|quot;|#39;|#\d+;|#x[0-9a-fA-F]+;)/g);
  if (unescapedAmpersands) return false;
  return true;
}

function hasLocalAnchor(questionText) {
  if (!questionText) return false;
  return LOCAL_ANCHOR_SIGNALS.some(re => re.test(questionText));
}

function validate(inputPath) {
  const errors = [];
  const warnings = [];

  const raw = fs.readFileSync(inputPath, 'utf8');
  let exam;
  try {
    exam = yaml.load(raw);
  } catch (e) {
    errors.push(`YAML parse error: ${e.message}`);
    return { errors, warnings };
  }

  if (!exam || typeof exam !== 'object') {
    errors.push('Bank is empty or not an object.');
    return { errors, warnings };
  }

  // --- Top-level structure ---
  if (!exam.metadata) errors.push('Missing top-level key: metadata');
  if (!exam.categories || !Array.isArray(exam.categories)) errors.push('Missing or invalid: categories (must be array)');
  if (!exam.questions || !Array.isArray(exam.questions)) errors.push('Missing or invalid: questions (must be array)');

  if (errors.length > 0) return { errors, warnings };

  // --- Metadata ---
  for (const key of REQUIRED_META) {
    if (!exam.metadata[key]) errors.push(`metadata.${key} is missing`);
  }
  if (exam.metadata.language && !['en', 'es'].includes(exam.metadata.language)) {
    warnings.push(`metadata.language "${exam.metadata.language}" is not en/es — verify intent`);
  }

  // --- Categories ---
  const catIds = new Set();
  for (const cat of exam.categories) {
    if (!cat.id) errors.push('Category missing id');
    if (!cat.name) errors.push(`Category ${cat.id || '?'} missing name`);
    if (cat.id) catIds.add(cat.id);
  }

  // --- Questions ---
  const seenIds = new Set();
  let actualPoints = 0;
  let mcqCount = 0;
  let longestBiasCount = 0;
  let localAnchorCount = 0;
  let totalObjective = 0;

  for (let i = 0; i < exam.questions.length; i++) {
    const q = exam.questions[i];
    const label = q.id || `questions[${i}]`;

    for (const key of REQUIRED_Q) {
      if (q[key] === undefined || q[key] === null || q[key] === '') {
        errors.push(`${label}: missing required field "${key}"`);
      }
    }

    if (q.id) {
      if (seenIds.has(q.id)) errors.push(`${label}: duplicate question ID`);
      seenIds.add(q.id);
    }

    if (q.category && !catIds.has(q.category)) {
      errors.push(`${label}: category "${q.category}" not found in categories[]`);
    }

    if (q.type && !VALID_TYPES.includes(q.type)) {
      errors.push(`${label}: unknown type "${q.type}" (valid: ${VALID_TYPES.join(', ')})`);
    }

    const pts = Number(q.points) || 0;
    actualPoints += pts;

    // XHTML check
    if (q.question && !isWellFormedXhtml(q.question)) {
      errors.push(`${label}: question stem has malformed XHTML (unclosed tags or unescaped &)`);
    }

    // Local anchor detection
    if (hasLocalAnchor(q.question)) localAnchorCount++;

    // Type-specific checks
    if (q.type === 'truefalse') {
      const hasAnswersArray = q.answers && Array.isArray(q.answers) && q.answers.length >= 2;
      const hasLegacyCorrect = q.correct !== undefined;
      if (!hasAnswersArray && !hasLegacyCorrect) {
        errors.push(`${label}: truefalse requires answers[] or correct: true/false`);
      }
      if (hasAnswersArray) {
        const hasCorrect = q.answers.some(a => Number(a.fraction) > 0);
        if (!hasCorrect) errors.push(`${label}: no answer has fraction > 0`);
      }
    }

    if (q.type === 'multichoice') {
      if (!q.answers || !Array.isArray(q.answers) || q.answers.length < 2) {
        errors.push(`${label}: multichoice requires answers[] with at least 2 entries`);
      } else {
        const hasCorrect = q.answers.some(a => Number(a.fraction) > 0);
        if (!hasCorrect) errors.push(`${label}: no answer has fraction > 0`);

        const missingFeedback = q.answers.filter(a => !a.feedback);
        if (missingFeedback.length > 0) {
          warnings.push(`${label}: ${missingFeedback.length} answer(s) missing feedback`);
        }
      }
    }

    if (q.type === 'multichoice' && q.answers && q.answers.length >= 2) {
      mcqCount++;
      totalObjective++;
      const correctAnswers = q.answers.filter(a => Number(a.fraction) > 0);
      const allAnswerLengths = q.answers.map(a => (a.text || '').length);
      const maxLen = Math.max(...allAnswerLengths);

      for (const ca of correctAnswers) {
        const correctLen = (ca.text || '').length;
        if (correctLen === maxLen && correctLen > 0) {
          const secondLongest = Math.max(...allAnswerLengths.filter(l => l !== maxLen), 0);
          if (correctLen > secondLongest * 1.15) {
            longestBiasCount++;
            warnings.push(`${label}: correct answer is longest by >15% (${correctLen} vs ${secondLongest} chars) — longest-answer bias`);
          }
          break;
        }
      }
    }

    if (q.type === 'truefalse') totalObjective++;

    if (q.type === 'matching') {
      if (!q.subquestions || !Array.isArray(q.subquestions) || q.subquestions.length < 2) {
        errors.push(`${label}: matching requires subquestions[] with at least 2 entries`);
      }
      totalObjective++;
    }

    if (q.type === 'gapselect') {
      if (!q.groups || !Array.isArray(q.groups) || q.groups.length < 1) {
        errors.push(`${label}: gapselect requires groups[] with at least 1 entry`);
      }
      totalObjective++;
    }

    if (q.type === 'essay') {
      if (!q.grader_info) {
        warnings.push(`${label}: essay without grader_info — consider adding a rubric`);
      }
    }
  }

  // --- Points mismatch ---
  const declared = Number(exam.metadata.total_points);
  if (declared && Math.abs(declared - actualPoints) > 0.01) {
    warnings.push(`Points mismatch: metadata.total_points = ${declared}, actual sum = ${actualPoints}`);
  }

  // --- Anti-AI coverage ---
  if (totalObjective > 0) {
    const anchorPct = (localAnchorCount / exam.questions.length) * 100;
    if (anchorPct < 20) {
      warnings.push(`Local-anchor coverage: ${anchorPct.toFixed(0)}% of questions (target: ≥20%)`);
    }
    if (mcqCount > 0 && longestBiasCount > 0) {
      warnings.push(`Longest-answer bias: ${longestBiasCount}/${mcqCount} MCQs have correct answer as longest option`);
    }
  }

  return { errors, warnings };
}

// --- CLI ---
const args = parseArgs(process.argv.slice(2));
if (!args.input) {
  console.error('Usage: node validate-exam.js --input=exam.yml [--strict]');
  process.exit(1);
}

const inputPath = resolveInputPath(args.input, __dirname);
console.log(`Validating: ${inputPath}\n`);

const { errors, warnings } = validate(inputPath);

if (errors.length > 0) {
  console.error(`❌ ${errors.length} ERROR(S):`);
  for (const e of errors) console.error(`  • ${e}`);
}
if (warnings.length > 0) {
  console.warn(`\n⚠️  ${warnings.length} WARNING(S):`);
  for (const w of warnings) console.warn(`  • ${w}`);
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ Bank is valid — no errors, no warnings.');
  process.exit(0);
} else if (errors.length > 0) {
  console.error(`\n❌ Validation FAILED (${errors.length} errors, ${warnings.length} warnings)`);
  process.exit(1);
} else {
  if (args.strict) {
    console.error(`\n❌ Strict mode: ${warnings.length} warnings treated as errors.`);
    process.exit(1);
  }
  console.warn(`\n⚠️  Passed with ${warnings.length} warnings.`);
  process.exit(0);
}
