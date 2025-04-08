---
date: ""
title: Simplification of logging event levels for LWM2M device configuration
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
ticket: DM-4555
version: 1020.440.29
---
The logging event levels are updated to simplify the device configuration. Previously available logging levels were: NONE, LIFECYCLE, TRAFFIC, FIRMWARE, and VERBOSE. It is now simplified to NONE, LIFECYCLE, and VERBOSE. TRAFFIC and FIRMWARE log events are now merged with VERBOSE and this configuration will be automatically updated in the device managed object.