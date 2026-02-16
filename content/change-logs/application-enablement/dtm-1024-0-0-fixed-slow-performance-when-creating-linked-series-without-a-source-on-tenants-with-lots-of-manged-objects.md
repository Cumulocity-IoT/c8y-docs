---
date: '2026-02-05'
title: >-
  Fixed slow performance when creating a linked series without a source on
  tenants with lots of managed objects
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
ticket: CTM-2678
version: 1024.0.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-05'
  - label: apj.cumulocity.com
    date: '2026-02-11'
  - label: jp.cumulocity.com
    date: '2026-02-11'
  - label: emea.cumulocity.com
    date: '2026-02-16'
  - label: us.cumulocity.com
    date: '2026-02-16'
---
On tenants with a high number of managed objects, creating a linked series without a source caused a slow performance due to the unnecessary loading of inventory objects. This issue has been fixed.
