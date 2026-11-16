---
date: '2025-06-26'
title: Virtual scroll now always shows all items in a list
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
ticket: MTM-63835
version: 1021.80.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In places where virtual scroll was implemented, such as the "Data points table" widget, it could happen on rare occasions that not the entire list was loaded. This issue has now been resolved. Virtual scroll now always shows all list items.
