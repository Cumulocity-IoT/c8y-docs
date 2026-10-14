---
name: recipes
description: Write, update, or review documentation recipes (content/recipes/) and the links to them - check a recipe against the recipe design, verify its API references against the published OpenAPI specifications, and check its style. Use when the user writes or changes a recipe, adds `recipes:` to a documentation page, adds an API to data/apis.json, or asks to verify or review recipes.
---

# Recipes

Recipes are task-focused how-tos for people and AI agents. Documentation pages link to
them with `recipes:` front matter and show them in a **Recipes** tab; each recipe links to
the API operations it uses with `api:` front matter.

Read the "Recipes" section of `README.md` first: it is the recipe design (front matter,
linking, `data/apis.json`, templates). Read `.github/copilot-instructions.md` for the
style guide, including its "Recipes" rules. This skill assumes both and covers the
workflow.

## Step 0: Resolve the scope

- **The user names files or recipes** - use them.
- **Otherwise** - take the changes of the current branch:
  `git diff --name-only origin/develop...HEAD` plus `git status --short`. In scope are
  `content/recipes/*.md`, `data/apis.json`, and every content file whose diff adds or
  removes a `recipes:` entry.
- **A changed documentation page** - also review the recipes it names.
- **A changed recipe** - also find the pages that link to it:
  `grep -rln --include='*.md' -E '^\s*-\s*<name>\s*$' content | xargs grep -l '^recipes:'`.

Tell the user the resolved scope in one line before you continue.

## Step 1: Check the design

For each recipe in scope:

| Check | Rule |
|---|---|
| File name | `content/recipes/<name>.md`, `<name>` of lowercase letters, digits, and hyphens |
| `title` | The task in sentence case, without "To" |
| `description` | One sentence, starts with a verb, says what the reader does. It is the card text, the llms.txt note, and the skill description for AI agents |
| `sector` | Exactly the topic sector(s) of the task (keys of `content/sector/`), usually the sector of the page that links the recipe. Not the documentation set of the Recipes section: that is the sector of `content/recipes-card.md` |
| `requires` | `authentication` for every recipe that sends REST requests; other recipes only if the reader must follow them first. Each entry names an existing recipe |
| `api` | Every operation the body sends, in the order of use; each entry with `operation`, `method`, `path`, `title`; `spec` only for APIs other than the Core API, and then a key of `data/apis.json`. Requests to microservices without a specification in `data/apis.json` (`/service/...`) are not listed |
| Back links | None in the recipe. The "Related documentation" box is computed from the `recipes:` lists |
| Linked | At least one documentation page or bundle block lists the recipe in `recipes:`. A recipe nobody links to has no Recipes tab entry |

For each documentation page in scope: `recipes:` sits on the page itself or on the bundle
block (file in `<page>-bundle/`) that covers the task, and names existing recipes.

## Step 2: Verify the API references

Run the check script on the recipes in scope (without arguments it checks all recipes):

```bash
python3 scripts/check_recipe_api_refs.py content/recipes/<name>.md
```

It downloads the OpenAPI specifications from the `spec` URLs in `data/apis.json` and
checks:

| Finding | Meaning | Fix |
|---|---|---|
| ERROR operation does not exist | The `operation` is not an operationId of that API, or `spec` names the wrong API | Look the operation up in the API reference and correct `operation` or `spec`, in the front matter and in the body link |
| ERROR method / path | `method` or `path` differs from the specification | Take them from the specification |
| ERROR API not listed | `spec` is not a key of `data/apis.json`, or a body link points to an API reference that it does not list | Correct the key, or add the API to `data/apis.json` |
| ERROR link not listed | The body links an operation that `api` does not list | Add the operation to `api`, in the order of use |
| WARN title | `title` differs from the operation summary | Use the summary, unless it is too long for a chip; then keep a shortened title on purpose |
| WARN not linked in the body | An `api` operation is not used in any procedure | Remove it from `api`, or add the procedure that uses it |

The script needs network access to `cumulocity.com`. It does not check `#tag/` or
`#section/` links; the Link Checker workflow does (see the `fix-broken-links` skill).

## Step 3: Check the content and style

- Each procedure says which request to send, shows it in an `http` code block, links it
  to its operation, and describes the expected result (HTTP status, relevant response
  properties) and the relevant error statuses.
- The required roles are listed in a `{{< c8y-admon-req >}}` admonition.
- REST requests only, no CLI commands. Placeholders in angle brackets inside code
  (`<device_id>`), introduced in the text before first use.
- The facts match the API reference: compare what the recipe states about an operation
  (required fields, statuses, error codes, side effects) with the operation description
  in the specification. When the recipe states a platform behavior that the
  specification does not cover, ask the user for a source rather than guessing.
- The style guide rules, as in `.github/prompts/c8y-standard-review.prompt.md`.

## Step 4: Build and look at the result

1. Build the site (see README "Recipes > Verify a recipe" for the Hugo version note). The
   build fails on an unknown recipe name in `recipes:` or an unknown `spec`.
2. Open the rendered pages: the recipe page (API reference and Related documentation
   boxes, the procedures in the table of contents), the **Recipes** tab of each linking
   page (cards with "Linked from" and the API chips), and the recipes overview (the
   recipe in its topic group).
3. Read the Markdown version, `/docs/recipes/<name>/index.md`: front matter with `name`
   (`cumulocity-<name>`) and `description`, "Before you start" with the required skills,
   the recipe, "API reference" grouped by API, "Related documentation". It is the
   `SKILL.md` of the skills download: check that `recipes/skills/manifest.json` lists it.

## Step 5: Report or fix

- **Review request** - report each finding with the quoted text, the rule from the design
  or style guide, and the corrected version, grouped by file. Do not change files.
- **Writing request** - apply the fixes, then repeat Steps 1-4 for the changed files.

Report what you could not verify (for example, a platform behavior without a source)
separately from the findings, so that the user can decide.
