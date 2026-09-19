# IDD Discover Roadmap Markers

Two hidden HTML comment markers are used in the discover phase:

- Roadmap identity (dantalion-roadmap-id): in the roadmap issue body;
  A3 uses it for blocked-by lookups. A1 finds the roadmap by its label or
  umbrella structure, not this marker.
- Sequential dependency (dantalion-blocked-by): in an issue body — this
  issue cannot start until the roadmap with the matching roadmap-id is
  closed.

Do not use dantalion-blocked-by to group sub-tasks under an active roadmap —
those belong in the roadmap's task list as - [ ] #NNN entries. blocked-by is
only for a separate, prior roadmap that must close first; see the A3
diagnostic in idd-design-rationale.md for the deadlock this prevents.

## Scope invariant

Do not widen issue-selection scope beyond the A2 query allowlist (A0-T,
A0-O, A1, A1.5, A3, A4.5) or a same-run operator opt-in per A3 step 5.
An explicit target authorizes only that issue, except when A0-T step 2
classifies it as a roadmap node; then selection is scoped to that
roadmap's descendants only, never an unrelated orphan issue.
