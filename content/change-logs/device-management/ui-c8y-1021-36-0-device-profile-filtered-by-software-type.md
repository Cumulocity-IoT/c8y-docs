---
date: '2025-02-13'
title: Device profiles are now filtered by software type
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-4274
version: 1021.36.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
In order to make it easier for users to apply only relevant device profiles, pre-filtering of device profiles by the software types supported by the specific device has been implemented in the **Device profile** tab. The **Select device profile** dropdown now only shows profiles that are applicable for the software types supported by the device. This improves usability, saves time and eliminates errors.
