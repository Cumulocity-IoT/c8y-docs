---
date: '2025-08-14'
title: >-
  Enabling the data point graph preview feature no longer breaks the
  visualization of data points
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-64091
version: 1022.10.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, when enabling the data point graph preview feature, this could cause rendering issues with the associated Device and Communication widgets in the Device Management application, impacting the display and usability of related data. This issue has been fixed. Visualizing data points with the data point graph preview feature enabled now works seamlessly.
