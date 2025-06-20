---
date: ""
title: Removed Redundant "LWM2M Device Send" Event in VERBOSE Logging for Missing Resource DDFs
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
---
The redundant "LWM2M Device Send" events was logged alongside the "Received Message" event, both containing identical information. This update removes the duplicate "LWM2M Device Send" event, only the "Received Message" event will now log the resource data received from the LWM2M Service in VERBOSE logging level.