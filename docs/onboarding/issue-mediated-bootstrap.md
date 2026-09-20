# Onboarding Reference — Issue-Mediated Bootstrap

Dantalion uses the issue-mediated bootstrap choice recorded in
[`project-tuning.md`](project-tuning.md). Import work is planned and
reviewed through GitHub rather than being treated as an unreviewed direct
copy into `main`.

## Pinned process reference

The process source is the upstream `idd-skill` tree at
`5c2704a1b50901f29d87865002047b1eb491865e`. Any remote fetch of the
portable template must use that SHA in both the document URL and the
Contents API `ref` parameter. A URL ending in `/main/` is not acceptable
for an in-flight import.

The v0.12.0 release baseline is retained for comparison at
`11105d705820e50be0a14fcc174587abbaf62b30`. The current plan imports
named documentation gaps and preserves dantalion's local policy instead
of overwriting the repository with an upstream workshop example.

## Bootstrap sequence

1. Run the read-only hearing and record repository, marker, actor,
   command, merge, review, thread, credential, helper, and bootstrap
   decisions.
2. Compare the pinned source manifest with the current tree and list
   additions, removals, renames, and intentional local divergences.
3. Draft the roadmap and child issues under the `status:authoring` hold.
   A publication approval and later hold release are separate from IDD
   execution.
4. Import the approved named gaps on a branch, validate them, and open a
   PR. Do not edit community documents without explicit approval.
5. After merge, run the verification sweep and only then start normal
   Discover/Claim/Work execution on released child issues.

## Self-contained issue requirements

The bootstrap issue must carry the exact source SHA, resolved local
values, selected policy, command rows, dependency graph, acceptance
criteria, and a note describing the files intentionally left to later
child issues. Do not rely on a floating upstream link or on an agent's
private session context to fill these values later.
