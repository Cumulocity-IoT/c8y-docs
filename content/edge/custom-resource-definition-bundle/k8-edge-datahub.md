---
weight: 45
title: DataHub
layout: redirect
---

Specifying this field installs and configures {{< product-c8y-iot >}} DataHub. Installing DataHub requires additional system resources, including at least 10 extra CPU cores and 10 GB of RAM on the Kubernetes node. Additionally, DataHub will make use of five Persistent Volumes (PVs) for the DataHub MySQL, Dremio master, executor, executor-cloud, and Zookeeper pods.

This field is optional, and if omitted, DataHub will not be installed.

|<div style="width:150px">Field</div>|Required|<div style="width:115px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|enabled|Yes|String||Set to `true` to install {{< product-c8y-iot >}} DataHub.
|dremioAdminCredentialsSecretName|Yes|String||Name of the Kubernetes Secret containing the credentials for admin access to Dremio. For more information, see [Dremio Admin Credentials Secret](/edge/custom-resource-definition/#k8-edge-dremio-cred-secret). <p><p>**Info:** The Edge operator retrieves this secret from the **EDGE-CR-NAMESPACE**. Ensure that this secret is created before initiating the Edge deployment or update process.
|resources.limits|No|Structure|Defaults to CPU limit: 2<br>Memory limit: 4096Mi|Specify resource limits for the Dremio master and executor pod. <p><p>**Important:** CPU must be specified as an integer (number of CPUs) without the units, for example, 2 for 2 CPUs instead of 2000m or 2M and Memory must be specified in Mi without the units, for example 4096 instead of 4096Mi or 4Gi. <p><p>For more information, see [Resource limits specification](/edge/custom-resource-definition/#k8-edge-resources-limits-spec).
