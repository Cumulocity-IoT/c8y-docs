const allUrls = require('../../all_links.json');

describe('Link and Routing Validation - Individual URL Checks', () => {
  const urlsWith = Cypress.env('urlsWith') || null;
  const urls = urlsWith
    ? allUrls.filter(item => item.link.includes(urlsWith))
    : allUrls;

  let completedTests = 0;
  const totalTests = urls.length;
  let diagnosticLog = []; // [DIAGNOSTIC]

  /**
   * Links to skip during validation.
   * Each entry is either an exact URL string or a RegExp that is tested against the link.
   * Add entries here for links that are known to fail due to anti-bot protection, timeouts,
   * or other external factors unrelated to broken links in the documentation.
   *
   * @type {Array<string|RegExp>}
   */
  const excludedLinks = [
    // MathWorks URL uses anti-bot protection, Cypress cannot reliably load it
    "https://de.mathworks.com/help/predmaint/ug/remaining-useful-life-estimation-using-convolutional-neural-network.html",

    // Medium blog uses anti-bot protection, Cypress cannot reliably load it
    "https://medium.com/@polanitzer/prediction-of-remaining-useful-life-of-an-engine-based-on-sensors-building-a-random-forest-in-ffad82c8a1c6",
    
    // Links from opentelemetry.io always time out although they load fine in a browser
    /https:\/\/opentelemetry.io\//,

    // Timeout links
    "https://openjdk.org/jeps/252",

    // latlong.net fails to load in Cypress (getting 403)
    "https://www.latlong.net/",
  ];


  const expectFragmentExists = (doc, fragment) => {
    const decodedFragment = decodeURIComponent(fragment);
    const collectFragments = (root) => {
      const ids = Array.from(root.querySelectorAll('[id]')).map(el => el.id);
      const names = Array.from(root.querySelectorAll('a[name]')).map(a => a.getAttribute('name'));
      return [...ids, ...names].filter(Boolean);
    };

    let allFragments = collectFragments(doc);
    const iframes = doc.querySelectorAll('iframe, frame');
    for (const frame of iframes) {
      try {
        const frameDoc = frame.contentDocument || frame.contentWindow?.document;
        if (frameDoc) {
          allFragments = allFragments.concat(collectFragments(frameDoc));
        }
      } catch (e) {
      }
    }

    const exists = allFragments.some(f => f === decodedFragment);

    if (!exists) {
      cy.log(`Available fragments (including frames):\n${allFragments.join('\n')}`);
    }

    expect(exists, `An element with id or name = "${fragment}" should exist in HTML or frames`).to.be.true;
  };

  const expectNoUnencodedParentheses = (url) => {
    cy.wrap(url).should('not.match', /[()]/, `URL should not contain unencoded parentheses: ${url}`);
  };

// Note: On GitHub pages, heading IDs are prefixed with "user-content-".
  const checkGithubFragment = (fragment) => {
    cy.document().then((doc) => {
      const ids = Array.from(doc.querySelectorAll('[id]')).map(el => el.id.replace(/^user-content-/, ''));
      cy.log(`Available GitHub IDs:\n${ids.join('\n')}`);
      const exists = ids.some(id => id === fragment);
      expect(exists, `Element with id "user-content-${fragment}" should exist in GitHub page`).to.be.true;
    });
  };

  const checkRegularFragment = (fragment) => {
    cy.document().then((doc) => {
      expectFragmentExists(doc, fragment);
    });
  };

  // Text fragment directives: #:~:text=[prefix-,]textStart[,textEnd][,-suffix]
  const checkTextFragment = (fragment) => {
    const textParam = fragment.replace(/^:~:text=/, '');
    const parts = textParam.split(',');
    // Skip prefix- (ends with '-') and suffix (starts with '-'); take first plain part
    const textStart = parts.find(p => !p.endsWith('-') && !p.startsWith('-')) || parts[0];
    const decodedText = decodeURIComponent(textStart);
    cy.contains(decodedText).should('exist');
  };

  Cypress.on('fail', (error) => {
    const sourceFiles = Cypress.env('sourceFiles');
    const shortMessage = error.message.split('\n')[0];

    const message = [
      shortMessage,
      sourceFiles ? `Source files:\n - ${sourceFiles.join('\n - ')}` : ''
    ].join('\n');

    const cleanError = new Error(message);
    cleanError.stack = null;
    throw cleanError;
  });

  const isExcluded = link =>
    excludedLinks.some(entry =>
      entry instanceof RegExp ? entry.test(link) : entry === link
    );

  urls.forEach((item) => {
    if (!urlsWith && isExcluded(item.link)) {
      it.skip(`should validate URL (excluded): ${item.link}`, () => {});
      return;
    }
    
    it(`should validate URL: ${item.link}`, () => {
      const url = item.link;
      const fragment = url.includes('#') ? url.split('#').slice(-1)[0] : null;
      const isTextFragment = fragment !== null && fragment.startsWith(':~:text=');
      const isCodexPage = url.includes('/codex/');
      const isApiPage = url.includes('/api/');
      const isGithubPage = url.includes('github.com');
      const isGithubBlobLine = url.includes('github.com') && /\/blob\/[^#]+#L\d+(-L\d+)?$/.test(url);
      const nonHtmlExtensions = ['.txt','.json','.pdf','.zip','.csv','.xml','.not','.bin','.dat','.tar','.gz','.rar','.xsd','.yaml','.pot'];
      const hasNonHtmlExtension = nonHtmlExtensions.some(ext => url.endsWith(ext));
      const isNonHtmlResource = hasNonHtmlExtension || url.includes('/files/') || url.includes('/downloads/');
      const isNpmPackagePage = url.startsWith('https://www.npmjs.com/package/');
      if (isNpmPackagePage) {
        const m = url.match(/^https:\/\/www\.npmjs\.com\/package\/(@[^/]+\/[^#?]+)/);
        const pkg = m ? m[1] : null;
        const encodedUrl = pkg ? url.replace(pkg, encodeURIComponent(pkg)) : url;

        if (pkg) {
          cy.request({
            url: `https://registry.npmjs.org/${pkg}`,
            failOnStatusCode: false,
            headers: { Accept: 'application/vnd.npm.install-v1+json' }
          }).then((res) => {
            expect(res.status, `npm registry status for ${pkg}`).to.eq(200);
          });
        }
        completedTests++;
        return;
      }
  
      Cypress.env('sourceFiles', item.files);
      expectNoUnencodedParentheses(url);

      if (isNonHtmlResource) {
        cy.log(`Validating non-HTML resource: ${url}`);
        cy.request({
          url: url,
          failOnStatusCode: false 
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 201, 202, 203, 204, 301, 302, 304]);
  
          if (url.endsWith('.json')) {
            expect(response.body).to.be.an('object');
          }
        });
        completedTests++;
        return;
      }

      if (isCodexPage) {
        cy.visit(url);
      
        cy.get('[data-cy="c8y-title--title-outlet"] .text-truncate')
          .invoke('text')
          .should('not.be.empty')
          .and('not.match', /404 not found/i);
      
        cy.url().should('eq', url);
      
        if (fragment) {
          if (fragment.startsWith('/')) {
            cy.location('hash').should('eq', `#${fragment}`, `URL hash should match the fragment: #${fragment}`);
          } else {
            cy.get(`#${fragment}`)
              .should('exist', `Fragment "${fragment}" does not exist on the page`)
              .then(() => {
                cy.document().then((doc) => {
                  const ids = Array.from(doc.querySelectorAll('[id]')).map((el) => el.id);
                  cy.log(`Available elements with IDs on the page:\n${ids.join('\n')}`);
                });
              });
          }
        }
      }
      else if (isApiPage) {
        cy.visit(url);
        if (fragment) {
          if (isTextFragment) {
            checkTextFragment(fragment);
          } else {
            cy.get(`[id="${fragment}"]`).should('exist');
          }
        }
      }
      else if (isGithubBlobLine) {
        const baseUrl = url.split('#')[0];
        const match = url.match(/#L(\d+)/);
        const lineNumber = match ? match[1] : null;
        cy.request({ url: baseUrl, failOnStatusCode: false }).then((res) => {
          expect(res.status, `GitHub blob file should exist: ${baseUrl}`)
            .to.be.oneOf([200, 301, 302]);
        });
        if (lineNumber) {
          cy.visit(baseUrl);
          const selector = `#L${lineNumber}, #LC${lineNumber}`;
          cy.get(selector).should('exist');
        }
      }
      else if (isGithubPage && fragment) {
        cy.visit(url);
        if (isTextFragment) {
          checkTextFragment(fragment);
        } else {
          checkGithubFragment(fragment);
        }
      }
      else if (fragment) {
        cy.visit(url, {failOnStatusCode: false, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0 Safari/537.36' }});
        if (isTextFragment) {
          checkTextFragment(fragment);
        } else {
          checkRegularFragment(fragment);
        }
      }
      else {
        cy.request({
          url: url,
          failOnStatusCode: false
        }).then((response) => {
          const contentType = response.headers['content-type'] || '';
          if (!contentType.includes('text/html')) {
            cy.log(`Non-HTML content detected for ${url}, skipping cy.visit()`);
            expect(response.status).to.be.oneOf([200, 201, 202, 203, 204, 301, 302, 304]);
            expect(response.body).not.to.be.empty;
          } else {
            // [DIAGNOSTIC] log every resource request's start and completion so a
            // request that never fires its completion log is the one blocking `load`.
            // Scoped to the target host + likely third-party culprits rather than
            // '**', since intercepting literally everything also catches Chrome's
            // own background requests (safebrowsing, variations, accounts) and
            // interferes with those unrelated to the page under test.
            const diagnosticPatterns = [
              `${new URL(url).origin}/**`,
              '**://www.google-analytics.com/**',
              '**://www.googletagmanager.com/**',
              '**://*.algolia.net/**',
              '**://asciinema.org/**',
            ];
            // Plain array push only - cy.task()/cy.log() cannot be called from
            // inside an intercept callback (it runs outside Cypress's normal
            // command queue); flushed via the afterEach hook below instead.
            diagnosticPatterns.forEach((pattern) => {
              cy.intercept(pattern, (req) => {
                const start = Date.now();
                diagnosticLog.push(`START ${req.method} ${req.url}`);
                req.continue((res) => {
                  diagnosticLog.push(`DONE ${res.statusCode} ${Date.now() - start}ms ${req.url}`);
                });
              });
            });
            cy.visit(url);
            cy.document().its('body').should('not.be.empty');
          }
        });
      }
      
      completedTests++;
    });
  });

  afterEach(() => {
    cy.log(`Progress: ${completedTests}/${totalTests}`);
    // [DIAGNOSTIC]
    if (diagnosticLog.length) {
      cy.task('log', `[DIAGNOSTIC]\n${diagnosticLog.join('\n')}`);
      diagnosticLog = [];
    }
  });
});