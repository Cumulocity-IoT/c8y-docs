import fs from "fs";
import path from "path";
import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import Anthropic from "@anthropic-ai/sdk";
import { fileURLToPath } from "url";
import JSON5 from "json5";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const token = process.env.GITHUB_TOKEN;
if (!token) {
  throw new Error("Missing GITHUB_TOKEN");
}
const octokit = getOctokit(token);

function cleanJSON(raw) {
  return raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

function buildPatchIndexToNewLineMap(patch) {
  const lines = patch.split("\n");
  const map = new Map();

  let newLine = null;

  for (let i = 0; i < lines.length; i++) {
    const patchIndex = i + 1;
    const line = lines[i];

    const m = line.match(/^@@\s-\d+(?:,\d+)?\s\+(\d+)(?:,\d+)?\s@@/);
    if (m) {
      newLine = Number(m[1]);
      continue;
    }

    if (newLine == null) continue;

    if (line.startsWith(" ")) {
      newLine += 1;
      continue;
    }

    if (line.startsWith("+") && !line.startsWith("+++")) {
      map.set(patchIndex, newLine);
      newLine += 1;
      continue;
    }

    if (line.startsWith("-") && !line.startsWith("---")) {
      continue;
    }
  }

  return map;
}

async function run() {
  try {
    const { owner, repo, number: pull_number } = context.issue;
    const prFromPayload = context.payload.pull_request;
    let commit_id = prFromPayload?.head?.sha;
    if (!commit_id) {
      const { data: pr } = await octokit.rest.pulls.get({ owner, repo, pull_number });
      commit_id = pr?.head?.sha;
    }
    if (!commit_id) {
      throw new Error("Unable to determine PR head SHA (commit_id).");
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const styleGuidePath = path.join(__dirname, "..", ".github", "copilot-instructions.md");
    const STYLE_GUIDE_TEXT = fs.readFileSync(styleGuidePath, "utf8");

    const { data: files } = await octokit.rest.pulls.listFiles({ owner, repo, pull_number});
    console.log("PR context:", { owner, repo, pull_number });
    console.log("Total files in PR:", files.length);

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
      console.log(`Analyzing ${file.filename}...`);
      if ( !file.filename.endsWith(".md") || !file.filename.startsWith("content/")) {continue};

      console.log(`Analyzing ${file.filename}...`);
      const diff = file.patch;
      console.log("Patch exists:", Boolean(file.patch));
      console.log("Patch length:", file.patch?.length ?? 0);
      if (!diff) continue;
  
      const diffLines = diff.split("\n");
      const numberedDiff = diffLines
        .map((l, i) => `${String(i + 1).padStart(4, "0")}: ${l}`)
        .join("\n");
      const patchIndexToNewLine = buildPatchIndexToNewLineMap(diff);

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
    - Enforce the Variables rules defined below.
    - Only return entries where the corrected line is different from the original added line.
    - Only return entries when a real style violation exists. Do not rewrite text unless strictly required by the style guide.

    Output Format (very important):
    Return ONLY valid JSON:

    [
      { "line": <NUMBERED diff line>, "suggestion": "<corrected line WITHOUT leading +>" }
    ]

    Rules for "line":
    - "line" MUST be the NUMBER from the diff below (4 digits before the colon).
    - Only suggest for lines that start with "+" (but not "+++").

    No commentary.  
    No markdown fences.  
    No extra text.  
    Do not include backticks in the JSON.

    ## Variables

    Use variables (HTML short codes) for certain recurring terms to ensure consistency across the documentation.

    The following terms MUST be replaced by their corresponding variables, based on context.

    ### Variable mapping
    
    | Usage context | Replace with |
    |--------------|--------------|
    | Cumulocity used as a company name | {{< company-c8y >}} |
    | Cumulocity IoT (explicit product name) | {{< product-c8y-iot >}} |

    ### Disambiguation rules (mandatory)

    - Replace **"Cumulocity IoT"** with {{< product-c8y-iot >}} in all valid Markdown text.
    - Replace **"Cumulocity"** with {{< company-c8y >}} **ONLY** when it refers to the company.
    - Do NOT replace "Cumulocity" with the product variable unless "IoT" is explicitly present.
    - Do NOT infer product usage when only "Cumulocity" is written.

    ### Replacement rules

    - Apply replacements ONLY in added Markdown content.
    - Do NOT replace lowercase "cumulocity".
    - Do NOT replace text in:
      - software file names (for example, cumulocity.json),
      - links to GitHub examples or resources,
      - module or package names (for example, com.apama.cumulocity.Measurement),
      - fenced code blocks, inline code, or any code samples.

      ## Style Guide:
      ${STYLE_GUIDE_TEXT}

      ## Diff (NUMBERED — use these line numbers exactly):
      ${numberedDiff}
      `;


      const completion = await anthropic.messages.create({
        max_tokens: 1024,
        temperature: 0,
        messages: [{ role: 'user', content: prompt }],
        model: 'claude-sonnet-4-5-20250929',
      });

      let raw = completion.content?.[0]?.text ?? "[]";
      raw = cleanJSON(raw);
      let suggestions = [];
      try {
        suggestions = JSON5.parse(raw);
        console.log("AI suggestions parsed:", suggestions);

        suggestions.forEach(s => {
          console.log(
            "AI -> patch line:",
            s.line,
            "suggestion:",
            JSON.stringify(s.suggestion)
          );
        });
      } catch (err) {
        console.error("Failed to parse AI JSON, raw output:", raw);
        continue;
      }

      console.log("Patch with indexes:");
      diffLines.forEach((l, i) => {
        console.log(
          String(i + 1).padStart(4, "0"),
          l.startsWith("@@") ? "[HUNK]" : "     ",
          JSON.stringify(l)
        );
      });
      let position = 0;


      diffLines.forEach((line, index) => {
        position += 1;
        console.log(
          "Processing patch line",
          index + 1,
          "GitHub position",
          position,
          "content:",
          JSON.stringify(line)
        );
        if (!line.startsWith('+') || line.startsWith('+++')) {
          console.log("Skipping non-added line at", index + 1);
          return;
        }
        const match = suggestions.find(s => s.line === index + 1);

        if (!match) {
          console.log("No AI suggestion for patch line", index + 1);
          return;
        }

        let replacement = (match.suggestion || "").trim();

        if (replacement.startsWith("+")) {
          replacement = replacement.slice(1).trim();
        }

        const original = line.slice(1);

        const normalize = (s) => s
            .replace(/\u00A0/g, " ")
            .replace(/\s+/g, " ")
            .replace(/\s-\s/g, " - ")
            .trim();

        if (normalize(original) === normalize(replacement)) {
          console.log("Skipping whitespace-only suggestion at patch line", index + 1);
          return;
        }

        const patchLineNumber = index + 1;    
        const newFileLine = patchIndexToNewLine.get(patchLineNumber);
        if (!newFileLine) {
          console.log(
            "Skipping comment: could not map patch line to new-file line",
            patchLineNumber,
            "file:",
            file.filename
          );
          return;
        }

        console.log("Creating review comment:");
        console.log("  File:", file.filename);
        console.log("  Patch line:", index + 1);
        console.log("  GitHub position:", position);
        console.log("  Replacement:", JSON.stringify(replacement));


        reviewComments.push({
          path: file.filename,
          line: newFileLine,
          side: "RIGHT",
          body: `\`\`\`suggestion
${replacement}
\`\`\``
        });

        summary.push(`- ${file.filename}: patch line ${patchLineNumber} → file line ${newFileLine}`);
      });
    }

    if (reviewComments.length === 0) {
      await octokit.rest.pulls.createReview({
        owner,
        repo,
        pull_number,
        commit_id,
        event: "COMMENT",
        body: "AI Style Suggester: No issues found."
      });
      return;
    }
    console.log("======================================");
    console.log("Final review comments to send:");
    reviewComments.forEach((c, i) => {
      console.log(
        `#${i + 1}`,
        "file:",
        c.path,
        "line:",
        c.line,
        "side:",
        c.side,
        "body:",
        c.body.replace(/\n/g, "\\n")
      );
    });
    console.log("======================================");

    await octokit.rest.pulls.createReview({
      owner,
      repo,
      pull_number,
      commit_id,
      event: "COMMENT",
      body: `### AI Documentation Style Review

Inline suggestions are based on the repository style guide.

Affected locations:
${summary.join("\n")}
`,
      comments: reviewComments,
    });

  } catch (error) {
    console.error("Error running AI style suggester:", error);
    setFailed(error?.message ?? String(error));
  }
}

run();