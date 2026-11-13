---
date: 
title: LWM2M agent prevents duplicate measurements, events, and alarms after platform errors
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-8050
version: 1021.11.47
environment_availability:

---
If the {{< product-c8y-iot >}} platform temporarily rejected requests from the LWM2M agent, for example under high load, the agent retried them. In rare cases, this led to duplicate measurements, events, or alarms for a device.

The LWM2M agent now checks with the platform which data of a rejected request it already stored and resends only the missing data. Once the platform accepts requests again, the agent resends pending measurements at a controlled rate. The platform stores data that devices send during an outage without duplicates. Existing installations require no action.
