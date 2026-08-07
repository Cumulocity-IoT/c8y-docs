---
date: ""
title: Fixed radio button not properly selected in configuration inline editing
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
ticket: DM-6805
version: 1024.10.3
---
When editing device properties inline in the device management app, radio button selections were not being saved correctly. This issue has been fixed, and radio button selections now work as expected when you edit them inline. Users can now reliably update radio button fields directly in the device management interface without encountering selection errors.