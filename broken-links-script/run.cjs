#!/usr/bin/env node
// Wrapper that runs Extractlinks.js then Cypress, forwarding CLI flags to
// Cypress via --env:
//   --urls-with=<substring>  -> urlsWith
//   --diagnostics            -> diagnostics=true (verbose network/console logging)
const { spawnSync } = require('child_process');

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

const result = spawnSync('npx', cypressArgs, { stdio: 'inherit' });
process.exit(result.status ?? 1);
