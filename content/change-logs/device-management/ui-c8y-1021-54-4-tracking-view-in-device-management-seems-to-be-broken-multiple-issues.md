---
date: ""
title: Issues in Tracking tab in Device Management have been fixed
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
ticket: DM-4358
version: 1021.54.4
---
In **Tracking** tab realtime updates of device position were not activated even though the **Realtime** button seemed activated. This has been fixed and now tracking updates both device position and tracking path in realtime. Changing the time range and refreshing the list had no effect. This has been fixed and users can filter events by different time ranges and reload the list.