# Onboarding Reference — Dantalion Project Tuning

This page records the resolved values used when the v0.12 IDD surface was
planned for dantalion. It is the local source for substitutions and
sequencing; it contains no author-time placeholders.

## Source and repository

| Decision | Recorded value |
| --- | --- |
| Repository | `kurone-kito/dantalion` |
| Marker prefix | `dantalion` |
| Trusted marker actor | `kurone-kito` |
| Development branch | `main` |
| Upstream source | `kurone-kito/idd-skill` main at `5c2704a1b50901f29d87865002047b1eb491865e` |
| Release baseline | v0.12.0 at `11105d705820e50be0a14fcc174587abbaf62b30` |

The source pin is immutable for this import. A later upstream commit
requires a new issue plan and hearing rather than an in-place retarget.

## Commands and policy

| Decision | Recorded value |
| --- | --- |
| Install | `corepack enable && pnpm install` |
| Fix and validate | `pnpm run lint:fix && pnpm run lint` |
| Pre-push | `pnpm run lint && pnpm run test && pnpm run build` |
| Post-fix | `pnpm run lint && pnpm run test` |
| Issue scope | `roadmap-first` |
| Merge policy | `fully_autonomous_merge` |
| PR review | `copilot-advisory` |
| Thread resolution | `fast-agent-resolve` |
| Bootstrap | issue-mediated |
| Issue-author approval | enabled by default; owners and maintainers may approve |
| Claim timing | 24-hour stale age; 12-hour heartbeat |
| CI reruns | `rerun-once` |

## Runtime and companions

The selected helper direction is `package-manager` because dantalion has
pnpm metadata and a lockfile. The checked-in config is deliberately
staged at `instructions-only` until #177 installs and verifies the exact
helper dependency and updates the lockfile atomically.

The issue-authoring companion is planned for the single
`.agents/skills/issue-authoring/` destination by #176. Do not create a
second runtime mirror. The optional `idd-spec-audit` companion is tracked
separately by #217.

## Boundaries

Community documents, Rulesets administration, advisory workflow hosting,
and maintainer-only credentials remain outside autonomous documentation
work. The `status:blocked-by-human` label is preserved for such issues.
