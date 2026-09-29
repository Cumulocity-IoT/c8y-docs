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
version: 1022.7.2
environment_availability:

---
When the {{< product-c8y-iot >}} platform is under load, it can answer a request to create measurements, events or alarms with a server error although it has already stored the data. Previously, the LWM2M agent retried every such request, which created the same measurements, events and alarms several times for a device, in one case millions of duplicate measurements within minutes.

The LWM2M agent now checks with the platform which of the failed measurements, events and alarms already exist before it sends them again, and retries only the ones that are missing. For measurements, which the agent sends in bulks, the agent additionally pauses the sending for the affected tenant for a short time after a failed bulk and delivers the accumulated data step by step once the platform accepts requests again, instead of retrying continuously. Both behaviors are enabled by default and can be configured with the properties `C8Y.lwm2m.sinks.crossCheck.enabled` and `C8Y.lwm2m.sinks.measurements.flushPauseSecondsInCaseOfError`.

Existing installations do not require any action. Data that devices send during a platform outage is still delivered once the platform is available again, without duplicates. For details, see [LWM2M](/device-integration/lwm2m/).
