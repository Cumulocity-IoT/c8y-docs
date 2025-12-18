import fs from "fs";
import path from "path";
import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import Anthropic from "@anthropic-ai/sdk";
import { fileURLToPath } from "url";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const token = process.env.GITHUB_TOKEN;
const octokit = getOctokit(token);

function cleanJSON(raw) {
  return raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

async function run() {
  try {
    const { owner, repo, number: pull_number } = context.issue;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const styleGuidePath = path.join(__dirname, "documentation-guidelines.md");
    const STYLE_GUIDE_TEXT = fs.readFileSync(styleGuidePath, "utf8");

    const { data: files } = await octokit.rest.pulls.listFiles({ owner, repo, pull_number});
    const MAX_FILES = 30;
    const MAX_TOTAL_PATCH_CHARS = 50000;  
    const MAX_ADDED_LINES = 1000; 
    let totalPatchSize = 0;
    let addedLines = 0; 
    for (const f of files) {
      if (f.patch) {
        totalPatchSize += f.patch.length;
        addedLines += f.patch.split("\n").filter(l => l.startsWith("+") && !l.startsWith("+++")).length;
      }
    }

    if (files.length > MAX_FILES || totalPatchSize > MAX_TOTAL_PATCH_CHARS || addedLines > MAX_ADDED_LINES) {
      await octokit.rest.pulls.createReview({
        owner,
        repo,
        pull_number,
        event: "COMMENT",
        body: `AI Style Suggester skipped: Pull request is too large to safely analyze.

    **Files changed:** ${files.length} (max allowed ${MAX_FILES})  
    **Total diff size:** ${totalPatchSize} chars (max allowed ${MAX_TOTAL_PATCH_CHARS})  
    **Added lines:** ${addedLines} (max allowed ${MAX_ADDED_LINES})  

    Please split this PR into smaller parts for automated review.`
      });

      console.log("PR skipped due to size limits.");
      return;
    }
    
    const reviewComments = [];
    const summary = [];

    for (const file of files) {
      if ( !file.filename.endsWith(".md") || !file.filename.startsWith("content/")) {continue};

      console.log(`Analyzing ${file.filename}...`);
      const diff = file.patch;
      if (!diff) continue;

  const numberedDiff = file.patch
  .split("\n")
  .map((l, i) => `${String(i + 1).padStart(4, "0")}: ${l}`)
  .join("\n");


  const prompt = `
  You are reviewing a Git diff of a Markdown file.

  Use ONLY the rules defined in the style guide below.  
  Do not rely on any internal assumptions or default conventions—strictly follow the provided style guide.

  Your task:
  - Detect added heading lines (lines starting with "+ #" or "+ ##" etc.).
  - If missing an ID, generate a correct one according to the style guide.
  - If an ID exists, validate and correct it.
  - Apply all relevant rules from the style guide (capitalization, terminology, etc.).
  - Check capitalization and correct any issues in the added lines.
  - Check grammar rules, including missing articles ("a", "an", "the") according to the following style guide rules.
  - Always use standard American English spelling. Convert any British English spelling to American English.

  Output Format (very important):
  Return ONLY valid JSON in this exact structure:

  [
    {
      "position": <the diff line number shown before the colon (NNNN)>
      "suggestion": "<the full corrected Markdown line>"
    }
  ]

  No commentary.  
  No markdown fences.  
  No extra text.  
  Do not include backticks in the JSON.

    ## Style Guide:
    ${STYLE_GUIDE_TEXT}

    ## Diff (each line is prefixed with its 1-based diff position NNNN:):
    ${numberedDiff} `;


      const completion = await anthropic.messages.create({
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
        model: 'claude-sonnet-4-5-20250929',
      });

      let raw = completion.content?.[0]?.text ?? "[]";
      raw = cleanJSON(raw);
      let suggestions = [];
      try {
        suggestions = JSON.parse(raw);
      } catch (err) {
        console.error("Failed to parse AI JSON, raw output:", raw);
        continue;
      }

      const diffLines = file.patch.split("\n");
      let position = 0;


      diffLines.forEach((line, index) => {
        position += 1;

        if (!line.startsWith('+') || line.startsWith('+++')) return;
        const match = suggestions.find(s => Number(s.position) === index + 1);

        if (!match) return;

        let replacement = (match.suggestion || "").trim();

        if (replacement.startsWith("+")) {
          replacement = replacement.slice(1).trim();
        }

        reviewComments.push({
          path: file.filename,
          position,
          body: "```suggestion\n" + replacement + "\n```"
        });

        summary.push(`- ${file.filename}: line ${index + 1}`);
      });
    }

    if (reviewComments.length === 0) {
      await octokit.rest.pulls.createReview({
        owner,
        repo,
        pull_number,
        event: "COMMENT",
        body: "AI Style Suggester: No issues found."
      });
      return;
    }

    await octokit.rest.pulls.createReview({
      owner,
      repo,
      pull_number,
      event: "COMMENT",
      body: `AI Style Suggestions:\n${summary.join("\n")}`,
      comments: reviewComments,
    });

  } catch (error) {
    console.error("Error running AI style suggester:", error);
    setFailed(error.message);
  }
}

run();