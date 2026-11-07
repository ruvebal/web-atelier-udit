#!/usr/bin/env node
/**
 * Local preview for Hexaform living covers (no Jekyll required).
 * Strips YAML front matter and rewrites {{ '/path' | relative_url }} → /path
 * so assets resolve when serving from docs/.
 *
 *   node preview-server.mjs
 *   → http://127.0.0.1:4173/lessons/en/feii/canvas-25d-hex-field/demo/
 */
import http from 'node:http';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { extname, join, normalize, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const demoDir = resolve(dirnameFromMeta(import.meta.url));
const docsDir = resolve(demoDir, '../../../../..');
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '127.0.0.1';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.md': 'text/markdown; charset=utf-8',
};

function dirnameFromMeta(metaUrl) {
  return fileURLToPath(new URL('.', metaUrl));
}

function stripFrontMatter(text) {
  if (!text.startsWith('---')) return text;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return text;
  return text.slice(end + 4).replace(/^\r?\n/, '');
}

function rewriteLiquid(text) {
  return text.replace(/\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}/g, '$1');
}

function safeJoin(root, reqPath) {
  const decoded = decodeURIComponent(reqPath.split('?')[0]);
  const cleaned = normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const full = resolve(root, '.' + cleaned);
  if (!full.startsWith(root)) return null;
  return full;
}

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  try {
    let urlPath = req.url || '/';
    // Local landing previews (Jekyll-free) so heroes can be inspected with living Hexaform.
    if (urlPath === '/' || urlPath === '/index.html') {
      urlPath = '/lessons/en/feii/canvas-25d-hex-field/demo/landing-preview.html';
    } else if (urlPath === '/lessons/en/' || urlPath === '/lessons/en') {
      urlPath = '/lessons/en/feii/canvas-25d-hex-field/demo/lessons-hub-preview.html';
    }

    let filePath = safeJoin(docsDir, urlPath);
    if (!filePath) {
      send(res, 403, 'Forbidden');
      return;
    }

    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      filePath = join(filePath, 'index.html');
    }

    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      send(res, 404, `Not found: ${urlPath}`);
      return;
    }

    const ext = extname(filePath).toLowerCase();
    let body = readFileSync(filePath);
    let type = TYPES[ext] || 'application/octet-stream';

    if (ext === '.html' || ext === '.md' || ext === '.css' || ext === '.js') {
      let text = body.toString('utf8');
      if (ext === '.html' || ext === '.md') text = stripFrontMatter(text);
      if (ext === '.html') text = rewriteLiquid(text);
      body = Buffer.from(text, 'utf8');
    }

    send(res, 200, body, type);
  } catch (err) {
    send(res, 500, String(err?.stack || err));
  }
});

server.listen(port, host, () => {
  const gallery = `http://${host}:${port}/lessons/en/feii/canvas-25d-hex-field/demo/`;
  const lessons = `http://${host}:${port}/lessons/en/feii/canvas-25d-hex-field/demo/archive-lessons-en/`;
  console.log(`Hexaform preview → ${gallery}`);
  console.log(`Reference stamp  → ${lessons}`);
  console.log(`docs root         → ${relative(process.cwd(), docsDir) || '.'}`);
});
