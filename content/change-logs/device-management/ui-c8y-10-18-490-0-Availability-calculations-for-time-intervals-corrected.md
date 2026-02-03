---
date: 2023-12-06T10:23:03.826Z
title: Availability calculations for time intervals corrected
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-2737
version: 10.18.490.0
---
The availability calculations in the "Availability" overview and for individual devices were not correct. Percentages were calculated for the respective time (24 hours, last 7 days and last 30 days) plus an additional 24 hours. The time interval has now been corrected.
