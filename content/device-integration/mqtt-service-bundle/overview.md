---
weight: 10
layout: redirect
title: Overview
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
It also supports more flexible communication patterns between devices, applications, and the {{< product-c8y-iot >}} platform, controlled by user-proviced microservices.

This documentation does not describe the basics of MQTT communication.
If you are unfamiliar with MQTT, we recommend you to consult one of the numerous introductions on the internet.
Some references can be found on the <a href="https://mqtt.org/mqtt-specification/" target="_blank">MQTT website</a>.

### Architecture {#architecture}

MQTT Service works together with the Messaging Service to provide a framework for highly customizable and flexible MQTT message processing solutions.
The diagram below illustrates how a message flows, starting from the device, through the Messaging Service, 
then to a user-provided microservice where it is converted to the final {{< product-c8y-iot >}} REST request.

![MQTT Service send](/images/mqtt-service/mqtt-service-send.svg)

All MQTT messages coming to MQTT Service are forwarded to the Messaging Service, where they are persisted, waiting to be consumed.
A custom microservice that understands the topic and payload structure can, with the help of the [Java Client](/device-integration/mqtt-service#java-client), 
consume the MQTT messages, translate them to the {{< product-c8y-iot >}} format, and then use the [Microservice SDK](/microservice-sdk/java) to push them into {{< product-c8y-iot >}}.

Similarly, messages can be sent to devices, as shown in the diagram below.

![MQTT Service push](/images/mqtt-service/mqtt-service-push.svg)

As with the messages coming from the device, a similar approach can be used to send messages back to the device.
Given the MQTT topic name, a microservice can push any MQTT message to a device using the [Java Client](/device-integration/mqtt-service#java-client).

### MQTT Service vs {{< product-c8y-iot >}} MQTT {#mqtt-service-vs-cumulocity-iot-mqtt}

The table below presents a basic comparison between the standard {{< product-c8y-iot >}} MQTT functionality and that of MQTT Service.

|                              | {{< product-c8y-iot >}} MQTT                            | MQTT Service                                                                        |
|:-----------------------------|:--------------------------------------------------------|:------------------------------------------------------------------------------------|
| QoS                          | 0, 1, 2                                                 | 0, 1                                                                                |
| Clean session                | Starting with clean session is recommended              | Starting with clean session is required                                             |
| Retained flag                | Not supported                                           | Not supported                                                                       |
| Last will                    | Supported                                               | Supported                                                                           |
| MQTT 5.0 features            | Not supported                                           | MQTT 5.0 clients can connect. Partial support for MQTT 5.0 features                 |
| Authentication               | Basic and TLS device certificates                       | Basic and TLS device certificates                                                   |
| Scalability                  | Horizontal                                              | Currently a single instance. Horizontal scaling will be available in the GA release |
| Topic format                 | Determined by the SmartREST 2.0 protocol                | Unrestricted. SmartREST topic names are reserved and cannot currently be used       |
| Payload                      | Determined by the SmartREST 2.0 protocol                | Unrestricted. The maximum message size is 128 KiB including all headers             |
| Extensibility                | Limited by SmartREST 2.0 custom templates               | Custom mapping microservices can support arbitrary MQTT-based protocols             |
| Message processors/consumers | Built-in message processor for each SmartREST 2.0 topic | Custom mapping microservices can support multiple processors for a topic            |
| JSON via MQTT                | Limited feature set                                     | Custom mapping microservices can support arbitrary JSON payloads                    |
