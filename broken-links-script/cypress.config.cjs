// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotOnRunFailure: false,
  e2e: {
    setupNodeEvents(on, config) {
      const { exec } = require("child_process");

      on("task", {
        curlRequest(url) {
          return new Promise((resolve) => {
            exec(`curl -sSL -w "\\n%{http_code}" "${url}"`, (error, stdout, stderr) => {

              if (error) {
                resolve({
                  status: error.code || 1,
                  content: stderr || error.message
                });
                return;
              }

              const match = stdout.match(/\n(\d{3})$/);

              const status = match
                ? parseInt(match[1], 10)
                : 0;

              const content = match
                ? stdout.slice(0, match.index)
                : stdout;

              resolve({
                status,
                content
              });

            });
          });
        }
      });

    },
    retries: {
      runMode: 4,
      openMode: 0   
    },
    chromeWebSecurity: false, 
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    execTimeout: 30000,
    taskTimeout: 30000,
    numTestsKeptInMemory: 0,
    experimentalMemoryManagement: true,
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});