#!/usr/bin/env node
/**
 * YAML → QTI 2.1 Exporter para Blackboard Ultra (exam-forge)
 *
 * Convierte un banco de preguntas en YAML al formato IMS QTI 2.1 listo para
 * importar en Blackboard Ultra (o cualquier LMS compatible con QTI 2.1).
 *
 * Part of: .cursor/skills/exam-forge/scripts/  — Portability: ../PORTABILITY.md
 * Git: prefer --outdir under private/exams-out/ (gitignored).
 * Install: npm install  (in this directory, requires js-yaml)
 * Rules:   ../BLACKBOARD-QTI-RULES.md
 *
 * Uso:
 *   node yaml-to-qti.js --input=path/to/exam.yml --outdir=exam-qti
 *   npm run qti -- --input=../exams/midterm.yml --outdir=midterm-qti
 *
 * Relative --input / --outdir paths resolve from process.cwd() first.
 *
 * Estructura de salida:
 *   outdir/
 *     imsmanifest.xml   ← manifest del paquete IMS Content (Regla 3 + 4)
 *     assessment.xml    ← wrapper assessmentTest con refs a todos los items (Regla 4)
 *     items/
 *       q001.xml, ...   ← un assessmentItem por pregunta (Regla 1 + 2)
 *
 * Flujo de empaquetado (ver también BLACKBOARD-QTI-RULES.md §Flujo):
 *
 *   1. Ejecutar este script para generar el directorio outdir/
 *   2. Validar XML:
 *        for f in outdir/**\/*.xml outdir/*.xml; do xmllint --noout "$f"; done
 *   3. Comprimir con imsmanifest.xml en la RAÍZ del ZIP (Regla 6):
 *        cd outdir && zip -r ../outdir.zip .
 *      ⚠️  NO usar: zip -r outdir.zip outdir/
 *         (anida los ficheros bajo un subdirectorio → Blackboard: "Unable to convert")
 *   4. Subir el .zip a Blackboard: Course Content > Reuse Questions > Import QTI
 *
 * Reglas de compatibilidad documentadas en: ../BLACKBOARD-QTI-RULES.md
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { resolveInputPath } = require('./resolve-path');

// ─── Namespace constants ──────────────────────────────────────────────────────
// Regla 1 (BLACKBOARD-QTI-RULES.md): usar el namespace QTI puro `imsqti_v2p1`.
// El perfil Common Cartridge (`imsqtiasi_v2p1`) es rechazado por Blackboard
// cuando se importa como banco de preguntas o test.
const QTI_NAMESPACE = 'http://www.imsglobal.org/xsd/imsqti_v2p1';
const QTI_SCHEMA =
  'http://www.imsglobal.org/xsd/imsqti_v2p1 http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd';

// Regla 3 (BLACKBOARD-QTI-RULES.md): manifest con namespace IMS CP v1p1 y
// schemaversion "1.1.3". Sin el bloque <metadata> Blackboard no identifica
// el paquete como IMS Content Package válido.
const MANIFEST_NS = 'http://www.imsglobal.org/xsd/imscp_v1p1';
const MANIFEST_SCHEMA =
  'http://www.imsglobal.org/xsd/imscp_v1p1 http://www.imsglobal.org/xsd/imscp_v1p1.xsd';

function parseArgs(argv = []) {
  return argv.reduce((acc, arg) => {
    if (arg.startsWith('--input=')) {
      acc.input = arg.split('=')[1];
    } else if (arg.startsWith('--outdir=')) {
      acc.outdir = arg.split('=')[1];
    }
    return acc;
  }, {});
}

function sanitizeId(id) {
  return String(id || '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/__+/g, '_');
}

function escapeAttr(str = '') {
  return str.replace(/"/g, '&quot;');
}

function cdata(html = '') {
  return `<![CDATA[${html}]]>`;
}

// Regla 2 (BLACKBOARD-QTI-RULES.md): el texto de la pregunta se embebe como
// XML/XHTML inline en <itemBody>. Envolver en <div class="prompt"> con CDATA
// provoca "Unable to convert the given package" en Blackboard.
// Si el contenido ya abre con una etiqueta de bloque se pasa tal cual;
// el texto plano (sin etiquetas) se envuelve en <p>.
function wrapParagraph(questionHtml = '') {
  const text = questionHtml.trim();
  if (!text) return '';
  if (/^<(p|ul|ol|div|h[1-6]|blockquote|pre)[\s>]/i.test(text)) {
    return text;
  }
  return `<p>${text}</p>`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function normalizePoints(points) {
  const value = Number(points);
  return Number.isFinite(value) && value > 0 ? value : 1;
}

function logWarn(msg) {
  console.warn(`⚠️  ${msg}`);
}

function buildEssayItem(q) {
  const points = normalizePoints(q.points);
  const lines = q.response_lines || 8;
  let note = '';
  if (['gapselect', 'matching'].includes(q.type)) {
    note = '<p><em>Nota: Esta pregunta se ha convertido a respuesta abierta para el paquete QTI.</em></p>';
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<assessmentItem xmlns="${QTI_NAMESPACE}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="${QTI_SCHEMA}" identifier="${escapeAttr(q.id)}" title="${escapeAttr(
    q.name
  )}" adaptive="false" timeDependent="false">
  <responseDeclaration identifier="RESPONSE" cardinality="single" baseType="string"/>
  <outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float">
    <defaultValue><value>0</value></defaultValue>
  </outcomeDeclaration>
  <itemBody>
    ${wrapParagraph(q.question || '')}
    ${note}
    <extendedTextInteraction responseIdentifier="RESPONSE" expectedLines="${lines}" maxStrings="1"/>
  </itemBody>
  <responseProcessing template="http://www.imsglobal.org/question/qti_v2p1/rptemplates/null"/>
</assessmentItem>`;
}

function buildChoiceItem(q) {
  const points = normalizePoints(q.points);
  const single = q.single !== false;
  const maxChoices = single ? 1 : q.answers.filter((a) => Number(a.fraction) > 0).length || 1;
  const cardinality = single ? 'single' : 'multiple';
  const choices = q.answers.map((answer, idx) => ({
    id: `CHOICE_${idx + 1}`,
    text: answer.text || '',
    correct: Number(answer.fraction) > 0,
  }));
  const correctValues = choices.filter((c) => c.correct).map((c) => `<value>${c.id}</value>`).join('');

  if (!correctValues) {
    logWarn(`Pregunta ${q.id} no tiene respuestas correctas marcadas. Se marcará la primera como correcta.`);
    choices[0].correct = true;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<assessmentItem xmlns="${QTI_NAMESPACE}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="${QTI_SCHEMA}" identifier="${escapeAttr(q.id)}" title="${escapeAttr(
    q.name
  )}" adaptive="false" timeDependent="false">
  <responseDeclaration identifier="RESPONSE" cardinality="${cardinality}" baseType="identifier">
    <correctResponse>
      ${choices
        .filter((c) => c.correct)
        .map((c) => `<value>${c.id}</value>`)
        .join('')}
    </correctResponse>
  </responseDeclaration>
  <outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float" normalMaximum="${points}">
    <defaultValue><value>0</value></defaultValue>
  </outcomeDeclaration>
  <itemBody>
    ${wrapParagraph(q.question || '')}
    <choiceInteraction responseIdentifier="RESPONSE" shuffle="true" maxChoices="${maxChoices}">
      ${choices
        .map(
          (choice) => `      <simpleChoice identifier="${choice.id}">${cdata(choice.text || '')}</simpleChoice>`
        )
        .join('\n')}
    </choiceInteraction>
  </itemBody>
  <responseProcessing template="http://www.imsglobal.org/question/qti_v2p1/rptemplates/match_correct"/>
</assessmentItem>`;
}

function buildMatchingItem(q) {
  const points = normalizePoints(q.points);
  const leftChoices = q.subquestions.map((sq, idx) => ({ id: `L${idx + 1}`, text: sq.premise }));
  const rightChoices = q.subquestions.map((sq, idx) => ({ id: `R${idx + 1}`, text: sq.answer }));

  const correctPairs = q.subquestions
    .map((sq, idx) => `<value>${`L${idx + 1}`} ${`R${idx + 1}`}</value>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<assessmentItem xmlns="${QTI_NAMESPACE}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="${QTI_SCHEMA}" identifier="${escapeAttr(q.id)}" title="${escapeAttr(
    q.name
  )}" adaptive="false" timeDependent="false">
  <responseDeclaration identifier="RESPONSE" cardinality="multiple" baseType="directedPair">
    <correctResponse>
      ${correctPairs}
    </correctResponse>
  </responseDeclaration>
  <outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float" normalMaximum="${points}">
    <defaultValue><value>0</value></defaultValue>
  </outcomeDeclaration>
  <itemBody>
    ${wrapParagraph(q.question || '')}
    <matchInteraction responseIdentifier="RESPONSE" shuffle="true" maxAssociations="${leftChoices.length}">
      <simpleMatchSet>
        ${leftChoices
          .map(
            (choice) => `        <simpleAssociableChoice identifier="${choice.id}" matchMax="1">${cdata(
              choice.text || ''
            )}</simpleAssociableChoice>`
          )
          .join('\n')}
      </simpleMatchSet>
      <simpleMatchSet>
        ${rightChoices
          .map(
            (choice) => `        <simpleAssociableChoice identifier="${choice.id}" matchMax="1">${cdata(
              choice.text || ''
            )}</simpleAssociableChoice>`
          )
          .join('\n')}
      </simpleMatchSet>
    </matchInteraction>
  </itemBody>
  <responseProcessing template="http://www.imsglobal.org/question/qti_v2p1/rptemplates/match_correct"/>
</assessmentItem>`;
}

function buildItem(q) {
  switch (q.type) {
    case 'essay':
      return buildEssayItem(q);
    case 'multichoice':
      return buildChoiceItem(q);
    case 'truefalse':
      return buildChoiceItem({
        ...q,
        single: true,
        answers: [
          { text: 'Verdadero', fraction: q.correct ? 100 : 0 },
          { text: 'Falso', fraction: q.correct ? 0 : 100 },
        ],
      });
    case 'matching':
      return buildMatchingItem(q);
    case 'gapselect':
      logWarn(`Pregunta ${q.id} (gapselect) se exportará como ensayo para mantener compatibilidad QTI.`);
      return buildEssayItem(q);
    default:
      logWarn(`Tipo ${q.type} no soportado plenamente. Se exporta como ensayo.`);
      return buildEssayItem(q);
  }
}

function writeManifest(outDir, resources) {
  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest xmlns="${MANIFEST_NS}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  identifier="manifest-${Date.now()}" xsi:schemaLocation="${MANIFEST_SCHEMA}">
  <metadata>
    <schema>IMS Content</schema>
    <schemaversion>1.1.3</schemaversion>
  </metadata>
  <organizations/>
  <resources>
    <resource identifier="res-assessment" type="imsqti_test_xmlv2p1" href="assessment.xml">
      <file href="assessment.xml"/>
    </resource>
    ${resources
      .map(
        (res) => `    <resource identifier="${res.identifier}" type="imsqti_item_xmlv2p1" href="${res.href}">
      <file href="${res.href}"/>
    </resource>`
      )
      .join('\n')}
  </resources>
</manifest>`;
  fs.writeFileSync(path.join(outDir, 'imsmanifest.xml'), manifest, 'utf8');
}

// Regla 4 (BLACKBOARD-QTI-RULES.md): `assessment.xml` es el wrapper
// assessmentTest que lista todos los items via <assessmentItemRef>.
// Sin este fichero (y su entrada en el manifest) Blackboard no puede
// importar el paquete como un test completo.
function writeAssessment(outDir, questions) {
  const testId = sanitizeId(path.basename(outDir));
  const testTitle = 'Assessment generado desde banco YAML';

  const itemsXml = questions
    .map(
      (q) =>
        `      <assessmentItemRef identifier="${escapeAttr(q.id)}" href="items/${sanitizeId(q.id)}.xml"/>`
    )
    .join('\n');

  const assessment = `<?xml version="1.0" encoding="UTF-8"?>
<assessmentTest xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p1 http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd" identifier="${testId}" title="${escapeAttr(
    testTitle
  )}">
  <outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float"/>
  <testPart identifier="testPart-1" navigationMode="linear" submissionMode="individual">
    <assessmentSection identifier="section-1" title="${escapeAttr(testTitle)}" visible="true">
${itemsXml}
    </assessmentSection>
  </testPart>
</assessmentTest>`;

  fs.writeFileSync(path.join(outDir, 'assessment.xml'), assessment, 'utf8');
}

function exportQti(inputPath, outDir) {
  console.log(`Leyendo YAML: ${inputPath}`);
  const exam = yaml.load(fs.readFileSync(inputPath, 'utf8'));

  if (!exam || !exam.questions) {
    throw new Error('El banco YAML no contiene preguntas.');
  }

  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  ensureDir(outDir);
  const itemsDir = path.join(outDir, 'items');
  ensureDir(itemsDir);

  const resources = [];
  const questions = Array.isArray(exam.questions) ? exam.questions : [];

  for (const question of questions) {
    const itemXml = buildItem(question);
    const fileName = `${sanitizeId(question.id)}.xml`;
    const filePath = path.join(itemsDir, fileName);
    fs.writeFileSync(filePath, itemXml, 'utf8');
    resources.push({ identifier: `res-${sanitizeId(question.id)}`, href: `items/${fileName}` });
  }

  writeManifest(outDir, resources);
  writeAssessment(outDir, questions);

  fs.writeFileSync(
    path.join(outDir, 'README.txt'),
    `Paquete generado a partir de ${path.basename(inputPath)} (${new Date().toISOString()}).\n` +
      'Comprima este directorio (zip) antes de importarlo en Blackboard Ultra o cualquier LMS compatible con IMS QTI 2.1.\n'
  );

  const outDirBase = path.basename(outDir);
  const zipName = `${outDirBase}.zip`;

  console.log(`\n✅ Exportación completada: ${outDir}`);
  console.log(`   Items generados: ${resources.length}`);
  // Regla 6 (BLACKBOARD-QTI-RULES.md): imsmanifest.xml debe estar en la RAÍZ
  // del ZIP. Usar siempre el comando de abajo; nunca zip -r nombre.zip directorio/
  console.log(`\n📦 Para generar el ZIP listo para Blackboard:`);
  console.log(`   cd ${outDirBase} && zip -r ../${zipName} . && cd ..`);
  console.log(`\n🔍 Para verificar estructura del ZIP:`);
  console.log(`   unzip -l ${zipName} | head -8`);
  console.log(`   (imsmanifest.xml debe aparecer en la raíz, sin subdirectorio)\n`);
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
  exportQti(inputPath, outDir);
} catch (error) {
  console.error('❌ Error generando QTI:', error.message);
  process.exit(1);
}
