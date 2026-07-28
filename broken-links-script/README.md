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
├── config.cjs
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
| `diagnostics` | Verbose network + console logging (see "Investigating and fixing a failing run" below) |

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

All repo/site-specific customization - own domains, excluded links, and
third-party resource mocks - lives in `config.cjs`. The mechanisms that
consume it (`cypress/e2e/link-checker.cy.js`) are meant to stay generic, so
adapting this checker for a different repo should mostly mean editing
`config.cjs`, not the test file itself.

### 1. Add or update timeout or excluded links

If a link is valid in a browser but fails in automation because of:

* anti-bot protection
* timeout
* rate limiting
* access restrictions
* unstable third-party behavior

add it to the `excludedLinks` array in `config.cjs`.

Example:

```js
excludedLinks: [
  "https://example.com/some-page",
]
```

You can also leave a short reason above it:

```js
// Timeout link
"https://example.com/some-page",
```

Use this for links that should be skipped completely.

### 2. Mock a known-problematic third-party resource

Sometimes the link under test is fine, but the page it points to loads a
third-party resource (analytics, an embedded widget, a tracking pixel, etc.)
that is unreachable or hangs specifically from CI runners, blocking the
browser's `load` event and causing `cy.visit()` to time out. This is
different from `excludedLinks`: the link itself is valid, only some
incidental sub-resource the page pulls in is the problem.

For this case, add an entry to the `resourceMocks` array in `config.cjs`
instead of excluding the link. Every entry there is applied automatically before every
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
unrelated to the link's own validity (see "Investigating and fixing a
failing run" below, or the `fix-broken-links` skill, for how to confirm
this) — don't reach for this to paper over an actually broken link.

### 3. Add known browser exceptions

Uncaught JS exceptions are already tolerated automatically for any page
outside the domains listed in `ownDomains` in `config.cjs`
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

## Investigating and fixing a failing run

When a link-check issue is filed or a run fails, the failure needs to be
triaged (is the link actually broken? does it just fail in CI? is a
third-party page throwing a harmless error?) before deciding where to apply
a fix - in the Markdown content, `excludedLinks`, `resourceMocks`, the
Cypress exception list, or the checker scripts themselves.

If you're working with Claude Code, the `fix-broken-links` skill
(`.claude/skills/fix-broken-links/SKILL.md`) automates this: point it at a
workflow run (or let it infer one from the current branch/PR/issue) and it
will fetch the run's logs, triage each failure, apply the appropriate fix,
and open a PR.

To do it by hand, use the workflow's **diagnostics mode** to get real
evidence instead of guessing from error text - dispatch "Link Checker"
manually with `branch` (the failing branch), `urlsWith` (a substring
narrowing it to the failing URL(s)), and `diagnostics: true`. This logs:

* every network request's start/completion, for both browser sub-resources
  during `cy.visit()` and the checker's own `cy.request()` calls (so a hang
  shows as a `network-start`/`request-start` entry with no matching `-done`)
* console errors/uncaught exceptions from the visited page
* the runner's own egress IP, once per job - useful for confirming an
  IP-reputation block (a failing branch's IP differs from a sibling
  branch's, or matches a previously-blocked IP)

without changing pass/fail behavior. Each diagnostic entry is logged as its
own line, prefixed `[DIAGNOSTIC]` and followed by a JSON object (type,
url/link, timestamps, status codes, etc.) - pull the results from the run's
`cypress-log-<branch>` artifact (kept 8 days), or extract and parse them
locally:

```bash
grep '\[DIAGNOSTIC\]' cypress-output.log | sed 's/^.*\[DIAGNOSTIC\] //' | jq -s '.'
```

