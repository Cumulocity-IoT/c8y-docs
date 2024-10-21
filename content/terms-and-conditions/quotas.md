---
title: Service Quotas
layout: bundle
sector:
  - about_website
weight: 100
aliases:
  - /concepts/limits/
---

Your {{< product-c8y-iot >}} service includes so-called ``quotas``. These quotas ensure that the service operates within the guarantees of the {{< product-c8y-iot >}} service-level agreements.

The following types of quotas are used:

* **Hard**: Services enforce this quota so that it cannot be exceeded.
* **Soft**: Services are guaranteed to operate within the specified service-level agreements as long as the quotas are not exceeded; however, exceeding the quotas may result in a degraded user experience and no assurance of meeting the service-level agreements.
<!-- * **Configurable**: Services enforce this quota, but a change of the quota may be requested through technical support. A change in the quota may impact the service price.-->

The quotas listed here reflect the maximum values for the standard cloud subscription unless indicated otherwise. For edge deployments, please consult the [{{< product-c8y-iot >}} Edge documentation](/edge).

### Platform

#### General

| Quota         | Type | Value |
| ------------- | ---- | ----: |
| Tenant amount | Soft |  2000 |

#### Microservices

| Quota                                                                                              | Type |  Value |
| -------------------------------------------------------------------------------------------------- | ---- | -----: |
| [Microservice name length](/microservice-sdk/general-aspects/#packing)                             | Hard |     23 |
| [Microservice image size](/standard-tenant/ecosystem/#to-add-a-microservice-as-custom-application) | Hard | 500 MB |
| [Threads in a microservice](/microservice-sdk/general-aspects/#images-and-containers)              | Hard |  10240 |
| [Retained log size](/standard-tenant/ecosystem/#log-files)                                         | Hard |  35 MB |


### Domain model

| Quota                                                                | Type | Value |
| -------------------------------------------------------------------- | ---- | ----: |
| [Document size](/concepts/domain-model/#fragments)                   | Hard | 16 MB |
| [Document size](/concepts/domain-model/#fragments)                   | Soft |  1 MB |
| [Array size within document](/concepts/domain-model/#fragments)      | Soft |  1000 |
| [Children of an inventory object](/concepts/domain-model/#fragments) | Soft |  1000 |


### REST API

| Quota                        | Type |     Value |
| ---------------------------- | ---- | --------: |
| Maximum API request duration | Hard | 5 minutes |

### Realtime APIs

| Quota                                                                                                                                                                                   | Type |    Value |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------: |
| [MQTT message size](/device-integration/mqtt/)                                                                                                                                          | Hard |    16 KB |
| [Notifications 2.0 message backlog](/change-logs/?#cumulocity-undefined-advance-notice-of-reduced-storage-limits-for-notifications-2.0-and-microservice-based-data-broker)              | Hard |    25 MB |
| [Notifications 2.0 time-to-live](/change-logs/?#cumulocity-undefined-advance-notice-of-reduced-storage-limits-for-notifications-2.0-and-microservice-based-data-broker)                 | Hard | 36 hours |
| [Microservice-based data broker message backlog](/change-logs/?#cumulocity-undefined-advance-notice-of-reduced-storage-limits-for-notifications-2.0-and-microservice-based-data-broker) | Hard |    50 MB |
| [Microservice-based data broker time-to-live](/change-logs/?#cumulocity-undefined-advance-notice-of-reduced-storage-limits-for-notifications-2.0-and-microservice-based-data-broker)    | Hard | 36 hours |

### Applications and services

| Quota                                                                                         | Type | Value |
| --------------------------------------------------------------------------------------------- | ---- | ----: |
| [Devices shown on the Cockpit home page map](/cockpit/home-dashboard/)                        | Hard |   100 |
| [Data points in a graph](/device-management-application/viewing-device-details/#measurements) | Hard |  5000 |

### Protocols

| Quota                                                                                          | Type | Value |
| ---------------------------------------------------------------------------------------------- | ---- | ----: |
| [File size for LWM2M bulk registration](/protocol-integration/lwm2m/#bulk-device-registration) | Hard | 10 MB |
| [Concurrent pending LWM2M operations](/protocol-integration/lwm2m/#device-operations-handling) | Hard |    10 |
