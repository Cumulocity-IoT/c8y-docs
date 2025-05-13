---
date: ""
title: Improved confirmation message after device registration via EST
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
ticket: MTM-63399
version: 1021.73.2
---
Previously, the final message displayed after completed device registration via EST was the same as in case of regular registation, which was confusing for the users. With this change, the displayed message is more relevant for devices registered via EST, i.e. that they can directly request the signed certificates and use them to authenticate to the platform without any further manual acceptance process.