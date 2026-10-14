---
agent: agent
---

Review the given recipe, a file in content/recipes/, and the documentation pages that link to it.

Read first:
- The "Recipes" section of README.md, which describes the recipe design.
- .github/copilot-instructions.md, the Cumulocity documentation style guide, including its "Recipes" rules.

Check the recipe for:
- Design: the file name (lowercase letters, digits, hyphens), and the front matter `title`, `description`, `weight`, `sector` (the topic sectors of the task), `requires` (`authentication` for every recipe that sends REST requests), and `api`. `api` lists only operations of the APIs in data/apis.json, not requests to microservices without a published specification. Each `api` entry has `operation`, `method`, `path`, and `title`. `spec` is a key of data/apis.json or is left out for the Core API.
- API references: each `api` operation exists in the OpenAPI specification of its API (the `spec` URL in data/apis.json) with the same method and path, and its `title` matches the summary of the operation. Every link in the body to `/api/<api>/#operation/<operationId>` names an operation that is listed in `api`, and every operation in `api` is used in the body. Run `python3 scripts/check_recipe_api_refs.py <recipe file>` in the terminal for this check and include its findings.
- Content: each procedure says which request to send, shows it, and describes the expected result. The required roles are listed. The recipe shows REST requests only.
- Linking: at least one documentation page lists the recipe in its `recipes` front matter, on the page or on the bundle block that covers the task. The recipe has no hand-written links back to these pages in its front matter.
- Style: the rules of the style guide.

For each issue found:
1. Quote the original text or front matter
2. Name the rule from the recipe design or the style guide
3. Provide the corrected version

Do not change the meaning of the text. Organize the feedback by file, with clear before and after comparisons.
