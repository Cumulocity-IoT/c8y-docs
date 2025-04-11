---
date: ""
title: Fixed issue with lastUpdated field in the alarm details page being empty.
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
ticket: MTM-62788
version: 1021.60.1
---
In the alarm details view, the lastUpdated field was empty which usually shows the time of the last alarm occurrence. This issue has been fixed and the lastUpdated field has been renamed to "Last occurrence" instead. Users can see again when an alarm has been updated by looking at the "Last occurrence" field in the alarm details view.