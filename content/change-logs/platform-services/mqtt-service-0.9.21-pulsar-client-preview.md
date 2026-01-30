---
date: 2025-10-02
title: MQTT Service Java client SDK is replaced by direct Messaging Service connections
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
issue: MTM-64302
version: 0.9.21
---

{{< c8y-admon-caution >}}
This change only affects the new {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) capability.

The existing {{< product-c8y-iot >}} [Core MQTT](/device-integration/mqtt/) capability is **not** affected.
{{< /c8y-admon-caution >}}

{{< c8y-admon-preview >}}
This feature is in Public Preview and may be subject to change in the future.
{{< /c8y-admon-preview >}}

As [previously announced](/change-logs/#mqtt-service-0.9.6-device-isolation-api-change), when the {{< product-c8y-iot >}} [MQTT Service](/device-integration/mqtt-service/) transitions from Public Preview to General Availability (GA), the MQTT Service Java client SDK will no longer be supported.
Instead, microservices and external applications (_clients_) that need to exchange messages with MQTT devices connected to the MQTT Service will connect directly to the {{< product-c8y-iot >}} Messaging Service using the [Apache Pulsar](https://pulsar.apache.org/) client protocol.
Direct Messaging Service connectivity for MQTT Service clients is now available as part of the MQTT Service Public Preview.

All microservice and external application clients currently using the MQTT Service Java client SDK should migrate to the Pulsar client protocol as soon as possible.
Detailed [documentation](/device-integration/mqtt-service/#pulsar-client) of the requirements, conventions and best practices for connecting Pulsar clients to the Messaging Service is available, along with [example code for an external client](https://github.com/Cumulocity-IoT/cumulocity-examples/tree/develop/mqtt-service/java-simple-pulsar-client).
Further examples will be published before the MQTT Service GA date.

#### Impact on clients using the MQTT Service Java client SDK

The MQTT Service Java client SDK is [deprecated](/change-logs/#mqtt-service-0.9.x-sdk-java-announcement) but will remain available and supported until the MQTT Service GA date.
Clients can continue to use the Java client SDK in parallel with direct connections to the Messaging Service until then.
MQTT messages published by connected devices will be delivered to both Java client SDK clients and directly connected clients.
Messages published to an MQTT topic by either type of client will be delivered to connected devices that are subscribed to that topic, subject to device-level isolation constraints.
