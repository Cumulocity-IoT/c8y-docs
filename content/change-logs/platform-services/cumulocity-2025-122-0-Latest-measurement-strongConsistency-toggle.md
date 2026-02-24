---
date: '2026-03-31'
title: New toggle to exclude late-arriving measurements from latest values
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Platform Services
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
version: 2025.122.0
---

A new toggle, `strongConsistency`, has been introduced. When set to true, it prevents late-arriving measurements from being shown as the most recent data for a device, regardless of their actual arrival time.

For details on how to enable it and how it works, refer to [Managing data](/standard-tenant/managing-data/#latest-value).
