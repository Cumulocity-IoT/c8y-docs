---
date: '2026-03-05'
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
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-03-05'
---
The latest measurement configuration has been simplified by storing the `strongConsistency` option as a string value instead of a JSON-formatted value.

Before: `"c8y_Temperature.*": {"strongConsistency": "true"}`  
After: `"c8y_Temperature.*": "strongConsistency"`

This change ensures `strongConsistency` is correctly applied to the latest measurement feature.
