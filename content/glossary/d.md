---
weight: 50
title: D
layout: bundle
sector:
  - getting_started
---



### Data lake {#data-lake}

Used in the context of [DataHub](/glossary/c/#datahub).

A data lake serves as a storage container for offloaded data either on the basis of ADLS Gen2/Azure Storage (Azure), S3 (Amazon), NAS.


### Data point library {#data-point-library}

The Data point library provides a collection of data points with default values for data point properties which serve as templates that can be applied easily to your data points from different devices.

For details see [Application enablement & solutions > Cockpit > Data point library](/cockpit/data-point-library).


### Device {#device}

Devices are a special type of [asset](/glossary/a/#asset). They can constitute a hierarchy of devices. In the {{< product-c8y-iot >}} [inventory](/glossary/i/#inventory) their [digital twins](#digital-twin) are represented as [managed objects](/glossary/m/#managed-objects).


### Device Management application {#device-management-application}

The Device Management application is one of the default applications of {{< product-c8y-iot >}}.
The Device Management application provides functionalities for connecting, managing and monitoring devices and allows to control and troubleshoot devices remotely.

For details see [Device management & connectivity > Device Management application](/device-management-application/).


### Device protocol {#device-protocol}

A device protocol defines how data from a specific device type should be transferred into the {{< product-c8y-iot >}} platform. It contains protocol-specific information about where the data is obtained from, how to transform it, and how to store it in {{< product-c8y-iot >}}.
The definition of the device protocol differs based on the underlying protocol used by the device (for example, Modbus, LoRa, OPC UA or LWM2M).

For details see [Device management & connectivity > Device integration](/device-integration/).


### Digital twin {#digital-twin}

A digital twin is a digital representation of physical or virtual assets. Devices, sensors and tools are examples of physical assets, virtual assets can for example be processes or rules. In {{< product-c8y-iot >}} they are represented as [managed objects](/glossary/m/#managed-objects).

### Document {#document}

{{< product-c8y-iot >}} stores all operational data - such as managed objects, alarms and measurements - as documents. A document is a versatile JSON structure with a unique identifier, allowing it to be referenced in URLs of web applications or REST APIs. This provides a high degree of flexibility for modeling your data on top of the {{< product-c8y-iot >}} [domain model](/concepts/domain-model/) and the {{< product-c8y-iot >}} [service quotas](/service-terms/quotas/).


### Dashboard {#dashboard}

Dashboards are customizable views within [applications](#application) like the [Cockpit application](#cockpit-appplication), composed of various [widgets](#widget), used to visualize data, monitor [assets](#asset), and potentially trigger actions.   


### Data broker {#data-broker}

The data broker functionality is an optional feature in {{< enterprise-tenant >}}s which lets you share data selectively with other [tenants](#tenant).  


### Data explorer {#data-explorer}

The data explorer is a visualization tool for exploring, comparing, and analyzing IoT data — such as [measurements](#measurement), [alarms](#alarm), and [events](#event) — from specific [assets](#asset) or across all [assets](#asset).  


### Data lake {#data-lake}

Data lakes are used in the context of [{{< product-c8y-iot >}} DataHub](#datahub). A data lake serves as a storage container for offloaded data, for example, ADLS Gen2/Azure Storage (Azure), S3 (Amazon), or a NAS.  

### Data point {#data-point}

A data point is a configuration that defines how a specific [measurement](#measurement) time series is visualized in UI views like the [data explorer](#data explorer) and [dashboards](#dashboard). Data points define how a measurement stream is displayed, including its label, color, unit, and threshold ranges. These settings can be customized in the UI or templated in the [data point library](#data-point-library).  


### Data point library {#data-point-library}

The data point library provides a collection of templates used to standardize the visualization of measurement data across your account. Each template targets a specific [measurement](#measurement), identified by its [fragment](#fragment) and series, and defines its visual properties (such as label, color, unit, threshold ranges). This ensures that all matching time series from any [device](#device) are displayed consistently.   


### Device {#device}

A device is a special type of asset that represents a physical piece of equipment connected to the Cumulocity platform. In the inventory, a device is represented as a managed object that is marked with the c8y\_IsDevice fragment, distinguishing it as an entity that can send data and receive operations.  
* **Related terms:** Agent, Alarm, Asset, Asset hierarchy, Device Management application, Device protocol, Digital twin, Event, Gateway, Group, Inventory, Managed object, Measurement, Operation  
* **API detailsTo review by R\&D:** Represented as managedObjects (/inventory/managedObjects), typically marked with c8y\_IsDevice fragment. Identity managed via Identity API (/identity/externalIds). Operations via Device Control API (/devicecontrol/operations). Data sent/received via Measurement, Event, Alarm APIs.  
* **Sources:** [https://cumulocity.com/docs/concepts/domain-model/](https://cumulocity.com/docs/concepts/domain-model/), [https://cumulocity.com/api/core/\#tag/Inventory-API](https://cumulocity.com/api/core/#tag/Inventory-API)

#### **Device agent** *(previously called “Agent” only)*

* **Status:** Existing  
* **Review status:**  **To review by PM**    
* **Description:** Device agents are software components that translate a device-specific communication protocol into the standard Cumulocity REST or MQTT-based protocol, enabling secure, bi-directional communication. Device agents can be deployed on the device itself (for example, on a gateway) or run as server-side microservices within the Cumulocity platform.  
* **Related terms:** Device, Device protocol, Gateway, Managed object, Microservice, Operations  
* **API detailsTo review by R\&D:** Agents are represented as managedObject in the inventory, marked with the com\_cumulocity\_model\_Agent fragment (/inventory/managedObjects). They interact heavily with the Device Control API (/devicecontrol/operations) to receive and update operations for themselves and their child devices, often using real-time notifications (/cep/realtime).  
* **Sources:** [https://cumulocity.com/docs/glossary/a/](https://cumulocity.com/docs/glossary/a/), [https://cumulocity.com/docs/device-integration/device-integration-rest/](https://cumulocity.com/docs/device-integration/device-integration-rest/), [https://cumulocity.com/docs/concepts/interfacing-devices/](https://cumulocity.com/docs/concepts/interfacing-devices/), [https://cumulocity.com/api/core/\#tag/Device-control-API](https://cumulocity.com/api/core/#tag/Device-control-API)

#### **Device Management application**

* **Status:** Existing  
* **Review status:**  **Checked by PM**    
* **Description:** The Device Management application is one of the default applications of Cumulocity. It provides functionalities for connecting, managing and monitoring devices and allows to control and troubleshoot devices remotely.  
* **Related terms:** Administration application, Agent, Application, Application switcher, Configuration Management, Device, Device protocol, Firmware, Group, Managed object, Operation, Software  
* **API detailsTo review by R\&D:** UI utilizes core REST APIs: Inventory (/inventory/managedObjects), Identity (/identity/externalIds), Device Control (/devicecontrol/operations), and data APIs (Measurement/Event/Alarm).  
* **Sources:** [https://cumulocity.com/docs/device-management-application/](https://cumulocity.com/docs/device-management-application/), [https://cumulocity.com/api/core/](https://cumulocity.com/api/core/)

#### **Device registration** *(previously: Device onboarding)* {#device-registration-(previously:-device-onboarding)}

* **Status:** New  
* **Review status:**  **Checked by PM**    
* **Description:** The process of registering and integrating any number of devices into the Cumulocity platform.  
* **Related terms:** Device, Bulk device registration  
* **API detailsTo review by R\&D:** Onboarding involves several API calls, typically starting with a request for credentials (POST /devicecontrol/deviceCredentials) or registering an external ID (POST /identity/externalIds/{type}/{externalId}), followed by creating the device's managedObject (POST /inventory/managedObjects).  
* **Sources:** [https://cumulocity.com/docs/device-integration/device-integration-rest/](https://cumulocity.com/docs/device-integration/device-integration-rest/)

#### **Device protocol**

* **Status:** Existing  
* **Review status:**  **Checked by PM**    
* **Description:** A device protocol defines how data from a specific device type is transferred into the platform and translated into the Cumulocity data model.  
* **Related terms:** Agent, Device, Device Management application, LWM2M, MQTT, OPC UA, REST, SmartREST  
* **API detailsTo review by R\&D:** Standard protocols (REST, MQTT) follow documented patterns. Custom protocols may involve creating specific managedObjects via the Inventory API or dedicated microservice APIs.  
* **Sources:** [https://cumulocity.com/docs/device-management-application/managing-device-types/](https://cumulocity.com/docs/device-management-application/managing-device-types/)

#### **Device replacement** {#device-replacement}

* **Status:** New  
* **Review status:**  **Checked by PM**    
* **Description:** A feature allowing the replacement of physical devices without losing the historical data associated with the original device.  
* **Related terms:** Device, Managed object, Digital twin  
* **API detailsTo review by R\&D:** The process is centered around the Identity API (/identity/externalIds). It involves re-mapping the external identifiers from the old device to the new one while keeping the same managedObject ID in the Inventory.  
* **Sources:** [https://cumulocity.com/docs/device-management-application/viewing-all-devices/\#to-replace-a-device](https://cumulocity.com/docs/device-management-application/viewing-all-devices/#to-replace-a-device)

#### **Digital twin**

* **Status:** Existing  
* **Review status:**  **Checked by PM**    
* **Description:**    
  Digital twin is a virtual representation of a physical asset or system that is continuously updated with real-time IoT data from connected devices. This data-driven digital counterpart enables monitoring, analysis, and optimization of physical assets by combining sensor measurements with business context.  
* **Related terms:** Asset, Asset hierarchy, Device, Document, Inventory, Managed object  
* **API detailsTo review by R\&D:** Implemented as managedObjects (/inventory/managedObjects). Interactions use standard Inventory, Measurement, Event, Alarm, and Operation APIs targeting the managedObject ID.  
* **Sources:** [https://cumulocity.com/docs/concepts/domain-model/](https://cumulocity.com/docs/concepts/domain-model/), [https://cumulocity.com/api/core/\#tag/Inventory-API](https://cumulocity.com/api/core/#tag/Inventory-API)

#### **Digital Twin Manager (DTM)** {#digital-twin-manager-(dtm)}

* **Status:** New  
* **Review status:**  **Checked by PM**    
* **Description:** Digital Twin Manager is a schema-based modeling application in Cumulocity that enables users to create and manage data model schemas, which serve as blueprints for modeling assets, properties, and other managed objects, acting as reusable templates within the platform.  
* **Related terms:** Asset, Digital twin, Asset model, Asset properties, Asset hierarchy, Cockpit application, Application  
* **API detailsTo review by R\&D:** The DTM application is supported by a dedicated dtm-ms microservice and a dedicated API (for example, /api/dtm/ or /service/dtm-ms/) to manage the lifecycle of asset models and asset properties.  
* **Sources:** [https://cumulocity.com/docs/dtm/dtm-introduction/](https://cumulocity.com/docs/dtm/dtm-introduction/), [https://cumulocity.com/api/dtm/](https://cumulocity.com/api/dtm/)

#### **Document**

* **Status:** Existing  
* **Review status:**  **Checked by PM**    
* **Description:** Cumulocity stores all operational data \- such as managed objects, alarms and measurements \- as documents. A document is a versatile JSON structure with a unique identifier, allowing it to be referenced in URLs of web applications or REST APIs.  
* **Related terms:** Alarm, Cumulocity operational store, Event, Inventory, Managed object, Measurement, REST API  
* **API detailsTo review by R\&D:** Documents are the fundamental JSON structures used in Cumulocity REST APIs. All major platform entities are represented as JSON documents manipulated via specific API endpoints.  
* **Sources:** [https://cumulocity.com/docs/concepts/domain-model/](https://cumulocity.com/docs/concepts/domain-model/), [https://cumulocity.com/api/core/](https://cumulocity.com/api/core/)

#### **Domain Model** {#domain-model}

* **Status:** New  
* **Review status:**  **Checked by PM**    
* **Description:** The conceptual framework defining how Cumulocity structures, represents, and relates different types of information (inventory, measurements, events, operations). Data is organised as modular fragments within JSON documents, allowing flexible extension and customization.  
* **Related terms:** Inventory, Measurement, Event, Operations, Fragment, Document  
* **API detailsTo review by R\&D:** The domain model is a conceptual framework implemented and exposed through the core REST APIs (Inventory, Measurement, Event, Alarm) and defined by the fragment-based architecture of the JSON documents they manage.  
* **Sources:** [https://cumulocity.com/docs/concepts/domain-model/](https://cumulocity.com/docs/concepts/domain-model/)
