---
date: 2023-12-06T10:28:14.145Z
title: Introduced restrictions on the creationRamp property
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
ticket: DM-2661
version: 10.18.483.0
---
In bulk operations, restrictions on the <code>creationRamp</code> property have been introduced. This allows better control over bulk operation creation and ensures adherence to specified limits. They are determined and can be modified by the system options <code>device-control.bulkoperation.maxcreationramp</code> and <code>device-control.bulkoperation.mincreationramp</code>.
