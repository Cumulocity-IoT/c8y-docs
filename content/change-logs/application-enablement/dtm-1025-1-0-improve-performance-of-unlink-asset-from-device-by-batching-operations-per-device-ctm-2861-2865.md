---
date: '2026-04-21'
title: >-
  Improved performance of unlinkAssetFromDevice by batching operations per
  device
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2861
version: 1025.1.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-21'
  - label: apj.cumulocity.com
    date: '2026-04-22'
  - label: jp.cumulocity.com
    date: '2026-04-22'
  - label: emea.cumulocity.com
    date: '2026-04-23'
  - label: us.cumulocity.com
    date: '2026-04-23'
  - label: cumulocity.com
    date: '2026-04-23'
---
To improve the performance, the `unlinkAssetFromDevice` endpoint of the Assets API has been optimized by grouping operations per device,
reducing redundant lookups and ensuring a single update or delete per
device instead of per linked series.
