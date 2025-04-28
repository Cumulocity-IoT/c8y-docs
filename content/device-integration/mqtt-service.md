---
weight: 26
title: MQTT Service
layout: bundle
sector:
  - device_management
---

{{< c8y-admon-preview >}}
This feature is in **Public Preview**.
That is, it is not yet generally available and may be subject to change in the future.
{{< /c8y-admon-preview >}}

{{< c8y-admon-req >}}
To work with the MQTT Service, the following requirements must be met:
* The {{< product-c8y-iot >}} Messaging Service must be deployed in your {{< product-c8y-iot >}} environment.
* The {{< product-c8y-iot >}} MQTT Service must be deployed in your {{< product-c8y-iot >}} environment.

No additional steps are required to enable the MQTT Service for an individual tenant.
{{< /c8y-admon-req >}}

The MQTT Service is a new MQTT endpoint implementation for {{< product-c8y-iot >}} which provides the following benefits:

* Support for sending and receiving arbitrary payloads on any MQTT topic.
  Note that the topics that are used by the existing {{< product-c8y-iot >}} [Core MQTT](/device-integration/mqtt/) implementation cannot be used with the MQTT Service.
* Support for user-provided microservices that can send and receive messages on MQTT topics.
  The typical use case for such a microservice is to map between MQTT device payloads, and the {{< product-c8y-iot >}} REST and Notifications 2.0 APIs.
* Multi-tenancy support.
  A single endpoint serves multiple tenants and tenants are completely isolated from each other.
* TLS support.
* Authentication using client X.509 certificates.

The MQTT Service does not replace the existing [Core MQTT](/device-integration/mqtt/) capability of {{< product-c8y-iot >}} which supports sending device data already in the {{< product-c8y-iot >}} format directly into the {{< product-c8y-iot >}} platform.
The new capability provided by the MQTT Service allows for easier integration of MQTT devices that cannot use the {{< product-c8y-iot >}} format.
It also supports more flexible communication patterns between devices, applications, and the {{< product-c8y-iot >}} platform, controlled by user-provided microservices.

This documentation does not describe the basics of MQTT communication.
If you are unfamiliar with MQTT, we recommend you to consult one of the numerous introductions on the internet.
Some references can be found on the <a href="https://mqtt.org/mqtt-specification/" target="_blank">MQTT website</a>.
