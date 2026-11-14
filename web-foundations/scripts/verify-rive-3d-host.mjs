#!/usr/bin/env node
// X4 host verifier: drives the built site in a real browser and checks the
// Rive + AnimaScript 3D specimen's web integration — input paths, semantic
// facet controls, responsive/theme captures, reduced-motion stills, failure
// fallback, and teardown hygiene.
//
// Usage: node verify-rive-3d-host.mjs [A1|A2|A3|A4|A5|A6|--all]
// Requires `pnpm build` output in _site/ and playwright-core + a Chromium.

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repo = resolve(web, '..');
const SITE = resolve(web, '_site');
const BASEURL = '/web-atelier-udit';
const DEMO_PATH = '/lessons/en/web-animations/svg-master-session/demo/';
const OUT = resolve(web, 'docs/assets/animations/fava/rive/animascript-3d/build/x4-checks');
mkdirSync(OUT, { recursive: true });

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.riv': 'application/octet-stream',
	'.bin': 'application/octet-stream',
	'.wasm': 'application/wasm',
	'.woff2': 'font/woff2',
	'.ico': 'image/x-icon',
	'.txt': 'text/plain; charset=utf-8',
	'.xml': 'application/xml',
};

function serveSite() {
	const server = createServer((req, res) => {
		let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
		if (path.startsWith(BASEURL)) path = path.slice(BASEURL.length) || '/';
		let file = normalize(join(SITE, path));
		if (!file.startsWith(SITE)) {
			res.writeHead(403).end();
			return;
		}
		if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
		if (!existsSync(file)) {
			res.writeHead(404).end('not found');
			return;
		}
		res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
		res.end(readFileSync(file));
	});
	return new Promise((resolvePromise) => {
		server.listen(0, '127.0.0.1', () => resolvePromise({ server, port: server.address().port }));
	});
}

async function launchBrowser() {
	const attempts = [
		{ channel: undefined },
		{ channel: 'chrome' },
		{
			executablePath: join(
				process.env.HOME,
				'Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell'
			),
		},
	];
	let lastError;
	for (const opts of attempts) {
		try {
			return await chromium.launch({ headless: true, ...opts });
		} catch (error) {
			lastError = error;
		}
	}
	throw lastError;
}

const results = [];
function record(id, ok, summary, extra = {}) {
	results.push({ id, ok, summary, ...extra });
	console.log(`${ok ? 'PASS' : 'FAIL'} ${id}: ${summary}`);
}
function writeCheck(id, data) {
	writeFileSync(join(OUT, `${id}.json`), JSON.stringify(data, null, 2) + '\n');
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const ARTICLE = '[data-authored="animascript3d"]';
const HOST_JS = `(() => {
	const art = document.querySelector('${ARTICLE}');
	const h = art?.__rive3dHost;
	if (!h) return null;
	const c = art.querySelector('[data-rive-3d-canvas]');
	const { cssW, cssH } = { cssW: c.clientWidth, cssH: c.clientHeight };
	const selWords = new Uint32Array(8);
	for (const f of h.state.sel) selWords[f >> 5] |= 1 << (f & 31);
	return {
		mode: h.state.mode,
		playing: h.state.playing,
		destroyed: h.state.destroyed,
		sel: [...h.state.sel],
		selSize: h.state.sel.size,
		elapsed: h.state.elapsed,
		phase: (h.state.elapsed / 9) % 1,
		orbit: { yaw: h.state.mirror?.orbit.yaw ?? 0, pitch: h.state.mirror?.orbit.pitch ?? 0, yawTarget: h.state.mirror?.orbit.yawTarget ?? 0, pitchTarget: h.state.mirror?.orbit.pitchTarget ?? 0 },
		facetCount: h.state.mirror?.facetCount ?? 0,
		pickPoint: (fi, window = 0.04) => h.state.mirror.solveFacetPoint(fi, {
			phase: (h.state.elapsed / 9) % 1,
			userYaw: h.state.mirror.orbit.yaw,
			userPitch: h.state.mirror.orbit.pitch,
			cssW, cssH, selWords, phaseWindow: window,
		}),
		solveEmpty: () => h.state.mirror.solveEmptyPoint({
			phase: (h.state.elapsed / 9) % 1,
			userYaw: h.state.mirror.orbit.yaw,
			userPitch: h.state.mirror.orbit.pitch,
			cssW, cssH, selWords,
		}),
	};
})()`;

async function hostState(page) {
	return page.evaluate(HOST_JS);
}
async function waitForMode(page, modes, timeout = 60000) {
	const deadline = Date.now() + timeout;
	while (Date.now() < deadline) {
		const s = await hostState(page).catch(() => null);
		if (s && modes.includes(s.mode)) return s;
		await sleep(250);
	}
	return hostState(page);
}
async function openPage(browser, url, { viewport = { width: 1280, height: 800 }, reducedMotion } = {}) {
	const context = await browser.newContext({ viewport, reducedMotion, deviceScaleFactor: 1, hasTouch: true });
	const page = await context.newPage();
	const picks = [];
	const errors = [];
	page.on('console', (m) => {
		const t = m.text();
		if (t.includes('x3pick')) picks.push(t);
	});
	page.on('pageerror', (e) => errors.push(String(e)));
	await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
	return { context, page, picks, errors };
}
async function canvasClientPoint(page, layout) {
	return page.evaluate(
		([x, y]) => {
			const c = document.querySelector('[data-rive-3d-canvas]');
			const r = c.getBoundingClientRect();
			return { x: r.left + x, y: r.top + y };
		},
		[layout.x, layout.y]
	);
}
// Find a facet + layout point that picks it at the current pose and is not
// already selected, so a click deterministically toggles selection ON.
// Solves only at the live phase — the caller retries across loop phases.
async function aimableFacet(page) {
	return page.evaluate(() => {
		const art = document.querySelector('[data-authored="animascript3d"]');
		const h = art.__rive3dHost;
		const c = art.querySelector('[data-rive-3d-canvas]');
		const m = h.state.mirror;
		const selWords = new Uint32Array(8);
		for (const f of h.state.sel) selWords[f >> 5] |= 1 << (f & 31);
		const pose = {
			phase: (h.state.elapsed / 9) % 1,
			userYaw: m.orbit.yaw,
			userPitch: m.orbit.pitch,
			cssW: c.clientWidth,
			cssH: c.clientHeight,
			selWords,
			phaseWindow: 0.05,
		};
		for (let f = 0; f < m.facetCount; f++) {
			if (h.state.sel.has(f)) continue;
			const pt = m.solveFacetPoint(f, pose);
			if (pt) return { facet: f, x: pt.x, y: pt.y, id: m.facetId(f) };
		}
		return null;
	});
}
// The card sits far down a long scroll-snap page: real pointer input only
// reaches the canvas once it is inside the viewport.
async function scrollCardIntoView(page) {
	await page.locator(ARTICLE).scrollIntoViewIfNeeded();
	await sleep(300);
}
async function waitSelSize(page, pred, timeout = 6000) {
	const deadline = Date.now() + timeout;
	while (Date.now() < deadline) {
		const s = await hostState(page);
		if (s && pred(s)) return s;
		await sleep(200);
	}
	return hostState(page);
}

// ================= checks =================

async function checkA1(ctx) {
	const { page, picks } = ctx;
	const out = { paths: {} };
	await scrollCardIntoView(page);
	// A real click lands a few frames after the solve; the choreography keeps
	// moving, so retry the aim+dispatch pair until the scene confirms a pick.
	const clickUntilPick = async (dispatch) => {
		const deadline = Date.now() + 12000;
		let lastAim = null;
		while (Date.now() < deadline) {
			const aim = await aimableFacet(page);
			if (!aim) {
				await sleep(200);
				continue;
			}
			lastAim = aim;
			const p = await canvasClientPoint(page, aim);
			const picksBefore = picks.length;
			const selBefore = (await hostState(page)).selSize;
			await dispatch(p);
			const st = await waitSelSize(page, (s) => s.selSize !== selBefore || s.sel.includes(aim.facet), 1200);
			const newLines = picks.slice(picksBefore);
			const facetPick = newLines.some((l) => l.includes('facet='));
			if (st.selSize !== selBefore || st.sel.includes(aim.facet) || facetPick) {
				return { aim, state: st, newLines };
			}
		}
		return { aim: lastAim, state: await hostState(page), newLines: [] };
	};
	const pickEvents = (lines) => lines.filter((l) => l.includes('facet=')).length;
	// --- mouse click path ---
	const mouseRes = await clickUntilPick((p) => page.mouse.click(p.x, p.y));
	const mouseOk =
		!!mouseRes.aim &&
		(mouseRes.state.sel.includes(mouseRes.aim.facet) || mouseRes.newLines.some((l) => l.includes('facet=')));
	out.paths.mouse = { ok: mouseOk, events: pickEvents(mouseRes.newLines) };

	// --- touch tap path ---
	const touchRes = await clickUntilPick((p) => page.touchscreen.tap(p.x, p.y));
	const touchOk =
		!!touchRes.aim &&
		(touchRes.state.sel.includes(touchRes.aim.facet) || touchRes.newLines.some((l) => l.includes('facet=')));
	out.paths.touch = { ok: touchOk, events: pickEvents(touchRes.newLines) };

	// --- Wacom-like fine motion: sub-deadzone moves must not orbit; a real drag must ---
	const orbitBefore = (await hostState(page)).orbit;
	const canvasBox = await page.locator('[data-rive-3d-canvas]').boundingBox();
	const cx = canvasBox.x + canvasBox.width / 2;
	const cy = canvasBox.y + canvasBox.height / 2;
	await page.mouse.move(cx, cy);
	await page.mouse.down();
	// 1 px micro-moves, cumulative ~1.4 px < 3 px deadzone
	await page.mouse.move(cx + 1, cy, { steps: 2 });
	await page.mouse.move(cx + 1, cy + 1, { steps: 2 });
	await page.mouse.up();
	await sleep(120);
	const orbitMicro = (await hostState(page)).orbit;
	const microOk =
		Math.abs(orbitMicro.yawTarget - orbitBefore.yawTarget) < 1e-9 &&
		Math.abs(orbitMicro.pitchTarget - orbitBefore.pitchTarget) < 1e-9;
	// real drag beyond deadzone
	await page.mouse.move(cx, cy);
	await page.mouse.down();
	await page.mouse.move(cx + 14, cy - 8, { steps: 6 });
	await page.mouse.up();
	await sleep(120);
	const orbitDrag = (await hostState(page)).orbit;
	const dragOk = Math.abs(orbitDrag.yawTarget - orbitBefore.yawTarget) > 0.01;
	out.paths.fineMotion = { microOk, dragOk };

	// --- keyboard path: focus a facet button, activate with Enter ---
	const btnCount = await page.locator('.rive-3d-facet').count();
	const kbFacet = btnCount
		? await page.evaluate(() => {
				const bs = [...document.querySelectorAll('.rive-3d-facet')];
				const free = bs.findIndex((b) => b.getAttribute('aria-pressed') !== 'true');
				return free >= 0 ? free : 0;
			})
		: -1;
	let kbOk = false;
	let kbFacetHit = -1;
	if (kbFacet >= 0) {
		const btn = page.locator('.rive-3d-facet').nth(kbFacet);
		await btn.focus();
		await page.keyboard.press('Enter');
		const deadline = Date.now() + 8000;
		let last = null;
		while (Date.now() < deadline) {
			last = await hostState(page);
			const pressed = await page.locator('.rive-3d-facet').nth(kbFacet).getAttribute('aria-pressed');
			if (pressed === 'true' || last.sel.includes(kbFacet)) {
				kbOk = true;
				kbFacetHit = kbFacet;
				break;
			}
			await sleep(250);
		}
	}
	out.paths.keyboard = { kbOk };

	const ok = mouseOk && touchOk && microOk && dragOk && kbOk && ctx.errors.length === 0;
	writeCheck('A1', { ...out, pageErrors: ctx.errors });
	const facetName = (i) => (i >= 0 ? `facet-${String(i + 1).padStart(2, '0')}` : 'none');
	record(
		'A1',
		ok,
		`mouse=${mouseOk}(${mouseRes.aim?.id ?? 'none'}) touch=${touchOk}(${touchRes.aim?.id ?? 'none'}) fineMotion micro=${microOk} drag=${dragOk} keyboard=${kbOk}(${facetName(kbFacetHit)}) errors=${ctx.errors.length}`
	);
}

async function checkA2(ctx) {
	const { page } = ctx;
	const manifest = JSON.parse(
		readFileSync(resolve(web, 'docs/assets/animations/fava/rive/animascript-3d/generated/favicon/manifest.json'), 'utf8')
	);
	const n = manifest.facetCount;
	// A1's keyboard pick leaves the buttons disabled while aimAndClick waits
	// for the scene ack (bounded by its deadline). A2 shares that page, so
	// wait for the busy state to clear before asserting usability.
	const enableStart = Date.now();
	const enableDeadline = enableStart + 6000;
	while (Date.now() < enableDeadline) {
		const anyDisabled = await page.evaluate(() =>
			[...document.querySelectorAll('[data-rive-3d-facets] button')].some((b) => b.disabled)
		);
		if (!anyDisabled) break;
		await sleep(150);
	}
	const enabledAfterMs = Date.now() - enableStart;
	const info = await page.evaluate(() => {
		const wrap = document.querySelector('[data-rive-3d-facets]');
		const buttons = wrap ? [...wrap.querySelectorAll('button')] : [];
		return {
			count: buttons.length,
			labels: buttons.map((b) => b.textContent.trim()),
			pressed: buttons.map((b) => b.getAttribute('aria-pressed')),
			disabled: buttons.map((b) => b.disabled),
			chipsHidden: buttons.map((b) => b.querySelector('.facet-chip')?.getAttribute('aria-hidden')),
			chipBg: buttons.map((b) => b.querySelector('.facet-chip')?.style.background || ''),
			groupLabel: wrap?.getAttribute('aria-label') ?? '',
		};
	});
	const ids = manifest.facets.map((f) => f.id);
	const labelOk = info.labels.every((l, i) => l.includes(ids[i]));
	const notColorOnly = info.chipsHidden.every((h) => h === 'true') && info.labels.every((l) => /facet-\d+/.test(l));
	const fills = manifest.facets.map((f) => f.fill.toLowerCase());
	const chipOk = info.chipBg.every((bg, i) => {
		const hex = fills[i].replace('#', '');
		const rgb = [0, 2, 4].map((k) => parseInt(hex.slice(k, k + 2), 16));
		return bg.includes(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`) || bg.toLowerCase().includes(fills[i]);
	});
	const ok =
		info.count === n &&
		labelOk &&
		notColorOnly &&
		chipOk &&
		info.pressed.every((p) => p === 'true' || p === 'false') &&
		info.disabled.every((d) => d === false) &&
		info.groupLabel.length > 0;
	// `pressed` reflects whatever A1 left selected on the shared page — valid
	// for the check but not stable enough to hash as evidence.
	const { pressed: _pressed, ...stableInfo } = info;
	writeCheck('A2', { manifestFacetCount: n, ...stableInfo, labelOk, notColorOnly, chipOk });
	record(
		'A2',
		ok,
		`N=${n} buttons=${info.count} labels=${labelOk} textNotColorOnly=${notColorOnly} chipsMatchFills=${chipOk} enabled=${info.disabled.every((d) => !d)} (waited ${enabledAfterMs}ms for pick-busy to clear)`
	);
}

async function checkA3(ctx) {
	const { page } = ctx;
	const captures = [];
	const widths = [320, 768, 1280];
	const themes = ['dark', 'light'];
	const details = [];
	for (const width of widths) {
		for (const theme of themes) {
			await page.setViewportSize({ width, height: 800 });
			await page.evaluate((t) => document.documentElement.classList.toggle('dark', t === 'dark'), theme);
			await page.locator('[data-authored="animascript3d"]').scrollIntoViewIfNeeded();
			await sleep(250);
			const metrics = await page.evaluate(() => {
				const art = document.querySelector('[data-authored="animascript3d"]');
				const c = art.querySelector('[data-rive-3d-canvas]');
				const r = art.getBoundingClientRect();
				return {
					docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
					cardOverflow: art.scrollWidth - art.clientWidth,
					canvas: { w: c.clientWidth, h: c.clientHeight, displayed: getComputedStyle(c).display !== 'none' },
					clip: {
						x: Math.max(0, r.x),
						y: Math.max(0, r.y),
						width: Math.min(r.width, window.innerWidth - Math.max(0, r.x)),
						height: Math.min(r.height, window.innerHeight - Math.max(0, r.y)),
					},
				};
			});
			const name = `A3-${width}-${theme}.png`;
			const file = join(OUT, name);
			await page.screenshot({ path: file, clip: metrics.clip });
			captures.push({ file, viewport: `${width}x800`, theme, metrics });
			// `clip` is screenshot geometry, not an assertion — keep it out of
			// the hashed artifact so sub-pixel scroll variance cannot break the
			// evidence digest.
			const { clip: _clip, ...stableMetrics } = metrics;
			details.push({ width, theme, ...stableMetrics, capture: name });
		}
	}
	// The demo page carries a pre-existing 8px document overflow at 320px on
	// main (method-grid card heads + code blocks, unrelated to this card).
	// X4 must not add to it: card-level overflow stays <=2px and document
	// overflow never exceeds that baseline.
	const BASELINE_DOC_OVERFLOW = 8;
	const noOverflow = details.every((d) => d.docOverflow <= BASELINE_DOC_OVERFLOW && d.cardOverflow <= 2);
	const canvasOk = details.every((d) => d.canvas.w > 0 && d.canvas.h > 0);
	writeCheck('A3', { baselineDocOverflow: BASELINE_DOC_OVERFLOW, captures: details });
	record(
		'A3',
		noOverflow && canvasOk,
		`6 captures 320/768/1280 x dark/light; cardOverflow<=2px && docOverflow<=${BASELINE_DOC_OVERFLOW}px(baseline)=${noOverflow} canvasSized=${canvasOk}`
	);
	return captures;
}

async function checkA4(browser, url) {
	const { context, page, errors } = await openPage(browser, url, { reducedMotion: 'reduce' });
	try {
		const s = await waitForMode(page, ['static'], 30000);
		const dom = await page.evaluate(() => {
			const art = document.querySelector('[data-authored="animascript3d"]');
			const img = art.querySelector('.rive-gpu-preview > img');
			const canvas = art.querySelector('[data-rive-3d-canvas]');
			const toggle = art.querySelector('[data-rive-3d-toggle]');
			const reset = art.querySelector('[data-rive-3d-reset]');
			const status = art.querySelector('[data-asset-status="animascript3d"]');
			const live = art.querySelector('[data-rive-3d-live]');
			return {
				mode: art.__rive3dHost?.state.mode,
				imgSrc: img?.getAttribute('src') ?? '',
				imgVisible: img ? getComputedStyle(img).display !== 'none' : false,
				canvasDisplayed: getComputedStyle(canvas).display !== 'none',
				previewPlaying: art.querySelector('.rive-gpu-preview')?.classList.contains('is-playing') ?? false,
				toggleText: toggle?.textContent ?? '',
				toggleDisabled: toggle?.disabled,
				resetDisabled: reset?.disabled,
				status: status?.textContent ?? '',
				live: live?.textContent ?? '',
				buttons: art.querySelectorAll('.rive-3d-facet').length,
			};
		});
		const base = {
			assembled: dom.imgSrc.includes('assembled.png'),
			imgVisible: dom.imgVisible,
			canvasHidden: !dom.canvasDisplayed && !dom.previewPlaying,
			reducedStatus: /reduced motion/i.test(dom.status),
			controlsUsable: dom.buttons > 0 && dom.resetDisabled === false,
		};
		// deliberate control: facet button swaps the still
		const firstBtn = page.locator('.rive-3d-facet').first();
		await firstBtn.click();
		await sleep(400);
		const afterSelect = await page.evaluate(() => {
			const art = document.querySelector('[data-authored="animascript3d"]');
			return {
				imgSrc: art.querySelector('.rive-gpu-preview > img')?.getAttribute('src') ?? '',
				pressed: art.querySelector('.rive-3d-facet')?.getAttribute('aria-pressed'),
				live: art.querySelector('[data-rive-3d-live]')?.textContent ?? '',
			};
		});
		const selectOk =
			/facet-\d+\.png/.test(afterSelect.imgSrc) && afterSelect.pressed === 'true' && afterSelect.live.length > 0;
		// reset returns the assembled still
		await page.locator('[data-rive-3d-reset]').click();
		await sleep(300);
		const afterReset = await page.evaluate(() => ({
			imgSrc: document.querySelector('[data-authored="animascript3d"] .rive-gpu-preview > img')?.getAttribute('src') ?? '',
			pressed: document.querySelector('[data-authored="animascript3d"] .rive-3d-facet')?.getAttribute('aria-pressed'),
		}));
		const resetOk = afterReset.imgSrc.includes('assembled.png') && afterReset.pressed === 'false';
		const ok =
			s?.mode === 'static' &&
			base.assembled &&
			base.imgVisible &&
			base.canvasHidden &&
			base.reducedStatus &&
			base.controlsUsable &&
			selectOk &&
			resetOk &&
			errors.length === 0;
		writeCheck('A4', { state: s, dom, base, afterSelect, afterReset, pageErrors: errors });
		record(
			'A4',
			ok,
			`mode=${s?.mode} assembled=${base.assembled} canvasHidden=${base.canvasHidden} selectStill=${selectOk} reset=${resetOk} errors=${errors.length}`
		);
	} finally {
		await context.close();
	}
}

async function checkA5(browser, url) {
	const { context, page, errors } = await openPage(browser, `${url}?force-rive3d-failure`, {});
	try {
		const s = await waitForMode(page, ['static'], 30000);
		const dom = await page.evaluate(() => {
			const art = document.querySelector('[data-authored="animascript3d"]');
			const img = art.querySelector('.rive-gpu-preview > img');
			const canvas = art.querySelector('[data-rive-3d-canvas]');
			return {
				imgSrc: img?.getAttribute('src') ?? '',
				imgVisible: img ? getComputedStyle(img).display !== 'none' : false,
				canvasDisplayed: getComputedStyle(canvas).display !== 'none',
				status: art.querySelector('[data-asset-status="animascript3d"]')?.textContent ?? '',
				buttons: art.querySelectorAll('.rive-3d-facet').length,
			};
		});
		const truthful = /could not load|unavailable|failed/i.test(dom.status);
		const fallback = dom.imgVisible && /\.png$/.test(dom.imgSrc) && !dom.canvasDisplayed;
		// controls still work in degraded mode
		await page.locator('.rive-3d-facet').first().click();
		await sleep(400);
		const sel = await page.evaluate(() => ({
			imgSrc: document.querySelector('[data-authored="animascript3d"] .rive-gpu-preview > img')?.getAttribute('src') ?? '',
			pressed: document.querySelector('[data-authored="animascript3d"] .rive-3d-facet')?.getAttribute('aria-pressed'),
		}));
		const controlsOk = /facet-\d+\.png/.test(sel.imgSrc) && sel.pressed === 'true';
		const ok = s?.mode === 'static' && truthful && fallback && controlsOk && dom.buttons > 0 && errors.length === 0;
		writeCheck('A5', { state: s, dom, sel, pageErrors: errors });
		record(
			'A5',
			ok,
			`mode=${s?.mode} truthful=${truthful} fallbackImg=${fallback} controls=${controlsOk} status="${dom.status.slice(0, 80)}"`
		);
	} finally {
		await context.close();
	}
}

async function checkA6(ctx) {
	const { page, picks } = ctx;
	const before = await hostState(page);
	if (before?.mode !== 'live') return record('A6', false, `scene not live (mode=${before?.mode})`);
	const picksBefore = picks.length;
	const result = await page.evaluate(() => {
		const art = document.querySelector('[data-authored="animascript3d"]');
		const h = art.__rive3dHost;
		h.destroy();
		const c = art.querySelector('[data-rive-3d-canvas]');
		// synthetic input after teardown must not reach the orbit mirror
		for (const type of ['mousedown', 'mousemove', 'mouseup']) {
			c.dispatchEvent(new MouseEvent(type, { clientX: 100, clientY: 100, bubbles: true }));
		}
		return {
			destroyed: h.state.destroyed,
			player: h.state.player,
			observer: h.state.observer,
			raf: h.state.raf,
			orbitDown: h.state.mirror.orbit.down,
			buttons: art.querySelectorAll('.rive-3d-facet').length,
			consoleNative: console.log.toString().includes('native'),
			elapsed: h.state.elapsed,
		};
	});
	await sleep(400);
	const after = await page.evaluate(() => {
		const h = document.querySelector('[data-authored="animascript3d"]').__rive3dHost;
		return { elapsed: h.state.elapsed, raf: h.state.raf };
	});
	const rafStopped = after.raf === 0 && after.elapsed === result.elapsed;
	const noNewPicks = picks.length === picksBefore;
	const ok =
		result.destroyed === true &&
		result.player === null &&
		result.observer === null &&
		result.orbitDown === false &&
		result.buttons === 0 &&
		result.consoleNative === true &&
		rafStopped &&
		noNewPicks;
	// Absolute elapsed/pick counts depend on how long A1–A3 ran before this
	// check on the shared page; the hashed artifact keeps only stable
	// booleans. Volatile numbers stay in the PASS transcript line.
	writeCheck('A6', {
		modeBefore: before.mode,
		teardown: {
			destroyed: result.destroyed === true,
			playerNull: result.player === null,
			observerNull: result.observer === null,
			orbitDetached: result.orbitDown === false,
			buttonsRemoved: result.buttons === 0,
			consoleRestored: result.consoleNative === true,
			rafZero: after.raf === 0,
			elapsedFrozen: rafStopped,
			noNewPicks: noNewPicks,
		},
	});
	record(
		'A6',
		ok,
		`destroyed=${result.destroyed} player/observer null=${result.player === null && result.observer === null} raf=${result.raf}->${after.raf} elapsedFrozen=${rafStopped} orbitDetached=${result.orbitDown === false} consoleRestored=${result.consoleNative} buttons=${result.buttons} newPicks=${picks.length - picksBefore}`
	);
}

// ================= runner =================

const which = process.argv[2] ?? '--all';
const ids = which === '--all' ? ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'] : [which];

if (!existsSync(join(SITE, 'lessons/en/web-animations/svg-master-session/demo/index.html'))) {
	console.error('FAIL: _site build missing — run `pnpm build` first');
	process.exit(2);
}
const { server, port } = await serveSite();
const url = `http://127.0.0.1:${port}${BASEURL}${DEMO_PATH}`;
const browser = await launchBrowser();
let liveCtx = null;
let captures = [];
try {
	for (const id of ids) {
		if (id === 'A1' || id === 'A2' || id === 'A6') {
			if (!liveCtx) {
				liveCtx = await openPage(browser, url, { viewport: { width: 1280, height: 800 } });
				const s = await waitForMode(liveCtx.page, ['live'], 60000);
				if (s?.mode !== 'live') {
					record(id, false, `scene did not reach live mode (mode=${s?.mode})`);
					continue;
				}
			}
			if (id === 'A1') await checkA1(liveCtx);
			else if (id === 'A2') await checkA2(liveCtx);
			else await checkA6(liveCtx);
		} else if (id === 'A3') {
			if (!liveCtx) {
				liveCtx = await openPage(browser, url, { viewport: { width: 1280, height: 800 } });
				await waitForMode(liveCtx.page, ['live', 'static'], 60000);
			}
			captures = (await checkA3(liveCtx)) ?? [];
		} else if (id === 'A4') {
			await checkA4(browser, url);
		} else if (id === 'A5') {
			await checkA5(browser, url);
		}
	}
} finally {
	if (liveCtx) await liveCtx.context.close().catch(() => {});
	await browser.close().catch(() => {});
	server.close();
}

const failed = results.filter((r) => !r.ok);
if (failed.length) {
	console.log(`FAILURES: ${failed.map((f) => f.id).join(', ')}`);
	process.exit(1);
}
console.log(`ALL PASS: ${results.map((r) => r.id).join(', ')}`);
