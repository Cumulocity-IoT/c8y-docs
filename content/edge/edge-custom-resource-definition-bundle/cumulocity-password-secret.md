---
weight: 26
title: Cumulocity password secret
layout: redirect
---

The {{< product-c8y-iot >}} password secret specifies the Kubernetes secret containing the initial {{< product-c8y-iot >}} admin user password. The Edge operator retrieves this secret from the namespace **EDGE-CR-NAMESPACE**. It is important that this secret is created before initiating the Edge deployment process.

{{< c8y-admon-info >}}
Any changes to the content of this secret after the initial installation of Edge are ignored. Refer to [Managing users](/standard-tenant/managing-users) for updating the {{< product-c8y-iot >}} admin user password. 
{{< /c8y-admon-info >}}

This secret should contain the field described in the table below:

|<div style="width:150px">Field</div>|Required|<div style="width:70px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|INITIAL_C8Y_ADMIN_PASSWORD|Yes|String||Password used to initialize the {{< product-c8y-iot >}} admin user for both the {{< management-tenant >}} and the Edge tenants. <p><p>**Important:** The password must be at least 8 letters long.
