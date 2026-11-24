---
date:
title: Smart Function block in Analytics Builder is now generally available
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-5479
version: <FIRST apama-in-c8y VERSION THAT CONTAINS THE GA CHANGE>
---

The [Smart Function](/streaming-analytics/block-reference/#smart-function) block, previously released in [Public Preview](/change-logs/?component=.component-M5-cepIIS#apama-in-c8y-20260129-add-smart-function-block-in-public-preview), is now Generally Available (GA).

The block is available in the Analytics Builder palette by default and no longer requires the preview blocks feature to be enabled. Models that already use the Smart Function block continue to work unchanged.

The block reference now describes the limits on the time and memory that a Smart Function can use, the JavaScript that is supported, and what happens to stored state when the microservice restarts. The new **Calculate distance travelled** sample shows how to use the block: it calculates the distance between successive positions of each device and creates a measurement from it.
