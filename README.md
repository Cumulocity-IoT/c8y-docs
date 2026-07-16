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

---
Copyright © 2018-present Cumulocity GmbH. All rights reserved.
