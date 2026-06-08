---
date: ''
title: Improved reliability of LWM2M data forwarding to the MQTT Service
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
ticket: DM-6238
version: 
---
Previously, when the LWM2M service forwarded device data to MQTT service and the publish failed (for example, when the messaging backend was unavailable or quota-limited), the message was dropped and never retried. Failed publishes are now buffered and retried on a scheduled interval, reducing message loss during transient backend outages. The retry queue size, per-message retry cap, and retry interval are configurable.
