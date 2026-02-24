---
date: '2026-02-19'
title: Added fallback to key for asset models and properties without name
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2679
version: 1024.1.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-19'
---
Previously, if an asset model or property was created without a name,
blank values were displayed wherever the model or property name was
referenced. This has now been improved so that when a name is not
available, it will automatically fall back to using the corresponding
key for both asset models and properties across all references.
