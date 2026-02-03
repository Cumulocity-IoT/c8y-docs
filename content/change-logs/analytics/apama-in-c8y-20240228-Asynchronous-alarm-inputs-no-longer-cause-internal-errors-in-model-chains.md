---
date: 2024-03-21
title: Asynchronous alarm inputs no longer cause internal errors in Analytics Builder model chains
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
ticket: PAB-4379
version: 25.64.0
---
Asynchronous alarm inputs declared by the **Alarm Output** blocks were considered for connectivity chains between models, leading to "Internal error : inconsistent chain ID" errors in some scenarios. This is now fixed and asynchronous inputs declared by a block are now no longer considered for model chains.
