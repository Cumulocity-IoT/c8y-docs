# Cumulocity documentation website

<https://cumulocity.com/guides> - releases 10.18 and older
<https://cumulocity.com/docs> - CD and yearly releases

**Built with [Hugo](https://gohugo.io/)** (version 0.92.1)

## Development environment

- Clone the repository.
- Install Hugo by using snap `snap install hugo --channel=extended`.
- Open a terminal window in the project directory and type `hugo server`. Specify the subdirectory that contains your content, for example http://localhost:1313/guides/users-guide/. Specifying only http://localhost:1313/guides results in a 404 error.

Details are described in the "How to contribute to the Cumulocity documentation" process document. Contact the Cumulocity documentation team for access.

## Structure for /guides (for releases 10.18 and older)

The Cumulocity documentation website architecture has the following structure:

- 1st level  - for example, *<http://cumulocity.com/guides/users-guide/>*
  - 2nd level - renders as a single page, for example *<http://cumulocity.com/guides/users-guide/administration/>*
    - Anchor section - anchor tag in the subsection page, for example *<http://cumulocity.com/guides//users-guide/administration/#managing-permissions>*

The website is built with a mix of front matter and directory structure.


## Structure - /docs (for CD and yearly releases)

The Cumulocity documentation website architecture has the following structure:

- 1st level  - for example, *<http://cumulocity.com/docs/platform_administration>*
  - 2nd level - for example *<http://cumulocity.com/docs/platform_administration/standard-tenant/>*
    - 3rd level - renders as a single page, for example *<http://cumulocity.com/docs/standard-tenant/managing-permissions>*
      - Anchor section - anchor tag in the subsection page, for example *<http://cumulocity.com/docs/standard-tenant/managing-permissions/#global-roles>*

The website is built with a mix of front matter and directory structure.


## Adding content

### Add a new section

Note that in the new documentation structure (/docs) adding level 1 or level 2 sections is restricted to the admin users of the c8y-docs repo. If you want to add a new section in these levels contact the documentation team.

Before adding a new section, check if the content fits in any of the available sections.

A new section is defined by a Markdown file with the following front matter:

```yaml
---
title: My new section # add the section title
bundle: new-section # add the directory holding the section pages
icon: "c8y-icon c8y-icon-tools" # use either fontawesome or c8y-icons
type: root # don't change
layout: root # don't change
weight: 90 # order the section in the section dropdown in ascending order
---
```
Grab the icon classes in the [Styleguide](https://styleguide.cumulocity.com/#/icons/cumulocity).

### Add the section root directory

All guides are stored in the `content` directory. To add a new section, create a directory here and name it with the `bundle` value set in the front matter.

### Add a subsection

Inside the newly created directory create a Markdown file with the name you wish to use as a URL — for example `introduction.md` with the following front matter:

```yaml
---
title: Introduction to Cumulocity # the page title
layout: bundle # don't change
weight: 10 # set the position of the page within the section in ascending order
aliases: # if needed, add the redirects here, otherwise remove this
  - /concepts/introduction-to-cumulocity/
  - /concepts/introduction-to-cumulocity.html
---
# add optional content as Markdown
Cumulocity gives you very fast visibility and control over your remote assets, be these houses, cars, machines or any other assets that you need to manage.
```

If you're looking to have a short page without anchors, you're good to go, but if you want to add multiple subsections with anchors then proceed to the next step.

When adding multiple subsections, the content provided in this file will be rendered as a lead in the top of the page.

### Add blocks of content with anchors to a page

To display multiple blocks of content and provide anchor links to display in the navigator, you'll have to follow these steps:

  1. Add a directory with the exact same name as the Markdown file adding the suffix `-bundle`, e.g. `introduction-bundle`.

&nbsp;

  2. Add a `index.html` file into the new directory with the following front matter:

```yaml
---
title: Introduction # not important as we won't use it, but we need the title
headless: true # states that all content inside this directory is just a resource to be used in another page
---
```

  3. Add a Markdown file for each block of content with the following front matter:

```yaml
---
title: Overview # will be used as anchor, i.e. guides/users-guide/introduction/#overview
weight: 10 # to set the position in the page
---

## Add content as Markdown or HTML

* Certified hardware kits and software libraries you can use to bring your remote assets into the cloud.
* Device management, data visualization and remote control functionality through the web.
* Rapid customization of the above through [real-time processing](/concepts/realtime) and [Cumulocity applications](/concepts-introduction/#application-enablement).
* APIs for extending the existing functionality or interfacing Cumulocity with your other IT services such as ERP or CRM systems. Cumulocity can also host your HTML5 applications.
[…]
```

### Add media

Media should be added to `/static/images/`. Add a new directory if none of the available suits your needs.

Keep all file names URL-friendly (lowercase, no special characters, and no empty spaces).

To use the images in your pages, just add the relative path, for example: `![image title](/images/<directory name>/<file name>)`.


## llms.txt for AI agents

The site publishes an [llms.txt](https://llmstxt.org/) catalog so AI agents can navigate the documentation efficiently. It is **generated at build time** — never commit a static copy, and never hardcode the host in the templates.

Three tiers are produced:

- `/docs/llms.txt` — a lean hub with one link per documentation set (sector), plus canonical links and an `Optional` section.
- `/docs/sector/<sector>/llms.txt` — one spoke per sector, indexing every page in that sector.
- `/docs/llms-full.txt` — the full text of every page, for bulk ingestion.

How it works:

- The `llmstxt` and `llms-full` output formats are defined in `config.toml` and enabled on the home page.
- Templates live in the theme: `themes/c8ydocs/layouts/index.llmstxt.txt` (hub), `_default/term.llmstxt.txt` (spokes), and `index.llms-full.txt` (full text).
- Sectors come from the `sector` taxonomy. A page joins its sector spoke automatically through its `sector` front-matter field — no extra step.
- URLs are built from `baseURL`.

To add or change a documentation set, edit its landing page at `content/sector/<sector>/_index.md`: set a `title`, a one-line `description` (used as the catalog note), and `outputs: ["HTML", "llmstxt"]` to publish its spoke.

The generated files must follow the llms.txt grammar (every non-blank line after the first `##` heading is a heading or a link). Verify after building:

```bash
hugo
node scripts/lint-llmstxt.mjs
```

## Skills

Skills are task-focused instructions at `/docs/skills/`, written for AI agents first and people second. Each skill describes one task, for example sending an operation to a device, with the REST API requests it needs. Every skill is published as an agent skill (`/docs/skills/<topic>/<name>/index.md`, the same text as its `SKILL.md` in the download) and as a page for people. Documentation pages show the skills for their topic in a **Skills** tab, and each skill links to the API operations it uses.

These documentation skills are not the Claude Code skills in `.claude/skills/`, which help to maintain this repository.

Links are written in one direction only:

```
documentation page --(skills:)--> skill --(api:)--> API reference (<API URL>#operation/<operationId>)
```

The **Linked from the documentation** box on a skill page is computed from the `skills:` lists of the documentation pages. Never add these back links by hand.

Skills are a documentation set of their own, structured like the others:

- The `skills` sector (`content/sector/skills/_index.md`) adds the **Skills** tile to the home page and an entry to `llms.txt`. The tile offers **Download all skills**. Its landing page, `/docs/sector/skills/`, shows one tile per topic, each with **Download skills** for that topic.
- Each topic is a folder, `content/skills/<topic>/`, with an `_index.md` and a card, `content/skills-<topic>-card.md` (`bundlefolder: skills/<topic>`). The topics are `platform-administration`, `device-management`, and `application-enablement`.
- The `_index.md` of a topic gives every skill in its folder its sectors through `cascade`: `skills`, which puts the skill into the Skills documentation set, and the topic sector, which adds it to that topic's `llms.txt`. A skill has no `sector` of its own.
- The topic page, `/docs/skills/<topic>/`, lists the skills of the topic. On a skill page, the left navigation lists the skills of its topic.
- `/docs/skills/` redirects to the landing page. Its `index.md` is the catalog of all skills.

To add a topic, add a folder with an `_index.md` (copy one, then change `title`, `description`, `weight`, and the topic sector in `sector` and `cascade`) and a card.

### Add a skill

1. Create `content/skills/<topic>/<name>.md`. The file name is the name of the skill: lowercase letters, digits, and hyphens, unique across all topics. Documentation pages refer to the skill by this name.
2. Add the front matter:

   ```yaml
   ---
   title: Send an operation to a device      # the task, in sentence case
   description: Check that a device supports an operation, create the operation, ...   # one sentence, shown on cards, in llms.txt, and to AI agents
   when: "the user wants to send an operation to a device, ..."   # when an agent should use the skill: SKILL.md adds "Use when <when>." to the description
   weight: 20                                 # order in the left navigation
   requires:                                  # optional: skills to follow first, listed in the Requirements box and as "Before you start" in SKILL.md
     - authentication                         # every skill that sends REST requests builds on this one
   api:                                       # every API operation the skill uses, in the order of use
     - operation: postOperationCollectionResource   # the operationId in the OpenAPI specification
       method: POST
       path: /devicecontrol/operations
       title: Create an operation             # the summary of the operation in the API reference
       spec: core                             # optional, default core: a key of data/apis.json
   ---
   ```

   `api` lists only operations of the APIs in `data/apis.json`. Requests to microservices without a published OpenAPI specification (for example `/service/opcua-mgmt-service/...`) appear only in the text of the skill.

3. Write the body as described in the "Skills" section of `.github/copilot-instructions.md`: `### To ...` procedures, REST requests in `http` code blocks, each linked to its operation in the API reference. Skills show REST requests only, no CLI commands.
4. Link the skill from the documentation. Add `skills:` to the front matter of the page, or of the block in its `<page>-bundle/` folder that covers the task:

   ```yaml
   skills:
     - send-operation
   ```

   The page then shows the **Skills** tab. The card of the skill links back to the block that names it.

   The skill cards link to the API reference, so the **Related topics** box of the page (`c8y-admon-related`) lists documentation pages only. Remove the links to the APIs that the skills of the page cover. Keep a link to an API that no skill of the page covers.

### API references

`data/apis.json` lists the API references that skills can link to (Core, DTM, DataHub, Data Preparation): the URL of the reference and the URL of its published OpenAPI specification. Operation links have the form `<url>#operation/<operationId>` for all of them. To link to another API, add an entry. Its key is the value of `spec` in the skills.

### Verify a skill

1. Build the site. The build fails if a `skills:` entry names no skill, or if an `api` entry names an API that `data/apis.json` does not list. If your Hugo version rejects the HTML content files of this repository (`"text/html" is not whitelisted`), run `HUGO_SECURITY_ALLOWCONTENT='.*' hugo server`.
2. Check the API references. The build does not compare them with the API: each operation must exist in the OpenAPI specification of its API (the `spec` URL in `data/apis.json`) with the same method and path, and the `title` must match its summary. The check script does this for the `api` front matter and for the operation links in the text:

   ```bash
   python3 scripts/check_skill_api_refs.py            # all skills
   python3 scripts/check_skill_api_refs.py content/skills/send-operation.md
   ```
3. Check the rendered pages: the **Skills** tab of each linking page, the skill page with the required skills in its **Requirements** box, the topic page, and the Markdown version of the skill (`/docs/skills/<topic>/<name>/index.md`). The build fails if a `requires:` entry names no skill, or if two skills have the same name.
4. Check the agent skill format. The pull request build runs the validator of the Agent Skills specification, [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref), on the `SKILL.md` of every skill (`.github/workflows/pull-request.yml`). It checks the front matter and that the name matches the folder.

### Machines first

The pages put the agent skill first and the reading view second:

- A skill page opens with **Use with an AI agent**: the skill name, where to save the `SKILL.md`, the skills it builds on, and the buttons **Copy SKILL.md** and **Download skill** (a ZIP file with the `cumulocity-<name>/SKILL.md` folder). The text for people follows.
- Every skill card, in the **Skills** tab and on the topic pages, shows the skill name and a **Download skill** button.
- The downloads sit on the cards one level up, like **Download PDFs** on other cards: **Download all skills** on the **Skills** card of the home page, and **Download skills** on each topic card of the landing page.

### Download all skills

The **Download all skills** button on the **Skills** card of the home page gives a ZIP file with one folder per skill: `cumulocity-skills/cumulocity-<name>/SKILL.md`, plus a `README.md` with the install steps and the required credentials. The `cumulocity-` prefix keeps the skill names apart from other installed skills. A skill's `index.md` is the same text as its `SKILL.md`.

**Download skills** on a topic card gives the skills of the topic, the skills they build on (`requires`), and the README.

The build publishes the files and a `skills/download/manifest.json` that lists them, all and per topic (`layouts/skills/list.md`, with the text from `layouts/partials/skills/skill.txt`). The card buttons come from `layouts/partials/skills/download-button.html`. They zip the files in the browser (`static/js/skills-download.js`, which loads JSZip from `static/js/vendor/jszip.min.js` on the first download), so there is no fixed ZIP URL.

For an AI-assisted review, use the Claude Code skill `doc-skills` (`.claude/skills/doc-skills/`) or the Copilot prompt `c8y-skill-review.prompt.md`.

The templates live in the theme: `layouts/skills/` (skill page, topic page, the `/skills/` redirect, and their Markdown versions), `layouts/partials/skills/`, the **Skills** tab in `layouts/_default/bundle.html` with `initPageTabs()` in `static/js/main.js`, and the styles in `assets/scss/_page-tabs.scss`.

## Redirects

Redirects must be processed through aliases. Add aliases as an array, and make sure to remove `/docs` or `/guides` out of the URL. Check the following example:

```yaml
---
title: Introduction to Cumulocity
layout: bundle
weight: 10
aliases:
  - /concepts/introduction-to-cumulocity/
  - /concepts/introduction-to-cumulocity.html
# this will redirect cumulocity.com/docs/concepts/introduction-to-cumulocity/
# to cumulocity.com/docs/concepts/introduction
---
```

## Deploying to cumulocity.com/guides

Cumulocity provides documentation for multiple releases. You must create a release branch for every public release, for example `release/r10.16.0`. When creating these branches follow the next steps:
- Create the branch following the same pattern: `release/r[version number]`

- Edit the `config.toml` file and append the version number to the base URL, for example: `baseURL = "https://cumulocity.com/docs/r10.16.0"`
- Still on `config.toml` change the `guidesRedirect` to target the about page on the release, for example: `guidesRedirect = "https://cumulocity.com/docs/r10.16.0/welcome/#introduction"`
- Add the file `properties.json` adding the name and the long name for the release version, for example: ```{
  "name":"r10.16.0",
  "longname": "Release 10.16.0"
}```
- Deploy using the Jenkins task `Deploy-c8y-docs-manual-release` and provide the release version
- Deploy the `default` branch using the Jenkins task `Deploy-c8y-docs`  to regenerate the version dropdown links

## Deploying to cumulocity.com/docs

to be added

## Automatic cherry-picking and labels

Automatic cherry-picking allows you to automatically cherry-pick your PRs to one or multiple release branches.
It works via the [backport-github-action](https://github.com/sqren/backport-github-action) which uses the [backport cli tool](https://github.com/sqren/backport) internally.

### To enable automatic cherry-picking on a PR

To enable automatic cherry-picking on a PR, add the label `auto-backport` to it.
Otherwise the responsible GitHub action is not going to be triggered.

To select the target branches you would like to cherry-pick your PR to, add labels of the following structure: `auto-backport-to-<targetBranch>`.
For example: `auto-backport-to-release/r10.15.0` to cherry-pick it to the branch `release/r10.15.0` or `auto-backport-to-release/r10.14.0` for the branch `release/r10.14.0`.

The feature is triggered by either merging a PR with the `auto-backport` label or by adding the `auto-backport` label to an already closed and merged PR.
In the latter case, ensure that you first add the labels containing the target branches and then finally the `auto-backport` label.
Otherwise the automation starts without any target branches.

### Details

The PRs created by this GitHub action will have their heading prefixed with `[GRAFT] [<targetBranch>]`. So, for example, for `release/r10.15.0` as the target branch and `[MTM-47706] fix publishing documentation` as the original PR heading, it results in  `[GRAFT] [release/r1015.0.0] [MTM-47706] fix publishing documentation` as the heading for the backport PR.
In case an assignee was set for the original PR, the cherry-picked PRs will also receive the same assignee. You must add reviewers manually after the cherry-picked PRs have been created.

The creation of cherry-picked PRs can take a few minutes.
If you are an assignee of the original PR, you receive an email notification once the cherry-picked PRs have been created.
The original PR is updated with a comment that contains links to the newly created cherry-picked PRs.

In case of a merge conflict while cherry-picking to a specific release branch, the branch will be skipped. Information on skipped branches is also included in the comment added to the original PR.
In that case you will have to take care of cherry-picking manually and resolve the conflicts.
This is not going to influence the other release branches as long as they do not have conflicts.

## VS Code Copilot review

This repository includes standard prompts for reviewing documentation against Cumulocity standards and style. They use the `c8y` prefix.

c8y-standard-review.prompt.md - Review of documentation with particular focus on Cumulocity standards and style.
c8y-change-log-review.prompt.md - Specific review of a change log entry.
c8y-skill-review.prompt.md - Review of a skill against the skill design, its API references, and the style guide.

---
Copyright © 2018-present Cumulocity GmbH. All rights reserved.
