#!/usr/bin/env node
// Validate docs/_data/rive_3d_provenance.yml for the X5/X8 gates.
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repo = resolve(web, '..');
const path = resolve(web, 'docs/_data/rive_3d_provenance.yml');
const allowlistPath = resolve(web, 'scripts/rive-3d-provenance-pr-b-allowlist.txt');
const args = new Set(process.argv.slice(2));
const allowPending = args.has('--allow-pending');
const requireMerged = args.has('--require-merged');
const resolveRemote = args.has('--resolve-remote');
const checkDiffAllowlist = args.has('--check-diff-allowlist');

function fail(msg) {
	console.error(`FAIL: ${msg}`);
	process.exit(1);
}

function strip(s) {
	s = String(s ?? '').trim();
	if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) return s.slice(1, -1);
	return s;
}

function parseReceipt(text) {
	const root = { events: [] };
	let cur = null;
	let inEvents = false;
	let inPr = false;
	for (const raw of text.split(/\r?\n/)) {
		if (/^\s*#/.test(raw) || !raw.trim()) continue;
		const indent = (raw.match(/^(\s*)/) || ['', ''])[1].length;
		const m = raw.match(/^(\s*)([A-Za-z0-9_]+):\s*(.*)$/);
		const listId = raw.match(/^\s*-\s+id:\s*(.+)$/);
		if (indent === 0 && m) {
			inEvents = m[2] === 'events';
			inPr = m[2] === 'pr_a';
			if (m[2] === 'events') continue;
			if (m[2] === 'pr_a') {
				root.pr_a = {};
				continue;
			}
			root[m[2]] = strip(m[3]);
			cur = null;
			continue;
		}
		if (inPr && indent === 2 && m) {
			root.pr_a[m[2]] = strip(m[3]);
			continue;
		}
		if (inEvents && listId) {
			cur = { id: strip(listId[1]) };
			root.events.push(cur);
			continue;
		}
		if (cur && indent >= 4 && m) {
			let v = strip(m[3]);
			if (v === 'true') v = true;
			else if (v === 'false') v = false;
			cur[m[2]] = v;
		}
	}
	return root;
}

function loadAllowlist(filePath) {
	if (!existsSync(filePath)) fail(`missing allowlist ${filePath}`);
	return readFileSync(filePath, 'utf8')
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter((line) => line && !line.startsWith('#'));
}

function pathAllowed(relPath, patterns) {
	for (const pattern of patterns) {
		if (pattern.endsWith('/**')) {
			const prefix = pattern.slice(0, -3);
			if (relPath === prefix || relPath.startsWith(prefix + '/')) return true;
			continue;
		}
		if (relPath === pattern) return true;
	}
	return false;
}

function checkBranchDiffAllowlist() {
	const patterns = loadAllowlist(allowlistPath);
	const fetch = spawnSync('git', ['-C', repo, 'fetch', 'origin', 'main'], { encoding: 'utf8' });
	if (fetch.status !== 0) fail(`git fetch origin main failed: ${fetch.stderr || fetch.stdout}`);
	const mb = spawnSync('git', ['-C', repo, 'merge-base', 'HEAD', 'origin/main'], { encoding: 'utf8' });
	if (mb.status !== 0) fail(`merge-base HEAD origin/main failed: ${mb.stderr || mb.stdout}`);
	const base = mb.stdout.trim();
	const diff = spawnSync('git', ['-C', repo, 'diff', '--name-only', `${base}...HEAD`], { encoding: 'utf8' });
	if (diff.status !== 0) fail(`git diff ${base}...HEAD failed: ${diff.stderr || diff.stdout}`);
	const files = diff.stdout
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean);
	const offenders = files.filter((f) => !pathAllowed(f, patterns));
	if (offenders.length) {
		fail(
			`diff vs ${base} contains non-allowlisted paths:\n${offenders.map((f) => `  - ${f}`).join('\n')}`
		);
	}
	console.log(`PASS diff-allowlist: ${files.length} path(s) vs ${base.slice(0, 12)}…`);
}

if (!existsSync(path)) fail(`missing ${path}`);
const data = parseReceipt(readFileSync(path, 'utf8'));
if (!Array.isArray(data.events) || data.events.length === 0) fail('events must be a non-empty array');

const secretRe = /(api[_-]?key|token|password|BEGIN (RSA |OPENSSH )?PRIVATE KEY)/i;
const unsafePathRe = /(\/Users\/|\/home\/|C:\\)/;

for (const [i, ev] of data.events.entries()) {
	const label = `events[${i}]/${ev.id ?? '?'}`;
	for (const f of ['id', 'url', 'immutable_id', 'actor_role', 'timestamp', 'label', 'source_digest']) {
		if (!(f in ev)) fail(`${label}: missing ${f}`);
	}
	if (typeof ev.pending !== 'boolean') fail(`${label}: pending must be boolean`);
	const blob = JSON.stringify(ev);
	if (secretRe.test(blob)) fail(`${label}: looks like a secret`);
	if (!ev.pending && unsafePathRe.test(blob)) fail(`${label}: unsafe absolute path in non-pending event`);
	if (ev.pending) {
		if (!allowPending && !requireMerged) fail(`${label}: pending event but --allow-pending not set`);
		if (!ev.pending_reason || !String(ev.pending_reason).trim()) fail(`${label}: pending_reason required`);
		continue;
	}
	if (String(ev.immutable_id) === 'pending' || String(ev.url) === 'pending') {
		fail(`${label}: non-pending event still says pending`);
	}
	if (/^[0-9a-f]{40}$/.test(String(ev.immutable_id))) {
		const show = spawnSync('git', ['-C', repo, 'cat-file', '-t', ev.immutable_id], { encoding: 'utf8' });
		if (show.status !== 0 || !String(show.stdout).includes('commit')) {
			fail(`${label}: git object ${ev.immutable_id} is not a commit in this repo`);
		}
	}
}

if (requireMerged) {
	if (!data.merge_sha || data.merge_sha === 'pending') fail('merge_sha must be a real SHA when --require-merged');
	if (!data.pr_a || data.pr_a.number === 'pending' || data.pr_a.url === 'pending') {
		fail('pr_a.number/url must be real when --require-merged');
	}
	if (resolveRemote) {
		const mb = spawnSync('git', ['-C', repo, 'merge-base', '--is-ancestor', data.merge_sha, 'origin/main'], {
			encoding: 'utf8',
		});
		if (mb.status !== 0) fail(`merge_sha ${data.merge_sha} is not an ancestor of origin/main`);
		if (/^[0-9]+$/.test(String(data.pr_a.number))) {
			const pr = spawnSync(
				'gh',
				['pr', 'view', String(data.pr_a.number), '--json', 'number,url,state,mergeCommit,mergedAt'],
				{ cwd: repo, encoding: 'utf8' }
			);
			if (pr.status !== 0) fail(`gh pr view ${data.pr_a.number} failed: ${pr.stderr || pr.stdout}`);
			let meta;
			try {
				meta = JSON.parse(pr.stdout);
			} catch {
				fail(`gh pr view ${data.pr_a.number} returned non-JSON`);
			}
			if (meta.state !== 'MERGED') fail(`PR #${data.pr_a.number} state is ${meta.state}, expected MERGED`);
			const mergeOid = meta.mergeCommit?.oid;
			if (mergeOid && mergeOid !== data.merge_sha) {
				fail(`merge_sha ${data.merge_sha} != PR mergeCommit ${mergeOid}`);
			}
		}
	}
}

if (checkDiffAllowlist) checkBranchDiffAllowlist();

console.log(`PASS provenance: ${data.events.length} events (${data.events.filter((e) => e.pending).length} pending)`);
process.exit(0);
