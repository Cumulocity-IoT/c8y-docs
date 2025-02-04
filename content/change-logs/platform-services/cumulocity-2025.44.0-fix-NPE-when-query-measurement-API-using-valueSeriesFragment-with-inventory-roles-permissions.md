---
date: '2025-02-04'
title: Fixed NullPointerException when user was queries Measurement API 
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-JlFdtOPva
    label: Rest API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-62347
version: 2025.44.0
---
When user with inventory roles permission for Api: `Measurement`, fragment: `*` was triggering an query to measurement api,
using filter `valueSeriesFragment` it resulted in NullPointerException and 500 error code.
The issue was now solved and filter can be used.
