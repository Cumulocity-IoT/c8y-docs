---
weight: 20
title: A
layout: bundle
sector:
  - getting_started
---

### **Administration application** {#administration-application}

The Administration application is a default Cumulocity application that serves as the central management console for platform administrators. It is used to govern a tenant by managing users, roles, and permissions, subscribing to and managing applications and microservices, and configuring tenant-level settings such as retention rules, custom properties, and branding.   

<small>

**Related terms:**  
[Application](#application), [Application switcher](#application-switcher), [Cockpit application](#cockpit-application), [Device Management application](#device-management-application), [Enterprise tenant](#enterprise-tenant), [Microservice](#microservice), [Permissions](#permissions), [Roles](#roles), [Standard tenant](#standard-tenant), [Subtenant](#subtenant), [Subscription](#subscription), [Tenant](#tenant), [Tenant options](#tenant-options), [User](#user), [User hierarchy](#user-hierarchy)  

</small>

&nbsp;

<small>

**API detailsTo review by R\&D:**  
The Administration application utilizes various REST APIs for its functions, primarily the User API (/user/...) for users/roles, Tenant API (/tenant/...) for tenant settings/options, and Application API (/application/...) for application/microservice management. Many settings configured in the UI, such as branding and feature toggles, are stored as key-value pairs and can be managed programmatically via the Tenant Options API (/tenant/options).  

</small>


### **Alarm** {#alarm}

An alarm is a specific type of event that indicates a situation requiring user or system intervention. Unlike general events, alarms have a lifecycle status (ACTIVE, ACKNOWLEDGED, CLEARED) and a severity (CRITICAL, MAJOR, MINOR, WARNING), and are explicitly tracked within the platform until they are resolved.  

<small>

**Related terms:**   
[Event](#event), [Managed object](#managed-object), [Operation](#operation), [Smart rules](#smart-rules), [Measurement](#measurement)  

</small>

&nbsp;

<small>

**API detailsTo review by R\&D:** Alarms are managed via the Alarm API (/alarm/alarms). Key properties include type, text, time, status (ACTIVE, ACKNOWLEDGED, CLEARED), and severity (CRITICAL, MAJOR, MINOR, WARNING). Creating an alarm uses POST, and updating status uses PUT on /alarm/alarms/{alarmId}. SmartREST templates (for example, 301-304) simplify creation over MQTT/HTTP.  

</small>

### **Analytics Builder** {#analytics-builder}

A tool in the Streaming Analytics application for designing real-time analytics models in a graphical, drag-and-drop environment. By combining pre-built blocks, you can quickly build models to transform streaming IoT data, generate new data, create alerts, or trigger device operations.  

<small>

**Related terms:**   
[Application](#application), [Blocks](#blocks), [Cumulocity Streaming Analytics](#cumulocity-streaming-analytics), [Model (Analytics Builder)](#model-analytics-builder), [Microservice](#microservice)  

</small>

&nbsp;

<small>

**API detailsTo review by R\&D:** Models created in Analytics Builder are stored as managed objects (/inventory/managedObjects). Tenant options affecting behaviour are configured via POST /tenant/options (category streaminganalytics). Custom blocks are managed via the Analytics Builder Block SDK and potentially related APIs. Monitoring uses Apama REST APIs and status reporting configured via /tenant/options.  

</small>

### **Apama** {#apama}

Apama is the high-performance event processing engine that powers Cumulocity Streaming Analytics. It enables real-time data processing behind the scenes, forming the foundation for Smart Rules, Analytics Builder’s drag-and-drop models as well as custom EPL apps.

<small>

**Related terms:**   
[Cumulocity Streaming Analytics](#cumulocity-streaming-analytics), [Analytics Builder](#analytics-builder), [Event Processing Language (EPL)](#event-processing-language-epl), [EPL apps](#epl-apps), [Real-time processing](#real-time-processing)  

</small>

&nbsp;

<small>

**API detailsTo review by R\&D:** EPL code running in the Apama engine interacts with Cumulocity using specific Apama EPL APIs (for example, the com.apama.cumulocity package) to send and receive platform data. The deployment of EPL files (.mon) is managed via the Streaming Analytics UI, which uses the CEP management API (/cep/...) under the hood. Diagnostics and monitoring are available via dedicated endpoints like /
service/cep/diagnostics.  

</small>

### **Application** {#application}

An application is a component integrated with the platform that delivers user interfaces (= [web application](#web-applications)), business logic (= [microservice](#microservice)), or both, to enable, extend, or customize IoT solutions. Applications bridge device data with user workflows and business processes, supporting use cases such as remote monitoring, predictive maintenance, asset tracking, and smart automation. Cumulocity's application enablement tools empower both business users and developers to build and deploy custom applications.

For more details, see https://cumulocity.com/docs/app-intro/applications/

<small>

**Related terms:**   
[Administration application](#administration-application), [Application switcher](#application-switcher), [Cockpit application](#cockpit-application), [Device Management application](#device-management-application), [Microservice](#microservice), [Subscription](#subscription), [Tenant](#tenant), [User](#user), [Web applications](#web-applications)  

</small>

&nbsp;

<small>

**API detailsTo review by R\&D:** Applications (web apps, microservices) are managed via the Application API (/application/applications). This includes creating (POST), retrieving (GET), updating (PUT), deleting (DELETE), and copying (POST /clone). Application versions (/application/applications/{id}/versions) and binaries (/application/applications/{id}/binaries) also have dedicated endpoints.  

</small>

### **Application switcher** {#application-switcher}

The application switcher is a UI component that shows all Cumulocity applications the user has access to and allows switching between these applications.  

<small>

**Related terms:**   
[Application](#application), [Administration application](#administration-application), [Cockpit application](#cockpit-application), [Device Management application](#device-management-application), [User](#user)  

</small>

&nbsp;

<small>

**API detailsTo review by R\&D:** The Application Switcher UI lists applications accessible to the user. This list is populated based on user permissions and tenant subscriptions, retrieved via GET /application/applications?user={userId}. The application manifest property noAppSwitcher (managed via the Application API) can be used to hide an application from the switcher.  

</small>

### **Asset** {#asset}

An asset is the digital representation of a business object within the Cumulocity inventory, such as a machine, building, or vehicle. Technically, an asset is a managedObject that can be structured into a logical hierarchy (the asset hierarchy) using child asset relationships. Assets can take several forms: simple groups used for organization, devices that send telemetry data, or complex custom assets defined by an asset model in the Digital Twin Manager (DTM).  

<small>

**Related terms:**   
[Asset hierarchy](#asset-hierarchy), [Asset model](#asset-model), [Asset properties](#asset-properties), [Device](#device), [Digital twin](#digital-twin), [Digital Twin Manager (DTM)](#digital-twin-manager-dtm), [Group](#group), [Inventory](#inventory), [Managed object](#managed-object)  

</small>

&nbsp;

<small>

**API detailsTo review by R\&D:** Assets are represented as managedObject in the Inventory API (/inventory/managedObjects). They use the childAssets property and associated endpoints (/inventory/managedObjects/{id}/childAssets) for hierarchy management. Assets created via the DTM are enriched with custom fragments defined by their asset model. Bulk creation is possible via /dtm/assets.  

</small>

### **Asset hierarchy** {#asset-hierarchy}

An asset hierarchy is a structure within the inventory that organizes assets (based on asset models) and devices to reflect their logical or business relationships, such as a factory containing production lines, which in turn contain individual machines. The asset hierarchy is built by nesting assets with one another to form parent-child relationships.It is fundamentally distinct from the communication hierarchy, which models the physical network topology (childDevices).  

<small>

**Related terms:**   
[Asset](#asset), [Digital Twin Manager (DTM)](#digital-twin-manager-dtm), [Asset model](#asset-model), [Child assets](#child-assets), [Child devices](#child-devices), [Communication hierarchy](#communication-hierarchy)  

</small>

&nbsp;

<the>

**API detailsTo review by R\&D:** The hierarchy is composed of managedObjects linked via the Inventory API's child asset endpoints: GET /inventory/managedObjects/{id}/childAssets, POST /inventory/managedObjects/{id}/childAssets, and DELETE /inventory/managedObjects/{id}/childAssets/{childId}. The DTM application is supported by a dedicated dtm-ms microservice and API (for example, /service/dtm-ms/...) for managing 
the underlying asset models and properties.  

</small>

### **Asset model** {#asset-model}

An asset model is a reusable blueprint defined in the Digital Twin Manager (DTM) that specifies the structure, properties, and relationships of a particular type of asset. It includes a unique key and label, asset properties, and optionally references to child asset models to support hierarchical composition (for example, a wind turbine model composed of rotor and tower sub-models). Once published, an asset model governs how assets of that type are created, validated, and visualized across Cumulocity applications.  

<small>

**Related terms:**   
[Asset](#asset), [Asset properties](#asset-properties), [Digital Twin Manager (DTM)](#digital-twin-manager-dtm), [Asset hierarchy](#asset-hierarchy)  

</small>

&nbsp;

<small>

**API detailsTo review by R\&D:** Assets are represented as managed objects (managedObject) in the Inventory API (/inventory/managedObjects). They use the childAssets property and associated endpoints (/inventory/managedObjects/{id}/childAssets) for hierarchy management. Specific asset characteristics are defined using custom JSON fragments. Bulk creation is possible via /dtm/assets.  

</small>

### **Asset properties** {#asset-properties}

(to revisit once new library is final, as data types might change)

Asset properties are configurable attributes within an asset model that define, describe, and enrich an asset’s characteristics (for example, *tower height* in a *wind turbine* model). They can be of various data types, such as text, number, date, file, boolean, complex object, or custom. Properties may be simple (single values), complex (nested structures), or custom (additional metadata), and they act as reusable building blocks to ensure consistent data structures, metadata enrichment, and governed information across assets.  

<small>

**Related terms:**   
[Asset model](#asset-model), [Digital Twin Manager (DTM)](#digital-twin-manager-dtm)  

</small>

&nbsp;

<small>

**API detailsTo review by R\&D:** Asset properties are managed via a dedicated DTM API (for example, /api/dtm/assetproperties) and stored as definitions accessible to the dtm-ms microservice. When an asset is created from a model, these properties are instantiated as custom fragments within the asset's managedObject.  

</small>

### **Audit log** {#audit-log}

An audit log is a record of a security-relevant action performed on the platform. Audit logs are a special type of event that includes details about the user who performed the action, the application they used, the activity itself, and the severity. They provide a chronological and immutable trail of operations for security analysis and compliance auditing.  

<small>

**Related terms:**   
[Event](#event), [User](#user), [Application](#application)  

</small>

&nbsp;

<small>

**API detailsTo review by R\&D:** Audit logs are managed via the Audit API. Records can be created via POST /audit/auditRecords and retrieved via GET /audit/auditRecords, with filtering by user, type, application, and date range. Creating an audit record requires ROLE\_AUDIT\_ADMIN or AUDIT\_ADMIN permission.  

</small>

### **Authentication** {#authentication}

The process of verifying the identity of a user, device, or application attempting to access the Cumulocity platform. Cumulocity supports multiple authentication methods, including Basic Authentication, OAI-Secure (an OAuth2-based implementation), and Single Sign-On (SSO) integration with external identity providers.  

<small>

**Related terms:**   
[Authorization](#authorization), [SSO](#sso), [User](#user), [Service user](#service-user)  

</small>

&nbsp;

<small>

**API detailsTo review by R\&D:** Authentication is managed through various mechanisms. Basic Authentication uses standard HTTP headers. OAI-Secure follows the OAuth2 flow. SSO configuration is managed via the Tenant Options API (/tenant/options) 
under the auth category.  

</small>

### **Authorization** {#authorization}

The process of determining whether an authenticated identity (user, device, or application) has the necessary permissions to access a specific resource or perform a particular action. Authorization in Cumulocity is managed through a Role-Based Access Control (RBAC) model, in which permissions are bundled into global roles and inventory roles.  

<small>

**Related terms:**   
[Authentication](#authentication), [Permissions](#permissions), [Roles](#roles), [RBAC](#rbac)  

</small>

&nbsp;

<small>

**API detailsTo review by R\&D:** Authorization is enforced by the platform based on roles assigned to users. These roles and their associated permissions are defined and 
managed via the User API (/user/roles, /user/inventoryroles).  

</small>

### **Availability** {#availability}

A feature that monitors the connection status of a device to indicate whether it is ONLINE, OFFLINE, or its status is UNKNOWN. This status is determined by device communication patterns, such as the periodic sending of data or the maintenance of a push connection, and can be configured with a required interval using the c8y\_RequiredAvailability fragment.  

<small>

**Related terms:**   
[Connection monitoring](#connection-monitoring), [Device](#device)  

</small>

&nbsp;

<small>

**API detailsTo review by R\&D:** The connection status is exposed via the c8y\_Connection fragment within a device's managedObject. The monitoring behavior is configured via the c8y\_RequiredAvailability fragment, which specifies the required response interval in minutes.  

</small>
