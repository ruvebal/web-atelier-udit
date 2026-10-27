#!/usr/bin/env node
/**
 * Q-FA1 — Mondrian tree atmosphere (geometry_only).
 * Pedagogy: early trees / fractal analysis as prologue — not Neo-Plastic MVP.
 * Geometry: ./lib/mondrian-tree-geometry.mjs (fractal-architect mondrian-tree-mode).
 */
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ADAPTER,
  CITATION,
  GEOMETRY,
  MODULE,
  MODULE_VERSION,
  formulaRecord,
  renderTreeAtmosphereSvg,
} from './lib/mondrian-tree-geometry.mjs';

const GENERATOR_VERSION = '1.1.0';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const FORGE = resolve(ROOT, '../frontend-pedagogy/forge/mondrian-project');
const ORIGINAL_ROOT = resolve(ROOT, '../frontend-pedagogy/fractal-architecture/originals/mondrian-tree');
const ARCHIVE_ROOT = resolve(ROOT, '../frontend-pedagogy/archives/fractal-mondrian-tree');
const DELIVERY_COURSE = resolve(ROOT, 'docs/assets/images/mondrian-tree');
const DELIVERY_PITCH = resolve(FORGE, 'assets/mondrian-tree');
const PRIVATE_RECEIPT = resolve(ROOT, '../frontend-pedagogy/grounding/fractal-architecture/mondrian-tree-qfa1.private.json');

const SURFACES = [
  { surface: 'pitch', family: 'prologue', phase: 0.12, density: 0.9, rotate: 0 },
  { surface: 'pitch', family: 'refuse-matrix', phase: 0.38, density: 1.05, rotate: -8 },
  { surface: 'pitch', family: 'research-frame', phase: 0.71, density: 0.85, rotate: 6 },
  { surface: 'course', family: 'atmosphere-a', phase: 0.19, density: 0.95, rotate: -4 },
  { surface: 'course', family: 'atmosphere-b', phase: 0.47, density: 1.0, rotate: 3 },
  { surface: 'course', family: 'atmosphere-c', phase: 0.83, density: 0.88, rotate: -10 },
];

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function uuidFromHash(value) {
  const hash = sha256(value);
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-5${hash.slice(13, 16)}-${((Number.parseInt(hash.slice(16, 18), 16) & 0x3f) | 0x80).toString(16)}${hash.slice(18, 20)}-${hash.slice(20, 32)}`;
}

function writeImmutable(path, bytes) {
  if (existsSync(path)) {
    if (sha256(readFileSync(path)) !== sha256(bytes)) throw new Error(`Immutable asset collision: ${path}`);
    return;
  }
  writeFileSync(path, bytes);
}

function copyImmutable(source, destination) {
  if (existsSync(destination)) {
    if (sha256(readFileSync(source)) !== sha256(readFileSync(destination))) {
      throw new Error(`Immutable delivery collision: ${destination}`);
    }
    return;
  }
  copyFileSync(source, destination);
}

function renderSvg(item) {
  return renderTreeAtmosphereSvg({
    w: 1600,
    h: 900,
    family: `${item.surface}-${item.family}`,
    density: item.density,
    rotate: item.rotate,
    phase: item.phase,
    veils: true,
  });
}

mkdirSync(ORIGINAL_ROOT, { recursive: true });
mkdirSync(DELIVERY_COURSE, { recursive: true });
mkdirSync(DELIVERY_PITCH, { recursive: true });
mkdirSync(ARCHIVE_ROOT, { recursive: true });
mkdirSync(dirname(PRIVATE_RECEIPT), { recursive: true });

const outputs = SURFACES.map((item) => {
  const svg = renderSvg(item);
  const svgSha = sha256(svg);
  const stem = `udit-mondrian-tree-${item.surface}-${item.family}-${svgSha.slice(0, 12)}`;
  return { ...item, svg, svgSha, stem, file: `${stem}.svg`, png: `${stem}.png` };
});

const releaseId = sha256(JSON.stringify({ adapter: ADAPTER, module: MODULE_VERSION, hashes: outputs.map((o) => o.svgSha) })).slice(0, 16);
const originalReleaseDir = join(ORIGINAL_ROOT, `release-${releaseId}`);
mkdirSync(originalReleaseDir, { recursive: true });
const createdAt = new Date().toISOString();

for (const output of outputs) {
  const origSvg = join(originalReleaseDir, output.file);
  const origPng = join(originalReleaseDir, output.png);
  writeImmutable(origSvg, output.svg);
  if (!existsSync(origPng)) {
    const raster = spawnSync('rsvg-convert', ['-w', '1600', '-h', '900', '-o', origPng, origSvg], { encoding: 'utf8' });
    if (raster.status !== 0) throw new Error(`PNG failed ${output.file}: ${raster.stderr || raster.stdout}`);
  }
  const delivery = output.surface === 'pitch' ? DELIVERY_PITCH : DELIVERY_COURSE;
  copyImmutable(origSvg, join(delivery, output.file));
  copyImmutable(origPng, join(delivery, output.png));
  output.pngSha = sha256(readFileSync(origPng));
  output.uuid = uuidFromHash(`mondrian-tree:${output.svgSha}`);
  output.delivery_dir = delivery;
}

const formula = formulaRecord();
const formulaRecordPublic = {
  uuid: uuidFromHash(`geometry-only:${ADAPTER}`),
  fractal_hash256: sha256(`${ADAPTER}:θ=${GEOMETRY.angle_deg}:R=${GEOMETRY.scale_r}:depth=${GEOMETRY.iterations}`),
  title: 'Recursive binary branch (geometry_only)',
  display: formula.display,
  latex: null,
  basic_explanation:
    'A deterministic recursive branching walk with fixed angle and length ratio. Used as atmosphere after early Mondrian trees; not a transcription of a fractal-dimension equation and not a Neo-Plastic grid.',
  citation: { inline: CITATION.inline, chicago: CITATION.chicago },
  disposition: CITATION.disposition,
  module: `${MODULE}@${MODULE_VERSION}`,
};

const figcaptionManifest = {
  schema_version: '1.0.0',
  kind: 'fractal-architect.figcaption-data',
  release_id: releaseId,
  created_at: createdAt,
  authorship: { name: 'Ruvebal', email: 'ruvebal@crea-comm.net' },
  libraries: {
    skills: { 'fractal-architect': '1.3.0', 'visual-forger': '1.3.0' },
    modules: { [MODULE]: MODULE_VERSION, adapter: ADAPTER },
    generator: `generate-mondrian-tree-backgrounds@${GENERATOR_VERSION}`,
  },
  pedagogical_boundary: 'Early-tree prologue atmosphere only; Neo-Plastic MVP corpus remains orthogonal black-armature works.',
  formulae: [formulaRecordPublic],
  figures: outputs.map((o) => ({
    uuid: o.uuid,
    title: `Mondrian tree atmosphere — ${o.surface}/${o.family}`,
    description: `Recursive branching backdrop (${o.family}) for ${o.surface} surface; title-safe left field.`,
    figcaption: `Study after early Mondrian trees (geometry_only branching). ${CITATION.inline}. Not a neoplastic composition.`,
    fractal_hash256: o.svgSha,
    created_at: createdAt,
    authorship: { name: 'Ruvebal', email: 'ruvebal@crea-comm.net' },
    formulae: [formulaRecordPublic],
    delivery: {
      svg: `assets relative: mondrian-tree/${o.file}`,
      png: `assets relative: mondrian-tree/${o.png}`,
      surface: o.surface,
    },
  })),
};

for (const dir of [DELIVERY_COURSE, DELIVERY_PITCH]) {
  const capDir = join(dir, 'caption-manifests');
  mkdirSync(capDir, { recursive: true });
  writeFileSync(join(capDir, `${releaseId}.json`), `${JSON.stringify(figcaptionManifest, null, 2)}\n`);
}
writeFileSync(
  join(DELIVERY_COURSE, 'index.json'),
  `${JSON.stringify({
    current_release_id: releaseId,
    created_at: createdAt,
    adapter: ADAPTER,
    module: `${MODULE}@${MODULE_VERSION}`,
    surfaces: outputs.filter((o) => o.surface === 'course').map((o) => ({ family: o.family, svg: o.file, png: o.png, sha256: o.svgSha })),
  }, null, 2)}\n`,
);
writeFileSync(
  join(DELIVERY_PITCH, 'index.json'),
  `${JSON.stringify({
    current_release_id: releaseId,
    created_at: createdAt,
    adapter: ADAPTER,
    module: `${MODULE}@${MODULE_VERSION}`,
    surfaces: outputs.filter((o) => o.surface === 'pitch').map((o) => ({ family: o.family, svg: o.file, png: o.png, sha256: o.svgSha })),
  }, null, 2)}\n`,
);

const privateReceipt = {
  kind: 'fractal-architect.private-receipt',
  release_id: releaseId,
  created_at: createdAt,
  queue_id: 'Q-FA1',
  adapter: ADAPTER,
  module: `${MODULE}@${MODULE_VERSION}`,
  generator_version: GENERATOR_VERSION,
  skill: 'fractal-architect@1.3.0',
  original_release_dir: originalReleaseDir,
  delivery: { course: DELIVERY_COURSE, pitch: DELIVERY_PITCH },
  citation_gate: CITATION,
  ahmes_note: 'Public manifests omit vault/node IDs; Bountis coat repaired DOI 10.1504/ijart.2017.083902 under mondrian-project.',
  assets: outputs.map((o) => ({
    uuid: o.uuid,
    surface: o.surface,
    family: o.family,
    svg_sha256: o.svgSha,
    png_sha256: o.pngSha,
    original_svg: join(originalReleaseDir, o.file),
  })),
};
writeFileSync(PRIVATE_RECEIPT, `${JSON.stringify(privateReceipt, null, 2)}\n`);

console.log(JSON.stringify({ release_id: releaseId, figures: outputs.length, course: DELIVERY_COURSE, pitch: DELIVERY_PITCH, module: `${MODULE}@${MODULE_VERSION}` }, null, 2));
