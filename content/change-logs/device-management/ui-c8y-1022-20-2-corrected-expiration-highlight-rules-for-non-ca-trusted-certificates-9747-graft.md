---
date: '2025-08-28'
title: Adjusted expiration warning highlighting for non-CA trusted certificates
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
Previously, the **Trusted certificates** page applied the same expiration warning rules for both CA (Certificate Authority) and non-CA certificates. However, CA and non-CA certificates have different validity periods. With this change, non-CA certificates will now start being highlighted with a warning only when they are less than 90 days away from expiration.
