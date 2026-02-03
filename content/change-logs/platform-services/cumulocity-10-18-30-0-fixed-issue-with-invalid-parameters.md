---
date: 2023-12-06
title: Fixed issue with invalid parameters
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
ticket: MTM-51072
version: 10.18.30.0
---
Fixed an issue where the {{< product-c8y-iot >}} REST API returned a 500 HTTP error code in case of an invalid <code>pageSize</code> or <code>currentPage</code> parameter. The API now returns a 422 HTTP error code in such cases.
