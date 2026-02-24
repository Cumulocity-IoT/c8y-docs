---
date: '2026-03-31'
title: Software and firmware repository items can now be added without URL
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
ticket: DM-4788
version: 1022.8.0
---
It is now possible to add software and firmware repository items without a URL. When uploading software and firmware versions, a new option for the binary is available called **Provided**. If this option is selected, the device is expected to resolve the binary itself.
