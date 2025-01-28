---
date: 2025-01-28
title: The Smart rule service will now disregard rule edits unless there is a configuration change
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
The Smart rule service will now disregard rule edits unless there is a configuration change. 

Two issues have been fixed:  
1. The **On geofence create alarm** rule was triggering duplicate alarms after 24 hours, on position updates despite no changes in it. This issue has now been resolved.  
2. The **threshold** rule was not functioning correctly when only KPIs (mainly fragments and/or series) were updated dynamically. This has also been corrected.
