# IDD Review Triage Advisory Acknowledgements

An advisory bot's post-disposition courtesy reply can advance a PR's
updatedAt. Review triage must distinguish that acknowledgement from a
new finding so the loop does not reopen indefinitely.

Once every ReviewItems_snapshot item has an Accepted or Rejected
disposition at the current HEAD SHA, a later ack-only comment from a
trusted advisory bot does not reopen the loop — bind the merge to current
HEAD and proceed. An ack-only comment opens no new thread, carries no
CHANGES_REQUESTED, and raises no new finding; anything else re-opens the
loop normally.

When the advisory-bot identity is configured, activity-snapshot and
pre-merge-readiness evidence emits the structural half of this
classification (reviewCurrency.live.ackOnly.items and
reviewCurrency.comparisonReason: ack-only-post-disposition). The agent
still confirms the semantic residual (no new finding), and this never
weakens the disposition-evidence or unreplied-comment backstops.

The same ack can also re-trip the dispositionEvidence backstop on an
already-resolved thread (route: return-to-e1). pre-merge-readiness flags
each such thread ackOnlyPostDisposition: true; when
dispositionEvidence.soleCauseAckOnlyPostDisposition is true (every
blocking item is one such thread), autopilot may deterministically override
return-to-e1 and proceed (see idd-pre-merge.instructions.md F2). Any
non-ack blocking cause keeps it false, so the backstop holds otherwise.
inPlaceEditOnly/soleCauseInPlaceEditOnly, #1313, is a stricter subset —
not an override path of its own.
