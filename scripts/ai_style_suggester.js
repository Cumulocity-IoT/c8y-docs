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
      You are reviewing a Git diff of a Markdown file. Provide line-specific suggestions only in this JSON format:

      [
        {
          "line": <line number relative to patch>,
          "suggestion": "<short suggestion text>"
        }
      ]

      Do not rewrite full paragraphs. Be concise.
      Apply the Cumulocity Documentation Style Guide:

      ${STYLE_GUIDE_TEXT}

      Here is the diff:

      ${file.patch}
      `;

      const completion = await anthropic.messages.create({
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
        model: 'claude-sonnet-4-5-20250929',
      });

      let raw = completion.content?.[0]?.text ?? "[]";
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

        reviewComments.push({
          path: file.filename,
          position,
          body: `AI Style Suggestion:\n\n${match.suggestion}`
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