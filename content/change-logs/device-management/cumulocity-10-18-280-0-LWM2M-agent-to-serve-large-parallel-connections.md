---
date: 2023-12-06T15:43:39.046Z
title: LWM2M agent to serve large parallel connections
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Device Management
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-2651
version: 10.18.280.0
---
During a large number of parallel LWM2M DTLS device connection requests, used for devices using PSK secured mode, the LWM2M agent was not able to handle all connections at the same time. This caused platform connection failures for the devices. In the LWM2M agent, the default settings for this part have been adjusted and made configurable to serve large parallel connections.
