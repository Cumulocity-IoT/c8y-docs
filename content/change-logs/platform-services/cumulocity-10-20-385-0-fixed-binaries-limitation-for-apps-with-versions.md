---
date: 2024-05-17
title: Limit for binaries is now equal to the application versions limit 
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-58877
version: 10.20.385.0
---
Previously, the number of stored binaries for applications with versions was limited to 6 files, although the number of allowed application versions was 20 by default. The oldest file was automatically deleted when a 7th application version with binary attachment was uploaded. This has been fixed and now the limit for binaries is equal to the application versions limit (20 by default).   
