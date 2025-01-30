---
date: 2025.01.29
title: Removed self link from parents fragments in Inventory API responses
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
ticket: MTM-61617
version: 10.25.47.0
---
Resolved an issue where users with read inventory permissions assigned via inventory roles were not receiving assetParents data when making API calls to the Inventory service with withParents=true parameter. The API incorrectly returned an empty deviceParents, assetParents or additionParents attribute. User can retrieve up to three levels of the parent hierarchy, even if there is no permission to read the full parent object. The returned hierarchy structure contains only the id and name of the parent object.