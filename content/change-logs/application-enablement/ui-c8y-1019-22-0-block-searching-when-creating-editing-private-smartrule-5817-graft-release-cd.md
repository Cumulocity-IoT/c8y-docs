---
date: 2024-04-25
title: Searching for devices blocked when creating or editing a private smart rule
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
ticket: MTM-55913
version: 1019.22.0
---
In the past, it was possible to search for devices when creating or editing a private smart rule, which could potentially leak information about devices the user should not have access to. To address this security concern, searching for devices is now blocked when creating or editing a private smart rule. This change ensures that users can only select devices they are authorized to access, preventing any potential data leaks. The impact of this change is limited to the creation and editing of private smart rules, and users can still search for devices when creating or editing non-private smart rules as before.
