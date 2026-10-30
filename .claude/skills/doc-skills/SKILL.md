---
name: doc-skills
description: Write, update, or review documentation skills (content/skills/) and the links to them - check a skill against the skill design, verify its API references against the published OpenAPI specifications, and check its style. Use when the user writes or changes a skill, adds `skills:` to a documentation page, adds an API to data/apis.json, or asks to verify or review skills.
---

# Skills

Skills are task-focused how-tos for people and AI agents. Documentation pages link to
them with `skills:` front matter and show them in a **Skills** tab; each skill links to
the API operations it uses with `api:` front matter.

Read the "Skills" section of `README.md` first: it is the skill design (front matter,
linking, `data/apis.json`, templates). Read `.github/copilot-instructions.md` for the
style guide, including its "Skills" rules. This skill assumes both and covers the
workflow.

## Step 0: Resolve the scope

- **The user names files or skills** - use them.
- **Otherwise** - take the changes of the current branch:
  `git diff --name-only origin/develop...HEAD` plus `git status --short`. In scope are
  `content/skills/**/*.md`, `data/apis.json`, and every content file whose diff adds or
  removes a `skills:` entry.
- **A changed documentation page** - also review the skills it names.
- **A changed skill** - also find the pages that link to it:
  `grep -rln --include='*.md' -E '^\s*-\s*<name>\s*$' content | xargs grep -l '^skills:'`.

Tell the user the resolved scope in one line before you continue.

## Step 1: Check the design

For each skill in scope:

| Check | Rule |
|---|---|
| File | `content/skills/<topic>/<name>.md` in the folder of its topic; `<name>` of lowercase letters, digits, and hyphens, unique across topics. A skill outside a topic folder is a finding |
| `title` | The task in sentence case, without "To" |
| `description` | One sentence, starts with a verb, says what the reader does. It is the card text, the llms.txt note, and the skill description for AI agents |
| `sector` | None in the skill: the `cascade` of the topic `_index.md` sets it. A skill that lists `sector` itself is a finding |
| `requires` | `authentication` for every skill that sends REST requests; other skills only if the reader must follow them first. Each entry names an existing skill |
| `api` | Every operation the body sends, in the order of use; each entry with `operation`, `method`, `path`, `title`; `spec` only for APIs other than the Core API, and then a key of `data/apis.json`. Requests to microservices without a specification in `data/apis.json` (`/service/...`) are not listed |
| Back links | None in the skill. The "Linked from the documentation" box is computed from the `skills:` lists |
| Linked | At least one documentation page or bundle block lists the skill in `skills:`. A skill nobody links to has no Skills tab entry |

For each documentation page in scope: `skills:` sits on the page itself or on the bundle
block (file in `<page>-bundle/`) that covers the task, and names existing skills. Its
**Related topics** box (`c8y-admon-related`) has no link to an API that a skill of the
page covers; links to APIs that no skill of the page covers stay.

## Step 2: Verify the API references

Run the check script on the skills in scope (without arguments it checks all skills):

```bash
python3 scripts/check_skill_api_refs.py content/skills/<topic>/<name>.md
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
- The facts match the API reference: compare what the skill states about an operation
  (required fields, statuses, error codes, side effects) with the operation description
  in the specification. When the skill states a platform behavior that the
  specification does not cover, ask the user for a source rather than guessing.
- The style guide rules, as in `.github/prompts/c8y-standard-review.prompt.md`.

## Step 4: Build and look at the result

1. Build the site (see README "Skills > Verify a skill" for the Hugo version note). The
   build fails on an unknown skill name in `skills:` or an unknown `spec`.
2. Open the rendered pages: the skill page (the **Use with an AI agent** box with the skill name and working **Copy SKILL.md** and **Download skill** buttons, the "API reference" and "Linked from the documentation"
   boxes, the procedures in the table of contents), the **Skills** tab of each linking
   page (cards with "Linked from" and the API chips), and the topic page (the skill
   card, and the skill in the left navigation).
3. Read the Markdown version, `/docs/skills/<topic>/<name>/index.md`: front matter with `name`
   (`cumulocity-<name>`) and `description`, "Before you start" with the required skills,
   the skill, "API reference" grouped by API, "Linked from the documentation". It is the
   `SKILL.md` of the skills download: check that `skills/download/manifest.json` lists it.

## Step 5: Report or fix

- **Review request** - report each finding with the quoted text, the rule from the design
  or style guide, and the corrected version, grouped by file. Do not change files.
- **Writing request** - apply the fixes, then repeat Steps 1-4 for the changed files.

Report what you could not verify (for example, a platform behavior without a source)
separately from the findings, so that the user can decide.
