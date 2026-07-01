#!/usr/bin/env node
// Turns a captured Cypress link-checker run log into a short Markdown PR comment.
// Usage: node summarize-failures.cjs <log-file> <run-url>
const fs = require('fs');

const [, , logPath, runUrl] = process.argv;
const raw = fs.readFileSync(logPath, 'utf8');
// Strip ANSI color codes; some log capture paths render the ESC byte as a
// literal "^[" instead of \x1b, so cover both forms.
const clean = raw.replace(/(?:\x1b|\^\[)\[[0-9;]*m/g, '');

// Failed tests are restated compactly in the failure list as
// "should validate URL: <url>:" (trailing colon). Passing tests and
// in-progress retry attempts never end a line with ":", so this alone
// disambiguates without needing to locate a specific log section.
const failedUrls = [...new Set(
  [...clean.matchAll(/should validate URL: (.+):$/gm)].map((m) => m[1].trim())
)];

const summary = clean.match(/Tests:\s*(\d+)[\s\S]*?Passing:\s*(\d+)[\s\S]*?Failing:\s*(\d+)/);
const [, tests = '?', passing = '?', failing = String(failedUrls.length)] = summary || [];

const lines = ['<!-- link-checker-report -->', '## Link checker report', ''];

if (failedUrls.length === 0) {
  lines.push(`All ${tests} checked links passed (${passing} passing).`);
} else {
  lines.push(`${failing} of ${tests} checked links failed:`, '');
  failedUrls.forEach((url) => lines.push(`- ${url}`));
}

lines.push('', `[Full run logs](${runUrl})`);

console.log(lines.join('\n'));
