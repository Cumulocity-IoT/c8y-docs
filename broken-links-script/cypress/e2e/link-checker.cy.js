const urls = require('../../all_links.json');

describe('Link and Routing Validation - Individual URL Checks', () => {
  let completedTests = 0;
  const totalTests = urls.length;


  const escRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const expectFragmentExists = (htmlContent, fragment) => {
    const escFragment = escRegExp(fragment);
    const regex = new RegExp(`(id=["']${escFragment}["']|name=["']${escFragment}["'])`);
    const exists = regex.test(htmlContent);
    expect(exists, `Fragment "${fragment}" should exist in HTML`).to.be.true;
  };

  const expectNoUnencodedParentheses = (url) => {
    cy.wrap(url).should('not.match', /[()]/, `URL should not contain unencoded parentheses: ${url}`);
  };

  const checkGithubFragment = (fragment) => {
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
  };

  const checkRegularFragment = (fragment) => {
    cy.document().then((doc) => {
      const html = doc.documentElement.innerHTML;
      expectFragmentExists(html, fragment);
      const ids = Array.from(doc.querySelectorAll('[id]')).map(el => el.id);
      const names = Array.from(doc.querySelectorAll('a[name]')).map(a => a.getAttribute('name'));
      const allFragments = [...ids, ...names];
      cy.log(`Available fragments on page:\n${allFragments.join('\n')}`);
    });
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
      const isGithubPage = url.includes('github.com');
      const nonHtmlExtensions = ['.txt','.json','.pdf','.zip','.csv','.xml','.not','.bin','.dat','.tar','.gz','.rar','.xsd','.yaml','pot'];

      const hasNonHtmlExtension = nonHtmlExtensions.some(ext => url.endsWith(ext));
      const isNonHtmlResource = hasNonHtmlExtension || url.includes('/files/') || url.includes('/downloads/');
  
      Cypress.env('sourceFiles', item.files);
      expectNoUnencodedParentheses(url);
  
      if (isNonHtmlResource) {
        cy.log(`Validating non-HTML resource: ${url}`);
        cy.request({
          url: url,
          failOnStatusCode: false 
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 304]);
  
          if (url.endsWith('.json')) {
            expect(response.body).to.be.an('object');
          }
        });
        completedTests++;
        return;
      }

      if (isCodexPage) {
        cy.visit(url, { timeout: 20000 });
      
        cy.get('[data-cy="c8y-title--title-outlet"] .text-truncate', { timeout: 20000 })
          .invoke('text')
          .should('not.be.empty')
      
        cy.url().should('eq', url);
      
        if (fragment) {
          if (fragment.startsWith('/')) {
            cy.location('hash').should('eq', `#${fragment}`, `URL hash should match the fragment: #${fragment}`);
          } else {
            cy.get(`#${fragment}`, { timeout: 10000 })
              .should('exist', `Fragment "${fragment}" does not exist on the page`)
              .then(() => {
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
          cy.get(`[id="${fragment}"]`, { timeout: 10000 }).should('exist');
        }
      }
      else if (isGithubPage && fragment) {
        cy.visit(url, { timeout: 20000 });
        checkGithubFragment(fragment);
      }
      else if (fragment) {
        cy.visit(url, { timeout: 20000 });
        checkRegularFragment(fragment);
      }
      else {
        cy.visit(url, { timeout: 20000 });
        cy.document().its('body').should('not.be.empty');
      }
      
      completedTests++;
    });
  });

  afterEach(() => {
    cy.log(`Progress: ${completedTests}/${totalTests}`);
  });
});