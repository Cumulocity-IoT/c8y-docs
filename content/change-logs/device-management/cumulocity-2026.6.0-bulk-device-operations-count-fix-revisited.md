---
date: 2026-01-09
title: Fixed duplicate operation creation during bulk operation execution
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device management & connectivity
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-5040
version: 2025.6.0
---
Performing a bulk operation could unexpectedly create more operations than intended, due to a race condition. This issue has been resolved. The fix ensures that only the correct number of operations is generated for each bulk request by addressing the underlying concurrency issue.
