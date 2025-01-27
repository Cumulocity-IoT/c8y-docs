---
date: 2025-01-27
title: Smart rule Geofence alarm count will not increasing after localtion update.
change_type:
  - value: change-QHu1GdukP
    label: Fix
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-4691
version: 25.339.3
---

A “On Geofence Create alarm” triggered on entering a Geofence. Subsequenetly on receiving a location updated wihtin the Geofence after 24hours the alarm count is increasing. This defect was fixed.
