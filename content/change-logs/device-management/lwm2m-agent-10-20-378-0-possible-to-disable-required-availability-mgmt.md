---
date: 2024-09-19
title: Disabling the automatic configuration of the required interval for LWM2M devices
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Device Management & Connectivity
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-2111
version: 10.20.378.0
---
Cumulocity provides [connectivity monitoring](https://cumulocity.com/docs/device-management-application/monitoring-and-controlling-devices/#to-monitor-the-connection-of-a-particular-device) capabilities for which a required interval needs to be defined. For LwM2M device, this is automatically set by the LWM2M agent based on the registration lifetime. However, if the value is set manually, it will be overwritten by the LWM2M agent after each registration or registration update. This behavior can now be disabled both globally or for specific devices, allowing users to define the required interval independent of the registration lifetime.