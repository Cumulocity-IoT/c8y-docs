---
date: '2025-08-14'
title: Devices now properly assigned to groups on EST protocol registrations
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
ticket: MTM-64172
version: 1022.11.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Device registrations using the EST (Enrollment over Secure Transport) protocol were handled differently from non-EST registrations internally. This change unifies the way device registrations with and without the EST protocol are processed. It fixes an issue where devices were not assigned to the group selected by the user during registration when using the EST protocol.
