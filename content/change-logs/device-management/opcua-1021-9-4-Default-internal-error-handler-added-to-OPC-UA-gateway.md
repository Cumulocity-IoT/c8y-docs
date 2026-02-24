---
date: 2026-03-31
title:  Improved the reliability of the OPC UA gateway's scheduled tasks
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-4897
version: 1021.9.4
---

To improve the overall reliability of the OPC UA gateway, an issue with the internal schedulers has been fixed, which, in rare cases, led to periodic tasks being stopped in case of failures such as a network outage. This affected for example the collection of data from the OPC UA server as well as the delivery of measurements, events and alarms
to the platform. The issue has been addressed by introducing a revised error handler.
