---
date: ""
title: OPC UA Device gateway with thin-edge Mqtt Forwarding
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
ticket: DM-4473
version: 1021.9.0
---
Starting from opcua-device-gateway version 1021.9.0, the device gateway has ability to forward data from OPC-UA servers to thin-edge MQTT topics instead of sending them directly to Cumulocity. Primary use case is to use thin-edge also for data forwarding when running in thin-edge mode. While doing this, opcua-device-gateway bundles multiple collected measurement/event series into a single measurement/event when its from the same device protocol and using cyclic reads.