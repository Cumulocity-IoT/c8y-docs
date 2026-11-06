#!/usr/bin/env node
// Wrapper that runs Extractlinks.js then Cypress, forwarding CLI flags to
// Cypress via --env:
//   --urls-with=<substring>  -> urlsWith
//   --diagnostics            -> diagnostics=true (verbose network/console logging)
// and one flag of its own:
//   --recheck=<file>         -> skip Extractlinks.js and check only the links
//                               that failed in <file>, a link-check-result.json
//                               from an earlier run (see cypress.config.cjs)
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const urlsWithArg = process.argv.find(a => a.startsWith('--urls-with='));
const urlsWith = urlsWithArg ? urlsWithArg.slice('--urls-with='.length) : null;

const diagnostics = process.argv.includes('--diagnostics');

const recheckArg = process.argv.find(a => a.startsWith('--recheck='));
const recheckFile = recheckArg ? recheckArg.slice('--recheck='.length) : null;

// Read before clearing the previous result below - the re-check input may
// be that very file.
const recheckLinks = recheckFile
  ? JSON.parse(fs.readFileSync(recheckFile, 'utf8')).failed.map(({ link, files }) => ({ link, files }))
  : null;

// A result left over from an earlier run must not pass for this run's: a
// missing file is how the workflow tells that Cypress never finished.
fs.rmSync(path.join(__dirname, 'link-check-result.json'), { force: true });

if (recheckLinks) {
  fs.writeFileSync(path.join(__dirname, 'all_links.json'), JSON.stringify(recheckLinks, null, 2));
} else {
  const extract = spawnSync('node', ['Extractlinks.js'], { stdio: 'inherit' });
  if (extract.status !== 0) process.exit(extract.status ?? 1);
}

const envPairs = [];
if (urlsWith) envPairs.push(`urlsWith=${urlsWith}`);
if (diagnostics) envPairs.push('diagnostics=true');

const cypressArgs = ['cypress', 'run', '--browser', 'chrome', '--headless'];
if (envPairs.length) cypressArgs.push('--env', envPairs.join(','));

const result = spawnSync('npx', cypressArgs, { stdio: 'inherit' });
process.exit(result.status ?? 1);
