#!/usr/bin/env node
// Wrapper that runs Extractlinks.js then Cypress, forwarding CLI flags to
// Cypress via --env:
//   --urls-with=<substring>  -> urlsWith
//   --diagnostics            -> diagnostics=true (verbose network/console logging)
//
// It also fails the run when Cypress stops printing output for too long. The
// reporter prints a line each time a test finishes or an attempt is retried, and
// a link needs about 2-3 minutes at most (10 retries with 10 s timeouts). A
// longer silence means Cypress is stuck, for example on a page that never
// finishes loading, and the built-in timeouts do not fire. Without this check a
// stuck run only ends when GitHub cancels the job after hours.
// Override the limit with LINK_CHECK_STALL_TIMEOUT_MINUTES.
const { spawn, spawnSync } = require('child_process');

const STALL_TIMEOUT_MS = Number(process.env.LINK_CHECK_STALL_TIMEOUT_MINUTES || 5) * 60 * 1000;
const CHECK_INTERVAL_MS = 5000;
const KILL_GRACE_MS = 10000;

const urlsWithArg = process.argv.find(a => a.startsWith('--urls-with='));
const urlsWith = urlsWithArg ? urlsWithArg.slice('--urls-with='.length) : null;

const diagnostics = process.argv.includes('--diagnostics');

const extract = spawnSync('node', ['Extractlinks.js'], { stdio: 'inherit' });
if (extract.status !== 0) process.exit(extract.status ?? 1);

const envPairs = [];
if (urlsWith) envPairs.push(`urlsWith=${urlsWith}`);
if (diagnostics) envPairs.push('diagnostics=true');

const cypressArgs = ['cypress', 'run', '--browser', 'chrome', '--headless'];
if (envPairs.length) cypressArgs.push('--env', envPairs.join(','));

// Same list and order as the Cypress spec uses, to name the link after the last one printed.
const links = require('./all_links.json')
  .map(item => item.link)
  .filter(link => !urlsWith || link.includes(urlsWith));

// Cypress colors its output with ANSI escape sequences such as "\u001b[32m" (green)
// and "\u001b[0m" (reset). They sit between the words of a reporter line and would
// stop TEST_LINE from matching, so they are removed first.
// eslint-disable-next-line no-control-regex
const ANSI_COLOR_CODE = /\u001b\[[0-9;]*m/g;

// Finds the link in a reporter line for one link test and captures it. The test
// titles are defined in cypress/e2e/link-checker.cy.js ("should validate URL: <link>"
// and, for skipped links from `excludedLinks`, "should validate URL (excluded): <link>"),
// so this must be kept in sync with them. The line may have a prefix and a suffix:
//   "    ✓ should validate URL: https://example.com/a (840ms)"
//   "    - should validate URL (excluded): https://example.com/b"
//   "    (Attempt 1 of 11) should validate URL: https://example.com/c"
// A link has no spaces, so (\S+) stops before the " (840ms)" suffix.
const TEST_LINE = /should validate URL(?: \(excluded\))?: (\S+)/;

let lastActivity = Date.now();
let lastLink = null;
// Cypress output arrives in chunks that can end in the middle of a line. The
// incomplete last line is kept here and completed by the next chunk.
let pending = '';

function trackOutput(chunk) {
  lastActivity = Date.now();
  const lines = (pending + chunk.toString()).split('\n');
  pending = lines.pop();
  for (const line of lines) {
    const match = line.replace(ANSI_COLOR_CODE, '').match(TEST_LINE);
    if (match) lastLink = match[1];
  }
}

function describeStall() {
  const minutes = Math.round(STALL_TIMEOUT_MS / 600) / 100;
  const index = lastLink ? links.indexOf(lastLink) : -1;
  const next = index >= 0 ? links[index + 1] : links[0];
  return [
    `Cypress printed nothing for ${minutes} minutes, so the run is stuck and was stopped.`,
    lastLink ? `Last link in the output: ${lastLink}` : 'No link was reported yet.',
    next ? `The stuck link is most likely: ${next}` : 'That was the last link in the list.',
    'Reproduce it with: npm test -- --urls-with=<part of that link> --diagnostics'
  ];
}

// Own process group, so that killing it also stops Chrome and Cypress's child processes.
const cypress = spawn('npx', cypressArgs, { stdio: ['inherit', 'pipe', 'pipe'], detached: true });
cypress.stdout.on('data', chunk => { trackOutput(chunk); process.stdout.write(chunk); });
cypress.stderr.on('data', chunk => { trackOutput(chunk); process.stderr.write(chunk); });

let stalled = false;
function killGroup(signal) {
  try {
    process.kill(-cypress.pid, signal);
  } catch (e) {
    // The process group is already gone.
  }
}

const watchdog = setInterval(() => {
  if (Date.now() - lastActivity < STALL_TIMEOUT_MS) return;
  stalled = true;
  clearInterval(watchdog);
  describeStall().forEach((line, i) => console.error(i === 0 ? `::error::${line}` : line));
  killGroup('SIGTERM');
  setTimeout(() => killGroup('SIGKILL'), KILL_GRACE_MS).unref();
}, CHECK_INTERVAL_MS);

cypress.on('close', code => {
  clearInterval(watchdog);
  process.exit(stalled ? 1 : (code ?? 1));
});
