---
date: ""
title: Handle permissions in Trusted certificates page (#9709) [GRAFT][release/cd] (#9744)
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
This change enhances user experience of permission handling for Trusted certificates page: users with only read permission will see some user interface elements blocked, instead of having them active but not working, users with admin permission will still have full access, users with no permissions won't see the menu item at all.