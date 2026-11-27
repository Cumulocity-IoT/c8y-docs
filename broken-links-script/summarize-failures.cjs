#!/usr/bin/env node
// Turns the link-check-result.json of the first pass - and of the re-check on
// a fresh runner, if one ran - into a short Markdown report, used for the PR
// comment, the filed issue and the job summary.
// Usage: node summarize-failures.cjs --first-pass=<json> [--recheck=<json>] --run-url=<url>
//
// A link counts as broken only if it also failed the re-check. Links that
// failed the first pass but passed the re-check are only counted, not listed;
// the Cypress log of the first pass names them. When GITHUB_OUTPUT is set, also writes `failed=true|false`
// there - true for broken links, or for a pass that never finished.
const fs = require('fs');

const arg = (name) => {
  const found = process.argv.find((a) => a.startsWith(`--${name}=`));
  return found ? found.slice(name.length + 3) : null;
};

const readResult = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
};

const recheckPath = arg('recheck');
const firstPass = readResult(arg('first-pass'));
const recheck = recheckPath ? readResult(recheckPath) : null;
const runUrl = arg('run-url');

const isIncomplete = (result) => !result || !result.completed;

const lines = ['<!-- link-checker-report -->', '## Link checker report', ''];

// One bullet per link; error and source files go on their own lines below it.
const listLinks = (items) => {
  items.forEach(({ link, files = [], error }) => {
    lines.push(`- ${link}`);
    if (error) lines.push(`  **Error:** ${error}  `);
    if (files.length > 3) {
      lines.push(
        `  <details><summary><b>Location:</b> ${files.length} files</summary>`,
        '',
        ...files.map((file) => `  - \`${file}\``),
        '',
        '  </details>'
      );
    } else if (files.length > 0) {
      lines.push(`  **Location:** ${files.map((file) => `\`${file}\``).join(', ')}`);
    }
  });
};

let failed;
if (isIncomplete(firstPass) || (recheckPath && isIncomplete(recheck))) {
  const [pass, result] = isIncomplete(firstPass) ? ['first pass', firstPass] : ['re-check', recheck];
  const error = result && result.error ? `: ${result.error}` : '';
  lines.push(`The link check did not complete (${pass})${error}. See the logs for details.`);
  failed = true;
} else {
  const broken = (recheck || firstPass).failed;
  const brokenLinks = new Set(broken.map((item) => item.link));
  const recovered = recheck ? firstPass.failed.filter((item) => !brokenLinks.has(item.link)) : [];
  failed = broken.length > 0;

  // Excluded links are reported by Cypress as pending - not checked at all.
  const checked = firstPass.totalTests - firstPass.totalPending;
  const excluded = firstPass.totalPending ? ` (${firstPass.totalPending} excluded)` : '';
  const history = recheck
    ? ` (${firstPass.failed.length} failed on the first run, ${recovered.length} passed on re-check)`
    : '';
  // Two trailing spaces end a line without starting a new paragraph.
  lines.push(`**Checked:** ${checked} links${excluded}  `, `**Broken:** ${broken.length}${history}`);
  if (broken.length > 0) {
    lines.push('');
    listLinks(broken);
  }
}

lines.push('', `[Full run logs](${runUrl})`);

console.log(lines.join('\n'));

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `failed=${failed}\n`);
}
