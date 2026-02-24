---
date: '2026-03-31'
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
Previously, the confirmation message displayed after the device registration via EST (Enrollment over Secure Transport protocol) was the same as in case of the regular device registration, which was confusing. With this change, the displayed message is specific for devices registered via EST, that is, they can directly request the signed certificates and use them to authenticate to the platform without any further manual acceptance process.
