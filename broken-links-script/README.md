# Broken Links Checker

This folder contains the automated broken-link checking setup for the Cumulocity docs repository.

It does two things:

1. Extracts all links from Markdown files under `../content`
2. Runs Cypress tests to validate those links

The workflow is also configured to run weekly in GitHub Actions against multiple branches.

## Folder structure

```text
broken-links-script/
├── cypress/
│   ├── e2e/
│   │   └── link-checker.cy.js
│   └── support/
│       └── e2e.js
├── Extractlinks.js
├── known-resource-mocks.cjs
├── package.json
└── README.md
```

## How it works

### Step 1: Extract links

`Extractlinks.js` scans all Markdown files inside `../content`.

It collects links from Markdown link syntax:

```md
[text](url)
```

Then it resolves:

* absolute links
* Hugo shortcodes
* fragment links like `#section`
* internal published docs URLs

Finally, it writes all collected links into `all_links.json`.

Each entry contains:

* the resolved link
* the source Markdown file or files where the link was found

Example:

```json
[
  {
    "link": "https://cumulocity.com/docs/example/page/",
    "files": [
      "device-integration/example.md"
    ]
  }
]
```
To run the extract script:

```bash 
node Extractlinks.js
```
After running, you can inspect `all_links.json` to see all collected links and their sources.

### Step 2: Validate links

The Cypress test file `cypress/e2e/link-checker.cy.js` reads `all_links.json` and checks every link.

Different types of links are handled differently:

* regular HTML pages
* pages with fragments like `#section`
* GitHub links
* GitHub blob line links like `#L10`
* API pages
* Codex pages
* non-HTML files like `.pdf`, `.json`, `.zip`, `.csv`

## How to run locally

### Prerequisites

Make sure you have:

* Node.js installed
* npm installed

### Install dependencies

From the `broken-links-script` folder:

```bash
npm ci
```

### Run the full link check

This runs:

```bash
node Extractlinks.js && npx cypress run --browser chrome --headless
```

So the full flow is:

1. generate `all_links.json`
2. run Cypress link validation

### Run only Cypress tests

```bash
npx cypress run --browser chrome --headless
```

Or open Cypress UI locally:

```bash
npx cypress open
```

## GitHub Actions workflow

The workflow file is `.github/workflows/link-checker.yml`.

### When it runs

It runs:

* every Monday at 06:00 UTC, against the default branch matrix
* manually using `workflow_dispatch`
* automatically on a pull request when the `broken-link-check` label is added
  (checks that PR's branch only, and posts a summary comment instead of
  filing an issue)

### Manual dispatch inputs

All optional - omit all of them to reproduce the default scheduled run.

| Input | Effect |
| --- | --- |
| `branch` | Check only this branch instead of the default matrix |
| `urlsWith` | Only check links containing this substring |
| `diagnostics` | Verbose network + console logging (see "Case 5" below) |

### Branches checked

By default (schedule, or manual dispatch without `branch`), the workflow
checks the branches listed in the `determine-branches` job's fallback array
in `.github/workflows/link-checker.yml` (search for `branches_json=`).

### What happens in CI

For each branch, the workflow:

1. checks out the branch (or, for the PR-label trigger, that PR's head commit)
2. installs dependencies
3. runs the broken-link test suite
4. uploads the full Cypress log as an artifact (kept for 8 days)
5. for the default scheduled/full-matrix runs only: creates a
   branch-specific label if needed, and a GitHub issue if the test fails
6. for the PR-label trigger only: posts a summary comment on the PR

## Where to update the code

### 1. Add or update timeout or excluded links

If a link is valid in a browser but fails in automation because of:

* anti-bot protection
* timeout
* rate limiting
* access restrictions
* unstable third-party behavior

add it to the `excludedLinks` array in `cypress/e2e/link-checker.cy.js`.

Example:

```js
const excludedLinks = [
  "https://example.com/some-page"
];
```

You can also leave a short reason above it:

```js
// Timeout link
"https://example.com/some-page",
```

Use this for links that should be skipped completely.

### 2. Mock a known-problematic third-party resource

Sometimes the link under test is fine, but the page it points to embeds a
third-party resource (analytics, an embed widget, a tracking pixel, etc.)
that is unreachable or hangs specifically from CI runners, blocking the
browser's `load` event and causing `cy.visit()` to time out. This is
different from `excludedLinks`: the link itself is valid, only some
incidental sub-resource the page pulls in is the problem.

For this case, add an entry to `known-resource-mocks.cjs` instead of
excluding the link. Every entry there is applied automatically before every
`cy.visit()`, via `cy.intercept()`, so the flaky resource gets an immediate
mocked response instead of hitting the real network:

```js
{
  name: 'asciinema-embed',
  pattern: '**://asciinema.org/**',
  reason: 'Embed script never responds from GitHub Actions runners; ' +
          'still blocks the load event despite being async.',
  response: { statusCode: 204, body: '' },
  overrides: [],
}
```

* `pattern` / `response` are passed straight to `cy.intercept(pattern, response)`
  — `response` can be a static object or a route handler function.
* Always fill in `reason` — this is what stops the list from turning into an
  unexplained pile of mocks nobody understands six months later.
* If one specific link actually needs the real resource to load (e.g. a page
  that specifically tests that embed), add it to that entry's `overrides`
  instead of weakening the mock for everyone:

  ```js
  overrides: [
    { link: 'https://example.com/docs/page-that-checks-the-embed/', response: null },
  ],
  ```

  `response: null` in an override means "don't intercept this domain for
  this particular link — let it hit the real network."

Only add a mock here once you've confirmed the flaky resource is genuinely
unrelated to the link's own validity (see "Case 5" below for how to confirm
this) — don't reach for this to paper over an actually broken link.

### 3. Add known browser exceptions

Uncaught JS exceptions are already tolerated automatically for any page
outside `cumulocity.com` (see `OWN_DOMAINS` in `cypress/e2e/link-checker.cy.js`)
- a third-party site's own console errors (analytics pixels, chat widgets,
etc.) aren't signal about whether the link pointing to it is valid, so we
don't fail on them regardless of message text. What still matters for those
pages is covered by the test's real assertions: status code, non-empty body,
fragment existence.

`cypress/support/e2e.js` is now only for the rare case of a genuine
**`cumulocity.com`-domain** exception that's confirmed harmless. Before
adding anything here, confirm the error is actually happening on our own
domain - if it's a third-party page, it's already handled and doesn't need
an entry.

Example:

```js
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Some known harmless error on our own docs site')) {
    return false;
  }
});
```

Add new exceptions here only when:

* the error occurs on a `cumulocity.com` page
* the page itself still loads correctly
* the error is unrelated to link validity
* the error is consistently harmless

Do not add real content or navigation failures here.

### 4. Update shortcode resolution

If docs introduce new Hugo shortcodes used inside links, update `Extractlinks.js`.

Specifically, extend the `shortcodeMapping` object.

Example:

```js
const shortcodeMapping = {
  "my-shortcode": "https://example.com"
};
```

Without this, extracted URLs may be incomplete or wrong.

### 5. Update file types treated as non-HTML

If you need to support additional downloadable resource types, update this section in `cypress/e2e/link-checker.cy.js`:

```js
const nonHtmlExtensions = ['.txt', '.json', '.pdf'];
```

Use this when a link points to a file rather than a web page.

## How to handle failing links

When a test fails, first identify the type of failure.

### Case 1: The link is actually broken

Fix the link in the source Markdown file shown in the test output.

The test already includes source file information using:

```js
Cypress.env('sourceFiles', item.files);
```

So the error message should help trace where the link came from.

### Case 2: The link works manually but times out in Cypress

If the site is slow, blocks bots, or is unstable, add it to `excludedLinks` in `cypress/e2e/link-checker.cy.js`.

Add a short comment explaining why.

Example:

```js
// Site blocks automation requests
"https://example.com/protected-page",
```

### Case 3: The page loads but throws harmless JavaScript errors

If this is on a third-party page (anything outside `cumulocity.com`),
nothing to do - it's already tolerated automatically regardless of message
text (see item 3 above). Only add an entry to `cypress/support/e2e.js` if
the error is happening on a **`cumulocity.com`** page:

```js
if (err.message.includes('Some known harmless error on our own docs site')) {
  return false;
}
```

Only do this if the page still loads and the link is valid.

### Case 4: Fragment check fails

If the link contains `#fragment`, verify whether:

* the fragment is correct
* the target page still contains that anchor
* the anchor name has changed
* GitHub adds `user-content-` prefix handling

If the page structure changed, update the source link instead of excluding it.

### Case 5: The page loads but hangs on an unrelated third-party resource

If `cy.visit()` times out waiting for `load`, but the URL itself responds
quickly and correctly (check with `curl -w '%{http_code} %{time_total}'`),
the page it points to is probably pulling in a slow/unreachable third-party
resource (analytics, an embed, a tracking pixel) that blocks `load` even
when it has nothing to do with the link being valid - or the page throws a
console error/uncaught exception unrelated to the link's validity. This is
also the case to reach for when a link fails only in CI and you can't
reproduce it locally at all (different network egress on GitHub Actions
runners than a local machine is a common cause).

Use the workflow's **diagnostics mode** to confirm before mocking anything -
no code changes needed. Dispatch the "Link Checker" workflow manually with:

* `branch` set to the branch the failing link lives on
* `urlsWith` set to a substring that narrows it down to just that URL (or a
  small handful)
* `diagnostics` set to `true`

This logs every network request's start/completion (so a hang shows as a
`START` with no matching `DONE`), plus any `console.error`/`console.warn`
calls and uncaught exceptions from the page - all without changing pass/fail
behavior. Grab the results either from the run's `cypress-log-<branch>`
artifact (uploaded on every run, kept for 8 days) or by grepping the run's
logs for `[DIAGNOSTIC]`.

Once you've identified the exact resource or error, add it to
`known-resource-mocks.cjs` (see item 2 above) rather than excluding the
link.

(For reference, the underlying instrumentation lives in
`cypress/e2e/link-checker.cy.js` behind the `DIAGNOSTICS` flag -
`applyDiagnosticNetworkLogging` and `visitWithDiagnostics` - in case it ever
needs extending, e.g. to capture something beyond network/console activity.)

### Case 6: The target URL itself is intermittently blocked (not a sub-resource)

Easy to confuse with Case 5, but the fix is different, so check which one
you actually have first:

* **Case 5** (`known-resource-mocks.cjs`): the *link's own* response is fine
  - it's some *other* resource the page pulls in that hangs/fails.
* **Case 6** (this case, `excludedLinks`): the link's **own** request/page
  load is what times out or fails - there's no sub-resource to mock, because
  the thing that's blocked is the thing under test.

The telltale sign of Case 6 is *inconsistency across otherwise-identical
runs*: the same URL passes fine on one branch/run and fails completely on
another run at roughly the same time, or passes fast locally/via `curl` but
times out in CI. This pattern showed up for `logback.qos.ch`: in one
historical run, `develop` and `release/y2025` passed it in 2-3s while
`release/y2026` failed all 4 `logback.qos.ch` URLs, each exhausting all 10
retries spaced ~10.3s apart (the exact request timeout, every single
attempt). GitHub Actions assigns a fresh ephemeral IP per job - this pattern
(one job's every single retry fails identically, at exactly the timeout
duration, while a sibling job at the same time is fine) points to
IP-reputation-based blocking on the target site's side, not anything wrong
with our content. Retries don't help here since the block persists for the
runner's whole job lifetime, so a longer timeout or more retries wouldn't
fix it either - the only real fix is `excludedLinks`.

To confirm you have Case 6 rather than Case 5 or a real break:

1. `curl -w '%{http_code} %{time_total}\n' -o /dev/null <url>` - if it's
   fast and correct from outside CI too, that only rules out "genuinely
   broken," not Case 5 vs Case 6.
2. Use diagnostics mode (`branch` + `urlsWith` + `diagnostics=true`) on the
   failing branch to get one real CI-runner data point.
3. **Look at other branches/runs around the same time** in the workflow run
   history (`gh run list --workflow "Link Checker"`, then
   `gh run view <id> --log-failed`) - if the same URL passed cleanly and
   fast on a sibling matrix job in the very same run, that's strong evidence
   you're looking at IP/runner-specific flakiness (Case 6), not a real
   problem in the page's own content or an embedded resource.
4. Check the retry timing in the failed job's log: consistent spacing at
   exactly the configured timeout, on every single attempt, indicates a hard
   per-job block (Case 6). A mix of fast passes and occasional slow/failed
   attempts is more consistent with genuine transient network flakiness.

Only add to `excludedLinks` once you've confirmed there's no specific
sub-resource to mock (Case 5) and no content issue (Case 1/4) - this is the
"nothing else fits" fallback the file's own comment describes it as.

## Recommended maintenance process

When a link-check issue is created:

1. Open the failed workflow run.
2. Check the failed URL.
3. Identify the source Markdown file.
4. If it's not obviously a real broken link/anchor (Case 1/4), don't guess -
   reproduce with evidence rather than pattern-matching on the error text.
   Dispatch the workflow with `branch` + `urlsWith` + `diagnostics=true` on
   the actual failing branch (many of these failures don't reproduce
   locally at all - CI runners have different network egress than a laptop).
5. Decide which case it is (see "How to handle failing links" above for the
   full decision criteria for each):

   * a real broken link or anchor mismatch (Case 1/4)
   * a timeout/block affecting the **target URL itself**, inconsistent
     across sibling branches/runs at the same time (Case 6)
   * a hang caused by an unrelated **sub-resource** on the target page
     (Case 5)
   * a harmless JavaScript exception - only actionable if it's on a
     `cumulocity.com` page (Case 3); everything else is already handled
6. Apply the fix in the correct place:

   * source Markdown content
   * `excludedLinks` in `link-checker.cy.js` (Case 2/6)
   * `known-resource-mocks.cjs` (Case 5)
   * exception handling in `cypress/support/e2e.js` (Case 3, `cumulocity.com` only)
7. Re-run locally to confirm the specific fix.
8. If the fix touched `excludedLinks`, `known-resource-mocks.cjs`, or the
   exception-handling logic (as opposed to a single link's content), run the
   **full, unfiltered** suite at least once (locally if time allows,
   otherwise via CI dispatch with no `urlsWith` filter) before considering
   it safe.
9. Commit and push the fix.

