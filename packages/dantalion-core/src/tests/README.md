# Test fixtures and reference data

This directory holds the data files used by the dantalion-core test
suite. There are two distinct kinds of test data here, and the
distinction matters when you are interpreting test failures or
considering changes to the underlying algorithm.

## Files

### `personality.json` (regression baseline)

A pre-computed snapshot of `getPersonality(date)` output for every
calendar date from `1873-02-01` to `2050-12-31` (around 64,617
entries). It is consumed by `../index.spec.ts` and asserts strict
equality against the current code output for every entry.

**Provenance.** Committed on 2020-03-15 by @kurone-kito as
`source.json` in commit `18f3b61` (`test: added the master data for
integration testing`) and later renamed to `personality.json`. The
generation procedure used at the time has not been recovered. The
present test suite uses the file as a regression baseline — it
verifies that subsequent refactors do **not** change the output for
any date in the supported range — but it does **not** independently
prove that the original output was correct.

**Limitations.** Because the fixture was almost certainly generated
by running the same code under test, an algorithmic bug that was
present from the start would also be present in the fixture and
therefore invisible to this test. The independent reference spec
below exists to break that self-referential loop.

**Maintenance.** Do not regenerate this file casually. If a future
PR knowingly changes the documented algorithm output for any date,
the fixture must be regenerated, the PR description must call out
the behavioral change, and the regeneration procedure (commit, tool,
verification steps) should be documented in this README at the same
time.

### `details.json` (regression baseline)

A pre-computed snapshot of `getDetail(genius)` output for the
12 Genius IDs. Driven by the same integration spec as
`personality.json` and shares the same provenance caveat. It does
not depend on date input, so its surface area is smaller and the
regression risk is correspondingly low.

### `reference.spec.ts` (independent oracle)

A second, much smaller spec that asserts `getPersonality(date).inner`
against an externally documented (date → 60甲子 number → animal →
Genius ID) chain. The animal-name layer and the 60甲子 day-cycle layer
both come from sources outside this repository, so a passing test
proves that dantalion produces results consistent with the published
Bazi day-stem-branch sequence and the published 動物占い® 60-character
table — not just consistent with its own past output.

See the file header in `reference.spec.ts` for the source citations
and the full table of entries.

## When to add new test fixture data

- For new functionality with deterministic output: prefer a small,
  hand-curated example set inside the new spec file. Avoid extending
  `personality.json` unless the change is structural and intentional.
- For an independent verification of an existing claim: extend
  `reference.spec.ts` with new entries, each citing its external
  source in a comment.

## When the fixtures and the reference disagree

If `personality.json` says one thing and `reference.spec.ts` says
another for the same date, treat the **reference** as more
trustworthy — the fixture may have inherited a long-standing bug.
File a separate issue documenting the divergence before changing
either side, so the discussion is searchable for future maintainers.
