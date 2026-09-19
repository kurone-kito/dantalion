# IDD Advisory-Wait Shell Fallback

This page is the bounded `instructions-only` command reference for the
Copilot advisory wait. The advisory-wait instruction file owns the
decision table and fail-closed rules; this page only supplies read-only
evidence commands and the shape of the marker posts.

## AW1 — current-head Copilot review

```sh
OWNER=$(gh repo view --json owner --jq '.owner.login')
REPO=$(gh repo view --json name --jq '.name')
PR_HEAD_SHA=$(gh pr view {pr-number} --json headRefOid --jq '.headRefOid')
gh api "repos/${OWNER}/${REPO}/pulls/{pr-number}/reviews" --paginate \
  --jq '.[] | select(.user.login == "copilot-pull-request-reviewer" or .user.login == "copilot-pull-request-reviewer[bot]") | {submitted_at,commit_id}'
```

The latest trusted Copilot review must cover `PR_HEAD_SHA`. A missing
review, unreadable commit ID, or pending requested reviewer is not proof
of convergence.

## AW2 — trusted same-head marker

```sh
gh api "repos/${OWNER}/${REPO}/issues/{pr-number}/comments" --paginate \
  | jq -s --arg sha "$PR_HEAD_SHA" '
      add | map(select(.user.login == "kurone-kito" and
        ((.body // "") | test("^advisory-wait: [^ ]+ " + $sha + "(?: |$)"))))
      | min_by(.created_at)'
```

Marker text is not authority by itself. The comment author must be a
trusted actor from the current repository policy and the server timestamp
must be tied to the current PR head.

## AW3 — bounded recovery marker

When the instruction decision table authorizes one recovery attempt, use
the exact current head and claim ID in a JSON POST. Do not re-request an
advisory reviewer merely because a request list is temporarily empty.

```sh
gh api "repos/${OWNER}/${REPO}/issues/{pr-number}/comments" \
  --method POST --input - <<JSON
{"body":"advisory-wait-recovery: {agent-id} ${PR_HEAD_SHA} {ISO8601-recovery-time} claim:{claim-id} attempt:1"}
JSON
```

If the helper or the required GitHub evidence is unavailable, hold the
PR and record the missing evidence. Never turn an unreadable advisory
state into a merge approval.
