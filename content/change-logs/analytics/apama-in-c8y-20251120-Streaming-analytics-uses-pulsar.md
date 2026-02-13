---
date: 2025-11-20
title: Streaming Analytics and Notifications 2.0
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
ticket: PAB-4901
version: 26.258.0
---
Streaming Analytics now uses the {{< product-c8y-iot >}} Notifications 2.0 reliable data forwarding capability to receive notifications for measurements, events, alarms, managed objects and operations that are processed by the {{< product-c8y-iot >}} platform. The benefits of using Notifications 2.0 are improved performance and reliability for messaging with Streaming Analytics applications such as smart rules, Analytics Builder and EPL apps.

Users of custom Apama microservices must also add the `ROLE_NOTIFICATION_2_ADMIN` permission to the microservice manifest. Users of custom Apama EPL projects must also add the new **Cumulocity Notifications 2.0** bundle.