---
weight: 25
title: Accessing the Edge appliance from the Cumulocity IoT tenant
layout: bundle
sector:
  - edge_server
---

The {{< product-c8y-iot >}} Cloud Remote Access allows you to remotely access the Edge appliance through a web browser. The remote Edge appliance is represented as a device in the Device Management application of {{< product-c8y-iot >}}.

### Prerequisites {#prerequisites}

To use Cloud Remote Access, you need:

* "Remote access" permission granted to the tenant user.
* A {{< product-c8y-iot >}} tenant subscribed to the Cloud Remote Access microservice. To get the subscription, contact [{{< company-sag >}} support](/additional-resources/contacting-support/).

### Supported protocols {#supported-protocols}

The following protocols are supported to connect to the Edge appliance through remote access from the {{< product-c8y-iot >}} tenant:

* Remote Desktop (VNC). See [Accessing the Edge device remotely through VNC](/edge/edge-connectivity/#accessing-the-edge-appliance-remotely-through-vnc).
  * Shares the desktop of the remote device
  * Mouse and keyboard for interaction
* Secure Shell (SSH)
  * Console for command line access
  * Keyboard for interaction

{{< c8y-admon-important >}}

Starting with Edge Release 10.15, the support for the Telnet protocol has been removed, as Telnet is considered to be an insecure protocol lacking built-in security measures. For accessing the Edge appliance remotely from the {{< product-c8y-iot >}} tenant, {{< company-sag >}} recommends you to use the SSH protocol instead.
{{< /c8y-admon-important >}}

For more information about remote access, see [Cloud Remote Access](/cloud-remote-access/cra-general-aspects).
