---
date: '2026-11-23'
title: Typeahead dropdowns in the Web SDK appear above other content by default
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
ticket: MTM-67297
version: 1025.12.2
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-23'
  - label: apj.cumulocity.com
    date: '2026-11-24'
  - label: jp.cumulocity.com
    date: '2026-11-24'
---
Typeahead dropdowns in the Web SDK could be clipped or hidden when they appeared inside containers with overflow settings, such as cards, panels, or modal dialogs. The typeahead dropdown is now appended to the body of the page by default, so it displays above other content and stays fully visible. Existing applications that use Web SDK typeahead components get this behavior automatically, and you do not need to change your code.
