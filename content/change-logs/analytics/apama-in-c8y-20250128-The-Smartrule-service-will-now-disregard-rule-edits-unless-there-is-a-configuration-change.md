---
date: 
title: Geofence smart rule no longer creates duplicate alarms
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-4710
version: 25.339.3
---
The **On geofence create alarm** smart rule was periodically creating duplicate alarms when the geofence configuration was triggered. This issue has now been resolved.