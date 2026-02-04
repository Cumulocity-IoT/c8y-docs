---
weight: 37
title: MongoDB
layout: redirect
---

This field is necessary for one or more of the following reasons:
* To specify the MongoDB admin credentials.
* To specify resource limits for the MongoDB server containers deployed by the Edge operator.

|<div style="width:170px">Field</div>|Required|<div style="width:115px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|credentialsSecretName|No|String|Defaults to **`databaseAdmin`** and a generated password as the database admin user and password. |Name of the Kubernetes Secret containing the database admin credentials with which the MongoDB server must be configured For more information, see [MongoDB Credentials Secret](/edge-kubernetes/edge-custom-resource-definition/#k8-edge-mongodb-cred-secret). <p><p>**Info:** The Edge operator retrieves this secret from the **`EDGE-CR-NAMESPACE`**. Ensure that this secret is created before initiating the Edge deployment or update process.
|resources.limits|No|Structure|Defaults to CPU Limit: 3000m<br>Memory Limit: 6GB|Specify resource limits for the MongoDB server pod. For more information, see [Resource limits specification](/edge-kubernetes/edge-custom-resource-definition/#k8-edge-resources-limits-spec).
|resources.requests|No|Structure|Defaults to 75 GB|Specify the size of the Persistent Volume Claim (PVC) named `mongod-data-edge-db-rs0-0` made by MongoDB server for persisting application data. For more information, see [MongoDB storage size](/edge-kubernetes/edge-custom-resource-definition/#k8-edge-mongodb-storage-size).
