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
| [ {{< product-c8y-iot >}} DataHub Edge overview](https://cumulocity.com/docs/{{< c8y-edge-version-major >}}/datahub/running-datahub-on-the-edge/#datahub-edge-overview) | Get an overview of {{< product-c8y-iot >}} DataHub Edge |
| [Setting up {{< product-c8y-iot >}} DataHub Edge](https://cumulocity.com/docs/{{< c8y-edge-version-major >}}/datahub/running-datahub-on-the-edge/#setting-up-datahub-edge-on-k8s) | Set up {{< product-c8y-iot >}} DataHub Edge and its components |
| [Working with {{< product-c8y-iot >}} DataHub Edge](https://cumulocity.com/docs/{{< c8y-edge-version-major >}}/datahub/running-datahub-on-the-edge/#working-with-datahub-edge) | Manage offloading pipelines and query the offloaded results |
| [Operating {{< product-c8y-iot >}} DataHub Edge](https://cumulocity.com/docs/{{< c8y-edge-version-major >}}/datahub/running-datahub-on-the-edge/#operating-datahub-edge) | Run administrative tasks |

### {{< product-c8y-iot >}} DataHub Edge at a glance {#datahub-edge-at-a-glance}
[{{< product-c8y-iot >}} Edge](/{{< c8y-edge-version-major >}}/sector/edge_server) is the single-server variant of the {{< product-c8y-iot >}} platform, designed to run in factories on industrial PCs or local servers, that is, in the same site (“onsite”) in which the IoT assets are located. {{< product-c8y-iot >}} DataHub is available as an add-on to {{< product-c8y-iot >}} Edge.

{{< product-c8y-iot >}} DataHub Edge offers the same functionality as the cloud-variant of {{< product-c8y-iot >}} DataHub, and is deployed similarly into a Kubernetes cluster. The significant difference is that processes and data are entirely local to your network, rather than in the cloud. You can define offloading pipelines, which regularly move data from the Operational Store of {{< product-c8y-iot >}} into a data lake. In the Edge setup, a NAS is used as data lake. Dremio, the internal engine of {{< product-c8y-iot >}} DataHub, can access the data lake and run analytical queries against its contents, using SQL as the query interface.

#### {{< product-c8y-iot >}} DataHub Edge versus {{< product-c8y-iot >}} DataHub cloud deployments {#datahub-edge-versus-datahub-cloud-deployments}

{{< product-c8y-iot >}} DataHub Edge uses the same software as {{< product-c8y-iot >}} DataHub, though in the following aspects these two variants differ:

| Area | {{< product-c8y-iot >}} DataHub Edge | {{< product-c8y-iot >}} DataHub Cloud |
| -----   | -----   | -----   | -----   |
| High Availability | Depending on any underlying virtualization technology | Depending on the cloud deployment setup |
| Vertical scalability | Yes | Yes |
| Horizontal scalability | No | Yes |
| Upgrades with no downtime | No | No |
| Root access | No | Yes, if customer is hosting |
| Installation | Offline & Online | Online |
| Dremio cluster setup | 1 master, 1 executor | Minimum 1 master, 1 executor |
| Dremio container management |  Kubernetes | Kubernetes |
| {{< product-c8y-iot >}} DataHub backend container management | Microservice in {{< product-c8y-iot >}} Edge | Microservice in {{< product-c8y-iot >}} Core |
| Data lakes | NAS | Azure Storage, S3, HDFS, (NAS) |
