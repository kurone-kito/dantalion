# IDD Design Rationale

This page records the small set of design choices that matter when
operating dantalion's imported IDD surface. It is explanatory only; the
instruction files remain the runtime contract.

## Why claims are per issue

GitHub issues are the shared coordination surface available to every
session. A claim names one issue, one branch, and one opaque claim ID.
The claim is re-read before comments, pushes, review actions, and merge,
so a stale session cannot continue merely because it remembers an old
agent name.

## Why discovery is roadmap-first

The roadmap task list is the bounded work graph for this repository. It
prevents a broad repository search from turning unrelated maintenance
into an implicit user request. Child claims remain independent, allowing
parallel sessions to work on different issues while still respecting
explicit dependencies and human blockers.

## Why issue-mediated bootstrap is explicit

Importing the workflow changes the repository's future authority model.
Dantalion records that choice as a reviewed issue plan, then keeps the
source revision and local substitutions visible in onboarding docs. A
later upstream advance must not silently alter an in-flight import.

## Why helper support is staged

The repository already has a pnpm lockfile and package scripts, so the
hearing selected the `package-manager` helper direction. The current
tree remains `instructions-only` until the helper-runtime child installs
and verifies the exact dependency. This avoids documentation claiming a
runtime that the machine-readable config does not yet provide.

## Why merge remains separately gated

`fully_autonomous_merge` records permission to complete F3 after all
checks; it does not waive CI, review currency, unresolved threads,
branch freshness, CODEOWNER rules, or claim ownership. A merge-capable
credential is still subject to the narrow permissions and threat model
in [Permissions](permissions.md).
