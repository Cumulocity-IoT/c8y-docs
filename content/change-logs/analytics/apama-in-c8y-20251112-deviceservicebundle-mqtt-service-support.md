---
date: 2026-03-31
title: DeviceService bundle for MQTT Service support in EPL Apps
change_type:
  - value: change-2c7RdTdXo4
    label: Preview
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-4924
version: 26.257.0
---

EPL Apps now supports connecting to the {{< product-c8y-iot >}} MQTT Service with the new DeviceService API. This allows handling of device-native messages sent to the MQTT Service within {{< product-c8y-iot >}} EPL Apps. For more details, see [Using {{< product-c8y-iot >}} MQTT Service](/streaming-analytics/epl-apps/#using-cumulocity-mqtt-service).

For detailed configuration options and the API reference, see [The DeviceService bundle]({{< link-apama-webhelp >}}/standard-connectivity-plugins/device-service/).

This bundle replaces the deprecated Apama EPL API for the MQTT Service.

{{< c8y-admon-info >}}
The {{< product-c8y-iot >}} MQTT Service and The DeviceService features are currently in **Public Preview** and may be subject to change in the future.
{{< /c8y-admon-info >}}
