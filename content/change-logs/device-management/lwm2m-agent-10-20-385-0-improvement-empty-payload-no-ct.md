---
date:
title: Allowing LWM2M device to send empty payload without content-type data
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
ticket: DM-3989
version: 10.20.385.0
---

The LWM2M specification allows devices to send an empty payload when there is no data to report. 
In case of an empty payload, no content-type is required.
Previously, LWM2M agents would reject messages with an empty payload and no content-type. 
Now, these messages will be accepted and processed as intended. 
