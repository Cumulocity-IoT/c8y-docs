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

### 2. Add known browser exceptions

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

### 3. Update shortcode resolution

If docs introduce new Hugo shortcodes used inside links, update `Extractlinks.js`.

Specifically, extend the `shortcodeMapping` object.

Example:

```js
const shortcodeMapping = {
  "my-shortcode": "https://example.com"
};
```

Without this, extracted URLs may be incomplete or wrong.

### 4. Update file types treated as non-HTML

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

## Recommended maintenance process

When a link-check issue is created:

1. Open the failed workflow run.
2. Check the failed URL.
3. Identify the source Markdown file.
4. Decide whether it is:

   * a real broken link
   * a timeout or anti-bot case
   * a harmless JavaScript exception
5. Apply the fix in the correct place:

   * source Markdown content
   * `excludedLinks` in `link-checker.cy.js`
   * exception handling in `cypress/support/e2e.js`
6. Re-run locally.
7. Commit and push the fix.

