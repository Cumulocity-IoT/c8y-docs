---
date: 2024-09-19
title: LWM2M firmware images are hosted via HTTP by all LWM2M agents in the cluster 
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
ticket: DM-3738
version: 10.20.359.0
---
In earlier versions of the LWM2M agent, only a single agent within the cluster was responsible for hosting the firmware image via an HTTP endpoint. This setup could occasionally lead to 401 responses when devices attempted to download the firmware. With the latest update, all agents in the cluster are synchronized and now host the same set of firmware images, ensuring seamless and reliable firmware downloads. 
