---
date: '2025-12-04'
title: Limited number of events produced when receiving data from LWM2M device
product_area: Device management & connectivity
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-4797
version: 1021.11.2
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Previously, each resource instance of multi-instance LWM2M resources was logged as a separate event in the verbose logging level. This change simplifies the logs by combining all resource-instance values into a single event.
