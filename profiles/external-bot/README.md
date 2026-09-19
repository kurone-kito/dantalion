# External-Bot Review Policy Artifact

Use this artifact only after a maintainer has recorded the external bot's
actor, request mechanism, current-head coverage signal, completion or
skipped state, timeout, and unavailable-state recovery policy. Set
`reviewPolicy` to `external-bot` and update the phase files together;
this document alone does not activate the profile.

## Patch surface

- `.github/instructions/idd-advisory-wait.instructions.md`
- `.github/instructions/idd-review-fix.instructions.md`
- `.github/instructions/idd-pre-merge.instructions.md`
- `.github/instructions/idd-merge.instructions.md`
- `.github/instructions/idd-review-snapshot.instructions.md`
- `.github/instructions/idd-review-triage.instructions.md`
- `docs/idd-review-policy-profiles.md`

The bot remains advisory unless the repository explicitly records a
blocking policy. Stale, missing, pending, or unreadable current-head
evidence must hold the merge path rather than being treated as success.
