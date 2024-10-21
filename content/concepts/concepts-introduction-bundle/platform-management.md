---
weight: 70
title: Platform management
---

{{< product-c8y-iot >}} provides a platform management solution that allows to efficiently control and secure IoT deployments, whether provided as Software-as-a-Service (SaaS) in the cloud or installed on-premises. Through a dedicated [Administration application](/standard-tenant/standard-tenant-introduction/), the platform allows administrators to manage key areas such as tenant and application management, user roles and permissions, and secure data sharing.

#### Key Capabilities
- **Multi-tenancy support**: With [{{< enterprise-tenant >}}s](/enterprise-tenant/enterprise-tenant-introduction/), {{< product-c8y-iot >}} supports full [multi-tenancy](/concepts/tenant-hierarchy/), providing clear data separation and enabling organizations to securely manage multiple tenants from a single instance.

- **Application management**: Fully customize the look and feel of your tenants and applications using [white-labeling](/enterprise-tenant/customization/#branding) and control, deploy, [subscribe](/enterprise-tenant/managing-tenants/#subscribing-applications), and [monitor](/standard-tenant/ecosystem/#monitoring-microservices) your custom [web applications](/standard-tenant/ecosystem/#managing-applications), [extensions](/standard-tenant/ecosystem/#extensions) and [microservices](/standard-tenant/ecosystem/#managing-microservices).

- **Advanced security and access control**: The platform offers fine-grained [Role-Based Access Control](/standard-tenant/managing-permissions/) (RBAC) to define precise permissions for devices, users, and services. Integration with existing Identity and Access Management (IAM) systems is supported through [Single Sign-On (SSO)](/authentication/sso/) for streamlined access management, while [certificate-based authentication](/device-integration/device-certificates/) ensures device-level security to prevent unauthorized access.

- **Data sharing and synchronization**: Using the [data broker](/data-broker/data-broker-application/), administrators can enable secure data exchange between different tenants and efficiently manage data sharing policies. This feature allows for safe and controlled device data sharing across different tenant environments.


#### Deployment options
{{< product-c8y-iot >}} offers flexible deployment options to accommodate various business and regulatory requirements:

- **Cloud-based (SaaS) deployment**: Businesses can leverage the platform as a fully managed SaaS solution in the cloud, benefiting from seamless updates, scalability, and reduced infrastructure management overhead.

- **On-premises deployment with [{{< product-c8y-iot >}} Edge](/edge/edge-introduction/)**: For environments requiring local installations, {{< product-c8y-iot >}} Edge provides the full capabilities of the platform on a single industrial PC or a locally managed [Kubernetes](/edge-kubernetes/k8-edge-introduction/) environment. This option allows businesses to run the IoT platform independently from the cloud, making it ideal for environments with limited connectivity or stringent security requirements. The platform can operate in air-gapped networks and [supports strict security measures](/edge/edge-configuration/#configuring-security), including STIG compliance for enhanced cybersecurity.

With its consistent architecture, {{< product-c8y-iot >}} enables organizations to develop once and deploy seamlessly across both cloud and edge environments, ensuring unified management and consistent functionality. The [data broker](/data-broker/data-broker-application/) further supports this flexibility by enabling secure data synchronization between on-premises and cloud-based deployments, allowing for efficient data exchange while maintaining complete control over data security.
