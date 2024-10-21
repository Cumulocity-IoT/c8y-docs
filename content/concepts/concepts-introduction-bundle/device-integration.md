---
weight: 20
title: Device integration
---

{{< product-c8y-iot >}} offers multiple methods for connecting devices:

- **Pre-integrated IoT gateways**: Choose from [certified devices](https://ecosystem.{{< domain-c8y >}}/device-ecosystem/) offered by {{< company-c8y >}} certified partners for the easiest integration.

- **thin-edge.io**: [thin-edge.io](https://thin-edge.io/) is recommended for custom device integration. Follow the [Getting started with thin-edge.io](/device-integration/device-integration-thin-edge/) tutorial for a hands-on example.

- **Direct integration**: Connect devices via [HTTP REST](/device-integration/device-integration-rest/) or [MQTT](/device-integration/mqtt) interfaces. MQTT interfaces are designed for minimal device-side logic, suitable for microcontroller-based devices.

- **LPWAN support**: Native [LWM2M support](/protocol-integration/lwm2m/) and [LoRa Network Server integration](/protocol-integration/lora-loriot/) for Low-Power-Wide-Area-Network devices.

Once a device is connected to {{< product-c8y-iot >}}, it can start streaming equipment data into the platform. A common practice is to use a gateway device for data acquisition. These gateways are often connected to the different sensors and fieldbus devices of the equipment and responsible for collecting and forwarding relevant data to the IoT platform.

To facilitate the data integration, {{< product-c8y-iot >}} comes with an [OPC UA](/protocol-integration/opcua/) integration and the [Cloud Fieldbus](/protocol-integration/cloud-fieldbus/) technology. These provide configuration-driven ways to easily integrate OPC UA-enabled equipment and prominent fieldbus protocols like CAN, Profibus or Modbus.

In addition to this, many {{< company-c8y >}} certified [partner devices](https://ecosystem.{{< domain-c8y >}}/device-ecosystem/) bring their own software stack with support for many other protocols.
