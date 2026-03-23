---
date: ""
title: Support extracting strings from gettext and @let syntax in templates (#11526) [GRAFT][release/cd] (#11595)
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66340
version: 1023.62.0
---
# Backport

This will backport the following commits from `develop` to `release/cd`:
- [feat(Web SDK): [MTM-66340] Support extracting strings from gettext
and @let syntax in templates
(#11526)](https://github.com/Cumulocity-IoT/cumulocity-ui/pull/11526)

This pull request adds support for more ways of annotating texts for
translation in Angular templates:

- `@let label = 'My text' | translate;`
- `{{ condition ? gettext('When true') : gettext('When false') }}`
(note: `gettext` must be exposed via component's class and the exposed
field must also be named `gettext`)

It preprocesses HTML and TS files with regex to find the above patterns
and transform them into syntax that can be handled via angular gettext
extractor.