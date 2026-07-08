---
title: Platform service-level agreement
layout: bundle
weight: 10
aliases:
  - /platform-sla/
---

This agreement is made between {{< company-c8y >}} ("Provider") and the Customer ("Customer") who utilizes {{< product-c8y-iot >}} Platform ("Service") for managing Internet of Things ("IoT") devices ("IoT devices", "devices") on Provider's cloud instances ("software-as-a-service", "SaaS").

### Service description

{{< product-c8y-iot >}} is a comprehensive Internet of Things (IoT) platform designed to enable seamless connectivity, management, analysis and control of IoT devices. This agreement defines the service level of {{< product-c8y-iot >}} Software-as-a-Service operated by {{< company-c8y >}}, including its APIs and standard web applications.

The agreement applies solely to the base platform excluding optional features or features not in general availability. Optional features outside the base platform may require a separate service-level agreement. For custom applications developed using the Microservice Hosting functionality, refer to the [Microservices hosting service-level agreement](/service-terms/service-level/#microservices-sla).

In particular, the following components are outside the scope of this agreement:

* {{< product-c8y-iot >}} Edge.
* Device-side software or firmware developed by Customer or third parties.
* Open-source software projects such as thin-edge.io.
* Software development kits (SDKs), code samples, and reference implementations, except as explicitly stated in the Support service-level agreement for Premium support.

### Service features

The {{< product-c8y-iot >}} platform offers a comprehensive set of features designed to support the needs of enterprise IoT deployments, ensuring robust performance, security, and flexibility. Key service features include:

* **Device connectivity and management:** The platform facilitates the connection, data collection, and remote control of IoT devices. These functionalities can be accessed through the {{< product-c8y-iot >}} Device Management application or via application programming interfaces (APIs; REST/MQTT).
* **Data visualization:** Users can visualize their connected devices and corresponding data within the {{< product-c8y-iot >}} Cockpit, offering an intuitive interface for monitoring and managing IoT deployments.
* **Real-time and batch data processing and storage:** {{< product-c8y-iot >}} supports both real-time and batch processing of IoT data, enabling users to efficiently manage and analyze large volumes of data as it is generated. Data storage is Customer-configurable, allowing you to define retention periods according to your specific requirements.
* **Flexible deployment options:**
    * The platform is deployed using shared ("{{< product-c8y-iot >}}") or dedicated cloud instances ("{{< product-c8y-iot >}} Enterprise Dedicated"), tailored to meet the needs of your organization.
    * Optionally, separate environments for non-production activities can be purchased to ensure smooth development and testing processes.
    * {{< product-c8y-iot >}} is hosted in Customer-selected regions (EMEA, APAC, Japan, and the US).
* **Support services:**
    * The platform offers tiered product support to meet varying operational needs as outlined in the [support agreement](/service-terms/service-level/#support-sla).
* **Proactive monitoring and management:**
    * {{< product-c8y-iot >}} includes 24x7 platform monitoring, with a publicly accessible status page and real-time status notifications to keep you informed.
    * The platform’s availability, capacity, and performance are actively managed to ensure consistent and reliable operation.
* **Information security compliance:**
    * We operate the platform in compliance with SOC II and ISO 27001 standards, encompassing a wide range of security measures, including vulnerability management, security incident management, DDoS protection, intrusion detection, and encryption of data both in transit and at rest.
* **Business continuity and resilience:**
    * {{< product-c8y-iot >}} adheres to ISO 22301 standards for business continuity management (BCM), ensuring resilience against zone outages with zone redundancy.
    * Regular backups are maintained with a 30-day retention period, a Recovery Time Objective (RTO) of 12 hours, and a Recovery Point Objective (RPO) of 24 hours. Backups are stored in the same region where the service is hosted.
    * {{< company-c8y >}} conducts regular drills to validate its disaster recovery procedures.
    * RTO is valid only for the recovery of the whole platform.
    * There is no RTO available for the recovery of a single tenant or a number of tenants. Recovery time will depend on the data amount stored in the tenant.   
* **API compatibility management:** The platform maintains compatibility of APIs as outlined in its [Compatibility policy](/service-terms/compatibility-policy/). Transport protocols are managed in accordance with this policy, ensuring consistent and reliable API interactions.
* **Data ownership and portability:** As the data processor, {{< product-c8y-iot >}} ensures that Customer retains full ownership of their data. Customer can export their data at any time using the provided APIs, ensuring control and flexibility over their information.
* **Continuous maintenance and upgrades:** The platform undergoes regular maintenance and upgrades to ensure optimal performance and security. These upgrades happen transparently and without involving Customer.

For Customers with legacy service agreements, these features may differ in accordance with the terms of their original agreements.

### Customer responsibilities

As a Customer of the {{< product-c8y-iot >}} platform, we request your acknowledgment of the following responsibilities to ensure the continued security, performance, and efficiency of the service.

##### **Security management**

* **Device security:** While the {{< product-c8y-iot >}} platform provides robust security measures, Customer is responsible for the security of devices and device credentials. {{< company-c8y >}} cannot be held liable for any leaked credentials from devices. Customer acknowledges that communication protocols and ciphers may require periodic updates to address evolving security threats. This may necessitate updates to the devices themselves.
* **End user access security:** To protect the integrity of the cloud platform, Customer is encouraged to educate users on secure usage practices, such as implementing multi-factor authentication. Customer is responsible for managing user credentials, and {{< company-c8y >}} cannot be held responsible for any compromised credentials.
* **Certificate management:** Customer is responsible for monitoring the expiration of their certificates. Expired certificates can result in service unavailability for the associated clients, and Customer expressly acknowledges this responsibility.
* **Library and SDK updates:** Customers utilizing {{< company-c8y >}}-provided libraries, SDKs, or client code samples to build their own applications are responsible for keeping these components up to date, including applying security updates in a timely manner. {{< company-c8y >}} cannot be held liable for any security issues arising from outdated SDKs, libraries, or code samples in Customer applications.

##### **Capacity management**

* **Scalability considerations:** While the {{< product-c8y-iot >}} platform is designed to be scalable, it may not be able to accommodate sudden, extreme capacity demands (for example, all devices attempting to connect simultaneously after a connectivity outage, or all devices being upgraded at the same time). Customer acknowledges that such requests may be delayed or declined by the platform to maintain overall service stability. Customer is advised to implement an [exponential backoff strategy](https://en.wikipedia.org/wiki/Exponential_backoff).
* **Soft quotas:** Customer acknowledges the existence of "soft quotas" as documented in [Service quotas](/service-terms/quotas/). These quotas are not strictly enforced but exceeding them may lead to a reduced service level, and Customer is advised to operate within these guidelines.
* **Data retention management:** Data storage is included as part of Customer’s subscription. Customer is responsible for configuring appropriate data retention rules within the {{< product-c8y-iot >}} Administration application, balancing their specific use case requirements with budgetary considerations.

For details on non-permitted uses of {{< product-c8y-iot >}}, refer to the {{< product-c8y-iot >}} Terms of Service.

### Limitations and constraints

In the interest of transparency and to ensure a mutual understanding of the service capabilities, we kindly ask Customer to acknowledge the following limitations and constraints of the {{< product-c8y-iot >}} platform:

* **SDKs, code samples, and device-side software:**
    * {{< company-c8y >}}-provided SDKs, client libraries, code samples, and reference implementations are provided "as-is" under their respective license terms. They are intended as examples and integration aids and may require adaptation by Customer.
    * Device-side software, including thin-edge.io agents, device firmware, operating systems, and connectivity stacks, is developed, deployed, and operated under Customer's sole responsibility.
* **Hard quotas:** Customer acknowledges the existence of hard quotas as detailed in [Service quotas](/service-terms/quotas/). These quotas define maximum thresholds that the platform can support and are essential for maintaining overall system stability.
* **Shared environment considerations:** Customers not utilizing {{< product-c8y-iot >}} Dedicated plans should be aware that their tenant is hosted within a shared environment. As a result, response times may occasionally vary due to shared resource usage, and Customer acknowledges such variations. Furthermore, infrastructure-level information such as HTTP or MQTT access logs cannot be shared with Customer.
* **Data retention and storage costs:** Customer acknowledges that reducing data retention periods does not immediately lead to the reclamation of storage space or a reduction in storage costs due to technical processing requirements.
* **Distributed IoT system:** Customer acknowledges that IoT systems, by nature, are distributed and internet-based:
    * **Connectivity reliability:** Connectivity may occasionally fail. To ensure reliable communication, Customer devices and clients should implement appropriate reconnect or retry strategies. Singular connection drops or temporary failures are considered normal and do not constitute a service failure. {{< company-c8y >}} is committed to working with Customer to troubleshoot and resolve consistent and repeating communication issues.
    * **Third-party connectivity services:** Connectivity may involve third-party services such as LPWAN or mobile network operators. Customer acknowledges that while {{< product-c8y-iot >}} facilitates the transfer of data through these services, it does not operate, monitor, or troubleshoot these third-party networks. Connectivity between Customer's devices and {{< product-c8y-iot >}} service is in the sole responsibility of Customer.
* **Data recovery**: While {{< company-c8y >}} maintains backups of data for its own business continuity management, disaster recovery on behalf of Customer (for example, after accidental data deletion by Customer) is a separate service. Customer expressly acknowledges the backup retention period and RPO outline above.
* **Email notification**:  {{< company-c8y >}} provides a basic notification service via standard SMTP (unencrypted, port 25) for Customer to use via the {{< company-c8y >}} infrastructure components (SMTP relay). This infrastructure has been setup to transfer emails using the {{< company-c8y >}} domain, including, for example, correct SPF records for this domain. Customers using an {{< enterprise-tenant>}} can configure their own email domain and relay and use, for example, encrypted SMTP (STARTTLS) or SMTPS with their own SMTP relay. If Customer uses their own email domain, it is in the responsibility of Customer to configure, for example, the correct SPF records for that domain.
* **{{< management-tenant>}}**: For {{< product-c8y-iot >}} Start or Business, {{< company-c8y >}} is operating the {{< management-tenant>}}; customers do not have access to it. For Enterprise (dedicated), {{< company-c8y >}} and the customer share the {{< management-tenant>}}. For the {{< management-tenant>}}, single sign on (SSO) is not available as customer service.   

### Service availability

{{< company-c8y >}} is committed to providing reliable service. The specific service availability targets are as follows:

| Deployment type | Production environments | Non-production environments |
| --------------- | ----------------------- | --------------------------- |
| Shared Cloud    | 99.00%                  | 95.00%                      |
| Dedicated Cloud | 99.90%                  | 95.00%                      |

Service availability for {{< product-c8y-iot >}} is calculated as follows:

* The platform service consists of the service components "API Services" (REST) and "MQTT Services" as shown on the status page of the respective platform.
* The service components are regularly tested for availability and performance by simulating typical usage.
* The service availability of the service component for a month is the share of minutes the service component is available, excluding planned downtimes and emergency maintenance.
* The overall service availability is the average of the service components.

For non-production instances, the following are also excluded from the availability calculation:

(a) **Planned and announced maintenance tasks:** These may include, but are not limited to:

* Installation and upgrades of the entire platform.
* Deployment of new components.
* Upgrades to underlying third-party components (for example, Kubernetes, Database systems).

(b) **Third-party platform issues:** Any issues with the underlying computing platforms (for example, Azure, AWS) that result in service unavailability are excluded from the availability calculations.

(c) **Events of force majeure**.

### Service announcements

{{< company-c8y >}} communicates service availability and events impacting the service through the following status pages:

* [cumulocity-iot.instatus.com](https://cumulocity-iot.instatus.com/) for all {{< company-c8y >}} public instances.
* a dedicated location for {{< product-c8y-iot >}} Dedicated instances.

Planned and unplanned downtimes are communicated via the appropriate {{< product-c8y-iot >}} status page. The communication includes the expected time of service restoration.

{{< c8y-admon-info >}}
The availability of the status page itself is not included in the calculation of service availability.
{{< /c8y-admon-info >}}  

Service-impacting changes and planned downtimes are announced on the {{< product-c8y-iot >}} status page at least **14 days prior to the event**. Additional updates with more detailed information may be provided as the event approaches. 

{{< c8y-admon-info >}}
Emergency maintenance may be announced on short notice or without prior warning. 
{{< /c8y-admon-info >}}  

### Service credit commitment

#### Credit calculation

If the service is available for less than the availability outlined above during any full calendar month during the cloud services term, Customer will be eligible for a service credit for the particular service in accordance with the formula below (a “Service Credit”).

For services with 99.90% availability target (Dedicated Cloud):

| Monthly availability | Credit (% of monthly fee) |
| -------------------- | ---------------------------------------------------------------------- |
| 99.50% to < 99.90%   | 10%                                                                    |
| 99.00% to < 99.50%   | 15%                                                                    |
| < 99.00%             | 25%                                                                    |

For services with 99.00% availability target (Shared Cloud):

| Monthly availability | Credit (% of monthly fee) |
| -------------------- | ---------------------------------------------------------------------- |
| 98.00% to < 99.00%   | 10%                                                                    |
| < 98.00%             | 25%                                                                    |

For services with 95.00% availability target (non-production):

| Monthly availability | Credit (% of monthly fee) |
| -------------------- | ---------------------------------------------------------------------- |
| < 95.00%             | 10%                                                                    |


#### Credit request

Customer must submit all requests for Service Credits by filing a request ("Service Credit Request") to support, including the necessary information to evaluate the request, including:

1. the date, time and duration of the incident giving rise to the Service Credit Request (the “Incident”);
2. a detailed description of the incident, including any measures taken by Customer to resolve
the issue;
3. the tenant, number of Customer users and location(s) of Customer users affected by the incident (if applicable); and
4. any additional information reasonably requested by Provider necessary to validate the incident.

Provider must receive the Service Credit Request within fourteen (14) days from the occurrence of the incident. Provider will evaluate the Service Credit Request as soon as all information necessary to review the Service Credit Request is received. Provider will use commercially reasonable efforts to process complete Service Credit Requests during the subsequent calendar month and within thirty (30) days of receipt. If the incident is confirmed by Provider and gives rise to a Service Credit, Provider shall provide Customer with a refund within thirty (30) days of Providers determination. The total amount credited to customer in a particular year under this SLA shall not exceed 5% of the annual fee (exclusive of any taxes) paid by the Customer for the affected services.

#### Requirements and exceptions

Customer must be current on any payment obligations owed to Provider and in compliance with the terms of the Agreement and the order form in order to be eligible to receive Service Credits. The service availability commitments do not apply to any performance or availability issues:

1. Due to acts or conditions outside of Provider’s reasonable control, including, but not limited
to, a Force Majeure event as defined in the agreement above;
2. Initiated by Provider to protect the services or Customer data from unauthorized
access or loss;
3. Caused by Customer’s use of services, hardware, or software not provided by Provider
which affect the availability of the service; or
4. Caused by your use of services other than expressly authorized by, and in accordance
with, the terms of the Agreement and the order form or Customer’s use of the services after we advised you to modify your use of the service, if you did not modify your use as advised.

#### Exclusive remedy

Except as expressly set out in the Agreement, Customer acknowledges and agrees that
Provider’s sole obligation and Customer’s exclusive remedy for Provider’s failure to meet the
service availability requirements are set forth in this service credit commitment.

### Support and maintenance

#### **Support**

* **Customer support:** Support is provided in accordance with Customer’s selected support plan, as detailed in the [support agreement](/service-terms/service-level/#support-sla).

#### **Maintenance**

* **Ongoing maintenance and upgrades:** The {{< product-c8y-iot >}} platform is continuously maintained and upgraded to ensure optimal performance and security.
* **Seamless upgrades:** This maintenance process is designed to be seamless and generally invisible to Customer. The timing and content of upgrades are at the discretion of {{< company-c8y >}}.
* **Upgrade information:** Details about scheduled upgrade times are available on the platform’s status pages as outlined above, while information about the specific changes included in each upgrade can be found in the [change logs](/change-logs/) within the user documentation.
* **Regulated environments:** For customers operating in regulated environments, an optional annual maintenance schedule is available to meet specific compliance requirements.

### Acceptance

By using the Services provided by {{< company-c8y >}}, Customer agrees to adhere to the terms outlined in this SLA.
