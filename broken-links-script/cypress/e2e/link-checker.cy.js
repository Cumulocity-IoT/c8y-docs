describe('Link and Routing Validation - Batching URLs', () => {
  const brokenLinks = [];
  const fragmentErrors = [];

  before(() => {
    cy.readFile('all_links.json').then((data) => {
      cy.wrap(data).as('urls');
    });
  });

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

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const validateUrl = (item) => {
    const url = item.link;
    const files = item.files;
    const unencodedParenthesisPattern = /[()]/;
    if (unencodedParenthesisPattern.test(url)) {
      if (!brokenLinks.some(link => link.url === url)) {
        brokenLinks.push({ url, files, status: "Adjust unencoded parentheses" });
      }
      return true;
    }
    return false;
  };

  it('should verify all URLs in batches and capture errors without stopping', function () {
    const urls = this.urls;
    expect(urls).to.be.an('array').that.is.not.empty;
    const batchSize = 300;
    const urlBatches = chunkArray(urls, batchSize);

    cy.wrap(urlBatches).each((batch, batchIndex) => {
      cy.log(`Processing batch ${batchIndex + 1} of ${urlBatches.length}`);

      cy.wrap(batch).each((item) => {
        let url = item.link;
        let baseUrl = url;
        let fragment = null;
        let isCodexPage = false;
        let isFragmentCheckRequired = false;

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
          cy.visit(baseUrl, { failOnStatusCode: false }).then(() => {
            cy.wait(5000);
            cy.document().then((doc) => {
              const targetElement = doc.querySelector('[data-cy="c8y-title--title-outlet"] .text-truncate');

              if (!targetElement) {
                brokenLinks.push({
                  url,
                  status: 'Target view missing [data-cy="c8y-title--title-outlet"] .text-truncate'
                });
              } else if (isFragmentCheckRequired && fragment) {
                if (!checkFragmentExists(doc.body.innerHTML, fragment)) {
                  fragmentErrors.push({ url, fragment });
                }
              }
            });
          });

        } else if (url.includes('/api/')) {
          if (url.includes('#')) {
            const [baseUrl, fragment] = url.split('#');
            cy.visit(url, { failOnStatusCode: false }).then(() => {
              cy.get('body').then(($body) => {
                const expectedHref = `#${fragment}`;
                if ($body.find(`a[href="${expectedHref}"]`).length === 0) {
                  brokenLinks.push({
                    url,
                    status: `Expected anchor with href "${expectedHref}" not found`
                  });
                }
              });
            });
          } else {
            cy.visit(url, { failOnStatusCode: false }).then((response) => {
              if (response.status && response.status !== 200) {
                brokenLinks.push({ url, status: response.status });
              }
            });
          }
        } else if (url.includes('#')) {
          const [baseUrl, fragment] = url.split('#');
          cy.request({ url: baseUrl, failOnStatusCode: false }).then((response) => {
            if (response.status !== 200) {
              brokenLinks.push({ url, status: response.status });
            } else {
              if (!checkFragmentExists(response.body, fragment)) {
                fragmentErrors.push({ url, fragment });
              }
            }
          });
        } else {
          cy.request({ url, failOnStatusCode: false }).then((response) => {
            if (response.status !== 200) {
              brokenLinks.push({ url, status: response.status });
            }
          });
        }
      });
    });

    cy.then(() => {
      let markdownContent = '';
      
      // Process errors for unencoded parentheses
      const parenthesesErrors = brokenLinks.filter(item => item.status === "Adjust unencoded parentheses");
      if (parenthesesErrors.length > 0) {
        markdownContent += '### :warning: Unencoded Parentheses\n\n';
        parenthesesErrors.forEach((item) => {
          const filesText = item.files ? ` (files: ${item.files.join(', ')})` : '';
          markdownContent += `- **${item.url}**${filesText} (status: ${item.status})\n`;
        });
        markdownContent += '\n';
      }
      
      // Combine other broken links and fragment errors
      const otherErrors = [
        ...brokenLinks.filter(item => item.status !== "Adjust unencoded parentheses").map((item) => ({
          url: item.url,
          message: `status: ${item.status}`,
          files: item.files
        })),
        ...fragmentErrors.map((item) => ({
          url: item.url,
          message: `fragment "${item.fragment}" not found`
        }))
      ];
      
      if (otherErrors.length > 0) {
        markdownContent += '### :warning: Broken Links\n\n';
        otherErrors.forEach((item) => {
          const filesText = item.files ? ` (files: ${item.files.join(', ')})` : '';
          markdownContent += `- **${item.url}**${filesText} (${item.message})\n`;
        });
        markdownContent += '\n';
      }
      
      if (!markdownContent) {
        markdownContent = '### :white_check_mark: No issues found.\n';
      }
      
      cy.writeFile('broken_links_report.md', markdownContent);
    });
    
  });
});