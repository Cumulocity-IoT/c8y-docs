describe('Link and Routing Validation - Batching URLs', () => {
  const brokenLinks = [];
  const fragmentErrors = [];
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

  function validateUrl({ url, files }) {

    const unencodedParenthesisPattern = /[()]/;
    if (unencodedParenthesisPattern.test(url)) {
      brokenLinks.push({
        url,
        files,
        status: "Adjust unencoded parentheses",
      });
      return;
    }

    if (url.includes('styleguide.cumulocity.com')) {
      return cy.visit(url, { failOnStatusCode: false })
        .then(() => cy.wait(3000)) 
        .then(() => {
          return cy.document().then((doc) => {
            const element = doc.querySelector('[data-cy="c8y-title--title-outlet"] .text-truncate');
            if (!element) {
              brokenLinks.push({
                url,
                files,  
                status: 'Target view missing [data-cy="c8y-title--title-outlet"] .text-truncate'
              });
            }
          });
        })
    
        .then(() => cy.window())
        .then((win) => {
          const currentUrl = win.location.href;
          const newUrl = currentUrl.includes('?')
            ? `${currentUrl}&modified=true`
            : `${currentUrl}?modified=true`;
          win.history.pushState({}, '', newUrl);
        })
        .then(() => {
          return cy.document().then((doc) => {
            const element = doc.querySelector('[data-cy="c8y-title--title-outlet"] .text-truncate');
            if (!element) {
              brokenLinks.push({
                url,
                files,
                status: 'Target view missing after URL change [data-cy="c8y-title--title-outlet"] .text-truncate'
              });
            }
          });
        })
        .then(() => {
          cy.clearCookies();
          cy.clearLocalStorage();
        });
    }
    else if (url.includes('/api/')) {
      if (url.includes('#')) {
        const [baseUrl, fragment] = url.split('#');
        return cy.visit(url, { failOnStatusCode: false })
          .then(() => cy.get('body'))
          .then(($body) => {
            const expectedHref = `#${fragment}`;
            if ($body.find(`a[href="${expectedHref}"]`).length === 0) {
              brokenLinks.push({
                url,
                files,
                status: `Expected anchor with href "${expectedHref}" not found`
              });
            }
          });
      } else {
        return cy.visit(url, { failOnStatusCode: false })
          .then((response) => {
            if (response.status && response.status !== 200) {
              brokenLinks.push({
                url,
                files,
                status: response.status
              });
            }
          });
      }
    }
    else if (url.includes('#')) {
      const [baseUrl, fragment] = url.split('#');
      return cy.request({ url: baseUrl, failOnStatusCode: false })
        .then((response) => {
          if (response.status !== 200) {
            brokenLinks.push({ url, files, status: response.status });
          } else {
            if (!checkFragmentExists(response.body, fragment)) {
              fragmentErrors.push({ url, files, fragment });
            }
          }
        });
    }
    else {
      return cy.request({ url, failOnStatusCode: false })
        .then((response) => {
          if (response.status !== 200) {
            brokenLinks.push({ url, files, status: response.status });
          }
        });
    }
  }

  before(() => {
    cy.readFile('all_links.json').then((data) => {
      const linkData = data.map(item => ({
        url: item.link,
        files: item.files
      }));
      cy.wrap(linkData).as('links');
    });
  });

  it('should verify all URLs in batches and capture errors independently', function () {
    const linkObjects = this.links;
    expect(linkObjects).to.be.an('array').that.is.not.empty;
    const batchSize = 50;
    const linkBatches = chunkArray(linkObjects, batchSize);
    cy.wrap(linkBatches).each((batch, batchIndex) => {
      cy.log(`Processing batch ${batchIndex + 1} of ${linkBatches.length}`);
      cy.wrap(batch).each((linkObj) => {
        validateUrl(linkObj);
      });
    });
    cy.then(() => {
      let markdownContent = '';

      if (brokenLinks.length > 0) {
        markdownContent += '### :warning: Broken Links or Routing Errors\n\n';
        brokenLinks.forEach((item) => {
          markdownContent += `- **${item.url}** (status: ${item.status})\n`;
          markdownContent += `  - Found in: ${item.files.join(', ')}\n`;
        });
        markdownContent += '\n';
      }

      if (fragmentErrors.length > 0) {
        markdownContent += '### :warning: Incorrect Traditional Fragments\n\n';
        fragmentErrors.forEach((item) => {
          markdownContent += `- **${item.url}** (fragment "${item.fragment}" not found)\n`;
          markdownContent += `  - Found in: ${item.files.join(', ')}\n`;
        });
        markdownContent += '\n';
      }

      if (!markdownContent) {
        markdownContent = '### :white_check_mark: No broken links found.\n';
      }

      cy.writeFile('broken_links_report.md', markdownContent);
    });
  });
});
