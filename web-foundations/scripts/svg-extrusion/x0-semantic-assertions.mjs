import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readJson = (root, path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const digest = (root, path) => createHash('sha256').update(readFileSync(resolve(root, path))).digest('hex');
const pack = 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D';
const base = `${pack}/baseline/X0`;
const inventoryPath = `${base}/source-inventory.json`;
const svgPath = 'web-foundations/docs/assets/icons/fava-mark-static.svg';
const evidenceFile = (root, name) => {
  const override = process.env.X0_EVIDENCE_OVERRIDE_BASE;
  const candidate = override ? resolve(override, name) : null;
  return candidate && existsSync(candidate) ? JSON.parse(readFileSync(candidate, 'utf8')) : readJson(root, `${base}/${name}`);
};
export const X0_ASSERTION_IDS = {
  A1: ['source_digest_matches', 'source_order_is_complete', 'fixture_count_is_separate_from_dynamic_N'],
  A2: ['tracked_binary_digest_matches', 'browser_runtime_loaded', 'cli_project_verify_is_distinct'],
  A3: ['desktop_and_narrow_captures_exist', 'failure_fallback_and_status_captured', 'measured_widths_fit_viewports'],
  A4: ['dated_tool_version_commands_recorded'],
  A5: ['report_remains_VERIFYING', 'downstream_dynamic_N_and_math_contracts_amended'],
  A6: ['negative_mutations_rejected', 'receipt_exit_code_without_transcript_rejected'],
  A7: ['all_15_anchor_ids_have_page_context', 'page_and_document_identity_match', 'ACM_source_remains_unsafe'],
};

function pageTextDigest(page) {
  const text = page.nodes.map((node) => `${node.nodeId}\n${node.text}`).join('\n');
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

export function assertX0Acceptance(id, root) {
  const inventory = readJson(root, inventoryPath);
  const report = readFileSync(resolve(root, `${pack}/PHASE-X0-REPORT.md`), 'utf8');
  const runbooks = ['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7']
    .map((phase) => readFileSync(resolve(root, `${pack}/PHASE-${phase}.md`), 'utf8')).join('\n');
  const contexts = evidenceFile(root, 'research-anchor-page-contexts.json');
  switch (id) {
    case 'A1': {
      const svg = readFileSync(resolve(root, svgPath), 'utf8');
      const pathCount = [...svg.matchAll(/<path\b/g)].length;
      if (digest(root, svgPath) !== inventory.sourceSha256) throw new Error('A1: source SVG digest is stale');
      if (pathCount !== inventory.observedFacetCount || inventory.observedFacetCount !== 13) throw new Error('A1: source path count differs from golden fixture inventory');
      if (inventory.expectedCanonicalFixtureFacetCount !== 13 || !inventory.architectureFacetCount.includes('N')) throw new Error('A1: fixture count and dynamic architecture capacity are conflated');
      if (inventory.facets.length !== pathCount || inventory.facets.some((facet, index) => facet.sourceOrdinal !== index + 1)) throw new Error('A1: source-order facet inventory is incomplete');
      return 'PASS A1: source digest, source-order path inventory, golden fixture N=13, and dynamic capacity verified';
    }
    case 'A2': {
      const runtime = readJson(root, `${base}/rive-runtime-baseline.json`);
      const asset = runtime.artifact;
      if (digest(root, asset.path) !== asset.sha256 || readFileSync(resolve(root, asset.path)).byteLength !== asset.bytes) throw new Error('A2: tracked Rive binary digest or size is stale');
      if (!runtime.browserRuntime.routeStatus.includes('Signed Rive GPU Canvas scene')) throw new Error('A2: successful baseline browser runtime status is absent');
      const jsonStart = runtime.cliProjectVerify.output.indexOf('{');
      const cliResult = JSON.parse(runtime.cliProjectVerify.output.slice(jsonStart));
      if (cliResult.data.riv !== null || cliResult.data.bytes !== 0) throw new Error('A2: CLI source-project verification is not distinguished from binary verification');
      return 'PASS A2: tracked Rive digest and separate CLI/browser observations verified';
    }
    case 'A3': {
      const metrics = readJson(root, `${base}/route-runtime-metrics.json`);
      const failureMetrics = readJson(root, `${base}/route-fallback-failure-metrics.json`);
      const browserProvenance = evidenceFile(root, 'browser-failure-command-transcripts.json');
      if (browserProvenance.sessions?.length !== 2) throw new Error('A3: induced-failure execution provenance is absent');
      if (metrics.desktop.viewportWidth !== 1440 || metrics.mobile.viewportWidth !== 390) throw new Error('A3: expected desktop and narrow viewport measurements are absent');
      for (const [name, size] of [['route-desktop-1440x980.png', 1440], ['route-mobile-390x844.png', 390], ['route-rive3d-desktop-1440x980.png', 1440], ['route-rive3d-mobile-390x844.png', 390]]) {
        const bytes = readFileSync(resolve(root, `${base}/${name}`));
        if (bytes.toString('hex', 0, 4) !== '89504e47' || bytes.readUInt32BE(16) !== size) throw new Error(`A3: missing/invalid capture ${name}`);
      }
      if (!metrics.desktop.fallbackLoaded || metrics.desktop.pageWidth > metrics.desktop.viewportWidth || metrics.mobile.pageWidth > metrics.mobile.viewportWidth) throw new Error('A3: fallback or page-width metrics do not satisfy measured baseline');
      for (const viewport of ['desktop', 'mobile']) {
        const failed = failureMetrics[viewport];
        if (!failed?.staticFallbackVisible || !/unavailable|could not load|failed/i.test(failed.status ?? '')) throw new Error(`A3: failed-runtime fallback/status is absent at ${viewport}`);
        if (failed.pageWidth > failed.viewportWidth) throw new Error(`A3: page overflow at ${viewport} failure capture`);
        if (failed.buttonLabel !== 'GPU scene unavailable' || failed.buttonDisabled !== true) throw new Error(`A3: failed-runtime control is misleading at ${viewport}`);
        const image = readFileSync(resolve(root, `${base}/route-fallback-failure-${viewport}.png`));
        if (image.toString('hex', 0, 4) !== '89504e47' || image.readUInt32BE(16) !== failed.viewportWidth || image.readUInt32BE(20) !== failed.viewportHeight) throw new Error(`A3: failure screenshot dimensions do not match ${viewport} viewport`);
      }
      for (const session of browserProvenance.sessions) {
        if (session.exitCode !== 0 || !session.cwd || !session.executable || !Array.isArray(session.argv) || !session.startedAtUtc || !session.endedAtUtc) throw new Error('A3: incomplete induced-failure execution provenance');
        if (!session.argv.includes('--disable-gpu') || !session.argv.includes('--disable-webgl') || !session.assertions?.failureStatusInDom || !session.assertions?.staticFallbackInDom) throw new Error('A3: induced browser session did not prove the failure fallback');
        if (digest(root, `${base}/${session.screenshotPath}`) !== session.screenshotSha256 || digest(root, `${base}/${session.metricsPath}`) !== session.metricsSha256) throw new Error('A3: browser provenance is not bound to capture/metrics');
      }
      return 'PASS A3: baseline/failure route captures, truthful fallback status, and measured dimensions verified';
    }
    case 'A4': {
      const versions = evidenceFile(root, 'tool-versions.json');
      const provenance = evidenceFile(root, 'tool-provenance.json');
      const build = evidenceFile(root, 'pnpm-build-command-transcript.json');
      const labels = new Set(versions.tools.map((tool) => tool.label));
      for (const label of ['Rive CLI', 'Node.js', 'npm', 'pnpm', 'Ruby', 'Bundler', 'Jekyll', 'Chrome']) if (!labels.has(label)) throw new Error(`A4: missing ${label} version record`);
      if (!/^2026-11-11/.test(versions.capturedAtUtc ?? '')) throw new Error('A4: tool capture date is absent');
      if (provenance.probes?.length !== 8) throw new Error('A4: complete runner provenance is absent');
      for (const tool of versions.tools) {
        const probe = provenance.probes.find((item) => item.label === tool.label);
        if (!probe || probe.exitCode !== 0 || !probe.executable || !probe.cwd || !probe.startedAtUtc || !probe.endedAtUtc) throw new Error(`A4: incomplete runner provenance for ${tool.label}`);
        if (tool.exitCode !== probe.exitCode || tool.stdout !== probe.stdout.trim() || tool.stderr !== probe.stderr.trim() || tool.stdoutSha256 !== probe.stdoutSha256 || tool.stderrSha256 !== probe.stderrSha256) throw new Error(`A4: tool record does not match runner transcript for ${tool.label}`);
      }
      const expectedOutputs = { 'Rive CLI': /^rive 1\.9\.2/, 'Node.js': /^v24\./, npm: /^11\./, pnpm: /^10\./, Ruby: /^ruby 3\.3\.11/, Bundler: /^Bundler version 2\.5\.22/, Jekyll: /^jekyll 3\.10\.0/, Chrome: /^Google Chrome 157\./ };
      for (const tool of versions.tools) if (!expectedOutputs[tool.label]?.test(tool.stdout)) throw new Error(`A4: unexpected verified output for ${tool.label}`);
      if (build.exitCode !== 0 || build.environment?.RBENV_VERSION !== '3.3.11' || !build.cwd || !build.executable || !build.startedAtUtc || !build.endedAtUtc) throw new Error('A4: full-build runner provenance is incomplete');
      if (digest(root, `${base}/${build.stdoutPath}`) !== build.stdoutSha256 || digest(root, `${base}/${build.stderrPath}`) !== build.stderrSha256) throw new Error('A4: full-build raw streams do not match transcript');
      return 'PASS A4: dated Rive, Node, package manager, Ruby, Jekyll, and browser records verified';
    }
    case 'A5': {
      if (!report.includes('**Status:** VERIFYING')) throw new Error('A5: report no longer says VERIFYING');
      for (const phrase of ['dynamic n', 'source-only', 'publication']) if (!report.toLowerCase().includes(phrase)) throw new Error(`A5: report lacks ${phrase}`);
      for (const phrase of ['down-Y', 'quaternion', 'engineering derivation', 'Möller–Trumbore']) if (!runbooks.toLowerCase().includes(phrase.toLowerCase())) throw new Error(`A5: downstream runbooks lack ${phrase}`);
      return 'PASS A5: VERIFYING report and downstream N/math/source amendments verified';
    }
    case 'A6': {
      const mutation = evidenceFile(root, 'validator-mutation-results.json');
      const required = ['missing-id', 'extra-id', 'bad-digest', 'nonzero-exit', 'nonzero-transcript', 'pending-claim', 'prose-only-claim', 'falsified-tool-output', 'missing-browser-provenance', 'omitted-authoritative-page-member'];
      if (!mutation.results || required.some((name) => mutation.results[name] !== 'REJECTED')) throw new Error('A6: validator negative mutation cases are incomplete');
      if (mutation.results['receipt-exit-code-only'] !== 'REJECTED') throw new Error('A6: validator accepts a receipt exitCode without successful command transcript');
      return 'PASS A6: negative fixture suite proves validator rejects all required mutations';
    }
    case 'A7': {
      const initial = readJson(root, `${base}/research-anchor-verification.json`);
      const authority = evidenceFile(root, 'research-authoritative-page-membership.json');
      const expectedSourceByNode = new Map(initial.sources.flatMap((source) => source.nodes.map((node) => [node.nodeId, source.key])));
      const expected = [...expectedSourceByNode.keys()].sort();
      const observed = contexts.contexts.map((item) => item.anchorNodeId).sort();
      if (contexts.anchorCount !== 15 || contexts.contextCount !== 15 || JSON.stringify(expected) !== JSON.stringify(observed)) throw new Error('A7: all 15 anchor IDs are not represented in page-context evidence');
      for (const item of contexts.contexts) {
        const page = item.pageContext;
        const citationPage = Number(/page_index=(\d+)/.exec(item.pageIdentity.citationResolution)?.[1]);
        if (!item.anchorIsPageMember || item.pageIdentity.pageIndexZeroBased !== page.pageIndexZeroBased) throw new Error(`A7: page identity/membership mismatch for ${item.anchorNodeId}`);
        if (citationPage !== page.pageIndexZeroBased || item.sourceKey !== expectedSourceByNode.get(item.anchorNodeId)) throw new Error(`A7: source/page identity does not match the original anchor for ${item.anchorNodeId}`);
        if (!page.nodes.some((node) => node.nodeId === item.anchorNodeId) || !page.nodes.every((node) => typeof node.text === 'string')) throw new Error(`A7: incomplete page text for ${item.anchorNodeId}`);
        if (!item.documentIdentity.title || !item.documentIdentity.originalFileSha256) throw new Error(`A7: document identity absent for ${item.anchorNodeId}`);
        if (pageTextDigest(page) !== item.pageContextTextSha256) throw new Error(`A7: page context text digest mismatch for ${item.anchorNodeId}`);
        const sourceAuthority = authority.sources?.find((source) => source.sourceKey === item.sourceKey);
        const authoritativePage = sourceAuthority?.pages?.find((candidate) => candidate.pageIndexZeroBased === page.pageIndexZeroBased);
        const contextIds = page.nodes.map((node) => node.nodeId);
        if (!sourceAuthority || sourceAuthority.unassignedNodeIds.length !== 0 || sourceAuthority.totalFissionNodeCount !== sourceAuthority.assignedNodeCount) throw new Error(`A7: authoritative source membership is incomplete for ${item.sourceKey}`);
        if (!authoritativePage || authoritativePage.nodeCount !== contextIds.length || JSON.stringify(authoritativePage.nodeIds) !== JSON.stringify(contextIds)) throw new Error(`A7: page context does not match authoritative membership for ${item.anchorNodeId}`);
        if (item.sourceKey === 'acm_cs2023' ? !item.sourceOnlyGap || item.evaluatorSafe : item.sourceOnlyGap || !item.evaluatorSafe) throw new Error(`A7: source confidence boundary changed for ${item.anchorNodeId}`);
      }
      if (contexts.validation.unsafeAcMSourceRemainsSourceOnly !== true) throw new Error('A7: ACM source-only boundary is not preserved');
      return 'PASS A7: anchor membership, page identity/text, document identity, and ACM gap verified';
    }
    default: throw new Error(`Unknown X0 acceptance ID ${id}`);
  }
}
