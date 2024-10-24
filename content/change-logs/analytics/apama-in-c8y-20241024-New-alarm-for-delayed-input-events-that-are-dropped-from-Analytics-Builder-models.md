---
date: 2024-10-24
title: New alarm for delayed input events that are dropped from Analytics Builder models
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-4618
version: 25.298.0
---
Previously, warning messages were logged when input events were dropped by Analytics Builder model because they were delayed beyond the reorder buffer duration. An alarm is raised now when input events are dropped in addition to the warning messages. Alarm provides improved visibility compared to the log messages, which is especially useful for multi-tenant microservices where it may not be possible to view log messages. See [Analytics Builder dropped events](/streaming-analytics/troubleshooting/#analytics-builder-dropped-events) for more details on the alarm.
