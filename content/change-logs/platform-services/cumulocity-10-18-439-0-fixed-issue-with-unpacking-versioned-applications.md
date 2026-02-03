---
date: 2023-12-06T15:55:16.702Z
title: Fixed issue with unpacking versioned applications
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Platform services
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-53724
version: 10.18.439.0
---
Resolved the issue that versioned applications might not be unpacked upon core startup, which resulted in a 404 error for some requests.
