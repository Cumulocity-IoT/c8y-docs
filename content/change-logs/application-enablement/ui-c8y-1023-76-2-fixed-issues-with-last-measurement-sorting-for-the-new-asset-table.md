---
date: '2026-04-30'
title: Fixed issues with last measurement sorting in the new asset table
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
ticket: MTM-66662
version: 1023.76.2
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-30'
---
The new asset table previously did not sort measurements correctly when you selected the last measurement column, causing the table to display data in an unexpected order. This issue has been fixed, and the last measurement column now sorts as expected.
