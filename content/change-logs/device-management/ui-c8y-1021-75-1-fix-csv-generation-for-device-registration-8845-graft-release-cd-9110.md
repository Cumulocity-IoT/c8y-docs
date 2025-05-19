---
date: ""
title: Fixed a special character issue during device registration via EST
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
ticket: MTM-63252
version: 1021.75.1
---
Fixed an issue with device registration via EST protocol (Enrollment over Secure Transport) in case OTP contained special characters like `;` or `"`, which were not correctly escaped when sent to server.
Now they are properly escaped and correct value is received by server and used further in the registration process.