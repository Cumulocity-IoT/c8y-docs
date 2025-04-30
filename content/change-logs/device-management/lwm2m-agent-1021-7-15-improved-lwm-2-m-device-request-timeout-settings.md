---
date: '2025-04-24'
title: Improved LWM2M device request timeout settings
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
ticket: DM-2354
version: 1021.7.15
---
The LWM2M agent now provides enhanced control over request timeout settings for LWM2M devices. The timeout value must always remain within the minimum and maximum limits defined in the global LWM2M microservice properties. Invalid values, such as zero or negative numbers, can no longer be entered. If the agent detects a value below the minimum threshold, it will automatically adjust it to the allowed minimum. Similarly, any value exceeding the maximum limit will be corrected to the allowed maximum.
