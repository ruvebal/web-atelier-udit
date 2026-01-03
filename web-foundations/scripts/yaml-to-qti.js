#!/usr/bin/env node
/**
 * YAML → QTI 2.1 Exporter
 * Genera un paquete IMS QTI 2.1 (items independientes + imsmanifest) a partir
 * de un banco de preguntas en YAML (mismo formato que usamos para Moodle).
 *
 * Uso:
 *   node yaml-to-qti.js \
 *     --input=examen-portafolio-auto-evaluacion.yml \
 *     --outdir=examen-portafolio-auto-evaluacion-qti
 *
 * Nota: Los archivos YAML deben estar en el directorio ../private/
 *
 * El directorio de salida contendrá:
 *   outdir/
 *     imsmanifest.xml
 *     items/
 *       q001.xml, q002.xml, ...
 *
 * Después de ejecutar, comprime el directorio (zip) para importarlo en
 * Blackboard Ultra u otras plataformas compatibles con QTI 2.1.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const QTI_NAMESPACE = 'http://www.imsglobal.org/xsd/imsqtiasi_v2p1';
const QTI_SCHEMA =
	'http://www.imsglobal.org/xsd/imsqtiasi_v2p1 http://www.imsglobal.org/profile/cc/ccv1p3/imsqtiasi_v2p1.xsd';
const MANIFEST_NS = 'http://www.imsglobal.org/xsd/imscp_v1p1';
const MANIFEST_SCHEMA =
	'http://www.imsglobal.org/xsd/imscp_v1p1 http://www.imsglobal.org/profile/cc/ccv1p3/imscp_v1p2.xsd';

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

function wrapParagraph(questionHtml = '') {
	return questionHtml.trim().length ? `<div class="prompt">${cdata(questionHtml)}</div>` : '';
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
	const correctValues = choices
		.filter((c) => c.correct)
		.map((c) => `<value>${c.id}</value>`)
		.join('');

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
							.map((choice) => `      <simpleChoice identifier="${choice.id}">${cdata(choice.text || '')}</simpleChoice>`)
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

	const correctPairs = q.subquestions.map((sq, idx) => `<value>${`L${idx + 1}`} ${`R${idx + 1}`}</value>`).join('');

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
										(choice) =>
											`        <simpleAssociableChoice identifier="${choice.id}" matchMax="1">${cdata(
												choice.text || ''
											)}</simpleAssociableChoice>`
									)
									.join('\n')}
      </simpleMatchSet>
      <simpleMatchSet>
        ${rightChoices
									.map(
										(choice) =>
											`        <simpleAssociableChoice identifier="${choice.id}" matchMax="1">${cdata(
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
  <organizations/>
  <resources>
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

	for (const question of exam.questions) {
		const itemXml = buildItem(question);
		const fileName = `${sanitizeId(question.id)}.xml`;
		const filePath = path.join(itemsDir, fileName);
		fs.writeFileSync(filePath, itemXml, 'utf8');
		resources.push({ identifier: `res-${sanitizeId(question.id)}`, href: `items/${fileName}` });
	}

	writeManifest(outDir, resources);

	fs.writeFileSync(
		path.join(outDir, 'README.txt'),
		`Paquete generado a partir de ${path.basename(inputPath)} (${new Date().toISOString()}).\n` +
			'Comprima este directorio (zip) antes de importarlo en Blackboard Ultra o cualquier LMS compatible con IMS QTI 2.1.\n'
	);

	console.log(`Exportación completada: ${outDir}`);
	console.log(`Items generados: ${resources.length}`);
}

const args = parseArgs(process.argv.slice(2));
const scriptDir = __dirname;
const privateDir = path.join(scriptDir, '..', 'private');
const inputFile = args.input || 'exam-portfolio-self-assessment.yml';
const outDirName = args.outdir || `${path.basename(inputFile, '.yml')}-qti`;
const inputPath = path.join(privateDir, inputFile);
const outDir = path.join(scriptDir, outDirName);

try {
	exportQti(inputPath, outDir);
} catch (error) {
	console.error('❌ Error generando QTI:', error.message);
	process.exit(1);
}
