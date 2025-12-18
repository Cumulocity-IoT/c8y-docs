---
weight: 20
title: A
layout: bundle
sector:
  - getting_started
_build:
  render: false
---

### Administration application {#administration-application}

The Administration application is a default {{< product-c8y-iot >}} application and the central place for platform administrators to manage a tenant. It is used to govern a [tenant](#tenant) by managing [users](#user), [roles](#role), and [permissions](#permission), subscribing to and managing [applications](#application) and [microservices](#microservice), and configuring tenant-level settings such as retention rules, custom properties, and [branding](#branding).

See also [Platform administration](/sector/platform_administration/) in the documentation.

{{< c8y-details title="Developer details" >}}
The Administration application utilizes various REST APIs for its functionality, such as the [User API](https://cumulocity.com/api/core/#tag/User-API) (`/user/...`) for users/roles, [Tenant API](https://cumulocity.com/api/core/#tag/Tenant-API) (`/tenant/...`) for tenant settings/options, and [Application API](https://cumulocity.com/api/core/#tag/Application-API) (`/application/...`) for application/microservice management. Many settings configured in the UI, such as branding and feature toggles, are stored as key-value pairs and can be managed via the [Tenant Options API](https://cumulocity.com/api/core/#tag/Options) (`/tenant/options`).
{{< /c8y-details >}}


### Alarm {#alarm}

An alarm indicates a condition that requires action from a user or system. Alarms have a lifecycle status (ACTIVE, ACKNOWLEDGED, CLEARED) and a severity (CRITICAL, MAJOR, MINOR, WARNING), and are explicitly tracked within the platform until they are resolved.

See also [Working with alarms](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms) in the documentation.

{{< c8y-details title="Developer details" >}}
Alarms are technically a specialized type of event, managed via the [Alarm API](https://cumulocity.com/api/core/#tag/Alarms) (/alarm/alarms). Key properties include type, text, time, status (ACTIVE, ACKNOWLEDGED, CLEARED), and severity (CRITICAL, MAJOR, MINOR, WARNING). Creating an alarm uses POST, and updating status uses PUT on `/alarm/alarms/{alarmId}`. SmartREST templates (for example, 301-304) simplify creation over MQTT/HTTP.
{{< /c8y-details >}}


### Analytics Builder {#analytics-builder}

Analytics Builder is a tool in the [{{< product-c8y-iot >}} Streaming Analytics](#streaming-analytics) application for designing real-time analytics models in a graphical, drag-and-drop environment. By combining pre-built [blocks](#block), you can quickly build [models](#model) to transform streaming IoT data, generate new data, create alerts, or trigger device [operations](#operation).  

See also [Analytics Builder](/streaming-analytics/analytics-builder/) in the documentation.

{{< c8y-details title="Developer details" >}}
Analytics Builder models are created in the user interface, not by API. Tenant options affecting the behaviour of Analytics Builder are listed in the Analytics Builder [Configuration](/streaming-analytics/analytics-builder/#configuration) documentation. You can use the [Analytics Builder Block SDK](https://github.com/Cumulocity-IoT/apama-analytics-builder-block-sdk) to write, test, and package custom blocks and to upload these blocks into Analytics Builder.
{{< /c8y-details >}}

### Apama {#apama}

Apama is the high-performance event processing engine that powers [{{< product-c8y-iot >}} Streaming Analytics](#streaming-analytics). It enables real-time analytics, forming the foundation for smart rules, [Analytics Builder´s](#analytics-builder) drag-and-drop models as well as custom [EPL apps](#epl-apps).

{{< c8y-details title="Developer details" >}}
EPL code running in the Apama engine interacts with {{< product-c8y-iot >}} using EPL APIs (for example, the `com.apama.cumulocity` package) to send and receive platform data. The deployment of EPL files (.mon) is managed via the Streaming Analytics UI or the [EPL Apps Tools](https://github.com/Cumulocity-IoT/apama-eplapps-tools). Diagnostics and monitoring are available via dedicated endpoints like `/service/cep/diagnostics` or using Prometheus as described in [Troubleshooting and diagnostics](/streaming-analytics/troubleshooting/#monitoring-rest).
{{< /c8y-details >}}

### Application {#application}

An application is a component integrated with the platform that delivers user interfaces (= [web application](#web-application)), business logic (= [microservice](#microservice)), or both, to enable, extend, or customize IoT solutions. Applications bridge device data with user workflows and business processes, supporting use cases such as remote monitoring, predictive maintenance, [asset](#asset) tracking, and smart automation. {{< product-c8y-iot >}}'s application enablement tools empower both business users and developers to build and deploy custom applications.

See also [Application enablement](/app-intro/applications/) in the documentation.

{{< c8y-details title="Developer details" >}}
Applications (web apps, microservices) are managed via the [Application API](https://cumulocity.com/api/core/#tag/Application-API) (`/application/applications`). This includes creating (POST), retrieving (GET), updating (PUT), deleting (DELETE), and copying (POST /clone). Application versions (`/application/applications/{id}/versions`) and binaries (`/application/applications/{id}/binaries`) also have dedicated endpoints.
{{< /c8y-details >}}


### Application availability {#application-availability}

Application availability defines how a custom application or [microservice](#microservice) can be shared and accessed. A superior tenant (that is, an [{{< enterprise-tenant >}}](#enterprise-tenant) or the [{{< management-tenant >}}](#management-tenant))) manages this availability to share applications with its [subtenants](#subtenant).

{{< c8y-details title="Developer details" >}}
Application availability is managed via the [Application API](https://cumulocity.com/api/core/#tag/Application-API) (/application/applications) and can be changed via a PUT request.
{{< /c8y-details >}}


### Application switcher {#application-switcher}

The application switcher is a UI component that shows all {{< product-c8y-iot >}} [applications](#application) the user has access to and allows switching between these applications.  

{{< c8y-details title="Developer details" >}}
The application switcher UI lists applications accessible to the user. This list is populated based on user permissions and tenant subscriptions, retrieved via `GET /application/applications?user={userId}`. The application manifest property `noAppSwitcher` (managed via the [Application API](https://cumulocity.com/api/core/#tag/Application-API)) can be used to hide an application from the switcher.
{{< /c8y-details >}}


### Asset {#asset}

An asset is the digital representation of a business object within the {{< product-c8y-iot >}} [inventory](#inventory), such as a machine, building, or vehicle. Technically, an asset is a [managed object](#managed-object) that can be structured into a logical hierarchy (the [asset hierarchy](#asset-hierarchy)) using child asset relationships. Assets can take several forms: simple [groups](#group) used for organization, [devices](#device) that send telemetry data, or complex custom assets defined by an [asset model](#asset-model) in the [Digital Twin Manager (DTM)](#dtm).  

See also [Digital Twin Manager](/dtm/dtm-introduction/) in the documentation.

{{< c8y-details title="Developer details" >}}
Assets are represented as managed objects in the [Inventory API](https://cumulocity.com/api/core/#tag/Inventory-API) (`/inventory/managedObjects`). They use the `childAssets` property and associated endpoints (`/inventory/managedObjects/{id}/childAssets`) for hierarchy management. Assets created via the the Digital Twin Manager application are enriched with custom fragments defined by their asset model.
{{< /c8y-details >}}


### Asset hierarchy {#asset-hierarchy}

An asset hierarchy is a structure within the [inventory](#inventory) that organizes [assets](#asset) (based on [asset models](#asset-model)) and [devices](#device) to reflect their logical or business relationships, such as a factory containing production lines, which in turn contain individual machines. The asset hierarchy is built by nesting assets with one another to form parent-child relationships ([child assets](#child-asset)). It is fundamentally distinct from the [communication hierarchy](#communication-hierarchy), which models the physical network topology ([child devices](#child-device)).

See also [Asset hierarchy](/dtm/asset-hierarchy/) in the documentation.

{{< c8y-details title="Developer details" >}}
The asset hierarchy is composed of managed objects linked via the [Inventory API](https://cumulocity.com/api/core/#tag/Inventory-API)'s child asset endpoints: `GET /inventory/managedObjects/{id}/childAssets`, `POST /inventory/managedObjects/{id}/childAssets`, and `DELETE /inventory/managedObjects/{id}/childAssets/{childId}`. The DTM application is supported by a dedicated dtm-ms microservice and API (for example, `/service/dtm-ms/...`) for managing the underlying asset models and properties.
{{< /c8y-details >}}


### Asset model {#asset-model}

An asset model is a reusable blueprint defined in the [Digital Twin Manager (DTM)](#dtm) that specifies the structure, properties, and relationships of a particular type of [asset](#asset). It includes a unique key and label, [asset properties](#asset-property), and optionally references to [child asset](#child-asset) models to support the composition of [asset hierarchies](#asset-hierarchy) (for example, a wind turbine model composed of rotor and tower sub-models). Once published, an asset model governs how assets of that type are created, validated, and visualized across {{< product-c8y-iot >}} [applications](#application).  

See also [Asset models](/dtm/asset-types/) in the documentation.

{{< c8y-details title="Developer details" >}}
Assets are represented as managed objects in the [Inventory API](https://cumulocity.com/api/core/#tag/Inventory-API) (`/inventory/managedObjects`). They use the child assets property and associated endpoints (`/inventory/managedObjects/{id}/childAssets`) for hierarchy management. Specific asset characteristics are defined using custom JSON fragments. See also [Asset definitions](https://cumulocity.com/api/dtm/#tag/Asset-Definitions).
{{< /c8y-details >}}


### Asset property {#asset-property}

Asset properties are configurable attributes within an [asset model](#asset-model) that define, describe, and enrich an [asset´s](#asset) characteristics (for example, *tower height* in a wind turbine model). They can be of various data types, such as text, number, date, file, boolean, complex object, or custom. Properties may be simple (single values), complex (nested structures), or custom (additional metadata), and they act as reusable building blocks to ensure consistent data structures, metadata enrichment, and governed information across assets.  



### Audit log {#audit-log}

An audit log is a record of a security-relevant action performed on the platform. Audit logs are a special type of [event](#event) that includes details about the [user](#user) who performed the action, the [application](#application) they used, the activity itself, and the severity. They provide a chronological and immutable trail of [operations](#operation) for security analysis and compliance auditing.  

See also [Audit logs](/standard-tenant/monitoring/#audit-logs) in the documentation.

{{< c8y-details title="Developer details" >}}
Audit logs are managed via the [Audit API](https://cumulocity.com/api/core/#tag/Audits
). Records can be created via `POST /audit/auditRecords` and retrieved via `GET /audit/auditRecords`, with filtering by user, type, application, and date range. Creating an audit record requires ROLE_AUDIT_ADMIN or AUDIT_ADMIN permission.
{{< /c8y-details >}}


### Authentication {#authentication}

Authentication is the process of verifying the identity of a [user](#user), [device](#device), or [application](#application) attempting to access the {{< product-c8y-iot >}} platform. {{< product-c8y-iot >}} supports multiple authentication methods, including basic authentication, OAI-Secure (an OAuth2-based implementation), and [Single sign-on (SSO)](#sso) integration with external identity providers.  

See also [Authentication](/authentication/basic-settings/) in the documentation.

{{< c8y-details title="Developer details" >}}
All available authentication methods are configured in the [Tenant API](https://cumulocity.com/api/core/#tag/Tenant-API) via the REST endpoints `PUT /tenant/loginOptions` (CREATE) and `POST /tenant/loginOptions/{typeOrId})` (UPDATE).
{{< /c8y-details >}}


### Authorization {#authorization}

Authorization is the process of determining whether an [authenticated](#authentication) identity ([user](#user), [device](#device), or [application](#application)) has the necessary [permissions](#permission) to access a specific resource or perform a particular action. Authorization in {{< product-c8y-iot >}} is managed through a [Role-Based Access Control (RBAC)](#rbac) model, in which permissions are bundled into [global roles](#global-role) and [inventory role](#inventory-role).  

{{< c8y-details title="Developer details" >}}
Authorization is enforced by the platform based on roles assigned to users. These roles and their associated permissions are defined and managed via the [User API](https://cumulocity.com/api/core/#tag/User-API) (`/user/roles`, `/user/inventoryroles`).
{{< /c8y-details >}}


### Availability {#availability}

Availability refers to the monitoring of the connection status of a [device](#device) to indicate whether it is ONLINE, OFFLINE, or its status is UNKNOWN. This status is determined by device communication patterns, such as the periodic sending of data or the maintenance of a push connection.

{{< c8y-details title="Developer details" >}}
The connection status is exposed via the `c8y_Connection` fragment within a device's managed object. The monitoring behavior is configured via the `c8y_RequiredAvailability` fragment, which specifies the required response interval in minutes.
{{< /c8y-details >}}
