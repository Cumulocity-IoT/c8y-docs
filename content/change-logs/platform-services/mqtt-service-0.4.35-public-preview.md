---
date: 2025-05-09
title: MQTT Service Public Preview release
change_type:
  - value: change-pXAlHAWka
    label: Preview
product_area: Platform services
component:
  - value: component-LcWEQW5gs
    label: MQTT
build_artifact:
  - value: tc-hc5Tfixeqqei
    label: mqtt-service
---

{{< c8y-admon-preview >}}
This feature is in Public Preview, that is, it is not enabled by default and may be subject to change in the future.

To determine whether the feature is available for your tenant, open the Administration application and navigate to **Ecosystem** > **Microservices**.
If you see the `Mqtt-service` microservice subscription for your tenant, the feature is already available.
Otherwise, please contact [product support](/additional-resources/contacting-support/) to request the microservice subscription for your tenant.
{{< /c8y-admon-preview >}}

![MQTT Service subscription](/images/mqtt-service/admin-mqtt-service-subscription.png)

The {{< product-c8y-iot >}} MQTT Service is a new MQTT endpoint implementation for {{< product-c8y-iot >}} that provides the following benefits:

* Sending and receiving arbitrary payloads on any MQTT topic.
* User-provided microservices can send and receive messages on MQTT topics, and map messages to and from the {{< product-c8y-iot >}} data model.
* Multi-tenant support with full tenant isolation.
* Bi-directional TLS including authentication with X.509 client certificates.

The MQTT Service does not replace the existing [Core MQTT](/device-integration/mqtt/) capability of {{< product-c8y-iot >}} that supports sending device data already in the {{< product-c8y-iot >}} domain model directly into the platform.
The new capability provided by the MQTT Service allows for easier integration of MQTT devices that cannot use the {{< product-c8y-iot >}} domain model.
It also supports more flexible communication patterns between devices, applications, and the {{< product-c8y-iot >}} platform, controlled by user-provided microservices.

Note that in Public Preview, MQTT Service clients *within a tenant* are **not** isolated from one another.
That is, an MQTT client can subscribe to topic(s) that another client is publishing on, and receive the messages sent by that client.
Full device isolation will be available in the first General Availability release of the MQTT Service.

For more details about this feature refer to the [MQTT Service](/device-integration/mqtt-service/) documentation.
