---
date: '2025-02-13'
title: Clear all filters button now resets the filter settings properly
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
version: 1021.35.3
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The **Clear all filters** button in the **All devices** page is intended to reset all filter settings and return the view to its default unfiltered state. However, when clicking the **Clear all filters** button, the filter settings were only temporarily reset until the user visited the **All devices** page again and continued to show filtered results instead of all items. This issue has now been resolved.
