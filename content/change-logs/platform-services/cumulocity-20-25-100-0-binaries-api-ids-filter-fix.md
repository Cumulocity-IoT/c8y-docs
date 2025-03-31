---
date:
title: Fixed an issue with retrieving stored files metadata by ids
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62950
version: 2025.0.69
---
Previously, the endpoint for retrieving stored file metadata by ID did not return the correct data. This issue has been fixed and the correct data is now returned.