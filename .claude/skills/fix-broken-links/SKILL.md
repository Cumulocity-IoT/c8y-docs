---
name: fix-broken-links
description: Investigate a Link Checker GitHub Actions workflow run (from a run URL, the current branch/PR, or a filed link-checker issue), find the root cause of each reported broken link, and fix it - by editing content, config.cjs (excludedLinks/resourceMocks), the cypress exception list, or the checker scripts themselves. Use when the user asks to investigate or fix broken links, a link-checker issue, or a failing/failed Link Checker workflow run.
---

# Fix Broken Links

You are investigating one run of the `Link Checker` GitHub Actions workflow
(`.github/workflows/link-checker.yml`), root-causing every reported failure,
and fixing what's fixable - while also looking for chances to make the
checker itself (`broken-links-script/`) more reliable so the same class of
failure doesn't recur.

Read `broken-links-script/README.md` first for how the checker works
mechanically (extraction, Cypress validation, `config.cjs` knobs, local run
commands). This skill assumes that context and focuses on the investigation
and fix workflow, which the README intentionally does not cover in depth.

## Step 0: Resolve the target run

Figure out which workflow run to investigate, in this priority order:

1. **User gave a direct link or run ID** - use it as-is.
2. **User gave a link-checker GitHub issue** (title like "Weekly Link Check
   Failed for `<branch>`") - the issue body contains the run URL. Fetch the
   issue with `gh issue view <number>` to get it.
3. **Neither given, infer from context**:
   - If the current branch matches `no-issue_Fix-broken-links-in-<target>-on-<date>`,
     `<target>` is the branch that was failing (`develop`, `release/y2025`,
     `release/y2026`, ...) - find the relevant run with:
     `gh run list --workflow "Link Checker" --branch <target> --limit 5`
   - If there's an open PR on the current branch with the `broken-link-check`
     label, look for the run tied to the PR-comment trigger instead
     (`gh pr view --json comments` or `gh run list --workflow "Link Checker"`
     filtered to the PR's head branch).
   - Otherwise ask the user which run/branch to investigate rather than
     guessing - do not silently pick an arbitrary run.

Confirm the resolved run and target branch back to the user in one line
before proceeding.

## Step 1: Gather the failure data

For the resolved run:

```bash
gh run view <run-id> --log-failed
```

and/or download the full log artifact (kept 8 days, named
`cypress-log-<branch>`, sanitized `/` -> `-`):

```bash
gh run download <run-id> -n cypress-log-<sanitized-branch>
```

From the log, extract every failing URL and its failure mode. Failed tests
end with `should validate URL: <url>:` - grep for that pattern to get a
clean list. For each failing URL, also find the source Markdown file(s) - the
test output includes `Cypress.env('sourceFiles', ...)`, so the failure
message names the file(s) that link came from; cross-check against
`broken-links-script/all_links.json` (regenerate it locally with
`node Extractlinks.js` if it's not already present) if the log doesn't make
the source obvious.

If a PR-comment run exists for this failure, `broken-links-script/summarize-failures.cjs`
already produced a compact "N of M failed" list with URLs - that's a fast
way to get the failing-URL list without re-parsing the raw log yourself.

Build a checklist of every distinct failing URL before triaging any of
them - triage each one independently; don't stop at the first plausible
explanation if several URLs are failing for unrelated reasons.

## Step 2: Triage each failure

For every failing URL, work out which case it is. Do not pattern-match on
error text alone - confirm with evidence (curl, diagnostics mode, or reading
the source Markdown) before deciding, especially before touching shared
config that affects other links.

### Case 1: The link is genuinely broken

The target page 404s, DNS fails, or otherwise doesn't exist/isn't reachable
in any environment. **Fix:** edit the source Markdown file to point at the
correct URL (or remove the link if there's no longer a valid target).

### Case 2: Fragment (`#section`) check fails

The base page loads but the named anchor isn't found. Check whether:

- the fragment/anchor name changed on the target page,
- it's a GitHub link where the `user-content-` prefix handling matters,
- the anchor was simply renamed or removed upstream.

**Fix:** update the fragment in the source Markdown to match reality. Only
exclude the link if the fragment truly cannot be resolved any other way.

### Case 3: Works in a browser, times out in Cypress, and it's the *link's own* request/page that's blocked

Distinguish this from Case 4 (below) carefully - they look similar but the
fix is different:

- **This case (Case 3)**: the link's own request/page-load is what
  hangs or fails, with no separate sub-resource involved.
- **Case 4**: the *link* responds fine, but the page it points to pulls in
  some *other* (third-party) resource that hangs and blocks Cypress's `load`
  event.

Telltale sign of Case 3: **inconsistency across otherwise-identical runs or
branches** - the same URL passes cleanly on one branch/run and fails
completely on a sibling branch/run around the same time, or passes fast via
`curl`/locally but times out only in CI. This pattern matches
IP-reputation-based blocking of GitHub Actions' ephemeral runner IPs by the
target site, not a real problem with the content. Retries won't help since
the block persists for the whole job lifetime.

To confirm Case 3 rather than Case 1 or Case 4:

1. `curl -w '%{http_code} %{time_total}\n' -o /dev/null <url>` - fast/correct
   here rules out "genuinely broken" but not Case 3 vs Case 4.
2. Dispatch the workflow with `branch` + `urlsWith` + `diagnostics=true` on
   the failing branch (see Step 3 below) to get a real CI data point.
3. Compare against sibling branches/runs at the same time
   (`gh run list --workflow "Link Checker"`, then
   `gh run view <id> --log-failed`) - if the same URL passed cleanly on a
   sibling job in the same run, that's strong evidence of runner-specific
   blocking rather than a real content problem. In diagnostics-mode runs,
   each job also logs a `runner-egress-ip` entry once - if the failing job's
   IP differs from a passing sibling's, or turns up again on a later failing
   run, that's a much more direct signal of IP-reputation blocking than
   inferring it from timing alone.
4. Check retry timing in the failed job's log: consistent spacing at exactly
   the configured timeout on every attempt indicates a hard per-job block
   (Case 3); a mix of fast passes and occasional slow attempts looks more
   like genuine transient flakiness (still Case 3-ish, but worth noting in
   the fix comment).

**Fix:** add the URL to `excludedLinks` in `broken-links-script/config.cjs`,
with a comment explaining why (site blocks automation / rate-limits /
IP-reputation blocks CI runners specifically).

### Case 4: Page loads but hangs on an unrelated third-party sub-resource

The link's own URL responds quickly and correctly (verify with the `curl`
timing above and/or diagnostics mode), but `cy.visit()` still times out
waiting for `load` because the page embeds something slow/unreachable from
CI (analytics, a widget, a tracking pixel). Also reach for this case when a
link fails only in CI and doesn't reproduce locally at all - GitHub Actions
runners have different network egress than a laptop.

Confirm with diagnostics mode (Step 3) before mocking anything - it logs
every network request's start/completion (a hang shows as a
`network-start`/`request-start` entry with no matching `-done` entry) plus
console errors/uncaught exceptions.

**Fix:** add an entry to `resourceMocks` in `config.cjs`, matching the
sub-resource's pattern (not the link's own URL), with a `reason` explaining
what was hanging and why. If one specific link actually needs the real
resource, use that mock's `overrides` array instead of weakening it for
everyone. Do not add a mock here unless you've confirmed the failing
resource is genuinely unrelated to the link's own validity.

### Case 5: Harmless JavaScript exception on a `cumulocity.com` page

Uncaught exceptions on any page outside `ownDomains` (`config.cjs`) are
already tolerated automatically regardless of message text - nothing to do
there. This case only applies when the exception happens on a
**`cumulocity.com`-domain** page, the page still loads correctly, and the
error is unrelated to link validity.

**Fix:** add a message-matching entry to `cypress/support/e2e.js`'s
`Cypress.on('uncaught:exception', ...)` handler, with the match narrow
enough not to swallow real failures. Never add an entry for a third-party
page (already handled) or for anything that looks like a real content or
navigation failure.

### Not a case above: a systemic/tooling gap

If a failure doesn't fit Cases 1-5 - e.g. a new Hugo shortcode isn't
resolved by `Extractlinks.js`'s `shortcodeMapping`, a new downloadable file
extension isn't in `nonHtmlExtensions` in `cypress/e2e/link-checker.cy.js`,
or the extraction/validation logic mishandles a URL shape it's never seen
before - fix the script logic itself rather than working around it with
config. Note these clearly to the user as a checker-reliability improvement,
since they usually indicate other, not-yet-hit links share the same gap.

## Step 3: Confirm with diagnostics mode when needed

For Cases 3 and 4, don't guess from error text alone - dispatch the
workflow with diagnostics on to get real evidence:

```bash
gh workflow run "Link Checker" \
  -f branch=<failing-branch> \
  -f urlsWith=<substring narrowing to just the failing URL(s)> \
  -f diagnostics=true
```

Then pull the `cypress-log-<branch>` artifact from that run, or grep the log
for `[DIAGNOSTIC]`. Each match is one JSON object (a `[DIAGNOSTIC]` prefix
followed by `{type, link, url, ...}`) - extract and inspect them with:

```bash
grep '\[DIAGNOSTIC\]' cypress-output.log | sed 's/^.*\[DIAGNOSTIC\] //' | jq -s '.'
```

Entry `type`s: `network-start`/`network-done` (browser sub-resources during
`cy.visit()`), `request-start`/`request-done` (the checker's own
`cy.request()` calls), `console`, `uncaught-exception`, and one
`runner-egress-ip` entry per job. This covers every network request's
start/completion and console errors/uncaught exceptions, without changing
pass/fail behavior.

## Step 4: Look for the reliability angle, not just the one-off fix

Once every individual failure is triaged, step back and check for patterns
across the whole set:

- Do several failures share a root cause (same third-party domain, same
  shortcode, same file-extension category)? One `resourceMocks`/
  `excludedLinks`/script fix may cover all of them instead of one entry per
  URL.
- Did the checker itself misreport something (wrong source file, wrong
  resolved URL, a shortcode resolving incorrectly)? That's a bug in
  `Extractlinks.js` or `cypress/e2e/link-checker.cy.js`, not a content or
  config issue - fix it there so future runs don't need the same manual
  triage.
- Is `excludedLinks` or `resourceMocks` accumulating entries that no longer
  have a clear reason attached? Flag stale-looking entries to the user
  rather than leaving them for the next investigation to puzzle over.

Call these out explicitly in your summary even if you don't end up changing
anything, so the human maintainer knows what you considered.

## Step 5: Apply and verify fixes

1. Apply each fix in its correct location (source Markdown, `config.cjs`,
   `cypress/support/e2e.js`, or the checker scripts).
2. Re-run locally to confirm the specific fix:
   `node Extractlinks.js && npx cypress run --browser chrome --headless`,
   optionally narrowed with `--urls-with=<substring>` via
   `node run.cjs --urls-with=<substring>`.
3. If the fix touched `excludedLinks`, `resourceMocks`, the exception
   handler, or script logic (as opposed to a single link's own content), run
   the full unfiltered suite at least once before considering it safe -
   locally if time allows, otherwise via `gh workflow run "Link Checker" -f branch=<branch>`
   with no `urlsWith`.

## Step 6: Branch and PR

Once fixes are ready to commit:

1. Create a branch named
   `no-issue_Fix-broken-links-in-<target>-on-<YYYY-MM-DD>`, where `<target>`
   is the branch that was actually failing (`develop`, `y2025`, `y2026`, ...
   - matching the naming used for `release/y2025` etc., but without the
   `release/` prefix) and the date is today's date. Confirm the current
   branch doesn't already match this convention for the same target/date
   before creating a new one (it may already have been created for this
   investigation).
2. Apply the fixes as commits on that branch.
3. Open a PR against `develop` (or the target release branch, if the
   failures are specific to a release branch and shouldn't go through
   `develop`) summarizing, per fix: which URL/case it was, the root cause,
   and where the fix landed (content vs. `config.cjs` vs. exception list vs.
   script). Call out any reliability-angle findings from Step 4 that weren't
   acted on, so a maintainer can decide on them separately.

Always confirm with the user before pushing the branch or opening the PR.
