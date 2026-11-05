# PHASE-X16 cold review — live exhibition (D26)

**Reviewer:** cascade-cold-reviewer (did not implement).  
**Runbook:** [PHASE-X16.md](PHASE-X16.md)  
**Report under review:** [PHASE-X16-REPORT.md](PHASE-X16-REPORT.md) (status VERIFYING)  
**Harness verify log:** [PHASE-X16-VERIFY-LOG.md](PHASE-X16-VERIFY-LOG.md)  
**Review date:** 2026-11-05  
**Overall verdict:** **CLEAR** — no P0/P1 findings. Phase remains **VERIFYING** until product owner promotes; this reviewer does not mark DONE.

Hard constraints checked: [FEII-3D-ALBUM-KTX-CASCADE.md](FEII-3D-ALBUM-KTX-CASCADE.md) (no `web-atelier-udit` push claimed; D26 live Route endpoints).

---

## Independent verification (commands + output)

### 1. Pages workflow @ deployed SHA

```text
$ gh run view 42031920034 --repo ruvebal/feii-album-covers \
  --json conclusion,status,headSha,url,workflowName
{"conclusion":"success","headSha":"fd95b698cd1c49ee4acdf882cd1a2b68178e3ced",
 "status":"completed","url":"https://github.com/ruvebal/feii-album-covers/actions/runs/42031920034",
 "workflowName":"Pages"}
```

Local aggregator checkout matches deploy HEAD:

```text
$ cd …/courses-repos/feii-album-covers && git rev-parse HEAD
fd95b698cd1c49ee4acdf882cd1a2b68178e3ced
```

### 2. Live origin — base + deep-link SPA shells (`/usr/bin/curl`)

```text
$ curl -sS -o /dev/null -w "base=%{http_code}\n" -L https://ruvebal.github.io/feii-album-covers/
base=200

$ for p in /covers/_studio /covers/_fixture-webgl /covers/_fixture-dom /covers/_fixture-throw; do
    curl -sS -o /dev/null -w "$p=%{http_code}\n" "https://ruvebal.github.io/feii-album-covers$p"
  done
/covers/_studio=404
/covers/_fixture-webgl=404
/covers/_fixture-dom=404
/covers/_fixture-throw=404

$ grep -c 'id="root"' (bodies fetched with curl -L for / and each deep path)
1 on each of: /, _studio, _fixture-webgl, _fixture-dom, _fixture-throw
```

Live index markers:

```text
<title>Album covers — FE II Units 8–9</title>
<script … src="/feii-album-covers/assets/index-DNumiJ8b.js"></script>
```

Deployed lazy-load graph (live main bundle):

```text
$ curl -sSL …/assets/index-DNumiJ8b.js | grep -o 'import("./Route[^"]*"' | sort -u
import("./Route-BA8sdXd5.js"
import("./Route-BJ2qVj0b.js"
import("./Route-CVBfhgz-.js"
import("./Route-DAK3I4nl.js"
import("./Route-m090skCg.js"
react-three-fiber.esm-BnFcqnfE.js (referenced from main)
```

Matches report asset hashes (`index-DNumiJ8b.js`, `react-three-fiber.esm-BnFcqnfE.js`).

### 3. Report + CLOSING-AUDIT gate citations

- Report cites live base, fixture URLs, and workflow run **42031920034** (table §Deployment evidence; §Live origin verification).
- Section title **Deployment evidence (not local-only)**; no claim that local build alone satisfies X16.
- [CLOSING-AUDIT.md](CLOSING-AUDIT.md) § **X16 re-audit — D21–D26** includes **D26** row with exact live URLs, workflow link, and SPA 404+shell behaviour.

### 4. Harness exit gate (authoritative transcript)

[PHASE-X16-VERIFY-LOG.md](PHASE-X16-VERIFY-LOG.md): **Exit code 0**, ends with `OK PHASE-X16.exit-gate.sh`. Includes live deep-link probe line `deep link /covers/_studio -> HTTP 404 (SPA shell ok)`, X14/X15 exit gates, aggregator lint/build/smoke:x14.

Cold reviewer **attempted** independent re-run:

```text
$ FEII_ALBUM_COVERS=…/feii-album-covers bash PHASE-X16.exit-gate.sh
… OK through aggregator build …
REFUSED: web-foundations build failed — bundler 2.5.22 missing on reviewer Ruby 2.6
(exit non-zero via PHASE-X15.exit-gate.sh)
```

Harness runner environment is green; reviewer machine lacks Bundler 2.5.22 — **does not invalidate** harness log exit 0.

---

## Acceptance checklist (runbook §Acceptance)

| Item | Cold verdict | Evidence |
| --- | --- | --- |
| Pages workflow green; live gallery | **Met** | §1–2 above |
| Live `/`, `_studio`, WebGL/DOM fixtures; direct link + reload | **Met (curl); reload UI not re-run here** | §2; report browser reload claims not independently replayed (see F1) |
| Selector + prev/next/all on live origin | **Not independently verified** | Executor browser notes only (F1) |
| Keyboard, reduced motion, mobile, route-error recovery | **Partially verified** | smoke:x14 local (harness); live UX per report (F1) |
| Lazy load + isolation | **Met** | Live bundle dynamic imports + separate R3F chunk; harness smoke:x14 |
| Earlier applicable gates re-run | **Partial** | Harness: X14, X15, X16 + smoke:x14; X11–X13 scripts not in verify log (F2) |
| CLOSING-AUDIT D21–D26 + URLs | **Met** | CLOSING-AUDIT §X16 table |
| Cold review filed; blocking Fn | **Met** | This file; no blocking Fn identified |
| Report lists live URLs; no local-only completion | **Met** | Report §Deployment evidence |

---

## Findings

### F1 — Live browser UX (selector, keyboard, reload, mobile, reduced motion)

| Field | Value |
| --- | --- |
| Severity | **P2** |
| Blocks DONE | No |
| Evidence | Cold reviewer reproduced **HTTP + SPA shell + lazy chunk graph** only (§2). Report §Live origin verification documents cursor-ide-browser checks; not re-executed in this session. |
| Fix | Optional: attach screenshots or a short Playwright log on live origin for PO archive; not required to unblock exhibition deploy evidence. |

### F2 — X11 / X12 / X13 exit gates absent from harness transcript

| Field | Value |
| --- | --- |
| Severity | **P2** |
| Blocks DONE | No (for X16 deploy scope) |
| Evidence | [PHASE-X16-VERIFY-LOG.md](PHASE-X16-VERIFY-LOG.md) runs X14, X15, X16 only. Report acknowledges X11/X13 not re-run; X15 includes `wf_build` (lesson HTML). X16 cascade pack changes are audit/report docs, not lesson body edits. |
| Fix | Before next lesson-touching phase, re-run `PHASE-X11.exit-gate.sh` / `X12` / `X13` on harness host; or add explicit X16 scope note in runbook that exhibition close re-runs X14–X15 only. |

### F3 — D23 prose vs live repo visibility

| Field | Value |
| --- | --- |
| Severity | **P2** |
| Blocks DONE | No |
| Evidence | CLOSING-AUDIT D23 row and report §Uncertain: DECISIONS still “not public”; `gh api` reports public. Course rule (PR merge) unchanged. |
| Fix | Professor amends DECISIONS or adds AMENDED note (already deferred in report). |

### F4 — D24 react-template reference URLs 404

| Field | Value |
| --- | --- |
| Severity | **P2** |
| Blocks DONE | No (professor scope, D14) |
| Evidence | Report §D24; CLOSING-AUDIT D24 **DEFER (professor)** with live 404 URLs. |
| Fix | Publish `react-template` when authorised; no X16 implementer action. |

---

## P0 / P1 summary

**None.** Exhibition deploy proof is live-origin + green Pages run **42031920034** @ `fd95b69`, not local-only build.

---

## Downstream / cascade notes

- No downstream phase assumption invalidated by this review.
- D14: no evidence of `web-atelier-udit` push in X16 report or this audit.
- Product owner: after triaging F1–F4, may promote VERIFYING → DONE; cold reviewer does not.

---

## Blocking Fn

None filed.
