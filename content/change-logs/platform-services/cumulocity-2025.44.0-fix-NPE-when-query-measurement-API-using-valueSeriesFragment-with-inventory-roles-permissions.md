---
date: 
title: Queries to the Measurement API with the filter valueSeriesFragment no longer result in a NullPointerException
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
version: 10.18.540.279
---
When users with inventory roles permission for the API `Measurement` and the fragment `*` were triggering a query to the Measurement API
using the filter `valueSeriesFragment`, this resulted in a NullPointerException and error code 500.
The issue has been fixed and the filter can be used properly.
