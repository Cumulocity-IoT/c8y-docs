import fs from "fs";
import path from "path";
import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import Anthropic from "@anthropic-ai/sdk";

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
    const styleGuidePath = path.join(process.cwd(), "scripts", "documentation-style-guide.md");
    const STYLE_GUIDE_TEXT = fs.readFileSync(styleGuidePath, "utf8");

    const { data: files } = await octokit.rest.pulls.listFiles({ owner, repo, pull_number});
    const reviewComments = [];
    const summary = [];

    for (const file of files) {
      if ( !file.filename.endsWith(".md") || !file.filename.startsWith("content/")) {continue};

      console.log(`Analyzing ${file.filename}...`);
      const diff = file.patch;
      if (!diff) continue;

  const prompt = `
  You are reviewing a Git diff of a Markdown file.

  Follow the style guide STRICTLY.  
  Do NOT use any rules, assumptions, or conventions that are not in the style guide.  
  The style guide is the ONLY source to follow and apply it exactly as written.

  Review ONLY the added lines in the diff (lines starting with '+').  
  If an added line violates any style guide rule (headings, heading IDs, capitalization, terminology, etc.),  
  produce a corrected version of that line.

  Output Format (very important):
  Return ONLY valid JSON in this exact structure:

  [
    {
      "line": <line number relative to patch>,
      "suggestion": "<the full corrected Markdown line>"
    }
  ]

  No commentary.  
  No markdown fences.  
  No extra text.  
  Do not include backticks in the JSON.

    ## Style Guide:
    ${STYLE_GUIDE_TEXT}

    ## Diff:
    ${file.patch}
    `;


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
        const match = suggestions.find(s => s.line === index + 1);

        if (!match) return;

        const replacement = (match.suggestion || "").trim();

        reviewComments.push({
          path: file.filename,
          position,
body: `\`\`\`suggestion
${replacement}
\`\`\``
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