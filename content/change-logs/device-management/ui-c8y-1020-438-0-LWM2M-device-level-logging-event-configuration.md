---
date: 2024-12-19
title: LWM2M device logging level configuration
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-4190
version: 10.20.438.0
---
For LWM2M devices, it is now possible to disable or adjust the granularity of logging events per device during the device registration or from the **LWM2M configuration** tab of the existing device. When enabled, log events are visible in the device's events. Lifecycle events are the default selected option. The global configuration from the LWM2M Service for enabling event logging has been removed.
For more details see [LWM2M device registration advanced settings](/protocol-integration/lwm2m/#advanced-settings) and [LWM2M configuration](/protocol-integration/lwm2m/#lwm2m-configuration). 
