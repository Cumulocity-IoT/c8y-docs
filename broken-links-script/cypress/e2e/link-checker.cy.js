const urls = require('../../all_links.json');
describe('Link and Routing Validation - Individual URL Checks', () => {
  const brokenLinks = [];
  const fragmentErrors = [];
  let completedTests = 0;
  let totalTests = 0;

  const checkFragmentExists = (htmlContent, fragment) => {
    const variants = [
      fragment,
      fragment.replace(/\//g, '-'),
      fragment.replace(/\//g, '_')
    ];
    return variants.some((variant) => {
      const regexId = new RegExp(`id=["']${variant}["']`);
      const regexHref = new RegExp(`href=["']#${variant}["']`);
      return regexId.test(htmlContent) || regexHref.test(htmlContent);
    });
  };

  const validateUrl = (item) => {
    const url = item.link;
    const unencodedParenthesisPattern = /[()]/;
    if (unencodedParenthesisPattern.test(url)) {
      if (!brokenLinks.some(link => link.url === url)) {
        brokenLinks.push({ url, files: item.files, status: "Adjust unencoded parentheses" });
      }
      return true;
    }
    return false;
  };

  totalTests = urls.length;

  urls.forEach((item) => {
    it(`should validate URL: ${item.link}`, () => {
      cy.log(`Starting test for URL: ${item.link}`);
      let url = item.link;
      let baseUrl = url;
      let fragment = null;
      let isCodexPage = false;
      let isFragmentCheckRequired = false;

      if (validateUrl(item)) {
        expect(validateUrl(item)).to.be.false;
        completedTests++;
        return;
      }

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
            const targetElement = $el[0];
            if (!targetElement) {
              brokenLinks.push({
                url,
                files: item.files, 
                status: 'Target view missing [data-cy="c8y-title--title-outlet"] .text-truncate'
              });
              expect(targetElement, 'Target element should exist').to.exist;
            } else if (isFragmentCheckRequired && fragment) {
              if (!checkFragmentExists(doc.body.innerHTML, fragment)) {
                fragmentErrors.push({ url, files: item.files, fragment });
                expect(checkFragmentExists(doc.body.innerHTML, fragment), 'Fragment should exist in the page').to.be.true;
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
            if (!checkFragmentExists(response.body, fragment)) {
              fragmentErrors.push({ url, files: item.files, fragment }); 
              expect(checkFragmentExists(response.body, fragment), 'Fragment should exist in the response body').to.be.true;
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

  after(() => {
    cy.log(`Final: completedTests: ${completedTests}, totalTests: ${totalTests}`);
    
    let markdownContent = '';
    const parenthesesErrors = brokenLinks.filter(item => item.status === "Adjust unencoded parentheses");
    if (parenthesesErrors.length > 0) {
      markdownContent += '### :warning: Unencoded Parentheses\n\n';
      parenthesesErrors.forEach((item) => {
        markdownContent += `- **${item.url}** (status: ${item.status})\n`;
        markdownContent += `  - Files: ${item.files.join(', ')}\n`;
      });
      markdownContent += '\n';
    }

    const otherErrors = [
      ...brokenLinks.filter(item => item.status !== "Adjust unencoded parentheses").map((item) => ({
        url: item.url,
        files: item.files, 
        message: `status: ${item.status}`
      })),
      ...fragmentErrors.map((item) => ({
        url: item.url,
        files: item.files, 
        message: `fragment "${item.fragment}" not found`
      }))
    ];
    if (otherErrors.length > 0) {
      markdownContent += '### :warning: Broken Links\n\n';
      otherErrors.forEach((item) => {
        markdownContent += `- **${item.url}** (${item.message})\n`;
        markdownContent += `  - Files: ${item.files.join(', ')}\n`;
      });
      markdownContent += '\n';
    }

    if (!markdownContent) {
      markdownContent = '### :white_check_mark: No issues found.\n';
    }

    cy.writeFile('broken_links_report.md', markdownContent, { flag: 'w' })
      .then(() => {
        cy.log('Broken links report generated successfully');
      });
  });
});