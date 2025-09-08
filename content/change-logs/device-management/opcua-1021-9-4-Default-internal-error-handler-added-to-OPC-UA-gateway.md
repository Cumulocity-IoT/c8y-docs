---
date: ""
title:  Improved the reliability of the OPC UA gateway's scheduled tasks to ensure they recover from failures like network outages.
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

To improve the overall reliability of the OPC UA gateway, a problem with the internal schedulers has been fixed: In rare cases a problem
like a network outage lead to periodic tasks being stopped. This affected for example the collection of data from the OPC UA server as well as the delivery of measurements, events and alarms
to the platform. The issue has been addressed by introducing a revised error handler.
