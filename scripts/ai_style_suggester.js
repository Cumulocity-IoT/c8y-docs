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
    const styleGuidePath = path.join(process.cwd(), "scripts", "copilot-instructions.md");
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

    Your job has the following responsibilities:

    ## 1. Heading ID Generation & Validation (IMPORTANT)
    For any added heading line (e.g., "+ ### Something"):
    - If the heading has NO ID:
        → Generate the correct ID using the style guide rules.
    - If the heading HAS an ID:
        → Validate it. If incorrect, suggest the correct ID.
    Rules for IDs:
    - lowercase only
    - hyphens between words
    - remove punctuation/special characters
    - must match normalized heading text
    - format: {#text}

    You MUST evaluate heading IDs.

    ## Output Format (REQUIRED)
    Return ONLY JSON in this exact format:

    [
      {
        "line": <line number relative to patch>,
        "suggestion": "<the full corrected Markdown line>"
      }
    ]

    NO markdown, NO commentary, NO extra text.

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
          body:
          `\`\`\`suggestion
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