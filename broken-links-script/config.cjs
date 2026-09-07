// Single place to adapt the link checker to a different repository/site.
// Everything here is data, not logic - the mechanisms that consume it live
// in cypress/e2e/link-checker.cy.js and stay repo-agnostic.

module.exports = {
  // Domains this repo actually owns/publishes. A JS error on one of these
  // could mean a real bug worth catching. Everywhere else, an uncaught
  // exception isn't signal about whether the link is valid - what matters
  // there is already covered by the test's real assertions (status code,
  // non-empty body, fragment existence). See OWN_DOMAINS usage in
  // link-checker.cy.js.
  ownDomains: ['cumulocity.com'],

  // Links to skip during validation entirely.
  // Each entry is either an exact URL string or a RegExp tested against the
  // link. Use this as a last resort, when a link is valid but Cypress can
  // never reliably validate it (anti-bot protection, target-URL-itself
  // flakiness, etc.) - see README.md "Case 2" / "Case 6".
  excludedLinks: [
    // MathWorks URL uses anti-bot protection, Cypress cannot reliably load it
    "https://de.mathworks.com/help/predmaint/ug/remaining-useful-life-estimation-using-convolutional-neural-network.html",

    // Medium blog uses anti-bot protection, Cypress cannot reliably load it
    "https://medium.com/@polanitzer/prediction-of-remaining-useful-life-of-an-engine-based-on-sensors-building-a-random-forest-in-ffad82c8a1c6",

    // Links from opentelemetry.io always time out although they load fine in a browser
    /https:\/\/opentelemetry.io\//,

    // logback.qos.ch intermittently hard-blocks an entire CI job (all
    // retries fail identically, consistently spaced ~10s apart - the exact
    // request timeout) while passing fine on other runs/branches in the
    // same workflow run at the same time. Confirmed via a diagnostics-mode
    // run and cross-referencing parallel matrix jobs: this points to
    // IP-reputation-based blocking on logback.qos.ch's side tied to
    // whichever ephemeral runner IP GitHub Actions assigns - unrelated to
    // whether the link is valid, and retries don't help since the block
    // persists for the runner's whole job lifetime.
    /logback\.qos\.ch/,

    // Timeout links
    "https://openjdk.org/jeps/252",

    // latlong.net fails to load in Cypress (getting 403)
    "https://www.latlong.net/",

    // unpkg.com returns 403 to automated requests from some GitHub Actions
    // runner IPs for a whole job at a time: in run 30535957097 (2026-07-30)
    // this exact URL failed all 11 attempts on both release/y2025 and
    // release/y2026 while passing on develop in the same run, and returns 200
    // from a normal network. Runner-IP reputation, not a broken link, and
    // retries can't help because the block lasts the job's lifetime.
    /^https:\/\/unpkg\.com\//,

    // YouTube rate-limits automated requests per runner IP, answering with
    // 429 and a redirect to google.com/sorry. In run 30535957097 (2026-07-30)
    // this video failed all 11 attempts on release/y2025 while passing on
    // both develop and release/y2026 in the same run, and returns 200 from a
    // normal network - runner-IP rate-limiting, not a broken link.
    /^https:\/\/www\.youtube\.com\/watch/,

    // oreilly.com's Akamai bot protection returns 403 for automated
    // requests consistently - reproduced outside CI too (curl gets 403 on
    // every attempt), and failed on every branch in both the 2026-07-13 and
    // 2026-07-20 weekly runs. Not CI-specific flakiness - genuine anti-bot
    // blocking of non-browser clients.
    /oreilly\.com/,
  ],

  // Registry of third-party resources known to cause link-checker flakiness
  // (hangs, rate-limiting, anti-bot walls) that don't reflect an actual
  // broken link in our docs. Each entry is applied on every cy.visit() by
  // default; a specific link can override or disable it via `overrides`.
  // See README.md "Mock a known-problematic third-party resource".
  //
  // - name:      short identifier, used only for readability in this file
  // - pattern:   glob or RegExp, passed straight to cy.intercept()
  // - reason:    why this exists - keeps this list from becoming a mystery
  //              graveyard the way "just exclude the link" lists tend to
  // - response:  a StaticResponse object ({statusCode, body, ...}) or a
  //              RouteHandler function, passed straight to cy.intercept()
  // - overrides: [{ link, response }] for links that need different behavior
  //              from a domain's default mock.
  //              - link: exact string match, or a RegExp tested against the link
  //              - response: same shape as above; use `null` to mean "don't
  //                intercept this domain for this link, hit the real network"
  //              First matching override wins.
  resourceMocks: [
    {
      name: 'asciinema-embed',
      pattern: '**://asciinema.org/**',
      reason:
        'Embed script never responds when requested from GitHub Actions ' +
        "runners (confirmed via a diagnostic run logging every request's " +
        'start/completion on 2026-07-01); still blocks the load event ' +
        'despite the async attribute.',
      response: { statusCode: 204, body: '' },
      overrides: [
        // Example - a link that specifically needs the real embed to load:
        // { link: 'https://example.com/docs/page-that-checks-the-embed/', response: null },
      ],
    },
  ],
};
