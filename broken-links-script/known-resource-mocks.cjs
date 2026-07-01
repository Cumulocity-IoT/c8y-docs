// Registry of third-party resources known to cause link-checker flakiness
// (hangs, rate-limiting, anti-bot walls) that don't reflect an actual broken
// link in our docs. Each entry is applied on every cy.visit() by default;
// a specific link can override or disable it via `overrides`.
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

module.exports = [
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
];
