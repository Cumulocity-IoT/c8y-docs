---
date: ""
title: Removed non-functional aggregation option from alarm list widget configuration
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
ticket: MTM-66063
version: 1023.14.90
---
Previously, the "Alarm list" widget configuration displayed an aggregation picker in the **History** tab that had no effect, since aggregation is not applicable to alarm data. This option has been removed.