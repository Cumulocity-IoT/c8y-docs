---
date: ""
title: Always return null values for missing measurements in series
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-61289
version: 10.20.614.0
---
Missing measurements are indicated by a null placeholder in the `values` array of a [series endpoint](https://cumulocity.com/api/core/#operation/getMeasurementSeriesResource).
Previously, if the missing measurements were in the end of the array these null values were left out as part of the response, which could lead to confusion.
Now, null values are always present for missing measurements.
