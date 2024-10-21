---
date:
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
ticket: MTM-60938
version: 10.20.589.0
---
In order to simplify the Inventory API the redundant `self` field has been removed from `deviceParents`, `assetParents` and `additionParents` response fragments. It was not required and always had a generated link to a non-existent endpoint.
