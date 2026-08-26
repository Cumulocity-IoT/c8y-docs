---
date: '2026-08-21'
title: Restored hidden-labels modifier on read-only forms
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
ticket: MTM-67545
version: 1024.15.11
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-21'
  - label: apj.cumulocity.com
    date: '2026-08-24'
  - label: jp.cumulocity.com
    date: '2026-08-24'
  - label: us.cumulocity.com
    date: '2026-08-26'
  - label: cumulocity.com
    date: '2026-08-26'
---
The `hidden-labels` modifier was not being applied correctly to read-only forms, which caused labels to display when they should have been hidden. This modifier is now properly restored and applied to read-only forms, ensuring that labels remain hidden as expected when you use the `hidden-labels` modifier on your forms.
