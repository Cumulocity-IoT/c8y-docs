---
date: 2024-05-16
title: Improved robustness of Streaming Analytics against transient network issues
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-4447
version: 25.133.0
---
The robustness of EPL apps and Analytics Builder models against transient network issues has been improved.
Specifically, if a temporary network issue causes a problem while saving EPL apps or Analytics Builder models to the inventory, then the EPL app or the Analytics Builder model is still displayed with the correct state in the UI, instead of being displayed with an incorrect state or not displayed at all.
