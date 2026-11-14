#!/usr/bin/env node
// Validate docs/_data/rive_3d_provenance.yml for the X5/X8 gates.
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repo = resolve(web, '..');
const path = resolve(web, 'docs/_data/rive_3d_provenance.yml');
const args = new Set(process.argv.slice(2));
const allowPending = args.has('--allow-pending');
const requireMerged = args.has('--require-merged');
const resolveRemote = args.has('--resolve-remote');

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
	if (resolveRemote) {
		const mb = spawnSync('git', ['-C', repo, 'merge-base', '--is-ancestor', data.merge_sha, 'origin/main'], {
			encoding: 'utf8',
		});
		if (mb.status !== 0) fail(`merge_sha ${data.merge_sha} is not an ancestor of origin/main`);
	}
}

console.log(`PASS provenance: ${data.events.length} events (${data.events.filter((e) => e.pending).length} pending)`);
process.exit(0);
