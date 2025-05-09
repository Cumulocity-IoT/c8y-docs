const urls = require('../../all_links.json');

describe('Link and Routing Validation - Individual URL Checks', () => {
  let completedTests = 0;
  const totalTests = urls.length;

  const checkFragmentExists = (htmlContent, fragment) => {
    const escRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escFragment = escRegExp(fragment);
    const regexId = new RegExp(`id=["']${escFragment}["']`);
    return regexId.test(htmlContent);
  };

  const expectFragmentExists = (htmlContent, fragment) => {
    expect(checkFragmentExists(htmlContent, fragment), `Fragment "${fragment}" should exist in HTML`).to.be.true;
  };

  const expectNoUnencodedParentheses = (url) => {
    cy.wrap(url).should('not.match', /[()]/, `URL should not contain unencoded parentheses: ${url}`);
  };

  Cypress.on('fail', (error) => {
    const sourceFiles = Cypress.env('sourceFiles');
    if (sourceFiles) {
      error.message += `\n\nThis URL was used in the following files:\n - ${sourceFiles.join('\n -')}`;
    }
    throw error;
  });

  urls.forEach((item) => {
    it(`should validate URL: ${item.link}`, () => {
      const url = item.link;
      const fragment = url.includes('#') ? url.split('#').slice(-1)[0] : null;
      const isCodexPage = url.includes('codex/#/');
      const isApiPage = url.includes('/api/');

      Cypress.env('sourceFiles', item.files);
      expectNoUnencodedParentheses(url);

      if (isCodexPage) {
        cy.visit(url, { timeout: 20000 });
      
        // Check that the page loaded and isn't a 404
        cy.get('[data-cy="c8y-title--title-outlet"] .text-truncate', { timeout: 20000 })
          .invoke('text')
          .should('not.be.empty')
      
        // Validate the URL matches exactly what was provided (including fragment)
        cy.url().should('eq', url);
      
        if (fragment) {
          // Check if the fragment is a route (starts with '/') or an actual DOM ID
          if (fragment.startsWith('/')) {
            // For route-like fragments, validate the URL hash
            cy.location('hash').should('eq', `#${fragment}`, `URL hash should match the fragment: #${fragment}`);
          } else {
            // For actual DOM IDs, check if the element exists
            cy.get(`#${fragment}`, { timeout: 10000 })
              .should('exist', `Fragment "${fragment}" does not exist on the page`)
              .then(() => {
                // Log available IDs for debugging
                cy.document().then((doc) => {
                  const ids = Array.from(doc.querySelectorAll('[id]')).map((el) => el.id);
                  cy.log(`Available IDs on the page:\n${ids.join('\n')}`);
                });
              });
          }
        }
      }
      
      else if (isApiPage) {
        cy.visit(url, { timeout: 20000 });

        if (fragment) {
          cy.get(`[id="${fragment}"]`, { timeout: 10000 }).should('exist', `Element with ID "${fragment}" should exist`);
        }
      }

      else if (url.includes('github.com')) {
        cy.visit(url, { timeout: 20000 });
      
        if (fragment) {
          const normalizedFragment = fragment.toLowerCase().replace(/[^\w\-]+/g, '-').replace(/^-+|-+$/g, '');
          cy.document().then((doc) => {
            const anchorExists = Array.from(doc.querySelectorAll('a'))
              .some(a => a.getAttribute('href') === `#${normalizedFragment}`);
            
            expect(anchorExists, `Fragment "#${normalizedFragment}" should exist in href attribute of an <a> tag`).to.be.true;
            const allFragments = Array.from(doc.querySelectorAll('a'))
              .map(a => a.getAttribute('href'))
              .filter(href => href && href.startsWith('#'));
            cy.log(`Available fragments on page:\n${allFragments.join('\n')}`);
          });
        }
      }
    
      else if (fragment) {
        cy.visit(url, { timeout: 20000 });
      
        cy.document().then((doc) => {
          const escRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const escFragment = escRegExp(fragment);
          const regexId = new RegExp(`id=["']${escFragment}["']`);
      
          const html = doc.documentElement.innerHTML;
          const found = regexId.test(html);
      
          expect(found, `Fragment "${fragment}" should exist in HTML as an id`).to.be.true;
      
          // Optional: log all available IDs
          const ids = Array.from(doc.querySelectorAll('[id]')).map(el => el.id);
          cy.log(`Available IDs:\n${ids.join('\n')}`);
        });
      }
      
      else {
        cy.visit(url, { timeout: 20000 });
      
        // Optional: confirm page is not blank or 404
        cy.document().its('body').should('not.be.empty');
      }
      
      completedTests++;
    });
  });

  afterEach(() => {
    cy.log(`Progress: ${completedTests}/${totalTests}`);
  });
});
