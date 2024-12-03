---
title: Service quotas
layout: bundle
sector:
  - terms_conditions
weight: 100
aliases:
  - /concepts/limits/
---

Your {{< product-c8y-iot >}} service includes so-called **quotas**. These quotas ensure that the service operates within the guarantees of the {{< product-c8y-iot >}} service-level agreements.

The following types of quotas are used:

* **Hard**: Services enforce this quota so that it cannot be exceeded.
* **Soft**: Services are guaranteed to operate within the specified service-level agreements as long as the quotas are not exceeded; however, exceeding the quotas may result in a degraded user experience and no assurance of meeting the service-level agreements.
<!-- * **Configurable**: Services enforce this quota, but a change of the quota may be requested through technical support. A change in the quota may impact the service price.-->

The quotas listed here reflect the maximum values for the cloud subscriptions unless indicated otherwise. If you're unsure whether a specific cloud service quota is sufficient for your use case, we recommend reaching out to your sales contact to discuss your needs and explore potential options. Some quotas may be adjustable through professional services, depending on the system dimensioning and your specific requirements. For Edge deployments, consult the [{{< product-c8y-iot >}} Edge documentation](/edge).

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
| Property size                                                        | Soft | 32 KB |


### REST API

| Quota                | Type |     Value |
| -------------------- | ---- | --------: |
| API request duration | Hard | 5 minutes |

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

### DataHub

| Quota                                                                                                                              | Type |      Value |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---- | ---------: |
| Number of offloaders per tenant                                                                                                    | Soft |        100 |
| [Offloading frequency](/datahub/working-with-datahub/#configure-additional-settings)                                               | Hard |     hourly |
| [Offloaded leaf properties](https://docs.dremio.com/current/get-started/cluster-deployments/architecture/limits/#catalog)          | Hard |       6400 |
| Query time out                                                                                                                     | Hard |        ??? |
| Query job retention                                                                                                                | Hard |      1 day |
| [Rows in a query job](https://docs.dremio.com/current/get-started/cluster-deployments/architecture/limits/#execution)              | Hard |    1000000 |
| [Rows in a high performance query](https://docs.dremio.com/current/get-started/cluster-deployments/architecture/limits/#execution) | Hard | 1073741824 |
