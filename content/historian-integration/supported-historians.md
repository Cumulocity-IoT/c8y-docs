---
title: Supported historians
weight: 40
layout: bundle
---

The following table lists commonly used historians and how you can integrate them with {{< product-c8y-iot >}}. The list is not exhaustive. You can integrate any historian that provides an OPC UA server interface via the [OPC UA device gateway](/historian-integration/integration-methods/#opcua-device-gateway).

| Vendor | Historian | Integration method | Notes |
|---|---|---|---|
| ABB | Symphony Plus Historian | OPC UA device gateway | Provides an OPC UA server. |
| AspenTech | Aspen InfoPlus.21 (IP.21) | OPC UA device gateway | Provides an OPC UA server. |
| AVEVA | AVEVA PI System (formerly OSIsoft PI) | AVEVA PI connector | Requires PI Web API. Alternatively via the OPC UA device gateway if the PI Connector for OPC UA is available. |
| AVEVA | AVEVA System Platform (formerly Wonderware) | OPC UA device gateway | Native OPC UA server since AVEVA System Platform 2020. |
| COPA-DATA | zenon Historian 360 | OPC UA device gateway | Requires the zenon Process Gateway with OPC UA server. |
| Emerson | DeltaV Advanced Continuous Historian | AVEVA PI connector | Based on PI technology. Integration via the PI Web API of the connected PI Server. |
| Emerson | DeltaV Enterprise Historian | AVEVA PI connector | Based on PI Server. Integration via PI Web API. |
| Rockwell Automation | FactoryTalk Historian | OPC UA device gateway | Provides an OPC UA server. |
| Siemens | SIMATIC Process Historian | OPC UA device gateway | Provides an OPC UA server. |
| Yokogawa | Exaquantum | OPC UA device gateway | Provides an OPC UA server. |

{{< c8y-admon-info >}}
- The OPC UA capabilities of a historian depend on its version and licensed modules. Check with your historian vendor which OPC UA features are available in your installation.

- Historians that only provide the classic OPC Data Access (DA) or Historical Data Access (HDA) interfaces are not supported natively. You can integrate these historians with a third-party OPC DA/HDA to OPC UA wrapper, which exposes the classic interface as an OPC UA server for the OPC UA device gateway. This applies, for example, to Emerson DeltaV Continuous Historian, Honeywell Uniformance Suite (PHD), ICONICS Hyper Historian, Proficy Historian, and PTC Kepware Local Historian.
{{< /c8y-admon-info >}}
