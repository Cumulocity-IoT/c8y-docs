---
date: '2025-05-22'
title: Improved CA certificate delete confirmation message
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
ticket: MTM-63400
version: 1021.73.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
To prevent accidental deletion of CA certificates, the delete confirmation message has been improved. Previously, the confirmation message was not clear enough about the consequences of deleting a CA certificate. Now, the message explicitly states that devices enrolled with this certificate will no longer be able to connect the platform.
