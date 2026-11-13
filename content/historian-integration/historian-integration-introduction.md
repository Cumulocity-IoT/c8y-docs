---
title: Introduction
weight: 10
layout: bundle
sector:
  - device_management
---

A process historian is a time-series database that collects and stores operational data from industrial systems such as programmable logic controllers (PLCs), supervisory control and data acquisition (SCADA) systems, and distributed control systems (DCS). Historians often hold years of high-frequency process data, but this data typically stays on the plant floor and is not available to IoT and analytics applications.

With {{< product-c8y-iot >}}, you can integrate data from your existing historians into the platform. {{< product-c8y-iot >}} represents the integrated historian tags as assets and measurements, so you can use them in dashboards, alarms, streaming analytics, machine learning, and downstream IT systems without changing your existing operational technology (OT) infrastructure.

Two integration methods are available:

* **OPC UA device gateway**: Connects to any historian that provides an OPC UA server interface. You add the historian to the gateway as a regular OPC UA server and map its data with device protocol definitions. See [Integration via the OPC UA device gateway](/historian-integration/integration-methods/#opcua-device-gateway).
* **AVEVA PI connector**: A dedicated connector for AVEVA PI System (formerly OSIsoft PI System). It reads tag data through the PI Web API and sends it to {{< product-c8y-iot >}} via thin-edge.io. See [Integration via the AVEVA PI connector](/historian-integration/integration-methods/#aveva-pi-connector).

Both integration methods connect to {{< product-c8y-iot >}} through thin-edge.io. The OPC UA device gateway and the AVEVA PI connector run as containers managed by thin-edge.io, which sends the data to {{< product-c8y-iot >}} as devices, measurements, events, and alarms.

![Historian integration architecture: both integration methods reach Cumulocity through thin-edge.io](/images/historian-integration/historian-integration-architecture.png)

{{< c8y-admon-info >}}
Both integration methods run in your environment, next to the historian. Only outbound connections from your network to the {{< product-c8y-iot >}} platform are required.
{{< /c8y-admon-info >}}
