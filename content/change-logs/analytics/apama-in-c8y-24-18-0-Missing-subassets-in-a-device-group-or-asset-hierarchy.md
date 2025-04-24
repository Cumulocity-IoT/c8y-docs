---
date: 2023-12-06
title: Missing subassets in a device group or asset hierarchy
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
version: 24.18.0
---
Previously, when reactivating an Analytics Builder model, an error was thrown if a subasset of a device group or asset hierarchy from which the model receives events no longer existed in the inventory, for example, because a device was deleted.
As of this version, missing subassets in a device group or asset hierarchy are ignored and an error is no longer thrown.
However, if the deletion of a subasset results in an empty device group or asset hierarchy, an error is still thrown.
