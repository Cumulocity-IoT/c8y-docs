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
    if (err.message.includes('folderIndex is not defined')) {
      return false;
    }
    if (err.message.includes('top.loadFrames is not a function')) {
      return false;
    }
    if (err.message.includes('ResizeObserver loop completed with undelivered notifications.')) {
      return false;
    }
    if (err.message.includes('gd')) {
      return false;
    }
    if (err.message.includes("Cannot read properties of undefined (reading 'renderer')")) {
      return false;
    }
    if (err.message.includes("Cannot read properties of null (reading '__k')")) {
      return false;
    }
    if (err.message.includes("Cannot set properties of null (setting 'onfocus')")) {
      return false;
    }
    if (err.message.includes('No ad placements found.')) {
      return false;
    }
    if (err.message.includes("Cannot read properties of undefined (reading 'TenantFeatures')")) {
      return false;
    }
    if (err.message.includes("jira/featureflags/feature-manager missing jira/util/top-same-origin-window")) {
      return false;
    }
    if (err.message.includes("Cannot read properties of undefined (reading 'oSort')")) {
      return false;
    }
    if (err.message.includes("Cannot read properties of undefined (reading 'split')")) {
      return false;
    } 
    if (err.message.includes("Error: socket hang up")) {
      return false;
    }
    if (err.message.includes("Cannot read properties of null (reading 'setAttribute')")) {
      return false;
    }
    if (err.message.includes("Identifier 'LocalStorageUtil' has already been declared")) {
      return false;
    }
    if (err.message.includes("$(...).tooltip is not a function")) {
      return false;
    }
    if (err.message.includes("No key found. SDK can not be initialized")) {
      return false;
    }

  });
  