#!/usr/bin/env node
// X2 fidelity verifier: checks the Rive GPU captures against the generated
// svg-to-rive-3d provider with an independent camera model and a small
// software rasterizer. Run with no argument for all items, or one of A1-A8.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const repo = resolve(web, '..');
const RIVE = resolve(web, 'docs/assets/animations/fava/rive/animascript-3d');
const GEN = resolve(RIVE, 'generated/favicon');
const BUILD = resolve(RIVE, 'build');

const geometry = JSON.parse(readFileSync(resolve(GEN, 'geometry.json'), 'utf8'));
const manifest = JSON.parse(readFileSync(resolve(GEN, 'manifest.json'), 'utf8'));
const POS = geometry.positions,
	NRM = geometry.normals,
	IDX = geometry.indices;
const VERTS = POS.length / 3,
	TRIS = IDX.length / 3;

// ---- tiny vec/mat helpers (row-major math, independent of Mat4) ----
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => {
	const l = Math.hypot(...a);
	return [a[0] / l, a[1] / l, a[2] / l];
};
const bounds = (() => {
	const b = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity, minZ: Infinity, maxZ: -Infinity };
	for (let i = 0; i < VERTS; i++) {
		const x = POS[i * 3],
			y = POS[i * 3 + 1],
			z = POS[i * 3 + 2];
		b.minX = Math.min(b.minX, x);
		b.maxX = Math.max(b.maxX, x);
		b.minY = Math.min(b.minY, y);
		b.maxY = Math.max(b.maxY, y);
		b.minZ = Math.min(b.minZ, z);
		b.maxZ = Math.max(b.maxZ, z);
	}
	return b;
})();
const CENTER = [(bounds.minX + bounds.maxX) / 2, (bounds.minY + bounds.maxY) / 2, (bounds.minZ + bounds.maxZ) / 2];

// Mirrors main.as updateUniforms: orbit angles are pure functions of time.
function camera(elapsed, aspect) {
	const yaw = 2.8 * Math.sin(0.45 * elapsed);
	const pitch = 0.45 * Math.sin(0.5 * elapsed);
	const distance = 3.0;
	const eye = [
		CENTER[0] + distance * Math.sin(yaw) * Math.cos(pitch),
		CENTER[1] + distance * Math.sin(pitch),
		CENTER[2] + distance * Math.cos(yaw) * Math.cos(pitch),
	];
	const f = norm(sub(CENTER, eye));
	const s = norm(cross(f, [0, 1, 0]));
	const u = cross(s, f);
	const view = (p) => {
		const d = sub(p, eye);
		return [dot(s, d), dot(u, d), -dot(f, d)];
	};
	// Ortho fit on the rotated bounding box, same corner loop as the script.
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
	const halfH = Math.max(maxVY, maxVX / aspect) * 1.06;
	const near = Math.max(-maxVZ - 0.05, 0.01);
	const far = -minVZ + 0.05;
	const project = (v) => {
		// Mat4.ortho: x/y to NDC, view z in [-far,-near] to depth [0,1].
		const ndcX = v[0] / (halfH * aspect);
		const ndcY = v[1] / halfH;
		const depth = (-v[2] - near) / (far - near);
		return { ndcX, ndcY, depth, viewZ: v[2], near, far, halfH };
	};
	return { yaw, pitch, eye, view, project, halfH, near, far };
}

// ---- generated provider tables ----
const vertexFill = new Array(VERTS).fill(null);
const vertexFacet = new Int32Array(VERTS).fill(-1);
const triFacet = new Int32Array(TRIS);
const facetFill = manifest.facets.map((f) => f.fill);
manifest.facets.forEach((facet, fi) => {
	const span = facet.mesh;
	for (let v = span.vertexStart; v < span.vertexStart + span.vertexCount; v++) {
		vertexFill[v] = facet.fill;
		vertexFacet[v] = fi;
	}
	for (let t = span.indexStart / 3; t < (span.indexStart + span.indexCount) / 3; t++) triFacet[t] = fi;
});
const triClass = new Uint8Array(TRIS); // 0 front, 1 back, 2 side
for (let t = 0; t < TRIS; t++) {
	const nz = NRM[IDX[t * 3] * 3 + 2];
	triClass[t] = nz > 0.5 ? 0 : nz < -0.5 ? 1 : 2;
}
const SHADE = [
	[1, 1, 1],
	[0.45, 0.45, 0.45],
	[0.72, 0.74, 0.78],
];
const hexRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const triColour = (t) => {
	const rgb = hexRgb(vertexFill[IDX[t * 3]]);
	const s = SHADE[triClass[t]];
	return [rgb[0] * s[0], rgb[1] * s[1], rgb[2] * s[2]];
};

// ---- PNG decode via ImageMagick raw RGBA ----
function pngPixels(path) {
	const out = execFileSync('magick', [path, '-depth', '8', 'rgba:-'], { maxBuffer: 64 * 1024 * 1024 });
	const id = execFileSync('magick', ['identify', '-format', '%w %h', path], { encoding: 'utf8' })
		.trim()
		.split(/\s+/)
		.map(Number);
	return { w: id[0], h: id[1], data: new Uint8Array(out.buffer, out.byteOffset, out.byteLength) };
}

// ---- software rasterizer: returns RGBA expectation + owner/class/depth ----
function rasterize(elapsed, W, H) {
	const cam = camera(elapsed, W / H);
	const rgba = new Uint8Array(W * H * 4);
	const bg = [6, 10, 23];
	for (let i = 0; i < W * H; i++) (rgba.set(bg, i * 4), (rgba[i * 4 + 3] = 255));
	const owner = new Int32Array(W * H).fill(-1);
	const tclass = new Uint8Array(W * H).fill(255);
	const zbuf = new Float32Array(W * H).fill(Infinity);
	const edgeDist = new Float32Array(W * H);

	const world = (v) => [POS[v * 3], POS[v * 3 + 1], POS[v * 3 + 2]];
	for (let t = 0; t < TRIS; t++) {
		const vv = [0, 1, 2].map((k) => cam.project(cam.view(world(IDX[t * 3 + k]))));
		const sx = vv.map((p) => ((p.ndcX + 1) / 2) * W);
		const sy = vv.map((p) => (1 - (p.ndcY + 1) / 2) * H);
		const minX = Math.max(0, Math.floor(Math.min(...sx) - 1));
		const maxX = Math.min(W - 1, Math.ceil(Math.max(...sx) + 1));
		const minY = Math.max(0, Math.floor(Math.min(...sy) - 1));
		const maxY = Math.min(H - 1, Math.ceil(Math.max(...sy) + 1));
		if (maxX < minX || maxY < minY) continue;
		const area = (sx[1] - sx[0]) * (sy[2] - sy[0]) - (sx[2] - sx[0]) * (sy[1] - sy[0]);
		if (Math.abs(area) < 1e-9) continue;
		// Edge lengths opposite each vertex, for barycentric -> pixel distance.
		const len01 = Math.hypot(sx[1] - sx[0], sy[1] - sy[0]);
		const len12 = Math.hypot(sx[2] - sx[1], sy[2] - sy[1]);
		const len20 = Math.hypot(sx[0] - sx[2], sy[0] - sy[2]);
		const twoArea = Math.abs(area);
		const col = triColour(t);
		const fi = triFacet[t],
			cl = triClass[t];
		for (let py = minY; py <= maxY; py++) {
			const pyc = py + 0.5;
			for (let px = minX; px <= maxX; px++) {
				const pxc = px + 0.5;
				// Barycentric coverage accepts either winding, like CullMode.none.
				const l0 = ((sx[1] - pxc) * (sy[2] - pyc) - (sx[2] - pxc) * (sy[1] - pyc)) / area;
				const l1 = ((sx[2] - pxc) * (sy[0] - pyc) - (sx[0] - pxc) * (sy[2] - pyc)) / area;
				const l2 = 1 - l0 - l1;
				const eps = 1e-4;
				const inside = (l0 >= -eps && l1 >= -eps && l2 >= -eps) || (l0 <= eps && l1 <= eps && l2 <= eps);
				if (!inside) continue;
				const depth = l0 * vv[0].depth + l1 * vv[1].depth + l2 * vv[2].depth;
				const i = py * W + px;
				if (depth <= zbuf[i] + 1e-7) {
					zbuf[i] = depth;
					owner[i] = fi;
					tclass[i] = cl;
					const o = i * 4;
					rgba[o] = Math.round(col[0]);
					rgba[o + 1] = Math.round(col[1]);
					rgba[o + 2] = Math.round(col[2]);
					rgba[o + 3] = 255;
					// distance to nearest edge in px, for interior sampling
					const dd = Math.min(
						(Math.abs(l0) * twoArea) / len12,
						(Math.abs(l1) * twoArea) / len20,
						(Math.abs(l2) * twoArea) / len01
					);
					edgeDist[i] = Math.max(edgeDist[i], dd);
				}
			}
		}
	}
	return { W, H, rgba, owner, tclass, edgeDist, cam };
}

const maskOf = (px) => {
	const m = new Uint8Array(px.w * px.h);
	for (let i = 0; i < px.w * px.h; i++) {
		const o = i * 4;
		m[i] =
			Math.abs(px.data[o] - 6) <= 3 && Math.abs(px.data[o + 1] - 10) <= 3 && Math.abs(px.data[o + 2] - 23) <= 3 ? 0 : 1;
	}
	return m;
};
const bboxOf = (mask, W, H) => {
	let x0 = W,
		x1 = -1,
		y0 = H,
		y1 = -1;
	for (let y = 0; y < H; y++)
		for (let x = 0; x < W; x++) {
			if (mask[y * W + x]) {
				x0 = Math.min(x0, x);
				x1 = Math.max(x1, x);
				y0 = Math.min(y0, y);
				y1 = Math.max(y1, y);
			}
		}
	return x1 < 0 ? null : { x0, x1, y0, y1, w: x1 - x0 + 1, h: y1 - y0 + 1 };
};

function chamferAndIou(maskA, maskB, WA, HA, WB, HB, normSize = 220) {
	// Rasterize both masks into a normalized grid by bbox, then IoU + chamfer.
	const bA = bboxOf(maskA, WA, HA),
		bB = bboxOf(maskB, WB, HB);
	if (!bA || !bB) return { iou: 0, chamfer: Infinity };
	const N = normSize;
	const gridA = new Uint8Array(N * N),
		gridB = new Uint8Array(N * N);
	for (let y = 0; y < N; y++)
		for (let x = 0; x < N; x++) {
			const ax = Math.floor(bA.x0 + ((x + 0.5) / N) * bA.w),
				ay = Math.floor(bA.y0 + ((y + 0.5) / N) * bA.h);
			const bx = Math.floor(bB.x0 + ((x + 0.5) / N) * bB.w),
				by = Math.floor(bB.y0 + ((y + 0.5) / N) * bB.h);
			if (ax >= 0 && ax < WA && ay >= 0 && ay < HA) gridA[y * N + x] = maskA[ay * WA + ax];
			if (bx >= 0 && bx < WB && by >= 0 && by < HB) gridB[y * N + x] = maskB[by * WB + bx];
		}
	let inter = 0,
		uni = 0;
	for (let i = 0; i < N * N; i++) {
		if (gridA[i] && gridB[i]) inter++;
		if (gridA[i] || gridB[i]) uni++;
	}
	const dist = (src, dst) => {
		const d = new Float32Array(N * N).fill(1e9);
		for (let i = 0; i < N * N; i++) if (src[i]) d[i] = 0;
		for (let y = 0; y < N; y++)
			for (let x = 0; x < N; x++) {
				const i = y * N + x;
				if (x > 0) d[i] = Math.min(d[i], d[i - 1] + 1);
				if (y > 0) d[i] = Math.min(d[i], d[i - N] + 1);
			}
		for (let y = N - 1; y >= 0; y--)
			for (let x = N - 1; x >= 0; x--) {
				const i = y * N + x;
				if (x < N - 1) d[i] = Math.min(d[i], d[i + 1] + 1);
				if (y < N - 1) d[i] = Math.min(d[i], d[i + N] + 1);
			}
		let sum = 0,
			n = 0;
		for (let i = 0; i < N * N; i++)
			if (dst[i]) {
				sum += d[i];
				n++;
			}
		return n ? sum / n : Infinity;
	};
	const c1 = dist(gridA, gridB),
		c2 = dist(gridB, gridA);
	return { iou: uni ? inter / uni : 0, chamfer: (c1 + c2) / 2 };
}

const near = (a, b, tol) => Math.abs(a - b) <= tol;
const fail = (msg) => {
	throw new Error(msg);
};
const restCache = {};
const restRaster = (W = 720, H = 480) => (restCache[`${W}x${H}`] ??= rasterize(0, W, H));

// ================= items =================
const items = {
	A1() {
		const gm = JSON.parse(readFileSync(resolve(BUILD, 'gpu-manifest.json'), 'utf8'));
		const pipe = gm.pipelines?.[0];
		if (!pipe) fail('gpu-manifest has no pipeline');
		const vb = pipe.vertex?.buffers?.[0];
		if (!vb || vb.arrayStride !== 36) fail('vertex buffer layout missing or wrong stride');
		const formats = vb.attributes.map((a) => `${a.format}@${a.shaderLocation}:${a.offset}`);
		const want = ['float32x3@0:0', 'float32x3@1:12', 'float32x3@2:24'];
		if (JSON.stringify(formats) !== JSON.stringify(want)) fail(`vertex attributes ${formats}`);
		const ds = pipe.depthStencil;
		if (!ds || ds.format !== 'depth32float' || ds.depthWriteEnabled !== true) fail('depth attachment missing');
		const vbBytes = readFileSync(resolve(RIVE, 'favicon-vertices.bin')).length;
		const ibBytes = readFileSync(resolve(RIVE, 'favicon-indices.bin')).length;
		if (vbBytes !== VERTS * 36) fail(`vertex blob ${vbBytes} != ${VERTS * 36}`);
		if (ibBytes !== IDX.length * 2) fail(`index blob ${ibBytes} != ${IDX.length * 2}`);
		const asSrc = readFileSync(resolve(RIVE, 'favicon_mesh.as'), 'utf8');
		const vc = Number(/VERTEX_COUNT: u32 = (\d+)/.exec(asSrc)[1]);
		const ic = Number(/INDEX_COUNT: u32 = (\d+)/.exec(asSrc)[1]);
		if (vc !== VERTS || ic !== IDX.length) fail('generated constants diverge from provider geometry');
		return `pipeline vertex layout 36B/3attrs, depth32float write=on, blobs ${vbBytes}B+${ibBytes}B, counts ${VERTS}/${IDX.length} from provider`;
	},

	A2() {
		const W = 720,
			H = 480;
		const cap = pngPixels(resolve(BUILD, 'canonical-rest.png'));
		if (cap.w !== W || cap.h !== H) fail(`rest capture ${cap.w}x${cap.h}`);
		const ref = restRaster(W, H);
		const facets = manifest.facets;
		const perFacet = facets.map(() => ({ ok: 0, total: 0 }));
		// Interior samples: pixels owned by the facet's front faces, >1.2px from edges.
		for (let i = 0; i < W * H; i++) {
			if (ref.owner[i] < 0 || ref.tclass[i] !== 0 || ref.edgeDist[i] < 1.2) continue;
			const fi = ref.owner[i];
			perFacet[fi].total++;
			if (perFacet[fi].total % 7 !== 0) continue; // subsample
			const o = i * 4;
			const want = hexRgb(facetFill[fi]);
			if (near(cap.data[o], want[0], 4) && near(cap.data[o + 1], want[1], 4) && near(cap.data[o + 2], want[2], 4))
				perFacet[fi].ok++;
		}
		let worst = 1,
			checked = 0;
		facets.forEach((f, fi) => {
			const s = perFacet[fi];
			if (s.total === 0) fail(`${f.id}: no interior front samples`);
			const rate = s.ok / Math.max(1, Math.ceil(s.total / 7));
			worst = Math.min(worst, rate);
			if (rate < 0.9) fail(`${f.id}: fill match ${(rate * 100).toFixed(1)}%`);
			checked += Math.ceil(s.total / 7);
		});
		// Background sanity away from the object.
		let bgOk = 0,
			bgN = 0;
		for (let i = 0; i < W * H; i += 37) {
			if (ref.owner[i] >= 0) continue;
			bgN++;
			const o = i * 4;
			if (near(cap.data[o], 6, 3) && near(cap.data[o + 1], 10, 3) && near(cap.data[o + 2], 23, 3)) bgOk++;
		}
		if (bgN === 0 || bgOk / bgN < 0.98) fail(`background mismatch ${bgOk}/${bgN}`);
		return `all ${facets.length} facet fills verified at interior samples (worst ${(worst * 100).toFixed(1)}%), ${checked} samples, bg ${bgOk}/${bgN}`;
	},

	A3() {
		const cap = pngPixels(resolve(BUILD, 'canonical-rest.png'));
		const tmp = '/tmp/x2-fallback.png';
		execFileSync('rsvg-convert', ['-w', '1024', resolve(GEN, 'fallback.svg'), '-o', tmp]);
		const svg = pngPixels(tmp);
		const mCap = maskOf(cap),
			mSvg = (() => {
				const m = new Uint8Array(svg.w * svg.h);
				for (let i = 0; i < svg.w * svg.h; i++) m[i] = svg.data[i * 4 + 3] > 16 ? 1 : 0;
				return m;
			})();
		const r = chamferAndIou(mCap, mSvg, cap.w, cap.h, svg.w, svg.h);
		if (r.iou < 0.9) fail(`silhouette IoU ${r.iou.toFixed(4)} < 0.9`);
		if (r.chamfer > 2.5) fail(`mean edge distance ${r.chamfer.toFixed(3)}px > 2.5`);
		return `rest capture vs SVG raster: IoU ${r.iou.toFixed(4)}, chamfer ${r.chamfer.toFixed(3)}px (normalised 220 grid)`;
	},

	A4() {
		const W = 720,
			H = 480,
			T = 3.5;
		const cap = pngPixels(resolve(BUILD, 'canonical-oblique.png'));
		const ref = rasterize(T, W, H);
		const counts = [0, 0, 0];
		for (let i = 0; i < W * H; i++) if (ref.owner[i] >= 0) counts[ref.tclass[i]]++;
		if (counts[1] < 300 || counts[2] < 300) fail(`oblique reference back=${counts[1]} side=${counts[2]} too small`);
		// Sample predicted back/side pixels; the capture must show the shaded tone.
		let okB = 0,
			nB = 0,
			okS = 0,
			nS = 0;
		const wantB = new Map(),
			wantS = new Map();
		for (let i = 0; i < W * H; i++) {
			if (ref.owner[i] < 0 || !(ref.edgeDist[i] >= 2.0)) continue;
			const fi = ref.owner[i],
				cl = ref.tclass[i];
			const key = `${fi}:${cl}`;
			const want = hexRgb(facetFill[fi]).map((c, k) => Math.round(c * SHADE[cl][k]));
			if (cl === 1) {
				if (!wantB.has(key)) wantB.set(key, { want, pts: [] });
				wantB.get(key).pts.push(i);
			} else if (cl === 2) {
				if (!wantS.has(key)) wantS.set(key, { want, pts: [] });
				wantS.get(key).pts.push(i);
			}
		}
		// Walls of adjacent facets can meet at near-equal depth, so the exact
		// winning facet is rasterizer-dependent. The claim under test is that
		// back faces and side walls exist: accept any facet's tone of the
		// predicted class, still within the 3x3 neighbourhood.
		const tones = [1, 2].map((cl) =>
			manifest.facets.map((f) => hexRgb(f.fill).map((c, k) => Math.round(c * SHADE[cl][k])))
		);
		const matchAny = (rgb, cl) =>
			tones[cl - 1].some((w) => near(rgb[0], w[0], 6) && near(rgb[1], w[1], 6) && near(rgb[2], w[2], 6));
		const misses = [];
		const check = (map, isBack) => {
			const cl = isBack ? 1 : 2;
			for (const { pts } of map.values()) {
				const step = Math.max(1, Math.floor(pts.length / 4));
				for (let k = 0; k < pts.length; k += step) {
					const i = pts[k],
						px = i % W,
						py = Math.floor(i / W);
					let good = false;
					for (let dy = -1; dy <= 1 && !good; dy++) {
						for (let dx = -1; dx <= 1 && !good; dx++) {
							const xx = px + dx,
								yy = py + dy;
							if (xx < 0 || xx >= W || yy < 0 || yy >= H) continue;
							const o = (yy * W + xx) * 4;
							good = matchAny([cap.data[o], cap.data[o + 1], cap.data[o + 2]], cl);
						}
					}
					if (isBack) {
						nB++;
						if (good) okB++;
					} else {
						nS++;
						if (good) okS++;
						else if (misses.length < 8) {
							const o = i * 4;
							misses.push(
								`px(${px},${py}) got[${cap.data[o]},${cap.data[o + 1]},${cap.data[o + 2]}] fi${ref.owner[i]} d${ref.edgeDist[i].toFixed(1)}`
							);
						}
					}
				}
			}
		};
		check(wantB, true);
		check(wantS, false);
		if (nB === 0 || okB / nB < 0.85) fail(`back-face pixels match ${okB}/${nB}`);
		if (nS === 0 || okS / nS < 0.85) fail(`side-wall pixels match ${okS}/${nS} misses: ${misses.join(' ; ')}`);
		return `oblique t=${T}s: reference back=${counts[1]} side=${counts[2]} px; capture matches back ${okB}/${nB}, side ${okS}/${nS}`;
	},

	A5() {
		const d = manifest.depth;
		if (!d || d.policy !== 'sqrt-relative-area') fail('depth policy not declared');
		const areas = manifest.facets.map((f) => f.area);
		const maxArea = Math.max(...areas);
		let worst = 0,
			deepest = null;
		manifest.facets.forEach((f) => {
			const expected = d.minimum + (d.maximum - d.minimum) * Math.sqrt(f.area / maxArea);
			worst = Math.max(worst, Math.abs(f.depth - expected));
			if (!deepest || f.depth > deepest.depth) deepest = f;
		});
		const biggest = manifest.facets[areas.indexOf(maxArea)];
		if (deepest.id !== biggest.id) fail(`deepest facet ${deepest.id} != largest-area ${biggest.id}`);
		if (worst > 1e-6) fail(`depth formula deviation ${worst}`);
		return `depth = ${d.minimum}+(${d.maximum}-${d.minimum})*sqrt(area/max): max dev ${worst.toExponential(1)}, largest facet ${biggest.id} deepest`;
	},

	A6() {
		for (const [name, vw, vh] of [
			['canonical-narrow.png', 400, 800],
			['canonical-wide.png', 1200, 400],
		]) {
			const cap = pngPixels(resolve(BUILD, name));
			if (cap.w !== vw || cap.h !== vh) fail(`${name} is ${cap.w}x${cap.h}, expected ${vw}x${vh}`);
			const m = maskOf(cap);
			const bb = bboxOf(m, vw, vh);
			if (!bb) fail(`${name}: empty object`);
			if (bb.x0 < 2 || bb.y0 < 2 || bb.x1 > vw - 3 || bb.y1 > vh - 3)
				fail(`${name}: object clipped ${JSON.stringify(bb)}`);
			const ref = rasterize(0, vw, vh);
			const rbb = bboxOf(
				Array.from(ref.owner, (o) => (o >= 0 ? 1 : 0)),
				vw,
				vh
			);
			if (!rbb) fail(`${name}: reference empty`);
			const capAspect = bb.w / bb.h,
				refAspect = rbb.w / rbb.h;
			if (Math.abs(Math.log(capAspect / refAspect)) > 0.08)
				fail(`${name}: aspect distortion ${capAspect.toFixed(3)} vs ${refAspect.toFixed(3)}`);
			// silhouette agreement at this aspect
			const refMask = new Uint8Array(vw * vh);
			for (let i = 0; i < vw * vh; i++) refMask[i] = ref.owner[i] >= 0 ? 1 : 0;
			const r = chamferAndIou(m, refMask, vw, vh, vw, vh);
			if (r.iou < 0.85) fail(`${name}: silhouette IoU ${r.iou.toFixed(4)} vs reference`);
		}
		return 'narrow 400x800 and wide 1200x400 captures contain the object, aspect within 8% of reference, IoU>=0.85';
	},

	A7() {
		const W = 720,
			H = 480;
		const cap = pngPixels(resolve(BUILD, 'canonical-rest.png'));
		const m = maskOf(cap);
		const cam = camera(0, W / H);
		const fixtures = [
			['front-centre', [CENTER[0], CENTER[1], bounds.maxZ]],
			['back-centre', [CENTER[0], CENTER[1], bounds.minZ]],
			['front-top-right', [bounds.maxX, bounds.maxY, bounds.maxZ]],
			['back-bottom-left', [bounds.minX, bounds.minY, bounds.minZ]],
		];
		const rows = [];
		for (const [name, p] of fixtures) {
			const v = cam.view(p);
			const pr = cam.project(v);
			const px = Math.round(((pr.ndcX + 1) / 2) * W),
				py = Math.round((1 - (pr.ndcY + 1) / 2) * H);
			rows.push(
				`${name}: appZ=${p[2].toFixed(4)} viewZ=${v[2].toFixed(4)} clipZ=${pr.depth.toFixed(4)} ndc=(${pr.ndcX.toFixed(3)},${pr.ndcY.toFixed(3)}) px=(${px},${py})`
			);
			if (v[2] >= 0) fail(`${name}: viewZ ${v[2]} behind camera`);
			if (pr.depth < -1e-6 || pr.depth > 1 + 1e-6) fail(`${name}: depth ${pr.depth} outside [0,1]`);
			if (Math.abs(pr.ndcX) > 1.05 || Math.abs(pr.ndcY) > 1.05) fail(`${name}: outside frustum`);
			if (px >= 0 && px < W && py >= 0 && py < H && name === 'front-centre') {
				// centre of the object must land on object, not background
				let hit = 0,
					n = 0;
				for (let dy = -2; dy <= 2; dy++)
					for (let dx = -2; dx <= 2; dx++) {
						const xx = px + dx,
							yy = py + dy;
						if (xx >= 0 && xx < W && yy >= 0 && yy < H) {
							n++;
							if (m[yy * W + xx]) hit++;
						}
					}
				if (hit / n < 0.5) fail(`${name}: projected centre lands off-object (${hit}/${n})`);
			}
		}
		// depth ordering: the front fixture must be nearer than the back one.
		const dFront = cam.project(cam.view(fixtures[0][1])).depth;
		const dBack = cam.project(cam.view(fixtures[1][1])).depth;
		if (!(dFront < dBack)) fail(`depth order front ${dFront} !< back ${dBack}`);
		return `world→view→clip→depth distinct per fixture; front depth ${dFront.toFixed(4)} < back ${dBack.toFixed(4)}; ${rows.join(' | ')}`;
	},

	A8() {
		let maxLenErr = 0,
			sidePerp = 0,
			sideTot = 0,
			counts = [0, 0, 0];
		for (let v = 0; v < VERTS; v++) {
			const nx = NRM[v * 3],
				ny = NRM[v * 3 + 1],
				nz = NRM[v * 3 + 2];
			maxLenErr = Math.max(maxLenErr, Math.abs(Math.hypot(nx, ny, nz) - 1));
			const fi = vertexFacet[v];
			const cx = manifest.facets[fi].centroid[0],
				cy = manifest.facets[fi].centroid[1];
			if (nz > 0.5) counts[0]++;
			else if (nz < -0.5) counts[1]++;
			else {
				counts[2]++;
				sideTot++;
				const rx = POS[v * 3] - cx,
					ry = POS[v * 3 + 1] - cy;
				const rl = Math.hypot(rx, ry);
				if (rl > 1e-6 && (nx * rx + ny * ry) / (Math.hypot(nx, ny) * rl) > 0) sidePerp++;
			}
		}
		if (maxLenErr > 1e-3) fail(`non-unit normal ${maxLenErr}`);
		if (counts[0] === 0 || counts[1] === 0 || counts[2] === 0) fail(`missing surface class ${counts}`);
		if (sidePerp / sideTot < 0.9) fail(`side normals outward ${((sidePerp / sideTot) * 100).toFixed(1)}%`);
		// front/back axis alignment: |nx|,|ny| ~ 0 on flat faces
		let axisErr = 0;
		for (let v = 0; v < VERTS; v += 7) {
			const nz = NRM[v * 3 + 2];
			if (Math.abs(nz) > 0.5) axisErr = Math.max(axisErr, Math.hypot(NRM[v * 3], NRM[v * 3 + 1]));
		}
		if (axisErr > 1e-3) fail(`front/back normal not axis-aligned ${axisErr}`);
		return `normals unit (max err ${maxLenErr.toExponential(1)}), classes f/b/s=${counts}, side outward ${sidePerp}/${sideTot}, axis err ${axisErr.toExponential(1)}`;
	},
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	const only = process.argv[2];
	const ids = only ? [only] : Object.keys(items);
	let failed = false;
	for (const id of ids) {
		try {
			const summary = items[id]();
			console.log(`PASS ${id}: ${summary}`);
		} catch (error) {
			failed = true;
			console.error(`FAIL ${id}: ${error.message}`);
		}
	}
	process.exitCode = failed ? 1 : 0;
}
