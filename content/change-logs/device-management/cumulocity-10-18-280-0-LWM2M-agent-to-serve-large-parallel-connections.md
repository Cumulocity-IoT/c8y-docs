---
date: '2023-12-06'
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
During a large number of parallel LWM2M DTLS device connection requests, used for devices using PSK secured mode, the LWM2M agent was not able to handle all connections at the same time. This caused platform connection failures for the devices. In the LWM2M agent, the default settings for this part have been adjusted and made configurable to serve large parallel connections.
