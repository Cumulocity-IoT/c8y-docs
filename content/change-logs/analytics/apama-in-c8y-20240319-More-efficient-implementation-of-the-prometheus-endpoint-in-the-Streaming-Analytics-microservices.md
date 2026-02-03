---
date: 2024-03-19
title: More efficient implementation of the /prometheus endpoint in the Streaming Analytics microservices
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
ticket: PAB-4411
version: 25.85.0
---
The implementation of the `/prometheus` endpoint has been optimized by removing redundant calls to other internal endpoints.
