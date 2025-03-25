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
version: 2025.100.0
---
Fixed an issue with the endpoint for retrieving [stored files metadata](https://{{< domain-c8y >}}/api/core/#operation/getBinariesCollectionResource) 
not returning any results when `ids` filter is used.