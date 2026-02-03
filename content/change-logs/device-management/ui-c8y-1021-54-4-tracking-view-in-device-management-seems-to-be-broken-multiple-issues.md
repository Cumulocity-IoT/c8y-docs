---
date: '2025-03-27'
title: Issues in the Tracking tab in the device details have been fixed
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
In the **Tracking** tab in the device details the device position was not updated in realtime even though the **Realtime** button was activated. This has been fixed and now the device position and the tracking path are both updated in realtime. Moreover, changing the time range and refreshing the list had no effect. This has been fixed and users can again filter events by different time ranges.
