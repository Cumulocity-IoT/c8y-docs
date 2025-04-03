---
date: ""
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
For OPC UA custom action requests, the timestamp when the node value is received by the OPC UA device gateway can now be added to the request body by adding the `${receivedTimestampInMs}` placeholder to the variable's custom action body template in the OPC UA device protocol. This allows users to track when a node value is processed within the OPC UA device gateway.
