---
date: '2026-02-26'
title: >-
  Improved the error message from the API when trying to (un)assign a non-device
  to an asset
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
ticket: CTM-2739
version: 1024.2.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-26'
  - label: apj.cumulocity.com
    date: '2026-03-04'
  - label: jp.cumulocity.com
    date: '2026-03-04'
  - label: emea.cumulocity.com
    date: '2026-03-09'
  - label: us.cumulocity.com
    date: '2026-03-09'
  - label: cumulocity.com
    date: '2026-03-10'
---
Previously, the error message returned from the RestAPI when attempting to assign or unassign a non-device to an asset was inconsistent. The error message format has been standardized. This fix improves error handling consistency.
