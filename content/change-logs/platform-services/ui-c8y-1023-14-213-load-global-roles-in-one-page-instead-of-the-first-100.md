---
date: ""
title: More than 100 global roles are now listed for a user
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
ticket: MTM-67754
version: 1023.14.213
---
On the **Global roles** tab, only the first 100 global roles were listed. On larger tenants with more than 100 roles, additional roles could not be assigned. This issue has been fixed. The list now loads up to 1000 roles on a single page.
