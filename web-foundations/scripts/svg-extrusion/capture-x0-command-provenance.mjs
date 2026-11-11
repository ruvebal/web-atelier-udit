#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const web = resolve(repo, 'web-foundations');
const base = resolve(repo, 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/baseline/X0');
const sha = (data) => createHash('sha256').update(data).digest('hex');
const now = () => new Date().toISOString();
const env = { ...process.env, RBENV_VERSION: '3.3.11', PATH: `/Users/ruvebal/.rbenv/shims:${process.env.PATH}` };
mkdirSync(resolve(base, 'raw-provenance'), { recursive: true });

function resolveExecutable(command) {
  const result = spawnSync('/usr/bin/which', [command], { encoding: 'utf8', env });
  if (result.status !== 0) throw new Error(`cannot resolve ${command}`);
  return result.stdout.trim();
}

function run(label, command, args, cwd, extraEnv = {}) {
  const startedAtUtc = now();
  const executable = command.startsWith('/') ? command : resolveExecutable(command);
  const result = spawnSync(executable, args, { cwd, env: { ...env, ...extraEnv }, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const endedAtUtc = now();
  const stdout = result.stdout ?? '';
  const stderr = result.stderr ?? '';
  return { label, startedAtUtc, endedAtUtc, cwd, executable, argv: [executable, ...args], environment: { RBENV_VERSION: env.RBENV_VERSION, ...extraEnv }, exitCode: result.status, stdout, stderr, stdoutSha256: sha(stdout), stderrSha256: sha(stderr) };
}

const probes = [
  ['Rive CLI', 'rive', ['--version'], repo],
  ['Node.js', 'node', ['--version'], repo],
  ['npm', 'npm', ['--version'], repo],
  ['pnpm', 'pnpm', ['--version'], repo],
  ['Ruby', 'rbenv', ['exec', 'ruby', '--version'], web],
  ['Bundler', 'rbenv', ['exec', 'bundle', '--version'], web],
  ['Jekyll', 'rbenv', ['exec', 'bundle', 'exec', 'jekyll', '--version'], web],
  ['Chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--version'], repo],
].map(([...args]) => run(...args));
if (probes.some((probe) => probe.exitCode !== 0)) throw new Error('tool probe failed');
writeFileSync(resolve(base, 'tool-provenance.json'), `${JSON.stringify({ schema: 'x0-command-provenance/v1', probes }, null, 2)}\n`);
writeFileSync(resolve(base, 'tool-versions.json'), `${JSON.stringify({
  schema: 'x0-tool-versions/v3',
  capturedAtUtc: probes[0].startedAtUtc,
  tools: probes.map((probe) => ({ label: probe.label, command: probe.argv.join(' '), exitCode: probe.exitCode, stdout: probe.stdout.trim(), stderr: probe.stderr.trim(), executable: probe.executable, cwd: probe.cwd, startedAtUtc: probe.startedAtUtc, endedAtUtc: probe.endedAtUtc, stdoutSha256: probe.stdoutSha256, stderrSha256: probe.stderrSha256 })),
  environment: { platform: process.platform, architecture: process.arch, RBENV_VERSION: env.RBENV_VERSION },
}, null, 2)}\n`);

const build = run('Full pnpm build', 'pnpm', ['build'], web);
writeFileSync(resolve(base, 'raw-provenance/pnpm-build.stdout.log'), build.stdout);
writeFileSync(resolve(base, 'raw-provenance/pnpm-build.stderr.log'), build.stderr);
const buildRecord = { ...build, stdout: undefined, stderr: undefined, stdoutPath: 'raw-provenance/pnpm-build.stdout.log', stderrPath: 'raw-provenance/pnpm-build.stderr.log' };
writeFileSync(resolve(base, 'pnpm-build-command-transcript.json'), `${JSON.stringify({ schema: 'x0-command-provenance/v1', ...buildRecord }, null, 2)}\n`);
if (build.exitCode !== 0) throw new Error('full build failed');

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browserRuns = [];
for (const [name, width, height] of [['desktop', 1440, 893], ['mobile', 390, 844]]) {
  const temp = mkdtempSync(resolve(process.env.TMPDIR ?? '/tmp', `x0-chrome-${name}-`));
  const url = 'http://127.0.0.1:4000/web-atelier-udit/lessons/en/web-animations/svg-master-session/demo/#spatial-lab';
  const args = ['--headless=new', '--disable-gpu', '--disable-webgl', '--virtual-time-budget=12000', `--window-size=${width},${height}`, `--user-data-dir=${resolve(temp, 'profile')}`, '--dump-dom', url];
  const session = run(`Induced GPU failure ${name}`, chrome, args, repo);
  const domPath = resolve(base, `raw-provenance/failure-${name}.dom.html`);
  const stderrPath = resolve(base, `raw-provenance/failure-${name}.stderr.log`);
  writeFileSync(domPath, session.stdout);
  writeFileSync(stderrPath, session.stderr);
  const screenshotPath = resolve(base, `route-fallback-failure-${name}.png`);
  const metricsPath = resolve(base, `route-fallback-failure-${name}-metrics.json`);
  browserRuns.push({ ...session, stdout: undefined, stderr: undefined, domPath: `raw-provenance/failure-${name}.dom.html`, domSha256: sha(session.stdout), stderrPath: `raw-provenance/failure-${name}.stderr.log`, screenshotPath: `route-fallback-failure-${name}.png`, screenshotSha256: sha(readFileSync(screenshotPath)), metricsPath: `route-fallback-failure-${name}-metrics.json`, metricsSha256: sha(readFileSync(metricsPath)), requestedViewport: { width, height }, assertions: { failureStatusInDom: /GPU scene could not load/.test(session.stdout), staticFallbackInDom: /verified static frame remains visible/.test(session.stdout) } });
}
if (browserRuns.some((item) => item.exitCode !== 0 || !item.assertions.failureStatusInDom || !item.assertions.staticFallbackInDom)) throw new Error('browser failure provenance did not observe fallback');
writeFileSync(resolve(base, 'browser-failure-command-transcripts.json'), `${JSON.stringify({ schema: 'x0-browser-failure-provenance/v1', sessions: browserRuns }, null, 2)}\n`);
console.log('Captured X0 tool, build, and induced-browser provenance.');
