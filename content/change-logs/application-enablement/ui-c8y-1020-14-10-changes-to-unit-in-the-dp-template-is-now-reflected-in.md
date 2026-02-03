---
date: '2024-08-15'
title: >-
  Changing the unit in a data point template is now correctly reflected in
  related "Info gauge" widgets
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
ticket: MTM-60261
version: 1020.14.10
---
In the past, when changing the unit of a data point template, the change was not reflected in the "Info gauge" widgets which were using this data point. This inconsistent behavior has now been fixed. Now, whenever the unit is updated in a data point template, this change will also be immediately visible in the respective "Info gauge" widgets.
