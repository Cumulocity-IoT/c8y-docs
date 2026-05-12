---
date: ""
title: >-
  MQTT Service now supports Will Message
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Platform services
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-hc5Tfixeqqei
    label: mqtt-service
ticket: MTM-66683
version: 3000.0.8
---

The {{< product-c8y-iot >}} MQTT Service now supports the MQTT _Will Message_ feature for both MQTT version 3.1.1 and 5.0 devices.

When a device that connected with a Will Message disconnects unexpectedly, the MQTT Service publishes the Will Message to the Messaging Service `from-device` topic, where it can be consumed by microservice and external application clients like any other device message.
Clients can identify Will Messages using the `tx.lastWillMessage` Pulsar message property.

The MQTT version 5.0 Will Message properties _Delay Interval_, _Payload Format Indicator_, _Content Type_, _Response Topic_, _Correlation Data_, _Message Expiry Interval_ and _User Property_ are forwarded to consumers using the MQTT Service standard Pulsar message properties.

See the [Will Message](/device-integration/mqtt-service/#will-message) and [Message payloads and properties](/device-integration/mqtt-service/#message-payloads-properties) documentation for details.
