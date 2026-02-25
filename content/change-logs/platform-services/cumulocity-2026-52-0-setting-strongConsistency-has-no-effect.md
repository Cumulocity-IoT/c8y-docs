---
date:
title: StrongConsistency configuration stored as string value
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-66108
version: 2026.52.0
---
The `strongConsistency` option for the latest measurement configuration is now stored and interpreted as a simple string value instead of a JSON-formatted value.

Before: `"c8y_Temperature.*": {"strongConsistency": "true"}`  
After: `"c8y_Temperature.*": "strongConsistency"`

This simplifies the configuration and ensures `strongConsistency` is correctly applied to the latest measurement feature.
