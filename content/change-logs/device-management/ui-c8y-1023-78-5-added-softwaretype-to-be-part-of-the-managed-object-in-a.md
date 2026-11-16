---
date: '2026-05-06'
title: Device profile assignment now includes software type in operations
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
ticket: DM-5994
version: 1023.78.5
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-06'
  - label: apj.cumulocity.com
    date: '2026-05-07'
  - label: jp.cumulocity.com
    date: '2026-05-07'
  - label: us.cumulocity.com
    date: '2026-05-08'
  - label: cumulocity.com
    date: '2026-05-08'
---
When assigning a device profile, the software type defined in the profile was not included in the generated operation. This issue has been fixed.
The operation now includes the software type when it is defined in the profile, ensuring correct profile application on devices.
