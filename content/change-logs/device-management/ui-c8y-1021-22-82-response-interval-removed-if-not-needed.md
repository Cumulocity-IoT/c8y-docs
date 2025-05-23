---
date: ""
title: Response interval value deleted when clearing the required interval input
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
Clearing the Required Interval input in the Device Info widget now deletes the c8y_RequiredAvailability fragment, so the fragment is present only when an interval is explicitly configured.