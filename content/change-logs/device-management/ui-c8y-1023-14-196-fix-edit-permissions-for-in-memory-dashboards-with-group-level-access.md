---
date: ""
title: Default device info dashboard now respects group-level edit permissions
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
ticket: DM-6671
version: 1023.14.196
---
When dashboards were created in-memory and shared with groups, users with group-level access were unable to edit these dashboards even when they had the appropriate permissions. The edit permissions for in-memory dashboards with group-level access have been corrected so that users with the proper permissions can now edit these dashboards as expected. This fix ensures that group-level access controls work consistently for in-memory dashboards, allowing authorized users to make necessary modifications without encountering permission errors.