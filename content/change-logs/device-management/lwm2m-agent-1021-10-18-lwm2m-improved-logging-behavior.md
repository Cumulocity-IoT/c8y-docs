---
date: '2025-06-19'
title: Removed Redundant "LWM2M Device Send" event in VERBOSE logging
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
ticket: DM-4752
version: 1021.10.18
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The "LWM2M Device Send" event was logged alongside the "Received Message" event, although both events contained identical information. This update removes the redundant "LWM2M Device Send" event. Only the "Received Message" event now logs the resource data received from the LWM2M service in the VERBOSE logging level.
