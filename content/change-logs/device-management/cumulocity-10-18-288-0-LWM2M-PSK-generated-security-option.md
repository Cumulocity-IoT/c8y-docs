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
During device registration, the option "PSK generated" can be selected for the LWM2M server connection. If this option is selected, the LWM2M agent generates the PSK ID and PSK key credentials for the device. These will be set to the device during the bootstrap process.
For details, refer to the [LWM2M security settings](/protocol-integration/lwm2m/#security-settings) user documentation.
