# IDD — Resume Stalled-Session Recovery (Lite)

Lite profile for weak / local models. Same semantics as
`idd-resume-stall.instructions.md`. Use only for a **non-owned** active
claim with **no** valid human-gated forced-handoff.

Enter from `idd-resume-lite.instructions.md` Step 0. After a successful
takeover, return to resume lite Step 1.

## Helper runtime contract

- **Helper-enabled profiles** (`package-manager`/`ephemeral-npx`/
  vendored-node: see `docs/idd-helper-scripts.md`): run the commands
  below. If a required helper is missing, fails, or disagrees with
  live state → **hold and stop** (do not claim). Do not invent a
  silent prose takeover path.
- **`instructions-only`**: use the written S1–S5 steps without helpers,
  still with a server-anchored `now` for the quiet window.

## Helper-first commands (helper-enabled profiles)

```sh
# Confirm non-owned claim
node scripts/resume-claim-routing.mjs --issue <N>  # vendored-node only
# package-manager / ephemeral-npx: use the profile-selected equivalent.

# Server-anchored now (required for quiet window)
SERVER_NOW=$(gh api repos/<owner>/<repo>/issues/<N> --include | node -e '
  const fs = require("node:fs");
  const input = fs.readFileSync(0, "utf8");
  const dateLine = input.split(/\r?\n/).find((line) => /^date:/i.test(line));
  if (!dateLine) process.exit(1);
  process.stdout.write(dateLine.replace(/^date:\s*/i, "").trim());
')
NOW=$(node -e "console.log(new Date(process.argv[1]).toISOString().replace(/\.\d{3}Z$/, 'Z'))" "$SERVER_NOW")

# Quiet-window evidence (always pass --now). Requires --pr; skip if none.
# source repo / vendored-node:
node scripts/stalled-session-quiet-check.mjs \
  --pr <pr-number> \
  --now "$NOW" \
  --claim-created-at <latest-valid-claimed-by-created_at>
# package-manager / ephemeral-npx: use the profile-selected
# idd-stalled-session-quiet-check command with the same arguments.
```

The Node parser selects the first `Date:` response header without relying
on GNU/BSD-specific shell utilities. In PowerShell, use the same parser
with the equivalent pipeline below, then pass the resulting `$now` value
to `--now`:

```powershell
$serverNow = gh api repos/<owner>/<repo>/issues/<N> --include | Out-String | node -e "const fs = require('node:fs'); const input = fs.readFileSync(0, 'utf8'); const dateLine = input.split(/\r?\n/).find((line) => /^date:/i.test(line)); if (!dateLine) process.exit(1); process.stdout.write(dateLine.replace(/^date:\s*/i, '').trim());"
$now = node -e "console.log(new Date(process.argv[1]).toISOString().replace(/\.\d{3}Z$/, 'Z'))" "$serverNow"
```

For `package-manager` and `ephemeral-npx`, resolve both commands from
the profile wiring in `docs/idd-helper-scripts.md`. For
`instructions-only`, skip the helpers and use the written S1-S5 rules
below; when no PR exists, never invent a helper `--pr` argument.

No PR: do not invent `--pr`. Skip the helper (not a helper
failure). Decide S2 from the written bullets using the claim
`branch:` remote tip SHA and update time (no remote branch: treat
absence as no movement only if also absent at S2); S4 step 5 re-reads that tip
and repeats the written S2 checks against a fresh `NOW`; hold
on movement or incomplete evidence.

Never use the local wall clock as `now`. Re-derive a **fresh** `NOW`
before S4; do not reuse the S2 value.

## S1 — Is this a stall case?

| Condition                                                                                  | Action                                    |
| ------------------------------------------------------------------------------------------ | ----------------------------------------- |
| No active claim, or active claim is this session's `{claim-id}`                            | Return to resume lite                     |
| Valid forced-handoff matches the active claim or an inheritable released branch / PR state | Return to resume lite forced-handoff path |
| Active claim is another `{claim-id}`                                                       | Continue to S2                            |

## S2 — Quiet window (30 min, evidence only)

Require **no** external progress in the last 30 minutes:

- no trusted heartbeat on the active claim;
- no PR head or remote branch tip movement;
- no CI `queued` / `in_progress`;
- no new review/comment/CI completion activity.

For a PR-backed check, branch-tip movement must be derived from a
GitHub-server PR timeline or ref-update event (`committed`,
`head_ref_force_pushed`, `synchronize`, or an equivalent server-side head
snapshot). Never use a commit object's author/committer date as movement
evidence. Missing, partial, or ambiguous ref-update evidence is a hold.

Do not enable a helper profile until its pinned producer and schema report
the evidence source, current PR head SHA binding, and completeness flag. A
helper that reports only a commit author/committer date is non-conforming;
keep the repository on `instructions-only` until that producer is updated.

Helper fields: `quiet_window_met`, `quiet_window_ms`, `window_start`, `now`,
`latest_activity`, `latest_activity_type`, `reason`, and `evidence`
(`activity_count_in_window`, `blocking_activities`,
`has_heartbeat_in_window`, `has_ci_running`,
`has_branch_tip_movement`, `branch_tip_evidence_source`,
`branch_tip_evidence_head_sha`, `branch_tip_evidence_complete`).

Before accepting any helper result, perform the cross-field checks that
JSON Schema cannot express: `policy.quiet_window_ms` must equal the
top-level `quiet_window_ms`, and `window_start` must equal
`now - quiet_window_ms` after parsing all three timestamps as UTC. A
mismatch, a non-integral duration, or a timestamp arithmetic failure is
contradictory evidence and routes to **Hold and stop**. This prevents a
helper from evaluating a shorter duplicated window while reporting the
configured policy duration.

Before accepting `quiet_window_met: true`, validate the complete evidence
tuple against the schema and the live PR: `branch_tip_evidence_complete`
must be `true`, the source must be `pr-timeline`, `ref-update`, or
`head-snapshot`, and `branch_tip_evidence_head_sha` must equal the current
PR head SHA. A missing, `none`, null, or mismatched value is a hold even
when the helper reports a quiet window.

| Result                                                         | Action                                                 |
| -------------------------------------------------------------- | ------------------------------------------------------ |
| `quiet_window_met` false, or incomplete/contradictory evidence | **Hold and stop** — no claim, push, or review mutation |
| `quiet_window_met` true                                        | Continue to S3                                         |

Quiet window alone never authorizes takeover.

## S3 — Stale threshold (ownership gate)

Takeover only if latest valid trusted `claimed-by` `created_at` is
**≥ 24 h** ago (`claim-stale-age`).

| Claim age | Action            |
| --------- | ----------------- |
| < 24 h    | **Hold and stop** |
| ≥ 24 h    | Continue to S4    |

`heartbeatOverdue` is **diagnostic only**. It does not shorten the 24 h
gate.

## S4 — Race-safe recheck (immediately before write)

1. Run `idd-claim-lite.instructions.md` pre-checks (d)/(e); either
   failing → STOP.
2. For helper-enabled profiles, re-run the profile-selected
   `resume-claim-routing` command (the vendored form is
   `node scripts/resume-claim-routing.mjs --issue <N>`). For
   `instructions-only`, re-parse the live active claim with the written
   trusted-marker rules in `idd-claim-lite.instructions.md`; do not invoke
   a helper that the repository has not installed.
3. Active claim still the same non-owned `{claim-id}`.
4. Still stale (≥ 24 h) now.
5. Fresh server `NOW` plus a freshly re-read latest valid trusted
   `claimed-by` `created_at`; for helper-enabled profiles re-run the
   quiet-check with both `--now "$NOW"` and that `--claim-created-at`.
   For `instructions-only`, repeat the written S2 checks (no helper). If
   new activity, STOP and restart from resume discovery.
6. Issue still open; PR not merged.
7. Plan A5 takeover with settle delay (`claim.verifySettleDelay`, default
   `PT5S`) and same-second claim-id tie-break.

Any failure → STOP and restart. Do not post takeover on stale evidence.

## S5 — Takeover

1. Post claim (fresh `{claim-id}`, `supersedes: <prior-claim-id>`) via
   `post-idd-marker --type claim ... --apply`, then an
   activation-nonce (`idd-claim-lite.instructions.md` step 5).
2. Wait settle delay; re-parse; confirm claim and nonce winner are
   yours.
3. Lost → STOP. Verified → record nonce; return to
   `idd-resume-lite.instructions.md` Step 1, Step 2/3.

## Hold behavior

On S2/S3 hold, missing helper, unanchored timestamps, or ambiguous
claim/forced-handoff: session log only (no issue/PR comment). Never
invent forced-handoff consent.
