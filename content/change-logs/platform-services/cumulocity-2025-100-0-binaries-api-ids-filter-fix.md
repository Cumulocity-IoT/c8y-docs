---
date: '2025-04-03'
title: Correct data returned when retrieving stored file metadata by ID
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
Previously, the endpoint for retrieving [stored files metadata](https://{{< domain-c8y >}}/api/core/#operation/getBinariesCollectionResource) did not return the correct data when filtering by ID. This issue has been fixed and the correct data is now returned.
