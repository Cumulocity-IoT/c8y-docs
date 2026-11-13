---
title: Integration via the AVEVA PI connector
weight: 20
layout: redirect
---

AVEVA PI System uses a proprietary interface by default. For AVEVA PI, {{< product-c8y-iot >}} provides a dedicated connector that reads tag values from the PI Web API and forwards them to {{< product-c8y-iot >}}.

The connector runs as a container next to [thin-edge.io](https://thin-edge.io/) on a Linux edge device or virtual machine. thin-edge.io handles the communication with {{< product-c8y-iot >}}, so you can install, update, and configure the connector remotely in the **Software** and **Configuration** tabs of the device in the Device Management application.

The AVEVA PI connector requires:

* A PI System with PI Web API installed.
* A PI user with at least read permission.
* A thin-edge.io instance with the container plugin installed, connected to {{< product-c8y-iot >}}.
* Network connectivity from the device to the PI Web API endpoint.

You define the PI tags to collect and the polling interval in configuration files, which you upload to the device in the **Configuration** tab. The connector applies changes without a restart. For the full setup, see the [AVEVA PI connector repository](https://github.com/Cumulocity-IoT/thin-edge-aveva-pi-connector).

{{< c8y-admon-info >}}
If your AVEVA PI System has the PI Connector for OPC UA or another OPC UA interface available, you can integrate it via the [OPC UA device gateway](#opcua-device-gateway) instead.
{{< /c8y-admon-info >}}
