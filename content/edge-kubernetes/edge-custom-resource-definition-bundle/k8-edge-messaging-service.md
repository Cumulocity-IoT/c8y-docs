---
weight: 36
title: Messaging Service
layout: redirect
---

Enables the installation of the {{< product-c8y-iot >}} Messaging Service, which is required for enabling the microservice-based data broker and Notifications 2.0. Enabling the Messaging Service requires additional system resources, including at least 2 extra CPU cores and 4 GB of RAM on the Kubernetes node. Additionally, three static Persistent Volumes (PVs) or a StorageClass with dynamic provisioning must be available to bind the Persistent Volume Claims made by the Pulsar Bookkeeper Ledgers, Pulsar Bookkeeper Journal, and Pulsar Zookeeper pods.
This field is optional, and if omitted, the Messaging Service will not be installed.

|<div style="width:170px">Field</div>|Required|<div style="width:115px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|enabled|Yes|Boolean||Set to `true` to install the {{< product-c8y-iot >}} Messaging Service.