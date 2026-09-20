# Onboarding Reference — Optional Host Setup

Host setup is optional and must remain separate from the core document
import. This page records safe follow-up choices for dantalion; it does
not authorize changing CI, hooks, or repository settings in a docs-only
issue.

## Worktree guard

The worktree guard protects the checked-out branch from accidental edits
outside the claimed sibling worktree. If enabled, integrate it with the
existing Husky flow and verify that it is inert in detached CI checkouts.
The implementation and doctor gate belong to #179, not this document
change.

## IDD doctor gate

The doctor is an optional health check for configuration, placeholder,
marker, and required-check drift. The package-manager helper direction
selected by the hearing must be installed and pinned before a generated
`idd:doctor` command is documented as runnable. Until #177 lands, use
the written instruction checks and ordinary dantalion lint commands.

## Advisory convergence workflow

Hosting `idd-advisory-convergence` is an optional CI change tracked by
issue #180. Registering it as a required Ruleset check is a separate
maintainer-only operation tracked by #181. Documentation must not imply
that a workflow file or a Ruleset was installed merely because the
policy records Copilot advisory review.

## Least privilege

Do not grant repository administration, secrets, publishing credentials,
or broad bypass permissions for host setup. See
[Permissions](../permissions.md) before any operator-authorized change.
