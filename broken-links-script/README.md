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

* every Monday at 06:00 UTC
* manually using `workflow_dispatch`

### Branches checked

The workflow runs against this matrix:

* `develop`
* `release/y2025`
* `release/y2026`

### What happens in CI

For each branch, the workflow:

1. checks out the branch
2. installs dependencies
3. runs the broken-link test suite
4. creates a branch-specific label if needed
5. creates a GitHub issue if the test fails

Example issue labels:

```text
broken-link-develop
broken-link-release/y2025
broken-link-release/y2026
```

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

Some third-party sites throw JavaScript errors that do not actually mean the page is broken.

Those global exceptions should be added in `cypress/support/e2e.js`.

This file is the right place for known harmless `uncaught:exception` cases.

Example:

```js
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Some known harmless error')) {
    return false;
  }
});
```

Add new exceptions here only when:

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

Add the error pattern to `cypress/support/e2e.js`.

Example:

```js
if (err.message.includes('jQuery is not defined')) {
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
when it has nothing to do with the link being valid.

To confirm before mocking anything, temporarily add a per-request logger
scoped to the target host in the relevant branch of `link-checker.cy.js`,
run it filtered to just that URL (`node run.cjs --urls-with=<substring>`,
or the workflow's `urlsWith` dispatch input to reproduce on an actual
runner), and look for a request that logs a start but never a completion:

```js
cy.intercept(`${new URL(url).origin}/**`, (req) => {
  const start = Date.now();
  diagnosticLog.push(`START ${req.method} ${req.url}`);
  req.continue((res) => {
    diagnosticLog.push(`DONE ${res.statusCode} ${Date.now() - start}ms ${req.url}`);
  });
});
```

(`cy.task()`/`cy.log()` can't be called directly inside the intercept
callback — push to a plain array and flush it via `cy.task()` in
`afterEach` instead.) Once you've identified the exact resource, add it to
`known-resource-mocks.cjs` (see item 2 above) rather than excluding the
link — remove the temporary logger afterwards.

## Recommended maintenance process

When a link-check issue is created:

1. Open the failed workflow run.
2. Check the failed URL.
3. Identify the source Markdown file.
4. Decide whether it is:

   * a real broken link
   * a timeout or anti-bot case affecting the link itself
   * a hang caused by an unrelated third-party resource on the target page
   * a harmless JavaScript exception
5. Apply the fix in the correct place:

   * source Markdown content
   * `excludedLinks` in `link-checker.cy.js`
   * `known-resource-mocks.cjs`
   * exception handling in `cypress/support/e2e.js`
6. Re-run locally.
7. Commit and push the fix.

