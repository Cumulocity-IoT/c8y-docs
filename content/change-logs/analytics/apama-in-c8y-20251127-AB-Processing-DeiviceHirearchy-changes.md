---
date: 2025-11-27
title: Changes in Cumulocity IoT devices are automatically processed by Analytics Builder
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: APMF-94
version: 26.257.0
---

Analytics Builder models will now automatically track changes to devices, including additions, deletions, and updates to device, or Group, and Asset membership. This ensures that any structural or configuration changes are immediately reflected in model processing without user intervention. The earlier requirement was to deactivate and reactivate models to pick up such updates is no longer needed.

For details, refer to [Device Hierarchy changes ](/streaming-analytics/analytics-builder/#device-hierarchy-changes).