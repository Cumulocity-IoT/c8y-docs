---
weight: 100
title: M
layout: bundle
sector:
  - getting_started
_build:
  render: false

---


### Maintenance release {#maintenance-release}

Maintenance releases are provided for supported [Yearly releases](#yearly-release) and contain important bug fixes but no new features, ensuring stability and security for long-term supported versions of the platform.


### Managed object {#managed-object}

Managed objects are the core building blocks of the {{< product-c8y-iot >}} [inventory](#inventory). A managed object is the primary digital record ([digital twin](#digital-twin)) used to represent entities such as [devices](#device), [assets](#asset), logical [groupings](#group), or [application](#application) components. Managed objects are used to model data sources (for example, an IoT sensor), and all related data, such as [events](#event), [alarms](#alarm), and [operations](#operation), linked to the managed object. When referred to as a “source managed object”, it denotes the managed object representing the origin of that data.  

{{< c8y-details title="Developer details" >}}
Managed objects are the core resource of the [Inventory API](https://cumulocity.com/api/core/#tag/Inventory-API) (`/inventory/managedObjects`). A minimal managed object requires a name and can include a type and other fragments, for example, `{"name": "MySensor", "type": "temp_sensor", "c8y_IsDevice": {}}`.
{{< /c8y-details >}}  


### {{< management-tenant >}} {#management-tenant}

The {{< management-tenant >}} builds the highest level in the {{< product-c8y-iot >}} 3-level [tenant hierarchy](#tenant-hierarchy), typically only available to the Operations team managing the {{< product-c8y-iot >}} instance. The {{< management-tenant >}} administers the entire platform deployment, including all [{{< enterprise-tenant >}}s](#enterprise-tenant), and holds exclusive platform-level administrative capabilities.  

{{< c8y-details title="Developer details" >}}
Access to the {{< management-tenant >}}'s full administrative API is typically restricted. It uses the same core APIs as the {{< enterprise-tenant >}} (for example, `/tenant/tenants`) but with elevated, platform-wide permissions.
{{< /c8y-details >}}  


### Measurement {#measurement}

A measurement is a time-stamped reading or statistic collected from a sensor or [device](#device) and linked to a source [managed object](#managed-object). Measurements are organized into one or more [fragments](#fragment) (for example, `c8y_TemperatureMeasurement`), each containing one or more series (for example, `T`) that hold a numeric value and a unit for specific observed properties.  

{{< c8y-details title="Developer details" >}}
Measurements are managed via the [Measurement API](https://cumulocity.com/api/core/#tag/Measurements
) (`/measurement/measurements`). They are created using POST and linked to a source managed object. The `X-Cumulocity-Processing-Mode` header can be used to create transient measurements.
{{< /c8y-details >}}


### Microfrontend {#microfrontend}

Microfrontend refers to an architectural style for [web applications](#web-application) where the UI is decomposed into smaller, independently deployable [applications](#application) or plugins. {{< product-c8y-iot >}}'s web UI is built on this architecture with the [Web SDK](#web-sdk), allowing a "shell" application (like [Cockpit](#cockpit-application)) to be extended by loading "remote" modules (plugins) from other web applications.

{{< c8y-details title="Developer details" >}}
Microfrontends (plugins) are packaged as standard web applications and uploaded as ZIP archives via the [Application API](https://cumulocity.com/api/core/#tag/Application-API) (`POST /application/applications/{id}/versions`). The *cumulocity.json* manifest must include `isPackage: true` and an exports section defining the available modules. Other applications can then import the microfrontend by referencing it in their application remotes section.
{{< /c8y-details >}}   


### Microservice {#microservice}

Microservices are server-side [applications](#application) that extend {{< product-c8y-iot >}}’s functionality, typically by implementing backend business logic or enabling integration with external systems. They are fully integrated into {{< product-c8y-iot >}}’s hosting, security, and API management, and can be designed to be highly available, scalable, and [multi-tenant](#multi-tenancy).

See also [Microservices](/microservice-sdk/) in the documentation.


### Microservice manifest {#microservice-manifest}

A microservice manifest is a required JSON file (*cumulocity.json*) included within a [microservice](#microservice) package. It provides the necessary metadata for the platform to manage the microservice's deployment, lifecycle, and integration.

See also [Microservice manifest](/microservice-sdk/general-aspects/#microservice-manifest) in the documentation.  


### Microservice SDK {#microservice-sdk}

The {{< product-c8y-iot >}} Microservice SDK is a set of tools, libraries, and documentation that helps developers build custom [microservices](#microservice) efficiently. For Java, {{< product-c8y-iot >}} provides a dedicated SDK with Spring Boot integration. The SDK streamlines development by offering built-in authentication against the platform and robust context management, enabling secure, [multi-tenant](#multi-tenancy)-aware [applications](#application). At the same time, microservices can be developed in any programming language, as long as they are packaged as Docker containers and comply with the platform’s requirements.


### Model (Analytics Builder) {#model}

In [Analytics Builder](#analytics-builder), a model is a visual representation of analytic logic created by connecting pre-built [blocks](#block) via [wires](#wire) in a drag-and-drop environment. Each block performs a specific function, and together they form a workflow that can transform, analyze, and act on incoming data. A model can be designed as a reusable template model, which uses placeholders instead of fixed values. When you provide specific values for these placeholders, you create a runnable model instance.  

{{< c8y-details title="Developer details" >}}
See [Analytics Builder](#analytics-builder).
{{< /c8y-details >}}  


### Multi-tenancy {#multi-tenancy}

Multi-tenancy is an architecture in which a single instance of a software application serves multiple customers ([tenants](#tenant)). In {{< product-c8y-iot >}}, each tenant has a physically separated data space. Data sharing between tenants is disabled by default and must be explicitly configured (for example, using the [data broker](#data-broker)).  

See also [Multi-tenancy](/concepts/tenant-hierarchy/#multi-tenancy) in the documentation. 
