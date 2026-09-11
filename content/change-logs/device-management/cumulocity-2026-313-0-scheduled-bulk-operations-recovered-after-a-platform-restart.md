---
date: ""
title: Fixed delayed start of scheduled bulk operations after a platform restart
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
ticket: DM-7013
version: 2026.313.0
---
A bulk operation is carried out by a single node of the platform, which keeps the plan for the remaining devices in memory. When a bulk operation was scheduled to start at a future time and that node restarted before the start time was reached, the plan was lost. Nothing restored it, and the bulk operation was only picked up again by the general recovery mechanism, which by design takes effect after the planned start time has already passed. In the worst case, a bulk operation started up to 13 hours later than the time it was scheduled for. This was most likely to happen when the platform was upgraded between the moment a bulk operation was created and the moment it was due to start.

Scheduled bulk operations are now restored when a node restarts, and they start at the time they were scheduled for. This also covers the case where the node that was carrying out the bulk operation is replaced by a different one, which is what happens during a rolling platform upgrade.

A bulk operation whose node stops while its device operations are still being created is now also taken over within minutes, instead of waiting for the abandonment timeout to elapse.

Each device still receives exactly one operation per bulk operation, and existing installations require no configuration changes.
