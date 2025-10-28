---
date: '2025-10-23'
title: Application options passed via query parameters are now decoded correctly
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
ticket: MTM-64930
version: 1022.44.7
---
Previously, application options that were provided via query parameters to web applications were only URI-decoded if the parameter contained valid JSON.
With this change, these query parameters are also decoded if they do not contain valid JSON.
