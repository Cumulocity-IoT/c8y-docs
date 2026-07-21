// cypress.config.js
const { defineConfig } = require("cypress");

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
