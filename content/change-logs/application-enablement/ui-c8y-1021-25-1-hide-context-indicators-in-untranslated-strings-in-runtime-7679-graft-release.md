---
date: '2025-01-09'
title: Hide context indicators in untranslated strings at runtime
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
ticket: MTM-61194
version: 1021.25.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the past, untranslated strings shown in applications might have included additional context indicators which were confusing for end users and not intended. With this change, context indicators are now hidden for untranslated strings at runtime. This improves the user experience when the strings are not yet translated, as end users will no longer see technical details not relevant to them.
