---
date: ""
title: Device profile assignment now includes software type in operations
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
ticket: DM-5994
version: 1023.78.5
---
When creating or updating a device profile, the software type information was not consistently included in the managed object data structure, which could cause issues when retrieving or managing device profiles. The device profile now always includes the software type as part of the managed object, ensuring that all software type information is properly stored and available when you access device profiles. This change ensures consistency in how device profiles are managed and prevents data loss or incomplete profile information when working with devices that have software type configurations.