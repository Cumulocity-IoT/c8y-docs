---
weight: 46
title: Dremio admin credentials secret
layout: redirect
---

Specifies the Kubernetes secret containing the credentials for admin access to Dremio. The Edge operator retrieves this secret from the namespace **EDGE-CR-NAMESPACE**. It is important that this secret is created before initiating the Edge deployment or update process.

This secret should contain the fields described in the table below:

|<div style="width:150px">Field</div>|Required|<div style="width:70px">Type</div>|Default|Description|
|:---|:---|:---|:---|:---|
|DREMIO_ADMIN_USER|Yes|String||Dremio admin username.
|DREMIO_ADMIN_PASSWORD|Yes|String||Dremio admin password. <p><p>**Important:** The password must be at least 8 letters long, must contain at least one number and one letter.
