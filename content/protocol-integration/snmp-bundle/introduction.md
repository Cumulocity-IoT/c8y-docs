---
weight: 10
title: Introduction
layout: redirect
---

Simple Network Management protocol (SNMP) is an application layer protocol, used widely in network management for monitoring network devices.

There are two components that help SNMP-enabled devices to connect to the {{< product-c8y-iot >}} platform:

1. The **Mibparser microservice** helps in converting a Managed Information Base (MIB) file to a JSON representation which is then used to create a device protocol.
2. The **SNMP agent** is a device-side agent that helps SNMP-enabled devices to connect to the {{< product-c8y-iot >}} platform and translates messages from a SNMP-specific format to a {{< product-c8y-iot >}} model before forwarding them to the {{< product-c8y-iot >}} platform.

{{< c8y-admon-info >}}
The SNMP agent and the Mibparser microservice code is open source. The code can be found in the {{< product-c8y-iot >}} examples repository at [{{< link-c8y-github >}}/cumulocity-examples/tree/develop/snmp]({{< link-c8y-github >}}/cumulocity-examples/tree/develop/snmp).
{{< /c8y-admon-info >}}

The following image provides a general overview of the SNMP-enabled device integration with {{< product-c8y-iot >}}:

![{{< product-c8y-iot >}} SNMP Integration](/images/device-protocols/snmp/snmp-cumulocity-integration.png)
