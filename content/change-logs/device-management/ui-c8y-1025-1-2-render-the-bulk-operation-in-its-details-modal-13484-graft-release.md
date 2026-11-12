---
date: '2026-11-12'
title: Bulk operation details dialog no longer opens empty
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
ticket: DM-8027
version: 1025.1.2
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-11-12'
  - label: apj.cumulocity.com
    date: '2026-11-12'
  - label: jp.cumulocity.com
    date: '2026-11-12'
---
In the Device Management application, operations that belong to a bulk operation have a **See details** link, for example, in the **Control** tab of a device and in the **Single operations** tab of **Device control**. Previously, clicking **See details** opened an empty **Bulk operation details** dialog. The dialog now shows the bulk operation with its progress and the list of its single operations.
