---
date: 2023-12-06
title: Fixed HTTP status 500 response
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
ticket: MTM-53273
version: 10.18.181.0
---
Fixed the rare occurrence of an HTTP status 500 response from <code>/tenant/statistics/allTenantsSummary</code>, if one of the tenants was deleted during the request.
