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
version: 1024.16.22
---
The roles panel listed only the first 100 global roles, so on larger tenants the rest could not be assigned. It now loads up to 1000 roles in a single page.