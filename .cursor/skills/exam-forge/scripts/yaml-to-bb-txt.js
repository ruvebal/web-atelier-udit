#!/usr/bin/env node
/**
 * YAML → Blackboard Tab-Delimited TXT Exporter (exam-forge)
 *
 * Converts YAML exam banks to Blackboard pool-upload format.
 * Supports: MC, MA, TF, ESS, MAT, FIB (from gapselect).
 *
 * Part of: .cursor/skills/exam-forge/scripts/  — Portability: ../PORTABILITY.md
 * Git: prefer --output under private/exams-out/ (gitignored).
 *
 * Usage:
 *   node yaml-to-bb-txt.js --input=exam.yml --output=exam-bb-pool.txt
 *
 * Blackboard rules:
 *   - Tab-delimited, one question per line, no header, no blank lines
 *   - Answer labels MUST be in English: correct, incorrect, true, false
 *   - Max 500 questions per file
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { resolveInputPath, resolveOutputPath } = require('./resolve-path');

function parseArgs(argv) {
  const args = {};
  for (const arg of argv) {
    if (arg.startsWith('--input=')) args.input = arg.split('=').slice(1).join('=');
    if (arg.startsWith('--output=')) args.output = arg.split('=').slice(1).join('=');
  }
  return args;
}

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>\s*<p[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function sanitizeTab(text) {
  return stripHtml(text).replace(/\t/g, '    ').replace(/\n/g, ' ');
}

function generateRow(q) {
  const stem = sanitizeTab(q.question);

  switch (q.type) {
    case 'multichoice': {
      const answers = q.answers || [];
      const correctCount = answers.filter(a => Number(a.fraction) > 0).length;
      const type = correctCount > 1 ? 'MA' : 'MC';
      const parts = [type, stem];
      for (const a of answers) {
        parts.push(sanitizeTab(a.text));
        parts.push(Number(a.fraction) > 0 ? 'correct' : 'incorrect');
      }
      return parts.join('\t');
    }

    case 'truefalse': {
      let isTrue;
      if (q.answers && Array.isArray(q.answers)) {
        const trueAnswer = q.answers.find(a => /^true$/i.test(stripHtml(a.text)));
        isTrue = trueAnswer && Number(trueAnswer.fraction) > 0;
      } else {
        isTrue = q.correct === true || q.correct === 'true';
      }
      return ['TF', stem, isTrue ? 'true' : 'false'].join('\t');
    }

    case 'matching': {
      const subs = q.subquestions || [];
      const parts = ['MAT', stem];
      for (const s of subs) {
        parts.push(sanitizeTab(s.premise));
        parts.push(sanitizeTab(s.answer));
      }
      return parts.join('\t');
    }

    case 'essay':
      return ['ESS', stem].join('\t');

    case 'gapselect':
      console.warn(`⚠️  ${q.id}: gapselect degraded to ESS in Blackboard TXT`);
      return ['ESS', stem].join('\t');

    default:
      console.warn(`⚠️  ${q.id}: unknown type "${q.type}" — skipped`);
      return null;
  }
}

function transformYamlToBbTxt(inputPath, outputPath) {
  console.log(`Reading YAML: ${inputPath}`);
  const exam = yaml.load(fs.readFileSync(inputPath, 'utf8'));

  if (!exam || !exam.questions) {
    throw new Error('Bank has no questions.');
  }

  console.log(`Loaded: ${exam.metadata?.title || 'Untitled'}`);
  console.log(`Questions: ${exam.questions.length}`);

  if (exam.questions.length > 500) {
    console.warn(`⚠️  ${exam.questions.length} questions exceeds Blackboard limit of 500 per file`);
  }

  const lines = [];
  const typeCounts = {};

  for (const q of exam.questions) {
    typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
    const row = generateRow(q);
    if (row) lines.push(row);
  }

  fs.writeFileSync(outputPath, lines.join('\n') + '\n', 'utf8');

  console.log('\n=== Blackboard TXT Export Statistics ===');
  console.log(`Output: ${outputPath}`);
  console.log(`Rows: ${lines.length}`);
  for (const [t, c] of Object.entries(typeCounts)) console.log(`  ${t}: ${c}`);
  console.log(`\n✅ Blackboard TXT export complete.`);
}

const args = parseArgs(process.argv.slice(2));
if (!args.input) {
  console.error('Usage: node yaml-to-bb-txt.js --input=exam.yml --output=exam-bb-pool.txt');
  process.exit(1);
}
const scriptDir = __dirname;
const inputPath = resolveInputPath(args.input, scriptDir);
const outputPath = resolveOutputPath(
  args.output || path.basename(args.input, path.extname(args.input)) + '-bb-pool.txt',
  scriptDir
);

try {
  transformYamlToBbTxt(inputPath, outputPath);
} catch (e) {
  console.error(`❌ Blackboard TXT export failed: ${e.message}`);
  process.exit(1);
}
