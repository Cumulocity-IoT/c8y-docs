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

A channel on which messages are sent and received, by a device connected to a [protocol adapter](#protocol-adapter) or by a microservice using the [Messaging Service](#messaging-service).
With devices, the topic typically describes the kind of data that is being sent.
For example, an MQTT device connected to the [MQTT Service](#mqtt-service) might publish messages on topics `meters/123456/current` and `meters/123456/temperature`.
The Messaging Service uses its own topic namespace for passing messages between protocol adapters, microservices, and internal {{< product-c8y-iot >}} components.
For example, all messages published by devices using the MQTT Service will be delivered to microservices on the `from-device` topic, regardless of the MQTT topic that was used.
See [Core MQTT topics](/device-integration/mqtt-service/#core-mqtt-topics) for another example of a topic schema used by MQTT devices, in this case devices that use the [SmartREST](#smartrest) device protocol.
