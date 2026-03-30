---
date: ""
title: Added a fix for preview not working when removing and re-adding datapoints.  [GRAFT][release/y2026] (#11639)
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
version: 1023.14.132
---
When removing a data point from the "Data graph" widget configuration and re-adding it, the preview did not work as expected. This issue has been fixed so that the preview now properly shows data points that have been removed and re-added, allowing you to work with your data point configurations without encountering display issues.