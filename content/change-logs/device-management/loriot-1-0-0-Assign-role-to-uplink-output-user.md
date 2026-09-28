---
date: 2024-05-16
title: Admin permissions added to the Loriot agent output user for existing and new devices   
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-ycWx1InI9
    label: loriot-agent
ticket: DM-3411
version: 1.0.0
---
Newly established Loriot connections failed initially because the user account created for sending uplink requests from devices lacked the necessary admin permissions. This issue has been resolved by granting the required permissions to both existing and new connections.
