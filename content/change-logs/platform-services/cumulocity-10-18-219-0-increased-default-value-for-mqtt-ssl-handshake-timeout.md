---
date: 2023-12-06
title: Increased default value for MQTT SSL handshake timeout
product_area: Platform services
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-54184
version: 10.18.219.0
---
The default value for the MQTT SSL handshake timeout has been increased from 10 seconds to 50 seconds to increase the time for the handshake to be successful. The value of this property can be configured by a platform administrator.
