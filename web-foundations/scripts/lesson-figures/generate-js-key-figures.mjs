#!/usr/bin/env node
/**
 * FE I JavaScript key-point figures (S7 event loop · S8 trust boundary · S9 import graph).
 *
 * visual-forger 1.2.0 — imagine mode: hand-authored SVG grammar, studio palette, EN/ES labels.
 * Every asset is content-addressed (<id>-<lang>-<sha256:12>.svg/.png) and never rewritten;
 * each run appends a release to assets/images/lesson-figures/index.json.
 *
 * Usage: node scripts/lesson-figures/generate-js-key-figures.mjs
 * Requires: rsvg-convert (librsvg) for PNG export.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const GENERATOR = 'generate-js-key-figures.mjs';
const GENERATOR_VERSION = '1.0.0';
const VISUAL_FORGER_VERSION = '1.2.0';
const OUT = resolve(process.env.FIGURES_OUT || 'docs/assets/images/lesson-figures');
const W = 680;

// Studio palette (visual-forger §1): paper, ink, one accent; one secondary ramp for the safe path.
const C = {
	paper: '#F7F2E8',
	card: '#FFFDF8',
	ink: '#111111',
	muted: '#5B5650',
	line: '#8A847C',
	accent: '#C44536',
	accentFill: '#F6DDD8',
	accentText: '#7A2219',
	safe: '#2F7D6D',
	safeFill: '#DDEFEA',
	safeText: '#1B4D43',
};
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const MONO = "Menlo, 'SF Mono', ui-monospace, monospace";

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ramps = {
	ink: { fill: C.card, stroke: C.ink, title: C.ink, sub: C.muted },
	accent: { fill: C.accentFill, stroke: C.accent, title: C.accentText, sub: C.accent },
	safe: { fill: C.safeFill, stroke: C.safe, title: C.safeText, sub: C.safe },
};

function box(x, y, w, h, title, sub, ramp = 'ink', { mono = false, dashed = false } = {}) {
	const r = ramps[ramp];
	const cx = x + w / 2;
	const ty = sub ? y + h / 2 - 4 : y + h / 2 + 5;
	return [
		`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${r.fill}" stroke="${r.stroke}" stroke-width="0.75"${dashed ? ' stroke-dasharray="4 3"' : ''}/>`,
		`<text x="${cx}" y="${ty}" text-anchor="middle" font-family="${mono ? MONO : SANS}" font-size="14" font-weight="500" fill="${r.title}">${esc(title)}</text>`,
		sub
			? `<text x="${cx}" y="${ty + 18}" text-anchor="middle" font-family="${SANS}" font-size="12" font-weight="400" fill="${r.sub}">${esc(sub)}</text>`
			: '',
	].join('');
}

function arrow(d, color = C.ink, { dashed = false } = {}) {
	const id = color === C.accent ? 'a-accent' : color === C.safe ? 'a-safe' : color === C.line ? 'a-line' : 'a-ink';
	return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.25"${dashed ? ' stroke-dasharray="5 4"' : ''} marker-end="url(#${id})"/>`;
}

function label(x, y, text, { anchor = 'middle', color = C.muted, mono = false, weight = 400 } = {}) {
	return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${mono ? MONO : SANS}" font-size="12" font-weight="${weight}" fill="${color}">${esc(text)}</text>`;
}

function svg(height, titleText, descText, body) {
	const marker = (id, color) =>
		`<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker>`;
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${height}" width="${W}" height="${height}" role="img" aria-labelledby="t d">
<title id="t">${esc(titleText)}</title>
<desc id="d">${esc(descText)}</desc>
<defs>${marker('a-ink', C.ink)}${marker('a-accent', C.accent)}${marker('a-safe', C.safe)}${marker('a-line', C.line)}</defs>
<rect width="${W}" height="${height}" fill="${C.paper}"/>
${body}
</svg>
`;
}

// ---------------------------------------------------------------- S7: event → DOM → feedback loop
const S7 = {
	en: {
		title: 'Session 7: the browser event loop',
		desc: 'Once at load, main.js registers listeners. Then a loop: the user acts, an event fires, the listener runs, the DOM changes, the browser repaints, and the user perceives feedback.',
		once: 'Once, at load',
		parse: 'HTML parsed',
		tree: 'DOM tree',
		main: 'main.js (defer)',
		mainSub: 'registers listeners',
		user: 'User acts',
		userSub: 'click · input · scroll',
		event: 'Event fires',
		eventSub: 'event object',
		handler: 'Listener runs',
		handlerSub: 'your function',
		dom: 'DOM changes',
		domSub: 'textContent · classList',
		paint: 'Browser repaints',
		paintSub: 'no page reload',
		feedback: 'user sees / hears feedback',
		loop: 'Every interaction',
		key: 'studio test: this step must be visible',
	},
	es: {
		title: 'Sesión 7: el bucle de eventos del navegador',
		desc: 'Una vez, al cargar, main.js registra los listeners. Después, un bucle: el usuario actúa, se dispara un evento, se ejecuta el listener, el DOM cambia, el navegador repinta y el usuario percibe el feedback.',
		once: 'Una vez, al cargar',
		parse: 'HTML parseado',
		tree: 'Árbol DOM',
		main: 'main.js (defer)',
		mainSub: 'registra listeners',
		user: 'El usuario actúa',
		userSub: 'click · input · scroll',
		event: 'Se dispara el evento',
		eventSub: 'objeto event',
		handler: 'Se ejecuta el listener',
		handlerSub: 'tu función',
		dom: 'El DOM cambia',
		domSub: 'textContent · classList',
		paint: 'El navegador repinta',
		paintSub: 'sin recargar',
		feedback: 'el usuario ve / oye el feedback',
		loop: 'En cada interacción',
		key: 'prueba de estudio: este paso debe verse',
	},
};

function figureS7(L) {
	const b = [];
	// Setup lane
	b.push(label(40, 36, L.once, { anchor: 'start', color: C.ink, weight: 500 }));
	b.push(box(40, 50, 150, 44, L.parse, null));
	b.push(box(240, 50, 150, 44, L.tree, null));
	b.push(box(440, 46, 200, 52, L.main, L.mainSub, 'ink', { dashed: true }));
	b.push(arrow('M190 72 L236 72'));
	b.push(arrow('M390 72 L436 72'));
	// Loop
	b.push(label(40, 140, L.loop, { anchor: 'start', color: C.ink, weight: 500 }));
	b.push(box(40, 156, 180, 56, L.user, L.userSub));
	b.push(box(250, 156, 180, 56, L.event, L.eventSub));
	b.push(box(460, 156, 180, 56, L.handler, L.handlerSub));
	b.push(box(460, 262, 180, 56, L.dom, L.domSub, 'accent'));
	b.push(box(250, 262, 180, 56, L.paint, L.paintSub));
	b.push(arrow('M220 184 L246 184'));
	b.push(arrow('M430 184 L456 184'));
	b.push(arrow('M550 212 L550 258'));
	b.push(arrow('M460 290 L434 290', C.accent));
	b.push(arrow('M250 290 L130 290 L130 216'));
	b.push(label(140, 244, L.feedback, { anchor: 'start', color: C.muted }));
	// listeners registered → listener runs
	b.push(arrow('M600 98 L600 152', C.line, { dashed: true }));
	// key annotation
	b.push(label(550, 342, L.key, { color: C.accent }));
	return svg(366, L.title, L.desc, b.join('\n'));
}

// ---------------------------------------------------------------- S8: trust boundary fork
const S8 = {
	en: {
		title: 'Session 8: rendering is a trust boundary',
		desc: 'The same untrusted string reaches two sinks. Through innerHTML it is parsed as HTML, an img element is created and its onerror code runs. Through textContent it is stored as text, shown literally, and nothing runs.',
		source: 'Untrusted string',
		sourceSub: 'form · URL · API · AI output',
		payload: '<img src=x onerror=…>',
		boundary: 'trust boundary',
		unsafeSink: 'el.innerHTML = s',
		unsafe1: 'Parsed as HTML',
		unsafe1Sub: 'real <img> node created',
		unsafe2: 'onerror runs',
		unsafe2Sub: 'injected code executes',
		safeSink: 'el.textContent = s',
		safe1: 'Stored as text',
		safe1Sub: 'never parsed',
		safe2: 'Shown literally',
		safe2Sub: 'nothing runs',
	},
	es: {
		title: 'Sesión 8: el renderizado es una frontera de confianza',
		desc: 'La misma cadena no confiable llega a dos sumideros. Con innerHTML se interpreta como HTML, se crea un elemento img y su código onerror se ejecuta. Con textContent se guarda como texto, se muestra literal y no se ejecuta nada.',
		source: 'Cadena no confiable',
		sourceSub: 'formulario · URL · API · IA',
		payload: '<img src=x onerror=…>',
		boundary: 'frontera de confianza',
		unsafeSink: 'el.innerHTML = s',
		unsafe1: 'Se interpreta como HTML',
		unsafe1Sub: 'se crea un nodo <img> real',
		unsafe2: 'onerror se ejecuta',
		unsafe2Sub: 'corre código inyectado',
		safeSink: 'el.textContent = s',
		safe1: 'Se guarda como texto',
		safe1Sub: 'nunca se interpreta',
		safe2: 'Se muestra literal',
		safe2Sub: 'no se ejecuta nada',
	},
};

function figureS8(L) {
	const b = [];
	b.push(box(40, 126, 170, 60, L.source, L.sourceSub));
	b.push(label(125, 210, L.payload, { mono: true, color: C.ink }));
	// boundary
	b.push(`<line x1="250" y1="34" x2="250" y2="286" stroke="${C.ink}" stroke-width="0.75" stroke-dasharray="3 4"/>`);
	b.push(label(250, 304, L.boundary, { color: C.ink }));
	// fork
	b.push(arrow('M210 146 L262 78', C.accent));
	b.push(arrow('M210 166 L262 234', C.safe));
	// unsafe row
	b.push(box(266, 52, 172, 52, L.unsafeSink, null, 'accent', { mono: true }));
	b.push(box(456, 40, 184, 52, L.unsafe1, L.unsafe1Sub, 'accent'));
	b.push(box(456, 104, 184, 52, L.unsafe2, L.unsafe2Sub, 'accent'));
	b.push(arrow('M438 72 L452 68', C.accent));
	b.push(arrow('M548 92 L548 100', C.accent));
	// safe row
	b.push(box(266, 208, 172, 52, L.safeSink, null, 'safe', { mono: true }));
	b.push(box(456, 168, 184, 52, L.safe1, L.safe1Sub, 'safe'));
	b.push(box(456, 232, 184, 52, L.safe2, L.safe2Sub, 'safe'));
	b.push(arrow('M438 228 L452 200', C.safe));
	b.push(arrow('M548 220 L548 228', C.safe));
	return svg(324, L.title, L.desc, b.join('\n'));
}

// ---------------------------------------------------------------- S9: import graph and boundary
const S9 = {
	en: {
		title: 'Session 9: the lab import graph',
		desc: 'index.html loads main.js with type module. main.js imports utils.js, projects.js and header.js; projects.js also imports utils.js, which still runs once. projects.js is the boundary: it owns the data and how it renders, so a change to card markup stays inside it.',
		html: 'index.html',
		tag: 'type="module"',
		main: 'main.js',
		mainSub: 'entry · wiring only',
		utils: 'utils.js',
		utilsSub: 'select()',
		projects: 'projects.js',
		projectsSub: 'projects · renderProjects()',
		header: 'header.js',
		headerSub: 'default initHeader()',
		once: 'fetched and run once',
		boundary: 'boundary: owns data + render',
		local: 'change to card markup stays here',
		named: 'named',
		dflt: 'default',
	},
	es: {
		title: 'Sesión 9: el grafo de imports del laboratorio',
		desc: 'index.html carga main.js con type module. main.js importa utils.js, projects.js y header.js; projects.js también importa utils.js, que aun así se ejecuta una vez. projects.js es el límite: es dueño de los datos y de su renderizado, así que un cambio en el marcado de la tarjeta se queda dentro.',
		html: 'index.html',
		tag: 'type="module"',
		main: 'main.js',
		mainSub: 'entrada · solo conecta',
		utils: 'utils.js',
		utilsSub: 'select()',
		projects: 'projects.js',
		projectsSub: 'projects · renderProjects()',
		header: 'header.js',
		headerSub: 'default initHeader()',
		once: 'se descarga y ejecuta una vez',
		boundary: 'límite: datos + renderizado',
		local: 'un cambio en la tarjeta se queda aquí',
		named: 'con nombre',
		dflt: 'por defecto',
	},
};

function figureS9(L) {
	const b = [];
	b.push(box(265, 30, 150, 44, L.html, null, 'ink', { mono: true }));
	b.push(arrow('M340 74 L340 112'));
	b.push(label(350, 98, L.tag, { anchor: 'start', mono: true, color: C.muted }));
	b.push(box(250, 116, 180, 56, L.main, L.mainSub, 'ink', { mono: true }));
	// children
	b.push(box(40, 230, 170, 56, L.utils, L.utilsSub, 'ink', { mono: true }));
	b.push(`<rect x="244" y="218" width="192" height="80" rx="10" fill="none" stroke="${C.accent}" stroke-width="0.75" stroke-dasharray="4 3"/>`);
	b.push(box(255, 230, 170, 56, L.projects, L.projectsSub, 'accent', { mono: true }));
	b.push(box(470, 230, 170, 56, L.header, L.headerSub, 'ink', { mono: true }));
	b.push(arrow('M290 172 L150 226'));
	b.push(arrow('M340 172 L340 214', C.accent));
	b.push(arrow('M390 172 L530 226'));
	b.push(label(226, 192, L.named, { anchor: 'end', color: C.muted }));
	b.push(label(454, 192, L.dflt, { anchor: 'start', color: C.muted }));
	// projects → utils
	b.push(arrow('M255 270 L214 270'));
	// annotations
	b.push(label(125, 310, L.once, { color: C.muted }));
	b.push(label(340, 318, L.boundary, { color: C.accent }));
	b.push(label(340, 336, L.local, { color: C.accent }));
	return svg(362, L.title, L.desc, b.join('\n'));
}

// ---------------------------------------------------------------- export
const FIGURES = [
	{ id: 'fe-i-07-event-loop', lesson: 'js-intro', labels: S7, draw: figureS7, px: [2040, 1098] },
	{ id: 'fe-i-08-trust-boundary', lesson: 'js-dom-manipulation', labels: S8, draw: figureS8, px: [2040, 972] },
	{ id: 'fe-i-09-import-graph', lesson: 'js-modules', labels: S9, draw: figureS9, px: [2040, 1086] },
];

mkdirSync(OUT, { recursive: true });
const assets = [];
for (const fig of FIGURES) {
	for (const lang of ['en', 'es']) {
		const L = fig.labels[lang];
		const source = fig.draw(L);
		const hash = createHash('sha256').update(source).digest('hex').slice(0, 12);
		const base = `${fig.id}-${lang}-${hash}`;
		const svgPath = join(OUT, `${base}.svg`);
		const pngPath = join(OUT, `${base}.png`);
		if (!existsSync(svgPath)) writeFileSync(svgPath, source);
		if (!existsSync(pngPath)) {
			const r = spawnSync('rsvg-convert', ['-w', String(fig.px[0]), '-o', pngPath, svgPath], { encoding: 'utf8' });
			if (r.status !== 0) throw new Error(`rsvg-convert failed for ${base}: ${r.stderr}`);
		}
		assets.push({ id: fig.id, lesson: fig.lesson, lang, svg: `${base}.svg`, png: `${base}.png`, title: L.title, description: L.desc, content_hash: hash });
		console.log(`${base}.svg/.png`);
	}
}

const indexPath = join(OUT, 'index.json');
const index = existsSync(indexPath)
	? JSON.parse(readFileSync(indexPath, 'utf8'))
	: { generator: GENERATOR, brand: 'udit', current_release: null, releases: [] };
const releaseId = `lesson-figures-${createHash('sha256').update(JSON.stringify(assets)).digest('hex').slice(0, 8)}`;
if (!index.releases.some((r) => r.release_id === releaseId)) {
	index.releases.push({
		release_id: releaseId,
		created_at: new Date().toISOString(),
		generator_version: GENERATOR_VERSION,
		assets,
		caption: {
			credit: `Figure by @ruvebal with visual-forger ${VISUAL_FORGER_VERSION} and ${GENERATOR} ${GENERATOR_VERSION}.`,
		},
	});
}
index.generator = GENERATOR;
index.generator_version = GENERATOR_VERSION;
index.current_release = releaseId;
writeFileSync(indexPath, `${JSON.stringify(index, null, 1)}\n`);
console.log(`release ${releaseId}`);
