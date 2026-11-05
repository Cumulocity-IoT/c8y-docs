---
weight: 10
title: Introduction
layout: bundle
sector:
  - device_management
---

{{< company-c8y >}} offers a wide range of functionality for interfacing IoT devices and other IoT-related data sources with the {{< product-c8y-iot >}} platform.

The integration approach depends on the device capabilities and use cases. For a quick reference, see the diagram below. Each provided option is described in detail here.

![Device integration overview](/images/device-protocols/introduction/device-integration-overview.png)


### Certified devices {#icertified-devices}

Choosing pre-certified hardware from our device partner catalogue removes the overhead of custom integrations. Every listed device undergoes annual recertification testing against core platform capabilities to ensure full interoperability and complete transparency into integration depth.
Any certified device is automatically added to our device partner catalogue and referenced as a preferred connectivity option. Visit the [device certification page](https://ecosystem.cumulocity.com/partner-program/device-certification-and-partner/) to learn more about the program and how the certification process works.




### Integration via thin-edge.io {#integration-via-thin-edge-io}

For any Linux-based device, we recommend integrating it via [thin-edge.io](https://thin-edge.io/), an open-source, cloud-agnostic edge framework optimized for lightweight IoT devices. Thin-edge.io is fully integrated with the device management feature set, and we commit ourselves to also adopting new features for thin-edge.io as {{< product-c8y-iot >}} evolves. By requiring less than 16 MB of memory, it is suitable even for constrained devices while supporting both x86_64 and ARM-based processor architectures. 


**Advantages of using thin-edge.io:**

* **Zero-code device management**: Native out-of-the-box support for all device management features - including software management, configuration updates, log retrieval, and remote access.
* **Automatic child device routing**: No custom gateway logic is required as data is published with child IDs to automatically provision external connected sensors and devices in the inventory and route telemetry accordingly. 
* **Modular extensibility**: The architecture is designed around plugins, allowing you to extend functionality like the OPC UA gateway without having to recompile the core agent. Plugins can be deployed and managed via {{< product-c8y-iot >}}.
* **Community plugins**: A growing collection of open source plugins covers common edge use cases, such as Node-RED flow management, a demo container for evaluation, and a monit setup for process monitoring. 
* **Language-agnostic decoupling**: Because thin-edge.io uses a local MQTT bus for communication, your application logic can be written in any language and remains completely isolated from the connectivity logic.
* **Secure by design**: Certificate-based authentication by default, a memory-safe Rust codebase, and TLS-encrypted, outbound-only cloud connections.

See the tutorial [Getting started with thin-edge.io](https://thin-edge.github.io/thin-edge.io/start/getting-started/) for an easy-to-follow and hands-on example.

### Highly-constrained devices {#highly-constrained devices}

For highly constrained devices like microcontrollers that cannot run thin-edge.io, you can integrate directly via  [MQTT](/device-integration/mqtt) Service and [REST](/device-integration/device-integration-rest/) APIs along with [SmartREST](/smartrest/smartrest-two/) for efficient communication. [Data Preparation](https://cumulocity.com/docs/data-preparation/data-preparation-introduction/) or user-provided microservices can be used to map between custom device payloads and the {{< product-c8y-iot >}} data model. [Data Preparation](https://cumulocity.com/docs/data-preparation/data-preparation-introduction/) also creates devices automatically for unknown external IDs. For standard-compliant device management, the [LWM2M](/device-integration/lwm2m/) protocol is also supported. 
Alternatively, data can also be sent via a gateway. [Thin-edge.io](https://thin-edge.io/) simplifies this architecture by providing automatic child device modelling and routing.


### Automation protocol integration {#automation-protocol-integration}

Some devices communicate via protocols used on field or control level and do not directly connect to the internet. In such cases, IoT gateways act as intermediaries, collecting data from devices and forwarding it to {{< product-c8y-iot >}}. Several data integration options are available:
* **Partner gateways**: Use pre-integrated partner gateways that bring support for the required protocol. Explore certified partner devices in the [Device Partner Portal](https://ecosystem.cumulocity.com/).
* **[OPC UA](/device-integration/opcua/)**: Deploy {{< product-c8y-iot >}}'s OPC UA gateway with [thin-edge.io](https://thin-edge.io/) to connect to PLCs, data historians or SCADA servers.
* **[Protocol Gateway](https://github.com/thin-edge/takebishi-devicegateway):** Extend [thin-edge.io](https://thin-edge.io/) with the Protocol Gateway which supports 320+ device types and protocols like BACnet, CAN or IEC 61850
* **[thin-edge.io](https://thin-edge.io/)** protocol drivers: Extend thin-edge.io with custom protocol support for proprietary or specialized device protocols.

### LPWAN integration {#lpwan-integration}

A low-power, wide-area network (LPWAN) is a wireless telecommunication network designed for long-range, low bit-rate communication between IoT devices. This technology is critical for deployment scenarios requiring low-cost devices to operate on a single battery for years, transmit small amounts of data intermittently, and maintain reliable connectivity across distributed or hard-to-reach locations.
{{< product-c8y-iot >}} integrates with LoRa Network Servers for non-IP devices. Refer to [ Actility LoRa](/device-integration/lpwan/#actility-lora) and [Loriot LoRa](/device-integration/lpwan/#loriot-lora) for details. For cellular devices using NB-IoT or LTE-M, we recommend using [LWM2M](/device-integration/lwm2m/).
