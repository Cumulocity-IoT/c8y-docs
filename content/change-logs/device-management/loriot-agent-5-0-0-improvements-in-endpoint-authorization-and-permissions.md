---
date: ""
title: Improvements in endpoint authorization and permissions
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-TCiiCOknp5
    label: LPWAN
build_artifact:
  - value: tc-ycWx1InI9
    label: loriot-agent
ticket: DM-5340
version: 5.0.0
---
Disabled unused and potentially dangerous Spring Boot Actuator endpoints e.g. heapdump. "lns-connection"endpoints require LoRa service-specific permissions i.e. ROLE_LORIOT_READ, ROLE_LORIOT_ADMIN.