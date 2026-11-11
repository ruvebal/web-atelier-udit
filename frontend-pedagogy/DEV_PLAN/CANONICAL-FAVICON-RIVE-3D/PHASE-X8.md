# PHASE-X8 · Post-merge provenance hook

**Status:** BLOCKED — PR A must be merged

## Goal

Turn the completed implementation’s real collaboration history into a public, sanitized, reproducible lesson receipt.

## Deliverables

- machine-readable provenance containing PR A URL/number, event IDs, commits, checks, review findings/resolutions, merge SHA and timestamps;
- editorial selection distinguishing human decisions, agent implementation, automated gates and cold review;
- updated public making-of route;
- docs/data-only PR B.

## Prompt

Fetch the remote state, then query Git and GitHub. Import immutable identifiers and exact relevant excerpts; link to originals. Redact secrets, local usernames outside authored credit, access tokens, irrelevant absolute paths and noisy logs. If any required event is absent, leave it pending and do not invent continuity. Stop at VERIFYING.

## Acceptance

- [ ] **A1** Every non-pending commit, comment, check and merge SHA resolves to a real Git/GitHub event with URL/ID, actor role, timestamp and source digest.
- [ ] **A2** Remote refs were fetched; PR A merge SHA is reachable from fetched `origin/main` and matches PR A metadata.
- [ ] **A3** Public text labels author, agent, automation and reviewer roles accurately and labels quotation versus summary.
- [ ] **A4** No token, credential, private prompt or irrelevant machine path reaches the built site.
- [ ] **A5** PR B diff is restricted to the provenance allowlist and passes publication checks.

## Risks

GitHub comments may contain material unsuitable for students. Sanitization may omit content but must never rewrite a quotation into a claim nobody made.
