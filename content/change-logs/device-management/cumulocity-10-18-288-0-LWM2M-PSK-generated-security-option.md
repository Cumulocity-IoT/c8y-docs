---
date: 2024-03-26T10:33:39.707Z
title: PSK-generated option for LWM2M server security mode
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Device management & connectivity
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: DM-554
version: 10.18.288.0
---
During device registration, the "PSK generated" option can be selected for LWM2M Server connection to make LWM2M agent to generate the PSK ID and PSK key credentials for the device. These will be set to the device during the bootstrap process.
For details, refer to the [LWM2M security settings](/protocol-integration/lwm2m/#security-settings) user documentation.
