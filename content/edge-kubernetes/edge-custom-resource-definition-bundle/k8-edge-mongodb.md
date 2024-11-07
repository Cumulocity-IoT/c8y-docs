---
weight: 36
title: MongoDB
layout: redirect
---

This field is necessary for one or more of the following reasons:

* To specify the MongoDB admin credentials.
* To configure an externally hosted MongoDB server.
* To specify resource limits for the MongoDB server containers deployed by the Edge operator.

|<div style="width:170px">Field</div>|Required|<div style="width:115px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|credentialsSecretName|No|String|Defaults to **`databaseAdmin`** and **`admin-pass`** as the database admin user and password for the Edge operator managed MongoDB or fails with validation error for the externally hosted MongoDB server.<p><p>**Info:** For the MongoDB managed by the Edge operator, it is recommended to provide the database admin credentials secret, rather than relying on the default credentials assigned by the Edge operator. |Name of the Kubernetes Secret containing the database admin credentials with which the Edge operator managed MongoDB must be configured or the database admin credentials of the externally hosted MongoDB server. For more information, see [MongoDB Credentials Secret](/edge-kubernetes/edge-custom-resource-definition/#k8-edge-mongodb-cred-secret). <p><p>**Info:** The Edge operator retrieves this secret from the **`EDGE-CR-NAMESPACE`**. Ensure that this secret is created before initiating the Edge deployment or update process.
|connectionString|No|String|If not provided, the Edge operator installs a single node MongoDB server and configures it with the admin credentials provided in `spec.mongodb.credentialsSecretName`|Connection string of the externally hosted MongoDB server. URI format: `mongodb://host1[:port1][,...hostN[:portN]]`<p><p>**Info:** If you do not provide this value, the Edge operator installs a single node MongoDB server. Once Edge is installed and configured to use the MongoDB managed by the Edge operator, you cannot provide the `connectionString` to use an externally hosted MongoDB.
|tlsSecretName|No|String|Not required if the TLS/SSL key and certificates are issued by a trusted public CA.|Secret for supplying the Certificate Authority (CA) certificate that issued the TLS/SSL key and certificates used to configure the TLS for the externally hosted MongoDB server. This allows the Edge operator to establish trust with the server. For more information, see [Externally hosted MongoDB TLS/SSL Secret](/edge-kubernetes/edge-custom-resource-definition/#k8-edge-externally-hosted-mongodb-tls-secret).<p><p>**Info:** The Edge operator retrieves this secret from the **`EDGE-CR-NAMESPACE`**. Ensure that this secret is created before initiating the Edge deployment or update process.
|resources.limits|Yes|Structure|Defaults to CPU Limit: 3000m<br>Memory Limit: 6GB|Specify resource limits for the MongoDB server pod. For more information, see [Resource limits specification](/edge-kubernetes/edge-custom-resource-definition/#k8-edge-resources-limits-spec).
|resources.requests|No|Structure|Defaults to 75 GB|Specify the size of the Persistent Volume Claim (PVC) named `mongod-data-edge-db-rs0-0` made by MongoDB server for persisting application data. For more information, see [MongoDB storage size](/edge-kubernetes/edge-custom-resource-definition/#k8-edge-mongodb-storage-size).
