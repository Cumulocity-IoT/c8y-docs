---
date: '2026-03-31'
title: >-
  Special characters are now correctly escaped in the device registration
  process via EST
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
Previously, during device registration via the EST (Enrollment over Secure Transport) protocol, special characters like `;` or `"` contained in the one-time password were not correctly escaped when sent to the server.
This issue has been fixed. Now special characters are properly escaped and the correct value is received by the server and used in the further registration process.
