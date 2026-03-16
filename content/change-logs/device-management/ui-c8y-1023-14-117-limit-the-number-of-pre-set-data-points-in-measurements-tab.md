---
date: 2026-03-31
title: Limited the number of pre-set data points in the Measurements tab
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-5166
version: 1023.14.117
---
When you open the **Measurements** tab in the device details, the **Data point graph** previously displayed all available data points in the pre-set list, which could result in a very long list that was difficult to navigate, especially for devices with many data points. In extreme cases, this could also lead to exceeding the browser's `localStorage` limit. The number of pre-set data points displayed in the **Measurements** tab has now been limited to 25 to improve usability and performance. This change helps you find the data points you need more quickly by reducing visual clutter and making the interface more responsive when working with devices that have a large number of data points.