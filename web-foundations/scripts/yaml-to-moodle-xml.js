#!/usr/bin/env node
/**
 * YAML to Moodle XML Transformer
 * Convierte bancos YAML en XML compatible con Moodle.
 *
 * Uso:
 *   node yaml-to-moodle-xml.js
 *   node yaml-to-moodle-xml.js --input=mi-banco.yml --output=mi-banco.xml
 *
 * Nota: Los archivos YAML deben estar en el directorio ../private/
 *
 * También puede ejecutarse directamente tras `chmod +x yaml-to-moodle-xml.js`.
 *
 * Requiere:
 *   - Banco YAML con metadatos, categorías y preguntas.
 *   - Soporta tipos: essay, multichoice, truefalse, matching, gapselect.
 *   - Esquema Moodle XML: https://docs.moodle.org/501/en/Moodle_XML_format
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DEFAULT_INPUT_FILE = 'exam-portfolio-self-assessment.yml';
const DEFAULT_OUTPUT_FILE = 'exam-portfolio-self-assessment-moodle.xml';

function parseArgs(argv = []) {
	return argv.reduce((acc, arg) => {
		if (arg.startsWith('--input=')) {
			acc.input = arg.split('=')[1];
		} else if (arg.startsWith('--output=')) {
			acc.output = arg.split('=')[1];
		}
		return acc;
	}, {});
}

/**
 * Escape HTML special characters for CDATA sections
 */
function escapeHtml(text) {
	if (!text) return '';
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/**
 * Wrap content in CDATA if it contains HTML
 */
function wrapContent(content, useHtml = true) {
	if (!content) return '<text></text>';
	const trimmed = content.trim();
	if (useHtml && (trimmed.includes('<') || trimmed.includes('&'))) {
		return `<text><![CDATA[${trimmed}]]></text>`;
	}
	return `<text>${escapeHtml(trimmed)}</text>`;
}

/**
 * Generate category question block
 */
function generateCategoryBlock(category, coursePrefix = '$course$/top') {
	const categoryPath = `${coursePrefix}/${category.name}`.replace(/&/g, '&amp;');
	return `
<!-- Category: ${category.name} -->
  <question type="category">
    <category>
      <text>${categoryPath}</text>
    </category>
    <info format="html">
      ${wrapContent(`<p>${category.description || ''}</p>`)}
    </info>
    <idnumber></idnumber>
  </question>
`;
}

/**
 * Generate essay question XML
 */
function generateEssayQuestion(q) {
	return `
<!-- question: ${q.id} -->
  <question type="essay">
    <name>
      <text>${escapeHtml(q.name)}</text>
    </name>
    <questiontext format="html">
      ${wrapContent(q.question)}
    </questiontext>
    <generalfeedback format="html">
      <text></text>
    </generalfeedback>
    <defaultgrade>${q.points || 1}.0000000</defaultgrade>
    <penalty>0.0000000</penalty>
    <hidden>0</hidden>
    <idnumber>${q.id}</idnumber>
    <responseformat>plain</responseformat>
    <responserequired>1</responserequired>
    <responsefieldlines>${q.response_lines || 10}</responsefieldlines>
    <attachments>0</attachments>
    <attachmentsrequired>0</attachmentsrequired>
    <graderinfo format="html">
      ${wrapContent(q.grader_info || '')}
    </graderinfo>
    <responsetemplate format="html">
      <text><![CDATA[<p>Write your answer here...</p>]]></text>
    </responsetemplate>
  </question>
`;
}

/**
 * Generate multiple choice question XML
 */
function generateMultichoiceQuestion(q) {
	const single = q.single !== false ? 'true' : 'false';
	let answersXml = '';

	for (const answer of q.answers) {
		answersXml += `
    <answer fraction="${answer.fraction}" format="html">
      ${wrapContent(answer.text)}
      <feedback format="html">
        ${wrapContent(answer.feedback || '')}
      </feedback>
    </answer>`;
	}

	return `
<!-- question: ${q.id} -->
  <question type="multichoice">
    <name>
      <text>${escapeHtml(q.name)}</text>
    </name>
    <questiontext format="html">
      ${wrapContent(q.question)}
    </questiontext>
    <generalfeedback format="html">
      <text></text>
    </generalfeedback>
    <defaultgrade>${q.points || 1}.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <idnumber>${q.id}</idnumber>
    <single>${single}</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
    <correctfeedback format="html">
      <text>Correct answer</text>
    </correctfeedback>
    <partiallycorrectfeedback format="html">
      <text>Partially correct answer.</text>
    </partiallycorrectfeedback>
    <incorrectfeedback format="html">
      <text>Incorrect answer.</text>
    </incorrectfeedback>
    <shownumcorrect/>${answersXml}
  </question>
`;
}

/**
 * Generate true/false question XML
 */
function generateTrueFalseQuestion(q) {
	const correctFraction = q.correct ? 100 : 0;
	const incorrectFraction = q.correct ? 0 : 100;

	return `
<!-- question: ${q.id} -->
  <question type="truefalse">
    <name>
      <text>${escapeHtml(q.name)}</text>
    </name>
    <questiontext format="html">
      ${wrapContent(q.question)}
    </questiontext>
    <generalfeedback format="html">
      <text></text>
    </generalfeedback>
    <defaultgrade>${q.points || 1}.0000000</defaultgrade>
    <penalty>1.0000000</penalty>
    <hidden>0</hidden>
    <idnumber>${q.id}</idnumber>
    <answer fraction="${correctFraction}" format="moodle_auto_format">
      <text>true</text>
      <feedback format="html">
        ${wrapContent(q.correct ? '' : q.feedback_true || '')}
      </feedback>
    </answer>
    <answer fraction="${incorrectFraction}" format="moodle_auto_format">
      <text>false</text>
      <feedback format="html">
        ${wrapContent(q.correct ? q.feedback_false || '' : '')}
      </feedback>
    </answer>
  </question>
`;
}

/**
 * Generate matching question XML
 */
function generateMatchingQuestion(q) {
	let subquestionsXml = '';

	for (const subq of q.subquestions) {
		subquestionsXml += `
    <subquestion format="html">
      ${wrapContent(`<p>${subq.premise}</p>`)}
      <answer>
        <text>${escapeHtml(subq.answer)}</text>
      </answer>
    </subquestion>`;
	}

	return `
<!-- question: ${q.id} -->
  <question type="matching">
    <name>
      <text>${escapeHtml(q.name)}</text>
    </name>
    <questiontext format="html">
      ${wrapContent(q.question)}
    </questiontext>
    <generalfeedback format="html">
      <text></text>
    </generalfeedback>
    <defaultgrade>${q.points || 1}.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <idnumber>${q.id}</idnumber>
    <shuffleanswers>true</shuffleanswers>
    <correctfeedback format="html">
      <text>Correct answer</text>
    </correctfeedback>
    <partiallycorrectfeedback format="html">
      <text>Partially correct answer.</text>
    </partiallycorrectfeedback>
    <incorrectfeedback format="html">
      <text>Incorrect answer.</text>
    </incorrectfeedback>
    <shownumcorrect/>${subquestionsXml}
  </question>
`;
}

/**
 * Generate gap select (select missing words) question XML
 */
function generateGapSelectQuestion(q) {
	let selectOptionsXml = '';

	// Build options from groups
	if (q.groups) {
		for (const groupDef of q.groups) {
			for (const option of groupDef.options) {
				selectOptionsXml += `
    <selectoption>
      <text>${escapeHtml(option)}</text>
      <group>${groupDef.group}</group>
    </selectoption>`;
			}
		}
	}

	return `
<!-- question: ${q.id} -->
  <question type="gapselect">
    <name>
      <text>${escapeHtml(q.name)}</text>
    </name>
    <questiontext format="html">
      ${wrapContent(q.question)}
    </questiontext>
    <generalfeedback format="html">
      <text></text>
    </generalfeedback>
    <defaultgrade>${q.points || 1}.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <idnumber>${q.id}</idnumber>
    <shuffleanswers>0</shuffleanswers>
    <correctfeedback format="html">
      <text>Correct answer</text>
    </correctfeedback>
    <partiallycorrectfeedback format="html">
      <text>Partially correct answer.</text>
    </partiallycorrectfeedback>
    <incorrectfeedback format="html">
      <text>Incorrect answer.</text>
    </incorrectfeedback>
    <shownumcorrect/>${selectOptionsXml}
  </question>
`;
}

/**
 * Generate question XML based on type
 */
function generateQuestion(q) {
	switch (q.type) {
		case 'essay':
			return generateEssayQuestion(q);
		case 'multichoice':
			return generateMultichoiceQuestion(q);
		case 'truefalse':
			return generateTrueFalseQuestion(q);
		case 'matching':
			return generateMatchingQuestion(q);
		case 'gapselect':
			return generateGapSelectQuestion(q);
		default:
			console.warn(`Unknown question type: ${q.type} for question ${q.id}`);
			return '';
	}
}

/**
 * Main transformation function
 */
function transformYamlToMoodleXml(inputPath, outputPath) {
	console.log(`Reading YAML from: ${inputPath}`);

	// Read and parse YAML
	const yamlContent = fs.readFileSync(inputPath, 'utf8');
	const exam = yaml.load(yamlContent);

	console.log(`Loaded exam: ${exam.metadata.title}`);
	console.log(`Categories: ${exam.categories.length}`);
	console.log(`Questions: ${exam.questions.length}`);

	// Group questions by category
	const questionsByCategory = {};
	for (const q of exam.questions) {
		if (!questionsByCategory[q.category]) {
			questionsByCategory[q.category] = [];
		}
		questionsByCategory[q.category].push(q);
	}

	// Build XML
	let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Moodle XML Quiz Export
  ${exam.metadata.title}
  Course: ${exam.metadata.course}
  Duration: ${exam.metadata.duration_minutes} minutes
  Total Points: ${exam.metadata.total_points}
  Generated: ${new Date().toISOString()}
  Author: ${exam.metadata.author}
-->
<quiz>
`;

	// Generate questions organized by category
	for (const category of exam.categories) {
		const categoryQuestions = questionsByCategory[category.id] || [];

		if (categoryQuestions.length > 0) {
			// Add category block
			xml += generateCategoryBlock(category);

			// Add questions in this category
			for (const q of categoryQuestions) {
				xml += generateQuestion(q);
			}
		}
	}

	xml += `
</quiz>`;

	// Write output
	fs.writeFileSync(outputPath, xml, 'utf8');
	console.log(`\nMoodle XML written to: ${outputPath}`);

	// Calculate statistics
	let totalPoints = 0;
	const typeCounts = {};
	for (const q of exam.questions) {
		totalPoints += q.points || 1;
		typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
	}

	console.log('\n=== Exam Statistics ===');
	console.log(`Total Questions: ${exam.questions.length}`);
	console.log(`Total Points: ${totalPoints}`);
	console.log('\nQuestion Types:');
	for (const [type, count] of Object.entries(typeCounts)) {
		console.log(`  ${type}: ${count}`);
	}

	return { success: true, questions: exam.questions.length, points: totalPoints };
}

// Run transformation
const scriptDir = __dirname;
const privateDir = path.join(scriptDir, '..', 'private');
const args = parseArgs(process.argv.slice(2));
const inputFile = args.input || DEFAULT_INPUT_FILE;
const outputFile = args.output || DEFAULT_OUTPUT_FILE;
const inputPath = path.join(privateDir, inputFile);
const outputPath = path.join(scriptDir, outputFile);

try {
	const result = transformYamlToMoodleXml(inputPath, outputPath);
	console.log('\n✅ Transformation completed successfully!');
	process.exit(0);
} catch (error) {
	console.error('\n❌ Transformation failed:', error.message);
	process.exit(1);
}
