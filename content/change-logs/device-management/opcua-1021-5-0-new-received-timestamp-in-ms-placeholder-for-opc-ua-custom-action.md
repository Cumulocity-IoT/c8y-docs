---
date: 2026-03-31
title: New receivedTimestampInMs placeholder for OPC UA custom action requests
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-4213
version: 1021.5.0
---
For OPC UA custom action requests, you can now include the timestamp of when the node value is received by the OPC UA device gateway. Simply add the `${receivedTimestampInMs}` placeholder to the custom action body template in the OPC UA device protocol. This enables users to track when a node value is processed within the gateway.
