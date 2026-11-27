---
weight: 10
title: Introduction
layout: redirect
---

Industrial machines speak many vendor-specific protocols. Protocol Gateway reads them at the edge through native drivers and sends the values to {{< product-c8y-iot >}}, without custom code. It supports more than 320 device series from more than 80 manufacturers, including programmable logic controllers (PLCs), computer numerical control (CNC) machines, and robots.

Protocol Gateway provides:

- **Protocol normalization.** Native drivers turn vendor protocols into one tag model, and you map the tags to one MQTT message format. You do not write driver code.
- **Offline buffering.** Protocol Gateway buffers messages on the device during network interruptions.
- **Configuration in a web interface.** You define data sources, tags, events, and actions without code.

Protocol Gateway is managed through thin-edge.io, which runs on the same device. thin-edge.io connects the device to your {{< product-c8y-iot >}} tenant, installs and updates Protocol Gateway as a software item, and manages its configuration files. For details, see [Device integration using thin-edge.io](https://cumulocity.com/docs/thin-edge/thin-edge).

![Protocol Gateway architecture](/images/device-protocols/protocol-gateway/architecture.svg)

The architecture diagram shows the data path from left to right:

1. **Read.** The protocol adapter of Protocol Gateway reads the machines through native drivers and stores the values as tags.
2. **Publish.** An event with a **Send MQTT** action publishes the values through the MQTT client to the thin-edge.io MQTT broker.
3. **Deliver.** The {{< product-c8y-iot >}} mapper of thin-edge.io converts the message, and the bridge sends it to {{< product-c8y-iot >}} as a measurement of the child device.

Protocol Gateway and thin-edge.io exchange the messages through the local MQTT broker on `127.0.0.1:1883`. The connection stays on the device, so it uses plain MQTT. thin-edge.io secures the connection to {{< product-c8y-iot >}} with TLS.

### Supported assets and protocols {#supported-assets-and-protocols}

Protocol Gateway connects to a wide range of industrial devices, from PLCs and CNC machines to meters, sensors, and building automation equipment. It supports both vendor-specific protocols and standardized protocols. For the complete list, see the [list of devices that Protocol Gateway supports](https://www.faweb.net/en/product/devicegateway/supportlist).

**Vendor-specific protocols**

| Device type | Vendors and product families |
|-------------|------------------------------|
| PLCs | Mitsubishi Electric MELSEC (iQ-R, iQ-F, Q, L, FX), Siemens SIMATIC (S7-1500, S7-1200, S7-400, S7-300, S7-200), Rockwell Automation (ControlLogix, CompactLogix, GuardLogix, Micro800, MicroLogix, SLC500), OMRON SYSMAC (NX, NJ, CJ, CS, CP), Yokogawa (e-RT3, FA-M3), Keyence KV, Panasonic FP, Fuji Electric MICREX, Hitachi (HX, EH150), JTEKT TOYOPUC, Toshiba (nv, V, PROSEC T), Yaskawa MP, Delta (AH500, DVP), IDEC MicroSmart, Koyo, Sharp, GE 90-30, CODESYS-based controllers |
| CNC machines and machine tools | FANUC, Mitsubishi Electric, Shibaura Machine, Mazak |
| Motion and robot controllers | Yamaha, IAI, Sanyo Denki |
| Remote I/O | WAGO, Phoenix Contact, Anywire, MG, MTT, Comtrol |
| Meters, recorders, and controllers | Azbil, Yokogawa, Eurotherm, RKC Instrument, Chino, Graphtec, Hioki, Mitutoyo, Panasonic, Mitsubishi Electric |
| Other devices | Hakko MONITOUCH display panels, Cognex In-Sight vision sensors, MOXA network switches, and sensors from vendors such as OMRON, ifm, and Murata |

**Standardized protocols**

| Protocol | Typical devices |
|----------|-----------------|
| Modbus TCP, Modbus ASCII, and Modbus RTU (serial) | Meters, remote I/O, controllers, display panels, and many other devices |
| EtherNet/IP | Remote I/O, motion controllers, and monitoring devices |
| SLMP | Devices that support the Seamless Message Protocol |
| MTConnect | Machine tools |
| DPRNT (serial) | CNC machines from FANUC and Mitsubishi Electric |
| BACnet/IP | Building automation |
| IEC 61850 MMS | Power and substation equipment |
| DNP3 | Energy and utility equipment |
| Digital and analog I/O | Signals from I/O hardware |
| Serial user protocol | Devices with a custom ASCII protocol that you define |
| Bluetooth beacons | Location data from Bluetooth tags |

{{< c8y-admon-info >}}
Protocol Gateway requires a license. One license supports up to 64 data source connections and 65,536 tags.
{{< /c8y-admon-info >}}

### Requirements {#requirements}

- A device that runs Linux with a 64-bit processor (arm64 or x86_64) and at least 2 GB RAM.
- Docker Engine and Docker Compose on the device. See the [Docker documentation](https://docs.docker.com/engine/install/).
- thin-edge.io on the device, connected to your tenant. See [Device integration using thin-edge.io](https://cumulocity.com/docs/thin-edge/thin-edge) and the [thin-edge.io installation guide](https://thin-edge.github.io/thin-edge.io/install/).
- The thin-edge.io container plugin on the device. The first step of [Set up the license and configuration files](/device-integration/protocol-gateway/#set-up-the-license-and-configuration-files) installs it.
- A Protocol Gateway license. Protocol Gateway licenses are part of the {{< product-c8y-iot >}} product catalog. For a license or a trial license, contact your {{< product-c8y-iot >}} sales representative.
- For remote access to the web interface, the Cloud Remote Access microservice on your tenant.

### Deployment options {#deployment-options}

| Option | Use when |
|--------|----------|
| Install from {{< product-c8y-iot >}} with the container plugin (recommended) | You manage one or more devices from Device Management. You install, update, and restart Protocol Gateway as a software item and a service, and you can deliver the same configuration to many devices. |
| Install directly with Docker Compose | You work on a single device, and you prepare it through a remote access session or a local console. |

This documentation describes the recommended option first. See [Running Protocol Gateway](/device-integration/protocol-gateway/#running-gateway) for both.
