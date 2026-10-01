---
date: 
title: Core MQTT device support in the MQTT Service is now generally available
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Platform services
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-hc5Tfixeqqei
    label: mqtt-service
ticket: MTM-67773
version: 3000.1.0
---
Support for Core MQTT devices using the SmartREST 1.0, SmartREST 2.0 and JSON-over-MQTT protocols in the [MQTT Service](/device-integration/mqtt-service) is now generally available.
It is no longer required to enable the `mqtt-service.smartrest` feature toggle for your tenant.

The following limitations of the Public Preview have been removed:
* Pending operations are sent to a device when it subscribes to its operation topics, so they no longer need to be explicitly requested by the device.
* Devices may be disconnected in certain circumstances. See [Device disconnection](/device-integration/mqtt-service/#core-mqtt-device-disconnection) for details.
* [Connection monitoring](/device-integration/fragment-library/#connection-monitoring) is supported, so the connection status of devices connected to the MQTT Service is updated.
* Operation delivery to devices is tracked.

See [Core MQTT device support](/device-integration/mqtt-service/#core-mqtt-support) for details of the remaining differences compared to connecting devices directly to the {{< product-c8y-iot >}} core.
