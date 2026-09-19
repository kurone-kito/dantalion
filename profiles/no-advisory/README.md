# No-Advisory Review Policy Artifact

Use this artifact only when dantalion intentionally relies on CI,
branch protection, and any separately configured human review. Set
`reviewPolicy` to `no-advisory` and update the phase files together;
this document alone does not activate the profile.

## Patch surface

- `.github/instructions/idd-review-fix.instructions.md`
- `.github/instructions/idd-advisory-wait.instructions.md`
- `.github/instructions/idd-pre-merge.instructions.md`
- `.github/instructions/idd-merge.instructions.md`
- `.github/instructions/idd-review-snapshot.instructions.md`
- `.github/instructions/idd-review-triage.instructions.md`
- `docs/idd-advisory-wait-shell-fallback.md`
- `docs/idd-review-policy-profiles.md`

Remove advisory request/wait assumptions without weakening CI,
branch-freshness, claim, or unresolved-conversation gates. Leave the
advisory convergence check unregistered unless explicitly required.
