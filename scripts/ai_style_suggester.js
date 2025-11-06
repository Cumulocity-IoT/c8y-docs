import fs from "fs";
import path from "path";
import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const token = process.env.GITHUB_TOKEN;
const octokit = getOctokit(token);

async function run() {
  try {
    const { owner, repo, number: pull_number } = context.issue;
    const styleGuidePath = path.join(process.cwd(), "scripts", "copilot-instructions.md");
    const STYLE_GUIDE_TEXT = fs.readFileSync(styleGuidePath, "utf8");

    const { data: files } = await octokit.rest.pulls.listFiles({ owner, repo, pull_number});

    for (const file of files) {
      if (!file.filename.endsWith(".md")) continue;

      console.log(`Analyzing ${file.filename}...`);
      const diff = file.patch;
      if (!diff) continue;

      const prompt = ` Review the following Markdown diff for spelling, grammar, and style issues. Apply the rules from the Cumulocity Documentation Style Guide provided below. Give concise, line-specific suggestions that improve clarity, consistency, and tone. Do not rewrite entire sections; focus on targeted improvements only.

Style guide:
${STYLE_GUIDE_TEXT}

Markdown diff:
${diff}
`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const suggestions = completion.choices[0].message.content?.trim();

      if (suggestions) {
        console.log(`Suggestions for ${file.filename}:\n${suggestions}\n`);
        await octokit.rest.issues.createComment({
          owner,
          repo,
          issue_number: pull_number,
          body: `**AI Style Suggestions for \`${file.filename}\`:**\n\n${suggestions}`,
        });
      }
    }
  } catch (error) {
    console.error("Error running AI style suggester:", error);
    setFailed(error.message);
  }
}

run();