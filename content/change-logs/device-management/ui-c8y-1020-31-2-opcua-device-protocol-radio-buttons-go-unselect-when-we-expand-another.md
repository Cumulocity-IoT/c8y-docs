---
date: ""
title: Radio button selection in OPC UA device protocol configuration maintained when expanding another variable
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
ticket: DM-1756
version: 10.20.31.2
---
In the OPC UA device protocol configuration, users could select a radio button for a specific variable. However, when expanding another variable in the same view, the previously selected radio button would become unselected. This issue has now been resolved. With this fix, the radio button selection is properly maintained even when expanding other variables in the view. Users no longer need to reselect the desired radio button after inspecting other variables.