// cypress.config.js
const fs = require("fs");
const path = require("path");
const { defineConfig } = require("cypress");

const RESULT_FILE = path.join(__dirname, "link-check-result.json");
const TITLE_PREFIX = "should validate URL: ";

// Writes link-check-result.json at the end of a run: totals plus every
// failed link, in the same {link, files} shape as all_links.json so that
// `run.cjs --recheck` can feed them straight back in. The workflow re-checks
// these on a fresh runner, and summarize-failures.cjs reports from this file.
// `completed: false` (or no file at all) means the run itself broke, which
// must never be mistaken for "no broken links".
function writeRunResult(results) {
  if (!results || results.status === "failed") {
    const error = (results && results.message) || "Cypress run failed";
    fs.writeFileSync(RESULT_FILE, JSON.stringify({ completed: false, error }, null, 2));
    return;
  }

  const allLinks = JSON.parse(fs.readFileSync(path.join(__dirname, "all_links.json"), "utf8"));
  const filesByLink = new Map(allLinks.map((item) => [item.link, item.files]));

  const failed = [];
  const runErrors = [];
  for (const run of results.runs) {
    if (run.error) runErrors.push(run.error);
    for (const test of run.tests) {
      if (test.state !== "failed") continue;
      const title = test.title[test.title.length - 1];
      const link = title.startsWith(TITLE_PREFIX) ? title.slice(TITLE_PREFIX.length) : title;
      const error = (test.displayError || "").split("\n")[0].replace(/^\w*Error: /, "");
      failed.push({ link, files: filesByLink.get(link) || [], error });
    }
  }

  fs.writeFileSync(RESULT_FILE, JSON.stringify({
    completed: runErrors.length === 0,
    error: runErrors.length ? runErrors.join("\n") : undefined,
    totalTests: results.totalTests,
    totalPassed: results.totalPassed,
    totalFailed: results.totalFailed,
    totalPending: results.totalPending,
    failed,
  }, null, 2));
}

module.exports = defineConfig({
  screenshotOnRunFailure: false,
  e2e: {
    setupNodeEvents(on, config) {
      // Surfaces cy.task('log', ...) calls to the terminal - used by
      // diagnostics mode to print request/console logging from the browser.
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      on('after:run', writeRunResult);

      // Diagnostics mode: fewer retries and a longer page load timeout give
      // faster, more informative single-shot runs when investigating one
      // specific failure, instead of burning through 10 retries at 10s each.
      // Cypress coerces --env true/false into real booleans, but env vars
      // set another way could still arrive as the string "true" - handle both.
      if (config.env && String(config.env.diagnostics) === 'true') {
        config.pageLoadTimeout = 60000;
        config.retries = { runMode: 2, openMode: 0 };
      }

      return config;
    },
    retries: {
      runMode: 10,
      openMode: 0
    },
    chromeWebSecurity: false,
    pageLoadTimeout: 10000,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    execTimeout: 10000,
    taskTimeout: 10000,
    numTestsKeptInMemory: 0,
    experimentalMemoryManagement: true,
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});
