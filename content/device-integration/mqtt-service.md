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
* Your tenant must be subscribed to the mqtt-service microservice.
  This may have been done automatically, depending on how your {{< product-c8y-iot >}} environment was configured.
  To check the subscription, open the Administration application and navigate to **Ecosystem** > **Microservices**.
  If you do not see the mqtt-service microservice listed, contact [product support](/additional-resources/contacting-support/) (for public environments) or your {{< product-c8y-iot >}} administrator (for dedicated environments) to request the subscription for your tenant.
{{< /c8y-admon-req >}}

The MQTT Service is a new MQTT endpoint implementation for {{< product-c8y-iot >}} that provides the following benefits:

* Sending and receiving arbitrary payloads on any MQTT topic.
  Note that the topics used by the {{< product-c8y-iot >}} [Core MQTT](/device-integration/mqtt/) implementation currently cannot be used with the MQTT Service.
* User-provided microservices can send and receive messages on MQTT topics, and map messages to and from the {{< product-c8y-iot >}} data model.
  The typical use case for such a microservice is to map between MQTT device payloads, and the {{< product-c8y-iot >}} REST and Notifications 2.0 APIs.
* Multi-tenancy support.
  A single endpoint serves multiple tenants and tenants are completely isolated from each other.
* Bi-directional TLS support.
  All MQTT traffic is encrypted and clients can authenticate using X.509 certificates.

The MQTT Service does not replace the existing [Core MQTT](/device-integration/mqtt/) capability of {{< product-c8y-iot >}} that supports sending device data already in the {{< product-c8y-iot >}} domain model directly into the platform.
The new capability provided by the MQTT Service allows for easier integration of MQTT devices that cannot use the {{< product-c8y-iot >}} domain model.
It also supports more flexible communication patterns between devices, applications, and the {{< product-c8y-iot >}} platform, controlled by user-provided microservices.

**Device isolation** is the default behaviour for the MQTT Service. Each MQTT client has its own private topic space and cannot directly receive messages from other clients, enhancing security and isolation between devices.

This documentation does not describe the basics of MQTT communication.
If you are unfamiliar with MQTT, we recommend you to consult one of the numerous introductions on the internet.
Some references can be found on the <a href="https://mqtt.org/mqtt-specification/" target="_blank">MQTT website</a>.
