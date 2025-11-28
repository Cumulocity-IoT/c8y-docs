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

The Administration application is a default {{< product-c8y-iot >}} application that serves as the central management console for platform administrators. It is used to govern a [tenant](#tenant) by managing [users](#user), roles, and [permissions](#permission), subscribing to and managing [applications](#application) and [microservices](#microservice), and configuring tenant-level settings such as retention rules, custom properties, and [branding](#branding).   


### Alarm {#alarm}

An alarm is a specific type of [event](#event) that indicates a situation requiring user or system intervention. Unlike general events, alarms have a lifecycle status (ACTIVE, ACKNOWLEDGED, CLEARED) and a severity (CRITICAL, MAJOR, MINOR, WARNING), and are explicitly tracked within the platform until they are resolved.  


### Analytics Builder {#analytics-builder}

Analytics Builder is a tool in the [{{< product-c8y-iot >}} Streaming Analytics](#streaming-analytics) application for designing real-time analytics models in a graphical, drag-and-drop environment. By combining pre-built [blocks](#block), you can quickly build [models](#model) to transform streaming IoT data, generate new data, create alerts, or trigger device [operations](#operation).  

For details, see the [Analytics Builder](/streaming-analytics/analytics-builder/) documentation.


### Apama {#apama}

Apama is the high-performance event processing engine that powers [{{< product-c8y-iot >}} Streaming Analytics](#streaming-analytics). It enables real-time analytics, forming the foundation for smart rules, [Analytics Builder´s](#analytics-builder) drag-and-drop models as well as custom [EPL apps](#epl-apps).


### Application {#application}

An application is a component integrated with the platform that delivers user interfaces (= [web application](#web-application)), business logic (= [microservice](#microservice)), or both, to enable, extend, or customize IoT solutions. Applications bridge device data with user workflows and business processes, supporting use cases such as remote monitoring, predictive maintenance, [asset](#asset) tracking, and smart automation. {{< product-c8y-iot >}}'s application enablement tools empower both business users and developers to build and deploy custom applications.

For details, see [Application enablement](/app-intro/applications/) in the documentation.


### Application switcher {#application-switcher}

The application switcher is a UI component that shows all {{< product-c8y-iot >}} [applications](#application) the user has access to and allows switching between these applications.  


### Asset {#asset}

An asset is the digital representation of a business object within the {{< product-c8y-iot >}} [inventory](#inventory), such as a machine, building, or vehicle. Technically, an asset is a [managed object](#managed-object) that can be structured into a logical hierarchy (the [asset hierarchy](#asset-hierarchy)) using child asset relationships. Assets can take several forms: simple [groups](#group) used for organization, [devices](#device) that send telemetry data, or complex custom assets defined by an [asset model](#asset-model) in the [Digital Twin Manager (DTM)](#dtm).  


### Asset hierarchy {#asset-hierarchy}

An asset hierarchy is a structure within the [inventory](#inventory) that organizes [assets](#asset) (based on [asset models](#asset-model)) and [devices](#device) to reflect their logical or business relationships, such as a factory containing production lines, which in turn contain individual machines. The asset hierarchy is built by nesting assets with one another to form parent-child relationships ([child assets](#child-asset)). It is fundamentally distinct from the [communication hierarchy](#communication-hierarchy), which models the physical network topology ([child devices](#child-device)).  


### Asset model {#asset-model}

An asset model is a reusable blueprint defined in the [Digital Twin Manager (DTM)](#dtm) that specifies the structure, properties, and relationships of a particular type of [asset](#asset). It includes a unique key and label, [asset properties](#asset-property), and optionally references to [child asset](#child-asset) models to support the composition of [asset hierarchies](#asset-hierarchy) (for example, a wind turbine model composed of rotor and tower sub-models). Once published, an asset model governs how assets of that type are created, validated, and visualized across {{< product-c8y-iot >}} [applications](#application).  


### Asset property {#asset-property}

Asset properties are configurable attributes within an [asset model](#asset-model) that define, describe, and enrich an [asset´s](#asset) characteristics (for example, *tower height* in a wind turbine model). They can be of various data types, such as text, number, date, file, boolean, complex object, or custom. Properties may be simple (single values), complex (nested structures), or custom (additional metadata), and they act as reusable building blocks to ensure consistent data structures, metadata enrichment, and governed information across assets.  


### Audit log {#audit-log}

An audit log is a record of a security-relevant action performed on the platform. Audit logs are a special type of [event](#event) that includes details about the [user](#user) who performed the action, the [application](#application) they used, the activity itself, and the severity. They provide a chronological and immutable trail of [operations](#operation) for security analysis and compliance auditing.  


### Authentication {#authentication}

Authentication is the process of verifying the identity of a [user](#user), [device](#device), or [application](#application) attempting to access the {{< product-c8y-iot >}} platform. {{< product-c8y-iot >}} supports multiple authentication methods, including basic authentication, OAI-Secure (an OAuth2-based implementation), and [Single sign-on (SSO)](#sso) integration with external identity providers.  


### Authorization {#authorization}

Authorization is the process of determining whether an [authenticated](#authentication) identity ([user](#user), [device](#device), or [application](#application)) has the necessary [permissions](#permission) to access a specific resource or perform a particular action. Authorization in {{< product-c8y-iot >}} is managed through a [Role-Based Access Control (RBAC)](#rbac) model, in which permissions are bundled into [global roles](#global-role) and [inventory role](#inventory-role).  


### Availability {#availability}

Availability refers to the monitoring of the connection status of a [device](#device) to indicate whether it is ONLINE, OFFLINE, or its status is UNKNOWN. This status is determined by device communication patterns, such as the periodic sending of data or the maintenance of a push connection, and can be configured with a required interval using the `c8y\_RequiredAvailability` fragment.
