#!/usr/bin/env node
/**
 * rescale-exam-points.js — Rescale exam bank from /100 to /10 (or custom scale).
 * Usage: node rescale-exam-points.js --target=10 path/to/bank.yml [...]
 */
const fs = require('fs');
const yaml = require('js-yaml');

const target = Number(process.argv.find((a) => a.startsWith('--target='))?.split('=')[1] || 10);
const files = process.argv.filter((a) => !a.startsWith('--') && a.endsWith('.yml'));

if (!files.length) {
  console.error('Usage: node rescale-exam-points.js --target=10 <bank.yml> [...]');
  process.exit(1);
}

for (const filePath of files) {
  const exam = yaml.load(fs.readFileSync(filePath, 'utf8'));
  const oldTotal = Number(exam.metadata?.total_points) || 100;
  const factor = target / oldTotal;

  for (const q of exam.questions || []) {
    if (q.points == null) continue;
    if (target === 10 && (oldTotal === 100 || oldTotal === 10)) {
      // Exact binary-safe split: 10×0.5 + 20×0.25 = 10
      q.points = q.type === 'essay' ? 0.5 : 0.25;
    } else {
      const raw = Number(q.points) * (target / oldTotal);
      q.points = Math.round(raw * 100) / 100;
    }
  }

  // Fix IEEE drift (10×0.6 ≠ 6 exactly in float) on last question
  let sum = (exam.questions || []).reduce((s, q) => s + (Number(q.points) || 0), 0);
  const drift = target - sum;
  if (Math.abs(drift) > 1e-9 && exam.questions?.length) {
    const last = exam.questions[exam.questions.length - 1];
    last.points = Math.round((Number(last.points) + drift) * 1000) / 1000;
    sum = (exam.questions || []).reduce((s, q) => s + (Number(q.points) || 0), 0);
  }

  exam.metadata.total_points = target;

  fs.writeFileSync(
    filePath,
    yaml.dump(exam, { lineWidth: 120, noRefs: true, quotingType: "'", forceQuotes: false }),
    'utf8'
  );

  const finalSum = (exam.questions || []).reduce((s, q) => s + (Number(q.points) || 0), 0);
  console.log(`${filePath}: → ${target} pts (essay 0.5, auto 0.25; sum=${finalSum})`);
}
