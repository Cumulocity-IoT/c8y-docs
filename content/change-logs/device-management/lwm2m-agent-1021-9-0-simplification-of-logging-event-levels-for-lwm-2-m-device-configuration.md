---
date: '2025-04-24'
title: Simplified logging event levels in LWM2M device configuration
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
version: 1021.9.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The logging event levels have been updated to simplify the LWM2M device configuration. Previously available logging levels were: NONE, LIFECYCLE, TRAFFIC, FIRMWARE, and VERBOSE. This has now been simplified to NONE, LIFECYCLE, and VERBOSE. TRAFFIC and FIRMWARE log events have been merged with VERBOSE. This configuration will be automatically updated in the device managed object.
