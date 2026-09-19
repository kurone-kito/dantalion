# IDD Reference Manual

This directory is the consumer-facing reference for dantalion's imported
Issue-Driven Development surface. The phase instructions under
`.github/instructions/` remain authoritative for execution; these pages
explain how the selected policy fits together.

## Start here

| Need | Read |
| --- | --- |
| Understand the loop | [Core concepts](concepts.md) |
| Start or resume a session | [IDD workflow](idd-workflow.md) |
| Review the import decisions | [Project tuning](onboarding/project-tuning.md) |
| Choose credentials safely | [Permissions and threat model](permissions.md) |
| Resolve a policy question | [Customization](customization.md) |

## Reference map

- [Getting started](getting-started.md) — adoption and first-loop path.
- [Detailed reference](reference.md) — phase and policy navigation.
- [Policy constants](policy-constants.md) — timing and gate defaults.
- [Review policy profiles](idd-review-policy-profiles.md) — Copilot,
  human, no-advisory, and external-bot review shapes.
- [Helper script evaluation](idd-helper-scripts.md) — optional helper
  runtime contract and evidence outputs.
- [Comment minimization](idd-comment-minimization.md) — live digest and
  post-merge cleanup boundaries.
- [Resume detail](idd-resume-detail.md) — worktree and PR recovery routes.
- [Autonomy contract](idd-autonomy-contract.md) — mutation reversibility
  and the gate that authorizes each class of side effect.
- [Concept ownership](idd-concept-ownership.md) — which file owns each
  rule when surfaces overlap.
- [Design rationale](idd-design-rationale.md) — why the loop is shaped
  this way.
- [Advisory-wait shell fallback](idd-advisory-wait-shell-fallback.md) —
  bounded commands for the instructions-only fallback.

## Dantalion import record

The selected upstream source is `kurone-kito/idd-skill` main at
`5c2704a1b50901f29d87865002047b1eb491865e`. The v0.12.0 release baseline
is `11105d705820e50be0a14fcc174587abbaf62b30`. These immutable pins are
the source boundary for the current re-import; a later upstream advance
requires a separately reviewed plan.

The local policy keeps the `dantalion` marker prefix, roadmap-first issue
scope, `fully_autonomous_merge`, Copilot advisory review,
`fast-agent-resolve`, issue-mediated bootstrap, and secure issue-author
approval. The package-manager helper profile is selected for the target
runtime, but its installation remains staged under the helper-runtime
child issue until that issue updates the machine-readable config.

Workshop examples, upstream-owner claims, and community-document edits
are intentionally outside this consumer documentation bundle.
