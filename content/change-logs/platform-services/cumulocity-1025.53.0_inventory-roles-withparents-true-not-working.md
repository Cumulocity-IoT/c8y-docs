---
date: 
title: Fixed issue with asset parent data in Inventory API responses
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
version: 1025.53.0
---
Previously, users with read inventory permissions assigned via inventory roles were not receiving asset parents data when making API calls to the Inventory service with the `withParents=true` parameter. The API incorrectly returned an empty `deviceParents`, `assetParents` and `additionParents` attribute. This issue has been fixed. Users can retrieve up to three levels of the parent hierarchy, even if they do not have permission to read the full parent object. The returned hierarchy structure contains only the ID and name of the parent object.