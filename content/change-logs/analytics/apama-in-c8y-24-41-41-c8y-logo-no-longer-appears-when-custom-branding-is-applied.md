---
date: 2024-04-18
title: Cumulocity logo no longer appears when custom branding is applied
product_area: Analytics
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-4764
version: 24.41.41
---
Fixed an issue where the default Cumulocity logo was briefly visible during navigation to the Streaming Analytics application, even when custom branding was applied. The transition now respects the applied branding without showing the default logo.
