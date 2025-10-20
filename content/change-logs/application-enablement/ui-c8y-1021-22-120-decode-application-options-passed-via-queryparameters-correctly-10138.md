---
date: ""
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
version: 1021.22.120
---
Previously, application options which where provided via query parameters to web applications, were only URI decoded in case the parameter contained valid JSON.
Now we decode these query parameters even when they are not containing valid JSON.