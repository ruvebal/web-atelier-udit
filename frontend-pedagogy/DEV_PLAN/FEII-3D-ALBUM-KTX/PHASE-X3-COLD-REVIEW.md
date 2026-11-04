# PHASE-X3 cold review — round 2

**Reviewer:** fresh `cascade-cold-reviewer` session; did not implement X3 or the F1 repair  
**Verdict:** all acceptance items pass. Prior P1 F1 is closed; there are no remaining findings that block promotion by the orchestrator.

## Inputs reviewed

- `PHASE-X3.md` and every Acceptance item
- complete updated diff/path list and `PHASE-X3-VERIFY-LOG.md` (exit code 0 after the repair)
- prior cold-review finding and the executor's updated report
- `frontend-pedagogy/grounding/README.mdc`, `PROFIELD-SYNC.json`, and `FEII-3D-ALBUM-KTX-CITATION-TRANSCRIPT-20261104.md`
- original 2026-08-14 audit plus the 2026-11-04 addendum in `AUDIT-GROUNDED.md`
- sovereign Angel and Shreiner Ahmes coat and the X1/X2 Profield artifacts

## Acceptance evidence

| Acceptance item | Independent runnable evidence | Result |
| --- | --- | --- |
| Matrix rows exist; every evidence cell names a coat or explicit gap | `rg` returned all three rows: `Satellite — cover shaders`, `Satellite — KTX2 first principles`, and `Assignment — 3D album cover`. The cover/assignment rows name coat `10_1145_3641235_3664433_the_future_of_teaching_computer_graphics_e2e9b45c`, its two node IDs, pages, and an explicit `[UNVERIFIED-GAP]`; the KTX2 row is an explicit gap with `[STANDARD]`/`[PRACTITIONER]` HOW notes. | PASS |
| Ahmes citation transcript exists for every promoted non-gap research claim | Against a fresh temporary copy of the sovereign `extraction.db`, `ahmes query --cite ...:348bd016-3aee-5eb3-ae93-b3d422e137df --style chicago-author-date --require-evaluator-safe` produced `(Angel 2024, 1)`, `page_index=0`, `confidence=0.95`, `evaluator_safe=yes`; node `92a534c1-6aff-5d5e-b1e5-2a7d2e2c65a9` produced `(Angel 2024, 2)`, `page_index=1`, `confidence=0.95`, `evaluator_safe=yes`. Direct read-only SQLite queries confirm the durable shader/render-function and fundamental-topics content. | PASS |
| Audit addendum keeps KTX2 on the student path and `corpus-to-boilerplate/` off it | `rg` finds `Addendum — 2026-11-04`, the student cover route and PNG/ETC1S/UASTC measurement-and-choice bar, and the retained instructor-only `corpus-to-boilerplate/` prohibition. The addendum states that it extends rather than replaces the 2026-08-14 split. | PASS |
| Student-facing Chicago forms exist; no fabricated DOI | The transcript lists Angel and Shreiner with DOI `10.1145/3641235.3664433`, matching the sovereign Ahmes metadata. Khronos, Three.js, and glTF are separate dated platform notes with no asserted DOI. ShaderMatch remains explicitly unpromoted because X2 landed no Ahmes node. | PASS |
| Run receipt is valid and matches its inputs | `jq -e . PROFIELD-SYNC.json` exited 0. Fresh SHA-256 values for `CONSOLIDATED.md`, `manifest.json`, and `PENDING-procurement.md` exactly match all three `feii_3d_album_ktx_20261104.audited_artifacts` hashes. | PASS |
| Prior privacy finding F1 is closed | See the independent ignore-boundary proof below. Only the intended audit is visible under `web-foundations/private/`; all tested sibling shapes remain ignored. | PASS |
| Cold review filed; blocking findings closed | This round-2 review is present. F1 is closed and no new P0/P1/P2 finding remains. | PASS |

## F1 closure — private-material boundary

The repaired rule sequence opens only the two required parent directories, re-ignores each parent's contents, and then negates the one authorized audit file:

```gitignore
!web-foundations/private/
web-foundations/private/*
!web-foundations/private/ai-assisted-3d/
web-foundations/private/ai-assisted-3d/*
!web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md
```

Independent `git check-ignore -q --no-index` probes produced:

```text
NOT_IGNORED web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md
IGNORED     web-foundations/private/ai-assisted-3d/SHOULD-STAY-IGNORED.md
IGNORED     web-foundations/private/another-secret.md
IGNORED     web-foundations/private/ai-assisted-3d/nested/secret.md
IGNORED     web-foundations/private/other-dir/secret.md
```

Verbose output identified the audit's final negation at `.gitignore:66`, the in-directory sibling rule at line 65, and the direct/other-directory sibling rule at line 63. `git status --short --untracked-files=all -- web-foundations/private` exposes exactly one path: `AUDIT-GROUNDED.md`. Thus the later `git add -A` cannot discover the tested sibling private paths through this exception.

## Agentic-change failure modes

1. **Import/load every touched module:** no executable module changed. `PROFIELD-SYNC.json` parses with `jq`; the phase gate exited 0 after the F1 repair.
2. **Full existing suite:** the phase-specific harness gate passed after the repair. X3 changes text, JSON, and ignore policy, not runtime code. The known host `ENOSPC` condition makes a duplicate full site build inapplicable here; the privacy counterfactual was exercised directly instead of inferred.
3. **Regression-test counterfactual:** the original broad rule failed the invented-sibling probes; the repaired rule passes them. This is a meaningful before/after test of F1 rather than a check that would pass on both trees.
4. **Unpack arity / return shapes:** not applicable; no callable implementation changed.
5. **Discriminated modes:** evaluator-safe research evidence, explicit gaps, and platform HOW notes remain distinct in the matrix, transcript, and receipt.
6. **Documentation claims as code claims:** node/page/evaluator status, receipt hashes, JSON validity, DOI metadata, audit boundary, private-path ignore behavior, visible status, and diff integrity were executed independently. `git diff --check` exited 0.

## Hard-constraint audit

The phase cites Ahmes nodes rather than vector snippets, keeps AI Co-Artist excluded, keeps KTX2 platform-note-only, adds no numbered unit, and leaves `corpus-to-boilerplate/` instructor-only. The repaired ignore exception no longer weakens the public repository's private-material firewall. No cloud SDK, lesson body, commercial artwork, aggregator code, `react-template` rewrite, merge, or push is present.

## Findings

None. Prior F1 is closed by runnable counterfactual evidence. This reviewer does not mark the phase `DONE`; promotion remains with the orchestrator.
