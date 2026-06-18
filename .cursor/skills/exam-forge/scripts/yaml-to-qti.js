#!/usr/bin/env node
/**
 * YAML → QTI 2.1 Exporter for Blackboard Ultra (exam-forge)
 *
 * Emits the same package shape Blackboard Ultra exports after a successful import:
 *   imsmanifest.xml          (schema QTIv2.1 / 2.0, dependency refs)
 *   qti21/question_bank00001.xml
 *   qti21/assessmentItem000NN.xml
 *
 * Points live in MAXSCORE outcome defaultValue (not SCORE normalMaximum).
 * Blackboard may still default imported bank items to 1 pt — use --split-by-points
 * for two pools (essays vs auto) and set 0.5 / 0.25 when adding each pool to a test.
 *
 * Usage:
 *   node yaml-to-qti.js --input=exam.yml --outdir=exam-qti
 *   node yaml-to-qti.js --input=exam.yml --outdir=exam-qti --split-by-points
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { resolveInputPath } = require('./resolve-path');
const { formatQtiMaxScore } = require('./grade-utils');

const QTI_NAMESPACE = 'http://www.imsglobal.org/xsd/imsqti_v2p1';
const QTI_SCHEMA =
  'http://www.imsglobal.org/xsd/imsqti_v2p1 http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd';

const MANIFEST_NS = 'http://www.imsglobal.org/xsd/imscp_v1p1';
const MANIFEST_SCHEMA =
  'http://www.imsglobal.org/xsd/imscp_v1p1 http://www.imsglobal.org/xsd/imscp_v1p2.xsd http://ltsc.ieee.org/xsd/LOM imsmd_loose_v1p3.xsd http://www.imsglobal.org/xsd/imsqti_metadata_v2p1 http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_metadata_v2p1.xsd http://www.imsglobal.org/xsd/imsccv1p2/imscsmd_v1p0 http://www.imsglobal.org/profile/cc/ccv1p2/ccv1p2_imscsmd_v1p0.xsd';

const BB_RESPONSE_PROCESSING = `<responseProcessing><responseCondition><responseIf><match><variable identifier="RESPONSE"/><correct identifier="RESPONSE"/></match><setOutcomeValue identifier="SCORE"><variable identifier="MAXSCORE"/></setOutcomeValue><setOutcomeValue identifier="FEEDBACKBASIC"><baseValue baseType="identifier">correct_fb</baseValue></setOutcomeValue></responseIf><responseElse><setOutcomeValue identifier="FEEDBACKBASIC"><baseValue baseType="identifier">incorrect_fb</baseValue></setOutcomeValue></responseElse></responseCondition></responseProcessing>`;

function parseArgs(argv = []) {
  return argv.reduce((acc, arg) => {
    if (arg.startsWith('--input=')) acc.input = arg.split('=').slice(1).join('=');
    else if (arg.startsWith('--outdir=')) acc.outdir = arg.split('=').slice(1).join('=');
    else if (arg === '--split-by-points') acc.splitByPoints = true;
    return acc;
  }, {});
}

function sanitizeId(id) {
  return String(id || '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/__+/g, '_');
}

function escapeAttr(str = '') {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeHtmlForBbDiv(html = '') {
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapBbPrompt(questionHtml = '') {
  const text = (questionHtml || '').trim();
  if (!text) return '<div><div></div></div>';
  const inner = /^<(p|ul|ol|div|h[1-6]|blockquote|pre)[\s>]/i.test(text) ? text : `<p>${text}</p>`;
  return `<div><div> \n ${inner} \n</div></div>`;
}

function padItemRef(index) {
  return `assessmentItem${String(index).padStart(5, '0')}`;
}

function bbOutcomes(maxScore) {
  const points = formatQtiMaxScore(maxScore);
  return `<outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float"><defaultValue><value>0</value></defaultValue></outcomeDeclaration><outcomeDeclaration identifier="FEEDBACKBASIC" cardinality="single" baseType="identifier"/><outcomeDeclaration identifier="MAXSCORE" cardinality="single" baseType="float"><defaultValue><value>${points}</value></defaultValue></outcomeDeclaration>`;
}

function logWarn(msg) {
  console.warn(`⚠️  ${msg}`);
}

function buildEssayItem(q, itemIdentifier) {
  const lines = q.response_lines || 8;
  let note = '';
  if (['gapselect', 'matching'].includes(q.type)) {
    note =
      '<p><em>Nota: Esta pregunta se ha convertido a respuesta abierta para el paquete QTI.</em></p>';
  }
  const prompt = wrapBbPrompt(`${q.question || ''}${note ? `\n${note}` : ''}`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<assessmentItem xmlns="${QTI_NAMESPACE}" xmlns:ns9="http://www.imsglobal.org/xsd/apip/apipv1p0/imsapip_qtiv1p0" xmlns:ns8="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="${QTI_SCHEMA}" adaptive="false" timeDependent="false" identifier="${escapeAttr(itemIdentifier)}" title="${escapeAttr(q.name)}"><responseDeclaration cardinality="single" baseType="string" identifier="RESPONSE"/>${bbOutcomes(q.points)}<itemBody>${prompt}<extendedTextInteraction responseIdentifier="RESPONSE" expectedLines="${lines}"/></itemBody></assessmentItem>`;
}

function buildChoiceItem(q, itemIdentifier) {
  const single = q.single !== false;
  const maxChoices = single ? 1 : q.answers.filter((a) => Number(a.fraction) > 0).length || 1;
  const choices = q.answers.map((answer, idx) => ({
    id: `answer_${idx + 1}`,
    text: answer.text || '',
    correct: Number(answer.fraction) > 0,
  }));

  if (!choices.some((c) => c.correct)) {
    logWarn(`Pregunta ${q.id} no tiene respuestas correctas marcadas. Se marcará la primera como correcta.`);
    choices[0].correct = true;
  }

  const correctValues = choices
    .filter((c) => c.correct)
    .map((c) => `<value>${c.id}</value>`)
    .join('');

  const choiceXml = choices
    .map(
      (choice) =>
        `<simpleChoice identifier="${choice.id}" fixed="true"><div>\n  ${escapeHtmlForBbDiv(choice.text)}\n</div></simpleChoice>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<assessmentItem xmlns="${QTI_NAMESPACE}" xmlns:ns9="http://www.imsglobal.org/xsd/apip/apipv1p0/imsapip_qtiv1p0" xmlns:ns8="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="${QTI_SCHEMA}" adaptive="false" timeDependent="false" identifier="${escapeAttr(itemIdentifier)}" title="${escapeAttr(q.name)}"><responseDeclaration cardinality="multiple" baseType="identifier" identifier="RESPONSE"><correctResponse>${correctValues}</correctResponse></responseDeclaration>${bbOutcomes(q.points)}<itemBody>${wrapBbPrompt(q.question || '')}<choiceInteraction responseIdentifier="RESPONSE" maxChoices="${maxChoices}" shuffle="false">${choiceXml}</choiceInteraction></itemBody>${BB_RESPONSE_PROCESSING}</assessmentItem>`;
}

function buildMatchingItem(q, itemIdentifier) {
  const leftChoices = q.subquestions.map((sq, idx) => ({ id: `L${idx + 1}`, text: sq.premise }));
  const rightChoices = q.subquestions.map((sq, idx) => ({ id: `R${idx + 1}`, text: sq.answer }));
  const correctPairs = q.subquestions
    .map((sq, idx) => `<value>${`L${idx + 1}`} ${`R${idx + 1}`}</value>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<assessmentItem xmlns="${QTI_NAMESPACE}" xmlns:ns9="http://www.imsglobal.org/xsd/apip/apipv1p0/imsapip_qtiv1p0" xmlns:ns8="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="${QTI_SCHEMA}" adaptive="false" timeDependent="false" identifier="${escapeAttr(itemIdentifier)}" title="${escapeAttr(q.name)}"><responseDeclaration cardinality="multiple" baseType="directedPair" identifier="RESPONSE"><correctResponse>${correctPairs}</correctResponse></responseDeclaration>${bbOutcomes(q.points)}<itemBody>${wrapBbPrompt(q.question || '')}<matchInteraction responseIdentifier="RESPONSE" shuffle="false" maxAssociations="${leftChoices.length}"><simpleMatchSet>${leftChoices
    .map(
      (c) =>
        `<simpleAssociableChoice identifier="${c.id}" matchMax="1"><div>${escapeHtmlForBbDiv(c.text)}</div></simpleAssociableChoice>`
    )
    .join('')}</simpleMatchSet><simpleMatchSet>${rightChoices
    .map(
      (c) =>
        `<simpleAssociableChoice identifier="${c.id}" matchMax="1"><div>${escapeHtmlForBbDiv(c.text)}</div></simpleAssociableChoice>`
    )
    .join('')}</simpleMatchSet></matchInteraction></itemBody>${BB_RESPONSE_PROCESSING}</assessmentItem>`;
}

function buildItem(q, itemIdentifier) {
  switch (q.type) {
    case 'essay':
      return buildEssayItem(q, itemIdentifier);
    case 'multichoice':
      return buildChoiceItem(q, itemIdentifier);
    case 'truefalse':
      return buildChoiceItem({
        ...q,
        single: true,
        answers: [
          { text: 'Verdadero', fraction: q.correct ? 100 : 0 },
          { text: 'Falso', fraction: q.correct ? 0 : 100 },
        ],
      }, itemIdentifier);
    case 'matching':
      return buildMatchingItem(q, itemIdentifier);
    case 'gapselect':
      logWarn(`Pregunta ${q.id} (gapselect) se exportará como ensayo para mantener compatibilidad QTI.`);
      return buildEssayItem(q, itemIdentifier);
    default:
      logWarn(`Tipo ${q.type} no soportado plenamente. Se exporta como ensayo.`);
      return buildEssayItem(q, itemIdentifier);
  }
}

function writeQuestionBank(qtiDir, questions, title) {
  const refs = questions
    .map((q, idx) => {
      const refId = padItemRef(idx + 1);
      return `<assessmentItemRef identifier="${refId}" href="${refId}.xml" />`;
    })
    .join('');

  const bank = `<?xml version="1.0" encoding="UTF-8"?>
<assessmentTest xmlns="${QTI_NAMESPACE}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="${QTI_SCHEMA}" identifier="question_bank00001" title="${escapeAttr(title)}"><testPart identifier="question_bank00001_1" navigationMode="nonlinear" submissionMode="simultaneous"><assessmentSection identifier="question_bank00001_1_1" visible="false" title="Section 1">${refs}</assessmentSection></testPart></assessmentTest>`;

  fs.writeFileSync(path.join(qtiDir, 'question_bank00001.xml'), bank, 'utf8');
}

function writeManifest(outDir, itemCount) {
  const deps = Array.from({ length: itemCount }, (_, i) => {
    const refId = padItemRef(i + 1);
    return `<dependency identifierref="${refId}"/>`;
  }).join('');

  const itemResources = Array.from({ length: itemCount }, (_, i) => {
    const refId = padItemRef(i + 1);
    return `<resource href="qti21/${refId}.xml" identifier="${refId}" type="imsqti_item_xmlv2p1"><file href="qti21/${refId}.xml"/></resource>`;
  }).join('');

  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="man00001" xmlns="${MANIFEST_NS}" xmlns:csm="http://www.imsglobal.org/xsd/imsccv1p2/imscsmd_v1p0" xmlns:imsmd="http://ltsc.ieee.org/xsd/LOM" xmlns:imsqti="http://www.imsglobal.org/xsd/imsqti_metadata_v2p1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="${MANIFEST_SCHEMA}"><metadata><schema>QTIv2.1</schema><schemaversion>2.0</schemaversion></metadata><organizations/><resources><resource href="qti21/question_bank00001.xml" identifier="question_bank00001" type="imsqti_test_xmlv2p1"><file href="qti21/question_bank00001.xml"/>${deps}</resource>${itemResources}</resources></manifest>`;

  fs.writeFileSync(path.join(outDir, 'imsmanifest.xml'), manifest, 'utf8');
}

function exportQtiPackage(exam, outDir) {
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  const qtiDir = path.join(outDir, 'qti21');
  fs.mkdirSync(qtiDir, { recursive: true });

  const questions = Array.isArray(exam.questions) ? exam.questions : [];
  const title = exam.metadata?.title || 'Question bank';

  questions.forEach((question, idx) => {
    const refId = padItemRef(idx + 1);
    const itemIdentifier = `QUE__${sanitizeId(question.id)}`;
    const itemXml = buildItem(question, itemIdentifier);
    fs.writeFileSync(path.join(qtiDir, `${refId}.xml`), itemXml, 'utf8');
  });

  writeQuestionBank(qtiDir, questions, title);
  writeManifest(outDir, questions.length);

  fs.writeFileSync(
    path.join(outDir, 'README.txt'),
    `Blackboard Ultra QTI 2.1 package (${new Date().toISOString()}).\n` +
      `Items: ${questions.length}. Points in MAXSCORE per item.\n` +
      'Zip this folder (imsmanifest.xml at root) before import.\n'
  );

  return questions.length;
}

function isAutoGraded(q) {
  return q.type !== 'essay';
}

function exportQti(inputPath, outDir, options = {}) {
  console.log(`Leyendo YAML: ${inputPath}`);
  const exam = yaml.load(fs.readFileSync(inputPath, 'utf8'));

  if (!exam || !exam.questions) {
    throw new Error('El banco YAML no contiene preguntas.');
  }

  if (options.splitByPoints) {
    const essays = exam.questions.filter((q) => !isAutoGraded(q));
    const auto = exam.questions.filter((q) => isAutoGraded(q));
    const base = outDir.replace(/-qti$/, '');
    const essayDir = `${base}-essays-qti`;
    const autoDir = `${base}-auto-qti`;

    const essayCount = exportQtiPackage({ ...exam, questions: essays }, essayDir);
    const autoCount = exportQtiPackage({ ...exam, questions: auto }, autoDir);

    console.log(`\n✅ Split export (by points tier):`);
    console.log(`   Essays (${essayCount}): ${essayDir}`);
    console.log(`   Auto (${autoCount}):   ${autoDir}`);
    return { essayDir, autoDir, essayCount, autoCount };
  }

  const count = exportQtiPackage(exam, outDir);
  console.log(`\n✅ Exportación completada: ${outDir}`);
  console.log(`   Items generados: ${count}`);
  const outDirBase = path.basename(outDir);
  const zipName = `${outDirBase}.zip`;
  console.log(`\n📦 Para generar el ZIP listo para Blackboard:`);
  console.log(`   cd ${outDirBase} && zip -r ../${zipName} . && cd ..`);
}

const args = parseArgs(process.argv.slice(2));
const scriptDir = __dirname;
const inputFile = args.input || 'exam-portfolio-self-assessment.yml';
const outDirName = args.outdir || `${path.basename(inputFile, path.extname(inputFile))}-qti`;
const inputPath = resolveInputPath(inputFile, scriptDir);
const outDir = path.isAbsolute(outDirName)
  ? outDirName
  : path.resolve(process.cwd(), outDirName);

try {
  exportQti(inputPath, outDir, { splitByPoints: Boolean(args.splitByPoints) });
} catch (error) {
  console.error('❌ Error generando QTI:', error.message);
  process.exit(1);
}

module.exports = { exportQti, exportQtiPackage, buildItem };
