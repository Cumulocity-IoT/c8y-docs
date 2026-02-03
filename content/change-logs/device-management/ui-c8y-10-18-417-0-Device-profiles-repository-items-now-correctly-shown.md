---
date: 2023-12-06T10:31:17.177Z
title: "Device profiles repository items now correctly shown"
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2547
version: 10.18.417.0
---
In the <b>Device profiles</b> page, when adding a repository item (software, firmware, configuration) if the device profile has a device type defined, the items shown either correspond to this device type or they don't have a device type specified. In some cases, repository items without a filter were not visualized in the window for adding an item. These items are now correctly shown.
