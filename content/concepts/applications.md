---
title: Application enablement
layout: bundle
weight: 40
sector:
  - getting_started
---

{{< product-c8y-iot >}} provides a comprehensive application enablement platform that combines no-code tools with advanced development capabilities, enabling users to build and deploy IoT solutions that are tailored to business requirements.

The {{< product-c8y-iot >}} flexible architecture supports different levels of application enablement:

- **No-code enablement:** Allows users to quickly configure existing applications and extend functionalities through available extensions without needing to write code.
- **Low-code enablement:** Enables the creation of custom logic using intuitive tools like Analytics Builder and pre-built components, making it easy for users with minimal coding experience to develop solutions.
- **Code-based enablement:** For full customization, developers have access to comprehensive SDKs to build tailored solutions, offering maximum flexibility and control.


### Self-service applications

This includes:

- **[Cockpit application](/cockpit/cockpit-introduction/)** - Offers no-code tools that enable users to monitor and visualize IoT data quickly. It features a drag-and-drop interface, a pre-built [widget library](/cockpit/widgets-collection/) and [smart rules](/cockpit/smart-rules/) for creating [dashboards](/cockpit/working-with-dashboards/) and analytics. This allows business users to implement real-time monitoring and data visualization solutions without extensive coding knowledge.
- **[Digital Twin Manager](/dtm/dtm-introduction/)** - helps users create and manage blueprints of their assets, including their properties, relationships, and connections to sensor and device data. 

- **[Branding manager](/enterprise-tenant/customization/#branding)** - Enables organizations to modify logos, colors, fonts, and [domain names](/enterprise-tenant/customization/#domain-name) for a consistent, white-labeled experience that aligns with their brand identity.

- **[Extensions library](/standard-tenant/ecosystem/#extensions)** - Offers pre-built official & community-supported, open-source plugins that support adding additional functionalities in the platform that can be integrated seamlessly into applications.


### Customization & Developer Tools

For more advanced customization, {{< product-c8y-iot >}} supports:

- **[Web SDK](/web/introduction/)** - Provides all necessary clients and components to quickly build frontends in {{< product-c8y-iot >}}. Developers can start with a simple UI plugin or scale up to a fully scaffolded web application.

- **Micro frontend architecture & [extension ecosystem](/standard-tenant/ecosystem/#extensions)** - Enables developers to create modular extensions that integrate with any {{< product-c8y-iot >}} application. This dynamic approach allows features to be loaded at runtime, enabling the flexible and scalable extension of Web SDK-based applications.

- **[Codex](https://styleguide.cumulocity.com/apps/codex/#/)** - Offers essential tools for building applications, including UI guidelines, development resources, reusable Angular-based components, styling utilities, and helps ensure consistency, efficiency, and streamlined development for {{< product-c8y-iot >}} applications.

- **Managed microservices hosting** - Enables developers to deploy [custom backend services](/standard-tenant/ecosystem/#custom-microservices) using the [Microservice SDK](/microservice-sdk/microservice-sdk-introduction/). This allows for efficient development and extension of business logic within a secure, scalable environment, without managing external infrastructure.

These capabilities, combined with {{< product-c8y-iot >}} built-in **[multi-tenancy](/concepts/tenant-hierarchy/) and [application subscription management](/enterprise-tenant/managing-tenants/#subscribing-applications)**, create a robust foundation for scalable and secure application enablement. 

### Other resources

- [Open APIs](https://cumulocity.com/api/) - Well-documented REST APIs that expose complete platform functionality
- [Command Line Interface (CLI)](https://goc8ycli.netlify.app/docs/introduction/) - Tools for streamlined development workflows and automation
- Active Developer Community - A collaborative platform for knowledge sharing and problem-solving through the [Tech Community](https://techcommunity.cumulocity.com/)
