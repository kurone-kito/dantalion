# Guidelines for AI Agents

This project is **dantalion** — a TypeScript monorepo that computes
personality details from a birthday using the _Four Pillars of
Destiny_ (Ba-Zi) method. It hosts three published npm packages
(`@kurone-kito/dantalion-core`, `@kurone-kito/dantalion-i18n`,
`@kurone-kito/dantalion-cli`) and is currently being lifted to
`v1.0.0` on a modernized pnpm / Biome / Vitest / TypeScript 6 stack.

This file gives Claude Code the minimum project rules immediately.
The canonical full guide lives in
[`.github/copilot-instructions.md`](.github/copilot-instructions.md).

## Setup commands

- Install dependencies: `corepack enable && pnpm install`
- Build all packages: `pnpm run build`
- Lint: `pnpm run lint`
- Lint and auto-fix: `pnpm run lint:fix`
- Test: `pnpm run test`
- Clean: `pnpm run clean`

> **Bootstrap caveat**: until issue #84 (pnpm-workspace-template
> import) merges, the commands above are not yet available — the
> repository still runs on Lerna + npm + Jest. Agents working on
> pre-#84 issues should follow that issue's specific commands and
> note the bootstrap state in the PR description.

## Immediate rules

- Match the conversational language to the user's language.
- Write comments and documentation in English unless there is a
  clear project-specific reason otherwise.
- **Always** run `pnpm run lint:fix` after any change, no matter
  how small. Then verify with `pnpm run lint` before committing.
- If uncertainty, hidden risk, or missing context blocks a safe
  change, stop and ask a concise question before proceeding.
- Keep changes small and reviewable. If you create commits, follow
  the project's Conventional Commits rules and keep each commit
  atomic.
- Do not modify community documents (`CODE_OF_CONDUCT*`,
  `CONTRIBUTING*`) without explicit approval.

## Boundaries

- **Always do**: run `lint:fix`, follow Conventional Commits, use
  LF line endings, keep commits atomic, write docs in English
- **Ask first**: adding/removing dependencies, changing
  architecture, modifying CI workflows, altering
  `@kurone-kito/*-config` packages
- **Never do**: commit secrets or credentials, modify community
  documents without approval, disable linter rules without
  justification, skip review of AI-generated code

## Project standards

- **Indentation**: 2 spaces
- **Line endings**: LF only
- **Trailing whitespace**: trimmed except in Markdown
- **Final newline**: always present
- **File naming**: lowercase with hyphens unless a platform
  convention requires otherwise

## Packages

This monorepo contains three published packages plus the workspace
root. After the modernization roadmap (#98) completes, the layout
will be:

| Path                       | Package name                         | Description                                              |
| -------------------------- | ------------------------------------ | -------------------------------------------------------- |
| `/`                        | `@kurone-kito/dantalion`             | Workspace root — orchestration, linting, release tagging |
| `/packages/dantalion-core` | `@kurone-kito/dantalion-core`        | Pure calculation library; no runtime dependencies         |
| `/packages/dantalion-i18n` | `@kurone-kito/dantalion-i18n`        | Localized Markdown rendering on top of core (`en`, `ja`) |
| `/packages/dantalion-cli`  | `@kurone-kito/dantalion-cli`         | Terminal frontend; `bin: dantalion`                       |

Use workspace-scoped commands when targeting a specific package:
`pnpm -F '<package-name>' run <script>`.

### Cross-package dependencies

- `dantalion-core` has zero workspace dependencies and is the
  foundation of every other package.
- `dantalion-i18n` consumes `dantalion-core` via `workspace:^`.
- `dantalion-cli` consumes both `dantalion-core` and
  `dantalion-i18n` via `workspace:^`.

Per-package modernization in Phase 2 of the roadmap therefore runs
strictly `core → i18n → cli` (issues #87 → #88 → #89).

The web playground (`packages/dantalion-web-playground/` in pre-v1
history) has been split out to
[`kurone-kito/dantalion-web-demo`](https://github.com/kurone-kito/dantalion-web-demo)
and is no longer part of this repository.

## Commit rules

This project follows
[Conventional Commits](https://www.conventionalcommits.org/).
A `.gitmessage` template is available at the repository root.
Write user-facing, lowercase subjects under 72 characters, and
split unrelated changes into separate atomic commits.

## IDD (Issue-Driven Development) workflow

This repository runs an **Issue-Driven Development** loop imported
from [`kurone-kito/idd-skill`](https://github.com/kurone-kito/idd-skill).
The phase rules live under `.github/instructions/idd-*.instructions.md`
and the machine-readable policy in `.github/idd/config.json`.

To start an IDD-driven session, say:

> Start the IDD workflow in this repository.

The marker prefix is `dantalion` and the merge policy is
`fully_autonomous_merge`. See
[`docs/idd-workflow.md`](docs/idd-workflow.md) for the entry path
and phase routing, or
[`.github/instructions/idd-overview.instructions.md`](.github/instructions/idd-overview.instructions.md)
for shared definitions loaded at the start of every IDD session.

For decomposing a large request into IDD-ready issues, invoke the
issue-authoring skill at `.claude/skills/issue-authoring/SKILL.md`.

## Canonical reference

The full project guidance lives in
[`.github/copilot-instructions.md`](.github/copilot-instructions.md).
When that file uses Copilot-specific workflow names, apply the
intent in Claude Code using its own interaction model rather than
following the product terms literally.
