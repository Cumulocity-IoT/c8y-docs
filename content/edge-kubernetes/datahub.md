---
weight: 80
title: DataHub
layout: bundle
sector:
  - edge_server
---

{{< product-c8y-iot >}} DataHub on Edge offers the same functionality as a cloud installation of {{< product-c8y-iot >}} DataHub, and is an optional component of Edge. The significant difference is that processes and data are entirely local to your network, rather than in the cloud. You can define offloading pipelines, which regularly move data from the Operational Store of {{< product-c8y-iot >}} into a data lake. In the Edge setup, a NAS or local disk is used as data lake. Dremio, the internal engine of {{< product-c8y-iot >}} DataHub, can access the data lake and run analytical queries against its contents, using SQL as the query interface.

To learn more about DataHub in general, see [DataHub overview](/datahub/datahub-overview). As an end user, DataHub on Edge appears and behaves much the same as DataHub in a cloud installation, subject to the limitations in the comparison table later in this section.

### Installing and Using DataHub

DataHub is an optional component of Edge, and can be enabled by updating the `spec.dataHub` field in the Edge custom resource (CR). For more details on trhe `spec.messagingService` field, refer to [Edge custom resource - DataHub](/edge-kubernetes/edge-custom-resource-definition/#k8-edge-datahub).

For additional guidance, see the [Install Edge](/edge-kubernetes/installing-edge-on-k8/) and [Modify Edge](/edge-kubernetes/manage-edge/#modify-edge) sections in the Edge documentation.

In order to access Dremio, you must also make the domain `datahub-<domain_name>` resolvable, just as the configured domain name and `management-<domain_name>` were made resolvable in [Accessing Edge](/edge-kubernetes/installing-edge-on-k8/#accessing-edge).

### Comparison between DataHub Edge and DataHub Cloud

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
| Data lakes | NAS or local disk | Azure Storage, S3, (NAS) |
