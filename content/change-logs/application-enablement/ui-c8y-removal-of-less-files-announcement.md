---
date: '2026-07-01'
title: Upcoming removal of LESS files following the migration to SCSS
product_area: Application enablement & solutions
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-67215
environment_availability:
---
The {{< product-c8y-iot >}} Web SDK styles in the `@c8y/style` package have been migrated from LESS to SCSS. As a follow-up, the redundant `.less` files will be **removed** from `@c8y/style`. This change is currently available in the `develop` branch and will ship in an upcoming Continuous Deployment (CD) version of the 2026 release. The exact release version will be announced separately. 

**What changes?**

All styling is now authored in SCSS. The `.less` files, LESS variables, and LESS mixins previously shipped in `@c8y/style` are being removed, and the package entry point moves from `main.less` to `main.scss`. The SCSS files provide the same variables, mixins, and compiled output.

**Breaking change**

Custom applications, plugins, or themes that import the removed `.less` files — or that override LESS variables and mixins — will no longer build after upgrading. The build fails with a `Module not found` error for the removed paths.

**Impact**: Any UI customization that relies on the LESS styles is affected, including:

* Direct imports of `@c8y/style` `.less` files, for example `@c8y/style/main.less`, `@c8y/style/branding.less`, or `@c8y/style/login.less`.
* Overrides of LESS variables or mixins imported from `@c8y/style/variables/index.less` and the related `_brand-vars` and `_color-vars` files.
* Custom themes and branding built on the LESS variables.

Applications and plugins that already consume the SCSS styles are not affected.

**Migration**: Switch your imports and overrides to the SCSS equivalents:

* Replace each `.less` import with the matching `.scss` file, for example `@c8y/style/main.scss` and `@c8y/style/branding.scss`.
* Import variables from `@c8y/style/variables/index.scss` instead of the `.less` file.
* Update the import syntax from LESS `@import 'file.less'` to SCSS `@use 'file'` or `@forward 'file'`, and change LESS variable overrides from `@variable-name` to `$variable-name`.

Detailed guidance on styling components and applications with SCSS will be added to the Web SDK Codex documentation when the release is published. <!-- TODO: when the release is published, link to the Codex pages: Component styles (https://cumulocity.com/codex/common-tasks/component-styles) and Application styles (https://cumulocity.com/codex/common-tasks/application-styles) -->
