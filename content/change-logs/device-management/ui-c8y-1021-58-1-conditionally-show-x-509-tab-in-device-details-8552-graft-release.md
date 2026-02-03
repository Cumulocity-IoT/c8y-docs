---
date: '2025-04-24'
title: X.509 certificates tab is now only shown for applicable devices
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
ticket: MTM-62971
version: 1021.58.1
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
To prevent user confusion, the **x509** tab in the device details is now only shown if the device contains at least one x.509 certificate. The behavior of the certificates tab itself remains unchanged and it will continue to display any associated x.509 certificates for a device as before.
