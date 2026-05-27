---
mode: agent
applyTo: "content/change-logs/**/*.md"
---

## Writing a changelog entry

Write a change log entry from the provided input following the Cumulocity documentation style guide in .github/copilot-instructions.md.

Structure the entry with these three components in one flowing text:

1. **Context**: Provide background explaining why this change was made (1-2 sentences)
2. **Change**: Describe what changed from a user perspective, comparing the old behavior to the new behavior (2-3 sentences)
3. **Impact**: Explain how this affects users and their existing installations, considering tenants, users, applications, and devices (1-2 sentences)

## Formatting requirements

- Write as flowing paragraphs, not separate sections with headings
- Use only one line break to separate paragraphs (maximum 2-3 paragraphs total)
- Do not use "Context:", "Change:", or "Impact:" as headings or labels
- Follow style guide rules: bold for UI elements, present tense, active voice, proper terminology
- Focus on user benefits while acknowledging what was previously broken (for fixes)
- Write in a positive, solution-focused tone

## Documentation links

Add a relevant documentation link at the end using this format:
`For details, see [page title](relative/path/to/page.md).`

Include a link when the change relates to documented features or requires user action.

## Examples of when to include multiple paragraphs

- Breaking changes requiring migration steps
- Complex features affecting multiple user workflows
- Changes with significant installation or upgrade impacts

Keep the entry concise but complete. Prioritize accuracy and user-relevant details over brevity.

---

## Reviewing a changelog entry

When reviewing an existing changelog entry, check the following:

### Structure
- Does the body follow the Context → Change → Impact flow (without using those words as labels)?
- Is it written as flowing paragraphs (not a list or separate sections with headings)?
- Are there 2-3 paragraphs maximum?
- If the change affects documented features, is a documentation link included at the end?

### Style guide compliance
Apply all rules from .github/copilot-instructions.md, including:
- Active voice and present tense
- Sentence-style capitalization
- Bold formatting for UI elements
- Correct variable shortcodes for Cumulocity product and company names
- No prohibited terms (for example, "please", "blacklist", "clone")
- American English spelling
- Serial (Oxford) commas in lists of 3 or more items

For each issue found:
1. Quote the original text
2. Describe the specific violation
3. Provide a corrected version with a brief explanation
