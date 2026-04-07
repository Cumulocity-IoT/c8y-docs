---
date: ""
title: LWM2M agent can now restore DTLS connections after restart
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-1KLUzmqfe
    label: LWM2M
build_artifact:
  - value: tc-ggH2M4hf3
    label: lwm2m-agent
ticket: DM-5060
version: 1022.1.0
---
The LWM2M agent now persists active DTLS connection information to an encrypted file. Connections are saved periodically and during graceful shutdown. Upon restart, the agent restores previously established connections, allowing devices to resume normal data transmission without requiring reconnection.
