---
date: ""
title: Clear filters button does not reset filter settings
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4319
version: 1021.22.28
---
The **Clear all filters** button in the **All devices** page is intended to reset all filter settings and return the view to its default unfiltered state. However, when clicking the **Clear all filters** button, the filter settings were only temporarily reset until the user visited the **All devices** page again and continued to show filtered results instead of all items. This issue has now been resolved.