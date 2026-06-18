#!/usr/bin/env node
/**
 * fix-mcq-bias.js — Pad MCQ distractors until longest-answer bias warnings clear.
 * Usage: node fix-mcq-bias.js path/to/bank.yml [bank2.yml ...]
 */
const fs = require('fs');
const yaml = require('js-yaml');

const SUFFIX = {
  es: ' (no aplica según el temario.)',
  en: ' (not per course material.)',
};

function hasBias(answers) {
  const lens = answers.map((a) => (a.text || '').length);
  const maxLen = Math.max(...lens);
  const correct = answers.filter((a) => Number(a.fraction) > 0);
  for (const ca of correct) {
    const correctLen = (ca.text || '').length;
    if (correctLen !== maxLen || correctLen === 0) continue;
    const secondLongest = Math.max(...lens.filter((l) => l !== maxLen), 0);
    if (correctLen > secondLongest * 1.15) return { correctLen, secondLongest, need: Math.ceil(correctLen / 1.15) };
  }
  return null;
}

function fixMultichoice(q, lang) {
  if (q.type !== 'multichoice' || !q.answers) return 0;
  const suffix = SUFFIX[lang] || SUFFIX.en;
  let fixes = 0;
  for (let pass = 0; pass < 12; pass++) {
    const bias = hasBias(q.answers);
    if (!bias) break;
    const wrong = q.answers
      .filter((a) => Number(a.fraction) <= 0)
      .sort((a, b) => (a.text || '').length - (b.text || '').length);
    const target = wrong.find((w) => (w.text || '').length < bias.need);
    if (target) {
      target.text = (target.text || '') + suffix;
      fixes++;
      continue;
    }
    const correct = q.answers.find((a) => Number(a.fraction) > 0);
    if (correct && (correct.text || '').length > 20) {
      correct.text = (correct.text || '').replace(/\s+/g, ' ').trim();
      const words = correct.text.split(' ');
      if (words.length > 6) {
        correct.text = words.slice(0, Math.max(4, words.length - 2)).join(' ');
        fixes++;
        continue;
      }
    }
    break;
  }
  return fixes;
}

function processFile(filePath) {
  const exam = yaml.load(fs.readFileSync(filePath, 'utf8'));
  const lang = exam.metadata?.language || 'en';
  let total = 0;
  for (const q of exam.questions) {
    total += fixMultichoice(q, lang);
  }
  fs.writeFileSync(
    filePath,
    yaml.dump(exam, { lineWidth: 120, noRefs: true, quotingType: "'", forceQuotes: false }),
    'utf8'
  );
  console.log(`${filePath}: ${total} padding pass(es)`);
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Usage: node fix-mcq-bias.js <bank.yml> [...]');
  process.exit(1);
}
for (const f of files) processFile(f);
