// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotOnRunFailure: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
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
