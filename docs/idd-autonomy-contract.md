# IDD Autonomy Contract

This page classifies the externally visible mutations used by the
dantalion IDD loop. It is derived from the phase instructions and adds
no authority of its own. A mutation not listed here is treated as
irreversible until the owning instruction classifies it.

| Mutation | Classification | Required gate or recovery |
| --- | --- | --- |
| A4.5 suitability diagnostic comment | Reversible | Ordinary issue-comment history; no state is changed |
| Fresh issue claim or heartbeat | Reversible | Verified claim state; release with matching `unclaimed-by` when aborting |
| Stale-claim takeover | Reversible | Prior trusted claim is at least 24 hours stale and `supersedes` matches |
| Branch and sibling worktree creation | Reversible | Remove the exact worktree and delete the unmerged local branch |
| Commit and feature-branch push | Reversible | Revert or amend before publication rules permit; post-publication fixes go through review |
| Pull-request creation or update | Reversible | Claim revalidation, reviewable history, and PR cleanup rules |
| Review disposition or thread resolution | Reversible | E-phase snapshot/triage rules and the configured thread policy |
| Claim release | Reversible | Matching agent ID and claim ID; a later session may claim fresh |
| Roadmap close | Irreversible in the loop | A1.5 completion audit proves all descendants and success criteria complete |
| Ruleset or branch-protection change | Human-only | Maintainer policy task; never inferred from an issue body |
| Pull-request merge | Irreversible in the loop | F1/F2 freshness, CI, review, advisory, required-review, and claim gates |
| Comment minimization | Irreversible in practice | F4 cleanup contract; no normal IDD path restores minimized comments |

The repository's issue-authoring `status:authoring` hold is a separate
control boundary. Publication, hold release, and execution claim are not
the same approval. Human-only issues retain their blocker labels.
