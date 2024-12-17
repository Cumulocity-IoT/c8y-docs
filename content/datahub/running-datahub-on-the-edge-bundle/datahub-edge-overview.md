---
weight: 10
title: Cumulocity DataHub Edge overview
layout: redirect
---

### Documentation overview {#documentation-overview}

The following sections will walk you through all the functionalities of {{< product-c8y-iot >}} DataHub Edge in detail.

For your convenience, here is an overview of the contents:

| Section | Content |
| -----   | -----   |
| [ {{< product-c8y-iot >}} DataHub Edge overview](/datahub/running-datahub-on-the-edge/#datahub-edge-overview) | Get an overview of {{< product-c8y-iot >}} DataHub Edge |
| [Setting up {{< product-c8y-iot >}} DataHub Edge](/datahub/running-datahub-on-the-edge/#setting-up-datahub-edge) | Set up {{< product-c8y-iot >}} DataHub Edge and its components |
| [Working with {{< product-c8y-iot >}} DataHub Edge](/datahub/running-datahub-on-the-edge/#working-with-datahub-edge) | Manage offloading pipelines and query the offloaded results |
| [Operating {{< product-c8y-iot >}} DataHub Edge](/datahub/running-datahub-on-the-edge/#operating-datahub-edge) | Run administrative tasks |

### {{< product-c8y-iot >}} DataHub Edge at a glance {#datahub-edge-at-a-glance}

[{{< product-c8y-iot >}} Edge](https://cumulocity.com/docs/edge/edge-introduction/) is an onsite, single-server, and single-tenant variant of the {{< product-c8y-iot >}} Core platform. It is delivered as a software appliance designed to run on industrial PCs or local servers. {{< product-c8y-iot >}} DataHub is available as an add-on to {{< product-c8y-iot >}} Edge.

{{< product-c8y-iot >}} DataHub Edge offers the same functionality as the cloud-variant of {{< product-c8y-iot >}} DataHub, but stores the data locally. You can define offloading pipelines, which regularly move data from the Operational Store of {{< product-c8y-iot >}} into a data lake. In the Edge setup, a NAS is used as data lake. Dremio, the internal engine of {{< product-c8y-iot >}} DataHub, can access the data lake and run analytical queries against its contents, using SQL as the query interface.

<img src="/images/datahub-guide/datahub-edge-overview.png" alt="Overview of {{< product-c8y-iot >}} DataHub Edge" style="max-width: 100%">

{{< product-c8y-iot >}} DataHub Edge consists of the following building blocks:

* The {{< product-c8y-iot >}} DataHub UI is deployed as a web application in the {{< product-c8y-iot >}} core. It provides the frontend for defining and managing offloading pipelines.
* The {{< product-c8y-iot >}} DataHub backend manages offloading pipelines and their scheduled execution. The backend and its associated database run within one Docker container in the Docker daemon. Its internal state, for example, the defined offloading configurations, is persisted on the central data disk.
* The query processing is based on a Dremio master and a Dremio executor as well as on a ZooKeeper instance. Dremio master and ZooKeeper run in one Docker container and the Dremio executor runs in another one. Both containers are run by the Docker daemon. The internal state of the containers, for example, the query job history, is persisted on the central data disk. In the above figure just Dremio is shown for reasons of simplicity.
* The data lake is located on the central data disk.

#### {{< product-c8y-iot >}} DataHub Edge versus {{< product-c8y-iot >}} DataHub cloud deployments {#datahub-edge-versus-datahub-cloud-deployments}

{{< product-c8y-iot >}} DataHub Edge uses the same software as {{< product-c8y-iot >}} DataHub, though in the following aspects these two variants differ:

| Area | {{< product-c8y-iot >}} DataHub Edge | {{< product-c8y-iot >}} DataHub Cloud |
| -----   | -----   | -----   |
| High Availability | Depending on the underlying virtualization technology | Depending on the cloud deployment setup |
| Vertical scalability | Yes | Yes |
| Horizontal scalability | No | Yes |
| Upgrades with no downtime | No | No |
| Root access | No | Yes, if customer is hosting |
| Installation | Offline | Online |
| Dremio cluster setup | 1 master, 1 executor | Minimum 1 master, 1 executor |
| Dremio container management | Docker daemon | Kubernetes |
| {{< product-c8y-iot >}} DataHub backend container management | Docker daemon | Microservice in {{< product-c8y-iot >}} Core |
| Data lakes | NAS | Azure Storage, S3, HDFS, (NAS) |
