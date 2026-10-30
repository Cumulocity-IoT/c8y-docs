#!/usr/bin/env node
// Turns the link-check-result.json of the first pass - and of the re-check on
// a fresh runner, if one ran - into a short Markdown report, used for the PR
// comment, the filed issue and the job summary.
// Usage: node summarize-failures.cjs --first-pass=<json> [--recheck=<json>] --run-url=<url>
//
// A link counts as broken only if it also failed the re-check. Links that
// failed the first pass but passed the re-check are listed separately as
// flaky, so a link that keeps recovering stays visible instead of silently
// disappearing. When GITHUB_OUTPUT is set, also writes `failed=true|false`
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

const listLinks = (items) => {
  items.forEach(({ link, files = [], error }) => {
    lines.push(`- ${link}`);
    if (error) lines.push(`  - ${error}`);
    files.forEach((file) => lines.push(`  - in \`${file}\``));
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
  const skipped = firstPass.totalPending ? ` (${firstPass.totalPending} excluded links skipped)` : '';
  if (broken.length === 0) {
    lines.push(`All ${checked} checked links passed${skipped}.`);
  } else {
    const confirmed = recheck ? ', and again when re-checked on a fresh runner' : '';
    lines.push(`${broken.length} of ${checked} checked links failed${confirmed}${skipped}:`, '');
    listLinks(broken);
  }

  if (recovered.length > 0) {
    lines.push(
      '',
      `${recovered.length} link(s) failed at first but passed when re-checked on a fresh runner - ` +
        'most likely runner-specific blocking or a short outage, so not reported as broken:',
      ''
    );
    listLinks(recovered);
  }
}

lines.push('', `[Full run logs](${runUrl})`);

console.log(lines.join('\n'));

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `failed=${failed}\n`);
}
