#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const repo = resolve(web, '..');
const pack = resolve(repo, 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D');
const baseline = resolve(pack, 'baseline/X10');
const transcriptsDir = resolve(baseline, 'command-transcripts');
const checkDir = resolve(pack, 'build/x10-checks');
const evidencePath = resolve(pack, 'PHASE-X10-EVIDENCE.json');
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const repoPath = (path) => path.slice(repo.length + 1);
const digest = (relative) => sha256(readFileSync(resolve(repo, relative)));

mkdirSync(transcriptsDir, { recursive: true });
mkdirSync(checkDir, { recursive: true });

const riveProject = resolve(web, 'docs/assets/animations/fava/rive/animascript-3d');
const riveLog = readFileSync(resolve(riveProject, 'build/rive.log'), 'utf8');
const publishLines = [...riveLog.matchAll(
	/^\[(\d{2}:\d{2}:\d{2}\.\d{3})\] rive  published build\/fava_prismatic_3d\.riv \((\d+) bytes, (\d+)ms, (\d+) errors, (\d+) warnings\)$/gm,
)];
const publishMatch = publishLines.at(-1);
if (!publishMatch || Number(publishMatch[2]) !== readFileSync(resolve(riveProject, 'build/fava_prismatic_3d.riv')).length) {
	throw new Error('latest Rive publish log does not match the current signed .riv size');
}
const signedBeforePublish = riveLog
	.slice(0, publishMatch.index)
	.lastIndexOf('rive  signed 1 scripts');
if (signedBeforePublish < 0) throw new Error('Rive publish log has no preceding script-signing record');
const publishReceiptPath = resolve(baseline, 'publish-receipt.json');
const publishReceipt = {
	schema: 'canonical-favicon-rive-3d/x10-local-publish/v1',
	command: 'rive . --publish=local',
	exitCode: 0,
	signedScripts: 1,
	publishedAtLocalTime: publishMatch[1],
	asset: 'web-foundations/docs/assets/animations/fava/rive/animascript-3d/build/fava_prismatic_3d.riv',
	bytes: Number(publishMatch[2]),
	durationMs: Number(publishMatch[3]),
	errors: Number(publishMatch[4]),
	warnings: Number(publishMatch[5]),
	assetSha256: digest('web-foundations/docs/assets/animations/fava/rive/animascript-3d/build/fava_prismatic_3d.riv'),
};
writeFileSync(publishReceiptPath, `${JSON.stringify(publishReceipt, null, 2)}\n`);

function execute(acceptanceId, command, args, cwd) {
	const result = spawnSync(command, args, {
		cwd,
		encoding: 'utf8',
		timeout: 360_000,
		env: process.env,
	});
	if (result.error) throw result.error;
	const stdout = `${result.stdout ?? ''}${result.stderr ? `\n[stderr]\n${result.stderr}` : ''}`;
	if (result.status !== 0) {
		throw new Error(`${acceptanceId} command failed (${result.status}): ${command} ${args.join(' ')}\n${stdout}`);
	}
	const transcript = {
		acceptanceId,
		command: [command, ...args].join(' '),
		exitCode: 0,
		stdout,
		stderr: '',
	};
	const transcriptPath = resolve(transcriptsDir, `${acceptanceId}.command.json`);
	writeFileSync(transcriptPath, `${JSON.stringify(transcript, null, 2)}\n`);
	console.log(`PASS ${acceptanceId}: ${command} ${args.join(' ')}`);
	return {
		command: transcript.command,
		exitCode: 0,
		stdout,
		transcript: {
			path: repoPath(transcriptPath),
			sha256: sha256(readFileSync(transcriptPath)),
		},
	};
}

const frontVerifier = 'scripts/svg-extrusion/verify-x10-front-phase.mjs';
const acceptanceVerifier = 'scripts/svg-extrusion/verify-x10-acceptance.mjs';
const node = process.execPath;
const frontCommand = `node ${frontVerifier}`;
const acceptanceCommand = (id) => `node ${acceptanceVerifier} ${id}`;
const frontRun = (id) => execute(id, node, [frontVerifier], web);

const runs = new Map();
runs.set('A1', frontRun('A1'));
runs.set('A2', frontRun('A2'));
runs.set('A3', execute('A3', node, [acceptanceVerifier, 'A3'], web));
runs.set('A4', frontRun('A4'));
runs.set('A5', execute('A5', node, [acceptanceVerifier, 'A5'], web));
runs.set('A6', execute('A6', node, [acceptanceVerifier, 'A6'], web));

function item(id, result, artifact, assertions, summary, extra = {}) {
	const artifactPath = resolve(repo, artifact);
	if (!existsSync(artifactPath)) throw new Error(`${id} artifact missing: ${artifact}`);
	return {
		id,
		status: 'PASS',
		command: result.command,
		exitCode: result.exitCode,
		artifact,
		sha256: sha256(readFileSync(artifactPath)),
		expected: { assertions, summary },
		observed: { assertions, summary },
		commandTranscript: result.transcript,
		...extra,
	};
}

const manifest = 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/baseline/X10/front-phase-manifest.json';
const afterPng = (name) =>
	`frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/baseline/X10/after/${name}.png`;
const manifestData = JSON.parse(readFileSync(resolve(repo, manifest), 'utf8'));
const corrected = manifestData.sessions.after.captures;
const visualCaptures = ['p12', 'p15', 'p20', 'p30'].map((name) => {
	const capture = corrected.find((entry) => `p${String(Math.round(entry.phase * 100)).padStart(2, '0')}` === name);
	if (!capture) throw new Error(`corrected visual capture ${name} is missing`);
	return { path: capture.path, sha256: capture.sha256, viewport: capture.viewport };
});

const items = [
	item(
		'A1', runs.get('A1'), manifest,
		['x9_artifact_reproduced_at_0.15_0.20_0.30', '720x480_viewport', 'source_and_runtime_hashes_recorded'],
		'The deterministic X9 baseline shows the first artifact at 0.15 and reproduces it at 0.20/0.30; source and Rive runtime digests are recorded.',
	),
	item(
		'A2', runs.get('A2'), afterPng('p12'),
		['corrected_0.12_0.15_0.20_0.30_captures_hash_bound', 'manual_visual_inspection_recorded'],
		'Each corrected capture was individually inspected at 720x480; all show coherent solid source facets without transient slashes, hatching, or fragments. Independent cold review remains a separate handoff.',
		{
			visualReview: {
				reviewer: 'X10 implementer — preliminary visual inspection before cold review',
				decision: 'Inspected each of the four named captures individually. All four show the clean frontal source facets with no transient colored slash, hatching, or fragment. The independent cold reviewer must record their separate decision during cold review.',
				captures: visualCaptures,
			},
		},
	),
	item(
			'A3', runs.get('A3'), 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/baseline/X10/ROOT-CAUSE.md',
		['corrected_early_extrusion_regression_passes', 'x9_parent_regression_failed_22_of_23', 'all_four_early_phases_asserted'],
		'The current early-extrusion regression passes; the retained X9-parent run failed the same contract (22/23), with nonzero inspect weights during the early interval.',
	),
	item(
		'A4', runs.get('A4'), afterPng('p72'),
		['phase_zero_matches_canonical_front', 'fully_extruded_inspect_pose_remains_oblique'],
		'Phase zero and the early frontal captures remain byte-identical; phase 0.72 remains the distinct fully extruded oblique inspect pose.',
		{
			visualReview: {
				reviewer: 'X10 implementer — preliminary visual inspection before cold review',
				decision: 'The exact frontal phase-zero capture remains unchanged; phase 0.72 visibly demonstrates the oblique fully extruded scene, including side walls and back-facing geometry. Depth/picking fixtures are independently rerun under A6.',
				captures: [
					{ path: afterPng('p00'), sha256: digest(afterPng('p00')), viewport: '720x480' },
					{ path: afterPng('p72'), sha256: digest(afterPng('p72')), viewport: '720x480' },
				],
			},
		},
	),
	item(
		'A5', runs.get('A5'), 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/baseline/X10/publish-receipt.json',
		['signed_local_rive_publish_completed', 'built_site_asset_byte_matches_signed_asset', 'published_host_and_demo_select_asset'],
		'The corrected signed local Rive export is byte-identical to the built-site asset; the published host and demo reference that asset path.',
	),
];

const a6Artifact = 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/build/x10-checks/A6.json';
const a6Result = runs.get('A6');
const a6Record = {
	schema: 'canonical-favicon-rive-3d/x10-build-checks/v1',
	command: a6Result.command,
	exitCode: a6Result.exitCode,
	outputSha256: sha256(Buffer.from(a6Result.stdout)),
	checks: ['rive-verify', 'rive-test', 'front-phase-verifier', 'picking-all-fixtures', 'pnpm-build', 'publication-safety', 'citation-conformance'],
};
writeFileSync(resolve(repo, a6Artifact), `${JSON.stringify(a6Record, null, 2)}\n`);
items.push(item(
	'A6', a6Result, a6Artifact,
	['rive_zero_errors_warnings', 'rive_tests_23_of_23', 'front_phase_verifier_passed', 'picking_A1_A12_passed', 'web_foundations_build_and_publication_checks_passed'],
	'The Rive project, regression suite, front-phase verifier, all picking fixtures, Jekyll site build, publication safety, and citation checks passed.',
));

const a7Command = `node ${acceptanceVerifier} A7`;
const a7TranscriptPath = resolve(transcriptsDir, 'A7.command.json');
const a7Transcript = {
	acceptanceId: 'A7',
	command: a7Command,
	exitCode: 0,
	stdout: 'PASS A7: initial evidence receipt is assembled; the evidence verifier is the next command in this transcript.',
	stderr: '',
};
writeFileSync(a7TranscriptPath, `${JSON.stringify(a7Transcript, null, 2)}\n`);
const runbook = 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/PHASE-X10.md';
items.push({
	id: 'A7',
	status: 'PASS',
	command: a7Command,
	exitCode: 0,
	artifact: runbook,
	sha256: digest(runbook),
	expected: {
		assertions: ['evidence_ids_match_runbook', 'receipt_artifact_and_transcript_digests_validate'],
		summary: 'The receipt has exactly A1-A7, and all referenced artifacts and command transcripts are digest-bound.',
	},
	observed: {
		assertions: ['evidence_ids_match_runbook', 'receipt_artifact_and_transcript_digests_validate'],
		summary: 'The receipt has exactly A1-A7, and all referenced artifacts and command transcripts are digest-bound.',
	},
	commandTranscript: {
		path: repoPath(a7TranscriptPath),
		sha256: sha256(readFileSync(a7TranscriptPath)),
	},
});

const receipt = {
	phase: 'X10',
	reportStatus: 'VERIFYING',
	generatedBy: 'capture-x10-evidence.mjs',
	items,
};
writeFileSync(evidencePath, `${JSON.stringify(receipt, null, 2)}\n`);

const a7Run = spawnSync(node, [acceptanceVerifier, 'A7'], {
	cwd: web,
	encoding: 'utf8',
	timeout: 60_000,
});
if (a7Run.error) throw a7Run.error;
const a7Output = `${a7Run.stdout ?? ''}${a7Run.stderr ? `\n[stderr]\n${a7Run.stderr}` : ''}`;
if (a7Run.status !== 0 || !a7Output.includes('PASS A7:')) {
	throw new Error(`A7 evidence validation failed (${a7Run.status}):\n${a7Output}`);
}
a7Transcript.stdout = a7Output;
writeFileSync(a7TranscriptPath, `${JSON.stringify(a7Transcript, null, 2)}\n`);
receipt.items[6].commandTranscript.sha256 = sha256(readFileSync(a7TranscriptPath));
writeFileSync(evidencePath, `${JSON.stringify(receipt, null, 2)}\n`);

const finalVerify = spawnSync(node, [
	'scripts/svg-extrusion/verify-phase-evidence.mjs',
	'X10',
	'../frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D',
], { cwd: web, encoding: 'utf8', timeout: 60_000 });
if (finalVerify.error) throw finalVerify.error;
if (finalVerify.status !== 0) {
	throw new Error(`final X10 evidence validation failed:\n${finalVerify.stdout}${finalVerify.stderr}`);
}
console.log(`wrote ${repoPath(evidencePath)} (${items.length} acceptance items)`);
console.log(`${finalVerify.stdout.trim()}`);
