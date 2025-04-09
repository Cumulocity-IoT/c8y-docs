const urls = require('../../all_links.json');
describe('Link and Routing Validation - Individual URL Checks', () => {
  const brokenLinks = [];
  const fragmentErrors = [];
  let completedTests = 0;
  let totalTests = 0;

  const checkFragmentExists = (htmlContent, fragment) => {
    const escRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escFragment = escRegExp(fragment);
  
    const regexId = new RegExp(`id=["']${escFragment}["']`);
    if (fragment.includes('/')) {
      return regexId.test(htmlContent);
    }
    const regexHref = new RegExp(`href=["']#${escFragment}["']`);
    return regexId.test(htmlContent) || regexHref.test(htmlContent);
  };

  // New helper function as per feedback
  const expectFragmentExists = (htmlContent, fragment) => {
    if (!checkFragmentExists(htmlContent, fragment)) {
      throw new Error(`Fragment "${fragment}" should exist in the page but was not found.`);
    }
  };

  const expectValidUrl = (url) => {
    const unencodedParenthesisPattern = /[()]/;
    if (unencodedParenthesisPattern.test(url)) {
      throw Error(`Unencoded parentheses in URL: ${url}`);
    }
  };

  Cypress.on('fail', (error) => {
    const sourceFiles = Cypress.env('sourceFiles');
  
    if (sourceFiles) {
      const sourceFilesList = `This URL was used in the following files:\n- ${sourceFiles.join('\n -')}`;
      error.message += `\n\n${sourceFilesList}`;
    }

    throw error;
  });

  totalTests = urls.length;

  urls.forEach((item) => {
    it(`should validate URL: ${item.link}`, () => {
      Cypress.env('sourceFiles', item.files);
      cy.log(`Starting test for URL: ${item.link}`);
      let url = item.link;
      let baseUrl = url;
      let fragment = null;
      let isCodexPage = false;
      let isFragmentCheckRequired = false;

      expectValidUrl(url);

      if (url.includes('#')) {
        const hashParts = url.split('#');
        if (url.includes('codex/#/')) {
          baseUrl = hashParts.slice(0, -1).join('#');
          if (hashParts.length > 2) {
            fragment = hashParts[hashParts.length - 1];
            isFragmentCheckRequired = true;
          }
          isCodexPage = true;
        } else {
          baseUrl = hashParts[0];
          fragment = hashParts[1];
          isFragmentCheckRequired = true;
        }
      }

      if (isCodexPage) {
        cy.visit(baseUrl, { failOnStatusCode: false, timeout: 10000 });
        cy.get('[data-cy="c8y-title--title-outlet"] .text-truncate', { timeout: 10000 }).then(($el) => {
          cy.document().then((doc) => {
            if (isFragmentCheckRequired && fragment) {
              // Simplified using expectFragmentExists as per feedback
              try {
                expectFragmentExists(doc.body.innerHTML, fragment);
              } catch (error) {
                fragmentErrors.push({ url, files: item.files, fragment });
                throw error; // Re-throw to fail the test
              }
            }
            completedTests++;
          });
        });
      } else if (url.includes('/api/')) {
        if (url.includes('#')) {
          const [baseUrl, fragment] = url.split('#');
          cy.visit(url, { failOnStatusCode: false, timeout: 10000 }).then(() => {
            cy.get('body').then(($body) => {
              const expectedHref = `#${fragment}`;
              if ($body.find(`a[href="${expectedHref}"]`).length === 0) {
                brokenLinks.push({
                  url,
                  files: item.files, 
                  status: `Expected anchor with href "${expectedHref}" not found`
                });
                expect($body.find(`a[href="${expectedHref}"]`).length, 'Anchor with expected href should exist').to.be.greaterThan(0);
              }
              completedTests++;
            });
          });
        } else {
          cy.request({ url, failOnStatusCode: false, timeout: 5000 }).then((response) => {
            if (response.status && response.status !== 200) {
              brokenLinks.push({ url, files: item.files, status: response.status }); 
              expect(response.status, 'Response status should be 200').to.equal(200);
            }
            completedTests++;
          });
        }
      } else if (url.includes('#')) {
        const [baseUrl, fragment] = url.split('#');
        cy.request({ url: baseUrl, failOnStatusCode: false, timeout: 5000 }).then((response) => {
          if (response.status !== 200) {
            brokenLinks.push({ url, files: item.files, status: response.status }); 
            expect(response.status, 'Response status should be 200').to.equal(200);
          } else {
            try {
              expectFragmentExists(response.body, fragment);
            } catch (error) {
              fragmentErrors.push({ url, files: item.files, fragment });
              throw error; 
            }
          }
          completedTests++;
        });
      } else {
        cy.request({ url, failOnStatusCode: false, timeout: 5000 }).then((response) => {
          if (response.status !== 200) {
            brokenLinks.push({ url, files: item.files, status: response.status }); 
            expect(response.status, 'Response status should be 200').to.equal(200);
          }
          completedTests++;
        });
      }
      cy.log(`Finished test for URL: ${item.link}`);
    });
  });

  afterEach(() => {
    cy.log(`Current progress: ${completedTests}/${totalTests}`);
  });
});