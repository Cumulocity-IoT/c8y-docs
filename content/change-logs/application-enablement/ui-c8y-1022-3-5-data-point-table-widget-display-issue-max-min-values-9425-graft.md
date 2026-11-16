---
date: '2025-07-03'
title: Data point table widget now correctly displays maximum and minimum values
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
ticket: MTM-63958
version: 1022.3.5
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In the "Data point table" widget, when displaying both the minimum and maximum values for a data point was selected, the maximum values showed the minimum values instead. This issue has been fixed. When selecting this setting, the maximum values are now shown correctly.
