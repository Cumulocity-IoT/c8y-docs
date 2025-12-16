---
weight: 150
title: S
layout: bundle
sector:
  - getting_started
_build:
  render: false

---

### Service user {#service-user}

A service user is a non-human user account that is created automatically when a [tenant](#tenant) subscribes to a [microservice](#microservice). It allows the microservice to interact with the tenant's data via the [REST API](#rest-api) for background tasks, independent of any end-user's session.  


### Smart group {#smart-group}

Smart groups are [groups](#group) whose membership is dynamically determined based on [device](#device) properties matching defined criteria, rather than static assignment. This is a feature of the [Device Management application](#device-management-application).  


### SmartREST {#smartrest}

SmartREST is a lightweight, CSV-based [device protocol](#device-protocol) to exchange data between [devices](#device) and the platform. SmartREST uses standard MQTT. The protocol enables devices to send and receive structured messages using templates that map message fields to object properties, reducing the message size and simplifying the integration for resource-constrained IoT devices.

{{< c8y-details title="Developer details" >}}
Devices communicate dedicated MQTT topics with {{< product-c8y-iot >}}. Each row of CSV data begins with a message ID that corresponds to either a specific, pre-registered request template or an extensive suite of built-in templates.
{{< /c8y-details >}}

### Smart rules {#smart-rules}

With smart rules, you can analyze real-time data and perform actions based on predefined conditions without writing any code. For example, you can create a rule to send an email or generate an [alarm](#alarm) when a [measurement](#measurement) exceeds a specific threshold.

The platform provides two versions of this feature:
- Smart rules collection: Provides a fixed set of rule templates, configured using a simple wizard in the [Cockpit application](#cockpit-application).
- Smart rules (NEW) plugin: Provides extendable and fully customizable rule templates. These are built using [Analytics Builder](#analytics-builder) and then made available as simple forms in any application (such as [Cockpit](#cockpit-application) and [Device Management](#device-management-application)).

See also [Smart rules collection](/cockpit/smart-rules-collection/) or [Smart rules (NEW) plugin](/cockpit/cockpit-smart-rules-plugin/) in the documentation.

{{< c8y-details title="Developer details" >}}
Rules are configured by applications that have the smart rules (NEW) plugin installed such as Cockpit or Device Management. There is no public API for creating the rules. Smart rules are powered by the Apama engine for Smart rules (NEW) and the “smartrule” microservice for the previous generation of smart rules.
{{< /c8y-details >}}


### SSO (Single sign-on) {#sso}

SSO (Single sign-on) is an [authentication](#authentication) method that allows [users](#user) to log into {{< product-c8y-iot >}} using credentials from an external, third-party identity provider (IdP) that supports the OAuth2 protocol, such as Azure AD.  


### {{< standard-tenant >}} {#standard-tenant}

A standard tenant is a [tenant](#tenant) that does not have tenant management capabilities. Unlike an [{{< enterprise-tenant >}}](#enterprise-tenant) or [{{< management-tenant >}}](#management-tenant), a {{< standard-tenant >}} lacks [multi-tenancy](#multi-tenancy) features and cannot create [subtenants](#subtenant).

See also [Standard tenant administration](/standard-tenant/standard-tenant-introduction/) in the documentation.

{{< c8y-details title="Developer details" >}}
The Standard tenant uses core REST APIs but lacks access to multi-tenant administrative APIs available to {{< enterprise-tenant >}}s and {{< management-tenant >}}s.
{{< /c8y-details >}}


### Subscription

In {{< product-c8y-iot >}}, a subscription denotes the process by which a [tenant](#tenant) is granted access to an [web application](#web-application) from the [Administration application](#administration-application). A superior tenant (like an [{{< enterprise-tenant >}}](#enterprise-tenant) or the [{{< management-tenant >}}](#management-tenant))) subscribes [applications](#application) and [microservices](microservices) to its subtenants.

- For microservices: Subscription is a mandatory step. A microservice must be subscribed to a tenant to become available.
- For web applications: Subscription makes a shared or marketplace application (like the [Cockpit application](#cockpit-application)) available to a specific tenant.

See also [Subscribing applications](/enterprise-tenant/managing-tenants/#subscribing-applications) in the documentation.

{{< c8y-details title="Developer details" >}}
Subscriptions are managed via the [Tenant API](https://cumulocity.com/api/core/#tag/Tenant-API) (`POST /tenant/tenants/{tenantId}/applications`) and the [Application API](https://cumulocity.com/api/core/#tag/Application-API) (`POST /application/applications/{applicationId}/subscription`). Microservices use `GET /application/currentApplication/subscriptions` to list subscribed tenants.
{{< /c8y-details >}}


### Subtenant {#subtenant}

A subtenant is a [tenant](#tenant) created and managed under a parent tenant (either an [{{< enterprise-tenant >}}](#enterprise-tenant) or the [{{< management-tenant >}}](#management-tenant)) within the {{< product-c8y-iot >}} [tenant hierarchy](#tenant-hierarchy).

{{< c8y-details title="Developer details" >}}
Subtenants are created and managed via the [Tenant API](https://cumulocity.com/api/core/#tag/Tenant-API) (`/tenant/tenants`) by an administrator of a parent {{< enterprise-tenant >}} or {{< management-tenant >}}.
{{< /c8y-details >}}
