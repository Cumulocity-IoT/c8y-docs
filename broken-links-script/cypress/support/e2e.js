// cypress/support/e2e.js

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// This is a placeholder file that Cypress requires to run
// You can add custom commands, global overrides, or other configuration here

// Third-party page errors (analytics pixels, chat widgets, etc.) are now
// tolerated automatically by domain - see the OWN_DOMAINS check in
// cypress/e2e/link-checker.cy.js, which suppresses uncaught exceptions for
// any page outside cumulocity.com. This handler is for the rare remaining
// case: a genuine cumulocity.com-domain exception that's confirmed to be
// known-harmless (verify it's actually happening on our own domain before
// adding an entry here - the whole point is to keep this list small).
Cypress.on('uncaught:exception', (err) => {
  // cumulocity.com/apama/docs/.../ApamaDoc/ is an old javadoc-style
  // frameset page whose legacy frame-navigation script throws this in a
  // modern browser - unrelated to link validity, page still loads fine.
  // Confirmed needed via a full-suite regression run after removing the
  // rest of this file's previous allowlist (see PR history).
  if (err.message.includes('top.loadFrames is not a function')) {
    return false;
  }
});
