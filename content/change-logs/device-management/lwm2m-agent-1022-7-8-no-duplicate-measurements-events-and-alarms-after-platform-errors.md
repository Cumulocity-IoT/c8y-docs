---
date: 
title: No duplicate measurements, events and alarms after platform errors
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
ticket: DM-7155
version: 1022.7.8
environment_availability:

---
If the {{< product-c8y-iot >}} platform temporarily rejected requests from the LWM2M agent, for example under high load, the agent retried them. In rare cases this led to duplicate measurements, events or alarms for a device.

The LWM2M agent now verifies the outcome of a rejected request with the platform before retrying it and resends only data that has not been delivered yet. Measurements are resent in a controlled manner once the platform accepts requests again. Data that devices send during a platform outage is delivered without duplicates, and no action is required for existing installations. For details, see [LWM2M](/device-integration/lwm2m/).
