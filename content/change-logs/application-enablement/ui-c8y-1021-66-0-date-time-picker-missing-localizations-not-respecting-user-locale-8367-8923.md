---
date: '2025-05-08'
title: Date-time picker now respects user locale and includes missing localizations
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
ticket: MTM-62659
version: 1021.66.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The date-time picker component did not respect the user´s locale setting, resulting in missing localizations. This issue has been fixed. Users will now not only see the date-time picker in their preferred language and format but every date and time displayed in the UI.
