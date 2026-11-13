#!/usr/bin/env node
// X3 picking/interaction verifier. Mirrors choreo.as and pick.as in JS,
// plans expected-ID fixtures from the generated provider, drives the scene
// through `rive --commands` pointer/touch/advance/viewport sessions, and
// compares the logged x3pick events against independently computed picks.
//
// Usage: node verify-picking.mjs --all-fixtures   (gate)
//        node verify-picking.mjs A3               (single acceptance, evidence)
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const repo = resolve(web, '..');
const RIVE = resolve(web, 'docs/assets/animations/fava/rive/animascript-3d');
const GEN = resolve(RIVE, 'generated/favicon');
const BUILD = resolve(RIVE, 'build');
const OUT = resolve(BUILD, 'x3-checks');
mkdirSync(OUT, { recursive: true });

const geometry = JSON.parse(readFileSync(resolve(GEN, 'geometry.json'), 'utf8'));
const manifest = JSON.parse(readFileSync(resolve(GEN, 'manifest.json'), 'utf8'));
const IDX = geometry.indices;
const TRIS = IDX.length / 3;
const FACET_COUNT = manifest.facetCount;
const facetIdOf = manifest.facets.map((f) => f.id);

const vblob = readFileSync(resolve(RIVE, 'favicon-vertices.bin'));
const iblob = readFileSync(resolve(RIVE, 'favicon-indices.bin'));
const Vstride = 40;
const vpos = (v, c) => vblob.readFloatLE(v * Vstride + c * 4);
const vfacet = (v) => vblob.readFloatLE(v * Vstride + 36);
const vnz = (v) => vblob.readFloatLE(v * Vstride + 20);
const triFacet = new Int32Array(TRIS);
const triNz = new Float32Array(TRIS);
for (let t = 0; t < TRIS; t++) {
	triFacet[t] = vfacet(iblob.readUInt16LE(t * 6));
	triNz[t] = vnz(iblob.readUInt16LE(t * 6));
}
const facetTris = manifest.facets.map((_, fi) => {
	const out = [];
	for (let t = 0; t < TRIS; t++) if (triFacet[t] === fi) out.push(t);
	return out;
});
const facetVerts = manifest.facets.map((f) => f.mesh.vertexCount);

// ---------- choreo.as mirror ----------
const C = {
	LOOP_PERIOD: 9.0,
	FACET_STAGGER: 0.5,
	SEPARATION_DIST: 0.1,
	SELECT_OFFSET_Z: 0.08,
	EXTRUDE_START: 0.1,
	EXTRUDE_SPAN: 0.32,
	RETRACT_START: 0.72,
	RETRACT_SPAN: 0.25,
	SEP_RISE_START: 0.45,
	SEP_SPAN: 0.15,
	SEP_FALL_END: 0.93,
	DISCARD_E: 0.001,
	INSPECT_YAW: 2.2,
	INSPECT_PITCH: 0.45,
	CAMERA_DISTANCE: 3.0,
	FIT_MARGIN: 1.06,
	ORBIT_LAMBDA: 6.0,
	DRAG_DEADZONE: 3.0,
	MAX_USER_YAW: 1.2,
	MAX_USER_PITCH: 0.9,
};
const smoothstep = (x) => {
	const t = Math.min(1, Math.max(0, x));
	return t * t * (3 - 2 * t);
};
const loopPhase = (elapsed) => (elapsed / C.LOOP_PERIOD) % 1;
const facetExtrusion = (phase, facet, count) => {
	const n = Math.max(count, 1);
	const stagger = count > 1 ? (facet / (n - 1)) * C.FACET_STAGGER : 0;
	if (phase < C.EXTRUDE_START) return 0;
	if (phase < C.RETRACT_START) {
		const u = (phase - C.EXTRUDE_START) / C.EXTRUDE_SPAN;
		return smoothstep((u - stagger * 0.5) / (1 - C.FACET_STAGGER * 0.5));
	}
	if (phase < C.RETRACT_START + C.RETRACT_SPAN) {
		const v = (phase - C.RETRACT_START) / C.RETRACT_SPAN;
		const reverse = count > 1 ? ((n - 1 - facet) / (n - 1)) * C.FACET_STAGGER : 0;
		return 1 - smoothstep((v - reverse * 0.5) / (1 - C.FACET_STAGGER * 0.5));
	}
	return 0;
};
const separation = (phase) =>
	smoothstep((phase - C.SEP_RISE_START) / C.SEP_SPAN) * smoothstep((C.SEP_FALL_END - phase) / C.SEP_SPAN);
const inspectWeight = (phase) => smoothstep((phase - 0.12) / 0.25) * smoothstep((0.98 - phase) / 0.22);
const hashDir3 = (facet) => {
	let h = Math.imul(facet, 2654435761) >>> 0;
	h = (h ^ (h >>> 16)) >>> 0;
	h = Math.imul(h, 2246822519) >>> 0;
	h = (h ^ (h >>> 13)) >>> 0;
	const a = (h & 65535) / 65535;
	h = (Math.imul(h, 3266489917) + 1) >>> 0;
	h = (h ^ (h >>> 16)) >>> 0;
	const b = (h & 65535) / 65535;
	h = (Math.imul(h, 668265263) + 1) >>> 0;
	h = (h ^ (h >>> 15)) >>> 0;
	const c = (h & 65535) / 65535;
	const v = [a * 2 - 1, b * 2 - 1, c * 2 - 1];
	const l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
	return l < 1e-9 ? [1, 0, 0] : [v[0] / l, v[1] / l, v[2] / l];
};
// quaternions [x,y,z,w]
const qIdent = () => [0, 0, 0, 1];
const qMul = (a, b) => [
	a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
	a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
	a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
	a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2],
];
const qNorm = (q) => {
	const l = Math.sqrt(q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3]);
	return l < 1e-12 ? qIdent() : [q[0] / l, q[1] / l, q[2] / l, q[3] / l];
};
const qAxis = (x, y, z, angle) => {
	const l = Math.sqrt(x * x + y * y + z * z);
	if (l < 1e-12) return qIdent();
	const s = Math.sin(angle / 2) / l;
	return [x * s, y * s, z * s, Math.cos(angle / 2)];
};
const qYawPitch = (yaw, pitch) => qNorm(qMul(qAxis(0, 1, 0, yaw), qAxis(1, 0, 0, pitch)));
const qRot = (q, x, y, z) => {
	const [qx, qy, qz, qw] = q;
	const tx = 2 * (qy * z - qz * y);
	const ty = 2 * (qz * x - qx * z);
	const tz = 2 * (qx * y - qy * x);
	return [x + qw * tx + qy * tz - qz * ty, y + qw * ty + qz * tx - qx * tz, z + qw * tz + qx * ty - qy * tx];
};
const qSlerp = (a, b, t) => {
	let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	let bb = b;
	if (d < 0) {
		d = -d;
		bb = b.map((x) => -x);
	}
	if (d > 0.9995) return qNorm(a.map((x, i) => x + (bb[i] - x) * t));
	const th = Math.acos(Math.min(d, 1));
	const s = Math.sin(th);
	const wa = Math.sin((1 - t) * th) / s;
	const wb = Math.sin(t * th) / s;
	return a.map((x, i) => x * wa + bb[i] * wb);
};
const dampStep = (cur, target, dt, lambda) => cur + (target - cur) * (1 - Math.exp(-lambda * dt));

// ---------- camera (pick.as/choreo.as mirror) ----------
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => {
	const l = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
	return [a[0] / l, a[1] / l, a[2] / l];
};
const bounds = (() => {
	const b = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity, minZ: Infinity, maxZ: -Infinity };
	for (let v = 0; v < vblob.length / Vstride; v++) {
		for (const [k, c] of [
			['X', 0],
			['Y', 1],
			['Z', 2],
		]) {
			const val = vpos(v, c);
			b[`min${k}`] = Math.min(b[`min${k}`], val);
			b[`max${k}`] = Math.max(b[`max${k}`], val);
		}
	}
	return b;
})();
const CENTER = [(bounds.minX + bounds.maxX) / 2, (bounds.minY + bounds.maxY) / 2, (bounds.minZ + bounds.maxZ) / 2];

function computeCam(phase, elapsed, userYaw, userPitch, aspect) {
	const w = inspectWeight(phase);
	const qBase = qSlerp(qIdent(), qYawPitch(C.INSPECT_YAW, C.INSPECT_PITCH), w);
	const qUser = qYawPitch(userYaw, userPitch);
	const q = qNorm(qMul(qBase, qUser));
	const forward = qRot(q, 0, 0, -1);
	const upIn = qRot(q, 0, 1, 0);
	const right = norm(cross(forward, upIn));
	const up = cross(right, forward);
	const eye = CENTER.map((c, i) => c - forward[i] * C.CAMERA_DISTANCE);
	const view = (p) => {
		const d = sub(p, eye);
		return [dot(right, d), dot(up, d), -dot(forward, d)];
	};
	let maxVX = 0,
		maxVY = 0,
		minVZ = Infinity,
		maxVZ = -Infinity;
	for (const x of [bounds.minX, bounds.maxX])
		for (const y of [bounds.minY, bounds.maxY])
			for (const z of [bounds.minZ, bounds.maxZ]) {
				const v = view([x, y, z]);
				maxVX = Math.max(maxVX, Math.abs(v[0]));
				maxVY = Math.max(maxVY, Math.abs(v[1]));
				minVZ = Math.min(minVZ, v[2]);
				maxVZ = Math.max(maxVZ, v[2]);
			}
	const halfH = Math.max(maxVY, maxVX / aspect) * C.FIT_MARGIN;
	const nearMargin = C.SELECT_OFFSET_Z + C.SEPARATION_DIST + 0.02;
	const near = Math.max(-maxVZ - nearMargin, 0.01);
	const far = -minVZ + 0.05;
	return {
		phase,
		elapsed,
		sep: separation(phase),
		halfH,
		near,
		far,
		aspect,
		eye,
		right,
		up,
		forward,
		toward: forward.map((x) => -x),
		view,
	};
}

// ---------- picker (pick.as mirror) ----------
function animatedTri(t, frame, selWords, cache) {
	const facet = triFacet[t];
	if (!cache.e.has(facet)) cache.e.set(facet, facetExtrusion(frame.phase, facet, FACET_COUNT));
	const e = cache.e.get(facet);
	const sepBase = frame.sep * C.SEPARATION_DIST;
	const dir = cache.dir.has(facet) ? cache.dir.get(facet) : cache.dir.set(facet, hashDir3(facet)).get(facet);
	const selK = selWords[facet >> 5] & (1 << (facet & 31)) ? C.SELECT_OFFSET_Z : 0;
	const out = [];
	for (let k = 0; k < 3; k++) {
		const vi = iblob.readUInt16LE(t * 6 + k * 2);
		const x = vpos(vi, 0) + dir[0] * sepBase + frame.toward[0] * selK;
		const y = vpos(vi, 1) + dir[1] * sepBase + frame.toward[1] * selK;
		const z = vpos(vi, 2) * e + dir[2] * sepBase + frame.toward[2] * selK;
		out.push([x, y, z]);
	}
	return { facet, e, nz: triNz[t], verts: out };
}

function rayTri(ox, oy, oz, dx, dy, dz, a, b, c) {
	const e1 = sub(b, a),
		e2 = sub(c, a);
	const px = dy * e2[2] - dz * e2[1],
		py = dz * e2[0] - dx * e2[2],
		pz = dx * e2[1] - dy * e2[0];
	const det = dot(e1, [px, py, pz]);
	if (Math.abs(det) < 1e-12) return -1;
	const inv = 1 / det;
	const tv = sub([ox, oy, oz], a);
	const u = dot(tv, [px, py, pz]) * inv;
	if (u < -1e-9 || u > 1 + 1e-9) return -1;
	const q = cross(tv, e1);
	const v = dot([dx, dy, dz], q) * inv;
	if (v < -1e-9 || u + v > 1 + 1e-9) return -1;
	const t = dot(e2, q) * inv;
	return t > 1e-9 ? t : -1;
}

function pickJS(frame, selWords, px, py, cssW, cssH) {
	if (cssW <= 0 || cssH <= 0) return -1;
	const ndcX = (px / cssW) * 2 - 1;
	const ndcY = 1 - (py / cssH) * 2;
	const vx = ndcX * frame.halfH * frame.aspect;
	const vy = ndcY * frame.halfH;
	// view-space (vx,vy,-1) -> world = eye + vx*right + vy*up + forward
	const o = [
		frame.eye[0] + vx * frame.right[0] + vy * frame.up[0] + frame.forward[0],
		frame.eye[1] + vx * frame.right[1] + vy * frame.up[1] + frame.forward[1],
		frame.eye[2] + vx * frame.right[2] + vy * frame.up[2] + frame.forward[2],
	];
	const d = norm(frame.forward);
	const cache = { e: new Map(), dir: new Map() };
	let bestDepth = Infinity,
		bestFacet = -1,
		bestTri = -1;
	for (let t = 0; t < TRIS; t++) {
		const { facet, e, nz, verts: tv } = animatedTri(t, frame, selWords, cache);
		if (e < C.DISCARD_E && nz < 0.5) continue;
		const hit = rayTri(o[0], o[1], o[2], d[0], d[1], d[2], tv[0], tv[1], tv[2]);
		if (hit < 0) continue;
		const hp = [o[0] + d[0] * hit, o[1] + d[1] * hit, o[2] + d[2] * hit];
		const pz = frame.view(hp)[2];
		if (pz > -frame.near + 0.001 || pz < -frame.far - 0.001) continue;
		const depth = Math.fround((-pz - frame.near) / (frame.far - frame.near));
		const tie = depth === bestDepth;
		const orderBetter = facet > bestFacet || (facet === bestFacet && t > bestTri);
		if (bestFacet < 0 || depth < bestDepth || (tie && orderBetter)) {
			bestDepth = depth;
			bestFacet = facet;
			bestTri = t;
		}
	}
	return bestFacet;
}

// Project an animated model point to layout pixels.
function projectPoint(frame, p, cssW, cssH) {
	const v = frame.view(p);
	const ndcX = v[0] / (frame.halfH * frame.aspect);
	const ndcY = v[1] / frame.halfH;
	return [((ndcX + 1) / 2) * cssW, ((1 - ndcY) / 2) * cssH];
}

// ---------- fixture planning ----------
const ZERO8 = new Uint32Array(8);
const selWordsFor = (selSet) => {
	const w = new Uint32Array(8);
	for (const f of selSet) w[f >> 5] |= 1 << (f & 31);
	return w;
};

// Animated position of a raw vertex (no selection).
function aPos(frame, vi, facet, selSet) {
	const e = facetExtrusion(frame.phase, facet, FACET_COUNT);
	const sepBase = frame.sep * C.SEPARATION_DIST;
	const dir = hashDir3(facet);
	const selK = selSet.has(facet) ? C.SELECT_OFFSET_Z : 0;
	return [
		vpos(vi, 0) + dir[0] * sepBase + frame.toward[0] * selK,
		vpos(vi, 1) + dir[1] * sepBase + frame.toward[1] * selK,
		vpos(vi, 2) * e + dir[2] * sepBase + frame.toward[2] * selK,
	];
}

function triCentroidScreen(frame, t, cssW, cssH, selSet = new Set()) {
	const facet = triFacet[t];
	const pts = [0, 1, 2].map((k) => aPos(frame, iblob.readUInt16LE(t * 6 + k * 2), facet, selSet));
	const c = [0, 1, 2].map((i) => (pts[0][i] + pts[1][i] + pts[2][i]) / 3);
	return { p: projectPoint(frame, c, cssW, cssH), facet };
}

// point-in-triangle2D on screen coords (sign test, tolerant of winding)
function pointInTri(px, py, tri) {
	const [a, b, c] = tri;
	const cross2 = (o, p, q) => (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]);
	const d1 = cross2(a, b, [px, py]);
	const d2 = cross2(b, c, [px, py]);
	const d3 = cross2(c, a, [px, py]);
	const eps = -1e-6;
	return (d1 >= eps && d2 >= eps && d3 >= eps) || (d1 <= -eps && d2 <= -eps && d3 <= -eps);
}

// Build per-facet candidate screen points at a phase/aspect/viewport.
function facetCandidates(phase, aspect, cssW, cssH, selSet = new Set(), wantTriClass = 0, maxPerFacet = 4) {
	const frame = computeCam(phase, phase * C.LOOP_PERIOD, 0, 0, aspect);
	const out = new Map(); // facet -> [{x,y,tri}]
	for (let fi = 0; fi < FACET_COUNT; fi++) {
		const list = [];
		const tris = facetTris[fi];
		const step = Math.max(1, Math.floor(tris.length / (maxPerFacet * 4)));
		for (let k = 0; k < tris.length && list.length < maxPerFacet; k += step) {
			const t = tris[k];
			const cls = triNz[t] > 0.5 ? 0 : triNz[t] < -0.5 ? 1 : 2;
			if (wantTriClass >= 0 && cls !== wantTriClass) continue;
			const { p } = triCentroidScreen(frame, t, cssW, cssH, selSet);
			if (p[0] < 0 || p[0] > cssW || p[1] < 0 || p[1] > cssH) continue;
			const key = `${Math.round(p[0])},${Math.round(p[1])}`;
			if (list.some((q) => q.key === key)) continue;
			list.push({ x: Math.round(p[0]), y: Math.round(p[1]), key, tri: t });
		}
		if (list.length) out.set(fi, list);
	}
	return { frame, candidates: out };
}

// Screen-space front-tri list for a frame, cached per pose/dims/selection.
const frontTriCache = new Map();
function frontTrisScreen(frame, cssW, cssH, selSet = new Set()) {
	const key = `${frame.phase}|${cssW}x${cssH}|${selSet.size ? [...selSet].sort((a, b) => a - b).join(',') : ''}`;
	if (frontTriCache.has(key)) return frontTriCache.get(key);
	const out = [];
	for (let t = 0; t < TRIS; t++) {
		if (triNz[t] <= 0.5) continue;
		const facet = triFacet[t];
		const pts = [0, 1, 2].map((k) => {
			const vi = iblob.readUInt16LE(t * 6 + k * 2);
			return projectPoint(frame, aPos(frame, vi, facet, selSet), cssW, cssH);
		});
		out.push({ facet, pts });
	}
	frontTriCache.set(key, out);
	return out;
}

// facets covering a screen point among front tris (projected, this phase)
function coveringFacets(frame, px, py, cssW, cssH, selSet = new Set()) {
	const cover = new Set();
	for (const tri of frontTrisScreen(frame, cssW, cssH, selSet)) {
		if (cover.has(tri.facet)) continue;
		if (pointInTri(px, py, tri.pts)) cover.add(tri.facet);
	}
	return [...cover].sort((a, b) => a - b);
}

const results = {};
const record = (id, ok, detail) => {
	results[id] = { ok, detail };
	console.log(`${ok ? 'PASS' : 'FAIL'} ${id}: ${detail}`);
};

// ---------- rive --commands driver ----------
// console/x3pick lines go to stderr; merge both streams.
// ImageMagick compare writes the AE metric to stderr.
function aeDiff(a, b) {
	const r = spawnSync('magick', ['compare', '-metric', 'AE', a, b, 'null:'], { encoding: 'utf8' });
	const text = `${r.stderr ?? ''}${r.stdout ?? ''}`.trim();
	const n = parseInt(text, 10);
	return Number.isFinite(n) ? n : NaN;
}

function runRive(lines) {
	const script = [...lines, 'quit'].join('\n') + '\n';
	const r = spawnSync('rive', ['.', '--commands'], {
		cwd: RIVE,
		input: script,
		encoding: 'utf8',
		maxBuffer: 64 * 1024 * 1024,
	});
	if (r.error) throw r.error;
	return `${r.stdout ?? ''}\n${r.stderr ?? ''}`;
}

function runCommands(lines) {
	const out = runRive(lines);
	const picks = [];
	for (const m of out.matchAll(/x3pick facet=(\d+) selected=(\d+) count=(\d+)/g)) {
		picks.push({ facet: +m[1], selected: +m[2], count: +m[3] });
	}
	const resets = (out.match(/x3pick reset/g) || []).length;
	const errs = [...out.matchAll(/^err .*$/gm)].map((m) => m[0]);
	return { picks, resets, errs, raw: out };
}
// Simulate the scene-side selection bookkeeping for expected values.
function expectSequence(events, phase, aspect, cssW, cssH, selSim) {
	// events: [{kind:'click',x,y}|{kind:'touch',x,y}|{kind:'reset'}]
	const frame = computeCam(phase, phase * C.LOOP_PERIOD, 0, 0, aspect);
	const expected = [];
	const selSet = selSim ?? new Set();
	for (const ev of events) {
		const f = pickJS(frame, selWordsFor(selSet), ev.x, ev.y, cssW, cssH);
		if (f < 0) {
			selSet.clear();
			expected.push({ facet: -1, count: 0 });
		} else {
			const was = selSet.has(f);
			if (was) selSet.delete(f);
			else selSet.add(f);
			expected.push({ facet: f, selected: was ? 0 : 1, count: selSet.size });
		}
	}
	return { expected, selSet };
}

// ================= checks =================
function checkA1() {
	// small / overlapping / large facet selection by expected ID at rest.
	const phase = 0,
		aspect = 720 / 480,
		cssW = 720,
		cssH = 480;
	const { candidates } = facetCandidates(phase, aspect, cssW, cssH, new Set(), 0, 6);
	// size ranking by vertex count
	const order = [...Array(FACET_COUNT).keys()].sort((a, b) => facetVerts[a] - facetVerts[b]);
	const small = order[0],
		large = order[order.length - 1];
	// overlap: find a rest point covered by >=2 facets where pick returns the later
	const frame0 = computeCam(phase, 0, 0, 0, aspect);
	let overlap = null;
	outer: for (const [fi, pts] of candidates) {
		for (const pt of pts) {
			const cover = coveringFacets(frame0, pt.x, pt.y, cssW, cssH);
			if (cover.length >= 2) {
				const win = pickJS(frame0, ZERO8, pt.x, pt.y, cssW, cssH);
				if (win === Math.max(...cover)) {
					overlap = { x: pt.x, y: pt.y, facet: win, cover };
					break outer;
				}
			}
		}
	}
	// Overlap goes first on an empty bitset so its winner is the later
	// source-order facet; small/large points are then planned against the
	// selection state the earlier clicks leave behind (a selected facet pops
	// toward the camera and can legitimately win a later pick).
	const pickFor = (fi, selSet) => {
		for (const pt of candidates.get(fi) ?? []) {
			if (pickJS(frame0, selWordsFor(selSet), pt.x, pt.y, cssW, cssH) === fi) return pt;
		}
		return null;
	};
	const pts = {
		overlap,
		small: pickFor(small, new Set([overlap.facet])),
		large: pickFor(large, new Set([overlap.facet, small])),
	};
	if (!pts.small || !pts.large || !overlap) {
		record('A1', false, `fixture missing small=${!!pts.small} large=${!!pts.large} overlap=${!!overlap}`);
		return;
	}
	const events = [
		{ kind: 'click', x: overlap.x, y: overlap.y, want: overlap.facet },
		{ kind: 'click', x: pts.small.x, y: pts.small.y, want: small },
		{ kind: 'click', x: pts.large.x, y: pts.large.y, want: large },
	];
	const { expected } = expectSequence(
		events.map(({ kind, x, y }) => ({ kind, x, y })),
		phase,
		aspect,
		cssW,
		cssH
	);
	const lines = events.map((e, i) => `pointer click@${e.x},${e.y}`);
	const run = runCommands(lines);
	const ok =
		run.picks.length === 3 &&
		events.every((e, i) => run.picks[i].facet === e.want && run.picks[i].facet === expected[i].facet);
	writeFileSync(
		resolve(OUT, 'A1.json'),
		JSON.stringify(
			{
				events: events.map((e, i) => ({
					...e,
					wantId: facetIdOf[e.want],
					got: run.picks[i] ?? null,
					expected: expected[i],
				})),
				facetVerts: { small: facetVerts[small], large: facetVerts[large] },
				overlapCover: overlap.cover,
			},
			null,
			2
		)
	);
	record(
		'A1',
		ok && run.errs.length === 0,
		`small=${facetIdOf[small]}(${facetVerts[small]}v) large=${facetIdOf[large]}(${facetVerts[large]}v) overlap=${facetIdOf[overlap.facet]} cover=[${overlap.cover.map((f) => facetIdOf[f])}] picks=${JSON.stringify(run.picks.map((p) => p.facet))}`
	);
}

function checkA2A3() {
	// One inspect-phase session covering occlusion, separated motion,
	// selected Z offset, front/back culling and touch.
	const aspect = 720 / 480;
	const PH_EXTRUDE = 0.44,
		PH_SEP = 0.7;
	const cssW = 720,
		cssH = 480;
	const frameE = computeCam(PH_EXTRUDE, PH_EXTRUDE * C.LOOP_PERIOD, 0, 0, aspect);
	const frameS = computeCam(PH_SEP, PH_SEP * C.LOOP_PERIOD, 0, 0, aspect);

	// candidates at extruded phase
	const { candidates: candE } = facetCandidates(PH_EXTRUDE, aspect, cssW, cssH, new Set(), 0, 5);
	const { candidates: candS } = facetCandidates(PH_SEP, aspect, cssW, cssH, new Set(), 0, 5);

	const pickAt = (frame, x, y, selSet = new Set()) => pickJS(frame, selWordsFor(selSet), x, y, cssW, cssH);

	// occlusion: covered point where winner is NOT the max cover index (earlier facet nearer)
	let occl = null;
	outer: for (const [fi, pts] of candE) {
		for (const pt of pts) {
			const cover = coveringFacets(frameE, pt.x, pt.y, cssW, cssH);
			if (cover.length >= 2) {
				const win = pickAt(frameE, pt.x, pt.y);
				if (win >= 0 && win !== Math.max(...cover)) {
					occl = { x: pt.x, y: pt.y, facet: win, cover };
					break outer;
				}
			}
		}
	}
	// separated motion: two facets pickable at sep peak
	const sepPts = [];
	for (const [fi, pts] of candS) {
		for (const pt of pts) {
			if (pickAt(frameS, pt.x, pt.y) === fi) {
				sepPts.push({ fi, x: pt.x, y: pt.y });
				break;
			}
		}
		if (sepPts.length >= 2) break;
	}
	// selected Z offset at the real up-tick frames: `pointer click` costs
	// three 60fps ticks, so the select pick lands on frame 247 (phase
	// 247/540) and the probe on frame 250 (phase 250/540). Separation is
	// already nonzero there, so candidates must be sampled at those phases,
	// not at the nominal PH_EXTRUDE.
	const phaseZSel = loopPhase(247 / 60);
	const phaseZProbe = loopPhase(250 / 60);
	const frameZSel = computeCam(phaseZSel, phaseZSel * C.LOOP_PERIOD, 0, 0, aspect);
	const frameZProbe = computeCam(phaseZProbe, phaseZProbe * C.LOOP_PERIOD, 0, 0, aspect);
	const { candidates: candZSel } = facetCandidates(phaseZSel, aspect, cssW, cssH, new Set(), 0, 5);
	const { candidates: candZProbe } = facetCandidates(phaseZProbe, aspect, cssW, cssH, new Set(), 0, 5);
	// Facet losing unselected at the probe frame but winning once its own
	// +0.08 selection offset applies; the select point must pick it clean.
	let zoff = null;
	outer2: for (const [fi, selPts] of candZSel) {
		const probePts = candZProbe.get(fi);
		if (!probePts) continue;
		const self = selPts.find((p) => pickJS(frameZSel, ZERO8, p.x, p.y, cssW, cssH) === fi);
		if (!self) continue;
		for (const pt of probePts) {
			if (pickJS(frameZProbe, ZERO8, pt.x, pt.y, cssW, cssH) === fi) continue;
			if (pickJS(frameZProbe, selWordsFor(new Set([fi])), pt.x, pt.y, cssW, cssH) === fi) {
				zoff = { x: pt.x, y: pt.y, facet: fi, self: { x: self.x, y: self.y } };
				break outer2;
			}
		}
	}
	// front/back culling at rest: a pixel covered by a collapsed back tri must be
	// won by a front cap (backs are discarded at e~0). Back and front share the
	// same 2D contour, so every back-covered point also has front coverage;
	// pickJS models the discard and must agree with the scene.
	let cull = null;
	const frameR = computeCam(0, 0, 0, 0, aspect);
	const { candidates: candB0 } = facetCandidates(0, aspect, cssW, cssH, new Set(), 1, 4);
	for (const [fi, pts] of candB0) {
		for (const pt of pts) {
			const cover = coveringFacets(frameR, pt.x, pt.y, cssW, cssH);
			if (cover.length > 0) {
				const win = pickJS(frameR, ZERO8, pt.x, pt.y, cssW, cssH);
				if (win >= 0) {
					cull = { x: pt.x, y: pt.y, backFacet: fi, fronts: cover, want: win };
					break;
				}
			}
		}
		if (cull) break;
	}
	// empty point at extruded phase: resets the bitset so the z-offset
	// select/probe pair runs on a clean selection (F4).
	let emptyE = null;
	for (const [x, y] of [
		[8, 8],
		[712, 8],
		[8, 472],
		[712, 472],
		[360, 8],
		[8, 240],
	]) {
		if (pickAt(frameE, x, y) === -1) {
			emptyE = { x, y };
			break;
		}
	}
	// touch target: any visible facet at extruded phase
	let touch = null;
	for (const [fi, pts] of candE) {
		for (const pt of pts) {
			if (pickAt(frameE, pt.x, pt.y) === fi) {
				touch = { x: pt.x, y: pt.y, facet: fi };
				break;
			}
		}
		if (touch) break;
	}

	const missing = [];
	if (!occl) missing.push('occlusion');
	if (!emptyE) missing.push('empty-reset');
	if (sepPts.length < 2) missing.push('separated');
	if (!zoff) missing.push('zoffset');
	if (!cull) missing.push('culling');
	if (!touch) missing.push('touch');
	if (missing.length) {
		record('A2', false, `missing fixtures: ${missing.join(',')}`);
		record('A3', false, 'blocked by A2 fixtures');
		return;
	}

	// Session: extruded phase picks (occlusion, then select zoff facet via its own
	// point, then the zoff probe where only the selection offset wins), touch;
	// separated phase picks; rest phase back-face culling probe.
	// elapsed: 238f=3.9667s (phi .4407), +140f=6.3s (phi .70), +162f=9.0s (phi 0).
	const lines = [];
	lines.push('advance 238'); // phi ~0.44
	const ev = [];
	const addClick = (x, y, note) => {
		lines.push(`pointer click@${x},${y}`);
		ev.push({ kind: 'click', x, y, note });
	};
	addClick(occl.x, occl.y, 'occlusion');
	addClick(emptyE.x, emptyE.y, 'reset');
	addClick(zoff.self.x, zoff.self.y, 'zoffset-select');
	addClick(zoff.x, zoff.y, 'zoffset-probe');
	lines.push(`touch tap@${touch.x},${touch.y}`);
	ev.push({ kind: 'touch', x: touch.x, y: touch.y, note: 'touch' });
	lines.push('advance 140'); // elapsed 6.3s, phi 0.70 separated
	for (const s of sepPts.slice(0, 2)) addClick(s.x, s.y, 'separated');
	lines.push('advance 162'); // elapsed 9.0s, phi 0 rest
	addClick(cull.x, cull.y, 'culling-rest');

	const { expected } = expectSequenceForMixed(ev);
	const run = runCommands(lines);

	function expectSequenceForMixed(events) {
		// --commands ticks one 60fps frame per dispatched event: advance N = N
		// ticks, pointer down/move/up = 1 each, `pointer click` = down+move+up
		// = 3 ticks, touch tap likewise. The pick runs on the up tick's frame.
		// Session: advance 238; 5 picks at ticks 241/244/247/250/253; +140;
		// 2 picks at 396/399; +162; rest pick at 564.
		const frameAt = [241, 244, 247, 250, 253, 396, 399, 564];
		const selSet = new Set();
		const expected = events.map((e, i) => {
			const phase = loopPhase(frameAt[i] / 60);
			const frame = computeCam(phase, phase * C.LOOP_PERIOD, 0, 0, aspect);
			const f = pickJS(frame, selWordsFor(selSet), e.x, e.y, cssW, cssH);
			if (f < 0) {
				selSet.clear();
				return { facet: -1, count: 0, reset: true };
			}
			const was = selSet.has(f);
			if (was) selSet.delete(f);
			else selSet.add(f);
			return { facet: f, selected: was ? 0 : 1, count: selSet.size };
		});
		return { expected, selSet };
	}

	// Compare: scene emits one x3pick line per click/touch (reset emits 'reset' line instead of facet line)
	const got = [];
	const rawLines = run.raw.split('\n').filter((l) => l.includes('x3pick'));
	for (const l of rawLines) {
		const m = l.match(/x3pick facet=(\d+) selected=(\d+) count=(\d+)/);
		if (m) got.push({ facet: +m[1], selected: +m[2], count: +m[3] });
		else if (l.includes('reset')) got.push({ facet: -1, count: 0 });
	}
	const detail = expected.map((e, i) => ({
		note: ev[i].note,
		want: e.facet < 0 ? 'reset' : facetIdOf[e.facet],
		got: got[i]
			? got[i].facet < 0
				? 'reset'
				: `${facetIdOf[got[i].facet]} sel=${got[i].selected} n=${got[i].count}`
			: 'none',
	}));
	const zoffOk =
		!!zoff &&
		got[2] &&
		got[2].facet === zoff.facet &&
		got[2].selected === 1 &&
		got[3] &&
		got[3].facet === zoff.facet &&
		got[3].selected === 0;
	const ok =
		got.length === expected.length &&
		zoffOk &&
		expected.every((e, i) => {
			const g = got[i];
			if (!g) return false;
			if (e.facet < 0) return g.facet === -1 || g.count === 0;
			return g.facet === e.facet;
		});
	writeFileSync(
		resolve(OUT, 'A2-A3.json'),
		JSON.stringify({ fixtures: { occl, emptyE, zoff, touch, sepPts, cull }, expected, got, detail }, null, 2)
	);
	record(
		'A2',
		ok,
		`fixtures occl=${facetIdOf[occl.facet]} zoff=${facetIdOf[zoff.facet]} touch=${facetIdOf[touch.facet]} sep=[${sepPts.map((s) => facetIdOf[s.fi])}] cull=${facetIdOf[cull.want]}(back=${facetIdOf[cull.backFacet]}); ${ok ? 'all matched' : 'MISMATCH ' + JSON.stringify(detail)}`
	);
	record('A3', ok, 'nearest-positive picks matched JS mirror across extruded/separated/rest poses');
}

function checkA4() {
	// toggle on/off + intrinsic geometry untouched (blobs/manifest hashes stable).
	const hash = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
	const before = {
		geom: hash(resolve(GEN, 'geometry.json')),
		man: hash(resolve(GEN, 'manifest.json')),
		vb: hash(resolve(RIVE, 'favicon-vertices.bin')),
	};
	const phase = 0.44,
		aspect = 720 / 480;
	const frame = computeCam(phase, phase * C.LOOP_PERIOD, 0, 0, aspect);
	const { candidates } = facetCandidates(phase, aspect, 720, 480, new Set(), 0, 5);
	let pt = null,
		fi = -1;
	for (const [f, pts] of candidates) {
		for (const p of pts)
			if (pickJS(frame, ZERO8, p.x, p.y, 720, 480) === f) {
				pt = p;
				fi = f;
				break;
			}
		if (pt) break;
	}
	if (!pt) {
		record('A4', false, 'no fixture');
		return;
	}
	const run = runCommands([
		`advance ${Math.round(phase * C.LOOP_PERIOD * 60)}`,
		`pointer click@${pt.x},${pt.y}`,
		`pointer click@${pt.x},${pt.y}`,
	]);
	const after = {
		geom: hash(resolve(GEN, 'geometry.json')),
		man: hash(resolve(GEN, 'manifest.json')),
		vb: hash(resolve(RIVE, 'favicon-vertices.bin')),
	};
	const toggled =
		run.picks.length === 2 &&
		run.picks[0].facet === fi &&
		run.picks[0].selected === 1 &&
		run.picks[1].facet === fi &&
		run.picks[1].selected === 0 &&
		run.picks[1].count === 0;
	const unchanged = JSON.stringify(before) === JSON.stringify(after);

	// GPU selection proof: two sessions at identical elapsed time, one with
	// the facet selected + one advance, one without. If the selection bitset
	// never reaches the shader the frames are pixel-identical (F1).
	const T = Math.round(phase * C.LOOP_PERIOD * 60);
	runCommands([`advance ${T}`, `advance 1`, `screenshot ${OUT}/x3-a4-unselected.png`]);
	runCommands([`advance ${T}`, `pointer click@${pt.x},${pt.y}`, `advance 1`, `screenshot ${OUT}/x3-a4-selected.png`]);
	const unP = resolve(OUT, 'x3-a4-unselected.png'),
		selP = resolve(OUT, 'x3-a4-selected.png');
	const selDiff = unP && selP ? aeDiff(unP, selP) : NaN;

	writeFileSync(
		resolve(OUT, 'A4.json'),
		JSON.stringify(
			{
				facet: facetIdOf[fi],
				picks: run.picks,
				hashesBefore: before,
				hashesAfter: after,
				selDiff,
				unselected: unP,
				selected: selP,
			},
			null,
			2
		)
	);
	record(
		'A4',
		toggled && unchanged && selDiff > 0,
		`toggle ${facetIdOf[fi]} sel 1->0 count->0; provider hashes ${unchanged ? 'unchanged' : 'CHANGED'}; GPU sel-vs-unsel diff=${selDiff}`
	);
}

function checkA5() {
	// select + drag, empty-click reset, settle to phi=0, compare vs fresh rest.
	const aspect = 720 / 480;
	const { candidates } = facetCandidates(0.44, aspect, 720, 480, new Set(), 0, 5);
	const frame = computeCam(0.44, 0.44 * C.LOOP_PERIOD, 0, 0, aspect);
	let pt = null,
		fi = -1;
	for (const [f, pts] of candidates) {
		for (const p of pts)
			if (pickJS(frame, ZERO8, p.x, p.y, 720, 480) === f) {
				pt = p;
				fi = f;
				break;
			}
		if (pt) break;
	}
	// empty point: corner that picks -1 at rest
	const frameR = computeCam(0, 0, 0, 0, aspect);
	let empty = null;
	for (const [x, y] of [
		[10, 10],
		[710, 10],
		[10, 470],
		[710, 470],
		[360, 10],
	]) {
		if (pickJS(frameR, ZERO8, x, y, 720, 480) === -1) {
			empty = { x, y };
			break;
		}
	}
	if (!pt || !empty) {
		record('A5', false, `fixtures pt=${!!pt} empty=${!!empty}`);
		return;
	}
	// Session: advance to phi .44 (238f), select, drag, empty click resets
	// selection+orbit, settle 302f -> elapsed 9.0s = phi 0 rest. Compare against
	// a fresh rest capture from a separate elapsed-0 session.
	const lines = [
		'advance 238',
		`pointer click@${pt.x},${pt.y}`,
		'pointer drag@400,240>460,200:8',
		`pointer click@${empty.x},${empty.y}`,
		'advance 302',
		`screenshot ${OUT}/x3-rest-after.png`,
	];
	const run = runCommands(lines);
	runCommands([`screenshot ${OUT}/x3-rest-ref.png`]);
	const a = resolve(OUT, 'x3-rest-after.png'),
		ref = resolve(OUT, 'x3-rest-ref.png');
	const diff = a && ref ? aeDiff(ref, a) : NaN;
	const resetLogged = run.raw.includes('x3pick reset');
	const ok = resetLogged && diff === 0;
	writeFileSync(
		resolve(OUT, 'A5.json'),
		JSON.stringify({ picks: run.picks, resetLogged, diff, after: a, ref }, null, 2)
	);
	record('A5', ok, `reset logged=${resetLogged} rest-pose pixel diff vs fresh rest=${diff}`);
}

function checkA6() {
	// narrow + wide viewport picks at layout center and an offset point.
	const phase = 0.44,
		aspect0 = 720 / 480;
	const frame = computeCam(phase, phase * C.LOOP_PERIOD, 0, 0, aspect0);
	// pick a fixture at 720x480
	const { candidates } = facetCandidates(phase, aspect0, 720, 480, new Set(), 0, 5);
	let fx = null;
	for (const [f, pts] of candidates) {
		for (const p of pts)
			if (pickJS(frame, ZERO8, p.x, p.y, 720, 480) === f) {
				fx = { x: p.x, y: p.y, facet: f };
				break;
			}
		if (fx) break;
	}
	if (!fx) {
		record('A6', false, 'no fixture');
		return;
	}
	// For each viewport, the same layout-space point must pick the same facet
	// only if css dims match pointer coords; use viewport center ray instead:
	// click at viewport center -> ndc(0,0) -> same world ray -> same facet.
	const viewports = ['400x480', '1200x480'];
	const details = [];
	let allOk = true;
	for (const vp of viewports) {
		const [w, h] = vp.split('x').map(Number);
		// center click: expected facet = pickJS with cssW=w cssH=h at (w/2,h/2)
		const frameV = computeCam(phase, phase * C.LOOP_PERIOD, 0, 0, w / h);
		const want = pickJS(frameV, ZERO8, w / 2, h / 2, w, h);
		// also an off-center point computed for this viewport
		let off = null;
		for (const [f, pts] of facetCandidates(phase, w / h, w, h, new Set(), 0, 3).candidates) {
			for (const p of pts) {
				const fr = computeCam(phase, phase * C.LOOP_PERIOD, 0, 0, w / h);
				if (pickJS(fr, ZERO8, p.x, p.y, w, h) === f) {
					off = { x: p.x, y: p.y, facet: f };
					break;
				}
			}
			if (off) break;
		}
		const lines = [`viewport ${vp}`, `advance ${Math.round(phase * C.LOOP_PERIOD * 60)}`];
		const clicks = [];
		if (off) {
			lines.push(`pointer click@${off.x},${off.y}`);
			clicks.push({ want: off.facet, tag: 'off' });
		}
		lines.push(`pointer click@${w / 2},${h / 2}`);
		clicks.push({ want, tag: 'center' });
		const run = runCommands(lines);
		// one x3pick line per click; misses log 'reset' instead of facet=
		const gotEv = [];
		for (const l of run.raw.split('\n').filter((s) => s.includes('x3pick'))) {
			const m = l.match(/x3pick facet=(\d+)/);
			gotEv.push(m ? +m[1] : -1);
		}
		const okV = gotEv.length === clicks.length && clicks.every((c, i) => gotEv[i] === c.want);
		if (!okV) allOk = false;
		details.push({ vp, wantCenter: want, gotCenter: gotEv[gotEv.length - 1], off, gotOff: off ? gotEv[0] : null });
	}
	writeFileSync(resolve(OUT, 'A6.json'), JSON.stringify({ fixture: fx, details }, null, 2));
	record(
		'A6',
		allOk,
		`viewports ${viewports.join(',')}: ${JSON.stringify(details.map((d) => ({ vp: d.vp, center: `${facetIdOf[d.wantCenter]}->${d.gotCenter}`, off: d.off ? `${facetIdOf[d.off.facet]}->${d.gotOff}` : '-' })))}`
	);
}

function checkA7() {
	// loop interruption: irregular advances keep phase & selection; pick matches JS.
	const aspect = 720 / 480,
		phaseTarget = 0.3;
	const elapsed = phaseTarget * C.LOOP_PERIOD; // 2.7s
	// 37f + 500ms + 95f = 2.7s; then 3f + 250ms + 7f = +0.4167s -> 3.1167s total
	const elapsed2 = 187 / 60,
		phase2 = loopPhase(elapsed2);
	const frame = computeCam(phaseTarget, elapsed, 0, 0, aspect);
	const frame2 = computeCam(phase2, elapsed2, 0, 0, aspect);
	const { candidates } = facetCandidates(phaseTarget, aspect, 720, 480, new Set(), 0, 5);
	const { candidates: cand2 } = facetCandidates(phase2, aspect, 720, 480, new Set(), 0, 5);
	let p1 = null,
		f1 = -1;
	for (const [f, pts] of candidates) {
		for (const p of pts)
			if (pickJS(frame, ZERO8, p.x, p.y, 720, 480) === f) {
				p1 = p;
				f1 = f;
				break;
			}
		if (p1) break;
	}
	// second fixture at the post-interruption phase, with f1 selected
	const w1pre = selWordsFor(new Set([f1]));
	let p2 = null,
		f2 = -1;
	for (const [f, pts] of cand2) {
		for (const p of pts)
			if (pickJS(frame2, w1pre, p.x, p.y, 720, 480) === f) {
				p2 = p;
				f2 = f;
				break;
			}
		if (p2) break;
	}
	if (!p1 || !p2) {
		record('A7', false, 'fixtures missing');
		return;
	}
	const lines = [
		'advance 37',
		'advance 500ms',
		'advance 95', // 2.7s, phi 0.3
		`pointer click@${p1.x},${p1.y}`,
		'advance 3',
		'advance 250ms',
		'advance 7', // +0.4167s -> 3.1167s, phi ~0.346
		`pointer click@${p2.x},${p2.y}`,
	];
	const want1 = pickJS(frame, ZERO8, p1.x, p1.y, 720, 480);
	const want2 = pickJS(frame2, selWordsFor(new Set([want1])), p2.x, p2.y, 720, 480);
	// toggling want2: same facet deselects (count 0), new facet selects (count 2)
	const wantCount = want2 === want1 ? 0 : 2;
	const run = runCommands(lines);
	const ok =
		run.picks.length === 2 &&
		run.picks[0].facet === want1 &&
		run.picks[1].facet === want2 &&
		run.picks[1].count === wantCount;
	writeFileSync(
		resolve(OUT, 'A7.json'),
		JSON.stringify(
			{ p1: { ...p1, facet: f1 }, p2: { ...p2, facet: f2 }, want1, want2, phase2, picks: run.picks },
			null,
			2
		)
	);
	record(
		'A7',
		ok,
		`irregular advance -> picks ${run.picks.map((p) => p.facet)} vs expected ${want1},${want2} count=${wantCount}`
	);
}

function checkA8() {
	// Deadzone: a sub-3px drag must not steer the camera even after damping
	// frames advance; a real drag at the same elapsed time must change pixels.
	// Every --commands line consumes one frame, so pointer-heavy sessions
	// advance fewer explicit frames to land on the same elapsed time.
	const ref = runCommands(['advance 60', `screenshot ${OUT}/x3-a8-ref.png`]);
	const micro = runCommands([
		'pointer down@10,10',
		'pointer move@11,10',
		'pointer move@10,11',
		'pointer move@11,11',
		'pointer up@11,11',
		'advance 55',
		`screenshot ${OUT}/x3-micro-after.png`,
	]);
	const drag = runCommands([
		'pointer down@400,240',
		'pointer move@430,260',
		'pointer move@440,255',
		'pointer up@440,255',
		'advance 56',
		`screenshot ${OUT}/x3-drag-after.png`,
	]);
	const refP = resolve(OUT, 'x3-a8-ref.png'),
		microP = resolve(OUT, 'x3-micro-after.png'),
		dragP = resolve(OUT, 'x3-drag-after.png');
	const microDiff = refP && microP ? aeDiff(refP, microP) : NaN;
	const dragDiff = refP && dragP ? aeDiff(refP, dragP) : NaN;
	const ok = microDiff === 0 && dragDiff > 0;
	writeFileSync(
		resolve(OUT, 'A8.json'),
		JSON.stringify(
			{
				microDiff,
				dragDiff,
				ref: refP,
				micro: microP,
				drag: dragP,
				refPicks: ref.picks,
				microPicks: micro.picks,
				dragPicks: drag.picks,
			},
			null,
			2
		)
	);
	record('A8', ok, `deadzone micro-diff=${microDiff} (want 0), drag-diff=${dragDiff} (want >0)`);
}

function checkA9() {
	// equal elapsed (3.0s = 180 frames) at three advance granularities after an
	// orbit drag: 6f x30 (~10fps), 3f x60 (~20fps), 1f x180 (60fps).
	// (sub-frame ms advances quantize in --commands; frame counts are exact.)
	const drag = 'pointer drag@400,240>440,220:6';
	const sessions = [
		{ tag: 'f6x30', lines: [drag, ...Array(30).fill('advance 6')] },
		{ tag: 'f3x60', lines: [drag, ...Array(60).fill('advance 3')] },
		{ tag: 'f1x180', lines: [drag, ...Array(180).fill('advance 1')] },
	];
	const pngs = [];
	for (const s of sessions) {
		runRive([...s.lines, `screenshot ${OUT}/x3-a9-${s.tag}.png`]);
		pngs.push(resolve(OUT, `x3-a9-${s.tag}.png`));
	}
	const diffs = [];
	let ok = pngs.every(Boolean);
	for (let i = 1; i < pngs.length && ok; i++) {
		const d = aeDiff(pngs[0], pngs[i]);
		diffs.push(d);
		if (d !== 0) ok = false;
	}
	writeFileSync(resolve(OUT, 'A9.json'), JSON.stringify({ sessions: sessions.map((s) => s.tag), pngs, diffs }, null, 2));
	record('A9', ok, `3s elapsed at 3 granularities, pixel diffs vs first: ${JSON.stringify(diffs)}`);
}

function checkA10() {
	// exponential damping equivalence at ~30/60/144Hz subdivisions over equal elapsed.
	// 960ms: 30x32ms, 60x16ms, 137x7ms+1ms
	const drag = 'pointer drag@400,240>440,220:6';
	const sessions = [
		{ tag: 'hz30', lines: [drag, ...Array(30).fill('advance 32ms')] },
		{ tag: 'hz60', lines: [drag, ...Array(60).fill('advance 16ms')] },
		{ tag: 'hz144', lines: [drag, ...Array(137).fill('advance 7ms'), 'advance 1ms'] },
	];
	const pngs = [];
	for (const s of sessions) {
		runRive([...s.lines, `screenshot ${OUT}/x3-a10-${s.tag}.png`]);
		pngs.push(resolve(OUT, `x3-a10-${s.tag}.png`));
	}
	// Long-frame stability: `advance 5s` must not NaN or degenerate the scene.
	// (--commands subdivides time advances into frame steps, so the 0.5s clamp
	// in advance() is defensive; verify stability + a correct pick instead.)
	const phaseLong = loopPhase(5.0);
	const frameLong = computeCam(phaseLong, 5.0, 0, 0, 720 / 480);
	const wantLong = pickJS(frameLong, ZERO8, 360, 240, 720, 480);
	const longRun = runCommands(['pointer drag@400,240>440,220:6', 'advance 5s', 'pointer click@360,240']);
	const gotLong = longRun.picks[0]?.facet ?? -1;
	const longOk = gotLong === wantLong;
	const diffs = pngs.slice(1).map((p) => aeDiff(pngs[0], p));
	const ok = diffs.every((d) => d === 0) && longOk;
	writeFileSync(resolve(OUT, 'A10.json'), JSON.stringify({ diffs, wantLong, gotLong, longOk, pngs }, null, 2));
	record(
		'A10',
		ok,
		`960ms damping diffs=${JSON.stringify(diffs)}; 5s advance pick=${gotLong} vs expected ${wantLong} (stable)`
	);
}

function checkA11() {
	// orientation fixtures: identity->90 yaw, 45 midpoint, near-identical quats.
	const f = (q) => qRot(q, 0, 0, -1);
	const id = f(qYawPitch(0, 0));
	const q90 = qYawPitch(Math.PI / 2, 0);
	const f90 = f(q90);
	const mid = f(qSlerp(qIdent(), q90, 0.5));
	const s = 1 / Math.sqrt(2);
	const nearQ = qNorm([q90[0] + 1e-7, q90[1] - 1e-7, q90[2] + 1e-7, q90[3]]);
	const nearF = f(qSlerp(q90, nearQ, 0.5));
	const ok =
		Math.abs(id[2] + 1) < 1e-9 &&
		Math.abs(f90[0] + 1) < 1e-9 &&
		Math.abs(f90[2]) < 1e-9 &&
		Math.abs(mid[0] + s) < 1e-6 &&
		Math.abs(mid[2] + s) < 1e-6 &&
		Math.abs(nearF[0] - f90[0]) < 1e-3 &&
		Number.isFinite(nearF[0]);
	writeFileSync(resolve(OUT, 'A11.json'), JSON.stringify({ id, f90, mid, nearF }, null, 2));
	record(
		'A11',
		ok,
		`identity->${JSON.stringify(id.map((x) => +x.toFixed(3)))} 90->${JSON.stringify(f90.map((x) => +x.toFixed(3)))} mid45->${JSON.stringify(mid.map((x) => +x.toFixed(3)))}`
	);
}

const CHECKS = {
	A1: checkA1,
	A2: checkA2A3,
	// A3 shares the A2 session; reuse its verdict when run via --all-fixtures.
	A3: () => {
		if (results.A3) return;
		checkA2A3();
	},
	A4: checkA4,
	A5: checkA5,
	A6: checkA6,
	A7: checkA7,
	A8: checkA8,
	A9: checkA9,
	A10: checkA10,
	A11: checkA11,
};
const arg = process.argv[2];
if (arg === '--all-fixtures') {
	for (const id of ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11']) {
		if (CHECKS[id]) CHECKS[id]();
	}
} else if (CHECKS[arg]) {
	CHECKS[arg]();
} else {
	console.error('usage: verify-picking.mjs --all-fixtures | A1..A11');
	process.exit(2);
}
const failed = Object.entries(results).filter(([, r]) => !r.ok);
if (failed.length) {
	console.log(`FAILURES: ${failed.map(([id]) => id).join(', ')}`);
	process.exit(1);
}
