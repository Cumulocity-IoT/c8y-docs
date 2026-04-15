---
date: ""
title: Fixed validation errors when exporting dashboards
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
ticket: MTM-66044
version: 1023.68.6
---
Validation errors were incorrectly triggered during the dashboard export process, preventing users from successfully exporting their configurations. This issue has now been resolved. We fixed cases where validation errors appeared for empty dashboards, as well as when dashboards included data graph widgets.