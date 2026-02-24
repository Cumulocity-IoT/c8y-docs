---
date: 2026-03-31
title: Sequential Loriot device operation processing flow now continues despite failures
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-ycWx1InI9
    label: loriot-agent
ticket: DM-4470
version: 3.0.18
---
Previously, when Loriot device operations were retrieved per tenant, all operations were processed sequentially.
If any operation failed, the processing stopped, and an error was returned, blocking the execution of all subsequent
operations until the failed operation was resolved. This issue has now been resolved. Only the failed operation is marked
as failed, and the processing of the remaining operations continues uninterrupted.
