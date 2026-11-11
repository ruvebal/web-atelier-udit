import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export const SCHEMA = 'svg-to-rive-3d/v1';
export const COMPILER_VERSION = '1.0.9';
const EPS = 1e-10;
const NUMBER = /^[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?$/;
const nonXmlChar = /[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/u;

export function sha256(data) {
	return createHash('sha256').update(data).digest('hex');
}
const round = (n) => Number(n.toFixed(10));
const isXmlSpace = (ch) => ch === ' ' || ch === '\t' || ch === '\r' || ch === '\n';
const xmlTrim = (value) => value.replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, '');
const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
const distLine = (p, a, b) => Math.abs(cross(a, b, p)) / Math.max(Math.hypot(b[0] - a[0], b[1] - a[1]), EPS);

function attrs(text, context = 'path') {
	const out = Object.create(null);
	let i = 0;
	while (i < text.length) {
		while (isXmlSpace(text[i])) i++;
		if (i >= text.length) break;
		const name = /^[A-Za-z_][A-Za-z0-9_.:-]*/.exec(text.slice(i));
		if (!name) throw new Error(`${context}: malformed attribute syntax`);
		const key = name[0];
		i += key.length;
		while (isXmlSpace(text[i])) i++;
		if (text[i] !== '=') throw new Error(`${context}: attribute ${key} must use a quoted value`);
		i++;
		while (isXmlSpace(text[i])) i++;
		const quote = text[i];
		if (quote !== '"' && quote !== "'") throw new Error(`${context}: attribute ${key} must use a quoted value`);
		i++;
		const end = text.indexOf(quote, i);
		if (end < 0) throw new Error(`${context}: unterminated attribute ${key}`);
		if (Object.hasOwn(out, key)) throw new Error(`${context}: duplicate attribute ${key}`);
		const value = text.slice(i, end);
		if (/[<&>]/.test(value)) throw new Error(`${context}: unresolved markup in attribute ${key}`);
		if (nonXmlChar.test(value)) throw new Error(`${context}: non-XML character in attribute ${key}`);
		out[key] = value;
		i = end + 1;
	}
	return out;
}
function stripComments(source) {
	let out = '',
		i = 0,
		inTag = false,
		quote = null;
	while (i < source.length) {
		if (!inTag && source.startsWith('<!--', i)) {
			const end = source.indexOf('-->', i + 4);
			if (end < 0) throw new Error('unterminated XML comment');
			const body = source.slice(i + 4, end);
			if (body.includes('--') || body.endsWith('-')) throw new Error('malformed XML comment');
			if (nonXmlChar.test(body)) throw new Error('non-XML character in comment');
			i = end + 3;
			continue;
		}
		const ch = source[i];
		out += ch;
		if (inTag) {
			if (quote) {
				if (ch === quote) quote = null;
			} else if (ch === '"' || ch === "'") quote = ch;
			else if (ch === '>') inTag = false;
		} else if (ch === '<') inTag = true;
		i++;
	}
	return out;
}
function readTags(source) {
	const tags = [];
	let i = 0;
	while (i < source.length) {
		while (i < source.length && isXmlSpace(source[i])) i++;
		if (i >= source.length) break;
		if (source[i] !== '<') throw new Error('text or malformed markup outside supported tags');
		let j = i + 1,
			quote = null;
		while (j < source.length) {
			const ch = source[j];
			if (quote) {
				if (ch === quote) quote = null;
			} else if (ch === '"' || ch === "'") quote = ch;
			else if (ch === '>') break;
			j++;
		}
		if (j >= source.length || quote) throw new Error('unterminated tag');
		tags.push(source.slice(i, j + 1));
		i = j + 1;
	}
	return tags;
}
function parseSvgStructure(source) {
	let clean = source;
	const declaration = /^<\?xml[ \t\r\n]([^]*?)\?>[ \t\r\n]*/.exec(clean);
	if (declaration) {
		const body = declaration[1];
		if (nonXmlChar.test(body)) throw new Error('non-XML character in XML declaration');
		if (
			!/^[ \t\r\n]*version[ \t\r\n]*=[ \t\r\n]*("1\.[0-9]+"|'1\.[0-9]+')([ \t\r\n]+encoding[ \t\r\n]*=[ \t\r\n]*("[A-Za-z][A-Za-z0-9._-]*"|'[A-Za-z][A-Za-z0-9._-]*'))?([ \t\r\n]+standalone[ \t\r\n]*=[ \t\r\n]*("(yes|no)"|'(yes|no)'))?[ \t\r\n]*$/.test(
				body
			)
		)
			throw new Error('malformed XML declaration');
		clean = clean.slice(declaration[0].length);
	}
	clean = xmlTrim(stripComments(clean));
	if (/<!DOCTYPE|<!ENTITY|<script\b/i.test(clean)) throw new Error('DOCTYPE, entities, and scripts are forbidden');
	const tags = readTags(clean);
	if (tags.length < 3) throw new Error('SVG V1 requires one root and at least one path');
	const rootTag = tags[0],
		rootBoundary = rootTag[4];
	if (
		!rootTag.startsWith('<svg') ||
		!(rootBoundary === '>' || rootBoundary === '/' || isXmlSpace(rootBoundary)) ||
		rootTag.startsWith('</') ||
		/\/[ \t\r\n]*>$/.test(rootTag)
	)
		throw new Error('SVG V1 requires exactly one non-self-closing root svg');
	const root = rootTag.slice(4, -1);
	if (tags.at(-1) !== '</svg>') throw new Error('SVG V1 requires the exact </svg> end tag');
	const paths = [];
	for (const tag of tags.slice(1, -1)) {
		const boundary = tag[5];
		if (!tag.startsWith('<path') || !(boundary === '/' || isXmlSpace(boundary)) || !tag.endsWith('/>'))
			throw new Error(`malformed or unsupported direct child tag: ${tag.slice(0, 80)}`);
		paths.push(tag.slice(5, -2));
	}
	if (!paths.length) throw new Error('no eligible path facets');
	return { root, paths, clean };
}
function validateSolidFill(value, pathNumber) {
	if (/url[ \t\r\n]*\(|var[ \t\r\n]*\(|currentcolor/i.test(value))
		throw new Error(`path ${pathNumber}: paint servers, variables, and inherited colours are unsupported`);
	if (/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) return value;
	const fn = /^rgb\(([^)]*)\)$/i.exec(value);
	if (fn) {
		const parts = fn[1].split(',').map((x) => xmlTrim(x));
		if (parts.length === 3 && parts.every((x) => /^\d+(?:\.\d+)?$/.test(x) && Number(x) >= 0 && Number(x) <= 255))
			return value;
	}
	throw new Error(`path ${pathNumber}: fill must use the solid-hex-or-rgb/v1 grammar`);
}

function multiply(a, b) {
	return [
		a[0] * b[0] + a[2] * b[1],
		a[1] * b[0] + a[3] * b[1],
		a[0] * b[2] + a[2] * b[3],
		a[1] * b[2] + a[3] * b[3],
		a[0] * b[4] + a[2] * b[5] + a[4],
		a[1] * b[4] + a[3] * b[5] + a[5],
	];
}
function transformMatrix(value) {
	let out = [1, 0, 0, 1, 0, 0];
	if (value === undefined) return out;
	value = xmlTrim(value);
	if (!value) throw new Error('empty transform attribute');
	let i = 0;
	const n = value.length,
		number = () => {
			const m = /^[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/.exec(value.slice(i));
			if (!m) throw new Error(`invalid transform number in ${value}`);
			i += m[0].length;
			return Number(m[0]);
		},
		ws = () => {
			while (i < n && isXmlSpace(value[i])) i++;
		};
	ws();
	let functions = 0;
	while (i < n) {
		const name = /^[A-Za-z]+/.exec(value.slice(i));
		if (!name) throw new Error(`unsupported transform syntax in ${value}`);
		i += name[0].length;
		const fn = name[0];
		if (!['matrix', 'translate', 'scale', 'rotate'].includes(fn)) throw new Error(`unsupported transform function ${fn}`);
		ws();
		if (value[i] !== '(') throw new Error(`malformed transform function ${fn}`);
		i++;
		ws();
		if (value[i] === ')') throw new Error(`empty transform arguments in ${value}`);
		const args = [];
		let closed = false;
		while (i < n && !closed) {
			args.push(number());
			ws();
			if (value[i] === ',') {
				i++;
				ws();
				if (i >= n || value[i] === ')') throw new Error(`trailing transform separator in ${value}`);
				continue;
			}
			if (value[i] === ')') {
				i++;
				closed = true;
				break;
			}
		}
		if (!closed) throw new Error(`unterminated transform function ${fn}`);
		if (args.some((x) => !Number.isFinite(x))) throw new Error(`invalid transform: ${value}`);
		let next;
		if (fn === 'matrix' && args.length === 6) next = args;
		else if (fn === 'translate' && (args.length === 1 || args.length === 2)) next = [1, 0, 0, 1, args[0], args[1] ?? 0];
		else if (fn === 'scale' && (args.length === 1 || args.length === 2)) next = [args[0], 0, 0, args[1] ?? args[0], 0, 0];
		else if (fn === 'rotate' && (args.length === 1 || args.length === 3)) {
			const q = (args[0] * Math.PI) / 180,
				c = Math.cos(q),
				s = Math.sin(q),
				r = [c, s, -s, c, 0, 0];
			next =
				args.length === 3 ? multiply(multiply([1, 0, 0, 1, args[1], args[2]], r), [1, 0, 0, 1, -args[1], -args[2]]) : r;
		} else throw new Error(`invalid transform arity: ${fn}(${args.join(' ')})`);
		out = multiply(out, next);
		functions++;
		let separator = false,
			comma = false;
		while (i < n && isXmlSpace(value[i])) {
			i++;
			separator = true;
		}
		if (i < n && value[i] === ',') {
			i++;
			comma = true;
			separator = true;
			ws();
		}
		if (i >= n) {
			if (comma) throw new Error(`trailing transform separator in ${value}`);
			break;
		}
		if (!separator) throw new Error(`missing transform separator in ${value}`);
	}
	if (!functions) throw new Error(`invalid transform: ${value}`);
	return out;
}
const tx = (p, m) => [m[0] * p[0] + m[2] * p[1] + m[4], m[1] * p[0] + m[3] * p[1] + m[5]];

function flattenCubic(p0, p1, p2, p3, tol, out, depth = 0) {
	if (depth > 24) throw new Error('cubic flattening exceeded recursion limit');
	if (Math.max(distLine(p1, p0, p3), distLine(p2, p0, p3)) <= tol) {
		out.push(p3);
		return;
	}
	const a = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2],
		b = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2],
		c = [(p2[0] + p3[0]) / 2, (p2[1] + p3[1]) / 2];
	const d = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2],
		e = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2],
		f = [(d[0] + e[0]) / 2, (d[1] + e[1]) / 2];
	flattenCubic(p0, a, d, f, tol, out, depth + 1);
	flattenCubic(f, e, c, p3, tol, out, depth + 1);
}

export function parsePath(d, tolerance, pointTransform = (p) => p) {
	for (let k = 0; k < d.length; k++) {
		if (d[k] !== ',') continue;
		let a = k - 1;
		while (a >= 0 && isXmlSpace(d[a])) a--;
		let b = k + 1;
		while (b < d.length && isXmlSpace(d[b])) b++;
		if (a < 0 || !/[0-9.]/.test(d[a]) || b >= d.length || !/[0-9+.-]/.test(d[b]))
			throw new Error('misplaced comma in path data');
	}
	const tokens = [...d.matchAll(/[MLCZmlcz]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g)].map((m) => m[0]);
	const residue = d.replace(/[MLCZmlcz]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?|[ \t\r\n,]+/g, '');
	if (residue) throw new Error(`unsupported path syntax near ${residue.slice(0, 16)}`);
	let i = 0,
		cmd = null,
		p = [0, 0],
		start = null,
		subpaths = 0;
	const out = [];
	const num = () => {
		if (i >= tokens.length || /^[A-Za-z]$/.test(tokens[i])) throw new Error(`missing coordinates for ${cmd}`);
		const value = Number(tokens[i++]);
		if (!Number.isFinite(value)) throw new Error(`non-finite coordinate for ${cmd}`);
		return value;
	};
	while (i < tokens.length) {
		if (/^[A-Za-z]$/.test(tokens[i])) cmd = tokens[i++];
		if (!cmd) throw new Error('path must begin with M');
		const rel = cmd === cmd.toLowerCase(),
			up = cmd.toUpperCase();
		if (up === 'M') {
			const q = [num(), num()];
			p = rel ? [p[0] + q[0], p[1] + q[1]] : q;
			if (start && out.length) throw new Error('multiple subpaths/holes are not supported in v1');
			start = p;
			subpaths++;
			out.push(pointTransform(p));
			cmd = rel ? 'l' : 'L';
		} else if (up === 'L') {
			const q = [num(), num()];
			p = rel ? [p[0] + q[0], p[1] + q[1]] : q;
			out.push(pointTransform(p));
		} else if (up === 'C') {
			const v = [num(), num(), num(), num(), num(), num()];
			const a = rel ? [p[0] + v[0], p[1] + v[1]] : [v[0], v[1]],
				b = rel ? [p[0] + v[2], p[1] + v[3]] : [v[2], v[3]],
				c = rel ? [p[0] + v[4], p[1] + v[5]] : [v[4], v[5]];
			flattenCubic(pointTransform(p), pointTransform(a), pointTransform(b), pointTransform(c), tolerance, out);
			p = c;
		} else if (up === 'Z') {
			if (!start) throw new Error('close without move');
			p = start;
			cmd = null;
			if (i < tokens.length && !/^[A-Za-z]$/.test(tokens[i])) throw new Error('coordinates after close');
			if (i < tokens.length && /^[A-Za-z]$/.test(tokens[i]) && !/^[Mm]$/.test(tokens[i]))
				throw new Error('commands after closepath are not supported in v1');
		} else throw new Error(`unsupported path command ${cmd}`);
	}
	if (subpaths !== 1 || !start || cmd !== null) throw new Error('path must contain one closed contour');
	if (out.some((p) => !Number.isFinite(p[0]) || !Number.isFinite(p[1]))) throw new Error('non-finite path coordinates');
	if (out.length > 1 && Math.hypot(out.at(-1)[0] - out[0][0], out.at(-1)[1] - out[0][1]) < EPS) out.pop();
	return out;
}

export function signedArea(p) {
	let s = 0;
	for (let i = 0; i < p.length; i++) {
		const q = p[(i + 1) % p.length];
		s += p[i][0] * q[1] - q[0] * p[i][1];
	}
	return s / 2;
}
function onSegment(a, b, p) {
	return (
		Math.abs(cross(a, b, p)) <= EPS &&
		p[0] >= Math.min(a[0], b[0]) - EPS &&
		p[0] <= Math.max(a[0], b[0]) + EPS &&
		p[1] >= Math.min(a[1], b[1]) - EPS &&
		p[1] <= Math.max(a[1], b[1]) + EPS
	);
}
function segmentsIntersect(a, b, c, d) {
	const x1 = cross(a, b, c),
		x2 = cross(a, b, d),
		x3 = cross(c, d, a),
		x4 = cross(c, d, b);
	return (
		(x1 * x2 < -EPS && x3 * x4 < -EPS) ||
		onSegment(a, b, c) ||
		onSegment(a, b, d) ||
		onSegment(c, d, a) ||
		onSegment(c, d, b)
	);
}
function assertSimple(p) {
	for (let i = 0; i < p.length; i++) {
		const a = p[(i - 1 + p.length) % p.length],
			b = p[i],
			c = p[(i + 1) % p.length],
			u = [b[0] - a[0], b[1] - a[1]],
			v = [c[0] - b[0], c[1] - b[1]];
		if (Math.abs(u[0] * v[1] - u[1] * v[0]) <= EPS && u[0] * v[0] + u[1] * v[1] < -EPS)
			throw new Error('self-intersecting collinear overlap is not supported');
	}
	for (let i = 0; i < p.length; i++)
		for (let j = i + 1; j < p.length; j++) {
			if (j === i || j === (i + 1) % p.length || i === (j + 1) % p.length) continue;
			if (segmentsIntersect(p[i], p[(i + 1) % p.length], p[j], p[(j + 1) % p.length]))
				throw new Error('self-intersecting contour is not supported');
		}
}
function pointTri(p, a, b, c) {
	return cross(a, b, p) > EPS && cross(b, c, p) > EPS && cross(c, a, p) > EPS;
}
export function triangulate(poly) {
	const ids = poly.map((_, i) => i),
		tris = [];
	let guard = 0;
	while (ids.length > 3) {
		let found = false;
		for (let k = 0; k < ids.length; k++) {
			const a = ids[(k - 1 + ids.length) % ids.length],
				b = ids[k],
				c = ids[(k + 1) % ids.length];
			if (cross(poly[a], poly[b], poly[c]) <= EPS) continue;
			if (ids.some((v) => v !== a && v !== b && v !== c && pointTri(poly[v], poly[a], poly[b], poly[c]))) continue;
			tris.push(a, b, c);
			ids.splice(k, 1);
			found = true;
			break;
		}
		if (!found || guard++ > poly.length * poly.length) throw new Error('contour could not be triangulated');
	}
	tris.push(...ids);
	return tris;
}
function centroid(poly) {
	let x = 0,
		y = 0,
		s = 0;
	for (let i = 0; i < poly.length; i++) {
		const q = poly[(i + 1) % poly.length],
			c = poly[i][0] * q[1] - q[0] * poly[i][1];
		s += c;
		x += (poly[i][0] + q[0]) * c;
		y += (poly[i][1] + q[1]) * c;
	}
	return [x / (3 * s), y / (3 * s)];
}

function extrude(poly, triangles, depth, positions, normals, indices) {
	const base = positions.length / 3;
	for (const p of poly) {
		positions.push(p[0], p[1], 0);
		normals.push(0, 0, 1);
	}
	for (const p of poly) {
		positions.push(p[0], p[1], -depth);
		normals.push(0, 0, -1);
	}
	for (let i = 0; i < triangles.length; i += 3) {
		indices.push(base + triangles[i], base + triangles[i + 1], base + triangles[i + 2]);
		indices.push(
			base + poly.length + triangles[i + 2],
			base + poly.length + triangles[i + 1],
			base + poly.length + triangles[i]
		);
	}
	for (let i = 0; i < poly.length; i++) {
		const j = (i + 1) % poly.length,
			a = poly[i],
			b = poly[j],
			nx = b[1] - a[1],
			ny = -(b[0] - a[0]),
			len = Math.hypot(nx, ny),
			v = positions.length / 3;
		positions.push(a[0], a[1], 0, b[0], b[1], 0, b[0], b[1], -depth, a[0], a[1], -depth);
		for (let k = 0; k < 4; k++) normals.push(nx / len, ny / len, 0);
		indices.push(v, v + 1, v + 2, v, v + 2, v + 3);
	}
}

export function compileSvg(source, config = {}) {
	const structure = parseSvgStructure(source);
	for (const tag of ['text', 'image', 'clipPath', 'mask', 'filter', 'pattern', 'linearGradient', 'radialGradient'])
		if (new RegExp(`<${tag}\\b`, 'i').test(structure.clean)) throw new Error(`unsupported SVG feature: ${tag}`);
	if (/<(?:g|svg)[^>]+transform=/i.test(structure.clean))
		throw new Error('nested/group transforms are not supported in v1');
	const ra = attrs(structure.root, 'svg root'),
		rootAllowed = new Set(['xmlns', 'xmlns:xlink', 'width', 'height', 'viewBox']);
	for (const key of Object.keys(ra))
		if (!rootAllowed.has(key)) throw new Error(`unsupported or unresolved root attribute ${key}`);
	const vbText = xmlTrim(ra.viewBox ?? ''),
		vb = (vbText === '' ? [] : vbText.split(/[ \t\r\n]*,[ \t\r\n]*|[ \t\r\n]+/)).map((x) =>
			NUMBER.test(x) ? Number(x) : NaN
		);
	if (vb.length !== 4 || vb.some((x) => !Number.isFinite(x)) || vb[2] <= 0 || vb[3] <= 0)
		throw new Error('viewBox must contain four finite SVG numbers with positive bounds');
	if (ra.xmlns !== undefined && ra.xmlns !== 'http://www.w3.org/2000/svg')
		throw new Error('root xmlns must be the SVG namespace');
	if (ra['xmlns:xlink'] !== undefined && ra['xmlns:xlink'] !== 'http://www.w3.org/1999/xlink')
		throw new Error('root xmlns:xlink must be the XLink namespace');
	const positiveLength = (value) => {
		const m = /^([-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?)(?:px)?$/.exec(xmlTrim(value));
		return m && Number(m[1]) > 0;
	};
	for (const key of ['width', 'height'])
		if (ra[key] !== undefined && !positiveLength(ra[key])) throw new Error(`root ${key} must be a positive SVG length`);
	const scale = config.maximumDisplayScale ?? 4,
		px = config.flattenTolerancePx ?? 0.35,
		sourceTol = px / scale,
		tol = sourceTol / Math.max(vb[2], vb[3]);
	const min = config.minimumDepth ?? 0.04,
		max = config.maximumDepth ?? 0.22,
		minArea = config.minimumTriangleArea ?? 1e-10;
	if (!(min >= 0 && max >= min)) throw new Error('depth bounds require 0 <= minimum <= maximum');
	if (![scale, px, min, max, minArea].every(Number.isFinite) || scale <= 0 || px < 0 || minArea < 0)
		throw new Error('compiler config requires finite scale/tolerance/depth bounds');
	const paths = structure.paths.map((text) => [null, text]);
	const parsed = paths.map((m, order) => {
		const a = attrs(m[1]),
			number = order + 1,
			allowed = new Set(['id', 'd', 'fill', 'fill-rule', 'stroke', 'style', 'transform']);
		for (const key of Object.keys(a))
			if (!allowed.has(key)) throw new Error(`path ${number}: unsupported or unresolved attribute ${key}`);
		if (!a.d) throw new Error(`path ${number}: missing d`);
		const style = {};
		if (a.style) {
			for (const declaration of a.style.split(';').filter((x) => xmlTrim(x))) {
				const separator = declaration.indexOf(':');
				if (separator < 1 || declaration.indexOf(':', separator + 1) >= 0)
					throw new Error(`path ${number}: unresolved style declaration`);
				const key = xmlTrim(declaration.slice(0, separator)).toLowerCase(),
					value = xmlTrim(declaration.slice(separator + 1));
				if (!['fill', 'stroke', 'fill-rule'].includes(key))
					throw new Error(`path ${number}: unsupported style property ${key}`);
				style[key] = value;
			}
		}
		const stroke = (style.stroke ?? a.stroke)?.toLowerCase();
		if (stroke && stroke !== 'none') throw new Error(`path ${number}: strokes are unsupported`);
		const fill = style.fill ?? a.fill;
		if (!fill || fill.toLowerCase() === 'none') throw new Error(`path ${number}: solid resolved fill required`);
		validateSolidFill(fill, number);
		const fillRule = (style['fill-rule'] ?? a['fill-rule'] ?? 'nonzero').toLowerCase();
		if (!['nonzero', 'evenodd'].includes(fillRule)) throw new Error(`path ${number}: unsupported fill-rule ${fillRule}`);
		const matrix = transformMatrix(a.transform);
		let ring = parsePath(a.d, sourceTol, (p) => tx(p, matrix)).map((p) => [
			(p[0] - vb[0]) / Math.max(vb[2], vb[3]) - vb[2] / Math.max(vb[2], vb[3]) / 2,
			(vb[1] + vb[3] - p[1]) / Math.max(vb[2], vb[3]) - vb[3] / Math.max(vb[2], vb[3]) / 2,
		]);
		ring = ring.filter((p, i) => !i || Math.hypot(p[0] - ring[i - 1][0], p[1] - ring[i - 1][1]) > EPS);
		if (ring.some((p) => !Number.isFinite(p[0]) || !Number.isFinite(p[1])))
			throw new Error(`path ${number}: non-finite normalized contour`);
		assertSimple(ring);
		let area = signedArea(ring);
		if (!Number.isFinite(area) || Math.abs(area) < minArea) throw new Error(`path ${number}: degenerate contour`);
		if (area < 0) {
			ring = ring.reverse();
			area = -area;
		}
		let triangles;
		try {
			triangles = triangulate(ring);
		} catch (e) {
			throw new Error(`path ${number}: ${e.message}`);
		}
		const center = centroid(ring);
		if (!center.every(Number.isFinite)) throw new Error(`path ${number}: non-finite centroid`);
		return {
			order,
			id: `facet-${String(number).padStart(2, '0')}`,
			sourceId: a.id ?? null,
			fill,
			fillRule,
			transform: a.transform ?? null,
			ring,
			triangles,
			area,
			centroid: center,
		};
	});
	const maxArea = Math.max(...parsed.map((x) => x.area)),
		positions = [],
		normals = [],
		indices = [];
	for (const f of parsed) {
		f.depth = min + (max - min) * Math.sqrt(f.area / maxArea);
		const vertexStart = positions.length / 3,
			indexStart = indices.length;
		extrude(f.ring, f.triangles, f.depth, positions, normals, indices);
		f.mesh = {
			vertexStart,
			vertexCount: positions.length / 3 - vertexStart,
			indexStart,
			indexCount: indices.length - indexStart,
		};
	}
	const facets = parsed.map((f) => ({
		id: f.id,
		sourceId: f.sourceId,
		sourceOrder: f.order,
		fill: f.fill,
		fillRule: f.fillRule,
		transform: f.transform,
		area: round(f.area),
		centroid: f.centroid.map(round),
		depth: round(f.depth),
		contourVertexCount: f.ring.length,
		frontTriangleCount: f.triangles.length / 3,
		mesh: f.mesh,
	}));
	if (!positions.every(Number.isFinite) || !normals.every(Number.isFinite))
		throw new Error('non-finite geometry buffers');
	return {
		manifest: {
			schema: SCHEMA,
			compilerVersion: COMPILER_VERSION,
			supportedSubset: 'closed-filled-path-MLCZ-affine/v1',
			source: { sha256: sha256(source), viewBox: vb },
			facetCount: facets.length,
			facets,
			geometry: {
				vertexCount: positions.length / 3,
				indexCount: indices.length,
				primitive: 'triangle-list',
				channels: ['position', 'normal'],
			},
			coordinateSystem: {
				sourceY: 'down',
				worldHandedness: 'right',
				cameraForward: 'negative-z',
				frontWinding: 'ccw',
				matrixOrder: 'column-vector',
				normalization: 'viewBox-max-dimension-centered',
			},
			flattening: {
				screenTolerancePx: px,
				maximumDisplayScale: scale,
				modelTolerance: round(tol),
				method: 'adaptive-de-casteljau-after-affine-bake',
			},
			depth: { policy: 'sqrt-relative-area', minimum: min, maximum: max },
			paint: {
				grammar: 'solid-hex-or-rgb/v1',
				opacity: 'opaque-only',
				styleProperties: ['fill', 'fill-rule', 'stroke:none'],
				unresolvedClasses: 'reject',
			},
			fillRules: [...new Set(facets.map((f) => f.fillRule))],
			supportedFillRules: ['nonzero', 'evenodd'],
			centroidMethod: 'signed-polygon-area',
			windingNormalization: 'ccw-after-svg-y-inversion',
			warnings: [],
		},
		geometry: {
			schema: 'rive-animascript-3d/generated-provider/v1',
			positions: positions.map(round),
			normals: normals.map(round),
			indices,
		},
	};
}

export function compileFile(path, config = {}) {
	return compileSvg(readFileSync(path, 'utf8'), config);
}
