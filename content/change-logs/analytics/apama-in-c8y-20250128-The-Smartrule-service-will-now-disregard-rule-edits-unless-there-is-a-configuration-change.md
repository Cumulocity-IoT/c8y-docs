---
date:
title: Geofence smart rule no longer creates duplicate alarms.
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
ticket: PAB-4691
version: 26.27.0
---
The **On geofence create alarm** smart rule was periodically creating duplicate alarms if the geofence configuration is triggered. This issue has now been resolved.