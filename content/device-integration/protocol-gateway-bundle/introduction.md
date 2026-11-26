---
weight: 10
title: Introduction
layout: redirect
---

Protocol Gateway connects PLCs, CNC machines, and robots to {{< product-c8y-iot >}} without custom code. PLC stands for programmable logic controller, and CNC stands for computer numerical control. Protocol Gateway combines two components:

- Takebishi DeviceGateway, the gateway that communicates with the machines through native drivers
- thin-edge.io, which connects the device to your {{< product-c8y-iot >}} tenant

{{< c8y-admon-info >}}
{{< product-c8y-iot >}} offers Takebishi DeviceGateway as Protocol Gateway. The web interface and the Docker image still use the name DeviceGateway.
{{< /c8y-admon-info >}}

Protocol Gateway reads vendor-specific protocols at the edge, keeps the values as named tags, and sends them to {{< product-c8y-iot >}} as thin-edge.io MQTT (Message Queuing Telemetry Transport) messages. It provides:

- **Protocol normalization.** Native drivers turn vendor protocols into one tag model, and you map the tags to one MQTT message format. You do not write driver code.
- **Offline buffering.** Protocol Gateway buffers messages on the device during network interruptions.
- **Configuration in a web interface.** You define data sources, tags, events, and actions without code.

Protocol Gateway runs as a Docker container on the same device as thin-edge.io. Both communicate through the local MQTT broker of thin-edge.io on `localhost:1883`. thin-edge.io maps the messages to the {{< product-c8y-iot >}} data model and manages the connection to the cloud.

```text
Machines    -->  Protocol Gateway  -->  thin-edge.io  -->  Cumulocity
(PLC, CNC,       (Docker container)     (local MQTT        (Device Management)
 robots)         data sources, tags,     broker, mapper)
                 events, MQTT client     localhost:1883
```

The data flows in 3 steps:

1. Protocol Gateway reads the machines through its data sources and keeps the current tag values.
2. An event runs on a trigger, such as a cycle, and its **Send MQTT** action publishes a thin-edge.io JSON message.
3. thin-edge.io receives the message and sends the measurement to the child device in {{< product-c8y-iot >}}.

### Supported assets and protocols {#supported-assets-and-protocols}

Protocol Gateway supports more than 320 device series from more than 80 manufacturers. The following table shows examples from the product documentation. For the complete list, see the [Takebishi list of supported devices](https://www.faweb.net/en/product/devicegateway/supportlist).

| Category | Protocols and examples |
|----------|------------------------|
| PLCs | Siemens SIMATIC S7, Mitsubishi Electric MELSEC, OMRON SYSMAC, Keyence KV, Allen-Bradley (AB Ethernet), Panasonic FP, Yokogawa FA-M3, Fuji Electric MICREX, Hitachi HIDIC, JTEKT TOYOPUC, Toshiba |
| Machine tools and robots | FANUC and Mitsubishi DPRNT (serial), MTConnect, Yamaha robots |
| Open protocols | Modbus TCP and RTU, EtherNet/IP, BACnet/IP, DNP3, IEC 61850 MMS |
| IT interfaces | MQTT client, MQTT Sparkplug B client, HTTP client, SQL client, FTP, SNMP agent |

The number of simultaneous data source connections depends on the license model, for example 16 for DGW-D20 and 64 for DGW-D20H.

### Supported Cumulocity features {#supported-cumulocity-features}

| Feature | Support | How it works |
|---------|---------|--------------|
| Child device registration | Yes | The gateway publishes a retained registration message with the type and device information of each machine. |
| Measurements | Yes | A thin-edge.io JSON message becomes a measurement. |
| Device information (agent, hardware) | Yes | The gateway publishes retained twin messages. |
| Alarms and events | Yes | Publish thin-edge.io alarm and event messages from an event action. |
| Software management | Yes | The container plugin installs and updates Protocol Gateway as a software item. |
| Container control (start, stop, restart) | Yes | The container appears as a service. Requires thin-edge.io 2.1.0 or later. |
| Configuration management | Yes | The license file and the gateway configuration file are configuration types of the thin-edge.io configuration plugin. |
| Remote access | Yes | SSH, and the gateway web interface, through Cloud Remote Access. |

### Requirements {#requirements}

- A device that runs Linux with a 64-bit processor (arm64 or x86_64) and at least 2 GB RAM. The commands in this documentation use Debian-based distributions.
- Docker Engine and Docker Compose on the device
- thin-edge.io 2.1.0 or later on the device, connected to your tenant
- The thin-edge.io container plugin. See [To prepare the device](/device-integration/protocol-gateway/#to-prepare-the-device).
- A Protocol Gateway license. For a trial, request a *DeviceGateway.lic* file from your {{< company-c8y >}} contact or from Takebishi. Commercial licenses are available in the Takebishi web store and need the Takebishi license management server, which is also available as a Docker image. See [Authentication](/device-integration/protocol-gateway/#authentication).
- For remote access to the web interface, the Cloud Remote Access microservice on your tenant

{{< c8y-admon-info >}}
Takebishi publishes the image for multiple processor architectures, and Docker selects the matching one. The screenshots and commands in this documentation come from a Raspberry Pi 4 Model B with arm64.
{{< /c8y-admon-info >}}

### Deployment options {#deployment-options}

| Option | Use when |
|--------|----------|
| Install from {{< product-c8y-iot >}} with the container plugin (recommended) | You manage one or more devices from Device Management. You install, update, and restart the gateway as a software item and a service, and you can deliver the same configuration to many devices. |
| Install directly with Docker Compose | You work on a single device, and you prepare it through a remote access session or a local console. |

This documentation describes the recommended option first. See [Running the gateway](/device-integration/protocol-gateway/#running-gateway) for both.
