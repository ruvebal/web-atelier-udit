// X4 demo host for the Rive + AnimaScript 3D specimen.
//
// The sealed .riv owns the scene: choreography, GPU depth pass, and the CPU
// picker. This host adds what a web page owes the specimen:
//
//   - semantic facet controls generated from the compiler manifest (never a
//     hard-coded count), synced from the scene's own `x3pick` console logs —
//     the same events that drive the selection bitset upload;
//   - pause/play and reset controls (reset clicks the empty point the mirror
//     solves, which is the scene's own reset path);
//   - a static-fallback mode for reduced motion, runtime failure, load
//     timeout, and the ?force-rive3d-failure test hook — facet buttons then
//     swap the verified per-facet stills instead of driving the GPU scene;
//   - an orbit mirror fed by the same mouse/touch stream the Rive runtime
//     consumes, so facet buttons can aim a synthetic click at a point the
//     picker will actually hit;
//   - full teardown: console wrapper, listeners, observer, rAF, player.
//
// The scene is reached through synthetic MouseEvents because the Rive
// webgl2 runtime binds mousedown/mousemove/mouseup and touch events — not
// PointerEvents — to its AnimaScript pointer hooks.

import { loadRive3DMirror, loopPhase } from './rive-3d-scene.mjs?v=20261113-x4';

const RUNTIME_URL = 'https://cdn.jsdelivr.net/npm/@rive-app/webgl2@2.50.0/+esm';
const RUNTIME_TIMEOUT_MS = 8000;
const SCENE_LOAD_TIMEOUT_MS = 12000;
const PICK_ACK_MS = 900;
const STILL_DIR = 'stills/';
const LOG_PREFIX = 'x3pick';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function initRive3DHost(root, { baseUrl } = {}) {
	const canvas = root.querySelector('[data-rive-3d-canvas]');
	const toggleBtn = root.querySelector('[data-rive-3d-toggle]');
	const resetBtn = root.querySelector('[data-rive-3d-reset]');
	const statusEl = root.querySelector('[data-asset-status="animascript3d"]');
	const preview = root.querySelector('.rive-gpu-preview');
	const stillImg = preview?.querySelector('img');
	const facetWrap = root.querySelector('[data-rive-3d-facets]');
	const liveEl = root.querySelector('[data-rive-3d-live]');
	const sceneBase = `${baseUrl}rive/animascript-3d/`;
	const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');

	const state = {
		mode: 'loading', // loading | live | static
		mirror: null,
		player: null,
		playing: false,
		elapsed: 0,
		lastTs: 0,
		raf: 0,
		sel: new Set(),
		pickBusy: false,
		pickWaiters: [],
		loadTimer: 0,
		observer: null,
		destroyed: false,
	};

	const status = (msg) => {
		if (statusEl) statusEl.textContent = msg;
	};
	const announce = (msg) => {
		if (!liveEl) return;
		liveEl.textContent = '';
		requestAnimationFrame(() => {
			liveEl.textContent = msg;
		});
	};
	const facetButtons = () => (facetWrap ? [...facetWrap.querySelectorAll('button')] : []);
	const setFacetButtonsEnabled = (on) => facetButtons().forEach((b) => (b.disabled = !on));
	const syncButtons = () => {
		for (const b of facetButtons()) b.setAttribute('aria-pressed', String(state.sel.has(Number(b.dataset.facet))));
	};
	const selWordsFor = (set) => {
		const w = new Uint32Array(8);
		for (const f of set) w[f >> 5] |= 1 << (f & 31);
		return w;
	};
	const canvasSize = () => ({ cssW: canvas.clientWidth || canvas.width, cssH: canvas.clientHeight || canvas.height });
	const canvasPoint = (x, y) => {
		const r = canvas.getBoundingClientRect();
		return { x: r.left + x, y: r.top + y };
	};
	const facetLabel = (i) => state.mirror?.facetId(i) ?? `facet-${i + 1}`;
	const facetStillUrl = (i) => `${sceneBase}${STILL_DIR}${facetLabel(i)}.png`;
	const assembledUrl = `${sceneBase}${STILL_DIR}assembled.png`;

	// ---- scene event sync: the only channel out of the sealed .riv ----
	const origLog = console.log;
	const origInfo = console.info;
	const origDebug = console.debug;
	const pickLine = /x3pick facet=(\d+) selected=([01]) count=(\d+)/;
	const resetLine = /x3pick reset count=0/;
	function onSceneLine(line) {
		const m = line.match(pickLine);
		if (m) {
			const f = Number(m[1]);
			if (m[2] === '1') state.sel.add(f);
			else state.sel.delete(f);
			syncButtons();
			announce(`${facetLabel(f)} ${m[2] === '1' ? 'selected' : 'deselected'} — ${m[3]} selected`);
		} else if (resetLine.test(line)) {
			state.sel.clear();
			syncButtons();
			announce('Selection reset — 0 facets selected');
		} else {
			return;
		}
		const waiters = state.pickWaiters.splice(0);
		for (const w of waiters) w.resolve(true);
	}
	const wrapped = (...args) => {
		const line = args.map((a) => String(a)).join(' ');
		if (line.includes(LOG_PREFIX)) onSceneLine(line);
	};
	function wrapConsole() {
		console.log = (...a) => (wrapped(...a), origLog.apply(console, a));
		console.info = (...a) => (wrapped(...a), origInfo.apply(console, a));
		console.debug = (...a) => (wrapped(...a), origDebug.apply(console, a));
	}
	function unwrapConsole() {
		console.log = origLog;
		console.info = origInfo;
		console.debug = origDebug;
	}
	const waitForSceneEvent = (ms) =>
		new Promise((resolve) => {
			const entry = { resolve: (v) => (clearTimeout(timer), resolve(v)) };
			const timer = setTimeout(() => {
				state.pickWaiters = state.pickWaiters.filter((w) => w !== entry);
				resolve(false);
			}, ms);
			state.pickWaiters.push(entry);
		});

	// ---- synthetic canvas click (MouseEvent: the events Rive binds) ----
	function dispatchCanvasClick(x, y) {
		const p = canvasPoint(x, y);
		for (const [type, buttons] of [
			['mousedown', 1],
			['mouseup', 0],
		]) {
			canvas.dispatchEvent(
				new MouseEvent(type, { clientX: p.x, clientY: p.y, button: 0, buttons, bubbles: true, cancelable: true })
			);
		}
	}

	// ---- orbit mirror: same stream, same deadzone/damping as main.as ----
	const localPoint = (e) => {
		const r = canvas.getBoundingClientRect();
		return [e.clientX - r.left, e.clientY - r.top];
	};
	const orbitHandlers = {};
	const onMouseDown = (e) => {
		const [x, y] = localPoint(e);
		state.mirror.orbitDown(x, y);
	};
	const onMouseMove = (e) => {
		if (!state.mirror.orbit.down) return;
		const [x, y] = localPoint(e);
		state.mirror.orbitMove(x, y);
	};
	const onMouseUp = () => state.mirror.orbitUp();
	const onTouchStart = (e) => {
		const t = e.changedTouches?.[0];
		if (!t) return;
		const r = canvas.getBoundingClientRect();
		state.mirror.orbitDown(t.clientX - r.left, t.clientY - r.top);
	};
	const onTouchMove = (e) => {
		if (!state.mirror.orbit.down) return;
		const t = e.changedTouches?.[0];
		if (!t) return;
		const r = canvas.getBoundingClientRect();
		state.mirror.orbitMove(t.clientX - r.left, t.clientY - r.top);
	};
	const onTouchEnd = () => state.mirror.orbitUp();
	function attachOrbitListeners() {
		for (const [type, fn] of [
			['mousedown', onMouseDown],
			['mousemove', onMouseMove],
			['mouseup', onMouseUp],
			['mouseleave', onMouseUp],
			['touchstart', onTouchStart],
			['touchmove', onTouchMove],
			['touchend', onTouchEnd],
			['touchcancel', onTouchEnd],
		]) {
			canvas.addEventListener(type, fn);
			orbitHandlers[type] = fn;
		}
	}
	function detachOrbitListeners() {
		for (const [type, fn] of Object.entries(orbitHandlers)) canvas.removeEventListener(type, fn);
	}

	// ---- facet aiming: solve a pickable point at the live pose ----
	function solveFacetNow(i) {
		const { cssW, cssH } = canvasSize();
		return state.mirror.solveFacetPoint(i, {
			phase: loopPhase(state.elapsed),
			userYaw: state.mirror.orbit.yaw,
			userPitch: state.mirror.orbit.pitch,
			cssW,
			cssH,
			selWords: selWordsFor(state.sel),
			phaseWindow: 0.04,
		});
	}
	function solveEmptyNow() {
		const { cssW, cssH } = canvasSize();
		return state.mirror.solveEmptyPoint({
			phase: loopPhase(state.elapsed),
			userYaw: state.mirror.orbit.yaw,
			userPitch: state.mirror.orbit.pitch,
			cssW,
			cssH,
			selWords: selWordsFor(state.sel),
		});
	}

	async function aimAndClick(solve, failureMsg) {
		const deadline = performance.now() + 2500;
		while (performance.now() < deadline && !state.destroyed) {
			const pt = solve();
			if (pt) {
				dispatchCanvasClick(pt.x, pt.y);
				const ack = await waitForSceneEvent(PICK_ACK_MS);
				if (!ack) announce('The scene did not register that click — try again.');
				return;
			}
			await sleep(90);
		}
		announce(failureMsg);
	}

	// ---- static mode: reduced motion, runtime failure, forced failure ----
	function stillForSelection() {
		if (state.sel.size === 1) return facetStillUrl([...state.sel][0]);
		return assembledUrl;
	}
	function onFacetButtonStatic(i) {
		if (state.sel.has(i)) state.sel.delete(i);
		else state.sel.add(i);
		syncButtons();
		if (stillImg) stillImg.src = stillForSelection();
		announce(
			state.sel.size === 0
				? 'Selection cleared — assembled still shown'
				: state.sel.size === 1
					? `${facetLabel([...state.sel][0])} still shown`
					: `${state.sel.size} facets selected — stills show one facet at a time`
		);
	}
	function enableStaticMode(reason) {
		if (state.mode === 'static') return;
		state.mode = 'static';
		state.playing = false;
		try {
			state.player?.pause?.();
		} catch (_) {}
		preview?.classList.remove('is-playing');
		if (toggleBtn) {
			toggleBtn.disabled = true;
			toggleBtn.textContent = 'Still frames';
		}
		if (resetBtn) resetBtn.disabled = false;
		setFacetButtonsEnabled(true);
		if (stillImg) stillImg.src = assembledUrl;
		status(reason);
		announce(reason);
	}

	function onFacetButton(i) {
		if (state.mode === 'static') return onFacetButtonStatic(i);
		if (state.mode !== 'live' || state.pickBusy || state.destroyed) return;
		state.pickBusy = true;
		setFacetButtonsEnabled(false);
		const id = facetLabel(i);
		announce(`Selecting ${id}…`);
		aimAndClick(() => solveFacetNow(i), `${id} is hidden right now; try again as the loop plays.`).finally(() => {
			state.pickBusy = false;
			setFacetButtonsEnabled(true);
		});
	}

	function onResetButton() {
		if (state.mode === 'static') {
			state.sel.clear();
			syncButtons();
			if (stillImg) stillImg.src = assembledUrl;
			announce('Selection reset — assembled still shown');
			return;
		}
		if (state.mode !== 'live' || state.pickBusy || state.destroyed) return;
		state.pickBusy = true;
		setFacetButtonsEnabled(false);
		aimAndClick(() => solveEmptyNow(), 'No empty point found — try again.').finally(() => {
			state.pickBusy = false;
			setFacetButtonsEnabled(true);
		});
	}

	function onToggleButton() {
		if (state.mode !== 'live' || !state.player) return;
		state.playing = !state.playing;
		if (state.playing) state.player.play();
		else state.player.pause();
		if (toggleBtn) toggleBtn.textContent = state.playing ? 'Pause 3D loop' : 'Resume 3D loop';
	}

	// ---- frame loop: scene elapsed + damped orbit mirror ----
	function tick(ts) {
		if (state.destroyed) return;
		if (state.lastTs && state.playing) {
			const dt = (ts - state.lastTs) / 1000;
			state.elapsed += dt;
			state.mirror.advanceOrbit(dt);
		}
		state.lastTs = ts;
		state.raf = requestAnimationFrame(tick);
	}

	function buildFacetButtons() {
		if (!facetWrap || !state.mirror) return;
		facetWrap.replaceChildren();
		for (let i = 0; i < state.mirror.facetCount; i++) {
			const b = document.createElement('button');
			b.type = 'button';
			b.className = 'rive-3d-facet';
			b.dataset.facet = String(i);
			b.disabled = true;
			b.setAttribute('aria-pressed', 'false');
			const chip = document.createElement('span');
			chip.className = 'facet-chip';
			chip.style.background = state.mirror.facetFill(i);
			chip.setAttribute('aria-hidden', 'true');
			b.append(chip, document.createTextNode(facetLabel(i)));
			b.addEventListener('click', () => onFacetButton(i));
			facetWrap.append(b);
		}
	}

	function teardownLive() {
		detachOrbitListeners();
		state.observer?.disconnect();
		state.observer = null;
		cancelAnimationFrame(state.raf);
		state.raf = 0;
		clearTimeout(state.loadTimer);
	}

	const onMotionChange = (e) => {
		if (e.matches && state.mode === 'live') {
			enableStaticMode('Reduced motion was enabled; showing a static frame of the 3D scene.');
			unwrapConsole();
			teardownLive();
		}
	};

	// Registered before the mode branches so reduced-motion, forced-failure
	// and mirror-load-failure paths hook unload too.
	window.addEventListener('pagehide', destroy, { once: true });

	// ---- boot ----
	try {
		const get = async (u) => {
			const r = await fetch(u);
			if (!r.ok) throw new Error(`${u} -> HTTP ${r.status}`);
			return u.endsWith('.json') ? r : new Uint8Array(await r.arrayBuffer());
		};
		state.mirror = await loadRive3DMirror({ baseUrl: sceneBase, get });
	} catch (error) {
		status('The generated favicon geometry could not be loaded; the verified static frame remains visible.');
		if (toggleBtn) toggleBtn.disabled = true;
		if (resetBtn) resetBtn.disabled = true;
		console.warn('Rive 3D mirror assets failed to load', error);
		return { destroy, state };
	}
	buildFacetButtons();
	// Bound before the mode branches so static/fallback modes get working
	// reset and facet controls too.
	if (toggleBtn) toggleBtn.addEventListener('click', onToggleButton);
	if (resetBtn) resetBtn.addEventListener('click', onResetButton);

	const forceFailure = new URLSearchParams(window.location.search).has('force-rive3d-failure');
	if (motionQuery?.matches) {
		enableStaticMode('Reduced motion is on; showing a static frame of the 3D scene. Facet buttons swap verified stills.');
		motionQuery.addEventListener?.('change', onMotionChange);
		return { destroy, state };
	}
	if (forceFailure) {
		enableStaticMode('The GPU scene could not load (forced failure test); verified stills remain available.');
		return { destroy, state };
	}

	try {
		const runtime = await Promise.race([
			import(/* @vite-ignore */ RUNTIME_URL),
			sleep(RUNTIME_TIMEOUT_MS).then(() => {
				throw new Error('Rive WebGL2 runtime timed out.');
			}),
		]);
		const api = runtime.rive ?? runtime.default?.rive ?? runtime.default ?? runtime;
		const { Rive } = api;
		if (typeof Rive !== 'function') throw new TypeError('The Rive WebGL2 runtime did not expose its player constructor.');

		wrapConsole();
		state.player = new Rive({
			src: `${sceneBase}build/fava_prismatic_3d.riv`,
			canvas,
			autoplay: true,
			enableGPUCanvas: true,
			useOffscreenRenderer: false,
			onLoad: () => {
				if (state.destroyed) return;
				state.mode = 'live';
				state.playing = true;
				state.lastTs = 0;
				clearTimeout(state.loadTimer);
				preview?.classList.add('is-playing');
				status(
					'Live Rive GPU Canvas scene: generated extruded meshes, depth-tested picking, and a nine-second choreography loop.'
				);
				if (toggleBtn) {
					toggleBtn.disabled = false;
					toggleBtn.textContent = 'Pause 3D loop';
				}
				if (resetBtn) resetBtn.disabled = false;
				setFacetButtonsEnabled(true);
				try {
					state.player.resizeDrawingSurfaceToCanvas();
				} catch (_) {}
				attachOrbitListeners();
				state.observer = new ResizeObserver(() => {
					try {
						state.player?.resizeDrawingSurfaceToCanvas();
					} catch (_) {}
				});
				state.observer.observe(canvas);
				state.raf = requestAnimationFrame(tick);
			},
			onLoadError: (error) => {
				console.error('Rive 3D file failed to load', error);
				enableStaticMode('The GPU scene could not load; verified stills remain available.');
				unwrapConsole();
				teardownLive();
			},
		});
		state.loadTimer = setTimeout(() => {
			if (state.mode === 'loading') {
				enableStaticMode('The GPU scene timed out; verified stills remain available.');
				unwrapConsole();
				teardownLive();
			}
		}, SCENE_LOAD_TIMEOUT_MS);
	} catch (error) {
		console.warn('Rive 3D runtime unavailable', error);
		unwrapConsole();
		enableStaticMode('Rive WebGL2 is unavailable; verified stills remain available.');
	}

	function destroy() {
		if (state.destroyed) return;
		state.destroyed = true;
		teardownLive();
		detachOrbitListeners();
		motionQuery?.removeEventListener?.('change', onMotionChange);
		if (toggleBtn) toggleBtn.removeEventListener('click', onToggleButton);
		if (resetBtn) resetBtn.removeEventListener('click', onResetButton);
		unwrapConsole();
		state.pickWaiters.splice(0).forEach((w) => w.resolve(false));
		try {
			state.player?.pause?.();
			state.player?.cleanup?.();
		} catch (_) {}
		state.player = null;
		facetWrap?.replaceChildren();
	}

	return { destroy, state };
}
