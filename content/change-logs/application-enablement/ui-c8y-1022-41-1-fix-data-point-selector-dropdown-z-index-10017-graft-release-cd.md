---
date: '2025-10-16'
title: Fixed data point selector dropdown not being displayed correctly
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
ticket: MTM-64668
version: 1022.41.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The data point selector dropdown was not displayed in the foreground and was overlapped by other elements on the page. This issue has been resolved by adjusting the z-index of the dropdown. The data point selector dropdown will now always appear in the foreground when opened.
