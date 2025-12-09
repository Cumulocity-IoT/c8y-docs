---
weight: 10
title: Introduction
layout: bundle
sector:
  - device_management
---

{{< company-c8y >}} offers a wide range of functionality for interfacing IoT devices and other IoT-related data sources with the {{< product-c8y-iot >}} platform.

The integration approach depends on the device capabilities and use case:

### Integration via thin-edge.io

We recommend integrating devices via [thin-edge.io](https://thin-edge.io/), an open-source, cloud-agnostic edge framework optimized for lightweight IoT devices. thin-edge.io can be slimmed down to run with less than 1 MB footprint, making it suitable even for constrained devices with a microprocessor. See the tutorial [Getting started with thin-edge.io](https://thin-edge.github.io/thin-edge.io/start/getting-started/) for an easy-to-follow and hands-on example.

### Micro-controller based devices

For highly constrained devices with micro-controllers that cannot run thin-edge.io, you can integrate directly via the Core [MQTT](/device-integration/mqtt) and [REST](/device-integration/device-integration-rest/) APIs along with [SmartREST](/smartrest/smartrest-two/) for efficient communication. These can be implemented using available MQTT client libraries such as [Eclipse Paho](https://www.eclipse.org/paho/). For standard-compliant device management, the [LWM2M](/device-integration/lwm2m/) protocol is also supported.

### IoT gateways and data integration

Not all devices are directly connected to the internet. In such cases, IoT gateways act as intermediaries, collecting data from devices and forwarding it to {{< product-c8y-iot >}}. Several data integration options are available:

* **OPC UA**: Industrial automation protocol for connecting PLCs and industrial equipment. See [OPC UA](/device-integration/opcua/).
* **MQTT Service**: Flexible MQTT endpoint allowing user-provided microservices to map between custom device payloads and the {{< product-c8y-iot >}} data model. See [MQTT Service](/device-integration/mqtt-service/).
* **thin-edge.io protocol drivers**: Extend thin-edge.io with custom protocol support for proprietary or specialized device protocols.
* **Partner gateways**: A common option is to use a pre-integrated partner gateways that brings support for the required protocol. Explore certified partner devices in the [Device Partner Portal](https://ecosystem.cumulocity.com/).

### LPWAN integration

For Low-Power Wide-Area-Network (LPWAN) devices using technologies like LoRa or Sigfox, {{< product-c8y-iot >}} provides dedicated integrations. Refer to [LoRa Actility](/device-integration/lora-actility/), [LoRa LORIOT.io](/device-integration/lora-loriot/) and [Sigfox](/device-integration/sigfox/) for details. For cellular devices, [LWM2M](/device-integration/lwm2m/) can be used.

### Agent concepts

For information on the general concept of agents being used for interfacing IoT data sources with {{< product-c8y-iot >}}, refer to [Interfacing devices](/device-integration/interfacing-devices/).
