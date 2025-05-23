---
date: ""
title: Response interval value removed when user clears the input
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
ticket: DM-4743
version: 1021.22.82
---
Clearing the input now deletes the fragment, so c8y_RequiredAvailability exists only when an interval is actually configured.