---
date: ""
title: dtls-connection-persistence
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
--- ## Change Logs Title: LWM2M Agent can now restore DTLS connections after restart Description: The LWM2M Agent now persists active DTLS connection information to an encrypted file. Connections are saved periodically and during graceful shutdown. Upon restart, the agent restores previously established connections, allowing devices to resume normal data transmission without requiring reconnection.