---
date: 2024-09-19
title: Enhanced serialization formats for LWM2M operation responses
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
ticket: DM-2769
version: 10.20.366.0
---
In previous versions, the LWM2M agent did not utilize appropriate formats to serialize link arrays, opaque data, and date formats in operation responses. With this update, the LWM2M agent now provides adequate and consistent representations for these data types in both operation responses and the **LWM2M objects** tab. Key changes include:

The LWM2M agent now employs hex strings for representing opaque data in operation responses and the **LWM2M objects** tab.
Link arrays are maintained using the CoRE link syntax in both locations.
Date values in operation responses are converted into a JSON fragment, encompassing both a human-readable time string and a timestamp value.
