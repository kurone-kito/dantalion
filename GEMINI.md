# Guidelines for AI Agents

This project is **dantalion** — a TypeScript monorepo that computes
personality details from a birthday using the _Four Pillars of
Destiny_ (Ba-Zi) method. It hosts three published npm packages
(`@kurone-kito/dantalion-core`, `@kurone-kito/dantalion-i18n`,
`@kurone-kito/dantalion-cli`) and is being lifted to `v1.0.0` on a
modernized pnpm / Biome / Vitest / TypeScript 6 stack.

This file gives Gemini CLI the minimum project rules immediately.
The canonical full guide lives in
[`.github/copilot-instructions.md`](.github/copilot-instructions.md).

## Setup commands

- Install dependencies: `corepack enable && pnpm install`
- Build all packages: `pnpm run build`
- Lint: `pnpm run lint`
- Lint and auto-fix: `pnpm run lint:fix`
- Test: `pnpm run test`
- Clean: `pnpm run clean`

> **Bootstrap caveat**: until issue #84 merges, the commands above
> are not yet available. Pre-#84 issues should follow their own
> command sets.

## Immediate rules

- Match the conversational language to the user's language.
- Write comments and documentation in English unless there is a
  clear project-specific reason otherwise.
- **Always** run `pnpm run lint:fix` after any change. Then verify
  with `pnpm run lint` before committing.
- If uncertainty, hidden risk, or missing context blocks a safe
  change, stop and ask a concise question before proceeding.
- Keep changes small and reviewable. Follow Conventional Commits
  and keep each commit atomic.
- Do not modify community documents (`CODE_OF_CONDUCT*`,
  `CONTRIBUTING*`) without explicit approval.

## Packages

| Path                       | Package name                         | Description                                              |
| -------------------------- | ------------------------------------ | -------------------------------------------------------- |
| `/`                        | `@kurone-kito/dantalion`             | Workspace root — orchestration, linting, release tagging |
| `/packages/dantalion-core` | `@kurone-kito/dantalion-core`        | Pure calculation library; no runtime dependencies         |
| `/packages/dantalion-i18n` | `@kurone-kito/dantalion-i18n`        | Localized Markdown rendering on top of core              |
| `/packages/dantalion-cli`  | `@kurone-kito/dantalion-cli`         | Terminal frontend; `bin: dantalion`                       |

Cross-package dependency direction: `core ← i18n ← cli`.
The former web playground has been split out to
[`kurone-kito/dantalion-web-demo`](https://github.com/kurone-kito/dantalion-web-demo)
and is published live at <https://kurone-kito.github.io/dantalion/>.

## IDD workflow

This repository runs Issue-Driven Development from
[`kurone-kito/idd-skill`](https://github.com/kurone-kito/idd-skill).
The phase rules live under `.github/instructions/idd-*.instructions.md`
and the policy in `.github/idd/config.json` (marker prefix:
`dantalion`, merge policy: `fully_autonomous_merge`).

To start an IDD-driven session, say:

> Start the IDD workflow in this repository.

See [`docs/idd-workflow.md`](docs/idd-workflow.md) for the entry
path and phase routing.

## Canonical reference

The full project guidance lives in
[`.github/copilot-instructions.md`](.github/copilot-instructions.md).
Apply the intent in Gemini CLI using its own interaction model
rather than following Copilot-specific product terms literally.
