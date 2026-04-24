---
date: ""
title: Make tenant option editable checkbox always visible
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66520
version: 1021.22.160
---
The "Allow subtenants to edit this tenant option" checkbox is now always
visible when creating or editing tenant options, regardless of tenant level.

Previously, only management tenants could see and control this checkbox. This
was unnecessarily restrictive since:
- Any user with permission to create/edit tenant options should be able to
  decide whether subtenants can modify them
- Subtenants without tenant creation permissions cannot exploit this setting
- The Cumulocity API allows all authorized users to set the editable property

Users can now consistently control tenant option editability from any tenant
level where they have the appropriate permissions.