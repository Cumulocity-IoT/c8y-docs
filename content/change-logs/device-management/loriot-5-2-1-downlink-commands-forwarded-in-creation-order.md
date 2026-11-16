---
date: ""
title: Loriot downlink commands are now forwarded in the order they were created
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-ycWx1InI9
    label: loriot-agent
ticket: DM-7341
version: 5.2.1
---
When more than about ten downlink commands were queued for a Loriot device at the same time, the Loriot agent could forward them to Loriot in a different order than the one in which they were created. Devices that rely on receiving their commands in sequence could therefore act on them in the wrong order.

Downlink commands are now always forwarded in the order they were created, regardless of how many are queued.
