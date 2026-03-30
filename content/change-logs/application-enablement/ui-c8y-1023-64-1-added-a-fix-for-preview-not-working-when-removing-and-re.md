---
date: ""
title: Fixed preview not working when removing and re-adding data points
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
ticket: MTM-65370
version: 1023.64.1
---
When you removed a data point from the data graph widget configuration and re-added it, the preview would not work as expected. This issue has been fixed so that the preview now properly shows data points after they are removed and re-added, allowing you to work with your data point configurations without encountering display issues.