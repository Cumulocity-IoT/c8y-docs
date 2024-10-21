---
date: '2024-10-17'
title: >-
  Asset properties widget in device details correctly displays all relevant
  properties
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
ticket: DM-3868
version: 1020.28.12
---
The "Asset properties" widget on the **Info** tab in the device details was not working as expected and showed incorrect or missing information in some cases. This issue has been resolved and the "Asset properties" widget now correctly displays all relevant properties for a device asset. It contains 5 default properties - ID, name, type, last updated and creation time.
