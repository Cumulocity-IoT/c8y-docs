---
weight: 10
title: Configuring the network
layout: bundle
sector:
  - edge_server
---

Configuring the network enables you to access the Edge appliance using the domain name. If there are any changes in the network configuration due to an update or changes in the network protocols, you must reconfigure the network of your Edge appliance as described below. After reconfiguring the network, you must update the IP mapping for the domain name with the new IP address in the DNS servers, if you have added an entry in the DNS servers. If you are using an alias, you must update the IP address in the hosts file of your operating system.

{{< c8y-admon-important >}}

Do not use the IP addresses from the below blocks in your network configuration. These IP addresses are reserved for Edge internal purpose.

- 10.96.0.0/12 - reserved for Kubernetes service
- 10.88.0.1/16 - reserved for Podman network

{{< /c8y-admon-important >}}

### Configuring the network using the UI {#configuring-the-network-using-the-ui}

1. Log in to the {{< management-tenant >}} using the Edge administrator credentials created during the installation.

	- Username: management/<*Edge admin username*>
	- Password: password provided during the installation

2. Switch to the Administration application using the application switcher at the right of the top bar **<img class="Default" src="/images/icons/switcher-icon.png" alt="Application switcher" style="display: inline; float: none">**.

3. Click **Edge** > **Network** in the navigator.

   The current network configuration for the Edge appliance appears.

4. Click **Edit** to reconfigure the network.

5. Provide the new **IP address** for you network. For example, 192.168.66.10

6. Provide the **Netmask IP** for your network. For example, 255.255.255.0

7. Provide the **Gateway IP** for your network. For example, 192.168.66.1

8. Provide the **DNS** for your network. For example, 8.8.8.8

   For DNS, do not use the IP addresses 10.96.0.10 and 127.0.0.1.

9. Provide the **Address range CIDR**. For example, 172.18.0.0/16

   The CIDR suffix must be between 0 and 27 inclusive. The default value is 172.16.0.0/15.

   The **Address range CIDR** must not overlap with the reserved IP addresses. See [Reserved IP addresses](https://en.wikipedia.org/wiki/Reserved_IP_addresses).

  	{{< c8y-admon-info >}}
If the IP address of the Edge appliance overlaps with the Edge appliance's address range, then you must update the **Address range CIDR**.
		{{< /c8y-admon-info >}}

### Configuring the network using the REST APIs {#configuring-the-hostname-using-the-rest-apis}

To configure the network using the REST APIs, see the `/edge/configuration/network` API in the [{{< product-c8y-iot >}} Edge OpenAPI Specification](https://{{< domain-c8y >}}/api/edge/{{< c8y-edge-current-version-alt >}}.0/#operation/edgeNetworkConfig).

### Troubleshooting the network CIDR {#troubleshooting-the-network-cidr}

The network CIDR fails in the following scenarios:

1. The network CIDR unavailable on boot time.

	Description: The default network CIDR range is not available in the network. If the network range is already utilized, the network CIDR does not start properly and the Kubernetes cluster startup fails.

2. Invalid network CIDR provided during IP change.

	Description: You tried to change the network CIDR of the properly running Edge appliance, but the range is not available in the network.

To troubleshoot these scenarios:

1. Configure the Edge appliance's network and gateway to a different network range. Configuring the Edge appliance to a different network disconnects the Edge appliance from the existing network.
2. Configure the network CIDR to a new non-conflicting value.
3. Configure the Edge appliance's network and gateway back to the network range.
