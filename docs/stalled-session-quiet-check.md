---
type: reference
title: Stalled Session Quiet-Check Helper
description: Documents the CLI usage, output schema, and required live rechecks for the Resume/S2 stalled-session quiet-check helper.
tags: [helper-scripts, resume]
---

# Stalled Session Quiet-Check Helper

Detects quiet windows for the Resume/S2 stalled-session recovery path.

## Purpose

When helper runtime is enabled, `idd-stalled-session-quiet-check` is the
canonical read-only evidence collector for Resume/S2 quiet-window checks.
It helps gather externally observable activity for an open PR without
changing claim state, review state, or CI state.

The helper does not replace the written policy. Resume/S2-S4 still owns
trusted-marker validation, stale-threshold gating, forced-handoff
routing, advisory constraints, and A5 race-safe takeover checks.

## Specification Reference

- `/.github/instructions/idd-resume-stall.instructions.md`
- [`docs/idd-helper-scripts.md`](idd-helper-scripts.md)
- [`schemas/stalled-session-quiet-check.schema.json`](../schemas/stalled-session-quiet-check.schema.json)

## Usage

### CLI

Preferred helper-runtime command:

For Resume/S2, derive a server-anchored timestamp from GitHub's `Date`
header and pass it explicitly; do not use the executor's local-clock
default when evaluating the quiet window.

```bash
idd-stalled-session-quiet-check \
  --pr <number> \
  [--owner <owner>] \
  [--repo <repo>] \
  [--gh-token <token>] \
  --now <server-anchored-ISO8601> \
  [--quiet-window-ms <ms>] \
  [--claim-created-at <ISO8601>] \
  [--policy <path>]
```

Vendored equivalent:

```bash
node scripts/stalled-session-quiet-check.mjs \
  --pr <number> \
  [--owner <owner>] \
  [--repo <repo>] \
  [--gh-token <token>] \
  --now <server-anchored-ISO8601> \
  [--quiet-window-ms <ms>] \
  [--claim-created-at <ISO8601>] \
  [--policy <path>]
```

#### Required parameter

- `--pr <number>`: Pull request number used to gather activity evidence
- `--now <server-anchored-ISO8601>`: Server `Date` header timestamp used as
  the reference clock for Resume/S2; do not use the executor's local clock

#### Optional parameters

- `--owner <owner>`: Repository owner; defaults to the current repository
- `--repo <repo>`: Repository name; defaults to the current repository
- `--gh-token <token>`: GitHub token override for `gh` API calls
- `--quiet-window-ms <ms>`: Quiet-window duration in milliseconds;
  defaults to the policy value or `1800000`
- `--claim-created-at <ISO8601>`: Latest valid trusted `claimed-by`
  `created_at` for the active non-owned claim; enables heartbeat
  evidence in Resume/S2
- `--policy <path>`: Alternate policy file used to resolve the default
  quiet window
- `--help`: Show help text

`--claim-created-at` should come from the trusted active-claim parse that
Resume already performs. If helper runtime is unavailable or the helper
output is unusable, the written manual procedure in
`idd-resume-stall.instructions.md` remains authoritative.

The helper must reject a malformed `--claim-created-at` as a call error
before emitting JSON. It must never copy an unvalidated raw value into
`policy.claim_created_at`, because the schema accepts only `null` or an
exact UTC timestamp. Until the pinned helper producer enforces this
contract, keep the repository on `instructions-only` and treat helper
output as unavailable.

## Stable output fields consumed by Resume/S2

Resume/S2 treats these fields as the stable contract:

- `quiet_window_met`
- `quiet_window_ms`
- `window_start`
- `now`
- `latest_activity`
- `latest_activity_type`
- `reason`
- `evidence.activity_count_in_window`
- `evidence.blocking_activities`
- `evidence.has_heartbeat_in_window`
- `evidence.has_ci_running`
- `evidence.has_branch_tip_movement`
- `evidence.branch_tip_evidence_source`
- `evidence.branch_tip_evidence_head_sha`
- `evidence.branch_tip_evidence_complete`

The CLI also includes `repository`, `pr`, and `policy` envelopes for
operator context. Those fields are useful for logging and diagnostics but
are not the gating fields Resume/S2 relies on.

## Output schema

The CLI returns JSON shaped like:

```json
{
  "repository": {
    "owner": "kurone-kito",
    "repo": "dantalion"
  },
  "pr": {
    "number": 526,
    "title": "refactor(instructions): make resume-stall helper-first",
    "head_sha": "9bf7bd353fe09a0514fcf3e36b3a323cb6c936fe",
    "html_url": "https://github.com/kurone-kito/dantalion/pull/526"
  },
  "policy": {
    "quiet_window_ms": 1800000,
    "claim_created_at": "2026-05-13T17:40:00Z"
  },
  "quiet_window_met": false,
  "quiet_window_ms": 1800000,
  "window_start": "2026-05-13T17:30:00Z",
  "now": "2026-05-13T18:00:00Z",
  "latest_activity": "2026-05-13T17:58:02Z",
  "latest_activity_type": "ci-completed",
  "reason": "activity-in-window: comment, ci-completed",
  "evidence": {
    "activity_count_in_window": 2,
    "blocking_activities": [
      {
        "type": "comment",
        "timestamp": "2026-05-13T17:52:41Z"
      },
      {
        "type": "ci-completed",
        "timestamp": "2026-05-13T17:58:02Z"
      }
    ],
    "has_heartbeat_in_window": false,
    "has_ci_running": false,
    "has_branch_tip_movement": false,
    "branch_tip_evidence_source": "pr-timeline",
    "branch_tip_evidence_head_sha": "9bf7bd353fe09a0514fcf3e36b3a323cb6c936fe",
    "branch_tip_evidence_complete": true
  }
}
```

`latest_activity_type` is descriptive evidence, not a standalone policy
decision. Resume/S2 still interprets the full response together with the
written instructions.

## Live rechecks required before takeover

Quiet-window evidence is only one gate in stalled-session recovery.
Before takeover, Resume/S4 must still:

1. Re-parse the active claim from trusted markers and confirm it is the
   same non-owned `{claim-id}` observed earlier.
2. Re-run this helper against live GitHub state, or repeat the written
   manual procedure when helper runtime is unavailable.
3. Re-check the stale-threshold gate. `quiet_window_met = true` never
   waives stale-age by itself.
4. Re-check closed/merged guards and stop if the issue or PR closed in
   the meantime.
5. Use A5 race-safe claim verification after posting takeover.

If the helper is unavailable, fails, or returns missing/contradictory
output, repeat the written manual procedure above with fresh live signals.
Stop and restart Resume routing only when that manual recheck is itself
incomplete, contradictory, or no longer quiet.

## Return code

Successful evaluations always exit with code `0`, including cases where
`quiet_window_met` is `false`. Use the JSON output to decide whether the
quiet window is satisfied.

## Error handling

The helper throws an error if:

- `--pr` is missing or invalid
- GitHub API calls fail
- The helper cannot parse a provided argument value

## Timestamp handling

- Activity timestamps come from GitHub API responses (server time)
- The helper implementation may expose a local-clock default (`new Date()`),
  but Resume/S2 and Resume/S4 must always pass `--now <ISO8601>` derived from
  a GitHub server `Date` header; local-clock evaluation is not valid for
  takeover evidence
- Branch-tip movement must use a GitHub-server-observed PR timeline or
  ref-update timestamp (`committed`, `head_ref_force_pushed`,
  `synchronize`, or an equivalent server-side head snapshot), never a
  commit object's author or committer date. If that server-side signal is
  unavailable or the timeline is incomplete, return hold/inconclusive
  evidence instead of treating the quiet window as satisfied.
- A helper profile may be enabled only after its pinned producer and schema
  expose the evidence source, current-head SHA binding, and completeness
  flag above. A producer that derives movement from a commit object's
  author/committer date does not satisfy this contract; keep the repository
  on `instructions-only` until the producer is updated.
- Normalizes timestamps to ISO8601 UTC with a `Z` suffix
- Treats `ci-running` as blocking even if its timestamp would otherwise
  fall outside the window

## Dependencies

- `gh` CLI tool for GitHub API access
- Node.js 22.23.2 or newer on the 22.x line, 24.2.0 or newer on the
  24.x line, or 26.0.0 or newer (the already-end-of-life 25.x line is
  excluded)
- No external npm packages required (uses only Node.js built-ins)
