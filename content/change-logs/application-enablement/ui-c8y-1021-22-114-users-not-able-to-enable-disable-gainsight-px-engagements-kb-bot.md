---
date: ""
title: Fixed issue with saving "Enable in-product information and communication" setting
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
ticket: MTM-64484
version: 1021.22.114
---
Previously, changes to the "Enable in-product information and communication" setting were temporary and would reset after reloading the application. This issue has been resolved - the setting now saves permanently and persists after application restart.