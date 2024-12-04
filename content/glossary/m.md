---
weight: 100
title: M
layout: bundle
sector:
  - getting_started
---

### Maintenance release {#maintenance-release}

{{< company-c8y >}} provides Maintenance releases for supported {{< product-c8y-iot >}} [Yearly releases](/glossary/y/#yearly-release). A Maintenance release contains fixes for a Yearly release but no new features.


### Managed objects {#managed-objects}

In {{< product-c8y-iot >}}, all [assets](/glossary/a/#asset) are represented as managed objects. {{< product-c8y-iot >}} comes with a predefined set of types, for example [devices](/glossary/d/#device), groups, and [agents](/glossary/a/#agent).

Hierarchical structures of managed objects allow for the implementation of complex structures like a factory with many machines which consist of devices and sensors which can report [events](/glossary/e/#event), [alarms](/glossary/a/#alarm), and [measurements](#measurement).


### {{< management-tenant >}} {#management-tenant}

A tenant type in the [{{< product-c8y-iot >}} tenant hierarchy](/glossary/t/#tenant-hierarchy).

The {{< management-tenant >}} builds the highest level of the tenant hierarchy.
Every {{< product-c8y-iot >}} deployment is delivered with a {{< management-tenant >}}. The {{< management-tenant >}} is used to administer all tenants within the same deployment on platform level and thus provides full control of the platform.

See also [{{< standard-tenant >}}](/glossary/s/#standard-tenant) and [{{< enterprise-tenant >}}](/glossary/e/#enterprise-tenant).


### Measurement {#measurement}

A measurement contains one or multiple numerical values taken at a single point in time for a single asset. A sequence of measurements forms a time series.


### Microservices {#microservices}

Microservices are server-side applications. Microservices can be used to develop for example the following functionality on top of {{< product-c8y-iot >}}:

* Integrations
* Batch analytics
* Decoder
* Backend applications

Microservices are deployed as Container images to {{< product-c8y-iot >}}, and follow specific conventions. They typically provide one REST API, which is available under /service/<microservice-name> and access {{< product-c8y-iot >}} using this REST API.

For details see [Getting started > Technical concepts > Developing applications > Microservices](/concepts/applications/#microservices).


### Model {#model}

Used in the context of [Analytics Builder](/glossary/a/#analytics-builder).

A model is a container which can have a network of [blocks](/glossary/b/#blocks) connected to each other with wires.
The behavior of a block inside a model does not depend on other blocks. There can be multiple instances of the same block in a model where each instance may behave differently, depending on the configurable parameters or the inputs connected to the block.


### MQTT {#mqtt}

{{< product-c8y-iot >}} supports MQTT, an OASIS standard messaging protocol, for device integration.

For details see [Device management & connectivity > Device integration > Device integration using MQTT](/device-integration/mqtt).


### Multi-tenancy {#multi-tenancy}

With the {{< enterprise-tenant >}} concept, {{< product-c8y-iot >}} supports full multi-tenancy. All data related to a tenant is stored in a dedicated database. This includes user data, inventory, events, measurements, operations and alarms.

For details see [Getting started > Technical concepts > Tenant hierarchy > Multi-tenancy](/concepts/tenant-hierarchy/#multi-tenancy).
