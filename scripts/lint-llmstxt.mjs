#!/usr/bin/env node
// Assert llms.txt spec grammar: every non-blank line after the first H2 (## )
// must be either an H2 heading (## ) or a link bullet (- [ ).
// Usage: node scripts/lint-llmstxt.mjs public/llms.txt [more files...]
//    or: node scripts/lint-llmstxt.mjs   (defaults to public/llms.txt + public/sector/*/llms.txt)
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

function collectDefaults() {
  const files = [];
  if (existsSync('public/llms.txt')) files.push('public/llms.txt');
  const sectorDir = 'public/sector';
  if (existsSync(sectorDir)) {
    for (const term of readdirSync(sectorDir)) {
      const p = join(sectorDir, term, 'llms.txt');
      if (existsSync(p)) files.push(p);
    }
  }
  return files;
}

const files = process.argv.slice(2);
const targets = files.length ? files : collectDefaults();

if (!targets.length) {
  console.error('No llms.txt files found. Build the site first (hugo).');
  process.exit(1);
}

let failed = false;
for (const file of targets) {
  const lines = readFileSync(file, 'utf8').split('\n');
  const start = lines.findIndex((l) => l.startsWith('## '));
  if (start === -1) {
    console.error(`FAIL ${file}: no H2 (## ) section found`);
    failed = true;
    continue;
  }
  const bad = [];
  for (let i = start; i < lines.length; i++) {
    const l = lines[i];
    if (l.trim() === '') continue;
    if (!/^(## |- \[)/.test(l)) bad.push({ n: i + 1, l });
  }
  if (bad.length) {
    console.error(`FAIL ${file}: ${bad.length} non-conforming line(s) after first H2`);
    for (const b of bad) console.error(`  ${b.n}: ${JSON.stringify(b.l)}`);
    failed = true;
  } else {
    console.log(`OK   ${file}`);
  }
}

process.exit(failed ? 1 : 0);
