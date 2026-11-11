#!/usr/bin/env node
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

const here = resolve(import.meta.dirname),
	root = resolve(here, '../..'),
	cli = resolve(here, 'cli.mjs'),
	config = resolve(here, 'fixtures/config.json');
const sources = {
	canonical: resolve(root, 'docs/assets/icons/fava-mark-static.svg'),
	fixture: resolve(here, 'fixtures/concave-cubic.svg'),
};
const hash = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
function build(source) {
	const out = mkdtempSync(resolve(tmpdir(), 'verify-x1-'));
	execFileSync(process.execPath, [cli, '--input', source, '--output', out, '--config', config], { stdio: 'pipe' });
	return {
		out,
		manifest: JSON.parse(readFileSync(resolve(out, 'manifest.json'))),
		geometry: JSON.parse(readFileSync(resolve(out, 'geometry.json'))),
		scene: JSON.parse(readFileSync(resolve(out, 'rive-scene.fragment.json'))),
	};
}
const c1 = build(sources.canonical),
	c2 = build(sources.canonical),
	f1 = build(sources.fixture),
	f2 = build(sources.fixture),
	cfg = JSON.parse(readFileSync(config));
const files = ['manifest.json', 'geometry.json', 'fallback.svg', 'rive-scene.fragment.json'];
function deterministic(a, b) {
	for (const file of files) assert.equal(hash(resolve(a.out, file)), hash(resolve(b.out, file)), file);
}
function triangleArea(pos, ia, ib, ic) {
	const a = pos.slice(ia * 3, ia * 3 + 3),
		b = pos.slice(ib * 3, ib * 3 + 3),
		c = pos.slice(ic * 3, ic * 3 + 3);
	return Math.hypot(...cross3(sub(b, a), sub(c, a))) / 2;
}
const sub = (a, b) => a.map((v, i) => v - b[i]);
const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
function validateMesh(r) {
	const { manifest: m, geometry: g } = r;
	assert.equal(g.schema, 'rive-animascript-3d/generated-provider/v1');
	assert.equal(g.positions.length, m.geometry.vertexCount * 3);
	assert.equal(g.normals.length, g.positions.length);
	assert.equal(g.indices.length, m.geometry.indexCount);
	assert.ok(g.indices.every((i) => Number.isInteger(i) && i >= 0 && i < m.geometry.vertexCount));
	for (let i = 0; i < g.normals.length; i += 3)
		assert.ok(Math.abs(Math.hypot(g.normals[i], g.normals[i + 1], g.normals[i + 2]) - 1) < 1e-8);
	for (const f of m.facets) {
		assert.ok(f.area > 0);
		const own = g.indices.slice(f.mesh.indexStart, f.mesh.indexStart + f.mesh.indexCount);
		assert.ok(
			own.every((i) => i >= f.mesh.vertexStart && i < f.mesh.vertexStart + f.mesh.vertexCount),
			`${f.id} span`
		);
		const frontCount = f.frontTriangleCount * 3,
			paired = own.slice(0, frontCount * 2);
		let area = 0;
		for (let i = 0; i < paired.length; i += 6) {
			area += triangleArea(g.positions, paired[i], paired[i + 1], paired[i + 2]);
			for (const v of paired.slice(i, i + 3)) assert.equal(g.normals[v * 3 + 2], 1);
			for (const v of paired.slice(i + 3, i + 6)) assert.equal(g.normals[v * 3 + 2], -1);
		}
		assert.ok(Math.abs(area - f.area) < Math.max(1e-8, f.area * 1e-7), `${f.id} area`);
		assert.equal(f.mesh.indexCount, frontCount * 2 + f.contourVertexCount * 6);
		assert.ok(f.mesh.indexStart + f.mesh.indexCount <= g.indices.length);
	}
}
function rejects(svg, pattern) {
	const p = resolve(mkdtempSync(resolve(tmpdir(), 'reject-x1-')), 'bad.svg');
	writeFileSync(p, svg);
	assert.throws(() => build(p), pattern);
}
function verifyMalformedAttributeBoundary() {
	for (const [svg, pattern] of [
		[
			'<svg viewBox="0 0 10 10"><path fill="#000" opacity=.5 d="M0 0L2 0L2 2Z"/></svg>',
			/attribute opacity must use a quoted value/,
		],
		[
			'<svg viewBox="0 0 10 10"><path fill="#000" class=x d="M0 0L2 0L2 2Z"/></svg>',
			/attribute class must use a quoted value/,
		],
		[
			'<svg viewBox="0 0 10 10"><path fill="#000" vector-effect=non-scaling-stroke d="M0 0L2 0L2 2Z"/></svg>',
			/attribute vector-effect must use a quoted value/,
		],
		['<svg viewBox=0,0,10,10><path fill="#000" d="M0 0L2 0L2 2Z"/></svg>', /attribute viewBox must use a quoted value/],
		['<svg viewBox="0 0 10 10"><path fill="#000" fill="#fff" d="M0 0L2 0L2 2Z"/></svg>', /duplicate attribute fill/],
		[
			'<svg viewBox="0 0 10 10"><path fill="#000" css:opacity=".5" d="M0 0L2 0L2 2Z"/></svg>',
			/unsupported or unresolved attribute css:opacity/,
		],
		['<svg viewBox="0 0 10 10"><path fill="#000" ??? d="M0 0L2 0L2 2Z"/></svg>', /malformed attribute syntax/],
	])
		rejects(svg, pattern);
}
verifyMalformedAttributeBoundary();
function verifyFlatDocumentBoundary() {
	for (const [svg, pattern] of [
		[
			'<svg viewBox="0 0 10 10"><svg x="5" y="4" width="2" height="2" viewBox="0 0 2 2"><path fill="#000" d="M0 0L2 0L2 2Z"/></svg></svg>',
			/unsupported direct child tag: <svg/,
		],
		[
			'<svg viewBox="0 0 10 10"><svg class="paint" opacity=".5"><path fill="#000" d="M0 0L2 0L2 2Z"/></svg></svg>',
			/unsupported direct child tag: <svg/,
		],
		[
			'<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L2 0L2 2Z"/></svg><svg viewBox="0 0 10 10"><path fill="#fff" d="M0 0L2 0L2 2Z"/></svg>',
			/malformed markup after root|unsupported direct child/,
		],
		['<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L2 0L2 2Z" / ></svg>', /malformed or unsupported direct child/],
		['<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L2 0L2 2Z"//></svg>', /malformed attribute syntax/],
		['<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L2 0L2 2Z" / /></svg>', /malformed attribute syntax/],
		[
			'<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L2 0L2 2Z" id="<!--x-->"/></svg>',
			/unresolved markup in attribute id/,
		],
		[
			'<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L2 0L2 2Z"></path junk></svg>',
			/malformed or unsupported direct child/,
		],
		[
			'<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L2 0L2 2Z"></path></svg>',
			/malformed or unsupported direct child/,
		],
	])
		rejects(svg, pattern);
}
verifyFlatDocumentBoundary();
const checks = {
	A1() {
		assert.equal(c1.manifest.facetCount, 13);
	},
	A2() {
		assert.equal(f1.manifest.facetCount, 2);
		assert.notEqual(f1.manifest.facetCount, c1.manifest.facetCount);
	},
	A3() {
		deterministic(c1, c2);
		deterministic(f1, f2);
	},
	A4() {
		for (const r of [c1, f1]) assert.ok(r.manifest.facets.every((x) => x.area > 0));
	},
	A5() {
		for (const r of [c1, f1]) {
			const max = Math.max(...r.manifest.facets.map((x) => x.area));
			for (const f of r.manifest.facets) {
				const d = cfg.minimumDepth + (cfg.maximumDepth - cfg.minimumDepth) * Math.sqrt(f.area / max);
				assert.ok(Math.abs(d - f.depth) < 1e-9);
			}
		}
	},
	A6() {
		rejects('<svg viewBox="0 0 0 10"><path fill="#000" d="M0 0L2 0L2 2Z"/></svg>', /viewBox/);
		rejects('<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L1 0L2 0Z"/></svg>', /degenerate|collinear/);
	},
	A7() {
		const equal =
				'<svg viewBox="0 0 20 10"><path fill="#000" d="M0 0L5 0L5 5L0 5Z"/><path fill="#fff" transform="translate(10 0)" d="M0 0L5 0L5 5L0 5Z"/></svg>',
			scaled =
				'<svg viewBox="0 0 20 10"><path fill="#000" transform="scale(.5)" d="M0 0L5 0L5 5L0 5Z"/><path fill="#fff" transform="translate(5 0) scale(.5)" d="M0 0L5 0L5 5L0 5Z"/></svg>';
		const r = buildSvg(equal),
			s = buildSvg(scaled);
		assert.equal(r.manifest.facets[0].depth, r.manifest.facets[1].depth);
		assert.deepEqual(
			r.manifest.facets.map((x) => x.depth),
			s.manifest.facets.map((x) => x.depth)
		);
	},
	A8() {
		validateMesh(c1);
		validateMesh(f1);
	},
	A9() {
		for (const [svg, pattern] of [
			['<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0A2 2 0 0 0 2 2Z"/></svg>', /unsupported path syntax/],
			['<svg viewBox="0 0 10 10"><text>x</text></svg>', /text/],
			['<svg viewBox="0 0 10 10"><path style="fill:#000;stroke:#fff" d="M0 0L2 0L2 2Z"/></svg>', /strokes/],
			['<svg viewBox="0 0 10 10"><path fill="#000" fill-rule="banana" d="M0 0L2 0L2 2Z"/></svg>', /fill-rule/],
			['<svg viewBox="0 0 10 10"><path fill="#000" opacity=".5" d="M0 0L2 0L2 2Z"/></svg>', /attribute opacity/],
			['<svg viewBox="0 0 10 10"><path fill="#000" fill-opacity=".5" d="M0 0L2 0L2 2Z"/></svg>', /fill-opacity/],
			['<svg viewBox="0 0 10 10"><path class="paint" fill="#000" d="M0 0L2 0L2 2Z"/></svg>', /attribute class/],
			['<svg viewBox="0 0 10 10" opacity=".5"><path fill="#000" d="M0 0L2 0L2 2Z"/></svg>', /root attribute opacity/],
			['<svg viewBox="0 0 10 10"><path fill="URL(#paint)" d="M0 0L2 0L2 2Z"/></svg>', /paint servers/],
			['<svg viewBox="0 0 10 10"><path style="fill:uRl(#paint)" d="M0 0L2 0L2 2Z"/></svg>', /paint servers/],
			['<svg viewBox="0 0 10 10"><path fill="not-a-color" d="M0 0L2 0L2 2Z"/></svg>', /solid-hex-or-rgb/],
			['<svg viewBox="0 0 10 10"><path fill="#1234567" d="M0 0L2 0L2 2Z"/></svg>', /solid-hex-or-rgb/],
			['<svg viewBox="0 0 10 10"><path fill="#0008" d="M0 0L2 0L2 2Z"/></svg>', /solid-hex-or-rgb/],
			['<svg viewBox="0 0 10 10"><path fill="rgba(0,0,0,.5)" d="M0 0L2 0L2 2Z"/></svg>', /solid-hex-or-rgb/],
			['<svg viewBox="0 0 10 10"><path fill="currentColor" d="M0 0L2 0L2 2Z"/></svg>', /inherited colours/],
			['<svg viewBox="0 0 10 10"><path fill="var(--x)" d="M0 0L2 0L2 2Z"/></svg>', /variables/],
		])
			rejects(svg, pattern);
	},
	A10() {
		rejects('<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L10 10L0 10L10 0Z"/></svg>', /self-intersecting/);
		rejects('<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L10 0L5 0L10 10L0 10Z"/></svg>', /collinear overlap/);
		rejects('<svg viewBox="0 0 10 10"><path fill="#000" d="M0 0L2 0L2 2Z M5 5L7 5L7 7Z"/></svg>', /multiple subpaths/);
		const e = buildSvg('<svg viewBox="0 0 10 10"><path fill="#000" fill-rule="evenodd" d="M0 0L2 0L2 2Z"/></svg>');
		assert.deepEqual(e.manifest.fillRules, ['evenodd']);
		assert.ok(f1.manifest.facets.some((x) => x.contourVertexCount > 6));
	},
	A11() {
		assert.deepEqual(
			c1.manifest.facets.map((x) => x.id),
			Array.from({ length: c1.manifest.facetCount }, (_, i) => `facet-${String(i + 1).padStart(2, '0')}`)
		);
		assert.deepEqual(
			f1.manifest.facets.map((x) => x.id),
			['facet-01', 'facet-02']
		);
	},
	A12() {
		assert.equal(c1.manifest.flattening.method, 'adaptive-de-casteljau-after-affine-bake');
		assert.equal(c1.manifest.flattening.screenTolerancePx, cfg.flattenTolerancePx);
		const r = buildSvg(
				'<svg viewBox="0 0 100000 100000"><path fill="#000" transform="scale(1000 600)" d="M0 0C15 60 85 -20 100 40L100 50L0 50Z"/></svg>'
			),
			f = r.manifest.facets[0],
			p = r.geometry.positions,
			poly = Array.from({ length: f.contourVertexCount }, (_, i) => [p[i * 3], p[i * 3 + 1]]);
		let max = 0;
		for (let k = 0; k <= 10000; k++) {
			const t = k / 10000,
				u = 1 - t,
				q = [
					(3 * u * u * t * 15 + 3 * u * t * t * 85 + t * t * t * 100) * 0.01 - 0.5,
					0.5 - (3 * u * u * t * 60 + 3 * u * t * t * -20 + t * t * t * 40) * 0.006,
				];
			let best = Infinity;
			for (let i = 0; i < poly.length; i++) {
				const a = poly[i],
					b = poly[(i + 1) % poly.length],
					dx = b[0] - a[0],
					dy = b[1] - a[1],
					s = Math.max(0, Math.min(1, ((q[0] - a[0]) * dx + (q[1] - a[1]) * dy) / (dx * dx + dy * dy)));
				best = Math.min(best, Math.hypot(q[0] - a[0] - s * dx, q[1] - a[1] - s * dy));
			}
			max = Math.max(max, best);
		}
		assert.ok(
			max * 100000 * cfg.maximumDisplayScale <= cfg.flattenTolerancePx * 1.01,
			`transformed deviation ${max * 100000 * cfg.maximumDisplayScale}`
		);
	},
	A13() {
		const m = c1.manifest;
		assert.deepEqual(m.coordinateSystem, {
			sourceY: 'down',
			worldHandedness: 'right',
			cameraForward: 'negative-z',
			frontWinding: 'ccw',
			matrixOrder: 'column-vector',
			normalization: 'viewBox-max-dimension-centered',
		});
		assert.equal(m.centroidMethod, 'signed-polygon-area');
		assert.equal(m.windingNormalization, 'ccw-after-svg-y-inversion');
		assert.deepEqual(m.paint, {
			grammar: 'solid-hex-or-rgb/v1',
			opacity: 'opaque-only',
			styleProperties: ['fill', 'fill-rule', 'stroke:none'],
			unresolvedClasses: 'reject',
		});
		assert.deepEqual(m.fillRules, [...new Set(m.facets.map((f) => f.fillRule))]);
		assert.ok(m.facets.every((f) => m.supportedFillRules.includes(f.fillRule)));
		assert.equal(c1.scene.schema, 'rive-animascript-3d/v1');
		assert.equal(c1.scene.geometry.providers[0].kind, 'generated-package');
		validateMesh(c1);
	},
};
function buildSvg(svg) {
	const p = resolve(mkdtempSync(resolve(tmpdir(), 'source-x1-')), 'source.svg');
	writeFileSync(p, svg);
	return build(p);
}
const only = process.argv[2];
const ids = only ? [only] : Object.keys(checks);
for (const id of ids) {
	if (!checks[id]) throw new Error(`unknown acceptance ${id}`);
	checks[id]();
	console.log(`PASS ${id}: independent X1 acceptance verified`);
}
