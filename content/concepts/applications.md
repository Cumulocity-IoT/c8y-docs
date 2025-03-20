---
title: Application enablement
layout: bundle
weight: 40
sector:
  - getting_started
---

{{< product-c8y-iot >}} provides a comprehensive application enablement platform that combines no-code tools with advanced development capabilities, enabling users to build and deploy IoT solutions that are tailored to business requirements.

The {{< product-c8y-iot >}} flexible architecture supports different levels of application enablement:

- **No-code enablement:** Allows users to quickly configure existing applications and extend functionalities through available extensions without the need to write code.
- **Low-code enablement:** Enables the creation of custom logic using intuitive tools like Analytics Builder and pre-built components, making it easy for users with minimal coding experience to develop solutions.
- **Code-based enablement:** For full customization, developers have access to comprehensive SDKs to build tailored solutions, offering maximum flexibility and control.


### Self-service applications

For users with no or minimal coding experience, {{< product-c8y-iot >}} includes:

- **[Cockpit application](/cockpit/cockpit-introduction/)** - Offers no-code tools that enable users to monitor and visualize IoT data quickly. It features a drag-and-drop interface, a pre-built [widget library](/cockpit/widgets-collection/) and [smart rules](/cockpit/smart-rules/) for creating [dashboards](/cockpit/working-with-dashboards/) and analytics. This allows business users to implement real-time monitoring and data visualization solutions without extensive coding knowledge.
- **[Digital Twin Manager](/dtm/dtm-introduction/)** - Helps users create and manage blueprints of their assets, including their properties, relationships, and connections to sensor and device data.
- **[Branding manager](/enterprise-tenant/customization/#branding)** - Enables organizations to modify logos, colors, fonts, and [domain names](/enterprise-tenant/customization/#domain-name) for a consistent, white-labeled experience that aligns with their brand identity.
- **[Extensions library](/standard-tenant/ecosystem/#extensions)** - Offers pre-built official & community-supported, open-source plugins that support adding additional functionalities in the platform that can be integrated seamlessly into applications.


### Customization & developer tools

For more advanced customization, {{< product-c8y-iot >}} provides comprehensive development capabilities:

- **[Web SDK](/web/introduction/)** - Provides all necessary clients and components to quickly build frontends in  {{< product-c8y-iot >}} and fully utilize the Microfrontend architecture capabilities. Developers can start with a simple UI plugin or scale up to a fully scaffolded web application.
- **[Web Application Hosting](/standard-tenant/ecosystem/#custom-applications)** - Enables secure deployment and hosting of Web SDK-based applications within the {{< product-c8y-iot >}} platform, with built-in support for the [extension ecosystem](/standard-tenant/ecosystem/#extensions).
- **[Microservice SDK](/microservice-sdk/microservice-sdk-introduction/)** - Offers tools and libraries for developing custom backend services that extend {{< product-c8y-iot >}}'s functionality.
- **Managed Microservice Hosting** - Provides secure, scalable hosting for [custom microservices](/standard-tenant/ecosystem/#custom-microservices) within the {{< product-c8y-iot >}} platform infrastructure.
- **[Codex](https://styleguide.cumulocity.com/apps/codex/#/)** - Comprehensive design system offering UI guidelines, reusable Angular components, and styling utilities to ensure consistent application development.

These capabilities, combined with {{< product-c8y-iot >}}'s built-in **[multi-tenancy](/concepts/tenant-hierarchy/)** and **[application subscription management](/enterprise-tenant/managing-tenants/#subscribing-applications)**, provide a robust foundation for scalable application development.

### Other resources

- [Open APIs](https://cumulocity.com/api/) - Well-documented REST APIs that expose complete platform functionality
- [Command Line Interface (CLI)](https://goc8ycli.netlify.app/docs/introduction/) - Tools for streamlined development workflows and automation
- Active Developer Community - A collaborative platform for knowledge sharing and problem-solving through the [Tech Community](https://techcommunity.cumulocity.com/)
