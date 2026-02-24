---
date: '2026-03-31'
title: Change of the default value of revert parameter for time series measurements
change_type:
  - value: change-3BQrQ6adS
    label: API change
product_area: Platform services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-64077
version: 2025.283.0
---
The default value of the `revert` parameter for time series measurements has been changed to `true`. 
As a result, time series measurements are sorted from newest to oldest by default.

This change affects the following API endpoints:
* `GET /measurement/measurements`
* `GET /measurement/measurements/series`

If you require results in ascending order, you must explicitly set the `revert` parameter to `false` in your queries.

The default value for legacy measurements remains `false`.
