---
date: '2026-10-16'
title: >-
  OPC UA device gateway data forwarding through thin-edge.io MQTT topics now
  generally available (GA)
product_area: Device management & connectivity
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-Tf05_KQ-B
    label: OPC UA
build_artifact:
  - value: tc-MLn0oFRX-
    label: opcua
ticket: DM-7759
version: 1023.2.18
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-16'
  - label: jp.cumulocity.com
    date: '2026-10-19'
---
OPC UA device gateway data forwarding through thin-edge.io MQTT topics, introduced as a Preview in opcua-device-gateway 1021.9.0, is now generally available (GA). It is fully supported from CD version 1023.2.18 and will be included in the 2027 annual release. As announced in version 1023.1.0, the gateway connects to {{< product-c8y-iot >}} through the local thin-edge.io proxy.

Merging cyclic reads is optional. It is turned off by default and can be turned on in the gateway configuration:

- `gateway.mappings.mergeCyclicRead`: set to true to combine all values read in one cyclic-read cycle into a single measurement and a single event per device, instead of one per OPC UA node. This reduces the number of MQTT messages. Default: false.
- `gateway.mappings.mergedMeasurementType`: type of the merged measurement. Default: c8y_OpcuaMeasurement.
- `gateway.mappings.mergedEventType`: type of the merged event. Default: c8y_OpcuaEvent.

Merging only applies to device types that use cyclic reads, and only when MQTT forwarding is turned on (`gateway.thinEdge.useForDataForwarding: true`).

For more details about how to enable this feature, see the [OPC UA user documentation](/device-integration/opcua/#device-protocol-behavior-in-mqtt-forwarding-mode).
