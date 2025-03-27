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
Now for the OPC UA custom action requests, the timestamp when the node value is received by OPC UA device gateway can be added to the request body. This can be done by adding ${receivedTimestampInMs} placeholder to variables custom action body template in OPC UA device protocol. This allows users to track when a node value is processed within the OPC UA device gateway.