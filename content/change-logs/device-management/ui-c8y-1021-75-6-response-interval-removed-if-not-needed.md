---
date: '2026-03-31'
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
version: 1021.75.6
---
Clearing the **Required interval** input on the **Info** tab in the device details now correctly deletes the c8y_RequiredAvailability fragment, so that the fragment is only present when an interval is explicitly configured.
