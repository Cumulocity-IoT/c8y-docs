---
weight: 10
title: Introduction
layout: bundle
sector:
  - device_management
---

{{< company-c8y >}} offers a wide range of functionality for interfacing IoT devices and other IoT-related data sources with the {{< product-c8y-iot >}} platform.

The integration approach depends on the device capabilities and use case:

### Integration via thin-edge.io (#integration-via-thin-edge-io)

We recommend integrating devices via [thin-edge.io](https://thin-edge.io/), an open-source, cloud-agnostic edge framework optimized for lightweight IoT devices. thin-edge.io can be slimmed down to run with less than 1 MB footprint, making it suitable even for constrained devices while supporting both x86_64 and ARM-based processor architectures.

**Advantages of using thin-edge.io:**
* **Native SmartREST efficiency**: The agent automatically translates simple local JSON messages into {{< product-c8y-iot >}}'s highly efficient SmartREST protocol, significantly reducing bandwidth.
* **Zero-code device management**: Get immediate access to all device management features - including software management, configuration updates, log retrieval, and remote access.
* **Automatic child device routing**: Acting as a gateway requires no extra logic; simply publishing data with a child ID causes thin-edge.io to automatically register the external devices (such as a sensor) in {{< product-c8y-iot >}}'s inventory, and route the data to the correct representation of the child device in {{< product-c8y-iot >}}.
* **Modular extensibility**: The architecture is designed around plugins, allowing you to extend functionality without having to recompile the core agent.
* **Language-agnostic decoupling**: Because thin-edge.io uses a local MQTT bus for communication, your application logic can be written in any language and remains completely isolated from the connectivity logic.
* **Automated certificate lifecycle**: The built-in CLI tools handle the generation, signing, uploading, and rotation of X.509 security certificates.

See the tutorial [Getting started with thin-edge.io](https://thin-edge.github.io/thin-edge.io/start/getting-started/) for an easy-to-follow and hands-on example.

### Microcontroller-based devices (#microcontroller-based-devices)

For highly constrained devices with microcontrollers that cannot run thin-edge.io, you can integrate directly via the Core [MQTT](/device-integration/mqtt) and [REST](/device-integration/device-integration-rest/) APIs along with [SmartREST](/smartrest/smartrest-two/) for efficient communication. These can be implemented using available MQTT client libraries such as [Eclipse Paho](https://www.eclipse.org/paho/). For standard-compliant device management, the [LWM2M](/device-integration/lwm2m/) protocol is also supported.

### IoT gateways and data integration (#iot-gateways-and-data-integration)

Not all devices are directly connected to the internet. In such cases, IoT gateways act as intermediaries, collecting data from devices and forwarding it to {{< product-c8y-iot >}}. Several data integration options are available:

* **[OPC UA](/device-integration/opcua/)**: Industrial automation protocol for connecting PLCs and industrial equipment.
* **[MQTT Service](/device-integration/mqtt-service/)**: Flexible MQTT endpoint allowing user-provided microservices to map between custom device payloads and the {{< product-c8y-iot >}} data model.
* **thin-edge.io protocol drivers**: Extend thin-edge.io with custom protocol support for proprietary or specialized device protocols.
* **Partner gateways**: Use pre-integrated partner gateways that bring support for the required protocol. Explore certified partner devices in the [Device Partner Portal](https://ecosystem.cumulocity.com/).

### LPWAN integration (#lpwan-integration)

Low-Power Wide-Area-Network (LPWAN) technologies are critical for use cases requiring devices to:
* Run on a single battery for years at a very low cost.
* Only transmit small amounts of data intermittently.
* Be positioned in distributed or hard-to-reach locations.

{{< product-c8y-iot >}} provides dedicated integrations for various LPWAN technologies including LoRa and Sigfox. Refer to [LoRa Actility](/device-integration/lora-actility/), [LoRa LORIOT](/device-integration/lora-loriot/), and [Sigfox](/device-integration/sigfox/) for details. For cellular devices, [LWM2M](/device-integration/lwm2m/) can be used.

### Agent concepts (#agent-concepts)

A device agent is a piece of software that runs locally on a device or gateway. Its primary purpose is to act as the intermediary between the device’s physical hardware and the cloud platform. To learn more about the general concept of agents being used for interfacing IoT devices and data sources with {{< product-c8y-iot >}}, refer to [Interfacing devices](/device-integration/interfacing-devices/).
