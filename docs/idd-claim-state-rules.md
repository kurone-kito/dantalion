# IDD Claim State Rules

This reference is part of the A5 claim protocol. Read it together with
the canonical claim instruction when claim ownership or legacy-format
migration affects routing.

## Same-agent live-claim branch correction

Same-agent restarts never silently inherit or supersede an active
non-stale claim: if the current session already recorded and verified
the active claim-id, continue with that same token and use heartbeats —
do not post a fresh takeover claim. If the session cannot prove ownership,
the active claim is treated as owned by another live session until
released or stale, even when agent-id matches.

Exception: a worker that received the pair through documented orchestrator
delegation is treated as having proven ownership through the orchestrator's
own recorded verification. Self-signed forced-handoff markers from the
same identity never transfer ownership: rule 7 rejects them unless the
author is an authorized maintainer. After a successor posts a fresh claim,
later heartbeats from the displaced old claim-id are ignored as stale —
they do not reclaim ownership or refresh the stale clock.

## Legacy claim migration

Older issues may still contain the legacy claim format:

```text
<!-- claimed-by: agent-id ISO8601-timestamp branch: branch-name -->
```

and the matching legacy release format:

```text
<!-- unclaimed-by: agent-id ISO8601-timestamp -->
```

Treat trusted legacy comments as migration-only inputs:

- If an issue has no trusted new-format claimed-by comments yet, first
  check whether the latest trusted legacy claimed-by comment is followed
  by a later trusted legacy unclaimed-by comment from the same agent. If
  so, treat the issue as unclaimed; skip directly to posting a fresh
  new-format claim with supersedes: none.
- Otherwise, compare the latest trusted legacy claimed-by comment's
  GitHub created_at against the claim-stale-age threshold (distributed
  default: 24 h): younger means claimed by another live session, even
  when agent-id matches; apply the already-claimed routing above. Older
  means stale; proceed and replace it with a new-format claim. A matching
  legacy agent ID is not enough to prove same live-session ownership.
- Then immediately post a new-format claimed-by comment with a fresh
  claim-id and visible note before any further side effects, using
  supersedes: none for that one-time migration claim (the legacy format
  has no claim-id to reference).
- After a new-format claim exists, ignore all legacy claim and unclaim
  comments for active-claim parsing and revalidation.
