# IDD Concept Ownership

This page prevents documentation drift by naming the authoritative owner
for each IDD concept in the dantalion checkout. If two pages disagree,
the phase instruction wins and the documentation mismatch should be
corrected in the same issue that found it.

| Concept | Authoritative owner | Consumer references |
| --- | --- | --- |
| Claim grammar, trusted actors, and revalidation | `idd-overview-core.instructions.md` and `idd-claim.instructions.md` | [Concepts](concepts.md), [Permissions](permissions.md) |
| Candidate discovery and roadmap scope | `idd-discover.instructions.md` | [Workflow](idd-workflow.md), [Policy constants](policy-constants.md) |
| Suitability and autopilot floor | `idd-suitability.instructions.md` | [Customization](customization.md), issue footers |
| Worktree, implementation, and self-review | `idd-work.instructions.md` | [Concepts](concepts.md) |
| PR publication and CI | `idd-pr-submit.instructions.md`, `idd-ci.instructions.md` | [Getting started](getting-started.md) |
| Review snapshot, triage, and fixes | `idd-review-*.instructions.md` | [Review profiles](idd-review-policy-profiles.md) |
| Pre-merge and merge gates | `idd-pre-merge.instructions.md`, `idd-merge*.instructions.md` | [Permissions](permissions.md), [Autonomy contract](idd-autonomy-contract.md) |
| Resume and stalled-session recovery | `idd-resume*.instructions.md` | [Resume detail](idd-resume-detail.md) |
| Onboarding decisions and resolved values | `docs/onboarding/*.md` and `.github/idd/config.json` | [Project tuning](onboarding/project-tuning.md) |
| Source distribution and exact import pin | [Project tuning](onboarding/project-tuning.md) | [Getting started](getting-started.md), [Reference](reference.md) |

The machine-readable policy and the project command table must remain
aligned. The helper-runtime child may change the selected runtime, but
it does not transfer ownership of the phase rules to helper output.
