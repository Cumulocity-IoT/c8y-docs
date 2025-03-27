---
date: 2025-02-07
title: DataHub
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Edge
component:
  - value: component-g7hnfbu4J
    label: Edge on Kubernetes
build_artifact:
  - value: tc-nJH2U7g3u
    label: edge-operator
ticket: CIE-5221
version: 2025.0.0
---
{{< product-c8y-iot >}} Edge operator now supports installing and upgrading {{< product-c8y-iot >}} DataHub Edge. DataHub Edge is an optional component of Edge. DataHub Edge complements the ad-hoc querying of recent device data with analytical querying over long periods of time. For that purpose, data is moved from the Operational Store of Edge to a local data lake, with the data being stored in a concise and query-efficient format. DataHub Edge allows you to run SQL queries against the data lake contents so that you can gain more insights into your device data.

DataHub Edge is the counterpart of DataHub, the variant for cloud deployments. To learn more about DataHub in general, see [DataHub overview](/datahub/datahub-overview). To learn more about DataHub Edge, see [Running DataHub on the Edge](/datahub/running-datahub-on-the-edge/).
