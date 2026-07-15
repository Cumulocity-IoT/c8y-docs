#!/usr/bin/env node
// Wrapper that runs Extractlinks.js then Cypress, forwarding --urls-with=<value>
// to Cypress via --env urlsWith=<value>.
const { spawnSync } = require('child_process');

const urlsWithArg = process.argv.find(a => a.startsWith('--urls-with='));
const urlsWith = urlsWithArg ? urlsWithArg.slice('--urls-with='.length) : null;

const extract = spawnSync('node', ['Extractlinks.js'], { stdio: 'inherit' });
if (extract.status !== 0) process.exit(extract.status ?? 1);

const cypressArgs = ['cypress', 'run', '--browser', 'chrome', '--headless'];
if (urlsWith) cypressArgs.push('--env', `urlsWith=${urlsWith}`);

const result = spawnSync('npx', cypressArgs, { stdio: 'inherit' });
process.exit(result.status ?? 1);
