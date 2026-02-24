---
date: 2026-03-31
title: Save button on Limits tab only enabled when changes have been made
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62148
version: 1023.14.73
---
The **Save** button on the **Limits** tab in the tenant details was enabled even when no changes were made. It is now disabled until the user modifies a value, preventing accidental saving of unchanged data.