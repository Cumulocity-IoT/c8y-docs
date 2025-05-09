---
weight: 20
title: MQTT
layout: bundle
sector:
  - device_management
---

The MQTT implementation of {{< product-c8y-iot >}} provides the following benefits:

* Multi-tenancy support: A single endpoint serves multiple tenants.
* Device identity management: Devices authenticate using device-specific credentials.
* Device registration: Non-personalized devices can be deployed by pairing them with {{< product-c8y-iot >}} tenants.
* Device management: Rich, pre-defined device management payload formats to enable out-of-the-box management of millions of devices.
* Standard IoT payload formats: Pre-defined payload formats to support IoT sensor readings, alarm management, remote control and device hierarchies.
* Custom payload formats: Additional payload formats can be added.
* Minimum traffic overhead.
* Processing modes: Control whether data is persisted in {{< product-c8y-iot >}} database, transiently passed to real-time processing, processed using quiescent mode which ensures that real-time notifications are disabled or is processed using CEP mode that ensures data is transiently sent to real-time processing engine only with real-time notifications disabled.
* Full bi-directional communication.
* MQTT over WebSockets support.
* TLS support.
* Full horizontal scalability.

Also see our [SmartREST documentation](/smartrest/smartrest-two).

This section does not describe the basics of MQTT communication. If you are unfamiliar with MQTT, we recommend you to consult one of the numerous introductions in the Internet. Some references can be found on the [MQTT website](https://mqtt.org/mqtt-specification/).

{{< c8y-admon-info >}}
For all MQTT connections to the platform, the maximum accepted payload size is 16184 bytes (16KiB), which includes both message header and body. The header size varies, but its minimum is 2 bytes.
{{< /c8y-admon-info >}}
