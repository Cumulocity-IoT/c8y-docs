---
date: '2025-10-22'
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
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---

Due to changes in the {{< product-c8y-iot >}} MQTT Service preview version, the current EPL API for the MQTT Service (`com.apama.cumulocity.mqttservice`) is now deprecated.

Use the DeviceService API from (`com.apama.cumulocity.devices`) instead, see [The DeviceService bundle]({{< link-apama-webhelp >}}/standard-connectivity-plugins/device-service/).
