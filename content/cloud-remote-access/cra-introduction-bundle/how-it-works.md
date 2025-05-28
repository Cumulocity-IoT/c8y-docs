---
title: How Cloud Remote Access works
weight: 20
layout: bundle
---

This versatile feature offers two primary connection methods:
1. **Direct device access:** Establish a seamless connection to devices directly linked to {{< product-c8y-iot >}}. 
2. **Gateway-enabled remote access:** Leverage a connected device as a gateway to access any device that is reachable within its local area network, expanding your reach to manage multiple devices through a single entry point.

The connection is always initiated by the device. The feature operates through a microservice running within {{< product-c8y-iot >}}, which tunnels all protocols through a secure WebSocket connection and manages authentication without the need to open any port. This approach provides a level of security comparable to traditional VPN tunnels while offering greater simplicity and ease of use.

Key security features include:
1. TLS encryption for all connections to remote devices
2. RBAC to prevent unauthorized personnel from accessing devices and making changes to critical parameters
3. Auditability provided through audit logs which get automatically created for each remote session.

To leverage Cloud Remote Access, your device needs to be enabled by installing thin-edge.io. Thin-edge.io is designed to fully integrate with this feature and all other Device Management functionalities provided by Cumulocity. By combining 
{{< product-c8y-iot >}}'s Cloud Remote Access with thin-edge.io, you can achieve a secure, efficient, and user-friendly remote device management solution that scales with your IoT deployment.

![Cloud Remote Access - VNC, SSH & Telnet](/images/cra/cra-intro-1.png)

While accessing the server through a web terminal with connections terminating at the Cloud Remote Access Microservice is suitable for many scenarios, it may not meet the requirements of more complex use cases. For these situations, we offer a Passthrough option that enables the use of native clients by forwarding packets to a proxy running locally on your machine. This allows you to natively connect to the ssh server from your local machine, access the local Web UI or tunnel a HTTP server that is running on your device. Basically any TCP-Port can be bridged that way, not only SSH, VNC or HTTP traffic.

To take advantage of this feature, we recommend using the Cumulocity CLI, which includes a built-in local proxy. This powerful tool enhances your ability to interact with the system, providing greater flexibility and functionality for advanced operations. Using c8y-go-cli local proxy you can listen on the following mediums:
* Unix socket
* TCP Port
* Standard Input/Output (stdio)


![Cloud Remote Access - Passthrough](/images/cra/cra-intro-2.png)


