---
title: Cloud Remote Access service-level agreement
layout: bundle
weight: 23
aliases:
  - /cloud-remote-access-sla/
---

This agreement is made between {{< company-c8y >}} ("Provider") and the Customer ("Customer") who utilizes {{< product-c8y-iot >}} Cloud Remote Access ("Service") for remotely accessing Internet of Things ("IoT") devices ("devices") through Provider's cloud instances ("software-as-a-service", "SaaS").

### Service description

{{< product-c8y-iot >}} Cloud Remote Access lets authorized users connect to devices and to other devices in the local network of a gateway without opening inbound ports on the device. The connection is always initiated by the device. The Service tunnels the connection through secure WebSocket connections between the user's client, the Service, and the device agent. For more information, see [How Cloud Remote Access works](/cloud-remote-access/cra-introduction/#how-it-works).

This agreement defines the service level of {{< product-c8y-iot >}} Cloud Remote Access as part of {{< product-c8y-iot >}} Software-as-a-Service operated by {{< company-c8y >}}. {{< product-c8y-iot >}} Edge is outside the scope of this agreement.

### Service features

{{< product-c8y-iot >}} Cloud Remote Access provides the following features.

* **Browser-based access:** Built-in web clients for SSH, VNC, and Telnet in the {{< product-c8y-iot >}} Device Management application.
* **Passthrough:** Tunneling of arbitrary TCP connections to native clients through a local proxy, for example, the {{< product-c8y-iot >}} CLI.
* **Gateway-enabled access:** Access to devices in the local network of a connected gateway.
* **Access control and auditing:** Role-based access control for remote access and audit logs for each remote session.
* **Service monitoring:** {{< company-c8y >}} continuously monitors the availability of the Service with synthetic connections, see [Service availability](#cra-service-availability).

### Customer responsibilities {#cra-customer-responsibilities}

Customers are encouraged to review the [{{< product-c8y-iot >}} Cloud Remote Access documentation](/cloud-remote-access/cra-introduction/). In particular, Customer acknowledges the following Customer responsibilities:

* **Device side:** Customer selects, operates, and maintains the device-side software, including the device agent on each device or gateway. The device agent implements the [`c8y_RemoteAccessConnect` operation](/cloud-remote-access/cra-api/#device-agent-implementation) and is connected to {{< product-c8y-iot >}}. Customer can use an existing agent that supports Cloud Remote Access, for example, [thin-edge.io](https://thin-edge.io), or Customer's own implementation. Device-side software is under Customer's sole responsibility, as outlined in the [platform service-level agreement](/service-terms/service-level/#platform-sla).
* **Device-side endpoints:** Customer operates and secures the endpoints that are accessed on the device or in the local network of the gateway, for example, SSH, VNC, or Telnet servers. This includes the credentials configured for remote access, and the rotation of SSH host keys.
* **Session management:** Customer closes remote sessions when they are no longer needed and does not leave sessions open beyond their use, as open sessions hold resources on the Service.
* **Access management:** Customer grants the remote access permission only to qualified users, see [Prerequisites](/cloud-remote-access/setting-up-cloud-remote-access/#prerequisites).

### Limitations and constraints {#cra-limitations-and-constraints}

Customer acknowledges the following limitations and constraints in using Service.

* **Session interruptions:** Established remote sessions can be interrupted, for example, by service restarts, upgrades, or network events. Customer re-establishes interrupted sessions. Singular session interruptions are considered normal and do not constitute a service failure, as outlined in the [platform service-level agreement](/service-terms/service-level/#platform-sla).
* **Device-side data traffic:** The Service itself does not send additional data, such as heartbeats, to the device. The tunneled protocols, however, create data traffic as long as a session is open, for example, SSH keepalive messages or VNC screen updates. The Service does not close idle sessions automatically. {{< company-c8y >}} is not responsible for the cost of this data traffic, in particular on metered or cellular connections.
* **Throughput and latency:** Throughput and latency within an established session depend on the network connection of the device and of the client. {{< company-c8y >}} does not guarantee throughput or latency within a session.
* **Device reachability:** The Service can only connect to a device if the device and its device agent are online and reachable. The availability of the device, of the device agent, of the device-side endpoints, and of Customer's networks and firewalls is outside the scope of this agreement.
* **Service quotas:** Customer acknowledges the existence of soft quotas for the number of concurrent sessions, the rate of new connection attempts, and the session lifetime, as detailed in [Service quotas](/service-terms/quotas/#cloud-remote-access). Exceeding them can lead to a reduced service level.

### Service availability {#cra-service-availability}

{{< company-c8y >}} is committed to providing reliable service. The specific service availability targets for {{< product-c8y-iot >}} Cloud Remote Access are as follows:

| Deployment type | Production environments | Non-production environments |
| --------------- | ----------------------- | --------------------------- |
| Shared Cloud    | 99.00%                  | 95.00%                      |
| Dedicated Cloud | 99.90%                  | 95.00%                      |

Service availability for {{< product-c8y-iot >}} Cloud Remote Access is calculated as follows:

* {{< company-c8y >}} tests the availability of the Service every minute with a synthetic remote access connection to a reference device operated by {{< company-c8y >}}. The synthetic connection uses the same public endpoints as Customer's clients and devices.
* A minute counts as available if the synthetic connection reaches an established tunnel and transfers data through it.
* The service availability for a month is the share of available minutes in the calendar month, excluding planned downtimes and emergency maintenance, as outlined in the [platform's service availability section](/service-terms/service-level/#service-availability).

Connections to Customer's devices are not part of the availability calculation, as they depend on factors outside of the control of {{< company-c8y >}}.

Service credits are calculated as outlined in the [platform's service credit commitment](/service-terms/service-level/#service-credit-commitment).

#### Informational service-level objectives {#cra-service-level-objectives}

The following objectives measure the quality of the Service. They are for information purposes only and are not subject to service credits.

| Service level indicator  | Monthly target                                       |
| ------------------------ | ---------------------------------------------------- |
| Connection success rate  | ≥ 99.9%                                              |
| Session setup time       | 99% of successful session setups ≤ 5 seconds         |
| Session drop rate        | ≤ 1%                                                 |

The service quality indicators are defined as follows:

* **Connection success rate:** The share of connection attempts that reach an established tunnel, measured over a calendar month. Attempts that fail for reasons outside of the control of {{< company-c8y >}} are excluded, for example, an unreachable device, a missing device password, an unsupported protocol version on the device, or a client that closes the connection during setup.
* **Session setup time:** The time the Service needs to establish the protocol session (SSH or VNC) after the device agent connected. The time the device agent needs to receive and process the remote access operation is excluded.
* **Session drop rate:** The share of established sessions that are closed unexpectedly by the Service, measured over a calendar month.

### Support and maintenance

Support and maintenance are provided as outlined in the [platform service-level agreement](/service-terms/service-level/#support-and-maintenance).

Support can assist with the configuration of remote access endpoints in {{< product-c8y-iot >}}. Support can generally not assist with troubleshooting device agents, device-side endpoints, or Customer's networks.
