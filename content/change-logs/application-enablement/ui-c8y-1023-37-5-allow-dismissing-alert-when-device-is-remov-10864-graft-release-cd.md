---
date: '2026-02-12'
title: Error alerts can be dismissed when a referenced device no longer exists
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
ticket: MTM-65519
version: 1023.37.5
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-12'
---
Previously, when a device referenced by a widget's data point configuration was deleted, an error alert was displayed that could not be dismissed by the user. With this change, the error alert can now be dismissed as expected.
