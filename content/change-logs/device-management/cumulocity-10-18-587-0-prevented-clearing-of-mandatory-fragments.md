---
date: 2024-02-06
title: Prevented clearing of mandatory fragments
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-2854
version: 10.18.587.0
---
Clearing of mandatory fragments like type, time, creationTime, owner and source for events, alarms and managed objects is no longer allowed on invocation of SmartREST 2.0 static templates that clear fragments like 107, 307 and 407.