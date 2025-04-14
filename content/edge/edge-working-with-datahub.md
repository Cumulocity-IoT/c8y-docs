---
weight: 75
title: Working with DataHub
layout: bundle
sector:
  - edge_server
---
This section describes how to run {{< product-c8y-iot >}} DataHub on the {{< product-c8y-iot >}} Edge, the local version of {{< product-c8y-iot >}}.

DataHub Edge is an optional component of Edge. DataHub Edge complements the ad-hoc querying of recent device data with analytical querying over long periods of time. For that purpose, data is moved from the Operational Store of Edge to a local data lake, with the data being stored in a concise and query-efficient format. DataHub Edge allows you to run SQL queries against the data lake contents so that you can gain more insights into your device data.

DataHub Edge is the counterpart of DataHub, the variant for cloud deployments, offering the same set of functionality. To learn more about DataHub in general, see [DataHub overview](/datahub/datahub-overview).
