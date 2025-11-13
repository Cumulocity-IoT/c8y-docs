---
date: 
title: DevEUI retrieved from uplink request if not explicitly provided
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc--fVxjY7du
    label: actility-agent
ticket: DM-4592
version: 2.0.45
---
Previously, the Actility agent failed to process device requests when the DevEUI (end device identifier) was not included in the request payload.
This issue has been resolved - the agent now correctly retrieves the DevEUI from the uplink request if it is not explicitly provided, ensuring proper request handling.
