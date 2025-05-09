// cypress/support/e2e.js

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// This is a placeholder file that Cypress requires to run
// You can add custom commands, global overrides, or other configuration here
Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('jQuery is not defined')) {
      return false;
    }
  });
  