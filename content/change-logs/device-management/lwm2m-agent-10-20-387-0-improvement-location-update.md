---
date: '2024-10-24'
title: LWM2M location data handling has been improved
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
ticket: DM-3915
version: 1020.386.0
---

In earlier LWM2M agent versions, device location updates occurred only when the device provided complete location object data. 
Now, updates happen whenever both latitude and longitude resources are reported together.
