---
date: ""
title: Password validation consistently aligned with configured rules
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
ticket: MTM-43387
version: 1023.14.158
---
Password validation rules and error messages are now consistent across all password entry locations (user management in the Administration application, user settings, and login password change) and correctly reflect the tenant's configured minimum length and strength enforcement settings. Previously, the displayed validation requirements could differ from the actual configured rules.