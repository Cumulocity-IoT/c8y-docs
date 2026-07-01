const allUrls = require('../../all_links.json');
const KNOWN_RESOURCE_MOCKS = require('../../known-resource-mocks.cjs');

// Domains we actually own/publish - a JS error on one of these could mean a
// real bug worth catching. Everywhere else, an uncaught exception isn't
// signal about whether the link is valid (see the describe-level
// uncaught:exception handler below); what matters there is already covered
// by the test's real assertions (status code, non-empty body, fragment
// existence).
const OWN_DOMAINS = ['cumulocity.com'];

describe('Link and Routing Validation - Individual URL Checks', () => {
  const urlsWith = Cypress.env('urlsWith') || null;
  const urls = urlsWith
    ? allUrls.filter(item => item.link.includes(urlsWith))
    : allUrls;

  // Diagnostics mode: verbose network + console logging to investigate a
  // failure that isn't reproducible locally. Enable via the workflow's
  // `diagnostics` dispatch input (combine with `branch` + `urlsWith` to
  // scope it to one failing case) - see README.md "Case 5".
  // Cypress coerces --env true/false into real booleans, but env vars set
  // another way could still arrive as the string "true" - handle both.
  const DIAGNOSTICS = String(Cypress.env('diagnostics')) === 'true';
  let diagnosticLog = [];
  let currentUrl = null;

  let completedTests = 0;
  const totalTests = urls.length;

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

    // Always times out in the automated tests but loads fine in the browser
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

  // See known-resource-mocks.cjs for what's mocked and why.
  const applyKnownResourceMocks = (link) => {
    KNOWN_RESOURCE_MOCKS.forEach(({ pattern, response, overrides }) => {
      const override = overrides?.find((o) =>
        o.link instanceof RegExp ? o.link.test(link) : o.link === link
      );
      const effectiveResponse = override ? override.response : response;
      if (effectiveResponse === null) return; // explicit opt-out via override
      cy.intercept(pattern, effectiveResponse);
    });
  };

  // Logs every request's start/completion so a request that starts but never
  // completes is visible as the likely cause of a `load` timeout - this is
  // what found the asciinema.org hang. Only active in diagnostics mode.
  // Plain array push only - cy.task()/cy.log() cannot be called from inside
  // an intercept callback (it runs outside Cypress's normal command queue);
  // flushed via the afterEach hook below instead. Wrapped in try/catch so a
  // bug in the logger itself can never block the request pipeline.
  //
  // Uses req.on('response', cb) rather than req.continue(cb): the latter is
  // documented to raise an uncaught exception (failing the test) if the
  // request errors at the network level rather than receiving an HTTP
  // response - which, watching every single sub-resource on a page, is
  // routine transient noise unrelated to the link under test. req.on()
  // simply never fires for such a request, which for our purposes reads the
  // same as a hang (START with no DONE) - the correct signal either way,
  // without turning an unrelated resource's blip into a false failure.
  const applyDiagnosticNetworkLogging = () => {
    if (!DIAGNOSTICS) return;
    cy.intercept('**', (req) => {
      try {
        const start = Date.now();
        diagnosticLog.push(`START ${req.method} ${req.url}`);
        req.on('response', (res) => {
          try {
            diagnosticLog.push(`DONE ${res.statusCode} ${Date.now() - start}ms ${req.url}`);
          } catch (e) {
            // never let logging break the request
          }
        });
      } catch (e) {
        // ignore - request proceeds normally either way
      }
    });
  };

  // Visits a URL like cy.visit(), additionally capturing console.error/warn
  // calls and (via the describe-level uncaught:exception listener below)
  // unhandled page errors into diagnosticLog when diagnostics mode is on.
  // A no-op wrapper (byte-for-byte cy.visit(url, options)) otherwise.
  const visitWithDiagnostics = (url, options = {}) => {
    if (!DIAGNOSTICS) {
      cy.visit(url, options);
      return;
    }
    const onBeforeLoad = (win) => {
      options.onBeforeLoad?.(win);
      ['error', 'warn'].forEach((level) => {
        const original = win.console[level];
        win.console[level] = (...args) => {
          try {
            diagnosticLog.push(`console.${level}: ${args.map(String).join(' ')}`);
          } catch (e) {
            // ignore
          }
          original.apply(win.console, args);
        };
      });
    };
    cy.visit(url, { ...options, onBeforeLoad });
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
    if (sourceFiles) {
      error.message += `\n\nThis URL was used in the following files:\n - ${sourceFiles.join('\n -')}`;
    }
    throw error;
  });

  // Only fail on an uncaught exception when it happens on a page we own
  // (see OWN_DOMAINS above) - a JS error on some third-party site a link
  // points to isn't signal about whether that link is valid. Registered
  // once here (not per-test) since Cypress.on persists for the whole run;
  // cypress/support/e2e.js still has its own uncaught:exception handler for
  // the rare case of a genuine cumulocity.com-domain error that turns out
  // to be known-harmless - both handlers run independently, and either one
  // returning `false` suppresses the failure.
  Cypress.on('uncaught:exception', () => {
    const isOwnDomain = currentUrl && OWN_DOMAINS.some((d) => currentUrl.includes(d));
    if (!isOwnDomain) return false;
  });

  // Diagnostics mode: log uncaught page errors without changing today's
  // fail-on-uncaught-exception behavior (not returning `false` here leaves
  // the default handling - and any other registered handler - untouched).
  // Registered once here rather than per-test to avoid stacking a new
  // listener (and duplicate log lines) for every URL under test.
  if (DIAGNOSTICS) {
    Cypress.on('uncaught:exception', (err) => {
      diagnosticLog.push(`uncaught exception: ${err.message}`);
    });
  }

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
      currentUrl = url;
      // Order matters: cy.intercept() gives priority to the most-recently
      // registered matching handler, and an explicit req.continue() sends
      // the request straight to the real server, bypassing earlier
      // registrations entirely. Mocks must be registered AFTER (i.e. win
      // over) the diagnostic logger, or diagnostics mode would silently
      // re-introduce hangs that are already fixed via known-resource-mocks.
      applyDiagnosticNetworkLogging();
      applyKnownResourceMocks(url);
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
        visitWithDiagnostics(url);
      
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
        visitWithDiagnostics(url);
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
          visitWithDiagnostics(baseUrl);
          const selector = `#L${lineNumber}, #LC${lineNumber}`;
          cy.get(selector).should('exist');
        }
      }
      else if (isGithubPage && fragment) {
        visitWithDiagnostics(url);
        if (isTextFragment) {
          checkTextFragment(fragment);
        } else {
          checkGithubFragment(fragment);
        }
      }
      else if (fragment) {
        visitWithDiagnostics(url, {failOnStatusCode: false, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0 Safari/537.36' }});
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
            visitWithDiagnostics(url);
            cy.document().its('body').should('not.be.empty');
          }
        });
      }
      
      completedTests++;
    });
  });

  afterEach(() => {
    cy.log(`Progress: ${completedTests}/${totalTests}`);
    if (diagnosticLog.length) {
      cy.task('log', `[DIAGNOSTIC]\n${diagnosticLog.join('\n')}`);
      diagnosticLog = [];
    }
  });
});