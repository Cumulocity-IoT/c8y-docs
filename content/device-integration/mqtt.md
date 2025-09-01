---
weight: 20
title: Core MQTT
layout: bundle
sector:
- device_management
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:39Z'
---
The Core MQTT implementation of {{< product-c8y-iot >}} provides the following benefits:

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

The Core MQTT capability of the {{< product-c8y-iot >}} platform allows MQTT devices to send messages directly into {{< product-c8y-iot >}}, provided that the device implements the pre-defined topic schema and payload formats of Core MQTT.
To integrate MQTT devices that do not support the specific {{< product-c8y-iot >}} protocol, a tenant must implement a mapping between the device protocol and the {{< product-c8y-iot >}} API.
This can be done using a microservice integrated with the {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/), or with an external [agent](/device-integration/interfacing-devices/).

Also see our [SmartREST documentation](/smartrest/smartrest-two).

This documentation does not describe the basics of MQTT communication.
If you are unfamiliar with MQTT, we recommend you to consult one of the numerous introductions on the internet.
Some references can be found on the <a href="https://mqtt.org/mqtt-specification/" target="_blank">MQTT website</a>.

{{< c8y-admon-info >}}
For all Core MQTT connections to the platform, the maximum accepted payload size is 16184 bytes (16KiB), which includes both message header and body. The header size varies, but its minimum is 2 bytes.
{{< /c8y-admon-info >}}
