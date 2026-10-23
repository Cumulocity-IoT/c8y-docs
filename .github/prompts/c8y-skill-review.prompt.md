---
agent: agent
---

Review the given skill, a file in content/skills/, and the documentation pages that link to it.

Read first:
- The "Skills" section of README.md, which describes the skill design.
- .github/copilot-instructions.md, the Cumulocity documentation style guide, including its "Skills" rules.

Check the skill for:
- Design: the file is in its topic folder, `content/skills/<topic>/<name>.md`, with a name of lowercase letters, digits, and hyphens. The front matter has `title`, `description`, `when` (when an agent should use the skill, usually starting with "the user wants to"), `weight`, no `sector` (the topic folder sets it), `requires` (`authentication` for every skill that sends REST requests), and `api`. `api` lists only operations of the APIs in data/apis.json, not requests to microservices without a published specification. Each `api` entry has `operation`, `method`, `path`, and `title`. `spec` is a key of data/apis.json or is left out for the Core API.
- API references: each `api` operation exists in the OpenAPI specification of its API (the `spec` URL in data/apis.json) with the same method and path, and its `title` matches the summary of the operation. Every link in the body to `/api/<api>/#operation/<operationId>` names an operation that is listed in `api`, and every operation in `api` is used in the body. Run `python3 scripts/check_skill_api_refs.py <skill file>` in the terminal for this check and include its findings.
- Content: each procedure says which request to send, shows it, and describes the expected result. The required roles are listed. The skill shows REST requests only.
- Linking: at least one documentation page lists the skill in its `skills` front matter, on the page or on the bundle block that covers the task. The skill has no hand-written links back to these pages in its front matter.
- Style: the rules of the style guide.

For each issue found:
1. Quote the original text or front matter
2. Name the rule from the skill design or the style guide
3. Provide the corrected version

Do not change the meaning of the text. Organize the feedback by file, with clear before and after comparisons.
