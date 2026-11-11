#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const [url, outputDir, name, widthText, heightText, portText] = process.argv.slice(2);
if (!url || !outputDir || !name || !widthText || !heightText || !portText) {
  throw new Error('usage: capture-chrome-session.mjs URL OUTPUT_DIR NAME WIDTH HEIGHT PORT');
}
const width = Number(widthText);
const height = Number(heightText);
const port = Number(portText);
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const profile = mkdtempSync(resolve(process.env.TMPDIR ?? '/tmp', `x0-cdp-${name}-`));
mkdirSync(outputDir, { recursive: true });
const rawDir = resolve(outputDir, 'raw-provenance');
mkdirSync(rawDir, { recursive: true });
const argv = [chrome, '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', 'about:blank'];
const startedAtUtc = new Date().toISOString();
const child = spawn(chrome, argv.slice(1), { stdio: ['ignore', 'ignore', 'pipe'] });
let chromeStderr = '';
child.stderr.setEncoding('utf8');
child.stderr.on('data', (chunk) => { chromeStderr += chunk; });
const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));

async function discoverTarget() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
      const page = targets.find((target) => target.type === 'page');
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {}
    await delay(100);
  }
  throw new Error('Chrome DevTools target did not become ready');
}

const commands = [];
let socket;
let nextId = 0;
const pending = new Map();
function cdp(method, params = {}) {
  const id = ++nextId;
  commands.push({ id, method, params });
  return new Promise((resolveCommand, rejectCommand) => {
    pending.set(id, { resolveCommand, rejectCommand });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

try {
  const wsUrl = await discoverTarget();
  socket = new WebSocket(wsUrl);
  await new Promise((resolveSocket, rejectSocket) => {
    socket.addEventListener('open', resolveSocket, { once: true });
    socket.addEventListener('error', rejectSocket, { once: true });
  });
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const item = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) item.rejectCommand(new Error(`${message.error.code}: ${message.error.message}`));
    else item.resolveCommand(message.result);
  });

  await cdp('Page.enable');
  await cdp('Runtime.enable');
  await cdp('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width <= 500 });
  await cdp('Page.navigate', { url });
  await delay(12000);
  await cdp('Runtime.evaluate', { expression: `document.querySelector('[data-authored="animascript3d"]')?.scrollIntoView({block: 'start'})` });
  await delay(500);
  const evaluated = await cdp('Runtime.evaluate', {
    expression: `JSON.stringify({html: document.documentElement.outerHTML, pageWidth: document.documentElement.scrollWidth, viewportWidth: window.innerWidth, viewportHeight: window.innerHeight, status: document.querySelector('[data-asset-status="animascript3d"]')?.textContent?.trim(), buttonLabel: document.querySelector('[data-rive-3d-toggle]')?.textContent?.trim(), buttonDisabled: document.querySelector('[data-rive-3d-toggle]')?.disabled, staticFallbackVisible: (() => { const image = document.querySelector('[data-authored="animascript3d"] .asset-preview img'); if (!image) return false; const r = image.getBoundingClientRect(); const s = getComputedStyle(image); return image.complete && r.width > 0 && r.height > 0 && s.display !== 'none' && s.visibility !== 'hidden'; })()})`,
    returnByValue: true,
  });
  const state = JSON.parse(evaluated.result.value);
  const screenshot = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true });
  const screenshotBytes = Buffer.from(screenshot.data, 'base64');
  const domPath = resolve(rawDir, `failure-${name}.dom.html`);
  const screenshotPath = resolve(outputDir, `route-fallback-failure-${name}.png`);
  const metricsPath = resolve(rawDir, `failure-${name}.session.json`);
  const transcriptPath = resolve(rawDir, `failure-${name}.cdp.json`);
  writeFileSync(domPath, state.html);
  writeFileSync(screenshotPath, screenshotBytes);
  const metrics = { schema: 'x0-browser-session/v2', requestedViewport: { width, height }, target: url, ...state, html: undefined };
  writeFileSync(metricsPath, `${JSON.stringify(metrics, null, 2)}\n`);
  const endedAtUtc = new Date().toISOString();
  const digest = (data) => createHash('sha256').update(data).digest('hex');
  const transcript = { schema: 'x0-cdp-transcript/v1', startedAtUtc, endedAtUtc, executable: chrome, argv, target: url, commands, chromeStderrSha256: digest(chromeStderr) };
  writeFileSync(transcriptPath, `${JSON.stringify(transcript, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify({
    startedAtUtc, endedAtUtc, executable: chrome, argv, exitCode: 0,
    domPath, domSha256: digest(state.html), screenshotPath, screenshotSha256: digest(screenshotBytes),
    metricsPath, metricsSha256: digest(`${JSON.stringify(metrics, null, 2)}\n`), transcriptPath,
    transcriptSha256: digest(`${JSON.stringify(transcript, null, 2)}\n`), chromeStderrSha256: digest(chromeStderr),
  })}\n`);
} finally {
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  const exited = new Promise((resolveExit) => child.once('exit', resolveExit));
  child.kill('SIGTERM');
  await Promise.race([exited, delay(2000)]);
  rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
