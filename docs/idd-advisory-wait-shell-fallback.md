---
type: reference
title: IDD — Advisory-Wait Shell Fallback (AW1 / AW2 / AW3-R / AW3-S / AW3-H / F2 detail)
description: Provides the verbatim gh, gh api, jq, and curl commands the advisory-wait and F2 advisory-convergence shell fallbacks use when helper support cannot be trusted.
tags: [advisory-wait, shell-fallback]
---

# IDD — Advisory-Wait Shell Fallback (AW1 / AW2 / AW3-R / AW3-S / AW3-H / F2 detail)

This document contains the verbatim commands used by the shell
fallback for [advisory-wait](../.github/instructions/idd-advisory-wait.instructions.md)
and for F2's **Advisory convergence** bullet in
[pre-merge](../.github/instructions/idd-pre-merge.instructions.md):
`gh`/`gh api`/`jq` for AW1/AW2 evidence collection and the F2
convergence / `dispositionEvidence` assertion, and a mix of
`gh`/`gh api`/`curl`/`node scripts/...` for the AW3-R/AW3-S/AW3-H
marker-posting and cleanup mutations.

These commands only apply when helper-first cannot be trusted — see
the "Fail-closed fallback trigger" section in the instruction file.

**Prerequisites**: standalone `jq` and `base64` binaries on `PATH`.
`gh api --jq` is built into `gh` and needs nothing extra, but the commands
below piping into `jq -r`/`jq -s` need the real binary. Each standalone
shell snippet probes GNU `base64 --decode` and BSD/macOS `base64 -D`, then
reuses the working form; if neither form is available, it stops with a
hold instead of assuming a platform-specific flag.

This consumer keeps the instruction file as the contract (decision rules, ordering,
fail-closed handling, and what each step must produce); this document
is the command reference. If the contract and these commands diverge,
the contract wins and these commands must be updated.

## AW1

```sh
set -eu
set -o pipefail

OWNER=$(gh repo view --json owner --jq '.owner.login')
REPO=$(gh repo view --json name --jq '.name')

if ! REVIEWS_RAW=$(gh api "repos/${OWNER}/${REPO}/pulls/{pr-number}/reviews" --paginate); then
  echo "hold: Copilot review fetch failed; AW1 evidence is unavailable" >&2
  exit 2
fi
if ! LAST_COPILOT_COMMIT=$(printf '%s\n' "${REVIEWS_RAW}" | jq -rs '
  (add // [])
  | map(select(.user.login == "copilot-pull-request-reviewer"
      or .user.login == "copilot-pull-request-reviewer[bot]")
      | {sa: .submitted_at, cid: .commit_id})
  | sort_by(.sa) | last | .cid // ""
'); then
  echo "hold: Copilot review response was not valid JSON" >&2
  exit 2
fi

if ! COPILOT_PENDING=$(gh api "repos/${OWNER}/${REPO}/pulls/{pr-number}/requested_reviewers" \
  --jq '.users | any((.login // "" | ascii_downcase) as $l | $l == "copilot" or $l == "copilot-pull-request-reviewer" or $l == "copilot-pull-request-reviewer[bot]")'); then
  echo "hold: Copilot requested-reviewer fetch failed; AW1 evidence is unavailable" >&2
  exit 2
fi
# Observed once: requested_reviewers can lag a successful re-request
# or empty on submit, so false is not idle proof.
# LAST_COPILOT_COMMIT == PR_HEAD_SHA remains the SATISFIED signal.

if ! TIMELINE_RAW=$(gh api "repos/${OWNER}/${REPO}/issues/{pr-number}/timeline" \
  -H "Accept: application/vnd.github+json" \
  --paginate); then
  echo "hold: PR timeline fetch failed; AW1 evidence is unavailable" >&2
  exit 2
fi
if ! COPILOT_PENDING_COVERS_HEAD=$(printf '%s\n' "${TIMELINE_RAW}" | jq -r -s --arg sha "${PR_HEAD_SHA}" '
        (add // [])
        | to_entries
        | (map(select(.value.event == "committed"
             and ((.value.sha // .value.commit_id // "") == $sha)))
           | last | .key // null) as $head_index
        | (map(select(.value.event == "review_requested"
             and (((.value.requested_reviewer.login // "" | ascii_downcase) as $l
                  | $l == "copilot"
                  or $l == "copilot-pull-request-reviewer"
                  or $l == "copilot-pull-request-reviewer[bot]"))))
           | last | .key // null) as $request_index
        | ($head_index != null and $request_index != null and
           $request_index > $head_index)
      '); then
  echo "hold: PR timeline response was not valid JSON" >&2
  exit 2
fi
```

## AW2

```sh
if ! ADVISORY_COMMENTS_RAW=$(gh api "repos/${OWNER}/${REPO}/issues/{pr-number}/comments" --paginate); then
  echo "hold: advisory comment fetch failed; AW2 evidence is unavailable" >&2
  exit 2
fi
if ! ADVISORY_COMMENTS_JSON=$(printf '%s\n' "${ADVISORY_COMMENTS_RAW}" | jq -s 'add // []'); then
  echo "hold: advisory comment response was not valid JSON" >&2
  exit 2
fi
CURRENT_MARKER_ACTOR=$(gh api user --jq '.login' 2>/dev/null || true)
TRUSTED_MARKER_ACTORS="${IDD_TRUSTED_MARKER_ACTORS:-}"
TRUST_COLLABORATOR_MARKERS="${IDD_TRUST_COLLABORATOR_MARKERS:-}"
TRUSTED_MARKER_LOGIN_JSON=$(
  {
    if [ -n "$CURRENT_MARKER_ACTOR" ]; then
      printf '%s\n' "$CURRENT_MARKER_ACTOR"
    fi
    printf '%s\n' "$TRUSTED_MARKER_ACTORS" | tr ',' '\n'
    if printf '%s\n' "$TRUST_COLLABORATOR_MARKERS" | grep -Eiq '^(1|true|yes)$'; then
      printf '%s\n' "$ADVISORY_COMMENTS_JSON" \
        | jq -r '.[] | select((.body // "") | test("^advisory-wait:|^advisory-wait-recovery:|^<!-- advisory-wait:|^advisory-reroll:")) | .user.login // empty' \
        | sort -fu \
        | while IFS= read -r login; do
          permission=$(
            gh api "repos/${OWNER}/${REPO}/collaborators/${login}/permission" \
              --jq '.permission' 2>/dev/null || true
          )
          case "$permission" in
            admin | maintain | write) printf '%s\n' "$login" ;;
          esac
        done
    fi
  } | jq -R -s 'split("\n") | map(ascii_downcase | select(length > 0)) | unique'
)

EARLIEST_SAME_HEAD_AT=$(
  printf '%s\n' "$ADVISORY_COMMENTS_JSON" \
    | jq -r \
      --arg sha "$PR_HEAD_SHA" \
      --argjson trusted_marker_logins "$TRUSTED_MARKER_LOGIN_JSON" '
        def marker_login: (.user.login // "" | ascii_downcase);
        def trusted_marker_actor:
          marker_login as $login
          | ($login | length > 0)
          and (($trusted_marker_logins | index($login)) != null);
        [.[] | select(
          trusted_marker_actor
          and (
            ((.body // "") | test("^advisory-wait: [^ ]+ " + $sha + "(?: |$)")) or
            ((.body // "") | test("^advisory-wait-recovery: [^ ]+ " + $sha + "(?: |$)")) or
            ((.body // "") | test("^<!-- advisory-wait: [^ ]+ " + $sha + " [^ ]+ -->$"))
          )
        )]
        | min_by(.created_at) | .created_at // ""
      '
)

REQUEST_MARKER_COUNT=$(
  printf '%s\n' "$ADVISORY_COMMENTS_JSON" \
    | jq -r \
      --argjson trusted_marker_logins "$TRUSTED_MARKER_LOGIN_JSON" '
        def marker_login: (.user.login // "" | ascii_downcase);
        def trusted_marker_actor:
          marker_login as $login
          | ($login | length > 0)
          and (($trusted_marker_logins | index($login)) != null);
        [.[] | select(
          trusted_marker_actor
          and ((.body // "") | test("^advisory-wait:|^<!-- advisory-wait:"))
        )]
        | length
      '
)

# #2327: head-scoped, request-only (excludes advisory-wait-recovery:) --
# distinct from EARLIEST_SAME_HEAD_AT above (a recovery-only marker also
# satisfies that) and from REQUEST_MARKER_COUNT above (not head-scoped).
SAME_HEAD_REQUEST_MARKER_PRESENT=$(
  printf '%s\n' "$ADVISORY_COMMENTS_JSON" \
    | jq -r \
      --arg sha "$PR_HEAD_SHA" \
      --argjson trusted_marker_logins "$TRUSTED_MARKER_LOGIN_JSON" '
        def marker_login: (.user.login // "" | ascii_downcase);
        def trusted_marker_actor:
          marker_login as $login
          | ($login | length > 0)
          and (($trusted_marker_logins | index($login)) != null);
        [.[] | select(
          trusted_marker_actor
          and (
            ((.body // "") | test("^advisory-wait: [^ ]+ " + $sha + "(?: |$)")) or
            ((.body // "") | test("^<!-- advisory-wait: [^ ]+ " + $sha + " [^ ]+ -->$"))
          )
        )] | length > 0
      '
)
```

## AW3-R

Post via the profile-selected post-idd-marker command (source repo /
vendored-node: `node scripts/post-idd-marker.mjs`; package-manager /
ephemeral-npx: resolve from `docs/idd-helper-scripts.md`)
`--type advisory-recovery --target pr <pr-number> --agent-id <id>
--head-sha <PR_HEAD_SHA> --timestamp <ISO8601> --apply`, or manually:

```sh
GH_TOKEN="${GH_TOKEN:-$(gh auth token)}"
curl -X POST "https://api.github.com/repos/{owner}/{repo}/issues/{pr-number}/comments" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"body\":\"advisory-wait-recovery: {agent-id} {PR_HEAD_SHA} {ISO8601-recovery-time}\"}"
```

## AW3-S

Only when `staleRequestRecovery` is `"attempt"` (instruction file's
Eligibility check). Steps 2 and 4 (verify removal/HEAD; verify
association) are read-only checks the instruction file specifies
directly — no command block needed here.

```sh
# Step 1 — remove the stale request. PENDING entry only (COPILOT_PENDING
# was "true"). Skip this step entirely for the non-pending entry (#2327 --
# COPILOT_PENDING was already "false", nothing is pending to remove) and
# start at Step 3 instead.
gh pr edit {pr-number} --remove-reviewer "@{primary-advisory-bot}"
# on a GraphQL login-resolution failure:
gh api repos/{owner}/{repo}/pulls/{pr-number}/requested_reviewers \
  -X DELETE -f "reviewers[]={primary-advisory-bot-rest-login}"

# Step 3 — request again (non-pending entry: the first mutating step;
# pending entry: after step 2 verifies the removal)
gh pr edit {pr-number} --add-reviewer "@{primary-advisory-bot}"
# on a GraphQL login-resolution failure:
gh api repos/{owner}/{repo}/pulls/{pr-number}/requested_reviewers \
  -X POST -f "reviewers[]={primary-advisory-bot-rest-login}"

# Step 5 -- post exactly one bound marker, only once step 4 reaches a
# counted disposition: proven re-registration for a pending entry, or
# proven failure-to-register within the same short budget for a
# non-pending entry (#2327 -- see the instruction file's step 4).
# source repo / vendored-node profile:
node scripts/post-idd-marker.mjs --type advisory-recovery --target pr <pr-number> \
  --agent-id <id> --claim-id <id> --head-sha <PR_HEAD_SHA> \
  --attempt <n> --timestamp <ISO8601> --apply
# package-manager / ephemeral-npx profile, resolve the command name from
# docs/idd-helper-scripts.md:
<profile-selected-post-idd-marker-command> --type advisory-recovery \
  --target pr <pr-number> --agent-id <id> --claim-id <id> \
  --head-sha <PR_HEAD_SHA> --attempt <n> --timestamp <ISO8601> --apply
# instructions-only profile, or any profile if the helper is unavailable —
# manually, matching the grammar renderAdvisoryWaitRecoveryMarker emits:
GH_TOKEN="${GH_TOKEN:-$(gh auth token)}"
curl -X POST "https://api.github.com/repos/{owner}/{repo}/issues/{pr-number}/comments" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"body\":\"advisory-wait-recovery: {agent-id} {PR_HEAD_SHA} {ISO8601-recovery-time} claim:{claim-id} attempt:{n}\"}"
```

## AW3-H

`--subject-ids` needs a GraphQL node id, not a REST numeric id —
convert first: `gh api repos/{owner}/{repo}/issues/comments/{comment_id}
-q '.node_id'` (other kinds: pass `--help` to the command below).

```sh
# source repo / vendored-node profile:
node scripts/minimize-superseded-markers.mjs \
  --subject-ids "<id1>,<id2>,..." \
  --classifier OUTDATED \
  --trusted-marker-logins "<trusted-login-1>,<trusted-login-2>" \
  --apply
# package-manager / ephemeral-npx profile, resolve the command name from
# docs/idd-helper-scripts.md:
<profile-selected-minimize-superseded-markers-command> \
  --subject-ids "<id1>,<id2>,..." \
  --classifier OUTDATED \
  --trusted-marker-logins "<trusted-login-1>,<trusted-login-2>" \
  --apply
```

## F2

F2's **Advisory convergence** bullet (see
[pre-merge](../.github/instructions/idd-pre-merge.instructions.md))
has two halves. Helper-first stays first: when a helper runtime
exists, run `advisory-convergence.mjs --assert` (or the
profile-selected command) and read
`pre-merge-readiness` `dispositionEvidence`. Use this section only on
`instructions-only`, or when those helpers are unavailable.

**Convergence assertion — semantics.** `converged` is the three
conjuncts from
[Advisory convergence (F2)](idd-helper-scripts.md#advisory-convergence-f2),
restated verbatim: the latest primary-bot review's `commit_id` equals
the current HEAD **and** that review carries zero actionable items
**and** every current-HEAD primary-bot-authored review thread is
resolved **or** carries a valid disposition marker. Do not add or
relax a conjunct. Treat a missing review, an unreadable
`commit_id`/`HEAD`, or an unreadable item count as not converged.

**`dispositionEvidence` half — semantics.** Derive the same
conclusion F2 names in prose: `route` is `proceed` only when
`blockingCount == 0`, meaning both `missingRegularComments` (any
outstanding non-thread regular PR comment from a non-agent author,
including the PR author, lacking a fresh disposition marker) and
`missingThreads` are empty. A thread with no external feedback is
ignored; a resolved thread is cleared; an unresolved human-authored
thread with a later unmarked human reply is presence-only; and an
unresolved Copilot/configured-advisory-bot thread still needs a fresh
IDD disposition. A missing or malformed result is unmet. The ack-only
override stays in the instruction file; do not re-derive it here.

```sh
OWNER=$(gh repo view --json owner --jq '.owner.login')
REPO=$(gh repo view --json name --jq '.name')
PR_HEAD_SHA=$(gh pr view {pr-number} --json headRefOid --jq '.headRefOid')
PR_METADATA=$(gh api "repos/${OWNER}/${REPO}/pulls/{pr-number}")
PR_AUTHOR_LOGIN=$(printf '%s' "${PR_METADATA}" | jq -er '.user.login')
PR_BASE_SHA=$(printf '%s' "${PR_METADATA}" | jq -er '.base.sha')
BASE_CONFIG_CONTENT=$(gh api \
  "repos/${OWNER}/${REPO}/contents/.github/idd/config.json?ref=${PR_BASE_SHA}" \
  --jq '.content // empty' | tr -d '\n')
if [ -z "${BASE_CONFIG_CONTENT}" ]; then
  echo "hold: trusted base ref did not provide .github/idd/config.json" >&2
  exit 2
fi
BASE64_DECODE_ARGS="--decode"
if ! printf '' | base64 "${BASE64_DECODE_ARGS}" >/dev/null 2>&1; then
  BASE64_DECODE_ARGS="-D"
  if ! printf '' | base64 "${BASE64_DECODE_ARGS}" >/dev/null 2>&1; then
    echo "hold: base64 decoder does not support GNU --decode or BSD -D" >&2
    exit 2
  fi
fi
ADVISORY_BOT_LOGINS_JSON=$(printf '%s' "${BASE_CONFIG_CONTENT}" | base64 "${BASE64_DECODE_ARGS}" | jq -c \
  '((.advisoryBotLogins // []) + [(.advisoryWait.secondaryBotLogin // "")])
   | map(select(type == "string" and length > 0) | ascii_downcase) | unique')

# Latest primary-bot review (same login set as AW1).
if ! REVIEWS_RAW=$(gh api "repos/${OWNER}/${REPO}/pulls/{pr-number}/reviews" --paginate); then
  echo "hold: primary advisory review fetch failed" >&2
  exit 2
fi
if ! LATEST_REVIEW_JSON=$(printf '%s\n' "${REVIEWS_RAW}" | jq -s '
  map(.[]
    | select(.user.login == "copilot-pull-request-reviewer"
      or .user.login == "copilot-pull-request-reviewer[bot]")
    | {sa: .submitted_at, cid: .commit_id, id: .id, body: (.body // "")})
  | sort_by(.sa) | last // {}'); then
  echo "hold: primary advisory review response was not valid JSON" >&2
  exit 2
fi
LATEST_REVIEW_CID=$(printf '%s' "${LATEST_REVIEW_JSON}" | jq -r '.cid // ""')
LATEST_REVIEW_ID=$(printf '%s' "${LATEST_REVIEW_JSON}" | jq -r '.id // empty')
LATEST_REVIEW_SUBMITTED_AT=$(printf '%s' "${LATEST_REVIEW_JSON}" | jq -r '.sa // ""')

# Copilot can fold findings into a <details> block without creating review
# comments. Keep the parser aligned with the helper's structured heading and
# ignore Markdown code examples so a quoted heading cannot create a false
# blocker. A missing heading means zero suppressed comments.
SUPPRESSED_COUNT=$(printf '%s' "${LATEST_REVIEW_JSON}" | jq -r '
  def strip_code:
    gsub("(?s)```.*?```"; "")
    | gsub("`[^`]*`"; "");
  try (
    (.body // "")
    | strip_code
    | capture("(?i)<summary>\\s*suppressed comments \\((?<count>[0-9]+)\\)\\s*</summary>")
    | .count
    | tonumber
  ) catch 0 // 0
')

# Actionable items = posted review comments on that review.
if [ -n "${LATEST_REVIEW_ID}" ]; then
  if ! REVIEW_COMMENTS_RAW=$(gh api "repos/${OWNER}/${REPO}/pulls/{pr-number}/reviews/${LATEST_REVIEW_ID}/comments" --paginate); then
    echo "hold: latest advisory review-comment fetch failed" >&2
    exit 2
  fi
  if ! ACTIONABLE_ITEM_COUNT=$(printf '%s\n' "${REVIEW_COMMENTS_RAW}" | jq -s '
    if any(type != "array") then error("review comments response was not an array")
    else map(length) | add // 0
    end'); then
    echo "hold: latest advisory review-comment response was not valid JSON" >&2
    exit 2
  fi
else
  ACTIONABLE_ITEM_COUNT=""
fi

CONJUNCT1=$([ "${LATEST_REVIEW_CID}" = "${PR_HEAD_SHA}" ] && echo true || echo false)

# Current-HEAD primary-bot threads: resolved OR a *fresh* **Accepted** /
# **Rejected** reply (after the latest non-disposition comment).
# Paginate until hasNextPage is false.
if ! THREADS_RAW=$(gh api graphql --paginate -f query='
  query($owner:String!, $repo:String!, $number:Int!, $endCursor:String) {
    repository(owner:$owner, name:$repo) {
      pullRequest(number:$number) {
        reviewThreads(first:100, after:$endCursor) {
          pageInfo { hasNextPage endCursor }
          nodes {
            id
            isResolved
            comments(first:100) {
              pageInfo { hasNextPage endCursor }
              nodes { author { login } body createdAt commit { oid } }
            }
          }
        }
      }
    }
  }' -F owner="${OWNER}" -F repo="${REPO}" -F number={pr-number}); then
  echo "hold: review-thread fetch failed; partial pagination is unusable" >&2
  exit 2
fi
if ! THREADS_JSON=$(printf '%s\n' "${THREADS_RAW}" | jq -s '
  map(
    if ((.errors // []) | length) > 0 then
      error("review-thread GraphQL response contained errors")
    else
      (.data.repository.pullRequest.reviewThreads.nodes
        // error("review-thread GraphQL response omitted nodes"))
    end
  ) | add // []'); then
  echo "hold: review-thread response was incomplete or invalid JSON" >&2
  exit 2
fi

# The outer `--paginate` only advances reviewThreads. Fetch each thread's
# remaining comments separately so a long conversation cannot look complete
# merely because its first 100 comments were readable.
while IFS="$(printf '\t')" read -r THREAD_ID COMMENT_CURSOR; do
  [ -n "$THREAD_ID" ] || continue
  while [ -n "$COMMENT_CURSOR" ]; do
    if ! COMMENT_PAGE=$(gh api graphql -f query='
      query($threadId:ID!, $commentCursor:String) {
        node(id:$threadId) {
          ... on PullRequestReviewThread {
            comments(first:100, after:$commentCursor) {
              pageInfo { hasNextPage endCursor }
              nodes { author { login } body createdAt commit { oid } }
            }
          }
        }
      }' -F threadId="$THREAD_ID" -F commentCursor="$COMMENT_CURSOR"); then
      echo "hold: nested review-comment fetch failed; partial pagination is unusable" >&2
      exit 2
    fi
    if ! printf '%s' "$COMMENT_PAGE" | jq -e '
      if ((.errors // []) | length) > 0 then
        error("nested review-comment GraphQL response contained errors")
      elif .data.node == null then
        error("nested review-comment GraphQL response omitted thread")
      elif (.data.node.comments.nodes | type) != "array" then
        error("nested review-comment GraphQL response omitted nodes")
      else true
      end' >/dev/null; then
      echo "hold: nested review-comment response was incomplete or invalid JSON" >&2
      exit 2
    fi
    COMMENT_NODES=$(printf '%s' "$COMMENT_PAGE" | jq -c '.data.node.comments.nodes')
    COMMENT_HAS_NEXT=$(printf '%s' "$COMMENT_PAGE" | jq -r '.data.node.comments.pageInfo.hasNextPage')
    COMMENT_CURSOR_NEXT=$(printf '%s' "$COMMENT_PAGE" | jq -r '.data.node.comments.pageInfo.endCursor // empty')
    if [ "$COMMENT_HAS_NEXT" = "true" ] && [ -z "$COMMENT_CURSOR_NEXT" ]; then
      echo "hold: nested review-comment pagination omitted its next cursor" >&2
      exit 2
    fi
    if [ "$COMMENT_HAS_NEXT" = "true" ]; then
      if ! THREADS_JSON=$(printf '%s' "$THREADS_JSON" | jq \
        --arg id "$THREAD_ID" --argjson nodes "$COMMENT_NODES" \
        --arg cursor "$COMMENT_CURSOR_NEXT" \
        'map(if .id == $id
             then .comments.nodes += $nodes
             | .comments.pageInfo.endCursor = $cursor
             else .
             end)'); then
        echo "hold: nested review-comment state could not be assembled" >&2
        exit 2
      fi
      COMMENT_CURSOR="$COMMENT_CURSOR_NEXT"
    else
      if ! THREADS_JSON=$(printf '%s' "$THREADS_JSON" | jq \
        --arg id "$THREAD_ID" --argjson nodes "$COMMENT_NODES" \
        'map(if .id == $id
             then .comments.nodes += $nodes
             | .comments.pageInfo.hasNextPage = false
             | .comments.pageInfo.endCursor = null
             else .
             end)'); then
        echo "hold: nested review-comment state could not be assembled" >&2
        exit 2
      fi
      COMMENT_CURSOR=""
    fi
  done
done <<EOF
$(printf '%s' "$THREADS_JSON" | jq -r '.[] | select(.comments.pageInfo.hasNextPage) | [.id, .comments.pageInfo.endCursor] | @tsv')
EOF

# F2 accepts only IDD-agent / trusted-marker authors (same set the helper
# reuses as iddAgentLogins). Empty set fails closed. Review acknowledgements
# use a narrower durable allowlist below; the current credential is not
# automatically trusted for that escape hatch.
CURRENT_MARKER_ACTOR=$(gh api user --jq '.login' 2>/dev/null || true)
IDD_AGENT_LOGIN_JSON=$(
  {
    printf '%s\n' "${IDD_AGENT_LOGINS:-}" | tr ',' '\n'
    printf '%s\n' "${IDD_TRUSTED_MARKER_ACTORS:-}" | tr ',' '\n'
    if [ -n "${CURRENT_MARKER_ACTOR}" ]; then
      printf '%s\n' "${CURRENT_MARKER_ACTOR}"
    fi
  } | sed '/^[[:space:]]*$/d' | sort -fu | jq -Rsc 'split("\n") | map(select(length > 0))'
)
TRUSTED_REVIEW_ACK_LOGIN_JSON=$(printf '%s' "${BASE_CONFIG_CONTENT}" | base64 "${BASE64_DECODE_ARGS}" | jq -c '
  (.trustedMarkerActors // [])
  | map(select(type == "string" and length > 0) | ascii_downcase)
  | unique')

# Originating comment is nodes[0]. A truncated comments page is unmet.
# A disposition is fresh only when it is later than every non-disposition
# comment on the thread (same rule as hasFreshDisposition) and the
# author is an IDD agent / trusted marker actor.
CONJUNCT3=$(printf '%s' "${THREADS_JSON}" | jq -rs --arg sha "${PR_HEAD_SHA}" --argjson agents "${IDD_AGENT_LOGIN_JSON}" '
  def author_login: (.author.login // .user.login // "");
  def is_idd_agent:
    ((author_login | ascii_downcase) as $u
      | ($agents | map(ascii_downcase) | index($u)) != null);
  def is_disp:
    ((.body | startswith("**Accepted**") or startswith("**Rejected**")))
    and is_idd_agent;
  def latest_feedback:
    [.comments.nodes[] | select(is_disp | not) | .createdAt]
    | if length == 0 then null else max end;
  def has_fresh_disp:
    latest_feedback as $fb
    | .comments.nodes | any(is_disp and ($fb == null or .createdAt > $fb));
  add
  | map(select(
      ((.comments.nodes[0].author.login == "copilot-pull-request-reviewer")
        or (.comments.nodes[0].author.login
            == "copilot-pull-request-reviewer[bot]"))
      and (.comments.nodes | any((.commit.oid // "") == $sha))
    ))
  | all((.comments.pageInfo.hasNextPage | not)
      and (.isResolved or has_fresh_disp))
')

# dispositionEvidence: later **Accepted** / **Rejected** markers, 1:1
# by count (E6). Non-agent regular comments and every review thread.
if ! COMMENTS_RAW=$(gh api "repos/${OWNER}/${REPO}/issues/{pr-number}/comments" --paginate); then
  echo "hold: regular PR-comment fetch failed; dispositionEvidence is unavailable" >&2
  exit 2
fi
if ! COMMENTS_JSON=$(printf '%s\n' "${COMMENTS_RAW}" | jq -s 'add // []'); then
  echo "hold: regular PR-comment response was not valid JSON" >&2
  exit 2
fi
REVIEW_ACK_VALID=$(printf '%s' "${COMMENTS_JSON}" | jq -r \
  --arg head "${PR_HEAD_SHA}" \
  --arg submitted "${LATEST_REVIEW_SUBMITTED_AT}" \
  --argjson agents "${TRUSTED_REVIEW_ACK_LOGIN_JSON}" '
  def marker:
    try ((.body // "")
      | capture("^review-ack: (?<agent>[^[:space:]]+) (?<head>[0-9A-Fa-f]{40}) (?<ackAt>[^[:space:]]+)$"))
    catch null;
  def valid_iso_timestamp:
    test("^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$")
    and (try (fromdateiso8601 | true) catch false);
  any(.[];
    . as $comment
    | ($comment | marker) as $ack
    | (($comment.user.login // "") | ascii_downcase) as $login
    | ($ack != null
      and (($agents | map(ascii_downcase) | index($login)) != null)
      and (($ack.head | ascii_downcase) == ($head | ascii_downcase))
      and ($ack.ackAt | valid_iso_timestamp)
      and ($comment.created_at > $submitted))
  )')
CONJUNCT2=$(
  if [ "${ACTIONABLE_ITEM_COUNT}" = "0" ] \
    && { [ "${SUPPRESSED_COUNT}" = "0" ] || [ "${REVIEW_ACK_VALID}" = true ]; }; then
    echo true
  else
    echo false
  fi
)
CONVERGED=$([ "${CONJUNCT1}" = true ] && [ "${CONJUNCT2}" = true ] && [ "${CONJUNCT3}" = true ] && echo true || echo false)
DISPOSITION_JSON=$(printf '%s' "${COMMENTS_JSON}" | jq -c --argjson agents "${IDD_AGENT_LOGIN_JSON}" '
  map(select(
    (.body | startswith("**Accepted**") or startswith("**Rejected**"))
    and (((.user.login // "") | ascii_downcase) as $u
      | ($agents | map(ascii_downcase) | index($u)) != null)
  ))
')
MISSING_REGULAR=$(printf '%s\n' "${COMMENTS_JSON}" "${DISPOSITION_JSON}" | jq -s \
  --argjson agents "${IDD_AGENT_LOGIN_JSON}" \
  --argjson advisory "${ADVISORY_BOT_LOGINS_JSON}" '
  .[0] as $comments | .[1] as $disp
  | def login: ((.user.login // .author.login // "") | ascii_downcase);
  def is_agent:
    (login as $u
      | ($agents | map(ascii_downcase) | index($u)) != null);
  def is_advisory:
    (login as $u
      | (($advisory | map(ascii_downcase) | index($u)) != null
        or $u == "copilot-pull-request-reviewer"
        or $u == "copilot-pull-request-reviewer[bot]"));
  # Mirror the E1 periodic-notification exclusion without excluding a bot
  # explicitly configured as an advisory reviewer for this repository.
  def is_periodic_notification:
    (login as $u
      | $u == "renovate"
        or $u == "renovate[bot]"
        or $u == "dependabot"
        or $u == "dependabot[bot]");
  def is_disposition:
    (
      ((.body // "") | startswith("**Accepted**"))
      or ((.body // "") | startswith("**Rejected**"))
    ) and is_agent;
  def operational_prefix:
    (.body // "") as $body
    | ($body | startswith("<!-- review-watermark:")
      or startswith("<!-- review-baseline:")
      or startswith("<!-- zero-accepted-path-a-gate:")
      or startswith("<!-- claimed-by:")
      or startswith("<!-- unclaimed-by:")
      or startswith("advisory-wait:")
      or startswith("advisory-wait-recovery:")
      or startswith("<!-- advisory-wait:")
      or startswith("advisory-reroll:"));
  def is_trusted_operational_marker:
    (is_agent and operational_prefix);
  def is_ordinary_agent_reply:
    (is_agent and (is_disposition | not)
      and (is_trusted_operational_marker | not));
  def has_later_ordinary_agent_reply:
    . as $comment
    | any($comments[];
        (.created_at > $comment.created_at)
        and is_ordinary_agent_reply);
  ($comments
     | map(select(
         (is_agent | not)
         and (is_disposition | not)
         and (is_trusted_operational_marker | not)
         and ((is_periodic_notification and (is_advisory | not)) | not)
         and (is_advisory or (has_later_ordinary_agent_reply | not))
       ))
     | sort_by(.created_at)) as $out
  | ($disp | sort_by(.created_at)) as $ds
  | reduce $out[] as $c (
      {unused: $ds, missing: 0};
      ((.unused | to_entries
        | map(select(.value.created_at > $c.created_at))
        | first) as $hit
      | if $hit == null then .missing += 1
        else .unused |= del(.[$hit.key])
        end)
    )
  | .missing
')
MISSING_THREADS=$(printf '%s' "${THREADS_JSON}" | jq -rs \
  --argjson agents "${IDD_AGENT_LOGIN_JSON}" \
  --argjson advisory "${ADVISORY_BOT_LOGINS_JSON}" \
  --arg pr_author "${PR_AUTHOR_LOGIN}" '
  def author_login: (.author.login // .user.login // "");
  def origin_login:
    ((.comments.nodes[0].author.login // .comments.nodes[0].user.login // "")
      | ascii_downcase);
  def is_idd_agent:
    ((author_login | ascii_downcase) as $u
      | ($agents | map(ascii_downcase) | index($u)) != null);
  def is_advisory_origin:
    (origin_login as $u
      | ($advisory | index($u)) != null
        or ($u == "copilot-pull-request-reviewer")
        or ($u == "copilot-pull-request-reviewer[bot]"));
  def is_disp:
    ((.body | startswith("**Accepted**") or startswith("**Rejected**")))
    and is_idd_agent;
  def latest_feedback:
    [.comments.nodes[] | select(is_disp | not) | .createdAt]
    | if length == 0 then null else max end;
  def has_fresh_disp:
    latest_feedback as $fb
    | .comments.nodes | any(is_disp and ($fb == null or .createdAt > $fb));
  def has_external_feedback:
    .comments.nodes | any(
      ((.author.login // "") | ascii_downcase) as $u
      | ($u != "")
        and (($agents | map(ascii_downcase) | index($u)) == null)
        and ($u != ($pr_author | ascii_downcase))
    );
  def has_human_presence:
    .comments.nodes[1:] | any(
      ((.author.login // "") | ascii_downcase) as $u
      | ($u != "")
        and (($agents | map(ascii_downcase) | index($u)) == null)
        and (($advisory | index($u)) == null)
        and ($u != "copilot-pull-request-reviewer")
        and ($u != "copilot-pull-request-reviewer[bot]")
        and ((.body // "") | startswith("**Accepted**") or startswith("**Rejected**") | not)
    );
  add
  | map(select(
      (.comments.pageInfo.hasNextPage)
      or (
        (has_external_feedback)
        and (.isResolved | not)
        and (has_fresh_disp | not)
        and (is_advisory_origin or (has_human_presence | not))
      )
    ))
  | length
')

echo "converged=${CONVERGED} conjuncts=${CONJUNCT1},${CONJUNCT2},${CONJUNCT3}"
echo "suppressedCount=${SUPPRESSED_COUNT} reviewAckValid=${REVIEW_ACK_VALID}"
echo "missingRegularComments=${MISSING_REGULAR} missingThreads=${MISSING_THREADS}"
# proceed iff CONVERGED is true AND both missing counts are 0.
```

## F2 secondary advisory quiet window

When `advisoryWait.secondaryQuietWindow` is configured and the repository
uses `helperRuntime.profile: instructions-only`, the readiness helper's
`secondaryQuietWindow` field must be reproduced before F2 can proceed. Run
the following after the other E-phase convergence conditions are satisfied.
It is deliberately conservative: the no-secondary-review path anchors on
the latest activity from all fetched PR review surfaces, so an activity that
the helper would classify as an ack-only event can only delay the merge, never
shorten the safety window. The current dantalion dogfooding policy uses
CodeRabbit as the secondary bot; the notice patterns below are the same
rate-limit and skip-review markers used by the upstream classifier.

```sh
set -eu
set -o pipefail

PR_NUMBER={pr-number}
REPOSITORY=$(gh repo view --json nameWithOwner --jq '.nameWithOwner')
OWNER=${REPOSITORY%%/*}
REPO=${REPOSITORY#*/}
PR_METADATA=$(gh api "repos/${REPOSITORY}/pulls/${PR_NUMBER}")
PR_HEAD_SHA=$(printf '%s' "$PR_METADATA" | jq -er '.head.sha')
PR_UPDATED_AT=$(printf '%s' "$PR_METADATA" | jq -er '.updated_at')
PR_BASE_SHA=$(printf '%s' "$PR_METADATA" | jq -er '.base.sha')
CONFIG=$(mktemp)
trap 'rm -f "$CONFIG"' EXIT
BASE_CONFIG_CONTENT=$(gh api \
  "repos/${REPOSITORY}/contents/.github/idd/config.json?ref=${PR_BASE_SHA}" \
  --jq '.content // empty' | tr -d '\n')
if [ -z "$BASE_CONFIG_CONTENT" ]; then
  echo "hold: trusted base ref did not provide .github/idd/config.json" >&2
  exit 2
fi
BASE64_DECODE_ARGS="--decode"
if ! printf '' | base64 "${BASE64_DECODE_ARGS}" >/dev/null 2>&1; then
  BASE64_DECODE_ARGS="-D"
  if ! printf '' | base64 "${BASE64_DECODE_ARGS}" >/dev/null 2>&1; then
    echo "hold: base64 decoder does not support GNU --decode or BSD -D" >&2
    exit 2
  fi
fi
printf '%s' "$BASE_CONFIG_CONTENT" | base64 "${BASE64_DECODE_ARGS}" > "$CONFIG"

QUIET_SPEC=$(jq -r '.advisoryWait.secondaryQuietWindow // ""' "$CONFIG")
SECONDARY_LOGIN=$(jq -r '.advisoryWait.secondaryBotLogin // ""' "$CONFIG")

# Omitted secondaryQuietWindow is the explicit off/default path.
if [ -z "$QUIET_SPEC" ]; then
  jq -n '{minutes: 0, anchorAt: "none", elapsedMinutes: null,
          elapsed: true, remainingMinutes: 0, declined: false}'
  exit 0
fi

# Accept the policy's positive whole-minute ISO-8601 duration forms.
QUIET_MINUTES=$(
  jq -nr --arg spec "$QUIET_SPEC" '
    ($spec | capture("^P(?:(?<days>[0-9]+)D)?(?:T(?:(?<hours>[0-9]+)H)?(?:(?<minutes>[0-9]+)M)?)?$") ) as $p
    | ((($p.days // "0") | tonumber) * 1440
       + (($p.hours // "0") | tonumber) * 60
       + (($p.minutes // "0") | tonumber))
  '
)
if [ "$QUIET_MINUTES" -le 0 ]; then
  echo "hold: invalid positive advisoryWait.secondaryQuietWindow" >&2
  exit 2
fi

# Use GitHub's Date header, not the executor's local wall clock.
SERVER_NOW=$(
  gh api "repos/${OWNER}/${REPO}/issues/${PR_NUMBER}" --include \
    | awk 'tolower($0) ~ /^date:/ {
        sub(/\r$/, ""); sub(/^[^:]*:[[:space:]]*/, ""); print; exit
      }'
)
if [ -z "$SERVER_NOW" ]; then
  echo "hold: GitHub server Date header was unavailable" >&2
  exit 2
fi

iso_to_epoch() {
  IDD_ISO_TIMESTAMP="$1" node -e '
    const timestamp = process.env.IDD_ISO_TIMESTAMP;
    const milliseconds = Date.parse(timestamp);
    if (!Number.isFinite(milliseconds)) process.exit(1);
    process.stdout.write(String(Math.floor(milliseconds / 1000)));
  '
}

if ! NOW_EPOCH=$(iso_to_epoch "$SERVER_NOW"); then
  echo "hold: GitHub server Date header was not parseable" >&2
  exit 2
fi

if ! TIMELINE_RAW=$(gh api "repos/${OWNER}/${REPO}/issues/${PR_NUMBER}/timeline" --paginate); then
  echo "hold: PR timeline fetch failed; server-side branch movement is unreadable" >&2
  exit 2
fi
if ! TIMELINE_JSON=$(printf '%s\n' "$TIMELINE_RAW" | jq -s 'add // []'); then
  echo "hold: PR timeline response was not valid JSON" >&2
  exit 2
fi
if ! BRANCH_TIP_MOVEMENTS_JSON=$(printf '%s' "$TIMELINE_JSON" | jq -c --arg head "$PR_HEAD_SHA" '
  def event_head_sha:
    [ .sha, .commit_id, .head_sha, .after_commit_id, .after ]
    | map(select(type == "string" and length > 0))
    | .[0] // "";
  map(select(
    ((.event == "committed"
      or .event == "head_ref_force_pushed"
      or .event == "head_ref_deleted"
      or .event == "synchronize")
      and ((.created_at // .updated_at // "") != "")
      and (event_head_sha == $head))
  ) | {at: (.created_at // .updated_at),
       type: (.event // "branch-tip-movement"),
       head_sha: event_head_sha})
  | sort_by(.at)
'); then
  echo "hold: PR timeline branch-movement records were not valid JSON" >&2
  exit 2
fi
if ! jq -nr --arg timestamp "$PR_UPDATED_AT" '$timestamp | fromdateiso8601' >/dev/null; then
  echo "hold: GitHub PR updated_at was not a valid server timestamp" >&2
  exit 2
fi
if ! BRANCH_TIP_MOVEMENTS_JSON=$(printf '%s' "$BRANCH_TIP_MOVEMENTS_JSON" | jq -c \
  --arg at "$PR_UPDATED_AT" \
  --arg head "$PR_HEAD_SHA" \
  '. + [{at: $at, type: "head-snapshot", head_sha: $head}] | sort_by(.at)'); then
  echo "hold: current PR head snapshot could not be bound to server metadata" >&2
  exit 2
fi
# Ordinary pushes appear as timestamp-less `committed` timeline records.
# The successful PR response above binds its server-managed updated_at to
# the current head.sha. Keep that conservative snapshot alongside any
# timestamped timeline evidence; never fall back to PR creation or a commit
# object's author/committer date.
HEAD_ACTIVITY_AT=$(printf '%s' "$BRANCH_TIP_MOVEMENTS_JSON" | jq -r '.[-1].at // empty')
if [ -z "$HEAD_ACTIVITY_AT" ]; then
  echo "hold: current PR head has no server-anchored activity timestamp" >&2
  exit 2
fi

ISSUE_COMMENTS_JSON=$(
  gh api "repos/${OWNER}/${REPO}/issues/${PR_NUMBER}/comments?per_page=100" \
    --paginate | jq -s 'add // []'
)
REVIEWS_JSON=$(
  gh api "repos/${OWNER}/${REPO}/pulls/${PR_NUMBER}/reviews?per_page=100" \
    --paginate | jq -s 'add // []'
)
REVIEW_COMMENTS_JSON=$(
  gh api "repos/${OWNER}/${REPO}/pulls/${PR_NUMBER}/comments?per_page=100" \
    --paginate | jq -s 'add // []'
)

# A mutable PR `updated_at` is only a current-head observation. Prefer the
# earliest trusted same-head advisory marker (posted after the head was
# observed), then a timestamped timeline record explicitly bound to this
# head. If the fast path has no advisory marker or timestamped movement,
# retain the server-observed `head-snapshot` as a conservative fallback: it
# can only delay settlement when later review/comment activity advanced the
# mutable PR timestamp, never shorten the quiet window.
TRUSTED_MARKER_LOGINS_JSON=$(jq -c \
  '(.trustedMarkerActors // [])
   | map(select(type == "string" and length > 0) | ascii_downcase)
   | unique' "$CONFIG")
HEAD_ENTRY_AT=$(printf '%s' "$ISSUE_COMMENTS_JSON" | jq -r \
  --arg head "$PR_HEAD_SHA" \
  --argjson trusted "$TRUSTED_MARKER_LOGINS_JSON" '
    map(select(
      (((.user.login // .author.login // "") | ascii_downcase)
        as $login | ($trusted | index($login)) != null)
      and ((.body // "")
        | test("^(advisory-wait|advisory-wait-recovery): [^ ]+ "
               + $head + "(?: |$)"))
      and ((.created_at // "") != "")
    ))
    | map(.created_at) | sort | .[0] // empty
  ')
if [ -z "$HEAD_ENTRY_AT" ]; then
  HEAD_ENTRY_AT=$(printf '%s' "$BRANCH_TIP_MOVEMENTS_JSON" | jq -r '
    map(.at) | sort | .[0] // empty
  ')
fi
if [ -z "$HEAD_ENTRY_AT" ]; then
  echo "hold: current PR head has no stable server-anchored entry timestamp" >&2
  exit 2
fi
if ! jq -nr --arg timestamp "$HEAD_ENTRY_AT" '$timestamp | fromdateiso8601' >/dev/null; then
  echo "hold: current PR head entry timestamp was invalid" >&2
  exit 2
fi

# This is a fail-closed, conservative approximation of the helper's
# effective.maxActivityUpdatedAt. Keep all three review surfaces, the
# server-observed branch movement events, and all readable timestamps;
# filtering can only make the wait shorter.
ACTIVITY_JSON=$(
  jq -n \
    --argjson issue_comments "$ISSUE_COMMENTS_JSON" \
    --argjson reviews "$REVIEWS_JSON" \
    --argjson review_comments "$REVIEW_COMMENTS_JSON" \
    --argjson branch_tip_movements "$BRANCH_TIP_MOVEMENTS_JSON" '
      ($issue_comments + $reviews + $review_comments + $branch_tip_movements)
      | map({at: (.at // .updated_at // .submitted_at // .created_at // ""),
             body: (.body // ""),
             login: (.user.login // .author.login // "")})
      | map(select(.at != ""))
      | sort_by(.at)
    '
)
LATEST_ACTIVITY_AT=$(printf '%s' "$ACTIVITY_JSON" | jq -r '.[-1].at // empty')

# Only pull-request review objects with an explicit current-head commit
# binding participate in the secondary settlement signal. Issue-level bot
# comments have no commit_id, so they cannot prove which HEAD they describe;
# never use them to shorten or skip the quiet window. A current-head review
# uses a short five-minute confirmation buffer, capped by the configured
# window. An unbound notice remains pending and keeps the full window.
SECONDARY_LATEST_JSON=$(
  printf '%s' "$REVIEWS_JSON" \
    | jq -c --arg login "$SECONDARY_LOGIN" --arg head "$PR_HEAD_SHA" '
        map(select(((.user.login // .author.login // "") | ascii_downcase)
                   == ($login | ascii_downcase)
                   and ((.commit_id // "") | ascii_downcase)
                     == ($head | ascii_downcase)))
        | map({at: (.submitted_at // .updated_at // .created_at // ""),
               body: (.body // "")})
        | map(select(.at != ""))
        | sort_by(.at) | .[-1] // {}
      '
)
SECONDARY_STATUS=$(
  printf '%s' "$SECONDARY_LATEST_JSON" | jq -r '
    def non_review_notice:
      ((.body // "") | ascii_downcase) as $body
      | ($body | contains("<!-- this is an auto-generated comment: rate limited by coderabbit.ai -->")
          or contains("<!-- this is an auto-generated comment: skip review by coderabbit.ai -->")
          or test("^[>\\s]*#{1,6}\\s*review limit reached\\b"; "m"));
    if (.at // "") == "" then "pending"
    elif non_review_notice then "declined"
    else "settled"
    end
  '
)
SECONDARY_AT=$(printf '%s' "$SECONDARY_LATEST_JSON" | jq -r '.at // empty')

WINDOW_MINUTES="$QUIET_MINUTES"
ANCHOR_AT="$LATEST_ACTIVITY_AT"
DECLINED=false
if [ "$SECONDARY_STATUS" = "declined" ]; then
  DECLINED=true
  ELAPSED=true
  ELAPSED_MINUTES=null
  REMAINING_MINUTES=0
elif [ "$SECONDARY_STATUS" = "settled" ]; then
  # A settled secondary timestamp must never rewind a newer activity anchor.
  ANCHOR_AT=$(jq -nr \
    --arg latest "$LATEST_ACTIVITY_AT" \
    --arg secondary "$SECONDARY_AT" \
    '[$latest, $secondary] | map(select(length > 0)) | max // empty')
  if [ "$WINDOW_MINUTES" -gt 5 ]; then WINDOW_MINUTES=5; fi
fi

if [ "$SECONDARY_STATUS" != "declined" ]; then
  if [ -z "$ANCHOR_AT" ]; then
    ELAPSED=true
    ELAPSED_MINUTES=null
    REMAINING_MINUTES=0
  else
    if ! ANCHOR_EPOCH=$(iso_to_epoch "$ANCHOR_AT"); then
      echo "hold: activity anchor was not parseable" >&2
      exit 2
    fi
    ELAPSED_SECONDS=$((NOW_EPOCH - ANCHOR_EPOCH))
    if [ "$ELAPSED_SECONDS" -lt 0 ]; then ELAPSED_SECONDS=0; fi
    ELAPSED_MINUTES=$((ELAPSED_SECONDS / 60))
    if [ "$ELAPSED_MINUTES" -ge "$WINDOW_MINUTES" ]; then
      ELAPSED=true
      REMAINING_MINUTES=0
    else
      ELAPSED=false
      REMAINING_MINUTES=$((WINDOW_MINUTES - ELAPSED_MINUTES))
    fi
  fi
fi

jq -n \
  --arg anchor "$ANCHOR_AT" \
  --argjson minutes "$WINDOW_MINUTES" \
  --argjson elapsed_minutes "${ELAPSED_MINUTES:-null}" \
  --argjson elapsed "$ELAPSED" \
  --argjson remaining "$REMAINING_MINUTES" \
  --argjson declined "$DECLINED" \
  '{minutes: $minutes, anchorAt: $anchor,
    elapsedMinutes: $elapsed_minutes, elapsed: $elapsed,
    remainingMinutes: $remaining, declined: $declined}'

# `elapsed: false` is the F2 secondary-quiet-window blocker: wait the
# reported remaining minutes, then repeat the complete F2 evidence read.
```

`date -u -d` is the GNU form; use the host's equivalent UTC-only parser on
BSD/macOS. If that parser, any `gh api` call, `jq`, or the server `Date`
header is unavailable, stop with a hold. Do not substitute the local clock or
assume `elapsed: true` from a partial read.
