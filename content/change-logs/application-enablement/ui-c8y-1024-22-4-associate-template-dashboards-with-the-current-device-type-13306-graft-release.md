---
date: ""
title: Dashboard templates now always apply to the device's current type
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-68123
version: 1024.22.4
---
When a dashboard was created for a device whose type was changed later, turning on **Dashboard template** in the dashboard settings made it a template for the device's previous type. The dashboard was then shown on devices of the previous type instead of the current one. This issue has been fixed. A dashboard now becomes a template for the type the device has when you turn on **Dashboard template**.