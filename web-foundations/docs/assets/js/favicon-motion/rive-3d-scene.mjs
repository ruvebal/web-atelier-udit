// X4 host mirror of the Rive + AnimaScript 3D scene.
//
// This module re-implements, in plain JavaScript, the exact mathematics that
// choreo.as and pick.as compile into the .riv: the 9 s choreography loop,
// the quaternion inspect camera, the exponential orbit damping, and the CPU
// facet picker that shares the GPU's discard and depth-tie rules. The demo
// host uses it for two jobs the sealed .riv cannot do for itself:
//
//   1. Aim synthetic pointer events at a screen point that picks a chosen
//      facet (the semantic facet buttons).
//   2. Mirror the damped user orbit closely enough to predict where facets
//      will be when the click lands.
//
// It is NOT a second renderer: the scene remains authoritative. Every pick
// the host predicts is confirmed by the scene's own `x3pick` console log,
// which the host parses to keep the DOM semantic twin synchronized.
//
// The same file runs in the browser (fetch -> Uint8Array) and in Node
// (fs.readFile -> Uint8Array) so the X4 verifier can cross-check the host
// mirror against the X3 verifier's fixtures.

export const CHOREO = {
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

const VERTEX_STRIDE = 40;
const FACET_ID_OFFSET = 36;

const smoothstep = (x) => {
	const t = Math.min(1, Math.max(0, x));
	return t * t * (3 - 2 * t);
};
export const loopPhase = (elapsed) => (elapsed / CHOREO.LOOP_PERIOD) % 1;

export function facetExtrusion(phase, facet, count) {
	const n = Math.max(count, 1);
	const stagger = count > 1 ? (facet / (n - 1)) * CHOREO.FACET_STAGGER : 0;
	if (phase < CHOREO.EXTRUDE_START) return 0;
	if (phase < CHOREO.RETRACT_START) {
		const u = (phase - CHOREO.EXTRUDE_START) / CHOREO.EXTRUDE_SPAN;
		return smoothstep((u - stagger * 0.5) / (1 - CHOREO.FACET_STAGGER * 0.5));
	}
	if (phase < CHOREO.RETRACT_START + CHOREO.RETRACT_SPAN) {
		const v = (phase - CHOREO.RETRACT_START) / CHOREO.RETRACT_SPAN;
		const reverse = count > 1 ? ((n - 1 - facet) / (n - 1)) * CHOREO.FACET_STAGGER : 0;
		return 1 - smoothstep((v - reverse * 0.5) / (1 - CHOREO.FACET_STAGGER * 0.5));
	}
	return 0;
}

const separation = (phase) =>
	smoothstep((phase - CHOREO.SEP_RISE_START) / CHOREO.SEP_SPAN) *
	smoothstep((CHOREO.SEP_FALL_END - phase) / CHOREO.SEP_SPAN);

const inspectWeight = (phase) => smoothstep((phase - 0.12) / 0.25) * smoothstep((0.98 - phase) / 0.22);

// hashDir3_ from canonical-favicon.wgsl: deterministic per-facet separation
// direction. Must stay bit-identical to the shader's u32 hash.
function hashDir3(facet) {
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
}

// Quaternions are [x, y, z, w]; the scene stores yaw about +Y then pitch
// about local +X, matching choreo.as quatFromYawPitch.
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
export const dampStep = (cur, target, dt, lambda) => cur + (target - cur) * (1 - Math.exp(-lambda * dt));

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => {
	const l = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
	return [a[0] / l, a[1] / l, a[2] / l];
};

/**
 * Build a mirror over the packed blobs.
 * @param {object} args
 * @param {object} args.manifest  parsed generated/favicon/manifest.json
 * @param {Uint8Array} args.vertices  favicon-vertices.bin bytes (40 B stride)
 * @param {Uint8Array} args.indices   favicon-indices.bin bytes (uint16 LE)
 */
export function createRive3DMirror({ manifest, vertices, indices }) {
	const facetCount = manifest.facetCount;
	const vertexCount = vertices.length / VERTEX_STRIDE;
	const triCount = indices.length / 6;
	const vpos = (v, c) => verticesDV.getFloat32(v * VERTEX_STRIDE + c * 4, true);
	const verticesDV = new DataView(vertices.buffer, vertices.byteOffset, vertices.byteLength);
	const indicesDV = new DataView(indices.buffer, indices.byteOffset, indices.byteLength);
	const vfacet = (v) => verticesDV.getFloat32(v * VERTEX_STRIDE + FACET_ID_OFFSET, true);
	const vnz = (v) => verticesDV.getFloat32(v * VERTEX_STRIDE + 20, true);

	const triFacet = new Int32Array(triCount);
	const triNz = new Float32Array(triCount);
	for (let t = 0; t < triCount; t++) {
		const vi = indicesDV.getUint16(t * 6, true);
		triFacet[t] = vfacet(vi);
		triNz[t] = vnz(vi);
	}
	const facetTris = Array.from({ length: facetCount }, () => []);
	for (let t = 0; t < triCount; t++) facetTris[triFacet[t]].push(t);

	const bounds = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity, minZ: Infinity, maxZ: -Infinity };
	for (let v = 0; v < vertexCount; v++) {
		for (const [k, c] of [
			['X', 0],
			['Y', 1],
			['Z', 2],
		]) {
			const val = vpos(v, c);
			bounds[`min${k}`] = Math.min(bounds[`min${k}`], val);
			bounds[`max${k}`] = Math.max(bounds[`max${k}`], val);
		}
	}
	const CENTER = [(bounds.minX + bounds.maxX) / 2, (bounds.minY + bounds.maxY) / 2, (bounds.minZ + bounds.maxZ) / 2];

	function computeCam(phase, userYaw, userPitch, aspect) {
		const w = inspectWeight(phase);
		const qBase = qSlerp(qIdent(), qYawPitch(CHOREO.INSPECT_YAW, CHOREO.INSPECT_PITCH), w);
		const qUser = qYawPitch(userYaw, userPitch);
		const q = qNorm(qMul(qBase, qUser));
		const forward = qRot(q, 0, 0, -1);
		const upIn = qRot(q, 0, 1, 0);
		const right = norm(cross(forward, upIn));
		const up = cross(right, forward);
		const eye = CENTER.map((c, i) => c - forward[i] * CHOREO.CAMERA_DISTANCE);
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
		const halfH = Math.max(maxVY, maxVX / aspect) * CHOREO.FIT_MARGIN;
		const nearMargin = CHOREO.SELECT_OFFSET_Z + CHOREO.SEPARATION_DIST + 0.02;
		const near = Math.max(-maxVZ - nearMargin, 0.01);
		const far = -minVZ + 0.05;
		return {
			phase,
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

	function animatedTri(t, frame, selWords, cache) {
		const facet = triFacet[t];
		if (!cache.e.has(facet)) cache.e.set(facet, facetExtrusion(frame.phase, facet, facetCount));
		const e = cache.e.get(facet);
		const sepBase = frame.sep * CHOREO.SEPARATION_DIST;
		const dir = cache.dir.has(facet) ? cache.dir.get(facet) : cache.dir.set(facet, hashDir3(facet)).get(facet);
		const selK = selWords[facet >> 5] & (1 << (facet & 31)) ? CHOREO.SELECT_OFFSET_Z : 0;
		const out = [];
		for (let k = 0; k < 3; k++) {
			const vi = indicesDV.getUint16(t * 6 + k * 2, true);
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

	// Mirror of pick.as pickFacet. px/py are layout (CSS-pixel) coordinates;
	// cssW/cssH are the canvas layout size the scene was resized to.
	function pick(phase, userYaw, userPitch, px, py, cssW, cssH, selWords = new Uint32Array(8)) {
		if (cssW <= 0 || cssH <= 0) return -1;
		const aspect = cssW / cssH;
		const frame = computeCam(phase, userYaw, userPitch, aspect);
		const ndcX = (px / cssW) * 2 - 1;
		const ndcY = 1 - (py / cssH) * 2;
		const vx = ndcX * frame.halfH * aspect;
		const vy = ndcY * frame.halfH;
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
		for (let t = 0; t < triCount; t++) {
			const { facet, e, nz, verts: tv } = animatedTri(t, frame, selWords, cache);
			if (e < CHOREO.DISCARD_E && nz < 0.5) continue;
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

	function projectPoint(frame, p, cssW, cssH) {
		const v = frame.view(p);
		const ndcX = v[0] / (frame.halfH * frame.aspect);
		const ndcY = v[1] / frame.halfH;
		return [((ndcX + 1) / 2) * cssW, ((1 - ndcY) / 2) * cssH];
	}

	function animatedVertexPos(frame, vi, facet, selWords) {
		const e = facetExtrusion(frame.phase, facet, facetCount);
		const sepBase = frame.sep * CHOREO.SEPARATION_DIST;
		const dir = hashDir3(facet);
		const selK = selWords[facet >> 5] & (1 << (facet & 31)) ? CHOREO.SELECT_OFFSET_Z : 0;
		return [
			vpos(vi, 0) + dir[0] * sepBase + frame.toward[0] * selK,
			vpos(vi, 1) + dir[1] * sepBase + frame.toward[1] * selK,
			vpos(vi, 2) * e + dir[2] * sepBase + frame.toward[2] * selK,
		];
	}

	const frontTriCache = new Map();
	function frontTrisScreen(frame, cssW, cssH, selWords) {
		const selKey = selWords.reduce((acc, w, i) => acc | (w ? i + 1 : 0), 0) + ':' + selWords.join(',');
		const key = `${frame.phase.toFixed(5)}|${cssW}x${cssH}|${selKey}`;
		const hit = frontTriCache.get(key);
		if (hit) return hit;
		const out = [];
		for (let t = 0; t < triCount; t++) {
			if (triNz[t] <= 0.5) continue;
			const facet = triFacet[t];
			const pts = [0, 1, 2].map((k) => {
				const vi = indicesDV.getUint16(t * 6 + k * 2, true);
				return projectPoint(frame, animatedVertexPos(frame, vi, facet, selWords), cssW, cssH);
			});
			out.push({ facet, pts });
		}
		if (frontTriCache.size > 64) frontTriCache.clear();
		frontTriCache.set(key, out);
		return out;
	}

	function pointInTri(px, py, tri) {
		const [a, b, c] = tri;
		const cross2 = (o, p, q) => (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]);
		const d1 = cross2(a, b, [px, py]);
		const d2 = cross2(b, c, [px, py]);
		const d3 = cross2(c, a, [px, py]);
		const eps = -1e-6;
		return (d1 >= eps && d2 >= eps && d3 >= eps) || (d1 <= -eps && d2 <= -eps && d3 <= -eps);
	}

	/**
	 * Find a layout-space point that picks `facet` at the given pose.
	 * `phaseWindow` widens the phase samples so a small elapsed-time
	 * estimation error cannot move the click onto a neighbouring facet.
	 * Returns { x, y } in layout pixels, or null when no candidate survives.
	 */
	function solveFacetPoint(
		facet,
		{ phase, userYaw = 0, userPitch = 0, cssW, cssH, selWords = new Uint32Array(8), phaseWindow = 0.03 } = {}
	) {
		if (cssW <= 0 || cssH <= 0 || facet < 0 || facet >= facetCount) return null;
		const aspect = cssW / cssH;
		const frame = computeCam(phase, userYaw, userPitch, aspect);
		const tris = facetTris[facet];
		const step = Math.max(1, Math.floor(tris.length / 24));
		const seen = new Set();
		const candidates = [];
		for (let k = 0; k < tris.length; k += step) {
			const t = tris[k];
			if (triNz[t] <= 0.5) continue;
			const pts = [0, 1, 2].map((kk) => {
				const vi = indicesDV.getUint16(t * 6 + kk * 2, true);
				return projectPoint(frame, animatedVertexPos(frame, vi, facet, selWords), cssW, cssH);
			});
			const cx = (pts[0][0] + pts[1][0] + pts[2][0]) / 3;
			const cy = (pts[0][1] + pts[1][1] + pts[2][1]) / 3;
			if (cx < 0 || cx > cssW || cy < 0 || cy > cssH) continue;
			const key = `${Math.round(cx * 4)},${Math.round(cy * 4)}`;
			if (seen.has(key)) continue;
			seen.add(key);
			candidates.push({ x: cx, y: cy });
		}
		const phases = phaseWindow > 0 ? [phase - phaseWindow, phase, phase + phaseWindow] : [phase];
		const scored = [];
		for (const c of candidates) {
			let okAll = true,
				okMid = false;
			for (const p of phases) {
				const ph = ((p % 1) + 1) % 1;
				const hit = pick(ph, userYaw, userPitch, c.x, c.y, cssW, cssH, selWords);
				if (hit !== facet) okAll = false;
				if (p === phase && hit === facet) okMid = true;
			}
			if (okAll || okMid) scored.push({ ...c, robust: okAll });
		}
		scored.sort((a, b) => Number(b.robust) - Number(a.robust));
		return scored.length ? scored[0] : null;
	}

	/**
	 * Rough visibility score for a facet at a pose: how many sampled front-face
	 * triangle centroids land on screen AND still pick this facet (i.e. are not
	 * occluded by a neighbour). Used to choose a representative still phase.
	 */
	function facetScreenCoverage(
		facet,
		{ phase, userYaw = 0, userPitch = 0, cssW, cssH, selWords = new Uint32Array(8) } = {}
	) {
		if (cssW <= 0 || cssH <= 0 || facet < 0 || facet >= facetCount) return 0;
		const aspect = cssW / cssH;
		const frame = computeCam(phase, userYaw, userPitch, aspect);
		const tris = facetTris[facet];
		const step = Math.max(1, Math.floor(tris.length / 24));
		let cover = 0,
			tested = 0;
		for (let k = 0; k < tris.length; k += step) {
			const t = tris[k];
			if (triNz[t] <= 0.5) continue;
			const pts = [0, 1, 2].map((kk) => {
				const vi = indicesDV.getUint16(t * 6 + kk * 2, true);
				return projectPoint(frame, animatedVertexPos(frame, vi, facet, selWords), cssW, cssH);
			});
			const cx = (pts[0][0] + pts[1][0] + pts[2][0]) / 3;
			const cy = (pts[0][1] + pts[1][1] + pts[2][1]) / 3;
			if (cx < 0 || cx > cssW || cy < 0 || cy > cssH) continue;
			tested++;
			if (pick(phase, userYaw, userPitch, cx, cy, cssW, cssH, selWords) === facet) cover++;
		}
		return tested === 0 ? 0 : cover / tested;
	}

	/** Find a layout-space point that picks nothing (empty space). */
	function solveEmptyPoint({ phase, userYaw = 0, userPitch = 0, cssW, cssH, selWords = new Uint32Array(8) } = {}) {
		if (cssW <= 0 || cssH <= 0) return null;
		const probes = [
			[4, 4],
			[cssW - 4, 4],
			[4, cssH - 4],
			[cssW - 4, cssH - 4],
			[cssW / 2, 4],
			[cssW / 2, cssH - 4],
			[4, cssH / 2],
			[cssW - 4, cssH / 2],
		];
		for (const [x, y] of probes) {
			if (pick(phase, userYaw, userPitch, x, y, cssW, cssH, selWords) < 0) return { x, y };
		}
		return null;
	}

	// ---- orbit mirror ----
	// The host feeds the same pointer stream the scene sees (in layout
	// pixels) and integrates the same damped yaw/pitch. advanceOrbit uses the
	// same dt clamp as main.as advance(): elapsed is unclamped, damping is
	// bounded to 0.5 s so a long frame cannot teleport the orbit.
	const orbit = {
		yaw: 0,
		pitch: 0,
		yawTarget: 0,
		pitchTarget: 0,
		down: false,
		moved: false,
		downX: 0,
		downY: 0,
		lastX: 0,
		lastY: 0,
	};
	function orbitDown(x, y) {
		orbit.down = true;
		orbit.moved = false;
		orbit.downX = orbit.lastX = x;
		orbit.downY = orbit.lastY = y;
	}
	function orbitMove(x, y) {
		if (!orbit.down) return;
		let ddx = x - orbit.downX;
		let ddy = y - orbit.downY;
		if (!orbit.moved && Math.sqrt(ddx * ddx + ddy * ddy) < CHOREO.DRAG_DEADZONE) {
			orbit.lastX = x;
			orbit.lastY = y;
			return;
		}
		orbit.moved = true;
		const dx = x - orbit.lastX;
		const dy = y - orbit.lastY;
		orbit.lastX = x;
		orbit.lastY = y;
		orbit.yawTarget = Math.max(-CHOREO.MAX_USER_YAW, Math.min(CHOREO.MAX_USER_YAW, orbit.yawTarget - dx * 0.006));
		orbit.pitchTarget = Math.max(-CHOREO.MAX_USER_PITCH, Math.min(CHOREO.MAX_USER_PITCH, orbit.pitchTarget + dy * 0.006));
	}
	function orbitUp() {
		orbit.down = false;
	}
	function orbitResetTargets() {
		orbit.yawTarget = 0;
		orbit.pitchTarget = 0;
	}
	function advanceOrbit(dt) {
		const d = Math.min(dt, 0.5);
		orbit.yaw = dampStep(orbit.yaw, orbit.yawTarget, d, CHOREO.ORBIT_LAMBDA);
		orbit.pitch = dampStep(orbit.pitch, orbit.pitchTarget, d, CHOREO.ORBIT_LAMBDA);
	}

	return {
		facetCount,
		manifest,
		facetId: (i) => manifest.facets[i]?.id ?? `facet-${String(i + 1).padStart(2, '0')}`,
		facetFill: (i) => manifest.facets[i]?.fill ?? '#888888',
		pick,
		solveFacetPoint,
		solveEmptyPoint,
		facetScreenCoverage,
		orbit,
		orbitDown,
		orbitMove,
		orbitUp,
		orbitResetTargets,
		advanceOrbit,
		_bounds: bounds,
	};
}

/**
 * Browser/node loader: fetch (or read) the three generated assets and build
 * a mirror. `get` receives a URL and must resolve to bytes.
 */
export async function loadRive3DMirror({ baseUrl, get }) {
	const [manifest, vertices, indices] = await Promise.all([
		get(`${baseUrl}/generated/favicon/manifest.json`).then((r) => (typeof r === 'string' ? JSON.parse(r) : r.json())),
		get(`${baseUrl}/favicon-vertices.bin`),
		get(`${baseUrl}/favicon-indices.bin`),
	]);
	return createRive3DMirror({ manifest, vertices, indices });
}
