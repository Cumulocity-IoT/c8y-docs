const core = require('@actions/core');
const github = require('@actions/github');

const FILES_GLOB = (process.env.FILES_GLOB || '').trim();
const HEADING_RE = /^(\#{1,6})\s+(.+?)(?:\s*\{\#([A-Za-z0-9\-_]+)\})?\s*$/;

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[`"'().?!,:;[\]{}<>/\\|@#$%^&*+=~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s/g, '-')
    .replace(/-+/g, '-');
}

function filenameMatchesGlob(filename, globList) {
  if (!globList) return /\.mdx?$/.test(filename);
  const globs = globList.split(',').map(s => s.trim()).filter(Boolean);
  const toRegex = (g) => new RegExp('^' + g
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '___DOUBLESTAR___')
    .replace(/\*/g, '[^/]*')
    .replace(/___DOUBLESTAR___/g, '.*')
    + '$');
  return globs.some(g => toRegex(g).test(filename));
}

async function run() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN missing');

  const octokit = github.getOctokit(token);
  const ctx = github.context;
  const { owner, repo } = ctx.repo;
  const prNumber = ctx.payload.pull_request?.number;
  if (!prNumber) return;

  const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
    owner, repo, pull_number: prNumber, per_page: 100
  });

  const reviewComments = [];
  const summary = [];

  for (const file of files) {
    if (!file.patch) continue;
    if (!filenameMatchesGlob(file.filename, FILES_GLOB)) continue;

    const lines = file.patch.split('\n');
    let position = 0;

    for (const raw of lines) {
      position += 1;
      if (!raw.startsWith('+') || raw.startsWith('+++')) continue;

      const line = raw.slice(1);
      const m = line.match(HEADING_RE);
      if (!m) continue;

      const [ , hashes, headingText, currentId ] = m;
      const suggested = slugify(headingText);
      const needs = !currentId || currentId !== suggested;
      if (!needs) continue;

      const fixed = `${hashes} ${headingText} {#${suggested}}`;
      const suggestion = '```suggestion\n' + fixed + '\n```';

      reviewComments.push({
        path: file.filename,
        position,
        body: `Suggested ID for this heading:\n\n${suggestion}`
      });

      summary.push(`- \`${file.filename}\`: “${headingText}” → \`{#${suggested}}\``);
    }
  }

  if (reviewComments.length === 0) {
    await octokit.rest.pulls.createReview({
      owner, repo, pull_number: prNumber,
      event: 'COMMENT',
      body: 'No heading ID suggestions'
    });
    return;
  }

  await octokit.rest.pulls.createReview({
    owner, repo, pull_number: prNumber,
    event: 'COMMENT',
    body: `Heading ID suggestions:\n${summary.join('\n')}`,
    comments: reviewComments
  });
}

run().catch(err => require('@actions/core').setFailed(err.message));
