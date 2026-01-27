---
weight: 80
title: DataHub
layout: bundle
sector:
  - edge_server
---

{{< product-c8y-iot >}} DataHub on Edge offers the same functionality as a cloud installation of {{< product-c8y-iot >}} DataHub, and is an optional component of Edge. The significant difference is that processes and data are entirely local to your network, rather than in the cloud. You can define offloading pipelines, which regularly move data from the Operational Store of {{< product-c8y-iot >}} into a data lake. In the Edge setup, a NAS or local disk is used as data lake. Dremio, the internal engine of {{< product-c8y-iot >}} DataHub, can access the data lake and run analytical queries against its contents, using SQL as the query interface.

To learn more about DataHub in general, see [DataHub overview](/datahub/datahub-overview). As an end user, DataHub on Edge appears and behaves much the same as DataHub in a cloud installation, subject to the limitations in the comparison table later in this section.

### Installing and using DataHub {#installing-and-using-datahub}

DataHub is an optional component of Edge, and can be enabled by updating the `spec.dataHub` field in the Edge custom resource (CR). For more details on the `spec.dataHub` field, refer to [Edge custom resource - DataHub](/edge-kubernetes/edge-custom-resource-definition/#k8-edge-datahub). You can also enable DataHub using the `c8yedge config --set dataHub.enabled=true` command. 

For general guidance on configuring Edge, see [Installing Edge](/edge-kubernetes/installing-edge-on-k8/) and [Modifying Edge](/edge-kubernetes/manage-edge/#modify-edge).

The data lake and related storage will always be written to the host file system under the path `/datahub`, whatever is mounted there. You are expected to have a single shared NAS file system, such as NFS mounted at that path _on all nodes of the Kubernetes cluster that Edge is running on_. This is to ensure the resilience of your data lake contents.

In order to access Dremio, you must also make the domain `datahub-<domain_name>` resolvable, just as the configured domain name and `management-<domain_name>` were made resolvable in [Accessing Edge](/edge-kubernetes/installing-edge-on-k8/#accessing-edge).

### Comparison between DataHub Edge and DataHub Cloud {#comparison-between-datahub-edge-and-datahub-cloud}

| Area | {{< product-c8y-iot >}} DataHub Edge | {{< product-c8y-iot >}} DataHub Cloud |
| -----   | -----   | -----   | -----   |
| High availability | Depending on any underlying virtualization technology | Depending on the cloud deployment setup |
| Vertical scalability | Yes | Yes |
| Horizontal scalability | No | Yes |
| Upgrades with no downtime | No | No |
| Installation | Offline & Online | Online |
| Dremio cluster setup | 1 master, 1 executor | Minimum 1 master, 1 executor |
| Data lakes | NAS or local disk | Azure Storage, S3, (NAS) |
