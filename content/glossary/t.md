---
weight: 160
title: T
layout: bundle
sector:
  - getting_started
build:
  render: false

---

### Tenant {#tenant}

A tenant represents a logically isolated data space within {{< product-c8y-iot >}}, typically corresponding to a customer or organizational unit. It has its own [users](#user), [devices](#device), [applications](#application), and data (see [{{< product-c8y-iot >}}'s domain model](/concepts/domain-model/)).

{{< c8y-details title="Developer details" >}}
Tenants are managed via the [Tenant API](https://cumulocity.com/api/core/#tag/Tenant-API) (`/tenant/tenants`). This includes creating subtenants (POST), retrieving details (GET), updating properties (PUT), and deleting (DELETE). Tenant-specific configurations are managed via the [Tenant Options API](https://cumulocity.com/api/core/#tag/Options) (`/tenant/options`).
{{< /c8y-details >}}


### Tenant diagnostic archive {#tenant-diagnostic-archive}

A tenant diagnostic archive is a ZIP file of diagnostics information that a user downloads from the Streaming Analytics or Data Preparation application, for example, to investigate a problem with its models or rules. It only contains data of the user's own [tenant](#tenant), such as its models, smart rules, alarms, and log messages. The archive from the Data Preparation application also contains the [Data Preparation rules](#data-preparation-rule) of the tenant. When the [microservice](#microservice) is shared by several tenants, the archive contains no data of other tenants and no information about the shared microservice as a whole.

See also [Downloading diagnostics and logs](/streaming-analytics/troubleshooting/#diagnostics-download) and [Downloading diagnostics](/data-preparation/logs-and-diagnostics/#download-diagnostics) in the documentation.


### Tenant domain {#tenant-domain}

The tenant domain refers to the domain name used to access a {{< product-c8y-iot >}} [tenant](#tenant), in the format `<tenant-name\>.\<instance-name\>`. It is used for login and API access and is distinct from the tenant’s unique identifier ([tenant ID](#tenant-id)). For example, a tenant named "acme" on the instance cumulocity.com would have the tenant domain "acme.cumulocity.com". [Enterprise tenants](#enterprise-tenant) and their [subtenants](#subtenant) can optionally configure custom domains for access using the platform’s custom domain feature.

{{< c8y-details title="Developer details" >}}
The tenant domain is configured via the Administration application and requires subscribing to the Sslmanagement microservice.
{{< /c8y-details >}}  


### Tenant hierarchy {#tenant-hierarchy}

The tenant hierachy refers to the structure organizing [tenants](#tenant) in {{< product-c8y-iot >}}, involving a [{{< management-tenant >}}](#management-tenant) at the top, [{{< enterprise-tenant >}}s](#enterprise-tenant) below it, and [{{< standard-tenant >}}s](#standard-tenant) at the lowest level.

See also [Tenant hierarchy](/concepts/tenant-hierarchy/) in the documentation.

{{< c8y-details title="Developer details" >}}
Tenant hierarchies are managed through the [Tenant API](https://cumulocity.com/api/core/#tag/Tenant-API) (`/tenant/tenants`). Creating a subtenant (POST `/tenant/tenants`) under a parent tenant establishes the hierarchical link.
{{< /c8y-details >}}


### Tenant ID {#tenant-id}

A tenant ID is a unique identifier assigned to each [tenant](#tenant). The tenant ID is often used as a prefix in the username for authentication (for example, `\<tenantID\>/\<username\>`).


### Tenant option {#tenant-option}

Tenant options are configurable key-value pairs associated with a [tenant](#tenant), used to customize platform behavior, [application](#application) settings, or store tenant-specific configurations.

{{< c8y-details title="Developer details" >}}
Tenant options are managed via the [Tenant Options API](https://cumulocity.com/api/core/#tag/Options) (`/tenant/options`). Options can be created (POST), retrieved (GET), updated (PUT), and deleted (DELETE).
There is a mechanism to [encrypt](/microservice-sdk/general-aspects/#encryption) tenant options. If a tenant option is created with a key name that starts with `credentials.`, it is automatically encrypted. When the option is retrieved from a microservice, the `credentials.` prefix is removed, and the value is decrypted only if the microservice is the owner of the option.
{{< /c8y-details >}}  


### Tenant policy {#tenant-policy}

Tenant policies are predefined sets of [tenant options](#tenant-option) and retention rules that can be created in a [{{< management-tenant >}}](#management-tenant) or [{{< enterprise-tenant >}}](#enterprise-tenant) and applied when creating new [subtenants](#subtenant) to ensure consistent initial configurations. Tenant policies are created and managed in the [Administration application](#administration-application).

See also [Tenant policies](/enterprise-tenant/managing-tenants/#tenant-policies) in the documentation.

{{< c8y-details title="Developer details" >}}
Tenant policies are stored in the inventory and managed through the [Inventory API](https://cumulocity.com/api/core/#tag/Inventory-API) endpoints (`/inventory/managedObjects`). When creating or updating a policy the request body must follow a specific format, for example, must contain the `c8y_TenantPolicy` fragment.
{{< /c8y-details >}}    


### Tenant-scoped log view {#tenant-scoped-log-view}

A tenant-scoped log view is the **Logs** page of the Streaming Analytics or Data Preparation application. It shows the log messages that the application writes for the user's own [tenant](#tenant), without requiring access to the Administration application, and can be narrowed to a single Analytics Builder [model](#model) or [Data Preparation rule](#data-preparation-rule). Messages of other tenants are never shown, even when the [microservice](#microservice) is shared by several tenants.

See also [Viewing logs in the Streaming Analytics application](/streaming-analytics/troubleshooting/#logs-view) and [Logs and diagnostics](/data-preparation/logs-and-diagnostics/) in the documentation.


### Tech Community {#tech-community}

The official online forum and knowledge base for {{< product-c8y-iot >}} users and developers to ask questions, share solutions, find tutorials, and stay updated on platform news and events. See [https://community.cumulocity.com/](https://community.cumulocity.com/).


### Thick Edge {#thick-edge}

Thick Edge is an informal term for {{< product-c8y-iot >}} Edge, see [{{< product-c8y-iot >}} Edge](#edge).


### thin-edge.io {#thin-edge}

[thin-edge.io](https://thin-edge.io/) is an open-source software framework recommended by {{< product-c8y-iot >}} for custom device integration. It provides components and tools to connect [devices](#device) to the platform, particularly suitable for implementing device-side logic.

{{< c8y-details title="Developer details" >}}
thin-edge.io exposes a local {{< product-c8y-iot >}} proxy endpoint to give device components access to the full {{< product-c8y-iot >}} REST API.
{{< /c8y-details >}}


### Topic {#topic}

A topic is a channel for messages sent by one or more _publishers_ and received by one or more _subscribers_.
Messages are delivered in the same order they were published, and will be reliably delivered to all subscribers.
In {{< product-c8y-iot >}}, a topic can refer to a [device topic](#device-topic) or a [Messaging Service topic](#messaging-service-topic).
