---
date: '2026-03-31'
title: Improved permission handling for Trusted certificates page
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
ticket: MTM-64247
version: 1022.16.1
---
To enhance the user experience, the permission handling for the **Trusted certificates** page has been improved. Users with read-only permission will now see some UI elements blocked instead of having them active but not working. Users with admin permission will continue to have full access to the page. Users without any permissions to the **Trusted certificates** page will no longer see the corresponding menu item in the user interface. This change provides a clearer and more consistent experience for users based on their assigned permissions.
