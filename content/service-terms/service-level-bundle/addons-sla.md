---
title: Additional IT services
layout: bundle
weight: 40
aliases:
  - /addons-sla/
---

This agreement is made between {{< company-c8y >}} ("Provider") and the Customer ("Customer") who utilizes one or more of the following additional IT services ("Services") on Provider's cloud instances ("software-as-a-service", "SaaS").

* VPN and Direct Line services.
* Backup replication services.
* Status page services.

### VPN and Direct Line services

#### Service description

{{< product-c8y-iot >}} VPN services connect Customer's existing infrastructure to Customer's dedicated {{< product-c8y-iot >}} SaaS instance through the internet using secure, encrypted connections. {{< product-c8y-iot >}} VPN service is based on [AWS Site-to-Site VPN](https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html) if the SaaS instance is hosted on Amazon Web Service. The VPN service is based on [Azure VPN Gateway](https://azure.microsoft.com/en-US/products/vpn-gateway) if the SaaS instance is hosted on Microsoft Azure.

Similarly, {{< product-c8y-iot >}} Direct Line services connect the infrastructure to {{< product-c8y-iot >}} SaaS through secure, encrypted connections, but bypassing the public internet. {{< product-c8y-iot >}} Direct Line service is based on [AWS Direct Connect](https://aws.amazon.com/directconnect/) if the SaaS instance is hosted on Amazon Web Services. The Direct Line service is based on [Azure ExpressRoute](https://azure.microsoft.com/en-US/products/expressroute/) if the SaaS instance is hosted on Microsoft Azure.

#### Service features

Key features include:

* **Secure communication**: Encrypted tunnels protect sensitive data transmitted between Customer's on-premises and cloud networks.
* **High availability**: Redundant connections and failover mechanisms ensure business continuity and minimize downtime.
* **Integration**: Customer's on-premises systems and device networks are seamlessly connected to {{< product-c8y-iot >}} SaaS instances.

#### Customer responsibilities

To establish and maintain a secure site-to-site connection with {{< product-c8y-iot >}}, Customer is responsible for the following:

* **Customer internal coordination and compliance**
  * Managing all necessary internal approvals, including IT security, compliance, and risk management requirements.
  * Completing any internal documentation, approval forms, or security assessments required by Customer’s organization.
  * Ensuring timely alignment with Customer internal IT teams to prevent delays in deployment.
* **Customer-side configuration**
  * Using a device compatible with {{< product-c8y-iot >}} specifications.
  * Configuring network and firewall on Customer side, such as providing a public IP address to the gateway, setting the necessary firewall rules for tunneled traffic, and defining and sharing the internal subnets to be routed over the connection with {{< product-c8y-iot >}}.
  * In case of a VPN: Aligning encryption, authentication and key exchange settings with {{< product-c8y-iot >}} specifications; generating and securely exchanging pre–shared keys or certificates.
  * Setting up routing as required and in accordance with {{< product-c8y-iot >}} requirements, ensuring proper DNS resolution where required.
* **Testing and troubleshooting.**
  * Participating in the initial connectivity testing, potentially providing connection logs for troubleshooting connectivity issues, and verifying access to {{< product-c8y-iot >}} services over the connection in a timely manner.
* **Ongoing monitoring and maintenance.**
  * Monitoring the VPN or Direct Line availability and resolving issues within Customer infrastructure.
  * Renewing pre-shared keys or certificates and communicating them to {{< product-c8y-iot >}} as required.

Failure to meet these responsibilities may impact the availability and performance of the VPN or Direct Line connection.

#### Limitations and constraints

Customer acknowledges the following limitations and constraints in using Service.

 * **Supported VPN types**: Only IPsec VPN tunnels can be used with the VPN service. Data for encryption and keys will be shared via a secure channel between Customer and {{< company-c8y >}}.
 * **CIDR**: {{< product-c8y-iot >}} dedicated SaaS platforms usually use a private address space out of a subrange of 10.0.0.0/8 in IPv4. When using VPN services, the CIDR block for {{< product-c8y-iot >}} must not overlap with Customer network that the VPN connects to. CIDR blocks shall be agreed upon between {{< company-c8y >}} and Customer before the VPN is set up.
 * **Routing**: Only static routing is supported. Dynamic routing with protocols like BGP or OSPF is not supported. {{< company-c8y >}} will supply the routing information to Customer who will then need to  implement the static routing on their end of the VPN tunnel. {{< company-c8y >}} will implement the routing to Customer networks according to the information about the CIDR information that has been agreed with Customer.

#### Availability

{{< company-c8y >}} is committed to providing reliable service. The specific service availability targets are as follows:

* **Production environments:** 99.90% availability
* **Non-production environments:** 98.50% availability

{{< company-c8y >}} monitors the availability according to the state (up, down) reported by the employed hyperscaler.

#### Support

* **Customer Support:** Support is provided in accordance with the Customer’s selected support plan (Bronze, Silver, or Gold), as detailed in a separate support agreement.
* **Pre-Production Environments:** For pre-production environments, Bronze-level support is generally provided, with support tickets handled at standard priority.

{{< company-c8y >}} will not be able to provide logs or packet captures from the VPN or leased line data or signalling.

#### Maintenance

* Maintenance information from the used hyperscaler will be provided to Customer in due course, flagging potential requirements for maintenance windows

### Backup replication

#### Service description

The backup replication service provides automated replication of your cloud virtual machine backups to a secondary geographical region for disaster recovery and business continuity.  {{< company-c8y >}} configures and manages the process, ensuring your backups are securely copied and readily available in another region should your primary region experience an outage. For Amazon Web Services, this includes setup of cross-region copy mechanisms and lifecycle management. For Azure, we leverage Azure Site Recovery or similar services for consistent replication. The service optionally includes testing to validate recoverability.

#### Service features

Key features include:

* **Automated Replication**: Automatically copies your virtual machine backups to a secondary geographical region.
* **Cross-Platform Support**: Works with both AWS and Azure
* **Disaster Recovery & Business Continuity**: Enables rapid recovery of your critical systems in a different region in case of a primary region outage.
* **Secure Copying**: Ensures your backups are transferred and stored securely in the secondary region.
* **Lifecycle Management**: Manages the lifecycle of your replicated backups, including retention policies and deletion of outdated backups.

#### Limitations and constraints

The second region is selected by {{< company-c8y >}}.

#### Availability

The following SLA is valid for the service:

* Data durability: 99,999999999%

RTO and RPO are [the same as for non-replicated backup](/service-terms/service-level/#service-features).

### Status page

#### Service description

{{< product-c8y-iot >}} Statuspage is a public web page reflecting the current status of a {{< product-c8y-iot >}} dedicated SaaS instance in realtime and any scheduled and unscheduled maintenance. The service is based on [Atlassian Statuspage](https://www.atlassian.com/software/statuspage).

#### Service features

Key features include:

* **Real-time status updates**: The service is with up-to-the-minute information on the health and availability of {{< product-c8y-iot >}} services from {{< company-c8y >}} operations.
* **Incident communication**: {{< company-c8y >}} operations provide information on ongoing incidents, including their impact and estimated resolution times.
* **Scheduled maintenance notifications**: {{< company-c8y >}} operations provide information on planned maintenance activities in advance.
* **Email and SMS notifications**: Optionally, subscribe to receive notifications through email or SMS.

#### Limitations and constraints

Customer acknowledges the following limitations and constraints in using Service.

* The statuspage is public. Private statuspage are currently not available.
* Customer's proprietary services can currently not be added to the statuspage.
* Availability management of the statuspage is carried out by Atlassian.
