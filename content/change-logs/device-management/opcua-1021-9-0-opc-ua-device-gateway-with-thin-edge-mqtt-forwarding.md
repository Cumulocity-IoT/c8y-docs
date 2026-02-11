---
date: '2025-07-28'
title: OPC UA device gateway with thin-edge.io MQTT Forwarding
product_area: Device management & connectivity
change_type:
  - value: change-pXAlHAWka
    label: Preview
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-4473
version: 1021.9.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
Starting from the opcua-device-gateway version 1021.9.0, the OPC UA device gateway can forward data from OPC UA servers to thin-edge.io MQTT topics instead of sending it directly to {{< product-c8y-iot >}}. The primary use case is to utilize thin-edge.io also for data forwarding when running in thin-edge.io mode. While doing this, the OPC UA device gateway bundles multiple collected measurement/event series into a single measurement/event when they are from the same device protocol and use cyclic reads.
