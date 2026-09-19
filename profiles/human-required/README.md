# Human-Required Review Policy Artifact

Use this artifact only when a maintainer, CODEOWNER, or required reviewer
is the authoritative PR gate. Set `reviewPolicy` to `human-required` in
`.github/idd/config.json` and update the phase files together; this
document alone does not activate the profile.

## Patch surface

- `.github/instructions/idd-review-fix.instructions.md`
- `.github/instructions/idd-advisory-wait.instructions.md`
- `.github/instructions/idd-pre-merge.instructions.md`
- `.github/instructions/idd-merge.instructions.md`
- `.github/instructions/idd-review-snapshot.instructions.md`
- `.github/instructions/idd-review-triage.instructions.md`
- `docs/idd-review-policy-profiles.md`
- the repository's CODEOWNERS/branch-protection policy

Remove Copilot-specific wait behavior, retain CI/claim/freshness/thread
gates, and record the eligible reviewer source and verification PR.
Do not register advisory convergence as required unless the human-only
policy explicitly wants that extra check.
