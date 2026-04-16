---
date: '2026-04-16'
title: Search for managed object ID now works when pasting values into the search box
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
ticket: MTM-66484
version: 1023.68.4
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-16'
---
Previously, pasting a managed object ID into the search box failed to trigger a search, forcing the user to enter it manually. The search function now correctly detects pasted values and executes automatically.
