---
title: Microservice hosting service-level agreement
layout: bundle
weight: 20
aliases:
  - /microservice-sdk/microservices-sla/
  - /microservices-sla/
---

**This Agreement** is made between {{< company-c8y >}} ("Provider") and the Customer ("Customer") who utilizes {{< product-c8y-iot >}} Microservices ("Service", “Container-as-a-Service") for deploying Customer Microservices ("Microservices") on {{< product-c8y-iot >}} cloud instances.

### Service description

The Provider hosts and manages a Container-as-a-Service cluster based on Kubernetes that allows the Customer to run custom Microservices within their {{< product-c8y-iot >}} tenants (purchased separately). This Service includes the orchestration of Microservices through Kubernetes, ensuring scalability, high availability, and efficient resource management.

### Service features

{{< product-c8y-iot >}} Microservices includes the following features.

* **Microservice management:** {{< product-c8y-iot >}} Microservices provides Customer with the means to deploy, update, run, load-balance and monitor Microservices. Optionally, it automatically
  * [Scales Microservices](/microservice-sdk/general-aspects/#isolation-scaling) in case of high CPU load.
  * Restarts Microservices in case of unresponsiveness or errors, provided Microservice includes a liveness probe.
* **Resource allocation:** {{< product-c8y-iot >}} Microservices ensures that the capacity [as declared by the Customer for each Microservice](/microservice-sdk/general-aspects/#settings) is consistently provided within the limits of this service-level agreement.
* **Monitoring and health checks:** The Service includes monitoring capabilities that leverage [Kubernetes' system of liveness and readiness probes](https://cloud.google.com/blog/products/containers-kubernetes/kubernetes-best-practices-setting-up-health-checks-with-readiness-and-liveness-probes) to maintain the health and performance of Microservices provided the probes are implemented (see below).
* **Authentication**: The Service ensures that [only authenticated users](/microservice-sdk/general-aspects/#security) access Microservices.
* **Security management**: The Service includes the security management of the {{< product-c8y-iot >}} Microservices infrastructure (excluding Microservices themselves) including security monitoring, software upgrades, network isolation and potentially other measures.
* **Subscription management**: {{< product-c8y-iot >}} Microservices lets you [subscribe your customers](/enterprise-tenant/managing-tenants/#subscribing-applications) to Microservices.
* **Metering and billing**: {{< product-c8y-iot >}} Microservices [meters the infrastructure resource usage](/enterprise-tenant/usage-and-billing/) of the Microservices.

### Customer responsibilities

Customer acknowledges the following Customer responsibilities. Customers are encouraged to review the {{< product-c8y-iot >}} Microservices documentation, particularly the [developer’s guides](/microservice-sdk/microservice-sdk-introduction/) and [change logs](/change-logs/).

* **Microservice development**:
  * **Liveness and readiness probes:** Customer implements suitable liveness and readiness probes that reflect the state of Microservices as outlined in the [Kubernetes developer documentation](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/). In case liveness and readiness probes are not implemented, availability service-level requirements do not apply, and outages may occur.
  * **Authorization**: It is in Customer's responsibility to verify the [authorization of the authenticated user](/microservice-sdk/general-aspects/#microservice-authorization).
  * **Software management**: Customer manages the software used inside Microservices, including third-party software components and container operating systems. Customer acknowledges their sole responsibility for Microservices’ compliance with applicable laws and regulations, including intellectual property rights, licenses, and other legal requirements. Provider shall have no responsibility or liability for any IPR, licensing, or other legal issues arising from Customer's use of Microservices.
  * **Security management**: Customer manages the security inside Microservices, including software vulnerability management and usage of credentials in Microservices. Customer acknowledges their sole responsibility for the vulnerability management of Microservices, including identifying, addressing, and mitigating any security vulnerabilities, breaches or other incidents. Provider shall have no responsibility or liability for any vulnerabilities, breaches, or other security issues related to Microservices.
  * **Statelessness**: Microservices must be designed [stateless](/microservice-sdk/general-aspects/#requirements-interactions). Persistent storage must be handled using {{< product-c8y-iot >}} APIs or external services. If Microservices are not designed stateless, Customer acknowledges that the state can be lost at any time.
  * **Memory**: Customer verifies Microservices for memory consumption in line with the configured memory limits. If limits are exceeded, Microservices may be restarted or eventually terminated.
* **Microservice configuration:**
  * **Replicas**: Customers are advised to [configure](/microservice-sdk/general-aspects/#microservice-manifest) at least two replicas of Microservices. In case only one replica is configured, availability service-level agreements do not apply and Microservices outages may occur.
* **Microservice operations:** While {{< product-c8y-iot >}} Microservices provides means for resource management and high availability, it is in Customer's responsibility to monitor and operate Microservices. {{< product-c8y-iot >}} Microservices will provide information about the runtime state of Microservices (such as log information from Microservices), but it is in Customer's responsibility to troubleshoot and rectify out-of-memory conditions, crashes, or restarts of Microservices as required by Customer.
* **Usage monitoring**: Microservices are charged based on parameters such as running number of Microservices instances and defined resource limits. It is the Customer's responsibility to determine unused or underused Microservices.

### Limitations and constraints

Customer acknowledges the following limitations and constraints in using Service.

* **Storage:** No persistent storage is provided beyond {{< product-c8y-iot >}} API services. Changes to files inside Microservices are not preserved across restarts.
* **Port Restrictions:** Microservices are limited to one inbound REST API port. This restriction is crucial for maintaining the security and simplicity of the network architecture.
* **Network restrictions**: To ensure network security, Microservices can only communicate with the {{< product-c8y-iot >}} API and externally. Microservices cannot directly communicate among each other. Network connections may be automatically reset at any time and need to be reconnected by the Microservices. Provider reserves the right to stop or remove Microservices with excessive outbound networking traffic.
* **Mandatory authentication**: To simplify access control, all requests to Microservices are authenticated by {{< product-c8y-iot >}} prior to reaching Microservices.
* **Restarts**: Microservices may be automatically restarted or relocated across the cluster at any time to ensure optimal performance and availability, or for the management of the {{< product-c8y-iot >}} Microservices infrastructure.
* **Capacity requests and limits**:
  * There is an upper bound on the capacity that can be requested for a Microservice ("requestedResources" in the [Microservices manifest](/microservice-sdk/general-aspects/#microservice-manifest)). This upper bound is usually 250m of CPU and 256 MB of memory but may vary depending on your {{< product-c8y-iot >}} instance.
  * Upper bounds for capacity limits (“resources” in the [Microservices manifest](/microservice-sdk/general-aspects/#microservice-manifest)) may vary based on the {{< product-c8y-iot >}} instance.
  * {{< product-c8y-iot >}} may block large capacity requests occurring in a brief period.
  * In case of doubt, please [contact product support](/additional-resources/contacting-support/) for bounds and larger capacity requirements (for example, onboarding a single-tenant Microservice with many customers).
* **Security and performance management**: Provider may stop or remove Microservices in case of a severe security or performance impact to {{< product-c8y-iot >}}. Customers are expressly prohibited from engaging in any destructive activities on the {{< product-c8y-iot >}} production infrastructure. This includes penetration testing, performance testing, stress testing, or any other activities that may compromise the integrity, performance, or security of our systems.
* **Quotas** as [documented](/terms-and-conditions/limits/).

### Service availability

Service availability of {{< product-c8y-iot >}} Microservices follows the [general service terms](/terms-and-conditions/service-level/#platform-sla) of {{< product-c8y-iot >}}.

### Support and maintenance

* **Technical support:** The Provider will offer [technical support](/additional-resources/contacting-support/) for issues related to the Kubernetes infrastructure and the deployment of Microservices via the Service. Support for developing or debugging Microservices is outside the scope of this service-level agreement but can be requested from Provider Professional Services.
* **Maintenance windows:** Scheduled maintenance will be communicated in advance through Provider’s status notification system (for example,[ https://status.cumulocity.com/](https://status.cumulocity.com/) for EU, US, EMEA), and efforts will be made to minimize disruption during these periods.

### Acceptance

By using the Services provided by {{< company-c8y >}}, the Customer agrees to adhere to the terms outlined in this SLA.
