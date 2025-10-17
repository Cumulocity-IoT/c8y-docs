---
weight: 50
title: D
layout: bundle
sector:
  - getting_started
_build:
  render: false

---

### Dashboard {#dashboard}

Dashboards are customizable views within [applications](#application) like the [Cockpit application](#cockpit-application), composed of various [widgets](#widget), used to visualize data, monitor [assets](#asset), and potentially trigger actions.   


### Data broker {#data-broker}

The data broker functionality is an optional feature in {{< enterprise-tenant >}}s which lets you share data selectively with other [tenants](#tenant).  


### Data explorer {#data-explorer}

The data explorer is a visualization tool for exploring, comparing, and analyzing IoT data, such as [measurements](#measurement), [alarms](#alarm), and [events](#event), from specific [assets](#asset) or across all assets.  


### Data lake {#data-lake}

Data lakes are used in the context of [{{< product-c8y-iot >}} DataHub](#datahub). A data lake serves as a storage container for offloaded data, for example, ADLS Gen2/Azure Storage (Azure), S3 (Amazon), or a NAS.  


### Data point {#data-point}

A data point is a configuration that defines how a specific [measurement](#measurement) time series is visualized in UI views like the [data explorer](#data-explorer) and [dashboards](#dashboard). Data points define how a measurement stream is displayed, including its label, color, unit, and threshold ranges. These settings can be customized in the UI or templated in the [data point library](#data-point-library).  


### Data point library {#data-point-library}

The data point library provides a collection of templates used to standardize the visualization of measurement data across your account. Each template targets a specific [measurement](#measurement), identified by its [fragment](#fragment) and series, and defines its visual properties (such as label, color, unit, threshold ranges). This ensures that all matching time series from any [device](#device) are displayed consistently.   


### Device {#device}

A device is a special type of [asset](#asset) that represents a physical piece of equipment connected to the {{< product-c8y-iot >}} platform. In the [inventory](#inventory), a device is represented as a [managed object](#managed-object) that is marked with the `c8y\_IsDevice` fragment, distinguishing it as an entity that can send data and receive [operations](#operation).  


### Device agent {#device-agent}

Device agents are software components that translate a device-specific communication [protocol](#device-protocol) into the standard {{< product-c8y-iot >}} REST or MQTT-based protocol, enabling secure, bi-directional communication. Device agents can be deployed on the [device](#device) itself (for example, on a gateway) or run as server-side [microservices](#microservice) within the {{< product-c8y-iot >}} platform.  


### Device Management application {#device-management-application}

The Device Management application is one of the default [applications](#application) of {{< product-c8y-iot >}}. It provides functionalities for connecting, managing and monitoring [devices](#device) and allows to control and troubleshoot devices remotely.

For details see [Device Management application](/device-management-application/) in the documentation.


### Device protocol {#device-protocol}

A device protocol defines how data from a specific device type is transferred into the {{< product-c8y-iot >}} platform and translated into the {{< product-c8y-iot >}} data model.  


### Device replacement {#device-replacement}

The device replacement feature allows the replacement of physical devices without losing the historical data associated with the original [device](#device).  


### Digital twin {#digital-twin}

A digital twin is a virtual representation of a physical [asset](#asset) or system that is continuously updated with real-time IoT data from connected [devices](#device). This data-driven digital counterpart enables monitoring, analysis, and optimization of physical assets by combining sensor [measurements](#measurement) with business context.  


### Digital Twin Manager (DTM) {#dtm}

The Digital Twin Manager (DTM) is a schema-based modeling [application](#application) in {{< product-c8y-iot >}} that enables users to create and manage data model schemas, which serve as blueprints for modeling [assets](#asset), [properties](#asset-property), and other [managed objects](#managed-object), acting as reusable templates within the platform.  


### Document {#document}

{{< product-c8y-iot >}} stores all operational data, such as [managed objects](#managed-object), [alarms](#alarm), and [measurements](#measurement), as documents. A document is a versatile JSON structure with a unique identifier, allowing it to be referenced in URLs of [web applications](#web-application) or [REST APIs](#rest-api).  


### Domain model {#domain-model}

The domain model is the conceptual framework that defines how {{< product-c8y-iot >}} structures, represents, and relates different types of information ([inventory](#inventory), [measurements](#measurement), [events](#event), [operations](#operation)). Data is organized as modular [fragments](#fragment) within JSON documents, allowing flexible extension and customization.  
