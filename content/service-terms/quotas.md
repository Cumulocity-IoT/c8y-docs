---
title: Service quotas
layout: bundle
sector:
  - terms_conditions
weight: 60
aliases:
  - /concepts/limits/
---

Your {{< product-c8y-iot >}} service includes so-called **quotas**. These quotas ensure that the service operates within the guarantees of the {{< product-c8y-iot >}} service-level agreements.

The following types of quotas are used:

* **Hard**: Services enforce this quota so that it cannot be exceeded.
* **Soft**: Services are guaranteed to operate within the specified service-level agreements as long as the quotas are not exceeded; however, exceeding the quotas may result in a degraded user experience and no assurance of meeting the service-level agreements.
<!-- * **Configurable**: Services enforce this quota, but a change of the quota may be requested through technical support. A change in the quota may impact the service price.-->

The quotas listed here reflect the maximum values for the cloud subscriptions unless indicated otherwise. If you're unsure whether a specific cloud service quota is sufficient for your use case, we recommend reaching out to your sales contact to discuss your needs and explore potential options. Some quotas may be adjustable through professional services, depending on the system dimensioning and your specific requirements. For Edge deployments, consult the [{{< product-c8y-iot >}} Edge documentation](/{{< c8y-edge-version-major >}}/edge-kubernetes).

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

| Quota                                                                      | Type | Value |
| -------------------------------------------------------------------------- | ---- | ----: |
| [Document size](/concepts/domain-model/#fragments)                   | Hard | 16 MB |
| [Document size](/concepts/domain-model/#fragments)                   | Soft |  1 MB |
| [Array size within document](/concepts/domain-model/#fragments)      | Soft |  1000 |
| [Children of an inventory object](/concepts/domain-model/#fragments) | Soft |  1000 |
| Property size                                                              | Soft | 32 KB |


### REST API

| Quota                | Type |     Value |
| -------------------- | ---- | --------: |
| API request duration | Hard | 5 minutes |

### Realtime APIs

| Quota                                                                                                                                                                                   | Type |    Value |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------: |
| [MQTT message size](/device-integration/mqtt/) (Core MQTT)                                                                        | Hard |    16 KB |
| [Notifications 2.0 message backlog](https://{{< domain-c8y >}}/api/core/#tag/About-notifications-2.0)                                 | Hard |   25 MiB |
| [Notifications 2.0 time-to-live](https://{{< domain-c8y >}}/api/core/#tag/About-notifications-2.0)                                    | Hard | 36 hours |
| [Microservice-based data broker message backlog](/data-broker/ms-data-broker/#microservice-based-data-broker-service-quotas) | Hard |   50 MiB |
| [Microservice-based data broker time-to-live](/data-broker/ms-data-broker/#microservice-based-data-broker-service-quotas)    | Hard | 36 hours |
| Streaming Analytics and Streaming Lake offloading message backlog                                                           | Hard |     1 Gi |

### MQTT Service {#mqtt-service}

| Quota                                                                                                                  | Type |            Value |
| ---------------------------------------------------------------------------------------------------------------------- | ---- | ---------------: |
| [Client identifier length](/device-integration/mqtt-service/#client-id)                                                | Hard |        128 bytes |
| [Topic name length](/device-integration/mqtt-service/#mqtt-topics)                                                     | Hard |        256 bytes |
| [Topics](/device-integration/mqtt-service/#mqtt-topics)                                                                |      |        Unlimited |
| [Concurrent client connections](/device-integration/mqtt-service/#mqtt-device-quotas-limits) (per tenant)[^1]          | Hard | 1000 connections |
| [Client connection rate](/device-integration/mqtt-service/#mqtt-device-quotas-limits) (per tenant)                     | Hard |   100 per second |
| [Inbound message publishing rate](/device-integration/mqtt-service/#mqtt-device-quotas-limits) (per tenant)            | Hard |  1000 per second |
| [Inbound message publishing rate](/device-integration/mqtt-service/#mqtt-device-quotas-limits) (per client)            | Soft |   100 per second |
| [Outbound message publishing rate](/device-integration/mqtt-service/#mqtt-device-quotas-limits) (per tenant)           | Hard |   100 per second |
| [Maximum message size](/device-integration/mqtt-service/#mqtt-payloads) (per tenant)                                   | Hard |          128 KiB |
| Maximum aggregate throughput (per tenant, connected clients x message size x publishing rate)                          | Soft | 1 MiB per second |
| [Message backlog](/device-integration/mqtt-service/#message-backlog-quota) (per tenant, total for **all** MQTT topics) | Hard |            1 GiB |
| [Message time-to-live](/device-integration/mqtt-service/#message-time-to-live) (per tenant)                            | Hard |         36 hours |

These default quotas are set to support reliable operation on {{< product-c8y-iot >}}'s shared cloud environments.
Significantly higher quotas can be configured for dedicated environments.

### Applications and services

| Quota                                                                                         | Type | Value |
| --------------------------------------------------------------------------------------------- | ---- | ----: |
| [Map tiles](/cockpit/widgets-collection/#map)                        | Soft |   [Policy](https://operations.osmfoundation.org/policies/tiles/) |
| [Data points in a graph](/device-management-application/viewing-device-details/#measurements) | Hard |  5000 |

### Protocols

| Quota                                                                                        | Type | Value |
| -------------------------------------------------------------------------------------------- | ---- | ----: |
| [File size for LWM2M bulk registration](/device-integration/lwm2m/#bulk-device-registration) | Hard | 10 MB |
| [Concurrent pending LWM2M operations per device](/device-integration/lwm2m/#device-operations-handling) | Hard |    10 |
| Maximum number of Loriot devices that can be registered per deployment                       | Soft | 40000 |
| Maximum number of Loriot devices that can be registered per tenant                           | Soft | 20000 |

### DataHub

| Quota                                                                                            | Type |   Value |
| ------------------------------------------------------------------------------------------------ | ---- | ------: |
| Number of tenants                                                                                | Soft |     250 |
| Number of Dremio users per tenant                                                                | Soft |      40 |
| Number of active offloaders per tenant                                                           | Soft |     100 |
| Number of offloadings per tenant per hour                                                        | Soft |      20 |
| [Offloading frequency](/datahub/working-with-datahub/#configure-additional-settings)             | Hard |  hourly |
| Offloaded leaf properties[^2]                                                                    | Soft |    6400 |
| Query time out                                                                                   | Soft |   4 min |
| Query job retention                                                                              | Hard |   1 day |
| [Rows in a query job](https://cumulocity.com/api/datahub/#operation/getJobResultsApiResource)    | Hard | 1000000 |
| [Rows in a high performance query](https://cumulocity.com/api/datahub/#tag/High-performance-API) | Soft | 1000000 |
| Parallel high performance queries per tenant                                                     | Hard |      18 |

Additional [quotas from the Dremio engine](https://docs.dremio.com/current/help-support/limits/) may apply for DataHub customers.

[^1]: MQTT Service hard quotas documented as *per tenant* can be increased if necessary to support your use case, with any additional usage charged for.
[^2]: *Leaf properties* are properties with elementary types (text, number, boolean). The total count of leaf properties offloaded into the same table should not exceed the limit.
