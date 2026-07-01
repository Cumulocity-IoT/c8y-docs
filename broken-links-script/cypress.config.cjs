// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotOnRunFailure: false,
  e2e: {
    setupNodeEvents(on, config) {
      // [DIAGNOSTIC] surface per-request timing logged from the test via cy.task
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    retries: {
      runMode: 2, // [DIAGNOSTIC] temporarily lowered from 10 for faster turnaround
      openMode: 0
    },
    chromeWebSecurity: false,
    pageLoadTimeout: 60000, // [DIAGNOSTIC] temporarily raised from 10000 to see if the page eventually loads
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