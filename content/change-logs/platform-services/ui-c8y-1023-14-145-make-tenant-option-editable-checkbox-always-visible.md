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
version: 1023.14.145
---
The "Allow subtenants to edit this tenant option" checkbox controls whether subtenants can modify a tenant option after creation. Previously, this checkbox was only visible to management tenants, which prevented other authorized users from controlling this setting even though they had permission to create and edit tenant options. The Cumulocity API already allowed all authorized users to set the editable property, so the user interface restriction was inconsistent. Now the checkbox is always visible when you create or edit tenant options, regardless of your tenant level, allowing you to consistently control tenant option editability from any tenant where you have the appropriate permissions. This change does not affect security since subtenants without tenant creation permissions cannot exploit this setting.