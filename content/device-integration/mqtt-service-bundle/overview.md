---
weight: 10
layout: redirect
title: Overview
---

### Architecture {#architecture}

The MQTT Service works together with the Messaging Service to provide a framework for highly customizable and flexible MQTT message processing solutions.
The diagram below illustrates how a message flows, starting from the device, through the Messaging Service, 
then to a user-provided microservice where it is converted to the {{< product-c8y-iot >}} JSON format and
delivered to {{< product-c8y-iot >}} using the standard REST API.

![MQTT Service send](/images/mqtt-service/mqtt-service-send.svg)

All MQTT messages published to the MQTT Service are forwarded to the Messaging Service, where they are persisted, waiting to be consumed.
A custom microservice that understands the topic and payload structure can, with the help of the [Java Client](/device-integration/mqtt-service#java-client), 
consume the MQTT messages, translate them to the {{< product-c8y-iot >}} format, and then use the [Microservice SDK](/microservice-sdk/java) to push them into {{< product-c8y-iot >}}.

Similarly, messages can be sent to devices, as shown in the diagram below.
In this case, the user-provided microservice receives messages from {{< product-c8y-iot >}} through a Notifications 2.0 subscription.
These messages are mapped to the payload structure used by the MQTT devices, then published to MQTT topics using the [Java Client](/device-integration/mqtt-service#java-client).

![MQTT Service push](/images/mqtt-service/mqtt-service-push.svg)

As with MQTT messages published by devices, messages published from a microservice will be forwarded to the Messaging Service, where they can be consumed by MQTT devices subscribed to the relevant topics.

### MQTT Service compared to Core MQTT {#mqtt-service-vs-cumulocity-iot-mqtt}

The table below presents a basic comparison between the {{< product-c8y-iot >}} Core MQTT functionality and that of the MQTT Service.

|                              | Core MQTT                                               | MQTT Service                                                                        |
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
