---
date: '2026-03-25'
title: Support extracting strings from gettext and @let syntax in templates
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66340
version: 1023.62.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-03-25'
  - label: apj.cumulocity.com
    date: '2026-03-26'
  - label: jp.cumulocity.com
    date: '2026-03-26'
---
The translation extraction tool previously could not identify text strings marked for translation using the `@let` syntax or the `gettext()` function within Angular templates. This meant that developers using these modern Angular patterns had to use alternative syntax to ensure their text strings were properly extracted for translation. Now the translation extraction tool recognizes both `@let label = 'My text' | translate;` and `{{ condition ? gettext('When true') : gettext('When false') }}` patterns (where `gettext` is exposed as a field in the component class). This allows you to use these more flexible and readable syntax options when annotating text for translation in your Angular templates. For details, refer to the [{{< product-c8y-iot >}} Codex](https://cumulocity.com/codex/components/application-and-system/internationalization/overview#marking-texts-to-be-translated-and-pushing-them-through-the-translation-within-the-source-code).
