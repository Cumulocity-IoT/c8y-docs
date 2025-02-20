---
date: 30.02.2025
title: Fix failure of tenant creation with tenant policy that contains override of default tenant option 
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-JlFdtOPva
    label: Rest API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62312
version: 2025.72.0
---
When enterprise tenant create a subtenant with tenant policy that tries to override the default tenant option will now
work as before. 
