---
title: Integration via the OPC UA device gateway
weight: 10
layout: redirect
---

Many historians provide an OPC UA server, either natively or as an optional module. You can connect such historians to {{< product-c8y-iot >}} with the [OPC UA device gateway](/device-integration/opcua/), in the same way as any other OPC UA server.

To integrate a historian via OPC UA:

1. Enable the OPC UA server interface of your historian. For details, refer to the documentation of your historian vendor.
2. Install the OPC UA device gateway in your environment. We recommend running it in thin-edge.io mode, in which the gateway registers automatically as a child device of the thin-edge.io device and uses the thin-edge.io proxy to communicate with {{< product-c8y-iot >}}. For details, see [Gateway configuration and registration](/device-integration/opcua/#gateway-configuration-and-registration).
3. In the **OPC UA server** tab of the gateway, click **Add server** and enter the endpoint URL of the historian's OPC UA server. For details, see [Connecting the gateway to the server](/device-integration/opcua/#connecting-gateway).
4. Create a device protocol that maps the historian tags to {{< product-c8y-iot >}} measurements, events, or alarms. For details, see [Device protocols](/device-integration/opcua/#device-protocols) and [Data mapping](/historian-integration/data-mapping/#opcua-device-gateway).

{{< c8y-admon-important >}}
Historians can expose a very large number of tags. Set the address scan type to "partial" and scan only the node IDs you want to integrate. A full scan of a large historian address space can take from hours to days.
{{< /c8y-admon-important >}}

Some historians only provide the classic OPC Data Access (DA) or Historical Data Access (HDA) interfaces. You can integrate these historians with a third-party OPC DA/HDA to OPC UA wrapper, which exposes the classic interface as an OPC UA server.
