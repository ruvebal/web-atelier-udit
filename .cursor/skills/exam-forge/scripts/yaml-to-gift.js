#!/usr/bin/env node
/**
 * YAML → Moodle GIFT Exporter (exam-forge)
 *
 * Converts YAML exam banks to Moodle GIFT plain-text format.
 * Supports: multichoice (single + multi), truefalse, matching, essay.
 * Does NOT support: gapselect (degraded to essay with warning), images, HTML.
 *
 * Part of: .cursor/skills/exam-forge/scripts/  — Portability: ../PORTABILITY.md
 * Git: prefer --output under private/exams-out/ (gitignored).
 *
 * Usage:
 *   node yaml-to-gift.js --input=exam.yml --output=exam.gift.txt
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
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function escapeGift(text) {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\')
    .replace(/~/g, '\\~')
    .replace(/=/g, '\\=')
    .replace(/#/g, '\\#')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/:/g, '\\:');
}

function generateQuestion(q) {
  const stem = escapeGift(stripHtml(q.question));
  const title = (q.name || q.id || '').replace(/::/g, '');

  switch (q.type) {
    case 'multichoice':
      return generateMultichoice(q, title, stem);
    case 'truefalse':
      return generateTrueFalse(q, title, stem);
    case 'matching':
      return generateMatching(q, title, stem);
    case 'essay':
      return generateEssay(q, title, stem);
    case 'gapselect':
      console.warn(`⚠️  ${q.id}: gapselect degraded to essay in GIFT (no GIFT equivalent)`);
      return generateEssay(q, title, stem);
    default:
      console.warn(`⚠️  ${q.id}: unknown type "${q.type}" — skipped`);
      return '';
  }
}

function generateMultichoice(q, title, stem) {
  const answers = q.answers || [];
  const lines = [`::${title}:: ${stem} {`];

  for (const a of answers) {
    const fraction = Number(a.fraction) || 0;
    const text = escapeGift(stripHtml(a.text));
    const feedback = a.feedback ? ` #${escapeGift(stripHtml(a.feedback))}` : '';

    if (fraction === 100) {
      lines.push(`  =${text}${feedback}`);
    } else if (fraction > 0 && fraction < 100) {
      lines.push(`  ~%${fraction}%${text}${feedback}`);
    } else if (fraction < 0) {
      lines.push(`  ~%${fraction}%${text}${feedback}`);
    } else {
      lines.push(`  ~${text}${feedback}`);
    }
  }

  lines.push('}');
  return lines.join('\n');
}

function generateTrueFalse(q, title, stem) {
  if (q.answers && Array.isArray(q.answers)) {
    const trueAnswer = q.answers.find(a => /^true$/i.test(stripHtml(a.text)));
    const isTrue = trueAnswer && Number(trueAnswer.fraction) > 0;
    const trueFeedback = q.answers.find(a => /^true$/i.test(stripHtml(a.text)))?.feedback;
    const falseFeedback = q.answers.find(a => /^false$/i.test(stripHtml(a.text)))?.feedback;
    const fb = trueFeedback || falseFeedback
      ? ` #${escapeGift(stripHtml(trueFeedback || ''))} #${escapeGift(stripHtml(falseFeedback || ''))}`
      : '';
    return `::${title}:: ${stem} {${isTrue ? 'TRUE' : 'FALSE'}${fb}}`;
  }
  const correct = q.correct === true || q.correct === 'true';
  return `::${title}:: ${stem} {${correct ? 'TRUE' : 'FALSE'}}`;
}

function generateMatching(q, title, stem) {
  const subs = q.subquestions || [];
  const lines = [`::${title}:: ${stem} {`];
  for (const s of subs) {
    lines.push(`  =${escapeGift(stripHtml(s.premise))} -> ${escapeGift(stripHtml(s.answer))}`);
  }
  lines.push('}');
  return lines.join('\n');
}

function generateEssay(q, title, stem) {
  return `::${title}:: ${stem} {}`;
}

function transformYamlToGift(inputPath, outputPath) {
  console.log(`Reading YAML: ${inputPath}`);
  const exam = yaml.load(fs.readFileSync(inputPath, 'utf8'));

  if (!exam || !exam.questions) {
    throw new Error('Bank has no questions.');
  }

  console.log(`Loaded: ${exam.metadata?.title || 'Untitled'}`);
  console.log(`Questions: ${exam.questions.length}`);

  const blocks = [];
  let currentCategory = null;

  const catMap = {};
  if (exam.categories) {
    for (const c of exam.categories) catMap[c.id] = c.name;
  }

  for (const q of exam.questions) {
    const cat = catMap[q.category];
    if (cat && cat !== currentCategory) {
      currentCategory = cat;
      blocks.push(`$CATEGORY: $course$/top/${currentCategory}`);
    }
    const gift = generateQuestion(q);
    if (gift) blocks.push(gift);
  }

  const output = blocks.join('\n\n') + '\n';
  fs.writeFileSync(outputPath, output, 'utf8');

  const typeCounts = {};
  for (const q of exam.questions) {
    typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
  }
  console.log('\n=== GIFT Export Statistics ===');
  console.log(`Output: ${outputPath}`);
  for (const [t, c] of Object.entries(typeCounts)) console.log(`  ${t}: ${c}`);
  console.log(`\n✅ GIFT export complete.`);
}

const args = parseArgs(process.argv.slice(2));
if (!args.input) {
  console.error('Usage: node yaml-to-gift.js --input=exam.yml --output=exam.gift.txt');
  process.exit(1);
}
const scriptDir = __dirname;
const inputPath = resolveInputPath(args.input, scriptDir);
const outputPath = resolveOutputPath(
  args.output || path.basename(args.input, path.extname(args.input)) + '.gift.txt',
  scriptDir
);

try {
  transformYamlToGift(inputPath, outputPath);
} catch (e) {
  console.error(`❌ GIFT export failed: ${e.message}`);
  process.exit(1);
}
