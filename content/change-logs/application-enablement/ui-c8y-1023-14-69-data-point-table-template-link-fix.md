---
date: ""
title: Fixed issue with data point table template linking
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
ticket: MTM-65426
version: 1023.14.69
---
An issue was identified where data point templates could overwrite the device ID, leading to unexpected behavior in some widgets. The linkage between templates and data points has been improved, resolving these issues and ensuring more reliable widget behavior.