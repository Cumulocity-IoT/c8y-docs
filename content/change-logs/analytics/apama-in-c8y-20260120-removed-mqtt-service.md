---
date: '2026-02-05'
title: MQTT Service tenant isolation EPL API removed from Streaming Analytics
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
ticket: PAM-35340
version: 27.23.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-05'
  - label: apj.cumulocity.com
    date: '2026-02-11'
  - label: jp.cumulocity.com
    date: '2026-02-11'
---

The deprecated EPL API (`com.apama.cumulocity.mqttservice`) is removed from Streaming Analytics. This API was provided for the MQTT Service tenant isolation feature preview.

For deprecation details, refer to [Deprecation of MQTT Service support in EPL apps](https://cumulocity.com/docs/change-logs/?component=.component-streaming-analytics#apama-in-c8y-20251010-deprecation-of-mqtt-service-support-in-epl-apps).

**Migrate your applications**

Replace the deprecated API with the new DeviceService API (`com.apama.cumulocity.devices`). This API uses the [MQTT Service device isolation capability](https://cumulocity.com/docs/change-logs/?#mqtt-service-0.9.6-device-isolation-api-change).

See [Using {{< product-c8y-iot >}} MQTT Service](/streaming-analytics/epl-apps/#using-cumulocity-mqtt-service) for migration instructions and usage examples.
