# IDD Review Policy Profile Artifacts

These files describe optional non-default PR review policies for
dantalion. The active repository choice is `copilot-advisory`; the
artifacts are reference patches and are not active merely because they
exist.

| Profile | Use when | Artifact |
| --- | --- | --- |
| `human-required` | A maintainer or CODEOWNER must approve every PR | [human-required](human-required/README.md) |
| `no-advisory` | IDD should not request or wait for an advisory bot | [no-advisory](no-advisory/README.md) |
| `external-bot` | A named non-Copilot bot supplies a current-head signal | [external-bot](external-bot/README.md) |

Select exactly one non-default profile, update its complete phase-file
surface in one reviewed change, and record the verification evidence.
Do not combine profiles or infer activation from an issue comment.
