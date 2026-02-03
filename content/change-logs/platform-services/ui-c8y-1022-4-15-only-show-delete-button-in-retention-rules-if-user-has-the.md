---
date: '2025-07-10'
title: Delete button for retention rules only shown for users with ADMIN permission
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
ticket: MTM-64008
version: 1022.4.15
---
In the Administration application, the delete button for retention rules was previously shown for all users regardless of their permissions. With this change, the delete button is now only displayed for users who have ADMIN permission. This ensures that only authorized users can delete retention rules, providing better control and security over data retention management in {{< product-c8y-iot >}}.
