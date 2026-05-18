# Guidelines for AI Agents

This project is **dantalion** — a TypeScript monorepo that computes
personality details from a birthday using the _Four Pillars of
Destiny_ (Ba-Zi) method. It hosts three published npm packages
(`@kurone-kito/dantalion-core`, `@kurone-kito/dantalion-i18n`,
`@kurone-kito/dantalion-cli`) and is being lifted to `v1.0.0` on a
modernized pnpm / Biome / Vitest / TypeScript 6 stack.

When contributing to this repository using AI agents, adhere to the
following guidelines.

## Tooling priority and compatibility

This repository is intentionally optimized for GitHub Copilot CLI
and VS Code Copilot Chat because they integrate most cleanly with
the GitHub-native IDD workflow.

`AGENTS.md`, `CLAUDE.md`, and `GEMINI.md` exist as lightweight
compatibility entry points for Codex, Claude Code, and Gemini CLI.
Keep this file as the canonical, fully detailed guide.

Per-package conventions live in `.github/instructions/` as scoped
instruction files. These are automatically loaded by VS Code
Copilot when working in the corresponding package directory.

## Conversation

- The conversational language should match the user's language.
- Comments and documentation should be written in English unless
  there is a clear context otherwise.
- **Always** run `pnpm run lint:fix` after making any changes — no
  matter how small (including documentation typo fixes). Then
  verify with `pnpm run lint` before committing.
- If uncertainties, concerns, or other implementation issues arise
  while running autonomously, switch to a planning posture and ask
  the user. Provide one or more recommended response options.

## Boundaries

### Always do

- Run `pnpm run lint:fix` after every change, then verify with
  `pnpm run lint`
- Follow Conventional Commits for all commits
- Use LF line endings, 2-space indentation, and a final newline
- Keep commits atomic — one logical change per commit
- Write comments and documentation in English

### Ask first

- Adding or removing dependencies
- Changing the project architecture or directory structure
- Modifying CI/CD workflows (`.github/workflows/`)
- Altering shared configuration packages (`@kurone-kito/*-config`)
- Making changes that affect all workspace packages

### Never do

- Commit secrets, credentials, API keys, or tokens into source code
- Modify community documents (`CODE_OF_CONDUCT*`, `CONTRIBUTING*`)
  without explicit approval
- Disable or bypass linter rules without justification
- Accept AI-generated code without reviewing it for correctness
  and security
- Introduce breaking changes without a `BREAKING CHANGE` footer

## Bootstrap state

The repository is mid-modernization. Until **issue #84** lands,
the steady-state commands listed below (`pnpm run lint`, `pnpm run
test`, `pnpm run build`) **do not work** — the repository still
runs on Lerna 4 + npm + Jest 27 + ESLint 7 + Node 12.

Pre-#84 issues should follow their own command sets and note the
bootstrap state in the PR description. Required-status-check gating
on `main` (`lint`, `test`, `build`) is **not yet active** — that
ruleset rule lands with issue #82, which itself is blocked by #86
(CI workflow modernization).

## Commit rules

This project follows
[Conventional Commits](https://www.conventionalcommits.org/).
A `.gitmessage` template will live at the repository root once
issue #84 imports it.

### Format

```txt
<type>[optional scope]: <user-facing description>

<body: address purpose, context, and what changed>

[optional footer(s)]
```

### Subject line

- Format: `<type>[optional scope]: <description>`
- Write from the **user's perspective**
- Lowercase, imperative mood (e.g., "add", not "added")
- Under 72 characters
- Do **not** end with a period

### Types

`feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`,
`build`, `perf`

### Scopes

- Optional, in parentheses: `feat(ci):`, `fix(core):`
- Lowercase, short, consistent. Use the directory or component
  name that best describes the area.

### Body

Address the **why → context → what changed** as natural prose.
Wrap body lines at 72 characters. Omit any aspect that cannot be
reliably inferred. Breaking changes always include a body.

### Breaking changes

- Append `!` after the type/scope: `feat!: ...`
- Add a `BREAKING CHANGE:` trailer with migration steps.

### Footers

- `Closes #<issue>` / `Refs #<issue>` — link to issues
- `Co-authored-by: Name <email>` — credit co-authors
- `BREAKING CHANGE: <description>` — detail the breaking change

### Atomic commits

Keep each commit small and focused. One logical change per commit.
If the subject line needs "and", split the commit.

## Branch strategy

All changes reach `main` through pull requests (merge commits
only). Feature branches may rebase onto `main` before the first
push; after publication, sync from `main` with a normal merge.

The `main` ruleset (id `16537258`, name `main`) carries:

- `pull_request` — PRs required
- `deletion` — branch cannot be deleted
- `non_fast_forward` — no force-push that rewrites history
- `copilot_code_review` — Copilot reviews every PR (advisory)
- `required_status_checks` — will be added by issue #82 after #86
  emits the matching workflow job names (`lint`, `test`, `build`)

## Coding Standards

- **Indentation**: 2 spaces (enforced by `.editorconfig`)
- **Line endings**: LF only (enforced by `.editorconfig` and
  `.gitattributes`)
- **Trailing whitespace**: trimmed (except in Markdown)
- **Final newline**: always present
- **File naming**: lowercase with hyphens

## Packages

| Path                       | Package name                         | Description                                              |
| -------------------------- | ------------------------------------ | -------------------------------------------------------- |
| `/`                        | `@kurone-kito/dantalion`             | Workspace root — orchestration, linting, release tagging |
| `/packages/dantalion-core` | `@kurone-kito/dantalion-core`        | Pure calculation library; no runtime dependencies        |
| `/packages/dantalion-i18n` | `@kurone-kito/dantalion-i18n`        | Localized Markdown rendering on top of core              |
| `/packages/dantalion-cli`  | `@kurone-kito/dantalion-cli`         | Terminal frontend; `bin: dantalion`                      |

### Cross-package dependencies

- `dantalion-core` has zero workspace dependencies and is the
  foundation of every other package.
- `dantalion-i18n` consumes `dantalion-core` via `workspace:^`.
- `dantalion-cli` consumes both `dantalion-core` and
  `dantalion-i18n` via `workspace:^`.

Per-package modernization in Phase 2 of the roadmap runs strictly
`core → i18n → cli` (issues #87 → #88 → #89).

### Excluded from this repository

The web playground (`packages/dantalion-web-playground/` in pre-v1
history) has been split out to
[`kurone-kito/dantalion-web-demo`](https://github.com/kurone-kito/dantalion-web-demo)
and is no longer part of this repository. Issues touching the web
demo belong on the new repository.

### Scoped instructions

Per-package conventions are provided in
`.github/instructions/*.instructions.md`. These files are
automatically loaded by VS Code Copilot when working in the
corresponding package directory.

## Development

### Install dependencies

```sh
corepack enable
pnpm install
```

### Build

```sh
pnpm run build

# Watch mode for all packages
pnpm run dev

# Build a specific package
pnpm -F '@kurone-kito/dantalion-core' run build
```

### Lint

```sh
pnpm run lint
pnpm run lint:fix
```

### Test

```sh
pnpm run test        # unit tests via Vitest
pnpm run test:ts     # TypeScript type checking
```

### Clean

```sh
pnpm run clean
```

## IDD (Issue-Driven Development) workflow

This repository runs an Issue-Driven Development loop imported
from [`kurone-kito/idd-skill`](https://github.com/kurone-kito/idd-skill).
The phase rules live under `.github/instructions/idd-*.instructions.md`
and the machine-readable policy in `.github/idd/config.json`.

| Setting                       | Value                                |
| ----------------------------- | ------------------------------------ |
| `markerPrefix`                | `dantalion`                          |
| `mergePolicy`                 | `fully_autonomous_merge`             |
| `reviewPolicy`                | `copilot-advisory`                   |
| `threadResolutionPolicy`      | `fast-agent-resolve`                 |
| `helperRuntime.profile`       | `instructions-only`                  |
| `issueScope`                  | `roadmap`                            |
| `trustedMarkerActors`         | `["kurone-kito"]`                    |

To start an IDD-driven session, say:

> Start the IDD workflow in this repository.

The agent then reads
[`docs/idd-workflow.md`](../docs/idd-workflow.md), discovers a
ready issue under roadmap #98 (the modernization roadmap), claims
it with a `dantalion-claim` marker, implements per the issue's
acceptance criteria, opens a PR, and follows the loop through
merge.

### IDD entry points

| File                                                                              | Purpose                                       |
| --------------------------------------------------------------------------------- | --------------------------------------------- |
| [`docs/idd-workflow.md`](../docs/idd-workflow.md)                                 | Full entry path, file map, phase routing      |
| [`.github/instructions/idd-overview.instructions.md`](instructions/idd-overview.instructions.md) | Shared definitions, claim format, gates       |
| [`.github/idd/config.json`](idd/config.json)                                      | Machine-readable policy                       |
| [`.claude/skills/issue-authoring/SKILL.md`](../.claude/skills/issue-authoring/SKILL.md) | Issue drafting skill for new requests         |

## Security

These rules follow the
[OpenSSF Security-Focused Guide for AI Code Assistant Instructions](https://best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions.html):

- **No secrets in code** — store credentials in environment
  variables or a secrets manager; never hard-code them
- **Treat AI output as untrusted** — review all generated code
  for correctness, security vulnerabilities, and adherence to
  project standards before committing
- **Validate inputs** — ensure all external data is validated and
  sanitized before use
- **Verify dependencies** — confirm that any recommended packages
  are reputable, actively maintained, and free of known
  vulnerabilities
- **Recursive review** — when generating security-sensitive code,
  ask the AI to review its own output and suggest improvements
  before accepting

## Onboarding

This project was bootstrapped from
[`kurone-kito/pnpm-workspace-template`](https://github.com/kurone-kito/pnpm-workspace-template)
during the v1.0.0 modernization. It uses the IDD workflow from
[`kurone-kito/idd-skill`](https://github.com/kurone-kito/idd-skill).

The repository is no longer the base template — onboarding has
been completed. Subsequent customization should follow the IDD
loop (claim → work → PR) rather than the original onboarding
checklist.
