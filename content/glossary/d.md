---
weight: 50
title: D
layout: bundle
sector:
  - getting_started
build:
  render: false

---

### Dashboard {#dashboard}

Dashboards are customizable views within [applications](#application) like the [Cockpit application](#cockpit-application), composed of various [widgets](#widget), used to visualize data, monitor [assets](#asset), and potentially trigger actions.

See also [Working with dashboards](/cockpit/working-with-dashboards/) in the documentation.  

{{< c8y-details title="Developer details" >}}
Dashboards are stored as managed objects in the Inventory, with a `c8y_Dashboard` fragment. Their configuration, including layout and widget settings, is stored as a complex JSON object within this managed object. Dashboards are created and updated via the [Inventory API](https://cumulocity.com/api/core/#tag/Inventory-API) (`POST /inventory/managedObjects` and `PUT /inventory/managedObjects/{id}`).
{{< /c8y-details >}}

### Data broker {#data-broker}

The data broker functionality is an optional feature in {{< enterprise-tenant >}}s which lets you share data selectively with other [tenants](#tenant).

See also [Data broker](/data-broker/) in the documentation.

{{< c8y-details title="Developer details" >}}
Configuration of broker connections is done using the Administration application. The underlying REST APIs are internal to the feature-broker application and are not part of the public API set. The messaging-based broker is used if the databroker-agent-server microservice is subscribed to the tenant. Otherwise, the original in-memory implementation is still used.
{{< /c8y-details >}}


### Data explorer {#data-explorer}

The data explorer is a visualization tool for exploring, comparing, and analyzing IoT data, such as [measurements](#measurement), [alarms](#alarm), and [events](#event), from specific [assets](#asset) or across all assets.  

See also [Data explorer](/cockpit/data-explorer/) in the documentation.

{{< c8y-details title="Developer details" >}}
The data explorer UI component uses the [Measurement API](https://cumulocity.com/api/core/#tag/Measurements
) (`/measurement/measurements` and `/measurement/measurements/series`) to fetch and visualize data.
{{< /c8y-details >}}

### Data lake {#data-lake}

Data lakes are used in the context of [{{< product-c8y-iot >}} DataHub](#datahub). A data lake serves as a storage container for offloaded data, for example, ADLS Gen2/Azure Storage (Azure), S3 (Amazon), or a NAS.  

{{< c8y-details title="Developer details" >}}
The data lake is an external storage which can only be accessed through the DataHub application and Dremio, and not via API.
{{< /c8y-details >}}

### Data point {#data-point}

A data point is a configuration that defines how a specific [measurement](#measurement) time series is visualized in UI views like the [data explorer](#data-explorer) and [dashboards](#dashboard). Data points define how a measurement stream is displayed, including its label, color, unit, and threshold ranges. These settings can be customized in the UI or templated in the [data point library](#data-point-library).  

{{< c8y-details title="Developer details" >}}
A data point is a UI concept and has no direct API. The underlying data is retrieved via the [Measurement API](https://cumulocity.com/api/core/#tag/Measurements
) (`GET /measurement/measurements/series`). Visualization properties are stored within a dashboard's managed object configuration or in the data point library.
{{< /c8y-details >}}


### Data point library {#data-point-library}

The data point library provides a collection of templates used to standardize the visualization of measurement data across your account. Each template targets a specific [measurement](#measurement), identified by its [fragment](#fragment) and series, and defines its visual properties (such as label, color, unit, threshold ranges). This ensures that all matching time series from any [device](#device) are displayed consistently.

See also [Data point library](/cockpit/data-point-library/) in the documentation.  

{{< c8y-details title="Developer details" >}}
The data point library is managed via the Cockpit UI. The entries are stored in the [Inventory API](https://cumulocity.com/api/core/#tag/Inventory-API) with a fragment called `c8y_Kpi`.
{{< /c8y-details >}}

### Data Preparation {#data-preparation}

Data Preparation is a {{< product-c8y-iot >}} component that processes inbound device messages before they enter the platform's operational store. It is used to decode device payloads from any transport, map them to {{< product-c8y-iot >}} domain objects, enrich or filter them, and send the result into the platform. Data Preparation is built around [Data Preparation rules](#data-preparation-rule), each of which carries a [smart function](#smart-function) that performs the actual processing.

See also [Data Preparation](/data-preparation/) in the documentation.

### Data Preparation rule {#data-preparation-rule}

A Data Preparation rule is a configurable pipeline that selects a subset of inbound device traffic and processes it through a [smart function](#smart-function) to produce {{< product-c8y-iot >}} domain objects such as [measurements](#measurement), [events](#event), [alarms](#alarm), or [operations](#operation). Each rule comprises exactly one smart function, which performs all transformation, enrichment, and mapping.

See also [Data Preparation](/data-preparation/) in the documentation.

### Device {#device}

A device is a special type of [asset](#asset) that represents a physical piece of equipment connected to the {{< product-c8y-iot >}} platform. Devices are distinct from other assets because they can send data and can receive remote operations.

{{< c8y-details title="Developer details" >}}
In the inventory, devices are represented as managed objects (/inventory/managedObjects), marked with the `c8y_IsDevice` fragment. The identity is managed via the [Identity API](https://{{< domain-c8y >}}/api/core/#tag/Identity-API) (`/identity/externalIds`), operations via the [Device Control API](https://cumulocity.com/api/core/#tag/Device-control-API) (`/devicecontrol/operations`), and data sent/received via the [Measurement API](https://cumulocity.com/api/core/#tag/Measurements) (`/measurement/measurements`), [Event API](https://cumulocity.com/api/core/#tag/Events), and [Alarm API](https://cumulocity.com/api/core/#tag/Alarms).
{{< /c8y-details >}}


### Device agent {#device-agent}

Device agents are software components that translate a device-specific communication [protocol](#device-protocol) into the standard {{< product-c8y-iot >}} REST or MQTT-based protocol, enabling secure, bi-directional communication. Device agents can be deployed on the [device](#device) itself (for example, on a gateway) or run as server-side [microservices](#microservice) within the {{< product-c8y-iot >}} platform.  

{{< c8y-details title="Developer details" >}}
In the inventory, agents are represented as managed object, marked with the `com_cumulocity_model_Agent` fragment (`/inventory/managedObjects`). They interact heavily with the Device Control API (`/devicecontrol/operations`) to receive and update operations for themselves and their child devices, often using real-time notifications (`/cep/realtime`).
{{< /c8y-details >}}

### Device Management application {#device-management-application}

The Device Management application is one of the default [applications](#application) of {{< product-c8y-iot >}}. It provides functionalities for connecting, managing and monitoring [devices](#device) and allows to control and troubleshoot devices remotely.

See also [Device Management application](/device-management-application/) in the documentation.

{{< c8y-details title="Developer details" >}}
The Device Management UI utilizes core REST APIs: [Inventory](https://cumulocity.com/api/core/#tag/Inventory-API) (`/inventory/managedObjects`), [Identity](https://cumulocity.com/api/core/#tag/Identity-API) (`/identity/externalIds`), [Device Control](https://cumulocity.com/api/core/#tag/Device-control-API) (`/devicecontrol/operations`), and data APIs (Measurement/Event/Alarm).
{{< /c8y-details >}}


### Device protocol {#device-protocol}

A device protocol defines how data from a specific device type is transferred into the {{< product-c8y-iot >}} platform and translated into the {{< product-c8y-iot >}} data model.  

{{< c8y-details title="Developer details" >}}
Standard protocols (REST, MQTT) follow documented patterns. Custom protocols may involve creating specific managed objects via the [Inventory API](https://cumulocity.com/api/core/#tag/Inventory-API) or dedicated microservice APIs.
{{< /c8y-details >}}


### Device replacement {#device-replacement}

The device replacement feature allows the replacement of physical devices without losing the historical data associated with the original [device](#device).  

{{< c8y-details title="Developer details" >}}
The  device replacement process is centered around the [Identity API](https://{{< domain-c8y >}}/api/core/#tag/Identity-API) (`/identity/externalIds`). It involves re-mapping the external identifiers from the old device to the new one while keeping the same managed object ID in the inventory.
{{< /c8y-details >}}


### Digital twin {#digital-twin}

A digital twin is a virtual representation of a physical asset or system that is continuously updated with real-time IoT data from connected [devices](#device). This data-driven digital counterpart enables monitoring, analysis, and optimization of physical assets by combining sensor [measurements](#measurement) with business context.  


### Digital Twin Manager (DTM) {#dtm}

The Digital Twin Manager (DTM) is a schema-based modeling [application](#application) in {{< product-c8y-iot >}} that enables users to create and manage data model schemas, which serve as blueprints for modeling [assets](#asset), [properties](#asset-property), and other [managed objects](#managed-object), acting as reusable templates within the platform.

See also [Digital Twin Manager](/dtm/) in the documentation.

{{< c8y-details title="Developer details" >}}
The DTM application is supported by a dedicated dtm microservice and a dedicated API (`/service/dtm/`) to manage the lifecycle of asset models, asset properties, and asset instances.
{{< /c8y-details >}}


### Document {#document}

{{< product-c8y-iot >}} stores all operational data, such as [managed objects](#managed-object), [alarms](#alarm), and [measurements](#measurement), as documents. Documents are the fundamental JSON structures used in {{< product-c8y-iot >}} [REST APIs](#rest-api).

{{< c8y-details title="Developer details" >}}
A document is a versatile JSON structure with a unique identifier, allowing it to be referenced in URLs of web applications or REST APIs. All major platform entities are represented as JSON documents manipulated via specific API endpoints.
{{< /c8y-details >}}


### Domain model {#domain-model}

The domain model is the conceptual framework that defines how {{< product-c8y-iot >}} structures, represents, and relates different types of information ([inventory](#inventory), [measurements](#measurement), [events](#event), [operations](#operation)). Data is organized as modular [fragments](#fragment) within JSON documents, allowing flexible extension and customization.  

See also [{{< product-c8y-iot >}}'s domain model](/concepts/domain-model/) in the documentation.

{{< c8y-details title="Developer details" >}}
The domain model is implemented and exposed through the core REST APIs ([Inventory](https://cumulocity.com/api/core/#tag/Inventory-API), [Measurement](https://cumulocity.com/api/core/#tag/Measurement-API), [Event](https://cumulocity.com/api/core/#tag/Event-API), [Alarm](https://cumulocity.com/api/core/#tag/Alarm-API)). Data is organized as modular fragments within JSON documents, allowing flexible extension and customization.
{{< /c8y-details >}}
