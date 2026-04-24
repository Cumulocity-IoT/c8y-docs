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
When creating or editing tenant options, you can now always see and control the "Allow subtenants to edit this tenant option" checkbox, regardless of your tenant level. Previously, only management tenants could access this checkbox, which prevented users in other tenant levels from deciding whether subtenants could modify their tenant options. Since any user with permission to create or edit tenant options should be able to control this setting, and the Cumulocity API already allows all authorized users to set the editable property, the checkbox is now consistently available to all users with the appropriate permissions across all tenant levels.