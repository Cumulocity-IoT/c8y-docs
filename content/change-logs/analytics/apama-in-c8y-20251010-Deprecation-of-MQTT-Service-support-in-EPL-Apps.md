---
date: 2025-10-22
title: Deprecation of MQTT Service support in EPL Apps
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
version: 26.257.0
---

Due to changes in the Cumulocity MQTT Service preview version, the current EPL API for the MQTT Service (`com.apama.cumulocity.mqttservice`) is now deprecated. Instead, use the new API from `com.apama.cumulocity.devices`. Specifically, use the `com.apama.cumulocity.devices.DeviceConsumer` API for consuming device messages from the MQTT Service (the `from-device` Pulsar topic) and the `com.apama.cumulocity.devices.DevicePublisher` API for publishing messages to devices connected to the MQTT Service (the `to-device` Pulsar topic).
