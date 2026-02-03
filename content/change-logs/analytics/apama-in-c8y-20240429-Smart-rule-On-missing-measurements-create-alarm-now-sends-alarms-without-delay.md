---
date: 2024-08-08
title: Smart rule "On missing measurements create alarm" now sends alarms without delay
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-4461
version: 25.207.0
---
The "On missing measurements create alarm" smart rule now generates the alarms at the time period configured in the smart rule. Previously, the alarms were generated with a delay of approximately one minute.
