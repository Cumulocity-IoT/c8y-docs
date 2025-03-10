---
title: Application enablement
layout: bundle
weight: 40
sector:
  - getting_started
---

{{< product-c8y-iot >}} provides a comprehensive application enablement platform that combines no-code tools with advanced development capabilities, enabling users to build and deploy IoT solutions that are tailored to business requirements.

The {{< product-c8y-iot >}} flexible architecture supports different levels of application enablement:

- No-code enablement: Allows users to quickly configure existing applications and extend functionalities through available extensions.
- Low-code enablement: Enables the creation of custom logic using intuitive tools like Analytics Builder and pre-built components, making development accessible to users with minimal coding experience.
- Code-based enablement: Provides comprehensive SDK access for developers to build fully customized solutions, offering maximum flexibility and control.


### Self-Service Applications

The key capabilities include:

- **[Cockpit application](/cockpit/cockpit-introduction/)** - Offers no-code tools that enable users to create and manage applications quickly. It features a drag-and-drop interface, a pre-built [widget library](/cockpit/widgets-collection/) and [smart rules](/cockpit/smart-rules/) for creating [dashboards](/cockpit/working-with-dashboards/) and analytics. This allows business users to implement realtime monitoring and data visualization solutions without extensive coding knowledge.

- **[Digital Twin Manager](/dtm/dtm-introduction/)** - The centralized modelling application for {{< product-c8y-iot >}} and is used to define and manage data model schemas that act as blueprints for representing assets within the platform. This is supported by dedicated [Asset APIs](https://cumulocity.com/api/core/#tag/Inventory-API), allowing to access defined models, properties, and hierarchical relationships.

- **[Branding manager](/enterprise-tenant/customization/#branding)** - Enables organizations to modify logos, colors, fonts, and [domain names](/enterprise-tenant/customization/#domain-name) for a consistent, white-labeled experience that aligns with their brand identity.

- **[Extensions library](/standard-tenant/ecosystem/#extensions)** - Offers pre-built official & community-supported , open-source plugins that support adding additional functionalities in the platform that can be integrated seamlessly into applications.


### Customization & extension

For more advanced customization, {{< product-c8y-iot >}} supports:

- **[Web SDK](/web/introduction/)** - Provides all necessary clients and components to quickly build frontends in {{< product-c8y-iot >}}. Developers can start with a simple UI plugin or scale up to a fully scaffolded web application.

- **Micro frontend architecture & [extension ecosystem](/standard-tenant/ecosystem/#extensions)** - Enables developers to create modular extensions that integrate with any {{< product-c8y-iot >}} application. This dynamic approach allows features to be loaded at runtime, enabling the flexible and scalable extension of Web SDK-based applications.

- **[Codex](https://styleguide.cumulocity.com/apps/codex/#/)** - Offers essential tools for building applications, including UI guidelines, development resources, reusable Angular-based components, styling utilities, and helps ensuring consistency, efficiency, and streamlined development for {{< product-c8y-iot >}} applications.

- **Managed microservices hosting** - Enables developers to deploy [custom backend services](/standard-tenant/ecosystem/#custom-microservices) using the [Microservice SDK](/microservice-sdk/microservice-sdk-introduction/). This allows for efficient development and extension of business logic within a secure, scalable environment, without managing external infrastructure.

### Tenants concept

{{< product-c8y-iot >}} includes built-in **[multi-tenancy](/concepts/tenant-hierarchy/) & [application subscription management](/enterprise-tenant/managing-tenants/#subscribing-applications)** features that allow for:

- Secure data isolation by assigning dedicated [tenants](/enterprise-tenant/managing-tenants/)
- Customized application features for different client needs
- Scalable service rollout across multiple customers


### Other resources

- [Open APIs](https://cumulocity.com/api/) - Well-documented REST APIs that expose complete platform functionality
- [Command Line Interface (CLI)](https://goc8ycli.netlify.app/docs/introduction/) - Tools for streamlined development workflows and automation
- Active Developer Community - A collaborative platform for knowledge sharing and problem-solving through the [Tech Community](https://techcommunity.cumulocity.com/)
