---
date: ""
title: Adjusted expiration highlight rules for non-CA trusted certificates
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
ticket: MTM-64423
version: 1022.20.2
---
The CA and non-CA certificates in the Trusted certificates page have different validity rules, therefore non-CA certificates will start being highlighted with a warning only < 90 days before their expiration.