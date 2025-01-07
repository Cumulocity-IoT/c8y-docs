---
date: 2024-09-19
title: Custom firmware update URL in LWM2M device configuration is now deprecated
product_area: Device management & connectivity
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-3080
version: 10.20.371.0
---
The custom firmware update URL has been replaced with a standard firmware definition that points to an external URL. Right now this parameter is still available and takes precedence over any other option, but it will be removed in future LWM2M agent versions.