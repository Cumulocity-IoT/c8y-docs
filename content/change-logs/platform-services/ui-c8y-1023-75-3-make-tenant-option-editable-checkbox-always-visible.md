---
date: ""
title: Make tenant options editable checkbox visible for all users with appropriate permissions
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
version: 1023.75.3
---
When creating or editing tenant options, you can now always see and control the **Allow subtenants to edit this tenant option** checkbox, regardless of your tenant level. Previously, only {{< management-tenant >}}s could access this checkbox, which prevented users on other tenant levels from controlling whether subtenants can modify their tenant options. Since any user with permission to create or edit tenant options should be able to control this setting, and the {{< product-c8y-iot >}} API already allows all authorized users to set the editable property, the checkbox is now consistently available to all users with the appropriate permissions across all tenant levels.