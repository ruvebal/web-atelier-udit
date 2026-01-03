#!/usr/bin/env node
/**
 * YAML → QTI 2.1 Exporter
 * Genera un paquete IMS QTI 2.1 (ObjectBank + items + imsmanifest) a partir
 * de un banco de preguntas en YAML (mismo formato que usamos para Moodle).
 *
 * Uso:
 *   node yaml-to-qti.js \
 *     --input=../private/examen-portafolio-auto-evaluacion.yml \
 *     --outdir=../private/examen-portafolio-auto-evaluacion-qti \
 *     [--zip]
 *
 * Opciones:
 *   --input=<file>  Archivo YAML de entrada (relativo a ../private/)
 *   --outdir=<dir>  Directorio de salida (por defecto: <input-name>-qti)
 *   --zip           También crea un archivo ZIP del paquete QTI
 *
 * Nota: Los archivos YAML deben estar en el directorio ../private/
 *
 * El directorio de salida contendrá:
 *   outdir/
 *     imsmanifest.xml    (manifest con referencia a assessment + items)
 *     assessment.xml     (assessmentTest que referencia todos los items como pool)
 *     items/
 *       q001.xml, q002.xml, ...
 *     README.txt
 *
 * Si se usa --zip, también se generará:
 *   outdir.zip      (archivo ZIP listo para importar en LMS)
 *
 * El directorio raw siempre se mantiene para inspección/debugging.
 * El ZIP es opcional pero necesario para importar en Blackboard Ultra u otras
 * plataformas compatibles con IMS QTI 2.1.
 *
 * Estándares:
 *   - QTI 2.1: https://www.1edtech.org/standards/qti/index#QTI21
 *   - Blackboard: https://help.anthology.com/blackboard/instructor/en/assessments/questions/reuse-questions/question-banks.html
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const yaml = require('js-yaml');

// Official QTI 2.1 namespaces and schema locations per 1EdTech specification
// Reference: https://www.1edtech.org/standards/qti/index#QTI21
const QTI_NAMESPACE = 'http://www.imsglobal.org/xsd/imsqti_v2p1';
const QTI_SCHEMA = 'http://www.imsglobal.org/xsd/imsqti_v2p1 http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd';
const MANIFEST_NS = 'http://www.imsglobal.org/xsd/imscp_v1p1';
const MANIFEST_SCHEMA = 'http://www.imsglobal.org/xsd/imscp_v1p1 http://www.imsglobal.org/xsd/imscp_v1p1.xsd';

function parseArgs(argv = []) {
	return argv.reduce((acc, arg) => {
		if (arg.startsWith('--input=')) {
			acc.input = arg.split('=')[1];
		} else if (arg.startsWith('--outdir=')) {
			acc.outdir = arg.split('=')[1];
		} else if (arg === '--zip') {
			acc.zip = true;
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
	if (!questionHtml || !questionHtml.trim().length) {
		return '';
	}
	// Wrap in p tag if not already wrapped, or use div for complex HTML
	const trimmed = questionHtml.trim();
	if (trimmed.startsWith('<') && (trimmed.startsWith('<p') || trimmed.startsWith('<div'))) {
		return trimmed;
	}
	return `<p>${cdata(trimmed)}</p>`;
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
	const itemId = sanitizeId(q.id);
	return `<?xml version="1.0" encoding="UTF-8"?>
<assessmentItem xmlns="${QTI_NAMESPACE}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="${QTI_SCHEMA}" identifier="${escapeAttr(itemId)}" title="${escapeAttr(
		q.name
	)}" adaptive="false" timeDependent="false">
  <responseDeclaration identifier="RESPONSE" cardinality="single" baseType="string"/>
  <outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float" normalMaximum="${points}">
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
	const correctChoices = choices.filter((c) => c.correct);
	const correctValues = correctChoices.map((c) => `<value>${c.id}</value>`).join('');

	if (!correctValues || correctChoices.length === 0) {
		logWarn(`Pregunta ${q.id} no tiene respuestas correctas marcadas. Se marcará la primera como correcta.`);
		choices[0].correct = true;
		correctChoices.push(choices[0]);
	}

	// Use appropriate response processing template
	const rpTemplate = single
		? 'http://www.imsglobal.org/question/qti_v2p1/rptemplates/match_correct'
		: 'http://www.imsglobal.org/question/qti_v2p1/rptemplates/match_correct';

	const itemId = sanitizeId(q.id);
	return `<?xml version="1.0" encoding="UTF-8"?>
<assessmentItem xmlns="${QTI_NAMESPACE}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="${QTI_SCHEMA}" identifier="${escapeAttr(itemId)}" title="${escapeAttr(
		q.name
	)}" adaptive="false" timeDependent="false">
  <responseDeclaration identifier="RESPONSE" cardinality="${cardinality}" baseType="identifier">
    <correctResponse>
      ${correctChoices.map((c) => `<value>${c.id}</value>`).join('')}
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
  <responseProcessing template="${rpTemplate}"/>
</assessmentItem>`;
}

function buildMatchingItem(q) {
	const points = normalizePoints(q.points);
	const leftChoices = q.subquestions.map((sq, idx) => ({ id: `L${idx + 1}`, text: sq.premise }));
	const rightChoices = q.subquestions.map((sq, idx) => ({ id: `R${idx + 1}`, text: sq.answer }));

	const correctPairs = q.subquestions.map((sq, idx) => `      <value>L${idx + 1} R${idx + 1}</value>`).join('\n');

	const itemId = sanitizeId(q.id);
	return `<?xml version="1.0" encoding="UTF-8"?>
<assessmentItem xmlns="${QTI_NAMESPACE}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="${QTI_SCHEMA}" identifier="${escapeAttr(itemId)}" title="${escapeAttr(
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

/**
 * Builds an AssessmentTest XML file that contains all questions as a pool.
 * Blackboard imports QTI 2.1 packages as pools when they contain assessmentTest.
 * @param {Array} questions - Array of question objects from YAML
 * @param {Object} metadata - Metadata about the exam
 * @returns {string} AssessmentTest XML content
 */
function buildAssessmentTest(questions, metadata = {}) {
	const testId = sanitizeId(metadata.title || 'question-pool');
	const testTitle = metadata.title || 'Question Pool';

	// Create assessment sections with item references
	const itemRefs = questions
		.map((q) => {
			const itemId = sanitizeId(q.id);
			return `      <assessmentItemRef identifier="${itemId}" href="items/${itemId}.xml"/>`;
		})
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<assessmentTest xmlns="${QTI_NAMESPACE}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="${QTI_SCHEMA}" identifier="${escapeAttr(testId)}" title="${escapeAttr(testTitle)}">
  <outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float"/>
  <testPart identifier="testPart-1" navigationMode="linear" submissionMode="individual">
    <assessmentSection identifier="section-1" title="${escapeAttr(testTitle)}" visible="true">
${itemRefs}
    </assessmentSection>
  </testPart>
</assessmentTest>`;
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

function writeManifest(outDir, resources, metadata = {}, hasAssessmentTest = false) {
	const manifestId = `manifest-${Date.now()}`;
	// Structure for Blackboard Question Pool compatibility
	// Blackboard imports QTI 2.1 packages with assessmentTest as pools
	const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest xmlns="${MANIFEST_NS}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  identifier="${manifestId}" xsi:schemaLocation="${MANIFEST_SCHEMA}">
  <metadata>
    <schema>IMS Content</schema>
    <schemaversion>1.1.3</schemaversion>
  </metadata>
  <organizations/>
  <resources>
    ${
					hasAssessmentTest
						? `    <resource identifier="res-assessment" type="imsqti_test_xmlv2p1" href="assessment.xml">
      <file href="assessment.xml"/>
    </resource>
`
						: ''
				}${resources
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

/**
 * Creates a ZIP archive of the output directory.
 * Uses the system 'zip' command (available on macOS, Linux, and Windows with Git Bash/WSL).
 * IMPORTANT: Zips the CONTENTS of the directory, not the directory itself, so that
 * imsmanifest.xml is at the root of the ZIP (required by Blackboard).
 * @param {string} outDir - Directory to zip
 * @param {string} zipPath - Path for the output ZIP file
 */
function createZipArchive(outDir, zipPath) {
	try {
		// Change to the output directory and zip its contents (not the directory itself)
		// This ensures imsmanifest.xml is at the root of the ZIP
		execSync(`cd "${outDir}" && zip -r "${zipPath}" .`, {
			stdio: 'inherit',
			cwd: outDir,
		});
		console.log(`✅ Archivo ZIP creado: ${zipPath}`);
	} catch (error) {
		logWarn(
			`No se pudo crear el archivo ZIP automáticamente. Asegúrate de que el comando 'zip' esté disponible en tu sistema.`
		);
		logWarn(`Puedes crear el ZIP manualmente: cd "${outDir}" && zip -r "${path.basename(zipPath)}" .`);
	}
}

function exportQti(inputPath, outDir, createZip = false) {
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
	const metadata = {
		title: exam.metadata?.title || path.basename(inputPath, '.yml'),
	};

	// Build assessmentTest XML that references all items
	// Blackboard imports this as a Question Pool
	const assessmentTestXml = buildAssessmentTest(exam.questions, metadata);
	fs.writeFileSync(path.join(outDir, 'assessment.xml'), assessmentTestXml, 'utf8');

	for (const question of exam.questions) {
		const itemXml = buildItem(question);
		const fileName = `${sanitizeId(question.id)}.xml`;
		const filePath = path.join(itemsDir, fileName);
		fs.writeFileSync(filePath, itemXml, 'utf8');
		resources.push({
			identifier: `res-${sanitizeId(question.id)}`,
			href: `items/${fileName}`,
			title: question.name || question.id,
		});
	}

	writeManifest(outDir, resources, metadata, true);

	const readmeContent = `Paquete generado a partir de ${path.basename(inputPath)} (${new Date().toISOString()}).
Items generados: ${resources.length}

Este directorio contiene el paquete QTI 2.1 completo.
Para importarlo en Blackboard Ultra u otros LMS compatibles con IMS QTI 2.1:
  1. Comprime este directorio en un archivo ZIP
  2. Importa el archivo ZIP en tu LMS

Nota: Si usaste la opción --zip, ya se habrá generado un archivo ZIP automáticamente.
`;
	fs.writeFileSync(path.join(outDir, 'README.txt'), readmeContent);

	console.log(`✅ Exportación completada: ${outDir}`);
	console.log(`📦 Items generados: ${resources.length}`);

	// Create ZIP archive if requested
	if (createZip) {
		const zipPath = path.resolve(`${outDir}.zip`);
		// Remove existing zip if it exists
		if (fs.existsSync(zipPath)) {
			fs.unlinkSync(zipPath);
		}
		createZipArchive(outDir, zipPath);
	}
}

const args = parseArgs(process.argv.slice(2));
const scriptDir = __dirname;
const privateDir = path.join(scriptDir, '..', 'private');
const inputFile = args.input || 'exam-portfolio-self-assessment.yml';
const outDirName = args.outdir || `${path.basename(inputFile, '.yml')}-qti`;
const inputPath = path.join(privateDir, inputFile);
const outDir = path.join(scriptDir, outDirName);

try {
	exportQti(inputPath, outDir, args.zip);
} catch (error) {
	console.error('❌ Error generando QTI:', error.message);
	process.exit(1);
}
